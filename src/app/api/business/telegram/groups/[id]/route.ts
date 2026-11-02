import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { TELEGRAM_LOCALES } from "@/lib/telegram";

/** What one linked Telegram group gets: income reminders, today's new
 * bookings, which staff, this branch or all the owner's branches. */
const schema = z.object({
  notifyIncome: z.boolean().optional(),
  notifyBookings: z.boolean().optional(),
  allBranches: z.boolean().optional(),
  // null or [] = every staff member.
  staffIds: z.array(z.string().cuid()).max(200).nullable().optional(),
  // The language the bot posts in here; null = the salon's default.
  locale: z.enum(TELEGRAM_LOCALES).nullable().optional(),
});

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const group = await prisma.telegramGroup.findFirst({ where: { id, businessId: owned.businessId }, select: { business: { select: { ownerId: true } } } });
  if (!group) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const { staffIds, ...flags } = parsed.data;
  let staff: string[] | null | undefined = staffIds;
  if (staffIds?.length) {
    // Only staff at this owner's branches.
    const ok = await prisma.staff.findMany({ where: { id: { in: staffIds }, business: { ownerId: group.business.ownerId } }, select: { id: true } });
    staff = ok.map((s) => s.id);
  }
  const updated = await prisma.telegramGroup.update({
    where: { id },
    // An empty choice means everyone: stored as NULL.
    data: { ...flags, ...(staff !== undefined ? { staffIds: staff?.length ? staff : Prisma.DbNull } : {}) },
    select: { id: true, title: true, notifyIncome: true, notifyBookings: true, allBranches: true, staffIds: true, locale: true },
  });
  return NextResponse.json({ group: updated });
}
