import type { Metadata } from "next";

export const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

/** The languages with real, maintained copy — every other locale still
 * works, but these are the ones worth pointing search engines at. */
export const SEO_LOCALES = ["vi", "en", "fi"] as const;
const DEFAULT_LOCALE = "vi";

/** Absolute address of a page in one language (Vietnamese has no prefix). */
export function localizedUrl(locale: string, path: string) {
  return `${SITE}${locale === DEFAULT_LOCALE ? "" : `/${locale}`}${path}`;
}

/** Canonical link plus hreflang alternates for a page that exists in every
 * language. */
export function alternatesFor(path: string, locale: string): Metadata["alternates"] {
  return {
    canonical: localizedUrl(locale, path),
    languages: {
      ...Object.fromEntries(SEO_LOCALES.map((l) => [l, localizedUrl(l, path)])),
      "x-default": localizedUrl(DEFAULT_LOCALE, path),
    },
  };
}

/** Makes a site-relative URL (/api/product-image/…) absolute; leaves full
 * URLs alone. */
export function absoluteUrl(url: string | null | undefined) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE}${url.startsWith("/") ? "" : "/"}${url}`;
}

/** Plain text trimmed to what search results show (~160 characters). */
export function metaDescription(text: string | null | undefined, max = 160) {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

/** A JSON-LD <script> payload — `<` is escaped so text from the database
 * can never close the script tag. */
export function jsonLd(data: unknown) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}
