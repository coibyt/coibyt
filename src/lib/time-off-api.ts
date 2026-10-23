import { z } from "zod";
import { bookingStaffScope, getBusinessAccess } from "@/lib/current-business";
import { PERSONAL_TIME_KINDS } from "@/lib/personal-time";

// Up to a month in one block (a long vacation or sick leave).
const MAX_MS = 31 * 24 * 60 * 60 * 1000;

export const timeOffSchema = z
  .object({
    staffId: z.string().cuid(),
    kind: z.enum(PERSONAL_TIME_KINDS),
    startsAt: z.string().datetime(),
    endsAt: z.string().datetime(),
    note: z.string().max(500).optional(),
  })
  .refine((d) => new Date(d.endsAt) > new Date(d.startsAt), { message: "INVALID_TIME_RANGE" })
  .refine((d) => new Date(d.endsAt).getTime() - new Date(d.startsAt).getTime() <= MAX_MS, { message: "TOO_LONG" });

/** Who may block personal time: the owner, or staff with the bookings
 * section — and staff limited to their own calendar only for themselves. */
export async function timeOffAccess() {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) return null;
  return { businessId: access.business.id, scopeStaffId: bookingStaffScope(access), timezone: access.business.timezone };
}
