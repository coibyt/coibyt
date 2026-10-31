/** The staff support centre (Tiện ích → Hỗ trợ): step-by-step guides written
 * for staff, an FAQ and the page's own text. Guides and FAQ are in Vietnamese
 * and English like the owner help centre (src/lib/help/guides.ts); the page
 * text also has Finnish. Button names match the real dashboard. */

export type StaffSupportTab = "guides" | "chat" | "faq";

type L = { vi: string; en: string };
const t = (vi: string, en: string): L => ({ vi, en });
export const trs = (x: L, locale: string) => (locale === "vi" ? x.vi : x.en);

export type StaffGuideIcon = "phone" | "calendar" | "check" | "plus" | "star" | "receipt" | "qr" | "card" | "chat" | "megaphone" | "help";

export interface StaffGuide {
  id: string;
  group: "start" | "bookings" | "money" | "team";
  icon: StaffGuideIcon;
  /** Shown only to staff who can open that part of the dashboard. */
  needs?: "bookings" | "loyalty";
  title: L;
  why: L;
  steps: L[];
  tip?: L;
  /** The dashboard page it's about (no locale prefix). */
  href: string;
}

export const STAFF_GROUPS: { id: StaffGuide["group"]; title: L; body: L }[] = [
  { id: "start", title: t("Bắt đầu", "Getting started"), body: t("Sẵn sàng làm việc trên VaraaAi trong 5 phút.", "Ready to work on VaraaAi in 5 minutes.") },
  { id: "bookings", title: t("Lịch hẹn của bạn", "Your bookings"), body: t("Xem lịch, cập nhật trạng thái, chăm sóc khách.", "See your day, update bookings, look after customers.") },
  { id: "money", title: t("Doanh thu & thẻ tích điểm", "Income & loyalty cards"), body: t("Báo cáo thu nhập và tích vé cho khách.", "Report income and give customers their tickets.") },
  { id: "team", title: t("Làm việc cùng đội ngũ", "Working with the team"), body: t("Nhóm chat, thông báo và đào tạo của salon.", "Team chat, notices and the salon's training.") },
];

export const STAFF_GUIDES: StaffGuide[] = [
  {
    id: "app",
    group: "start",
    icon: "phone",
    title: t("Cài ứng dụng và bật chuông báo", "Install the app and turn on the alarm"),
    why: t("Có lịch hẹn mới là điện thoại reo ngay, không bỏ sót khách nào.", "Your phone rings the moment a booking comes in, so no customer is missed."),
    steps: [
      t("Mở varaaai.com trên điện thoại và đăng nhập bằng email, mật khẩu chủ salon đã cấp cho bạn.", "Open varaaai.com on your phone and sign in with the email and password the owner gave you."),
      t("Trên trang Tổng quan, ở thẻ “Tải ứng dụng VaraaAi”, bấm “Cài trên Android” hoặc “Cài trên iPhone” — hoặc mở menu trình duyệt (⋮) và chọn “Thêm vào màn hình chính”.", "On the Overview page, in the “Get the VaraaAi app” card, tap the Android or iPhone button — or open the browser menu (⋮) and choose “Add to Home screen”."),
      t("Khi được hỏi “Bật chuông báo lịch hẹn mới”, bấm “Bật chuông” và cho phép thông báo.", "When asked to turn on the new-booking alarm, tap to turn it on and allow notifications."),
      t("Từ nay mở VaraaAi bằng biểu tượng trên màn hình chính, như một ứng dụng bình thường.", "From now on open VaraaAi from its icon on your home screen, like any other app."),
    ],
    tip: t("Không thấy thông báo? Kiểm tra điện thoại không ở chế độ im lặng và trình duyệt được phép gửi thông báo.", "No notifications? Check your phone isn't on silent and the browser is allowed to send notifications."),
    href: "/business/dashboard",
  },
  {
    id: "calendar",
    group: "bookings",
    icon: "calendar",
    needs: "bookings",
    title: t("Xem lịch hẹn của bạn", "See your bookings"),
    why: t("Biết hôm nay mình có khách nào, mấy giờ, làm dịch vụ gì.", "Know who's coming today, when, and for what."),
    steps: [
      t("Vào menu “Lịch hẹn”. Lịch mở ở cột của riêng bạn, kèm dòng “Giờ làm việc của bạn hôm nay”.", "Open “Bookings”. The calendar opens on your own column, with your working hours for today."),
      t("Dùng thanh dưới cùng: “Ngày”, “Tuần”, “Tháng” và mũi tên để chuyển ngày; nút tròn để về hôm nay.", "Use the bar at the bottom: “Day”, “Week”, “Month” and the arrows to move between days; the round button jumps back to today."),
      t("Nếu chủ salon cho phép, bấm “Hiện tất cả” để xem lịch của cả salon. Lần sau mở lại, lịch trở về cột của bạn.", "If the owner allows it, tap “Show all” to see the whole salon. Next time it opens on your column again."),
      t("Chạm vào một lịch hẹn để xem chi tiết: khách, dịch vụ, giờ, ghi chú.", "Tap a booking to see the details: customer, service, time and notes."),
    ],
    href: "/business/dashboard/bookings",
  },
  {
    id: "status",
    group: "bookings",
    icon: "check",
    needs: "bookings",
    title: t("Hoàn thành hoặc báo khách không đến", "Mark a booking done or a no-show"),
    why: t("Giữ lịch luôn đúng — doanh thu, nhắc nhở và thống kê đều dựa vào đây.", "Keeps the calendar right — income, reminders and stats all rely on it."),
    steps: [
      t("Làm xong cho khách, chạm vào lịch hẹn và bấm “Hoàn thành”.", "When you've finished, tap the booking and choose “Complete”."),
      t("Khách không đến, bấm “Không đến” để salon theo dõi khách hay bỏ hẹn.", "If the customer didn't come, choose “No-show” so the salon can see who misses appointments."),
      t("Bạn chỉ đổi được lịch hẹn của chính mình. Lịch của đồng nghiệp chỉ xem, không sửa được.", "You can only change your own bookings. Colleagues' bookings are view-only."),
    ],
    href: "/business/dashboard/bookings",
  },
  {
    id: "new-booking",
    group: "bookings",
    icon: "plus",
    needs: "bookings",
    title: t("Tạo lịch hẹn và khoá giờ", "Add a booking or block time"),
    why: t("Khách gọi điện hay ghé ngang — đặt lịch ngay trên điện thoại của bạn.", "A customer calls or walks in — book them straight from your phone."),
    steps: [
      t("Trong cột của bạn, nhấn giữ khoảng 1 giây vào ô giờ trống (trên máy tính: bấm vào ô trống).", "In your column, press and hold an empty slot for about a second (on a computer: click it)."),
      t("Chọn dịch vụ, nhập tên và số điện thoại của khách, rồi bấm “Đặt lịch”.", "Choose the service, enter the customer's name and phone, then tap “Book”."),
      t("Cần nghỉ trưa hay việc riêng? Chọn mục khoá giờ trong danh sách dịch vụ và bấm “Khoá giờ” — khách sẽ không đặt được giờ đó.", "Need a break? Pick a block-time option in the service list and tap “Block time” — customers can't book that slot."),
    ],
    href: "/business/dashboard/bookings",
  },
  {
    id: "rate",
    group: "bookings",
    icon: "star",
    needs: "bookings",
    title: t("Đánh giá khách hàng", "Rate a customer"),
    why: t("Giúp cả salon biết khách nào dễ chịu, khách nào cần lưu ý.", "Helps the whole salon know which customers are a joy and which need care."),
    steps: [
      t("Sau giờ hẹn, chạm vào lịch hẹn và bấm “Đánh giá khách hàng này”.", "After the appointment, tap the booking and choose “Rate this customer”."),
      t("Chọn số sao và ghi chú ngắn nếu cần, rồi gửi.", "Pick the stars, add a short note if you like, and send."),
      t("Đánh giá chờ chủ salon duyệt — duyệt xong khách mới nhận được email báo số sao.", "The rating waits for the owner — the customer is emailed only once it's approved."),
    ],
    href: "/business/dashboard/bookings",
  },
  {
    id: "income",
    group: "money",
    icon: "receipt",
    title: t("Báo cáo thu nhập sau mỗi khách", "Report your income after each customer"),
    why: t("Chủ salon đối chiếu và duyệt, cuối tháng bạn có bảng thu nhập và tiền tip rõ ràng.", "The owner checks and approves it, and at month's end your income and tips are clear."),
    steps: [
      t("Làm xong cho khách, mở lịch hẹn và bấm “Báo cáo thu nhập” — hoặc vào “Doanh thu của tôi”, mục “Chưa báo cáo”, bấm “Báo cáo”.", "When you're done, open the booking and tap “Report income” — or go to “My income” and tap “Report” in the “Not reported” list."),
      t("Nhập số tiền khách trả theo từng cách: tiền mặt, ngân hàng, thẻ quà tặng. Bấm “Điền đủ” nếu khách trả đúng số cần thu.", "Enter what the customer paid by each method: cash, bank, gift card. Tap “Fill in” if they paid exactly the amount due."),
      t("Ghi tiền tip của bạn (không tính vào doanh thu salon) và tải ảnh biên lai máy quẹt thẻ nếu có.", "Add your tip (not counted as salon income) and upload the card-terminal receipt if there is one."),
      t("Bấm “Gửi báo cáo”. Dấu tích xanh nghĩa là chủ salon đã duyệt.", "Tap “Send report”. A green tick means the owner has approved it."),
      t("Nếu bị “Chưa duyệt”, đọc ghi chú của chủ salon, sửa lại và bấm “Sửa và gửi lại”.", "If it comes back “Not approved”, read the owner's note, fix it and tap “Fix and send again”."),
    ],
    tip: t("Lịch hẹn quá 24 giờ chưa báo cáo, ứng dụng sẽ reo nhắc — báo cáo ngay sau mỗi khách là nhẹ nhàng nhất.", "Bookings left unreported for 24 hours set off a reminder — reporting right after each customer is easiest."),
    href: "/business/dashboard/income",
  },
  {
    id: "loyalty-scan",
    group: "money",
    icon: "qr",
    needs: "loyalty",
    title: t("Quét thẻ tích điểm cho khách", "Scan a customer's loyalty card"),
    why: t("Mỗi lần khách đến được 1 vé — đủ vé được giảm giá, khách sẽ quay lại.", "Every visit earns a ticket — enough tickets earn a discount, and customers come back."),
    steps: [
      t("Khách mở thẻ VIP trên điện thoại (trong email “Thẻ thành viên VIP”) và đưa mã QR cho bạn.", "The customer opens their VIP card on their phone (from the card email) and shows you the QR code."),
      t("Mở camera điện thoại, hướng vào mã QR — trang thẻ của khách hiện ra. Bấm “Cộng 1 vé”.", "Point your phone camera at the QR code — the customer's card opens. Tap “Add 1 ticket”."),
      t("Hoặc vào “Thẻ tích điểm”, phần “Quét thẻ khi khách đến”, nhập mã thẻ của khách.", "Or go to “Loyalty cards”, “Scan a card when a customer visits”, and type in the card code."),
      t("Thẻ báo “Đủ vé”: khách được giảm giá lần này — áp dụng ưu đãi khi thanh toán.", "When the card says the reward is ready, the customer gets the discount this time — apply it at checkout."),
    ],
    tip: t("Mỗi lượt hẹn mới chỉ được cộng 1 vé, nên quét trùng cũng không sao.", "Each new visit adds only one ticket, so scanning twice does no harm."),
    href: "/business/dashboard/loyalty",
  },
  {
    id: "loyalty-issue",
    group: "money",
    icon: "card",
    needs: "loyalty",
    title: t("Cấp thẻ tích điểm cho khách mới", "Give a new customer a loyalty card"),
    why: t("Khách có thẻ là có lý do quay lại — và còn giới thiệu bạn bè.", "A card gives customers a reason to come back — and to bring friends."),
    steps: [
      t("Vào “Thẻ tích điểm”, tìm phần “Kích hoạt thẻ cho khách”.", "Go to “Loyalty cards” and find “Activate a card for a customer”."),
      t("Nhập họ tên và email của khách, rồi bấm “Kích hoạt và gửi QR qua email”.", "Enter the customer's name and email, then tap “Activate and email the QR”."),
      t("Khách nhận ngay email thẻ VIP có mã QR. Nhắc khách: gửi link mời trong thẻ cho bạn bè, bạn đến làm là khách được thêm 2 vé.", "The customer gets their VIP card with a QR code right away. Tell them: share the invite link on the card — when a friend visits, they get 2 extra tickets."),
    ],
    tip: t("Lúc đẹp nhất để mời khách lấy thẻ là ngay khi vừa làm xong và khách đang vui.", "The best moment to offer a card is right after the service, while the customer is happy."),
    href: "/business/dashboard/loyalty",
  },
  {
    id: "team-chat",
    group: "team",
    icon: "chat",
    title: t("Nhóm chat với đồng nghiệp", "Chat with your colleagues"),
    why: t("Đổi ca, hỏi việc, gửi ảnh mẫu — ngay trong VaraaAi, không cần ứng dụng khác.", "Swap shifts, ask questions, share photos — right in VaraaAi, no other app needed."),
    steps: [
      t("Vào “Tiện ích” → “Nhóm chat”. Nhóm “Cả salon” có sẵn mọi người.", "Go to “Team hub” → “Team chat”. The “Whole salon” chat already has everyone."),
      t("Bấm “Trò chuyện mới” để “Nhắn riêng” cho một người hoặc “Tạo nhóm”.", "Tap “New chat” to message one person privately or start a group."),
      t("Bấm dấu “+” để gửi ảnh, video hoặc tài liệu; biểu tượng mặt cười để chèn emoji.", "Tap “+” to send photos, videos or documents, and the smiley for emoji."),
      t("Nhấn giữ một tin nhắn để thả cảm xúc, trả lời, sửa hoặc thu hồi.", "Press and hold a message to react, reply, edit or unsend."),
    ],
    href: "/business/dashboard/utilities/chat",
  },
  {
    id: "notices-training",
    group: "team",
    icon: "megaphone",
    title: t("Thông báo và đào tạo của salon", "The salon's notices and training"),
    why: t("Nắm lịch làm việc, nội quy mới và học đúng quy trình chuẩn của salon.", "Keep up with rotas and house rules, and learn the salon's standard procedures."),
    steps: [
      t("“Tiện ích” → “Thông báo”: đọc thông báo mới. Thông báo cần xác nhận thì bấm “Tôi đã đọc và nắm rõ”.", "“Team hub” → “Notices”: read what's new. If a notice asks you to confirm, tap “I've read and understood”."),
      t("“Tiện ích” → “Đào tạo”: xem bài học, video hướng dẫn và tài liệu. Ưu tiên các bài có nhãn “Bắt buộc”.", "“Team hub” → “Training”: go through lessons, videos and documents. Start with the ones marked “Required”."),
      t("Học xong bấm “Đánh dấu đã hoàn thành” — chủ salon thấy được tiến độ của bạn.", "When you finish, tap “Mark as completed” — the owner can see your progress."),
    ],
    href: "/business/dashboard/utilities/announcements",
  },
];

export interface StaffFaq {
  q: L;
  a: L;
  href: string;
}

export const STAFF_FAQ: StaffFaq[] = [
  {
    q: t("Tôi quên mật khẩu thì làm sao?", "I forgot my password — what now?"),
    a: t("Trên trang đăng nhập, bấm “Quên mật khẩu” và làm theo email gửi đến. Nếu không nhận được email, nhờ chủ salon kiểm tra lại email đăng nhập của bạn trong mục Nhân viên.", "On the sign-in page tap “Forgot password” and follow the email. If it doesn't arrive, ask the owner to check your login email under Staff."),
    href: "/business/dashboard",
  },
  {
    q: t("Vì sao tôi không thấy một số mục trên menu?", "Why can't I see some menu items?"),
    a: t("Chủ salon chọn mục nào nhân viên được xem (lịch hẹn, khách hàng, dịch vụ…). Cần thêm quyền nào, hãy nhắn cho chủ salon.", "The owner chooses what each staff member can see (bookings, customers, services…). If you need more, message the owner."),
    href: "/business/dashboard",
  },
  {
    q: t("Vì sao tôi không bấm “Hoàn thành” được lịch của đồng nghiệp?", "Why can't I complete a colleague's booking?"),
    a: t("Mỗi người chỉ cập nhật lịch hẹn của chính mình, để không ai đổi nhầm lịch người khác. Lịch của đồng nghiệp bạn chỉ xem được.", "Everyone updates only their own bookings, so nobody changes someone else's by mistake. Colleagues' bookings are view-only."),
    href: "/business/dashboard/bookings",
  },
  {
    q: t("Vì sao tôi không thấy số điện thoại của khách?", "Why can't I see a customer's phone number?"),
    a: t("Số điện thoại và email của khách chỉ hiện khi chủ salon bật quyền đó cho bạn, và chỉ ở lịch hẹn của chính bạn.", "Customer phone numbers and emails show only if the owner allows it, and only on your own bookings."),
    href: "/business/dashboard/bookings",
  },
  {
    q: t("Lịch “Chưa báo cáo” là gì?", "What is the “Not reported” list?"),
    a: t("Đó là những lịch hẹn đã xong hơn 24 giờ mà bạn chưa báo cáo thu nhập. Bấm “Báo cáo” bên cạnh từng khách để báo cáo — danh sách sẽ tự trống.", "Bookings that ended over 24 hours ago without an income report. Tap “Report” next to each one and the list empties itself."),
    href: "/business/dashboard/income",
  },
  {
    q: t("Quét thẻ tích điểm báo “Chưa cộng vé” là sao?", "Scanning says the ticket wasn't added — why?"),
    a: t("Mỗi lượt hẹn mới chỉ được 1 vé. Nếu khách chưa có lịch hẹn mới trên lịch kể từ lần quét trước, hoặc thẻ đã đủ vé và chưa dùng ưu đãi, hệ thống sẽ chưa cộng vé.", "Each new visit gives one ticket. If the customer has no new booking since the last scan, or their card is full and the reward hasn't been used yet, no ticket is added."),
    href: "/business/dashboard/loyalty",
  },
  {
    q: t("Tôi đổi giờ làm hoặc xin nghỉ ở đâu?", "Where do I change my hours or ask for time off?"),
    a: t("Giờ làm việc do chủ salon cài đặt. Hãy nhắn riêng cho chủ salon trong “Nhóm chat”; nghỉ ngắn trong ngày bạn có thể tự khoá giờ trên lịch.", "Your working hours are set by the owner. Message the owner in “Team chat”; for a short break you can block time on the calendar yourself."),
    href: "/business/dashboard/utilities/chat",
  },
  {
    q: t("Tôi làm ở nhiều chi nhánh thì sao?", "What if I work at several branches?"),
    a: t("Bạn dùng cùng một tài khoản. Chọn chi nhánh ở ô chọn chi nhánh phía trên bảng điều khiển; giờ có khách ở chi nhánh này sẽ tự khoá ở chi nhánh kia.", "You use the same login. Pick the branch in the branch switcher at the top of the dashboard; a booking at one branch locks that time at the others."),
    href: "/business/dashboard",
  },
];

const PAGE = {
  vi: {
    eyebrow: "Hỗ trợ nhân viên",
    title: "Chúng tôi luôn ở đây để giúp bạn",
    sub: "Hướng dẫn từng bước cho công việc hằng ngày, trợ lý AI trả lời 24/7, và đội ngũ VaraaAi sẵn sàng hỗ trợ.",
    searchPh: "Bạn cần giúp gì? Ví dụ: báo cáo thu nhập, quét thẻ…",
    noResults: "Chưa có hướng dẫn phù hợp — hãy hỏi trợ lý ở tab Trò chuyện.",
    askChat: "Hỏi trợ lý",
    tabs: { guides: "Hướng dẫn", chat: "Trò chuyện", faq: "Câu hỏi thường gặp" } as Record<StaffSupportTab, string>,
    cardChat: ["Trò chuyện với VaraaAi", "AI trả lời ngay, đội ngũ hỗ trợ trong giờ làm việc"],
    cardGuides: ["Hướng dẫn cho nhân viên", "{n} bài hướng dẫn từng bước"],
    cardOwner: ["Hỏi chủ salon", "Lịch làm, quyền truy cập, việc trong salon"],
    cardTraining: ["Đào tạo của salon", "Quy trình chuẩn và video của salon"],
    newBadge: "{n} mới",
    steps: "{n} bước",
    openPage: "Mở trang",
    tip: "Mẹo",
    chatIntro: "Hỏi bất cứ điều gì về cách dùng VaraaAi. Trợ lý AI trả lời ngay; cần người thật, bấm “Gặp nhân viên hỗ trợ”.",
    chatSide: [
      ["Trả lời ngay 24/7", "Trợ lý AI biết cách dùng mọi tính năng bạn đang dùng."],
      ["Gặp người thật", "Bấm “Gặp nhân viên hỗ trợ” để đội ngũ VaraaAi trả lời bạn."],
      ["Việc trong salon?", "Lịch làm, lương, ca kíp — hãy nhắn cho chủ salon."],
    ] as [string, string][],
    messageOwner: "Nhắn chủ salon",
    faqMore: "Vẫn chưa có câu trả lời?",
    faqAsk: "Nhắn cho chúng tôi",
    suggestions: ["Làm sao báo cáo thu nhập sau khi làm xong cho khách?", "Làm sao quét thẻ tích điểm cho khách?", "Làm sao tạo lịch hẹn cho khách gọi điện?"],
  },
  en: {
    eyebrow: "Staff support",
    title: "We're here to help",
    sub: "Step-by-step guides for your everyday work, an AI assistant 24/7, and the VaraaAi team ready to help.",
    searchPh: "What do you need help with? E.g. report income, scan a card…",
    noResults: "No guide matches — ask the assistant in the Chat tab.",
    askChat: "Ask the assistant",
    tabs: { guides: "Guides", chat: "Chat", faq: "FAQ" } as Record<StaffSupportTab, string>,
    cardChat: ["Chat with VaraaAi", "Instant AI answers, our team during working hours"],
    cardGuides: ["Guides for staff", "{n} step-by-step guides"],
    cardOwner: ["Ask the owner", "Rota, access and anything in the salon"],
    cardTraining: ["Salon training", "Your salon's procedures and videos"],
    newBadge: "{n} new",
    steps: "{n} steps",
    openPage: "Open page",
    tip: "Tip",
    chatIntro: "Ask anything about using VaraaAi. The AI assistant answers right away; for a person, tap “Talk to a person”.",
    chatSide: [
      ["Instant answers 24/7", "The AI assistant knows every feature you use."],
      ["Talk to a person", "Tap “Talk to a person” and the VaraaAi team will reply."],
      ["About the salon?", "Rota, pay, shifts — message the owner."],
    ] as [string, string][],
    messageOwner: "Message the owner",
    faqMore: "Still need an answer?",
    faqAsk: "Message us",
    suggestions: ["How do I report income after a customer?", "How do I scan a customer's loyalty card?", "How do I book a customer who phones in?"],
  },
  fi: {
    eyebrow: "Henkilökunnan tuki",
    title: "Autamme mielellämme",
    sub: "Ohjeet arjen töihin, tekoälyavustaja 24/7 ja VaraaAi-tiimi apunasi.",
    searchPh: "Missä tarvitset apua? Esim. tulojen raportointi, kortin skannaus…",
    noResults: "Sopivaa ohjetta ei löytynyt — kysy avustajalta Chat-välilehdellä.",
    askChat: "Kysy avustajalta",
    tabs: { guides: "Ohjeet", chat: "Chat", faq: "UKK" } as Record<StaffSupportTab, string>,
    cardChat: ["Chat VaraaAin kanssa", "Tekoäly vastaa heti, tiimi työaikana"],
    cardGuides: ["Ohjeet henkilökunnalle", "{n} vaiheittaista ohjetta"],
    cardOwner: ["Kysy omistajalta", "Työvuorot, oikeudet ja salongin asiat"],
    cardTraining: ["Salongin koulutus", "Salongin työohjeet ja videot"],
    newBadge: "{n} uutta",
    steps: "{n} vaihetta",
    openPage: "Avaa sivu",
    tip: "Vinkki",
    chatIntro: "Kysy mitä tahansa VaraaAin käytöstä. Tekoäly vastaa heti; ihmisen saat napauttamalla ”Puhu ihmisen kanssa”.",
    chatSide: [
      ["Vastaukset heti 24/7", "Tekoälyavustaja tuntee kaikki käyttämäsi toiminnot."],
      ["Puhu ihmisen kanssa", "VaraaAi-tiimi vastaa sinulle."],
      ["Salongin asiat?", "Työvuorot, palkka — viestitä omistajalle."],
    ] as [string, string][],
    messageOwner: "Viesti omistajalle",
    faqMore: "Etkö löytänyt vastausta?",
    faqAsk: "Kirjoita meille",
    suggestions: ["Miten raportoin tulot asiakkaan jälkeen?", "Miten skannaan asiakkaan kanta-asiakaskortin?", "Miten varaan ajan puhelimitse soittavalle?"],
  },
};

export function staffSupportStrings(locale: string) {
  return locale === "vi" ? PAGE.vi : locale === "fi" ? PAGE.fi : PAGE.en;
}
