import type { PosterLabels } from "../layout";
import { SHEET_LABELS } from "@/lib/price-list/i18n/sheet";

type Words = Omit<PosterLabels, "footer">;

/** Words printed on the poster itself, for every language a salon can pick
 * (small enough to ship to the browser whole). The free-tool footer line is
 * shared with the price list. */
const WORDS: Record<string, Words> = {
  vi: { presets: ["Quét để đặt lịch", "Đặt lịch hẹn tiếp theo", "Đặt lịch tại đây"], sub: "Đặt lịch online 24/7 — không cần gọi điện", review: "Đánh giá chúng tôi trên Google" },
  en: { presets: ["Scan to book", "Book your next visit", "Book here"], sub: "Book online 24/7 — no call needed", review: "Review us on Google" },
  fi: { presets: ["Skannaa ja varaa", "Varaa seuraava käyntisi", "Varaa aika tästä"], sub: "Varaa netissä 24/7 — ei tarvitse soittaa", review: "Arvostele meidät Googlessa" },
  sv: { presets: ["Skanna och boka", "Boka ditt nästa besök", "Boka här"], sub: "Boka online dygnet runt — inget samtal behövs", review: "Recensera oss på Google" },
  no: { presets: ["Skann og bestill", "Bestill ditt neste besøk", "Bestill her"], sub: "Bestill på nett døgnet rundt — ingen telefon nødvendig", review: "Gi oss en anmeldelse på Google" },
  da: { presets: ["Scan og book", "Book dit næste besøg", "Book her"], sub: "Book online døgnet rundt — ingen opkald nødvendigt", review: "Anmeld os på Google" },
  de: { presets: ["Scannen & buchen", "Buche deinen nächsten Termin", "Hier Termin buchen"], sub: "Rund um die Uhr online buchen — ohne Anruf", review: "Bewerte uns auf Google" },
  nl: { presets: ["Scan en boek", "Boek je volgende afspraak", "Boek hier"], sub: "24/7 online boeken — bellen niet nodig", review: "Beoordeel ons op Google" },
  fr: { presets: ["Scannez pour réserver", "Réservez votre prochaine visite", "Réservez ici"], sub: "Réservation en ligne 24 h/24 — sans appeler", review: "Laissez-nous un avis sur Google" },
  it: { presets: ["Scansiona e prenota", "Prenota la prossima visita", "Prenota qui"], sub: "Prenota online 24/7 — senza telefonare", review: "Recensiscici su Google" },
  es: { presets: ["Escanea y reserva", "Reserva tu próxima cita", "Reserva aquí"], sub: "Reserva online 24/7 — sin llamar", review: "Déjanos una reseña en Google" },
  pt: { presets: ["Escaneie e agende", "Agende sua próxima visita", "Agende aqui"], sub: "Agende online 24/7 — sem precisar ligar", review: "Avalie-nos no Google" },
  pl: { presets: ["Zeskanuj i zarezerwuj", "Zarezerwuj kolejną wizytę", "Zarezerwuj tutaj"], sub: "Rezerwacja online 24/7 — bez dzwonienia", review: "Oceń nas w Google" },
  cs: { presets: ["Naskenujte a rezervujte", "Rezervujte si další návštěvu", "Rezervujte zde"], sub: "Online rezervace nonstop — bez telefonování", review: "Ohodnoťte nás na Googlu" },
  sk: { presets: ["Naskenujte a rezervujte", "Rezervujte si ďalšiu návštevu", "Rezervujte tu"], sub: "Online rezervácia nonstop — bez telefonovania", review: "Ohodnoťte nás na Googli" },
  hu: { presets: ["Szkenneld be és foglalj", "Foglald le a következő időpontod", "Foglalj itt"], sub: "Online foglalás éjjel-nappal — telefon nélkül", review: "Értékelj minket a Google-on" },
  ro: { presets: ["Scanează și programează-te", "Programează următoarea vizită", "Programează-te aici"], sub: "Programare online non-stop — fără telefon", review: "Lasă-ne o recenzie pe Google" },
  bg: { presets: ["Сканирай и запиши час", "Запиши следващото си посещение", "Запиши час тук"], sub: "Онлайн записване 24/7 — без обаждане", review: "Оценете ни в Google" },
  ru: { presets: ["Сканируйте для записи", "Запишитесь на следующий визит", "Запись здесь"], sub: "Онлайн-запись 24/7 — без звонков", review: "Оставьте отзыв в Google" },
  uk: { presets: ["Скануйте, щоб записатися", "Запишіться на наступний візит", "Запис тут"], sub: "Онлайн-запис 24/7 — без дзвінків", review: "Залиште відгук у Google" },
  be: { presets: ["Скануйце, каб запісацца", "Запішыцеся на наступны візіт", "Запіс тут"], sub: "Онлайн-запіс 24/7 — без званкоў", review: "Пакіньце водгук у Google" },
  lv: { presets: ["Skenē un piesakies", "Piesakies nākamajai vizītei", "Piesakies šeit"], sub: "Pieraksts tiešsaistē 24/7 — bez zvana", review: "Novērtē mūs Google" },
  et: { presets: ["Skanni ja broneeri", "Broneeri järgmine külastus", "Broneeri siit"], sub: "Broneeri veebis 24/7 — helistamata", review: "Hinda meid Google'is" },
  tr: { presets: ["Tara ve randevu al", "Bir sonraki randevunu al", "Randevu buradan"], sub: "7/24 online randevu — aramaya gerek yok", review: "Bizi Google'da değerlendirin" },
  ar: { presets: ["امسح الرمز للحجز", "احجز زيارتك القادمة", "احجز من هنا"], sub: "احجز عبر الإنترنت على مدار الساعة — دون اتصال", review: "قيّمنا على Google" },
  he: { presets: ["סרקו וקבעו תור", "קבעו את התור הבא", "קביעת תור כאן"], sub: "קביעת תור אונליין 24/7 — בלי להתקשר", review: "דרגו אותנו ב-Google" },
  hi: { presets: ["स्कैन करें और बुक करें", "अपनी अगली विज़िट बुक करें", "यहाँ बुक करें"], sub: "24/7 ऑनलाइन बुकिंग — कॉल की ज़रूरत नहीं", review: "Google पर हमें रेटिंग दें" },
  th: { presets: ["สแกนเพื่อจอง", "จองนัดครั้งถัดไป", "จองคิวที่นี่"], sub: "จองออนไลน์ได้ 24 ชั่วโมง ไม่ต้องโทร", review: "รีวิวเราบน Google" },
  km: { presets: ["ស្កេនដើម្បីកក់", "កក់ការណាត់ជួបបន្ទាប់", "កក់នៅទីនេះ"], sub: "កក់អនឡាញ 24/7 — មិនចាំបាច់ទូរស័ព្ទ", review: "វាយតម្លៃយើងនៅលើ Google" },
  id: { presets: ["Pindai untuk booking", "Booking kunjungan berikutnya", "Booking di sini"], sub: "Booking online 24/7 — tanpa telepon", review: "Beri ulasan kami di Google" },
  ms: { presets: ["Imbas untuk tempahan", "Tempah lawatan seterusnya", "Tempah di sini"], sub: "Tempahan dalam talian 24/7 — tanpa panggilan", review: "Beri ulasan kami di Google" },
  fil: { presets: ["I-scan para mag-book", "I-book ang susunod mong pagbisita", "Mag-book dito"], sub: "Online booking 24/7 — hindi na kailangang tumawag", review: "I-review kami sa Google" },
  zh: { presets: ["扫码预约", "预约您的下次到店", "在此预约"], sub: "24小时在线预约，无需打电话", review: "在 Google 上给我们评价" },
  ja: { presets: ["スキャンして予約", "次回のご予約はこちら", "ここから予約"], sub: "24時間オンライン予約・お電話不要", review: "Googleで口コミをお願いします" },
  ko: { presets: ["스캔하고 예약하기", "다음 방문 예약하기", "여기서 예약"], sub: "24시간 온라인 예약 — 전화 필요 없어요", review: "Google에 리뷰를 남겨 주세요" },
};

export const POSTER_LABELS: Record<string, PosterLabels> = Object.fromEntries(
  Object.entries(WORDS).map(([l, w]) => [l, { ...w, footer: SHEET_LABELS[l]?.footer ?? SHEET_LABELS.en.footer }])
);
