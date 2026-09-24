import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBusinessAccess } from "@/lib/current-business";
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
  const access = await getBusinessAccess();
  const t = await getTranslations("business");

  if (!access) {
    redirect({ href: "/business/apply", locale });
    return;
  }

  const { business, isOwner, permissions } = access;

  if (business.status !== "APPROVED") {
    const session = await auth();
    const user = session?.user
      ? await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { emailVerified: true },
        })
      : null;
    return (
      <div className="container max-w-lg py-16">
        <PendingBanner status={business.status} emailVerified={!!user?.emailVerified} />
      </div>
    );
  }

  const links = [
    { href: "/business/dashboard", label: t("overview") },
    ...(isOwner || permissions.services
      ? [{ href: "/business/dashboard/services", label: t("services") }]
      : []),
    ...(isOwner ? [{ href: "/business/dashboard/staff", label: t("staff") }] : []),
    ...(isOwner || permissions.bookings
      ? [{ href: "/business/dashboard/bookings", label: t("bookings") }]
      : []),
    ...(isOwner || permissions.customers
      ? [{ href: "/business/dashboard/customers", label: t("customers") }]
      : []),
    ...(isOwner || permissions.hours
      ? [{ href: "/business/dashboard/hours", label: t("hours") }]
      : []),
    ...(isOwner || permissions.reviews
      ? [{ href: "/business/dashboard/reviews", label: t("reviews") }]
      : []),
    ...(isOwner ? [{ href: "/business/dashboard/settings", label: t("settings") }] : []),
  ];

  return (
    <div className="container grid grid-cols-1 gap-8 py-10 md:grid-cols-[220px_1fr]">
      <DashboardSidebar links={links} title={t("dashboardTitle")} />
      <div>{children}</div>
    </div>
  );
}
