import { notFound } from "next/navigation";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { isValidLocale } from "@/i18n/is-valid-locale";
import { routing } from "@/i18n/routing";
import { siteStrings } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default async function BusinessAboutPage({
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
      staff: {
        where: { active: true },
        orderBy: { createdAt: "asc" },
        select: { id: true, name: true, title: true, bio: true, avatarUrl: true },
      },
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

  return (
    <div>
      <SiteHeader
        locale={locale}
        slug={slug}
        businessName={business.name}
        logoUrl={business.logoUrl}
        active="about"
      />

      <section className="bg-peach-50">
        <div className="container py-16 text-center sm:py-20">
          <h1 className="font-serif text-4xl font-semibold text-ink-900 sm:text-5xl">
            {s.aboutPageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl whitespace-pre-line text-lg text-ink-700">
            {business.description || s.aboutPageSubtitleFallback}
          </p>
        </div>
      </section>

      {business.staff.length > 0 && (
        <section className="border-t border-ink-100">
          <div className="container py-16 sm:py-20">
            <h2 className="mb-10 text-center font-serif text-3xl font-semibold text-ink-900">
              {s.teamTitle}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {business.staff.map((member) => (
                <div
                  key={member.id}
                  className="overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-card"
                >
                  <div className="relative aspect-square w-full overflow-hidden bg-mist-100">
                    {member.avatarUrl ? (
                      <Image src={member.avatarUrl} alt="" fill className="object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-primary-300">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-1.5 p-5">
                    <p className="font-serif text-lg font-semibold text-ink-900">{member.name}</p>
                    {member.title && <p className="text-sm text-primary-600">{member.title}</p>}
                    {member.bio && <p className="text-sm text-ink-700">{member.bio}</p>}
                  </div>
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
