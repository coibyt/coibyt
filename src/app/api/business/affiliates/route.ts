import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { requireOwnerOnly, requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { affiliateSchema } from "@/lib/validations";
import { affiliateDashboard, AFFILIATE_PERIODS, type AffiliatePeriod } from "@/lib/affiliate-stats";

export async function GET(req: Request) {
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const p = new URL(req.url).searchParams.get("period");
  const period = (AFFILIATE_PERIODS as readonly string[]).includes(p ?? "") ? (p as AffiliatePeriod) : "all";
  return NextResponse.json(await affiliateDashboard(owned.businessId, period));
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
  const { code: wanted, email, phone, note, ...rest } = parsed.data;
  // Codes are unique across every salon, since the link carries only the code.
  if (wanted && (await prisma.affiliate.findUnique({ where: { code: wanted } }))) {
    return NextResponse.json({ error: "CODE_TAKEN" }, { status: 409 });
  }

  const code = wanted || (await generateUniqueCode());
  const affiliate = await prisma.affiliate.create({
    data: { ...rest, email: email || null, phone: phone || null, note: note || null, code, businessId: owned.businessId },
  });
  return NextResponse.json({ affiliate }, { status: 201 });
}
