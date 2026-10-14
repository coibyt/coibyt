/**
 * "How does my salon look online" checker.
 *
 * - Website: a real HTTP fetch + HTML analysis of a URL the visitor typed
 *   in themselves — always available, no key needed.
 * - Google Business Profile: real data via the Google Places API when
 *   GOOGLE_PLACES_API_KEY is configured (rating/review/photo counts);
 *   falls back to the visitor's own self-reported yes/no/unsure otherwise.
 * - Facebook/Instagram: only ever a reachability check (never engagement
 *   metrics) plus whatever follower count the visitor chooses to type in
 *   themselves — Meta's official APIs can't return data for an arbitrary
 *   public page without that page's own owner authorizing your app, and
 *   scraping for it would violate Meta's terms of service.
 * - The natural-language summary sentence is AI-generated via the
 *   Anthropic API when ANTHROPIC_API_KEY is configured; otherwise it falls
 *   back to a template built from the computed scores.
 * - SEO is suggested keywords only (category + city combinations) — there
 *   is no free, legitimate way to know a third-party site's real Google
 *   ranking (Search Console only shows that to the verified site owner).
 */

const FETCH_TIMEOUT_MS = 8000;
const BROWSER_USER_AGENT =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

export interface WebsiteCheckResult {
  provided: boolean;
  reachable: boolean;
  https: boolean;
  mobileFriendly: boolean;
  hasOpenGraph: boolean;
  hasBookingLink: boolean;
  hasPricing: boolean;
  hasHours: boolean;
  hasContact: boolean;
  extractedFacebookUrl: string | null;
  extractedInstagramUrl: string | null;
}

const BOOKING_RE =
  /đặt lịch|đặt hẹn|đặt chỗ|book now|book an appointment|book online|schedule an appointment|varaa aika|buchen sie|zarezerwuj|termin buchen/i;
const HOURS_RE =
  /giờ mở cửa|mở cửa\s*[:\-]|opening hours|business hours|öffnungszeiten|aukioloajat|godziny otwarcia|monday|tuesday|wednesday|thursday|friday|saturday|sunday|thứ hai|thứ ba|thứ tư|thứ năm|thứ sáu|thứ bảy|chủ nhật/i;
const PRICE_RE = /[€$]\s?\d|\d\s?[€$]|\d[.,]?\d*\s?(₫|vnd|đ\b)|giá\s|bảng giá|price list|pricing/i;
const PHONE_RE = /(\+?\d[\d\s().-]{6,}\d)/;

function withTimeout(ms: number) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), ms);
  return { signal: controller.signal, clear: () => clearTimeout(timer) };
}

export async function checkWebsite(rawUrl: string): Promise<WebsiteCheckResult> {
  const url = /^https?:\/\//i.test(rawUrl) ? rawUrl : `https://${rawUrl}`;
  const result: WebsiteCheckResult = {
    provided: true,
    reachable: false,
    https: false,
    mobileFriendly: false,
    hasOpenGraph: false,
    hasBookingLink: false,
    hasPricing: false,
    hasHours: false,
    hasContact: false,
    extractedFacebookUrl: null,
    extractedInstagramUrl: null,
  };

  const { signal, clear } = withTimeout(FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, {
      signal,
      redirect: "follow",
      headers: { "User-Agent": `Mozilla/5.0 (compatible; VaraaAiSalonCheck/1.0; +https://varaaai.com)` },
    });
    if (!res.ok) return result;
    result.reachable = true;
    result.https = res.url.startsWith("https://");

    const html = await res.text();
    result.mobileFriendly = /<meta[^>]+name=["']viewport["']/i.test(html);
    result.hasOpenGraph =
      /<meta[^>]+property=["']og:title["']/i.test(html) && /<meta[^>]+property=["']og:image["']/i.test(html);
    result.hasBookingLink = BOOKING_RE.test(html);
    result.hasPricing = PRICE_RE.test(html);
    result.hasHours = HOURS_RE.test(html);
    result.hasContact = PHONE_RE.test(html) || /mailto:/i.test(html);

    const fbMatch = html.match(/https?:\/\/(www\.)?facebook\.com\/[^"'\s<>)]+/i);
    const igMatch = html.match(/https?:\/\/(www\.)?instagram\.com\/[^"'\s<>)]+/i);
    result.extractedFacebookUrl = fbMatch ? fbMatch[0] : null;
    result.extractedInstagramUrl = igMatch ? igMatch[0] : null;
  } catch {
    // Unreachable or timed out — reachable stays false.
  } finally {
    clear();
  }
  return result;
}

const NOT_FOUND_PHRASES = [
  "sorry, this page isn't available",
  "the link you followed may be broken",
  "page not found",
  "content isn't available right now",
];

export type SocialLinkStatus = "ok" | "unreachable" | "unverified";

/** Only checks whether the URL responds like a real page — never reads
 * follower counts, post content, or engagement, which would require
 * scraping Meta's platforms against their terms of service. A platform
 * blocking our server (403/429/999, or a network error) is reported as
 * "unverified", not "unreachable" — we genuinely don't know either way. */
export async function checkSocialLink(url: string): Promise<SocialLinkStatus> {
  const { signal, clear } = withTimeout(6000);
  try {
    const res = await fetch(url, {
      method: "GET",
      redirect: "follow",
      signal,
      headers: { "User-Agent": BROWSER_USER_AGENT },
    });
    if (res.status === 404 || res.status === 410) return "unreachable";
    if (!res.ok) return "unverified";
    const body = (await res.text()).toLowerCase();
    if (NOT_FOUND_PHRASES.some((p) => body.includes(p))) return "unreachable";
    return "ok";
  } catch {
    return "unverified";
  } finally {
    clear();
  }
}

export function googleMapsSearchUrl(name: string, address: string) {
  const query = encodeURIComponent(`${name} ${address}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export interface GooglePlaceResult {
  found: boolean;
  rating: number | null;
  reviewCount: number | null;
  photoCount: number | null;
}

/** Real Google Business Profile data via the Places API — returns null
 * (not a "not found" result) when no API key is configured or the call
 * fails, so the caller can fall back to the visitor's self-reported
 * status instead of showing a false negative. */
export async function checkGooglePlace(name: string, address: string): Promise<GooglePlaceResult | null> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) return null;

  const { signal, clear } = withTimeout(8000);
  try {
    const findUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(
      `${name} ${address}`
    )}&inputtype=textquery&fields=place_id&key=${apiKey}`;
    const findRes = await fetch(findUrl, { signal });
    if (!findRes.ok) return null;
    const findData = await findRes.json();
    const placeId = findData?.candidates?.[0]?.place_id;
    if (!placeId) return { found: false, rating: null, reviewCount: null, photoCount: null };

    const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=rating,user_ratings_total,photos&key=${apiKey}`;
    const detailsRes = await fetch(detailsUrl, { signal });
    if (!detailsRes.ok) return { found: true, rating: null, reviewCount: null, photoCount: null };
    const details = await detailsRes.json();
    const result = details?.result ?? {};
    return {
      found: true,
      rating: typeof result.rating === "number" ? result.rating : null,
      reviewCount: typeof result.user_ratings_total === "number" ? result.user_ratings_total : null,
      photoCount: Array.isArray(result.photos) ? result.photos.length : null,
    };
  } catch {
    return null;
  } finally {
    clear();
  }
}

export interface AiSummaryInput {
  name: string;
  locale: string;
  overallScore: number;
  channelScores: { website: number; google: number; facebook: number; instagram: number };
  goodPoints: string[];
  badPoints: string[];
}

/** A short natural-language summary paragraph via Claude — returns null
 * (not a fallback string) when no API key is configured or the call
 * fails/times out, so the caller falls back to its own template instead
 * of silently showing a broken or empty summary. */
export async function generateAiSummary(input: AiSummaryInput): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  const languageName = input.locale === "vi" ? "Vietnamese" : "English";
  const prompt = `You are writing a short, friendly marketing assessment for a salon owner, based ONLY on the facts below — never invent numbers or claims not listed here. Write 2-3 sentences in ${languageName}, addressed to the owner, summarizing their online presence: what's strong, what's holding them back, in an encouraging but honest tone. Do not use markdown.

Salon: ${input.name}
Overall score: ${input.overallScore}/100
Channel scores — Website: ${input.channelScores.website}, Google: ${input.channelScores.google}, Facebook: ${input.channelScores.facebook}, Instagram: ${input.channelScores.instagram}
What's working: ${input.goodPoints.join("; ") || "(nothing notable)"}
What's holding them back: ${input.badPoints.join("; ") || "(nothing notable)"}`;

  const { signal, clear } = withTimeout(12000);
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      signal,
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5",
        max_tokens: 300,
        messages: [{ role: "user", content: prompt }],
      }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const text = data?.content?.[0]?.text;
    return typeof text === "string" && text.trim() ? text.trim() : null;
  } catch {
    return null;
  } finally {
    clear();
  }
}

/** Keyword ideas generated purely from the salon's own category + city —
 * not real ranking data, since there's no legitimate way to look up a
 * third-party site's actual Google ranking (only Search Console can show
 * that, and only to the verified site owner).
 *
 * Language picked by the salon's actual location when known (from the
 * address-autocomplete selection), not the visitor's UI language — a
 * Finnish salon's real customers search in Finnish even if its owner is
 * browsing this tool in English. Falls back to the UI locale only when we
 * don't have a resolved country (e.g. the visitor typed an address
 * without picking a suggestion). */
export function suggestSeoKeywords(
  category: string,
  address: string,
  locale: string,
  city?: string | null,
  countryCode?: string | null
): string[] {
  // Free-text addresses vary a lot ("Street, City, Country" vs. "Street,
  // District, City"), so this is a best-effort guess, not a real parse:
  // with 3+ parts, assume the common international "...City, Country"
  // shape and prefer the second-to-last part over the last (which is more
  // often the country — not useful as a local SEO keyword). Only used when
  // there's no resolved `city` from an address-autocomplete selection.
  const parts = address.split(",").map((p) => p.trim()).filter(Boolean);
  const resolvedCity = city || (parts.length >= 2 ? parts[parts.length - 2] : parts[0]) || address.trim();
  const cat = category.trim();
  if (!cat) return [];

  const cc = countryCode?.toUpperCase();
  const keywordLocale = cc === "FI" ? "fi" : cc === "VN" ? "vi" : locale === "vi" ? "vi" : locale === "fi" || locale === "en" ? "fi" : "en";

  if (keywordLocale === "vi") {
    return [
      `${cat} ${resolvedCity}`,
      `${cat} gần đây`,
      `${cat} uy tín ${resolvedCity}`,
      `${cat} giá rẻ ${resolvedCity}`,
      `đặt lịch ${cat} ${resolvedCity}`,
      `${cat} đánh giá tốt ${resolvedCity}`,
    ];
  }
  if (keywordLocale === "fi") {
    return [
      `${cat} ${resolvedCity}`,
      `${cat} lähellä`,
      `luotettava ${cat} ${resolvedCity}`,
      `edullinen ${cat} ${resolvedCity}`,
      `varaa aika ${cat} ${resolvedCity}`,
      `${cat} arvostelut ${resolvedCity}`,
    ];
  }
  return [
    `${cat} in ${resolvedCity}`,
    `${cat} near me`,
    `best ${cat} ${resolvedCity}`,
    `affordable ${cat} ${resolvedCity}`,
    `book ${cat} ${resolvedCity}`,
    `top rated ${cat} ${resolvedCity}`,
  ];
}
