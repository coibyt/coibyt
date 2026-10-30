import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkedAttachments, teamAccess } from "@/lib/team";
import { announcementSchema } from "@/lib/team-schemas";

async function owned(id: string) {
  const t = await teamAccess();
  if (!t || !t.isOwner) return null;
  const a = await prisma.staffAnnouncement.findUnique({ where: { id }, select: { businessId: true } });
  return a && a.businessId === t.businessId ? t : null;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await owned(id);
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = announcementSchema.partial().safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { attachmentIds, ...data } = parsed.data;
  await prisma.staffAnnouncement.update({
    where: { id },
    data: { ...data, ...(attachmentIds && { attachments: await checkedAttachments(t.businessId, attachmentIds) }) },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await owned(id))) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  await prisma.staffAnnouncement.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
