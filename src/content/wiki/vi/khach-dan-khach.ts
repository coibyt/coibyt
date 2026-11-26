import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khach-dan-khach/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "chuong-trinh-gioi-thieu-ban-be-cho-salon",
  lesson: "khach-dan-khach",
  category: "marketing",
  title: "Chương trình giới thiệu bạn bè cho salon: khách quen gửi link mời, bạn đến tiệm, người giới thiệu nhận 2 vé",
  metaTitle: "Chương trình giới thiệu bạn bè cho salon, tiệm nail",
  metaDescription:
    "Cách chạy chương trình giới thiệu bạn bè cho tiệm nail, tóc, spa trên VaraaAi: link mời có sẵn trong thẻ tích điểm, ghi nhớ 60 ngày, thưởng 2 vé khi bạn đến.",
  keyword: "chương trình giới thiệu bạn bè cho salon",
  keywords: [
    "khách dẫn khách",
    "khách cũ giới thiệu khách mới cho tiệm nail",
    "link mời bạn bè đặt lịch",
    "thưởng cho khách giới thiệu bạn",
    "marketing truyền miệng cho spa",
    "cách có thêm khách mới cho tiệm nail",
    "giới thiệu bạn bè nhận vé thưởng",
  ],
  excerpt: "Mỗi thẻ tích điểm có sẵn một link mời riêng. Bạn bè đặt lịch qua link và đến salon lần đầu, người giới thiệu tự động nhận 2 vé. Salon không phải cài thêm gì.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("hai-nguoi-ban-om-chao-nhau-trong-salon"),
    alt: "Hai người phụ nữ ôm chào nhau vui vẻ trong một salon sáng màu, phía sau có hai vị khách ngồi trên ghế cầm cốc cà phê",
  },
  takeaways: [
    "Mỗi thẻ tích điểm của khách **có sẵn một link mời riêng**. Bạn không phải cài thêm gì.",
    "Khách mở thẻ, kéo xuống phần “Mời bạn bè” rồi bấm “Sao chép link mời” hoặc “Chia sẻ”.",
    "Link được **ghi nhớ 60 ngày**: người bạn đặt lịch muộn hơn trong khoảng đó vẫn được tính.",
    "Người giới thiệu nhận **2 vé** khi người bạn thật sự đến salon lần đầu, không phải lúc gửi link.",
    "Chỉ tính khách mới lần đầu đến tiệm, và khách không thể tự mời chính mình.",
  ],
  intro: [
    "Một chương trình giới thiệu bạn bè cho salon trả lời câu hỏi mà chủ tiệm nào cũng từng tự hỏi: quảng cáo nào hiệu quả nhất mà gần như không tốn tiền. Câu trả lời là khách quen kể với bạn bè. Điều còn thiếu thường chỉ là một cách dễ để họ làm việc đó, và một lời cảm ơn khi họ làm.",
    "Bài viết này đi theo bài học “Khách dẫn khách: khách quen mang khách mới tới” của VaraaAi Academy. Bạn sẽ hiểu link mời nằm ở đâu, người bạn thấy gì khi mở link, vé thưởng được cộng lúc nào, và nên nhắc khách ra sao để chương trình thật sự chạy.",
  ],
  sections: [
    {
      id: "vi-sao-khach-dan-khach",
      title: "Vì sao khách cũ giới thiệu khách mới là kênh đáng làm nhất của tiệm",
      blocks: [
        { p: "Làm móng, làm tóc, nối mi là dịch vụ làm trên chính cơ thể mình, nên lời của một người bạn nặng ký hơn mọi tấm quảng cáo. Một người bạn nói “tiệm này làm kỹ lắm” đã trả lời hộ nỗi lo lớn nhất của khách mới." },
        { p: "Chương trình khách dẫn khách của VaraaAi có hai điểm hợp với tiệm nhỏ:" },
        {
          ul: [
            "**Chỉ thưởng khi có khách thật.** Vé thưởng được cộng khi người bạn đã đến salon. Không có khách mới thì salon không tốn gì.",
            "**Không cần ai theo dõi bằng tay.** Hệ thống tự biết ai giới thiệu ai qua link, tự cộng vé và tự gửi email báo cho người giới thiệu.",
          ],
        },
        { p: "Phần thưởng là vé của chính thẻ tích điểm, nên chương trình này là một nhánh của chương trình khách hàng thân thiết mà tiệm đã có, không phải một hệ thống riêng phải quản lý thêm." },
      ],
    },
    {
      id: "can-gi-de-bat-dau",
      title: "Cần gì để bắt đầu: thẻ tích điểm đã bật và đã kích hoạt cho khách",
      blocks: [
        { p: "Bạn không phải cài thêm gì cho riêng việc mời bạn bè. Chỉ cần hai điều đã có:" },
        {
          ol: [
            "Salon đã bật chương trình thẻ tích điểm trong trang quản trị.",
            "Khách đã được kích hoạt thẻ.",
          ],
        },
        { p: "Khi hai điều này xong, link mời nằm sẵn trong thẻ của từng người. Cách cài chương trình và kích hoạt thẻ được hướng dẫn từng bước trong bài [chương trình khách hàng thân thiết cho salon](lesson:the-tich-diem)." },
        { note: "Càng nhiều khách có thẻ thì càng nhiều người có link mời trong tay. Vì vậy việc đáng làm trước tiên là kích hoạt thẻ cho những khách quen nhất của tiệm, những người sẵn lòng nói tốt về bạn.", kind: "tip", title: "Bắt đầu từ khách quen nhất" },
      ],
    },
    {
      id: "quy-tac-thuong-ve",
      title: "Thưởng cho khách giới thiệu bạn: 2 vé, 60 ngày và ai được tính",
      blocks: [
        { p: "Khách sẽ hỏi bạn về luật chơi, nên cả tiệm cần trả lời giống nhau. Toàn bộ quy tắc gói trong bảng sau:" },
        {
          table: {
            head: ["Câu hỏi", "Quy tắc"],
            rows: [
              ["Người giới thiệu được gì?", "2 vé, cộng tự động vào thẻ tích điểm"],
              ["Vé được cộng khi nào?", "Khi người bạn thật sự đến salon lần đầu. Không phải lúc gửi link, cũng không phải lúc bạn bấm vào link"],
              ["Người bạn phải đặt lịch trong bao lâu?", "Link được ghi nhớ 60 ngày, đặt muộn hơn một chút vẫn được tính"],
              ["Ai được tính là khách được giới thiệu?", "Chỉ khách mới, lần đầu đến tiệm"],
              ["Tự mời chính mình được không?", "Không"],
              ["Người giới thiệu biết bằng cách nào?", "Hệ thống gửi email báo tin khi vé được cộng"],
            ],
          },
        },
        { p: "Hai vé nặng hay nhẹ là tùy chương trình của tiệm. Ví dụ, nếu tiệm đặt 5 lần đến thì được giảm giá, một lần giới thiệu thành công đưa khách đi được gần nửa đường. Đó là một lời cảm ơn đủ lớn để khách muốn gửi link." },
      ],
    },
    {
      id: "nguoi-ban-thay-gi",
      title: "Link mời bạn bè đặt lịch: người bạn thấy gì khi mở",
      blocks: [
        { p: "Người bạn không rơi vào một trang đăng ký lạnh lùng. Link mở ra một lời mời có tên của khách quen, tên và địa chỉ salon, cùng một dòng giải thích rằng đặt lịch qua link này thì salon biết ai đã giới thiệu." },
        { img: { src: img("trang-loi-moi-co-ten-nguoi-gioi-thieu"), alt: "Trang lời mời ghi Nam mời bạn đến Lumi Beauty Paris kèm địa chỉ được khoanh vàng, bên dưới là nút vàng Đặt lịch ngay", caption: "Lời mời mang tên người giới thiệu. Người bạn biết ngay ai đã gửi và tiệm ở đâu." } },
        { p: "Ngay dưới nút “Đặt lịch ngay” là phần dịch vụ nổi bật của salon, mỗi dịch vụ có thời lượng và giá. Người bạn xem được tiệm làm gì và hết bao nhiêu trước khi quyết định." },
        { img: { src: img("dich-vu-noi-bat-tren-trang-loi-moi"), alt: "Phần Dịch vụ nổi bật trên trang lời mời liệt kê Gel manicure, Gel pedicure, Classic lashes kèm số phút và giá bằng euro", caption: "Dịch vụ nổi bật lấy từ menu dịch vụ của salon." } },
        { p: "Trang lời mời dùng chính tên, địa chỉ và dịch vụ bạn đã nhập cho salon. Một menu rõ tên và đúng giá, như trong bài [menu dịch vụ salon](lesson:dich-vu), cùng một [hồ sơ salon](lesson:ho-so-salon) có ảnh đẹp sẽ làm lời mời của khách quen thuyết phục hơn." },
      ],
    },
    {
      id: "nhac-khach-o-quay",
      title: "Marketing truyền miệng cho spa, tiệm nail: nhắc khách lúc nào và nói gì",
      blocks: [
        { p: "Link mời có sẵn không có nghĩa là khách biết đến nó. Khách thường mở thẻ chỉ để đưa mã QR ra quét, và có thể chưa từng kéo xuống dưới. Việc của tiệm là chỉ cho họ một lần." },
        { p: "Bài học khuyên nhắc khách ở quầy, lúc khách vừa làm đẹp xong và đang vui nhất. Đó là lúc họ ngắm bộ móng mới hay mái tóc mới trong gương, và cũng là lúc họ dễ nghĩ đến một người bạn nên thử." },
        {
          ul: [
            "**Chỉ tận tay.** Khi quét thẻ cộng vé, nói khách kéo xuống phần “Mời bạn bè” và bấm thử “Sao chép link mời”.",
            "**Nói rõ phần thưởng.** Ví dụ một câu ngắn: “Chị gửi link này cho bạn, bạn đến làm lần đầu là thẻ chị tự có thêm hai vé”.",
            "**Đặt một bảng nhỏ ở quầy** ghi “Giới thiệu bạn bè, nhận 2 vé”, để khách đọc được cả khi nhân viên đang bận.",
          ],
        },
        { p: "Bạn cũng có thể gửi cho khách bài [thẻ thành viên salon](lesson:the-thanh-vien), viết cho phía khách, trong đó có phần mời bạn bè." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp với chương trình khách dẫn khách",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Giải thích"],
            rows: [
              ["Khách đã gửi link mà chưa thấy vé", "Vé chỉ được cộng khi người bạn thật sự đến salon lần đầu, không phải lúc gửi link"],
              ["Người bạn mở link từ tháng trước, nay mới đặt", "Link được ghi nhớ 60 ngày. Đặt trong khoảng đó vẫn được tính"],
              ["Khách giới thiệu một người vốn đã là khách của tiệm", "Không được tính. Chỉ khách mới, lần đầu đến tiệm, mới được tính"],
              ["Khách không tìm thấy link mời", "Khách mở thẻ tích điểm của mình và kéo xuống phần “Mời bạn bè”"],
              ["Khách chưa có thẻ", "Kích hoạt thẻ cho khách trước. Link mời nằm sẵn trong thẻ"],
            ],
          },
        },
        { p: "Khách mới đến từ lời giới thiệu cũng nên được kích hoạt thẻ ngay ở lần đầu. Họ vừa thấy bạn mình được thưởng, nên họ hiểu chương trình nhanh hơn bất kỳ ai, và có thể trở thành người giới thiệu tiếp theo. Muốn có thêm một kênh kéo khách mới qua người quen, xem bài [bán thẻ quà tặng cho salon](lesson:the-qua-tang-salon)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước chạy chương trình giới thiệu bạn bè cho salon",
    id: "cac-buoc-khach-dan-khach",
    after: "can-gi-de-bat-dau",
    lead: "Năm bước dưới đây đi theo đường của một lời mời, từ thẻ của khách quen đến lúc vé thưởng được cộng.",
    steps: [
      {
        name: "Bật thẻ tích điểm và kích hoạt thẻ cho khách",
        text: "Cài chương trình thẻ tích điểm trong trang quản trị và kích hoạt thẻ cho khách. Bạn không cần bật thêm tính năng nào: link mời đã nằm sẵn trong thẻ của từng người.",
        image: { src: img("the-cua-khach-trong-danh-sach-khach-co-the"), alt: "Danh sách Khách có thẻ trong trang quản trị với thẻ của khách Nam được khoanh vàng, ghi 1 trên 5 vé và nút Chi tiết" },
      },
      {
        name: "Chỉ cho khách phần “Mời bạn bè”",
        text: "Nhờ khách mở thẻ của mình và kéo xuống phần “Mời bạn bè”. Phần này ghi rõ: khi bạn bè đặt lịch qua link và đến salon lần đầu, khách tự động nhận thêm 2 vé.",
        image: { src: img("phan-moi-ban-be-trong-the-cua-khach"), alt: "Phần Mời bạn bè trong thẻ của khách được khoanh vàng, có nhãn cộng 2 vé, nút vàng Sao chép link mời và nút chia sẻ" },
      },
      {
        name: "Khách bấm “Sao chép link mời” hoặc “Chia sẻ”",
        text: "Khách bấm “Sao chép link mời” để dán link vào nơi mình muốn, hoặc bấm “Chia sẻ” để gửi qua tin nhắn hay mạng xã hội. Mỗi khách có một link riêng, nên hệ thống biết ai là người giới thiệu.",
        image: { src: img("nut-chia-se-link-moi-ban-be"), alt: "Nút chia sẻ hình tròn bên phải nút Sao chép link mời được khoanh vàng trong phần Mời bạn bè của thẻ" },
      },
      {
        name: "Người bạn mở link và bấm “Đặt lịch ngay”",
        text: "Người bạn mở link, thấy lời mời có tên của khách cùng các dịch vụ nổi bật của salon. Họ bấm “Đặt lịch ngay”, chọn dịch vụ và giờ. Link được ghi nhớ 60 ngày, nên đặt muộn hơn một chút vẫn được tính.",
        image: { src: img("ban-be-bam-dat-lich-ngay"), alt: "Trang lời mời đến Lumi Beauty Paris với nút vàng Đặt lịch ngay được khoanh vàng, phía trên là lời giới thiệu của khách Nam" },
      },
      {
        name: "Người bạn đến salon, người giới thiệu nhận 2 vé",
        text: "Khi người bạn đến salon lần đầu, hệ thống tự cộng 2 vé cho người giới thiệu và gửi email báo tin. Bạn không phải bấm gì. Lần tới gặp khách quen, một lời cảm ơn trực tiếp sẽ khiến họ muốn giới thiệu thêm.",
      },
    ],
  },
  faq: [
    {
      q: "Chương trình giới thiệu bạn bè cho salon trên VaraaAi có cần cài đặt riêng không?",
      a: "Không. Bạn chỉ cần đã bật chương trình thẻ tích điểm và kích hoạt thẻ cho khách. Link mời nằm sẵn trong thẻ của từng người.",
    },
    {
      q: "Người giới thiệu nhận được gì khi bạn bè đến salon?",
      a: "Người giới thiệu nhận 2 vé trên thẻ tích điểm. Hệ thống tự cộng vé và gửi email báo cho người giới thiệu.",
    },
    {
      q: "Vé thưởng được cộng lúc nào?",
      a: "Khi người bạn thật sự đến salon lần đầu. Vé không được cộng lúc gửi link hay lúc người bạn bấm vào link, nên salon không tốn gì nếu không có khách mới.",
    },
    {
      q: "Link mời bạn bè có hiệu lực trong bao lâu?",
      a: "Link được ghi nhớ 60 ngày. Người bạn đặt lịch muộn hơn trong vòng 60 ngày vẫn được tính cho người giới thiệu.",
    },
    {
      q: "Khách có tự mời chính mình để lấy vé được không?",
      a: "Không. Chỉ khách mới lần đầu đến tiệm mới được tính, và khách không thể tự mời chính mình.",
    },
    {
      q: "Khách tìm link mời của mình ở đâu?",
      a: "Khách mở thẻ tích điểm của mình, kéo xuống phần “Mời bạn bè”, rồi bấm “Sao chép link mời” hoặc “Chia sẻ” để gửi cho bạn bè.",
    },
  ],
  related: ["the-tich-diem", "the-khach-quen", "the-qua-tang-salon", "the-thanh-vien"],
};

export default article;
