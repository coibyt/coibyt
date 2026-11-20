import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { sendPushToUser } from "@/lib/push";
import { localeForCountry } from "@/lib/countries";
import { recurringStrings } from "@/lib/recurring-strings";
import { sendMail, salonBrand, salonFooter } from "@/lib/mailer";
import { isRealCustomerEmail } from "@/lib/booking-service";
import { button, emailLayout, esc, greeting, panel, para, rows } from "@/lib/email/ui";

/** Repeat bookings (RecurringRule) and "book again" reminders
 * (Booking.rebookReminderAt), both set by the salon from the calendar. */

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

export const MAX_SERIES_LENGTH = 52;

const LIVE = ["PENDING_PAYMENT", "CONFIRMED", "PENDING_APPROVAL"] as const;

/** Creates the following bookings of a series: the same customer, service,
 * staff, add-ons and extra services, every `everyWeeks` weeks from the root
 * booking, `count` times or until `untilDate` (salon-local date). A date
 * where the staff member is already busy is skipped and reported; the rest
 * are created as the salon's own manual bookings. */
export async function createRecurringSeries(
  bookingId: string,
  rule: { everyWeeks: number; count?: number | null; untilDate?: string | null },
) {
  const root = await prisma.booking.findUniqueOrThrow({
    where: { id: bookingId },
    include: {
      addOns: true,
      extraServices: true,
      business: { select: { timezone: true } },
      recurringRoot: { select: { id: true } },
    },
  });
  if (root.recurringRoot) throw new Error("ALREADY_REPEATING");
  if (root.recurringRuleId) throw new Error("IN_SERIES");

  const stepMs = rule.everyWeeks * 7 * 86_400_000;
  const until = rule.untilDate ? new Date(`${rule.untilDate}T23:59:59.999Z`) : null;
  const wanted = Math.min(MAX_SERIES_LENGTH, rule.count ?? MAX_SERIES_LENGTH);
  const dates: Date[] = [];
  for (let k = 1; k <= wanted; k++) {
    // Same wall-clock time in the salon's zone, even across a DST change.
    const local = formatInTimeZone(root.startsAt, root.business.timezone, "yyyy-MM-dd'T'HH:mm:ss");
    const shifted = new Date(root.startsAt.getTime() + k * stepMs);
    const day = formatInTimeZone(shifted, root.business.timezone, "yyyy-MM-dd");
    const startsAt = fromZonedTime(`${day}T${local.slice(11)}`, root.business.timezone);
    if (until && startsAt > until) break;
    dates.push(startsAt);
  }
  if (dates.length === 0) return { created: 0, skipped: [] as string[], ruleId: null as string | null };

  const durationMs = root.endsAt.getTime() - root.startsAt.getTime();
  const created: Date[] = [];
  const skipped: string[] = [];

  const ruleRow = await prisma.recurringRule.create({
    data: {
      businessId: root.businessId,
      rootBookingId: root.id,
      everyWeeks: rule.everyWeeks,
      count: rule.count ?? null,
      untilDate: rule.untilDate ? new Date(`${rule.untilDate}T00:00:00.000Z`) : null,
    },
  });

  for (const startsAt of dates) {
    const endsAt = new Date(startsAt.getTime() + durationMs);
    const busy = root.staffId ? await staffBusy(root.staffId, startsAt, endsAt) : false;
    if (busy) {
      skipped.push(startsAt.toISOString());
      continue;
    }
    const delta = startsAt.getTime() - root.startsAt.getTime();
    await prisma.booking.create({
      data: {
        businessId: root.businessId,
        serviceId: root.serviceId,
        staffId: root.staffId,
        customerId: root.customerId,
        startsAt,
        endsAt,
        status: "CONFIRMED",
        source: "MANUAL",
        priceCents: root.priceCents,
        depositCents: root.depositCents,
        currency: root.currency,
        customerNote: root.customerNote,
        notificationEmailsEnabled: root.notificationEmailsEnabled,
        recurringRuleId: ruleRow.id,
        addOns: {
          create: root.addOns.map((a) => ({ addOnId: a.addOnId, name: a.name, priceCents: a.priceCents, durationMin: a.durationMin })),
        },
        extraServices: {
          create: root.extraServices.map((e) => ({
            serviceId: e.serviceId,
            name: e.name,
            priceCents: e.priceCents,
            durationMin: e.durationMin,
            staffId: e.staffId,
            startsAt: e.startsAt ? new Date(e.startsAt.getTime() + delta) : null,
            endsAt: e.endsAt ? new Date(e.endsAt.getTime() + delta) : null,
          })),
        },
      },
    });
    created.push(startsAt);
  }
  return { created: created.length, skipped, ruleId: ruleRow.id };
}

async function staffBusy(staffId: string, startsAt: Date, endsAt: Date) {
  const [b, x, t] = await Promise.all([
    prisma.booking.findFirst({ where: { staffId, status: { in: [...LIVE] }, startsAt: { lt: endsAt }, endsAt: { gt: startsAt } }, select: { id: true } }),
    prisma.bookingExtraService.findFirst({ where: { staffId, startsAt: { lt: endsAt }, endsAt: { gt: startsAt }, booking: { status: { in: [...LIVE] } } }, select: { id: true } }),
    prisma.staffTimeOff.findFirst({ where: { staffId, startsAt: { lt: endsAt }, endsAt: { gt: startsAt } }, select: { id: true } }),
  ]);
  return !!(b || x || t);
}

/** Cancels every future booking of the series this booking belongs to (or
 * heads), from now on. Returns how many were cancelled. */
export async function cancelRemainingInSeries(bookingId: string, businessId: string) {
  const b = await prisma.booking.findFirst({
    where: { id: bookingId, businessId },
    select: { recurringRuleId: true, recurringRoot: { select: { id: true } } },
  });
  const ruleId = b?.recurringRuleId ?? b?.recurringRoot?.id;
  if (!ruleId) return 0;
  const now = new Date();
  const r = await prisma.booking.updateMany({
    where: { recurringRuleId: ruleId, startsAt: { gt: now }, status: { in: [...LIVE] } },
    data: { status: "CANCELLED", cancelReason: "CANCELLED_BY_SALON", cancelledAt: now },
  });
  return r.count;
}

/** The salon asks for a "book again" nudge N weeks after this visit. */
export async function scheduleRebookReminder(bookingId: string, weeks: number | null) {
  const b = await prisma.booking.findUniqueOrThrow({ where: { id: bookingId }, select: { startsAt: true } });
  const at = weeks ? new Date(Math.max(Date.now(), b.startsAt.getTime() + weeks * 7 * 86_400_000)) : null;
  return prisma.booking.update({
    where: { id: bookingId },
    data: { rebookReminderAt: at, rebookReminderSentAt: null },
    select: { rebookReminderAt: true },
  });
}

/** Cron: sends due "book again" reminders once each. Dropped (never sent)
 * when the visit was cancelled / a no-show, or when the customer has
 * already booked again here since that visit. */
export async function sendRebookReminders(now = new Date()) {
  const due = await prisma.booking.findMany({
    where: { rebookReminderAt: { lte: now }, rebookReminderSentAt: null },
    select: {
      id: true,
      status: true,
      startsAt: true,
      customerId: true,
      businessId: true,
      serviceId: true,
      staffId: true,
      service: { select: { name: true } },
      staff: { select: { name: true } },
      customer: { select: { name: true, email: true } },
      business: { select: { name: true, slug: true, country: true, logoUrl: true, addressLine: true, city: true, phone: true } },
    },
    take: 200,
  });
  let sent = 0;
  for (const b of due) {
    const drop =
      b.status === "CANCELLED" ||
      b.status === "NO_SHOW" ||
      !isRealCustomerEmail(b.customer.email) ||
      (await prisma.booking.findFirst({
        where: { customerId: b.customerId, businessId: b.businessId, id: { not: b.id }, startsAt: { gt: b.startsAt }, status: { in: ["PENDING_PAYMENT", "CONFIRMED", "PENDING_APPROVAL", "COMPLETED"] } },
        select: { id: true },
      }));
    if (drop) {
      await prisma.booking.update({ where: { id: b.id }, data: { rebookReminderAt: null } });
      continue;
    }
    try {
      await sendRebookEmail(b);
      sent++;
    } catch (err) {
      console.error("[recurring] rebook email", b.id, err);
    }
    await prisma.booking.update({ where: { id: b.id }, data: { rebookReminderSentAt: now } });
  }
  return sent;
}

async function sendRebookEmail(b: {
  id: string;
  customerId: string;
  serviceId: string;
  staffId: string | null;
  service: { name: string };
  staff: { name: string } | null;
  customer: { name: string; email: string };
  business: { name: string; slug: string; country: string; logoUrl: string | null; addressLine: string | null; city: string | null; phone: string | null };
}) {
  const locale = localeForCountry(b.business.country);
  const S = recurringStrings(locale);
  const bookUrl = `${siteUrl()}/${locale}/b/${b.business.slug}/book/${b.serviceId}${b.staffId ? `?staff=${b.staffId}` : ""}`;
  const address = [b.business.addressLine, b.business.city].filter(Boolean).join(", ");
  const body = [
    greeting(locale === "vi" ? "Xin chào" : locale === "fi" ? "Hei" : "Hi", b.customer.name),
    para(S.intro(esc(b.business.name), esc(b.service.name), b.staff ? esc(b.staff.name) : null)),
    panel(
      rows([
        { label: locale === "vi" ? "Dịch vụ" : locale === "fi" ? "Palvelu" : "Service", value: esc(b.service.name), strong: true },
        b.staff ? { label: locale === "vi" ? "Nhân viên" : locale === "fi" ? "Työntekijä" : "Staff", value: esc(b.staff.name) } : null,
      ]),
    ),
    button(bookUrl, esc(S.cta), { variant: "gold" }),
  ].join("");
  await sendMail({
    to: b.customer.email,
    subject: S.subject(b.business.name),
    html: emailLayout({
      locale,
      preheader: S.title(b.service.name),
      brand: salonBrand(b.business.name, b.business.logoUrl, b.business.city),
      hero: { eyebrow: S.eyebrow, title: S.title(b.service.name), tone: "gold", badge: "💛" },
      body,
      footerExtra: salonFooter(b.business.name, address, b.business.phone),
    }),
  });
  await sendPushToUser(b.customerId, {
    title: S.pushTitle(b.business.name),
    body: S.pushBody(b.service.name),
    url: bookUrl,
    tag: `rebook-${b.id}`,
  }).catch(() => {});
}
