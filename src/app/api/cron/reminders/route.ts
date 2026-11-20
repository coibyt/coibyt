import { NextResponse } from "next/server";
import { deleteStaleTrials } from "@/lib/loyalty-lite";
import { prisma } from "@/lib/prisma";
import { sendMail, appointmentReminderEmail, reviewRequestEmail } from "@/lib/mailer";
import { localeForCountry } from "@/lib/countries";
import { sendDueCampaigns } from "@/lib/marketing-send";
import { settleReferrals } from "@/lib/loyalty-referral";
import { sendTelegramIncomeReminders } from "@/lib/telegram";
import { sendIncomeReminders } from "@/lib/income-reminders";
import { autoCancelUnconfirmed, confirmLinks, ensureConfirmToken, pushConfirmRequest } from "@/lib/booking-protect";
import { bookingProtectStrings } from "@/lib/booking-protect-strings";
import { sendRebookReminders } from "@/lib/recurring";
import { sendAcademyUpdates } from "@/lib/academy/notify";

const HOUR_MS = 60 * 60 * 1000;
const MIN_MS = 60 * 1000;

// Reuses APP_SECRET (already provisioned for exactly this — see its comment
// in .env) rather than a new env var, so there's nothing extra to configure
// in production. Accepts either an Authorization header or a `secret` query
// param since most cron-URL UIs (Hostinger's Cron Jobs, cron-job.org) only
// let you paste a plain URL.
function isAuthorized(req: Request): boolean {
  const secret = process.env.APP_SECRET;
  if (!secret) return false;
  if (req.headers.get("authorization") === `Bearer ${secret}`) return true;
  return new URL(req.url).searchParams.get("secret") === secret;
}

/**
 * Sends the three pre-appointment reminders (24h / 2h / 15min before) and
 * the post-visit review request. There's no built-in scheduler on this
 * host, so this route is meant to be hit periodically by an external cron
 * (see docs/DEPLOYMENT.md) — every send is guarded by its own
 * reminder*SentAt / reviewRequestSentAt column, so calling it as often as
 * you like is always safe; nothing is ever emailed twice.
 */
export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }

  const now = new Date();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  const include = { business: true, service: true, customer: true, staff: true } as const;

  let reminder24h = 0;
  let reminder2h = 0;
  let reminder15min = 0;
  let reviewRequests = 0;

  const due24h = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
      notificationEmailsEnabled: true,
      startsAt: { lte: new Date(now.getTime() + 24 * HOUR_MS), gt: now },
      reminder24hSentAt: null,
    },
    include,
  });
  for (const b of due24h) {
    // The 24h reminder doubles as the confirm request (src/lib/booking-protect.ts):
    // Confirm / Cancel buttons in the email, plus a push on the customer's phone.
    const locale = localeForCountry(b.business.country);
    const S = bookingProtectStrings(locale);
    const token = await ensureConfirmToken(b.id, b.confirmToken);
    const links = confirmLinks(locale, token);
    const email = appointmentReminderEmail({
      customerName: b.customer.name,
      businessName: b.business.name,
      serviceName: b.service.name,
      startsAt: b.startsAt,
      locale,
      businessTimezone: b.business.timezone,
      staffName: b.staff?.name,
      businessAddress: b.business.addressLine,
      businessCity: b.business.city,
      googleMapsUrl: b.business.googleMapsUrl,
      businessPhone: b.business.phone,
      endsAt: b.endsAt,
      bookingId: b.id,
      businessLogoUrl: b.business.logoUrl,
      salonUrl: `${siteUrl}/b/${b.business.slug}`,
      confirm: b.confirmedAt
        ? null
        : { title: S.confirmTitle, text: S.confirmText, yesLabel: S.confirmYes, yesUrl: links.yesUrl, noLabel: S.confirmNo, noUrl: links.noUrl },
    });
    await sendMail({ to: b.customer.email, ...email });
    await prisma.booking.update({
      where: { id: b.id },
      data: { reminder24hSentAt: now, ...(b.confirmedAt ? {} : { confirmRequestedAt: now }) },
    });
    if (!b.confirmedAt) await pushConfirmRequest({ ...b, confirmToken: token }).catch((err) => console.error("[cron] confirm push", err));
    reminder24h++;
  }

  // Salons that cancel bookings nobody confirmed (Settings → Booking).
  const autoCancelled = await autoCancelUnconfirmed(now).catch((err) => {
    console.error("[cron] autoCancelUnconfirmed", err);
    return 0;
  });

  const due2h = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
      notificationEmailsEnabled: true,
      startsAt: { lte: new Date(now.getTime() + 2 * HOUR_MS), gt: now },
      reminder2hSentAt: null,
    },
    include,
  });
  for (const b of due2h) {
    const email = appointmentReminderEmail({
      customerName: b.customer.name,
      businessName: b.business.name,
      serviceName: b.service.name,
      startsAt: b.startsAt,
      locale: localeForCountry(b.business.country),
      businessTimezone: b.business.timezone,
      staffName: b.staff?.name,
      businessAddress: b.business.addressLine,
      businessCity: b.business.city,
      googleMapsUrl: b.business.googleMapsUrl,
      businessPhone: b.business.phone,
      endsAt: b.endsAt,
      bookingId: b.id,
      businessLogoUrl: b.business.logoUrl,
      salonUrl: `${siteUrl}/b/${b.business.slug}`,
    });
    await sendMail({ to: b.customer.email, ...email });
    await prisma.booking.update({ where: { id: b.id }, data: { reminder2hSentAt: now } });
    reminder2h++;
  }

  const due15min = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
      notificationEmailsEnabled: true,
      startsAt: { lte: new Date(now.getTime() + 15 * MIN_MS), gt: now },
      reminder15minSentAt: null,
    },
    include,
  });
  for (const b of due15min) {
    const email = appointmentReminderEmail({
      customerName: b.customer.name,
      businessName: b.business.name,
      serviceName: b.service.name,
      startsAt: b.startsAt,
      locale: localeForCountry(b.business.country),
      businessTimezone: b.business.timezone,
      staffName: b.staff?.name,
      businessAddress: b.business.addressLine,
      businessCity: b.business.city,
      googleMapsUrl: b.business.googleMapsUrl,
      businessPhone: b.business.phone,
      endsAt: b.endsAt,
      bookingId: b.id,
      businessLogoUrl: b.business.logoUrl,
      salonUrl: `${siteUrl}/b/${b.business.slug}`,
    });
    await sendMail({ to: b.customer.email, ...email });
    await prisma.booking.update({ where: { id: b.id }, data: { reminder15minSentAt: now } });
    reminder15min++;
  }

  const dueReview = await prisma.booking.findMany({
    where: {
      // Never gated on the salon manually marking a booking "completed" —
      // plenty of owners never click that. 24h past the scheduled end time
      // is the real signal that the visit has happened.
      status: { not: "CANCELLED" },
      notificationEmailsEnabled: true,
      endsAt: { lte: new Date(now.getTime() - 24 * HOUR_MS) },
      reviewRequestSentAt: null,
      review: null,
    },
    include: { business: true, service: true, customer: true },
  });
  for (const b of dueReview) {
    const email = reviewRequestEmail({
      customerName: b.customer.name,
      businessName: b.business.name,
      serviceName: b.service.name,
      locale: localeForCountry(b.business.country),
      reviewUrl: `${siteUrl}/account/bookings?review=${b.id}`,
      businessLogoUrl: b.business.logoUrl,
      businessCity: b.business.city,
    });
    await sendMail({ to: b.customer.email, ...email });
    await prisma.booking.update({ where: { id: b.id }, data: { reviewRequestSentAt: now } });
    reviewRequests++;
  }

  // "Book again" nudges the salon asked for (src/lib/recurring.ts).
  const rebookReminders = await sendRebookReminders(now).catch((err) => {
    console.error("[cron] sendRebookReminders", err);
    return 0;
  });

  // Marketing campaigns salons scheduled for later.
  // Loyalty Lite trials that never saved an email.
  await deleteStaleTrials().catch((err) => console.error("[cron] lite trials", err));
  const campaigns = await sendDueCampaigns().catch((err) => {
    console.error("[cron] campaigns", err);
    return 0;
  });

  // Invite bonuses whose friend's visit has now happened — the inviter gets
  // their tickets (and the email about it) without anyone opening a page.
  const referrals = await settleReferrals("all").catch((err) => {
    console.error("[cron] settleReferrals", err);
    return 0;
  });

  // Staff who haven't reported a booking's income 24 hours after it ended —
  // a daily email + push, where the owner has turned reminders on.
  const incomeReminders = await sendIncomeReminders().catch((err) => {
    console.error("[cron] sendIncomeReminders", err);
    return 0;
  });

  // The same, in the salon's Telegram staff groups (src/lib/telegram.ts).
  const telegramReminders = await sendTelegramIncomeReminders().catch((err) => {
    console.error("[cron] sendTelegramIncomeReminders", err);
    return 0;
  });

  // Academy learners who asked to hear about new lessons in a course.
  const academyUpdates = await sendAcademyUpdates().catch((err) => {
    console.error("[cron] sendAcademyUpdates", err);
    return 0;
  });

  return NextResponse.json({ ok: true, reminder24h, autoCancelled, reminder2h, reminder15min, reviewRequests, rebookReminders, campaigns, referrals, incomeReminders, telegramReminders, academyUpdates });
}
