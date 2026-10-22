import { auth } from "@/auth";
import { requireOwnerOrReadOnlyViewer } from "@/lib/current-business";
import { redirect } from "@/i18n/navigation";
import { prisma } from "@/lib/prisma";
import { postInclude, toFanPost } from "@/lib/fanpage-data";
import { FanpageManager } from "@/components/fanpage-manager";
import { ReadOnlyBanner } from "@/components/read-only-banner";

export default async function FanpagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const owned = await requireOwnerOrReadOnlyViewer();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const session = await auth();
  const { businessId } = owned;

  const [business, posts, followers, likes, comments] = await Promise.all([
    prisma.business.findUniqueOrThrow({
      where: { id: businessId },
      select: { slug: true, name: true, logoUrl: true, landingPage: { select: { theme: true } } },
    }),
    prisma.post.findMany({
      where: { businessId },
      include: postInclude(session?.user?.id ?? null),
      orderBy: [{ pinned: "desc" }, { publishAt: "desc" }],
    }),
    prisma.businessFollow.count({ where: { businessId } }),
    prisma.postLike.count({ where: { post: { businessId } } }),
    prisma.postComment.count({ where: { post: { businessId } } }),
  ]);

  return (
    <div>
      {!owned.isOwner && <ReadOnlyBanner locale={locale} />}
      <FanpageManager
        locale={locale}
        canEdit={owned.isOwner}
        business={{ slug: business.slug, name: business.name, logoUrl: business.logoUrl, theme: business.landingPage?.theme ?? null }}
        initialPosts={posts.map(toFanPost)}
        stats={{ followers, likes, comments }}
      />
    </div>
  );
}
