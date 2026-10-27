import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { readTrackingToken } from "@/lib/marketing-email";
import { recordCampaignEvent, salonPage } from "@/lib/marketing-send";

/** A tracked link in a campaign email: counts the click, then forwards to
 * the campaign's own button target or the salon page. The target always
 * comes from the stored campaign, never from the URL, so this can't be used
 * as an open redirect. */
export async function GET(req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  const t = readTrackingToken(token);
  if (!t) return NextResponse.redirect(site);

  const campaign = await prisma.emailCampaign.findUnique({
    where: { id: t.campaignId },
    select: { ctaKind: true, ctaUrl: true, business: { select: { slug: true } } },
  });
  if (!campaign) return NextResponse.redirect(site);
  await recordCampaignEvent(t.campaignId, t.customerId, "CLICK");

  const to = new URL(req.url).searchParams.get("to");
  const target =
    to === "cta" && campaign.ctaKind === "URL" && campaign.ctaUrl ? campaign.ctaUrl : salonPage(campaign.business.slug);
  return NextResponse.redirect(target);
}
