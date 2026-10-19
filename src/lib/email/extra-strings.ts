/** Copy added with the 2026 email redesign, in the same 7 languages as the
 * booking emails (see booking-strings.ts). */
export interface CustomerExtraStrings {
  eyebrowConfirmed: string;
  eyebrowRescheduled: string;
  eyebrowReminder: string;
  eyebrowReview: string;
  eyebrowCancelled: string;
  seeYou: (business: string) => string;
  tipsTitle: string;
  tips: string;
  staffSays: (staff: string) => string;
  cancelledHeading: string;
  cancelledIntro: (service: string, business: string) => string;
  subjectCancelled: (business: string) => string;
  cancelledNote: string;
  bookAgain: string;
  tapStar: string;
  reviewQuick: string;
}

const CUSTOMER: Record<string, CustomerExtraStrings> = {
  vi: {
    eyebrowConfirmed: "Đặt lịch thành công",
    eyebrowRescheduled: "Cập nhật lịch hẹn",
    eyebrowReminder: "Nhắc lịch hẹn",
    eyebrowReview: "Cảm nhận của bạn",
    eyebrowCancelled: "Đã hủy lịch hẹn",
    seeYou: (b) => `Hẹn sớm gặp bạn tại ${b}!`,
    tipsTitle: "Một vài lưu ý nhỏ",
    tips: "Bạn nên đến sớm khoảng 5–10 phút. Nếu không thể đến, hãy báo cho salon càng sớm càng tốt để nhường chỗ cho khách khác nhé.",
    staffSays: (s) => `Lời nhắn từ ${s}`,
    cancelledHeading: "Lịch hẹn của bạn đã được hủy",
    cancelledIntro: (service, business) =>
      `Lịch hẹn <strong>${service}</strong> tại <strong>${business}</strong> đã được hủy theo yêu cầu của bạn.`,
    subjectCancelled: (b) => `Đã hủy lịch hẹn tại ${b}`,
    cancelledNote: "Bạn không cần làm gì thêm. Khi nào thuận tiện, bạn có thể đặt một thời gian khác chỉ trong vài giây.",
    bookAgain: "Đặt lịch mới",
    tapStar: "Chạm vào một ngôi sao để bắt đầu",
    reviewQuick: "Chỉ mất chưa đến một phút.",
  },
  en: {
    eyebrowConfirmed: "Booking confirmed",
    eyebrowRescheduled: "Booking update",
    eyebrowReminder: "Appointment reminder",
    eyebrowReview: "Your experience",
    eyebrowCancelled: "Booking cancelled",
    seeYou: (b) => `We look forward to seeing you at ${b}!`,
    tipsTitle: "A few small tips",
    tips: "Try to arrive 5–10 minutes early. If you can't make it, please let the salon know as soon as possible so someone else can take the slot.",
    staffSays: (s) => `A note from ${s}`,
    cancelledHeading: "Your appointment was cancelled",
    cancelledIntro: (service, business) =>
      `Your <strong>${service}</strong> appointment at <strong>${business}</strong> has been cancelled as you requested.`,
    subjectCancelled: (b) => `Your appointment at ${b} was cancelled`,
    cancelledNote: "There's nothing else you need to do. Whenever it suits you, you can book a new time in seconds.",
    bookAgain: "Book a new time",
    tapStar: "Tap a star to get started",
    reviewQuick: "It takes less than a minute.",
  },
  fi: {
    eyebrowConfirmed: "Varaus vahvistettu",
    eyebrowRescheduled: "Varauksen muutos",
    eyebrowReminder: "Muistutus",
    eyebrowReview: "Kokemuksesi",
    eyebrowCancelled: "Varaus peruttu",
    seeYou: (b) => `Nähdään pian – ${b}!`,
    tipsTitle: "Muutama vinkki",
    tips: "Saavuthan paikalle 5–10 minuuttia etuajassa. Jos et pääse tulemaan, ilmoitathan salongille mahdollisimman pian, jotta aika vapautuu toiselle asiakkaalle.",
    staffSays: (s) => `Viesti henkilöltä ${s}`,
    cancelledHeading: "Varauksesi on peruttu",
    cancelledIntro: (service, business) =>
      `Varauksesi <strong>${service}</strong> paikassa <strong>${business}</strong> on peruttu pyyntösi mukaisesti.`,
    subjectCancelled: (b) => `Varauksesi paikassa ${b} on peruttu`,
    cancelledNote: "Sinun ei tarvitse tehdä muuta. Voit varata uuden ajan muutamassa sekunnissa aina kun sinulle sopii.",
    bookAgain: "Varaa uusi aika",
    tapStar: "Aloita napauttamalla tähteä",
    reviewQuick: "Se vie alle minuutin.",
  },
  pl: {
    eyebrowConfirmed: "Rezerwacja potwierdzona",
    eyebrowRescheduled: "Zmiana rezerwacji",
    eyebrowReminder: "Przypomnienie",
    eyebrowReview: "Twoje wrażenia",
    eyebrowCancelled: "Rezerwacja anulowana",
    seeYou: (b) => `Do zobaczenia w ${b}!`,
    tipsTitle: "Kilka drobnych wskazówek",
    tips: "Postaraj się przyjść 5–10 minut wcześniej. Jeśli nie możesz przyjść, daj znać salonowi jak najszybciej, aby termin mógł zająć ktoś inny.",
    staffSays: (s) => `Wiadomość od ${s}`,
    cancelledHeading: "Twoja wizyta została anulowana",
    cancelledIntro: (service, business) =>
      `Twoja wizyta <strong>${service}</strong> w <strong>${business}</strong> została anulowana zgodnie z Twoją prośbą.`,
    subjectCancelled: (b) => `Twoja wizyta w ${b} została anulowana`,
    cancelledNote: "Nie musisz nic więcej robić. Kiedy zechcesz, zarezerwujesz nowy termin w kilka sekund.",
    bookAgain: "Zarezerwuj nowy termin",
    tapStar: "Kliknij gwiazdkę, aby zacząć",
    reviewQuick: "To zajmie mniej niż minutę.",
  },
  de: {
    eyebrowConfirmed: "Buchung bestätigt",
    eyebrowRescheduled: "Terminänderung",
    eyebrowReminder: "Terminerinnerung",
    eyebrowReview: "Deine Meinung",
    eyebrowCancelled: "Termin storniert",
    seeYou: (b) => `Wir freuen uns auf dich bei ${b}!`,
    tipsTitle: "Ein paar kleine Tipps",
    tips: "Komm am besten 5–10 Minuten früher. Falls du es nicht schaffst, sag dem Salon bitte so früh wie möglich Bescheid, damit jemand anderes den Termin nutzen kann.",
    staffSays: (s) => `Eine Nachricht von ${s}`,
    cancelledHeading: "Dein Termin wurde storniert",
    cancelledIntro: (service, business) =>
      `Dein Termin für <strong>${service}</strong> bei <strong>${business}</strong> wurde wie gewünscht storniert.`,
    subjectCancelled: (b) => `Dein Termin bei ${b} wurde storniert`,
    cancelledNote: "Du musst nichts weiter tun. Wann immer es dir passt, buchst du in Sekunden einen neuen Termin.",
    bookAgain: "Neuen Termin buchen",
    tapStar: "Tippe auf einen Stern, um zu starten",
    reviewQuick: "Dauert weniger als eine Minute.",
  },
  km: {
    eyebrowConfirmed: "ការកក់បានជោគជ័យ",
    eyebrowRescheduled: "ការធ្វើបច្ចុប្បន្នភាពការកក់",
    eyebrowReminder: "ការរំលឹកការណាត់ជួប",
    eyebrowReview: "បទពិសោធន៍របស់អ្នក",
    eyebrowCancelled: "ការកក់ត្រូវបានលុបចោល",
    seeYou: (b) => `រង់ចាំជួបអ្នកឆាប់ៗនៅ ${b}!`,
    tipsTitle: "ការណែនាំតូចៗ",
    tips: "សូមមកដល់មុនប្រហែល ៥–១០ នាទី។ ប្រសិនបើអ្នកមិនអាចមកបាន សូមជូនដំណឹងដល់សាឡុងឱ្យបានឆាប់ ដើម្បីទុកឱកាសឱ្យអតិថិជនផ្សេង។",
    staffSays: (s) => `សារពី ${s}`,
    cancelledHeading: "ការណាត់ជួបរបស់អ្នកត្រូវបានលុបចោល",
    cancelledIntro: (service, business) =>
      `ការណាត់ជួប <strong>${service}</strong> របស់អ្នកនៅ <strong>${business}</strong> ត្រូវបានលុបចោលតាមសំណើរបស់អ្នក។`,
    subjectCancelled: (b) => `ការណាត់ជួបរបស់អ្នកនៅ ${b} ត្រូវបានលុបចោល`,
    cancelledNote: "អ្នកមិនចាំបាច់ធ្វើអ្វីបន្ថែមទៀតទេ។ នៅពេលណាដែលអ្នកសះស្រួល អ្នកអាចកក់ពេលវេលាថ្មីបានក្នុងរយៈពេលប៉ុន្មានវិនាទី។",
    bookAgain: "កក់ពេលវេលាថ្មី",
    tapStar: "ចុចលើផ្កាយមួយដើម្បីចាប់ផ្តើម",
    reviewQuick: "ចំណាយពេលតិចជាងមួយនាទី។",
  },
  th: {
    eyebrowConfirmed: "จองสำเร็จ",
    eyebrowRescheduled: "อัปเดตการนัดหมาย",
    eyebrowReminder: "แจ้งเตือนการนัดหมาย",
    eyebrowReview: "ความประทับใจของคุณ",
    eyebrowCancelled: "ยกเลิกการนัดหมายแล้ว",
    seeYou: (b) => `แล้วพบกันที่ ${b} นะคะ!`,
    tipsTitle: "ข้อแนะนำเล็กน้อย",
    tips: "แนะนำให้มาถึงก่อนเวลาประมาณ 5–10 นาที หากไม่สามารถมาได้ โปรดแจ้งร้านโดยเร็วที่สุดเพื่อให้ลูกค้าท่านอื่นได้ใช้เวลานี้",
    staffSays: (s) => `ข้อความจาก ${s}`,
    cancelledHeading: "การนัดหมายของคุณถูกยกเลิกแล้ว",
    cancelledIntro: (service, business) =>
      `การนัดหมาย <strong>${service}</strong> ของคุณที่ <strong>${business}</strong> ถูกยกเลิกตามคำขอของคุณแล้ว`,
    subjectCancelled: (b) => `การนัดหมายของคุณที่ ${b} ถูกยกเลิกแล้ว`,
    cancelledNote: "คุณไม่ต้องทำอะไรเพิ่มเติม เมื่อสะดวก คุณสามารถจองเวลาใหม่ได้ในไม่กี่วินาที",
    bookAgain: "จองเวลาใหม่",
    tapStar: "แตะที่ดาวเพื่อเริ่มต้น",
    reviewQuick: "ใช้เวลาไม่ถึงหนึ่งนาที",
  },
};

export function customerExtra(locale: string): CustomerExtraStrings {
  return CUSTOMER[locale] ?? CUSTOMER.en;
}

export interface OwnerExtraStrings {
  newEyebrow: string;
  cancelledEyebrow: string;
  messageEyebrow: string;
  humanEyebrow: string;
  slotFreed: string;
  aiPaused: string;
  replyFast: string;
}

const OWNER: Record<string, OwnerExtraStrings> = {
  vi: {
    newEyebrow: "Lịch hẹn mới",
    cancelledEyebrow: "Lịch hẹn bị hủy",
    messageEyebrow: "Tin nhắn mới",
    humanEyebrow: "Cần bạn hỗ trợ",
    slotFreed: "Khung giờ này đã được mở lại trên lịch và khách khác có thể đặt ngay.",
    aiPaused: "Trợ lý AI đã tạm dừng trong cuộc trò chuyện này cho đến khi bạn bật lại.",
    replyFast: "Khách hàng thường đặt lịch ở nơi trả lời họ nhanh nhất — một câu trả lời trong vài phút tạo khác biệt lớn.",
  },
  en: {
    newEyebrow: "New booking",
    cancelledEyebrow: "Booking cancelled",
    messageEyebrow: "New message",
    humanEyebrow: "Needs you",
    slotFreed: "This time slot is open again on your calendar, so another customer can book it right away.",
    aiPaused: "The AI assistant is paused in this conversation until you turn it back on.",
    replyFast: "Customers tend to book wherever answers them first — a reply within minutes makes a real difference.",
  },
  fi: {
    newEyebrow: "Uusi varaus",
    cancelledEyebrow: "Varaus peruttu",
    messageEyebrow: "Uusi viesti",
    humanEyebrow: "Tarvitsee sinua",
    slotFreed: "Aika on taas vapaana kalenterissasi, joten toinen asiakas voi varata sen heti.",
    aiPaused: "AI-avustaja on tauolla tässä keskustelussa, kunnes otat sen taas käyttöön.",
    replyFast: "Asiakkaat varaavat usein sieltä, mistä vastataan ensimmäisenä — vastaus muutamassa minuutissa ratkaisee paljon.",
  },
  pl: {
    newEyebrow: "Nowa rezerwacja",
    cancelledEyebrow: "Rezerwacja anulowana",
    messageEyebrow: "Nowa wiadomość",
    humanEyebrow: "Potrzebna Twoja pomoc",
    slotFreed: "Ten termin jest znów wolny w kalendarzu, więc inny klient może go od razu zarezerwować.",
    aiPaused: "Asystent AI jest wstrzymany w tej rozmowie, dopóki go ponownie nie włączysz.",
    replyFast: "Klienci zwykle rezerwują tam, gdzie najszybciej im odpowiedziano — odpowiedź w ciągu kilku minut robi różnicę.",
  },
  de: {
    newEyebrow: "Neue Buchung",
    cancelledEyebrow: "Buchung storniert",
    messageEyebrow: "Neue Nachricht",
    humanEyebrow: "Braucht dich",
    slotFreed: "Dieser Zeitraum ist im Kalender wieder frei und kann sofort von anderen gebucht werden.",
    aiPaused: "Der KI-Assistent pausiert in diesem Gespräch, bis du ihn wieder einschaltest.",
    replyFast: "Kunden buchen meist dort, wo sie zuerst eine Antwort bekommen — eine Antwort innerhalb weniger Minuten macht den Unterschied.",
  },
  km: {
    newEyebrow: "ការកក់ថ្មី",
    cancelledEyebrow: "ការកក់ត្រូវបានលុបចោល",
    messageEyebrow: "សារថ្មី",
    humanEyebrow: "ត្រូវការអ្នក",
    slotFreed: "ម៉ោងនេះបានបើកឡើងវិញនៅលើប្រតិទិន ហើយអតិថិជនផ្សេងអាចកក់បានភ្លាមៗ។",
    aiPaused: "ជំនួយការ AI ត្រូវបានផ្អាកក្នុងការសន្ទនានេះ រហូតដល់អ្នកបើកវាឡើងវិញ។",
    replyFast: "អតិថិជនច្រើនតែកក់នៅកន្លែងដែលឆ្លើយតបពួកគេលឿនបំផុត — ការឆ្លើយតបក្នុងរយៈពេលប៉ុន្មាននាទីធ្វើឱ្យមានភាពខុសគ្នាធំ។",
  },
  th: {
    newEyebrow: "การจองใหม่",
    cancelledEyebrow: "การจองถูกยกเลิก",
    messageEyebrow: "ข้อความใหม่",
    humanEyebrow: "ต้องการคุณ",
    slotFreed: "ช่วงเวลานี้ว่างอีกครั้งในปฏิทิน ลูกค้าท่านอื่นสามารถจองได้ทันที",
    aiPaused: "ผู้ช่วย AI หยุดทำงานชั่วคราวในการสนทนานี้จนกว่าคุณจะเปิดอีกครั้ง",
    replyFast: "ลูกค้ามักจองกับร้านที่ตอบกลับเร็วที่สุด — การตอบภายในไม่กี่นาทีสร้างความแตกต่างได้มาก",
  },
};

export function ownerExtra(locale: string): OwnerExtraStrings {
  return OWNER[locale] ?? OWNER.en;
}
