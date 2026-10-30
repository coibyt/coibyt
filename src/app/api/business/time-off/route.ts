import { NextResponse } from "next/server";
import { addDays } from "date-fns";
import { fromZonedTime } from "date-fns-tz";
import { prisma } from "@/lib/prisma";
import { timeOffAccess, timeOffSchema } from "@/lib/time-off-api";
import { externalBusy } from "@/lib/staff-branches";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
/** Personal time blocks for a business-local date range [from, to]
 * (inclusive), for the bookings calendar. */
export async function GET(req: Request) {
  const access = await timeOffAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  if (!from || !to || !DATE_RE.test(from) || !DATE_RE.test(to)) {
    return NextResponse.json({ error: "INVALID_DATE" }, { status: 400 });
  }
  const start = fromZonedTime(from, access.timezone);
  const end = addDays(fromZonedTime(to, access.timezone), 1);

  const rows = await prisma.staffTimeOff.findMany({
    where: {
      staff: { businessId: access.businessId },
      ...(access.scopeStaffId ? { staffId: access.scopeStaffId } : {}),
      startsAt: { lt: end },
      endsAt: { gt: start },
    },
    select: { id: true, staffId: true, kind: true, reason: true, startsAt: true, endsAt: true, staff: { select: { name: true } } },
    orderBy: { startsAt: "asc" },
  });

  // Staff who also work at the owner's other branches: their bookings and
  // blocked time there show here as locked, read-only time ("at branch X").
  const staffHere = await prisma.staff.findMany({
    where: { businessId: access.businessId, ...(access.scopeStaffId ? { id: access.scopeStaffId } : {}) },
    select: { id: true, name: true },
  });
  const names = new Map(staffHere.map((s) => [s.id, s.name]));
  const elsewhere = await externalBusy([...names.keys()], start, end);

  return NextResponse.json({
    timeOff: [
      ...rows.map((r) => ({
        id: r.id,
        staffId: r.staffId,
        staffName: r.staff.name,
        kind: r.kind,
        note: r.reason,
        startsAt: r.startsAt.toISOString(),
        endsAt: r.endsAt.toISOString(),
      })),
      ...elsewhere.map((x) => ({
        id: x.id,
        staffId: x.staffId,
        staffName: names.get(x.staffId) ?? "",
        kind: x.kind,
        // The other branch's name.
        note: x.branchName,
        // Already included in startsAt/endsAt, either side.
        travelMinutes: x.travelMinutes,
        startsAt: x.startsAt.toISOString(),
        endsAt: x.endsAt.toISOString(),
      })),
    ],
  });
}

export async function POST(req: Request) {
  const access = await timeOffAccess();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const parsed = timeOffSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "INVALID" }, { status: 400 });
  const d = parsed.data;
  if (access.actionStaffId && d.staffId !== access.actionStaffId) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const staff = await prisma.staff.findFirst({ where: { id: d.staffId, businessId: access.businessId }, select: { id: true } });
  if (!staff) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const row = await prisma.staffTimeOff.create({
    data: { staffId: d.staffId, kind: d.kind, reason: d.note?.trim() || null, startsAt: new Date(d.startsAt), endsAt: new Date(d.endsAt) },
  });
  return NextResponse.json({ id: row.id }, { status: 201 });
}
