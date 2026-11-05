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
  moves: { id: string; itemId: string; itemName: string; unit: string; kind: string; delta: number; qtyAfter: number; byName: string | null; createdAt: string }[];
  /** Owner with several branches, for the all-branches view. */
  branches: { id: string; name: string }[];
  used7: number;
}

/** Everything the stock page shows for the active branch. */
export async function loadInventory(ctx: InventoryContext): Promise<InventoryData> {
  const branches = ctx.isOwner ? (await listOwnedBusinesses(ctx.ownerId)).map((b) => ({ id: b.id, name: b.name })) : [];
  const [items, locations, moves, used] = await Promise.all([
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
        photoMime: true,
        updatedAt: true,
        stock: {
          where: branches.length > 1 ? { businessId: { in: branches.map((b) => b.id) } } : { businessId: ctx.businessId },
          select: { businessId: true, qty: true, minQty: true, locationId: true },
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
      select: { id: true, itemId: true, kind: true, delta: true, qtyAfter: true, byName: true, createdAt: true, item: { select: { name: true, unit: true } } },
      orderBy: { createdAt: "desc" },
      take: 150,
    }),
    prisma.inventoryMove.aggregate({
      where: { businessId: ctx.businessId, kind: "OUT", createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      _sum: { delta: true },
    }),
  ]);

  return {
    items: items.map((it) => {
      const here = it.stock.find((s) => s.businessId === ctx.businessId);
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
        photoVer: it.photoMime ? it.updatedAt.getTime() : null,
        qty: here?.qty ?? 0,
        min: minFor(here, it),
        branchMin: here?.minQty ?? null,
        locationId: here?.locationId ?? null,
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
      createdAt: m.createdAt.toISOString(),
    })),
    branches: branches.length > 1 ? branches : [],
    used7: Math.abs(used._sum.delta ?? 0),
  };
}
