import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { canManageChat, memberChat, teamAccess, teamMembers } from "@/lib/team";

const schema = z.object({
  name: z.string().trim().min(1).max(80).optional(),
  color: z.string().max(20).optional(),
  addIds: z.array(z.string()).max(200).optional(),
  removeIds: z.array(z.string()).max(200).optional(),
  admin: z.object({ userId: z.string(), on: z.boolean() }).optional(),
  muted: z.boolean().optional(),
});

/** Mute a chat (anyone, for themselves); rename it, recolor it, add or
 * remove people and make admins (a group's admins and the salon owner). */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const membership = await memberChat(id, t);
  if (!membership) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { name, color, addIds, removeIds, admin, muted } = parsed.data;

  if (muted !== undefined) {
    await prisma.teamChatMember.update({ where: { id: membership.id }, data: { muted } });
  }
  const managing = name !== undefined || color !== undefined || addIds?.length || removeIds?.length || admin;
  if (!managing) return NextResponse.json({ ok: true });
  if (!canManageChat(t, membership)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const events: object[] = [];
  if (name !== undefined && name !== membership.chat.name) events.push({ type: "renamed", name });
  await prisma.teamChat.update({ where: { id }, data: { ...(name !== undefined && { name }), ...(color !== undefined && { color }) } });

  if (addIds?.length) {
    const team = new Set((await teamMembers(t.businessId)).map((m) => m.userId));
    const current = new Set((await prisma.teamChatMember.findMany({ where: { chatId: id }, select: { userId: true } })).map((m) => m.userId));
    const add = [...new Set(addIds)].filter((u) => team.has(u) && !current.has(u));
    if (add.length) {
      await prisma.teamChatMember.createMany({ data: add.map((userId) => ({ chatId: id, userId })), skipDuplicates: true });
      events.push({ type: "added", ids: add });
    }
  }
  if (removeIds?.length) {
    const remove = removeIds.filter((u) => u !== t.userId);
    const res = await prisma.teamChatMember.deleteMany({ where: { chatId: id, userId: { in: remove } } });
    if (res.count) events.push({ type: "removed", ids: remove });
  }
  if (admin && admin.userId !== t.userId) {
    await prisma.teamChatMember.updateMany({ where: { chatId: id, userId: admin.userId }, data: { admin: admin.on } });
  }
  if (events.length) {
    await prisma.teamMessage.createMany({
      data: events.map((e) => ({ chatId: id, senderId: t.userId, system: true, body: JSON.stringify(e) })),
    });
    await prisma.teamChat.update({ where: { id }, data: { lastMessageAt: new Date() } });
  }
  return NextResponse.json({ ok: true });
}

/** Leave a group (?mode=leave), or delete it for everyone (?mode=delete —
 * its admins and the salon owner). The whole-salon chat stays. */
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = await teamAccess();
  if (!t) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const membership = await memberChat(id, t);
  if (!membership || membership.chat.kind !== "GROUP") return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const mode = new URL(req.url).searchParams.get("mode");

  if (mode === "delete") {
    if (!canManageChat(t, membership)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
    await prisma.teamChat.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  }

  await prisma.teamChatMember.delete({ where: { id: membership.id } });
  const left = await prisma.teamChatMember.findMany({ where: { chatId: id }, select: { id: true, admin: true } });
  if (left.length === 0) {
    await prisma.teamChat.delete({ where: { id } });
  } else {
    // Someone always stays in charge.
    if (!left.some((m) => m.admin)) await prisma.teamChatMember.update({ where: { id: left[0].id }, data: { admin: true } });
    await prisma.teamMessage.create({ data: { chatId: id, senderId: t.userId, system: true, body: JSON.stringify({ type: "left" }) } });
  }
  return NextResponse.json({ ok: true });
}
