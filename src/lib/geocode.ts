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
