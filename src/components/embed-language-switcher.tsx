"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  vi: "Tiếng Việt",
  en: "English",
  fi: "Suomi",
  pl: "Polski",
  de: "Deutsch",
  km: "ខ្មែរ",
  th: "ไทย",
};

/** Lets a customer switch language mid-booking on the embed flow — the
 * embed pages take their locale from `?locale=`, not the URL path, so this
 * just rewrites that one query param and keeps everything else (chain,
 * extra, etc.) intact. */
export function EmbedLanguageSwitcher({ locale }: { locale: string }) {
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
