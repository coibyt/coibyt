"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { addDays, addMonths, getISOWeek, isSameDay, isSameMonth, startOfMonth, startOfWeek } from "date-fns";
import { CalendarDays, ChevronLeft, ChevronRight, X } from "lucide-react";

const L = {
  vi: { title: "Chọn ngày", week: "Tuần", today: "Hôm nay", close: "Đóng", hint: "Bấm số tuần để xem cả tuần." },
  en: { title: "Pick a date", week: "Wk", today: "Today", close: "Close", hint: "Tap a week number to see the whole week." },
  fi: { title: "Valitse päivämäärä", week: "vk", today: "Tänään", close: "Sulje", hint: "Napauta viikon numeroa nähdäksesi koko viikon." },
};

/** The bookings calendar's date picker: a month with ISO week numbers, today
 * and the day on screen marked. A day jumps the calendar there; a week number
 * opens that week in the week view. */
export function CalendarDatePicker({
  locale,
  selected,
  today,
  onPickDay,
  onPickWeek,
  onClose,
}: {
  locale: string;
  selected: Date;
  today: Date;
  onPickDay: (d: Date) => void;
  onPickWeek: (monday: Date) => void;
  onClose: () => void;
}) {
  const t = (L as Record<string, (typeof L)["en"]>)[locale] ?? L.en;
  const [month, setMonth] = useState(() => startOfMonth(selected));
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Six Monday-first weeks covering the month.
  const first = startOfWeek(month, { weekStartsOn: 1 });
  const weeks = Array.from({ length: 6 }, (_, w) => Array.from({ length: 7 }, (_, d) => addDays(first, w * 7 + d))).filter(
    (week, i) => i < 5 || isSameMonth(week[0], month)
  );
  const monthLabel = (() => {
    const s = new Intl.DateTimeFormat(locale, { month: "long", year: "numeric" }).format(month);
    return s.charAt(0).toUpperCase() + s.slice(1);
  })();
  const dayNames = Array.from({ length: 7 }, (_, i) => new Intl.DateTimeFormat(locale, { weekday: "short" }).format(addDays(first, i)));

  const body = (
    <div className="fixed inset-0 z-[85] flex items-end justify-center bg-[#1f182d]/50 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md animate-slide-up overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]"
      >
        <div className="flex items-center justify-between gap-3 px-5 pb-3 pt-5">
          <p className="flex items-center gap-2 text-lg font-bold text-ink-900">
            <CalendarDays className="h-5 w-5 text-primary-500" />
            {t.title}
          </p>
          <button type="button" onClick={onClose} aria-label={t.close} className="rounded-full p-2 text-ink-400 hover:bg-mist-50">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mx-4 flex items-center justify-between rounded-2xl bg-gradient-to-r from-[#1f182d] to-[#40325c] px-2 py-2 text-white">
          <button type="button" onClick={() => setMonth((m) => addMonths(m, -1))} aria-label="Previous month" className="rounded-full p-2 hover:bg-white/10">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm font-bold">{monthLabel}</span>
          <button type="button" onClick={() => setMonth((m) => addMonths(m, 1))} aria-label="Next month" className="rounded-full p-2 hover:bg-white/10">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="px-4 pb-2 pt-3">
          <div className="grid grid-cols-[2.25rem_repeat(7,minmax(0,1fr))] gap-1 text-center text-[11px] font-bold uppercase text-ink-400">
            <span className="py-1">{t.week}</span>
            {dayNames.map((n, i) => (
              <span key={i} className={`py-1 ${i === 6 ? "text-berry-500" : ""}`}>
                {n}
              </span>
            ))}
          </div>
          <div className="mt-1 space-y-1">
            {weeks.map((week) => (
              <div key={week[0].toISOString()} className="grid grid-cols-[2.25rem_repeat(7,minmax(0,1fr))] gap-1">
                <button
                  type="button"
                  onClick={() => onPickWeek(week[0])}
                  className="flex h-10 items-center justify-center rounded-xl bg-mist-50 text-xs font-bold tabular-nums text-primary-700 hover:bg-primary-100"
                >
                  {getISOWeek(week[0])}
                </button>
                {week.map((d, i) => {
                  const inMonth = isSameMonth(d, month);
                  const isToday = isSameDay(d, today);
                  const isSel = isSameDay(d, selected);
                  return (
                    <button
                      key={d.toISOString()}
                      type="button"
                      onClick={() => onPickDay(d)}
                      className={`relative flex h-10 items-center justify-center rounded-xl text-sm font-semibold tabular-nums transition ${
                        isSel
                          ? "bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md"
                          : isToday
                            ? "bg-[#f4ec7a] text-ink-900 ring-1 ring-[#e3d84c]"
                            : i === 6 && inMonth
                              ? "bg-berry-50 text-berry-600 hover:bg-berry-100"
                              : inMonth
                                ? "text-ink-900 hover:bg-mist-50"
                                : "text-ink-200 hover:bg-mist-50"
                      }`}
                    >
                      {d.getDate()}
                      {isToday && isSel && <span className="absolute bottom-1 h-1 w-1 rounded-full bg-[#f4ec7a]" />}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-[11px] text-ink-400">{t.hint}</p>
        </div>

        <div className="px-4 pb-5 pt-1">
          <button
            type="button"
            onClick={() => onPickDay(today)}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f182d] py-3 text-sm font-bold text-white"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full ring-2 ring-white">
              <span className="h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            {t.today}
          </button>
        </div>
      </div>
    </div>
  );

  return mounted ? createPortal(body, document.body) : null;
}
