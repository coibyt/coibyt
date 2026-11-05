import { NextResponse } from "next/server";
import { formatInTimeZone } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { listOwnedBusinesses } from "@/lib/current-business";
import { inventoryContext } from "@/lib/inventory";

const MONTHS = 6;

/** What supplies the salon used, at purchase prices: the last six months by
 * branch (the owner sees every branch, staff only theirs), by type, and the
 * items used most in the last 30 days. Shop sales aren't salon use. */
export async function GET() {
  const ctx = await inventoryContext();
  if (!ctx) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const tz = ctx.access.business.timezone;
  const branches = ctx.isOwner
    ? (await listOwnedBusinesses(ctx.ownerId)).map((b) => ({ id: b.id, name: b.name }))
    : [{ id: ctx.businessId, name: ctx.access.business.name }];

  const now = new Date();
  const thisMonth = formatInTimeZone(now, tz, "yyyy-MM");
  const months: string[] = [];
  for (let i = MONTHS - 1; i >= 0; i--) {
    const [y, m] = thisMonth.split("-").map(Number);
    const d = new Date(Date.UTC(y, m - 1 - i, 1));
    months.push(d.toISOString().slice(0, 7));
  }
  const since = new Date(`${months[0]}-01T00:00:00Z`);
  since.setUTCDate(since.getUTCDate() - 1);

  const moves = await prisma.inventoryMove.findMany({
    where: { businessId: { in: branches.map((b) => b.id) }, kind: "OUT", createdAt: { gte: since } },
    select: { businessId: true, delta: true, createdAt: true, item: { select: { id: true, name: true, brand: true, unit: true, category: true, costCents: true } } },
  });

  const byMonth = Object.fromEntries(months.map((m) => [m, Object.fromEntries(branches.map((b) => [b.id, 0]))])) as Record<string, Record<string, number>>;
  const byCategory = new Map<string, number>();
  const top = new Map<string, { name: string; unit: string; qty: number; cents: number }>();
  const last30 = now.getTime() - 30 * 24 * 60 * 60 * 1000;
  let uncosted = 0;
  for (const m of moves) {
    const qty = Math.abs(m.delta);
    const cents = qty * (m.item.costCents ?? 0);
    if (m.item.costCents == null) uncosted++;
    const month = formatInTimeZone(m.createdAt, tz, "yyyy-MM");
    if (byMonth[month]) byMonth[month][m.businessId] = (byMonth[month][m.businessId] ?? 0) + cents;
    if (m.createdAt.getTime() >= last30) {
      const cat = m.item.category ?? "other";
      byCategory.set(cat, (byCategory.get(cat) ?? 0) + cents);
      const t = top.get(m.item.id) ?? { name: m.item.brand ? `${m.item.brand} ${m.item.name}` : m.item.name, unit: m.item.unit, qty: 0, cents: 0 };
      t.qty += qty;
      t.cents += cents;
      top.set(m.item.id, t);
    }
  }

  return NextResponse.json({
    currency: ctx.access.business.defaultCurrency,
    branches,
    months: months.map((m) => ({ month: m, byBranch: byMonth[m] })),
    categories: [...byCategory].map(([category, cents]) => ({ category, cents })).sort((a, b) => b.cents - a.cents),
    top: [...top.values()].sort((a, b) => b.cents - a.cents || b.qty - a.qty).slice(0, 10),
    uncosted: uncosted > 0,
  });
}
