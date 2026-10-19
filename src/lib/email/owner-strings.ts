// Salon-owner notification copy, split out of mailer.ts unchanged.

export const NEW_MESSAGE_STRINGS: Record<
  string,
  { subject: (customer: string) => string; heading: string; body: (customer: string) => string; cta: string; hi: string }
> = {
  vi: {
    subject: (c) => `Bạn có tin nhắn mới từ khách hàng ${c}`,
    heading: "Bạn có tin nhắn mới",
    body: (c) => `Khách hàng <strong>${c}</strong> vừa nhắn tin cho salon của bạn. Hãy vào website VaraaAi để xem và trả lời.`,
    cta: "Xem tin nhắn",
    hi: "Xin chào",
  },
  en: {
    subject: (c) => `New message from ${c}`,
    heading: "You have a new message",
    body: (c) => `<strong>${c}</strong> just sent a message to your salon. Log in to VaraaAi to read and reply.`,
    cta: "View messages",
    hi: "Hello",
  },
  fi: {
    subject: (c) => `Uusi viesti asiakkaalta ${c}`,
    heading: "Sait uuden viestin",
    body: (c) => `<strong>${c}</strong> lähetti viestin salongillesi. Kirjaudu VaraaAihin lukeaksesi ja vastataksesi.`,
    cta: "Näytä viestit",
    hi: "Hei",
  },
  pl: {
    subject: (c) => `Nowa wiadomość od klienta ${c}`,
    heading: "Masz nową wiadomość",
    body: (c) => `<strong>${c}</strong> wysłał(a) wiadomość do Twojego salonu. Zaloguj się do VaraaAi, aby ją przeczytać i odpowiedzieć.`,
    cta: "Zobacz wiadomości",
    hi: "Cześć",
  },
  de: {
    subject: (c) => `Neue Nachricht von ${c}`,
    heading: "Du hast eine neue Nachricht",
    body: (c) => `<strong>${c}</strong> hat deinem Salon eine Nachricht geschickt. Melde dich bei VaraaAi an, um sie zu lesen und zu antworten.`,
    cta: "Nachrichten ansehen",
    hi: "Hallo",
  },
  km: {
    subject: (c) => `សារថ្មីពីអតិថិជន ${c}`,
    heading: "អ្នកមានសារថ្មី",
    body: (c) => `<strong>${c}</strong> ទើបតែផ្ញើសារមកសាឡុងរបស់អ្នក។ សូមចូលទៅ VaraaAi ដើម្បីអាន និងឆ្លើយតប។`,
    cta: "មើលសារ",
    hi: "សួស្តី",
  },
  th: {
    subject: (c) => `ข้อความใหม่จากลูกค้า ${c}`,
    heading: "คุณมีข้อความใหม่",
    body: (c) => `<strong>${c}</strong> เพิ่งส่งข้อความถึงร้านของคุณ เข้าสู่ระบบ VaraaAi เพื่ออ่านและตอบกลับ`,
    cta: "ดูข้อความ",
    hi: "สวัสดี",
  },
};

export const OWNER_BOOKING_STRINGS: Record<
  string,
  {
    newSubject: (customer: string) => string;
    newHeading: string;
    newBody: (customer: string, service: string, when: string) => string;
    cancelledSubject: (customer: string) => string;
    cancelledHeading: string;
    cancelledBody: (customer: string, service: string, when: string) => string;
    cta: string;
    hi: string;
    branchLabel: string;
  }
> = {
  vi: {
    newSubject: (c) => `Có lịch hẹn mới từ ${c}`,
    newHeading: "Bạn có lịch hẹn mới",
    newBody: (c, s, w) => `Khách hàng <strong>${c}</strong> vừa đặt lịch hẹn <strong>${s}</strong> vào lúc <strong>${w}</strong>.`,
    cancelledSubject: (c) => `${c} đã hủy lịch hẹn`,
    cancelledHeading: "Một lịch hẹn vừa bị hủy",
    cancelledBody: (c, s, w) => `Khách hàng <strong>${c}</strong> vừa hủy lịch hẹn <strong>${s}</strong> đã đặt vào lúc <strong>${w}</strong>.`,
    cta: "Xem lịch hẹn",
    hi: "Xin chào",
    branchLabel: "Chi nhánh",
  },
  en: {
    newSubject: (c) => `New booking from ${c}`,
    newHeading: "You have a new booking",
    newBody: (c, s, w) => `<strong>${c}</strong> just booked <strong>${s}</strong> for <strong>${w}</strong>.`,
    cancelledSubject: (c) => `${c} cancelled their booking`,
    cancelledHeading: "A booking was just cancelled",
    cancelledBody: (c, s, w) => `<strong>${c}</strong> just cancelled their <strong>${s}</strong> booking for <strong>${w}</strong>.`,
    cta: "View bookings",
    hi: "Hello",
    branchLabel: "Branch",
  },
  fi: {
    newSubject: (c) => `Uusi varaus asiakkaalta ${c}`,
    newHeading: "Sait uuden varauksen",
    newBody: (c, s, w) => `<strong>${c}</strong> varasi juuri palvelun <strong>${s}</strong> ajankohtaan <strong>${w}</strong>.`,
    cancelledSubject: (c) => `${c} perui varauksensa`,
    cancelledHeading: "Varaus peruttiin juuri",
    cancelledBody: (c, s, w) => `<strong>${c}</strong> perui juuri varauksensa <strong>${s}</strong> ajankohtaan <strong>${w}</strong>.`,
    cta: "Näytä varaukset",
    hi: "Hei",
    branchLabel: "Toimipiste",
  },
  pl: {
    newSubject: (c) => `Nowa rezerwacja od ${c}`,
    newHeading: "Masz nową rezerwację",
    newBody: (c, s, w) => `<strong>${c}</strong> właśnie zarezerwował(a) <strong>${s}</strong> na <strong>${w}</strong>.`,
    cancelledSubject: (c) => `${c} anulował(a) rezerwację`,
    cancelledHeading: "Rezerwacja została właśnie anulowana",
    cancelledBody: (c, s, w) => `<strong>${c}</strong> właśnie anulował(a) rezerwację <strong>${s}</strong> na <strong>${w}</strong>.`,
    cta: "Zobacz rezerwacje",
    hi: "Cześć",
    branchLabel: "Oddział",
  },
  de: {
    newSubject: (c) => `Neue Buchung von ${c}`,
    newHeading: "Du hast eine neue Buchung",
    newBody: (c, s, w) => `<strong>${c}</strong> hat gerade <strong>${s}</strong> für <strong>${w}</strong> gebucht.`,
    cancelledSubject: (c) => `${c} hat die Buchung storniert`,
    cancelledHeading: "Eine Buchung wurde gerade storniert",
    cancelledBody: (c, s, w) => `<strong>${c}</strong> hat gerade die Buchung <strong>${s}</strong> für <strong>${w}</strong> storniert.`,
    cta: "Buchungen ansehen",
    hi: "Hallo",
    branchLabel: "Filiale",
  },
  km: {
    newSubject: (c) => `ការកក់ថ្មីពី ${c}`,
    newHeading: "អ្នកមានការកក់ថ្មី",
    newBody: (c, s, w) => `<strong>${c}</strong> ទើបតែកក់ <strong>${s}</strong> នៅម៉ោង <strong>${w}</strong>។`,
    cancelledSubject: (c) => `${c} បានលុបចោលការកក់`,
    cancelledHeading: "ការកក់មួយទើបតែត្រូវបានលុបចោល",
    cancelledBody: (c, s, w) => `<strong>${c}</strong> ទើបតែលុបចោលការកក់ <strong>${s}</strong> នៅម៉ោង <strong>${w}</strong>។`,
    cta: "មើលការកក់",
    hi: "សួស្តី",
    branchLabel: "សាខា",
  },
  th: {
    newSubject: (c) => `การจองใหม่จาก ${c}`,
    newHeading: "คุณมีการจองใหม่",
    newBody: (c, s, w) => `<strong>${c}</strong> เพิ่งจอง <strong>${s}</strong> เวลา <strong>${w}</strong>`,
    cancelledSubject: (c) => `${c} ยกเลิกการจอง`,
    cancelledHeading: "การจองเพิ่งถูกยกเลิก",
    cancelledBody: (c, s, w) => `<strong>${c}</strong> เพิ่งยกเลิกการจอง <strong>${s}</strong> เวลา <strong>${w}</strong>`,
    cta: "ดูการจอง",
    hi: "สวัสดี",
    branchLabel: "สาขา",
  },
};
