"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { isValidLocale } from "@/i18n/is-valid-locale";

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
  no: "Norwegian",
  da: "Danish",
  nl: "Dutch",
  it: "Italian",
  es: "Spanish",
  he: "Hebrew",
  hi: "Hindi",
  id: "Indonesian",
  ms: "Malay",
  fil: "Filipino",
  ar: "Arabic",
  tr: "Turkish",
  pt: "Portuguese",
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onChange(next: string) {
    if (isValidLocale(next)) router.replace(pathname, { locale: next });
  }

  // Phones show the short code (VI ▾) so the header never overflows; the
  // transparent select on top still opens the native picker.
  return (
    <span className="relative inline-flex items-center">
      <span aria-hidden className="btn-ghost pointer-events-none !gap-1 !px-2 text-xs font-bold uppercase sm:hidden">
        {locale}
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor"><path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4Z" /></svg>
      </span>
      <select
        value={locale}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Switch language"
        className="btn-ghost absolute inset-0 h-full w-full cursor-pointer bg-transparent !px-2 text-xs font-bold uppercase opacity-0 sm:static sm:h-auto sm:w-auto sm:opacity-100"
      >
        {routing.locales.map((l) => (
          <option key={l} value={l}>
            {LOCALE_LABELS[l] ?? l.toUpperCase()}
          </option>
        ))}
      </select>
    </span>
  );
}
