import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { siteStrings, sitePrefix } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { resolveSiteLocale, siteAccess, SITE_BUSINESS_SELECT } from "@/lib/site-page";
import { PageHero, SiteCta, SiteShell } from "@/components/site-shell";
import { categoryNameMap } from "@/lib/service-groups";
import type { Metadata } from "next";
import { siteMetadata } from "@/lib/site-seo";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const [{ slug }, { locale }] = await Promise.all([params, searchParams]);
  return siteMetadata(slug, locale, "services");
}

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
      ...SITE_BUSINESS_SELECT,
      cancellationPolicy: true,
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

  const groupIdSet = new Set(b.serviceGroups.map((g) => g.id));
  const sections = b.serviceGroups
    .map((g) => ({ id: g.id, name: g.name, services: b.services.filter((sv) => sv.groupId === g.id) }))
    .filter((sec) => sec.services.length > 0);

  // A service without a custom group but tagged with one of the platform's
  // standard categories gets its own section, named in the viewer's own
  // language (see src/lib/service-groups.ts).
  const afterCustomGroups = b.services.filter((sv) => !sv.groupId || !groupIdSet.has(sv.groupId));
  const categoryIds = Array.from(new Set(afterCustomGroups.map((sv) => sv.categoryId).filter((id): id is string => !!id)));
  for (const categoryId of categoryIds) {
    const name = catNames.get(categoryId);
    if (!name) continue;
    const services = afterCustomGroups.filter((sv) => sv.categoryId === categoryId);
    if (services.length > 0) sections.push({ id: categoryId, name, services });
  }

  const ungrouped = afterCustomGroups.filter((sv) => !sv.categoryId || !catNames.has(sv.categoryId));
  if (ungrouped.length > 0) {
    sections.push({ id: "other", name: sections.length > 0 ? s.services : "", services: ungrouped });
  }

  const bookingHref = (serviceId: string) => `${prefix}/b/${slug}/book/${serviceId}`;

  return (
    <SiteShell locale={locale} business={b} branches={branches} active="services" preview={preview}>
      <PageHero eyebrow={s.servicesEyebrow} title={s.services} subtitle={b.description || s.servicesPageSubtitleFallback} />

      {sections.length > 1 && (
        <nav className="sticky top-16 z-30 border-b border-lp-line bg-lp-bg/90 backdrop-blur-xl">
          <div className="container flex gap-2 overflow-x-auto py-3 [scrollbar-width:none]">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#s-${sec.id}`}
                className="shrink-0 rounded-full border border-lp-line bg-lp-card px-4 py-2 text-sm font-medium text-lp-ink transition-colors hover:border-lp-accent hover:text-lp-accent"
              >
                {sec.name}
                <span className="ml-2 text-xs text-lp-muted">{sec.services.length}</span>
              </a>
            ))}
          </div>
        </nav>
      )}

      {sections.length === 0 ? (
        <div className="container py-24 text-center text-lp-muted">—</div>
      ) : (
        <div className="container max-w-4xl space-y-16 py-16 sm:space-y-20 sm:py-24">
          {sections.map((sec, index) => (
            <section key={sec.id} id={`s-${sec.id}`} className="scroll-mt-36">
              {sec.name && (
                <div className="mb-6 flex items-end gap-4">
                  <span className="font-serif text-5xl leading-none text-lp-gold/50">{String(index + 1).padStart(2, "0")}</span>
                  <h2 className="font-serif text-3xl font-medium text-lp-ink sm:text-4xl">{sec.name}</h2>
                  <span className="mb-2 h-px flex-1 bg-lp-line" />
                </div>
              )}
              <ul className="overflow-hidden rounded-[2rem] border border-lp-line bg-lp-card">
                {sec.services.map((sv, i) => (
                  <li key={sv.id} className={i > 0 ? "border-t border-lp-line" : ""}>
                    <a
                      href={bookingHref(sv.id)}
                      className="group flex items-center gap-4 px-5 py-5 transition-colors hover:bg-lp-surface/60 sm:px-7 sm:py-6"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-serif text-lg text-lp-ink sm:text-xl">{sv.name}</p>
                        {sv.description && <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-lp-muted">{sv.description}</p>}
                        <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-lp-surface px-2.5 py-1 text-xs font-medium text-lp-muted">
                          <Clock className="h-3 w-3" />
                          {sv.durationMin} {s.min}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-2.5">
                        <span className="font-serif text-xl text-lp-ink sm:text-2xl">{formatMoney(sv.priceCents, sv.currency, locale)}</span>
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-lp-accent px-4 py-2 text-xs font-semibold text-lp-accent-ink transition-transform group-hover:-translate-y-0.5">
                          <CalendarCheck className="h-3.5 w-3.5" />
                          {s.bookShort}
                        </span>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {b.cancellationPolicy && (
            <div className="flex gap-4 rounded-[2rem] border border-lp-line bg-lp-surface p-6 sm:p-8">
              <ShieldCheck className="h-6 w-6 shrink-0 text-lp-gold" />
              <div>
                <h2 className="font-serif text-xl text-lp-ink">{s.cancellationPolicyTitle}</h2>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-lp-muted">{b.cancellationPolicy}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <SiteCta locale={locale} slug={slug} phone={b.phone} />
    </SiteShell>
  );
}
