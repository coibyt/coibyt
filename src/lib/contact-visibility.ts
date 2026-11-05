import { addDays } from "date-fns";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import type { BusinessAccess } from "@/lib/current-business";

/** Who may see a customer's phone and email. The owner always; staff only
 * with "customer contact info" on, and only for their own bookings; and if
 * the owner limited it to the booking day (Staff.contactTodayOnly), only
 * while it is that day in the salon's time zone. */

/** The salon's today as [start, end) instants. */
export function salonToday(timezone: string) {
  const day = formatInTimeZone(new Date(), timezone, "yyyy-MM-dd");
  const start = fromZonedTime(day, timezone);
  return { start, end: addDays(start, 1) };
}

/** For one booking: may this person see the customer's contact details? */
export function seesBookingContact(
  access: BusinessAccess,
  b: { startsAt: Date; staffId: string | null; extraStaffIds?: (string | null)[] },
  timezone: string,
) {
  if (!access.canViewCustomerContactInfo) return false;
  if (access.isOwner) return true;
  const mine = b.staffId === access.staffId || (b.extraStaffIds ?? []).includes(access.staffId ?? null);
  if (!mine) return false;
  if (!access.contactTodayOnly) return true;
  const { start, end } = salonToday(timezone);
  return b.startsAt >= start && b.startsAt < end;
}

/** For customer pages: null = may see every customer's contact details;
 * otherwise only these customers' — the ones booked with this person today.
 * (Staff without contact info at all are handled by canViewCustomerContactInfo.) */
export async function contactCustomersToday(access: BusinessAccess, timezone: string): Promise<Set<string> | null> {
  if (access.isOwner || !access.contactTodayOnly || !access.staffId) return null;
  const { start, end } = salonToday(timezone);
  const rows = await prisma.booking.findMany({
    where: {
      businessId: access.business.id,
      status: { notIn: ["CANCELLED", "NO_SHOW"] },
      startsAt: { gte: start, lt: end },
      OR: [{ staffId: access.staffId }, { extraServices: { some: { staffId: access.staffId } } }],
    },
    select: { customerId: true },
  });
  return new Set(rows.map((r) => r.customerId));
}
