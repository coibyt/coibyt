import { redirect } from "@/i18n/navigation";
import { incomeAccess } from "@/lib/income";
import { prisma } from "@/lib/prisma";
import { siteSerif } from "@/lib/site-fonts";
import { IncomeManager } from "@/components/income-manager";

/** Doanh thu: the owner reviews and approves every staff member's income
 * reports; a staff member with a login sees their own. */
export default async function IncomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const access = await incomeAccess();
  if (!access) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const staff = access.isOwner
    ? await prisma.staff.findMany({ where: { businessId: access.business.id }, select: { id: true, name: true }, orderBy: { name: "asc" } })
    : [];

  return (
    <div className={siteSerif.variable}>
      <IncomeManager
        locale={locale}
        isOwner={access.isOwner}
        timezone={access.business.timezone}
        currency={access.business.defaultCurrency}
        staff={staff}
      />
    </div>
  );
}
