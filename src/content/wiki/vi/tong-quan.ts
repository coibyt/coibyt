import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tong-quan/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "bao-cao-doanh-thu-salon-trang-tong-quan",
  lesson: "tong-quan",
  category: "salon",
  title: "Báo cáo doanh thu salon mỗi ngày: cách đọc trang Tổng quan để nắm tình hình cả tiệm",
  metaTitle: "Báo cáo doanh thu salon mỗi ngày trên trang Tổng quan",
  metaDescription:
    "Cách đọc trang Tổng quan của VaraaAi: doanh thu dự kiến hôm nay, bốn con số của tháng so với tháng trước, việc cần xử lý, lịch 7 ngày tới và dịch vụ bán chạy.",
  keyword: "báo cáo doanh thu salon",
  keywords: [
    "theo dõi doanh thu tiệm nail hằng ngày",
    "trang tổng quan salon",
    "xem doanh thu salon theo tháng",
    "dịch vụ bán chạy của salon",
    "so sánh doanh thu với tháng trước",
    "chủ salon nên xem số liệu gì mỗi sáng",
    "biểu đồ doanh thu 6 tháng của tiệm",
  ],
  excerpt: "Doanh thu, lịch hẹn, việc cần xử lý và dịch vụ bán chạy nằm trên một trang. Lướt một lần mỗi sáng là nắm được tình hình cả tiệm.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chu-salon-xem-trang-tong-quan-tren-may-tinh-bang"),
    alt: "Một phụ nữ tóc xoăn mặc áo lụa tím đứng tựa quầy đá cầm máy tính bảng và mỉm cười, phía sau là salon có đèn chùm",
  },
  takeaways: [
    "Trang Tổng quan là trang đầu tiên của trang quản trị: trên cùng là số lịch hẹn hôm nay, **“Doanh thu dự kiến hôm nay”** và **“Lịch tiếp theo”**.",
    "Bốn con số của tháng gồm doanh thu, lịch hẹn, khách hàng mới và đánh giá trung bình, mỗi số có dòng **so với cùng kỳ tháng trước**.",
    "Phần **“Cần xử lý”** nhắc những việc đang chờ, như tin nhắn chưa đọc hay đánh giá chờ duyệt.",
    "Kéo xuống để xem **“7 ngày tới”**, **“Doanh thu 6 tháng”** và **“Dịch vụ bán chạy tháng này”**.",
    "Trang này cũng đếm lượt quét mã QR in trên bảng giá và poster trong 30 ngày.",
  ],
  intro: [
    "Một bản báo cáo doanh thu salon có ích nhất khi bạn đọc được nó trong lúc uống ly cà phê đầu ngày, trước khi khách đầu tiên bước vào. Chủ tiệm không cần nhiều bảng biểu. Họ cần biết hôm nay có bao nhiêu khách, tiền vào ra sao và có việc gì đang chờ.",
    "Bài viết này đi theo bài học “Trang tổng quan” của VaraaAi Academy. Bạn sẽ đọc được từng phần của trang theo thứ tự từ trên xuống, hiểu mỗi con số trả lời câu hỏi gì, và biết nên làm gì khi một con số đi xuống.",
  ],
  sections: [
    {
      id: "vi-sao-xem-moi-sang",
      title: "Chủ salon nên xem số liệu gì mỗi sáng",
      blocks: [
        { p: "Tiệm đông khách chưa chắc là tiệm đang khỏe. Có tuần ghế nào cũng kín mà doanh thu vẫn thấp hơn tháng trước, vì khách chuyển sang những dịch vụ rẻ hơn. Có tháng doanh thu ổn nhưng số khách mới gần như bằng không. Những chuyện này không nhìn thấy được từ quầy lễ tân. Chúng chỉ hiện ra khi các con số được đặt cạnh nhau." },
        { p: "Trang Tổng quan của VaraaAi làm việc đó. Mỗi sáng mở trang quản trị, bạn biết ngay ba điều: hôm nay có bao nhiêu khách, doanh thu ra sao và có việc gì đang chờ. Bạn không phải nhập hay cài đặt gì cho trang này. Nó tự gom từ lịch hẹn, đánh giá và tin nhắn của salon." },
        { p: "Trang được xếp theo đúng thứ tự một chủ tiệm cần biết. Trên cùng là hôm nay, kế đến là tháng này, rồi những việc phải làm, và cuối cùng là xu hướng dài hơn. Bạn có thể dừng ở bất kỳ tầng nào tùy vào số phút đang có." },
      ],
    },
    {
      id: "bon-con-so-cua-thang",
      title: "Bốn con số của tháng và cách so sánh doanh thu với tháng trước",
      blocks: [
        { p: "Ngay dưới phần hôm nay là bốn ô số của tháng. Mỗi ô có dòng “so với cùng kỳ tháng trước”. Con số của tháng này vì vậy luôn đi kèm một mốc để so, và bạn biết tiệm đang lên hay xuống mà không phải mở sổ của tháng cũ." },
        {
          table: {
            head: ["Ô số", "Trả lời câu hỏi", "Nếu thấp hơn tháng trước"],
            rows: [
              ["“Doanh thu tháng này”", "Tháng này tiệm làm ra bao nhiêu tiền", "Xem “Dịch vụ bán chạy tháng này” để biết dịch vụ nào tụt"],
              ["“Lịch hẹn tháng này”", "Có bao nhiêu lượt khách đặt", "Xem “7 ngày tới” còn trống ngày nào để mời khách"],
              ["“Khách hàng mới”", "Tiệm có đang được người mới biết đến không", "Xem lại các kênh đưa link đặt lịch đến người lạ"],
              ["“Đánh giá trung bình”", "Khách chấm tiệm mấy sao", "Đọc các đánh giá gần đây và trả lời khách"],
            ],
          },
        },
        { img: { src: img("khach-hang-moi-va-danh-gia-trung-binh"), alt: "Hai ô số Khách hàng mới và Đánh giá trung bình được khoanh vàng, mỗi ô có dòng so với cùng kỳ tháng trước", caption: "Trong video, salon mẫu chưa có đánh giá nên ô “Đánh giá trung bình” để trống. Bên dưới ô này còn ghi lượt xem trang trong 30 ngày." } },
        { p: "Cột thứ ba của bảng là gợi ý của bài viết, không phải lời nhắc tự động của phần mềm. Ý chính là đừng đọc một con số riêng lẻ. Doanh thu giảm trong khi lịch hẹn giữ nguyên là chuyện về giá và loại dịch vụ. Cả hai cùng giảm là chuyện về lượng khách." },
        { p: "Muốn tách doanh thu theo từng người thợ, bạn xem bài [quản lý doanh thu theo nhân viên](lesson:doanh-thu-nhan-vien). Cần đưa số liệu ra bảng tính cho kế toán thì xem bài [xuất Excel](lesson:xuat-excel). Còn với ô đánh giá, cách duyệt và trả lời nằm trong bài [đánh giá và Google](lesson:danh-gia-google)." },
      ],
    },
    {
      id: "lich-hom-nay-va-can-xu-ly",
      title: "“Lịch hẹn hôm nay” và “Cần xử lý”: hai phần cho công việc trong ngày",
      blocks: [
        { p: "“Lịch hẹn hôm nay” liệt kê từng khách theo giờ. Mỗi dòng có giờ bắt đầu, giờ kết thúc, tên khách, dịch vụ và người thợ làm. Đọc danh sách này lúc đầu ngày, bạn biết giờ nào căng, giờ nào trống, và ai cần chuẩn bị gì. Cần xem kỹ hơn thì bấm “Xem tất cả”, hoặc mở cuốn lịch để [xem lịch theo từng thợ và thêm lịch cho khách gọi điện](lesson:lich-hen)." },
        { img: { src: img("phan-can-xu-ly-moi-thu-deu-on"), alt: "Phần Cần xử lý được khoanh vàng với dòng báo mọi thứ đều ổn, bên dưới là biểu đồ cột 7 ngày tới", caption: "Khi không có gì chờ, phần “Cần xử lý” báo mọi thứ đều ổn." } },
        { p: "“Cần xử lý” là hộp việc tồn của bạn. Phần này nhắc những việc đang chờ, như tin nhắn chưa đọc hay đánh giá chờ duyệt. Khi không có gì chờ, nó báo “Mọi thứ đều ổn”. Một tin nhắn hỏi giá để qua đêm thường là một khách đã đặt ở tiệm khác, nên đây là phần đáng xử lý trước khi làm việc gì khác. Nếu tin nhắn đến nhiều, bài [hộp thư và trợ lý AI](lesson:tin-nhan-ai) chỉ cách để máy trả lời giúp khi bạn bận tay." },
      ],
    },
    {
      id: "xu-huong",
      title: "Lịch 7 ngày tới, biểu đồ doanh thu 6 tháng và dịch vụ bán chạy của salon",
      blocks: [
        { p: "Phần dưới của trang trả lời những câu hỏi dài hơi hơn một ngày. Mỗi biểu đồ gắn với một quyết định cụ thể." },
        { h3: "“7 ngày tới”" },
        { p: "Biểu đồ cột cho thấy mỗi ngày trong tuần tới đã có bao nhiêu lịch hẹn. Ngày cột cao là ngày cần đủ người. Ngày cột thấp là ngày còn chỗ, và bạn vẫn kịp lấp nó bằng một bài đăng hay một [email ưu đãi](lesson:email-marketing) gửi cho khách quen." },
        { h3: "“Doanh thu 6 tháng”" },
        { img: { src: img("bieu-do-doanh-thu-6-thang-cua-salon"), alt: "Biểu đồ cột Doanh thu 6 tháng từ tháng 6 đến tháng 11, cột tháng 11 cao nhất, bên dưới là phần Kết quả lịch hẹn 90 ngày", caption: "Sáu cột cho sáu tháng gần nhất. Trong video, salon mẫu chỉ có số ở tháng cuối." } },
        { p: "Sáu cột cho sáu tháng gần nhất. Nghề làm đẹp có mùa: có tháng lễ tết khách dồn về, có tháng vắng hẳn. Nhìn sáu tháng liền nhau, bạn phân biệt được một tháng thấp vì mùa với một đà giảm kéo dài, hai chuyện cần hai cách xử lý khác nhau." },
        { h3: "“Dịch vụ bán chạy tháng này”" },
        { img: { src: img("dich-vu-ban-chay-thang-nay"), alt: "Bảng xếp hạng Dịch vụ bán chạy tháng này gồm năm dịch vụ, mỗi dòng có số tiền, số lịch và một thanh màu dài ngắn khác nhau", caption: "Mỗi dịch vụ ghi số tiền mang về và số lịch trong tháng." } },
        { p: "Bảng xếp hạng ghi mỗi dịch vụ mang về bao nhiêu tiền và có bao nhiêu lịch trong tháng. Dịch vụ đứng đầu nên được đưa lên đầu [menu dịch vụ](lesson:dich-vu), vì đó là thứ khách tìm nhiều nhất. Dịch vụ nằm cuối bảng nhiều tháng liền thì đáng xem lại tên gọi, giá hoặc thời lượng." },
      ],
    },
    {
      id: "luot-quet-ma-qr",
      title: "Đếm lượt quét mã QR trên bảng giá và poster",
      blocks: [
        { p: "Trang Tổng quan còn đếm lượt quét mã QR in trên bảng giá và poster trong 30 ngày. Con số này cho bạn biết tờ giấy dán ở cửa có đang làm việc hay không." },
        { p: "Nếu bạn vừa dán một [poster QR “Quét để đặt lịch”](lesson:poster-qr) hoặc in [bảng giá có mã QR](lesson:bang-gia), hãy ghi lại ngày dán rồi xem lượt quét sau vài tuần. Lượt quét thấp thì thử đổi chỗ dán trước khi kết luận rằng khách không dùng mã." },
      ],
    },
    {
      id: "thoi-quen-xem",
      title: "Theo dõi doanh thu tiệm hằng ngày, hằng tuần, hằng tháng",
      blocks: [
        { p: "Một trang nhiều số chỉ có ích khi bạn biết lúc nào xem phần nào. Lịch dưới đây là gợi ý của bài viết, bạn điều chỉnh theo nhịp của tiệm mình:" },
        {
          table: {
            head: ["Khi nào", "Xem phần nào", "Để làm gì"],
            rows: [
              ["Mỗi sáng", "Phần hôm nay, “Lịch hẹn hôm nay”, “Cần xử lý”", "Chuẩn bị cho ngày làm việc và trả lời những gì đang chờ"],
              ["Đầu tuần", "“7 ngày tới”", "Xếp người và tìm cách lấp ngày vắng"],
              ["Cuối tháng", "Bốn con số của tháng, “Doanh thu 6 tháng”, “Dịch vụ bán chạy tháng này”", "Nhìn lại tháng và chỉnh menu, giá, khuyến mãi"],
            ],
          },
        },
        { note: "Đừng phản ứng với con số của một ngày. Một ngày vắng có thể chỉ vì thời tiết hay một ngày lễ. Hãy đợi dòng so sánh với tháng trước và biểu đồ sáu tháng nói cùng một điều rồi mới thay đổi giá hay menu.", kind: "tip", title: "Nhìn xu hướng, không nhìn một ngày" },
      ],
    },
  ],
  howTo: {
    title: "Cách đọc báo cáo doanh thu salon trên trang Tổng quan",
    id: "cach-doc-trang-tong-quan",
    after: "vi-sao-xem-moi-sang",
    lead: "Năm bước dưới đây đi từ trên xuống dưới của trang, đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Mở trang quản trị và đọc phần trên cùng",
        text: "Mở trang quản trị, thẻ “Tổng quan” hiện đầu tiên. Trên cùng là lời chào, số lịch hẹn hôm nay, “Doanh thu dự kiến hôm nay” và “Lịch tiếp theo” với giờ, tên khách và dịch vụ. Chữ “dự kiến” nhắc rằng đây là con số ước tính của ngày, chưa phải tiền đã thu.",
        image: { src: img("doanh-thu-du-kien-hom-nay-va-lich-tiep-theo"), alt: "Phần đầu trang Tổng quan với ô Doanh thu dự kiến hôm nay ghi 250 euro và ô Lịch tiếp theo lúc 10:45 được khoanh vàng" },
      },
      {
        name: "Dùng ba nút “Mở lịch hẹn”, “Xem trang salon”, “Sao chép link đặt lịch”",
        text: "Ba nút này là lối tắt cho ba việc hay làm nhất. “Mở lịch hẹn” đưa bạn sang cuốn lịch. “Xem trang salon” mở trang mà khách nhìn thấy. “Sao chép link đặt lịch” lấy link để bạn dán vào Facebook, Instagram hoặc tin nhắn cho khách tự đặt.",
        image: { src: img("ba-nut-mo-lich-hen-xem-trang-salon-sao-chep-link"), alt: "Lời chào buổi sáng trên trang Tổng quan, bên dưới là các nút Mở lịch hẹn, Tin nhắn, Xem trang salon và Sao chép link đặt lịch được khoanh vàng" },
      },
      {
        name: "Xem bốn con số của tháng",
        text: "Kéo xuống một chút để thấy bốn ô: doanh thu, lịch hẹn, khách hàng mới và đánh giá trung bình. Đọc cả dòng “so với cùng kỳ tháng trước” dưới mỗi số, vì một con số chỉ có nghĩa khi được so với một mốc.",
        image: { src: img("doanh-thu-thang-nay-va-lich-hen-thang-nay"), alt: "Hai ô số Doanh thu tháng này ghi 425 euro và Lịch hẹn tháng này ghi 7 được khoanh vàng, kèm dòng so với cùng kỳ tháng trước" },
      },
      {
        name: "Đọc “Lịch hẹn hôm nay” và “Cần xử lý”",
        text: "“Lịch hẹn hôm nay” liệt kê từng khách theo giờ. “Cần xử lý” nhắc những việc đang chờ, như tin nhắn chưa đọc hay đánh giá chờ duyệt. Xử lý hết phần này trước khi bắt đầu ngày làm việc, để không có khách nào phải chờ câu trả lời.",
        image: { src: img("lich-hen-hom-nay-theo-gio"), alt: "Phần Lịch hẹn hôm nay được khoanh vàng, liệt kê bốn lịch theo giờ kèm tên khách, dịch vụ và tên nhân viên" },
      },
      {
        name: "Kéo xuống xem “7 ngày tới”, “Doanh thu 6 tháng” và “Dịch vụ bán chạy tháng này”",
        text: "Ba phần cuối cho thấy xu hướng: tuần tới đã kín đến đâu, sáu tháng qua doanh thu lên hay xuống, và dịch vụ nào đang mang về nhiều tiền nhất. Bạn không cần xem chúng mỗi ngày. Mỗi tuần một lần là đủ để kịp điều chỉnh.",
        image: { src: img("bieu-do-lich-hen-7-ngay-toi"), alt: "Biểu đồ cột 7 ngày tới được khoanh vàng, cột thứ Hai cao nhất, bên dưới là tiêu đề Doanh thu 6 tháng" },
      },
    ],
  },
  faq: [
    {
      q: "Trang Tổng quan của VaraaAi cho biết những gì?",
      a: "Số lịch hẹn hôm nay, doanh thu dự kiến hôm nay, lịch tiếp theo, bốn con số của tháng, danh sách lịch hẹn hôm nay và những việc cần xử lý. Kéo xuống còn có lịch 7 ngày tới, biểu đồ doanh thu 6 tháng và dịch vụ bán chạy trong tháng.",
    },
    {
      q: "Bốn con số của tháng trên trang Tổng quan được so sánh với gì?",
      a: "Với cùng kỳ tháng trước. Mỗi ô doanh thu, lịch hẹn, khách hàng mới và đánh giá trung bình đều có dòng “so với cùng kỳ tháng trước” để bạn biết tiệm đang lên hay xuống.",
    },
    {
      q: "Phần “Cần xử lý” nhắc những việc gì?",
      a: "Những việc đang chờ bạn, ví dụ tin nhắn chưa đọc hay đánh giá chờ duyệt. Khi không có gì chờ, phần này báo “Mọi thứ đều ổn”.",
    },
    {
      q: "Muốn gửi link đặt lịch cho khách thật nhanh thì bấm nút nào?",
      a: "Bấm “Sao chép link đặt lịch” ở đầu trang Tổng quan. Sau đó dán link vào Facebook, Instagram hoặc tin nhắn để khách tự đặt.",
    },
    {
      q: "Xem dịch vụ nào của salon bán chạy nhất ở đâu?",
      a: "Kéo xuống cuối trang Tổng quan, phần “Dịch vụ bán chạy tháng này”. Các dịch vụ được xếp hạng theo kết quả trong tháng.",
    },
    {
      q: "Làm sao biết có bao nhiêu người quét mã QR trên poster và bảng giá?",
      a: "Trang Tổng quan đếm lượt quét mã QR in trên bảng giá và poster trong 30 ngày. Bạn dùng con số này để biết tờ in có đang được khách dùng hay không.",
    },
  ],
  related: ["chi-nhanh", "doanh-thu-nhan-vien", "xuat-excel", "lich-hen"],
};

export default article;
