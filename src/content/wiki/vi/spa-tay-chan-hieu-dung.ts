import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-tay-chan-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cham-soc-tay-chan-tai-spa",
  lesson: "spa-tay-chan-hieu-dung",
  category: "spa",
  title: "Chăm sóc tay chân tại spa gồm những gì? Ngâm, tẩy da chết, gót chân, paraffin và vệ sinh bồn ngâm",
  metaTitle: "Chăm sóc tay chân tại spa gồm những gì, cần lưu ý gì",
  metaDescription:
    "Chăm sóc tay chân tại spa gồm ngâm, tẩy da chết, làm mịn gót chân, massage, paraffin. Bài giải thích vệ sinh bồn ngâm, dấu hiệu không nên làm và khách tiểu đường.",
  keyword: "chăm sóc tay chân tại spa",
  keywords: [
    "spa tay chân là gì",
    "ủ paraffin tay chân có tác dụng gì",
    "ngâm chân bao lâu là đủ",
    "gót chân chai có nên bào không",
    "người tiểu đường có nên làm spa chân",
    "vệ sinh bồn ngâm chân",
    "tẩy da chết tay chân",
  ],
  excerpt: "Spa tay chân là ngâm, tẩy da chết, chăm da quanh móng, làm mịn gót, massage và paraffin, không sơn móng. Khách đến để nghỉ ngơi, còn người làm phải giữ cho bàn chân khách an toàn.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-ngam-chan-trong-buoi-cham-soc-tay-chan-tai-spa"),
    alt: "Khách nữ mặc áo choàng trắng ngồi ghế bành ngâm hai chân trong bồn sứ có lót túi, chuyên viên spa đeo găng đen ngồi ghế thấp bên cạnh trò chuyện",
  },
  takeaways: [
    "Chăm sóc tay chân kiểu spa là ngâm, tẩy da chết, chăm da quanh móng, làm mịn gót, massage, mặt nạ hay paraffin. **Không vẽ móng, không sơn gel.**",
    "Túi lót bồn không thay cho việc làm sạch: sau mỗi khách bỏ túi, cọ bồn bằng xà phòng và bàn chải, xả sạch, rồi mới khử khuẩn đủ thời gian.",
    "Nhìn kỹ bàn chân, bàn tay và kẽ ngón trước khi ngâm. Thấy dấu hiệu bất thường thì không làm vùng đó và khuyên khách đi khám.",
    "Khách **tiểu đường** hay tuần hoàn kém: nước chỉ ấm vừa, ngâm ngắn, không dao, không cắt da, không đắp paraffin nóng.",
    "Gót chân chai chỉ cần mịn, không lấy sạch. Paraffin lấy ra bát riêng, không nhúng tay chân khách vào nồi dùng chung.",
  ],
  intro: [
    "Chăm sóc tay chân tại spa không phải là làm móng. Ở đây không vẽ móng, không sơn gel. Một buổi gồm ngâm, tẩy da chết, chăm da quanh móng, làm mịn gót chân, massage, rồi đắp mặt nạ hay paraffin. Khách đến để nghỉ ngơi. Nhưng bàn chân cũng là nơi dễ lây nấm và nhiễm trùng nếu vệ sinh không kỹ, nên phần khách không nhìn thấy mới là phần quyết định.",
    "Bài viết này đi theo bài học “Chăm sóc tay chân kiểu spa: hiểu đúng để sạch và an toàn” trong khóa Spa & chăm sóc da của VaraaAi Academy, là phần lý thuyết của chủ đề. Đọc xong, bạn hiểu vì sao bồn ngâm phải được cọ rửa sau mỗi khách, khi nào không làm, làm gót chân đến đâu là đủ và dùng paraffin thế nào cho sạch. Thao tác từng bước nằm ở bài [Quy trình spa tay chân](lesson:spa-tay-chan).",
  ],
  sections: [
    {
      id: "spa-tay-chan-khac-lam-mong",
      title: "Spa tay chân là gì, khác làm móng ở đâu",
      blocks: [
        { p: "Làm móng kết thúc bằng một bộ móng sơn đẹp. Spa tay chân kết thúc bằng bàn tay, bàn chân sạch, mềm và một người khách đã được nghỉ. Nhịp làm vì thế khác hẳn: chậm, ấm và yên tĩnh. Khăn ấm, nước ấm, nhạc nhẹ, và ít nói chuyện nếu khách muốn nghỉ." },
        {
          table: {
            head: ["Phần việc", "Để làm gì"],
            rows: [
              ["Ngâm", "Làm sạch và làm mềm da"],
              ["Tẩy da chết", "Lấy lớp da khô bằng hạt mịn"],
              ["Chăm da quanh móng", "Làm sạch, gọn và dưỡng, không sơn"],
              ["Làm mịn gót chân", "Gót mịn hơn, vẫn giữ lớp chai bảo vệ"],
              ["Massage", "Giúp khách thư giãn"],
              ["Mặt nạ hoặc paraffin", "Phần thêm tùy liệu trình; paraffin ấm làm da mềm, giữ ẩm"],
            ],
          },
        },
        { p: "Làm chậm không có nghĩa là bỏ qua bước vệ sinh nào. Nếu khách muốn cắt da, cắt móng và sơn, đó là dịch vụ khác: xem bài [Các bước làm móng tay móng chân cơ bản](lesson:cham-soc-mong-co-ban)." },
      ],
    },
    {
      id: "ve-sinh-bon-ngam-chan",
      title: "Vệ sinh bồn ngâm chân: túi lót không thay cho việc làm sạch",
      blocks: [
        { p: "Một chuyện rất hay gặp: tiệm đông khách, bồn ngâm chân chỉ được xả nước, tráng qua, rồi đón khách tiếp theo. Nhìn thì sạch. Nhưng cặn da, cặn xà phòng bám lại ở thành bồn và trong đường ống của bồn sục, là chỗ vi khuẩn và nấm sống rất khỏe. Khách chỉ cần có một vết xước nhỏ ở chân." },
        { p: "Bài học lấy ví dụ từ [hướng dẫn vệ sinh của thành phố Helsinki](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) ở Phần Lan: bồn ngâm chân phải dùng túi lót, và dụng cụ làm chân luôn phải được tiệt trùng, ví dụ bằng nồi hấp, rồi cất riêng với các dụng cụ khác." },
        { img: { src: img("lot-tui-moi-vao-bon-ngam-chan"), alt: "Chuyên viên spa đeo găng đen quỳ trên gối, lồng một túi lót trong suốt mới vào bồn ngâm chân bằng sứ trắng đặt trên khăn", caption: "Mỗi khách một túi lót mới." } },
        { p: "Túi lót chỉ là lớp đầu tiên. Sau mỗi khách, bồn vẫn được xử lý theo đúng thứ tự:" },
        {
          ol: [
            "Bỏ túi lót.",
            "Làm sạch bồn bằng xà phòng và bàn chải.",
            "Xả sạch.",
            "Khử khuẩn, để đủ thời gian ghi trên chai.",
          ],
        },
        { img: { src: img("co-rua-bon-ngam-chan-sau-moi-khach"), alt: "Chuyên viên đeo găng đen quỳ bên bồn ngâm chân đã tháo túi lót, dùng bàn chải cọ lòng bồn, bên cạnh có bình xịt trắng", caption: "Cọ bằng xà phòng và bàn chải trước, khử khuẩn sau." } },
        { p: "Làm sạch phải đi trước, vì chất bẩn làm thuốc khử khuẩn kém tác dụng. Bồn có máy sục, có đường ống thì làm thêm theo hướng dẫn của nhà sản xuất, và kỹ hơn vào cuối ngày. Cách tiệt trùng dụng cụ kim loại có trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
        { note: "Quy tắc vệ sinh trong bài lấy ví dụ từ hướng dẫn của thành phố Helsinki. Quy định khác nhau theo từng nước, nên hãy tìm hiểu quy định nơi bạn làm việc. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "nhin-truoc-khi-ngam",
      title: "Nhìn kỹ bàn chân, bàn tay trước khi ngâm",
      blocks: [
        { p: "Trước khi chân khách chạm nước, nhìn kỹ bàn chân, bàn tay, cả kẽ ngón. Những dấu hiệu sau là lý do để không làm vùng đó, có khi phải hẹn lại, và khuyên khách đi khám:" },
        {
          ul: [
            "Da kẽ chân trắng, bong, nứt, ngứa.",
            "Móng dày, đổi màu, mủn ra.",
            "Mụn cóc.",
            "Vết thương hở; chỗ sưng đỏ, nóng, đau.",
          ],
        },
        { img: { src: img("kiem-tra-ke-ngon-chan-truoc-khi-ngam"), alt: "Bàn tay đeo găng đen nhẹ nhàng tách hai ngón chân của khách đang đặt chân trên khăn trắng để nhìn vùng da ở kẽ ngón", caption: "Kẽ ngón chân là chỗ dễ bị bỏ sót khi kiểm tra." } },
        { p: "Người làm spa không chẩn đoán, chỉ nói điều mình thấy. Còn một lý do nữa để không làm: dụng cụ và bồn dùng cho vùng da ấy có thể lây sang khách khác. Cách nói với khách có trong bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "khach-tieu-duong",
      title: "Khách tiểu đường hoặc tuần hoàn kém: cẩn thận gấp bội",
      blocks: [
        { p: "Với khách có bệnh tiểu đường hay tuần hoàn máu kém ở chân, bàn chân có thể giảm cảm giác. Nước nóng quá hay da bị xước, họ cũng không biết. Và một vết xước nhỏ cũng rất lâu lành. Vì vậy cách làm thay đổi:" },
        {
          ul: [
            "Nước chỉ ấm vừa, và bạn tự thử trước.",
            "Ngâm ngắn.",
            "Không dao, không cắt da.",
            "Không đắp paraffin nóng.",
            "Massage thật nhẹ nhàng.",
          ],
        },
        { note: "Chân có vết loét hay vết thương: không làm, và khuyên khách gặp bác sĩ hoặc chuyên viên chăm sóc bàn chân. Về việc tự chăm sóc bàn chân khi có bệnh tiểu đường, bài học dẫn [hướng dẫn của Diabetes UK](https://www.diabetes.org.uk/about-diabetes/complications/feet/taking-care-of-your-feet).", kind: "warn", title: "Khi nào không làm" },
      ],
    },
    {
      id: "ngam-tay-da-chet-da-quanh-mong",
      title: "Ngâm chân bao lâu, tẩy da chết và da quanh móng làm đến đâu",
      blocks: [
        {
          table: {
            head: ["Bước", "Cách làm", "Giới hạn"],
            rows: [
              ["Ngâm", "Nước ấm, không nóng, thử bằng cổ tay mình trước. Thường khoảng năm đến mười phút, theo liệu trình", "Ngâm quá lâu da mềm nhũn, rất dễ bị chà quá tay"],
              ["Muối ngâm, tinh dầu", "Loại dành cho chân", "Đúng liều của hãng"],
              ["Tẩy da chết", "Hạt mịn như đường hay muối mịn, xoa vòng nhẹ. Bàn chân kỹ hơn ở gót, bàn tay nhẹ hơn hẳn vì da mỏng", "Không tẩy trên vết xước, vết nứt hay da đang kích ứng"],
              ["Da quanh móng", "Thoa kem làm mềm rồi đẩy nhẹ", "Da sống quanh móng là hàng rào bảo vệ, không cắt"],
            ],
          },
        },
        { img: { src: img("thu-nuoc-ngam-chan-bang-co-tay"), alt: "Chuyên viên quỳ bên bồn ngâm chân lót túi, đưa mặt trong cổ tay xuống thử độ ấm của nước, hai bàn chân khách chờ trên khăn bên cạnh", caption: "Thử nước bằng cổ tay mình trước khi mời khách đặt chân vào." } },
        { p: "Mẩu da khô thừa quanh móng chỉ được cắt nếu bạn đã được đào tạo, bằng kềm đã tiệt trùng. Trong buổi spa tay chân, móng chỉ được làm sạch, gọn và dưỡng, không sơn." },
        { img: { src: img("tay-da-chet-mu-ban-tay-nhe-nhang"), alt: "Chuyên viên xoa nhẹ sản phẩm tẩy da chết trên mu bàn tay của khách đang nằm, bàn tay khách đặt trên chiếc khăn kem gấp gọn", caption: "Da tay mỏng hơn da chân nhiều, nên lực nhẹ hơn hẳn." } },
      ],
    },
    {
      id: "got-chan-chai",
      title: "Gót chân chai có nên bào không: làm mịn, không lấy sạch",
      blocks: [
        { p: "Với gót chân chai, mục tiêu của buổi làm là mịn, không phải lấy sạch. Lớp chai là lớp bảo vệ của bàn chân, lấy hết đi là lấy mất lớp bảo vệ đó." },
        {
          ul: [
            "Dùng bàn chà chân, chà nhẹ và đều tay.",
            "Dao bào, lưỡi dao: không dùng, trừ khi quy định nơi bạn làm và việc đào tạo cho phép. Ở nhiều nơi, đó là việc của chuyên viên chăm sóc bàn chân.",
            "Gót nứt sâu, chảy máu hay đau: khuyên khách đi khám.",
          ],
        },
      ],
    },
    {
      id: "massage-mat-na-paraffin",
      title: "Massage tay chân và ủ paraffin: thư giãn nhưng vẫn phải sạch",
      blocks: [
        { p: "Massage là phần khách nhớ nhất của buổi làm. Lực vừa phải, và hỏi khách. Đường vuốt dài đi từ ngón về cổ tay, cổ chân, lên bắp chân, về phía tim. Không ấn lên tĩnh mạch giãn. Ấn lòng bàn chân cho thư giãn thì được, nhưng đừng hứa chữa bệnh gì." },
        { h3: "Paraffin dùng thế nào cho sạch" },
        { p: "Mặt nạ và paraffin là phần thêm, tùy liệu trình. Paraffin ấm làm da mềm và giữ ẩm. Nhiệt độ theo hãng, luôn thử lên cổ tay mình trước, và chỉ dùng trên da lành lặn." },
        {
          ul: [
            "Không nhúng tay chân khách thẳng vào nồi dùng chung.",
            "Lấy paraffin ra bát riêng và quét bằng cọ, hoặc dùng loại đóng gói cho từng khách.",
            "Paraffin đã dùng thì bỏ, không đổ lại vào nồi.",
          ],
        },
        { img: { src: img("quet-paraffin-len-tay-bang-co-tu-bat-rieng"), alt: "Chuyên viên dùng cọ quét paraffin lên bàn tay khách trên bàn đá, cạnh đó là một bát sứ nhỏ đựng paraffin lấy riêng và nồi làm ấm phía sau", caption: "Paraffin lấy ra bát riêng và quét bằng cọ, không nhúng tay khách vào nồi." } },
        { p: "Lý do rất đơn giản: paraffin ấm không đủ nóng để diệt khuẩn. Dùng chung một nồi cho mọi bàn tay là đưa vi khuẩn từ khách này sang khách khác." },
        { h3: "Lời dặn và ghi chú" },
        { p: "Kết thúc bằng kem dưỡng, và dặn khách dưỡng ẩm tay chân mỗi ngày. Gót chân nứt nhiều hay móng chân mọc quặp thì nên gặp chuyên viên chăm sóc bàn chân. Trong VaraaAi, bạn ghi vào ghi chú nội bộ của khách trong [sổ khách hàng](lesson:khach-hang) da thế nào, đã làm gì và khách thích lực tay ra sao. Lần sau khách quay lại, xem ghi chú là biết gót chân đã đỡ chưa." },
      ],
    },
  ],
  faq: [
    {
      q: "Chăm sóc tay chân tại spa gồm những gì?",
      a: "Một buổi gồm ngâm, tẩy da chết, chăm da quanh móng, làm mịn gót chân, massage, và có thể thêm mặt nạ hay paraffin tùy liệu trình. Khác với làm móng, ở đây không vẽ móng và không sơn gel; móng chỉ được làm sạch, gọn và dưỡng.",
    },
    {
      q: "Ngâm chân ở spa bao lâu là đủ?",
      a: "Thường khoảng năm đến mười phút, theo liệu trình của tiệm, với nước ấm chứ không nóng. Ngâm quá lâu làm da mềm nhũn và rất dễ bị chà quá tay ở bước sau.",
    },
    {
      q: "Gót chân chai có nên bào bằng dao không?",
      a: "Mục tiêu khi làm gót chân là mịn, không phải lấy sạch, vì lớp chai bảo vệ bàn chân. Trong spa, gót được chà nhẹ bằng bàn chà chân. Dao bào chỉ dành cho người được đào tạo và được phép theo quy định nơi làm việc. Gót nứt sâu, chảy máu hay đau thì nên đi khám.",
    },
    {
      q: "Người bị tiểu đường có nên làm spa chân không?",
      a: "Cần rất cẩn thận, vì bàn chân có thể giảm cảm giác và vết xước lâu lành. Nước chỉ ấm vừa và được thử trước, ngâm ngắn, không dùng dao, không cắt da, không đắp paraffin nóng, massage thật nhẹ. Nếu chân có vết loét hay vết thương thì không làm, và nên gặp bác sĩ hoặc chuyên viên chăm sóc bàn chân.",
    },
    {
      q: "Ủ paraffin tay chân có tác dụng gì?",
      a: "Paraffin ấm làm da mềm và giữ ẩm. Nó chỉ được dùng trên da lành lặn, ở nhiệt độ theo hướng dẫn của hãng và đã được thử trên cổ tay người làm. Paraffin được lấy ra bát riêng rồi quét bằng cọ, hoặc dùng loại đóng gói cho từng khách, và bỏ đi sau khi dùng.",
    },
    {
      q: "Bồn ngâm chân đã lót túi thì có cần rửa sau mỗi khách không?",
      a: "Có. Túi lót không thay cho việc làm sạch. Sau mỗi khách, người làm bỏ túi, cọ bồn bằng xà phòng và bàn chải, xả sạch rồi khử khuẩn đủ thời gian ghi trên chai. Làm sạch đi trước vì chất bẩn làm thuốc khử khuẩn kém tác dụng.",
    },
  ],
  related: ["spa-tay-chan", "cham-soc-mong-co-ban-hieu-dung", "ve-sinh-dung-cu", "khi-nao-khong-lam"],
};

export default article;
