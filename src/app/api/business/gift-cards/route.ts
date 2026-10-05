import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { toSmallestUnit } from "@/lib/money";

const createSchema = z.object({
  serviceId: z.string().cuid(),
  name: z.string().trim().min(1).max(120),
  discountPercent: z.number().int().min(1).max(100),
  validDays: z.number().int().min(1).max(3650),
  maxUses: z.number().int().min(1).max(1000),
  salePrice: z.number().positive().max(100000),
  currency: z.string().length(3),
});

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const cards = await prisma.giftCard.findMany({
    where: { businessId: owned.businessId },
    include: { service: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({
    cards: cards.map((c) => ({
      id: c.id,
      name: c.name,
      serviceName: c.service.name,
      discountPercent: c.discountPercent,
      validDays: c.validDays,
      maxUses: c.maxUses,
      salePriceCents: c.salePriceCents,
      currency: c.currency,
      active: c.active,
    })),
  });
}

export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;

  const service = await prisma.service.findFirst({
    where: { id: d.serviceId, businessId: owned.businessId },
    select: { id: true },
  });
  if (!service) return NextResponse.json({ error: "SERVICE_NOT_FOUND" }, { status: 404 });

  const currency = d.currency.toUpperCase();
  const card = await prisma.giftCard.create({
    data: {
      businessId: owned.businessId,
      serviceId: d.serviceId,
      name: d.name,
      discountPercent: d.discountPercent,
      validDays: d.validDays,
      maxUses: d.maxUses,
      salePriceCents: toSmallestUnit(d.salePrice, currency),
      currency,
    },
  });
  return NextResponse.json({ id: card.id }, { status: 201 });
}
