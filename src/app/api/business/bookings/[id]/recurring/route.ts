import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingActionScope, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { cancelRemainingInSeries, createRecurringSeries, MAX_SERIES_LENGTH } from "@/lib/recurring";

const schema = z
  .object({
    everyWeeks: z.number().int().min(1).max(12),
    count: z.number().int().min(1).max(MAX_SERIES_LENGTH).optional().nullable(),
    untilDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional().nullable(),
  })
  .refine((d) => d.count || d.untilDate, { message: "count or untilDate" });

async function ownBooking(id: string) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) return null;
  const scopeStaffId = bookingActionScope(access);
  const booking = await prisma.booking.findFirst({
    where: { id, businessId: access.business.id, ...(scopeStaffId ? { staffId: scopeStaffId } : {}) },
    select: { id: true, status: true },
  });
  return booking ? { access, booking } : null;
}

/** Repeats this booking every N weeks (src/lib/recurring.ts): the next
 * bookings are created now, skipping dates where the staff member is busy. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const own = await ownBooking(id);
  if (!own) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  if (own.booking.status === "CANCELLED" || own.booking.status === "NO_SHOW") {
    return NextResponse.json({ error: "CANNOT_REPEAT" }, { status: 409 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  try {
    const result = await createRecurringSeries(id, parsed.data);
    return NextResponse.json(result, { status: 201 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg === "ALREADY_REPEATING" || msg === "IN_SERIES") return NextResponse.json({ error: msg }, { status: 409 });
    console.error("[POST recurring]", err);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}

/** Cancels the rest of this booking's series (future bookings only). */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const own = await ownBooking(id);
  if (!own) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const cancelled = await cancelRemainingInSeries(id, own.access.business.id);
  return NextResponse.json({ cancelled });
}
