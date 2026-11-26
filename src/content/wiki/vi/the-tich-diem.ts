import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-tich-diem/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "chuong-trinh-khach-hang-than-thiet-cho-salon",
  lesson: "the-tich-diem",
  category: "marketing",
  title: "Chương trình khách hàng thân thiết cho salon: cài thẻ tích điểm QR, cộng vé và giảm giá cho khách quen",
  metaTitle: "Chương trình khách hàng thân thiết cho salon, tiệm nail",
  metaDescription:
    "Cách cài chương trình khách hàng thân thiết cho tiệm nail, tóc, spa trên VaraaAi: đặt số lần để được giảm giá, kích hoạt thẻ QR và cộng vé khi khách đến.",
  keyword: "chương trình khách hàng thân thiết cho salon",
  keywords: [
    "chương trình tích điểm cho spa",
    "thẻ thành viên cho tiệm nail",
    "tích vé giảm giá cho khách quen",
    "phần mềm tích điểm khách hàng salon",
    "cách giữ chân khách quen của tiệm tóc",
    "quét mã QR cộng điểm cho khách",
    "nên giảm giá bao nhiêu cho khách thân thiết",
  ],
  excerpt: "Mỗi lần đến, khách được một vé. Đủ vé, khách được giảm giá. Bạn cài ba con số một lần, kích hoạt thẻ QR qua email và bấm “Cộng 1 vé” khi khách đến.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("le-tan-don-khach-tai-quay-salon-sang-trong"),
    alt: "Một lễ tân mặc vest tím tươi cười đưa tay đón một vị khách mặc áo khoác kem tại quầy đá của salon, phía sau có khách ngồi chờ",
  },
  takeaways: [
    "Chương trình chạy theo một quy tắc: **mỗi lần đến một vé, đủ vé thì được giảm giá**.",
    "Cài ba ô ở “Cài đặt chương trình”: “Số lần để được giảm giá”, “Giảm giá (%)” và “Giá thẻ (0 = miễn phí)”.",
    "Cấp thẻ chỉ cần họ tên và email của khách: bấm **“Kích hoạt và gửi QR qua email”**.",
    "Khi khách đến, quét mã QR hoặc nhập mã in trên thẻ rồi bấm **“Cộng 1 vé”**.",
    "Vé chỉ được cộng khi khách có một lượt hẹn đã diễn ra mà chưa được quét, nên số vé không vượt số lần khách thật sự đến.",
  ],
  intro: [
    "Một chương trình khách hàng thân thiết cho salon không cần phức tạp như của hãng bay hay siêu thị. Tiệm làm đẹp chỉ cần một lời hứa dễ hiểu: đến đủ số lần thì được giảm giá. Khách quen là tài sản quý nhất của salon, và lời hứa đó cho họ thêm một lý do để không thử tiệm khác.",
    "Bài viết này đi theo bài học “Thẻ tích điểm QR trong trang quản trị” của VaraaAi Academy. Bạn sẽ cài được chương trình, kích hoạt thẻ cho một khách, cộng vé khi khách đến và theo dõi ai đang gần được giảm giá.",
  ],
  sections: [
    {
      id: "chuong-trinh-chay-the-nao",
      title: "Chương trình tích điểm cho spa, tiệm nail chạy thế nào",
      blocks: [
        { p: "Trên VaraaAi, chương trình khách hàng thân thiết là mục “Thẻ tích điểm” trong trang quản trị. Dòng mô tả đầu trang tóm gọn cả quy trình: cấp thẻ tích điểm cho khách, quét QR mỗi lần đến và áp dụng ưu đãi." },
        {
          ol: [
            "Bạn đặt quy tắc một lần: đến mấy lần thì được giảm, giảm bao nhiêu phần trăm.",
            "Bạn kích hoạt thẻ cho khách. Khách nhận thẻ có mã QR qua email.",
            "Mỗi lần khách đến, bạn quét mã và cộng một vé.",
            "Khi khách đủ vé, thẻ báo có ưu đãi đang chờ. Bạn áp dụng giảm giá cho khách, rồi tiếp tục cộng vé như thường.",
          ],
        },
        { p: "Trong trang quản trị, đơn vị tích lũy được gọi là **vé**. Màn hình quét gọi tấm thẻ của khách là thẻ thành viên. Bạn có thể xem phía khách nhìn thấy gì trong bài [thẻ thành viên salon](lesson:the-thanh-vien)." },
      ],
    },
    {
      id: "dieu-kien-va-chuan-bi",
      title: "Điều kiện mở mục “Thẻ tích điểm” và những gì cần chuẩn bị",
      blocks: [
        { note: "Mục “Thẻ tích điểm” mở khi hồ sơ salon hoàn thiện từ 85%. Bạn xem con số này ở “Mức độ hoàn thiện hồ sơ” trong Cài đặt. Nếu chưa đủ, bài [hồ sơ salon online](lesson:ho-so-salon) chỉ cách hoàn thiện phần giới thiệu, logo và ảnh bìa.", kind: "info", title: "Hồ sơ từ 85%" },
        { p: "Trước khi cài, hãy quyết định ba điều sau trên giấy:" },
        {
          ul: [
            "**Khách cần đến mấy lần thì được giảm giá.** Ví dụ trong video bài học là 5 lần.",
            "**Giảm bao nhiêu phần trăm.** Ví dụ trong video là 15%.",
            "**Thẻ miễn phí hay bán.** Để 0 nếu thẻ miễn phí. Bạn cũng có thể đặt giá nếu muốn bán thẻ.",
          ],
        },
        { p: "Ngoài ra, bạn cần email của khách để gửi thẻ. Thói quen hỏi email khi khách đặt lịch hoặc thanh toán sẽ giúp việc kích hoạt thẻ nhanh hơn nhiều." },
      ],
    },
    {
      id: "ba-o-cai-dat",
      title: "Nên giảm giá bao nhiêu cho khách thân thiết: ba ô trong “Cài đặt chương trình”",
      blocks: [
        {
          table: {
            head: ["Ô", "Ý nghĩa", "Cách nghĩ khi chọn"],
            rows: [
              ["“Số lần để được giảm giá”", "Số vé khách cần có để nhận ưu đãi", "Đủ gần để một khách đến đều thấy mình với tới được"],
              ["“Giảm giá (%)”", "Mức giảm khách nhận khi đủ vé", "Đủ để khách thấy đáng công tích, và tiệm vẫn chịu được khi nhiều khách cùng đủ vé"],
              ["“Giá thẻ (0 = miễn phí)”", "Giá bán thẻ, kèm đơn vị tiền tệ", "Để 0 nếu mục tiêu là càng nhiều khách có thẻ càng tốt"],
            ],
          },
        },
        { p: "Bài học không khuyên một con số cụ thể nào, vì nó tùy vào giá dịch vụ và nhịp khách đến của từng tiệm. Một cách tự kiểm tra: hãy tính xem một khách quen bình thường của bạn mất bao lâu để đủ số vé. Nếu khoảng đó dài đến mức khách quên mất mình đang tích vé, phần thưởng đang ở quá xa." },
        { p: "Sau khi lưu, dòng tóm tắt dưới tiêu đề “Cài đặt chương trình” ghi lại quy tắc bằng một câu ngắn. Trong video, dòng đó cho biết làm 5 lần thì giảm 15% và thẻ miễn phí. Đọc lại dòng này là cách nhanh nhất để chắc mình đã nhập đúng." },
      ],
    },
    {
      id: "ve-gan-voi-luot-hen",
      title: "Vì sao vé gắn với lượt hẹn đã diễn ra",
      blocks: [
        { p: "Thẻ giấy đóng dấu có một lỗ hổng quen thuộc: ai cầm con dấu cũng đóng thêm được. Chương trình trong trang quản trị đóng lỗ hổng đó bằng một quy tắc: vé chỉ được cộng khi khách có một lượt hẹn đã diễn ra mà chưa được quét. Nhờ vậy số vé không bao giờ vượt số lần khách thật sự đến." },
        { p: "Quy tắc này kéo theo một việc cho tiệm: lượt làm của khách cần có trên lịch của salon. Tiệm nào đã [quản lý lịch hẹn](lesson:lich-hen) trên VaraaAi thì không phải làm gì thêm. Với khách ghé không hẹn trước, lượt đó cũng nên được ghi lên lịch, vì vé đi theo lượt hẹn." },
        { img: { src: img("the-thanh-vien-so-ve-cua-khach"), alt: "Thẻ thành viên của khách Nam được khoanh vàng, hiện vòng tròn 1 trên 5 vé và dòng còn 4 vé nữa để được giảm 15%", caption: "Sau khi quét, màn hình hiện thẻ của khách: đã có mấy vé và còn mấy vé nữa thì được giảm giá." } },
      ],
    },
    {
      id: "theo-doi-khach-co-the",
      title: "Theo dõi khách có thẻ và áp dụng giảm giá khi đủ vé",
      blocks: [
        { p: "Đầu trang “Thẻ tích điểm” có bốn ô số: “Khách có thẻ”, “Tổng lượt quét”, “Ưu đãi đã trao” và “Đang chờ ưu đãi”. Ô cuối cùng đáng nhìn mỗi sáng, vì nó cho biết có bao nhiêu khách đang cầm một lần giảm giá chưa dùng." },
        { img: { src: img("bon-o-so-khach-co-the-tong-luot-quet"), alt: "Bốn ô số Khách có thẻ, Tổng lượt quét, Ưu đãi đã trao và Đang chờ ưu đãi được khoanh vàng ở đầu trang Thẻ tích điểm", caption: "Bốn con số của chương trình, ngay phía trên khung “Quét thẻ khi khách đến”." } },
        { p: "Khi một khách đủ vé, thẻ báo có ưu đãi đang chờ. Bạn áp dụng giảm giá cho khách ở lần làm đó, rồi tiếp tục cộng vé như thường. Hãy báo cho khách biết ngay tại quầy rằng hôm nay họ được giảm: đó là khoảnh khắc chương trình trả công cho lòng trung thành của họ, và khách nhớ nó lâu." },
        { p: "Danh sách “Khách có thẻ” bên dưới cho xem từng khách có bao nhiêu vé và đã được quét mấy lần. Những khách chỉ còn thiếu một vé là người đáng được nhắn mời nhất. Bài [email khuyến mãi](lesson:email-marketing) có sẵn nhóm “Thành viên thẻ” để bạn gửi tin cho đúng những người đang tích vé." },
      ],
    },
    {
      id: "the-mien-phi-hay-trang-quan-tri",
      title: "Thẻ tích điểm miễn phí và thẻ trong trang quản trị khác nhau thế nào",
      blocks: [
        { p: "VaraaAi có hai cách làm thẻ tích điểm, dạy trong hai bài học khác nhau. Chúng dùng chung một ý tưởng nhưng phục vụ hai hoàn cảnh:" },
        {
          table: {
            head: ["Điểm so sánh", "Thẻ tích điểm miễn phí", "Thẻ trong trang quản trị"],
            rows: [
              ["Bắt đầu", "Vào từ cuối trang chủ, dùng thử được ngay", "Mục “Thẻ tích điểm”, mở khi hồ sơ salon từ 85%"],
              ["Đơn vị", "Dấu, bấm “Đóng 1 dấu” mỗi lần khách đến", "Vé, gắn với lượt hẹn đã diễn ra"],
              ["Phần thưởng", "Một dòng chữ bạn tự ghi", "Giảm giá theo phần trăm"],
              ["Mời bạn bè", "Bài học không nhắc đến", "Mỗi thẻ có link mời riêng"],
            ],
          },
        },
        { p: "Tiệm chưa dùng trang đặt lịch có thể bắt đầu bằng [thẻ tích điểm miễn phí](lesson:the-khach-quen). Salon đã chạy lịch hẹn trên VaraaAi thì nên dùng thẻ trong trang quản trị, vì vé đi theo lịch hẹn và khách quen có thể mang khách mới về qua link mời, như trong bài [khách dẫn khách](lesson:khach-dan-khach)." },
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Không thấy mục “Thẻ tích điểm”", "Xem “Mức độ hoàn thiện hồ sơ” trong Cài đặt. Mục này mở khi hồ sơ từ 85%"],
              ["Bấm “Cộng 1 vé” mà vé không tăng", "Vé chỉ cộng khi khách có một lượt hẹn đã diễn ra mà chưa được quét. Kiểm tra lịch hẹn của khách"],
              ["Camera không đọc được mã QR", "Nhập mã in trên thẻ vào ô bên dưới rồi bấm “Cộng 1 vé”"],
              ["Muốn bán thẻ thay vì tặng", "Nhập giá vào ô “Giá thẻ (0 = miễn phí)” rồi bấm “Lưu”"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "Các bước cài chương trình khách hàng thân thiết cho salon trên VaraaAi",
    id: "cac-buoc-cai-the-tich-diem",
    after: "dieu-kien-va-chuan-bi",
    lead: "Sáu bước dưới đây theo đúng thứ tự trong video bài học: cài một lần, rồi lặp lại hai bước cuối mỗi khi khách đến.",
    steps: [
      {
        name: "Bấm mục “Thẻ tích điểm” và mở “Cài đặt chương trình”",
        text: "Trong trang quản trị, bấm mục “Thẻ tích điểm”. Tìm phần “Cài đặt chương trình”. Nhập “Số lần để được giảm giá”, tức số lần khách cần đến, rồi nhập “Giảm giá (%)”.",
        image: { src: img("cai-dat-chuong-trinh-so-lan-de-duoc-giam-gia"), alt: "Phần Cài đặt chương trình với ô Số lần để được giảm giá ghi số 5 được khoanh vàng, bên dưới là ô Giảm giá phần trăm" },
      },
      {
        name: "Nhập “Giá thẻ (0 = miễn phí)” và bấm “Lưu”",
        text: "Để số 0 nếu thẻ miễn phí, hoặc nhập giá nếu bạn muốn bán thẻ. Bấm “Lưu”. Đọc lại dòng tóm tắt dưới tiêu đề để chắc quy tắc đúng như bạn định.",
        image: { src: img("gia-the-bang-0-la-mien-phi"), alt: "Ô Giá thẻ ghi số 0 kèm đơn vị EUR được khoanh vàng trong phần Cài đặt chương trình, bên dưới là nút Lưu và Hủy" },
      },
      {
        name: "Kích hoạt thẻ cho khách",
        text: "Ở phần “Kích hoạt thẻ cho khách”, nhập họ tên và email của khách. Ô điện thoại không bắt buộc. Bấm “Kích hoạt và gửi QR qua email”. Khách nhận ngay thẻ có mã QR trong hộp thư.",
        image: { src: img("nut-kich-hoat-va-gui-qr-qua-email"), alt: "Phần Kích hoạt thẻ cho khách đã điền tên Nam và email, nút đen Kích hoạt và gửi QR qua email được khoanh vàng" },
      },
      {
        name: "Quét thẻ khi khách đến và bấm “Cộng 1 vé”",
        text: "Mỗi lần khách đến, quét mã QR trên thẻ của khách bằng camera điện thoại, hoặc nhập mã in trên thẻ vào ô trong khung “Quét thẻ khi khách đến”. Rồi bấm “Cộng 1 vé”.",
        image: { src: img("quet-the-khi-khach-den-nut-cong-1-ve"), alt: "Khung Quét thẻ khi khách đến với ô đã nhập mã thẻ và nút màu cam Cộng 1 vé, bên dưới là danh sách Khách có thẻ" },
      },
      {
        name: "Kiểm tra thông báo “Quét thành công”",
        text: "Màn hình báo quét thành công và hiện thẻ của khách: đã có mấy vé, còn mấy vé nữa thì được giảm giá. Nói con số đó cho khách nghe, để họ biết mình đang ở đâu trên đường đến ưu đãi.",
        image: { src: img("quet-thanh-cong-da-cong-1-diem"), alt: "Thông báo Quét thành công, đã cộng 1 điểm, 1 trên 5 được khoanh vàng phía trên thẻ thành viên của khách Nam" },
      },
      {
        name: "Áp dụng giảm giá khi khách đủ vé",
        text: "Khi khách đủ vé, thẻ báo có ưu đãi đang chờ. Áp dụng giảm giá cho khách, rồi tiếp tục cộng vé như thường. Trong danh sách “Khách có thẻ”, bạn xem được từng khách có bao nhiêu vé và đã quét mấy lần.",
        image: { src: img("danh-sach-khach-co-the-va-so-ve"), alt: "Danh sách Khách có thẻ với thẻ của khách Nam được khoanh vàng, ghi 1 trên 5 vé, 1 lượt quét và đã giảm 0 lần" },
      },
    ],
  },
  faq: [
    {
      q: "Chương trình khách hàng thân thiết cho salon trên VaraaAi hoạt động thế nào?",
      a: "Mỗi lần đến salon, khách được cộng một vé trên thẻ tích điểm có mã QR. Khi đủ số vé bạn đã cài, khách được giảm giá theo phần trăm bạn đặt. Sau đó bạn tiếp tục cộng vé như thường.",
    },
    {
      q: "Vì sao không thấy mục “Thẻ tích điểm” trong trang quản trị?",
      a: "Mục “Thẻ tích điểm” mở khi hồ sơ salon hoàn thiện từ 85%. Bạn xem “Mức độ hoàn thiện hồ sơ” trong Cài đặt và bổ sung những phần còn thiếu.",
    },
    {
      q: "Khách nhận thẻ tích điểm bằng cách nào?",
      a: "Bạn nhập họ tên và email của khách ở phần “Kích hoạt thẻ cho khách”, rồi bấm “Kích hoạt và gửi QR qua email”. Khách nhận ngay thẻ có mã QR trong hộp thư.",
    },
    {
      q: "Khách đến tiệm thì cộng vé thế nào?",
      a: "Quét mã QR trên thẻ của khách bằng camera điện thoại, hoặc nhập mã in trên thẻ, rồi bấm “Cộng 1 vé”. Màn hình báo quét thành công và hiện số vé của khách.",
    },
    {
      q: "“Giá thẻ” để bằng 0 nghĩa là gì?",
      a: "Nghĩa là thẻ miễn phí. Nếu muốn bán thẻ, bạn nhập giá vào ô “Giá thẻ (0 = miễn phí)” rồi bấm “Lưu”.",
    },
    {
      q: "Có thể cộng vé cho khách nhiều hơn số lần họ đến không?",
      a: "Không. Vé chỉ được cộng khi khách có một lượt hẹn đã diễn ra mà chưa được quét. Vì vậy số vé không bao giờ vượt số lần khách thật sự đến salon.",
    },
  ],
  related: ["khach-dan-khach", "the-khach-quen", "the-qua-tang-salon", "email-marketing"],
};

export default article;
