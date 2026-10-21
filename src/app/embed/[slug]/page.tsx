import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { ServiceSelectionList } from "@/components/service-selection-list";
import { EmbedTopBar, EmbedFooter } from "@/components/embed-topbar";
import { EmbedSalonHeader } from "@/components/embed-salon-header";
import { EmbedBookingProgress } from "@/components/embed-booking-progress";
import { getSiteBranches } from "@/lib/site-branches";
import { categoryNameMap } from "@/lib/service-groups";

export default async function EmbedBusinessPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string; chain?: string }>;
}) {
  const { slug } = await params;
  const { locale: rawLocale, chain } = await searchParams;

  const business = await prisma.business.findUnique({
    where: { slug },
    include: {
      services: { where: { active: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
      serviceGroups: { orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
      reviews: { where: { status: "APPROVED" }, select: { rating: true } },
    },
  });
  if (!business || business.status !== "APPROVED") notFound();

  const siblings = await getSiteBranches(business.ownerId);

  // Prefer the visitor's explicit ?locale=, then the salon's own configured
  // default (Settings → Salon preferences) over the site-wide default.
  const locale = isValidLocale(rawLocale)
    ? rawLocale
    : isValidLocale(business.defaultLocale)
      ? business.defaultLocale
      : routing.defaultLocale;
  const catNames = await categoryNameMap(locale);

  return (
    <div className="mx-auto max-w-xl px-4 pb-4 pt-4">
      <EmbedTopBar locale={locale} />
      <EmbedBookingProgress
        locale={locale}
        steps={[
          {
            state: "done",
            href:
              siblings.length > 1
                ? `/embed/chain/${encodeURIComponent(chain || slug)}?locale=${locale}`
                : undefined,
          },
          { state: "current" },
          { state: "upcoming" },
          { state: "upcoming" },
        ]}
      />
      <EmbedSalonHeader
        name={business.name}
        logoUrl={business.logoUrl}
        coverUrl={business.coverUrl}
        address={[business.addressLine, business.city].filter(Boolean).join(", ") || null}
        rating={
          business.reviews.length
            ? {
                avg: business.reviews.reduce((sum, r) => sum + r.rating, 0) / business.reviews.length,
                count: business.reviews.length,
              }
            : null
        }
      />

      <ServiceSelectionList
        services={business.services.map((s) => ({
          ...s,
          categoryName: s.categoryId ? (catNames.get(s.categoryId) ?? null) : null,
        }))}
        groups={business.serviceGroups}
        locale={locale}
        bookBasePath={`/embed/${slug}/book`}
        extraQueryParams={{ locale }}
        showFinder
      />

      <EmbedFooter locale={locale} />
    </div>
  );
}
