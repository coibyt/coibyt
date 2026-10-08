import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { siteStrings, sitePrefix } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { categoryNameMap } from "@/lib/service-groups";

export default async function BusinessServicesPage({
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
      cancellationPolicy: true,
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
  const catNames = await categoryNameMap(locale);

  const groupIdSet = new Set(business.serviceGroups.map((g) => g.id));
  const sections = business.serviceGroups
    .map((g) => ({ id: g.id, name: g.name, services: business.services.filter((sv) => sv.groupId === g.id) }))
    .filter((sec) => sec.services.length > 0);

  // A service without a custom group but tagged with one of the platform's
  // standard categories gets its own section, named in the viewer's own
  // language (see src/lib/service-groups.ts).
  const afterCustomGroups = business.services.filter((sv) => !sv.groupId || !groupIdSet.has(sv.groupId));
  const categoryIds = Array.from(new Set(afterCustomGroups.map((sv) => sv.categoryId).filter((id): id is string => !!id)));
  for (const categoryId of categoryIds) {
    const name = catNames.get(categoryId);
    if (!name) continue;
    const services = afterCustomGroups.filter((sv) => sv.categoryId === categoryId);
    if (services.length > 0) sections.push({ id: categoryId, name, services });
  }

  const ungrouped = afterCustomGroups.filter((sv) => !sv.categoryId || !catNames.has(sv.categoryId));
  if (ungrouped.length > 0) {
    sections.push({ id: "__other", name: sections.length > 0 ? s.services : "", services: ungrouped });
  }

  const bookingHref = (serviceId?: string) =>
    serviceId ? `${prefix}/b/${slug}/book/${serviceId}` : `/site/${slug}/booking?locale=${locale}`;

  return (
    <div>
      <SiteHeader
        locale={locale}
        slug={slug}
        businessName={business.name}
        logoUrl={business.logoUrl}
        active="services"
      />

      <section className="bg-peach-50">
        <div className="container py-16 text-center sm:py-20">
          <h1 className="font-serif text-4xl font-semibold text-ink-900 sm:text-5xl">{s.services}</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-700">
            {business.description || s.servicesPageSubtitleFallback}
          </p>
        </div>
      </section>

      {sections.length === 0 ? (
        <div className="container py-16 text-center text-ink-400">—</div>
      ) : (
        sections.map((sec, index) => (
          <section key={sec.id} className={index % 2 === 1 ? "bg-mist-50" : undefined}>
            <div className="container max-w-3xl py-14">
              {sec.name && (
                <h2 className="mb-6 font-serif text-2xl font-semibold text-ink-900">{sec.name}</h2>
              )}
              <ul className="divide-y divide-ink-100">
                {sec.services.map((sv) => (
                  <li key={sv.id} className="flex items-baseline justify-between gap-4 py-3.5">
                    <div className="min-w-0">
                      <a
                        href={bookingHref(sv.id)}
                        className="font-medium text-ink-900 underline decoration-ink-100 underline-offset-4 hover:decoration-primary-500"
                      >
                        {sv.name}
                      </a>
                      <p className="text-xs text-ink-400">
                        {sv.durationMin} {s.min}
                      </p>
                    </div>
                    <span className="shrink-0 font-serif text-lg font-semibold text-ink-900">
                      {formatMoney(sv.priceCents, sv.currency, locale)}
                    </span>
                  </li>
                ))}
              </ul>
              <a href={bookingHref()} className="btn-primary mt-6 !px-6 !py-3">
                {s.bookNow}
              </a>
            </div>
          </section>
        ))
      )}

      {business.cancellationPolicy && (
        <section className="border-t border-ink-100">
          <div className="container max-w-2xl py-12 text-center">
            <h2 className="mb-2 font-serif text-xl font-semibold text-ink-900">
              {s.cancellationPolicyTitle}
            </h2>
            <p className="whitespace-pre-line text-sm text-ink-700">{business.cancellationPolicy}</p>
          </div>
        </section>
      )}

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
