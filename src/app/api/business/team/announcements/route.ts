import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { checkedAttachments, pushToUsers, teamAccess, teamMembers } from "@/lib/team";
import { teamStrings } from "@/lib/team-strings";
import { announcementSchema } from "@/lib/team-schemas";

/** Notices at this branch, pinned first. Staff get their own read state;
 * the owner gets everyone's. */
export async function GET() {
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const members = await teamMembers(t.businessId);
  const rows = await prisma.staffAnnouncement.findMany({
    where: { businessId: t.businessId },
    orderBy: [{ pinned: "desc" }, { createdAt: "desc" }],
    take: 100,
    include: { reads: { select: { userId: true, readAt: true, ackAt: true } } },
  });
  return NextResponse.json({
    me: t.userId,
    isOwner: t.isOwner,
    members,
    announcements: rows.map((a) => {
      const mine = a.reads.find((r) => r.userId === t.userId);
      return {
        id: a.id,
        authorId: a.authorId,
        title: a.title,
        body: a.body,
        priority: a.priority,
        pinned: a.pinned,
        requireAck: a.requireAck,
        attachments: a.attachments ?? [],
        createdAt: a.createdAt.toISOString(),
        updatedAt: a.updatedAt.toISOString(),
        myRead: mine ? { readAt: mine.readAt.toISOString(), ackAt: mine.ackAt?.toISOString() ?? null } : null,
        reads: t.isOwner
          ? a.reads.map((r) => ({ userId: r.userId, readAt: r.readAt.toISOString(), ackAt: r.ackAt?.toISOString() ?? null }))
          : undefined,
      };
    }),
  });
}

/** The owner posts a notice; every staff member gets a push. */
export async function POST(req: Request) {
  const t = await teamAccess();
  if (!t || !t.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = announcementSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { attachmentIds, ...data } = parsed.data;
  const attachments = await checkedAttachments(t.businessId, attachmentIds);
  const a = await prisma.staffAnnouncement.create({
    data: { ...data, businessId: t.businessId, authorId: t.userId, attachments },
  });

  const staff = (await teamMembers(t.businessId)).filter((m) => !m.isOwner).map((m) => m.userId);
  if (staff.length) {
    const users = await prisma.user.findMany({ where: { id: { in: staff } }, select: { id: true, locale: true } });
    await Promise.all(
      users.map((u) => {
        const S = teamStrings(u.locale || "vi");
        return pushToUsers([u.id], {
          title: `${data.priority === "URGENT" ? "🔴 " : data.priority === "IMPORTANT" ? "⭐ " : "📣 "}${S.pushNotice}`,
          body: data.title,
          url: `/business/dashboard/utilities/announcements?a=${a.id}`,
          tag: `team-notice-${a.id}`,
          urgent: data.priority === "URGENT",
        });
      })
    );
  }
  return NextResponse.json({ id: a.id });
}
