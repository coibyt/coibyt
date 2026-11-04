import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { localeForCountry } from "@/lib/countries";
import { dateParts } from "@/lib/email/calendar";
import { C, SITE_URL, appointmentHeader, button, emailLayout, esc, greeting, hairline, panel, rows } from "@/lib/email/ui";

export type StaffBookingEvent = "new" | "moved" | "cancelled";

const T = {
  vi: {
    subject: { new: (c: string) => `Lịch hẹn mới: ${c}`, moved: (c: string) => `Lịch hẹn đã đổi: ${c}`, cancelled: (c: string) => `Lịch hẹn đã hủy: ${c}` },
    eyebrow: { new: "Lịch hẹn mới", moved: "Đã đổi lịch", cancelled: "Đã hủy" },
    title: { new: "Bạn có lịch hẹn mới", moved: "Lịch hẹn của bạn đã thay đổi", cancelled: "Một lịch hẹn của bạn đã bị hủy" },
    intro: {
      new: (c: string, s: string) => `<strong>${c}</strong> đã đặt <strong>${s}</strong> với bạn.`,
      moved: (c: string, s: string) => `Lịch hẹn <strong>${s}</strong> của <strong>${c}</strong> đã được đổi sang thời gian mới bên dưới.`,
      cancelled: (c: string, s: string) => `Lịch hẹn <strong>${s}</strong> của <strong>${c}</strong> đã bị hủy — khung giờ này giờ đã trống.`,
    },
    movedAway: "Lịch hẹn này đã được chuyển cho nhân viên khác.",
    was: "Trước đây",
    customer: "Khách hàng",
    service: "Dịch vụ",
    branch: "Chi nhánh",
    staff: "Nhân viên",
    hi: "Xin chào",
    cta: "Mở lịch hẹn",
  },
  en: {
    subject: { new: (c: string) => `New booking: ${c}`, moved: (c: string) => `Booking moved: ${c}`, cancelled: (c: string) => `Booking cancelled: ${c}` },
    eyebrow: { new: "New booking", moved: "Moved", cancelled: "Cancelled" },
    title: { new: "You have a new booking", moved: "Your booking has changed", cancelled: "One of your bookings was cancelled" },
    intro: {
      new: (c: string, s: string) => `<strong>${c}</strong> booked <strong>${s}</strong> with you.`,
      moved: (c: string, s: string) => `<strong>${c}</strong>'s <strong>${s}</strong> has moved to the new time below.`,
      cancelled: (c: string, s: string) => `<strong>${c}</strong>'s <strong>${s}</strong> was cancelled — the time is free again.`,
    },
    movedAway: "This booking was moved to another staff member.",
    was: "Was",
    customer: "Customer",
    service: "Service",
    branch: "Branch",
    staff: "Staff",
    hi: "Hi",
    cta: "Open bookings",
  },
  fi: {
    subject: { new: (c: string) => `Uusi varaus: ${c}`, moved: (c: string) => `Varaus siirretty: ${c}`, cancelled: (c: string) => `Varaus peruttu: ${c}` },
    eyebrow: { new: "Uusi varaus", moved: "Siirretty", cancelled: "Peruttu" },
    title: { new: "Sinulle tuli uusi varaus", moved: "Varauksesi on muuttunut", cancelled: "Yksi varauksistasi peruttiin" },
    intro: {
      new: (c: string, s: string) => `<strong>${c}</strong> varasi sinulta palvelun <strong>${s}</strong>.`,
      moved: (c: string, s: string) => `Asiakkaan <strong>${c}</strong> varaus <strong>${s}</strong> siirtyi alla olevaan aikaan.`,
      cancelled: (c: string, s: string) => `Asiakkaan <strong>${c}</strong> varaus <strong>${s}</strong> peruttiin — aika on taas vapaa.`,
    },
    movedAway: "Tämä varaus siirrettiin toiselle työntekijälle.",
    was: "Aiemmin",
    customer: "Asiakas",
    service: "Palvelu",
    branch: "Toimipiste",
    staff: "Työntekijä",
    hi: "Hei",
    cta: "Avaa varaukset",
  },
};

/** Emails a staff member about a booking of theirs that was made, moved or
 * cancelled — only when the owner has turned "Email staff about their
 * bookings" on for that branch (Business.staffBookingEmails). Staff without
 * their own login have no inbox here and are skipped, and so is whoever made
 * the change themselves. Best effort: never throws. */
export async function emailStaffAboutBooking(
  bookingId: string,
  event: StaffBookingEvent,
  opts: {
    /** Whoever made the change — they aren't emailed about it. */
    actorUserId?: string | null;
    actorStaffId?: string | null;
    previousStaffId?: string | null;
    previousStartsAt?: Date | null;
  } = {},
) {
  try {
    const b = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        startsAt: true,
        endsAt: true,
        staffId: true,
        customer: { select: { name: true } },
        service: { select: { name: true } },
        staff: { select: { name: true } },
        business: { select: { name: true, country: true, timezone: true, staffBookingEmails: true } },
      },
    });
    if (!b?.business.staffBookingEmails) return;

    // The booked staff member, and on a move to someone else the one who had it.
    const staffIds = [b.staffId, opts.previousStaffId !== b.staffId ? opts.previousStaffId : null].filter((x): x is string => !!x);
    if (!staffIds.length) return;
    const people = await prisma.staff.findMany({
      where: { id: { in: staffIds }, user: { isNot: null } },
      select: { id: true, name: true, user: { select: { id: true, email: true } } },
    });

    const locale = localeForCountry(b.business.country);
    const t = (T as Record<string, (typeof T)["en"]>)[locale] ?? T.en;
    const tz = b.business.timezone;
    const d = dateParts(b.startsAt, b.endsAt, locale, tz);
    const before = opts.previousStartsAt && opts.previousStartsAt.getTime() !== b.startsAt.getTime() ? dateParts(opts.previousStartsAt, null, locale, tz) : null;
    const accent = event === "cancelled" ? C.berry : C.primary;
    const url = `${SITE_URL}/${locale}/business/dashboard/bookings`;

    await Promise.all(
      people.map(async (p) => {
        if (!p.user || p.user.id === opts.actorUserId || p.id === opts.actorStaffId) return;
        const lostIt = event === "moved" && p.id !== b.staffId;
        const card = panel(
          appointmentHeader(d, t.eyebrow[event], accent) +
            hairline(18) +
            rows([
              { label: t.customer, value: esc(b.customer.name), strong: true },
              { label: t.service, value: esc(b.service.name) },
              b.staff ? { label: t.staff, value: esc(b.staff.name) } : null,
              before ? { label: t.was, value: `<span style="text-decoration:line-through;color:${C.muted}">${esc(`${before.full}, ${before.time}`)}</span>` } : null,
              { label: t.branch, value: esc(b.business.name) },
            ]),
          { pad: "22px 22px 18px" },
        );
        const body = [
          greeting(t.hi, p.name),
          lostIt ? `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:${C.ink}">${t.movedAway}</p>` : "",
          card,
          button(url, t.cta, { variant: event === "cancelled" ? "dark" : undefined }),
        ].join("");
        await sendMail({
          to: p.user.email,
          subject: t.subject[event](b.customer.name),
          html: emailLayout({
            locale,
            preheader: `${b.service.name} · ${d.full}, ${d.time}`,
            brand: { name: b.business.name },
            hero: {
              eyebrow: t.eyebrow[event],
              title: t.title[event],
              intro: t.intro[event](esc(b.customer.name), esc(b.service.name)),
              tone: event === "cancelled" ? "alert" : event === "new" ? "success" : "brand",
              badge: event === "cancelled" ? "✕" : event === "new" ? "✓" : "↻",
            },
            body,
          }),
        });
      }),
    );
  } catch (err) {
    console.error("[emailStaffAboutBooking]", bookingId, event, err);
  }
}
