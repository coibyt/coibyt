/** Words the shared email chrome needs (footer, calendar buttons, detail
 * labels), in the 7 languages the booking emails are written in. Anything
 * else falls back to English. */
export interface EmailChromeStrings {
  sentVia: (salon: string) => string;
  sentByVaraa: string;
  automated: string;
  tagline: string;
  help: string;
  addToCalendar: string;
  calendarFile: string;
  directions: string;
  call: string;
  bookingRef: string;
  duration: string;
  minutes: (n: number) => string;
  when: string;
  where: string;
  details: string;
  visitSalon: string;
  customer: string;
  email: string;
  phone: string;
  note: string;
  orCopyLink: string;
  poweredBy: string;
}

const STRINGS: Record<string, EmailChromeStrings> = {
  vi: {
    sentVia: (s) => `Email được gửi thay mặt ${s} qua VaraaAi.Com.`,
    sentByVaraa: "Email được gửi từ VaraaAi.Com.",
    automated: "Đây là email tự động — vui lòng không trả lời email này.",
    tagline: "Nền tảng đặt lịch thông minh cho salon",
    help: "Trung tâm trợ giúp",
    addToCalendar: "Thêm vào Google Calendar",
    calendarFile: "Tệp lịch (.ics) được đính kèm cho Apple Calendar và Outlook.",
    directions: "Chỉ đường",
    call: "Gọi salon",
    bookingRef: "Mã đặt lịch",
    duration: "Thời lượng",
    minutes: (n) => `${n} phút`,
    when: "Thời gian",
    where: "Địa điểm",
    details: "Chi tiết lịch hẹn",
    visitSalon: "Xem trang salon",
    customer: "Khách hàng",
    email: "Email",
    phone: "Điện thoại",
    note: "Ghi chú của khách",
    orCopyLink: "Nếu nút không hoạt động, hãy sao chép liên kết này vào trình duyệt:",
    poweredBy: "Vận hành bởi",
  },
  en: {
    sentVia: (s) => `Sent on behalf of ${s} via VaraaAi.Com.`,
    sentByVaraa: "Sent by VaraaAi.Com.",
    automated: "This is an automated email — please don't reply to it.",
    tagline: "Smart booking for salons",
    help: "Help centre",
    addToCalendar: "Add to Google Calendar",
    calendarFile: "A calendar file (.ics) is attached for Apple Calendar and Outlook.",
    directions: "Get directions",
    call: "Call the salon",
    bookingRef: "Booking ref",
    duration: "Duration",
    minutes: (n) => `${n} min`,
    when: "When",
    where: "Where",
    details: "Appointment details",
    visitSalon: "Visit the salon page",
    customer: "Customer",
    email: "Email",
    phone: "Phone",
    note: "Customer note",
    orCopyLink: "If the button doesn't work, copy this link into your browser:",
    poweredBy: "Powered by",
  },
  fi: {
    sentVia: (s) => `Lähetetty ${s} puolesta VaraaAi.Comin kautta.`,
    sentByVaraa: "Lähettäjä VaraaAi.Com.",
    automated: "Tämä on automaattinen viesti — älä vastaa tähän sähköpostiin.",
    tagline: "Älykäs ajanvaraus salongeille",
    help: "Ohjekeskus",
    addToCalendar: "Lisää Google-kalenteriin",
    calendarFile: "Kalenteritiedosto (.ics) on liitteenä Apple-kalenteria ja Outlookia varten.",
    directions: "Reittiohjeet",
    call: "Soita salonkiin",
    bookingRef: "Varaustunnus",
    duration: "Kesto",
    minutes: (n) => `${n} min`,
    when: "Aika",
    where: "Paikka",
    details: "Varauksen tiedot",
    visitSalon: "Salongin sivulle",
    customer: "Asiakas",
    email: "Sähköposti",
    phone: "Puhelin",
    note: "Asiakkaan viesti",
    orCopyLink: "Jos painike ei toimi, kopioi tämä linkki selaimeesi:",
    poweredBy: "Palvelun tarjoaa",
  },
  pl: {
    sentVia: (s) => `Wysłano w imieniu ${s} przez VaraaAi.Com.`,
    sentByVaraa: "Wysłano przez VaraaAi.Com.",
    automated: "To jest wiadomość automatyczna — prosimy na nią nie odpowiadać.",
    tagline: "Inteligentne rezerwacje dla salonów",
    help: "Centrum pomocy",
    addToCalendar: "Dodaj do Kalendarza Google",
    calendarFile: "Plik kalendarza (.ics) jest załączony dla Apple Calendar i Outlooka.",
    directions: "Wskazówki dojazdu",
    call: "Zadzwoń do salonu",
    bookingRef: "Nr rezerwacji",
    duration: "Czas trwania",
    minutes: (n) => `${n} min`,
    when: "Termin",
    where: "Miejsce",
    details: "Szczegóły wizyty",
    visitSalon: "Strona salonu",
    customer: "Klient",
    email: "E-mail",
    phone: "Telefon",
    note: "Uwagi klienta",
    orCopyLink: "Jeśli przycisk nie działa, skopiuj ten link do przeglądarki:",
    poweredBy: "Obsługiwane przez",
  },
  de: {
    sentVia: (s) => `Im Auftrag von ${s} über VaraaAi.Com gesendet.`,
    sentByVaraa: "Gesendet von VaraaAi.Com.",
    automated: "Dies ist eine automatische E-Mail — bitte antworte nicht darauf.",
    tagline: "Smarte Online-Buchung für Salons",
    help: "Hilfe-Center",
    addToCalendar: "Zu Google Kalender hinzufügen",
    calendarFile: "Eine Kalenderdatei (.ics) für Apple Kalender und Outlook ist angehängt.",
    directions: "Route planen",
    call: "Salon anrufen",
    bookingRef: "Buchungsnr.",
    duration: "Dauer",
    minutes: (n) => `${n} Min.`,
    when: "Wann",
    where: "Wo",
    details: "Termindetails",
    visitSalon: "Zur Salonseite",
    customer: "Kunde",
    email: "E-Mail",
    phone: "Telefon",
    note: "Notiz des Kunden",
    orCopyLink: "Falls der Button nicht funktioniert, kopiere diesen Link in deinen Browser:",
    poweredBy: "Bereitgestellt von",
  },
  km: {
    sentVia: (s) => `ផ្ញើជំនួសមុខ ${s} តាមរយៈ VaraaAi.Com។`,
    sentByVaraa: "ផ្ញើដោយ VaraaAi.Com។",
    automated: "នេះជាអ៊ីមែលស្វ័យប្រវត្តិ — សូមកុំឆ្លើយតបអ៊ីមែលនេះ។",
    tagline: "ការកក់ឆ្លាតវៃសម្រាប់សាឡុង",
    help: "មជ្ឈមណ្ឌលជំនួយ",
    addToCalendar: "បន្ថែមទៅ Google Calendar",
    calendarFile: "ឯកសារប្រតិទិន (.ics) ត្រូវបានភ្ជាប់សម្រាប់ Apple Calendar និង Outlook។",
    directions: "ផែនទីទៅកាន់ទីតាំង",
    call: "ទូរស័ព្ទទៅសាឡុង",
    bookingRef: "លេខកូដកក់",
    duration: "រយៈពេល",
    minutes: (n) => `${n} នាទី`,
    when: "ពេលវេលា",
    where: "ទីតាំង",
    details: "ព័ត៌មានលម្អិតនៃការណាត់ជួប",
    visitSalon: "មើលទំព័រសាឡុង",
    customer: "អតិថិជន",
    email: "អ៊ីមែល",
    phone: "ទូរស័ព្ទ",
    note: "កំណត់សម្គាល់របស់អតិថិជន",
    orCopyLink: "ប្រសិនបើប៊ូតុងមិនដំណើរការ សូមចម្លងតំណនេះទៅកម្មវិធីរុករក៖",
    poweredBy: "ដំណើរការដោយ",
  },
  th: {
    sentVia: (s) => `ส่งในนามของ ${s} ผ่าน VaraaAi.Com`,
    sentByVaraa: "ส่งโดย VaraaAi.Com",
    automated: "อีเมลนี้ส่งโดยอัตโนมัติ — กรุณาอย่าตอบกลับ",
    tagline: "ระบบจองคิวอัจฉริยะสำหรับร้านเสริมสวย",
    help: "ศูนย์ช่วยเหลือ",
    addToCalendar: "เพิ่มลงใน Google Calendar",
    calendarFile: "แนบไฟล์ปฏิทิน (.ics) สำหรับ Apple Calendar และ Outlook แล้ว",
    directions: "นำทาง",
    call: "โทรหาร้าน",
    bookingRef: "รหัสการจอง",
    duration: "ระยะเวลา",
    minutes: (n) => `${n} นาที`,
    when: "เวลา",
    where: "สถานที่",
    details: "รายละเอียดการนัดหมาย",
    visitSalon: "ดูหน้าร้าน",
    customer: "ลูกค้า",
    email: "อีเมล",
    phone: "โทรศัพท์",
    note: "หมายเหตุจากลูกค้า",
    orCopyLink: "หากปุ่มใช้งานไม่ได้ ให้คัดลอกลิงก์นี้ไปวางในเบราว์เซอร์:",
    poweredBy: "ขับเคลื่อนโดย",
  },
};

export function chromeStrings(locale: string): EmailChromeStrings {
  return STRINGS[locale] ?? STRINGS.en;
}
