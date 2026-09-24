import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { CustomersManager } from "@/components/customers-manager";

export default async function BusinessCustomersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const t = await getTranslations("customers");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.customers) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const bookings = await prisma.booking.findMany({
    where: { businessId: business.id },
    select: {
      startsAt: true,
      priceCents: true,
      currency: true,
      status: true,
      customer: { select: { id: true, name: true, email: true, phone: true } },
    },
    orderBy: { startsAt: "desc" },
  });

  const byCustomer = new Map<
    string,
    {
      id: string;
      name: string;
      email: string;
      phone: string | null;
      visits: number;
      spentCents: number;
      currency: string;
      lastVisit: string;
    }
  >();

  for (const b of bookings) {
    const existing = byCustomer.get(b.customer.id);
    const spent = b.status === "COMPLETED" ? b.priceCents : 0;
    if (existing) {
      existing.visits += 1;
      existing.spentCents += spent;
    } else {
      byCustomer.set(b.customer.id, {
        id: b.customer.id,
        name: b.customer.name,
        email: b.customer.email,
        phone: b.customer.phone,
        visits: 1,
        spentCents: spent,
        currency: b.currency,
        lastVisit: b.startsAt.toISOString(),
      });
    }
  }

  const customers = Array.from(byCustomer.values()).sort(
    (a, b) => new Date(b.lastVisit).getTime() - new Date(a.lastVisit).getTime()
  );

  return (
    <div>
      <h1 className="mb-1 text-xl font-bold text-ink-900">{t("title")}</h1>
      <p className="mb-4 text-sm text-ink-400">{t("subtitle")}</p>
      <CustomersManager customers={customers} locale={locale} />
    </div>
  );
}
