import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { OrdersManager } from "@/components/orders-manager";

export default async function OrdersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const tDash = await getTranslations("dashboard");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.products) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const orders = await prisma.order.findMany({
    where: { businessId: business.id },
    include: {
      items: true,
      customer: { select: { name: true, email: true, phone: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">{tDash("ordersPage.nav")}</h1>
      </div>
      <OrdersManager
        initialOrders={orders.map((o) => ({ ...o, createdAt: o.createdAt.toISOString() }))}
        locale={locale}
      />
    </div>
  );
}
