import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-waxing/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-wax-long-tai-spa",
  lesson: "spa-waxing",
  category: "spa",
  title: "Cách wax lông tại spa: 14 bước wax chân, nách và chân mày bằng sáp mềm, sáp cứng",
  metaTitle: "Cách wax lông tại spa: 14 bước wax chân, nách, chân mày",
  metaDescription:
    "Cách wax lông từng bước cho người làm spa: chuẩn bị, tư vấn, thử nhiệt, thoa sáp mềm ở cẳng chân, giật đúng hướng, sáp cứng ở nách và chân mày, chăm da sau wax.",
  keyword: "cách wax lông",
  keywords: [
    "các bước wax lông",
    "cách wax lông chân bằng sáp mềm",
    "cách wax nách bằng sáp cứng",
    "cách wax chân mày",
    "quy trình waxing tại spa",
    "cách dùng sáp wax lông",
  ],
  excerpt: "Wax từng bước ba vùng thường gặp: cẳng chân bằng sáp mềm, nách bằng sáp cứng, tỉa gọn chân mày. Kèm cách thử nhiệt, lấy sáp, hướng giật và năm lỗi hay gặp.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuan-bi-wax-long-chan-cho-khach-tai-spa"),
    alt: "Chuyên viên spa đeo găng đen đứng cạnh nồi sáp và hũ que gỗ, khách nữ nằm trên giường phủ khăn trắng để lộ hai chân, phía sau là cửa sổ vòm",
  },
  takeaways: [
    "Thử nhiệt sáp bằng **que mới** lên cổ tay trong của mình, rồi một điểm nhỏ trên da khách, trước khi thoa.",
    "Sáp mềm thoa thật mỏng theo chiều lông mọc, thành dải dài khoảng một bàn tay. Dày quá thì sáp vón, giật đau mà không sạch.",
    "Giật nhanh, **ngược chiều lông mọc**, sát và gần song song với da, tay kia giữ căng da. Xong ấn lòng bàn tay lên ngay.",
    "Sáp cứng ở nách và chân mày: thoa dày hơn một chút, chừa mép dày để cầm, đợi se lại (hết dính tay nhưng còn dẻo) rồi mới giật.",
    "Que đã chạm da khách không nhúng lại vào nồi. Mỗi lần lấy sáp là một que mới.",
  ],
  intro: [
    "Cách wax lông học một buổi là nhớ: thoa sáp, giật, lau sạch. Để khách ít đau và da không bầm, không trầy thì cần thêm vài thói quen, như thử nhiệt trước mỗi khách, nhìn chiều lông trước khi thoa, và luôn có một bàn tay giữ căng da.",
    "Bài viết này đi theo bài học “Waxing: thực hành từng bước” trong khóa Spa & chăm sóc da của VaraaAi Academy. Bài học wax ba vùng: cẳng chân bằng sáp mềm, nách bằng sáp cứng, và tỉa gọn chân mày. Đọc xong, bạn làm được cả ba theo mười bốn bước, từ lúc bật nồi sáp đến lúc dọn giường. Nhiệt độ, thời gian và sản phẩm luôn theo hướng dẫn của hãng sáp và quy trình của tiệm. Bài này không nói về wax vùng kín.",
  ],
  sections: [
    {
      id: "truoc-khi-wax",
      title: "Trước khi wax: bày đủ dụng cụ và đọc lại phiếu tư vấn",
      blocks: [
        { p: "Khi đã đeo găng và que sáp đang ấm trên tay, bạn không thể đi tìm nhíp hay mở tủ lấy giấy. Mọi thứ cần có mặt trên xe đẩy trước khi khách nằm xuống, kể cả thùng rác có nắp để bỏ que đã dùng." },
        { img: { src: img("dung-cu-wax-long-noi-sap-que-go-giay-wax"), alt: "Mặt xe đẩy đá cẩm thạch bày nồi sáp mềm màu vàng, nồi sáp cứng màu hồng, hũ que gỗ, xấp giấy wax, găng tay đen, chai dầu, hũ kem, bông, nhíp và kéo nhỏ", caption: "Hai nồi sáp, que gỗ sạch, giấy wax, găng, dầu lau sáp, kem dịu da, nhíp và kéo nhỏ." } },
        { p: "Phần tư vấn không được bỏ, kể cả với khách quen, vì thuốc khách đang dùng có thể đã đổi từ lần trước. Ai không nên wax, vì sao phải hỏi về thuốc trị mụn và vì sao hướng giật quan trọng: xem bài [Waxing là gì và ai không nên wax](lesson:spa-waxing-hieu-dung)." },
      ],
    },
    {
      id: "sap-mem-sap-cung-khac-nhau-khi-lam",
      title: "Sáp mềm và sáp cứng: thao tác khác nhau ở đâu",
      blocks: [
        { p: "Hướng thì giống nhau ở cả hai loại sáp: thoa theo chiều lông mọc, giật ngược chiều lông mọc, sát da. Phần khác nhau nằm trong bảng dưới." },
        {
          table: {
            head: ["Thao tác", "Sáp mềm (cẳng chân)", "Sáp cứng (nách, chân mày)"],
            rows: [
              ["Trước khi thoa", "Nhiều hãng cho rắc một lớp phấn thật mỏng", "Một số hãng cho thoa một lớp dầu thật mỏng"],
              ["Độ dày lớp sáp", "Thật mỏng và đều", "Dày hơn một chút, chừa một mép dày ở cuối"],
              ["Lấy ra bằng gì", "Miếng giấy wax, chừa một mép để cầm", "Cầm chính mép sáp"],
              ["Khi nào giật", "Sau khi miết giấy vài lần", "Khi sáp se lại: hết dính tay nhưng vẫn còn dẻo"],
            ],
          },
        },
        { p: "Lớp phấn hay lớp dầu có cùng một mục đích: để sáp bám vào lông chứ không bám vào da. Có dùng hay không là theo hướng dẫn của hãng sáp. Với sáp cứng, đừng đợi quá lâu: sáp để quá cứng thì giòn, gãy và khó lấy." },
      ],
    },
    {
      id: "vung-kho",
      title: "Những vùng khó: đầu gối, mắt cá, cẳng tay và nách",
      blocks: [
        {
          ul: [
            "**Đầu gối và mắt cá chân.** Da gập và xương nhô ra, nên dùng dải nhỏ hơn và giữ căng da kỹ hơn.",
            "**Cẳng tay.** Làm như cẳng chân, nhưng nhìn kỹ chiều lông trước, vì mỗi người mỗi khác.",
            "**Nách.** Lông mọc nhiều hướng, nên chia làm vài vùng nhỏ và làm từng vùng theo hướng lông của nó.",
            "**Chân mày.** Thống nhất dáng mày với khách trước, chỉ dùng lượng sáp thật nhỏ, cách xa mắt.",
          ],
        },
        { note: "Nhiều người thợ nhắc khách hít vào, rồi giật đúng lúc khách thở ra. Khách thấy đỡ hơn.", kind: "tip", title: "Kinh nghiệm trong nghề" },
      ],
    },
    {
      id: "loi-hay-gap",
      title: "Năm lỗi hay gặp khi wax lông",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Làm đúng"],
            rows: [
              ["Thoa sáp thật dày vì nghĩ dày thì ăn lông", "Giật đau hơn mà không sạch", "Lớp mỏng và đều"],
              ["Giật chậm, hoặc giật lên trên", "Da bị kéo theo, dễ bầm, dễ trầy", "Giật nhanh, sát và gần song song với da"],
              ["Quên giữ căng da", "Khách đau hơn, da bị kéo", "Tay kia đặt sát đầu miếng giấy, kéo căng da"],
              ["Làm đi làm lại một chỗ", "Da đỏ ửng", "Cùng một chỗ không quá hai lần; lông sót dùng nhíp"],
              ["Nhúng lại que đã dùng", "Nồi sáp nhiễm bẩn cho khách sau", "Mỗi lần lấy sáp một que mới"],
            ],
          },
        },
      ],
    },
    {
      id: "sau-wax-va-ghi-chu",
      title: "Sau khi wax: dặn khách và ghi chú cho lần hẹn sau",
      blocks: [
        { p: "Trước khi khách về, nói rõ điều gì là bình thường và điều gì cần tránh:" },
        {
          ul: [
            "Hơi đỏ, nổi vài chấm nhỏ là bình thường.",
            "Trong khoảng một ngày đầu: tránh nắng, xông hơi, tắm nước thật nóng và sản phẩm có hương thơm, kể cả lăn khử mùi.",
            "Vài ngày sau: tẩy da chết nhẹ và dưỡng ẩm, để đỡ lông mọc ngược.",
          ],
        },
        { p: "Nếu da khách đỏ rát nhiều hay nổi mẩn ngay tại tiệm, đắp khăn mát và ghi lại sản phẩm đã dùng, như trong bài [Xử lý sự cố](lesson:xu-ly-su-co)." },
        { p: "Trong VaraaAi, bạn ghi vào ghi chú nội bộ của khách trong [sổ khách hàng](lesson:khach-hang) loại sáp, vùng đã wax và da phản ứng thế nào. Lịch lần sau có thể đặt ngay trên [lịch hẹn](lesson:lich-hen) của tiệm khi khách còn ở quầy." },
        { note: "Khách đang dùng isotretinoin thì không wax. Quy định về nghề làm đẹp khác nhau theo từng nước; bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Nhắc lại hai điều" },
      ],
    },
  ],
  howTo: {
    title: "Các bước wax lông chân, nách và chân mày",
    id: "cac-buoc-wax-long",
    after: "truoc-khi-wax",
    lead: "Mười bốn bước dưới đây theo đúng thứ tự trong video bài học: cẳng chân bằng sáp mềm trước, rồi nách bằng sáp cứng, cuối cùng là chân mày.",
    supplies: [
      "Nồi sáp mềm và nồi sáp cứng, bật trước cho sáp chảy đều",
      "Que gỗ sạch để trong hũ, và que nhỏ cho chân mày",
      "Miếng giấy wax dùng một lần",
      "Găng tay, giấy lót giường mới, khăn lớn để che cho khách",
      "Dung dịch làm sạch da trước wax; phấn hoặc dầu nếu hãng sáp hướng dẫn dùng",
      "Dầu lau sáp, kem dịu da, nhíp và kéo nhỏ",
      "Thùng rác có nắp",
    ],
    steps: [
      {
        name: "Chuẩn bị nồi sáp, giường và dụng cụ",
        text: "Bật nồi sáp trước để sáp chảy đều. Lau khử khuẩn giường và trải giấy lót mới. Bày sẵn que gỗ sạch trong hũ, giấy wax, găng tay, dung dịch làm sạch da, dầu lau sáp, kem dịu da, nhíp, kéo nhỏ, và đặt một thùng rác có nắp trong tầm tay để bỏ que đã dùng.",
      },
      {
        name: "Tư vấn, kể cả với khách quen",
        text: "Xem phiếu tư vấn và hỏi lại: khách có đang dùng thuốc trị mụn, kem retinoid, mới lột da, làm laser hay đi nắng không, có dị ứng không, lần wax trước thế nào. Nhìn vùng da sẽ wax: trầy xước, cháy nắng, tĩnh mạch giãn thì tránh vùng đó. Nói trước với khách rằng sẽ hơi rát một chút, và khó chịu thì cứ nói.",
      },
      {
        name: "Che cho khách, rửa tay, đeo găng",
        text: "Khách thay đồ riêng tư, nằm lên giường và đắp khăn lớn. Chỉ mở vùng sẽ wax, chèn khăn gọn gàng. Sau đó bạn rửa tay, lau khô và đeo găng, theo cách trong bài [Rửa tay và găng tay](lesson:rua-tay-gang-tay).",
      },
      {
        name: "Nhìn chiều lông và làm sạch da",
        text: "Ở cẳng chân, lông thường mọc xuôi xuống, về phía cổ chân. Lông dài quá thì tỉa bớt. Lau sạch da bằng dung dịch trước wax và đợi da khô hẳn. Với sáp mềm, nhiều hãng cho rắc một lớp phấn thật mỏng để sáp bám vào lông, không bám vào da.",
      },
      {
        name: "Thử nhiệt sáp",
        text: "Lấy một chút sáp bằng que mới và thử lên cổ tay trong của mình: ấm, dễ chịu là được. Rồi thử một điểm nhỏ trên da khách và hỏi khách. Làm bước này với từng khách, dù nồi sáp vừa dùng xong cho khách trước.",
      },
      {
        name: "Lấy sáp bằng que mới",
        text: "Nhúng que, xoay nhẹ, rồi gạt mặt dưới que vào mép nồi, để chỉ còn một lớp mỏng ở mặt trên và sáp không nhỏ giọt. Que đã chạm da khách thì không nhúng lại vào nồi; mỗi lần lấy sáp là một que mới.",
        image: { src: img("gat-que-sap-vao-mep-noi"), alt: "Bàn tay đeo găng đen nhấc que gỗ khỏi nồi sáp vàng và gạt mặt dưới que vào mép nồi, bên cạnh là hũ que gỗ sạch", caption: "Gạt mặt dưới que vào mép nồi để sáp không nhỏ giọt." },
      },
      {
        name: "Thoa sáp mềm lên cẳng chân",
        text: "Bắt đầu từ phía trên cẳng chân. Cầm que nghiêng thấp, thoa một lớp thật mỏng theo chiều lông mọc: một dải bằng bề ngang que, dài khoảng một bàn tay. Lớp sáp mỏng và đều thì giật mới sạch. Dày quá, sáp vón lại, giật đau mà không sạch.",
        image: { src: img("thoa-sap-mem-mong-theo-chieu-long-moc"), alt: "Chuyên viên đeo găng đen dùng que gỗ thoa một dải sáp vàng mỏng dọc cẳng chân khách, tay kia đặt gần đầu gối", caption: "Que nghiêng thấp, một dải mỏng theo chiều lông mọc." },
      },
      {
        name: "Đặt và miết miếng giấy wax",
        text: "Đặt miếng giấy lên lớp sáp, chừa một mép ở cuối để cầm. Miết chắc tay dọc theo chiều lông mọc, vài lần, cho giấy ôm lấy sáp.",
        image: { src: img("dat-giay-wax-len-lop-sap-o-cang-chan"), alt: "Hai bàn tay đeo găng đen miết miếng giấy wax trắng nằm dọc trên cẳng chân khách, mép giấy phía cổ chân còn để thừa" },
      },
      {
        name: "Giữ căng da và giật",
        text: "Tay kia đặt sát đầu miếng giấy, kéo căng da. Cầm mép giấy, giật thật nhanh, ngược chiều lông mọc, sát mặt da, gần song song với chân; không giật thẳng lên. Ngay sau đó ấn lòng bàn tay lên chỗ vừa wax trong vài giây. Làm tiếp từng dải nối sát nhau cho hết cẳng chân. Cùng một chỗ không làm quá hai lần; lông sót thì dùng nhíp.",
        image: { src: img("giu-cang-da-giat-giay-wax-nguoc-chieu-long"), alt: "Một tay đeo găng ấn giữ da gần đầu gối khách, tay kia cầm mép giấy wax đang lật ngược lên từ phía cổ chân, sát mặt da", caption: "Một tay giữ căng da, tay kia giật sát mặt da, ngược chiều lông mọc." },
      },
      {
        name: "Chuẩn bị wax nách bằng sáp cứng",
        text: "Khách nằm ngửa, đưa tay lên đặt cạnh đầu, ngực vẫn được che kín. Da phải thật khô. Một số hãng cho thoa một lớp dầu thật mỏng trước để sáp cứng không bám vào da; làm theo hướng dẫn của hãng. Lông nách mọc nhiều hướng, nên chia làm vài vùng nhỏ.",
        image: { src: img("thoa-sap-cung-wax-nach"), alt: "Khách nằm ngửa đưa một tay lên cạnh đầu, ngực che kín bằng khăn trắng, chuyên viên dùng que gỗ thoa sáp cứng màu hồng lên vùng nách" },
      },
      {
        name: "Thoa sáp cứng, đợi se lại rồi giật",
        text: "Thoa sáp cứng theo chiều lông mọc của vùng đó, dày hơn sáp mềm một chút, và để một mép dày ở cuối để cầm. Đợi sáp se lại: hết dính tay nhưng vẫn còn dẻo. Giữ căng da, cầm mép, giật nhanh ngược chiều lông mọc, sát da, rồi ấn tay lên ngay. Sau đó làm vùng tiếp theo.",
        image: { src: img("giat-sap-cung-o-nach-sat-da"), alt: "Một tay đeo găng đen giữ căng da vùng nách của khách, tay kia cầm mép miếng sáp cứng màu hồng đã se và bắt đầu giật sát mặt da", caption: "Sáp cứng đã se: cầm mép dày, giữ căng da, giật sát da." },
      },
      {
        name: "Tỉa gọn chân mày",
        text: "Thống nhất dáng mày với khách trước rồi mới làm. Chỉ lấy một lượng sáp cứng thật nhỏ bằng que nhỏ, thoa ở phần lông thừa dưới mày, cách xa mắt, trong khi khách nhắm mắt. Giữ căng da, giật nhanh, ấn nhẹ. Phần còn lại tỉa bằng nhíp.",
        image: { src: img("wax-chan-may-bang-sap-cung-luong-nho"), alt: "Nhìn từ phía đầu giường, một tay đeo găng đen giữ căng da trán của khách đang nhắm mắt, tay kia cầm que nhỏ đặt một vệt sáp hồng dưới chân mày", caption: "Lượng sáp thật nhỏ, dưới mày, cách xa mắt, da được giữ căng." },
      },
      {
        name: "Lau sáp, làm dịu da và dặn khách",
        text: "Lau sáp còn dính bằng dầu lau sáp, nhẹ nhàng, không chà mạnh, rồi thoa kem dịu da. Dặn khách rằng hơi đỏ, nổi vài chấm nhỏ là bình thường, và trong khoảng một ngày đầu nên tránh nắng, xông hơi, tắm nước thật nóng và sản phẩm có hương thơm, kể cả lăn khử mùi. Vài ngày sau, khách tẩy da chết nhẹ và dưỡng ẩm để đỡ lông mọc ngược.",
      },
      {
        name: "Ghi chú và dọn dẹp",
        text: "Ghi vào ghi chú của khách loại sáp, vùng đã wax và da phản ứng thế nào. Que, giấy wax, găng tay bỏ vào thùng rác có nắp. Lau ngoài nồi sáp, khử khuẩn giường, thay giấy lót, rồi rửa tay.",
      },
    ],
  },
  faq: [
    {
      q: "Wax lông chân bằng sáp mềm làm thế nào?",
      a: "Lau sạch da và đợi khô, thử nhiệt sáp, rồi thoa một lớp thật mỏng theo chiều lông mọc thành dải dài khoảng một bàn tay. Đặt miếng giấy wax lên, miết vài lần theo chiều lông mọc. Một tay giữ căng da, tay kia giật nhanh ngược chiều lông mọc, sát và gần song song với da, rồi ấn lòng bàn tay lên ngay.",
    },
    {
      q: "Giật sáp wax theo chiều nào thì đỡ đau?",
      a: "Giật ngược chiều lông mọc, thật nhanh, sát mặt da và gần song song với da, trong khi tay kia giữ căng da. Không giật thẳng lên vì da bị kéo theo, dễ bầm và trầy. Ấn lòng bàn tay lên chỗ vừa wax vài giây giúp khách đỡ rát.",
    },
    {
      q: "Wax nách nên dùng sáp mềm hay sáp cứng?",
      a: "Bài học dùng sáp cứng cho nách. Lông nách mọc nhiều hướng nên chia làm vài vùng nhỏ; mỗi vùng thoa sáp theo chiều lông mọc, dày hơn sáp mềm một chút, chừa một mép dày để cầm. Đợi sáp se lại, hết dính tay nhưng còn dẻo, rồi giữ căng da và giật nhanh ngược chiều lông mọc.",
    },
    {
      q: "Sáp cứng đợi bao lâu thì giật được?",
      a: "Không có một con số chung, vì mỗi hãng sáp một khác. Dấu hiệu là sáp đã se lại: chạm vào hết dính tay nhưng vẫn còn dẻo. Để quá cứng thì sáp giòn, gãy và khó lấy.",
    },
    {
      q: "Một chỗ có thể wax lại mấy lần?",
      a: "Với sáp mềm, cùng một chỗ không làm quá hai lần. Nếu còn sót vài sợi lông thì dùng nhíp, không thoa sáp thêm lần nữa, vì làm đi làm lại một chỗ khiến da đỏ ửng.",
    },
    {
      q: "Vì sao không được nhúng lại que sáp đã dùng?",
      a: "Que đã chạm da khách mà nhúng lại thì mang vi khuẩn vào nồi sáp, và nồi sáp đó được dùng cho những khách sau. Vì vậy mỗi lần lấy sáp là một que mới, và sáp đã lấy ra không đổ lại vào nồi.",
    },
  ],
  related: ["spa-waxing-hieu-dung", "khi-nao-khong-lam", "rua-tay-gang-tay", "xu-ly-su-co"],
};

export default article;
