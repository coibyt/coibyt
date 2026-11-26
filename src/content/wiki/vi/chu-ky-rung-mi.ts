import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chu-ky-rung-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "rung-mi-moi-ngay-co-binh-thuong-khong",
  lesson: "chu-ky-rung-mi",
  category: "tips",
  title: "Rụng mi mỗi ngày có bình thường không? Ba giai đoạn của sợi mi và vì sao mi nối rụng theo",
  metaTitle: "Rụng mi mỗi ngày có bình thường không? Chu kỳ mọc mi",
  metaDescription:
    "Rụng 2–5 sợi mi mỗi ngày là bình thường. Ba giai đoạn của sợi mi: mọc, chuyển tiếp, nghỉ rồi rụng, vì sao mi nối rụng theo mi thật và vì sao đừng kéo, nhổ mi.",
  keyword: "rụng mi mỗi ngày",
  keywords: ["chu kỳ mọc mi", "mỗi ngày rụng bao nhiêu sợi mi", "vì sao mi nối bị rụng", "nhổ mi có mọc lại không", "mi mọc lại mất bao lâu", "rụng mi có sao không"],
  excerpt: "Sáng nào cũng thấy vài sợi mi rụng là chuyện bình thường. Mỗi sợi mi đi qua ba giai đoạn, và mi nối rụng theo mi thật chứ không phải vì mi hỏng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("co-gai-nhin-len-voi-hang-mi-noi-day"),
    alt: "Cô gái tóc vàng quay mặt ba phần tư, mắt mở nhìn lên phía xa, hàng mi nối đen dày nổi rõ dưới ánh sáng dịu",
  },
  takeaways: [
    "Rụng **2–5 sợi mi mỗi ngày** là bình thường, vì mỗi sợi mi ở một giai đoạn khác nhau.",
    "Mỗi sợi mi đi qua ba giai đoạn: **mọc** (khoảng 4–6 tuần), **chuyển tiếp** (2–3 tuần), **nghỉ** (vài tháng) rồi tự rụng.",
    "Mi nối gắn trên mi thật, nên mi thật rụng thì mi nối rụng theo; đó không phải mi hỏng.",
    "Đừng kéo hay nhổ mi: sợi mới sẽ mọc lại chậm hơn.",
    "Đi dặm sau 2–3 tuần để lấp những chỗ mi đã rụng tự nhiên.",
  ],
  intro: [
    "Rụng mi mỗi ngày có bình thường không? Có. Sáng nào cũng thấy vài sợi mi trên gối hay trên má là chuyện xảy ra với tất cả mọi người, có nối mi hay không. Mỗi sợi mi có vòng đời riêng gồm ba giai đoạn, và khi một sợi đi hết vòng đời, nó tự rụng để sợi mới mọc thay.",
    "Bài viết đi theo bài học “Vì sao rụng 2–5 sợi mi mỗi ngày là bình thường?” trong khóa Moja Beauty của VaraaAi Academy, khóa học cho khách từ salon Moja Beauty ở Helsinki. Đọc xong, bạn sẽ hiểu ba giai đoạn của sợi mi, vì sao mi nối rụng dần, và vì sao lịch dặm hai đến ba tuần là hợp lý.",
  ],
  sections: [
    {
      id: "ba-giai-doan-cua-soi-mi",
      title: "Chu kỳ mọc mi: ba giai đoạn của mỗi sợi",
      blocks: [
        { p: "Sợi mi không mọc mãi. Mỗi sợi đi qua ba giai đoạn: mọc, chuyển tiếp, rồi nghỉ và rụng. Con số dưới đây là khoảng thường gặp theo bài học; mỗi người mỗi khác một chút." },
        {
          table: {
            head: ["Giai đoạn", "Kéo dài", "Sợi mi lúc này"],
            rows: [
              ["Mọc", "Khoảng 4–6 tuần", "Dài ra mỗi ngày; còn ngắn và mảnh"],
              ["Chuyển tiếp", "2–3 tuần", "Ngừng dài ra"],
              ["Nghỉ", "Vài tháng", "Đứng yên, rồi tự rụng để mi mới thay"],
            ],
          },
        },
        { h3: "Giai đoạn mọc" },
        { p: "Trong khoảng bốn đến sáu tuần, sợi mi dài ra mỗi ngày. Sợi mi đang mọc còn ngắn và mảnh. Đó là lý do thợ nối mi chọn sợi nối nhẹ cho những sợi này: một sợi non chưa đỡ được sợi nối dài và nặng." },
        { img: { src: img("mi-that-co-soi-dai-khoe-va-soi-ngan-non"), alt: "Cận cảnh mắt khách đang nhắm với hàng mi thật gồm sợi dài, khỏe xen những sợi ngắn, mảnh còn đang mọc", caption: "Trên cùng một mí luôn có sợi dài, khỏe và sợi ngắn, non." } },
        { h3: "Giai đoạn chuyển tiếp" },
        { p: "Giai đoạn này chỉ kéo dài hai đến ba tuần, và sợi mi ngừng dài ra. Lúc này đừng kéo hay nhổ mi: sợi bị nhổ ra trước kỳ sẽ khiến sợi mới mọc lại chậm hơn." },
        { h3: "Giai đoạn nghỉ" },
        { p: "Giai đoạn nghỉ kéo dài vài tháng. Sợi mi không dài thêm nữa, và đến cuối giai đoạn thì tự rụng để một sợi mi mới thay thế." },
      ],
    },
    {
      id: "vi-sao-2-5-soi",
      title: "Vì sao rụng 2–5 sợi mi mỗi ngày là bình thường",
      blocks: [
        { p: "Các sợi mi trên một mí không đi cùng nhịp. Lúc nào cũng có sợi đang mọc, sợi đang chuyển tiếp, sợi đang nghỉ và sợi sắp rụng. Nhờ vậy hàng mi không bao giờ rụng hết một lượt, mà thay dần từng sợi. Mỗi ngày vài sợi đi hết vòng đời, và rụng hai đến năm sợi mỗi ngày là chuyện bình thường." },
        { p: "Sợi rụng tự nhiên thường có một chân nhỏ màu nhạt ở gốc. Nếu bạn thấy sợi mi rơi ra kèm chân nhỏ đó, đó là sợi đã đến lúc rụng." },
        { note: "Nếu mi rụng thành mảng, rụng nhiều hơn hẳn mọi khi, hoặc kèm đỏ, ngứa, sưng ở bờ mi, đó không còn là chuyện vòng đời bình thường. Hãy đi khám bác sĩ.", kind: "warn", title: "Khi nào không còn bình thường" },
      ],
    },
    {
      id: "mi-noi-rung-theo-mi-that",
      title: "Vì sao mi nối bị rụng: nó rụng theo mi thật",
      blocks: [
        { p: "Mỗi sợi mi nối được gắn lên một sợi mi thật. Khi sợi mi thật ấy đi hết vòng đời và tự rụng, sợi nối rụng theo. Bạn sẽ thấy một sợi mi nối rơi ra, dọc theo nó là một sợi mi thật nhỏ hơn với chân nhạt màu ở gốc." },
        { img: { src: img("soi-mi-that-rung-tu-nhien-con-mang-soi-noi"), alt: "Trên đầu ngón tay đeo găng đen là một sợi mi thật đã rụng, chân nhỏ nhạt màu ở gốc, vẫn còn mang sợi mi nối đen", caption: "Sợi mi thật rụng tự nhiên, vẫn mang theo sợi nối." } },
        { p: "Đó không phải mi hỏng hay keo kém. Đó là vòng đời của mi thật. Sau hai đến ba tuần, đủ số sợi đã rụng để hàng mi trông thưa và không đều, đồng thời những sợi còn lại đã mọc dài ra, đẩy mối keo xa mí. Đó là lúc đi dặm." },
        { img: { src: img("tho-kiem-tra-tung-soi-mi-noi-khi-dam"), alt: "Nhíp trong tay thợ đeo găng đen kiểm tra từng sợi mi nối trên mắt khách đang nhắm trong buổi dặm mi" } },
        { p: "Nếu mi rụng nhiều hơn mức này, nguyên nhân thường nằm ở chỗ khác: dầu quanh mắt, dụi mắt, ngủ úp mặt, hoặc mi nối quá nặng so với mi thật. Bài [nối mi có làm rụng mi thật](lesson:noi-mi-co-hai-mi-that) đi sâu vào phần này." },
      ],
    },
    {
      id: "noi-mi-ben-hon",
      title: "Hiểu chu kỳ mọc mi để mi nối bền hơn",
      blocks: [
        { p: "Thợ giỏi nối mi theo vòng đời của mi thật. Khi chải mi, thợ nhìn xem sợi nào dài và khỏe, sợi nào còn ngắn và non, rồi chọn độ dài, độ dày cho từng sợi. Sợi non quá yếu có thể được để trống đến lần dặm sau." },
        { img: { src: img("tho-do-do-dai-mi-that-bang-mot-soi-noi"), alt: "Nhíp trong tay thợ đeo găng đen đặt một sợi mi nối cạnh sợi mi thật ở đuôi mắt khách để so độ dài", caption: "Thợ so độ dài mi thật trước khi chọn sợi nối." } },
        {
          ul: [
            "**Không kéo, không nhổ mi**, kể cả sợi mi nối bị vướng. Kéo ra là kéo luôn mi thật, và sợi mới mọc lại chậm hơn.",
            "**Tránh dầu quanh mắt** để keo không yếu đi trước khi mi thật đến lúc rụng.",
            "**Rửa và chải mi nhẹ** mỗi ngày, như trong bài [cách rửa mi nối tại nhà](lesson:rua-mi-noi-tai-nha).",
            "**Dặm sau 2–3 tuần** để thêm sợi vào chỗ mi đã rụng và gỡ những sợi đã mọc dài.",
          ],
        },
        { img: { src: img("bo-mi-noi-hoan-thien-tren-mat-nham"), alt: "Mắt khách đang nhắm với bộ mi nối đen, dày và đều, miếng lót trắng dưới mắt" } },
      ],
    },
    {
      id: "chon-kieu-mi-ben",
      title: "Chọn kiểu mi nối cho bền",
      blocks: [
        { p: "Vì mi thật trên một mí luôn có sợi khỏe và sợi non, kiểu mi bền nhất là kiểu vừa sức với chính hàng mi đó. Mi khỏe, dày mang được chùm volume; mi mảnh, nhiều sợi non thì Classic hoặc Hybrid nhẹ thường hợp hơn. So sánh bốn kiểu có trong bài [các loại nối mi](lesson:4-kieu-noi-mi), và lịch dặm được giải thích trong bài [vì sao nên đi dặm mi và móng đúng hẹn](lesson:dam-mi-mong-dung-hen)." },
        { img: { src: img("tho-mi-ghi-ho-so-khach-tren-may-tinh-bang"), alt: "Thợ mi búi tóc ngồi bàn đá cẩm thạch cạnh cửa sổ, ghi chép trên máy tính bảng bên tách trà và bình hoa trắng" } },
        { p: "Salon dùng VaraaAi có thể ghi kiểu mi, độ dài và độ cong đã dùng vào ghi chú nội bộ trong hồ sơ khách, để lần dặm sau thợ nào làm cũng theo đúng bản đồ cũ. Muốn biết mi mình nên nối kiểu nào cho bền, bạn có thể nhắn Moja Beauty hoặc [đặt lịch với Moja Beauty](/b/moja-beauty) trên VaraaAi." },
      ],
    },
  ],
  faq: [
    {
      q: "Mỗi ngày rụng bao nhiêu sợi mi là bình thường?",
      a: "Rụng khoảng hai đến năm sợi mi mỗi ngày là bình thường. Mỗi sợi mi ở một giai đoạn khác nhau của vòng đời, nên lúc nào cũng có vài sợi đến lúc rụng.",
    },
    {
      q: "Chu kỳ mọc mi gồm những giai đoạn nào?",
      a: "Ba giai đoạn: mọc (khoảng bốn đến sáu tuần, sợi mi dài ra mỗi ngày), chuyển tiếp (hai đến ba tuần, sợi mi ngừng dài ra) và nghỉ (vài tháng), rồi sợi mi tự rụng để sợi mới thay thế.",
    },
    {
      q: "Vì sao mi nối bị rụng dần?",
      a: "Mi nối được gắn trên mi thật, nên khi mi thật đi hết vòng đời và rụng, mi nối rụng theo. Đó không phải mi hỏng; bạn chỉ cần đi dặm sau hai đến ba tuần.",
    },
    {
      q: "Nhổ mi có mọc lại không?",
      a: "Sợi mi bị nhổ ra trước kỳ thường vẫn mọc lại, nhưng chậm hơn. Vì vậy đừng kéo hay nhổ mi, kể cả khi một sợi mi nối bị vướng.",
    },
    {
      q: "Rụng mi nhiều bất thường thì phải làm sao?",
      a: "Nếu mi rụng thành mảng, nhiều hơn hẳn mọi khi hoặc kèm đỏ, ngứa, sưng ở bờ mi, hãy đi khám bác sĩ. Đó không còn là chuyện vòng đời bình thường của sợi mi.",
    },
    {
      q: "Vì sao thợ không nối sợi dài lên mọi sợi mi?",
      a: "Sợi mi đang mọc còn ngắn và mảnh, chưa đỡ được sợi nối dài và nặng. Thợ chọn sợi nhẹ cho những sợi này để mi thật không bị kéo.",
    },
  ],
  related: ["noi-mi-co-hai-mi-that", "dam-mi-mong-dung-hen", "rua-mi-noi-tai-nha", "mi-classic-hieu-dung"],
};

export default article;
