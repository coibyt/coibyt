import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/nhan-vien/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "quan-ly-nhan-vien-salon-phan-quyen",
  lesson: "nhan-vien",
  category: "salon",
  title: "Quản lý nhân viên salon: thêm thợ, chia dịch vụ và phân quyền xem cho từng người",
  metaTitle: "Quản lý nhân viên salon: thêm thợ, chia dịch vụ, phân quyền",
  metaDescription:
    "Cách thêm nhân viên vào trang đặt lịch của salon trên VaraaAi: hồ sơ, dịch vụ mỗi người làm, tài khoản đăng nhập và ba vai trò Kỹ thuật viên, Lễ tân, Quản lý.",
  keyword: "quản lý nhân viên salon",
  keywords: [
    "phân quyền nhân viên salon",
    "thêm nhân viên vào phần mềm đặt lịch",
    "lịch làm việc riêng cho từng thợ",
    "vai trò kỹ thuật viên, lễ tân, quản lý",
    "khách chọn thợ khi đặt lịch",
    "tài khoản đăng nhập cho nhân viên salon",
  ],
  excerpt: "Mỗi nhân viên có lịch riêng, dịch vụ riêng và quyền xem riêng. Khách chọn đúng người mình quen, còn bạn quyết định ai được xem gì.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-cat-toc-nam-dang-cat-cho-khach"),
    alt: "Một thợ cắt tóc nam có râu, mặc áo gile, đang cắt tóc cho khách trẻ ngồi trên ghế da trong tiệm sang trọng",
  },
  takeaways: [
    "Mỗi nhân viên trên VaraaAi có **lịch riêng, dịch vụ riêng và quyền xem riêng**.",
    "Khách chỉ đặt được một nhân viên cho đúng những dịch vụ bạn đã chọn ở **“Dịch vụ thực hiện”**.",
    "Email và mật khẩu chỉ cần nhập khi bạn muốn nhân viên **tự đăng nhập** xem lịch.",
    "Ba vai trò chọn nhanh: **Kỹ thuật viên** xem lịch của mình, **Lễ tân** xem lịch cả tiệm và khách hàng, **Quản lý** xem mọi mục.",
    "Trong danh sách, “Lịch làm việc” đặt giờ làm riêng cho từng người, “Cho nghỉ việc” dùng khi họ không còn làm.",
  ],
  intro: [
    "Quản lý nhân viên salon bằng sổ tay vẫn chạy được khi tiệm có hai người. Đến người thứ ba, thứ tư thì bắt đầu rối: ai làm được dịch vụ nào, ai nghỉ thứ mấy, ai được cầm danh sách số điện thoại của khách. Một trang đặt lịch tốt phải trả lời được cả ba câu đó cho từng người.",
    "Bài viết này đi theo bài học “Thêm nhân viên và phân quyền” của VaraaAi Academy. Bạn sẽ thêm được một nhân viên hoàn chỉnh, gắn đúng dịch vụ người đó làm, và chọn mức quyền xem phù hợp với công việc của họ.",
  ],
  sections: [
    {
      id: "vi-sao-moi-nguoi-mot-ho-so",
      title: "Vì sao mỗi thợ nên có hồ sơ riêng trên trang đặt lịch",
      blocks: [
        { p: "Trong nghề làm đẹp, khách quay lại vì người thợ nhiều hơn vì cái biển hiệu. Khách đã quen tay một người làm móng hay một người cắt tóc thì lần sau muốn đặt đúng người đó. Khi mỗi nhân viên có hồ sơ riêng, khách chọn được đúng người mình quen ngay lúc đặt lịch." },
        { p: "Hồ sơ riêng cũng giúp lịch của tiệm chính xác. Mỗi người có lịch của mình, nên hai khách không bị xếp trùng giờ vào cùng một thợ. Mỗi người chỉ gắn với những dịch vụ họ làm được, nên khách đặt nối mi sẽ không bị xếp cho người chỉ làm móng." },
        { p: "Điều thứ ba là quyền xem. Một tiệm có danh sách khách, doanh thu và nhiều thông tin mà không phải ai cũng cần thấy. Phân quyền theo từng người cho bạn giao việc mà vẫn giữ được phần cần giữ." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi thêm nhân viên vào phần mềm đặt lịch",
      blocks: [
        {
          ul: [
            "**Ảnh đại diện** rõ mặt của từng người. Khách nhìn ảnh để nhận ra thợ quen.",
            "**Tên** mà khách vẫn gọi ở tiệm, cùng **chức danh**, ví dụ thợ nail hay thợ mi.",
            "**Vài dòng giới thiệu** về sở trường của người đó.",
            "**Danh sách dịch vụ** người đó làm được một cách độc lập.",
            "**Email riêng của nhân viên**, nếu bạn muốn họ tự đăng nhập xem lịch.",
          ],
        },
        { p: "Bạn nên có menu dịch vụ trước, vì phần “Dịch vụ thực hiện” chọn trong số các dịch vụ đã tạo. Nếu chưa làm, xem bài [thêm dịch vụ và giá](lesson:dich-vu)." },
      ],
    },
    {
      id: "phan-quyen-vai-tro",
      title: "Phân quyền nhân viên salon: Kỹ thuật viên, Lễ tân, Quản lý",
      blocks: [
        { p: "Phần “Tài khoản & quyền truy cập” có ba vai trò để chọn nhanh. Mỗi vai trò là một bộ quyền xem đã được đặt sẵn:" },
        {
          table: {
            head: ["Vai trò", "Xem được gì", "Hợp với ai"],
            rows: [
              ["Kỹ thuật viên", "Chỉ lịch hẹn của chính mình", "Thợ nail, thợ tóc, thợ mi, kỹ thuật viên spa"],
              ["Lễ tân", "Lịch hẹn cả tiệm, khách hàng và thông tin liên hệ", "Người nghe điện thoại, xếp lịch và đón khách"],
              ["Quản lý", "Mọi mục", "Người thay bạn trông tiệm"],
            ],
          },
        },
        { p: "Nếu ba vai trò chưa khớp với cách tiệm bạn làm việc, hãy chỉnh từng công tắc ở phần “Được xem những mục nào”. Mỗi mục của trang quản trị là một công tắc riêng, ví dụ lịch hẹn, khách hàng, số điện thoại và email của khách, dịch vụ, giờ mở cửa." },
        { img: { src: img("bat-tat-muc-nhan-vien-duoc-xem"), alt: "Phần Được xem những mục nào với các công tắc Lịch hẹn, Khách hàng, Số điện thoại và email của khách, Dịch vụ, Sản phẩm", caption: "Mỗi dòng là một mục của trang quản trị. Gạt công tắc để cho xem hoặc không cho xem." } },
        { note: "Số điện thoại và email của khách là thứ nên mở cho ít người nhất. Hãy bắt đầu bằng mức thấp, ví dụ Kỹ thuật viên, rồi mở thêm khi công việc của người đó thật sự cần.", kind: "warn", title: "Thông tin của khách" },
      ],
    },
    {
      id: "dich-vu-thuc-hien",
      title: "“Dịch vụ thực hiện”: để khách chọn thợ đúng với dịch vụ",
      blocks: [
        { p: "Phần này quyết định nhân viên xuất hiện ở đâu trên trang đặt lịch. Khách chọn một dịch vụ, và trang chỉ hiện những nhân viên đã được chọn cho dịch vụ đó. Người không được đánh dấu sẽ không có trong danh sách." },
        { p: "Vì vậy chỉ đánh dấu những dịch vụ người đó tự làm trọn vẹn được. Một thợ mới đang học nối mi volume chưa nên nhận lịch volume một mình. Khi họ vững tay nghề, ví dụ sau khi học thêm qua các khóa học nghề trong [VaraaAi Academy](/academy), bạn bấm “Sửa” ở thẻ của họ và đánh dấu thêm." },
        { p: "Bạn cũng gắn được theo chiều ngược lại. Khi tạo hoặc sửa một dịch vụ, phần “Nhân viên thực hiện” cho chọn những người làm dịch vụ đó." },
      ],
    },
    {
      id: "danh-sach-nhan-vien",
      title: "Danh sách nhân viên: lịch làm việc riêng cho từng thợ và cho nghỉ việc",
      blocks: [
        { p: "Sau khi lưu, nhân viên mới hiện trong danh sách dưới dạng một thẻ. Thẻ ghi tên, chức danh, số lượt hẹn và doanh thu 30 ngày của người đó. Về tiền công của từng người, Academy có riêng bài [báo cáo thu nhập của nhân viên](lesson:doanh-thu-nhan-vien)." },
        { img: { src: img("nut-lich-lam-viec-cua-tung-nhan-vien"), alt: "Thẻ của một nhân viên trong danh sách với nút Sửa, nút Lịch làm việc được khoanh vàng và nút Cho nghỉ việc" } },
        {
          ul: [
            "**“Sửa”:** đổi ảnh, tên, dịch vụ hoặc quyền xem.",
            "**“Lịch làm việc”:** đặt giờ làm riêng cho người đó. Dùng cho người làm bán thời gian, hoặc người có ngày nghỉ khác với [giờ mở cửa chung của tiệm](lesson:gio-mo-cua).",
            "**“Cho nghỉ việc”:** dùng khi người đó không còn làm ở tiệm.",
          ],
        },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi thêm nhân viên",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Thợ không cần tự đăng nhập", "Bỏ trống email và mật khẩu. Thẻ nhân viên sẽ ghi “Chưa có tài khoản đăng nhập”"],
              ["Khách không thấy tên một thợ khi đặt dịch vụ", "Bấm “Sửa” và đánh dấu dịch vụ đó ở “Dịch vụ thực hiện”"],
              ["Thợ chỉ làm vài ngày trong tuần", "Bấm “Lịch làm việc” trên thẻ của người đó để đặt giờ làm riêng"],
              ["Lễ tân cần xem lịch của mọi người", "Chọn vai trò “Lễ tân” thay vì “Kỹ thuật viên”"],
              ["Một người đã nghỉ hẳn", "Bấm “Cho nghỉ việc” trên thẻ của người đó"],
            ],
          },
        },
        { p: "Khi đội ngũ đã đủ, bạn theo dõi lịch của cả tiệm ở mục [lịch hẹn](lesson:lich-hen) của trang quản trị." },
      ],
    },
  ],
  howTo: {
    title: "Các bước thêm nhân viên và phân quyền trên VaraaAi",
    id: "cac-buoc-them-nhan-vien",
    after: "chuan-bi",
    lead: "Bảy bước dưới đây đi từ trên xuống dưới của trang thêm nhân viên, theo đúng video bài học.",
    steps: [
      {
        name: "Mở mục “Nhân viên” và bấm “Thêm nhân viên”",
        text: "Trong trang quản trị, bấm mục “Nhân viên” trên thanh menu. Trang này gom hồ sơ, dịch vụ, lịch làm việc và quyền truy cập của từng người vào một nơi. Bấm nút “Thêm nhân viên”.",
        image: { src: img("muc-nhan-vien-va-nut-them-nhan-vien"), alt: "Trang Nhân viên của salon trong trang quản trị VaraaAi với nút màu vàng Thêm nhân viên và số nhân viên đang làm việc" },
      },
      {
        name: "Điền phần “Hồ sơ”",
        text: "Tải ảnh đại diện lên, nhập “Tên nhân viên”, “Chức danh” và vài dòng “Giới thiệu”. Dùng tên mà khách vẫn gọi ở tiệm để họ nhận ra người quen.",
        image: { src: img("ho-so-nhan-vien-anh-ten-chuc-danh"), alt: "Phần Hồ sơ của nhân viên với nút tải ảnh đại diện, ô Tên nhân viên được khoanh vàng và ô Chức danh" },
      },
      {
        name: "Chọn “Dịch vụ thực hiện”",
        text: "Bấm chọn những dịch vụ người này làm được. Khách chỉ đặt được nhân viên cho đúng các dịch vụ đó, nên hãy bỏ qua những dịch vụ họ chưa làm một mình được.",
        image: { src: img("chon-dich-vu-thuc-hien-cho-nhan-vien"), alt: "Phần Dịch vụ thực hiện với các dịch vụ đã được đánh dấu như Gel manicure, Gel pedicure, Classic lashes và nút Chọn tất cả" },
      },
      {
        name: "Cấp tài khoản đăng nhập nếu cần",
        text: "Ở phần “Tài khoản & quyền truy cập”, nhập email và mật khẩu nếu bạn muốn nhân viên tự đăng nhập xem lịch của mình. Mật khẩu cần tối thiểu 8 ký tự. Khi được cấp tài khoản, nhân viên nhận một email chào mừng có hướng dẫn đăng nhập. Không cần thì bỏ trống cả hai ô.",
        image: { src: img("tao-tai-khoan-dang-nhap-cho-nhan-vien"), alt: "Phần Tài khoản và quyền truy cập với ô email và ô mật khẩu tối thiểu 8 ký tự được khoanh vàng" },
      },
      {
        name: "Chọn nhanh theo vai trò",
        text: "Chọn một trong ba vai trò: “Kỹ thuật viên” chỉ xem lịch của mình, “Lễ tân” xem lịch cả tiệm, khách hàng và thông tin liên hệ, “Quản lý” xem được mọi mục. Chọn theo công việc thật của người đó, không theo thâm niên.",
        image: { src: img("vai-tro-ky-thuat-vien-le-tan-quan-ly"), alt: "Ba vai trò chọn nhanh Kỹ thuật viên, Lễ tân và Quản lý, vai trò Lễ tân được khoanh vàng kèm mô tả quyền xem" },
      },
      {
        name: "Bật tắt từng mục ở “Được xem những mục nào”",
        text: "Nếu cần khác với vai trò có sẵn, gạt từng công tắc để cho xem hoặc không cho xem mục đó. Ví dụ bạn có thể cho một thợ xem lịch hẹn nhưng tắt phần số điện thoại và email của khách.",
      },
      {
        name: "Bấm “Lưu”",
        text: "Bấm “Lưu”. Nhân viên mới hiện trong danh sách, kèm số lượt hẹn và doanh thu 30 ngày. Lặp lại các bước cho từng người trong tiệm.",
        image: { src: img("the-nhan-vien-luot-hen-doanh-thu"), alt: "Thẻ nhân viên trong danh sách hiện tên, chức danh, giờ làm hôm nay, số lượt hẹn, doanh thu và số dịch vụ" },
      },
    ],
  },
  faq: [
    {
      q: "Kỹ thuật viên, Lễ tân và Quản lý trên VaraaAi khác nhau thế nào?",
      a: "Kỹ thuật viên chỉ xem được lịch hẹn của chính mình. Lễ tân xem lịch cả tiệm, khách hàng và thông tin liên hệ. Quản lý xem được mọi mục. Bạn vẫn bật tắt được từng mục ở phần “Được xem những mục nào”.",
    },
    {
      q: "Nhân viên có bắt buộc phải có tài khoản đăng nhập không?",
      a: "Không. Email và mật khẩu chỉ cần nhập khi bạn muốn nhân viên tự đăng nhập xem lịch của mình. Nếu bỏ trống, nhân viên vẫn có trong danh sách của tiệm.",
    },
    {
      q: "Vì sao phải chọn “Dịch vụ thực hiện” cho từng nhân viên?",
      a: "Vì trang đặt lịch chỉ hiện nhân viên đã được chọn cho dịch vụ khách muốn làm. Nhờ vậy khách chỉ đặt được mỗi người cho đúng những dịch vụ người đó làm.",
    },
    {
      q: "Đặt giờ làm riêng cho một nhân viên ở đâu?",
      a: "Trong danh sách nhân viên, bấm nút “Lịch làm việc” ngay trên thẻ của người đó. Tại đây bạn đặt giờ làm riêng cho từng người.",
    },
    {
      q: "Nhân viên nghỉ việc thì làm gì trên phần mềm?",
      a: "Trong danh sách nhân viên, bấm “Cho nghỉ việc” trên thẻ của người đó. Nút này dành cho trường hợp nhân viên không còn làm ở tiệm.",
    },
    {
      q: "Nhân viên có xem được số điện thoại của khách không?",
      a: "Tùy quyền bạn cấp. Kỹ thuật viên chỉ xem lịch hẹn của mình, còn Lễ tân xem được khách hàng và thông tin liên hệ. Phần “Được xem những mục nào” có công tắc riêng cho số điện thoại và email của khách.",
    },
  ],
  related: ["dich-vu", "gio-mo-cua", "lich-hen", "doanh-thu-nhan-vien"],
};

export default article;
