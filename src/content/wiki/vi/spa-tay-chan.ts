import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-tay-chan/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "quy-trinh-spa-tay-chan",
  lesson: "spa-tay-chan",
  category: "spa",
  title: "Quy trình spa tay chân: 14 bước ngâm, tẩy da chết, massage và ủ paraffin",
  metaTitle: "Quy trình spa tay chân: 14 bước, có ủ paraffin tay",
  metaDescription:
    "Quy trình spa tay chân từng bước: chuẩn bị bồn lót túi, ngâm chân, tẩy da chết, da quanh móng, chà gót, massage chân, mặt nạ, massage tay, ủ paraffin và dọn dẹp.",
  keyword: "quy trình spa tay chân",
  keywords: [
    "các bước chăm sóc tay chân tại spa",
    "cách ủ paraffin tay",
    "cách massage chân tại spa",
    "cách massage tay",
    "cách chà gót chân",
    "ngâm chân bao nhiêu phút",
  ],
  excerpt: "Một lượt chăm sóc chân kiểu spa, rồi chăm sóc tay với paraffin, làm từng bước và không sơn móng. Kèm các con số cần nhớ và sáu lỗi hay gặp.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuyen-vien-cham-soc-tay-cho-khach-ben-cua-so"),
    alt: "Chuyên viên spa ngồi bên bàn nhỏ cạnh cửa sổ vòm, đỡ bàn tay của khách nữ mặc áo choàng trắng đang ngồi ghế bành, chân trần đặt trên sàn đá",
  },
  takeaways: [
    "Cả buổi thường khoảng **45 phút đến một tiếng**, tùy liệu trình, và không sơn móng.",
    "Bồn ngâm lót túi mới; dụng cụ kim loại cho chân còn trong túi tiệt trùng, mở ra trước mặt khách; miếng chà, dũa giấy mỗi khách một bộ mới.",
    "Ngâm chân khoảng năm đến mười phút trong nước ấm đã thử bằng cổ tay mình. Lau khô cả kẽ ngón.",
    "Chà gót: **chà ít mà sờ nhiều**. Mịn là đủ, không dùng dao bào, khách thấy rát là đã quá tay.",
    "Paraffin lấy ra bát riêng, quét bằng cọ, ủ khoảng mười phút theo hãng. Khách thấy nóng quá thì dừng ngay và bóc ra.",
  ],
  intro: [
    "Quy trình spa tay chân trong bài này gồm hai nửa: một lượt chăm sóc chân, rồi chăm sóc tay với paraffin. Không có bước sơn móng nào. Cả buổi thường khoảng bốn mươi lăm phút đến một tiếng, tùy liệu trình của tiệm, và hai nửa lồng vào nhau: trong lúc chân khách đang ủ mặt nạ, bạn chuyển sang làm tay.",
    "Bài viết này đi theo bài học “Chăm sóc tay chân kiểu spa: thực hành từng bước” trong khóa Spa & chăm sóc da của VaraaAi Academy. Đọc xong, bạn làm được trọn buổi theo mười bốn bước, từ lúc lót túi vào bồn đến lúc cọ bồn sau khi khách về. Thời gian và sản phẩm theo liệu trình của tiệm và hướng dẫn của hãng.",
  ],
  sections: [
    {
      id: "truoc-khi-khach-dat-chan-vao-bon",
      title: "Trước khi khách đặt chân vào bồn",
      blocks: [
        { p: "Ba việc phải xong trước khi pha nước: bồn đã lót túi mới, dụng cụ đã sẵn, và bạn đã hỏi khách về sức khỏe. Câu hỏi về tiểu đường và tuần hoàn máu quyết định cả buổi làm, vì với những khách này nước phải ấm vừa hơn, ngâm ngắn hơn và không đắp paraffin nóng." },
        { p: "Hỏi thêm hai điều nhỏ giúp buổi làm dễ chịu hơn: khách thích mùi hương nào, và khách muốn trò chuyện hay muốn nghỉ ngơi." },
        { note: "Dụng cụ kim loại cho chân nên được mở khỏi túi tiệt trùng ngay trước mặt khách. Khách nhìn thấy là yên tâm, bạn không cần giải thích gì thêm.", kind: "tip", title: "Kinh nghiệm trong nghề" },
        { p: "Vì sao bồn lót túi vẫn phải cọ rửa, dấu hiệu nào ở bàn chân thì không làm, và cách chăm sóc khách tiểu đường được giải thích trong bài [Chăm sóc tay chân tại spa gồm những gì](lesson:spa-tay-chan-hieu-dung)." },
      ],
    },
    {
      id: "con-so-can-nho",
      title: "Những con số cần nhớ: ngâm chân bao nhiêu phút, ủ paraffin bao lâu",
      blocks: [
        {
          table: {
            head: ["Việc", "Thời gian", "Ghi chú"],
            rows: [
              ["Cả buổi", "Khoảng 45 phút đến một tiếng", "Tùy liệu trình của tiệm"],
              ["Ngâm chân", "Khoảng 5–10 phút", "Theo liệu trình; nước ấm, không nóng"],
              ["Mặt nạ chân", "Khoảng 10 phút", "Theo hướng dẫn của hãng"],
              ["Ngâm đầu ngón tay", "Vài phút", "Bát nước ấm"],
              ["Ủ paraffin tay", "Khoảng 10 phút", "Theo hướng dẫn của hãng; nóng quá thì dừng ngay"],
            ],
          },
        },
        { p: "Các con số này là mức thường gặp trong bài học. Con số đúng cho tiệm bạn nằm trong liệu trình của tiệm và trên nhãn sản phẩm." },
      ],
    },
    {
      id: "loi-hay-gap",
      title: "Sáu lỗi hay gặp khi làm spa tay chân",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Làm đúng"],
            rows: [
              ["Nước ngâm quá nóng", "Nước ấm, thử bằng cổ tay mình trước"],
              ["Ngâm quá lâu", "Khoảng năm đến mười phút, theo liệu trình"],
              ["Chà gót đến khi khách thấy rát", "Chà vài đường nhẹ, sờ thử, mịn là dừng"],
              ["Cắt vào da sống quanh móng", "Chỉ đẩy nhẹ sau khi thoa kem làm mềm"],
              ["Dùng lại miếng chà của khách trước", "Miếng chà, dũa giấy dùng một lần: mỗi khách một bộ mới"],
              ["Quên lau khô kẽ chân", "Lau khô cả kẽ ngón, vì kẽ chân ẩm là chỗ nấm rất thích"],
            ],
          },
        },
        { p: "Tránh được sáu lỗi này, khách sẽ thấy sạch sẽ và an tâm." },
      ],
    },
    {
      id: "don-bon-va-dung-cu",
      title: "Dọn bồn ngâm và dụng cụ sau mỗi khách, và cuối ngày",
      blocks: [
        { p: "Thứ tự dọn bồn không đổi: bỏ túi lót, làm sạch bằng xà phòng và bàn chải, xả sạch, rồi khử khuẩn đủ thời gian ghi trên chai. Dụng cụ kim loại được làm sạch rồi tiệt trùng, theo quy trình trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu). Cuối ngày, làm sạch kỹ hơn, nhất là bồn có máy sục, theo hướng dẫn của nhà sản xuất." },
        { note: "Quy tắc vệ sinh trong bài lấy ví dụ từ [hướng dẫn của thành phố Helsinki](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf), theo đó dụng cụ làm chân luôn phải được tiệt trùng và cất riêng. Quy định khác nhau theo từng nước. Không dùng dao bào nếu chưa được đào tạo và được phép. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "loi-dan-va-ghi-chu",
      title: "Lời dặn cho khách và ghi chú cho lần sau",
      blocks: [
        {
          ul: [
            "Dưỡng ẩm tay chân mỗi ngày.",
            "Gót chân nứt nẻ, rất đau, hoặc móng mọc quặp: nên gặp chuyên viên chăm sóc bàn chân.",
          ],
        },
        { p: "Trong VaraaAi, bạn ghi vào ghi chú nội bộ của khách trong [sổ khách hàng](lesson:khach-hang) da thế nào, lực tay khách thích và sản phẩm đã dùng. Khi [thêm dịch vụ](lesson:dich-vu) spa tay chân lên trang đặt lịch, hãy đặt thời lượng đủ cho cả phần cọ bồn sau khi khách về." },
      ],
    },
  ],
  howTo: {
    title: "Các bước chăm sóc tay chân tại spa",
    id: "cac-buoc-spa-tay-chan",
    after: "truoc-khi-khach-dat-chan-vao-bon",
    lead: "Mười bốn bước dưới đây theo đúng thứ tự trong video bài học: làm chân trước, chuyển sang tay khi chân đang ủ mặt nạ, rồi quay lại hoàn thiện cả hai.",
    supplies: [
      "Bồn ngâm chân và túi lót dùng một lần; bát nhỏ để ngâm đầu ngón tay",
      "Dụng cụ kim loại cho chân đã tiệt trùng, còn trong túi kín",
      "Miếng chà, dũa giấy dùng một lần và bàn chà chân",
      "Sản phẩm tẩy da chết hạt mịn, kem làm mềm da quanh móng, kem massage, kem dưỡng",
      "Mặt nạ chân, màng bọc mỏng và khăn ấm, nếu liệu trình có",
      "Paraffin, bát riêng, cọ, túi mỏng và bao tay bông",
      "Găng tay, khăn sạch, gối kê",
    ],
    steps: [
      {
        name: "Chuẩn bị ghế, bồn và dụng cụ",
        text: "Lau khử khuẩn ghế, bàn và gối kê, rồi lót túi mới vào bồn ngâm chân. Dụng cụ kim loại cho chân phải đã tiệt trùng, còn nằm trong túi kín, và được mở ra trước mặt khách. Miếng chà, dũa giấy là đồ dùng một lần: mỗi khách một bộ mới.",
      },
      {
        name: "Hỏi khách và pha nước",
        text: "Hỏi khách có bệnh tiểu đường, tuần hoàn máu kém, dị ứng hay vết thương nào không; hỏi luôn khách thích mùi hương nào, muốn trò chuyện hay muốn nghỉ. Pha nước ấm vào bồn đã lót túi và thử bằng cổ tay mình: ấm, dễ chịu, không nóng. Với khách tiểu đường càng phải cẩn thận.",
      },
      {
        name: "Nhìn bàn chân, rồi ngâm",
        text: "Rửa tay, đeo găng. Nhìn kỹ bàn chân, cả lòng bàn chân và kẽ ngón. Kẽ chân bong, nứt, móng dày đổi màu hay có vết thương thì không làm vùng đó và khuyên khách đi khám. Mọi thứ ổn thì mời khách đặt chân vào bồn, ngâm khoảng năm đến mười phút theo liệu trình.",
        image: { src: img("ngam-chan-trong-bon-lot-tui-nuoc-am"), alt: "Hai bàn chân của khách ngâm trong bồn sứ trắng có lót túi trong suốt, nước ấm thả vài cánh hoa trắng, bồn đặt trên khăn trắng", caption: "Bồn lót túi, nước ấm, khoảng năm đến mười phút." },
      },
      {
        name: "Tẩy da chết bàn chân",
        text: "Nhấc một chân ra, đặt lên khăn. Xoa sản phẩm tẩy da chết thành vòng nhẹ, từ ngón lên mu bàn chân, cổ chân, và kỹ hơn ở gót. Chỉ dùng hạt mịn như đường hay muối mịn, vì hạt to, sắc dễ làm xước da; tránh chỗ da trầy. Xả sạch trong bồn, lau khô, rồi làm chân kia.",
        image: { src: img("tay-da-chet-ban-chan-xoa-vong-nhe"), alt: "Chuyên viên đeo găng đen đỡ bàn chân khách trên khăn trắng và xoa sản phẩm tẩy da chết trên mu bàn chân, hũ sản phẩm đặt cạnh bên" },
      },
      {
        name: "Chăm da quanh móng chân",
        text: "Lau khô chân, cả kẽ ngón. Thoa kem làm mềm da quanh móng, đợi theo hướng dẫn của hãng, rồi đẩy nhẹ bằng cây đẩy đã tiệt trùng. Không cắt phần da sống. Móng dài thì cắt thẳng ngang và dũa nhẹ góc, như trong bài [Các bước làm móng tay móng chân cơ bản](lesson:cham-soc-mong-co-ban).",
      },
      {
        name: "Làm mịn gót chân",
        text: "Dùng bàn chà chân, chà nhẹ và đều tay, theo hướng dẫn của loại bàn chà. Chà vài đường, sờ thử, rồi mới chà tiếp nếu cần: chà ít mà sờ nhiều. Mịn là đủ, không cần lấy sạch lớp chai, và không dùng dao bào. Khách thấy rát là đã quá tay.",
        image: { src: img("cha-got-chan-bang-ban-cha-nhe-tay"), alt: "Bàn tay đeo găng đen cầm bàn chà chân áp vào gót chân khách, tay kia giữ bàn chân trên chiếc khăn kem", caption: "Chà nhẹ, đều tay, dừng lại sờ thử sau vài đường." },
      },
      {
        name: "Massage chân",
        text: "Thoa kem massage. Vuốt dài từ ngón chân lên cổ chân, lên bắp chân, về phía tim. Ngón cái xoa vòng nhẹ dọc lòng bàn chân, rồi vuốt nhẹ từng ngón chân. Hỏi khách lực có vừa không, và không ấn lên tĩnh mạch giãn. Kết thúc mỗi chân bằng vài đường vuốt dài, chậm dần, rồi bọc chân trong khăn ấm cho khách khỏi lạnh.",
        image: { src: img("massage-ban-chan-vuot-ve-phia-tim"), alt: "Hai bàn tay đeo găng đen ôm lấy bàn chân khách đặt trên khăn kem, một tay ở mu bàn chân, một tay đỡ gót, trong động tác vuốt" },
      },
      {
        name: "Ủ mặt nạ chân, nếu liệu trình có",
        text: "Thoa một lớp mặt nạ, bọc màng mỏng, rồi quấn khăn ấm, để khoảng mười phút theo hướng dẫn của hãng. Trong lúc khách thư giãn, bạn chuyển sang làm tay.",
        image: { src: img("u-mat-na-chan-boc-mang-va-khan-am"), alt: "Hai bàn chân khách được bọc màng mỏng trong suốt, chuyên viên đang quấn khăn bông trắng ấm quanh từng bàn chân đặt trên gối kê", caption: "Bọc màng mỏng, quấn khăn ấm; chân ủ trong lúc bạn làm tay." },
      },
      {
        name: "Ngâm và tẩy da chết bàn tay",
        text: "Ngâm đầu ngón tay trong bát nước ấm vài phút, rồi lau khô. Tẩy da chết nhẹ hơn ở chân, vì da tay mỏng hơn. Sau đó đẩy nhẹ da quanh móng, như với chân.",
        image: { src: img("ngam-dau-ngon-tay-trong-bat-nuoc-am"), alt: "Các đầu ngón tay của khách ngâm trong bát sứ trắng nhỏ đựng nước ấm trên bàn đá, bàn tay kia đặt trên khăn kem, chuyên viên ngồi đối diện" },
      },
      {
        name: "Massage tay",
        text: "Tháo găng và rửa tay. Hai ngón cái vuốt dài trên mu bàn tay, từ khớp ngón về phía cổ tay. Xoa vòng nhẹ trong lòng bàn tay, rồi vuốt dọc từng ngón, từ gốc ra đầu ngón. Lực vừa, chậm, đều. Cuối cùng vuốt dài từ mu bàn tay lên cẳng tay vài lần, chậm dần.",
        image: { src: img("massage-mu-ban-tay-bang-hai-ngon-cai"), alt: "Chuyên viên dùng hai tay ôm bàn tay khách đặt trên khăn kem, hai ngón cái vuốt trên mu bàn tay, khách nằm thư giãn phía sau" },
      },
      {
        name: "Quét paraffin và ủ tay",
        text: "Kiểm tra nhiệt độ theo hãng, rồi thử lên cổ tay mình; chỉ làm trên da lành lặn. Lấy paraffin ra bát riêng, không nhúng tay khách vào nồi chung. Dùng cọ quét vài lớp lên mu bàn tay và lòng bàn tay, bọc túi mỏng, đeo bao tay bông và ủ khoảng mười phút theo hãng. Khách thấy nóng quá thì dừng ngay và bóc ra.",
        image: { src: img("u-paraffin-tay-boc-tui-va-bao-tay-bong"), alt: "Hai bàn tay khách đặt trên khăn kem, một bàn tay bọc túi mỏng trong suốt, bàn tay kia đã đeo bao tay bông màu kem, chuyên viên chỉnh lại bao tay", caption: "Sau lớp paraffin là túi mỏng, rồi bao tay bông để giữ ấm." },
      },
      {
        name: "Bóc paraffin, thoa kem dưỡng",
        text: "Tháo bao tay và bóc lớp paraffin ra một lượt. Paraffin đã dùng thì bỏ đi. Thoa kem dưỡng tay, vuốt nhẹ. Rồi tháo khăn ở chân, lau sạch mặt nạ và thoa kem dưỡng chân. Nhìn lại da tay chân một lượt xem có chỗ nào đỏ rát không.",
        image: { src: img("boc-lop-paraffin-khoi-ban-tay"), alt: "Chuyên viên bóc lớp paraffin màu trắng sữa khỏi mu bàn tay khách thành một mảng liền, bàn tay khách đặt trên mặt bàn đá" },
      },
      {
        name: "Dặn khách và ghi chú",
        text: "Dặn khách dưỡng ẩm tay chân mỗi ngày. Gót chân nứt nẻ, rất đau, hoặc móng mọc quặp thì nên gặp chuyên viên chăm sóc bàn chân. Ghi vào ghi chú của khách da thế nào, lực tay khách thích và đã dùng sản phẩm gì.",
      },
      {
        name: "Dọn dẹp",
        text: "Bỏ túi lót, làm sạch bồn bằng xà phòng và bàn chải, xả sạch, rồi khử khuẩn đủ thời gian ghi trên chai. Dụng cụ kim loại làm sạch rồi tiệt trùng. Khăn cho vào giỏ đồ giặt có nắp. Lau ghế và [rửa tay](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "Quy trình spa tay chân gồm những bước nào?",
      a: "Phần chân gồm chuẩn bị bồn lót túi, hỏi khách, kiểm tra bàn chân, ngâm, tẩy da chết, chăm da quanh móng, làm mịn gót, massage và mặt nạ chân nếu có. Phần tay gồm ngâm đầu ngón, tẩy da chết nhẹ, massage và ủ paraffin. Buổi làm kết thúc bằng kem dưỡng, lời dặn và dọn dẹp, và không có bước sơn móng.",
    },
    {
      q: "Một buổi spa tay chân mất bao lâu?",
      a: "Thường khoảng bốn mươi lăm phút đến một tiếng, tùy liệu trình của tiệm. Trong đó ngâm chân khoảng năm đến mười phút, mặt nạ chân và ủ paraffin tay mỗi thứ khoảng mười phút theo hướng dẫn của hãng.",
    },
    {
      q: "Cách ủ paraffin tay tại spa thế nào?",
      a: "Kiểm tra nhiệt độ theo hãng và thử lên cổ tay người làm, chỉ làm trên da lành lặn. Lấy paraffin ra bát riêng, dùng cọ quét vài lớp lên mu và lòng bàn tay, bọc túi mỏng, đeo bao tay bông và ủ khoảng mười phút theo hãng. Sau đó bóc ra một lượt, bỏ paraffin đã dùng và thoa kem dưỡng.",
    },
    {
      q: "Chà gót chân thế nào để không bị rát?",
      a: "Dùng bàn chà chân, chà nhẹ và đều tay, vài đường rồi dừng lại sờ thử. Gót mịn là đủ, không cần lấy sạch lớp chai và không dùng dao bào. Khi khách thấy rát nghĩa là đã chà quá tay.",
    },
    {
      q: "Massage chân vuốt theo hướng nào?",
      a: "Vuốt dài từ ngón chân lên cổ chân, lên bắp chân, tức là về phía tim. Ngón cái xoa vòng nhẹ dọc lòng bàn chân, rồi vuốt nhẹ từng ngón. Không ấn lên tĩnh mạch giãn, và hỏi khách xem lực tay có vừa không.",
    },
    {
      q: "Vì sao phải lau khô kẽ ngón chân sau khi ngâm?",
      a: "Kẽ chân ẩm là chỗ nấm rất thích. Sau khi ngâm và sau khi xả sản phẩm tẩy da chết, bàn chân cần được lau khô, kể cả từng kẽ ngón, trước khi làm các bước tiếp theo.",
    },
  ],
  related: ["spa-tay-chan-hieu-dung", "cham-soc-mong-co-ban", "spa-massage-body", "ve-sinh-dung-cu"],
};

export default article;
