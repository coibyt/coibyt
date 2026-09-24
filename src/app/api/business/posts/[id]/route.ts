import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const post = await prisma.post.findUnique({ where: { id }, select: { businessId: true } });
  if (!post || post.businessId !== owned.businessId) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
