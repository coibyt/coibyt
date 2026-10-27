import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { HoursEditor } from "@/components/hours-editor";
import { siteSerif } from "@/lib/site-fonts";

export default async function HoursPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access) return null;
  if (!access.isOwner && !access.permissions.hours) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const hours = await prisma.businessHours.findMany({ where: { businessId: business.id } });

  return (
    <div className={siteSerif.variable}>
      <HoursEditor
        initialHours={hours.map((h) => ({
          weekday: h.weekday,
          openMinute: h.openMinute,
          closeMinute: h.closeMinute,
        }))}
        locale={locale}
        timezone={business.timezone}
        country={business.country}
        // Saving needs the "hours" permission (the owner always has it).
        canEdit={access.isOwner || access.permissions.hours}
      />
    </div>
  );
}
