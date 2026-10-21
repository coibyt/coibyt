import type { ReactNode } from "react";
import { CalendarCheck, Eye, Phone } from "lucide-react";
import { siteStrings } from "@/lib/site-content";
import { siteThemeStyle } from "@/lib/site-theme";
import { directionsUrl, openStatus, type SiteBusiness } from "@/lib/site-page";
import { SiteHeader } from "@/components/site-header";
import type { SiteNavKey } from "@/components/site-brand";
import { SiteFooter, minutesToTime, type SiteBranch } from "@/components/site-footer";

export function siteAddress(b: { addressLine: string | null; city: string | null }) {
  return [b.addressLine, b.city].filter(Boolean).join(", ") || null;
}

/** "Open now · until 20:30", "Opens at 09:00" or "Closed now". */
export function siteStatusLabel(locale: string, business: SiteBusiness) {
  const s = siteStrings(locale);
  const status = openStatus(business.hours, business.timezone);
  if (!status) return { status, label: null };
  const today = business.hours.filter((h) => h.weekday === status.weekday).sort((a, b) => a.openMinute - b.openMinute);
  const range = today.length ? `${minutesToTime(today[0].openMinute)} – ${minutesToTime(today[today.length - 1].closeMinute)}` : null;
  const label = status.open
    ? `${s.openNow}${range ? ` · ${range}` : ""}`
    : status.opensAtMinute !== null
      ? `${s.opensAt} ${minutesToTime(status.opensAtMinute)}`
      : s.closedNow;
  return { status, label };
}

/** Header, colours, footer and the phone's bottom action bar around every
 * page of a salon's public website. */
export function SiteShell({
  locale,
  business,
  branches,
  active,
  preview,
  children,
}: {
  locale: string;
  business: SiteBusiness;
  branches: SiteBranch[];
  active: SiteNavKey;
  preview: boolean;
  children: ReactNode;
}) {
  const s = siteStrings(locale);
  const address = siteAddress(business);
  const { status, label } = siteStatusLabel(locale, business);
  const bookingHref = `/site/${business.slug}/booking?locale=${locale}`;

  return (
    <div style={siteThemeStyle(business.landingPage?.theme)} className="min-h-screen bg-lp-bg pb-20 text-lp-ink antialiased sm:pb-0">
      {preview && (
        <div className="flex items-center justify-center gap-2 bg-amber-400 px-4 py-2 text-center text-xs font-semibold text-amber-950">
          <Eye className="h-4 w-4 shrink-0" />
          {s.previewBanner}
        </div>
      )}
      <SiteHeader
        locale={locale}
        slug={business.slug}
        businessName={business.name}
        logoUrl={business.logoUrl}
        active={active}
        phone={business.phone}
        address={address}
        statusLabel={label}
        statusOpen={!!status?.open}
        hasShop={business._count.products > 0}
      />

      <main>{children}</main>

      <SiteFooter
        locale={locale}
        slug={business.slug}
        businessName={business.name}
        logoUrl={business.logoUrl}
        description={business.description}
        contact={business}
        phone={business.phone}
        address={address}
        directionsHref={address || business.googleMapsUrl ? directionsUrl(business) : null}
        hours={business.hours}
        todayWeekday={status?.weekday ?? null}
        branches={branches}
        hasShop={business._count.products > 0}
      />

      {/* Thumb-reach actions on phones. */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-lp-line bg-lp-bg/95 px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl sm:hidden">
        <div className="flex gap-3">
          {business.phone && (
            <a
              href={`tel:${business.phone}`}
              className="flex flex-1 items-center justify-center gap-2 rounded-full border border-lp-line bg-lp-card py-3.5 text-sm font-semibold text-lp-ink"
            >
              <Phone className="h-4 w-4 text-lp-accent" />
              {s.call}
            </a>
          )}
          <a
            href={bookingHref}
            className="flex flex-[1.6] items-center justify-center gap-2 rounded-full bg-lp-accent py-3.5 text-sm font-semibold text-lp-accent-ink shadow-[0_10px_30px_-10px_rgb(var(--lp-accent)/0.8)]"
          >
            <CalendarCheck className="h-4 w-4" />
            {s.bookNow}
          </a>
        </div>
      </div>
    </div>
  );
}

/** Small gold label with hairlines, used above section titles. */
export function Eyebrow({ children, center = true }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-lp-gold ${center ? "justify-center" : ""}`}>
      <span className="h-px w-8 bg-current opacity-60" />
      {children}
      {center && <span className="h-px w-8 bg-current opacity-60" />}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  center = true,
}: {
  eyebrow?: string | null;
  title: string;
  subtitle?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mb-12 sm:mb-14 ${center ? "mx-auto max-w-2xl text-center" : ""}`}>
      {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
      <h2 className="mt-4 font-serif text-[2rem] font-medium leading-[1.15] text-lp-ink sm:text-[2.75rem]">{title}</h2>
      {subtitle && <div className="mt-4 text-base leading-relaxed text-lp-muted">{subtitle}</div>}
    </div>
  );
}

/** The banner at the top of the inner pages (Services, About, …). */
export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string | null }) {
  return (
    <section className="relative overflow-hidden bg-lp-surface">
      <div className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-lp-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-lp-gold/20 blur-3xl" />
      <div className="container relative py-20 text-center sm:py-28">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1.08] text-lp-ink sm:text-6xl">{title}</h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-lg leading-relaxed text-lp-muted">{subtitle}</p>
        )}
      </div>
    </section>
  );
}

/** The closing "book now" band. */
export function SiteCta({ locale, slug, phone }: { locale: string; slug: string; phone: string | null }) {
  const s = siteStrings(locale);
  return (
    <section className="bg-lp-bg py-16 sm:py-20">
      <div className="container">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-lp-accent px-6 py-16 text-center text-lp-accent-ink sm:px-16 sm:py-20">
          <div className="pointer-events-none absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-10 h-80 w-80 rounded-full bg-black/15 blur-3xl" />
          <div className="pointer-events-none absolute inset-4 rounded-[2rem] border border-current opacity-15" />
          <div className="relative">
            <h2 className="font-serif text-4xl font-medium leading-tight sm:text-5xl">{s.ctaTitle}</h2>
            <p className="mx-auto mt-4 max-w-xl text-base opacity-85 sm:text-lg">{s.ctaText}</p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href={`/site/${slug}/booking?locale=${locale}`}
                className="inline-flex items-center gap-2 rounded-full bg-lp-accent-ink px-8 py-4 text-sm font-semibold text-lp-accent shadow-xl transition-transform hover:-translate-y-0.5"
              >
                <CalendarCheck className="h-4 w-4" />
                {s.bookNow}
              </a>
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="inline-flex items-center gap-2 rounded-full border border-lp-accent-ink/30 px-8 py-4 text-sm font-semibold transition-colors hover:bg-lp-accent-ink/10"
                >
                  <Phone className="h-4 w-4" />
                  {phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Five stars, filled up to `rating`. */
export function Stars({ rating, size = "h-4 w-4" }: { rating: number; size?: string }) {
  return (
    <span className="inline-flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className={`${size} ${i < Math.round(rating) ? "fill-lp-gold" : "fill-lp-line"}`} aria-hidden>
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 14.9l-5.2 2.7 1-5.8L1.5 7.7l5.9-.9z" />
        </svg>
      ))}
    </span>
  );
}
