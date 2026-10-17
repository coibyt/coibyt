// An AI chat reply can end with this token to attach a "book now" button
// that deep-links into the booking page with the service, date and time
// preselected. Stored inside the message text (no schema change) and turned
// into a button by ChatWidget; shared by server and client, so no imports.
const TOKEN_RE = /\[\[book:([^|\]\s]+)\|(\d{4}-\d{2}-\d{2})\|(\d{2}:\d{2})\]\]/g;

export interface BookingOffer {
  serviceId: string;
  date: string; // yyyy-MM-dd, in the salon's timezone
  time: string; // HH:mm, in the salon's timezone
}

export function formatBookingToken(offer: BookingOffer): string {
  return `[[book:${offer.serviceId}|${offer.date}|${offer.time}]]`;
}

/** Splits a message into its visible text and any booking offers in it. */
export function parseBookingTokens(content: string): { text: string; offers: BookingOffer[] } {
  const offers: BookingOffer[] = [];
  const text = content
    .replace(TOKEN_RE, (_, serviceId: string, date: string, time: string) => {
      offers.push({ serviceId, date, time });
      return "";
    })
    .trim();
  return { text, offers };
}
