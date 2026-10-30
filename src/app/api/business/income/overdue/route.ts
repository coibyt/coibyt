import { NextResponse } from "next/server";
import { incomeAccess } from "@/lib/income";
import { overdueBookings, reportsFromDay } from "@/lib/income-reminders";

/** Bookings that ended over 24 hours ago without an income report — a staff
 * member's own, or every staff member's for the owner — whether the owner
 * has reminders on (the staff alarm only rings when they are), and the day
 * staff must report from. */
export async function GET() {
  const access = await incomeAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const bookings = await overdueBookings(access.business, access.isOwner ? undefined : access.staffId);
  return NextResponse.json({
    enabled: !!access.business.incomeRemindersSince,
    reportsFrom: reportsFromDay(access.business),
    bookings,
  });
}
