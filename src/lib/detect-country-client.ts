const STORAGE_KEY = "varaaai-country";

/** A previously detected country code, if any — read this before calling
 * detectCountry() again so repeat visits/components don't re-prompt or
 * re-request geolocation unnecessarily. */
export function getCachedCountry(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

/** Asks the browser for the visitor's location (the same permission prompt
 * used across the site for "find near me") and resolves it to an ISO
 * 3166-1 alpha-2 country code via /api/geolocate. Resolves to null on
 * denial, timeout, or an unsupported browser — callers should treat that
 * as "unknown region" and fall back to unfiltered content. */
export function detectCountry(): Promise<string | null> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      resolve(null);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const res = await fetch(
            `/api/geolocate?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`
          );
          const { countryCode } = await res.json();
          if (countryCode) {
            try {
              localStorage.setItem(STORAGE_KEY, countryCode);
            } catch {
              // Private browsing/blocked storage — just skip caching.
            }
          }
          resolve(countryCode ?? null);
        } catch {
          resolve(null);
        }
      },
      () => resolve(null),
      { timeout: 8000 }
    );
  });
}
