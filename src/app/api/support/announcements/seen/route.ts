import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireSupportOwner } from "@/lib/support";

/** Marks every announcement posted so far as read for the signed-in owner. */
export async function POST() {
  const ownerId = await requireSupportOwner();
  if (!ownerId) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  await prisma.user.update({ where: { id: ownerId }, data: { announcementsSeenAt: new Date() } });
  return NextResponse.json({ ok: true });
}
