import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { loyaltyTicketEmail } from "@/lib/email/loyalty-ticket-email";
import { SITE_URL } from "@/lib/email/ui";

/** Emails the card holder that tickets were just added — by a scan at the
 * salon, or a friend's first visit — with where the card stands now. Never
 * throws: a failed email must not undo or block the ticket itself. */
export async function notifyTicketsAdded(input: {
  cardId: string;
  kind: "scan" | "referral";
  ticketsAdded: number;
  friendName?: string | null;
}) {
  try {
    const card = await prisma.loyaltyCard.findUnique({
      where: { id: input.cardId },
      include: { business: { select: { name: true, slug: true, logoUrl: true, city: true, defaultLocale: true } } },
    });
    if (!card) return;
    const program = await prisma.loyaltyProgram.findUnique({ where: { businessId: card.businessId } });
    if (!program) return;
    const { business } = card;
    const mail = loyaltyTicketEmail({
      locale: business.defaultLocale,
      kind: input.kind,
      salon: { name: business.name, logoUrl: business.logoUrl, city: business.city },
      customerName: card.customerName,
      friendName: input.friendName,
      ticketsAdded: input.ticketsAdded,
      points: card.points,
      pointsRequired: program.pointsRequired,
      discountPercent: program.discountPercent,
      rewardReady: card.rewardReady,
      cardUrl: `${SITE_URL}/loyalty/${encodeURIComponent(card.token)}`,
      bookUrl: `${SITE_URL}/b/${business.slug}`,
    });
    await sendMail({ to: card.customerEmail, subject: mail.subject, html: mail.html });
  } catch (err) {
    console.error("[notifyTicketsAdded]", input.cardId, err);
  }
}
