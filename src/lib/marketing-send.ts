import type { EmailCampaign, LoyaltyProgram } from "@prisma/client";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { awardPoints } from "@/lib/vara-points";
import { trackingToken, unsubscribeToken } from "@/lib/marketing-email";
import { campaignEmail, marketingImageUrl, type CampaignLoyaltyCard, type CampaignSalon } from "@/lib/email/marketing-campaign-email";
import { loyaltyQrPng, loyaltyScanUrl, newLoyaltyToken } from "@/lib/loyalty";
import { SITE_URL } from "@/lib/email/ui";
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

/** A sample card for the studio's preview and test emails, with the QR
 * inlined (there's no real card behind it). Null without a loyalty program. */
export async function sampleLoyaltyCard(businessId: string, name: string): Promise<CampaignLoyaltyCard | null> {
  const program = await prisma.loyaltyProgram.findUnique({ where: { businessId } });
  if (!program) return null;
  const token = "VARA2026DEMO";
  return {
    token,
    holder: name || "Anna",
    isNew: true,
    points: 0,
    pointsRequired: program.pointsRequired,
    discountPercent: program.discountPercent,
    qrUrl: await QRCode.toDataURL(loyaltyScanUrl(token), { width: 240, margin: 1 }),
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
  | { ok: true; sent: number; total: number }
  | { ok: false; error: "NOT_FOUND" | "INSUFFICIENT_VARA_POINTS" | "NO_RECIPIENTS" | "NO_LOYALTY_PROGRAM"; required?: number; available?: number };

/** Sends a campaign that has been claimed for sending (status SENDING):
 * all-or-nothing on Vara points, only charging for emails that actually
 * went out, and restarting each recipient's 72h cooldown. */
export async function sendCampaign(campaignId: string): Promise<SendOutcome> {
  const campaign = await prisma.emailCampaign.findUnique({
    where: { id: campaignId },
    include: { business: { select: salonSelect } },
  });
  if (!campaign || campaign.status !== "SENDING") return { ok: false, error: "NOT_FOUND" };
  const { business } = campaign;

  const { eligible, cooldown, cost } = await campaignCost(campaign.businessId, campaign.segment, campaign.includeCooldown);
  const tagged = [
    ...eligible.map((customer) => ({ customer, cooldownBypass: false })),
    ...(campaign.includeCooldown ? cooldown.map((customer) => ({ customer, cooldownBypass: true })) : []),
  ];
  const fail = async (error: "INSUFFICIENT_VARA_POINTS" | "NO_RECIPIENTS" | "NO_LOYALTY_PROGRAM", extra = {}) => {
    await prisma.emailCampaign.update({ where: { id: campaignId }, data: { status: "FAILED", recipientCount: 0 } });
    return { ok: false as const, error, ...extra };
  };
  if (tagged.length === 0) return fail("NO_RECIPIENTS");

  // Vara points belong to the owner account (shared across every branch);
  // checked up front so a campaign goes out in full or not at all.
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

  await prisma.emailCampaign.update({
    where: { id: campaignId },
    data: { status: "SENT", sentAt: new Date(), recipientCount: sent.length },
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
  return { ok: true, sent: sent.length, total: tagged.length };
}

/** Sends every scheduled campaign whose time has come. Called by the
 * reminders cron and, as a fallback, whenever an owner opens the studio.
 * Each campaign is claimed with a conditional update, so two callers never
 * send the same one twice. */
export async function sendDueCampaigns(businessId?: string) {
  const due = await prisma.emailCampaign.findMany({
    where: { status: "SCHEDULED", scheduledAt: { lte: new Date() }, ...(businessId ? { businessId } : {}) },
    select: { id: true },
    take: 20,
  });
  let sent = 0;
  for (const c of due) {
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
