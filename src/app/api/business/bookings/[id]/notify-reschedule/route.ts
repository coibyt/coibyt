import { NextResponse } from "next/server";
import { bookingActionScope, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendBookingRescheduledEmail } from "@/lib/booking-service";

/** After moving a booking on the calendar, the salon chose "send email": the
 * customer gets the usual "your booking has a new time" email. */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const scopeStaffId = bookingActionScope(access);
  const booking = await prisma.booking.findFirst({
    where: {
      id,
      businessId: access.business.id,
      status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
      ...(scopeStaffId ? { staffId: scopeStaffId } : {}),
    },
    select: { id: true },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  try {
    const sent = await sendBookingRescheduledEmail(id, { force: true });
    if (!sent) return NextResponse.json({ error: "NO_EMAIL" }, { status: 409 });
  } catch (err) {
    console.error("[notify-reschedule]", id, err);
    return NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
