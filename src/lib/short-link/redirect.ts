import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import { routing } from "@/i18n/routing";

/** Short links a salon sends to customers in a message:
 *   /s/<slug>  → the salon's booking page, in the salon's own language
 *   /c/<slug>  → the chain page listing all of the owner's branches
 * Unknown or unapproved salons fall back to the home page. */
export async function shortLinkRedirect(slug: string, kind: "salon" | "chain") {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "varaaai.com";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${proto}://${host}`;

  const business = await prisma.business.findUnique({
    where: { slug },
    select: { status: true, defaultLocale: true },
  });
  if (!business || business.status !== "APPROVED") return NextResponse.redirect(`${origin}/`, 302);

  const locale = business.defaultLocale;
  const s = encodeURIComponent(slug);
  if (kind === "chain") return NextResponse.redirect(`${origin}/embed/chain/${s}?locale=${locale}`, 302);
  const prefix = locale && locale !== routing.defaultLocale && routing.locales.includes(locale as never) ? `/${locale}` : "";
  return NextResponse.redirect(`${origin}${prefix}/b/${s}`, 302);
}

