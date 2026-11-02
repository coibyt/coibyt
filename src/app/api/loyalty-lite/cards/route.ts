import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { createLiteCard, currentLiteSalon } from "@/lib/loyalty-lite";
import { liteCardEmail } from "@/lib/email/loyalty-lite-emails";

export async function GET() {
  const salon = await currentLiteSalon();
  if (!salon) return NextResponse.json({ error: "SIGNED_OUT" }, { status: 401 });
  const cards = await prisma.liteCard.findMany({ where: { liteSalonId: salon.id }, orderBy: [{ lastStampAt: "desc" }, { createdAt: "desc" }] });
  return NextResponse.json({ cards });
}

const schema = z.object({
  customerName: z.string().trim().min(1).max(120),
  customerEmail: z.string().trim().toLowerCase().email().max(191).optional().or(z.literal("")),
});

/** A new card; emailed to the customer when there's an address. */
export async function POST(req: Request) {
  const salon = await currentLiteSalon();
  if (!salon) return NextResponse.json({ error: "SIGNED_OUT" }, { status: 401 });
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const r = await createLiteCard(salon, parsed.data);
  if ("error" in r) return NextResponse.json({ error: r.error }, { status: 409 });
  let emailed = false;
  if (r.card.customerEmail) {
    try {
      await sendMail({ to: r.card.customerEmail, ...liteCardEmail(salon, r.card) });
      emailed = true;
    } catch (err) {
      console.error("[lite] card mail", err);
    }
  }
  return NextResponse.json({ card: r.card, emailed }, { status: 201 });
}
