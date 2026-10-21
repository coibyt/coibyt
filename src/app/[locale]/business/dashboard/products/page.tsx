import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { ProductsManager } from "@/components/products-manager";

const DAY_MS = 24 * 60 * 60 * 1000;

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access) return null;
  if (!access.isOwner && !access.permissions.products) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;
  const since = new Date(Date.now() - 30 * DAY_MS);
  const recentOrder = { businessId: business.id, createdAt: { gte: since }, status: { not: "CANCELLED" as const } };

  const [products, groups, ratings, sold, orders, landing] = await Promise.all([
    prisma.product.findMany({
      where: { businessId: business.id, active: true },
      include: { images: { select: { id: true }, orderBy: { sortOrder: "asc" } } },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    }),
    prisma.productGroup.findMany({
      where: { businessId: business.id },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
    prisma.productReview.groupBy({
      by: ["productId"],
      where: { businessId: business.id },
      _avg: { rating: true },
      _count: { _all: true },
    }),
    prisma.orderItem.groupBy({
      by: ["productId"],
      where: { order: recentOrder, productId: { not: null } },
      _sum: { qty: true },
    }),
    prisma.order.aggregate({
      where: { ...recentOrder, currency: business.defaultCurrency },
      _count: { _all: true },
      _sum: { totalCents: true },
    }),
    prisma.landingPage.findUnique({ where: { businessId: business.id }, select: { theme: true } }),
  ]);

  const ratingById = new Map(ratings.map((r) => [r.productId, r]));
  const soldById = new Map(sold.map((s) => [s.productId, s._sum.qty ?? 0]));
  const allReviews = ratings.reduce((n, r) => n + r._count._all, 0);
  const ratingSum = ratings.reduce((n, r) => n + (r._avg.rating ?? 0) * r._count._all, 0);

  return (
    <ProductsManager
      initialProducts={products.map((p) => ({
        id: p.id,
        name: p.name,
        brand: p.brand,
        description: p.description,
        priceCents: p.priceCents,
        compareAtCents: p.compareAtCents,
        currency: p.currency,
        videoUrl: p.videoUrl,
        groupId: p.groupId,
        viewCount: p.viewCount,
        featured: p.featured,
        soldOut: p.soldOut,
        hidden: p.hidden,
        createdAt: p.createdAt.toISOString(),
        imageIds: p.images.map((i) => i.id),
        reviewCount: ratingById.get(p.id)?._count._all ?? 0,
        rating: ratingById.get(p.id)?._avg.rating ?? null,
        sold30: soldById.get(p.id) ?? 0,
      }))}
      groups={groups.map((g) => ({ id: g.id, name: g.name }))}
      stats={{
        reviews: allReviews,
        rating: allReviews ? ratingSum / allReviews : null,
        orders30: orders._count._all,
        revenue30: orders._sum.totalCents ?? 0,
      }}
      slug={business.slug}
      theme={landing?.theme ?? null}
      locale={locale}
      defaultCurrency={business.defaultCurrency}
      canReorder={access.isOwner}
    />
  );
}
