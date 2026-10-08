import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "vi", "en", "fi", "pl", "de", "km", "th",
    // Added for the platform's expansion beyond Vietnam/Finland — "Moldova"
    // in the request is covered by "ro" (Romanian), Moldova's own official
    // language; there's no separate standard code for "Moldovan".
    "sv", "fr", "ko", "ja", "zh", "lv", "et", "be", "bg", "cs", "hu", "ro", "ru", "sk", "uk",
  ],
  defaultLocale: "vi",
  localePrefix: "as-needed", // vi (default) has no prefix, every other locale is /en/, /fi/, etc.
});
