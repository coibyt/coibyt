import { NextResponse } from "next/server";
import { requireOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { staffSchema } from "@/lib/validations";

export async function GET() {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const staff = await prisma.staff.findMany({
    where: { businessId },
    include: { services: { select: { serviceId: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ staff });
}

export async function POST(req: Request) {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const body = await req.json();
  const parsed = staffSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { serviceIds, avatarUrl, ...data } = parsed.data;

  const staff = await prisma.staff.create({
    data: {
      ...data,
      avatarUrl: avatarUrl || undefined,
      businessId,
      services: serviceIds
        ? { create: serviceIds.map((serviceId) => ({ serviceId })) }
        : undefined,
    },
  });
  return NextResponse.json({ staff }, { status: 201 });
}
