import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { currentLiteSalon, redeemLiteCard, stampLiteCard } from "@/lib/loyalty-lite";
import { liteCardEmail, liteStampEmail } from "@/lib/email/loyalty-lite-emails";

const schema = z.object({ action: z.enum(["stamp", "redeem", "resend"]) });

/** Stamp a visit, redeem the reward, or email the card again. */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const salon = await currentLiteSalon();
  if (!salon) return NextResponse.json({ error: "SIGNED_OUT" }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });

  if (parsed.data.action === "stamp") {
    const r = await stampLiteCard(salon, id);
    if (!r) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    if (!r.ok) return NextResponse.json(r, { status: 409 });
    const card = await prisma.liteCard.findUniqueOrThrow({ where: { id } });
    if (card.customerEmail) {
      // Not awaited: the salon sees the stamp at once.
      void sendMail({ to: card.customerEmail, ...liteStampEmail(salon, card) }).catch((err) => console.error("[lite] stamp mail", err));
    }
    return NextResponse.json({ ...r, card });
  }
  if (parsed.data.action === "redeem") {
    if (!(await redeemLiteCard(salon, id))) return NextResponse.json({ error: "NOT_READY" }, { status: 409 });
    return NextResponse.json({ ok: true, card: await prisma.liteCard.findUniqueOrThrow({ where: { id } }) });
  }
  const card = await prisma.liteCard.findFirst({ where: { id, liteSalonId: salon.id } });
  if (!card?.customerEmail) return NextResponse.json({ error: "NO_EMAIL" }, { status: 409 });
  await sendMail({ to: card.customerEmail, ...liteCardEmail(salon, card) });
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const salon = await currentLiteSalon();
  if (!salon) return NextResponse.json({ error: "SIGNED_OUT" }, { status: 401 });
  await prisma.liteCard.deleteMany({ where: { id, liteSalonId: salon.id } });
  return NextResponse.json({ ok: true });
}
