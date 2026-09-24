import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { fromZonedTime } from "date-fns-tz";
import { addDays } from "date-fns";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

/** Bookings for a business-local date range [from, to] (inclusive both
 * ends), for the dashboard's day/week/month calendar views. */
export async function GET(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const businessId = access.business.id;
  const canViewContact = access.canViewCustomerContactInfo;

  const { searchParams } = new URL(req.url);
  const dateParam = searchParams.get("date"); // back-compat: single day
  const fromParam = searchParams.get("from") ?? dateParam;
  const toParam = searchParams.get("to") ?? dateParam;

  if (!fromParam || !toParam || !DATE_RE.test(fromParam) || !DATE_RE.test(toParam)) {
    return NextResponse.json({ error: "INVALID_DATE" }, { status: 400 });
  }

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: { timezone: true },
  });
  if (!business) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  // Same "plain date string parses as UTC midnight" trick used elsewhere —
  // keeps day boundaries correct regardless of the server's own timezone.
  const rangeStartUtc = fromZonedTime(fromParam, business.timezone);
  const rangeEndUtc = addDays(fromZonedTime(toParam, business.timezone), 1);

  const bookings = await prisma.booking.findMany({
    where: {
      businessId,
      startsAt: { lt: rangeEndUtc },
      endsAt: { gt: rangeStartUtc },
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
      customerId: true,
      customerNote: true,
      service: { select: { name: true } },
      staff: { select: { name: true } },
      customer: { select: { name: true, phone: true, email: true } },
      addOns: { select: { name: true } },
      extraServices: { select: { name: true } },
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
      staffName: b.staff?.name ?? null,
      customerId: b.customerId,
      customerNote: b.customerNote,
      serviceName: b.service.name,
      customerName: b.customer.name,
      customerPhone: canViewContact ? b.customer.phone : null,
      customerEmail: canViewContact ? b.customer.email : null,
      addOnNames: [...b.addOns.map((a) => a.name), ...b.extraServices.map((s) => s.name)],
    })),
  });
}
