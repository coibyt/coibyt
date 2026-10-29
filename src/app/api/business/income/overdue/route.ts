import { NextResponse } from "next/server";
import { incomeAccess } from "@/lib/income";
import { overdueBookings } from "@/lib/income-reminders";

const LOOKBACK_MS = 14 * 24 * 60 * 60 * 1000;

/** Bookings that ended over 24 hours ago without an income report — a staff
 * member's own, or every staff member's for the owner — and whether the owner
 * has reminders on (the staff alarm only rings when they are). */
export async function GET() {
  const access = await incomeAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const since = access.business.incomeRemindersSince;
  const bookings = await overdueBookings(
    access.business.id,
    since ?? new Date(Date.now() - LOOKBACK_MS),
    access.isOwner ? undefined : access.staffId
  );
  return NextResponse.json({ enabled: !!since, bookings });
}
