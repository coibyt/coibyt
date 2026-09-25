import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { addMinutes } from "date-fns";
import { z } from "zod";
import { sendBookingRescheduledEmail } from "@/lib/booking-service";

const schema = z.object({
  startsAt: z.string().datetime(),
  staffId: z.string().cuid(),
});

/** Drag-and-drop reschedule from the dashboard calendar: moves a booking to
 * a new time and/or staff member, re-running the same overlap check used at
 * booking creation so a drag can never silently double-book someone. */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("bookings");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const booking = await prisma.booking.findFirst({
    where: { id, businessId },
    include: { service: true },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (!["PENDING_PAYMENT", "CONFIRMED"].includes(booking.status)) {
    return NextResponse.json({ error: "CANNOT_RESCHEDULE" }, { status: 409 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const staff = await prisma.staff.findFirst({
    where: { id: parsed.data.staffId, businessId, active: true },
  });
  if (!staff) return NextResponse.json({ error: "STAFF_NOT_FOUND" }, { status: 404 });

  const startsAt = new Date(parsed.data.startsAt);
  const endsAt = addMinutes(startsAt, booking.service.durationMin + booking.service.bufferMin);

  try {
    const updated = await prisma.$transaction(async (tx) => {
      const conflict = await tx.booking.findFirst({
        where: {
          id: { not: id },
          staffId: parsed.data.staffId,
          status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
          startsAt: { lt: endsAt },
          endsAt: { gt: startsAt },
        },
        select: { id: true },
      });
      if (conflict) throw new Error("SLOT_UNAVAILABLE");

      return tx.booking.update({
        where: { id },
        data: { startsAt, endsAt, staffId: parsed.data.staffId },
      });
    });

    await sendBookingRescheduledEmail(id);

    return NextResponse.json({ booking: updated });
  } catch (err) {
    if (err instanceof Error && err.message === "SLOT_UNAVAILABLE") {
      return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });
    }
    console.error("[PATCH /api/business/bookings/[id]/reschedule]", err);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
