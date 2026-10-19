import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail, giftCardPurchaseEmail } from "@/lib/mailer";
import { giftCardQrPng, newUniqueGiftCode } from "@/lib/gift-cards";
import { formatMoney } from "@/lib/money";

const schema = z.object({
  giftCardId: z.string().cuid(),
  buyerName: z.string().trim().min(1).max(120),
  buyerEmail: z.string().trim().email().max(180),
  buyerPhone: z.string().trim().max(30).optional(),
  locale: z.string().max(5).optional(),
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const d = parsed.data;

  const card = await prisma.giftCard.findUnique({
    where: { id: d.giftCardId },
    include: { service: { select: { name: true } }, business: { select: { name: true, status: true, logoUrl: true } } },
  });
  if (!card || !card.active || card.business.status !== "APPROVED") {
    return NextResponse.json({ error: "NOT_AVAILABLE" }, { status: 404 });
  }

  const code = await newUniqueGiftCode();
  const purchase = await prisma.giftCardPurchase.create({
    data: {
      giftCardId: card.id,
      businessId: card.businessId,
      buyerName: d.buyerName,
      buyerEmail: d.buyerEmail,
      buyerPhone: d.buyerPhone || null,
      code,
      usesLeft: card.maxUses,
    },
  });

  const locale = ["vi", "en", "fi"].includes(d.locale ?? "") ? d.locale! : d.locale ? "en" : "vi";
  const price = formatMoney(card.salePriceCents, card.currency, locale);
  const qr = await giftCardQrPng(code);
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  const email = giftCardPurchaseEmail({
    buyerName: d.buyerName,
    businessName: card.business.name,
    cardName: card.name,
    serviceName: card.service.name,
    discountPercent: card.discountPercent,
    priceText: price,
    validDays: card.validDays,
    maxUses: card.maxUses,
    code,
    qrUrl: `${site}/api/email-qr/gift/${encodeURIComponent(code)}.png`,
    locale,
    businessLogoUrl: card.business.logoUrl,
  });
  await sendMail({
    to: d.buyerEmail,
    ...email,
    // A plain attachment (no cid) so the QR can be saved as a file too.
    attachments: [{ filename: `${code}.png`, content: qr, contentType: "image/png" }],
  });

  return NextResponse.json({ code, purchaseId: purchase.id }, { status: 201 });
}
