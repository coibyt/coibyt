import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/danh-gia-google/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-xin-danh-gia-google-cho-salon",
  lesson: "danh-gia-google",
  category: "marketing",
  title: "Cách xin đánh giá Google cho salon: duyệt đánh giá, trả lời khách và mời khách hài lòng lên Google",
  metaTitle: "Cách xin đánh giá Google cho salon, tiệm nail, spa",
  metaDescription:
    "Hướng dẫn chủ tiệm nail, tóc, spa quản lý đánh giá trên VaraaAi: duyệt trước khi đăng, trả lời bằng mẫu có sẵn và thêm liên kết Google Maps để mời khách đánh giá.",
  keyword: "cách xin đánh giá Google cho salon",
  keywords: [
    "cách xin đánh giá Google cho tiệm nail",
    "cách trả lời đánh giá của khách hàng",
    "mẫu trả lời đánh giá 5 sao",
    "trả lời đánh giá xấu của khách như thế nào",
    "tăng đánh giá Google Maps cho spa",
    "email mời khách đánh giá sau khi làm",
    "duyệt đánh giá trước khi đăng lên trang salon",
  ],
  excerpt: "Khách nhận email mời đánh giá sau mỗi lịch hẹn đã hoàn thành. Bạn duyệt, đăng, trả lời bằng mẫu có sẵn, và thêm liên kết Google Maps để khách hài lòng đánh giá cả trên Google.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-nu-cuoi-nhin-dien-thoai-trong-salon"),
    alt: "Một phụ nữ tóc vàng ngắn mặc áo len trắng cười tươi nhìn điện thoại trong salon, phía trên điện thoại có biểu tượng hộp quà phát sáng",
  },
  takeaways: [
    "Khách **tự động nhận email mời đánh giá** sau mỗi lịch hẹn đã hoàn thành. Bạn không cần làm gì thêm.",
    "Đánh giá mới chỉ hiện trên trang của salon **sau khi bạn bấm “Đăng lên trang”**.",
    "Nút màu vàng đăng nhanh mọi đánh giá 4–5 sao đang chờ duyệt.",
    "Trả lời bằng ba mẫu có sẵn: “Cảm ơn”, “Ghi nhận”, “Xin lỗi”. Sửa cho hợp rồi bấm “Đăng phản hồi”.",
    "Thêm **liên kết Google Maps** trong “Cài đặt” để khách hài lòng được mời đánh giá cả trên Google.",
  ],
  intro: [
    "Cách xin đánh giá Google cho salon mà ít tốn công nhất là để việc mời diễn ra đều đặn sau mỗi lần khách làm xong, thay cho việc thỉnh thoảng nhớ ra thì nhờ. Khách mới thường đọc đánh giá trước khi chọn tiệm, nên vài dòng nhận xét thật của khách cũ có sức nặng hơn mọi lời tự giới thiệu.",
    "Bài viết này đi theo bài học “Đánh giá và Google” của VaraaAi Academy. Bạn sẽ biết duyệt từng đánh giá trước khi nó hiện trên trang salon, trả lời khách bằng mẫu có sẵn, và bật lời mời để khách hài lòng đánh giá thêm trên Google.",
  ],
  sections: [
    {
      id: "danh-gia-den-tu-dau",
      title: "Đánh giá đến từ đâu: email mời khách đánh giá sau khi làm",
      blocks: [
        { p: "Phần khó nhất của việc xin đánh giá là nhớ để xin. Thợ đang bận khách kế tiếp, khách thì đang vội về. Trên VaraaAi, việc này không dựa vào trí nhớ của ai: khách tự động nhận email mời đánh giá sau mỗi lịch hẹn đã hoàn thành." },
        { img: { src: img("tu-dong-moi-danh-gia-sau-lich-hen"), alt: "Trang Đánh giá với mục Tự động mời đánh giá được khoanh vàng, nằm dưới phần Có thêm đánh giá trên Google và nút Mở Cài đặt", caption: "Mục “Tự động mời đánh giá” ghi rõ: khách nhận email mời sau mỗi lịch hẹn đã hoàn thành." } },
        { p: "Hai điều kiện ẩn trong câu đó đáng để ý. Lịch hẹn phải nằm trên hệ thống, và nó phải được ghi là đã hoàn thành. Tiệm giữ lịch gọn gàng, như trong bài [quản lý lịch hẹn](lesson:lich-hen), thì lời mời tự đi đến đúng người đã thật sự đến làm." },
        { p: "Muốn biết phía khách thấy gì khi chấm sao và viết nhận xét, xem bài [cách viết đánh giá salon](lesson:viet-danh-gia)." },
      ],
    },
    {
      id: "trang-danh-gia",
      title: "Trang “Đánh giá”: điểm trung bình, chờ duyệt và tỉ lệ phản hồi",
      blocks: [
        { p: "Mở mục “Đánh giá”, phần trên cùng cho bạn ba con số, và ngay dưới là điểm trung bình kèm số đánh giá ở từng mức sao." },
        {
          table: {
            head: ["Con số", "Ý nghĩa", "Việc của bạn"],
            rows: [
              ["Điểm trung bình", "Số sao trung bình trên 5 của các đánh giá", "Theo dõi xu hướng, đừng lo vì một đánh giá riêng lẻ"],
              ["“Chờ duyệt”", "Số đánh giá khách đã gửi mà bạn chưa đăng hoặc ẩn", "Duyệt đều tay để đánh giá mới sớm hiện trên trang"],
              ["Tỉ lệ phản hồi", "Phần đánh giá đã được salon trả lời", "Trả lời càng nhiều, con số này càng cao"],
            ],
          },
        },
        { p: "Bên dưới là các bộ lọc: “Chờ duyệt”, “Chưa trả lời”, “Đã đăng” và “Đã ẩn”. Hai bộ lọc đầu chính là danh sách việc cần làm của bạn. Trang còn có ô tìm theo tên khách hoặc nội dung, và cuối trang là phần “Điểm theo nhân viên”." },
        { img: { src: img("bo-loc-danh-gia-cho-duyet-chua-tra-loi"), alt: "Hàng bộ lọc Tất cả, Chờ duyệt, Chưa trả lời được khoanh vàng, bên dưới là ô tìm kiếm và nút vàng đăng đánh giá đang chờ", caption: "Dòng chữ trong khung vàng nhạt nhắc: đánh giá mới chỉ hiện trên trang của salon sau khi bạn bấm Đăng." } },
      ],
    },
    {
      id: "duyet-danh-gia",
      title: "Duyệt đánh giá trước khi đăng lên trang salon",
      blocks: [
        { p: "Một đánh giá mới không tự hiện ra với mọi người. Nó nằm ở trạng thái “Chờ duyệt” cho đến khi bạn quyết định. Với từng đánh giá, bạn có hai lựa chọn: “Đăng lên trang” để công khai, hoặc “Ẩn” nếu nội dung không phù hợp." },
        { p: "Khi có nhiều đánh giá tốt đang chờ, bạn không cần bấm từng cái. Nút màu vàng phía trên danh sách đăng một lượt mọi đánh giá 4–5 sao đang chờ, và trên nút có ghi sẵn số lượng." },
        { note: "Nút “Ẩn” dành cho nội dung không phù hợp. Một đánh giá chê có lý do thì khác: đăng nó kèm một lời đáp tử tế cho khách mới thấy tiệm xử lý vấn đề ra sao. Khách mới đọc cả cách tiệm trả lời, không riêng số sao.", kind: "tip", title: "Đừng ẩn mọi lời chê" },
      ],
    },
    {
      id: "cach-tra-loi-danh-gia",
      title: "Cách trả lời đánh giá của khách hàng: ba mẫu có sẵn",
      blocks: [
        { p: "Bấm “Trả lời” dưới một đánh giá, phần “Mẫu trả lời” mở ra với ba mẫu. Trên màn hình, mỗi mẫu ghi kèm mức sao mà nó hợp:" },
        {
          table: {
            head: ["Mẫu", "Hợp với", "Nên sửa thêm gì"],
            rows: [
              ["“Cảm ơn”", "Đánh giá 5 sao", "Nhắc đến dịch vụ khách đã làm hoặc tên người thợ"],
              ["“Ghi nhận”", "Đánh giá 4 sao", "Nói rõ bạn ghi nhận điểm nào khách góp ý"],
              ["“Xin lỗi”", "Đánh giá từ 3 sao trở xuống", "Nêu việc tiệm sẽ làm khác đi, và mời khách liên hệ trực tiếp"],
            ],
          },
        },
        { p: "Mẫu chỉ là điểm xuất phát. Bài học dặn chọn mẫu rồi sửa lại cho hợp, vì một câu trả lời giống hệt nhau dưới mọi đánh giá cho thấy tiệm không đọc. Chỉ cần thêm một chi tiết riêng của lần hẹn đó là đủ." },
        { img: { src: img("phan-hoi-cua-salon-duoi-danh-gia"), alt: "Một đánh giá 5 sao đã đăng của khách Nam, phần Phản hồi của salon ghi lời cảm ơn được khoanh vàng ngay bên dưới", caption: "Lời đáp của salon hiện ngay dưới đánh giá của khách. Nút “Sửa trả lời” nằm bên dưới." } },
        { p: "Trả lời cả những đánh giá tốt, không riêng đánh giá chê. Khách đã bỏ công viết vài dòng khen sẽ thấy mình được trân trọng khi tiệm đáp lại. Với lời phàn nàn, hãy ghi điều khách không hài lòng vào ghi chú nội bộ trong [sổ khách hàng](lesson:khach-hang), để lần sau cả tiệm cùng biết." },
      ],
    },
    {
      id: "xin-danh-gia-google",
      title: "Tăng đánh giá Google Maps cho tiệm: thêm liên kết trong Cài đặt",
      blocks: [
        { p: "Đánh giá trên trang salon giúp người đã tìm thấy bạn trên VaraaAi. Đánh giá trên Google giúp người đang tìm tiệm trên Google và Google Maps. Hai nơi này bổ sung cho nhau, và bài học cho bạn một cách nối chúng lại." },
        { p: "Trên trang “Đánh giá” có phần “Có thêm đánh giá trên Google”. Phần này ghi: thêm liên kết Google Maps trong Cài đặt để mời khách đánh giá trên Google, kèm nút “Mở Cài đặt”. Liên kết Google Maps ở đây là đường link dẫn đến địa điểm của tiệm bạn trên Google Maps. Sau khi bạn thêm liên kết, khách hài lòng sẽ được mời đánh giá cả trên Google." },
        { img: { src: img("co-them-danh-gia-tren-google-mo-cai-dat"), alt: "Phần Có thêm đánh giá trên Google màu tối với nút Mở Cài đặt được khoanh vàng, bên dưới là mục Tự động mời đánh giá", caption: "Bấm “Mở Cài đặt” để đến nơi thêm liên kết Google Maps của tiệm." } },
        { p: "Bạn không trả phí nào cho Google để làm việc này. Việc bạn cần chuẩn bị là tiệm đã có mặt trên Google Maps. Nếu chưa chắc tiệm mình đang hiện ra sao trên Google, bài [kiểm tra miễn phí website, Google, Facebook của tiệm](lesson:kiem-tra-salon) giúp bạn xem lại." },
        { note: "Lời mời qua email làm phần việc đều đặn. Một câu nói ở quầy lúc khách vừa xong và đang vui vẫn có sức riêng của nó, ví dụ: “Chị thấy ưng thì lát có email, chị viết giúp em vài dòng nhé”.", kind: "tip", title: "Nhắc thêm bằng lời" },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi quản lý đánh giá",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Khách nói đã viết đánh giá mà trang salon chưa thấy", "Mở bộ lọc “Chờ duyệt” và bấm “Đăng lên trang”. Đánh giá chỉ hiện sau khi bạn đăng"],
              ["Có nhiều đánh giá tốt đang chờ", "Bấm nút màu vàng để đăng nhanh mọi đánh giá 4–5 sao đang chờ"],
              ["Nhận một đánh giá thấp sao", "Đọc kỹ, bấm “Trả lời”, chọn mẫu “Xin lỗi” rồi sửa cho đúng sự việc"],
              ["Đã đăng phản hồi nhưng muốn viết lại", "Bấm “Sửa trả lời” dưới phản hồi của salon"],
              ["Muốn có thêm đánh giá trên Google", "Bấm “Mở Cài đặt” ở phần “Có thêm đánh giá trên Google” và thêm liên kết Google Maps"],
            ],
          },
        },
        { p: "Một tin nhắn không ai trả lời cũng dễ thành một đánh giá thấp. Bài [tin nhắn và trợ lý AI](lesson:tin-nhan-ai) chỉ cách để khách luôn nhận được câu trả lời, kể cả khi bạn đang bận tay." },
      ],
    },
  ],
  howTo: {
    title: "Các bước duyệt, trả lời đánh giá và xin đánh giá Google cho salon",
    id: "cac-buoc-quan-ly-danh-gia",
    after: "trang-danh-gia",
    lead: "Sáu bước dưới đây theo đúng thứ tự trong video bài học, từ lúc mở trang “Đánh giá” đến lúc nối với Google.",
    steps: [
      {
        name: "Bấm mục “Đánh giá”",
        text: "Trong trang quản trị, bấm mục “Đánh giá”. Trên cùng là điểm trung bình, số đánh giá “Chờ duyệt” và tỉ lệ phản hồi. Con số “Chờ duyệt” cho biết có bao nhiêu đánh giá đang đợi bạn.",
        image: { src: img("tong-quan-danh-gia-ti-le-phan-hoi-cho-duyet"), alt: "Ba ô Tỉ lệ phản hồi, Chờ duyệt và 30 ngày qua được khoanh vàng, bên dưới là điểm trung bình 5.0 trên 5" },
      },
      {
        name: "Lọc các đánh giá đang chờ",
        text: "Bấm bộ lọc “Chờ duyệt” để chỉ thấy những đánh giá chưa được đăng. Các bộ lọc còn lại là “Chưa trả lời”, “Đã đăng” và “Đã ẩn”. Đọc từng đánh giá trước khi quyết định.",
      },
      {
        name: "Bấm “Đăng lên trang” hoặc “Ẩn”",
        text: "Với từng đánh giá, bấm “Đăng lên trang” để công khai nó trên trang salon. Bấm “Ẩn” nếu nội dung không phù hợp. Đánh giá mới chỉ hiện trên trang của salon sau khi bạn bấm đăng.",
        image: { src: img("nut-dang-len-trang-cho-mot-danh-gia"), alt: "Một đánh giá 5 sao đang chờ duyệt của khách Nam với nút Đăng lên trang được khoanh vàng, nằm giữa nút Trả lời và nút Ẩn" },
      },
      {
        name: "Đăng nhanh mọi đánh giá 4–5 sao",
        text: "Khi có nhiều đánh giá tốt đang chờ, bấm nút màu vàng phía trên danh sách. Nút này đăng một lượt tất cả đánh giá 4 và 5 sao đang chờ, nên bạn chỉ còn phải xem riêng các đánh giá thấp hơn.",
        image: { src: img("nut-vang-dang-nhanh-danh-gia-4-5-sao"), alt: "Nút màu vàng ghi Đăng 1 đánh giá 4–5 sao đang chờ được khoanh vàng, phía trên đánh giá chờ duyệt của khách Nam" },
      },
      {
        name: "Bấm “Trả lời”, chọn mẫu rồi “Đăng phản hồi”",
        text: "Bấm “Trả lời” dưới đánh giá. Chọn một mẫu có sẵn, “Cảm ơn”, “Ghi nhận” hoặc “Xin lỗi”, rồi sửa lại cho hợp với khách đó. Bấm “Đăng phản hồi”. Lời đáp của salon hiện ngay dưới đánh giá của khách.",
        image: { src: img("mau-tra-loi-cam-on-ghi-nhan-xin-loi"), alt: "Phần Mẫu trả lời với ba mẫu Cảm ơn, Ghi nhận, Xin lỗi, ô soạn lời cảm ơn và nút vàng Đăng phản hồi" },
      },
      {
        name: "Thêm liên kết Google Maps trong “Cài đặt”",
        text: "Ở phần “Có thêm đánh giá trên Google”, bấm “Mở Cài đặt” và thêm liên kết Google Maps của tiệm. Từ đó khách hài lòng sẽ được mời đánh giá cả trên Google, bên cạnh email mời đánh giá tự động sau mỗi lịch hẹn đã hoàn thành.",
      },
    ],
  },
  faq: [
    {
      q: "Làm sao để khách được mời đánh giá tiệm trên Google?",
      a: "Thêm liên kết Google Maps của tiệm trong “Cài đặt”. Trên trang “Đánh giá”, phần “Có thêm đánh giá trên Google” có nút “Mở Cài đặt” dẫn đến đó. Sau khi thêm, khách hài lòng sẽ được mời đánh giá cả trên Google.",
    },
    {
      q: "Có phải tự gửi lời mời đánh giá cho từng khách không?",
      a: "Không. Khách tự động nhận email mời đánh giá sau mỗi lịch hẹn đã hoàn thành. Bạn không cần làm gì thêm.",
    },
    {
      q: "Đánh giá của khách có tự hiện trên trang salon không?",
      a: "Không. Đánh giá mới chỉ hiện trên trang của salon sau khi bạn bấm “Đăng lên trang”. Bạn duyệt từng đánh giá trước khi công khai, và có thể bấm “Ẩn” nếu nội dung không phù hợp.",
    },
    {
      q: "Có nên trả lời đánh giá 5 sao không?",
      a: "Có. Trả lời cả đánh giá tốt giúp khách thấy mình được trân trọng. Bấm “Trả lời”, chọn mẫu “Cảm ơn”, sửa lại cho hợp rồi bấm “Đăng phản hồi”.",
    },
    {
      q: "Trả lời đánh giá xấu của khách như thế nào?",
      a: "Bấm “Trả lời” và chọn mẫu “Xin lỗi”, là mẫu dành cho đánh giá từ 3 sao trở xuống. Sửa lại cho đúng sự việc của khách đó rồi bấm “Đăng phản hồi”. Lời đáp của salon hiện ngay dưới đánh giá.",
    },
    {
      q: "Làm sao đăng nhanh nhiều đánh giá tốt cùng lúc?",
      a: "Bấm nút màu vàng phía trên danh sách đánh giá. Nút này đăng nhanh mọi đánh giá 4–5 sao đang chờ duyệt.",
    },
  ],
  related: ["tin-nhan-ai", "khach-hang", "viet-danh-gia", "kiem-tra-salon"],
};

export default article;
