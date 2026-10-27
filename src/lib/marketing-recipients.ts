import { prisma } from "@/lib/prisma";

import { SEGMENTS, type Segment } from "@/lib/marketing-segments";

export { SEGMENTS, EMAIL_SENT_POINTS, EMAIL_COOLDOWN_BYPASS_POINTS, type Segment } from "@/lib/marketing-segments";

export const EMAIL_COOLDOWN_HOURS = 72;

/** Who a campaign goes to:
 * - ALL: every past customer
 * - RECENT: visited in the last 60 days
 * - LAPSED: visited before, but not in 90+ days and nothing booked ahead ("win back")
 * - LOYAL: 3 or more visits
 * - NEW: first visit within the last 30 days, only one visit so far
 * - MEMBERS: holds this salon's loyalty card */
export function isSegment(s: unknown): s is Segment {
  return typeof s === "string" && (SEGMENTS as readonly string[]).includes(s);
}

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
   * EMAIL_SENT_POINTS (see src/lib/marketing-send.ts). */
  cooldown: RecipientCustomer[];
}

const DAY = 24 * 60 * 60 * 1000;

interface CustomerStats {
  customer: RecipientCustomer;
  visits: number;
  firstVisit: number | null;
  lastVisit: number | null;
  upcoming: boolean;
}

/** Every past customer of this business who can currently receive a
 * marketing email (opted in, not a walk-in placeholder address), with their
 * visit history. Re-derived fresh from bookings on every call, so an
 * unsubscribe or a new booking is always reflected immediately. */
async function customerStats(businessId: string): Promise<CustomerStats[]> {
  const bookings = await prisma.booking.findMany({
    where: { businessId },
    select: {
      startsAt: true,
      status: true,
      customer: { select: { id: true, email: true, name: true, locale: true, marketingOptOut: true } },
    },
  });
  const now = Date.now();
  const map = new Map<string, CustomerStats>();
  for (const b of bookings) {
    const c = b.customer;
    if (c.marketingOptOut || c.email.endsWith("@walkin.varaaai.com")) continue;
    let s = map.get(c.id);
    if (!s) {
      s = { customer: { id: c.id, email: c.email, name: c.name, locale: c.locale }, visits: 0, firstVisit: null, lastVisit: null, upcoming: false };
      map.set(c.id, s);
    }
    if (b.status === "CANCELLED" || b.status === "NO_SHOW") continue;
    const t = b.startsAt.getTime();
    if (t > now) {
      s.upcoming = true;
    } else if (b.status === "CONFIRMED" || b.status === "COMPLETED") {
      s.visits++;
      s.firstVisit = s.firstVisit === null ? t : Math.min(s.firstVisit, t);
      s.lastVisit = s.lastVisit === null ? t : Math.max(s.lastVisit, t);
    }
  }
  return [...map.values()];
}

function inSegment(s: CustomerStats, segment: Segment, members: Set<string>) {
  const now = Date.now();
  switch (segment) {
    case "ALL":
      return true;
    case "RECENT":
      return s.lastVisit !== null && s.lastVisit >= now - 60 * DAY;
    case "LAPSED":
      return s.lastVisit !== null && s.lastVisit < now - 90 * DAY && !s.upcoming;
    case "LOYAL":
      return s.visits >= 3;
    case "NEW":
      return s.visits === 1 && s.firstVisit !== null && s.firstVisit >= now - 30 * DAY;
    case "MEMBERS":
      return members.has(s.customer.email.toLowerCase());
  }
}

async function loyaltyEmails(businessId: string) {
  const cards = await prisma.loyaltyCard.findMany({ where: { businessId }, select: { customerEmail: true } });
  return new Set(cards.map((c) => c.customerEmail.toLowerCase()));
}

async function splitByCooldown(businessId: string, list: RecipientCustomer[]): Promise<RecipientBreakdown> {
  if (list.length === 0) return { eligible: [], cooldown: [] };
  const cooldownRows = await prisma.emailRecipientCooldown.findMany({
    where: { businessId, customerId: { in: list.map((c) => c.id) } },
  });
  const lastSentMap = new Map(cooldownRows.map((row) => [row.customerId, row.lastSentAt]));
  const cutoff = Date.now() - EMAIL_COOLDOWN_HOURS * 60 * 60 * 1000;

  const eligible: RecipientCustomer[] = [];
  const cooldown: RecipientCustomer[] = [];
  for (const c of list) {
    const lastSentAt = lastSentMap.get(c.id);
    if (lastSentAt && lastSentAt.getTime() > cutoff) cooldown.push(c);
    else eligible.push(c);
  }
  return { eligible, cooldown };
}

/** The customers in one segment, split by the 72-hour anti-spam cooldown
 * since their last marketing email from this same business. */
export async function getMarketingRecipients(businessId: string, segment: Segment = "ALL"): Promise<RecipientBreakdown> {
  const [stats, members] = await Promise.all([
    customerStats(businessId),
    segment === "MEMBERS" ? loyaltyEmails(businessId) : Promise.resolve(new Set<string>()),
  ]);
  return splitByCooldown(
    businessId,
    stats.filter((s) => inSegment(s, segment, members)).map((s) => s.customer)
  );
}

/** Eligible / cooldown counts for every segment at once, for the audience picker. */
export async function segmentCounts(businessId: string) {
  const [stats, members] = await Promise.all([customerStats(businessId), loyaltyEmails(businessId)]);
  const all = await splitByCooldown(businessId, stats.map((s) => s.customer));
  const cooling = new Set(all.cooldown.map((c) => c.id));
  const out = {} as Record<Segment, { eligible: number; cooldown: number }>;
  for (const seg of SEGMENTS) {
    const ids = stats.filter((s) => inSegment(s, seg, members)).map((s) => s.customer.id);
    const cooldown = ids.filter((id) => cooling.has(id)).length;
    out[seg] = { eligible: ids.length - cooldown, cooldown };
  }
  return out;
}
