import { format } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { activeStaffPeriod, groupStaffHours } from "@/lib/staff-hours";

export interface StaffToday {
  /** Working windows today, minutes since midnight in the salon's timezone. */
  windows: { open: number; close: number }[];
  /** Personal time / days off today, clipped to today. */
  timeOff: { start: number; end: number; kind: string | null }[];
  /** off-day: not working today; away: personal time right now; working;
   * before / after: outside today's hours. */
  status: "off-day" | "away" | "working" | "before" | "after";
  bookingsToday: number;
}

export interface StaffInsight {
  bookings30: number;
  revenue30: number;
  rating: number | null;
  reviews: number;
  today: StaffToday;
}

/** Per staff member: how they've done over the last 30 days, their rating,
 * and what today looks like (hours, personal time, bookings, status now). */
export async function staffInsights(businessId: string, staffIds: string[], timezone: string) {
  const now = new Date();
  const local = toZonedTime(now, timezone);
  const dateStr = format(local, "yyyy-MM-dd");
  const weekday = local.getDay();
  const nowMin = local.getHours() * 60 + local.getMinutes();
  const dayStart = fromZonedTime(`${dateStr}T00:00:00`, timezone);
  const dayEnd = new Date(dayStart.getTime() + 24 * 60 * 60 * 1000);
  const since = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

  const [hours, salonHours, timeOff, sold, today, reviews] = await Promise.all([
    prisma.staffHours.findMany({ where: { staffId: { in: staffIds } } }),
    prisma.businessHours.findMany({ where: { businessId, weekday } }),
    prisma.staffTimeOff.findMany({
      where: { staffId: { in: staffIds }, startsAt: { lt: dayEnd }, endsAt: { gt: dayStart } },
      select: { staffId: true, startsAt: true, endsAt: true, kind: true },
    }),
    prisma.booking.groupBy({
      by: ["staffId"],
      where: { businessId, staffId: { in: staffIds }, status: { in: ["CONFIRMED", "COMPLETED"] }, startsAt: { gte: since, lte: now } },
      _count: true,
      _sum: { priceCents: true },
    }),
    prisma.booking.groupBy({
      by: ["staffId"],
      where: { businessId, staffId: { in: staffIds }, status: { in: ["CONFIRMED", "COMPLETED"] }, startsAt: { gte: dayStart, lt: dayEnd } },
      _count: true,
    }),
    prisma.review.findMany({
      where: { businessId, status: { not: "HIDDEN" }, booking: { staffId: { in: staffIds } } },
      select: { rating: true, booking: { select: { staffId: true } } },
    }),
  ]);

  const toLocalMin = (d: Date) => {
    if (d <= dayStart) return 0;
    if (d >= dayEnd) return 24 * 60;
    const z = toZonedTime(d, timezone);
    return z.getHours() * 60 + z.getMinutes();
  };

  const out: Record<string, StaffInsight> = {};
  for (const id of staffIds) {
    const periods = groupStaffHours(hours.filter((h) => h.staffId === id));
    const period = activeStaffPeriod(periods, dateStr);
    // An empty window (both edges dragged together on the calendar) is a day off.
    const windows = (period ? period.windows.filter((w) => w.weekday === weekday) : salonHours)
      .filter((w) => w.closeMinute > w.openMinute)
      .map((w) => ({ open: w.openMinute, close: w.closeMinute }));
    const off = timeOff
      .filter((t) => t.staffId === id)
      .map((t) => ({ start: toLocalMin(t.startsAt), end: toLocalMin(t.endsAt), kind: t.kind }));
    let status: StaffToday["status"];
    if (windows.length === 0 || off.some((o) => o.start <= Math.min(...windows.map((w) => w.open)) && o.end >= Math.max(...windows.map((w) => w.close)))) {
      status = "off-day";
    } else if (off.some((o) => o.start <= nowMin && nowMin < o.end)) status = "away";
    else if (windows.some((w) => w.open <= nowMin && nowMin < w.close)) status = "working";
    else status = nowMin < Math.min(...windows.map((w) => w.open)) ? "before" : "after";

    const mine = reviews.filter((r) => r.booking.staffId === id);
    const s = sold.find((x) => x.staffId === id);
    out[id] = {
      bookings30: s?._count ?? 0,
      revenue30: s?._sum.priceCents ?? 0,
      rating: mine.length ? Math.round((mine.reduce((n, r) => n + r.rating, 0) / mine.length) * 10) / 10 : null,
      reviews: mine.length,
      today: { windows, timeOff: off, status, bookingsToday: today.find((x) => x.staffId === id)?._count ?? 0 },
    };
  }
  return out;
}
