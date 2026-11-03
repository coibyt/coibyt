"use client";

import { useEffect, useState } from "react";
import { CalendarDays, CheckCircle2, CircleDashed, ExternalLink, Loader2, X } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import { Link } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { formatMoney } from "@/lib/money";
import type { IncomeReportJson } from "@/lib/income";
import type { IncomeStrings } from "@/lib/income-strings";

interface DayBooking {
  id: string;
  startsAt: string;
  endsAt: string;
  status: string;
  priceCents: number;
  currency: string;
  staffId: string | null;
  staffName: string | null;
  serviceName: string;
  customerName: string | null;
  customerNote: string | null;
}

/** From the income spreadsheet: one staff member's bookings on the day of
 * the clicked row, each marked reported or not, with the day's reported
 * income — and a link to the booking on the calendar. */
export function IncomeDayModal({
  report,
  dayReports,
  S,
  locale,
  timezone,
  currency,
  onClose,
}: {
  report: IncomeReportJson;
  /** Everyone's reports on the page, to mark which bookings are reported. */
  dayReports: IncomeReportJson[];
  S: IncomeStrings;
  locale: string;
  timezone: string;
  currency: string;
  onClose: () => void;
}) {
  const day = formatInTimeZone(new Date(report.serviceAt), timezone, "yyyy-MM-dd");
  const [bookings, setBookings] = useState<DayBooking[] | null>(null);
  const [noAccess, setNoAccess] = useState(false);

  useEffect(() => {
    let alive = true;
    fetch(`/api/business/bookings/calendar?from=${day}&to=${day}`)
      .then(async (r) => {
        if (!alive) return;
        if (!r.ok) {
          setNoAccess(true);
          setBookings([]);
          return;
        }
        const d: { bookings: DayBooking[] } = await r.json();
        setBookings(d.bookings.filter((b) => (report.staffId ? b.staffId === report.staffId : true)).sort((a, b) => a.startsAt.localeCompare(b.startsAt)));
      })
      .catch(() => alive && (setNoAccess(true), setBookings([])));
    return () => {
      alive = false;
    };
  }, [day, report.staffId]);

  const sameDay = dayReports.filter((r) => r.staffId === report.staffId && formatInTimeZone(new Date(r.serviceAt), timezone, "yyyy-MM-dd") === day);
  const byBooking = new Map(sameDay.filter((r) => r.bookingId).map((r) => [r.bookingId!, r]));
  const income = sameDay.reduce((n, r) => n + r.totalCents, 0);
  const tips = sameDay.reduce((n, r) => n + r.tipCents, 0);
  const title = new Intl.DateTimeFormat(locale, { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: timezone }).format(new Date(report.serviceAt));
  const hm = (iso: string) => formatInTimeZone(new Date(iso), timezone, "HH:mm");
  const money = (c: number, cur = currency) => formatMoney(c, cur, locale);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1f182d]/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div className="flex max-h-[90vh] w-full max-w-2xl animate-slide-up flex-col overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
        <header className="relative bg-gradient-to-br from-[#1f182d] to-[#40325c] px-6 pb-5 pt-6 text-white">
          <button type="button" onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 hover:bg-white/20">
            <X className="h-4 w-4" />
          </button>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#e8d3a6]">
            <CalendarDays className="h-4 w-4" />
            {fill(S.dayTitle, { date: title })}
          </p>
          <p className="mt-1 font-serif text-2xl">{report.staffName ? fill(S.dayOf, { name: report.staffName }) : S.dayAll}</p>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-2xl bg-white/[0.08] p-3 ring-1 ring-white/10">
              <p className="text-[11px] text-white/60">{S.dayIncome}</p>
              <p className="text-xl font-bold tabular-nums">{money(income)}</p>
            </div>
            <div className="rounded-2xl bg-white/[0.08] p-3 ring-1 ring-white/10">
              <p className="text-[11px] text-white/60">{S.colTip}</p>
              <p className="text-xl font-bold tabular-nums text-[#e8d3a6]">{money(tips)}</p>
            </div>
          </div>
        </header>

        <div className="overflow-y-auto p-4 sm:p-5">
          {!bookings ? (
            <Loader2 className="mx-auto my-8 h-6 w-6 animate-spin text-primary-500" />
          ) : noAccess ? (
            <>
              <p className="mb-3 text-xs text-ink-400">{S.dayNoAccess}</p>
              <ul className="space-y-2">
                {sameDay.map((r) => (
                  <li key={r.id} className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 ring-1 ${r.id === report.id ? "bg-[#f4f1fa] ring-[#cdbfe0]" : "ring-ink-100"}`}>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-ink-900">{r.customerName || "—"}</span>
                      <span className="block truncate text-xs text-ink-400">
                        {hm(r.serviceAt)} · {r.serviceName}
                      </span>
                    </span>
                    <span className="shrink-0 text-sm font-bold tabular-nums">{money(r.totalCents, r.currency)}</span>
                  </li>
                ))}
              </ul>
            </>
          ) : bookings.length === 0 ? (
            <p className="py-8 text-center text-sm text-ink-400">{S.dayNone}</p>
          ) : (
            <ul className="space-y-2">
              {bookings.map((b) => {
                const rep = byBooking.get(b.id);
                const here = b.id === report.bookingId;
                return (
                  <li key={b.id} className={`rounded-2xl px-3 py-2.5 ring-1 ${here ? "bg-[#f4f1fa] ring-[#cdbfe0]" : "ring-ink-100"}`}>
                    <div className="flex items-start justify-between gap-3">
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold tabular-nums text-ink-400">
                          {hm(b.startsAt)}–{hm(b.endsAt)}
                        </span>
                        <span className="block truncate text-sm font-bold text-ink-900">{b.customerName || "—"}</span>
                        <span className="block truncate text-xs text-ink-500">{b.serviceName}</span>
                        {b.customerNote && <span className="mt-1 block truncate text-[11px] italic text-ink-400">“{b.customerNote}”</span>}
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-sm font-bold tabular-nums text-ink-900">{money(rep ? rep.totalCents : b.priceCents, b.currency)}</span>
                        {rep ? (
                          <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                            <CheckCircle2 className="h-3 w-3" />
                            {rep.status === "APPROVED" ? S.approved : rep.status === "REJECTED" ? S.rejected : S.dayReported}
                          </span>
                        ) : (
                          <span className="mt-0.5 inline-flex items-center gap-1 rounded-full bg-mist-50 px-2 py-0.5 text-[10px] font-bold text-ink-400">
                            <CircleDashed className="h-3 w-3" />
                            {S.dayNotReported}
                          </span>
                        )}
                        {rep && rep.tipCents > 0 && <span className="block text-[10px] font-semibold text-[#8a6a2c]">+ {S.colTip} {money(rep.tipCents, rep.currency)}</span>}
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {report.bookingId && !noAccess && (
          <footer className="border-t border-ink-100 p-4">
            <Link href={`/business/dashboard/bookings?edit=${report.bookingId}`} className="flex items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3 text-sm font-bold text-white">
              <ExternalLink className="h-4 w-4 text-[#e8d3a6]" />
              {S.openOnCalendar}
            </Link>
          </footer>
        )}
      </div>
    </div>
  );
}
