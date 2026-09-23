"use client";

import { useEffect } from "react";
import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { isValidLocale } from "@/i18n/is-valid-locale";

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

const STORAGE_KEY = "varaaai-locale-detected";

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
    if (typeof window === "undefined" || !navigator.geolocation) return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        localStorage.setItem(STORAGE_KEY, "1");
        try {
          const res = await fetch(
            `/api/geolocate?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
          );
          const { countryCode } = await res.json();
          if (!countryCode) return;
          const detected = COUNTRY_LOCALE[countryCode] ?? (countryCode !== "vn" ? "en" : "vi");
          if (isValidLocale(detected) && detected !== currentLocale) {
            router.replace(pathname, { locale: detected });
          }
        } catch {
          // Staying on the default locale is a fine fallback.
        }
      },
      () => {
        localStorage.setItem(STORAGE_KEY, "1");
      },
      { timeout: 8000 }
    );
    // Only ever run this once, on first mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
