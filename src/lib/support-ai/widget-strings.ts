/** Copy for the floating help widget in the salon dashboard. Vietnamese,
 * English and Finnish; other languages fall back to English. */
export interface SupportWidgetStrings {
  open: string;
  close: string;
  hi: (name: string) => string;
  howHelp: string;
  askTitle: string;
  askBody: string;
  searchPlaceholder: string;
  searchAsk: string;
  topicsTitle: string;
  topics: string[];
  latestNews: string;
  tabHome: string;
  tabMessages: string;
  tabHelp: string;
  tabNews: string;
  chatTitle: string;
  aiOnline: string;
  teamReplies: string;
  helpTitle: string;
  helpEmpty: string;
  helpCenter: string;
  newsTitle: string;
  newsEmpty: string;
  newBadge: string;
}

const STRINGS: Record<string, SupportWidgetStrings> = {
  vi: {
    open: "Mở hỗ trợ",
    close: "Đóng",
    hi: (n) => `Xin chào ${n}`,
    howHelp: "Chúng tôi có thể giúp gì cho bạn?",
    askTitle: "Đặt câu hỏi",
    askBody: "Trợ lý AI và đội ngũ VaraaAi sẵn sàng giúp bạn",
    searchPlaceholder: "Tìm trợ giúp",
    searchAsk: "Hỏi trợ lý AI",
    topicsTitle: "Câu hỏi thường gặp",
    topics: [
      "Cách thêm dịch vụ và bảng giá",
      "Cài giờ mở cửa cho salon",
      "Thêm nhân viên và phân quyền",
      "Gắn nút đặt lịch vào Facebook, Instagram",
      "Cách dùng thẻ tích điểm",
      "Bán và gửi thẻ quà tặng",
      "Gửi email khuyến mãi cho khách cũ",
      "Tính tiền tại quầy và xuất hóa đơn",
    ],
    latestNews: "Tin mới nhất",
    tabHome: "Trang chủ",
    tabMessages: "Tin nhắn",
    tabHelp: "Trợ giúp",
    tabNews: "Tin tức",
    chatTitle: "Hỗ trợ VaraaAi",
    aiOnline: "Trợ lý AI trả lời ngay",
    teamReplies: "Đội ngũ sẽ trả lời sớm nhất",
    helpTitle: "Hướng dẫn & đào tạo",
    helpEmpty: "Chưa có bài hướng dẫn nào. Bạn có thể hỏi trợ lý AI bất cứ điều gì.",
    helpCenter: "Hướng dẫn bắt đầu từng bước",
    newsTitle: "Tin tức từ VaraaAi",
    newsEmpty: "Chưa có thông báo nào.",
    newBadge: "Mới",
  },
  en: {
    open: "Open help",
    close: "Close",
    hi: (n) => `Hi ${n}`,
    howHelp: "How can we help?",
    askTitle: "Ask a question",
    askBody: "The AI assistant and the VaraaAi team can help",
    searchPlaceholder: "Search for help",
    searchAsk: "Ask the AI assistant",
    topicsTitle: "Common questions",
    topics: [
      "How to add services and prices",
      "Set my salon's opening hours",
      "Add staff and permissions",
      "Add a booking button to Facebook and Instagram",
      "How loyalty cards work",
      "Sell and send gift cards",
      "Email an offer to past customers",
      "Checkout at the counter and invoices",
    ],
    latestNews: "Latest news",
    tabHome: "Home",
    tabMessages: "Messages",
    tabHelp: "Help",
    tabNews: "News",
    chatTitle: "VaraaAi support",
    aiOnline: "The AI assistant replies instantly",
    teamReplies: "The team will reply soon",
    helpTitle: "Guides & training",
    helpEmpty: "No guides yet. You can ask the AI assistant anything.",
    helpCenter: "Step-by-step getting started guide",
    newsTitle: "News from VaraaAi",
    newsEmpty: "No announcements yet.",
    newBadge: "New",
  },
  fi: {
    open: "Avaa tuki",
    close: "Sulje",
    hi: (n) => `Hei ${n}`,
    howHelp: "Miten voimme auttaa?",
    askTitle: "Kysy kysymys",
    askBody: "AI-avustaja ja VaraaAi-tiimi auttavat",
    searchPlaceholder: "Hae ohjeita",
    searchAsk: "Kysy AI-avustajalta",
    topicsTitle: "Usein kysyttyä",
    topics: [
      "Palveluiden ja hintojen lisääminen",
      "Salongin aukioloaikojen asettaminen",
      "Työntekijät ja käyttöoikeudet",
      "Varauspainike Facebookiin ja Instagramiin",
      "Miten kanta-asiakaskortit toimivat",
      "Lahjakorttien myynti ja lähetys",
      "Tarjoussähköposti aiemmille asiakkaille",
      "Kassa ja laskut",
    ],
    latestNews: "Uusimmat uutiset",
    tabHome: "Koti",
    tabMessages: "Viestit",
    tabHelp: "Ohjeet",
    tabNews: "Uutiset",
    chatTitle: "VaraaAi-tuki",
    aiOnline: "AI-avustaja vastaa heti",
    teamReplies: "Tiimi vastaa pian",
    helpTitle: "Ohjeet & koulutus",
    helpEmpty: "Ei vielä ohjeita. Voit kysyä AI-avustajalta mitä tahansa.",
    helpCenter: "Aloitusopas vaihe vaiheelta",
    newsTitle: "Uutisia VaraaAilta",
    newsEmpty: "Ei vielä tiedotteita.",
    newBadge: "Uusi",
  },
};

export function supportWidgetStrings(locale: string): SupportWidgetStrings {
  return STRINGS[locale] ?? STRINGS.en;
}
