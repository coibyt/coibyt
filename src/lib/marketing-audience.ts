import { prisma } from "@/lib/prisma";

/** Who did what with one sent campaign — opened it, clicked through to book,
 * never opened it, or has since unsubscribed — so the owner can see each
 * group and send it a follow-up campaign. Recipients are known from
 * EmailCampaignDelivery (campaigns sent since it exists); for older
 * campaigns only the opens and clicks are, so "didn't open" stays empty. */
export const AUDIENCE_GROUPS = ["OPENED", "CLICKED", "NOT_OPENED", "UNSUBSCRIBED"] as const;
export type AudienceGroup = (typeof AUDIENCE_GROUPS)[number];
/** Groups a follow-up can go to — never people who unsubscribed. */
export type SendableGroup = Exclude<AudienceGroup, "UNSUBSCRIBED">;

export interface AudiencePerson {
  /** "user:<id>" or "contact:<id>", like EmailCampaignDelivery.recipientKey. */
  key: string;
  name: string;
  email: string;
}

export async function campaignAudience(businessId: string, campaignId: string) {
  const campaign = await prisma.emailCampaign.findFirst({ where: { id: campaignId, businessId }, select: { id: true } });
  if (!campaign) return null;

  const [deliveries, events] = await Promise.all([
    prisma.emailCampaignDelivery.findMany({ where: { campaignId }, select: { recipientKey: true } }),
    prisma.emailCampaignEvent.findMany({ where: { campaignId }, select: { customerId: true, kind: true } }),
  ]);
  const tracked = deliveries.length > 0;

  // Events only carry the id: it's a user's or one of this salon's contacts'.
  const ids = new Set([...deliveries.map((d) => d.recipientKey.split(":")[1]), ...events.map((e) => e.customerId)]);
  const [users, contacts] = await Promise.all([
    prisma.user.findMany({ where: { id: { in: [...ids] } }, select: { id: true, name: true, email: true, marketingOptOut: true } }),
    prisma.marketingContact.findMany({ where: { id: { in: [...ids] }, businessId }, select: { id: true, name: true, email: true, optedOut: true } }),
  ]);
  const people = new Map<string, AudiencePerson & { optedOut: boolean }>();
  for (const u of users) people.set(u.id, { key: `user:${u.id}`, name: u.name, email: u.email, optedOut: u.marketingOptOut });
  for (const c of contacts) people.set(c.id, { key: `contact:${c.id}`, name: c.name ?? "", email: c.email, optedOut: c.optedOut });

  const pick = (list: Iterable<string>) =>
    [...new Set(list)]
      .map((id) => people.get(id))
      .filter((p): p is AudiencePerson & { optedOut: boolean } => !!p)
      .sort((a, b) => (a.name || a.email).localeCompare(b.name || b.email));
  const recipients = tracked ? deliveries.map((d) => d.recipientKey.split(":")[1]) : [...ids];
  const opened = new Set(events.filter((e) => e.kind === "OPEN").map((e) => e.customerId));
  const clicked = events.filter((e) => e.kind === "CLICK").map((e) => e.customerId);

  const strip = (list: (AudiencePerson & { optedOut: boolean })[]): AudiencePerson[] => list.map(({ key, name, email }) => ({ key, name, email }));
  const all = pick(recipients);
  return {
    tracked,
    groups: {
      OPENED: strip(pick(opened)),
      CLICKED: strip(pick(clicked)),
      NOT_OPENED: tracked ? strip(all.filter((p) => !opened.has(p.key.split(":")[1]))) : [],
      UNSUBSCRIBED: strip(all.filter((p) => p.optedOut)),
    } satisfies Record<AudienceGroup, AudiencePerson[]>,
  };
}

/** The recipient keys of one group, for sending a follow-up to it. */
export async function audienceKeys(businessId: string, campaignId: string, group: SendableGroup) {
  const a = await campaignAudience(businessId, campaignId);
  return new Set((a?.groups[group] ?? []).map((p) => p.key));
}
