import { NextResponse } from "next/server";
import { z } from "zod";
import { bookingActionScope, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { scheduleRebookReminder } from "@/lib/recurring";

const schema = z.object({ weeks: z.number().int().min(1).max(52).nullable() });

/** "Remind the customer to book again in N weeks" (null = remove) —
 * src/lib/recurring.ts sends it from the cron. */
export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const scopeStaffId = bookingActionScope(access);
  const booking = await prisma.booking.findFirst({
    where: { id, businessId: access.business.id, ...(scopeStaffId ? { staffId: scopeStaffId } : {}) },
    select: { id: true },
  });
  if (!booking) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const r = await scheduleRebookReminder(id, parsed.data.weeks);
  return NextResponse.json({ rebookReminderAt: r.rebookReminderAt?.toISOString() ?? null });
}
