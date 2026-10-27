import { NextResponse } from "next/server";
import { requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { campaignColumns, campaignContentSchema } from "@/lib/marketing-campaign";
import { renderCampaign, salonSelect } from "@/lib/marketing-send";

/** The campaign email exactly as a customer would get it, for the studio's
 * live preview — personalised with a sample name, without tracking. */
export async function POST(req: Request) {
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const body = await req.json().catch(() => null);
  // Previewing while typing: fill what's still empty so the layout shows.
  const parsed = campaignContentSchema.safeParse({
    ...body?.content,
    subject: body?.content?.subject || "…",
    message: body?.content?.message || "…",
  });
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const business = await prisma.business.findUniqueOrThrow({
    where: { id: owned.businessId },
    select: { ...salonSelect, defaultLocale: true },
  });
  const sampleName = typeof body?.sampleName === "string" ? body.sampleName : "Anna";
  const mail = renderCampaign(campaignColumns(parsed.data), business, null, business.defaultLocale, sampleName);
  return NextResponse.json({ subject: mail.subject, html: mail.html });
}
