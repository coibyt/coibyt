import { prisma } from "@/lib/prisma";
import { addMinutes } from "date-fns";
import { createStripeCheckoutSession } from "@/lib/payments/stripe";
import { buildVnpayPaymentUrl } from "@/lib/payments/vnpay";
import { createMomoPayment } from "@/lib/payments/momo";
import type { PaymentProvider } from "@prisma/client";

export class SlotUnavailableError extends Error {
  constructor() {
    super("SLOT_UNAVAILABLE");
  }
}

/**
 * Creates the Booking + Payment rows and kicks off the chosen payment
 * provider's checkout, returning the URL the browser should redirect to.
 * The overlap check is repeated inside the transaction (not just trusted
 * from the availability endpoint the client called earlier) to close the
 * race window between "browse slots" and "confirm booking".
 */
export async function createBookingAndPayment(params: {
  customerId: string;
  customerEmail: string;
  customerName: string;
  businessId: string;
  serviceId: string;
  staffId: string; // resolved concrete staff, even for "any staff" bookings
  startsAt: Date;
  customerNote?: string;
  provider: PaymentProvider;
  locale: "vi" | "en";
  siteUrl: string;
  ipAddr: string;
}) {
  const service = await prisma.service.findUniqueOrThrow({
    where: { id: params.serviceId },
    include: { business: true },
  });
  const endsAt = addMinutes(
    params.startsAt,
    service.durationMin + service.bufferMin
  );

  const booking = await prisma.$transaction(async (tx) => {
    const conflict = await tx.booking.findFirst({
      where: {
        staffId: params.staffId,
        status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
        startsAt: { lt: endsAt },
        endsAt: { gt: params.startsAt },
      },
      select: { id: true },
    });
    if (conflict) throw new SlotUnavailableError();

    return tx.booking.create({
      data: {
        businessId: params.businessId,
        serviceId: params.serviceId,
        staffId: params.staffId,
        customerId: params.customerId,
        startsAt: params.startsAt,
        endsAt,
        priceCents: service.priceCents,
        depositCents: service.depositCents,
        currency: service.currency,
        customerNote: params.customerNote,
        status: "PENDING_PAYMENT",
      },
    });
  });

  const amountCents = booking.depositCents ?? booking.priceCents;
  const orderInfo = `VaraaAi #${booking.id} - ${service.name}`;

  let redirectUrl: string;

  if (params.provider === "STRIPE") {
    const session = await createStripeCheckoutSession({
      bookingId: booking.id,
      amountCents,
      currency: booking.currency,
      serviceName: service.name,
      customerEmail: params.customerEmail,
      successUrl: `${params.siteUrl}/booking/${booking.id}/success?provider=stripe`,
      cancelUrl: `${params.siteUrl}/booking/${booking.id}/cancelled`,
    });
    redirectUrl = session.url!;
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        provider: "STRIPE",
        amountCents,
        currency: booking.currency,
        providerRef: session.id,
      },
    });
  } else if (params.provider === "VNPAY") {
    redirectUrl = buildVnpayPaymentUrl({
      txnRef: booking.id,
      amountCents,
      orderInfo,
      ipAddr: params.ipAddr,
      locale: params.locale === "vi" ? "vn" : "en",
    });
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        provider: "VNPAY",
        amountCents,
        currency: booking.currency,
        providerRef: booking.id,
      },
    });
  } else {
    const momoRes = await createMomoPayment({
      orderId: booking.id,
      requestId: `${booking.id}-${Date.now()}`,
      amountCents,
      orderInfo,
    });
    if (!momoRes.payUrl) {
      throw new Error(`MoMo did not return a payUrl: ${momoRes.message}`);
    }
    redirectUrl = momoRes.payUrl;
    await prisma.payment.create({
      data: {
        bookingId: booking.id,
        provider: "MOMO",
        amountCents,
        currency: booking.currency,
        providerRef: booking.id,
      },
    });
  }

  return { booking, redirectUrl };
}

/** Marks a booking as paid/confirmed and returns it, idempotently. */
export async function markBookingPaid(
  bookingId: string,
  provider: PaymentProvider,
  rawResponse?: unknown
) {
  return prisma.$transaction(async (tx) => {
    const booking = await tx.booking.findUnique({ where: { id: bookingId } });
    if (!booking) return null;
    if (booking.status === "CONFIRMED") return booking; // already processed

    await tx.payment.update({
      where: { bookingId },
      data: {
        status: "SUCCEEDED",
        rawResponse: rawResponse ? JSON.stringify(rawResponse) : undefined,
      },
    });

    return tx.booking.update({
      where: { id: bookingId },
      data: { status: "CONFIRMED" },
    });
  });
}
