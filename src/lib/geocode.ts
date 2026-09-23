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

export interface AddressSuggestion {
  displayName: string;
  lat: number;
  lng: number;
  addressLine: string | null;
  city: string | null;
  /** ISO 3166-1 alpha-2, lowercase (Nominatim's own format) */
  countryCode: string | null;
}

/** Address-autocomplete suggestions for the business application form —
 * unlike geocodeAddress, this returns several candidates with their full
 * structured address so the owner can pick the exact match themselves,
 * rather than trusting a single best-guess geocode of free text. */
export async function searchAddress(query: string): Promise<AddressSuggestion[]> {
  const url = `https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=5&q=${encodeURIComponent(query)}`;

  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "VaraaAi.Com booking platform (contact: admin@varaaai.com)",
      },
    });
    if (!res.ok) return [];
    const results = (await res.json()) as Array<{
      display_name: string;
      lat: string;
      lon: string;
      address?: {
        road?: string;
        house_number?: string;
        city?: string;
        town?: string;
        village?: string;
        county?: string;
        country_code?: string;
      };
    }>;

    return results.map((r) => {
      const addr = r.address ?? {};
      const addressLine = [addr.house_number, addr.road].filter(Boolean).join(" ") || null;
      const city = addr.city ?? addr.town ?? addr.village ?? addr.county ?? null;
      return {
        displayName: r.display_name,
        lat: parseFloat(r.lat),
        lng: parseFloat(r.lon),
        addressLine,
        city,
        countryCode: addr.country_code ?? null,
      };
    });
  } catch {
    return [];
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
