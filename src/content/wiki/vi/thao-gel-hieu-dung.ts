import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thao-gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "thao-gel-co-hai-mong-khong",
  lesson: "thao-gel-hieu-dung",
  category: "nail",
  title: "Tháo gel có hại móng không? Vì sao móng mỏng, yếu sau khi tháo và khi nào nên cho móng nghỉ",
  metaTitle: "Tháo gel có hại móng không? Vì sao móng mỏng, yếu",
  metaDescription:
    "Tháo gel có hại móng không: vì sao móng hỏng lúc tháo, không phải lúc sơn, gel mềm khác gel cứng ra sao, acetone làm gì với da và móng, khi nào cho móng nghỉ.",
  keyword: "tháo gel có hại móng không",
  keywords: [
    "móng mỏng yếu sau khi tháo gel",
    "tự lột sơn gel có sao không",
    "móng tay mọc lại mất bao lâu",
    "gel mềm và gel cứng khác nhau thế nào",
    "acetone có hại da tay không",
    "có nên cho móng nghỉ sau khi làm gel",
    "tháo gel bằng máy mài",
  ],
  excerpt: "Móng của khách hỏng phần lớn lúc tháo chứ không phải lúc sơn. Thủ phạm là lột và cạo. Hiểu vì sao để tháo gel mà móng vẫn dày và khỏe.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("u-acetone-thao-gel-quan-giay-bac-nam-ngon"),
    alt: "Bàn tay khách đặt trên gối kê tay, năm đầu ngón quấn kín giấy bạc để ủ tháo gel, bên cạnh là đồng hồ cát nhỏ",
  },
  takeaways: [
    "Phần lớn hư hại móng xảy ra **lúc tháo**, không phải lúc sơn. Thủ phạm là lột và cạo, chứ không phải bản thân lớp gel.",
    "Móng đã mỏng thì không tự dày lại. Móng tay mọc khoảng 3 mm mỗi tháng, một móng mới hoàn toàn mất khoảng 4–6 tháng.",
    "Xác định sản phẩm trước khi tháo: **gel mềm** mềm ra trong acetone, **gel cứng** không tan và phải dũa.",
    "Gel phải tự phồng, nứt và bong. Chỗ nào còn bám thì quấn lại ủ thêm, không cạo.",
    "Acetone rất dễ cháy, kể cả hơi của nó: làm ở nơi thông gió, xa lửa và nguồn nhiệt, đậy nắp chai ngay sau khi dùng.",
  ],
  intro: [
    "Tháo gel có hại móng không là câu hỏi thường đến sau một lần móng bị mỏng, sần và đau. Khách ngồi xuống, đưa tay ra và nói móng dạo này yếu quá, chắc tại gel. Hỏi kỹ thì lần trước khách thấy gel hở một góc nên tiện tay lột luôn ở nhà, hoặc một người thợ đang vội đã lấy cây đẩy ra cạo cho nhanh. Trong phần lớn trường hợp, thứ làm hỏng móng là cách tháo sai chứ không phải lớp gel.",
    "Bài viết này đi theo bài học “Tháo gel: hiểu đúng để không hỏng móng” trong khóa Nghề Nail của VaraaAi Academy, là phần lý thuyết của chủ đề tháo gel. Bạn sẽ hiểu chuyện gì xảy ra với bản móng khi gel bị lột, vì sao phải phá lớp top, acetone làm gì với da và móng, và khi nào nên khuyên khách cho móng nghỉ. Thao tác cụ thể nằm ở bài [Cách tháo sơn gel đúng cách](lesson:thao-gel).",
  ],
  sections: [
    {
      id: "vi-sao-mong-hong-luc-thao",
      title: "Vì sao móng mỏng, yếu sau khi tháo gel",
      blocks: [
        { p: "Bản móng làm từ keratin, xếp thành rất nhiều lớp mỏng chồng lên nhau như những trang giấy. Gel đã chín bám rất chắc vào lớp trên cùng, nhiều khi còn chắc hơn lực giữ giữa các lớp móng với nhau." },
        { p: "Vì vậy khi bị lột, gel không rời khỏi móng một cách sạch sẽ. Nó kéo theo cả mấy lớp móng thật. Móng để lại những mảng trắng, sần, mỏng và yếu. Cạo mạnh bằng cây đẩy kim loại cho kết quả tương tự, chỉ là bằng một con đường khác." },
        { img: { src: img("mong-mong-san-trang-sau-khi-cao-gel"), alt: "Cận cảnh một móng tay sau khi gel bị cạo ra, mặt móng loang lổ những mảng trắng sần, còn sót vài mảnh gel đỏ", caption: "Hậu quả của việc cạo cố: mặt móng trắng, sần vì đã mất các lớp trên cùng." } },
        { img: { src: img("tu-lot-son-gel-o-nha"), alt: "Cận cảnh hai bàn tay phụ nữ, một móng tay đang cạy và lột lớp sơn gel đỏ khỏi móng của bàn tay kia", caption: "Điều không nên làm: thấy gel hở một góc rồi tiện tay lột." } },
        { note: "Một móng đã hở sẵn một góc cũng không phải là chỗ để cạy lên. Phần gel còn lại vẫn bám chắc vào móng thật như cũ.", kind: "warn", title: "Gel hở không có nghĩa là gel đã rời" },
      ],
    },
    {
      id: "mong-moc-lai-bao-lau",
      title: "Móng đã mỏng có dày lại không, mọc lại mất bao lâu",
      blocks: [
        { p: "Phần móng đã mỏng thì không dày lại được. Bản móng là mô đã chết, nó không tự lành như da. Cách duy nhất là chờ móng mới mọc ra thay thế." },
        { p: "Móng tay mọc chậm, mỗi tháng chỉ khoảng 3 mm. Tức là phải khoảng bốn đến sáu tháng mới có một chiếc móng mới hoàn toàn. Một phút lột cho nhanh, khách trả giá bằng nửa năm." },
        { p: "Con số này cũng là điều nên nói với khách khi họ hỏi bao giờ móng khỏe lại. Thoa dầu giúp móng và da đỡ khô, nhưng không vá được phần móng đã mất." },
      ],
    },
    {
      id: "gel-mem-va-gel-cung",
      title: "Gel mềm và gel cứng khác nhau thế nào khi tháo",
      blocks: [
        { p: "Muốn tháo đúng, trước hết phải biết trên móng khách là loại gel gì. Có hai nhóm, và cách tháo khác hẳn nhau." },
        {
          table: {
            head: ["Nhóm", "Gồm những gì", "Cách tháo"],
            rows: [
              ["Gel mềm (soak-off)", "Phần lớn sơn gel và một số gel đắp mềm", "Ủ acetone cho gel mềm ra rồi đẩy nhẹ"],
              ["Gel cứng", "Loại acetone không phá được, ủ bao lâu cũng vậy", "Dũa cho mỏng xuống, chừa lại một lớp base mỏng"],
            ],
          },
        },
        { p: "Khách làm ở tiệm khác đến mà không rõ là loại gì thì hỏi khách, thử trên một móng trước, và luôn đọc hướng dẫn tháo của hãng." },
        { h3: "Lớp top là chiếc áo mưa của bộ móng" },
        { p: "Lớp top được làm ra để chống hóa chất và chống trầy. Còn nguyên lớp top thì acetone không ngấm vào được, ủ nửa tiếng gel vẫn trơ ra, rồi người thợ sốt ruột và lấy cây đẩy ra cạo. Vì vậy trước khi ủ phải dùng dũa 180 dũa nhẹ cho mất hết độ bóng. Chỉ dũa lớp top: thấy bụi đổi sang màu của lớp sơn là dừng, không dũa tới móng thật." },
        { img: { src: img("lop-top-gel-da-dua-mat-do-bong"), alt: "Cận cảnh một móng sơn gel đỏ đã được dũa nhẹ, bề mặt mờ đục và không còn bóng, đầu ngón được găng đen đỡ bên dưới", caption: "Lớp top đã bị phá: mặt gel mờ đều, acetone ngấm vào được." } },
        { h3: "Để hóa chất làm việc, đừng để bàn tay làm thay" },
        { p: "Miếng bông thấm acetone được đặt vừa đúng trên móng, rồi quấn giấy bạc cho kín hoặc dùng kẹp. Thời gian ủ thường là 10–15 phút, nhưng mỗi hãng một khác, nên làm theo hướng dẫn của sản phẩm. Khi mở ra, gel phải tự phồng lên và tự nứt ra; lấy que gỗ đẩy nhẹ là gel đi. Chỗ nào còn bám thì đừng cạo. Quấn lại, ủ thêm vài phút. Kiên nhẫn thêm năm phút là giữ được cho khách chiếc móng." },
        { h3: "Tháo gel bằng máy mài" },
        { p: "Máy mài chỉ dành cho người đã được đào tạo bài bản. Trong tay người chưa vững, vài giây là máy mài lẹm xuống móng thật: khách thấy nóng rát, và móng để lại những vòng lõm. Nguyên tắc của người làm đúng là không mài hết, luôn chừa lại một lớp nền thật mỏng. Lớp đó che cho móng thật và sẽ theo móng mọc ra dần. Chưa học máy thì cứ dũa tay, chậm hơn nhưng an toàn." },
        { img: { src: img("thao-gel-bang-may-mai"), alt: "Bàn tay đeo găng đen cầm máy mài, đầu mài hình trụ chạm lên mặt móng sơn gel đỏ của khách", caption: "Máy mài hạ lớp gel rất nhanh, vì vậy chỉ dành cho thợ đã được đào tạo." } },
      ],
    },
    {
      id: "acetone",
      title: "Acetone làm gì với da và móng, và vì sao phải cẩn thận với lửa",
      blocks: [
        { p: "Acetone tháo gel rất tốt, nhưng nó cũng lấy đi dầu và nước của da và móng. Vì vậy sau khi tháo, móng trông trắng và khô. Đó là móng mất nước tạm thời, chưa phải móng hỏng, và thoa dầu sẽ đỡ." },
        { img: { src: img("mong-that-kho-trang-sau-khi-thao-gel"), alt: "Cận cảnh một móng tay tự nhiên không sơn, bề mặt mờ và hơi nhạt màu, đầu ngón được bàn tay đeo găng đen đỡ bên dưới", caption: "Móng vừa tháo gel thường hơi trắng và khô do mất nước tạm thời." } },
        { p: "Có hai cách giảm tác động của acetone lên da:" },
        {
          ul: [
            "Thoa dầu hoặc kem lên vùng da quanh móng trước khi ủ, tránh mặt móng ra.",
            "Chỉ dùng miếng bông nhỏ, vừa đúng chiếc móng. Đừng để hóa chất tràn ra cả ngón tay.",
          ],
        },
        { h3: "Hai điều về acetone phải thuộc lòng" },
        {
          ol: [
            "**Acetone rất dễ cháy, và hơi của nó cũng bắt lửa.** Trên bàn tháo gel không có nến, không có lửa, không hút thuốc. Tuyệt đối không hâm nóng acetone bằng lửa hay bằng lò vi sóng.",
            "**Trong phòng kín, hơi acetone làm nhức đầu, chóng mặt.** Mở thông gió, đậy nắp chai ngay sau khi lấy, và bỏ bông đã dùng vào thùng rác có nắp.",
          ],
        },
        { img: { src: img("chai-acetone-va-nen-dang-chay-tren-ban"), alt: "Trên bàn đá có một chai bơm thủy tinh đựng chất lỏng trong suốt cùng bông và giấy bạc, gần đó là cây nến đang cháy", caption: "Cảnh không được phép có ở bàn tháo gel: nến đang cháy cùng bàn với chai acetone." } },
      ],
    },
    {
      id: "bui-va-gang-tay",
      title: "Bụi dũa gel và găng tay: phần dành cho người thợ",
      blocks: [
        { p: "Khi dũa hay mài gel, bụi bay lên. Nếu lớp gel đó hơ chưa chín hết thì trong bụi còn chất chưa chín, là thứ gây dị ứng. Loại dị ứng này đến chậm, nhưng đã bị rồi thì thường là suốt đời." },
        {
          ul: [
            "Đeo găng tay khi tháo gel.",
            "Dùng máy hút bụi nếu có.",
            "Không lấy tay trần phủi bụi, và không thổi bụi.",
            "Găng nitrile gặp acetone thì mau hỏng, nên găng ướt là thay.",
          ],
        },
        { img: { src: img("dua-gel-tren-mieng-hut-bui-tai-ban"), alt: "Nữ thợ nail đeo khẩu trang và găng đen dũa móng cho khách ngay phía trên miệng hút bụi tròn gắn trong mặt bàn" } },
        { p: "Cơ chế của dị ứng gel được giải thích trong bài [Dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat), còn cách chọn và thay găng có trong bài [Găng tay, rửa tay và đồ bảo hộ](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "khi-nao-cho-mong-nghi",
      title: "Khi nào nên cho móng nghỉ sau khi làm gel",
      blocks: [
        { p: "Tháo xong chưa phải là xong. Đây là lúc duy nhất người thợ nhìn thấy chiếc móng thật của khách, nên hãy nhìn cho kỹ." },
        {
          table: {
            head: ["Bạn thấy gì", "Nên làm gì"],
            rows: [
              ["Móng hơi trắng, khô, không đau", "Mất nước tạm thời. Thoa dầu; móng khỏe thì có thể sơn lại"],
              ["Móng mỏng, mềm, ấn vào thấy đau", "Khuyên khách nghỉ gel một thời gian và thoa dầu mỗi ngày"],
              ["Móng tách khỏi nền móng, đổi màu xanh hoặc vàng, dày lên, bở vụn; da quanh móng sưng, đỏ, đau, có mủ", "Dừng lại, không sơn đè lên để che, khuyên khách đi khám bác sĩ"],
            ],
          },
        },
        { p: "Nhiều người nói móng cần nghỉ để “thở”. Thật ra móng không thở. Nó được nuôi bằng máu từ bên dưới. Móng cần nghỉ là để phần hư hại có thời gian mọc ra hết." },
        { img: { src: img("mong-doi-mau-tach-nen-sau-khi-thao-gel"), alt: "Cận cảnh một móng tay tự nhiên có một vùng ngả vàng và hơi hở ở cạnh móng, đầu ngón được găng đen đỡ bên dưới", caption: "Móng đổi màu, hở khỏi nền móng: không sơn che, khuyên khách đi khám." } },
        { p: "Thợ không phải bác sĩ: không chẩn đoán, không chữa. Nói nhẹ nhàng với khách điều mình thấy và khuyên đi khám. Cách nói sao cho khách không phật lòng có trong bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "ve-sinh-va-ghi-chu",
      title: "Vệ sinh sau khi tháo và ghi chú cho lần hẹn sau",
      blocks: [
        { p: "Giấy bạc, bông, que gỗ và dũa: mỗi khách một bộ mới, dùng xong là bỏ. Cây đẩy kim loại được rửa, khử khuẩn và tiệt trùng như mọi dụng cụ kim loại khác. Kẹp ủ dùng lại thì phải làm sạch và khử khuẩn sau mỗi khách. Quy định về hóa chất, thông gió và rác thải ở mỗi nước, mỗi thành phố một khác, nên hãy hỏi cơ quan y tế nơi bạn làm việc." },
        { p: "Loại gel trên móng khách và tình trạng móng sau khi tháo là thông tin đáng ghi lại. Trong VaraaAi, bạn ghi vào [sổ khách hàng](lesson:khach-hang) để lần sau không phải thử lại từ đầu, và [thêm tháo gel thành một dịch vụ](lesson:dich-vu) có thời lượng riêng để không ai phải tháo vội." },
        { note: "Một người thợ giỏi là người mà sau nhiều năm làm gel, móng của khách vẫn dày và khỏe như ngày đầu. Tháo gel không cần đôi tay khỏe. Nó cần hiểu biết và kiên nhẫn.", kind: "tip", title: "Thước đo tay nghề" },
      ],
    },
  ],
  faq: [
    {
      q: "Tháo gel có hại móng không?",
      a: "Tháo đúng cách thì không làm mỏng móng thật. Phần lớn hư hại xảy ra khi gel bị lột hoặc bị cạo, vì gel đã chín kéo theo cả các lớp trên cùng của bản móng. Tháo đúng nghĩa là phá lớp top, ủ acetone đủ thời gian và để gel tự bong.",
    },
    {
      q: "Tự lột sơn gel ở nhà có sao không?",
      a: "Có. Gel đã chín bám rất chắc vào các lớp keratin trên cùng, nên lột gel là lột theo cả móng thật. Móng để lại những mảng trắng, sần, mỏng và yếu. Khi gel hở một góc, tốt nhất là quay lại tiệm để tháo đúng cách.",
    },
    {
      q: "Móng mỏng sau khi tháo gel bao lâu thì hồi phục?",
      a: "Phần móng đã mỏng không tự dày lại, phải chờ móng mới mọc ra thay thế. Móng tay mọc khoảng 3 mm mỗi tháng, nên một móng mới hoàn toàn mất khoảng 4–6 tháng. Trong thời gian đó nên thoa dầu mỗi ngày.",
    },
    {
      q: "Vì sao ủ acetone lâu mà gel vẫn không ra?",
      a: "Có hai nguyên nhân hay gặp. Một là lớp top chưa được dũa phá, nên acetone không ngấm vào được. Hai là trên móng là gel cứng, loại không tan trong acetone và phải dũa mỏng xuống. Trong cả hai trường hợp, không dùng lực để cạo.",
    },
    {
      q: "Móng trắng và khô sau khi tháo gel có phải móng bị hỏng không?",
      a: "Thường là không. Acetone lấy đi dầu và nước của da và móng, nên móng vừa tháo trông trắng và khô vì mất nước tạm thời. Thoa dầu sẽ đỡ. Nếu móng mỏng, mềm và ấn vào thấy đau thì mới là dấu hiệu nên cho móng nghỉ.",
    },
    {
      q: "Có nên cho móng nghỉ để thở sau khi làm gel không?",
      a: "Móng không thở, nó được nuôi bằng máu từ bên dưới. Móng khỏe thì có thể sơn lại ngay sau khi tháo. Móng mỏng hoặc đau thì nên nghỉ gel một thời gian, để phần hư hại có thời gian mọc ra hết.",
    },
  ],
  related: ["thao-gel", "gel-hieu-dung", "son-gel", "builder-gel-hieu-dung"],
};

export default article;
