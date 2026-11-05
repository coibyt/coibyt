import { prisma } from "@/lib/prisma";
import { listOwnedBusinesses } from "@/lib/current-business";
import { minFor, type InventoryContext } from "@/lib/inventory";

export interface InventoryItemRow {
  id: string;
  code: string;
  name: string;
  brand: string | null;
  category: string | null;
  unit: string;
  barcode: string | null;
  note: string | null;
  /** The item's own minimum (every branch without its own). */
  itemMin: number;
  /** What one unit costs to buy (smallest currency unit), if set. */
  costCents: number | null;
  /** The nearest expiry date of what this branch holds, "YYYY-MM-DD". */
  expiresAt: string | null;
  /** Used per day here over the last 30 days, and the days that lasts. */
  perDay: number;
  daysLeft: number | null;
  /** The shop product it is the stock of, if linked. */
  productId: string | null;
  /** Changes when the photo does, for the image URL; null = no photo. */
  photoVer: number | null;
  /** At the active branch. */
  qty: number;
  min: number;
  branchMin: number | null;
  locationId: string | null;
  /** Owner with several branches: each branch's count. */
  byBranch?: Record<string, number>;
}

export interface InventoryData {
  items: InventoryItemRow[];
  locations: { id: string; code: string; name: string; count: number }[];
  moves: { id: string; itemId: string; itemName: string; unit: string; kind: string; delta: number; qtyAfter: number; byName: string | null; note: string | null; createdAt: string }[];
  /** Owner with several branches, for the all-branches view and moving stock. */
  branches: { id: string; name: string }[];
  currentBranchId: string;
  used7: number;
  /** The salon's currency, for prices. */
  currency: string;
  /** What this branch's stock is worth at purchase prices. */
  stockValue: number;
  /** What this branch used (scanned out) in 30 days, at purchase prices. */
  spent30: number;
  /** Owner: the active branch's shop products, to link items to. */
  products: { id: string; name: string }[];
}

/** Everything the stock page shows for the active branch. */
export async function loadInventory(ctx: InventoryContext): Promise<InventoryData> {
  const branches = ctx.isOwner ? (await listOwnedBusinesses(ctx.ownerId)).map((b) => ({ id: b.id, name: b.name })) : [];
  const since30 = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const [items, locations, moves, used, out30, products] = await Promise.all([
    prisma.inventoryItem.findMany({
      where: { ownerId: ctx.ownerId, active: true },
      select: {
        id: true,
        code: true,
        name: true,
        brand: true,
        category: true,
        unit: true,
        barcode: true,
        note: true,
        minQty: true,
        costCents: true,
        productId: true,
        photoMime: true,
        updatedAt: true,
        stock: {
          where: branches.length > 1 ? { businessId: { in: branches.map((b) => b.id) } } : { businessId: ctx.businessId },
          select: { businessId: true, qty: true, minQty: true, locationId: true, expiresAt: true },
        },
      },
      orderBy: { name: "asc" },
    }),
    prisma.inventoryLocation.findMany({
      where: { businessId: ctx.businessId },
      select: { id: true, code: true, name: true, _count: { select: { stock: true } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.inventoryMove.findMany({
      where: { businessId: ctx.businessId },
      select: { id: true, itemId: true, kind: true, delta: true, qtyAfter: true, byName: true, note: true, createdAt: true, item: { select: { name: true, unit: true } } },
      orderBy: { createdAt: "desc" },
      take: 150,
    }),
    prisma.inventoryMove.aggregate({
      where: { businessId: ctx.businessId, kind: "OUT", createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      _sum: { delta: true },
    }),
    prisma.inventoryMove.groupBy({
      by: ["itemId"],
      where: { businessId: ctx.businessId, kind: { in: ["OUT", "SALE"] }, createdAt: { gte: since30 } },
      _sum: { delta: true },
    }),
    ctx.isOwner
      ? prisma.product.findMany({ where: { businessId: ctx.businessId, active: true }, select: { id: true, name: true }, orderBy: { name: "asc" } })
      : Promise.resolve([] as { id: string; name: string }[]),
  ]);
  const usedBy = new Map(out30.map((r) => [r.itemId, Math.abs(r._sum.delta ?? 0)]));
  const cost = new Map(items.map((i) => [i.id, i.costCents ?? 0]));
  const here = (it: (typeof items)[number]) => it.stock.find((s) => s.businessId === ctx.businessId);

  return {
    items: items.map((it) => {
      const stock = here(it);
      return {
        id: it.id,
        code: it.code,
        name: it.name,
        brand: it.brand,
        category: it.category,
        unit: it.unit,
        barcode: it.barcode,
        note: it.note,
        itemMin: it.minQty,
        costCents: it.costCents,
        expiresAt: stock?.expiresAt ? stock.expiresAt.toISOString().slice(0, 10) : null,
        ...(() => {
          const perDay = (usedBy.get(it.id) ?? 0) / 30;
          return { perDay, daysLeft: perDay > 0 ? Math.floor((stock?.qty ?? 0) / perDay) : null };
        })(),
        productId: it.productId,
        photoVer: it.photoMime ? it.updatedAt.getTime() : null,
        qty: stock?.qty ?? 0,
        min: minFor(stock, it),
        branchMin: stock?.minQty ?? null,
        locationId: stock?.locationId ?? null,
        ...(branches.length > 1 ? { byBranch: Object.fromEntries(it.stock.map((s) => [s.businessId, s.qty])) } : {}),
      };
    }),
    locations: locations.map((l) => ({ id: l.id, code: l.code, name: l.name, count: l._count.stock })),
    moves: moves.map((m) => ({
      id: m.id,
      itemId: m.itemId,
      itemName: m.item.name,
      unit: m.item.unit,
      kind: m.kind,
      delta: m.delta,
      qtyAfter: m.qtyAfter,
      byName: m.byName,
      note: m.note,
      createdAt: m.createdAt.toISOString(),
    })),
    branches: branches.length > 1 ? branches : [],
    currentBranchId: ctx.businessId,
    used7: Math.abs(used._sum.delta ?? 0),
    currency: ctx.access.business.defaultCurrency,
    stockValue: items.reduce((sum, it) => sum + (here(it)?.qty ?? 0) * (it.costCents ?? 0), 0),
    // Salon use only — shop sales are takings, not spending.
    spent30: (await prisma.inventoryMove.groupBy({
      by: ["itemId"],
      where: { businessId: ctx.businessId, kind: "OUT", createdAt: { gte: since30 } },
      _sum: { delta: true },
    })).reduce((sum, r) => sum + Math.abs(r._sum.delta ?? 0) * (cost.get(r.itemId) ?? 0), 0),
    products,
  };
}
