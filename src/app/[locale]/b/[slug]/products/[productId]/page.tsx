import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, MessageCircleHeart, PlayCircle, ShieldCheck, Store, Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { embedFrameClass, toYoutubeEmbedUrl } from "@/lib/youtube";
import { siteThemeStyle } from "@/lib/site-theme";
import { siteSerif } from "@/lib/site-fonts";
import { discountPct, fill, shopStrings } from "@/lib/shop-strings";
import { getShopBusiness, getShopProducts } from "@/lib/shop-data";
import { ProductGallery } from "@/components/product-gallery";
import { ProductDetailActions } from "@/components/product-detail-actions";
import { ProductReviewSection } from "@/components/product-review-section";
import { ProductCartWidget } from "@/components/product-cart-widget";
import { ShopProductCard, ShopStars } from "@/components/shop-product-card";
import { absoluteUrl, alternatesFor, jsonLd, localizedUrl, metaDescription } from "@/lib/seo";
import { fromSmallestUnit } from "@/lib/money";

const META_WORDS: Record<string, (product: string, salon: string, price: string) => string> = {
  vi: (product, salon, price) => `Mua ${product} tại ${salon} — ${price}. Sản phẩm chính hãng do salon tuyển chọn, đặt online và nhận tại salon.`,
  en: (product, salon, price) => `Buy ${product} from ${salon} — ${price}. Genuine products hand-picked by the salon; order online, collect at the salon.`,
  fi: (product, salon, price) => `Osta ${product} salongista ${salon} — ${price}. Aidot, salongin valitsemat tuotteet; tilaa verkosta, nouda salongilta.`,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string; productId: string }> }): Promise<Metadata> {
  const { locale, slug, productId } = await params;
  const business = await getShopBusiness(slug);
  if (!business) return {};
  const product = await prisma.product.findFirst({
    where: { id: productId, businessId: business.id, active: true, hidden: false },
    select: { name: true, brand: true, description: true, priceCents: true, currency: true, images: { select: { id: true }, orderBy: { sortOrder: "asc" }, take: 4 } },
  });
  if (!product) return {};
  const path = `/b/${slug}/products/${productId}`;
  const title = `${product.brand ? `${product.brand} ` : ""}${product.name} | ${business.name}`;
  const fallback = (META_WORDS[locale] ?? META_WORDS.en)(product.name, business.name, formatMoney(product.priceCents, product.currency, locale));
  const description = metaDescription(product.description || fallback);
  const images = product.images.map((i) => absoluteUrl(`/api/product-image/${i.id}`)!);
  return {
    title,
    description,
    alternates: alternatesFor(path, locale),
    openGraph: { type: "website", title, description, url: localizedUrl(locale, path), siteName: "VaraaAi", ...(images.length ? { images } : {}) },
    twitter: { card: images.length ? "summary_large_image" : "summary", title, description, ...(images.length ? { images } : {}) },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; productId: string }>;
}) {
  const { locale, slug, productId } = await params;
  const S = shopStrings(locale);

  const business = await getShopBusiness(slug);
  if (!business) notFound();

  const [product, session] = await Promise.all([
    prisma.product.findFirst({
      where: { id: productId, businessId: business.id, active: true, hidden: false },
      include: {
        group: { select: { name: true } },
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

  const [, sameGroup] = await Promise.all([
    prisma.product.update({ where: { id: product.id }, data: { viewCount: { increment: 1 } } }),
    getShopProducts(business.id, { groupId: product.groupId, excludeId: product.id, take: 4 }),
  ]);
  // Fill up "You may also like" from the rest of the shop when the product's
  // own group is small.
  const related =
    sameGroup.length >= 4
      ? sameGroup
      : [
          ...sameGroup,
          ...(await getShopProducts(business.id, { excludeId: product.id, take: 8 })).filter(
            (p) => !sameGroup.some((s) => s.id === p.id)
          ),
        ].slice(0, 4);

  const alreadyReviewed = session?.user ? product.reviews.some((r) => r.customerId === session.user!.id) : false;
  const embedUrl = product.videoUrl ? toYoutubeEmbedUrl(product.videoUrl) : null;
  const pct = discountPct(product.priceCents, product.compareAtCents);
  const avg = product.reviews.length ? product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length : 0;

  const trust = [
    { icon: ShieldCheck, text: S.trustGenuine },
    { icon: Store, text: S.trustPickup },
    { icon: Wallet, text: S.trustPay },
    { icon: MessageCircleHeart, text: S.trustAdvice },
  ];

  // schema.org Product, so search results can show the price, stock and stars.
  const productUrl = localizedUrl(locale, `/b/${slug}/products/${product.id}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.id,
    url: productUrl,
    ...(product.description ? { description: metaDescription(product.description, 1000) } : {}),
    ...(product.images.length ? { image: product.images.map((i) => absoluteUrl(`/api/product-image/${i.id}`)) } : {}),
    ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
    offers: {
      "@type": "Offer",
      url: productUrl,
      price: String(fromSmallestUnit(product.priceCents, product.currency)),
      priceCurrency: product.currency,
      availability: product.soldOut ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "BeautySalon", name: business.name, url: localizedUrl(locale, `/b/${slug}`) },
    },
    ...(product.reviews.length
      ? {
          aggregateRating: { "@type": "AggregateRating", ratingValue: Number(avg.toFixed(1)), reviewCount: product.reviews.length, bestRating: 5, worstRating: 1 },
          review: product.reviews.slice(0, 5).map((r) => ({
            "@type": "Review",
            author: { "@type": "Person", name: r.customer.name },
            datePublished: r.createdAt.toISOString().slice(0, 10),
            reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
            ...(r.comment ? { reviewBody: r.comment } : {}),
          })),
        }
      : {}),
  };

  return (
    <div style={siteThemeStyle(business.landingPage?.theme)} className={`${siteSerif.variable} bg-lp-bg text-lp-ink antialiased`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(structuredData)} />
      <div className="container pb-24 pt-6 sm:pt-8">
        <nav className="flex flex-wrap items-center gap-1.5 text-sm text-lp-muted" aria-label="Breadcrumb">
          <Link href={`/b/${slug}`} className="hover:text-lp-ink">
            {business.name}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <Link href={`/b/${slug}/products`} className="hover:text-lp-ink">
            {S.eyebrow}
          </Link>
          {product.group && (
            <>
              <ChevronRight className="h-3.5 w-3.5 opacity-60" />
              <span>{product.group.name}</span>
            </>
          )}
          <ChevronRight className="h-3.5 w-3.5 opacity-60" />
          <span className="max-w-[14rem] truncate text-lp-ink">{product.name}</span>
        </nav>

        <div className="mt-6 grid grid-cols-1 gap-10 lg:mt-8 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              imageIds={product.images.map((i) => i.id)}
              name={product.name}
              labels={{ prev: S.prev, next: S.next, close: S.close }}
              badge={
                pct > 0 && !product.soldOut ? (
                  <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-lp-accent px-3.5 py-1.5 text-sm font-bold text-lp-accent-ink shadow">
                    −{pct}%
                  </span>
                ) : product.soldOut ? (
                  <span className="pointer-events-none absolute left-5 top-5 rounded-full bg-lp-deep/85 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-lp-deep-ink backdrop-blur">
                    {S.soldOut}
                  </span>
                ) : null
              }
            />
          </div>

          <div>
            {product.brand && <p className="text-xs font-semibold uppercase tracking-[0.28em] text-lp-gold">{product.brand}</p>}
            <h1 className="mt-3 font-serif text-[2.2rem] font-medium leading-[1.1] text-lp-ink sm:text-5xl">{product.name}</h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-lp-muted">
              {product.reviews.length > 0 ? (
                <a href="#reviews" className="flex items-center gap-2 hover:text-lp-ink">
                  <ShopStars rating={avg} size="h-4 w-4" />
                  <span className="font-semibold text-lp-ink">{avg.toFixed(1)}</span>
                  <span className="underline-offset-4 hover:underline">({product.reviews.length})</span>
                </a>
              ) : (
                <a href="#reviews" className="underline-offset-4 hover:underline">
                  {S.writeReview}
                </a>
              )}
              <span className="h-1 w-1 rounded-full bg-lp-line" />
              <span>{fill(S.views, { n: product.viewCount + 1 })}</span>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 border-y border-lp-line py-6">
              <span className={`font-serif text-4xl font-medium ${pct > 0 ? "text-lp-accent" : "text-lp-ink"}`}>
                {formatMoney(product.priceCents, product.currency, locale)}
              </span>
              {pct > 0 && product.compareAtCents && (
                <>
                  <span className="text-lg text-lp-muted line-through decoration-lp-muted/60">
                    {formatMoney(product.compareAtCents, product.currency, locale)}
                  </span>
                  <span className="rounded-full bg-lp-accent/10 px-3 py-1 text-xs font-semibold text-lp-accent">
                    {fill(S.save, { amount: formatMoney(product.compareAtCents - product.priceCents, product.currency, locale) })}
                  </span>
                </>
              )}
            </div>

            {product.description && (
              <div className="mt-7">
                <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-lp-gold">{S.description}</p>
                <p className="whitespace-pre-line text-[15px] leading-relaxed text-lp-muted">{product.description}</p>
              </div>
            )}

            <div className="mt-8">
              <ProductDetailActions
                businessSlug={slug}
                locale={locale}
                phone={business.phone}
                product={{
                  id: product.id,
                  name: product.name,
                  priceCents: product.priceCents,
                  currency: product.currency,
                  imageId: product.images[0]?.id ?? null,
                  soldOut: product.soldOut,
                }}
              />
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3">
              {trust.map(({ icon: Icon, text: [title, hint] }) => (
                <li key={title} className="flex items-center gap-3 rounded-2xl bg-lp-surface p-3 ring-1 ring-lp-line sm:items-start sm:p-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lp-card text-lp-gold ring-1 ring-lp-line">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-lp-ink">{title}</span>
                    <span className="hidden text-xs leading-snug text-lp-muted sm:block">{hint}</span>
                  </span>
                </li>
              ))}
            </ul>

            {embedUrl && (
              <details className="group mt-8 overflow-hidden rounded-2xl ring-1 ring-lp-line">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-2 bg-lp-card px-5 py-4 text-sm font-semibold text-lp-ink">
                  <span className="flex items-center gap-2">
                    <PlayCircle className="h-5 w-5 text-lp-accent" />
                    {S.video}
                  </span>
                  <ChevronRight className="h-4 w-4 text-lp-muted transition-transform group-open:rotate-90" />
                </summary>
                <div className={embedFrameClass(embedUrl, "")}>
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
          </div>
        </div>

        <div className="mt-24 border-t border-lp-line pt-16">
          <ProductReviewSection
            productId={product.id}
            reviews={product.reviews}
            alreadyReviewed={alreadyReviewed}
            businessSlug={slug}
            locale={locale}
          />
        </div>

        {related.length > 0 && (
          <section className="mt-24 border-t border-lp-line pt-16">
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-lp-gold">
              <span className="h-px w-8 bg-current opacity-60" />
              {S.relatedEyebrow}
            </p>
            <div className="mb-10 mt-3 flex items-end justify-between gap-4">
              <h2 className="font-serif text-3xl font-medium text-lp-ink sm:text-4xl">{S.relatedTitle}</h2>
              <Link href={`/b/${slug}/products`} className="shrink-0 text-sm font-semibold text-lp-accent underline-offset-4 hover:underline">
                {S.browse}
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4 lg:gap-x-8">
              {related.map((p) => (
                <ShopProductCard key={p.id} product={p} slug={slug} locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>

      <ProductCartWidget businessId={business.id} businessSlug={slug} businessName={business.name} locale={locale} raised />
    </div>
  );
}
