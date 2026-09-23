import { routing } from "./routing";

type AppLocale = (typeof routing.locales)[number];

/** next-intl v3 doesn't export a `hasLocale` guard (that's a v4 API), so we
 * roll our own tiny type-safe check against the configured locale list. */
export function isValidLocale(value: string | undefined): value is AppLocale {
  return !!value && (routing.locales as readonly string[]).includes(value);
}
