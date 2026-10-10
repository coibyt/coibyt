import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const patchSchema = z.object({
  status: z.enum(["PENDING_PAYMENT", "CONFIRMED", "COMPLETED", "CANCELLED"]),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("products");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.order.findFirst({ where: { id, businessId } });
  if (!existing) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const order = await prisma.order.update({ where: { id }, data: { status: parsed.data.status } });
  return NextResponse.json({ order });
}
