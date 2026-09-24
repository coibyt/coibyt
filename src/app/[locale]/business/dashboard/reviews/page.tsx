import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { OwnerReviewList } from "@/components/owner-review-list";

export default async function BusinessReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  const t = await getTranslations("business");
  if (!access) return null;
  if (!access.isOwner && !access.permissions.reviews) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const reviews = await prisma.review.findMany({
    where: { businessId: business.id },
    include: { customer: { select: { name: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-ink-900">{t("reviews")}</h1>
      <OwnerReviewList
        reviews={reviews.map((r) => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          ownerReply: r.ownerReply,
          customerName: r.customer.name,
        }))}
        locale={locale}
      />
    </div>
  );
}
