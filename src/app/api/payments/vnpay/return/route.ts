import { NextResponse } from "next/server";
import { verifyVnpaySignature } from "@/lib/payments/vnpay";
import { markBookingPaid } from "@/lib/booking-service";
import { prisma } from "@/lib/prisma";
import { sendMail, bookingConfirmationEmail } from "@/lib/mailer";

// VNPay redirects the *browser* here with vnp_* query params (this doubles
// as a lightweight IPN since we don't expose a separate server endpoint for
// it in the sandbox — VNPay's IPN also hits a configured URL server-side,
// but confirming on the return redirect keeps the sandbox flow simple).
export async function GET(req: Request) {
  const url = new URL(req.url);
  const query: Record<string, string> = {};
  url.searchParams.forEach((value, key) => (query[key] = value));

  const { valid, params } = verifyVnpaySignature(query);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;
  const bookingId = params.vnp_TxnRef;

  if (!valid || !bookingId) {
    return NextResponse.redirect(`${siteUrl}/booking/${bookingId ?? ""}/cancelled`);
  }

  const success = params.vnp_ResponseCode === "00";
  if (!success) {
    return NextResponse.redirect(`${siteUrl}/booking/${bookingId}/cancelled`);
  }

  const booking = await markBookingPaid(bookingId, "VNPAY", params);
  if (booking) {
    const full = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { business: true, service: true, customer: true },
    });
    if (full) {
      const email = bookingConfirmationEmail({
        customerName: full.customer.name,
        businessName: full.business.name,
        serviceName: full.service.name,
        startsAt: full.startsAt,
        locale: full.customer.locale,
      });
      await sendMail({ to: full.customer.email, ...email });
    }
  }

  return NextResponse.redirect(
    `${siteUrl}/booking/${bookingId}/success?provider=vnpay`
  );
}
