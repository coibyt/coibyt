import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dap-bot-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "dap-bot-la-gi",
  lesson: "dap-bot-hieu-dung",
  category: "nail",
  title: "Đắp bột là gì? Bột acrylic cứng thế nào, tỉ lệ liquid và những điều về an toàn",
  metaTitle: "Đắp bột là gì? Tỉ lệ liquid, primer, MMA và an toàn",
  metaDescription:
    "Đắp bột là gì, bột acrylic cứng thế nào khi không cần đèn, hạt bột quá ướt và quá khô, primer, vì sao móng bột bị hở, hơi và bụi, chất MMA, lịch dặm và tháo.",
  keyword: "đắp bột là gì",
  keywords: ["bột acrylic là gì", "móng bột là gì", "tỉ lệ liquid và bột", "móng bột bị hở", "liquid MMA là gì", "đắp bột có cần hơ đèn không", "đắp bột bao lâu thì dặm"],
  excerpt: "Đắp bột là dựng móng bằng liquid và bột acrylic, cứng ngoài không khí mà không cần đèn. Bài viết giải thích tỉ lệ, cấu trúc, primer, MMA và cách làm việc an toàn.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-dap-bot-acrylic-cho-khach-tai-salon"),
    alt: "Nữ thợ nail tóc đen búi thấp đeo găng đen đang đắp bột cho một khách tóc vàng tại bàn đá có miệng hút bụi",
  },
  takeaways: [
    "Bột acrylic gồm **liquid và bột**. Hai thứ gặp nhau là phản ứng ngay ngoài không khí, không cần đèn, và cứng lại sau vài phút.",
    "**Tỉ lệ liquid và bột** là điều quan trọng nhất: hạt đúng thì ẩm, bóng, tròn, giữ được hình và chỉ dàn ra một chút.",
    "Primer chỉ thoa thật mỏng trên mặt móng. Liquid, primer và bột chưa cứng **không được chạm vào da**.",
    "Liquid có mùi mạnh và dễ cháy: hút khí ngay tại bàn, đậy nắp, để xa lửa, không đổ liquid thừa vào bồn rửa.",
    "Thấy bột hở thì **dũa bỏ phần hở rồi mới dặm**, không đắp đè. Lịch dặm thường là mỗi 2–3 tuần.",
  ],
  intro: [
    "Đắp bột là gì? Đó là cách nối móng bằng bột acrylic, một kỹ thuật đã có từ rất lâu, rất chắc, và đến nay vẫn được nhiều khách chọn. Nhưng bột không tha cho người làm ẩu. Sai tỉ lệ, sai cấu trúc, hay để sản phẩm chạm vào da thì móng hở, móng gãy, và có khi khách bị dị ứng.",
    "Bài viết đi theo bài học “Đắp bột acrylic: hiểu đúng để làm bền và an toàn” trong khóa Nghề Nail của VaraaAi Academy. Đọc xong, bạn hiểu bột cứng lại bằng cách nào, nhìn một hạt bột là biết ướt hay khô, biết vì sao bột hở, và biết sắp xếp bàn làm sao cho hơi và bụi không ở lại trong tiệm.",
  ],
  sections: [
    {
      id: "bot-acrylic-cung-the-nao",
      title: "Bột acrylic là gì và cứng lại thế nào khi không cần đèn",
      blocks: [
        { p: "Bộ sản phẩm có hai phần: phần lỏng, trong nghề hay gọi là liquid, và phần bột. Khi cây cọ ướt liquid chạm vào bột, hai thứ trộn vào nhau và phản ứng bắt đầu ngay, ở ngoài không khí. Chỉ vài phút, hạt bột mềm cứng lại thành một khối chắc." },
        { p: "Đây là khác biệt lớn nhất so với gel. Gel chỉ cứng khi được hơ đèn. Bột thì không chờ ai. Thời gian để đặt và vuốt rất ngắn, nên tay phải chắc và làm dứt khoát. Cũng vì vậy mà người học bột cần tập trên móng tập trước khi làm cho khách." },
      ],
    },
    {
      id: "ti-le-liquid-va-bot",
      title: "Tỉ lệ liquid và bột: hạt đúng, hạt quá ướt, hạt quá khô",
      blocks: [
        { p: "Hạt bột đúng thì ẩm, bóng và tròn. Đặt xuống móng, nó giữ được hình, rồi từ từ dàn ra một chút chứ không chảy. Mỗi hãng có tỉ lệ riêng, nên bạn đọc hướng dẫn của hãng rồi tập cho tay quen." },
        { img: { src: img("hat-bot-acrylic-tron-bong-tren-dau-co"), alt: "Đầu cọ đắp bột chạm vào hũ bột hồng, trên đầu cọ là một hạt bột tròn, mịn và bóng ẩm", caption: "Hạt bột đúng: tròn, bóng ẩm, không nhỏ giọt và không khô vụn." } },
        {
          table: {
            head: ["Hạt bột", "Dấu hiệu", "Hậu quả"],
            rows: [
              ["Đúng tỉ lệ", "Ẩm, bóng, tròn; giữ hình và chỉ dàn ra một chút", "Mặt bột vuốt xong mịn, bóng ẩm, không lỗ"],
              ["Quá ướt (nhiều liquid, ít bột)", "Chảy, tràn vào khóe móng và chân móng", "Lâu cứng, cứng rồi thì yếu. Liquid dư chưa phản ứng hết có thể đọng trên da, một con đường dẫn tới dị ứng"],
              ["Quá khô (ít liquid, nhiều bột)", "Mặt bột sần, có lỗ li ti, mép đầu móng bở vụn", "Bám kém, dễ hở. Bề mặt xốp dễ bám bẩn và ố màu"],
            ],
          },
        },
        { img: { src: img("loi-hat-bot-qua-uot-chay-tran-len-da"), alt: "Cận cảnh một móng có lớp bột hồng quá ướt, sản phẩm chảy tràn lên da ở chân móng và nhỏ xuống cạnh ngón tay", caption: "Hình minh họa lỗi: hạt quá ướt chảy tràn lên da quanh móng." } },
        { img: { src: img("loi-hat-bot-qua-kho-mat-bot-san-co-lo"), alt: "Cận cảnh một móng đắp bột hồng có bề mặt sần sùi, đầy lỗ li ti và mép bở vụn", caption: "Hình minh họa lỗi: hạt quá khô cho mặt bột sần, có lỗ và mép bở." } },
        { note: "Muốn biết tay mình đã đúng chưa, hãy nhìn mặt bột vừa vuốt: mịn, bóng ẩm, không lỗ là tỉ lệ đúng.", kind: "tip", title: "Cách tự kiểm tra" },
      ],
    },
    {
      id: "cau-truc-va-primer",
      title: "Cấu trúc móng bột và vai trò của primer",
      blocks: [
        { p: "Về cấu trúc, bột giống [builder gel](lesson:builder-gel-hieu-dung): mỏng ở sát chân móng, mỏng ở đầu móng, dày nhất ở điểm apex nằm trên vùng chịu lực, chỗ móng rời khỏi nền da, hơi lùi về phía sau. Nhìn từ đầu móng, độ cong chữ C đều hai bên, hai cạnh bên thẳng và gọn. Với móng nối dài, điều này càng quan trọng, vì phần nối càng dài thì lực bẻ lên móng mỗi ngày càng lớn." },
        { img: { src: img("cau-truc-mong-bot-diem-apex-nhin-tu-canh-ben"), alt: "Một móng bột nối dài màu hồng nhìn từ cạnh bên, mỏng ở chân móng, cao nhất ở giữa rồi thanh dần ra đầu móng" } },
        { p: "Bột bám tốt hay không được quyết định ở khâu chuẩn bị: làm khô, không ngâm nước, đẩy da và lấy sạch lớp da mỏng còn dính trên mặt móng, chà nhẹ cho mất độ bóng, lau sạch bụi và dầu. Sau đó mới đến primer." },
        { img: { src: img("thoa-primer-mong-chi-tren-mat-mong"), alt: "Thợ nail đeo găng đen dùng cọ nhỏ ở nắp chai chấm một lớp primer mỏng lên mặt móng tự nhiên, cách xa da", caption: "Primer chỉ nằm trên mặt móng, cách xa da ở chân móng và hai khóe." } },
        { note: "Primer có loại có axit và loại không axit. Loại nào cũng chỉ thoa thật mỏng, lên mặt móng, tuyệt đối không chạm vào da vì có thể làm da bỏng rát. Dùng loại nào, thoa thế nào, để khô bao lâu là theo hướng dẫn của hãng bột bạn đang dùng.", kind: "warn", title: "Primer không chạm da" },
      ],
    },
    {
      id: "mong-bot-bi-ho",
      title: "Vì sao móng bột bị hở ở chân móng",
      blocks: [
        { p: "Khách quay lại sau một tuần với lớp bột hở ở chân móng. Lý do thường nằm trong sáu điều sau:" },
        {
          ul: [
            "Móng chuẩn bị chưa kỹ.",
            "Primer quá ít, hoặc quá nhiều.",
            "Bột chạm da, tràn vào khóe móng.",
            "Mép bột ở chân móng quá dày.",
            "Hạt bột quá khô.",
            "Không có apex, nên móng bị bẻ cong mỗi ngày.",
          ],
        },
        { img: { src: img("mong-bot-bi-ho-o-chan-mong"), alt: "Cận cảnh một móng bột hồng bị hở ở chân móng, mép bột vênh lên và có một vệt nhạt hình lưỡi liềm bên dưới", caption: "Bột hở ở chân móng: mép bột vênh lên, bên dưới có khoảng trống." } },
        { note: "Khi thấy hở, đừng đắp đè lên. Dưới chỗ hở có thể đọng nước và bẩn, đắp thêm bột là nhốt chúng lại. Phải dũa bỏ phần hở rồi mới dặm.", kind: "warn", title: "Không đắp đè lên chỗ hở" },
      ],
    },
    {
      id: "hoi-bui-va-liquid",
      title: "Hơi liquid, bụi dũa và cách giữ bàn làm an toàn",
      blocks: [
        { p: "Liquid có mùi rất mạnh, bay hơi nhanh và dễ cháy. [Hướng dẫn vệ sinh của thành phố Helsinki](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) ghi rõ: nơi làm móng bột, bàn làm phải có hệ thống hút tại chỗ đủ hiệu quả, và khi dũa sinh ra bụi cũng phải hút tại chỗ để bụi không bay khắp tiệm. Quy định mỗi nước, mỗi thành phố một khác, nhưng nguyên tắc thì giống nhau: hút ngay ở chỗ hơi và bụi sinh ra, và đeo khẩu trang khi dũa." },
        { img: { src: img("dua-mong-bot-tren-mieng-hut-bui-tai-ban"), alt: "Thợ nail đeo khẩu trang và găng đen dũa móng cho khách ngay phía trên miệng hút bụi tròn gắn trong mặt bàn đá", caption: "Dũa ngay trên miệng hút: bụi được kéo xuống thay vì bay lên mặt thợ và khách." } },
        { p: "Vài thói quen nhỏ với liquid đáng được giữ mỗi ngày:" },
        {
          ul: [
            "Rót thật ít, vừa đủ cho một khách, vào chén nhỏ có nắp. Đậy nắp mỗi khi không dùng.",
            "Chai lớn đậy lại ngay sau khi rót.",
            "Để xa lửa và nguồn nhiệt.",
            "Liquid thừa không đổ vào bồn rửa. Xử lý theo bảng dữ liệu an toàn của sản phẩm và quy định rác thải nơi bạn làm.",
            "Khăn giấy đã thấm liquid bỏ vào thùng rác có nắp.",
          ],
        },
        { img: { src: img("day-nap-chai-liquid-va-chen-nho-co-nap"), alt: "Bàn tay đeo găng đen vặn nắp một chai thủy tinh nhỏ, bên cạnh là chén thủy tinh có nắp và thùng rác có nắp màu vàng" } },
        { p: "Về dị ứng, chỉ cần nhớ một câu: liquid và bột chưa cứng không được chạm vào da khách, và cả da của chính người thợ. Phần còn lại có trong bài học [Dị ứng hóa chất](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "chat-mma",
      title: "Liquid MMA là gì và vì sao nên tránh",
      blocks: [
        { p: "Có loại liquid làm bằng chất MMA. Ở Mỹ, từ những năm bảy mươi, cơ quan quản lý thực phẩm và dược phẩm (FDA) đã cho rút khỏi thị trường các sản phẩm làm hoàn toàn bằng chất này, sau nhiều ca khách bị tổn thương móng và da ([thông tin của FDA](https://www.fda.gov/cosmetics/cosmetic-products/nail-care-products)). Ở Đức, viện đánh giá rủi ro BfR khuyên nhà sản xuất không dùng MMA trong hệ bột và liquid ([ý kiến 014/2012 của BfR](https://www.bfr.bund.de/cm/349/liquid-agents-for-nail-modelling-with-high-methyl-methacrylate-contents-present-a-health-risk.pdf)). Liquid dành cho thợ chuyên nghiệp thường dùng chất khác, như EMA." },
        { note: "Chỉ mua sản phẩm có nhãn rõ ràng, có bảng dữ liệu an toàn, từ nhà cung cấp đáng tin. Sản phẩm rẻ bất thường, không nhãn rõ, không có bảng dữ liệu an toàn: đừng mua.", kind: "warn", title: "Chọn liquid" },
      ],
    },
    {
      id: "dam-va-thao-bot",
      title: "Móng bột bao lâu thì dặm, và tháo bột thế nào",
      blocks: [
        { p: "Móng mọc ra, phần bột trôi dần về phía đầu móng, kéo theo cả điểm apex. Móng nặng đầu, dễ gãy, dễ hở. Thường cứ 2–3 tuần khách nên quay lại dặm. Hãy nói thật với khách: bột rất chắc, nhưng móng thật bên dưới vẫn cần được nâng niu. Đừng tự cạy, đừng dùng móng làm dụng cụ để cạy hay mở đồ." },
        { p: "Bột tan được trong acetone, nhưng lâu hơn gel khá nhiều. Cách làm: dũa mỏng bớt lớp bột trước, ủ acetone, rồi chỉ đẩy nhẹ phần đã mềm. Không bao giờ cạy, không bao giờ bẻ. Các bước giống trong bài [tháo gel đúng cách](lesson:thao-gel), chỉ cần kiên nhẫn hơn." },
        { img: { src: img("u-acetone-bang-giay-bac-de-thao-bot"), alt: "Bàn tay khách đặt trên gối kê với năm đầu ngón bọc giấy bạc, bên cạnh là một chiếc đồng hồ cát nhỏ", caption: "Ủ acetone cần thời gian. Với bột, thời gian ủ dài hơn gel." } },
        { p: "Khi đã hiểu những điều trên, bạn sang bài thực hành [cách đắp bột acrylic từng bước](lesson:dap-bot-acrylic) để tập lấy hạt bột và đắp ba hạt trên form." },
      ],
    },
    {
      id: "quan-ly-vat-tu-dap-bot",
      title: "Theo dõi liquid và bột trong kho của tiệm",
      blocks: [
        { p: "Bột và liquid là vật tư phải mua đúng nguồn và không nên để hết giữa chừng rồi mua vội hàng không rõ nhãn. Trong VaraaAi, bạn ghi các sản phẩm này vào [kho hàng](lesson:kho-hang) để biết lúc nào cần đặt thêm. Tiền sử dị ứng của từng khách nên được lưu trong hồ sơ khách hàng, để lần sau thợ nào nhận khách cũng biết trước khi mở chai liquid." },
      ],
    },
  ],
  faq: [
    {
      q: "Đắp bột acrylic có cần hơ đèn không?",
      a: "Không. Khi cọ ướt liquid chạm vào bột, phản ứng bắt đầu ngay ngoài không khí và hạt bột cứng lại sau vài phút mà không cần đèn. Vì bột không chờ, người thợ phải đặt và vuốt dứt khoát.",
    },
    {
      q: "Hạt bột thế nào là đúng tỉ lệ?",
      a: "Hạt đúng thì ẩm, bóng và tròn. Đặt xuống móng, nó giữ được hình rồi từ từ dàn ra một chút chứ không chảy. Sau khi vuốt, mặt bột mịn, bóng ẩm và không có lỗ. Mỗi hãng có tỉ lệ riêng, nên cần đọc hướng dẫn và tập trên móng tập trước.",
    },
    {
      q: "Vì sao móng bột bị hở ở chân móng?",
      a: "Thường do chuẩn bị móng chưa kỹ, primer quá ít hoặc quá nhiều, bột chạm da, mép bột ở chân móng quá dày, hạt bột quá khô, hoặc lớp bột không có apex. Khi thấy hở, không đắp đè lên mà phải dũa bỏ phần hở rồi mới dặm.",
    },
    {
      q: "Liquid MMA là gì?",
      a: "MMA là một chất từng được dùng làm liquid đắp bột. Cơ quan FDA của Mỹ đã cho rút khỏi thị trường các liquid làm hoàn toàn bằng MMA sau nhiều ca tổn thương móng và da, và viện BfR của Đức khuyên nhà sản xuất không dùng MMA trong hệ bột và liquid. Liquid chuyên nghiệp thường dùng chất khác như EMA.",
    },
    {
      q: "Đắp bột bao lâu thì phải dặm?",
      a: "Thường mỗi 2–3 tuần. Khi móng mọc, lớp bột và điểm apex trôi về phía đầu móng, làm móng nặng đầu, dễ gãy và dễ hở. Dặm đúng hẹn đưa cấu trúc về lại đúng chỗ.",
    },
    {
      q: "Tháo móng bột bằng acetone được không?",
      a: "Được, bột tan trong acetone nhưng lâu hơn gel khá nhiều. Thợ dũa mỏng bớt lớp bột, ủ acetone, rồi chỉ đẩy nhẹ phần đã mềm. Không bao giờ cạy và không bao giờ bẻ lớp bột ra khỏi móng.",
    },
  ],
  related: ["dap-bot-acrylic", "fill-mong-hieu-dung", "noi-mong-form-hieu-dung", "di-ung-hoa-chat"],
};

export default article;
