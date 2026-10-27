import { NextResponse } from "next/server";
import { requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendDueCampaigns } from "@/lib/marketing-send";

/** Campaign history with stats, and everything needed to view or reuse one. */
export async function GET() {
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  // Fallback for hosts where the reminders cron isn't set up yet.
  await sendDueCampaigns(owned.businessId).catch(() => 0);

  const campaigns = await prisma.emailCampaign.findMany({
    where: { businessId: owned.businessId },
    orderBy: { createdAt: "desc" },
    take: 50,
    select: {
      id: true,
      subject: true,
      preheader: true,
      headline: true,
      message: true,
      bodyHtml: true,
      imageId: true,
      ctaKind: true,
      ctaLabel: true,
      ctaUrl: true,
      offerTitle: true,
      offerCode: true,
      offerExpires: true,
      segment: true,
      includeCooldown: true,
      status: true,
      scheduledAt: true,
      sentAt: true,
      createdAt: true,
      recipientCount: true,
      openCount: true,
      clickCount: true,
    },
  });

  return NextResponse.json({
    campaigns: campaigns.map(({ bodyHtml, ...c }) => ({
      ...c,
      // Campaigns from before the studio only stored the HTML body.
      message: c.message ?? bodyHtml.replace(/<br\s*\/?>/g, "\n").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#39;/g, "'"),
      offerExpires: c.offerExpires?.toISOString().slice(0, 10) ?? null,
    })),
  });
}
