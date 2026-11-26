import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-tao-kieu-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "chon-kieu-toc-nam-theo-khuon-mat",
  lesson: "cat-nam-tao-kieu-hieu-dung",
  category: "hair",
  title: "Chọn kiểu tóc nam theo khuôn mặt: side part hay French crop, pomade hay sáp",
  metaTitle: "Chọn kiểu tóc nam theo khuôn mặt: side part hay crop",
  metaDescription:
    "Cách chọn kiểu tóc nam theo khuôn mặt, mật độ tóc, xoáy và thói quen mỗi sáng: side part hay French crop, ngôi mềm hay ngôi cứng, pomade, sáp lì, xịt muối biển.",
  keyword: "chọn kiểu tóc nam theo khuôn mặt",
  keywords: [
    "kiểu tóc nam hợp khuôn mặt",
    "mặt tròn nên để tóc gì nam",
    "tóc side part là gì",
    "french crop là gì",
    "pomade và sáp vuốt tóc khác nhau thế nào",
    "sáp vuốt tóc cho tóc mỏng",
    "ngôi cứng hard part",
  ],
  excerpt: "Một kiểu đẹp trên ảnh chưa chắc đẹp trên khách của bạn. Bài này chỉ cách chọn giữa side part và crop theo khuôn mặt, mái tóc và cuộc sống của khách.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("kieu-toc-nam-re-ngoi-lech-side-part"),
    alt: "Khách nam ngồi trên ghế da trong tiệm cắt tóc với kiểu rẽ ngôi lệch: đường ngôi rõ, phần đỉnh chải bóng sang một bên, hai bên ngắn",
  },
  takeaways: [
    "**Side part** (rẽ ngôi lệch) lịch sự nhưng cần sấy và chút sản phẩm mỗi sáng. **Crop** rất dễ chăm: thấm khô, vò chút sáp lì.",
    "Mặt tròn thêm chiều cao ở đỉnh; mặt dài đừng dựng tóc quá cao. Đây là gợi ý của nghề, không phải luật.",
    "Tóc thưa ở phía trước thường hợp crop hơn rẽ ngôi, vì tóc đẩy về trước che được chỗ thưa.",
    "Đường ngôi nên là **ngôi tự nhiên**: làm ướt, chải ra sau, đẩy phần đỉnh về trước và xem tóc tách ở đâu.",
    "Sáp lì hay đất sét cho kết cấu, không bóng; pomade cho bóng và gọn; tóc mảnh dùng loại giữ nếp nhẹ.",
  ],
  intro: [
    "Chọn kiểu tóc nam theo khuôn mặt là việc của người thợ trước khi cầm kéo, và cũng là chỗ nhiều kiểu tóc hỏng dù kỹ thuật cắt không sai. Cùng một đường kéo, hợp hay không hợp là do chọn đúng kiểu cho đúng người. Một kiểu đẹp trên ảnh chưa chắc đã đẹp trên khách đang ngồi trước gương.",
    "Bài viết này đi theo bài học “Tóc nam tạo kiểu: hiểu đúng để hợp khuôn mặt” trong khóa Nghề Tóc của VaraaAi Academy. Bài xoay quanh hai kiểu được hỏi rất nhiều là rẽ ngôi lệch cổ điển (side part) và crop (French crop). Đọc xong, bạn biết gợi ý kiểu theo khuôn mặt, mái tóc và nếp sống của khách, biết chọn sản phẩm tạo kiểu và dạy khách tự làm ở nhà. Phần cắt từng bước nằm ở bài [Cách cắt tóc side part và French crop](lesson:cat-nam-tao-kieu).",
  ],
  sections: [
    {
      id: "side-part-va-crop",
      title: "Tóc side part và French crop là gì",
      blocks: [
        {
          table: {
            head: ["Kiểu", "Đặc điểm", "Chăm sóc mỗi sáng"],
            rows: [
              ["Rẽ ngôi lệch (side part)", "Phần đỉnh dài hơn, phía trước dài nhất, chải sang một bên, có đường ngôi rõ. Hai bên ngắn, taper hoặc fade", "Cần sấy và một chút sản phẩm"],
              ["Crop (French crop)", "Phần đỉnh ngắn, có kết cấu, tóc đẩy về trước, một đường mái ngắn trên trán. Hai bên thường là fade", "Gội xong thấm khô, vò một chút sáp lì"],
            ],
          },
        },
        { p: "Rẽ ngôi lệch trông lịch sự, hợp công sở và sự kiện. Crop hợp với người bận rộn và người chơi thể thao. Sự khác nhau về công chăm sóc quan trọng không kém sự khác nhau về hình dáng, và nên được nói với khách ngay từ đầu." },
        { img: { src: img("kieu-toc-french-crop-mai-ngan-hai-ben-fade"), alt: "Khách nam trẻ tóc vàng tro với kiểu French crop: phần đỉnh ngắn đẩy về trước, đường mái ngắn ngang trán, hai bên cắt fade", caption: "French crop: đỉnh ngắn có kết cấu, mái ngắn trên trán, hai bên fade." } },
        { h3: "Ngôi mềm và ngôi cứng" },
        { p: "Đường ngôi của kiểu rẽ ngôi có hai dạng. **Ngôi mềm** chỉ là chỗ tóc tự tách ra. **Ngôi cứng** (hard part) là một đường cạo mảnh dọc theo ngôi. Ngôi cứng nhìn sắc nét, nhưng khi tóc mọc lại thì lởm chởm, và khách không đổi bên được nữa. Vì cạo bằng dao cạo, ngôi cứng luôn dùng lưỡi dùng một lần, như trong bài [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu)." },
        { h3: "Phần đỉnh và hai bên phải cân nhau" },
        { p: "Rẽ ngôi mà hai bên quá ngắn thì phần đỉnh dài trông như một cái mũ úp lên. Crop mà hai bên để dày thì đầu trông tròn và nặng. Vì vậy khi tư vấn, bạn luôn nói cả hai phần cùng lúc: đỉnh thế nào, hai bên thế nào." },
        { img: { src: img("hai-ben-taper-nhe-cho-kieu-toc-nam-cong-so"), alt: "Khách nam có râu ngắn, tóc nâu gợn sóng nhìn nghiêng: hai bên được làm ngắn nhẹ quanh tai, phần đỉnh dài chải ra sau", caption: "Hai bên làm ngắn nhẹ, còn giữ tóc: lựa chọn kín đáo cho kiểu rẽ ngôi. Về taper và fade, xem bài [Fade là gì](lesson:cat-nam-fade-hieu-dung)." } },
      ],
    },
    {
      id: "kieu-toc-hop-khuon-mat",
      title: "Kiểu tóc nam hợp khuôn mặt: mặt tròn, mặt dài, mặt vuông",
      blocks: [
        { p: "Khuôn mặt là thứ đầu tiên người thợ nhìn. Nguyên tắc chung là dùng tóc để cân lại tỉ lệ: thêm chiều cao ở chỗ thiếu, bớt ở chỗ thừa." },
        {
          table: {
            head: ["Khuôn mặt", "Gợi ý"],
            rows: [
              ["Mặt tròn", "Thêm chút chiều cao ở phần đỉnh. Rẽ ngôi lệch có độ phồng làm mặt trông dài ra"],
              ["Mặt dài", "Đừng dựng tóc quá cao. Một đường mái ngắn như crop giúp mặt trông ngắn lại"],
              ["Mặt vuông, mặt trái xoan", "Hợp với phần lớn các kiểu"],
              ["Tai to hoặc hơi vểnh", "Hai bên đừng cắt quá ngắn"],
            ],
          },
        },
        { note: "Các gợi ý theo khuôn mặt là kinh nghiệm chung của nghề, không phải luật. Cuối cùng vẫn là điều khách thích, còn việc của thợ là nói thật điều mình thấy.", kind: "info", title: "Gợi ý, không phải luật" },
      ],
    },
    {
      id: "chon-theo-mai-toc",
      title: "Chọn kiểu theo mái tóc: tóc thưa, xoáy, tóc dày, tóc gợn sóng",
      blocks: [
        { p: "Sau khuôn mặt là mái tóc. Có bốn điều cần nhìn, và mỗi điều nghiêng về một trong hai kiểu." },
        {
          ul: [
            "**Tóc thưa ở phía trước.** Rẽ ngôi lệch có khi làm lộ da đầu ở đường ngôi. Crop đẩy tóc về trước nên che được chỗ thưa.",
            "**Xoáy ở chân tóc trán.** Tóc dựng lên ở đó. Cắt mái ngắn quá thì mái không chịu nằm xuống. Có khi rẽ ngôi theo đúng chiều của xoáy lại dễ hơn.",
            "**Tóc dày, sợi to, thẳng.** Giữ crop rất tốt.",
            "**Tóc hơi gợn sóng.** Rẽ ngôi lệch sẽ có độ chuyển động rất đẹp.",
          ],
        },
        { p: "Cách đọc mật độ, chất tóc và hướng mọc được nói kỹ trong bài [Tư vấn và chia vùng tóc](lesson:toc-tu-van-chia-vung-hieu-dung)." },
      ],
    },
    {
      id: "hoi-ve-cuoc-song",
      title: "Ba câu hỏi về buổi sáng của khách",
      blocks: [
        { p: "Kiểu tóc sống ở nhà khách nhiều hơn ở tiệm. Trước khi chốt kiểu, bạn hỏi: mỗi sáng anh có mấy phút cho mái tóc, anh có sấy không, anh có đội mũ bảo hiểm hay mũ thể thao không." },
        { img: { src: img("tho-tu-van-chon-kieu-toc-nam-truoc-guong"), alt: "Người thợ cắt tóc đứng cạnh khách nam trước gương viền đồng, một tay nâng phần tóc đỉnh, khách đưa tay diễn tả điều mình muốn", caption: "Tư vấn khi tóc còn khô: nhìn mái tóc thật, rồi hỏi về thói quen mỗi sáng." } },
        { p: "Một chuyện rất hay gặp: khách chọn kiểu rẽ ngôi đẹp trên ảnh nhưng ở nhà không bao giờ sấy. Một tuần sau tóc xẹp, rơi lung tung, và khách nghĩ là thợ cắt không đẹp. Hãy gợi ý kiểu mà khách thật sự tự làm được." },
      ],
    },
    {
      id: "ky-thuat-tao-kieu",
      title: "Kỹ thuật làm nên kiểu: tỉa đầu kéo, tỉa mỏng và ngôi tự nhiên",
      blocks: [
        { h3: "Cắt tỉa đầu kéo" },
        { p: "Thay vì cắt ngang một đường thẳng, thợ đưa mũi kéo thẳng vào ngọn tóc và cắt những khía nhỏ. Ngọn tóc mềm hơn, có độ chuyển động và không còn đường cắt cứng. Kết cấu của crop đến từ kỹ thuật này." },
        { img: { src: img("cat-tia-dau-keo-tao-ket-cau-cho-toc-nam"), alt: "Người thợ kẹp một lọn tóc đỉnh của khách nam tóc vàng giữa hai ngón tay và đưa mũi kéo chếch vào ngọn tóc để cắt khía", caption: "Tỉa đầu kéo: mũi kéo đi vào ngọn tóc, không cắt ngang." } },
        { h3: "Tỉa mỏng" },
        { p: "Tỉa mỏng làm bớt độ nặng ở chỗ tóc dày. Với tóc mảnh và thưa thì tỉa ít thôi, vì tỉa quá tay làm tóc xẹp và lộ da đầu. Đừng tỉa sát chân tóc ở chỗ đường ngôi hay chỗ xoáy: những sợi ngắn ấy sẽ dựng đứng lên." },
        { h3: "Tìm ngôi tự nhiên" },
        { p: "Với kiểu rẽ ngôi, thợ không tự chọn chỗ đặt đường ngôi. Bạn làm ướt tóc, chải hết ra sau, rồi lấy lòng bàn tay đẩy nhẹ phần đỉnh về phía trước. Tóc sẽ tự tách ra ở một chỗ, và đó là ngôi tự nhiên của khách. Rẽ ngôi ở đó thì tóc nằm ngoan, khách ở nhà cũng dễ làm theo. Nếu khách đã quen rẽ một bên nhiều năm, hãy hỏi khách và nhìn xem tóc đã quen nằm thế nào." },
      ],
    },
    {
      id: "pomade-sap-muoi-bien",
      title: "Pomade và sáp vuốt tóc khác nhau thế nào, xịt muối biển dùng khi nào",
      blocks: [
        { p: "Tên sản phẩm trên kệ rất nhiều, nhưng nói chung chúng chia theo hai câu hỏi: tóc bóng hay lì, giữ nếp mạnh hay nhẹ." },
        {
          table: {
            head: ["Sản phẩm", "Cho kết quả gì", "Hợp với"],
            rows: [
              ["Sáp lì, đất sét (clay)", "Kết cấu, không bóng", "Crop"],
              ["Pomade", "Độ bóng, vào nếp gọn. Loại gốc nước gội dễ hơn", "Rẽ ngôi cổ điển"],
              ["Xịt muối biển", "Độ phồng, độ nhám. Dùng trước khi sấy", "Tóc cần thêm độ phồng"],
              ["Sản phẩm giữ nếp nhẹ", "Giữ nếp mà không làm tóc xẹp", "Tóc mảnh"],
            ],
          },
        },
        { img: { src: img("pomade-sap-li-xit-muoi-bien-tao-kieu-toc-nam"), alt: "Trên mặt đá cẩm thạch có một hộp pomade bóng màu hổ phách, một hũ sáp lì màu xám, hai chai xịt không nhãn và một cây lược đen", caption: "Từ trái sang: pomade bóng, sáp lì, chai xịt. Mỗi loại cho một bề mặt tóc khác nhau." } },
        { p: "Sản phẩm nặng làm tóc mảnh xẹp xuống, nên với tóc mảnh, xịt muối biển trước khi sấy và một sản phẩm giữ nếp nhẹ là đủ. Loại nào cũng dùng ít: lấy một chút bằng đầu ngón tay và xoa đều trong lòng bàn tay trước khi đưa lên tóc." },
        { note: "Sản phẩm tạo kiểu dùng theo hướng dẫn của nhà sản xuất. Trước khi dùng, hỏi khách có da đầu nhạy cảm hay dị ứng gì không. Quy định về sản phẩm và dụng cụ trong tiệm khác nhau theo từng nước.", kind: "warn", title: "Hỏi trước khi thoa" },
      ],
    },
    {
      id: "day-khach-tu-lam",
      title: "Dạy khách tự vuốt tóc ở nhà",
      blocks: [
        { p: "Một kiểu tóc chỉ trọn vẹn khi khách tự làm lại được vào sáng hôm sau. Vừa tạo kiểu, bạn vừa nói cho khách nghe: sấy theo hướng nào, lấy bao nhiêu sản phẩm, vuốt thế nào. Nói cả những điều nên tránh. Lấy quá nhiều sáp thì tóc bết và nặng. Kiểu rẽ ngôi mà để tóc tự khô thì phần trước thường xẹp xuống." },
        { img: { src: img("tho-vuot-san-pham-tao-kieu-len-toc-nam"), alt: "Người thợ dùng bàn tay vuốt sản phẩm tạo kiểu lên phần tóc đỉnh của khách nam, đưa tóc ra sau và hơi lệch một bên" } },
        { note: "Đưa máy sấy hoặc hộp sáp cho khách tự thử một lần ngay trên ghế. Khách tự làm được thì sẽ thích kiểu tóc ấy cả tháng, chứ không chỉ một ngày.", kind: "tip", title: "Kinh nghiệm trong nghề" },
        { p: "Trong VaraaAi, bạn ghi kiểu, bên ngôi và sản phẩm khách dùng vào [sổ khách hàng](lesson:khach-hang). Nếu tiệm có bán sáp hay pomade, bạn quản lý chúng trong mục [sản phẩm và đơn hàng](lesson:san-pham-don-hang). Dịch vụ cắt kèm tạo kiểu nên được đặt đủ thời lượng trong [menu dịch vụ](lesson:dich-vu), để còn thì giờ cho mấy phút hướng dẫn này." },
      ],
    },
  ],
  faq: [
    {
      q: "Mặt tròn nên để kiểu tóc nam nào?",
      a: "Theo kinh nghiệm chung của nghề, mặt tròn nên thêm chút chiều cao ở phần đỉnh. Kiểu rẽ ngôi lệch có độ phồng làm khuôn mặt trông dài ra. Đây là gợi ý chứ không phải luật, và còn phải xét mật độ tóc cùng thói quen chăm tóc của từng người.",
    },
    {
      q: "Mặt dài nên để kiểu tóc nam nào?",
      a: "Mặt dài không nên dựng tóc quá cao ở đỉnh. Một đường mái ngắn trên trán, như ở kiểu crop, giúp mặt trông ngắn lại.",
    },
    {
      q: "Tóc side part là gì và có khó chăm không?",
      a: "Side part là kiểu rẽ ngôi lệch cổ điển: phần đỉnh dài hơn, phía trước dài nhất, chải sang một bên với một đường ngôi rõ, hai bên taper hoặc fade. Kiểu này lịch sự, hợp công sở, nhưng cần sấy và một chút sản phẩm mỗi sáng. Nếu để tóc tự khô, phần trước thường xẹp xuống.",
    },
    {
      q: "French crop là gì, hợp với ai?",
      a: "French crop là kiểu có phần đỉnh ngắn, có kết cấu, tóc đẩy về phía trước với một đường mái ngắn trên trán, hai bên thường là fade. Kiểu này rất dễ chăm nên hợp người bận rộn, người chơi thể thao. Nó cũng che tốt phần tóc thưa ở phía trước.",
    },
    {
      q: "Pomade và sáp vuốt tóc khác nhau thế nào?",
      a: "Pomade cho độ bóng và vào nếp gọn, hợp kiểu rẽ ngôi cổ điển; loại gốc nước dễ gội hơn. Sáp lì hay đất sét cho kết cấu và không bóng, hợp kiểu crop. Loại nào cũng nên dùng ít và xoa đều trong lòng bàn tay trước.",
    },
    {
      q: "Tóc mảnh nên dùng sản phẩm tạo kiểu gì để trông dày hơn?",
      a: "Tóc mảnh hợp với xịt muối biển dùng trước khi sấy, để có độ phồng, cùng một sản phẩm giữ nếp nhẹ. Sáp nặng hay nhiều pomade bóng làm tóc mảnh xẹp xuống.",
    },
  ],
  related: ["cat-nam-tao-kieu", "cat-nam-fade-hieu-dung", "cat-nam-co-ban-hieu-dung", "say-tao-kieu-hieu-dung"],
};

export default article;
