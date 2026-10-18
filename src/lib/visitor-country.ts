import { cookies, headers } from "next/headers";

/** Set by the browser once it knows the visitor's country more precisely
 * (GPS via detectCountry()), and preferred over the IP guess below. */
export const COUNTRY_COOKIE = "varaaai-country";

// Country headers some CDNs/proxies add — free and instant when present.
const COUNTRY_HEADERS = ["cf-ipcountry", "x-vercel-ip-country", "x-country-code", "x-geo-country", "cloudfront-viewer-country"];

const CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const CACHE_MAX = 5000;
const ipCache = new Map<string, { country: string | null; at: number }>();

function validCode(v: string | null | undefined): string | null {
  const c = v?.trim().toUpperCase();
  // "XX"/"T1" are Cloudflare's "unknown"/"Tor" markers.
  return c && /^[A-Z]{2}$/.test(c) && c !== "XX" ? c : null;
}

function isPrivateIp(ip: string) {
  return (
    ip === "::1" ||
    ip.startsWith("127.") ||
    ip.startsWith("10.") ||
    ip.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip) ||
    /^f[cd]/i.test(ip) ||
    /^fe80/i.test(ip)
  );
}

async function countryForIp(ip: string): Promise<string | null> {
  const hit = ipCache.get(ip);
  if (hit && Date.now() - hit.at < CACHE_TTL_MS) return hit.country;
  let country: string | null = null;
  try {
    // country.is — free, keyless IP → country lookup.
    const res = await fetch(`https://api.country.is/${encodeURIComponent(ip)}`, {
      signal: AbortSignal.timeout(1500),
      cache: "no-store",
    });
    if (res.ok) country = validCode(((await res.json()) as { country?: string }).country);
  } catch {
    // Slow or down — just don't filter this time.
  }
  if (ipCache.size >= CACHE_MAX) ipCache.delete(ipCache.keys().next().value!);
  ipCache.set(ip, { country, at: Date.now() });
  return country;
}

/** The visitor's ISO 3166-1 alpha-2 country, best effort: the browser's own
 * GPS-based answer if it has one, then a CDN header, then an IP lookup.
 * Null when unknown (local dev, lookup failure) — callers then show
 * everything rather than nothing. */
export async function visitorCountry(): Promise<string | null> {
  const fromCookie = validCode((await cookies()).get(COUNTRY_COOKIE)?.value);
  if (fromCookie) return fromCookie;

  const h = await headers();
  for (const name of COUNTRY_HEADERS) {
    const c = validCode(h.get(name));
    if (c) return c;
  }

  const ip = (h.get("cf-connecting-ip") ?? h.get("x-forwarded-for")?.split(",")[0] ?? h.get("x-real-ip") ?? "").trim();
  if (!ip || isPrivateIp(ip)) return null;
  return countryForIp(ip);
}
