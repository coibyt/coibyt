import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chi-nhanh/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "quan-ly-chuoi-salon-nhieu-chi-nhanh",
  lesson: "chi-nhanh",
  category: "salon",
  title: "Quản lý chuỗi salon nhiều chi nhánh: cách thêm cơ sở mới và dùng một link đặt lịch chung",
  metaTitle: "Quản lý chuỗi salon nhiều chi nhánh trong một tài khoản",
  metaDescription:
    "Cách quản lý chuỗi salon trên VaraaAi: thêm chi nhánh trong Cài đặt, thiết lập dịch vụ, nhân viên riêng, chuyển giữa các cơ sở và dùng trang đặt lịch chuỗi.",
  keyword: "quản lý chuỗi salon",
  keywords: [
    "quản lý salon nhiều chi nhánh",
    "mở chi nhánh thứ hai cho tiệm nail",
    "phần mềm quản lý chuỗi salon",
    "thêm chi nhánh trên VaraaAi",
    "trang đặt lịch chung cho chuỗi salon",
    "quản lý nhiều cơ sở trong một tài khoản",
  ],
  excerpt: "Mọi chi nhánh nằm trong cùng một tài khoản, mỗi cơ sở có trang đặt lịch, lịch hẹn và nhân viên riêng. Chuyển qua lại chỉ một chạm.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("le-tan-don-khach-tai-quay-mot-chi-nhanh"),
    alt: "Lễ tân mặc vest tím đưa ly nước cho một khách nữ mặc áo khoác kem tại quầy đá, phía sau là khách ngồi chờ trên ghế nhung",
  },
  takeaways: [
    "Mở thêm cơ sở **không cần tạo tài khoản mới**: mọi chi nhánh nằm trong cùng một tài khoản.",
    "Thêm ở **“Cài đặt” → phần “Chi nhánh” → “Thêm chi nhánh”**, điền thông tin rồi bấm “Gửi đăng ký”.",
    "Mỗi chi nhánh có **trang đặt lịch, lịch hẹn và nhân viên riêng**, nên số liệu không lẫn vào nhau.",
    "Khi đã có từ hai chi nhánh, ô **“Chi nhánh”** hiện ở đầu trang quản trị để bạn chuyển qua lại.",
    "**“Trang đặt lịch chuỗi”** là một đường link chung: khách chọn chi nhánh rồi mới đặt lịch.",
  ],
  intro: [
    "Việc quản lý chuỗi salon bắt đầu từ ngày bạn ký hợp đồng thuê mặt bằng thứ hai. Từ hôm đó, một cuốn lịch không còn đủ: hai địa chỉ, hai nhóm thợ, hai khung giờ mở cửa, và khách cần biết chắc mình đang đặt chỗ ở cơ sở nào.",
    "Bài viết này đi theo bài học “Nhiều chi nhánh” của VaraaAi Academy. Bạn sẽ thêm được một chi nhánh mới vào tài khoản đang dùng, biết những gì phải thiết lập lại cho cơ sở đó, cách chuyển qua lại khi quản lý và khi nào nên gửi cho khách một link chung của cả chuỗi.",
  ],
  sections: [
    {
      id: "vi-sao-tach-chi-nhanh",
      title: "Vì sao quản lý salon nhiều chi nhánh cần tách riêng từng cơ sở",
      blocks: [
        { p: "Cách làm quen tay khi mới mở cơ sở thứ hai là ghi tất cả vào cùng một cuốn lịch, thêm chữ viết tắt trước tên khách để phân biệt. Cách đó hỏng rất nhanh. Khách đặt giờ ở cơ sở này nhưng đến cơ sở kia. Thợ của hai nơi hiện chung một danh sách. Cuối tháng, bạn không tách được cơ sở nào đang làm tốt." },
        { p: "VaraaAi giải quyết theo hướng ngược lại: một tài khoản, nhiều chi nhánh, và mỗi chi nhánh là một salon đầy đủ. Mỗi nơi có trang đặt lịch, lịch hẹn và nhân viên riêng. Lịch và số liệu của từng cơ sở vì vậy không lẫn vào nhau, còn bạn vẫn chỉ đăng nhập một lần." },
        { img: { src: img("tho-cat-toc-nam-tai-co-so-thu-hai"), alt: "Một thợ cắt tóc có râu mặc gile xanh đậm đang cắt tóc cho khách nam ngồi trên ghế da nâu cạnh cửa sổ lớn", caption: "Mỗi cơ sở có thợ và khách của riêng mình, nên cũng cần cuốn lịch của riêng mình." } },
        { p: "Tách riêng còn giúp khách. Một người sống gần cơ sở mới chỉ cần thấy giờ trống và thợ của cơ sở đó. Họ không phải đọc qua danh sách nhân viên của một nơi cách nhà nửa thành phố." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi thêm chi nhánh mới",
      blocks: [
        { p: "Biểu mẫu thêm chi nhánh hỏi đúng những thông tin bạn đã điền khi [đăng ký salon đầu tiên](lesson:dang-ky-salon). Có sẵn những thứ sau thì điền một mạch là xong:" },
        {
          ul: [
            "**Tên của chi nhánh.** Nên có thêm tên khu vực hoặc tên đường sau tên tiệm, để khách phân biệt được hai cơ sở ngay từ cái tên.",
            "**Giới thiệu ngắn** về cơ sở mới.",
            "**Danh mục dịch vụ** chính của cơ sở đó. Hai cơ sở không bắt buộc làm cùng một loại dịch vụ.",
            "**Địa chỉ đầy đủ, quốc gia và thành phố.**",
            "**Số điện thoại của riêng cơ sở mới**, để khách gọi đúng nơi họ sẽ đến.",
          ],
        },
        { note: "Dòng chú thích dưới ô “Quốc gia” cho biết quốc gia dùng để đặt múi giờ cho salon. Nếu chi nhánh mới nằm ở một nước khác với cơ sở đầu, hãy chọn đúng nước của chi nhánh đó để giờ hẹn khớp với giờ địa phương.", kind: "info", title: "Ô “Quốc gia” và múi giờ" },
      ],
    },
    {
      id: "rieng-va-chung",
      title: "Cái gì riêng, cái gì chung giữa các chi nhánh",
      blocks: [
        { p: "Hiểu rõ ranh giới này trước khi bắt tay vào làm sẽ đỡ cho bạn nhiều lần sửa nhầm chỗ." },
        {
          table: {
            head: ["Phần", "Riêng hay chung", "Điều đó có nghĩa là"],
            rows: [
              ["Tài khoản đăng nhập", "Chung", "Một lần đăng nhập, thấy mọi cơ sở của bạn"],
              ["Trang đặt lịch", "Riêng từng chi nhánh", "Mỗi cơ sở có trang của mình để gửi cho khách"],
              ["Lịch hẹn", "Riêng từng chi nhánh", "Lịch của cơ sở này không hiện trong cơ sở kia"],
              ["Nhân viên", "Riêng từng chi nhánh", "Khách chỉ thấy thợ của cơ sở họ đang đặt"],
              ["“Trang đặt lịch chuỗi”", "Chung", "Một link cho cả chuỗi, khách chọn chi nhánh trước"],
            ],
          },
        },
        { p: "Vì lịch hẹn và nhân viên tách riêng, mọi con số bạn xem trong trang quản trị là của cơ sở đang được chọn. Trong phần “Chi nhánh”, cơ sở đó có nhãn “Đang xem”. Hãy tập thói quen liếc qua nhãn này trước khi sửa giá hay đổi giờ mở cửa." },
      ],
    },
    {
      id: "thiet-lap-chi-nhanh-moi",
      title: "Thiết lập chi nhánh mới: dịch vụ, nhân viên và giờ mở cửa",
      blocks: [
        { p: "Bấm “Gửi đăng ký” xong, chi nhánh mới có trang đặt lịch riêng nhưng trang còn trống. Bài học nêu ba thứ phải thêm cho chi nhánh đó, giống như bạn đã làm với salon đầu tiên:" },
        {
          ol: [
            "[Dịch vụ và giá](lesson:dich-vu). Cơ sở mới có thể có menu ngắn hơn hoặc giá khác cơ sở đầu, nên hãy nhập theo thực tế của nơi đó.",
            "[Nhân viên](lesson:nhan-vien) làm việc tại cơ sở mới, kèm những dịch vụ mỗi người làm được.",
            "[Giờ mở cửa và ngày nghỉ](lesson:gio-mo-cua), vì khách chỉ đặt được lịch trong giờ mở cửa.",
          ],
        },
        { img: { src: img("tho-lam-toc-cho-khach-tai-chi-nhanh-moi"), alt: "Một thợ tóc mặc áo vest kem đang chải tóc cho khách nữ tóc vàng ngồi trên ghế nhung tím trong phòng có ba gương viền vàng", caption: "Chi nhánh mới chỉ nhận được lịch khi đã có dịch vụ, nhân viên và giờ mở cửa." } },
        { p: "Đừng gửi link của chi nhánh mới cho khách trước khi xong ba việc này. Một trang đặt lịch không có dịch vụ để chọn làm khách nghĩ cơ sở chưa hoạt động." },
        { note: "Hãy mở trang đặt lịch của chi nhánh mới trên điện thoại và tự đặt thử một lịch. Bạn sẽ thấy ngay còn thiếu dịch vụ nào hoặc giờ nào chưa mở.", kind: "tip", title: "Đặt thử một lịch" },
      ],
    },
    {
      id: "trang-dat-lich-chuoi",
      title: "Trang đặt lịch chung cho chuỗi salon hay link riêng từng cơ sở",
      blocks: [
        { p: "Trong “Cài đặt” còn có “Trang đặt lịch chuỗi”. Đó là một đường link chung: khách mở link, chọn chi nhánh rồi mới đặt lịch. Bạn chỉ cần chia sẻ một đường link cho cả chuỗi." },
        { p: "Bạn vẫn có link riêng của từng chi nhánh. Chọn link nào tùy vào việc khách đã biết mình muốn đến cơ sở nào hay chưa. Bảng dưới là gợi ý của bài viết:" },
        {
          table: {
            head: ["Nơi đặt link", "Nên dùng"],
            rows: [
              ["Trang Facebook, Instagram chung của thương hiệu", "“Trang đặt lịch chuỗi”, vì người xem ở khắp nơi"],
              ["Poster QR dán tại cửa một cơ sở", "Link riêng của cơ sở đó, vì khách đang đứng ngay tại đó"],
              ["Tin nhắn cho khách quen của một cơ sở", "Link riêng của cơ sở khách vẫn đến"],
              ["Danh thiếp, tờ rơi dùng chung cho cả chuỗi", "“Trang đặt lịch chuỗi”"],
            ],
          },
        },
        { img: { src: img("chu-salon-cam-may-tinh-bang-quan-ly-chuoi-salon"), alt: "Một phụ nữ tóc xoăn mặc áo lụa tím đứng cạnh quầy đá cầm máy tính bảng, phía sau là salon sáng với gương viền vàng", caption: "Với link chuỗi, bạn chỉ phải nhớ và chia sẻ một địa chỉ cho mọi cơ sở." } },
        { p: "Cách lấy link và mã QR của từng cơ sở nằm trong bài [chia sẻ link đặt lịch](lesson:chia-se-link). Muốn in mã lên giấy dán cửa thì xem bài [tạo poster QR](lesson:poster-qr)." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi quản lý nhiều cơ sở",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Không thấy ô “Chi nhánh” ở đầu trang quản trị", "Ô này chỉ xuất hiện khi tài khoản đã có từ hai chi nhánh"],
              ["Không chắc mình đang sửa cơ sở nào", "Vào “Cài đặt”, phần “Chi nhánh”. Cơ sở đang quản lý có nhãn “Đang xem”"],
              ["Khách hỏi link đặt lịch mà chưa nói cơ sở nào", "Gửi “Trang đặt lịch chuỗi” để khách tự chọn chi nhánh"],
              ["Chi nhánh mới chưa nhận được lịch nào", "Kiểm tra đã thêm dịch vụ, nhân viên và giờ mở cửa cho chi nhánh đó chưa"],
            ],
          },
        },
        { p: "Khi đã có nhiều cơ sở, hai bài nên đọc tiếp là [trang tổng quan](lesson:tong-quan), để nắm tình hình của tiệm mỗi sáng, và [kho vật tư](lesson:kho-hang), nơi bạn biết mỗi chi nhánh còn bao nhiêu hàng." },
      ],
    },
  ],
  howTo: {
    title: "Các bước thêm chi nhánh để quản lý chuỗi salon trên VaraaAi",
    id: "cac-buoc-them-chi-nhanh",
    after: "chuan-bi",
    lead: "Bảy bước dưới đây đi từ lúc mở “Cài đặt” đến lúc có một link đặt lịch chung cho cả chuỗi.",
    steps: [
      {
        name: "Vào “Cài đặt” và kéo xuống phần “Chi nhánh”",
        text: "Trong trang quản trị, bấm mục “Cài đặt” rồi kéo xuống phần “Chi nhánh”. Ở đây liệt kê các cơ sở của bạn. Cơ sở đang quản lý có nhãn “Đang xem”.",
        image: { src: img("phan-chi-nhanh-trong-cai-dat-salon"), alt: "Phần Chi nhánh trong Cài đặt được khoanh vàng, liệt kê một salon có nhãn Đang xem và nút Thêm chi nhánh bên dưới" },
      },
      {
        name: "Bấm “Thêm chi nhánh”",
        text: "Bấm nút “Thêm chi nhánh” ngay dưới danh sách cơ sở. Một biểu mẫu mở ra để bạn nhập thông tin của chi nhánh mới. Bạn vẫn đang ở trong tài khoản cũ, không phải đăng ký lại từ đầu.",
        image: { src: img("nut-them-chi-nhanh-moi"), alt: "Nút Thêm chi nhánh được khoanh vàng, nằm ngay dưới dòng salon đang hoạt động trong phần Chi nhánh" },
      },
      {
        name: "Nhập tên, giới thiệu ngắn và danh mục dịch vụ",
        text: "Điền tên của chi nhánh, viết vài dòng giới thiệu ngắn và chọn danh mục dịch vụ. Đặt tên sao cho khách phân biệt được với cơ sở đầu, vì hai tên giống hệt nhau sẽ khiến khách chọn nhầm.",
        image: { src: img("nhap-ten-gioi-thieu-danh-muc-chi-nhanh-moi"), alt: "Biểu mẫu chi nhánh mới với các ô Tên doanh nghiệp, Giới thiệu ngắn, Danh mục dịch vụ đang chọn Spa và massage, và ô Địa chỉ" },
      },
      {
        name: "Nhập địa chỉ, quốc gia, thành phố và số điện thoại",
        text: "Điền địa chỉ, chọn quốc gia, nhập thành phố và số điện thoại của chi nhánh mới. Đây là địa chỉ khách sẽ tìm đến, nên hãy ghi đầy đủ số nhà và tên đường.",
        image: { src: img("nhap-dia-chi-quoc-gia-thanh-pho-chi-nhanh"), alt: "Các ô Địa chỉ, Quốc gia kèm chú thích dùng để đặt múi giờ cho salon, Thành phố và Số điện thoại của chi nhánh mới" },
      },
      {
        name: "Bấm “Gửi đăng ký”",
        text: "Đọc lại một lượt rồi bấm “Gửi đăng ký” ở cuối biểu mẫu. Chi nhánh mới có trang đặt lịch riêng.",
        image: { src: img("bam-gui-dang-ky-chi-nhanh-moi"), alt: "Cuối biểu mẫu chi nhánh mới với các ô Quốc gia, Thành phố, Số điện thoại và nút màu đen Gửi đăng ký được khoanh vàng" },
      },
      {
        name: "Thêm dịch vụ, nhân viên và giờ mở cửa cho chi nhánh mới",
        text: "Thêm dịch vụ, nhân viên và giờ mở cửa cho chi nhánh đó, giống như bạn đã làm với salon đầu tiên. Làm xong ba việc này thì khách mới có thứ để chọn và giờ để đặt.",
      },
      {
        name: "Chuyển qua lại bằng ô “Chi nhánh” và chia sẻ link chuỗi",
        text: "Khi đã có từ hai chi nhánh, ở đầu trang quản trị xuất hiện ô “Chi nhánh”. Bấm vào đó để chuyển giữa các cơ sở, chỉ một chạm. Trong “Cài đặt”, lấy “Trang đặt lịch chuỗi” để có một đường link chung cho khách.",
      },
    ],
  },
  faq: [
    {
      q: "Mở thêm chi nhánh có phải tạo tài khoản VaraaAi mới không?",
      a: "Không. Mọi chi nhánh nằm trong cùng một tài khoản. Bạn thêm cơ sở mới ngay trong phần “Chi nhánh” của “Cài đặt” và vẫn đăng nhập như cũ.",
    },
    {
      q: "Thêm chi nhánh mới ở đâu trên VaraaAi?",
      a: "Vào “Cài đặt”, kéo xuống phần “Chi nhánh” và bấm “Thêm chi nhánh”. Điền tên, giới thiệu ngắn, danh mục dịch vụ, địa chỉ, quốc gia, thành phố và số điện thoại, rồi bấm “Gửi đăng ký”.",
    },
    {
      q: "Mỗi chi nhánh có những gì riêng?",
      a: "Mỗi chi nhánh có trang đặt lịch, lịch hẹn và nhân viên riêng. Nhờ vậy lịch và số liệu của từng cơ sở không lẫn vào nhau.",
    },
    {
      q: "Làm sao chuyển qua lại giữa các chi nhánh khi quản lý?",
      a: "Khi tài khoản có từ hai chi nhánh, ở đầu trang quản trị xuất hiện ô “Chi nhánh”. Bấm vào ô đó và chọn cơ sở bạn muốn quản lý.",
    },
    {
      q: "“Trang đặt lịch chuỗi” dùng để làm gì?",
      a: "Đó là một đường link chung cho cả chuỗi. Khách mở link, chọn chi nhánh rồi mới đặt lịch, nên bạn chỉ cần chia sẻ một link thay vì nhiều link.",
    },
    {
      q: "Thêm chi nhánh xong thì khách đặt lịch được ngay chưa?",
      a: "Chi nhánh mới có trang đặt lịch riêng ngay sau khi bạn gửi đăng ký. Bạn cần thêm dịch vụ, nhân viên và giờ mở cửa cho chi nhánh đó, giống như với salon đầu tiên, để khách có thứ để chọn.",
    },
  ],
  related: ["tong-quan", "kho-hang", "dang-ky-salon", "chia-se-link"],
};

export default article;
