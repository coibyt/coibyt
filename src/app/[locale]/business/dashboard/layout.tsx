import { getOwnedBusiness } from "@/lib/current-business";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { PendingBanner } from "@/components/pending-banner";

export default async function BusinessDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const business = await getOwnedBusiness();
  const t = await getTranslations("business");

  if (!business) {
    redirect({ href: "/business/apply", locale });
    return;
  }

  if (business.status !== "APPROVED") {
    return (
      <div className="container max-w-lg py-16">
        <PendingBanner status={business.status} />
      </div>
    );
  }

  const links = [
    { href: "/business/dashboard", label: t("overview") },
    { href: "/business/dashboard/services", label: t("services") },
    { href: "/business/dashboard/staff", label: t("staff") },
    { href: "/business/dashboard/bookings", label: t("bookings") },
    { href: "/business/dashboard/customers", label: t("customers") },
    { href: "/business/dashboard/hours", label: t("hours") },
    { href: "/business/dashboard/reviews", label: t("reviews") },
  ];

  return (
    <div className="container grid grid-cols-1 gap-8 py-10 md:grid-cols-[220px_1fr]">
      <DashboardSidebar links={links} title={t("dashboardTitle")} />
      <div>{children}</div>
    </div>
  );
}
