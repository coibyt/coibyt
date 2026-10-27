import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess, requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const day = z.string().regex(/^\d{4}-\d{2}-\d{2}$/);
const schema = z.object({
  from: day,
  // Inclusive; omitted = a single day.
  to: day.optional(),
  reason: z.string().trim().max(120).optional(),
});

/** Days the salon is closed (holidays, renovations…) — they override the
 * weekly hours, so nobody can book them (see getAvailableSlots). */
export async function GET() {
  const access = await getBusinessAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const closures = await prisma.businessClosure.findMany({
    where: { businessId: access.business.id },
    orderBy: { date: "asc" },
  });
  return NextResponse.json({
    closures: closures.map((c) => ({ id: c.id, date: c.date.toISOString().slice(0, 10), reason: c.reason })),
  });
}

/** Adds one closed day, or every day of a range (at most 60). */
export async function POST(req: Request) {
  const businessId = await requireSectionBusinessId("hours");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const start = new Date(`${parsed.data.from}T00:00:00Z`);
  const end = new Date(`${parsed.data.to ?? parsed.data.from}T00:00:00Z`);
  const days = Math.round((end.getTime() - start.getTime()) / 86400000) + 1;
  if (days < 1 || days > 60) return NextResponse.json({ error: "INVALID_RANGE" }, { status: 400 });

  const dates = Array.from({ length: days }, (_, i) => new Date(start.getTime() + i * 86400000));
  await prisma.businessClosure.createMany({
    data: dates.map((date) => ({ businessId, date, reason: parsed.data.reason || null })),
    skipDuplicates: true,
  });
  return NextResponse.json({ added: days });
}

/** `?id=` reopens one day. */
export async function DELETE(req: Request) {
  const businessId = await requireSectionBusinessId("hours");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const id = new URL(req.url).searchParams.get("id") ?? "";
  await prisma.businessClosure.deleteMany({ where: { id, businessId } });
  return NextResponse.json({ ok: true });
}
