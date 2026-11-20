import { formatInTimeZone } from "date-fns-tz";
import { fi, vi } from "date-fns/locale";
import { CalendarCheck2, CalendarX2, Clock, Scissors, UserRound } from "lucide-react";
import { confirmByCustomer, loadConfirmBooking } from "@/lib/booking-protect";
import { bookingProtectStrings } from "@/lib/booking-protect-strings";
import { ConfirmCancelPanel } from "@/components/confirm-cancel-panel";
import { Link } from "@/i18n/navigation";

/** Where the Confirm / Cancel links of the 24h reminder land (src/lib/booking-protect.ts).
 * "?a=confirm" confirms on the spot; "?a=cancel" asks once more before cancelling. */
export default async function ConfirmBookingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; token: string }>;
  searchParams: Promise<{ a?: string }>;
}) {
  const { locale, token } = await params;
  const { a } = await searchParams;
  const S = bookingProtectStrings(locale);

  const booking = a === "confirm" ? await confirmByCustomer(token) : await loadConfirmBooking(token);
  const live = booking && ["CONFIRMED", "PENDING_PAYMENT", "PENDING_APPROVAL"].includes(booking.status) && booking.startsAt > new Date();

  const shell = (inner: React.ReactNode) => (
    <div className="min-h-screen bg-mist-50">
      <div className="container max-w-lg px-4 pb-16 pt-8 sm:pt-14">
        <p className="mb-3 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#b08a3e]">{S.pageEyebrow}</p>
        {inner}
      </div>
    </div>
  );

  if (!booking || !live) {
    return shell(
      <div className="rounded-3xl bg-white p-6 text-center shadow-[0_18px_40px_-30px_rgba(31,24,45,0.5)] ring-1 ring-ink-100">
        <CalendarX2 className="mx-auto h-12 w-12 text-ink-300" />
        <p className="mt-4 text-sm leading-relaxed text-ink-600">{S.pageNotFound}</p>
        {booking && (
          <Link href={`/b/${booking.business.slug}`} className="btn-primary mt-6 inline-flex !px-5 !py-2.5 text-sm">
            {S.pageBookAgain}
          </Link>
        )}
      </div>,
    );
  }

  const tz = booking.business.timezone;
  const when = formatInTimeZone(booking.startsAt, tz, locale === "fi" ? "EEEE d.M.yyyy 'klo' HH.mm" : "EEEE dd/MM/yyyy, HH:mm", {
    locale: locale === "vi" ? vi : locale === "fi" ? fi : undefined,
  });

  const card = (
    <div className="mt-5 space-y-2 rounded-2xl bg-mist-50 p-4 text-left text-sm ring-1 ring-ink-100">
      <p className="flex items-center gap-2 text-ink-800">
        <Scissors className="h-4 w-4 text-primary-500" />
        <span className="font-semibold">{booking.service.name}</span>
      </p>
      {booking.staff && (
        <p className="flex items-center gap-2 text-ink-600">
          <UserRound className="h-4 w-4 text-primary-500" />
          {booking.staff.name}
        </p>
      )}
      <p className="flex items-center gap-2 capitalize text-ink-600">
        <Clock className="h-4 w-4 text-primary-500" />
        {when}
      </p>
    </div>
  );

  if (a === "confirm") {
    return shell(
      <div className="rounded-3xl bg-white p-6 text-center shadow-[0_18px_40px_-30px_rgba(31,24,45,0.5)] ring-1 ring-ink-100">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30">
          <CalendarCheck2 className="h-8 w-8" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900">{S.pageConfirmedTitle}</h1>
        <p className="mt-2 text-sm text-ink-600">{S.pageConfirmedText(booking.business.name)}</p>
        {card}
      </div>,
    );
  }

  return shell(
    <ConfirmCancelPanel
      token={token}
      locale={locale}
      businessName={booking.business.name}
      businessSlug={booking.business.slug}
      alreadyConfirmed={!!booking.confirmedAt}
      startCancel={a === "cancel"}
    >
      {card}
    </ConfirmCancelPanel>,
  );
}
