/**
 * Remembers, for a few minutes, who typed in a booking by hand, so that person is not alarmed about
 * their own entry (only the staff member the booking was made for is). Kept in memory because it only
 * matters for the seconds right after the booking is created.
 */
const g = globalThis as unknown as { __bookingCreators?: Map<string, { userId: string; at: number }> };
const creators = (g.__bookingCreators ??= new Map());
const KEEP_MS = 30 * 60 * 1000;

export function rememberBookingCreator(bookingId: string, userId: string) {
  const now = Date.now();
  creators.set(bookingId, { userId, at: now });
  if (creators.size > 500) for (const [k, v] of creators) if (now - v.at > KEEP_MS) creators.delete(k);
}

export const bookingCreator = (bookingId: string) => creators.get(bookingId)?.userId ?? null;
