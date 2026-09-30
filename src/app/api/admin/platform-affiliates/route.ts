import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { platformAffiliateSchema } from "@/lib/validations";

export async function GET() {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const affiliates = await prisma.platformAffiliate.findMany({
    where: { active: true },
    orderBy: { createdAt: "desc" },
  });

  const referredCounts = await prisma.business.groupBy({
    by: ["referredByAffiliateId"],
    where: { referredByAffiliateId: { in: affiliates.map((a) => a.id) } },
    _count: true,
  });
  const referredByAffiliate = new Map(referredCounts.map((r) => [r.referredByAffiliateId, r._count]));

  const commissionStats = await prisma.booking.groupBy({
    by: ["platformAffiliateId", "currency"],
    where: {
      platformAffiliateId: { in: affiliates.map((a) => a.id) },
      status: { in: ["CONFIRMED", "COMPLETED"] },
    },
    _sum: { platformAffiliateCommissionCents: true },
  });
  const commissionsByAffiliate = new Map<string, { currency: string; commissionCents: number }[]>();
  for (const row of commissionStats) {
    if (!row.platformAffiliateId) continue;
    const list = commissionsByAffiliate.get(row.platformAffiliateId) ?? [];
    list.push({ currency: row.currency, commissionCents: row._sum.platformAffiliateCommissionCents ?? 0 });
    commissionsByAffiliate.set(row.platformAffiliateId, list);
  }

  return NextResponse.json({
    affiliates: affiliates.map((a) => ({
      ...a,
      referredBusinessCount: referredByAffiliate.get(a.id) ?? 0,
      commissions: commissionsByAffiliate.get(a.id) ?? [],
    })),
  });
}

async function generateUniqueCode() {
  for (let i = 0; i < 5; i++) {
    const code = randomBytes(4).toString("hex").toUpperCase();
    const existing = await prisma.platformAffiliate.findUnique({ where: { code } });
    if (!existing) return code;
  }
  throw new Error("COULD_NOT_GENERATE_CODE");
}

export async function POST(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = platformAffiliateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const code = await generateUniqueCode();
  const affiliate = await prisma.platformAffiliate.create({ data: { ...parsed.data, code } });
  return NextResponse.json(
    { affiliate: { ...affiliate, referredBusinessCount: 0, commissions: [] } },
    { status: 201 }
  );
}
