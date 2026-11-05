import { randomBytes } from "crypto";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBusinessAccess, type BusinessAccess } from "@/lib/current-business";

/** Salon stock. An owner's catalog of supplies (InventoryItem) is shared by
 * all their branches; each branch keeps its own count and cupboard
 * (InventoryStock), and every scan in or out is an InventoryMove. Items are
 * found by their barcode, or by a printed QR label "VI-<code>"; cupboards
 * have labels "VL-<code>". The owner manages everything; staff scan when
 * the owner allows it (Staff.canUseInventory). */

export const ITEM_PREFIX = "VI-";
export const LOCATION_PREFIX = "VL-";
export const INVENTORY_CATEGORIES = ["gel", "polish", "liquid", "tool", "care", "lash", "hair", "other"] as const;
export const INVENTORY_UNITS = ["pcs", "bottle", "box", "pack", "tube", "jar"] as const;

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

/** A short code for a QR label, unique in its table. */
export async function newInventoryCode(kind: "item" | "location") {
  for (let i = 0; i < 6; i++) {
    const code = Array.from(randomBytes(8), (b) => ALPHABET[b % ALPHABET.length]).join("");
    const taken =
      kind === "item"
        ? await prisma.inventoryItem.findUnique({ where: { code }, select: { id: true } })
        : await prisma.inventoryLocation.findUnique({ where: { code }, select: { id: true } });
    if (!taken) return code;
  }
  throw new Error("COULD_NOT_MAKE_CODE");
}

export interface InventoryContext {
  access: BusinessAccess;
  businessId: string;
  ownerId: string;
  isOwner: boolean;
  /** May scan in and out, add items and cupboards. */
  canWrite: boolean;
}

/** Who is looking at the stock of the active branch, or null when they may not. */
export async function inventoryContext(): Promise<InventoryContext | null> {
  const access = await getBusinessAccess();
  if (!access) return null;
  const canWrite = access.isOwner || access.canUseInventory;
  if (!canWrite && !access.viewOnlyEverywhere) return null;
  return { access, businessId: access.business.id, ownerId: access.business.ownerId, isOwner: access.isOwner, canWrite };
}

/** What a scanned code points at: one of the owner's items (by barcode or
 * VI- label), one of this branch's cupboards (VL- label), or nothing yet. */
export async function resolveScan(ctx: InventoryContext, raw: string) {
  const code = raw.trim();
  const upper = code.toUpperCase();
  if (upper.startsWith(LOCATION_PREFIX)) {
    const location = await prisma.inventoryLocation.findFirst({ where: { code: upper.slice(LOCATION_PREFIX.length), businessId: ctx.businessId } });
    return location ? ({ type: "location", location } as const) : ({ type: "unknown", barcode: null } as const);
  }
  const item = upper.startsWith(ITEM_PREFIX)
    ? await prisma.inventoryItem.findFirst({ where: { code: upper.slice(ITEM_PREFIX.length), ownerId: ctx.ownerId, active: true } })
    : await prisma.inventoryItem.findFirst({ where: { barcode: code, ownerId: ctx.ownerId, active: true } });
  if (item) return { type: "item", itemId: item.id } as const;
  // A product's own barcode we haven't seen: offer to add it.
  return { type: "unknown", barcode: upper.startsWith(ITEM_PREFIX) ? null : code } as const;
}

export class InventoryError extends Error {}

/** Scans one item in (+) or out (−) at a branch, or sets its counted
 * quantity (COUNT). Never below zero. Returns the new quantity. */
export async function moveStock(
  ctx: InventoryContext,
  input: { itemId: string; kind: "IN" | "OUT" | "COUNT"; qty: number; locationId?: string | null; note?: string | null },
) {
  const item = await prisma.inventoryItem.findFirst({ where: { id: input.itemId, ownerId: ctx.ownerId, active: true }, select: { id: true } });
  if (!item) throw new InventoryError("NOT_FOUND");
  if (input.locationId) {
    const loc = await prisma.inventoryLocation.findFirst({ where: { id: input.locationId, businessId: ctx.businessId }, select: { id: true } });
    if (!loc) throw new InventoryError("BAD_LOCATION");
  }
  const [session, staff] = await Promise.all([
    Promise.resolve()
      .then(() => auth())
      .catch(() => null),
    ctx.access.staffId ? prisma.staff.findUnique({ where: { id: ctx.access.staffId }, select: { name: true } }) : null,
  ]);
  const byName = staff?.name ?? session?.user?.name ?? null;

  return prisma.$transaction(async (tx) => {
    const stock = await tx.inventoryStock.upsert({
      where: { itemId_businessId: { itemId: item.id, businessId: ctx.businessId } },
      update: {},
      create: { itemId: item.id, businessId: ctx.businessId, qty: 0 },
    });
    const next = input.kind === "COUNT" ? input.qty : stock.qty + (input.kind === "IN" ? input.qty : -input.qty);
    if (next < 0) throw new InventoryError("NOT_ENOUGH");
    await tx.inventoryStock.update({
      where: { id: stock.id },
      data: { qty: next, ...(input.locationId !== undefined ? { locationId: input.locationId } : {}) },
    });
    await tx.inventoryMove.create({
      data: {
        itemId: item.id,
        businessId: ctx.businessId,
        delta: next - stock.qty,
        kind: input.kind,
        qtyAfter: next,
        byUserId: session?.user?.id ?? null,
        byName,
        note: input.note || null,
      },
    });
    return next;
  });
}

/** Where an item's minimum comes from: the branch's own, else the item's. */
export function minFor(stock: { minQty: number | null } | null | undefined, item: { minQty: number }) {
  return stock?.minQty ?? item.minQty;
}
