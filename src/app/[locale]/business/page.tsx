import {
  CalendarDays,
  BellRing,
  Share2,
  Star,
  Gift,
  Megaphone,
  Globe,
  Users,
  Infinity as InfinityIcon,
  Check,
  Facebook,
  Instagram,
  MapPin,
} from "lucide-react";
import { Link } from "@/i18n/navigation";

// Icon + accent color for each benefit card, in the same order as each
// locale's `benefits` array below — kept separate from the copy so the 7
// translations only ever repeat text, never JSX.
const BENEFIT_META = [
  { icon: CalendarDays, color: "bg-primary-500" },
  { icon: BellRing, color: "bg-teal-500" },
  { icon: Share2, color: "bg-coral-500" },
  { icon: Star, color: "bg-berry-500" },
  { icon: Gift, color: "bg-sage-500" },
  { icon: Megaphone, color: "bg-primary-500" },
  { icon: Globe, color: "bg-teal-500" },
  { icon: Users, color: "bg-coral-500" },
];

interface LandingStrings {
  badge: string;
  heroTitle: string;
  heroSubtitle: string;
  ctaPrimary: string;
  trust: [string, string, string];
  statLabels: [string, string, string, string];
  statFreeValue: string;
  sectionTitle: string;
  sectionSubtitle: string;
  benefits: { title: string; body: string }[];
  todayLabel: string;
  reminderTitle: string;
  reminderBody: string;
  reviewQuote: string;
  reviewNote: string;
  giftCardTitle: string;
  giftCardBody: string;
  bookAnywhereLabel: string;
  stepsTitle: string;
  steps: { title: string; body: string }[];
  finalTitle: string;
  finalBody: string;
  finalCta: string;
}

const LANDING_STRINGS: Record<string, LandingStrings> = {
  vi: {
    badge: "Miễn phí trọn đời — không phí ẩn",
    heroTitle: "Quản lý salon của bạn,\nhoàn toàn miễn phí",
    heroSubtitle:
      "VaraaAi.Com là nền tảng đặt lịch hẹn dành cho salon tóc, nail, spa — giúp khách hàng đặt lịch online, còn bạn quản lý lịch hẹn, nhân viên và khách hàng mọi lúc mọi nơi.",
    ctaPrimary: "Đăng ký làm chủ salon — miễn phí",
    trust: ["Không cần thẻ tín dụng", "Sẵn sàng trong 5 phút", "Không giới hạn lượt đặt"],
    statLabels: ["Phí sử dụng", "Lượt đặt lịch", "Nhân viên", "Ngôn ngữ"],
    statFreeValue: "0đ",
    sectionTitle: "Mọi thứ salon của bạn cần",
    sectionSubtitle: "Tất cả tính năng dưới đây đều hoàn toàn miễn phí, không giới hạn.",
    benefits: [
      { title: "Quản lý lịch hẹn miễn phí", body: "Tạo trang salon, nhận đặt lịch online và quản lý toàn bộ cuộc hẹn — hoàn toàn miễn phí, không mất bất kỳ khoản phí nào." },
      { title: "Tự động nhắc lịch hẹn", body: "Khách hàng và nhân viên đều được nhắc lịch hẹn tự động, không còn lo sót lịch hay khách quên đến." },
      { title: "Nhúng lịch hẹn ở bất cứ đâu", body: "Gắn lịch đặt hẹn ngay trên website của bạn, hoặc cho khách đặt lịch trực tiếp trên Facebook, Instagram và Google Maps." },
      { title: "Tự động xin đánh giá", body: "Sau mỗi lịch hẹn, hệ thống tự động gửi lời mời đánh giá đến khách hàng, giúp bạn xây dựng uy tín nhanh hơn." },
      { title: "Thẻ quà tặng giữ chân khách", body: "Tạo thẻ quà tặng để khuyến khích khách hàng quay lại salon của bạn nhiều hơn." },
      { title: "Quảng bá đến nhiều khách hơn", body: "Salon của bạn xuất hiện trên trang tìm kiếm VaraaAi.Com, tiếp cận thêm khách hàng mới trong khu vực." },
      { title: "Đa ngôn ngữ", body: "Giao diện hỗ trợ 7 ngôn ngữ: Tiếng Việt, Anh, Phần Lan, Ba Lan, Đức, Khmer và Thái." },
      { title: "Không giới hạn nhân viên & lượt đặt", body: "Thêm bao nhiêu nhân viên tùy thích, nhận không giới hạn số lượt đặt lịch mỗi tháng." },
    ],
    todayLabel: "Hôm nay",
    reminderTitle: "Nhắc lịch hẹn",
    reminderBody: "Lịch hẹn lúc 14:00 với chị Lan",
    reviewQuote: "“Đặt lịch cực kỳ dễ, salon nhắn tin nhắc trước cả ngày!”",
    reviewNote: "Được gửi tự động sau lịch hẹn",
    giftCardTitle: "Thẻ quà tặng",
    giftCardBody: "Tặng bạn 200.000₫ tại salon",
    bookAnywhereLabel: "Nhận đặt lịch từ mọi nơi",
    stepsTitle: "Bắt đầu chỉ với 3 bước",
    steps: [
      { title: "Đăng ký miễn phí", body: "Điền thông tin salon, xác minh email — xong ngay trong vài phút." },
      { title: "Thêm dịch vụ & nhân viên", body: "Thêm danh sách dịch vụ, giá, thời lượng và đội ngũ nhân viên của bạn." },
      { title: "Nhận đặt lịch ngay", body: "Chia sẻ trang salon của bạn và bắt đầu nhận đặt lịch từ khách hàng." },
    ],
    finalTitle: "Sẵn sàng đưa salon của bạn lên VaraaAi.Com?",
    finalBody: "Hoàn toàn miễn phí, đa ngôn ngữ, không giới hạn lượt đặt hay số lượng nhân viên.",
    finalCta: "Đăng ký ngay hôm nay",
  },
  en: {
    badge: "Free forever — no hidden fees",
    heroTitle: "Run your salon,\ncompletely free",
    heroSubtitle:
      "VaraaAi.Com is the booking platform for hair salons, nail bars and spas — customers book online while you manage appointments, staff and customers from anywhere.",
    ctaPrimary: "Register as a salon owner — free",
    trust: ["No credit card needed", "Ready in 5 minutes", "Unlimited bookings"],
    statLabels: ["Platform fee", "Bookings", "Staff members", "Languages"],
    statFreeValue: "$0",
    sectionTitle: "Everything your salon needs",
    sectionSubtitle: "Every feature below is completely free, with no limits.",
    benefits: [
      { title: "Free appointment management", body: "Create your salon page, take bookings online and manage every appointment — completely free, no fees ever." },
      { title: "Automatic appointment reminders", body: "Customers and staff both get automatic reminders, so no one ever misses an appointment again." },
      { title: "Book from anywhere", body: "Embed your booking calendar on your own website, or let customers book directly from Facebook, Instagram and Google Maps." },
      { title: "Automatic review requests", body: "After every appointment, the system automatically asks the customer for a review — building your reputation on autopilot." },
      { title: "Gift cards that bring customers back", body: "Create gift cards to keep customers coming back to your salon again and again." },
      { title: "Reach more customers", body: "Your salon shows up in VaraaAi.Com search, reaching new customers in your area." },
      { title: "Multi-language", body: "The interface supports 7 languages: Vietnamese, English, Finnish, Polish, German, Khmer and Thai." },
      { title: "Unlimited staff & bookings", body: "Add as many staff members as you like and take unlimited bookings every month." },
    ],
    todayLabel: "Today",
    reminderTitle: "Reminder",
    reminderBody: "Appointment at 2:00 PM with Lisa",
    reviewQuote: "“Booking was so easy, and they reminded me the day before!”",
    reviewNote: "Sent automatically after the visit",
    giftCardTitle: "Gift card",
    giftCardBody: "€20 to spend at the salon",
    bookAnywhereLabel: "Take bookings from everywhere",
    stepsTitle: "Get started in 3 steps",
    steps: [
      { title: "Sign up for free", body: "Fill in your salon's details and verify your email — done in minutes." },
      { title: "Add your services & staff", body: "List your services, prices, durations and your team." },
      { title: "Start taking bookings", body: "Share your salon page and start receiving bookings from customers." },
    ],
    finalTitle: "Ready to bring your salon to VaraaAi.Com?",
    finalBody: "Completely free, multi-language, with no limits on bookings or staff.",
    finalCta: "Register today",
  },
  fi: {
    badge: "Ilmainen ikuisesti — ei piilokuluja",
    heroTitle: "Pyöritä salonkiasi\ntäysin ilmaiseksi",
    heroSubtitle:
      "VaraaAi.Com on ajanvarausalusta kampaamoille, kynsistudioille ja kauneushoitoloille — asiakkaat varaavat ajan verkossa, kun sinä hoidat ajanvaraukset, henkilökunnan ja asiakkaat mistä tahansa.",
    ctaPrimary: "Rekisteröidy salongin omistajaksi — ilmaiseksi",
    trust: ["Ei luottokorttia tarvita", "Käyttövalmis 5 minuutissa", "Rajattomasti varauksia"],
    statLabels: ["Käyttömaksu", "Varaukset", "Henkilökunta", "Kielet"],
    statFreeValue: "0 €",
    sectionTitle: "Kaikki mitä salonkisi tarvitsee",
    sectionSubtitle: "Jokainen alla oleva ominaisuus on täysin ilmainen, ilman rajoituksia.",
    benefits: [
      { title: "Ilmainen ajanvarauksen hallinta", body: "Luo salonkisi sivu, ota vastaan varauksia verkossa ja hallitse jokaista ajanvarausta — täysin ilmaiseksi, aina." },
      { title: "Automaattiset ajanvarausmuistutukset", body: "Sekä asiakkaat että henkilökunta saavat automaattiset muistutukset, joten kukaan ei enää unohda aikaansa." },
      { title: "Varaa mistä tahansa", body: "Upota ajanvarauskalenteri omille verkkosivuillesi, tai anna asiakkaiden varata suoraan Facebookista, Instagramista ja Google Mapsista." },
      { title: "Automaattiset arvostelupyynnöt", body: "Jokaisen käynnin jälkeen järjestelmä pyytää automaattisesti arvostelun asiakkaalta — mainettasi rakennetaan automaattiohjauksella." },
      { title: "Lahjakortit, jotka tuovat asiakkaat takaisin", body: "Luo lahjakortteja, jotka saavat asiakkaat palaamaan salonkiisi yhä uudelleen." },
      { title: "Tavoita enemmän asiakkaita", body: "Salonkisi näkyy VaraaAi.Com-haussa, ja tavoitat uusia asiakkaita alueellasi." },
      { title: "Monikielinen", body: "Käyttöliittymä tukee 7 kieltä: vietnam, englanti, suomi, puola, saksa, khmer ja thai." },
      { title: "Rajattomasti henkilökuntaa ja varauksia", body: "Lisää niin monta työntekijää kuin haluat ja ota vastaan rajattomasti varauksia joka kuukausi." },
    ],
    todayLabel: "Tänään",
    reminderTitle: "Muistutus",
    reminderBody: "Aika klo 14.00, Lisa",
    reviewQuote: "”Varaaminen oli niin helppoa, ja he muistuttivat minua jo edellisenä päivänä!”",
    reviewNote: "Lähetetään automaattisesti käynnin jälkeen",
    giftCardTitle: "Lahjakortti",
    giftCardBody: "20 € käytettäväksi salongissa",
    bookAnywhereLabel: "Ota vastaan varauksia mistä tahansa",
    stepsTitle: "Aloita vain 3 vaiheella",
    steps: [
      { title: "Rekisteröidy ilmaiseksi", body: "Täytä salonkisi tiedot ja vahvista sähköpostiosoitteesi — valmista minuuteissa." },
      { title: "Lisää palvelut ja henkilökunta", body: "Listaa palvelusi, hinnat, kestot ja tiimisi." },
      { title: "Ala ottaa vastaan varauksia", body: "Jaa salonkisi sivu ja ala vastaanottaa varauksia asiakkailta." },
    ],
    finalTitle: "Valmiina tuomaan salonkisi VaraaAi.Comiin?",
    finalBody: "Täysin ilmainen, monikielinen, ilman rajoja varauksille tai henkilökunnalle.",
    finalCta: "Rekisteröidy tänään",
  },
  pl: {
    badge: "Bezterminowo za darmo — bez ukrytych opłat",
    heroTitle: "Prowadź swój salon\ncałkowicie za darmo",
    heroSubtitle:
      "VaraaAi.Com to platforma rezerwacji dla salonów fryzjerskich, paznokciowych i spa — klienci rezerwują online, a Ty zarządzasz wizytami, pracownikami i klientami z dowolnego miejsca.",
    ctaPrimary: "Zarejestruj się jako właściciel salonu — za darmo",
    trust: ["Karta kredytowa niepotrzebna", "Gotowe w 5 minut", "Nielimitowane rezerwacje"],
    statLabels: ["Opłata za korzystanie", "Rezerwacje", "Pracownicy", "Języki"],
    statFreeValue: "0 zł",
    sectionTitle: "Wszystko, czego potrzebuje Twój salon",
    sectionSubtitle: "Każda z poniższych funkcji jest całkowicie darmowa, bez żadnych limitów.",
    benefits: [
      { title: "Darmowe zarządzanie wizytami", body: "Stwórz stronę swojego salonu, przyjmuj rezerwacje online i zarządzaj każdą wizytą — całkowicie za darmo, bez żadnych opłat." },
      { title: "Automatyczne przypomnienia o wizytach", body: "Zarówno klienci, jak i pracownicy otrzymują automatyczne przypomnienia, dzięki czemu nikt już nie zapomni o wizycie." },
      { title: "Rezerwacje z dowolnego miejsca", body: "Umieść kalendarz rezerwacji na swojej stronie internetowej lub pozwól klientom rezerwować bezpośrednio z Facebooka, Instagrama i Google Maps." },
      { title: "Automatyczne prośby o opinię", body: "Po każdej wizycie system automatycznie prosi klienta o opinię — budując Twoją reputację bez dodatkowego wysiłku." },
      { title: "Karty podarunkowe, które przyciągają klientów", body: "Twórz karty podarunkowe, aby klienci chętniej wracali do Twojego salonu." },
      { title: "Docieraj do większej liczby klientów", body: "Twój salon pojawia się w wyszukiwarce VaraaAi.Com, docierając do nowych klientów w Twojej okolicy." },
      { title: "Wielojęzyczność", body: "Interfejs obsługuje 7 języków: wietnamski, angielski, fiński, polski, niemiecki, khmerski i tajski." },
      { title: "Bez limitu pracowników i rezerwacji", body: "Dodaj tylu pracowników, ilu chcesz, i przyjmuj nieograniczoną liczbę rezerwacji każdego miesiąca." },
    ],
    todayLabel: "Dzisiaj",
    reminderTitle: "Przypomnienie",
    reminderBody: "Wizyta o 14:00 z Lisą",
    reviewQuote: "„Rezerwacja była tak prosta, a przypomnieli mi dzień wcześniej!”",
    reviewNote: "Wysyłane automatycznie po wizycie",
    giftCardTitle: "Karta podarunkowa",
    giftCardBody: "20 € do wykorzystania w salonie",
    bookAnywhereLabel: "Przyjmuj rezerwacje z dowolnego miejsca",
    stepsTitle: "Zacznij w 3 krokach",
    steps: [
      { title: "Zarejestruj się za darmo", body: "Wypełnij dane swojego salonu i potwierdź adres e-mail — gotowe w kilka minut." },
      { title: "Dodaj usługi i pracowników", body: "Wypisz swoje usługi, ceny, czas trwania i swój zespół." },
      { title: "Zacznij przyjmować rezerwacje", body: "Udostępnij stronę swojego salonu i zacznij otrzymywać rezerwacje od klientów." },
    ],
    finalTitle: "Gotowy, by przenieść swój salon do VaraaAi.Com?",
    finalBody: "Całkowicie za darmo, wielojęzyczne, bez limitu rezerwacji ani pracowników.",
    finalCta: "Zarejestruj się dziś",
  },
  de: {
    badge: "Für immer kostenlos — keine versteckten Gebühren",
    heroTitle: "Führe deinen Salon\nkomplett kostenlos",
    heroSubtitle:
      "VaraaAi.Com ist die Buchungsplattform für Friseursalons, Nagelstudios und Spas — Kunden buchen online, während du Termine, Mitarbeiter und Kunden von überall aus verwaltest.",
    ctaPrimary: "Als Salonbesitzer registrieren — kostenlos",
    trust: ["Keine Kreditkarte nötig", "In 5 Minuten startklar", "Unbegrenzte Buchungen"],
    statLabels: ["Nutzungsgebühr", "Buchungen", "Mitarbeiter", "Sprachen"],
    statFreeValue: "0 €",
    sectionTitle: "Alles, was dein Salon braucht",
    sectionSubtitle: "Jede Funktion unten ist komplett kostenlos, ohne Einschränkungen.",
    benefits: [
      { title: "Kostenlose Terminverwaltung", body: "Erstelle deine Salonseite, nimm Buchungen online entgegen und verwalte jeden Termin — komplett kostenlos, für immer." },
      { title: "Automatische Terminerinnerungen", body: "Kunden und Mitarbeiter erhalten beide automatische Erinnerungen, sodass niemand mehr einen Termin verpasst." },
      { title: "Buchungen von überall", body: "Binde deinen Buchungskalender auf deiner eigenen Website ein oder lass Kunden direkt über Facebook, Instagram und Google Maps buchen." },
      { title: "Automatische Bewertungsanfragen", body: "Nach jedem Termin bittet das System den Kunden automatisch um eine Bewertung — dein Ruf wächst wie von selbst." },
      { title: "Gutscheine, die Kunden zurückbringen", body: "Erstelle Gutscheine, damit Kunden immer wieder in deinen Salon zurückkommen." },
      { title: "Erreiche mehr Kunden", body: "Dein Salon erscheint in der VaraaAi.Com-Suche und erreicht neue Kunden in deiner Umgebung." },
      { title: "Mehrsprachig", body: "Die Oberfläche unterstützt 7 Sprachen: Vietnamesisch, Englisch, Finnisch, Polnisch, Deutsch, Khmer und Thai." },
      { title: "Unbegrenzt Mitarbeiter & Buchungen", body: "Füge so viele Mitarbeiter hinzu, wie du möchtest, und nimm jeden Monat unbegrenzt viele Buchungen entgegen." },
    ],
    todayLabel: "Heute",
    reminderTitle: "Erinnerung",
    reminderBody: "Termin um 14:00 Uhr mit Lisa",
    reviewQuote: "„Die Buchung war so einfach, und sie haben mich schon am Tag davor erinnert!“",
    reviewNote: "Wird automatisch nach dem Besuch gesendet",
    giftCardTitle: "Gutschein",
    giftCardBody: "20 € zum Einlösen im Salon",
    bookAnywhereLabel: "Buchungen von überall entgegennehmen",
    stepsTitle: "In 3 Schritten starten",
    steps: [
      { title: "Kostenlos registrieren", body: "Trage die Daten deines Salons ein und bestätige deine E-Mail — in wenigen Minuten erledigt." },
      { title: "Leistungen & Mitarbeiter hinzufügen", body: "Liste deine Leistungen, Preise, Dauer und dein Team auf." },
      { title: "Buchungen entgegennehmen", body: "Teile deine Salonseite und empfange ab sofort Buchungen von Kunden." },
    ],
    finalTitle: "Bereit, deinen Salon zu VaraaAi.Com zu bringen?",
    finalBody: "Komplett kostenlos, mehrsprachig, ohne Limit bei Buchungen oder Mitarbeitern.",
    finalCta: "Heute registrieren",
  },
  km: {
    badge: "ឥតគិតថ្លៃជារៀងរហូត — គ្មានថ្លៃសេវាលាក់",
    heroTitle: "គ្រប់គ្រងសាឡុងរបស់អ្នក\nដោយឥតគិតថ្លៃទាំងស្រុង",
    heroSubtitle:
      "VaraaAi.Com គឺជាវេទិកាកក់ការណាត់ជួបសម្រាប់សាឡុងកាត់សក់ ហាងគ្រូ និងស្ប៉ា — អតិថិជនកក់តាមអនឡាញ ខណៈអ្នកគ្រប់គ្រងការណាត់ជួប បុគ្គលិក និងអតិថិជនរបស់អ្នកគ្រប់ទីកន្លែង។",
    ctaPrimary: "ចុះឈ្មោះជាម្ចាស់សាឡុង — ឥតគិតថ្លៃ",
    trust: ["មិនចាំបាច់ប្រើប័ណ្ណឥណទាន", "ត្រៀមរួចក្នុងរយៈពេល ៥ នាទី", "កក់បានគ្មានដែនកំណត់"],
    statLabels: ["ថ្លៃប្រើប្រាស់", "ការកក់", "បុគ្គលិក", "ភាសា"],
    statFreeValue: "០ ៛",
    sectionTitle: "អ្វីៗគ្រប់យ៉ាងដែលសាឡុងរបស់អ្នកត្រូវការ",
    sectionSubtitle: "មុខងារខាងក្រោមទាំងអស់ឥតគិតថ្លៃទាំងស្រុង និងគ្មានដែនកំណត់។",
    benefits: [
      { title: "ការគ្រប់គ្រងការណាត់ជួបឥតគិតថ្លៃ", body: "បង្កើតទំព័រសាឡុងរបស់អ្នក ទទួលការកក់តាមអនឡាញ និងគ្រប់គ្រងរាល់ការណាត់ជួប — ឥតគិតថ្លៃទាំងស្រុង គ្មានកាលកំណត់។" },
      { title: "ការរំលឹកការណាត់ជួបដោយស្វ័យប្រវត្តិ", body: "ទាំងអតិថិជននិងបុគ្គលិកទទួលបានការរំលឹកដោយស្វ័យប្រវត្តិ ដូច្នេះគ្មាននរណាម្នាក់ភ្លេចការណាត់ជួបទៀតឡើយ។" },
      { title: "កក់បានពីគ្រប់ទីកន្លែង", body: "បញ្ចូលប្រតិទិនកក់លើគេហទំព័ររបស់អ្នកផ្ទាល់ ឬអនុញ្ញាតឱ្យអតិថិជនកក់ដោយផ្ទាល់តាម Facebook, Instagram និង Google Maps។" },
      { title: "សំណើសុំការវាយតម្លៃដោយស្វ័យប្រវត្តិ", body: "បន្ទាប់ពីរាល់ការណាត់ជួប ប្រព័ន្ធនឹងស្នើសុំការវាយតម្លៃពីអតិថិជនដោយស្វ័យប្រវត្តិ — ជួយកសាងកេរ្តិ៍ឈ្មោះរបស់អ្នកដោយស្វ័យប្រវត្តិ។" },
      { title: "កាតអំណោយដែលនាំអតិថិជនត្រឡប់មកវិញ", body: "បង្កើតកាតអំណោយ ដើម្បីលើកទឹកចិត្តអតិថិជនឱ្យត្រឡប់មកសាឡុងរបស់អ្នកជាថ្មីម្តងទៀត។" },
      { title: "ទាក់ទាញអតិថិជនកាន់តែច្រើន", body: "សាឡុងរបស់អ្នកនឹងបង្ហាញនៅលើការស្វែងរករបស់ VaraaAi.Com ជួយទាក់ទាញអតិថិជនថ្មីនៅក្នុងតំបន់របស់អ្នក។" },
      { title: "ពហុភាសា", body: "ចំណុចប្រទាក់គាំទ្រ ៧ ភាសា៖ វៀតណាម អង់គ្លេស ហ្វាំង ប៉ូឡូញ អាល្លឺម៉ង់ ខ្មែរ និងថៃ។" },
      { title: "គ្មានដែនកំណត់សម្រាប់បុគ្គលិក និងការកក់", body: "បន្ថែមបុគ្គលិកប៉ុន្មានតាមតែអ្នកចង់បាន ហើយទទួលការកក់គ្មានដែនកំណត់រៀងរាល់ខែ។" },
    ],
    todayLabel: "ថ្ងៃនេះ",
    reminderTitle: "ការរំលឹក",
    reminderBody: "ការណាត់ជួបម៉ោង ២ រសៀល ជាមួយលីសា",
    reviewQuote: "«ការកក់ងាយស្រួលណាស់ ហើយពួកគេបានរំលឹកខ្ញុំតាំងពីមួយថ្ងៃមុន!»",
    reviewNote: "បញ្ជូនដោយស្វ័យប្រវត្តិបន្ទាប់ពីការមកលេង",
    giftCardTitle: "កាតអំណោយ",
    giftCardBody: "៨០.០០០ ៛ សម្រាប់ចំណាយនៅសាឡុង",
    bookAnywhereLabel: "ទទួលការកក់ពីគ្រប់ទីកន្លែង",
    stepsTitle: "ចាប់ផ្តើមគ្រាន់តែ ៣ ជំហាន",
    steps: [
      { title: "ចុះឈ្មោះឥតគិតថ្លៃ", body: "បំពេញព័ត៌មានសាឡុងរបស់អ្នក និងបញ្ជាក់អ៊ីមែល — រួចរាល់ក្នុងរយៈពេលប៉ុន្មាននាទី។" },
      { title: "បន្ថែមសេវាកម្ម និងបុគ្គលិក", body: "រាយបញ្ជីសេវាកម្ម តម្លៃ រយៈពេល និងក្រុមការងាររបស់អ្នក។" },
      { title: "ចាប់ផ្តើមទទួលការកក់", body: "ចែករំលែកទំព័រសាឡុងរបស់អ្នក ហើយចាប់ផ្តើមទទួលការកក់ពីអតិថិជន។" },
    ],
    finalTitle: "ត្រៀមខ្លួននាំសាឡុងរបស់អ្នកមកកាន់ VaraaAi.Com ហើយឬនៅ?",
    finalBody: "ឥតគិតថ្លៃទាំងស្រុង ពហុភាសា គ្មានដែនកំណត់ចំពោះការកក់ ឬចំនួនបុគ្គលិក។",
    finalCta: "ចុះឈ្មោះថ្ងៃនេះ",
  },
  th: {
    badge: "ฟรีตลอดไป — ไม่มีค่าธรรมเนียมแอบแฝง",
    heroTitle: "บริหารร้านของคุณ\nฟรีทั้งหมด",
    heroSubtitle:
      "VaraaAi.Com คือแพลตฟอร์มจองคิวสำหรับร้านทำผม ร้านทำเล็บ และสปา — ลูกค้าจองออนไลน์ ในขณะที่คุณจัดการนัดหมาย พนักงาน และลูกค้าได้จากทุกที่",
    ctaPrimary: "ลงทะเบียนเป็นเจ้าของร้าน — ฟรี",
    trust: ["ไม่ต้องใช้บัตรเครดิต", "พร้อมใช้งานใน 5 นาที", "จองได้ไม่จำกัด"],
    statLabels: ["ค่าใช้บริการ", "การจอง", "พนักงาน", "ภาษา"],
    statFreeValue: "0 ฿",
    sectionTitle: "ทุกสิ่งที่ร้านของคุณต้องการ",
    sectionSubtitle: "ทุกฟีเจอร์ด้านล่างนี้ฟรีทั้งหมด ไม่มีข้อจำกัด",
    benefits: [
      { title: "จัดการนัดหมายฟรี", body: "สร้างหน้าร้านของคุณ รับการจองออนไลน์ และจัดการทุกนัดหมาย — ฟรีทั้งหมด ไม่มีค่าใช้จ่ายตลอดไป" },
      { title: "แจ้งเตือนนัดหมายอัตโนมัติ", body: "ทั้งลูกค้าและพนักงานจะได้รับการแจ้งเตือนอัตโนมัติ จึงไม่มีใครพลาดนัดอีกต่อไป" },
      { title: "รับจองจากทุกที่", body: "ฝังปฏิทินการจองไว้บนเว็บไซต์ของคุณเอง หรือให้ลูกค้าจองโดยตรงผ่าน Facebook, Instagram และ Google Maps" },
      { title: "ขอรีวิวอัตโนมัติ", body: "หลังจากทุกนัดหมาย ระบบจะขอรีวิวจากลูกค้าโดยอัตโนมัติ — สร้างชื่อเสียงให้คุณแบบอัตโนมัติ" },
      { title: "บัตรของขวัญที่ดึงลูกค้ากลับมา", body: "สร้างบัตรของขวัญเพื่อดึงดูดให้ลูกค้ากลับมาที่ร้านของคุณอีกครั้ง" },
      { title: "เข้าถึงลูกค้าได้มากขึ้น", body: "ร้านของคุณจะปรากฏในการค้นหาของ VaraaAi.Com เข้าถึงลูกค้าใหม่ในพื้นที่ของคุณ" },
      { title: "รองรับหลายภาษา", body: "อินเทอร์เฟซรองรับ 7 ภาษา ได้แก่ เวียดนาม อังกฤษ ฟินแลนด์ โปแลนด์ เยอรมัน เขมร และไทย" },
      { title: "ไม่จำกัดพนักงานและการจอง", body: "เพิ่มพนักงานได้มากเท่าที่ต้องการ และรับการจองได้ไม่จำกัดทุกเดือน" },
    ],
    todayLabel: "วันนี้",
    reminderTitle: "การแจ้งเตือน",
    reminderBody: "นัดหมายเวลา 14:00 น. กับลิซ่า",
    reviewQuote: "“จองง่ายมาก แถมร้านยังส่งข้อความเตือนล่วงหน้าหนึ่งวัน!”",
    reviewNote: "ส่งอัตโนมัติหลังจากใช้บริการ",
    giftCardTitle: "บัตรของขวัญ",
    giftCardBody: "700 ฿ ใช้จ่ายที่ร้าน",
    bookAnywhereLabel: "รับการจองจากทุกช่องทาง",
    stepsTitle: "เริ่มต้นง่ายๆ เพียง 3 ขั้นตอน",
    steps: [
      { title: "ลงทะเบียนฟรี", body: "กรอกข้อมูลร้านของคุณและยืนยันอีเมล — เสร็จภายในไม่กี่นาที" },
      { title: "เพิ่มบริการและพนักงาน", body: "ระบุบริการ ราคา ระยะเวลา และทีมงานของคุณ" },
      { title: "เริ่มรับการจอง", body: "แชร์หน้าร้านของคุณและเริ่มรับการจองจากลูกค้า" },
    ],
    finalTitle: "พร้อมนำร้านของคุณเข้าสู่ VaraaAi.Com หรือยัง?",
    finalBody: "ฟรีทั้งหมด รองรับหลายภาษา ไม่จำกัดการจองหรือจำนวนพนักงาน",
    finalCta: "ลงทะเบียนวันนี้",
  },
};

export default async function BusinessLandingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = LANDING_STRINGS[locale] ?? LANDING_STRINGS.en;
  const benefits = BENEFIT_META.map((meta, i) => ({ ...meta, ...t.benefits[i] }));

  return (
    <div>
      {/* Hero */}
      <section className="bg-peach-100">
        <div className="container flex flex-col items-center gap-6 py-16 text-center sm:py-24">
          <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-primary-600 shadow-card">
            {t.badge}
          </span>
          <h1 className="max-w-2xl whitespace-pre-line text-4xl font-extrabold leading-[1.1] tracking-tight text-ink-900 sm:text-6xl">
            {t.heroTitle}
          </h1>
          <p className="max-w-xl text-base text-ink-700 sm:text-lg">{t.heroSubtitle}</p>
          <div className="flex flex-col items-center gap-3">
            <Link href="/business/apply" className="btn-accent !px-8 !py-3.5 text-base">
              {t.ctaPrimary}
            </Link>
            <p className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-400">
              {t.trust.map((item) => (
                <span key={item} className="flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 text-sage-500" />
                  {item}
                </span>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-ink-100 bg-white">
        <div className="container grid grid-cols-2 gap-6 py-10 text-center sm:grid-cols-4">
          {[
            { value: t.statFreeValue, label: t.statLabels[0] },
            { value: "∞", label: t.statLabels[1] },
            { value: "∞", label: t.statLabels[2] },
            { value: "7", label: t.statLabels[3] },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-3xl font-extrabold text-ink-900 sm:text-4xl">{s.value}</p>
              <p className="mt-1 text-xs text-ink-400 sm:text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits grid */}
      <section className="container py-16">
        <div className="mx-auto mb-10 max-w-xl text-center">
          <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">{t.sectionTitle}</h2>
          <p className="mt-2 text-sm text-ink-400">{t.sectionSubtitle}</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="card p-5">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${b.color}`}>
                <b.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mb-1.5 font-semibold text-ink-900">{b.title}</h3>
              <p className="text-sm text-ink-400">{b.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Illustrative showcase */}
      <section className="bg-mist-50 py-16">
        <div className="container grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Mock calendar + reminder toast */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="card p-4">
              <div className="mb-3 flex items-center gap-2">
                {[
                  { label: "L", color: "bg-primary-500" },
                  { label: "H", color: "bg-teal-500" },
                  { label: "R", color: "bg-coral-500" },
                ].map((s) => (
                  <span
                    key={s.label}
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${s.color}`}
                  >
                    {s.label}
                  </span>
                ))}
                <span className="ml-auto text-xs text-ink-400">{t.todayLabel}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-2">
                  <div className="h-10 rounded-lg border-l-4 border-primary-500 bg-primary-50" />
                  <div className="h-14 rounded-lg border-l-4 border-primary-500 bg-primary-50" />
                </div>
                <div className="space-y-2 pt-6">
                  <div className="h-14 rounded-lg border-l-4 border-teal-400 bg-teal-50" />
                  <div className="h-8 rounded-lg border-l-4 border-teal-400 bg-teal-50" />
                </div>
                <div className="space-y-2 pt-3">
                  <div className="h-8 rounded-lg border-l-4 border-coral-400 bg-coral-100" />
                  <div className="h-16 rounded-lg border-l-4 border-coral-400 bg-coral-100" />
                </div>
              </div>
            </div>
            <div className="animate-slide-up absolute -right-4 -top-6 flex max-w-[13rem] items-start gap-2 rounded-2xl bg-white p-3 text-left shadow-popover sm:-right-8">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-berry-50 text-berry-500">
                <BellRing className="h-4 w-4" />
              </span>
              <p className="text-xs text-ink-700">
                <span className="font-semibold text-ink-900">{t.reminderTitle}</span>
                <br />
                {t.reminderBody}
              </p>
            </div>
          </div>

          {/* Mock review + gift card */}
          <div className="space-y-4">
            <div className="card flex items-start gap-3 p-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-coral-50 text-lg font-bold text-coral-500">
                M
              </span>
              <div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-coral-500 text-coral-500" />
                  ))}
                </div>
                <p className="mt-1 text-sm text-ink-700">{t.reviewQuote}</p>
                <p className="mt-1 text-xs text-ink-400">{t.reviewNote}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-br from-berry-500 to-primary-600 p-4 text-white shadow-card">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/20">
                <Gift className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold">{t.giftCardTitle}</p>
                <p className="text-sm text-white/80">{t.giftCardBody}</p>
              </div>
            </div>

            <div className="card p-4">
              <p className="mb-3 text-xs font-medium text-ink-400">{t.bookAnywhereLabel}</p>
              <div className="flex items-center justify-between">
                {[Facebook, Instagram, MapPin, Globe].map((Icon, i) => (
                  <span
                    key={i}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-mist-100 text-ink-700"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                ))}
                <span className="text-ink-100">···</span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink-900 text-white">
                  <CalendarDays className="h-4 w-4" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="container py-16">
        <h2 className="mb-10 text-center text-2xl font-bold text-ink-900 sm:text-3xl">
          {t.stepsTitle}
        </h2>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {t.steps.map((s, i) => (
            <div key={s.title} className="text-center">
              <span className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-ink-900 text-lg font-bold text-white">
                {i + 1}
              </span>
              <h3 className="mb-1.5 font-semibold text-ink-900">{s.title}</h3>
              <p className="text-sm text-ink-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink-900">
        <div className="container flex flex-col items-center gap-4 py-16 text-center">
          <InfinityIcon className="h-8 w-8 text-primary-300" />
          <h2 className="text-2xl font-bold text-white sm:text-3xl">{t.finalTitle}</h2>
          <p className="max-w-md text-sm text-ink-100">{t.finalBody}</p>
          <Link href="/business/apply" className="btn-accent mt-2 !px-8 !py-3.5 text-base">
            {t.finalCta}
          </Link>
        </div>
      </section>
    </div>
  );
}
