import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { BusinessApplyForm } from "@/components/business-apply-form";
import { PendingBanner } from "@/components/pending-banner";

export default async function BusinessApplyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const session = await auth();
  const t = await getTranslations("business");

  if (session?.user) {
    const existing = await prisma.business.findUnique({
      where: { ownerId: session.user.id },
    });
    if (existing) {
      if (existing.status === "APPROVED") redirect({ href: "/business/dashboard", locale });
      return (
        <div className="container max-w-lg py-16">
          <PendingBanner status={existing.status} />
        </div>
      );
    }
  }

  const categories = await prisma.category.findMany();

  return (
    <div className="container max-w-lg py-16">
      <h1 className="mb-1 text-2xl font-bold text-ink-900">{t("applyTitle")}</h1>
      <p className="mb-6 text-sm text-ink-400">{t("applySubtitle")}</p>
      <BusinessApplyForm
        categories={categories.map((c) => ({
          id: c.id,
          name: locale === "vi" ? c.nameVi : c.nameEn,
        }))}
        isAuthenticated={!!session?.user}
      />
    </div>
  );
}
