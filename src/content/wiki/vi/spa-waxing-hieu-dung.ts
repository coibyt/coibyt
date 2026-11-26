import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-waxing-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "waxing-la-gi",
  lesson: "spa-waxing-hieu-dung",
  category: "spa",
  title: "Waxing là gì? Sáp mềm, sáp cứng, ai không nên wax lông và cách chăm da sau wax",
  metaTitle: "Waxing là gì? Sáp mềm, sáp cứng, ai không nên wax lông",
  metaDescription:
    "Waxing là gì, sáp mềm và sáp cứng khác nhau thế nào, lông dài bao nhiêu thì wax được, ai không nên wax, vì sao không giật thẳng lên và sau wax cần kiêng gì.",
  keyword: "waxing là gì",
  keywords: [
    "wax lông là gì",
    "sáp mềm và sáp cứng khác nhau thế nào",
    "lông dài bao nhiêu thì wax được",
    "khi nào không nên wax lông",
    "uống isotretinoin có wax lông được không",
    "sau khi wax lông nên kiêng gì",
    "lông mọc ngược sau khi wax",
  ],
  excerpt: "Waxing là tẩy lông bằng sáp. Làm vội thì dễ bỏng, trầy da, nổi đỏ; làm đúng thì khách ít đau và da sạch mịn. Bài này giải thích những thói quen nhỏ tạo ra khác biệt đó.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuyen-vien-thoa-sap-wax-long-chan-cho-khach"),
    alt: "Chuyên viên spa đeo găng đen dùng que gỗ thoa sáp lên cẳng chân khách đang nằm phủ khăn trắng, cạnh nồi sáp trên xe đẩy đá cẩm thạch",
  },
  takeaways: [
    "Sáp mềm dùng giấy, hợp vùng rộng như chân, tay. **Sáp cứng** không cần giấy, ít bám da, hợp nách, chân mày, môi trên.",
    "Trước mỗi khách, thử sáp lên cổ tay trong của mình, rồi một điểm nhỏ trên da khách. Quá nóng thì bỏng, quá nguội thì kéo da.",
    "Khách đang uống **isotretinoin** thì không wax. Da mới lột, mới laser, cháy nắng, trầy xước, mụn rộp, phát ban, tĩnh mạch giãn: không wax vùng đó.",
    "Sáp mềm thoa theo chiều lông mọc, giật ngược chiều lông mọc, sát và gần song song với da. Không giật thẳng lên.",
    "Không nhúng que hai lần: que đã chạm da khách không quay lại nồi sáp.",
  ],
  intro: [
    "Waxing là gì? Đó là tẩy lông bằng sáp: thoa sáp ấm lên da, để sáp ôm lấy sợi lông, rồi giật ra. Nhìn thì đơn giản, nhưng trong spa đây là dịch vụ dễ làm khách bị bỏng, trầy da hay nổi đỏ nhất nếu làm vội. Làm đúng thì khách ít đau, da sạch mịn, và khách quay lại.",
    "Bài viết này đi theo bài học “Waxing: hiểu đúng để khách ít đau, da an toàn” trong khóa Spa & chăm sóc da của VaraaAi Academy, là phần lý thuyết của chủ đề. Đọc xong, bạn biết chọn loại sáp cho từng vùng, biết khách nào không nên wax, hiểu vì sao hướng giật quan trọng và biết dặn khách điều gì sau wax. Thao tác từng bước trên cẳng chân, nách và chân mày nằm ở bài [Cách wax lông tại spa](lesson:spa-waxing). Bài này không nói về wax vùng kín.",
  ],
  sections: [
    {
      id: "sap-mem-va-sap-cung",
      title: "Sáp mềm và sáp cứng khác nhau thế nào",
      blocks: [
        { p: "Trong tiệm có hai loại sáp chính. Chúng khác nhau ở cách thoa, cách lấy ra, và vì thế khác nhau ở vùng da phù hợp." },
        {
          table: {
            head: ["Điểm so sánh", "Sáp mềm (sáp dùng giấy)", "Sáp cứng"],
            rows: [
              ["Cách thoa", "Một lớp thật mỏng", "Dày hơn"],
              ["Cách lấy ra", "Đặt miếng giấy lên rồi giật", "Không cần giấy: đợi sáp se lại rồi cầm mép mà giật"],
              ["Đặc điểm", "Nhanh", "Ôm lấy sợi lông, ít bám vào da hơn"],
              ["Hợp với", "Vùng rộng như chân, tay", "Vùng nhỏ, da mỏng: nách, chân mày, môi trên"],
            ],
          },
        },
        { img: { src: img("sap-mem-va-sap-cung-wax-long"), alt: "Hai nồi sáp đặt cạnh nhau trên mặt đá: bên trái là sáp mềm màu vàng mật ong kèm xấp giấy wax, bên phải là sáp cứng màu hồng kèm một miếng sáp đã se", caption: "Trái: sáp mềm, dùng với giấy wax. Phải: sáp cứng, tự se thành miếng để cầm mà giật." } },
        { p: "Mỗi hãng sáp một khác, nên nhiệt độ, thời gian và cách dùng luôn theo hướng dẫn của hãng." },
      ],
    },
    {
      id: "nhiet-do-sap",
      title: "Nhiệt độ sáp wax: chuyện an toàn số một",
      blocks: [
        { p: "Có hai tai nạn rất hay gặp, và cả hai đều bắt đầu từ nồi sáp. Tiệm đông khách, nồi sáp để quá nóng, người thợ không thử mà thoa ngay lên chân khách: khách giật mình, da đỏ rát một vệt. Hoặc ngược lại, sáp đã nguội, thợ giật chậm, lại giật thẳng lên: da bị kéo theo, hôm sau bầm và trầy." },
        { p: "Mỗi loại sáp có nhiệt độ làm việc riêng, ghi trong hướng dẫn của hãng. Đừng chỉ tin vào mắt. Trước mỗi khách:" },
        {
          ol: [
            "Lấy một chút sáp bằng que mới, thử lên cổ tay trong của chính mình.",
            "Thử một điểm nhỏ trên da khách.",
            "Hỏi khách có thấy nóng quá không.",
          ],
        },
        { img: { src: img("thu-nhiet-do-sap-wax-tren-co-tay"), alt: "Bàn tay đeo găng đen cầm que gỗ dính sáp vàng, chấm một chút sáp lên mặt trong cổ tay của tay kia, bên cạnh là nồi sáp đang ấm", caption: "Thử trên cổ tay trong của mình trước, rồi mới đến da khách." } },
        { p: "Sáp đúng độ thì ấm và chảy đều như mật ong. Quá nóng thì bỏng. Quá nguội thì sáp kéo da và làm khách đau." },
      ],
    },
    {
      id: "long-dai-bao-nhieu",
      title: "Lông dài bao nhiêu thì wax được, da cần chuẩn bị gì",
      blocks: [
        { p: "Lông phải đủ dài để sáp bám, thường khoảng nửa xăng ti mét, cỡ một hạt gạo." },
        {
          ul: [
            "**Ngắn quá** thì sáp không ôm được sợi lông. Khách mới cạo thì hẹn lại sau vài tuần.",
            "**Dài quá** thì tỉa bớt trước, cho đỡ đau.",
            "**Da phải sạch và khô:** không kem, không dầu, không mồ hôi. Lau bằng dung dịch trước wax, theo hướng dẫn của hãng.",
          ],
        },
      ],
    },
    {
      id: "ai-khong-nen-wax",
      title: "Ai không nên wax lông: thuốc đang dùng, tình trạng da và bệnh nền",
      blocks: [
        { p: "Trước khi wax, luôn hỏi về thuốc, kể cả với khách quen. Có loại thuốc làm da mỏng và yếu đến mức wax có thể làm tróc da." },
        {
          table: {
            head: ["Tình trạng", "Việc cần làm"],
            rows: [
              ["Đang uống thuốc trị mụn isotretinoin", "Không wax"],
              ["Mới ngừng isotretinoin", "Thường phải chờ khoảng sáu tháng. Để khách hỏi bác sĩ khi nào được wax lại"],
              ["Đang bôi kem retinoid hoặc axit tẩy da", "Không wax vùng đang bôi; theo hướng dẫn của hãng sáp và của bác sĩ"],
              ["Da mới lột, mới laser, cháy nắng, trầy xước, mụn rộp, phát ban", "Không wax vùng đó"],
              ["Tĩnh mạch giãn", "Không wax lên trên"],
              ["Tiểu đường, vấn đề tuần hoàn máu, da mỏng dễ bầm, thuốc chống đông máu", "Da lâu lành hơn: rất cẩn thận, khuyên khách hỏi bác sĩ trước"],
            ],
          },
        },
        { p: "Về isotretinoin, bài học dẫn [lời khuyên của NHS](https://www.nhs.uk/medicines/isotretinoin-capsules/common-questions-about-isotretinoin-capsules/): không wax trong thời gian dùng thuốc. Người làm spa không chẩn đoán. Khi phân vân thì không làm. Bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam) nói kỹ hơn về cách từ chối." },
        { img: { src: img("tu-van-khach-truoc-khi-wax-long"), alt: "Khách nữ tóc vàng mặc áo choàng kem ngồi trên mép giường spa, cầm một tuýp kem đưa cho chuyên viên ngồi đối diện xem", caption: "Hỏi khách đang uống thuốc gì, đang bôi gì, trước khi bật nồi sáp." } },
        { h3: "Thử sáp trước với khách lần đầu" },
        { p: "Khách wax lần đầu, da nhạy cảm hay từng bị dị ứng thì nên thử trước. Nhiều loại sáp có nhựa thông, là chất mà một số người bị dị ứng. Thử một miếng nhỏ ở chỗ kín đáo, thường là trước một ngày, hoặc theo hướng dẫn của hãng. Thử mà không đỏ cũng chưa phải là bảo đảm. Xem thêm bài [Dị ứng và hóa chất trong tiệm](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "huong-thoa-huong-giat",
      title: "Thoa theo chiều lông mọc, giật ngược chiều lông mọc",
      blocks: [
        { p: "Trong kỹ thuật wax, quan trọng nhất là hướng. Sáp mềm được thoa theo chiều lông mọc. Còn giật thì ngược chiều lông mọc: thật nhanh, dứt khoát, sát mặt da, gần như song song với da." },
        { img: { src: img("loi-giat-giay-wax-thang-len"), alt: "Chuyên viên kéo miếng giấy wax thẳng lên trên khỏi cẳng chân khách, tay kia giơ lên không giữ da, minh họa một lỗi kỹ thuật", caption: "Lỗi cần tránh: giật thẳng lên và không giữ căng da. Da bị kéo theo, dễ bầm, dễ trầy, lông dễ gãy." } },
        {
          ul: [
            "**Không giật thẳng lên.** Da bị kéo theo, dễ bầm, dễ trầy, và lông dễ gãy giữa chừng.",
            "**Tay kia luôn giữ căng da,** ngay sát miếng sáp. Da căng thì đỡ đau và không bị kéo theo.",
            "**Giật xong, ấn ngay lòng bàn tay** lên chỗ vừa wax trong vài giây. Khách đỡ rát hẳn.",
            "**Cùng một chỗ, sáp mềm không làm quá hai lần.** Còn sót vài sợi thì dùng nhíp, đừng thoa sáp lần nữa.",
            "**Ở nách,** lông mọc nhiều hướng, nên chia thành từng vùng nhỏ, mỗi vùng theo đúng hướng của nó.",
          ],
        },
      ],
    },
    {
      id: "ve-sinh-khi-wax",
      title: "Vệ sinh khi wax: không nhúng que hai lần",
      blocks: [
        { p: "Que đã chạm da khách thì không quay lại nồi sáp nữa. Mỗi lần lấy sáp là một que mới. Nếu không, nồi sáp thành nơi vi khuẩn đi từ khách này sang khách khác." },
        { img: { src: img("bo-que-da-dung-lay-que-moi-khi-wax"), alt: "Chuyên viên đeo găng đen thả que gỗ đã dính sáp vào thùng rác có nắp, tay kia rút một que mới từ hũ thủy tinh cạnh nồi sáp", caption: "Que đã dùng vào thùng rác có nắp; lần lấy sáp tiếp theo là một que mới." } },
        {
          ul: [
            "Sáp đã lấy ra thì không đổ lại vào nồi.",
            "Đeo găng, trải giấy lót giường mới, miếng giấy wax dùng một lần.",
            "Khách luôn được che kín, chỉ mở vùng đang làm.",
            "Vùng mặt và chân mày: dùng sáp cứng, lượng thật nhỏ, làm cẩn thận, cách xa mắt.",
          ],
        },
        { p: "Cách rửa tay và dùng găng có trong bài [Rửa tay và găng tay](lesson:rua-tay-gang-tay). Wax vùng kín là kỹ thuật riêng, cần được đào tạo riêng, và không nằm trong bài này." },
        { note: "Quy định về nghề làm đẹp khác nhau theo từng nước. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nước một khác" },
      ],
    },
    {
      id: "cham-da-sau-wax",
      title: "Sau khi wax lông: kiêng gì, lông mọc ngược và khi lỡ làm bỏng",
      blocks: [
        { p: "Sau wax, da hơi đỏ và nổi vài chấm nhỏ ở chân lông là bình thường, thường hết sau vài giờ." },
        { img: { src: img("da-do-nhe-cham-nho-sau-khi-wax-long"), alt: "Cận cảnh cẳng chân vừa wax của một phụ nữ nằm trên giường spa, da hồng nhẹ với những chấm đỏ nhỏ ở chân lông", caption: "Đỏ nhẹ và chấm nhỏ ở chân lông ngay sau wax là phản ứng bình thường." } },
        { h3: "Khoảng một ngày đầu" },
        { p: "Dặn khách tránh tắm nắng, xông hơi, tắm nước thật nóng và sản phẩm có hương thơm, kể cả lăn khử mùi sau khi wax nách. Nếu hãng sáp có lời dặn riêng thì làm theo hãng." },
        { h3: "Lông mọc ngược" },
        { p: "Đây là chuyện khách hay hỏi. Sau vài ngày, tẩy da chết thật nhẹ và dưỡng ẩm đều. Không nặn, không nhổ. Nếu chỗ đó sưng, đau, có mủ thì khuyên khách đi khám." },
        { h3: "Lỡ làm bỏng hoặc tróc da" },
        { p: "Bỏng do sáp: làm mát ngay dưới vòi nước mát, khoảng hai mươi phút. Đây cũng là cách [NHS hướng dẫn xử lý vết bỏng](https://www.nhs.uk/conditions/burns-and-scalds/treatment/), và được nói kỹ trong bài [Xử lý sự cố trong tiệm](lesson:xu-ly-su-co). Da bị tróc: dừng lại, không wax chỗ đó nữa, và ghi lại." },
        { img: { src: img("lam-mat-vet-bong-sap-duoi-voi-nuoc"), alt: "Bàn tay đeo găng đen đỡ cẳng tay của khách dưới vòi nước mát đang chảy trên bồn đá, mặt trong cổ tay khách có một vệt đỏ", caption: "Bỏng: làm mát dưới vòi nước mát khoảng hai mươi phút." } },
        { p: "Trong VaraaAi, bạn ghi vào ghi chú nội bộ của khách trong [sổ khách hàng](lesson:khach-hang) loại sáp đã dùng, vùng đã wax và da phản ứng thế nào, để lần sau ai làm cũng biết." },
      ],
    },
  ],
  faq: [
    {
      q: "Waxing là gì?",
      a: "Waxing, hay wax lông, là tẩy lông bằng sáp: thoa sáp ấm lên da theo chiều lông mọc rồi giật ra ngược chiều lông mọc. Trong tiệm có hai loại sáp chính là sáp mềm dùng với giấy và sáp cứng không cần giấy. Làm đúng thì khách ít đau và da sạch mịn.",
    },
    {
      q: "Sáp mềm và sáp cứng khác nhau thế nào?",
      a: "Sáp mềm thoa một lớp thật mỏng, đặt miếng giấy lên rồi giật; loại này nhanh, hợp vùng rộng như chân, tay. Sáp cứng thoa dày hơn, không cần giấy, đợi se lại rồi cầm mép mà giật. Sáp cứng ôm lấy sợi lông và ít bám da hơn, nên hợp vùng nhỏ, da mỏng như nách, chân mày, môi trên.",
    },
    {
      q: "Lông dài bao nhiêu thì wax được?",
      a: "Thường khoảng nửa xăng ti mét, cỡ một hạt gạo, để sáp bám được. Nếu vừa cạo thì nên chờ vài tuần cho lông mọc lại. Lông quá dài thì được tỉa bớt trước khi wax cho đỡ đau.",
    },
    {
      q: "Đang uống isotretinoin trị mụn có wax lông được không?",
      a: "Không. Thuốc làm da mỏng và yếu, wax có thể làm tróc da, và NHS khuyên không wax trong thời gian dùng thuốc. Sau khi ngừng thuốc thường phải chờ khoảng sáu tháng; hãy hỏi bác sĩ khi nào được wax lại.",
    },
    {
      q: "Sau khi wax lông nên kiêng gì?",
      a: "Trong khoảng một ngày đầu, tránh tắm nắng, xông hơi, tắm nước thật nóng và sản phẩm có hương thơm, kể cả lăn khử mùi sau khi wax nách. Da hơi đỏ, nổi vài chấm nhỏ ở chân lông là bình thường và thường hết sau vài giờ. Nếu hãng sáp có lời dặn riêng thì làm theo hãng.",
    },
    {
      q: "Wax xong bị lông mọc ngược thì làm sao?",
      a: "Sau vài ngày, tẩy da chết thật nhẹ và dưỡng ẩm đều. Không nặn và không nhổ. Nếu chỗ đó sưng, đau hoặc có mủ thì nên đi khám.",
    },
  ],
  related: ["spa-waxing", "khi-nao-khong-lam", "di-ung-hoa-chat", "xu-ly-su-co"],
};

export default article;
