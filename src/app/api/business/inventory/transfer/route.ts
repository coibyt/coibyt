import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { InventoryError, inventoryContext, transferStock } from "@/lib/inventory";

const schema = z.object({ itemId: z.string().min(1), toBusinessId: z.string().min(1), qty: z.number().int().min(1).max(100000) });

/** Owner: moves some of an item from the active branch to another one. */
export async function POST(req: Request) {
  const ctx = await inventoryContext();
  if (!ctx?.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  try {
    return NextResponse.json(await transferStock(ctx, parsed.data));
  } catch (err) {
    if (!(err instanceof InventoryError)) throw err;
    if (err.message === "NOT_ENOUGH") {
      const s = await prisma.inventoryStock.findUnique({
        where: { itemId_businessId: { itemId: parsed.data.itemId, businessId: ctx.businessId } },
        select: { qty: true },
      });
      return NextResponse.json({ error: "NOT_ENOUGH", qty: s?.qty ?? 0 }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: err.message === "NOT_FOUND" ? 404 : 400 });
  }
}
