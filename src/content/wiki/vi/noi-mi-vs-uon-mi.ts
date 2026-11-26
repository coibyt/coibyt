import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mi-vs-uon-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "noi-mi-hay-uon-mi-nen-chon-cach-nao",
  lesson: "noi-mi-vs-uon-mi",
  category: "tips",
  title: "Nối mi hay uốn mi: so sánh chi phí, độ bền và cảm giác để chọn đúng",
  metaTitle: "Nối mi hay uốn mi: chi phí, độ bền, cảm giác",
  metaDescription:
    "Nối mi hay uốn mi? So sánh thời gian làm, giá tại Moja Beauty, mi giữ được bao lâu, cảm giác trên mắt và việc chăm sóc, kèm cách chọn theo mi thật của bạn.",
  keyword: "nối mi hay uốn mi",
  keywords: ["uốn mi và nối mi khác nhau thế nào", "uốn mi giữ được bao lâu", "nối mi giữ được bao lâu", "uốn mi có cần dặm không", "nên uốn mi hay nối mi", "uốn mi lash lift hay nối mi classic"],
  excerpt: "Uốn mi làm cong chính mi thật của bạn; nối mi gắn thêm sợi cho dày và dài. Bài viết đặt hai cách cạnh nhau: thời gian, chi phí, độ bền, cảm giác và việc chăm sóc.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-mi-lam-mi-cho-khach-nam-tren-giuong-studio"),
    alt: "Thợ đeo găng đen cầm hai cây nhíp làm mi cho khách nữ nằm nhắm mắt trên giường kem trong studio đá cẩm thạch",
  },
  takeaways: [
    "**Uốn mi** làm cong chính mi thật của bạn, không gắn thêm sợi nào; **nối mi** gắn sợi mới lên mi thật cho dày và dài hơn.",
    "Tại Moja Beauty: uốn mi 30 €, khoảng 60 phút; nối mi Classic 39 €, khoảng 90 phút và cần dặm định kỳ.",
    "Uốn mi giữ nếp khoảng 6–8 tuần; mi nối rụng dần theo mi thật nên đi dặm sau 2–3 tuần.",
    "Muốn tự nhiên, ít chăm sóc thì uốn mi; muốn mi dày, dài rõ rệt thì nối mi.",
    "Uốn mi cần mi thật đủ dài; mi rất ngắn khó lên dáng đẹp.",
  ],
  intro: [
    "Nối mi hay uốn mi là câu hỏi mà rất nhiều người đặt ra trước lần làm mi đầu tiên. Cả hai đều cho hàng mi đẹp hơn, nhưng khác nhau nhiều hơn bạn nghĩ: một cách làm cong chính mi thật của bạn, cách kia gắn thêm sợi mới. Từ đó kéo theo khác biệt về chi phí, thời gian giữ được, cảm giác trên mắt và công chăm sóc.",
    "Bài viết đi theo bài học “Nối mi hay uốn mi: chi phí, độ bền và cảm giác” trong khóa Moja Beauty của VaraaAi Academy, khóa học cho khách từ salon Moja Beauty ở Helsinki. Giá trong bài là giá của Moja Beauty, đã gồm thuế VAT. Đọc xong, bạn sẽ biết cách nào hợp với mi thật và nhịp sống của mình.",
  ],
  sections: [
    {
      id: "khac-nhau-co-ban",
      title: "Uốn mi và nối mi khác nhau thế nào",
      blocks: [
        { p: "**Uốn mi** (lash lift) không gắn thêm sợi nào. Thợ chải sợi mi thật của bạn lên một khuôn silicone dán trên mí, bôi một loại thuốc làm mềm để sợi mi nhận dáng cong mới, rồi một loại thuốc thứ hai để cố định dáng đó. Kết quả là chính hàng mi của bạn, cong lên và trông dài hơn vì ngọn mi không còn chúc xuống." },
        { img: { src: img("dan-khuon-silicone-sat-chan-mi-khi-uon-mi"), alt: "Ngón tay đeo găng đen đặt khuôn silicone hồng nhạt sát chân mi trên mắt khách đang nhắm, miếng lót trắng dưới mắt", caption: "Uốn mi: mi thật được chải lên khuôn silicone dán sát chân mi." } },
        { p: "**Nối mi** gắn thêm sợi mi nối lên từng sợi mi thật bằng keo chuyên dụng, cách chân mi một khoảng nhỏ. Với kiểu Classic, mỗi sợi mi thật mang một sợi nối. Hàng mi vì thế dày hơn và dài hơn hẳn so với mi thật." },
        { img: { src: img("khay-dung-cu-noi-mi-vi-mi-keo-va-nhip"), alt: "Khay đá cẩm thạch viền vàng bày vỉ mi nối xếp theo độ dài, chai keo, đá ngọc, hai cây nhíp và chổi chải mi", caption: "Nối mi: từng sợi mi nối được gắn lên từng sợi mi thật." } },
      ],
    },
    {
      id: "so-sanh-chi-phi-do-ben",
      title: "So sánh chi phí, thời gian và độ bền",
      blocks: [
        {
          table: {
            head: ["", "Uốn mi", "Nối mi Classic"],
            rows: [
              ["Giá tại Moja Beauty", "30 €", "39 €"],
              ["Thời gian làm", "Khoảng 60 phút", "Khoảng 90 phút"],
              ["Giữ được", "Khoảng 6–8 tuần", "Đi dặm sau 2–3 tuần"],
              ["Làm lại", "Uốn lại khi mi mới đã mọc ra", "Dặm định kỳ"],
            ],
          },
        },
        { p: "Nhìn giá một lần làm, hai dịch vụ không cách nhau nhiều. Khác biệt nằm ở nhịp quay lại tiệm. Uốn mi giữ nếp khoảng sáu đến tám tuần, gần bằng vòng đời của sợi mi: khi những sợi mi mới mọc ra thẳng, bạn uốn lại. Mi nối thì rụng dần theo mi thật, nên sau hai đến ba tuần bạn cần đi dặm để hàng mi không thưa và lệch." },
        { note: "Giá trong bảng là giá của Moja Beauty ở Helsinki, đã gồm VAT. Mỗi salon có bảng giá riêng; hãy xem giá dịch vụ dặm mi trên trang đặt lịch của salon bạn chọn.", kind: "info", title: "Về giá" },
      ],
    },
    {
      id: "cam-giac-tren-mat",
      title: "Cảm giác trên mắt và công chăm sóc",
      blocks: [
        { p: "Sau khi uốn, hàng mi vẫn là mi thật của bạn. Bài học tả cảm giác đó là nhẹ như không làm gì. Không có sợi thêm, không có keo, nên bạn ít phải để ý đến mi trong sinh hoạt hằng ngày." },
        { img: { src: img("khach-voi-mi-that-sau-khi-uon-cong-tu-nhien"), alt: "Cô gái tóc vàng nhìn thẳng vào máy ảnh với hàng mi thật cong lên tự nhiên sau khi uốn, không trang điểm mắt", caption: "Sau khi uốn: mi thật cong lên, nhẹ như không làm gì." } },
        { p: "Nối mi cho hàng mi dày và dài hơn hẳn, nhưng đổi lại cần chăm kỹ hơn: không dụi mắt, tránh sản phẩm có dầu quanh mắt, rửa và chải mi đúng cách. Những việc này không khó, chỉ cần thành thói quen. Bài [cách rửa mi nối tại nhà](lesson:rua-mi-noi-tai-nha) hướng dẫn từng bước." },
        { img: { src: img("khach-voi-bo-mi-noi-classic-day-va-dai-hon"), alt: "Cô gái tóc vàng nhìn xuống nhẹ với bộ mi nối classic đen, dài và dày hơn mi thật, các sợi tách rời", caption: "Nối mi Classic: dày và dài hơn rõ rệt so với mi thật." } },
        {
          table: {
            head: ["Ngày đầu và sau đó", "Uốn mi", "Nối mi"],
            rows: [
              ["Giữ mi khô", "24 giờ đầu, để thuốc uốn ổn định", "24 giờ đầu, để keo ổn định"],
              ["Xông hơi, sauna", "Tránh trong 24 giờ đầu", "Tránh trong 24 giờ đầu"],
              ["Dụi mắt, kéo, bứt mi", "Không", "Không"],
              ["Tẩy trang có dầu quanh mắt", "Hỏi thợ khi làm", "Tránh lâu dài, vì dầu làm keo mềm"],
            ],
          },
        },
      ],
    },
    {
      id: "nen-chon-cach-nao",
      title: "Nên uốn mi hay nối mi",
      blocks: [
        { p: "Câu trả lời ngắn của bài học: muốn tự nhiên, ít chăm sóc thì uốn mi; muốn mi dày, dài rõ rệt thì nối mi. Thêm vài điều giúp bạn quyết nhanh hơn:" },
        {
          ul: [
            "Mi thật khá dài nhưng mọc thẳng hay chúc xuống: uốn mi thường cho kết quả đẹp, vì chỉ cần đưa ngọn mi lên là mắt trông mở hơn.",
            "Mi thật rất ngắn: khó uốn lên dáng đẹp. Nối mi giúp được nhiều hơn.",
            "Mi thật thưa, bạn muốn hàng mi đầy: uốn mi không thêm được sợi nào, nên nối mi phù hợp hơn.",
            "Bạn không muốn lịch dặm hai đến ba tuần một lần: uốn mi nhẹ nhàng hơn cho lịch của bạn.",
            "Bạn đang đeo mi nối và muốn chuyển sang uốn: mi nối cần được tháo ở tiệm trước.",
          ],
        },
        { img: { src: img("mi-that-da-uon-cong-duoc-go-khoi-khuon"), alt: "Thợ đeo găng đen dùng que nhỏ gỡ hàng mi thật đã uốn cong khỏi khuôn silicone trên mắt khách đang nhắm" } },
        { p: "Nếu đã chọn nối mi, bước tiếp theo là chọn kiểu: Classic, Hybrid, Volume hay Mega. Bài [các loại nối mi](lesson:4-kieu-noi-mi) so sánh bốn kiểu trên cùng một gương mặt. Phía kỹ thuật của uốn mi, như khuôn và thời gian để thuốc, có trong bài [uốn mi lash lift là gì](lesson:lash-lift-hieu-dung)." },
      ],
    },
    {
      id: "an-toan",
      title: "An toàn: điều cần biết cho cả hai cách",
      blocks: [
        { p: "Cả uốn mi lẫn nối mi đều dùng hóa chất gần mắt: thuốc uốn, thuốc nhuộm nếu bạn nhuộm kèm, và keo nối mi. Vì vậy:" },
        {
          ul: [
            "Báo thợ nếu mắt bạn đang đỏ, ngứa, chảy nước, mới mổ mắt, hoặc bạn từng phản ứng với keo, thuốc uốn hay thuốc nhuộm. Khi đó thợ sẽ không làm, và đó là quyết định đúng.",
            "Nếu nhuộm mi kèm khi uốn, nhiều hãng yêu cầu thử phản ứng trên da trước, thường 48 giờ trước buổi làm.",
            "Suốt buổi, mắt bạn nhắm. Thấy cay hay rát thì nói ngay để thợ dừng lại.",
          ],
        },
        { img: { src: img("bo-dung-cu-uon-mi-khuon-silicone-va-thuoc"), alt: "Khay đá trắng viền vàng bày nhiều cỡ khuôn silicone uốn mi màu hồng, gói thuốc, chai nhỏ, que chải mi và bông tẩy trang" } },
        { note: "Mọi vấn đề về sức khỏe của mắt, như mắt đỏ kéo dài, sưng hay nhìn mờ sau khi làm, cần được bác sĩ khám. Bài [dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat) nêu các dấu hiệu cần để ý.", kind: "warn", title: "Khi nào đi khám" },
        { p: "Vẫn phân vân? Moja Beauty nhận tư vấn qua tin nhắn để chọn kiểu hợp với bạn, và bạn có thể [đặt lịch với Moja Beauty](/b/moja-beauty) trên VaraaAi: chọn dịch vụ, chọn giờ là xong." },
      ],
    },
  ],
  faq: [
    {
      q: "Uốn mi giữ được bao lâu?",
      a: "Uốn mi thường giữ nếp khoảng sáu đến tám tuần. Khi những sợi mi mới mọc ra thẳng, bạn uốn lại; không nên uốn lại sớm hơn hãng thuốc khuyên.",
    },
    {
      q: "Nối mi giữ được bao lâu?",
      a: "Mi nối rụng dần theo mi thật, nên sau hai đến ba tuần hàng mi bắt đầu thưa. Lúc đó bạn đi dặm để thêm sợi vào chỗ thiếu thay vì làm lại từ đầu.",
    },
    {
      q: "Uốn mi và nối mi cái nào rẻ hơn?",
      a: "Tại Moja Beauty, uốn mi giá 30 € và nối mi Classic 39 €, đã gồm VAT. Ngoài giá một lần, hãy tính thêm nhịp quay lại: nối mi cần dặm sau hai đến ba tuần, còn uốn mi làm lại sau sáu đến tám tuần.",
    },
    {
      q: "Uốn mi có cảm giác nặng mắt không?",
      a: "Không. Sau khi uốn, hàng mi vẫn là mi thật của bạn, không có sợi thêm hay keo, nên cảm giác nhẹ như không làm gì.",
    },
    {
      q: "Mi ngắn có uốn được không?",
      a: "Mi rất ngắn khó lên dáng đẹp khi uốn. Uốn mi hợp nhất với mi thật khá dài nhưng mọc thẳng hoặc chúc xuống; với mi ngắn hay thưa, nối mi thường giúp được nhiều hơn.",
    },
    {
      q: "Đang nối mi có uốn mi được không?",
      a: "Cần tháo mi nối ở tiệm trước rồi mới uốn. Đừng tự giật mi nối ra, vì như vậy dễ kéo theo mi thật.",
    },
  ],
  related: ["4-kieu-noi-mi", "cham-soc-sau-lam-mi", "do-cong-theo-mat", "lash-lift-hieu-dung"],
};

export default article;
