import { NextResponse } from "next/server";
import { requireOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { fromZonedTime } from "date-fns-tz";
import { addMinutes } from "date-fns";

/** Bookings for one calendar day (business-local), for the dashboard's
 * staff-column calendar view. */
export async function GET(req: Request) {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const dateParam = new URL(req.url).searchParams.get("date"); // YYYY-MM-DD
  if (!dateParam || !/^\d{4}-\d{2}-\d{2}$/.test(dateParam)) {
    return NextResponse.json({ error: "INVALID_DATE" }, { status: 400 });
  }

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: { timezone: true },
  });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  // Same "plain date string parses as UTC midnight" trick used by the
  // customer-facing availability endpoint — keeps day boundaries correct
  // regardless of what timezone this server process happens to run in.
  const dayStartUtc = fromZonedTime(dateParam, business.timezone);
  const dayEndUtc = addMinutes(dayStartUtc, 24 * 60);

  const bookings = await prisma.booking.findMany({
    where: {
      businessId,
      startsAt: { lt: dayEndUtc },
      endsAt: { gt: dayStartUtc },
      status: { not: "CANCELLED" },
    },
    select: {
      id: true,
      startsAt: true,
      endsAt: true,
      status: true,
      priceCents: true,
      currency: true,
      staffId: true,
      customerNote: true,
      service: { select: { name: true } },
      customer: { select: { name: true, phone: true } },
    },
    orderBy: { startsAt: "asc" },
  });

  return NextResponse.json({
    bookings: bookings.map((b) => ({
      id: b.id,
      startsAt: b.startsAt.toISOString(),
      endsAt: b.endsAt.toISOString(),
      status: b.status,
      priceCents: b.priceCents,
      currency: b.currency,
      staffId: b.staffId,
      customerNote: b.customerNote,
      serviceName: b.service.name,
      customerName: b.customer.name,
      customerPhone: b.customer.phone,
    })),
  });
}
