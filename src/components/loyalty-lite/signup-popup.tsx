"use client";

import { useEffect, useState } from "react";
import { Check, Sparkles, X } from "lucide-react";
import { LiteSignupForm } from "@/components/loyalty-lite/signup-form";
import { LiteOr, LiteTryNow } from "@/components/loyalty-lite/try-now";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";
import { trackLite } from "@/components/loyalty-lite/visit-tracker";

/** The welcome card over /loyalty-lite for visitors without an account:
 * the page blurs behind it and the sign-up form is the first thing they
 * see. "Look around first" closes it (remembered for the tab) — the same
 * form stays on the page underneath. */
export function LiteSignupPopup({ locale, t, expired, initialMode }: { locale: string; t: LiteStrings; expired: boolean; initialMode: "signup" | "login" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      // A sign-in link that no longer works always brings the card back.
      if (expired || !sessionStorage.getItem("varaaai_lite_popup_closed")) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [expired]);

  // No page scroll behind the card; Escape closes it.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function close() {
    setOpen(false);
    trackLite("popup_close");
    try {
      sessionStorage.setItem("varaaai_lite_popup_closed", "1");
    } catch {}
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-[#4a1236]/45 backdrop-blur-md" role="dialog" aria-modal="true" aria-label={t.popupTitle}>
      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-lg animate-slide-up overflow-hidden rounded-[2.5rem] bg-white/95 shadow-[0_50px_100px_-30px_rgba(74,18,54,0.7)] ring-1 ring-white/60 backdrop-blur">
          <div className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-[#f6c6e0]/70 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-16 h-56 w-56 rounded-full bg-[#f5d9a8]/60 blur-3xl" />

          <button
            type="button"
            onClick={close}
            aria-label={t.popupClose}
            className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-ink-400 ring-1 ring-[#f3c4dd] transition hover:bg-white hover:text-[#a3155f]"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative px-6 pb-7 pt-9 text-center sm:px-10">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-192.png" alt="VaraaAi" width={72} height={72} className="mx-auto h-[72px] w-[72px] rounded-[1.4rem] shadow-[0_14px_30px_-12px_rgba(163,21,95,0.6)]" />
            <p className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.3em] text-[#a3155f]">
              <Sparkles className="h-3.5 w-3.5" />
              {t.popupEyebrow}
            </p>
            <h2 className="mt-2 font-serif text-3xl leading-tight text-[#4a1236] sm:text-4xl">{t.popupTitle}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink-600 sm:text-base">{t.popupSub}</p>

            <div className="mt-6 text-left">
              {/* Try first, email later; an expired sign-in link goes straight to the form. */}
              {!expired && initialMode === "signup" && (
                <>
                  <LiteTryNow locale={locale} t={t} />
                  <LiteOr label={t.tryOr} />
                </>
              )}
              <LiteSignupForm locale={locale} t={t} expired={expired} initialMode={initialMode} compact />
            </div>

            <ul className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1.5">
              {t.popupTrust.map((p) => (
                <li key={p} className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <Check className="h-3.5 w-3.5" />
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[11px] leading-relaxed text-ink-400">{t.popupPrivacy}</p>
            <button type="button" onClick={close} className="mt-3 text-xs font-semibold text-ink-400 underline-offset-2 hover:text-[#a3155f] hover:underline">
              {t.popupClose}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
