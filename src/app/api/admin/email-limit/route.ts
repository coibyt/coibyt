import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { MAX_EMAIL_DAILY_LIMIT, setDefaultEmailDailyLimit } from "@/lib/email-daily-limit";

const schema = z.object({
  // Omitted = the default for every salon without its own.
  businessId: z.string().min(1).optional(),
  // null = no cap (for a salon: back to the default).
  limit: z.number().int().min(1).max(MAX_EMAIL_DAILY_LIMIT).nullable(),
});

/** Admin: how many marketing emails a salon may send per day. */
export async function PATCH(req: Request) {
  if (!(await requireAdmin())) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { businessId, limit } = parsed.data;
  if (!businessId) {
    await setDefaultEmailDailyLimit(limit);
    return NextResponse.json({ ok: true });
  }
  const r = await prisma.business.updateMany({ where: { id: businessId }, data: { emailDailyLimit: limit } });
  if (r.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
