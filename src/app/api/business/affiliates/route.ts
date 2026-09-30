import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { affiliateSchema } from "@/lib/validations";

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const affiliates = await prisma.affiliate.findMany({
    where: { businessId: owned.businessId, active: true },
    orderBy: { createdAt: "desc" },
  });

  const stats = await prisma.booking.groupBy({
    by: ["affiliateId"],
    where: {
      businessId: owned.businessId,
      affiliateId: { in: affiliates.map((a) => a.id) },
      status: { in: ["CONFIRMED", "COMPLETED"] },
    },
    _count: true,
    _sum: { affiliateCommissionCents: true },
  });
  const statsByAffiliate = new Map(
    stats.map((s) => [s.affiliateId, { bookingCount: s._count, commissionCents: s._sum.affiliateCommissionCents ?? 0 }])
  );

  return NextResponse.json({
    affiliates: affiliates.map((a) => ({
      ...a,
      bookingCount: statsByAffiliate.get(a.id)?.bookingCount ?? 0,
      commissionCents: statsByAffiliate.get(a.id)?.commissionCents ?? 0,
    })),
  });
}

async function generateUniqueCode() {
  for (let i = 0; i < 5; i++) {
    const code = randomBytes(4).toString("hex").toUpperCase();
    const existing = await prisma.affiliate.findUnique({ where: { code } });
    if (!existing) return code;
  }
  throw new Error("COULD_NOT_GENERATE_CODE");
}

export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = affiliateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const code = await generateUniqueCode();
  const affiliate = await prisma.affiliate.create({
    data: { ...parsed.data, code, businessId: owned.businessId },
  });
  return NextResponse.json({ affiliate: { ...affiliate, bookingCount: 0, commissionCents: 0 } }, { status: 201 });
}
