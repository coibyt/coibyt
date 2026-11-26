import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/poster-qr/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "ma-qr-dat-lich-cho-salon-tao-poster",
  lesson: "poster-qr",
  category: "marketing",
  title: "Mã QR đặt lịch cho salon: cách tự tạo poster “Quét để đặt lịch” miễn phí trong vài phút",
  metaTitle: "Mã QR đặt lịch cho salon: tự tạo poster QR miễn phí",
  metaDescription:
    "Hướng dẫn tạo poster mã QR đặt lịch cho tiệm nail, tóc, spa bằng công cụ miễn phí của VaraaAi: dán link, chọn tiêu đề, mẫu, khổ in rồi tải PDF hoặc PNG.",
  keyword: "mã QR đặt lịch cho salon",
  keywords: [
    "tạo poster QR quét để đặt lịch",
    "mã QR đặt lịch cho tiệm nail",
    "tạo mã QR cho tiệm miễn phí",
    "poster QR dán cửa tiệm",
    "in mã QR khổ A4, A5, A6",
    "nên dán mã QR ở đâu trong tiệm",
    "thẻ QR đặt bàn cho salon",
  ],
  excerpt: "Nhập link, chọn tiêu đề, mẫu và khổ in, rồi tải PDF hoặc PNG. Công cụ miễn phí, không cần đăng nhập và không cần biết thiết kế.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-va-chu-tiem-ben-the-dung-tai-quay-salon"),
    alt: "Một người đàn ông và một phụ nữ cười nói bên quầy đá của salon, cùng nhìn chiếc điện thoại cạnh một thẻ đứng viền vàng",
  },
  takeaways: [
    "Công cụ tạo poster QR của VaraaAi **miễn phí và không cần đăng nhập**. Tài khoản salon chỉ giúp điền link tự động.",
    "Mã QR mở đúng link bạn dán vào: trang đặt lịch, website, Facebook hoặc Instagram của tiệm.",
    "**“Tải PDF”** để mang đi in, **“Tải PNG”** để đăng mạng xã hội.",
    "**Quét thử mã bằng điện thoại** trước khi in nhiều bản.",
    "Bốn chỗ dán hiệu quả: cửa kính, quầy thanh toán, bàn làm móng và gương trước ghế khách.",
  ],
  intro: [
    "Một tấm poster có mã QR đặt lịch cho salon làm việc ở đúng hai thời điểm mà link trên mạng không với tới: lúc khách đi ngang cửa tiệm, và lúc khách đang ngồi chờ ở quầy. Họ giơ điện thoại lên một lần là trang đặt lịch mở ra, không cần hỏi ai và không cần nhớ tên tiệm để tìm lại sau.",
    "Bài viết này đi theo bài học “Tạo poster QR “Quét để đặt lịch”” của VaraaAi Academy. Bạn sẽ tự làm được một poster hoàn chỉnh trong vài phút, chọn đúng khổ in cho từng vị trí trong tiệm, và biết kiểm tra mã trước khi mang đi in.",
  ],
  sections: [
    {
      id: "vi-sao-can-poster-qr",
      title: "Vì sao tiệm nên có poster mã QR “Quét để đặt lịch”",
      blocks: [
        { p: "Khách vừa làm xong một bộ móng đẹp là người dễ đặt lần hẹn tiếp theo nhất. Nhưng lúc đó họ đang đứng ở quầy, tay cầm ví, và sẽ không mở trình duyệt để gõ địa chỉ trang web. Một mã QR ngay trước mặt biến ý định đó thành một lịch hẹn trước khi họ ra khỏi cửa." },
        { p: "Poster cũng làm việc khi tiệm đóng cửa. Người đi ngang qua lúc tối muộn thấy tấm poster trên cửa kính vẫn quét được mã và giữ chỗ cho hôm sau." },
        { p: "Trước đây, muốn có một tấm poster như vậy bạn phải nhờ người thiết kế. Công cụ trong bài học này làm sẵn phần thiết kế. Bạn chỉ nhập thông tin và chọn mẫu. Nó miễn phí và dùng được ngay, không cần đăng nhập." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi tạo mã QR cho tiệm",
      blocks: [
        {
          ul: [
            "**Đường link khách sẽ mở khi quét mã.** Tốt nhất là link trang đặt lịch của tiệm. Cách lấy link nằm trong bài [chia sẻ link đặt lịch](lesson:chia-se-link). Bạn cũng có thể dùng link riêng như website, Facebook hay Instagram.",
            "**Tên salon** viết đúng như biển hiệu.",
            "**Tệp logo**, nếu tiệm có.",
            "**Vị trí định dán.** Dán cửa, đặt bàn hay đăng Instagram sẽ quyết định bạn chọn khổ nào.",
          ],
        },
        { note: "Nếu tiệm chưa có trang đặt lịch online, bạn tạo được trong vài phút và không mất phí. Xem bài [đăng ký và kích hoạt salon](lesson:dang-ky-salon). Khi đã đăng nhập bằng tài khoản salon, công cụ tạo poster tự điền link giúp bạn.", kind: "info", title: "Chưa có link đặt lịch" },
      ],
    },
    {
      id: "noi-dung-poster",
      title: "Viết gì trên poster: ngôn ngữ, tiêu đề và dòng phụ",
      blocks: [
        { p: "Phần “Nội dung poster” có ba lựa chọn. Mỗi lựa chọn nên được quyết định theo khách của tiệm bạn, không theo sở thích." },
        { h3: "Ngôn ngữ" },
        { p: "Poster hiện được tối đa ba thứ tiếng cùng lúc, và ngôn ngữ chọn đầu tiên là ngôn ngữ chính. Đây là điểm rất hợp với tiệm có khách nhiều nước. Chủ tiệm người Việt ở nước ngoài nên đặt tiếng bản xứ lên đầu, rồi thêm tiếng Anh hoặc tiếng Việt nếu có nhóm khách dùng." },
        { h3: "Tiêu đề lớn" },
        { p: "Bạn chọn một tiêu đề có sẵn như “Quét để đặt lịch” hoặc “Đặt lịch tại đây”. Tiêu đề là thứ khách đọc được từ xa, nên nó cần nói đúng một việc: quét mã này để làm gì." },
        { h3: "Dòng phụ" },
        { p: "Bên dưới tiêu đề, bạn có thể thêm dòng phụ: Ưu đãi, Giờ mở cửa, Số điện thoại và mật khẩu Wi-Fi. Các dòng này không bắt buộc. Dòng Wi-Fi có một tác dụng phụ đáng giá: khách ngồi chờ thường tìm mật khẩu Wi-Fi, và khi tìm thấy nó trên poster thì họ cũng nhìn thấy mã QR." },
        { note: "Đừng điền hết mọi dòng chỉ vì có ô trống. Poster càng ít chữ thì mã QR và tiêu đề càng nổi. Hãy chọn một hoặc hai dòng phụ có ích nhất cho vị trí bạn định dán.", kind: "tip", title: "Ít chữ thì dễ quét" },
      ],
    },
    {
      id: "chon-kho-in",
      title: "In mã QR khổ A4, A5, A6 hay sticker: chọn khổ theo chỗ dán",
      blocks: [
        { p: "Phần “Thiết kế” có bốn mẫu là Tối giản, Sang trọng, Pastel và Theo mùa, cùng một bảng “Màu chủ đạo” để bạn chọn màu hợp với tiệm. Sau đó là khổ. Bài học gợi ý dùng từng khổ như sau:" },
        {
          table: {
            head: ["Khổ", "Dùng ở đâu"],
            rows: [
              ["A4 hoặc A5", "Dán cửa"],
              ["A6", "Đặt bàn"],
              ["Thẻ đứng gập đôi", "Đặt đứng trên mặt quầy hoặc mặt bàn"],
              ["Sticker tròn", "Dán lên những bề mặt nhỏ"],
              ["Khổ vuông và khổ dọc", "Đăng Instagram"],
            ],
          },
        },
        { p: "Bạn không phải chọn một khổ duy nhất. Làm xong poster A4 cho cửa kính, bạn đổi khổ sang A6 và tải thêm một bản để đặt ở bàn làm móng. Nội dung và mẫu giữ nguyên, nên các bản in trong tiệm trông đồng bộ với nhau." },
      ],
    },
    {
      id: "dan-poster-o-dau",
      title: "Nên dán mã QR ở đâu trong tiệm",
      blocks: [
        { p: "Bài học nêu bốn vị trí: cửa kính, quầy thanh toán, bàn làm móng và gương trước ghế khách. Mỗi chỗ bắt gặp khách ở một lúc khác nhau:" },
        {
          table: {
            head: ["Vị trí", "Khách nhìn thấy khi nào"],
            rows: [
              ["Cửa kính", "Khi đi ngang qua, kể cả lúc tiệm đã đóng cửa"],
              ["Quầy thanh toán", "Khi vừa làm xong và đang trả tiền, lúc dễ đặt lần sau nhất"],
              ["Bàn làm móng", "Trong suốt thời gian ngồi làm, mã ở ngay trong tầm tay"],
              ["Gương trước ghế khách", "Khi ngồi làm tóc, mắt khách luôn hướng về gương"],
            ],
          },
        },
        { p: "Nếu mã QR dẫn về trang đặt lịch VaraaAi của salon, trang [Tổng quan](lesson:tong-quan) còn đếm giúp bạn số lượt quét trong 30 ngày. Con số đó cho biết poster có đang được dùng hay không, và có nên đổi chỗ dán." },
      ],
    },
    {
      id: "kiem-tra-truoc-khi-in",
      title: "Kiểm tra trước khi in và vài tình huống hay gặp",
      blocks: [
        { p: "Trước khi in nhiều bản, hãy lấy điện thoại quét thử mã một lần để chắc chắn nó mở đúng trang đặt lịch. Một chữ sai trong link là cả xấp giấy in phải bỏ." },
        { img: { src: img("hai-nut-chinh-sua-va-xem-truoc-poster"), alt: "Công cụ tạo poster QR trên điện thoại với hai nút Chỉnh sửa và Xem trước được khoanh vàng, bên dưới là phần Thông tin salon", caption: "Trên điện thoại, công cụ có hai nút: “Chỉnh sửa” để nhập thông tin và “Xem trước” để xem poster." } },
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Quét mã ra sai trang", "Xem lại link ở phần “Mã QR & link đặt lịch”, sửa rồi tải lại poster"],
              ["Trên điện thoại không thấy poster đâu", "Bấm nút “Xem trước” ở đầu trang"],
              ["Muốn đăng poster lên mạng xã hội", "Chọn khổ vuông hoặc khổ dọc, rồi bấm “Tải PNG”"],
              ["Đang đăng nhập bằng tài khoản salon", "Chọn “Trang đặt lịch VaraaAi của tôi” để link được điền tự động"],
            ],
          },
        },
        { p: "Tiệm cần thêm tài liệu in có mã QR thì xem bài [tạo bảng giá đa ngôn ngữ](lesson:bang-gia), nơi bạn cũng thêm được mã QR đặt lịch vào bảng giá." },
      ],
    },
  ],
  howTo: {
    title: "Các bước tạo poster mã QR đặt lịch cho salon",
    id: "cac-buoc-tao-poster-qr",
    after: "chuan-bi",
    lead: "Tám bước dưới đây theo đúng thứ tự các phần trong công cụ. Bạn làm trên điện thoại hay máy tính đều được.",
    steps: [
      {
        name: "Mở công cụ tạo poster",
        text: "Mở varaaai.com, kéo xuống cuối trang và bấm “Tạo poster QR đặt lịch”, hoặc vào thẳng [công cụ tạo poster QR](/tools/qr-poster). Công cụ dùng được ngay, không cần đăng nhập. Trên điện thoại bạn sẽ thấy hai nút “Chỉnh sửa” và “Xem trước”.",
        image: { src: img("bam-tao-poster-qr-dat-lich-cuoi-trang-chu"), alt: "Phần cuối trang chủ VaraaAi trên điện thoại với dòng Tạo poster QR đặt lịch được khoanh vàng trong nhóm Doanh nghiệp" },
      },
      {
        name: "Nhập “Tên salon” và tải logo",
        text: "Ở phần “Thông tin salon”, nhập “Tên salon”. Nếu tiệm có logo thì tải lên. Tên salon hiện phía trên tiêu đề của poster, nên viết đúng như biển hiệu để khách nhận ra.",
        image: { src: img("nhap-ten-salon-len-poster-qr"), alt: "Phần Thông tin salon của công cụ tạo poster với ô Tên salon được khoanh vàng và ô tải logo bên dưới" },
      },
      {
        name: "Dán link ở “Mã QR & link đặt lịch”",
        text: "Dán đường link mà khách sẽ mở khi quét mã. Đó có thể là link riêng như website, Facebook hay Instagram. Nếu bạn đang đăng nhập bằng tài khoản salon trên VaraaAi, chọn “Trang đặt lịch VaraaAi của tôi” để link được điền tự động.",
        image: { src: img("dan-link-dat-lich-de-tao-ma-qr"), alt: "Phần Mã QR và link đặt lịch với lựa chọn Link riêng và ô dán đường link của trang đặt lịch được khoanh vàng" },
      },
      {
        name: "Chọn ngôn ngữ và tiêu đề lớn",
        text: "Ở phần “Nội dung poster”, chọn từ một đến ba ngôn ngữ. Sau đó chọn một tiêu đề lớn có sẵn, ví dụ “Quét để đặt lịch” hoặc “Đặt lịch tại đây”.",
        image: { src: img("chon-tieu-de-quet-de-dat-lich"), alt: "Mục Tiêu đề lớn với ba câu gợi ý, câu Quét để đặt lịch đang được chọn và khoanh vàng" },
      },
      {
        name: "Thêm dòng phụ nếu cần",
        text: "Điền những dòng phụ bạn muốn hiện trên poster: Ưu đãi, Giờ mở cửa, Số điện thoại, Wi-Fi. Ô nào để trống thì không hiện. Chỉ điền những dòng thật sự có ích ở chỗ bạn định dán.",
        image: { src: img("them-dong-phu-uu-dai-gio-mo-cua-wifi"), alt: "Các ô dòng phụ không bắt buộc gồm Ưu đãi, Giờ mở cửa, Số điện thoại và Wi-Fi được khoanh vàng" },
      },
      {
        name: "Chọn mẫu và “Màu chủ đạo”",
        text: "Ở phần “Thiết kế”, chọn một trong bốn mẫu: Tối giản, Sang trọng, Pastel, Theo mùa. Rồi chọn “Màu chủ đạo” hợp với màu sơn, màu ghế hay màu logo của tiệm.",
        image: { src: img("chon-mau-poster-va-mau-chu-dao"), alt: "Bốn mẫu poster Tối giản, Sang trọng, Pastel và Theo mùa được khoanh vàng, bên dưới là bảng Màu chủ đạo" },
      },
      {
        name: "Chọn khổ",
        text: "Chọn khổ theo nơi sẽ dùng: A4 hoặc A5 để dán cửa, A6 để đặt bàn, thẻ đứng gập đôi, sticker tròn, hoặc khổ vuông và khổ dọc để đăng Instagram.",
        image: { src: img("chon-kho-in-a4-a5-a6-sticker-instagram"), alt: "Bảng chọn khổ gồm A4 dọc, A5 dọc, A6 đặt bàn, Thẻ đứng gập đôi, Sticker tròn, Instagram và Story được khoanh vàng" },
      },
      {
        name: "Bấm “Xem trước” rồi tải về",
        text: "Bấm “Xem trước” để xem poster hoàn chỉnh. Ưng ý thì bấm “Tải PDF” để mang đi in, hoặc “Tải PNG” để đăng lên mạng xã hội. Quét thử mã trên màn hình bằng một điện thoại khác trước khi in.",
        image: { src: img("xem-truoc-poster-va-tai-pdf-png"), alt: "Bản xem trước poster nền đen có tiêu đề Quét để đặt lịch và mã QR, bên dưới là nút Tải PDF và Tải PNG" },
      },
    ],
  },
  faq: [
    {
      q: "Tạo poster mã QR đặt lịch trên VaraaAi có mất phí hay cần đăng nhập không?",
      a: "Không. Công cụ mở cho mọi người, dùng được ngay và miễn phí. Tài khoản salon chỉ giúp điền link đặt lịch tự động khi bạn chọn “Trang đặt lịch VaraaAi của tôi”.",
    },
    {
      q: "Mã QR trên poster dẫn đến đâu?",
      a: "Đến đúng đường link bạn dán ở phần “Mã QR & link đặt lịch”. Đó có thể là trang đặt lịch của tiệm, hoặc link riêng như website, Facebook hay Instagram.",
    },
    {
      q: "Nên tải poster dạng PDF hay PNG?",
      a: "Mang đi in thì bấm “Tải PDF”. Đăng lên mạng xã hội thì bấm “Tải PNG”. Bạn có thể tải cả hai từ cùng một poster.",
    },
    {
      q: "Nên dán poster QR ở đâu trong tiệm?",
      a: "Bốn vị trí hiệu quả là cửa kính, quầy thanh toán, bàn làm móng và gương trước ghế khách. Đó là những nơi khách nhìn thấy khi đi ngang, khi trả tiền và trong lúc ngồi làm.",
    },
    {
      q: "Poster QR có hiện được nhiều ngôn ngữ không?",
      a: "Có. Bạn chọn từ một đến ba ngôn ngữ, và cả ba hiện cùng lúc trên poster. Cách này hợp với tiệm có khách nói nhiều thứ tiếng.",
    },
    {
      q: "Làm sao biết có bao nhiêu người quét mã QR?",
      a: "Nếu mã QR dẫn về trang đặt lịch VaraaAi của salon, trang Tổng quan trong trang quản trị đếm số lượt quét trong 30 ngày.",
    },
    {
      q: "Cần làm gì trước khi in nhiều bản poster?",
      a: "Lấy điện thoại quét thử mã một lần để chắc chắn nó mở đúng trang đặt lịch. Nếu mở sai trang, sửa link trong công cụ rồi tải lại poster.",
    },
  ],
  related: ["chia-se-link", "bang-gia", "website-salon", "tong-quan"],
};

export default article;
