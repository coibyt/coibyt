import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { notifyWaitlistForBooking } from "@/lib/waitlist";

const schema = z.object({ bookingId: z.string().cuid() });

/** "Tell the N waiting" after the salon cancelled a booking: everyone whose
 * service, staff and dates match that booking's slot gets the email + push. */
export async function POST(req: Request) {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const booking = await prisma.booking.findFirst({
    where: { id: parsed.data.bookingId, businessId: access.business.id },
    select: { id: true },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const sent = await notifyWaitlistForBooking(booking.id, { force: true });
  return NextResponse.json({ sent });
}
