import { NextResponse } from "next/server";
import { z } from "zod";
import { getBusinessAccess, requireOwnerOnly } from "@/lib/current-business";
import { prisma } from "@/lib/prisma";
import { sendMail } from "@/lib/mailer";
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
  locale: z.string().max(5).optional(),
});

/** Salon activates a customer's card: creates the QR and emails it with the
 * benefits. Only once active does the card start collecting points. */
export async function POST(req: Request) {
  const owned = await requireOwnerOnly();
  if (!owned) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });

  const parsed = createSchema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "INVALID" }, { status: 400 });
  const d = parsed.data;
  const email = d.customerEmail.toLowerCase();

  const program = await prisma.loyaltyProgram.findUnique({
    where: { businessId: owned.businessId },
    include: { business: { select: { name: true } } },
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

  const isVi = (d.locale ?? "vi") === "vi";
  const price = program.priceCents > 0 ? formatMoney(program.priceCents, program.currency, isVi ? "vi" : "en") : null;
  const qr = await loyaltyQrPng(token);
  await sendMail({
    to: email,
    subject: isVi
      ? `Thẻ tích điểm ${program.business.name} đã được kích hoạt`
      : `Your loyalty card at ${program.business.name} is active`,
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${isVi ? "Thẻ tích điểm đã sẵn sàng" : "Your loyalty card is ready"}</h2>
        <p>${isVi ? "Xin chào" : "Hi"} ${d.customerName},</p>
        <p>${isVi
          ? `Bạn có thể bắt đầu tích điểm tại ${program.business.name}. Cứ mỗi lần làm dịch vụ, nhân viên sẽ quét mã QR bên dưới để cộng 1 điểm.`
          : `You can start collecting points at ${program.business.name}. After each visit, staff scan the QR below to add 1 point.`}</p>
        <p><b>${isVi ? "Ưu đãi" : "Reward"}:</b> ${isVi
          ? `sau ${program.pointsRequired} lần, được giảm ${program.discountPercent}%`
          : `after ${program.pointsRequired} visits, ${program.discountPercent}% off`}${price ? ` · ${isVi ? "giá thẻ" : "card price"}: ${price}` : ""}</p>
        <p>${isVi ? "Mã thẻ" : "Card code"}: <b>${token}</b></p>
        <img src="cid:loyaltyqr" alt="QR" width="240" height="240" />
      </div>`,
    attachments: [{ filename: `${token}.png`, content: qr, cid: "loyaltyqr", contentType: "image/png" }],
  });

  return NextResponse.json({ id: card.id }, { status: 201 });
}
