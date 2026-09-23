import { getOwnedBusiness } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { getTranslations } from "next-intl/server";
import { HoursEditor } from "@/components/hours-editor";

export default async function HoursPage() {
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");
  if (!business) return null;

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
