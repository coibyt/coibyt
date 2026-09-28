import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  title: z.string().trim().min(1).max(150).optional(),
  description: z.string().trim().max(2000).optional(),
  url: z.string().trim().url().max(190).optional(),
  move: z.enum(["up", "down"]).optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const { move, description, ...rest } = parsed.data;

  const existing = await prisma.trainingResource.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  if (Object.keys(rest).length > 0 || description !== undefined) {
    await prisma.trainingResource.update({
      where: { id },
      data: { ...rest, ...(description !== undefined ? { description: description || null } : {}) },
    });
  }

  if (move) {
    const all = await prisma.trainingResource.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    });
    const from = all.findIndex((t) => t.id === id);
    const to = move === "up" ? from - 1 : from + 1;
    if (to >= 0 && to < all.length) {
      const reordered = [...all];
      [reordered[from], reordered[to]] = [reordered[to], reordered[from]];
      await prisma.$transaction(
        reordered.map((t, index) =>
          prisma.trainingResource.update({ where: { id: t.id }, data: { sortOrder: index } })
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
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  await prisma.trainingResource.deleteMany({ where: { id } });
  return NextResponse.json({ ok: true });
}
