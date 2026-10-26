import { C, SITE_URL, button, emailLayout, esc, headingFont, notice, para, sectionTitle, steps } from "@/lib/email/ui";
import { loyaltyScanUrl } from "@/lib/loyalty";
import { REFERRAL_TICKETS } from "@/lib/loyalty-referral-constants";

/** The welcome email a customer gets when a salon activates their loyalty
 * card: a VIP member card with their name and QR, how to use it (including
 * scanning it themselves to check their tickets), and the invite-a-friend
 * bonus. Written in the salon's own customer language. */

type L = "vi" | "en" | "fi" | "pl" | "de" | "km" | "th";

interface Strings {
  subject: (salon: string) => string;
  preheader: (salon: string, n: number, pct: number) => string;
  eyebrow: string;
  title: (first: string, salon: string) => string;
  intro: string;
  dear: string;
  letter: (salon: string) => string;
  vip: string;
  member: string;
  cardCode: string;
  reward: string;
  rewardText: (n: number, pct: number) => string;
  journey: (n: number) => string;
  viewCard: string;
  fallback: string;
  howTitle: string;
  steps: (n: number, pct: number) => { title: string; body: string }[];
  inviteTitle: (bonus: number) => string;
  inviteBody: (salon: string, bonus: number) => string;
  privacy: string;
  cardPrice: (price: string) => string;
  closing: string;
  signoff: string;
}

const S: Record<L, Strings> = {
  vi: {
    subject: (b) => `Chào mừng bạn đến với ${b} — thẻ thành viên VIP của bạn đã sẵn sàng`,
    preheader: (b, n, p) => `Thẻ thành viên riêng của bạn tại ${b}: đủ ${n} vé, được giảm ${p}%.`,
    eyebrow: "Thẻ thành viên VIP",
    title: (f, b) => `Chào mừng ${f} đến với ${b}`,
    intro: "Thẻ thành viên của bạn đã được kích hoạt. Mỗi lần ghé thăm là một bước gần hơn tới ưu đãi dành riêng cho bạn.",
    dear: "Thân gửi",
    letter: (b) =>
      `Cảm ơn bạn đã tin tưởng và lựa chọn ${b}. Để tri ân sự gắn bó của bạn, chúng tôi đã tạo một thẻ thành viên mang tên riêng bạn. Thẻ nằm ngay trong điện thoại — không cần mang thẻ giấy, không cần cài ứng dụng.`,
    vip: "VIP",
    member: "Thành viên",
    cardCode: "Mã thẻ",
    reward: "Ưu đãi",
    rewardText: (n, p) => `Đủ ${n} vé · giảm ${p}%`,
    journey: (n) => `0 / ${n} vé — hành trình của bạn bắt đầu từ hôm nay`,
    viewCard: "Xem thẻ của tôi",
    fallback: "Nút không hoạt động? Mở đường link này:",
    howTitle: "Cách sử dụng thẻ",
    steps: (n, p) => [
      { title: "Lưu mã QR của bạn", body: "Giữ lại email này hoặc chụp màn hình mã QR. Ảnh mã QR cũng được đính kèm để bạn lưu vào điện thoại." },
      { title: "Đưa mã cho nhân viên mỗi lần đến", body: "Sau mỗi lần làm dịch vụ, nhân viên quét mã QR và tặng bạn 1 vé." },
      {
        title: "Tự kiểm tra thẻ bất cứ lúc nào",
        body: "Mở camera điện thoại và hướng vào mã QR — trang thẻ của bạn sẽ hiện ra với số vé, lịch sử và ưu đãi. Nếu đang đọc email trên điện thoại, chỉ cần bấm “Xem thẻ của tôi”.",
      },
      { title: "Nhận ưu đãi", body: `Khi đủ ${n} vé, bạn được giảm ${p}% cho lần làm đẹp tiếp theo. Sau đó thẻ bắt đầu lại để bạn tiếp tục tích vé.` },
    ],
    inviteTitle: (x) => `Mời bạn bè — nhận thêm ${x} vé`,
    inviteBody: (b, x) =>
      `Mở thẻ của bạn và sao chép link mời riêng. Khi bạn bè đặt lịch qua link đó và đến ${b} lần đầu, bạn tự động được tặng thêm ${x} vé.`,
    privacy: "Mã QR này là thẻ riêng của bạn. Khi giới thiệu bạn bè, hãy gửi link mời thay vì mã QR.",
    cardPrice: (p) => `Giá thẻ: ${p}`,
    closing: "Rất mong được đón tiếp bạn trong lần ghé thăm tới.",
    signoff: "Trân trọng,",
  },
  en: {
    subject: (b) => `Welcome to ${b} — your VIP member card is ready`,
    preheader: (b, n, p) => `Your personal member card at ${b}: collect ${n} tickets, get ${p}% off.`,
    eyebrow: "VIP member card",
    title: (f, b) => `Welcome to ${b}, ${f}`,
    intro: "Your member card is now active. Every visit brings you one step closer to a reward made just for you.",
    dear: "Dear",
    letter: (b) =>
      `Thank you for choosing ${b}. To thank you for your loyalty, we've created a member card in your name. It lives on your phone — no paper card to carry, no app to install.`,
    vip: "VIP",
    member: "Member",
    cardCode: "Card code",
    reward: "Reward",
    rewardText: (n, p) => `${n} tickets · ${p}% off`,
    journey: (n) => `0 / ${n} tickets — your journey starts today`,
    viewCard: "View my card",
    fallback: "Button not working? Open this link:",
    howTitle: "How to use your card",
    steps: (n, p) => [
      { title: "Keep your QR code", body: "Keep this email or take a screenshot of the QR code. It's also attached as an image you can save to your phone." },
      { title: "Show it at every visit", body: "After each treatment, the staff scan your QR code and give you 1 ticket." },
      {
        title: "Check your card any time",
        body: "Point your phone camera at the QR code and your card opens with your tickets, history and reward. Reading this on your phone? Just tap “View my card”.",
      },
      { title: "Enjoy your reward", body: `Once you have ${n} tickets, you get ${p}% off your next visit. Then your card starts over so you can keep collecting.` },
    ],
    inviteTitle: (x) => `Invite a friend — get ${x} more tickets`,
    inviteBody: (b, x) =>
      `Open your card and copy your personal invite link. When a friend books through it and visits ${b} for the first time, you automatically get ${x} extra tickets.`,
    privacy: "This QR code is your personal card. When recommending us to friends, share your invite link rather than the QR code.",
    cardPrice: (p) => `Card price: ${p}`,
    closing: "We look forward to welcoming you on your next visit.",
    signoff: "Warm regards,",
  },
  fi: {
    subject: (b) => `Tervetuloa ${b} -kanta-asiakkaaksi — VIP-jäsenkorttisi on valmis`,
    preheader: (b, n, p) => `Henkilökohtainen jäsenkorttisi (${b}): kerää ${n} lippua ja saat ${p} % alennuksen.`,
    eyebrow: "VIP-jäsenkortti",
    title: (f, b) => `Tervetuloa, ${f} — ${b} kiittää`,
    intro: "Jäsenkorttisi on nyt aktivoitu. Jokainen käynti vie sinut askeleen lähemmäs juuri sinulle tarkoitettua etua.",
    dear: "Hyvä",
    letter: (b) =>
      `Kiitos, että valitsit ${b}. Kiitokseksi uskollisuudestasi teimme sinulle omalla nimelläsi olevan jäsenkortin. Kortti kulkee puhelimessasi — ei paperikorttia, ei sovellusta asennettavaksi.`,
    vip: "VIP",
    member: "Jäsen",
    cardCode: "Kortin koodi",
    reward: "Etu",
    rewardText: (n, p) => `${n} lippua · ${p} % alennus`,
    journey: (n) => `0 / ${n} lippua — matkasi alkaa tänään`,
    viewCard: "Näytä korttini",
    fallback: "Eikö painike toimi? Avaa tämä linkki:",
    howTitle: "Näin käytät korttia",
    steps: (n, p) => [
      { title: "Tallenna QR-koodisi", body: "Säilytä tämä sähköposti tai ota QR-koodista kuvakaappaus. Koodi on myös liitteenä kuvana, jonka voit tallentaa puhelimeesi." },
      { title: "Näytä koodi jokaisella käynnillä", body: "Jokaisen hoidon jälkeen henkilökunta skannaa QR-koodisi ja antaa sinulle 1 lipun." },
      {
        title: "Tarkista korttisi milloin tahansa",
        body: "Osoita puhelimen kameralla QR-koodia, niin korttisi aukeaa lippuineen, historioineen ja etuineen. Luetko tätä puhelimella? Napauta vain ”Näytä korttini”.",
      },
      { title: "Nauti edustasi", body: `Kun sinulla on ${n} lippua, saat ${p} % alennuksen seuraavasta käynnistä. Sen jälkeen kortti alkaa alusta.` },
    ],
    inviteTitle: (x) => `Kutsu ystävä — saat ${x} lippua lisää`,
    inviteBody: (b, x) =>
      `Avaa korttisi ja kopioi henkilökohtainen kutsulinkkisi. Kun ystäväsi varaa sen kautta ja käy ${b} ensimmäistä kertaa, saat automaattisesti ${x} lisälippua.`,
    privacy: "Tämä QR-koodi on henkilökohtainen korttisi. Kun suosittelet meitä ystäville, jaa kutsulinkki QR-koodin sijaan.",
    cardPrice: (p) => `Kortin hinta: ${p}`,
    closing: "Odotamme innolla seuraavaa käyntiäsi.",
    signoff: "Lämpimin terveisin,",
  },
  pl: {
    subject: (b) => `Witamy w ${b} — Twoja karta VIP jest gotowa`,
    preheader: (b, n, p) => `Twoja osobista karta członkowska w ${b}: zbierz ${n} biletów i otrzymaj ${p}% zniżki.`,
    eyebrow: "Karta członkowska VIP",
    title: (f, b) => `Witamy w ${b}, ${f}`,
    intro: "Twoja karta członkowska jest już aktywna. Każda wizyta przybliża Cię do nagrody przygotowanej specjalnie dla Ciebie.",
    dear: "Droga/Drogi",
    letter: (b) =>
      `Dziękujemy, że wybierasz ${b}. W podziękowaniu za Twoją lojalność przygotowaliśmy kartę członkowską na Twoje nazwisko. Jest zawsze w telefonie — bez papierowej karty i bez instalowania aplikacji.`,
    vip: "VIP",
    member: "Członek",
    cardCode: "Kod karty",
    reward: "Nagroda",
    rewardText: (n, p) => `${n} biletów · ${p}% zniżki`,
    journey: (n) => `0 / ${n} biletów — Twoja podróż zaczyna się dziś`,
    viewCard: "Zobacz moją kartę",
    fallback: "Przycisk nie działa? Otwórz ten link:",
    howTitle: "Jak korzystać z karty",
    steps: (n, p) => [
      { title: "Zachowaj kod QR", body: "Zachowaj tę wiadomość lub zrób zrzut ekranu kodu QR. Kod jest też w załączniku jako obraz do zapisania w telefonie." },
      { title: "Pokaż go przy każdej wizycie", body: "Po każdym zabiegu personel skanuje Twój kod QR i dodaje 1 bilet." },
      {
        title: "Sprawdzaj kartę w każdej chwili",
        body: "Skieruj aparat telefonu na kod QR, a otworzy się Twoja karta z biletami, historią i nagrodą. Czytasz to w telefonie? Kliknij „Zobacz moją kartę”.",
      },
      { title: "Odbierz nagrodę", body: `Gdy zbierzesz ${n} biletów, otrzymasz ${p}% zniżki na kolejną wizytę. Potem karta zaczyna się od nowa.` },
    ],
    inviteTitle: (x) => `Zaproś znajomą osobę — zdobądź ${x} bilety więcej`,
    inviteBody: (b, x) =>
      `Otwórz swoją kartę i skopiuj osobisty link z zaproszeniem. Gdy znajoma osoba zarezerwuje przez niego i odwiedzi ${b} po raz pierwszy, automatycznie otrzymasz ${x} dodatkowe bilety.`,
    privacy: "Ten kod QR to Twoja osobista karta. Polecając nas znajomym, wysyłaj link z zaproszeniem zamiast kodu QR.",
    cardPrice: (p) => `Cena karty: ${p}`,
    closing: "Z radością powitamy Cię podczas kolejnej wizyty.",
    signoff: "Serdecznie pozdrawiamy,",
  },
  de: {
    subject: (b) => `Willkommen bei ${b} — deine VIP-Mitgliedskarte ist bereit`,
    preheader: (b, n, p) => `Deine persönliche Mitgliedskarte bei ${b}: ${n} Tickets sammeln, ${p}% Rabatt erhalten.`,
    eyebrow: "VIP-Mitgliedskarte",
    title: (f, b) => `Willkommen bei ${b}, ${f}`,
    intro: "Deine Mitgliedskarte ist jetzt aktiv. Jeder Besuch bringt dich einen Schritt näher zu einer Prämie, die nur für dich gedacht ist.",
    dear: "Liebe/r",
    letter: (b) =>
      `Danke, dass du dich für ${b} entschieden hast. Als Dankeschön für deine Treue haben wir eine Mitgliedskarte auf deinen Namen erstellt. Sie ist immer auf deinem Handy — keine Papierkarte, keine App.`,
    vip: "VIP",
    member: "Mitglied",
    cardCode: "Kartencode",
    reward: "Prämie",
    rewardText: (n, p) => `${n} Tickets · ${p}% Rabatt`,
    journey: (n) => `0 / ${n} Tickets — deine Reise beginnt heute`,
    viewCard: "Meine Karte ansehen",
    fallback: "Button funktioniert nicht? Öffne diesen Link:",
    howTitle: "So nutzt du deine Karte",
    steps: (n, p) => [
      { title: "QR-Code aufbewahren", body: "Bewahre diese E-Mail auf oder mache einen Screenshot des QR-Codes. Er ist auch als Bild angehängt, das du auf deinem Handy speichern kannst." },
      { title: "Bei jedem Besuch vorzeigen", body: "Nach jeder Behandlung scannt das Team deinen QR-Code und schenkt dir 1 Ticket." },
      {
        title: "Karte jederzeit prüfen",
        body: "Richte deine Handykamera auf den QR-Code und deine Karte öffnet sich mit Tickets, Verlauf und Prämie. Liest du das auf dem Handy? Tippe einfach auf „Meine Karte ansehen“.",
      },
      { title: "Prämie genießen", body: `Mit ${n} Tickets bekommst du ${p}% Rabatt auf deinen nächsten Besuch. Danach beginnt deine Karte von vorn.` },
    ],
    inviteTitle: (x) => `Freunde einladen — ${x} Tickets extra`,
    inviteBody: (b, x) =>
      `Öffne deine Karte und kopiere deinen persönlichen Einladungslink. Wenn jemand darüber bucht und ${b} zum ersten Mal besucht, bekommst du automatisch ${x} Tickets extra.`,
    privacy: "Dieser QR-Code ist deine persönliche Karte. Wenn du uns weiterempfiehlst, teile lieber deinen Einladungslink statt des QR-Codes.",
    cardPrice: (p) => `Kartenpreis: ${p}`,
    closing: "Wir freuen uns auf deinen nächsten Besuch.",
    signoff: "Herzliche Grüße,",
  },
  km: {
    subject: (b) => `សូមស្វាគមន៍មកកាន់ ${b} — កាតសមាជិក VIP របស់អ្នករួចរាល់ហើយ`,
    preheader: (b, n, p) => `កាតសមាជិករបស់អ្នកនៅ ${b}៖ ប្រមូល ${n} សំបុត្រ ទទួលបានការបញ្ចុះតម្លៃ ${p}%។`,
    eyebrow: "កាតសមាជិក VIP",
    title: (f, b) => `សូមស្វាគមន៍ ${f} មកកាន់ ${b}`,
    intro: "កាតសមាជិករបស់អ្នកត្រូវបានដំណើរការហើយ។ រាល់ការមកលេងនាំអ្នកកាន់តែជិតរង្វាន់ពិសេសសម្រាប់អ្នក។",
    dear: "ជូនចំពោះ",
    letter: (b) =>
      `សូមអរគុណដែលបានជ្រើសរើស ${b}។ ដើម្បីថ្លែងអំណរគុណចំពោះភាពស្មោះត្រង់របស់អ្នក យើងបានបង្កើតកាតសមាជិកក្នុងឈ្មោះរបស់អ្នក។ កាតនៅក្នុងទូរស័ព្ទរបស់អ្នក — មិនចាំបាច់កាតក្រដាស ឬដំឡើងកម្មវិធីទេ។`,
    vip: "VIP",
    member: "សមាជិក",
    cardCode: "កូដកាត",
    reward: "រង្វាន់",
    rewardText: (n, p) => `${n} សំបុត្រ · បញ្ចុះ ${p}%`,
    journey: (n) => `0 / ${n} សំបុត្រ — ដំណើររបស់អ្នកចាប់ផ្តើមថ្ងៃនេះ`,
    viewCard: "មើលកាតរបស់ខ្ញុំ",
    fallback: "ប៊ូតុងមិនដំណើរការ? បើកតំណនេះ៖",
    howTitle: "របៀបប្រើកាត",
    steps: (n, p) => [
      { title: "រក្សាទុកកូដ QR", body: "រក្សាអ៊ីមែលនេះ ឬថតអេក្រង់កូដ QR។ កូដក៏ត្រូវបានភ្ជាប់ជារូបភាពផងដែរ។" },
      { title: "បង្ហាញរាល់ពេលមកលេង", body: "បន្ទាប់ពីប្រើសេវានីមួយៗ បុគ្គលិកនឹងស្កេនកូដ QR ហើយផ្តល់ឱ្យអ្នក 1 សំបុត្រ។" },
      { title: "ពិនិត្យកាតបានគ្រប់ពេល", body: "បើកកាមេរ៉ាទូរស័ព្ទហើយតម្រង់ទៅកូដ QR — កាតរបស់អ្នកនឹងបង្ហាញចំនួនសំបុត្រ ប្រវត្តិ និងរង្វាន់។ ឬចុច “មើលកាតរបស់ខ្ញុំ”។" },
      { title: "ទទួលរង្វាន់", body: `ពេលមាន ${n} សំបុត្រ អ្នកទទួលបានការបញ្ចុះតម្លៃ ${p}% សម្រាប់ការមកលើកក្រោយ។` },
    ],
    inviteTitle: (x) => `អញ្ជើញមិត្តភក្តិ — ទទួលបាន ${x} សំបុត្របន្ថែម`,
    inviteBody: (b, x) => `បើកកាតរបស់អ្នក ហើយចម្លងតំណអញ្ជើញ។ ពេលមិត្តភក្តិកក់តាមតំណនោះ ហើយមក ${b} លើកដំបូង អ្នកនឹងទទួលបាន ${x} សំបុត្របន្ថែមដោយស្វ័យប្រវត្តិ។`,
    privacy: "កូដ QR នេះជាកាតផ្ទាល់ខ្លួនរបស់អ្នក។ ពេលណែនាំមិត្តភក្តិ សូមផ្ញើតំណអញ្ជើញជំនួសកូដ QR។",
    cardPrice: (p) => `តម្លៃកាត៖ ${p}`,
    closing: "យើងរង់ចាំស្វាគមន៍អ្នកនៅពេលក្រោយ។",
    signoff: "ដោយក្តីគោរព",
  },
  th: {
    subject: (b) => `ยินดีต้อนรับสู่ ${b} — บัตรสมาชิก VIP ของคุณพร้อมแล้ว`,
    preheader: (b, n, p) => `บัตรสมาชิกของคุณที่ ${b}: สะสมครบ ${n} ตั๋ว รับส่วนลด ${p}%`,
    eyebrow: "บัตรสมาชิก VIP",
    title: (f, b) => `ยินดีต้อนรับคุณ${f} สู่ ${b}`,
    intro: "บัตรสมาชิกของคุณเปิดใช้งานแล้ว ทุกการมาเยือนจะพาคุณใกล้สิทธิพิเศษที่เตรียมไว้สำหรับคุณโดยเฉพาะ",
    dear: "เรียนคุณ",
    letter: (b) =>
      `ขอบคุณที่เลือก ${b} เพื่อขอบคุณที่ไว้วางใจ เราได้สร้างบัตรสมาชิกในชื่อของคุณ บัตรอยู่ในโทรศัพท์ของคุณ ไม่ต้องพกบัตรกระดาษ ไม่ต้องติดตั้งแอป`,
    vip: "VIP",
    member: "สมาชิก",
    cardCode: "รหัสบัตร",
    reward: "สิทธิพิเศษ",
    rewardText: (n, p) => `ครบ ${n} ตั๋ว · ลด ${p}%`,
    journey: (n) => `0 / ${n} ตั๋ว — การเดินทางของคุณเริ่มต้นวันนี้`,
    viewCard: "ดูบัตรของฉัน",
    fallback: "ปุ่มใช้ไม่ได้? เปิดลิงก์นี้:",
    howTitle: "วิธีใช้บัตร",
    steps: (n, p) => [
      { title: "เก็บรหัส QR ไว้", body: "เก็บอีเมลนี้ไว้หรือแคปหน้าจอรหัส QR รหัสยังแนบมาเป็นรูปภาพเพื่อบันทึกลงโทรศัพท์ได้" },
      { title: "แสดงทุกครั้งที่มาใช้บริการ", body: "หลังใช้บริการแต่ละครั้ง พนักงานจะสแกนรหัส QR และมอบตั๋วให้คุณ 1 ใบ" },
      { title: "ตรวจสอบบัตรได้ทุกเมื่อ", body: "เปิดกล้องโทรศัพท์แล้วส่องที่รหัส QR บัตรของคุณจะแสดงจำนวนตั๋ว ประวัติ และสิทธิพิเศษ หรือกด “ดูบัตรของฉัน”" },
      { title: "รับสิทธิพิเศษ", body: `เมื่อครบ ${n} ตั๋ว รับส่วนลด ${p}% สำหรับการมาครั้งถัดไป จากนั้นบัตรจะเริ่มสะสมใหม่` },
    ],
    inviteTitle: (x) => `ชวนเพื่อน — รับตั๋วเพิ่ม ${x} ใบ`,
    inviteBody: (b, x) => `เปิดบัตรของคุณแล้วคัดลอกลิงก์เชิญ เมื่อเพื่อนจองผ่านลิงก์และมาที่ ${b} ครั้งแรก คุณจะได้รับตั๋วเพิ่ม ${x} ใบโดยอัตโนมัติ`,
    privacy: "รหัส QR นี้คือบัตรส่วนตัวของคุณ เมื่อแนะนำเพื่อน กรุณาส่งลิงก์เชิญแทนรหัส QR",
    cardPrice: (p) => `ราคาบัตร: ${p}`,
    closing: "เรายินดีต้อนรับคุณในการมาเยือนครั้งถัดไป",
    signoff: "ด้วยความเคารพ",
  },
};

export function loyaltyCardEmailStrings(locale: string): Strings {
  return S[locale as L] ?? S.vi;
}

const MONO = "'SFMono-Regular',Menlo,Consolas,'Courier New',monospace";
const GOLD_LIGHT = "#e8d3a6";

/** The membership card itself — plum, gold-edged, with the QR on white. */
function memberCard(p: { salon: string; name: string; token: string; qrUrl: string; reward: string; t: Strings; font: string }) {
  const label = (text: string) =>
    `<div style="font-size:10px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:rgba(255,255,255,.55)">${text}</div>`;
  return `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 8px;border-collapse:separate">
    <tr><td bgcolor="#2a1d3d" style="background:#2a1d3d;background-image:linear-gradient(140deg,#1f182d 0%,#40325c 55%,#6d2a6f 100%);border:1px solid ${C.gold};border-radius:22px;padding:24px 24px 22px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td valign="top" style="font-family:${p.font};font-size:20px;font-style:italic;font-weight:600;line-height:1.25;color:${GOLD_LIGHT}">${esc(p.salon)}</td>
        <td valign="top" align="right" width="64">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="right"><tr><td bgcolor="${C.gold}" style="background:${C.gold};background-image:linear-gradient(135deg,#e8d3a6,#c9a96e 55%,#a8843f);border-radius:999px;padding:5px 12px;font-size:11px;font-weight:800;letter-spacing:2px;color:${C.night}">${esc(p.t.vip)}</td></tr></table>
        </td>
      </tr></table>
      <div style="height:20px;line-height:20px;font-size:1px">&nbsp;</div>
      ${label(esc(p.t.member))}
      <div style="font-family:${p.font};font-size:24px;font-weight:600;line-height:1.3;color:#ffffff;margin-top:4px">${esc(p.name)}</div>
      <div style="height:20px;line-height:20px;font-size:1px">&nbsp;</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td bgcolor="#ffffff" style="background:#ffffff;border-radius:18px;padding:12px">
        <img src="${esc(p.qrUrl)}" width="184" height="184" alt="QR ${esc(p.token)}" style="display:block;border:0;width:184px;height:184px" />
      </td></tr></table>
      <div style="height:20px;line-height:20px;font-size:1px">&nbsp;</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td valign="middle" style="padding:11px 0;border-top:1px solid rgba(201,169,110,.35)">${label(esc(p.t.cardCode))}</td>
          <td valign="middle" align="right" style="padding:11px 0;border-top:1px solid rgba(201,169,110,.35);font-family:${MONO};font-size:15px;font-weight:700;letter-spacing:2px;color:${GOLD_LIGHT};white-space:nowrap">${esc(p.token)}</td>
        </tr>
        <tr>
          <td valign="middle" style="padding:11px 0 0;border-top:1px solid rgba(201,169,110,.35)">${label(esc(p.t.reward))}</td>
          <td valign="middle" align="right" style="padding:11px 0 0;border-top:1px solid rgba(201,169,110,.35);font-size:14px;font-weight:700;color:#ffffff">${esc(p.reward)}</td>
        </tr>
      </table>
    </td></tr>
  </table>`;
}

/** One numbered slot per ticket (up to 10), the last one a gold star. */
function ticketSlots(n: number, caption: string) {
  const shown = Math.min(n, 10);
  const cells = Array.from({ length: shown }, (_, i) => {
    const last = i === shown - 1;
    return `<td style="padding:2px"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="24" height="24" align="center" valign="middle" style="width:24px;height:24px;border-radius:50%;border:1.5px ${last ? "solid" : "dashed"} ${last ? C.gold : "#cdbfe0"};color:${last ? C.gold : "#a99bbd"};font-size:${last ? 12 : 10}px;font-weight:700;line-height:24px">${last ? "★" : i + 1}</td></tr></table></td>`;
  }).join("");
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin:14px auto 0"><tr>${cells}</tr></table>
    <div style="clear:both"></div>
    <p style="margin:10px 0 0;text-align:center;font-size:12.5px;color:${C.muted};font-style:italic">${esc(caption)}</p>`;
}

export function loyaltyCardEmail(p: {
  locale: string;
  salon: { name: string; logoUrl: string | null; city: string | null };
  customerName: string;
  token: string;
  pointsRequired: number;
  discountPercent: number;
  /** Formatted card price, when the salon charges for the card. */
  price: string | null;
}) {
  const t = loyaltyCardEmailStrings(p.locale);
  const font = headingFont(p.locale);
  const first = p.customerName.trim().split(/\s+/)[0] || p.customerName;
  const cardUrl = loyaltyScanUrl(p.token);
  const qrUrl = `${SITE_URL}/api/email-qr/loyalty/${encodeURIComponent(p.token)}.png`;
  const reward = t.rewardText(p.pointsRequired, p.discountPercent);

  const body = [
    `<p style="margin:0 0 14px;font-family:${font};font-size:19px;color:${C.ink}">${esc(t.dear)} <span style="font-style:italic">${esc(p.customerName)}</span>,</p>`,
    para(esc(t.letter(p.salon.name))),
    memberCard({ salon: p.salon.name, name: p.customerName, token: p.token, qrUrl, reward, t, font }),
    ticketSlots(p.pointsRequired, t.journey(p.pointsRequired)),
    button(cardUrl, esc(t.viewCard), { variant: "gold", fallback: t.fallback }),
    sectionTitle(esc(t.howTitle), 34),
    steps(t.steps(p.pointsRequired, p.discountPercent).map((s) => ({ title: esc(s.title), body: esc(s.body) }))),
    notice(esc(t.inviteTitle(REFERRAL_TICKETS)), esc(t.inviteBody(p.salon.name, REFERRAL_TICKETS)), "gold", 24),
    p.price ? para(esc(t.cardPrice(p.price)), { muted: true, small: true, mt: 18 }) : "",
    para(esc(t.privacy), { muted: true, small: true, mt: p.price ? 0 : 18 }),
    `<div style="height:1px;line-height:1px;font-size:1px;background:${C.hair};margin:26px 0 22px">&nbsp;</div>`,
    para(esc(t.closing)),
    `<p style="margin:0;font-size:14px;color:${C.muted}">${esc(t.signoff)}</p>`,
    `<p style="margin:4px 0 0;font-family:${font};font-size:20px;font-style:italic;font-weight:600;color:${C.primaryDeep}">${esc(p.salon.name)}</p>`,
  ].join("");

  return {
    subject: t.subject(p.salon.name),
    html: emailLayout({
      locale: p.locale,
      preheader: t.preheader(p.salon.name, p.pointsRequired, p.discountPercent),
      brand: { name: p.salon.name, logoUrl: p.salon.logoUrl, subline: p.salon.city },
      hero: { eyebrow: esc(t.eyebrow), title: esc(t.title(first, p.salon.name)), intro: esc(t.intro), tone: "gold", badge: "♛" },
      body,
    }),
  };
}
