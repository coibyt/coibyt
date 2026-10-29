import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const schema = z.object({ reminders: z.boolean() });

/** The owner turns income report reminders for staff on or off. Turning them
 * on also chases unreported bookings from the past week, not months back. */
const CATCH_UP_MS = 7 * 24 * 60 * 60 * 1000;

export async function PATCH(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const current = await prisma.business.findUniqueOrThrow({ where: { id: owned.businessId }, select: { incomeRemindersSince: true } });
  const since = parsed.data.reminders ? (current.incomeRemindersSince ?? new Date(Date.now() - CATCH_UP_MS)) : null;
  await prisma.business.update({ where: { id: owned.businessId }, data: { incomeRemindersSince: since } });
  return NextResponse.json({ reminders: !!since, since: since?.toISOString() ?? null });
}
