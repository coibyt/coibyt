import { NextResponse } from "next/server";
import { customerScopeBusinessIds, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { formatInTimeZone } from "date-fns-tz";
import { invoicePublicUrl } from "@/lib/invoices";

/** A customer's history across the branches this viewer can see. Loyalty
 * points belong to the branch the card was issued by, so only visits at the
 * current branch are matched to scans. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const currentId = access.business.id;
  const scopeIds = await customerScopeBusinessIds(access);

  const business = await prisma.business.findUnique({
    where: { id: currentId },
    select: {
      timezone: true,
      defaultLocale: true,
      loyaltyProgram: { select: { pointsRequired: true, discountPercent: true } },
    },
  });

  const bookings = await prisma.booking.findMany({
    where: { businessId: { in: scopeIds }, customerId: id },
    select: {
      id: true,
      businessId: true,
      startsAt: true,
      customerNote: true,
      status: true,
      priceCents: true,
      currency: true,
      cancelReason: true,
      service: { select: { name: true } },
      staff: { select: { name: true } },
      business: { select: { name: true } },
      customer: { select: { name: true, phone: true, email: true } },
    },
    orderBy: { startsAt: "desc" },
  });

  if (bookings.length === 0) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  // A booking checked out through "Đến quầy thanh toán" gets its own
  // Invoice row (see src/app/api/business/invoices/route.ts) — surfaced here
  // so the owner can reopen or resend a past visit's invoice without having
  // to remember when it was issued.
  const invoices = await prisma.invoice.findMany({
    where: { bookingId: { in: bookings.map((b) => b.id) } },
    select: { id: true, token: true, bookingId: true },
  });
  const invoiceByBooking = new Map(invoices.map((inv) => [inv.bookingId, inv]));
  const locale = business?.defaultLocale ?? "vi";

  const customer = bookings[0].customer;
  const completed = bookings.filter((b) => b.status === "COMPLETED");

  // A scan only counts while there are more completed visits than scans, so
  // the Nth scan belongs to the Nth completed visit (in order) at this branch
  // since the card was activated. A reward is applied after every Nth scan.
  const timezone = business?.timezone ?? "UTC";
  const card = await prisma.loyaltyCard.findUnique({
    where: { businessId_customerEmail: { businessId: currentId, customerEmail: customer.email.toLowerCase() } },
    select: {
      activatedAt: true,
      rewardsEarned: true,
      scans: { select: { createdAt: true }, orderBy: { createdAt: "asc" } },
    },
  });
  const pointsRequired = business?.loyaltyProgram?.pointsRequired ?? 0;
  const visitsInOrder = card
    ? completed
        .filter((b) => b.businessId === currentId && b.startsAt >= card.activatedAt)
        .sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime())
        .map((b) => b.id)
    : [];
  const matched = new Map<string, { time: string; rewardApplied: boolean }>();
  if (card) {
    card.scans.forEach((scan, i) => {
      const visitId = visitsInOrder[i];
      if (!visitId) return;
      const rewardApplied = pointsRequired > 0 && (i + 1) % pointsRequired === 0 && (i + 1) / pointsRequired <= card.rewardsEarned;
      matched.set(visitId, { time: formatInTimeZone(scan.createdAt, timezone, "HH:mm"), rewardApplied });
    });
  }

  return NextResponse.json({
    customer: { name: customer.name, phone: customer.phone, email: customer.email },
    visitCount: completed.length,
    totalSpentCents: completed.reduce((sum, b) => sum + b.priceCents, 0),
    currency: bookings[0].currency,
    bookings: bookings.map((b) => ({
      id: b.id,
      businessId: b.businessId,
      branchName: b.business.name,
      startsAt: b.startsAt.toISOString(),
      status: b.status,
      staffName: b.staff?.name ?? null,
      cancelReason: b.cancelReason,
      serviceName: b.service.name,
      priceCents: b.priceCents,
      currency: b.currency,
      customerNote: b.customerNote,
      loyaltyScans: matched.has(b.id) ? [matched.get(b.id)!.time] : [],
      rewardApplied: matched.get(b.id)?.rewardApplied ?? false,
      invoiceId: invoiceByBooking.get(b.id)?.id ?? null,
      invoiceUrl: invoiceByBooking.get(b.id)
        ? invoicePublicUrl(invoiceByBooking.get(b.id)!.token, locale)
        : null,
    })),
    loyalty: business?.loyaltyProgram
      ? {
          pointsRequired: business.loyaltyProgram.pointsRequired,
          discountPercent: business.loyaltyProgram.discountPercent,
        }
      : null,
  });
}
