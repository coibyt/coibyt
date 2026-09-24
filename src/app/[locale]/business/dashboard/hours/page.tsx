import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { HoursEditor } from "@/components/hours-editor";

export default async function HoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const t = await getTranslations("business");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.hours) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const hours = await prisma.businessHours.findMany({ where: { businessId: business.id } });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("hours")}</h1>
      <HoursEditor
        initialHours={hours.map((h) => ({
          weekday: h.weekday,
          openMinute: h.openMinute,
          closeMinute: h.closeMinute,
        }))}
      />
    </div>
  );
}
