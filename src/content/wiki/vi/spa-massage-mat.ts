import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-mat/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-massage-mat",
  lesson: "spa-massage-mat",
  category: "spa",
  title: "Cách massage mặt tại spa: 12 bước từ cái chạm đầu tiên đến ấn giữ thái dương",
  metaTitle: "Cách massage mặt tại spa: 12 bước, đúng hướng tay",
  metaDescription:
    "Cách massage mặt từng bước cho người làm spa: hỏi dị ứng, tư thế, lấy dầu, vuốt cổ vai, hàm và má, trán, quanh mắt, ấn giữ, kết thúc, lỗi hay gặp và ghi chú.",
  keyword: "cách massage mặt",
  keywords: [
    "các bước massage mặt",
    "quy trình massage mặt tại spa",
    "massage mặt theo hướng nào",
    "massage mặt bao nhiêu phút",
    "cách massage quanh mắt",
    "massage mặt cho người mới học",
  ],
  excerpt: "Một lượt massage mặt hoàn chỉnh: đi từ vai và cổ lên hàm, má, trán, quanh mắt, rồi ấn giữ và kết thúc. Kèm số lần lặp, lượng dầu và bốn lỗi hay gặp.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("dat-tay-len-vai-khach-truoc-khi-massage-mat"),
    alt: "Chuyên viên spa đứng ở đầu giường, hai bàn tay mở đặt nhẹ lên vai khách đang nằm nhắm mắt, phía sau là cửa sổ vòm và chậu lan trắng",
  },
  takeaways: [
    "Massage mặt làm trên da đã sạch, khoảng **10–20 phút** tùy liệu trình của tiệm.",
    "Thứ tự cố định: vai và cổ, hàm và má, quanh miệng, trán, quanh mắt, ấn giữ, kết thúc. Đi từ dưới lên, vùng mắt làm sau cùng.",
    "Mọi đường vuốt trên mặt đi **lên trên và ra ngoài**; mỗi động tác lặp lại khoảng ba đến sáu lần.",
    "Luôn giữ một tay trên khách khi chuyển động tác, để khách không giật mình.",
    "Chỗ nào da đỏ lên nhanh thì nhẹ tay lại hoặc bỏ qua. Da đỏ rát, ngứa thì dừng, lau nhẹ và đắp khăn mát.",
  ],
  intro: [
    "Cách massage mặt trong một buổi chăm sóc da không có gì bí hiểm: vài động tác vuốt, xoa vòng, ấn giữ, làm theo một thứ tự không đổi. Phần khó là giữ cho lực nhẹ, nhịp đều và bàn tay không rời khách trong suốt mười đến hai mươi phút đó.",
    "Bài viết này đi theo bài học “Massage mặt: thực hành từng bước” trong khóa Spa & chăm sóc da của VaraaAi Academy. Đọc xong, bạn làm được một lượt massage mặt mười hai bước, từ câu hỏi đầu tiên cho tới lúc ghi chú và dọn giường. Thời gian massage theo liệu trình của tiệm; dầu và kem dùng theo hướng dẫn của hãng.",
  ],
  sections: [
    {
      id: "thu-tu-mot-luot-massage",
      title: "Thứ tự một lượt massage mặt: từ dưới lên, vùng mắt sau cùng",
      blocks: [
        { p: "Massage mặt thường làm sau khi da đã sạch, trong buổi chăm sóc da. Lượt massage trong bài học đi qua bảy chặng:" },
        {
          ol: [
            "Vai và cổ",
            "Hàm và má",
            "Quanh miệng",
            "Trán",
            "Quanh mắt",
            "Ấn giữ",
            "Kết thúc",
          ],
        },
        { p: "Thứ tự này đi từ dưới lên trên, và từ vùng ít nhạy cảm đến vùng nhạy cảm nhất là quanh mắt. Khi tay chạm đến mắt, khách đã quen với lực và nhịp của bạn." },
        { note: "Giữ cùng một thứ tự mỗi lần làm. Tay bạn sẽ quen, nhịp tay đều, và không bỏ sót vùng nào.", kind: "tip", title: "Kinh nghiệm trong nghề" },
        { p: "Bài này chỉ nói phần thao tác. Vì sao hướng tay phải đi lên, khi nào phải hẹn lại khách và massage mặt làm được gì, không làm được gì: xem bài [Massage mặt có tác dụng gì](lesson:spa-massage-mat-hieu-dung)." },
      ],
    },
    {
      id: "so-lan-luong-dau-luc-tay",
      title: "Số lần lặp, lượng dầu và lực tay",
      blocks: [
        { p: "Ba con số và thói quen dưới đây áp dụng cho mọi bước trong lượt massage." },
        {
          table: {
            head: ["Điều cần nhớ", "Làm thế nào", "Vì sao"],
            rows: [
              ["Số lần lặp", "Mỗi động tác khoảng ba đến sáu lần rồi mới chuyển", "Khách kịp cảm nhận và thả lỏng"],
              ["Lượng dầu", "Bắt đầu ít, thấy tay kéo da thì thêm một chút", "Nhiều quá mặt sẽ nhờn và tay trơn, khó kiểm soát"],
              ["Lực tay", "Nói trước với khách, hỏi lại ở bước ấn giữ", "Mỗi người chịu một mức lực khác nhau"],
              ["Bàn tay", "Luôn giữ một tay trên khách khi chuyển động tác", "Khách không giật mình và thả lỏng sâu hơn"],
            ],
          },
        },
        { p: "Với khách da đỏ, nhạy cảm, lượt massage được rút bớt: ấn giữ thật nhẹ hoặc bỏ qua, và không vỗ." },
      ],
    },
    {
      id: "loi-hay-gap",
      title: "Bốn lỗi hay gặp khi massage mặt",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Cách sửa"],
            rows: [
              ["Nhấc cả hai tay ra rồi đặt lại đột ngột", "Khách giật mình", "Luôn giữ một tay trên khách"],
              ["Móng tay chạm vào da", "Khách khó chịu, da dễ xước", "Móng cắt ngắn, chỉ dùng phần thịt đầu ngón"],
              ["Nói chuyện liên tục", "Khách khó thư giãn", "Hỏi về lực tay, rồi để khách nghỉ"],
              ["Quên nhìn da", "Không thấy chỗ da đang đỏ lên", "Chỗ nào đỏ lên nhanh thì nhẹ tay lại, hoặc bỏ qua vùng đó"],
            ],
          },
        },
      ],
    },
    {
      id: "khi-nao-tranh-vung-hoac-dung",
      title: "Khi nào tránh một vùng, khi nào dừng hẳn",
      blocks: [
        {
          ul: [
            "Khách có mụn rộp, vết trầy hay cháy nắng: tránh vùng đó.",
            "Khách vừa tiêm làm đẹp, làm laser hay lột da: làm theo lời dặn của người đã làm cho khách.",
            "Đang làm mà da đỏ rát, ngứa: dừng, lau nhẹ, đắp khăn mát, như trong bài [Xử lý sự cố](lesson:xu-ly-su-co).",
          ],
        },
        { p: "Những trường hợp phải từ chối ngay từ đầu được gom trong bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam)." },
        { note: "Quy định và danh xưng của nghề massage khác nhau theo từng nước. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nước một khác" },
      ],
    },
    {
      id: "ghi-chu-sau-massage",
      title: "Sau khi massage mặt: ghi chú để lần sau ai làm cũng biết",
      blocks: [
        { p: "Ba điều đáng ghi sau mỗi lượt massage là loại dầu đã dùng, lực tay khách thích và vùng cần tránh. Trong VaraaAi, bạn ghi chúng vào ghi chú nội bộ của khách trong [sổ khách hàng](lesson:khach-hang). Lần sau, dù bạn hay đồng nghiệp làm, khách không phải nhắc lại." },
        { img: { src: img("ghi-chu-noi-bo-sau-khi-massage-mat"), alt: "Chuyên viên spa ngồi ở bàn đá nhỏ cạnh cửa sổ, gõ ghi chú trên máy tính bảng, phía sau là giường spa đã trống", caption: "Ghi chú ngay khi khách vừa về, lúc còn nhớ rõ." } },
        { p: "Nếu tiệm bán massage mặt như một dịch vụ riêng hay một phần của gói chăm sóc da, bạn [thêm dịch vụ](lesson:dich-vu) với đúng thời lượng theo liệu trình của tiệm để khách tự đặt trên mạng." },
      ],
    },
  ],
  howTo: {
    title: "Các bước massage mặt tại spa",
    id: "cac-buoc-massage-mat",
    after: "thu-tu-mot-luot-massage",
    lead: "Mười hai bước dưới đây theo đúng thứ tự trong video bài học, làm trên da đã sạch, không còn trang điểm.",
    supplies: [
      "Phiếu tư vấn của khách",
      "Dầu hoặc kem massage mặt trong chai có vòi bơm",
      "Khăn, chăn, băng đô và ga sạch cho khách",
      "Ghế ngồi chỉnh được độ cao, đặt ở đầu giường",
      "Mút lau mặt và nước ấm, nếu làm tiếp mặt nạ",
    ],
    steps: [
      {
        name: "Hỏi khách và chuẩn bị đôi tay",
        text: "Xem lại phiếu tư vấn, hỏi khách có dị ứng dầu, dị ứng hạt hay mùi hương nào không, và gần đây có tiêm làm đẹp, làm laser hay lột da không. Nếu có thì làm theo lời dặn của người đã làm cho khách; mụn rộp, vết trầy, cháy nắng thì tránh vùng đó. Mời khách tháo kính áp tròng. Bạn tháo nhẫn, đồng hồ, rửa tay bằng xà phòng, lau khô, tay lạnh thì xoa cho ấm.",
      },
      {
        name: "Chỉnh tư thế cho khách và cho mình",
        text: "Khách nằm ngửa, đắp khăn và chăn, chỉ để lộ mặt, cổ và vai; hỏi khách có ấm không, gối có vừa không. Bạn ngồi ghế ở đầu giường, chỉnh ghế sao cho lưng thẳng, vai thả lỏng, cổ tay thẳng. Nói trước với khách rằng lực tay mạnh quá hay nhẹ quá thì cứ nói.",
      },
      {
        name: "Lấy dầu",
        text: "Bơm một lượng nhỏ ra lòng bàn tay và xoa giữa hai bàn tay cho ấm. Bắt đầu ít thôi; thấy tay kéo da thì thêm một chút. Nhiều quá mặt sẽ nhờn và tay trơn, khó kiểm soát.",
      },
      {
        name: "Cái chạm đầu tiên",
        text: "Đặt nhẹ hai bàn tay lên vai khách và giữ yên trong vài nhịp thở, rồi ấn nhẹ vai xuống. Cái chạm này báo cho khách biết buổi massage đã bắt đầu và khách có thể thả lỏng.",
        image: { src: img("cai-cham-dau-tien-hai-tay-dat-len-vai"), alt: "Nhìn từ trên xuống, hai bàn tay chuyên viên đặt phẳng trên hai vai của khách nữ đeo băng đô trắng đang nhắm mắt", caption: "Hai tay đặt lên vai, giữ yên vài nhịp thở trước khi ấn nhẹ xuống." },
      },
      {
        name: "Vuốt cổ và vai",
        text: "Lòng bàn tay vuốt nhẹ ở hai bên cổ, đi xuống về phía xương quai xanh, rồi ra vai. Không chạm vào giữa cổ họng và không ấn sâu vào hai bên cổ, vì ở đó có mạch máu và khí quản. Lặp lại vài lần, chậm và đều.",
        image: { src: img("vuot-nhe-hai-ben-co-xuong-xuong-quai-xanh"), alt: "Hai lòng bàn tay chuyên viên áp nhẹ hai bên cổ của khách đang nằm nhắm mắt, các ngón tay hướng xuống phía xương quai xanh" },
      },
      {
        name: "Vuốt hàm và má",
        text: "Vuốt từ giữa cằm, theo đường hàm, lên đến trước tai. Rồi vuốt từ cánh mũi, theo dưới gò má, lên thái dương. Hai tay đối xứng, đều nhau, và hướng tay luôn đi lên trên và ra ngoài, không kéo da xuống.",
        image: { src: img("vuot-tu-cam-theo-duong-ham-len-tai"), alt: "Hai bàn tay chuyên viên ôm lấy cằm và đường hàm của khách, các ngón tay chụm ở giữa cằm chuẩn bị vuốt lên phía tai", caption: "Từ giữa cằm, theo đường hàm, lên trước tai." },
      },
      {
        name: "Xoa vòng trên má, rồi quanh miệng",
        text: "Đầu ngón giữa và ngón áp út vẽ những vòng tròn nhỏ, nhẹ, trên má rồi dọc đường hàm, mỗi vòng nhích lên một chút, đi dần từ cằm lên thái dương. Sau đó đặt đầu ngón giữa ở giữa cằm, vuốt vòng quanh môi lên đến cánh mũi, thật nhẹ, rồi vuốt từ khóe miệng ra phía tai. Không kéo khóe miệng và không để dầu lên môi.",
      },
      {
        name: "Vuốt trán",
        text: "Đặt lòng bàn tay lên trán, vuốt từ chân mày lên chân tóc, tay này nối tiếp tay kia. Rồi vuốt ngang từ giữa trán ra hai bên thái dương. Trán là chỗ nhiều người hay căng khi mệt, khi lo nghĩ, nên ở đây đi chậm hơn một chút và để khách thở đều.",
        image: { src: img("vuot-tran-tu-chan-may-len-chan-toc"), alt: "Một bàn tay chuyên viên đặt phẳng trên trán khách, bàn tay kia chờ nối tiếp, khách nhắm mắt nằm trên khăn trắng", caption: "Tay này nối tay kia, từ chân mày lên chân tóc." },
      },
      {
        name: "Lướt quanh mắt bằng ngón áp út",
        text: "Chỉ dùng ngón áp út, lực nhẹ nhất. Lướt dọc chân mày ra thái dương, rồi vòng thật nhẹ theo xương dưới mắt, về phía sống mũi. Không ấn lên mí mắt, và chú ý đừng để dầu chảy vào mắt.",
        image: { src: img("massage-quanh-mat-bang-ngon-ap-ut"), alt: "Các đầu ngón tay của chuyên viên đặt nhẹ dọc hai chân mày của khách đang nhắm mắt, hướng ra phía thái dương" },
      },
      {
        name: "Ấn giữ, và vỗ nhẹ nếu da không nhạy cảm",
        text: "Đầu ngón tay ấn từ từ ở giữa hai chân mày, rồi dưới gò má, rồi ở thái dương; mỗi chỗ giữ vài giây và nhả từ từ. Hỏi khách lực như vậy có vừa không. Khách da đỏ, nhạy cảm thì ấn thật nhẹ hoặc bỏ qua. Nếu muốn vỗ nhẹ, đầu ngón tay chạm nhanh, nhẹ trên má như mưa rơi; da nhạy cảm thì không vỗ.",
        image: { src: img("an-giu-duoi-go-ma-khi-massage-mat"), alt: "Đầu các ngón tay của chuyên viên ấn nhẹ vào vùng dưới gò má hai bên mặt khách nữ đang nhắm mắt", caption: "Ấn giữ dưới gò má: ấn từ từ, giữ vài giây, nhả từ từ." },
      },
      {
        name: "Kết thúc lượt massage",
        text: "Vuốt dài cả mặt, từ cằm lên má, lên trán, ra thái dương, vài lần, chậm dần. Cuối cùng ấn giữ nhẹ hai bên thái dương rồi nhấc tay ra thật từ từ. Nếu còn làm tiếp mặt nạ thì lau bớt dầu thừa bằng mút ấm, ẩm.",
      },
      {
        name: "Hỏi khách, ghi chú và dọn dẹp",
        text: "Hỏi khách cảm thấy thế nào, lực tay có vừa không, và dặn khách báo ngay cho tiệm nếu da đỏ, rát hay ngứa kéo dài. Ghi vào ghi chú của khách loại dầu đã dùng, lực tay khách thích và vùng cần tránh. Sau đó cho khăn, băng đô vào giỏ đồ giặt có nắp, lau giường và [rửa tay](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "Massage mặt bao nhiêu phút là đủ?",
      a: "Trong một buổi chăm sóc da, massage mặt thường kéo dài khoảng mười đến hai mươi phút, tùy liệu trình của tiệm. Massage được làm sau khi da đã sạch, không còn trang điểm.",
    },
    {
      q: "Massage mặt theo hướng nào là đúng?",
      a: "Các đường vuốt trên mặt đi lên trên và ra ngoài: từ giữa cằm theo đường hàm lên trước tai, từ cánh mũi theo dưới gò má lên thái dương, từ chân mày lên chân tóc. Không kéo da xuống và không chà qua lại, để da không bị kéo giãn và đỏ. Riêng ở cổ, tay vuốt nhẹ hai bên và đi xuống về phía xương quai xanh.",
    },
    {
      q: "Massage mặt nên bắt đầu từ đâu?",
      a: "Bắt đầu bằng việc đặt hai bàn tay lên vai khách và giữ yên vài nhịp thở. Sau đó đi theo thứ tự vai và cổ, hàm và má, quanh miệng, trán, quanh mắt, ấn giữ rồi kết thúc. Lượt massage đi từ dưới lên và từ vùng ít nhạy cảm đến vùng quanh mắt.",
    },
    {
      q: "Mỗi động tác massage mặt lặp lại mấy lần?",
      a: "Khoảng ba đến sáu lần cho mỗi động tác, rồi mới chuyển sang động tác khác. Số lần đó đủ để khách kịp cảm nhận và thả lỏng. Khi chuyển động tác, luôn giữ một tay trên khách.",
    },
    {
      q: "Massage quanh mắt thế nào để không hại da?",
      a: "Chỉ dùng ngón áp út với lực nhẹ nhất. Lướt dọc chân mày ra thái dương, rồi vòng nhẹ theo xương dưới mắt về phía sống mũi. Không ấn lên mí mắt, không để dầu chảy vào mắt, và khách đeo kính áp tròng cần tháo ra trước.",
    },
    {
      q: "Da nhạy cảm, hay đỏ thì massage mặt cần lưu ý gì?",
      a: "Làm ít động tác với lực nhẹ nhất. Động tác ấn giữ làm thật nhẹ hoặc bỏ qua, và không vỗ. Trong lúc làm, chỗ nào da đỏ lên nhanh thì nhẹ tay lại hoặc bỏ qua vùng đó; da đỏ rát hay ngứa thì dừng, lau nhẹ và đắp khăn mát.",
    },
  ],
  related: ["spa-massage-mat-hieu-dung", "spa-facial", "spa-massage-body", "spa-soi-da"],
};

export default article;
