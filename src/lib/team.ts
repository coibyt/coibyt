import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBusinessAccess, type BusinessAccess } from "@/lib/current-business";
import { sendPushToUser } from "@/lib/push";
import { teamStrings } from "@/lib/team-strings";

/** The dashboard's team hub ("Tiện ích"): team chat, notices from the owner
 * and the training library. Everyone at a branch takes part — the owner and
 * every active staff member with a login. */

export interface TeamMember {
  userId: string;
  name: string;
  avatarUrl: string | null;
  title: string | null;
  isOwner: boolean;
}

export interface TeamAccess {
  access: BusinessAccess;
  userId: string;
  businessId: string;
  isOwner: boolean;
}

export async function teamAccess(): Promise<TeamAccess | null> {
  const session = await auth();
  if (!session?.user) return null;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.staffId)) return null;
  return { access, userId: session.user.id, businessId: access.business.id, isOwner: access.isOwner };
}

/** The owner first, then staff by name. */
export async function teamMembers(businessId: string): Promise<TeamMember[]> {
  const business = await prisma.business.findUniqueOrThrow({
    where: { id: businessId },
    select: { ownerId: true, owner: { select: { id: true, name: true, image: true } } },
  });
  const staff = await prisma.staff.findMany({
    where: { businessId, active: true, userId: { not: null } },
    select: { name: true, title: true, avatarUrl: true, userId: true, user: { select: { image: true } } },
    orderBy: { name: "asc" },
  });
  const members: TeamMember[] = [
    { userId: business.owner.id, name: business.owner.name, avatarUrl: business.owner.image ?? null, title: null, isOwner: true },
  ];
  for (const s of staff) {
    if (!s.userId || s.userId === business.ownerId) continue;
    members.push({ userId: s.userId, name: s.name, avatarUrl: s.avatarUrl ?? s.user?.image ?? null, title: s.title ?? null, isOwner: false });
  }
  return members;
}

/** The whole-salon chat: created on first use, and its members kept equal
 * to the team (newcomers join, people who left drop out). */
export async function ensureAllChat(businessId: string, members: TeamMember[]) {
  let chat = await prisma.teamChat.findUnique({ where: { businessId_directKey: { businessId, directKey: "ALL" } } });
  if (!chat) {
    chat = await prisma.teamChat
      .create({ data: { businessId, kind: "ALL", directKey: "ALL" } })
      .catch(() => prisma.teamChat.findUniqueOrThrow({ where: { businessId_directKey: { businessId, directKey: "ALL" } } }));
  }
  const ids = members.map((m) => m.userId);
  const owner = members.find((m) => m.isOwner)?.userId;
  await prisma.teamChatMember.createMany({
    data: ids.map((userId) => ({ chatId: chat.id, userId, admin: userId === owner })),
    skipDuplicates: true,
  });
  await prisma.teamChatMember.deleteMany({ where: { chatId: chat.id, userId: { notIn: ids } } });
  return chat;
}

/** The chat if the user is a member of it at this branch. */
export async function memberChat(chatId: string, t: TeamAccess) {
  const membership = await prisma.teamChatMember.findUnique({
    where: { chatId_userId: { chatId, userId: t.userId } },
    include: { chat: true },
  });
  if (!membership || membership.chat.businessId !== t.businessId) return null;
  return membership;
}

/** Who may rename a group and add or remove people: its admins, and the
 * salon owner. */
export function canManageChat(t: TeamAccess, membership: { admin: boolean; chat: { kind: string } }) {
  return membership.chat.kind === "GROUP" && (membership.admin || t.isOwner);
}

export type MediaRef = {
  mediaId: string;
  kind: string;
  name: string;
  size: number;
  mimeType: string;
};

/** Keeps only attachments that were fully uploaded to this branch. */
export async function checkedAttachments(businessId: string, ids: string[]): Promise<MediaRef[]> {
  if (ids.length === 0) return [];
  const media = await prisma.teamMedia.findMany({
    where: { id: { in: ids }, businessId, complete: true },
    select: { id: true, kind: true, name: true, size: true, mimeType: true },
  });
  const byId = new Map(media.map((m) => [m.id, m]));
  return ids.flatMap((id) => {
    const m = byId.get(id);
    return m ? [{ mediaId: m.id, kind: m.kind, name: m.name, size: m.size, mimeType: m.mimeType }] : [];
  });
}

/** Unread chat messages, unread notices, required lessons not yet done and
 * (for staff — the owner has their own Hỗ trợ page) unread replies from the
 * VaraaAi support team — the badge on the "Tiện ích" link. */
export async function teamCounts(userId: string, businessId: string, isOwner: boolean) {
  const [chatRows, announcements, required, support] = await Promise.all([
    prisma.$queryRaw<{ n: bigint }[]>`
      SELECT COUNT(*) AS n FROM TeamMessage m
      JOIN TeamChatMember cm ON cm.chatId = m.chatId AND cm.userId = ${userId}
      JOIN TeamChat c ON c.id = m.chatId
      WHERE c.businessId = ${businessId} AND m.createdAt > cm.lastReadAt
        AND m.senderId <> ${userId} AND m.deletedAt IS NULL AND m.system = false`,
    isOwner
      ? Promise.resolve(0)
      : prisma.staffAnnouncement.count({ where: { businessId, reads: { none: { userId } } } }),
    isOwner
      ? Promise.resolve(0)
      : prisma.staffTraining.count({
          where: { businessId, published: true, required: true, progress: { none: { userId, completedAt: { not: null } } } },
        }),
    isOwner
      ? Promise.resolve(0)
      : prisma.supportMessage.count({ where: { fromAdmin: true, readAt: null, thread: { ownerId: userId } } }),
  ]);
  return { chat: Number(chatRows[0]?.n ?? 0), announcements, training: required, support };
}

/** Best-effort pushes to several people. */
export async function pushToUsers(userIds: string[], payload: Parameters<typeof sendPushToUser>[1]) {
  await Promise.all(
    userIds.map((id) => sendPushToUser(id, payload).catch((err) => console.error("[team] push", id, err)))
  );
}

export function directKey(a: string, b: string) {
  return [a, b].sort().join(":");
}

/** A push to every staff member about a newly published lesson. */
export async function announceLesson(businessId: string, id: string, title: string, required: boolean) {
  const staff = (await teamMembers(businessId)).filter((m) => !m.isOwner).map((m) => m.userId);
  if (staff.length === 0) return;
  const users = await prisma.user.findMany({ where: { id: { in: staff } }, select: { id: true, locale: true } });
  await Promise.all(
    users.map((u) => {
      const S = teamStrings(u.locale || "vi");
      return pushToUsers([u.id], {
        title: `🎓 ${required ? S.pushLessonRequired : S.pushLesson}`,
        body: title,
        url: `/business/dashboard/utilities/training?l=${id}`,
        tag: `team-lesson-${id}`,
      });
    })
  );
}
