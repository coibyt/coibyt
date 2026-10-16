import { prisma } from "@/lib/prisma";
import { addMinutes, format } from "date-fns";
import { createStripeCheckoutSession } from "@/lib/payments/stripe";
import {
  sendMail,
  bookingConfirmationEmail,
  bookingRescheduledEmail,
  ownerNewBookingEmail,
} from "@/lib/mailer";
import { localeForCountry } from "@/lib/countries";
import { sendPushToUser } from "@/lib/push";
import { toZonedTime } from "date-fns-tz";
import type { ComboAssignment } from "@/lib/availability";
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
  /** Lets the salon's own dashboard shorten/extend one specific booking
   * instead of always using the service's (+ add-ons'/extra services') fixed
   * duration — never accepted from the public customer-facing booking flow. */
  endsAtOverride?: Date;
  customerNote?: string;
  provider: BookingPaymentChoice;
  siteUrl: string;
  /** Add-on catalog item ids the customer selected — prices/durations are
   * always re-read from the DB here, never trusted from the request. */
  addOnIds?: string[];
  /** Other full services booked in the same visit (e.g. manicure + pedicure)
   * — same "never trust the client" treatment as addOnIds. */
  extraServiceIds?: string[];
  /** When the chosen slot splits services across different staff members
   * (see getAvailableSlots' combo computation) — always re-derived
   * server-side from that same availability engine right before this call,
   * never trusted as raw client input. Absent for an ordinary single-staff
   * booking. */
  assignments?: ComboAssignment[];
  /** The affiliate code from the customer's `varaaai_aff_<businessId>` cookie
   * (see AffiliateCookieSetter), if any — re-validated against this
   * business's own active affiliates here, never trusted as-is. */
  affiliateCode?: string;
  /** A GiftCardPurchase.code entered at checkout — re-validated here (not
   * trusted from the client), applied as a % discount on the base service
   * price, and redeemed (GiftCardRedemption + usesLeft decrement) alongside
   * the booking itself. Only valid for the exact service the gift card was
   * sold for. */
  discountCode?: string;
  /** Set when this checkout's guest form also created the customer's
   * account — passed through to the confirmation email so it can mention
   * the new account (never the password itself). */
  newAccountEmail?: string;
  /** Whether this booking gets any automated email at all (confirmation,
   * reschedule, cancellation, reminders) — always true for a customer's own
   * booking; only the salon's manual-add-booking form ever passes false. */
  sendNotificationEmails?: boolean;
  source?: "WEBSITE" | "MANUAL";
  /** The salon adding a booking itself may double-book a staff member. */
  allowOverlap?: boolean;
}) {
  const service = await prisma.service.findUniqueOrThrow({
    where: { id: params.serviceId },
    include: { business: { include: { owner: { select: { id: true, name: true, email: true } } } } },
  });
  if (service.business.status === "SUSPENDED") throw new Error("BUSINESS_SUSPENDED");
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

  const assignmentByServiceId = new Map((params.assignments ?? []).map((a) => [a.serviceId, a]));
  const primaryAssignment = params.assignments?.find((a) => a.key === "primary");

  const endsAt =
    params.endsAtOverride ??
    primaryAssignment?.endsAt ??
    addMinutes(
      params.startsAt,
      effectiveServiceDurationMin + addOnDurationSum + extraServiceDurationSum + service.bufferMin
    );

  // Same "read outside the transaction, trust it inside" treatment as the
  // affiliate lookup below — a gift-card code being redeemed twice in the
  // same instant by the same customer isn't a realistic race to guard against.
  const giftCardPurchase = params.discountCode
    ? await prisma.giftCardPurchase.findUnique({
        where: { code: params.discountCode.trim() },
        include: { giftCard: true },
      })
    : null;
  const discountValid =
    !!giftCardPurchase &&
    giftCardPurchase.status === "ACTIVE" &&
    giftCardPurchase.usesLeft > 0 &&
    (!giftCardPurchase.expiresAt || giftCardPurchase.expiresAt > new Date()) &&
    giftCardPurchase.businessId === params.businessId &&
    giftCardPurchase.giftCard.serviceId === params.serviceId;
  const discountCents = discountValid
    ? Math.round((effectiveServicePriceCents * giftCardPurchase!.giftCard.discountPercent) / 100)
    : 0;

  const totalPriceCents =
    effectiveServicePriceCents + addOnPriceSum + extraServicePriceSum - discountCents;

  const affiliate = params.affiliateCode
    ? await prisma.affiliate.findFirst({
        where: { code: params.affiliateCode, businessId: params.businessId, active: true },
      })
    : null;
  const affiliateCommissionCents = affiliate
    ? Math.round((totalPriceCents * affiliate.commissionPercent) / 100)
    : null;

  // A salon only starts earning its referring platform affiliate a cut once
  // its profile clears a minimum bar (an address, opening hours, and at
  // least one active service) — not the instant it's approved, since a
  // brand-new application usually has none of that yet. Checked on every
  // booking rather than once at signup, since the owner can take a while to
  // finish setting up after being approved.
  let platformAffiliate = null;
  if (service.business.referredByAffiliateId) {
    const [hoursCount, activeServiceCount] = await Promise.all([
      prisma.businessHours.count({ where: { businessId: params.businessId } }),
      prisma.service.count({ where: { businessId: params.businessId, active: true } }),
    ]);
    const profileComplete = !!service.business.addressLine && hoursCount > 0 && activeServiceCount > 0;
    if (profileComplete) {
      platformAffiliate = await prisma.platformAffiliate.findFirst({
        where: { id: service.business.referredByAffiliateId, active: true },
      });
    }
  }
  const platformAffiliateCommissionCents = platformAffiliate
    ? Math.round((totalPriceCents * platformAffiliate.commissionPercent) / 100)
    : null;

  const isOffline = params.provider === "CASH" || params.provider === "BANK_TRANSFER";

  const booking = await prisma.$transaction(async (tx) => {
    // A combo booking occupies several staff members at once, each for
    // their own window — check every one of them, not just the primary's,
    // and against both ordinary bookings and other bookings' own split-off
    // extra services (a staff member can be busy via either table).
    const conflictWindows =
      params.assignments && params.assignments.length > 0
        ? params.assignments.map((a) => ({ staffId: a.staffId, startsAt: a.startsAt, endsAt: a.endsAt }))
        : [{ staffId: params.staffId, startsAt: params.startsAt, endsAt }];

    for (const w of conflictWindows) {
      const conflict = await tx.booking.findFirst({
        where: {
          staffId: w.staffId,
          status: { in: ["PENDING_PAYMENT", "CONFIRMED"] },
          startsAt: { lt: w.endsAt },
          endsAt: { gt: w.startsAt },
        },
        select: { id: true },
      });
      if (conflict && !params.allowOverlap) throw new SlotUnavailableError();

      const extraConflict = await tx.bookingExtraService.findFirst({
        where: {
          staffId: w.staffId,
          startsAt: { lt: w.endsAt },
          endsAt: { gt: w.startsAt },
          booking: { status: { in: ["PENDING_PAYMENT", "CONFIRMED"] } },
        },
        select: { id: true },
      });
      if (extraConflict && !params.allowOverlap) throw new SlotUnavailableError();
    }

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
        affiliateId: affiliate?.id,
        affiliateCommissionCents,
        platformAffiliateId: platformAffiliate?.id,
        platformAffiliateCommissionCents,
        // Cash and bank transfer have nothing online to wait on, so they're
        // confirmed right away; online gateways stay PENDING_PAYMENT until
        // their callback fires.
        status: isOffline ? "CONFIRMED" : "PENDING_PAYMENT",
        source: params.source ?? "WEBSITE",
        notificationEmailsEnabled: params.sendNotificationEmails ?? true,
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
        data: extraServices.map((s) => {
          const a = assignmentByServiceId.get(s.id);
          return {
            bookingId: created.id,
            serviceId: s.id,
            name: s.name,
            priceCents: s.priceCents,
            durationMin: s.durationMin,
            staffId: a?.staffId,
            startsAt: a?.startsAt,
            endsAt: a?.endsAt,
          };
        }),
      });
    }

    if (discountValid) {
      await tx.giftCardRedemption.create({
        data: { purchaseId: giftCardPurchase!.id, bookingId: created.id },
      });
      await tx.giftCardPurchase.update({
        where: { id: giftCardPurchase!.id },
        data: { usesLeft: { decrement: 1 } },
      });
    }

    return created;
  });

  if (isOffline) {
    if (booking.notificationEmailsEnabled) {
      const email = bookingConfirmationEmail({
        customerName: params.customerName,
        businessName: service.business.name,
        serviceName: service.name,
        serviceDescription: service.description,
        startsAt: booking.startsAt,
        locale: localeForCountry(service.business.country),
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
        newAccountEmail: params.newAccountEmail,
      });
      await sendMail({ to: params.customerEmail, ...email });
      await notifyOwnerOfNewBooking({
        ownerId: service.business.owner.id,
        ownerName: service.business.owner.name,
        ownerEmail: service.business.owner.email,
        customerName: params.customerName,
        serviceName: service.name,
        startsAt: booking.startsAt,
        businessCountry: service.business.country,
        businessTimezone: service.business.timezone,
        businessName: service.business.name,
        siteUrl: params.siteUrl,
      });
    }

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

/** Emails the salon owner about a new customer booking, and — only when the
 * appointment itself falls on the salon's own current calendar day — also
 * pushes a bell notification, so the owner is alerted to check their phone
 * right away. A booking for tomorrow or later never pushes: the owner will
 * see it next time they open the dashboard, no urgency to interrupt them.
 * Email and push are independent best-effort channels, each in its own
 * try/catch, so one failing (e.g. SMTP misconfigured) never blocks the
 * other. */
async function notifyOwnerOfNewBooking(params: {
  ownerId: string;
  ownerName: string;
  ownerEmail: string;
  customerName: string;
  serviceName: string;
  startsAt: Date;
  businessCountry: string;
  businessTimezone: string;
  businessName: string;
  siteUrl: string;
}) {
  const locale = localeForCountry(params.businessCountry);
  const bookingsUrl = `${params.siteUrl}/${locale}/business/dashboard/bookings`;

  try {
    const email = ownerNewBookingEmail({
      ownerName: params.ownerName,
      customerName: params.customerName,
      serviceName: params.serviceName,
      startsAt: params.startsAt,
      locale,
      businessTimezone: params.businessTimezone,
      businessName: params.businessName,
      bookingsUrl,
    });
    await sendMail({ to: params.ownerEmail, ...email });
  } catch (err) {
    console.error("[notifyOwnerOfNewBooking email]", err);
  }

  try {
    const todayStr = format(toZonedTime(new Date(), params.businessTimezone), "yyyy-MM-dd");
    const bookingDayStr = format(toZonedTime(params.startsAt, params.businessTimezone), "yyyy-MM-dd");
    if (todayStr === bookingDayStr) {
      const time = params.startsAt.toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
        timeStyle: "short",
        timeZone: params.businessTimezone,
      });
      await sendPushToUser(params.ownerId, {
        title: locale === "vi" ? "Có lịch hẹn mới hôm nay" : "New booking today",
        body:
          locale === "vi"
            ? `${params.customerName} vừa đặt "${params.serviceName}" lúc ${time}`
            : `${params.customerName} just booked "${params.serviceName}" at ${time}`,
        url: bookingsUrl,
      });
    }
  } catch (err) {
    console.error("[notifyOwnerOfNewBooking push]", err);
  }
}

/** Builds and sends the confirmation email for an already-confirmed booking
 * — shared by the three online-payment webhooks (Stripe, MoMo, VNPay), each
 * of which only learns a booking is paid well after createBookingAndPayment
 * already returned. */
export async function sendBookingConfirmationEmail(bookingId: string) {
  const full = await prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      business: { include: { owner: { select: { id: true, name: true, email: true } } } },
      service: true,
      customer: true,
      staff: true,
    },
  });
  if (!full) return;
  if (!full.notificationEmailsEnabled) return;

  const email = bookingConfirmationEmail({
    customerName: full.customer.name,
    businessName: full.business.name,
    serviceName: full.service.name,
    serviceDescription: full.service.description,
    startsAt: full.startsAt,
    locale: localeForCountry(full.business.country),
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
  await notifyOwnerOfNewBooking({
    ownerId: full.business.owner.id,
    ownerName: full.business.owner.name,
    ownerEmail: full.business.owner.email,
    customerName: full.customer.name,
    serviceName: full.service.name,
    startsAt: full.startsAt,
    businessCountry: full.business.country,
    businessTimezone: full.business.timezone,
    businessName: full.business.name,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com",
  });
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
  if (!full.notificationEmailsEnabled) return;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

  const email = bookingRescheduledEmail({
    customerName: full.customer.name,
    businessName: full.business.name,
    serviceName: full.service.name,
    serviceDescription: full.service.description,
    startsAt: full.startsAt,
    locale: localeForCountry(full.business.country),
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
