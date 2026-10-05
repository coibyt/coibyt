"use client";

import { useEffect, useState } from "react";

const CYCLE_MS = 72 * 60 * 60 * 1000;
// A fixed anchor, not "page load", so every visitor sees the same countdown and
// the 72-hour window restarts on its own when it reaches zero.
const CYCLE_ANCHOR_MS = Date.UTC(2026, 9, 6, 0, 0, 0);

const LABELS: Record<string, { title: string; days: string; hours: string; minutes: string; seconds: string }> = {
  vi: { title: "Ưu đãi kết thúc sau", days: "Ngày", hours: "Giờ", minutes: "Phút", seconds: "Giây" },
  en: { title: "Offer ends in", days: "Days", hours: "Hours", minutes: "Minutes", seconds: "Seconds" },
  fi: { title: "Tarjous päättyy", days: "Päivä", hours: "Tuntia", minutes: "Minuutit", seconds: "Sekuntia" },
  pl: { title: "Oferta kończy się za", days: "Dni", hours: "Godziny", minutes: "Minuty", seconds: "Sekundy" },
  de: { title: "Angebot endet in", days: "Tage", hours: "Stunden", minutes: "Minuten", seconds: "Sekunden" },
  km: { title: "ការផ្តល់ជូនបញ្ចប់ក្នុង", days: "ថ្ងៃ", hours: "ម៉ោង", minutes: "នាទី", seconds: "វិនាទី" },
  th: { title: "ข้อเสนอสิ้นสุดใน", days: "วัน", hours: "ชั่วโมง", minutes: "นาที", seconds: "วินาที" },
};

function remainingMs(now: number) {
  return CYCLE_MS - ((now - CYCLE_ANCHOR_MS) % CYCLE_MS);
}

export function OfferCountdown({ locale, compact = false }: { locale: string; compact?: boolean }) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const labels = LABELS[locale] ?? LABELS.en;
  if (now === null) return <div className={compact ? "h-6" : "h-32"} aria-hidden />;

  const left = remainingMs(now);
  const totalSec = Math.floor(left / 1000);
  const parts = [
    { value: Math.floor(totalSec / 86400), label: labels.days },
    { value: Math.floor((totalSec % 86400) / 3600), label: labels.hours },
    { value: Math.floor((totalSec % 3600) / 60), label: labels.minutes },
    { value: totalSec % 60, label: labels.seconds },
  ];
  const fractions = [
    left / CYCLE_MS,
    (left % 86_400_000) / 86_400_000,
    (left % 3_600_000) / 3_600_000,
    (left % 60_000) / 60_000,
  ];
  const r = 34;
  const circumference = 2 * Math.PI * r;

  if (compact) {
    return (
      <div className="flex items-center justify-center gap-1.5 whitespace-nowrap text-xs text-ink-100 sm:gap-2 sm:text-sm">
        <span className="font-semibold">{labels.title}</span>
        {parts.map((p) => (
          <span
            key={p.label}
            className="inline-flex items-baseline gap-0.5 rounded-md bg-white/10 px-1.5 py-0.5 tabular-nums sm:gap-1 sm:px-2"
          >
            <span className="font-bold text-white">{String(p.value).padStart(2, "0")}</span>
            <span className="text-[9px] uppercase tracking-wide text-ink-200 sm:text-[10px]">{p.label}</span>
          </span>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-sm font-semibold text-ink-700">{labels.title}</p>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {parts.map((p, i) => (
          <div key={p.label} className="relative flex h-24 w-24 flex-col items-center justify-center">
            <svg className="absolute inset-0 -rotate-90" viewBox="0 0 80 80" aria-hidden>
              <circle cx="40" cy="40" r={r} fill="none" stroke="#fde68a" strokeWidth="4" />
              <circle
                cx="40"
                cy="40"
                r={r}
                fill="none"
                stroke="#dc2626"
                strokeWidth="4"
                strokeDasharray={circumference}
                strokeDashoffset={circumference * (1 - fractions[i])}
              />
            </svg>
            <span className="text-2xl font-extrabold tabular-nums text-ink-900">
              {String(p.value).padStart(2, "0")}
            </span>
            <span className="text-[10px] font-medium uppercase tracking-wide text-ink-400">{p.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
