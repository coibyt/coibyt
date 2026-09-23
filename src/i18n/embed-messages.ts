import { routing } from "./routing";
import { isValidLocale } from "./is-valid-locale";

/**
 * The /embed routes sit outside the [locale] segment (so they can skip the
 * site's navbar/footer entirely for iframe embedding), which means they miss
 * next-intl's middleware-driven locale detection. Callers pass the locale
 * explicitly instead (via a `?locale=` query param), read here.
 */
export async function loadEmbedLocale(requested: string | undefined) {
  const locale = isValidLocale(requested) ? requested : routing.defaultLocale;
  const messages = (await import(`../../messages/${locale}.json`)).default;
  return { locale, messages };
}
