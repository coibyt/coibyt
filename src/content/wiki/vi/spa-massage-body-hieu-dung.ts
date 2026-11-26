import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-body-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "massage-body-la-gi",
  lesson: "spa-massage-body-hieu-dung",
  category: "spa",
  title: "Massage body là gì? Massage cổ điển kiểu Thụy Điển, khi nào không nên làm và vùng cần tránh",
  metaTitle: "Massage body là gì? Khi nào không nên làm, vùng cần tránh",
  metaDescription:
    "Massage body là gì, massage cổ điển kiểu Thụy Điển gồm động tác nào, khi nào không nên làm, dấu hiệu nghi cục máu đông, khăn phủ, lực tay và vùng cần tránh.",
  keyword: "massage body là gì",
  keywords: [
    "massage Thụy Điển là gì",
    "massage cổ điển",
    "khi nào không nên massage body",
    "massage body có đau không",
    "massage có thải độc không",
    "massage khi bị giãn tĩnh mạch",
    "massage body có phải cởi đồ không",
  ],
  excerpt: "Massage body cổ điển là những đường vuốt dài, nhào, xoa và vỗ nhẹ để khách thư giãn. Người làm giỏi giữ khách an toàn, giữ sự riêng tư và chọn lực tay vừa đúng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuyen-vien-massage-lung-cho-khach-tai-spa"),
    alt: "Chuyên viên spa mặc áo kem đặt hai bàn tay lên lưng khách nữ đang nằm sấp, khăn trắng phủ từ eo xuống, trong phòng có cửa sổ vòm",
  },
  takeaways: [
    "Massage body cổ điển (kiểu Thụy Điển) gồm vuốt dài, nhào, xoa vòng và vỗ nhẹ, mục đích là **thư giãn**, không phải trị liệu chấn thương.",
    "Một bên bắp chân hay đùi sưng, đau, nóng, đỏ: **tuyệt đối không massage**, khuyên khách đi khám ngay trong ngày.",
    "Khăn phủ chỉ mở đúng vùng đang làm và phủ lại ngay khi xong. Ngực, vùng kín và vùng mông không bao giờ để lộ hay chạm.",
    "Ở tay và chân, đường vuốt dài đi về phía tim. Không ấn lên xương sống; tránh hõm sau gối, nách, phía trước cổ và bẹn.",
    "Lực tay dễ chịu, có thể hơi căng tức, không đau. Không có chuyện phải đau mới hiệu quả.",
  ],
  intro: [
    "Massage body là gì? Trong spa, đó thường là massage body cổ điển, còn gọi là massage kiểu Thụy Điển: những đường vuốt dài, nhào, xoa và vỗ nhẹ trên lưng, vai, chân, tay để khách thư giãn. Đôi tay khéo mới là một nửa. Nửa còn lại là giữ cho khách an toàn, giữ sự riêng tư cho khách và chọn lực tay vừa đúng.",
    "Bài viết này đi theo bài học “Massage body cơ bản: hiểu đúng để khách an tâm” trong khóa Spa & chăm sóc da của VaraaAi Academy, là phần lý thuyết của chủ đề. Đọc xong, bạn biết khi nào phải từ chối, phủ khăn thế nào, mỗi động tác dùng ở đâu và những vùng nào không được ấn. Một buổi massage làm từng bước nằm ở bài [Các bước massage body thư giãn](lesson:spa-massage-body).",
  ],
  sections: [
    {
      id: "massage-body-co-dien",
      title: "Massage body cổ điển (kiểu Thụy Điển) là gì",
      blocks: [
        { p: "Massage cổ điển dùng bốn nhóm động tác: vuốt dài, nhào, xoa vòng và vỗ nhẹ. Tùy liệu trình, một buổi kéo dài từ nửa tiếng đến một tiếng rưỡi. Bài này nói về massage thư giãn trong spa. Nó không dạy chữa chấn thương, và người làm spa không chẩn đoán bệnh." },
        { note: "Quy định và danh xưng của nghề massage khác nhau theo từng nước. Có nước, chỉ người có bằng mới được dùng danh xưng thợ massage hay làm massage trị liệu. Hãy tìm hiểu quy định nơi bạn làm việc. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nước một khác" },
        { p: "Vì mục đích là thư giãn, thước đo của một buổi massage là khách có thả lỏng được hay không. Điều đó phụ thuộc vào ba việc mà phần còn lại của bài sẽ đi qua: khách có an toàn không, có thấy được che chắn và tôn trọng không, và lực tay có vừa không." },
      ],
    },
    {
      id: "nghi-cuc-mau-dong",
      title: "Một bên bắp chân sưng, đau, nóng: tuyệt đối không massage",
      blocks: [
        { p: "Có một tình huống người làm massage phải nhận ra. Khách kêu đau bắp chân và nhờ bóp thật mạnh cho đỡ. Nhìn kỹ thì chỉ một bên bắp chân sưng, đỏ, sờ thấy nóng. Đó có thể là dấu hiệu của cục máu đông trong tĩnh mạch." },
        {
          ul: [
            "Một bên bắp chân hay đùi sưng, đau, nóng, đỏ hoặc sẫm màu: không massage, kể cả massage nhẹ.",
            "Khuyên khách đi khám ngay trong ngày.",
            "Khách khó thở hay đau ngực: gọi cấp cứu 112, hoặc số cấp cứu nơi bạn ở, ngay lập tức.",
          ],
        },
        { p: "Bạn không cần, và không được, kết luận khách bị gì. Việc của bạn là tả điều mình thấy và khuyên khách đi khám. Các dấu hiệu của cục máu đông ở chân được mô tả trên [trang của NHS về huyết khối tĩnh mạch sâu](https://www.nhs.uk/conditions/deep-vein-thrombosis-dvt/), là nguồn mà bài học dẫn." },
      ],
    },
    {
      id: "khi-nao-khong-massage-body",
      title: "Khi nào không nên massage body",
      blocks: [
        { p: "Ngoài tình huống trên, phiếu tư vấn và vài câu hỏi đầu buổi giúp bạn xếp khách vào một trong các nhóm sau." },
        {
          table: {
            head: ["Tình trạng của khách", "Việc cần làm"],
            rows: [
              ["Đang sốt, cảm cúm, mệt, hoặc đã uống rượu", "Hẹn lại"],
              ["Bệnh da có thể lây, nhiễm trùng, vết thương hở, cháy nắng", "Không làm trên vùng đó"],
              ["Chấn thương mới: bong gân, bầm tím, chỗ sưng", "Tránh hẳn vùng đó"],
              ["Mới phẫu thuật", "Chờ bác sĩ cho phép"],
              ["Tĩnh mạch nổi, giãn ở chân", "Không bao giờ ấn lên"],
              ["Bệnh chưa ổn định: huyết áp cao, bệnh tim, tiểu đường đã tê bì chân tay, đang điều trị ung thư", "Khuyên khách hỏi bác sĩ trước"],
              ["Đang uống thuốc chống đông máu", "Rất dễ bầm: lực thật nhẹ, và hỏi bác sĩ"],
              ["Mang thai", "Cần người được đào tạo riêng, với tư thế nằm riêng. Ở mức cơ bản thì không làm"],
            ],
          },
        },
        { img: { src: img("tinh-mach-gian-o-bap-chan-khong-an-len"), alt: "Cận cảnh mặt sau bắp chân của một phụ nữ nằm sấp trên giường spa, trên da nổi rõ các tĩnh mạch giãn màu xanh tím", caption: "Tĩnh mạch nổi, giãn ở chân: không bao giờ ấn lên." } },
        { img: { src: img("lung-chay-nang-khong-massage-body"), alt: "Khách nữ nằm sấp trên giường spa, lưng và vai đỏ hồng vì cháy nắng còn in vệt dây áo, chuyên viên đứng cạnh không chạm vào", caption: "Da cháy nắng: không massage trên vùng đó." } },
        { p: "Phiếu tư vấn còn hỏi về dầu. Nhiều dầu massage làm từ hạt, như hạnh nhân, nên cần hỏi khách có dị ứng hạt không, và hỏi cả về mùi hương, tinh dầu. Cách nhận ra những trường hợp phải từ chối ở mọi dịch vụ có trong bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "khan-phu-va-rieng-tu",
      title: "Khăn phủ và sự riêng tư của khách khi massage body",
      blocks: [
        { p: "Nhiều người ngại đặt massage body vì không biết mình sẽ phải cởi đồ đến đâu và được che thế nào. Cách phủ khăn đúng trả lời nỗi ngại đó, và bài học gọi đây là phần quan trọng nhất." },
        {
          ul: [
            "Khách thay đồ một mình. Người làm ra ngoài, và gõ cửa trước khi vào.",
            "Khách có thể giữ lại đồ lót.",
            "Khách nằm dưới khăn lớn. Chỉ mở đúng vùng đang làm, rồi phủ lại ngay khi xong.",
            "Mép khăn gấp gọn, chèn chắc, để khách yên tâm.",
            "Không bao giờ để lộ hay chạm vào ngực, vùng kín và vùng mông.",
            "Khi khách trở mình, giữ khăn che kín.",
          ],
        },
        { img: { src: img("gap-khan-phu-ngang-eo-khi-massage-lung"), alt: "Chuyên viên gấp mép khăn trắng lớn xuống ngang eo của khách đang nằm sấp, chỉ để lộ phần lưng, mặt khách úp vào gối mặt", caption: "Làm lưng thì chỉ mở lưng: mép khăn gấp ngang eo và chèn chắc hai bên." } },
        { p: "Phiếu tư vấn cũng hỏi có vùng nào khách không muốn được massage. Khách có quyền nói không với bất kỳ vùng nào, và dừng buổi massage bất cứ lúc nào." },
        { note: "Trước khi chuyển sang vùng mới, nói một câu ngắn, kiểu “bây giờ em làm chân nhé”. Khách không bị bất ngờ và luôn thấy mình được tôn trọng.", kind: "tip", title: "Kinh nghiệm trong nghề" },
        { img: { src: img("giu-khan-che-khi-khach-tro-minh"), alt: "Chuyên viên đứng cạnh giường, hai tay nâng một mép khăn trắng lớn lên để khách xoay người bên dưới mà vẫn được che kín", caption: "Trở mình: khăn được nâng lên vừa đủ, khách xoay người bên dưới." } },
      ],
    },
    {
      id: "dong-tac-huong-tay-vung-tranh",
      title: "Các động tác chính, hướng tay và vùng cần tránh",
      blocks: [
        {
          table: {
            head: ["Động tác", "Cách làm", "Dùng ở đâu, khi nào"],
            rows: [
              ["Vuốt dài", "Cả lòng bàn tay lướt dài", "Mở đầu, làm ấm cơ, nối các động tác"],
              ["Nhào", "Nâng nhẹ cơ lên giữa ngón cái và các ngón khác, như nhào bột", "Chỗ cơ dày như vai và bắp chân"],
              ["Xoa vòng", "Vòng tròn nhỏ bằng ngón cái", "Chỗ cơ căng"],
              ["Vỗ nhẹ", "Nhanh, bằng cạnh bàn tay hay lòng bàn tay khum", "Kết thúc một vùng"],
            ],
          },
        },
        { img: { src: img("vuot-dai-doc-lung-bang-long-ban-tay"), alt: "Chuyên viên vươn hai cánh tay, hai lòng bàn tay lướt dọc lưng của khách đang nằm sấp, khăn trắng phủ từ eo trở xuống", caption: "Vuốt dài bằng cả lòng bàn tay để mở đầu và làm ấm cơ." } },
        { h3: "Hướng tay và những chỗ không ấn" },
        {
          ul: [
            "**Tay và chân:** đường vuốt dài đi về phía tim, từ cổ chân lên gối, từ cổ tay lên khuỷu.",
            "**Xương sống:** không ấn lên, chỉ làm ở hai bên.",
            "**Thắt lưng, chỗ thận:** làm nhẹ.",
            "**Hõm sau đầu gối, nách, phía trước cổ, bẹn:** tránh, vì ở những chỗ đó mạch máu và dây thần kinh nằm nông.",
          ],
        },
      ],
    },
    {
      id: "luc-tay-va-tu-the",
      title: "Massage body có phải đau mới hiệu quả? Lực tay và tư thế người làm",
      blocks: [
        { p: "Massage nên dễ chịu. Khách có thể thấy hơi căng tức, nhưng không đau, và không có chuyện phải đau mới hiệu quả. Hỏi khách lúc bắt đầu, sau vài phút và khi chuyển vùng. Song song đó là nhìn: khách gồng người, nín thở, co chân là lực đang quá." },
        { p: "Gặp chỗ cơ căng, phản xạ của thợ mới là ấn mạnh hơn. Cách làm đúng thì ngược lại: cơ càng căng, càng phải đi chậm." },
        { h3: "Tư thế quyết định bạn làm nghề được bao lâu" },
        {
          ul: [
            "Chỉnh giường cho vừa để không phải cúi gập lưng.",
            "Đứng một chân trước, một chân sau, gối hơi chùng, lưng thẳng.",
            "Lực đến từ sức nặng cơ thể, đẩy từ chân, không gồng bằng vai và cổ tay.",
            "Muốn với xa thì bước chân lại gần, đừng rướn người.",
          ],
        },
        { img: { src: img("tu-the-dung-mot-chan-truoc-khi-massage-body"), alt: "Chuyên viên đứng một chân trước một chân sau, lưng thẳng, hai tay đặt trên lưng khách đang nằm sấp trên giường massage", caption: "Một chân trước, một chân sau, lưng thẳng: lực đi từ chân lên." } },
      ],
    },
    {
      id: "trinh-tu-va-sau-massage",
      title: "Trình tự một buổi, vệ sinh và lời dặn sau massage",
      blocks: [
        { p: "Trình tự thường gặp: khách nằm sấp, làm lưng, vai, cổ, rồi mặt sau hai chân. Khách trở mình, làm mặt trước chân, hai tay, rồi vai và cổ. Mỗi tiệm có trình tự riêng theo liệu trình của mình." },
        { p: "Vệ sinh gồm rửa tay trước và sau mỗi khách, thay ga, khăn, bọc gối mặt cho từng khách, và lau khử khuẩn giường. Xem thêm bài [Rửa tay và găng tay](lesson:rua-tay-gang-tay)." },
        { h3: "Nói thật với khách sau buổi massage" },
        { p: "Xong buổi, mời khách ngồi dậy từ từ, vì nằm lâu mà đứng dậy nhanh có thể choáng. Mời khách một ly nước. Đừng nói với khách rằng massage giúp thải độc. Hãy nói thật: massage giúp thư giãn, dễ chịu, và nếu lực mạnh thì hôm sau có thể hơi ê nhẹ." },
        { img: { src: img("moi-khach-ly-nuoc-sau-khi-massage-body"), alt: "Khách nữ mặc áo choàng trắng ngồi trên mép giường spa nhận ly nước từ tay chuyên viên đang mỉm cười" } },
        { p: "Trong VaraaAi, bạn ghi vào ghi chú nội bộ của khách trong [sổ khách hàng](lesson:khach-hang) lực tay khách thích, vùng cần tránh và loại dầu đã dùng. Khi [thêm dịch vụ massage](lesson:dich-vu) lên trang đặt lịch, hãy đặt thời lượng đúng với liệu trình của tiệm." },
      ],
    },
  ],
  faq: [
    {
      q: "Massage body là gì?",
      a: "Trong spa, massage body thường là massage cổ điển, còn gọi là massage kiểu Thụy Điển: những đường vuốt dài, nhào, xoa vòng và vỗ nhẹ trên lưng, vai, chân, tay để khách thư giãn. Một buổi kéo dài từ nửa tiếng đến một tiếng rưỡi tùy liệu trình. Đây là massage thư giãn, không phải trị liệu chấn thương.",
    },
    {
      q: "Massage body có phải đau mới hiệu quả không?",
      a: "Không. Massage nên dễ chịu, có thể hơi căng tức nhưng không đau. Khách gồng người, nín thở hay co chân là lực đang quá. Với chỗ cơ căng, người làm đi chậm lại chứ không ấn mạnh hơn.",
    },
    {
      q: "Khi nào không nên massage body?",
      a: "Hẹn lại khi đang sốt, cảm cúm, mệt hay đã uống rượu. Không làm trên vùng có bệnh da có thể lây, nhiễm trùng, vết thương hở, cháy nắng, chấn thương mới, và không ấn lên tĩnh mạch giãn. Mới phẫu thuật thì chờ bác sĩ cho phép; bệnh chưa ổn định hoặc đang uống thuốc chống đông máu thì hỏi bác sĩ trước.",
    },
    {
      q: "Bắp chân sưng, đau, nóng một bên có nên massage không?",
      a: "Tuyệt đối không. Một bên bắp chân hay đùi sưng, đau, nóng, đỏ hoặc sẫm màu có thể là dấu hiệu của cục máu đông trong tĩnh mạch. Cần đi khám ngay trong ngày. Nếu kèm khó thở hay đau ngực thì gọi 112 hoặc số cấp cứu nơi bạn ở.",
    },
    {
      q: "Massage body có phải cởi hết đồ không?",
      a: "Khách thay đồ một mình và có thể giữ lại đồ lót. Trong suốt buổi, khách nằm dưới khăn lớn; người làm chỉ mở đúng vùng đang massage rồi phủ lại ngay. Ngực, vùng kín và vùng mông không bao giờ để lộ hay chạm, và khách có quyền từ chối bất kỳ vùng nào.",
    },
    {
      q: "Massage có giúp thải độc không? Hôm sau bị ê người có sao không?",
      a: "Người làm spa không nên nói massage giúp thải độc. Massage giúp thư giãn và dễ chịu. Nếu lực mạnh, hôm sau có thể hơi ê nhẹ. Còn đau nhiều hay bầm tím thì nên báo lại cho tiệm.",
    },
  ],
  related: ["spa-massage-body", "spa-massage-mat-hieu-dung", "khi-nao-khong-lam", "xu-ly-su-co"],
};

export default article;
