import { NextResponse } from "next/server";
import { requireOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { staffSchema } from "@/lib/validations";

async function assertOwnership(businessId: string, staffId: string) {
  return prisma.staff.findFirst({ where: { id: staffId, businessId } });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!(await assertOwnership(businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = staffSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { serviceIds, ...data } = parsed.data;

  const staff = await prisma.$transaction(async (tx) => {
    if (serviceIds) {
      await tx.staffService.deleteMany({ where: { staffId: id } });
      await tx.staffService.createMany({
        data: serviceIds.map((serviceId) => ({ serviceId, staffId: id })),
      });
    }
    return tx.staff.update({ where: { id }, data });
  });

  return NextResponse.json({ staff });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!(await assertOwnership(businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  await prisma.staff.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
