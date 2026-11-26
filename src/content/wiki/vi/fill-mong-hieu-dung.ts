import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fill-mong-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "dam-mong-la-gi",
  lesson: "fill-mong-hieu-dung",
  category: "nail",
  title: "Dặm móng là gì? Fill móng gel và bột: bao lâu một lần, khi nào phải tháo hết",
  metaTitle: "Dặm móng là gì? Bao lâu dặm một lần, khi nào tháo hết",
  metaDescription:
    "Dặm móng (fill móng) là gì, vì sao móng để quá hạn dễ gãy, gel và bột bao lâu dặm một lần, khi nào dặm, khi nào tháo hết và vì sao không đắp đè lên chỗ hở.",
  keyword: "dặm móng là gì",
  keywords: ["fill móng là gì", "bao lâu dặm móng một lần", "dặm móng hay tháo hết", "móng bị hở có dặm được không", "dặm bột bao lâu một lần", "dặm builder gel", "móng gel để lâu bị gãy"],
  excerpt: "Dặm móng là cân lại bộ móng gel hay bột sau vài tuần mọc. Bài viết giải thích vì sao phải dặm đúng hẹn, khi nào dặm được và khi nào phải tháo hết làm lại.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-tu-van-lich-dam-mong-cho-khach"),
    alt: "Nữ thợ nail đeo găng đen cầm tay khách và giải thích tại bàn đá trong salon sang trọng, khách tóc nâu mỉm cười lắng nghe",
  },
  takeaways: [
    "Móng mọc kéo cả lớp sản phẩm theo: chân móng lộ ra một khoảng trống, còn **điểm apex trôi về phía đầu móng**.",
    "Lịch dặm thường gặp: **builder gel khoảng 3–4 tuần, bột khoảng 2–3 tuần**. Móng mọc nhanh hay khách làm việc nặng tay thì hẹn sớm hơn.",
    "Dặm khi lớp cũ còn bám chắc. Hở thành mảng lớn hay có túi khí thì tháo hết. Đổi màu, đau, sưng đỏ thì không làm và khuyên khách đi khám.",
    "**Không bao giờ đắp đè lên chỗ hở.** Dũa bỏ phần hở tới khi mép còn lại bám chắc và liền với móng.",
    "Dặm là cân lại bộ móng: dũa mỏng lớp cũ, đắp phần móng mới mọc, dựng lại apex trên vùng chịu lực.",
  ],
  intro: [
    "Dặm móng là gì, và vì sao tiệm nào cũng nhắc khách quay lại sau vài tuần? Khách làm builder gel hay đắp bột thì một thời gian sau móng thật mọc dài ra, và bộ móng cần được dặm, trong nghề còn gọi là fill. Dặm đúng, bộ móng giữ được rất lâu, lúc nào cũng cân và chắc. Dặm sai, hay để quá lâu mới dặm, thì móng gãy, móng hở, và khách lại nghĩ là tại sản phẩm.",
    "Bài viết đi theo bài học “Dặm móng: hiểu đúng để móng luôn cân và chắc” trong khóa Nghề Nail của VaraaAi Academy. Đọc xong, bạn giải thích được cho khách vì sao phải dặm đúng hẹn, biết lúc nào dặm và lúc nào phải tháo hết, và hiểu vì sao không được đắp đè lên chỗ hở.",
  ],
  sections: [
    {
      id: "khi-mong-moc",
      title: "Chuyện gì xảy ra với bộ móng khi móng mọc",
      blocks: [
        { p: "Móng thật mọc ra mỗi ngày một chút và đẩy cả lớp gel, lớp bột đi theo. Ở chân móng xuất hiện một khoảng móng thật mới mọc, chưa có gì phủ lên. Khoảng ấy rộng dần theo từng tuần, và chỗ lớp cũ dừng lại thành một cái bậc nhỏ." },
        { img: { src: img("mong-moc-ra-lo-khoang-mong-that-o-chan-mong"), alt: "Cận cảnh từ trên xuống một móng bột đã mọc ra, sát chân móng lộ một dải móng thật nhạt màu rồi tới bậc của lớp cũ", caption: "Sau vài tuần: một dải móng thật mới ở chân móng và cái bậc nơi lớp cũ dừng lại." } },
        { p: "Khoảng trống ấy ai cũng thấy. Điều quan trọng hơn thì khó thấy: điểm apex. Hôm làm, apex nằm ngay trên vùng chịu lực, hơi lùi về phía sau. Móng mọc ra thì apex cũng trôi dần về phía đầu móng. Phần dày nhất bây giờ nằm ở phía trước, móng dài ra và nặng đầu." },
        { img: { src: img("diem-apex-dung-cho-ngay-moi-lam"), alt: "Một móng phủ gel hồng trong nhìn từ cạnh bên, điểm cao nhất của lớp gel nằm ở khoảng giữa móng", caption: "Ngày mới làm: điểm cao nhất nằm trên vùng chịu lực." } },
        { img: { src: img("apex-troi-ra-dau-mong-sau-vai-tuan"), alt: "Một móng gel đã mọc dài nhìn từ cạnh bên, phần gel dày nhất dồn về phía đầu móng, sát chân móng lộ móng thật", caption: "Vài tuần sau: phần dày nhất đã trôi ra phía trước, móng dài và nặng đầu." } },
        { p: "Hãy hình dung một cái đòn bẩy. Đầu móng càng dài, càng nặng thì mỗi lần khách gõ phím, mở nắp hộp hay va tay vào đâu đó, lực bẻ dồn vào vùng chịu lực càng lớn. Mà vùng ấy lúc này không còn được apex đỡ nữa. Kết quả là móng gãy ngang ngay ở đó, hoặc lớp sản phẩm bật lên ở chân móng và hở dần." },
      ],
    },
    {
      id: "bao-lau-dam-mot-lan",
      title: "Bao lâu dặm móng một lần",
      blocks: [
        { p: "Đừng đợi móng gãy hay hở rồi mới dặm. Hai con số dưới đây là khoảng thường gặp." },
        {
          table: {
            head: ["Loại móng", "Lịch dặm thường gặp"],
            rows: [
              ["Builder gel", "Khoảng 3–4 tuần"],
              ["Bột acrylic", "Khoảng 2–3 tuần"],
            ],
          },
        },
        { p: "Con số thật của từng khách còn tùy móng mọc nhanh hay chậm, tùy khách làm việc gì bằng tay, và tùy hãng sản phẩm. Móng mọc nhanh, hoặc khách làm việc nặng tay, thì hẹn sớm hơn." },
      ],
    },
    {
      id: "dam-hay-thao-het",
      title: "Dặm hay tháo hết làm lại",
      blocks: [
        { p: "Đến hẹn, câu hỏi đầu tiên luôn là câu này. Câu trả lời nằm ở tình trạng của lớp cũ." },
        {
          table: {
            head: ["Bạn thấy gì", "Nên làm gì"],
            rows: [
              ["Lớp cũ còn bám chắc, chỉ hở một chút ở mép, dũa đi là hết", "Dặm"],
              ["Lớp cũ hở thành mảng lớn, có túi khí bên dưới", "Tháo hết rồi làm lại"],
              ["Vết xanh hay đổi màu dưới chỗ hở, móng đau, sưng đỏ, móng thật tách khỏi nền", "Không dặm, không đắp lại, khuyên khách đi khám"],
            ],
          },
        },
        { img: { src: img("ho-nho-o-mep-chan-mong-con-dam-duoc"), alt: "Cận cảnh một móng bột hồng với mép sản phẩm hơi vênh ở sát chân móng, phần còn lại vẫn bám chắc vào móng", caption: "Hở nhỏ ở mép: dũa bỏ phần hở rồi dặm được." } },
        { img: { src: img("vet-xanh-duoi-cho-ho-khong-dam"), alt: "Cận cảnh một móng bột bị hở gần chân móng, dưới chỗ hở có một vệt màu xanh ô liu nhỏ trên móng thật", caption: "Vết xanh dưới chỗ hở có thể là dấu hiệu nhiễm trùng: không dặm, không phủ màu che đi, khuyên khách đi khám." } },
        { p: "Những dấu hiệu phải từ chối được nói kỹ trong bài học [Khi nào không nên làm](lesson:khi-nao-khong-lam). Cách tháo lớp cũ mà không làm hỏng móng thật có trong bài [tháo gel đúng cách](lesson:thao-gel)." },
      ],
    },
    {
      id: "khong-dap-de-len-cho-ho",
      title: "Vì sao không bao giờ dặm đè lên chỗ hở",
      blocks: [
        { p: "Tình huống quen thuộc: thấy hở một chút, làm vội, đắp đè gel hay bột lên cho kín. Nhìn thì đẹp. Nhưng dưới chỗ hở ấy, nước, dầu và bụi bẩn đã lọt vào. Đắp đè lên là nhốt chúng lại bên trong, vừa ấm vừa ẩm. Đó là chỗ cho vi khuẩn và nấm phát triển, và móng thật bên dưới chịu thiệt. Lớp mới cũng sẽ bong rất nhanh." },
        { note: "Chỗ nào hở thì dũa bỏ cho hết, tới khi mép còn lại bám chắc, mỏng và liền với móng. Không cạy phần hở ra, vì cạy kéo theo cả lớp móng thật.", kind: "warn", title: "Nguyên tắc với chỗ hở" },
      ],
    },
    {
      id: "cung-he-san-pham",
      title: "Gel dặm lên gel, bột dặm lên bột",
      blocks: [
        { p: "Dặm thì dùng cùng loại sản phẩm với lớp cũ. Muốn dùng hai loại khác nhau, hay hai hãng khác nhau, thì phải xem hãng có nói là dùng chung được không. Nhiều hãng làm cả một hệ thống, trong đó lớp bám, gel và lớp top đi với nhau. Trộn bừa thì có khi không bám, có khi chín không đều." },
        { p: "Nếu bạn cần ôn lại đặc điểm của từng hệ, xem bài [builder gel là gì](lesson:builder-gel-hieu-dung) và bài [đắp bột là gì](lesson:dap-bot-hieu-dung)." },
      ],
    },
    {
      id: "can-lai-bo-mong",
      title: "Dặm là cân lại bộ móng",
      blocks: [
        { p: "Lấp khoảng trống ở chân móng mới là phần dễ. Việc quan trọng nhất của một buổi dặm là đưa cấu trúc về lại đúng chỗ:" },
        {
          ol: [
            "Dũa mỏng lớp cũ, nhất là phần dày đã trôi ra phía trước.",
            "Móng đã quá dài thì cắt ngắn lại, giữ đúng form khách đã chọn.",
            "Đắp phần móng mới mọc.",
            "Dựng lại apex trên vùng chịu lực, hơi lùi về phía sau.",
          ],
        },
        { img: { src: img("lop-cu-da-dua-mong-truoc-khi-dam"), alt: "Cận cảnh từ trên xuống một móng gel đã được dũa mỏng, bề mặt mờ đều, găng tay đen của thợ dính bụi dũa", caption: "Lớp cũ được dũa mỏng và mờ đều trước khi đắp lớp mới." } },
        { p: "Dặm xong, nhìn từ cạnh bên, móng phải giống như ngày đầu. Lỗi hay gặp là dặm nhiều lần mà không dũa mỏng lớp cũ, mỗi lần lại đắp thêm một lớp. Bộ móng dày dần, cứng đơ, nhìn nặng nề và mất hẳn dáng tự nhiên. Còn khi lớp cũ đã hở nhiều chỗ hay đổi màu thì tháo hết, làm lại từ đầu. Đó mới là cách tốt cho móng khách." },
        { note: "Nhìn bộ móng từ cạnh bên trước khi dặm và tìm điểm cao nhất. Nó đã trôi tới đâu thì đó là chỗ phải dũa mỏng, và apex mới phải lùi về phía sau chỗ đó.", kind: "tip", title: "Đọc bộ móng trước khi dũa" },
      ],
    },
    {
      id: "dua-an-toan-va-bui",
      title: "Dũa an toàn ở chân móng, bụi và dị ứng",
      blocks: [
        { p: "Chân móng là vùng phải cực kỳ cẩn thận. Ở đó là móng thật mới mọc, còn mỏng và mềm. Chỉ lướt phao thật nhẹ cho mất độ bóng." },
        {
          ul: [
            "**Không dũa sâu vào móng thật.** Sau mỗi lần dặm móng mỏng thêm một chút, khách thấy nóng, thấy đau, và móng yếu dần.",
            "**Không dũa vào da.** Dũa vào da là tạo ra vết thương hở, đường cho vi khuẩn đi vào.",
            "Dũa tay hay dũa máy cũng vậy: luôn giữ đầu dũa xa da.",
          ],
        },
        { img: { src: img("tho-nail-deo-khau-trang-dua-mong-co-may-hut"), alt: "Nữ thợ nail đeo kính bảo hộ, khẩu trang và găng đen dùng máy dũa trên móng khách, cạnh miệng hút bụi ở mặt bàn", caption: "Dặm là dũa nhiều: máy hút tại bàn, khẩu trang, găng tay. Máy dũa chỉ dùng khi đã được đào tạo." } },
        { p: "Dặm là dũa nhiều, nên bụi cũng nhiều. Bật máy hút tại bàn, đeo khẩu trang, đeo găng. Phủi bụi bằng chổi, đừng thổi. Bụi của gel chưa chín hết, hay gel dính trên da, đều có thể gây dị ứng cho khách và cho chính người thợ. Phần này có trong bài học [Dị ứng hóa chất](lesson:di-ung-hoa-chat). Quy định về sản phẩm và hút bụi mỗi nước một khác." },
      ],
    },
    {
      id: "noi-voi-khach-va-hen-lich",
      title: "Nói với khách và hẹn lịch dặm",
      blocks: [
        { p: "Một bộ móng được dặm đúng hẹn, luôn được cân lại, thì bền rất lâu mà móng thật vẫn khỏe. Một bộ để quá hạn thì nặng đầu, sớm muộn cũng gãy, cũng hở. Lúc đó nhiều khi phải tháo hết, mất thêm thời gian và tiền của khách. Vì vậy hãy hẹn lịch dặm ngay trước khi khách ra về, và giải thích cho khách hiểu vì sao." },
        { p: "Trong VaraaAi, bạn đặt buổi dặm kế tiếp ngay tại quầy trên [lịch hẹn](lesson:lich-hen) và đánh dấu gửi email xác nhận và nhắc lịch cho khách. Móng nào của khách hay hở, hay gãy thì ghi vào [hồ sơ khách hàng](lesson:khach-hang), để lần sau biết mà chỉnh. Phần tay nghề của một buổi dặm nằm trong bài thực hành [cách dặm móng gel và bột](lesson:fill-mong)." },
      ],
    },
  ],
  faq: [
    {
      q: "Dặm móng (fill móng) là gì?",
      a: "Là buổi làm lại bộ móng builder gel hoặc bột sau vài tuần móng mọc. Người thợ dũa bỏ chỗ hở, dũa mỏng lớp cũ, đắp phần móng mới mọc ở chân móng và dựng lại điểm apex về đúng vùng chịu lực, thay vì tháo hết và làm lại từ đầu.",
    },
    {
      q: "Bao lâu thì nên dặm móng một lần?",
      a: "Thường gặp là khoảng 3–4 tuần với builder gel và khoảng 2–3 tuần với bột acrylic. Con số này tùy móng mọc nhanh hay chậm, tùy công việc của khách và tùy hãng. Móng mọc nhanh hoặc khách làm việc nặng tay thì nên hẹn sớm hơn.",
    },
    {
      q: "Vì sao móng để quá hạn dặm dễ gãy?",
      a: "Vì móng mọc kéo điểm apex ra phía đầu móng. Đầu móng dài và nặng như một đòn bẩy, còn vùng chịu lực thì không còn được apex đỡ. Móng dễ gãy ngang ở đó, hoặc lớp sản phẩm bật lên ở chân móng.",
    },
    {
      q: "Móng bị hở có dặm được không?",
      a: "Được, nếu lớp cũ còn bám chắc và chỉ hở một chút ở mép. Thợ dũa bỏ phần hở tới khi mép bám chắc rồi mới dặm. Nếu hở thành mảng lớn hoặc có túi khí thì phải tháo hết. Không bao giờ đắp đè lên chỗ hở.",
    },
    {
      q: "Dưới chỗ hở có vết xanh thì làm gì?",
      a: "Không dặm, không đắp lại và không phủ màu che đi. Đổi màu dưới chỗ hở có thể là dấu hiệu nhiễm trùng, nên người thợ dừng lại và khuyên khách đi khám.",
    },
    {
      q: "Dặm gel lên móng bột được không?",
      a: "Nguyên tắc là dùng cùng loại: gel dặm lên gel, bột dặm lên bột. Muốn dùng loại khác hoặc hãng khác thì phải xem hãng có nói là dùng chung được không, vì trộn bừa có thể không bám hoặc chín không đều.",
    },
  ],
  related: ["fill-mong", "builder-gel-hieu-dung", "dap-bot-hieu-dung", "thao-gel-hieu-dung"],
};

export default article;
