import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess, requireApprovedOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { campaignColumns, campaignContentSchema } from "@/lib/marketing-campaign";
import { campaignCost, sendCampaign } from "@/lib/marketing-send";
import { esc } from "@/lib/email/ui";

const schema = z.object({
  content: campaignContentSchema,
  // ISO time to send later; omitted = send now.
  scheduleAt: z.string().datetime({ offset: true }).nullable().optional(),
});

/** Sends a campaign now, or schedules it (sent by the reminders cron). */
export async function POST(req: Request) {
  // Vara points are the owner's — a "view all pages, read-only" staff member
  // can reach the studio but must never spend them.
  const access = await getBusinessAccess();
  if (!access?.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const result = await requireApprovedOwnedBusinessId();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "FORBIDDEN" ? 403 : 409 });
  }
  const { businessId } = result;

  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { content, scheduleAt } = parsed.data;

  if (content.imageId) {
    const img = await prisma.marketingImage.findFirst({ where: { id: content.imageId, businessId }, select: { id: true } });
    if (!img) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }

  const when = scheduleAt ? new Date(scheduleAt) : null;
  if (when && (when.getTime() < Date.now() + 5 * 60 * 1000 || when.getTime() > Date.now() + 90 * 24 * 60 * 60 * 1000)) {
    return NextResponse.json({ error: "INVALID_SCHEDULE" }, { status: 400 });
  }

  // Refuse up front when there's nobody to send to or not enough points — a
  // scheduled campaign is checked again when it goes out.
  const owner = await prisma.user.findUniqueOrThrow({ where: { id: access.business.ownerId }, select: { varaPoints: true } });
  const { recipients, cost } = await campaignCost(businessId, content.segment, content.includeCooldown);
  if (recipients === 0) return NextResponse.json({ error: "NO_RECIPIENTS" }, { status: 409 });
  if (cost > owner.varaPoints) {
    return NextResponse.json({ error: "INSUFFICIENT_VARA_POINTS", required: cost, available: owner.varaPoints }, { status: 402 });
  }

  const campaign = await prisma.emailCampaign.create({
    data: {
      businessId,
      ...campaignColumns(content),
      bodyHtml: esc(content.message).replace(/\n/g, "<br/>"),
      recipientCount: recipients,
      status: when ? "SCHEDULED" : "SENDING",
      scheduledAt: when,
    },
  });
  if (when) return NextResponse.json({ scheduled: true, id: campaign.id, recipients, cost });

  const outcome = await sendCampaign(campaign.id);
  if (!outcome.ok) {
    return NextResponse.json(outcome, { status: outcome.error === "INSUFFICIENT_VARA_POINTS" ? 402 : 409 });
  }
  return NextResponse.json({ sent: outcome.sent, total: outcome.total, id: campaign.id });
}
