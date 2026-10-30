import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { getBusinessAccess, listOwnedBusinesses } from "@/lib/current-business";
import { BranchSwitcher } from "@/components/branch-switcher";
import { staffBranches } from "@/lib/staff-branches";
import { ownerSupportUnreadCount } from "@/lib/support";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { PendingBanner } from "@/components/pending-banner";
import { DashboardBody } from "@/components/dashboard-body";
import { DashboardSupportWidget } from "@/components/dashboard-support-widget";
import { BookingAlarm } from "@/components/booking-alarm";
import { incomeStrings } from "@/lib/income-strings";
import { IncomeReminderAlarm } from "@/components/income-reminder-alarm";

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

  const { business, isOwner, permissions, viewOnlyEverywhere } = access;
  // A "view all pages, read-only" staff member sees these links too — Staff
  // management, Settings and Support stay owner-only regardless (see
  // requireOwnerOrReadOnlyViewer).
  const canViewReadOnlyPages = isOwner || viewOnlyEverywhere;

  const session = await auth();
  // Owners switch between their branches; staff between the branches they
  // work at (Staff.branchGroup).
  const branches = !session?.user
    ? []
    : isOwner
      ? (await listOwnedBusinesses(session.user.id)).map((b) => ({ id: b.id, name: b.name }))
      : await staffBranches(session.user.id);
  const switcher =
    branches.length > 1 ? (
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
        {switcher && <div className="mb-4">{switcher}</div>}
        <PendingBanner status={business.status} emailVerified={!!user?.emailVerified} />
      </div>
    );
  }

  const links = [
    { href: "/business/dashboard", label: t("overview") },
    ...(isOwner || permissions.services
      ? [{ href: "/business/dashboard/services", label: t("services") }]
      : []),
    ...(isOwner || permissions.products
      ? [{ href: "/business/dashboard/products", label: t("products") }]
      : []),
    ...(isOwner || permissions.products
      ? [{ href: "/business/dashboard/orders", label: tDash("ordersPage.nav") }]
      : []),
    ...(isOwner ? [{ href: "/business/dashboard/staff", label: t("staff") }] : []),
    ...(canViewReadOnlyPages ? [{ href: "/business/dashboard/fanpage", label: t("fanpage") }] : []),
    ...(canViewReadOnlyPages ? [{ href: "/business/dashboard/landing", label: tDash("landing.nav") }] : []),
    ...(canViewReadOnlyPages ? [{ href: "/business/dashboard/marketing", label: tDash("marketing.nav") }] : []),
    ...(canViewReadOnlyPages ? [{ href: "/business/dashboard/gift-cards", label: tDash("giftCards.nav") }] : []),
    // Staff who work with bookings scan loyalty cards and issue new ones.
    ...(canViewReadOnlyPages || permissions.bookings
      ? [{ href: "/business/dashboard/loyalty", label: tDash("loyalty.nav") }]
      : []),
    ...(isOwner || permissions.bookings
      ? [{ href: "/business/dashboard/bookings", label: t("bookings") }]
      : []),
    // Income reports: the owner approves everyone's, staff see their own.
    ...(isOwner
      ? [
          {
            href: "/business/dashboard/income",
            label: incomeStrings(locale).ownerEyebrow,
            badge: await prisma.staffIncomeReport.count({ where: { businessId: business.id, status: "PENDING" } }),
          },
        ]
      : access.staffId
        ? [
            {
              href: "/business/dashboard/income",
              label: incomeStrings(locale).staffEyebrow,
              // Reports the owner sent back for fixing.
              badge: await prisma.staffIncomeReport.count({ where: { staffId: access.staffId, status: "REJECTED" } }),
            },
          ]
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
    <div className="container grid grid-cols-1 gap-6 py-10 md:grid-cols-[180px_1fr]">
      <DashboardSidebar links={links} title={t("dashboardTitle")} />
      <DashboardBody switcher={switcher}>{children}</DashboardBody>
      {/* Owners and staff alike: support chat and the same-day booking alarm. */}
      <DashboardSupportWidget locale={locale} />
      <BookingAlarm locale={locale} />
      {/* Staff with bookings not reported 24 hours after they ended, when the
          owner has income report reminders on. */}
      {!isOwner && access.staffId && business.incomeRemindersSince && <IncomeReminderAlarm locale={locale} />}
    </div>
  );
}
