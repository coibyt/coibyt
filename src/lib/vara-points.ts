import { randomBytes, createHmac } from "crypto";
import { prisma } from "@/lib/prisma";
import type { VaraPointReason, Prisma } from "@prisma/client";

const DAILY_CHECKIN_POINTS = 5;
const SIGNUP_BONUS_POINTS = 500;
const REFERRAL_CLICK_POINTS = 1;
const REFERRAL_SIGNUP_BONUS_POINTS = 1000;

type TxClient = Prisma.TransactionClient;

/** Credits (or debits, with a negative amount) a user's vara point balance
 * and logs it to the ledger in the same write — callers never touch
 * User.varaPoints directly, so the ledger can never drift from the balance.
 * Pass `tx` to fold this into a caller's own transaction. */
export async function awardPoints(
  userId: string,
  amount: number,
  reason: VaraPointReason,
  tx?: TxClient
) {
  const client = tx ?? prisma;
  await client.user.update({
    where: { id: userId },
    data: { varaPoints: { increment: amount } },
  });
  await client.varaPointTransaction.create({
    data: { userId, amount, reason },
  });
}

/** "YYYY-MM-DD" in UTC — the check-in day boundary is deliberately
 * timezone-agnostic (unlike business opening hours) since points belong to
 * the owner account, not to any one branch's timezone. */
function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

/** Returns the new balance on success, or null if this user already checked
 * in today (UTC). */
export async function claimDailyCheckin(userId: string): Promise<number | null> {
  const today = todayUtc();
  const user = await prisma.user.findUniqueOrThrow({ where: { id: userId } });
  if (user.varaLastCheckinDate === today) return null;

  const [updated] = await prisma.$transaction([
    prisma.user.update({
      where: { id: userId },
      data: { varaLastCheckinDate: today, varaPoints: { increment: DAILY_CHECKIN_POINTS } },
    }),
    prisma.varaPointTransaction.create({
      data: { userId, amount: DAILY_CHECKIN_POINTS, reason: "DAILY_CHECKIN" },
    }),
  ]);
  return updated.varaPoints;
}

/** Generates a code guaranteed not to collide with either referral system
 * sharing the same `?aff=` URL/cookie space (the admin-run PlatformAffiliate
 * program and owners' own codes). */
export async function generateUniqueReferralCode() {
  for (let i = 0; i < 5; i++) {
    const code = randomBytes(4).toString("hex").toUpperCase();
    const [existingAffiliate, existingUser] = await Promise.all([
      prisma.platformAffiliate.findUnique({ where: { code } }),
      prisma.user.findUnique({ where: { referralCode: code } }),
    ]);
    if (!existingAffiliate && !existingUser) return code;
  }
  throw new Error("COULD_NOT_GENERATE_CODE");
}

/** Awards the one-time 500-point signup bonus and mints a referral code the
 * first time someone becomes a salon owner — never again for a second
 * branch, since points and the referral link are shared per owner. */
export async function awardSignupBonusIfFirstBusiness(ownerId: string) {
  const businessCount = await prisma.business.count({ where: { ownerId } });
  if (businessCount !== 1) return; // not their first branch

  const user = await prisma.user.findUniqueOrThrow({ where: { id: ownerId } });
  const referralCode = user.referralCode ?? (await generateUniqueReferralCode());

  await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: ownerId },
      data: { referralCode, varaPoints: { increment: SIGNUP_BONUS_POINTS } },
    });
    await tx.varaPointTransaction.create({
      data: { userId: ownerId, amount: SIGNUP_BONUS_POINTS, reason: "SIGNUP_BONUS" },
    });
  });
}

/** A referred salon only earns its referrer the 1000-point bonus once its
 * profile clears a minimum bar (address, opening hours, an active service)
 * — not the instant it signs up, since a brand-new application has none of
 * that yet. Call this after any write that could complete that bar (service
 * creation, hours saved, profile saved); it's a no-op once already awarded,
 * or if this business was never referred by another owner's link. */
export async function checkAndAwardReferralBonus(businessId: string) {
  const business = await prisma.business.findUnique({ where: { id: businessId } });
  if (!business || !business.referredByOwnerId || business.referralBonusAwarded) return;

  const [hoursCount, activeServiceCount] = await Promise.all([
    prisma.businessHours.count({ where: { businessId } }),
    prisma.service.count({ where: { businessId, active: true } }),
  ]);
  const profileComplete = !!business.addressLine && hoursCount > 0 && activeServiceCount > 0;
  if (!profileComplete) return;

  await prisma.$transaction(async (tx) => {
    await tx.business.update({ where: { id: businessId }, data: { referralBonusAwarded: true } });
    await awardPoints(business.referredByOwnerId!, REFERRAL_SIGNUP_BONUS_POINTS, "REFERRAL_SIGNUP_BONUS", tx);
  });
}

/** Best-effort extraction of the visitor's IP from a Hostinger-proxied
 * request — `x-forwarded-for` can carry a comma-separated chain when
 * multiple proxies are involved, so the first entry is the original client. */
export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip");
}

/** One-way HMAC of an IP address — never store the raw IP, only enough to
 * detect "has this visitor already been counted for this owner's link". */
export function hashIp(ip: string) {
  const secret = process.env.APP_SECRET ?? "varaaai-dev-secret";
  return createHmac("sha256", secret).update(ip).digest("hex");
}

/** Records a click on an owner's referral link and pays out the 1-point
 * reward — but only the first time this visitor (by hashed IP) has ever
 * clicked THIS owner's link; a repeat visit is silently a no-op. Returns
 * whether a new point was actually awarded. */
export async function registerReferralClick(ownerId: string, ip: string): Promise<boolean> {
  const ipHash = hashIp(ip);
  try {
    await prisma.$transaction(async (tx) => {
      await tx.referralClick.create({ data: { ownerId, ipHash } });
      await awardPoints(ownerId, REFERRAL_CLICK_POINTS, "REFERRAL_CLICK", tx);
    });
    return true;
  } catch (err) {
    // Unique constraint violation = this IP already clicked this link before.
    if (err instanceof Error && "code" in err && (err as { code?: string }).code === "P2002") {
      return false;
    }
    throw err;
  }
}
