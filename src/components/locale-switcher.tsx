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
};

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onChange(next: string) {
    if (isValidLocale(next)) router.replace(pathname, { locale: next });
  }

  return (
    <select
      value={locale}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Switch language"
      className="btn-ghost cursor-pointer !px-2 bg-transparent text-xs font-bold uppercase"
    >
      {routing.locales.map((l) => (
        <option key={l} value={l}>
          {LOCALE_LABELS[l] ?? l.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
