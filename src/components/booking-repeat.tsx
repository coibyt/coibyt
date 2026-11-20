"use client";

import { useState } from "react";
import { BellPlus, CalendarRange, Check, Loader2, Repeat, X } from "lucide-react";
import { recurringStrings } from "@/lib/recurring-strings";

const EVERY_OPTIONS = [1, 2, 3, 4, 6, 8];
const COUNT_OPTIONS = [4, 8, 12, 26];
const REBOOK_OPTIONS = [2, 3, 4, 6, 8, 12];

/** The booking panel's "repeat" and "remind to book again" controls
 * (src/lib/recurring.ts). */
export function BookingRepeatControls({
  bookingId,
  locale,
  timezone,
  recurringEveryWeeks,
  rebookReminderAt,
  rebookReminderSentAt,
  customerHasEmail,
  canRepeat,
  onChanged,
}: {
  bookingId: string;
  locale: string;
  timezone: string;
  /** Set when this booking heads or belongs to a series. */
  recurringEveryWeeks: number | null;
  rebookReminderAt: string | null;
  rebookReminderSentAt: string | null;
  customerHasEmail: boolean;
  /** Live bookings only (not cancelled / no-show). */
  canRepeat: boolean;
  onChanged: () => void;
}) {
  const S = recurringStrings(locale);
  const [open, setOpen] = useState<"repeat" | "rebook" | null>(null);
  const [every, setEvery] = useState(4);
  const [count, setCount] = useState<number | null>(8);
  const [until, setUntil] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<{ text: string; ok: boolean } | null>(null);
  const [reminderAt, setReminderAt] = useState(rebookReminderAt);

  const day = (iso: string) =>
    new Date(iso).toLocaleDateString(locale === "vi" ? "vi-VN" : locale === "fi" ? "fi-FI" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: timezone });

  async function createSeries() {
    setBusy(true);
    setNotice(null);
    const res = await fetch(`/api/business/bookings/${bookingId}/recurring`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ everyWeeks: every, count: until ? null : count, untilDate: until || null }),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      const { created, skipped } = (await res.json()) as { created: number; skipped: string[] };
      setNotice({ text: S.created(created, skipped.length), ok: true });
      setOpen(null);
      onChanged();
    } else setNotice({ text: S.error, ok: false });
  }

  async function cancelRest() {
    setBusy(true);
    const res = await fetch(`/api/business/bookings/${bookingId}/recurring`, { method: "DELETE" }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      const { cancelled } = (await res.json()) as { cancelled: number };
      setNotice({ text: S.cancelledRest(cancelled), ok: true });
      onChanged();
    } else setNotice({ text: S.error, ok: false });
  }

  async function setRebook(weeks: number | null) {
    setBusy(true);
    setNotice(null);
    const res = await fetch(`/api/business/bookings/${bookingId}/rebook`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weeks }),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      const { rebookReminderAt: at } = (await res.json()) as { rebookReminderAt: string | null };
      setReminderAt(at);
      setOpen(null);
      onChanged();
    } else setNotice({ text: S.error, ok: false });
  }

  return (
    <div className="mt-4 space-y-2 border-t border-ink-100 pt-4">
      {notice && (
        <p className={`rounded-lg px-3 py-2 text-xs font-semibold ${notice.ok ? "bg-emerald-50 text-emerald-800" : "bg-berry-50 text-berry-500"}`}>{notice.text}</p>
      )}

      {/* Series */}
      {recurringEveryWeeks ? (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 font-semibold text-primary-800">
            <Repeat className="h-3.5 w-3.5" /> {S.inSeries(recurringEveryWeeks)}
          </span>
          {canRepeat && (
            <button type="button" disabled={busy} onClick={cancelRest} className="font-semibold text-berry-500 hover:underline">
              {S.cancelRest}
            </button>
          )}
        </div>
      ) : canRepeat && open !== "repeat" ? (
        <button type="button" onClick={() => setOpen("repeat")} className="btn-outline !px-3 !py-1.5 text-xs">
          <Repeat className="h-3.5 w-3.5" /> {S.repeatButton}
        </button>
      ) : null}

      {open === "repeat" && (
        <div className="space-y-3 rounded-xl border border-ink-100 bg-mist-50 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-ink-900">{S.repeatTitle}</p>
              <p className="text-xs text-ink-400">{S.repeatSub}</p>
            </div>
            <button type="button" onClick={() => setOpen(null)} className="text-ink-400" aria-label={S.close}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-ink-700">{S.every}</p>
            <div className="flex flex-wrap gap-1">
              {EVERY_OPTIONS.map((n) => (
                <button key={n} type="button" onClick={() => setEvery(n)} className={`rounded-full px-2.5 py-1 text-xs font-semibold ${every === n ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100"}`}>
                  {S.everyWeeks(n)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-1 text-xs font-semibold text-ink-700">{S.howMany}</p>
            <div className="flex flex-wrap items-center gap-1">
              {COUNT_OPTIONS.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => {
                    setCount(n);
                    setUntil("");
                  }}
                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${count === n && !until ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100"}`}
                >
                  {S.times(n)}
                </button>
              ))}
              <span className="ml-1 text-xs text-ink-400">{S.orUntil}</span>
              <input type="date" value={until} onChange={(e) => setUntil(e.target.value)} className="input !h-8 !w-auto !py-0 text-xs" />
            </div>
          </div>
          <button type="button" disabled={busy || (!count && !until)} onClick={createSeries} className="btn-primary !px-3 !py-1.5 text-xs">
            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CalendarRange className="h-3.5 w-3.5" />} {S.create}
          </button>
        </div>
      )}

      {/* Rebook reminder */}
      {reminderAt ? (
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 font-semibold ${rebookReminderSentAt ? "bg-emerald-50 text-emerald-800" : "bg-[#fbf6ec] text-[#7a5f2c]"}`}>
            {rebookReminderSentAt ? <Check className="h-3.5 w-3.5" /> : <BellPlus className="h-3.5 w-3.5" />}
            {rebookReminderSentAt ? S.rebookSent(day(rebookReminderSentAt)) : S.rebookSet(day(reminderAt))}
          </span>
          {!rebookReminderSentAt && (
            <button type="button" disabled={busy} onClick={() => setRebook(null)} className="font-semibold text-berry-500 hover:underline">
              {S.rebookRemove}
            </button>
          )}
        </div>
      ) : open !== "rebook" ? (
        <button
          type="button"
          disabled={!customerHasEmail}
          title={customerHasEmail ? undefined : S.noEmail}
          onClick={() => setOpen("rebook")}
          className="btn-outline !px-3 !py-1.5 text-xs disabled:opacity-50"
        >
          <BellPlus className="h-3.5 w-3.5" /> {S.rebookButton}
        </button>
      ) : null}

      {open === "rebook" && (
        <div className="space-y-2 rounded-xl border border-ink-100 bg-mist-50 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-ink-900">{S.rebookTitle}</p>
              <p className="text-xs text-ink-400">{S.rebookSub}</p>
            </div>
            <button type="button" onClick={() => setOpen(null)} className="text-ink-400" aria-label={S.close}>
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {REBOOK_OPTIONS.map((n) => (
              <button key={n} type="button" disabled={busy} onClick={() => setRebook(n)} className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 hover:bg-ink-900 hover:text-white">
                {S.rebookWeeks(n)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
