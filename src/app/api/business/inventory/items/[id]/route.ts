import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { inventoryContext } from "@/lib/inventory";
import { decodePhoto, expiryDate, itemFieldsSchema, toDate } from "@/lib/inventory-input";

const schema = itemFieldsSchema.partial().extend({
  // This branch only: its own minimum (null = the item's) and cupboard.
  branchMinQty: z.number().int().min(0).max(100000).nullable().optional(),
  locationId: z.string().min(1).nullable().optional(),
  expiresAt: expiryDate.nullable().optional(),
  // A product sold in one of the owner's shops; null unlinks.
  productId: z.string().min(1).nullable().optional(),
});

/** Edits an item; branch fields only touch the active branch's stock row. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await inventoryContext();
  if (!ctx?.canWrite) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const item = await prisma.inventoryItem.findFirst({ where: { id, ownerId: ctx.ownerId, active: true }, select: { id: true } });
  if (!item) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  // A barcode may be shared by several items (colours of one line).
  const { branchMinQty, locationId, expiresAt, photo, barcode, brand, color, note, ...rest } = parsed.data;
  if (locationId) {
    const loc = await prisma.inventoryLocation.findFirst({ where: { id: locationId, businessId: ctx.businessId }, select: { id: true } });
    if (!loc) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }
  if (rest.productId) {
    const product = await prisma.product.findFirst({ where: { id: rest.productId, business: { ownerId: ctx.ownerId } }, select: { id: true } });
    if (!product) return NextResponse.json({ error: "INVALID" }, { status: 400 });
    const taken = await prisma.inventoryItem.findFirst({ where: { productId: rest.productId, NOT: { id } }, select: { id: true } });
    if (taken) return NextResponse.json({ error: "PRODUCT_TAKEN" }, { status: 409 });
  }
  const decoded = photo ? decodePhoto(photo) : null;

  await prisma.inventoryItem.update({
    where: { id },
    data: {
      ...rest,
      ...(barcode !== undefined ? { barcode: barcode || null } : {}),
      ...(brand !== undefined ? { brand: brand || null } : {}),
      ...(color !== undefined ? { color: color || null } : {}),
      ...(note !== undefined ? { note: note || null } : {}),
      ...(photo === null ? { photo: null, photoMime: null } : decoded ? { photo: decoded.bytes, photoMime: decoded.mime } : {}),
    },
  });
  if (branchMinQty !== undefined || locationId !== undefined || expiresAt !== undefined) {
    const data = {
      ...(branchMinQty !== undefined ? { minQty: branchMinQty } : {}),
      ...(locationId !== undefined ? { locationId } : {}),
      ...(expiresAt !== undefined ? { expiresAt: toDate(expiresAt) } : {}),
    };
    await prisma.inventoryStock.upsert({
      where: { itemId_businessId: { itemId: id, businessId: ctx.businessId } },
      update: data,
      create: { itemId: id, businessId: ctx.businessId, qty: 0, ...data },
    });
  }
  return NextResponse.json({ ok: true });
}

/** Owner only: takes the item out of every branch's stock (history kept). */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const ctx = await inventoryContext();
  if (!ctx?.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const r = await prisma.inventoryItem.updateMany({ where: { id, ownerId: ctx.ownerId }, data: { active: false, barcode: null, productId: null } });
  if (r.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
