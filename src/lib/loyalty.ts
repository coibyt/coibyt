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
function visitWhere(businessIds: string[], emails: string[], now: Date) {
  return {
    businessId: { in: businessIds },
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

/** Every branch of the owner who runs `businessId`, itself included. One
 * owner's branches share their loyalty cards: a card made at one branch can be
 * scanned at any of them, and a visit at any of them earns its ticket. */
export async function ownerBranchIds(businessId: string) {
  const own = await prisma.business.findUnique({ where: { id: businessId }, select: { ownerId: true } });
  if (!own) return [businessId];
  const all = await prisma.business.findMany({ where: { ownerId: own.ownerId }, select: { id: true } });
  return all.map((b) => b.id);
}

/** The card behind a QR, for staff of any branch of the owner it belongs to. */
async function findStaffCard(staffBusinessId: string, token: string) {
  return prisma.loyaltyCard.findFirst({
    where: { token: token.trim().toUpperCase(), businessId: { in: await ownerBranchIds(staffBusinessId) } },
    select: { id: true, businessId: true, customerEmail: true },
  });
}

/** The card this customer already holds with the owner of `businessId`: the
 * one at this branch if there is one, else one at another of the owner's
 * branches. An email linked to a card counts as that card. */
export async function findOwnerCard(businessId: string, rawEmail: string) {
  const email = rawEmail.trim().toLowerCase();
  const branches = await ownerBranchIds(businessId);
  const [cards, linked] = await Promise.all([
    prisma.loyaltyCard.findMany({ where: { businessId: { in: branches }, customerEmail: email } }),
    prisma.loyaltyCardEmail.findMany({ where: { businessId: { in: branches }, email }, select: { card: true } }),
  ]);
  const all = [...cards, ...linked.map((l) => l.card)];
  return all.find((c) => c.businessId === businessId) ?? all[0] ?? null;
}

/** The branches whose visits count on this card: every branch of its owner.
 * The exception is a customer who holds a separate card at another branch:
 * then each card counts its own branch only, so no visit earns two tickets. */
export async function cardVisitBranchIds(card: { id: string; businessId: string }, emails: string[]) {
  const others = (await ownerBranchIds(card.businessId)).filter((id) => id !== card.businessId);
  if (others.length === 0) return [card.businessId];
  const [otherCard, otherLinked] = await Promise.all([
    prisma.loyaltyCard.findFirst({ where: { businessId: { in: others }, customerEmail: { in: emails } }, select: { id: true } }),
    prisma.loyaltyCardEmail.findFirst({ where: { businessId: { in: others }, email: { in: emails } }, select: { id: true } }),
  ]);
  return otherCard || otherLinked ? [card.businessId] : [card.businessId, ...others];
}

/** How many scans this card may have had in total: every visit since the card
 * was activated, plus up to LOYALTY_BACKDATE_VISITS visits from before. Visits
 * booked with any of the card's emails, at any of the owner's branches, count. */
export async function eligibleVisits(card: { id: string; businessId: string; customerEmail: string; activatedAt: Date }) {
  const now = new Date();
  const emails = await cardEmails(card);
  const base = visitWhere(await cardVisitBranchIds(card, emails), emails, now);
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
 * scanned yet (see eligibleVisits), so scans can never outrun real visits.
 * `businessId` is the branch the staff are working at; the card may belong to
 * any branch of the same owner, and it follows its own branch's programme. */
export async function scanLoyaltyCard(businessId: string, token: string): Promise<ScanOutcome> {
  const found = await findStaffCard(businessId, token);
  if (!found) return { ok: false, reason: "NOT_FOUND" };
  // Friends' visits may have earned bonus tickets since the last look.
  await settleReferrals({ cardId: found.id });
  const card = (await prisma.loyaltyCard.findUnique({ where: { id: found.id } }))!;

  const program = await prisma.loyaltyProgram.findUnique({ where: { businessId: card.businessId } });
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
 * tickets on this card. Only an email with bookings at one of the owner's
 * branches, and not one that already belongs to another card there (the visit
 * would count twice). */
export async function linkCardEmail(businessId: string, token: string, rawEmail: string): Promise<LinkEmailOutcome> {
  const email = rawEmail.trim().toLowerCase();
  const card = await findStaffCard(businessId, token);
  if (!card) return { ok: false, reason: "NOT_FOUND" };
  if (email === card.customerEmail.toLowerCase()) return { ok: false, reason: "SAME_EMAIL" };

  const branches = await ownerBranchIds(card.businessId);
  const [hasBooking, otherCard, linked] = await Promise.all([
    prisma.booking.findFirst({ where: { businessId: { in: branches }, customer: { email } }, select: { id: true } }),
    prisma.loyaltyCard.findFirst({
      where: { businessId: { in: branches }, customerEmail: email, id: { not: card.id } },
      select: { id: true },
    }),
    prisma.loyaltyCardEmail.findFirst({ where: { businessId: { in: branches }, email }, select: { cardId: true } }),
  ]);
  if (!hasBooking) return { ok: false, reason: "NO_BOOKINGS" };
  if (otherCard) return { ok: false, reason: "OTHER_CARD" };
  if (linked) return linked.cardId === card.id ? { ok: true } : { ok: false, reason: "OTHER_CARD" };

  await prisma.loyaltyCardEmail.create({ data: { cardId: card.id, businessId: card.businessId, email } });
  return { ok: true };
}

/** Emails of this salon's customers that start with or contain `query`, for
 * the "booked with another email?" box on the member card (staff only). */
export async function suggestCardEmails(businessId: string, token: string, query: string) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const card = await findStaffCard(businessId, token);
  if (!card) return [];
  const branches = await ownerBranchIds(card.businessId);
  // Left out: this card's own emails and emails that belong to another card
  // at any of the owner's branches.
  const [cards, linked] = await Promise.all([
    prisma.loyaltyCard.findMany({
      where: { businessId: { in: branches }, customerEmail: { contains: q } },
      select: { customerEmail: true },
    }),
    prisma.loyaltyCardEmail.findMany({ where: { businessId: { in: branches }, email: { contains: q } }, select: { email: true } }),
  ]);
  const skip = new Set(
    [card.customerEmail, ...cards.map((c) => c.customerEmail), ...linked.map((l) => l.email)].map((e) => e.toLowerCase())
  );
  const users = await prisma.user.findMany({
    where: {
      email: { contains: q, not: { endsWith: ".varaaai.com" } }, // not made-up guest/walk-in addresses
      bookings: { some: { businessId: { in: branches } } },
    },
    take: 12,
    select: {
      email: true,
      name: true,
      bookings: { where: { businessId: { in: branches } }, orderBy: { startsAt: "desc" }, take: 1, select: { startsAt: true } },
    },
  });
  return users
    .filter((u) => !skip.has(u.email.toLowerCase()))
    .sort((a, b) => Number(!a.email.toLowerCase().startsWith(q)) - Number(!b.email.toLowerCase().startsWith(q)))
    .slice(0, 6)
    .map((u) => ({ email: u.email, name: u.name, lastBooking: u.bookings[0]?.startsAt.toISOString() ?? null }));
}

/** This salon's customers whose name or email contains `query`, for the
 * "Activate a card" form, each marked when they already have a card here. */
export async function suggestNewCardCustomers(businessId: string, query: string) {
  const q = query.trim();
  if (q.length < 2) return [];
  const users = await prisma.user.findMany({
    where: {
      bookings: { some: { businessId } },
      email: { not: { endsWith: ".varaaai.com" } }, // not made-up guest/walk-in addresses
      OR: [{ name: { contains: q } }, { email: { contains: q.toLowerCase() } }],
    },
    take: 40,
    select: {
      email: true,
      name: true,
      phone: true,
      bookings: { where: { businessId }, orderBy: { startsAt: "desc" }, take: 1, select: { startsAt: true } },
    },
  });
  if (users.length === 0) return [];
  const emails = users.map((u) => u.email.toLowerCase());
  // A card at any of the owner's branches: it works at this branch too.
  const branches = await ownerBranchIds(businessId);
  const [cards, linked] = await Promise.all([
    prisma.loyaltyCard.findMany({
      where: { businessId: { in: branches }, customerEmail: { in: emails } },
      select: { customerEmail: true },
    }),
    prisma.loyaltyCardEmail.findMany({ where: { businessId: { in: branches }, email: { in: emails } }, select: { email: true } }),
  ]);
  const carded = new Set([...cards.map((c) => c.customerEmail), ...linked.map((l) => l.email)].map((e) => e.toLowerCase()));
  const lower = q.toLowerCase();
  // Customers without a card first, then names or emails that start with the text.
  return users
    .map((u) => ({
      email: u.email,
      name: u.name,
      phone: u.phone,
      lastBooking: u.bookings[0]?.startsAt.toISOString() ?? null,
      hasCard: carded.has(u.email.toLowerCase()),
      starts: u.email.toLowerCase().startsWith(lower) || u.name.toLowerCase().split(/\s+/).some((w) => w.startsWith(lower)),
    }))
    .sort((a, b) => Number(a.hasCard) - Number(b.hasCard) || Number(b.starts) - Number(a.starts))
    .slice(0, 8)
    .map(({ starts: _starts, ...s }) => s);
}

/** The salon gives the discount: the card goes back to zero for the next cycle.
 * Any branch of the card's owner may give it. */
export async function applyLoyaltyReward(businessId: string, cardId: string) {
  const branches = await ownerBranchIds(businessId);
  return prisma.$transaction(async (tx) => {
    const result = await tx.loyaltyCard.updateMany({
      where: { id: cardId, businessId: { in: branches }, rewardReady: true },
      data: { points: 0, rewardReady: false, rewardsEarned: { increment: 1 } },
    });
    if (result.count === 0) return false;
    await tx.loyaltyReward.create({ data: { cardId } });
    return true;
  });
}
