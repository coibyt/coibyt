"use client";

import { useEffect, useState } from "react";
import { AlertTriangle, ChevronRight } from "lucide-react";
import { formatInTimeZone } from "date-fns-tz";
import { fill } from "@/lib/shop-strings";
import { incomeStrings } from "@/lib/income-strings";
import type { OverdueBooking } from "@/lib/income-reminders";

/** For staff, at the top of the bookings calendar: bookings that ended over
 * 24 hours ago without an income report, by day — tapping a day opens it in
 * the calendar, where each booking is reported. Unlike IncomeReminderAlarm it
 * can't be snoozed: it stays until everything is reported. */
export function IncomeOverdueBanner({
  locale,
  timeZone,
  refreshKey,
  onOpenDay,
}: {
  locale: string;
  timeZone: string;
  /** Changes when the calendar reloads, e.g. after a report was sent. */
  refreshKey: unknown;
  /** The first overdue booking's start on that day. */
  onOpenDay: (startsAt: string) => void;
}) {
  const S = incomeStrings(locale);
  const [list, setList] = useState<OverdueBooking[]>([]);

  useEffect(() => {
    let alive = true;
    fetch("/api/business/income/overdue")
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { enabled: boolean; reportsFrom: string | null; bookings: OverdueBooking[] } | null) => {
        // Only when the owner asks staff to report (reminders on, or a start day set).
        if (alive) setList(d && (d.enabled || d.reportsFrom) ? d.bookings : []);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [refreshKey]);

  if (list.length === 0) return null;

  const days = new Map<string, OverdueBooking[]>();
  for (const b of list) {
    const key = formatInTimeZone(new Date(b.startsAt), timeZone, "yyyy-MM-dd");
    days.set(key, [...(days.get(key) ?? []), b]);
  }
  const label = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "numeric", timeZone });

  return (
    <div role="alert" className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#d6264f] to-[#a3123a] p-4 text-white shadow-lg shadow-[#d6264f]/25">
      <div className="flex items-start gap-3">
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
          <span className="absolute inset-0 animate-ping rounded-full bg-white/20" />
          <AlertTriangle className="h-5 w-5" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-extrabold leading-snug sm:text-base">{fill(S.bannerTitle, { n: list.length })}</p>
          <p className="mt-0.5 text-xs leading-relaxed text-white/85">{S.bannerText}</p>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {[...days.entries()].map(([key, items]) => (
          <button
            key={key}
            type="button"
            onClick={() => onOpenDay(items[0].startsAt)}
            className="flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#a3123a] shadow-sm transition hover:bg-rose-50"
          >
            {label.format(new Date(items[0].startsAt))}
            <span className="rounded-full bg-[#d6264f] px-1.5 text-[10px] leading-4 text-white">{fill(S.bannerDay, { n: items.length })}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        ))}
      </div>
    </div>
  );
}
