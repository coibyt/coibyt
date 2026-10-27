import { prisma } from "@/lib/prisma";

export const AFFILIATE_PERIODS = ["30", "90", "365", "all"] as const;
export type AffiliatePeriod = (typeof AFFILIATE_PERIODS)[number];

export interface AffiliateStats {
  id: string;
  name: string;
  code: string;
  commissionPercent: number;
  email: string | null;
  phone: string | null;
  note: string | null;
  createdAt: string;
  clicks: number;
  /** In the chosen period. */
  bookings: number;
  revenueCents: number;
  commissionCents: number;
  /** All time: bookings ever, commission for visits that have happened,
   * commission for visits still ahead, and what the salon has paid out. */
  bookingsAllTime: number;
  earnedCents: number;
  upcomingCents: number;
  paidCents: number;
  owedCents: number;
  payouts: { id: string; amountCents: number; note: string | null; createdAt: string }[];
}

export interface ReferredBooking {
  id: string;
  affiliateName: string;
  serviceName: string;
  customerName: string;
  startsAt: string;
  priceCents: number;
  commissionCents: number;
  status: string;
}

/** Everything the affiliate dashboard shows, for one salon. Only confirmed
 * or completed bookings count — cancelled and no-show ones earn nothing. */
export async function affiliateDashboard(businessId: string, period: AffiliatePeriod) {
  const affiliates = await prisma.affiliate.findMany({
    where: { businessId, active: true },
    orderBy: { createdAt: "desc" },
    include: { payouts: { orderBy: { createdAt: "desc" } } },
  });
  const bookings = affiliates.length
    ? await prisma.booking.findMany({
        where: { businessId, affiliateId: { in: affiliates.map((a) => a.id) }, status: { in: ["CONFIRMED", "COMPLETED"] } },
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          affiliateId: true,
          startsAt: true,
          createdAt: true,
          status: true,
          priceCents: true,
          affiliateCommissionCents: true,
          service: { select: { name: true } },
          customer: { select: { name: true } },
        },
      })
    : [];

  const now = Date.now();
  const since = period === "all" ? 0 : now - Number(period) * 24 * 60 * 60 * 1000;
  const stats: AffiliateStats[] = affiliates.map((a) => {
    const mine = bookings.filter((b) => b.affiliateId === a.id);
    const inPeriod = mine.filter((b) => b.createdAt.getTime() >= since);
    const commission = (list: typeof mine) => list.reduce((s, b) => s + (b.affiliateCommissionCents ?? 0), 0);
    const earned = commission(mine.filter((b) => b.startsAt.getTime() <= now));
    const paid = a.payouts.reduce((s, p) => s + p.amountCents, 0);
    return {
      id: a.id,
      name: a.name,
      code: a.code,
      commissionPercent: a.commissionPercent,
      email: a.email,
      phone: a.phone,
      note: a.note,
      createdAt: a.createdAt.toISOString(),
      clicks: a.clickCount,
      bookings: inPeriod.length,
      revenueCents: inPeriod.reduce((s, b) => s + b.priceCents, 0),
      commissionCents: commission(inPeriod),
      bookingsAllTime: mine.length,
      earnedCents: earned,
      upcomingCents: commission(mine.filter((b) => b.startsAt.getTime() > now)),
      paidCents: paid,
      owedCents: Math.max(0, earned - paid),
      payouts: a.payouts.slice(0, 10).map((p) => ({ id: p.id, amountCents: p.amountCents, note: p.note, createdAt: p.createdAt.toISOString() })),
    };
  });

  const names = new Map(affiliates.map((a) => [a.id, a.name]));
  const recent: ReferredBooking[] = bookings.slice(0, 12).map((b) => ({
    id: b.id,
    affiliateName: names.get(b.affiliateId!) ?? "",
    serviceName: b.service.name,
    customerName: b.customer.name,
    startsAt: b.startsAt.toISOString(),
    priceCents: b.priceCents,
    commissionCents: b.affiliateCommissionCents ?? 0,
    status: b.status,
  }));

  const sum = (k: keyof AffiliateStats) => stats.reduce((s, a) => s + (a[k] as number), 0);
  return {
    affiliates: stats,
    recent,
    totals: {
      partners: stats.length,
      clicks: sum("clicks"),
      bookings: sum("bookings"),
      revenueCents: sum("revenueCents"),
      commissionCents: sum("commissionCents"),
      owedCents: sum("owedCents"),
    },
  };
}
