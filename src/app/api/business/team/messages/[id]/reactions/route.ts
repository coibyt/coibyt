import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { memberChat, teamAccess } from "@/lib/team";

const schema = z.object({ emoji: z.string().min(1).max(16) });

/** Adds the emoji to a message, or takes it off again. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const message = await prisma.teamMessage.findUnique({ where: { id }, select: { chatId: true, deletedAt: true, system: true } });
  if (!message || message.deletedAt || message.system || !(await memberChat(message.chatId, t))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const where = { messageId_userId_emoji: { messageId: id, userId: t.userId, emoji: parsed.data.emoji } };
  const existing = await prisma.teamMessageReaction.findUnique({ where });
  if (existing) await prisma.teamMessageReaction.delete({ where });
  else await prisma.teamMessageReaction.create({ data: { messageId: id, userId: t.userId, emoji: parsed.data.emoji } });
  return NextResponse.json({ on: !existing });
}
