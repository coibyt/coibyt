import nodemailer from "nodemailer";
import { formatMoney, INTL_LOCALES } from "@/lib/money";

let _transporter: nodemailer.Transporter | null = null;

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

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
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

export function verificationEmail(params: { name: string; verifyUrl: string; locale: string }) {
  const isVi = params.locale === "vi";
  return {
    subject: isVi
      ? "Xác minh email để kích hoạt salon của bạn"
      : "Verify your email to activate your salon",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${isVi ? "Xác minh địa chỉ email" : "Verify your email"}</h2>
        <p>${isVi ? "Xin chào" : "Hi"} ${params.name},</p>
        <p>${
          isVi
            ? "Nhấp vào nút bên dưới để xác minh email của bạn. Sau khi xác minh, salon của bạn sẽ được kích hoạt ngay — không cần chờ VaraaAi duyệt."
            : "Click the button below to verify your email. Once verified, your salon is activated immediately — no need to wait for VaraaAi's review."
        }</p>
        <p style="text-align:center;margin:24px 0">
          <a href="${params.verifyUrl}" style="background:#624f89;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">
            ${isVi ? "Xác minh email" : "Verify email"}
          </a>
        </p>
        <p style="color:#5b6b6c;font-size:13px">${
          isVi
            ? "Nếu nút không hoạt động, dán liên kết này vào trình duyệt:"
            : "If the button doesn't work, paste this link into your browser:"
        }<br/>${params.verifyUrl}</p>
        <p style="color:#5b6b6c;font-size:14px">VaraaAi.Com</p>
      </div>
    `,
  };
}

export function businessReadyEmail(params: {
  ownerName: string;
  businessName: string;
  dashboardUrl: string;
  guideUrl: string;
  locale: string;
}) {
  const isVi = params.locale === "vi";
  return {
    subject: isVi ? "Salon của bạn đã sẵn sàng!" : "Your salon is ready!",
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${isVi ? "Chúc mừng!" : "Congratulations!"}</h2>
        <p>${isVi ? "Xin chào" : "Hi"} ${params.ownerName},</p>
        <p>${
          isVi
            ? `<strong>${params.businessName}</strong> đã sẵn sàng hoạt động trên VaraaAi.Com! Khách hàng có thể tìm thấy và đặt lịch với bạn ngay bây giờ.`
            : `<strong>${params.businessName}</strong> is ready to go on VaraaAi.Com! Customers can now find and book with you.`
        }</p>
        <p style="text-align:center;margin:24px 0">
          <a href="${params.dashboardUrl}" style="background:#624f89;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">
            ${isVi ? "Vào trang quản trị" : "Go to dashboard"}
          </a>
        </p>
        <p>${
          isVi
            ? "Chưa biết bắt đầu từ đâu? Xem hướng dẫn từng bước của chúng tôi để đăng dịch vụ, thêm nhân viên và hơn thế nữa:"
            : "Not sure where to start? Check out our step-by-step guide for adding services, staff, and more:"
        }</p>
        <p><a href="${params.guideUrl}" style="color:#624f89">${params.guideUrl}</a></p>
        <p style="color:#5b6b6c;font-size:14px">VaraaAi.Com</p>
      </div>
    `,
  };
}

// Every string a booking confirmation/reschedule email needs, in each of
// VaraaAi's 7 supported languages (see src/i18n/routing.ts). Which of these
// a customer actually receives is driven by the SALON's own country (see
// localeForCountry in src/lib/countries.ts), not the customer's own account
// language — a Finland-based salon's customers get Finnish emails.
interface BookingEmailStrings {
  hi: string;
  confirmedHeading: string;
  confirmedIntro: (service: string, business: string) => string;
  rescheduledHeading: string;
  rescheduledIntro: (business: string, service: string) => string;
  newTimeLabel: string;
  serviceLabel: string;
  staffLabel: string;
  amountLabel: string;
  addressLabel: string;
  phoneLabel: string;
  viewOnMaps: string;
  cancellationPolicyLabel: string;
  defaultCancellationPolicy: (hours: number) => string;
  bankDetailsTitle: string;
  bankNameLabel: string;
  accountNumberLabel: string;
  accountHolderLabel: string;
  wantToCancelTitle: string;
  wantToCancelBody: string;
  viewMyBookings: string;
  subjectConfirmed: (business: string) => string;
  subjectRescheduled: (business: string) => string;
  reminderTimeUntil: Record<"24h" | "2h" | "15min", string>;
  reminderIntro: (business: string, service: string, timeUntil: string) => string;
  subjectReminder: (business: string, timeUntil: string) => string;
  reviewHeading: string;
  reviewIntro: (business: string) => string;
  reviewCTA: string;
  subjectReview: (business: string) => string;
}

const BOOKING_EMAIL_STRINGS: Record<string, BookingEmailStrings> = {
  vi: {
    hi: "Xin chào",
    confirmedHeading: "Lịch hẹn đã được xác nhận",
    confirmedIntro: (service, business) =>
      `Lịch hẹn <strong>${service}</strong> tại <strong>${business}</strong> của bạn đã được xác nhận.`,
    rescheduledHeading: "Lịch hẹn đã được dời",
    rescheduledIntro: (business, service) =>
      `<strong>${business}</strong> đã dời lịch hẹn <strong>${service}</strong> của bạn sang thời gian mới. Đây là email xác nhận tự động.`,
    newTimeLabel: "✨ Thời gian mới ✨",
    serviceLabel: "Dịch vụ",
    staffLabel: "Nhân viên",
    amountLabel: "Số tiền",
    addressLabel: "Địa chỉ",
    phoneLabel: "Điện thoại",
    viewOnMaps: "Xem trên Google Maps",
    cancellationPolicyLabel: "Chính sách hủy đặt chỗ",
    defaultCancellationPolicy: (h) =>
      `Bạn có thể tự hủy lịch hẹn trong hồ sơ của mình cho đến ${h} giờ trước giờ hẹn.`,
    bankDetailsTitle: "Thông tin chuyển khoản",
    bankNameLabel: "Ngân hàng",
    accountNumberLabel: "Số tài khoản",
    accountHolderLabel: "Chủ tài khoản",
    wantToCancelTitle: "Muốn hủy hoặc dời lịch hẹn?",
    wantToCancelBody: "Bạn có thể hủy trong hồ sơ của mình, hoặc liên hệ trực tiếp với salon.",
    viewMyBookings: "Xem lịch hẹn của tôi",
    subjectConfirmed: (b) => `Xác nhận lịch hẹn tại ${b}`,
    subjectRescheduled: (b) => `Lịch hẹn của bạn tại ${b} đã được dời`,
    reminderTimeUntil: { "24h": "24 giờ", "2h": "2 giờ", "15min": "15 phút" },
    reminderIntro: (business, service, timeUntil) =>
      `Còn <strong>${timeUntil}</strong> nữa là đến lịch hẹn <strong>${service}</strong> của bạn tại <strong>${business}</strong>.`,
    subjectReminder: (business, timeUntil) => `Nhắc lịch hẹn tại ${business} — còn ${timeUntil}`,
    reviewHeading: "Cảm ơn bạn đã tin tưởng!",
    reviewIntro: (business) =>
      `Cảm ơn bạn đã sử dụng dịch vụ tại <strong>${business}</strong>. Chúng tôi rất mong nhận được đánh giá của bạn để cải thiện chất lượng phục vụ.`,
    reviewCTA: "Đánh giá dịch vụ",
    subjectReview: (business) => `Cảm ơn bạn đã ghé ${business} — chia sẻ trải nghiệm của bạn nhé!`,
  },
  en: {
    hi: "Hi",
    confirmedHeading: "Appointment confirmed",
    confirmedIntro: (service, business) =>
      `Your <strong>${service}</strong> appointment at <strong>${business}</strong> is confirmed.`,
    rescheduledHeading: "Your appointment was moved",
    rescheduledIntro: (business, service) =>
      `<strong>${business}</strong> has moved your <strong>${service}</strong> appointment to a new time. This is an automated confirmation.`,
    newTimeLabel: "✨ New time ✨",
    serviceLabel: "Service",
    staffLabel: "Staff",
    amountLabel: "Amount",
    addressLabel: "Address",
    phoneLabel: "Phone",
    viewOnMaps: "View on Google Maps",
    cancellationPolicyLabel: "Cancellation policy",
    defaultCancellationPolicy: (h) =>
      `You can cancel this appointment yourself, up until ${h} hours before the appointment.`,
    bankDetailsTitle: "Bank transfer details",
    bankNameLabel: "Bank",
    accountNumberLabel: "Account number",
    accountHolderLabel: "Account holder",
    wantToCancelTitle: "Want to cancel or reschedule?",
    wantToCancelBody: "You can cancel it from your own account, or contact the salon directly.",
    viewMyBookings: "View my bookings",
    subjectConfirmed: (b) => `Your appointment at ${b} is confirmed`,
    subjectRescheduled: (b) => `Your appointment at ${b} was rescheduled`,
    reminderTimeUntil: { "24h": "24 hours", "2h": "2 hours", "15min": "15 minutes" },
    reminderIntro: (business, service, timeUntil) =>
      `Your <strong>${service}</strong> appointment at <strong>${business}</strong> is coming up in <strong>${timeUntil}</strong>.`,
    subjectReminder: (business, timeUntil) => `Reminder: your appointment at ${business} in ${timeUntil}`,
    reviewHeading: "Thanks for visiting!",
    reviewIntro: (business) =>
      `Thank you for using <strong>${business}</strong>'s services. We'd love to hear what you thought — your review helps them improve.`,
    reviewCTA: "Leave a review",
    subjectReview: (business) => `Thanks for visiting ${business} — share your experience!`,
  },
  fi: {
    hi: "Hei",
    confirmedHeading: "Varaus vahvistettu",
    confirmedIntro: (service, business) =>
      `Varauksesi <strong>${service}</strong> paikassa <strong>${business}</strong> on vahvistettu.`,
    rescheduledHeading: "Varauksesi siirrettiin",
    rescheduledIntro: (business, service) =>
      `<strong>${business}</strong> siirsi varauksesi <strong>${service}</strong> uuteen ajankohtaan. Tämä on automaattinen vahvistusviesti.`,
    newTimeLabel: "✨ Uusi ajankohta ✨",
    serviceLabel: "Palvelu",
    staffLabel: "Palveluntarjoaja",
    amountLabel: "Summa",
    addressLabel: "Osoite",
    phoneLabel: "Puhelin",
    viewOnMaps: "Näytä Google Mapsissa",
    cancellationPolicyLabel: "Peruutusehdot",
    defaultCancellationPolicy: (h) =>
      `Voit perua varauksen itse profiilistasi aina ${h} tuntiin asti ennen varattua aikaa.`,
    bankDetailsTitle: "Tilisiirron tiedot",
    bankNameLabel: "Pankki",
    accountNumberLabel: "Tilinumero",
    accountHolderLabel: "Tilinomistaja",
    wantToCancelTitle: "Haluatko peruuttaa tai siirtää aikaasi?",
    wantToCancelBody: "Voit perua ajan profiilistasi tai ottaa suoraan yhteyttä liikkeeseen.",
    viewMyBookings: "Näytä varaukseni",
    subjectConfirmed: (b) => `Varauksesi paikassa ${b} on vahvistettu`,
    subjectRescheduled: (b) => `Varauksesi paikassa ${b} siirrettiin`,
    reminderTimeUntil: { "24h": "24 tuntia", "2h": "2 tuntia", "15min": "15 minuuttia" },
    reminderIntro: (business, service, timeUntil) =>
      `Varauksesi <strong>${service}</strong> paikassa <strong>${business}</strong> alkaa <strong>${timeUntil}</strong> kuluttua.`,
    subjectReminder: (business, timeUntil) => `Muistutus: varauksesi paikassa ${business} ${timeUntil} kuluttua`,
    reviewHeading: "Kiitos käynnistä!",
    reviewIntro: (business) =>
      `Kiitos, että käytit <strong>${business}</strong> palveluita. Kertoisitko mielipiteesi? Arviosi auttaa heitä kehittymään.`,
    reviewCTA: "Jätä arvostelu",
    subjectReview: (business) => `Kiitos käynnistä ${business} — kerro kokemuksestasi!`,
  },
  pl: {
    hi: "Cześć",
    confirmedHeading: "Rezerwacja potwierdzona",
    confirmedIntro: (service, business) =>
      `Twoja rezerwacja <strong>${service}</strong> w <strong>${business}</strong> została potwierdzona.`,
    rescheduledHeading: "Twoja rezerwacja została przełożona",
    rescheduledIntro: (business, service) =>
      `<strong>${business}</strong> przełożył Twoją rezerwację <strong>${service}</strong> na nowy termin. To jest automatyczna wiadomość potwierdzająca.`,
    newTimeLabel: "✨ Nowy termin ✨",
    serviceLabel: "Usługa",
    staffLabel: "Pracownik",
    amountLabel: "Kwota",
    addressLabel: "Adres",
    phoneLabel: "Telefon",
    viewOnMaps: "Zobacz w Google Maps",
    cancellationPolicyLabel: "Zasady anulowania",
    defaultCancellationPolicy: (h) =>
      `Możesz samodzielnie anulować tę wizytę na swoim koncie, do ${h} godzin przed wizytą.`,
    bankDetailsTitle: "Dane do przelewu",
    bankNameLabel: "Bank",
    accountNumberLabel: "Numer konta",
    accountHolderLabel: "Właściciel konta",
    wantToCancelTitle: "Chcesz anulować lub zmienić termin?",
    wantToCancelBody: "Możesz anulować wizytę na swoim koncie lub skontaktować się bezpośrednio z salonem.",
    viewMyBookings: "Zobacz moje rezerwacje",
    subjectConfirmed: (b) => `Twoja wizyta w ${b} została potwierdzona`,
    subjectRescheduled: (b) => `Twoja wizyta w ${b} została przełożona`,
    reminderTimeUntil: { "24h": "24 godziny", "2h": "2 godziny", "15min": "15 minut" },
    reminderIntro: (business, service, timeUntil) =>
      `Twoja wizyta <strong>${service}</strong> w <strong>${business}</strong> zaczyna się za <strong>${timeUntil}</strong>.`,
    subjectReminder: (business, timeUntil) => `Przypomnienie: Twoja wizyta w ${business} za ${timeUntil}`,
    reviewHeading: "Dziękujemy za wizytę!",
    reviewIntro: (business) =>
      `Dziękujemy za skorzystanie z usług <strong>${business}</strong>. Chętnie poznamy Twoją opinię — Twoja recenzja pomoże im się rozwijać.`,
    reviewCTA: "Zostaw recenzję",
    subjectReview: (business) => `Dziękujemy za wizytę w ${business} — podziel się opinią!`,
  },
  de: {
    hi: "Hallo",
    confirmedHeading: "Termin bestätigt",
    confirmedIntro: (service, business) =>
      `Dein Termin für <strong>${service}</strong> bei <strong>${business}</strong> ist bestätigt.`,
    rescheduledHeading: "Dein Termin wurde verschoben",
    rescheduledIntro: (business, service) =>
      `<strong>${business}</strong> hat deinen Termin für <strong>${service}</strong> auf eine neue Zeit verschoben. Dies ist eine automatische Bestätigung.`,
    newTimeLabel: "✨ Neue Zeit ✨",
    serviceLabel: "Leistung",
    staffLabel: "Mitarbeiter",
    amountLabel: "Betrag",
    addressLabel: "Adresse",
    phoneLabel: "Telefon",
    viewOnMaps: "Auf Google Maps ansehen",
    cancellationPolicyLabel: "Stornierungsbedingungen",
    defaultCancellationPolicy: (h) =>
      `Du kannst diesen Termin bis zu ${h} Stunden vorher selbst in deinem Konto stornieren.`,
    bankDetailsTitle: "Bankverbindung",
    bankNameLabel: "Bank",
    accountNumberLabel: "Kontonummer",
    accountHolderLabel: "Kontoinhaber",
    wantToCancelTitle: "Möchtest du stornieren oder verschieben?",
    wantToCancelBody: "Du kannst den Termin in deinem Konto stornieren oder dich direkt an den Salon wenden.",
    viewMyBookings: "Meine Termine ansehen",
    subjectConfirmed: (b) => `Dein Termin bei ${b} ist bestätigt`,
    subjectRescheduled: (b) => `Dein Termin bei ${b} wurde verschoben`,
    reminderTimeUntil: { "24h": "24 Stunden", "2h": "2 Stunden", "15min": "15 Minuten" },
    reminderIntro: (business, service, timeUntil) =>
      `Dein Termin für <strong>${service}</strong> bei <strong>${business}</strong> beginnt in <strong>${timeUntil}</strong>.`,
    subjectReminder: (business, timeUntil) => `Erinnerung: dein Termin bei ${business} in ${timeUntil}`,
    reviewHeading: "Danke für deinen Besuch!",
    reviewIntro: (business) =>
      `Danke, dass du die Leistungen von <strong>${business}</strong> genutzt hast. Wir würden uns über dein Feedback freuen — deine Bewertung hilft dem Salon, sich zu verbessern.`,
    reviewCTA: "Bewertung abgeben",
    subjectReview: (business) => `Danke für deinen Besuch bei ${business} — teile deine Erfahrung!`,
  },
  km: {
    hi: "សួស្តី",
    confirmedHeading: "ការណាត់ជួបត្រូវបានបញ្ជាក់",
    confirmedIntro: (service, business) =>
      `ការណាត់ជួប <strong>${service}</strong> របស់អ្នកនៅ <strong>${business}</strong> ត្រូវបានបញ្ជាក់។`,
    rescheduledHeading: "ការណាត់ជួបរបស់អ្នកត្រូវបានផ្លាស់ប្តូរពេលវេលា",
    rescheduledIntro: (business, service) =>
      `<strong>${business}</strong> បានផ្លាស់ប្តូរពេលវេលាណាត់ជួប <strong>${service}</strong> របស់អ្នកទៅពេលវេលាថ្មី។ នេះជាអ៊ីមែលបញ្ជាក់ដោយស្វ័យប្រវត្តិ។`,
    newTimeLabel: "✨ ពេលវេលាថ្មី ✨",
    serviceLabel: "សេវាកម្ម",
    staffLabel: "បុគ្គលិក",
    amountLabel: "ចំនួនទឹកប្រាក់",
    addressLabel: "អាសយដ្ឋាន",
    phoneLabel: "លេខទូរស័ព្ទ",
    viewOnMaps: "មើលនៅលើ Google Maps",
    cancellationPolicyLabel: "គោលការណ៍ការលុបចោល",
    defaultCancellationPolicy: (h) =>
      `អ្នកអាចលុបចោលការណាត់ជួបនេះដោយខ្លួនឯងក្នុងគណនីរបស់អ្នក រហូតដល់ ${h} ម៉ោង មុនម៉ោងណាត់ជួប។`,
    bankDetailsTitle: "ព័ត៌មានផ្ទេរប្រាក់",
    bankNameLabel: "ធនាគារ",
    accountNumberLabel: "លេខគណនី",
    accountHolderLabel: "ម្ចាស់គណនី",
    wantToCancelTitle: "ចង់លុបចោល ឬផ្លាស់ប្តូរពេលវេលា?",
    wantToCancelBody: "អ្នកអាចលុបចោលវានៅក្នុងគណនីរបស់អ្នក ឬទាក់ទងសាឡុងដោយផ្ទាល់។",
    viewMyBookings: "មើលការកក់របស់ខ្ញុំ",
    subjectConfirmed: (b) => `ការណាត់ជួបរបស់អ្នកនៅ ${b} ត្រូវបានបញ្ជាក់`,
    subjectRescheduled: (b) => `ការណាត់ជួបរបស់អ្នកនៅ ${b} ត្រូវបានផ្លាស់ប្តូរពេលវេលា`,
    reminderTimeUntil: { "24h": "២៤ ម៉ោង", "2h": "២ ម៉ោង", "15min": "១៥ នាទី" },
    reminderIntro: (business, service, timeUntil) =>
      `ការណាត់ជួប <strong>${service}</strong> របស់អ្នកនៅ <strong>${business}</strong> នឹងចាប់ផ្តើមក្នុងរយៈពេល <strong>${timeUntil}</strong> ទៀត។`,
    subjectReminder: (business, timeUntil) => `ការរំលឹក៖ ការណាត់ជួបរបស់អ្នកនៅ ${business} ក្នុងរយៈពេល ${timeUntil} ទៀត`,
    reviewHeading: "សូមអរគុណសម្រាប់ការមកលេង!",
    reviewIntro: (business) =>
      `សូមអរគុណដែលបានប្រើសេវាកម្មរបស់ <strong>${business}</strong>។ យើងចង់ដឹងពីមតិយោបល់របស់អ្នក — ការវាយតម្លៃរបស់អ្នកជួយឱ្យពួកគេកែលម្អ។`,
    reviewCTA: "វាយតម្លៃសេវាកម្ម",
    subjectReview: (business) => `សូមអរគុណដែលបានមកលេង ${business} — សូមចែករំលែកបទពិសោធន៍របស់អ្នក!`,
  },
  th: {
    hi: "สวัสดี",
    confirmedHeading: "ยืนยันการนัดหมายแล้ว",
    confirmedIntro: (service, business) =>
      `การนัดหมาย <strong>${service}</strong> ของคุณที่ <strong>${business}</strong> ได้รับการยืนยันแล้ว`,
    rescheduledHeading: "การนัดหมายของคุณถูกเลื่อน",
    rescheduledIntro: (business, service) =>
      `<strong>${business}</strong> ได้เลื่อนการนัดหมาย <strong>${service}</strong> ของคุณไปเป็นเวลาใหม่ นี่คืออีเมลยืนยันอัตโนมัติ`,
    newTimeLabel: "✨ เวลานัดหมายใหม่ ✨",
    serviceLabel: "บริการ",
    staffLabel: "พนักงาน",
    amountLabel: "จำนวนเงิน",
    addressLabel: "ที่อยู่",
    phoneLabel: "โทรศัพท์",
    viewOnMaps: "ดูใน Google Maps",
    cancellationPolicyLabel: "นโยบายการยกเลิก",
    defaultCancellationPolicy: (h) =>
      `คุณสามารถยกเลิกการนัดหมายนี้ได้ด้วยตนเองในบัญชีของคุณ จนถึง ${h} ชั่วโมงก่อนถึงเวลานัดหมาย`,
    bankDetailsTitle: "ข้อมูลการโอนเงิน",
    bankNameLabel: "ธนาคาร",
    accountNumberLabel: "เลขที่บัญชี",
    accountHolderLabel: "ชื่อบัญชี",
    wantToCancelTitle: "ต้องการยกเลิกหรือเปลี่ยนเวลานัดหมาย?",
    wantToCancelBody: "คุณสามารถยกเลิกได้จากบัญชีของคุณเอง หรือติดต่อร้านโดยตรง",
    viewMyBookings: "ดูการจองของฉัน",
    subjectConfirmed: (b) => `การนัดหมายของคุณที่ ${b} ได้รับการยืนยันแล้ว`,
    subjectRescheduled: (b) => `การนัดหมายของคุณที่ ${b} ถูกเลื่อนเวลา`,
    reminderTimeUntil: { "24h": "24 ชั่วโมง", "2h": "2 ชั่วโมง", "15min": "15 นาที" },
    reminderIntro: (business, service, timeUntil) =>
      `การนัดหมาย <strong>${service}</strong> ของคุณที่ <strong>${business}</strong> จะเริ่มในอีก <strong>${timeUntil}</strong>`,
    subjectReminder: (business, timeUntil) => `แจ้งเตือน: การนัดหมายของคุณที่ ${business} ในอีก ${timeUntil}`,
    reviewHeading: "ขอบคุณที่ใช้บริการ!",
    reviewIntro: (business) =>
      `ขอบคุณที่ใช้บริการของ <strong>${business}</strong> เราอยากทราบความคิดเห็นของคุณ — รีวิวของคุณช่วยให้ร้านพัฒนาบริการให้ดียิ่งขึ้น`,
    reviewCTA: "ให้คะแนนรีวิว",
    subjectReview: (business) => `ขอบคุณที่ไปใช้บริการที่ ${business} — มาแชร์ประสบการณ์กันเถอะ!`,
  },
};

function bookingEmailStrings(locale: string): BookingEmailStrings {
  return BOOKING_EMAIL_STRINGS[locale] ?? BOOKING_EMAIL_STRINGS.en;
}

export function bookingConfirmationEmail(params: {
  customerName: string;
  businessName: string;
  serviceName: string;
  serviceDescription?: string | null;
  startsAt: Date;
  locale: string;
  businessTimezone: string;
  priceCents: number;
  currency: string;
  staffName?: string | null;
  staffMessage?: string | null;
  businessAddress?: string | null;
  businessCity?: string | null;
  googleMapsUrl?: string | null;
  businessPhone?: string | null;
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
}) {
  const s = bookingEmailStrings(params.locale);
  // Always render in the salon's own timezone — an email server can run in
  // any timezone, and the appointment time only means something relative to
  // where the salon actually is.
  const dateStr = params.startsAt.toLocaleString(
    INTL_LOCALES[params.locale] ?? "en-US",
    { dateStyle: "full", timeStyle: "short", timeZone: params.businessTimezone }
  );
  const priceStr = formatMoney(params.priceCents, params.currency, params.locale);

  const bankBlock = params.bankInfo
    ? `
      <div style="background:#fff7ed;border:1px solid #fed7aa;padding:12px 16px;border-radius:12px;margin-top:8px">
        <p style="margin:0 0 6px;font-weight:600">${s.bankDetailsTitle}</p>
        ${params.bankInfo.bankName ? `<p style="margin:2px 0">${s.bankNameLabel}: ${params.bankInfo.bankName}</p>` : ""}
        ${params.bankInfo.bankAccountNumber ? `<p style="margin:2px 0">${s.accountNumberLabel}: ${params.bankInfo.bankAccountNumber}</p>` : ""}
        ${params.bankInfo.bankAccountName ? `<p style="margin:2px 0">${s.accountHolderLabel}: ${params.bankInfo.bankAccountName}</p>` : ""}
        ${params.bankInfo.bankBic ? `<p style="margin:2px 0">BIC/SWIFT: ${params.bankInfo.bankBic}</p>` : ""}
      </div>
    `
    : "";

  const addressLine = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");
  const cancellationText =
    params.cancellationPolicy || s.defaultCancellationPolicy(params.cancellationWindowHours);

  return {
    subject: s.subjectConfirmed(params.businessName),
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${s.confirmedHeading}</h2>
        <p>${s.hi} ${params.customerName},</p>
        <p>${s.confirmedIntro(params.serviceName, params.businessName)}</p>
        <div style="background:#f2f5f5;padding:12px 16px;border-radius:12px">
          <p style="margin:2px 0;font-weight:600">${dateStr}</p>
          <p style="margin:8px 0 2px"><span style="color:#5b6b6c">${s.serviceLabel}:</span> ${params.serviceName}</p>
          ${params.serviceDescription ? `<p style="margin:2px 0;color:#5b6b6c;font-size:13px">${params.serviceDescription}</p>` : ""}
          ${params.staffName ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.staffLabel}:</span> ${params.staffName}</p>` : ""}
          <p style="margin:2px 0"><span style="color:#5b6b6c">${s.amountLabel}:</span> ${priceStr}</p>
          ${addressLine ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.addressLabel}:</span> ${addressLine}</p>` : ""}
          ${params.businessPhone ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.phoneLabel}:</span> ${params.businessPhone}</p>` : ""}
          ${params.googleMapsUrl ? `<p style="margin:6px 0 0"><a href="${params.googleMapsUrl}" style="color:#624f89">${s.viewOnMaps}</a></p>` : ""}
        </div>
        ${
          params.staffMessage
            ? `<div style="background:#eef2ff;border:1px solid #c7d2fe;padding:12px 16px;border-radius:12px;margin-top:8px"><p style="margin:0">${params.staffMessage}</p></div>`
            : ""
        }
        ${bankBlock}
        <div style="margin-top:16px">
          <p style="margin:0 0 4px;font-weight:600">${s.cancellationPolicyLabel}</p>
          <p style="margin:0;color:#5b6b6c;font-size:13px;white-space:pre-line">${cancellationText}</p>
        </div>
        <p style="color:#5b6b6c;font-size:14px;margin-top:16px">VaraaAi.Com</p>
      </div>
    `,
  };
}

/** Sent whenever the salon (not the customer) moves a booking to a new time
 * or staff member from the dashboard calendar — same fields as the original
 * confirmation email (see bookingConfirmationEmail), just framed around the
 * change rather than the initial booking. Matches the "your booking was
 * moved" email pattern from timma.fi. */
export function bookingRescheduledEmail(params: {
  customerName: string;
  businessName: string;
  serviceName: string;
  serviceDescription?: string | null;
  startsAt: Date;
  locale: string;
  businessTimezone: string;
  priceCents: number;
  currency: string;
  staffName?: string | null;
  businessAddress?: string | null;
  businessCity?: string | null;
  googleMapsUrl?: string | null;
  businessPhone?: string | null;
  cancellationWindowHours: number;
  cancellationPolicy?: string | null;
  manageBookingUrl: string;
}) {
  const s = bookingEmailStrings(params.locale);
  const dateStr = params.startsAt.toLocaleString(
    INTL_LOCALES[params.locale] ?? "en-US",
    { dateStyle: "full", timeStyle: "short", timeZone: params.businessTimezone }
  );
  const priceStr = formatMoney(params.priceCents, params.currency, params.locale);
  const addressLine = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");
  const cancellationText =
    params.cancellationPolicy || s.defaultCancellationPolicy(params.cancellationWindowHours);

  return {
    subject: s.subjectRescheduled(params.businessName),
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${s.rescheduledHeading}</h2>
        <p>${s.hi} ${params.customerName},</p>
        <p>${s.rescheduledIntro(params.businessName, params.serviceName)}</p>
        <div style="background:#f2f5f5;padding:12px 16px;border-radius:12px">
          <p style="margin:0 0 8px;font-weight:700;color:#624f89">${s.newTimeLabel}</p>
          <p style="margin:2px 0;font-weight:600">${dateStr}</p>
          <p style="margin:8px 0 2px"><span style="color:#5b6b6c">${s.serviceLabel}:</span> ${params.serviceName}</p>
          ${params.serviceDescription ? `<p style="margin:2px 0;color:#5b6b6c;font-size:13px">${params.serviceDescription}</p>` : ""}
          ${params.staffName ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.staffLabel}:</span> ${params.staffName}</p>` : ""}
          <p style="margin:2px 0"><span style="color:#5b6b6c">${s.amountLabel}:</span> ${priceStr}</p>
          ${addressLine ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.addressLabel}:</span> ${addressLine}</p>` : ""}
          ${params.businessPhone ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.phoneLabel}:</span> ${params.businessPhone}</p>` : ""}
          ${params.googleMapsUrl ? `<p style="margin:6px 0 0"><a href="${params.googleMapsUrl}" style="color:#624f89">${s.viewOnMaps}</a></p>` : ""}
        </div>
        <div style="margin-top:16px">
          <p style="margin:0 0 4px;font-weight:600">${s.cancellationPolicyLabel}</p>
          <p style="margin:0;color:#5b6b6c;font-size:13px;white-space:pre-line">${cancellationText}</p>
        </div>
        <div style="background:#fbeaee;padding:12px 16px;border-radius:12px;margin-top:16px">
          <p style="margin:0 0 8px;font-weight:600">${s.wantToCancelTitle}</p>
          <p style="margin:0 0 10px;color:#5b6b6c;font-size:13px">${s.wantToCancelBody}</p>
          <a href="${params.manageBookingUrl}" style="background:#0d1718;color:#fff;padding:10px 20px;border-radius:999px;text-decoration:none;font-weight:600;font-size:13px">
            ${s.viewMyBookings}
          </a>
        </div>
        <p style="color:#5b6b6c;font-size:14px;margin-top:16px">VaraaAi.Com</p>
      </div>
    `,
  };
}

/** Sent by the reminders cron (see /api/cron/reminders) at three fixed
 * lead times before a CONFIRMED booking — 24h, 2h and 15min. Which one this
 * particular call is for is passed in as `kind`; the cron job itself decides
 * when each fires by checking the matching reminder*SentAt column. */
export function appointmentReminderEmail(params: {
  kind: "24h" | "2h" | "15min";
  customerName: string;
  businessName: string;
  serviceName: string;
  startsAt: Date;
  locale: string;
  businessTimezone: string;
  staffName?: string | null;
  businessAddress?: string | null;
  businessCity?: string | null;
  googleMapsUrl?: string | null;
  businessPhone?: string | null;
}) {
  const s = bookingEmailStrings(params.locale);
  const dateStr = params.startsAt.toLocaleString(
    INTL_LOCALES[params.locale] ?? "en-US",
    { dateStyle: "full", timeStyle: "short", timeZone: params.businessTimezone }
  );
  const timeUntil = s.reminderTimeUntil[params.kind];
  const addressLine = [params.businessAddress, params.businessCity].filter(Boolean).join(", ");

  return {
    subject: s.subjectReminder(params.businessName, timeUntil),
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${s.subjectReminder(params.businessName, timeUntil)}</h2>
        <p>${s.hi} ${params.customerName},</p>
        <p>${s.reminderIntro(params.businessName, params.serviceName, timeUntil)}</p>
        <div style="background:#f2f5f5;padding:12px 16px;border-radius:12px">
          <p style="margin:2px 0;font-weight:600">${dateStr}</p>
          <p style="margin:8px 0 2px"><span style="color:#5b6b6c">${s.serviceLabel}:</span> ${params.serviceName}</p>
          ${params.staffName ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.staffLabel}:</span> ${params.staffName}</p>` : ""}
          ${addressLine ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.addressLabel}:</span> ${addressLine}</p>` : ""}
          ${params.businessPhone ? `<p style="margin:2px 0"><span style="color:#5b6b6c">${s.phoneLabel}:</span> ${params.businessPhone}</p>` : ""}
          ${params.googleMapsUrl ? `<p style="margin:6px 0 0"><a href="${params.googleMapsUrl}" style="color:#624f89">${s.viewOnMaps}</a></p>` : ""}
        </div>
        <p style="color:#5b6b6c;font-size:14px;margin-top:16px">VaraaAi.Com</p>
      </div>
    `,
  };
}

/** Sent by the reminders cron one day after a COMPLETED booking's appointment
 * ended, asking the customer to leave a review — see /api/cron/reminders.
 * `reviewUrl` deep-links straight into the review prompt on the customer's
 * own bookings page (see ?review= handling in customer-bookings-list.tsx). */
export function reviewRequestEmail(params: {
  customerName: string;
  businessName: string;
  serviceName: string;
  locale: string;
  reviewUrl: string;
}) {
  const s = bookingEmailStrings(params.locale);
  return {
    subject: s.subjectReview(params.businessName),
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto">
        <h2 style="color:#624f89">${s.reviewHeading}</h2>
        <p>${s.hi} ${params.customerName},</p>
        <p>${s.reviewIntro(params.businessName)}</p>
        <p style="color:#5b6b6c;font-size:13px">${params.serviceName}</p>
        <p style="text-align:center;margin:24px 0">
          <a href="${params.reviewUrl}" style="background:#624f89;color:#fff;padding:12px 24px;border-radius:999px;text-decoration:none;font-weight:600">
            ${s.reviewCTA}
          </a>
        </p>
        <p style="color:#5b6b6c;font-size:14px;margin-top:16px">VaraaAi.Com</p>
      </div>
    `,
  };
}
