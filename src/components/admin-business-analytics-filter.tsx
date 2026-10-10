"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";

const PRESETS = ["day", "week", "month"] as const;
type Preset = (typeof PRESETS)[number];

const LABELS: Record<string, { day: string; week: string; month: string; custom: string; from: string; to: string; apply: string }> = {
  vi: { day: "Hôm nay", week: "Tuần này", month: "Tháng này", custom: "Tùy chọn", from: "Từ ngày", to: "Đến ngày", apply: "Áp dụng" },
  en: { day: "Today", week: "This week", month: "This month", custom: "Custom", from: "From", to: "To", apply: "Apply" },
};

export function AdminBusinessAnalyticsFilter({
  locale,
  preset,
  from,
  to,
  minDate,
  maxDate,
}: {
  locale: string;
  preset: Preset | "custom";
  from: string;
  to: string;
  minDate: string;
  maxDate: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = LABELS[locale] ?? LABELS.en;
  const [customFrom, setCustomFrom] = useState(from);
  const [customTo, setCustomTo] = useState(to);

  function go(params: Record<string, string>) {
    const next = new URLSearchParams(searchParams.toString());
    Object.entries(params).forEach(([k, v]) => next.set(k, v));
    router.push(`${pathname}?${next.toString()}`);
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PRESETS.map((p) => (
        <button
          key={p}
          onClick={() => go({ preset: p })}
          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
            preset === p ? "bg-primary-500 text-white" : "bg-mist-100 text-ink-700 hover:bg-mist-200"
          }`}
        >
          {t[p]}
        </button>
      ))}
      <div
        className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs ${
          preset === "custom" ? "bg-primary-50" : ""
        }`}
      >
        <span className="text-ink-400">{t.custom}:</span>
        <input
          type="date"
          className="rounded-lg border border-ink-100 px-1.5 py-1 text-xs"
          value={customFrom}
          min={minDate}
          max={maxDate}
          onChange={(e) => setCustomFrom(e.target.value)}
        />
        <span className="text-ink-400">–</span>
        <input
          type="date"
          className="rounded-lg border border-ink-100 px-1.5 py-1 text-xs"
          value={customTo}
          min={minDate}
          max={maxDate}
          onChange={(e) => setCustomTo(e.target.value)}
        />
        <button
          onClick={() => go({ preset: "custom", from: customFrom, to: customTo })}
          disabled={!customFrom || !customTo}
          className="rounded-full bg-ink-900 px-2.5 py-1 text-xs font-medium text-white disabled:opacity-40"
        >
          {t.apply}
        </button>
      </div>
    </div>
  );
}
