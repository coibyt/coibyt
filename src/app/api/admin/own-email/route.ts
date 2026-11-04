import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

const schema = z.object({ businessId: z.string().min(1), allowed: z.boolean() });

/** Admin: lets a salon put its own verified address on its marketing emails. */
export async function PATCH(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const r = await prisma.business.updateMany({ where: { id: parsed.data.businessId }, data: { ownEmailAllowed: parsed.data.allowed } });
  if (r.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
