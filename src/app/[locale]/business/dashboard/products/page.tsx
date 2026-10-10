import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { ProductsManager } from "@/components/products-manager";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const t = await getTranslations("business");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.products) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const [products, groups] = await Promise.all([
    prisma.product.findMany({
      where: { businessId: business.id, active: true },
      include: {
        images: { select: { id: true }, orderBy: { sortOrder: "asc" } },
        _count: { select: { reviews: true } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.productGroup.findMany({
      where: { businessId: business.id },
      orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
    }),
  ]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">{t("products")}</h1>
      </div>
      <ProductsManager
        initialProducts={products.map((p) => ({
          ...p,
          imageIds: p.images.map((i) => i.id),
          reviewCount: p._count.reviews,
        }))}
        groups={groups.map((g) => ({ id: g.id, name: g.name }))}
        locale={locale}
        defaultCurrency={business.defaultCurrency}
      />
    </div>
  );
}
