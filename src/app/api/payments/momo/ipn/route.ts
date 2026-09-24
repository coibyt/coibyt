import { NextResponse } from "next/server";
import { verifyMomoSignature, type MomoIpnPayload } from "@/lib/payments/momo";
import { markBookingPaid, sendBookingConfirmationEmail } from "@/lib/booking-service";

// Server-to-server notification MoMo calls directly (MOMO_IPN_URL) —
// authoritative source of truth for payment status, independent of whether
// the customer's browser makes it back to MOMO_REDIRECT_URL.
export async function POST(req: Request) {
  const payload = (await req.json()) as MomoIpnPayload;

  if (!verifyMomoSignature(payload)) {
    return NextResponse.json({ error: "INVALID_SIGNATURE" }, { status: 400 });
  }

  const bookingId = payload.orderId;
  const success = Number(payload.resultCode) === 0;

  if (success) {
    const booking = await markBookingPaid(bookingId, "MOMO", payload);
    if (booking) {
      await sendBookingConfirmationEmail(bookingId);
    }
  }

  // MoMo expects a 204/200 with this exact shape to stop retrying.
  return NextResponse.json({ resultCode: 0, message: "Confirm Success" });
}
