import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/xu-ly-su-co/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "so-cuu-trong-tiem-nail-mi-spa",
  lesson: "xu-ly-su-co",
  category: "safety",
  title: "Sơ cứu trong tiệm nail, mi, spa: xử lý chảy máu, hóa chất vào mắt, bỏng và khách xỉu",
  metaTitle: "Sơ cứu trong tiệm nail, mi, spa: chảy máu, bỏng, vào mắt",
  metaDescription:
    "Sơ cứu trong tiệm nail, mi, spa: làm gì trong phút đầu khi cắt da chảy máu, keo hay hóa chất bắn vào mắt, bỏng sáp wax, khách xỉu, và cách ghi biên bản sự cố.",
  keyword: "sơ cứu trong tiệm nail",
  keywords: [
    "cắt da chảy máu khi làm nail",
    "keo nối mi dính vào mắt phải làm sao",
    "bị bỏng sáp wax phải làm gì",
    "khách xỉu khi wax",
    "xử lý sự cố trong salon",
    "túi sơ cứu của tiệm gồm những gì",
    "bị kềm cắt da đâm vào tay",
  ],
  excerpt: "Phút đầu tiên khi có sự cố trong tiệm: vết cắt chảy máu, hóa chất vào mắt, bỏng, khách xỉu, thợ bị dụng cụ đâm. Kèm việc cần làm sau đó.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-lam-dep-mo-hop-so-cuu-trong-salon"),
    alt: "Nữ thợ làm đẹp tóc vàng mặc áo kem đứng ở quầy đá trắng, mở một hộp sơ cứu trắng có dấu thập xanh",
  },
  takeaways: [
    "Mọi sự cố bắt đầu bằng ba việc: **dừng tay**, **giữ bình tĩnh**, và gọi cấp cứu trước nếu nguy hiểm đến tính mạng (112 ở Liên minh châu Âu).",
    "Vết cắt chảy máu: đeo găng mới, ép gạc sạch thẳng lên vết cắt và giữ yên đến khi máu cầm.",
    "Hóa chất bắn vào mắt: rửa ngay bằng nước sạch chảy nhẹ, liên tục **ít nhất 20 phút**, rồi đưa khách đi khám cùng chai sản phẩm.",
    "Bỏng nhiệt: xả nước mát ít nhất 10 phút, tốt nhất 20 phút. Không chườm đá, không bôi kem, dầu hay kem đánh răng.",
    "Sau đó nói thật với khách, ghi biên bản sự cố ngay trong ngày và bổ sung lại túi sơ cứu.",
  ],
  intro: [
    "Sơ cứu trong tiệm nail, tiệm mi hay spa là thứ không ai muốn dùng tới, nhưng làm nghề lâu thì ai cũng gặp: một vết cắt chảy máu, một giọt hóa chất bắn vào mắt, một vị khách bỗng tái mặt rồi xỉu. Lúc đó không ai kịp mở sách ra đọc. Người xử lý tốt là người đã tập trước trong đầu mình sẽ làm gì trong phút đầu tiên.",
    "Bài viết này viết lại bài học “Xử lý sự cố: chảy máu, dị ứng, bỏng” trong khóa Vệ sinh & an toàn của VaraaAi Academy, theo từng loại sự cố, kèm những việc phải làm sau khi mọi thứ đã yên. Bài viết không thay cho một khóa học sơ cứu. Tiệm nào cũng nên có người đã học sơ cứu.",
  ],
  sections: [
    {
      id: "ba-viec-dau-tien",
      title: "Ba việc giống nhau trong mọi sự cố",
      blocks: [
        {
          ol: [
            "**Dừng tay.** Không cố làm cho xong móng đó, hàng mi đó.",
            "**Giữ bình tĩnh.** Khách nhìn vào mặt người thợ mà biết mình nên sợ hay không.",
            "**Gọi cấp cứu trước nếu nguy hiểm đến tính mạng.** Ở Liên minh châu Âu, số cấp cứu chung là 112.",
          ],
        },
        { note: "Khó thở, sưng môi hay sưng mặt, máu ép mãi không cầm, khách không tỉnh lại: đây là lúc gọi cấp cứu ngay, không chờ xem có đỡ không. Hướng dẫn sơ cứu và quy định về báo cáo sự cố khác nhau theo từng nước.", kind: "warn", title: "Khi nào gọi cấp cứu ngay" },
        { p: "Nên ghi sẵn ở quầy số cấp cứu và địa chỉ của tiệm, để ai cầm máy gọi cũng đọc được ngay mà không phải nhớ." },
      ],
    },
    {
      id: "cat-da-chay-mau",
      title: "Lỡ cắt vào da khách chảy máu khi làm nail",
      blocks: [
        { p: "Đây là sự cố hay gặp nhất, thường do kềm cắt da. Thứ tự là lo cho khách trước, đồ đạc sau." },
        {
          ol: [
            "Dừng lại và đeo găng mới.",
            "Lấy gạc sạch, ép thẳng lên vết cắt và giữ yên cho đến khi máu cầm. Đừng nhấc gạc lên xem liên tục.",
            "Rửa vết thương bằng nước sạch, thấm khô và băng lại.",
            "Dặn khách giữ vết thương sạch và khô. Những ngày sau nếu thấy sưng, đỏ, đau hơn thì đi khám.",
          ],
        },
        { img: { src: img("ep-gac-len-vet-cat-chay-mau-o-ngon-tay"), alt: "Thợ nail đeo găng đen ép một miếng gạc trắng gấp vuông lên cạnh đầu ngón tay của khách, bên cạnh là hộp sơ cứu đang mở", caption: "Ép gạc thẳng lên vết cắt và giữ yên." } },
        { p: "Ép mãi mà máu không cầm thì gọi cấp cứu." },
        { h3: "Sau đó mới đến đồ đạc" },
        {
          ul: [
            "Bề mặt dính máu luôn phải được khử khuẩn.",
            "Dụng cụ gây ra vết cắt không dùng tiếp. Đưa nó đi làm sạch và tiệt trùng theo quy trình trong bài [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu).",
            "Lưỡi dao và kim dùng một lần bỏ vào hộp đựng vật sắc nhọn.",
          ],
        },
        { img: { src: img("khu-khuan-mat-ban-va-hop-dung-vat-sac-nhon"), alt: "Bàn tay đeo găng đen lau mặt bàn đá bằng khăn khử khuẩn, bên cạnh là khay kềm đã dùng và hộp đựng vật sắc nhọn" } },
      ],
    },
    {
      id: "hoa-chat-vao-mat",
      title: "Keo nối mi, thuốc nhuộm, acetone bắn vào mắt phải làm sao",
      blocks: [
        { p: "Với keo, thuốc nhuộm, acetone hay dung dịch khử khuẩn bắn vào mắt, điều quan trọng nhất là rửa ngay và rửa lâu. Lau bằng bông khô rồi làm tiếp là cách xử lý sai." },
        {
          ol: [
            "Cho nước sạch, không nóng, chảy nhẹ qua con mắt đang mở, liên tục ít nhất 20 phút.",
            "Nếu khách đeo kính áp tròng, nhờ khách tháo ra nếu tháo được.",
            "Dặn khách đừng dụi mắt. Dụi làm tổn thương nặng thêm.",
            "Đưa khách đi khám ngay và mang theo chai sản phẩm để bác sĩ đọc nhãn.",
          ],
        },
        { img: { src: img("rua-mat-khi-hoa-chat-ban-vao-mat"), alt: "Khách nữ mặc áo choàng kem nghiêng đầu trên bồn rửa, nữ thợ đeo găng đen rót một dòng nước nhẹ qua mắt khách", caption: "Nước chảy nhẹ qua con mắt đang mở, đầu nghiêng để nước chảy ra ngoài." } },
        { note: "Với hóa chất mạnh, vừa rửa vừa gọi cấp cứu. Đừng đợi rửa xong mới gọi.", kind: "warn" },
        { h3: "Khách bị phản ứng với sản phẩm" },
        { p: "Khách thấy ngứa, rát, đỏ hoặc sưng trong lúc làm: dừng lại, lấy sản phẩm ra thật nhẹ rồi rửa bằng nhiều nước. Dấu hiệu nguy hiểm là khó thở, khàn tiếng, sưng môi, sưng mặt, choáng váng. Thấy vậy thì gọi cấp cứu ngay. Hỏi khách có mang theo bút tiêm adrenaline không, để khách ở tư thế dễ thở nhất, và ở bên khách, đừng để khách một mình. Nguyên nhân và cách phòng có trong bài [Dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "bong",
      title: "Bỏng sáp wax, bỏng hóa chất và móng nóng rát dưới đèn",
      blocks: [
        { p: "Trong tiệm làm đẹp, bỏng đến từ ba nguồn: sáp wax hoặc dụng cụ quá nóng, hóa chất như thuốc tẩy và thuốc uốn làm rát da đầu, và móng nóng rát lên dưới đèn hơ gel." },
        { h3: "Bỏng nhiệt: xả nước mát ngay" },
        { p: "Xả chỗ bỏng dưới vòi nước mát. Các hướng dẫn sơ cứu hiện nay nói ít nhất 10 phút, tốt nhất là 20 phút. Nước mát chảy liên tục lấy nhiệt ra khỏi da. Tháo nhẫn và vòng ở gần chỗ bỏng trước khi vùng đó sưng lên." },
        { img: { src: img("xa-nuoc-mat-len-vet-bong-sap-wax"), alt: "Bàn tay đeo găng đen đỡ cẳng tay khách dưới vòi nước mát, nước chảy qua một vết đỏ nhỏ ở mặt trong cổ tay" } },
        {
          table: {
            head: ["Nên làm", "Không làm"],
            rows: [
              ["Xả nước mát ít nhất 10 phút, tốt nhất 20 phút", "Chườm đá"],
              ["Tháo nhẫn, vòng gần chỗ bỏng trước khi sưng", "Bôi kem, dầu hay kem đánh răng"],
              ["Làm mát xong, che bằng màng bọc thực phẩm sạch, đặt nhẹ lên trên", "Chọc vỡ bọng nước, hoặc quấn chặt màng bọc quanh tay"],
            ],
          },
        },
        { img: { src: img("che-vet-bong-bang-mang-boc-thuc-pham"), alt: "Nữ thợ đeo găng đen đặt một tấm màng bọc thực phẩm trong suốt nằm lỏng trên cẳng tay khách đang kê trên khăn trắng", caption: "Màng bọc đặt nhẹ lên trên vết bỏng, không quấn vòng quanh tay." } },
        { h3: "Khi nào vết bỏng cần đi khám" },
        {
          ul: [
            "Chỗ bỏng phồng rộp và rộng hơn lòng bàn tay của khách.",
            "Bỏng sâu.",
            "Bỏng ở mặt hoặc ở khớp.",
            "Mọi vết bỏng do hóa chất.",
          ],
        },
        { h3: "Hóa chất dính trên da và nóng dưới đèn" },
        { p: "Hóa chất dính trên da thì xả nước thật nhiều, thật lâu, cởi bỏ khăn và áo đã thấm hóa chất, và đừng bôi thứ gì lên. Còn khi khách kêu nóng dưới đèn hơ gel, hãy để khách rút tay ra ngay. Cảm giác nóng rát đó là dấu hiệu lớp gel quá dày hoặc móng đã mỏng." },
      ],
    },
    {
      id: "khach-xiu",
      title: "Khách xỉu khi wax hoặc khi đứng dậy nhanh",
      blocks: [
        { p: "Xỉu hay gặp khi wax, khi khách nằm lâu rồi đứng dậy nhanh, hoặc khi khách sợ máu. Thường có dấu hiệu báo trước: khách nói chóng mặt, mặt tái đi, vã mồ hôi." },
        {
          ol: [
            "Cho khách nằm xuống ngay, trước khi ngã.",
            "Kê hai chân khách lên cao.",
            "Nới cổ áo và mở cửa cho thoáng.",
            "Khi khách tỉnh, để khách nằm nghỉ thêm rồi ngồi dậy thật từ từ.",
          ],
        },
        { img: { src: img("khach-xiu-nam-ke-cao-hai-chan"), alt: "Khách nữ nằm ngửa trên giường spa phẳng, hai chân kê cao trên hai chiếc gối, nữ thợ mặc áo kem đứng cạnh, cửa sổ mở" } },
        { p: "Thường chưa đầy một phút là khách tỉnh lại. Nếu khách không tỉnh lại sau một phút, thở không bình thường, co giật hay đau ngực thì gọi cấp cứu." },
      ],
    },
    {
      id: "tho-bi-dung-cu-dam",
      title: "Khi chính bạn bị dụng cụ đã dùng cho khách đâm vào tay",
      blocks: [
        { p: "Một vết đâm rất nhỏ từ cây kềm vừa cắt da cho khách không phải chuyện nên tặc lưỡi cho qua. Có những bệnh lây qua đường máu, và việc dự phòng chỉ có tác dụng khi bắt đầu sớm." },
        {
          ol: [
            "Để máu chảy ra nhẹ nhàng dưới vòi nước. Đừng nặn mạnh và đừng mút vết thương.",
            "Rửa bằng xà phòng và thật nhiều nước, rồi băng lại.",
            "Báo ngay cho chủ tiệm.",
            "Liên hệ bác sĩ hoặc y tế lao động ngay trong ngày.",
          ],
        },
        { p: "Xịt cồn rồi coi như xong là cách làm sai. Vết thương ở tay thợ còn liên quan đến việc có nên làm tiếp cho khách hay không, xem bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "sau-phut-dau-tien",
      title: "Sau phút đầu tiên: nói thật, ghi biên bản, bổ sung túi sơ cứu",
      blocks: [
        { h3: "Nói thật với khách" },
        { p: "Kể cho khách chuyện gì đã xảy ra, bạn đã làm gì và khách nên theo dõi điều gì. Xin lỗi chân thành, không đổ lỗi, không giấu." },
        { h3: "Ghi biên bản sự cố ngay trong ngày" },
        { p: "Biên bản gồm: ngày giờ, ai làm, chuyện gì xảy ra, sản phẩm nào và số lô, đã xử lý ra sao, đã khuyên khách điều gì. Sau đó báo cho chủ tiệm. Chủ tiệm xem có phải báo cho bảo hiểm hay cơ quan nào không, theo quy định ở nơi mình làm." },
        { img: { src: img("ghi-bien-ban-su-co-trong-ngay"), alt: "Một bàn tay cầm bút vàng viết vào cuốn sổ kem mở trên bàn đá, bên cạnh là hộp sơ cứu nhỏ màu trắng" } },
        { p: "Trong VaraaAi, bạn ghi vào ô “Ghi chú nội bộ” của hồ sơ khách rằng đã có sự cố và đã khuyên khách điều gì; ô này chỉ salon nhìn thấy, xem bài [Sổ khách hàng](lesson:khach-hang). Biên bản đầy đủ thì giữ ở nơi chủ tiệm quy định." },
        { h3: "Túi sơ cứu của tiệm gồm những gì" },
        {
          ul: [
            "Băng dán đủ cỡ, gạc vô trùng, băng cuộn, băng dính y tế.",
            "Miếng che mắt.",
            "Găng dùng một lần và kéo.",
            "Nước muối để rửa mắt và rửa vết thương.",
            "Một tờ hướng dẫn sơ cứu.",
          ],
        },
        { img: { src: img("tui-so-cuu-cua-tiem-lam-dep"), alt: "Túi sơ cứu bày trên mặt đá: băng dán nhiều cỡ, gạc, băng cuộn, băng dính, miếng che mắt, kéo, găng và ống nước muối" } },
        { p: "Không để thuốc uống trong túi. Đặt túi ở chỗ ai trong tiệm cũng biết, kiểm tra đều đặn xem thứ gì đã hết hay đã quá hạn, và bổ sung ngay sau mỗi lần dùng." },
        { h3: "Phần lớn sự cố tránh được từ trước" },
        {
          ul: [
            "Thử nhiệt độ sáp lên cổ tay mình trước khi thoa cho khách.",
            "Che mắt khách thật kỹ khi dùng hóa chất ở gần mặt.",
            "Đừng làm vội, và đừng vừa làm vừa nhìn điện thoại.",
          ],
        },
        { img: { src: img("thu-nhiet-do-sap-wax-len-co-tay"), alt: "Bàn tay đeo găng đen cầm que gỗ dính sáp vàng, chấm thử lên mặt trong cổ tay trần bên cạnh nồi sáp đang ấm", caption: "Thử sáp lên cổ tay mình trước mỗi lần thoa cho khách." } },
        { p: "Hãy đi học một khóa sơ cứu và ôn lại sau vài năm. Kỹ thuật wax an toàn được hướng dẫn riêng trong bài [Waxing](lesson:spa-waxing)." },
      ],
    },
  ],
  faq: [
    {
      q: "Cắt da cho khách bị chảy máu thì xử lý thế nào?",
      a: "Dừng lại, đeo găng mới, ép gạc sạch thẳng lên vết cắt và giữ yên cho đến khi máu cầm. Sau đó rửa bằng nước sạch, thấm khô và băng lại. Bề mặt dính máu phải khử khuẩn, còn dụng cụ đó phải được làm sạch và tiệt trùng trước khi dùng lại. Ép mãi mà máu không cầm thì gọi cấp cứu.",
    },
    {
      q: "Keo nối mi dính vào mắt phải làm sao?",
      a: "Rửa ngay bằng nước sạch, không nóng, chảy nhẹ qua con mắt đang mở, liên tục ít nhất 20 phút. Không dụi mắt, tháo kính áp tròng nếu tháo được. Sau đó đi khám ngay và mang theo chai keo để bác sĩ đọc nhãn.",
    },
    {
      q: "Bị bỏng sáp wax có nên chườm đá hay bôi kem đánh răng không?",
      a: "Không. Hãy xả chỗ bỏng dưới vòi nước mát ít nhất 10 phút, tốt nhất 20 phút. Không chườm đá, không bôi kem, dầu hay kem đánh răng, không chọc vỡ bọng nước. Làm mát xong thì che bằng màng bọc thực phẩm sạch đặt nhẹ lên trên.",
    },
    {
      q: "Khách kêu nóng rát khi hơ gel trong đèn thì làm gì?",
      a: "Để khách rút tay ra khỏi đèn ngay. Cảm giác nóng rát dưới đèn là dấu hiệu lớp gel quá dày hoặc móng đã mỏng, nên lần sau cần sơn lớp mỏng hơn.",
    },
    {
      q: "Khách bị xỉu trong tiệm thì sơ cứu ra sao?",
      a: "Cho khách nằm xuống ngay, kê hai chân lên cao, nới cổ áo và mở cửa cho thoáng. Thường chưa đầy một phút khách tỉnh lại; để khách nghỉ rồi ngồi dậy thật từ từ. Nếu khách không tỉnh lại sau một phút, thở không bình thường, co giật hay đau ngực thì gọi cấp cứu.",
    },
    {
      q: "Thợ bị kềm cắt da của khách đâm vào tay có cần đi khám không?",
      a: "Có. Để máu chảy ra nhẹ nhàng dưới vòi nước, không nặn mạnh, không mút, rồi rửa bằng xà phòng và nhiều nước và băng lại. Báo chủ tiệm và liên hệ bác sĩ hoặc y tế lao động ngay trong ngày, vì việc dự phòng bệnh lây qua đường máu chỉ có tác dụng khi làm sớm.",
    },
  ],
  related: ["di-ung-hoa-chat", "khi-nao-khong-lam", "ve-sinh-dung-cu", "ve-sinh-tiem"],
};

export default article;
