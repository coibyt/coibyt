import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { timeOffAccess, timeOffSchema } from "@/lib/time-off-api";

/** The block, if the viewer may change it. */
async function ownedBlock(id: string) {
  const access = await timeOffAccess();
  if (!access) return { error: NextResponse.json({ error: "FORBIDDEN" }, { status: 403 }) };
  const row = await prisma.staffTimeOff.findFirst({
    where: { id, staff: { businessId: access.businessId } },
    select: { id: true, staffId: true },
  });
  if (!row || (access.scopeStaffId && row.staffId !== access.scopeStaffId)) {
    return { error: NextResponse.json({ error: "NOT_FOUND" }, { status: 404 }) };
  }
  return { row, access };
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await ownedBlock(id);
  if ("error" in found) return found.error;
  const parsed = timeOffSchema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "INVALID" }, { status: 400 });
  const d = parsed.data;
  if (found.access.scopeStaffId && d.staffId !== found.access.scopeStaffId) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const staff = await prisma.staff.findFirst({ where: { id: d.staffId, businessId: found.access.businessId }, select: { id: true } });
  if (!staff) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  await prisma.staffTimeOff.update({
    where: { id },
    data: { staffId: d.staffId, kind: d.kind, reason: d.note?.trim() || null, startsAt: new Date(d.startsAt), endsAt: new Date(d.endsAt) },
  });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const found = await ownedBlock(id);
  if ("error" in found) return found.error;
  await prisma.staffTimeOff.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
