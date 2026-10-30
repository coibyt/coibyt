import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { directKey, ensureAllChat, teamAccess, teamMembers } from "@/lib/team";

/** My chats at this branch, newest activity first, with unread counts and
 * the last message — plus everyone on the team (for names and avatars). */
export async function GET() {
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const members = await teamMembers(t.businessId);
  await ensureAllChat(t.businessId, members);

  const memberships = await prisma.teamChatMember.findMany({
    where: { userId: t.userId, chat: { businessId: t.businessId } },
    include: { chat: { include: { members: { select: { userId: true, admin: true } } } } },
  });
  const unreadRows = await prisma.$queryRaw<{ chatId: string; n: bigint }[]>`
    SELECT m.chatId, COUNT(*) AS n FROM TeamMessage m
    JOIN TeamChatMember cm ON cm.chatId = m.chatId AND cm.userId = ${t.userId}
    JOIN TeamChat c ON c.id = m.chatId
    WHERE c.businessId = ${t.businessId} AND m.createdAt > cm.lastReadAt
      AND m.senderId <> ${t.userId} AND m.deletedAt IS NULL AND m.system = false
    GROUP BY m.chatId`;
  const unread = new Map(unreadRows.map((r) => [r.chatId, Number(r.n)]));

  // Each chat's newest message, in one query.
  const chatIds = memberships.map((m) => m.chatId);
  const lastRows = chatIds.length
    ? await prisma.$queryRaw<
        { chatId: string; senderId: string; body: string | null; mediaId: string | null; system: number | boolean; deletedAt: Date | null; createdAt: Date }[]
      >`
        SELECT m.chatId, m.senderId, m.body, m.mediaId, m.system, m.deletedAt, m.createdAt FROM TeamMessage m
        JOIN (SELECT chatId, MAX(createdAt) AS mx FROM TeamMessage WHERE chatId IN (${Prisma.join(chatIds)}) GROUP BY chatId) t
          ON t.chatId = m.chatId AND t.mx = m.createdAt`
    : [];
  const lastByChat = new Map(lastRows.map((r) => [r.chatId, { ...r, system: !!r.system }]));
  const lastMessages = memberships.map((m) => lastByChat.get(m.chatId) ?? null);
  const mediaIds = lastMessages.flatMap((m) => (m?.mediaId ? [m.mediaId] : []));
  const mediaKinds = new Map(
    (await prisma.teamMedia.findMany({ where: { id: { in: mediaIds } }, select: { id: true, kind: true } })).map((m) => [m.id, m.kind])
  );

  // People in my chats who have since left the team keep their names.
  const known = new Set(members.map((m) => m.userId));
  const missing = [...new Set(memberships.flatMap((m) => m.chat.members.map((x) => x.userId)))].filter((id) => !known.has(id));
  const former = missing.length
    ? await prisma.user.findMany({ where: { id: { in: missing } }, select: { id: true, name: true, image: true } })
    : [];

  const chats = memberships
    .map((m, i) => {
      const last = lastMessages[i];
      return {
        id: m.chatId,
        kind: m.chat.kind,
        name: m.chat.name,
        color: m.chat.color,
        memberIds: m.chat.members.map((x) => x.userId),
        adminIds: m.chat.members.filter((x) => x.admin).map((x) => x.userId),
        muted: m.muted,
        unread: unread.get(m.chatId) ?? 0,
        lastMessageAt: (last?.createdAt ?? m.chat.createdAt).toISOString(),
        lastMessage: last
          ? {
              senderId: last.senderId,
              body: last.deletedAt ? null : last.body,
              mediaKind: last.mediaId && !last.deletedAt ? (mediaKinds.get(last.mediaId) ?? null) : null,
              system: last.system,
              deleted: !!last.deletedAt,
            }
          : null,
      };
    })
    // A direct chat nobody has written in yet stays out of the list.
    .filter((c) => c.kind !== "DIRECT" || c.lastMessage)
    .sort((a, b) => (a.kind === "ALL" ? -1 : b.kind === "ALL" ? 1 : b.lastMessageAt.localeCompare(a.lastMessageAt)));

  return NextResponse.json({
    me: t.userId,
    isOwner: t.isOwner,
    members,
    former: former.map((u) => ({ userId: u.id, name: u.name, avatarUrl: u.image ?? null, title: null, isOwner: false, left: true })),
    chats,
  });
}

const schema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("DIRECT"), userId: z.string().min(1) }),
  z.object({
    kind: z.literal("GROUP"),
    name: z.string().trim().min(1).max(80),
    color: z.string().max(20).optional(),
    memberIds: z.array(z.string()).max(200),
  }),
]);

/** Opens (or finds) a direct chat with a teammate, or starts a group. */
export async function POST(req: Request) {
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const team = new Set((await teamMembers(t.businessId)).map((m) => m.userId));

  if (parsed.data.kind === "DIRECT") {
    const other = parsed.data.userId;
    if (other === t.userId || !team.has(other)) return NextResponse.json({ error: "INVALID" }, { status: 400 });
    const key = directKey(t.userId, other);
    const existing = await prisma.teamChat.findUnique({ where: { businessId_directKey: { businessId: t.businessId, directKey: key } } });
    if (existing) return NextResponse.json({ id: existing.id });
    const chat = await prisma.teamChat
      .create({
        data: {
          businessId: t.businessId,
          kind: "DIRECT",
          directKey: key,
          createdById: t.userId,
          members: { create: [{ userId: t.userId }, { userId: other }] },
        },
      })
      .catch(() => prisma.teamChat.findUniqueOrThrow({ where: { businessId_directKey: { businessId: t.businessId, directKey: key } } }));
    return NextResponse.json({ id: chat.id });
  }

  const { name, color, memberIds } = parsed.data;
  const ids = [...new Set(memberIds.filter((id) => id !== t.userId && team.has(id)))];
  if (ids.length === 0) return NextResponse.json({ error: "NO_MEMBERS" }, { status: 400 });
  const chat = await prisma.teamChat.create({
    data: {
      businessId: t.businessId,
      kind: "GROUP",
      name,
      color: color ?? null,
      createdById: t.userId,
      members: { create: [{ userId: t.userId, admin: true }, ...ids.map((userId) => ({ userId }))] },
      messages: { create: { senderId: t.userId, system: true, body: JSON.stringify({ type: "created", name }) } },
    },
  });
  return NextResponse.json({ id: chat.id });
}
