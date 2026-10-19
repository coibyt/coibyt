import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { button, emailLayout, esc, greeting, para } from "@/lib/email/ui";
import { localeForCountry } from "@/lib/countries";

/** Direct link to Google's own "write a review" composer for this salon, built
 * from its Place ID; a plain Maps URL is the fallback when no Place ID is
 * set. Null when the salon hasn't linked its Google listing at all. */
export function googleReviewUrlFor(business: { googlePlaceId: string | null; googleMapsUrl: string | null }) {
  if (business.googlePlaceId) {
    return `https://search.google.com/local/writereview?placeid=${encodeURIComponent(business.googlePlaceId)}`;
  }
  return business.googleMapsUrl || null;
}

// Neutral on purpose: it asks for the customer's honest experience, never
// for a good rating — Google's policy forbids steering who reviews or what
// they say.
const COPY = {
  vi: {
    subject: (b: string) => `Cảm ơn bạn đã đánh giá ${b}`,
    heading: "Cảm ơn bạn đã dành thời gian đánh giá!",
    hi: "Xin chào",
    body: (b: string) =>
      `${b} đã đọc đánh giá của bạn. Nếu có thêm chút thời gian, bạn có thể chia sẻ trải nghiệm của mình trên Google Maps — điều này giúp những khách hàng khác tìm hiểu về salon.`,
    cta: "Viết đánh giá trên Google",
    chat: (b: string, url: string) =>
      `Cảm ơn bạn đã đánh giá ${b}! Nếu có thêm chút thời gian, bạn có thể chia sẻ trải nghiệm của mình trên Google Maps tại đây: ${url}`,
  },
  en: {
    subject: (b: string) => `Thank you for reviewing ${b}`,
    heading: "Thank you for taking the time to leave a review!",
    hi: "Hi",
    body: (b: string) =>
      `${b} has read your review. If you have a moment, you can also share your experience on Google Maps — it helps other customers learn about the salon.`,
    cta: "Write a review on Google",
    chat: (b: string, url: string) =>
      `Thank you for reviewing ${b}! If you have a moment, you can also share your experience on Google Maps here: ${url}`,
  },
  fi: {
    subject: (b: string) => `Kiitos arvostelustasi – ${b}`,
    heading: "Kiitos, että käytit aikaa arvosteluun!",
    hi: "Hei",
    body: (b: string) =>
      `${b} on lukenut arvostelusi. Jos sinulla on hetki aikaa, voit jakaa kokemuksesi myös Google Mapsissa – se auttaa muita asiakkaita tutustumaan salonkiin.`,
    cta: "Kirjoita arvostelu Googleen",
    chat: (b: string, url: string) =>
      `Kiitos arvostelustasi, ${b} kiittää! Jos sinulla on hetki aikaa, voit jakaa kokemuksesi myös Google Mapsissa: ${url}`,
  },
};


/** Asks a reviewer to also post on Google, by email and by a message in their
 * VaraaAi chat with the salon. Sent at most once per review: the
 * googleRequestSentAt claim is taken atomically first, and released again
 * only if neither channel got through, so a later status change can retry.
 * Does nothing when the salon hasn't linked its Google listing. */
export async function sendGoogleReviewRequest(reviewId: string) {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
    select: {
      id: true,
      googleRequestSentAt: true,
      customer: { select: { id: true, name: true, email: true, isGuest: true } },
      business: {
        select: {
          id: true,
          name: true,
          country: true,
          googlePlaceId: true,
          googleMapsUrl: true,
          logoUrl: true,
          ownerId: true,
        },
      },
    },
  });
  if (!review || review.googleRequestSentAt) return;
  const url = googleReviewUrlFor(review.business);
  if (!url) return;

  const claimed = await prisma.review.updateMany({
    where: { id: reviewId, googleRequestSentAt: null },
    data: { googleRequestSentAt: new Date() },
  });
  if (claimed.count === 0) return;

  const locale = localeForCountry(review.business.country);
  const t = COPY[locale as keyof typeof COPY] ?? COPY.en;
  const businessName = review.business.name;
  let delivered = false;

  if (!review.customer.isGuest) {
    try {
      await sendMail({
        to: review.customer.email,
        subject: t.subject(businessName),
        html: emailLayout({
          locale,
          preheader: t.body(businessName),
          brand: { name: businessName, logoUrl: review.business.logoUrl },
          hero: { eyebrow: "Google", title: t.heading, tone: "gold", badge: "★" },
          body: [
            greeting(t.hi, review.customer.name),
            para(esc(t.body(businessName))),
            button(url, t.cta, { variant: "gold" }),
          ].join(""),
        }),
      });
      delivered = true;
    } catch (err) {
      console.error("[google-review-request email]", err);
    }
  }

  try {
    const conversation = await prisma.conversation.upsert({
      where: { businessId_customerId: { businessId: review.business.id, customerId: review.customer.id } },
      create: { businessId: review.business.id, customerId: review.customer.id },
      update: {},
      select: { id: true },
    });
    await prisma.$transaction([
      prisma.message.create({
        data: {
          conversationId: conversation.id,
          senderType: "BUSINESS",
          senderId: review.business.ownerId,
          content: t.chat(businessName, url),
        },
      }),
      prisma.conversation.update({ where: { id: conversation.id }, data: { updatedAt: new Date() } }),
    ]);
    delivered = true;
  } catch (err) {
    console.error("[google-review-request chat]", err);
  }

  if (!delivered) {
    await prisma.review.update({ where: { id: reviewId }, data: { googleRequestSentAt: null } });
  }
}
