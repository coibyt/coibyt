import { readFile } from "fs/promises";
import path from "path";
import QRCode from "qrcode";
import { ImageResponse } from "next/og";
import { prisma } from "@/lib/prisma";
import { formatMoney } from "@/lib/money";
import { sendMail } from "@/lib/mailer";
import { codeTicket, emailLayout, esc, greeting, notice, para } from "@/lib/email/ui";
import {
  GIFT_CARD_HEIGHT,
  GIFT_CARD_WIDTH,
  GiftCardDesign,
  type GiftCardDesignProps,
} from "@/components/gift-card-design";

const FONT_FAMILY = "Be Vietnam Pro";

// Bundled TTFs (satori can't use woff2 or system fonts) — Be Vietnam Pro is
// the site's own typeface and has full Vietnamese diacritics coverage.
let fontsPromise: Promise<{ name: string; data: Buffer; weight: 400 | 600 | 700; style: "normal" }[]> | null = null;
function loadFonts() {
  fontsPromise ??= Promise.all(
    ([
      ["Regular", 400],
      ["SemiBold", 600],
      ["Bold", 700],
    ] as const).map(async ([file, weight]) => ({
      name: FONT_FAMILY,
      data: await readFile(path.join(process.cwd(), "public", "fonts", `BeVietnamPro-${file}.ttf`)),
      weight,
      style: "normal" as const,
    }))
  ).catch((err) => {
    fontsPromise = null;
    throw err;
  });
  return fontsPromise;
}

/** The QR opens the salon's own gift-card page with the code filled in, so
 * staff can check and redeem it with just a phone camera. */
export function giftCardRedeemUrl(code: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  return `${site}/business/dashboard/gift-cards?code=${encodeURIComponent(code)}`;
}

function cardLocale(locale: string) {
  return locale === "vi" || locale === "fi" ? locale : "en";
}

export async function loadGiftCardDesign(
  purchaseId: string,
  businessId: string,
  locale: string
): Promise<(GiftCardDesignProps & { recipientEmail: string; salonName: string }) | null> {
  const purchase = await prisma.giftCardPurchase.findFirst({
    where: { id: purchaseId, businessId },
    include: {
      giftCard: { include: { service: { select: { name: true } } } },
    },
  });
  if (!purchase) return null;
  const business = await prisma.business.findUnique({
    where: { id: businessId },
    select: { name: true, timezone: true },
  });
  const loc = cardLocale(locale);
  const qrDataUrl = await QRCode.toDataURL(giftCardRedeemUrl(purchase.code), {
    width: 504,
    margin: 1,
    color: { dark: "#1f182d", light: "#ffffff" },
  });

  return {
    salonName: business?.name ?? "",
    title: purchase.giftCard.name,
    serviceName: purchase.giftCard.service.name,
    amountText: formatMoney(purchase.giftCard.salePriceCents, purchase.giftCard.currency, loc),
    discountPercent: purchase.giftCard.discountPercent,
    maxUses: purchase.giftCard.maxUses,
    validUntilText: purchase.expiresAt
      ? purchase.expiresAt.toLocaleDateString(loc === "vi" ? "vi-VN" : loc === "fi" ? "fi-FI" : "en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          timeZone: business?.timezone ?? "UTC",
        })
      : null,
    recipientName: purchase.buyerName,
    recipientEmail: purchase.buyerEmail,
    recipientPhone: purchase.buyerPhone,
    message: purchase.message,
    code: purchase.code,
    qrDataUrl,
    locale: loc,
    fontFamily: FONT_FAMILY,
  };
}

/** Same as loadGiftCardDesign, looked up by the card's own code — for the
 * public image URL that the gift card email points at. */
export async function loadGiftCardDesignByCode(code: string, locale: string) {
  const purchase = await prisma.giftCardPurchase.findUnique({
    where: { code },
    select: { id: true, businessId: true, status: true },
  });
  if (!purchase || purchase.status === "CANCELLED") return null;
  return loadGiftCardDesign(purchase.id, purchase.businessId, locale);
}

/** Public URL of the card image. Email clients (Gmail's app especially)
 * don't reliably show inline "cid:" attachments, but they all load a normal
 * https image — the code in the URL is no more secret than the code printed
 * in the same email. */
export function giftCardImageUrl(code: string, locale: string) {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";
  return `${site}/api/gift-card-image/${encodeURIComponent(code)}.png?l=${cardLocale(locale)}`;
}

export async function renderGiftCardPng(props: GiftCardDesignProps): Promise<Buffer> {
  const fonts = await loadFonts();
  const image = new ImageResponse(<GiftCardDesign {...props} />, {
    width: GIFT_CARD_WIDTH,
    height: GIFT_CARD_HEIGHT,
    fonts,
  });
  return Buffer.from(await image.arrayBuffer());
}

const EMAIL_TEXT = {
  vi: {
    subject: (salon: string) => `Bạn nhận được một thẻ quà tặng từ ${salon}`,
    hi: "Xin chào",
    intro: (salon: string) => `${salon} gửi tặng bạn thẻ quà tặng dưới đây.`,
    howTo: "Khi đến salon, chỉ cần đưa mã QR hoặc mã thẻ này cho nhân viên.",
    eyebrow: "Quà tặng dành cho bạn",
    codeLabel: "Mã thẻ",
    howTitle: "Cách sử dụng",
    attached: "Ảnh thẻ cũng được đính kèm trong email để bạn lưu lại.",
    alt: (salon: string) => `Thẻ quà tặng ${salon}`,
  },
  en: {
    subject: (salon: string) => `You've received a gift card from ${salon}`,
    hi: "Hi",
    intro: (salon: string) => `${salon} has sent you the gift card below.`,
    howTo: "When you visit the salon, just show this QR code or card code to the staff.",
    eyebrow: "A gift for you",
    codeLabel: "Card code",
    howTitle: "How to use it",
    attached: "The card image is also attached so you can keep it.",
    alt: (salon: string) => `${salon} gift card`,
  },
  fi: {
    subject: (salon: string) => `Sait lahjakortin: ${salon}`,
    hi: "Hei",
    intro: (salon: string) => `${salon} lähetti sinulle alla olevan lahjakortin.`,
    howTo: "Näytä tämä QR-koodi tai korttikoodi salongissa käynnin yhteydessä.",
    eyebrow: "Lahja sinulle",
    codeLabel: "Kortin koodi",
    howTitle: "Näin käytät korttia",
    attached: "Kortin kuva on myös liitteenä, jotta voit tallentaa sen.",
    alt: (salon: string) => `${salon} lahjakortti`,
  },
};

/** Renders the card and emails it to the recipient — shown in the body (via
 * its public image URL) and attached as a file. Throws on render or SMTP failure so the caller can tell
 * the owner the card was created but not sent. */
export async function emailGiftCard(purchaseId: string, businessId: string, locale: string) {
  const design = await loadGiftCardDesign(purchaseId, businessId, locale);
  if (!design) throw new Error("NOT_FOUND");
  const png = await renderGiftCardPng(design);
  const loc = cardLocale(locale) as keyof typeof EMAIL_TEXT;
  const t = EMAIL_TEXT[loc];
  await sendMail({
    to: design.recipientEmail,
    subject: t.subject(design.salonName),
    html: emailLayout({
      locale: loc,
      preheader: t.intro(design.salonName),
      brand: { name: design.salonName },
      hero: { eyebrow: t.eyebrow, title: esc(t.subject(design.salonName)), tone: "gold", badge: "🎁" },
      body: [
        greeting(t.hi, design.recipientName),
        para(esc(t.intro(design.salonName))),
        `<img src="${giftCardImageUrl(design.code, locale)}" alt="${esc(t.alt(design.salonName))}" width="512" style="display:block;width:100%;max-width:512px;height:auto;margin:8px auto 0;border-radius:20px;border:0;box-shadow:0 12px 32px rgba(31,24,45,.18)" />`,
        codeTicket(t.codeLabel, design.code),
        notice(t.howTitle, esc(t.howTo), "gold", 20),
        para(esc(t.attached), { small: true, muted: true, center: true, mt: 14 }),
      ].join(""),
    }),
    // A plain attachment (no cid) so it shows up as a file to save.
    attachments: [{ filename: `gift-card-${design.code}.png`, content: png, contentType: "image/png" }],
  });
}
