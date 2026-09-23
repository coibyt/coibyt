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

interface Window {
  openMinute: number;
  closeMinute: number;
}

function clampWindow(w: Window, bound: Window): Window | null {
  const openMinute = Math.max(w.openMinute, bound.openMinute);
  const closeMinute = Math.min(w.closeMinute, bound.closeMinute);
  return openMinute < closeMinute ? { openMinute, closeMinute } : null;
}

function withinWindows(minute: number, windows: Window[]): boolean {
  return windows.some((w) => minute >= w.openMinute && minute < w.closeMinute);
}

/**
 * Computes bookable start times for a given service on a given calendar date,
 * for either one specific staff member or "any staff who can do this service".
 * All wall-clock math (opening hours, slot grid) happens in the business's own
 * timezone; everything returned is a real UTC Date.
 *
 * Each staff member follows the business's own opening hours UNLESS they have
 * their own StaffHours rows configured, in which case those are used instead
 * (clamped to never exceed the business's hours for that day).
 */
export async function getAvailableSlots(params: {
  businessId: string;
  serviceId: string;
  staffId?: string;
  /** Calendar date as "YYYY-MM-DD", meaning that date in the BUSINESS's own
   * timezone — never parsed against the server's own system timezone. */
  dateStr: string;
  /** Extra minutes tacked on for any add-ons the customer has selected — the
   * chair is occupied for service + add-ons together, so slots must reflect
   * the combined duration, not just the base service. */
  extraDurationMin?: number;
}): Promise<AvailableSlot[]> {
  const { businessId, serviceId, staffId, dateStr, extraDurationMin = 0 } = params;

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

  const businessWindowsToday: Window[] = business.hours
    .filter((h) => h.weekday === weekday)
    .map((h) => ({ openMinute: h.openMinute, closeMinute: h.closeMinute }));
  if (businessWindowsToday.length === 0) return [];

  const staffHours = await prisma.staffHours.findMany({
    where: { staffId: { in: eligibleStaffIds } },
  });
  const hasCustomSchedule = new Set(staffHours.map((h) => h.staffId));

  // Effective bookable windows per staff, already clamped to the business's
  // own hours for this weekday.
  const windowsByStaff = new Map<string, Window[]>();
  for (const staff of staffList) {
    const windows = hasCustomSchedule.has(staff.id)
      ? staffHours
          .filter((h) => h.staffId === staff.id && h.weekday === weekday)
          .map((h) => ({ openMinute: h.openMinute, closeMinute: h.closeMinute }))
      : businessWindowsToday;

    const clamped = windows
      .flatMap((w) => businessWindowsToday.map((b) => clampWindow(w, b)))
      .filter((w): w is Window => w !== null);
    windowsByStaff.set(staff.id, clamped);
  }

  const visibleDuration = service.durationMin + extraDurationMin;
  const duration = visibleDuration + service.bufferMin;

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

  // Candidate start times = every 15-minute mark that falls inside at least
  // one staff's effective window (staff can differ, so union across staff).
  const dayEndMinute = Math.max(
    ...Array.from(windowsByStaff.values()).flatMap((ws) => ws.map((w) => w.closeMinute)),
    0
  );

  const slots: AvailableSlot[] = [];

  for (
    let minute = 0;
    minute + duration <= dayEndMinute;
    minute += SLOT_GRANULARITY_MIN
  ) {
    const slotStartLocal = addMinutes(dayStartLocal, minute);
    const slotStartUtc = fromZonedTime(slotStartLocal, tz);
    const slotEndUtc = addMinutes(slotStartUtc, duration);

    if (isBefore(slotStartUtc, earliestBookable)) continue;

    const freeStaff = staffList.find((staff) => {
      const windows = windowsByStaff.get(staff.id) ?? [];
      if (!withinWindows(minute, windows) || !withinWindows(minute + duration - 1, windows)) {
        return false;
      }
      const busy = busyByStaff.get(staff.id) ?? [];
      return !busy.some((b) => slotStartUtc < b.end && slotEndUtc > b.start);
    });

    if (freeStaff) {
      slots.push({
        startsAt: slotStartUtc,
        endsAt: new Date(slotStartUtc.getTime() + visibleDuration * 60_000),
        staffId: freeStaff.id,
      });
    }
  }

  return slots;
}
