import { Globe, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { siteStrings } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { directionsUrl, mapEmbedUrl, resolveSiteLocale, siteAccess, SITE_BUSINESS_SELECT } from "@/lib/site-page";
import { PageHero, SiteCta, SiteShell, siteAddress, siteStatusLabel } from "@/components/site-shell";
import { WeekdayHoursList, socialLinks } from "@/components/site-footer";
import type { Metadata } from "next";
import { siteMetadata } from "@/lib/site-seo";

/** "mojabeauty.fi" for "https://www.mojabeauty.fi/?v=…" — the link itself keeps the full URL. */
function siteHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}): Promise<Metadata> {
  const [{ slug }, { locale }] = await Promise.all([params, searchParams]);
  return siteMetadata(slug, locale, "contact");
}

export default async function BusinessContactPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ locale?: string }>;
}) {
  const { slug } = await params;
  const { locale: rawLocale } = await searchParams;

  const business = await prisma.business.findUnique({ where: { slug }, select: SITE_BUSINESS_SELECT });
  const { preview } = await siteAccess(business);
  const b = business!;

  const locale = resolveSiteLocale(rawLocale, b.defaultLocale);
  const s = siteStrings(locale);
  const branches = await getSiteBranches(b.ownerId);
  const hoursByDay = new Map(b.hours.map((h) => [h.weekday, h]));
  const address = siteAddress(b);
  const map = mapEmbedUrl(b);
  const { status, label } = siteStatusLabel(locale, b);
  const socials = socialLinks(b);

  const items = [
    address && {
      Icon: MapPin,
      label: s.addressLabel,
      value: address,
      href: directionsUrl(b),
      external: true,
      action: s.getDirections,
    },
    b.phone && { Icon: Phone, label: s.phoneLabel, value: b.phone, href: `tel:${b.phone}`, external: false, action: s.call },
    b.email && { Icon: Mail, label: s.emailLabel, value: b.email, href: `mailto:${b.email}`, external: false, action: null },
    b.website && { Icon: Globe, label: s.websiteLabel, value: siteHost(b.website), href: b.website, external: true, action: null },
  ].filter(
    (x): x is { Icon: typeof MapPin; label: string; value: string; href: string; external: boolean; action: string | null } => !!x
  );

  return (
    <SiteShell locale={locale} business={b} branches={branches} active="contact" preview={preview}>
      <PageHero eyebrow={s.contactEyebrow} title={s.contactPageTitle} subtitle={s.contactPageSubtitleFallback} />

      <section className="bg-lp-bg py-16 sm:py-24">
        <div className="container grid gap-8 lg:grid-cols-[1.2fr_1fr]">
          <div className="grid content-start gap-4 sm:grid-cols-2">
            {items.map(({ Icon, label: itemLabel, value, href, external, action }) => (
              <a
                key={itemLabel}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="group flex flex-col gap-4 rounded-[2rem] border border-lp-line bg-lp-card p-7 transition-all hover:-translate-y-0.5 hover:border-lp-accent/40 hover:shadow-[0_24px_50px_-30px_rgba(0,0,0,0.3)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-lp-accent/10 text-lp-accent transition-colors group-hover:bg-lp-accent group-hover:text-lp-accent-ink">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-muted">{itemLabel}</span>
                  <span className="mt-1.5 block break-words font-serif text-lg text-lp-ink">{value}</span>
                </span>
                {action && (
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-lp-accent">
                    {itemLabel === s.addressLabel && <Navigation className="h-3.5 w-3.5" />}
                    {action}
                  </span>
                )}
              </a>
            ))}
            {socials.length > 0 && (
              <div className="flex flex-wrap items-center gap-2.5 rounded-[2rem] border border-lp-line bg-lp-card p-7 sm:col-span-2">
                <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-muted">{s.followUs}</span>
                {socials.map(({ href, Icon, label: socialLabel }) => (
                  <a
                    key={socialLabel}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={socialLabel}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-lp-line text-lp-ink transition-colors hover:border-lp-accent hover:bg-lp-accent hover:text-lp-accent-ink"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          {b.hours.length > 0 && (
            <div className="relative overflow-hidden rounded-[2rem] bg-lp-deep p-8 text-lp-deep-ink/80 sm:p-10">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-lp-accent/25 blur-3xl" />
              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-lp-gold">{s.openingHoursTitle}</p>
                {label && (
                  <p className="mt-4 flex items-center gap-2.5 font-serif text-2xl text-lp-deep-ink">
                    <span className={`h-2.5 w-2.5 rounded-full ${status?.open ? "bg-emerald-400 shadow-[0_0_0_4px_rgba(52,211,153,0.2)]" : "bg-lp-deep-ink/40"}`} />
                    {label}
                  </p>
                )}
                <div className="mt-7">
                  <WeekdayHoursList
                    locale={locale}
                    hoursByDay={hoursByDay}
                    closedLabel={s.closed}
                    todayWeekday={status?.weekday ?? null}
                    tone="dark"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {map && (
          <div className="container mt-8">
            <div className="overflow-hidden rounded-[2rem] border border-lp-line bg-lp-surface">
              <iframe
                src={map}
                title={b.name}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[380px] w-full grayscale-[30%] sm:h-[460px]"
              />
            </div>
          </div>
        )}
      </section>

      <SiteCta locale={locale} slug={slug} phone={b.phone} />
    </SiteShell>
  );
}
