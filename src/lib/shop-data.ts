import { prisma } from "@/lib/prisma";
import type { ShopProduct } from "@/components/shop-product-card";

/** Products added in the last two weeks get a "New" badge. */
const NEW_FOR_MS = 14 * 24 * 60 * 60 * 1000;

/** What the shop needs to know about a salon. */
export async function getShopBusiness(slug: string) {
  const business = await prisma.business.findUnique({
    where: { slug },
    select: {
      id: true,
      slug: true,
      name: true,
      status: true,
      phone: true,
      logoUrl: true,
      landingPage: { select: { theme: true } },
    },
  });
  return business && business.status === "APPROVED" ? business : null;
}

/** The salon's products as customers see them: live ones only, in the
 * owner's order, with their average rating. */
export async function getShopProducts(
  businessId: string,
  where: { groupId?: string | null; excludeId?: string; take?: number } = {}
): Promise<ShopProduct[]> {
  const products = await prisma.product.findMany({
    where: {
      businessId,
      active: true,
      hidden: false,
      ...(where.groupId !== undefined ? { groupId: where.groupId } : {}),
      ...(where.excludeId ? { id: { not: where.excludeId } } : {}),
    },
    include: { images: { select: { id: true }, orderBy: { sortOrder: "asc" }, take: 2 } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    take: where.take,
  });
  const ratings = await prisma.productReview.groupBy({
    by: ["productId"],
    where: { productId: { in: products.map((p) => p.id) } },
    _avg: { rating: true },
    _count: { _all: true },
  });
  const ratingById = new Map(ratings.map((r) => [r.productId, r]));
  const now = Date.now();
  return products.map((p) => {
    const r = ratingById.get(p.id);
    return {
      id: p.id,
      name: p.name,
      brand: p.brand,
      priceCents: p.priceCents,
      compareAtCents: p.compareAtCents,
      currency: p.currency,
      imageIds: p.images.map((i) => i.id),
      groupId: p.groupId,
      featured: p.featured,
      soldOut: p.soldOut,
      isNew: now - p.createdAt.getTime() < NEW_FOR_MS,
      rating: r?._avg.rating ?? null,
      reviewCount: r?._count._all ?? 0,
      sortOrder: p.sortOrder,
      createdAt: p.createdAt.toISOString(),
    };
  });
}
