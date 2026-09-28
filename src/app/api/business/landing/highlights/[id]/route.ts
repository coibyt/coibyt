import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { landingHighlightSchema } from "@/lib/validations";

const patchSchema = landingHighlightSchema.partial().extend({
  move: z.enum(["up", "down"]).optional(),
});

async function assertOwnership(businessId: string, highlightId: string) {
  return prisma.landingHighlight.findFirst({
    where: { id: highlightId, landingPage: { businessId } },
  });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const existing = await assertOwnership(owned.businessId, id);
  if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { move, buttonUrl, ...rest } = parsed.data;

  if (Object.keys(rest).length > 0 || buttonUrl !== undefined) {
    await prisma.landingHighlight.update({
      where: { id },
      data: { ...rest, ...(buttonUrl !== undefined ? { buttonUrl: buttonUrl || null } : {}) },
    });
  }

  if (move) {
    const all = await prisma.landingHighlight.findMany({
      where: { landingPageId: existing.landingPageId },
      orderBy: [{ sortOrder: "asc" }, { id: "asc" }],
    });
    const from = all.findIndex((h) => h.id === id);
    const to = move === "up" ? from - 1 : from + 1;
    if (to >= 0 && to < all.length) {
      const reordered = [...all];
      [reordered[from], reordered[to]] = [reordered[to], reordered[from]];
      await prisma.$transaction(
        reordered.map((h, index) =>
          prisma.landingHighlight.update({ where: { id: h.id }, data: { sortOrder: index } })
        )
      );
    }
  }

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const existing = await assertOwnership(owned.businessId, id);
  if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.landingHighlight.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
