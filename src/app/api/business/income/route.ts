import { NextResponse } from "next/server";
import { auth } from "@/auth";
import type { BusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { canReport, incomeAccess, incomeReportSchema, reportJson, reportWithPhotos, REPORTABLE_STATUSES } from "@/lib/income";
import { giftNet } from "@/lib/income-math";
import { INCOME_KINDS, isPersonalTimeKind, personalTimeLabel } from "@/lib/personal-time";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** What a report is for — a booking, or a personal time block that can earn
 * money (Tuyển người mẫu) — as the form shows it and the report stores it.
 * Null when it doesn't exist or this person may not report it. */
async function resolveTarget(access: BusinessAccess, target: { bookingId?: string | null; timeOffId?: string | null }) {
  if (target.bookingId) {
    const booking = await prisma.booking.findUnique({
      where: { id: target.bookingId },
      include: { service: { select: { name: true } }, staff: { select: { name: true } }, customer: { select: { name: true } } },
    });
    if (!booking || !canReport(access, booking)) return null;
    return {
      key: { bookingId: booking.id },
      reportable: REPORTABLE_STATUSES.includes(booking.status),
      info: {
        id: booking.id,
        customerName: booking.customer.name ?? "",
        serviceName: booking.service.name,
        staffName: booking.staff?.name ?? null,
        startsAt: booking.startsAt.toISOString(),
        expectedCents: booking.priceCents,
        currency: booking.currency,
        status: booking.status,
      },
      snapshot: {
        staffId: booking.staffId,
        staffName: booking.staff?.name ?? null,
        customerName: (booking.customer.name ?? "").slice(0, 160),
        serviceName: booking.service.name.slice(0, 200),
        serviceAt: booking.startsAt,
        expectedCents: booking.priceCents,
        currency: booking.currency,
      },
    };
  }
  if (target.timeOffId) {
    const block = await prisma.staffTimeOff.findUnique({
      where: { id: target.timeOffId },
      include: { staff: { select: { name: true, businessId: true } } },
    });
    if (!block || !isPersonalTimeKind(block.kind) || !INCOME_KINDS.includes(block.kind)) return null;
    if (!canReport(access, { businessId: block.staff.businessId, staffId: block.staffId })) return null;
    const label = personalTimeLabel(block.kind, access.business.defaultLocale);
    // Nothing is "due" for it — whatever came in is the income.
    return {
      key: { timeOffId: block.id },
      reportable: true,
      info: {
        id: block.id,
        customerName: block.reason?.trim() || label,
        serviceName: label,
        staffName: block.staff.name,
        startsAt: block.startsAt.toISOString(),
        expectedCents: 0,
        currency: access.business.defaultCurrency,
        status: "CONFIRMED",
      },
      snapshot: {
        staffId: block.staffId,
        staffName: block.staff.name,
        customerName: (block.reason?.trim() || label).slice(0, 160),
        serviceName: label.slice(0, 200),
        serviceAt: block.startsAt,
        expectedCents: 0,
        currency: access.business.defaultCurrency,
      },
    };
  }
  return null;
}

/** ?bookingId= or ?timeOffId= — that one's report (or null) and what is due,
 * for the report form. Otherwise the list for the Doanh thu page: every
 * report for the owner, only their own for a staff member, in [from, to]. */
export async function GET(req: Request) {
  const access = await incomeAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { searchParams } = new URL(req.url);

  const bookingId = searchParams.get("bookingId");
  const timeOffId = searchParams.get("timeOffId");
  if (bookingId || timeOffId) {
    const target = await resolveTarget(access, { bookingId, timeOffId });
    if (!target) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    const existing = await prisma.staffIncomeReport.findUnique({ where: target.key, select: { id: true } });
    const report = existing ? await reportWithPhotos(existing.id) : null;
    return NextResponse.json({ booking: target.info, report: report ? reportJson(report) : null, isOwner: access.isOwner });
  }

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const status = searchParams.get("status");
  const staffId = searchParams.get("staffId");
  const reports = await prisma.staffIncomeReport.findMany({
    where: {
      businessId: access.business.id,
      ...(access.isOwner ? (staffId ? { staffId } : {}) : { staffId: access.staffId }),
      ...(status === "PENDING" || status === "APPROVED" || status === "REJECTED" ? { status } : {}),
      ...(from && to && DATE_RE.test(from) && DATE_RE.test(to)
        ? { serviceAt: { gte: new Date(`${from}T00:00:00Z`), lt: new Date(new Date(`${to}T00:00:00Z`).getTime() + 86400000) } }
        : {}),
    },
    include: { photos: { select: { id: true }, orderBy: { createdAt: "asc" } } },
    orderBy: { serviceAt: "desc" },
    take: 500,
  });
  return NextResponse.json({ reports: reports.map(reportJson), isOwner: access.isOwner });
}

/** Saves the report for a booking or time block — new, or an edit while it's
 * still waiting for approval or after the owner sent it back (which makes it
 * wait again). Approved reports are locked until the owner un-approves. */
export async function POST(req: Request) {
  const access = await incomeAccess();
  const session = await auth();
  if (!access || !session?.user) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = incomeReportSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    const empty = parsed.error.issues.some((i) => i.message === "EMPTY");
    return NextResponse.json({ error: empty ? "EMPTY" : "INVALID" }, { status: 400 });
  }
  const d = parsed.data;

  const target = await resolveTarget(access, d);
  if (!target) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (!target.reportable) return NextResponse.json({ error: "NOT_REPORTABLE" }, { status: 409 });

  const existing = await prisma.staffIncomeReport.findUnique({ where: target.key });
  if (existing?.status === "APPROVED") return NextResponse.json({ error: "APPROVED" }, { status: 409 });

  const amounts = {
    cashCents: d.cashCents,
    bankCents: d.bankCents,
    giftCard1Cents: d.giftCard1Cents,
    giftCard1Code: d.giftCard1Cents > 0 && d.giftCard1Code ? d.giftCard1Code.toUpperCase() : null,
    giftCard2Cents: d.giftCard2Cents,
    giftCard2Code: d.giftCard2Cents > 0 && d.giftCard2Code ? d.giftCard2Code.toUpperCase() : null,
    giftCard1Percent: d.giftCard1Cents > 0 ? d.giftCard1Percent : 0,
    giftCard2Percent: d.giftCard2Cents > 0 ? d.giftCard2Percent : 0,
    tipCents: d.tipCents,
    // Salon income: gift cards count after their discount; the tip is the
    // staff member's own and stays out.
    totalCents: d.cashCents + d.bankCents + giftNet(d.giftCard1Cents, d.giftCard1Percent) + giftNet(d.giftCard2Cents, d.giftCard2Percent),
    note: d.note || null,
  };

  const saved = existing
    ? await prisma.staffIncomeReport.update({ where: { id: existing.id }, data: { ...amounts, ...target.snapshot, status: "PENDING" } })
    : await prisma.staffIncomeReport.create({
        data: { businessId: access.business.id, ...target.key, reportedById: session.user.id, ...amounts, ...target.snapshot },
      });
  const full = await reportWithPhotos(saved.id);
  return NextResponse.json({ report: reportJson(full!) }, { status: existing ? 200 : 201 });
}
