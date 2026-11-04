import type { EmailCampaign, LoyaltyProgram } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { awardPoints } from "@/lib/vara-points";
import { trackingToken, unsubscribeToken } from "@/lib/marketing-email";
import { campaignEmail, marketingImageUrl, type CampaignLoyaltyCard, type CampaignSalon } from "@/lib/email/marketing-campaign-email";
import { SAMPLE_LOYALTY_TOKEN, loyaltyQrPng, newLoyaltyToken } from "@/lib/loyalty";
import { SITE_URL } from "@/lib/email/ui";
import { profileChecklist } from "@/lib/profile-completeness";
import { DAY_MS, emailDailyLimitFor, emailsSentToday } from "@/lib/email-daily-limit";
import {
  EMAIL_COOLDOWN_BYPASS_POINTS,
  EMAIL_SENT_POINTS,
  getMarketingRecipients,
  isSegment,
} from "@/lib/marketing-recipients";

const SITE = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
const SEND_BATCH = 15;

export const salonSelect = {
  name: true,
  slug: true,
  logoUrl: true,
  city: true,
  addressLine: true,
  phone: true,
  ownerId: true,
} as const;

/** The name of all an owner's branches together: what they set, else the
 * words every branch name starts with ("Moja Beauty Kamppi" + "Moja Beauty
 * Sörnäinen" → "Moja Beauty"), else the first branch's name. */
export async function brandNameFor(ownerId: string) {
  const [owner, branches] = await Promise.all([
    prisma.user.findUnique({ where: { id: ownerId }, select: { brandName: true } }),
    prisma.business.findMany({ where: { ownerId }, select: { name: true }, orderBy: { createdAt: "asc" } }),
  ]);
  if (owner?.brandName?.trim()) return owner.brandName.trim();
  const words = branches.map((b) => b.name.trim().split(/\s+/));
  const common: string[] = [];
  for (let i = 0; words.length && i < words[0].length; i++) {
    if (words.some((w) => w[i]?.toLowerCase() !== words[0][i].toLowerCase())) break;
    common.push(words[0][i]);
  }
  const prefix = common.join(" ").replace(/[\s\-–—|,·:]+$/, "");
  return branches.length > 1 && prefix.length >= 2 ? prefix : branches[0]?.name ?? "";
}

/** The salon a campaign is sent as: the branch, or (SYSTEM) the owner's
 * brand — its name, without the branch's city under it. */
export async function campaignSalon(businessId: string, senderMode: string) {
  const business = await prisma.business.findUniqueOrThrow({ where: { id: businessId }, select: { ...salonSelect, defaultLocale: true } });
  if (senderMode !== "SYSTEM") return business;
  return { ...business, name: (await brandNameFor(business.ownerId)) || business.name, city: null };
}

export function salonPage(slug: string) {
  return `${SITE()}/b/${slug}`;
}

/** Users unsubscribe from all marketing; a contact from this salon's list. */
function unsubscribeUrl(r: { id: string; kind?: "user" | "contact" }) {
  return r.kind === "contact"
    ? `${SITE()}/api/marketing/unsubscribe?c=${r.id}&t=${unsubscribeToken(`contact:${r.id}`)}`
    : `${SITE()}/api/marketing/unsubscribe?u=${r.id}&t=${unsubscribeToken(r.id)}`;
}

type Content = Pick<
  EmailCampaign,
  "subject" | "preheader" | "headline" | "message" | "imageId" | "ctaKind" | "ctaLabel" | "ctaUrl" | "offerTitle" | "offerCode" | "offerExpires"
>;

/** One campaign rendered for one recipient — or, with no recipient, for the
 * preview and test sends: personalised with `sampleName`, no tracking and no
 * unsubscribe link. */
export function renderCampaign(
  campaign: Content & { id?: string },
  salon: CampaignSalon & { slug: string },
  recipient: { id: string; name: string; locale: string; kind?: "user" | "contact" } | null,
  locale: string,
  sampleName: string | null = null,
  loyalty: CampaignLoyaltyCard | null = null
) {
  const track = campaign.id && recipient ? trackingToken(campaign.id, recipient.id) : null;
  const direct = campaign.ctaKind === "URL" ? campaign.ctaUrl : campaign.ctaKind === "BOOK" ? salonPage(salon.slug) : null;
  return campaignEmail({
    locale,
    salon,
    content: {
      subject: campaign.subject,
      preheader: campaign.preheader,
      headline: campaign.headline,
      message: campaign.message ?? "",
      imageUrl: marketingImageUrl(campaign.imageId),
      ctaKind: campaign.ctaKind,
      ctaLabel: campaign.ctaLabel,
      offerTitle: campaign.offerTitle,
      offerCode: campaign.offerCode,
      offerExpires: campaign.offerExpires,
    },
    recipientName: recipient?.name ?? sampleName,
    ctaHref: track && direct ? `${SITE()}/api/marketing/c/${track}?to=cta` : direct,
    salonHref: track ? `${SITE()}/api/marketing/c/${track}?to=salon` : salonPage(salon.slug),
    unsubscribeUrl: recipient ? unsubscribeUrl(recipient) : null,
    pixelUrl: track ? `${SITE()}/api/marketing/o/${track}.gif` : null,
    loyalty,
  });
}

/** The recipient's loyalty card at this salon — made now if they have none,
 * so the email can welcome them to a new card or remind them of their code. */
async function cardFor(businessId: string, r: { email: string; name: string }, program: LoyaltyProgram) {
  const email = r.email.toLowerCase();
  const toBlock = (c: { token: string; customerName: string; points: number }, isNew: boolean): CampaignLoyaltyCard => ({
    token: c.token,
    holder: c.customerName,
    isNew,
    points: c.points,
    pointsRequired: program.pointsRequired,
    discountPercent: program.discountPercent,
    qrUrl: `${SITE_URL}/api/email-qr/loyalty/${encodeURIComponent(c.token)}.png`,
  });
  const existing = await prisma.loyaltyCard.findUnique({ where: { businessId_customerEmail: { businessId, customerEmail: email } } });
  if (existing) return { block: toBlock(existing, false), createdId: null };
  const created = await prisma.loyaltyCard.create({
    data: { businessId, customerName: r.name.trim() || email.split("@")[0], customerEmail: email, token: await newLoyaltyToken() },
  });
  return { block: toBlock(created, true), createdId: created.id };
}

/** A sample card for the studio's preview and test emails. Its QR is a
 * normal https image like a real card's: Gmail and most mail apps block
 * inline "data:" images. Null without a loyalty program. */
export async function sampleLoyaltyCard(businessId: string, name: string): Promise<CampaignLoyaltyCard | null> {
  const program = await prisma.loyaltyProgram.findUnique({ where: { businessId } });
  if (!program) return null;
  const token = SAMPLE_LOYALTY_TOKEN;
  return {
    token,
    holder: name || "Anna",
    isNew: true,
    points: 0,
    pointsRequired: program.pointsRequired,
    discountPercent: program.discountPercent,
    qrUrl: `${SITE_URL}/api/email-qr/loyalty/${token}.png`,
    sample: true,
  };
}

/** What sending a campaign to its audience costs right now, in Vara points. */
export async function campaignCost(businessId: string, segment: string, includeCooldown: boolean) {
  const { eligible, cooldown } = await getMarketingRecipients(businessId, isSegment(segment) ? segment : "ALL");
  return {
    eligible,
    cooldown,
    recipients: eligible.length + (includeCooldown ? cooldown.length : 0),
    cost: eligible.length * EMAIL_SENT_POINTS + (includeCooldown ? cooldown.length * EMAIL_COOLDOWN_BYPASS_POINTS : 0),
  };
}

export type SendOutcome =
  // remaining > 0: over the salon's daily limit, the rest goes out at nextAt.
  | { ok: true; sent: number; total: number; remaining: number; nextAt: Date | null }
  | { ok: false; error: "NOT_FOUND" | "INSUFFICIENT_VARA_POINTS" | "NO_RECIPIENTS" | "NO_LOYALTY_PROGRAM"; required?: number; available?: number };

const recipientKey = (c: { id: string; kind: "user" | "contact" }) => `${c.kind}:${c.id}`;

/** Sends a campaign that has been claimed for sending (status SENDING):
 * all-or-nothing on Vara points, only charging for emails that actually
 * went out, and restarting each recipient's 72h cooldown. Over the salon's
 * daily email limit it sends one day's share and goes back to SCHEDULED for
 * the same time tomorrow, skipping whoever already has it. */
export async function sendCampaign(campaignId: string): Promise<SendOutcome> {
  const campaign = await prisma.emailCampaign.findUnique({ where: { id: campaignId } });
  if (!campaign || campaign.status !== "SENDING") return { ok: false, error: "NOT_FOUND" };
  const business = await campaignSalon(campaign.businessId, campaign.senderMode);

  const { eligible, cooldown } = await campaignCost(campaign.businessId, campaign.segment, campaign.includeCooldown);
  const delivered = new Set(
    campaign.sentCount > 0
      ? (await prisma.emailCampaignDelivery.findMany({ where: { campaignId }, select: { recipientKey: true } })).map((d) => d.recipientKey)
      : []
  );
  const pending = [
    ...eligible.map((customer) => ({ customer, cooldownBypass: false })),
    ...(campaign.includeCooldown ? cooldown.map((customer) => ({ customer, cooldownBypass: true })) : []),
  ].filter(({ customer }) => !delivered.has(recipientKey(customer)));
  const fail = async (error: "INSUFFICIENT_VARA_POINTS" | "NO_RECIPIENTS" | "NO_LOYALTY_PROGRAM", extra = {}) => {
    await prisma.emailCampaign.update({ where: { id: campaignId }, data: { status: "FAILED", recipientCount: campaign.sentCount } });
    return { ok: false as const, error, ...extra };
  };
  // Everyone left already had it on an earlier day.
  if (pending.length === 0 && campaign.sentCount > 0) {
    await prisma.emailCampaign.update({ where: { id: campaignId }, data: { status: "SENT", sentAt: new Date(), recipientCount: campaign.sentCount } });
    return { ok: true, sent: 0, total: campaign.sentCount, remaining: 0, nextAt: null };
  }
  if (pending.length === 0) return fail("NO_RECIPIENTS");

  // Today's share under the daily limit; tomorrow's run is the same time.
  const limit = await emailDailyLimitFor(campaign.businessId);
  const quota = limit === null ? pending.length : Math.max(0, limit - (await emailsSentToday(campaign.businessId)));
  const tagged = pending.slice(0, quota);
  let nextAt = new Date((campaign.scheduledAt ?? new Date()).getTime() + DAY_MS);
  while (nextAt.getTime() <= Date.now()) nextAt = new Date(nextAt.getTime() + DAY_MS);
  const total = campaign.sentCount + pending.length;
  // The day's quota is already used up (by another campaign): wait for tomorrow.
  if (tagged.length === 0) {
    await prisma.emailCampaign.update({ where: { id: campaignId }, data: { status: "SCHEDULED", scheduledAt: nextAt, recipientCount: total } });
    return { ok: true, sent: 0, total, remaining: pending.length, nextAt };
  }
  const cost = tagged.reduce((a, t) => a + (t.cooldownBypass ? EMAIL_COOLDOWN_BYPASS_POINTS : EMAIL_SENT_POINTS), 0);

  // Vara points belong to the owner account (shared across every branch);
  // checked up front so a campaign (or the day's share of it) goes out in
  // full or not at all.
  const owner = await prisma.user.findUniqueOrThrow({ where: { id: business.ownerId }, select: { varaPoints: true } });
  if (cost > owner.varaPoints) return fail("INSUFFICIENT_VARA_POINTS", { required: cost, available: owner.varaPoints });

  const program = campaign.loyaltyCard ? await prisma.loyaltyProgram.findUnique({ where: { businessId: campaign.businessId } }) : null;
  if (campaign.loyaltyCard && !program) return fail("NO_LOYALTY_PROGRAM");

  const results: PromiseSettledResult<unknown>[] = [];
  for (let i = 0; i < tagged.length; i += SEND_BATCH) {
    const batch = tagged.slice(i, i + SEND_BATCH);
    results.push(
      ...(await Promise.allSettled(
        batch.map(async ({ customer }) => {
          const card = program ? await cardFor(campaign.businessId, customer, program) : null;
          const mail = renderCampaign(campaign, business, customer, customer.locale, null, card?.block ?? null);
          try {
            await sendMail({
              to: customer.email,
              subject: mail.subject,
              html: mail.html,
              fromName: business.name,
              // The QR as a file too, so it can be saved to the phone.
              attachments: card ? [{ filename: `${card.block.token}.png`, content: await loyaltyQrPng(card.block.token), contentType: "image/png" }] : undefined,
            });
          } catch (err) {
            // A card made for an email that never arrived would greet them
            // as an existing member next time — undo it.
            if (card?.createdId) await prisma.loyaltyCard.delete({ where: { id: card.createdId } }).catch(() => {});
            throw err;
          }
        })
      ))
    );
  }

  const sent = tagged.filter((_, i) => results[i].status === "fulfilled");
  const sentEligible = sent.filter((r) => !r.cooldownBypass).length;
  const sentCooldown = sent.length - sentEligible;

  if (sent.length > 0) {
    await prisma.emailCampaignDelivery.createMany({
      data: sent.map(({ customer }) => ({ campaignId, businessId: campaign.businessId, recipientKey: recipientKey(customer) })),
      skipDuplicates: true,
    });
  }
  const sentCount = campaign.sentCount + sent.length;
  const more = tagged.length < pending.length;
  await prisma.emailCampaign.update({
    where: { id: campaignId },
    data: more
      ? { status: "SCHEDULED", scheduledAt: nextAt, sentCount, recipientCount: total }
      : { status: "SENT", sentAt: new Date(), sentCount, recipientCount: sentCount },
  });
  // Only emails that actually went out are charged.
  if (sentEligible > 0) await awardPoints(business.ownerId, -sentEligible * EMAIL_SENT_POINTS, "EMAIL_SENT");
  if (sentCooldown > 0) {
    await awardPoints(business.ownerId, -sentCooldown * EMAIL_COOLDOWN_BYPASS_POINTS, "EMAIL_SENT_COOLDOWN_BYPASS");
  }
  if (sent.length > 0) {
    const now = new Date();
    const contactIds = sent.filter(({ customer }) => customer.kind === "contact").map(({ customer }) => customer.id);
    if (contactIds.length) {
      await prisma.marketingContact.updateMany({ where: { id: { in: contactIds } }, data: { lastEmailedAt: now } });
    }
    await Promise.all(
      sent.filter(({ customer }) => customer.kind === "user").map(({ customer }) =>
        prisma.emailRecipientCooldown.upsert({
          where: { businessId_customerId: { businessId: campaign.businessId, customerId: customer.id } },
          update: { lastSentAt: now },
          create: { businessId: campaign.businessId, customerId: customer.id, lastSentAt: now },
        })
      )
    );
  }
  return more
    ? { ok: true, sent: sent.length, total, remaining: pending.length - sent.length, nextAt }
    : { ok: true, sent: sent.length, total: sentCount, remaining: 0, nextAt: null };
}

/** Sends every scheduled campaign whose time has come. Called by the
 * reminders cron and, as a fallback, whenever an owner opens the studio.
 * Each campaign is claimed with a conditional update, so two callers never
 * send the same one twice. */
export async function sendDueCampaigns(businessId?: string) {
  const due = await prisma.emailCampaign.findMany({
    where: { status: "SCHEDULED", scheduledAt: { lte: new Date() }, ...(businessId ? { businessId } : {}) },
    select: { id: true, businessId: true },
    take: 20,
  });
  let sent = 0;
  for (const c of due) {
    // Waits, still scheduled, while the salon profile is under the unlock %.
    if (!(await profileChecklist(c.businessId)).unlocked) continue;
    const claimed = await prisma.emailCampaign.updateMany({ where: { id: c.id, status: "SCHEDULED" }, data: { status: "SENDING" } });
    if (claimed.count === 0) continue;
    const r = await sendCampaign(c.id).catch((err) => {
      console.error("[sendDueCampaigns]", c.id, err);
      return null;
    });
    if (r?.ok) sent++;
  }
  return sent;
}

/** Records one open/click per recipient per campaign and bumps its counters.
 * A click implies an open (images are often blocked). */
export async function recordCampaignEvent(campaignId: string, customerId: string, kind: "OPEN" | "CLICK") {
  const kinds: ("OPEN" | "CLICK")[] = kind === "CLICK" ? ["OPEN", "CLICK"] : ["OPEN"];
  for (const k of kinds) {
    try {
      await prisma.emailCampaignEvent.create({ data: { campaignId, customerId, kind: k } });
      await prisma.emailCampaign.update({
        where: { id: campaignId },
        data: k === "OPEN" ? { openCount: { increment: 1 } } : { clickCount: { increment: 1 } },
      });
    } catch {
      // Already counted (unique per recipient), or the campaign is gone.
    }
  }
}
