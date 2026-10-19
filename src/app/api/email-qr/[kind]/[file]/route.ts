import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { giftCardQrPng } from "@/lib/gift-cards";
import { loyaltyQrPng } from "@/lib/loyalty";

/** Public QR images for emails ("/api/email-qr/gift/ABCD1234.png",
 * "/api/email-qr/loyalty/<token>.png"). Gmail and most mail apps don't show
 * inline "cid:" images reliably, but they all load a normal https image. The
 * code in the URL is the same one printed in the email, and only codes that
 * exist are rendered. */
export async function GET(_req: Request, { params }: { params: Promise<{ kind: string; file: string }> }) {
  const { kind, file } = await params;
  const code = decodeURIComponent(file).replace(/\.png$/i, "").trim();
  if (!/^[A-Za-z0-9]{4,40}$/.test(code)) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  let png: Buffer | null = null;
  if (kind === "gift") {
    const found = await prisma.giftCardPurchase.findUnique({ where: { code }, select: { status: true } });
    if (found && found.status !== "CANCELLED") png = await giftCardQrPng(code);
  } else if (kind === "loyalty") {
    const found = await prisma.loyaltyCard.findUnique({ where: { token: code }, select: { id: true } });
    if (found) png = await loyaltyQrPng(code);
  }
  if (!png) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  return new NextResponse(new Uint8Array(png), {
    headers: {
      "Content-Type": "image/png",
      "Content-Length": String(png.length),
      "Cache-Control": "public, max-age=86400",
      "X-Robots-Tag": "noindex",
    },
  });
}

