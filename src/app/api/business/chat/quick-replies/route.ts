import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().trim().min(1).max(60),
  text: z.string().trim().min(1).max(2000),
});

async function access() {
  const a = await getBusinessAccess();
  return a && (a.isOwner || a.permissions.customers) ? a : null;
}

/** The salon's saved replies for the inbox. */
export async function GET() {
  const a = await access();
  if (!a) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const replies = await prisma.chatQuickReply.findMany({
    where: { businessId: a.business.id },
    orderBy: { createdAt: "asc" },
    select: { id: true, title: true, text: true },
  });
  return NextResponse.json({ replies });
}

/** Saves a new reply (owner only — staff use the salon's set). */
export async function POST(req: Request) {
  const a = await access();
  if (!a?.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const count = await prisma.chatQuickReply.count({ where: { businessId: a.business.id } });
  if (count >= 30) return NextResponse.json({ error: "TOO_MANY" }, { status: 409 });
  const reply = await prisma.chatQuickReply.create({
    data: { businessId: a.business.id, ...parsed.data },
    select: { id: true, title: true, text: true },
  });
  return NextResponse.json({ reply }, { status: 201 });
}

/** `?id=` removes one. */
export async function DELETE(req: Request) {
  const a = await access();
  if (!a?.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const id = new URL(req.url).searchParams.get("id") ?? "";
  await prisma.chatQuickReply.deleteMany({ where: { id, businessId: a.business.id } });
  return NextResponse.json({ ok: true });
}
