import { prisma } from "@/lib/prisma";
import { SEGMENTS, type Segment } from "@/lib/marketing-segments";

export { SEGMENTS, EMAIL_SENT_POINTS, EMAIL_COOLDOWN_BYPASS_POINTS, type Segment } from "@/lib/marketing-segments";

export const EMAIL_COOLDOWN_HOURS = 72;

/** Who a campaign goes to:
 * - ALL: every past customer, plus the salon's own contact list
 * - RECENT: visited in the last 60 days
 * - LAPSED: visited before, but not in 90+ days and nothing booked ahead ("win back")
 * - LOYAL: 3 or more visits
 * - NEW: first visit within the last 30 days, only one visit so far
 * - MEMBERS: holds this salon's loyalty card
 * - IMPORTED: on the salon's contact list (added by hand or from Excel) */
export function isSegment(s: unknown): s is Segment {
  return typeof s === "string" && (SEGMENTS as readonly string[]).includes(s);
}

export interface RecipientCustomer {
  id: string;
  email: string;
  name: string;
  locale: string;
  /** A VaraaAi user who booked here, or a MarketingContact. */
  kind: "user" | "contact";
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
  /** Contacts only — users' cooldown lives in EmailRecipientCooldown. */
  lastEmailedAt?: Date | null;
}

/** Everyone this business can currently email, with their visit history:
 * past customers (opted in, not a walk-in placeholder address) and the
 * salon's contact list, minus anyone who unsubscribed. Re-derived fresh on
 * every call, so an unsubscribe or a new booking is reflected immediately. */
async function customerStats(businessId: string): Promise<CustomerStats[]> {
  const [bookings, contacts, business] = await Promise.all([
    prisma.booking.findMany({
      where: { businessId },
      select: {
        startsAt: true,
        status: true,
        customer: { select: { id: true, email: true, name: true, locale: true, marketingOptOut: true } },
      },
    }),
    prisma.marketingContact.findMany({
      where: { businessId, optedOut: false },
      select: { id: true, email: true, name: true, lastEmailedAt: true },
    }),
    prisma.business.findUnique({ where: { id: businessId }, select: { defaultLocale: true } }),
  ]);
  const now = Date.now();
  const map = new Map<string, CustomerStats>();
  // Every booking customer's email, opted out or not — a contact with the
  // same email is that customer, never a second recipient.
  const bookedEmails = new Set<string>();
  for (const b of bookings) {
    const c = b.customer;
    bookedEmails.add(c.email.toLowerCase());
    if (c.marketingOptOut || c.email.endsWith("@walkin.varaaai.com")) continue;
    let s = map.get(c.id);
    if (!s) {
      s = {
        customer: { id: c.id, email: c.email, name: c.name, locale: c.locale, kind: "user" },
        visits: 0,
        firstVisit: null,
        lastVisit: null,
        upcoming: false,
      };
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

  const fresh = contacts.filter((c) => !bookedEmails.has(c.email));
  // A VaraaAi user who unsubscribed from marketing stays unsubscribed even
  // when a salon imports their address.
  const optedOutUsers = fresh.length
    ? new Set(
        (
          await prisma.user.findMany({
            where: { email: { in: fresh.map((c) => c.email) }, marketingOptOut: true },
            select: { email: true },
          })
        ).map((u) => u.email.toLowerCase())
      )
    : new Set<string>();
  const locale = business?.defaultLocale ?? "vi";
  const out = [...map.values()];
  for (const c of fresh) {
    if (optedOutUsers.has(c.email)) continue;
    out.push({
      customer: { id: c.id, email: c.email, name: c.name ?? "", locale, kind: "contact" },
      visits: 0,
      firstVisit: null,
      lastVisit: null,
      upcoming: false,
      lastEmailedAt: c.lastEmailedAt,
    });
  }
  return out;
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
    case "IMPORTED":
      return s.customer.kind === "contact";
  }
}

async function loyaltyEmails(businessId: string) {
  const cards = await prisma.loyaltyCard.findMany({ where: { businessId }, select: { customerEmail: true } });
  return new Set(cards.map((c) => c.customerEmail.toLowerCase()));
}

async function splitByCooldown(businessId: string, list: CustomerStats[]): Promise<RecipientBreakdown> {
  if (list.length === 0) return { eligible: [], cooldown: [] };
  const userIds = list.filter((s) => s.customer.kind === "user").map((s) => s.customer.id);
  const cooldownRows = userIds.length
    ? await prisma.emailRecipientCooldown.findMany({ where: { businessId, customerId: { in: userIds } } })
    : [];
  const lastSentMap = new Map(cooldownRows.map((row) => [row.customerId, row.lastSentAt]));
  const cutoff = Date.now() - EMAIL_COOLDOWN_HOURS * 60 * 60 * 1000;

  const eligible: RecipientCustomer[] = [];
  const cooldown: RecipientCustomer[] = [];
  for (const s of list) {
    const lastSentAt = s.customer.kind === "contact" ? s.lastEmailedAt : lastSentMap.get(s.customer.id);
    if (lastSentAt && lastSentAt.getTime() > cutoff) cooldown.push(s.customer);
    else eligible.push(s.customer);
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
    stats.filter((s) => inSegment(s, segment, members))
  );
}

/** Eligible / cooldown counts for every segment at once, for the audience picker. */
export async function segmentCounts(businessId: string) {
  const [stats, members] = await Promise.all([customerStats(businessId), loyaltyEmails(businessId)]);
  const all = await splitByCooldown(businessId, stats);
  const cooling = new Set(all.cooldown.map((c) => c.id));
  const out = {} as Record<Segment, { eligible: number; cooldown: number }>;
  for (const seg of SEGMENTS) {
    const ids = stats.filter((s) => inSegment(s, seg, members)).map((s) => s.customer.id);
    const cooldown = ids.filter((id) => cooling.has(id)).length;
    out[seg] = { eligible: ids.length - cooldown, cooldown };
  }
  return out;
}
