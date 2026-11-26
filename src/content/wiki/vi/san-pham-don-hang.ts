import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/san-pham-don-hang/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "ban-san-pham-tai-salon-cua-hang-online",
  lesson: "san-pham-don-hang",
  category: "salon",
  title: "Bán sản phẩm tại salon: cách mở cửa hàng online và xử lý đơn hàng trong 8 bước",
  metaTitle: "Bán sản phẩm tại salon: mở cửa hàng online, quản lý đơn",
  metaDescription:
    "Hướng dẫn chủ tiệm nail, tóc, spa bán sản phẩm chăm sóc trên VaraaAi: thêm ảnh, giá bán, ghim món nổi bật, gửi link cửa hàng và xử lý đơn nhận tại salon.",
  keyword: "bán sản phẩm tại salon",
  keywords: [
    "bán sản phẩm chăm sóc trong tiệm nail",
    "mở cửa hàng online cho salon",
    "bán mỹ phẩm tại spa",
    "quản lý đơn hàng của salon",
    "khách đặt online nhận hàng tại salon",
    "cách đăng sản phẩm lên trang salon",
    "bán thêm sản phẩm cho khách làm đẹp",
  ],
  excerpt: "Thêm ảnh, tên, mô tả và giá là sản phẩm lên cửa hàng online của salon. Khách đặt trên mạng, đến tiệm nhận hàng, bạn bấm hoàn thành.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("san-pham-cham-soc-tren-ke-da-cua-salon"),
    alt: "Một lọ dầu dưỡng có ống nhỏ giọt và một hũ kem đặt trên mặt đá cẩm thạch cạnh khăn nhung tím và gương viền vàng",
  },
  takeaways: [
    "Cửa hàng của salon theo kiểu **đặt online, nhận tại salon**, nên bạn không phải đóng gói hay gửi bưu điện.",
    "Mỗi sản phẩm thêm được **tối đa 8 ảnh**, và ảnh đầu tiên là ảnh bìa.",
    "Bật **“Sản phẩm nổi bật”** để ghim món đó lên đầu cửa hàng. Bật **“Hết hàng”** thì sản phẩm vẫn hiện nhưng khách chưa đặt được.",
    "Khi khách đến lấy hàng, mở “Đơn hàng” và bấm **“Đã giao – hoàn thành”**. Đơn được tính vào doanh thu.",
    "Để ô **“Gửi email báo khách”** được chọn, khách nhận email ở mỗi bước của đơn hàng.",
  ],
  intro: [
    "Bán sản phẩm tại salon thường dừng lại ở một chiếc kệ cạnh quầy thanh toán: khách chỉ thấy nó trong vài phút trả tiền, lúc đang vội. Trong khi đó, khách vừa làm đẹp xong thường muốn mua thêm sản phẩm về dùng ở nhà, và người họ tin nhất để hỏi nên mua gì chính là người thợ vừa làm cho họ.",
    "Bài viết này đi theo bài học “Bán sản phẩm và quản lý đơn hàng” của VaraaAi Academy. Bạn sẽ tự đăng được một sản phẩm lên cửa hàng online của salon, biết dùng các công tắc hiển thị, gửi link cửa hàng cho khách và xử lý một đơn hàng từ lúc khách đặt đến lúc họ ghé tiệm nhận.",
  ],
  sections: [
    {
      id: "vi-sao-ban-san-pham",
      title: "Vì sao salon nên bán thêm sản phẩm chăm sóc cho khách",
      blocks: [
        { p: "Một bộ móng hay một mái tóc đẹp chỉ giữ được lâu khi khách chăm sóc đúng ở nhà. Thợ dặn khách dùng dầu dưỡng, kem tay hay dầu gội phù hợp, rồi khách phải tự đi tìm mua ở chỗ khác. Khi tiệm có sẵn đúng món đã dặn, lời khuyên trở thành một việc khách làm được ngay." },
        { p: "Cái khó của kệ hàng trong tiệm là khách chỉ nhìn thấy nó lúc có mặt. Vài tuần sau, khi lọ dầu dưỡng hết, họ không nhớ tên sản phẩm và cũng không tiện ghé hỏi. Cửa hàng online giữ kệ hàng đó mở suốt: khách xem ảnh, đọc mô tả, đặt trên điện thoại rồi lấy hàng vào lần ghé tiệm kế tiếp." },
        { p: "Với VaraaAi, salon có một cửa hàng riêng ngay trên trang của mình. Dòng giới thiệu ở đầu mục “Sản phẩm” nói gọn cách hoạt động: khách đặt online, nhận tại salon. Không có khâu vận chuyển, nên một tiệm nhỏ cũng làm được mà không cần thêm người. Phía khách trông ra sao thì bạn xem trong bài [theo dõi salon và mua sản phẩm của salon](lesson:theo-doi-salon)." },
        { note: "Mục “Sản phẩm” dành cho hàng bán cho khách. Sơn, dung dịch và vật tư thợ dùng khi làm việc thì theo dõi ở mục khác, xem bài [kho vật tư](lesson:kho-hang).", kind: "info", title: "Đừng nhầm với kho vật tư" },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi đăng sản phẩm lên trang salon",
      blocks: [
        { p: "Trang thêm sản phẩm chia thành các phần “Hình ảnh”, “Thông tin”, “Giá bán” và “Hiển thị”. Chuẩn bị sẵn những thứ sau thì mỗi sản phẩm chỉ mất vài phút:" },
        {
          ul: [
            "**Ảnh sản phẩm.** Tối đa 8 ảnh, định dạng JPG, PNG hoặc WebP, mỗi ảnh tối đa 5MB. Ảnh đầu tiên là ảnh bìa, tức là ảnh khách thấy trước khi bấm vào.",
            "**Tên sản phẩm** kèm dung tích hoặc khối lượng, để khách phân biệt được hai cỡ của cùng một món.",
            "**Thương hiệu.** Ô này không bắt buộc.",
            "**Mô tả.** Dòng gợi ý trong ô nhắc ba ý nên có: công dụng, thành phần nổi bật, cách dùng.",
            "**Giá bán**, và **giá gốc** nếu món đó đang giảm giá.",
          ],
        },
        { note: "Hãy bắt đầu với vài món thợ trong tiệm vẫn dặn khách dùng sau mỗi lần làm. Đó là những món khách đã nghe tên và đã thấy tận mắt, nên dễ đặt nhất.", kind: "tip", title: "Đăng món nào trước" },
      ],
    },
    {
      id: "anh-va-mo-ta",
      title: "Ảnh, tên và mô tả: cách đăng sản phẩm để khách tin",
      blocks: [
        { p: "Khách đặt online không cầm được lọ kem lên xem. Ảnh và mô tả phải làm thay việc đó. Vì ảnh đầu tiên là ảnh bìa, hãy chọn tấm chụp rõ cả sản phẩm trên nền sạch. Những ảnh sau dùng cho nhãn thành phần, kết cấu kem hay kích thước thật khi đặt cạnh bàn tay." },
        {
          table: {
            head: ["Ô", "Nên ghi gì"],
            rows: [
              ["“Tên sản phẩm”", "Tên khách sẽ gọi, kèm dung tích. Ví dụ trong video: Dầu dưỡng móng Lumi 15ml"],
              ["“Thương hiệu”", "Tên hãng, nếu khách hay hỏi theo hãng. Có thể để trống"],
              ["“Mô tả”", "Dùng để làm gì, thành phần nổi bật, cách dùng và dùng khi nào"],
              ["“Giá bán”", "Giá khách trả tại tiệm"],
              ["“Giá gốc”", "Chỉ điền khi đang giảm giá"],
            ],
          },
        },
        { p: "Viết mô tả như lời bạn vẫn dặn khách ở ghế: thoa lúc nào, bao nhiêu, tránh gì. Chỉ viết công dụng đúng như nhà sản xuất ghi trên bao bì, và đừng hứa kết quả chữa trị." },
        { p: "Cuối trang nhập có phần “Khách sẽ thấy”. Đây là bản xem trước của thẻ sản phẩm, với ảnh bìa và tên đúng như trong cửa hàng. Nhìn qua phần này trước khi lưu để bắt lỗi chính tả hoặc một tấm ảnh bìa bị cắt xấu." },
      ],
    },
    {
      id: "noi-bat-het-hang-an",
      title: "“Sản phẩm nổi bật”, “Hết hàng”, “Ẩn khỏi cửa hàng”: khi nào dùng công tắc nào",
      blocks: [
        { p: "Phần “Hiển thị” có ba công tắc. Chúng quyết định khách có thấy sản phẩm hay không, thấy ở đâu và có đặt được không." },
        {
          table: {
            head: ["Công tắc", "Khi bật", "Dùng khi nào"],
            rows: [
              ["“Sản phẩm nổi bật”", "Sản phẩm được ghim lên mục “Được yêu thích” ở đầu cửa hàng", "Món bán chạy, món mới về, món đang giảm giá"],
              ["“Hết hàng”", "Sản phẩm vẫn hiển thị nhưng khách chưa đặt được", "Tạm hết và sẽ có lại"],
              ["“Ẩn khỏi cửa hàng”", "Chỉ bạn nhìn thấy trong trang quản trị", "Chưa muốn bán, hoặc đang soạn dở"],
            ],
          },
        },
        { p: "Phân biệt “Hết hàng” với “Ẩn khỏi cửa hàng” giúp tiệm tránh một tình huống khó xử: khách đặt và hẹn ngày ghé lấy, đến nơi mới biết món đó đã hết. Hết thật thì bật “Hết hàng” ngay hôm đó. Khách quen vẫn thấy sản phẩm còn trong cửa hàng và biết tiệm sẽ có lại." },
        { img: { src: img("danh-sach-san-pham-cua-salon"), alt: "Danh sách hai sản phẩm của salon kèm giá, một sản phẩm có nhãn Nổi bật, bên trái mỗi sản phẩm là biểu tượng sáu chấm để kéo", caption: "Sản phẩm đã lưu hiện trong danh sách. Kéo biểu tượng sáu chấm bên trái để sắp xếp, khách thấy đúng thứ tự này trong cửa hàng." } },
        { p: "Đừng ghim quá nhiều món. Khi sản phẩm nào cũng là nổi bật thì khách không còn biết bạn khuyên họ mua gì. Phần còn lại sắp theo thứ tự bạn kéo trong danh sách." },
      ],
    },
    {
      id: "quan-ly-don-hang",
      title: "Quản lý đơn hàng của salon: từ lúc khách đặt đến lúc nhận hàng",
      blocks: [
        { p: "Khi khách đặt mua, đơn hiện trong mục “Đơn hàng”, mở bằng nút cùng tên ở đầu mục “Sản phẩm”. Mỗi đơn là một thẻ ghi rõ bốn điều: khách nào, món gì, trả bằng cách nào và lời nhắn của khách. Trong video, đơn mẫu ghi cách thanh toán là tiền mặt tại salon, kèm ghi chú của khách hẹn chiều thứ Bảy ghé lấy." },
        { p: "Trên thẻ có ba mốc nối nhau: “Đặt hàng”, “Xác nhận” và “Hoàn thành”. Nhìn mốc đang sáng là biết đơn ở giai đoạn nào. Các đơn cũng được chia theo trạng thái ở đầu trang, ví dụ “Chờ xác nhận” và “Đã xác nhận”, kèm ô tìm theo khách, sản phẩm hoặc mã đơn." },
        { img: { src: img("o-gui-email-bao-khach-trong-don-hang"), alt: "Trang Đơn hàng với ô đánh dấu Gửi email báo khách được khoanh vàng, phía dưới là nút Xuất Excel và một đơn đã xác nhận", caption: "Ô “Gửi email báo khách” nằm ngay dưới ô tìm kiếm. Hãy để ô này được chọn." } },
        { p: "Lời nhắn của khách đáng đọc kỹ. Khách ghi ngày giờ định ghé thì bạn để sẵn món hàng ở quầy, có dán tên. Khách đến, bạn giao hàng, nhận tiền theo cách ghi trên đơn rồi bấm “Đã giao – hoàn thành”. Đơn chuyển sang hoàn thành và được tính vào doanh thu. Cần giấy tờ thì bấm “In phiếu”." },
        { p: "Khi ô “Gửi email báo khách” được chọn, khách nhận email ở mỗi bước của đơn hàng. Họ biết tiệm đã thấy đơn và hàng đang chờ, nên bạn bớt được những tin nhắn hỏi lại." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp và cách đưa cửa hàng đến với khách",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Một món tạm hết", "Bật “Hết hàng”. Sản phẩm vẫn hiện, khách chưa đặt được"],
              ["Món đang giảm giá", "Nhập giá mới ở “Giá bán” và giá cũ ở “Giá gốc”"],
              ["Muốn xem cửa hàng như khách thấy", "Bấm “Xem cửa hàng” ở đầu mục “Sản phẩm”"],
              ["Khách không đến lấy và báo hủy", "Mở đơn đó trong “Đơn hàng” và bấm “Hủy đơn”"],
              ["Cần sổ sách về các đơn", "Trang “Đơn hàng” có nút “Xuất Excel (CSV)”"],
            ],
          },
        },
        { p: "Cửa hàng có sản phẩm rồi vẫn cần người biết đến. Nút “Sao chép link” cho bạn đường dẫn của cửa hàng để gửi cho khách. Ba chỗ nên dán link: tin nhắn trả lời khi khách hỏi mua, một [bài đăng trên Fanpage](lesson:fanpage) giới thiệu món mới về, và một [email khuyến mãi](lesson:email-marketing) gửi cho nhóm khách quen với nút bấm dẫn sang link cửa hàng." },
        { p: "Trong tiệm, cách giới thiệu tự nhiên nhất vẫn là lời dặn của thợ lúc khách sắp về: món này dùng ở nhà, hết thì đặt trên trang của tiệm rồi ghé lấy. Nếu tiệm có [website riêng](lesson:website-salon), khách quen sẽ tìm lại cửa hàng dễ hơn." },
      ],
    },
  ],
  howTo: {
    title: "Các bước bán sản phẩm tại salon qua cửa hàng online VaraaAi",
    id: "cac-buoc-ban-san-pham",
    after: "chuan-bi",
    lead: "Sáu bước đầu là đăng một sản phẩm, hai bước cuối là gửi cửa hàng cho khách và xử lý đơn. Thứ tự theo đúng video bài học.",
    steps: [
      {
        name: "Mở mục “Sản phẩm” và bấm “Thêm sản phẩm”",
        text: "Trong trang quản trị, bấm mục “Sản phẩm”. Đầu trang có các nút “Xem cửa hàng”, “Sao chép link”, “Đơn hàng” và “Thêm sản phẩm”, bên dưới là vài con số như số món đang bán và lượt xem. Bấm “Thêm sản phẩm” để mở trang nhập.",
        image: { src: img("nut-them-san-pham-xem-cua-hang-sao-chep-link"), alt: "Mục Sản phẩm trong trang quản trị với nút Thêm sản phẩm được khoanh vàng, phía trên là Xem cửa hàng, Sao chép link và Đơn hàng" },
      },
      {
        name: "Thêm hình ảnh",
        text: "Ở phần “Hình ảnh”, kéo thả ảnh vào khung hoặc bấm để chọn ảnh từ máy. Bạn thêm được tối đa 8 ảnh, và ảnh đầu tiên là ảnh bìa. Chọn tấm rõ nhất làm ảnh đầu, vì đó là thứ khách thấy trước khi đọc bất kỳ chữ nào.",
        image: { src: img("them-hinh-anh-san-pham-toi-da-8-anh"), alt: "Khung Hình ảnh trống được khoanh vàng với dòng kéo thả ảnh vào đây và chú thích ảnh đầu tiên là ảnh bìa, tối đa 8 ảnh" },
      },
      {
        name: "Điền “Tên sản phẩm”, “Thương hiệu” và “Mô tả”",
        text: "Sang phần “Thông tin”, gõ “Tên sản phẩm” và “Thương hiệu”. Ở ô “Mô tả”, viết công dụng, thành phần nổi bật và cách dùng. Khách không hỏi được ai lúc đặt online, nên mô tả cần trả lời trước những câu họ hay hỏi tại tiệm.",
        image: { src: img("nhap-ten-san-pham-thuong-hieu-mo-ta"), alt: "Phần Thông tin với ô Tên sản phẩm và ô Thương hiệu không bắt buộc được khoanh vàng, bên dưới là ô Nhóm và ô Mô tả" },
      },
      {
        name: "Nhập “Giá bán” và “Giá gốc”",
        text: "Kéo xuống phần “Giá bán”, chọn tiền tệ rồi nhập giá. Nếu sản phẩm đang giảm giá, điền thêm giá cũ vào ô “Giá gốc”. Không giảm giá thì để trống ô này.",
        image: { src: img("nhap-gia-ban-va-gia-goc-san-pham"), alt: "Phần Giá bán với ô Tiền tệ đang chọn EUR, ô Giá bán ghi 18 được khoanh vàng và ô Giá gốc khi đang giảm giá" },
      },
      {
        name: "Bật “Sản phẩm nổi bật” hoặc “Hết hàng” nếu cần",
        text: "Ở phần “Hiển thị”, bật “Sản phẩm nổi bật” để ghim sản phẩm lên đầu cửa hàng. Khi tạm hết, bật “Hết hàng”: sản phẩm vẫn hiện nhưng khách chưa đặt được. Hai công tắc này đổi lại được bất cứ lúc nào.",
        image: { src: img("bat-san-pham-noi-bat-hoac-het-hang"), alt: "Phần Hiển thị với công tắc Sản phẩm nổi bật đang bật và được khoanh vàng, bên dưới là công tắc Hết hàng và Ẩn khỏi cửa hàng" },
      },
      {
        name: "Bấm “Lưu sản phẩm”",
        text: "Xem lại phần “Khách sẽ thấy” ở cuối trang rồi bấm “Lưu sản phẩm”. Sản phẩm hiện trong danh sách của bạn và trong cửa hàng của salon.",
        image: { src: img("xem-khach-se-thay-va-luu-san-pham"), alt: "Cuối trang thêm sản phẩm với phần Khách sẽ thấy hiện thẻ sản phẩm có nhãn Mới và nút Lưu sản phẩm được khoanh vàng" },
      },
      {
        name: "Bấm “Xem cửa hàng” hoặc “Sao chép link”",
        text: "Quay lại đầu mục “Sản phẩm”. Bấm “Xem cửa hàng” để xem như khách thấy, hoặc “Sao chép link” để gửi cho khách qua tin nhắn và mạng xã hội. Hãy tự mở cửa hàng một lần trên điện thoại trước khi gửi link đi.",
      },
      {
        name: "Mở “Đơn hàng” và bấm “Đã giao – hoàn thành”",
        text: "Khi có đơn, mở “Đơn hàng” để xem khách nào đặt, món gì, trả bằng cách nào và lời nhắn của họ. Khách đến nhận hàng thì bấm “Đã giao – hoàn thành”. Cần thì bấm “In phiếu”. Chỉ bấm hoàn thành khi hàng đã thật sự trao tay, vì đơn hoàn thành được tính vào doanh thu.",
        image: { src: img("don-hang-da-giao-hoan-thanh-in-phieu"), alt: "Một đơn hàng đã xác nhận ghi tiền mặt tại salon, tên khách, món hàng, ghi chú của khách và hai nút Đã giao hoàn thành, In phiếu" },
      },
    ],
  },
  faq: [
    {
      q: "Khách mua sản phẩm của salon trên VaraaAi thì nhận hàng ở đâu?",
      a: "Tại salon. Cửa hàng của salon hoạt động theo kiểu đặt online, nhận tại salon, nên tiệm không cần gửi bưu điện. Khách đặt trên mạng rồi ghé tiệm lấy hàng.",
    },
    {
      q: "Một sản phẩm thêm được bao nhiêu ảnh?",
      a: "Tối đa 8 ảnh cho mỗi sản phẩm. Ảnh đầu tiên là ảnh bìa, nên hãy đặt tấm rõ và đẹp nhất ở vị trí đầu.",
    },
    {
      q: "Bật “Sản phẩm nổi bật” thì có tác dụng gì?",
      a: "Sản phẩm được ghim lên đầu cửa hàng, nên khách thấy nó trước tiên. Hãy dùng cho vài món bạn muốn giới thiệu nhất, ví dụ món bán chạy hoặc món mới về.",
    },
    {
      q: "Sản phẩm tạm hết thì nên xóa hay làm gì?",
      a: "Không cần xóa. Bật công tắc “Hết hàng”: sản phẩm vẫn hiện trong cửa hàng nhưng khách chưa đặt được. Khi hàng về, bạn tắt công tắc là khách đặt lại được.",
    },
    {
      q: "Khách đã đến lấy hàng thì bấm gì trong mục Đơn hàng?",
      a: "Bấm “Đã giao – hoàn thành” trên đơn đó. Đơn chuyển sang hoàn thành và được tính vào doanh thu. Nếu cần giấy tờ, bấm thêm “In phiếu”.",
    },
    {
      q: "Khách có được báo khi đơn hàng thay đổi không?",
      a: "Có, nếu ô “Gửi email báo khách” trong trang “Đơn hàng” đang được chọn. Khi đó khách nhận email ở mỗi bước của đơn hàng.",
    },
  ],
  related: ["email-marketing", "the-qua-tang-salon", "kho-hang", "fanpage"],
};

export default article;
