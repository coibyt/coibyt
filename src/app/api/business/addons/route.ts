import { NextResponse } from "next/server";
import { requireOwnedBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { serviceAddOnSchema } from "@/lib/validations";

export async function GET() {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const addOns = await prisma.serviceAddOn.findMany({
    where: { businessId, active: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ addOns });
}

export async function POST(req: Request) {
  const businessId = await requireOwnedBusinessId();
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = serviceAddOnSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const addOn = await prisma.serviceAddOn.create({
    data: { ...parsed.data, businessId },
  });
  return NextResponse.json({ addOn }, { status: 201 });
}
