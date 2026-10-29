import { formatInTimeZone } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { sendPushToUser } from "@/lib/push";
import { SITE_URL } from "@/lib/email/ui";
import { incomeReminderEmail } from "@/lib/email/income-reminder-email";
import { REPORTABLE_STATUSES } from "@/lib/income";

/** Reminders for staff who haven't reported the income of a booking 24 hours
 * after it ended: an alarm in their dashboard/app (IncomeReminderAlarm) and a
 * daily email + push from the reminders cron. The owner turns them on and off
 * on the Doanh thu page (Business.incomeRemindersSince). */

export const OVERDUE_HOURS = 24;
/** Older bookings aren't chased, so turning reminders on doesn't dig up months. */
const LOOKBACK_DAYS = 14;
const HOUR = 60 * 60 * 1000;

export interface OverdueBooking {
  id: string;
  customerName: string;
  serviceName: string;
  staffId: string | null;
  staffName: string | null;
  startsAt: string;
  endsAt: string;
  expectedCents: number;
  currency: string;
}

/** Bookings that ended over 24 hours ago (but after `since`) with a staff
 * member and no income report yet — one staff member's, or the salon's. */
export async function overdueBookings(businessId: string, since: Date, staffId?: string): Promise<OverdueBooking[]> {
  const now = Date.now();
  const from = new Date(Math.max(since.getTime(), now - LOOKBACK_DAYS * 24 * HOUR));
  const bookings = await prisma.booking.findMany({
    where: {
      businessId,
      staffId: staffId ?? { not: null },
      status: { in: REPORTABLE_STATUSES as ("CONFIRMED" | "COMPLETED")[] },
      endsAt: { gte: from, lte: new Date(now - OVERDUE_HOURS * HOUR) },
    },
    include: { service: { select: { name: true } }, customer: { select: { name: true } }, staff: { select: { name: true } } },
    orderBy: { endsAt: "asc" },
    take: 200,
  });
  if (bookings.length === 0) return [];
  const reported = await prisma.staffIncomeReport.findMany({
    where: { bookingId: { in: bookings.map((b) => b.id) } },
    select: { bookingId: true },
  });
  const done = new Set(reported.map((r) => r.bookingId));
  return bookings
    .filter((b) => !done.has(b.id))
    .map((b) => ({
      id: b.id,
      customerName: b.customer.name ?? "",
      serviceName: b.service.name,
      staffId: b.staffId,
      staffName: b.staff?.name ?? null,
      startsAt: b.startsAt.toISOString(),
      endsAt: b.endsAt.toISOString(),
      expectedCents: b.priceCents,
      currency: b.currency,
    }));
}

/** The window owners would expect a reminder email in: daytime, salon time. */
function isDaytime(timezone: string) {
  const hour = Number(formatInTimeZone(new Date(), timezone, "H"));
  return hour >= 9 && hour < 21;
}

/** Called by the reminders cron: emails (and pushes) each staff member with
 * unreported bookings, at most once a day. Returns how many were reminded. */
export async function sendIncomeReminders() {
  const businesses = await prisma.business.findMany({
    where: { incomeRemindersSince: { not: null } },
    select: { id: true, name: true, logoUrl: true, city: true, timezone: true, incomeRemindersSince: true },
  });
  let sent = 0;
  for (const b of businesses) {
    if (!isDaytime(b.timezone)) continue;
    const staff = await prisma.staff.findMany({
      where: {
        businessId: b.id,
        active: true,
        userId: { not: null },
        OR: [{ incomeReminderSentAt: null }, { incomeReminderSentAt: { lt: new Date(Date.now() - 23 * HOUR) } }],
      },
      include: { user: { select: { id: true, email: true, name: true, locale: true } } },
    });
    for (const s of staff) {
      if (!s.user) continue;
      const list = await overdueBookings(b.id, b.incomeRemindersSince!, s.id);
      if (list.length === 0) continue;
      // Claimed first, so two cron runs at once never both send.
      const claimed = await prisma.staff.updateMany({
        where: { id: s.id, incomeReminderSentAt: s.incomeReminderSentAt },
        data: { incomeReminderSentAt: new Date() },
      });
      if (claimed.count === 0) continue;
      const locale = s.user.locale || "vi";
      const mail = incomeReminderEmail({
        locale,
        timezone: b.timezone,
        salon: { name: b.name, logoUrl: b.logoUrl, city: b.city },
        staffName: s.name,
        bookings: list,
        reportUrl: `${SITE_URL}/business/dashboard/income`,
      });
      try {
        await sendMail({ to: s.user.email, subject: mail.subject, html: mail.html });
        sent++;
      } catch (err) {
        console.error("[income-reminders] email", s.id, err);
      }
      await sendPushToUser(s.user.id, {
        title: mail.subject,
        body: mail.pushBody,
        url: "/business/dashboard/income",
        tag: "income-reminder",
        urgent: true,
      });
    }
  }
  return sent;
}
