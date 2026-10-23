import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { siteStrings } from "@/lib/site-content";
import { getSiteBranches } from "@/lib/site-branches";
import { resolveSiteLocale, siteAccess, SITE_BUSINESS_SELECT } from "@/lib/site-page";
import { Eyebrow, PageHero, SectionHeading, SiteCta, SiteShell } from "@/components/site-shell";
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
  return siteMetadata(slug, locale, "about");
}

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
      ...SITE_BUSINESS_SELECT,
      staff: {
        where: { active: true },
        orderBy: { createdAt: "asc" },
        select: { id: true, name: true, title: true, bio: true, avatar: { select: { id: true, updatedAt: true } } },
      },
    },
  });
  const { preview } = await siteAccess(business);
  const b = business!;

  const locale = resolveSiteLocale(rawLocale, b.defaultLocale);
  const s = siteStrings(locale);
  const [branches, landing] = await Promise.all([
    getSiteBranches(b.ownerId),
    prisma.landingPage.findUnique({
      where: { businessId: b.id },
      select: {
        id: true,
        introTitle: true,
        introText: true,
        images: { where: { slot: "intro" }, select: { updatedAt: true } },
      },
    }),
  ]);
  const introImage = landing?.images[0] ? `/api/landing-image/${landing.id}/intro?v=${landing.images[0].updatedAt.getTime()}` : null;

  return (
    <SiteShell locale={locale} business={b} branches={branches} active="about" preview={preview}>
      <PageHero eyebrow={b.name} title={s.aboutPageTitle} subtitle={b.description || s.aboutPageSubtitleFallback} />

      {landing && (landing.introTitle || landing.introText) && (
        <section className="bg-lp-bg py-20 sm:py-28">
          <div className={`container grid items-center gap-14 ${introImage ? "lg:grid-cols-2 lg:gap-24" : "max-w-3xl text-center"}`}>
            {introImage && (
              <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-lp-surface lg:max-w-none">
                <Image src={introImage} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </div>
            )}
            <div>
              <Eyebrow center={!introImage}>{s.aboutEyebrow}</Eyebrow>
              {landing.introTitle && (
                <h2 className="mt-5 font-serif text-4xl font-medium leading-tight text-lp-ink sm:text-5xl">{landing.introTitle}</h2>
              )}
              {landing.introText && (
                <p className="mt-6 whitespace-pre-line text-lg leading-relaxed text-lp-muted">{landing.introText}</p>
              )}
            </div>
          </div>
        </section>
      )}

      {b.staff.length > 0 && (
        <section className="bg-lp-surface py-20 sm:py-28">
          <div className="container">
            <SectionHeading eyebrow={s.teamEyebrow} title={s.teamTitle} />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {b.staff.map((member) => (
                <div key={member.id} className="group overflow-hidden rounded-[2rem] border border-lp-line bg-lp-card">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-lp-surface">
                    {member.avatar ? (
                      <Image
                        src={`/api/staff-avatar/${member.id}?v=${member.avatar.updatedAt.getTime()}`}
                        alt=""
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-lp-accent/15 to-lp-gold/15 font-serif text-7xl text-lp-accent">
                        {member.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="space-y-2 p-7">
                    <p className="font-serif text-2xl text-lp-ink">{member.name}</p>
                    {member.title && (
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-lp-gold">{member.title}</p>
                    )}
                    {member.bio && <p className="pt-1 text-sm leading-relaxed text-lp-muted">{member.bio}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <SiteCta locale={locale} slug={slug} phone={b.phone} />
    </SiteShell>
  );
}
