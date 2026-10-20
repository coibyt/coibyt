/** Copy for the "never miss a booking / website + phone app" spotlight on
 * /business, the extra FAQ entry about the app, and the footer's app
 * download block. Same 7 languages as the landing page. */
export interface SpotlightStrings {
  eyebrow: string;
  title: string;
  subtitle: string;
  alarm: { title: string; body: string; points: string[]; mockTitle: string; mockLine: string; mockStop: string; mockView: string };
  app: { title: string; body: string; points: string[]; install: string; web: string; phone: string };
  faq: { q: string; a: string };
  footer: { title: string; body: string; button: string; installed: string; platforms: string };
}

const STRINGS: Record<string, SpotlightStrings> = {
  vi: {
    eyebrow: "Luôn bên bạn",
    title: "Không bỏ sót một khách nào — dù bạn đang ở đâu",
    subtitle: "Hai tiện ích giúp chủ salon yên tâm mỗi ngày.",
    alarm: {
      title: "Chuông báo lịch hẹn trong ngày",
      body: "Khách vừa đặt lịch cho hôm nay? Điện thoại đổ chuông to, rung và hiện ngay giờ hẹn, dịch vụ, tên khách — không bao giờ để khách đến mà tiệm chưa biết.",
      points: ["Chuông to, lặp lại đến khi bạn tắt", "Báo cho mọi chi nhánh", "Thông báo cả khi đã đóng app"],
      mockTitle: "Lịch hẹn mới hôm nay!",
      mockLine: "Sơn gel tay · với Linh",
      mockStop: "Tắt chuông",
      mockView: "Xem lịch hẹn",
    },
    app: {
      title: "Quản lý trên website và app điện thoại",
      body: "Lịch hẹn, khách hàng, tin nhắn, doanh thu — trên máy tính ở quầy hay trên điện thoại khi đang ra ngoài. Cài app VaraaAi thẳng từ website chỉ một chạm, không cần CH Play hay App Store, luôn tự cập nhật.",
      points: ["Đồng bộ tức thì giữa máy tính và điện thoại", "Cài một chạm, không qua kho ứng dụng", "Android, iPhone và máy tính"],
      install: "Tải ứng dụng VaraaAi",
      web: "Website",
      phone: "App điện thoại",
    },
    faq: {
      q: "VaraaAi có ứng dụng điện thoại không?",
      a: "Có. Bấm \"Tải ứng dụng\" ở chân trang hoặc trên menu để cài VaraaAi thẳng về điện thoại hay máy tính — không cần CH Play hay App Store. App tự cập nhật, đồng bộ với website, và có chuông báo khi khách đặt lịch trong ngày.",
    },
    footer: {
      title: "Tải ứng dụng VaraaAi",
      body: "Cài thẳng về máy chỉ một chạm — không cần CH Play hay App Store.",
      button: "Tải về máy",
      installed: "Đã cài trên thiết bị này",
      platforms: "Android · iPhone · Máy tính",
    },
  },
  en: {
    eyebrow: "Always with you",
    title: "Never miss a customer — wherever you are",
    subtitle: "Two features that give salon owners peace of mind every day.",
    alarm: {
      title: "Same-day booking alarm",
      body: "A customer just booked for today? Your phone rings loudly, vibrates and shows the time, service and name right away — no customer ever walks in unexpected.",
      points: ["Loud, repeating until you stop it", "Covers every branch", "Notifies even when the app is closed"],
      mockTitle: "New booking today!",
      mockLine: "Gel manicure · with Linh",
      mockStop: "Stop ringing",
      mockView: "View bookings",
    },
    app: {
      title: "Run it on the website and your phone",
      body: "Bookings, customers, messages, revenue — on the counter computer or on your phone when you're out. Install the VaraaAi app straight from the website in one tap, no Google Play or App Store, always up to date.",
      points: ["Instant sync between computer and phone", "One-tap install, no app store", "Android, iPhone and desktop"],
      install: "Get the VaraaAi app",
      web: "Website",
      phone: "Phone app",
    },
    faq: {
      q: "Is there a VaraaAi phone app?",
      a: "Yes. Tap \"Get the app\" in the footer or menu to install VaraaAi straight onto your phone or computer — no Google Play or App Store needed. It updates itself, stays in sync with the website, and rings when a customer books for today.",
    },
    footer: {
      title: "Get the VaraaAi app",
      body: "Install it in one tap — no Google Play or App Store needed.",
      button: "Install",
      installed: "Installed on this device",
      platforms: "Android · iPhone · Desktop",
    },
  },
  fi: {
    eyebrow: "Aina mukanasi",
    title: "Älä menetä yhtään asiakasta — missä ikinä oletkin",
    subtitle: "Kaksi ominaisuutta, jotka tuovat salongin omistajalle mielenrauhaa.",
    alarm: {
      title: "Saman päivän varaushälytys",
      body: "Asiakas varasi juuri tälle päivälle? Puhelin soi kovaa, värisee ja näyttää ajan, palvelun ja nimen heti — kukaan ei tule yllättäen.",
      points: ["Kova ääni, toistuu kunnes lopetat", "Kaikki toimipisteet", "Ilmoitus myös sovelluksen ollessa kiinni"],
      mockTitle: "Uusi varaus tänään!",
      mockLine: "Geelilakkaus · Linh",
      mockStop: "Lopeta soitto",
      mockView: "Näytä varaukset",
    },
    app: {
      title: "Hallinta verkossa ja puhelinsovelluksessa",
      body: "Varaukset, asiakkaat, viestit ja myynti — kassakoneella tai puhelimessa liikkeellä ollessa. Asenna VaraaAi-sovellus suoraan verkkosivulta yhdellä napautuksella, ilman Google Playta tai App Storea.",
      points: ["Välitön synkronointi koneen ja puhelimen välillä", "Asennus yhdellä napautuksella", "Android, iPhone ja tietokone"],
      install: "Lataa VaraaAi-sovellus",
      web: "Verkkosivu",
      phone: "Puhelinsovellus",
    },
    faq: {
      q: "Onko VaraaAilla puhelinsovellusta?",
      a: "On. Napauta \"Lataa sovellus\" alatunnisteessa tai valikossa ja asenna VaraaAi suoraan puhelimeen tai tietokoneeseen — ilman Google Playta tai App Storea. Sovellus päivittyy itsestään ja soi, kun asiakas varaa tälle päivälle.",
    },
    footer: {
      title: "Lataa VaraaAi-sovellus",
      body: "Asenna yhdellä napautuksella — ei Google Playta eikä App Storea.",
      button: "Asenna",
      installed: "Asennettu tähän laitteeseen",
      platforms: "Android · iPhone · Tietokone",
    },
  },
  pl: {
    eyebrow: "Zawsze z Tobą",
    title: "Nie przegap żadnego klienta — gdziekolwiek jesteś",
    subtitle: "Dwie funkcje, które dają właścicielom salonów spokój każdego dnia.",
    alarm: {
      title: "Alarm rezerwacji na dziś",
      body: "Klient właśnie zarezerwował na dziś? Telefon głośno dzwoni, wibruje i od razu pokazuje godzinę, usługę i imię — nikt nie przyjdzie niespodziewanie.",
      points: ["Głośny, powtarza się do wyłączenia", "Dla wszystkich oddziałów", "Powiadomienie także przy zamkniętej aplikacji"],
      mockTitle: "Nowa rezerwacja na dziś!",
      mockLine: "Manicure hybrydowy · z Linh",
      mockStop: "Wycisz",
      mockView: "Zobacz rezerwacje",
    },
    app: {
      title: "Zarządzaj na stronie i w aplikacji",
      body: "Rezerwacje, klienci, wiadomości, przychody — na komputerze w salonie lub w telefonie poza nim. Zainstaluj aplikację VaraaAi prosto ze strony jednym dotknięciem, bez Google Play i App Store.",
      points: ["Natychmiastowa synchronizacja", "Instalacja jednym dotknięciem", "Android, iPhone i komputer"],
      install: "Pobierz aplikację VaraaAi",
      web: "Strona",
      phone: "Aplikacja",
    },
    faq: {
      q: "Czy VaraaAi ma aplikację na telefon?",
      a: "Tak. Kliknij \"Pobierz aplikację\" w stopce lub menu, aby zainstalować VaraaAi na telefonie lub komputerze — bez Google Play i App Store. Aplikacja aktualizuje się sama i dzwoni, gdy klient zarezerwuje na dziś.",
    },
    footer: {
      title: "Pobierz aplikację VaraaAi",
      body: "Zainstaluj jednym dotknięciem — bez Google Play i App Store.",
      button: "Zainstaluj",
      installed: "Zainstalowano na tym urządzeniu",
      platforms: "Android · iPhone · Komputer",
    },
  },
  de: {
    eyebrow: "Immer dabei",
    title: "Keinen Kunden verpassen — wo immer du bist",
    subtitle: "Zwei Funktionen, die Salonbesitzern jeden Tag Sicherheit geben.",
    alarm: {
      title: "Alarm für heutige Buchungen",
      body: "Ein Kunde hat gerade für heute gebucht? Dein Handy klingelt laut, vibriert und zeigt sofort Uhrzeit, Leistung und Name — niemand steht unerwartet vor der Tür.",
      points: ["Laut, wiederholt bis du ihn stoppst", "Für alle Filialen", "Benachrichtigt auch bei geschlossener App"],
      mockTitle: "Neue Buchung heute!",
      mockLine: "Gel-Maniküre · bei Linh",
      mockStop: "Klingeln stoppen",
      mockView: "Buchungen ansehen",
    },
    app: {
      title: "Verwalten auf der Website und in der App",
      body: "Termine, Kunden, Nachrichten, Umsatz — am Kassen-PC oder unterwegs am Handy. Installiere die VaraaAi-App mit einem Tippen direkt von der Website, ohne Google Play oder App Store.",
      points: ["Sofortige Synchronisierung", "Installation mit einem Tippen", "Android, iPhone und Desktop"],
      install: "VaraaAi-App laden",
      web: "Website",
      phone: "Handy-App",
    },
    faq: {
      q: "Gibt es eine VaraaAi-App fürs Handy?",
      a: "Ja. Tippe in der Fußzeile oder im Menü auf \"App laden\", um VaraaAi direkt auf Handy oder Computer zu installieren — ohne Google Play oder App Store. Die App aktualisiert sich selbst und klingelt, wenn ein Kunde für heute bucht.",
    },
    footer: {
      title: "VaraaAi-App laden",
      body: "Mit einem Tippen installieren — ohne Google Play oder App Store.",
      button: "Installieren",
      installed: "Auf diesem Gerät installiert",
      platforms: "Android · iPhone · Desktop",
    },
  },
  km: {
    eyebrow: "នៅជាមួយអ្នកជានិច្ច",
    title: "មិនខកខានអតិថិជនណាម្នាក់ — ទោះអ្នកនៅទីណា",
    subtitle: "មុខងារពីរ ដែលធ្វើឱ្យម្ចាស់សាឡុងស្ងប់ចិត្តរាល់ថ្ងៃ។",
    alarm: {
      title: "សំឡេងរោទ៍ការកក់ថ្ងៃនេះ",
      body: "អតិថិជនទើបកក់សម្រាប់ថ្ងៃនេះ? ទូរស័ព្ទរោទ៍ខ្លាំង ញ័រ និងបង្ហាញម៉ោង សេវា និងឈ្មោះភ្លាមៗ។",
      points: ["រោទ៍ខ្លាំង រហូតដល់អ្នកបិទ", "គ្រប់សាខា", "ជូនដំណឹងទោះបិទកម្មវិធី"],
      mockTitle: "ការកក់ថ្មីថ្ងៃនេះ!",
      mockLine: "លាបក្រចកជែល · ជាមួយ Linh",
      mockStop: "បិទសំឡេង",
      mockView: "មើលការកក់",
    },
    app: {
      title: "គ្រប់គ្រងលើគេហទំព័រ និងកម្មវិធីទូរស័ព្ទ",
      body: "ការកក់ អតិថិជន សារ ចំណូល — លើកុំព្យូទ័រ ឬទូរស័ព្ទ។ ដំឡើងកម្មវិធី VaraaAi ពីគេហទំព័រដោយចុចតែម្តង មិនចាំបាច់ Google Play ឬ App Store។",
      points: ["ធ្វើសមកាលកម្មភ្លាមៗ", "ដំឡើងចុចតែម្តង", "Android, iPhone និងកុំព្យូទ័រ"],
      install: "ទាញយកកម្មវិធី VaraaAi",
      web: "គេហទំព័រ",
      phone: "កម្មវិធីទូរស័ព្ទ",
    },
    faq: {
      q: "តើ VaraaAi មានកម្មវិធីទូរស័ព្ទទេ?",
      a: "មាន។ ចុច \"ទាញយកកម្មវិធី\" នៅបាតទំព័រ ដើម្បីដំឡើង VaraaAi ដោយផ្ទាល់ — មិនចាំបាច់ Google Play ឬ App Store។ កម្មវិធីធ្វើបច្ចុប្បន្នភាពដោយខ្លួនឯង និងរោទ៍ពេលមានការកក់ថ្ងៃនេះ។",
    },
    footer: {
      title: "ទាញយកកម្មវិធី VaraaAi",
      body: "ដំឡើងដោយចុចតែម្តង — មិនចាំបាច់ Google Play ឬ App Store។",
      button: "ដំឡើង",
      installed: "បានដំឡើងលើឧបករណ៍នេះ",
      platforms: "Android · iPhone · កុំព្យូទ័រ",
    },
  },
  th: {
    eyebrow: "อยู่กับคุณเสมอ",
    title: "ไม่พลาดลูกค้าสักคน — ไม่ว่าคุณจะอยู่ที่ไหน",
    subtitle: "สองฟีเจอร์ที่ช่วยให้เจ้าของร้านอุ่นใจทุกวัน",
    alarm: {
      title: "เสียงเตือนการจองวันนี้",
      body: "ลูกค้าเพิ่งจองคิววันนี้? โทรศัพท์ดังเสียงดัง สั่น และแสดงเวลา บริการ ชื่อลูกค้าทันที — ไม่มีลูกค้ามาโดยร้านไม่รู้ตัว",
      points: ["ดังซ้ำจนกว่าคุณจะปิด", "ครอบคลุมทุกสาขา", "แจ้งเตือนแม้ปิดแอป"],
      mockTitle: "การจองใหม่วันนี้!",
      mockLine: "ทาสีเจล · กับ Linh",
      mockStop: "ปิดเสียง",
      mockView: "ดูการจอง",
    },
    app: {
      title: "จัดการได้ทั้งบนเว็บไซต์และแอปมือถือ",
      body: "การจอง ลูกค้า ข้อความ รายได้ — บนคอมพิวเตอร์ที่ร้านหรือมือถือเมื่ออยู่ข้างนอก ติดตั้งแอป VaraaAi จากเว็บไซต์ได้ในแตะเดียว ไม่ต้องผ่าน Google Play หรือ App Store",
      points: ["ซิงค์ทันทีระหว่างคอมและมือถือ", "ติดตั้งแตะเดียว", "Android, iPhone และคอมพิวเตอร์"],
      install: "ดาวน์โหลดแอป VaraaAi",
      web: "เว็บไซต์",
      phone: "แอปมือถือ",
    },
    faq: {
      q: "VaraaAi มีแอปมือถือไหม?",
      a: "มี แตะ \"ดาวน์โหลดแอป\" ที่ส่วนท้ายเว็บหรือเมนูเพื่อติดตั้ง VaraaAi ลงมือถือหรือคอมพิวเตอร์โดยตรง — ไม่ต้องใช้ Google Play หรือ App Store แอปอัปเดตเองและส่งเสียงเตือนเมื่อมีการจองวันนี้",
    },
    footer: {
      title: "ดาวน์โหลดแอป VaraaAi",
      body: "ติดตั้งได้ในแตะเดียว — ไม่ต้องผ่าน Google Play หรือ App Store",
      button: "ติดตั้ง",
      installed: "ติดตั้งบนอุปกรณ์นี้แล้ว",
      platforms: "Android · iPhone · คอมพิวเตอร์",
    },
  },
};

export function spotlightStrings(locale: string): SpotlightStrings {
  return STRINGS[locale] ?? STRINGS.en;
}
