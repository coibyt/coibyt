import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chia-se-link/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "link-dat-lich-online-cho-salon",
  lesson: "chia-se-link",
  category: "marketing",
  title: "Link đặt lịch online cho salon: cách lấy link, mã QR và mã nhúng để khách đặt ở mọi nơi",
  metaTitle: "Link đặt lịch online cho salon: lấy link, mã QR, mã nhúng",
  metaDescription:
    "Cách lấy link đặt lịch của salon trên VaraaAi và đưa lên Facebook, Instagram, tin nhắn; tải mã QR để in; gắn nút hoặc nhúng trang đặt lịch vào website riêng.",
  keyword: "link đặt lịch online cho salon",
  keywords: [
    "cách tạo link đặt lịch cho tiệm nail",
    "gắn link đặt lịch vào Instagram",
    "đặt lịch qua Facebook cho salon",
    "mã QR đặt lịch của salon",
    "nhúng trang đặt lịch vào website",
    "chia sẻ trang đặt lịch công khai",
    "nút đặt lịch trên website salon",
  ],
  excerpt: "Một trang đặt lịch, ba cách đưa đến khách: sao chép link cho mạng xã hội và tin nhắn, tải mã QR để in, lấy mã nhúng cho website riêng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-mo-link-dat-lich-tren-dien-thoai"),
    alt: "Một phụ nữ tóc vàng quàng khăn tím ngồi cạnh cửa sổ quán cà phê, đang xem điện thoại bên tách cà phê",
  },
  takeaways: [
    "Link đặt lịch nằm ở **đầu trang “Cài đặt”**, trong phần “Trang đặt lịch công khai”.",
    "Bấm **biểu tượng sao chép** để lấy link, rồi dán vào trang Facebook, phần giới thiệu Instagram hoặc tin nhắn cho khách.",
    "Bấm **biểu tượng mã QR** để tải mã QR của salon, dùng in danh thiếp, tờ rơi hoặc dán ở quầy.",
    "Có website riêng thì dùng “Sao chép liên kết” để gắn vào một nút, hoặc **“Lấy mã nhúng”** để khách đặt lịch ngay trên website.",
    "Trước khi chia sẻ, bấm “Xem trang” để xem trang salon đúng như khách thấy.",
  ],
  intro: [
    "Một link đặt lịch online cho salon chỉ có giá trị khi khách bắt gặp nó. Tiệm có thể đã nhập đủ dịch vụ, giá và giờ mở cửa, nhưng nếu đường dẫn nằm yên trong trang quản trị thì khách vẫn nhắn tin hỏi “mai còn chỗ không” như cũ.",
    "Bài viết này đi theo bài học “Chia sẻ link đặt lịch” của VaraaAi Academy. Bạn sẽ biết lấy link ở đâu, tải mã QR thế nào, gắn trang đặt lịch vào website riêng ra sao, và nên đặt chúng ở những chỗ nào để khách thấy.",
  ],
  sections: [
    {
      id: "vi-sao-phai-chia-se",
      title: "Vì sao phải đưa link đặt lịch đến mọi nơi khách nhìn thấy",
      blocks: [
        { p: "Khách không đi tìm trang đặt lịch của bạn. Họ đang lướt Instagram và thấy một bộ móng đẹp, hoặc đang đọc trang Facebook của tiệm để xem giờ mở cửa. Ý muốn đặt lịch xuất hiện ngay ở đó, và nó qua đi rất nhanh nếu khách phải rời chỗ đang đứng để tìm số điện thoại." },
        { p: "Vì vậy nguyên tắc của bài học rất gọn: link càng xuất hiện ở nhiều nơi, khách càng dễ đặt. Mỗi nơi tiệm có mặt, từ Facebook, Instagram, Google cho đến website riêng và quầy thanh toán, nên có một lối dẫn thẳng đến trang đặt lịch." },
        { p: "Việc này không tốn chi phí. VaraaAi miễn phí cho chủ salon và cho khách, và mọi thứ bạn cần đều nằm sẵn trong trang “Cài đặt”." },
      ],
    },
    {
      id: "ba-dang-cua-trang-dat-lich",
      title: "Link, mã QR đặt lịch của salon và mã nhúng: dùng cái nào ở đâu",
      blocks: [
        { p: "Cả bốn công cụ dưới đây đều dẫn về cùng một trang đặt lịch của tiệm. Chúng chỉ khác nhau ở chỗ bạn đặt chúng:" },
        {
          table: {
            head: ["Công cụ", "Lấy ở đâu", "Dùng ở đâu"],
            rows: [
              ["Link đặt lịch", "Biểu tượng sao chép ở “Trang đặt lịch công khai”", "Trang Facebook, phần giới thiệu Instagram, tin nhắn gửi khách"],
              ["Mã QR", "Biểu tượng mã QR ngay bên cạnh", "Danh thiếp, tờ rơi, dán ở quầy"],
              ["Liên kết cho website", "Nút “Sao chép liên kết” ở “Website & nhúng đặt lịch”", "Gắn vào một nút trên website riêng"],
              ["Mã nhúng", "Nút “Lấy mã nhúng” ở cùng phần đó", "Dán vào website để khách đặt lịch ngay tại đó"],
            ],
          },
        },
        { p: "Link dành cho những nơi khách bấm được. Mã QR dành cho những thứ in ra giấy, nơi khách không bấm được mà chỉ giơ điện thoại lên quét. Hai nút còn lại chỉ cần đến khi tiệm có website riêng." },
      ],
    },
    {
      id: "xem-trang-truoc-khi-chia-se",
      title: "Trước khi chia sẻ trang đặt lịch công khai: xem nó như một người khách",
      blocks: [
        { p: "Nút “Xem trang” mở trang salon đúng như khách nhìn thấy. Hãy bấm nút này trước khi gửi link đi bất cứ đâu, và nhìn trang bằng con mắt của người chưa từng đến tiệm." },
        { img: { src: img("trang-salon-dung-nhu-khach-thay"), alt: "Trang công khai của một salon với tên tiệm, điểm đánh giá, địa chỉ, số điện thoại, đoạn giới thiệu và nút Đặt lịch", caption: "Trang salon khách thấy khi mở link: tên, địa chỉ, giới thiệu và nút “Đặt lịch”." } },
        {
          ul: [
            "**Tên, địa chỉ, số điện thoại** có đúng không. Nếu chưa, sửa trong bài [hồ sơ salon](lesson:ho-so-salon).",
            "**Dịch vụ và giá** đã đủ và đúng chưa. Xem lại bài [thêm dịch vụ và giá](lesson:dich-vu).",
            "**Giờ mở cửa** có khớp với thực tế không, vì khách chỉ đặt được trong [giờ mở cửa](lesson:gio-mo-cua).",
          ],
        },
        { p: "Chia sẻ một trang còn thiếu thì phí công. Khách bấm vào, thấy trang trống, và lần sau họ ít khi bấm lại." },
      ],
    },
    {
      id: "dat-link-o-dau",
      title: "Gắn link đặt lịch vào Facebook, Instagram và tin nhắn",
      blocks: [
        { p: "Bài học nêu ba nơi đầu tiên nên dán link: trang Facebook của tiệm, phần giới thiệu Instagram, và tin nhắn gửi thẳng cho khách." },
        {
          ul: [
            "**Trang Facebook:** đặt link ở phần thông tin của trang, và nhắc lại trong những bài đăng giới thiệu mẫu mới hay ưu đãi.",
            "**Phần giới thiệu Instagram:** đây là chỗ khách nhìn khi vào trang cá nhân của tiệm sau khi thấy một tấm ảnh đẹp.",
            "**Tin nhắn:** khi khách nhắn hỏi còn chỗ không, bạn gửi link thay cho việc trả lời từng giờ trống. Khách tự thấy giờ nào còn và tự chọn.",
          ],
        },
        { img: { src: img("nut-sao-chep-link-dat-lich-o-tong-quan"), alt: "Trang Tổng quan của trang quản trị với nút Sao chép link đặt lịch được khoanh vàng, cạnh nút Xem trang salon", caption: "Trang “Tổng quan” cũng có nút “Sao chép link đặt lịch”, tiện cho những lúc cần gửi nhanh." } },
        { note: "Khi đang trả lời tin nhắn của khách, bạn không cần vào “Cài đặt”. Mở trang “Tổng quan”, bấm “Sao chép link đặt lịch” rồi dán vào khung trò chuyện.", kind: "tip", title: "Gửi nhanh" },
      ],
    },
    {
      id: "ma-qr-cua-salon",
      title: "Mã QR đặt lịch của salon: in ở đâu",
      blocks: [
        { p: "Quét mã QR là mở thẳng trang đặt lịch của salon. Bài học gợi ý ba chỗ in: danh thiếp, tờ rơi và ngay tại quầy. Khách vừa làm xong, đang đứng thanh toán, là lúc dễ đặt lần hẹn tiếp theo nhất." },
        { p: "Tệp mã QR tải về từ trang “Cài đặt” là mã trơn, hợp để chèn vào mẫu thiết kế có sẵn của tiệm. Nếu bạn muốn một tấm poster hoàn chỉnh có tiêu đề “Quét để đặt lịch” mà không cần tự thiết kế, xem bài [tạo poster QR đặt lịch](lesson:poster-qr). Bài [tạo bảng giá đa ngôn ngữ](lesson:bang-gia) cũng cho thêm mã QR đặt lịch vào bảng giá." },
      ],
    },
    {
      id: "website-rieng",
      title: "Nhúng trang đặt lịch vào website hay gắn nút đặt lịch",
      blocks: [
        { p: "Phần “Website & nhúng đặt lịch” nằm phía dưới trong trang “Cài đặt”. Nó có hai nút, cho hai cách làm khác nhau:" },
        { img: { src: img("phan-website-va-nhung-dat-lich"), alt: "Phần Website và nhúng đặt lịch với khung Nhúng trang đặt lịch, nút Xem trang, Sao chép liên kết và Lấy mã nhúng" } },
        {
          ul: [
            "**“Sao chép liên kết”:** bạn nhận một đường dẫn để gắn vào một nút trên website, ví dụ nút “Đặt lịch”. Khách bấm nút sẽ được đưa đến trang đặt lịch.",
            "**“Lấy mã nhúng”:** bạn nhận một đoạn mã. Dán đoạn mã đó vào website thì trang đặt lịch hiện ngay tại đó, khách đặt lịch mà không rời website của bạn.",
          ],
        },
        { p: "Nếu website do người khác làm cho tiệm, bạn chỉ cần sao chép đường dẫn hoặc đoạn mã rồi gửi cho họ. Tiệm chưa có website thì xem bài [website riêng cho salon](lesson:website-salon)." },
        { p: "Sau khi link đã có mặt ở các kênh, bạn có thể dùng công cụ [kiểm tra salon trên mạng](/salon-check) để xem tiệm hiện diện thế nào trên Website, Google, Facebook và Instagram." },
      ],
    },
  ],
  howTo: {
    title: "Các bước lấy và chia sẻ link đặt lịch online cho salon trên VaraaAi",
    id: "cac-buoc-chia-se-link",
    after: "ba-dang-cua-trang-dat-lich",
    lead: "Năm bước đầu dành cho mọi tiệm. Hai bước cuối chỉ cần khi tiệm có website riêng.",
    steps: [
      {
        name: "Mở “Cài đặt” và tìm “Trang đặt lịch công khai”",
        text: "Trong trang quản trị, bấm mục “Cài đặt”. Ngay trên cùng, dưới tên salon, là phần “Trang đặt lịch công khai” với đường dẫn của tiệm và ba nút bên dưới.",
        image: { src: img("trang-dat-lich-cong-khai-cua-salon"), alt: "Đầu trang Cài đặt với tên salon và phần Trang đặt lịch công khai hiện đường dẫn của tiệm được khoanh vàng" },
      },
      {
        name: "Bấm biểu tượng sao chép để lấy link",
        text: "Bấm biểu tượng sao chép, nút đầu tiên bên trái. Link đặt lịch được chép vào bộ nhớ tạm của điện thoại hoặc máy tính, sẵn sàng để dán.",
        image: { src: img("bieu-tuong-sao-chep-link-dat-lich"), alt: "Biểu tượng sao chép dưới đường dẫn Trang đặt lịch công khai được khoanh vàng, bên cạnh là biểu tượng mã QR" },
      },
      {
        name: "Dán link vào Facebook, Instagram hoặc tin nhắn",
        text: "Mở trang Facebook của tiệm, phần giới thiệu Instagram, hoặc cuộc trò chuyện với khách rồi dán link. Hãy tự bấm thử link một lần sau khi dán để chắc nó mở đúng trang của tiệm.",
      },
      {
        name: "Bấm biểu tượng mã QR để tải mã QR",
        text: "Bấm biểu tượng mã QR bên cạnh để tải mã QR của salon. Dùng tệp này để in lên danh thiếp, tờ rơi, hoặc in ra dán ở quầy.",
        image: { src: img("bieu-tuong-tai-ma-qr-cua-salon"), alt: "Biểu tượng mã QR nằm giữa biểu tượng sao chép và nút Xem trang được khoanh vàng trong phần Trang đặt lịch công khai" },
      },
      {
        name: "Bấm “Xem trang”",
        text: "Bấm nút “Xem trang” để xem trang salon đúng như khách nhìn thấy. Kiểm tra tên, địa chỉ, dịch vụ và nút “Đặt lịch” trước khi quảng bá rộng hơn.",
        image: { src: img("nut-xem-trang-salon"), alt: "Nút màu vàng Xem trang được khoanh trong phần Trang đặt lịch công khai của trang Cài đặt salon" },
      },
      {
        name: "Có website riêng: bấm “Sao chép liên kết”",
        text: "Kéo xuống phần “Website & nhúng đặt lịch”. Bấm “Sao chép liên kết” rồi gắn đường dẫn này vào một nút trên website của tiệm.",
        image: { src: img("sao-chep-lien-ket-gan-vao-website"), alt: "Khung Nhúng trang đặt lịch với nút Sao chép liên kết được khoanh vàng, bên dưới là nút Lấy mã nhúng" },
      },
      {
        name: "Hoặc bấm “Lấy mã nhúng”",
        text: "Muốn khách đặt lịch ngay trên website, bấm “Lấy mã nhúng” rồi dán đoạn mã vào trang web. Trang đặt lịch sẽ hiện tại đúng chỗ bạn dán.",
        image: { src: img("lay-ma-nhung-dat-lich-cho-website"), alt: "Nút màu đen Lấy mã nhúng được khoanh vàng trong khung Nhúng trang đặt lịch của phần Website và nhúng đặt lịch" },
      },
    ],
  },
  faq: [
    {
      q: "Link đặt lịch công khai của salon nằm ở đâu?",
      a: "Ở trên cùng trang “Cài đặt”, trong phần “Trang đặt lịch công khai”. Phần này có biểu tượng sao chép, biểu tượng mã QR và nút “Xem trang”. Trang “Tổng quan” cũng có nút “Sao chép link đặt lịch”.",
    },
    {
      q: "Nên dán link đặt lịch của salon ở đâu?",
      a: "Trước hết là trang Facebook của tiệm, phần giới thiệu Instagram và tin nhắn gửi cho khách. Có website riêng thì gắn thêm vào một nút trên website. Link xuất hiện ở càng nhiều nơi thì khách càng dễ đặt.",
    },
    {
      q: "Mã QR của salon dùng để làm gì?",
      a: "Để in lên danh thiếp, tờ rơi hoặc dán ở quầy. Khách quét mã bằng điện thoại là mở thẳng trang đặt lịch của salon, không cần gõ địa chỉ.",
    },
    {
      q: "Muốn khách đặt lịch ngay trên website riêng thì làm thế nào?",
      a: "Trong “Cài đặt”, kéo xuống phần “Website & nhúng đặt lịch” và bấm “Lấy mã nhúng”. Dán đoạn mã đó vào website là trang đặt lịch hiện ngay tại đó.",
    },
    {
      q: "“Sao chép liên kết” và “Lấy mã nhúng” khác nhau thế nào?",
      a: "“Sao chép liên kết” cho bạn một đường dẫn để gắn vào một nút trên website, khách bấm sẽ đến trang đặt lịch. “Lấy mã nhúng” cho một đoạn mã để dán vào website, khách đặt lịch ngay trên trang của bạn.",
    },
    {
      q: "Làm sao xem trang salon giống như khách nhìn thấy?",
      a: "Bấm nút “Xem trang” trong phần “Trang đặt lịch công khai” ở đầu trang “Cài đặt”. Nút này mở trang salon đúng như khách thấy khi bấm vào link của tiệm.",
    },
  ],
  related: ["poster-qr", "bang-gia", "website-salon", "kiem-tra-salon"],
};

export default article;
