import { randomBytes } from "crypto";
import { formatInTimeZone } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { awardPoints } from "@/lib/vara-points";
import { sendPushToUser } from "@/lib/push";
import { localeForCountry } from "@/lib/countries";
import { bookingProtectStrings } from "@/lib/booking-protect-strings";
import { sendMail, salonBrand, salonFooter, ownerBookingCancelledEmail } from "@/lib/mailer";
import { emailStaffAboutBooking } from "@/lib/staff-booking-email";
import { dateParts } from "@/lib/email/calendar";
import { C, appointmentHeader, button, emailLayout, esc, greeting, hairline, notice, panel, para, rows } from "@/lib/email/ui";

/** No-show protection without prepayment — see Business.noShowApprovalOn,
 * autoCancelUnconfirmedHours and onTimePoints, and the confirm* columns on
 * Booking. The pieces: a confirm request in the 24h reminder, a page the
 * customer confirms or cancels on, "awaiting approval" for repeat
 * no-shows, auto-cancel of unconfirmed bookings, and VaraPoints for a
 * completed visit. */

/** Statuses that hold a staff member's time (a booking awaiting the salon's
 * approval holds it too, so nobody else can take the slot meanwhile). */
export const LIVE_STATUSES = ["PENDING_PAYMENT", "CONFIRMED", "PENDING_APPROVAL"] as const;

export const AUTO_CANCEL_REASON = "AUTO_UNCONFIRMED";

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

/** How many times this customer didn't turn up, or cancelled late (inside
 * the salon's own self-cancel window), at this business. Counts from the
 * bookings themselves, so nothing needs to be kept in sync. */
export async function customerReliability(businessId: string, customerId: string, cancellationWindowHours: number) {
  const past = await prisma.booking.findMany({
    where: { businessId, customerId, status: { in: ["NO_SHOW", "CANCELLED"] } },
    select: { status: true, startsAt: true, cancelReason: true, cancelledAt: true, updatedAt: true },
  });
  const windowMs = cancellationWindowHours * 3_600_000;
  let noShows = 0;
  let lateCancels = 0;
  for (const b of past) {
    if (b.status === "NO_SHOW") noShows++;
    else if (isLateCancel(b, windowMs)) lateCancels++;
  }
  return { noShows, lateCancels };
}

/** A cancellation by the customer (or the auto-cancel for not confirming)
 * closer to the appointment than the salon's own self-cancel window. Older
 * bookings have no cancelledAt; their last update is when they were cancelled. */
export function isLateCancel(
  b: { status: string; startsAt: Date; cancelReason: string | null; cancelledAt: Date | null; updatedAt: Date },
  windowMs: number,
) {
  if (b.status !== "CANCELLED") return false;
  if (b.cancelReason !== "CANCELLED_BY_CUSTOMER" && b.cancelReason !== AUTO_CANCEL_REASON) return false;
  const at = b.cancelledAt ?? b.updatedAt;
  return b.startsAt.getTime() - at.getTime() < windowMs;
}

/** Whether a new online booking by this customer must wait for the salon's
 * approval (Settings → Booking: repeat no-shows need approval). */
export async function bookingNeedsApproval(
  business: { id: string; noShowApprovalOn: boolean; noShowApprovalCount: number; cancellationWindowHours: number },
  customerId: string,
) {
  if (!business.noShowApprovalOn) return false;
  const r = await customerReliability(business.id, customerId, business.cancellationWindowHours);
  return r.noShows + r.lateCancels >= Math.max(1, business.noShowApprovalCount);
}

/** The secret in the confirm / cancel links — minted the first time it is
 * needed, so a reminder sent twice (after a reschedule) keeps working. */
export async function ensureConfirmToken(bookingId: string, existing: string | null) {
  if (existing) return existing;
  const token = randomBytes(24).toString("hex");
  await prisma.booking.update({ where: { id: bookingId }, data: { confirmToken: token } });
  return token;
}

export function confirmLinks(locale: string, token: string) {
  const base = `${siteUrl()}/${locale}/booking/confirm/${token}`;
  return { yesUrl: `${base}?a=confirm`, noUrl: `${base}?a=cancel` };
}

/** The confirm request's own push, alongside the 24h reminder email. */
export async function pushConfirmRequest(b: {
  customerId: string;
  service: { name: string };
  business: { name: string; country: string; timezone: string };
  startsAt: Date;
  confirmToken: string;
}) {
  const locale = localeForCountry(b.business.country);
  const S = bookingProtectStrings(locale);
  const time = formatInTimeZone(b.startsAt, b.business.timezone, "HH:mm");
  await sendPushToUser(b.customerId, {
    title: S.pushConfirmTitle(b.business.name),
    body: S.pushConfirmBody(b.service.name, time),
    url: confirmLinks(locale, b.confirmToken).yesUrl,
    tag: `confirm-${b.confirmToken}`,
  });
}

const bookingForPage = {
  id: true,
  status: true,
  startsAt: true,
  endsAt: true,
  confirmedAt: true,
  customerId: true,
  notificationEmailsEnabled: true,
  priceCents: true,
  currency: true,
  service: { select: { name: true } },
  staff: { select: { name: true } },
  customer: { select: { name: true, email: true, phone: true } },
  business: {
    select: {
      id: true,
      name: true,
      slug: true,
      country: true,
      timezone: true,
      cancellationWindowHours: true,
      logoUrl: true,
      addressLine: true,
      city: true,
      phone: true,
      owner: { select: { name: true, email: true } },
    },
  },
} as const;

export type ConfirmPageBooking = NonNullable<Awaited<ReturnType<typeof loadConfirmBooking>>>;

/** The booking behind a confirm / cancel link, or null when the link is stale. */
export async function loadConfirmBooking(token: string) {
  if (!/^[0-9a-f]{48}$/.test(token)) return null;
  return prisma.booking.findUnique({ where: { confirmToken: token }, select: bookingForPage });
}

/** The customer tapped "I'll be there". Idempotent. */
export async function confirmByCustomer(token: string) {
  const b = await loadConfirmBooking(token);
  if (!b || b.status !== "CONFIRMED") return null;
  if (!b.confirmedAt) await prisma.booking.update({ where: { id: b.id }, data: { confirmedAt: new Date() } });
  return b;
}

/** The customer tapped "I can't make it" and confirmed on the page. Same
 * rules as /api/bookings/[id]/cancel: only inside the self-cancel window. */
export async function cancelByCustomerToken(token: string): Promise<"ok" | "too_late" | "gone"> {
  const b = await loadConfirmBooking(token);
  if (!b || !["CONFIRMED", "PENDING_PAYMENT", "PENDING_APPROVAL"].includes(b.status)) return "gone";
  const hoursLeft = (b.startsAt.getTime() - Date.now()) / 3_600_000;
  if (hoursLeft < b.business.cancellationWindowHours) return "too_late";
  await prisma.booking.update({
    where: { id: b.id },
    data: { status: "CANCELLED", cancelReason: "CANCELLED_BY_CUSTOMER", cancelledAt: new Date() },
  });
  await afterCancellation(b, "customer");
  return "ok";
}

/** Everything that follows a cancellation made outside the dashboard: the
 * owner's email and the staff member's email. */
async function afterCancellation(b: ConfirmPageBooking, by: "customer" | "auto") {
  const locale = localeForCountry(b.business.country);
  if (b.notificationEmailsEnabled) {
    try {
      await sendMail({
        to: b.business.owner.email,
        ...ownerBookingCancelledEmail({
          ownerName: b.business.owner.name,
          customerName: b.customer.name,
          customerEmail: b.customer.email,
          customerPhone: b.customer.phone,
          serviceName: b.service.name,
          staffName: b.staff?.name,
          priceCents: b.priceCents,
          currency: b.currency,
          bookingId: b.id,
          startsAt: b.startsAt,
          endsAt: b.endsAt,
          locale,
          businessTimezone: b.business.timezone,
          businessName: b.business.name,
          bookingsUrl: `${siteUrl()}/${locale}/business/dashboard/bookings`,
        }),
      });
    } catch (err) {
      console.error(`[booking-protect] owner cancel email (${by})`, err);
    }
  }
  await emailStaffAboutBooking(b.id, "cancelled").catch(() => {});
}

/* ---------- emails ---------- */

function appointmentPanel(b: ConfirmPageBooking, locale: string, eyebrow: string, accent: string) {
  const S = bookingProtectStrings(locale);
  const d = dateParts(b.startsAt, b.endsAt, locale, b.business.timezone);
  return panel(
    appointmentHeader(d, eyebrow, accent) +
      hairline(18) +
      rows([
        { label: S.pageService, value: esc(b.service.name) },
        b.staff ? { label: S.pageStaff, value: esc(b.staff.name) } : null,
      ]),
    { pad: "22px 22px 20px" },
  );
}

function salonAddress(b: ConfirmPageBooking) {
  return [b.business.addressLine, b.business.city].filter(Boolean).join(", ");
}

/** "The salon will confirm shortly" — sent instead of the confirmation when
 * the booking is awaiting approval. */
export async function sendPendingApprovalEmail(bookingId: string) {
  const b = await prisma.booking.findUnique({ where: { id: bookingId }, select: bookingForPage });
  if (!b || !b.notificationEmailsEnabled) return;
  const locale = localeForCountry(b.business.country);
  const S = bookingProtectStrings(locale);
  const body = [
    greeting(bookingHi(locale), b.customer.name),
    para(S.pendingIntro(esc(b.service.name), esc(b.business.name))),
    appointmentPanel(b, locale, S.pendingEyebrow, C.gold),
    notice(null, esc(S.pendingNote), "gold", 20),
  ].join("");
  await sendMail({
    to: b.customer.email,
    subject: S.pendingSubject(b.business.name),
    html: emailLayout({
      locale,
      preheader: S.pendingTitle,
      brand: salonBrand(b.business.name, b.business.logoUrl, b.business.city),
      hero: { eyebrow: S.pendingEyebrow, title: S.pendingTitle, tone: "gold", badge: "⏳" },
      body,
      footerExtra: salonFooter(b.business.name, salonAddress(b), b.business.phone),
    }),
  });
}

/** The salon declined an awaiting-approval booking, or the cron cancelled an
 * unconfirmed one. */
export async function sendClosedEmail(bookingId: string, kind: "declined" | "auto") {
  const b = await prisma.booking.findUnique({ where: { id: bookingId }, select: bookingForPage });
  if (!b || !b.notificationEmailsEnabled) return;
  const locale = localeForCountry(b.business.country);
  const S = bookingProtectStrings(locale);
  const title = kind === "declined" ? S.declinedTitle : S.autoTitle;
  const intro = kind === "declined" ? S.declinedIntro(esc(b.service.name), esc(b.business.name)) : S.autoIntro(esc(b.service.name), esc(b.business.name));
  const body = [
    greeting(bookingHi(locale), b.customer.name),
    para(intro),
    `<div style="opacity:.75">${appointmentPanel(b, locale, S.closedEyebrow, "#9b93a8")}</div>`,
    button(`${siteUrl()}/b/${b.business.slug}`, esc(S.pageBookAgain)),
  ].join("");
  await sendMail({
    to: b.customer.email,
    subject: S.closedSubject(b.business.name),
    html: emailLayout({
      locale,
      preheader: title,
      brand: salonBrand(b.business.name, b.business.logoUrl, b.business.city),
      hero: { eyebrow: S.closedEyebrow, title, tone: "alert", badge: "✕" },
      body,
      footerExtra: salonFooter(b.business.name, salonAddress(b), b.business.phone),
    }),
  });
}

function bookingHi(locale: string) {
  return locale === "vi" ? "Xin chào" : locale === "fi" ? "Hei" : "Hi";
}

/** Tells the owner a booking waits for their decision (push; the usual
 * new-booking email already went out). */
export async function pushApprovalRequest(bookingId: string) {
  const b = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      startsAt: true,
      service: { select: { name: true } },
      customer: { select: { name: true } },
      business: { select: { country: true, timezone: true, ownerId: true } },
    },
  });
  if (!b) return;
  const locale = localeForCountry(b.business.country);
  const S = bookingProtectStrings(locale);
  const time = formatInTimeZone(b.startsAt, b.business.timezone, "HH:mm dd/MM");
  await sendPushToUser(b.business.ownerId, {
    title: S.pushApprovalTitle,
    body: S.pushApprovalBody(b.customer.name, b.service.name, time),
    url: `${siteUrl()}/${locale}/business/dashboard/bookings`,
    tag: `approve-${bookingId}`,
    urgent: true,
  });
}

/* ---------- dashboard actions ---------- */

/** The salon approves a booking that was awaiting approval: it becomes an
 * ordinary confirmed booking and the customer gets the confirmation email. */
export async function approveBooking(bookingId: string) {
  await prisma.booking.update({ where: { id: bookingId }, data: { status: "CONFIRMED", confirmedAt: null } });
  const m = await import("@/lib/booking-service");
  await m.sendBookingConfirmationEmail(bookingId).catch((err) => console.error("[booking-protect] approve email", err));
}

/** The salon declines it: cancelled by the salon, the customer is told. */
export async function declineBooking(bookingId: string) {
  await prisma.booking.update({
    where: { id: bookingId },
    data: { status: "CANCELLED", cancelReason: "CANCELLED_BY_SALON", cancelledAt: new Date() },
  });
  await sendClosedEmail(bookingId, "declined").catch((err) => console.error("[booking-protect] decline email", err));
}

/** Credits the salon's on-time points once, when a booking is completed. */
export async function awardOnTimePoints(bookingId: string) {
  const b = await prisma.booking.findUnique({
    where: { id: bookingId },
    select: {
      customerId: true,
      onTimePointsAt: true,
      source: true,
      customer: { select: { isGuest: true, email: true } },
      business: { select: { name: true, country: true, onTimePoints: true } },
    },
  });
  if (!b || b.onTimePointsAt || b.business.onTimePoints <= 0) return;
  // Walk-ins the salon typed in have no account of their own to collect points on.
  if (b.customer.email.endsWith("@walkin.varaaai.com")) return;
  await prisma.$transaction(async (tx) => {
    await tx.booking.update({ where: { id: bookingId }, data: { onTimePointsAt: new Date() } });
    await awardPoints(b.customerId, b.business.onTimePoints, "ON_TIME_VISIT", tx);
  });
  const S = bookingProtectStrings(localeForCountry(b.business.country));
  await sendPushToUser(b.customerId, {
    title: S.pointsTitle(b.business.onTimePoints),
    body: S.pointsBody(b.business.name),
    url: `${siteUrl()}/account/loyalty`,
    tag: `points-${bookingId}`,
  }).catch(() => {});
}

/* ---------- cron ---------- */

/** Cancels online bookings the customer never confirmed, for salons that
 * turned the rule on: the confirm request went out, no answer, and the
 * appointment is now within the salon's chosen number of hours. */
export async function autoCancelUnconfirmed(now = new Date()) {
  const salons = await prisma.business.findMany({
    where: { autoCancelUnconfirmedHours: { not: null } },
    select: { id: true, autoCancelUnconfirmedHours: true },
  });
  let cancelled = 0;
  for (const salon of salons) {
    const hours = salon.autoCancelUnconfirmedHours!;
    const due = await prisma.booking.findMany({
      where: {
        businessId: salon.id,
        status: "CONFIRMED",
        source: "WEBSITE",
        confirmedAt: null,
        confirmRequestedAt: { not: null },
        startsAt: { gt: now, lte: new Date(now.getTime() + hours * 3_600_000) },
      },
      select: bookingForPage,
    });
    for (const b of due) {
      await prisma.booking.update({
        where: { id: b.id },
        data: { status: "CANCELLED", cancelReason: AUTO_CANCEL_REASON, cancelledAt: now },
      });
      await sendClosedEmail(b.id, "auto").catch((err) => console.error("[booking-protect] auto-cancel email", err));
      await afterCancellation(b, "auto");
      cancelled++;
    }
  }
  return cancelled;
}
