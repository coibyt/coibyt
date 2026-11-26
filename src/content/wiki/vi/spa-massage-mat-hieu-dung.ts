import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-mat-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "massage-mat-co-tac-dung-gi",
  lesson: "spa-massage-mat-hieu-dung",
  category: "spa",
  title: "Massage mặt có tác dụng gì? Khi nào không nên làm và những vùng phải thật nhẹ tay",
  metaTitle: "Massage mặt có tác dụng gì? Khi nào không nên làm",
  metaDescription:
    "Massage mặt có tác dụng gì và không làm được gì, khi nào không nên massage, cách chọn dầu, bốn động tác cơ bản, hướng tay, vùng mắt, vùng cổ và động tác ấn giữ.",
  keyword: "massage mặt có tác dụng gì",
  keywords: [
    "massage mặt là gì",
    "massage mặt có thon mặt không",
    "khi nào không nên massage mặt",
    "sau tiêm làm đẹp có được massage mặt không",
    "các động tác massage mặt cơ bản",
    "nhấn huyệt trên mặt",
    "dầu massage mặt",
  ],
  excerpt: "Massage mặt trong spa là để khách thư giãn và da trông tươi hơn, không phải để chữa bệnh. Bài này nói về lực tay, hướng tay, nhịp tay và những lúc không nên làm.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuyen-vien-ngoi-dau-giuong-massage-mat-cho-khach"),
    alt: "Chuyên viên spa mặc áo kem ngồi ở đầu giường, hai bàn tay áp nhẹ lên mặt khách đang nằm nhắm mắt trong phòng có cửa sổ vòm",
  },
  takeaways: [
    "Massage mặt trong spa giúp khách **thư giãn** và da trông tươi hơn. Đừng hứa làm thon mặt, xóa nếp nhăn hay chữa đau đầu.",
    "Hỏi trước khi chạm: sốt, cảm cúm, mụn rộp, mụn viêm có mủ, vết trầy, cháy nắng, hay vừa làm thủ thuật thẩm mỹ đều là lý do để hẹn lại hoặc tránh vùng đó.",
    "Đường vuốt trên mặt đi **lên trên và ra ngoài**. Không kéo da xuống, không chà qua lại.",
    "Quanh mắt chỉ dùng ngón áp út và không ấn lên mí. Ở cổ chỉ vuốt nhẹ hai bên, không ấn vào giữa cổ họng.",
    "Hỏi lực tay trước khi bắt đầu, sau vài động tác đầu và khi chuyển vùng. Khách im lặng chưa chắc là khách thấy dễ chịu.",
  ],
  intro: [
    "Massage mặt có tác dụng gì là câu nhiều khách hỏi trước khi đặt một buổi chăm sóc da. Câu trả lời trung thực khá ngắn: massage mặt giúp khách thư giãn và da trông tươi hơn. Nó không làm mặt thon gọn, không xóa nếp nhăn và không chữa bệnh. Để khách thật sự thả lỏng được, người làm phải nắm ba thứ là lực tay, hướng tay, nhịp tay, và trên hết là biết khi nào không nên làm.",
    "Bài viết này đi theo bài học “Massage mặt: hiểu đúng để khách thư giãn và an toàn” trong khóa Spa & chăm sóc da của VaraaAi Academy, là phần lý thuyết của chủ đề. Đọc xong, bạn biết khi nào phải hẹn lại, chọn dầu ra sao, mỗi động tác dùng để làm gì và vùng nào phải thật nhẹ tay. Một lượt massage hoàn chỉnh, từng bước, nằm ở bài [Cách massage mặt tại spa](lesson:spa-massage-mat).",
  ],
  sections: [
    {
      id: "massage-mat-de-lam-gi",
      title: "Massage mặt có tác dụng gì, và không làm được gì",
      blocks: [
        { p: "Massage mặt thường là phần khách nhớ nhất trong cả buổi chăm sóc da. Thước đo của nó rất đơn giản: massage tốt là khi khách thả lỏng được. Khách còn phải gồng lên là lực đã sai." },
        { p: "Có một chuyện rất hay gặp ở thợ mới. Muốn khách thấy mình làm kỹ, người thợ ấn thật mạnh, kéo da qua lại, ấn cả quanh mắt. Khách thấy đau nhưng ngại nên không nói. Hôm sau da đỏ, hơi rát, và khách không đặt lịch lại." },
        {
          table: {
            head: ["Khách hay hỏi", "Câu trả lời trung thực"],
            rows: [
              ["Massage mặt có tác dụng gì?", "Giúp thư giãn, da trông tươi hơn"],
              ["Có làm mặt thon gọn không?", "Không nên hứa điều này"],
              ["Có xóa được nếp nhăn không?", "Không nên hứa điều này"],
              ["Nhấn huyệt có chữa đau đầu không?", "Trong spa, ấn giữ là để thư giãn, không phải chữa bệnh"],
            ],
          },
        },
        { note: "Quy định và danh xưng của nghề massage khác nhau theo từng nước. Massage mặt trong spa là để thư giãn, không phải để chữa bệnh. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Giới hạn của massage trong spa" },
      ],
    },
    {
      id: "khi-nao-khong-massage",
      title: "Khi nào không nên massage mặt",
      blocks: [
        { p: "Trước khi chạm vào mặt khách, hãy hỏi. Phần lớn rắc rối sau một buổi massage đến từ những điều lẽ ra đã biết được qua vài câu hỏi ở đầu buổi." },
        {
          table: {
            head: ["Tình trạng của khách", "Việc cần làm"],
            rows: [
              ["Đang sốt, cảm cúm, thấy trong người không khỏe", "Hẹn lại buổi khác"],
              ["Mụn rộp, nhiễm trùng, mụn viêm sưng có mủ, vết trầy, cháy nắng", "Không massage trên vùng đó"],
              ["Mới lột da, laser, tiêm làm đẹp hoặc phẫu thuật vùng mặt", "Hỏi người đã làm cho khách bao lâu sau mới được massage, và làm theo lời dặn đó"],
              ["Có cục u lạ, chỗ sưng không rõ lý do", "Không làm, khuyên khách đi khám. Người làm spa không chẩn đoán"],
              ["Bệnh chưa ổn định: huyết áp cao chưa kiểm soát, bệnh tim, đang điều trị bệnh nặng", "Khuyên khách hỏi bác sĩ trước"],
              ["Da đang đỏ, nhạy cảm, mạch máu nhỏ hiện rõ", "Làm thật nhẹ, ít động tác, hoặc bỏ qua massage"],
            ],
          },
        },
        { img: { src: img("mun-rop-o-moi-khong-massage-mat-vung-do"), alt: "Cận cảnh nửa dưới gương mặt một phụ nữ, ở khóe môi trên có một cụm mụn nước nhỏ trên nền da hơi hồng", caption: "Mụn rộp ở môi: không massage trên vùng đó." } },
        { p: "Những dấu hiệu phải từ chối hoặc hẹn lại ở mọi dịch vụ được nói kỹ trong bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "dau-massage-mat",
      title: "Dầu massage mặt: đủ trơn, hỏi dị ứng, lấy bằng vòi bơm",
      blocks: [
        { p: "Dầu hay kem massage có một việc chính: cho tay lướt đi mà không kéo da. Ít quá thì tay kéo da theo. Nhiều quá thì trơn trượt, khó kiểm soát lực." },
        {
          ul: [
            "**Hỏi dị ứng.** Nhiều loại dầu làm từ hạt, như dầu hạnh nhân. Hỏi cả về mùi hương và tinh dầu.",
            "**Tinh dầu.** Chỉ dùng loại hãng đã pha sẵn cho da mặt, không tự pha.",
            "**Khách nhạy cảm.** Thử trước trên một vùng da nhỏ. Cách thử và lý do có trong bài [Dị ứng và hóa chất trong tiệm](lesson:di-ung-hoa-chat).",
            "**Lấy dầu.** Dùng vòi bơm, không chấm ngón tay vào chai.",
          ],
        },
        { img: { src: img("lay-dau-massage-mat-bang-voi-bom"), alt: "Chuyên viên ấn vòi bơm của chai thủy tinh màu hổ phách, một ít dầu vàng rơi vào lòng bàn tay, khách nằm trên giường phía sau", caption: "Lấy dầu bằng vòi bơm ra lòng bàn tay, không chấm tay vào chai." } },
      ],
    },
    {
      id: "massage-theo-lan-da",
      title: "Massage mặt theo từng làn da",
      blocks: [
        { p: "Cùng một bài massage không hợp với mọi khách. Lượng dầu, số động tác và độ dài buổi làm thay đổi theo làn da." },
        {
          table: {
            head: ["Làn da", "Cách massage"],
            rows: [
              ["Da khô, thiếu nước", "Dùng đủ dầu hay kem, động tác chậm và dài"],
              ["Da dầu, da có mụn", "Ít dầu, chọn loại hãng ghi là hợp với da dầu, bỏ qua những chỗ đang có mụn viêm"],
              ["Da nhạy cảm, hay đỏ", "Ít động tác, lực nhẹ nhất, không vỗ, làm ngắn hơn"],
              ["Da mỏng, khách lớn tuổi", "Càng không được kéo da"],
            ],
          },
        },
        { img: { src: img("massage-mat-cho-khach-lon-tuoi-da-mong"), alt: "Hai bàn tay áp nhẹ lên trán và má của một khách nữ lớn tuổi đeo băng đô trắng, đang nằm nghiêng mặt và nhắm mắt", caption: "Da mỏng của khách lớn tuổi: bàn tay áp và lướt, không kéo da." } },
      ],
    },
    {
      id: "dong-tac-va-huong-tay",
      title: "Các động tác massage mặt cơ bản và hướng tay",
      blocks: [
        { p: "Massage mặt chỉ có vài động tác cơ bản. Một lượt massage là bốn động tác dưới đây nối vào nhau, khác đi ở lực, hướng và nhịp tay." },
        {
          table: {
            head: ["Động tác", "Cách làm", "Dùng khi nào"],
            rows: [
              ["Vuốt", "Cả lòng bàn tay lướt dài, nhẹ", "Mở đầu, kết thúc và nối các động tác khác"],
              ["Xoa vòng", "Đầu ngón giữa và ngón áp út vẽ những vòng tròn nhỏ", "Trên má, dọc đường hàm"],
              ["Ấn giữ", "Ấn từ từ, giữ vài giây, nhả từ từ", "Thái dương, dưới gò má, giữa hai chân mày"],
              ["Vỗ nhẹ", "Đầu ngón tay chạm nhanh, nhẹ như mưa rơi", "Bỏ qua với da nhạy cảm"],
            ],
          },
        },
        { h3: "Hướng tay: lên trên và ra ngoài" },
        { p: "Trên mặt, các đường vuốt thường đi lên trên và ra ngoài: từ cằm lên tai, từ cánh mũi lên thái dương, từ chân mày lên chân tóc. Không kéo da xuống, không chà qua chà lại. Da mặt mỏng, kéo mạnh nhiều lần thì da đỏ và khó chịu." },
      ],
    },
    {
      id: "vung-mat-vung-co-an-giu",
      title: "Vùng mắt, vùng cổ và động tác ấn giữ (nhấn huyệt)",
      blocks: [
        { p: "Có hai vùng cần cẩn thận hơn mọi chỗ khác trên mặt." },
        {
          ul: [
            "**Vùng mắt.** Chỉ dùng ngón áp út, vì đó là ngón yếu nhất nên lực tự nhiên nhẹ nhất. Lướt theo xương quanh hốc mắt, không bao giờ ấn lên mí mắt.",
            "**Vùng cổ.** Chỉ vuốt nhẹ ở hai bên cổ, đi xuống về phía xương quai xanh. Không ấn vào giữa cổ họng và không ấn sâu vào hai bên cổ, vì phía trước và hai bên cổ có mạch máu và khí quản.",
          ],
        },
        { h3: "Ấn giữ là để thư giãn" },
        { p: "Ấn giữ thường làm ở thái dương, dưới gò má và giữa hai chân mày. Nhiều nơi gọi đây là nhấn huyệt. Trong spa, đó là động tác để thư giãn, không phải để chữa bệnh, nên đừng hứa với khách là chữa đau đầu hay chữa bệnh gì. Cách ấn luôn là ấn từ từ, giữ vài giây, nhả từ từ. Ấn rồi nhả đột ngột thì khách giật mình." },
        { img: { src: img("an-giu-thai-duong-khi-massage-mat"), alt: "Các đầu ngón tay của chuyên viên đặt nhẹ ở hai bên thái dương của khách nữ đeo băng đô trắng đang nhắm mắt, nhìn từ trên xuống", caption: "Ấn giữ ở thái dương: ấn từ từ, giữ vài giây, nhả từ từ." } },
      ],
    },
    {
      id: "luc-tay-nhip-tay-tu-the",
      title: "Lực tay, nhịp tay và tư thế của người làm",
      blocks: [
        { h3: "Hỏi lực tay ba lần" },
        { p: "Lực tay vừa với mỗi người mỗi khác. Hỏi khách trước khi bắt đầu, sau vài động tác đầu tiên, và khi chuyển sang vùng mới. Câu hỏi nên thật ngắn, kiểu “chị muốn nhẹ hơn hay mạnh hơn một chút”. Đồng thời nhìn khách: nhíu mày, nín thở, gồng vai là lực đang quá." },
        { img: { src: img("hoi-khach-ve-luc-tay-khi-massage-mat"), alt: "Chuyên viên cúi nhẹ về phía khách đang nằm mở mắt mỉm cười, hai bàn tay đặt trên vai khách, như đang hỏi về lực tay" } },
        { note: "Khách im lặng chưa chắc là khách thấy dễ chịu. Một câu hỏi ngắn sau vài động tác đầu giúp khách dám nói thật về lực tay. Còn khi khách muốn nằm yên, không nói chuyện, hãy tôn trọng điều đó.", kind: "tip", title: "Kinh nghiệm trong nghề" },
        { h3: "Nhịp chậm, và luôn giữ một tay trên khách" },
        { p: "Nhịp tay chậm, đều, liền mạch. Đã chạm vào khách rồi thì luôn giữ một tay trên khách khi chuyển động tác. Nhấc cả hai tay ra rồi đặt lại đột ngột, khách sẽ mất cảm giác thư giãn." },
        { h3: "Tư thế để làm được lâu dài" },
        { p: "Ngồi ghế ở đầu giường, chỉnh độ cao cho vừa, lưng thẳng, vai thả lỏng, cổ tay thẳng. Làm nhiều khách một ngày mà tư thế sai thì đau vai, đau cổ tay." },
        { img: { src: img("tu-the-ngoi-cua-nguoi-tho-massage-mat"), alt: "Chuyên viên ngồi thẳng lưng trên ghế thấp ở đầu giường spa, vai thả lỏng, hai tay đặt nhẹ lên má khách đang nằm", caption: "Lưng thẳng, vai thả, cổ tay thẳng, ghế chỉnh vừa tầm giường." } },
        { h3: "Vệ sinh và khi da khách đỏ rát" },
        { p: "Vệ sinh giống mọi dịch vụ khác: móng tay ngắn, tháo nhẫn và đồng hồ, rửa tay trước và sau mỗi khách, thay khăn, băng đô, ga giường cho từng khách. Chi tiết có trong bài [Rửa tay và găng tay](lesson:rua-tay-gang-tay). Nếu da khách đỏ rát lên trong lúc làm thì dừng, lau nhẹ, đắp khăn mát và ghi lại sản phẩm, như trong bài [Xử lý sự cố](lesson:xu-ly-su-co)." },
        { p: "Trong VaraaAi, bạn ghi vào ghi chú nội bộ của khách trong [sổ khách hàng](lesson:khach-hang) loại dầu đã dùng, lực tay khách thích và vùng cần tránh. Lần hẹn sau, người làm không phải hỏi lại từ đầu." },
      ],
    },
  ],
  faq: [
    {
      q: "Massage mặt có tác dụng gì?",
      a: "Massage mặt trong spa giúp khách thư giãn và da trông tươi hơn. Đó là một phần của buổi chăm sóc da, không phải cách chữa bệnh. Người làm không nên hứa với khách những kết quả như thon mặt, xóa nếp nhăn hay chữa đau đầu.",
    },
    {
      q: "Massage mặt có làm thon mặt, xóa nếp nhăn không?",
      a: "Không nên hứa với khách điều đó. Massage giúp thư giãn và da trông tươi hơn, chỉ vậy. Kéo da mạnh nhiều lần để mong mặt gọn hơn chỉ làm làn da mỏng của mặt đỏ và khó chịu.",
    },
    {
      q: "Khi nào không nên massage mặt?",
      a: "Khi khách đang sốt, cảm cúm hay không khỏe thì hẹn lại. Không massage trên vùng có mụn rộp, nhiễm trùng, mụn viêm có mủ, vết trầy hay cháy nắng. Có cục u lạ hoặc chỗ sưng không rõ lý do thì không làm và khuyên khách đi khám. Khách có bệnh chưa ổn định như huyết áp cao chưa kiểm soát hay bệnh tim nên hỏi bác sĩ trước.",
    },
    {
      q: "Mới tiêm làm đẹp, laser hoặc lột da thì bao lâu được massage mặt?",
      a: "Người làm spa không tự quyết con số này. Hãy hỏi người đã làm thủ thuật cho khách bao lâu sau mới được massage, tránh vùng đó và làm theo lời dặn của họ.",
    },
    {
      q: "Nhấn huyệt trên mặt có chữa được đau đầu không?",
      a: "Trong spa, ấn giữ ở thái dương, dưới gò má hay giữa hai chân mày là động tác để thư giãn, không phải để chữa bệnh. Người làm không hứa chữa đau đầu hay bệnh gì. Cách làm đúng là ấn từ từ, giữ vài giây rồi nhả từ từ.",
    },
    {
      q: "Massage quanh mắt và cổ thế nào cho an toàn?",
      a: "Quanh mắt chỉ dùng ngón áp út, lướt nhẹ theo xương quanh hốc mắt và không ấn lên mí mắt. Ở cổ chỉ vuốt nhẹ hai bên, đi xuống về phía xương quai xanh, không ấn vào giữa cổ họng và không ấn sâu hai bên cổ.",
    },
  ],
  related: ["spa-massage-mat", "spa-facial-hieu-dung", "spa-massage-body-hieu-dung", "khi-nao-khong-lam"],
};

export default article;
