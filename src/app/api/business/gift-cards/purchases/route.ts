import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { giftCardState } from "@/lib/gift-cards";

/** Every card sold by this salon, newest first, plus totals for the stats panel. */
export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const purchases = await prisma.giftCardPurchase.findMany({
    where: { businessId: owned.businessId },
    include: {
      giftCard: { select: { name: true, salePriceCents: true, currency: true, discountPercent: true, maxUses: true, service: { select: { name: true } } } },
      _count: { select: { redemptions: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 200,
  });

  const now = new Date();
  const rows = purchases.map((p) => ({
    id: p.id,
    code: p.code,
    buyerName: p.buyerName,
    buyerEmail: p.buyerEmail,
    cardName: p.giftCard.name,
    serviceName: p.giftCard.service.name,
    discountPercent: p.giftCard.discountPercent,
    priceCents: p.giftCard.salePriceCents,
    currency: p.giftCard.currency,
    usesLeft: p.usesLeft,
    maxUses: p.giftCard.maxUses,
    redeemedCount: p._count.redemptions,
    expiresAt: p.expiresAt?.toISOString() ?? null,
    createdAt: p.createdAt.toISOString(),
    state: giftCardState(p, now),
  }));

  const paid = rows.filter((r) => r.state !== "PENDING" && r.state !== "CANCELLED");
  const stats = {
    sold: rows.filter((r) => r.state !== "CANCELLED").length,
    pending: rows.filter((r) => r.state === "PENDING").length,
    active: rows.filter((r) => r.state === "ACTIVE").length,
    redeemed: rows.reduce((sum, r) => sum + r.redeemedCount, 0),
    // Currency-agnostic sum is only meaningful when every card uses one currency;
    // the salon's cards share one currency in practice, so take the first's.
    revenueCents: paid.reduce((sum, r) => sum + r.priceCents, 0),
    currency: rows[0]?.currency ?? null,
  };

  return NextResponse.json({ purchases: rows, stats });
}
