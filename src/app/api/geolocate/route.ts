import { NextResponse } from "next/server";
import { reverseGeocodeCountry } from "@/lib/geocode";

/** Public — turns {lat, lng} from the browser's Geolocation API into a
 * country code, so the client can pick a matching site language. */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const lat = Number(url.searchParams.get("lat"));
  const lng = Number(url.searchParams.get("lng"));
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    return NextResponse.json({ error: "INVALID_COORDS" }, { status: 400 });
  }

  const countryCode = await reverseGeocodeCountry(lat, lng);
  return NextResponse.json({ countryCode });
}
