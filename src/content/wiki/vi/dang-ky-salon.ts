import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dang-ky-salon/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "phan-mem-dat-lich-cho-salon-mien-phi",
  lesson: "dang-ky-salon",
  category: "salon",
  title: "Phần mềm đặt lịch cho salon miễn phí: cách đăng ký và kích hoạt salon trên VaraaAi",
  metaTitle: "Phần mềm đặt lịch cho salon miễn phí: đăng ký trong vài phút",
  metaDescription:
    "Hướng dẫn chủ tiệm nail, tóc, mi, spa đăng ký salon trên VaraaAi: tạo tài khoản, nhập thông tin tiệm, chọn quốc gia và xác minh email là salon hoạt động ngay.",
  keyword: "phần mềm đặt lịch cho salon miễn phí",
  keywords: [
    "đăng ký salon trên VaraaAi",
    "cách tạo trang đặt lịch online cho tiệm nail",
    "phần mềm đặt lịch cho tiệm nail",
    "đưa salon lên mạng miễn phí",
    "đăng ký salon có phải chờ duyệt không",
    "phần mềm đặt lịch cho tiệm tóc, spa",
  ],
  excerpt: "Tạo tài khoản, nhập thông tin tiệm, chọn đúng quốc gia rồi xác minh email. Salon hoạt động ngay, không phải chờ duyệt và không mất phí.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("salon-lam-dep-dong-khach-nhan-dat-lich-online"),
    alt: "Bên trong một salon tóc sang trọng với cửa sổ vòm cao, nhiều thợ đang làm tóc cho khách ngồi trên ghế tím",
  },
  takeaways: [
    "Đăng ký salon trên VaraaAi **miễn phí** và chỉ mất vài phút, làm được ngay trên điện thoại.",
    "Bấm **“Xác minh email”** trong thư VaraaAi gửi là salon hoạt động ngay, không phải chờ ai duyệt.",
    "Ô **“Quốc gia”** quyết định múi giờ của lịch hẹn, nên hãy chọn nước nơi tiệm đang mở cửa.",
    "Chưa thấy thư xác minh thì xem thư mục Spam hoặc Quảng cáo trước khi làm bất cứ điều gì khác.",
    "Sau khi kích hoạt, bấm “Vào trang quản trị” để thêm dịch vụ, nhân viên và giờ mở cửa.",
  ],
  intro: [
    "Chủ tiệm thường đi tìm một phần mềm đặt lịch cho salon miễn phí vào đúng cái ngày điện thoại reo lúc tay đang cầm cọ sơn, còn tin nhắn hỏi giờ thì đến lúc nửa đêm. Khi tiệm có trang đặt lịch riêng, khách tự chọn dịch vụ và giờ còn trống, ngày cũng như đêm, và bạn không tốn phí hằng tháng cho việc đó.",
    "Bài viết này đi theo bài học “Đăng ký và kích hoạt salon” của VaraaAi Academy. Đọc xong, bạn biết cần chuẩn bị gì trước khi mở trang đăng ký, tự điền được từng ô, và hiểu vì sao một lựa chọn nhỏ như “Quốc gia” lại ảnh hưởng đến mọi lịch hẹn sau này.",
  ],
  sections: [
    {
      id: "vi-sao-can-trang-dat-lich",
      title: "Vì sao tiệm nail, tóc, mi, spa nên có trang đặt lịch online",
      blocks: [
        { p: "Nhiều khách chỉ rảnh để nghĩ đến chuyện làm móng hay làm tóc vào buổi tối, lúc tiệm đã đóng cửa. Nếu cách duy nhất để hẹn là gọi điện, họ phải nhớ gọi lại vào sáng hôm sau, và không ít người quên. Với trang đặt lịch, khách giữ chỗ ngay lúc họ nghĩ đến." },
        { p: "Về phía tiệm, mỗi cuộc gọi hỏi “mai còn chỗ không” là một lần người thợ phải dừng tay, tháo găng, mở sổ. Trang đặt lịch trả lời thay bạn: khách thấy dịch vụ, giá và những giờ còn trống thật rồi tự chọn. Bạn có thể xem toàn bộ quá trình này từ phía khách trong bài [đặt lịch làm đẹp online](lesson:dat-lich-online)." },
        { p: "Với chủ tiệm người Việt ở nước ngoài, lợi ích còn rõ hơn. Khách tự đọc tên dịch vụ, tự chọn ngày giờ trên màn hình, nên hai bên bớt được những cuộc gọi phải nói bằng ngôn ngữ thứ hai." },
        { p: "VaraaAi miễn phí cho chủ salon và cho cả khách đặt lịch. Việc đăng ký cũng không qua bước xét duyệt: bạn điền thông tin, xác minh email, và salon hoạt động ngay." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Cần chuẩn bị gì trước khi đăng ký salon",
      blocks: [
        { p: "Trang đăng ký chỉ có hai phần, tài khoản của bạn và thông tin salon. Để điền một mạch không phải dừng lại tìm, hãy có sẵn những thứ sau:" },
        {
          ul: [
            "**Một địa chỉ email bạn mở được ngay.** Thư xác minh gửi về đây, và salon chỉ được kích hoạt khi bạn bấm vào nút trong thư.",
            "**Tên doanh nghiệp** viết đúng như trên biển hiệu, để khách nhìn tên ngoài cửa rồi tìm trên mạng vẫn ra đúng tiệm.",
            "**Vài dòng giới thiệu ngắn:** tiệm làm gì, điểm gì khiến khách quay lại.",
            "**Địa chỉ đầy đủ**, thành phố và quốc gia nơi tiệm đang hoạt động.",
            "**Số điện thoại của tiệm**, số mà khách gọi được trong giờ mở cửa.",
            "**Danh mục dịch vụ chính** của tiệm, ví dụ nail, tóc hay spa.",
          ],
        },
        { note: "Hãy viết phần giới thiệu trước trong ứng dụng ghi chú rồi dán vào. Bài học về [hồ sơ salon](lesson:ho-so-salon) khuyên phần này nên dài từ 80 ký tự trở lên, nên viết cẩn thận một lần ngay từ đầu sẽ đỡ phải sửa sau.", kind: "tip", title: "Mẹo nhỏ" },
      ],
    },
    {
      id: "quoc-gia-va-mui-gio",
      title: "Ô “Quốc gia” và múi giờ của lịch hẹn",
      blocks: [
        { p: "Trong cả trang đăng ký, đây là ô dễ bị chọn vội nhất. VaraaAi dùng quốc gia bạn chọn để đặt múi giờ cho salon, và mọi giờ hẹn về sau hiển thị theo múi giờ đó. Chọn sai nước thì giờ trên lịch không còn khớp với đồng hồ treo trong tiệm." },
        { p: "Nếu bạn là người Việt mở tiệm ở nước ngoài, hãy chọn nước nơi tiệm đang mở cửa, không phải quê nhà. Khách đặt lịch là người sống quanh tiệm, và giờ họ thấy phải là giờ địa phương của họ." },
        { note: "Dòng chú thích ngay dưới ô “Quốc gia” cho biết bạn có thể đổi lại sau trong phần Cài đặt. Dù vậy, nên chọn đúng từ đầu, trước khi có lịch hẹn đầu tiên.", kind: "info", title: "Lỡ chọn nhầm thì sao" },
      ],
    },
    {
      id: "sau-khi-kich-hoat",
      title: "Sau khi kích hoạt: việc cần làm tiếp trong trang quản trị",
      blocks: [
        { p: "Nút “Vào trang quản trị” đưa bạn đến nơi điều hành salon. Lúc này salon đã hoạt động nhưng trang còn trống: chưa có dịch vụ để khách chọn, chưa có người làm, chưa có giờ mở cửa. Các bài học tiếp theo trong khóa đầu tiên của Học viện hướng dẫn từng phần, theo thứ tự nên làm:" },
        {
          ol: [
            "[Hoàn thiện hồ sơ salon](lesson:ho-so-salon): logo, ảnh bìa và thông tin liên hệ.",
            "[Thêm dịch vụ và giá](lesson:dich-vu): tên, thời lượng và giá tiền của từng dịch vụ.",
            "[Thêm nhân viên](lesson:nhan-vien) và chọn dịch vụ mỗi người làm được.",
            "[Đặt giờ mở cửa và ngày nghỉ](lesson:gio-mo-cua), vì khách chỉ đặt được lịch trong giờ mở cửa.",
            "[Đặt chính sách hủy lịch và cách nhận thanh toán](lesson:thanh-toan-chinh-sach).",
          ],
        },
        { img: { src: img("le-tan-don-khach-tai-quay-salon"), alt: "Lễ tân mặc vest tím đón một khách nữ mặc áo khoác kem tại quầy đá của salon, phía sau có khách ngồi chờ", caption: "Khi dịch vụ, nhân viên và giờ mở cửa đã có đủ, khách đặt online đến tiệm đúng giờ như mọi khách hẹn khác." } },
        { p: "Làm xong năm việc này, bạn có thể [chia sẻ link đặt lịch](lesson:chia-se-link) lên Facebook, Instagram hoặc gửi thẳng cho khách quen." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi đăng ký salon",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Gửi đăng ký rồi mà chưa thấy email", "Xem thư mục Spam hoặc Quảng cáo. Thư xác minh đôi khi rơi vào đó"],
              ["Đã có tài khoản VaraaAi từ lúc đặt lịch với tư cách khách", "Bấm “Đăng nhập” ở cuối trang đăng ký thay vì tạo tài khoản mới"],
              ["Tiệm làm nhiều loại dịch vụ", "Ở “Danh mục dịch vụ”, chọn loại dịch vụ chính của tiệm"],
              ["Chưa nghĩ ra phần giới thiệu hay", "Viết vài dòng thật về tiệm trước. Bạn sửa lại được khi hoàn thiện hồ sơ"],
              ["Không chắc đã chọn đúng quốc gia", "Kiểm tra lại trước khi bấm “Gửi đăng ký”, vì quốc gia quyết định múi giờ của lịch"],
            ],
          },
        },
        { p: "Nếu vẫn vướng ở bước nào, bạn mở trang [VaraaAi cho salon](/business) để xem lại phần giới thiệu, hoặc gửi câu hỏi qua trang [hỗ trợ](/support)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước đăng ký phần mềm đặt lịch cho salon trên VaraaAi",
    id: "cac-buoc-dang-ky-salon",
    after: "chuan-bi",
    lead: "Bảy bước dưới đây đi theo đúng thứ tự màn hình trong video bài học. Tên nút và tên ô trong ngoặc kép là chữ bạn sẽ thấy trên trang.",
    steps: [
      {
        name: "Mở varaaai.com và bấm dòng dành cho chủ salon",
        text: "Trên trang chủ [varaaai.com](/), tìm dòng “Bạn là chủ salon? Đưa salon lên VaraaAi miễn phí” và bấm vào. Dòng này nằm ngay dưới ô tìm kiếm, phía trên phần “Duyệt theo danh mục”.",
        image: { src: img("bam-ban-la-chu-salon-tren-trang-chu-varaaai"), alt: "Trang chủ VaraaAi trên máy tính bảng với dòng Bạn là chủ salon, đưa salon lên VaraaAi miễn phí được khoanh vàng" },
      },
      {
        name: "Bấm “Đăng ký salon miễn phí”",
        text: "Trang dành cho chủ salon mở ra. Bấm nút màu cam “Đăng ký salon miễn phí” để đến trang đăng ký. Ngay dưới nút có dòng ghi rõ không cần thẻ tín dụng.",
        image: { src: img("nut-dang-ky-salon-mien-phi"), alt: "Trang VaraaAi dành cho chủ salon với nút màu cam Đăng ký salon miễn phí và dòng Không cần thẻ tín dụng" },
      },
      {
        name: "Tạo tài khoản của bạn",
        text: "Nếu chưa có tài khoản, phần đầu trang là “Tạo tài khoản của bạn”. Nhập “Họ và tên”, “Email”, “Mật khẩu” và “Xác nhận mật khẩu”. Hãy dùng email bạn mở được ngay trên điện thoại, vì bước cuối cần đến nó. Tài khoản này vừa là tài khoản chủ salon, vừa là tài khoản khách của bạn trên VaraaAi.",
        image: { src: img("tao-tai-khoan-chu-salon"), alt: "Biểu mẫu Tạo tài khoản của bạn với các ô Họ và tên, Email, Mật khẩu và Xác nhận mật khẩu được khoanh vàng" },
      },
      {
        name: "Nhập tên, giới thiệu và danh mục của salon",
        text: "Kéo xuống phần thông tin salon. Nhập “Tên doanh nghiệp”, viết vài dòng ở “Giới thiệu ngắn”, rồi chọn “Danh mục dịch vụ”, ví dụ nail, tóc hay spa. Tên doanh nghiệp là tên khách sẽ thấy, nên viết đúng chính tả và đúng như biển hiệu.",
        image: { src: img("nhap-ten-doanh-nghiep-va-danh-muc-dich-vu"), alt: "Phần thông tin salon trên trang đăng ký với ô Tên doanh nghiệp, Giới thiệu ngắn và danh sách Danh mục dịch vụ" },
      },
      {
        name: "Nhập địa chỉ, quốc gia, thành phố và số điện thoại",
        text: "Điền “Địa chỉ”, chọn “Quốc gia”, nhập “Thành phố” và “Số điện thoại”. Dừng lại một giây ở ô “Quốc gia”: nó quyết định múi giờ của lịch hẹn, nên phải là nước nơi tiệm đang hoạt động.",
        image: { src: img("chon-quoc-gia-thanh-pho-cho-salon"), alt: "Ô Quốc gia và Thành phố trên trang đăng ký salon, kèm chú thích quốc gia dùng để đặt múi giờ cho salon" },
      },
      {
        name: "Kiểm tra lại rồi bấm “Gửi đăng ký”",
        text: "Đọc lại một lượt từ trên xuống, nhất là địa chỉ email và quốc gia. Mọi thứ đúng rồi thì bấm nút “Gửi đăng ký” ở cuối trang.",
        image: { src: img("bam-gui-dang-ky-salon"), alt: "Cuối trang đăng ký salon với ô Thành phố, Số điện thoại và nút màu đen Gửi đăng ký được khoanh vàng" },
      },
      {
        name: "Xác minh email và vào trang quản trị",
        text: "VaraaAi gửi cho bạn một email. Mở thư và bấm “Xác minh email”, salon được kích hoạt ngay. Chưa thấy thư thì xem thư mục Spam hoặc Quảng cáo. Sau đó bấm “Vào trang quản trị” để bắt đầu thêm dịch vụ, nhân viên và giờ mở cửa.",
        image: { src: img("xac-minh-email-kich-hoat-salon"), alt: "Một phụ nữ tóc xoăn ngồi trên sofa mỉm cười nhìn điện thoại, bên cạnh có dấu tích vàng báo đã xác minh email" },
      },
    ],
  },
  faq: [
    {
      q: "Đăng ký salon trên VaraaAi có mất phí không?",
      a: "Không. VaraaAi miễn phí cho chủ salon và cho khách đặt lịch, bạn không trả phí hằng tháng. Trang dành cho chủ salon cũng ghi rõ việc đăng ký không cần thẻ tín dụng.",
    },
    {
      q: "Gửi đăng ký xong bao lâu thì salon hoạt động?",
      a: "Ngay khi bạn bấm “Xác minh email” trong thư VaraaAi gửi. Không có bước chờ duyệt vài ngày, nên bạn có thể đăng ký và bắt đầu thêm dịch vụ trong cùng một buổi.",
    },
    {
      q: "Không nhận được email xác minh thì làm thế nào?",
      a: "Trước hết hãy xem thư mục Spam hoặc Quảng cáo của hộp thư, vì email đôi khi rơi vào đó. Bạn không cần đăng ký lại từ đầu chỉ vì chưa thấy thư ở hộp thư chính.",
    },
    {
      q: "Vì sao phải chọn đúng quốc gia khi đăng ký salon?",
      a: "Quốc gia quyết định múi giờ của lịch hẹn, và giờ hẹn hiển thị theo múi giờ đó. Hãy chọn nước nơi tiệm đang mở cửa để giờ trên lịch khớp với giờ thật ở tiệm.",
    },
    {
      q: "Tôi đã có tài khoản khách trên VaraaAi, có phải tạo tài khoản mới không?",
      a: "Không. Phần “Tạo tài khoản của bạn” dành cho người chưa có tài khoản. Nếu đã có, bạn bấm “Đăng nhập” ở cuối trang đăng ký. Một tài khoản dùng được cho cả vai trò chủ salon và vai trò khách.",
    },
    {
      q: "Đăng ký xong thì khách đã đặt lịch được chưa?",
      a: "Salon hoạt động ngay sau khi xác minh email, nhưng khách cần có dịch vụ để chọn và chỉ đặt được trong giờ mở cửa. Vì vậy hãy vào trang quản trị thêm dịch vụ, nhân viên và giờ mở cửa trước khi gửi link cho khách.",
    },
  ],
  related: ["ho-so-salon", "dich-vu", "nhan-vien", "gio-mo-cua"],
};

export default article;
