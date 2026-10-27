import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** Brings a hidden service (see DELETE on the service) back onto the menu. */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("services");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const res = await prisma.service.updateMany({ where: { id, businessId }, data: { active: true } });
  if (res.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
