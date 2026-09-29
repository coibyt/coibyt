import { NextResponse } from "next/server";
import { requireSectionBusinessId } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { addMinutes } from "date-fns";
import { z } from "zod";
import { sendBookingRescheduledEmail } from "@/lib/booking-service";

const patchSchema = z.object({
  status: z.enum(["CONFIRMED", "COMPLETED", "CANCELLED", "NO_SHOW"]).optional(),
  cancelReason: z.enum(["CANCELLED_BY_CUSTOMER", "CANCELLED_BY_SALON"]).optional(),
  // Editable booking details — all optional, and independent of a status
  // change, so the dashboard's "edit booking" form can send only what the
  // salon actually changed.
  serviceId: z.string().cuid().optional(),
  staffId: z.string().cuid().optional(),
  startsAt: z.string().datetime().optional(),
  priceCents: z.number().int().min(0).optional(),
  customerNote: z.string().max(1000).optional(),
  customerName: z.string().min(1).max(120).optional(),
  customerPhone: z.string().min(1).max(30).optional(),
  customerEmail: z.string().email().optional(),
});

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const businessId = await requireSectionBusinessId("bookings");
  if (!businessId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const booking = await prisma.booking.findFirst({
    where: { id, businessId },
    include: { service: true, customer: true },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const parsed = patchSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;

  if (data.status) {
    const updated = await prisma.booking.update({
      where: { id },
      data: { status: data.status, cancelReason: data.cancelReason },
    });
    return NextResponse.json({ booking: updated });
  }

  const editsContact = data.customerName !== undefined || data.customerPhone !== undefined || data.customerEmail !== undefined;

  if (
    data.serviceId === undefined &&
    data.staffId === undefined &&
    data.startsAt === undefined &&
    !editsContact &&
    data.priceCents === undefined &&
    data.customerNote === undefined
  ) {
    return NextResponse.json({ error: "NO_CHANGES" }, { status: 400 });
  }

  try {
    if (editsContact) {
      if (data.customerEmail && data.customerEmail !== booking.customer.email) {
        const conflict = await prisma.user.findUnique({ where: { email: data.customerEmail } });
        if (conflict && conflict.id !== booking.customerId) {
          return NextResponse.json({ error: "EMAIL_IN_USE" }, { status: 409 });
        }
      }
      await prisma.user.update({
        where: { id: booking.customerId },
        data: {
          name: data.customerName,
          phone: data.customerPhone,
          email: data.customerEmail,
        },
      });
    }

    let service = booking.service;
    if (data.serviceId && data.serviceId !== booking.serviceId) {
      const newService = await prisma.service.findFirst({
        where: { id: data.serviceId, businessId, active: true },
      });
      if (!newService) return NextResponse.json({ error: "SERVICE_NOT_FOUND" }, { status: 404 });
      service = newService;
    }

    const staffId = data.staffId ?? booking.staffId;
    if (data.staffId && data.staffId !== booking.staffId) {
      const staff = await prisma.staff.findFirst({
        where: { id: data.staffId, businessId, active: true },
      });
      if (!staff) return NextResponse.json({ error: "STAFF_NOT_FOUND" }, { status: 404 });
    }

    const startsAt = data.startsAt ? new Date(data.startsAt) : booking.startsAt;
    const endsAt = addMinutes(startsAt, service.durationMin + service.bufferMin);

    // Only treat this as an actual schedule change (re-check overlap, reset
    // reminders, email the customer) when the service, staff or start time
    // genuinely differ from what's already saved — the edit form always
    // resubmits all three fields, even when the salon only fixed a phone
    // number or price.
    const scheduleChanged =
      service.id !== booking.serviceId ||
      staffId !== booking.staffId ||
      startsAt.getTime() !== booking.startsAt.getTime();

    const updated = await prisma.$transaction(async (tx) => {
      if (scheduleChanged && staffId) {
        const conflict = await tx.booking.findFirst({
          where: {
            id: { not: id },
            staffId,
            status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
            startsAt: { lt: endsAt },
            endsAt: { gt: startsAt },
          },
          select: { id: true },
        });
        if (conflict) throw new Error("SLOT_UNAVAILABLE");
      }

      return tx.booking.update({
        where: { id },
        data: {
          serviceId: service.id,
          staffId,
          ...(scheduleChanged ? { startsAt, endsAt } : {}),
          ...(data.priceCents !== undefined ? { priceCents: data.priceCents } : {}),
          ...(data.customerNote !== undefined ? { customerNote: data.customerNote } : {}),
          ...(scheduleChanged
            ? { reminder24hSentAt: null, reminder2hSentAt: null, reminder15minSentAt: null }
            : {}),
        },
      });
    });

    if (scheduleChanged) {
      await sendBookingRescheduledEmail(id);
    }

    return NextResponse.json({ booking: updated });
  } catch (err) {
    if (err instanceof Error && err.message === "SLOT_UNAVAILABLE") {
      return NextResponse.json({ error: "SLOT_UNAVAILABLE" }, { status: 409 });
    }
    console.error("[PATCH /api/business/bookings/[id]]", err);
    return NextResponse.json({ error: "INTERNAL_ERROR" }, { status: 500 });
  }
}
