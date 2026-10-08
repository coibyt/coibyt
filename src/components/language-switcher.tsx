"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  vi: "Vietnamese",
  en: "English",
  fi: "Finnish",
  pl: "Polish",
  de: "German",
  km: "Khmer",
  th: "Thai",
  sv: "Swedish",
  fr: "French",
  ko: "Korean",
  ja: "Japanese",
  zh: "Chinese",
  lv: "Latvian",
  et: "Estonian",
  be: "Belarusian",
  bg: "Bulgarian",
  cs: "Czech",
  hu: "Hungarian",
  ro: "Romanian",
  ru: "Russian",
  sk: "Slovak",
  uk: "Ukrainian",
};

/** Lets a customer switch language on any chrome-free page that takes its
 * locale from `?locale=` rather than the URL path (the /embed booking flow
 * and the /site public website) — rewrites just that one query param and
 * keeps everything else (chain, extra, etc.) intact. */
export function LanguageSwitcher({ locale }: { locale: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function onChange(next: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("locale", next);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <select
      value={locale}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Language"
      className="rounded-lg border border-ink-100 bg-white px-2 py-1.5 text-xs text-ink-700"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {LOCALE_LABELS[l] ?? l}
        </option>
      ))}
    </select>
  );
}
