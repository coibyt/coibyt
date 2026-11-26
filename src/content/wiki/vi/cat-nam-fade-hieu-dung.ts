import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-fade-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "fade-la-gi-low-mid-high-fade",
  lesson: "cat-nam-fade-hieu-dung",
  category: "hair",
  title: "Fade là gì? Low, mid, high fade, skin fade và taper khác nhau thế nào",
  metaTitle: "Fade là gì? Low, mid, high fade, skin fade và taper",
  metaDescription:
    "Fade là gì, fade thấp, trung bình, cao bắt đầu ở đâu, skin fade khác taper thế nào, vì sao fade bị vạch, da nhạy cảm cạo sát ra sao và fade giữ được bao lâu.",
  keyword: "fade là gì",
  keywords: [
    "tóc fade là gì",
    "low fade mid fade high fade",
    "skin fade là gì",
    "taper là gì",
    "taper và fade khác nhau thế nào",
    "fade bao lâu cắt lại",
    "vì sao cắt fade bị vạch",
  ],
  excerpt: "Fade là tóc ngắn dần từ dưới lên, mượt tới mức trông như màu tóc tự chuyển. Bài này giải thích các độ cao, skin fade, taper và lý do fade hay bị vạch.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("kieu-toc-fade-trung-binh-sat-da-nhin-nghieng"),
    alt: "Khách nam nhìn nghiêng với kiểu fade trung bình: quanh tai và gáy sát da, tóc đậm dần lên phần đỉnh dài chải ngược",
  },
  takeaways: [
    "Fade là tóc **ngắn dần từ dưới lên**. Chỗ chuyển phải liền, không vạch, không bậc.",
    "Fade thấp bắt đầu ngay trên tai, trung bình quanh ngang thái dương, cao tới gần hay qua đường vòng đầu. Đó chỉ là mốc tham khảo: hãy chỉ thẳng lên đầu khách.",
    "**Skin fade** là dưới cùng sát da. **Taper** chỉ làm ngắn dần chân tóc ở tóc mai và gáy.",
    "Còn vạch thì xoá tại chỗ bằng độ dài nằm giữa, không đẩy cả đường fade lên cao hơn điều đã hứa.",
    "Fade đẹp nhất trong một, hai tuần đầu. Nhiều khách quay lại sau khoảng 2–3 tuần.",
  ],
  intro: [
    "Fade là gì mà khách nam nào vào tiệm cũng hỏi? Fade là kiểu cắt cho tóc ngắn dần từ dưới lên trên: sát gáy và quanh tai rất ngắn, có khi sát da, rồi dài dần cho tới phần đỉnh. Một đường fade đẹp nhìn rất nhẹ, như thể màu tóc tự chuyển từ sáng sang tối. Chỉ cần một vệt ngang hay một mảng loang là khách nhìn gương thấy ngay.",
    "Bài viết này đi theo bài học “Fade: hiểu đúng để chuyển màu mượt không vệt” trong khóa Nghề Tóc của VaraaAi Academy, là phần lý thuyết của chủ đề fade. Đọc xong, bạn phân biệt được các độ cao fade, skin fade và taper, biết đọc dáng đầu trước khi chọn kiểu, và hiểu vạch sinh ra từ đâu. Phần thao tác với tông đơ nằm ở bài [Cách cắt tóc fade từng bước](lesson:cat-nam-fade).",
  ],
  sections: [
    {
      id: "fade-la-gi",
      title: "Tóc fade là gì và vì sao trông như màu tóc tự chuyển",
      blocks: [
        { p: "Trên một đường fade không có sợi tóc nào được nhuộm. Thứ tạo ra dải màu là độ dài. Tóc ngắn thì da đầu lộ ra nhiều, nhìn sáng. Tóc dài hơn che da đầu nhiều hơn, nhìn tối. Khi độ dài tăng đều từ dưới lên, mắt thấy một dải chuyển mượt từ sáng sang tối." },
        { img: { src: img("skin-fade-nhin-tu-phia-sau-gay-sat-da"), alt: "Đầu của khách nam nhìn thẳng từ phía sau: ở gáy lộ da, tóc đậm dần lên phía trên thành một dải chuyển đều không có vạch", caption: "Nhìn từ phía sau: sáng ở gáy, tối dần lên trên, không có vạch ngang nào." } },
        { p: "Mục tiêu của người thợ vì thế rất rõ: chỗ chuyển phải liền. Cái khó của fade không nằm ở tay nhanh. Nó nằm ở chỗ hiểu mình đang tạo ra bao nhiêu độ dài, và mỗi độ dài nằm ở đâu trên đầu khách." },
      ],
    },
    {
      id: "fade-thap-trung-binh-cao",
      title: "Fade thấp, trung bình, cao: mỗi loại bắt đầu ở đâu",
      blocks: [
        { p: "Ba độ cao hay gặp, mà nhiều khách gọi theo tiếng Anh là low fade, mid fade và high fade, khác nhau ở chỗ phần chuyển bắt đầu." },
        {
          table: {
            head: ["Kiểu", "Chỗ chuyển nằm ở đâu", "Trông thế nào"],
            rows: [
              ["Fade thấp (low fade)", "Bắt đầu ngay trên tai, chạy vòng xuống gáy", "Phần lớn hai bên vẫn còn tóc. Nhẹ nhàng, hợp người làm văn phòng hay lần đầu thử fade"],
              ["Fade trung bình (mid fade)", "Quanh ngang thái dương, giữa tai và đường vòng đầu", "Rõ nét hơn fade thấp, nhẹ hơn fade cao"],
              ["Fade cao (high fade)", "Lên tới gần hay qua đường vòng đầu, chỗ đầu rộng nhất", "Hai bên gần như sát da, nhìn mạnh và rõ nét"],
            ],
          },
        },
        { img: { src: img("fade-thap-bat-dau-ngay-tren-tai"), alt: "Một khách nam có râu ngắn, tóc gợn sóng, nhìn nghiêng: phần chuyển của fade nằm thấp ngay trên tai, hai bên còn nhiều tóc", caption: "Fade thấp: phần chuyển nằm ngay trên tai, hai bên vẫn còn tóc." } },
        { img: { src: img("fade-cao-hai-ben-gan-sat-da"), alt: "Một khách nam trẻ tóc đen dày nhìn nghiêng: hai bên gần như sát da lên tới chỗ đầu rộng nhất, phần đỉnh để dài", caption: "Fade cao: hai bên gần như sát da lên tới gần đường vòng đầu." } },
        { note: "Mỗi tiệm gọi tên các độ cao hơi khác nhau, nên ba mốc trên chỉ để tham khảo. Điều quan trọng là thợ và khách cùng chỉ vào một chỗ trên đầu khách, trong gương. Với khách làm fade lần đầu, hãy gợi ý bắt đầu thấp hơn một chút: lần sau muốn nâng lên thì dễ, còn đã cao rồi thì phải đợi tóc mọc.", kind: "tip", title: "Thống nhất bằng ngón tay, không bằng tên gọi" },
      ],
    },
    {
      id: "skin-fade-va-taper",
      title: "Skin fade là gì, taper là gì",
      blocks: [
        { p: "Hai chữ này hay bị dùng lẫn với nhau, trong khi chúng cho hai kết quả rất khác." },
        {
          table: {
            head: ["Kiểu", "Đặc điểm", "Hợp với ai"],
            rows: [
              ["Skin fade", "Phần dưới cùng được cạo sát tới da", "Khách muốn thấy da ở dưới cùng, thích nét rõ"],
              ["Taper", "Chỉ chân tóc ở tóc mai và ở gáy được làm ngắn dần, phần còn lại của hai bên vẫn giữ tóc", "Khách thích gọn mà không muốn lộ da"],
            ],
          },
        },
        { p: "Vì vậy khi khách nói muốn cắt fade, bạn hỏi lại đúng một câu: anh có muốn thấy da ở dưới cùng không. Câu trả lời cho biết bạn đang làm skin fade, một đường fade dừng ở độ ngắn của tông đơ, hay chỉ là taper." },
      ],
    },
    {
      id: "doc-dang-dau",
      title: "Đọc dáng đầu trước khi chọn độ cao fade",
      blocks: [
        { p: "Fade làm lộ dáng đầu, nên phải đọc cái đầu trước khi cắt. Bạn đặt tay lên, sờ nhẹ, tìm **đường vòng đầu** là chỗ đầu rộng nhất ở hai bên, và **xương chẩm** là chỗ hơi nhô ra phía sau. Hai mốc này đã được giới thiệu trong bài [Học cắt tóc nam cho người mới](lesson:cat-nam-co-ban-hieu-dung)." },
        { img: { src: img("tho-so-dang-dau-khach-truoc-khi-cat-fade"), alt: "Người thợ mặc gi lê tím đứng sau khách nam, đặt bàn tay lên phía sau đầu khách để sờ dáng đầu, phía trước là gương viền đồng", caption: "Sờ dáng đầu trước khi cắt: tìm đường vòng đầu, xương chẩm và chỗ phẳng." } },
        {
          ul: [
            "**Sau đầu hơi phẳng.** Chuyện rất hay gặp. Đẩy fade lên quá cao thì chỗ phẳng lộ ra, đầu trông móp. Giữ lại độ dài phía trên xương chẩm, đầu sẽ tròn hơn.",
            "**Sẹo trên da đầu.** Fade sát da sẽ làm lộ sẹo. Hỏi khách trước, có khi nên để dài hơn một chút ở chỗ ấy.",
            "**Xoáy ở đỉnh và ở gáy.** Tóc quanh xoáy nằm nhiều hướng, fade ngắn đi qua dễ thành mảng loang. Chỗ này cần đi tông đơ theo nhiều hướng.",
          ],
        },
      ],
    },
    {
      id: "vi-sao-fade-bi-vach",
      title: "Vì sao cắt fade bị vạch: cần gạt, cữ nửa số và cách xoá vạch",
      blocks: [
        { p: "Vạch xuất hiện khi hai độ dài liền nhau chênh quá nhiều. Fade đẹp là nhờ có nhiều bước nhỏ, không phải nhảy một bước lớn. Dụng cụ tạo ra những bước nhỏ ấy là cần gạt và cữ nửa số." },
        { h3: "Cần gạt và cữ nửa số" },
        { p: "Cần gạt nằm ở bên hông tông đơ. Mở cần, lưỡi lùi ra, tóc dài hơn một chút. Đóng cần, lưỡi tiến lên, tóc ngắn hơn. Hướng gạt mỗi máy mỗi khác, nên bạn hãy thử trên máy của mình. Cần gạt cho ra những độ dài nằm giữa hai cữ. Nhiều bộ cữ còn có cữ nửa số, cho những bước chuyển rất nhỏ." },
        { img: { src: img("can-gat-tren-tong-do-cat-fade"), alt: "Người thợ giơ chiếc tông đơ không gắn cữ, lưỡi hướng lên, ngón cái đặt trên cần gạt bằng kim loại ở bên hông máy", caption: "Cần gạt bên hông máy: mở là dài hơn, đóng là ngắn hơn. Hướng gạt tùy từng máy." } },
        { h3: "Làm từng dải và hất tông đơ ra" },
        { p: "Cách làm thường gặp là kẻ một đường chuẩn bằng một cữ, vòng quanh đầu, ở độ cao đã chọn. Phần dưới đường ấy được chia thành từng dải: dải dưới cùng ngắn nhất, mỗi dải lên trên dùng một độ dài dài hơn một chút. Ở mỗi chỗ dừng, tông đơ không được kéo thẳng ra. Bạn lật cổ tay, hất máy ra ngoài thành một đường cong nhỏ, như múc một thìa. Nhờ vậy chỗ dừng mờ dần chứ không thành vạch." },
        { img: { src: img("vach-giua-cac-dai-khi-cat-fade"), alt: "Mái bên của khách nam đang cắt dở, trên nền tóc ngắn thấy rõ các vạch ngang giữa những dải có độ dài khác nhau", caption: "Đang làm dở: giữa các dải còn vạch. Đây là lúc dùng độ dài nằm giữa để xoá." } },
        { h3: "Xoá vạch tại chỗ" },
        { p: "Dù cẩn thận đến đâu, giữa hai dải vẫn hay còn một vạch mờ. Để xoá, bạn dùng độ dài nằm giữa hai dải ấy, tức là mở cần nửa chừng hoặc lắp cữ nửa số, và chỉ đi đúng trên vạch rồi hất ra. Đừng đi cả mảng." },
        { note: "Lỗi rất hay gặp là sợ vạch nên cứ đi lên mãi. Đường fade bị đẩy cao dần, cao hơn điều đã hứa với khách. Hãy dừng lại và xoá vạch tại chỗ, đừng dời nó lên.", kind: "warn", title: "Đừng đuổi theo vạch" },
        { h3: "Ánh sáng và góc nhìn" },
        { p: "Dưới đèn chiếu từ trên xuống, vạch và mảng loang hiện ra rất rõ. Dưới ánh đèn mờ, đường fade nhìn có vẻ mượt, khách ra ngoài nắng mới thấy lỗi. Vì vậy hãy kiểm tra ở chỗ sáng: nghiêng đầu khách, nhìn từ bên trái, bên phải, cúi xuống ngang tầm mắt và nhìn phía sau. Sau cùng đặt hai ngón tay lên hai bên để so xem đường fade có cùng độ cao không, giống như khi so tóc mai." },
      ],
    },
    {
      id: "phan-sat-da",
      title: "Phần sát da: máy cạo lưới, dao cạo và da nhạy cảm",
      blocks: [
        { p: "Với skin fade, phần dưới cùng thường được làm bằng máy cạo lưới hoặc dao cạo. Máy cạo lưới nhẹ nhàng hơn với da. Dao cạo thì chỉ dùng lưỡi dùng một lần, mỗi khách một lưỡi mới." },
        { p: "Da nhạy cảm dễ nổi mẩn đỏ, nổi mụn sau khi cạo. Với những khách này, bạn căng da nhẹ, đi xuôi và đừng đi lại nhiều lần một chỗ. Khách hay bị kích ứng thì dừng ở độ dài sát nhất của tông đơ, không cạo." },
        { note: "Da đầu có vết thương, đang viêm hay có mụn mủ thì không cạo. Tông đơ, cữ, lược và máy cạo được làm sạch, khử khuẩn sau mỗi khách theo hướng dẫn của sản phẩm. Quy định khác nhau theo từng nước, nên hãy kiểm tra quy định nơi bạn làm việc. Xem thêm [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu) và [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam).", kind: "warn", title: "An toàn khi cạo sát" },
      ],
    },
    {
      id: "fade-giu-duoc-bao-lau",
      title: "Fade giữ được bao lâu và nên hẹn khách thế nào",
      blocks: [
        { p: "Nên nói trước với khách rằng fade đẹp nhất trong một, hai tuần đầu. Tóc mọc khoảng một phân mỗi tháng, nên phần sát da sẽ nhanh mờ đi. Nhiều khách giữ fade bằng cách quay lại sau khoảng 2–3 tuần. Đó là thói quen phổ biến, không phải quy định, và tùy khách thích gọn tới đâu." },
        { p: "Sau mỗi lần cắt, bạn ghi lại fade cao hay thấp, dùng những cữ nào, cần gạt ra sao. Trong VaraaAi, các ghi chú này nằm trong [sổ khách hàng](lesson:khach-hang), nên lần sau ai trong tiệm cắt cũng làm lại được đúng như vậy. Lúc khách thanh toán, hãy gợi ý đặt luôn lần sau trên [lịch hẹn](lesson:lich-hen), hoặc dùng [thẻ khách quen](lesson:the-khach-quen) cho những khách quay lại đều." },
      ],
    },
  ],
  faq: [
    {
      q: "Tóc fade là gì?",
      a: "Fade là kiểu cắt cho tóc ngắn dần từ dưới lên trên: sát gáy và quanh tai rất ngắn, có khi sát da, rồi dài dần tới phần đỉnh. Tóc ngắn lộ da nên trông sáng, tóc dài hơn trông tối, vì thế mắt thấy một dải màu chuyển mượt. Một đường fade đúng thì không có vạch hay bậc.",
    },
    {
      q: "Low fade, mid fade và high fade khác nhau thế nào?",
      a: "Chúng khác nhau ở chỗ phần chuyển bắt đầu. Fade thấp bắt đầu ngay trên tai và chạy vòng xuống gáy. Fade trung bình nằm quanh ngang thái dương. Fade cao lên tới gần hay qua đường vòng đầu, hai bên gần như sát da. Mỗi tiệm gọi hơi khác, nên thợ và khách cần chỉ thẳng vị trí trên đầu.",
    },
    {
      q: "Taper và fade khác nhau thế nào?",
      a: "Taper nhẹ hơn fade. Với taper, chỉ phần chân tóc ở tóc mai và ở gáy được làm ngắn dần, phần còn lại của hai bên vẫn giữ tóc. Taper hợp với khách thích gọn mà không muốn lộ da.",
    },
    {
      q: "Skin fade là gì?",
      a: "Skin fade là đường fade có phần dưới cùng được cạo sát tới da, thường bằng máy cạo lưới hoặc dao cạo với lưỡi dùng một lần. Khách có da nhạy cảm, hay bị kích ứng sau khi cạo thì nên dừng ở độ dài sát nhất của tông đơ.",
    },
    {
      q: "Lần đầu cắt fade nên chọn kiểu nào?",
      a: "Nên bắt đầu bằng fade thấp, hoặc thấp hơn một chút so với kiểu định chọn. Fade thấp nhẹ nhàng vì phần lớn hai bên vẫn còn tóc. Lần sau muốn nâng cao hơn thì dễ, còn nếu đã cắt cao thì phải đợi tóc mọc lại.",
    },
    {
      q: "Cắt fade bao lâu thì phải cắt lại?",
      a: "Fade đẹp nhất trong một, hai tuần đầu, sau đó phần sát da mờ dần vì tóc mọc khoảng một phân mỗi tháng. Nhiều khách quay lại sau khoảng 2–3 tuần để giữ fade. Đây là thói quen phổ biến chứ không phải quy định.",
    },
  ],
  related: ["cat-nam-fade", "cat-nam-co-ban-hieu-dung", "cat-nam-tao-kieu-hieu-dung", "toc-tu-van-chia-vung-hieu-dung"],
};

export default article;
