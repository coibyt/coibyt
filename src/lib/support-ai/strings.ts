/** Copy for the public support centre (/support) and the support chat, in
 * Vietnamese, English and Finnish; other languages fall back to English. */
export interface SupportCenterStrings {
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  title: string;
  intro: string;
  aiOnBadge: string;
  aiOffBadge: string;
  guestTitle: string;
  guestIntro: string;
  name: string;
  email: string;
  start: string;
  or: string;
  signIn: string;
  invalid: string;
  placeholder: string;
  send: string;
  empty: string;
  error: string;
  teamName: string;
  aiName: string;
  aiTyping: string;
  talkToHuman: string;
  suggestions: string[];
  points: string[];
}

const STRINGS: Record<string, SupportCenterStrings> = {
  vi: {
    metaTitle: "Trung tâm hỗ trợ VaraaAi — Hỏi đáp & hướng dẫn sử dụng",
    metaDescription: "Hỏi bất cứ điều gì về VaraaAi: cách tạo salon, đặt lịch, thẻ tích điểm, thẻ quà tặng, giờ mở cửa… và nhận câu trả lời ngay kèm đường dẫn đến đúng chỗ.",
    eyebrow: "Trung tâm hỗ trợ",
    title: "Chúng tôi có thể giúp gì cho bạn?",
    intro: "Hỏi bất cứ điều gì về VaraaAi — cách dùng từng chức năng, cài đặt salon hay đặt lịch. Bạn sẽ nhận câu trả lời chi tiết kèm đường dẫn đến đúng nơi cần làm.",
    aiOnBadge: "Trợ lý AI trả lời ngay 24/7",
    aiOffBadge: "Đội ngũ VaraaAi sẽ trả lời sớm nhất có thể",
    guestTitle: "Bắt đầu trò chuyện",
    guestIntro: "Cho chúng tôi biết tên và email để có thể trả lời bạn cả qua email.",
    name: "Tên của bạn",
    email: "Email",
    start: "Bắt đầu chat",
    or: "hoặc",
    signIn: "Đăng nhập để chat bằng tài khoản",
    invalid: "Vui lòng nhập tên và email hợp lệ.",
    placeholder: "Nhập câu hỏi của bạn...",
    send: "Gửi",
    empty: "Chọn một câu hỏi gợi ý bên dưới hoặc nhập câu hỏi của bạn.",
    error: "Không gửi được, vui lòng thử lại.",
    teamName: "Đội ngũ VaraaAi",
    aiName: "Trợ lý AI VaraaAi",
    aiTyping: "Trợ lý AI đang trả lời…",
    talkToHuman: "Gặp nhân viên hỗ trợ",
    suggestions: [
      "Làm sao để tạo salon trên VaraaAi?",
      "Cách dùng thẻ tích điểm cho khách?",
      "Cài giờ mở cửa ở đâu?",
      "Gắn nút đặt lịch vào Facebook thế nào?",
      "Làm sao để bán thẻ quà tặng?",
      "Tôi muốn hủy lịch hẹn đã đặt",
    ],
    points: ["Hướng dẫn từng bước", "Kèm đường dẫn đến đúng chỗ", "Gặp nhân viên bất cứ lúc nào"],
  },
  en: {
    metaTitle: "VaraaAi Help Centre — questions & how-to guides",
    metaDescription: "Ask anything about VaraaAi: setting up your salon, bookings, loyalty cards, gift cards, opening hours… and get an instant answer with a link to the right place.",
    eyebrow: "Help centre",
    title: "How can we help you?",
    intro: "Ask anything about VaraaAi — how each feature works, setting up your salon or booking an appointment. You'll get a detailed answer with a link to exactly where to do it.",
    aiOnBadge: "AI assistant answers instantly, 24/7",
    aiOffBadge: "The VaraaAi team will reply as soon as possible",
    guestTitle: "Start a conversation",
    guestIntro: "Tell us your name and email so we can also answer you by email.",
    name: "Your name",
    email: "Email",
    start: "Start chat",
    or: "or",
    signIn: "Sign in to chat with your account",
    invalid: "Please enter a valid name and email.",
    placeholder: "Type your question...",
    send: "Send",
    empty: "Pick a suggested question below or type your own.",
    error: "Couldn't send — please try again.",
    teamName: "VaraaAi team",
    aiName: "VaraaAi AI assistant",
    aiTyping: "The AI assistant is typing…",
    talkToHuman: "Talk to a person",
    suggestions: [
      "How do I add my salon to VaraaAi?",
      "How do loyalty cards work?",
      "Where do I set opening hours?",
      "How do I add a booking button to Facebook?",
      "How can I sell gift cards?",
      "I want to cancel my booking",
    ],
    points: ["Step-by-step answers", "Links to the right place", "Reach a person any time"],
  },
  fi: {
    metaTitle: "VaraaAi-tukikeskus — kysymykset ja ohjeet",
    metaDescription: "Kysy mitä tahansa VaraaAista: salongin perustaminen, varaukset, kanta-asiakaskortit, lahjakortit, aukioloajat… ja saat vastauksen heti linkin kera.",
    eyebrow: "Tukikeskus",
    title: "Miten voimme auttaa?",
    intro: "Kysy mitä tahansa VaraaAista — miten toiminnot toimivat, salongin asetukset tai ajanvaraus. Saat tarkan vastauksen ja linkin suoraan oikeaan paikkaan.",
    aiOnBadge: "AI-avustaja vastaa heti, 24/7",
    aiOffBadge: "VaraaAi-tiimi vastaa mahdollisimman pian",
    guestTitle: "Aloita keskustelu",
    guestIntro: "Kerro nimesi ja sähköpostisi, jotta voimme vastata myös sähköpostilla.",
    name: "Nimesi",
    email: "Sähköposti",
    start: "Aloita chat",
    or: "tai",
    signIn: "Kirjaudu sisään ja keskustele tililläsi",
    invalid: "Anna kelvollinen nimi ja sähköposti.",
    placeholder: "Kirjoita kysymyksesi...",
    send: "Lähetä",
    empty: "Valitse ehdotettu kysymys alta tai kirjoita oma.",
    error: "Lähetys epäonnistui — yritä uudelleen.",
    teamName: "VaraaAi-tiimi",
    aiName: "VaraaAi AI-avustaja",
    aiTyping: "AI-avustaja kirjoittaa…",
    talkToHuman: "Puhu ihmisen kanssa",
    suggestions: [
      "Miten lisään salonkini VaraaAihin?",
      "Miten kanta-asiakaskortit toimivat?",
      "Mistä asetan aukioloajat?",
      "Miten lisään varauspainikkeen Facebookiin?",
      "Miten myyn lahjakortteja?",
      "Haluan perua varaukseni",
    ],
    points: ["Vaiheittaiset ohjeet", "Linkit oikeaan paikkaan", "Ihminen tavoitettavissa aina"],
  },
};

export function supportCenterStrings(locale: string): SupportCenterStrings {
  return STRINGS[locale] ?? STRINGS.en;
}
