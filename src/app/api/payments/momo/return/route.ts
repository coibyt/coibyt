import { NextResponse } from "next/server";

// MoMo redirects the *browser* here after payment. The IPN endpoint
// (/api/payments/momo/ipn) is the authoritative confirmation; this route
// just sends the customer to the right result page based on resultCode.
export async function GET(req: Request) {
  const url = new URL(req.url);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? url.origin;
  const bookingId = url.searchParams.get("orderId");
  const resultCode = url.searchParams.get("resultCode");

  if (!bookingId) {
    return NextResponse.redirect(`${siteUrl}/`);
  }

  const success = resultCode === "0";
  return NextResponse.redirect(
    success
      ? `${siteUrl}/booking/${bookingId}/success?provider=momo`
      : `${siteUrl}/booking/${bookingId}/cancelled`
  );
}
