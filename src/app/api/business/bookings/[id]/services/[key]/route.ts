import { NextResponse } from "next/server";
import { z } from "zod";
import { addMinutes } from "date-fns";
import { bookingStaffScope, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { serviceSlots } from "@/lib/booking-slots";
import { sendBookingRescheduledEmail } from "@/lib/booking-service";

const schema = z.object({
  startsAt: z.string().datetime(),
  staffId: z.string().cuid(),
});

/** Moves one service inside a booking — the main service ("primary") or one
 * of its extra services — to a new time and staff member. Checks the target
 * staff's other bookings, extra services and time off, so a move can never
 * double-book anyone. */
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string; key: string }> }
) {
  const { id, key } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const businessId = access.business.id;
  const scopeStaffId = bookingStaffScope(access);

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  if (scopeStaffId && parsed.data.staffId !== scopeStaffId) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const booking = await prisma.booking.findFirst({
    where: {
      id,
      businessId,
      ...(scopeStaffId
        ? {
            OR: [
              { staffId: scopeStaffId },
              { extraServices: { some: { staffId: scopeStaffId } } },
            ],
          }
        : {}),
    },
    include: {
      addOns: { select: { priceCents: true, durationMin: true } },
      extraServices: {
        select: {
          id: true,
          name: true,
          priceCents: true,
          durationMin: true,
          staffId: true,
          startsAt: true,
          endsAt: true,
          staff: { select: { name: true } },
        },
        orderBy: { id: "asc" },
      },
      service: { select: { name: true } },
      staff: { select: { name: true } },
    },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (!["PENDING_PAYMENT", "CONFIRMED"].includes(booking.status)) {
    return NextResponse.json({ error: "CANNOT_RESCHEDULE" }, { status: 409 });
  }

  const slots = serviceSlots(booking);
  const target = slots.find((s) => s.key === key);
  if (!target) return NextResponse.json({ error: "SERVICE_NOT_FOUND" }, { status: 404 });

  const newStart = new Date(parsed.data.startsAt);
  const durationMs = target.endsAt.getTime() - target.startsAt.getTime();
  const newEnd = new Date(newStart.getTime() + durationMs);
  const newStaffId = parsed.data.staffId;

  const staff = await prisma.staff.findFirst({
    where: { id: newStaffId, businessId, active: true },
  });
  if (!staff) return NextResponse.json({ error: "STAFF_NOT_FOUND" }, { status: 404 });

  // Everything that could hold this staff member's time: other bookings'
  // main services, their extra services that have a time, and this booking's
  // own other services — minus the one being moved, which is free to leave
  // its old slot.
  const [otherBookings, otherExtras, timeOff] = await Promise.all([
    prisma.booking.findMany({
      where: {
        businessId,
        id: { not: id },
        staffId: newStaffId,
        status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
        startsAt: { lt: newEnd },
        endsAt: { gt: newStart },
      },
      select: { id: true },
    }),
    prisma.bookingExtraService.findMany({
      where: {
        staffId: newStaffId,
        startsAt: { lt: newEnd },
        endsAt: { gt: newStart },
        booking: { status: { in: ["PENDING_PAYMENT", "CONFIRMED"] }, businessId },
        ...(key === "primary" ? {} : { id: { not: key } }),
      },
      select: { id: true },
    }),
    prisma.staffTimeOff.findFirst({
      where: { staffId: newStaffId, startsAt: { lt: newEnd }, endsAt: { gt: newStart } },
      select: { id: true },
    }),
  ]);
  if (timeOff) return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });
  if (otherBookings.length > 0 || otherExtras.length > 0) {
    return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });
  }

  // The moved booking's own services on the same staff member must not overlap.
  const ownOverlap = slots.some(
    (s) =>
      s.key !== key &&
      s.staffId === newStaffId &&
      s.startsAt < newEnd &&
      s.endsAt > newStart
  );
  if (ownOverlap) return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });

  const placed = booking.extraServices.every((e) => e.startsAt && e.endsAt);

  try {
    await prisma.$transaction(async (tx) => {
      // The first move turns the booking's back-to-back layout into explicit
      // times for every extra service, so later moves don't shift each other.
      if (!placed) {
        for (const sl of slots) {
          if (sl.kind !== "extra") continue;
          await tx.bookingExtraService.update({
            where: { id: sl.key },
            data: { startsAt: sl.startsAt, endsAt: sl.endsAt, staffId: sl.staffId },
          });
        }
      }

      if (key === "primary") {
        await tx.booking.update({
          where: { id },
          data: {
            startsAt: newStart,
            endsAt: newEnd,
            staffId: newStaffId,
            reminder24hSentAt: null,
            reminder2hSentAt: null,
            reminder15minSentAt: null,
          },
        });
      } else {
        await tx.bookingExtraService.update({
          where: { id: key },
          data: { startsAt: newStart, endsAt: newEnd, staffId: newStaffId },
        });
      }

      // The booking's own span is the main service's time only; extras keep
      // their own times in their rows. Recomputed after a primary move so it
      // always matches the primary service.
      if (!placed && key !== "primary") {
        const primary = slots.find((s) => s.key === "primary");
        if (primary) {
          await tx.booking.update({
            where: { id },
            data: { endsAt: primary.endsAt },
          });
        }
      }
    });
  } catch {
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }

  if (key === "primary" && newStart.getTime() !== booking.startsAt.getTime()) {
    await sendBookingRescheduledEmail(id);
  }

  return NextResponse.json({
    ok: true,
    startsAt: newStart.toISOString(),
    endsAt: addMinutes(newStart, durationMs / 60_000).toISOString(),
  });
}
