// Client-safe income report helpers (lib/income.ts pulls in Prisma).

/** Quick choices for a gift card's discount; "other" lets staff type one. */
export const GIFT_DISCOUNTS = [0, 5, 10, 30, 50, 100];

/** What a gift card adds to the salon's income after its discount. */
export function giftNet(amountCents: number, pct: number) {
  return Math.round((amountCents * (100 - pct)) / 100);
}
