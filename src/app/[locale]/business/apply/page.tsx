import { Suspense } from "react";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { BusinessApplyForm } from "@/components/business-apply-form";
import { PendingBanner } from "@/components/pending-banner";
import { PlatformAffiliateCookieSetter } from "@/components/platform-affiliate-cookie-setter";
import { categoryName } from "@/lib/category-names";

export default async function BusinessApplyPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ branch?: string }>;
}) {
  const { locale } = await params;
  const { branch } = await searchParams;
  const session = await auth();
  const t = await getTranslations("business");

  if (session?.user) {
    const [ownedBusinesses, user] = await Promise.all([
      prisma.business.findMany({ where: { ownerId: session.user.id }, orderBy: { createdAt: "asc" } }),
      prisma.user.findUnique({ where: { id: session.user.id }, select: { emailVerified: true } }),
    ]);
    const unapproved = ownedBusinesses.find((b) => b.status !== "APPROVED");
    if (unapproved) {
      return (
        <div className="container max-w-lg py-16">
          <PendingBanner status={unapproved.status} emailVerified={!!user?.emailVerified} />
        </div>
      );
    }
    // Owners with a live salon only see this form when adding another branch.
    if (ownedBusinesses.length > 0 && branch !== "1") {
      redirect({ href: "/business/dashboard", locale });
    }
  }

  const categories = await prisma.category.findMany();

  return (
    <div className="container max-w-lg py-16">
      <Suspense fallback={null}>
        <PlatformAffiliateCookieSetter />
      </Suspense>
      <h1 className="mb-1 text-2xl font-bold text-ink-900">{t("applyTitle")}</h1>
      <p className="mb-6 text-sm text-ink-400">{t("applySubtitle")}</p>
      <BusinessApplyForm
        categories={categories.map((c) => ({
          id: c.id,
          name: categoryName(locale, c),
        }))}
        isAuthenticated={!!session?.user}
      />
    </div>
  );
}
