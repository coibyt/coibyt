import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/require-admin";
import { prisma } from "@/lib/prisma";

/** Admin › Học viện: hide an Academy course review, or show it again. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { id } = await params;
  const b = (await req.json().catch(() => ({}))) as { status?: string };
  if (b.status !== "APPROVED" && b.status !== "HIDDEN") return NextResponse.json({ error: "INVALID" }, { status: 400 });
  await prisma.academyReview.updateMany({ where: { id }, data: { status: b.status } });
  return NextResponse.json({ ok: true });
}
