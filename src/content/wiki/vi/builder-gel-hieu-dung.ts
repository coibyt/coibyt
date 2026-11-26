import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/builder-gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "builder-gel-la-gi",
  lesson: "builder-gel-hieu-dung",
  category: "nail",
  title: "Builder gel là gì? Khác sơn gel thế nào, ai hợp và vì sao cần điểm apex",
  metaTitle: "Builder gel là gì? Khác sơn gel, điểm apex, lịch dặm",
  metaDescription:
    "Builder gel (BIAB) là gì, khác sơn gel ở đâu, loại tháo bằng acetone và gel cứng, ai hợp, ai chưa nên làm, điểm apex, vì sao gel bị hở và bao lâu thì dặm.",
  keyword: "builder gel là gì",
  keywords: ["BIAB là gì", "builder gel khác sơn gel", "builder gel có hại móng không", "điểm apex là gì", "builder gel bị hở chân móng", "bao lâu dặm builder gel", "base cao su là gì"],
  excerpt: "Builder gel (BIAB) là lớp gel đặc tạo khung đỡ cho móng thật. Bài viết giải thích nó khác sơn gel ở đâu, hợp với ai, cấu trúc đúng và lý do gel bị hở.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("bo-mong-builder-gel-hong-sua-tu-nhien"),
    alt: "Hai bàn tay khách đặt trên gối kê tay màu kem, mười móng ngắn phủ builder gel hồng sữa bóng tự nhiên",
  },
  takeaways: [
    "Sơn gel là cái áo, **builder gel là bộ khung**: gel đặc, tự chảy cho phẳng, khi chín thành lớp đỡ cho móng thật.",
    "Builder gel hợp với móng mỏng, mềm, hay gãy. Nó **không làm móng mọc nhanh hơn** và không chữa được móng.",
    "Lớp gel mỏng ở chân móng, mỏng ở đầu móng, dày nhất ở **điểm apex** nằm trên vùng chịu lực.",
    "Gel hở ở chân móng thường do chuẩn bị chưa kỹ, gel chạm da, mép gel dày thành gờ, hoặc lớp gel không có apex.",
    "Thường cứ **3–4 tuần** nên dặm một lần để dựng lại apex. Lớp cũ còn bám tốt thì không cần tháo hết.",
  ],
  intro: [
    "Builder gel là gì mà khách nào có móng yếu cũng hỏi? Đó là một loại gel đặc, nhiều nơi gọi là BIAB, tức gel đắp đựng trong chai. Phủ lên móng thật, nó tạo một lớp khung giúp móng chắc và đẹp tự nhiên. Cũng chính dịch vụ này, nếu người thợ làm mà không hiểu, sẽ bong, sẽ gãy, và khách không quay lại.",
    "Bài viết này đi theo bài học “Builder gel: hiểu đúng để móng chắc và đẹp” trong khóa Nghề Nail của VaraaAi Academy. Đọc xong, bạn phân biệt được builder gel với sơn gel, biết khách nào hợp và khách nào chưa nên làm, hiểu vì sao lớp gel phải có hình dáng, và giải thích được cho khách vì sao cần dặm định kỳ.",
  ],
  sections: [
    {
      id: "builder-gel-khac-son-gel",
      title: "Builder gel (BIAB) khác sơn gel ở điểm nào",
      blocks: [
        { p: "Hai sản phẩm cùng hơ đèn, cùng đựng trong chai, nên khách hay nghĩ chúng là một. Thật ra chúng làm hai việc khác nhau. Sơn gel lỏng và mỏng, chủ yếu để lên màu. Nó dẻo, uốn theo móng, nhưng không làm móng cứng thêm. Builder gel đặc hơn nhiều, sánh như mật ong. Đặt lên móng, nó tự chảy ra cho phẳng, người trong nghề gọi là tự cân bằng. Khi chín dưới đèn, nó thành một lớp khung đỡ cho móng thật." },
        { img: { src: img("builder-gel-dac-sanh-nhu-mat-ong"), alt: "Bàn tay đeo găng đen nhấc cọ khỏi chai, builder gel hồng trong đặc sánh chảy chậm thành một dòng dày xuống miệng chai", caption: "Builder gel đặc và chảy chậm. Chính độ đặc này cho phép người thợ dựng hình dáng cho lớp gel." } },
        {
          table: {
            head: ["Điểm so sánh", "Sơn gel", "Builder gel"],
            rows: [
              ["Độ đặc", "Lỏng, mỏng", "Đặc, sánh như mật ong, tự chảy cho phẳng"],
              ["Việc chính", "Lên màu", "Tạo lớp khung đỡ cho móng thật"],
              ["Sau khi chín", "Dẻo, uốn theo móng, không làm móng cứng thêm", "Thành lớp khung, giữ cho móng không bị bẻ cong"],
              ["Độ dày và nhiệt khi hơ", "Lớp mỏng", "Lớp dày hơn, khách hay thấy nóng trong mấy giây đầu"],
            ],
          },
        },
        { p: "Cách nhớ gọn nhất: sơn gel là cái áo, builder gel là bộ khung. Một bộ móng có thể có cả hai, khung ở dưới và màu ở trên. Nếu bạn chưa nắm chắc phần sơn màu, hãy đọc bài [sơn gel là gì và vì sao bền](lesson:gel-hieu-dung) trước." },
      ],
    },
    {
      id: "hai-loai-builder-gel",
      title: "Hai họ builder gel: loại tháo bằng acetone và gel cứng",
      blocks: [
        { p: "Trước khi mở một chai gel mới, người thợ cần biết nó thuộc họ nào, vì cách tháo khác nhau hoàn toàn." },
        {
          table: {
            head: ["Họ sản phẩm", "Gồm những gì", "Cách tháo"],
            rows: [
              ["Loại tháo bằng acetone", "Phần lớn gel đựng trong chai mà người ta gọi là BIAB, và loại base đặc, base cao su", "Acetone làm tan được"],
              ["Gel cứng", "Gel đắp không tan trong acetone", "Phải dũa"],
            ],
          },
        },
        { img: { src: img("tho-nail-doc-huong-dan-tren-chai-gel"), alt: "Nữ thợ nail mặc áo kem đứng bên kệ đá bày chai gel, cầm một chai nhỏ lên đọc kỹ nhãn phía sau" } },
        { note: "Ba điều phải đọc trong hướng dẫn của hãng trước khi dùng: loại này tháo thế nào, hơ bao lâu, dưới loại đèn nào. Đừng lấy con số của hãng này áp cho chai của hãng khác.", kind: "info", title: "Đọc hướng dẫn của hãng" },
        { p: "Cách tháo từng loại cho đúng, không làm mỏng móng thật, có trong bài [tháo gel đúng cách](lesson:thao-gel)." },
      ],
    },
    {
      id: "ai-hop-ai-khong",
      title: "Ai hợp với builder gel, ai chưa nên làm",
      blocks: [
        { p: "Khách hợp nhất là người có móng mỏng, mềm, dễ cong, móng tách lớp ở đầu, cứ để dài một chút là gãy. Lớp khung giữ cho móng không bị bẻ cong mỗi ngày, nhờ vậy khách giữ được độ dài của chính móng mình." },
        { img: { src: img("mong-mong-tach-lop-o-dau-mong"), alt: "Cận cảnh một móng tay tự nhiên mỏng, phần đầu móng bị tách lớp và bong thành vảy trong", caption: "Móng mỏng, tách lớp ở đầu: kiểu móng được lớp khung builder gel che chở tốt nhất." } },
        { note: "Builder gel không làm móng mọc nhanh hơn và không chữa được móng. Nó chỉ che chở để móng không gãy trong lúc mọc. Đừng hứa với khách rằng móng sẽ khỏe hơn nhờ gel.", kind: "warn", title: "Nói đúng về tác dụng" },
        { p: "Có ba trường hợp không nên làm, hoặc chưa nên làm:" },
        {
          ul: [
            "**Móng cần bác sĩ xem.** Móng tách khỏi nền móng, đổi màu, dày lên, hoặc da quanh móng sưng, đỏ, có mủ. Không làm, và khuyên khách đi khám.",
            "**Khách từng dị ứng với gel.** Dấu hiệu là ngứa, đỏ, phồng da quanh móng sau những lần làm trước.",
            "**Móng cắn sát, quá ngắn.** Gel phải bám vào móng thật. Móng còn quá ít thì gel ít chỗ bám, lại dễ chạm vào da. Với những khách này, nhiều khi nên chăm móng một thời gian cho móng dài ra rồi mới làm.",
          ],
        },
        { img: { src: img("mong-can-sat-chua-nen-lam-builder-gel"), alt: "Hai bàn tay đặt trên khăn bông kem với các móng cắn sát, rất ngắn, mép móng lởm chởm và da quanh móng khô" } },
        { p: "Cách nhận biết những dấu hiệu phải từ chối được nói kỹ trong bài học [Khi nào không nên làm](lesson:khi-nao-khong-lam) của khóa Vệ sinh & an toàn." },
      ],
    },
    {
      id: "cau-truc-diem-apex",
      title: "Điểm apex là gì và cấu trúc đúng của lớp builder gel",
      blocks: [
        { p: "Một bộ builder gel đẹp không dày đều như một tấm ván. Nó có hình dáng: mỏng ở sát chân móng, mỏng ở đầu móng, và dày nhất ở một điểm gọi là **điểm apex**." },
        { p: "Lý do nằm ở cách móng chịu lực. Mỗi ngày khách gõ phím, mở nắp hộp, cài nút áo. Móng bị đẩy ngược lên và hay gãy ở đúng một chỗ: nơi móng rời khỏi nền da, bắt đầu phần đầu móng tự do. Đó là vùng chịu lực. Điểm apex nằm ngay trên vùng này, hơi lùi về phía sau một chút. Gel dày nhất ở đó làm việc như một cây xà đỡ, nên móng không bị bẻ cong. Lớp gel phẳng lì thì ngược lại: móng vẫn cong lên cong xuống mỗi ngày và gel bong dần." },
        { img: { src: img("diem-apex-builder-gel-nhin-tu-canh-ben"), alt: "Một ngón tay nhìn ngang từ cạnh bên, lớp builder gel hồng trong tạo đường cong mềm, cao nhất ở khoảng giữa móng", caption: "Nhìn từ cạnh bên: gel mỏng ở chân móng và đầu móng, cao nhất ở điểm apex." } },
        { p: "Nhìn từ đầu móng vào, móng có một độ cong như chữ C. Lớp gel phải ôm theo độ cong ấy, đều cả hai bên. Ở hai cạnh bên, gel mỏng và gọn, thẳng theo cạnh móng, không phình ra, không tràn xuống da." },
        { img: { src: img("do-cong-chu-c-nhin-tu-dau-mong"), alt: "Đầu ngón tay hướng thẳng vào ống kính, mép đầu móng phủ gel hiện thành một vòm cong chữ C đều hai bên" } },
        { note: "Tập thói quen nhìn mỗi móng từ ba hướng: từ trên xuống, từ cạnh bên và từ đầu móng. Nhìn từ trên xuống rất khó thấy một lớp gel phẳng lì hay lệch một bên.", kind: "tip", title: "Ba hướng nhìn" },
      ],
    },
    {
      id: "builder-gel-bi-ho",
      title: "Vì sao builder gel bị hở ở chân móng sau một tuần",
      blocks: [
        { p: "Khách quay lại sau một tuần với lớp gel hở ở chân móng là chuyện rất hay gặp. Phần lớn rơi vào một trong bốn lý do sau." },
        {
          table: {
            head: ["Nguyên nhân", "Chuyện gì xảy ra", "Cách tránh"],
            rows: [
              ["Chuẩn bị chưa kỹ", "Móng còn dầu, còn ẩm, còn bóng, hoặc còn sót lớp da mỏng dính trên mặt móng nên gel không bám", "Làm khô, lấy sạch lớp da mỏng, chà mất độ bóng, lau sạch rồi không chạm vào móng"],
              ["Gel chạm da", "Gel tràn vào khóe hay chân móng. Da mọc lên đẩy gel lên, thế là hở", "Chừa một đường nhỏ như sợi tóc giữa gel và da"],
              ["Mép gel quá dày", "Gel dày ở mép thành một cái gờ, vướng nhẹ là bật ra", "Giữ gel mỏng ở chân móng và hai cạnh"],
              ["Không có apex", "Móng cong lên cong xuống mỗi ngày tới khi lớp gel không chịu nổi", "Dựng điểm cao nhất trên vùng chịu lực"],
            ],
          },
        },
        { img: { src: img("loi-gel-tran-vao-da-o-chan-mong"), alt: "Cận cảnh một móng sơn gel đỏ bị tràn ra ngoài, gel dính lên da ở chân móng và khóe móng", caption: "Hình minh họa lỗi: gel tràn lên da ở chân móng. Lớp gel như thế này sẽ hở khi da mọc lên, và gel chưa chín dính da còn có thể gây dị ứng." } },
      ],
    },
    {
      id: "nhiet-va-di-ung",
      title: "Nóng rát khi hơ đèn và nguy cơ dị ứng gel",
      blocks: [
        { p: "Gel tỏa nhiệt khi chín dưới đèn. Lớp càng dày, nhiệt càng nhiều. Builder gel dày hơn sơn gel, nên khách hay thấy nóng rát trong mấy giây đầu. Nhiều đèn có chế độ nhiệt thấp, cũng có hãng hướng dẫn hơ nhanh vài giây cho gel se lại rồi mới hơ đủ thời gian. Bạn làm theo hướng dẫn của hãng gel mình dùng." },
        { img: { src: img("den-led-ho-builder-gel"), alt: "Đèn LED hơ gel hình vòm màu trắng đặt trên bàn đá, các bóng đèn bên trong phát ánh sáng tím xanh" } },
        {
          ul: [
            "Khách thấy nóng thì cho khách rút tay ra vài giây, rồi đưa vào lại và vẫn hơ đủ thời gian. Đừng bắt khách chịu đau, vì nóng quá có thể làm tổn thương nền móng.",
            "Chia làm hai lớp vừa phải thay vì một lớp thật dày. Lớp mỏng hơn thì ít nóng hơn và chín đều hơn.",
            "Không bỏ dở giữa chừng. Gel chưa chín dễ bong và dễ gây dị ứng.",
          ],
        },
        { h3: "Ba điều về dị ứng" },
        {
          ol: [
            "Gel chưa chín không bao giờ được chạm vào da khách, và cả da của thợ.",
            "Gel phải chín hoàn toàn: đúng loại đèn hãng khuyên, đủ thời gian, không đắp quá dày.",
            "Bụi dũa phải được hút đi, không thổi, vì bụi của gel chưa chín hết cũng gây dị ứng.",
          ],
        },
        { note: "Ở châu Âu, sản phẩm làm móng có chất HEMA phải ghi rõ trên nhãn rằng chỉ dành cho người làm chuyên nghiệp và có thể gây dị ứng ([Quy định (EU) 2020/1682](https://eur-lex.europa.eu/eli/reg/2020/1682/oj/eng)). Sản phẩm làm móng có chất TPO đã bị cấm, nên hãy kiểm tra lại kho của tiệm. Quy định mỗi nước một khác, bạn cần xem quy định nơi mình làm việc.", kind: "warn", title: "Quy định về thành phần" },
        { p: "Phần này được nói kỹ hơn trong bài học [Dị ứng hóa chất](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "dam-builder-gel",
      title: "Bao lâu thì dặm builder gel và nói gì với khách",
      blocks: [
        { p: "Móng mọc ra thì lớp gel cũng trôi dần về phía đầu móng, kéo theo cả điểm apex. Khung dồn ra đầu, móng nặng đầu, dễ gãy và dễ hở. Vì vậy thường cứ 3–4 tuần khách nên quay lại dặm: người thợ dũa mỏng lớp cũ, đắp phần chân móng mới mọc và dựng lại apex cho đúng chỗ." },
        { img: { src: img("builder-gel-moc-ra-can-dam-lai"), alt: "Cận cảnh một móng phủ builder gel đã mọc dài, lộ một khoảng móng thật chưa có gel ở sát chân móng", caption: "Sau vài tuần, chân móng mới mọc lộ ra và điểm apex đã trôi về phía đầu móng." } },
        { p: "Nếu lớp cũ còn bám tốt, bạn dặm được nhiều lần mà không cần tháo hết. Móng thật nhờ vậy đỡ phải chịu cảnh tháo đi tháo lại." },
        { p: "Phần còn lại là lời nói thật với khách. Một câu đủ dùng: “Lớp này giúp móng chị không gãy để móng dài ra, chứ không làm móng mọc nhanh hơn.” Rồi dặn thêm:" },
        {
          ul: [
            "Thấy hở thì đừng tự lột, đừng tự cạy. Hãy quay lại tiệm.",
            "Đeo găng khi rửa chén và lau dọn.",
            "Thoa dầu dưỡng quanh móng mỗi ngày.",
          ],
        },
        { p: "Khách hiểu thì khách sẽ giữ móng giúp bạn. Khi đã nắm phần lý thuyết này, bạn chuyển sang bài thực hành [cách đắp builder gel trên móng thật](lesson:builder-gel) để làm từng bước." },
      ],
    },
    {
      id: "dua-len-lich-hen",
      title: "Đặt dịch vụ dặm builder gel trên lịch của tiệm",
      blocks: [
        { p: "Vì builder gel sống nhờ lịch dặm, tiệm nên có sẵn hai dịch vụ tách riêng. Trong VaraaAi, bạn [thêm dịch vụ](lesson:dich-vu) “Dặm builder gel” với đúng thời lượng của tiệm, rồi đặt luôn buổi dặm trên [lịch hẹn](lesson:lich-hen) trước khi khách ra về. Khách có sẵn ngày hẹn thì ít khi để lớp gel quá hạn rồi tự cạy ở nhà." },
      ],
    },
  ],
  faq: [
    {
      q: "Builder gel và BIAB có phải là một không?",
      a: "BIAB là cách nhiều nơi gọi builder gel, tức gel đắp đựng trong chai. Phần lớn gel trong chai thuộc họ tháo được bằng acetone, cùng họ với base đặc và base cao su. Ngoài ra còn có gel cứng, loại không tan trong acetone và phải dũa khi tháo.",
    },
    {
      q: "Builder gel khác sơn gel thế nào?",
      a: "Sơn gel lỏng, mỏng, chủ yếu để lên màu và không làm móng cứng thêm. Builder gel đặc hơn nhiều, tự chảy cho phẳng và khi chín thành một lớp khung đỡ cho móng thật. Có thể sơn gel màu lên trên lớp builder gel.",
    },
    {
      q: "Builder gel có làm móng mọc nhanh và khỏe hơn không?",
      a: "Không. Builder gel không làm móng mọc nhanh hơn và không chữa được móng. Nó che chở để móng không bị bẻ cong và gãy trong lúc mọc, nhờ đó khách giữ được độ dài của móng thật.",
    },
    {
      q: "Điểm apex nằm ở đâu trên móng?",
      a: "Điểm apex là chỗ lớp gel dày nhất. Nó nằm trên vùng chịu lực, nơi móng rời khỏi nền da và bắt đầu phần đầu móng tự do, hơi lùi về phía sau. Chân móng và đầu móng phải mỏng.",
    },
    {
      q: "Vì sao hơ đèn builder gel lại thấy nóng rát?",
      a: "Gel tỏa nhiệt khi chín, lớp càng dày càng nóng, mà builder gel dày hơn sơn gel. Khi thấy nóng, khách rút tay ra vài giây rồi đưa vào lại và hơ đủ thời gian. Dùng chế độ nhiệt thấp hoặc hơ nhanh trước nếu hãng hướng dẫn, và chia làm hai lớp vừa phải.",
    },
    {
      q: "Bao lâu thì nên dặm builder gel?",
      a: "Thường cứ 3–4 tuần. Móng mọc làm điểm apex trôi ra phía đầu móng, móng nặng đầu, dễ gãy và dễ hở. Khi dặm, thợ dũa mỏng lớp cũ, đắp phần chân móng mới mọc và dựng lại apex. Lớp cũ còn bám tốt thì không cần tháo hết.",
    },
  ],
  related: ["builder-gel", "gel-hieu-dung", "thao-gel-hieu-dung", "fill-mong-hieu-dung"],
};

export default article;
