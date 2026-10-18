import { NextResponse } from "next/server";
import { loadGiftCardDesignByCode, renderGiftCardPng } from "@/lib/gift-card-image";

// Rendering takes a moment and mail apps fetch the same image repeatedly, so
// keep recent ones in memory for an hour.
const CACHE_MS = 60 * 60 * 1000;
const cache = new Map<string, { png: Buffer; at: number }>();

/** Public — the gift card image the card's email shows, addressed by its
 * code ("ABCD123456.png"). Email clients fetch it like any other image. */
export async function GET(req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const code = decodeURIComponent(file).replace(/\.png$/i, "").trim().toUpperCase();
  if (!/^[A-Z0-9]{4,32}$/.test(code)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const locale = new URL(req.url).searchParams.get("l") ?? "vi";
  const key = `${code}:${locale}`;
  let png = cache.get(key)?.at && Date.now() - cache.get(key)!.at < CACHE_MS ? cache.get(key)!.png : null;
  if (!png) {
    const design = await loadGiftCardDesignByCode(code, locale);
    if (!design) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    png = await renderGiftCardPng(design);
    if (cache.size >= 200) cache.delete(cache.keys().next().value!);
    cache.set(key, { png, at: Date.now() });
  }
  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": String(png.length),
      // Gmail's image proxy and mail apps re-fetch often; let them cache.
      "Cache-Control": "public, max-age=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}
