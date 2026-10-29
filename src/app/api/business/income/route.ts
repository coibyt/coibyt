import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { canReport, incomeAccess, incomeReportSchema, reportJson, reportWithPhotos, REPORTABLE_STATUSES } from "@/lib/income";
import { giftNet } from "@/lib/income-math";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** ?bookingId= — that booking's report (or null) and what is due, for the
 * report form. Otherwise the list for the Doanh thu page: every report for
 * the owner, only their own for a staff member, in [from, to]. */
export async function GET(req: Request) {
  const access = await incomeAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { searchParams } = new URL(req.url);

  const bookingId = searchParams.get("bookingId");
  if (bookingId) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { service: { select: { name: true } }, staff: { select: { name: true } }, customer: { select: { name: true } } },
    });
    if (!booking || !canReport(access, booking)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    const existing = await prisma.staffIncomeReport.findUnique({ where: { bookingId }, select: { id: true } });
    const report = existing ? await reportWithPhotos(existing.id) : null;
    return NextResponse.json({
      booking: {
        id: booking.id,
        customerName: booking.customer.name ?? "",
        serviceName: booking.service.name,
        staffName: booking.staff?.name ?? null,
        startsAt: booking.startsAt.toISOString(),
        expectedCents: booking.priceCents,
        currency: booking.currency,
        status: booking.status,
      },
      report: report ? reportJson(report) : null,
      isOwner: access.isOwner,
    });
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

/** Saves the report for a booking — new, or an edit while it's still waiting
 * for approval or after the owner sent it back (which makes it wait again).
 * Approved reports are locked until the owner un-approves. */
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

  const booking = await prisma.booking.findUnique({
    where: { id: d.bookingId },
    include: { service: { select: { name: true } }, staff: { select: { name: true } }, customer: { select: { name: true } } },
  });
  if (!booking || !canReport(access, booking)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (!REPORTABLE_STATUSES.includes(booking.status)) return NextResponse.json({ error: "NOT_REPORTABLE" }, { status: 409 });

  const existing = await prisma.staffIncomeReport.findUnique({ where: { bookingId: booking.id } });
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
  // The booking as it is now, for the owner to compare against.
  const snapshot = {
    staffId: booking.staffId,
    staffName: booking.staff?.name ?? null,
    customerName: (booking.customer.name ?? "").slice(0, 160),
    serviceName: booking.service.name.slice(0, 200),
    serviceAt: booking.startsAt,
    expectedCents: booking.priceCents,
    currency: booking.currency,
  };

  const saved = existing
    ? await prisma.staffIncomeReport.update({ where: { id: existing.id }, data: { ...amounts, ...snapshot, status: "PENDING" } })
    : await prisma.staffIncomeReport.create({
        data: { businessId: access.business.id, bookingId: booking.id, reportedById: session.user.id, ...amounts, ...snapshot },
      });
  const full = await reportWithPhotos(saved.id);
  return NextResponse.json({ report: reportJson(full!) }, { status: existing ? 200 : 201 });
}
