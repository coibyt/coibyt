import { randomBytes } from "crypto";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

// Without look-alike characters (0/O, 1/I/L) so a code read off a phone
// screen is hard to mistype.
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function randomGiftCode(length = 10) {
  const bytes = randomBytes(length);
  let out = "";
  for (let i = 0; i < length; i++) out += CODE_ALPHABET[bytes[i] % CODE_ALPHABET.length];
  return out;
}

export async function newUniqueGiftCode() {
  for (let i = 0; i < 5; i++) {
    const code = randomGiftCode();
    const taken = await prisma.giftCardPurchase.findUnique({ where: { code }, select: { id: true } });
    if (!taken) return code;
  }
  throw new Error("COULD_NOT_GENERATE_CODE");
}

export type GiftCardState = "PENDING" | "ACTIVE" | "EXPIRED" | "USED_UP" | "CANCELLED";

export function giftCardState(
  p: { status: string; expiresAt: Date | null; usesLeft: number },
  now = new Date()
): GiftCardState {
  if (p.status === "PENDING_PAYMENT") return "PENDING";
  if (p.status === "CANCELLED") return "CANCELLED";
  if (p.expiresAt && p.expiresAt <= now) return "EXPIRED";
  if (p.usesLeft <= 0) return "USED_UP";
  return "ACTIVE";
}

export function giftCardQrPng(code: string) {
  return QRCode.toBuffer(code, { type: "png", width: 240, margin: 1 });
}

/** Records one visit against a card. Returns the reason on failure rather than
 * throwing, so the dashboard can show it plainly. The conditional update means
 * two simultaneous redemptions can't both use the last remaining use. */
export async function redeemGiftCard(params: {
  businessId: string;
  code: string;
  bookingId?: string | null;
}) {
  const purchase = await prisma.giftCardPurchase.findFirst({
    where: { code: params.code.trim().toUpperCase(), businessId: params.businessId },
    include: { giftCard: { include: { service: { select: { name: true } } } } },
  });
  if (!purchase) return { ok: false as const, reason: "NOT_FOUND" as const };

  const state = giftCardState(purchase);
  if (state !== "ACTIVE") return { ok: false as const, reason: state, purchase };

  const consumed = await prisma.$transaction(async (tx) => {
    const updated = await tx.giftCardPurchase.updateMany({
      where: { id: purchase.id, usesLeft: { gt: 0 } },
      data: { usesLeft: { decrement: 1 } },
    });
    if (updated.count === 0) return false;
    await tx.giftCardRedemption.create({
      data: { purchaseId: purchase.id, bookingId: params.bookingId ?? null },
    });
    return true;
  });
  if (!consumed) return { ok: false as const, reason: "USED_UP" as const, purchase };

  return { ok: true as const, purchase: { ...purchase, usesLeft: purchase.usesLeft - 1 } };
}
