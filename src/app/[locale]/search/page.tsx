import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { BusinessCard } from "@/components/business-card";
import { SearchBarHero } from "@/components/search-bar";
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
  const t = await getTranslations("home");

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
    },
  });

  return (
    <div className="container py-10">
      <div className="mb-8 flex justify-center">
        <SearchBarHero />
      </div>

      {businesses.length === 0 ? (
        <p className="py-20 text-center text-ink-400">
          {locale === "vi"
            ? "Không tìm thấy kết quả phù hợp."
            : "No matching results."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {businesses.map((b) => (
            <BusinessCard key={b.id} business={b} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}
