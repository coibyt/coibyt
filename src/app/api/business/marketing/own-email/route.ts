import { NextResponse } from "next/server";
import { z } from "zod";
import { requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { requestOwnEmail } from "@/lib/salon-own-email";

const lastSent = new Map<string, number>();

/** The owner gives the salon's own address; we email it a verification link.
 * Only when the admin has allowed this salon to use its own email. */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const b = await prisma.business.findUnique({ where: { id: owned.businessId }, select: { ownEmailAllowed: true } });
  if (!b?.ownEmailAllowed) return NextResponse.json({ error: "NOT_ALLOWED" }, { status: 403 });
  const email = z.string().trim().toLowerCase().email().max(191).safeParse((await req.json().catch(() => null))?.email);
  if (!email.success) return NextResponse.json({ error: "INVALID_EMAIL" }, { status: 400 });
  if (Date.now() - (lastSent.get(owned.businessId) ?? 0) < 30_000) return NextResponse.json({ error: "TOO_SOON" }, { status: 429 });
  lastSent.set(owned.businessId, Date.now());
  await requestOwnEmail(owned.businessId, email.data);
  return NextResponse.json({ email: email.data, verified: false });
}

/** Stops using the salon's own address. */
export async function DELETE() {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  await prisma.business.update({
    where: { id: owned.businessId },
    data: { marketingEmail: null, marketingEmailToken: null, marketingEmailVerifiedAt: null },
  });
  return NextResponse.json({ email: null });
}
