import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { PlayCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { formatMoney } from "@/lib/money";
import { toYoutubeEmbedUrl } from "@/lib/youtube";
import { ProductGallery } from "@/components/product-gallery";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { ProductReviewSection } from "@/components/product-review-section";
import { ProductCartWidget } from "@/components/product-cart-widget";

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; productId: string }>;
}) {
  const { locale, slug, productId } = await params;
  const tProducts = await getTranslations("business.productsPage");

  const business = await prisma.business.findUnique({
    where: { slug },
    select: { id: true, name: true, status: true },
  });
  if (!business || business.status !== "APPROVED") notFound();

  const [product, session] = await Promise.all([
    prisma.product.findFirst({
      where: { id: productId, businessId: business.id, active: true },
      include: {
        images: { select: { id: true }, orderBy: { sortOrder: "asc" } },
        reviews: {
          include: {
            customer: { select: { name: true, image: true } },
            images: { select: { id: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    }),
    auth(),
  ]);
  if (!product) notFound();

  await prisma.product.update({ where: { id: product.id }, data: { viewCount: { increment: 1 } } });

  const alreadyReviewed = session?.user
    ? product.reviews.some((r) => r.customerId === session.user!.id)
    : false;

  const embedUrl = product.videoUrl ? toYoutubeEmbedUrl(product.videoUrl) : null;

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <ProductGallery imageIds={product.images.map((i) => i.id)} name={product.name} />

        <div>
          <h1 className="text-2xl font-bold text-ink-900">{product.name}</h1>
          <p className="mt-2 text-xl font-semibold text-primary-600">
            {formatMoney(product.priceCents, product.currency, locale)}
          </p>

          {product.description && (
            <p className="mt-4 whitespace-pre-line text-sm text-ink-700">{product.description}</p>
          )}

          {embedUrl && (
            <details className="mt-4">
              <summary className="flex cursor-pointer items-center gap-1.5 text-sm font-medium text-primary-600">
                <PlayCircle className="h-4 w-4" />
                {tProducts("watchVideo")}
              </summary>
              <div className="mt-2 aspect-video w-full overflow-hidden rounded-xl">
                <iframe
                  src={embedUrl}
                  title={product.name}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </details>
          )}

          <div className="mt-6">
            <ProductDetailActions
              businessSlug={slug}
              product={{
                id: product.id,
                name: product.name,
                priceCents: product.priceCents,
                currency: product.currency,
                imageId: product.images[0]?.id ?? null,
              }}
            />
          </div>

          <p className="mt-3 text-xs text-ink-400">
            {tProducts("views", { count: product.viewCount })}
          </p>
        </div>
      </div>

      <div className="mt-12">
        <ProductReviewSection
          productId={product.id}
          reviews={product.reviews}
          alreadyReviewed={alreadyReviewed}
          businessSlug={slug}
        />
      </div>

      <ProductCartWidget
        businessId={business.id}
        businessSlug={slug}
        businessName={business.name}
        locale={locale}
      />
    </div>
  );
}
