import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
// The languages with real, maintained copy — every other locale still works,
// but these are the ones worth pointing search engines at.
const LOCALES = ["vi", "en", "fi"] as const;

export const dynamic = "force-dynamic";

function entry(path: string, priority: number, lastModified?: Date): MetadataRoute.Sitemap[number] {
  // Next writes these into the XML verbatim, so a bare "&" between query
  // params would make the whole sitemap invalid XML.
  const url = (locale: string) => `${SITE}${locale === "vi" ? "" : `/${locale}`}${path}`.replace(/&/g, "&amp;");
  return {
    url: url("vi"),
    lastModified: lastModified ?? new Date(),
    changeFrequency: "daily",
    priority,
    alternates: { languages: Object.fromEntries(LOCALES.map((l) => [l, url(l)])) },
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, businesses] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.business.findMany({
      where: { status: "APPROVED" },
      select: { slug: true, city: true, updatedAt: true, categories: { select: { category: { select: { slug: true } } } } },
    }),
  ]);

  const qs = (category?: string, city?: string) => {
    const p = new URLSearchParams();
    if (category) p.set("category", category);
    if (city) p.set("city", city);
    return `/search?${p.toString()}`;
  };

  // Only category × city pairs that actually have salons — empty landing
  // pages would just be thin content.
  const pairs = new Set<string>();
  const cities = new Set<string>();
  for (const b of businesses) {
    if (!b.city?.trim()) continue;
    cities.add(b.city);
    for (const c of b.categories) pairs.add(`${c.category.slug}|${b.city}`);
  }

  return [
    entry("", 1),
    entry("/salon-check", 0.5),
    entry("/app", 0.6),
    entry("/tools/price-list", 0.7),
    entry("/tools/qr-poster", 0.7),
    ...categories.map((c) => entry(qs(c.slug), 0.8)),
    ...[...cities].map((city) => entry(qs(undefined, city), 0.7)),
    ...[...pairs].map((p) => {
      const [slug, city] = p.split("|");
      return entry(qs(slug, city), 0.7);
    }),
    ...businesses.map((b) => entry(`/b/${b.slug}`, 0.9, b.updatedAt)),
  ];
}
