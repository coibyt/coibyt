import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  reminders: z.boolean().optional(),
  // The salon-local day staff must report every booking from; null clears it.
  reportsFrom: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).nullable().optional(),
});

/** The owner turns income report reminders for staff on or off, and picks
 * the day from which staff must report. Turning reminders on also chases
 * unreported bookings from the past week, not months back. */
const CATCH_UP_MS = 7 * 24 * 60 * 60 * 1000;

export async function PATCH(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { reminders, reportsFrom } = parsed.data;
  if (reportsFrom && Number.isNaN(Date.parse(`${reportsFrom}T00:00:00Z`))) {
    return NextResponse.json({ error: "INVALID" }, { status: 400 });
  }

  const current = await prisma.business.findUniqueOrThrow({
    where: { id: owned.businessId },
    select: { incomeRemindersSince: true, incomeReportsFrom: true },
  });
  const since =
    reminders === undefined
      ? current.incomeRemindersSince
      : reminders
        ? (current.incomeRemindersSince ?? new Date(Date.now() - CATCH_UP_MS))
        : null;
  const from = reportsFrom === undefined ? current.incomeReportsFrom : reportsFrom ? new Date(`${reportsFrom}T00:00:00Z`) : null;
  await prisma.business.update({ where: { id: owned.businessId }, data: { incomeRemindersSince: since, incomeReportsFrom: from } });
  return NextResponse.json({
    reminders: !!since,
    since: since?.toISOString() ?? null,
    reportsFrom: from ? from.toISOString().slice(0, 10) : null,
  });
}
