import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";
import { platformAffiliateSchema } from "@/lib/validations";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const affiliate = await prisma.platformAffiliate.findUnique({ where: { id } });
  if (!affiliate) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const parsed = platformAffiliateSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const updated = await prisma.platformAffiliate.update({ where: { id }, data: parsed.data });
  return NextResponse.json({ affiliate: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const affiliate = await prisma.platformAffiliate.findUnique({ where: { id } });
  if (!affiliate) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.platformAffiliate.update({ where: { id }, data: { active: false } });
  return NextResponse.json({ ok: true });
}
