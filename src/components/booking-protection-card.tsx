"use client";

import { useState } from "react";
import { Check, Coins, Loader2, ShieldCheck, TimerOff, UserX } from "lucide-react";
import { bookingProtectStrings } from "@/lib/booking-protect-strings";

export interface BookingProtection {
  noShowApprovalOn: boolean;
  noShowApprovalCount: number;
  autoCancelUnconfirmedHours: number | null;
  onTimePoints: number;
}

const COUNT_OPTIONS = [1, 2, 3, 5];
const HOURS_OPTIONS = [2, 4, 6, 12];
const POINTS_OPTIONS = [0, 5, 10, 20, 50, 100];

/** Settings → Booking & policies: the no-show rules (src/lib/booking-protect.ts),
 * each a switch with its own number; everything off by default. */
export function BookingProtectionCard({ locale, initial }: { locale: string; initial: BookingProtection }) {
  const S = bookingProtectStrings(locale);
  const [values, setValues] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<"saved" | "error" | null>(null);

  async function save(patch: Partial<BookingProtection>) {
    const next = { ...values, ...patch };
    setValues(next);
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/business/booking-protection", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      setMsg("saved");
      setTimeout(() => setMsg(null), 2000);
    } else {
      setValues(values);
      setMsg("error");
    }
  }

  const rows: {
    key: string;
    icon: typeof UserX;
    title: string;
    sub: string;
    on: boolean;
    toggle: () => void;
    label: string;
    value: number;
    options: number[];
    format: (n: number) => string;
    set: (n: number) => void;
  }[] = [
    {
      key: "approval",
      icon: UserX,
      title: S.approvalTitle,
      sub: S.approvalSub,
      on: values.noShowApprovalOn,
      toggle: () => save({ noShowApprovalOn: !values.noShowApprovalOn }),
      label: S.approvalCount,
      value: values.noShowApprovalCount,
      options: COUNT_OPTIONS,
      format: S.approvalTimes,
      set: (n) => save({ noShowApprovalCount: n }),
    },
    {
      key: "autoCancel",
      icon: TimerOff,
      title: S.autoCancelTitle,
      sub: S.autoCancelSub,
      on: values.autoCancelUnconfirmedHours !== null,
      toggle: () => save({ autoCancelUnconfirmedHours: values.autoCancelUnconfirmedHours === null ? 4 : null }),
      label: S.autoCancelHours,
      value: values.autoCancelUnconfirmedHours ?? 4,
      options: HOURS_OPTIONS,
      format: S.hours,
      set: (n) => save({ autoCancelUnconfirmedHours: n }),
    },
    {
      key: "points",
      icon: Coins,
      title: S.pointsTitleSetting,
      sub: S.pointsSub,
      on: values.onTimePoints > 0,
      toggle: () => save({ onTimePoints: values.onTimePoints > 0 ? 0 : 10 }),
      label: S.pointsLabel,
      value: values.onTimePoints,
      options: POINTS_OPTIONS.filter((n) => n > 0),
      format: (n) => String(n),
      set: (n) => save({ onTimePoints: n }),
    },
  ];

  return (
    <div className="card !p-0">
      <div className="flex items-start gap-3 border-b border-ink-100 px-5 py-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e8d3a6] to-[#b08a3e] text-white">
          <ShieldCheck className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="font-semibold text-ink-900">{S.settingsTitle}</h2>
          <p className="mt-1 text-xs leading-relaxed text-ink-400">{S.settingsSub}</p>
        </div>
        <span className={`shrink-0 text-xs font-semibold ${msg === "error" ? "text-berry-500" : "text-emerald-700"}`}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin text-ink-400" /> : msg === "saved" ? <span className="inline-flex items-center gap-1"><Check className="h-3.5 w-3.5" /> {S.saved}</span> : msg === "error" ? S.error : null}
        </span>
      </div>
      <div className="divide-y divide-ink-100 px-5">
        {rows.map((r) => (
          <div key={r.key} className="flex items-start gap-4 py-4">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${r.on ? "bg-gradient-to-br from-primary-500 to-primary-700 text-white" : "bg-mist-50 text-ink-400"}`}>
              <r.icon className="h-5 w-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-ink-900">{r.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-ink-500">{r.sub}</p>
              <div className={`mt-2 flex flex-wrap items-center gap-2 text-xs ${r.on ? "" : "opacity-50"}`}>
                <span className="font-semibold text-ink-700">{r.label}:</span>
                <div className="flex flex-wrap gap-1">
                  {r.options.map((n) => (
                    <button
                      key={n}
                      type="button"
                      disabled={!r.on || busy}
                      onClick={() => r.set(n)}
                      className={`rounded-full px-2.5 py-1 font-semibold transition-colors ${
                        r.value === n ? "bg-ink-900 text-white" : "bg-mist-50 text-ink-700 hover:bg-mist-100"
                      }`}
                    >
                      {r.format(n)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={r.on}
              aria-label={r.title}
              onClick={r.toggle}
              disabled={busy}
              className={`relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors disabled:opacity-60 ${r.on ? "bg-primary-500" : "bg-ink-100"}`}
            >
              <span className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${r.on ? "left-6" : "left-1"}`} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
