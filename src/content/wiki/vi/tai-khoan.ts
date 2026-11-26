import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tai-khoan/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "tao-tai-khoan-dat-lich-lam-dep",
  lesson: "tai-khoan",
  category: "booking",
  title: "Cách tạo tài khoản đặt lịch làm đẹp trên VaraaAi: đăng ký, đăng nhập và lấy lại mật khẩu",
  metaTitle: "Tạo tài khoản đặt lịch làm đẹp VaraaAi trong 1 phút",
  metaDescription:
    "Hướng dẫn tạo tài khoản đặt lịch làm đẹp trên VaraaAi: đăng ký miễn phí trong một phút, đăng nhập, lấy lại mật khẩu khi quên và các mục có trong tài khoản.",
  keyword: "tạo tài khoản đặt lịch làm đẹp",
  keywords: [
    "đăng ký tài khoản VaraaAi",
    "cách đăng nhập VaraaAi",
    "quên mật khẩu VaraaAi",
    "lấy lại mật khẩu tài khoản đặt lịch",
    "tài khoản VaraaAi có mất phí không",
    "đổi email và mật khẩu tài khoản",
  ],
  excerpt: "Đăng ký miễn phí trong một phút, đăng nhập, lấy lại mật khẩu khi quên, và biết từng mục trong tài khoản dùng để làm gì.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-thu-gian-tai-spa-sau-khi-co-tai-khoan-varaaai"),
    alt: "Khách nữ mặc áo choàng trắng ngồi thư giãn bên hồ nước trong spa sang trọng, nhân viên mang khay trà đến",
  },
  takeaways: [
    "Tạo tài khoản VaraaAi **miễn phí** và mất khoảng một phút.",
    "Bạn cần nhập năm ô: “Họ và tên”, “Email”, “Số điện thoại”, “Mật khẩu” và “Xác nhận mật khẩu”.",
    "Việc nhận tin khuyến mãi là do bạn chọn: “Qua email”, “Qua tin nhắn văn bản”, cả hai hoặc không cái nào.",
    "Quên mật khẩu thì bấm “Quên mật khẩu?”, nhập email và làm theo **liên kết đặt lại** được gửi về hộp thư.",
    "Sau khi đăng nhập, bấm vào **tên bạn ở góc trên** để mở mọi mục của tài khoản, trong đó “Hồ sơ của tôi” là nơi đổi email và mật khẩu.",
  ],
  intro: [
    "Tạo tài khoản đặt lịch làm đẹp trên VaraaAi chỉ mất khoảng một phút và không tốn phí. Có tài khoản, bạn xem lại được lịch hẹn của mình, tự hủy lịch khi bận, nhận thẻ tích điểm của salon quen và nhắn tin với salon mà không cần gọi điện.",
    "Bài viết đi theo bài học “Tạo tài khoản và đăng nhập” trong VaraaAi Academy. Đọc xong, bạn đăng ký được tài khoản, đăng nhập lại ở những lần sau, tự lấy lại mật khẩu khi quên và biết từng mục trong tài khoản dùng vào việc gì.",
  ],
  sections: [
    {
      id: "tai-khoan-de-lam-gi",
      title: "Tài khoản VaraaAi dùng để làm gì",
      blocks: [
        { p: "Trang đặt lịch cho bạn tìm salon và xem giá mà không cần đăng nhập. Tài khoản bắt đầu có ích từ lúc bạn có một lịch hẹn: mọi thứ liên quan đến lịch đó được giữ ở một chỗ, và bạn tự xử lý được phần lớn việc mà trước đây phải gọi cho tiệm." },
        {
          ul: [
            "**Xem lại lịch hẹn:** ngày giờ, dịch vụ, địa chỉ salon nằm trong mục [Lịch hẹn của tôi](lesson:lich-hen-cua-toi).",
            "**Hủy lịch khi bận:** bạn tự hủy trong thời hạn salon cho phép, không cần nhờ ai.",
            "**Nhận thẻ tích điểm:** salon quen kích hoạt [thẻ thành viên](lesson:the-thanh-vien) cho bạn, và thẻ nằm trong tài khoản.",
            "**Nhắn tin với salon:** hỏi giá, hỏi chỗ trống hoặc dặn dò trước khi đến qua [khung chat với salon](lesson:chat-voi-salon).",
          ],
        },
        { note: "Nếu bạn đã đặt lịch trên VaraaAi và điền họ tên, số điện thoại, email cùng một mật khẩu ở bước điền thông tin, tài khoản của bạn đã được tạo ngay lúc đó. Bạn không cần đăng ký lần nữa, chỉ cần đăng nhập bằng email và mật khẩu ấy.", kind: "info", title: "Đã từng đặt lịch?" },
      ],
    },
    {
      id: "cac-muc-trong-tai-khoan",
      title: "Các mục trong tài khoản sau khi đăng nhập",
      blocks: [
        { p: "Đăng nhập xong, tên của bạn hiện ở góc trên của trang. Bấm vào tên, một danh sách sáu mục mở ra. Đây là lối vào mọi thứ thuộc về bạn trên VaraaAi." },
        {
          table: {
            head: ["Mục", "Dùng để làm gì"],
            rows: [
              ["Hồ sơ của tôi", "Đổi ảnh đại diện, email và mật khẩu"],
              ["Lịch hẹn của tôi", "Xem thông tin từng lịch hẹn, hủy lịch và viết đánh giá sau khi làm xong"],
              ["Thẻ tích điểm", "Mở thẻ thành viên của các salon quen, xem số vé và mã QR"],
              ["Hộp thư", "Xem lại các cuộc trò chuyện với salon"],
              ["Đang theo dõi", "Danh sách salon bạn đã bấm theo dõi"],
              ["Bảng tin", "Bài viết mới của những salon bạn theo dõi"],
            ],
          },
        },
        { img: { src: img("khach-mo-tai-khoan-varaaai-tren-dien-thoai"), alt: "Cô gái tóc vàng quàng khăn màu mận ngồi bên cửa sổ quán cà phê, đang xem điện thoại cạnh tách cà phê", caption: "Mọi mục của tài khoản đều mở được trên điện thoại, sau một lần bấm vào tên bạn." } },
        { p: "Trong sáu mục này, “Hồ sơ của tôi” là mục bạn nên mở một lần ngay sau khi đăng ký để kiểm tra email đã đúng chưa. Email sai một ký tự thì thư xác nhận lịch hẹn và liên kết đặt lại mật khẩu sẽ không đến được với bạn." },
      ],
    },
    {
      id: "chon-email-va-mat-khau",
      title: "Chọn email và mật khẩu thế nào để về sau đỡ rắc rối",
      blocks: [
        { p: "Email là thứ quan trọng nhất trong tài khoản. Bạn đăng nhập bằng email, nhận xác nhận lịch hẹn qua email, và khi quên mật khẩu thì liên kết đặt lại cũng được gửi về đó. Vì vậy hãy dùng địa chỉ bạn mở thường xuyên trên điện thoại, không dùng hộp thư cũ đã lâu không vào." },
        { p: "Với mật khẩu, bạn phải gõ hai lần, ở ô “Mật khẩu” và ô “Xác nhận mật khẩu”. Hai ô phải giống nhau từng ký tự, nên hãy gõ chậm và để ý phím viết hoa. Một mật khẩu riêng cho VaraaAi, không trùng với mật khẩu email hay ngân hàng, là thói quen an toàn cho mọi tài khoản trên mạng." },
        { note: "Ở cuối biểu mẫu có câu hỏi bạn muốn nhận tin nhắn và thông báo tiếp thị bằng cách nào, với hai ô “Qua email” và “Qua tin nhắn văn bản”. Bạn thích biết ưu đãi của salon thì để dấu chọn, không thích thì bỏ dấu chọn trước khi bấm “Tạo tài khoản”.", kind: "tip", title: "Tin khuyến mãi là lựa chọn của bạn" },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi đăng ký và đăng nhập",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Quên mật khẩu", "Ở trang đăng nhập, bấm “Quên mật khẩu?”, nhập email rồi bấm “Gửi liên kết đặt lại”. Mở email và làm theo hướng dẫn để chọn mật khẩu mới"],
              ["Chờ mãi không thấy email đặt lại", "Xem lại bạn đã gõ đúng địa chỉ email dùng lúc đăng ký chưa, và tìm trong thư mục thư rác của hộp thư"],
              ["Lỡ mở trang đăng ký trong khi đã có tài khoản", "Bấm “Đăng nhập” ở dòng “Đã có tài khoản?” phía dưới nút “Tạo tài khoản”"],
              ["Mở trang đăng nhập nhưng chưa có tài khoản", "Bấm “Đăng ký ngay” ở dòng “Chưa có tài khoản?” dưới nút “Đăng nhập”"],
              ["Muốn đổi email hoặc mật khẩu", "Đăng nhập, bấm vào tên bạn ở góc trên, mở “Hồ sơ của tôi”"],
              ["Muốn đổi ảnh đại diện", "Cũng trong “Hồ sơ của tôi”"],
            ],
          },
        },
        { p: "Tạo một tài khoản mới chỉ vì quên mật khẩu là cách xử lý không nên chọn. Lịch hẹn, thẻ tích điểm và tin nhắn với salon gắn với tài khoản cũ, nên lấy lại mật khẩu của tài khoản đó mới là đường ngắn nhất." },
      ],
    },
    {
      id: "sau-khi-dang-ky",
      title: "Đăng ký xong thì làm gì tiếp",
      blocks: [
        { p: "Việc đầu tiên thường là giữ một chỗ ở salon. Bạn mở trang [tìm salon](/search), chọn dịch vụ và khu vực, rồi làm theo bài [đặt lịch làm đẹp online](lesson:dat-lich-online). Vì đã đăng nhập, bạn không phải điền lại thông tin cá nhân ở bước cuối." },
        { p: "Nếu bạn đặt lịch thường xuyên, hãy [cài app VaraaAi lên điện thoại](lesson:cai-app) để mở nhanh từ màn hình chính. Còn khi đã có salon ruột, bạn có thể [theo dõi salon](lesson:theo-doi-salon) để bài viết mới của tiệm hiện trong “Bảng tin” của mình." },
      ],
    },
  ],
  howTo: {
    title: "Các bước tạo tài khoản, đăng nhập và lấy lại mật khẩu",
    id: "cac-buoc-tao-tai-khoan",
    after: "tai-khoan-de-lam-gi",
    lead: "Ba bước đầu là đăng ký, làm một lần duy nhất. Ba bước sau là những việc bạn sẽ lặp lại: đăng nhập và lấy lại mật khẩu khi quên.",
    steps: [
      {
        name: "Bấm “Đăng ký” ở góc trên bên phải",
        text: "Mở [varaaai.com](/) trên điện thoại hoặc máy tính. Ở góc trên bên phải có hai nút “Đăng nhập” và “Đăng ký”. Bấm “Đăng ký”, trang “Tạo tài khoản mới” mở ra.",
        image: { src: img("bam-dang-ky-de-tao-tai-khoan-varaaai"), alt: "Màn hình VaraaAi với nút Đăng ký được khoanh ở góc trên bên phải và biểu mẫu Tạo tài khoản mới bên dưới" },
      },
      {
        name: "Điền thông tin của bạn",
        text: "Nhập lần lượt “Họ và tên”, “Email”, “Số điện thoại”, “Mật khẩu” và “Xác nhận mật khẩu”. Hãy dùng email bạn đang dùng thật, vì xác nhận lịch hẹn và liên kết đặt lại mật khẩu đều gửi về đó. Ô xác nhận phải trùng với ô mật khẩu.",
        image: { src: img("dien-thong-tin-tao-tai-khoan-moi"), alt: "Biểu mẫu Tạo tài khoản mới với các ô Họ và tên, Email, Số điện thoại, Mật khẩu và Xác nhận mật khẩu" },
      },
      {
        name: "Chọn cách nhận tin khuyến mãi rồi bấm “Tạo tài khoản”",
        text: "Dưới các ô nhập là hai lựa chọn “Qua email” và “Qua tin nhắn văn bản”. Đánh dấu cách bạn muốn nhận tin khuyến mãi, hoặc bỏ dấu chọn nếu không muốn nhận. Sau đó bấm “Tạo tài khoản”. Dòng chữ nhỏ bên dưới cho biết khi tiếp tục là bạn đồng ý với Điều khoản sử dụng và Chính sách bảo mật của VaraaAi.",
        image: { src: img("chon-nhan-tin-khuyen-mai-va-bam-tao-tai-khoan"), alt: "Phần cuối biểu mẫu đăng ký với hai ô chọn Qua email, Qua tin nhắn văn bản và nút Tạo tài khoản" },
      },
      {
        name: "Đăng nhập ở những lần sau",
        text: "Lần sau vào VaraaAi, bấm “Đăng nhập” ở góc trên. Ở trang “Đăng nhập vào VaraaAi”, nhập “Email” và “Mật khẩu” đã đăng ký rồi bấm nút “Đăng nhập”. Khi tên bạn hiện ở góc trên là bạn đã vào tài khoản.",
        image: { src: img("dang-nhap-varaaai-bang-email-va-mat-khau"), alt: "Trang Đăng nhập vào VaraaAi với ô Email, ô Mật khẩu được khoanh vàng và nút Đăng nhập" },
      },
      {
        name: "Quên mật khẩu: bấm “Quên mật khẩu?”",
        text: "Không nhớ mật khẩu thì đừng đoán nhiều lần. Ngay trên ô “Mật khẩu” của trang đăng nhập có dòng “Quên mật khẩu?”. Bấm vào đó để mở trang “Đặt lại mật khẩu”.",
        image: { src: img("bam-quen-mat-khau-o-trang-dang-nhap"), alt: "Trang đăng nhập VaraaAi với dòng Quên mật khẩu được khoanh vàng ở bên phải ô Mật khẩu" },
      },
      {
        name: "Gửi liên kết đặt lại và chọn mật khẩu mới",
        text: "Nhập email của tài khoản vào ô “Email” rồi bấm “Gửi liên kết đặt lại”. Mở hộp thư, tìm email vừa nhận và làm theo hướng dẫn trong đó để chọn mật khẩu mới. Xong, bạn quay lại trang đăng nhập và vào bằng mật khẩu mới.",
        image: { src: img("gui-lien-ket-dat-lai-mat-khau"), alt: "Trang Đặt lại mật khẩu với ô nhập Email và nút Gửi liên kết đặt lại được khoanh vàng" },
      },
    ],
  },
  faq: [
    {
      q: "Tạo tài khoản VaraaAi có mất phí không?",
      a: "Không. Khách hàng tạo tài khoản và dùng VaraaAi hoàn toàn miễn phí. Bạn chỉ trả tiền dịch vụ cho salon nơi bạn làm đẹp.",
    },
    {
      q: "Có bắt buộc phải đăng ký trước rồi mới đặt lịch được không?",
      a: "Không bắt buộc. Khi đặt lịch lần đầu, bạn nhập họ tên, số điện thoại, email và một mật khẩu ở bước điền thông tin, và tài khoản được tạo luôn. Đăng ký trước chỉ giúp bước đó nhanh hơn vì bạn đã đăng nhập sẵn.",
    },
    {
      q: "Quên mật khẩu VaraaAi thì lấy lại thế nào?",
      a: "Ở trang đăng nhập, bấm “Quên mật khẩu?”, nhập email của tài khoản rồi bấm “Gửi liên kết đặt lại”. VaraaAi gửi một liên kết về email đó, bạn mở email và làm theo hướng dẫn để chọn mật khẩu mới.",
    },
    {
      q: "Đổi email hoặc mật khẩu tài khoản ở đâu?",
      a: "Đăng nhập, bấm vào tên bạn ở góc trên và chọn “Hồ sơ của tôi”. Trong mục này bạn đổi được ảnh đại diện, email và mật khẩu.",
    },
    {
      q: "Đăng ký rồi có bị gửi tin quảng cáo không?",
      a: "Bạn tự quyết định. Khi đăng ký, biểu mẫu hỏi bạn muốn nhận tin khuyến mãi “Qua email” hay “Qua tin nhắn văn bản”. Bỏ dấu chọn ở cả hai ô nếu bạn không muốn nhận.",
    },
    {
      q: "Sau khi đăng nhập, tìm lịch hẹn và thẻ tích điểm của mình ở đâu?",
      a: "Bấm vào tên bạn ở góc trên của trang. Danh sách mở ra gồm “Hồ sơ của tôi”, “Lịch hẹn của tôi”, “Thẻ tích điểm”, “Hộp thư”, “Đang theo dõi” và “Bảng tin”. Lịch hẹn và thẻ nằm ở mục thứ hai và thứ ba.",
    },
  ],
  related: ["dat-lich-online", "cai-app", "lich-hen-cua-toi", "chat-voi-salon"],
};

export default article;
