/** Copy for the salon-owner landing page (/business), in the 7 languages
 * the page has always been written in; other locales fall back to English.
 * Each feature group's `features` has exactly 6 items, matching the icons in
 * the page. */
export interface BusinessLandingStrings {
  hero: {
    badge: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    cta: string;
    chatCta: string;
    trust: [string, string, string];
  };
  mock: {
    salon: string;
    city: string;
    services: [string, string, string];
    book: string;
    today: string;
    newBooking: string;
    newBookingBody: string;
    review: string;
    points: string;
    revenue: string;
    bookings: string;
    giftCard: string;
    loyaltyCard: string;
    reminder: string;
  };
  audienceLabel: string;
  audience: string[];
  stats: { value: string; label: string }[];
  featuresTitle: string;
  featuresSubtitle: string;
  groups: { eyebrow: string; title: string; body: string; features: { title: string; body: string }[] }[];
  toolsTitle: string;
  toolsSubtitle: string;
  tools: { title: string; body: string; cta: string }[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  chat: {
    eyebrow: string;
    title: string;
    body: string;
    points: [string, string, string];
    open: string;
    launcher: string;
    teaser: string;
    headerTitle: string;
    aiOnline: string;
    teamReplies: string;
    suggestions: string[];
  };
  faqTitle: string;
  faq: { q: string; a: string }[];
  final: { title: string; body: string; cta: string; chat: string };
}

const vi: BusinessLandingStrings = {
  hero: {
    badge: "Miễn phí trọn đời · Không phí ẩn",
    title: "Salon đông khách hơn,",
    titleAccent: "quản lý nhẹ nhàng hơn",
    subtitle:
      "Nền tảng đặt lịch và quản lý dành cho salon nail, tóc, mi, spa. Khách tự đặt lịch 24/7, hệ thống tự nhắc lịch, tự giữ chân khách — còn bạn tập trung vào điều mình làm giỏi nhất.",
    cta: "Đăng ký salon miễn phí",
    chatCta: "Hỏi trước khi đăng ký",
    trust: ["Không cần thẻ tín dụng", "Sẵn sàng trong 5 phút", "Không giới hạn lượt đặt"],
  },
  mock: {
    salon: "Lumi Nails & Beauty",
    city: "Helsinki",
    services: ["Sơn gel tay", "Nối mi volume", "Chăm sóc da mặt"],
    book: "Đặt lịch",
    today: "Hôm nay",
    newBooking: "Lịch hẹn mới",
    newBookingBody: "Anna · Sơn gel · 14:00",
    review: "Đặt lịch quá tiện, còn được nhắc trước!",
    points: "+1 điểm tích lũy",
    revenue: "Doanh thu tháng",
    bookings: "Lịch hẹn",
    giftCard: "Thẻ quà tặng",
    loyaltyCard: "Thẻ thành viên",
    reminder: "Nhắc lịch tự động đã gửi",
  },
  audienceLabel: "Dành cho mọi mô hình làm đẹp",
  audience: ["Nail", "Tóc", "Mi & mày", "Spa & massage", "Barber", "Thẩm mỹ & da"],
  stats: [
    { value: "0đ", label: "Phí sử dụng" },
    { value: "24/7", label: "Khách tự đặt lịch" },
    { value: "∞", label: "Nhân viên & lượt đặt" },
    { value: "35", label: "Ngôn ngữ" },
  ],
  featuresTitle: "Mọi công cụ một salon chuyên nghiệp cần",
  featuresSubtitle: "Tất cả trong một tài khoản, hoàn toàn miễn phí, không giới hạn.",
  groups: [
    {
      eyebrow: "Thu hút khách mới",
      title: "Khách tìm thấy bạn và đặt lịch ở bất cứ đâu",
      body: "Một trang đặt lịch đẹp và một website riêng sẵn sàng ngay khi đăng ký. Gắn lên Facebook, Instagram, Google — khách đặt lịch kể cả khi tiệm đã đóng cửa.",
      features: [
        { title: "Trang đặt lịch 24/7", body: "Khách tự chọn dịch vụ, thợ và giờ trống, nhận xác nhận ngay." },
        { title: "Website riêng cho salon", body: "Ảnh trình chiếu, dịch vụ, giới thiệu, liên hệ — không cần biết thiết kế." },
        { title: "Facebook, Instagram, Google", body: "Một link hoặc mã nhúng, đặt ở mọi nơi khách nhìn thấy bạn." },
        { title: "Hiện trên bản đồ tìm kiếm", body: "Khách trong khu vực tìm thấy salon của bạn trên VaraaAi." },
        { title: "Trợ lý AI trả lời khách", body: "AI tư vấn dịch vụ, giá, giờ trống và giúp khách đặt lịch khi bạn bận." },
        { title: "Fanpage cho khách theo dõi", body: "Đăng ảnh mẫu mới, khuyến mãi tới những khách đang theo dõi bạn." },
      ],
    },
    {
      eyebrow: "Vận hành nhẹ nhàng",
      title: "Cả tiệm trong một màn hình, trên điện thoại",
      body: "Lịch hẹn của từng thợ, nhắc lịch tự động, tính tiền tại quầy — mọi việc hằng ngày gọn gàng hơn, ít gọi điện, ít nhầm lẫn.",
      features: [
        { title: "Lịch kéo thả nhiều thợ", body: "Xem theo ngày, tuần, tháng; kéo để dời giờ, khách tự nhận email báo giờ mới." },
        { title: "Nhắc lịch tự động", body: "Email nhắc trước 24 giờ, 2 giờ và 15 phút — bớt hẳn khách quên hẹn." },
        { title: "Nhân viên & phân quyền", body: "Ca làm riêng, giá riêng, tài khoản riêng để thợ tự xem lịch." },
        { title: "Thanh toán & hóa đơn", body: "Tính tiền tại quầy, xuất hóa đơn PDF và gửi email cho khách." },
        { title: "Nhiều chi nhánh", body: "Quản lý mọi chi nhánh trong một tài khoản, một trang đặt lịch chung." },
        { title: "Tổng quan kinh doanh", body: "Doanh thu, dịch vụ bán chạy, hiệu suất thợ — nhìn là hiểu." },
      ],
    },
    {
      eyebrow: "Giữ chân khách, tăng doanh thu",
      title: "Biến khách mới thành khách quen",
      body: "Thẻ tích điểm, thẻ quà tặng, email ưu đãi và lời mời đánh giá tự động — những công cụ các chuỗi lớn vẫn dùng, nay salon nào cũng có.",
      features: [
        { title: "Thẻ tích điểm QR", body: "Không cần thẻ giấy: quét mã mỗi lần đến, đủ điểm là được ưu đãi." },
        { title: "Thẻ quà tặng online", body: "Khách mua tặng người thân qua email — thêm doanh thu mùa lễ." },
        { title: "Email marketing", body: "Gửi ưu đãi cho khách cũ chỉ trong 2 phút, kèm nút đặt lịch." },
        { title: "Đánh giá & Google", body: "Tự mời khách đánh giá sau buổi hẹn và chia sẻ lên Google." },
        { title: "Bán sản phẩm online", body: "Dưỡng, sơn, quà tặng — khách đặt hàng ngay trên trang salon." },
        { title: "Cộng tác viên", body: "Người giới thiệu khách nhận % hoa hồng, hệ thống tự theo dõi." },
      ],
    },
  ],
  toolsTitle: "Công cụ miễn phí, dùng ngay không cần tài khoản",
  toolsSubtitle: "Thử ngay hôm nay — kết quả in ra dùng được luôn.",
  tools: [
    { title: "Bảng giá đa ngôn ngữ", body: "Bảng giá đẹp như thiết kế, dịch tự động, có mã QR đặt lịch, xuất PDF.", cta: "Tạo bảng giá" },
    { title: "Poster QR đặt lịch", body: "Poster, tem dán, bảng để bàn — mẫu Giáng sinh, Black Friday, Tết.", cta: "Tạo poster" },
    { title: "Kiểm tra salon", body: "Xem salon của bạn trông thế nào trên mạng và nhận danh sách việc nên làm.", cta: "Kiểm tra ngay" },
  ],
  stepsTitle: "Bắt đầu chỉ với 3 bước",
  steps: [
    { title: "Đăng ký miễn phí", body: "Điền thông tin salon và xác minh email — salon được kích hoạt ngay, không chờ duyệt." },
    { title: "Thêm dịch vụ & nhân viên", body: "Nhập dịch vụ, giá, thời lượng và đội ngũ của bạn — có hướng dẫn từng bước." },
    { title: "Chia sẻ & nhận lịch", body: "Dán link đặt lịch lên Facebook, Instagram, Google và bắt đầu nhận khách." },
  ],
  chat: {
    eyebrow: "Hỗ trợ 24/7",
    title: "Còn băn khoăn? Hỏi chúng tôi ngay",
    body: "Trợ lý AI trả lời tức thì mọi câu hỏi về đăng ký và cách dùng, kèm hướng dẫn từng bước. Cần người thật? Đội ngũ VaraaAi luôn sẵn sàng.",
    points: ["Trả lời ngay cả lúc nửa đêm", "Hướng dẫn đăng ký từng bước", "Gặp nhân viên bất cứ lúc nào"],
    open: "Mở khung chat",
    launcher: "Hỏi về đăng ký",
    teaser: "Xin chào! Bạn cần giúp đăng ký salon? Hỏi mình bất cứ điều gì nhé.",
    headerTitle: "Hỗ trợ VaraaAi",
    aiOnline: "Trợ lý AI đang trực tuyến",
    teamReplies: "Đội ngũ sẽ trả lời sớm nhất",
    suggestions: [
      "Đăng ký salon có mất phí không?",
      "Đăng ký salon cần những gì?",
      "Làm sao khách đặt lịch qua Facebook?",
      "Tôi có 2 chi nhánh, quản lý thế nào?",
    ],
  },
  faqTitle: "Câu hỏi thường gặp",
  faq: [
    { q: "VaraaAi có thật sự miễn phí không?", a: "Có. Đăng ký, nhận đặt lịch, quản lý nhân viên, nhắc lịch, thẻ tích điểm, thẻ quà tặng, website riêng… đều miễn phí, không cần thẻ tín dụng và không giới hạn lượt đặt." },
    { q: "Tôi cần chuẩn bị gì để bắt đầu?", a: "Chỉ cần tên salon, địa chỉ, số điện thoại và email. Sau khi xác minh email, salon được kích hoạt ngay; bạn thêm dịch vụ và nhân viên trong vài phút." },
    { q: "Khách hàng có phải tải ứng dụng không?", a: "Không. Khách đặt lịch ngay trên trình duyệt, không cần tài khoản. Nếu muốn, khách có thể cài VaraaAi lên màn hình điện thoại như một ứng dụng." },
    { q: "Tôi có thể dùng bằng ngôn ngữ nào?", a: "VaraaAi có 35 ngôn ngữ. Email gửi khách tự dùng ngôn ngữ của nước nơi salon hoạt động, và bạn có thể chọn ngôn ngữ mặc định cho khách." },
    { q: "Tôi có nhiều chi nhánh thì sao?", a: "Bạn quản lý mọi chi nhánh trong cùng một tài khoản, chuyển qua lại chỉ bằng một chạm, và có một trang đặt lịch chung cho cả chuỗi." },
    { q: "Nếu cần hỗ trợ thì liên hệ ở đâu?", a: "Bấm nút chat ở góc màn hình hoặc vào Trung tâm hỗ trợ. Trợ lý AI trả lời ngay, và đội ngũ VaraaAi luôn sẵn sàng khi bạn cần người thật." },
  ],
  final: {
    title: "Sẵn sàng đưa salon của bạn lên một tầm cao mới?",
    body: "Đăng ký miễn phí trong 5 phút. Không phí ẩn, không giới hạn, không cần thẻ tín dụng.",
    cta: "Đăng ký salon ngay",
    chat: "Chat với chúng tôi",
  },
};

const en: BusinessLandingStrings = {
  hero: {
    badge: "Free forever · No hidden fees",
    title: "A busier salon,",
    titleAccent: "an easier day",
    subtitle:
      "The booking and management platform for nail, hair, lash and spa salons. Customers book 24/7, reminders go out on their own, regulars keep coming back — and you focus on what you do best.",
    cta: "Register your salon free",
    chatCta: "Ask before you sign up",
    trust: ["No credit card needed", "Ready in 5 minutes", "Unlimited bookings"],
  },
  mock: {
    salon: "Lumi Nails & Beauty",
    city: "Helsinki",
    services: ["Gel manicure", "Volume lashes", "Signature facial"],
    book: "Book",
    today: "Today",
    newBooking: "New booking",
    newBookingBody: "Anna · Gel manicure · 2:00 PM",
    review: "So easy to book, and they reminded me too!",
    points: "+1 loyalty point",
    revenue: "Revenue this month",
    bookings: "Bookings",
    giftCard: "Gift card",
    loyaltyCard: "Member card",
    reminder: "Automatic reminder sent",
  },
  audienceLabel: "Made for every kind of beauty business",
  audience: ["Nails", "Hair", "Lashes & brows", "Spa & massage", "Barber", "Aesthetics & skin"],
  stats: [
    { value: "$0", label: "Platform fee" },
    { value: "24/7", label: "Online booking" },
    { value: "∞", label: "Staff & bookings" },
    { value: "35", label: "Languages" },
  ],
  featuresTitle: "Every tool a professional salon needs",
  featuresSubtitle: "All in one account — completely free, with no limits.",
  groups: [
    {
      eyebrow: "Win new customers",
      title: "Be found and booked everywhere",
      body: "A beautiful booking page and your own website are ready the moment you sign up. Add them to Facebook, Instagram and Google — customers book even when you're closed.",
      features: [
        { title: "24/7 booking page", body: "Customers pick the service, stylist and a free time, and get instant confirmation." },
        { title: "Your own salon website", body: "Slideshow, services, about and contact pages — no design skills needed." },
        { title: "Facebook, Instagram, Google", body: "One link or embed code, wherever customers see you." },
        { title: "On the search map", body: "Customers nearby find your salon on VaraaAi." },
        { title: "AI assistant for customers", body: "AI answers about services, prices and free times and helps them book while you're busy." },
        { title: "A fan page to follow", body: "Post new looks and offers to the customers who follow you." },
      ],
    },
    {
      eyebrow: "Effortless operations",
      title: "Your whole salon on one screen — on your phone",
      body: "Every stylist's bookings, automatic reminders, checkout at the counter — everyday work gets simpler, with fewer calls and fewer mix-ups.",
      features: [
        { title: "Drag-and-drop calendar", body: "Day, week and month views; drag to move a booking and the customer is emailed the new time." },
        { title: "Automatic reminders", body: "Emails 24 hours, 2 hours and 15 minutes before — far fewer no-shows." },
        { title: "Staff & permissions", body: "Own hours, own prices and their own login to see their bookings." },
        { title: "Checkout & invoices", body: "Take payment at the counter, issue a PDF invoice and email it." },
        { title: "Multiple branches", body: "Every branch under one account, with one shared booking page." },
        { title: "Business overview", body: "Revenue, top services and staff performance at a glance." },
      ],
    },
    {
      eyebrow: "Keep customers, grow revenue",
      title: "Turn first visits into regulars",
      body: "Loyalty cards, gift cards, offer emails and automatic review requests — the tools big chains use, now for every salon.",
      features: [
        { title: "QR loyalty cards", body: "No paper cards: scan on every visit, and a reward unlocks when they're full." },
        { title: "Online gift cards", body: "Customers buy and send them by email — extra revenue for the holidays." },
        { title: "Email marketing", body: "Send offers to past customers in two minutes, with a book button." },
        { title: "Reviews & Google", body: "Review requests after every visit, with a nudge to share on Google." },
        { title: "Sell products online", body: "Care products, polish, gifts — ordered right from your salon page." },
        { title: "Affiliates", body: "People who send you customers earn a commission, tracked for you." },
      ],
    },
  ],
  toolsTitle: "Free tools, no account needed",
  toolsSubtitle: "Try them today — the results are ready to print.",
  tools: [
    { title: "Multilingual price list", body: "A designer-quality price list, auto-translated, with a booking QR code, as PDF.", cta: "Make a price list" },
    { title: "Scan-to-book QR poster", body: "Posters, stickers, table tents — Christmas, Black Friday and Lunar New Year designs.", cta: "Make a poster" },
    { title: "Salon check", body: "See how your salon looks online and get a prioritised to-do list.", cta: "Check now" },
  ],
  stepsTitle: "Get started in 3 steps",
  steps: [
    { title: "Sign up free", body: "Enter your salon details and verify your email — your salon goes live instantly." },
    { title: "Add services & staff", body: "Add your services, prices, durations and team, with a step-by-step guide." },
    { title: "Share & get booked", body: "Put your booking link on Facebook, Instagram and Google and start taking bookings." },
  ],
  chat: {
    eyebrow: "24/7 support",
    title: "Still have questions? Ask us now",
    body: "Our AI assistant instantly answers anything about signing up and using VaraaAi, step by step. Need a person? The VaraaAi team is always there.",
    points: ["Answers even at midnight", "Step-by-step sign-up help", "Reach a person any time"],
    open: "Open the chat",
    launcher: "Questions? Chat with us",
    teaser: "Hi! Need help registering your salon? Ask me anything.",
    headerTitle: "VaraaAi support",
    aiOnline: "AI assistant online",
    teamReplies: "The team will reply soon",
    suggestions: [
      "Is it really free to register?",
      "What do I need to sign up?",
      "How do customers book via Facebook?",
      "I have 2 branches — how does that work?",
    ],
  },
  faqTitle: "Frequently asked questions",
  faq: [
    { q: "Is VaraaAi really free?", a: "Yes. Signing up, taking bookings, staff, reminders, loyalty cards, gift cards, your own website… all free, with no credit card and no booking limits." },
    { q: "What do I need to get started?", a: "Just your salon's name, address, phone and email. Once you verify your email the salon is live; adding services and staff takes minutes." },
    { q: "Do customers need to download an app?", a: "No. Customers book in the browser, without an account. If they like, they can add VaraaAi to their home screen like an app." },
    { q: "Which languages can I use?", a: "VaraaAi has 35 languages. Customer emails use the language of your salon's country, and you can choose the default language for customers." },
    { q: "What if I have several branches?", a: "Manage every branch under one account, switch with one tap, and share one booking page for the whole chain." },
    { q: "Where do I get help?", a: "Tap the chat button in the corner or open the Help Centre. The AI assistant answers instantly, and the VaraaAi team is there when you need a person." },
  ],
  final: {
    title: "Ready to take your salon to the next level?",
    body: "Sign up free in 5 minutes. No hidden fees, no limits, no credit card.",
    cta: "Register your salon",
    chat: "Chat with us",
  },
};

const fi: BusinessLandingStrings = {
  hero: {
    badge: "Ilmainen ikuisesti · Ei piilokuluja",
    title: "Enemmän asiakkaita,",
    titleAccent: "kevyempi arki",
    subtitle:
      "Ajanvaraus- ja hallinta-alusta kynsi-, hius-, ripsi- ja kauneushoitoloille. Asiakkaat varaavat 24/7, muistutukset lähtevät itsestään ja kanta-asiakkaat palaavat — sinä keskityt siihen, missä olet paras.",
    cta: "Rekisteröi salonki ilmaiseksi",
    chatCta: "Kysy ennen rekisteröitymistä",
    trust: ["Ei luottokorttia", "Valmis 5 minuutissa", "Rajattomasti varauksia"],
  },
  mock: {
    salon: "Lumi Nails & Beauty",
    city: "Helsinki",
    services: ["Geelilakkaus", "Volyymiripset", "Kasvohoito"],
    book: "Varaa",
    today: "Tänään",
    newBooking: "Uusi varaus",
    newBookingBody: "Anna · Geelilakkaus · 14.00",
    review: "Helppo varata, ja muistutus tuli etukäteen!",
    points: "+1 kanta-asiakaspiste",
    revenue: "Kuukauden myynti",
    bookings: "Varaukset",
    giftCard: "Lahjakortti",
    loyaltyCard: "Jäsenkortti",
    reminder: "Automaattinen muistutus lähetetty",
  },
  audienceLabel: "Kaikille kauneusalan yrityksille",
  audience: ["Kynnet", "Hiukset", "Ripset & kulmat", "Spa & hieronta", "Parturi", "Iho & estetiikka"],
  stats: [
    { value: "0 €", label: "Käyttömaksu" },
    { value: "24/7", label: "Verkkoajanvaraus" },
    { value: "∞", label: "Työntekijät & varaukset" },
    { value: "35", label: "Kieltä" },
  ],
  featuresTitle: "Kaikki työkalut, joita ammattisalonki tarvitsee",
  featuresSubtitle: "Kaikki yhdellä tilillä — täysin ilmaiseksi ja rajoituksetta.",
  groups: [
    {
      eyebrow: "Uusia asiakkaita",
      title: "Löydy ja tule varatuksi kaikkialla",
      body: "Tyylikäs varaussivu ja omat kotisivut ovat valmiina heti rekisteröinnin jälkeen. Lisää ne Facebookiin, Instagramiin ja Googleen — asiakkaat varaavat, vaikka olisit kiinni.",
      features: [
        { title: "Varaussivu 24/7", body: "Asiakas valitsee palvelun, tekijän ja vapaan ajan ja saa vahvistuksen heti." },
        { title: "Salongin omat kotisivut", body: "Kuvaesitys, palvelut, esittely ja yhteystiedot — ilman suunnittelutaitoja." },
        { title: "Facebook, Instagram, Google", body: "Yksi linkki tai upotuskoodi kaikkialle, missä asiakkaat näkevät sinut." },
        { title: "Näkyvyys hakukartalla", body: "Lähistön asiakkaat löytävät salonkisi VaraaAista." },
        { title: "AI-avustaja asiakkaille", body: "AI vastaa palveluista, hinnoista ja vapaista ajoista ja auttaa varaamaan, kun olet kiireinen." },
        { title: "Fanisivu seuraajille", body: "Julkaise uusia töitä ja tarjouksia sinua seuraaville asiakkaille." },
      ],
    },
    {
      eyebrow: "Sujuva arki",
      title: "Koko salonki yhdellä näytöllä — puhelimessa",
      body: "Jokaisen tekijän varaukset, automaattiset muistutukset ja kassa — arki selkeytyy, puheluita ja sekaannuksia on vähemmän.",
      features: [
        { title: "Vedä ja pudota -kalenteri", body: "Päivä-, viikko- ja kuukausinäkymä; siirrä varaus vetämällä, asiakas saa uuden ajan sähköpostiin." },
        { title: "Automaattiset muistutukset", body: "Sähköposti 24 h, 2 h ja 15 min ennen — paljon vähemmän poisjääntejä." },
        { title: "Työntekijät & oikeudet", body: "Omat työajat, omat hinnat ja oma tunnus omien varausten katsomiseen." },
        { title: "Kassa & laskut", body: "Ota maksu tiskillä, tee PDF-lasku ja lähetä se sähköpostilla." },
        { title: "Useita toimipisteitä", body: "Kaikki toimipisteet yhdellä tilillä ja yhteinen varaussivu." },
        { title: "Liiketoiminnan yleiskuva", body: "Myynti, suosituimmat palvelut ja tekijöiden tulokset yhdellä silmäyksellä." },
      ],
    },
    {
      eyebrow: "Pidä asiakkaat, kasvata myyntiä",
      title: "Uusista asiakkaista kanta-asiakkaita",
      body: "Kanta-asiakaskortit, lahjakortit, tarjoussähköpostit ja automaattiset arvostelupyynnöt — suurten ketjujen työkalut nyt jokaiselle salongille.",
      features: [
        { title: "QR-kanta-asiakaskortti", body: "Ei paperikortteja: skannaa joka käynnillä, ja täysi kortti avaa edun." },
        { title: "Lahjakortit verkossa", body: "Asiakkaat ostavat ja lähettävät ne sähköpostilla — lisämyyntiä juhlasesonkiin." },
        { title: "Sähköpostimarkkinointi", body: "Lähetä tarjous aiemmille asiakkaille kahdessa minuutissa, varauspainikkeen kera." },
        { title: "Arvostelut & Google", body: "Arvostelupyyntö jokaisen käynnin jälkeen ja kehotus jakaa Googleen." },
        { title: "Tuotemyynti verkossa", body: "Hoitotuotteet, lakat ja lahjat tilataan suoraan salongin sivulta." },
        { title: "Kumppanit", body: "Asiakkaita suosittelevat saavat provision, ja järjestelmä seuraa sitä." },
      ],
    },
  ],
  toolsTitle: "Ilmaiset työkalut ilman tiliä",
  toolsSubtitle: "Kokeile tänään — tulokset ovat valmiita tulostettaviksi.",
  tools: [
    { title: "Monikielinen hinnasto", body: "Tyylikäs hinnasto, automaattinen käännös, varaus-QR-koodi ja PDF.", cta: "Tee hinnasto" },
    { title: "Varaa QR:llä -juliste", body: "Julisteet, tarrat, pöytäkolmiot — joulu-, Black Friday- ja Tet-teemat.", cta: "Tee juliste" },
    { title: "Salonkitarkistus", body: "Katso, miltä salonkisi näyttää verkossa, ja saat tehtävälistan.", cta: "Tarkista nyt" },
  ],
  stepsTitle: "Aloita kolmessa vaiheessa",
  steps: [
    { title: "Rekisteröidy ilmaiseksi", body: "Täytä salongin tiedot ja vahvista sähköposti — salonki on heti käytössä." },
    { title: "Lisää palvelut & tiimi", body: "Lisää palvelut, hinnat, kestot ja tiimisi vaiheittaisen ohjeen avulla." },
    { title: "Jaa ja ota vastaan varauksia", body: "Lisää varauslinkki Facebookiin, Instagramiin ja Googleen ja aloita." },
  ],
  chat: {
    eyebrow: "Tuki 24/7",
    title: "Vielä kysyttävää? Kysy heti",
    body: "AI-avustaja vastaa heti kaikkeen rekisteröitymisestä ja käytöstä, vaihe vaiheelta. Tarvitsetko ihmisen? VaraaAi-tiimi on aina tavoitettavissa.",
    points: ["Vastaa keskellä yötäkin", "Rekisteröinti vaihe vaiheelta", "Ihminen tavoitettavissa aina"],
    open: "Avaa chat",
    launcher: "Kysyttävää? Chattaa kanssamme",
    teaser: "Hei! Tarvitsetko apua salongin rekisteröintiin? Kysy mitä vain.",
    headerTitle: "VaraaAi-tuki",
    aiOnline: "AI-avustaja paikalla",
    teamReplies: "Tiimi vastaa pian",
    suggestions: [
      "Onko rekisteröinti todella ilmainen?",
      "Mitä tarvitsen rekisteröitymiseen?",
      "Miten asiakkaat varaavat Facebookin kautta?",
      "Minulla on 2 toimipistettä — miten toimin?",
    ],
  },
  faqTitle: "Usein kysyttyä",
  faq: [
    { q: "Onko VaraaAi todella ilmainen?", a: "On. Rekisteröityminen, varaukset, työntekijät, muistutukset, kanta-asiakaskortit, lahjakortit ja omat kotisivut ovat ilmaisia — ei luottokorttia, ei varausrajoja." },
    { q: "Mitä tarvitsen aloittamiseen?", a: "Vain salongin nimen, osoitteen, puhelinnumeron ja sähköpostin. Kun vahvistat sähköpostin, salonki on käytössä; palvelut ja työntekijät lisäät minuuteissa." },
    { q: "Pitääkö asiakkaiden ladata sovellus?", a: "Ei. Asiakkaat varaavat selaimessa ilman tiliä. Halutessaan he voivat lisätä VaraaAin kotinäytölle kuin sovelluksen." },
    { q: "Millä kielillä palvelua voi käyttää?", a: "VaraaAissa on 35 kieltä. Asiakassähköpostit käyttävät salongin maan kieltä, ja voit valita asiakkaiden oletuskielen." },
    { q: "Entä jos minulla on useita toimipisteitä?", a: "Hallitse kaikkia toimipisteitä samalla tilillä, vaihda yhdellä napautuksella ja jaa koko ketjulle yhteinen varaussivu." },
    { q: "Mistä saan apua?", a: "Napauta kulman chat-painiketta tai avaa tukikeskus. AI-avustaja vastaa heti, ja VaraaAi-tiimi auttaa, kun tarvitset ihmistä." },
  ],
  final: {
    title: "Valmis viemään salonkisi uudelle tasolle?",
    body: "Rekisteröidy ilmaiseksi 5 minuutissa. Ei piilokuluja, ei rajoituksia, ei luottokorttia.",
    cta: "Rekisteröi salonki",
    chat: "Chattaa kanssamme",
  },
};

const pl: BusinessLandingStrings = {
  hero: {
    badge: "Za darmo na zawsze · Bez ukrytych opłat",
    title: "Więcej klientów,",
    titleAccent: "lżejszy dzień pracy",
    subtitle:
      "Platforma rezerwacji i zarządzania dla salonów paznokci, fryzjerskich, rzęs i spa. Klienci rezerwują 24/7, przypomnienia wysyłają się same, stali klienci wracają — a Ty robisz to, co potrafisz najlepiej.",
    cta: "Zarejestruj salon za darmo",
    chatCta: "Zapytaj przed rejestracją",
    trust: ["Bez karty kredytowej", "Gotowe w 5 minut", "Bez limitu rezerwacji"],
  },
  mock: {
    salon: "Lumi Nails & Beauty",
    city: "Helsinki",
    services: ["Manicure hybrydowy", "Rzęsy objętościowe", "Zabieg na twarz"],
    book: "Zarezerwuj",
    today: "Dziś",
    newBooking: "Nowa rezerwacja",
    newBookingBody: "Anna · Hybryda · 14:00",
    review: "Super łatwa rezerwacja i przypomnienie dzień wcześniej!",
    points: "+1 punkt lojalnościowy",
    revenue: "Przychód w miesiącu",
    bookings: "Rezerwacje",
    giftCard: "Karta podarunkowa",
    loyaltyCard: "Karta stałego klienta",
    reminder: "Wysłano automatyczne przypomnienie",
  },
  audienceLabel: "Dla każdego biznesu beauty",
  audience: ["Paznokcie", "Włosy", "Rzęsy i brwi", "Spa i masaż", "Barber", "Kosmetologia"],
  stats: [
    { value: "0 zł", label: "Opłata za korzystanie" },
    { value: "24/7", label: "Rezerwacje online" },
    { value: "∞", label: "Pracownicy i rezerwacje" },
    { value: "35", label: "Języków" },
  ],
  featuresTitle: "Wszystkie narzędzia profesjonalnego salonu",
  featuresSubtitle: "Wszystko w jednym koncie — całkowicie za darmo i bez limitów.",
  groups: [
    {
      eyebrow: "Nowi klienci",
      title: "Bądź widoczny i rezerwowany wszędzie",
      body: "Piękna strona rezerwacji i własna strona internetowa są gotowe od razu po rejestracji. Dodaj je do Facebooka, Instagrama i Google — klienci rezerwują nawet po zamknięciu.",
      features: [
        { title: "Rezerwacje 24/7", body: "Klient wybiera usługę, specjalistę i wolny termin, a potwierdzenie dostaje od razu." },
        { title: "Własna strona salonu", body: "Pokaz zdjęć, usługi, o nas i kontakt — bez umiejętności projektowania." },
        { title: "Facebook, Instagram, Google", body: "Jeden link lub kod do osadzenia — wszędzie, gdzie widzą Cię klienci." },
        { title: "Na mapie wyszukiwania", body: "Klienci z okolicy znajdą Twój salon w VaraaAi." },
        { title: "Asystent AI dla klientów", body: "AI odpowiada o usługach, cenach i terminach i pomaga zarezerwować, gdy jesteś zajęty." },
        { title: "Fanpage dla obserwujących", body: "Publikuj nowe stylizacje i promocje dla obserwujących Cię klientów." },
      ],
    },
    {
      eyebrow: "Sprawna praca",
      title: "Cały salon na jednym ekranie — w telefonie",
      body: "Rezerwacje każdego pracownika, automatyczne przypomnienia i kasa — codzienna praca jest prostsza, mniej telefonów i pomyłek.",
      features: [
        { title: "Kalendarz przeciągnij i upuść", body: "Widok dnia, tygodnia i miesiąca; przeciągnij, by przenieść wizytę — klient dostaje e-mail." },
        { title: "Automatyczne przypomnienia", body: "E-maile 24 h, 2 h i 15 min przed — znacznie mniej nieobecności." },
        { title: "Pracownicy i uprawnienia", body: "Własne godziny, ceny i login do podglądu swoich wizyt." },
        { title: "Kasa i faktury", body: "Przyjmij płatność, wystaw fakturę PDF i wyślij ją e-mailem." },
        { title: "Wiele oddziałów", body: "Wszystkie oddziały na jednym koncie i wspólna strona rezerwacji." },
        { title: "Przegląd biznesu", body: "Przychody, najpopularniejsze usługi i wyniki pracowników na jednym ekranie." },
      ],
    },
    {
      eyebrow: "Zatrzymaj klientów, zwiększ przychody",
      title: "Zamień pierwszą wizytę w stałego klienta",
      body: "Karty lojalnościowe, karty podarunkowe, e-maile z ofertami i automatyczne prośby o opinie — narzędzia dużych sieci, teraz dla każdego salonu.",
      features: [
        { title: "Karta lojalnościowa QR", body: "Bez papierowych kart: skan przy każdej wizycie, a pełna karta daje rabat." },
        { title: "Karty podarunkowe online", body: "Klienci kupują i wysyłają je e-mailem — dodatkowy przychód w święta." },
        { title: "E-mail marketing", body: "Wyślij ofertę dawnym klientom w dwie minuty, z przyciskiem rezerwacji." },
        { title: "Opinie i Google", body: "Prośba o opinię po każdej wizycie i zachęta do udostępnienia w Google." },
        { title: "Sprzedaż produktów", body: "Kosmetyki, lakiery i prezenty zamawiane prosto ze strony salonu." },
        { title: "Partnerzy", body: "Polecający klientów dostają prowizję, a system ją śledzi." },
      ],
    },
  ],
  toolsTitle: "Darmowe narzędzia bez konta",
  toolsSubtitle: "Wypróbuj dziś — wyniki od razu do druku.",
  tools: [
    { title: "Wielojęzyczny cennik", body: "Elegancki cennik z automatycznym tłumaczeniem, kodem QR i eksportem do PDF.", cta: "Utwórz cennik" },
    { title: "Plakat QR do rezerwacji", body: "Plakaty, naklejki, stojaki — motywy świąteczne, Black Friday i Tet.", cta: "Utwórz plakat" },
    { title: "Sprawdź salon", body: "Zobacz, jak Twój salon wygląda w sieci, i otrzymaj listę zadań.", cta: "Sprawdź teraz" },
  ],
  stepsTitle: "Zacznij w 3 krokach",
  steps: [
    { title: "Zarejestruj się za darmo", body: "Podaj dane salonu i potwierdź e-mail — salon działa od razu." },
    { title: "Dodaj usługi i zespół", body: "Wpisz usługi, ceny, czas trwania i zespół z pomocą przewodnika." },
    { title: "Udostępnij i przyjmuj rezerwacje", body: "Dodaj link do Facebooka, Instagrama i Google i zacznij przyjmować klientów." },
  ],
  chat: {
    eyebrow: "Wsparcie 24/7",
    title: "Masz pytania? Zapytaj teraz",
    body: "Asystent AI od razu odpowie na pytania o rejestrację i korzystanie, krok po kroku. Potrzebujesz człowieka? Zespół VaraaAi jest zawsze dostępny.",
    points: ["Odpowiada nawet w nocy", "Rejestracja krok po kroku", "Kontakt z człowiekiem zawsze"],
    open: "Otwórz czat",
    launcher: "Pytania? Napisz do nas",
    teaser: "Cześć! Potrzebujesz pomocy z rejestracją salonu? Pytaj śmiało.",
    headerTitle: "Wsparcie VaraaAi",
    aiOnline: "Asystent AI online",
    teamReplies: "Zespół odpowie wkrótce",
    suggestions: [
      "Czy rejestracja jest naprawdę darmowa?",
      "Czego potrzebuję do rejestracji?",
      "Jak klienci rezerwują przez Facebooka?",
      "Mam 2 oddziały — jak to działa?",
    ],
  },
  faqTitle: "Najczęstsze pytania",
  faq: [
    { q: "Czy VaraaAi jest naprawdę darmowe?", a: "Tak. Rejestracja, rezerwacje, pracownicy, przypomnienia, karty lojalnościowe i podarunkowe oraz własna strona są darmowe — bez karty kredytowej i limitów." },
    { q: "Czego potrzebuję na start?", a: "Tylko nazwy salonu, adresu, telefonu i e-maila. Po potwierdzeniu e-maila salon działa, a usługi i zespół dodasz w kilka minut." },
    { q: "Czy klienci muszą pobrać aplikację?", a: "Nie. Klienci rezerwują w przeglądarce, bez konta. Mogą też dodać VaraaAi do ekranu głównego jak aplikację." },
    { q: "W jakich językach mogę korzystać?", a: "VaraaAi ma 35 języków. E-maile do klientów są w języku kraju salonu, a domyślny język dla klientów możesz wybrać sam." },
    { q: "A jeśli mam kilka oddziałów?", a: "Zarządzaj wszystkimi oddziałami z jednego konta, przełączaj jednym dotknięciem i udostępnij jedną stronę rezerwacji dla całej sieci." },
    { q: "Gdzie uzyskam pomoc?", a: "Kliknij przycisk czatu w rogu lub otwórz Centrum pomocy. Asystent AI odpowiada od razu, a zespół VaraaAi pomoże, gdy potrzebujesz człowieka." },
  ],
  final: {
    title: "Gotowy, by wynieść salon na wyższy poziom?",
    body: "Zarejestruj się za darmo w 5 minut. Bez ukrytych opłat, limitów i karty kredytowej.",
    cta: "Zarejestruj salon",
    chat: "Napisz do nas",
  },
};

const de: BusinessLandingStrings = {
  hero: {
    badge: "Für immer kostenlos · Keine versteckten Kosten",
    title: "Mehr Kunden,",
    titleAccent: "entspannterer Alltag",
    subtitle:
      "Die Buchungs- und Verwaltungsplattform für Nagel-, Friseur-, Wimpern- und Spa-Salons. Kunden buchen rund um die Uhr, Erinnerungen gehen automatisch raus, Stammkunden kommen wieder — und du konzentrierst dich auf das, was du am besten kannst.",
    cta: "Salon kostenlos registrieren",
    chatCta: "Vorher Fragen stellen",
    trust: ["Keine Kreditkarte nötig", "In 5 Minuten startklar", "Unbegrenzte Buchungen"],
  },
  mock: {
    salon: "Lumi Nails & Beauty",
    city: "Helsinki",
    services: ["Gel-Maniküre", "Volumen-Wimpern", "Gesichtsbehandlung"],
    book: "Buchen",
    today: "Heute",
    newBooking: "Neue Buchung",
    newBookingBody: "Anna · Gel-Maniküre · 14:00",
    review: "Super einfach gebucht und vorher erinnert!",
    points: "+1 Treuepunkt",
    revenue: "Umsatz im Monat",
    bookings: "Buchungen",
    giftCard: "Gutschein",
    loyaltyCard: "Mitgliedskarte",
    reminder: "Automatische Erinnerung gesendet",
  },
  audienceLabel: "Für jedes Beauty-Business",
  audience: ["Nägel", "Haare", "Wimpern & Brauen", "Spa & Massage", "Barber", "Kosmetik & Haut"],
  stats: [
    { value: "0 €", label: "Nutzungsgebühr" },
    { value: "24/7", label: "Online-Buchung" },
    { value: "∞", label: "Mitarbeiter & Buchungen" },
    { value: "35", label: "Sprachen" },
  ],
  featuresTitle: "Alle Werkzeuge, die ein professioneller Salon braucht",
  featuresSubtitle: "Alles in einem Konto — komplett kostenlos und ohne Limits.",
  groups: [
    {
      eyebrow: "Neue Kunden gewinnen",
      title: "Überall gefunden und gebucht werden",
      body: "Eine schöne Buchungsseite und deine eigene Website sind sofort nach der Anmeldung bereit. Füge sie bei Facebook, Instagram und Google ein — Kunden buchen auch, wenn du geschlossen hast.",
      features: [
        { title: "Buchungsseite 24/7", body: "Kunden wählen Leistung, Mitarbeiter und freie Zeit und erhalten sofort eine Bestätigung." },
        { title: "Eigene Salon-Website", body: "Diashow, Leistungen, Über uns und Kontakt — ohne Designkenntnisse." },
        { title: "Facebook, Instagram, Google", body: "Ein Link oder Einbettungscode — überall, wo Kunden dich sehen." },
        { title: "Auf der Suchkarte", body: "Kunden in der Nähe finden deinen Salon auf VaraaAi." },
        { title: "KI-Assistent für Kunden", body: "Die KI beantwortet Fragen zu Leistungen, Preisen und freien Zeiten und hilft beim Buchen." },
        { title: "Fanpage für Follower", body: "Teile neue Looks und Angebote mit Kunden, die dir folgen." },
      ],
    },
    {
      eyebrow: "Mühelos organisiert",
      title: "Der ganze Salon auf einem Bildschirm — am Handy",
      body: "Die Termine jedes Mitarbeiters, automatische Erinnerungen und Kasse — der Alltag wird einfacher, mit weniger Anrufen und Verwechslungen.",
      features: [
        { title: "Kalender per Drag & Drop", body: "Tages-, Wochen- und Monatsansicht; Termin verschieben und der Kunde erhält eine E-Mail." },
        { title: "Automatische Erinnerungen", body: "E-Mails 24 Std., 2 Std. und 15 Min. vorher — deutlich weniger No-Shows." },
        { title: "Mitarbeiter & Rechte", body: "Eigene Zeiten, eigene Preise und eigener Login für die eigenen Termine." },
        { title: "Kasse & Rechnungen", body: "Zahlung an der Theke, PDF-Rechnung erstellen und per E-Mail senden." },
        { title: "Mehrere Filialen", body: "Alle Filialen in einem Konto mit gemeinsamer Buchungsseite." },
        { title: "Geschäftsüberblick", body: "Umsatz, Top-Leistungen und Mitarbeiterleistung auf einen Blick." },
      ],
    },
    {
      eyebrow: "Kunden binden, Umsatz steigern",
      title: "Aus Erstbesuchen werden Stammkunden",
      body: "Treuekarten, Gutscheine, Angebots-E-Mails und automatische Bewertungsanfragen — die Werkzeuge großer Ketten, jetzt für jeden Salon.",
      features: [
        { title: "QR-Treuekarte", body: "Keine Papierkarten: bei jedem Besuch scannen, volle Karte schaltet den Rabatt frei." },
        { title: "Online-Gutscheine", body: "Kunden kaufen und verschicken sie per E-Mail — Zusatzumsatz zu den Feiertagen." },
        { title: "E-Mail-Marketing", body: "Angebote an frühere Kunden in zwei Minuten senden, mit Buchungsbutton." },
        { title: "Bewertungen & Google", body: "Bewertungsanfrage nach jedem Besuch und Hinweis zum Teilen auf Google." },
        { title: "Produkte online verkaufen", body: "Pflegeprodukte, Lacke, Geschenke — direkt über deine Salonseite bestellt." },
        { title: "Partner", body: "Wer Kunden vermittelt, erhält Provision — automatisch erfasst." },
      ],
    },
  ],
  toolsTitle: "Kostenlose Tools ohne Konto",
  toolsSubtitle: "Probiere sie heute aus — die Ergebnisse sind druckfertig.",
  tools: [
    { title: "Mehrsprachige Preisliste", body: "Elegante Preisliste mit automatischer Übersetzung, Buchungs-QR-Code und PDF.", cta: "Preisliste erstellen" },
    { title: "QR-Buchungsposter", body: "Poster, Aufkleber, Tischaufsteller — Weihnachts-, Black-Friday- und Tet-Motive.", cta: "Poster erstellen" },
    { title: "Salon-Check", body: "Sieh, wie dein Salon online wirkt, und erhalte eine priorisierte To-do-Liste.", cta: "Jetzt prüfen" },
  ],
  stepsTitle: "In 3 Schritten starten",
  steps: [
    { title: "Kostenlos registrieren", body: "Salondaten eingeben und E-Mail bestätigen — dein Salon ist sofort online." },
    { title: "Leistungen & Team anlegen", body: "Leistungen, Preise, Dauer und Team mit Schritt-für-Schritt-Anleitung erfassen." },
    { title: "Teilen & Buchungen erhalten", body: "Buchungslink bei Facebook, Instagram und Google einfügen und loslegen." },
  ],
  chat: {
    eyebrow: "Support 24/7",
    title: "Noch Fragen? Frag uns jetzt",
    body: "Unser KI-Assistent beantwortet sofort alle Fragen zur Anmeldung und Nutzung, Schritt für Schritt. Lieber ein Mensch? Das VaraaAi-Team ist immer erreichbar.",
    points: ["Antworten auch um Mitternacht", "Anmeldung Schritt für Schritt", "Jederzeit ein Mensch erreichbar"],
    open: "Chat öffnen",
    launcher: "Fragen? Schreib uns",
    teaser: "Hallo! Brauchst du Hilfe bei der Salon-Anmeldung? Frag einfach.",
    headerTitle: "VaraaAi-Support",
    aiOnline: "KI-Assistent online",
    teamReplies: "Das Team antwortet bald",
    suggestions: [
      "Ist die Anmeldung wirklich kostenlos?",
      "Was brauche ich für die Anmeldung?",
      "Wie buchen Kunden über Facebook?",
      "Ich habe 2 Filialen — wie geht das?",
    ],
  },
  faqTitle: "Häufige Fragen",
  faq: [
    { q: "Ist VaraaAi wirklich kostenlos?", a: "Ja. Anmeldung, Buchungen, Mitarbeiter, Erinnerungen, Treue- und Geschenkkarten und deine eigene Website sind kostenlos — ohne Kreditkarte und ohne Buchungslimit." },
    { q: "Was brauche ich zum Start?", a: "Nur Salonname, Adresse, Telefon und E-Mail. Nach der E-Mail-Bestätigung ist der Salon online; Leistungen und Team legst du in Minuten an." },
    { q: "Müssen Kunden eine App herunterladen?", a: "Nein. Kunden buchen im Browser, ohne Konto. Wer möchte, legt VaraaAi wie eine App auf den Startbildschirm." },
    { q: "In welchen Sprachen kann ich es nutzen?", a: "VaraaAi gibt es in 35 Sprachen. Kunden-E-Mails nutzen die Sprache des Salonlandes, und du kannst die Standardsprache für Kunden wählen." },
    { q: "Und wenn ich mehrere Filialen habe?", a: "Alle Filialen in einem Konto verwalten, mit einem Tippen wechseln und eine gemeinsame Buchungsseite für die ganze Kette teilen." },
    { q: "Wo bekomme ich Hilfe?", a: "Tippe auf den Chat-Button in der Ecke oder öffne das Hilfe-Center. Der KI-Assistent antwortet sofort, und das VaraaAi-Team hilft, wenn du einen Menschen brauchst." },
  ],
  final: {
    title: "Bereit, deinen Salon aufs nächste Level zu bringen?",
    body: "In 5 Minuten kostenlos registrieren. Keine versteckten Kosten, keine Limits, keine Kreditkarte.",
    cta: "Salon registrieren",
    chat: "Schreib uns",
  },
};

const km: BusinessLandingStrings = {
  hero: {
    badge: "ឥតគិតថ្លៃជារៀងរហូត · គ្មានថ្លៃលាក់កំបាំង",
    title: "អតិថិជនកាន់តែច្រើន",
    titleAccent: "ការគ្រប់គ្រងកាន់តែងាយ",
    subtitle:
      "វេទិកាកក់ និងគ្រប់គ្រងសម្រាប់សាឡុងក្រចក សក់ រោមភ្នែក និងស្ប៉ា។ អតិថិជនកក់បាន ២៤/៧ ការរំលឹកផ្ញើដោយស្វ័យប្រវត្តិ អតិថិជនចាស់ត្រឡប់មកវិញ — ហើយអ្នកផ្តោតលើការងារដែលអ្នកពូកែបំផុត។",
    cta: "ចុះឈ្មោះសាឡុងឥតគិតថ្លៃ",
    chatCta: "សួរមុនពេលចុះឈ្មោះ",
    trust: ["មិនត្រូវការកាតឥណទាន", "រួចរាល់ក្នុង ៥ នាទី", "កក់មិនកំណត់"],
  },
  mock: {
    salon: "Lumi Nails & Beauty",
    city: "Phnom Penh",
    services: ["លាបក្រចកជែល", "តរោមភ្នែក", "ថែទាំស្បែកមុខ"],
    book: "កក់",
    today: "ថ្ងៃនេះ",
    newBooking: "ការកក់ថ្មី",
    newBookingBody: "Anna · ជែល · 14:00",
    review: "កក់ងាយណាស់ ហើយមានរំលឹកមុនទៀត!",
    points: "+១ ពិន្ទុ",
    revenue: "ចំណូលខែនេះ",
    bookings: "ការកក់",
    giftCard: "កាតអំណោយ",
    loyaltyCard: "កាតសមាជិក",
    reminder: "បានផ្ញើការរំលឹកស្វ័យប្រវត្តិ",
  },
  audienceLabel: "សម្រាប់អាជីវកម្មសម្ផស្សគ្រប់ប្រភេទ",
  audience: ["ក្រចក", "សក់", "រោមភ្នែក & ចិញ្ចើម", "ស្ប៉ា & ម៉ាស្សា", "កាត់សក់បុរស", "ថែស្បែក"],
  stats: [
    { value: "0", label: "ថ្លៃប្រើប្រាស់" },
    { value: "24/7", label: "កក់តាមអនឡាញ" },
    { value: "∞", label: "បុគ្គលិក & ការកក់" },
    { value: "35", label: "ភាសា" },
  ],
  featuresTitle: "ឧបករណ៍គ្រប់យ៉ាងដែលសាឡុងអាជីពត្រូវការ",
  featuresSubtitle: "ទាំងអស់ក្នុងគណនីតែមួយ — ឥតគិតថ្លៃ និងគ្មានដែនកំណត់។",
  groups: [
    {
      eyebrow: "ទាក់ទាញអតិថិជនថ្មី",
      title: "ឱ្យគេរកឃើញ និងកក់អ្នកបានគ្រប់ទីកន្លែង",
      body: "ទំព័រកក់ដ៏ស្រស់ស្អាត និងគេហទំព័រផ្ទាល់ខ្លួនរួចរាល់ភ្លាមៗបន្ទាប់ពីចុះឈ្មោះ។ ដាក់វានៅលើ Facebook, Instagram និង Google — អតិថិជនកក់បានទោះហាងបិទក៏ដោយ។",
      features: [
        { title: "ទំព័រកក់ ២៤/៧", body: "អតិថិជនជ្រើសសេវា បុគ្គលិក និងម៉ោងទំនេរ ហើយទទួលការបញ្ជាក់ភ្លាមៗ។" },
        { title: "គេហទំព័រផ្ទាល់របស់សាឡុង", body: "រូបភាព សេវាកម្ម អំពីយើង និងទំនាក់ទំនង — មិនចាំបាច់ចេះរចនា។" },
        { title: "Facebook, Instagram, Google", body: "តំណ ឬកូដបង្កប់មួយ សម្រាប់គ្រប់ទីកន្លែងដែលអតិថិជនឃើញអ្នក។" },
        { title: "បង្ហាញលើផែនទីស្វែងរក", body: "អតិថិជននៅជិតរកឃើញសាឡុងរបស់អ្នកនៅលើ VaraaAi។" },
        { title: "ជំនួយការ AI សម្រាប់អតិថិជន", body: "AI ឆ្លើយអំពីសេវា តម្លៃ ម៉ោងទំនេរ និងជួយកក់ពេលអ្នករវល់។" },
        { title: "ហ្វេនផេកសម្រាប់អ្នកតាមដាន", body: "ចែករំលែកម៉ូដថ្មី និងប្រូម៉ូសិនដល់អតិថិជនដែលតាមដានអ្នក។" },
      ],
    },
    {
      eyebrow: "ប្រតិបត្តិការងាយស្រួល",
      title: "សាឡុងទាំងមូលនៅលើអេក្រង់តែមួយ — នៅលើទូរស័ព្ទ",
      body: "ការកក់របស់បុគ្គលិកម្នាក់ៗ ការរំលឹកស្វ័យប្រវត្តិ និងការគិតលុយ — ការងារប្រចាំថ្ងៃកាន់តែសាមញ្ញ។",
      features: [
        { title: "ប្រតិទិនអូសទម្លាក់", body: "មើលតាមថ្ងៃ សប្តាហ៍ ខែ; អូសដើម្បីប្តូរម៉ោង អតិថិជនទទួលអ៊ីមែលម៉ោងថ្មី។" },
        { title: "ការរំលឹកស្វ័យប្រវត្តិ", body: "អ៊ីមែលមុន ២៤ ម៉ោង ២ ម៉ោង និង ១៥ នាទី — កាត់បន្ថយការភ្លេចណាត់។" },
        { title: "បុគ្គលិក & សិទ្ធិ", body: "ម៉ោងផ្ទាល់ខ្លួន តម្លៃផ្ទាល់ខ្លួន និងគណនីសម្រាប់មើលការកក់។" },
        { title: "គិតលុយ & វិក្កយបត្រ", body: "ទទួលការទូទាត់ ចេញវិក្កយបត្រ PDF និងផ្ញើតាមអ៊ីមែល។" },
        { title: "សាខាច្រើន", body: "គ្រប់សាខាក្នុងគណនីតែមួយ និងទំព័រកក់រួម។" },
        { title: "ទិដ្ឋភាពអាជីវកម្ម", body: "ចំណូល សេវាពេញនិយម និងលទ្ធផលបុគ្គលិក មើលភ្លាមយល់ភ្លាម។" },
      ],
    },
    {
      eyebrow: "រក្សាអតិថិជន បង្កើនចំណូល",
      title: "ប្រែក្លាយអតិថិជនថ្មីជាអតិថិជនប្រចាំ",
      body: "កាតពិន្ទុ កាតអំណោយ អ៊ីមែលប្រូម៉ូសិន និងការស្នើសុំវាយតម្លៃស្វ័យប្រវត្តិ — ឧបករណ៍របស់ក្រុមហ៊ុនធំៗ ឥឡូវសម្រាប់គ្រប់សាឡុង។",
      features: [
        { title: "កាតពិន្ទុ QR", body: "គ្មានកាតក្រដាស: ស្កេនរាល់ពេលមក ពិន្ទុគ្រប់ទទួលបានការបញ្ចុះតម្លៃ។" },
        { title: "កាតអំណោយអនឡាញ", body: "អតិថិជនទិញ និងផ្ញើតាមអ៊ីមែល — ចំណូលបន្ថែមរដូវបុណ្យ។" },
        { title: "ទីផ្សារតាមអ៊ីមែល", body: "ផ្ញើការផ្តល់ជូនដល់អតិថិជនចាស់ក្នុងពីរនាទី។" },
        { title: "ការវាយតម្លៃ & Google", body: "ស្នើសុំវាយតម្លៃក្រោយការណាត់ និងចែករំលែកលើ Google។" },
        { title: "លក់ផលិតផលអនឡាញ", body: "ផលិតផលថែទាំ ថ្នាំក្រចក អំណោយ — កុម្ម៉ង់ពីទំព័រសាឡុង។" },
        { title: "ដៃគូណែនាំ", body: "អ្នកណែនាំអតិថិជនទទួលកម្រៃជើងសារ ប្រព័ន្ធតាមដានឱ្យ។" },
      ],
    },
  ],
  toolsTitle: "ឧបករណ៍ឥតគិតថ្លៃ មិនចាំបាច់មានគណនី",
  toolsSubtitle: "សាកល្បងថ្ងៃនេះ — លទ្ធផលរួចរាល់សម្រាប់បោះពុម្ព។",
  tools: [
    { title: "តារាងតម្លៃពហុភាសា", body: "តារាងតម្លៃស្អាត បកប្រែស្វ័យប្រវត្តិ មានកូដ QR កក់ និង PDF។", cta: "បង្កើតតារាងតម្លៃ" },
    { title: "ប៉ូស្ទ័រ QR កក់", body: "ប៉ូស្ទ័រ ស្ទីគ័រ ផ្ទាំងលើតុ — គំរូណូអែល Black Friday និងចូលឆ្នាំ។", cta: "បង្កើតប៉ូស្ទ័រ" },
    { title: "ពិនិត្យសាឡុង", body: "មើលថាសាឡុងរបស់អ្នកមើលទៅយ៉ាងណាតាមអនឡាញ និងទទួលបញ្ជីការងារ។", cta: "ពិនិត្យឥឡូវ" },
  ],
  stepsTitle: "ចាប់ផ្តើមក្នុង ៣ ជំហាន",
  steps: [
    { title: "ចុះឈ្មោះឥតគិតថ្លៃ", body: "បំពេញព័ត៌មានសាឡុង និងផ្ទៀងផ្ទាត់អ៊ីមែល — សាឡុងដំណើរការភ្លាម។" },
    { title: "បន្ថែមសេវា & ក្រុមការងារ", body: "បញ្ចូលសេវា តម្លៃ រយៈពេល និងបុគ្គលិក ដោយមានការណែនាំ។" },
    { title: "ចែករំលែក & ទទួលការកក់", body: "ដាក់តំណកក់លើ Facebook, Instagram, Google ហើយចាប់ផ្តើម។" },
  ],
  chat: {
    eyebrow: "ជំនួយ ២៤/៧",
    title: "មានសំណួរ? សួរយើងឥឡូវ",
    body: "ជំនួយការ AI ឆ្លើយភ្លាមៗអំពីការចុះឈ្មោះ និងការប្រើប្រាស់ ជាជំហានៗ។ ចង់និយាយជាមួយមនុស្ស? ក្រុម VaraaAi តែងតែត្រៀមខ្លួន។",
    points: ["ឆ្លើយទាំងពាក់កណ្តាលអធ្រាត្រ", "ណែនាំចុះឈ្មោះជាជំហានៗ", "ជួបបុគ្គលិកបានគ្រប់ពេល"],
    open: "បើកការជជែក",
    launcher: "មានសំណួរ? ជជែកជាមួយយើង",
    teaser: "សួស្តី! ត្រូវការជំនួយចុះឈ្មោះសាឡុងទេ? សួរមកបាន។",
    headerTitle: "ជំនួយ VaraaAi",
    aiOnline: "ជំនួយការ AI កំពុងអនឡាញ",
    teamReplies: "ក្រុមការងារនឹងឆ្លើយឆាប់ៗ",
    suggestions: [
      "ចុះឈ្មោះពិតជាឥតគិតថ្លៃមែនទេ?",
      "ត្រូវការអ្វីខ្លះដើម្បីចុះឈ្មោះ?",
      "អតិថិជនកក់តាម Facebook យ៉ាងដូចម្តេច?",
      "ខ្ញុំមាន ២ សាខា គ្រប់គ្រងយ៉ាងណា?",
    ],
  },
  faqTitle: "សំណួរដែលសួរញឹកញាប់",
  faq: [
    { q: "VaraaAi ពិតជាឥតគិតថ្លៃមែនទេ?", a: "មែន។ ការចុះឈ្មោះ ការកក់ បុគ្គលិក ការរំលឹក កាតពិន្ទុ កាតអំណោយ និងគេហទំព័រផ្ទាល់ខ្លួន សុទ្ធតែឥតគិតថ្លៃ — មិនត្រូវការកាតឥណទាន។" },
    { q: "ត្រូវរៀបចំអ្វីខ្លះដើម្បីចាប់ផ្តើម?", a: "គ្រាន់តែឈ្មោះសាឡុង អាសយដ្ឋាន លេខទូរស័ព្ទ និងអ៊ីមែល។ បន្ទាប់ពីផ្ទៀងផ្ទាត់អ៊ីមែល សាឡុងដំណើរការភ្លាម។" },
    { q: "តើអតិថិជនត្រូវទាញយកកម្មវិធីទេ?", a: "ទេ។ អតិថិជនកក់តាមកម្មវិធីរុករក មិនចាំបាច់មានគណនី។" },
    { q: "ខ្ញុំអាចប្រើភាសាអ្វីខ្លះ?", a: "VaraaAi មាន ៣៥ ភាសា។ អ៊ីមែលទៅអតិថិជនប្រើភាសារបស់ប្រទេសសាឡុង ហើយអ្នកអាចជ្រើសភាសាលំនាំដើម។" },
    { q: "បើខ្ញុំមានសាខាច្រើន?", a: "គ្រប់គ្រងគ្រប់សាខាក្នុងគណនីតែមួយ ប្តូរដោយចុចតែម្តង និងមានទំព័រកក់រួម។" },
    { q: "ត្រូវការជំនួយនៅឯណា?", a: "ចុចប៊ូតុងជជែកនៅជ្រុងអេក្រង់ ឬបើកមជ្ឈមណ្ឌលជំនួយ។ ជំនួយការ AI ឆ្លើយភ្លាម ហើយក្រុម VaraaAi តែងតែត្រៀមខ្លួន។" },
  ],
  final: {
    title: "ត្រៀមលើកសាឡុងរបស់អ្នកទៅកម្រិតថ្មីហើយឬនៅ?",
    body: "ចុះឈ្មោះឥតគិតថ្លៃក្នុង ៥ នាទី។ គ្មានថ្លៃលាក់កំបាំង គ្មានដែនកំណត់។",
    cta: "ចុះឈ្មោះសាឡុង",
    chat: "ជជែកជាមួយយើង",
  },
};

const th: BusinessLandingStrings = {
  hero: {
    badge: "ฟรีตลอดไป · ไม่มีค่าใช้จ่ายแอบแฝง",
    title: "ลูกค้ามากขึ้น",
    titleAccent: "บริหารร้านง่ายขึ้น",
    subtitle:
      "แพลตฟอร์มจองคิวและบริหารร้านสำหรับร้านทำเล็บ ทำผม ต่อขนตา และสปา ลูกค้าจองได้ 24/7 ระบบแจ้งเตือนอัตโนมัติ ลูกค้าประจำกลับมาเรื่อย ๆ — ส่วนคุณโฟกัสกับสิ่งที่ถนัดที่สุด",
    cta: "ลงทะเบียนร้านฟรี",
    chatCta: "สอบถามก่อนลงทะเบียน",
    trust: ["ไม่ต้องใช้บัตรเครดิต", "พร้อมใช้ใน 5 นาที", "จองได้ไม่จำกัด"],
  },
  mock: {
    salon: "Lumi Nails & Beauty",
    city: "Bangkok",
    services: ["ทาสีเจล", "ต่อขนตาวอลลุ่ม", "ทรีตเมนต์หน้า"],
    book: "จอง",
    today: "วันนี้",
    newBooking: "การจองใหม่",
    newBookingBody: "Anna · ทาสีเจล · 14:00",
    review: "จองง่ายมาก แถมมีแจ้งเตือนล่วงหน้าด้วย!",
    points: "+1 แต้มสะสม",
    revenue: "รายได้เดือนนี้",
    bookings: "การจอง",
    giftCard: "บัตรของขวัญ",
    loyaltyCard: "บัตรสมาชิก",
    reminder: "ส่งการแจ้งเตือนอัตโนมัติแล้ว",
  },
  audienceLabel: "เหมาะกับธุรกิจความงามทุกแบบ",
  audience: ["ทำเล็บ", "ทำผม", "ขนตา & คิ้ว", "สปา & นวด", "บาร์เบอร์", "ความงาม & ผิว"],
  stats: [
    { value: "฿0", label: "ค่าใช้บริการ" },
    { value: "24/7", label: "จองออนไลน์" },
    { value: "∞", label: "พนักงาน & การจอง" },
    { value: "35", label: "ภาษา" },
  ],
  featuresTitle: "ทุกเครื่องมือที่ร้านมืออาชีพต้องมี",
  featuresSubtitle: "ครบในบัญชีเดียว — ฟรีทั้งหมด ไม่จำกัด",
  groups: [
    {
      eyebrow: "ดึงลูกค้าใหม่",
      title: "ให้ลูกค้าเจอและจองคุณได้ทุกที่",
      body: "หน้าจองสวย ๆ และเว็บไซต์ของร้านพร้อมใช้ทันทีหลังสมัคร ใส่ใน Facebook, Instagram และ Google — ลูกค้าจองได้แม้ร้านปิด",
      features: [
        { title: "หน้าจอง 24/7", body: "ลูกค้าเลือกบริการ ช่าง และเวลาว่างเอง ได้รับการยืนยันทันที" },
        { title: "เว็บไซต์ของร้านเอง", body: "สไลด์รูป บริการ เกี่ยวกับเรา และติดต่อ — ไม่ต้องออกแบบเป็น" },
        { title: "Facebook, Instagram, Google", body: "ลิงก์เดียวหรือโค้ดฝัง ใช้ได้ทุกที่ที่ลูกค้าเห็นคุณ" },
        { title: "แสดงบนแผนที่ค้นหา", body: "ลูกค้าในพื้นที่ค้นเจอร้านคุณบน VaraaAi" },
        { title: "ผู้ช่วย AI ตอบลูกค้า", body: "AI ตอบเรื่องบริการ ราคา เวลาว่าง และช่วยจองเมื่อคุณไม่ว่าง" },
        { title: "แฟนเพจให้ลูกค้าติดตาม", body: "โพสต์ผลงานใหม่และโปรโมชันถึงลูกค้าที่ติดตามคุณ" },
      ],
    },
    {
      eyebrow: "บริหารร้านอย่างง่ายดาย",
      title: "ทั้งร้านในหน้าจอเดียว — บนมือถือ",
      body: "คิวของช่างแต่ละคน การแจ้งเตือนอัตโนมัติ และคิดเงินหน้าร้าน — งานประจำวันง่ายขึ้น โทรน้อยลง ผิดพลาดน้อยลง",
      features: [
        { title: "ปฏิทินลากวาง", body: "ดูรายวัน สัปดาห์ เดือน ลากเพื่อเลื่อนคิว ลูกค้าได้รับอีเมลเวลาใหม่" },
        { title: "แจ้งเตือนอัตโนมัติ", body: "อีเมลก่อน 24 ชม. 2 ชม. และ 15 นาที — ลดการลืมนัดได้มาก" },
        { title: "พนักงาน & สิทธิ์", body: "เวลาทำงาน ราคา และบัญชีของช่างแต่ละคนเพื่อดูคิวตัวเอง" },
        { title: "คิดเงิน & ใบแจ้งหนี้", body: "รับชำระหน้าร้าน ออกใบแจ้งหนี้ PDF และส่งทางอีเมล" },
        { title: "หลายสาขา", body: "ทุกสาขาในบัญชีเดียว พร้อมหน้าจองรวม" },
        { title: "ภาพรวมธุรกิจ", body: "รายได้ บริการขายดี และผลงานของช่าง ดูแล้วเข้าใจทันที" },
      ],
    },
    {
      eyebrow: "รักษาลูกค้า เพิ่มรายได้",
      title: "เปลี่ยนลูกค้าใหม่ให้เป็นลูกค้าประจำ",
      body: "บัตรสะสมแต้ม บัตรของขวัญ อีเมลโปรโมชัน และการขอรีวิวอัตโนมัติ — เครื่องมือของเชนใหญ่ ตอนนี้ทุกร้านใช้ได้",
      features: [
        { title: "บัตรสะสมแต้ม QR", body: "ไม่ต้องใช้บัตรกระดาษ สแกนทุกครั้งที่มา ครบแต้มรับส่วนลด" },
        { title: "บัตรของขวัญออนไลน์", body: "ลูกค้าซื้อและส่งทางอีเมล — เพิ่มรายได้ช่วงเทศกาล" },
        { title: "อีเมลการตลาด", body: "ส่งโปรถึงลูกค้าเก่าใน 2 นาที พร้อมปุ่มจอง" },
        { title: "รีวิว & Google", body: "ขอรีวิวหลังทุกนัด และชวนแชร์บน Google" },
        { title: "ขายสินค้าออนไลน์", body: "ผลิตภัณฑ์บำรุง สีทาเล็บ ของขวัญ — สั่งจากหน้าร้านได้เลย" },
        { title: "ตัวแทนแนะนำ", body: "คนที่แนะนำลูกค้าได้ค่าคอมมิชชัน ระบบติดตามให้" },
      ],
    },
  ],
  toolsTitle: "เครื่องมือฟรี ไม่ต้องมีบัญชี",
  toolsSubtitle: "ลองได้เลยวันนี้ — ผลลัพธ์พร้อมพิมพ์",
  tools: [
    { title: "ใบราคาหลายภาษา", body: "ใบราคาสวยระดับดีไซเนอร์ แปลอัตโนมัติ มี QR จองคิว ส่งออก PDF", cta: "สร้างใบราคา" },
    { title: "โปสเตอร์ QR จองคิว", body: "โปสเตอร์ สติกเกอร์ ป้ายตั้งโต๊ะ — ธีมคริสต์มาส แบล็กฟรายเดย์ ตรุษญวน", cta: "สร้างโปสเตอร์" },
    { title: "ตรวจร้านของคุณ", body: "ดูว่าร้านของคุณดูเป็นอย่างไรบนออนไลน์ พร้อมรายการสิ่งที่ควรทำ", cta: "ตรวจเลย" },
  ],
  stepsTitle: "เริ่มต้นใน 3 ขั้นตอน",
  steps: [
    { title: "สมัครฟรี", body: "กรอกข้อมูลร้านและยืนยันอีเมล — ร้านเปิดใช้งานทันที" },
    { title: "เพิ่มบริการ & ทีม", body: "ใส่บริการ ราคา ระยะเวลา และพนักงาน พร้อมคู่มือทีละขั้น" },
    { title: "แชร์ & รับจอง", body: "วางลิงก์จองบน Facebook, Instagram, Google แล้วเริ่มรับลูกค้า" },
  ],
  chat: {
    eyebrow: "ช่วยเหลือ 24/7",
    title: "ยังมีคำถาม? ถามเราได้เลย",
    body: "ผู้ช่วย AI ตอบทุกคำถามเรื่องการสมัครและการใช้งานทันที ทีละขั้นตอน ต้องการคุยกับคน? ทีม VaraaAi พร้อมเสมอ",
    points: ["ตอบได้แม้ตอนเที่ยงคืน", "ช่วยสมัครทีละขั้นตอน", "คุยกับเจ้าหน้าที่ได้ทุกเมื่อ"],
    open: "เปิดแชท",
    launcher: "มีคำถาม? แชทกับเรา",
    teaser: "สวัสดี! ต้องการความช่วยเหลือในการสมัครร้านไหม? ถามได้เลย",
    headerTitle: "ฝ่ายช่วยเหลือ VaraaAi",
    aiOnline: "ผู้ช่วย AI ออนไลน์",
    teamReplies: "ทีมงานจะตอบกลับเร็ว ๆ นี้",
    suggestions: [
      "สมัครร้านฟรีจริงไหม?",
      "สมัครต้องใช้อะไรบ้าง?",
      "ลูกค้าจองผ่าน Facebook ได้อย่างไร?",
      "มี 2 สาขา จัดการอย่างไร?",
    ],
  },
  faqTitle: "คำถามที่พบบ่อย",
  faq: [
    { q: "VaraaAi ฟรีจริงไหม?", a: "ฟรีจริง การสมัคร การจอง พนักงาน การแจ้งเตือน บัตรสะสมแต้ม บัตรของขวัญ และเว็บไซต์ของร้าน — ไม่ต้องใช้บัตรเครดิต ไม่จำกัดการจอง" },
    { q: "ต้องเตรียมอะไรบ้าง?", a: "แค่ชื่อร้าน ที่อยู่ เบอร์โทร และอีเมล ยืนยันอีเมลแล้วร้านเปิดใช้งานทันที เพิ่มบริการและพนักงานได้ในไม่กี่นาที" },
    { q: "ลูกค้าต้องดาวน์โหลดแอปไหม?", a: "ไม่ต้อง ลูกค้าจองผ่านเบราว์เซอร์ได้เลยโดยไม่ต้องมีบัญชี และเพิ่ม VaraaAi ไว้บนหน้าจอเหมือนแอปได้" },
    { q: "ใช้ได้กี่ภาษา?", a: "VaraaAi มี 35 ภาษา อีเมลถึงลูกค้าใช้ภาษาของประเทศที่ร้านตั้งอยู่ และคุณเลือกภาษาเริ่มต้นได้" },
    { q: "ถ้ามีหลายสาขาล่ะ?", a: "จัดการทุกสาขาในบัญชีเดียว สลับได้ในแตะเดียว และมีหน้าจองรวมทั้งเชน" },
    { q: "ติดต่อขอความช่วยเหลือได้ที่ไหน?", a: "แตะปุ่มแชทที่มุมจอหรือเปิดศูนย์ช่วยเหลือ ผู้ช่วย AI ตอบทันที และทีม VaraaAi พร้อมช่วยเมื่อคุณต้องการคุยกับคน" },
  ],
  final: {
    title: "พร้อมยกระดับร้านของคุณหรือยัง?",
    body: "สมัครฟรีใน 5 นาที ไม่มีค่าแอบแฝง ไม่จำกัด ไม่ต้องใช้บัตรเครดิต",
    cta: "ลงทะเบียนร้าน",
    chat: "แชทกับเรา",
  },
};

const STRINGS: Record<string, BusinessLandingStrings> = { vi, en, fi, pl, de, km, th };

export function businessLandingStrings(locale: string): BusinessLandingStrings {
  return STRINGS[locale] ?? STRINGS.en;
}
