import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
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
    include: { service: { select: { name: true } }, business: { select: { name: true, status: true } } },
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

  const isVi = (d.locale ?? "vi") === "vi";
  const price = formatMoney(card.salePriceCents, card.currency, isVi ? "vi" : "en");
  const qr = await giftCardQrPng(code);
  await sendMail({
    to: d.buyerEmail,
    subject: isVi
      ? `Thẻ quà tặng ${card.business.name} — mã ${code}`
      : `Gift card from ${card.business.name} — code ${code}`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${isVi ? "Cảm ơn bạn đã mua thẻ quà tặng" : "Thanks for buying a gift card"}</h2>
        <p>${isVi ? "Xin chào" : "Hi"} ${d.buyerName},</p>
        <p><b>${card.name}</b> — ${card.service.name} · ${isVi ? "giảm" : "off"} ${card.discountPercent}%</p>
        <p>${isVi ? "Giá" : "Price"}: <b>${price}</b> · ${isVi ? "Hiệu lực" : "Valid"} ${card.validDays} ${isVi ? "ngày sau khi kích hoạt" : "days after activation"} · ${isVi ? "Số lần dùng" : "Uses"}: ${card.maxUses}</p>
        <p style="font-size:18px"><b>${isVi ? "Mã thẻ" : "Card code"}: ${code}</b></p>
        <p>${isVi ? "Đưa mã hoặc mã QR bên dưới cho salon khi đến làm dịch vụ. Thẻ sẽ được kích hoạt sau khi salon xác nhận thanh toán." : "Show this code or the QR below at the salon. The card activates once the salon confirms payment."}</p>
        <img src="cid:giftqr" alt="QR" width="240" height="240" />
      </div>`,
    attachments: [{ filename: `${code}.png`, content: qr, cid: "giftqr", contentType: "image/png" }],
  });

  return NextResponse.json({ code, purchaseId: purchase.id }, { status: 201 });
}
