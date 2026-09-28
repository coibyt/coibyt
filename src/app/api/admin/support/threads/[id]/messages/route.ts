import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

const postSchema = z.object({ content: z.string().trim().min(1).max(4000) });

function toDto(m: { id: string; fromAdmin: boolean; content: string; createdAt: Date }) {
  return { id: m.id, fromAdmin: m.fromAdmin, content: m.content, createdAt: m.createdAt.toISOString() };
}

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

  // Opening the thread means the admin has seen the owner's messages.
  await prisma.supportMessage.updateMany({
    where: { threadId: id, fromAdmin: false, readAt: null },
    data: { readAt: new Date() },
  });

  return NextResponse.json({ messages: messages.map(toDto) });
}

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

  const message = await prisma.supportMessage.create({
    data: { threadId: id, fromAdmin: true, content: parsed.data.content },
  });
  await prisma.supportThread.update({ where: { id }, data: { updatedAt: new Date() } });

  return NextResponse.json({ message: toDto(message) });
}
