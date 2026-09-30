import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { sendMail, ownerBookingCancelledEmail } from "@/lib/mailer";
import { localeForCountry } from "@/lib/countries";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "UNAUTHENTICATED" }, { status: 401 });
  }

  const booking = await prisma.booking.findFirst({
    where: { id, customerId: session.user.id },
    include: {
      business: {
        include: { owner: { select: { name: true, email: true } } },
      },
      service: { select: { name: true } },
      customer: { select: { name: true } },
    },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (!["PENDING_PAYMENT", "CONFIRMED"].includes(booking.status)) {
    return NextResponse.json({ error: "CANNOT_CANCEL" }, { status: 409 });
  }

  const hoursUntilStart = (booking.startsAt.getTime() - Date.now()) / 3_600_000;
  if (hoursUntilStart < booking.business.cancellationWindowHours) {
    return NextResponse.json({ error: "CANCELLATION_WINDOW_PASSED" }, { status: 409 });
  }

  const updated = await prisma.booking.update({
    where: { id },
    data: { status: "CANCELLED", cancelReason: "CANCELLED_BY_CUSTOMER" },
  });

  if (booking.notificationEmailsEnabled) {
    try {
      const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
      const locale = localeForCountry(booking.business.country);
      await sendMail({
        to: booking.business.owner.email,
        ...ownerBookingCancelledEmail({
          ownerName: booking.business.owner.name,
          customerName: booking.customer.name,
          serviceName: booking.service.name,
          startsAt: booking.startsAt,
          locale,
          businessTimezone: booking.business.timezone,
          businessName: booking.business.name,
          bookingsUrl: `${siteUrl}/${locale}/business/dashboard/bookings`,
        }),
      });
    } catch (err) {
      console.error("[customer cancel: owner notification]", err);
    }
  }

  return NextResponse.json({ booking: updated });
}
