import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { OrdersManager } from "@/components/orders-manager";
import { siteSerif } from "@/lib/site-fonts";

export default async function OrdersPage({
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
  // Staff only see customers' phone numbers and emails when they're allowed to.
  const showContact = access.canViewCustomerContactInfo;

  const orders = await prisma.order.findMany({
    where: { businessId: business.id },
    include: {
      items: { include: { product: { select: { images: { orderBy: { sortOrder: "asc" }, take: 1, select: { id: true } } } } } },
      customer: { select: { name: true, email: true, phone: true, isGuest: true, guestContactEmail: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className={siteSerif.variable}>
      <OrdersManager
        salonName={business.name}
        initialOrders={orders.map((o) => ({
          id: o.id,
          status: o.status,
          paymentMethod: o.paymentMethod,
          totalCents: o.totalCents,
          currency: o.currency,
          customerNote: o.customerNote,
          createdAt: o.createdAt.toISOString(),
          items: o.items.map((it) => ({
            id: it.id,
            name: it.name,
            unitPriceCents: it.unitPriceCents,
            qty: it.qty,
            totalCents: it.totalCents,
            productId: it.productId,
            imageId: it.product?.images[0]?.id ?? null,
          })),
          customer: {
            name: o.customer.name,
            email: showContact ? (o.customer.isGuest ? o.customer.guestContactEmail : o.customer.email) : null,
            phone: showContact ? o.customer.phone : null,
          },
        }))}
        locale={locale}
      />
    </div>
  );
}
