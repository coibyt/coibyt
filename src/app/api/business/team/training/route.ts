import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { announceLesson, checkedAttachments, teamAccess, teamMembers } from "@/lib/team";
import { trainingSchema } from "@/lib/team-schemas";

/** The branch's training library. Staff see published lessons and their own
 * progress; the owner also sees drafts and everyone's progress. */
export async function GET() {
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const members = await teamMembers(t.businessId);
  const rows = await prisma.staffTraining.findMany({
    where: { businessId: t.businessId, ...(!t.isOwner && { published: true }) },
    orderBy: [{ required: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
    include: { progress: { select: { userId: true, viewedAt: true, completedAt: true } } },
  });
  return NextResponse.json({
    me: t.userId,
    isOwner: t.isOwner,
    members,
    lessons: rows.map((l) => {
      const mine = l.progress.find((p) => p.userId === t.userId);
      return {
        id: l.id,
        title: l.title,
        summary: l.summary,
        body: l.body,
        category: l.category,
        videoUrl: l.videoUrl,
        coverMediaId: l.coverMediaId,
        attachments: l.attachments ?? [],
        required: l.required,
        minutes: l.minutes,
        published: l.published,
        createdAt: l.createdAt.toISOString(),
        updatedAt: l.updatedAt.toISOString(),
        myProgress: mine ? { viewedAt: mine.viewedAt.toISOString(), completedAt: mine.completedAt?.toISOString() ?? null } : null,
        progress: t.isOwner
          ? l.progress.map((p) => ({ userId: p.userId, viewedAt: p.viewedAt.toISOString(), completedAt: p.completedAt?.toISOString() ?? null }))
          : undefined,
      };
    }),
  });
}

export async function POST(req: Request) {
  const t = await teamAccess();
  if (!t || !t.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = trainingSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { attachmentIds, coverMediaId, ...data } = parsed.data;
  const attachments = await checkedAttachments(t.businessId, attachmentIds);
  const cover = coverMediaId ? (await checkedAttachments(t.businessId, [coverMediaId]))[0] : undefined;
  const lesson = await prisma.staffTraining.create({
    data: { ...data, businessId: t.businessId, authorId: t.userId, attachments, coverMediaId: cover?.mediaId ?? null },
  });
  if (lesson.published) await announceLesson(t.businessId, lesson.id, lesson.title, lesson.required);
  return NextResponse.json({ id: lesson.id });
}
