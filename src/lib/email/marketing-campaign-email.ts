import { C, SITE_URL, absoluteUrl, button, emailLayout, esc, headingFont, notice, sectionTitle, steps } from "@/lib/email/ui";
import { personalize } from "@/lib/marketing-campaign";
import { loyaltyCardEmailStrings, memberCard } from "@/lib/email/loyalty-card-email";
import { loyaltyScanUrl } from "@/lib/loyalty";

/** The email a salon's marketing campaign sends: an optional picture, a big
 * headline, the owner's message, an optional gold coupon and a button —
 * personalised per recipient. Used for the live preview too (no tracking). */

const T = {
  vi: {
    friend: "bạn",
    book: "Đặt lịch ngay",
    learn: "Xem chi tiết",
    offer: "Ưu đãi dành riêng cho bạn",
    code: "Mã ưu đãi",
    until: (d: string) => `Áp dụng đến hết ngày ${d}`,
    why: (b: string) => `Bạn nhận được email này vì đã từng sử dụng dịch vụ tại ${b}.`,
    unsub: "Hủy nhận email quảng cáo",
    visit: "Xem trang của salon",
    cardNewTitle: "Quà tặng: thẻ tích điểm của bạn",
    cardNewText: (b: string) =>
      `${b} tặng bạn thẻ tích điểm thành viên. Mỗi lần làm dịch vụ bạn nhận 1 vé — đủ vé là được giảm giá. Thẻ nằm ngay trong email này, không cần thẻ giấy hay cài ứng dụng.`,
    cardOldTitle: "Thẻ tích điểm của bạn",
    cardOldText: (b: string, pts: number, n: number) =>
      `Bạn đã có thẻ tích điểm tại ${b} — mã thẻ của bạn vẫn giữ nguyên, số vé đã tích vẫn còn đó. Hiện bạn có ${pts}/${n} vé.`,
    viewCard: "Xem thẻ của tôi",
    howTitle: "Cách dùng thẻ",
    bookTitle: "Đặt lịch online trên VaraaAi",
    bookText: (b: string) =>
      `Từ nay bạn có thể đặt lịch với ${b} trên VaraaAi bất cứ lúc nào: chọn dịch vụ, nhân viên và giờ phù hợp chỉ trong vài giây, và nhận email nhắc lịch trước mỗi lần hẹn.`,
    sample: "Thẻ mẫu — mỗi khách sẽ nhận mã thẻ riêng của mình.",
  },
  en: {
    friend: "there",
    book: "Book now",
    learn: "Learn more",
    offer: "An offer just for you",
    code: "Offer code",
    until: (d: string) => `Valid until ${d}`,
    why: (b: string) => `You're receiving this because you've visited ${b}.`,
    unsub: "Unsubscribe from marketing emails",
    visit: "Visit the salon's page",
    cardNewTitle: "A gift for you: your loyalty card",
    cardNewText: (b: string) =>
      `${b} is giving you a loyalty card. Every visit earns you 1 ticket — collect enough and you get a discount. The card is right here in this email: no paper card, no app to install.`,
    cardOldTitle: "Your loyalty card",
    cardOldText: (b: string, pts: number, n: number) =>
      `You already have a loyalty card at ${b} — your card code stays the same and your tickets are still there. You have ${pts}/${n} tickets.`,
    viewCard: "View my card",
    howTitle: "How to use your card",
    bookTitle: "Book online on VaraaAi",
    bookText: (b: string) =>
      `You can now book ${b} on VaraaAi any time: pick the service, the staff member and a time that suits you in seconds, and get a reminder email before every appointment.`,
    sample: "Sample card — every customer gets their own card code.",
  },
  fi: {
    friend: "ystävä",
    book: "Varaa aika",
    learn: "Lue lisää",
    offer: "Etu juuri sinulle",
    code: "Etukoodi",
    until: (d: string) => `Voimassa ${d} asti`,
    why: (b: string) => `Saat tämän viestin, koska olet asioinut paikassa ${b}.`,
    unsub: "Peru markkinointiviestien tilaus",
    visit: "Salongin sivu",
    cardNewTitle: "Lahja sinulle: kanta-asiakaskorttisi",
    cardNewText: (b: string) =>
      `${b} antaa sinulle kanta-asiakaskortin. Jokaisesta käynnistä saat 1 lipun — kun lippuja on tarpeeksi, saat alennuksen. Kortti on tässä sähköpostissa: ei muovikorttia eikä sovellusta.`,
    cardOldTitle: "Kanta-asiakaskorttisi",
    cardOldText: (b: string, pts: number, n: number) =>
      `Sinulla on jo kanta-asiakaskortti paikassa ${b} — korttikoodisi pysyy samana ja keräämäsi liput ovat tallessa. Sinulla on ${pts}/${n} lippua.`,
    viewCard: "Näytä korttini",
    howTitle: "Näin käytät korttia",
    bookTitle: "Varaa verkossa VaraaAi:ssa",
    bookText: (b: string) =>
      `Voit nyt varata ajan paikkaan ${b} VaraaAi:ssa milloin tahansa: valitse palvelu, työntekijä ja sopiva aika sekunneissa, ja saat muistutuksen sähköpostiin ennen jokaista käyntiä.`,
    sample: "Esimerkkikortti — jokainen asiakas saa oman korttikoodinsa.",
  },
};

function strings(locale: string) {
  return (T as Record<string, (typeof T)["en"]>)[locale] ?? T.en;
}

export interface CampaignEmailInput {
  subject: string;
  preheader: string | null;
  headline: string | null;
  message: string;
  imageUrl: string | null;
  ctaKind: string;
  ctaLabel: string | null;
  offerTitle: string | null;
  offerCode: string | null;
  offerExpires: Date | null;
}

/** A loyalty card handed out with the campaign — the recipient's own (new
 * or existing), or a sample in the preview. */
export interface CampaignLoyaltyCard {
  token: string;
  holder: string;
  isNew: boolean;
  points: number;
  pointsRequired: number;
  discountPercent: number;
  /** The QR image: the public QR route when sending, a data URL in previews. */
  qrUrl: string;
  sample?: boolean;
}

export interface CampaignSalon {
  name: string;
  logoUrl: string | null;
  city: string | null;
  addressLine: string | null;
  phone: string | null;
}

/** Turns the owner's plain text into safe HTML paragraphs. */
function messageHtml(text: string) {
  return text
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px;font-size:15.5px;line-height:1.75;color:${C.text}">${esc(p).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

function loyaltyBlock(card: CampaignLoyaltyCard, salonName: string, locale: string, t: (typeof T)["en"], font: string) {
  const lt = loyaltyCardEmailStrings(locale);
  const n = card.pointsRequired;
  const pct = card.discountPercent;
  return [
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 0"><tr><td>
      <div style="font-size:11px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:#7a5f2c">♛ ${esc(card.isNew ? t.cardNewTitle : t.cardOldTitle)}</div>
      <p style="margin:8px 0 0;font-size:15px;line-height:1.7;color:${C.text}">${esc(card.isNew ? t.cardNewText(salonName) : t.cardOldText(salonName, card.points, n))}</p>
    </td></tr></table>`,
    memberCard({ salon: salonName, name: card.holder, token: card.token, qrUrl: card.qrUrl, reward: lt.rewardText(n, pct), t: lt, font }),
    card.sample ? `<p style="margin:6px 0 0;text-align:center;font-size:12px;font-style:italic;color:${C.muted}">${esc(t.sample)}</p>` : "",
    button(loyaltyScanUrl(card.token), esc(t.viewCard), { variant: "gold" }),
    sectionTitle(esc(t.howTitle), 30),
    steps(lt.steps(n, pct).map((s) => ({ title: esc(s.title), body: esc(s.body) }))),
    notice(esc(t.bookTitle), esc(t.bookText(salonName)), "gold", 22),
    `<div style="height:8px;line-height:8px;font-size:1px">&nbsp;</div>`,
  ].join("");
}

function coupon(title: string | null, code: string | null, until: string | null, t: (typeof T)["en"], font: string) {
  if (!title && !code) return "";
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:10px 0 6px;border-collapse:separate"><tr>
    <td align="center" bgcolor="#fbf6ec" style="background:#fbf6ec;background-image:linear-gradient(135deg,#fffaf0,#f6ead2);border:2px dashed ${C.gold};border-radius:20px;padding:24px 18px">
      <div style="font-size:11px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:#7a5f2c">${esc(t.offer)}</div>
      ${title ? `<div style="font-family:${font};font-size:30px;line-height:1.2;font-weight:700;color:${C.night};margin-top:8px">${esc(title)}</div>` : ""}
      ${
        code
          ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin-top:14px"><tr><td bgcolor="${C.night}" style="background:${C.night};border-radius:12px;padding:10px 18px">
              <div style="font-size:9.5px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:rgba(255,255,255,.6)">${esc(t.code)}</div>
              <div style="font-family:'SFMono-Regular',Menlo,Consolas,'Courier New',monospace;font-size:20px;font-weight:700;letter-spacing:4px;color:#e8d3a6;margin-top:2px">${esc(code)}</div>
            </td></tr></table>`
          : ""
      }
      ${until ? `<div style="font-size:12.5px;color:#7a5f2c;margin-top:12px">${esc(until)}</div>` : ""}
    </td></tr></table>`;
}

export function campaignEmail(p: {
  locale: string;
  salon: CampaignSalon;
  content: CampaignEmailInput;
  recipientName: string | null;
  /** Where the button goes — already a tracked link when sending. */
  ctaHref: string | null;
  salonHref: string;
  unsubscribeUrl: string | null;
  /** 1×1 open-tracking image, when sending for real. */
  pixelUrl: string | null;
  loyalty?: CampaignLoyaltyCard | null;
}) {
  const t = strings(p.locale);
  const font = headingFont(p.locale);
  const c = p.content;
  const fill = (s: string) => personalize(s, p.recipientName, t.friend);
  const until = c.offerExpires
    ? t.until(new Intl.DateTimeFormat(p.locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(c.offerExpires))
    : null;
  const img = absoluteUrl(c.imageUrl);
  const ctaLabel = c.ctaLabel?.trim() || (c.ctaKind === "URL" ? t.learn : t.book);
  const contact = [p.salon.addressLine, p.salon.city].filter(Boolean).join(", ");

  const body = [
    img
      ? `<img src="${esc(img)}" width="512" alt="" style="display:block;width:100%;max-width:512px;height:auto;border:0;border-radius:18px;margin:0 0 26px" />`
      : "",
    c.headline
      ? `<div class="h1" style="font-family:${font};font-size:30px;line-height:1.22;font-weight:700;color:${C.night};margin:0 0 18px">${esc(fill(c.headline))}</div>`
      : "",
    messageHtml(fill(c.message)),
    p.loyalty ? loyaltyBlock(p.loyalty, p.salon.name, p.locale, t, font) : "",
    coupon(c.offerTitle, c.offerCode, until, t, font),
    c.ctaKind !== "NONE" && p.ctaHref ? button(p.ctaHref, esc(ctaLabel), { variant: "dark" }) : "",
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:30px;border-top:1px solid ${C.hair}"><tr>
      <td style="padding-top:18px;font-size:13px;line-height:1.7;color:${C.muted}">
        <div style="font-family:${font};font-size:16px;font-weight:700;color:${C.ink}">${esc(p.salon.name)}</div>
        ${contact ? `<div>${esc(contact)}</div>` : ""}
        ${p.salon.phone ? `<div><a href="tel:${esc(p.salon.phone)}" style="color:${C.muted};text-decoration:none">${esc(p.salon.phone)}</a></div>` : ""}
        <div style="margin-top:6px"><a href="${esc(p.salonHref)}" style="color:${C.primary};font-weight:600;text-decoration:none">${esc(t.visit)} →</a></div>
      </td></tr></table>`,
    p.pixelUrl ? `<img src="${esc(p.pixelUrl)}" width="1" height="1" alt="" style="display:block;width:1px;height:1px;border:0" />` : "",
  ].join("");

  const subject = fill(c.subject);
  return {
    subject,
    html: emailLayout({
      locale: p.locale,
      preheader: fill(c.preheader || c.message).slice(0, 140),
      brand: { name: p.salon.name, logoUrl: p.salon.logoUrl, subline: p.salon.city },
      hero: null,
      title: subject,
      body,
      footerNote: `${esc(t.why(p.salon.name))}${
        p.unsubscribeUrl
          ? `<br /><a href="${esc(p.unsubscribeUrl)}" style="color:${C.muted};text-decoration:underline">${esc(t.unsub)}</a>`
          : ""
      }`,
    }),
  };
}

export function marketingImageUrl(id: string | null) {
  return id ? `${SITE_URL}/api/marketing-image/${id}` : null;
}
