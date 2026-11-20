import { NextResponse } from "next/server";
import { getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { notifyEntryById } from "@/lib/waitlist";

async function allowed() {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) return null;
  return access;
}

/** The salon takes someone off the wait list. */
export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await allowed();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const r = await prisma.waitlistEntry.updateMany({
    where: { id, businessId: access.business.id, leftAt: null },
    data: { leftAt: new Date() },
  });
  if (r.count === 0) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}

/** The salon tells one waiting customer there is room (email + push). */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await allowed();
  if (!access) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const ok = await notifyEntryById(id, access.business.id);
  if (!ok) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
