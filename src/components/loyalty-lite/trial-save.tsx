"use client";

import { forwardRef, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { fill } from "@/lib/shop-strings";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";

/** On a trial studio: save the salon with an email (and its real name), so
 * the cards survive a new phone or a cleared browser. `urgent` once the
 * trial's free cards are used up. */
export const LiteTrialSave = forwardRef<
  HTMLDivElement,
  {
    t: LiteStrings;
    salonName: string;
    used: number;
    max: number;
    urgent: boolean;
    onSaved: (v: { email: string; salonName: string }) => void;
  }
>(function LiteTrialSave({ t, salonName, used, max, urgent, onSaved }, ref) {
  const [name, setName] = useState(salonName);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/loyalty-lite/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, salonName: name }),
    }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(false);
    if (!res?.ok) return setError(d?.error === "EMAIL_TAKEN" ? t.trialEmailTaken : t.errGeneric);
    onSaved({ email: d.email, salonName: d.salonName });
  }

  const field =
    "h-12 w-full rounded-2xl border border-[#f0cfe0] bg-white px-4 text-sm text-ink-900 placeholder:text-ink-300 focus:border-[#d6337f] focus:outline-none focus:ring-4 focus:ring-[#d6337f]/15";

  return (
    <div
      ref={ref}
      className={`scroll-mt-24 rounded-[1.75rem] p-5 ring-1 transition sm:p-6 ${
        urgent ? "bg-gradient-to-br from-[#fff1f7] to-[#fdf2f8] ring-2 ring-[#e0559b] shadow-[0_18px_40px_-24px_rgba(163,21,95,0.7)]" : "bg-gradient-to-br from-[#fffaf0] to-[#fdf2f8] ring-[#f3d9b0]"
      }`}
    >
      <p className="flex items-center gap-2 text-base font-bold text-[#4a1236]">
        <ShieldCheck className="h-5 w-5 text-[#c42d7f]" />
        {t.trialTitle}
      </p>
      <p className="mt-1 text-sm text-ink-600">{fill(urgent ? t.trialNeed : t.trialText, { n: Math.min(used, max), max })}</p>
      <form onSubmit={save} className="mt-4 grid gap-2 sm:grid-cols-[1fr_1fr_auto]">
        <input required minLength={2} maxLength={120} value={name} onChange={(e) => setName(e.target.value)} placeholder={t.salonNamePh} aria-label={t.salonName} className={field} />
        <input required type="email" maxLength={191} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} aria-label={t.email} autoComplete="email" className={field} />
        <button
          type="submit"
          disabled={busy}
          className="flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e0559b] via-[#c42d7f] to-[#a3155f] px-6 text-sm font-bold text-white shadow-[0_12px_24px_-14px_rgba(163,21,95,0.9)] disabled:opacity-60"
        >
          {busy && <Loader2 className="h-4 w-4 animate-spin" />}
          {t.trialSave}
        </button>
      </form>
      {error && <p className="mt-2 text-xs font-semibold text-berry-600">{error}</p>}
    </div>
  );
});
