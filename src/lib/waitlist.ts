import { randomBytes } from "crypto";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { sendPushToUser } from "@/lib/push";
import { localeForCountry } from "@/lib/countries";
import { waitlistStrings } from "@/lib/waitlist-strings";
import { sendMail, salonBrand, salonFooter } from "@/lib/mailer";
import { dateParts } from "@/lib/email/calendar";
import { C, appointmentHeader, button, buttonRow, emailLayout, esc, greeting, hairline, panel, para, rows } from "@/lib/email/ui";

/** The wait list (WaitlistEntry): customers who wanted a day or a staff
 * member that was full. A cancelled booking frees a slot; everyone whose
 * service, staff and dates match is told by email + push with a link to
 * book that exact time, and a link to leave the list. */

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

/** Don't tell the same person about two cancellations within this long. */
const NOTIFY_COOLDOWN_MS = 6 * 3_600_000;

export const WAITLIST_MAX_WEEKS = 8;

/** Adds someone to a salon's wait list, or refreshes their open entry
 * (same email, not left) so a customer tapping twice doesn't appear twice. */
export async function joinWaitlist(input: {
  businessId: string;
  serviceId?: string | null;
  staffId?: string | null;
  userId?: string | null;
  name: string;
  phone?: string | null;
  email: string;
  weeks: number;
  note?: string | null;
  timezone: string;
}) {
  const weeks = Math.min(WAITLIST_MAX_WEEKS, Math.max(1, Math.round(input.weeks)));
  const today = formatInTimeZone(new Date(), input.timezone, "yyyy-MM-dd");
  const fromDate = new Date(`${today}T00:00:00.000Z`);
  const toDate = new Date(fromDate.getTime() + weeks * 7 * 86_400_000);
  const email = input.email.trim().toLowerCase();
  const data = {
    serviceId: input.serviceId || null,
    staffId: input.staffId || null,
    userId: input.userId ?? null,
    name: input.name.trim(),
    phone: input.phone?.trim() || null,
    email,
    fromDate,
    toDate,
    note: input.note?.trim() || null,
  };
  const open = await prisma.waitlistEntry.findFirst({
    where: { businessId: input.businessId, email, leftAt: null, serviceId: data.serviceId, staffId: data.staffId },
    select: { id: true },
  });
  if (open) return prisma.waitlistEntry.update({ where: { id: open.id }, data });
  return prisma.waitlistEntry.create({
    data: { ...data, businessId: input.businessId, token: randomBytes(24).toString("hex") },
  });
}

/** Everyone still waiting whose wishes a freed slot satisfies. */
export async function matchingEntries(slot: { businessId: string; serviceId: string; staffId: string | null; startsAt: Date; timezone: string }) {
  const day = new Date(`${formatInTimeZone(slot.startsAt, slot.timezone, "yyyy-MM-dd")}T00:00:00.000Z`);
  return prisma.waitlistEntry.findMany({
    where: {
      businessId: slot.businessId,
      leftAt: null,
      fromDate: { lte: day },
      toDate: { gte: day },
      OR: [{ serviceId: null }, { serviceId: slot.serviceId }],
      AND: [{ OR: [{ staffId: null }, ...(slot.staffId ? [{ staffId: slot.staffId }] : [])] }],
    },
    orderBy: { createdAt: "asc" },
  });
}

const bookingSlot = {
  id: true,
  businessId: true,
  serviceId: true,
  staffId: true,
  startsAt: true,
  endsAt: true,
  service: { select: { name: true } },
  staff: { select: { name: true } },
  business: { select: { id: true, name: true, slug: true, country: true, timezone: true, logoUrl: true, addressLine: true, city: true, phone: true } },
} as const;

/** How many people the salon could tell about this booking's slot. */
export async function countMatchingForBooking(bookingId: string) {
  const b = await prisma.booking.findUnique({ where: { id: bookingId }, select: bookingSlot });
  if (!b) return 0;
  const entries = await matchingEntries({ ...b, timezone: b.business.timezone });
  return entries.length;
}

/** Tells everyone waiting about a cancelled booking's slot. `force` skips
 * the cooldown (the salon pressing the button itself). Returns how many
 * were told. */
export async function notifyWaitlistForBooking(bookingId: string, opts: { force?: boolean } = {}) {
  const b = await prisma.booking.findUnique({ where: { id: bookingId }, select: bookingSlot });
  if (!b || b.startsAt <= new Date()) return 0;
  const entries = await matchingEntries({ ...b, timezone: b.business.timezone });
  const now = Date.now();
  let sent = 0;
  for (const e of entries) {
    if (!opts.force && e.notifiedAt && now - e.notifiedAt.getTime() < NOTIFY_COOLDOWN_MS) continue;
    await notifyEntry(e, b).catch((err) => console.error("[waitlist] notify", e.id, err));
    sent++;
  }
  return sent;
}

/** The salon tells one person about a slot by hand (the tab's button):
 * the next free time is theirs to pick, so the link opens the booking page. */
export async function notifyEntryById(entryId: string, businessId: string) {
  const e = await prisma.waitlistEntry.findFirst({ where: { id: entryId, businessId, leftAt: null } });
  if (!e) return false;
  const business = await prisma.business.findUniqueOrThrow({
    where: { id: businessId },
    select: { id: true, name: true, slug: true, country: true, timezone: true, logoUrl: true, addressLine: true, city: true, phone: true },
  });
  await notifyEntry(e, { business, serviceId: e.serviceId, staffId: e.staffId, startsAt: null, service: null, staff: null });
  return true;
}

type Slot = {
  business: { id: string; name: string; slug: string; country: string; timezone: string; logoUrl: string | null; addressLine: string | null; city: string | null; phone: string | null };
  serviceId: string | null;
  staffId: string | null;
  startsAt: Date | null;
  endsAt?: Date | null;
  service: { name: string } | null;
  staff: { name: string } | null;
};

async function notifyEntry(e: { id: string; name: string; email: string; userId: string | null; serviceId: string | null }, slot: Slot) {
  const locale = localeForCountry(slot.business.country);
  const S = waitlistStrings(locale);
  const base = siteUrl();
  const serviceId = slot.serviceId ?? e.serviceId;
  const bookUrl = serviceId
    ? `${base}/${locale}/b/${slot.business.slug}/book/${serviceId}${
        slot.startsAt
          ? `?date=${formatInTimeZone(slot.startsAt, slot.business.timezone, "yyyy-MM-dd")}&time=${formatInTimeZone(slot.startsAt, slot.business.timezone, "HH:mm")}${slot.staffId ? `&staff=${slot.staffId}` : ""}`
          : ""
      }`
    : `${base}/${locale}/b/${slot.business.slug}`;
  const salonUrl = `${base}/${locale}/b/${slot.business.slug}`;
  const leaveUrl = `${base}/${locale}/waitlist/leave/${(await prisma.waitlistEntry.findUniqueOrThrow({ where: { id: e.id }, select: { token: true } })).token}`;
  const address = [slot.business.addressLine, slot.business.city].filter(Boolean).join(", ");

  const card = slot.startsAt
    ? panel(
        appointmentHeader(dateParts(slot.startsAt, slot.endsAt, locale, slot.business.timezone), S.eyebrow, C.teal) +
          hairline(18) +
          rows([
            slot.service ? { label: S.service, value: esc(slot.service.name) } : null,
            slot.staff ? { label: S.staff, value: esc(slot.staff.name) } : null,
          ]),
        { pad: "22px 22px 20px" },
      )
    : "";

  const body = [
    greeting(locale === "vi" ? "Xin chào" : locale === "fi" ? "Hei" : "Hi", e.name),
    para(S.intro(esc(slot.business.name))),
    card,
    button(bookUrl, esc(S.bookNow)),
    buttonRow([{ href: salonUrl, label: esc(S.otherTimes) }], "center"),
    para(`${esc(S.leaveNote)} <a href="${esc(leaveUrl)}" style="color:${C.muted}">${esc(S.leave)}</a>`, { muted: true, small: true, center: true, mt: 26 }),
  ].join("");

  await sendMail({
    to: e.email,
    subject: S.subject(slot.business.name),
    html: emailLayout({
      locale,
      preheader: S.title,
      brand: salonBrand(slot.business.name, slot.business.logoUrl, slot.business.city),
      hero: { eyebrow: S.eyebrow, title: S.title, tone: "success", badge: "✨" },
      body,
      footerExtra: salonFooter(slot.business.name, address, slot.business.phone),
    }),
  });

  if (e.userId) {
    const when = slot.startsAt ? formatInTimeZone(slot.startsAt, slot.business.timezone, "dd/MM HH:mm") : "";
    await sendPushToUser(e.userId, {
      title: S.pushTitle(slot.business.name),
      body: S.pushBody(slot.service?.name ?? "", when),
      url: bookUrl,
      tag: `waitlist-${e.id}`,
      urgent: true,
    }).catch(() => {});
  }

  await prisma.waitlistEntry.update({
    where: { id: e.id },
    data: { notifiedAt: new Date(), notifyCount: { increment: 1 } },
  });
}

/** The customer tapped "leave the wait list" in an email. */
export async function leaveWaitlist(token: string) {
  if (!/^[0-9a-f]{48}$/.test(token)) return null;
  const e = await prisma.waitlistEntry.findUnique({
    where: { token },
    select: { id: true, leftAt: true, business: { select: { name: true, slug: true } } },
  });
  if (!e) return null;
  if (!e.leftAt) await prisma.waitlistEntry.update({ where: { id: e.id }, data: { leftAt: new Date() } });
  return e.business;
}

/** Entries that arrived since the owner last opened the tab (the red dot). */
export async function newWaitlistCount(businessId: string, seenAt: Date | null) {
  return prisma.waitlistEntry.count({
    where: { businessId, leftAt: null, toDate: { gte: new Date() }, ...(seenAt ? { createdAt: { gt: seenAt } } : {}) },
  });
}

/** "2026-11-21" for a salon-local DATE column value. */
export function dateOnly(d: Date) {
  return d.toISOString().slice(0, 10);
}

/** A salon-local day as the DATE column stores it. */
export function salonDay(dateStr: string, timezone: string) {
  return fromZonedTime(dateStr, timezone);
}
