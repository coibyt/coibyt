import { C, SITE_URL, button, buttonRow, emailLayout, esc, notice, panel, para, rows, sectionTitle, steps } from "@/lib/email/ui";

/** The welcome email a staff member gets when the owner gives them a login:
 * how to sign in, and a guide to exactly the parts of the dashboard their
 * permissions open. */

export type StaffFeature = "bookings" | "income" | "loyalty" | "customers" | "services" | "products" | "hours" | "reviews" | "viewAll" | "team";

const EMOJI: Record<StaffFeature, string> = {
  bookings: "📅",
  income: "💶",
  loyalty: "💳",
  customers: "👥",
  services: "✂️",
  products: "🛍️",
  hours: "🕘",
  reviews: "⭐",
  viewAll: "👁️",
  team: "✨",
};

const T = {
  vi: {
    subject: (salon: string) => `Chào mừng bạn đến với đội ngũ ${salon} trên VaraaAi`,
    preheader: (salon: string) => `Tài khoản nhân viên của bạn tại ${salon} đã sẵn sàng — đăng nhập và bắt đầu ngay.`,
    eyebrow: "Chào mừng đến đội ngũ",
    title: (name: string) => `Chào mừng ${name}!`,
    intro: (owner: string, salon: string) =>
      `${owner} đã tạo tài khoản nhân viên VaraaAi cho bạn tại ${salon}. Từ hôm nay, lịch hẹn, thu nhập và mọi việc trong ngày đều nằm gọn trong điện thoại của bạn.`,
    loginTitle: "Thông tin đăng nhập",
    site: "Trang đăng nhập",
    email: "Email đăng nhập",
    password: "Mật khẩu",
    passwordValue: "Do chủ salon đặt cho bạn",
    signIn: "Đăng nhập trang quản lý",
    setPassword: "Tự đặt mật khẩu của bạn",
    setPasswordNote: "Chưa có mật khẩu? Bấm “Tự đặt mật khẩu của bạn” để tạo mật khẩu riêng — đường link dùng được trong 7 ngày.",
    featuresTitle: "Những việc bạn có thể làm",
    features: {
      bookings: ["Lịch hẹn", "Xem lịch của bạn theo ngày, tuần, tháng. Làm xong cho khách, bấm “Hoàn thành” (hoặc “Không đến”). Khách gọi điện? Nhấn giữ ô giờ trống khoảng 1 giây để tạo lịch hẹn hoặc khoá giờ nghỉ."],
      income: ["Doanh thu của tôi", "Sau mỗi khách, mở lịch hẹn và bấm “Báo cáo thu nhập”: nhập số tiền khách trả, tiền tip và ảnh biên lai. Chủ salon duyệt, bạn theo dõi được thu nhập và tip của mình."],
      loyalty: ["Thẻ tích điểm", "Dùng camera điện thoại quét mã QR trên thẻ của khách và bấm “Cộng 1 vé”. Khách mới? Vào Thẻ tích điểm, nhập tên và email để cấp thẻ VIP ngay."],
      customers: ["Khách hàng & tin nhắn", "Xem hồ sơ, lịch sử làm đẹp và ghi chú của khách, và trả lời tin nhắn khách gửi tới salon."],
      services: ["Dịch vụ", "Mở trang Dịch vụ để xem bảng dịch vụ, giá và thời lượng của salon."],
      products: ["Sản phẩm & đơn hàng", "Mở trang Sản phẩm và Đơn hàng để xem sản phẩm và theo dõi đơn khách đặt online."],
      hours: ["Giờ mở cửa", "Xem giờ mở cửa và các ngày nghỉ của salon."],
      reviews: ["Đánh giá", "Xem khách đánh giá salon và các dịch vụ như thế nào."],
      viewAll: ["Xem toàn bộ bảng điều khiển", "Bạn được xem mọi trang — Fanpage, Marketing, Thẻ quà tặng… — ở chế độ chỉ xem."],
      team: ["Tiện ích", "Nhóm chat với đồng nghiệp (gửi ảnh, video, emoji), thông báo từ chủ salon, thư viện đào tạo, và trang Hỗ trợ khi bạn cần giúp."],
    } as Record<StaffFeature, [string, string]>,
    allBookings: "Bạn được xem lịch của cả salon: bấm “Hiện tất cả” trên trang Lịch hẹn.",
    contactInfo: "Số điện thoại và email của khách hiện trên lịch hẹn của bạn.",
    startTitle: "Bắt đầu trong 3 bước",
    start: [
      { title: "Đăng nhập", body: "Bấm “Đăng nhập trang quản lý” ở trên và dùng email đăng nhập của bạn." },
      { title: "Cài ứng dụng và bật chuông", body: "Trên trang Tổng quan, cài VaraaAi lên màn hình chính và bấm “Bật chuông” để điện thoại reo khi có lịch hẹn mới." },
      { title: "Xem hướng dẫn chi tiết", body: "Vào Tiện ích → Hỗ trợ: có hướng dẫn từng bước cho mọi việc bạn làm, và trợ lý AI trả lời 24/7." },
    ],
    helpTitle: "Cần giúp đỡ?",
    help: (owner: string) => `Hỏi trợ lý ở Tiện ích → Hỗ trợ bất cứ lúc nào. Việc trong salon như lịch làm, ca kíp — hãy nhắn cho ${owner} ngay trong Nhóm chat.`,
    footer: (salon: string) => `Bạn nhận email này vì ${salon} vừa tạo tài khoản nhân viên VaraaAi cho bạn.`,
  },
  en: {
    subject: (salon: string) => `Welcome to the ${salon} team on VaraaAi`,
    preheader: (salon: string) => `Your staff account at ${salon} is ready — sign in and get started.`,
    eyebrow: "Welcome to the team",
    title: (name: string) => `Welcome, ${name}!`,
    intro: (owner: string, salon: string) =>
      `${owner} has created a VaraaAi staff account for you at ${salon}. From today your bookings, income and everything in your working day fit right in your phone.`,
    loginTitle: "Your login",
    site: "Sign-in page",
    email: "Login email",
    password: "Password",
    passwordValue: "Set for you by the owner",
    signIn: "Sign in to the dashboard",
    setPassword: "Set your own password",
    setPasswordNote: "No password yet? Tap “Set your own password” to create one — the link works for 7 days.",
    featuresTitle: "What you can do",
    features: {
      bookings: ["Bookings", "See your day, week or month. When you've finished with a customer, tap “Complete” (or “No-show”). Someone phones in? Press and hold an empty slot for a second to add a booking or block time."],
      income: ["My income", "After each customer, open the booking and tap “Report income”: what they paid, your tip and a photo of the receipt. The owner approves it and you can follow your income and tips."],
      loyalty: ["Loyalty cards", "Point your phone camera at the QR code on a customer's card and tap to add a ticket. New customer? Go to Loyalty cards and enter their name and email to give them a VIP card."],
      customers: ["Customers & messages", "See customers' profiles, history and notes, and answer the messages they send the salon."],
      services: ["Services", "Open Services to see the salon's menu, prices and durations."],
      products: ["Products & orders", "Open Products and Orders to see the products and follow online orders."],
      hours: ["Opening hours", "See the salon's opening hours and closed days."],
      reviews: ["Reviews", "See what customers say about the salon and its services."],
      viewAll: ["See the whole dashboard", "You can view every page — Fanpage, Marketing, Gift cards… — read-only."],
      team: ["Team hub", "Team chat with colleagues (photos, videos, emoji), notices from the owner, the training library, and a Support page whenever you need help."],
    } as Record<StaffFeature, [string, string]>,
    allBookings: "You can see the whole salon's calendar: tap “Show all” on Bookings.",
    contactInfo: "Customers' phone numbers and emails show on your bookings.",
    startTitle: "Get started in 3 steps",
    start: [
      { title: "Sign in", body: "Tap “Sign in to the dashboard” above and use your login email." },
      { title: "Install the app and turn on the alarm", body: "On the Overview page, add VaraaAi to your home screen and turn on the alarm so your phone rings for new bookings." },
      { title: "Read the guides", body: "Go to Team hub → Support: step-by-step guides for everything you do, and an AI assistant 24/7." },
    ],
    helpTitle: "Need help?",
    help: (owner: string) => `Ask the assistant in Team hub → Support any time. For salon matters like your rota, message ${owner} in Team chat.`,
    footer: (salon: string) => `You're getting this email because ${salon} has just created a VaraaAi staff account for you.`,
  },
  fi: {
    subject: (salon: string) => `Tervetuloa ${salon} -tiimiin VaraaAissa`,
    preheader: (salon: string) => `Henkilökunnan tilisi paikassa ${salon} on valmis — kirjaudu ja aloita.`,
    eyebrow: "Tervetuloa tiimiin",
    title: (name: string) => `Tervetuloa, ${name}!`,
    intro: (owner: string, salon: string) =>
      `${owner} loi sinulle VaraaAi-henkilökuntatilin paikassa ${salon}. Tästä päivästä varauksesi, tulosi ja koko työpäiväsi kulkevat mukanasi puhelimessa.`,
    loginTitle: "Kirjautumistietosi",
    site: "Kirjautumissivu",
    email: "Kirjautumissähköposti",
    password: "Salasana",
    passwordValue: "Omistaja on asettanut sen sinulle",
    signIn: "Kirjaudu hallintapaneeliin",
    setPassword: "Aseta oma salasana",
    setPasswordNote: "Eikö sinulla ole vielä salasanaa? Napauta ”Aseta oma salasana” — linkki toimii 7 päivää.",
    featuresTitle: "Mitä voit tehdä",
    features: {
      bookings: ["Varaukset", "Näet päiväsi, viikkosi tai kuukautesi. Kun asiakas on valmis, napauta ”Valmis” (tai ”Ei saapunut”). Asiakas soittaa? Paina tyhjää aikaa sekunnin ajan lisätäksesi varauksen tai varataksesi tauon."],
      income: ["Omat tuloni", "Avaa varaus jokaisen asiakkaan jälkeen ja napauta ”Raportoi tulot”: maksettu summa, tippisi ja kuva kuitista. Omistaja hyväksyy, ja näet tulosi ja tippisi."],
      loyalty: ["Kanta-asiakaskortit", "Osoita puhelimen kameralla asiakkaan kortin QR-koodia ja lisää lippu. Uusi asiakas? Anna VIP-kortti nimellä ja sähköpostilla."],
      customers: ["Asiakkaat & viestit", "Näe asiakkaiden profiilit, historia ja muistiinpanot, ja vastaa salongille tuleviin viesteihin."],
      services: ["Palvelut", "Avaa Palvelut nähdäksesi salongin palvelut, hinnat ja kestot."],
      products: ["Tuotteet & tilaukset", "Avaa Tuotteet ja Tilaukset nähdäksesi tuotteet ja seurataksesi verkkotilauksia."],
      hours: ["Aukioloajat", "Näe salongin aukioloajat ja suljetut päivät."],
      reviews: ["Arvostelut", "Näe, mitä asiakkaat sanovat salongista ja palveluista."],
      viewAll: ["Koko hallintapaneeli", "Voit katsella kaikkia sivuja — Fanpage, Markkinointi, Lahjakortit… — vain luku -tilassa."],
      team: ["Tiimin työtila", "Tiimichat kollegoiden kanssa (kuvat, videot, emojit), omistajan tiedotteet, koulutuskirjasto ja Tuki-sivu aina kun tarvitset apua."],
    } as Record<StaffFeature, [string, string]>,
    allBookings: "Näet koko salongin kalenterin: napauta Varaukset-sivulla ”Näytä kaikki”.",
    contactInfo: "Asiakkaiden puhelinnumerot ja sähköpostit näkyvät varauksissasi.",
    startTitle: "Aloita kolmella askeleella",
    start: [
      { title: "Kirjaudu", body: "Napauta yllä ”Kirjaudu hallintapaneeliin” ja käytä kirjautumissähköpostiasi." },
      { title: "Asenna sovellus ja hälytys", body: "Lisää VaraaAi Yleiskatsaus-sivulla kotinäytölle ja ota hälytys käyttöön, niin puhelin soi uusista varauksista." },
      { title: "Lue ohjeet", body: "Tiimin työtila → Tuki: vaiheittaiset ohjeet kaikkeen ja tekoälyavustaja 24/7." },
    ],
    helpTitle: "Tarvitsetko apua?",
    help: (owner: string) => `Kysy avustajalta Tiimin työtila → Tuki milloin vain. Salongin asioista, kuten työvuoroista, viestitä ${owner} tiimichatissa.`,
    footer: (salon: string) => `Saat tämän viestin, koska ${salon} loi sinulle juuri VaraaAi-henkilökuntatilin.`,
  },
};

function strings(locale: string) {
  return (T as Record<string, (typeof T)["en"]>)[locale] ?? T.en;
}

function featureCard(emoji: string, title: string, body: string, extra: string[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;border-collapse:separate"><tr>
    <td bgcolor="#ffffff" style="background:#ffffff;border:1px solid ${C.border};border-radius:18px;padding:16px 18px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td width="48" valign="top"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="40" height="40" align="center" valign="middle" bgcolor="#f4f1fa" style="width:40px;height:40px;border-radius:12px;background:#f4f1fa;font-size:20px;line-height:40px">${emoji}</td></tr></table></td>
        <td valign="top" style="padding-left:6px">
          <div style="font-size:15px;font-weight:700;color:${C.ink}">${title}</div>
          <div style="font-size:13.5px;line-height:1.6;color:${C.text};margin-top:3px">${body}</div>
          ${extra.map((x) => `<div style="font-size:12.5px;line-height:1.55;color:#7a5f2c;margin-top:6px">✓ ${x}</div>`).join("")}
        </td>
      </tr></table>
    </td></tr></table>`;
}

export function staffWelcomeEmail(p: {
  locale: string;
  staffName: string;
  loginEmail: string;
  ownerName: string;
  salon: { name: string; logoUrl: string | null; city: string | null };
  features: StaffFeature[];
  canViewAllBookings: boolean;
  canViewContactInfo: boolean;
  setPasswordUrl: string;
}) {
  const t = strings(p.locale);
  const signInUrl = `${SITE_URL}/${p.locale}/auth/sign-in?callbackUrl=${encodeURIComponent("/business/dashboard")}`;
  const cards = p.features
    .map((f) => {
      const [title, body] = t.features[f];
      const extra = f === "bookings" ? [p.canViewAllBookings ? t.allBookings : "", p.canViewContactInfo ? t.contactInfo : ""].filter(Boolean) : [];
      return featureCard(EMOJI[f], esc(title), esc(body), extra.map(esc));
    })
    .join("");

  const body = [
    sectionTitle(esc(t.loginTitle), 0),
    panel(
      rows([
        { label: esc(t.site), value: `<a href="${esc(signInUrl)}" style="color:${C.primary};text-decoration:none">varaaai.com</a>` },
        { label: esc(t.email), value: esc(p.loginEmail), strong: true },
        { label: esc(t.password), value: esc(t.passwordValue) },
      ]),
      { pad: "8px 20px" }
    ),
    button(signInUrl, esc(t.signIn), { variant: "gold" }),
    buttonRow([{ href: p.setPasswordUrl, label: esc(t.setPassword), variant: "light" }], "center"),
    para(esc(t.setPasswordNote), { muted: true, small: true, center: true, mt: 12 }),
    sectionTitle(esc(t.featuresTitle), 30),
    cards,
    sectionTitle(esc(t.startTitle), 30),
    steps(t.start.map((s) => ({ title: esc(s.title), body: esc(s.body) }))),
    notice(esc(t.helpTitle), esc(t.help(p.ownerName)), "gold", 24),
  ].join("");

  return {
    subject: t.subject(p.salon.name),
    html: emailLayout({
      locale: p.locale,
      preheader: t.preheader(p.salon.name),
      brand: { name: p.salon.name, logoUrl: p.salon.logoUrl, subline: p.salon.city },
      hero: { eyebrow: esc(t.eyebrow), title: esc(t.title(p.staffName)), intro: esc(t.intro(p.ownerName, p.salon.name)), tone: "gold", badge: "✦" },
      body,
      footerNote: esc(t.footer(p.salon.name)),
    }),
  };
}
