import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Removes one contact from the salon's list. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const res = await prisma.marketingContact.deleteMany({ where: { id, businessId: owned.businessId } });
  if (res.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
