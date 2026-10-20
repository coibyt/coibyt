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

/** Visits from before the card existed that the salon may still scan once,
 * so a regular who only just got a card isn't starting from zero. */
export const LOYALTY_BACKDATE_VISITS = 3;

/** Bookings that count as a visit: still on the calendar (not deleted), not
 * cancelled or marked no-show, and whose appointment time has arrived. Owners
 * rarely mark visits "completed" by hand, so CONFIRMED counts too. */
function visitWhere(card: { businessId: string; customerEmail: string }, now: Date) {
  return {
    businessId: card.businessId,
    status: { in: ["CONFIRMED" as const, "COMPLETED" as const] },
    startsAt: { lte: now },
    customer: { email: card.customerEmail },
  };
}

/** How many scans this card may have had in total: every visit since the card
 * was activated, plus up to LOYALTY_BACKDATE_VISITS visits from before. */
export async function eligibleVisits(card: { businessId: string; customerEmail: string; activatedAt: Date }) {
  const now = new Date();
  const base = visitWhere(card, now);
  const [since, before] = await Promise.all([
    prisma.booking.count({ where: { ...base, startsAt: { lte: now, gte: card.activatedAt } } }),
    prisma.booking.count({ where: { ...base, startsAt: { lt: card.activatedAt } } }),
  ]);
  return since + Math.min(LOYALTY_BACKDATE_VISITS, before);
}

// cardId rides along whenever the card itself was found — even a refused
// scan still lets the salon open that customer's summary.
export type ScanOutcome =
  | { ok: true; cardId: string; points: number; pointsRequired: number; rewardReady: boolean }
  | { ok: false; reason: "NOT_FOUND" }
  | { ok: false; cardId: string; reason: "NO_PROGRAM" | "NO_NEW_VISIT" | "REWARD_PENDING" };

/** A scan earns a point only when the customer has a visit that hasn't been
 * scanned yet (see eligibleVisits), so scans can never outrun real visits. */
export async function scanLoyaltyCard(businessId: string, token: string): Promise<ScanOutcome> {
  const card = await prisma.loyaltyCard.findFirst({
    where: { token: token.trim().toUpperCase(), businessId },
  });
  if (!card) return { ok: false, reason: "NOT_FOUND" };

  const program = await prisma.loyaltyProgram.findUnique({ where: { businessId } });
  if (!program) return { ok: false, cardId: card.id, reason: "NO_PROGRAM" };

  if (card.rewardReady) return { ok: false, cardId: card.id, reason: "REWARD_PENDING" };

  const visits = await eligibleVisits(card);
  if (card.totalScans >= visits) return { ok: false, cardId: card.id, reason: "NO_NEW_VISIT" };

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
    cardId: card.id,
    points: updated.points,
    pointsRequired: program.pointsRequired,
    rewardReady: updated.rewardReady,
  };
}

/** The salon gives the discount: the card goes back to zero for the next cycle. */
export async function applyLoyaltyReward(businessId: string, cardId: string) {
  return prisma.$transaction(async (tx) => {
    const result = await tx.loyaltyCard.updateMany({
      where: { id: cardId, businessId, rewardReady: true },
      data: { points: 0, rewardReady: false, rewardsEarned: { increment: 1 } },
    });
    if (result.count === 0) return false;
    await tx.loyaltyReward.create({ data: { cardId } });
    return true;
  });
}
