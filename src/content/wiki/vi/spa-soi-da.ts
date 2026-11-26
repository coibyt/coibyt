import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-soi-da/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-soi-da-xac-dinh-loai-da",
  lesson: "spa-soi-da",
  category: "spa",
  title: "Cách soi da xác định loại da: 10 bước soi da và tư vấn cho khách tại spa",
  metaTitle: "Cách soi da xác định loại da: 10 bước tại spa",
  metaDescription:
    "Hướng dẫn cách soi da xác định loại da từng bước: phiếu tư vấn, làm sạch, soi từng vùng dưới đèn lúp, thử bằng giấy thấm dầu, ghi hồ sơ và chọn liệu trình.",
  keyword: "cách soi da",
  keywords: [
    "cách soi da xác định loại da",
    "quy trình soi da",
    "soi da bằng đèn lúp",
    "thử loại da bằng giấy thấm dầu",
    "các bước tư vấn da cho khách",
    "cách xác định loại da",
    "soi da trước khi làm liệu trình",
  ],
  excerpt: "Quy trình soi da và tư vấn cho một khách mới: hỏi trước, làm sạch, soi năm vùng theo một thứ tự cố định, thử bằng giấy thấm dầu và ghi lại điều mình thấy.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("soi-da-bang-den-lup-cho-khach-tai-spa"),
    alt: "Chuyên viên spa cúi nhìn da mặt khách qua đèn lúp tròn có đèn, khách nằm trên giường với hai miếng bông che mắt, bên cửa sổ vòm",
  },
  takeaways: [
    "Ba điều xuyên suốt: **hỏi trước khi làm**, soi trên **da sạch** dưới ánh sáng tốt, và **không chẩn đoán**.",
    "Che mắt khách bằng bông trước khi kéo đèn lúp lại gần, vì đèn rất sáng.",
    "Soi theo một thứ tự cố định: trán, vùng chữ T, má, hàm và cằm, cổ.",
    "Giấy thấm dầu ấn lên trán, mũi, má: chỗ nào giấy trong lên là chỗ đó nhiều dầu.",
    "Ghi điều mình thấy, không ghi tên bệnh, và chỉ ghi khi khách đồng ý.",
  ],
  intro: [
    "Cách soi da đúng không bắt đầu bằng đèn lúp mà bằng câu hỏi. Trước khi nhìn vào làn da, người làm da cần biết khách dị ứng với gì, đang uống thuốc gì, đang bôi gì ở nhà. Sau đó da được làm sạch, soi từng vùng theo một thứ tự không đổi, thử bằng giấy thấm dầu và đầu ngón tay, rồi mọi thứ được ghi lại. Quy trình này quyết định liệu trình phía sau có hợp với da hay không.",
    "Bài viết đi theo bài học “Soi da và tư vấn: thực hành từng bước” trong khóa Nghề Spa của VaraaAi Academy, làm trên một khách mới. Theo mười bước dưới đây, bạn soi được da, xác định loại da và tình trạng da của khách, và giải thích được cho khách hôm nay nên làm gì. Nếu bạn chưa rõ loại da khác tình trạng da ở đâu, hãy đọc trước bài lý thuyết [Các loại da mặt và tình trạng da](lesson:spa-soi-da-hieu-dung).",
  ],
  sections: [
    {
      id: "ba-dieu-xuyen-suot",
      title: "Ba điều xuyên suốt một buổi soi da",
      blocks: [
        {
          table: {
            head: ["Nguyên tắc", "Vì sao"],
            rows: [
              ["Hỏi trước khi làm", "Thuốc, sản phẩm đang bôi và liệu trình gần đây thay đổi những gì da chịu được, mà mắt thường không thấy"],
              ["Soi trên da sạch, dưới ánh sáng tốt", "Soi khi còn trang điểm hay còn kem là đọc sai ngay từ đầu"],
              ["Không chẩn đoán", "Người làm da tả điều mình thấy. Việc gọi tên bệnh là của bác sĩ"],
            ],
          },
        },
        { note: "Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề. Phạm vi công việc của người làm da và các quy định về vệ sinh khác nhau theo từng nước.", kind: "info", title: "Trước khi bắt đầu" },
      ],
    },
    {
      id: "nhin-gi-o-tung-vung",
      title: "Soi da bằng đèn lúp: nhìn gì ở từng vùng mặt",
      blocks: [
        { p: "Thứ tự cố định có hai lợi ích: không bỏ sót vùng nào, và lần sau dễ so sánh với ghi chú cũ. Mỗi vùng có những thứ riêng cần tìm." },
        {
          table: {
            head: ["Vùng", "Xem gì"],
            rows: [
              ["Trán", "Dầu, lỗ chân lông, nếp nhăn ngang"],
              ["Vùng chữ T (giữa trán, mũi, cằm)", "Thường là nơi bóng dầu và có mụn đầu đen nhiều nhất"],
              ["Hai má", "Đỏ, mạch máu nhỏ, đốm nâu, độ khô"],
              ["Đường hàm và cằm", "Mụn nhỏ, mụn ẩn"],
              ["Cổ", "Da cổ mỏng, cũng cần được chăm như da mặt"],
            ],
          },
        },
        { note: "Nhìn da từ nhiều góc. Nghiêng đèn cho ánh sáng lướt ngang qua da thì thấy rõ bề mặt sần, lỗ chân lông và nếp nhăn nhỏ. Nhìn thẳng thì thấy màu: đỏ, đốm nâu, vết thâm.", kind: "tip", title: "Nghiêng đèn để thấy bề mặt, nhìn thẳng để thấy màu" },
        { p: "Ba chỗ hay bị quên là hai bên tai, chân tóc và dưới cằm. Đó là những nơi hay có mụn nhỏ mà ít ai để ý." },
      ],
    },
    {
      id: "doc-ket-qua-soi-da",
      title: "Cách xác định loại da từ những gì vừa thấy",
      blocks: [
        { p: "Những gì quan sát được dưới đèn và dưới đầu ngón tay ghép lại thành một nhận định. Dưới đây là các tình huống hay gặp nhất." },
        {
          table: {
            head: ["Bạn thấy", "Nhận định", "Lưu ý"],
            rows: [
              ["Bóng dầu ở vùng chữ T, má khô ráo", "Da hỗn hợp", "Mỗi vùng có thể cần cách chăm khác nhau"],
              ["Mụn đầu đen ở mũi và cằm", "Da đang bít tắc", "Lấy nhân mụn chỉ khi đã được học và tiệm cho phép"],
              ["Đỏ ở hai má, mạch máu nhỏ hiện rõ", "Da đang nhạy cảm", "Làm thật nhẹ tay, chọn sản phẩm dịu"],
              ["Đốm nâu trên gò má", "Sắc tố", "Liên quan nhiều đến nắng"],
              ["Giấy thấm dầu trong lên", "Vùng đó nhiều dầu", "Thử khi da đã nghỉ một lúc sau khi rửa mặt"],
              ["Vừa chạm nhẹ đã ửng đỏ", "Da nhạy cảm", "Ghi lại và chọn sản phẩm dịu"],
            ],
          },
        },
        { img: { src: img("luot-dau-ngon-tay-tren-ma-de-cam-nhan-da"), alt: "Khách nằm nhắm mắt, đeo băng đô trắng, chuyên viên spa đặt nhẹ các đầu ngón tay của hai bàn tay lên hai bên má khách", caption: "Lướt nhẹ đầu ngón tay trên má để biết da mịn, ráp hay căng." } },
        { p: "Nhận định này là về loại da và tình trạng da, không phải về bệnh. Một làn da có thể vừa là da hỗn hợp, vừa hơi thiếu nước, vừa bít tắc ở mũi, và cả ba điều ấy đều được ghi lại." },
      ],
    },
    {
      id: "khi-nao-khong-lam",
      title: "Khi nào không làm, và nói với khách thế nào",
      blocks: [
        { p: "Có những điều thấy được ngay từ lúc tư vấn hoặc ngay khi da vừa sạch, và chúng đổi kế hoạch của cả buổi:" },
        {
          ul: [
            "Da cháy nắng.",
            "Vết trầy xước.",
            "Mụn rộp.",
            "Vùng da sưng đỏ, đau.",
          ],
        },
        { p: "Gặp những điều này, bạn không làm trên vùng da đó. Nói nhẹ nhàng, tả điều mình thấy và khuyên khách hỏi bác sĩ. Nếu vì vậy mà hôm nay không làm được liệu trình khách muốn, hãy nói rõ, rồi đề nghị một liệu trình nhẹ hơn hoặc hẹn lại." },
        { note: "Người làm da không chẩn đoán và không hứa chữa khỏi bất kỳ vấn đề da nào. Bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam) nói kỹ về các dấu hiệu phải dừng và cách từ chối cho khéo.", kind: "warn", title: "Thấy điều đáng lo thì chuyển cho bác sĩ" },
      ],
    },
    {
      id: "ve-sinh-va-gang-tay",
      title: "Rửa tay, găng tay và dọn phòng sau mỗi khách",
      blocks: [
        { p: "Trước khi chạm vào khách, rửa tay bằng xà phòng và lau khô, như trong bài [Rửa tay và găng tay](lesson:rua-tay-gang-tay). Khi thử da bằng tay, bạn dùng tay sạch hoặc đeo găng. Đeo găng hay không khi chạm da là theo quy định của tiệm và của nơi bạn làm việc." },
        { p: "Khách về rồi thì thay khăn, thay ga, lau giường và lau đèn lúp, sau đó rửa tay lại. Đèn lúp hay bị quên vì nó không chạm vào khách, nhưng tay bạn chạm vào nó suốt buổi." },
      ],
    },
    {
      id: "ghi-ho-so-va-hen-lich",
      title: "Ghi kết quả soi da vào hồ sơ và đặt lịch lần sau",
      blocks: [
        { p: "Một lần soi da chỉ có giá trị lâu dài khi nó được ghi lại. Trong VaraaAi, bạn ghi kết quả vào ghi chú nội bộ trong hồ sơ khách ở [sổ khách hàng](lesson:khach-hang). Ghi chú này chỉ tiệm mới thấy, và chỉ ghi khi khách đồng ý. Muốn chụp ảnh da để so sánh lần sau thì cũng phải hỏi khách trước." },
        { p: "Khi khách còn ở quầy, hãy đặt luôn [lịch hẹn](lesson:lich-hen) kế tiếp để cùng xem da thay đổi thế nào. Nếu tiệm muốn khách tự đặt buổi soi da và tư vấn trên mạng, bạn [thêm dịch vụ](lesson:dich-vu) này với thời lượng đủ cho cả phần hỏi và phần ghi chép. Các bước của một buổi làm da sau khi soi có trong bài [Chăm sóc da mặt cơ bản](lesson:spa-facial)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước soi da và tư vấn cho khách",
    id: "cac-buoc-soi-da",
    after: "ba-dieu-xuyen-suot",
    lead: "Mười bước theo thứ tự của bài học, từ lúc khách bước vào tới lúc phòng sẵn sàng cho khách kế tiếp.",
    supplies: [
      "Áo choàng, băng đô vải mềm, khăn và chăn đắp cho khách",
      "Phiếu tư vấn và bút",
      "Sản phẩm tẩy trang và sữa rửa mặt, bông tẩy trang",
      "Đèn lúp có đèn và bông che mắt",
      "Giấy thấm dầu",
      "Găng tay, nếu quy định của tiệm yêu cầu",
    ],
    steps: [
      {
        name: "Đón khách và rửa tay",
        text: "Chào khách, mời ngồi, mời một ly nước, rồi mời khách thay áo choàng ở một chỗ kín đáo. Khách đeo kính áp tròng thì mời tháo ra trước, vì đèn lúp rất sáng và có khi phải làm sạch quanh mắt. Đeo băng đô vải mềm để giữ tóc gọn khỏi mặt. Rửa tay bằng xà phòng và lau khô trước khi chạm vào khách.",
        image: { src: img("deo-bang-do-cho-khach-truoc-khi-soi-da"), alt: "Chuyên viên spa đeo băng đô vải trắng cho khách mặc áo choàng trắng đang ngồi trên mép giường trị liệu" },
      },
      {
        name: "Hỏi theo phiếu tư vấn",
        text: "Ngồi ngang tầm mắt với khách và hỏi từ tốn: dị ứng và phản ứng với mỹ phẩm trước đây, thuốc đang dùng, sản phẩm đang bôi ở nhà, nhất là retinoid hay axit, có đang uống isotretinoin không, liệu trình gần đây và chuyện đi nắng. Khách mang thai thì hỏi thêm và chọn sản phẩm theo hướng dẫn của hãng. Hỏi luôn khách mong muốn điều gì, da khó chịu ở đâu. Giải thích vì sao mình hỏi: để chọn đúng sản phẩm và tránh rủi ro. Khách quen cũng hỏi lại.",
        image: { src: img("khach-dua-san-pham-dang-dung-khi-tu-van-da"), alt: "Khách nữ mặc áo choàng kem ngồi trên giường, đưa một tuýp kem trắng không nhãn trong lòng bàn tay cho chuyên viên spa xem", caption: "Hỏi rõ khách đang bôi gì ở nhà, nhất là retinoid hay axit." },
      },
      {
        name: "Dừng lại nếu thấy điều đáng lo",
        text: "Da cháy nắng, vết trầy, mụn rộp, vùng da sưng đỏ và đau: không làm trên vùng đó. Nói nhẹ nhàng, tả điều mình thấy và khuyên khách hỏi bác sĩ. Đừng gọi tên bệnh.",
      },
      {
        name: "Làm sạch để thấy làn da thật",
        text: "Mời khách nằm lên giường, đắp khăn và chăn, chỉ để lộ mặt, cổ và vai. Tẩy trang mắt và môi thật nhẹ, rồi rửa mặt. Lớp trang điểm và lớp kem che mất da thật, nên soi khi chưa sạch là đọc sai từ đầu.",
        image: { src: img("lam-sach-da-mat-truoc-khi-soi-da"), alt: "Khách nằm nhắm mắt, đeo băng đô trắng, hai bàn tay chuyên viên spa thoa sữa rửa mặt màu trắng lên hai má khách" },
      },
      {
        name: "Che mắt khách và soi dưới đèn lúp",
        text: "Đặt bông che mắt khách trước, rồi mới kéo đèn lại gần. Đi lần lượt từng vùng theo cùng một thứ tự: trán, vùng chữ T, hai má, đường hàm và cằm, cuối cùng là cổ. Nghiêng đèn để thấy bề mặt, nhìn thẳng để thấy màu, và đừng quên hai bên tai, chân tóc, dưới cằm.",
        image: { src: img("che-mat-khach-va-soi-da-duoi-den-lup"), alt: "Khách nằm với hai miếng bông trắng che mắt, chuyên viên spa cúi sát nhìn da má khách qua chiếc đèn lúp tròn đang bật sáng", caption: "Bông che mắt đặt trước, đèn kéo lại sau." },
      },
      {
        name: "Thử bằng giấy thấm dầu và đầu ngón tay",
        text: "Chờ da nghỉ một lúc sau khi rửa mặt thì kết quả mới đúng. Ấn nhẹ một mảnh giấy thấm dầu lên trán, mũi và má: chỗ nào giấy trong lên là chỗ đó nhiều dầu. Sau đó lướt nhẹ đầu ngón tay trên má để cảm nhận da mịn, ráp hay căng. Chỗ nào vừa chạm đã ửng đỏ thì ghi lại là da nhạy cảm.",
        image: { src: img("thu-da-bang-giay-tham-dau-tren-tran"), alt: "Hai bàn tay chuyên viên spa ấn nhẹ một mảnh giấy thấm dầu màu trắng lên trán khách đang nằm nhắm mắt" },
      },
      {
        name: "Ghi lại điều mình thấy",
        text: "Ghi loại da, tình trạng của từng vùng, những gì khách kể, và những việc bạn đã quyết định không làm cùng lý do. Ghi điều quan sát được, không ghi tên bệnh. Đây là thông tin riêng tư, chỉ ghi khi khách đồng ý.",
        image: { src: img("ghi-ket-qua-soi-da-vao-ho-so-khach"), alt: "Chuyên viên spa ngồi ở chiếc bàn đá nhỏ cạnh cửa sổ vòm, gõ ghi chú trên một chiếc máy tính bảng, phía sau là giường trị liệu trống" },
      },
      {
        name: "Chọn liệu trình và giải thích",
        text: "Dựa trên những gì vừa ghi. Ví dụ với da hỗn hợp, hơi thiếu nước, vài mụn đầu đen ở mũi: làm sạch dịu, tẩy da chết nhẹ, mặt nạ hợp với da, và chỉ lấy nhân mụn khi bạn đã được học và tiệm cho phép. Nói cho khách biết sẽ làm gì, cảm giác ra sao và kết quả thật sự là gì.",
      },
      {
        name: "Đưa kế hoạch tại nhà và đặt lịch lần sau",
        text: "Kế hoạch ngắn: rửa mặt dịu nhẹ sáng và tối, dưỡng ẩm hợp với loại da, kem chống nắng mỗi sáng. Viết ra giấy cho khách mang về. Dặn khách nếu thấy da khó chịu với sản phẩm mới thì ngừng lại và báo cho tiệm. Rồi đặt lịch lần sau ngay tại quầy.",
        image: { src: img("dat-lich-hen-lan-sau-tai-quay-spa"), alt: "Tại quầy lễ tân ốp đá của spa, nhân viên cầm máy tính bảng cho khách nữ mặc áo len kem xem, cả hai cùng mỉm cười" },
      },
      {
        name: "Dọn phòng sau khi khách về",
        text: "Thay khăn, thay ga, lau giường và đèn lúp, rồi rửa tay. Phòng chỉ sẵn sàng cho khách kế tiếp khi những việc này đã xong.",
      },
    ],
  },
  faq: [
    {
      q: "Soi da gồm những bước nào?",
      a: "Hỏi theo phiếu tư vấn, làm sạch da, che mắt khách và soi từng vùng dưới đèn lúp, thử bằng giấy thấm dầu và đầu ngón tay, rồi ghi lại. Sau đó mới chọn liệu trình, giải thích cho khách và đưa kế hoạch chăm sóc tại nhà.",
    },
    {
      q: "Vì sao phải rửa mặt sạch trước khi soi da?",
      a: "Vì lớp trang điểm và lớp kem che mất làn da thật. Soi khi da chưa sạch là đọc sai ngay từ đầu, kéo theo chọn sai sản phẩm và sai liệu trình.",
    },
    {
      q: "Thử loại da bằng giấy thấm dầu thế nào?",
      a: "Sau khi rửa mặt, để da nghỉ một lúc, rồi ấn nhẹ một mảnh giấy thấm dầu lên trán, mũi và má. Chỗ nào giấy trong lên là chỗ đó nhiều dầu. Bóng dầu ở vùng chữ T trong khi má khô ráo là dấu hiệu của da hỗn hợp.",
    },
    {
      q: "Soi da bằng đèn lúp nên theo thứ tự nào?",
      a: "Trán, vùng chữ T, hai má, đường hàm và cằm, rồi tới cổ. Luôn giữ cùng một thứ tự để không bỏ sót vùng nào và dễ so sánh với lần trước. Trước khi bật đèn, đặt bông che mắt cho khách vì đèn rất sáng.",
    },
    {
      q: "Thấy vùng da sưng đỏ hoặc mụn rộp khi soi da thì làm gì?",
      a: "Không làm trên vùng da đó. Nói nhẹ nhàng, tả điều mình thấy, không gọi tên bệnh, và khuyên khách hỏi bác sĩ. Có thể đề nghị một liệu trình nhẹ hơn trên vùng da khác, hoặc hẹn lại.",
    },
    {
      q: "Nên ghi gì vào hồ sơ khách sau khi soi da?",
      a: "Loại da, tình trạng từng vùng, lời khách kể, và những việc đã quyết định không làm cùng lý do. Ghi điều mình thấy chứ không ghi tên bệnh. Đây là thông tin riêng tư nên chỉ ghi khi khách đồng ý, và muốn chụp ảnh da cũng phải hỏi khách trước.",
    },
  ],
  related: ["spa-soi-da-hieu-dung", "spa-facial", "khi-nao-khong-lam", "rua-tay-gang-tay"],
};

export default article;
