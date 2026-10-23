import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SEO_LOCALES, SITE, absoluteUrl, localizedUrl } from "@/lib/seo";

// Built from the database on every request, so a new salon, product or
// fanpage post is in the sitemap the moment it goes live — no rebuild.
export const dynamic = "force-dynamic";

type Entry = MetadataRoute.Sitemap[number];
type Freq = Entry["changeFrequency"];

function latest(...dates: (Date | null | undefined)[]) {
  const t = Math.max(0, ...dates.map((d) => d?.getTime() ?? 0));
  return t ? new Date(t) : undefined;
}

/** A page that exists in every SEO language, with its hreflang alternates. */
function entry(path: string, priority: number, changeFrequency: Freq, lastModified?: Date, images?: (string | null)[]): Entry {
  // Next writes these into the XML verbatim, so a bare "&" between query
  // params would make the whole sitemap invalid XML.
  const url = (locale: string) => localizedUrl(locale, path).replace(/&/g, "&amp;");
  const imgs = (images ?? []).map(absoluteUrl).filter((u): u is string => !!u).slice(0, 20);
  return {
    url: url("vi"),
    ...(lastModified ? { lastModified } : {}),
    changeFrequency,
    priority,
    alternates: { languages: Object.fromEntries(SEO_LOCALES.map((l) => [l, url(l)])) },
    ...(imgs.length ? { images: imgs } : {}),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const [categories, businesses] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.business.findMany({
      where: { status: "APPROVED" },
      select: {
        id: true,
        slug: true,
        city: true,
        logoUrl: true,
        coverUrl: true,
        updatedAt: true,
        categories: { select: { category: { select: { slug: true } } } },
        landingPage: { select: { published: true, updatedAt: true } },
        products: {
          where: { active: true, hidden: false },
          select: { id: true, updatedAt: true, images: { select: { id: true }, orderBy: { sortOrder: "asc" }, take: 4 } },
        },
        posts: {
          where: { publishAt: { lte: now } },
          select: { publishAt: true, updatedAt: true, images: { select: { id: true }, take: 3 } },
          orderBy: { publishAt: "desc" },
          take: 10,
        },
        services: { where: { active: true }, select: { updatedAt: true }, orderBy: { updatedAt: "desc" }, take: 1 },
        reviews: { where: { status: "APPROVED" }, select: { createdAt: true }, orderBy: { createdAt: "desc" }, take: 1 },
      },
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
  const pairs = new Map<string, Date | undefined>();
  const cities = new Map<string, Date | undefined>();
  const byCategory = new Map<string, Date | undefined>();
  const salonEntries: Entry[] = [];
  let newest: Date | undefined;

  for (const b of businesses) {
    const productsAt = latest(...b.products.map((p) => p.updatedAt));
    const postsAt = latest(...b.posts.map((p) => latest(p.publishAt, p.updatedAt)));
    const salonAt = latest(b.updatedAt, b.services[0]?.updatedAt, b.reviews[0]?.createdAt, postsAt, productsAt);
    newest = latest(newest, salonAt);

    salonEntries.push(entry(`/b/${b.slug}`, 0.9, "daily", salonAt, [b.coverUrl, b.logoUrl]));

    if (b.products.length > 0) {
      salonEntries.push(
        entry(`/b/${b.slug}/products`, 0.7, "weekly", productsAt, b.products.flatMap((p) => p.images.slice(0, 1).map((i) => `/api/product-image/${i.id}`)))
      );
      for (const p of b.products) {
        salonEntries.push(entry(`/b/${b.slug}/products/${p.id}`, 0.6, "weekly", p.updatedAt, p.images.map((i) => `/api/product-image/${i.id}`)));
      }
    }
    if (b.posts.length > 0) {
      salonEntries.push(
        entry(`/b/${b.slug}/fanpage`, 0.7, "daily", postsAt, b.posts.flatMap((p) => p.images.map((i) => `/api/posts/images/${i.id}`)))
      );
    }

    // The salon's own website (/site/…) takes its language from ?locale=,
    // so it's listed once, in the salon's default language.
    if (b.landingPage?.published) {
      const siteAt = latest(b.landingPage.updatedAt, b.updatedAt, b.services[0]?.updatedAt);
      for (const [path, priority] of [["", 0.8], ["/services", 0.7], ["/booking", 0.6], ["/about", 0.5], ["/contact", 0.5]] as const) {
        salonEntries.push({
          url: `${SITE}/site/${b.slug}${path}`,
          ...(siteAt ? { lastModified: siteAt } : {}),
          changeFrequency: "weekly",
          priority,
          ...(path === "" && b.coverUrl ? { images: [absoluteUrl(b.coverUrl)!] } : {}),
        });
      }
    }

    if (b.city?.trim()) {
      cities.set(b.city, latest(cities.get(b.city), salonAt));
      for (const c of b.categories) {
        const key = `${c.category.slug}|${b.city}`;
        pairs.set(key, latest(pairs.get(key), salonAt));
      }
    }
    for (const c of b.categories) byCategory.set(c.category.slug, latest(byCategory.get(c.category.slug), salonAt));
  }

  return [
    entry("", 1, "daily", newest),
    entry("/business", 0.8, "weekly"),
    entry("/app", 0.6, "monthly"),
    entry("/salon-check", 0.6, "monthly"),
    entry("/tools/price-list", 0.7, "monthly"),
    entry("/tools/qr-poster", 0.7, "monthly"),
    entry("/help/getting-started", 0.5, "monthly"),
    entry("/support", 0.4, "monthly"),
    entry("/directory", 0.3, "daily", newest),
    entry("/privacy", 0.2, "yearly"),
    entry("/terms", 0.2, "yearly"),
    ...categories.map((c) => entry(qs(c.slug), 0.8, "daily", byCategory.get(c.slug))),
    ...[...cities].map(([city, at]) => entry(qs(undefined, city), 0.7, "daily", at)),
    ...[...pairs].map(([p, at]) => {
      const [slug, city] = p.split("|");
      return entry(qs(slug, city), 0.7, "daily", at);
    }),
    ...salonEntries,
  ];
}
