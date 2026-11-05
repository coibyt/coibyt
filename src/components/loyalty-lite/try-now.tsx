"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";

/** "Try it now, no email": a trial salon on this browser, straight into the studio. */
export function LiteTryNow({ locale, t }: { locale: string; t: LiteStrings }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function start() {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/loyalty-lite/try", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ locale }),
    }).catch(() => null);
    if (!res?.ok) {
      setBusy(false);
      setError(res?.status === 429 ? t.tryTooMany : t.errGeneric);
      return;
    }
    router.push("/loyalty-lite/studio");
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={start}
        disabled={busy}
        className="group flex h-16 w-full items-center justify-center gap-2.5 rounded-full bg-gradient-to-r from-[#e0559b] via-[#c42d7f] to-[#a3155f] px-6 text-lg font-bold text-white shadow-[0_22px_40px_-16px_rgba(163,21,95,0.95)] transition hover:brightness-105 disabled:opacity-70"
      >
        {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Sparkles className="h-5 w-5 text-[#ffe3f1]" />}
        {t.tryNow}
        {!busy && <ArrowRight className="h-5 w-5 transition group-hover:translate-x-0.5" />}
      </button>
      <p className="mt-2 text-center text-xs leading-relaxed text-ink-500">{t.tryHint}</p>
      {error && <p className="mt-2 rounded-xl bg-berry-50 px-3 py-2 text-center text-xs font-semibold text-berry-600">{error}</p>}
    </div>
  );
}

/** A thin "or …" divider. */
export function LiteOr({ label }: { label: string }) {
  return (
    <div className="my-5 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.2em] text-ink-300">
      <span className="h-px flex-1 bg-[#f3c4dd]" />
      {label}
      <span className="h-px flex-1 bg-[#f3c4dd]" />
    </div>
  );
}
