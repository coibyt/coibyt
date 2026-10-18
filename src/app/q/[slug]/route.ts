import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";

/** Short link printed in QR posters: /q/<salon-slug>?f=<format>&l=<locale>.
 * A short URL keeps the QR code sparse (bigger modules), so it still scans
 * from a small sticker even with a logo over its centre. Redirects to the
 * salon's booking page with the UTM tags that page counts as a QR scan. */
export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = new URL(req.url);
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? url.host;
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;

  const format = (url.searchParams.get("f") ?? "print").replace(/[^a-z0-9]/gi, "").slice(0, 16) || "print";
  const l = url.searchParams.get("l");
  const prefix = l && isValidLocale(l) && l !== routing.defaultLocale ? `/${l}` : "";

  const business = await prisma.business.findUnique({ where: { slug }, select: { status: true } });
  if (!business || business.status !== "APPROVED") return NextResponse.redirect(`${origin}${prefix || "/"}`, 302);

  const target = `${origin}${prefix}/b/${encodeURIComponent(slug)}?utm_source=qr_poster&utm_medium=print&utm_campaign=${format}`;
  return NextResponse.redirect(target, 302);
}
