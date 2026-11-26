import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khach-hang/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "quan-ly-khach-hang-salon-so-khach-hang",
  lesson: "khach-hang",
  category: "salon",
  title: "Quản lý khách hàng salon bằng sổ khách hàng: nhóm khách, ghi chú nội bộ và lịch sử từng người",
  metaTitle: "Quản lý khách hàng salon: sổ khách, nhóm VIP, ghi chú",
  metaDescription:
    "Cách dùng sổ khách hàng của VaraaAi cho tiệm nail, tóc, mi, spa: đọc bốn con số chính, lọc nhóm VIP, khách quen, khách lâu chưa quay lại và ghi chú nội bộ.",
  keyword: "quản lý khách hàng salon",
  keywords: [
    "sổ khách hàng tiệm nail",
    "phần mềm quản lý khách hàng spa",
    "cách lưu thông tin khách hàng tiệm nail",
    "tìm khách lâu chưa quay lại",
    "ghi chú khách hàng dị ứng và sở thích",
    "tỉ lệ khách quay lại của salon",
    "lịch sử lịch hẹn của khách",
  ],
  excerpt: "Sổ khách hàng tự lập từ các lịch hẹn. Bạn lọc theo sáu nhóm, tải danh sách hoặc gửi email cho đúng nhóm, và mở hồ sơ từng khách để xem lịch sử và ghi chú.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("hai-nguoi-phu-nu-om-chao-nhau-trong-salon"),
    alt: "Hai người phụ nữ tươi cười ôm chào nhau trong một salon sáng màu, phía sau có hai vị khách ngồi chờ trên ghế cầm cốc cà phê",
  },
  takeaways: [
    "Sổ khách hàng **tự lập từ các lịch hẹn** của salon. Bạn không cần nhập tay từng người.",
    "Bốn con số trên cùng: tổng số khách, khách mới 30 ngày, **tỉ lệ quay lại** và chi tiêu trung bình mỗi khách.",
    "Sáu nhóm để lọc: “Tất cả”, “VIP”, “Khách quen”, “Khách mới”, “Có lịch sắp tới”, “Lâu chưa quay lại”.",
    "**“Ghi chú nội bộ”** chỉ salon thấy. Khách không bao giờ thấy ghi chú này.",
    "Nhóm “Lâu chưa quay lại” đi cùng nút “Gửi email cho nhóm này” là cách nhanh nhất để mời khách cũ trở lại.",
  ],
  intro: [
    "Quản lý khách hàng salon bắt đầu từ ba câu hỏi rất đời thường: ai là khách quen, ai lâu rồi chưa quay lại, ai chi tiêu nhiều nhất. Tiệm nhỏ thường trả lời bằng trí nhớ của chủ tiệm, và trí nhớ thì không chia sẻ được cho thợ mới. Sổ khách hàng của VaraaAi ghi lại những điều đó từ chính các lịch hẹn của salon.",
    "Bài viết này đi theo bài học “Sổ khách hàng” của VaraaAi Academy. Bạn sẽ đọc được các con số trên đầu trang, lọc đúng nhóm khách mình cần, mở hồ sơ một khách và biết nên viết gì vào phần ghi chú.",
  ],
  sections: [
    {
      id: "so-khach-hang-tu-lap",
      title: "Sổ khách hàng tiệm nail, tóc, spa: không cần nhập tay",
      blocks: [
        { p: "Cuốn sổ giấy ở quầy có hai điểm yếu. Nó chỉ đầy đủ khi có người chịu khó ghi, và nó không tự cộng được ai đã đến mấy lần. Một bảng tính tự làm thì khá hơn, nhưng vẫn phải có người nhập sau mỗi ngày làm việc." },
        { p: "Sổ khách hàng trong trang quản trị VaraaAi tự lập từ các lịch hẹn. Mỗi khách có lịch ở salon đều có mặt trong sổ, cùng với những gì lịch hẹn đã ghi lại về họ. Việc của bạn là giữ cho lịch đúng với thực tế, như trong bài [quản lý lịch hẹn](lesson:lich-hen): khách đến thì lịch được ghi nhận, khách hủy thì lịch được hủy." },
        { p: "Dòng giới thiệu ngay trên trang nói rõ mục đích của sổ: biết khách của bạn là ai, quay lại bao lâu một lần, thích dịch vụ nào, và ai đang lâu chưa ghé." },
      ],
    },
    {
      id: "bon-con-so-chinh",
      title: "Bốn con số chính: tổng số khách, khách mới, tỉ lệ khách quay lại, chi tiêu trung bình",
      blocks: [
        { p: "Phần trên cùng của mục “Khách hàng” là bốn ô số. Chúng cho bạn một cái nhìn nhanh về sức khỏe của tiệm trước khi đi vào từng người." },
        { img: { src: img("bon-con-so-chinh-cua-so-khach-hang"), alt: "Bốn ô số được khoanh vàng trong Sổ khách hàng: Khách hàng, Khách mới 30 ngày, Tỉ lệ quay lại và Chi tiêu trung bình mỗi khách", caption: "Bốn con số chính nằm ngay dưới tiêu đề “Sổ khách hàng của salon”." } },
        {
          table: {
            head: ["Con số", "Cho bạn biết điều gì"],
            rows: [
              ["Tổng số khách", "Sổ của tiệm đang có bao nhiêu người"],
              ["Khách mới 30 ngày", "Trong 30 ngày qua tiệm có thêm bao nhiêu khách mới"],
              ["Tỉ lệ quay lại", "Khách đã đến có trở lại hay không"],
              ["Chi tiêu trung bình mỗi khách", "Trung bình một khách chi bao nhiêu ở tiệm"],
            ],
          },
        },
        { p: "Nên đọc bốn con số này cạnh nhau. Khách mới nhiều mà tỉ lệ quay lại thấp nghĩa là tiệm kéo được người vào nhưng chưa giữ được họ, và việc cần làm nằm ở trải nghiệm trong tiệm hoặc ở khâu mời khách trở lại. Ngược lại, tỉ lệ quay lại tốt mà ít khách mới thì đáng dành thời gian cho việc quảng bá." },
      ],
    },
    {
      id: "sau-nhom-khach",
      title: "Sáu nhóm khách: VIP, khách quen, khách mới và khách lâu chưa quay lại",
      blocks: [
        { p: "Dưới các con số là hàng nút nhóm. Bấm vào một nhóm thì danh sách bên dưới chỉ còn những khách thuộc nhóm đó. Mỗi nhóm trả lời một câu hỏi khác nhau của chủ tiệm:" },
        {
          table: {
            head: ["Nhóm", "Dùng khi bạn muốn"],
            rows: [
              ["“Tất cả”", "Xem toàn bộ sổ, hoặc tải danh sách đầy đủ"],
              ["“VIP”", "Biết những khách quan trọng nhất để chăm sóc riêng"],
              ["“Khách quen”", "Nhận ra người đến đều, nhóm đáng được cảm ơn và giữ gìn"],
              ["“Khách mới”", "Theo dõi người vừa đến lần đầu, xem họ có đặt lần hai không"],
              ["“Có lịch sắp tới”", "Xem trước những ai sắp ghé tiệm"],
              ["“Lâu chưa quay lại”", "Tìm khách đã lâu không ghé để mời họ trở lại"],
            ],
          },
        },
        { p: "Bài học không nêu một khách cần đến mấy lần hay chi bao nhiêu thì vào nhóm “VIP” hoặc “Khách quen”. Bạn không phải tự xếp: sổ lập từ lịch hẹn, và con số nhỏ cạnh tên mỗi nhóm cho biết nhóm đó đang có bao nhiêu người." },
        { p: "Khi cần tìm đúng một người, ô tìm kiếm phía dưới nhanh hơn việc lọc nhóm. Bạn gõ tên, email hoặc số điện thoại của khách." },
        { img: { src: img("o-tim-khach-theo-ten-email-so-dien-thoai"), alt: "Ô tìm kiếm ghi Tìm theo tên, email hoặc số điện thoại được khoanh vàng, nằm dưới hàng nút nhóm khách", caption: "Khách gọi điện đến, bạn gõ tên hoặc số điện thoại vào ô này để tìm hồ sơ." } },
      ],
    },
    {
      id: "ghi-chu-noi-bo",
      title: "Ghi chú khách hàng: nên viết gì vào “Ghi chú nội bộ”",
      blocks: [
        { p: "Trong hồ sơ mỗi khách có một ô màu vàng nhạt tên là “Ghi chú nội bộ”. Dòng chữ ngay dưới tên ô nói rõ: chỉ salon thấy, khách không bao giờ thấy ghi chú này. Chính ô này biến một danh sách tên thành một cuốn sổ có ích cho người thợ." },
        { p: "Bài học gợi ý ba loại thông tin nên ghi: khách dị ứng gì, khách thích gì, và thói quen đặt lịch của khách. Ô ghi chú trong video có sẵn dòng gợi ý: dị ứng acetone, thích màu nude, hay đặt chiều thứ Bảy." },
        {
          ul: [
            "**Dị ứng và điều cần tránh.** Đây là loại ghi chú quan trọng nhất, vì nó bảo vệ khách ở lần hẹn sau, kể cả khi người làm là một thợ khác. Bài [dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat) giải thích vì sao phải ghi lại.",
            "**Sở thích.** Màu hay chọn, dáng móng quen, độ cong mi, đồ uống khách thích. Khách thấy mình được nhớ mà không phải nhắc lại.",
            "**Thói quen đặt lịch.** Ví dụ khách chỉ rảnh cuối tuần. Biết vậy, bạn chủ động giữ khung giờ đó hoặc nhắn mời đúng lúc.",
          ],
        },
        { note: "Viết ngắn, viết sự việc, và viết như thể một đồng nghiệp mới sẽ đọc nó trong mười giây trước khi khách ngồi vào ghế. Tránh viết nhận xét về con người khách: ghi chú là để phục vụ tốt hơn.", kind: "tip", title: "Ghi sao cho thợ khác đọc được" },
      ],
    },
    {
      id: "moi-khach-quay-lai",
      title: "Tìm khách lâu chưa quay lại và mời họ trở lại",
      blocks: [
        { p: "Giữ một khách cũ thường dễ hơn tìm một khách mới, vì họ đã biết đường đến tiệm và đã từng hài lòng. Nhóm “Lâu chưa quay lại” gom sẵn những người đó cho bạn." },
        { p: "Ngay dưới ô tìm kiếm có hai nút, và cả hai đều làm việc trên **nhóm đang xem**:" },
        {
          ul: [
            "**“Xuất Excel (CSV)”** tải danh sách của nhóm đang xem về máy. Chi tiết về tệp này nằm trong bài [xuất doanh thu và danh sách khách ra Excel](lesson:xuat-excel).",
            "**“Gửi email cho nhóm này”** để gửi ưu đãi cho đúng nhóm khách. Phần soạn nội dung được hướng dẫn trong bài [email khuyến mãi](lesson:email-marketing).",
          ],
        },
        { img: { src: img("nut-gui-email-cho-nhom-khach-nay"), alt: "Nút màu vàng Gửi email cho nhóm này được khoanh vàng, nằm dưới nút Xuất Excel (CSV) và phía trên danh sách khách", caption: "Chọn nhóm trước, rồi mới bấm “Gửi email cho nhóm này”." } },
        { p: "Một ưu đãi mời quay lại chỉ hợp với người đã lâu không ghé. Gửi nó cho cả sổ thì khách vừa đến tuần trước cũng nhận được, và họ sẽ thắc mắc vì sao mình đã trả đủ giá. Vì vậy hãy chọn nhóm trước khi bấm. Muốn khách có thêm lý do trở lại đều đặn, xem thêm bài [thẻ tích điểm](lesson:the-tich-diem)." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Vài tình huống hay gặp với sổ khách hàng",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Khách gọi điện, bạn không nhớ họ từng làm gì", "Gõ tên hoặc số điện thoại vào ô tìm kiếm, mở hồ sơ, xem “Dịch vụ yêu thích” và “Lịch sử lịch hẹn”"],
              ["Thợ mới sắp làm cho một khách quen", "Mở hồ sơ của khách, đọc “Ghi chú nội bộ” và “Nhân viên quen” trước khi khách đến"],
              ["Muốn gửi ưu đãi nhưng sợ gửi nhầm người", "Bấm đúng nhóm trước, kiểm tra danh sách bên dưới, rồi mới bấm “Gửi email cho nhóm này”"],
              ["Sổ còn ít khách", "Sổ đầy dần theo các lịch hẹn. Đưa lịch của tiệm lên hệ thống thì sổ tự có thêm người"],
            ],
          },
        },
        { p: "Sổ khách hàng không thay được việc nhớ mặt và hỏi han khách. Nó giúp cả tiệm cùng nhớ một điều, và giúp điều đó còn nguyên khi thợ nghỉ việc hay khi tiệm đông đến mức chủ tiệm không còn đứng quầy." },
      ],
    },
  ],
  howTo: {
    title: "Các bước dùng sổ khách hàng để quản lý khách hàng salon",
    id: "cac-buoc-dung-so-khach-hang",
    after: "bon-con-so-chinh",
    lead: "Bảy bước dưới đây đi từ trên xuống dưới của mục “Khách hàng”, rồi vào hồ sơ của một khách.",
    steps: [
      {
        name: "Bấm mục “Khách hàng”",
        text: "Trong trang quản trị, bấm mục “Khách hàng” trên thanh menu. Trang “Sổ khách hàng của salon” mở ra, trên cùng là các con số chính: tổng số khách, khách mới 30 ngày, tỉ lệ quay lại và chi tiêu trung bình mỗi khách.",
        image: { src: img("mo-muc-khach-hang-so-khach-hang-cua-salon"), alt: "Thanh menu trang quản trị với mục Khách hàng được khoanh vàng, bên dưới là tiêu đề Sổ khách hàng của salon" },
      },
      {
        name: "Lọc theo nhóm hoặc tìm một khách",
        text: "Bấm một trong các nhóm “Tất cả”, “VIP”, “Khách quen”, “Khách mới”, “Có lịch sắp tới”, “Lâu chưa quay lại” để lọc danh sách. Muốn tìm đúng một người thì gõ tên, email hoặc số điện thoại vào ô tìm kiếm.",
        image: { src: img("loc-khach-theo-nhom-vip-khach-quen"), alt: "Hàng nút nhóm khách Tất cả, VIP, Khách quen được khoanh vàng, nhóm Tất cả đang được chọn và ghi con số 4" },
      },
      {
        name: "Tải danh sách hoặc gửi email cho nhóm đang xem",
        text: "Bấm “Xuất Excel (CSV)” để tải danh sách của nhóm đang xem về máy. Bấm “Gửi email cho nhóm này” khi bạn muốn gửi ưu đãi cho đúng nhóm đó. Cả hai nút đều theo nhóm đang chọn, nên hãy lọc trước.",
      },
      {
        name: "Bấm vào một khách để mở hồ sơ",
        text: "Trong danh sách, bấm vào dòng của một khách. Mỗi dòng đã cho thấy sơ bộ tên, số điện thoại hoặc email, số lượt và số tiền chi tiêu. Hồ sơ đầy đủ mở ra khi bạn bấm vào.",
        image: { src: img("bam-vao-mot-khach-de-mo-ho-so"), alt: "Danh sách khách hàng với dòng của khách Anna Müller được khoanh vàng, mỗi khách có số điện thoại, số lượt và số tiền chi tiêu" },
      },
      {
        name: "Đọc các con số trong hồ sơ",
        text: "Đầu hồ sơ là tên và số điện thoại của khách, rồi đến các ô số, trong đó có lượt hoàn thành và tổng chi tiêu. Bên dưới là dịch vụ yêu thích và nhân viên quen. Đọc phần này trước khi khách đến để biết họ thường làm gì và với ai.",
        image: { src: img("ho-so-khach-luot-hoan-thanh-tong-chi-tieu"), alt: "Hồ sơ khách Anna Müller với bốn ô Lượt hoàn thành, Tổng chi tiêu, Trung bình mỗi lượt, Hủy hoặc không đến được khoanh vàng" },
      },
      {
        name: "Viết “Ghi chú nội bộ”",
        text: "Kéo xuống ô “Ghi chú nội bộ” và ghi những điều cả tiệm cần nhớ về khách, ví dụ khách dị ứng gì, thích màu nào. Chỉ salon nhìn thấy ghi chú này, khách không bao giờ thấy.",
        image: { src: img("ghi-chu-noi-bo-chi-salon-thay"), alt: "Ô Ghi chú nội bộ màu vàng nhạt được khoanh vàng trong hồ sơ khách, có dòng chữ Chỉ salon thấy và phần Lịch sử lịch hẹn bên dưới" },
      },
      {
        name: "Xem “Lịch sử lịch hẹn”",
        text: "Cuối hồ sơ là “Lịch sử lịch hẹn” của khách. Mỗi lịch hiện tên dịch vụ, ngày, nhân viên và số tiền. Khi khách muốn làm lại đúng như lần trước, bạn tìm thấy câu trả lời ở đây.",
        image: { src: img("lich-su-lich-hen-cua-khach"), alt: "Phần Lịch sử lịch hẹn được khoanh vàng trong hồ sơ khách, có một lịch Classic lashes giá 80 euro với nhân viên Sofia" },
      },
    ],
  },
  faq: [
    {
      q: "Có phải nhập tay danh sách khách vào sổ khách hàng không?",
      a: "Không. Sổ khách hàng của VaraaAi tự lập từ các lịch hẹn của salon. Khách có lịch hẹn ở tiệm sẽ có mặt trong sổ mà bạn không cần nhập tay.",
    },
    {
      q: "Khách có nhìn thấy ghi chú mà salon viết về mình không?",
      a: "Không. Phần “Ghi chú nội bộ” chỉ salon nhìn thấy, khách không bao giờ thấy ghi chú này. Nó dùng để ghi dị ứng, sở thích và thói quen đặt lịch của khách.",
    },
    {
      q: "Làm sao tìm những khách đã lâu không quay lại tiệm?",
      a: "Trong mục “Khách hàng”, bấm nhóm “Lâu chưa quay lại”. Danh sách chỉ còn những khách đã lâu không ghé. Bạn có thể bấm “Gửi email cho nhóm này” để gửi cho họ một ưu đãi mời quay lại.",
    },
    {
      q: "Sổ khách hàng có những nhóm khách nào?",
      a: "Có sáu nhóm: “Tất cả”, “VIP”, “Khách quen”, “Khách mới”, “Có lịch sắp tới” và “Lâu chưa quay lại”. Bấm vào một nhóm để lọc danh sách.",
    },
    {
      q: "Hồ sơ của một khách hiện những thông tin gì?",
      a: "Hồ sơ hiện số lượt hoàn thành, tổng chi tiêu, dịch vụ yêu thích và nhân viên quen của khách. Bên dưới là “Ghi chú nội bộ” của salon và “Lịch sử lịch hẹn” của khách đó.",
    },
    {
      q: "Tải danh sách khách hàng về máy bằng cách nào?",
      a: "Chọn nhóm khách muốn tải rồi bấm “Xuất Excel (CSV)”. Tệp tải về là danh sách của nhóm bạn đang xem, nên hãy chọn “Tất cả” nếu muốn tải toàn bộ.",
    },
  ],
  related: ["xuat-excel", "lich-hen", "email-marketing", "the-tich-diem"],
};

export default article;
