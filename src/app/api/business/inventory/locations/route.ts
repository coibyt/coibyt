import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { inventoryContext, newInventoryCode } from "@/lib/inventory";

const schema = z.object({ name: z.string().trim().min(1).max(80) });

/** Adds a cupboard or shelf at the active branch. */
export async function POST(req: Request) {
  const ctx = await inventoryContext();
  if (!ctx?.canWrite) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const count = await prisma.inventoryLocation.count({ where: { businessId: ctx.businessId } });
  const loc = await prisma.inventoryLocation.create({
    data: { businessId: ctx.businessId, name: parsed.data.name, code: await newInventoryCode("location"), sortOrder: count },
    select: { id: true, code: true, name: true },
  });
  return NextResponse.json({ location: { ...loc, count: 0 } });
}
