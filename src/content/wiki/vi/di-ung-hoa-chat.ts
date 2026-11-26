import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/di-ung-hoa-chat/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "di-ung-son-gel-keo-noi-mi-thuoc-nhuom",
  lesson: "di-ung-hoa-chat",
  category: "safety",
  title: "Dị ứng sơn gel, keo nối mi, thuốc nhuộm: dấu hiệu và 5 quy tắc phòng tránh",
  metaTitle: "Dị ứng sơn gel, keo nối mi, thuốc nhuộm: cách phòng tránh",
  metaDescription:
    "Dị ứng sơn gel, keo nối mi và thuốc nhuộm tóc: khác kích ứng thế nào, vì sao đến chậm và kéo dài suốt đời, chất nào hay gây dị ứng, 5 quy tắc phòng và cách xử lý.",
  keyword: "dị ứng sơn gel",
  keywords: [
    "dị ứng keo nối mi",
    "dị ứng thuốc nhuộm tóc",
    "dấu hiệu dị ứng gel",
    "kích ứng và dị ứng khác nhau thế nào",
    "HEMA trong sơn gel",
    "TPO bị cấm ở châu Âu",
    "thử phản ứng trước khi nhuộm tóc",
  ],
  excerpt: "Dị ứng trong nghề nail, mi và tóc đến chậm, không báo trước và thường theo người ta suốt đời. Phần lớn phòng được bằng năm thói quen nhỏ.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-lam-dep-xem-chai-hoa-chat-trong-salon"),
    alt: "Nữ thợ làm đẹp tóc đen búi thấp, đeo găng nitrile đen, giơ một lọ thủy tinh nhỏ lên ngang mắt để xem kỹ trong salon sang trọng",
  },
  takeaways: [
    "**Kích ứng** là da bị tổn thương trực tiếp và sẽ lành khi ngừng tiếp xúc. **Dị ứng** là hệ miễn dịch đã ghi nhớ một chất, và thường kéo dài suốt đời.",
    "Phản ứng dị ứng thường đến sau 1–3 ngày và có thể hiện ra ở mí mắt, mặt, cổ, chứ không riêng ở chỗ sản phẩm chạm vào.",
    "Với gel và bột, nguy cơ nằm ở **sản phẩm chưa chín** và bụi mài từ lớp gel chưa chín hết. Đừng để chúng chạm da.",
    "Khách từng phản ứng với thuốc nhuộm hoặc henna đen thì không nhuộm tóc, mi hay chân mày cho họ.",
    "Khó thở, sưng môi, sưng mặt hay choáng váng: gọi cấp cứu ngay (112 ở Liên minh châu Âu).",
  ],
  intro: [
    "Dị ứng sơn gel thường bắt đầu rất khẽ: ngứa ở đầu ngón tay, vài mụn nước nhỏ mà người thợ tưởng là do rửa tay nhiều. Vài tháng sau, mí mắt sưng đỏ dù gel chưa bao giờ chạm vào mắt. Đến lúc đi khám thì cơ thể đã ghi nhớ chất đó, và từ đây chỉ cần chạm nhẹ vào gel chưa chín là bị lại. Đã có những người thợ giỏi phải bỏ nghề vì chuyện này.",
    "Bài viết này đi theo bài học “Dị ứng và hoá chất: gel, bột, keo mi, thuốc nhuộm” trong khóa Vệ sinh & an toàn của VaraaAi Academy. Bạn sẽ phân biệt được kích ứng với dị ứng, biết chất nào trong nghề nail, mi và tóc hay gây dị ứng, nắm năm quy tắc phòng tránh, và biết phải làm gì khi khách hoặc chính bạn có phản ứng. Bài viết không thay cho lời khuyên của bác sĩ.",
  ],
  sections: [
    {
      id: "kich-ung-khac-di-ung",
      title: "Kích ứng và dị ứng khác nhau thế nào",
      blocks: [
        { p: "Hai từ này hay bị dùng lẫn, nhưng chúng là hai chuyện khác hẳn, và cách xử lý cũng khác." },
        {
          table: {
            head: ["", "Kích ứng", "Dị ứng"],
            rows: [
              ["Bản chất", "Da bị tổn thương trực tiếp vì nước, xà phòng, acetone", "Hệ miễn dịch đã ghi nhớ một chất và coi nó là kẻ thù"],
              ["Biểu hiện", "Da khô, đỏ, nứt ở chỗ tiếp xúc", "Ngứa, đỏ, mụn nước, sưng, chỉ với một lượng rất nhỏ"],
              ["Diễn biến", "Ngừng tiếp xúc và dưỡng da thì lành", "Thường là suốt đời. Chỉ còn cách tránh hẳn chất ấy"],
            ],
          },
        },
        { p: "Hai chuyện này có liên quan với nhau. Da tay đã khô nứt vì kích ứng thì hóa chất đi vào dễ hơn, nên giữ da tay lành lặn cũng là một phần của việc phòng dị ứng. Cách chăm da tay và chọn găng có trong bài [Găng tay, rửa tay và đồ bảo hộ](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "vi-sao-den-cham",
      title: "Vì sao làm gel nhiều năm không sao rồi vẫn bị dị ứng",
      blocks: [
        { p: "Dị ứng không báo trước. Một người có thể làm gel năm năm mà không gặp vấn đề gì. Nhưng mỗi lần sản phẩm chưa chín chạm vào da, cơ thể lại ghi nhận thêm một chút, rồi đến một ngày nó vượt ngưỡng. “Tôi làm lâu rồi có sao đâu” vì vậy không phải là bằng chứng an toàn." },
        { p: "Phản ứng dị ứng cũng thường đến chậm, sau một đến ba ngày, nên nhiều người không nối được nó với nguyên nhân. Nó còn có thể hiện ra ở chỗ khác hẳn nơi tiếp xúc: mí mắt, mặt, cổ. Lý do là bàn tay dính sản phẩm chạm lên những vùng da đó, hoặc bụi và hơi hóa chất bay tới." },
        { img: { src: img("di-ung-gel-sung-do-mi-mat"), alt: "Cận cảnh khuôn mặt một phụ nữ không trang điểm, hai mí mắt trên hơi sưng, đỏ hồng và khô bong nhẹ", caption: "Mí mắt sưng đỏ có thể là dấu hiệu dị ứng với sản phẩm làm móng, dù sản phẩm không hề chạm vào mắt." } },
        { note: "Người thợ làm gel nhiều năm, nay ngứa và nổi mụn nước ở đầu ngón tay, không nên tự nhủ rằng mình làm lâu rồi nên không thể là dị ứng. Đó chính là kiểu dị ứng nghề nghiệp hay gặp, và việc cần làm là đi khám bác sĩ da liễu sớm.", kind: "info", title: "Tình huống trong bài kiểm tra của bài học" },
      ],
    },
    {
      id: "chat-gay-di-ung",
      title: "Chất nào hay gây dị ứng trong nghề nail, mi và tóc",
      blocks: [
        {
          table: {
            head: ["Nghề", "Chất hay gây dị ứng", "Có trong"],
            rows: [
              ["Nail", "Nhóm acrylate", "Sơn gel, gel đắp, nước pha bột, keo dán móng"],
              ["Nối mi", "Cyanoacrylate", "Keo nối mi, kể cả loại ghi là dịu nhẹ"],
              ["Nhuộm tóc, mi, chân mày", "Chất tạo màu PPD và các chất họ hàng", "Thuốc nhuộm; henna đen cũng thường pha chất này"],
              ["Tẩy tóc", "Bụi mịn của bột tẩy", "Bột tẩy tóc khi xúc và pha"],
            ],
          },
        },
        { h3: "Nail: nguy cơ nằm ở sản phẩm chưa chín" },
        { p: "Acrylate gây dị ứng mạnh khi còn lỏng, chưa chín. Khi đã chín hẳn thì gần như không còn nguy hiểm. Vì vậy thứ cần đề phòng là gel dính da trước khi hơ, gel sót trên cổ chai và cán cọ, và bụi mài từ một lớp gel chưa chín hết." },
        { h3: "Nối mi: hơi keo" },
        { p: "Keo nối mi là cyanoacrylate, cùng họ với keo dán siêu dính. Hơi keo bay lên làm cay mắt, chảy nước mũi và có thể gây dị ứng cho khách. Người thợ cũng chịu rủi ro, vì ngồi cúi sát vào giọt keo nhiều giờ mỗi ngày." },
        { img: { src: img("giot-keo-noi-mi-tren-da-ngoc"), alt: "Bàn tay đeo găng đen dùng nhíp chấm sợi mi vào giọt keo đen trên đĩa đá ngọc, phía sau là khách nằm nhắm mắt với miếng dán dưới mi", caption: "Giọt keo nối mi nằm rất gần mặt người thợ suốt buổi làm." } },
        { h3: "Nhuộm và tẩy tóc" },
        { p: "Dị ứng với PPD có thể rất nặng, sưng cả mặt. Một câu nên hỏi trước khi nhuộm: khách đã bao giờ vẽ henna đen chưa, chẳng hạn khi đi du lịch. Henna đen thường pha chính chất này, nên người từng phản ứng với nó có nguy cơ bị nặng khi nhuộm tóc." },
        { p: "Bột tẩy tóc bay lên thành bụi mịn. Người thợ hít vào lâu ngày có thể bị hắt hơi, khò khè, thậm chí hen suyễn. Ngoài những chất trên, hương liệu và găng tay latex cũng là nguồn gây dị ứng trong tiệm." },
        { img: { src: img("bot-tay-toc-bay-bui-min-khi-pha"), alt: "Bàn tay đeo găng đen đổ một thìa bột tẩy tóc màu xanh nhạt vào tô pha thuốc, một làn bụi mịn bay lên trong không khí" } },
      ],
    },
    {
      id: "nam-quy-tac",
      title: "Năm quy tắc phòng dị ứng gel, bột và keo",
      blocks: [
        { p: "Dị ứng nghề nghiệp không phải chuyện xui rủi. Phần lớn phòng được bằng những thói quen nhỏ, lặp lại mỗi ngày." },
        { h3: "1. Sản phẩm chưa chín không chạm da" },
        { p: "Sơn cách da một khe nhỏ. Lỡ dính da thì gạt sạch trước khi đưa tay vào đèn. Lau sạch cổ chai, cán cọ và mặt bàn, vì đó là những chỗ tay bạn chạm vào cả ngày. Kỹ thuật sơn không chạm da được hướng dẫn từng bước trong bài [Cách sơn gel](lesson:son-gel)." },
        { img: { src: img("gat-gel-dinh-da-bang-que-go-truoc-khi-ho"), alt: "Thợ nail đeo găng đen dùng đầu vát của que gỗ gạt vệt gel đỏ dính ở cạnh móng vừa sơn, trước khi hơ đèn" } },
        { h3: "2. Hơ cho chín hẳn" },
        { p: "Dùng đúng đèn của hãng gel, hơ đủ thời gian và sơn lớp mỏng. Lớp gel dày hoặc hơ thiếu sẽ còn phần chưa chín bên trong, và phần đó là thứ gây dị ứng." },
        { h3: "3. Găng nitrile, thay thường xuyên" },
        { p: "Găng bảo vệ da tay của người thợ, nhưng hóa chất ngấm dần qua găng, nên găng dính sản phẩm phải được thay chứ không lau rồi dùng tiếp." },
        { h3: "4. Giữ không khí sạch" },
        { p: "Bật máy hút bụi tại bàn khi dũa và mài. Mở thông gió. Đậy nắp chai ngay sau khi lấy sản phẩm, và dùng thùng rác có nắp. Theo hướng dẫn của thành phố Helsinki, bàn làm móng bột phải có hút khí tại chỗ đủ mạnh. Việc bố trí thông gió cho cả tiệm có trong bài [Vệ sinh tiệm hằng ngày](lesson:ve-sinh-tiem)." },
        { img: { src: img("day-nap-chai-va-thung-rac-co-nap"), alt: "Bàn tay đeo găng đen vặn nắp một lọ thủy tinh nhỏ ngay sau khi dùng, bên cạnh là ly thủy tinh có nắp, ba hũ nhỏ đã đậy và thùng rác có nắp" } },
        { h3: "5. Biết mình đang dùng gì" },
        { p: "Mua hàng từ nhà cung cấp trong châu Âu, có nhãn và danh sách thành phần. Xin nhà cung cấp bảng dữ liệu an toàn (SDS) của từng sản phẩm: trong đó ghi cần loại găng nào và sơ cứu ra sao." },
        { img: { src: img("doc-nhan-thanh-phan-chai-gel"), alt: "Nữ thợ nail trẻ mặc áo kem đứng trước kệ sơn gel, cầm một chai nhỏ đưa sát mắt để đọc nhãn, bên cạnh là hộp hàng mới mở" } },
        { note: "Ở Liên minh châu Âu, sản phẩm làm móng có chất HEMA phải ghi trên nhãn “chỉ dành cho thợ chuyên nghiệp” và “có thể gây dị ứng”. Chất TPO bị cấm hẳn trong sản phẩm làm móng từ ngày 1/9/2025: tiệm không được dùng tiếp, kể cả hàng đã mua từ trước. Quy định về hóa chất khác nhau theo từng nước, nên hãy hỏi lại ở nơi bạn làm việc.", kind: "warn", title: "HEMA và TPO ở châu Âu" },
      ],
    },
    {
      id: "thu-phan-ung",
      title: "Thử phản ứng trước khi nhuộm tóc, mi, chân mày",
      blocks: [
        { p: "Với thuốc nhuộm tóc, mi và chân mày, nhiều hãng yêu cầu thử trên da trước, thường là 48 giờ trước khi làm. Bạn làm đúng theo hướng dẫn của hãng và ghi lại ngày thử." },
        { img: { src: img("thu-phan-ung-thuoc-nhuom-sau-tai"), alt: "Bàn tay đeo găng đen dùng que gòn chấm một chấm thuốc nhuộm nhỏ lên vùng da sau tai của khách nữ tóc búi cao" } },
        {
          ul: [
            "Thử mà không thấy gì không có nghĩa là an toàn mãi mãi. Dị ứng có thể xuất hiện ở một lần sau.",
            "Khách đã từng phản ứng với thuốc nhuộm hay với henna đen thì không làm, và khuyên khách hỏi bác sĩ. Rút ngắn thời gian để thuốc không làm cho việc nhuộm an toàn hơn.",
            "Ở EU, nhãn của nhiều loại thuốc nhuộm tóc và nhuộm mi phải ghi cảnh báo có thể gây dị ứng nặng và không dùng cho người dưới 16 tuổi. Hãy đọc nhãn trước khi dùng một sản phẩm mới.",
          ],
        },
      ],
    },
    {
      id: "khi-khach-bi-phan-ung",
      title: "Làm gì khi khách bị phản ứng trong lúc làm",
      blocks: [
        { p: "Dấu hiệu cần để ý là ngứa, rát, đỏ hoặc sưng ở vùng đang làm. Khi khách báo những điều này, đừng cố làm cho xong." },
        {
          ol: [
            "Dừng lại ngay.",
            "Lấy sản phẩm ra khỏi da thật nhẹ nhàng.",
            "Rửa vùng da đó bằng nhiều nước. Nếu sản phẩm dính vào mắt, rửa mắt bằng nước sạch trong nhiều phút.",
            "Khuyên khách đi khám, và đưa cho khách tên sản phẩm cùng danh sách thành phần để bác sĩ biết.",
            "Ghi lại sự cố: ngày, tên sản phẩm, số lô và cách bạn đã xử lý.",
          ],
        },
        { img: { src: img("rua-sach-thuoc-nhuom-bang-nhieu-nuoc"), alt: "Thợ nhuộm tóc mặc tạp dề đen, đeo găng, dùng vòi sen xả kỹ tóc và da đầu cho khách đang ngả đầu trên bồn gội", caption: "Khi khách thấy rát hoặc ngứa lúc nhuộm, xả sạch thuốc bằng nhiều nước." } },
        { note: "Khách khó thở, sưng môi, sưng mặt hay choáng váng là dấu hiệu của phản ứng nặng. Dừng lại và gọi cấp cứu ngay, đừng cho khách uống nước rồi chờ xem. Ở Liên minh châu Âu, số cấp cứu chung là 112.", kind: "warn", title: "Khi nào gọi cấp cứu" },
        { p: "Những tai nạn khác trong tiệm, như chảy máu hay hóa chất bắn vào mắt, được nói kỹ trong bài [Xử lý sự cố trong tiệm](lesson:xu-ly-su-co)." },
      ],
    },
    {
      id: "neu-la-chinh-ban",
      title: "Nếu người bị dị ứng là chính bạn",
      blocks: [
        { p: "Đừng giấu, và đừng tự chữa rồi làm tiếp. Hãy đi khám bác sĩ da liễu sớm. Bác sĩ có thể làm thử nghiệm áp da để tìm đúng chất gây dị ứng. Biết sớm và đổi cách làm sớm thì nhiều người vẫn giữ được nghề." },
        { img: { src: img("tho-nail-di-kham-bac-si-da-lieu"), alt: "Bác sĩ da liễu mặc áo trắng xem bàn tay của một nữ thợ làm đẹp trẻ dưới đèn kính lúp trong phòng khám sáng sủa" } },
        { h3: "Ghi chép lại, với sự đồng ý của khách" },
        { p: "Một cuốn sổ tốt giúp bạn không phải nhớ bằng đầu ai dị ứng với gì. Với mỗi khách, hãy ghi khách dị ứng với chất nào, ngày thử phản ứng và sản phẩm đã dùng. Trong VaraaAi, chỗ để ghi là ô “Ghi chú nội bộ” của hồ sơ khách, chỉ salon nhìn thấy. Cách dùng [sổ khách hàng](lesson:khach-hang) có bài học riêng." },
        { p: "Tên và hãng của từng sản phẩm cũng dễ tra hơn khi vật tư của tiệm được nhập vào [kho vật tư](lesson:kho-hang) ngay từ lúc hàng về." },
      ],
    },
  ],
  faq: [
    {
      q: "Dấu hiệu dị ứng sơn gel là gì?",
      a: "Thường là ngứa, đỏ, mụn nước nhỏ hoặc sưng ở đầu ngón tay và quanh móng, xuất hiện sau khi tiếp xúc một đến ba ngày. Phản ứng cũng có thể hiện ra ở mí mắt, mặt hoặc cổ. Nếu có những dấu hiệu này, hãy ngừng tiếp xúc với gel và đi khám bác sĩ da liễu.",
    },
    {
      q: "Dị ứng sơn gel có hết không?",
      a: "Khi cơ thể đã dị ứng với một chất thì thường là suốt đời, và từ đó chỉ một lượng rất nhỏ cũng gây phản ứng. Cách duy nhất là tránh hẳn chất ấy. Bác sĩ da liễu có thể làm thử nghiệm áp da để tìm đúng chất gây dị ứng.",
    },
    {
      q: "Làm gel nhiều năm không sao thì có thể bị dị ứng không?",
      a: "Có. Dị ứng không báo trước: mỗi lần sản phẩm chưa chín chạm da, cơ thể ghi nhận thêm một chút, rồi một ngày vượt ngưỡng. Vì vậy quy tắc không để gel chưa hơ chạm da áp dụng cho cả thợ lâu năm.",
    },
    {
      q: "Keo nối mi loại dịu nhẹ có gây dị ứng không?",
      a: "Có thể. Keo nối mi là cyanoacrylate, và loại ghi là dịu nhẹ vẫn là chất đó. Hơi keo làm cay mắt, chảy nước mũi và có thể gây dị ứng cho khách lẫn người thợ ngồi sát giọt keo nhiều giờ mỗi ngày.",
    },
    {
      q: "Thử phản ứng trước khi nhuộm tóc bao lâu?",
      a: "Nhiều hãng thuốc nhuộm yêu cầu thử trên da trước, thường là 48 giờ trước khi làm, theo đúng hướng dẫn của hãng. Thử không thấy gì không có nghĩa là an toàn mãi mãi. Khách từng phản ứng với thuốc nhuộm hay henna đen thì không nên nhuộm.",
    },
    {
      q: "TPO trong sơn gel có bị cấm không?",
      a: "Ở Liên minh châu Âu, chất TPO bị cấm trong sản phẩm làm móng từ ngày 1/9/2025, kể cả hàng tiệm đã mua từ trước. Quy định ở mỗi nước một khác, nên bạn cần kiểm tra quy định nơi mình làm việc và đọc bảng thành phần của sản phẩm đang dùng.",
    },
  ],
  related: ["rua-tay-gang-tay", "khi-nao-khong-lam", "xu-ly-su-co", "gel-hieu-dung"],
};

export default article;
