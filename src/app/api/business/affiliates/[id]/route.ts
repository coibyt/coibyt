import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { affiliateSchema } from "@/lib/validations";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const affiliate = await prisma.affiliate.findFirst({ where: { id, businessId: owned.businessId } });
  if (!affiliate) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const parsed = affiliateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.affiliate.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ affiliate: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const affiliate = await prisma.affiliate.findFirst({ where: { id, businessId: owned.businessId } });
  if (!affiliate) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.affiliate.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
