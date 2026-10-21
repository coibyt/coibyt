import Image from "next/image";
import { Check, ChevronRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { siteStrings, sitePrefix } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { resolveSiteLocale, siteAccess, SITE_BUSINESS_SELECT } from "@/lib/site-page";
import { PageHero, SiteShell } from "@/components/site-shell";
import { ServiceSelectionList } from "@/components/service-selection-list";
import { categoryNameMap } from "@/lib/service-groups";

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
      ...SITE_BUSINESS_SELECT,
      serviceGroups: { orderBy: [{ sortOrder: "asc" }, { id: "asc" }] },
      services: { where: { active: true }, orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }] },
    },
  });
  const { preview } = await siteAccess(business);
  const b = business!;

  const locale = resolveSiteLocale(rawLocale, b.defaultLocale);
  const s = siteStrings(locale);
  const prefix = sitePrefix(locale);
  const [branches, catNames] = await Promise.all([getSiteBranches(b.ownerId), categoryNameMap(locale)]);

  return (
    <SiteShell locale={locale} business={b} branches={branches} active="booking" preview={preview}>
      <PageHero eyebrow={s.onlineBooking247} title={s.bookingPageTitle} subtitle={s.bookingPageSubtitleFallback} />

      {branches.length > 1 && (
        <section className="bg-lp-bg pt-14">
          <div className="container max-w-4xl">
            <h2 className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-lp-gold">{s.chooseBranch}</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((br) => {
                const isCurrent = br.slug === slug;
                return (
                  <a
                    key={br.slug}
                    href={`/site/${br.slug}/booking?locale=${locale}`}
                    className={`flex items-center gap-3 rounded-2xl border p-4 transition-all ${
                      isCurrent
                        ? "border-lp-accent bg-lp-accent/10 shadow-[0_0_0_3px_rgb(var(--lp-accent)/0.12)]"
                        : "border-lp-line bg-lp-card hover:border-lp-accent/50"
                    }`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-lp-surface font-serif text-lp-accent">
                      {br.logoUrl ? (
                        <Image src={br.logoUrl} alt="" width={44} height={44} className="h-full w-full object-cover" />
                      ) : (
                        br.name.charAt(0)
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium text-lp-ink">{br.name}</p>
                      {(br.addressLine || br.city) && (
                        <p className="truncate text-xs text-lp-muted">{[br.addressLine, br.city].filter(Boolean).join(", ")}</p>
                      )}
                    </div>
                    {isCurrent ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lp-accent text-lp-accent-ink">
                        <Check className="h-3.5 w-3.5" strokeWidth={3} />
                      </span>
                    ) : (
                      <ChevronRight className="h-4 w-4 shrink-0 text-lp-muted" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="bg-lp-bg py-14 sm:py-20">
        <div className="container max-w-3xl">
          <div className="rounded-[2rem] border border-lp-line bg-white p-4 text-ink-900 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] sm:p-8">
            <ServiceSelectionList
              services={b.services.map((sv) => ({
                ...sv,
                categoryName: sv.categoryId ? (catNames.get(sv.categoryId) ?? null) : null,
              }))}
              groups={b.serviceGroups}
              locale={locale}
              bookBasePath={`${prefix}/b/${slug}/book`}
              showFinder={b.services.length > 8}
              finderTopClass="top-16"
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
