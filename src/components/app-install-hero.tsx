"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Download, Loader2, Share, SquarePlus, X } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { isIos, useInstallPrompt } from "@/hooks/use-install-prompt";
import { appPageStrings } from "@/lib/app-page-strings";

/** The /app page's big "Install the app" button: the browser's own install
 * dialog where there is one, the Add-to-Home-Screen steps on iPhone (and in
 * browsers without one), and an "installed" card once it's on the device. */
export function AppInstallHero({ locale }: { locale: string }) {
  const S = appPageStrings(locale);
  const { installed, promptInstall } = useInstallPrompt();
  const [mounted, setMounted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [hint, setHint] = useState<"ios" | "other" | null>(null);
  useEffect(() => setMounted(true), []);

  async function install() {
    if (isIos()) {
      setHint("ios");
      return;
    }
    setBusy(true);
    const outcome = await promptInstall();
    setBusy(false);
    if (outcome === "unsupported") setHint("other");
  }

  if (mounted && installed) {
    return (
      <div className="mx-auto max-w-md rounded-3xl bg-white/90 p-6 text-center shadow-[0_24px_60px_-28px_rgba(64,50,92,0.45)] ring-1 ring-emerald-200 backdrop-blur">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-7 w-7 text-emerald-600" />
        </span>
        <p className="mt-4 text-lg font-bold text-ink-900">{S.installedTitle}</p>
        <p className="mt-1 text-sm text-ink-700">{S.installedText}</p>
        <Link href="/" className="btn-primary mt-5 !px-6">
          {S.openHome}
        </Link>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={install}
        disabled={busy}
        className="group relative inline-flex w-full max-w-sm items-center justify-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-coral-500 px-8 py-5 text-lg font-extrabold text-white shadow-[0_22px_44px_-16px_rgba(98,79,137,0.85)] transition-all hover:-translate-y-0.5 hover:shadow-[0_26px_50px_-14px_rgba(98,79,137,0.9)] disabled:opacity-80 sm:w-auto"
      >
        <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        {busy ? <Loader2 className="h-6 w-6 animate-spin" /> : <Download className="h-6 w-6" />}
        {busy ? S.installing : S.install}
      </button>
      <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-700">{S.afterTap}</p>

      {hint && (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-ink-900/50 backdrop-blur-[2px] sm:items-center sm:p-4" onClick={() => setHint(null)}>
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md animate-slide-up rounded-t-3xl bg-white p-6 text-left shadow-2xl sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4">
              <p className="text-lg font-bold text-ink-900">{hint === "ios" ? S.iosTitle : S.otherTitle}</p>
              <button type="button" onClick={() => setHint(null)} className="text-ink-400 hover:text-ink-900" aria-label={S.gotIt}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {hint === "ios" ? (
              <ol className="mt-4 space-y-3">
                {S.iphoneSteps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary-500 text-xs font-bold text-white">{i + 1}</span>
                    <span className="pt-0.5 text-sm leading-relaxed text-ink-900">
                      {step}
                      {i === 1 && <Share className="ml-1.5 inline h-4 w-4 text-sky-600" />}
                      {i === 2 && <SquarePlus className="ml-1.5 inline h-4 w-4 text-ink-700" />}
                    </span>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-3 text-sm leading-relaxed text-ink-700">{S.otherHint}</p>
            )}
            <button type="button" onClick={() => setHint(null)} className="btn-primary mt-6 w-full">
              {S.gotIt}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
