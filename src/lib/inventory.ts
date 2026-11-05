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

/** Who is scanning, for the history. */
async function actor(ctx: InventoryContext) {
  const [session, staff] = await Promise.all([
    Promise.resolve()
      .then(() => auth())
      .catch(() => null),
    ctx.access.staffId ? prisma.staff.findUnique({ where: { id: ctx.access.staffId }, select: { name: true } }) : null,
  ]);
  return { byUserId: session?.user?.id ?? null, byName: staff?.name ?? session?.user?.name ?? null };
}

type Tx = Parameters<Parameters<typeof prisma.$transaction>[0]>[0];
// A slow database link shouldn't abort a scan halfway (Prisma's default is 5 s).
const TX = { maxWait: 10_000, timeout: 20_000 };

/** Changes one branch's count inside a transaction and logs it. Keeps the
 * nearest expiry date, forgets it when the shelf is empty, and re-arms the
 * low-stock email once the count is back above the minimum. Returns the
 * count before and after, and whether this change just made it run low. */
async function applyMove(
  tx: Tx,
  input: {
    itemId: string;
    businessId: string;
    kind: string;
    next: (qty: number) => number;
    locationId?: string | null;
    expiresAt?: Date | null;
    note?: string | null;
    by: { byUserId: string | null; byName: string | null };
  },
) {
  const stock = await tx.inventoryStock.upsert({
    where: { itemId_businessId: { itemId: input.itemId, businessId: input.businessId } },
    update: {},
    create: { itemId: input.itemId, businessId: input.businessId, qty: 0 },
    include: { item: { select: { minQty: true } } },
  });
  const next = input.next(stock.qty);
  if (next < 0) throw new InventoryError("NOT_ENOUGH");
  const min = minFor(stock, stock.item);
  const expiresAt =
    next === 0 ? null : input.expiresAt && (!stock.expiresAt || input.expiresAt < stock.expiresAt) ? input.expiresAt : stock.expiresAt;
  const nowLow = min > 0 && next <= min;
  const justLow = nowLow && next < stock.qty && !stock.lowAlertAt;
  await tx.inventoryStock.update({
    where: { id: stock.id },
    data: {
      qty: next,
      expiresAt,
      ...(input.locationId !== undefined ? { locationId: input.locationId } : {}),
      ...(!nowLow ? { lowAlertAt: null } : justLow ? { lowAlertAt: new Date() } : {}),
    },
  });
  await tx.inventoryMove.create({
    data: {
      itemId: input.itemId,
      businessId: input.businessId,
      delta: next - stock.qty,
      kind: input.kind,
      qtyAfter: next,
      ...input.by,
      note: input.note || null,
    },
  });
  return { before: stock.qty, after: next, min, justLow };
}

/** Scans one item in (+) or out (−) at a branch, or sets its counted
 * quantity (COUNT). Never below zero. Returns the new quantity. */
export async function moveStock(
  ctx: InventoryContext,
  input: {
    itemId: string;
    kind: "IN" | "OUT" | "COUNT";
    qty: number;
    locationId?: string | null;
    /** Scanning in: the expiry date on what was added. */
    expiresAt?: Date | null;
    note?: string | null;
  },
) {
  const item = await prisma.inventoryItem.findFirst({ where: { id: input.itemId, ownerId: ctx.ownerId, active: true }, select: { id: true } });
  if (!item) throw new InventoryError("NOT_FOUND");
  if (input.locationId) {
    const loc = await prisma.inventoryLocation.findFirst({ where: { id: input.locationId, businessId: ctx.businessId }, select: { id: true } });
    if (!loc) throw new InventoryError("BAD_LOCATION");
  }
  const by = await actor(ctx);
  const r = await prisma.$transaction((tx) =>
    applyMove(tx, {
      itemId: item.id,
      businessId: ctx.businessId,
      kind: input.kind,
      next: (qty) => (input.kind === "COUNT" ? input.qty : qty + (input.kind === "IN" ? input.qty : -input.qty)),
      locationId: input.locationId,
      expiresAt: input.kind === "IN" ? input.expiresAt : undefined,
      note: input.note,
      by,
    }),
    TX,
  );
  if (r.justLow) void emailLowStock(item.id, ctx.businessId, r.after, r.min);
  return r.after;
}

/** Owner only: moves some of an item from the active branch to another of
 * theirs, logged at both. Returns the counts after, here and there. */
export async function transferStock(ctx: InventoryContext, input: { itemId: string; toBusinessId: string; qty: number }) {
  if (!ctx.isOwner) throw new InventoryError("FORBIDDEN");
  if (input.toBusinessId === ctx.businessId || input.qty < 1) throw new InventoryError("INVALID");
  const [item, to] = await Promise.all([
    prisma.inventoryItem.findFirst({ where: { id: input.itemId, ownerId: ctx.ownerId, active: true }, select: { id: true } }),
    prisma.business.findFirst({ where: { id: input.toBusinessId, ownerId: ctx.ownerId }, select: { id: true, name: true } }),
  ]);
  if (!item || !to) throw new InventoryError("NOT_FOUND");
  const by = await actor(ctx);
  const fromName = ctx.access.business.name;
  const [out, inn] = await prisma.$transaction(async (tx) => {
    const out = await applyMove(tx, { itemId: item.id, businessId: ctx.businessId, kind: "XFER_OUT", next: (q) => q - input.qty, note: `→ ${to.name}`, by });
    const inn = await applyMove(tx, { itemId: item.id, businessId: to.id, kind: "XFER_IN", next: (q) => q + input.qty, note: `← ${fromName}`, by });
    return [out, inn] as const;
  }, TX);
  if (out.justLow) void emailLowStock(item.id, ctx.businessId, out.after, out.min);
  return { here: out.after, there: inn.after };
}

/** Tells the owner, once per drop, that an item ran low at a branch. */
async function emailLowStock(itemId: string, businessId: string, qty: number, min: number) {
  try {
    const [item, business] = await Promise.all([
      prisma.inventoryItem.findUnique({ where: { id: itemId }, select: { name: true, brand: true, unit: true } }),
      prisma.business.findUnique({ where: { id: businessId }, select: { name: true, defaultLocale: true, owner: { select: { name: true, email: true } } } }),
    ]);
    if (!item || !business) return;
    const { lowStockEmail } = await import("@/lib/email/inventory-emails");
    const { sendMail } = await import("@/lib/mailer");
    await sendMail({ to: business.owner.email, ...lowStockEmail({ locale: business.defaultLocale, ownerName: business.owner.name, branch: business.name, item, qty, min }) });
  } catch (err) {
    console.error("[inventory low-stock email]", itemId, err);
  }
}

/** Where an item's minimum comes from: the branch's own, else the item's. */
export function minFor(stock: { minQty: number | null } | null | undefined, item: { minQty: number }) {
  return stock?.minQty ?? item.minQty;
}
