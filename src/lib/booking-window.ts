/** How far ahead customers can book — a year, so someone booking in October
 * can pick November, December or a date next year. Shared by the booking
 * page's calendar and the AI chat's booking tools, so every date the AI
 * offers is one the customer can actually land on. */
export const BOOKING_DAYS_AHEAD = 365;
