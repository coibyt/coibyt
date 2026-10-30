import { prisma } from "@/lib/prisma";
import { sendMail, ownerReviewedYouEmail } from "@/lib/mailer";
import { localeForCountry } from "@/lib/countries";

/** Tells the customer how the salon rated their visit — once the rating is
 * approved. Best-effort: a mail failure (e.g. SMTP misconfigured) must never
 * make the rating itself look like it failed to save when it already has. */
export async function emailCustomerReview(reviewId: string) {
  try {
    const review = await prisma.customerReview.findUnique({
      where: { id: reviewId },
      include: { business: true, customer: true },
    });
    if (!review || review.status !== "APPROVED") return;
    const email = ownerReviewedYouEmail({
      customerName: review.customer.name,
      businessName: review.business.name,
      rating: review.rating,
      locale: localeForCountry(review.business.country),
      businessLogoUrl: review.business.logoUrl,
    });
    await sendMail({ to: review.customer.email, ...email });
  } catch (err) {
    console.error("[emailCustomerReview] mail failed", err);
  }
}
