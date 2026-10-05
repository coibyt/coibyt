import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { addDays } from "date-fns";

/** The salon confirms it received payment: the card starts its validity clock
 * now and can be redeemed from this point on. */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const purchase = await prisma.giftCardPurchase.findFirst({
    where: { id, businessId: owned.businessId },
    include: { giftCard: { select: { validDays: true } } },
  });
  if (!purchase) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (purchase.status !== "PENDING_PAYMENT") {
    return NextResponse.json({ error: "NOT_PENDING" }, { status: 409 });
  }

  const now = new Date();
  await prisma.giftCardPurchase.update({
    where: { id },
    data: {
      status: "ACTIVE",
      activatedAt: now,
      expiresAt: addDays(now, purchase.giftCard.validDays),
    },
  });
  return NextResponse.json({ ok: true });
}
