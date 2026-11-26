import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-dam-thao-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "dam-mi-bao-lau-mot-lan",
  lesson: "mi-dam-thao-hieu-dung",
  category: "lash",
  title: "Dặm mi bao lâu một lần? Khi nào nên tháo mi nối và vì sao không được tự bứt",
  metaTitle: "Dặm mi bao lâu một lần? Khi nào nên tháo mi nối",
  metaDescription:
    "Dặm mi thường sau 2–3 tuần. Bài viết giải thích vì sao mi nối thưa dần, khi dặm gỡ sợi nào, vì sao không kéo hay dùng dầu để tháo, và khi nào nên tháo hết cả bộ.",
  keyword: "dặm mi bao lâu một lần",
  keywords: [
    "dặm mi là gì",
    "khi nào nên tháo mi nối",
    "tự tháo mi nối tại nhà có được không",
    "tháo mi nối bằng dầu",
    "tháo mi nối có rụng mi thật không",
    "kem tháo mi và gel tháo mi",
    "cách giữ mi nối lâu rụng",
  ],
  excerpt: "Khách thường dặm sau 2–3 tuần. Vì sao mi nối thưa dần, sợi nào cần gỡ khi dặm, vì sao không bao giờ kéo sợi nối, và lúc nào nên tháo hết cả bộ.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-mi-chuan-bi-kem-thao-mi-ben-cua-so-studio"),
    alt: "Thợ nối mi tóc búi cao, mặc áo kem, đeo găng đen ngồi bên bàn đá cẩm thạch, dùng cọ nhỏ lấy kem tháo mi màu hồng từ một hũ nhỏ",
  },
  takeaways: [
    "Khách thường cần dặm mi sau khoảng **2–3 tuần**, tuỳ tốc độ rụng mi của từng người và cách giữ mi ở nhà.",
    "Khi dặm, gỡ ba loại: **sợi đã mọc dài**, chỗ dính chùm và sợi gắn lỏng. Sợi còn đẹp, còn sát mí thì giữ lại.",
    "**Không bao giờ kéo, giật hay bứt** sợi mi nối: kéo sợi nối là kéo luôn sợi mi thật ra khỏi chân mi.",
    "Muốn gỡ thì làm mềm keo bằng chất tháo mi chuyên dụng rồi trượt sợi nối ra. Không dùng dầu gần mắt, trừ khi hãng sản phẩm hướng dẫn rõ.",
    "Chất tháo không được vào mắt. Khách thấy cay thì dừng ngay và lau sạch.",
  ],
  intro: [
    "Dặm mi bao lâu một lần là câu khách hỏi ngay khi vừa nối xong, và câu trả lời thường gặp là sau khoảng 2–3 tuần. Con số ấy đến từ vòng đời của sợi mi thật. Hiểu được nó, bạn cũng hiểu luôn khi dặm phải gỡ sợi nào, vì sao tuyệt đối không kéo sợi nối, và lúc nào thì nên tháo hết cả bộ thay vì cố dặm thêm.",
    "Bài viết này viết lại bài học “Dặm và tháo mi: hiểu đúng để mi thật không hư” trong khóa Nghề Mi của VaraaAi Academy. Gắn một bộ mi đẹp là một chuyện, giữ cho mi thật của khách khoẻ qua nhiều tháng, nhiều năm lại là chuyện khác, và phần lớn chuyện đó nằm ở cách dặm, cách tháo. Đọc xong, bạn giải thích được những điều này cho khách bằng lời của mình.",
  ],
  sections: [
    {
      id: "dam-mi-bao-lau-mot-lan",
      title: "Dặm mi bao lâu một lần và vì sao mi nối thưa dần",
      blocks: [
        { p: "Dặm mi là buổi hẹn giữa hai lần nối: người thợ gỡ những sợi nối không còn nằm đúng chỗ và gắn sợi mới vào những chỗ hàng mi đã thưa. Có ba việc diễn ra cùng lúc trên mí mắt khách kể từ ngày nối:" },
        {
          ul: [
            "Mỗi ngày vài sợi mi thật rụng theo vòng đời, và sợi nối gắn trên đó rụng theo.",
            "Những sợi mi khác dài ra, đẩy mối keo ra xa mí mắt.",
            "Mi non mới mọc lên, chưa có sợi nối nào.",
          ],
        },
        { p: "Sau khoảng **2–3 tuần**, bộ mi nhìn thưa đi, có chỗ hở, có sợi mọc dài chĩa ra. Đó là lúc khách cần dặm. Khoảng thời gian này thay đổi theo tốc độ rụng mi của từng người và cách khách giữ mi. Vòng đời của sợi mi được giải thích kỹ hơn trong bài [nối mi classic là gì](lesson:mi-classic-hieu-dung)." },
        { img: { src: img("bo-mi-noi-sau-ba-tuan-can-dam-lai"), alt: "Cận cảnh một mắt nhắm với bộ mi nối đã khoảng ba tuần, hàng mi thưa đi, vài sợi mọc dài chĩa ra và bắt chéo trên miếng lót trắng", caption: "Bộ mi sau khoảng ba tuần: thưa hơn, có chỗ hở và vài sợi mọc dài chĩa ra." } },
        { h3: "Để quá lâu thì không còn là dặm" },
        { p: "Khách để lâu quá, mi còn lại quá ít, nhiều sợi mọc dài và xoắn, việc dặm gần như là làm lại từ đầu. Mỗi tiệm tự đặt quy định để bao lâu thì vẫn tính là dặm. Cách đơn giản nhất để khách quay lại đúng lúc là hẹn lịch dặm ngay khi khách vừa làm xong." },
      ],
    },
    {
      id: "doc-bo-mi-khi-dam",
      title: "Mi nối rụng nhiều vì đâu: đọc bộ mi khi dặm",
      blocks: [
        { p: "Mỗi lần dặm là một lần đọc bộ mi như đọc một cuốn nhật ký. Chỗ mi rụng cho bạn biết khách đã sống với bộ mi thế nào trong mấy tuần qua." },
        {
          table: {
            head: ["Mi rụng ở đâu", "Nguyên nhân thường gặp"],
            rows: [
              ["Nhiều ở một bên mắt", "Khách hay ngủ nghiêng về bên đó"],
              ["Cả mảng ở đuôi mắt", "Có thể do dụi mắt hoặc dầu tẩy trang"],
              ["Đều khắp nơi", "Xem lại keo, độ ẩm phòng và bước làm sạch mi lần trước"],
            ],
          },
        },
        { p: "Hỏi khách, nhìn kỹ, rồi ghi lại. Tìm ra nguyên nhân thì lần sau mi giữ lâu hơn." },
        { img: { src: img("tho-mi-ghi-ly-do-rung-mi-vao-ho-so-khach"), alt: "Thợ nối mi ngồi ở bàn đá cẩm thạch cạnh cửa sổ, gõ ghi chú vào máy tính bảng, bên cạnh là tách trà và bình hoa trắng", caption: "Ghi lại nguyên nhân rụng mi sau mỗi lần dặm." } },
        { note: "Ghi lý do mi rụng, nếu có, vào “Ghi chú nội bộ” trong [hồ sơ khách hàng](lesson:khach-hang) của VaraaAi. Lần sau thợ nào làm cũng biết phải chú ý điều gì.", kind: "tip", title: "Sổ ghi của tiệm" },
      ],
    },
    {
      id: "dam-mi-go-soi-nao",
      title: "Khi dặm mi, gỡ sợi nào và giữ sợi nào",
      blocks: [
        {
          table: {
            head: ["Sợi nối", "Dấu hiệu", "Xử lý"],
            rows: [
              ["Đã mọc dài", "Mối keo nằm xa mí mắt; sợi xoay ngang, chĩa ra hoặc bắt chéo sang sợi bên cạnh", "Gỡ"],
              ["Dính chùm", "Hai sợi bị keo dán vào nhau", "Gỡ"],
              ["Gắn lỏng", "Sợi lỏng lẻo, không chắc", "Gỡ"],
              ["Còn đẹp", "Vẫn sát mí, đúng hướng", "Giữ lại"],
            ],
          },
        },
        { p: "Sợi đã mọc dài mà để lại thì vừa xấu vừa nặng ở ngọn sợi mi thật, làm sợi mi bị kéo và xoắn. Thao tác gỡ từng sợi bằng một chấm kem tháo nằm trong bài thực hành [dặm và tháo mi từng bước](lesson:mi-dam-thao)." },
      ],
    },
    {
      id: "khong-keo-khong-but",
      title: "Vì sao không được kéo, bứt hay tự tháo mi nối tại nhà",
      blocks: [
        { p: "Đây là điều quan trọng nhất của cả bài học. Lớp keo đã giữ chặt sợi nối trên sợi mi thật, nên kéo sợi nối là kéo luôn sợi mi thật ra khỏi chân mi trước thời hạn. Làm nhiều lần, chân mi bị tổn thương, mi mọc lại thưa hơn, yếu hơn, có khi không mọc lại nữa." },
        { img: { src: img("thoi-quen-sai-tu-but-mi-noi-o-nha"), alt: "Khách nữ tóc vàng nhíu mày trước gương, dùng ngón cái và ngón trỏ tay trần kéo hàng mi nối ở một bên mắt", caption: "Ảnh minh họa một thói quen sai: tự kéo, tự bứt mi nối ở nhà. Mi vướng thì quay lại tiệm." } },
        { p: "Khách tự bứt mi ở nhà cũng gây hại y như vậy. Hãy dặn thật rõ: mi có vướng cũng đừng tự gỡ, hãy quay lại tiệm. Tháo đúng cách chỉ mất một lúc, còn tự tháo sai có khi mất cả hàng mi thật." },
        { h3: "Tháo mi nối bằng dầu: vì sao không nên" },
        { p: "Có người dùng dầu, như dầu tẩy trang, để làm tan keo ở gần mắt. Đừng làm vậy, trừ khi hãng sản phẩm hướng dẫn rõ. Dầu làm keo yếu đi không đều và khó kiểm soát, dễ lan vào mắt, và để lại một lớp dầu khiến lần gắn sau bám kém." },
        { img: { src: img("dau-tay-trang-va-sua-rua-mat-tao-bot"), alt: "Bàn tay bấm vòi một chai dầu tẩy trang màu hổ phách trên bệ đá cẩm thạch, cạnh miếng bông đẫm dầu và một chai sữa rửa mặt tạo bọt", caption: "Dầu tẩy trang không phải là chất tháo mi. Dùng quanh mắt hằng ngày, nó còn có thể làm mi nối rụng sớm." } },
        { p: "Cách đúng chỉ có một: làm mềm keo bằng chất tháo mi chuyên dụng, rồi trượt sợi nối ra nhẹ nhàng." },
      ],
    },
    {
      id: "chat-thao-mi",
      title: "Kem tháo mi, gel tháo mi và dạng lỏng",
      blocks: [
        {
          table: {
            head: ["Dạng", "Đặc điểm khi làm gần mắt"],
            rows: [
              ["Kem và gel", "Đặc, nằm yên ở chỗ bạn bôi nên dễ kiểm soát"],
              ["Lỏng", "Dễ chảy hơn, phải rất cẩn thận"],
            ],
          },
        },
        { img: { src: img("chat-thao-mi-dang-kem-gel-va-long"), alt: "Khay đá cẩm thạch viền vàng bày một hũ kem tháo mi màu hồng, một hũ gel trong, một lọ nhỏ giọt, que bông và một cây nhíp", caption: "Chất tháo mi dạng kem, gel và lỏng, cùng que bông dùng một lần." } },
        { p: "Dạng nào cũng làm theo hướng dẫn của hãng: bôi bao nhiêu, chờ bao lâu, lau bằng gì. Bài viết không đưa ra con số thời gian chờ, vì mỗi sản phẩm một khác." },
        { note: "Chất tháo không được vào mắt, không có ngoại lệ. Mắt khách nhắm kín suốt lúc tháo. Khách thấy cay thì dừng ngay, lau sạch chất tháo và xử lý như trong bài [Xử lý sự cố](lesson:xu-ly-su-co).", kind: "warn", title: "Nguyên tắc khi dùng chất tháo" },
      ],
    },
    {
      id: "khi-nao-nen-thao-mi-noi",
      title: "Khi nào nên tháo mi nối hết cả bộ",
      blocks: [
        {
          ul: [
            "Mi giữ kém, rụng lỗ chỗ, dặm mãi vẫn không đẹp.",
            "Khách muốn cho mi nghỉ, hoặc không muốn nối nữa.",
            "Khách có phản ứng sau khi làm: mắt đỏ, sưng, ngứa. Lúc này tháo hết và khuyên khách đi khám.",
            "Sau nhiều lần dặm liên tiếp, bộ mi đã rối và không đều. Tháo ra làm lại tốt hơn cố dặm thêm.",
          ],
        },
        { p: "Dấu hiệu dị ứng với keo và cách xử lý có trong bài [Dị ứng và hoá chất](lesson:di-ung-hoa-chat)." },
        { h3: "Mi thật sau khi tháo trông thưa hơn khách nhớ" },
        { p: "Tháo xong, mi thật của khách thường trông thưa và ngắn hơn khách nhớ. Lý do không nằm ở việc tháo: khách đã quen nhìn mi nối. Hãy nói trước điều này, thật nhẹ nhàng, để khách không hoảng khi soi gương." },
        { p: "Hai việc không làm: tháo một nửa rồi để đó, và chỉ khách tự tháo ở nhà bằng dầu hay bằng tay. Khách muốn tháo thì mời khách quay lại tiệm." },
      ],
    },
    {
      id: "giu-mi-noi-o-nha",
      title: "Dặn khách cách giữ mi nối lâu rụng ở nhà",
      blocks: [
        { p: "Phần lớn mi rụng sớm là do thói quen ở nhà. Khách giữ mi tốt thì lần dặm nhẹ nhàng hơn và mi thật khoẻ hơn." },
        {
          ul: [
            "Không dụi mắt, không tự bứt sợi nối.",
            "Dùng sản phẩm không dầu ở vùng mắt.",
            "Rửa mi nhẹ nhàng và chải mi mỗi ngày bằng chổi sạch.",
            "Không dùng kẹp uốn mi, không chuốt mascara chống nước vì loại này rất khó tẩy.",
            "Ngủ nằm ngửa hoặc nằm nghiêng nhẹ, không úp mặt xuống gối.",
          ],
        },
        { img: { src: img("chai-mi-noi-moi-ngay-bang-choi-sach"), alt: "Khách nữ tóc vàng mặc áo choàng lụa kem đứng trong phòng tắm đá cẩm thạch, tự chải hàng mi nối bằng một chổi chải mi sạch", caption: "Chải mi mỗi ngày bằng chổi sạch." } },
        { img: { src: img("ngu-nam-ngua-de-giu-mi-noi"), alt: "Khách nữ ngủ nằm ngửa trên gối lụa màu sâm panh, mắt nhắm, hàng mi nối nằm gọn không bị đè, bịt mắt lụa để bên cạnh", caption: "Ngủ nằm ngửa để hàng mi không bị đè xuống gối." } },
        { p: "Trước khi khách ra về, tạo luôn [lịch hẹn](lesson:lich-hen) dặm tiếp theo trong VaraaAi. Lời dặn giữ mi có thể gửi lại cho khách qua [tin nhắn](lesson:tin-nhan-ai), để khách đọc lại khi cần." },
        { note: "Thời gian dặm trong bài là khoảng thường gặp, tuỳ từng khách. Loại chất tháo, lượng bôi và thời gian chờ luôn theo hướng dẫn của hãng. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước; đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Lưu ý" },
      ],
    },
  ],
  faq: [
    {
      q: "Dặm mi bao lâu một lần?",
      a: "Thường sau khoảng 2–3 tuần, tuỳ tốc độ rụng mi của từng người và cách khách giữ mi ở nhà. Để quá lâu thì mi còn lại quá ít, nhiều sợi mọc dài và xoắn, việc dặm gần như là làm lại từ đầu. Mỗi tiệm tự đặt quy định để bao lâu thì vẫn tính là dặm.",
    },
    {
      q: "Tự tháo mi nối tại nhà có được không?",
      a: "Không nên. Kéo hay bứt sợi nối là kéo luôn sợi mi thật ra khỏi chân mi; làm nhiều lần thì mi mọc lại thưa hơn, yếu hơn, có khi không mọc lại. Muốn tháo, hãy quay lại tiệm để thợ làm mềm keo bằng chất tháo chuyên dụng rồi trượt sợi nối ra.",
    },
    {
      q: "Tháo mi nối bằng dầu dừa, dầu tẩy trang có được không?",
      a: "Không nên dùng dầu gần mắt để làm tan keo, trừ khi hãng sản phẩm hướng dẫn rõ. Dầu làm keo yếu đi không đều, khó kiểm soát, dễ lan vào mắt và để lại lớp dầu khiến lần gắn sau bám kém.",
    },
    {
      q: "Tháo mi nối có làm rụng mi thật không?",
      a: "Tháo đúng cách thì keo được làm mềm trước và sợi nối trượt ra khỏi sợi mi thật, không ai kéo sợi nào. Mi thật sau khi tháo thường trông thưa và ngắn hơn khách nhớ, vì khách đã quen nhìn mi nối. Mi thật bị hại khi sợi nối bị kéo, giật hoặc bứt ra.",
    },
    {
      q: "Khi nào nên tháo hết mi nối thay vì dặm?",
      a: "Khi mi giữ kém và dặm mãi vẫn không đẹp, khi khách muốn cho mi nghỉ, khi bộ mi đã rối và không đều sau nhiều lần dặm liên tiếp, hoặc khi khách có phản ứng như mắt đỏ, sưng, ngứa. Trường hợp có phản ứng thì tháo hết và khuyên khách đi khám.",
    },
    {
      q: "Vì sao mi nối rụng nhiều ở một bên mắt?",
      a: "Thường là do khách hay ngủ nghiêng về bên đó. Rụng cả mảng ở đuôi mắt có thể do dụi mắt hoặc dầu tẩy trang. Rụng đều khắp nơi thì người thợ nên xem lại keo, độ ẩm phòng và bước làm sạch mi của lần làm trước.",
    },
  ],
  related: ["mi-dam-thao", "mi-classic-hieu-dung", "mi-chuan-bi-hieu-dung", "lash-lift-hieu-dung"],
};

export default article;
