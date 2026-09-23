import { NextResponse } from "next/server";
import { searchAddress } from "@/lib/geocode";

/** Public — powers the address-autocomplete field on the business
 * application form. */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.trim();
  if (!q || q.length < 3) return NextResponse.json({ suggestions: [] });

  const suggestions = await searchAddress(q);
  return NextResponse.json({ suggestions });
}
