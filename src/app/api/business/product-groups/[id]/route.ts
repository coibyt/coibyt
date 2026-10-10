import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  name: z.string().trim().min(1).max(100).optional(),
  // Moving a group one slot up or down among the salon's groups.
  move: z.enum(["up", "down"]).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("products");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const group = await prisma.productGroup.findFirst({ where: { id, businessId } });
  if (!group) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  if (parsed.data.name) {
    await prisma.productGroup.update({ where: { id }, data: { name: parsed.data.name } });
  }

  if (parsed.data.move) {
    // Renumber the whole list so ties/gaps from older data can't break the swap.
    const groups = await prisma.productGroup.findMany({
      where: { businessId },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    const from = groups.findIndex((g) => g.id === id);
    const to = parsed.data.move === "up" ? from - 1 : from + 1;
    if (to >= 0 && to < groups.length) {
      const reordered = [...groups];
      [reordered[from], reordered[to]] = [reordered[to], reordered[from]];
      await prisma.$transaction(
        reordered.map((g, index) =>
          prisma.productGroup.update({ where: { id: g.id }, data: { sortOrder: index } })
        )
      );
    }
  }

  return NextResponse.json({ ok: true });
}

/** Deleting a group keeps its products — they just become ungrouped. */
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("products");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const group = await prisma.productGroup.findFirst({ where: { id, businessId } });
  if (!group) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.productGroup.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
