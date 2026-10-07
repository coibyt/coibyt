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
});

type ActivationLocale = "vi" | "en" | "fi" | "pl" | "de" | "km" | "th";

const ACTIVATION_EMAIL: Record<
  ActivationLocale,
  {
    subject: (business: string) => string;
    heading: string;
    greeting: string;
    bodyIntro: (business: string) => string;
    rewardLabel: string;
    rewardText: (visits: number, percent: number) => string;
    cardPriceLabel: string;
    cardCodeLabel: string;
  }
> = {
  vi: {
    subject: (b) => `Thẻ tích điểm ${b} đã được kích hoạt`,
    heading: "Thẻ tích điểm đã sẵn sàng",
    greeting: "Xin chào",
    bodyIntro: (b) =>
      `Bạn có thể bắt đầu tích điểm tại ${b}. Cứ mỗi lần làm dịch vụ, nhân viên sẽ quét mã QR bên dưới để cộng 1 điểm.`,
    rewardLabel: "Ưu đãi",
    rewardText: (n, p) => `sau ${n} lần, được giảm ${p}%`,
    cardPriceLabel: "giá thẻ",
    cardCodeLabel: "Mã thẻ",
  },
  en: {
    subject: (b) => `Your loyalty card at ${b} is active`,
    heading: "Your loyalty card is ready",
    greeting: "Hi",
    bodyIntro: (b) =>
      `You can start collecting points at ${b}. After each visit, staff scan the QR below to add 1 point.`,
    rewardLabel: "Reward",
    rewardText: (n, p) => `after ${n} visits, ${p}% off`,
    cardPriceLabel: "card price",
    cardCodeLabel: "Card code",
  },
  fi: {
    subject: (b) => `Kanta-asiakaskorttisi kohteessa ${b} on aktivoitu`,
    heading: "Kanta-asiakaskorttisi on valmis",
    greeting: "Hei",
    bodyIntro: (b) =>
      `Voit alkaa kerätä pisteitä kohteessa ${b}. Jokaisen käynnin jälkeen henkilökunta skannaa alla olevan QR-koodin ja lisää 1 pisteen.`,
    rewardLabel: "Etu",
    rewardText: (n, p) => `${n} käynnin jälkeen ${p} % alennus`,
    cardPriceLabel: "kortin hinta",
    cardCodeLabel: "Kortin koodi",
  },
  pl: {
    subject: (b) => `Twoja karta lojalnościowa w ${b} jest aktywna`,
    heading: "Twoja karta lojalnościowa jest gotowa",
    greeting: "Cześć",
    bodyIntro: (b) =>
      `Możesz zacząć zbierać punkty w ${b}. Po każdej wizycie personel zeskanuje poniższy kod QR i doda 1 punkt.`,
    rewardLabel: "Nagroda",
    rewardText: (n, p) => `po ${n} wizytach zniżka ${p}%`,
    cardPriceLabel: "cena karty",
    cardCodeLabel: "Kod karty",
  },
  de: {
    subject: (b) => `Deine Treuekarte bei ${b} ist aktiv`,
    heading: "Deine Treuekarte ist bereit",
    greeting: "Hallo",
    bodyIntro: (b) =>
      `Du kannst bei ${b} Punkte sammeln. Nach jedem Besuch scannt das Personal den QR-Code unten und fügt 1 Punkt hinzu.`,
    rewardLabel: "Prämie",
    rewardText: (n, p) => `nach ${n} Besuchen ${p}% Rabatt`,
    cardPriceLabel: "Kartenpreis",
    cardCodeLabel: "Kartencode",
  },
  km: {
    subject: (b) => `កាតពិន្ទុរបស់អ្នកនៅ ${b} ត្រូវបានដំណើរការ`,
    heading: "កាតពិន្ទុរបស់អ្នករួចរាល់ហើយ",
    greeting: "សួស្តី",
    bodyIntro: (b) =>
      `អ្នកអាចចាប់ផ្តើមប្រមូលពិន្ទុនៅ ${b}។ បន្ទាប់ពីប្រើសេវានីមួយៗ បុគ្គលិកនឹងស្កេនកូដ QR ខាងក្រោមដើម្បីបន្ថែម១ពិន្ទុ។`,
    rewardLabel: "រង្វាន់",
    rewardText: (n, p) => `បន្ទាប់ពី ${n} ដង បញ្ចុះតម្លៃ ${p}%`,
    cardPriceLabel: "តម្លៃកាត",
    cardCodeLabel: "កូដកាត",
  },
  th: {
    subject: (b) => `บัตรสะสมแต้มของคุณที่ ${b} เปิดใช้งานแล้ว`,
    heading: "บัตรสะสมแต้มของคุณพร้อมใช้งานแล้ว",
    greeting: "สวัสดี",
    bodyIntro: (b) =>
      `คุณสามารถเริ่มสะสมแต้มได้ที่ ${b} หลังการใช้บริการแต่ละครั้ง พนักงานจะสแกน QR ด้านล่างเพื่อเพิ่ม 1 แต้ม`,
    rewardLabel: "สิทธิประโยชน์",
    rewardText: (n, p) => `ครบ ${n} ครั้ง รับส่วนลด ${p}%`,
    cardPriceLabel: "ราคาบัตร",
    cardCodeLabel: "รหัสบัตร",
  },
};

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
    include: { business: { select: { name: true, defaultLocale: true } } },
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

  const locale = program.business.defaultLocale as ActivationLocale;
  const t = ACTIVATION_EMAIL[locale] ?? ACTIVATION_EMAIL.vi;
  const price =
    program.priceCents > 0 ? formatMoney(program.priceCents, program.currency, locale) : null;
  const qr = await loyaltyQrPng(token);
  await sendMail({
    to: email,
    subject: t.subject(program.business.name),
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${t.heading}</h2>
        <p>${t.greeting} ${d.customerName},</p>
        <p>${t.bodyIntro(program.business.name)}</p>
        <p><b>${t.rewardLabel}:</b> ${t.rewardText(program.pointsRequired, program.discountPercent)}${
          price ? ` · ${t.cardPriceLabel}: ${price}` : ""
        }</p>
        <p>${t.cardCodeLabel}: <b>${token}</b></p>
        <img src="cid:loyaltyqr" alt="QR" width="240" height="240" />
      </div>`,
    attachments: [{ filename: `${token}.png`, content: qr, cid: "loyaltyqr", contentType: "image/png" }],
  });

  return NextResponse.json({ id: card.id }, { status: 201 });
}
