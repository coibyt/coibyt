import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) throw new Error("STRIPE_SECRET_KEY is not set");
    _stripe = new Stripe(key);
  }
  return _stripe;
}

/**
 * Creates a Stripe Checkout Session in the merchant's current mode — this
 * will be **test mode** as long as STRIPE_SECRET_KEY is a sk_test_ key, which
 * is what .env.example ships with. Switch to a live key once the client has
 * a verified Stripe account.
 */
export async function createStripeCheckoutSession(params: {
  bookingId: string;
  amountCents: number;
  currency: string;
  serviceName: string;
  customerEmail: string;
  successUrl: string;
  cancelUrl: string;
}) {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    mode: "payment",
    customer_email: params.customerEmail,
    line_items: [
      {
        price_data: {
          currency: params.currency.toLowerCase(),
          unit_amount: normalizeToStripeUnit(params.amountCents, params.currency),
          product_data: { name: params.serviceName },
        },
        quantity: 1,
      },
    ],
    metadata: { bookingId: params.bookingId },
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
  });
}

// Stripe expects the smallest currency unit too, but for zero-decimal
// currencies (VND, JPY, ...) that IS the whole unit — same as our own
// priceCents convention, so no conversion needed there.
function normalizeToStripeUnit(amountCents: number, currency: string) {
  const zeroDecimal = new Set(["VND", "JPY", "KRW"]);
  return zeroDecimal.has(currency.toUpperCase()) ? amountCents : amountCents;
}

export function verifyStripeWebhook(rawBody: string, signature: string) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}
