/** The staff support centre (Tiện ích → Hỗ trợ): step-by-step guides written
 * for staff, an FAQ and the page's own text. Guides and FAQ are in Vietnamese
 * and English like the owner help centre (src/lib/help/guides.ts); the page
 * text also has Finnish. Button names match the real dashboard. */

export type StaffSupportTab = "guides" | "chat" | "faq";

type L = { vi: string; en: string };
const t = (vi: string, en: string): L => ({ vi, en });
export const trs = (x: L, locale: string) => (locale === "vi" ? x.vi : x.en);

export type StaffGuideIcon = "phone" | "calendar" | "check" | "plus" | "star" | "receipt" | "qr" | "card" | "chat" | "megaphone" | "help";

/** A picture of the screen for a step (src/components/team/guide-art.tsx). */
export type GuideArt =
  | "signin"
  | "install-android"
  | "install-ios"
  | "alarm"
  | "calendar-own"
  | "bottom-bar"
  | "show-all"
  | "booking-detail"
  | "overdue-banner"
  | "status-complete"
  | "status-noshow"
  | "view-only"
  | "long-press"
  | "new-booking"
  | "block-time"
  | "rating"
  | "rating-wait"
  | "income-button"
  | "income-form"
  | "income-tip"
  | "income-status"
  | "income-rejected"
  | "qr-card"
  | "scan-add"
  | "code-input"
  | "reward"
  | "activate-form"
  | "card-email"
  | "chat-list"
  | "new-chat"
  | "composer"
  | "message-menu"
  | "notice"
  | "training"
  | "lesson-done";

export interface StaffGuideStep {
  text: L;
  art: GuideArt;
}

export interface StaffGuide {
  id: string;
  group: "start" | "bookings" | "money" | "team";
  icon: StaffGuideIcon;
  /** Shown only to staff who can open that part of the dashboard. */
  needs?: "bookings" | "loyalty";
  title: L;
  why: L;
  /** About how long it takes, in minutes. */
  minutes: number;
  steps: StaffGuideStep[];
  tip?: L;
  /** The dashboard page it's about (no locale prefix). */
  href: string;
}

const s = (vi: string, en: string, art: GuideArt): StaffGuideStep => ({ text: t(vi, en), art });

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
    minutes: 3,
    title: t("Cài ứng dụng và bật chuông báo", "Install the app and turn on the alarm"),
    why: t("Có lịch hẹn mới là điện thoại reo ngay, không bỏ sót khách nào.", "Your phone rings the moment a booking comes in, so no customer is missed."),
    steps: [
      s(
        "Đăng nhập varaaai.com bằng email và mật khẩu chủ salon cấp cho bạn — có trong email “Chào mừng” VaraaAi gửi khi bạn được tạo tài khoản.",
        "Sign in at varaaai.com with the email and password the owner gave you — they're in the welcome email VaraaAi sent when your login was created.",
        "signin",
      ),
      s(
        "Android: mở varaaai.com/app bằng Chrome, bấm “Cài đặt ứng dụng”, rồi chọn “Cài đặt” trong hộp thoại.",
        "Android: open varaaai.com/app in Chrome, tap “Install app”, then choose “Install” in the dialog.",
        "install-android",
      ),
      s(
        "iPhone: mở varaaai.com/app bằng Safari, nhấn nút Chia sẻ (hình vuông có mũi tên lên), chọn “Thêm vào Màn hình chính” rồi bấm “Thêm”.",
        "iPhone: open varaaai.com/app in Safari, tap Share (the square with an arrow), choose “Add to Home Screen”, then “Add”.",
        "install-ios",
      ),
      s(
        "Mở VaraaAi từ biểu tượng trên màn hình chính. Khi hiện “Bật chuông báo lịch hẹn mới”, bấm “Bật chuông” và cho phép thông báo.",
        "Open VaraaAi from its home-screen icon. When “Turn on the new-booking alarm” appears, tap to turn it on and allow notifications.",
        "alarm",
      ),
    ],
    tip: t(
      "Không nghe chuông? Kiểm tra điện thoại không ở chế độ im lặng, âm lượng chuông đủ lớn và ứng dụng được phép gửi thông báo.",
      "No ring? Check your phone isn't on silent, the ring volume is up and the app is allowed to send notifications.",
    ),
    href: "/business/dashboard",
  },
  {
    id: "calendar",
    group: "bookings",
    icon: "calendar",
    needs: "bookings",
    minutes: 2,
    title: t("Xem lịch hẹn của bạn", "See your bookings"),
    why: t("Biết hôm nay mình có khách nào, mấy giờ, làm dịch vụ gì.", "Know who's coming today, when, and for what."),
    steps: [
      s(
        "Vào menu “Lịch hẹn”. Lịch mở ở cột của riêng bạn, kèm dòng “Giờ làm việc của bạn hôm nay”. Phần gạch chéo là ngoài giờ làm.",
        "Open “Bookings”. The calendar opens on your own column, with your working hours for today. Striped areas are outside your hours.",
        "calendar-own",
      ),
      s(
        "Thanh dưới cùng: mũi tên để sang ngày trước/sau, bấm vào ngày để chọn ngày bất kỳ, nút tròn để về hôm nay, và “Ngày”, “Tuần”, “Tháng” để đổi cách xem.",
        "The bottom bar: arrows move a day back or forward, tap the date to pick any day, the round button jumps to today, and “Day”, “Week”, “Month” change the view.",
        "bottom-bar",
      ),
      s(
        "Nếu chủ salon cho phép, bấm “Hiện tất cả” để xem lịch cả salon, hoặc chạm tên từng đồng nghiệp. Lần sau mở lại, lịch trở về cột của bạn.",
        "If the owner allows it, tap “Show all” to see the whole salon, or tap a colleague's name. Next time it opens on your column again.",
        "show-all",
      ),
      s(
        "Chạm vào một lịch hẹn để xem chi tiết: khách, dịch vụ, giờ, giá và ghi chú của khách.",
        "Tap a booking for the details: customer, service, time, price and the customer's note.",
        "booking-detail",
      ),
      s(
        "Thấy thanh đỏ trên đầu lịch: bạn có lịch hẹn quá 24 giờ chưa báo cáo thu nhập. Bấm vào ngày trong thanh đỏ để mở đúng ngày đó và báo cáo.",
        "A red bar at the top means bookings over 24 hours old still need an income report. Tap a day in the bar to open it and report them.",
        "overdue-banner",
      ),
    ],
    tip: t(
      "Làm ở nhiều chi nhánh? Giờ bạn có khách ở chi nhánh khác hiện thành ô khoá màu tím “Có khách ở …” — khách không đặt được giờ đó.",
      "Work at several branches? Time you're booked at another branch shows as a purple locked block “Customer at …” — nobody can book it.",
    ),
    href: "/business/dashboard/bookings",
  },
  {
    id: "status",
    group: "bookings",
    icon: "check",
    needs: "bookings",
    minutes: 1,
    title: t("Hoàn thành hoặc báo khách không đến", "Mark a booking done or a no-show"),
    why: t("Giữ lịch luôn đúng — doanh thu, thẻ tích điểm và thống kê đều dựa vào đây.", "Keeps the calendar right — income, loyalty cards and stats all rely on it."),
    steps: [
      s("Làm xong cho khách, chạm vào lịch hẹn và bấm “Hoàn thành”.", "When you've finished, tap the booking and choose “Complete”.", "status-complete"),
      s(
        "Khách không đến: bấm “Không đến” để salon theo dõi khách hay bỏ hẹn. Khách huỷ: bấm “Huỷ” và chọn lý do.",
        "The customer didn't come: choose “No-show” so the salon sees who misses appointments. Cancelled: choose “Cancel” and pick the reason.",
        "status-noshow",
      ),
      s(
        "Bạn chỉ đổi được lịch hẹn của chính mình. Lịch của đồng nghiệp bạn chỉ xem, không có các nút này.",
        "You can only change your own bookings. Colleagues' bookings are view-only, without these buttons.",
        "view-only",
      ),
    ],
    href: "/business/dashboard/bookings",
  },
  {
    id: "new-booking",
    group: "bookings",
    icon: "plus",
    needs: "bookings",
    minutes: 2,
    title: t("Tạo lịch hẹn và khoá giờ", "Add a booking or block time"),
    why: t("Khách gọi điện hay ghé ngang — đặt lịch ngay trên điện thoại của bạn.", "A customer calls or walks in — book them straight from your phone."),
    steps: [
      s(
        "Trong cột của bạn, nhấn giữ khoảng 1 giây vào ô giờ trống (trên máy tính: bấm vào ô trống).",
        "In your column, press and hold an empty slot for about a second (on a computer: click it).",
        "long-press",
      ),
      s(
        "Chọn dịch vụ, nhập tên và số điện thoại của khách, kiểm tra giờ bắt đầu, rồi bấm “Đặt lịch”.",
        "Choose the service, enter the customer's name and phone, check the start time, then tap “Book”.",
        "new-booking",
      ),
      s(
        "Cần nghỉ trưa hay việc riêng? Trong ô dịch vụ, chọn ở nhóm “Thời gian cá nhân” (Nghỉ trưa, Việc riêng…) rồi bấm “Khoá giờ” — khách không đặt được giờ đó.",
        "Need a break? In the service box, pick from “Personal time” (Lunch, Personal…) and tap “Block time” — customers can't book that slot.",
        "block-time",
      ),
    ],
    tip: t("Chạm vào ô khoá giờ của bạn để sửa giờ hoặc xoá khi không cần nữa.", "Tap your blocked time to change it or remove it when you no longer need it."),
    href: "/business/dashboard/bookings",
  },
  {
    id: "rate",
    group: "bookings",
    icon: "star",
    needs: "bookings",
    minutes: 1,
    title: t("Đánh giá khách hàng", "Rate a customer"),
    why: t("Giúp cả salon biết khách nào dễ chịu, khách nào cần lưu ý.", "Helps the whole salon know which customers are a joy and which need care."),
    steps: [
      s(
        "Sau giờ hẹn, chạm vào lịch hẹn và kéo xuống mục “Đánh giá khách hàng này”.",
        "After the appointment, tap the booking and scroll to “Rate this customer”.",
        "rating",
      ),
      s(
        "Chạm vào số sao (1 đến 5) — đánh giá được gửi ngay, không cần bấm thêm.",
        "Tap the stars (1 to 5) — the rating is sent straight away, nothing else to tap.",
        "rating",
      ),
      s(
        "Đánh giá hiện “Chờ chủ salon duyệt”. Chủ salon duyệt xong, khách mới nhận được email báo số sao.",
        "It shows “Waiting for the owner's approval”. The customer is emailed the stars only once the owner approves.",
        "rating-wait",
      ),
    ],
    href: "/business/dashboard/bookings",
  },
  {
    id: "income",
    group: "money",
    icon: "receipt",
    minutes: 2,
    title: t("Báo cáo thu nhập sau mỗi khách", "Report your income after each customer"),
    why: t("Chủ salon đối chiếu và duyệt, cuối tháng bạn có bảng thu nhập và tiền tip rõ ràng.", "The owner checks and approves it, and at month's end your income and tips are clear."),
    steps: [
      s(
        "Làm xong cho khách, mở lịch hẹn và bấm “Báo cáo thu nhập” — hoặc vào “Doanh thu của tôi”, mục “Chưa báo cáo”, bấm “Báo cáo”.",
        "When you're done, open the booking and tap “Report income” — or go to “My income” and tap “Report” in the “Not reported” list.",
        "income-button",
      ),
      s(
        "Nhập số tiền khách trả theo từng cách: tiền mặt, ngân hàng, thẻ quà tặng. Bấm “Điền đủ” nếu khách trả đúng số cần thu.",
        "Enter what the customer paid by each method: cash, bank, gift card. Tap “Fill in” if they paid exactly the amount due.",
        "income-form",
      ),
      s(
        "Ghi tiền tip của bạn (không tính vào doanh thu salon) và tải ảnh biên lai máy quẹt thẻ nếu có.",
        "Add your tip (not counted as salon income) and upload the card-terminal receipt if there is one.",
        "income-tip",
      ),
      s(
        "Bấm “Gửi báo cáo”. Báo cáo chờ chủ salon duyệt; dấu tích xanh nghĩa là đã được duyệt.",
        "Tap “Send report”. It waits for the owner; a green tick means it's approved.",
        "income-status",
      ),
      s(
        "Nếu bị “Chưa duyệt”, đọc ghi chú của chủ salon, sửa lại và bấm “Sửa và gửi lại”.",
        "If it comes back “Not approved”, read the owner's note, fix it and tap “Fix and send again”.",
        "income-rejected",
      ),
    ],
    tip: t(
      "Lịch hẹn quá 24 giờ chưa báo cáo: lịch hiện thanh đỏ, ứng dụng reo nhắc, bạn nhận email — và nếu salon bật, bot Telegram nhắc tên bạn trong nhóm. Báo cáo ngay sau mỗi khách là nhẹ nhàng nhất.",
      "Bookings left unreported for 24 hours: the calendar shows a red bar, the app rings, you get an email — and if the salon turned it on, the Telegram bot tags you in the group. Reporting right after each customer is easiest.",
    ),
    href: "/business/dashboard/income",
  },
  {
    id: "loyalty-scan",
    group: "money",
    icon: "qr",
    needs: "loyalty",
    minutes: 1,
    title: t("Quét thẻ tích điểm cho khách", "Scan a customer's loyalty card"),
    why: t("Mỗi lần khách đến được 1 vé — đủ vé được giảm giá, khách sẽ quay lại.", "Every visit earns a ticket — enough tickets earn a discount, and customers come back."),
    steps: [
      s(
        "Khách mở thẻ VIP trên điện thoại (nút “Xem thẻ của tôi” trong email “Thẻ thành viên VIP”) và đưa mã QR cho bạn.",
        "The customer opens their VIP card on their phone (the “View my card” button in the VIP card email) and shows you the QR code.",
        "qr-card",
      ),
      s(
        "Mở camera điện thoại, hướng vào mã QR — trang thẻ của khách hiện ra. Bấm “Cộng 1 vé”.",
        "Point your phone camera at the QR code — the customer's card opens. Tap “Add 1 ticket”.",
        "scan-add",
      ),
      s(
        "Hoặc vào “Thẻ tích điểm”, phần “Quét thẻ khi khách đến”, nhập mã thẻ in dưới mã QR.",
        "Or go to “Loyalty cards”, “Scan a card when a customer visits”, and type the code printed under the QR.",
        "code-input",
      ),
      s(
        "Thẻ báo “Đủ vé”: khách được giảm giá lần này. Khi thanh toán, bấm “Áp dụng giảm …%” — thẻ bắt đầu vòng tích vé mới.",
        "When the card says the reward is ready, the customer gets the discount this time. At checkout tap “Apply …% off” — the card starts a new round.",
        "reward",
      ),
    ],
    tip: t(
      "Vé chỉ được cộng khi khách có lịch hẹn trên lịch (cùng email với thẻ) và giờ hẹn đã bắt đầu. Khách vãng lai: tạo lịch hẹn cho khách trước rồi mới quét. Quét trùng cũng không sao — mỗi lượt hẹn chỉ được 1 vé.",
      "A ticket is added only when the customer has a booking on the calendar (same email as the card) that has started. Walk-ins: add a booking for them first, then scan. Scanning twice does no harm — each visit gives one ticket.",
    ),
    href: "/business/dashboard/loyalty",
  },
  {
    id: "loyalty-issue",
    group: "money",
    icon: "card",
    needs: "loyalty",
    minutes: 1,
    title: t("Cấp thẻ tích điểm cho khách mới", "Give a new customer a loyalty card"),
    why: t("Khách có thẻ là có lý do quay lại — và còn giới thiệu bạn bè.", "A card gives customers a reason to come back — and to bring friends."),
    steps: [
      s(
        "Vào “Thẻ tích điểm”, tìm phần “Kích hoạt thẻ cho khách”. Nhập họ tên và email của khách.",
        "Go to “Loyalty cards”, find “Activate a card for a customer” and enter the customer's name and email.",
        "activate-form",
      ),
      s(
        "Bấm “Kích hoạt và gửi QR qua email”. Khách nhận ngay email thẻ VIP có mã QR và link mời bạn bè.",
        "Tap “Activate and email the QR”. The customer gets their VIP card email right away, with the QR code and a friend invite link.",
        "card-email",
      ),
      s(
        "Nhắc khách: gửi link mời trong thẻ cho bạn bè — bạn đến tiệm làm dịch vụ là khách được tặng thêm 2 vé.",
        "Tell them: share the invite link on the card — when a friend comes in for a service, they get 2 extra tickets.",
        "qr-card",
      ),
    ],
    tip: t("Lúc đẹp nhất để mời khách lấy thẻ là ngay khi vừa làm xong và khách đang vui.", "The best moment to offer a card is right after the service, while the customer is happy."),
    href: "/business/dashboard/loyalty",
  },
  {
    id: "team-chat",
    group: "team",
    icon: "chat",
    minutes: 2,
    title: t("Nhóm chat với đồng nghiệp", "Chat with your colleagues"),
    why: t("Đổi ca, hỏi việc, gửi ảnh mẫu — ngay trong VaraaAi, không cần ứng dụng khác.", "Swap shifts, ask questions, share photos — right in VaraaAi, no other app needed."),
    steps: [
      s("Vào “Tiện ích” → “Nhóm chat”. Nhóm “Cả salon” có sẵn mọi người.", "Go to “Team hub” → “Team chat”. The “Whole salon” chat already has everyone.", "chat-list"),
      s("Bấm “Trò chuyện mới” để “Nhắn riêng” cho một người hoặc “Tạo nhóm”.", "Tap “New chat” to message one person privately or start a group.", "new-chat"),
      s("Bấm dấu “+” để gửi ảnh, video hoặc tài liệu; biểu tượng mặt cười để chèn emoji.", "Tap “+” to send photos, videos or documents, and the smiley for emoji.", "composer"),
      s("Nhấn giữ một tin nhắn để thả cảm xúc, “Trả lời”, “Sửa” hoặc “Thu hồi”.", "Press and hold a message to react, “Reply”, “Edit” or “Unsend”.", "message-menu"),
    ],
    href: "/business/dashboard/utilities/chat",
  },
  {
    id: "notices-training",
    group: "team",
    icon: "megaphone",
    minutes: 2,
    title: t("Thông báo và đào tạo của salon", "The salon's notices and training"),
    why: t("Nắm lịch làm việc, nội quy mới và học đúng quy trình chuẩn của salon.", "Keep up with rotas and house rules, and learn the salon's standard procedures."),
    steps: [
      s(
        "“Tiện ích” → “Thông báo”: đọc thông báo mới. Thông báo cần xác nhận thì bấm “Tôi đã đọc và nắm rõ”.",
        "“Team hub” → “Notices”: read what's new. If a notice asks you to confirm, tap “I've read and understood”.",
        "notice",
      ),
      s(
        "“Tiện ích” → “Đào tạo”: xem bài học, video và tài liệu. Ưu tiên các bài có nhãn “Bắt buộc”.",
        "“Team hub” → “Training”: go through lessons, videos and documents. Start with the ones marked “Required”.",
        "training",
      ),
      s(
        "Học xong bấm “Đánh dấu đã hoàn thành” — chủ salon thấy được tiến độ của bạn.",
        "When you finish, tap “Mark as completed” — the owner can see your progress.",
        "lesson-done",
      ),
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
    a: t("Bạn dùng cùng một tài khoản. Chọn chi nhánh ở ô chọn chi nhánh trên trang Lịch hẹn; giờ có khách ở chi nhánh này tự khoá ở chi nhánh kia (gồm cả thời gian di chuyển). Chủ salon có thể chỉnh độ dài ô khoá riêng cho từng chi nhánh.", "You use the same login. Pick the branch in the branch switcher on the Bookings page; a booking at one branch locks that time at the others (travel time included). The owner can adjust a locked block for each branch."),
    href: "/business/dashboard",
  },
  {
    q: t("Trang “Thẻ tích điểm” hiện ổ khoá là sao?", "Why does “Loyalty cards” show a padlock?"),
    a: t("Thẻ tích điểm và Marketing chỉ mở khi chủ salon hoàn thiện hồ sơ salon từ 85% trở lên. Hãy nhắc chủ salon vào Cài đặt để bổ sung.", "Loyalty cards and Marketing open once the owner completes at least 85% of the salon profile. Ask the owner to fill it in under Settings."),
    href: "/business/dashboard/loyalty",
  },
  {
    q: t("Bot Telegram nhắc tên tôi trong nhóm — tôi cần làm gì?", "The Telegram bot tagged me in the group — what do I do?"),
    a: t("Bạn có lịch hẹn kết thúc quá 24 giờ chưa báo cáo thu nhập. Mở VaraaAi › Lịch hẹn, bấm ngày trong thanh đỏ trên đầu lịch và báo cáo từng lịch hẹn. Bot chỉ nhắc mỗi ngày một lần. Muốn bot gắn đúng tên, hãy gửi @username Telegram của bạn cho chủ salon.", "You have bookings that ended over 24 hours ago without an income report. Open VaraaAi › Bookings, tap the day in the red bar at the top and report each booking. The bot reminds once a day. To be tagged correctly, send the owner your Telegram @username."),
    href: "/business/dashboard/bookings",
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
    minutes: "~{n} phút",
    pathTitle: "Lộ trình cho nhân viên",
    pathSub: "Đi lần lượt 4 chương — mỗi bước có hình minh hoạ đúng như trên màn hình của bạn.",
    chapter: "Chương",
    guidesN: "{n} bài",
    openGuide: "Xem hướng dẫn",
    stepLabel: "Bước {n}",
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
    minutes: "~{n} min",
    pathTitle: "Your learning path",
    pathSub: "Work through the 4 chapters — every step has a picture of exactly what you see on screen.",
    chapter: "Chapter",
    guidesN: "{n} guides",
    openGuide: "Open guide",
    stepLabel: "Step {n}",
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
    minutes: "~{n} min",
    pathTitle: "Oppimispolkusi",
    pathSub: "Käy läpi 4 lukua — jokaisessa vaiheessa on kuva siitä, mitä näet ruudulla.",
    chapter: "Luku",
    guidesN: "{n} ohjetta",
    openGuide: "Avaa ohje",
    stepLabel: "Vaihe {n}",
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
