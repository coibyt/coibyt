import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mi-co-hai-mi-that/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "noi-mi-co-hai-khong-co-lam-rung-mi-that",
  lesson: "noi-mi-co-hai-mi-that",
  category: "tips",
  title: "Nối mi có hại không? Khi nào nối mi làm rụng mi thật và cách giữ mi khỏe",
  metaTitle: "Nối mi có hại không, có làm rụng mi thật không?",
  metaDescription:
    "Nối mi có hại không? So sánh nối chuẩn cách chân mi khoảng 1 mm với nối sai bết keo, vì sao mi nối phải vừa sức mi thật và vì sao không bao giờ tự giật mi nối.",
  keyword: "nối mi có hại không",
  keywords: ["nối mi có làm rụng mi thật không", "nối mi có làm mi thưa không", "nối mi bị bết keo", "tự tháo mi nối ở nhà được không", "mi nối quá nặng", "nối mi lâu dài có sao không"],
  excerpt: "Nối mi chỉ làm rụng mi thật khi nối sai: bết keo, gắn sát da, mi quá nặng, hoặc tự giật ra. Bài viết chỉ cách nhận ra bộ mi nối chuẩn.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-mi-so-hai-mat-khach-tu-dau-giuong"),
    alt: "Nhìn từ đầu giường xuống gương mặt khách nằm nhắm mắt với miếng lót dưới hai mắt, hai bàn tay đeo găng đen đặt hai bên",
  },
  takeaways: [
    "Nối mi đúng kỹ thuật không làm rụng mi thật: mi thật vẫn mọc và rụng theo vòng đời tự nhiên.",
    "Nối chuẩn: một sợi nối trên **một sợi mi thật**, cách chân mi khoảng 1 mm, keo không chạm da, từng sợi tách riêng.",
    "Nối sai **bết keo** làm dính nhiều sợi vào nhau; một sợi rụng sẽ kéo theo các sợi bên cạnh.",
    "Mi nối phải **vừa sức mi thật**: mi mảnh mang sợi quá dài, quá dày sẽ bị kéo và dễ gãy.",
    "Muốn bỏ mi nối thì đến tiệm để thợ dùng dung dịch tháo keo, đừng tự giật ra.",
  ],
  intro: [
    "Nối mi có hại không, có làm rụng hết mi thật không: đây là nỗi lo của hầu hết người định nối mi lần đầu. Câu trả lời nằm ở kỹ thuật nối. Một bộ mi nối chuẩn để mi thật mọc và rụng như bình thường; một bộ nối sai, bết keo, mới làm hàng mi thưa dần.",
    "Bài viết đi theo bài học “Nối mi có làm rụng mi thật?” trong khóa Moja Beauty của VaraaAi Academy, khóa học cho khách từ salon Moja Beauty ở Helsinki. Đọc xong, bạn sẽ phân biệt được nối chuẩn và nối sai, biết vì sao độ dày của mi nối quan trọng, và biết cần làm gì khi muốn bỏ mi nối.",
  ],
  sections: [
    {
      id: "mi-that-van-rung-hang-ngay",
      title: "Trước hết: mi thật vốn rụng mỗi ngày",
      blocks: [
        { p: "Mỗi sợi mi thật có vòng đời riêng: mọc, ngừng dài ra, nghỉ một thời gian rồi tự rụng để sợi mới mọc thay. Vì vậy mỗi ngày rụng vài sợi mi là chuyện bình thường, dù bạn có nối mi hay không." },
        { p: "Mi nối được gắn lên mi thật, nên khi sợi mi thật rụng thì sợi nối rụng theo. Nhiều người thấy sợi mi nối rơi ra kèm một sợi mi thật và nghĩ nối mi làm rụng mi. Thật ra đó là sợi mi đã đến lúc rụng. Bài [vì sao rụng 2–5 sợi mi mỗi ngày là bình thường](lesson:chu-ky-rung-mi) giải thích vòng đời này kỹ hơn." },
        { p: "Câu hỏi đúng vì thế không phải là mi có rụng không, mà là mi thật có bị kéo rụng sớm hơn vòng đời của nó không. Điều đó phụ thuộc vào cách nối." },
      ],
    },
    {
      id: "noi-chuan-va-noi-sai",
      title: "Nối chuẩn và nối sai bết keo khác nhau thế nào",
      blocks: [
        {
          table: {
            head: ["", "Nối chuẩn", "Nối sai"],
            rows: [
              ["Sợi nối gắn lên", "Một sợi mi thật", "Nhiều sợi dính vào nhau"],
              ["Khoảng cách chân mi", "Khoảng 1 mm", "Sát da, keo chạm da"],
              ["Keo", "Mỏng, gọn ở chân sợi", "Bết, thành cục"],
              ["Khi một sợi rụng", "Chỉ sợi đó rụng", "Kéo theo các sợi bên cạnh"],
            ],
          },
        },
        { h3: "Nối chuẩn" },
        { p: "Thợ dùng một cây nhíp tách riêng đúng một sợi mi thật, rồi gắn sợi nối dọc theo sợi đó, cách chân mi khoảng 1 mm. Keo không chạm da. Từng sợi tách riêng, nên mỗi sợi mi thật vẫn mọc và rụng theo lịch của chính nó." },
        { img: { src: img("nhip-tach-rieng-mot-soi-mi-that-truoc-khi-gan"), alt: "Hai cây nhíp trong tay thợ đeo găng đen, một cây tách riêng một sợi mi thật trên mắt khách đang nằm nhắm", caption: "Tách đúng một sợi mi thật trước khi gắn sợi nối." } },
        { img: { src: img("soi-mi-noi-gan-cach-da-mi-khong-cham-da"), alt: "Cận cảnh mắt khách đang nhắm với hàng mi nối gọn gàng, chân các sợi nằm cách da mí một khoảng nhỏ", caption: "Chân sợi nối cách da mí, keo không chạm da." } },
        { h3: "Nối sai" },
        { p: "Keo bết dính nhiều sợi mi vào nhau, hoặc sợi nối gắn sát da. Các sợi mi thật mọc với tốc độ khác nhau, nên khi bị dán chung, chúng kéo nhau. Khi một sợi đến lúc rụng, nó kéo theo cả những sợi bên cạnh còn đang mọc, và hàng mi thật thưa dần. Gắn sát da còn gây cộm và có thể gây kích ứng." },
        { img: { src: img("loi-noi-sai-bet-keo-dinh-nhieu-soi-mi"), alt: "Ví dụ nối sai: một cục keo đen dính nhiều sợi mi vào nhau thành chùm trên mắt khách đang nhắm", caption: "Ví dụ nối sai: keo bết làm nhiều sợi mi dính thành chùm." } },
      ],
    },
    {
      id: "vua-suc-mi-that",
      title: "Mi nối phải vừa sức mi thật",
      blocks: [
        { p: "Nối đúng chỗ là một nửa. Nửa còn lại là độ nặng. Một sợi mi thật chỉ chịu được một sức nặng nhất định. Mi thật mảnh mà mang sợi nối quá dài hoặc quá dày sẽ bị kéo trĩu xuống, gốc mi phải chịu lực, và sợi mi dễ gãy hay rụng sớm." },
        { img: { src: img("loi-mi-noi-qua-nang-keo-trieu-mi-that"), alt: "Ví dụ mi nối quá nặng: hàng mi nối dày rủ xuống, các sợi oằn và lệch hướng trên mắt khách đang nhắm", caption: "Ví dụ sai: mi nối quá nặng làm mi thật oằn xuống." } },
        { p: "Đó là lý do thợ tử tế luôn nhìn mi thật của bạn trước khi chọn kiểu. Mi thật dài, khỏe có thể mang chùm volume nhiều sợi; mi mảnh, ngắn hay thưa thì nên dùng sợi mảnh, ngắn hơn hoặc chùm ít sợi. Nếu bạn muốn một bộ mi rất dày mà mi thật yếu, thợ có thể đề nghị làm nhẹ hơn ở lần này. Nghe thì tiếc, nhưng người trả giá cho một bộ mi quá nặng là mi thật của bạn. Bảng so sánh bốn kiểu có trong bài [các loại nối mi](lesson:4-kieu-noi-mi)." },
        { note: "Dấu hiệu mi đang quá tải: sợi mi oằn xuống, xoắn, lệch hướng, hoặc có những khoảng trống do mi rụng sớm. Thấy vậy, hãy nói với thợ ở lần dặm tới để bộ mi được làm nhẹ đi.", kind: "warn", title: "Để ý khi soi gương" },
      ],
    },
    {
      id: "thao-mi-dung-cach",
      title: "Muốn bỏ mi nối: đừng tự giật ra",
      blocks: [
        { p: "Kéo một sợi mi nối ra là kéo luôn sợi mi thật đang mang nó khỏi chân mi. Làm vài lần thì không sao thấy ngay, nhưng lặp lại nhiều lần, mi mọc lại sẽ thưa và yếu hơn. Cả khi một sợi bị vướng hay chĩa ra, cũng đừng tự gỡ." },
        { p: "Cách đúng là đến tiệm. Thợ bôi dung dịch tháo keo chuyên dụng lên mối keo, chờ keo mềm rồi trượt sợi nối ra nhẹ nhàng. Mắt bạn nhắm suốt lúc tháo, và mi thật được giữ nguyên." },
        { img: { src: img("boi-kem-thao-mi-chuyen-dung-doc-moi-keo"), alt: "Thợ đeo găng đen dùng que nhỏ bôi một đường kem tháo mi màu hồng nhạt dọc hàng mi nối trên mắt khách đang nhắm" } },
        { img: { src: img("soi-mi-noi-truot-ra-sau-khi-keo-mem"), alt: "Que bông vuốt nhẹ trên hàng mi, vài sợi mi nối đã rời ra nằm trên miếng lót trắng dưới mắt khách", caption: "Keo mềm ra thì sợi nối trượt ra, không cần kéo." } },
        { p: "Đừng dùng dầu gần mắt để tự làm tan keo ở nhà, trừ khi hãng sản phẩm hướng dẫn rõ. Sau khi tháo, mi thật thường trông thưa và ngắn hơn bạn nhớ. Đó là vì mắt bạn đã quen nhìn mi nối, không phải vì mi thật bị mất." },
        { img: { src: img("mi-that-con-nguyen-sau-khi-thao-mi-noi"), alt: "Mắt khách đang nhắm sau khi tháo mi nối, hàng mi thật mảnh vẫn còn trên mí, vài sợi nối đã gỡ nằm trên miếng lót" } },
        { p: "Phía tiệm làm việc này thế nào được viết trong bài [cách tháo mi nối và dặm mi](lesson:mi-dam-thao)." },
      ],
    },
    {
      id: "giu-mi-that-khoe",
      title: "Giữ mi thật khỏe khi đeo mi nối",
      blocks: [
        {
          ul: [
            "Không dụi mắt, không kéo hay bứt mi. Dụi mắt làm mi nối xoắn và tuột, kéo theo cả mi thật.",
            "Tránh tẩy trang và kem gốc dầu quanh mắt, vì dầu làm keo mềm ra.",
            "Rửa và chải mi nhẹ nhàng mỗi ngày theo bài [cách rửa mi nối tại nhà](lesson:rua-mi-noi-tai-nha).",
            "Đi dặm sau hai đến ba tuần để thợ gỡ những sợi đã mọc dài và kiểm tra chỗ dính chùm.",
          ],
        },
        { p: "Muốn kiểm tra bộ mi đang nối có chuẩn không? Bạn có thể ghé Moja Beauty ở Helsinki; lịch hẹn đặt trên VaraaAi tại [trang của Moja Beauty](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Nối mi có làm rụng mi thật không?",
      a: "Nối đúng kỹ thuật thì không: mỗi sợi nối gắn lên một sợi mi thật, cách chân mi khoảng 1 mm, và mi thật vẫn mọc, rụng tự nhiên. Chỉ nối sai, bết keo, gắn sát da hoặc mi quá nặng mới làm mi thật thưa dần.",
    },
    {
      q: "Vì sao sợi mi nối rụng ra lại có cả mi thật?",
      a: "Vì mi nối được gắn lên mi thật, nên khi sợi mi thật đến cuối vòng đời và tự rụng, sợi nối rụng theo. Mỗi ngày rụng vài sợi mi là bình thường.",
    },
    {
      q: "Mi nối bị bết keo có sao không?",
      a: "Có. Keo bết làm nhiều sợi mi dính vào nhau, và khi một sợi rụng nó kéo theo các sợi bên cạnh. Hãy quay lại tiệm để thợ tách hoặc gỡ chỗ bết, đừng tự kéo.",
    },
    {
      q: "Tự tháo mi nối ở nhà được không?",
      a: "Không nên. Giật mi nối ra là kéo luôn mi thật khỏi chân mi. Ở tiệm, thợ dùng dung dịch tháo keo chuyên dụng để sợi nối trượt ra mà mi thật được giữ nguyên.",
    },
    {
      q: "Nối mi lâu dài có làm mi thưa không?",
      a: "Khi mỗi lần nối đều đúng kỹ thuật, mi nối vừa sức mi thật và được tháo đúng cách, mi thật vẫn mọc theo vòng đời tự nhiên. Mi thưa dần thường do bết keo, mi quá nặng, hay thói quen dụi và bứt mi.",
    },
    {
      q: "Mi thật mảnh có nối được không?",
      a: "Thường vẫn nối được, nhưng phải chọn sợi mảnh, ngắn hơn hoặc chùm ít sợi để mi thật không bị kéo. Thợ sẽ xem mi thật của bạn trước rồi mới đề nghị kiểu.",
    },
  ],
  related: ["chu-ky-rung-mi", "4-kieu-noi-mi", "rua-mi-noi-tai-nha", "mi-dam-thao-hieu-dung"],
};

export default article;
