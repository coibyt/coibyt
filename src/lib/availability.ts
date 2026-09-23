import { prisma } from "@/lib/prisma";
import { addMinutes, isBefore, startOfDay } from "date-fns";
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
  date: Date; // any Date on the target calendar day, business-local
}): Promise<AvailableSlot[]> {
  const { businessId, serviceId, staffId, date } = params;

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
  const zonedDate = toZonedTime(date, tz);
  const weekday = zonedDate.getDay();
  const dayStartLocal = startOfDay(zonedDate);

  // Closure overrides opening hours entirely for this date.
  const isClosed = business.closures.some(
    (c) => toZonedTime(c.date, tz).toDateString() === dayStartLocal.toDateString()
  );
  if (isClosed) return [];

  const hoursToday = business.hours.filter((h) => h.weekday === weekday);
  if (hoursToday.length === 0) return [];

  const duration = service.durationMin + service.bufferMin;

  // Load existing bookings + staff time-off for the day, once, for all staff.
  const dayStartUtc = fromZonedTime(dayStartLocal, tz);
  const dayEndUtc = fromZonedTime(addMinutes(dayStartLocal, 24 * 60), tz);

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
