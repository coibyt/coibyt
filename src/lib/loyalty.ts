import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { randomGiftCode } from "@/lib/gift-cards";

export async function newLoyaltyToken() {
  for (let i = 0; i < 5; i++) {
    const token = randomGiftCode(12);
    const taken = await prisma.loyaltyCard.findUnique({ where: { token }, select: { id: true } });
    if (!taken) return token;
  }
  throw new Error("COULD_NOT_GENERATE_TOKEN");
}

/** The QR opens the salon's scan page with the card code already filled in, so
 * a plain phone camera is enough — no app needed. */
export function loyaltyScanUrl(token: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  return `${site}/business/dashboard/loyalty?code=${encodeURIComponent(token)}`;
}

export function loyaltyQrPng(token: string) {
  return QRCode.toBuffer(loyaltyScanUrl(token), { type: "png", width: 240, margin: 1 });
}

/** Completed visits by this customer (matched on email) since the card was
 * activated — the ceiling on how many scans can count. */
export async function completedVisits(card: { businessId: string; customerEmail: string; activatedAt: Date }) {
  return prisma.booking.count({
    where: {
      businessId: card.businessId,
      status: "COMPLETED",
      startsAt: { gte: card.activatedAt },
      customer: { email: card.customerEmail },
    },
  });
}

export type ScanOutcome =
  | { ok: true; points: number; pointsRequired: number; rewardReady: boolean }
  | { ok: false; reason: "NOT_FOUND" | "NO_PROGRAM" | "NO_NEW_VISIT" | "REWARD_PENDING" };

/** A scan earns a point only when the customer has a completed visit that hasn't
 * been scanned yet, so scans can never outrun the services actually done. */
export async function scanLoyaltyCard(businessId: string, token: string): Promise<ScanOutcome> {
  const card = await prisma.loyaltyCard.findFirst({
    where: { token: token.trim().toUpperCase(), businessId },
  });
  if (!card) return { ok: false, reason: "NOT_FOUND" };

  const program = await prisma.loyaltyProgram.findUnique({ where: { businessId } });
  if (!program) return { ok: false, reason: "NO_PROGRAM" };

  if (card.rewardReady) return { ok: false, reason: "REWARD_PENDING" };

  const visits = await completedVisits(card);
  if (card.totalScans >= visits) return { ok: false, reason: "NO_NEW_VISIT" };

  const points = card.points + 1;
  const rewardReady = points >= program.pointsRequired;
  const updated = await prisma.$transaction(async (tx) => {
    await tx.loyaltyScan.create({ data: { cardId: card.id } });
    return tx.loyaltyCard.update({
      where: { id: card.id },
      data: {
        points: Math.min(points, program.pointsRequired),
        totalScans: { increment: 1 },
        rewardReady,
      },
    });
  });

  return {
    ok: true,
    points: updated.points,
    pointsRequired: program.pointsRequired,
    rewardReady: updated.rewardReady,
  };
}

/** The salon gives the discount: the card goes back to zero for the next cycle. */
export async function applyLoyaltyReward(businessId: string, cardId: string) {
  const result = await prisma.loyaltyCard.updateMany({
    where: { id: cardId, businessId, rewardReady: true },
    data: { points: 0, rewardReady: false, rewardsEarned: { increment: 1 } },
  });
  return result.count > 0;
}
