import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  amountCents: z.number().int().min(1).max(100_000_000),
  note: z.string().trim().max(200).optional(),
});

async function ownAffiliate(id: string) {
  const owned = await requireOwnerOnly();
  if (!owned) return null;
  return prisma.affiliate.findFirst({ where: { id, businessId: owned.businessId }, select: { id: true } });
}

/** Records commission the salon has paid this partner (outside VaraaAi). */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await ownAffiliate(id))) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const payout = await prisma.affiliatePayout.create({
    data: { affiliateId: id, amountCents: parsed.data.amountCents, note: parsed.data.note || null },
  });
  return NextResponse.json({ payout }, { status: 201 });
}

/** Undoes a payout recorded by mistake (`?payoutId=`). */
export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!(await ownAffiliate(id))) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const payoutId = new URL(req.url).searchParams.get("payoutId") ?? "";
  const res = await prisma.affiliatePayout.deleteMany({ where: { id: payoutId, affiliateId: id } });
  if (res.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
