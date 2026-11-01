import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { externalSource, MAX_BUSY_ADJUST_MINUTES } from "@/lib/staff-branches";

/** The owner sets how long a locked "at another branch" block takes on THIS
 * branch's calendar (BranchBusyAdjust) — the other branches keep their own. */
const schema = z.object({
  staffId: z.string().cuid(),
  sourceKey: z.string().regex(/^[bxt]-[a-z0-9]{10,36}$/),
  // null: back to the person's travel time.
  startsAt: z.string().datetime().nullable(),
  endsAt: z.string().datetime().nullable(),
});

const MIN = 60 * 1000;

export async function PUT(req: Request) {
  const access = await getBusinessAccess();
  if (!access?.isOwner) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const { staffId, sourceKey, startsAt, endsAt } = parsed.data;

  const staff = await prisma.staff.findFirst({ where: { id: staffId, businessId: access.business.id }, select: { id: true } });
  if (!staff) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  const source = await externalSource(staffId, sourceKey);
  if (!source) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  if (!startsAt || !endsAt) {
    await prisma.branchBusyAdjust.deleteMany({ where: { staffId, sourceKey } });
    return NextResponse.json({ ok: true });
  }
  // Only the margins move: the time at the other branch always stays blocked.
  const beforeMinutes = Math.round((source.startsAt.getTime() - new Date(startsAt).getTime()) / MIN);
  const afterMinutes = Math.round((new Date(endsAt).getTime() - source.endsAt.getTime()) / MIN);
  if (beforeMinutes < 0 || afterMinutes < 0) return NextResponse.json({ error: "INSIDE_SOURCE" }, { status: 400 });
  if (beforeMinutes > MAX_BUSY_ADJUST_MINUTES || afterMinutes > MAX_BUSY_ADJUST_MINUTES) {
    return NextResponse.json({ error: "TOO_LONG" }, { status: 400 });
  }
  await prisma.branchBusyAdjust.upsert({
    where: { staffId_sourceKey: { staffId, sourceKey } },
    create: { staffId, sourceKey, beforeMinutes, afterMinutes },
    update: { beforeMinutes, afterMinutes },
  });
  return NextResponse.json({ ok: true });
}
