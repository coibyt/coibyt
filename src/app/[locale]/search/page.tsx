import { prisma } from "@/lib/prisma";
import { SearchBarHero } from "@/components/search-bar";
import { SearchResults } from "@/components/search-results";
import type { Prisma } from "@prisma/client";

export default async function SearchPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ q?: string; city?: string; category?: string }>;
}) {
  const { locale } = await params;
  const { q, city, category } = await searchParams;

  const where: Prisma.BusinessWhereInput = {
    status: "APPROVED",
    ...(city ? { city: { contains: city } } : {}),
    ...(category ? { categories: { some: { category: { slug: category } } } } : {}),
    ...(q
      ? {
          OR: [
            { name: { contains: q } },
            { services: { some: { name: { contains: q } } } },
          ],
        }
      : {}),
  };

  const businesses = await prisma.business.findMany({
    where,
    take: 24,
    orderBy: { createdAt: "desc" },
    include: {
      reviews: { select: { rating: true } },
      categories: { include: { category: true } },
      services: { where: { active: true }, select: { priceCents: true, currency: true } },
    },
  });

  const results = businesses.map((b) => ({
    id: b.id,
    slug: b.slug,
    name: b.name,
    coverUrl: b.coverUrl,
    city: b.city,
    lat: b.lat,
    lng: b.lng,
    reviews: b.reviews,
    categories: b.categories,
    minPriceCents:
      b.services.length > 0 ? Math.min(...b.services.map((s) => s.priceCents)) : null,
    currency: b.services[0]?.currency ?? "VND",
  }));

  return (
    <div className="container py-10">
      <div className="mb-8 flex justify-center">
        <SearchBarHero />
      </div>

      <SearchResults businesses={results} locale={locale} />
    </div>
  );
}
