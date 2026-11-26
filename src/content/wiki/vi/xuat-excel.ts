import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/xuat-excel/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "xuat-doanh-thu-salon-ra-excel",
  lesson: "xuat-excel",
  category: "salon",
  title: "Xuất doanh thu salon ra Excel: cách tải bảng doanh thu, danh sách khách và đơn hàng về máy",
  metaTitle: "Xuất doanh thu salon ra Excel, tải danh sách khách hàng",
  metaDescription:
    "Hướng dẫn tải bảng doanh thu, danh sách khách hàng và đơn hàng của salon từ VaraaAi về máy dưới dạng Excel để gửi kế toán, kèm lưu ý giữ kín thông tin khách.",
  keyword: "xuất doanh thu salon ra Excel",
  keywords: [
    "tải bảng doanh thu tiệm nail về máy",
    "xuất danh sách khách hàng ra Excel",
    "xuất đơn hàng ra file CSV",
    "gửi số liệu salon cho kế toán cuối tháng",
    "báo cáo doanh thu theo nhân viên bằng Excel",
    "file Excel doanh thu salon gồm những gì",
  ],
  excerpt: "Ba nút tải nằm ở ba mục: Quản trị doanh thu, Khách hàng và Đơn hàng. Chọn đúng kỳ và đúng nhóm trước khi bấm, vì tệp tải về gồm đúng thứ bạn đang xem.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chu-salon-va-khach-ben-quay-da-cam-thach"),
    alt: "Một người đàn ông mặc vest và một phụ nữ áo trắng cười nói bên quầy đá cẩm thạch có bình hoa lớn, cô cầm điện thoại trên tay",
  },
  takeaways: [
    "Doanh thu tải ở mục “Quản trị doanh thu”: chọn khoảng thời gian, bấm **“Bảng tính”**, rồi bấm **“Tải bảng (Excel)”**.",
    "Tệp doanh thu có **mỗi lịch hẹn một dòng**, tách riêng tiền mặt, ngân hàng, MobilePay, thẻ quà tặng và tiền tip, kèm dòng tổng dưới từng nhân viên.",
    "Danh sách khách tải về gồm **đúng nhóm bạn đang chọn**. Muốn tải toàn bộ thì chọn “Tất cả” trước khi bấm “Xuất Excel (CSV)”.",
    "Mục “Đơn hàng” cũng có nút “Xuất Excel (CSV)” khi salon đã có đơn sản phẩm.",
    "Các tệp này chứa tên và số điện thoại của khách. **Chỉ gửi cho người thật sự cần**, ví dụ kế toán.",
  ],
  intro: [
    "Cuối tháng, chủ tiệm thường cần xuất doanh thu salon ra Excel vì một trong hai lý do: kế toán đòi số liệu, hoặc chính bạn muốn tự cộng trừ thêm theo cách của mình. Trên VaraaAi, doanh thu, danh sách khách và đơn hàng đều tải được về máy, và tệp tải về mở được ngay bằng Excel.",
    "Bài viết này đi theo bài học “Xuất Excel: doanh thu, khách hàng, đơn hàng” của VaraaAi Academy. Đọc xong, bạn sẽ biết ba nút tải nằm ở đâu, mỗi tệp chứa những gì, và cần chọn gì trước khi bấm để tệp ra đúng thứ mình cần.",
  ],
  sections: [
    {
      id: "vi-sao-can-xuat-excel",
      title: "Khi nào cần tải số liệu salon về máy",
      blocks: [
        { p: "Trang quản trị đã cho bạn xem doanh thu và khách hàng ngay trên màn hình. Nhưng có những việc mà màn hình không làm thay được." },
        {
          ul: [
            "**Gửi số liệu cho kế toán cuối tháng.** Kế toán không cần tài khoản vào salon của bạn. Họ cần một tệp có từng khoản thu, chia theo cách khách trả tiền.",
            "**Tự tính toán thêm.** Trong Excel, bạn tự thêm cột, lọc và cộng theo cách riêng, điều mà một trang báo cáo có sẵn không cho phép.",
            "**Giữ một bản theo từng kỳ.** Bạn có thể tải bảng doanh thu mỗi tháng một lần và cất vào một thư mục, để lúc cần đối chiếu thì có ngay.",
          ],
        },
        { p: "Số liệu trong tệp chỉ đúng khi số liệu trong hệ thống đúng. Doanh thu đi từ các báo cáo mà nhân viên gửi cho từng lịch hẹn, như trong bài [báo cáo thu nhập của nhân viên](lesson:doanh-thu-nhan-vien). Vì vậy hãy xem lại các báo cáo của kỳ đó trước khi tải bảng gửi đi." },
      ],
    },
    {
      id: "ba-tep-tai-duoc",
      title: "Ba tệp tải được: doanh thu, danh sách khách hàng và đơn hàng",
      blocks: [
        { p: "Mỗi loại số liệu nằm ở một mục riêng của trang quản trị và có nút tải riêng:" },
        {
          table: {
            head: ["Số liệu", "Mở mục nào, bấm nút nào", "Tệp gồm gì"],
            rows: [
              ["Doanh thu", "“Quản trị doanh thu”, chọn kỳ, bấm “Bảng tính”, rồi “Tải bảng (Excel)”", "Mỗi lịch hẹn một dòng, dòng tổng dưới từng nhân viên"],
              ["Khách hàng", "“Khách hàng”, chọn nhóm khách, rồi “Xuất Excel (CSV)”", "Tên, số điện thoại, số lần đến và số tiền đã chi của nhóm đang chọn"],
              ["Đơn hàng", "“Đơn hàng”, rồi “Xuất Excel (CSV)”", "Danh sách đơn sản phẩm của salon"],
            ],
          },
        },
        { note: "Hai nút ở mục “Khách hàng” và “Đơn hàng” ghi “Xuất Excel (CSV)”. CSV là một dạng bảng dữ liệu đơn giản mà Excel và các phần mềm bảng tính khác đều mở được.", kind: "info", title: "CSV là gì" },
      ],
    },
    {
      id: "tep-doanh-thu-gom-gi",
      title: "File Excel doanh thu salon gồm những gì",
      blocks: [
        { p: "Trước khi tải, bạn đã thấy bảng này trên màn hình. Chế độ “Bảng tính” xếp các lịch hẹn theo từng nhân viên: tên nhân viên ở trên, bên dưới là từng dòng với ngày giờ, tên khách và dịch vụ, cuối cùng là dòng “Tổng cộng”. Dòng chữ nhỏ phía trên bảng nhắc rằng bạn bấm vào một dòng để xem lịch hẹn của ngày đó." },
        { img: { src: img("bang-tinh-doanh-thu-theo-nhan-vien"), alt: "Bảng tính doanh thu của nhân viên Emma với các cột Ngày, Khách, Dịch vụ và dòng Tổng cộng được khoanh vàng", caption: "Chế độ “Bảng tính”: mỗi nhân viên một khối, mỗi lịch hẹn một dòng, cuối khối là dòng “Tổng cộng”." } },
        { p: "Tệp Excel tải về giữ đúng cấu trúc đó, và thêm phần mà kế toán cần nhất: số tiền được tách riêng theo từng cách trả." },
        {
          table: {
            head: ["Trong tệp có", "Dùng để làm gì"],
            rows: [
              ["Mỗi lịch hẹn một dòng", "Đối chiếu từng khoản thu với sổ sách hoặc sao kê"],
              ["Tiền mặt, ngân hàng, MobilePay, thẻ quà tặng tách riêng", "Biết khoản nào nằm trong két, khoản nào đã vào tài khoản"],
              ["Tiền tip tách riêng", "Thống kê tip của từng người vào cuối tháng"],
              ["Dòng tổng dưới mỗi nhân viên", "Xem mỗi người đã thu được bao nhiêu trong kỳ"],
            ],
          },
        },
        { p: "Cách trả tiền trong tệp chính là hình thức được chọn lúc thu tiền của khách. Nếu ở quầy chọn nhầm hình thức thì tệp cũng sai theo, nên bước chọn hình thức trong bài [thanh toán tại quầy và hóa đơn](lesson:thanh-toan-hoa-don) đáng được làm cẩn thận." },
      ],
    },
    {
      id: "xuat-danh-sach-khach-hang",
      title: "Xuất danh sách khách hàng ra Excel: chọn nhóm trước khi bấm",
      blocks: [
        { p: "Điểm dễ nhầm nhất của cả bài nằm ở đây. Nút “Xuất Excel (CSV)” trong mục “Khách hàng” không tải toàn bộ khách theo mặc định. Nó tải **đúng nhóm bạn đang chọn** ở hàng nút phía trên, ví dụ “Tất cả”, “Khách mới” hay “Lâu chưa quay lại”." },
        { p: "Cách làm này tiện khi bạn chỉ cần một nhóm. Ví dụ, bạn chọn “Lâu chưa quay lại” rồi xuất, và có ngay danh sách những khách nên được mời quay lại. Mỗi dòng trong tệp gồm tên, số điện thoại, số lần đến và số tiền khách đã chi." },
        { p: "Các nhóm khách được giải thích kỹ hơn trong bài [sổ khách hàng](lesson:khach-hang). Nếu mục đích của bạn là gửi ưu đãi cho một nhóm, bạn không cần tải tệp về: ngay cạnh nút xuất có nút “Gửi email cho nhóm này”, và bài [email khuyến mãi](lesson:email-marketing) hướng dẫn phần soạn nội dung." },
        { note: "Trước khi bấm xuất, nhìn lại hàng nút nhóm một lần. Nhóm đang được tô đậm là nhóm sẽ nằm trong tệp. Muốn có toàn bộ khách thì bấm “Tất cả” trước.", kind: "tip", title: "Kiểm tra nhóm đang chọn" },
      ],
    },
    {
      id: "giu-kin-thong-tin-khach",
      title: "Giữ kín các tệp có thông tin khách",
      blocks: [
        { p: "Khi còn nằm trong trang quản trị, số liệu ở sau bước đăng nhập của salon. Tải về máy rồi thì tệp không còn lớp bảo vệ đó: ai cầm được tệp cũng đọc được tên và số điện thoại của khách." },
        { note: "Các tệp này có thông tin của khách. Chỉ gửi cho người thật sự cần, ví dụ kế toán. Không đăng lên mạng xã hội và không gửi cho khách.", kind: "warn", title: "Lưu ý của bài học" },
        { p: "Từ lời nhắc đó, có vài thói quen đáng giữ:" },
        {
          ul: [
            "Kế toán chỉ cần bảng doanh thu thì chỉ gửi bảng doanh thu, không gửi kèm danh sách khách.",
            "Gửi tệp cho đúng một người nhận, không thả vào nhóm chat chung của tiệm.",
            "Dùng máy tính chung của tiệm để tải thì xóa tệp khỏi thư mục tải về sau khi dùng xong.",
          ],
        },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Vài tình huống hay gặp khi xuất Excel",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Tìm mãi không thấy nút “Tải bảng (Excel)”", "Nút nằm trong mục “Quản trị doanh thu”, cùng hàng với “Bảng tính” và “Danh sách”, phía dưới hàng chọn khoảng thời gian"],
              ["Tệp doanh thu thiếu những ngày đầu tháng", "Xem lại khoảng thời gian đang chọn, ví dụ “Tháng này”, rồi tải lại"],
              ["Tệp khách hàng ít người hơn bạn nghĩ", "Bạn đang chọn một nhóm nhỏ. Bấm “Tất cả” rồi xuất lại"],
              ["Mục “Đơn hàng” chưa có gì để xuất", "Tệp đơn hàng chỉ có nội dung khi salon đã có đơn sản phẩm"],
            ],
          },
        },
        { img: { src: img("xuat-excel-csv-danh-sach-don-hang"), alt: "Trang Đơn hàng sản phẩm với nút Xuất Excel (CSV) được khoanh vàng, nằm dưới ô tìm kiếm và phía trên một đơn đã xác nhận", caption: "Ở mục “Đơn hàng”, nút “Xuất Excel (CSV)” nằm ngay dưới ô tìm kiếm, phía trên danh sách đơn." } },
        { p: "Salon chưa bán sản phẩm thì chưa cần đến tệp thứ ba. Khi nào muốn mở cửa hàng nhỏ ngay trên trang salon, bài [bán sản phẩm và quản lý đơn hàng](lesson:san-pham-don-hang) chỉ cách thêm sản phẩm và xử lý từng đơn." },
      ],
    },
  ],
  howTo: {
    title: "Các bước xuất doanh thu salon ra Excel, kèm danh sách khách và đơn hàng",
    id: "cac-buoc-xuat-excel",
    after: "ba-tep-tai-duoc",
    lead: "Sáu bước dưới đây đi lần lượt qua ba mục của trang quản trị, đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Mở “Quản trị doanh thu” và chọn khoảng thời gian",
        text: "Trong trang quản trị, bấm mục “Quản trị doanh thu”. Ở hàng nút trên cùng, chọn khoảng thời gian bạn cần, ví dụ “Tháng này”. Tệp tải về sẽ chỉ gồm các lịch hẹn trong khoảng này, nên hãy chọn kỳ trước khi làm bước tiếp theo.",
        image: { src: img("chon-khoang-thoi-gian-thang-nay-doanh-thu"), alt: "Trang Quản trị doanh thu trên máy tính bảng với nút Tháng này được khoanh vàng trong hàng Hôm nay, 7 ngày, Tháng này, Tháng trước" },
      },
      {
        name: "Bấm “Bảng tính”",
        text: "Bấm nút “Bảng tính”. Màn hình đổi sang dạng bảng: từng lịch hẹn xếp theo từng nhân viên, kèm dòng tổng cộng. Đây là lúc xem lướt một lượt để chắc số liệu của kỳ đã đủ.",
        image: { src: img("bam-bang-tinh-trong-quan-tri-doanh-thu"), alt: "Hàng nút Tải bảng (Excel), Bảng tính và Danh sách trong Quản trị doanh thu, nút Bảng tính đang được khoanh vàng" },
      },
      {
        name: "Bấm “Tải bảng (Excel)”",
        text: "Bấm “Tải bảng (Excel)” ngay bên trái nút “Bảng tính”. Tệp tải về máy ngay và mở được bằng Excel. Trong tệp, mỗi lịch hẹn là một dòng, và dưới mỗi nhân viên có sẵn dòng tổng.",
        image: { src: img("nut-tai-bang-excel-doanh-thu-salon"), alt: "Nút Tải bảng (Excel) được khoanh vàng phía trên bảng doanh thu của nhân viên Emma có một lịch hẹn Gel manicure" },
      },
      {
        name: "Mở “Khách hàng” và chọn nhóm khách",
        text: "Bấm mục “Khách hàng”. Ở hàng nút nhóm, bấm vào nhóm bạn muốn tải, ví dụ “Tất cả”, “Khách mới” hoặc “Lâu chưa quay lại”. Tệp sẽ gồm đúng nhóm này, nên đừng bỏ qua bước chọn.",
        image: { src: img("chon-nhom-khach-truoc-khi-xuat-excel"), alt: "Trang Khách hàng với hàng nút nhóm Tất cả, VIP, Khách quen được khoanh vàng, bên dưới là ô tìm kiếm và nút Xuất Excel (CSV)" },
      },
      {
        name: "Bấm “Xuất Excel (CSV)”",
        text: "Bấm nút “Xuất Excel (CSV)” nằm dưới ô tìm kiếm. Danh sách tải về gồm tên, số điện thoại, số lần đến và số tiền đã chi của từng khách trong nhóm đang chọn.",
        image: { src: img("nut-xuat-excel-csv-danh-sach-khach-hang"), alt: "Nút Xuất Excel (CSV) được khoanh vàng trong trang Khách hàng, ngay phía trên nút màu vàng Gửi email cho nhóm này" },
      },
      {
        name: "Mở “Đơn hàng” và bấm “Xuất Excel (CSV)”",
        text: "Khi salon đã có đơn sản phẩm, bấm mục “Đơn hàng” để mở trang “Đơn hàng sản phẩm”. Kéo xuống đến ô tìm kiếm, bấm “Xuất Excel (CSV)” ngay bên dưới để tải danh sách đơn về máy.",
        image: { src: img("mo-muc-don-hang-san-pham"), alt: "Trang Đơn hàng sản phẩm với mục Đơn hàng đang được chọn trên thanh menu giữa Sản phẩm và Kho hàng, tiêu đề được khoanh vàng" },
      },
    ],
  },
  faq: [
    {
      q: "Nút tải bảng doanh thu ra Excel nằm ở đâu trên VaraaAi?",
      a: "Nút “Tải bảng (Excel)” nằm trong mục “Quản trị doanh thu”. Bạn chọn khoảng thời gian, bấm “Bảng tính” để xem từng lịch hẹn theo từng nhân viên, rồi bấm “Tải bảng (Excel)” để tải tệp về máy.",
    },
    {
      q: "File Excel doanh thu salon có những thông tin gì?",
      a: "Mỗi lịch hẹn là một dòng. Số tiền được tách riêng thành tiền mặt, ngân hàng, MobilePay, thẻ quà tặng và tiền tip. Dưới mỗi nhân viên có sẵn một dòng tổng.",
    },
    {
      q: "Danh sách khách hàng xuất ra gồm những ai?",
      a: "Gồm đúng nhóm khách bạn đang chọn trong mục “Khách hàng” lúc bấm “Xuất Excel (CSV)”. Muốn tải toàn bộ khách, hãy chọn nhóm “Tất cả” trước khi bấm.",
    },
    {
      q: "Tệp danh sách khách hàng có những cột nào?",
      a: "Tệp có tên, số điện thoại, số lần đến và số tiền đã chi của từng khách. Vì có thông tin liên lạc của khách nên tệp cần được giữ kín.",
    },
    {
      q: "Có xuất được danh sách đơn hàng sản phẩm không?",
      a: "Có. Khi salon đã có đơn sản phẩm, bạn mở mục “Đơn hàng” và bấm “Xuất Excel (CSV)” để tải danh sách đơn về máy.",
    },
    {
      q: "Nên gửi các tệp Excel của salon cho ai?",
      a: "Chỉ gửi cho người thật sự cần, ví dụ kế toán. Các tệp này có tên và số điện thoại của khách, nên không đăng lên mạng xã hội và không gửi tràn lan.",
    },
  ],
  related: ["doanh-thu-nhan-vien", "khach-hang", "thanh-toan-hoa-don", "san-pham-don-hang"],
};

export default article;
