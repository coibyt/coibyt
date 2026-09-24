import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { businessHoursSchema } from "@/lib/validations";

async function assertOwnership(businessId: string, staffId: string) {
  return prisma.staff.findFirst({ where: { id: staffId, businessId } });
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!(await assertOwnership(owned.businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const hours = await prisma.staffHours.findMany({ where: { staffId: id } });
  return NextResponse.json({ hours });
}

/** Replaces the staff member's full weekly schedule in one call. An empty
 * array means "no custom schedule" — they simply follow the business's own
 * opening hours (see src/lib/availability.ts). */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!(await assertOwnership(owned.businessId, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const parsed = businessHoursSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await prisma.$transaction([
    prisma.staffHours.deleteMany({ where: { staffId: id } }),
    ...(parsed.data.length > 0
      ? [
          prisma.staffHours.createMany({
            data: parsed.data.map((h) => ({ ...h, staffId: id })),
          }),
        ]
      : []),
  ]);

  return NextResponse.json({ ok: true });
}
