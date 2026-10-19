// Booking email copy, split out of mailer.ts unchanged.

// Every string a booking confirmation/reschedule email needs, in each of
// VaraaAi's 7 supported languages (see src/i18n/routing.ts). Which of these
// a customer actually receives is driven by the SALON's own country (see
// localeForCountry in src/lib/countries.ts), not the customer's own account
// language — a Finland-based salon's customers get Finnish emails.
export interface BookingEmailStrings {
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
  // No specific "in X hours" claim here on purpose — a reminder can fire
  // later than its nominal threshold (e.g. the cron catching up after a
  // gap), so stating a fixed duration risks telling the customer something
  // false. The actual scheduled time is always shown accurately below it.
  reminderIntro: (business: string, service: string) => string;
  subjectReminder: (business: string) => string;
  reviewHeading: string;
  reviewIntro: (business: string) => string;
  reviewCTA: string;
  subjectReview: (business: string) => string;
  // Shown only when this booking's checkout also created the customer's
  // account (the "fill the form, get an account" guest-checkout flow) —
  // never includes the password itself, just a pointer to use it next time.
  newAccountTitle: string;
  newAccountBody: (email: string) => string;
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
    reminderIntro: (business, service) =>
      `Lịch hẹn <strong>${service}</strong> của bạn tại <strong>${business}</strong> sắp diễn ra.`,
    subjectReminder: (business) => `Nhắc lịch hẹn tại ${business}`,
    reviewHeading: "Cảm ơn bạn đã tin tưởng!",
    reviewIntro: (business) =>
      `Cảm ơn bạn đã sử dụng dịch vụ tại <strong>${business}</strong>. Chúng tôi rất mong nhận được đánh giá của bạn để cải thiện chất lượng phục vụ.`,
    reviewCTA: "Đánh giá dịch vụ",
    subjectReview: (business) => `Cảm ơn bạn đã ghé ${business} — chia sẻ trải nghiệm của bạn nhé!`,
    newAccountTitle: "Tài khoản VaraaAi của bạn đã sẵn sàng",
    newAccountBody: (email) =>
      `Chúng tôi đã tạo tài khoản cho bạn tại VaraaAi.Com bằng email <strong>${email}</strong>. Lần sau, đăng nhập bằng email này và mật khẩu bạn vừa đặt để xem và quản lý lịch hẹn của mình.`,
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
    reminderIntro: (business, service) =>
      `Your <strong>${service}</strong> appointment at <strong>${business}</strong> is coming up.`,
    subjectReminder: (business) => `Reminder: your appointment at ${business}`,
    reviewHeading: "Thanks for visiting!",
    reviewIntro: (business) =>
      `Thank you for using <strong>${business}</strong>'s services. We'd love to hear what you thought — your review helps them improve.`,
    reviewCTA: "Leave a review",
    subjectReview: (business) => `Thanks for visiting ${business} — share your experience!`,
    newAccountTitle: "Your VaraaAi account is ready",
    newAccountBody: (email) =>
      `We created an account for you at VaraaAi.Com using <strong>${email}</strong>. Next time, sign in with this email and the password you just chose to view and manage your bookings.`,
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
    reminderIntro: (business, service) =>
      `Varauksesi <strong>${service}</strong> paikassa <strong>${business}</strong> on tulossa pian.`,
    subjectReminder: (business) => `Muistutus: varauksesi paikassa ${business}`,
    reviewHeading: "Kiitos käynnistä!",
    reviewIntro: (business) =>
      `Kiitos, että käytit <strong>${business}</strong> palveluita. Kertoisitko mielipiteesi? Arviosi auttaa heitä kehittymään.`,
    reviewCTA: "Jätä arvostelu",
    subjectReview: (business) => `Kiitos käynnistä ${business} — kerro kokemuksestasi!`,
    newAccountTitle: "VaraaAi-tilisi on valmis",
    newAccountBody: (email) =>
      `Loimme sinulle tilin VaraaAi.Comiin osoitteella <strong>${email}</strong>. Ensi kerralla kirjaudu tällä sähköpostilla ja juuri valitsemallasi salasanalla nähdäksesi ja hallitaksesi varauksiasi.`,
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
    reminderIntro: (business, service) =>
      `Twoja wizyta <strong>${service}</strong> w <strong>${business}</strong> zbliża się.`,
    subjectReminder: (business) => `Przypomnienie: Twoja wizyta w ${business}`,
    reviewHeading: "Dziękujemy za wizytę!",
    reviewIntro: (business) =>
      `Dziękujemy za skorzystanie z usług <strong>${business}</strong>. Chętnie poznamy Twoją opinię — Twoja recenzja pomoże im się rozwijać.`,
    reviewCTA: "Zostaw recenzję",
    subjectReview: (business) => `Dziękujemy za wizytę w ${business} — podziel się opinią!`,
    newAccountTitle: "Twoje konto VaraaAi jest gotowe",
    newAccountBody: (email) =>
      `Utworzyliśmy dla Ciebie konto w VaraaAi.Com na adres <strong>${email}</strong>. Następnym razem zaloguj się tym adresem e-mail i hasłem, które właśnie ustawiłaś/eś, aby zobaczyć i zarządzać swoimi rezerwacjami.`,
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
    reminderIntro: (business, service) =>
      `Dein Termin für <strong>${service}</strong> bei <strong>${business}</strong> steht bald an.`,
    subjectReminder: (business) => `Erinnerung: dein Termin bei ${business}`,
    reviewHeading: "Danke für deinen Besuch!",
    reviewIntro: (business) =>
      `Danke, dass du die Leistungen von <strong>${business}</strong> genutzt hast. Wir würden uns über dein Feedback freuen — deine Bewertung hilft dem Salon, sich zu verbessern.`,
    reviewCTA: "Bewertung abgeben",
    subjectReview: (business) => `Danke für deinen Besuch bei ${business} — teile deine Erfahrung!`,
    newAccountTitle: "Dein VaraaAi-Konto ist bereit",
    newAccountBody: (email) =>
      `Wir haben für dich ein Konto bei VaraaAi.Com mit <strong>${email}</strong> erstellt. Melde dich beim nächsten Mal mit dieser E-Mail-Adresse und dem gerade gewählten Passwort an, um deine Termine zu sehen und zu verwalten.`,
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
    reminderIntro: (business, service) =>
      `ការណាត់ជួប <strong>${service}</strong> របស់អ្នកនៅ <strong>${business}</strong> នឹងមកដល់ឆាប់ៗនេះ។`,
    subjectReminder: (business) => `ការរំលឹក៖ ការណាត់ជួបរបស់អ្នកនៅ ${business}`,
    reviewHeading: "សូមអរគុណសម្រាប់ការមកលេង!",
    reviewIntro: (business) =>
      `សូមអរគុណដែលបានប្រើសេវាកម្មរបស់ <strong>${business}</strong>។ យើងចង់ដឹងពីមតិយោបល់របស់អ្នក — ការវាយតម្លៃរបស់អ្នកជួយឱ្យពួកគេកែលម្អ។`,
    reviewCTA: "វាយតម្លៃសេវាកម្ម",
    subjectReview: (business) => `សូមអរគុណដែលបានមកលេង ${business} — សូមចែករំលែកបទពិសោធន៍របស់អ្នក!`,
    newAccountTitle: "គណនី VaraaAi របស់អ្នកត្រៀមរួចរាល់ហើយ",
    newAccountBody: (email) =>
      `យើងបានបង្កើតគណនីសម្រាប់អ្នកនៅ VaraaAi.Com ដោយប្រើអ៊ីមែល <strong>${email}</strong>។ លើកក្រោយ សូមចូលគណនីដោយប្រើអ៊ីមែលនេះ និងពាក្យសម្ងាត់ដែលអ្នកទើបតែបានកំណត់ ដើម្បីមើល និងគ្រប់គ្រងការកក់របស់អ្នក។`,
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
    reminderIntro: (business, service) =>
      `การนัดหมาย <strong>${service}</strong> ของคุณที่ <strong>${business}</strong> ใกล้ถึงแล้ว`,
    subjectReminder: (business) => `แจ้งเตือน: การนัดหมายของคุณที่ ${business}`,
    reviewHeading: "ขอบคุณที่ใช้บริการ!",
    reviewIntro: (business) =>
      `ขอบคุณที่ใช้บริการของ <strong>${business}</strong> เราอยากทราบความคิดเห็นของคุณ — รีวิวของคุณช่วยให้ร้านพัฒนาบริการให้ดียิ่งขึ้น`,
    reviewCTA: "ให้คะแนนรีวิว",
    subjectReview: (business) => `ขอบคุณที่ไปใช้บริการที่ ${business} — มาแชร์ประสบการณ์กันเถอะ!`,
    newAccountTitle: "บัญชี VaraaAi ของคุณพร้อมแล้ว",
    newAccountBody: (email) =>
      `เราได้สร้างบัญชีให้คุณที่ VaraaAi.Com โดยใช้อีเมล <strong>${email}</strong> ครั้งหน้าให้เข้าสู่ระบบด้วยอีเมลนี้และรหัสผ่านที่คุณเพิ่งตั้งไว้ เพื่อดูและจัดการการจองของคุณ`,
  },
};

export function bookingEmailStrings(locale: string): BookingEmailStrings {
  return BOOKING_EMAIL_STRINGS[locale] ?? BOOKING_EMAIL_STRINGS.en;
}

export const INVOICE_EMAIL_STRINGS: Record<
  string,
  { subject: (number: string) => string; heading: string; body: (business: string) => string; viewCTA: string; hi: string }
> = {
  vi: {
    subject: (n) => `Hóa đơn ${n}`,
    heading: "Hóa đơn của bạn",
    body: (b) => `Đính kèm đây là hóa đơn cho dịch vụ bạn vừa sử dụng tại <strong>${b}</strong>.`,
    viewCTA: "Xem hóa đơn trực tuyến",
    hi: "Xin chào",
  },
  en: {
    subject: (n) => `Invoice ${n}`,
    heading: "Your invoice",
    body: (b) => `Attached is the invoice for the service you just had at <strong>${b}</strong>.`,
    viewCTA: "View invoice online",
    hi: "Hi",
  },
  fi: {
    subject: (n) => `Lasku ${n}`,
    heading: "Laskusi",
    body: (b) => `Liitteenä lasku palvelusta, jonka sait juuri paikassa <strong>${b}</strong>.`,
    viewCTA: "Näytä lasku verkossa",
    hi: "Hei",
  },
  pl: {
    subject: (n) => `Faktura ${n}`,
    heading: "Twoja faktura",
    body: (b) => `W załączniku znajduje się faktura za usługę, z której właśnie skorzystałeś(aś) w <strong>${b}</strong>.`,
    viewCTA: "Zobacz fakturę online",
    hi: "Cześć",
  },
  de: {
    subject: (n) => `Rechnung ${n}`,
    heading: "Deine Rechnung",
    body: (b) => `Im Anhang findest du die Rechnung für die Leistung, die du gerade bei <strong>${b}</strong> erhalten hast.`,
    viewCTA: "Rechnung online ansehen",
    hi: "Hallo",
  },
  km: {
    subject: (n) => `វិក្កយបត្រ ${n}`,
    heading: "វិក្កយបត្ររបស់អ្នក",
    body: (b) => `ភ្ជាប់មកជាមួយនេះគឺវិក្កយបត្រសម្រាប់សេវាកម្មដែលអ្នកទើបតែទទួលបាននៅ <strong>${b}</strong>។`,
    viewCTA: "មើលវិក្កយបត្រតាមអ៊ីនធឺណិត",
    hi: "សួស្តី",
  },
  th: {
    subject: (n) => `ใบแจ้งหนี้ ${n}`,
    heading: "ใบแจ้งหนี้ของคุณ",
    body: (b) => `แนบมาพร้อมนี้คือใบแจ้งหนี้สำหรับบริการที่คุณเพิ่งใช้ที่ <strong>${b}</strong>`,
    viewCTA: "ดูใบแจ้งหนี้ออนไลน์",
    hi: "สวัสดี",
  },
};
