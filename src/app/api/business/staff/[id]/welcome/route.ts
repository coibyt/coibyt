import { NextResponse } from "next/server";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendStaffWelcomeEmail } from "@/lib/staff-welcome";

/** The owner sends a staff member the welcome email again — how to sign in,
 * a fresh link to set their own password, and what they can use. */
export async function POST(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const staff = await prisma.staff.findFirst({ where: { id, businessId: owned.businessId }, select: { userId: true } });
  if (!staff) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  if (!staff.userId) return NextResponse.json({ error: "NO_LOGIN" }, { status: 409 });
  const sent = await sendStaffWelcomeEmail(id);
  return sent ? NextResponse.json({ ok: true }) : NextResponse.json({ error: "SEND_FAILED" }, { status: 502 });
}
