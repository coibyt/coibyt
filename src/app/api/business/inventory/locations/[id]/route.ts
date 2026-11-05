import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { inventoryContext } from "@/lib/inventory";

const schema = z.object({ name: z.string().trim().min(1).max(80) });

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await inventoryContext();
  if (!ctx?.canWrite) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const r = await prisma.inventoryLocation.updateMany({ where: { id, businessId: ctx.businessId }, data: { name: parsed.data.name } });
  if (r.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

/** Removes a cupboard; what was in it stays in stock, just without a place. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await inventoryContext();
  if (!ctx?.canWrite) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const r = await prisma.inventoryLocation.deleteMany({ where: { id, businessId: ctx.businessId } });
  if (r.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
