import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { serviceAddOnLinksSchema } from "@/lib/validations";

async function assertOwnership(businessId: string, serviceId: string) {
  return prisma.service.findFirst({ where: { id: serviceId, businessId } });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("services");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!(await assertOwnership(businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const links = await prisma.serviceAddOnLink.findMany({ where: { serviceId: id } });
  return NextResponse.json({ addOnIds: links.map((l) => l.addOnId) });
}

/** Replaces the full set of add-ons offered alongside this service. */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("services");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!(await assertOwnership(businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const parsed = serviceAddOnLinksSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // Only ever link add-ons that actually belong to this business.
  const validAddOns = await prisma.serviceAddOn.findMany({
    where: { id: { in: parsed.data }, businessId },
    select: { id: true },
  });
  const validIds = validAddOns.map((a) => a.id);

  await prisma.$transaction([
    prisma.serviceAddOnLink.deleteMany({ where: { serviceId: id } }),
    ...(validIds.length > 0
      ? [
          prisma.serviceAddOnLink.createMany({
            data: validIds.map((addOnId) => ({ serviceId: id, addOnId })),
          }),
        ]
      : []),
  ]);

  return NextResponse.json({ ok: true });
}
