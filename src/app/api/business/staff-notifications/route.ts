import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

/** The owner's switches for staff: booking emails, and the same-day booking
 * alarm on every staff device at once. */
const schema = z.object({
  staffBookingEmails: z.boolean().optional(),
  staffAlarmOn: z.boolean().optional(),
});

export async function PATCH(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { staffBookingEmails, staffAlarmOn } = parsed.data;
  const b = await prisma.business.update({
    where: { id: owned.businessId },
    data: {
      staffBookingEmails,
      // Each flip of the alarm switch applies to every staff device again.
      ...(staffAlarmOn !== undefined ? { staffAlarmOn, staffAlarmChangedAt: new Date() } : {}),
    },
    select: { staffBookingEmails: true, staffAlarmOn: true },
  });
  return NextResponse.json(b);
}
