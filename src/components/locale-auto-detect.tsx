"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { detectCountry } from "@/lib/detect-country-client";

const COUNTRY_LOCALE: Record<string, string> = {
  vn: "vi",
  fi: "fi",
  pl: "pl",
  de: "de",
  at: "de",
  ch: "de",
  kh: "km",
  th: "th",
};

const FLAG_KEY = "varaaai-locale-detected";

/**
 * Runs once per visitor: asks for their location (the same permission
 * prompt /search already uses for "find salons near me") and switches the
 * site to the language for their country. A localStorage flag makes sure we
 * only ever ask once — that also means a manual pick via LocaleSwitcher
 * sticks, since we never re-detect after the first attempt either way.
 */
export function LocaleAutoDetect() {
  const currentLocale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(FLAG_KEY)) return;
    localStorage.setItem(FLAG_KEY, "1");

    detectCountry().then((countryCode) => {
      if (!countryCode) return;
      const detected = COUNTRY_LOCALE[countryCode] ?? (countryCode !== "vn" ? "en" : "vi");
      if (isValidLocale(detected) && detected !== currentLocale) {
        router.replace(pathname, { locale: detected });
      }
    });
    // Only ever run this once, on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
