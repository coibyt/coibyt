import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/doanh-thu-nhan-vien/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "quan-ly-doanh-thu-tiem-nail",
  lesson: "doanh-thu-nhan-vien",
  category: "salon",
  title: "Quản lý doanh thu tiệm nail theo từng thợ: nhân viên báo cáo sau mỗi khách, chủ tiệm duyệt và xem tổng thu, tiền tip",
  metaTitle: "Quản lý doanh thu tiệm nail theo từng thợ, kèm tiền tip",
  metaDescription:
    "Báo cáo thu nhập của nhân viên trên VaraaAi cho tiệm nail, tóc, spa: thợ nhập số tiền đã thu sau mỗi khách, chủ tiệm đối chiếu, duyệt và xem theo từng người.",
  keyword: "quản lý doanh thu tiệm nail",
  keywords: [
    "doanh thu theo nhân viên salon",
    "báo cáo thu nhập của nhân viên",
    "cách tính lương thợ nail theo doanh thu",
    "quản lý tiền tip của thợ nail",
    "đối chiếu tiền mặt và chuyển khoản cuối ngày",
    "phần mềm quản lý doanh thu salon",
    "nhắc nhân viên báo cáo doanh thu",
  ],
  excerpt: "Thợ bấm “Báo cáo thu nhập” sau mỗi khách và nhập số tiền vào đúng ô. Chủ tiệm mở “Quản trị doanh thu”, đối chiếu với số cần thu rồi duyệt.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-tra-tien-tai-quay-salon-voi-nhan-vien"),
    alt: "Một người đàn ông tóc vàng mặc áo len và một phụ nữ tóc nâu cầm điện thoại đứng cười nói bên quầy gỗ sáng màu cạnh cửa sổ lớn của salon",
  },
  takeaways: [
    "Nhân viên báo cáo ngay sau mỗi khách: mở lịch hẹn đó trên trang “Lịch hẹn” rồi bấm **“Báo cáo thu nhập”**.",
    "Số tiền được nhập vào đúng ô: tiền mặt, ngân hàng, MobilePay, trả trước online hoặc thẻ quà tặng. Nút **“Điền đủ”** điền nhanh cả số tiền.",
    "**Tiền tip là của riêng nhân viên**: không cộng vào doanh thu salon, chỉ để thống kê tip cuối tháng.",
    "Chủ salon mở **“Quản trị doanh thu”**, đối chiếu từng báo cáo với số cần thu rồi bấm “Duyệt”, hoặc “Chưa duyệt” để nhân viên sửa.",
    "Phần **“Theo nhân viên”** cho biết mỗi người thu được bao nhiêu trong kỳ đã chọn.",
  ],
  intro: [
    "Quản lý doanh thu tiệm nail khó nhất ở một câu hỏi cuối ngày: mỗi người thợ đã thu bao nhiêu tiền, bằng tiền mặt hay chuyển khoản. Khi tiệm có ba bốn thợ cùng nhận tiền, con số trong ngăn kéo, trong tài khoản và trong trí nhớ của từng người hiếm khi tự khớp với nhau. Cách gỡ là để mỗi lần thu tiền được ghi lại ngay lúc nó xảy ra, bởi chính người vừa thu.",
    "Bài viết này đi theo bài học “Báo cáo thu nhập của nhân viên” của VaraaAi Academy. Bạn sẽ biết nhân viên báo cáo một lịch hẹn thế nào, chủ tiệm duyệt ra sao, tiền tip được tính ở đâu, và đọc được doanh thu theo từng người trong một kỳ.",
  ],
  sections: [
    {
      id: "vi-sao-bao-cao-sau-moi-khach",
      title: "Vì sao nên để nhân viên báo cáo doanh thu sau mỗi khách",
      blocks: [
        { p: "Cách làm quen thuộc ở nhiều tiệm là cuối ngày cả tiệm ngồi lại, mỗi người đọc số của mình, chủ tiệm cộng trên giấy. Cách đó dựa hoàn toàn vào trí nhớ sau một ngày dài. Một khách trả nửa tiền mặt nửa chuyển khoản, hay một khách dùng thẻ quà tặng, là đủ để tổng số lệch." },
        { p: "Khi báo cáo gắn với từng lịch hẹn, việc đối chiếu trở nên đơn giản. Lịch hẹn đã có sẵn số tiền cần thu. Nhân viên chỉ nhập số tiền khách thật sự đã trả và trả bằng gì. Chủ tiệm không phải hỏi lại ai, chỉ cần xem và duyệt." },
        { p: "Cách này cũng công bằng với thợ. Tiền tip được ghi riêng cho từng người, và con số mỗi người thu trong kỳ nằm ngay trên màn hình, không ai phải cãi nhau về một cuốn sổ." },
      ],
    },
    {
      id: "phieu-bao-cao-co-gi",
      title: "Phiếu báo cáo thu nhập của nhân viên có những ô nào",
      blocks: [
        { p: "Phiếu báo cáo mở ra khi nhân viên bấm “Báo cáo thu nhập” trong chi tiết lịch hẹn. Trên cùng là tên khách, dịch vụ và dòng “Cần thu theo lịch hẹn”. Bên dưới là các ô để nhập số tiền theo từng cách khách đã trả:" },
        {
          table: {
            head: ["Ô", "Nhập gì"],
            rows: [
              ["“Thanh toán tiền mặt”", "Số tiền mặt khách đưa"],
              ["“Thanh toán ngân hàng”", "Số tiền khách trả qua ngân hàng"],
              ["“Thanh toán MobilePay”", "Số tiền khách trả qua MobilePay"],
              ["“Thanh toán online trước”", "Số tiền khách đã trả trước qua mạng, kèm ô ghi kênh thanh toán"],
              ["“Thẻ quà tặng”", "Số tiền trả bằng thẻ quà tặng. Ô mã thẻ không bắt buộc"],
              ["“Tiền tip”", "Tiền khách cho thêm, là của riêng nhân viên"],
              ["“Ghi chú”", "Điều cần giải thích, ví dụ đã giảm giá cho khách quen"],
            ],
          },
        },
        { img: { src: img("nhap-so-tien-mat-ngan-hang-mobilepay-da-thu"), alt: "Phiếu báo cáo thu nhập với dòng Cần thu theo lịch hẹn 45,00 € và ba ô Thanh toán tiền mặt, ngân hàng, MobilePay được khoanh vàng, mỗi ô có nút Điền đủ", caption: "Mỗi ô có nút “Điền đủ” để điền nhanh cả số tiền cần thu." } },
        { p: "Khách trả bằng hai cách thì nhân viên nhập vào hai ô. Dòng “Tổng thu” tự cộng lại, và khi tổng bằng số cần thu thì hiện chữ “Khớp với số cần thu”. Dấu hiệu này giúp nhân viên tự bắt lỗi gõ nhầm trước khi gửi." },
        { img: { src: img("o-thanh-toan-online-truoc-va-the-qua-tang"), alt: "Phần dưới của phiếu báo cáo với ô Thanh toán online trước kèm ô Kênh thanh toán, và hai ô Thẻ quà tặng 1, Thẻ quà tặng 2 kèm ô Mã thẻ không bắt buộc" } },
      ],
    },
    {
      id: "tien-tip",
      title: "Quản lý tiền tip của thợ nail: ghi riêng, không cộng vào doanh thu",
      blocks: [
        { p: "Nếu khách cho thêm tiền tip, nhân viên ghi vào ô “Tiền tip”. Dòng chú thích ngay dưới ô nói rõ nguyên tắc: tip là của riêng nhân viên, không cộng vào doanh thu salon, và chỉ dùng để thống kê tip cuối tháng." },
        { img: { src: img("o-tien-tip-cua-rieng-nhan-vien"), alt: "Dòng Tổng thu 45,00 € khớp với số cần thu, bên dưới là ô Tiền tip được khoanh vàng kèm chú thích tip là của riêng nhân viên, không cộng vào doanh thu salon" } },
        { p: "Tách tip khỏi doanh thu có hai cái lợi. Số doanh thu của tiệm không bị đội lên bởi khoản tiền không thuộc về tiệm. Và người thợ có một con số tip cuối tháng rõ ràng mà không phải tự ghi sổ. Ở trang của chủ tiệm, tiền tip cũng nằm trong một ô riêng, cạnh các ô tổng thu." },
        { note: "Cách ghi nhận và khai báo tiền tip khác nhau theo từng nước. Bài học chỉ nói đến việc thống kê trong ứng dụng. Về nghĩa vụ thuế của tip, hãy hỏi kế toán nơi tiệm hoạt động.", kind: "warn", title: "Quy định về tip tùy quốc gia" },
      ],
    },
    {
      id: "chu-salon-duyet",
      title: "Chủ salon đối chiếu và duyệt báo cáo trong “Quản trị doanh thu”",
      blocks: [
        { p: "Phần của chủ tiệm nằm ở mục “Quản trị doanh thu”. Trên cùng là các ô số liệu của kỳ đang xem. Bên dưới là từng báo cáo nhân viên đã gửi." },
        {
          table: {
            head: ["Ô số liệu", "Ý nghĩa"],
            rows: [
              ["Tổng thu", "Tổng số tiền trong các báo cáo, kèm số báo cáo"],
              ["Đã duyệt", "Số tiền bạn đã đối chiếu và chấp nhận"],
              ["Chờ duyệt", "Số tiền nhân viên đã báo cáo, đang đợi bạn xem"],
              ["Chưa duyệt", "Số tiền trong các báo cáo bạn trả lại để nhân viên sửa"],
              ["Tiền tip", "Tổng tip nhân viên đã ghi, không tính vào doanh thu"],
            ],
          },
        },
        { img: { src: img("quan-tri-doanh-thu-tong-thu-da-duyet-cho-duyet"), alt: "Đầu trang Quản trị doanh thu với bốn ô Tổng thu, Đã duyệt, Chờ duyệt và Chưa duyệt được khoanh vàng, bên dưới là ô Tiền tip" } },
        { p: "Mỗi báo cáo ghi tên khách, dịch vụ, tên nhân viên, số tiền đã thu theo từng hình thức và dòng “Cần thu”. Bạn so hai con số, nếu đúng thì bấm “Duyệt”. Số tiền chuyển từ ô “Chờ duyệt” sang ô “Đã duyệt”." },
        {
          table: {
            head: ["Nút", "Dùng khi nào"],
            rows: [
              ["“Duyệt”", "Số tiền báo cáo đúng với số cần thu và với tiền thực nhận"],
              ["“Chưa duyệt”", "Số tiền chưa đúng. Báo cáo quay về cho nhân viên cập nhật"],
              ["“Duyệt tất cả”", "Bạn đã xem hết và mọi báo cáo đang chờ đều đúng"],
            ],
          },
        },
        { img: { src: img("nut-chua-duyet-de-nhan-vien-sua-bao-cao"), alt: "Một báo cáo đang Chờ duyệt với nút Chưa duyệt được khoanh vàng, bên cạnh là nút Cập nhật báo cáo và nút Duyệt màu xanh, phía trên là nút Duyệt tất cả", caption: "Nút “Chưa duyệt” trả báo cáo về cho nhân viên sửa lại." } },
        { note: "Nút “Duyệt tất cả” tiện vào cuối ngày, nhưng chỉ nên bấm sau khi đã đếm tiền mặt và xem tài khoản. Duyệt là lời xác nhận của chủ tiệm rằng con số đó đúng.", kind: "tip", title: "Đếm tiền trước, duyệt sau" },
      ],
    },
    {
      id: "doanh-thu-theo-nhan-vien",
      title: "Doanh thu theo nhân viên và cách tính lương thợ nail theo doanh thu",
      blocks: [
        { p: "Phần “Theo nhân viên” liệt kê từng người kèm số báo cáo và tổng số tiền người đó thu được trong kỳ đã chọn. Đây là con số nhiều chủ tiệm cần nhất, vì ở nhiều tiệm nail thu nhập của thợ gắn với doanh thu họ làm ra." },
        { img: { src: img("doanh-thu-theo-nhan-vien-trong-ky"), alt: "Phần Theo nhân viên được khoanh vàng với một nhân viên có 1 báo cáo và tổng 45,00 €, bên dưới là công tắc Nhắc nhân viên báo cáo" } },
        { p: "Bài học không giới thiệu chức năng tự tính lương hay hoa hồng. Việc trang này làm là cho bạn con số gốc đáng tin: tổng số tiền từng người đã thu trong kỳ, sau khi bạn đã đối chiếu và duyệt các báo cáo. Từ con số đó, bạn áp tỉ lệ ăn chia mà tiệm và thợ đã thỏa thuận. Tip không nằm trong con số này vì đã được ghi riêng." },
        { p: "Con số chỉ đúng khi mọi lịch hẹn đều được báo cáo. Vì vậy nên bật “Nhắc nhân viên báo cáo”. Khi bật, lịch hẹn kết thúc quá 24 giờ mà chưa có báo cáo thì ứng dụng tự nhắc nhân viên." },
        { p: "Muốn đưa số liệu ra bảng tính để tự tính lương hoặc gửi kế toán, bạn tải được bảng doanh thu về dạng Excel ngay từ “Quản trị doanh thu”, có dòng tổng dưới từng nhân viên. Cách làm nằm trong bài học về [xuất Excel](lesson:xuat-excel)." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi quản lý doanh thu theo từng thợ",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Khách trả một phần tiền mặt, một phần chuyển khoản", "Nhân viên nhập hai số vào hai ô. Dòng “Tổng thu” tự cộng"],
              ["Khách đã trả trước qua mạng", "Nhập vào ô “Thanh toán online trước”"],
              ["Khách cho tip", "Ghi vào ô “Tiền tip”, không cộng vào các ô thanh toán"],
              ["Số tiền trong báo cáo không khớp tiền thực nhận", "Chủ tiệm bấm “Chưa duyệt” để nhân viên sửa lại"],
              ["Nhân viên hay quên báo cáo", "Bật “Nhắc nhân viên báo cáo”"],
              ["Cần chứng cứ cho một khoản chuyển khoản", "Nhân viên chụp ảnh biên lai và đính kèm vào báo cáo"],
            ],
          },
        },
        { p: "Báo cáo thu nhập và thanh toán tại quầy là hai việc khác nhau trên cùng một lịch hẹn. Thanh toán tại quầy ghi nhận khoản thu và phát hóa đơn cho khách, xem bài [phần mềm tính tiền salon](lesson:thanh-toan-hoa-don). Báo cáo thu nhập là lời xác nhận của người thợ với chủ tiệm về số tiền đã cầm. Để nhân viên mở được lịch hẹn của mình và gửi báo cáo, mỗi người cần có tài khoản với quyền phù hợp, như trong bài [quản lý nhân viên salon](lesson:nhan-vien)." },
        { p: "Cả hai đều bắt đầu từ trang lịch, nên nếu tiệm chưa quen dùng lịch hằng ngày thì hãy đọc bài [quản lý lịch hẹn salon](lesson:lich-hen) trước. Bức tranh chung của cả tiệm theo thời gian nằm ở trang [Tổng quan](lesson:tong-quan)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước báo cáo và duyệt doanh thu theo nhân viên salon trên VaraaAi",
    id: "cac-buoc-bao-cao-va-duyet",
    after: "vi-sao-bao-cao-sau-moi-khach",
    lead: "Ba bước đầu là việc của nhân viên sau mỗi khách. Ba bước sau là việc của chủ salon, theo đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Nhân viên mở lịch hẹn và bấm “Báo cáo thu nhập”",
        text: "Làm xong cho khách, nhân viên mở lịch hẹn đó trên trang “Lịch hẹn” rồi bấm “Báo cáo thu nhập”. Phiếu báo cáo hiện ra, trên cùng là số tiền cần thu theo lịch hẹn. Báo cáo gắn với đúng lịch hẹn nên rất dễ đối chiếu.",
        image: { src: img("nut-bao-cao-thu-nhap-trong-chi-tiet-lich-hen"), alt: "Chi tiết lịch hẹn với tổng cộng cần thu 45,00 € và nút Báo cáo thu nhập màu vàng được khoanh, cạnh dòng Nhập số tiền đã thu của khách này" },
      },
      {
        name: "Nhập số tiền khách đã trả vào đúng ô",
        text: "Nhập số tiền vào ô tương ứng: tiền mặt, ngân hàng hoặc MobilePay. Bấm “Điền đủ” để điền nhanh cả số tiền. Khách đã trả trước online hay trả bằng thẻ quà tặng cũng có ô riêng. Nhìn dòng “Tổng thu” để chắc nó báo khớp với số cần thu.",
        image: { src: img("tong-thu-khop-voi-so-can-thu"), alt: "Dòng Tổng thu 45,00 € với dấu Khớp với số cần thu được khoanh vàng, phía trên là ô Thẻ quà tặng 2 và phía dưới là ô Tiền tip" },
      },
      {
        name: "Ghi “Tiền tip”, thêm ghi chú rồi bấm “Gửi báo cáo”",
        text: "Nếu khách cho thêm tip, ghi vào ô “Tiền tip”. Có thể viết thêm ghi chú và chụp ảnh biên lai. Xong, bấm “Gửi báo cáo”. Báo cáo chuyển sang chờ chủ salon duyệt.",
        image: { src: img("nut-gui-bao-cao-thu-nhap"), alt: "Cuối phiếu báo cáo với dòng Tổng thu, ô Tiền tip, ô Ghi chú và nút Gửi báo cáo màu vàng được khoanh, bên cạnh là nút Đóng" },
      },
      {
        name: "Chủ salon mở “Quản trị doanh thu”",
        text: "Bấm mục “Quản trị doanh thu”. Trên cùng là tổng thu, số đã duyệt, số đang chờ duyệt và tiền tip. Bên dưới là từng báo cáo nhân viên đã gửi.",
      },
      {
        name: "Đối chiếu rồi bấm “Duyệt” hoặc “Chưa duyệt”",
        text: "So số tiền trong từng báo cáo với số cần thu, rồi bấm “Duyệt”. Nếu số tiền chưa đúng, bấm “Chưa duyệt” để nhân viên sửa lại. Muốn nhanh thì bấm “Duyệt tất cả”. Duyệt xong, số tiền chuyển sang ô “Đã duyệt”.",
        image: { src: img("doi-chieu-bao-cao-voi-so-can-thu-roi-duyet"), alt: "Một báo cáo đang Chờ duyệt được khoanh vàng, ghi tên khách, dịch vụ Gel manicure, thanh toán tiền mặt 45,00 €, cần thu 45,00 € và các nút Duyệt, Chưa duyệt" },
      },
      {
        name: "Xem “Theo nhân viên” và bật “Nhắc nhân viên báo cáo”",
        text: "Kéo xuống phần “Theo nhân viên” để biết mỗi người thu được bao nhiêu trong kỳ. Ngay bên dưới, bật “Nhắc nhân viên báo cáo”: lịch hẹn kết thúc quá 24 giờ mà chưa có báo cáo thì ứng dụng tự nhắc.",
        image: { src: img("bat-nhac-nhan-vien-bao-cao-sau-24-gio"), alt: "Thẻ Nhắc nhân viên báo cáo được khoanh vàng với công tắc đang tắt và chú thích về lịch hẹn kết thúc quá 24 giờ mà chưa báo cáo" },
      },
    ],
  },
  faq: [
    {
      q: "Nhân viên báo cáo số tiền đã thu ở đâu?",
      a: "Nhân viên mở lịch hẹn của khách trên trang “Lịch hẹn” rồi bấm “Báo cáo thu nhập”. Báo cáo gắn với đúng lịch hẹn đó, nên chủ salon dễ đối chiếu với số cần thu.",
    },
    {
      q: "Tiền tip có được cộng vào doanh thu của salon không?",
      a: "Không. Tip là của riêng nhân viên và không cộng vào doanh thu salon. Tiền tip chỉ được ghi lại để thống kê tip cuối tháng.",
    },
    {
      q: "Số tiền trong báo cáo chưa đúng thì chủ salon làm gì?",
      a: "Bấm “Chưa duyệt” ở báo cáo đó. Báo cáo chưa duyệt quay về cho nhân viên cập nhật, sau đó bạn xem lại và duyệt.",
    },
    {
      q: "Làm sao biết mỗi thợ thu được bao nhiêu trong tháng?",
      a: "Mở “Quản trị doanh thu” và xem phần “Theo nhân viên”. Phần này cho biết mỗi người thu được bao nhiêu trong kỳ đã chọn, kèm số báo cáo của người đó.",
    },
    {
      q: "Khách trả một nửa tiền mặt, một nửa chuyển khoản thì báo cáo thế nào?",
      a: "Nhân viên nhập từng số tiền vào đúng ô, tiền mặt vào ô tiền mặt và phần còn lại vào ô ngân hàng. Dòng “Tổng thu” tự cộng lại và báo khớp khi bằng số cần thu.",
    },
    {
      q: "Nhân viên quên báo cáo thì sao?",
      a: "Hãy bật “Nhắc nhân viên báo cáo” trong “Quản trị doanh thu”. Khi bật, lịch hẹn kết thúc quá 24 giờ mà chưa có báo cáo thì ứng dụng tự nhắc nhân viên.",
    },
  ],
  related: ["thanh-toan-hoa-don", "lich-hen", "xuat-excel", "nhan-vien"],
};

export default article;
