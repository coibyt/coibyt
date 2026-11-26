import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-chuan-bi/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "chuan-bi-truoc-khi-noi-mi",
  lesson: "mi-chuan-bi",
  category: "lash",
  title: "Chuẩn bị trước khi nối mi: 11 bước từ phiếu tư vấn đến khay dụng cụ",
  metaTitle: "Chuẩn bị trước khi nối mi: 11 bước cho thợ mi",
  metaDescription:
    "Các bước chuẩn bị trước khi nối mi: phiếu tư vấn, nhìn mắt, thử keo, giường và đèn, tháo kính áp tròng, tẩy trang không dầu, rửa mi, dán miếng lót, primer.",
  keyword: "chuẩn bị trước khi nối mi",
  keywords: ["nối mi cần chuẩn bị gì", "cách dán miếng lót mắt khi nối mi", "rửa mi trước khi nối", "primer nối mi dùng thế nào", "tẩy trang trước khi nối mi", "dán băng dính khi nối mi", "quy trình chuẩn bị nối mi"],
  excerpt: "Mọi việc diễn ra trước sợi mi đầu tiên: tư vấn, nhìn mắt, thử keo, dọn giường, rửa mi, dán miếng lót và sắp khay, kèm những lỗi làm khách cộm và cay mắt.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-noi-mi-chuan-bi-giuong-trong-studio"),
    alt: "Nữ thợ nối mi mặc áo kem trải khăn mới lên giường làm mi trong một studio rộng ốp đá trắng, rèm nhung tím",
  },
  takeaways: [
    "Tư vấn khi khách **còn mở mắt**, bằng phiếu giấy hay máy tính bảng, rồi cho khách đọc lại và đồng ý.",
    "Khách lần đầu: thử keo theo hướng dẫn của hãng keo, thường 24 đến 48 giờ trước, **bằng đúng loại keo sẽ dùng**, và ghi ngày thử.",
    "Mi phải sạch dầu và khô hoàn toàn: tẩy trang không dầu, rửa mi từ chân ra ngọn, xả nước, làm khô bằng quạt nhỏ.",
    "Miếng lót che kín toàn bộ mi dưới, mép trên sát dưới hàng mi dưới nhưng **không chạm viền mắt**.",
    "Băng dính chỉ dán lên miếng lót và da má. Miếng lót và băng dính không bao giờ chạm vào con mắt.",
  ],
  intro: [
    "Chuẩn bị trước khi nối mi là toàn bộ những việc diễn ra từ lúc khách bước vào cho tới ngay trước sợi mi đầu tiên. Phần này không có gì để chụp ảnh, nhưng một miếng lót dán lệch hay một hàng mi còn dính dầu sẽ theo người thợ suốt hai tiếng sau đó.",
    "Bài viết này viết lại bài học “Chuẩn bị nối mi: thực hành từng bước” trong khóa Nghề Mi của VaraaAi Academy. Bạn sẽ đi qua mười một bước theo đúng thứ tự của video, từ phiếu tư vấn đến khay dụng cụ, và dừng lại ở chỗ bài [cách nối mi classic](lesson:mi-classic) bắt đầu gắn mi.",
  ],
  sections: [
    {
      id: "noi-mi-can-chuan-bi-gi",
      title: "Nối mi cần chuẩn bị gì: ba nhóm việc",
      blocks: [
        { p: "Nếu gom mười một bước lại, phần chuẩn bị gồm ba nhóm việc. Nhớ ba nhóm này thì dù quên thứ tự chi tiết, bạn cũng không bỏ sót việc nào." },
        {
          table: {
            head: ["Nhóm việc", "Gồm những gì", "Để làm gì"],
            rows: [
              ["Với khách", "Tư vấn, nhìn mắt và mi thật, dặn dò trước khi nằm, thử keo với khách lần đầu", "Biết hôm nay có nên làm không, và khách biết điều gì sắp diễn ra"],
              ["Với chỗ làm", "Giường lau sạch, khăn và miếng lót đầu mới, đèn, tay rửa sạch và găng mới, khay dụng cụ", "Mọi thứ chạm vào khách đều sạch, thợ không phải rời giường giữa chừng"],
              ["Với hàng mi", "Tháo kính áp tròng, tẩy trang, rửa mi, làm khô, miếng lót, băng dính, chải mi, primer", "Mi sạch dầu, khô, tách đều, mi dưới được che kín"],
            ],
          },
        },
        { p: "Lý do đằng sau từng câu hỏi tư vấn, cách hiểu kết quả thử keo và những lúc phải hẹn khách hôm khác được giải thích trong bài lý thuyết [trước khi nối mi cần biết gì](lesson:mi-chuan-bi-hieu-dung)." },
      ],
    },
    {
      id: "mi-sach-dau-va-kho",
      title: "Vì sao mi phải sạch dầu và khô hoàn toàn trước khi nối",
      blocks: [
        { p: "Keo nối mi bám lên sợi mi sạch và khô. Dầu từ kem dưỡng, phấn mắt hay mascara còn sót lại làm keo bám kém, dù phần gắn mi sau đó có làm cẩn thận đến đâu. Vì vậy có tới ba lớp làm sạch nối tiếp nhau: khách tẩy trang, thợ rửa mi, rồi primer nếu hãng keo khuyên dùng." },
        { img: { src: img("tay-trang-mat-khong-dau-truoc-khi-noi-mi"), alt: "Khách nữ tóc vàng mặc áo len kem ngồi trên ghế, tự lau vùng mắt bằng miếng bông tẩy trang trước buổi nối mi", caption: "Tẩy sạch phấn mắt, mascara và kem dưỡng bằng nước tẩy trang không dầu." } },
        { p: "Nước tẩy trang phải là loại không dầu, nếu không chính bước làm sạch lại để dầu trên mi. Sau khi rửa và xả, mi được làm khô thật kỹ. Mi còn ẩm thì keo cũng bám không tốt." },
        { img: { src: img("lam-kho-mi-bang-quat-nho"), alt: "Bàn tay đeo găng đen cầm một chiếc quạt cầm tay nhỏ màu kem, thổi khô hàng mi của khách đang nằm nhắm mắt", caption: "Quạt nhỏ để cách mặt một khoảng, thổi tới khi mi khô hoàn toàn." } },
        { note: "Kính áp tròng phải được tháo ra trước, vì hơi keo và dung dịch có thể đọng lại dưới kính. Hãy hỏi ngay từ phiếu tư vấn để khách kịp tháo trước khi nằm.", kind: "warn", title: "Kính áp tròng" },
      ],
    },
    {
      id: "loi-mieng-lot-bang-dinh",
      title: "Lỗi khi dán miếng lót mắt và băng dính",
      blocks: [
        { p: "Dán miếng lót là bước hay bị làm ẩu nhất trong cả phần chuẩn bị, và cũng là bước khách cảm nhận rõ nhất." },
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Cách tránh"],
            rows: [
              ["Mép miếng lót chạm viền mắt", "Khách cộm, cay, chảy nước mắt, mắt đỏ sau buổi làm", "Nhờ khách hé mắt nhìn lên khi dán; dán xong hỏi khách có cộm không và chỉnh ngay"],
              ["Miếng lót dán thấp hoặc lệch", "Vài sợi mi dưới lọt ra ở đuôi mắt, dính lên mi trên; khách mở mắt là bị kéo, rất đau", "Nhìn lại thật kỹ dọc theo mép miếng lót, nhất là ở đuôi mắt"],
              ["Băng dính chạm vào con mắt", "Gây cộm và kích ứng mắt; miếng lót và băng dính không bao giờ được chạm vào con mắt", "Mẩu giữ mi dưới chỉ dán lên miếng lót và da má"],
              ["Băng dính nâng mí quá căng", "Khách khó chịu suốt buổi", "Dán nhẹ tay và hỏi khách có thấy căng không"],
            ],
          },
        },
        { note: "Khách thấy cộm thì chỉnh lại ngay. Đừng để khách chịu đựng suốt buổi: mắt khó chịu sẽ động nhiều, và việc gắn mi cũng khó hơn.", kind: "tip", title: "Hỏi một câu sau khi dán" },
      ],
    },
    {
      id: "theo-hang-keo",
      title: "Những điều luôn làm theo hướng dẫn của hãng keo",
      blocks: [
        {
          ul: [
            "Cách thử keo và thời gian chờ sau khi thử.",
            "Có dùng primer hay không, và dùng thế nào.",
            "Khoảng độ ẩm và nhiệt độ phòng phù hợp với keo.",
          ],
        },
        { p: "Thử keo không bảo đảm khách sẽ không phản ứng về sau. Khách đã thử từ trước vẫn được hỏi lại mỗi lần: từ hôm đó đến nay mắt có sao không. Thấy mắt đỏ, chảy nước, có lẹo, bờ mi sưng hay đóng vảy thì dừng lại, như trong bài [Khi nào không nên làm](lesson:khi-nao-khong-lam)." },
        { note: "Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước, bạn cần xem quy định nơi mình làm việc. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "luu-ngay-thu-keo",
      title: "Lưu ngày thử keo và kết quả vào hồ sơ khách",
      blocks: [
        { p: "Ngày thử keo, loại keo và kết quả chỉ có ích khi lần sau người làm tìm lại được. Trong VaraaAi, bạn lưu ba thông tin này vào “Ghi chú nội bộ” trong hồ sơ [khách hàng](lesson:khach-hang). Phần này chỉ salon thấy, và chỉ ghi khi khách đồng ý. Buổi thử keo và buổi nối có thể đặt sẵn thành hai lịch trên [lịch hẹn](lesson:lich-hen), để khách không phải nhớ khoảng cách giữa hai lần." },
      ],
    },
  ],
  howTo: {
    title: "Các bước chuẩn bị trước khi nối mi",
    id: "cac-buoc-chuan-bi-noi-mi",
    after: "noi-mi-can-chuan-bi-gi",
    lead: "Mười một bước theo thứ tự của video bài học. Ba bước đầu diễn ra khi khách còn ngồi và mở mắt.",
    supplies: [
      "Phiếu tư vấn trên giấy hoặc máy tính bảng",
      "Khăn khử khuẩn, khăn trải và miếng lót đầu mới, gối đỡ cổ, chăn mỏng",
      "Găng tay mới",
      "Nước tẩy trang không dầu",
      "Dung dịch rửa mi, cọ mềm, nước sạch, khăn giấy, quạt nhỏ",
      "Miếng lót dưới mắt và băng dính giấy chuyên dụng",
      "Chổi chải mi và cọ nhỏ dùng một lần, primer nếu hãng keo khuyên",
      "Vỉ mi, keo, đá ngọc và hai cây nhíp đã khử khuẩn",
    ],
    steps: [
      {
        name: "Đón khách và tư vấn bằng phiếu",
        text: "Rửa tay, mời khách ngồi khi khách còn mở mắt. Đưa phiếu tư vấn và hỏi về dị ứng, phản ứng cũ với keo hay thuốc nhuộm mi, bệnh về mắt, mổ mắt gần đây, kính áp tròng, thuốc đang dùng và có đang mang thai không. Hỏi kiểu mi khách muốn, rồi cho khách đọc lại và đồng ý.",
        image: { src: img("tu-van-khach-noi-mi-khi-con-mo-mat"), alt: "Thợ nối mi mặc áo kem ngồi đối diện khách trên ghế sofa, cầm bút ghi vào bảng kẹp giấy trong buổi tư vấn" },
      },
      {
        name: "Nhìn mắt và mi thật dưới ánh sáng tốt",
        text: "Đèn sáng đều, khách ngồi và nhìn lên. Tìm các dấu hiệu: mắt đỏ, chảy nước, có lẹo, bờ mi sưng hay đóng vảy. Nhìn luôn mi thật xem dày hay thưa, khỏe hay yếu, có chỗ nào gãy hay rụng thành mảng không. Thấy điều gì không ổn thì dừng lại.",
      },
      {
        name: "Dặn khách trước khi nằm",
        text: "Nói trước rằng buổi nối có thể kéo dài một đến hai tiếng, khách nằm yên và nhắm mắt suốt. Thấy cay, cộm hay muốn nghỉ thì giơ tay ra hiệu, đừng mở mắt. Nhắc khách đi vệ sinh trước khi nằm. Khách biết trước sẽ nằm yên hơn và mắt ít động hơn.",
      },
      {
        name: "Thử keo cho khách lần đầu",
        text: "Làm theo đúng hướng dẫn của hãng keo, thường là 24 đến 48 giờ trước buổi nối: gắn vài sợi mi ở đuôi mắt bằng đúng loại keo sẽ dùng, hoặc chấm một chút keo gần chân mi. Dặn khách về nhà để ý xem có đỏ, ngứa, sưng không và gọi cho tiệm nếu có. Ghi ngày thử, loại keo và kết quả vào hồ sơ; khách đã thử từ trước thì mở hồ sơ ra xem và hỏi lại.",
      },
      {
        name: "Chuẩn bị giường, đèn và đôi tay",
        text: "Lau giường bằng khăn khử khuẩn, trải khăn mới, đặt miếng lót đầu mới, gối đỡ cổ và chăn mỏng. Đèn chiếu sáng đều vào vùng mắt, không chói thẳng vào mặt khách. Để điện thoại im lặng, nhạc nhẹ, nhiệt độ phòng dễ chịu. Sau đó rửa tay và đeo găng mới.",
        image: { src: img("lau-giuong-noi-mi-bang-khan-khu-khuan"), alt: "Hai bàn tay đeo găng đen lau mặt giường làm mi màu kem bằng khăn khử khuẩn, khăn trải mới gấp sẵn bên cạnh", caption: "Giường được lau cho từng khách, khăn trải và miếng lót đầu thay mới." },
      },
      {
        name: "Tháo kính áp tròng và tẩy trang không dầu",
        text: "Khách tháo kính áp tròng trước, vì hơi keo và dung dịch có thể đọng lại dưới kính. Phấn mắt, mascara và kem dưỡng được tẩy sạch bằng nước tẩy trang không dầu. Dầu còn sót trên mi sẽ làm keo bám kém.",
        image: { src: img("thao-kinh-ap-trong-truoc-khi-noi-mi"), alt: "Bàn tay khách đặt kính áp tròng vào hộp đựng nhỏ trên khăn kem, cạnh một lọ dung dịch trên bàn đá trắng" },
      },
      {
        name: "Rửa mi, xả nước và làm khô",
        text: "Khách nằm và nhắm mắt. Dùng dung dịch rửa mi và cọ mềm chải nhẹ từ chân mi ra ngọn. Xả lại bằng nước sạch chảy nhẹ từ trên xuống, có khăn giấy đỡ ở đuôi mắt. Làm khô thật kỹ bằng quạt nhỏ để cách mặt một khoảng, vì mi phải khô hoàn toàn thì keo mới bám tốt.",
        image: { src: img("xa-nuoc-sach-sau-khi-rua-mi"), alt: "Thợ đeo găng đen bóp chai nhỏ xả nước sạch lên hàng mi của khách đang nhắm mắt, tay kia giữ khăn giấy ở đuôi mắt", caption: "Nước chảy nhẹ từ trên xuống, khăn giấy đỡ ở đuôi mắt." },
      },
      {
        name: "Dán miếng lót dưới mắt",
        text: "Miếng lót che kín toàn bộ mi dưới, mép trên nằm sát dưới hàng mi dưới nhưng không chạm viền mắt và không chạm con mắt. Nhờ khách hé mắt nhìn lên trong lúc dán để mép miếng lót nằm gọn dưới hàng mi dưới, rồi cho khách nhắm lại. Hỏi khách có cộm không, cộm thì chỉnh ngay. Cuối cùng nhìn dọc theo mép miếng lót, nhất là đuôi mắt, để chắc không sợi mi dưới nào lọt ra.",
        image: { src: img("dan-mieng-lot-duoi-mat-che-kin-mi-duoi"), alt: "Ngón tay đeo găng đen ấn nhẹ miếng lót trắng dưới mắt khách đang nhắm, miếng lót che kín hàng mi dưới" },
      },
      {
        name: "Dùng băng dính khi cần",
        text: "Còn sợi mi dưới lọt ra thì dán thêm một mẩu băng dính giấy chuyên dụng, chỉ lên miếng lót và da má. Với mắt có mí sụp, nhiều thợ dùng một mẩu băng dính nhỏ để nâng nhẹ da mí và nhìn chân mi cho rõ. Dán nhẹ tay, hỏi khách có thấy căng không, và không bao giờ dán lên con mắt.",
        image: { src: img("dan-bang-dinh-giay-giu-mi-duoi"), alt: "Cận cảnh một mắt nhắm có miếng lót trắng, ngón tay đeo găng đen dán thêm mẩu băng dính giấy ở phía đuôi mắt" },
      },
      {
        name: "Chải mi và dùng primer nếu hãng keo khuyên",
        text: "Chải mi cho các sợi tách ra. Primer giúp làm sạch lớp dầu còn lại để keo bám tốt hơn, và chỉ dùng khi hãng keo khuyên. Dùng cọ nhỏ dùng một lần quét nhẹ lên thân và ngọn mi, tránh xa chân mi và da mí. Sau đó chải lại mi cho các sợi tách đều.",
        image: { src: img("quet-primer-len-than-mi-truoc-khi-noi"), alt: "Cọ nhỏ đầu bông dùng một lần quét nhẹ lên thân hàng mi của khách đang nhắm mắt, bên dưới là miếng lót trắng", caption: "Primer chỉ đi trên thân và ngọn mi, không chạm chân mi và da mí." },
      },
      {
        name: "Sắp khay dụng cụ và hỏi khách lần cuối",
        text: "Trên khay có vỉ mi xếp theo bản đồ mi, đá ngọc với một giọt keo mới, hai cây nhíp đã khử khuẩn, chổi chải mi và cọ nhỏ dùng một lần. Đậy nắp chai keo ngay, kiểm tra lại độ ẩm và nhiệt độ phòng theo hãng keo. Hỏi khách nằm như vậy đã thoải mái chưa, cổ có mỏi không, rồi mới bắt đầu gắn sợi mi đầu tiên.",
      },
    ],
  },
  faq: [
    {
      q: "Nối mi cần chuẩn bị gì trước khi bắt đầu?",
      a: "Phần chuẩn bị gồm tư vấn và nhìn mắt khách, thử keo với khách lần đầu, lau giường và thay khăn mới, cho khách tháo kính áp tròng và tẩy trang không dầu, rửa mi rồi làm khô, dán miếng lót che mi dưới, chải mi và sắp khay dụng cụ. Primer chỉ dùng nếu hãng keo khuyên.",
    },
    {
      q: "Trước khi nối mi có cần tẩy trang không?",
      a: "Có. Phấn mắt, mascara và kem dưỡng cần được tẩy sạch bằng nước tẩy trang không dầu, vì dầu còn sót trên mi làm keo bám kém. Sau đó thợ còn rửa mi bằng dung dịch rửa mi và làm khô hoàn toàn.",
    },
    {
      q: "Đeo kính áp tròng có nối mi được không?",
      a: "Khách cần tháo kính áp tròng trước buổi làm. Hơi keo và dung dịch có thể đọng lại dưới kính, nên kính được tháo ra để bảo vệ mắt.",
    },
    {
      q: "Dán miếng lót mắt khi nối mi thế nào cho đúng?",
      a: "Miếng lót che kín toàn bộ mi dưới, mép trên nằm sát dưới hàng mi dưới nhưng không chạm viền mắt. Chạm viền mắt gây cộm, cay và đỏ mắt; dán thấp quá thì mi dưới lọt ra và bị dính lên mi trên. Nhờ khách hé mắt nhìn lên khi dán và hỏi khách có cộm không.",
    },
    {
      q: "Primer nối mi dùng thế nào?",
      a: "Primer chỉ dùng nếu hãng keo khuyên, theo đúng hướng dẫn của hãng. Dùng cọ nhỏ dùng một lần quét nhẹ lên thân và ngọn mi, tránh xa chân mi và da mí, rồi chải lại mi cho các sợi tách đều.",
    },
    {
      q: "Thử keo nối mi cho khách lần đầu làm thế nào?",
      a: "Làm theo hướng dẫn của hãng keo, thường là 24 đến 48 giờ trước buổi nối, bằng đúng loại keo sẽ dùng: gắn vài sợi mi ở đuôi mắt hoặc chấm một chút keo gần chân mi. Khách theo dõi và báo lại, còn tiệm ghi ngày thử, loại keo và kết quả. Thử keo không bảo đảm khách sẽ không phản ứng về sau.",
    },
  ],
  related: ["mi-chuan-bi-hieu-dung", "mi-classic", "mi-mapping", "ve-sinh-dung-cu"],
};

export default article;
