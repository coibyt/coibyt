import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getConversationAccess } from "@/lib/chat-access";

const MAX_EMOJI_LENGTH = 8; // generous enough for any single emoji, incl. skin-tone modifiers

/** Toggles the signed-in viewer's reaction on a message: picking a new
 * emoji replaces their previous one, picking the same emoji again removes
 * it. The "like" button in the UI is just this same endpoint called with
 * emoji = "👍". */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: messageId } = await params;
  const body = await req.json().catch(() => ({}));
  const emoji = typeof body.emoji === "string" ? body.emoji.trim() : "";
  if (!emoji || emoji.length > MAX_EMOJI_LENGTH) {
    return NextResponse.json({ error: "INVALID_EMOJI" }, { status: 400 });
  }

  const message = await prisma.message.findUnique({
    where: { id: messageId },
    select: { conversationId: true },
  });
  if (!message) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const access = await getConversationAccess(message.conversationId);
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const existing = await prisma.messageReaction.findUnique({
    where: { messageId_userId: { messageId, userId: access.userId } },
  });

  if (existing && existing.emoji === emoji) {
    await prisma.messageReaction.delete({ where: { id: existing.id } });
  } else if (existing) {
    await prisma.messageReaction.update({ where: { id: existing.id }, data: { emoji } });
  } else {
    await prisma.messageReaction.create({ data: { messageId, userId: access.userId, emoji } });
  }

  const grouped = await prisma.messageReaction.groupBy({
    by: ["emoji"],
    where: { messageId },
    _count: { emoji: true },
  });
  const mine = existing?.emoji === emoji ? null : emoji;

  return NextResponse.json({
    reactions: grouped.map((g) => ({ emoji: g.emoji, count: g._count.emoji, mine: g.emoji === mine })),
  });
}
