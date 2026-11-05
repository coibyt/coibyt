import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { InventoryError, inventoryContext, moveStock } from "@/lib/inventory";

const schema = z.object({
  itemId: z.string().min(1),
  kind: z.enum(["IN", "OUT", "COUNT"]),
  qty: z.number().int().min(0).max(100000),
  // Scanning in into a cupboard.
  locationId: z.string().min(1).nullable().optional(),
  note: z.string().trim().max(200).optional(),
});

/** Scans an item in or out at the active branch, or corrects its count. */
export async function POST(req: Request) {
  const ctx = await inventoryContext();
  if (!ctx?.canWrite) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const d = parsed.data;
  if (d.kind !== "COUNT" && d.qty === 0) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  try {
    const qty = await moveStock(ctx, d);
    return NextResponse.json({ qty });
  } catch (err) {
    if (!(err instanceof InventoryError)) throw err;
    if (err.message === "NOT_ENOUGH") {
      const s = await prisma.inventoryStock.findUnique({ where: { itemId_businessId: { itemId: d.itemId, businessId: ctx.businessId } }, select: { qty: true } });
      return NextResponse.json({ error: "NOT_ENOUGH", qty: s?.qty ?? 0 }, { status: 409 });
    }
    return NextResponse.json({ error: err.message }, { status: err.message === "NOT_FOUND" ? 404 : 400 });
  }
}
