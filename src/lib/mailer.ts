import nodemailer, { type Transporter } from "nodemailer";
import { formatMoney } from "@/lib/money";
import { bookingEmailStrings, INVOICE_EMAIL_STRINGS } from "@/lib/email/booking-strings";
import { NEW_MESSAGE_STRINGS, OWNER_BOOKING_STRINGS } from "@/lib/email/owner-strings";
import { customerExtra, ownerExtra } from "@/lib/email/extra-strings";
import { chromeStrings } from "@/lib/email/strings";
import { bookingRef, dateParts, durationMinutes, googleCalendarUrl, icsAttachment } from "@/lib/email/calendar";
import {
  C,
  SITE_URL,
  appointmentHeader,
  button,
  buttonRow,
  codeTicket,
  emailLayout,
  esc,
  greeting,
  hairline,
  notice,
  panel,
  para,
  quote,
  rows,
  sectionTitle,
  stars,
  steps,
  type EmailBrand,
} from "@/lib/email/ui";

let _transporter: Transporter | null = null;

function getTransporter() {
  if (!_transporter) {
    _transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: Number(process.env.SMTP_PORT ?? 465) === 465,
      auth: process.env.SMTP_USER
        ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
        : undefined,
    });
  }
  return _transporter;
}

export interface MailAttachment {
  filename: string;
  content: Buffer;
  cid?: string;
  contentType?: string;
}

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  attachments?: MailAttachment[];
}) {
  // In local dev without SMTP configured, log instead of throwing so the
  // booking flow can still be exercised end-to-end.
  if (!process.env.SMTP_HOST) {
    console.info("[mailer] SMTP not configured, skipping email:", opts.subject, "->", opts.to);
    return;
  }
  const transporter = getTransporter();
  await transporter.sendMail({
    from: process.env.SMTP_FROM ?? "VaraaAi.Com <noreply@varaaai.com>",
    ...opts,
  });
}

/* ---------- helpers ---------- */

/** Picks the copy for a locale from a vi/en/fi dictionary (English fallback). */
function pick<T>(locale: string, dict: { vi: T; en: T; fi: T }): T {
  return (dict as Record<string, T>)[locale] ?? dict.en;
}

/** Site link in the visitor's language (vi is the unprefixed default). */
function sitePath(locale: string, path: string) {
  return `${SITE_URL}${locale === "vi" ? "" : `/${locale}`}${path}`;
}

const plain = (html: string) => html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

function salonBrand(name: string, logoUrl?: string | null, city?: string | null): EmailBrand {
  return { name, logoUrl, subline: city || null };
}

function mapsLink(name: string, address: string, mapsUrl?: string | null) {
  if (mapsUrl) return mapsUrl;
  if (!address) return "";
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${name}, ${address}`)}`;
}

function telLink(phone?: string | null) {
  return phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";
}

/** "Where" block: salon name, address, phone, directions/call buttons. */
function locationBlock(locale: string, p: { businessName: string; address: string; phone?: string | null; mapsUrl?: string | null }) {
  if (!p.address && !p.phone && !p.mapsUrl) return "";
  const c = chromeStrings(locale);
  const maps = mapsLink(p.businessName, p.address, p.mapsUrl);
  const inner = `
    <div style="font-size:16px;font-weight:700;color:${C.ink}">${esc(p.businessName)}</div>
    ${p.address ? `<div style="font-size:14px;color:${C.muted};margin-top:4px">${esc(p.address)}</div>` : ""}
    ${p.phone ? `<div style="font-size:14px;margin-top:4px"><a href="${esc(telLink(p.phone))}" style="color:${C.primary};text-decoration:none;font-weight:600">${esc(p.phone)}</a></div>` : ""}
    <div style="height:16px;line-height:16px;font-size:1px">&nbsp;</div>
    ${buttonRow([
      { href: maps, label: c.directions },
      { href: telLink(p.phone), label: c.call },
    ])}`;
  return sectionTitle(c.where) + panel(inner);
}

function salonFooter(businessName: string, address: string, phone?: string | null) {
  return [`<strong>${esc(businessName)}</strong>`, esc(address), esc(phone ?? "")].filter(Boolean).join(" · ");
}

function serviceValue(name: string, description?: string | null) {
  const desc = description?.trim();
  return `${esc(name)}${
    desc
      ? `<div style="font-weight:400;font-size:12.5px;line-height:1.5;color:${C.muted};margin-top:3px">${esc(desc.length > 160 ? `${desc.slice(0, 157)}…` : desc)}</div>`
      : ""
  }`;
}

/* ---------- account emails (VaraaAi → user) ---------- */

const VERIFY = {
  vi: {
    subject: "Xác minh email để kích hoạt salon của bạn",
    eyebrow: "Chỉ còn một bước",
    title: "Xác minh địa chỉ email",
    intro: "Xác nhận đây là email của bạn để kích hoạt salon trên VaraaAi.",
    hi: "Xin chào",
    body: "Cảm ơn bạn đã chọn VaraaAi! Nhấp vào nút bên dưới để xác minh email. Ngay sau đó salon của bạn sẽ được kích hoạt — không cần chờ duyệt.",
    cta: "Xác minh email",
    ignoreTitle: "Không phải bạn?",
    ignore: "Nếu bạn không tạo tài khoản VaraaAi, hãy bỏ qua email này — sẽ không có gì thay đổi.",
  },
  en: {
    subject: "Verify your email to activate your salon",
    eyebrow: "One last step",
    title: "Verify your email address",
    intro: "Confirm this is your email to activate your salon on VaraaAi.",
    hi: "Hi",
    body: "Thanks for choosing VaraaAi! Click the button below to verify your email. Your salon is activated straight away — no waiting for a review.",
    cta: "Verify email",
    ignoreTitle: "Wasn't you?",
    ignore: "If you didn't create a VaraaAi account, just ignore this email — nothing will change.",
  },
  fi: {
    subject: "Vahvista sähköpostisi ja aktivoi salonkisi",
    eyebrow: "Enää yksi vaihe",
    title: "Vahvista sähköpostiosoitteesi",
    intro: "Vahvista, että tämä on sähköpostisi, niin salonkisi aktivoituu VaraaAissa.",
    hi: "Hei",
    body: "Kiitos, että valitsit VaraaAin! Vahvista sähköpostisi alla olevasta painikkeesta. Salonkisi aktivoituu heti — tarkistusta ei tarvitse odottaa.",
    cta: "Vahvista sähköposti",
    ignoreTitle: "Etkö se ollut sinä?",
    ignore: "Jos et luonut VaraaAi-tiliä, voit jättää tämän viestin huomiotta — mitään ei muuteta.",
  },
};

export function verificationEmail(params: { name: string; verifyUrl: string; locale: string }) {
  const t = pick(params.locale, VERIFY);
  const c = chromeStrings(params.locale);
  return {
    subject: t.subject,
    html: emailLayout({
      locale: params.locale,
      preheader: t.intro,
      brand: null,
      hero: { eyebrow: t.eyebrow, title: t.title, intro: t.intro, badge: "✉" },
      body: [
        greeting(t.hi, params.name),
        para(t.body),
        button(params.verifyUrl, t.cta, { fallback: c.orCopyLink }),
        notice(t.ignoreTitle, t.ignore, "info", 28),
      ].join(""),
    }),
  };
}

const RESET = {
  vi: {
    subject: "Đặt lại mật khẩu VaraaAi",
    eyebrow: "Bảo mật tài khoản",
    title: "Đặt lại mật khẩu",
    intro: "Chọn mật khẩu mới cho tài khoản VaraaAi của bạn.",
    hi: "Xin chào",
    body: "Chúng tôi vừa nhận được yêu cầu đặt lại mật khẩu cho tài khoản này. Nhấp vào nút bên dưới để chọn mật khẩu mới.",
    cta: "Đặt mật khẩu mới",
    validTitle: "Liên kết có hiệu lực trong 1 giờ",
    valid: "Nếu bạn không yêu cầu điều này, hãy bỏ qua email — mật khẩu của bạn vẫn giữ nguyên và tài khoản vẫn an toàn.",
  },
  en: {
    subject: "Reset your VaraaAi password",
    eyebrow: "Account security",
    title: "Reset your password",
    intro: "Choose a new password for your VaraaAi account.",
    hi: "Hi",
    body: "We just received a request to reset the password for this account. Click the button below to choose a new one.",
    cta: "Choose a new password",
    validTitle: "This link is valid for 1 hour",
    valid: "If you didn't ask for this, just ignore this email — your password stays the same and your account is safe.",
  },
  fi: {
    subject: "Vaihda VaraaAi-salasanasi",
    eyebrow: "Tilin turvallisuus",
    title: "Salasanan vaihto",
    intro: "Valitse uusi salasana VaraaAi-tilillesi.",
    hi: "Hei",
    body: "Saimme pyynnön vaihtaa tämän tilin salasana. Valitse uusi salasana alla olevasta painikkeesta.",
    cta: "Valitse uusi salasana",
    validTitle: "Linkki on voimassa 1 tunnin",
    valid: "Jos et pyytänyt tätä, voit jättää viestin huomiotta — salasanasi pysyy ennallaan ja tilisi on turvassa.",
  },
};

export function passwordResetEmail(params: { name: string; resetUrl: string; locale: string }) {
  const t = pick(params.locale, RESET);
  const c = chromeStrings(params.locale);
  return {
    subject: t.subject,
    html: emailLayout({
      locale: params.locale,
      preheader: t.intro,
      brand: null,
      hero: { eyebrow: t.eyebrow, title: t.title, intro: t.intro, badge: "🔑" },
      body: [
        greeting(t.hi, params.name),
        para(t.body),
        button(params.resetUrl, t.cta, { fallback: c.orCopyLink }),
        notice(t.validTitle, t.valid, "warm", 28),
      ].join(""),
    }),
  };
}

const WELCOME = {
  vi: {
    subject: "Chào mừng bạn đến với VaraaAi!",
    eyebrow: "Chào mừng",
    title: "Tài khoản của bạn đã sẵn sàng",
    intro: "Đặt lịch làm đẹp chưa bao giờ dễ dàng đến thế.",
    hi: "Xin chào",
    body: "Rất vui được chào đón bạn! Từ giờ, mọi lịch hẹn làm đẹp của bạn đều nằm gọn trong một nơi.",
    steps: [
      { title: "Tìm salon ưng ý", body: "Xem dịch vụ, bảng giá, hình ảnh và đánh giá thật từ khách hàng." },
      { title: "Đặt lịch 24/7", body: "Chọn giờ còn trống và nhận xác nhận ngay — không cần gọi điện." },
      { title: "Quản lý dễ dàng", body: "Xem lại, dời hoặc hủy lịch hẹn ngay trong tài khoản của bạn." },
    ],
    cta: "Khám phá salon",
  },
  en: {
    subject: "Welcome to VaraaAi!",
    eyebrow: "Welcome",
    title: "Your account is ready",
    intro: "Booking beauty appointments has never been easier.",
    hi: "Hi",
    body: "We're so glad to have you! From now on, all your beauty appointments live in one place.",
    steps: [
      { title: "Find a salon you love", body: "Browse services, prices, photos and genuine customer reviews." },
      { title: "Book 24/7", body: "Pick a free time and get an instant confirmation — no phone calls." },
      { title: "Stay in control", body: "Review, reschedule or cancel your bookings from your account." },
    ],
    cta: "Explore salons",
  },
  fi: {
    subject: "Tervetuloa VaraaAihin!",
    eyebrow: "Tervetuloa",
    title: "Tilisi on valmis",
    intro: "Kauneusaikojen varaaminen ei ole koskaan ollut helpompaa.",
    hi: "Hei",
    body: "Ihanaa, että liityit! Tästä lähtien kaikki kauneusaikasi ovat yhdessä paikassa.",
    steps: [
      { title: "Löydä mieluisa salonki", body: "Selaa palveluita, hintoja, kuvia ja aitoja asiakasarvioita." },
      { title: "Varaa 24/7", body: "Valitse vapaa aika ja saat vahvistuksen heti — ei puheluita." },
      { title: "Kaikki hallinnassa", body: "Katso, siirrä tai peru varauksiasi omalta tililtäsi." },
    ],
    cta: "Tutustu salonkeihin",
  },
};

/** Sent right after a customer finishes the standalone sign-up form (not
 * the guest-checkout-creates-an-account path on the booking widget, which
 * already gets its own account mention folded into the booking
 * confirmation email instead — see bookingConfirmationEmail). */
export function registrationSuccessEmail(params: { name: string; locale: string }) {
  const t = pick(params.locale, WELCOME);
  return {
    subject: t.subject,
    html: emailLayout({
      locale: params.locale,
      preheader: t.intro,
      brand: null,
      hero: { eyebrow: t.eyebrow, title: t.title, intro: t.intro, badge: "✦" },
      body: [
        greeting(t.hi, params.name),
        para(t.body),
        steps(t.steps),
        button(sitePath(params.locale, "/search"), t.cta),
      ].join(""),
    }),
  };
}

const READY = {
  vi: {
    subject: "Salon của bạn đã sẵn sàng đón khách!",
    eyebrow: "Chúc mừng",
    title: (b: string) => `${b} đã lên sóng!`,
    intro: "Khách hàng đã có thể tìm thấy và đặt lịch với bạn ngay bây giờ.",
    hi: "Xin chào",
    body: "Chào mừng bạn đến với VaraaAi! Để salon thu hút nhiều lượt đặt lịch nhất ngay từ tuần đầu, hãy hoàn thiện vài bước sau:",
    steps: [
      { title: "Thêm dịch vụ và bảng giá", body: "Mô tả rõ ràng, thời lượng chính xác giúp khách tự tin đặt lịch." },
      { title: "Thêm nhân viên và giờ làm", body: "Khách có thể chọn đúng người họ tin tưởng." },
      { title: "Tải logo và ảnh đẹp", body: "Salon có hình ảnh nhận được nhiều lượt đặt hơn hẳn." },
      { title: "Chia sẻ liên kết đặt lịch", body: "Đặt vào Facebook, Instagram, Google — hoặc in mã QR miễn phí." },
    ],
    cta: "Vào trang quản trị",
    guide: "Xem hướng dẫn từng bước",
  },
  en: {
    subject: "Your salon is ready for bookings!",
    eyebrow: "Congratulations",
    title: (b: string) => `${b} is live!`,
    intro: "Customers can now find you and book right away.",
    hi: "Hi",
    body: "Welcome to VaraaAi! To get the most bookings from your very first week, finish these few steps:",
    steps: [
      { title: "Add services and prices", body: "Clear descriptions and accurate durations help customers book with confidence." },
      { title: "Add staff and working hours", body: "Customers can choose exactly who they trust." },
      { title: "Upload a logo and great photos", body: "Salons with photos get noticeably more bookings." },
      { title: "Share your booking link", body: "Add it to Facebook, Instagram and Google — or print a free QR poster." },
    ],
    cta: "Go to dashboard",
    guide: "Read the step-by-step guide",
  },
  fi: {
    subject: "Salonkisi on valmis ottamaan varauksia!",
    eyebrow: "Onnittelut",
    title: (b: string) => `${b} on nyt avoinna!`,
    intro: "Asiakkaat voivat nyt löytää sinut ja varata ajan heti.",
    hi: "Hei",
    body: "Tervetuloa VaraaAihin! Saat eniten varauksia jo ensimmäisellä viikolla, kun viimeistelet nämä vaiheet:",
    steps: [
      { title: "Lisää palvelut ja hinnat", body: "Selkeät kuvaukset ja tarkat kestot tekevät varaamisesta helppoa." },
      { title: "Lisää työntekijät ja työajat", body: "Asiakas voi valita juuri sen tekijän, johon luottaa." },
      { title: "Lataa logo ja kauniita kuvia", body: "Kuvalliset salongit saavat selvästi enemmän varauksia." },
      { title: "Jaa varauslinkkisi", body: "Lisää se Facebookiin, Instagramiin ja Googleen — tai tulosta ilmainen QR-juliste." },
    ],
    cta: "Siirry hallintapaneeliin",
    guide: "Lue vaiheittainen opas",
  },
};

export function businessReadyEmail(params: {
  ownerName: string;
  businessName: string;
  dashboardUrl: string;
  guideUrl: string;
  locale: string;
}) {
  const t = pick(params.locale, READY);
  return {
    subject: t.subject,
    html: emailLayout({
      locale: params.locale,
      preheader: t.intro,
      brand: null,
      hero: { eyebrow: t.eyebrow, title: esc(t.title(params.businessName)), intro: t.intro, badge: "★" },
      body: [
        greeting(t.hi, params.ownerName),
        para(t.body),
        steps(t.steps),
        button(params.dashboardUrl, t.cta),
        `<p style="margin:14px 0 0;text-align:center;font-size:14px"><a href="${esc(params.guideUrl)}" style="color:${C.primary};font-weight:600;text-decoration:none">${t.guide} →</a></p>`,
      ].join(""),
    }),
  };
}

const REJECTED = {
  vi: {
    subject: "Hồ sơ doanh nghiệp của bạn chưa được duyệt",
    eyebrow: "Cập nhật hồ sơ",
    title: "Hồ sơ chưa được duyệt",
    intro: (b: string) => `Rất tiếc, ${b} chưa thể được kích hoạt lúc này.`,
    hi: "Xin chào",
    body: (b: string) => `Cảm ơn bạn đã đăng ký <strong>${b}</strong> trên VaraaAi. Sau khi xem xét, chúng tôi chưa thể duyệt hồ sơ này.`,
    reason: "Lý do",
    next: "Bạn có thể cập nhật thông tin và gửi lại bất cứ lúc nào. Nếu cần hỗ trợ, hãy nhắn cho đội ngũ VaraaAi trong trang quản trị.",
    cta: "Cập nhật hồ sơ",
  },
  en: {
    subject: "Your business application was not approved",
    eyebrow: "Application update",
    title: "Application not approved",
    intro: (b: string) => `Unfortunately ${b} can't be activated just yet.`,
    hi: "Hi",
    body: (b: string) => `Thank you for registering <strong>${b}</strong> on VaraaAi. After reviewing it, we're unable to approve the application at this time.`,
    reason: "Reason",
    next: "You can update your details and resubmit at any time. If you need help, message the VaraaAi team from your dashboard.",
    cta: "Update application",
  },
  fi: {
    subject: "Yrityshakemustasi ei hyväksytty",
    eyebrow: "Hakemuksen tila",
    title: "Hakemusta ei hyväksytty",
    intro: (b: string) => `Valitettavasti ${b} ei voi vielä aktivoitua.`,
    hi: "Hei",
    body: (b: string) => `Kiitos, että rekisteröit yrityksen <strong>${b}</strong> VaraaAihin. Tarkistuksen jälkeen emme valitettavasti voi hyväksyä hakemusta tällä hetkellä.`,
    reason: "Syy",
    next: "Voit päivittää tiedot ja lähettää hakemuksen uudelleen milloin tahansa. Jos tarvitset apua, lähetä viesti VaraaAi-tiimille hallintapaneelista.",
    cta: "Päivitä hakemus",
  },
};

/** Sent when an admin rejects a salon application (admin businesses PATCH). */
export function businessRejectedEmail(params: { ownerName: string; businessName: string; reason?: string | null; locale: string }) {
  const t = pick(params.locale, REJECTED);
  const b = esc(params.businessName);
  return {
    subject: t.subject,
    html: emailLayout({
      locale: params.locale,
      preheader: plain(t.intro(params.businessName)),
      brand: null,
      hero: { eyebrow: t.eyebrow, title: t.title, intro: t.intro(b), tone: "alert", badge: "!" },
      body: [
        greeting(t.hi, params.ownerName),
        para(t.body(b)),
        params.reason?.trim() ? notice(t.reason, esc(params.reason.trim()), "alert", 4) : "",
        para(t.next, { mt: 20 }),
        button(sitePath(params.locale, "/business"), t.cta, { variant: "dark" }),
      ].join(""),
    }),
  };
}

/* ---------- booking emails (salon → customer) ---------- */

interface BookingCore {
  customerName: string;
  businessName: string;
  serviceName: string;
  startsAt: Date;
  /** Enables the end time, duration and the calendar buttons. */
  endsAt?: Date | null;
  locale: string;
  businessTimezone: string;
  staffName?: string | null;
  businessAddress?: string | null;
  businessCity?: string | null;
  googleMapsUrl?: string | null;
  businessPhone?: string | null;
  /** Site-relative or absolute; shown at the top of the email. */
  businessLogoUrl?: string | null;
  /** The salon's public page, for "book again" links. */
  salonUrl?: string | null;
  bookingId?: string | null;
}

function calendarBits(p: BookingCore) {
  if (!p.endsAt) return null;
  const address = [p.businessAddress, p.businessCity].filter(Boolean).join(", ");
  const event = {
    uid: p.bookingId ?? `${p.startsAt.getTime()}-${p.businessName}`,
    title: `${p.serviceName} – ${p.businessName}`,
    start: p.startsAt,
    end: p.endsAt,
    location: address ? `${p.businessName}, ${address}` : p.businessName,
    description: [p.staffName ? `${p.staffName}` : null, p.businessPhone].filter(Boolean).join(" · ") || null,
  };
  return { event, url: googleCalendarUrl(event) };
}

/** The appointment card shared by confirmation / reschedule / reminder. */
function appointmentCard(
  p: BookingCore & { serviceDescription?: string | null; priceText?: string | null },
  eyebrow: string,
  opts: { accent?: string; calendar?: boolean } = {}
) {
  const s = bookingEmailStrings(p.locale);
  const c = chromeStrings(p.locale);
  const d = dateParts(p.startsAt, p.endsAt, p.locale, p.businessTimezone);
  const minutes = durationMinutes(p.startsAt, p.endsAt);
  const cal = opts.calendar !== false ? calendarBits(p) : null;
  const ref = bookingRef(p.bookingId);
  return panel(
    appointmentHeader(d, eyebrow, opts.accent) +
      hairline(18) +
      rows([
        { label: s.serviceLabel, value: serviceValue(p.serviceName, p.serviceDescription) },
        p.staffName ? { label: s.staffLabel, value: esc(p.staffName) } : null,
        minutes ? { label: c.duration, value: esc(c.minutes(minutes)) } : null,
        p.priceText ? { label: s.amountLabel, value: esc(p.priceText), strong: true } : null,
        ref ? { label: c.bookingRef, value: ref } : null,
      ]) +
      (cal ? hairline(14) + buttonRow([{ href: cal.url, label: `📅&nbsp; ${c.addToCalendar}` }]) : ""),
    { pad: "22px 22px 20px" }
  );
}

export function bookingConfirmationEmail(params: BookingCore & {
  serviceDescription?: string | null;
  priceCents: number;
  currency: string;
  staffMessage?: string | null;
  cancellationWindowHours: number;
  cancellationPolicy?: string | null;
  /** Included only for the bank-transfer payment method, so the customer
   * has the salon's account details handy without digging through the site. */
  bankInfo?: {
    bankName: string | null;
    bankAccountNumber: string | null;
    bankAccountName: string | null;
    bankBic: string | null;
  };
  /** Set only when this booking's guest checkout also created the
   * customer's account — never the password itself, see newAccountBody. */
  newAccountEmail?: string | null;
  manageBookingUrl?: string | null;
}) {
  const s = bookingEmailStrings(params.locale);
  const x = customerExtra(params.locale);
  const c = chromeStrings(params.locale);
  const priceText = formatMoney(params.priceCents, params.currency, params.locale);
  const address = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");
  const cancellationText = params.cancellationPolicy || s.defaultCancellationPolicy(params.cancellationWindowHours);
  const intro = s.confirmedIntro(esc(params.serviceName), esc(params.businessName));
  const cal = calendarBits(params);
  const d = dateParts(params.startsAt, params.endsAt, params.locale, params.businessTimezone);

  const bank = params.bankInfo;
  const bankBlock =
    bank && (bank.bankAccountNumber || bank.bankName)
      ? sectionTitle(s.bankDetailsTitle) +
        panel(
          rows([
            bank.bankName ? { label: s.bankNameLabel, value: esc(bank.bankName) } : null,
            bank.bankAccountNumber
              ? { label: s.accountNumberLabel, value: `<span style="font-family:Menlo,Consolas,monospace;letter-spacing:1px">${esc(bank.bankAccountNumber)}</span>`, strong: true }
              : null,
            bank.bankAccountName ? { label: s.accountHolderLabel, value: esc(bank.bankAccountName) } : null,
            bank.bankBic ? { label: "BIC/SWIFT", value: esc(bank.bankBic) } : null,
            { label: s.amountLabel, value: esc(priceText), strong: true },
          ]),
          { bg: "#fbf6ec", border: "#efe2c6" }
        )
      : "";

  const body = [
    greeting(s.hi, params.customerName),
    para(intro),
    appointmentCard({ ...params, priceText }, c.when),
    cal ? para(esc(c.calendarFile), { small: true, muted: true, mt: 10 }) : "",
    params.staffMessage?.trim()
      ? sectionTitle(params.staffName ? esc(x.staffSays(params.staffName)) : c.note) + quote(esc(params.staffMessage.trim()))
      : "",
    bankBlock,
    locationBlock(params.locale, {
      businessName: params.businessName,
      address,
      phone: params.businessPhone,
      mapsUrl: params.googleMapsUrl,
    }),
    notice(s.cancellationPolicyLabel, `<span style="white-space:pre-line">${esc(cancellationText)}</span>`, "info", 24),
    params.newAccountEmail ? notice(s.newAccountTitle, s.newAccountBody(esc(params.newAccountEmail)), "success", 12) : "",
    params.manageBookingUrl ? button(params.manageBookingUrl, s.viewMyBookings, { variant: "dark" }) : "",
    `<p style="margin:28px 0 0;text-align:center;font-family:Georgia,serif;font-size:17px;font-style:italic;color:${C.primaryDeep}">${esc(x.seeYou(params.businessName))}</p>`,
  ].join("");

  return {
    subject: s.subjectConfirmed(params.businessName),
    html: emailLayout({
      locale: params.locale,
      preheader: `${d.full}, ${d.time} · ${params.serviceName}`,
      brand: salonBrand(params.businessName, params.businessLogoUrl, params.businessCity),
      hero: { eyebrow: x.eyebrowConfirmed, title: s.confirmedHeading, tone: "success", badge: "✓" },
      body,
      footerExtra: salonFooter(params.businessName, address, params.businessPhone),
    }),
    attachments: cal ? [icsAttachment(cal.event)] : undefined,
  };
}

/** Sent whenever the salon (not the customer) moves a booking to a new time
 * or staff member from the dashboard calendar — same fields as the original
 * confirmation email (see bookingConfirmationEmail), just framed around the
 * change rather than the initial booking. Matches the "your booking was
 * moved" email pattern from timma.fi. */
export function bookingRescheduledEmail(params: BookingCore & {
  serviceDescription?: string | null;
  priceCents: number;
  currency: string;
  cancellationWindowHours: number;
  cancellationPolicy?: string | null;
  manageBookingUrl: string;
}) {
  const s = bookingEmailStrings(params.locale);
  const x = customerExtra(params.locale);
  const priceText = formatMoney(params.priceCents, params.currency, params.locale);
  const address = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");
  const cancellationText = params.cancellationPolicy || s.defaultCancellationPolicy(params.cancellationWindowHours);
  const intro = s.rescheduledIntro(esc(params.businessName), esc(params.serviceName));
  const cal = calendarBits(params);
  const d = dateParts(params.startsAt, params.endsAt, params.locale, params.businessTimezone);
  const newTime = s.newTimeLabel.replace(/✨/g, "").trim();

  const body = [
    greeting(s.hi, params.customerName),
    para(intro),
    appointmentCard({ ...params, priceText }, esc(newTime), { accent: C.coral }),
    locationBlock(params.locale, {
      businessName: params.businessName,
      address,
      phone: params.businessPhone,
      mapsUrl: params.googleMapsUrl,
    }),
    notice(s.cancellationPolicyLabel, `<span style="white-space:pre-line">${esc(cancellationText)}</span>`, "info", 24),
    notice(s.wantToCancelTitle, s.wantToCancelBody, "warm", 12),
    button(params.manageBookingUrl, s.viewMyBookings, { variant: "dark" }),
  ].join("");

  return {
    subject: s.subjectRescheduled(params.businessName),
    html: emailLayout({
      locale: params.locale,
      preheader: `${newTime}: ${d.full}, ${d.time}`,
      brand: salonBrand(params.businessName, params.businessLogoUrl, params.businessCity),
      hero: { eyebrow: x.eyebrowRescheduled, title: s.rescheduledHeading, tone: "brand", badge: "↻" },
      body,
      footerExtra: salonFooter(params.businessName, address, params.businessPhone),
    }),
    // A growing SEQUENCE makes calendar apps replace the earlier event.
    attachments: cal ? [icsAttachment(cal.event, Math.floor(Date.now() / 1000))] : undefined,
  };
}

/** Sent by the reminders cron (see /api/cron/reminders) at three fixed lead
 * times before a CONFIRMED booking — 24h, 2h and 15min — which the cron job
 * itself decides by checking the matching reminder*SentAt column. The email
 * text deliberately never states a specific "in X hours" — a reminder can
 * fire later than its nominal threshold (e.g. the cron catching up after a
 * gap), so a hardcoded duration would sometimes be wrong; the accurate
 * scheduled date/time is shown instead. */
export function appointmentReminderEmail(params: BookingCore) {
  const s = bookingEmailStrings(params.locale);
  const x = customerExtra(params.locale);
  const c = chromeStrings(params.locale);
  const address = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");
  const intro = s.reminderIntro(esc(params.businessName), esc(params.serviceName));
  const d = dateParts(params.startsAt, params.endsAt, params.locale, params.businessTimezone);

  const body = [
    greeting(s.hi, params.customerName),
    para(intro),
    appointmentCard(params, c.when, { accent: C.teal }),
    locationBlock(params.locale, {
      businessName: params.businessName,
      address,
      phone: params.businessPhone,
      mapsUrl: params.googleMapsUrl,
    }),
    notice(x.tipsTitle, x.tips, "success", 24),
    `<p style="margin:28px 0 0;text-align:center;font-family:Georgia,serif;font-size:17px;font-style:italic;color:${C.primaryDeep}">${esc(x.seeYou(params.businessName))}</p>`,
  ].join("");

  return {
    subject: s.subjectReminder(params.businessName),
    html: emailLayout({
      locale: params.locale,
      preheader: `${d.full}, ${d.time} · ${params.serviceName}`,
      brand: salonBrand(params.businessName, params.businessLogoUrl, params.businessCity),
      hero: { eyebrow: x.eyebrowReminder, title: `${d.weekday.charAt(0).toLocaleUpperCase() + d.weekday.slice(1)}, ${d.time}`, tone: "calm", badge: "⏰" },
      body,
      footerExtra: salonFooter(params.businessName, address, params.businessPhone),
    }),
  };
}

/** Sent to the customer when they cancel their own booking (see
 * /api/bookings/[id]/cancel), so they have proof it went through. */
export function bookingCancelledEmail(params: BookingCore) {
  const s = bookingEmailStrings(params.locale);
  const x = customerExtra(params.locale);
  const address = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");
  const intro = x.cancelledIntro(esc(params.serviceName), esc(params.businessName));
  const d = dateParts(params.startsAt, params.endsAt, params.locale, params.businessTimezone);

  const body = [
    greeting(s.hi, params.customerName),
    para(intro),
    `<div style="opacity:.75">${appointmentCard(params, esc(x.eyebrowCancelled), { accent: "#9b93a8", calendar: false })}</div>`,
    para(x.cancelledNote, { mt: 22 }),
    params.salonUrl ? button(params.salonUrl, x.bookAgain) : "",
  ].join("");

  return {
    subject: x.subjectCancelled(params.businessName),
    html: emailLayout({
      locale: params.locale,
      preheader: `${d.full}, ${d.time} · ${params.serviceName}`,
      brand: salonBrand(params.businessName, params.businessLogoUrl, params.businessCity),
      hero: { eyebrow: x.eyebrowCancelled, title: x.cancelledHeading, tone: "alert", badge: "✕" },
      body,
      footerExtra: salonFooter(params.businessName, address, params.businessPhone),
    }),
  };
}

/** Sent by the reminders cron one day after a (non-cancelled) booking's
 * appointment ended, asking the customer to leave a review — see
 * /api/cron/reminders. Never waits on the salon marking the booking
 * "completed"; only a cancelled booking is skipped. `reviewUrl` deep-links
 * straight into the review prompt on the customer's own bookings page (see
 * ?review= handling in customer-bookings-list.tsx). */
export function reviewRequestEmail(params: {
  customerName: string;
  businessName: string;
  serviceName: string;
  locale: string;
  reviewUrl: string;
  businessLogoUrl?: string | null;
  businessCity?: string | null;
}) {
  const s = bookingEmailStrings(params.locale);
  const x = customerExtra(params.locale);
  const intro = s.reviewIntro(esc(params.businessName));
  const starLinks = [1, 2, 3, 4, 5]
    .map(
      () =>
        `<td style="padding:0 4px"><a href="${esc(params.reviewUrl)}" style="text-decoration:none;font-size:38px;line-height:1;color:#f5b041">★</a></td>`
    )
    .join("");

  const body = [
    greeting(s.hi, params.customerName),
    para(intro),
    panel(
      `<div style="text-align:center;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.muted}">${esc(params.serviceName)}</div>
       <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:12px auto 6px"><tr>${starLinks}</tr></table>
       <div style="text-align:center;font-size:13px;color:${C.muted}">${x.tapStar}</div>`,
      { pad: "22px 18px", mt: 6 }
    ),
    button(params.reviewUrl, s.reviewCTA, { variant: "gold" }),
    para(x.reviewQuick, { small: true, muted: true, center: true, mt: 12 }),
  ].join("");

  return {
    subject: s.subjectReview(params.businessName),
    html: emailLayout({
      locale: params.locale,
      preheader: plain(intro),
      brand: salonBrand(params.businessName, params.businessLogoUrl, params.businessCity),
      hero: { eyebrow: x.eyebrowReview, title: s.reviewHeading, tone: "gold", badge: "★" },
      body,
    }),
  };
}

const RATED = {
  vi: {
    subject: (b: string, r: number) => `${b} đã đánh giá bạn ${r} sao`,
    eyebrow: "Đánh giá khách hàng",
    title: "Bạn vừa nhận được một đánh giá",
    hi: "Xin chào",
    body: (b: string) => `Sau lịch hẹn gần đây, <strong>${b}</strong> đã đánh giá bạn với tư cách khách hàng:`,
    thanks: "Cảm ơn bạn đã là một vị khách tuyệt vời!",
    privacy: "Đánh giá này chỉ dùng nội bộ để salon tham khảo, không bao giờ hiển thị công khai.",
  },
  en: {
    subject: (b: string, r: number) => `${b} rated you ${r} stars`,
    eyebrow: "Customer rating",
    title: "You just received a rating",
    hi: "Hi",
    body: (b: string) => `After your recent appointment, <strong>${b}</strong> rated you as a customer:`,
    thanks: "Thank you for being a wonderful guest!",
    privacy: "This rating is for the salon's own internal reference only — it's never shown publicly.",
  },
  fi: {
    subject: (b: string, r: number) => `${b} antoi sinulle ${r} tähteä`,
    eyebrow: "Asiakasarvio",
    title: "Sait juuri arvion",
    hi: "Hei",
    body: (b: string) => `Viimeisimmän käyntisi jälkeen <strong>${b}</strong> arvioi sinut asiakkaana:`,
    thanks: "Kiitos, että olet ihana asiakas!",
    privacy: "Arvio on vain salongin sisäiseen käyttöön — sitä ei koskaan näytetä julkisesti.",
  },
};

/** Sent the moment a salon rates a customer (see POST
 * /api/business/bookings/[id]/customer-review) — tells the customer only
 * the star rating, never the salon's private note. */
export function ownerReviewedYouEmail(params: {
  customerName: string;
  businessName: string;
  rating: number;
  locale: string;
  businessLogoUrl?: string | null;
}) {
  const t = pick(params.locale, RATED);
  return {
    subject: t.subject(params.businessName, params.rating),
    html: emailLayout({
      locale: params.locale,
      preheader: plain(t.body(params.businessName)),
      brand: salonBrand(params.businessName, params.businessLogoUrl),
      hero: { eyebrow: t.eyebrow, title: t.title, tone: "brand", badge: "♥" },
      body: [
        greeting(t.hi, params.customerName),
        para(t.body(esc(params.businessName))),
        panel(
          `${stars(params.rating, 34)}<div style="text-align:center;font-size:14px;font-weight:700;color:${C.ink};margin-top:10px">${params.rating}/5</div>`,
          { pad: "24px 18px" }
        ),
        params.rating >= 4 ? para(t.thanks, { center: true, mt: 18 }) : "",
        notice(null, t.privacy, "info", 18),
      ].join(""),
    }),
  };
}

const GIFT_BUY = {
  vi: {
    subject: (b: string, code: string) => `Thẻ quà tặng ${b} — mã ${code}`,
    eyebrow: "Thẻ quà tặng",
    title: "Cảm ơn bạn đã mua thẻ quà tặng",
    intro: (b: string) => `Món quà làm đẹp từ ${b} đã sẵn sàng.`,
    hi: "Xin chào",
    card: "Thẻ",
    service: "Dịch vụ",
    discount: "Ưu đãi",
    off: (p: number) => `Giảm ${p}%`,
    price: "Giá",
    validity: "Hiệu lực",
    validDays: (n: number) => `${n} ngày kể từ khi kích hoạt`,
    uses: "Số lần dùng",
    code: "Mã thẻ",
    howTitle: "Cách sử dụng",
    how: "Đưa mã hoặc mã QR này cho salon khi đến làm dịch vụ. Thẻ được kích hoạt sau khi salon xác nhận thanh toán.",
    attached: "Mã QR cũng được đính kèm trong email để bạn lưu lại.",
  },
  en: {
    subject: (b: string, code: string) => `Gift card from ${b} — code ${code}`,
    eyebrow: "Gift card",
    title: "Thanks for buying a gift card",
    intro: (b: string) => `Your beauty gift from ${b} is ready.`,
    hi: "Hi",
    card: "Card",
    service: "Service",
    discount: "Benefit",
    off: (p: number) => `${p}% off`,
    price: "Price",
    validity: "Valid",
    validDays: (n: number) => `${n} days after activation`,
    uses: "Uses",
    code: "Card code",
    howTitle: "How to use it",
    how: "Show this code or QR at the salon. The card activates once the salon confirms payment.",
    attached: "The QR code is also attached so you can keep it.",
  },
  fi: {
    subject: (b: string, code: string) => `Lahjakortti: ${b} — koodi ${code}`,
    eyebrow: "Lahjakortti",
    title: "Kiitos lahjakortin ostosta",
    intro: (b: string) => `Kauneuslahjasi paikasta ${b} on valmis.`,
    hi: "Hei",
    card: "Kortti",
    service: "Palvelu",
    discount: "Etu",
    off: (p: number) => `${p} % alennus`,
    price: "Hinta",
    validity: "Voimassa",
    validDays: (n: number) => `${n} päivää aktivoinnista`,
    uses: "Käyttökerrat",
    code: "Kortin koodi",
    howTitle: "Näin käytät korttia",
    how: "Näytä tämä koodi tai QR-koodi salongissa. Kortti aktivoituu, kun salonki on vahvistanut maksun.",
    attached: "QR-koodi on myös liitteenä, jotta voit tallentaa sen.",
  },
};

/** Sent to someone who buys a gift card on a salon page (POST
 * /api/gift-cards/purchase). */
export function giftCardPurchaseEmail(params: {
  buyerName: string;
  businessName: string;
  cardName: string;
  serviceName: string;
  discountPercent: number;
  priceText: string;
  validDays: number;
  maxUses: number;
  code: string;
  qrUrl: string;
  locale: string;
  businessLogoUrl?: string | null;
}) {
  const t = pick(params.locale, GIFT_BUY);
  return {
    subject: t.subject(params.businessName, params.code),
    html: emailLayout({
      locale: params.locale,
      preheader: t.intro(params.businessName),
      brand: salonBrand(params.businessName, params.businessLogoUrl),
      hero: { eyebrow: t.eyebrow, title: t.title, intro: esc(t.intro(params.businessName)), tone: "gold", badge: "🎁" },
      body: [
        greeting(t.hi, params.buyerName),
        panel(
          rows([
            { label: t.card, value: esc(params.cardName), strong: true },
            { label: t.service, value: esc(params.serviceName) },
            { label: t.discount, value: esc(t.off(params.discountPercent)) },
            { label: t.price, value: esc(params.priceText), strong: true },
            { label: t.validity, value: esc(t.validDays(params.validDays)) },
            { label: t.uses, value: String(params.maxUses) },
          ])
        ),
        codeTicket(t.code, params.code, { qrUrl: params.qrUrl }),
        notice(t.howTitle, t.how, "gold", 22),
        para(t.attached, { small: true, muted: true, center: true, mt: 14 }),
      ].join(""),
    }),
  };
}

/* ---------- salon owner notifications (VaraaAi → owner) ---------- */

/** Sent to a salon owner when a customer messages for the first time, or
 * after a week of silence — see the messages POST route. */
export function newChatMessageEmail(params: {
  ownerName: string;
  customerName: string;
  locale: string;
  messagesUrl: string;
  /** First words of the message, shown as a quote. */
  preview?: string | null;
}) {
  const s = NEW_MESSAGE_STRINGS[params.locale] ?? NEW_MESSAGE_STRINGS.en;
  const o = ownerExtra(params.locale);
  const body = s.body(esc(params.customerName));
  const preview = params.preview?.trim();
  return {
    subject: s.subject(params.customerName),
    html: emailLayout({
      locale: params.locale,
      preheader: preview ? `${params.customerName}: ${preview.slice(0, 90)}` : plain(body),
      brand: null,
      hero: { eyebrow: o.messageEyebrow, title: s.heading, tone: "brand", badge: "💬" },
      body: [
        greeting(s.hi, params.ownerName),
        para(body),
        preview ? quote(esc(preview.length > 280 ? `${preview.slice(0, 277)}…` : preview)) : "",
        button(params.messagesUrl, s.cta),
        notice(null, o.replyFast, "success", 26),
      ].join(""),
    }),
  };
}

const HUMAN = {
  vi: {
    subject: (c: string) => `${c} muốn nói chuyện trực tiếp với bạn`,
    title: "Khách muốn gặp bạn trực tiếp",
    hi: "Xin chào",
    body: (c: string) => `<strong>${c}</strong> đang trò chuyện với trợ lý AI và vừa yêu cầu được nói chuyện trực tiếp với bạn. Hãy vào xem và trả lời khách sớm nhé.`,
    cta: "Trả lời khách ngay",
  },
  en: {
    subject: (c: string) => `${c} wants to talk to you directly`,
    title: "A customer wants you directly",
    hi: "Hi",
    body: (c: string) => `<strong>${c}</strong> was chatting with your AI assistant and just asked to speak with you directly. Take a look and reply when you can.`,
    cta: "Reply now",
  },
  fi: {
    subject: (c: string) => `${c} haluaa jutella kanssasi suoraan`,
    title: "Asiakas haluaa puhua sinulle",
    hi: "Hei",
    body: (c: string) => `<strong>${c}</strong> keskusteli AI-avustajasi kanssa ja pyysi juuri saada puhua suoraan sinun kanssasi. Käy katsomassa ja vastaa, kun ehdit.`,
    cta: "Vastaa nyt",
  },
};

/** Sent the moment a customer taps "talk to the real owner" while chatting
 * with the AI assistant (see POST /api/chat/conversations/[id]/request-human)
 * — paired with a best-effort push notification (src/lib/push.ts). */
export function customerWantsHumanEmail(params: {
  ownerName: string;
  customerName: string;
  locale: string;
  messagesUrl: string;
}) {
  const t = pick(params.locale, HUMAN);
  const o = ownerExtra(params.locale);
  return {
    subject: t.subject(params.customerName),
    html: emailLayout({
      locale: params.locale,
      preheader: plain(t.body(params.customerName)),
      brand: null,
      hero: { eyebrow: o.humanEyebrow, title: t.title, tone: "alert", badge: "🙋" },
      body: [
        greeting(t.hi, params.ownerName),
        para(t.body(esc(params.customerName))),
        notice(null, o.aiPaused, "warm", 4),
        button(params.messagesUrl, t.cta, { variant: "alert" }),
      ].join(""),
    }),
  };
}

interface OwnerBookingParams {
  ownerName: string;
  customerName: string;
  serviceName: string;
  startsAt: Date;
  endsAt?: Date | null;
  locale: string;
  businessTimezone: string;
  bookingsUrl: string;
  businessName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
  staffName?: string | null;
  priceCents?: number | null;
  currency?: string | null;
  customerNote?: string | null;
  bookingId?: string | null;
}

function ownerBookingCard(p: OwnerBookingParams, eyebrow: string, accent: string) {
  const s = OWNER_BOOKING_STRINGS[p.locale] ?? OWNER_BOOKING_STRINGS.en;
  const b = bookingEmailStrings(p.locale);
  const c = chromeStrings(p.locale);
  const d = dateParts(p.startsAt, p.endsAt, p.locale, p.businessTimezone);
  const minutes = durationMinutes(p.startsAt, p.endsAt);
  const ref = bookingRef(p.bookingId);
  const price = p.priceCents != null && p.currency ? formatMoney(p.priceCents, p.currency, p.locale) : null;
  return panel(
    appointmentHeader(d, eyebrow, accent) +
      hairline(18) +
      rows([
        { label: c.customer, value: esc(p.customerName), strong: true },
        p.customerPhone ? { label: c.phone, value: `<a href="${esc(telLink(p.customerPhone))}" style="color:${C.primary};text-decoration:none">${esc(p.customerPhone)}</a>` } : null,
        p.customerEmail ? { label: c.email, value: `<a href="mailto:${esc(p.customerEmail)}" style="color:${C.primary};text-decoration:none;word-break:break-all">${esc(p.customerEmail)}</a>` } : null,
        { label: b.serviceLabel, value: esc(p.serviceName) },
        p.staffName ? { label: b.staffLabel, value: esc(p.staffName) } : null,
        minutes ? { label: c.duration, value: esc(c.minutes(minutes)) } : null,
        price ? { label: b.amountLabel, value: esc(price), strong: true } : null,
        { label: s.branchLabel, value: esc(p.businessName) },
        ref ? { label: c.bookingRef, value: ref } : null,
      ]),
    { pad: "22px 22px 18px" }
  );
}

/** Sent to the salon owner whenever a customer books a new appointment —
 * see createBookingAndPayment (offline providers) and
 * sendBookingConfirmationEmail (online providers, called from the payment
 * webhooks once a Stripe/MoMo/VNPay payment actually succeeds). */
export function ownerNewBookingEmail(params: OwnerBookingParams) {
  const s = OWNER_BOOKING_STRINGS[params.locale] ?? OWNER_BOOKING_STRINGS.en;
  const o = ownerExtra(params.locale);
  const c = chromeStrings(params.locale);
  const d = dateParts(params.startsAt, params.endsAt, params.locale, params.businessTimezone);
  const when = `${d.full}, ${d.time}`;
  const intro = s.newBody(esc(params.customerName), esc(params.serviceName), esc(when));
  return {
    subject: s.newSubject(params.customerName),
    html: emailLayout({
      locale: params.locale,
      preheader: `${params.serviceName} · ${when}`,
      brand: null,
      hero: { eyebrow: o.newEyebrow, title: s.newHeading, intro, tone: "success", badge: "✓" },
      body: [
        greeting(s.hi, params.ownerName),
        ownerBookingCard(params, c.when, C.primary),
        params.customerNote?.trim() ? sectionTitle(c.note) + quote(esc(params.customerNote.trim())) : "",
        button(params.bookingsUrl, s.cta),
      ].join(""),
    }),
  };
}

/** Sent to the salon owner whenever a customer cancels their own booking —
 * see /api/bookings/[id]/cancel. Not sent when the salon itself cancels a
 * booking from the dashboard, since the owner already knows about that. */
export function ownerBookingCancelledEmail(params: OwnerBookingParams) {
  const s = OWNER_BOOKING_STRINGS[params.locale] ?? OWNER_BOOKING_STRINGS.en;
  const o = ownerExtra(params.locale);
  const c = chromeStrings(params.locale);
  const d = dateParts(params.startsAt, params.endsAt, params.locale, params.businessTimezone);
  const when = `${d.full}, ${d.time}`;
  const intro = s.cancelledBody(esc(params.customerName), esc(params.serviceName), esc(when));
  return {
    subject: s.cancelledSubject(params.customerName),
    html: emailLayout({
      locale: params.locale,
      preheader: `${params.serviceName} · ${when}`,
      brand: null,
      hero: { eyebrow: o.cancelledEyebrow, title: s.cancelledHeading, intro, tone: "alert", badge: "✕" },
      body: [
        greeting(s.hi, params.ownerName),
        ownerBookingCard(params, c.when, C.berry),
        notice(null, o.slotFreed, "success", 20),
        button(params.bookingsUrl, s.cta, { variant: "dark" }),
      ].join(""),
    }),
  };
}

/* ---------- invoices & marketing ---------- */

const INVOICE_EXTRA: Record<string, { eyebrow: string; number: string; total: string; pdf: string }> = {
  vi: { eyebrow: "Hóa đơn", number: "Số hóa đơn", total: "Tổng cộng", pdf: "Bản PDF của hóa đơn được đính kèm trong email này." },
  en: { eyebrow: "Invoice", number: "Invoice number", total: "Total", pdf: "A PDF copy of the invoice is attached to this email." },
  fi: { eyebrow: "Lasku", number: "Laskun numero", total: "Yhteensä", pdf: "Lasku on liitteenä PDF-tiedostona." },
  pl: { eyebrow: "Faktura", number: "Numer faktury", total: "Razem", pdf: "Faktura w formacie PDF jest dołączona do tej wiadomości." },
  de: { eyebrow: "Rechnung", number: "Rechnungsnummer", total: "Gesamt", pdf: "Die Rechnung ist als PDF angehängt." },
  km: { eyebrow: "វិក្កយបត្រ", number: "លេខវិក្កយបត្រ", total: "សរុប", pdf: "ឯកសារ PDF នៃវិក្កយបត្រត្រូវបានភ្ជាប់ជាមួយអ៊ីមែលនេះ។" },
  th: { eyebrow: "ใบแจ้งหนี้", number: "เลขที่ใบแจ้งหนี้", total: "ยอดรวม", pdf: "แนบไฟล์ PDF ของใบแจ้งหนี้มากับอีเมลนี้แล้ว" },
};

/** Sent from the dashboard's "pay at the counter" checkout, on request —
 * the owner enters the customer's email and sends the already-issued
 * invoice (as a PDF attachment) right there. See
 * POST /api/business/invoices/[id]/email. */
export function invoiceEmail(params: {
  customerName: string;
  businessName: string;
  invoiceNumber: string;
  viewUrl: string;
  locale: string;
  totalText?: string | null;
  pdfAttached?: boolean;
  businessLogoUrl?: string | null;
}) {
  const s = INVOICE_EMAIL_STRINGS[params.locale] ?? INVOICE_EMAIL_STRINGS.en;
  const e = INVOICE_EXTRA[params.locale] ?? INVOICE_EXTRA.en;
  const body = s.body(esc(params.businessName));
  return {
    subject: s.subject(params.invoiceNumber),
    html: emailLayout({
      locale: params.locale,
      preheader: plain(body),
      brand: salonBrand(params.businessName, params.businessLogoUrl),
      hero: { eyebrow: e.eyebrow, title: s.heading, tone: "brand", badge: "🧾" },
      body: [
        params.customerName ? greeting(s.hi, params.customerName) : "",
        para(body),
        panel(
          rows([
            { label: e.number, value: `<span style="font-family:Menlo,Consolas,monospace">${esc(params.invoiceNumber)}</span>` },
            params.totalText ? { label: e.total, value: `<span style="font-size:18px">${esc(params.totalText)}</span>`, strong: true } : null,
          ])
        ),
        button(params.viewUrl, s.viewCTA),
        params.pdfAttached !== false ? para(e.pdf, { small: true, muted: true, center: true, mt: 14 }) : "",
      ].join(""),
    }),
  };
}

