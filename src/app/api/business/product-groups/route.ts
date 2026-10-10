import { NextResponse } from "next/server";
import { z } from "zod";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const createSchema = z.object({ name: z.string().trim().min(1).max(100) });

export async function POST(req: Request) {
  const businessId = await requireSectionBusinessId("products");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const last = await prisma.productGroup.findFirst({
    where: { businessId },
    orderBy: { sortOrder: "desc" },
    select: { sortOrder: true },
  });
  const group = await prisma.productGroup.create({
    data: { businessId, name: parsed.data.name, sortOrder: (last?.sortOrder ?? -1) + 1 },
  });
  return NextResponse.json({ group }, { status: 201 });
}
