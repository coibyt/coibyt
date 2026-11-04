import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { campaignColumns, draftContentSchema } from "@/lib/marketing-campaign";
import { esc } from "@/lib/email/ui";

const schema = z.object({
  // The draft being continued; omitted = a new one.
  id: z.string().min(1).nullable().optional(),
  content: draftContentSchema,
});

/** Saves the campaign being written as a DRAFT, to finish later. */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { id, content } = parsed.data;
  if (content.imageId) {
    const img = await prisma.marketingImage.findFirst({ where: { id: content.imageId, businessId: owned.businessId }, select: { id: true } });
    if (!img) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }
  const data = { ...campaignColumns(content), bodyHtml: esc(content.message).replace(/\n/g, "<br/>") };

  if (id) {
    const r = await prisma.emailCampaign.updateMany({ where: { id, businessId: owned.businessId, status: "DRAFT" }, data });
    if (r.count === 1) return NextResponse.json({ id });
  }
  const draft = await prisma.emailCampaign.create({ data: { ...data, businessId: owned.businessId, status: "DRAFT", recipientCount: 0 } });
  return NextResponse.json({ id: draft.id });
}
