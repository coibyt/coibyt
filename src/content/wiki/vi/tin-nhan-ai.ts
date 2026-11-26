import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tin-nhan-ai/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "tra-loi-tin-nhan-khach-tu-dong-bang-ai",
  lesson: "tin-nhan-ai",
  category: "salon",
  title: "Trả lời tin nhắn khách tự động bằng AI: hộp thư salon, câu trả lời mẫu và trợ lý AI khi bạn vắng mặt",
  metaTitle: "Trả lời tin nhắn khách tự động bằng AI cho salon",
  metaDescription:
    "Cách dùng Hộp thư của VaraaAi cho tiệm nail, tóc, spa: lọc tin chưa đọc, trả lời bằng câu mẫu, bật trợ lý AI trả lời khách khi bạn bận và bật thông báo.",
  keyword: "trả lời tin nhắn khách tự động bằng AI",
  keywords: [
    "trợ lý AI cho salon",
    "chatbot trả lời khách cho tiệm nail",
    "câu trả lời mẫu cho khách hàng spa",
    "mẫu tin nhắn trả lời khách đặt lịch",
    "quản lý tin nhắn khách hàng salon",
    "tự động trả lời khách khi vắng mặt",
    "khung chat trên website salon",
  ],
  excerpt: "Hộp thư gom tin nhắn của khách về một chỗ. Câu mẫu giúp trả lời trong một lần bấm, còn trợ lý AI trả lời thay khi bạn bận, dựa trên dịch vụ và sản phẩm của salon.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chu-tiem-va-khach-noi-chuyen-ben-quay"),
    alt: "Một người đàn ông tóc vàng mặc áo len cười nói với một phụ nữ đang cầm điện thoại bên quầy gỗ cạnh cửa sổ lớn",
  },
  takeaways: [
    "Mục “Tin nhắn” gom mọi tin nhắn của khách về một chỗ, kèm số tin **chưa đọc** và số tin **đang chờ bạn trả lời**.",
    "Năm câu trả lời mẫu có sẵn: “Chào khách”, “Đặt lịch”, “Còn chỗ”, “Hết chỗ”, “Cảm ơn”. Bạn sửa được trước khi gửi và tự thêm mẫu riêng.",
    "Đánh dấu **“Bật trợ lý AI”** thì AI tự trả lời khách khi bạn vắng mặt, dựa trên **dịch vụ và sản phẩm của salon**.",
    "Khách vẫn bấm được “Nói chuyện với chủ salon” bất cứ lúc nào để gặp người thật.",
    "Bấm “Bật thông báo trên thiết bị này” để không bỏ lỡ tin nhắn.",
  ],
  intro: [
    "Chủ tiệm tìm cách trả lời tin nhắn khách tự động bằng AI thường vì một lý do rất thực tế: lúc khách nhắn hỏi thì tay bạn đang cầm cọ sơn hoặc cây kéo. Khách nhắn mà không ai trả lời là mất khách. Hộp thư của VaraaAi gom tin nhắn của khách về một chỗ, có sẵn câu trả lời mẫu, và có trợ lý AI trực thay khi bạn bận.",
    "Bài viết này đi theo bài học “Tin nhắn và trợ lý AI” của VaraaAi Academy. Bạn sẽ biết đọc các con số của hộp thư, trả lời một khách bằng tay hoặc bằng câu mẫu, bật trợ lý AI và hiểu nó trả lời dựa trên điều gì.",
  ],
  sections: [
    {
      id: "vi-sao-tin-nhan-mat-khach",
      title: "Vì sao tin nhắn chậm trả lời làm salon mất khách",
      blocks: [
        { p: "Người nhắn tin hỏi “chiều thứ Bảy tiệm còn chỗ không” thường đang quyết định ngay lúc đó. Nếu tiệm im lặng, họ nhắn sang tiệm khác. Thợ làm đẹp lại là nghề khó trả lời nhanh nhất: một bộ móng hay một bộ mi không cho phép bạn bỏ tay ra cầm điện thoại." },
        { img: { src: img("tin-nhan-khach-hoi-con-cho-khong"), alt: "Cuộc trò chuyện với khách Nam, tin nhắn hỏi chiều thứ Bảy tiệm còn chỗ làm gel manicure không được khoanh vàng", caption: "Một câu hỏi điển hình. Dòng phía trên cho biết trợ lý AI đang tắt hay đang bật cho cả salon." } },
        { p: "Có ba cách rút ngắn thời gian chờ của khách, và mục “Tin nhắn” có cả ba. Tin nhắn nằm ở một chỗ nên không bị sót. Câu trả lời mẫu giảm việc gõ xuống còn một lần bấm. Trợ lý AI trả lời thay trong những lúc bạn không thể trả lời." },
        { p: "Muốn biết phía khách nhìn thấy gì khi họ nhắn cho tiệm, xem bài [nhắn tin cho salon](lesson:chat-voi-salon)." },
      ],
    },
    {
      id: "hop-thu-va-cac-con-so",
      title: "Quản lý tin nhắn khách hàng salon trong một hộp thư",
      blocks: [
        { p: "Phần trên cùng của mục “Tin nhắn” là các ô số. Nhìn vào đó bạn biết ngay hôm nay hộp thư cần bao nhiêu công sức:" },
        {
          table: {
            head: ["Ô số", "Ý nghĩa", "Nên làm gì"],
            rows: [
              ["Cuộc trò chuyện", "Số cuộc trò chuyện với khách trong hộp thư", "Chỉ để nắm tổng thể"],
              ["Tin chưa đọc", "Số tin bạn chưa mở", "Mở đọc trước, kể cả khi chưa trả lời ngay được"],
              ["Chờ bạn trả lời", "Số tin khách đang đợi câu trả lời của bạn", "Đây là con số cần đưa về 0 trước tiên"],
              ["AI đã trả lời (30 ngày)", "Số tin trợ lý AI đã trả lời trong 30 ngày", "Cho thấy trợ lý AI đang đỡ cho bạn bao nhiêu việc"],
            ],
          },
        },
        { p: "Bên dưới là ô “Tìm khách...” và danh sách khách. Hai bộ lọc “Chưa đọc” và “Chờ trả lời” thu danh sách về đúng những cuộc trò chuyện cần bạn xử lý. Một thói quen tốt là mở bộ lọc “Chờ trả lời” vào những lúc nghỉ giữa hai khách và trả lời hết một lượt." },
      ],
    },
    {
      id: "cau-tra-loi-mau",
      title: "Câu trả lời mẫu cho khách hàng: năm mẫu có sẵn và mẫu của riêng bạn",
      blocks: [
        { p: "Phần lớn tin nhắn của khách xoay quanh vài câu hỏi giống nhau. Vì vậy ngay dưới ô nhập tin nhắn có hàng “Trả lời nhanh” với năm câu mẫu:" },
        {
          table: {
            head: ["Mẫu", "Dùng khi"],
            rows: [
              ["“Chào khách”", "Mở đầu cuộc trò chuyện với một khách mới nhắn"],
              ["“Đặt lịch”", "Khách hỏi về việc đặt lịch"],
              ["“Còn chỗ”", "Khách hỏi tiệm còn chỗ không, và tiệm còn"],
              ["“Hết chỗ”", "Khung giờ khách hỏi đã kín"],
              ["“Cảm ơn”", "Kết thúc cuộc trò chuyện"],
            ],
          },
        },
        { p: "Bấm một mẫu thì câu trả lời được điền sẵn, và bạn vẫn sửa được trước khi gửi. Hãy tận dụng điều đó: thêm giờ cụ thể hoặc tên dịch vụ vào câu mẫu để khách thấy mình được trả lời riêng. Trong video bài học, câu trả lời cho khách là còn chỗ, kèm lời mời đặt lúc 14 giờ thứ Bảy." },
        { img: { src: img("tin-nhan-tra-loi-da-gui-cho-khach"), alt: "Cuộc trò chuyện với khách Nam sau khi gửi, tin trả lời còn chỗ và mời đặt lúc 14 giờ thứ Bảy được khoanh vàng", caption: "Câu trả lời đã gửi hiện ngay dưới câu hỏi của khách." } },
        { p: "Bạn cũng tự tạo được mẫu riêng bằng nút “Thêm mẫu”. Nên tạo mẫu cho những câu bạn thấy mình gõ đi gõ lại. Vài ví dụ thường gặp ở tiệm làm đẹp: chỉ đường và chỗ đậu xe, dặn khách trước khi nối mi, cách tiệm nhận thanh toán." },
        { note: "Một câu mẫu tốt trả lời xong câu hỏi và chỉ luôn bước tiếp theo. Ví dụ, sau khi báo còn chỗ, mời khách đặt qua [link đặt lịch](lesson:chia-se-link) của tiệm để giờ đó được giữ ngay.", kind: "tip", title: "Trả lời kèm bước tiếp theo" },
      ],
    },
    {
      id: "tro-ly-ai-tra-loi-dua-tren-gi",
      title: "Trợ lý AI cho salon trả lời dựa trên gì",
      blocks: [
        { p: "Phần “Cài đặt tin nhắn” có mục “Trợ lý AI khi bạn vắng mặt”. Dòng giải thích ngay trên màn hình nói rõ hai điều. Khi bật, trợ lý AI tự động trả lời khách dựa trên dịch vụ và sản phẩm hiện có của salon. Và khách có thể bấm “Nói chuyện với chủ salon” bất cứ lúc nào để yêu cầu bạn trực tiếp trả lời." },
        { p: "Điều thứ nhất quyết định chất lượng câu trả lời. Trợ lý AI nói lại những gì trang salon của bạn đang có. Giá trong menu sai thì AI báo giá sai. Một dịch vụ tiệm đã ngừng làm mà vẫn còn trong danh sách thì AI vẫn giới thiệu. Vì vậy, trước khi bật, hãy rà lại hai nơi:" },
        {
          ul: [
            "**Menu dịch vụ**: tên, thời lượng và giá đúng với thực tế. Xem bài [menu dịch vụ salon](lesson:dich-vu).",
            "**Sản phẩm**, nếu tiệm có bán: tên, giá và tình trạng còn hàng. Xem bài [bán sản phẩm và quản lý đơn hàng](lesson:san-pham-don-hang).",
          ],
        },
        { p: "Điều thứ hai giữ cho khách không bị kẹt với máy. Có những câu hỏi mà chỉ người trong tiệm mới trả lời được, ví dụ một yêu cầu riêng về mẫu móng hay một lời phàn nàn. Khi khách bấm “Nói chuyện với chủ salon”, bạn nhận được thông báo để vào trả lời trực tiếp." },
        { note: "Trợ lý AI trực thay khi bạn vắng mặt, không thay bạn hẳn. Hãy vẫn mở hộp thư mỗi ngày, đọc lại những gì AI đã trả lời và tiếp lời ở những chỗ khách cần người thật.", kind: "warn", title: "Vẫn cần người đọc lại" },
      ],
    },
    {
      id: "thong-bao-va-khung-chat",
      title: "Bật thông báo và đưa khung chat lên website của tiệm",
      blocks: [
        { p: "Ngay dưới mục trợ lý AI là “Thông báo khi khách muốn nói chuyện trực tiếp”. Bấm “Bật thông báo trên thiết bị này” thì chiếc điện thoại hoặc máy tính bảng bạn đang cầm sẽ nhận thông báo đẩy, ngoài email, khi khách bấm “Nói chuyện với chủ salon”. Thông báo được bật cho từng thiết bị, nên hãy bấm trên chính chiếc máy bạn mang theo người." },
        { p: "Cùng trang cài đặt còn có phần “Nhúng khung chat”. Theo dòng mô tả trên màn hình, phần này cho phép khách chat với bạn ngay trên website riêng, khách không cần tài khoản, và nội dung chat hiện ngay tại hộp thư này. Ba nút đi kèm là “Xem trang”, “Sao chép liên kết” và “Lấy mã nhúng”. Tiệm chưa có trang web riêng có thể xem bài [làm website cho salon miễn phí](lesson:website-salon)." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi trả lời tin nhắn khách",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Khách hỏi “tiệm còn chỗ không” lúc bạn đang làm", "Bấm mẫu “Còn chỗ” hoặc “Hết chỗ”, thêm giờ cụ thể rồi gửi"],
              ["Tin nhắn đến ngoài giờ làm việc", "Bật trợ lý AI để khách nhận được câu trả lời về dịch vụ và sản phẩm ngay"],
              ["AI trả lời giá không đúng", "Sửa giá trong mục “Dịch vụ”. AI trả lời dựa trên dịch vụ và sản phẩm hiện có của salon"],
              ["Khách muốn nói chuyện với người thật", "Khách bấm “Nói chuyện với chủ salon”. Bạn nhận thông báo và vào trả lời"],
              ["Hay bỏ lỡ tin nhắn", "Bấm “Bật thông báo trên thiết bị này” trên máy bạn dùng hằng ngày"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "Các bước trả lời tin nhắn khách và bật trợ lý AI trên VaraaAi",
    id: "cac-buoc-tra-loi-tin-nhan",
    after: "hop-thu-va-cac-con-so",
    lead: "Bảy bước dưới đây đi từ hộp thư, qua một cuộc trò chuyện, đến phần cài đặt, theo đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Bấm mục “Tin nhắn”",
        text: "Trong trang quản trị, bấm mục “Tin nhắn”. Trên cùng là số cuộc trò chuyện, số tin chưa đọc và số tin đang chờ bạn trả lời. Nhìn ba con số này trước để biết có ai đang đợi.",
        image: { src: img("hop-thu-so-cuoc-tro-chuyen-tin-chua-doc"), alt: "Bốn ô số của hộp thư được khoanh vàng: Cuộc trò chuyện, Tin chưa đọc, Chờ bạn trả lời và AI đã trả lời trong 30 ngày" },
      },
      {
        name: "Lọc theo “Chưa đọc” hoặc “Chờ trả lời”",
        text: "Dưới ô tìm kiếm, bấm “Chưa đọc” hoặc “Chờ trả lời” để danh sách chỉ còn những khách cần bạn xử lý. Khi hộp thư đã có nhiều cuộc trò chuyện, bộ lọc giúp bạn không sót người đang đợi.",
        image: { src: img("loc-tin-nhan-chua-doc-cho-tra-loi"), alt: "Hàng bộ lọc Tất cả, Chưa đọc, Chờ trả lời được khoanh vàng phía trên danh sách khách trong hộp thư" },
      },
      {
        name: "Bấm vào một khách để mở cuộc trò chuyện",
        text: "Bấm vào tên khách trong danh sách. Cuộc trò chuyện mở ra với tên khách ở trên cùng và các tin nhắn bên dưới. Đọc hết câu hỏi của khách trước khi trả lời.",
        image: { src: img("bam-vao-khach-de-mo-cuoc-tro-chuyen"), alt: "Danh sách hộp thư với dòng của khách Nam được khoanh vàng, hiện câu hỏi chiều thứ Bảy tiệm còn chỗ không" },
      },
      {
        name: "Gõ câu trả lời và bấm gửi",
        text: "Gõ câu trả lời vào ô “Nhập tin nhắn...” ở cuối màn hình, rồi bấm nút gửi bên phải. Trả lời thẳng vào điều khách hỏi và nêu giờ cụ thể nếu khách hỏi về chỗ trống.",
        image: { src: img("go-cau-tra-loi-vao-o-nhap-tin-nhan"), alt: "Ô nhập tin nhắn đang ghi câu trả lời còn chỗ được khoanh vàng, bên phải là nút gửi hình mũi tên" },
      },
      {
        name: "Dùng câu trả lời mẫu cho nhanh",
        text: "Ngay dưới ô nhập là các câu mẫu “Chào khách”, “Đặt lịch”, “Còn chỗ”, “Hết chỗ”, “Cảm ơn”. Bấm một mẫu, sửa lại cho hợp rồi gửi. Bấm “Thêm mẫu” để tạo mẫu riêng cho những câu bạn hay phải gõ.",
        image: { src: img("cau-tra-loi-mau-chao-khach-dat-lich"), alt: "Hàng Trả lời nhanh với các câu mẫu Chào khách và Đặt lịch được khoanh vàng ngay dưới ô nhập tin nhắn" },
      },
      {
        name: "Đánh dấu “Bật trợ lý AI”",
        text: "Kéo xuống phần “Cài đặt tin nhắn” và đánh dấu ô “Bật trợ lý AI”. Từ lúc đó AI tự trả lời khách khi bạn vắng mặt, dựa trên dịch vụ và sản phẩm của salon. Khách vẫn bấm được “Nói chuyện với chủ salon” khi muốn gặp bạn.",
        image: { src: img("cai-dat-tro-ly-ai-khi-ban-vang-mat"), alt: "Phần Cài đặt tin nhắn với mục Trợ lý AI khi bạn vắng mặt và ô đánh dấu Bật trợ lý AI được khoanh vàng" },
      },
      {
        name: "Bấm “Bật thông báo trên thiết bị này”",
        text: "Ngay bên dưới, bấm “Bật thông báo trên thiết bị này”. Thiết bị sẽ báo cho bạn khi khách muốn nói chuyện trực tiếp, nên bạn không bỏ lỡ tin nhắn dù đang không mở trang quản trị.",
        image: { src: img("bat-thong-bao-tren-thiet-bi-nay"), alt: "Nút Bật thông báo trên thiết bị này được khoanh vàng, bên dưới là phần Nhúng khung chat với nút Lấy mã nhúng" },
      },
    ],
  },
  faq: [
    {
      q: "Trợ lý AI của VaraaAi trả lời khách dựa trên thông tin nào?",
      a: "Trợ lý AI trả lời dựa trên dịch vụ và sản phẩm hiện có của salon. Vì vậy bạn cần giữ tên dịch vụ, giá và sản phẩm luôn đúng, vì AI sẽ nói lại đúng những gì trang salon đang có.",
    },
    {
      q: "Khi trợ lý AI đang bật, khách muốn nói chuyện với người thật thì làm sao?",
      a: "Khách bấm “Nói chuyện với chủ salon” bất cứ lúc nào. Bạn nhận được thông báo để vào trả lời trực tiếp.",
    },
    {
      q: "Cách bật trợ lý AI trả lời tin nhắn khách tự động như thế nào?",
      a: "Mở mục “Tin nhắn”, kéo xuống phần “Cài đặt tin nhắn” và đánh dấu ô “Bật trợ lý AI”. AI sẽ tự trả lời khách khi bạn vắng mặt.",
    },
    {
      q: "Câu trả lời mẫu có sửa được trước khi gửi không?",
      a: "Có. Câu mẫu nằm ngay dưới ô nhập tin nhắn, và bạn vẫn sửa được trước khi gửi. Bạn cũng bấm “Thêm mẫu” để tạo mẫu của riêng mình.",
    },
    {
      q: "Trả lời nhanh nhất cho câu “tiệm còn chỗ không” bằng cách nào?",
      a: "Bấm câu trả lời mẫu “Còn chỗ” ngay dưới ô nhập tin nhắn, thêm giờ cụ thể nếu cần rồi gửi. Nếu khung giờ đó đã kín, dùng mẫu “Hết chỗ”.",
    },
    {
      q: "Làm sao để không bỏ lỡ tin nhắn của khách?",
      a: "Trong “Cài đặt tin nhắn”, bấm “Bật thông báo trên thiết bị này” trên chiếc máy bạn dùng hằng ngày. Trong hộp thư, lọc theo “Chưa đọc” hoặc “Chờ trả lời” để thấy ngay những khách đang đợi.",
    },
  ],
  related: ["khach-hang", "danh-gia-google", "dich-vu", "chat-voi-salon"],
};

export default article;
