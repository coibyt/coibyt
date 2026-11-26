import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-qua-tang-salon/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "ban-the-qua-tang-cho-salon-gift-card",
  lesson: "the-qua-tang-salon",
  category: "marketing",
  title: "Bán thẻ quà tặng cho salon (gift card): tạo mẫu thẻ, gửi qua email và kiểm tra mã khi khách đến",
  metaTitle: "Bán thẻ quà tặng cho salon: gift card tiệm nail, spa",
  metaDescription:
    "Hướng dẫn chủ tiệm nail, tóc, spa bán thẻ quà tặng trên VaraaAi: tạo mẫu thẻ, gửi ảnh thẻ có mã QR qua email, xác nhận thanh toán và ghi nhận lần dùng.",
  keyword: "bán thẻ quà tặng cho salon",
  keywords: [
    "gift card tiệm nail",
    "cách làm thẻ quà tặng cho spa",
    "voucher quà tặng làm đẹp cho tiệm",
    "thẻ quà tặng có mã QR",
    "bán gift card online trên website salon",
    "kiểm tra mã thẻ quà tặng",
    "hiệu lực và số lần dùng của thẻ quà tặng",
  ],
  excerpt: "Tạo một mẫu thẻ, gửi ảnh thẻ có mã QR vào email của khách, rồi quét mã và ghi nhận lần dùng khi khách đến. Thẻ khách tự mua trên website cần bạn xác nhận đã thanh toán.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("nhan-vien-spa-mang-tra-cho-khach-ben-ho-nuoc"),
    alt: "Một nhân viên spa mặc đồng phục đen mang khay trà đến cho vị khách mặc áo choàng trắng ngồi bên hồ nước trong nhà có nến và hoa lan",
  },
  takeaways: [
    "Việc đầu tiên là **tạo ít nhất một mẫu thẻ**. Mẫu thẻ quyết định dịch vụ, mức giảm, hiệu lực, số lần dùng và giá bán.",
    "Gửi thẻ chỉ cần tên khách nhận và email. Hệ thống tạo **ảnh thẻ có mã QR** và gửi thẳng vào hộp thư của khách.",
    "Thẻ chỉ dùng được khi đã **kích hoạt**: đánh dấu khách đã thanh toán lúc gửi, hoặc bấm “Xác nhận đã thanh toán” với thẻ khách tự mua trên website.",
    "Khi khách đến: quét QR hoặc nhập “Mã thẻ”, bấm “Kiểm tra mã”, rồi **“Ghi nhận lần dùng”**.",
    "Danh sách “Thẻ đã bán / đã gửi” cho xem ảnh thẻ, tải ảnh và gửi lại email.",
  ],
  intro: [
    "Bán thẻ quà tặng cho salon làm được hai việc cùng lúc. Tiệm có tiền trước khi làm dịch vụ, và có thêm khách mới: người mua tặng cho bạn bè, người thân, còn người nhận sẽ tìm đến tiệm. Với tiệm nail, tóc hay spa, gift card còn là một cách nhẹ nhàng để khách quen giới thiệu tiệm cho người khác.",
    "Bài viết này đi theo bài học “Thẻ quà tặng” của VaraaAi Academy. Bạn sẽ tạo được một mẫu thẻ, gửi thẻ cho khách qua email, kích hoạt thẻ khi đã nhận tiền, và kiểm tra mã khi người được tặng mang thẻ đến.",
  ],
  sections: [
    {
      id: "vi-sao-ban-the-qua-tang",
      title: "Vì sao tiệm nail, spa nên có gift card",
      blocks: [
        { p: "Một buổi làm móng hay một buổi chăm sóc da là món quà dễ tặng: người tặng không phải đoán cỡ, đoán màu, và người nhận có một lý do để tự chiều mình. Chủ tiệm hẳn đã nghe khách hỏi “bên em có phiếu quà tặng không”. Khi câu trả lời là có, tiệm thu được tiền của một dịch vụ chưa làm và đón một khách chưa từng đến." },
        { p: "Thẻ quà tặng trên VaraaAi không cần in. Mỗi thẻ là một tấm ảnh có mã QR, gửi qua email, và việc kiểm tra thẻ còn hiệu lực hay không nằm ngay trong trang quản trị. Bạn không phải giữ một cuốn sổ ghi tay xem thẻ nào đã dùng." },
        { p: "Phía người mua và người được tặng thấy gì được viết riêng trong bài [thẻ quà tặng làm đẹp](lesson:the-qua-tang). Bài bạn đang đọc là phần việc của chủ tiệm." },
      ],
    },
    {
      id: "mau-the-la-gi",
      title: "Cách làm thẻ quà tặng cho spa, salon: sáu ô của một mẫu thẻ",
      blocks: [
        { p: "Trước khi gửi được tấm thẻ nào, bạn cần ít nhất một mẫu thẻ. Mẫu thẻ là khuôn chung: bạn tạo một lần, rồi mỗi lần bán chỉ việc chọn lại mẫu đó. Một mẫu có sáu ô:" },
        {
          table: {
            head: ["Ô", "Ý nghĩa", "Ví dụ trong video bài học"],
            rows: [
              ["“Dịch vụ”", "Dịch vụ mà thẻ áp dụng, chọn từ menu của salon", "Gel manicure"],
              ["“Tên thẻ”", "Tên hiện trên thẻ và trong danh sách", "Thẻ quà tặng Gel manicure"],
              ["“Giảm giá (%)”", "Mức giảm của thẻ, tính theo phần trăm", "20"],
              ["“Hiệu lực”", "Số ngày thẻ dùng được, tính từ lúc kích hoạt", "90"],
              ["“Số lần được dùng”", "Thẻ dùng được mấy lần", "1"],
              ["“Giá trị / giá bán”", "Số tiền khách trả để mua thẻ, kèm đơn vị tiền tệ", "36 EUR"],
            ],
          },
        },
        { p: "Ô “Dịch vụ” lấy từ danh sách dịch vụ của salon, nên menu cần có trước. Nếu chưa, xem bài [menu dịch vụ salon](lesson:dich-vu)." },
        { p: "Hai ô đáng nghĩ kỹ nhất là “Hiệu lực” và “Số lần được dùng”. Hiệu lực tính từ ngày thẻ được kích hoạt, không phải ngày tạo mẫu. Người được tặng thường không đi làm ngay, nên một thời hạn quá ngắn dễ dẫn đến cảnh khách cầm thẻ hết hạn đến tiệm, và cả hai bên đều khó xử. Số lần dùng lớn hơn 1 hợp với những thẻ bạn muốn khách quay lại nhiều lần." },
        { note: "Đặt tên thẻ theo dịch vụ và viết sao cho người được tặng đọc là hiểu mình nhận được gì. Tên thẻ hiện ngay trên tấm ảnh mà khách nhận trong email.", kind: "tip", title: "Tên thẻ là thứ người nhận đọc đầu tiên" },
      ],
    },
    {
      id: "hai-duong-ban-the",
      title: "Hai đường bán thẻ: gửi từ trang quản trị và bán gift card online trên website salon",
      blocks: [
        { p: "Thẻ quà tặng đến tay khách theo hai đường. Điểm khác nhau quan trọng nhất là ai kích hoạt thẻ và lúc nào." },
        {
          table: {
            head: ["Đường bán", "Diễn ra thế nào", "Kích hoạt thẻ"],
            rows: [
              ["Bạn gửi thẻ cho khách", "Khách mua tại quầy hoặc nhắn đặt. Bạn điền phần “Gửi thẻ quà tặng cho khách” và gửi email", "Đánh dấu ô khách đã thanh toán trước khi gửi, thẻ được kích hoạt ngay"],
              ["Khách tự mua trên website của salon", "Khách chọn thẻ và đặt mua. Thẻ hiện trong danh sách “Thẻ đã bán / đã gửi”", "Bạn bấm “Xác nhận đã thanh toán” sau khi nhận được tiền"],
            ],
          },
        },
        { p: "Với đường thứ hai, khách nhận mã qua email ngay khi đặt mua, nhưng thẻ chỉ dùng được sau khi salon xác nhận đã nhận tiền. Quy tắc này bảo vệ tiệm: không ai dùng được một tấm thẻ chưa trả tiền." },
        { note: "Hãy xem danh sách “Thẻ đã bán / đã gửi” mỗi ngày. Một tấm thẻ khách đã chuyển tiền mà chưa được xác nhận thì vẫn chưa dùng được khi người được tặng đến tiệm, và đó là một trải nghiệm xấu cho món quà.", kind: "warn", title: "Đừng để thẻ đã trả tiền nằm chờ" },
        { p: "Phần thẻ quà tặng trên website chỉ có khi tiệm đã có trang web. Bài [làm website cho salon miễn phí](lesson:website-salon) hướng dẫn cách tạo." },
      ],
    },
    {
      id: "khi-khach-mang-the-den",
      title: "Kiểm tra mã thẻ quà tặng khi khách mang thẻ đến",
      blocks: [
        { p: "Người cầm thẻ đến tiệm thường là khách mới, được ai đó tặng. Ấn tượng đầu tiên của họ về tiệm bắt đầu từ lúc bạn nhận thẻ, nên khâu này cần nhanh và chắc." },
        { p: "Trong phần “Kiểm tra và dùng thẻ”, bạn quét mã QR trên thẻ bằng camera điện thoại, hoặc nhập mã thẻ rồi bấm “Kiểm tra mã”. Thẻ hiện ra với những gì bạn cần biết trước khi làm dịch vụ:" },
        {
          ul: [
            "Tên thẻ, dịch vụ và mức giảm.",
            "Trạng thái, ví dụ “Đang hiệu lực”.",
            "Tên khách nhận thẻ.",
            "Số lần còn lại.",
            "Ngày hết hạn.",
          ],
        },
        { p: "Nếu thẻ còn hiệu lực và còn lần dùng, bạn làm dịch vụ rồi bấm “Ghi nhận lần dùng”. Một lần dùng được trừ khỏi thẻ. Nên kiểm tra mã ngay lúc khách đến, trước khi bắt đầu làm, để mọi chuyện về hạn dùng được nói rõ từ đầu." },
        { p: "Khi tính tiền ở quầy, hình thức thanh toán có sẵn lựa chọn “Thẻ quà tặng”, như trong bài [thanh toán tại quầy và hóa đơn](lesson:thanh-toan-hoa-don). Chọn đúng hình thức giúp báo cáo doanh thu tách được phần thu bằng thẻ." },
      ],
    },
    {
      id: "the-da-ban-da-gui",
      title: "Danh sách “Thẻ đã bán / đã gửi”: xem ảnh thẻ, tải ảnh, gửi lại email",
      blocks: [
        { p: "Phía dưới trang là danh sách mọi thẻ đã bán và đã gửi. Mỗi dòng có tên khách, email, mã thẻ, tên mẫu thẻ, giá, số lần còn lại và hạn sử dụng, kèm trạng thái của thẻ." },
        { img: { src: img("danh-sach-the-da-ban-da-gui"), alt: "Danh sách Thẻ đã bán, đã gửi với thẻ của khách Claire Dubois đang hiệu lực được khoanh vàng, bên dưới là nút Xem ảnh thẻ, Tải ảnh và Gửi lại email", caption: "Mỗi thẻ đã bán có ba nút: “Xem ảnh thẻ”, “Tải ảnh” và “Gửi lại email”." } },
        {
          table: {
            head: ["Nút", "Dùng khi nào"],
            rows: [
              ["“Xem ảnh thẻ”", "Muốn xem lại tấm thẻ khách đã nhận"],
              ["“Tải ảnh”", "Muốn có tệp ảnh thẻ để gửi cho khách qua một kênh khác"],
              ["“Gửi lại email”", "Khách báo không thấy email hoặc đã xóa mất"],
              ["“Xác nhận đã thanh toán”", "Thẻ khách tự mua trên website, sau khi bạn đã nhận tiền"],
            ],
          },
        },
        { p: "Người mua thường muốn tự tay gửi quà. Họ chỉ cần chuyển tiếp email có mã thẻ cho người được tặng. Nếu khách muốn đưa quà theo cách riêng, bạn tải ảnh thẻ về và gửi cho họ." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi bán thẻ quà tặng",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Phần gửi thẻ chưa có mẫu nào để chọn", "Bấm “Tạo mẫu thẻ mới” và tạo ít nhất một mẫu trước"],
              ["Khách mua trên website báo thẻ chưa dùng được", "Kiểm tra bạn đã nhận tiền chưa, rồi bấm “Xác nhận đã thanh toán” trong danh sách thẻ"],
              ["Khách mất email có thẻ", "Tìm thẻ trong “Thẻ đã bán / đã gửi” và bấm “Gửi lại email”"],
              ["Khách đến mà không mở được mã QR", "Nhập “Mã thẻ” bằng tay rồi bấm “Kiểm tra mã”"],
              ["Khách hỏi thẻ còn dùng được mấy lần", "Kiểm tra mã. Thẻ hiện số lần còn lại và ngày hết hạn"],
            ],
          },
        },
        { p: "Thẻ quà tặng mang khách mới đến một lần. Giữ họ ở lại là việc của lần hẹn đó và của một [chương trình khách hàng thân thiết](lesson:the-tich-diem): kích hoạt thẻ tích điểm cho người được tặng ngay hôm họ đến dùng thẻ quà." },
      ],
    },
  ],
  howTo: {
    title: "Các bước tạo, gửi và dùng thẻ quà tặng cho salon trên VaraaAi",
    id: "cac-buoc-ban-the-qua-tang",
    after: "mau-the-la-gi",
    lead: "Bảy bước dưới đây đi theo vòng đời của một tấm thẻ, đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Bấm mục “Thẻ quà tặng”, rồi “Tạo mẫu thẻ mới”",
        text: "Trong trang quản trị, bấm mục “Thẻ quà tặng”. Ở phần “Mẫu thẻ quà tặng”, bấm “Tạo mẫu thẻ mới” để mở các ô nhập. Bạn phải có ít nhất một mẫu trước khi gửi được thẻ.",
        image: { src: img("bam-tao-mau-the-moi"), alt: "Phần Mẫu thẻ quà tặng với nút Tạo mẫu thẻ mới được khoanh vàng, bên dưới là ô Dịch vụ, Tên thẻ, Giảm giá và Hiệu lực" },
      },
      {
        name: "Điền mẫu thẻ và bấm “Tạo mẫu thẻ”",
        text: "Chọn “Dịch vụ”, đặt “Tên thẻ”, nhập “Giảm giá (%)”, số ngày “Hiệu lực” sau khi kích hoạt, “Số lần được dùng” và “Giá trị / giá bán”. Đọc lại một lượt rồi bấm “Tạo mẫu thẻ”.",
        image: { src: img("hieu-luc-so-lan-dung-va-gia-ban"), alt: "Các ô của mẫu thẻ với ô Hiệu lực ghi 90 ngày sau khi kích hoạt được khoanh vàng, bên dưới là Số lần được dùng, Giá bán và nút Tạo mẫu thẻ" },
      },
      {
        name: "Chọn “Mẫu thẻ” và nhập thông tin người nhận",
        text: "Ở phần “Gửi thẻ quà tặng cho khách”, chọn “Mẫu thẻ”. Nhập “Tên khách nhận thẻ”, “Email” và “Lời nhắn trên thẻ”, ví dụ một lời chúc mừng sinh nhật. Ô số điện thoại không bắt buộc.",
        image: { src: img("gui-the-qua-tang-cho-khach-chon-mau-the"), alt: "Phần Gửi thẻ quà tặng cho khách với ô Mẫu thẻ đang chọn Thẻ quà tặng Gel manicure được khoanh vàng, bên dưới là các ô tên, email và lời nhắn" },
      },
      {
        name: "Đánh dấu đã thanh toán và gửi thẻ",
        text: "Nếu khách đã trả tiền, đánh dấu ô “Khách đã thanh toán, kích hoạt thẻ ngay”. Rồi bấm “Tạo ảnh thẻ & gửi email cho khách”. Khách nhận được ảnh thẻ kèm mã QR. Phần xem trước ngay bên dưới cho bạn thấy tấm thẻ khách sẽ nhận.",
        image: { src: img("xem-truoc-anh-the-qua-tang-khach-nhan"), alt: "Ô đánh dấu khách đã thanh toán, nút đen Tạo ảnh thẻ và gửi email cho khách, bên dưới là bản xem trước thẻ quà tặng màu tím có nơ" },
      },
      {
        name: "Khi khách đến, bấm “Kiểm tra mã”",
        text: "Vào phần “Kiểm tra và dùng thẻ”. Quét mã QR trên thẻ bằng camera điện thoại, hoặc nhập “Mã thẻ” rồi bấm “Kiểm tra mã”. Thẻ hiện ra, cho biết còn hiệu lực không và còn mấy lần dùng.",
        image: { src: img("nhap-ma-the-va-bam-kiem-tra-ma"), alt: "Khung Kiểm tra và dùng thẻ với ô mã thẻ được khoanh vàng, nút Kiểm tra mã và kết quả thẻ đang hiệu lực, còn lại 1 trên 1 lần" },
      },
      {
        name: "Bấm “Ghi nhận lần dùng”",
        text: "Khi khách dùng thẻ cho dịch vụ, bấm “Ghi nhận lần dùng”. Một lần dùng được trừ trên thẻ. Đừng quên bước này, nếu không thẻ vẫn còn nguyên số lần dùng.",
        image: { src: img("nut-ghi-nhan-lan-dung-the"), alt: "Kết quả kiểm tra Thẻ quà tặng Gel manicure đang hiệu lực với nút đen Ghi nhận lần dùng được khoanh vàng" },
      },
      {
        name: "Xác nhận thanh toán cho thẻ khách tự mua",
        text: "Thẻ khách tự mua trên website của salon cũng hiện trong danh sách “Thẻ đã bán / đã gửi”. Sau khi nhận được tiền, bấm “Xác nhận đã thanh toán” để kích hoạt thẻ.",
      },
    ],
  },
  faq: [
    {
      q: "Cần làm gì trước tiên để bán thẻ quà tặng cho salon trên VaraaAi?",
      a: "Tạo ít nhất một mẫu thẻ. Mẫu thẻ quyết định dịch vụ, mức giảm, hiệu lực, số lần được dùng và giá bán. Có mẫu rồi bạn mới gửi được thẻ cho khách.",
    },
    {
      q: "Khách nhận thẻ quà tặng bằng cách nào?",
      a: "Bạn chọn mẫu thẻ, nhập tên khách nhận thẻ, email và lời nhắn, rồi bấm “Tạo ảnh thẻ & gửi email cho khách”. Khách nhận ảnh thẻ kèm mã QR trong hộp thư.",
    },
    {
      q: "Thẻ khách tự mua trên website của salon được kích hoạt khi nào?",
      a: "Khi bạn bấm “Xác nhận đã thanh toán”. Khách nhận mã qua email ngay khi đặt mua, nhưng thẻ chỉ dùng được sau khi salon xác nhận đã nhận tiền.",
    },
    {
      q: "Khách mang thẻ quà tặng đến tiệm thì làm gì?",
      a: "Quét mã QR trên thẻ hoặc nhập mã thẻ, bấm “Kiểm tra mã” để xem thẻ còn hiệu lực không và còn mấy lần dùng. Sau đó bấm “Ghi nhận lần dùng”.",
    },
    {
      q: "Hiệu lực của thẻ quà tặng tính từ lúc nào?",
      a: "Ô “Hiệu lực” là số ngày sau khi kích hoạt. Thời hạn bắt đầu tính từ lúc thẻ được kích hoạt, và ngày hết hạn hiện ra khi bạn kiểm tra mã.",
    },
    {
      q: "Khách làm mất email có thẻ quà tặng thì sao?",
      a: "Tìm thẻ trong danh sách “Thẻ đã bán / đã gửi” và bấm “Gửi lại email”. Ở đó bạn cũng xem được ảnh thẻ và tải ảnh về.",
    },
  ],
  related: ["the-tich-diem", "khach-dan-khach", "thanh-toan-hoa-don", "the-qua-tang"],
};

export default article;
