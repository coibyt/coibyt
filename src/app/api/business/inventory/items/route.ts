import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { InventoryError, inventoryContext, moveStock, newInventoryCode } from "@/lib/inventory";
import { decodePhoto, itemFieldsSchema } from "@/lib/inventory-input";

const schema = itemFieldsSchema.extend({
  // Scanned in straight away, optionally into a cupboard.
  qtyIn: z.number().int().min(0).max(100000).optional().default(0),
  locationId: z.string().min(1).nullable().optional(),
});

/** Adds an item to the owner's catalog (and, with qtyIn, to this branch). */
export async function POST(req: Request) {
  const ctx = await inventoryContext();
  if (!ctx?.canWrite) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const d = parsed.data;
  const photo = decodePhoto(d.photo);

  if (d.barcode && (await prisma.inventoryItem.findFirst({ where: { ownerId: ctx.ownerId, barcode: d.barcode, active: true }, select: { id: true } }))) {
    return NextResponse.json({ error: "BARCODE_TAKEN" }, { status: 409 });
  }
  // A removed item's barcode is freed for a new one.
  if (d.barcode) await prisma.inventoryItem.updateMany({ where: { ownerId: ctx.ownerId, barcode: d.barcode, active: false }, data: { barcode: null } });

  const item = await prisma.inventoryItem.create({
    data: {
      ownerId: ctx.ownerId,
      code: await newInventoryCode("item"),
      name: d.name,
      brand: d.brand || null,
      category: d.category,
      unit: d.unit,
      barcode: d.barcode || null,
      minQty: d.minQty,
      note: d.note || null,
      ...(photo ? { photo: photo.bytes, photoMime: photo.mime } : {}),
    },
    select: { id: true },
  });

  try {
    if (d.qtyIn > 0 || d.locationId) {
      await moveStock(ctx, { itemId: item.id, kind: "IN", qty: d.qtyIn, locationId: d.locationId ?? undefined });
    }
  } catch (err) {
    if (!(err instanceof InventoryError)) throw err;
  }
  return NextResponse.json({ id: item.id });
}
