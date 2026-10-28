import { prisma } from "@/lib/prisma";
import { randomGiftCode } from "@/lib/gift-cards";
import { REFERRAL_TICKETS } from "@/lib/loyalty-referral-constants";
import { notifyTicketsAdded } from "@/lib/loyalty-notify";

export { REFERRAL_TICKETS, referralCookieName, REFERRAL_COOKIE_DAYS } from "@/lib/loyalty-referral-constants";

export function inviteUrl(code: string, localePrefix = "") {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  return `${site}${localePrefix}/invite/${encodeURIComponent(code)}`;
}

/** The card's invite code, made the first time it's needed. */
export async function ensureReferralCode(card: { id: string; referralCode: string | null }) {
  if (card.referralCode) return card.referralCode;
  for (let i = 0; i < 5; i++) {
    const code = randomGiftCode(8);
    const taken = await prisma.loyaltyCard.findUnique({ where: { referralCode: code }, select: { id: true } });
    if (taken) continue;
    const res = await prisma.loyaltyCard.updateMany({ where: { id: card.id, referralCode: null }, data: { referralCode: code } });
    if (res.count === 1) return code;
    // Someone else set it in the meantime — use theirs.
    const now = await prisma.loyaltyCard.findUnique({ where: { id: card.id }, select: { referralCode: true } });
    if (now?.referralCode) return now.referralCode;
  }
  throw new Error("COULD_NOT_GENERATE_REFERRAL_CODE");
}

/** Called after a customer books: if they arrived through a friend's invite
 * link and this is their first booking at the salon, remember it so the
 * friend gets bonus tickets once the visit has happened. Never throws —
 * a referral must not get in the way of a booking. */
export async function recordReferral(input: {
  businessId: string;
  code: string | undefined;
  friendUserId: string;
  friendEmail: string;
  friendName: string;
  bookingId: string;
}) {
  if (!input.code) return;
  try {
    const card = await prisma.loyaltyCard.findFirst({
      where: { referralCode: input.code.trim().toUpperCase(), businessId: input.businessId },
      select: { id: true, customerEmail: true },
    });
    // No inviting yourself.
    if (!card || card.customerEmail === input.friendEmail.trim().toLowerCase()) return;

    const existing = await prisma.loyaltyReferral.findUnique({
      where: { businessId_friendUserId: { businessId: input.businessId, friendUserId: input.friendUserId } },
    });
    if (existing) {
      // Their first booking was cancelled or missed — this one counts instead.
      if (existing.status === "PENDING" && existing.cardId === card.id) {
        const prev = existing.bookingId
          ? await prisma.booking.findUnique({ where: { id: existing.bookingId }, select: { status: true } })
          : null;
        if (!prev || prev.status === "CANCELLED" || prev.status === "NO_SHOW") {
          await prisma.loyaltyReferral.update({ where: { id: existing.id }, data: { bookingId: input.bookingId } });
        }
      }
      return;
    }

    // Only new customers of the salon count as a referral.
    const earlier = await prisma.booking.count({
      where: { businessId: input.businessId, customerId: input.friendUserId, id: { not: input.bookingId } },
    });
    if (earlier > 0) return;

    await prisma.loyaltyReferral.create({
      data: {
        cardId: card.id,
        businessId: input.businessId,
        friendUserId: input.friendUserId,
        friendName: input.friendName.slice(0, 120),
        bookingId: input.bookingId,
      },
    });
  } catch (err) {
    console.error("[recordReferral]", err);
  }
}

/** Gives the bonus tickets for every invited friend whose first visit has
 * now happened (booking confirmed or completed, and its time has come).
 * Waits while the card's reward is ready but not yet given, so the bonus
 * isn't lost to the cap — it lands on the next cycle instead. */
export async function settleReferrals(where: { cardId: string } | { businessId: string } | "all") {
  const pending = await prisma.loyaltyReferral.findMany({
    where: { ...(where === "all" ? {} : where), status: "PENDING", bookingId: { not: null } },
    select: { id: true, cardId: true, businessId: true, bookingId: true, friendName: true },
  });
  if (pending.length === 0) return 0;

  const now = new Date();
  let settled = 0;
  for (const r of pending) {
    const booking = await prisma.booking.findUnique({ where: { id: r.bookingId! }, select: { status: true, startsAt: true } });
    if (!booking || !["CONFIRMED", "COMPLETED"].includes(booking.status) || booking.startsAt > now) continue;
    const program = await prisma.loyaltyProgram.findUnique({ where: { businessId: r.businessId }, select: { pointsRequired: true } });
    if (!program) continue;

    const done = await prisma.$transaction(async (tx) => {
      const card = await tx.loyaltyCard.findUnique({ where: { id: r.cardId }, select: { points: true, rewardReady: true } });
      if (!card || card.rewardReady) return false;
      const claimed = await tx.loyaltyReferral.updateMany({
        where: { id: r.id, status: "PENDING" },
        data: { status: "REWARDED", ticketsAwarded: REFERRAL_TICKETS, rewardedAt: now },
      });
      if (claimed.count === 0) return false;
      const points = Math.min(card.points + REFERRAL_TICKETS, program.pointsRequired);
      await tx.loyaltyCard.update({
        where: { id: r.cardId },
        data: { points, rewardReady: points >= program.pointsRequired },
      });
      return true;
    });
    if (done) {
      settled++;
      await notifyTicketsAdded({ cardId: r.cardId, kind: "referral", ticketsAdded: REFERRAL_TICKETS, friendName: r.friendName });
    }
  }
  return settled;
}
