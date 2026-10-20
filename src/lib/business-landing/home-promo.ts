/** The "for salon owners" call-outs on the home page (hero pill + banner),
 * pointing to /business. Same 7 languages as the landing page itself. */
export interface HomePromoStrings {
  pill: string;
  eyebrow: string;
  title: string;
  body: string;
  points: [string, string, string, string];
  cta: string;
  chat: string;
}

const STRINGS: Record<string, HomePromoStrings> = {
  vi: {
    pill: "Bạn là chủ salon? Đưa salon lên VaraaAi miễn phí",
    eyebrow: "Dành cho chủ salon",
    title: "Đưa salon của bạn lên VaraaAi — hoàn toàn miễn phí",
    body: "Khách tự đặt lịch 24/7, nhắc lịch tự động, website riêng, thẻ tích điểm, thẻ quà tặng và trợ lý AI — tất cả trong một tài khoản.",
    points: ["Không phí ẩn, không cần thẻ", "Sẵn sàng trong 5 phút", "Không giới hạn nhân viên & lượt đặt", "Hỗ trợ 24/7 bằng AI"],
    cta: "Tìm hiểu & đăng ký salon",
    chat: "Hỏi admin về đăng ký",
  },
  en: {
    pill: "Own a salon? Bring it to VaraaAi for free",
    eyebrow: "For salon owners",
    title: "Bring your salon to VaraaAi — completely free",
    body: "24/7 online booking, automatic reminders, your own website, loyalty cards, gift cards and an AI assistant — all in one account.",
    points: ["No hidden fees, no card", "Ready in 5 minutes", "Unlimited staff & bookings", "24/7 AI-powered support"],
    cta: "Learn more & register your salon",
    chat: "Ask us about signing up",
  },
  fi: {
    pill: "Omistatko salongin? Tuo se VaraaAihin ilmaiseksi",
    eyebrow: "Salongin omistajille",
    title: "Tuo salonkisi VaraaAihin — täysin ilmaiseksi",
    body: "Ajanvaraus 24/7, automaattiset muistutukset, omat kotisivut, kanta-asiakaskortit, lahjakortit ja AI-avustaja — kaikki yhdellä tilillä.",
    points: ["Ei piilokuluja, ei korttia", "Valmis 5 minuutissa", "Rajattomasti työntekijöitä & varauksia", "AI-tuki 24/7"],
    cta: "Lue lisää & rekisteröi salonki",
    chat: "Kysy rekisteröinnistä",
  },
  pl: {
    pill: "Masz salon? Dodaj go do VaraaAi za darmo",
    eyebrow: "Dla właścicieli salonów",
    title: "Dodaj swój salon do VaraaAi — całkowicie za darmo",
    body: "Rezerwacje 24/7, automatyczne przypomnienia, własna strona, karty lojalnościowe, karty podarunkowe i asystent AI — wszystko w jednym koncie.",
    points: ["Bez ukrytych opłat i karty", "Gotowe w 5 minut", "Bez limitu pracowników i rezerwacji", "Wsparcie AI 24/7"],
    cta: "Dowiedz się więcej i zarejestruj salon",
    chat: "Zapytaj o rejestrację",
  },
  de: {
    pill: "Du hast einen Salon? Bring ihn kostenlos zu VaraaAi",
    eyebrow: "Für Salonbesitzer",
    title: "Bring deinen Salon zu VaraaAi — komplett kostenlos",
    body: "Online-Buchung rund um die Uhr, automatische Erinnerungen, eigene Website, Treuekarten, Gutscheine und ein KI-Assistent — alles in einem Konto.",
    points: ["Keine versteckten Kosten, keine Karte", "In 5 Minuten startklar", "Unbegrenzt Mitarbeiter & Buchungen", "KI-Support rund um die Uhr"],
    cta: "Mehr erfahren & Salon registrieren",
    chat: "Fragen zur Anmeldung",
  },
  km: {
    pill: "អ្នកមានសាឡុង? ដាក់វាលើ VaraaAi ឥតគិតថ្លៃ",
    eyebrow: "សម្រាប់ម្ចាស់សាឡុង",
    title: "ដាក់សាឡុងរបស់អ្នកលើ VaraaAi — ឥតគិតថ្លៃទាំងស្រុង",
    body: "កក់អនឡាញ ២៤/៧ ការរំលឹកស្វ័យប្រវត្តិ គេហទំព័រផ្ទាល់ កាតពិន្ទុ កាតអំណោយ និងជំនួយការ AI — ទាំងអស់ក្នុងគណនីតែមួយ។",
    points: ["គ្មានថ្លៃលាក់កំបាំង", "រួចរាល់ក្នុង ៥ នាទី", "បុគ្គលិក & ការកក់មិនកំណត់", "ជំនួយ AI ២៤/៧"],
    cta: "ស្វែងយល់ & ចុះឈ្មោះសាឡុង",
    chat: "សួរអំពីការចុះឈ្មោះ",
  },
  th: {
    pill: "มีร้านเสริมสวย? นำร้านมาอยู่บน VaraaAi ฟรี",
    eyebrow: "สำหรับเจ้าของร้าน",
    title: "นำร้านของคุณมาอยู่บน VaraaAi — ฟรีทั้งหมด",
    body: "จองออนไลน์ 24/7 แจ้งเตือนอัตโนมัติ เว็บไซต์ของร้าน บัตรสะสมแต้ม บัตรของขวัญ และผู้ช่วย AI — ครบในบัญชีเดียว",
    points: ["ไม่มีค่าแอบแฝง ไม่ต้องใช้บัตร", "พร้อมใช้ใน 5 นาที", "พนักงาน & การจองไม่จำกัด", "ช่วยเหลือด้วย AI 24/7"],
    cta: "ดูรายละเอียด & ลงทะเบียนร้าน",
    chat: "สอบถามเรื่องการสมัคร",
  },
};

export function homePromoStrings(locale: string): HomePromoStrings {
  return STRINGS[locale] ?? STRINGS.en;
}
