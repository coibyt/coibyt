import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { giftCardState, redeemGiftCard } from "@/lib/gift-cards";

const schema = z.object({
  code: z.string().trim().min(4).max(32),
  /** "lookup" only shows the card; "redeem" records one use. */
  action: z.enum(["lookup", "redeem"]),
});

async function describe(businessId: string, code: string) {
  const p = await prisma.giftCardPurchase.findFirst({
    where: { code: code.trim().toUpperCase(), businessId },
    include: {
      giftCard: { select: { name: true, discountPercent: true, maxUses: true, service: { select: { name: true } } } },
      _count: { select: { redemptions: true } },
    },
  });
  if (!p) return null;
  return {
    code: p.code,
    buyerName: p.buyerName,
    cardName: p.giftCard.name,
    serviceName: p.giftCard.service.name,
    discountPercent: p.giftCard.discountPercent,
    usesLeft: p.usesLeft,
    maxUses: p.giftCard.maxUses,
    expiresAt: p.expiresAt?.toISOString() ?? null,
    state: giftCardState(p),
  };
}

export async function POST(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const businessId = access.business.id;

  if (parsed.data.action === "lookup") {
    const card = await describe(businessId, parsed.data.code);
    if (!card) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    return NextResponse.json({ card });
  }

  const result = await redeemGiftCard({ businessId, code: parsed.data.code });
  if (!result.ok) {
    const card = await describe(businessId, parsed.data.code);
    return NextResponse.json({ ok: false, reason: result.reason, card }, { status: 409 });
  }
  const card = await describe(businessId, parsed.data.code);
  return NextResponse.json({ ok: true, card });
}
