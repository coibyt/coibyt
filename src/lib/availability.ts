import { prisma } from "@/lib/prisma";
import { addMinutes, isBefore } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { activeStaffPeriod, groupStaffHours, type HoursPeriod } from "@/lib/staff-hours";
import { siblingRows } from "@/lib/staff-branches";

const SLOT_GRANULARITY_MIN = 15;
const MIN_LEAD_TIME_MIN = 30; // can't book fewer than 30 minutes from now

export interface ComboAssignment {
  /** "primary" for the booking's main service, else the extra service's own
   * id — same convention as serviceSlots() in src/lib/booking-slots.ts. */
  key: string;
  serviceId: string;
  name: string;
  staffId: string;
  staffName: string;
  /** Includes this position's own bufferMin — the actual interval this staff
   * member is occupied and should be checked/stored as busy. The NEXT
   * service's startsAt is not pushed out by this buffer (see the parent
   * slot's own endsAt, which stays at the customer-visible end of the whole
   * sequence) — the customer moves straight on to the next staff member
   * while this one is still mid-cleanup. */
  startsAt: Date;
  endsAt: Date;
}

export interface AvailableSlot {
  startsAt: Date;
  endsAt: Date;
  /** staffId that would take this booking when the customer picked "any staff"
   * — for a split/combo slot, this is the PRIMARY service's staff. */
  staffId: string;
  /** This staff member's own price/duration for the base service (their
   * StaffService override, or the service's own price/duration otherwise) —
   * add-ons and extra services are summed on top of this by the caller. */
  priceCents: number;
  durationMin: number;
  /** Present only when no single staff member could do every selected
   * service back-to-back, so each one is done by whichever staff is free,
   * in order — absent for an ordinary single-staff slot. */
  assignments?: ComboAssignment[];
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

/** Shared per-staff scheduling inputs for one calendar day — computed once
 * for whichever set of staff IDs needs it (the primary service's own
 * eligible staff, or the broader union needed for combo slots). */
async function loadStaffDaySchedule(params: {
  staffIds: string[];
  businessId: string;
  dateStr: string;
  tz: string;
  dayStartUtc: Date;
  dayEndUtc: Date;
  dayStartLocal: Date;
  weekday: number;
  businessWindowsToday: Window[];
}) {
  const { staffIds, businessId, dateStr, dayStartUtc, dayEndUtc, weekday, businessWindowsToday } = params;

  const staffList = await prisma.staff.findMany({
    where: { id: { in: staffIds }, active: true, businessId },
  });

  const staffHourRows = await prisma.staffHours.findMany({
    where: { staffId: { in: staffIds } },
  });
  const periodsByStaff = new Map<string, HoursPeriod[]>();
  for (const staff of staffList) {
    periodsByStaff.set(staff.id, groupStaffHours(staffHourRows.filter((h) => h.staffId === staff.id)));
  }

  const windowsByStaff = new Map<string, Window[]>();
  for (const staff of staffList) {
    const period = activeStaffPeriod(periodsByStaff.get(staff.id) ?? [], dateStr);
    const windows = period
      ? period.windows.filter((w) => w.weekday === weekday).map((w) => ({ openMinute: w.openMinute, closeMinute: w.closeMinute }))
      : businessWindowsToday;
    const clamped = windows
      .flatMap((w) => businessWindowsToday.map((b) => clampWindow(w, b)))
      .filter((w): w is Window => w !== null);
    windowsByStaff.set(staff.id, clamped);
  }

  // The same people's rows at the owner's other branches: what they have
  // there takes the same time here.
  const siblings = await siblingRows(staffIds);
  const allIds = [...staffIds, ...siblings.keys()];
  const local = (id: string) => siblings.get(id)?.localId ?? id;

  const [bookings, extraSlots, timeOff] = await Promise.all([
    prisma.booking.findMany({
      where: {
        staffId: { in: allIds },
        status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
        startsAt: { lt: dayEndUtc },
        endsAt: { gt: dayStartUtc },
      },
      select: { staffId: true, startsAt: true, endsAt: true },
    }),
    prisma.bookingExtraService.findMany({
      where: {
        staffId: { in: allIds },
        startsAt: { lt: dayEndUtc },
        endsAt: { gt: dayStartUtc },
        booking: { status: { in: ["PENDING_PAYMENT", "CONFIRMED"] } },
      },
      select: { staffId: true, startsAt: true, endsAt: true },
    }),
    prisma.staffTimeOff.findMany({
      where: { staffId: { in: allIds }, startsAt: { lt: dayEndUtc }, endsAt: { gt: dayStartUtc } },
      select: { staffId: true, startsAt: true, endsAt: true },
    }),
  ]);

  const busyByStaff = new Map<string, BusyInterval[]>();
  for (const staff of staffList) busyByStaff.set(staff.id, []);
  for (const b of bookings) {
    if (!b.staffId) continue;
    busyByStaff.get(local(b.staffId))?.push({ start: b.startsAt, end: b.endsAt });
  }
  for (const x of extraSlots) {
    if (!x.staffId || !x.startsAt || !x.endsAt) continue;
    busyByStaff.get(local(x.staffId))?.push({ start: x.startsAt, end: x.endsAt });
  }
  for (const t of timeOff) {
    busyByStaff.get(local(t.staffId))?.push({ start: t.startsAt, end: t.endsAt });
  }

  const now = new Date();
  const earliestBookableByStaff = new Map<string, Date>();
  for (const staff of staffList) {
    earliestBookableByStaff.set(staff.id, addMinutes(now, Math.max(MIN_LEAD_TIME_MIN, staff.leadTimeMinutes)));
  }

  return { staffList, windowsByStaff, busyByStaff, earliestBookableByStaff };
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
 *
 * When the customer also booked other full services in the same visit
 * (extraServiceIds) and picked "any staff", this also looks for "combo"
 * slots: if no single staff member can do every service back-to-back, each
 * one is assigned to whichever eligible staff is free, in selection order,
 * immediately one after another — never offered when a specific staffId is
 * requested, since that customer wants that one person specifically.
 */
export async function getAvailableSlots(params: {
  businessId: string;
  serviceId: string;
  staffId?: string;
  /** Calendar date as "YYYY-MM-DD", meaning that date in the BUSINESS's own
   * timezone — never parsed against the server's own system timezone. */
  dateStr: string;
  /** Extra minutes for any add-ons the customer selected — these always ride
   * along with the primary service under whichever staff does it, never
   * independently assignable to a different staff member. */
  addOnDurationMin?: number;
  /** Other full services booked in the same visit (e.g. manicure + pedicure)
   * — ids only; this function re-reads their own durations/buffers/eligible
   * staff itself, never trusting a client-supplied duration. */
  extraServiceIds?: string[];
}): Promise<AvailableSlot[]> {
  const { businessId, serviceId, staffId, dateStr, addOnDurationMin = 0, extraServiceIds = [] } = params;

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

  const extraServiceRecords = extraServiceIds.length
    ? await prisma.service.findMany({
        where: { id: { in: extraServiceIds }, businessId, active: true },
        select: { id: true, name: true, priceCents: true, durationMin: true, bufferMin: true },
      })
    : [];
  // Prisma doesn't guarantee `in`-query result order — re-sort to match the
  // order the customer actually selected them in, since that order decides
  // the back-to-back sequence for combo slots.
  extraServiceRecords.sort((a, b) => extraServiceIds.indexOf(a.id) - extraServiceIds.indexOf(b.id));
  const extraServicesDurationSum = extraServiceRecords.reduce((sum, s) => sum + s.durationMin, 0);
  const lumpExtraDurationMin = addOnDurationMin + extraServicesDurationSum;

  // Which staff can do each EXTRA service — looked up up front, since it
  // gates both (a) who still counts as able to do the WHOLE combination
  // solo below, and (b) who split-off combo slots can assign each extra to.
  // A staff member with no StaffService row for a given service isn't set up
  // to perform it at all, extra or not.
  const eligibleStaffIdsByService = new Map<string, string[]>();
  if (extraServiceRecords.length > 0) {
    for (const s of extraServiceRecords) eligibleStaffIdsByService.set(s.id, []);
    const extraStaffLinks = await prisma.staffService.findMany({
      where: { serviceId: { in: extraServiceRecords.map((s) => s.id) } },
      select: { staffId: true, serviceId: true },
    });
    for (const link of extraStaffLinks) {
      eligibleStaffIdsByService.get(link.serviceId)?.push(link.staffId);
    }
  }

  const primaryEligibleIds = staffId ? [staffId] : service.staff.map((s) => s.staffId);
  if (primaryEligibleIds.length === 0) return [];

  // Only a staff member who can ALSO do every extra service still counts as
  // able to do this whole combination solo — someone who only offers the
  // primary service isn't magically qualified for the others just because
  // they're free at the time.
  const singleStaffEligibleIds =
    extraServiceRecords.length > 0
      ? primaryEligibleIds.filter((id) =>
          extraServiceRecords.every((es) => (eligibleStaffIdsByService.get(es.id) ?? []).includes(id))
        )
      : primaryEligibleIds;

  const overrides = await prisma.staffService.findMany({
    where: { serviceId, staffId: { in: primaryEligibleIds } },
    select: { staffId: true, priceCentsOverride: true, durationMinOverride: true },
  });
  const overrideByStaff = new Map(overrides.map((o) => [o.staffId, o]));
  const priceByStaff = new Map<string, number>();
  const baseDurationByStaff = new Map<string, number>(); // service duration, no add-ons/buffer
  for (const id of primaryEligibleIds) {
    const override = overrideByStaff.get(id);
    priceByStaff.set(id, override?.priceCentsOverride ?? service.priceCents);
    baseDurationByStaff.set(id, override?.durationMinOverride ?? service.durationMin);
  }

  const tz = business.timezone;
  const dayStartUtc = fromZonedTime(dateStr, tz);
  const dayEndUtc = addMinutes(dayStartUtc, 24 * 60);
  const dayStartLocal = toZonedTime(dayStartUtc, tz); // "fake local" Date for wall-clock arithmetic
  const weekday = dayStartLocal.getDay();

  // Closure overrides opening hours entirely for this date. BusinessClosure.date
  // is a plain SQL DATE (no time/zone), so comparing the Y-M-D string is exact.
  const isClosed = business.closures.some((c) => c.date.toISOString().slice(0, 10) === dateStr);
  if (isClosed) return [];

  const businessWindowsToday: Window[] = business.hours
    .filter((h) => h.weekday === weekday)
    .map((h) => ({ openMinute: h.openMinute, closeMinute: h.closeMinute }));
  if (businessWindowsToday.length === 0) return [];

  const scheduleParams = { businessId, dateStr, tz, dayStartUtc, dayEndUtc, dayStartLocal, weekday, businessWindowsToday };

  const { staffList, windowsByStaff, busyByStaff, earliestBookableByStaff } = await loadStaffDaySchedule({
    staffIds: singleStaffEligibleIds,
    ...scheduleParams,
  });

  const visibleDurationByStaff = new Map<string, number>();
  const durationByStaff = new Map<string, number>(); // includes buffer — the chair's actual occupied time
  for (const staff of staffList) {
    const visible = baseDurationByStaff.get(staff.id)! + lumpExtraDurationMin;
    visibleDurationByStaff.set(staff.id, visible);
    durationByStaff.set(staff.id, visible + service.bufferMin);
  }
  const minDuration = Math.min(...Array.from(durationByStaff.values()));

  // Candidate start times = every 15-minute mark that falls inside at least
  // one staff's effective window (staff can differ, so union across staff).
  const dayEndMinute = Math.max(
    ...Array.from(windowsByStaff.values()).flatMap((ws) => ws.map((w) => w.closeMinute)),
    0
  );

  const slots: AvailableSlot[] = [];

  for (let minute = 0; minute + minDuration <= dayEndMinute; minute += SLOT_GRANULARITY_MIN) {
    const slotStartLocal = addMinutes(dayStartLocal, minute);
    const slotStartUtc = fromZonedTime(slotStartLocal, tz);

    // Prefer the cheapest staff among everyone free at this slot, so an
    // "any staff" customer gets quoted the lowest price by default. Each
    // staff member can have their own duration (a StaffService override),
    // so their own end time — not a shared one — decides their own window
    // and overlap checks.
    const freeCandidates = staffList.filter((staff) => {
      const staffDuration = durationByStaff.get(staff.id)!;
      const slotEndUtc = addMinutes(slotStartUtc, staffDuration);
      const earliestBookable = earliestBookableByStaff.get(staff.id)!;
      if (isBefore(slotStartUtc, earliestBookable)) return false;
      const windows = windowsByStaff.get(staff.id) ?? [];
      if (!withinWindows(minute, windows) || !withinWindows(minute + staffDuration - 1, windows)) {
        return false;
      }
      const busy = busyByStaff.get(staff.id) ?? [];
      return !busy.some((b) => slotStartUtc < b.end && slotEndUtc > b.start);
    });
    const freeStaff = freeCandidates.length
      ? freeCandidates.reduce((cheapest, s) => (priceByStaff.get(s.id)! < priceByStaff.get(cheapest.id)! ? s : cheapest))
      : undefined;

    if (freeStaff) {
      slots.push({
        startsAt: slotStartUtc,
        endsAt: new Date(slotStartUtc.getTime() + visibleDurationByStaff.get(freeStaff.id)! * 60_000),
        staffId: freeStaff.id,
        priceCents: priceByStaff.get(freeStaff.id)!,
        durationMin: visibleDurationByStaff.get(freeStaff.id)!,
      });
    }
  }

  // ---- Combo slots: when no single staff member can do everything
  // back-to-back, split the services across whoever is free, in order.
  // Only ever offered in "any staff" mode — a customer who picked a specific
  // staff member wants that person, not a split booking. ----
  if (!staffId && extraServiceRecords.length > 0) {
    const comboStaffIdSet = new Set<string>(primaryEligibleIds);
    for (const ids of eligibleStaffIdsByService.values()) for (const id of ids) comboStaffIdSet.add(id);
    const comboStaffIds = Array.from(comboStaffIdSet);

    if (comboStaffIds.length > 0) {
      const combo = await loadStaffDaySchedule({ staffIds: comboStaffIds, ...scheduleParams });
      const comboStaffById = new Map(combo.staffList.map((s) => [s.id, s]));

      function findFreeStaff(
        candidateIds: string[],
        windowStartUtc: Date,
        durationForStaff: (staffId: string) => number,
        bufferMin: number,
        preferCheapest: boolean
      ): string | null {
        const startLocalMinute = Math.round(
          (toZonedTime(windowStartUtc, tz).getTime() - dayStartLocal.getTime()) / 60_000
        );
        const candidates = candidateIds.filter((id) => {
          if (!comboStaffById.has(id)) return false;
          const duration = durationForStaff(id);
          const occupiedEndUtc = addMinutes(windowStartUtc, duration + bufferMin);
          const earliest = combo.earliestBookableByStaff.get(id)!;
          if (isBefore(windowStartUtc, earliest)) return false;
          const windows = combo.windowsByStaff.get(id) ?? [];
          if (
            !withinWindows(startLocalMinute, windows) ||
            !withinWindows(startLocalMinute + duration + bufferMin - 1, windows)
          ) {
            return false;
          }
          const busy = combo.busyByStaff.get(id) ?? [];
          return !busy.some((b) => windowStartUtc < b.end && occupiedEndUtc > b.start);
        });
        if (candidates.length === 0) return null;
        if (!preferCheapest) return candidates[0];
        return candidates.reduce((cheapest, id) =>
          priceByStaff.get(id)! < priceByStaff.get(cheapest)! ? id : cheapest
        );
      }

      const comboDayEndMinute = Math.max(
        ...Array.from(combo.windowsByStaff.values()).flatMap((ws) => ws.map((w) => w.closeMinute)),
        0
      );
      const alreadyCoveredStarts = new Set(slots.map((s) => s.startsAt.getTime()));

      for (let minute = 0; minute < comboDayEndMinute; minute += SLOT_GRANULARITY_MIN) {
        const slotStartLocal = addMinutes(dayStartLocal, minute);
        const slotStartUtc = fromZonedTime(slotStartLocal, tz);
        // Prefer the simpler single-staff option when both exist for this time.
        if (alreadyCoveredStarts.has(slotStartUtc.getTime())) continue;

        let cursor = slotStartUtc;
        const assignments: ComboAssignment[] = [];

        const primaryStaffId = findFreeStaff(
          primaryEligibleIds,
          cursor,
          (id) => baseDurationByStaff.get(id)! + addOnDurationMin,
          service.bufferMin,
          true
        );
        if (!primaryStaffId) continue;
        const primaryDuration = baseDurationByStaff.get(primaryStaffId)! + addOnDurationMin;
        assignments.push({
          key: "primary",
          serviceId,
          name: service.name,
          staffId: primaryStaffId,
          staffName: comboStaffById.get(primaryStaffId)!.name,
          startsAt: cursor,
          endsAt: addMinutes(cursor, primaryDuration + service.bufferMin),
        });
        cursor = addMinutes(cursor, primaryDuration);

        let ok = true;
        for (const es of extraServiceRecords) {
          const candidateIds = eligibleStaffIdsByService.get(es.id) ?? [];
          const chosen = findFreeStaff(candidateIds, cursor, () => es.durationMin, es.bufferMin, false);
          if (!chosen) {
            ok = false;
            break;
          }
          assignments.push({
            key: es.id,
            serviceId: es.id,
            name: es.name,
            staffId: chosen,
            staffName: comboStaffById.get(chosen)!.name,
            startsAt: cursor,
            endsAt: addMinutes(cursor, es.durationMin + es.bufferMin),
          });
          cursor = addMinutes(cursor, es.durationMin);
        }

        if (!ok) continue;
        // Only worth surfacing as a distinct combo slot if it actually spans
        // more than one staff member — if a single staff could cover
        // everything, the single-staff pass above would already have found
        // this exact start time.
        if (new Set(assignments.map((a) => a.staffId)).size < 2) continue;

        slots.push({
          startsAt: slotStartUtc,
          endsAt: cursor,
          staffId: primaryStaffId,
          priceCents: priceByStaff.get(primaryStaffId)!,
          durationMin: Math.round((cursor.getTime() - slotStartUtc.getTime()) / 60_000),
          assignments,
        });
      }

      slots.sort((a, b) => a.startsAt.getTime() - b.startsAt.getTime());
    }
  }

  return slots;
}
