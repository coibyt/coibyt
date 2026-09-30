import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { MarketingComposer } from "@/components/marketing-composer";

export default async function MarketingDashboardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const t = await getTranslations("dashboard");

  const bookings = await prisma.booking.findMany({
    where: { businessId: owned.businessId },
    distinct: ["customerId"],
    select: { customer: { select: { email: true, marketingOptOut: true } } },
  });
  const recipientCount = bookings.filter(
    (b) => !b.customer.marketingOptOut && !b.customer.email.endsWith("@walkin.varaaai.com")
  ).length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-ink-900">{t("marketing.nav")}</h1>
        <p className="mt-1 text-sm text-ink-400">{t("marketing.subtitle")}</p>
      </div>
      <MarketingComposer initialRecipientCount={recipientCount} />
    </div>
  );
}
