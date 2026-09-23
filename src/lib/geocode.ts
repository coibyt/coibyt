/**
 * Free geocoding via OpenStreetMap's Nominatim — no API key/billing needed,
 * unlike Google Maps. Their usage policy caps this at ~1 request/second and
 * requires a real identifying User-Agent, which is more than enough for
 * geocoding a business address once when it's approved (not a live/high
 * volume lookup). https://operations.osmfoundation.org/policies/nominatim/
 */
export async function geocodeAddress(
  addressLine: string,
  city: string,
  country = "Vietnam"
): Promise<{ lat: number; lng: number } | null> {
  const query = [addressLine, city, country].filter(Boolean).join(", ");
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "VaraaAi.Com booking platform (contact: admin@varaaai.com)",
      },
    });
    if (!res.ok) return null;
    const results = (await res.json()) as { lat: string; lon: string }[];
    if (results.length === 0) return null;
    return { lat: parseFloat(results[0].lat), lng: parseFloat(results[0].lon) };
  } catch {
    return null;
  }
}

/** Reverse of the above: turns a browser geolocation fix into an ISO
 * 3166-1 alpha-2 country code, used to auto-pick the site's language. Kept
 * server-side (via /api/geolocate) because browsers refuse to set a custom
 * User-Agent on fetch(), which Nominatim's usage policy asks for. */
export async function reverseGeocodeCountry(lat: number, lng: number): Promise<string | null> {
  const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "VaraaAi.Com booking platform (contact: admin@varaaai.com)",
      },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { address?: { country_code?: string } };
    return data.address?.country_code?.toLowerCase() ?? null;
  } catch {
    return null;
  }
}
