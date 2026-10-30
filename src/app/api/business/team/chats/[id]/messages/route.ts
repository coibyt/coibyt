import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { memberChat, pushToUsers, teamAccess } from "@/lib/team";
import { teamStrings } from "@/lib/team-strings";

const PAGE = 50;

/** The latest messages of a chat (or older ones, ?before=<iso>), the chat
 * itself, and how far each member has read. ?read=1 marks it read. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const membership = await memberChat(id, t);
  if (!membership) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const url = new URL(req.url);
  const before = url.searchParams.get("before");

  if (url.searchParams.get("read")) {
    await prisma.teamChatMember.update({ where: { id: membership.id }, data: { lastReadAt: new Date() } });
  }

  const rows = await prisma.teamMessage.findMany({
    where: { chatId: id, ...(before && { createdAt: { lt: new Date(before) } }) },
    orderBy: { createdAt: "desc" },
    take: PAGE,
    include: { reactions: { select: { emoji: true, userId: true } } },
  });
  rows.reverse();

  const replyIds = [...new Set(rows.flatMap((m) => (m.replyToId ? [m.replyToId] : [])))];
  const replies = new Map(
    (
      await prisma.teamMessage.findMany({
        where: { id: { in: replyIds }, chatId: id },
        select: { id: true, senderId: true, body: true, mediaId: true, deletedAt: true },
      })
    ).map((r) => [r.id, r])
  );
  const mediaIds = [
    ...new Set([...rows.flatMap((m) => (m.mediaId ? [m.mediaId] : [])), ...[...replies.values()].flatMap((r) => (r.mediaId ? [r.mediaId] : []))]),
  ];
  const media = new Map(
    (
      await prisma.teamMedia.findMany({
        where: { id: { in: mediaIds }, businessId: t.businessId },
        select: { id: true, kind: true, mimeType: true, name: true, size: true, width: true, height: true },
      })
    ).map((m) => [m.id, m])
  );

  const members = await prisma.teamChatMember.findMany({
    where: { chatId: id },
    select: { userId: true, admin: true, lastReadAt: true },
  });

  return NextResponse.json({
    chat: {
      id,
      kind: membership.chat.kind,
      name: membership.chat.name,
      color: membership.chat.color,
      muted: membership.muted,
      memberIds: members.map((m) => m.userId),
      adminIds: members.filter((m) => m.admin).map((m) => m.userId),
    },
    reads: members.map((m) => ({ userId: m.userId, at: m.lastReadAt.toISOString() })),
    hasMore: rows.length === PAGE,
    messages: rows.map((m) => {
      const reply = m.replyToId ? replies.get(m.replyToId) : null;
      const reactions = new Map<string, string[]>();
      for (const r of m.reactions) reactions.set(r.emoji, [...(reactions.get(r.emoji) ?? []), r.userId]);
      return {
        id: m.id,
        senderId: m.senderId,
        body: m.deletedAt ? null : m.body,
        system: m.system,
        deleted: !!m.deletedAt,
        edited: !!m.editedAt,
        createdAt: m.createdAt.toISOString(),
        media: m.mediaId && !m.deletedAt ? (media.get(m.mediaId) ?? null) : null,
        replyTo: reply
          ? {
              id: reply.id,
              senderId: reply.senderId,
              body: reply.deletedAt ? null : reply.body,
              mediaKind: reply.mediaId && !reply.deletedAt ? (media.get(reply.mediaId)?.kind ?? null) : null,
              deleted: !!reply.deletedAt,
            }
          : null,
        reactions: [...reactions.entries()].map(([emoji, userIds]) => ({ emoji, userIds })),
      };
    }),
  });
}

const schema = z
  .object({
    body: z.string().trim().max(4000).optional(),
    mediaId: z.string().optional(),
    replyToId: z.string().optional(),
  })
  .refine((d) => !!d.body || !!d.mediaId);

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const membership = await memberChat(id, t);
  if (!membership) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { body, mediaId, replyToId } = parsed.data;

  let mediaKind: string | null = null;
  if (mediaId) {
    const m = await prisma.teamMedia.findUnique({ where: { id: mediaId }, select: { businessId: true, uploaderId: true, complete: true, kind: true } });
    if (!m || m.businessId !== t.businessId || m.uploaderId !== t.userId || !m.complete) {
      return NextResponse.json({ error: "INVALID_MEDIA" }, { status: 400 });
    }
    mediaKind = m.kind;
  }
  const reply = replyToId ? await prisma.teamMessage.findFirst({ where: { id: replyToId, chatId: id }, select: { id: true } }) : null;

  const now = new Date();
  const message = await prisma.teamMessage.create({
    data: { chatId: id, senderId: t.userId, body: body || null, mediaId: mediaId ?? null, replyToId: reply?.id ?? null, createdAt: now },
  });
  await prisma.teamChat.update({ where: { id }, data: { lastMessageAt: now } });
  await prisma.teamChatMember.update({ where: { id: membership.id }, data: { lastReadAt: now } });

  // A push to everyone else who hasn't muted the chat.
  const recipients = await prisma.teamChatMember.findMany({
    where: { chatId: id, userId: { not: t.userId }, muted: false },
    select: { user: { select: { id: true, locale: true } } },
  });
  if (recipients.length) {
    const sender = await prisma.user.findUnique({ where: { id: t.userId }, select: { name: true } });
    const senderName = sender?.name ?? "";
    const byLocale = new Map<string, string[]>();
    for (const r of recipients) {
      const loc = r.user.locale || "vi";
      byLocale.set(loc, [...(byLocale.get(loc) ?? []), r.user.id]);
    }
    await Promise.all(
      [...byLocale.entries()].map(([loc, ids]) => {
        const S = teamStrings(loc);
        const text = body || (mediaKind === "IMAGE" ? S.photo : mediaKind === "VIDEO" ? S.video : S.file);
        const chatName = membership.chat.kind === "ALL" ? S.allChat : membership.chat.kind === "GROUP" ? (membership.chat.name ?? "") : senderName;
        return pushToUsers(ids, {
          title: chatName,
          body: membership.chat.kind === "DIRECT" ? text : `${senderName}: ${text}`,
          url: `/business/dashboard/utilities/chat?c=${id}`,
          tag: `team-chat-${id}`,
        });
      })
    );
  }
  return NextResponse.json({ id: message.id, createdAt: now.toISOString() });
}
