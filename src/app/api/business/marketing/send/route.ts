import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess, requireApprovedOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendMail, marketingEmail } from "@/lib/mailer";
import { unsubscribeToken } from "@/lib/marketing-email";
import { awardPoints } from "@/lib/vara-points";
import {
  getMarketingRecipients,
  EMAIL_SENT_POINTS,
  EMAIL_COOLDOWN_BYPASS_POINTS,
} from "@/lib/marketing-recipients";

const schema = z.object({
  subject: z.string().trim().min(1).max(150),
  message: z.string().trim().min(1).max(5000),
  // Also email recipients still inside the 72h anti-spam cooldown, at
  // EMAIL_COOLDOWN_BYPASS_POINTS/email instead of EMAIL_SENT_POINTS.
  includeCooldown: z.boolean().optional().default(false),
});

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  // Vara points are the owner's — the dashboard page was already owner-only,
  // but this is the actual enforcement: a "view all pages, read-only" staff
  // member can now reach that page, and must never be able to spend the
  // owner's points from it.
  const access = await getBusinessAccess();
  if (!access?.isOwner) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const result = await requireApprovedOwnedBusinessId();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "FORBIDDEN" ? 403 : 409 });
  }
  const { businessId } = result;

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { subject, message, includeCooldown } = parsed.data;

  const business = await prisma.business.findUniqueOrThrow({
    where: { id: businessId },
    select: { name: true, ownerId: true },
  });

  const { eligible, cooldown } = await getMarketingRecipients(businessId);
  // Recipients still in cooldown are only included (and only cost anything)
  // when the owner explicitly opts in — otherwise they're simply skipped,
  // same as before this feature existed.
  const taggedRecipients = [
    ...eligible.map((customer) => ({ customer, cooldownBypass: false })),
    ...(includeCooldown ? cooldown.map((customer) => ({ customer, cooldownBypass: true })) : []),
  ];
  const projectedCost =
    eligible.length * EMAIL_SENT_POINTS + (includeCooldown ? cooldown.length * EMAIL_COOLDOWN_BYPASS_POINTS : 0);

  // Vara points belong to the owner account (shared across every branch they
  // run), never to the branch itself or whoever on staff happens to click
  // Send — checked up front so a campaign either goes out in full or not at
  // all, never partially.
  const owner = await prisma.user.findUniqueOrThrow({
    where: { id: business.ownerId },
    select: { varaPoints: true },
  });
  if (projectedCost > owner.varaPoints) {
    return NextResponse.json(
      { error: "INSUFFICIENT_VARA_POINTS", required: projectedCost, available: owner.varaPoints },
      { status: 402 }
    );
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  const bodyHtml = escapeHtml(message).replace(/\n/g, "<br/>");

  const results = await Promise.allSettled(
    taggedRecipients.map(({ customer }) => {
      const unsubscribeUrl = `${siteUrl}/api/marketing/unsubscribe?u=${customer.id}&t=${unsubscribeToken(
        customer.id
      )}`;
      const email = marketingEmail({
        businessName: business.name,
        bodyHtml,
        locale: customer.locale,
        unsubscribeUrl,
      });
      return sendMail({ to: customer.email, subject, html: email.html });
    })
  );

  const sent = taggedRecipients.filter((_, i) => results[i].status === "fulfilled");
  const sentEligible = sent.filter((r) => !r.cooldownBypass).length;
  const sentCooldown = sent.filter((r) => r.cooldownBypass).length;
  const sentCount = sentEligible + sentCooldown;

  await prisma.emailCampaign.create({
    data: { businessId, subject, bodyHtml, recipientCount: sentCount },
  });
  // Only the emails that actually went out are charged — a provider failure
  // on some recipients shouldn't cost the owner points for nothing sent.
  if (sentEligible > 0) {
    await awardPoints(business.ownerId, -sentEligible * EMAIL_SENT_POINTS, "EMAIL_SENT");
  }
  if (sentCooldown > 0) {
    await awardPoints(business.ownerId, -sentCooldown * EMAIL_COOLDOWN_BYPASS_POINTS, "EMAIL_SENT_COOLDOWN_BYPASS");
  }

  // Restart the 72h cooldown clock for everyone actually emailed, whether
  // they were already fresh or just had it paid-bypassed.
  if (sent.length > 0) {
    const now = new Date();
    await Promise.all(
      sent.map(({ customer }) =>
        prisma.emailRecipientCooldown.upsert({
          where: { businessId_customerId: { businessId, customerId: customer.id } },
          update: { lastSentAt: now },
          create: { businessId, customerId: customer.id, lastSentAt: now },
        })
      )
    );
  }

  return NextResponse.json({ sent: sentCount, total: taggedRecipients.length });
}
