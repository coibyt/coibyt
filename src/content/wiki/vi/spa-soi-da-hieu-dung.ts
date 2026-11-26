import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-soi-da-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cac-loai-da-mat",
  lesson: "spa-soi-da-hieu-dung",
  category: "spa",
  title: "Các loại da mặt và tình trạng da: phân biệt da dầu, da khô, da hỗn hợp, da nhạy cảm",
  metaTitle: "Các loại da mặt: da dầu, khô, hỗn hợp, nhạy cảm",
  metaDescription:
    "Các loại da mặt và cách phân biệt với tình trạng da: da dầu vẫn có thể thiếu nước, soi da nhìn gì, phiếu tư vấn hỏi gì, khi nào không làm và nên hỏi bác sĩ.",
  keyword: "các loại da mặt",
  keywords: [
    "loại da và tình trạng da",
    "da dầu thiếu nước",
    "da hỗn hợp là gì",
    "da nhạy cảm là gì",
    "soi da là gì",
    "phiếu tư vấn da",
    "uống isotretinoin có wax được không",
  ],
  excerpt: "Năm loại da, năm tình trạng da hay gặp và lý do hai thứ ấy không được nhầm với nhau. Kèm những câu người làm da phải hỏi trước mọi liệu trình.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuyen-vien-spa-chuan-bi-soi-da-cho-khach"),
    alt: "Chuyên viên spa mặc áo kem đứng cạnh khách đang nằm trên giường, bên chiếc đèn lúp tròn, trong phòng trị liệu ốp đá travertine có cửa sổ vòm",
  },
  takeaways: [
    "**Loại da** khá ổn định: da thường, khô, dầu, hỗn hợp, nhạy cảm. **Tình trạng da** thì thay đổi theo mùa, sản phẩm, tuổi và giấc ngủ.",
    "Thiếu dầu là da khô. Thiếu nước là một tình trạng, loại da nào cũng có thể bị, **kể cả da dầu**.",
    "Đọc da bằng mắt, bằng tay và bằng câu hỏi: da sạch, ánh sáng tốt, đèn lúp, và một phiếu tư vấn hỏi về dị ứng, thuốc, sản phẩm đang bôi.",
    "Khách đang uống isotretinoin, hoặc mới ngừng trong khoảng sáu tháng: không wax. Da đang dùng retinoid hay axit thì tránh tẩy da chết mạnh.",
    "Người làm da **không chẩn đoán**. Thấy điều đáng lo thì không làm trên vùng đó, tả điều mình thấy và khuyên khách hỏi bác sĩ.",
  ],
  intro: [
    "Các loại da mặt thường được kể ra là năm: da thường, da khô, da dầu, da hỗn hợp và da nhạy cảm. Biết năm cái tên ấy mới là một nửa. Nửa còn lại là tình trạng da, thứ thay đổi theo từng mùa và từng lọ kem, và là lý do một làn da dầu vẫn có thể căng rát vì thiếu nước. Nhầm hai thứ này với nhau là sai lầm hay gặp nhất khi chọn sản phẩm và chọn liệu trình.",
    "Bài viết đi theo bài học “Soi da và tư vấn: hiểu đúng để chọn đúng liệu trình”, bài mở đầu khóa Nghề Spa của VaraaAi Academy. Đọc xong, bạn phân biệt được loại da với tình trạng da, biết nhìn gì và hỏi gì trước khi chạm vào da khách, và biết lúc nào nên dừng lại. Quy trình soi da từng bước trên một khách nằm ở bài thực hành [Cách soi da xác định loại da](lesson:spa-soi-da).",
  ],
  sections: [
    {
      id: "vi-sao-phai-doc-da",
      title: "Vì sao mọi liệu trình bắt đầu từ việc đọc da",
      blocks: [
        { p: "Đọc đúng làn da thì chọn đúng sản phẩm và đúng cách làm. Đọc sai thì sản phẩm đắt đến đâu, da khách vẫn có thể đỏ rát, nổi mụn, và khách không quay lại." },
        { p: "Một tình huống rất hay gặp: khách bước vào và nói da em nhiều dầu lắm. Người làm da nghe vậy, chọn ngay sữa rửa mặt thật mạnh, tẩy da chết thật kỹ, rồi mặt nạ đất sét hút dầu. Hôm sau khách nhắn lại: da căng rát, bong vảy, mà vẫn bóng dầu. Làn da ấy nhiều dầu, đồng thời đang thiếu nước. Lấy hết dầu đi, da càng khô và càng căng." },
        { note: "Lỗi ở đây là chỉ nghe mà không nhìn, không sờ, không hỏi thêm. Lời khách tự tả về da mình là một dữ kiện, chưa phải là kết luận.", kind: "tip", title: "Nghe khách, rồi tự kiểm tra lại" },
      ],
    },
    {
      id: "nam-loai-da",
      title: "Các loại da mặt: da thường, khô, dầu, hỗn hợp, nhạy cảm",
      blocks: [
        { p: "Loại da là bản chất của làn da, khá ổn định và phần lớn do cơ địa. Mỗi loại có vài dấu hiệu nhìn và sờ được." },
        {
          table: {
            head: ["Loại da", "Dấu hiệu nhận biết"],
            rows: [
              ["Da thường", "Mịn, lỗ chân lông nhỏ, không bóng quá, không căng"],
              ["Da khô", "Ít dầu, sờ thấy hơi ráp, dễ căng sau khi rửa mặt, có khi bong vảy nhẹ"],
              ["Da dầu", "Bóng khắp mặt, lỗ chân lông to hơn, dễ có mụn đầu đen"],
              ["Da hỗn hợp", "Bóng ở vùng chữ T (trán, mũi, cằm), hai má thường hoặc khô"],
              ["Da nhạy cảm", "Dễ đỏ, dễ rát, dễ ngứa khi đổi sản phẩm hay khi trời thay đổi"],
            ],
          },
        },
        { img: { src: img("da-hon-hop-bong-dau-vung-chu-t"), alt: "Cận cảnh khuôn mặt một phụ nữ đeo băng đô trắng, nhắm mắt, vùng trán, mũi và cằm bóng dầu nhẹ còn hai má thì ráo", caption: "Da hỗn hợp: bóng ở vùng chữ T, hai má không bóng." } },
        { img: { src: img("da-kho-li-khong-bong-dau"), alt: "Cận cảnh khuôn mặt một phụ nữ đeo băng đô trắng, nhắm mắt, da má lì, hơi xỉn, không có chỗ nào bóng dầu", caption: "Da khô: bề mặt lì, không bóng, dễ căng sau khi rửa mặt." } },
      ],
    },
    {
      id: "tinh-trang-da",
      title: "Tình trạng da: thiếu nước, đỏ da, bít tắc, sắc tố, lão hóa",
      blocks: [
        { p: "Tình trạng da là thứ đang diễn ra trên da lúc này. Nó đổi theo mùa, theo thời tiết, theo sản phẩm khách đang dùng, theo tuổi và theo giấc ngủ. Hôm nay da thiếu nước, tháng sau có thể đã ổn." },
        {
          table: {
            head: ["Tình trạng", "Thấy gì trên da"],
            rows: [
              ["Thiếu nước", "Da căng, xỉn màu, có những nếp nhăn rất nhỏ, mà vẫn có thể bóng dầu"],
              ["Đỏ da", "Da đỏ, những mạch máu nhỏ hiện rõ"],
              ["Bít tắc", "Mụn đầu đen, mụn ẩn li ti"],
              ["Sắc tố", "Đốm nâu, tàn nhang, vết thâm"],
              ["Dấu hiệu lão hóa", "Nếp nhăn, da kém săn chắc"],
            ],
          },
        },
        { note: "Thiếu dầu là da khô, đó là một loại da. Thiếu nước là một tình trạng, và loại da nào cũng có thể bị, kể cả da dầu. Vì vậy da bóng dầu chưa chắc là da đủ nước.", kind: "info", title: "Da dầu thiếu nước là chuyện bình thường" },
        { img: { src: img("da-nhay-cam-do-o-hai-ma"), alt: "Cận cảnh khuôn mặt một phụ nữ đeo băng đô trắng, nhắm mắt, hai má và cánh mũi ửng đỏ lan nhẹ", caption: "Đỏ ở hai má: da đang nhạy cảm, mọi thao tác cần thật nhẹ tay." } },
        { img: { src: img("da-bit-tac-mun-dau-den-o-mui"), alt: "Cận cảnh khuôn mặt một phụ nữ đeo băng đô trắng, nhắm mắt, trên mũi và hai bên cánh mũi có những chấm mụn đầu đen nhỏ", caption: "Mụn đầu đen ở mũi và cằm: da đang bít tắc." } },
      ],
    },
    {
      id: "doc-da-the-nao",
      title: "Soi da là gì: đọc da bằng mắt, bằng tay và bằng câu hỏi",
      blocks: [
        { p: "Soi da là quan sát làn da đã sạch, không còn trang điểm, dưới ánh sáng tốt và qua đèn lúp phóng to. Mắt khách được che bằng bông vì đèn rất sáng. Bạn nhìn bề mặt da mịn hay ráp, lỗ chân lông to ở đâu, bóng dầu ở vùng nào. Rồi sờ thật nhẹ: da mềm, căng hay ráp. Chỗ nào vừa chạm đã ửng đỏ là da đang nhạy cảm." },
        { note: "Luôn soi theo cùng một thứ tự: trán, vùng chữ T, má, hàm và cằm, cổ. Nhờ vậy không vùng nào bị bỏ sót, và lần sau dễ so sánh.", kind: "tip", title: "Một thứ tự cố định" },
        { h3: "Phiếu tư vấn da hỏi những gì" },
        { p: "Mắt nhìn thôi chưa đủ. Phiếu tư vấn mới là thứ giúp bạn tránh những rủi ro lớn nhất, và khách quen cũng cần được hỏi lại vì mọi thứ có thể đã thay đổi." },
        { img: { src: img("phieu-tu-van-da-truoc-lieu-trinh"), alt: "Khách nữ mặc áo choàng trắng ngồi trên ghế bành trò chuyện với chuyên viên spa đang cầm bìa kẹp phiếu tư vấn và bút" } },
        {
          ul: [
            "Có dị ứng gì không, từng phản ứng với mỹ phẩm nào chưa.",
            "Đang dùng thuốc gì.",
            "Đang bôi gì ở nhà, nhất là retinoid hay các loại axit tẩy da chết.",
            "Có đang uống thuốc trị mụn isotretinoin không.",
            "Gần đây có làm liệu trình gì không: lột da hóa học, laser, tẩy lông bằng sáp.",
            "Có hay đi nắng không.",
          ],
        },
        { h3: "Vì sao phải hỏi kỹ như vậy" },
        {
          table: {
            head: ["Khách cho biết", "Điều đó nghĩa là gì", "Người làm da làm gì"],
            rows: [
              ["Đang bôi retinoid hoặc axit", "Da mỏng và nhạy hơn bình thường", "Tránh tẩy da chết mạnh, vì dễ trầy và rát"],
              ["Đang uống isotretinoin, hoặc mới ngừng trong khoảng sáu tháng", "Da rất dễ tổn thương", "Không tẩy lông bằng sáp, giải thích lý do và ghi lại"],
              ["Đang mang thai", "Cần thận trọng hơn khi chọn sản phẩm", "Hỏi thêm, chọn sản phẩm theo đúng hướng dẫn của hãng"],
            ],
          },
        },
        { p: "Về isotretinoin, trang thông tin thuốc của [NHS](https://www.nhs.uk/medicines/isotretinoin-capsules/common-questions-about-isotretinoin-capsules/) cũng khuyên không wax trong thời gian dùng thuốc. Với thuốc, sản phẩm hoạt tính và thai kỳ, nguyên tắc chung là làm theo hướng dẫn của hãng và của bác sĩ kê thuốc, không đoán và không tự kết luận." },
      ],
    },
    {
      id: "khong-chan-doan",
      title: "Không chẩn đoán: khi nào không làm và nên nói gì với khách",
      blocks: [
        { p: "Đây là nguyên tắc quan trọng nhất của người làm da. Bạn chăm sóc da, bạn không khám bệnh. Khi thấy một trong những điều dưới đây, không làm trên vùng da đó:" },
        {
          ul: [
            "Da cháy nắng hoặc trầy xước.",
            "Mụn rộp ở môi.",
            "Vùng da sưng đỏ, đau, có mủ.",
            "Một nốt ruồi lạ đang đổi màu, đổi dáng.",
          ],
        },
        { img: { src: img("mun-rop-o-moi-khong-lam-tren-vung-do"), alt: "Cận cảnh nửa dưới khuôn mặt một phụ nữ, ở khóe môi trên có một cụm mụn nước nhỏ trên nền da hơi hồng", caption: "Một cụm mụn nước ở môi: không làm trên vùng đó và khuyên khách hỏi bác sĩ." } },
        { p: "Đừng gọi tên bệnh. Hãy tả điều mình thấy và khuyên khách hỏi bác sĩ. Câu nói đúng nghe như thế này: “Em thấy chỗ này sưng đỏ, em sẽ không làm ở đây, chị nên hỏi bác sĩ.” Câu “Chị bị nhiễm trùng rồi” là một chẩn đoán, và đó không phải việc của người làm da." },
        { note: "Bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam) nói kỹ về các dấu hiệu phải dừng và cách từ chối. Quy định về phạm vi công việc của người làm da khác nhau theo từng nước, nên hãy kiểm tra quy định nơi bạn làm việc. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Khi nào chuyển khách sang bác sĩ" },
      ],
    },
    {
      id: "ket-qua-va-cham-soc-tai-nha",
      title: "Nói thật về kết quả và kế hoạch chăm sóc da tại nhà",
      blocks: [
        { p: "Đọc xong da, nghe xong khách, mới tới lúc chọn liệu trình. Và hãy nói thật về những gì liệu trình làm được. Một buổi chăm sóc da làm da sạch, mềm, tươi hơn. Đốm nâu, nếp nhăn hay mụn lâu năm thì không biến mất sau một buổi. Hứa quá, khách sẽ thất vọng. Nói thật, khách sẽ tin. Ghi lại mục tiêu của khách để lần sau so sánh." },
        { p: "Kết quả ở tiệm chỉ giữ được khi ở nhà khách chăm đúng. Kế hoạch đưa cho khách nên ít bước mà đều đặn:" },
        {
          ol: [
            "Làm sạch dịu nhẹ.",
            "Dưỡng ẩm hợp với loại da.",
            "Kem chống nắng mỗi sáng.",
          ],
        },
        { img: { src: img("ke-hoach-cham-soc-da-tai-nha-ba-san-pham"), alt: "Chuyên viên spa chỉ cho khách mặc áo choàng trắng ba sản phẩm chăm sóc da không nhãn đặt trên một chiếc khay đá nhỏ", caption: "Ba bước là đủ để bắt đầu. Đừng bán cho khách mười sản phẩm." } },
        { p: "Sau đó hẹn lần sau để cùng xem da thay đổi thế nào. Các bước của một buổi làm da được nói ở bài [Chăm sóc da mặt cơ bản](lesson:spa-facial-hieu-dung)." },
      ],
    },
    {
      id: "ho-so-khach",
      title: "Giữ kín hồ sơ khách",
      blocks: [
        { p: "Những gì khách kể về dị ứng, thuốc men và sức khỏe đều là chuyện riêng tư. Chỉ ghi khi khách đồng ý, và giữ thật kín. Trong VaraaAi, bạn ghi loại da, tình trạng da và các câu trả lời tư vấn vào ghi chú nội bộ trong hồ sơ khách ở [sổ khách hàng](lesson:khach-hang). Ghi chú này chỉ tiệm mới thấy. Lần sau, ai làm cho khách cũng biết ngay da khách thế nào, đã dùng gì và phản ứng ra sao, trước cả khi khách tới theo [lịch hẹn](lesson:lich-hen)." },
      ],
    },
  ],
  faq: [
    {
      q: "Có mấy loại da mặt?",
      a: "Thường chia thành năm loại: da thường, da khô, da dầu, da hỗn hợp và da nhạy cảm. Loại da là bản chất, khá ổn định và phần lớn do cơ địa. Bên cạnh đó còn có tình trạng da, như thiếu nước hay bít tắc, là thứ thay đổi theo thời gian.",
    },
    {
      q: "Loại da và tình trạng da khác nhau thế nào?",
      a: "Loại da khá ổn định, ví dụ da dầu hay da khô. Tình trạng da thay đổi theo mùa, thời tiết, sản phẩm đang dùng, tuổi và giấc ngủ, ví dụ thiếu nước, đỏ da, bít tắc, sắc tố, dấu hiệu lão hóa. Một làn da có một loại da nhưng có thể mang nhiều tình trạng cùng lúc.",
    },
    {
      q: "Da dầu có bị thiếu nước không?",
      a: "Có. Thiếu dầu là da khô, còn thiếu nước là một tình trạng mà loại da nào cũng có thể bị. Da dầu thiếu nước thường căng, xỉn màu, có nếp nhăn rất nhỏ mà vẫn bóng. Làm sạch quá mạnh để lấy hết dầu chỉ làm da khô và căng hơn.",
    },
    {
      q: "Da hỗn hợp là gì?",
      a: "Da hỗn hợp bóng dầu ở vùng chữ T, tức là trán, mũi và cằm, trong khi hai má thường hoặc khô. Khi soi da, đây là kiểu da mà mỗi vùng trên mặt cần được nhìn riêng.",
    },
    {
      q: "Đang uống isotretinoin có wax lông được không?",
      a: "Không. Isotretinoin làm da rất dễ tổn thương, nên không tẩy lông bằng sáp trong lúc uống thuốc và trong khoảng sáu tháng sau khi ngừng. Hãy báo cho người làm da biết bạn đang dùng thuốc gì, và hỏi bác sĩ kê thuốc nếu chưa rõ.",
    },
    {
      q: "Người làm spa có chẩn đoán được bệnh về da không?",
      a: "Không. Người làm da không chẩn đoán. Khi thấy da cháy nắng, trầy xước, mụn rộp, vùng sưng đỏ, đau, có mủ hay một nốt ruồi lạ đổi màu, đổi dáng, họ không làm trên vùng đó, tả điều mình thấy và khuyên khách hỏi bác sĩ.",
    },
  ],
  related: ["spa-soi-da", "spa-facial-hieu-dung", "khi-nao-khong-lam", "di-ung-hoa-chat"],
};

export default article;
