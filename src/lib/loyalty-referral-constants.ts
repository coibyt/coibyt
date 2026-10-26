// Client-safe referral constants (loyalty-referral.ts pulls in Prisma).

/** Tickets a customer gets when a friend they invited has visited. */
export const REFERRAL_TICKETS = 2;

/** Remembers which invite link brought a visitor to a salon, until they
 * book there (read by POST /api/bookings). */
export const referralCookieName = (businessId: string) => `varaaai_ref_${businessId}`;
export const REFERRAL_COOKIE_DAYS = 60;
