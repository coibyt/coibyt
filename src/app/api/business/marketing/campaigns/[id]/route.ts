import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Cancels a scheduled campaign that hasn't gone out yet. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const res = await prisma.emailCampaign.updateMany({
    where: { id, businessId: owned.businessId, status: "SCHEDULED" },
    data: { status: "CANCELLED" },
  });
  if (res.count === 0) return NextResponse.json({ error: "NOT_SCHEDULED" }, { status: 409 });
  return NextResponse.json({ ok: true });
}
