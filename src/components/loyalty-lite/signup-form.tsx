"use client";

import { useState } from "react";
import { ArrowRight, Loader2, MailCheck } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";

/** Loyalty Lite sign-up: a new salon goes straight to its studio; a known
 * email gets a sign-in link instead. */
export function LiteSignupForm({ locale, t, expired }: { locale: string; t: LiteStrings; expired: boolean }) {
  const router = useRouter();
  const [salonName, setSalonName] = useState("");
  const [email, setEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(expired ? t.expired : null);
  const [sentTo, setSentTo] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/loyalty-lite/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ salonName, email, ownerName: ownerName || undefined, locale }),
    }).catch(() => null);
    const d = await res?.json().catch(() => null);
    if (!res?.ok) {
      setBusy(false);
      setError(res?.status === 429 ? t.errTooMany : t.errGeneric);
      return;
    }
    if (d?.status === "CHECK_EMAIL") {
      setBusy(false);
      setSentTo(email);
      return;
    }
    router.push("/loyalty-lite/studio");
  }

  if (sentTo) {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f6efe1] text-[#8a6a2c]">
          <MailCheck className="h-7 w-7" />
        </span>
        <p className="mt-4 font-serif text-2xl text-ink-900">{t.checkEmailTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{t.checkEmailText.replace("{email}", sentTo)}</p>
      </div>
    );
  }

  const field = "mt-1 h-12 w-full rounded-2xl border border-ink-100 bg-white px-4 text-sm text-ink-900 transition placeholder:text-ink-300 focus:border-[#c99a3f] focus:outline-none focus:ring-4 focus:ring-[#c99a3f]/15";
  return (
    <form onSubmit={submit} className="space-y-3.5">
      <label className="block text-xs font-bold text-ink-700">
        {t.salonName}
        <input required minLength={2} maxLength={120} value={salonName} onChange={(e) => setSalonName(e.target.value)} placeholder={t.salonNamePh} className={field} />
      </label>
      <label className="block text-xs font-bold text-ink-700">
        {t.email}
        <input required type="email" maxLength={191} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} className={field} autoComplete="email" />
      </label>
      <label className="block text-xs font-bold text-ink-700">
        {t.ownerName}
        <input maxLength={120} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className={field} autoComplete="name" />
      </label>
      {error && <p className="rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-sm font-bold text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] transition hover:brightness-105 disabled:opacity-70"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
        {t.submit}
      </button>
      <p className="text-center text-[11px] text-ink-400">{t.terms}</p>
    </form>
  );
}
