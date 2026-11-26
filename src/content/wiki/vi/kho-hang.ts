import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/kho-hang/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "quan-ly-kho-hang-salon-tiem-nail",
  lesson: "kho-hang",
  category: "salon",
  title: "Quản lý kho hàng salon, tiệm nail: quét mã nhập kho, lấy hàng và danh sách cần mua",
  metaTitle: "Quản lý kho hàng salon, tiệm nail bằng điện thoại",
  metaDescription:
    "Cách quản lý kho vật tư cho tiệm nail, tóc, mi, spa trên VaraaAi: thêm món, đặt mức tối thiểu, quét mã nhập kho và lấy hàng, kiểm kê, in danh sách cần mua.",
  keyword: "quản lý kho hàng salon",
  keywords: [
    "quản lý kho tiệm nail",
    "quản lý vật tư salon",
    "theo dõi tồn kho sơn gel",
    "mức tối thiểu tồn kho là gì",
    "quét mã vạch nhập kho bằng điện thoại",
    "danh sách vật tư cần mua cho tiệm nail",
    "kiểm kê kho salon cuối tháng",
  ],
  excerpt: "Biết trong tiệm còn gì, để ở tủ nào và cần mua gì, chỉ bằng điện thoại: quét mã khi nhập, quét khi lấy, kiểm kê cuối tháng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("salon-toc-dong-khach-can-quan-ly-vat-tu"),
    alt: "Một salon tóc lớn có trần cao và cửa vòm, nhiều thợ đang làm tóc cho khách ngồi trên dãy ghế trước gương",
  },
  takeaways: [
    "**“Mức tối thiểu”** là con số quan trọng nhất của mỗi món: khi số lượng xuống bằng mức này, món đó tự vào danh sách cần mua.",
    "Hàng về thì bấm **“Quét nhập kho”**, lấy ra dùng thì bấm **“Quét lấy hàng”**. Không tiện quét thì bấm “+1” hoặc “−1”.",
    "Món mới chưa có trong kho: **chụp hình sản phẩm**, AI tự nhận tên, hãng và màu, bạn chỉ nhập số lượng.",
    "Cuối tháng đếm lại trong tủ, nhập số đúng vào ô “Kiểm kê” rồi bấm **“Cập nhật số lượng”**.",
    "Thẻ **“Cần mua”** gom sẵn những món đã chạm mức tối thiểu kèm số tiền ước tính, sao chép hoặc in được.",
  ],
  intro: [
    "Chuyện quản lý kho hàng salon thường chỉ được nhớ tới vào lúc tệ nhất: đang làm cho khách thì phát hiện hết sơn gel, hết dung dịch. Phần lớn tiệm vẫn theo dõi vật tư bằng trí nhớ của một người, và người đó không thể vừa làm khách vừa đếm tủ.",
    "Bài viết này đi theo bài học “Kho vật tư: quét nhập, quét lấy hàng” của VaraaAi Academy. Bạn sẽ lập được kho vật tư của tiệm ngay trên điện thoại, đặt mức tối thiểu cho từng món, ghi lại hàng vào và hàng ra bằng cách quét mã, rồi lấy danh sách cần mua trước mỗi lần đi lấy hàng.",
  ],
  sections: [
    {
      id: "vi-sao-can-quan-ly-kho",
      title: "Vì sao tiệm nail, salon cần quản lý vật tư",
      blocks: [
        { p: "Một tiệm nail dùng rất nhiều món nhỏ: sơn gel theo từng màu, base, top, dung dịch, bông, giấy bạc. Tiệm tóc và spa cũng vậy với thuốc nhuộm, dầu gội, sáp wax. Mỗi món rẻ, nhưng thiếu một món là thợ phải từ chối một dịch vụ hoặc đổi màu khách đã chọn." },
        { p: "Không theo dõi kho thì tiệm thường gặp ba chuyện. Món bán chạy hết mà không ai báo. Món khác lại bị mua trùng vì không ai chắc trong tủ còn hay không. Và có những chai nằm sâu trong ngăn đến quá hạn dùng mới được tìm thấy." },
        { p: "Kho vật tư của VaraaAi trả lời ba câu hỏi: trong tiệm còn gì, để ở đâu và cần mua gì. Tất cả làm bằng điện thoại. Ngay đầu mục “Kho hàng” có bốn ô số: “Mặt hàng”, “Sắp hết”, “Hết hàng” và “Đã lấy 7 ngày”. Bên dưới là giá trị tồn kho." },
        { img: { src: img("kho-vat-tu-cua-salon-so-mat-hang-sap-het"), alt: "Màn hình Kho vật tư của salon với bốn ô số Mặt hàng, Sắp hết, Hết hàng và Đã lấy 7 ngày được khoanh vàng", caption: "Bốn ô số ở đầu mục “Kho hàng”. Ô “Sắp hết” và “Hết hàng” là hai ô nên nhìn mỗi sáng." } },
        { note: "Kho vật tư dành cho những thứ tiệm dùng khi làm việc. Hàng bán cho khách mang về thì đăng ở mục khác, xem bài [bán sản phẩm và quản lý đơn hàng](lesson:san-pham-don-hang).", kind: "info", title: "Vật tư, không phải hàng bán" },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi lập kho trên điện thoại",
      blocks: [
        {
          ul: [
            "**Một chiếc điện thoại có camera**, vì việc nhập và lấy hàng đều làm bằng cách quét.",
            "**Danh sách vật tư theo loại.** Đi một vòng qua các tủ và ghi lại, ví dụ sơn gel, sơn thường, dung dịch.",
            "**Đơn vị đếm cho từng món.** Trong video, sơn gel được đếm theo chai. Chọn đơn vị mà cả tiệm cùng hiểu một cách.",
            "**Mức tối thiểu của từng món**, tức là còn bao nhiêu thì phải mua thêm.",
            "**Tên các tủ, các ngăn** nếu bạn muốn ghi cả vị trí để hàng.",
          ],
        },
        { p: "Bạn không cần nhập cả kho trong một buổi. Hãy bắt đầu bằng những món mà thiếu là phải dừng việc, rồi thêm dần các món còn lại mỗi khi hàng mới về." },
      ],
    },
    {
      id: "muc-toi-thieu",
      title: "Mức tối thiểu tồn kho là gì và đặt bao nhiêu cho vừa",
      blocks: [
        { p: "Mức tối thiểu là vạch báo động của một món. Dòng chú thích ngay dưới ô “Mức tối thiểu” ghi rõ: còn bằng hoặc ít hơn số này thì món đó vào danh sách cần mua. Nhờ vậy bạn mua thêm trước khi hết hàng, không phải sau khi một người thợ mở tủ ra và thấy ngăn trống." },
        { img: { src: img("dat-muc-toi-thieu-cho-vat-tu"), alt: "Trang thêm sản phẩm vào kho với ô Đếm theo đang chọn chai và ô Mức tối thiểu ghi số 2 được khoanh vàng", caption: "Ví dụ trong video: một màu sơn gel đếm theo chai, mức tối thiểu là 2." } },
        { p: "Bài học không đưa ra một con số chung, vì mỗi món mỗi khác. Cách nghĩ thực tế là tự hỏi: từ lúc đặt hàng đến lúc hàng về, tiệm dùng hết khoảng bao nhiêu món này. Mức tối thiểu nên đủ cho quãng chờ đó." },
        {
          table: {
            head: ["Loại vật tư", "Gợi ý khi đặt mức tối thiểu"],
            rows: [
              ["Món ngày nào cũng dùng, ví dụ base, top, dung dịch", "Đặt cao hơn, vì hết là dừng cả tiệm"],
              ["Màu sơn ít khách chọn", "Đặt thấp, để không tồn nhiều chai đến quá hạn"],
              ["Món khó mua, phải đặt xa", "Đặt đủ cho cả thời gian chờ giao hàng"],
            ],
          },
        },
        { p: "Bảng trên là gợi ý của bài viết, không phải quy định của phần mềm. Sau một hai tháng dùng, bạn sẽ thấy món nào hay nằm trong thẻ “Cần mua” quá muộn và nâng mức của món đó lên." },
      ],
    },
    {
      id: "quet-chup-hay-bam",
      title: "Quét mã vạch, chụp hình hay bấm tay: lúc nào dùng cách nào",
      blocks: [
        { p: "Kho chỉ đúng khi mọi lần hàng vào và hàng ra đều được ghi. Vì vậy phần mềm có nhiều cách ghi, để lúc nào cũng có một cách đủ nhanh." },
        {
          table: {
            head: ["Tình huống", "Cách làm"],
            rows: [
              ["Hàng mới về, món đã có trong kho", "Bấm “Quét nhập kho”, đưa mã vạch của sản phẩm vào camera"],
              ["Hàng mới về, món chưa có trong kho", "Bấm “Chụp hình sản phẩm”. AI tự nhận tên, hãng, màu, bạn nhập thêm số lượng"],
              ["Lấy một chai ra dùng", "Bấm “Quét lấy hàng” rồi quét mã"],
              ["Tay đang bận, không tiện quét", "Bấm vào món đó trong danh sách rồi bấm “−1” hoặc “+1”"],
              ["Sản phẩm không có mã vạch", "In nhãn QR cho sản phẩm đó trong thẻ “Tủ & nhãn” và dán lên"],
            ],
          },
        },
        { note: "Sau khi chụp hình một món mới, hãy đọc lại tên, hãng và màu trước khi lưu. Các màu sơn gần nhau rất dễ nhầm, và một cái tên sai sẽ theo món đó vào mọi danh sách về sau.", kind: "tip", title: "Đọc lại sau khi chụp" },
      ],
    },
    {
      id: "kiem-ke-vi-tri-han-dung",
      title: "Kiểm kê kho cuối tháng, vị trí tủ và hạn dùng",
      blocks: [
        { p: "Dù cả tiệm quét chăm đến đâu, con số trên máy và số chai trong tủ vẫn lệch dần: một chai bị đổ, một lần quên quét. Kiểm kê là lúc sửa lại. Bài học khuyên làm vào cuối tháng: đếm lại trong tủ, nhập số đúng vào ô “Kiểm kê” rồi bấm “Cập nhật số lượng”." },
        { p: "Cũng trong màn hình của từng món, bạn ghi được món đó để ở tủ nào và hạn dùng. Vị trí giúp người mới vào làm tìm được hàng mà không phải hỏi. Hạn dùng giúp bạn dùng trước những chai sắp hết hạn và loại ra những chai đã quá hạn, thay vì phát hiện ra khi đang làm cho khách." },
        { img: { src: img("tao-tu-va-in-nhan-qr-cho-kho"), alt: "Thẻ Tủ và nhãn với ô nhập tên tủ, nút Thêm và hai nút In nhãn QR cho tủ, In nhãn QR cho sản phẩm không có mã vạch", caption: "Thẻ “Tủ & nhãn”: tạo tủ, ngăn rồi in nhãn QR dán lên." } },
        { p: "Thẻ “Tủ & nhãn” là nơi tạo các tủ, các ngăn và in nhãn QR cho chúng. Khi nhập hàng, bạn quét nhãn tủ trước, hàng sẽ tự xếp vào tủ đó trên máy. Cách này nhanh hơn nhiều so với chọn vị trí cho từng món." },
      ],
    },
    {
      id: "can-mua-va-lich-su",
      title: "Danh sách vật tư cần mua và lịch sử nhập, lấy hàng",
      blocks: [
        { p: "Thẻ “Cần mua” gom sẵn những món đã xuống bằng hoặc dưới mức tối thiểu. Mỗi dòng ghi số còn lại, mức tối thiểu và số lượng nên mua thêm. Đầu danh sách có dòng “Ước tính tiền mua”, để bạn biết trước lần đi lấy hàng này tốn khoảng bao nhiêu." },
        { p: "Từ đây có hai nút. “Sao chép danh sách” hợp khi bạn đặt hàng qua tin nhắn hoặc email cho nhà cung cấp. “In danh sách” hợp khi bạn tự đi lấy hàng và muốn cầm một tờ giấy để gạch từng dòng." },
        { img: { src: img("lich-su-nhap-va-lay-hang-trong-kho"), alt: "Thẻ Lịch sử của kho hàng liệt kê hai lần kiểm kê sơn gel kèm ngày giờ, tên người thực hiện và số lượng thay đổi", caption: "Thẻ “Lịch sử” ghi từng lần thay đổi: món nào, lúc nào, ai làm và thay đổi bao nhiêu." } },
        { p: "Thẻ “Lịch sử” ghi lại ai nhập, ai lấy và lúc nào. Nó không dùng để soi nhân viên. Giá trị của nó là khi con số lệch, bạn lần lại được chuyện gì đã xảy ra thay vì đoán." },
        { p: "Kho chỉ chạy khi cả tiệm cùng làm một thói quen: ai lấy thì người đó quét. Hãy giao việc này rõ ràng khi [thêm nhân viên](lesson:nhan-vien), và nếu tiệm đã dùng [tiện ích nhóm](lesson:tien-ich-nhom) thì đăng một thông báo hoặc một bài đào tạo ngắn về cách quét. Tiệm có nhiều cơ sở thì xem thêm bài [nhiều chi nhánh](lesson:chi-nhanh), vì kho cho biết từng chi nhánh còn bao nhiêu." },
      ],
    },
  ],
  howTo: {
    title: "Các bước quản lý kho hàng salon trên VaraaAi",
    id: "cac-buoc-quan-ly-kho",
    after: "chuan-bi",
    lead: "Bảy bước dưới đây theo thứ tự của video bài học: lập kho, ghi hàng vào, ghi hàng ra, kiểm kê và đi mua.",
    steps: [
      {
        name: "Mở mục “Kho hàng”",
        text: "Trong trang quản trị, bấm mục “Kho hàng”. Trên cùng là số mặt hàng, số món sắp hết, số món đã hết và giá trị tồn kho. Nhìn qua bốn con số này trước khi làm bất cứ việc gì khác trong kho.",
      },
      {
        name: "Bấm “Thêm sản phẩm” và điền thông tin",
        text: "Bấm “Thêm sản phẩm”, điền tên, màu, hãng, loại, đơn vị đếm và “Mức tối thiểu”, rồi bấm “Lưu”. Ghi cả mã màu vào ô màu, vì với sơn gel thì tên màu thôi chưa đủ để phân biệt.",
      },
      {
        name: "Hàng về: bấm “Quét nhập kho”",
        text: "Khi hàng về, bấm “Quét nhập kho” và đưa mã vạch của sản phẩm vào camera. Hãy quét ngay lúc mở thùng, trước khi xếp vào tủ. Để đến cuối ngày thì thế nào cũng sót vài món.",
        image: { src: img("nut-quet-nhap-kho-va-quet-lay-hang"), alt: "Mục Kho hàng với nút xanh Quét nhập kho được khoanh vàng, bên cạnh là nút hồng Quét lấy hàng và nút Thêm sản phẩm" },
      },
      {
        name: "Món chưa có trong kho: bấm “Chụp hình sản phẩm”",
        text: "Nếu món vừa về chưa có trong kho, bấm “Chụp hình sản phẩm”. AI tự nhận tên, hãng và màu, bạn chỉ cần nhập số lượng. Trên màn hình quét cũng có ô để nhập mã bằng tay khi camera không mở được.",
        image: { src: img("quet-ma-vach-hoac-chup-hinh-san-pham"), alt: "Màn hình quét với ba thẻ Nhập kho, Lấy hàng, Kiểm kê, khung camera được khoanh vàng và nút Chụp hình sản phẩm bên dưới" },
      },
      {
        name: "Lấy hàng ra dùng: “Quét lấy hàng” hoặc “−1”",
        text: "Mỗi lần lấy một món ra dùng, bấm “Quét lấy hàng” rồi quét mã. Không tiện quét thì bấm vào món đó trong danh sách, rồi bấm “−1”. Bấm “+1” nếu bạn trả lại một món chưa dùng.",
        image: { src: img("bam-cong-mot-tru-mot-khi-lay-vat-tu"), alt: "Màn hình một món sơn gel còn 6 chai, tối thiểu 2, với hai nút trừ một và cộng một được khoanh vàng" },
      },
      {
        name: "Kiểm kê và bấm “Cập nhật số lượng”",
        text: "Bấm vào một món, đếm số thực tế trong tủ, nhập vào ô “Kiểm kê” rồi bấm “Cập nhật số lượng”. Ngay bên dưới, bạn ghi được món đó để ở tủ nào và hạn dùng.",
        image: { src: img("kiem-ke-cap-nhat-so-luong-ton-kho"), alt: "Ô Kiểm kê với số đếm 6 và nút Cập nhật số lượng được khoanh vàng, bên dưới là ô Để ở và ô Hạn dùng" },
      },
      {
        name: "Mở thẻ “Cần mua” trước khi đi lấy hàng",
        text: "Mở thẻ “Cần mua” để xem những món đã chạm mức tối thiểu, kèm số tiền ước tính. Bấm “Sao chép danh sách” hoặc “In danh sách” rồi đi mua. Hàng về, quay lại bước nhập kho.",
        image: { src: img("danh-sach-can-mua-vat-tu-salon"), alt: "Thẻ Cần mua với dòng Ước tính tiền mua và hai nút Sao chép danh sách, In danh sách được khoanh vàng, bên dưới là hai món cần mua thêm" },
      },
    ],
  },
  faq: [
    {
      q: "Mức tối thiểu trong kho hàng dùng để làm gì?",
      a: "Đó là mức báo cần mua thêm. Khi số lượng của một món xuống bằng mức tối thiểu, món đó tự vào danh sách cần mua. Nhờ vậy bạn mua thêm trước khi hết hàng.",
    },
    {
      q: "Món mới chưa có trong kho thì nhập thế nào cho nhanh?",
      a: "Bấm “Quét nhập kho” rồi chọn “Chụp hình sản phẩm”. AI tự nhận tên, hãng và màu của sản phẩm, bạn chỉ cần nhập thêm số lượng.",
    },
    {
      q: "Không tiện quét mã vạch khi lấy hàng thì làm sao?",
      a: "Bấm vào món đó trong danh sách rồi bấm “−1” khi lấy ra hoặc “+1” khi thêm vào. Số lượng của món đó được cập nhật mà không cần đưa mã vạch vào camera.",
    },
    {
      q: "Xem những vật tư cần mua thêm ở đâu?",
      a: "Trong thẻ “Cần mua” của mục “Kho hàng”. Thẻ này gom những món đã chạm mức tối thiểu, kèm số tiền ước tính. Bạn bấm “Sao chép danh sách” hoặc “In danh sách” để mang đi mua.",
    },
    {
      q: "Bao lâu nên kiểm kê kho một lần?",
      a: "Bài học khuyên kiểm kê vào cuối tháng. Bạn đếm lại trong tủ, nhập số đúng vào ô “Kiểm kê” của từng món rồi bấm “Cập nhật số lượng”.",
    },
    {
      q: "Có biết được ai đã lấy hàng trong kho không?",
      a: "Có. Thẻ “Lịch sử” ghi lại ai nhập, ai lấy và lúc nào. Khi số lượng bị lệch, bạn xem lại thẻ này để biết thay đổi đến từ đâu.",
    },
    {
      q: "Nhãn QR cho tủ dùng để làm gì?",
      a: "Trong thẻ “Tủ & nhãn”, bạn tạo các tủ, các ngăn và in nhãn QR dán lên. Khi nhập hàng, quét nhãn tủ trước thì hàng tự xếp vào tủ đó, nên sau này ai cũng biết món nào để ở đâu.",
    },
  ],
  related: ["chi-nhanh", "tong-quan", "san-pham-don-hang", "nhan-vien"],
};

export default article;
