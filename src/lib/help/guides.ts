/** The salon-owner help centre (/help/getting-started): one guide per
 * feature, each with numbered steps and an illustrated screen whose numbered
 * markers (`m`) match the steps. Written in Vietnamese and English; other
 * languages get English. Button and field names match the real dashboard. */

export interface T {
  vi: string;
  en: string;
}

const t = (vi: string, en: string): T => ({ vi, en });

export type Block =
  | { k: "button"; label: T; primary?: boolean; m?: number }
  | { k: "field"; label: T; value: T; m?: number }
  | { k: "row"; items: { label: T; value: T }[]; m?: number }
  | { k: "chips"; label: T; items: T[]; m?: number }
  | { k: "toggle"; label: T; on?: boolean; m?: number }
  | { k: "list"; rows: { title: T; sub?: T; right?: T }[]; m?: number }
  | { k: "note"; text: T; m?: number }
  | { k: "calendar"; m?: number }
  | { k: "qr"; label: T; m?: number }
  | { k: "tabs"; items: T[]; active: number; m?: number }
  | { k: "link"; label: T; value: string; m?: number };

export type GuideGroup = "start" | "customers" | "daily" | "retain" | "grow";
export type GuideIcon =
  | "store" | "image" | "scissors" | "users" | "clock" | "wallet" | "share" | "globe" | "bot" | "newspaper"
  | "calendar" | "receipt" | "contact" | "bell" | "star" | "qr" | "gift" | "mail" | "bag" | "handshake"
  | "building" | "tools" | "chart";

export interface Guide {
  id: string;
  group: GuideGroup;
  icon: GuideIcon;
  title: T;
  why: T;
  /** Dashboard page the guide is about (no locale prefix). */
  href: string;
  steps: T[];
  tips?: T[];
  screen: { page: T; blocks: Block[] };
}

export const GROUPS: { id: GuideGroup; title: T; body: T }[] = [
  { id: "start", title: t("Bắt đầu", "Getting started"), body: t("Thiết lập salon trong 15 phút.", "Set up your salon in 15 minutes.") },
  { id: "customers", title: t("Nhận khách", "Getting customers"), body: t("Để khách tìm thấy và đặt lịch ở mọi nơi.", "Be found and booked everywhere.") },
  { id: "daily", title: t("Vận hành hằng ngày", "Day-to-day"), body: t("Lịch hẹn, thanh toán, khách hàng.", "Bookings, checkout and customers.") },
  { id: "retain", title: t("Giữ khách & tăng doanh thu", "Keep customers & grow revenue"), body: t("Biến khách mới thành khách quen.", "Turn first visits into regulars.") },
  { id: "grow", title: t("Mở rộng & công cụ", "Grow & tools"), body: t("Chi nhánh, số liệu và công cụ miễn phí.", "Branches, numbers and free tools.") },
];

export const GUIDES: Guide[] = [
  /* ---------- Bắt đầu ---------- */
  {
    id: "register",
    group: "start",
    icon: "store",
    title: t("Đăng ký và kích hoạt salon", "Register and activate your salon"),
    why: t("Salon được kích hoạt ngay sau khi xác minh email — không phải chờ duyệt.", "Your salon goes live as soon as you verify your email — no waiting for a review."),
    href: "/business/apply",
    steps: [
      t("Vào trang đăng ký salon và điền tên salon, giới thiệu ngắn, danh mục dịch vụ.", "Open the salon registration page and enter your salon name, a short intro and categories."),
      t("Chọn quốc gia (quyết định múi giờ của lịch), nhập địa chỉ, thành phố và số điện thoại.", "Choose the country (it sets your calendar's time zone), then the address, city and phone."),
      t("Bấm \"Gửi đăng ký\".", "Press \"Submit\"."),
      t("Mở email VaraaAi gửi cho bạn và bấm \"Xác minh email\" — salon được kích hoạt ngay.", "Open the email from VaraaAi and press \"Verify email\" — your salon is live straight away."),
    ],
    tips: [t("Chưa thấy email? Kiểm tra thư mục Spam hoặc Quảng cáo.", "No email? Check your Spam or Promotions folder.")],
    screen: {
      page: t("Đăng ký salon", "Register salon"),
      blocks: [
        { k: "field", label: t("Tên doanh nghiệp", "Business name"), value: t("Lumi Nails & Beauty", "Lumi Nails & Beauty"), m: 1 },
        { k: "chips", label: t("Danh mục dịch vụ", "Categories"), items: [t("Nail & móng", "Nails"), t("Mi & chân mày", "Lashes")], m: 1 },
        { k: "row", items: [{ label: t("Quốc gia", "Country"), value: t("Phần Lan", "Finland") }, { label: t("Thành phố", "City"), value: t("Helsinki", "Helsinki") }], m: 2 },
        { k: "button", label: t("Gửi đăng ký", "Submit"), primary: true, m: 3 },
        { k: "note", text: t("✉ Kiểm tra email để xác minh", "✉ Check your email to verify"), m: 4 },
      ],
    },
  },
  {
    id: "profile",
    group: "start",
    icon: "image",
    title: t("Thông tin salon, logo và ảnh bìa", "Salon details, logo and cover photo"),
    why: t("Salon có ảnh đẹp và thông tin đầy đủ được khách bấm vào nhiều hơn hẳn.", "Salons with great photos and full details get far more clicks."),
    href: "/business/dashboard/settings",
    steps: [
      t("Vào Cài đặt → \"Thông tin salon\": sửa tên, giới thiệu ngắn, địa chỉ (kéo ghim trên bản đồ cho chính xác) và danh mục.", "Go to Settings → \"Salon details\": edit the name, short intro, address (drag the map pin to be exact) and categories."),
      t("Ở mục ảnh, bấm \"Tải logo lên\" (ảnh vuông) và \"Tải ảnh bìa lên\" (ảnh ngang, tối đa 5MB).", "In the photos section press \"Upload logo\" (square) and \"Upload cover photo\" (landscape, up to 5MB)."),
      t("Mục \"Liên hệ & mạng xã hội\": nhập điện thoại, WhatsApp, Facebook, Instagram, TikTok, YouTube và Google Place ID.", "In \"Contact & social\": add phone, WhatsApp, Facebook, Instagram, TikTok, YouTube and your Google Place ID."),
      t("Bấm Lưu ở từng mục.", "Press Save in each section."),
    ],
    tips: [t("Google Place ID giúp hệ thống mời khách đánh giá lên Google — lấy bằng công cụ Place ID Finder của Google.", "Your Google Place ID lets the system invite customers to review you on Google — get it with Google's Place ID Finder.")],
    screen: {
      page: t("Cài đặt", "Settings"),
      blocks: [
        { k: "field", label: t("Tên salon", "Salon name"), value: t("Lumi Nails & Beauty", "Lumi Nails & Beauty"), m: 1 },
        { k: "field", label: t("Địa chỉ", "Address"), value: t("Mannerheimintie 12, Helsinki", "Mannerheimintie 12, Helsinki"), m: 1 },
        { k: "row", items: [{ label: t("Logo", "Logo"), value: t("Tải logo lên", "Upload logo") }, { label: t("Ảnh bìa", "Cover photo"), value: t("Tải ảnh bìa lên", "Upload cover") }], m: 2 },
        { k: "field", label: t("Facebook", "Facebook"), value: t("facebook.com/lumi.nails", "facebook.com/lumi.nails"), m: 3 },
        { k: "button", label: t("Lưu", "Save"), primary: true, m: 4 },
      ],
    },
  },
  {
    id: "services",
    group: "start",
    icon: "scissors",
    title: t("Thêm dịch vụ, nhóm dịch vụ và dịch vụ phụ", "Add services, groups and add-ons"),
    why: t("Menu rõ ràng — giá, thời lượng, mô tả — giúp khách tự tin đặt lịch mà không cần hỏi.", "A clear menu — prices, durations, descriptions — lets customers book without asking."),
    href: "/business/dashboard/services",
    steps: [
      t("Vào Dịch vụ, bấm \"Thêm dịch vụ\".", "Go to Services and press \"Add service\"."),
      t("Nhập tên dịch vụ, chọn nhóm (ví dụ \"Làm móng tay\") — chưa có thì gõ tên nhóm mới và bấm \"Thêm nhóm\".", "Enter the service name and pick a group (e.g. \"Manicure\") — or type a new group name and press \"Add group\"."),
      t("Nhập thời lượng (phút), thời gian dọn dẹp sau (phút), giá và tiền cọc nếu có; thêm mô tả và link video nếu muốn.", "Enter the duration, clean-up time after (minutes), price and an optional deposit; add a description and video link if you like."),
      t("Ở \"Nhân viên thực hiện\", tích những thợ làm được dịch vụ này — có thể đặt giá riêng/phút riêng cho từng thợ.", "Under \"Staff who perform it\", tick the stylists who do it — each can have their own price and minutes."),
      t("Bấm Lưu. Dịch vụ phụ (ví dụ \"Sơn gel thêm\") tạo ở trang Dịch vụ phụ rồi chọn trong từng dịch vụ chính.", "Press Save. Add-ons (e.g. \"Extra gel\") are created on the Add-ons page and then picked inside each main service."),
    ],
    tips: [t("Đổi đơn vị tiền tệ không tự quy đổi giá — hãy nhập lại giá.", "Changing the currency doesn't convert prices — re-enter them.")],
    screen: {
      page: t("Dịch vụ", "Services"),
      blocks: [
        { k: "button", label: t("+ Thêm dịch vụ", "+ Add service"), primary: true, m: 1 },
        { k: "field", label: t("Tên dịch vụ", "Service name"), value: t("Sơn gel tay", "Gel manicure"), m: 2 },
        { k: "chips", label: t("Nhóm dịch vụ", "Service group"), items: [t("Làm móng tay", "Manicure")], m: 2 },
        { k: "row", items: [{ label: t("Thời lượng (phút)", "Duration (min)"), value: t("45", "45") }, { label: t("Giá", "Price"), value: t("35 €", "€35") }], m: 3 },
        { k: "chips", label: t("Nhân viên thực hiện", "Staff who perform it"), items: [t("Linh", "Linh"), t("Mai", "Mai")], m: 4 },
        { k: "button", label: t("Lưu", "Save"), m: 5 },
      ],
    },
  },
  {
    id: "staff",
    group: "start",
    icon: "users",
    title: t("Nhân viên, giờ làm và phân quyền", "Staff, working hours and permissions"),
    why: t("Khách chọn đúng thợ họ tin, mỗi thợ có lịch riêng và tự đăng nhập xem lịch của mình.", "Customers pick the stylist they trust; each has their own schedule and login."),
    href: "/business/dashboard/staff",
    steps: [
      t("Vào Nhân viên, bấm \"Thêm nhân viên\": nhập tên, chức danh, giới thiệu.", "Go to Staff and press \"Add staff\": enter name, title and bio."),
      t("Tích \"Dịch vụ có thể thực hiện\". Bỏ trống giờ làm để theo giờ mở cửa salon, hoặc đặt giờ làm việc riêng.", "Tick \"Services they can do\". Leave hours empty to follow the salon's hours, or set custom working hours."),
      t("(Tuỳ chọn) \"Tài khoản đăng nhập\": cấp email + mật khẩu để thợ tự xem lịch; chọn \"Được xem những mục nào\".", "(Optional) \"Login account\": give an email and password so they can see their bookings; choose \"What they can see\"."),
      t("Thêm \"Lời nhắn của nhân viên\" (gửi kèm email xác nhận) và \"Thời gian đặt trước tối thiểu\" nếu cần, rồi Lưu.", "Add a \"Staff message\" (sent with the confirmation email) and a \"Minimum notice\" if needed, then Save."),
      t("Lưu xong, bấm sửa để tải ảnh đại diện; đổi giờ làm sau bằng biểu tượng đồng hồ.", "After saving, edit to upload a photo; change hours later with the clock icon."),
    ],
    screen: {
      page: t("Nhân viên", "Staff"),
      blocks: [
        { k: "button", label: t("+ Thêm nhân viên", "+ Add staff"), primary: true, m: 1 },
        { k: "field", label: t("Tên nhân viên", "Staff name"), value: t("Linh", "Linh"), m: 1 },
        { k: "chips", label: t("Dịch vụ có thể thực hiện", "Services they can do"), items: [t("Sơn gel tay", "Gel manicure"), t("Nối mi", "Lashes")], m: 2 },
        { k: "toggle", label: t("Tài khoản đăng nhập (không bắt buộc)", "Login account (optional)"), on: true, m: 3 },
        { k: "field", label: t("Lời nhắn của nhân viên", "Staff message"), value: t("Hẹn gặp bạn nhé!", "See you soon!"), m: 4 },
      ],
    },
  },
  {
    id: "hours",
    group: "start",
    icon: "clock",
    title: t("Giờ mở cửa", "Opening hours"),
    why: t("Khách chỉ đặt được giờ còn trống trong giờ mở cửa và giờ làm của thợ — không bao giờ bị đặt nhầm.", "Customers can only book free times within your hours and the stylist's — no wrong bookings."),
    href: "/business/dashboard/hours",
    steps: [
      t("Vào Giờ mở cửa.", "Go to Opening hours."),
      t("Tích những ngày salon mở cửa, bỏ tích ngày nghỉ.", "Tick the days you're open, untick days off."),
      t("Chọn giờ mở và giờ đóng cho từng ngày.", "Pick the opening and closing time for each day."),
      t("Bấm Lưu.", "Press Save."),
    ],
    tips: [t("Thợ nghỉ một ngày? Trên trang Lịch hẹn, kéo giờ bắt đầu/kết thúc ca của thợ đó cho ngày hôm đó.", "A stylist off for a day? On the Bookings page, drag that stylist's shift start/end for that day.")],
    screen: {
      page: t("Giờ mở cửa", "Opening hours"),
      blocks: [
        { k: "list", rows: [
          { title: t("Thứ Hai", "Monday"), right: t("09:00 – 18:00", "09:00 – 18:00") },
          { title: t("Thứ Ba", "Tuesday"), right: t("09:00 – 18:00", "09:00 – 18:00") },
          { title: t("Thứ Bảy", "Saturday"), right: t("10:00 – 16:00", "10:00 – 16:00") },
          { title: t("Chủ Nhật", "Sunday"), right: t("Nghỉ", "Closed") },
        ], m: 2 },
        { k: "row", items: [{ label: t("Mở cửa", "Opens"), value: t("09:00", "09:00") }, { label: t("Đóng cửa", "Closes"), value: t("18:00", "18:00") }], m: 3 },
        { k: "button", label: t("Lưu", "Save"), primary: true, m: 4 },
      ],
    },
  },
  {
    id: "payments",
    group: "start",
    icon: "wallet",
    title: t("Thanh toán, chính sách hủy và hóa đơn", "Payments, cancellation policy and invoices"),
    why: t("Khách biết rõ cách trả tiền và quy định hủy — ít tranh cãi, ít bỏ hẹn.", "Customers know how to pay and the cancellation rules — fewer disputes and no-shows."),
    href: "/business/dashboard/settings",
    steps: [
      t("Vào Cài đặt → \"Tùy chọn salon\": chọn ngôn ngữ mặc định cho khách, tiền tệ, khách được hủy trước bao nhiêu giờ và viết chính sách hủy.", "Go to Settings → \"Salon preferences\": pick the default language for customers, currency, how many hours before customers may cancel, and your policy."),
      t("\"Nhận thanh toán qua chuyển khoản\": nhập ngân hàng, số tài khoản, chủ tài khoản, BIC — bấm \"Lưu thông tin ngân hàng\".", "\"Bank transfer payments\": enter bank, account number, holder and BIC — press \"Save bank details\"."),
      t("\"Thông tin xuất hóa đơn\": tên công ty, địa chỉ, mã số thuế, VAT % — cần có để xuất hóa đơn tại quầy.", "\"Invoice details\": company name, address, business ID and VAT % — needed to issue invoices at checkout."),
    ],
    tips: [t("Khách luôn có thể chọn trả tiền mặt tại salon.", "Customers can always choose to pay at the salon.")],
    screen: {
      page: t("Cài đặt", "Settings"),
      blocks: [
        { k: "row", items: [{ label: t("Tiền tệ mặc định", "Default currency"), value: t("EUR €", "EUR €") }, { label: t("Khách được hủy trước", "Cancel up to"), value: t("24 giờ", "24 hours") }], m: 1 },
        { k: "field", label: t("Số tài khoản", "Account number"), value: t("FI21 1234 5600 0007 85", "FI21 1234 5600 0007 85"), m: 2 },
        { k: "field", label: t("Mã số doanh nghiệp / mã số thuế", "Business ID / tax ID"), value: t("1234567-8", "1234567-8"), m: 3 },
        { k: "button", label: t("Lưu thông tin hóa đơn", "Save invoice details"), primary: true, m: 3 },
      ],
    },
  },

  /* ---------- Nhận khách ---------- */
  {
    id: "share",
    group: "customers",
    icon: "share",
    title: t("Chia sẻ link đặt lịch và nhúng vào website", "Share your booking link and embed it"),
    why: t("Một link dán ở Facebook, Instagram, Google — khách đặt lịch 24/7, kể cả khi bạn đang ngủ.", "One link on Facebook, Instagram and Google — customers book 24/7, even while you sleep."),
    href: "/business/dashboard/settings",
    steps: [
      t("Vào Cài đặt → \"Nhúng trang đặt lịch\", bấm \"Sao chép liên kết\".", "Go to Settings → \"Embed booking page\" and press \"Copy link\"."),
      t("Dán link vào nút \"Đặt lịch\" trên Facebook Page, link ở bio Instagram, Google Business Profile, tin nhắn Zalo/WhatsApp.", "Paste it into your Facebook Page \"Book\" button, Instagram bio, Google Business Profile and chat messages."),
      t("Có website riêng? Bấm \"Lấy mã nhúng\" → \"Sao chép mã\" và dán vào trang web nơi muốn hiện khung đặt lịch.", "Have a website? Press \"Get embed code\" → \"Copy code\" and paste it where the booking widget should appear."),
      t("Nhiều chi nhánh: dùng \"Trang đặt lịch chuỗi\" — khách chọn chi nhánh rồi đặt.", "Several branches: use the \"Chain booking page\" — customers pick a branch, then book."),
    ],
    tips: [t("In mã QR đặt lịch miễn phí bằng công cụ Poster QR để dán ở quầy và cửa kính.", "Print a free booking QR with the QR poster tool for your counter and window.")],
    screen: {
      page: t("Cài đặt", "Settings"),
      blocks: [
        { k: "link", label: t("Link đặt lịch của bạn", "Your booking link"), value: "varaaai.com/b/lumi-nails", m: 1 },
        { k: "chips", label: t("Dán vào", "Paste into"), items: [t("Facebook", "Facebook"), t("Instagram", "Instagram"), t("Google", "Google")], m: 2 },
        { k: "button", label: t("Lấy mã nhúng", "Get embed code"), m: 3 },
        { k: "note", text: t("Trang đặt lịch chuỗi (tất cả chi nhánh)", "Chain booking page (all branches)"), m: 4 },
      ],
    },
  },
  {
    id: "website",
    group: "customers",
    icon: "globe",
    title: t("Website riêng cho salon", "Your own salon website"),
    why: t("Một website đẹp gồm trang chủ, dịch vụ, đặt lịch, giới thiệu, liên hệ — không cần biết thiết kế.", "A beautiful website — home, services, booking, about, contact — no design skills needed."),
    href: "/business/dashboard/landing",
    steps: [
      t("Vào Trang landing.", "Go to Landing page."),
      t("\"Phần đầu trang (Hero)\": viết tiêu đề, tải tối đa 5 ảnh trình chiếu, chọn nút dẫn tới trang đặt lịch.", "\"Hero\": write a headline, upload up to 5 slideshow photos and point the button to your booking page."),
      t("Điền \"Phần giới thiệu\" và \"Điểm nổi bật\" (chọn bố cục ảnh trái/phải).", "Fill in \"About\" and \"Highlights\" (choose image left/right layout)."),
      t("Bấm xuất bản để mọi người xem được, rồi \"Sao chép liên kết\" để chia sẻ.", "Publish so everyone can see it, then \"Copy link\" to share."),
    ],
    screen: {
      page: t("Trang landing", "Landing page"),
      blocks: [
        { k: "toggle", label: t("Xuất bản trang landing", "Publish landing page"), on: true, m: 4 },
        { k: "field", label: t("Tiêu đề", "Headline"), value: t("Bộ móng đẹp cho mọi dịp", "Beautiful nails for every occasion"), m: 2 },
        { k: "chips", label: t("Ảnh trình chiếu (tối đa 5)", "Slideshow (up to 5)"), items: [t("Ảnh 1", "Photo 1"), t("Ảnh 2", "Photo 2"), t("Ảnh 3", "Photo 3")], m: 2 },
        { k: "field", label: t("Phần giới thiệu", "About"), value: t("10 năm kinh nghiệm…", "10 years of experience…"), m: 3 },
        { k: "link", label: t("Website của bạn", "Your website"), value: "varaaai.com/site/lumi-nails", m: 4 },
      ],
    },
  },
  {
    id: "ai-chat",
    group: "customers",
    icon: "bot",
    title: t("Tin nhắn và trợ lý AI trả lời khách", "Messages and the AI assistant"),
    why: t("Đang làm móng không kịp trả lời? AI tư vấn dịch vụ, giá, giờ trống và giúp khách đặt lịch thay bạn.", "Hands busy? The AI answers about services, prices and free times and helps customers book for you."),
    href: "/business/dashboard/messages",
    steps: [
      t("Vào Tin nhắn — mọi cuộc chat với khách nằm ở đây.", "Go to Messages — every customer chat is here."),
      t("Ở \"Trợ lý AI khi bạn vắng mặt\", bật \"Bật trợ lý AI\".", "Under \"AI assistant while you're away\", switch on \"Enable AI assistant\"."),
      t("Bấm \"Bật thông báo trên thiết bị này\" để nhận thông báo khi khách muốn nói chuyện trực tiếp.", "Press \"Enable notifications on this device\" to be alerted when a customer wants you directly."),
      t("Muốn khung chat trên website riêng? Dùng \"Nhúng khung chat\" — khách không cần tài khoản.", "Want chat on your own website? Use \"Embed chat\" — no customer account needed."),
    ],
    tips: [t("Khi khách bấm \"Nói chuyện với chủ salon\", AI tự dừng và bạn nhận email ngay.", "When a customer taps \"Talk to the owner\", the AI pauses and you're emailed at once.")],
    screen: {
      page: t("Tin nhắn", "Messages"),
      blocks: [
        { k: "list", rows: [{ title: t("Anna", "Anna"), sub: t("Thứ Bảy còn giờ trống không ạ?", "Any free times on Saturday?"), right: t("2", "2") }], m: 1 },
        { k: "toggle", label: t("Bật trợ lý AI", "Enable AI assistant"), on: true, m: 2 },
        { k: "button", label: t("Bật thông báo trên thiết bị này", "Enable notifications on this device"), m: 3 },
        { k: "note", text: t("Nhúng khung chat — sao chép mã", "Embed chat — copy code"), m: 4 },
      ],
    },
  },
  {
    id: "fanpage",
    group: "customers",
    icon: "newspaper",
    title: t("Fanpage: đăng bài cho khách theo dõi", "Fan page: post for your followers"),
    why: t("Khoe mẫu mới, báo khuyến mãi tới những khách đang theo dõi salon.", "Show new looks and announce offers to customers who follow you."),
    href: "/business/dashboard/fanpage",
    steps: [
      t("Vào Fanpage.", "Go to Fan page."),
      t("Viết nội dung, bấm \"Thêm ảnh\" và dán link video YouTube nếu có.", "Write your post, press \"Add photos\" and paste a YouTube link if you have one."),
      t("Bấm \"Đăng bài\" — khách theo dõi thấy bài trong Bảng tin của họ.", "Press \"Post\" — followers see it in their feed."),
    ],
    screen: {
      page: t("Fanpage", "Fan page"),
      blocks: [
        { k: "field", label: t("Bài viết", "Post"), value: t("Bộ sưu tập móng mùa thu đã có 🍂", "Our autumn nail collection is here 🍂"), m: 2 },
        { k: "button", label: t("Thêm ảnh", "Add photos"), m: 2 },
        { k: "button", label: t("Đăng bài", "Post"), primary: true, m: 3 },
      ],
    },
  },

  /* ---------- Vận hành hằng ngày ---------- */
  {
    id: "bookings",
    group: "daily",
    icon: "calendar",
    title: t("Lịch hẹn: thêm, dời, đổi trạng thái", "Bookings: add, move, update"),
    why: t("Cả tiệm trong một màn hình — kéo thả để dời giờ, khách tự nhận email báo giờ mới.", "The whole salon on one screen — drag to move a booking and the customer gets the new time by email."),
    href: "/business/dashboard/bookings",
    steps: [
      t("Vào Lịch hẹn, chọn xem Ngày / Tuần / Tháng và lọc theo nhân viên.", "Go to Bookings, choose Day / Week / Month and filter by staff."),
      t("Thêm lịch cho khách gọi điện: bấm vào ô trống (trên điện thoại: nhấn giữ khoảng 1 giây), chọn dịch vụ, nhập tên khách, tích \"Gửi email xác nhận và nhắc lịch\" nếu muốn.", "Add a phone booking: click an empty slot (on a phone: press and hold for about a second), pick the service, enter the customer, and tick \"Send confirmation and reminder emails\" if you want."),
      t("Dời lịch: kéo lịch hẹn sang giờ hoặc thợ khác và xác nhận \"Có, chuyển\".", "Move a booking: drag it to another time or stylist and confirm \"Yes, move\"."),
      t("Bấm vào lịch hẹn để đổi trạng thái: Hoàn thành, Không đến, Huỷ.", "Tap a booking to set its status: Completed, No-show, Cancelled."),
    ],
    tips: [t("Khách đặt được trước tối đa 365 ngày.", "Customers can book up to 365 days ahead.")],
    screen: {
      page: t("Lịch hẹn", "Bookings"),
      blocks: [
        { k: "tabs", items: [t("Ngày", "Day"), t("Tuần", "Week"), t("Tháng", "Month")], active: 0, m: 1 },
        { k: "calendar", m: 2 },
        { k: "note", text: t("↕ Kéo để dời giờ — khách nhận email giờ mới", "↕ Drag to move — the customer is emailed"), m: 3 },
        { k: "row", items: [{ label: t("Trạng thái", "Status"), value: t("Hoàn thành", "Completed") }, { label: t("", ""), value: t("Không đến", "No-show") }], m: 4 },
      ],
    },
  },
  {
    id: "checkout",
    group: "daily",
    icon: "receipt",
    title: t("Thanh toán tại quầy và hóa đơn", "Checkout and invoices"),
    why: t("Tính tiền, áp thẻ quà tặng, xuất hóa đơn PDF và gửi email cho khách chỉ trong vài chạm.", "Take payment, apply a gift card, issue a PDF invoice and email it in a few taps."),
    href: "/business/dashboard/bookings",
    steps: [
      t("Điền \"Thông tin xuất hóa đơn\" trong Cài đặt (chỉ làm một lần).", "Fill in \"Invoice details\" in Settings (once)."),
      t("Trên Lịch hẹn, mở lịch hẹn của khách và bấm \"Đến quầy thanh toán\".", "On Bookings, open the customer's booking and press \"Checkout\"."),
      t("Kiểm tra dịch vụ và giá, nhập \"Mã thẻ quà tặng\" nếu khách có, chọn \"Tiền mặt\" hoặc \"Qua ngân hàng\".", "Check services and price, enter a \"Gift card code\" if any, choose \"Cash\" or \"Bank\"."),
      t("Xuất hóa đơn: khách quét mã QR để tải, hoặc bấm \"Gửi hóa đơn qua email\".", "Issue the invoice: the customer scans the QR to download it, or press \"Email the invoice\"."),
    ],
    screen: {
      page: t("Đến quầy thanh toán", "Checkout"),
      blocks: [
        { k: "list", rows: [{ title: t("Sơn gel tay", "Gel manicure"), right: t("35,00 €", "€35.00") }, { title: t("Tổng cộng (cần thu)", "Total due"), right: t("35,00 €", "€35.00") }], m: 2 },
        { k: "field", label: t("Mã thẻ quà tặng", "Gift card code"), value: t("GIFT8K2M9Q", "GIFT8K2M9Q"), m: 3 },
        { k: "chips", label: t("Hình thức thanh toán", "Payment method"), items: [t("Tiền mặt", "Cash"), t("Qua ngân hàng", "Bank")], m: 3 },
        { k: "qr", label: t("Khách quét mã để tải hóa đơn", "Customer scans to download the invoice"), m: 4 },
      ],
    },
  },
  {
    id: "customers",
    group: "daily",
    icon: "contact",
    title: t("Danh sách khách hàng", "Your customer list"),
    why: t("Nhớ từng khách như người quen: số lần đến, chi tiêu, lịch sử, hóa đơn.", "Know every customer like a regular: visits, spend, history and invoices."),
    href: "/business/dashboard/customers",
    steps: [
      t("Vào Khách hàng — tìm theo tên, email hoặc số điện thoại.", "Go to Customers — search by name, email or phone."),
      t("Bấm vào khách để xem lịch sử từng lượt hẹn, ghi chú và hóa đơn.", "Tap a customer to see every visit, notes and invoices."),
      t("Mở lại hóa đơn hoặc \"Gửi lại cho khách\" khi cần.", "Reopen an invoice or \"Send again\" when needed."),
    ],
    screen: {
      page: t("Khách hàng", "Customers"),
      blocks: [
        { k: "field", label: t("Tìm khách", "Search"), value: t("Anna", "Anna"), m: 1 },
        { k: "list", rows: [
          { title: t("Anna Virtanen", "Anna Virtanen"), sub: t("8 lần đến · gần nhất 12/10", "8 visits · last 12 Oct"), right: t("420 €", "€420") },
          { title: t("Mai Nguyễn", "Mai Nguyen"), sub: t("3 lần đến", "3 visits"), right: t("135 €", "€135") },
        ], m: 2 },
        { k: "button", label: t("Gửi lại cho khách", "Send again"), m: 3 },
      ],
    },
  },
  {
    id: "reminders",
    group: "daily",
    icon: "bell",
    title: t("Email tự động: xác nhận, nhắc lịch, mời đánh giá", "Automatic emails: confirmations, reminders, reviews"),
    why: t("Không cần cài đặt gì — hệ thống tự gửi đúng lúc, bằng ngôn ngữ của nước salon.", "Nothing to set up — sent at the right time, in your salon country's language."),
    href: "/business/dashboard/bookings",
    steps: [
      t("Khách đặt lịch → nhận email xác nhận kèm nút thêm vào Google Calendar và tệp lịch.", "A customer books → they get a confirmation with an add-to-calendar button and file."),
      t("Trước giờ hẹn 24 giờ, 2 giờ và 15 phút → email nhắc lịch kèm chỉ đường.", "24 hours, 2 hours and 15 minutes before → a reminder with directions."),
      t("Bạn dời lịch → khách nhận email giờ mới; khách tự hủy → cả hai nhận email.", "You move a booking → they're emailed; they cancel → you both get an email."),
      t("1 ngày sau buổi hẹn → email mời khách đánh giá.", "A day after the visit → a review request."),
    ],
    tips: [t("Lịch hẹn bạn tự thêm chỉ gửi email khi bạn tích \"Gửi email xác nhận và nhắc lịch cho khách hàng\".", "Bookings you add yourself only send emails if you tick \"Send confirmation and reminder emails\".")],
    screen: {
      page: t("Email tự động", "Automatic emails"),
      blocks: [
        { k: "list", rows: [
          { title: t("✓ Xác nhận đặt lịch", "✓ Booking confirmed"), right: t("Ngay", "Instantly") },
          { title: t("⏰ Nhắc lịch", "⏰ Reminder"), right: t("24h · 2h · 15p", "24h · 2h · 15m") },
          { title: t("↻ Dời lịch / ✕ Hủy", "↻ Moved / ✕ Cancelled"), right: t("Ngay", "Instantly") },
          { title: t("★ Mời đánh giá", "★ Review request"), right: t("+1 ngày", "+1 day") },
        ], m: 2 },
      ],
    },
  },
  {
    id: "reviews",
    group: "daily",
    icon: "star",
    title: t("Đánh giá và Google", "Reviews and Google"),
    why: t("Đánh giá thật từ khách đã đặt lịch giúp salon uy tín và được chọn nhiều hơn.", "Genuine reviews from real customers build trust and win more bookings."),
    href: "/business/dashboard/reviews",
    steps: [
      t("Vào Đánh giá — đánh giá mới ở trạng thái \"CHỜ DUYỆT\".", "Go to Reviews — new reviews are \"PENDING\"."),
      t("Bấm \"Công khai lên trang salon\" hoặc \"Ẩn đánh giá này\".", "Press \"Publish on salon page\" or \"Hide this review\"."),
      t("Nhập Google Place ID (Cài đặt → Liên hệ & mạng xã hội) để hệ thống mời khách chia sẻ lên Google.", "Add your Google Place ID (Settings → Contact & social) so customers are invited to share on Google."),
    ],
    tips: [t("Google không cho phép tặng quà để đổi đánh giá — chỉ mời khách chia sẻ trải nghiệm thật.", "Google forbids rewards for reviews — just invite honest feedback.")],
    screen: {
      page: t("Đánh giá", "Reviews"),
      blocks: [
        { k: "list", rows: [{ title: t("★★★★★ Anna", "★★★★★ Anna"), sub: t("Làm rất đẹp và nhẹ tay!", "Beautiful work and so gentle!"), right: t("CHỜ DUYỆT", "PENDING") }], m: 1 },
        { k: "button", label: t("Công khai lên trang salon", "Publish on salon page"), primary: true, m: 2 },
        { k: "field", label: t("Google Place ID", "Google Place ID"), value: t("ChIJN1t_tDeuEmsR…", "ChIJN1t_tDeuEmsR…"), m: 3 },
      ],
    },
  },

  /* ---------- Giữ khách ---------- */
  {
    id: "loyalty",
    group: "retain",
    icon: "qr",
    title: t("Thẻ tích điểm QR", "QR loyalty cards"),
    why: t("Không cần thẻ giấy: quét mã mỗi lần khách đến, đủ điểm là được ưu đãi — khách quay lại đều đặn.", "No paper cards: scan on every visit, and a reward unlocks when it's full — customers keep coming back."),
    href: "/business/dashboard/loyalty",
    steps: [
      t("Vào Thẻ tích điểm → \"Cài đặt chương trình\": nhập \"Số lần để được giảm giá\" và \"Giảm giá (%)\", bấm Lưu.", "Go to Loyalty cards → \"Program settings\": enter \"Visits for a reward\" and \"Discount (%)\", press Save."),
      t("\"Kích hoạt thẻ cho khách\": nhập tên và email khách, bấm \"Kích hoạt và gửi QR qua email\".", "\"Activate a card\": enter the customer's name and email, press \"Activate and email the QR\"."),
      t("Mỗi lần khách đến: \"Quét thẻ khi khách đến\" — quét QR bằng camera hoặc nhập mã, bấm \"Cộng 1 điểm\".", "On every visit: \"Scan when they visit\" — scan the QR with your camera or type the code, press \"Add 1 point\"."),
      t("Đủ điểm → áp dụng ưu đãi; thẻ về 0 và bắt đầu chu kỳ mới.", "Card full → apply the reward; it resets for the next cycle."),
    ],
    tips: [
      t("Mỗi lượt hẹn còn trên lịch (không hủy, không \"Không đến\") được quét một lần — không cần bấm Hoàn thành.", "Every booking still on the calendar (not cancelled or no-show) can be scanned once — no need to mark it completed."),
      t("Được quét bù tối đa 3 lượt khách làm trước ngày làm thẻ.", "Up to 3 visits from before the card was made can be scanned too."),
    ],
    screen: {
      page: t("Thẻ tích điểm", "Loyalty cards"),
      blocks: [
        { k: "row", items: [{ label: t("Số lần để được giảm giá", "Visits for a reward"), value: t("5", "5") }, { label: t("Giảm giá (%)", "Discount (%)"), value: t("15", "15") }], m: 1 },
        { k: "button", label: t("Kích hoạt và gửi QR qua email", "Activate and email the QR"), m: 2 },
        { k: "qr", label: t("Quét thẻ khi khách đến", "Scan when they visit"), m: 3 },
        { k: "button", label: t("Cộng 1 điểm", "Add 1 point"), primary: true, m: 3 },
      ],
    },
  },
  {
    id: "gift-cards",
    group: "retain",
    icon: "gift",
    title: t("Thẻ quà tặng", "Gift cards"),
    why: t("Khách mua tặng người thân — có thêm doanh thu và thêm khách mới, nhất là mùa lễ.", "Customers buy them as gifts — extra revenue and new customers, especially at holidays."),
    href: "/business/dashboard/gift-cards",
    steps: [
      t("Vào Thẻ quà tặng → \"Tạo mẫu thẻ\": tên, dịch vụ áp dụng, % giảm, giá bán, số ngày hiệu lực, số lần dùng.", "Go to Gift cards → \"Create a card template\": name, service, % off, price, validity days and uses."),
      t("Khách mua thẻ trên trang salon và nhận mã + QR qua email; thẻ kích hoạt khi bạn xác nhận đã nhận tiền.", "Customers buy on your salon page and get a code + QR by email; it activates once you confirm payment."),
      t("Tự bán tại quầy: \"Gửi thẻ quà tặng cho khách\" → nhập tên người nhận, email, lời nhắn, tích \"Khách đã thanh toán — kích hoạt thẻ ngay\", bấm \"Tạo ảnh thẻ & gửi email cho khách\".", "Sell at the counter: \"Send a gift card\" → recipient, email, message, tick \"Paid — activate now\", press \"Create the card & email it\"."),
      t("Khách đến dùng thẻ: nhập mã thẻ khi thanh toán, hoặc khách tự nhập khi đặt lịch online.", "Redeeming: enter the code at checkout, or the customer enters it when booking online."),
    ],
    screen: {
      page: t("Thẻ quà tặng", "Gift cards"),
      blocks: [
        { k: "button", label: t("Tạo mẫu thẻ", "Create a card template"), m: 1 },
        { k: "row", items: [{ label: t("Giá bán", "Price"), value: t("50 €", "€50") }, { label: t("Hiệu lực", "Valid"), value: t("180 ngày", "180 days") }], m: 1 },
        { k: "field", label: t("Lời nhắn trên thẻ", "Message on the card"), value: t("Chúc mừng sinh nhật!", "Happy birthday!"), m: 3 },
        { k: "toggle", label: t("Khách đã thanh toán — kích hoạt thẻ ngay", "Paid — activate now"), on: true, m: 3 },
        { k: "button", label: t("Tạo ảnh thẻ & gửi email cho khách", "Create the card & email it"), primary: true, m: 3 },
      ],
    },
  },
  {
    id: "marketing",
    group: "retain",
    icon: "mail",
    title: t("Email khuyến mãi và điểm Vara", "Offer emails and Vara points"),
    why: t("Lấp ghế trống ngày vắng: gửi ưu đãi cho khách cũ chỉ trong 2 phút, kèm nút đặt lịch.", "Fill quiet days: send an offer to past customers in two minutes, with a book button."),
    href: "/business/dashboard/marketing",
    steps: [
      t("Vào Marketing → \"Soạn email mới\": viết \"Tiêu đề email\" và \"Nội dung\".", "Go to Marketing → \"New email\": write the subject and message."),
      t("Bấm \"Gửi email\" và \"Xác nhận gửi\" — mỗi khách nhận tốn 1 điểm Vara.", "Press \"Send email\" and confirm — each recipient costs 1 Vara point."),
      t("Kiếm điểm: \"Điểm danh +5 điểm\" mỗi ngày, chia sẻ link giới thiệu làm chủ salon (+1000 điểm khi người được giới thiệu hoàn thiện hồ sơ).", "Earn points: daily \"Check in +5\", and share your owner referral link (+1000 when the salon you refer completes its profile)."),
    ],
    tips: [t("Khách đã nhận email trong 72 giờ sẽ được bỏ qua để tránh làm phiền.", "Customers emailed in the last 72 hours are skipped so they aren't bothered.")],
    screen: {
      page: t("Marketing", "Marketing"),
      blocks: [
        { k: "field", label: t("Tiêu đề email", "Email subject"), value: t("Ưu đãi 20% cho lượt hẹn tiếp theo!", "20% off your next visit!"), m: 1 },
        { k: "field", label: t("Nội dung", "Message"), value: t("Tháng này mọi dịch vụ chăm sóc da…", "This month every facial…"), m: 1 },
        { k: "button", label: t("Gửi email", "Send email"), primary: true, m: 2 },
        { k: "button", label: t("Điểm danh +5 điểm", "Check in +5 points"), m: 3 },
      ],
    },
  },
  {
    id: "products",
    group: "retain",
    icon: "bag",
    title: t("Bán sản phẩm và quản lý đơn hàng", "Sell products and manage orders"),
    why: t("Dưỡng, sơn, quà tặng — thêm nguồn thu ngay trên trang salon.", "Care products, polish, gifts — extra income right on your salon page."),
    href: "/business/dashboard/products",
    steps: [
      t("Vào Sản phẩm, bấm \"Thêm sản phẩm\": tên, giá, ảnh, mô tả.", "Go to Products and press \"Add product\": name, price, photos, description."),
      t("Sản phẩm hiện trên trang salon; khách thêm vào giỏ và đặt hàng.", "Products appear on your salon page; customers add them to a cart and order."),
      t("Vào Đơn hàng để xác nhận và xử lý từng đơn.", "Go to Orders to confirm and handle each order."),
    ],
    screen: {
      page: t("Sản phẩm", "Products"),
      blocks: [
        { k: "button", label: t("+ Thêm sản phẩm", "+ Add product"), primary: true, m: 1 },
        { k: "list", rows: [{ title: t("Dầu dưỡng móng", "Cuticle oil"), right: t("12 €", "€12") }, { title: t("Sơn gel màu nude", "Nude gel polish"), right: t("15 €", "€15") }], m: 2 },
        { k: "note", text: t("Đơn hàng mới: 2", "New orders: 2"), m: 3 },
      ],
    },
  },
  {
    id: "affiliates",
    group: "retain",
    icon: "handshake",
    title: t("Cộng tác viên giới thiệu khách", "Affiliates who send you customers"),
    why: t("Người giới thiệu khách nhận % hoa hồng — hệ thống tự theo dõi từng lịch hẹn.", "People who refer customers earn a commission — every booking is tracked for you."),
    href: "/business/dashboard/marketing/affiliates",
    steps: [
      t("Vào Marketing → Tiếp thị liên kết, bấm \"Thêm người tiếp thị mới\".", "Go to Marketing → Affiliates and press \"Add affiliate\"."),
      t("Nhập tên và \"Hoa hồng (%)\".", "Enter the name and \"Commission (%)\"."),
      t("Gửi link riêng cho họ; xem số lịch hẹn và tổng hoa hồng — bạn tự thanh toán bên ngoài hệ thống.", "Send them their link; see bookings and total commission — you pay them outside the system."),
    ],
    screen: {
      page: t("Tiếp thị liên kết", "Affiliates"),
      blocks: [
        { k: "button", label: t("Thêm người tiếp thị mới", "Add affiliate"), primary: true, m: 1 },
        { k: "row", items: [{ label: t("Tên", "Name"), value: t("Hà", "Ha") }, { label: t("Hoa hồng (%)", "Commission (%)"), value: t("10", "10") }], m: 2 },
        { k: "link", label: t("Link riêng", "Their link"), value: "varaaai.com/b/lumi-nails?aff=HA10", m: 3 },
      ],
    },
  },

  /* ---------- Mở rộng ---------- */
  {
    id: "branches",
    group: "grow",
    icon: "building",
    title: t("Nhiều chi nhánh", "Multiple branches"),
    why: t("Mọi chi nhánh trong một tài khoản, đổi qua lại một chạm, một trang đặt lịch chung.", "Every branch in one account, switch in one tap, one shared booking page."),
    href: "/business/apply?branch=1",
    steps: [
      t("Bấm \"Thêm chi nhánh\" (trên trang Cài đặt) và điền thông tin chi nhánh mới.", "Press \"Add branch\" (on Settings) and fill in the new branch."),
      t("Đổi chi nhánh đang quản lý bằng ô \"Chi nhánh\" ở đầu trang quản trị.", "Switch branches with the \"Branch\" picker at the top of the dashboard."),
      t("Dùng \"Trang đặt lịch chuỗi\" trong Cài đặt để khách chọn chi nhánh rồi đặt.", "Use the \"Chain booking page\" in Settings so customers pick a branch first."),
    ],
    screen: {
      page: t("Cài đặt", "Settings"),
      blocks: [
        { k: "button", label: t("+ Thêm chi nhánh", "+ Add branch"), m: 1 },
        { k: "chips", label: t("Chi nhánh", "Branch"), items: [t("Hakaniemi", "Hakaniemi"), t("Kamppi", "Kamppi"), t("Sörnäinen", "Sörnäinen")], m: 2 },
        { k: "link", label: t("Trang đặt lịch chuỗi", "Chain booking page"), value: "varaaai.com/embed/chain/lumi", m: 3 },
      ],
    },
  },
  {
    id: "overview",
    group: "grow",
    icon: "chart",
    title: t("Trang tổng quan", "The overview page"),
    why: t("Biết ngay salon làm ăn ra sao: doanh thu, lịch hôm nay, dịch vụ bán chạy, hiệu suất thợ.", "See how the salon is doing at a glance: revenue, today, top services, staff performance."),
    href: "/business/dashboard",
    steps: [
      t("Mở Tổng quan mỗi sáng: lịch hẹn hôm nay và các việc cần chú ý.", "Open the Overview every morning: today's bookings and what needs attention."),
      t("Xem doanh thu tháng, biểu đồ theo tuần/tháng và dịch vụ bán chạy.", "Check monthly revenue, weekly/monthly charts and top services."),
      t("Xem hiệu suất từng thợ, đánh giá mới và lượt quét mã QR từ poster/bảng giá.", "See each stylist's performance, new reviews and QR scans from posters and price lists."),
    ],
    screen: {
      page: t("Tổng quan", "Overview"),
      blocks: [
        { k: "row", items: [{ label: t("Doanh thu tháng này", "Revenue this month"), value: t("4 280 €", "€4,280") }, { label: t("Lịch hẹn hôm nay", "Today"), value: t("12", "12") }], m: 1 },
        { k: "list", rows: [{ title: t("Sơn gel tay", "Gel manicure"), right: t("38 lượt", "38") }, { title: t("Nối mi volume", "Volume lashes"), right: t("21 lượt", "21") }], m: 2 },
        { k: "note", text: t("Lượt quét QR (30 ngày): 64", "QR scans (30 days): 64"), m: 3 },
      ],
    },
  },
  {
    id: "tools",
    group: "grow",
    icon: "tools",
    title: t("Công cụ miễn phí: bảng giá, poster QR, kiểm tra salon", "Free tools: price list, QR poster, salon check"),
    why: t("In ấn chuyên nghiệp không cần thuê thiết kế — dùng ngay, không cần tài khoản.", "Professional print material without a designer — no account needed."),
    href: "/tools/price-list",
    steps: [
      t("Bảng giá: nhập dịch vụ (hoặc lấy từ salon), chọn mẫu, dịch tự động sang ngôn ngữ khác, tải PDF/PNG.", "Price list: enter services (or load them from your salon), pick a template, auto-translate, download PDF/PNG."),
      t("Poster QR: chọn kích thước (A4, A5, tem dán, bảng để bàn, story Instagram) và mẫu mùa lễ, tải về in.", "QR poster: pick a size (A4, A5, sticker, table tent, Instagram story) and a seasonal design, download and print."),
      t("Kiểm tra salon: xem salon trông thế nào trên mạng và danh sách việc nên làm.", "Salon check: see how your salon looks online and what to improve."),
    ],
    screen: {
      page: t("Công cụ miễn phí", "Free tools"),
      blocks: [
        { k: "list", rows: [
          { title: t("Bảng giá đa ngôn ngữ", "Multilingual price list"), right: t("PDF", "PDF") },
          { title: t("Poster \"Quét để đặt lịch\"", "\"Scan to book\" poster"), right: t("QR", "QR") },
          { title: t("Kiểm tra salon", "Salon check"), right: t("✓", "✓") },
        ], m: 1 },
        { k: "qr", label: t("Quét để đặt lịch", "Scan to book"), m: 2 },
      ],
    },
  },
];

export function tr(x: T, locale: string) {
  return locale === "vi" ? x.vi : x.en;
}
