import { NextResponse } from "next/server";
import { requireSectionBusinessId, requireApprovedOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations";

async function assertOwnership(businessId: string, serviceId: string) {
  const service = await prisma.service.findFirst({
    where: { id: serviceId, businessId },
  });
  return service;
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const result = await requireApprovedOwnedBusinessId();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "FORBIDDEN" ? 403 : 409 });
  }
  const { businessId } = result;
  if (!(await assertOwnership(businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const body = await req.json();
  const parsed = serviceSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { staffIds, videoUrl, ...data } = parsed.data;

  const service = await prisma.$transaction(async (tx) => {
    if (staffIds) {
      await tx.staffService.deleteMany({ where: { serviceId: id } });
      await tx.staffService.createMany({
        data: staffIds.map((staffId) => ({ staffId, serviceId: id })),
      });
    }
    return tx.service.update({
      where: { id },
      data: { ...data, ...(videoUrl !== undefined ? { videoUrl: videoUrl || null } : {}) },
    });
  });

  return NextResponse.json({ service });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("services");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!(await assertOwnership(businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  await prisma.service.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
