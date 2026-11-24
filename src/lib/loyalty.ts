import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { randomGiftCode } from "@/lib/gift-cards";
import { settleReferrals } from "@/lib/loyalty-referral";
import { notifyTicketsAdded } from "@/lib/loyalty-notify";

export async function newLoyaltyToken() {
  for (let i = 0; i < 5; i++) {
    const token = randomGiftCode(12);
    const taken = await prisma.loyaltyCard.findUnique({ where: { token }, select: { id: true } });
    if (!taken) return token;
  }
  throw new Error("COULD_NOT_GENERATE_TOKEN");
}

/** The QR opens the card's own page (/loyalty/<token>): anyone who scans it
 * sees the member card — name, tickets, invite link — and the salon's staff,
 * signed in, also get an "Add 1 ticket" button there. A plain phone camera
 * is enough — no app needed. Older QRs pointed at the dashboard with
 * ?code=; the middleware forwards those here. */
export function loyaltyScanUrl(token: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  return `${site}/loyalty/${encodeURIComponent(token)}`;
}

/** The made-up card shown in marketing previews and test emails. */
export const SAMPLE_LOYALTY_TOKEN = "VARA2026DEMO";

export function loyaltyQrPng(token: string) {
  return QRCode.toBuffer(loyaltyScanUrl(token), { type: "png", width: 240, margin: 1 });
}

/** Visits from before the card existed that the salon may still scan once,
 * so a regular who only just got a card isn't starting from zero. */
export const LOYALTY_BACKDATE_VISITS = 3;

/** Bookings that count as a visit: still on the calendar (not deleted), not
 * cancelled or marked no-show, and whose appointment time has arrived. Owners
 * rarely mark visits "completed" by hand, so CONFIRMED counts too. */
function visitWhere(businessId: string, emails: string[], now: Date) {
  return {
    businessId,
    status: { in: ["CONFIRMED" as const, "COMPLETED" as const] },
    startsAt: { lte: now },
    customer: { email: { in: emails } },
  };
}

/** The card's own email plus any other emails the salon linked to it. */
export async function cardEmails(card: { id: string; customerEmail: string }) {
  const extra = await prisma.loyaltyCardEmail.findMany({ where: { cardId: card.id }, select: { email: true } });
  return [card.customerEmail, ...extra.map((e) => e.email)];
}

/** How many scans this card may have had in total: every visit since the card
 * was activated, plus up to LOYALTY_BACKDATE_VISITS visits from before. Visits
 * booked with any of the card's emails count. */
export async function eligibleVisits(card: { id: string; businessId: string; customerEmail: string; activatedAt: Date }) {
  const now = new Date();
  const base = visitWhere(card.businessId, await cardEmails(card), now);
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
  const found = await prisma.loyaltyCard.findFirst({
    where: { token: token.trim().toUpperCase(), businessId },
    select: { id: true },
  });
  if (!found) return { ok: false, reason: "NOT_FOUND" };
  // Friends' visits may have earned bonus tickets since the last look.
  await settleReferrals({ cardId: found.id });
  const card = (await prisma.loyaltyCard.findUnique({ where: { id: found.id } }))!;

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

  // Not awaited: the staff see the result straight away, the email follows.
  void notifyTicketsAdded({ cardId: card.id, kind: "scan", ticketsAdded: 1 });

  return {
    ok: true,
    cardId: card.id,
    points: updated.points,
    pointsRequired: program.pointsRequired,
    rewardReady: updated.rewardReady,
  };
}

export type LinkEmailOutcome =
  | { ok: true }
  | { ok: false; reason: "NOT_FOUND" | "SAME_EMAIL" | "NO_BOOKINGS" | "OTHER_CARD" };

/** Staff add another email the cardholder booked with, so those bookings earn
 * tickets on this card. Only an email with bookings at this salon, and not one
 * that already belongs to another card here (the visit would count twice). */
export async function linkCardEmail(businessId: string, token: string, rawEmail: string): Promise<LinkEmailOutcome> {
  const email = rawEmail.trim().toLowerCase();
  const card = await prisma.loyaltyCard.findFirst({
    where: { token: token.trim().toUpperCase(), businessId },
    select: { id: true, customerEmail: true },
  });
  if (!card) return { ok: false, reason: "NOT_FOUND" };
  if (email === card.customerEmail.toLowerCase()) return { ok: false, reason: "SAME_EMAIL" };

  const [hasBooking, ownCard, linked] = await Promise.all([
    prisma.booking.findFirst({ where: { businessId, customer: { email } }, select: { id: true } }),
    prisma.loyaltyCard.findUnique({ where: { businessId_customerEmail: { businessId, customerEmail: email } }, select: { id: true } }),
    prisma.loyaltyCardEmail.findUnique({ where: { businessId_email: { businessId, email } }, select: { cardId: true } }),
  ]);
  if (!hasBooking) return { ok: false, reason: "NO_BOOKINGS" };
  if (ownCard && ownCard.id !== card.id) return { ok: false, reason: "OTHER_CARD" };
  if (linked) return linked.cardId === card.id ? { ok: true } : { ok: false, reason: "OTHER_CARD" };

  await prisma.loyaltyCardEmail.create({ data: { cardId: card.id, businessId, email } });
  return { ok: true };
}

/** Emails of this salon's customers that start with or contain `query`, for
 * the "booked with another email?" box on the member card (staff only). */
export async function suggestCardEmails(businessId: string, token: string, query: string) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const card = await prisma.loyaltyCard.findFirst({
    where: { token: token.trim().toUpperCase(), businessId },
    select: { id: true, customerEmail: true },
  });
  if (!card) return [];
  // Left out: this card's own emails and emails that belong to another card here.
  const [cards, linked] = await Promise.all([
    prisma.loyaltyCard.findMany({ where: { businessId, customerEmail: { contains: q } }, select: { customerEmail: true } }),
    prisma.loyaltyCardEmail.findMany({ where: { businessId, email: { contains: q } }, select: { email: true } }),
  ]);
  const skip = new Set(
    [card.customerEmail, ...cards.map((c) => c.customerEmail), ...linked.map((l) => l.email)].map((e) => e.toLowerCase())
  );
  const users = await prisma.user.findMany({
    where: {
      email: { contains: q, not: { endsWith: "@guest.varaaai.com" } },
      bookings: { some: { businessId } },
    },
    take: 12,
    select: {
      email: true,
      name: true,
      bookings: { where: { businessId }, orderBy: { startsAt: "desc" }, take: 1, select: { startsAt: true } },
    },
  });
  return users
    .filter((u) => !skip.has(u.email.toLowerCase()))
    .sort((a, b) => Number(!a.email.toLowerCase().startsWith(q)) - Number(!b.email.toLowerCase().startsWith(q)))
    .slice(0, 6)
    .map((u) => ({ email: u.email, name: u.name, lastBooking: u.bookings[0]?.startsAt.toISOString() ?? null }));
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
