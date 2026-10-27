import { NextResponse } from "next/server";
import { z } from "zod";
import { customerScopeBusinessIds, getBusinessAccess } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";

const schema = z.object({ note: z.string().max(4000) });

/** Saves the salon's private note about a customer (empty clears it). Only
 * for customers who have booked at one of the viewer's branches. */
export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.customers)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  const scopeIds = await customerScopeBusinessIds(access);
  const known = await prisma.booking.findFirst({ where: { businessId: { in: scopeIds }, customerId: id }, select: { id: true } });
  if (!known) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });

  const businessId = access.business.id;
  const note = parsed.data.note.trim();
  if (!note) {
    await prisma.customerNote.deleteMany({ where: { businessId, customerId: id } });
  } else {
    await prisma.customerNote.upsert({
      where: { businessId_customerId: { businessId, customerId: id } },
      update: { note },
      create: { businessId, customerId: id, note },
    });
  }
  return NextResponse.json({ ok: true });
}
