import type { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Words people actually type, per category, in the platform's main
// languages (Vietnamese with and without accents, English, Finnish).
// Salons name their services in their own language — a Finnish salon's
// "Geelilakkaus" never contains "nail" — so a query is also matched to
// categories through these lists, not just to literal service names.
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  nails: [
    "nail", "nails", "móng", "mong", "sơn gel", "son gel", "gel", "manicure", "pedicure", "nối móng",
    "kynsi", "kynnet", "kynsien", "rakennekynnet", "geelilakka", "geelilakkaus", "manikyyri", "jalkahoito", "pedikyyri",
  ],
  "eyebrows-lashes": [
    "lash", "lashes", "brow", "brows", "eyelash", "mi", "nối mi", "noi mi", "lông mi", "chân mày", "lông mày",
    "ripset", "ripsi", "ripsien", "ripsienpidennys", "pidennys", "kulmat", "kulmien",
  ],
  "hair-salon": ["hair", "haircut", "tóc", "toc", "cắt tóc", "cat toc", "nhuộm", "uốn", "kampaamo", "hius", "hiukset", "hiustenleikkaus"],
  barber: ["barber", "cắt tóc nam", "râu", "parturi", "parta"],
  "spa-massage": ["spa", "massage", "mát xa", "mat xa", "matxa", "hieronta", "hierova"],
  skincare: ["facial", "skincare", "da mặt", "chăm sóc da", "kasvohoito", "ihonhoito"],
  makeup: ["makeup", "make-up", "trang điểm", "trang diem", "meikki", "ehostus"],
  wellness: ["wellness", "thư giãn", "hyvinvointi", "rentoutus"],
};

const MAX_TERMS = 6;
const MAX_RESULTS = 24;

function normalize(s: string) {
  return s.toLowerCase().normalize("NFC").trim();
}

/** Category slugs a free-text term points at (e.g. "kynnet" → nails). */
export function categoriesForTerm(term: string): string[] {
  const t = normalize(term);
  if (t.length < 2) return [];
  return Object.entries(CATEGORY_KEYWORDS)
    .filter(([, words]) => words.some((w) => w === t || (t.length >= 3 && (w.startsWith(t) || t.startsWith(w)))))
    .map(([slug]) => slug);
}

function termCondition(term: string): Prisma.BusinessWhereInput {
  const cats = categoriesForTerm(term);
  // A 2-letter word ("mi" = lashes in Vietnamese) would substring-match half
  // of every description — only use it through its category, or a salon name.
  if (term.length < 3) {
    return cats.length
      ? { categories: { some: { category: { slug: { in: cats } } } } }
      : { name: { contains: term } };
  }
  return {
    OR: [
      { name: { contains: term } },
      { description: { contains: term } },
      { city: { contains: term } },
      { addressLine: { contains: term } },
      { services: { some: { active: true, OR: [{ name: { contains: term } }, { description: { contains: term } }] } } },
      { categories: { some: { category: { OR: [{ nameVi: { contains: term } }, { nameEn: { contains: term } }] } } } },
      ...(cats.length ? [{ categories: { some: { category: { slug: { in: cats } } } } }] : []),
    ],
  };
}

export interface SearchParams {
  q?: string;
  city?: string;
  category?: string;
}

/** Approved salons matching the query — every word of `q` has to match
 * somewhere (name, description, address, a service, or a category via its
 * synonyms), so "nail helsinki" narrows instead of returning nothing. Results
 * are ranked by how directly they match, then by rating. */
export async function searchBusinesses({ q, city, category }: SearchParams) {
  const terms = (q ?? "")
    .split(/\s+/)
    .map((t) => t.trim())
    .filter((t) => t.length >= 2)
    .slice(0, MAX_TERMS);

  const where: Prisma.BusinessWhereInput = {
    status: "APPROVED",
    AND: [
      ...(city ? [{ OR: [{ city: { contains: city } }, { addressLine: { contains: city } }] }] : []),
      ...(category ? [{ categories: { some: { category: { slug: category } } } }] : []),
      ...terms.map(termCondition),
    ],
  };

  const businesses = await prisma.business.findMany({
    where,
    take: 80,
    orderBy: { createdAt: "desc" },
    include: {
      reviews: { where: { status: "APPROVED" }, select: { rating: true } },
      categories: { include: { category: true } },
      services: { where: { active: true }, select: { name: true, priceCents: true, currency: true } },
    },
  });

  const lowered = terms.map(normalize);
  const scored = businesses.map((b) => {
    const name = normalize(b.name);
    const catSlugs = b.categories.map((c) => c.category.slug);
    let score = 0;
    for (const t of lowered) {
      if (name.includes(t)) score += 6;
      if (categoriesForTerm(t).some((s) => catSlugs.includes(s))) score += 4;
      if (b.services.some((s) => normalize(s.name).includes(t))) score += 2;
      if (b.city && normalize(b.city).includes(t)) score += 1;
    }
    const avg = b.reviews.length ? b.reviews.reduce((s, r) => s + r.rating, 0) / b.reviews.length : 0;
    return { b, score, avg };
  });
  scored.sort((x, y) => y.score - x.score || y.avg - x.avg || y.b.reviews.length - x.b.reviews.length);

  return scored.slice(0, MAX_RESULTS).map(({ b }) => ({
    id: b.id,
    slug: b.slug,
    name: b.name,
    coverUrl: b.coverUrl,
    city: b.city,
    lat: b.lat,
    lng: b.lng,
    reviews: b.reviews,
    categories: b.categories,
    minPriceCents: b.services.length > 0 ? Math.min(...b.services.map((s) => s.priceCents)) : null,
    currency: b.services[0]?.currency ?? "VND",
  }));
}

/** Cities that actually have approved salons — for "browse by city" links. */
export async function citiesWithSalons(category?: string) {
  const rows = await prisma.business.groupBy({
    by: ["city"],
    where: {
      status: "APPROVED",
      city: { not: null },
      ...(category ? { categories: { some: { category: { slug: category } } } } : {}),
    },
    _count: true,
    orderBy: { _count: { city: "desc" } },
    take: 12,
  });
  return rows.filter((r) => r.city && r.city.trim()).map((r) => r.city as string);
}
