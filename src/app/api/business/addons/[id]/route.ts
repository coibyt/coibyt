import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { serviceAddOnSchema } from "@/lib/validations";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("services");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const addOn = await prisma.serviceAddOn.findFirst({ where: { id, businessId } });
  if (!addOn) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const parsed = serviceAddOnSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.serviceAddOn.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ addOn: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("services");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const addOn = await prisma.serviceAddOn.findFirst({ where: { id, businessId } });
  if (!addOn) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.serviceAddOn.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
