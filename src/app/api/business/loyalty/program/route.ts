import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { toSmallestUnit } from "@/lib/money";

const schema = z.object({
  pointsRequired: z.number().int().min(1).max(100),
  discountPercent: z.number().int().min(1).max(100),
  price: z.number().min(0).max(100000),
  currency: z.string().length(3),
});

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const program = await prisma.loyaltyProgram.findUnique({ where: { businessId: owned.businessId } });
  return NextResponse.json({
    program: program
      ? {
          pointsRequired: program.pointsRequired,
          discountPercent: program.discountPercent,
          price: program.priceCents / 100,
          currency: program.currency,
        }
      : null,
  });
}

export async function PUT(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  const d = parsed.data;
  const currency = d.currency.toUpperCase();
  const data = {
    pointsRequired: d.pointsRequired,
    discountPercent: d.discountPercent,
    priceCents: toSmallestUnit(d.price, currency),
    currency,
  };
  await prisma.loyaltyProgram.upsert({
    where: { businessId: owned.businessId },
    create: { businessId: owned.businessId, ...data },
    update: data,
  });
  return NextResponse.json({ ok: true });
}
