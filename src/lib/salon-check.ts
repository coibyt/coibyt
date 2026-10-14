/**
 * Rule-based "how does my salon look online" checker — no paid APIs, no
 * scraping for private/metric data. Everything here is either (a) reading
 * the HTML of a website the business owner themselves typed in, or (b)
 * checking whether a URL responds at all. Nothing here reads Instagram/
 * Facebook engagement numbers or Google ratings, since that would mean
 * scraping those platforms (against their terms of service) or paying for
 * Google Places API access — see the write-up this was built from.
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
