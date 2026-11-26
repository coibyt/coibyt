import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cong-tac-vien/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cong-tac-vien-cho-salon-hoa-hong-gioi-thieu",
  lesson: "cong-tac-vien",
  category: "salon",
  title: "Cộng tác viên cho salon: cách tạo link giới thiệu riêng, đặt hoa hồng và theo dõi khách mang về",
  metaTitle: "Cộng tác viên cho salon: link riêng, hoa hồng, theo dõi",
  metaDescription:
    "Cách dùng Tiếp thị liên kết của VaraaAi cho tiệm nail, tóc, spa: thêm đối tác, đặt phần trăm hoa hồng, gửi link hoặc mã QR riêng và theo dõi hoa hồng cần trả.",
  keyword: "cộng tác viên cho salon",
  keywords: [
    "tiếp thị liên kết cho salon",
    "affiliate cho tiệm nail",
    "hoa hồng giới thiệu khách cho spa",
    "tuyển cộng tác viên giới thiệu khách",
    "link giới thiệu riêng cho từng cộng tác viên",
    "cách trả hoa hồng cho người giới thiệu khách",
    "mã QR của cộng tác viên",
  ],
  excerpt: "Mỗi người giới thiệu có một đường link và mã QR riêng. Khách đặt lịch qua link nào, hệ thống ghi nhận cho người đó kèm hoa hồng. Bạn tự thanh toán.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("le-tan-chao-don-khach-duoc-gioi-thieu-den-salon"),
    alt: "Lễ tân mặc vest tím tươi cười đón một khách nữ mặc áo khoác kem tại quầy đá của salon, phía sau có nhiều khách ngồi chờ",
  },
  takeaways: [
    "Nhân viên, bạn bè hay khách quen đều có thể làm người giới thiệu. Mỗi người có **một đường link và mã QR riêng**.",
    "Thêm ở **“Marketing” → “Tiếp thị liên kết” → “Thêm đối tác”**, điền tên, email và phần trăm hoa hồng.",
    "Hoa hồng chọn sẵn **5%, 10%, 15%, 20%** hoặc nhập số khác, tính trên giá trị lịch hẹn khách đặt qua link.",
    "Bạn theo dõi được lượt nhấp, lịch hẹn, doanh thu và hoa hồng cần trả của từng đối tác.",
    "**VaraaAi chỉ theo dõi và tính hoa hồng.** Bạn tự thanh toán cho đối tác rồi ghi nhận đã trả.",
  ],
  intro: [
    "Tuyển cộng tác viên cho salon là cách có khách mới mà không phải trả tiền quảng cáo trước: bạn chỉ chi khi có người thật sự đặt lịch. Cái khó lâu nay nằm ở khâu ghi sổ. Khách đến nói “chị Lan giới thiệu em”, cuối tháng không ai nhớ đủ, và người giới thiệu nhiệt tình nhất lại là người dễ bị tính thiếu nhất.",
    "Bài viết này đi theo bài học “Cộng tác viên giới thiệu khách” của VaraaAi Academy. Bạn sẽ thêm được một đối tác, đặt phần trăm hoa hồng, gửi cho họ link hoặc mã QR riêng, và đọc được bảng kết quả để biết cần trả cho ai bao nhiêu.",
  ],
  sections: [
    {
      id: "cong-tac-vien-la-gi",
      title: "Tiếp thị liên kết cho salon là gì và ai làm cộng tác viên được",
      blocks: [
        { p: "Tiếp thị liên kết là cách gọi của một việc tiệm nào cũng từng làm: nhờ người quen giới thiệu khách và cảm ơn họ bằng một khoản hoa hồng. Phần mềm chỉ thay cuốn sổ. Mỗi người giới thiệu có một đường link riêng. Khách đặt lịch qua link nào, hệ thống ghi nhận cho người đó, kèm hoa hồng." },
        { p: "Bài học nêu ba nhóm người có thể giới thiệu khách cho salon: nhân viên, bạn bè và khách quen. Trong thực tế, người giới thiệu tốt là người gặp đúng nhóm khách của bạn trước bạn. Ví dụ của bài viết: một thợ trang điểm cô dâu, một người bạn có nhiều người theo dõi trên mạng, hoặc chính người thợ trong tiệm muốn kéo khách quen của mình về." },
        { p: "Đừng nhầm cách này với chương trình [khách dẫn khách](lesson:khach-dan-khach). Hai cách cùng nhằm có khách mới nhưng dành cho hai kiểu người giới thiệu khác nhau:" },
        {
          table: {
            head: ["", "Khách dẫn khách", "Tiếp thị liên kết"],
            rows: [
              ["Ai giới thiệu", "Khách có thẻ tích điểm của tiệm", "Đối tác do bạn thêm vào: nhân viên, bạn bè, khách quen"],
              ["Phần thưởng", "Vé trên thẻ tích điểm", "Hoa hồng theo phần trăm"],
              ["Ai trao thưởng", "Hệ thống tự cộng vé", "Bạn tự thanh toán, VaraaAi chỉ theo dõi"],
            ],
          },
        },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi tuyển cộng tác viên giới thiệu khách",
      blocks: [
        { p: "Phần nhập trên máy chỉ mất một phút. Phần cần thời gian là thỏa thuận với người giới thiệu. Hãy thống nhất bằng lời hoặc bằng tin nhắn ba điều trước khi tạo link:" },
        {
          ul: [
            "**Bao nhiêu phần trăm.** Phần trăm này tính trên giá trị lịch hẹn khách đặt qua link.",
            "**Khi nào trả.** Ví dụ cuối mỗi tháng. Trong video, ô “Ghi chú” của đối tác mẫu ghi đúng điều này.",
            "**Trả bằng cách nào.** VaraaAi không chuyển tiền thay bạn, nên hai bên tự chọn cách thanh toán.",
          ],
        },
        { p: "Bạn cũng cần tên và email của đối tác. Nếu muốn link dễ nhớ, nghĩ sẵn một mã ngắn cho họ, ví dụ tên kèm con số." },
        { note: "Cách ghi sổ và nghĩa vụ thuế đối với khoản hoa hồng khác nhau theo từng nước. Bài học không đề cập phần này. Nếu tiệm trả hoa hồng thường xuyên, hãy hỏi kế toán của bạn.", kind: "warn", title: "Hỏi kế toán về hoa hồng" },
      ],
    },
    {
      id: "dat-hoa-hong",
      title: "Hoa hồng giới thiệu khách: tính trên cái gì và đặt bao nhiêu phần trăm",
      blocks: [
        { p: "Ở ô “Hoa hồng”, bạn bấm chọn một mức có sẵn là 5%, 10%, 15% hoặc 20%, hoặc gõ một số khác. Dòng chú thích dưới ô giải thích cách tính: hoa hồng tính trên giá trị lịch hẹn khách đặt qua link. Ví dụ ghi ngay trên màn hình: lịch hẹn 50,00 € với mức 10% cho hoa hồng 5,00 €." },
        { p: "Bài học không khuyên một con số cụ thể, và video chỉ lấy 10% làm ví dụ. Khi tự quyết định, có ba điều nên cân nhắc:" },
        {
          ul: [
            "**Tiệm còn lại bao nhiêu sau khi trả.** Hoa hồng tính trên giá trị lịch hẹn, trong khi tiệm vẫn phải trả vật tư và công thợ cho lịch hẹn đó.",
            "**Khách mới có quay lại không.** Một khách được giới thiệu rồi trở thành khách quen đáng giá hơn nhiều lần so với lần hẹn đầu.",
            "**Công bằng giữa các đối tác.** Những người làm việc giống nhau nên có cùng một mức, để không ai phải so bì.",
          ],
        },
        { p: "Mỗi đối tác có mức hoa hồng riêng, hiện ngay cạnh tên họ trong danh sách, ví dụ “Hoa hồng 10%”. Biểu tượng cây bút cạnh tên cho phép bạn sửa lại thông tin của đối tác." },
      ],
    },
    {
      id: "link-va-ma-qr",
      title: "Link giới thiệu riêng và mã QR của cộng tác viên",
      blocks: [
        { p: "Sau khi lưu, đối tác hiện trong danh sách “Đối tác của bạn” kèm đường link riêng. Đối tác chia sẻ link, khách bấm vào và đặt lịch như bình thường. Khách không phải nhập mã hay nói tên ai, vì đường link đã mang sẵn thông tin đó." },
        { p: "Ô “Mã link” là tùy chọn. Dòng chú thích ghi rõ: chữ in hoa và số, 3–20 ký tự, để trống thì mã được tạo tự động. Một mã có tên người giới thiệu giúp họ nhận ra link của mình và tự tin gửi đi." },
        { img: { src: img("ma-qr-cua-doi-tac-de-in-to-roi-danh-thiep"), alt: "Cửa sổ Mã QR của đối tác với mã QR lớn trên nền tím được khoanh vàng, phía trên ghi tên salon và phía dưới là đường link", caption: "Mã QR của từng đối tác: in lên tờ rơi, danh thiếp hoặc đặt tại quầy của họ." } },
        { p: "Mã QR dành cho những nơi không bấm được link. Bạn tải mã về rồi in lên tờ rơi hay danh thiếp. Khách quét là mở trang đặt lịch, và lịch hẹn được ghi cho đúng đối tác. Một đối tác có cửa hàng riêng có thể đặt tấm thẻ có mã này ngay tại quầy của họ." },
        { note: "Đây là link riêng của từng đối tác, khác với link đặt lịch chung của tiệm trong bài [chia sẻ link đặt lịch](lesson:chia-se-link). Khách đặt qua link chung thì không ai được ghi nhận hoa hồng.", kind: "info", title: "Link riêng và link chung" },
      ],
    },
    {
      id: "theo-doi-va-tra-hoa-hong",
      title: "Theo dõi kết quả và cách trả hoa hồng cho người giới thiệu khách",
      blocks: [
        { p: "Đầu trang “Tiếp thị liên kết” là bảng tổng: số đối tác, lượt nhấp link, lịch hẹn mang lại, doanh thu mang lại và hoa hồng cần trả. Bạn chọn xem theo 30 ngày, 90 ngày, 12 tháng hoặc tất cả." },
        { img: { src: img("theo-doi-luot-nhap-lich-hen-doanh-thu-hoa-hong"), alt: "Bảng tổng của Tiếp thị liên kết với bốn ô Đối tác, Lượt nhấp link, Lịch hẹn mang lại, Doanh thu mang lại được khoanh vàng và ô Hoa hồng cần trả", caption: "Ô màu vàng “Hoa hồng cần trả” tính cho các lịch hẹn đã diễn ra, trừ phần đã trả." } },
        { p: "Dòng chữ nhỏ trong ô “Hoa hồng cần trả” đáng chú ý: con số này tính cho các lịch hẹn đã diễn ra, trừ phần đã trả. Bên dưới, mỗi đối tác có bốn con số của riêng mình. Đọc chúng theo cặp sẽ thấy nhiều điều:" },
        {
          table: {
            head: ["Bạn thấy", "Có thể hiểu là"],
            rows: [
              ["Lượt nhấp nhiều, lịch hẹn ít", "Người xem có quan tâm nhưng chưa đặt. Xem lại trang đặt lịch: dịch vụ, giá, giờ trống"],
              ["Lượt nhấp ít", "Đối tác chưa chia sẻ link nhiều. Hỏi xem họ cần gì thêm, ví dụ mã QR để in"],
              ["Lịch hẹn và doanh thu đều đặn", "Một đối tác đáng giữ. Trả đúng hẹn và cảm ơn họ"],
            ],
          },
        },
        { img: { src: img("con-phai-tra-hoa-hong-da-tra-du"), alt: "Thẻ của một đối tác với bốn con số lượt nhấp, lịch hẹn, doanh thu, hoa hồng và ô Còn phải trả ghi Đã trả đủ được khoanh vàng", caption: "Ô “Còn phải trả” của từng đối tác. Khi không còn nợ, ô ghi “Đã trả đủ”." } },
        { p: "VaraaAi chỉ theo dõi giúp. Bạn tự thanh toán hoa hồng cho đối tác theo cách hai bên đã thỏa thuận. Trả xong, bạn ghi nhận đã trả để sổ sách luôn rõ ràng. Hãy ghi nhận ngay trong ngày trả tiền. Để dồn vài tháng thì chính bạn cũng không nhớ đã trả đến đâu." },
        { p: "Bảng tổng này chỉ tính khách đến qua đối tác. Tình hình chung của tiệm thì bạn xem ở [trang tổng quan](lesson:tong-quan)." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi làm việc với cộng tác viên",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Đối tác muốn một link dễ đọc cho khách", "Đặt “Mã link” có tên họ khi thêm đối tác"],
              ["Đối tác phát tờ rơi, không gửi link được", "Bấm biểu tượng mã QR cạnh link của họ để tải mã về in"],
              ["Đối tác hỏi tháng này được bao nhiêu", "Xem ô hoa hồng và ô “Còn phải trả” trên thẻ của họ"],
              ["Khách nói được giới thiệu nhưng đặt qua link chung", "Hệ thống chỉ ghi nhận lịch đặt qua link riêng. Nhắc đối tác luôn gửi đúng link của mình"],
            ],
          },
        },
        { p: "Muốn tờ in của đối tác trông như poster của tiệm, bạn có thể dán link riêng của họ vào công cụ [tạo poster QR](lesson:poster-qr), vì mã QR trên poster mở đúng đường link bạn dán vào. Với những khách quen sẵn lòng giới thiệu mà không cần hoa hồng, chương trình khách dẫn khách và [thẻ tích điểm](lesson:the-tich-diem) là lựa chọn nhẹ nhàng hơn." },
      ],
    },
  ],
  howTo: {
    title: "Các bước thêm cộng tác viên cho salon trên VaraaAi",
    id: "cac-buoc-them-cong-tac-vien",
    after: "chuan-bi",
    lead: "Bảy bước dưới đây đi từ lúc mở “Tiếp thị liên kết” đến lúc trả hoa hồng, theo thứ tự trong video bài học.",
    steps: [
      {
        name: "Bấm mục “Marketing” rồi “Tiếp thị liên kết”",
        text: "Trong trang quản trị, bấm mục “Marketing”. Nút “Tiếp thị liên kết” nằm ở góc trên của trang này. Bấm vào để mở trang quản lý đối tác.",
      },
      {
        name: "Bấm “Thêm đối tác”",
        text: "Đầu trang có dòng giới thiệu ngắn và nút màu vàng “Thêm đối tác”. Bấm nút này để mở biểu mẫu “Thêm đối tác mới”.",
        image: { src: img("nut-them-doi-tac-trong-tiep-thi-lien-ket"), alt: "Trang Tiếp thị liên kết với nút màu vàng Thêm đối tác được khoanh vàng, bên dưới là các ô số Đối tác và Lượt nhấp link" },
      },
      {
        name: "Điền “Tên đối tác” và email",
        text: "Nhập “Tên đối tác” và email của họ. Ghi tên đầy đủ để sau này danh sách có nhiều người vẫn không lẫn.",
        image: { src: img("them-doi-tac-moi-ten-va-email"), alt: "Biểu mẫu Thêm đối tác mới với ô Tên đối tác và ô Email được khoanh vàng, bên dưới là ô Số điện thoại và các mức hoa hồng" },
      },
      {
        name: "Chọn phần trăm “Hoa hồng”",
        text: "Bấm chọn 5%, 10%, 15% hoặc 20%, hoặc gõ một số khác vào ô bên dưới. Đây là phần trăm tính trên giá trị lịch hẹn khách đặt qua link, nên hãy chọn đúng mức hai bên đã thỏa thuận.",
        image: { src: img("chon-phan-tram-hoa-hong-cho-cong-tac-vien"), alt: "Ô Hoa hồng với bốn mức 5%, 10%, 15%, 20% được khoanh vàng, mức 10% đang được chọn, kèm ví dụ lịch hẹn 50 euro hoa hồng 5 euro" },
      },
      {
        name: "Đặt “Mã link” nếu muốn rồi bấm “Lưu”",
        text: "Bạn có thể tự đặt “Mã link” cho dễ nhớ, hoặc để trống để mã được tạo tự động. Ô “Ghi chú” là chỗ ghi lại thỏa thuận, ví dụ ngày trả hoa hồng. Xong thì bấm “Lưu”.",
        image: { src: img("dat-ma-link-rieng-cho-doi-tac"), alt: "Ô Mã link tùy chọn được khoanh vàng với chú thích chữ in hoa và số, 3 đến 20 ký tự, bên dưới là ô Ghi chú" },
      },
      {
        name: "Sao chép link hoặc tải mã QR gửi cho đối tác",
        text: "Trong danh sách “Đối tác của bạn”, bấm biểu tượng sao chép để lấy link riêng và gửi cho đối tác. Bấm biểu tượng mã QR nếu họ cần mã để in lên tờ rơi hay danh thiếp.",
        image: { src: img("sao-chep-link-rieng-cua-doi-tac"), alt: "Thẻ một đối tác trong danh sách Đối tác của bạn với biểu tượng sao chép cạnh đường link riêng được khoanh vàng" },
      },
      {
        name: "Theo dõi kết quả và ghi nhận đã trả",
        text: "Mỗi khi có khách đặt lịch qua link, VaraaAi tự ghi nhận số lượt nhấp, số lịch hẹn, doanh thu mang lại và hoa hồng cần trả của từng đối tác. Bạn tự thanh toán cho họ. Trả xong thì ghi nhận đã trả.",
        image: { src: img("ket-qua-cua-tung-doi-tac-gioi-thieu"), alt: "Thẻ một đối tác với bốn ô Lượt nhấp, Lịch hẹn, Doanh thu, Hoa hồng được khoanh vàng, bên dưới là ô Còn phải trả" },
      },
    ],
  },
  faq: [
    {
      q: "Làm sao hệ thống biết khách do cộng tác viên nào giới thiệu?",
      a: "Mỗi đối tác có một đường link và một mã QR riêng. Lịch hẹn đặt qua link nào thì được ghi nhận cho người đó, kèm hoa hồng.",
    },
    {
      q: "Ai trả hoa hồng cho cộng tác viên của salon?",
      a: "Chủ salon tự thanh toán. VaraaAi chỉ theo dõi và tính hoa hồng. Sau khi trả, bạn ghi nhận đã trả để sổ sách rõ ràng.",
    },
    {
      q: "Hoa hồng cho cộng tác viên được tính trên cái gì?",
      a: "Trên giá trị lịch hẹn khách đặt qua link của đối tác. Bạn chọn 5%, 10%, 15%, 20% hoặc nhập số khác. Ví dụ trên màn hình: lịch hẹn 50,00 € với mức 10% cho hoa hồng 5,00 €.",
    },
    {
      q: "Ai có thể làm cộng tác viên giới thiệu khách cho salon?",
      a: "Nhân viên, bạn bè hay khách quen đều có thể. Bạn thêm họ làm đối tác trong “Tiếp thị liên kết”, và mỗi người nhận một đường link riêng.",
    },
    {
      q: "Muốn in link của cộng tác viên lên tờ rơi thì dùng gì?",
      a: "Dùng mã QR của đối tác. Trong danh sách “Đối tác của bạn”, bấm biểu tượng mã QR để tải mã về rồi in lên tờ rơi hoặc danh thiếp. Khách quét mã là mở trang đặt lịch của salon.",
    },
    {
      q: "Có đặt được mã link dễ nhớ cho từng cộng tác viên không?",
      a: "Có. Ô “Mã link” là tùy chọn, gồm chữ in hoa và số, dài 3–20 ký tự. Nếu để trống, mã được tạo tự động.",
    },
  ],
  related: ["khach-dan-khach", "tong-quan", "chia-se-link", "poster-qr"],
};

export default article;
