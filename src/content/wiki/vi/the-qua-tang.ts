import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-qua-tang/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "mua-the-qua-tang-lam-dep",
  lesson: "the-qua-tang",
  category: "booking",
  title: "Thẻ quà tặng làm đẹp: cách mua online trên website salon và dùng khi đến tiệm",
  metaTitle: "Thẻ quà tặng làm đẹp: cách mua online và dùng tại salon",
  metaDescription:
    "Hướng dẫn mua thẻ quà tặng làm đẹp trên website của salon: chọn thẻ, đặt mua, nhận mã và mã QR qua email, khi nào thẻ được kích hoạt và cách dùng tại salon.",
  keyword: "thẻ quà tặng làm đẹp",
  keywords: [
    "thẻ quà tặng salon dùng thế nào",
    "mua thẻ quà tặng spa online",
    "thẻ quà tặng làm nail",
    "tặng mẹ một buổi làm đẹp",
    "mã thẻ quà tặng salon",
    "voucher làm đẹp tặng bạn thân",
  ],
  excerpt: "Chọn thẻ trên website của salon, đặt mua trong một phút, nhận mã và mã QR qua email rồi chuyển tiếp cho người được tặng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("nguoi-nhan-the-qua-tang-lam-dep-qua-email"),
    alt: "Cô gái tóc ngắn mặc áo len kem ngồi trong salon, vui mừng nhìn điện thoại có biểu tượng hộp quà màu vàng",
  },
  takeaways: [
    "Thẻ quà tặng được bán trong phần **“Thẻ quà tặng”** trên website của salon. Mỗi thẻ ghi rõ dịch vụ, mức giảm giá, thời hạn và giá bán.",
    "Bấm “Mua thẻ này”, điền họ tên và email, rồi bấm “Đặt mua”. Mã thẻ và mã QR được gửi ngay vào email của bạn.",
    "Thẻ chỉ dùng được **sau khi salon xác nhận bạn đã thanh toán**.",
    "Muốn tặng, bạn **chuyển tiếp email** có mã thẻ cho người nhận.",
    "Đến salon, đưa mã QR hoặc đọc mã thẻ cho nhân viên. Nhân viên kiểm tra và trừ một lần dùng trên thẻ.",
  ],
  intro: [
    "Thẻ quà tặng làm đẹp là món quà dễ chọn cho sinh nhật bạn thân hay một dịp muốn cảm ơn mẹ: người nhận được một buổi chăm sóc ở salon, còn bạn không phải đoán cỡ áo hay màu son. Với các salon dùng VaraaAi, bạn mua thẻ ngay trên website của salon và nhận mã qua email trong khoảng một phút.",
    "Bài viết đi theo bài học “Mua và dùng thẻ quà tặng” trong VaraaAi Academy. Bạn sẽ biết tìm thẻ ở đâu, đọc thông tin nào trước khi mua, vì sao có mã rồi mà thẻ chưa dùng được ngay, và người được tặng cần làm gì khi đến tiệm.",
  ],
  sections: [
    {
      id: "the-qua-tang-la-gi",
      title: "Thẻ quà tặng của salon là gì",
      blocks: [
        { p: "Đây là thẻ do chính salon phát hành và bán trên website của mình. Mỗi thẻ gắn với một dịch vụ của tiệm và một mức giảm giá cho dịch vụ đó. Người cầm thẻ không cần tấm thẻ nhựa nào: thứ họ có là một mã thẻ và một mã QR nằm trong email." },
        { p: "Vì là thẻ của từng salon, bạn mua ở tiệm nào thì dùng ở tiệm đó. Trước khi mua để tặng, hãy chọn một salon thuận đường cho người nhận, và một dịch vụ mà họ thật sự muốn làm." },
        { img: { src: img("khach-thu-gian-o-spa-voi-the-qua-tang-lam-dep"), alt: "Khách nữ mặc áo choàng trắng thư giãn bên hồ nước trong spa có nến, nhân viên mặc đồng phục đen mang khay trà đến", caption: "Một buổi chăm sóc ở salon là món quà người nhận dùng được ngay." } },
      ],
    },
    {
      id: "doc-thong-tin-tren-the",
      title: "Đọc kỹ thông tin trên thẻ trước khi mua",
      blocks: [
        { p: "Mẹo của bài học là xem kỹ thời hạn và số lần dùng ghi trên thẻ trước khi bấm mua. Mỗi thẻ trong phần “Thẻ quà tặng” hiện đủ các thông tin dưới đây." },
        {
          table: {
            head: ["Thông tin trên thẻ", "Cần hiểu thế nào"],
            rows: [
              ["Dịch vụ", "Thẻ áp dụng cho dịch vụ nào của salon, ví dụ một bộ sơn gel"],
              ["Mức giảm giá", "Người cầm thẻ được giảm bao nhiêu phần trăm cho dịch vụ đó"],
              ["Thời hạn", "Thẻ còn hiệu lực trong bao lâu. Trong video bài học, thẻ mẫu ghi hiệu lực 90 ngày sau khi kích hoạt"],
              ["Số lần dùng", "Thẻ dùng được mấy lần. Thẻ mẫu trong video dùng tối đa 1 lần"],
              ["Giá bán", "Số tiền bạn trả cho salon để mua thẻ"],
            ],
          },
        },
        { note: "Thời hạn là điều người tặng hay bỏ sót. Nếu người nhận bận hoặc ở xa, hãy chọn thẻ có thời hạn đủ dài, và nhắc họ ngày hết hạn khi chuyển thẻ.", kind: "tip", title: "Kinh nghiệm tặng thẻ" },
      ],
    },
    {
      id: "kich-hoat-the",
      title: "Có mã rồi nhưng thẻ chưa dùng được: chuyện kích hoạt",
      blocks: [
        { p: "Sau khi bạn bấm “Đặt mua”, mã thẻ đến email ngay. Nhưng có mã chưa có nghĩa là thẻ đã dùng được. Thẻ được kích hoạt sau khi salon xác nhận bạn đã thanh toán, và màn hình cảm ơn sau khi đặt mua cũng nói rõ điều này." },
        { p: "Thứ tự hợp lý vì vậy là: đặt mua, thanh toán cho salon, chờ salon xác nhận, rồi mới trao thẻ. Nếu bạn chưa rõ salon nhận tiền bằng cách nào, hãy hỏi thẳng tiệm qua [khung chat với salon](lesson:chat-voi-salon) hoặc gọi số điện thoại trên trang của tiệm." },
        { note: "Đừng chuyển tiếp email cho người được tặng vào sát ngày họ định đi làm đẹp khi salon chưa xác nhận thanh toán. Thẻ chưa kích hoạt thì chưa dùng được, và người nhận sẽ lúng túng ngay tại quầy.", kind: "warn", title: "Trao thẻ sau khi đã kích hoạt" },
      ],
    },
    {
      id: "tang-the-cho-nguoi-khac",
      title: "Tặng thẻ cho người khác và dùng thẻ tại salon",
      blocks: [
        { p: "Việc tặng chỉ là một lần chuyển tiếp email. Email bạn nhận sau khi đặt mua có mã thẻ và mã QR. Chuyển tiếp nguyên email đó cho người được tặng, kèm vài dòng chúc mừng của bạn, là họ có đủ thứ cần mang đến tiệm." },
        { p: "Khi đến salon, bạn hoặc người được tặng đưa mã QR cho nhân viên quét, hoặc đọc mã thẻ. Nhân viên kiểm tra mã trên màn hình của salon: thẻ nào, còn hiệu lực không, còn mấy lần dùng và hết hạn ngày nào. Sau đó nhân viên ghi nhận một lần dùng và thẻ bị trừ đi một lần." },
        { img: { src: img("nhan-vien-ghi-nhan-mot-lan-dung-the"), alt: "Màn hình hiện thẻ quà tặng Gel manicure đang hiệu lực, số lần còn lại, ngày hết hạn và nút Ghi nhận lần dùng", caption: "Thông tin nhân viên nhìn thấy sau khi kiểm tra mã thẻ." } },
        { p: "Người được tặng nên giữ chỗ trước khi đến. Họ có thể [đặt lịch làm đẹp online](lesson:dat-lich-online) ở chính salon đó: ở bước điền thông tin có ô “Mã giảm giá”, nơi nhập mã giảm giá hoặc thẻ quà tặng rồi bấm “Áp dụng”." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp với thẻ quà tặng salon",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Không thấy phần “Thẻ quà tặng” trên website của salon", "Salon đó chưa bán thẻ quà tặng trên website. Hỏi salon hoặc chọn tiệm khác"],
              ["Đặt mua xong không thấy email", "Kiểm tra thư mục thư rác và xem lại địa chỉ email đã nhập. Mã thẻ cũng hiện trên màn hình cảm ơn, hãy chép lại"],
              ["Đến tiệm, nhân viên báo thẻ chưa kích hoạt", "Salon chưa xác nhận thanh toán. Hoàn tất việc trả tiền với salon để thẻ được kích hoạt"],
              ["Người được tặng không mở được mã QR", "Đọc mã thẻ bằng chữ và số cho nhân viên nhập"],
              ["Muốn mua thẻ nhưng không muốn để số điện thoại", "Ô số điện thoại không bắt buộc. Chỉ cần họ tên và email"],
              ["Muốn dùng thẻ cho dịch vụ khác", "Thẻ ghi rõ dịch vụ áp dụng. Hỏi salon trước khi đến nếu bạn muốn đổi"],
            ],
          },
        },
        { p: "Nếu người thân của bạn hay đến một salon cố định, họ còn có thể xin [thẻ thành viên](lesson:the-thanh-vien) của tiệm để tích vé sau mỗi lần làm. Thẻ quà tặng là quà cho một dịp, còn thẻ thành viên đi theo khách lâu dài." },
        { note: "Phía salon tạo mẫu thẻ, xác nhận thanh toán và kiểm tra mã trong trang quản trị. Xem bài [Thẻ quà tặng](lesson:the-qua-tang-salon) dành cho chủ salon.", kind: "info", title: "Bạn là chủ salon?" },
      ],
    },
  ],
  howTo: {
    title: "Các bước mua thẻ quà tặng làm đẹp và dùng tại salon",
    id: "cac-buoc-mua-the-qua-tang",
    after: "doc-thong-tin-tren-the",
    lead: "Bốn bước đầu làm trên website của salon, hai bước sau là trao thẻ và dùng thẻ.",
    steps: [
      {
        name: "Mở website của salon và tìm phần “Thẻ quà tặng”",
        text: "Mở website của salon bạn muốn mua thẻ và kéo xuống phần “Thẻ quà tặng”. Mỗi thẻ ghi rõ dịch vụ, mức giảm giá, thời hạn và giá bán. Đọc hết các dòng này rồi chọn thẻ bạn thích.",
        image: { src: img("chon-the-qua-tang-tren-website-salon"), alt: "Phần Thẻ quà tặng trên website salon, thẻ Gel manicure được khoanh vàng ghi mức giảm, hiệu lực, giá bán và nút Mua thẻ này" },
      },
      {
        name: "Bấm “Mua thẻ này”",
        text: "Nút “Mua thẻ này” nằm ngay dưới giá bán của thẻ. Bấm vào, các ô điền thông tin hiện ra ngay trong thẻ đó.",
        image: { src: img("bam-mua-the-nay-de-mua-the-qua-tang"), alt: "Thẻ quà tặng Gel manicure trên website của salon với nút Mua thẻ này được khoanh vàng ở phía dưới giá bán" },
      },
      {
        name: "Điền thông tin rồi bấm “Đặt mua”",
        text: "Điền họ tên và email của bạn. Số điện thoại thì điền nếu muốn, ô này không bắt buộc. Gõ email thật cẩn thận vì mã thẻ sẽ được gửi về đó, rồi bấm “Đặt mua”.",
        image: { src: img("dien-ho-ten-email-va-bam-dat-mua"), alt: "Biểu mẫu mua thẻ quà tặng với ô họ tên, email, số điện thoại không bắt buộc được khoanh vàng và nút Đặt mua" },
      },
      {
        name: "Ghi lại mã thẻ và mở email",
        text: "Màn hình báo “Cảm ơn bạn đã mua thẻ quà tặng” kèm mã thẻ của bạn. Cùng lúc đó, mã thẻ và mã QR được gửi vào email. Thẻ sẽ được kích hoạt sau khi salon xác nhận bạn đã thanh toán.",
        image: { src: img("thong-bao-da-mua-the-qua-tang-kem-ma-the"), alt: "Thông báo cảm ơn đã mua thẻ quà tặng, kèm mã thẻ và dòng nhắc thẻ kích hoạt sau khi salon xác nhận thanh toán" },
      },
      {
        name: "Chuyển tiếp email cho người được tặng",
        text: "Nếu thẻ là quà, chuyển tiếp email có mã thẻ cho người nhận. Nên nói với họ thẻ dùng cho dịch vụ nào, ở salon nào và hết hạn khi nào.",
      },
      {
        name: "Đến salon: đưa mã QR hoặc đọc mã thẻ",
        text: "Tại salon, người cầm thẻ đưa mã QR cho nhân viên hoặc đọc mã thẻ. Nhân viên kiểm tra mã và trừ một lần dùng trên thẻ.",
        image: { src: img("nhan-vien-nhap-ma-the-qua-tang-de-kiem-tra"), alt: "Màn hình Kiểm tra và dùng thẻ của salon, ô nhập mã thẻ được khoanh vàng phía trên nút Kiểm tra mã" },
      },
    ],
  },
  faq: [
    {
      q: "Mua thẻ quà tặng của salon ở đâu?",
      a: "Trong phần “Thẻ quà tặng” trên website của salon. Bạn chọn thẻ, bấm “Mua thẻ này”, điền họ tên và email rồi bấm “Đặt mua”. Việc này mất khoảng một phút.",
    },
    {
      q: "Thẻ quà tặng salon dùng thế nào khi đến tiệm?",
      a: "Người cầm thẻ đưa mã QR hoặc đọc mã thẻ cho nhân viên. Nhân viên kiểm tra mã và ghi nhận một lần dùng, thẻ bị trừ đi một lần.",
    },
    {
      q: "Mua xong thẻ có dùng được ngay không?",
      a: "Chưa chắc. Mã thẻ và mã QR đến email ngay sau khi đặt mua, nhưng thẻ chỉ được kích hoạt sau khi salon xác nhận bạn đã thanh toán.",
    },
    {
      q: "Làm sao tặng thẻ quà tặng cho người khác?",
      a: "Chuyển tiếp email có mã thẻ và mã QR cho người được tặng. Khi đến salon, họ đưa mã QR hoặc đọc mã thẻ cho nhân viên giống như chính bạn dùng thẻ.",
    },
    {
      q: "Thẻ quà tặng có thời hạn không?",
      a: "Có. Mỗi thẻ ghi thời hạn và số lần được dùng, do salon đặt. Hãy xem kỹ hai thông tin này trên thẻ trước khi mua, nhất là khi mua để tặng.",
    },
    {
      q: "Mua thẻ quà tặng có bắt buộc nhập số điện thoại không?",
      a: "Không. Bạn điền họ tên và email, còn số điện thoại thì điền nếu muốn. Email là thông tin quan trọng nhất vì mã thẻ được gửi về đó.",
    },
  ],
  related: ["the-thanh-vien", "theo-doi-salon", "hoa-don", "dat-lich-online"],
};

export default article;
