import { NextResponse } from "next/server";
import { requireOwnedBusinessId, requireApprovedOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations";

export async function GET() {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const services = await prisma.service.findMany({
    where: { businessId },
    include: { staff: { select: { staffId: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ services });
}

export async function POST(req: Request) {
  const result = await requireApprovedOwnedBusinessId();
  if ("error" in result) {
    return NextResponse.json({ error: result.error }, { status: result.error === "FORBIDDEN" ? 403 : 409 });
  }
  const { businessId } = result;

  const body = await req.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { staffIds, ...data } = parsed.data;

  const service = await prisma.service.create({
    data: {
      ...data,
      businessId,
      staff: staffIds ? { create: staffIds.map((staffId) => ({ staffId })) } : undefined,
    },
  });
  return NextResponse.json({ service }, { status: 201 });
}
