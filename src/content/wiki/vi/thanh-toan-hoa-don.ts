import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thanh-toan-hoa-don/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "phan-mem-tinh-tien-salon-hoa-don",
  lesson: "thanh-toan-hoa-don",
  category: "salon",
  title: "Phần mềm tính tiền salon: cách thanh toán tại quầy và gửi hóa đơn cho khách qua email hoặc mã QR",
  metaTitle: "Phần mềm tính tiền salon: thanh toán tại quầy, hóa đơn",
  metaDescription:
    "Hướng dẫn tính tiền tại quầy trên VaraaAi cho tiệm nail, tóc, spa: điền thông tin xuất hóa đơn, chọn hình thức thanh toán, gửi hóa đơn qua email hoặc mã QR.",
  keyword: "phần mềm tính tiền salon",
  keywords: [
    "phần mềm tính tiền tiệm nail",
    "thanh toán tại quầy cho salon",
    "cách xuất hóa đơn cho khách làm nail",
    "gửi hóa đơn cho khách qua email",
    "hóa đơn điện tử bằng mã QR cho salon",
    "thông tin xuất hóa đơn của salon",
    "ghi nhận thanh toán tiền mặt, chuyển khoản, thẻ quà tặng",
  ],
  excerpt: "Điền thông tin xuất hóa đơn một lần. Sau đó mỗi khách chỉ cần vài lần bấm: mở lịch, “Đến quầy thanh toán”, chọn hình thức, xác nhận và gửi hóa đơn.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-va-nhan-vien-cam-dien-thoai-tai-quay-salon"),
    alt: "Một phụ nữ tóc đỏ và một người đàn ông tóc vàng mặc vest đứng hai bên quầy đá của salon, mỗi người cầm một chiếc điện thoại và mỉm cười",
  },
  takeaways: [
    "Làm một lần trước: điền **“Thông tin xuất hóa đơn”** trong “Cài đặt”. Chưa điền thì chưa xác nhận thanh toán được.",
    "Khi khách ra quầy: mở “Lịch hẹn”, bấm vào lịch của khách rồi bấm **“Đến quầy thanh toán”**.",
    "Có ba hình thức thanh toán: **“Tiền mặt”, “Qua ngân hàng”, “Thẻ quà tặng”**. Chọn đúng để báo cáo doanh thu chính xác.",
    "Sau khi bấm “Xác nhận thanh toán”, màn hình báo “Đã xác nhận thanh toán” kèm số hóa đơn.",
    "Ba cách đưa hóa đơn cho khách: “Xem / tải hóa đơn”, nhập email rồi bấm “Gửi”, hoặc “Hiện mã QR” để khách quét.",
  ],
  intro: [
    "Chủ tiệm tìm phần mềm tính tiền salon thường không cần một máy tính tiền phức tạp. Họ cần ba việc diễn ra gọn ở quầy: biết khách phải trả bao nhiêu, ghi lại khách trả bằng cách nào, và đưa cho khách một tờ hóa đơn đàng hoàng. Khi lịch hẹn đã nằm trong VaraaAi thì cả ba việc bắt đầu ngay từ ô lịch của khách, vì dịch vụ và giá đã có sẵn ở đó.",
    "Bài viết này đi theo bài học “Thanh toán tại quầy và hoá đơn” của VaraaAi Academy. Bạn sẽ điền được thông tin xuất hóa đơn, ghi nhận một lần thanh toán từ đầu đến cuối, và gửi hóa đơn cho khách theo cách hợp với từng người.",
  ],
  sections: [
    {
      id: "vi-sao-ghi-nhan-tai-quay",
      title: "Vì sao nên ghi nhận thanh toán tại quầy ngay trên lịch hẹn",
      blocks: [
        { p: "Ở nhiều tiệm, tiền được thu ở quầy còn sổ sách được ghi vào cuối ngày, theo trí nhớ. Khoảng cách vài tiếng đó là nơi phát sinh sai lệch: quên một khách trả chuyển khoản, nhớ nhầm một khách dùng thẻ quà tặng. Ghi nhận ngay lúc khách đứng ở quầy thì con số được chốt khi mọi thứ còn trước mắt." },
        { p: "Làm việc đó từ lịch hẹn còn bớt được một lượt gõ. Dịch vụ, giá và tên khách đã có trong lịch. Bạn chỉ kiểm tra tổng tiền, chọn hình thức thanh toán và xác nhận, tất cả trong vài lần bấm." },
        { p: "Khách cũng được lợi. Họ nhận hóa đơn ngay trên điện thoại hoặc trong hộp thư, có tên công ty, địa chỉ và mã số thuế của tiệm. Khách cần chứng từ có ngay một hóa đơn rõ ràng, không phải chờ tiệm viết tay." },
      ],
    },
    {
      id: "thong-tin-xuat-hoa-don",
      title: "Thông tin xuất hóa đơn của salon: việc làm một lần trước khi thu tiền",
      blocks: [
        { p: "Trước lần thanh toán đầu tiên, bạn cần điền phần “Thông tin xuất hóa đơn” trong mục “Cài đặt”. Dòng chú thích trên màn hình nói rõ: phải điền đầy đủ thông tin này trước khi phát hành được hóa đơn từ nút “Đến quầy thanh toán”. Bốn ô cần điền:" },
        {
          table: {
            head: ["Ô", "Điền gì", "Ví dụ của salon mẫu trong video"],
            rows: [
              ["“Tên công ty”", "Tên pháp lý của doanh nghiệp, có thể khác tên biển hiệu", "Lumi Beauty SARL"],
              ["“Địa chỉ công ty”", "Địa chỉ đăng ký của doanh nghiệp", "10 Rue de Rivoli, 75004 Paris"],
              ["“Mã số doanh nghiệp / mã số thuế”", "Mã số do cơ quan nơi tiệm đăng ký cấp", "FR 00 000 000 000"],
              ["“Thuế VAT (%)”", "Mức thuế áp dụng cho dịch vụ của tiệm", "20"],
            ],
          },
        },
        { img: { src: img("dien-thong-tin-xuat-hoa-don-ten-cong-ty"), alt: "Phần Thông tin xuất hóa đơn trong Cài đặt với các ô Tên công ty, Địa chỉ công ty được khoanh vàng, Mã số doanh nghiệp, Thuế VAT và nút Lưu thông tin hóa đơn" } },
        { p: "Bốn thông tin này hiện trên mọi hóa đơn tiệm phát ra, nên hãy chép từ giấy đăng ký kinh doanh thay vì gõ theo trí nhớ. Điền xong, bấm “Lưu thông tin hóa đơn”." },
        { note: "Mức thuế VAT và các thông tin bắt buộc trên hóa đơn khác nhau theo từng nước. Con số 20 trong video chỉ là ví dụ của salon mẫu. Hãy hỏi kế toán của tiệm hoặc cơ quan thuế nơi bạn hoạt động để điền đúng.", kind: "warn", title: "Quy định thuế khác nhau theo quốc gia" },
        { p: "Phần này cũng được nhắc trong bài [chính sách hủy lịch và thanh toán của salon](lesson:thanh-toan-chinh-sach), nơi bạn còn đặt hạn hủy lịch và điền thông tin nhận chuyển khoản." },
      ],
    },
    {
      id: "ba-hinh-thuc-thanh-toan",
      title: "Ghi nhận thanh toán tiền mặt, chuyển khoản hay thẻ quà tặng",
      blocks: [
        { p: "Trang thanh toán có ba lựa chọn ở dòng “Hình thức thanh toán”. Bạn chọn theo đúng cách khách vừa trả:" },
        {
          table: {
            head: ["Hình thức", "Chọn khi nào"],
            rows: [
              ["“Tiền mặt”", "Khách đưa tiền mặt tại quầy"],
              ["“Qua ngân hàng”", "Khách trả qua ngân hàng, ví dụ chuyển khoản"],
              ["“Thẻ quà tặng”", "Khách dùng thẻ quà tặng của salon"],
            ],
          },
        },
        { img: { src: img("chon-hinh-thuc-thanh-toan-tien-mat-ngan-hang-the-qua-tang"), alt: "Trang Đến quầy thanh toán với dịch vụ Gel manicure 45 EUR, tổng cộng 45,00 € và ba hình thức Tiền mặt, Qua ngân hàng, Thẻ quà tặng, ô cuối được khoanh vàng" } },
        { p: "Chọn đúng hình thức để báo cáo doanh thu chính xác. Cuối ngày, số tiền mặt trong ngăn kéo phải khớp với tổng các lần chọn “Tiền mặt”. Một lần chọn nhầm là một lần đếm tiền không khớp mà không biết vì sao." },
        { p: "Phía trên dòng hình thức là dịch vụ kèm giá và dòng “Tổng cộng”. Bạn sửa được giá nếu cần, chẳng hạn khi khách đổi ý làm thêm hay bớt so với lúc đặt. Bên dưới có ô “Thêm thông tin vào biên lai” để ghi một dòng chú thích cho lần thu đó." },
        { p: "Tiệm chưa bán thẻ quà tặng có thể xem cách tạo trong bài học về [thẻ quà tặng của salon](lesson:the-qua-tang-salon)." },
      ],
    },
    {
      id: "gui-hoa-don-cho-khach",
      title: "Ba cách gửi hóa đơn cho khách: tải về, email hoặc mã QR",
      blocks: [
        { p: "Sau khi bạn bấm “Xác nhận thanh toán”, màn hình báo “Đã xác nhận thanh toán”, kèm số hóa đơn và số tiền. Ngay bên dưới là ba cách đưa hóa đơn đến tay khách:" },
        {
          table: {
            head: ["Cách", "Thao tác", "Hợp với"],
            rows: [
              ["Mở hóa đơn", "Bấm “Xem / tải hóa đơn”", "Khi bạn muốn xem lại hoặc tải tệp hóa đơn về máy"],
              ["Gửi qua email", "Nhập email của khách rồi bấm “Gửi”", "Khách cần hóa đơn trong hộp thư để lưu hoặc chuyển tiếp"],
              ["Mã QR", "Bấm “Hiện mã QR” và đưa màn hình cho khách quét", "Khách muốn nhận ngay trên điện thoại, không cần đọc email"],
            ],
          },
        },
        { img: { src: img("da-xac-nhan-thanh-toan-kem-so-hoa-don"), alt: "Màn hình Đã xác nhận thanh toán với số hóa đơn, số tiền 45,00 €, nút Xem / tải hóa đơn được khoanh vàng, ô gửi hóa đơn qua email và nút Hiện mã QR" } },
        { p: "Mã QR là cách nhanh nhất khi khách đang đứng trước mặt: khách quét mã là tải được hóa đơn về điện thoại, và bạn không phải hỏi rồi gõ địa chỉ email. Phía khách, việc quét mã và mở lại hóa đơn được mô tả trong bài [xem lại hóa đơn bằng mã QR](lesson:hoa-don)." },
        { img: { src: img("hien-ma-qr-de-khach-tai-hoa-don"), alt: "Màn hình Đã xác nhận thanh toán với nút Hiện mã QR được khoanh vàng, phía trên là nút Xem / tải hóa đơn và ô nhập email để gửi hóa đơn" } },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi tính tiền tại quầy",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Bấm thanh toán nhưng trang nhắc điền thông tin", "Vào “Cài đặt”, điền đủ “Thông tin xuất hóa đơn” rồi bấm “Lưu thông tin hóa đơn”. Sau đó quay lại xác nhận thanh toán"],
              ["Số tiền thực thu khác giá trong lịch", "Sửa giá ngay trên trang thanh toán trước khi bấm “Xác nhận thanh toán”"],
              ["Khách không muốn đọc email", "Bấm “Hiện mã QR” để khách quét và tải hóa đơn"],
              ["Khách trả bằng thẻ quà tặng", "Chọn “Thẻ quà tặng” ở “Hình thức thanh toán”"],
              ["Cần ghi chú riêng cho lần thu này", "Viết vào ô “Thêm thông tin vào biên lai”"],
            ],
          },
        },
        { p: "Thanh toán tại quầy ghi lại khách đã trả gì. Nếu tiệm có nhiều thợ và bạn muốn biết mỗi người thu bao nhiêu, kèm tiền tip, hãy đọc tiếp bài [báo cáo thu nhập của nhân viên](lesson:doanh-thu-nhan-vien). Còn toàn bộ thao tác trên trang lịch, từ thêm lịch đến đánh dấu khách không đến, nằm trong bài [quản lý lịch hẹn salon](lesson:lich-hen)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước tính tiền và xuất hóa đơn cho khách trên VaraaAi",
    id: "cac-buoc-thanh-toan-tai-quay",
    after: "thong-tin-xuat-hoa-don",
    lead: "Bước đầu chỉ làm một lần. Năm bước sau lặp lại cho mỗi khách ra quầy, theo đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Điền “Thông tin xuất hóa đơn” trong “Cài đặt”",
        text: "Vào mục “Cài đặt”, kéo xuống phần “Thông tin xuất hóa đơn”. Nhập “Tên công ty”, “Địa chỉ công ty”, “Mã số doanh nghiệp / mã số thuế” và “Thuế VAT (%)”, rồi bấm “Lưu thông tin hóa đơn”. Bạn chỉ làm bước này một lần.",
        image: { src: img("nhap-thue-vat-va-luu-thong-tin-hoa-don"), alt: "Các ô Địa chỉ công ty, Mã số doanh nghiệp / mã số thuế và Thuế VAT được khoanh vàng, bên dưới là nút Lưu thông tin hóa đơn" },
      },
      {
        name: "Mở “Lịch hẹn” và bấm vào lịch của khách",
        text: "Khi khách làm xong và ra quầy, mở trang “Lịch hẹn” rồi bấm vào ô lịch của khách đó. Phần chi tiết hiện dịch vụ, giờ hẹn và tổng tiền cần thu.",
        image: { src: img("mo-lich-hen-cua-khach-de-tinh-tien"), alt: "Lịch trong ngày của ba nhân viên với ô lịch Gel manicure lúc 11:15–12:15 ở cột đầu tiên được khoanh vàng" },
      },
      {
        name: "Bấm “Đến quầy thanh toán”",
        text: "Trong phần chi tiết lịch hẹn, bấm nút “Đến quầy thanh toán”. Trang thanh toán mở ra với dịch vụ và giá lấy từ lịch hẹn, bạn không phải nhập lại.",
        image: { src: img("bam-den-quay-thanh-toan-trong-chi-tiet-lich-hen"), alt: "Chi tiết lịch hẹn Gel manicure với tổng cộng cần thu 45,00 € và nút Đến quầy thanh toán được khoanh vàng, bên cạnh là nút Hoàn thành" },
      },
      {
        name: "Kiểm tra tổng tiền và chọn “Hình thức thanh toán”",
        text: "Xem lại dòng “Tổng cộng” và sửa giá nếu cần. Sau đó chọn “Hình thức thanh toán”: “Tiền mặt”, “Qua ngân hàng” hoặc “Thẻ quà tặng”, đúng với cách khách vừa trả.",
        image: { src: img("kiem-tra-tong-tien-truoc-khi-thu"), alt: "Trang Đến quầy thanh toán với dòng dịch vụ Gel manicure 45 EUR và dòng Tổng cộng 45,00 € được khoanh vàng, bên dưới là ba hình thức thanh toán" },
      },
      {
        name: "Bấm “Xác nhận thanh toán”",
        text: "Nếu cần, ghi thêm thông tin vào biên lai ở ô bên dưới. Rồi bấm “Xác nhận thanh toán”. Màn hình báo “Đã xác nhận thanh toán” kèm số hóa đơn.",
        image: { src: img("them-thong-tin-vao-bien-lai-va-xac-nhan-thanh-toan"), alt: "Trang Đến quầy thanh toán với ô Thêm thông tin vào biên lai và nút Xác nhận thanh toán màu đen được khoanh vàng, bên cạnh là nút Huỷ" },
      },
      {
        name: "Gửi hóa đơn cho khách",
        text: "Bấm “Xem / tải hóa đơn” để mở hóa đơn. Muốn gửi cho khách, nhập email rồi bấm “Gửi”. Hoặc bấm “Hiện mã QR”, khách quét mã là tải được hóa đơn về điện thoại.",
        image: { src: img("gui-hoa-don-cho-khach-qua-email"), alt: "Màn hình Đã xác nhận thanh toán với ô Gửi hóa đơn qua email và nút Gửi được khoanh vàng, bên dưới là nút Hiện mã QR và Đóng" },
      },
    ],
  },
  faq: [
    {
      q: "Cần làm gì trước khi xác nhận thanh toán đầu tiên trên VaraaAi?",
      a: "Điền thông tin xuất hóa đơn trong “Cài đặt”: tên công ty, địa chỉ công ty, mã số doanh nghiệp hoặc mã số thuế và thuế VAT. Các thông tin này hiện trên hóa đơn. Chưa điền thì chưa xác nhận thanh toán được, và trang sẽ nhắc bạn điền ở Cài đặt trước.",
    },
    {
      q: "Có mấy hình thức thanh toán để chọn tại quầy?",
      a: "Ba hình thức: “Tiền mặt”, “Qua ngân hàng” và “Thẻ quà tặng”. Hãy chọn đúng cách khách đã trả để báo cáo doanh thu chính xác.",
    },
    {
      q: "Khách muốn nhận hóa đơn ngay trên điện thoại thì làm thế nào?",
      a: "Sau khi xác nhận thanh toán, bấm “Hiện mã QR” và để khách quét. Khách quét mã là tải được hóa đơn về điện thoại. Bạn cũng có thể nhập email của khách rồi bấm “Gửi”.",
    },
    {
      q: "Có sửa được giá lúc tính tiền không?",
      a: "Có. Trang thanh toán hiện tổng tiền lấy từ lịch hẹn, và bạn sửa được giá nếu cần trước khi bấm “Xác nhận thanh toán”.",
    },
    {
      q: "Bắt đầu tính tiền cho một khách từ đâu?",
      a: "Từ trang “Lịch hẹn”. Bấm vào lịch của khách để mở chi tiết, rồi bấm “Đến quầy thanh toán”. Trang thanh toán mở ra với dịch vụ và tổng tiền của lịch hẹn đó.",
    },
    {
      q: "Thuế VAT trên hóa đơn của salon nên điền bao nhiêu?",
      a: "Ô “Thuế VAT (%)” do bạn tự điền trong “Thông tin xuất hóa đơn”. Mức thuế khác nhau theo từng nước, nên hãy hỏi kế toán hoặc cơ quan thuế nơi tiệm hoạt động để điền đúng.",
    },
  ],
  related: ["lich-hen", "doanh-thu-nhan-vien", "thanh-toan-chinh-sach", "the-qua-tang-salon"],
};

export default article;
