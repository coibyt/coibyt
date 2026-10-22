import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CalendarCheck, ChevronLeft, Clock, Globe, MapPin, Phone, ShoppingBag } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import { siteThemeStyle } from "@/lib/site-theme";
import { siteSerif } from "@/lib/site-fonts";
import { directionsUrl, openStatus } from "@/lib/site-page";
import { fill } from "@/lib/shop-strings";
import { fanpageStrings } from "@/lib/fanpage-strings";
import { getFanpagePosts, livePosts } from "@/lib/fanpage-data";
import { FanpageFeed } from "@/components/fanpage-feed";
import { FanpageFollowButton, FollowerCount } from "@/components/fanpage-follow-button";
import { FanpagePhotoGrid } from "@/components/fanpage-photo-grid";

async function getBusiness(slug: string) {
  const business = await prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      status: true,
      description: true,
      logoUrl: true,
      coverUrl: true,
      city: true,
      addressLine: true,
      phone: true,
      googleMapsUrl: true,
      timezone: true,
      hours: { select: { weekday: true, openMinute: true, closeMinute: true } },
      landingPage: { select: { theme: true, published: true } },
    },
  });
  return business && business.status === "APPROVED" ? business : null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const business = await getBusiness(slug);
  if (!business) return {};
  return { title: `${business.name} · ${fanpageStrings(locale).eyebrow}`, description: business.description ?? undefined };
}

const hhmm = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;

export default async function FanpagePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const S = fanpageStrings(locale);
  const business = await getBusiness(slug);
  if (!business) notFound();

  const session = await auth();
  const viewerId = session?.user?.id ?? null;
  const [posts, postCount, likeCount, followerCount, following, productCount] = await Promise.all([
    getFanpagePosts(business.id, viewerId),
    prisma.post.count({ where: { businessId: business.id, ...livePosts() } }),
    prisma.postLike.count({ where: { post: { businessId: business.id, ...livePosts() } } }),
    prisma.businessFollow.count({ where: { businessId: business.id } }),
    viewerId
      ? prisma.businessFollow
          .findUnique({ where: { businessId_customerId: { businessId: business.id, customerId: viewerId } } })
          .then((f) => !!f)
      : false,
    prisma.product.count({ where: { businessId: business.id, active: true, hidden: false } }),
  ]);

  const photos = posts.flatMap((p) => p.imageIds).slice(0, 9);
  const address = [business.addressLine, business.city].filter(Boolean).join(", ");
  const status = openStatus(business.hours, business.timezone);
  const today = status ? business.hours.filter((h) => h.weekday === status.weekday).sort((a, b) => a.openMinute - b.openMinute) : [];
  const todayLabel = today.length ? `${hhmm(today[0].openMinute)} – ${hhmm(today[today.length - 1].closeMinute)}` : null;

  const stats = [
    { value: postCount.toLocaleString(locale), label: S.posts },
    { value: <FollowerCount slug={slug} initial={followerCount} locale={locale} />, label: S.followers },
    { value: likeCount.toLocaleString(locale), label: S.likes },
  ];

  return (
    <div style={siteThemeStyle(business.landingPage?.theme)} className={`${siteSerif.variable} bg-lp-bg pb-24 text-lp-ink antialiased`}>
      {/* Cover */}
      <div className="relative h-48 overflow-hidden bg-lp-deep sm:h-72">
        {business.coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={business.coverUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <>
            <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-lp-accent/50 blur-3xl" />
            <div className="absolute -bottom-32 right-[10%] h-96 w-96 rounded-full bg-lp-gold/40 blur-3xl" />
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{ backgroundImage: "repeating-linear-gradient(135deg, rgb(var(--lp-gold)) 0 1px, transparent 1px 22px)" }}
            />
            <p className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-serif text-5xl italic text-lp-deep-ink/[0.14] sm:text-8xl">
              {business.name}
            </p>
          </>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/10" />
        <div className="container relative pt-5">
          <Link
            href={`/b/${slug}`}
            className="inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur hover:bg-black/40"
          >
            <ChevronLeft className="h-4 w-4" />
            {business.name}
          </Link>
        </div>
      </div>

      {/* Profile */}
      <div className="container">
        <div className="relative -mt-16 flex flex-col gap-5 border-b border-lp-line pb-7 sm:-mt-20 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            <span className="flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-lp-accent font-serif text-5xl font-semibold text-lp-accent-ink shadow-xl ring-[6px] ring-lp-bg sm:h-40 sm:w-40">
              {business.logoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={business.logoUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                business.name.charAt(0)
              )}
            </span>
            <div className="sm:pt-[5.5rem]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-lp-gold">{S.eyebrow}</p>
              <h1 className="mt-1 font-serif text-4xl font-medium leading-tight text-lp-ink sm:text-5xl">{business.name}</h1>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-lp-muted">
                {stats.map((s, i) => (
                  <span key={i}>
                    <span className="font-semibold text-lp-ink">{s.value}</span> {s.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2.5">
            <FanpageFollowButton slug={slug} locale={locale} initialFollowing={following} initialCount={followerCount} />
            <Link
              href={`/b/${slug}#services`}
              className="inline-flex items-center gap-2 rounded-full bg-lp-ink px-6 py-3 text-sm font-semibold text-lp-bg transition hover:opacity-90"
            >
              <CalendarCheck className="h-4 w-4" />
              {S.book}
            </Link>
            {business.phone && (
              <a
                href={`tel:${business.phone}`}
                className="inline-flex items-center gap-2 rounded-full bg-lp-card px-5 py-3 text-sm font-semibold text-lp-ink ring-1 ring-lp-line hover:ring-lp-gold"
              >
                <Phone className="h-4 w-4 text-lp-accent" />
                {S.call}
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-10">
          <main className="mx-auto w-full max-w-2xl lg:mx-0">
            <FanpageFeed posts={posts} locale={locale} />
          </main>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <section className="rounded-[1.75rem] bg-lp-card p-6 ring-1 ring-lp-line">
              <h2 className="font-serif text-2xl text-lp-ink">{S.about}</h2>
              {business.description && (
                <p className="mt-3 line-clamp-6 whitespace-pre-line text-sm leading-relaxed text-lp-muted">{business.description}</p>
              )}
              <ul className="mt-5 space-y-3 text-sm">
                {address && (
                  <li>
                    <a href={directionsUrl(business)} target="_blank" rel="noreferrer" className="flex items-start gap-3 text-lp-ink hover:text-lp-accent">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lp-gold" />
                      {address}
                    </a>
                  </li>
                )}
                {business.phone && (
                  <li>
                    <a href={`tel:${business.phone}`} className="flex items-center gap-3 text-lp-ink hover:text-lp-accent">
                      <Phone className="h-4 w-4 shrink-0 text-lp-gold" />
                      {business.phone}
                    </a>
                  </li>
                )}
                {status && (
                  <li className="flex items-center gap-3 text-lp-ink">
                    <Clock className="h-4 w-4 shrink-0 text-lp-gold" />
                    <span className={`h-2 w-2 shrink-0 rounded-full ${status.open ? "bg-emerald-500" : "bg-lp-muted/50"}`} />
                    {todayLabel ?? "—"}
                  </li>
                )}
              </ul>
              <div className="mt-6 grid grid-cols-2 gap-2">
                {productCount > 0 && (
                  <Link
                    href={`/b/${slug}/products`}
                    className="flex items-center justify-center gap-2 rounded-full bg-lp-surface py-2.5 text-sm font-semibold text-lp-ink ring-1 ring-lp-line hover:ring-lp-gold"
                  >
                    <ShoppingBag className="h-4 w-4 text-lp-accent" />
                    {S.shop}
                  </Link>
                )}
                {business.landingPage?.published && (
                  <a
                    href={`/site/${slug}?locale=${locale}`}
                    className="flex items-center justify-center gap-2 rounded-full bg-lp-surface py-2.5 text-sm font-semibold text-lp-ink ring-1 ring-lp-line hover:ring-lp-gold"
                  >
                    <Globe className="h-4 w-4 text-lp-accent" />
                    {S.website}
                  </a>
                )}
              </div>
            </section>

            {photos.length > 0 && (
              <section className="rounded-[1.75rem] bg-lp-card p-6 ring-1 ring-lp-line">
                <h2 className="mb-4 font-serif text-2xl text-lp-ink">{S.latestPhotos}</h2>
                <FanpagePhotoGrid imageIds={photos} locale={locale} />
              </section>
            )}

            {!following && (
              <section className="relative overflow-hidden rounded-[1.75rem] bg-lp-deep p-6 text-lp-deep-ink">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lp-accent/40 blur-3xl" />
                <p className="relative font-serif text-2xl">{S.followCtaTitle}</p>
                <p className="relative mt-2 text-sm opacity-80">{fill(S.followCtaText, { name: business.name })}</p>
                <div className="relative mt-5">
                  <FanpageFollowButton slug={slug} locale={locale} initialFollowing={following} initialCount={followerCount} className="w-full" />
                </div>
              </section>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
