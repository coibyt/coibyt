import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { isValidLocale } from "./is-valid-locale";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = isValidLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
