import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { AddOnsManager } from "@/components/addons-manager";

export default async function ServiceAddOnsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const tDash = await getTranslations("dashboard");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.services) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const addOns = await prisma.serviceAddOn.findMany({
    where: { businessId: business.id, active: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-ink-900">{tDash("addOnsPage.title")}</h1>
      </div>
      <AddOnsManager
        initialAddOns={addOns.map((a) => ({
          id: a.id,
          name: a.name,
          priceCents: a.priceCents,
          durationMin: a.durationMin,
        }))}
        locale={locale}
        defaultCurrency={business.defaultCurrency}
      />
    </div>
  );
}
