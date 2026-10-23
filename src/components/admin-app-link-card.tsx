"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { Check, Copy, Download, ExternalLink, Share2, Smartphone } from "lucide-react";
import { appPageStrings, appPageUrl } from "@/lib/app-page-strings";
import { fill } from "@/lib/shop-strings";

/** The admin dashboard's "app download link" card: the /app install page's
 * address in any language, with copy / share / open, a printable QR code and
 * a ready-made message to send to customers and salon owners. */
export function AdminAppLinkCard({
  locale,
  defaultLocale,
  languages,
  installsTotal,
  installs7d,
}: {
  locale: string;
  defaultLocale: string;
  /** [code, name] for every language the site speaks. */
  languages: [string, string][];
  installsTotal: number;
  installs7d: number;
}) {
  const S = appPageStrings(locale);
  const [lang, setLang] = useState(locale);
  const [qr, setQr] = useState<string | null>(null);
  const [copied, setCopied] = useState<"link" | "message" | null>(null);
  const url = appPageUrl(lang, defaultLocale);
  const message = fill(appPageStrings(lang).message, { url });

  useEffect(() => {
    QRCode.toDataURL(url, { width: 1024, margin: 2, errorCorrectionLevel: "M", color: { dark: "#1f182d", light: "#ffffff" } })
      .then(setQr)
      .catch(() => setQr(null));
  }, [url]);

  function copy(text: string, what: "link" | "message") {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(what);
    setTimeout(() => setCopied(null), 2000);
  }

  async function share() {
    if (navigator.share) {
      await navigator.share({ title: appPageStrings(lang).title, text: message, url }).catch(() => {});
    } else {
      copy(message, "message");
    }
  }

  const button = "inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition";

  return (
    <div className="mb-6 overflow-hidden rounded-3xl bg-[#1a1326] text-white">
      <div className="relative grid gap-6 p-6 sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 rounded-full bg-coral-500/25 blur-3xl" />

        <div className="relative min-w-0">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icons/icon-192.png" alt="" className="h-9 w-9 rounded-xl" />
            </span>
            <div>
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Smartphone className="h-4 w-4 text-amber-200" />
                {S.cardTitle}
              </h2>
              <p className="text-sm text-white/65">{S.cardText}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-2 sm:flex-row">
            <div className="flex min-w-0 flex-1 items-center rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/15">
              <span className="truncate font-mono text-sm sm:text-base">{url}</span>
            </div>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              aria-label={S.language}
              title={S.language}
              className="rounded-2xl border-0 bg-white/10 px-3 py-3 text-sm text-white ring-1 ring-white/15 focus:outline-none focus:ring-2 focus:ring-white/40 [&>option]:text-ink-900"
            >
              {languages.map(([code, name]) => (
                <option key={code} value={code}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" onClick={() => copy(url, "link")} className={`${button} bg-white text-[#1a1326] hover:-translate-y-0.5`}>
              {copied === "link" ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
              {copied === "link" ? S.copied : S.copy}
            </button>
            <button type="button" onClick={share} className={`${button} bg-white/10 ring-1 ring-white/15 hover:bg-white/15`}>
              <Share2 className="h-4 w-4" />
              {S.share}
            </button>
            <a href={url} target="_blank" rel="noopener noreferrer" className={`${button} bg-white/10 ring-1 ring-white/15 hover:bg-white/15`}>
              <ExternalLink className="h-4 w-4" />
              {S.open}
            </a>
            {qr && (
              <a href={qr} download={`varaaai-app-qr-${lang}.png`} className={`${button} bg-white/10 ring-1 ring-white/15 hover:bg-white/15`}>
                <Download className="h-4 w-4" />
                {S.downloadQr}
              </a>
            )}
          </div>

          <div className="mt-5 rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{S.messageLabel}</p>
              <button type="button" onClick={() => copy(message, "message")} className="flex items-center gap-1.5 text-xs font-semibold text-amber-200 hover:text-white">
                {copied === "message" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied === "message" ? S.copied : S.copyMessage}
              </button>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-white/85">{message}</p>
          </div>
        </div>

        <div className="relative flex items-center gap-4 lg:flex-col">
          <div className="rounded-2xl bg-white p-3">
            {qr ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={qr} alt="QR" className="h-36 w-36" />
            ) : (
              <div className="h-36 w-36" />
            )}
          </div>
          <div className="grid grid-cols-2 gap-2 text-center lg:w-full">
            <div className="rounded-2xl bg-white/[0.06] px-3 py-2 ring-1 ring-white/10">
              <p className="text-xl font-bold">{installsTotal.toLocaleString(locale)}</p>
              <p className="text-[11px] text-white/55">{S.installsTotal}</p>
            </div>
            <div className="rounded-2xl bg-white/[0.06] px-3 py-2 ring-1 ring-white/10">
              <p className="text-xl font-bold">{installs7d.toLocaleString(locale)}</p>
              <p className="text-[11px] text-white/55">{S.installs7d}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
