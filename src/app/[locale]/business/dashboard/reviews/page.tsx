import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { redirect } from "@/i18n/navigation";
import { ReviewsManager } from "@/components/reviews-manager";
import { googleReviewUrlFor } from "@/lib/google-review";
import { siteSerif } from "@/lib/site-fonts";

export default async function BusinessReviewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const access = await getBusinessAccess();
  if (!access) return null;
  if (!access.isOwner && !access.permissions.reviews) {
    redirect({ href: "/business/dashboard", locale });
    return null;
  }
  const { business } = access;

  const reviews = await prisma.review.findMany({
    where: { businessId: business.id },
    include: {
      customer: { select: { name: true } },
      booking: { select: { startsAt: true, service: { select: { name: true } }, staff: { select: { id: true, name: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className={siteSerif.variable}>
      <ReviewsManager
        reviews={reviews.map((r) => ({
          id: r.id,
          rating: r.rating,
          comment: r.comment,
          ownerReply: r.ownerReply,
          customerName: r.customer.name,
          status: r.status,
          createdAt: r.createdAt.toISOString(),
          serviceName: r.booking.service.name,
          staffId: r.booking.staff?.id ?? null,
          staffName: r.booking.staff?.name ?? null,
        }))}
        locale={locale}
        googleUrl={googleReviewUrlFor(business)}
      />
    </div>
  );
}
