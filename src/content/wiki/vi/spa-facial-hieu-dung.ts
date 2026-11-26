import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-facial-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "facial-la-gi-cham-soc-da-mat",
  lesson: "spa-facial-hieu-dung",
  category: "spa",
  title: "Facial là gì? Thứ tự một buổi chăm sóc da mặt tại spa và lý do của từng bước",
  metaTitle: "Facial là gì? Thứ tự và lý do từng bước chăm sóc da mặt",
  metaDescription:
    "Facial là gì, một buổi chăm sóc da mặt cơ bản gồm những bước nào, vì sao làm sạch hai lần, tẩy da chết quá tay hại ra sao, khi nào bỏ xông hơi và lấy nhân mụn.",
  keyword: "facial là gì",
  keywords: [
    "chăm sóc da mặt cơ bản",
    "chăm sóc da mặt tại spa gồm những gì",
    "thứ tự các bước chăm sóc da mặt",
    "làm sạch da mặt hai lần",
    "tẩy da chết quá nhiều có sao không",
    "da nhạy cảm có nên xông hơi mặt",
    "lấy nhân mụn ở spa có an toàn không",
  ],
  excerpt: "Một buổi facial đi từ sạch, đến thông thoáng, rồi nuôi dưỡng và bảo vệ da. Hiểu lý do của từng bước thì biết khi nào làm, khi nào bỏ qua và làm nhẹ đến đâu.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuyen-vien-spa-tu-van-cham-soc-da-mat-cho-khach"),
    alt: "Chuyên viên spa mặc áo kem chỉ vào khay có ba sản phẩm dưỡng da, khách nữ mặc áo choàng trắng ngồi trên giường chăm chú nghe",
  },
  takeaways: [
    "Một buổi facial cơ bản đi theo thứ tự cố định: **làm sạch**, tẩy da chết, làm ấm, lấy nhân mụn nếu cần, mặt nạ và massage, nước cân bằng, dưỡng ẩm, chống nắng nếu là ban ngày.",
    "Khách có trang điểm thì làm sạch hai lần: tẩy trang trước, sữa rửa mặt hợp với loại da sau.",
    "Tẩy da chết chọn theo loại da và để đúng thời gian của hãng. **Tẩy quá tay** làm tổn thương hàng rào da, có khi vài tuần mới hồi lại.",
    "Da rất nhạy cảm, đang đỏ hoặc có mạch máu nhỏ hiện rõ: bỏ xông hơi, hoặc chỉ dùng khăn mát, ẩm.",
    "Lấy nhân mụn chỉ khi đã được đào tạo và quy định nơi làm việc cho phép; dụng cụ nặn mụn phải được **tiệt trùng** sau mỗi khách.",
  ],
  intro: [
    "Facial là gì thì nhiều người trả lời được ngay: rửa mặt, đắp mặt nạ, thoa kem. Nói cho đủ, facial là một buổi chăm sóc da mặt tại spa đi theo một thứ tự cố định, từ làm sạch, đến làm thông thoáng, rồi nuôi dưỡng và bảo vệ da. Mỗi bước có lý do của nó, và chính thứ tự cũng có lý do.",
    "Bài viết này đi theo bài học “Chăm sóc da mặt cơ bản: hiểu đúng để da sạch và khỏe” trong khóa Spa & chăm sóc da của VaraaAi Academy, là phần lý thuyết của chủ đề. Bài không dạy thao tác tay. Nó giải thích vì sao từng bước nằm ở đúng chỗ đó, để bạn biết khi nào làm, khi nào bỏ qua và làm nhẹ đến đâu. Phần thao tác từng bước nằm ở bài [Quy trình chăm sóc da mặt tại spa](lesson:spa-facial).",
  ],
  sections: [
    {
      id: "thu-tu-cac-buoc",
      title: "Thứ tự các bước chăm sóc da mặt cơ bản tại spa",
      blocks: [
        { p: "Một buổi chăm sóc da mặt cơ bản không cần nhiều sản phẩm. Nó cần đúng thứ tự: đi từ sạch, đến thông thoáng, rồi mới nuôi dưỡng và bảo vệ. Đảo thứ tự thì bước sau mất tác dụng. Kem dưỡng thoa lên làn da chưa sạch chỉ nằm trên một lớp cặn." },
        {
          table: {
            head: ["Bước", "Để làm gì", "Điều cần nhớ"],
            rows: [
              ["Làm sạch", "Lấy đi trang điểm, kem chống nắng, rồi làm sạch chính làn da", "Khách có trang điểm thì làm hai lần"],
              ["Tẩy da chết", "Lấy lớp tế bào chết cho da sáng và mịn hơn", "Chọn loại theo da, đúng thời gian của hãng"],
              ["Làm ấm da", "Khách dễ chịu, da mềm và dễ làm sạch hơn", "Khăn ấm hoặc xông hơi; da đang đỏ thì bỏ qua"],
              ["Lấy nhân mụn, nếu cần", "Lấy vài nhân nhỏ cho da thông thoáng", "Chỉ người đã được đào tạo, ở nơi quy định cho phép"],
              ["Mặt nạ và massage", "Chăm sóc theo loại da, giúp khách thư giãn", "Có tiệm massage trước mặt nạ, có tiệm làm sau"],
              ["Nước cân bằng, dưỡng ẩm", "Giữ nước và bảo vệ hàng rào da", "Kem hợp với loại da"],
              ["Chống nắng", "Bảo vệ da khi khách ra ngoài", "Là bước cuối nếu buổi làm vào sáng hay ban ngày"],
            ],
          },
        },
        { p: "Trước tất cả các bước này là việc xem da. Loại da và tình trạng da hôm đó quyết định bạn chọn sản phẩm nào và bỏ bước nào. Cách xem có trong bài [Soi da và tư vấn](lesson:spa-soi-da)." },
      ],
    },
    {
      id: "lam-sach-hai-lan",
      title: "Làm sạch hai lần: vì sao tẩy trang rồi vẫn phải rửa mặt",
      blocks: [
        { p: "Làm sạch là nền của mọi bước sau. Với khách có trang điểm, người làm spa làm sạch hai lần, mỗi lần một việc khác nhau." },
        {
          ul: [
            "**Lần một, tẩy trang.** Lấy đi lớp trang điểm và lớp kem chống nắng nằm trên bề mặt.",
            "**Lần hai, sữa rửa mặt hợp với loại da.** Đến lúc này mới là làm sạch chính làn da.",
          ],
        },
        { p: "Bỏ qua lần hai thì mọi thứ thoa sau đó, từ sản phẩm tẩy da chết đến kem dưỡng, chỉ nằm trên một lớp cặn." },
        { h3: "Vùng mắt và môi" },
        { p: "Da quanh mắt và môi rất mỏng, nên ở đây không chà. Đặt miếng bông thấm ướt lên mắt đang nhắm, giữ vài giây cho lớp mascara mềm ra, rồi lau nhẹ. Sản phẩm không được chảy vào mắt." },
        { img: { src: img("tay-trang-mat-bang-bong-truoc-khi-facial"), alt: "Bàn tay chuyên viên đặt miếng bông tròn lên mắt đang nhắm của khách nữ đeo băng đô trắng nằm trên giường spa", caption: "Đặt bông lên mắt vài giây cho mascara mềm ra rồi mới lau, không chà." } },
      ],
    },
    {
      id: "tay-da-chet",
      title: "Tẩy da chết: chọn theo loại da, và tác hại của tẩy quá tay",
      blocks: [
        { p: "Tẩy da chết lấy đi lớp tế bào chết trên bề mặt, cho da sáng và mịn hơn. Trong tiệm thường gặp ba kiểu, và chọn kiểu nào là tùy làn da đang nằm trước mặt bạn." },
        {
          table: {
            head: ["Kiểu tẩy da chết", "Dùng cho da nào, dùng thế nào"],
            rows: [
              ["Men enzyme", "Dịu nhẹ, thường hợp với da nhạy cảm, da mỏng"],
              ["Axit nhẹ", "Da dày, nhiều dầu có thể chịu được"],
              ["Hạt", "Hạt phải thật mịn, và chà thật nhẹ"],
            ],
          },
        },
        { p: "Dù là kiểu nào, hãy để đúng thời gian hãng ghi. Để lâu thêm “cho chắc” không làm da sạch hơn." },
        { img: { src: img("thoa-tay-da-chet-bang-co-va-dong-ho-cat"), alt: "Chuyên viên dùng cọ thoa một lớp sản phẩm trong lên má khách, mắt khách che hai miếng bông, trên xe đẩy có chiếc đồng hồ cát", caption: "Thoa lớp mỏng bằng cọ, che mắt, và canh đúng thời gian của hãng." } },
        { h3: "Tẩy quá tay: da đẹp hôm đó, đỏ rát vài ngày sau" },
        { p: "Có một chuyện rất hay gặp. Thấy da khách sần, người làm tẩy thật kỹ, tẩy nhiều lần, lại chồng lên sản phẩm axit hay retinoid khách đang dùng ở nhà. Hôm đó da trông bóng mịn. Vài ngày sau da đỏ, rát, châm chích khi thoa kem, có khi bong từng mảng. Đó là hàng rào bảo vệ của da đã bị tổn thương, và da cần thời gian, có khi vài tuần, mới hồi lại." },
        { note: "Luôn hỏi khách đang bôi gì ở nhà trước khi chọn sản phẩm tẩy da chết. Nếu khách đang dùng axit hay retinoid, phần tẩy ở tiệm là chồng thêm lên, nên chỉ tẩy vừa đủ và thật dịu.", kind: "warn", title: "Hỏi trước khi tẩy" },
      ],
    },
    {
      id: "khan-am-xong-hoi",
      title: "Khăn ấm và xông hơi mặt: để làm gì, khi nào bỏ qua",
      blocks: [
        { p: "Sau tẩy da chết là bước làm ấm da, bằng khăn ấm hoặc hơi nước. Mục đích khá giản dị: khách dễ chịu, da mềm hơn và dễ làm sạch hơn. Vì mục đích chỉ có vậy, bước này không cần nóng và không cần lâu." },
        {
          ul: [
            "**Khăn ấm:** chỉ ấm, không nóng. Thử trên cổ tay mình trước khi đặt lên mặt khách.",
            "**Máy xông hơi:** đặt cách mặt đủ xa, và không xông lâu.",
          ],
        },
        { img: { src: img("xong-hoi-da-mat-may-dat-cach-xa"), alt: "Máy xông hơi màu trắng đặt cách mặt khách chừng một cánh tay, làn hơi mỏng bay về phía khách đang nằm che mắt bằng bông, chuyên viên đứng bên cạnh", caption: "Máy xông đặt đủ xa, hơi chỉ thoảng tới mặt, mắt khách được che." } },
        { p: "Hơi nóng làm làn da nhạy cảm, đang đỏ càng đỏ thêm. Với da rất nhạy cảm, da đang đỏ, hay da có mạch máu nhỏ hiện rõ, hãy bỏ bước xông, hoặc chỉ dùng khăn mát, ẩm." },
        { img: { src: img("da-nhay-cam-do-ma-khong-nen-xong-hoi"), alt: "Cận cảnh gương mặt một phụ nữ đeo băng đô trắng đang nhắm mắt, hai má và cánh mũi ửng đỏ với vài mạch máu nhỏ li ti", caption: "Da đang đỏ, mạch máu nhỏ hiện rõ: không xông hơi, chỉ dùng khăn mát ẩm." } },
      ],
    },
    {
      id: "lay-nhan-mun",
      title: "Lấy nhân mụn ở spa: bước dễ gây hại nhất nếu làm sai",
      blocks: [
        { p: "Trong cả buổi facial, lấy nhân mụn là bước dễ để lại hậu quả nhất. Vì vậy nó có điều kiện trước khi có kỹ thuật: chỉ làm khi bạn đã được đào tạo, và khi quy định nơi bạn làm việc cùng với tiệm cho phép. Khi đã đủ điều kiện, cách làm vẫn rất dè dặt:" },
        {
          ul: [
            "Luôn đeo găng.",
            "Quấn khăn giấy mềm quanh đầu ngón tay, rồi ấn thật nhẹ hai bên nhân mụn.",
            "Không dùng móng tay, không nặn mạnh, không cố lấy cho bằng được. Nhân không ra thì để đó.",
            "Vài nhân nhỏ, trong thời gian ngắn, là đủ.",
          ],
        },
        { h3: "Dụng cụ nặn mụn phải được tiệt trùng" },
        { p: "Dụng cụ nặn mụn bằng kim loại, và bất cứ thứ gì có thể làm trầy da, phải được làm sạch và tiệt trùng sau mỗi khách, rồi cất trong túi kín. Lau cồn là chưa đủ. [Hướng dẫn vệ sinh của thành phố Helsinki](https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf) ghi rõ dụng cụ nặn mụn phải được tiệt trùng. Kim chích chỉ dùng một lần, và chỉ khi quy định nơi bạn làm việc cho phép. Các bước tiệt trùng có trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
        { img: { src: img("dung-cu-lay-nhan-mun-trong-tui-tiet-trung"), alt: "Mặt xe đẩy đá cẩm thạch với cây nặn mụn bằng thép nằm trong túi tiệt trùng dán kín, ba kim chích đóng vỉ riêng, bông, khăn giấy và găng tay đen", caption: "Cây nặn mụn nằm trong túi tiệt trùng còn kín; kim chích đóng gói riêng, dùng một lần." } },
        { note: "Được lấy nhân mụn đến đâu, có được dùng kim chích hay không là chuyện của quy định nơi bạn làm việc, và mỗi nước một khác. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nước một khác" },
      ],
    },
    {
      id: "mat-na-duong-am-chong-nang",
      title: "Mặt nạ, nước cân bằng, dưỡng ẩm và kem chống nắng",
      blocks: [
        { p: "Da đã sạch và thông thoáng, giờ mới đến phần nuôi dưỡng. Mặt nạ cũng chọn theo da:" },
        {
          table: {
            head: ["Loại mặt nạ", "Hợp với"],
            rows: [
              ["Đất sét", "Da dầu, da bít tắc"],
              ["Dạng kem, dạng gel", "Da khô, da thiếu nước, da nhạy cảm"],
            ],
          },
        },
        { p: "Mặt nạ được thoa bằng cọ, đều tay, tránh mắt, lỗ mũi và môi, và để đúng thời gian của hãng. Riêng với đất sét, đừng để mặt nạ khô nứt quá lâu trên da khô." },
        { img: { src: img("dap-mat-na-dat-set-bang-co"), alt: "Chuyên viên dùng cọ thoa mặt nạ đất sét màu xanh nhạt lên mặt khách, chừa vùng mắt đang che bông, lỗ mũi và môi" } },
        { p: "Massage mặt giúp khách thư giãn; có tiệm làm trước mặt nạ, có tiệm làm sau. Chủ đề này có bài riêng: [massage mặt, hiểu đúng trước khi làm](lesson:spa-massage-mat-hieu-dung)." },
        { p: "Kết thúc buổi làm là nước cân bằng, lau nhẹ hay vỗ nhẹ, rồi kem dưỡng ẩm hợp với loại da để giữ nước và bảo vệ hàng rào da. Nếu là buổi sáng hay ban ngày, kem chống nắng là bước cuối cùng. Đây cũng là lời dặn đáng nói nhất với khách: kem chống nắng mỗi sáng là thói quen rất quan trọng ở nhà, nhất là sau khi tẩy da chết." },
      ],
    },
    {
      id: "ve-sinh-va-phan-ung-da",
      title: "Vệ sinh, thử sản phẩm và cách xử lý khi da phản ứng",
      blocks: [
        { p: "Vệ sinh trong chăm sóc da rất dễ bị xem nhẹ, vì không có dũa, không có kềm, không thấy bụi. Có bốn việc cố định cho mỗi khách:" },
        {
          ul: [
            "Rửa tay trước mỗi khách, theo cách trong bài [Rửa tay và găng tay](lesson:rua-tay-gang-tay).",
            "Lấy kem ra khỏi hũ bằng que sạch, không bao giờ thò ngón tay vào hũ.",
            "Cọ, bát, dụng cụ: dùng một lần, hoặc làm sạch và khử khuẩn sau mỗi khách.",
            "Khăn, băng đô, ga giường: thay mới cho từng khách.",
          ],
        },
        { img: { src: img("lay-kem-duong-bang-que-sach"), alt: "Chuyên viên dùng que gỗ nhỏ lấy kem từ hũ trắng đặt trên xe đẩy đá cẩm thạch, khách nằm trên giường spa phía sau" } },
        { note: "Hũ kem dùng chung cho nhiều khách: chỉ một lần thò ngón tay là cả hũ nhiễm bẩn cho những khách sau. Luôn để sẵn que sạch trên xe đẩy.", kind: "tip", title: "Kinh nghiệm trong nghề" },
        { h3: "Thử sản phẩm mới trên một vùng da nhỏ" },
        { p: "Khi dùng một sản phẩm mới cho khách, nhất là khách da nhạy cảm hay từng bị dị ứng, hãy thử trước trên một vùng da nhỏ, theo hướng dẫn của hãng. Thử rồi cũng không phải là bảo đảm tuyệt đối, nhưng giúp tránh được nhiều phản ứng. Bài [Dị ứng và hóa chất trong tiệm](lesson:di-ung-hoa-chat) nói kỹ hơn về chuyện này." },
        { img: { src: img("thu-san-pham-tren-vung-da-nho-o-canh-tay"), alt: "Chuyên viên dùng tăm bông chấm một ít kem lên mặt trong cẳng tay của khách nữ mặc áo choàng trắng để thử sản phẩm" } },
        { h3: "Da khách đỏ, rát, ngứa ngay trong buổi làm" },
        { p: "Dấu hiệu phải dừng là da đỏ, rát, ngứa nhiều, hay châm chích không dứt. Lúc đó làm theo thứ tự sau:" },
        {
          ol: [
            "Dừng ngay sản phẩm đó.",
            "Lau sạch nhẹ nhàng bằng nước mát, rồi đắp khăn mát.",
            "Không thoa thêm sản phẩm khác lên để chữa.",
            "Ghi lại tên sản phẩm, số lô và chuyện đã xảy ra.",
          ],
        },
        { img: { src: img("dap-bong-mat-khi-da-mat-bi-do-rat"), alt: "Chuyên viên áp miếng bông ẩm mát lên gò má đang ửng đỏ của khách nằm trên giường spa, tay kia đỡ nhẹ bên mặt" } },
        { note: "Sưng mặt, sưng môi hay khó thở là phản ứng nặng: gọi ngay 112, hoặc số cấp cứu nơi bạn ở. Cách xử lý từng tình huống có trong bài [Xử lý sự cố trong tiệm](lesson:xu-ly-su-co).", kind: "warn", title: "Khi nào gọi cấp cứu" },
        { p: "Ghi chép là thứ giúp lần hẹn sau an toàn hơn. Trong VaraaAi, bạn ghi vào ghi chú nội bộ trong [sổ khách hàng](lesson:khach-hang) những sản phẩm đã dùng, phản ứng nếu có và số lô, để lần sau tránh được. Dịch vụ chăm sóc da mặt thì [đưa lên trang đặt lịch](lesson:dich-vu) như mọi dịch vụ khác của tiệm." },
      ],
    },
  ],
  faq: [
    {
      q: "Facial là gì, gồm những bước nào?",
      a: "Facial là một buổi chăm sóc da mặt tại spa. Thứ tự cơ bản gồm làm sạch, tẩy da chết, làm ấm da bằng khăn ấm hay xông hơi, lấy nhân mụn nếu cần, mặt nạ và massage, nước cân bằng, dưỡng ẩm, và kem chống nắng nếu là ban ngày. Buổi làm đi từ sạch, đến thông thoáng, rồi nuôi dưỡng và bảo vệ da.",
    },
    {
      q: "Vì sao chăm sóc da mặt phải làm sạch hai lần?",
      a: "Lần đầu là tẩy trang, lấy đi lớp trang điểm và kem chống nắng. Lần hai dùng sữa rửa mặt hợp với loại da để làm sạch chính làn da. Bỏ lần hai thì các sản phẩm thoa sau đó chỉ nằm trên một lớp cặn.",
    },
    {
      q: "Tẩy da chết quá nhiều thì da bị sao?",
      a: "Tẩy quá kỹ, tẩy nhiều lần, hoặc chồng lên sản phẩm axit hay retinoid đang dùng ở nhà có thể làm tổn thương hàng rào bảo vệ của da. Vài ngày sau da đỏ, rát, châm chích khi thoa kem, có khi bong từng mảng. Da cần thời gian, có khi vài tuần, mới hồi lại.",
    },
    {
      q: "Da nhạy cảm, đang đỏ có nên xông hơi mặt không?",
      a: "Không nên. Hơi nóng làm làn da nhạy cảm, đang đỏ càng đỏ thêm. Với da rất nhạy cảm, da đang đỏ hay có mạch máu nhỏ hiện rõ, bước xông hơi được bỏ qua, hoặc thay bằng khăn mát, ẩm.",
    },
    {
      q: "Nặn mụn ở spa có an toàn không?",
      a: "Lấy nhân mụn là bước dễ gây hại nhất nếu làm sai. Người làm phải đã được đào tạo và được quy định nơi làm việc cho phép, đeo găng, quấn khăn giấy quanh đầu ngón tay, ấn thật nhẹ và không cố lấy nhân không ra. Dụng cụ nặn mụn phải được làm sạch và tiệt trùng sau mỗi khách. Quy định về việc này mỗi nước một khác.",
    },
    {
      q: "Đang chăm sóc da mặt mà da bị đỏ rát thì làm gì?",
      a: "Dừng ngay sản phẩm đang dùng, lau sạch nhẹ nhàng bằng nước mát và đắp khăn mát. Không thoa thêm sản phẩm khác lên để chữa, và ghi lại tên sản phẩm, số lô. Nếu sưng mặt, sưng môi hay khó thở thì gọi 112 hoặc số cấp cứu nơi bạn ở.",
    },
  ],
  related: ["spa-facial", "spa-soi-da-hieu-dung", "spa-massage-mat-hieu-dung", "di-ung-hoa-chat"],
};

export default article;
