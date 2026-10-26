import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess, requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
import { loyaltyCardEmail } from "@/lib/email/loyalty-card-email";
import { formatMoney } from "@/lib/money";
import { loyaltyQrPng, newLoyaltyToken } from "@/lib/loyalty";

export async function GET() {
  const access = await getBusinessAccess();
  if (!access || (!access.isOwner && !access.permissions.bookings)) {
    return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  }
  const cards = await prisma.loyaltyCard.findMany({
    where: { businessId: access.business.id },
    orderBy: { createdAt: "desc" },
    take: 300,
  });
  return NextResponse.json({
    cards: cards.map((c) => ({
      id: c.id,
      customerName: c.customerName,
      customerEmail: c.customerEmail,
      points: c.points,
      totalScans: c.totalScans,
      rewardReady: c.rewardReady,
      rewardsEarned: c.rewardsEarned,
    })),
  });
}

const createSchema = z.object({
  customerName: z.string().trim().min(1).max(120),
  customerEmail: z.string().trim().email().max(180),
  customerPhone: z.string().trim().max(30).optional(),
});

/** Salon activates a customer's card: creates the QR and emails it with the
 * benefits, in the language the salon chose for its own customers (Settings
 * → "Ngôn ngữ mặc định" / Business.defaultLocale) — not whatever language the
 * owner's own dashboard happens to be browsing in at that moment. */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const d = parsed.data;
  const email = d.customerEmail.toLowerCase();

  const program = await prisma.loyaltyProgram.findUnique({
    where: { businessId: owned.businessId },
    include: { business: { select: { name: true, defaultLocale: true, logoUrl: true, city: true } } },
  });
  if (!program) return NextResponse.json({ error: "NO_PROGRAM" }, { status: 409 });

  const existing = await prisma.loyaltyCard.findUnique({
    where: { businessId_customerEmail: { businessId: owned.businessId, customerEmail: email } },
    select: { id: true },
  });
  if (existing) return NextResponse.json({ error: "ALREADY_ACTIVE" }, { status: 409 });

  const token = await newLoyaltyToken();
  const card = await prisma.loyaltyCard.create({
    data: {
      businessId: owned.businessId,
      customerName: d.customerName,
      customerEmail: email,
      customerPhone: d.customerPhone || null,
      token,
    },
  });

  const locale = program.business.defaultLocale;
  const price =
    program.priceCents > 0 ? formatMoney(program.priceCents, program.currency, locale) : null;
  const qr = await loyaltyQrPng(token);
  const mail = loyaltyCardEmail({
    locale,
    salon: { name: program.business.name, logoUrl: program.business.logoUrl, city: program.business.city },
    customerName: d.customerName,
    token,
    pointsRequired: program.pointsRequired,
    discountPercent: program.discountPercent,
    price,
  });
  await sendMail({
    to: email,
    subject: mail.subject,
    html: mail.html,
    // A plain attachment (no cid) so the QR can be saved as a file too.
    attachments: [{ filename: `${token}.png`, content: qr, contentType: "image/png" }],
  });

  return NextResponse.json({ id: card.id }, { status: 201 });
}
