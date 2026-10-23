import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { categoryName } from "@/lib/category-names";
import { fromSmallestUnit } from "@/lib/money";
import { absoluteUrl, alternatesFor, localizedUrl, metaDescription } from "@/lib/seo";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const WORDS: Record<string, { book: string; in: string; fallback: (name: string, where: string, services: string) => string }> = {
  vi: {
    book: "Đặt lịch online",
    in: "tại",
    fallback: (name, where, services) =>
      `Đặt lịch ${name}${where ? ` tại ${where}` : ""} online 24/7${services ? `: ${services}` : ""}. Xem bảng giá, đánh giá thật và chọn giờ trống ngay.`,
  },
  en: {
    book: "Book online",
    in: "in",
    fallback: (name, where, services) =>
      `Book ${name}${where ? ` in ${where}` : ""} online 24/7${services ? `: ${services}` : ""}. See prices, real reviews and free times.`,
  },
  fi: {
    book: "Varaa verkossa",
    in: "–",
    fallback: (name, where, services) =>
      `Varaa ${name}${where ? `, ${where}` : ""} verkossa 24/7${services ? `: ${services}` : ""}. Katso hinnat, aidot arviot ja vapaat ajat.`,
  },
};
const words = (locale: string) => WORDS[locale] ?? WORDS.en;

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

async function loadSalon(slug: string) {
  return prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      status: true,
      description: true,
      city: true,
      addressLine: true,
      country: true,
      phone: true,
      email: true,
      lat: true,
      lng: true,
      logoUrl: true,
      coverUrl: true,
      website: true,
      facebookUrl: true,
      instagramUrl: true,
      tiktokUrl: true,
      youtubeUrl: true,
      defaultCurrency: true,
      hours: { select: { weekday: true, openMinute: true, closeMinute: true } },
      categories: { select: { category: { select: { nameVi: true, nameEn: true } } } },
      services: {
        where: { active: true },
        select: { name: true, priceCents: true, currency: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
        take: 30,
      },
    },
  });
}

/** Title, description, share image, canonical and hreflang for a salon's
 * booking page (/b/[slug]). */
export async function salonMetadata(slug: string, locale: string): Promise<Metadata> {
  const b = await loadSalon(slug);
  if (!b || b.status !== "APPROVED") return {};
  const W = words(locale);
  const cats = b.categories.map((c) => categoryName(locale, c.category)).slice(0, 2).join(", ");
  const title = `${b.name}${cats ? ` – ${cats}` : ""}${b.city ? ` ${W.in} ${b.city}` : ""} | ${W.book}`;
  const services = b.services.slice(0, 4).map((s) => s.name).join(", ");
  const description = metaDescription(b.description || W.fallback(b.name, b.city ?? "", services));
  const image = absoluteUrl(b.coverUrl) ?? absoluteUrl(b.logoUrl);
  return {
    title,
    description,
    alternates: alternatesFor(`/b/${b.slug}`, locale),
    openGraph: {
      type: "website",
      title,
      description,
      url: localizedUrl(locale, `/b/${b.slug}`),
      siteName: "VaraaAi",
      ...(image ? { images: [{ url: image, alt: b.name }] } : {}),
    },
    twitter: { card: image ? "summary_large_image" : "summary", title, description, ...(image ? { images: [image] } : {}) },
  };
}

/** schema.org BeautySalon data for a salon — address, hours, rating and its
 * services with prices — so search results can show stars and details. */
export async function salonJsonLd(slug: string, locale: string, url?: string) {
  const b = await loadSalon(slug);
  if (!b || b.status !== "APPROVED") return null;
  const rating = await prisma.review.aggregate({
    where: { businessId: b.id, status: "APPROVED" },
    _avg: { rating: true },
    _count: { _all: true },
  });
  const sameAs = [b.website, b.facebookUrl, b.instagramUrl, b.tiktokUrl, b.youtubeUrl].filter((u): u is string => !!u && /^https?:\/\//.test(u));
  const images = [absoluteUrl(b.coverUrl), absoluteUrl(b.logoUrl)].filter((u): u is string => !!u);
  return {
    "@context": "https://schema.org",
    "@type": "BeautySalon",
    "@id": `${localizedUrl("vi", `/b/${b.slug}`)}#salon`,
    name: b.name,
    url: url ?? localizedUrl(locale, `/b/${b.slug}`),
    ...(b.description ? { description: metaDescription(b.description, 500) } : {}),
    ...(images.length ? { image: images } : {}),
    ...(absoluteUrl(b.logoUrl) ? { logo: absoluteUrl(b.logoUrl) } : {}),
    ...(b.phone ? { telephone: b.phone } : {}),
    ...(b.email ? { email: b.email } : {}),
    ...(b.addressLine || b.city
      ? {
          address: {
            "@type": "PostalAddress",
            ...(b.addressLine ? { streetAddress: b.addressLine } : {}),
            ...(b.city ? { addressLocality: b.city } : {}),
            addressCountry: b.country,
          },
        }
      : {}),
    ...(b.lat != null && b.lng != null ? { geo: { "@type": "GeoCoordinates", latitude: b.lat, longitude: b.lng } } : {}),
    ...(b.hours.length
      ? {
          openingHoursSpecification: b.hours.map((h) => ({
            "@type": "OpeningHoursSpecification",
            dayOfWeek: `https://schema.org/${DAYS[h.weekday]}`,
            opens: hhmm(h.openMinute),
            closes: hhmm(Math.min(h.closeMinute, 1439)),
          })),
        }
      : {}),
    ...(rating._count._all > 0 && rating._avg.rating
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: Number(rating._avg.rating.toFixed(1)),
            reviewCount: rating._count._all,
            bestRating: 5,
            worstRating: 1,
          },
        }
      : {}),
    ...(b.services.length
      ? {
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: b.name,
            itemListElement: b.services.map((s) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: s.name },
              price: String(fromSmallestUnit(s.priceCents, s.currency)),
              priceCurrency: s.currency,
            })),
          },
        }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}
