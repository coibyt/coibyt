import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, Phone, Mail, Globe } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { siteStrings } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter, WeekdayHoursList } from "@/components/site-footer";

export default async function BusinessContactPage({
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
      logoUrl: true,
      status: true,
      defaultLocale: true,
      addressLine: true,
      city: true,
      phone: true,
      email: true,
      website: true,
      googleMapsUrl: true,
      facebookUrl: true,
      instagramUrl: true,
      tiktokUrl: true,
      youtubeUrl: true,
      whatsapp: true,
      hours: true,
      landingPage: { select: { published: true } },
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
  const branches = await getSiteBranches(business.ownerId);
  const hoursByDay = new Map(business.hours.map((h) => [h.weekday, h]));

  return (
    <div>
      <SiteHeader
        locale={locale}
        slug={slug}
        businessName={business.name}
        logoUrl={business.logoUrl}
        active="contact"
      />

      <section className="bg-peach-50">
        <div className="container py-16 text-center sm:py-20">
          <h1 className="font-serif text-4xl font-semibold text-ink-900 sm:text-5xl">
            {s.contactPageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-ink-700">
            {s.contactPageSubtitleFallback}
          </p>
        </div>
      </section>

      <section className="border-t border-ink-100">
        <div className="container grid grid-cols-1 gap-10 py-16 sm:py-20 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              {business.logoUrl ? (
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full bg-mist-100">
                  <Image src={business.logoUrl} alt="" fill className="object-cover" />
                </div>
              ) : (
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary-100 text-lg font-bold text-primary-600">
                  {business.name.charAt(0)}
                </span>
              )}
              <p className="font-serif text-xl font-semibold text-ink-900">{business.name}</p>
            </div>

            {(business.addressLine || business.city) && (
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-primary-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {s.addressLabel}
                  </p>
                  <p className="text-ink-900">
                    {[business.addressLine, business.city].filter(Boolean).join(", ")}
                  </p>
                  {business.googleMapsUrl && (
                    <a
                      href={business.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary-600 hover:underline"
                    >
                      {locale === "vi" ? "Xem bản đồ" : "View on map"}
                    </a>
                  )}
                </div>
              </div>
            )}

            {business.phone && (
              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {s.phoneLabel}
                  </p>
                  <a href={`tel:${business.phone}`} className="text-ink-900 hover:text-primary-600">
                    {business.phone}
                  </a>
                </div>
              </div>
            )}

            {business.email && (
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {s.emailLabel}
                  </p>
                  <a href={`mailto:${business.email}`} className="text-ink-900 hover:text-primary-600">
                    {business.email}
                  </a>
                </div>
              </div>
            )}

            {business.website && (
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5 shrink-0 text-primary-500" />
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-ink-400">
                    {s.websiteLabel}
                  </p>
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-ink-900 hover:text-primary-600"
                  >
                    {business.website}
                  </a>
                </div>
              </div>
            )}
          </div>

          {business.hours.length > 0 && (
            <div className="rounded-3xl border border-ink-100 bg-mist-50 p-6 sm:p-8">
              <p className="mb-4 font-serif text-lg font-semibold text-ink-900">
                {s.openingHoursTitle}
              </p>
              <WeekdayHoursList locale={locale} hoursByDay={hoursByDay} closedLabel={s.closed} />
            </div>
          )}
        </div>
      </section>

      {branches.length > 1 && (
        <section className="border-t border-ink-100 bg-mist-50">
          <div className="container py-16 sm:py-20">
            <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-ink-900">
              {s.chooseBranch}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {branches.map((b) => (
                <div key={b.slug} className="rounded-2xl border border-ink-100 bg-white p-5 text-sm">
                  <p className="mb-1 font-serif text-base font-semibold text-ink-900">{b.name}</p>
                  {(b.addressLine || b.city) && (
                    <p className="flex items-start gap-1.5 text-ink-700">
                      <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
                      <span>{[b.addressLine, b.city].filter(Boolean).join(", ")}</span>
                    </p>
                  )}
                  {b.phone && (
                    <a
                      href={`tel:${b.phone}`}
                      className="mt-1 flex items-center gap-1.5 text-ink-700 hover:text-primary-600"
                    >
                      <Phone className="h-3.5 w-3.5 text-ink-400" /> {b.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t border-ink-100 bg-ink-900 py-14 text-center">
        <a href={`/site/${slug}/booking`} className="btn-accent !px-8 !py-3.5 text-base">
          {s.bookNow}
        </a>
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
