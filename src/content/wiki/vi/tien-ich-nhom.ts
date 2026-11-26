import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tien-ich-nhom/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "dao-tao-nhan-vien-salon-chat-thong-bao",
  lesson: "tien-ich-nhom",
  category: "salon",
  title: "Đào tạo nhân viên salon: nhóm chat, thông báo nội bộ và thư viện bài đào tạo cho cả tiệm",
  metaTitle: "Đào tạo nhân viên salon: chat nhóm, thông báo, bài học",
  metaDescription:
    "Cách dùng mục Tiện ích của VaraaAi cho đội ngũ salon: nhắn trong nhóm chat, đăng thông báo có xác nhận đã đọc, soạn bài đào tạo bắt buộc và theo dõi ai đã học.",
  keyword: "đào tạo nhân viên salon",
  keywords: [
    "đào tạo thợ mới cho tiệm nail",
    "nhóm chat nội bộ cho salon",
    "thông báo nội quy cho nhân viên tiệm nail",
    "quy trình chuẩn của salon",
    "xác nhận đã đọc thông báo",
    "giao tiếp nội bộ trong salon",
    "bài đào tạo bắt buộc cho nhân viên",
  ],
  excerpt: "Một nơi chung cho chủ và nhân viên: trò chuyện trong nhóm, thông báo chính thức có xác nhận đã đọc, và thư viện bài đào tạo mở được trên điện thoại.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("doi-ngu-tho-lam-viec-trong-salon-toc-lon"),
    alt: "Nhiều thợ làm tóc đang đứng làm cho khách dọc dãy ghế trong một salon lớn có cửa vòm cao và đèn chùm",
  },
  takeaways: [
    "Mục **“Tiện ích”** có ba phần chính: “Nhóm chat”, “Thông báo” và “Đào tạo”.",
    "Nhóm **“Cả salon”** có sẵn mọi thành viên. Bấm “Trò chuyện mới” để nhắn riêng với một nhân viên.",
    "Thông báo có ba mức độ: **“Thông thường”, “Quan trọng”, “Khẩn cấp”**, và có thể ghim lên đầu.",
    "Bật **“Yêu cầu xác nhận đã đọc”** để biết ai đã đọc thông báo.",
    "Bài đào tạo chứa được các bước, link video YouTube và tài liệu đính kèm. Bật **“Bắt buộc”** để theo dõi ai đã hoàn thành.",
  ],
  intro: [
    "Ở phần lớn các tiệm, việc đào tạo nhân viên salon diễn ra bằng miệng: người cũ chỉ người mới giữa hai lượt khách, và mỗi người nhớ một kiểu. Thông báo đổi ca hay nội quy mới cũng đi theo đường đó, nên salon có nhiều nhân viên rất dễ rơi vào cảnh thông tin mỗi người nghe một khác.",
    "Bài viết này đi theo bài học “Tiện ích nhóm: chat, thông báo, đào tạo nhân viên” của VaraaAi Academy. Bạn sẽ biết cách dùng nhóm chat của tiệm, đăng một thông báo chính thức và biết ai đã đọc, soạn một bài đào tạo cho cả đội và theo dõi ai đã học xong.",
  ],
  sections: [
    {
      id: "vi-sao-can-noi-chung",
      title: "Vì sao tiệm có nhiều thợ cần một nơi chung cho giao tiếp nội bộ",
      blocks: [
        { p: "Tiệm ba bốn người còn nói với nhau trực tiếp được. Thêm người, thêm ca, thêm người làm bán thời gian thì không còn lúc nào cả đội có mặt cùng lúc. Chủ tiệm dặn buổi sáng, ca chiều không nghe. Người mới vào tuần trước không biết quy định đã nói từ tháng trước." },
        { p: "Nhiều tiệm dùng một nhóm trên ứng dụng nhắn tin cá nhân. Cách đó chạy được một thời gian, rồi lộ ra ba điểm yếu. Tin công việc lẫn với chuyện riêng. Thông báo quan trọng trôi mất sau vài chục tin. Và không ai biết chắc người kia đã đọc hay chưa." },
        { p: "Mục “Tiện ích” của VaraaAi là không gian làm việc chung của cả đội, tách khỏi tin nhắn cá nhân. Nó chia thông tin thành ba loại, mỗi loại một chỗ: trò chuyện hằng ngày ở “Nhóm chat”, tin chính thức ở “Thông báo”, và kiến thức nghề ở “Đào tạo”." },
        { img: { src: img("khong-gian-lam-viec-cua-salon-muc-tien-ich"), alt: "Trang tổng quan của mục Tiện ích với ô Không gian làm việc của salon được khoanh vàng, ghi số thành viên của đội", caption: "Trang tổng quan của mục “Tiện ích” cho biết đội ngũ đang có bao nhiêu thành viên." } },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi đưa cả đội vào dùng",
      blocks: [
        { p: "Trang tổng quan của mục “Tiện ích” cho thấy đội ngũ có bao nhiêu thành viên. Nếu con số đó chưa khớp với số người trong tiệm, hãy xem lại bài [thêm nhân viên và phân quyền](lesson:nhan-vien) trước." },
        { p: "Việc đáng làm nhất trước khi bắt đầu là thống nhất loại tin nào đặt ở đâu. Bảng dưới đây dựa trên cách bài học mô tả ba phần:" },
        {
          table: {
            head: ["Loại thông tin", "Đặt ở đâu", "Vì sao"],
            rows: [
              ["Trao đổi nhanh trong ngày, ảnh mẫu khách muốn làm", "“Nhóm chat”", "Cần trả lời ngay, đọc xong là xong"],
              ["Lịch làm việc, nội quy, sự kiện", "“Thông báo”", "Là tin chính thức của chủ salon, cần ở yên một chỗ"],
              ["Quy trình làm một dịch vụ, cách vệ sinh dụng cụ", "“Đào tạo”", "Dùng lâu dài, người mới vào vẫn phải đọc được"],
            ],
          },
        },
        { note: "Hãy nói rõ với cả tiệm ngay từ ngày đầu: điều gì đã lên “Thông báo” thì coi như ai cũng đã được báo. Quy ước này chỉ công bằng khi bạn thật sự đăng mọi tin chính thức ở đó.", kind: "tip", title: "Một quy ước cho cả tiệm" },
      ],
    },
    {
      id: "nhom-chat-noi-bo",
      title: "Nhóm chat nội bộ cho salon: dùng cho việc gì",
      blocks: [
        { p: "Trong “Nhóm chat” có sẵn nhóm “Cả salon”, nơi mọi thành viên tự động có mặt. Bạn không phải mời từng người, và người mới vào đội cũng không bị bỏ sót. Bạn gõ tin nhắn rồi bấm gửi, gửi được cả ảnh và video." },
        { p: "Ảnh và video là thứ làm nhóm chat có ích cho một tiệm làm đẹp. Thợ gửi ảnh bộ móng vừa xong để cả tiệm xem. Lễ tân gửi ảnh mẫu khách nhắn hỏi để hỏi ai làm được. Những trao đổi này cần nhanh, và không cần lưu lâu." },
        { p: "Nút “Trò chuyện mới” mở một cuộc nhắn riêng với một nhân viên. Dùng nó cho những việc chỉ liên quan đến một người, ví dụ góp ý về một ca làm hoặc bàn chuyện đổi ca. Góp ý riêng thì nói riêng, đó là phép lịch sự ở tiệm nào cũng cần." },
        { img: { src: img("go-tin-nhan-gui-ca-doi-trong-nhom-chat"), alt: "Màn hình nhóm chat với ô soạn tin đang ghi lời nhắn cho cả nhà và nút gửi hình mũi tên được khoanh vàng", caption: "Gõ tin nhắn rồi bấm nút gửi ở góc phải." } },
      ],
    },
    {
      id: "viet-thong-bao",
      title: "Thông báo cho nhân viên: ba mức độ, ghim và xác nhận đã đọc",
      blocks: [
        { p: "Phần “Thông báo” dành cho tin chính thức của chủ salon: lịch làm việc, nội quy, sự kiện. Khác với nhóm chat, một thông báo có tiêu đề, có mức độ và nằm yên trên bảng cho đến khi bạn sửa hoặc gỡ." },
        {
          table: {
            head: ["Mức độ", "Gợi ý dùng cho (ví dụ)"],
            rows: [
              ["“Thông thường”", "Tin cần biết nhưng không gấp, ví dụ một sự kiện của tiệm tháng sau"],
              ["“Quan trọng”", "Tin ảnh hưởng đến ca làm của mọi người, ví dụ lịch làm việc dịp lễ"],
              ["“Khẩn cấp”", "Việc phải biết ngay trong ngày, ví dụ tiệm đóng cửa đột xuất"],
            ],
          },
        },
        { p: "Bài học chỉ nêu tên ba mức độ. Cột ví dụ ở trên là gợi ý của bài viết. Điều cần giữ là dùng mức “Khẩn cấp” thật ít. Nếu tuần nào cũng có tin khẩn cấp thì chữ đó mất tác dụng." },
        { img: { src: img("thong-bao-da-dang-co-nhan-quan-trong"), alt: "Bảng thông báo với một thông báo về lịch làm việc tuần lễ Giáng sinh được khoanh vàng, có nhãn Quan trọng và Đã ghim", caption: "Thông báo mẫu trong video: lịch làm việc tuần lễ Giáng sinh, mức “Quan trọng”, đã ghim lên đầu." } },
        { p: "Hai công tắc bên dưới mức độ quyết định thông báo được đối xử ra sao. “Ghim lên đầu” giữ thông báo ở vị trí đầu bảng. “Yêu cầu xác nhận đã đọc” cho bạn biết ai đã đọc: nhân viên bấm xác nhận, và bạn thấy được ai đã xác nhận. Với nội quy và những thay đổi về ca làm, hãy bật công tắc này. Nó thay cho câu hỏi “em đọc chưa” mà bạn phải hỏi từng người." },
        { p: "Bạn cũng đính kèm được ảnh, video và tài liệu vào thông báo, ví dụ bảng phân ca dưới dạng ảnh." },
      ],
    },
    {
      id: "thu-vien-dao-tao",
      title: "Thư viện đào tạo nghề: cách soạn một bài đào tạo thợ mới",
      blocks: [
        { p: "Phần “Đào tạo” là thư viện nghề của salon. Mỗi bài có tên, chủ đề, các bước viết ra, và nếu muốn thì thêm link video YouTube hoặc tài liệu đính kèm. Nhân viên mở ra học trên điện thoại bất cứ lúc nào." },
        { img: { src: img("thu-vien-dao-tao-nghe-cua-salon"), alt: "Thư viện đào tạo với một thẻ bài học Quy trình Gel manicure chuẩn được khoanh vàng, ghi chủ đề Kỹ thuật dịch vụ và thời lượng", caption: "Bài đã lưu hiện thành một thẻ trong thư viện, ghi chủ đề và thời lượng." } },
        { p: "Khi soạn bài, bạn chọn một chủ đề. Trong video có các chủ đề: Kỹ thuật dịch vụ, Vệ sinh & an toàn, Chăm sóc khách, Sản phẩm, Nội quy salon, Bán hàng và Khác. Danh sách này cũng là gợi ý tốt về những gì một tiệm nên có bài đào tạo." },
        { p: "Một bài đào tạo dễ dùng thường ngắn và đi theo đúng thứ tự tay làm. Vài gợi ý khi viết:" },
        {
          ul: [
            "**Mỗi bài một việc.** Quy trình một dịch vụ là một bài, cách dọn bàn sau mỗi khách là một bài khác.",
            "**Viết thành các bước đánh số**, mỗi bước một hành động, theo cách tiệm bạn muốn mọi thợ làm giống nhau.",
            "**Ghi cả lý do** ở những bước hay bị bỏ qua. Người hiểu vì sao sẽ ít làm tắt hơn.",
            "**Thêm video nếu động tác khó tả bằng chữ.** Dán link YouTube vào ô dành cho video.",
          ],
        },
        { p: "Bạn không phải viết mọi thứ từ đầu. Các bài nghề của [VaraaAi Academy](/academy) có thể làm khung cho quy trình của tiệm, ví dụ bài [cách sơn gel](lesson:son-gel) cho kỹ thuật và bài [khử khuẩn dụng cụ](lesson:ve-sinh-dung-cu) cho vệ sinh. Bạn chỉnh lại theo sản phẩm và cách làm của tiệm mình." },
        { note: "Bật “Bắt buộc” cho những bài mọi nhân viên phải học, ví dụ vệ sinh và an toàn. Khi đó bạn theo dõi được ai đã hoàn thành. Đừng bật cho mọi bài, vì khi cái gì cũng bắt buộc thì không còn bài nào được ưu tiên.", kind: "info", title: "Bài nào nên bắt buộc" },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi dùng tiện ích nhóm",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Thông báo quan trọng bị các tin mới đẩy xuống", "Bật “Ghim lên đầu” cho thông báo đó"],
              ["Không chắc ai đã đọc nội quy mới", "Bật “Yêu cầu xác nhận đã đọc” khi đăng"],
              ["Muốn nói riêng với một người", "Bấm “Trò chuyện mới” trong “Nhóm chat”"],
              ["Thợ mới vào, chưa biết quy trình của tiệm", "Chỉ cho họ phần “Đào tạo”, bật “Bắt buộc” cho bài cần học trước"],
              ["Động tác khó giải thích bằng chữ", "Dán link video YouTube vào bài đào tạo"],
            ],
          },
        },
        { p: "Ba phần của mục “Tiện ích” hỗ trợ cho những việc khác trong tiệm. Khi bắt đầu dùng [kho vật tư](lesson:kho-hang), một bài đào tạo ngắn về cách quét nhập và quét lấy hàng giúp cả đội làm giống nhau. Khi đổi cách [nhân viên báo cáo doanh thu](lesson:doanh-thu-nhan-vien), một thông báo có yêu cầu xác nhận đã đọc bảo đảm không ai nói rằng mình chưa biết." },
      ],
    },
  ],
  howTo: {
    title: "Các bước dùng chat, thông báo và đào tạo nhân viên salon trên VaraaAi",
    id: "cac-buoc-dung-tien-ich-nhom",
    after: "chuan-bi",
    lead: "Bảy bước dưới đây đi lần lượt qua ba phần của mục “Tiện ích”, theo thứ tự trong video bài học.",
    steps: [
      {
        name: "Bấm mục “Tiện ích”",
        text: "Trong trang quản trị, bấm mục “Tiện ích”. Trang tổng quan cho thấy đội ngũ có bao nhiêu thành viên và ba phần chính: “Nhóm chat”, “Thông báo”, “Đào tạo”. Bấm vào từng phần để mở.",
      },
      {
        name: "Mở “Nhóm chat” và vào nhóm “Cả salon”",
        text: "Bấm “Nhóm chat”. Nhóm “Cả salon” có sẵn mọi thành viên, nên bạn không cần tạo nhóm hay mời ai. Bấm vào nhóm để mở cuộc trò chuyện.",
        image: { src: img("nhom-chat-ca-salon-va-nut-tro-chuyen-moi"), alt: "Phần Nhóm chat với nhóm Cả salon được khoanh vàng, phía trên là ô tìm cuộc trò chuyện và nút Trò chuyện mới" },
      },
      {
        name: "Gõ tin nhắn rồi bấm gửi",
        text: "Gõ tin nhắn vào ô soạn tin và bấm nút gửi. Bạn gửi được cả ảnh và video. Muốn nhắn riêng với một nhân viên, quay lại danh sách và bấm “Trò chuyện mới”.",
      },
      {
        name: "Bấm “Viết thông báo mới” và nhập nội dung",
        text: "Sang phần “Thông báo”, bấm “Viết thông báo mới”. Nhập tiêu đề và nội dung. Viết tiêu đề sao cho đọc xong là biết thông báo nói về việc gì, vì nhiều người chỉ đọc tiêu đề trước.",
        image: { src: img("viet-thong-bao-moi-cho-nhan-vien-salon"), alt: "Cửa sổ Viết thông báo mới với tiêu đề về lịch làm việc tuần lễ Giáng sinh và nội dung được khoanh vàng, bên dưới là ba mức độ" },
      },
      {
        name: "Chọn mức độ, ghim và yêu cầu xác nhận, rồi bấm “Đăng thông báo”",
        text: "Chọn một mức độ: “Thông thường”, “Quan trọng” hoặc “Khẩn cấp”. Bật “Ghim lên đầu” nếu thông báo cần nằm ở đầu bảng, và “Yêu cầu xác nhận đã đọc” nếu bạn cần biết ai đã đọc. Sau đó bấm “Đăng thông báo”.",
        image: { src: img("ghim-len-dau-va-yeu-cau-xac-nhan-da-doc"), alt: "Ba mức độ Thông thường, Quan trọng, Khẩn cấp, bên dưới là hai công tắc Ghim lên đầu và Yêu cầu xác nhận đã đọc được khoanh vàng" },
      },
      {
        name: "Bấm “Thêm bài đào tạo”, đặt tên, chọn chủ đề và viết các bước",
        text: "Sang phần “Đào tạo”, bấm “Thêm bài đào tạo”. Đặt tên bài, chọn chủ đề, rồi viết các bước hoặc dán link video YouTube. Viết theo đúng thứ tự làm thực tế trong tiệm để thợ mới làm theo được ngay.",
        image: { src: img("them-bai-dao-tao-chu-de-va-cac-buoc"), alt: "Trang thêm bài đào tạo với các chủ đề được khoanh vàng, bên dưới là ô dán link YouTube và sáu bước của một quy trình" },
      },
      {
        name: "Bật “Bắt buộc” nếu cần rồi bấm “Lưu bài học”",
        text: "Bật “Bắt buộc” nếu mọi nhân viên phải học bài này. Khi đó bạn theo dõi được ai đã hoàn thành. Bấm “Lưu bài học”, và nhân viên mở ra học trên điện thoại bất cứ lúc nào.",
        image: { src: img("bat-buoc-hoc-bai-dao-tao-nhan-vien"), alt: "Công tắc Bắt buộc được khoanh vàng kèm dòng mọi nhân viên phải học bài này, bên dưới là công tắc Hiển thị cho nhân viên và ô Thời lượng" },
      },
    ],
  },
  faq: [
    {
      q: "Mục “Tiện ích” của VaraaAi gồm những phần nào?",
      a: "Ba phần chính là “Nhóm chat”, “Thông báo” và “Đào tạo”. Đây là không gian làm việc chung của salon cho chủ và nhân viên, nơi cả đội trò chuyện, nhận thông báo và học nghề.",
    },
    {
      q: "Làm sao biết nhân viên nào đã đọc thông báo?",
      a: "Khi viết thông báo, bật “Yêu cầu xác nhận đã đọc”. Nhân viên bấm xác nhận sau khi đọc, và bạn thấy được ai đã đọc.",
    },
    {
      q: "Nên báo lịch làm việc và nội quy trong nhóm chat hay trong thông báo?",
      a: "Trong “Thông báo”. Phần này dành cho tin chính thức của chủ salon như lịch làm việc, nội quy và sự kiện. Bạn có thể chọn mức độ và ghim thông báo lên đầu để không bị trôi.",
    },
    {
      q: "Một bài đào tạo nhân viên có thể chứa những gì?",
      a: "Các bước viết ra, link video YouTube và tài liệu đính kèm. Nhân viên mở bài ra học trên điện thoại bất cứ lúc nào.",
    },
    {
      q: "Làm sao biết ai đã học xong bài đào tạo?",
      a: "Bật “Bắt buộc” khi soạn bài. Bài đó trở thành bài mọi nhân viên phải học, và bạn theo dõi được ai đã hoàn thành.",
    },
    {
      q: "Nhắn riêng với một nhân viên bằng cách nào?",
      a: "Trong “Nhóm chat”, bấm “Trò chuyện mới” để mở một cuộc nhắn riêng với nhân viên đó. Nhóm “Cả salon” thì dành cho tin gửi mọi thành viên.",
    },
  ],
  related: ["nhan-vien", "kho-hang", "chi-nhanh", "doanh-thu-nhan-vien"],
};

export default article;
