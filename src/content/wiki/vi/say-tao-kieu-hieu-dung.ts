import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/say-tao-kieu-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "say-toc-dung-cach",
  lesson: "say-tao-kieu-hieu-dung",
  category: "hair",
  title: "Sấy tóc đúng cách: vì sao tóc bóng, giữ nếp lâu và không hư tổn vì nhiệt",
  metaTitle: "Sấy tóc đúng cách: bóng mượt, giữ nếp, không hại tóc",
  metaDescription:
    "Sấy tóc đúng cách là gì: vì sao đầu máy phải chĩa xuống, sấy sơ trước khi dùng lược, lược tròn và lược dẹt, nút gió mát, sấy tóc xoăn và mức nhiệt an toàn.",
  keyword: "sấy tóc đúng cách",
  keywords: [
    "sấy tóc có hại không",
    "sấy tóc bị xù",
    "nút gió mát máy sấy để làm gì",
    "lược tròn và lược dẹt sấy tóc",
    "xịt bảo vệ nhiệt trước khi sấy",
    "sấy tóc xoăn bằng đầu khuếch tán",
    "sấy tóc không bị khô xơ",
  ],
  excerpt: "Tóc giữ nếp khi khô hẳn và nguội, bóng khi gió thổi xuôi theo sợi tóc. Hai điều đó giải thích gần hết những gì người thợ làm với cây lược và máy sấy.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-toc-say-toc-dai-bang-luoc-tron-va-may-say"),
    alt: "Thợ tóc dùng lược tròn nâng một lọn tóc ở đỉnh đầu khách và sấy bằng máy sấy đen, khách nữ tóc vàng dài mỉm cười trước gương viền vàng",
  },
  takeaways: [
    "Tóc ướt dễ uốn. Tóc chỉ giữ hình mới khi đã **khô hẳn và nguội**, nên nút gió mát là một bước tạo kiểu thật sự.",
    "Đầu máy sấy luôn **chĩa xuống, xuôi theo sợi tóc**. Gió thổi ngược làm lớp biểu bì lật lên, tóc xù và xỉn.",
    "Sấy sơ bằng tay tới khoảng bảy, tám phần khô rồi mới dùng lược: nhanh hơn và tóc chịu ít nhiệt hơn.",
    "Lược dẹt để sấy thẳng, mượt. Lược tròn để phồng, cong đuôi, uốn lọn. Tóc xoăn muốn giữ lọn thì dùng đầu khuếch tán và không chải.",
    "Không dí đầu máy vào da đầu, không giữ một chỗ quá lâu, và hỏi khách có nóng không.",
  ],
  intro: [
    "Sấy tóc đúng cách không bắt đầu ở cây lược tròn. Nó bắt đầu ở hai hiểu biết rất ngắn về sợi tóc: tóc ướt thì dễ uốn và chỉ giữ nếp khi đã khô, đã nguội; bề mặt sợi tóc có những lớp vảy xếp xuôi từ chân xuống ngọn. Ai nắm được hai điều này sẽ tự trả lời được vì sao tóc mình sấy xong hay xù, vì sao nếp xẹp sau một giờ, và sấy thế nào để không hại tóc.",
    "Bài viết đi theo bài học “Sấy tạo kiểu: hiểu đúng để tóc bóng mượt mà không hại tóc” trong khóa Nghề Tóc của VaraaAi Academy. Sấy là bước cuối của mỗi lần làm tóc, và khách thường đánh giá cả buổi làm qua mấy phút cuối ấy: một kiểu cắt đẹp mà sấy xù thì khách vẫn thấy không đẹp. Đọc xong, bạn hiểu lý do của từng thao tác. Phần làm từng bước trên một mái tóc dài nằm ở bài [Cách sấy tóc phồng và vào nếp](lesson:say-tao-kieu).",
  ],
  sections: [
    {
      id: "vi-sao-say-tao-duoc-kieu",
      title: "Vì sao sấy tạo được kiểu, và vì sao nếp lại mất",
      blocks: [
        { p: "Khi tóc ướt, nước làm lỏng những liên kết nhỏ bên trong sợi tóc. Lúc ấy tóc dễ uốn theo hình mình muốn. Khi tóc khô đi và nguội xuống, các liên kết ấy khép lại và giữ tóc ở hình mới." },
        { p: "Từ đó có hai hệ quả mà người thợ dùng mỗi ngày:" },
        {
          ul: [
            "**Tóc phải khô hẳn và phải nguội thì nếp mới giữ.** Còn ẩm ở chân tóc hay ở gáy là nếp sẽ xẹp.",
            "**Tóc ướt trở lại, hoặc gặp không khí ẩm, thì nếp mất dần.** Đây là chuyện của sợi tóc, không phải lỗi của người sấy.",
          ],
        },
      ],
    },
    {
      id: "say-toc-bi-xu",
      title: "Sấy tóc bị xù: lớp biểu bì và hướng gió",
      blocks: [
        { p: "Bề mặt sợi tóc có một lớp biểu bì, giống những viên ngói lợp xếp chồng lên nhau, hướng từ chân tóc xuống ngọn. Hướng gió quyết định các viên ngói ấy nằm thế nào." },
        {
          table: {
            head: ["Hướng gió", "Lớp biểu bì", "Tóc trông thế nào"],
            rows: [
              ["Xuôi, từ chân xuống ngọn", "Nằm phẳng", "Ánh sáng phản chiếu đều, tóc bóng"],
              ["Ngược, từ ngọn lên chân", "Bị lật lên", "Tóc xù và xỉn"],
            ],
          },
        },
        { p: "Vì vậy đầu máy sấy luôn chĩa xuống, xuôi theo sợi tóc, kể cả khi bạn đang nâng tóc lên để tạo phồng. Người tự sấy ở nhà hay cầm máy thổi từ dưới lên cho nhanh khô, và đó là lý do tóc xù dù không hề hư." },
      ],
    },
    {
      id: "truoc-khi-dung-luoc",
      title: "Trước khi dùng lược: thấm khăn, bảo vệ nhiệt và sấy sơ",
      blocks: [
        { p: "Sấy đẹp bắt đầu từ trước khi bật máy. Thấm tóc bằng khăn theo cách ép nhẹ, không chà. Gỡ rối từ ngọn lên. Sau đó dùng sản phẩm bảo vệ nhiệt: xịt hay thoa đều lên thân và ngọn tóc, lượng và cách dùng theo hướng dẫn của sản phẩm." },
        { img: { src: img("tham-khan-ep-toc-uot-truoc-khi-say"), alt: "Thợ tóc đứng sau khách, ép nhẹ mái tóc ướt của khách trong một chiếc khăn màu kem, khách ngồi thẳng trước gương", caption: "Ép khăn từ chân xuống ngọn, không chà xát." } },
        { note: "Sản phẩm bảo vệ nhiệt giúp giảm hại, nhưng không thay được cách sấy đúng. Nhiệt quá cao hoặc sấy quá lâu một chỗ thì sản phẩm nào cũng không cứu được.", kind: "warn", title: "Sản phẩm không thay được kỹ thuật" },
        { h3: "Sấy sơ bằng tay trước" },
        { p: "Đừng cầm lược tròn ngay từ đầu. Sấy sơ bằng tay tới khi tóc khô khoảng bảy, tám phần, rồi mới chia vùng và dùng lược. Sấy sơ nhanh hơn nhiều và tóc chịu nhiệt ít hơn. Dùng lược khi tóc còn ướt sũng thì vừa lâu, vừa kéo tóc nhiều." },
        { p: "Vùng tóc được chia như khi cắt, bắt đầu từ gáy và đi dần lên. Mỗi lọn không rộng hơn lược và không quá dày, để gió đi qua được hết." },
      ],
    },
    {
      id: "luoc-dau-thu-gio-gio-mat",
      title: "Lược tròn, lược dẹt, đầu thu gió và nút gió mát",
      blocks: [
        {
          table: {
            head: ["Dụng cụ", "Dùng để", "Lưu ý"],
            rows: [
              ["Lược dẹt, mặt rộng", "Sấy thẳng, sấy mượt, nhanh, ít phồng", "Máy sấy đi phía trên lược, đầu máy chĩa xuống"],
              ["Lược tròn to", "Tạo phồng, đuôi tóc cong nhẹ", "Lõi kim loại hay sứ nóng lên khi sấy, đừng để sát da đầu"],
              ["Lược tròn nhỏ", "Lọn tóc xoăn hơn", "Như trên"],
              ["Đầu thu gió", "Gom gió vào một dải hẹp, đúng chỗ lược đang làm", "Luôn gắn khi tạo kiểu"],
            ],
          },
        },
        { img: { src: img("say-toc-thang-bang-luoc-det"), alt: "Thợ tóc chải một lọn tóc vàng dài của khách thẳng xuống bằng lược dẹt mặt rộng, máy sấy đen giữ phía trên và chĩa xuống", caption: "Lược dẹt cho tóc thẳng và mượt, ít phồng." } },
        { p: "Đầu thu gió nằm song song với lược, chĩa xuống theo sợi tóc và cách lược vài phân. Máy sấy đi theo lược từ chân xuống ngọn. Lược phải kéo tóc đủ căng thì tóc mới mượt và bóng, nhưng là kéo tóc chứ không kéo đầu khách." },
        { note: "Thấy khách ngả đầu theo lược là bạn đang kéo quá mạnh. Giảm lực và lấy lọn nhỏ hơn.", kind: "tip", title: "Dấu hiệu kéo quá tay" },
        { h3: "Nút gió mát để làm gì" },
        { p: "Nhiều thợ bỏ qua nút này. Sấy xong một lọn bằng gió nóng, hãy giữ nguyên lọn tóc trên lược, bấm gió mát vài giây cho tóc nguội rồi mới rút lược ra. Tóc nguội trong hình dáng nào thì giữ hình dáng ấy lâu hơn. Rút lược khi tóc còn nóng, lọn tóc dễ duỗi ra và xẹp xuống." },
        { img: { src: img("giu-lon-toc-tren-luoc-tron-bam-gio-mat"), alt: "Cận cảnh một lọn tóc vàng quấn quanh lược tròn to ở gần ngọn, máy sấy đen có đầu thu gió hướng vào lọn tóc trên lược", caption: "Lọn tóc được giữ trên lược cho tới khi nguội." } },
      ],
    },
    {
      id: "phong-muot-cup-xoan",
      title: "Sấy phồng, sấy mượt, sấy cụp và sấy tóc xoăn",
      blocks: [
        { p: "Cùng một cây lược tròn cho ra những kết quả khác nhau, tùy bạn đặt lọn tóc ở đâu so với đầu khách." },
        {
          table: {
            head: ["Muốn", "Cầm tóc thế nào", "Sấy thế nào"],
            rows: [
              ["Phồng chân tóc", "Nâng lọn tóc lên cao, ngược hướng tóc nằm", "Sấy chân tóc trước, cho chân tóc khô trong tư thế dựng"],
              ["Mượt, ôm đầu", "Kéo lọn tóc xuống, sát đầu", "Sấy xuôi từ chân xuống ngọn"],
              ["Cụp đuôi, như tóc bob", "Lược tròn đi ở phía dưới lọn tóc", "Tới ngọn thì xoay lược vào trong"],
            ],
          },
        },
        { img: { src: img("say-cup-duoi-toc-bob-bang-luoc-tron"), alt: "Thợ tóc sấy mái tóc bob vàng ngang cằm của khách bằng lược tròn to, cuộn nhẹ đuôi tóc vào trong, máy sấy chĩa từ trên xuống", caption: "Sấy cụp: lược ở dưới lọn tóc, xoay vào trong khi tới ngọn." } },
        { h3: "Tóc xoăn tự nhiên thì khác" },
        { p: "Khách muốn giữ lọn xoăn thì đừng dùng lược và đừng chải khi tóc đang khô dần, vì lọn xoăn sẽ tan ra thành xù. Hãy dùng đầu khuếch tán, loại đầu to tròn có nhiều chấu, với gió nhỏ và nhiệt vừa. Nâng tóc lên trong lòng đầu khuếch tán, giữ yên một lúc rồi đổi chỗ. Ít chạm tay vào tóc cho tới khi khô hẳn." },
        { img: { src: img("toc-xoan-tu-nhien-giu-lon-sau-khi-say"), alt: "Khách nữ tóc xoăn lọn màu hạt dẻ đã khô, thợ tóc dùng đầu ngón tay nâng nhẹ một lọn xoăn bật nảy", caption: "Lọn xoăn còn nguyên hình khi tóc khô mà không bị chải." } },
      ],
    },
    {
      id: "say-toc-co-hai-khong",
      title: "Sấy tóc có hại không: nhiệt độ, khoảng cách và da đầu",
      blocks: [
        { p: "Nhiệt làm hại tóc khi nó quá cao so với sợi tóc, hoặc khi nó đứng yên một chỗ. Hai điều ấy đều nằm trong tay người cầm máy." },
        {
          ul: [
            "**Tóc mảnh, tóc yếu, tóc đã nhuộm hay tẩy:** dùng nhiệt vừa phải.",
            "**Tóc dày, sợi to:** nhiệt cao hơn được, nhưng vẫn phải luôn di chuyển máy.",
            "**Mọi loại tóc:** không dí đầu máy vào da đầu, không giữ một chỗ quá lâu.",
          ],
        },
        { note: "Da đầu, vành tai và gáy rất dễ bỏng. Thỉnh thoảng hỏi khách có nóng không, và dùng máy sấy theo hướng dẫn của nhà sản xuất. Cách xử lý khi lỡ làm khách bỏng có trong bài [Sơ cứu trong tiệm](lesson:xu-ly-su-co).", kind: "warn", title: "Bỏng da đầu là tai nạn có thật" },
        { p: "Những gì trong bài là kinh nghiệm nghề phổ biến để luyện tập. Mỗi nước, mỗi trường có cách làm riêng, và bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề." },
      ],
    },
    {
      id: "tu-the-ve-sinh-ghi-chu",
      title: "Tư thế của thợ, vệ sinh lược và ghi chú cho khách",
      blocks: [
        { p: "Một ngày sấy nhiều khách, vai và cổ tay của thợ chịu rất nhiều. Nâng ghế khách lên vừa tầm để khuỷu tay thấp hơn vai. Đứng thẳng lưng, hai chân hơi dang, cổ tay thẳng. Đổi tay khi có thể, và chọn máy sấy nhẹ." },
        { p: "Sau mỗi khách, gỡ hết tóc khỏi lược, rửa sạch và khử khuẩn theo hướng dẫn của sản phẩm, như trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu). Lưới lọc gió phía sau máy sấy cũng cần được lau thường xuyên: lưới bám bụi và tóc thì máy nóng lên, yếu gió và nhanh hỏng." },
        { img: { src: img("go-toc-khoi-luoc-tron-sau-moi-khach"), alt: "Hai bàn tay đeo găng đen dùng đuôi lược gỡ tóc khỏi một cây lược tròn trên bàn đá, bên cạnh là lược dẹt và bình xịt đặt trên khăn" } },
        { p: "Sấy cũng là một dịch vụ cần thời gian riêng. Trong VaraaAi, bạn [đặt thời lượng riêng](lesson:dich-vu) cho “Cắt + sấy” và “Chỉ sấy”, để [lịch hẹn](lesson:lich-hen) không bị dồn. Trong [sổ khách hàng](lesson:khach-hang), ghi vào ghi chú loại lược, sản phẩm và kiểu khách thích, phồng hay mượt, để lần sau ai sấy cũng biết." },
      ],
    },
  ],
  faq: [
    {
      q: "Sấy tóc đúng cách là sấy như thế nào?",
      a: "Thấm khăn bằng cách ép, gỡ rối, dùng sản phẩm bảo vệ nhiệt theo hướng dẫn, sấy sơ bằng tay tới khoảng bảy, tám phần khô rồi mới dùng lược. Đầu máy luôn chĩa xuống theo sợi tóc, luôn di chuyển, và mỗi lọn được làm nguội bằng gió mát trước khi rút lược.",
    },
    {
      q: "Vì sao sấy tóc xong bị xù?",
      a: "Thường do gió thổi ngược từ ngọn lên chân tóc. Lớp biểu bì trên sợi tóc xếp như ngói từ chân xuống ngọn, gió ngược làm các lớp ấy lật lên nên tóc xù và xỉn. Hãy để đầu máy chĩa xuống, xuôi theo sợi tóc. Với tóc xoăn, chải khi tóc đang khô dần cũng làm lọn tan thành xù.",
    },
    {
      q: "Nút gió mát trên máy sấy để làm gì?",
      a: "Để làm nguội lọn tóc vừa sấy khi nó còn nằm trên lược. Tóc giữ hình khi đã khô và nguội, nên bấm gió mát vài giây rồi mới rút lược thì nếp giữ lâu hơn. Rút lược khi tóc còn nóng, lọn tóc dễ duỗi ra và xẹp xuống.",
    },
    {
      q: "Sấy tóc có hại tóc không?",
      a: "Có thể, nếu nhiệt quá cao hoặc giữ máy một chỗ quá lâu. Tóc mảnh, yếu, đã nhuộm hay tẩy nên dùng nhiệt vừa phải; tóc dày chịu được nhiệt cao hơn nhưng máy vẫn phải luôn di chuyển. Sản phẩm bảo vệ nhiệt giúp giảm hại nhưng không thay được cách sấy đúng.",
    },
    {
      q: "Nên dùng lược tròn hay lược dẹt để sấy tóc?",
      a: "Lược dẹt mặt rộng dùng để sấy thẳng, mượt, nhanh và ít phồng. Lược tròn dùng để tạo phồng, làm cong đuôi tóc hay uốn lọn: lược to cho đuôi cong nhẹ, lược nhỏ cho lọn xoăn hơn. Lược tròn lõi kim loại hay sứ nóng lên khi sấy, không nên để sát da đầu.",
    },
    {
      q: "Sấy tóc xoăn tự nhiên thế nào để giữ lọn?",
      a: "Dùng đầu khuếch tán với gió nhỏ và nhiệt vừa. Nâng tóc lên trong lòng đầu khuếch tán, giữ yên một lúc rồi đổi chỗ, ít chạm tay và không chải cho tới khi tóc khô hẳn.",
    },
  ],
  related: ["say-tao-kieu", "cat-nu-tang-hieu-dung", "cat-mai-hieu-dung", "ve-sinh-dung-cu"],
};

export default article;
