import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { announceLesson, checkedAttachments, teamAccess } from "@/lib/team";
import { trainingSchema } from "@/lib/team-schemas";

async function owned(id: string) {
  const t = await teamAccess();
  if (!t || !t.isOwner) return null;
  const lesson = await prisma.staffTraining.findUnique({ where: { id }, select: { businessId: true, published: true } });
  return lesson && lesson.businessId === t.businessId ? { t, lesson } : null;
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await owned(id);
  if (!found) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = trainingSchema.partial().safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { attachmentIds, coverMediaId, ...data } = parsed.data;
  const businessId = found.t.businessId;
  const lesson = await prisma.staffTraining.update({
    where: { id },
    data: {
      ...data,
      ...(attachmentIds && { attachments: await checkedAttachments(businessId, attachmentIds) }),
      ...(coverMediaId !== undefined && {
        coverMediaId: coverMediaId ? ((await checkedAttachments(businessId, [coverMediaId]))[0]?.mediaId ?? null) : null,
      }),
    },
  });
  // A draft going live is news for the team.
  if (!found.lesson.published && lesson.published) await announceLesson(businessId, id, lesson.title, lesson.required);
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await owned(id))) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  await prisma.staffTraining.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
