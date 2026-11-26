import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lich-hen/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "phan-mem-quan-ly-lich-hen-salon",
  lesson: "lich-hen",
  category: "salon",
  title: "Phần mềm quản lý lịch hẹn salon: cách xem lịch theo từng thợ, thêm lịch cho khách gọi điện và dời lịch",
  metaTitle: "Phần mềm quản lý lịch hẹn salon: xem, thêm, dời lịch",
  metaDescription:
    "Hướng dẫn dùng trang Lịch hẹn của VaraaAi cho tiệm nail, tóc, mi, spa: mỗi thợ một cột, xem theo ngày, tuần, tháng, thêm lịch cho khách gọi điện và dời lịch.",
  keyword: "phần mềm quản lý lịch hẹn salon",
  keywords: [
    "quản lý lịch hẹn tiệm nail",
    "sổ lịch hẹn online cho salon",
    "cách thêm lịch hẹn cho khách gọi điện",
    "xem lịch hẹn theo nhân viên",
    "dời lịch hẹn của khách",
    "đánh dấu khách không đến",
    "lịch hẹn salon trên điện thoại",
  ],
  excerpt: "Mỗi nhân viên một cột, mỗi lịch hẹn một ô. Nhấn giữ ô trống để thêm lịch, bấm vào lịch để cập nhật trạng thái, kéo ô lịch để dời giờ.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("salon-toc-co-dien-tho-dang-lam-toc-cho-khach"),
    alt: "Trong một salon cổ điển có ba chiếc gương mạ vàng và đèn chùm, người thợ tóc đứng chải tóc cho khách nữ tóc vàng ngồi trên ghế nhung tím",
  },
  takeaways: [
    "Trang **“Lịch hẹn”** xếp mỗi nhân viên một cột và mỗi lịch hẹn một ô, nhìn một lần là thấy cả ngày.",
    "Ô có **biểu tượng quả địa cầu** là “Khách tự đặt online”. Ô còn lại là “Salon tự thêm”.",
    "Thêm lịch cho khách gọi điện hoặc khách vãng lai: **nhấn giữ khoảng 1 giây** vào ô trống, đúng giờ và đúng cột nhân viên.",
    "Bấm vào một lịch hẹn để cập nhật: “Đến quầy thanh toán”, “Hoàn thành”, “Không đến” hoặc “Huỷ”.",
    "Dời lịch bằng cách **kéo ô lịch hẹn** sang giờ mới. Hệ thống hỏi lại trước khi chuyển.",
  ],
  intro: [
    "Một phần mềm quản lý lịch hẹn salon chỉ có ích khi nó trả lời được ba câu ngay lúc chuông điện thoại reo: hôm nay ai làm cho ai, giờ nào còn trống, và khách vừa gọi nên xếp vào đâu. Cuốn sổ giấy làm được việc đó khi tiệm có một thợ. Thêm người thứ hai, thứ ba, cộng với khách tự đặt qua mạng lúc nửa đêm, thì sổ bắt đầu có chỗ gạch xóa và chỗ ghi trùng.",
    "Bài viết này đi theo bài học “Lịch hẹn: xem, thêm và cập nhật” của VaraaAi Academy. Bạn sẽ đọc được trang Lịch hẹn, tự thêm lịch cho khách gọi điện ngay trên điện thoại, cập nhật trạng thái sau mỗi khách, và dời một lịch hẹn sang giờ khác.",
  ],
  sections: [
    {
      id: "doc-trang-lich-hen",
      title: "Xem lịch hẹn theo nhân viên: trang Lịch hẹn cho bạn thấy gì",
      blocks: [
        { p: "Trang “Lịch hẹn” là nơi chủ tiệm và thợ làm việc mỗi ngày. Cột dọc là nhân viên, hàng ngang là giờ, và mỗi lịch hẹn là một ô nằm đúng chỗ giao nhau. Ô ghi giờ bắt đầu và kết thúc, tên khách và dịch vụ." },
        { img: { src: img("trang-lich-hen-moi-nhan-vien-mot-cot"), alt: "Trang Lịch hẹn trên điện thoại với ba cột nhân viên, các ô lịch hẹn ghi giờ, tên khách và dịch vụ, phía trên là ba nhãn 4 hẹn, 0 xong và 250,00 € được khoanh vàng", caption: "Ba nhãn phía trên: số lịch hẹn trong ngày, số đã xong và doanh thu dự kiến." } },
        {
          table: {
            head: ["Thành phần", "Ý nghĩa"],
            rows: [
              ["Ba nhãn số ở trên cùng", "Số lịch hẹn trong ngày, số đã xong và doanh thu dự kiến"],
              ["Ô có biểu tượng quả địa cầu", "“Khách tự đặt online”"],
              ["Ô không có quả địa cầu", "“Salon tự thêm”, tức lịch do tiệm nhập"],
              ["Tên nhân viên phía trên", "Bấm vào để ẩn hoặc hiện cột của người đó"],
              ["Thanh dưới cùng", "Mũi tên đổi ngày, ô ngày để chọn ngày bất kỳ, và ba cách xem “Ngày”, “Tuần”, “Tháng”"],
            ],
          },
        },
        { img: { src: img("bam-ten-nhan-vien-de-an-hien-cot-lich"), alt: "Hàng nút phía trên lịch gồm Ẩn tất cả và tên ba nhân viên được khoanh vàng, bên dưới là các nhãn số liệu và ba cột lịch trong ngày", caption: "Bấm vào tên một nhân viên để ẩn hoặc hiện cột của người đó." } },
        { p: "Trong video bài học, phía trên lịch còn có một dòng nhỏ ghi lịch hiển thị theo giờ của salon, kèm giờ hiện tại của bạn. Múi giờ này đi theo quốc gia bạn chọn lúc [đăng ký salon](lesson:dang-ky-salon), nên chủ tiệm đang đi xa vẫn xem lịch theo đúng giờ của tiệm." },
        { p: "Hai loại lịch còn được tô hai màu khác nhau, để nhìn lướt là biết lịch nào khách tự đặt. Bạn tự chọn được màu cho từng loại, xem bài [màu ô lịch hẹn](lesson:mau-lich-hen)." },
      ],
    },
    {
      id: "ngay-tuan-thang",
      title: "Xem lịch theo ngày, tuần hay tháng: dùng cách nào khi nào",
      blocks: [
        { p: "Ba cách xem ở thanh dưới cùng phục vụ ba câu hỏi khác nhau. Bảng dưới là gợi ý dùng trong một tuần làm việc bình thường:" },
        {
          table: {
            head: ["Cách xem", "Màn hình hiện gì", "Hợp với việc gì"],
            rows: [
              ["“Ngày”", "Mỗi nhân viên một cột, từng lịch hẹn theo giờ", "Làm việc trong ngày, xếp khách gọi điện vào giờ trống"],
              ["“Tuần”", "Mỗi ngày một cột, các lịch hẹn của cả tuần", "Xem ngày nào đông, ngày nào thưa để xếp người"],
              ["“Tháng”", "Lịch cả tháng, mỗi ngày ghi số lịch", "Nhìn xa, tìm ngày còn trống cho khách hẹn trước"],
            ],
          },
        },
        { img: { src: img("xem-lich-hen-salon-theo-tuan"), alt: "Lịch hẹn ở cách xem theo tuần với các cột Thứ 2, Thứ 3, Thứ 4, các ô lịch màu tím và ô màu xanh có biểu tượng quả địa cầu của khách đặt online" } },
        { img: { src: img("xem-lich-hen-salon-theo-thang"), alt: "Lịch hẹn ở cách xem theo tháng, ngày 16 đang được chọn ghi 4 lịch, các ngày 17, 18, 19 mỗi ngày ghi 1 lịch", caption: "Ở cách xem “Tháng”, mỗi ngày ghi số lịch hẹn đang có." } },
        { note: "Khi tiệm có nhiều thợ, cách xem “Ngày” trên điện thoại sẽ chật. Bấm vào tên những người hôm nay không đi làm để ẩn cột của họ, màn hình còn lại đúng những người đang có khách.", kind: "tip", title: "Ẩn bớt cột cho dễ nhìn" },
      ],
    },
    {
      id: "them-lich-cho-khach-goi-dien",
      title: "Cách thêm lịch hẹn cho khách gọi điện và khách vãng lai",
      blocks: [
        { p: "Khách đặt online thì lịch tự hiện trên trang. Nhưng tiệm nào cũng còn khách gọi điện và khách ghé ngang cửa. Với những người này, bạn tự thêm lịch để ô giờ đó không bị người khác đặt trùng." },
        { p: "Thao tác là nhấn giữ khoảng 1 giây vào ô trống trên lịch. Trang “Đặt lịch cho khách” mở ra đúng giờ và đúng cột nhân viên bạn vừa nhấn, nên bạn không phải chọn lại ngày giờ. Trang này có các ô sau:" },
        {
          table: {
            head: ["Ô", "Ghi chú"],
            rows: [
              ["“Dịch vụ”", "Chọn từ menu dịch vụ của salon. Giá dịch vụ hiện ngay bên dưới"],
              ["“Tên khách hàng”", "Tên để thợ gọi khi khách đến"],
              ["“Số điện thoại”", "Để tiệm liên lạc được khi cần báo thay đổi"],
              ["Email", "Không bắt buộc. Cần điền nếu muốn gửi email xác nhận"],
              ["Ghi chú", "Không bắt buộc"],
            ],
          },
        },
        { img: { src: img("trang-dat-lich-cho-khach-goi-dien"), alt: "Trang Đặt lịch cho khách với ô Dịch vụ, Giá dịch vụ, Tên khách hàng, ô Số điện thoại được khoanh vàng, bên dưới là Email và Ghi chú không bắt buộc" } },
        { p: "Muốn khách nhận được email xác nhận và nhắc lịch, bạn điền email của khách rồi đánh dấu ô “Gửi email xác nhận và nhắc lịch cho khách hàng”. Khách gọi điện không có gì trong tay để xem lại giờ hẹn, và một email xác nhận bù được chỗ đó." },
        { img: { src: img("o-gui-email-xac-nhan-va-nut-dat-lich"), alt: "Cuối trang Đặt lịch cho khách với ô đánh dấu Gửi email xác nhận và nhắc lịch cho khách hàng được khoanh vàng, bên dưới là nút Đặt lịch và Huỷ" } },
      ],
    },
    {
      id: "cap-nhat-trang-thai",
      title: "Cập nhật trạng thái: hoàn thành, khách không đến, huỷ",
      blocks: [
        { p: "Bấm vào một lịch hẹn để mở phần chi tiết: dịch vụ, giờ hẹn, nhân viên làm và tổng tiền cần thu. Một dòng nhỏ cho biết lịch được tạo khi nào, ghi “Khách đặt online lúc …” hoặc “Salon thêm lúc …”." },
        { img: { src: img("chi-tiet-lich-hen-dong-salon-them-luc"), alt: "Chi tiết một lịch hẹn Gel manicure 45,00 € với dòng Salon thêm lúc 09:53, 16/11/2026 được khoanh vàng, bên dưới là tổng cộng cần thu và các nút trạng thái", caption: "Dòng “Salon thêm lúc …” cho biết lịch này do tiệm nhập và nhập khi nào." } },
        { p: "Bên dưới là bốn nút. Bấm đúng nút sau mỗi khách thì cuối ngày con số “đã xong” trên đầu trang mới đúng:" },
        {
          table: {
            head: ["Nút", "Bấm khi nào"],
            rows: [
              ["“Đến quầy thanh toán”", "Khách đã làm xong và ra quầy trả tiền"],
              ["“Hoàn thành”", "Khách đã đến và làm xong, bạn đánh dấu lịch là đã xong"],
              ["“Không đến”", "Khách không đến. Lịch được ghi lại để bạn biết khách nào hay bỏ hẹn"],
              ["“Huỷ”", "Lịch hẹn không còn diễn ra nữa"],
            ],
          },
        },
        { p: "Đừng xóa hay bỏ mặc lịch của khách không đến. Bấm “Không đến” để có ghi nhận. Sau vài lần, bạn có căn cứ để nói chuyện với khách đó và để xem lại [chính sách hủy lịch của salon](lesson:thanh-toan-chinh-sach)." },
        { p: "Nút “Đến quầy thanh toán” mở phần thu tiền và hóa đơn, được hướng dẫn trong bài [thanh toán tại quầy và hoá đơn](lesson:thanh-toan-hoa-don). Trong phần chi tiết còn có nút “Báo cáo thu nhập” để nhân viên nhập số tiền đã thu, xem bài [báo cáo thu nhập của nhân viên](lesson:doanh-thu-nhan-vien)." },
      ],
    },
    {
      id: "doi-lich-va-tinh-huong",
      title: "Dời lịch hẹn của khách và vài tình huống hay gặp",
      blocks: [
        { p: "Khách xin đổi giờ là chuyện ngày nào cũng có. Bạn không cần huỷ rồi tạo lại. Kéo ô lịch hẹn sang giờ mới, hệ thống hỏi lại trước khi chuyển, và bạn xác nhận. Câu hỏi lại này giúp tránh trường hợp ngón tay vô tình kéo lệch một lịch trên màn hình điện thoại." },
        { img: { src: img("keo-o-lich-hen-de-doi-gio"), alt: "Lịch hẹn trong ngày với ô lịch của khách làm Classic lashes lúc 13:15–14:45 ở cột giữa được khoanh vàng, sẵn sàng để kéo sang giờ khác" } },
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Khách gọi điện đặt lịch lúc bạn đang bận tay", "Nhấn giữ khoảng 1 giây vào ô trống đúng giờ, đúng cột thợ, điền tên và số điện thoại rồi bấm “Đặt lịch”"],
              ["Khách xin lùi lại một tiếng", "Kéo ô lịch hẹn sang giờ mới và xác nhận khi hệ thống hỏi"],
              ["Quá giờ mà khách không tới", "Mở lịch hẹn và bấm “Không đến”"],
              ["Muốn biết lịch này khách tự đặt hay tiệm nhập", "Nhìn biểu tượng quả địa cầu trên ô, hoặc mở chi tiết để đọc dòng “Khách đặt online lúc …” hay “Salon thêm lúc …”"],
              ["Cần xem lịch của ngày khác", "Bấm mũi tên ở thanh dưới cùng, hoặc bấm vào ngày để chọn ngày bất kỳ"],
            ],
          },
        },
        { p: "Trang Lịch hẹn chỉ đầy khi khách có đường để đặt. Nếu phần lớn lịch của tiệm vẫn là “Salon tự thêm”, hãy đưa [link đặt lịch online](lesson:chia-se-link) đến nhiều nơi hơn để khách tự đặt, và bạn bớt phải nghe điện thoại." },
      ],
    },
  ],
  howTo: {
    title: "Các bước dùng trang Lịch hẹn để quản lý lịch hẹn tiệm nail, tóc, spa",
    id: "cac-buoc-dung-lich-hen",
    after: "doc-trang-lich-hen",
    lead: "Sáu bước dưới đây theo thứ tự trong video bài học, từ xem lịch đến thêm, cập nhật và dời lịch. Tất cả làm được trên điện thoại.",
    steps: [
      {
        name: "Mở mục “Lịch hẹn”",
        text: "Trong trang quản trị, bấm mục “Lịch hẹn”. Mỗi nhân viên là một cột, mỗi lịch hẹn là một ô. Trên cùng là số lịch hẹn trong ngày, số đã xong và doanh thu dự kiến.",
      },
      {
        name: "Phân biệt lịch online và lịch salon tự thêm",
        text: "Ô có biểu tượng quả địa cầu là khách tự đặt online, ô còn lại là lịch do salon tự thêm. Bấm vào tên nhân viên ở phía trên để ẩn hoặc hiện cột của người đó khi cần nhìn gọn hơn.",
        image: { src: img("o-lich-hen-khach-tu-dat-online-qua-dia-cau"), alt: "Lịch trong ngày với ô lịch màu xanh lúc 15:00–16:15 có biểu tượng quả địa cầu được khoanh vàng, các ô màu tím là lịch salon tự thêm" },
      },
      {
        name: "Đổi ngày và cách xem ở thanh dưới cùng",
        text: "Ở thanh dưới cùng, bấm mũi tên để sang ngày khác, hoặc bấm vào ngày để chọn một ngày bất kỳ. Bên phải là ba cách xem: “Ngày”, “Tuần” và “Tháng”.",
        image: { src: img("thanh-doi-ngay-va-cach-xem-ngay-tuan-thang"), alt: "Thanh dưới cùng của trang Lịch hẹn với mũi tên đổi ngày, ô ngày ghi Hôm nay và ba nút Ngày, Tuần, Tháng được khoanh vàng" },
      },
      {
        name: "Nhấn giữ ô trống để thêm lịch cho khách",
        text: "Nhấn giữ khoảng 1 giây vào ô trống, đúng giờ và đúng cột nhân viên. Ở trang “Đặt lịch cho khách”, chọn “Dịch vụ”, nhập “Tên khách hàng” và “Số điện thoại”. Muốn gửi email xác nhận thì điền email và đánh dấu ô bên dưới, rồi bấm “Đặt lịch”.",
        image: { src: img("nhan-giu-o-trong-de-them-lich-hen"), alt: "Lịch trong ngày với một ô trống lúc 16 giờ ở cột nhân viên thứ hai được khoanh vàng, là chỗ nhấn giữ để tạo lịch hẹn mới" },
      },
      {
        name: "Bấm vào lịch hẹn để cập nhật trạng thái",
        text: "Bấm vào một lịch hẹn để xem dịch vụ, giờ hẹn và tổng tiền cần thu. Khi khách đến và làm xong, bấm “Đến quầy thanh toán” hoặc “Hoàn thành”. Khách không đến thì bấm “Không đến”, còn muốn huỷ thì bấm “Huỷ”.",
        image: { src: img("nut-den-quay-thanh-toan-hoan-thanh-khong-den-huy"), alt: "Chi tiết lịch hẹn với nút Đến quầy thanh toán được khoanh vàng, bên cạnh là các nút Hoàn thành, Không đến, Huỷ và nút Báo cáo thu nhập" },
      },
      {
        name: "Kéo ô lịch hẹn để dời sang giờ khác",
        text: "Muốn dời lịch, kéo ô lịch hẹn sang giờ mới rồi thả. Hệ thống hỏi lại trước khi chuyển. Hãy báo cho khách giờ mới ngay sau khi dời, để hai bên cùng nhớ một giờ.",
      },
    ],
  },
  faq: [
    {
      q: "Làm sao thêm lịch hẹn cho khách gọi điện ngay trên điện thoại?",
      a: "Trên trang “Lịch hẹn”, nhấn giữ khoảng 1 giây vào ô trống. Trang “Đặt lịch cho khách” mở ra đúng giờ và đúng cột nhân viên bạn vừa nhấn. Chọn dịch vụ, nhập tên khách hàng và số điện thoại rồi bấm “Đặt lịch”.",
    },
    {
      q: "Ô lịch hẹn có biểu tượng quả địa cầu nghĩa là gì?",
      a: "Đó là lịch “Khách tự đặt online”. Lịch do salon tự thêm có biểu tượng và màu khác, nên nhìn vào lịch là bạn phân biệt được hai loại.",
    },
    {
      q: "Khách không đến thì bấm nút nào?",
      a: "Mở lịch hẹn của khách và bấm “Không đến”. Lịch được ghi lại, nhờ đó bạn biết khách nào hay bỏ hẹn.",
    },
    {
      q: "Dời lịch hẹn của khách sang giờ khác thế nào?",
      a: "Kéo ô lịch hẹn trên lịch sang giờ mới. Hệ thống hỏi lại trước khi chuyển, bạn xác nhận là lịch được dời.",
    },
    {
      q: "Tự thêm lịch cho khách thì khách có nhận được email xác nhận không?",
      a: "Có, nếu bạn điền email của khách và đánh dấu ô “Gửi email xác nhận và nhắc lịch cho khách hàng” ở trang “Đặt lịch cho khách”. Ô email không bắt buộc, bỏ trống thì lịch vẫn được tạo.",
    },
    {
      q: "Làm sao biết một lịch hẹn được đặt lúc nào?",
      a: "Bấm vào lịch hẹn để mở chi tiết. Dòng nhỏ bên dưới ghi “Khách đặt online lúc …” với lịch khách tự đặt, hoặc “Salon thêm lúc …” với lịch do tiệm nhập.",
    },
  ],
  related: ["mau-lich-hen", "thanh-toan-hoa-don", "doanh-thu-nhan-vien", "khach-hang"],
};

export default article;
