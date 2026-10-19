import { NextResponse } from "next/server";
import { z } from "zod";
import {
  bookingStaffScope,
  customerScopeBusinessIds,
  getBusinessAccess,
} from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendMail, ownerReviewedYouEmail } from "@/lib/mailer";
import { localeForCountry } from "@/lib/countries";

const schema = z.object({
  rating: z.number().int().min(1).max(5),
  note: z.string().max(1000).optional(),
});

/** A salon rating its own customer — only makes sense once the appointment
 * time has actually passed, and never for a cancelled booking (there was no
 * visit to rate). One per booking, same as the customer's own Review. */
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
  const scopeStaffId = bookingStaffScope(access);

  const booking = await prisma.booking.findFirst({
    where: {
      id,
      businessId: { in: scopeIds },
      ...(scopeStaffId ? { staffId: scopeStaffId } : {}),
    },
    include: { business: true, customer: true, customerReview: true },
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

  const review = await prisma.customerReview.create({
    data: {
      bookingId: id,
      businessId: booking.businessId,
      customerId: booking.customerId,
      rating: parsed.data.rating,
      note: parsed.data.note,
    },
  });

  // Best-effort — a mail failure (e.g. SMTP misconfigured) must never make
  // the rating itself look like it failed to save when it already has.
  try {
    const email = ownerReviewedYouEmail({
      customerName: booking.customer.name,
      businessName: booking.business.name,
      rating: parsed.data.rating,
      locale: localeForCountry(booking.business.country),
      businessLogoUrl: booking.business.logoUrl,
    });
    await sendMail({ to: booking.customer.email, ...email });
  } catch (err) {
    console.error("[POST /api/business/bookings/[id]/customer-review] mail failed", err);
  }

  return NextResponse.json({ review });
}
