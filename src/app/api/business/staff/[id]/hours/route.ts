import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess, requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { businessHoursSchema } from "@/lib/validations";

const dateString = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable();

const putSchema = z.object({
  /** Period being saved. */
  from: dateString.optional(),
  until: dateString.optional(),
  /** Period being replaced — omitted means the open-ended (no range) one. */
  oldFrom: dateString.optional(),
  oldUntil: dateString.optional(),
  hours: businessHoursSchema,
});

async function assertOwnership(businessId: string, staffId: string) {
  return prisma.staff.findFirst({ where: { id: staffId, businessId } });
}

/** Owners can read any staff member's schedule; staff can only read their own. */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (!access.isOwner && access.staffId !== id) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  if (!(await assertOwnership(access.business.id, id))) {
    return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  }

  const hours = await prisma.staffHours.findMany({ where: { staffId: id } });
  return NextResponse.json({ hours });
}

/** Saves one schedule period for the staff member. A period is identified by
 * its date range; saving replaces the period being edited and any other period
 * with the same range. An empty `hours` array means "no custom schedule" for
 * that period (they follow the salon's own opening hours). Accepts the old bare
 * array too, which saves the open-ended period. */
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

  const raw = await req.json();
  const parsed = Array.isArray(raw)
    ? businessHoursSchema.safeParse(raw).success
      ? { success: true as const, data: { hours: raw, from: null, until: null, oldFrom: null, oldUntil: null } }
      : { success: false as const, error: { flatten: () => ({}) } }
    : putSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const { hours, from, until, oldFrom, oldUntil } = parsed.data;

  if (from && until && from > until) {
    return NextResponse.json({ error: "INVALID_RANGE" }, { status: 400 });
  }
  const newFrom = from ?? null;
  const newUntil = until ?? null;

  await prisma.$transaction([
    prisma.staffHours.deleteMany({
      where: {
        staffId: id,
        OR: [
          { validFrom: oldFrom ?? null, validUntil: oldUntil ?? null },
          { validFrom: newFrom, validUntil: newUntil },
        ],
      },
    }),
    ...(hours.length > 0
      ? [
          prisma.staffHours.createMany({
            data: hours.map((h) => ({
              ...h,
              staffId: id,
              validFrom: newFrom,
              validUntil: newUntil,
            })),
          }),
        ]
      : []),
  ]);

  return NextResponse.json({ ok: true });
}
