"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BellRing, Receipt } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { incomeStrings } from "@/lib/income-strings";
import { formatMoney } from "@/lib/money";
import { playRingtoneOnce, ringtoneById } from "@/lib/ringtones";
import { IncomeReportModal } from "@/components/income-report";
import type { OverdueBooking } from "@/lib/income-reminders";

const POLL_MS = 15 * 60 * 1000;
const SNOOZE_KEY = "varaaai_income_reminder_later";
const SNOOZE_MS = 2 * 60 * 60 * 1000;
const RINGS = 3;

/** For staff: when bookings they did ended over 24 hours ago without an
 * income report (and the owner has reminders on), the dashboard / app rings
 * and lists them, each with a button to report it right there. "Later"
 * silences it for two hours. */
export function IncomeReminderAlarm({ locale }: { locale: string }) {
  const S = incomeStrings(locale);
  const [list, setList] = useState<OverdueBooking[]>([]);
  const [open, setOpen] = useState(false);
  const [reporting, setReporting] = useState<OverdueBooking | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const toneRef = useRef("classic");

  const ring = useCallback(async () => {
    try {
      const res = await fetch("/api/business/ringtone");
      if (res.ok) {
        const d: { id?: string } = await res.json();
        if (d.id) toneRef.current = d.id;
      }
    } catch {}
    const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    ctxRef.current ??= new Ctx();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") await ctx.resume().catch(() => {});
    const tone = ringtoneById(toneRef.current);
    for (let i = 0; i < RINGS; i++) {
      setTimeout(() => {
        playRingtoneOnce(ctx, toneRef.current);
        navigator.vibrate?.(tone.vibrate);
      }, i * (tone.length * 1000 + 500));
    }
  }, []);

  const check = useCallback(async () => {
    let snoozed = false;
    try {
      snoozed = Number(localStorage.getItem(SNOOZE_KEY) ?? 0) > Date.now();
    } catch {}
    if (snoozed) return;
    const res = await fetch("/api/business/income/overdue").catch(() => null);
    if (!res?.ok) return;
    const d: { enabled: boolean; bookings: OverdueBooking[] } = await res.json();
    if (!d.enabled || d.bookings.length === 0) return;
    setList(d.bookings);
    setOpen(true);
    ring();
  }, [ring]);

  useEffect(() => {
    const first = setTimeout(check, 4000);
    const id = setInterval(check, POLL_MS);
    // Browsers only allow sound after a touch: ring once more on the first one.
    const onTouch = () => {
      if (ctxRef.current?.state === "suspended") ring();
    };
    window.addEventListener("pointerdown", onTouch, { once: true });
    return () => {
      clearTimeout(first);
      clearInterval(id);
      window.removeEventListener("pointerdown", onTouch);
    };
  }, [check, ring]);

  function later() {
    try {
      localStorage.setItem(SNOOZE_KEY, String(Date.now() + SNOOZE_MS));
    } catch {}
    navigator.vibrate?.(0);
    setOpen(false);
  }

  if (!open || list.length === 0) return null;
  const when = new Intl.DateTimeFormat(locale, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <>
      <div className="fixed inset-0 z-[85] flex items-end justify-center bg-[#1f182d]/60 p-0 backdrop-blur-sm sm:items-center sm:p-4" role="alertdialog">
        <div className="w-full max-w-md animate-slide-up overflow-hidden rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1f182d] via-[#40325c] to-[#6d2a6f] px-6 pb-6 pt-7 text-center text-white">
            <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-[#c99a3f]/30 blur-3xl" />
            <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#c99a3f]/25 text-[#e8d3a6]">
              <span className="absolute inset-0 animate-ping rounded-full bg-[#c99a3f]/25" />
              <BellRing className="h-8 w-8 animate-bounce" />
            </span>
            <p className="relative mt-4 text-xl font-extrabold">{S.alarmTitle}</p>
            <p className="relative mt-1 text-sm text-white/75">{fill(S.alarmBody, { n: list.length })}</p>
          </div>
          <ul className="max-h-[42vh] divide-y divide-ink-100 overflow-y-auto">
            {list.map((b) => (
              <li key={b.id} className="flex items-center gap-3 px-5 py-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#fbf3e1] text-[#8a6a2b]">
                  <Receipt className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-ink-900">{b.customerName || "—"}</span>
                  <span className="block truncate text-xs text-ink-400">
                    {when.format(new Date(b.startsAt))} · {formatMoney(b.expectedCents, b.currency, locale)}
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => setReporting(b)}
                  className="shrink-0 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] px-3.5 py-1.5 text-xs font-bold text-white"
                >
                  {S.reportNow}
                </button>
              </li>
            ))}
          </ul>
          <div className="grid grid-cols-2 gap-2 p-4">
            <button type="button" onClick={later} className="rounded-full bg-mist-100 py-3 text-sm font-bold text-ink-900">
              {S.alarmLater}
            </button>
            <Link href="/business/dashboard/income" onClick={later} className="rounded-full bg-[#1f182d] py-3 text-center text-sm font-bold text-white">
              {S.alarmOpen}
            </Link>
          </div>
        </div>
      </div>
      {reporting && (
        <IncomeReportModal
          locale={locale}
          booking={{
            id: reporting.id,
            customerName: reporting.customerName,
            serviceName: reporting.serviceName,
            staffName: reporting.staffName,
            startsAt: reporting.startsAt,
            expectedCents: reporting.expectedCents,
            currency: reporting.currency,
          }}
          report={null}
          onClose={() => setReporting(null)}
          onSaved={(r) => {
            if (!r) return;
            setList((prev) => {
              const next = prev.filter((x) => x.id !== reporting.id);
              if (next.length === 0) setOpen(false);
              return next;
            });
          }}
        />
      )}
    </>
  );
}
