import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: [
    "vi", "en", "fi", "pl", "de", "km", "th",
    // Added for the platform's expansion beyond Vietnam/Finland — "Moldova"
    // in the request is covered by "ro" (Romanian), Moldova's own official
    // language; there's no separate standard code for "Moldovan".
    "sv", "fr", "ko", "ja", "zh", "lv", "et", "be", "bg", "cs", "hu", "ro", "ru", "sk", "uk",
    // Requested by country, mapped to each country's own language — several
    // requested countries share a language already in this list (Belgium:
    // fr/nl/de, Austria/Switzerland: de, Ireland/Singapore/South
    // Africa/Nigeria: en, Luxembourg: fr/de, Singapore also: zh, Saudi
    // Arabia/UAE/Egypt: ar, Mexico/Argentina/Chile/Colombia: es), so only
    // the genuinely new ones get their own file.
    "no", "da", "nl", "it", "es", "he", "hi", "id", "ms", "fil", "ar", "tr", "pt",
  ],
  defaultLocale: "vi",
  localePrefix: "as-needed", // vi (default) has no prefix, every other locale is /en/, /fi/, etc.
});
