import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teamAccess } from "@/lib/team";

/** Opening a lesson marks it seen; { completed: true | false } marks it
 * done or not done. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const lesson = await prisma.staffTraining.findUnique({ where: { id }, select: { businessId: true } });
  if (!lesson || lesson.businessId !== t.businessId) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as { completed?: boolean };
  const completedAt = body.completed === undefined ? undefined : body.completed ? new Date() : null;
  const p = await prisma.staffTrainingProgress.upsert({
    where: { trainingId_userId: { trainingId: id, userId: t.userId } },
    update: { viewedAt: new Date(), ...(completedAt !== undefined && { completedAt }) },
    create: { trainingId: id, userId: t.userId, completedAt: completedAt ?? null },
  });
  return NextResponse.json({ viewedAt: p.viewedAt.toISOString(), completedAt: p.completedAt?.toISOString() ?? null });
}
