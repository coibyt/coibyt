import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-mong-co-ban-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cham-soc-mong-tay-mong-chan",
  lesson: "cham-soc-mong-co-ban-hieu-dung",
  category: "nail",
  title: "Chăm sóc móng tay móng chân đúng cách: cắt da, cắt móng chân, vệ sinh và sơn thường",
  metaTitle: "Chăm sóc móng tay móng chân đúng cách: 7 điều cần hiểu",
  metaDescription:
    "Chăm sóc móng tay móng chân cơ bản: vì sao không cắt da sống, cắt móng chân thẳng ngang, vệ sinh bồn ngâm, khách tiểu đường, vết chai, sơn thường khác sơn gel.",
  keyword: "chăm sóc móng tay móng chân",
  keywords: ["có nên cắt da móng tay", "cắt móng chân đúng cách", "manicure pedicure là gì", "sơn thường và sơn gel khác nhau", "làm móng chân cho người tiểu đường", "vệ sinh bồn ngâm chân", "móng quặp do cắt khóe"],
  excerpt: "Dịch vụ móng cơ bản với sơn thường nhìn thì đơn giản. Bài viết giải thích bảy điều người thợ cần hiểu để khách vừa đẹp, vừa khỏe, vừa yên tâm.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("mong-tay-son-thuong-mau-do-dang-cho-kho"),
    alt: "Hai bàn tay khách đặt trên gối kê màu kem với móng vừa sơn đỏ bóng, bên cạnh là một chai sơn móng tay màu đỏ",
  },
  takeaways: [
    "Mục đích của dịch vụ là **móng khỏe, da khỏe**. Màu sơn chỉ là phần cuối cùng.",
    "Không cắt nếp da sống ở chân móng. Chỉ lấy lớp da chết mỏng trên mặt móng và những mảnh da khô đã bong lên.",
    "Móng chân **cắt thẳng ngang**, chỉ bo nhẹ hai góc, không đào khóe, mép móng ngang với đầu ngón chân.",
    "Bồn ngâm lót túi dùng một lần cho mỗi khách; dụng cụ móng chân luôn tiệt trùng và để riêng (theo hướng dẫn của thành phố Helsinki, nơi bạn làm có thể khác).",
    "Luôn hỏi về tiểu đường và tuần hoàn máu. Thấy vết loét, vết thương, móng dày hay đổi màu thì không làm và khuyên khách đi khám.",
  ],
  intro: [
    "Chăm sóc móng tay móng chân cơ bản với sơn thường, tức manicure và pedicure, hay bị xem là việc của thợ mới vào nghề. Thật ra đây là dịch vụ cho khách thấy rõ nhất tiệm của bạn có cẩn thận và sạch sẽ hay không: khách nhìn bạn mở túi dụng cụ, lót bồn ngâm, cầm kềm ở sát da họ.",
    "Bài viết này đi theo bài học “Chăm sóc móng cơ bản: hiểu đúng để tay chân khỏe đẹp” trong khóa Nghề Nail của VaraaAi Academy. Đọc xong, bạn giải thích được cho khách vì sao không cắt da sâu, biết cắt móng chân thế nào để không thành móng quặp, nắm các quy tắc vệ sinh của bồn ngâm, và biết lúc nào phải nhẹ tay hơn hoặc từ chối làm.",
  ],
  sections: [
    {
      id: "khong-cat-da-song",
      title: "Có nên cắt da ở chân móng tay không",
      blocks: [
        { p: "Trước hết cần nói về mục đích. Trong một buổi chăm sóc móng cơ bản, màu sơn là phần cuối cùng. Phần chính là móng khỏe và da khỏe: móng được cắt dũa gọn, da quanh móng mềm và sạch, đôi chân nhẹ nhõm. Người thợ tinh ý nhiều khi còn là người đầu tiên thấy một điều bất thường trên móng hay da của khách để khuyên họ đi khám." },
        { p: "Từ mục đích đó mới hiểu được quy tắc về da. Móng mọc ra từ mầm móng, nằm dưới nếp da ở chân móng. Nếp da sống ấy làm việc như một cái gioăng: nó bịt kín, không cho vi khuẩn lọt vào chỗ móng được tạo ra. Vì vậy phần da sống không cắt." },
        { img: { src: img("mat-cat-dau-ngon-tay-mam-mong-va-nep-da"), alt: "Hình minh họa mặt cắt dọc một đầu ngón tay, thấy bản móng nằm trên nền móng và gốc móng ẩn dưới nếp da ở chân móng", caption: "Móng mọc ra từ mầm móng nằm dưới nếp da ở chân móng. Nếp da sống này bịt kín và bảo vệ mầm móng." } },
        { p: "Thứ người thợ lấy đi chỉ gồm hai loại: lớp da chết mỏng và trong bám trên mặt móng, và những mảnh da khô đã bong lên. Phần này đã được giải thích kỹ trong bài [sơn gel là gì và vì sao bền](lesson:gel-hieu-dung)." },
        { img: { src: img("kem-chi-cat-manh-da-chet-da-bong"), alt: "Thợ nail đeo găng đen dùng đầu kềm nhỏ cắt một mảnh da khô đã bong ở cạnh móng tự nhiên của khách", caption: "Kềm chỉ chạm vào mảnh da chết đã bong lên, không chạm vào nếp da sống." } },
        { p: "Tình huống hay gặp là khách quen được cắt da thật sâu và đòi cắt sâu nữa. Cắt vào da sống thì hôm nay nhìn gọn, nhưng da thường mọc lại dày hơn, sần hơn, dễ xước măng rô, và mỗi vết cắt là một cửa ngõ cho nhiễm trùng." },
        { note: "Khách đòi cắt da thật sâu thì đừng chiều. Hãy giải thích: đẩy nhẹ, lấy da chết, rồi thoa dầu dưỡng mỗi ngày. Hẹn khách quay lại sau vài tuần để họ tự thấy da mềm và đẹp hơn.", kind: "tip", title: "Cách nói với khách" },
      ],
    },
    {
      id: "cat-mong-chan-dung-cach",
      title: "Cắt móng chân đúng cách: thẳng ngang, không đào khóe",
      blocks: [
        { p: "Với móng chân có một quy tắc vàng: cắt thẳng ngang và chỉ bo thật nhẹ hai góc. Đừng cắt cong sâu xuống hai bên, đừng đào vào khóe móng, và đừng cắt quá ngắn. Mép móng ngang với đầu ngón chân là vừa." },
        { img: { src: img("mong-chan-cat-thang-ngang-dung-cach"), alt: "Cận cảnh một ngón chân cái nhìn từ trên xuống, móng tự nhiên được cắt thẳng ngang, mép móng ngang với đầu ngón", caption: "Đúng: mép móng thẳng ngang, hai góc còn nguyên, chỉ bo nhẹ cho khỏi sắc." } },
        { p: "Lý do nằm ở cách móng mọc. Khóe móng bị cắt sâu thì khi mọc ra, móng có thể đâm vào da và thành móng quặp: sưng, đỏ, đau, có khi nhiễm trùng. Móng cắt quá ngắn cũng dẫn tới kết quả tương tự. Trang thông tin về móng quặp của [NHS](https://www.nhs.uk/conditions/ingrown-toenail/) là một trong các nguồn mà bài học dẫn." },
        { img: { src: img("loi-cat-mong-chan-cong-sau-vao-khoe"), alt: "Cận cảnh một ngón chân cái có móng bị cắt cong tròn như nửa vầng trăng, hai góc móng cắt sâu xuống khóe", caption: "Hình minh họa lỗi: móng cắt cong và sâu vào hai khóe. Khi mọc ra, mép móng dễ đâm vào da." } },
        { p: "Lời dặn này cần theo khách về nhà: tự cắt móng chân cũng cắt thẳng ngang, không đào khóe. Thấy móng đâm vào da, đỏ và đau thì đi khám sớm." },
      ],
    },
    {
      id: "ve-sinh-bon-ngam-dung-cu",
      title: "Vệ sinh bồn ngâm chân và dụng cụ làm móng",
      blocks: [
        { p: "Đây là phần quan trọng nhất khi làm móng chân. Bồn ngâm ấm và ẩm là nơi vi khuẩn và nấm rất dễ phát triển nếu làm không đúng. Bài học dẫn theo [hướng dẫn vệ sinh của thành phố Helsinki](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf), cũng là tài liệu nền của bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
        {
          table: {
            head: ["Vật dụng", "Cách xử lý", "Khi nào"],
            rows: [
              ["Bồn ngâm chân", "Lót túi dùng một lần; làm sạch rồi khử khuẩn bồn", "Túi mới cho mỗi khách; bồn sau mỗi khách"],
              ["Dụng cụ làm móng chân", "Luôn tiệt trùng và để tách riêng", "Sau mỗi khách"],
              ["Kềm và cây đẩy da kim loại", "Làm sạch rồi tiệt trùng, vì chúng có thể làm xước da", "Sau mỗi khách"],
              ["Dũa giấy, phao, que gỗ, miếng tách ngón", "Đồ dùng một lần: dùng xong là bỏ", "Mỗi khách một bộ mới"],
            ],
          },
        },
        { img: { src: img("bon-ngam-chan-lot-tui-dung-mot-lan"), alt: "Bồn ngâm chân màu trắng được lót một túi ni lông trong dùng một lần, tay đeo găng đen cầm vòi sen xả nước ấm vào bồn", caption: "Túi lót mới cho mỗi khách. Ngoài túi lót, bồn vẫn được làm sạch và khử khuẩn sau mỗi khách." } },
        { p: "Với móng tay cũng vậy, sạch là điều khách nhìn thấy đầu tiên. Rửa tay và sát khuẩn tay trước mỗi khách, rồi mở túi dụng cụ ngay trước mặt khách. Khách nhìn thấy thì khách yên tâm." },
        { img: { src: img("mo-tui-dung-cu-tiet-trung-truoc-mat-khach"), alt: "Thợ nail đeo găng đen xé một túi tiệt trùng đựng kềm và cây đẩy da ngay trước mặt khách đang mỉm cười tại bàn đá" } },
        { note: "Quy định vệ sinh khác nhau theo từng nước. Những điều trên được nêu theo hướng dẫn của thành phố Helsinki; bạn hãy tìm hiểu quy định nơi mình làm việc. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "khach-tieu-duong",
      title: "Làm móng chân cho khách tiểu đường hoặc có vấn đề tuần hoàn",
      blocks: [
        { p: "Có những khách mà người thợ phải cẩn thận gấp bội: khách có bệnh tiểu đường, hay có vấn đề tuần hoàn máu ở chân. Vì vậy luôn hỏi trước khi làm. Bàn chân của họ có thể giảm cảm giác, nên nước nóng quá hay bị xước họ cũng không biết. Một vết xước nhỏ cũng rất lâu lành." },
        {
          ul: [
            "Nước chỉ ấm vừa.",
            "Ngâm ngắn.",
            "Không cắt da, không dùng dao.",
            "Dũa thật nhẹ.",
          ],
        },
        { img: { src: img("mong-chan-day-doi-mau-khong-nen-lam"), alt: "Cận cảnh phần trước một bàn chân đặt trên khăn bông kem, móng ngón cái dày lên, đục và ngả vàng khác hẳn các móng còn lại", caption: "Móng dày lên và đổi màu là dấu hiệu không làm. Người thợ không chẩn đoán, chỉ khuyên khách đi khám." } },
        { note: "Người thợ không chẩn đoán. Chân có vết loét, vết thương, móng dày, đổi màu hay móng đâm vào da thì không làm, và khuyên khách đến bác sĩ hoặc chuyên viên chăm sóc bàn chân. Bài học [Khi nào không nên làm](lesson:khi-nao-khong-lam) nói kỹ các trường hợp này.", kind: "warn", title: "Khi nào từ chối" },
      ],
    },
    {
      id: "vet-chai-chan",
      title: "Vết chai ở gót chân: làm mịn, không lấy cho bằng hết",
      blocks: [
        { p: "Chai là lớp da dày lên để bảo vệ chân ở chỗ chịu nhiều lực, như gót và lòng bàn chân. Việc của người thợ là làm mềm và làm mịn, không phải lấy cho bằng hết. Dùng dũa chân mịn, lướt nhẹ, theo hướng dẫn của dụng cụ." },
        { img: { src: img("dua-chan-min-lam-min-vet-chai-o-got"), alt: "Thợ đeo găng đen một tay giữ bàn chân khách, tay kia cầm dũa chân bản dẹt lướt nhẹ trên gót chân", caption: "Dũa chân mịn, vài lượt nhẹ là đủ để da mịn hơn." } },
        { p: "Không dùng dao bào hay lưỡi dao cắt chai, trừ khi bạn đã được đào tạo và nơi bạn làm cho phép điều đó. Lấy quá nhiều thì chân đau, dễ xước, và chai thường mọc lại dày hơn." },
      ],
    },
    {
      id: "son-thuong-va-son-gel",
      title: "Sơn thường và sơn gel khác nhau thế nào",
      blocks: [
        {
          table: {
            head: ["Điểm so sánh", "Sơn thường", "Sơn gel"],
            rows: [
              ["Cách khô", "Dung môi bay hơi trong không khí, không cần đèn", "Cần đèn"],
              ["Cách tháo", "Nước tẩy sơn, rất nhẹ nhàng cho móng", "Tháo kỹ hơn"],
              ["Độ bền", "Mềm hơn, thường giữ đẹp vài ngày đến khoảng một tuần", "Bền hơn"],
              ["Thời gian khô hẳn", "Mặt sơn khô nhanh, bên dưới cần vài giờ mới cứng hoàn toàn", "Chín dưới đèn"],
            ],
          },
        },
        { p: "Không có loại nào hơn loại nào cho mọi khách. Hãy giúp khách chọn theo nhu cầu của họ. Nếu khách chọn gel, quy trình chuẩn bị khác đi một chút, xem bài [cách sơn gel](lesson:son-gel)." },
      ],
    },
    {
      id: "mat-xa-va-dan-khach",
      title: "Mát xa, dưỡng ẩm và lời dặn trước khi khách về",
      blocks: [
        { p: "Phần mát xa và dưỡng ẩm không nên làm qua loa. Đây là lúc khách thư giãn nhất và nhớ tiệm lâu nhất. Kem dưỡng giúp da mềm, dầu dưỡng giúp da quanh móng không khô, không nứt. Chỉ cần nhớ một điều kỹ thuật: trước khi sơn phải lau sạch kem và dầu trên mặt móng, nếu không sơn sẽ không bám." },
        { p: "Lời dặn khi khách ra về:" },
        {
          ul: [
            "Sơn cần vài giờ mới cứng hẳn: tránh nước nóng và đừng xỏ giày bít ngay.",
            "Thoa dầu dưỡng mỗi ngày, đeo găng tay khi rửa chén và lau dọn.",
            "Ở nhà cũng cắt móng chân thẳng ngang, không đào khóe.",
            "Thấy móng đâm vào da, đỏ, đau thì đi khám sớm.",
          ],
        },
        { img: { src: img("mong-chan-son-do-sau-buoi-cham-soc"), alt: "Hai bàn chân khách đặt cạnh nhau trên khăn bông kem, mười móng chân ngắn sơn đỏ bóng, miếng tách ngón vừa tháo nằm bên cạnh" } },
        { p: "Một buổi chăm sóc móng cơ bản làm đúng là lý do khách quay lại mỗi tháng. Trong VaraaAi, bạn ghi vào hồ sơ [khách hàng](lesson:khach-hang) những điều cần nhớ như tiểu đường, dị ứng hay móng hay quặp, để cả tiệm cùng biết và cẩn thận ở lần sau. Khách đều đặn như vậy cũng rất hợp với [thẻ khách quen](lesson:the-khach-quen). Còn từng thao tác, từ tẩy sơn cũ đến lớp sơn bóng, có trong bài thực hành [các bước làm móng tay móng chân](lesson:cham-soc-mong-co-ban)." },
      ],
    },
  ],
  faq: [
    {
      q: "Có nên cắt da ở chân móng tay không?",
      a: "Không cắt nếp da sống ở chân móng, vì nó bịt kín và bảo vệ mầm móng. Chỉ đẩy nhẹ, lấy lớp da chết mỏng bám trên mặt móng và những mảnh da khô đã bong lên. Cắt vào da sống thì da thường mọc lại dày, sần, dễ xước măng rô, và mỗi vết cắt là đường cho nhiễm trùng.",
    },
    {
      q: "Cắt móng chân thế nào là đúng?",
      a: "Cắt thẳng ngang, chỉ bo thật nhẹ hai góc, không đào khóe và không cắt quá ngắn. Mép móng ngang với đầu ngón chân là vừa. Khóe cắt sâu hay móng cắt quá ngắn dễ làm móng mọc đâm vào da, thành móng quặp.",
    },
    {
      q: "Người bị tiểu đường có làm móng chân ở tiệm được không?",
      a: "Người thợ cần biết trước và làm thật nhẹ nhàng: nước chỉ ấm vừa, ngâm ngắn, không cắt da, không dùng dao, dũa thật nhẹ. Bàn chân có thể giảm cảm giác và vết xước rất lâu lành. Chân có vết loét, vết thương, móng dày hay đổi màu thì không làm, và khách nên đến bác sĩ hoặc chuyên viên chăm sóc bàn chân.",
    },
    {
      q: "Sơn thường giữ được bao lâu và bao lâu thì khô?",
      a: "Sơn thường thường giữ đẹp vài ngày đến khoảng một tuần. Mặt sơn khô nhanh, nhưng bên dưới cần vài giờ mới cứng hoàn toàn, nên trong thời gian đó tránh nước nóng và đừng xỏ giày bít ngay.",
    },
    {
      q: "Có nên cắt hết vết chai ở gót chân không?",
      a: "Không. Chai là lớp da dày lên để bảo vệ chân ở chỗ chịu lực. Chỉ làm mềm và làm mịn bằng dũa chân mịn. Lấy quá nhiều thì đau, dễ xước và chai thường mọc lại dày hơn. Dao bào chỉ dành cho người đã được đào tạo, ở nơi được phép.",
    },
    {
      q: "Bồn ngâm chân ở tiệm nail cần vệ sinh thế nào?",
      a: "Theo hướng dẫn vệ sinh của thành phố Helsinki mà bài học dẫn, bồn được lót túi dùng một lần cho mỗi khách, và sau mỗi khách bồn được làm sạch rồi khử khuẩn. Dụng cụ làm móng chân luôn tiệt trùng và để riêng. Quy định mỗi nước một khác, nên cần xem quy định nơi bạn làm việc.",
    },
  ],
  related: ["cham-soc-mong-co-ban", "ve-sinh-dung-cu", "khi-nao-khong-lam", "gel-hieu-dung"],
};

export default article;
