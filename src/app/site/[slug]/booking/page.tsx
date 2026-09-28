import { notFound } from "next/navigation";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { siteStrings, sitePrefix } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ServiceSelectionList } from "@/components/service-selection-list";

export default async function BusinessBookingPage({
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
    select: {
      id: true,
      ownerId: true,
      name: true,
      description: true,
      logoUrl: true,
      status: true,
      defaultLocale: true,
      email: true,
      website: true,
      facebookUrl: true,
      instagramUrl: true,
      tiktokUrl: true,
      youtubeUrl: true,
      whatsapp: true,
      hours: true,
      landingPage: { select: { published: true } },
      serviceGroups: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
      services: { where: { active: true }, orderBy: { createdAt: "asc" } },
    },
  });

  if (!business || business.status !== "APPROVED" || !business.landingPage?.published) {
    notFound();
  }

  const locale = isValidLocale(rawLocale)
    ? rawLocale
    : isValidLocale(business.defaultLocale)
      ? business.defaultLocale
      : routing.defaultLocale;
  const s = siteStrings(locale);
  const prefix = sitePrefix(locale);
  const branches = await getSiteBranches(business.ownerId);

  return (
    <div>
      <SiteHeader
        locale={locale}
        prefix={prefix}
        slug={slug}
        businessName={business.name}
        logoUrl={business.logoUrl}
        active="booking"
      />

      <section className="bg-peach-50">
        <div className="container py-16 text-center sm:py-20">
          <h1 className="font-serif text-4xl font-semibold text-ink-900 sm:text-5xl">
            {s.bookingPageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-700">{s.bookingPageSubtitleFallback}</p>
        </div>
      </section>

      {branches.length > 1 && (
        <section className="border-t border-ink-100">
          <div className="container max-w-4xl py-10">
            <h2 className="mb-5 text-center font-serif text-xl font-semibold text-ink-900">
              {s.chooseBranch}
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((b) => {
                const isCurrent = b.slug === slug;
                return (
                  <a
                    key={b.slug}
                    href={`${prefix}/site/${b.slug}/booking`}
                    className={`flex items-center gap-3 rounded-2xl border p-4 transition-colors ${
                      isCurrent
                        ? "border-primary-500 bg-primary-50"
                        : "border-ink-100 bg-white hover:border-ink-400"
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-mist-100 text-sm font-bold text-primary-600">
                      {b.logoUrl ? (
                        <Image src={b.logoUrl} alt="" width={44} height={44} className="h-full w-full object-cover" />
                      ) : (
                        b.name.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-ink-900">{b.name}</p>
                      {b.city && <p className="truncate text-xs text-ink-400">{b.city}</p>}
                    </div>
                    {!isCurrent && <ChevronRight className="h-4 w-4 shrink-0 text-ink-400" />}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ink-100">
        <div className="container max-w-3xl py-14">
          <ServiceSelectionList
            services={business.services}
            groups={business.serviceGroups}
            locale={locale}
            bookBasePath={`${prefix}/b/${slug}/book`}
          />
        </div>
      </section>

      <SiteFooter
        locale={locale}
        businessName={business.name}
        contact={{
          email: business.email,
          website: business.website,
          facebookUrl: business.facebookUrl,
          instagramUrl: business.instagramUrl,
          tiktokUrl: business.tiktokUrl,
          youtubeUrl: business.youtubeUrl,
          whatsapp: business.whatsapp,
        }}
        hours={business.hours}
        branches={branches}
      />
    </div>
  );
}
