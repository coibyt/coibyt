import { randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import type { LiteSalon } from "@prisma/client";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { randomGiftCode } from "@/lib/gift-cards";
import { SITE_URL } from "@/lib/email/ui";

/** Loyalty Lite: a free stamp card a salon tries with only its name and an
 * email (/loyalty-lite). The welcome email's link (and the browser cookie it
 * sets) is the key; the owner may also set a password and give staff their
 * own logins (LiteStaff). Limited to LITE_MAX_CARDS customers;
 * applying as a full VaraaAi salon with the same email moves the program
 * and cards over (importLiteSalon). */

export const LITE_COOKIE = "varaaai_lite";
export const LITE_MAX_CARDS = 10000;
/** A trial (no email yet) can give this many real cards before saving itself. */
export const LITE_TRIAL_FREE_CARDS = 3;
/** Trials that never save an email are removed after this many days. */
export const LITE_TRIAL_DAYS = 14;
/** One stamp per visit: a card can't be stamped again within this time. */
export const LITE_STAMP_GAP_HOURS = 12;
const HOUR = 60 * 60 * 1000;

export const LITE_LOCALES = ["vi", "en", "fi"] as const;
export type LiteLocale = (typeof LITE_LOCALES)[number];
export const liteLocale = (l: string): LiteLocale => ((LITE_LOCALES as readonly string[]).includes(l) ? (l as LiteLocale) : "en");

const prefix = (locale: string) => (locale === "vi" ? "" : `/${locale}`);
export const liteStudioUrl = (locale: string) => `${SITE_URL}${prefix(locale)}/loyalty-lite/studio`;
export const liteOpenUrl = (accessToken: string) => `${SITE_URL}/api/loyalty-lite/open?t=${accessToken}`;
export const liteCardUrl = (token: string, locale: string) => `${SITE_URL}${prefix(locale)}/loyalty-lite/c/${token}`;
export const liteQrPng = (token: string, locale: string) => QRCode.toBuffer(liteCardUrl(token, locale), { type: "png", width: 320, margin: 1 });
export const liteQrDataUrl = (token: string, locale: string) =>
  QRCode.toDataURL(liteCardUrl(token, locale), { width: 360, margin: 1, color: { dark: "#1f182d", light: "#ffffff" } });

export const cookieOptions = {
  path: "/",
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  maxAge: 60 * 60 * 24 * 365,
};

export const DEFAULT_REWARD: Record<LiteLocale, string> = {
  vi: "Giảm 15% lần tiếp theo",
  en: "15% off your next visit",
  fi: "15 % alennus seuraavasta käynnistä",
};

const TRIAL_NAME: Record<LiteLocale, string> = { vi: "Salon của tôi", en: "My salon", fi: "Oma salonki" };
const SAMPLE_NAME: Record<LiteLocale, string> = { vi: "Anna (thẻ mẫu)", en: "Anna (sample card)", fi: "Anna (mallikortti)" };

/** "Try it now": a salon without an email, signed in on this browser, with
 * a sample card already holding a few stamps to scan and stamp. It saves
 * itself with an email later (/api/loyalty-lite/save). */
export async function createTrialSalon(locale: LiteLocale) {
  const now = new Date();
  const salon = await prisma.liteSalon.create({
    data: { salonName: TRIAL_NAME[locale], locale, accessToken: newAccessToken(), rewardText: DEFAULT_REWARD[locale], trialStartedAt: now },
  });
  await prisma.liteCard.create({
    data: { liteSalonId: salon.id, token: await newCardToken(), customerName: SAMPLE_NAME[locale], sample: true, stamps: 3, totalStamps: 3, lastStampAt: now },
  });
  return salon;
}

/** Trials that never saved an email, older than LITE_TRIAL_DAYS: gone,
 * with their cards. Called by the reminders cron. */
export async function deleteStaleTrials() {
  const before = new Date(Date.now() - LITE_TRIAL_DAYS * 24 * 60 * 60 * 1000);
  const r = await prisma.liteSalon.deleteMany({ where: { email: null, createdAt: { lt: before } } });
  return r.count;
}

export function newAccessToken() {
  return randomBytes(24).toString("hex");
}

async function newCardToken() {
  for (let i = 0; i < 6; i++) {
    const token = randomGiftCode(10);
    const [lite, full] = await Promise.all([
      prisma.liteCard.findUnique({ where: { token }, select: { id: true } }),
      prisma.loyaltyCard.findUnique({ where: { token }, select: { id: true } }),
    ]);
    if (!lite && !full) return token;
  }
  throw new Error("COULD_NOT_GENERATE_TOKEN");
}

export type LiteSalonRow = LiteSalon;

export interface LiteSession {
  salon: LiteSalon;
  role: "owner" | "staff";
  staff: { id: string; name: string } | null;
}

const stale = (d: Date | null) => !d || Date.now() - d.getTime() > HOUR;

/** Who this browser is signed in as: the salon's owner (the cookie holds
 * LiteSalon.accessToken) or one of its staff (LiteStaff.accessToken). */
export async function currentLiteSession(): Promise<LiteSession | null> {
  const token = (await cookies()).get(LITE_COOKIE)?.value;
  if (!token || !/^[a-f0-9]{48}$/.test(token)) return null;
  const salon = await prisma.liteSalon.findUnique({ where: { accessToken: token } });
  if (salon) {
    if (stale(salon.lastSeenAt)) await prisma.liteSalon.update({ where: { id: salon.id }, data: { lastSeenAt: new Date() } }).catch(() => {});
    return { salon, role: "owner", staff: null };
  }
  const staff = await prisma.liteStaff.findUnique({ where: { accessToken: token }, include: { liteSalon: true } });
  if (!staff?.active) return null;
  if (stale(staff.lastSeenAt)) await prisma.liteStaff.update({ where: { id: staff.id }, data: { lastSeenAt: new Date() } }).catch(() => {});
  return { salon: staff.liteSalon, role: "staff", staff: { id: staff.id, name: staff.name } };
}

/** The salon this browser works for — owner or staff: enough to scan, stamp and give cards. */
export async function currentLiteSalon() {
  return (await currentLiteSession())?.salon ?? null;
}

/** Only the owner: the program, deleting cards, the profile and staff. */
export async function currentLiteOwner() {
  const s = await currentLiteSession();
  return s?.role === "owner" ? s.salon : null;
}

/** A staff login as the owner sees it (never the password or token). */
export const LITE_STAFF_SELECT = { id: true, name: true, email: true, active: true, lastSeenAt: true, createdAt: true } as const;

/** An email already used by a Lite salon or a Lite staff login. */
export async function liteEmailTaken(email: string, except?: { salonId?: string; staffId?: string }) {
  const [salon, staff] = await Promise.all([
    prisma.liteSalon.findUnique({ where: { email }, select: { id: true } }),
    prisma.liteStaff.findUnique({ where: { email }, select: { id: true } }),
  ]);
  return (!!salon && salon.id !== except?.salonId) || (!!staff && staff.id !== except?.staffId);
}

export async function createLiteCard(salon: LiteSalonRow, input: { customerName: string; customerEmail?: string | null }) {
  const count = await prisma.liteCard.count({ where: { liteSalonId: salon.id, sample: false } });
  if (count >= LITE_MAX_CARDS) return { error: "LIMIT" as const };
  // A trial keeps its customers' cards safe by saving an email first.
  if (!salon.email && count >= LITE_TRIAL_FREE_CARDS) return { error: "NEED_EMAIL" as const };
  const email = input.customerEmail?.trim().toLowerCase() || null;
  if (email) {
    const dup = await prisma.liteCard.findFirst({ where: { liteSalonId: salon.id, customerEmail: email }, select: { id: true } });
    if (dup) return { error: "DUPLICATE" as const };
  }
  const card = await prisma.liteCard.create({
    data: { liteSalonId: salon.id, token: await newCardToken(), customerName: input.customerName.trim(), customerEmail: email },
  });
  return { card };
}

export type StampResult =
  | { ok: true; stamps: number; ready: boolean }
  | { ok: false; error: "REWARD_READY" | "TOO_SOON"; nextAt?: string };

/** One stamp for today's visit — refused while a reward waits to be used, or
 * within LITE_STAMP_GAP_HOURS of the last stamp (scanning twice by accident). */
export async function stampLiteCard(salon: LiteSalonRow, cardId: string): Promise<StampResult | null> {
  const card = await prisma.liteCard.findFirst({ where: { id: cardId, liteSalonId: salon.id } });
  if (!card) return null;
  if (card.stamps >= salon.stampsRequired) return { ok: false, error: "REWARD_READY" };
  if (card.lastStampAt && Date.now() - card.lastStampAt.getTime() < LITE_STAMP_GAP_HOURS * HOUR) {
    return { ok: false, error: "TOO_SOON", nextAt: new Date(card.lastStampAt.getTime() + LITE_STAMP_GAP_HOURS * HOUR).toISOString() };
  }
  const updated = await prisma.$transaction(async (tx) => {
    await tx.liteCardEvent.create({ data: { cardId: card.id, kind: "STAMP" } });
    return tx.liteCard.update({
      where: { id: card.id },
      data: { stamps: { increment: 1 }, totalStamps: { increment: 1 }, lastStampAt: new Date() },
    });
  });
  return { ok: true, stamps: updated.stamps, ready: updated.stamps >= salon.stampsRequired };
}

/** The customer used their reward: the card starts a new round. */
export async function redeemLiteCard(salon: LiteSalonRow, cardId: string) {
  const card = await prisma.liteCard.findFirst({ where: { id: cardId, liteSalonId: salon.id } });
  if (!card || card.stamps < salon.stampsRequired) return false;
  await prisma.$transaction([
    prisma.liteCardEvent.create({ data: { cardId: card.id, kind: "REWARD" } }),
    prisma.liteCard.update({ where: { id: card.id }, data: { stamps: { decrement: salon.stampsRequired }, rewardsUsed: { increment: 1 } } }),
  ]);
  return true;
}

/** "Giảm 15%…" → 15, for the full program's discount when upgrading. */
function percentIn(text: string) {
  const m = text.match(/(\d{1,2})\s?%/);
  return m ? Number(m[1]) : 10;
}

/** A salon that applied as a full VaraaAi owner with its Lite email: the
 * program and the cards with an email move to the new salon — same QR
 * codes, same stamps. Cards without an email stay readable in Lite. */
export async function importLiteSalon(ownerEmail: string, businessId: string) {
  const lite = await prisma.liteSalon.findUnique({ where: { email: ownerEmail.trim().toLowerCase() }, include: { cards: true } });
  if (!lite || lite.upgradedBusinessId) return 0;
  const business = await prisma.business.findUniqueOrThrow({ where: { id: businessId }, select: { defaultCurrency: true } });
  await prisma.loyaltyProgram.upsert({
    where: { businessId },
    create: { businessId, pointsRequired: lite.stampsRequired, discountPercent: percentIn(lite.rewardText), priceCents: 0, currency: business.defaultCurrency },
    update: {},
  });
  let moved = 0;
  for (const c of lite.cards) {
    if (!c.customerEmail) continue;
    const taken = await prisma.loyaltyCard.findFirst({
      where: { OR: [{ token: c.token }, { businessId, customerEmail: c.customerEmail }] },
      select: { id: true },
    });
    if (taken) continue;
    await prisma.loyaltyCard.create({
      data: {
        businessId,
        customerName: c.customerName,
        customerEmail: c.customerEmail,
        token: c.token,
        points: Math.min(c.stamps, lite.stampsRequired),
        rewardReady: c.stamps >= lite.stampsRequired,
        rewardsEarned: c.rewardsUsed,
      },
    });
    moved++;
  }
  await prisma.liteSalon.update({ where: { id: lite.id }, data: { upgradedBusinessId: businessId } });
  return moved;
}
