import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { ServiceSelectionList } from "@/components/service-selection-list";

export default async function EmbedBusinessPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { slug } = await params;
  const { locale: rawLocale } = await searchParams;

  const business = await prisma.business.findUnique({
    where: { slug },
    include: { services: { where: { active: true }, orderBy: { createdAt: "asc" } } },
  });
  if (!business || business.status !== "APPROVED") notFound();

  // Prefer the visitor's explicit ?locale=, then the salon's own configured
  // default (Settings → Salon preferences) over the site-wide default.
  const locale = isValidLocale(rawLocale)
    ? rawLocale
    : isValidLocale(business.defaultLocale)
      ? business.defaultLocale
      : routing.defaultLocale;

  return (
    <div className="mx-auto max-w-xl p-4">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-100 text-lg font-bold text-primary-500">
          {business.logoUrl ? (
            <Image
              src={business.logoUrl}
              alt=""
              width={48}
              height={48}
              className="h-full w-full object-cover"
            />
          ) : (
            business.name.charAt(0)
          )}
        </div>
        <h1 className="text-lg font-bold text-ink-900">{business.name}</h1>
      </div>

      <ServiceSelectionList
        services={business.services}
        locale={locale}
        bookBasePath={`/embed/${slug}/book`}
        extraQueryParams={{ locale }}
      />
    </div>
  );
}
