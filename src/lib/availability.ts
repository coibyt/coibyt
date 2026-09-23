import { prisma } from "@/lib/prisma";
import { addMinutes, isBefore } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";

const SLOT_GRANULARITY_MIN = 15;
const MIN_LEAD_TIME_MIN = 30; // can't book fewer than 30 minutes from now

export interface AvailableSlot {
  startsAt: Date;
  endsAt: Date;
  /** staffId that would take this booking when the customer picked "any staff" */
  staffId: string;
}

interface BusyInterval {
  start: Date;
  end: Date;
}

/**
 * Computes bookable start times for a given service on a given calendar date,
 * for either one specific staff member or "any staff who can do this service".
 * All wall-clock math (opening hours, slot grid) happens in the business's own
 * timezone; everything returned is a real UTC Date.
 */
export async function getAvailableSlots(params: {
  businessId: string;
  serviceId: string;
  staffId?: string;
  /** Calendar date as "YYYY-MM-DD", meaning that date in the BUSINESS's own
   * timezone — never parsed against the server's own system timezone (a
   * plain "YYYY-MM-DD" string is guaranteed by the ECMAScript spec to parse
   * as UTC midnight, which is exactly what we reinterpret via fromZonedTime
   * below, regardless of what timezone this Node process happens to run in). */
  dateStr: string;
}): Promise<AvailableSlot[]> {
  const { businessId, serviceId, staffId, dateStr } = params;

  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: { timezone: true, hours: true, closures: true },
  });
  if (!business) return [];

  const service = await prisma.service.findUnique({
    where: { id: serviceId },
    include: { staff: { select: { staffId: true } } },
  });
  if (!service || !service.active) return [];

  const eligibleStaffIds = staffId
    ? [staffId]
    : service.staff.map((s) => s.staffId);
  if (eligibleStaffIds.length === 0) return [];

  const staffList = await prisma.staff.findMany({
    where: { id: { in: eligibleStaffIds }, active: true, businessId },
  });
  if (staffList.length === 0) return [];

  const tz = business.timezone;
  const dayStartUtc = fromZonedTime(dateStr, tz);
  const dayEndUtc = addMinutes(dayStartUtc, 24 * 60);
  const dayStartLocal = toZonedTime(dayStartUtc, tz); // "fake local" Date for wall-clock arithmetic
  const weekday = dayStartLocal.getDay();

  // Closure overrides opening hours entirely for this date. BusinessClosure.date
  // is a plain SQL DATE (no time/zone), so comparing the Y-M-D string is exact.
  const isClosed = business.closures.some(
    (c) => c.date.toISOString().slice(0, 10) === dateStr
  );
  if (isClosed) return [];

  const hoursToday = business.hours.filter((h) => h.weekday === weekday);
  if (hoursToday.length === 0) return [];

  const duration = service.durationMin + service.bufferMin;

  // Load existing bookings + staff time-off for the day, once, for all staff.
  const [bookings, timeOff] = await Promise.all([
    prisma.booking.findMany({
      where: {
        staffId: { in: eligibleStaffIds },
        status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
        startsAt: { lt: dayEndUtc },
        endsAt: { gt: dayStartUtc },
      },
      select: { staffId: true, startsAt: true, endsAt: true },
    }),
    prisma.staffTimeOff.findMany({
      where: {
        staffId: { in: eligibleStaffIds },
        startsAt: { lt: dayEndUtc },
        endsAt: { gt: dayStartUtc },
      },
      select: { staffId: true, startsAt: true, endsAt: true },
    }),
  ]);

  const busyByStaff = new Map<string, BusyInterval[]>();
  for (const staff of staffList) busyByStaff.set(staff.id, []);
  for (const b of bookings) {
    if (!b.staffId) continue;
    busyByStaff.get(b.staffId)?.push({ start: b.startsAt, end: b.endsAt });
  }
  for (const t of timeOff) {
    busyByStaff.get(t.staffId)?.push({ start: t.startsAt, end: t.endsAt });
  }

  const now = new Date();
  const earliestBookable = addMinutes(now, MIN_LEAD_TIME_MIN);

  const slots: AvailableSlot[] = [];

  for (const window of hoursToday) {
    for (
      let minute = window.openMinute;
      minute + duration <= window.closeMinute;
      minute += SLOT_GRANULARITY_MIN
    ) {
      const slotStartLocal = addMinutes(dayStartLocal, minute);
      const slotStartUtc = fromZonedTime(slotStartLocal, tz);
      const slotEndUtc = addMinutes(slotStartUtc, duration);

      if (isBefore(slotStartUtc, earliestBookable)) continue;

      const freeStaff = staffList.find((staff) => {
        const busy = busyByStaff.get(staff.id) ?? [];
        return !busy.some(
          (b) => slotStartUtc < b.end && slotEndUtc > b.start // overlap test
        );
      });

      if (freeStaff) {
        slots.push({
          startsAt: slotStartUtc,
          endsAt: new Date(
            slotStartUtc.getTime() + service.durationMin * 60_000
          ),
          staffId: freeStaff.id,
        });
      }
    }
  }

  return slots;
}
