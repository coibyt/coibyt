import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dich-vu/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "menu-dich-vu-salon-thoi-luong-va-gia",
  lesson: "dich-vu",
  category: "salon",
  title: "Menu dịch vụ salon: cách thêm dịch vụ, thời lượng và giá lên trang đặt lịch online",
  metaTitle: "Menu dịch vụ salon: thêm dịch vụ, thời lượng, giá, tiền cọc",
  metaDescription:
    "Hướng dẫn tạo menu dịch vụ cho tiệm nail, tóc, mi, spa trên VaraaAi: đặt tên, chọn thời lượng, thời gian dọn dẹp, giá, tiền cọc và nhân viên thực hiện.",
  keyword: "menu dịch vụ salon",
  keywords: [
    "cách thêm dịch vụ và giá cho salon",
    "cách đặt tên dịch vụ nail",
    "thời lượng dịch vụ salon",
    "thời gian dọn dẹp giữa hai khách",
    "tiền cọc khi đặt lịch salon",
    "nhân bản dịch vụ trên VaraaAi",
    "sắp xếp thứ tự dịch vụ trên trang đặt lịch",
  ],
  excerpt: "Mỗi dịch vụ cần tên rõ, thời lượng thật, giá và người làm. Khách thấy đúng những gì bạn nhập, nên làm kỹ một lần là lịch chạy đúng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-lam-mong-cho-khach-tai-ban"),
    alt: "Một thợ nail tóc vàng đang sơn móng cho khách nữ tóc nâu tại bàn gỗ cạnh cửa sổ lớn của salon",
  },
  takeaways: [
    "Dịch vụ và giá là thứ khách xem đầu tiên khi đặt lịch, và khách thấy **đúng như bạn nhập**.",
    "**“Thời lượng”** nên là thời gian làm thật. **“Thời gian dọn dẹp sau”** là khoảng nghỉ lịch tự chừa giữa hai khách.",
    "Ô màu vàng **“Khách thấy: …”** cho bạn xem trước thời lượng và giá trước khi lưu.",
    "Khách chỉ đặt được những nhân viên bạn đã chọn ở “Nhân viên thực hiện” của dịch vụ đó.",
    "Dùng “Nhân bản” để tạo nhanh dịch vụ tương tự, và kéo biểu tượng ⋮⋮ để xếp thứ tự khách nhìn thấy.",
  ],
  intro: [
    "Menu dịch vụ salon trên trang đặt lịch khác tờ bảng giá dán tường ở một điểm: mỗi dòng trong đó điều khiển luôn cả cuốn lịch. Tên dịch vụ cho khách biết họ đặt gì, thời lượng cho lịch biết phải giữ bao nhiêu phút, còn phần nhân viên quyết định khách chọn được ai.",
    "Bài viết này đi theo bài học “Thêm dịch vụ và giá” của VaraaAi Academy. Bạn sẽ tự thêm được một dịch vụ hoàn chỉnh, hiểu từng ô trong phần “Thời gian & giá”, và biết cách sắp xếp cả menu để khách chọn nhanh.",
  ],
  sections: [
    {
      id: "vi-sao-menu-ro-rang",
      title: "Vì sao menu dịch vụ rõ ràng giúp salon nhận được nhiều lịch hơn",
      blocks: [
        { p: "Khách mở trang salon và nhìn vào danh sách dịch vụ trước mọi thứ khác. Họ đang tìm ba câu trả lời: tiệm có làm thứ mình cần không, mất bao lâu, hết bao nhiêu tiền. Một dòng dịch vụ có đủ tên, thời lượng và giá trả lời xong cả ba mà không cần ai nhắn tin hỏi." },
        { p: "Trên VaraaAi, mục “Dịch vụ” của trang quản trị là toàn bộ thực đơn dịch vụ của salon, kèm giá và thời lượng. Những gì bạn nhập ở đây là những gì khách thấy khi đặt lịch online. Bạn có thể xem phía khách trông ra sao trong bài [đặt lịch làm đẹp online](lesson:dat-lich-online)." },
        { p: "Thời lượng sai gây rắc rối nhiều hơn giá sai. Nhập ngắn hơn thực tế thì khách sau đến đúng giờ mà thợ chưa xong. Nhập dài hơn thì trong ngày có những khoảng trống không ai đặt được." },
      ],
    },
    {
      id: "chuan-bi-danh-sach",
      title: "Chuẩn bị gì trước khi thêm dịch vụ và giá cho salon",
      blocks: [
        { p: "Hãy viết ra giấy danh sách dịch vụ trước khi mở máy. Với mỗi dịch vụ, bạn cần biết năm điều:" },
        {
          ul: [
            "**Tên** mà khách gọi, không phải tên viết tắt nội bộ của tiệm.",
            "**Thời gian làm thật**, tính từ lúc khách ngồi vào ghế đến lúc xong.",
            "**Thời gian dọn bàn, thay dụng cụ** trước khi đón khách kế tiếp.",
            "**Giá** và đơn vị tiền tệ tiệm đang thu.",
            "**Ai trong tiệm làm được** dịch vụ đó.",
          ],
        },
        { note: "Phần “Nhân viên thực hiện” chọn trong số những người đã có ở mục “Nhân viên”. Bạn cũng gắn được theo chiều ngược lại: khi [thêm nhân viên](lesson:nhan-vien), có phần “Dịch vụ thực hiện” để chọn các dịch vụ người đó làm. Làm từ phía nào cũng được.", kind: "info", title: "Dịch vụ trước hay nhân viên trước" },
      ],
    },
    {
      id: "dat-ten-va-mo-ta",
      title: "Cách đặt tên dịch vụ và viết mô tả để khách dễ chọn",
      blocks: [
        { p: "Tên dịch vụ nên là cụm từ khách tự nói ra khi gọi điện: sơn gel tay, cắt tóc nam, nối mi classic. Tránh mã số hoặc tên gói chỉ người trong tiệm hiểu. Nếu khách của bạn chủ yếu là người bản xứ, hãy đặt tên bằng ngôn ngữ họ đọc được." },
        { p: "Ô “Mô tả” hiện ngay dưới tên dịch vụ khi khách chọn. Một dòng là đủ, miễn là nó nói rõ dịch vụ gồm những gì. Trong video bài học, dịch vụ mẫu “Nail art” có mô tả là vẽ móng nghệ thuật theo mẫu khách chọn." },
        { p: "“Nhóm dịch vụ” là tùy chọn, dùng khi bạn muốn xếp dịch vụ theo nhóm. Tiệm có cả móng tay, móng chân và mi thì nên chia nhóm, để khách không phải đọc một danh sách dài lẫn lộn." },
        { note: "Khi một dịch vụ có hai mức, ví dụ tay và chân, hãy tạo thành hai dịch vụ riêng với thời lượng và giá riêng. Dùng nút “Nhân bản” để sao chép dịch vụ đầu rồi chỉ sửa tên và giá.", kind: "tip", title: "Mẹo nhỏ" },
      ],
    },
    {
      id: "thoi-luong-va-don-dep",
      title: "Thời lượng dịch vụ, thời gian dọn dẹp và tiền cọc",
      blocks: [
        { p: "Phần “Thời gian & giá” có năm ô. Mỗi ô ảnh hưởng đến lịch hoặc đến điều khách nhìn thấy theo một cách riêng:" },
        {
          table: {
            head: ["Ô", "Ý nghĩa", "Nên nhập thế nào"],
            rows: [
              ["“Thời lượng”", "Số phút làm dịch vụ. Bấm chọn mức có sẵn hoặc gõ số phút bất kỳ", "Lấy thời gian của một ca làm bình thường, không lấy ca nhanh nhất"],
              ["“Thời gian dọn dẹp sau”", "Khoảng nghỉ giữa hai khách. Lịch tự chừa khoảng trống này sau mỗi lần làm", "Đủ để lau bàn, thay dụng cụ sạch và rửa tay"],
              ["“Đơn vị tiền tệ”", "Loại tiền hiển thị cùng giá", "Loại tiền tiệm thu của khách"],
              ["“Giá”", "Số tiền khách thấy khi đặt lịch", "Đúng với giá tiệm đang thu thực tế"],
              ["“Tiền cọc”", "Khoản đặt cọc trước, không bắt buộc", "Chỉ điền nếu bạn muốn khách đặt cọc trước"],
            ],
          },
        },
        { img: { src: img("thoi-gian-don-dep-sau-moi-khach"), alt: "Phần Thời gian và giá với ô Thời gian dọn dẹp sau tính bằng phút được khoanh vàng, phía trên là các mức thời lượng", caption: "Ô “Thời gian dọn dẹp sau” nằm ngay dưới “Thời lượng”. Để 0 thì hai lịch có thể nối sát nhau." } },
        { p: "Thời gian dọn dẹp là chỗ nhiều chủ tiệm bỏ qua rồi phải chạy đua cả ngày. Giữa hai khách, bàn làm cần được lau và dụng cụ cần được thay, như trong bài [vệ sinh và khử trùng dụng cụ](lesson:ve-sinh-dung-cu). Khi bạn nhập khoảng nghỉ này, lịch tự giữ chỗ cho việc đó." },
      ],
    },
    {
      id: "sua-nhan-ban-sap-xep",
      title: "Sửa, nhân bản, ẩn và sắp xếp thứ tự dịch vụ",
      blocks: [
        { p: "Sau khi lưu, dịch vụ mới hiện ngay trong danh sách. Mỗi dịch vụ có bốn nút và một tay kéo:" },
        {
          table: {
            head: ["Nút", "Dùng khi nào"],
            rows: [
              ["“Sửa”", "Đổi tên, thời lượng, giá hoặc người làm"],
              ["“Nhân bản”", "Tạo nhanh một dịch vụ tương tự, chỉ cần sửa tên và giá"],
              ["“Add-on”", "Gắn dịch vụ phụ vào dịch vụ này"],
              ["“Ẩn”", "Tạm ngừng một dịch vụ"],
              ["Biểu tượng ⋮⋮ bên trái", "Kéo lên xuống để đổi thứ tự. Khách thấy đúng thứ tự này khi đặt lịch"],
            ],
          },
        },
        { img: { src: img("nut-sua-nhan-ban-add-on-an-dich-vu"), alt: "Danh sách dịch vụ của salon, mỗi dịch vụ có thời lượng, giá và các nút Sửa, Nhân bản, Add-on, Ẩn", caption: "Nút “Nhân bản” được khoanh vàng. Dòng trên cùng nhắc rằng khách thấy đúng thứ tự bạn sắp xếp." } },
        { p: "Thứ tự đáng để bạn bỏ một phút suy nghĩ. Đưa những dịch vụ khách đặt nhiều nhất lên đầu, vì trên điện thoại khách chỉ thấy vài dòng đầu tiên trước khi phải kéo xuống." },
        { img: { src: img("keo-bieu-tuong-sap-xep-thu-tu-dich-vu"), alt: "Biểu tượng sáu chấm bên trái dịch vụ Gel manicure được khoanh vàng, dùng để kéo sắp xếp thứ tự dịch vụ" } },
      ],
    },
    {
      id: "sau-khi-co-menu",
      title: "Sau khi có menu dịch vụ",
      blocks: [
        { p: "Menu xong thì trang đặt lịch đã có thứ để khách chọn. Hai việc còn lại để khách đặt được giờ là [thêm nhân viên và phân quyền](lesson:nhan-vien) và [đặt giờ mở cửa](lesson:gio-mo-cua), vì khách chỉ đặt được lịch trong giờ tiệm mở." },
        { p: "Nếu bạn có đặt tiền cọc cho dịch vụ nào, hãy viết rõ quy định hủy lịch của tiệm để khách biết trước. Phần đó nằm trong bài [chính sách hủy lịch và thanh toán](lesson:thanh-toan-chinh-sach). Cần một tờ bảng giá để in hoặc đăng mạng xã hội thì xem thêm bài học về [bảng giá](lesson:bang-gia)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước thêm một dịch vụ vào menu dịch vụ salon trên VaraaAi",
    id: "cac-buoc-them-dich-vu",
    after: "chuan-bi-danh-sach",
    lead: "Tám bước dưới đây đi từ trên xuống dưới của trang “Dịch vụ mới”, đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Mở mục “Dịch vụ” và bấm “Thêm dịch vụ”",
        text: "Trong trang quản trị, bấm mục “Dịch vụ” trên thanh menu. Trang này hiện toàn bộ thực đơn dịch vụ của salon. Bấm nút “Thêm dịch vụ” để mở trang nhập dịch vụ mới.",
        image: { src: img("mo-muc-dich-vu-va-nut-them-dich-vu"), alt: "Trang quản trị VaraaAi với mục Dịch vụ được khoanh vàng trên thanh menu và nút màu vàng Thêm dịch vụ" },
      },
      {
        name: "Nhập “Tên dịch vụ” và chọn “Nhóm dịch vụ”",
        text: "Ở phần “Thông tin cơ bản”, gõ “Tên dịch vụ”, ví dụ Nail art. Chọn “Nhóm dịch vụ” nếu bạn muốn xếp theo nhóm. Đặt tên theo cách khách gọi để họ nhận ra ngay.",
        image: { src: img("nhap-ten-dich-vu-salon"), alt: "Trang Dịch vụ mới, phần Thông tin cơ bản với ô Tên dịch vụ đang ghi Nail art được khoanh vàng" },
      },
      {
        name: "Viết một dòng “Mô tả”",
        text: "Viết ngắn gọn dịch vụ gồm những gì. Dòng này hiện ngay dưới tên dịch vụ khi khách chọn, nên hãy viết cho người chưa từng đến tiệm.",
        image: { src: img("viet-mo-ta-ngan-cho-dich-vu"), alt: "Ô Mô tả của dịch vụ ghi vẽ móng nghệ thuật theo mẫu khách chọn, bên dưới là phần Thời gian và giá" },
      },
      {
        name: "Chọn “Thời lượng”",
        text: "Sang phần “Thời gian & giá”. Bấm chọn một mức “Thời lượng” có sẵn, ví dụ 30 phút, hoặc gõ số phút bất kỳ vào ô bên dưới. Hãy nhập thời gian làm thật của tiệm bạn.",
        image: { src: img("chon-thoi-luong-dich-vu"), alt: "Các mức thời lượng 15, 30, 45, 60, 90 và 120 phút được khoanh vàng, mức 30 phút đang được chọn" },
      },
      {
        name: "Điền “Thời gian dọn dẹp sau”",
        text: "Nhập số phút bạn cần giữa hai khách. Lịch sẽ tự chừa khoảng trống này sau mỗi lần làm, để khách sau không bị xếp sát giờ khách trước.",
      },
      {
        name: "Chọn tiền tệ, nhập “Giá” và “Tiền cọc”",
        text: "Chọn “Đơn vị tiền tệ” rồi nhập “Giá”. Nếu muốn khách đặt cọc trước, điền thêm “Tiền cọc”; ô này không bắt buộc. Nhìn ô màu vàng “Khách thấy: …” bên dưới để kiểm tra thời lượng và giá đúng như khách sẽ thấy.",
        image: { src: img("o-khach-thay-thoi-luong-va-gia"), alt: "Ô Giá và ô Tiền cọc không bắt buộc, bên dưới là ô màu vàng ghi Khách thấy 30 phút và 15,00 euro" },
      },
      {
        name: "Chọn “Nhân viên thực hiện”",
        text: "Bấm chọn những người làm được dịch vụ này, hoặc bấm “Chọn tất cả”. Khách chỉ đặt được nhân viên đã được chọn cho dịch vụ, nên đừng đánh dấu người chưa làm được.",
        image: { src: img("chon-nhan-vien-thuc-hien-dich-vu"), alt: "Phần Nhân viên thực hiện với tên ba nhân viên được khoanh vàng và nút Chọn tất cả ở góc phải" },
      },
      {
        name: "Bấm “Lưu”",
        text: "Kéo xuống cuối trang và bấm “Lưu”. Dịch vụ mới hiện ngay trong danh sách, kèm thời lượng và giá. Lặp lại cho các dịch vụ còn lại, hoặc dùng “Nhân bản” cho những dịch vụ gần giống nhau.",
      },
    ],
  },
  faq: [
    {
      q: "“Thời gian dọn dẹp sau” trong phần dịch vụ là gì?",
      a: "Đó là khoảng nghỉ giữa hai khách. Sau mỗi lần làm dịch vụ, lịch tự chừa khoảng trống bằng số phút bạn nhập, để bạn kịp dọn bàn và chuẩn bị cho khách kế tiếp.",
    },
    {
      q: "Nên đặt thời lượng dịch vụ bao nhiêu phút?",
      a: "Hãy nhập thời gian làm thật của tiệm. Bạn bấm chọn một mức có sẵn, ví dụ 30 phút, hoặc gõ số phút bất kỳ. Nên lấy thời gian của một ca làm bình thường để lịch không bị dồn.",
    },
    {
      q: "Có bắt buộc thu tiền cọc khi khách đặt lịch không?",
      a: "Không. Ô “Tiền cọc” không bắt buộc. Bạn chỉ điền khi muốn khách đặt cọc trước cho dịch vụ đó, còn không thì để trống.",
    },
    {
      q: "Làm sao tạo nhanh nhiều dịch vụ gần giống nhau?",
      a: "Bấm nút “Nhân bản” ở một dịch vụ đã có. Dịch vụ được sao chép, và bạn chỉ cần sửa tên và giá thay vì nhập lại từ đầu.",
    },
    {
      q: "Vì sao khách không chọn được một nhân viên cho dịch vụ?",
      a: "Vì nhân viên đó chưa được chọn ở phần “Nhân viên thực hiện” của dịch vụ. Khách chỉ đặt được những nhân viên đã được chọn cho dịch vụ. Bấm “Sửa” ở dịch vụ rồi đánh dấu thêm người đó.",
    },
    {
      q: "Đổi thứ tự dịch vụ trên trang đặt lịch thế nào?",
      a: "Trong mục “Dịch vụ”, kéo biểu tượng ⋮⋮ bên trái từng dịch vụ lên hoặc xuống. Khách sẽ thấy đúng thứ tự này khi đặt lịch.",
    },
  ],
  related: ["nhan-vien", "gio-mo-cua", "thanh-toan-chinh-sach", "bang-gia"],
};

export default article;
