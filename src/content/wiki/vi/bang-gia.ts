import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/bang-gia/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "mau-bang-gia-tiem-nail-toc-spa",
  lesson: "bang-gia",
  category: "marketing",
  title: "Mẫu bảng giá tiệm nail, tóc, spa: 9 bước tự tạo bảng giá nhiều ngôn ngữ có mã QR đặt lịch",
  metaTitle: "Mẫu bảng giá tiệm nail, tóc, spa: tự tạo miễn phí",
  metaDescription:
    "Hướng dẫn tự làm bảng giá cho tiệm nail, tóc, spa bằng công cụ miễn phí của VaraaAi: nhập dịch vụ, dịch tự động, thêm mã QR đặt lịch, tải PDF để in hoặc PNG.",
  keyword: "mẫu bảng giá tiệm nail",
  keywords: [
    "tạo bảng giá salon miễn phí",
    "cách làm bảng giá tiệm nail",
    "mẫu bảng giá spa",
    "bảng giá tiệm tóc",
    "bảng giá nhiều ngôn ngữ cho tiệm nail",
    "bảng giá có mã QR đặt lịch",
    "in bảng giá khổ A4, A5, A3",
  ],
  excerpt: "Nhập dịch vụ và giá, chọn ngôn ngữ, dán link đặt lịch, chọn mẫu và khổ giấy rồi tải PDF hoặc PNG. Miễn phí, không cần biết thiết kế.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuyen-vien-noi-mi-cho-khach-trong-spa"),
    alt: "Một chuyên viên mặc đồng phục màu kem đang dùng nhíp nối mi cho khách nằm trên giường spa, bên cạnh là đèn vòng và khay dụng cụ mạ vàng",
  },
  takeaways: [
    "Công cụ tạo bảng giá của VaraaAi **miễn phí**, không cần biết thiết kế. Đăng nhập chỉ cần khi bạn muốn lưu bảng giá để sửa tiếp.",
    "Bảng giá hiện được **1–3 ngôn ngữ song song**. Ngôn ngữ chọn đầu tiên là ngôn ngữ chính, và nút **“Dịch tự động”** dịch tên dịch vụ giúp bạn.",
    "Giá chỉ là mức khởi điểm thì đánh dấu **“Giá “từ””**, bảng giá sẽ ghi “từ …” trước con số.",
    "Dán link trang đặt lịch vào phần “Mã QR đặt lịch” để khách quét mã trên bảng giá là đặt được lịch.",
    "**“Tải PDF”** để in và đặt ở quầy, **“Tải PNG”** để đăng mạng xã hội.",
  ],
  intro: [
    "Người đi tìm mẫu bảng giá tiệm nail thường đang cần một thứ rất cụ thể: một tờ giấy đẹp, đọc được từ quầy, ghi đủ dịch vụ và giá, làm xong trong một buổi tối. Tải một mẫu có sẵn về rồi sửa bằng phần mềm thiết kế thì mất công, mà mỗi lần đổi giá lại phải nhờ người. Cách nhanh hơn là dùng một công cụ đã dựng sẵn mẫu, bạn chỉ gõ dịch vụ và giá vào.",
    "Bài viết này đi theo bài học “Tạo bảng giá đa ngôn ngữ” của VaraaAi Academy. Bạn sẽ tự làm được một bảng giá hoàn chỉnh cho tiệm nail, tiệm tóc hay spa, hiện được nhiều thứ tiếng, có mã QR đặt lịch, rồi tải về để in hoặc đăng mạng.",
  ],
  sections: [
    {
      id: "vi-sao-can-bang-gia-ro-rang",
      title: "Vì sao tiệm cần một bảng giá đẹp và rõ ràng",
      blocks: [
        { p: "Một bảng giá rõ ràng giúp khách quyết định nhanh hơn. Khách nhìn thấy dịch vụ, giá và thời gian làm ngay trên giấy thì tự chọn được, không phải ngại ngùng hỏi từng món. Nhân viên cũng đỡ phải trả lời đi trả lời lại cùng một câu trong lúc tay đang làm cho khách khác." },
        { p: "Với tiệm có khách nói nhiều thứ tiếng, bảng giá còn làm thay phần phiên dịch. Trong video bài học, bảng giá mẫu hiện cùng lúc tiếng Phần Lan, tiếng Anh và tiếng Việt. Khách bản xứ đọc tiếng của họ, thợ người Việt đọc tiếng Việt, và hai bên chỉ vào cùng một dòng." },
        { p: "Bảng giá trong bài này là một tờ để in hoặc một tấm ảnh để đăng. Nó khác với danh sách dịch vụ trên trang đặt lịch của salon, là thứ điều khiển cuốn lịch và được nhập trong trang quản trị. Phần đó có bài riêng về [menu dịch vụ salon](lesson:dich-vu)." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi tạo bảng giá salon",
      blocks: [
        { p: "Công cụ đi từ trên xuống dưới qua năm phần. Có sẵn những thứ dưới đây thì bạn điền một mạch là xong:" },
        {
          ul: [
            "**Tên salon, địa chỉ và số điện thoại**, viết đúng như trên biển hiệu.",
            "**Tệp logo**, nếu tiệm có. Ô logo trong video nhận tệp PNG, JPG hoặc SVG, tối đa 2 MB.",
            "**Danh sách dịch vụ** đã chia theo nhóm, mỗi dịch vụ có giá và số phút làm.",
            "**Các ngôn ngữ khách của tiệm đọc**, và loại tiền tiệm đang thu.",
            "**Link trang đặt lịch** của salon, nếu bạn muốn có mã QR trên bảng giá. Cách lấy link nằm trong bài [link đặt lịch online cho salon](lesson:chia-se-link).",
          ],
        },
        { note: "Phần “Mã QR đặt lịch” có lựa chọn “Không có mã QR”, nên bạn vẫn làm được bảng giá khi tiệm chưa nhận đặt lịch online. Muốn có link thì xem bài [đăng ký và kích hoạt salon](lesson:dang-ky-salon), việc này cũng không mất phí.", kind: "info", title: "Chưa có link đặt lịch" },
      ],
    },
    {
      id: "bang-gia-nhieu-ngon-ngu",
      title: "Bảng giá nhiều ngôn ngữ cho tiệm nail ở nước ngoài",
      blocks: [
        { p: "Phần “Ngôn ngữ & tiền tệ” cho bạn chọn từ một đến ba ngôn ngữ hiển thị song song trên cùng một bảng giá. Ngôn ngữ chọn đầu tiên là ngôn ngữ chính. Thứ tự này đáng để cân nhắc: hãy đặt lên đầu thứ tiếng mà phần đông khách của tiệm đọc." },
        { img: { src: img("chon-ngon-ngu-va-tien-te-bang-gia"), alt: "Phần Ngôn ngữ và tiền tệ được khoanh vàng, có nhãn Tiếng Việt là ngôn ngữ chính, ô Thêm ngôn ngữ và ô Tiền tệ đang chọn EUR", caption: "Dòng chú thích trong công cụ: chọn 1–3 ngôn ngữ hiển thị song song, ngôn ngữ đầu tiên là ngôn ngữ chính." } },
        { p: "Nếu ngại gõ tên dịch vụ bằng từng thứ tiếng, bạn bấm nút “Dịch tự động” để công cụ dịch tên dịch vụ giúp. Nên đọc lại bản dịch một lượt trước khi in, nhất là với những tên dịch vụ riêng của tiệm, vì khách sẽ đọc đúng những chữ đó." },
        { p: "Loại tiền chọn ngay bên dưới, ở ô “Tiền tệ”. Trong video, bảng giá mẫu dùng EUR. Hãy chọn loại tiền tiệm thu của khách để con số trên bảng giá khớp với số tiền ở quầy." },
      ],
    },
    {
      id: "cach-ghi-gia",
      title: "Cách ghi giá trên bảng giá: giá cố định, giá “từ” và mô tả",
      blocks: [
        { p: "Mỗi dòng dịch vụ có ba ô chính là “Tên dịch vụ”, “Giá” và “Phút”, cùng hai tùy chọn nhỏ bên dưới. Dùng đúng tùy chọn thì khách không bị bất ngờ lúc trả tiền." },
        {
          table: {
            head: ["Tùy chọn", "Dùng khi nào", "Khách thấy gì"],
            rows: [
              ["Chỉ điền “Giá”", "Dịch vụ có một mức giá cố định", "Con số bạn nhập, kèm loại tiền"],
              ["Đánh dấu “Giá “từ””", "Giá chỉ là mức khởi điểm, tùy độ dài tóc hay độ khó của mẫu", "Chữ “từ …” trước con số"],
              ["“Thêm mô tả”", "Cần giải thích ngắn dịch vụ gồm những gì", "Một dòng mô tả dưới tên dịch vụ"],
            ],
          },
        },
        { p: "Ô “Phút” cho khách biết họ cần dành ra bao nhiêu thời gian. Trong video bài học, ba dịch vụ mẫu của nhóm “Nail & móng” là Gel manicure 60 phút, Gel pedicure 75 phút và Nail art 30 phút. Đây chỉ là ví dụ minh họa, bạn nhập số phút thật của tiệm mình." },
        { note: "Dịch vụ nào hay bị khách hỏi lại giá thì nên có mô tả. Ví dụ một dòng ghi rõ giá đã gồm tháo lớp cũ hay chưa sẽ bớt được một cuộc trao đổi khó xử ở quầy.", kind: "tip", title: "Mô tả ngắn, đúng chỗ" },
      ],
    },
    {
      id: "chon-mau-va-kho-giay",
      title: "Chọn mẫu bảng giá spa, nail, tóc và khổ giấy theo nơi dùng",
      blocks: [
        { p: "Phần “Thiết kế” có ba mẫu: Tối giản, Sang trọng và Màu sắc. Bên dưới là bảng “Màu chủ đạo” để bạn chọn màu hợp với tiệm, rồi đến khổ giấy. Bốn khổ hiện trong video và gợi ý chỗ dùng cho từng khổ:" },
        {
          table: {
            head: ["Khổ", "Gợi ý chỗ dùng"],
            rows: [
              ["A4 dọc", "In và đặt ở quầy, hoặc kẹp trong bìa menu"],
              ["A5 dọc", "Đặt trên bàn làm, nơi khách ngồi gần"],
              ["Poster A3", "Treo tường hoặc dán cửa kính, đọc được từ xa"],
              ["Instagram 1080×1080", "Ảnh vuông để đăng mạng xã hội"],
            ],
          },
        },
        { img: { src: img("chon-kho-giay-a4-a5-a3-instagram"), alt: "Bảng Màu chủ đạo với các ô màu tròn, bên dưới là bốn khổ A4 dọc, A5 dọc, Poster A3 và Instagram 1080×1080 được khoanh vàng" } },
        { p: "Cột gợi ý ở trên là kinh nghiệm bày biện thông thường, không phải quy định của công cụ. Bạn có thể tải cùng một bảng giá ở nhiều khổ: một bản A4 cho quầy và một bản vuông cho trang mạng xã hội của tiệm." },
        { p: "Ngay dưới phần khổ giấy có ô “Hiện dòng “Tạo miễn phí tại VaraaAi.com””. Theo chú thích trên màn hình, salon đã đăng ký trên VaraaAi thì tắt được dòng này." },
      ],
    },
    {
      id: "sau-khi-tai-ve",
      title: "Sau khi tải bảng giá về: in, đăng và sửa khi đổi giá",
      blocks: [
        { p: "Trước khi in nhiều bản, hãy đọc lại từng dòng giá và quét thử mã QR bằng điện thoại. Một con số gõ nhầm trên tờ giấy đã dán ở quầy sẽ thành chuyện phải giải thích với từng khách." },
        { p: "Giá của tiệm rồi sẽ đổi. Để lần sau không phải gõ lại từ đầu, hãy đăng nhập rồi bấm “Lưu vào tài khoản”. Bảng giá được giữ lại và bạn mở ra sửa tiếp khi cần." },
        { img: { src: img("luu-bang-gia-vao-tai-khoan"), alt: "Dòng Đăng nhập để lưu bảng giá và sửa lại sau với nút Lưu vào tài khoản được khoanh vàng, bên dưới là hai nút Chỉnh sửa và Xem trước", caption: "Nút “Lưu vào tài khoản” nằm phía trên hai nút “Chỉnh sửa” và “Xem trước”." } },
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Giá thay đổi theo từng khách", "Đánh dấu “Giá “từ”” để bảng giá ghi “từ …”"],
              ["Không muốn gõ tên dịch vụ bằng nhiều thứ tiếng", "Bấm “Dịch tự động” ở phần “Ngôn ngữ & tiền tệ”, rồi đọc lại bản dịch"],
              ["Tiệm chưa có trang đặt lịch", "Chọn “Không có mã QR”, hoặc tạo trang đặt lịch rồi quay lại dán link"],
              ["Muốn sửa bảng giá vào lần sau", "Đăng nhập và bấm “Lưu vào tài khoản”"],
            ],
          },
        },
        { p: "Cần thêm một tấm biển chỉ để mời khách quét mã thì xem bài [mã QR đặt lịch cho salon](lesson:poster-qr). Cả hai công cụ đều có mẫu Tối giản, mẫu Sang trọng và bảng “Màu chủ đạo”. Chọn cùng mẫu và cùng màu thì bảng giá và poster đặt cạnh nhau trông đồng bộ." },
      ],
    },
  ],
  howTo: {
    title: "Các bước tạo bảng giá salon miễn phí trên VaraaAi",
    id: "cac-buoc-tao-bang-gia",
    after: "chuan-bi",
    lead: "Chín bước dưới đây theo đúng thứ tự các phần trong công cụ, từ trên xuống dưới như trong video bài học.",
    steps: [
      {
        name: "Mở công cụ tạo bảng giá",
        text: "Mở varaaai.com, kéo xuống cuối trang và bấm “Tạo bảng giá miễn phí” trong nhóm “Doanh nghiệp”, hoặc vào thẳng [công cụ tạo bảng giá](/tools/price-list). Bạn bắt đầu nhập được ngay.",
        image: { src: img("bam-tao-bang-gia-mien-phi-cuoi-trang-chu"), alt: "Phần cuối trang chủ VaraaAi trên điện thoại với dòng Tạo bảng giá miễn phí được khoanh vàng trong nhóm Doanh nghiệp" },
      },
      {
        name: "Nhập “Thông tin salon”",
        text: "Ở phần “Thông tin salon”, nhập tên salon, địa chỉ và số điện thoại. Tiệm có logo thì tải lên ở ô “Logo” ngay bên dưới. Tên salon hiện ở đầu bảng giá, nên hãy viết đúng như biển hiệu.",
        image: { src: img("nhap-thong-tin-salon-len-bang-gia"), alt: "Phần Thông tin salon với ô Tên salon ghi Lumi Nails & Beauty, hai ô Địa chỉ và Số điện thoại được khoanh vàng, bên dưới là ô Logo" },
      },
      {
        name: "Chọn ngôn ngữ và tiền tệ",
        text: "Ở phần “Ngôn ngữ & tiền tệ”, chọn các ngôn ngữ muốn hiện trên bảng giá, ví dụ tiếng Phần Lan, tiếng Anh và tiếng Việt, rồi chọn loại tiền. Nếu ngại gõ từng thứ tiếng, bấm “Dịch tự động” để công cụ dịch tên dịch vụ.",
      },
      {
        name: "Chọn danh mục và bấm “Thêm dịch vụ”",
        text: "Ở phần “Dịch vụ & giá”, bấm một danh mục có sẵn như “Nail & móng”, “Cắt tóc” hay “Spa & massage”. Sau đó bấm “Thêm dịch vụ” cho từng dòng. Chia theo danh mục giúp khách tìm đúng nhóm mình cần mà không phải đọc cả tờ.",
        image: { src: img("chon-danh-muc-dich-vu-nail-toc-spa"), alt: "Mục Thêm danh mục được khoanh vàng với các nút Nail & móng, Cắt tóc & tạo kiểu, Cắt tóc nam, Mi & chân mày, Spa & massage và Danh mục khác" },
      },
      {
        name: "Điền “Tên dịch vụ”, “Giá” và “Phút”",
        text: "Với mỗi dịch vụ, gõ “Tên dịch vụ”, nhập “Giá” và số “Phút”. Dùng tên mà khách vẫn gọi. Số phút nên là thời gian làm thật, để khách tự ước lượng được buổi hẹn.",
        image: { src: img("dien-ten-dich-vu-gia-va-so-phut"), alt: "Danh mục Nail & móng với dòng Gel manicure được khoanh vàng, ô giá ghi 45 và ô phút ghi 60, bên dưới là Gel pedicure và Nail art" },
      },
      {
        name: "Đánh dấu “Giá “từ”” và thêm mô tả nếu cần",
        text: "Nếu giá chỉ là mức khởi điểm, đánh dấu ô “Giá “từ”” dưới dịch vụ đó. Muốn giải thích thêm thì bấm “Thêm mô tả” và viết một dòng ngắn. Hai tùy chọn này đặt riêng cho từng dịch vụ.",
        image: { src: img("o-gia-tu-va-them-mo-ta-dich-vu"), alt: "Ô đánh dấu Giá từ dưới dịch vụ Gel manicure được khoanh vàng, bên cạnh là nút Thêm mô tả, phía dưới là Gel pedicure và Nail art" },
      },
      {
        name: "Dán link ở “Mã QR đặt lịch”",
        text: "Ở phần “Mã QR đặt lịch”, dán link trang đặt lịch của salon vào ô link. Mã QR trên bảng giá sẽ dẫn khách thẳng tới trang đó, quét mã là đặt được lịch. Tiệm chưa dùng đặt lịch online thì chọn “Không có mã QR”.",
        image: { src: img("dan-link-dat-lich-tao-ma-qr-bang-gia"), alt: "Phần Mã QR đặt lịch với lựa chọn Link riêng và Không có mã QR, ô dán đường link trang đặt lịch của salon được khoanh vàng" },
      },
      {
        name: "Chọn mẫu, “Màu chủ đạo” và khổ giấy",
        text: "Ở phần “Thiết kế”, chọn một trong ba mẫu Tối giản, Sang trọng hoặc Màu sắc. Sau đó chọn “Màu chủ đạo” và khổ giấy. Mẫu và màu nên đi cùng nội thất và logo của tiệm, để tờ bảng giá trông như một phần của quầy.",
        image: { src: img("chon-mau-bang-gia-toi-gian-sang-trong-mau-sac"), alt: "Phần Thiết kế với ba mẫu Tối giản, Sang trọng và Màu sắc được khoanh vàng, mẫu Sang trọng đang được chọn, bên dưới là Màu chủ đạo" },
      },
      {
        name: "Bấm “Xem trước” rồi tải về",
        text: "Bấm “Xem trước” để xem bảng giá hoàn chỉnh, có tên salon, từng nhóm dịch vụ, giá, số phút và mã QR ở cuối. Ưng ý thì bấm “Tải PDF” để in và đặt ở quầy, hoặc “Tải PNG” để đăng lên mạng xã hội.",
        image: { src: img("xem-truoc-bang-gia-tiem-nail-co-ma-qr"), alt: "Bản xem trước bảng giá khổ A4 dọc nền đen của Lumi Nails & Beauty với ba dịch vụ nail kèm giá, cuối trang có mã QR Quét để đặt lịch" },
      },
    ],
  },
  faq: [
    {
      q: "Tạo bảng giá cho tiệm nail trên VaraaAi có mất phí không?",
      a: "Không. Công cụ tạo bảng giá hoàn toàn miễn phí và bạn không cần biết thiết kế. Nếu đăng nhập, bạn còn lưu được bảng giá vào tài khoản để lần sau sửa tiếp.",
    },
    {
      q: "Bảng giá hiện được mấy ngôn ngữ cùng lúc?",
      a: "Bạn chọn từ một đến ba ngôn ngữ hiển thị song song trên cùng một bảng giá, ví dụ tiếng Phần Lan, tiếng Anh và tiếng Việt. Ngôn ngữ chọn đầu tiên là ngôn ngữ chính.",
    },
    {
      q: "Nút “Dịch tự động” trên công cụ tạo bảng giá làm gì?",
      a: "Nút này nằm trong phần “Ngôn ngữ & tiền tệ” và dịch tên dịch vụ sang các ngôn ngữ bạn đã chọn. Bạn không phải gõ tên từng dịch vụ bằng từng thứ tiếng.",
    },
    {
      q: "Khi nào nên đánh dấu ô “Giá “từ””?",
      a: "Khi giá chỉ là mức khởi điểm và có thể cao hơn tùy từng khách. Bảng giá sẽ ghi chữ “từ …” trước con số, để khách hiểu đó chưa phải giá cuối cùng.",
    },
    {
      q: "Thêm mã QR đặt lịch vào bảng giá để làm gì?",
      a: "Mã QR dẫn khách thẳng tới trang đặt lịch của salon. Khách đang xem bảng giá chỉ cần quét mã bằng điện thoại là đặt được lịch, không phải gọi điện hay tìm tiệm trên mạng.",
    },
    {
      q: "Nên tải bảng giá dạng PDF hay PNG?",
      a: "Bấm “Tải PDF” khi bạn muốn in bảng giá và đặt ở quầy. Bấm “Tải PNG” khi bạn muốn đăng bảng giá lên mạng xã hội.",
    },
  ],
  related: ["poster-qr", "chia-se-link", "website-salon", "dich-vu"],
};

export default article;
