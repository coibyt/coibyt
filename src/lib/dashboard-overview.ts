import { addDays, addMonths, startOfDay, startOfMonth, subDays, subMonths } from "date-fns";
import { fromZonedTime, toZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";

const EARNING = ["CONFIRMED", "COMPLETED"] as const;
type Status = "PENDING_PAYMENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED" | "NO_SHOW";

function pctChange(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 100);
}

/** Everything the dashboard overview shows, computed on the salon's own
 * calendar (its timezone), not the server's. `staffId` limits bookings to one
 * staff member's own (a staff login without "see all bookings"). */
export async function loadDashboardOverview({
  businessId,
  timezone,
  currency: salonCurrency,
  staffId,
}: {
  businessId: string;
  timezone: string;
  /** The currency the salon chose in its settings — prices are entered in
   * it, so every total is shown in it too (an old booking may still carry a
   * different currency code from before the salon switched). */
  currency: string;
  staffId?: string;
}) {
  const tz = timezone;
  const nowZ = toZonedTime(new Date(), tz);
  const at = (wallClock: Date) => fromZonedTime(wallClock, tz);

  const todayStart = at(startOfDay(nowZ));
  const tomorrowStart = at(startOfDay(addDays(nowZ, 1)));
  const weekEnd = at(startOfDay(addDays(nowZ, 7)));
  const monthStart = at(startOfMonth(nowZ));
  const nextMonthStart = at(startOfMonth(addMonths(nowZ, 1)));
  const lastMonthStart = at(startOfMonth(subMonths(nowZ, 1)));
  // Month-to-date vs the same stretch of last month, so the 3rd of the
  // month isn't compared against a whole finished month.
  const lastMonthSameDay = at(addDays(startOfDay(subMonths(nowZ, 1)), 1));
  const sixMonthsStart = at(startOfMonth(subMonths(nowZ, 5)));
  const ninetyDaysAgo = subDays(new Date(), 90);
  const thirtyDaysAgo = subDays(new Date(), 30);
  const sixtyDaysAgo = subDays(new Date(), 60);

  const staffFilter = staffId ? { staffId } : {};

  const [
    history,
    upcoming,
    recentlyBooked,
    services,
    staff,
    firstVisits,
    reviewAgg,
    pendingReviews,
    latestReviews,
    unreadMessages,
    ordersMonth,
    ordersToHandle,
    giftCardsMonth,
    giftCardsPending,
    loyaltyCards,
    loyaltyScansMonth,
    views30,
    viewsPrev30,
    anyService,
    qrScans30,
  ] = await Promise.all([
    prisma.booking.findMany({
      where: { businessId, ...staffFilter, startsAt: { gte: sixMonthsStart, lt: nextMonthStart } },
      select: { startsAt: true, priceCents: true, currency: true, status: true, serviceId: true, staffId: true },
    }),
    prisma.booking.findMany({
      where: {
        businessId,
        ...staffFilter,
        startsAt: { gte: todayStart, lt: weekEnd },
        status: { in: ["CONFIRMED", "COMPLETED", "PENDING_PAYMENT", "NO_SHOW"] },
      },
      orderBy: { startsAt: "asc" },
      select: {
        id: true,
        startsAt: true,
        endsAt: true,
        status: true,
        priceCents: true,
        currency: true,
        source: true,
        customer: { select: { name: true } },
        service: { select: { name: true } },
        staff: { select: { id: true, name: true } },
      },
    }),
    prisma.booking.findMany({
      where: { businessId, ...staffFilter },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        createdAt: true,
        startsAt: true,
        status: true,
        source: true,
        priceCents: true,
        currency: true,
        customer: { select: { name: true } },
        service: { select: { name: true } },
      },
    }),
    prisma.service.findMany({ where: { businessId }, select: { id: true, name: true } }),
    prisma.staff.findMany({
      where: { businessId, active: true },
      select: { id: true, name: true, avatar: { select: { updatedAt: true } } },
    }),
    // Each customer's first-ever visit here — "new customers" are the ones
    // whose first booking falls in this month.
    prisma.booking.groupBy({
      by: ["customerId"],
      where: { businessId, status: { in: [...EARNING] } },
      _min: { startsAt: true },
    }),
    prisma.review.aggregate({
      where: { businessId, status: "APPROVED" },
      _avg: { rating: true },
      _count: true,
    }),
    prisma.review.count({ where: { businessId, status: "PENDING" } }),
    prisma.review.findMany({
      where: { businessId },
      orderBy: { createdAt: "desc" },
      take: 3,
      select: {
        id: true,
        rating: true,
        comment: true,
        status: true,
        createdAt: true,
        customer: { select: { name: true } },
        booking: { select: { service: { select: { name: true } } } },
      },
    }),
    prisma.message.count({ where: { conversation: { businessId }, senderType: "CUSTOMER", readAt: null } }),
    prisma.order.findMany({
      where: { businessId, createdAt: { gte: monthStart }, status: { in: ["CONFIRMED", "COMPLETED"] } },
      select: { totalCents: true, currency: true },
    }),
    prisma.order.count({ where: { businessId, status: "CONFIRMED" } }),
    prisma.giftCardPurchase.findMany({
      where: { businessId, status: "ACTIVE", createdAt: { gte: monthStart } },
      select: { giftCard: { select: { salePriceCents: true, currency: true } } },
    }),
    prisma.giftCardPurchase.count({ where: { businessId, status: "PENDING_PAYMENT" } }),
    prisma.loyaltyCard.count({ where: { businessId } }),
    prisma.loyaltyScan.count({ where: { card: { businessId }, createdAt: { gte: monthStart } } }),
    prisma.businessPageView.count({ where: { businessId, createdAt: { gte: thirtyDaysAgo } } }),
    prisma.businessPageView.count({ where: { businessId, createdAt: { gte: sixtyDaysAgo, lt: thirtyDaysAgo } } }),
    prisma.service.findFirst({ where: { businessId }, select: { currency: true } }),
    prisma.qrScan.groupBy({ by: ["source"], where: { businessId, createdAt: { gte: thirtyDaysAgo } }, _count: true }),
  ]);

  const currency = salonCurrency || anyService?.currency || "EUR";
  const earning = (s: Status) => s === "CONFIRMED" || s === "COMPLETED";
  const inRange = (d: Date, from: Date, to: Date) => d >= from && d < to;

  // KPIs
  const thisMonth = history.filter((b) => earning(b.status) && inRange(b.startsAt, monthStart, nextMonthStart));
  const monthToDate = thisMonth.filter((b) => b.startsAt < tomorrowStart);
  const lastMonthToDate = history.filter(
    (b) => earning(b.status) && inRange(b.startsAt, lastMonthStart, lastMonthSameDay)
  );
  const revenueMonth = thisMonth.reduce((s, b) => s + b.priceCents, 0);
  const revenueDone = monthToDate.reduce((s, b) => s + b.priceCents, 0);
  const revenueLastSame = lastMonthToDate.reduce((s, b) => s + b.priceCents, 0);
  const newCustomers = firstVisits.filter((c) => c._min.startsAt && inRange(c._min.startsAt, monthStart, nextMonthStart)).length;
  const newCustomersLast = firstVisits.filter(
    (c) => c._min.startsAt && inRange(c._min.startsAt, lastMonthStart, lastMonthSameDay)
  ).length;

  // Six-month revenue bars
  const months = Array.from({ length: 6 }, (_, i) => {
    const wall = startOfMonth(subMonths(nowZ, 5 - i));
    const from = at(wall);
    const to = at(startOfMonth(addMonths(wall, 1)));
    const rows = history.filter((b) => earning(b.status) && inRange(b.startsAt, from, to));
    return { month: wall, revenueCents: rows.reduce((s, b) => s + b.priceCents, 0), bookings: rows.length };
  });

  // Status mix over the last 90 days (past appointments only)
  const now = new Date();
  const past90 = history.filter((b) => b.startsAt >= ninetyDaysAgo && b.startsAt < now);
  const statusMix = {
    completed: past90.filter((b) => b.status === "COMPLETED" || b.status === "CONFIRMED").length,
    cancelled: past90.filter((b) => b.status === "CANCELLED").length,
    noShow: past90.filter((b) => b.status === "NO_SHOW").length,
  };
  const statusTotal = statusMix.completed + statusMix.cancelled + statusMix.noShow;

  // Top services / staff this month
  const serviceName = new Map(services.map((s) => [s.id, s.name]));
  const bySvc = new Map<string, { count: number; revenueCents: number }>();
  for (const b of thisMonth) {
    const e = bySvc.get(b.serviceId) ?? { count: 0, revenueCents: 0 };
    e.count++;
    e.revenueCents += b.priceCents;
    bySvc.set(b.serviceId, e);
  }
  const topServices = [...bySvc.entries()]
    .map(([id, e]) => ({ id, name: serviceName.get(id) ?? "—", ...e }))
    .sort((a, b) => b.revenueCents - a.revenueCents || b.count - a.count)
    .slice(0, 5);

  const staffStats = staff
    .map((s) => {
      const rows = thisMonth.filter((b) => b.staffId === s.id);
      const today = upcoming.filter((b) => b.staff?.id === s.id && inRange(b.startsAt, todayStart, tomorrowStart));
      return {
        id: s.id,
        name: s.name,
        avatarUrl: s.avatar ? `/api/staff-avatar/${s.id}?v=${s.avatar.updatedAt.getTime()}` : null,
        bookings: rows.length,
        revenueCents: rows.reduce((sum, b) => sum + b.priceCents, 0),
        today: today.length,
      };
    })
    .sort((a, b) => b.revenueCents - a.revenueCents || b.bookings - a.bookings);

  // Today + next 7 days
  const today = upcoming.filter((b) => inRange(b.startsAt, todayStart, tomorrowStart));
  const todayRevenue = today.filter((b) => earning(b.status)).reduce((s, b) => s + b.priceCents, 0);
  const nextUp = today.find((b) => b.startsAt > now && (b.status === "CONFIRMED" || b.status === "PENDING_PAYMENT")) ?? null;
  const week = Array.from({ length: 7 }, (_, i) => {
    const wall = startOfDay(addDays(nowZ, i));
    const from = at(wall);
    const to = at(startOfDay(addDays(nowZ, i + 1)));
    const rows = upcoming.filter((b) => inRange(b.startsAt, from, to) && b.status !== "NO_SHOW");
    return { day: wall, count: rows.length, revenueCents: rows.reduce((s, b) => s + b.priceCents, 0) };
  });
  const pendingPayment = upcoming.filter((b) => b.status === "PENDING_PAYMENT").length;

  return {
    currency,
    nowZ,
    kpi: {
      revenueMonth,
      revenueDone,
      revenueChange: pctChange(revenueDone, revenueLastSame),
      bookingsMonth: thisMonth.length,
      bookingsChange: pctChange(monthToDate.length, lastMonthToDate.length),
      newCustomers,
      newCustomersChange: pctChange(newCustomers, newCustomersLast),
      rating: reviewAgg._avg.rating,
      ratingCount: reviewAgg._count,
      views30,
      viewsChange: pctChange(views30, viewsPrev30),
    },
    today,
    todayRevenue,
    nextUp,
    week,
    months,
    statusMix,
    statusTotal,
    topServices,
    staffStats,
    recentlyBooked,
    latestReviews,
    attention: {
      unreadMessages,
      pendingReviews,
      pendingPayment,
      ordersToHandle,
      giftCardsPending,
    },
    extras: {
      ordersMonth: ordersMonth.length,
      ordersRevenue: ordersMonth.reduce((s, o) => s + o.totalCents, 0),
      giftCardsMonth: giftCardsMonth.length,
      giftCardsRevenue: giftCardsMonth.reduce((s, g) => s + g.giftCard.salePriceCents, 0),
      loyaltyCards,
      loyaltyScansMonth,
      qrScans30: qrScans30.reduce((s, r) => s + r._count, 0),
      qrScansPriceList: qrScans30.find((r) => r.source === "price_list")?._count ?? 0,
      qrScansPoster: qrScans30.find((r) => r.source === "qr_poster")?._count ?? 0,
    },
  };
}

export type DashboardOverview = Awaited<ReturnType<typeof loadDashboardOverview>>;
