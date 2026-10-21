import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireOwnerOnly } from "@/lib/current-business";

const schema = z.object({ ids: z.array(z.string().min(1).max(40)).min(1).max(500) });

/** Saves the order of one section of the services list after the owner
 * drags a service: `ids` is that section's services, top to bottom. */
export async function POST(req: Request) {
  // Same rule as editing a service: owners only.
  const owned_ = await requireOwnerOnly();
  if (!owned_) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { businessId } = owned_;
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const ids = [...new Set(parsed.data.ids)];

  const owned = await prisma.service.count({ where: { id: { in: ids }, businessId } });
  if (owned !== ids.length) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  // The section's services swap places among the slots they already hold in
  // the salon's full list, so every other section keeps its position.
  const all = await prisma.service.findMany({
    where: { businessId },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    select: { id: true, sortOrder: true },
  });
  const moved = new Set(ids);
  let k = 0;
  const order = all.map((s) => (moved.has(s.id) ? ids[k++] : s.id));
  const changed = order
    .map((id, i) => ({ id, sortOrder: i + 1 }))
    .filter((x) => all.find((s) => s.id === x.id)?.sortOrder !== x.sortOrder);
  await prisma.$transaction(changed.map((x) => prisma.service.update({ where: { id: x.id }, data: { sortOrder: x.sortOrder } })));
  return NextResponse.json({ ok: true });
}
