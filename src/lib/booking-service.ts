import { prisma } from "@/lib/prisma";
import { addMinutes } from "date-fns";
import { createStripeCheckoutSession } from "@/lib/payments/stripe";
import { sendMail, bookingConfirmationEmail, bookingRescheduledEmail } from "@/lib/mailer";
import type { PaymentProvider } from "@prisma/client";

export class SlotUnavailableError extends Error {
  constructor() {
    super("SLOT_UNAVAILABLE");
  }
}

/** Online gateways (Stripe) create a Payment row and require a
 * redirect+callback. "CASH" and "BANK_TRANSFER" need neither — like cash,
 * a bank transfer has no automatic reconciliation, so the booking is
 * confirmed immediately and the salon checks their account manually. */
export type BookingPaymentChoice = PaymentProvider | "CASH";

/**
 * Creates the Booking (+ Payment row for online gateways) and kicks off the
 * chosen payment provider's checkout, returning the URL the browser should
 * redirect to. The overlap check is repeated inside the transaction (not
 * just trusted from the availability endpoint the client called earlier) to
 * close the race window between "browse slots" and "confirm booking".
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
  provider: BookingPaymentChoice;
  locale: "vi" | "en";
  siteUrl: string;
  /** Add-on catalog item ids the customer selected — prices/durations are
   * always re-read from the DB here, never trusted from the request. */
  addOnIds?: string[];
  /** Other full services booked in the same visit (e.g. manicure + pedicure)
   * — same "never trust the client" treatment as addOnIds. */
  extraServiceIds?: string[];
}) {
  const service = await prisma.service.findUniqueOrThrow({
    where: { id: params.serviceId },
    include: { business: true },
  });
  const staff = await prisma.staff.findUnique({ where: { id: params.staffId } });
  const staffOverride = await prisma.staffService.findUnique({
    where: { staffId_serviceId: { staffId: params.staffId, serviceId: params.serviceId } },
  });
  // A staff member can charge, or take, a different amount than the
  // service's own base price/duration — see StaffService.*Override.
  const effectiveServicePriceCents = staffOverride?.priceCentsOverride ?? service.priceCents;
  const effectiveServiceDurationMin = staffOverride?.durationMinOverride ?? service.durationMin;

  const addOns = params.addOnIds?.length
    ? await prisma.serviceAddOn.findMany({
        where: { id: { in: params.addOnIds }, businessId: params.businessId, active: true },
      })
    : [];
  const addOnDurationSum = addOns.reduce((sum, a) => sum + a.durationMin, 0);
  const addOnPriceSum = addOns.reduce((sum, a) => sum + a.priceCents, 0);

  const extraServices = params.extraServiceIds?.length
    ? await prisma.service.findMany({
        where: { id: { in: params.extraServiceIds }, businessId: params.businessId, active: true },
      })
    : [];
  const extraServiceDurationSum = extraServices.reduce((sum, s) => sum + s.durationMin, 0);
  const extraServicePriceSum = extraServices.reduce((sum, s) => sum + s.priceCents, 0);

  const endsAt = addMinutes(
    params.startsAt,
    effectiveServiceDurationMin + addOnDurationSum + extraServiceDurationSum + service.bufferMin
  );
  const totalPriceCents = effectiveServicePriceCents + addOnPriceSum + extraServicePriceSum;

  const isOffline = params.provider === "CASH" || params.provider === "BANK_TRANSFER";

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

    const created = await tx.booking.create({
      data: {
        businessId: params.businessId,
        serviceId: params.serviceId,
        staffId: params.staffId,
        customerId: params.customerId,
        startsAt: params.startsAt,
        endsAt,
        priceCents: totalPriceCents,
        depositCents: service.depositCents,
        currency: service.currency,
        customerNote: params.customerNote,
        // Cash and bank transfer have nothing online to wait on, so they're
        // confirmed right away; online gateways stay PENDING_PAYMENT until
        // their callback fires.
        status: isOffline ? "CONFIRMED" : "PENDING_PAYMENT",
      },
    });

    if (addOns.length > 0) {
      await tx.bookingAddOn.createMany({
        data: addOns.map((a) => ({
          bookingId: created.id,
          addOnId: a.id,
          name: a.name,
          priceCents: a.priceCents,
          durationMin: a.durationMin,
        })),
      });
    }

    if (extraServices.length > 0) {
      await tx.bookingExtraService.createMany({
        data: extraServices.map((s) => ({
          bookingId: created.id,
          serviceId: s.id,
          name: s.name,
          priceCents: s.priceCents,
          durationMin: s.durationMin,
        })),
      });
    }

    return created;
  });

  if (isOffline) {
    const email = bookingConfirmationEmail({
      customerName: params.customerName,
      businessName: service.business.name,
      serviceName: service.name,
      serviceDescription: service.description,
      startsAt: booking.startsAt,
      locale: params.locale,
      businessTimezone: service.business.timezone,
      priceCents: booking.priceCents,
      currency: booking.currency,
      staffName: staff?.name,
      staffMessage: staff?.staffMessage,
      businessAddress: service.business.addressLine,
      businessCity: service.business.city,
      googleMapsUrl: service.business.googleMapsUrl,
      businessPhone: service.business.phone,
      cancellationWindowHours: service.business.cancellationWindowHours,
      cancellationPolicy: service.business.cancellationPolicy,
      bankInfo:
        params.provider === "BANK_TRANSFER"
          ? {
              bankName: service.business.bankName,
              bankAccountNumber: service.business.bankAccountNumber,
              bankAccountName: service.business.bankAccountName,
              bankBic: service.business.bankBic,
            }
          : undefined,
    });
    await sendMail({ to: params.customerEmail, ...email });

    return {
      booking,
      redirectUrl: `${params.siteUrl}/booking/${booking.id}/success?provider=${
        params.provider === "CASH" ? "cash" : "bank_transfer"
      }`,
    };
  }

  const amountCents = booking.depositCents ?? booking.priceCents;

  const session = await createStripeCheckoutSession({
    bookingId: booking.id,
    amountCents,
    currency: booking.currency,
    serviceName: service.name,
    customerEmail: params.customerEmail,
    successUrl: `${params.siteUrl}/booking/${booking.id}/success?provider=stripe`,
    cancelUrl: `${params.siteUrl}/booking/${booking.id}/cancelled`,
  });
  await prisma.payment.create({
    data: {
      bookingId: booking.id,
      provider: "STRIPE",
      amountCents,
      currency: booking.currency,
      providerRef: session.id,
    },
  });

  return { booking, redirectUrl: session.url! };
}

/** Builds and sends the confirmation email for an already-confirmed booking
 * — shared by the three online-payment webhooks (Stripe, MoMo, VNPay), each
 * of which only learns a booking is paid well after createBookingAndPayment
 * already returned. */
export async function sendBookingConfirmationEmail(bookingId: string) {
  const full = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { business: true, service: true, customer: true, staff: true },
  });
  if (!full) return;

  const email = bookingConfirmationEmail({
    customerName: full.customer.name,
    businessName: full.business.name,
    serviceName: full.service.name,
    serviceDescription: full.service.description,
    startsAt: full.startsAt,
    locale: full.customer.locale,
    businessTimezone: full.business.timezone,
    priceCents: full.priceCents,
    currency: full.currency,
    staffName: full.staff?.name,
    staffMessage: full.staff?.staffMessage,
    businessAddress: full.business.addressLine,
    businessCity: full.business.city,
    googleMapsUrl: full.business.googleMapsUrl,
    businessPhone: full.business.phone,
    cancellationWindowHours: full.business.cancellationWindowHours,
    cancellationPolicy: full.business.cancellationPolicy,
  });
  await sendMail({ to: full.customer.email, ...email });
}

/** Notifies the customer by email whenever the salon (not the customer
 * themself) moves a booking to a new time/staff from the dashboard calendar
 * — see /api/business/bookings/[id]/reschedule. */
export async function sendBookingRescheduledEmail(bookingId: string) {
  const full = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: { business: true, service: true, customer: true, staff: true },
  });
  if (!full) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

  const email = bookingRescheduledEmail({
    customerName: full.customer.name,
    businessName: full.business.name,
    serviceName: full.service.name,
    serviceDescription: full.service.description,
    startsAt: full.startsAt,
    locale: full.customer.locale,
    businessTimezone: full.business.timezone,
    priceCents: full.priceCents,
    currency: full.currency,
    staffName: full.staff?.name,
    businessAddress: full.business.addressLine,
    businessCity: full.business.city,
    googleMapsUrl: full.business.googleMapsUrl,
    businessPhone: full.business.phone,
    cancellationWindowHours: full.business.cancellationWindowHours,
    cancellationPolicy: full.business.cancellationPolicy,
    manageBookingUrl: `${siteUrl}/account/bookings`,
  });
  await sendMail({ to: full.customer.email, ...email });
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
