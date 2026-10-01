import { prisma } from "@/lib/prisma";

export const EMAIL_COOLDOWN_HOURS = 72;
export const EMAIL_SENT_POINTS = 1;
export const EMAIL_COOLDOWN_BYPASS_POINTS = 5;

interface RecipientCustomer {
  id: string;
  email: string;
  name: string;
  locale: string;
}

export interface RecipientBreakdown {
  /** Free to email right now — never emailed by this business, or last
   * emailed more than 72h ago. */
  eligible: RecipientCustomer[];
  /** Emailed by this business within the last 72h — can still be emailed
   * again, but only by paying EMAIL_COOLDOWN_BYPASS_POINTS instead of
   * EMAIL_SENT_POINTS (see /api/business/marketing/send). */
  cooldown: RecipientCustomer[];
}

/** Every past customer of this business who can currently receive a
 * marketing email (opted in, not a walk-in placeholder address), split by
 * the 72-hour anti-spam cooldown since their last marketing email from this
 * same business. The recipient list itself is never stored — it's
 * re-derived fresh from bookings on every call, so an unsubscribe or a new
 * booking is always reflected immediately. */
export async function getMarketingRecipients(businessId: string): Promise<RecipientBreakdown> {
  const bookings = await prisma.booking.findMany({
    where: { businessId },
    distinct: ["customerId"],
    select: {
      customer: { select: { id: true, email: true, name: true, locale: true, marketingOptOut: true } },
    },
  });
  const candidates = bookings
    .map((b) => b.customer)
    .filter((c) => !c.marketingOptOut && !c.email.endsWith("@walkin.varaaai.com"));
  if (candidates.length === 0) return { eligible: [], cooldown: [] };

  const cooldownRows = await prisma.emailRecipientCooldown.findMany({
    where: { businessId, customerId: { in: candidates.map((c) => c.id) } },
  });
  const lastSentMap = new Map(cooldownRows.map((row) => [row.customerId, row.lastSentAt]));
  const cutoff = Date.now() - EMAIL_COOLDOWN_HOURS * 60 * 60 * 1000;

  const eligible: RecipientCustomer[] = [];
  const cooldown: RecipientCustomer[] = [];
  for (const c of candidates) {
    const lastSentAt = lastSentMap.get(c.id);
    if (lastSentAt && lastSentAt.getTime() > cutoff) cooldown.push(c);
    else eligible.push(c);
  }
  return { eligible, cooldown };
}
