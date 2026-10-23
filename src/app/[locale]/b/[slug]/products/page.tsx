import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import { ChevronLeft, MessageCircleHeart, ShieldCheck, Store, Wallet } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { siteThemeStyle } from "@/lib/site-theme";
import { siteSerif } from "@/lib/site-fonts";
import { fill, shopStrings } from "@/lib/shop-strings";
import { getShopBusiness, getShopProducts } from "@/lib/shop-data";
import { ProductShop } from "@/components/product-shop";
import { ProductCartWidget } from "@/components/product-cart-widget";
import { absoluteUrl, alternatesFor, localizedUrl, metaDescription } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const business = await getShopBusiness(slug);
  if (!business) return {};
  const S = shopStrings(locale);
  const cover = await prisma.productImage.findFirst({
    where: { product: { businessId: business.id, active: true, hidden: false } },
    orderBy: [{ product: { sortOrder: "asc" } }, { sortOrder: "asc" }],
    select: { id: true },
  });
  const title = `${S.eyebrow} ${business.name} – ${S.heroTitle}`;
  const description = metaDescription(fill(S.heroText, { name: business.name }));
  const image = cover ? absoluteUrl(`/api/product-image/${cover.id}`) : absoluteUrl(business.logoUrl);
  return {
    title,
    description,
    alternates: alternatesFor(`/b/${slug}/products`, locale),
    openGraph: { type: "website", title, description, url: localizedUrl(locale, `/b/${slug}/products`), siteName: "VaraaAi", ...(image ? { images: [image] } : {}) },
  };
}

export default async function BusinessProductsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const S = shopStrings(locale);

  const business = await getShopBusiness(slug);
  if (!business) notFound();

  const [products, groups] = await Promise.all([
    getShopProducts(business.id),
    prisma.productGroup.findMany({
      where: { businessId: business.id },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
      select: { id: true, name: true },
    }),
  ]);

  const perks = [
    { icon: ShieldCheck, label: S.perkGenuine },
    { icon: Store, label: S.perkPickup },
    { icon: Wallet, label: S.perkPay },
    { icon: MessageCircleHeart, label: S.perkAdvice },
  ];

  return (
    <div style={siteThemeStyle(business.landingPage?.theme)} className={`${siteSerif.variable} bg-lp-bg text-lp-ink antialiased`}>
      <section className="relative overflow-hidden bg-lp-surface">
        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full bg-lp-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-lp-gold/20 blur-3xl" />
        <div className="container relative pb-14 pt-8 sm:pb-20 sm:pt-10">
          <Link
            href={`/b/${slug}`}
            className="inline-flex items-center gap-2 rounded-full bg-lp-card/70 py-1.5 pl-1.5 pr-4 text-sm font-medium text-lp-muted ring-1 ring-lp-line backdrop-blur transition-colors hover:text-lp-ink"
          >
            {business.logoUrl ? (
              <span className="relative h-7 w-7 overflow-hidden rounded-full ring-1 ring-lp-gold/40">
                <Image src={business.logoUrl} alt="" fill className="object-cover" />
              </span>
            ) : (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-lp-accent font-serif text-sm font-semibold text-lp-accent-ink">
                {business.name.charAt(0)}
              </span>
            )}
            <ChevronLeft className="h-4 w-4" />
            {business.name}
          </Link>

          <div className="mx-auto mt-10 max-w-3xl text-center sm:mt-14">
            <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-lp-gold">
              <span className="h-px w-8 bg-current opacity-60" />
              {S.eyebrow} · {business.name}
              <span className="h-px w-8 bg-current opacity-60" />
            </p>
            <h1 className="mt-5 font-serif text-[2.6rem] font-medium leading-[1.08] text-lp-ink sm:text-6xl">{S.heroTitle}</h1>
            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-lp-muted sm:text-lg">
              {fill(S.heroText, { name: business.name })}
            </p>
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
            {perks.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center justify-center gap-2 rounded-2xl bg-lp-card/70 px-3 py-3 text-center text-xs font-medium text-lp-ink ring-1 ring-lp-line backdrop-blur sm:text-[13px]"
              >
                <Icon className="h-4 w-4 shrink-0 text-lp-gold" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ProductShop products={products} groups={groups} slug={slug} locale={locale} />

      <ProductCartWidget businessId={business.id} businessSlug={slug} businessName={business.name} locale={locale} />
    </div>
  );
}
