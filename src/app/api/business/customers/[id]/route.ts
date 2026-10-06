import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { formatInTimeZone } from "date-fns-tz";

/** A single customer's history with this business — who they are and every
 * visit, so an owner clicking into a booking can see how many times this
 * person has come in before without leaving the calendar. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("bookings");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: { timezone: true, loyaltyProgram: { select: { pointsRequired: true, discountPercent: true } } },
  });

  const bookings = await prisma.booking.findMany({
    where: { businessId, customerId: id },
    select: {
      id: true,
      startsAt: true,
      customerNote: true,
      status: true,
      priceCents: true,
      currency: true,
      cancelReason: true,
      service: { select: { name: true } },
      staff: { select: { name: true } },
      customer: { select: { name: true, phone: true, email: true } },
    },
    orderBy: { startsAt: "desc" },
  });

  if (bookings.length === 0) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const customer = bookings[0].customer;
  const completed = bookings.filter((b) => b.status === "COMPLETED");

  // Loyalty activity lands on the day of the visit it belongs to, so the owner
  // can read each visit's points and any reward applied that day.
  const timezone = business?.timezone ?? "UTC";
  const card = await prisma.loyaltyCard.findUnique({
    where: { businessId_customerEmail: { businessId, customerEmail: customer.email.toLowerCase() } },
    select: {
      scans: { select: { createdAt: true } },
      rewards: { select: { createdAt: true } },
    },
  });
  const dayOf = (d: Date) => formatInTimeZone(d, timezone, "yyyy-MM-dd");

  return NextResponse.json({
    customer: { name: customer.name, phone: customer.phone, email: customer.email },
    visitCount: completed.length,
    totalSpentCents: completed.reduce((sum, b) => sum + b.priceCents, 0),
    currency: bookings[0].currency,
    bookings: bookings.map((b) => ({
      id: b.id,
      startsAt: b.startsAt.toISOString(),
      status: b.status,
      staffName: b.staff?.name ?? null,
      cancelReason: b.cancelReason,
      serviceName: b.service.name,
      priceCents: b.priceCents,
      currency: b.currency,
      customerNote: b.customerNote,
      loyaltyScans: card
        ? card.scans
            .filter((x) => dayOf(x.createdAt) === dayOf(b.startsAt))
            .map((x) => formatInTimeZone(x.createdAt, timezone, "HH:mm"))
        : [],
      rewardApplied: card ? card.rewards.some((r) => dayOf(r.createdAt) === dayOf(b.startsAt)) : false,
    })),
    loyalty: business?.loyaltyProgram
      ? {
          pointsRequired: business.loyaltyProgram.pointsRequired,
          discountPercent: business.loyaltyProgram.discountPercent,
        }
      : null,
  });
}
