import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendMail, appointmentReminderEmail, reviewRequestEmail } from "@/lib/mailer";
import { localeForCountry } from "@/lib/countries";

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
      startsAt: { lte: new Date(now.getTime() + 24 * HOUR_MS), gt: now },
      reminder24hSentAt: null,
    },
    include,
  });
  for (const b of due24h) {
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
    });
    await sendMail({ to: b.customer.email, ...email });
    await prisma.booking.update({ where: { id: b.id }, data: { reminder24hSentAt: now } });
    reminder24h++;
  }

  const due2h = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
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
    });
    await sendMail({ to: b.customer.email, ...email });
    await prisma.booking.update({ where: { id: b.id }, data: { reminder2hSentAt: now } });
    reminder2h++;
  }

  const due15min = await prisma.booking.findMany({
    where: {
      status: "CONFIRMED",
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
    });
    await sendMail({ to: b.customer.email, ...email });
    await prisma.booking.update({ where: { id: b.id }, data: { reminder15minSentAt: now } });
    reminder15min++;
  }

  const dueReview = await prisma.booking.findMany({
    where: {
      status: "COMPLETED",
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
    });
    await sendMail({ to: b.customer.email, ...email });
    await prisma.booking.update({ where: { id: b.id }, data: { reviewRequestSentAt: now } });
    reviewRequests++;
  }

  return NextResponse.json({ ok: true, reminder24h, reminder2h, reminder15min, reviewRequests });
}
