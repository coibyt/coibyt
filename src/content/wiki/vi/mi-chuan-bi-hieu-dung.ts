import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-chuan-bi-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "truoc-khi-noi-mi-can-biet-gi",
  lesson: "mi-chuan-bi-hieu-dung",
  category: "lash",
  title: "Trước khi nối mi cần biết gì: tư vấn, thử keo và những lúc chưa nên làm",
  metaTitle: "Trước khi nối mi cần biết gì: tư vấn, thử keo, an toàn",
  metaDescription:
    "Trước khi nối mi cần biết gì: câu hỏi tư vấn về dị ứng và mắt, khi nào chưa nên làm, keo cyanoacrylate, thử keo trước 24–48 giờ và vì sao thử keo chưa đủ.",
  keyword: "trước khi nối mi cần biết gì",
  keywords: ["thử keo nối mi", "test keo nối mi trước bao lâu", "dị ứng keo nối mi", "khi nào không nên nối mi", "mang thai có nối mi được không", "keo nối mi cyanoacrylate", "đeo kính áp tròng nối mi"],
  excerpt: "Mười phút đầu của buổi nối mi quyết định độ bền và sự an toàn. Bài viết giải thích hỏi gì khi tư vấn, khi nào chưa làm, và hiểu đúng về thử keo.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-noi-mi-chuan-bi-khay-dung-cu-truoc-buoi-lam"),
    alt: "Nữ thợ nối mi tóc đen búi cao, mặc áo kem, ngồi bên bàn đá sắp xếp vỉ mi, đá ngọc và nhíp trước buổi làm",
  },
  takeaways: [
    "Buổi nối mi nào cũng bắt đầu bằng **tư vấn**, kể cả với khách quen. Hỏi chuyện an toàn trước, chuyện đẹp sau.",
    "Mắt đỏ, chảy nước, có lẹo, bờ mi sưng hay đóng vảy, hoặc mới mổ mắt: hôm nay chưa làm.",
    "Keo nối mi là cyanoacrylate, bay hơi khi khô, nên mắt khách nhắm kín suốt buổi. Dị ứng với keo có thể **hình thành dần** sau nhiều lần làm.",
    "Thử keo trước lần nối đầu tiên, thường từ 24 đến 48 giờ trước, theo cách hãng keo hướng dẫn. **Thử keo không phải là bảo đảm.**",
    "Khách báo đỏ, ngứa, sưng sau khi thử thì không nối, không đổi keo khác để làm luôn, và khuyên khách hỏi bác sĩ.",
  ],
  intro: [
    "Trước khi nối mi cần biết gì là câu hỏi của khách lần đầu, và cũng nên là câu hỏi của người thợ trước mỗi buổi làm. Câu trả lời nằm trong khoảng mười phút đầu tiên: hỏi, nhìn, thử keo, dọn sạch chỗ làm và ghi lại. Mười phút này không ai chụp ảnh, không ai khen, nhưng nó quyết định bộ mi có bền không và khách có an toàn không.",
    "Bài viết này đi theo bài học “Chuẩn bị nối mi: hiểu đúng để an toàn từ phút đầu” trong khóa Nghề Mi của VaraaAi Academy. Đọc xong, bạn biết cần hỏi khách những gì, nhận ra lúc nào nên hẹn khách hôm khác, hiểu vì sao keo nối mi đòi hỏi sự cẩn thận, và giải thích được cho khách ý nghĩa thật của việc thử keo.",
  ],
  sections: [
    {
      id: "vi-sao-tu-van",
      title: "Vì sao buổi nối mi nào cũng bắt đầu bằng tư vấn",
      blocks: [
        { p: "Có một chuyện rất hay gặp. Tiệm đông, thợ vội, chào khách xong là cho nằm luôn. Không hỏi gì, không nhìn kỹ mắt. Vài hôm sau khách nhắn tin: mí mắt sưng, ngứa, đỏ. Lúc đó hỏi lại mới biết khách từng bị phản ứng với keo ở một tiệm khác." },
        { p: "Chỉ một câu hỏi lúc đầu là đã tránh được. Vì vậy tư vấn không dành riêng cho khách mới. Khách quen cũng được hỏi lại, vì sức khỏe, thuốc đang dùng và cả phản ứng với keo đều có thể thay đổi giữa hai lần hẹn." },
        { img: { src: img("tu-van-khach-truoc-khi-noi-mi-bang-may-tinh-bang"), alt: "Thợ nối mi mặc áo kem ngồi cạnh khách trên ghế sofa, cùng xem phiếu tư vấn trên máy tính bảng trong studio mi sang trọng", caption: "Tư vấn diễn ra khi khách còn ngồi và mở mắt, trước khi nằm lên giường." } },
      ],
    },
    {
      id: "hoi-gi-khi-tu-van",
      title: "Tư vấn trước khi nối mi: hỏi những gì",
      blocks: [
        { p: "Thứ tự rất quan trọng: chuyện an toàn hỏi trước, chuyện đẹp hỏi sau. Nếu câu trả lời về an toàn đã cho thấy hôm nay chưa nên làm, bàn về kiểu mi cũng không còn ý nghĩa." },
        {
          table: {
            head: ["Hỏi về", "Câu hỏi cụ thể", "Vì sao cần biết"],
            rows: [
              ["Dị ứng", "Đã từng phản ứng với keo nối mi, thuốc nhuộm mi, nhuộm chân mày hay mỹ phẩm quanh mắt chưa", "Khách từng phản ứng thì dừng lại, không làm cho đến khi rõ ràng"],
              ["Tình trạng mắt", "Có hay khô mắt, đỏ mắt, viêm bờ mi không; có vừa mổ mắt hay điều trị gì ở mắt không", "Mắt đang có vấn đề thì chưa làm"],
              ["Kính áp tròng", "Khách có đang đeo không", "Kính cần được tháo ra trước buổi làm"],
              ["Thuốc đang dùng", "Có đang dùng thuốc gì không", "Một số thuốc, như vài loại thuốc dị ứng hay thuốc trị mụn, có thể làm khô mắt"],
              ["Mang thai", "Khách có đang mang thai không", "Là lý do để hỏi kỹ hơn và làm theo hướng dẫn của hãng keo"],
            ],
          },
        },
        { note: "Với khách đang mang thai, người thợ hỏi kỹ hơn, làm theo hướng dẫn của hãng keo và lời khuyên tại nơi mình làm việc. Thợ nối mi không phải bác sĩ: đừng tự đưa ra lời khuyên y khoa. Khách có câu hỏi về sức khỏe thì khuyên khách hỏi bác sĩ.", kind: "warn", title: "Thợ không phải bác sĩ" },
        { p: "Hỏi xong chuyện an toàn mới đến chuyện đẹp: khách muốn mi tự nhiên hay đậm hơn, làm nghề gì, có hay đi bơi, xông hơi, dụi mắt hay ngủ úp mặt không. Rồi nói thật với khách mi thật của họ chịu được đến đâu. Cách chọn kiểu theo dáng mắt có trong bài [Lash mapping](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "khi-nao-chua-nen-noi-mi",
      title: "Khi nào chưa nên nối mi",
      blocks: [
        { p: "Sau khi hỏi là nhìn. Người thợ xem mắt khách dưới ánh sáng tốt, khi khách còn ngồi và mở mắt." },
        { img: { src: img("kiem-tra-mat-khach-duoi-anh-sang-tot"), alt: "Thợ nối mi đeo găng đen cầm kính lúp quan sát mắt của khách đang ngồi nhìn lên dưới vòng đèn sáng đều", caption: "Nhìn mắt dưới ánh sáng tốt trước khi cho khách nằm." } },
        { p: "Những dấu hiệu sau có nghĩa là hôm nay chưa làm:" },
        {
          ul: [
            "Mắt đỏ hoặc chảy nước.",
            "Có lẹo.",
            "Bờ mi sưng hay đóng vảy.",
            "Mới mổ mắt.",
          ],
        },
        { img: { src: img("mat-do-chay-nuoc-chua-nen-noi-mi"), alt: "Cận mặt một phụ nữ nằm trên giường kem, một bên mắt đỏ quanh mí và hơi chảy nước", caption: "Hình minh họa: mắt đỏ và chảy nước. Gặp tình trạng này thì hẹn khách hôm khác." } },
        { p: "Danh sách đầy đủ hơn và cách từ chối cho khéo nằm trong bài học [Khi nào không nên làm](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "keo-noi-mi-va-di-ung",
      title: "Keo nối mi cyanoacrylate và chuyện dị ứng keo",
      blocks: [
        { p: "Keo là lý do chính của mọi sự cẩn thận ở trên. Keo nối mi là cyanoacrylate, khô nhờ hơi ẩm trong không khí. Trong lúc khô, keo bay hơi. Hơi keo làm cay và kích ứng mắt, nên mắt khách phải nhắm kín suốt buổi." },
        { img: { src: img("giot-keo-noi-mi-cyanoacrylate-tren-da-ngoc"), alt: "Bàn tay đeo găng đen cầm nhíp đầu cong giữ một sợi mi nối phía trên giọt keo đen nhỏ đặt trên viên đá ngọc", caption: "Một giọt keo nhỏ trên đá ngọc. Keo bay hơi trong lúc khô, nên giọt keo không đặt ngay dưới mũi khách." } },
        { p: "Điều quan trọng nhất cần hiểu: dị ứng với keo có thể hình thành dần dần. Có khách làm mười lần không sao, đến lần thứ mười một mới phản ứng. Người thợ cũng vậy, vì ngày nào cũng hít hơi keo. Bài học [Dị ứng hóa chất](lesson:di-ung-hoa-chat) nói kỹ hơn về chuyện này." },
        { img: { src: img("mi-mat-do-sung-do-di-ung-keo-noi-mi"), alt: "Cận mặt một phụ nữ không trang điểm với hai mí mắt trên hơi sưng và ửng đỏ, dấu hiệu của phản ứng dị ứng quanh mắt", caption: "Hình minh họa phản ứng quanh mắt: mí sưng, đỏ. Khách có dấu hiệu như vậy cần hỏi bác sĩ." } },
      ],
    },
    {
      id: "thu-keo-noi-mi",
      title: "Thử keo nối mi: trước bao lâu, và vì sao không phải là bảo đảm",
      blocks: [
        { p: "Vì dị ứng có thể hình thành dần như vậy, nhiều hãng keo và nhiều tiệm khuyên thử keo trước lần nối đầu tiên, thường từ 24 đến 48 giờ trước buổi làm. Cách thử làm theo hướng dẫn của hãng keo. Thường là gắn vài sợi mi ở đuôi mắt, hoặc chấm một chút keo gần chân mi, rồi cho khách về. Khách để ý xem có đỏ, ngứa, sưng hay không và báo lại cho tiệm." },
        { img: { src: img("thu-keo-noi-mi-vai-soi-o-duoi-mat"), alt: "Cận cảnh một mắt nhắm của khách có miếng lót trắng bên dưới, vài sợi mi nối dài hơn được gắn ở đuôi mắt để thử keo", caption: "Một cách thử hay gặp: vài sợi mi ở đuôi mắt." } },
        { h3: "Hiểu đúng kết quả thử keo" },
        { p: "Lần thử không phản ứng không có nghĩa là sau này sẽ không bao giờ phản ứng. Thử keo chỉ giúp phát hiện sớm những khách đã nhạy cảm sẵn. Vì vậy mỗi lần khách quay lại, người thợ vẫn hỏi một câu: “Lần trước làm xong, mắt chị có sao không?” Khách nói có thì dừng lại, và không làm cho đến khi rõ ràng." },
        { h3: "Khi khách báo có phản ứng" },
        {
          ol: [
            "Hôm đó không nối. Nói với khách thật nhẹ nhàng.",
            "Khuyên khách hỏi ý kiến bác sĩ.",
            "Ghi lại kết quả, để không ai trong tiệm vô tình làm cho khách.",
          ],
        },
        { note: "Đừng vì tiếc khách mà đổi sang một loại keo khác rồi làm luôn. Bạn không biết khách phản ứng với chất nào, và lần sau có thể nặng hơn.", kind: "warn", title: "Không đổi keo để làm tiếp" },
        { note: "Thời gian và cách thử keo luôn theo hướng dẫn của hãng keo. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước, bạn cần xem quy định nơi mình làm việc. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Theo hãng keo và quy định địa phương" },
      ],
    },
    {
      id: "phong-va-ve-sinh",
      title: "Phòng làm việc: độ ẩm, nhiệt độ và vệ sinh",
      blocks: [
        { p: "Căn phòng cũng là một phần của sự chuẩn bị. Mỗi hãng keo ghi một khoảng độ ẩm và nhiệt độ phù hợp, và người thợ giữ phòng trong đúng khoảng đó. Phòng thoáng khí, chai keo được đậy nắp ngay sau khi lấy keo." },
        { img: { src: img("phong-noi-mi-giu-do-am-va-nhiet-do"), alt: "Một góc studio nối mi không có người, trên bệ đá cạnh cửa sổ có máy tạo ẩm nhỏ đang phun sương bên bình hoa trắng" } },
        {
          table: {
            head: ["Vật dụng", "Cách xử lý"],
            rows: [
              ["Giường", "Lau sạch cho từng khách"],
              ["Khăn trải và miếng lót đầu", "Thay mới cho từng khách"],
              ["Chổi chải mi, cọ nhỏ, miếng lót dưới mắt", "Đồ dùng một lần"],
              ["Nhíp", "Làm sạch và khử khuẩn sau mỗi khách"],
            ],
          },
        },
        { img: { src: img("khu-khuan-nhip-va-bo-do-dung-mot-lan"), alt: "Bàn tay đeo găng đen thả hai cây nhíp vào hộp dung dịch khử khuẩn, bên cạnh là thùng rác có nắp chứa chổi chải mi đã dùng", caption: "Sau mỗi khách: đồ dùng một lần bỏ đi, nhíp được làm sạch và khử khuẩn." } },
        { p: "Khách nằm sát mặt bạn suốt hai tiếng. Một chỗ làm sạch sẽ là thứ khách nhìn thấy và yên tâm. Quy trình xử lý nhíp có trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
      ],
    },
    {
      id: "ghi-ho-so-khach",
      title: "Ghi hồ sơ khách: chỉ khi khách đồng ý, và giữ kín",
      blocks: [
        { p: "Việc cuối cùng của mười phút đầu là ghi lại: khách trả lời những gì, ngày thử keo, kết quả, loại keo đã dùng, độ dài và độ cong. Nhiều tiệm còn cho khách đọc và đồng ý bằng văn bản trước lần đầu." },
        { img: { src: img("ghi-ho-so-khach-va-ngay-thu-keo"), alt: "Thợ nối mi mặc áo kem ngồi bên bàn đá cạnh cửa sổ, nhập ghi chú về khách vào máy tính bảng, bên cạnh có tách trà" } },
        { p: "Trong VaraaAi, bạn ghi những điều này vào “Ghi chú nội bộ” trong hồ sơ [khách hàng](lesson:khach-hang), phần chỉ salon mới thấy. Lần sau dù thợ nào làm, mở hồ sơ ra là biết ngay. Đây là thông tin sức khỏe, chuyện riêng tư của khách, nên chỉ ghi khi khách đồng ý và giữ thật kín." },
        { p: "Với khách lần đầu, bạn có thể đặt hai mốc trên [lịch hẹn](lesson:lich-hen): buổi thử keo và buổi nối, cách nhau theo hướng dẫn của hãng keo. Phần thao tác tại giường, từ rửa mi đến dán miếng lót, có trong bài thực hành [chuẩn bị trước khi nối mi từng bước](lesson:mi-chuan-bi)." },
      ],
    },
  ],
  faq: [
    {
      q: "Trước khi nối mi có cần thử keo không?",
      a: "Nhiều hãng keo và nhiều tiệm khuyên thử keo trước lần nối đầu tiên, thường từ 24 đến 48 giờ trước buổi làm, theo đúng cách hãng keo hướng dẫn. Khách theo dõi xem có đỏ, ngứa hay sưng không rồi báo lại cho tiệm.",
    },
    {
      q: "Thử keo không sao thì có chắc không bị dị ứng keo nối mi không?",
      a: "Không chắc. Thử keo không phải là bảo đảm, vì dị ứng với keo có thể hình thành dần sau nhiều lần tiếp xúc. Thử keo chỉ giúp phát hiện sớm những người đã nhạy cảm sẵn, nên lần nào quay lại thợ cũng cần hỏi mắt khách có sao không.",
    },
    {
      q: "Khi nào không nên nối mi?",
      a: "Khi mắt đỏ, chảy nước, có lẹo, bờ mi sưng hay đóng vảy, hoặc mới mổ mắt thì hôm đó chưa làm. Khách từng có phản ứng sau khi thử keo cũng không nối, và nên hỏi ý kiến bác sĩ.",
    },
    {
      q: "Đang mang thai có nối mi được không?",
      a: "Người thợ không đưa ra lời khuyên y khoa cho câu hỏi này. Khi khách mang thai, thợ hỏi kỹ hơn, làm theo hướng dẫn của hãng keo và lời khuyên tại nơi mình làm việc. Khách có băn khoăn về sức khỏe thì nên hỏi bác sĩ trước.",
    },
    {
      q: "Vì sao phải nhắm mắt suốt buổi nối mi?",
      a: "Keo nối mi là cyanoacrylate, khô nhờ hơi ẩm và bay hơi trong lúc khô. Hơi keo làm cay và kích ứng mắt, nên mắt khách nhắm kín suốt buổi. Mở mắt là hơi keo vào mắt.",
    },
    {
      q: "Khách bị đỏ, ngứa sau khi thử keo thì có đổi keo khác để nối được không?",
      a: "Không nên. Thợ không biết khách phản ứng với chất nào, và lần sau phản ứng có thể nặng hơn. Hôm đó không nối, khuyên khách hỏi bác sĩ và ghi lại kết quả để cả tiệm cùng biết.",
    },
  ],
  related: ["mi-chuan-bi", "mi-classic-hieu-dung", "di-ung-hoa-chat", "khi-nao-khong-lam"],
};

export default article;
