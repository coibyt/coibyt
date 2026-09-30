import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBusinessAccess, listOwnedBusinesses } from "@/lib/current-business";
import { BranchSwitcher } from "@/components/branch-switcher";
import { ownerSupportUnreadCount } from "@/lib/support";
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
  const tSupport = await getTranslations("support");
  const tDash = await getTranslations("dashboard");

  if (!access) {
    redirect({ href: "/business/apply", locale });
    return;
  }

  const { business, isOwner, permissions } = access;

  const session = await auth();
  const branches =
    isOwner && session?.user
      ? (await listOwnedBusinesses(session.user.id)).map((b) => ({ id: b.id, name: b.name }))
      : [];
  const switcher = isOwner ? (
    <BranchSwitcher branches={branches} activeId={business.id} locale={locale} />
  ) : null;

  if (business.status !== "APPROVED") {
    const user = session?.user
      ? await prisma.user.findUnique({
          where: { id: session.user.id },
          select: { emailVerified: true },
        })
      : null;
    return (
      <div className="container max-w-lg py-16">
        {switcher}
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
    ...(isOwner ? [{ href: "/business/dashboard/fanpage", label: t("fanpage") }] : []),
    ...(isOwner ? [{ href: "/business/dashboard/landing", label: tDash("landing.nav") }] : []),
    ...(isOwner ? [{ href: "/business/dashboard/marketing", label: tDash("marketing.nav") }] : []),
    ...(isOwner || permissions.bookings
      ? [{ href: "/business/dashboard/bookings", label: t("bookings") }]
      : []),
    ...(isOwner || permissions.customers
      ? [{ href: "/business/dashboard/customers", label: t("customers") }]
      : []),
    ...(isOwner || permissions.customers
      ? [{ href: "/business/dashboard/messages", label: t("messages") }]
      : []),
    ...(isOwner || permissions.hours
      ? [{ href: "/business/dashboard/hours", label: t("hours") }]
      : []),
    ...(isOwner || permissions.reviews
      ? [{ href: "/business/dashboard/reviews", label: t("reviews") }]
      : []),
    ...(isOwner ? [{ href: "/business/dashboard/settings", label: t("settings") }] : []),
    ...(isOwner
      ? [
          {
            href: "/business/dashboard/support",
            label: tSupport("nav"),
            badge: session?.user ? await ownerSupportUnreadCount(session.user.id) : 0,
          },
        ]
      : []),
  ];

  return (
    <div className="container grid grid-cols-1 gap-8 py-10 md:grid-cols-[220px_1fr]">
      <DashboardSidebar links={links} title={t("dashboardTitle")} />
      <div>
        {switcher}
        {children}
      </div>
    </div>
  );
}
