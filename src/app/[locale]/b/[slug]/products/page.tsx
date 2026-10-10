import { notFound } from "next/navigation";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Eye, Star } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { ProductAddToCartButton } from "@/components/product-add-to-cart-button";
import { ProductCartWidget } from "@/components/product-cart-widget";

export default async function BusinessProductsPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const t = await getTranslations("business");
  const tProducts = await getTranslations("business.productsPage");

  const business = await prisma.business.findUnique({
    where: { slug },
    select: { id: true, name: true, status: true },
  });
  if (!business || business.status !== "APPROVED") notFound();

  const [products, groups] = await Promise.all([
    prisma.product.findMany({
      where: { businessId: business.id, active: true },
      include: {
        images: { select: { id: true }, orderBy: { sortOrder: "asc" }, take: 1 },
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.productGroup.findMany({
      where: { businessId: business.id },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
  ]);

  const groupIdSet = new Set(groups.map((g) => g.id));
  const ungrouped = products.filter((p) => !p.groupId || !groupIdSet.has(p.groupId));

  function renderCard(p: (typeof products)[number]) {
    const imageId = p.images[0]?.id ?? null;
    return (
      <div key={p.id} className="card flex flex-col overflow-hidden p-0">
        <Link href={`/b/${slug}/products/${p.id}`} className="block">
          <div className="aspect-square w-full bg-mist-100">
            {imageId && (
              <Image
                src={`/api/product-image/${imageId}`}
                alt={p.name}
                width={300}
                height={300}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </Link>
        <div className="flex flex-1 flex-col gap-1 p-3">
          <Link href={`/b/${slug}/products/${p.id}`} className="font-medium text-ink-900 hover:underline">
            {p.name}
          </Link>
          <p className="font-semibold text-primary-600">{formatMoney(p.priceCents, p.currency, locale)}</p>
          <p className="flex items-center gap-3 text-xs text-ink-400">
            <span className="flex items-center gap-0.5">
              <Eye className="h-3 w-3" /> {p.viewCount}
            </span>
            <span className="flex items-center gap-0.5">
              <Star className="h-3 w-3" /> {p._count.reviews}
            </span>
          </p>
          <ProductAddToCartButton
            businessSlug={slug}
            product={{ id: p.id, name: p.name, priceCents: p.priceCents, currency: p.currency, imageId }}
            className="btn-outline mt-1 w-full !py-1.5 text-xs"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-10">
      <h1 className="mb-6 text-xl font-bold text-ink-900">{t("products")}</h1>

      {products.length === 0 ? (
        <p className="text-sm text-ink-400">{tProducts("empty")}</p>
      ) : (
        <div className="space-y-8">
          {groups.map((g) => {
            const items = products.filter((p) => p.groupId === g.id);
            if (items.length === 0) return null;
            return (
              <section key={g.id}>
                <h2 className="mb-3 font-bold text-ink-900">{g.name}</h2>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {items.map(renderCard)}
                </div>
              </section>
            );
          })}
          {ungrouped.length > 0 && (
            <section>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {ungrouped.map(renderCard)}
              </div>
            </section>
          )}
        </div>
      )}

      <ProductCartWidget
        businessId={business.id}
        businessSlug={slug}
        businessName={business.name}
        locale={locale}
      />
    </div>
  );
}
