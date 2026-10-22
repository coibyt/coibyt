import { auth } from "@/auth";
import { redirect, Link } from "@/i18n/navigation";
import { Compass, Newspaper } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { siteThemeStyle } from "@/lib/site-theme";
import { siteSerif } from "@/lib/site-fonts";
import { fanpageStrings } from "@/lib/fanpage-strings";
import { livePosts, postInclude, toFanPost } from "@/lib/fanpage-data";
import { FanpageFeed } from "@/components/fanpage-feed";
import { Avatar } from "@/components/fanpage-post-card";

export default async function AccountFeedPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  if (!session?.user) {
    redirect({ href: "/auth/sign-in?callbackUrl=/account/feed", locale });
    return null;
  }
  const S = fanpageStrings(locale);

  const follows = await prisma.businessFollow.findMany({
    where: { customerId: session.user.id, business: { status: "APPROVED" } },
    select: { business: { select: { id: true, name: true, slug: true, logoUrl: true } } },
    orderBy: { createdAt: "desc" },
  });
  const posts = follows.length
    ? (
        await prisma.post.findMany({
          where: { businessId: { in: follows.map((f) => f.business.id) }, ...livePosts() },
          include: postInclude(session.user.id),
          orderBy: { publishAt: "desc" },
          take: 50,
        })
      ).map(toFanPost)
    : [];

  // The platform's own colours (the Lavender palette), since this feed mixes
  // many salons.
  return (
    <div style={siteThemeStyle("LAVENDER")} className={`${siteSerif.variable} min-h-[70vh] bg-lp-bg text-lp-ink antialiased`}>
      <div className="relative overflow-hidden bg-lp-surface">
        <div className="pointer-events-none absolute -left-24 -top-10 h-72 w-72 rounded-full bg-lp-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-lp-gold/20 blur-3xl" />
        <div className="container relative max-w-2xl py-10 sm:py-14">
          <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-lp-gold">
            <span className="h-px w-8 bg-current opacity-60" />
            VaraaAi
          </p>
          <h1 className="mt-3 font-serif text-4xl font-medium sm:text-5xl">{S.feedTitle}</h1>
          <p className="mt-2 text-lp-muted">{S.feedSubtitle}</p>

          {follows.length > 0 && (
            <div className="mt-7">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-lp-muted">{S.followingTitle}</p>
              <div className="-mx-4 flex gap-4 overflow-x-auto px-4 pb-1 [scrollbar-width:none]">
                {follows.map(({ business: b }) => (
                  <Link key={b.id} href={`/b/${b.slug}/fanpage`} className="group flex w-[4.5rem] shrink-0 flex-col items-center gap-2 text-center">
                    <span className="rounded-full bg-gradient-to-tr from-lp-gold via-lp-accent to-lp-gold p-[2.5px] transition-transform group-hover:scale-105">
                      <Avatar name={b.name} src={b.logoUrl} size={60} />
                    </span>
                    <span className="line-clamp-2 text-[11px] font-medium leading-tight text-lp-ink">{b.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container max-w-2xl py-8 pb-24">
        <FanpageFeed
          posts={posts}
          locale={locale}
          showBusinessLink
          empty={
            <div className="rounded-[1.75rem] bg-lp-card px-6 py-16 text-center ring-1 ring-lp-line">
              <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lp-surface ring-1 ring-lp-line">
                <Newspaper className="h-7 w-7 text-lp-gold" strokeWidth={1.5} />
              </span>
              <p className="mt-5 font-serif text-2xl text-lp-ink">{S.feedEmptyTitle}</p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-lp-muted">{S.feedEmptyText}</p>
              <Link
                href="/"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-lp-accent px-6 py-3 text-sm font-semibold text-lp-accent-ink"
              >
                <Compass className="h-4 w-4" />
                {S.discover}
              </Link>
            </div>
          }
        />
      </div>
    </div>
  );
}
