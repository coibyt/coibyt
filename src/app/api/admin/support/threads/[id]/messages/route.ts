import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { supportMessageDto } from "@/lib/support";
import { notifyVisitorOfReply } from "@/lib/support-notify";

const postSchema = z.object({ content: z.string().trim().min(1).max(4000) });

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;

  const after = new URL(req.url).searchParams.get("after");
  const messages = await prisma.supportMessage.findMany({
    where: { threadId: id, ...(after ? { id: { gt: after } } : {}) },
    orderBy: { createdAt: "asc" },
    ...(after ? {} : { take: 200 }),
  });

  // Opening the thread means the admin has seen the visitor's messages.
  await prisma.supportMessage.updateMany({
    where: { threadId: id, fromAdmin: false, readAt: null },
    data: { readAt: new Date() },
  });

  return NextResponse.json({ messages: messages.map(supportMessageDto) });
}

/** An admin's own reply. A person stepping in pauses the AI in this thread
 * (they can turn it back on), and the visitor is emailed unless an earlier
 * reply is still unread. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;

  const parsed = postSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const thread = await prisma.supportThread.findUnique({ where: { id }, select: { id: true } });
  if (!thread) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const unreadReplies = await prisma.supportMessage.count({
    where: { threadId: id, fromAdmin: true, fromAi: false, readAt: null },
  });
  const message = await prisma.supportMessage.create({
    data: { threadId: id, fromAdmin: true, content: parsed.data.content },
  });
  await prisma.supportThread.update({ where: { id }, data: { updatedAt: new Date(), aiPaused: true } });

  if (unreadReplies === 0) {
    await notifyVisitorOfReply(id, parsed.data.content).catch((err) => console.error("[support reply email]", err));
  }

  return NextResponse.json({ message: supportMessageDto(message) });
}
