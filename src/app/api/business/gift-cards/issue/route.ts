import { NextResponse } from "next/server";
import { z } from "zod";
import { addDays } from "date-fns";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { newUniqueGiftCode } from "@/lib/gift-cards";
import { emailGiftCard } from "@/lib/gift-card-image";

const schema = z.object({
  giftCardId: z.string().cuid(),
  recipientName: z.string().trim().min(1).max(120),
  recipientEmail: z.string().trim().email().max(180),
  recipientPhone: z.string().trim().max(30).optional().or(z.literal("")),
  message: z.string().trim().max(160).optional().or(z.literal("")),
  paid: z.boolean().default(true),
  locale: z.string().max(5).default("vi"),
});

/** The salon issues a card straight from the dashboard (sold at the counter,
 * or given as a present) and emails it as a designed image. Marked paid by
 * default, so its validity clock starts now; unpaid cards wait for the usual
 * "confirm payment" step. The card is created even if the email fails — the
 * owner can resend it from the list. */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = schema.safeParse(await req.json().catch(() => ({})));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const d = parsed.data;

  const card = await prisma.giftCard.findFirst({
    where: { id: d.giftCardId, businessId: owned.businessId },
    select: { id: true, validDays: true, maxUses: true },
  });
  if (!card) return NextResponse.json({ error: "CARD_NOT_FOUND" }, { status: 404 });

  const now = new Date();
  const purchase = await prisma.giftCardPurchase.create({
    data: {
      giftCardId: card.id,
      businessId: owned.businessId,
      buyerName: d.recipientName,
      buyerEmail: d.recipientEmail,
      buyerPhone: d.recipientPhone || null,
      message: d.message || null,
      code: await newUniqueGiftCode(),
      usesLeft: card.maxUses,
      ...(d.paid
        ? { status: "ACTIVE" as const, activatedAt: now, expiresAt: addDays(now, card.validDays) }
        : {}),
    },
  });

  let emailSent = true;
  try {
    await emailGiftCard(purchase.id, owned.businessId, d.locale);
  } catch (err) {
    emailSent = false;
    console.error("[gift-card issue email]", err);
  }

  return NextResponse.json({ id: purchase.id, code: purchase.code, emailSent }, { status: 201 });
}
