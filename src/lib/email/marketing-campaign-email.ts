import { C, SITE_URL, absoluteUrl, button, emailLayout, esc, headingFont } from "@/lib/email/ui";
import { personalize } from "@/lib/marketing-campaign";

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
