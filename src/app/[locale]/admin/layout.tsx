import { auth } from "@/auth";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { DashboardSidebar } from "@/components/dashboard-sidebar";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  const t = await getTranslations("admin");

  if (session?.user?.role !== "ADMIN") redirect({ href: "/", locale });

  const links = [
    { href: "/admin", label: t("pendingBusinesses") },
    { href: "/admin/businesses", label: t("allBusinesses") },
    { href: "/admin/categories", label: t("categories") },
  ];

  return (
    <div className="container grid grid-cols-1 gap-8 py-10 md:grid-cols-[220px_1fr]">
      <DashboardSidebar links={links} title={t("title")} />
      <div>{children}</div>
    </div>
  );
}
