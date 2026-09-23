import { getTranslations } from "next-intl/server";
import { prisma } from "@/lib/prisma";
import { SearchBarHero } from "@/components/search-bar";
import { CategoryCard } from "@/components/category-card";
import { BusinessCard } from "@/components/business-card";
import { Link } from "@/i18n/navigation";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const [t, categories, businesses] = await Promise.all([
    getTranslations("home"),
    prisma.category.findMany({ take: 8 }),
    prisma.business.findMany({
      where: { status: "APPROVED" },
      take: 8,
      orderBy: { createdAt: "desc" },
      include: {
        reviews: { select: { rating: true } },
        categories: { include: { category: true } },
      },
    }),
  ]);

  return (
    <div>
      <section className="bg-peach-100">
        <div className="container flex flex-col items-center gap-8 py-16 text-center sm:py-24">
          <h1 className="max-w-2xl whitespace-pre-line text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-6xl">
            {t("heroTitle")}
          </h1>
          <p className="max-w-xl text-base text-ink-700 sm:text-lg">
            {t("heroSubtitle")}
          </p>
          <SearchBarHero />
        </div>
      </section>

      <section className="container py-14">
        <h2 className="mb-6 text-2xl font-bold text-ink-900">
          {t("categoriesTitle")}
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
          {categories.map((c) => (
            <CategoryCard
              key={c.id}
              slug={c.slug}
              name={locale === "vi" ? c.nameVi : c.nameEn}
              icon={c.icon}
            />
          ))}
        </div>
      </section>

      {businesses.length > 0 && (
        <section className="container py-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-ink-900">
              {t("featuredTitle")}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {businesses.map((b) => (
              <BusinessCard key={b.id} business={b} locale={locale} />
            ))}
          </div>
        </section>
      )}

      <section className="bg-ink-900">
        <div className="container flex flex-col items-center gap-4 py-16 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            {t("ctaBusinessTitle")}
          </h2>
          <p className="max-w-md text-sm text-ink-100">
            {t("ctaBusinessSubtitle")}
          </p>
          <Link href="/business/apply" className="btn-accent mt-2">
            {t("ctaBusinessButton")}
          </Link>
        </div>
      </section>
    </div>
  );
}
