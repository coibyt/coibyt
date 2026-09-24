import { NextResponse } from "next/server";
import { verifyStripeWebhook } from "@/lib/payments/stripe";
import { markBookingPaid, sendBookingConfirmationEmail } from "@/lib/booking-service";
import type Stripe from "stripe";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const rawBody = await req.text();

  if (!signature) {
    return NextResponse.json({ error: "MISSING_SIGNATURE" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = verifyStripeWebhook(rawBody, signature);
  } catch (err) {
    console.error("[stripe webhook] signature verification failed", err);
    return NextResponse.json({ error: "INVALID_SIGNATURE" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const bookingId = session.metadata?.bookingId;
    if (bookingId) {
      await confirmAndNotify(bookingId, session);
    }
  }

  return NextResponse.json({ received: true });
}

async function confirmAndNotify(bookingId: string, rawResponse: unknown) {
  const booking = await markBookingPaid(bookingId, "STRIPE", rawResponse);
  if (!booking) return;
  await sendBookingConfirmationEmail(bookingId);
}
