import { prisma } from "@/lib/prisma";

const KEY = "emailDailyLimit";
/** "A day" for the quota: a little under 24h, so tomorrow's batch at the
 * same time is never held back by the tail of today's. */
export const EMAIL_QUOTA_WINDOW_MS = 23 * 60 * 60 * 1000;
export const DAY_MS = 24 * 60 * 60 * 1000;
export const MAX_EMAIL_DAILY_LIMIT = 100000;

/** The admin's default cap for salons without their own (null = no cap). */
export async function getDefaultEmailDailyLimit(): Promise<number | null> {
  const row = await prisma.platformSetting.findUnique({ where: { key: KEY } });
  const n = row ? parseInt(row.value, 10) : NaN;
  return Number.isFinite(n) && n > 0 ? n : null;
}

export async function setDefaultEmailDailyLimit(limit: number | null) {
  if (!limit) {
    await prisma.platformSetting.deleteMany({ where: { key: KEY } });
    return;
  }
  await prisma.platformSetting.upsert({ where: { key: KEY }, update: { value: String(limit) }, create: { key: KEY, value: String(limit) } });
}

/** How many marketing emails this salon may send per day (null = no cap). */
export async function emailDailyLimitFor(businessId: string): Promise<number | null> {
  const b = await prisma.business.findUnique({ where: { id: businessId }, select: { emailDailyLimit: true } });
  return b?.emailDailyLimit ?? (await getDefaultEmailDailyLimit());
}

/** Emails this salon sent in the last "day". */
export function emailsSentToday(businessId: string) {
  return prisma.emailCampaignDelivery.count({ where: { businessId, createdAt: { gte: new Date(Date.now() - EMAIL_QUOTA_WINDOW_MS) } } });
}
