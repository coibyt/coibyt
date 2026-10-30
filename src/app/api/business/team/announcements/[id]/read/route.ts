import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { teamAccess } from "@/lib/team";

/** A staff member has seen a notice — and with { ack: true }, confirmed
 * they have understood it. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const a = await prisma.staffAnnouncement.findUnique({ where: { id }, select: { businessId: true } });
  if (!a || a.businessId !== t.businessId) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const body = (await req.json().catch(() => ({}))) as { ack?: boolean };
  const now = new Date();
  const read = await prisma.staffAnnouncementRead.upsert({
    where: { announcementId_userId: { announcementId: id, userId: t.userId } },
    update: body.ack ? { ackAt: now } : {},
    create: { announcementId: id, userId: t.userId, readAt: now, ackAt: body.ack ? now : null },
  });
  return NextResponse.json({ readAt: read.readAt.toISOString(), ackAt: read.ackAt?.toISOString() ?? null });
}
