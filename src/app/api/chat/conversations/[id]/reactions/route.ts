import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getConversationAccess } from "@/lib/chat-access";

/** The full reaction state for every message in a conversation, keyed by
 * message id. Polled on the same interval as messages themselves — a
 * cursor-based "what changed since last time" isn't worth the complexity
 * for a thread this size, so the client just replaces its local reaction
 * map wholesale each tick. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access = await getConversationAccess(id);
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const rows = await prisma.messageReaction.findMany({
    where: { message: { conversationId: id } },
    select: { messageId: true, emoji: true, userId: true },
  });

  const byMessage = new Map<string, Map<string, { count: number; mine: boolean }>>();
  for (const r of rows) {
    if (!byMessage.has(r.messageId)) byMessage.set(r.messageId, new Map());
    const emojiMap = byMessage.get(r.messageId)!;
    const entry = emojiMap.get(r.emoji) ?? { count: 0, mine: false };
    entry.count += 1;
    if (r.userId === access.userId) entry.mine = true;
    emojiMap.set(r.emoji, entry);
  }

  const reactions: Record<string, { emoji: string; count: number; mine: boolean }[]> = {};
  for (const [messageId, emojiMap] of byMessage) {
    reactions[messageId] = Array.from(emojiMap.entries()).map(([emoji, v]) => ({ emoji, ...v }));
  }

  return NextResponse.json({ reactions });
}
