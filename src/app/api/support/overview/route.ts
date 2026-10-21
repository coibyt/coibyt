import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSupportMember, supportAiEnabled } from "@/lib/support";

/** Everything the dashboard's floating help widget shows a salon owner: their
 * name, unread replies and announcements, the training guides and the latest
 * announcements. Polled for the unread dot, so kept to a few small queries. */
export async function GET() {
  const ownerId = await requireSupportMember();
  if (!ownerId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const user = await prisma.user.findUnique({
    where: { id: ownerId },
    select: { name: true, announcementsSeenAt: true },
  });
  const seenAt = user?.announcementsSeenAt ?? null;

  const [unreadReplies, announcements, trainings, aiOn, thread] = await Promise.all([
    prisma.supportMessage.count({ where: { fromAdmin: true, readAt: null, thread: { ownerId } } }),
    prisma.announcement.findMany({ orderBy: { createdAt: "desc" }, take: 20, select: { id: true, title: true, body: true, createdAt: true } }),
    prisma.trainingResource.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      take: 50,
      select: { id: true, title: true, description: true, url: true },
    }),
    supportAiEnabled(),
    prisma.supportThread.findUnique({ where: { ownerId }, select: { aiPaused: true } }),
  ]);

  return NextResponse.json({
    name: user?.name ?? "",
    unreadReplies,
    unreadAnnouncements: announcements.filter((a) => !seenAt || a.createdAt > seenAt).length,
    aiActive: aiOn && !thread?.aiPaused,
    trainings,
    announcements: announcements.map((a) => ({ ...a, createdAt: a.createdAt.toISOString(), unread: !seenAt || a.createdAt > seenAt })),
  });
}
