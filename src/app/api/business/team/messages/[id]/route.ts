import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { memberChat, teamAccess } from "@/lib/team";

async function load(id: string) {
  const t = await teamAccess();
  if (!t) return null;
  const message = await prisma.teamMessage.findUnique({ where: { id } });
  if (!message || message.system) return null;
  const membership = await memberChat(message.chatId, t);
  if (!membership) return null;
  return { t, message, membership };
}

const schema = z.object({ body: z.string().trim().min(1).max(4000) });

/** Edit the text of one's own message. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await load(id);
  if (!found || found.message.senderId !== found.t.userId || found.message.deletedAt) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  await prisma.teamMessage.update({ where: { id }, data: { body: parsed.data.body, editedAt: new Date() } });
  return NextResponse.json({ ok: true });
}

/** Take back one's own message — or, for the salon owner, anyone's. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await load(id);
  if (!found || (found.message.senderId !== found.t.userId && !found.t.isOwner)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  await prisma.teamMessage.update({ where: { id }, data: { deletedAt: new Date(), body: null } });
  await prisma.teamMessageReaction.deleteMany({ where: { messageId: id } });
  return NextResponse.json({ ok: true });
}
