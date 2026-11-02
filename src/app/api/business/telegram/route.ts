import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { botConfig, groupStaff, linkCode, sendTelegramNow } from "@/lib/telegram";

/** The owner's Telegram reminders: on/off, linked groups and staff
 * @usernames (src/lib/telegram.ts). */
async function state(businessId: string) {
  const [cfg, b, staff] = await Promise.all([
    botConfig(),
    prisma.business.findUniqueOrThrow({
      where: { id: businessId },
      select: {
        ownerId: true,
        telegramRemindersOn: true,
        telegramGroups: {
          select: { id: true, title: true, notifyIncome: true, notifyBookings: true, allBranches: true, staffIds: true },
          orderBy: { createdAt: "asc" },
        },
      },
    }),
    prisma.staff.findMany({ where: { businessId, active: true }, select: { id: true, name: true, telegramUsername: true }, orderBy: { name: "asc" } }),
  ]);
  const code = cfg ? await linkCode(businessId) : null;
  // Staff a group can be limited to: everyone at the owner's branches.
  const allStaff = await prisma.staff.findMany({
    where: { active: true, business: { ownerId: b.ownerId, status: "APPROVED" } },
    select: { id: true, name: true, businessId: true, business: { select: { name: true } } },
    orderBy: [{ business: { createdAt: "asc" } }, { name: "asc" }],
  });
  return {
    bot: cfg ? cfg.username : null,
    addUrl: cfg && code ? `https://t.me/${cfg.username}?startgroup=${code}` : null,
    command: code ? `/start ${code}` : null,
    on: b.telegramRemindersOn,
    groups: b.telegramGroups.map((g) => ({ ...g, staffIds: groupStaff(g) })),
    staff,
    allStaff: allStaff.map((s) => ({ id: s.id, name: s.name, branch: s.business.name, here: s.businessId === businessId })),
    branches: new Set(allStaff.map((s) => s.businessId)).size,
  };
}

export async function GET() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  return NextResponse.json(await state(owned.businessId));
}

const schema = z.object({
  on: z.boolean().optional(),
  staff: z
    .array(z.object({ id: z.string().cuid(), username: z.string().trim().max(64) }))
    .max(200)
    .optional(),
});

export async function PATCH(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { on, staff } = parsed.data;
  if (on !== undefined) await prisma.business.update({ where: { id: owned.businessId }, data: { telegramRemindersOn: on } });
  for (const s of staff ?? []) {
    // "@lisa_nails", "t.me/lisa_nails" or "lisa_nails" → lisa_nails
    const username = s.username.replace(/^(https?:\/\/)?(t\.me\/)?@?/i, "").trim();
    if (username && !/^[A-Za-z0-9_]{4,32}$/.test(username)) return NextResponse.json({ error: "BAD_USERNAME", id: s.id }, { status: 400 });
    await prisma.staff.updateMany({ where: { id: s.id, businessId: owned.businessId }, data: { telegramUsername: username || null } });
  }
  return NextResponse.json(await state(owned.businessId));
}

/** Send the reminder to every linked group now (also a test). */
export async function POST() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const sent = await sendTelegramNow(owned.businessId);
  return NextResponse.json({ sent });
}

export async function DELETE(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const id = new URL(req.url).searchParams.get("group") ?? "";
  await prisma.telegramGroup.deleteMany({ where: { id, businessId: owned.businessId } });
  return NextResponse.json(await state(owned.businessId));
}
