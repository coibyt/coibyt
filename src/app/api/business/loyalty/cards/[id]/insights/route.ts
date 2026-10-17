import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Everything the salon knows about one loyalty cardholder: their card, how
 * much they've actually used the salon (matched on the card's email), and
 * their full visit history — powers the post-scan summary and the "details"
 * view on the loyalty page. A visit counts as done once it's COMPLETED, or
 * CONFIRMED and already over (owners rarely mark visits completed by hand). */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const { id } = await params;
  const businessId = access.business.id;

  const card = await prisma.loyaltyCard.findFirst({
    where: { id, businessId },
    include: {
      scans: { orderBy: { createdAt: "desc" }, take: 50, select: { createdAt: true } },
      rewards: { orderBy: { createdAt: "desc" }, take: 50, select: { createdAt: true } },
    },
  });
  if (!card) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const [program, bookings] = await Promise.all([
    prisma.loyaltyProgram.findUnique({ where: { businessId }, select: { pointsRequired: true, discountPercent: true } }),
    prisma.booking.findMany({
      where: { businessId, customer: { email: card.customerEmail } },
      orderBy: { startsAt: "desc" },
      take: 200,
      select: {
        id: true,
        startsAt: true,
        endsAt: true,
        status: true,
        priceCents: true,
        currency: true,
        service: { select: { name: true } },
        staff: { select: { name: true } },
        extraServices: { select: { name: true } },
      },
    }),
  ]);

  const now = new Date();
  const isDone = (b: (typeof bookings)[number]) =>
    b.status === "COMPLETED" || (b.status === "CONFIRMED" && b.endsAt <= now);
  const done = bookings.filter(isDone);

  const revenueByCurrency = new Map<string, number>();
  const serviceCounts = new Map<string, number>();
  let servicesDone = 0;
  for (const b of done) {
    revenueByCurrency.set(b.currency, (revenueByCurrency.get(b.currency) ?? 0) + b.priceCents);
    for (const name of [b.service.name, ...b.extraServices.map((e) => e.name)]) {
      serviceCounts.set(name, (serviceCounts.get(name) ?? 0) + 1);
      servicesDone++;
    }
  }
  const revenue = Array.from(revenueByCurrency, ([currency, cents]) => ({ currency, cents })).sort(
    (a, b) => b.cents - a.cents
  );
  const mainRevenue = revenue[0];

  return NextResponse.json({
    card: {
      id: card.id,
      customerName: card.customerName,
      customerEmail: card.customerEmail,
      customerPhone: card.customerPhone,
      points: card.points,
      totalScans: card.totalScans,
      rewardReady: card.rewardReady,
      rewardsEarned: card.rewardsEarned,
      activatedAt: card.activatedAt.toISOString(),
    },
    program,
    stats: {
      visits: done.length,
      servicesDone,
      revenue,
      avgSpend: mainRevenue
        ? {
            currency: mainRevenue.currency,
            cents: Math.round(mainRevenue.cents / Math.max(1, done.filter((b) => b.currency === mainRevenue.currency).length)),
          }
        : null,
      upcoming: bookings.filter((b) => (b.status === "CONFIRMED" || b.status === "PENDING_PAYMENT") && b.endsAt > now).length,
      cancelled: bookings.filter((b) => b.status === "CANCELLED").length,
      noShow: bookings.filter((b) => b.status === "NO_SHOW").length,
      firstVisitAt: done.length ? done[done.length - 1].startsAt.toISOString() : null,
      lastVisitAt: done.length ? done[0].startsAt.toISOString() : null,
      topServices: Array.from(serviceCounts, ([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
    },
    history: bookings.map((b) => ({
      id: b.id,
      startsAt: b.startsAt.toISOString(),
      serviceName: b.service.name,
      extraServiceNames: b.extraServices.map((e) => e.name),
      staffName: b.staff?.name ?? null,
      priceCents: b.priceCents,
      currency: b.currency,
      status: b.status,
      done: isDone(b),
    })),
    scans: card.scans.map((s) => s.createdAt.toISOString()),
    rewards: card.rewards.map((r) => r.createdAt.toISOString()),
  });
}
