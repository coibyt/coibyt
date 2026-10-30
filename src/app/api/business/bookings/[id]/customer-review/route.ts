import { NextResponse } from "next/server";
import { z } from "zod";
import {
  bookingActionScope,
  customerScopeBusinessIds,
  getBusinessAccess,
} from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { emailCustomerReview } from "@/lib/customer-review";

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  note: z.string().max(1000).optional(),
});

/** A salon rating its own customer — only makes sense once the appointment
 * time has actually passed, and never for a cancelled booking (there was no
 * visit to rate). One per booking, same as the customer's own Review. A
 * staff member's rating stays PENDING until the owner approves it, and only
 * then is the customer emailed. */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const scopeIds = await customerScopeBusinessIds(access);
  const scopeStaffId = bookingActionScope(access);

  const booking = await prisma.booking.findFirst({
    where: {
      id,
      businessId: { in: scopeIds },
      ...(scopeStaffId ? { staffId: scopeStaffId } : {}),
    },
    include: { customerReview: true },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (booking.status === "CANCELLED") {
    return NextResponse.json({ error: "BOOKING_CANCELLED" }, { status: 409 });
  }
  if (booking.endsAt > new Date()) {
    return NextResponse.json({ error: "BOOKING_NOT_ENDED" }, { status: 409 });
  }
  if (booking.customerReview) {
    return NextResponse.json({ error: "ALREADY_REVIEWED" }, { status: 409 });
  }

  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  // A staff member's rating waits for the owner; the owner's goes out at once.
  const review = await prisma.customerReview.create({
    data: {
      bookingId: id,
      businessId: booking.businessId,
      customerId: booking.customerId,
      rating: parsed.data.rating,
      note: parsed.data.note,
      status: access.isOwner ? "APPROVED" : "PENDING",
      staffId: access.isOwner ? null : access.staffId,
      approvedAt: access.isOwner ? new Date() : null,
    },
  });
  if (access.isOwner) await emailCustomerReview(review.id);

  return NextResponse.json({ review });
}
