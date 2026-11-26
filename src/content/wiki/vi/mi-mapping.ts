import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mapping/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-ve-so-do-noi-mi",
  lesson: "mi-mapping",
  category: "lash",
  title: "Cách vẽ sơ đồ nối mi (lash mapping): 11 bước từ đo mi thật đến gắn mi neo",
  metaTitle: "Cách vẽ sơ đồ nối mi (lash mapping) trong 11 bước",
  metaDescription:
    "Hướng dẫn vẽ sơ đồ nối mi từng bước: đo mi thật, chia năm vùng trên miếng lót, ghi độ dài và độ cong, làm mắt kia kiểu soi gương, gắn mi neo, kiểm tra cân đối.",
  keyword: "cách vẽ sơ đồ nối mi",
  keywords: [
    "sơ đồ nối mi",
    "cách vẽ lash mapping",
    "sơ đồ nối mi mắt mèo",
    "chia vùng nối mi",
    "mi neo là gì",
    "cách đo mi thật trước khi nối",
    "bản đồ mi",
  ],
  excerpt: "Vẽ một sơ đồ nối mi rồi làm theo nó: đo mi thật, chia năm vùng trên miếng lót, ghi độ dài và độ cong, gắn mi neo, lấp đầy và so hai mắt.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-mi-lam-theo-ban-do-mi-cho-khach-trong-studio"),
    alt: "Thợ nối mi ngồi ở đầu giường trong studio sang trọng, cúi xuống làm mi cho khách đang nằm, phía sau là gương đứng viền vàng và đèn vòng cung",
  },
  takeaways: [
    "Sơ đồ nối mi được vẽ **trên miếng lót dưới mắt**: vài vạch ngắn chia hàng mi thành năm vùng, dưới mỗi vạch ghi độ dài và độ cong.",
    "Đo mi thật khi **nhìn thẳng từ trên xuống**, không nhìn nghiêng. Độ dài và sức mi thật là giới hạn của sơ đồ.",
    "Mắt bên kia làm theo kiểu soi gương và phải **đo lại mi thật**; không chép y nguyên.",
    "Gắn **mi neo** trước, vài sợi mỗi vùng, để thấy dáng kiểu mi khi còn dễ sửa.",
    "Độ dài chuyển dần giữa các vùng, không nhảy thành bậc thang. Xong thì ghi sơ đồ cho lần dặm sau.",
  ],
  intro: [
    "Cách vẽ sơ đồ nối mi gồm hai nửa: nghĩ trước trên miếng lót, rồi mới gắn theo đúng những gì đã ghi. Sơ đồ, hay lash mapping, chia hàng mi thành các vùng và định sẵn độ dài, độ cong cho từng vùng. Nhờ nó, hai mắt ra cân đối và kiểu mi đúng như đã thống nhất với khách.",
    "Bài viết này viết lại bài học “Lash mapping: thực hành vẽ bản đồ mi từng bước” trong khóa Nghề Mi của VaraaAi Academy. Ví dụ trong bài là một kiểu mắt mèo nhẹ cho khách có mắt hạnh nhân. Các độ dài chỉ là ví dụ cho một khách: sơ đồ thật luôn tùy đôi mắt và mi thật của người đang nằm trước mặt bạn.",
  ],
  sections: [
    {
      id: "so-do-noi-mi-de-lam-gi",
      title: "Sơ đồ nối mi dùng để làm gì",
      blocks: [
        { p: "Sơ đồ là tờ ghi nhớ đặt ngay cạnh hàng mi. Trong lúc gắn, bạn không phải nhớ vùng nào dùng sợi mấy milimét, và không phải đoán mắt bên kia đã làm thế nào. Mọi thứ nằm trên miếng lót." },
        { p: "Bài này tập trung vào phần nghĩ trước khi gắn. Thao tác gắn từng sợi, từ tách mi đến khoảng cách với da mí, giữ nguyên như bài thực hành [nối mi classic](lesson:mi-classic). Còn việc kiểu nào hợp dáng mắt nào và độ cong J, B, C, CC, D, L khác nhau ra sao, bạn đọc ở bài lý thuyết [Lash mapping là gì](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "vi-du-so-do-mat-meo",
      title: "Ví dụ một sơ đồ nối mi kiểu mắt mèo nhẹ",
      blocks: [
        { p: "Đây là sơ đồ dùng trong video, cho một khách có mắt hạnh nhân." },
        {
          table: {
            head: ["Vùng", "Độ dài (ví dụ)", "Độ cong (ví dụ)"],
            rows: [
              ["1, đầu mắt", "8 mm", "C"],
              ["2", "9 mm", "C"],
              ["3", "10 mm", "C"],
              ["4", "11 mm", "C"],
              ["5, đuôi mắt", "12 mm", "C"],
            ],
          },
        },
        { img: { src: img("bo-mi-kieu-mat-meo-nhe-dai-dan-ve-duoi-mat"), alt: "Cận cảnh mắt nhắm với bộ mi classic kiểu mắt mèo nhẹ đã hoàn thiện, mi ngắn ở đầu mắt và dài dần đều về đuôi mắt", caption: "Kết quả của sơ đồ ví dụ: độ dài tăng dần từ đầu mắt đến đuôi mắt, không có bậc." } },
        { note: "Các con số trên chỉ là ví dụ cho một khách. Độ dài mỗi vùng không được vượt quá sức của mi thật bạn vừa đo: vùng nào mi yếu thì vùng đó ngắn hơn, nhẹ hơn, dù sơ đồ đẹp đến đâu.", kind: "warn", title: "Đừng chép nguyên con số" },
        { p: "Hai biến thể hay gặp: với kiểu búp bê, điểm dài nhất nằm ngay ở vạch đánh dấu con ngươi. Với kiểu mắt cáo, bạn có thể ghi thêm một độ cong mạnh hơn cho vùng đuôi, ví dụ đổi từ C sang D, để đuôi mắt được nâng lên." },
      ],
    },
    {
      id: "hai-moc-va-goc-nhin",
      title: "Hai mốc cần nhớ và góc nhìn khi đo mi thật",
      blocks: [
        { p: "Lúc khách còn ngồi, mở mắt và nhìn thẳng, hãy ghi nhớ hai mốc: **vị trí con ngươi** và **điểm cao nhất của lông mày**. Khi khách đã nằm và nhắm mắt, bạn không còn thấy chúng nữa, mà lại cần chúng để đặt điểm dài nhất của kiểu mi." },
        { p: "Khi đo và khi vẽ, nhìn mắt thẳng từ trên xuống. Nhìn nghiêng làm độ dài và vị trí các vùng bị lệch, sơ đồ sai ngay từ đầu và hai mắt sẽ không đều." },
        { note: "Bút vẽ sơ đồ là loại nét mảnh, không độc, an toàn cho da. Đầu bút chỉ chạm vào miếng lót, không chạm mi và không chạm mắt. Miếng lót hôm nay cần dán thật phẳng và gọn, vì nó là tờ giấy để vẽ.", kind: "warn", title: "Bút chỉ chạm miếng lót" },
      ],
    },
    {
      id: "mi-neo-la-gi",
      title: "Mi neo là gì và vì sao gắn trước",
      blocks: [
        { p: "Mi neo là vài sợi được gắn trước ở mỗi vùng, đúng độ dài ghi trên sơ đồ. Chúng là khung của cả bộ mi. Nhìn các sợi neo, bạn thấy ngay đường cong của kiểu mi: có lên dần về đuôi không, có chỗ nào bị gãy không." },
        { p: "Đây cũng là lúc dễ sửa nhất, vì trên mắt mới có vài sợi. Có tiệm cho khách ngồi dậy xem nhanh trong gương sau khi gắn mi neo, khi keo đã khô và mắt khách không cay. Nếu tiệm bạn không làm vậy, hãy đứng ở đầu giường nhìn xuống và so hai mắt trước khi lấp đầy." },
      ],
    },
    {
      id: "ba-loi-khi-lam-theo-so-do",
      title: "Ba lỗi hay gặp khi làm theo sơ đồ nối mi",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Cách tránh"],
            rows: [
              ["Đo và vẽ khi nhìn nghiêng", "Sơ đồ lệch ngay từ đầu, hai mắt không đều", "Nhìn thẳng từ trên xuống khi đo và khi vẽ vạch"],
              ["Chép y nguyên sơ đồ sang mắt kia", "Quên rằng mi thật hai bên khác nhau", "Làm kiểu soi gương, đo lại mi thật bên đó và chỉnh độ dài nếu cần"],
              ["Nhảy độ dài quá xa giữa hai vùng", "Hàng mi thành từng bậc thang", "Cho độ dài chuyển dần ở chỗ giáp hai vùng"],
            ],
          },
        },
        { p: "Cả ba lỗi đều tránh được nếu bạn làm chậm và nhìn kỹ ở từng bước." },
      ],
    },
    {
      id: "ghi-so-do-cho-lan-dam-sau",
      title: "Ghi sơ đồ lại cho lần dặm sau",
      blocks: [
        { p: "Miếng lót bị gỡ đi cuối buổi, nên sơ đồ cần được chép lại trước khi khách về: kiểu mi, độ dài và độ cong của từng vùng. Lần [dặm mi](lesson:mi-dam-thao) sau, bạn làm lại đúng như vậy hoặc chỉnh theo ý khách." },
        { p: "Trong VaraaAi, chỗ để ghi là “Ghi chú nội bộ” trong [hồ sơ khách](lesson:khach-hang), phần chỉ salon nhìn thấy. Thợ nào trong tiệm nhận khách lần sau cũng làm lại được đúng sơ đồ. Tạo luôn [lịch hẹn](lesson:lich-hen) dặm khi khách còn ở tiệm." },
        { note: "Các độ dài trong bài (8–12 mm, độ cong C) chỉ là ví dụ cho một khách; sơ đồ thật luôn tùy đôi mắt và sức mi thật của từng khách, theo bảng của hãng mi và hướng dẫn của hãng keo. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Lưu ý" },
      ],
    },
  ],
  howTo: {
    title: "Các bước vẽ sơ đồ nối mi và làm theo sơ đồ",
    id: "cac-buoc-ve-so-do-noi-mi",
    after: "so-do-noi-mi-de-lam-gi",
    lead: "Mười một bước theo thứ tự trong video. Sáu bước đầu là vẽ sơ đồ, năm bước sau là gắn theo sơ đồ.",
    supplies: [
      "Miếng lót dưới mắt, dán thật phẳng và gọn",
      "Bút nét mảnh, không độc, an toàn cho da, hoặc miếng dán mapping in sẵn vạch",
      "Một sợi mi nối đã biết độ dài để so, hoặc thước đo mi nhỏ",
      "Vỉ mi có các độ dài của sơ đồ, thêm một dải ngắn hơn cho mi non",
      "Keo, nhíp và đồ dùng một lần như ở bài classic",
    ],
    steps: [
      {
        name: "Tư vấn và thống nhất một kiểu",
        text: "Khách ngồi, mở mắt, nhìn thẳng. Bạn nhìn dáng mắt, nhìn mi thật, hỏi khách muốn gì, cho xem ảnh mẫu vài kiểu và giải thích kiểu nào hợp, vì sao. Ghi nhớ vị trí con ngươi và điểm cao nhất của lông mày. Đừng bắt đầu khi khách còn lưỡng lự.",
        image: { src: img("tu-van-xem-anh-mau-kieu-mi-tren-may-tinh-bang"), alt: "Thợ nối mi và khách ngồi trên ghế sofa kem trong studio, cùng nhìn ảnh mẫu một kiểu mi trên máy tính bảng, khách mỉm cười chỉ vào màn hình" },
      },
      {
        name: "Chuẩn bị như bài classic",
        text: "Cho khách nằm thoải mái, làm sạch mi, dán miếng lót dưới mắt rồi chải mi. Miếng lót phải thật phẳng và gọn vì lát nữa bạn sẽ vẽ lên nó.",
      },
      {
        name: "Đo mi thật",
        text: "Nhìn mắt thẳng từ trên xuống. Ở đầu mắt, giữa mắt và đuôi mắt, cầm một sợi mi nối đã biết độ dài đặt song song cạnh sợi mi thật để so; có thợ dùng một cây thước đo mi nhỏ. Nhớ vùng nào mi dài bao nhiêu, khoẻ hay yếu: đó là giới hạn của sơ đồ.",
        image: { src: img("do-mi-that-bang-mot-soi-mi-noi-da-biet-do-dai"), alt: "Nhíp trong tay đeo găng đen giữ một sợi mi nối đặt song song cạnh sợi mi thật của khách đang nhắm mắt để so độ dài" },
      },
      {
        name: "Chia năm vùng trên miếng lót",
        text: "Dùng bút nét mảnh vẽ vài vạch ngắn lên miếng lót, chia hàng mi từ đầu mắt đến đuôi mắt thành năm vùng. Miếng dán mapping in sẵn vạch cũng dùng được. Đánh dấu thêm vị trí con ngươi đã nhớ lúc khách ngồi.",
        image: { src: img("ve-vach-chia-nam-vung-tren-mieng-lot-mat"), alt: "Bàn tay đeo găng đen cầm bút nét mảnh màu mận vẽ các vạch ngắn lên miếng lót trắng dưới mắt khách đang nhắm để chia vùng", caption: "Đầu bút chỉ chạm miếng lót, cách xa hàng mi và mắt." },
      },
      {
        name: "Ghi độ dài và độ cong cho từng vùng",
        text: "Ghi ngay dưới mỗi vạch. Với kiểu mắt mèo nhẹ trong ví dụ: 8, 9, 10, 11 và 12 mm từ đầu mắt đến đuôi mắt, cùng độ cong C. Vùng nào mi thật yếu thì ghi ngắn hơn, nhẹ hơn.",
      },
      {
        name: "Làm sơ đồ mắt bên kia kiểu soi gương",
        text: "Đầu mắt vẫn là vùng một, đuôi mắt vẫn là vùng năm. Đo lại mi thật bên đó, vì hai mắt hiếm khi giống hệt nhau, rồi chỉnh độ dài nếu cần để kết quả nhìn cân đối.",
      },
      {
        name: "Xếp vỉ mi theo sơ đồ",
        text: "Sắp các dải mi theo đúng thứ tự sơ đồ, dải ngắn nhất cho đầu mắt rồi dài dần. Để sẵn một dải ngắn hơn cho những sợi mi non ở góc trong. Tay không phải tìm và ít nhầm độ dài khi làm.",
        image: { src: img("xep-vi-mi-theo-thu-tu-ban-do"), alt: "Khay đá trắng viền vàng nhìn từ trên xuống với vỉ mi hồng nhạt có các dải mi xếp từ ngắn đến dài, đá ngọc có giọt keo, hai cây nhíp và chai keo" },
      },
      {
        name: "Gắn mi neo",
        text: "Ở mỗi vùng, gắn trước một vài sợi đúng độ dài trên sơ đồ. Kỹ thuật vẫn như bài classic: tách một sợi mi thật, chân sợi nối cách da mí và không chạm da. Nhìn các sợi neo để kiểm tra đường cong của kiểu mi.",
        image: { src: img("gan-mi-neo-o-tung-vung-theo-so-do"), alt: "Cận cảnh mắt nhắm với vài sợi mi nối đen đã gắn cách đều nhau dọc hàng mi thật, nằm trên miếng lót trắng", caption: "Mi neo: vài sợi rải theo các vùng, đủ để thấy dáng của kiểu mi." },
      },
      {
        name: "Kiểm tra dáng",
        text: "Nếu tiệm bạn cho khách ngồi dậy xem gương sau khi gắn neo, hãy làm khi keo đã khô và mắt khách không cay. Nếu không, đứng ở đầu giường nhìn xuống và so hai mắt. Sửa ngay bây giờ, khi mới có vài sợi.",
      },
      {
        name: "Lấp đầy từng vùng",
        text: "Gắn các sợi còn lại theo từng vùng. Ở chỗ giáp hai vùng, cho độ dài chuyển dần cho mềm, đừng để thành bậc thang. Gắn xen kẽ các vùng như bài classic để keo kịp khô và không dính chùm.",
      },
      {
        name: "Kiểm tra cân đối, hoàn thiện và ghi sơ đồ",
        text: "Đứng ở đầu giường, nhìn xuống cả hai mắt cùng lúc: độ dài ở đuôi mắt, điểm dài nhất và độ cong của hai bên có như nhau không. Chỗ nào hụt thì thêm vài sợi rồi chải lại mi. Gỡ miếng lót khi mắt khách vẫn nhắm, dặn dò như bài classic và ghi sơ đồ vào hồ sơ khách.",
        image: { src: img("kiem-tra-can-doi-hai-mat-tu-dau-giuong"), alt: "Khách nằm trên giường nhìn từ phía đầu giường, hai mắt nhắm còn miếng lót trắng, hai hàng mi nối đã hoàn thiện trông giống nhau" },
      },
    ],
  },
  faq: [
    {
      q: "Sơ đồ nối mi chia thành mấy vùng?",
      a: "Trong bài học này, hàng mi được chia thành năm vùng từ đầu mắt đến đuôi mắt bằng vài vạch ngắn vẽ trên miếng lót. Bạn cũng có thể dùng miếng dán mapping in sẵn vạch. Dưới mỗi vạch ghi độ dài và độ cong của vùng đó.",
    },
    {
      q: "Vẽ sơ đồ nối mi bằng bút gì?",
      a: "Dùng bút nét mảnh, loại không độc và an toàn cho da. Đầu bút chỉ chạm vào miếng lót dưới mắt, không chạm mi và không chạm mắt.",
    },
    {
      q: "Sơ đồ nối mi kiểu mắt mèo dùng độ dài bao nhiêu?",
      a: "Ví dụ trong bài là một kiểu mắt mèo nhẹ: 8, 9, 10, 11 và 12 mm từ đầu mắt đến đuôi mắt, độ cong C. Đó chỉ là ví dụ cho một khách. Độ dài mỗi vùng không được vượt quá sức mi thật của vùng đó.",
    },
    {
      q: "Mi neo là gì?",
      a: "Mi neo là vài sợi được gắn trước ở mỗi vùng, đúng độ dài trên sơ đồ, để tạo khung cho bộ mi. Nhìn các sợi neo là thấy đường cong của kiểu mi có đúng không, và đây là lúc dễ sửa nhất vì trên mắt mới có vài sợi.",
    },
    {
      q: "Có chép sơ đồ mắt trái sang mắt phải được không?",
      a: "Không nên chép y nguyên. Mắt bên kia làm theo kiểu soi gương, đầu mắt vẫn là vùng một và đuôi mắt là vùng năm, nhưng phải đo lại mi thật bên đó và chỉnh độ dài nếu cần. Mục tiêu là kết quả nhìn cân đối, không phải hai sơ đồ giống hệt.",
    },
    {
      q: "Vì sao phải nhìn thẳng từ trên xuống khi đo mi thật?",
      a: "Vì nhìn nghiêng làm độ dài và vị trí các vùng bị lệch. Sơ đồ sai ngay từ đầu thì hai mắt sẽ không đều, dù các bước sau làm cẩn thận.",
    },
  ],
  related: ["mi-mapping-hieu-dung", "mi-classic", "mi-hybrid", "mi-dam-thao"],
};

export default article;
