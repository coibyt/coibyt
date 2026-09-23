import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["vi", "en", "fi", "pl", "de", "km", "th"],
  defaultLocale: "vi",
  localePrefix: "as-needed", // vi (default) has no prefix, every other locale is /en/, /fi/, etc.
});
