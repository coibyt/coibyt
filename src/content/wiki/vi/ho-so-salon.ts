import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ho-so-salon/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "ho-so-salon-online-logo-anh-bia",
  lesson: "ho-so-salon",
  category: "salon",
  title: "Hồ sơ salon online: cách hoàn thiện giới thiệu, logo và ảnh bìa để khách tin tưởng đặt lịch",
  metaTitle: "Hồ sơ salon online: giới thiệu, logo, ảnh bìa đạt 85%",
  metaDescription:
    "Cách hoàn thiện hồ sơ salon trên VaraaAi: xem mức độ hoàn thiện, viết giới thiệu từ 80 ký tự, tải ảnh bìa, logo và điền mạng xã hội để đạt mốc 85%.",
  keyword: "hồ sơ salon online",
  keywords: [
    "cách viết giới thiệu salon",
    "ảnh bìa và logo cho salon",
    "mức độ hoàn thiện hồ sơ salon",
    "trang giới thiệu tiệm nail trên mạng",
    "mở khóa thẻ tích điểm VaraaAi",
    "thông tin liên hệ salon trên trang đặt lịch",
  ],
  excerpt: "Thẻ “Mức độ hoàn thiện hồ sơ” chỉ ra từng mục còn thiếu. Viết giới thiệu, tải ảnh bìa, logo, điền liên hệ là hồ sơ vượt mốc 85%.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chu-salon-cam-may-tinh-bang-trong-tiem"),
    alt: "Một phụ nữ tóc xoăn mặc áo lụa tím cầm máy tính bảng, đứng mỉm cười bên quầy đá trong salon sang trọng",
  },
  takeaways: [
    "Thẻ **“Mức độ hoàn thiện hồ sơ”** trong “Cài đặt” cho biết hồ sơ đạt bao nhiêu phần trăm và còn thiếu mục nào.",
    "Hồ sơ đạt **85%** sẽ mở khóa “Thẻ tích điểm” và “Marketing”.",
    "“Giới thiệu ngắn” nên dài **từ 80 ký tự**, vì mục mô tả salon được tính vào mức độ hoàn thiện.",
    "Ảnh bìa là thứ khách nhìn thấy đầu tiên trên trang đặt lịch, nên hãy dùng ảnh thật của tiệm, đủ sáng.",
    "Nút “Bổ sung” cạnh mỗi mục còn thiếu đưa bạn đến đúng chỗ cần điền, không phải tự tìm.",
  ],
  intro: [
    "Một hồ sơ salon online đầy đủ làm thay bạn công việc của tấm biển hiệu và người lễ tân: khách chưa từng đến tiệm nhìn ảnh bìa, đọc vài dòng giới thiệu, xem địa chỉ rồi quyết định có đặt lịch hay không. Hồ sơ trống ảnh, thiếu mô tả thì khách khó tin để giữ chỗ.",
    "Bài viết này đi theo bài học “Hồ sơ salon, logo và ảnh bìa” của VaraaAi Academy. Bạn sẽ biết đọc thẻ “Mức độ hoàn thiện hồ sơ”, điền từng phần trong trang “Cài đặt”, và đưa hồ sơ vượt mốc 85% để mở thêm công cụ giữ chân khách.",
  ],
  sections: [
    {
      id: "ho-so-day-du-giup-gi",
      title: "Hồ sơ salon đầy đủ giúp gì cho tiệm",
      blocks: [
        { p: "Ngay trên thẻ “Mức độ hoàn thiện hồ sơ”, VaraaAi ghi lý do: hồ sơ đầy đủ giúp salon nổi bật trên bản đồ tìm kiếm và khách tin tưởng đặt lịch hơn. Hai điều đó gắn với nhau. Khách tìm tiệm nail hay tiệm tóc quanh khu mình ở sẽ thấy nhiều kết quả cùng lúc, và tiệm có ảnh bìa rõ ràng, mô tả cụ thể là tiệm được bấm vào trước." },
        { p: "Có thêm một lý do rất thực tế. Khi hồ sơ đạt 85%, bạn mở khóa được “Thẻ tích điểm” và “Marketing” trong trang quản trị. Đây là các công cụ kéo khách cũ quay lại, ví dụ [thẻ tích điểm cho khách quen](lesson:the-tich-diem). Hồ sơ dưới mốc này thì chưa dùng được." },
        { img: { src: img("the-muc-do-hoan-thien-ho-so-salon"), alt: "Thẻ Mức độ hoàn thiện hồ sơ hiện 54 phần trăm, dòng Đạt 85% để mở Thẻ tích điểm và Marketing và các mục còn thiếu", caption: "Thẻ này nằm ở đầu trang “Cài đặt”. Con số phần trăm tăng dần khi bạn điền thêm từng mục." } },
      ],
    },
    {
      id: "muc-do-hoan-thien",
      title: "Mức độ hoàn thiện hồ sơ salon tính những mục nào",
      blocks: [
        { p: "Thẻ chia làm hai nhóm. Nhóm trên là các mục còn thiếu, mỗi mục có nút “Bổ sung” bên phải. Nhóm dưới là các mục đã xong, được đánh dấu tích màu xanh. Trong video bài học, những mục sau xuất hiện trên thẻ:" },
        {
          table: {
            head: ["Mục trên thẻ", "Điền ở đâu"],
            rows: [
              ["Logo salon, Ảnh bìa", "Trang “Cài đặt”, nút “Tải logo lên” và “Tải ảnh bìa lên”"],
              ["Mô tả salon (từ 80 ký tự)", "Ô “Giới thiệu ngắn” trong phần “Thông tin salon”"],
              ["Địa chỉ và vị trí trên bản đồ, Danh mục dịch vụ", "Phần “Thông tin salon”"],
              ["Số điện thoại liên hệ, Website hoặc mạng xã hội", "Phần “Liên hệ & mạng xã hội”"],
              ["Giờ mở cửa", "Mục “Giờ mở cửa” của trang quản trị"],
              ["Ít nhất 1 dịch vụ, Ít nhất 1 nhân viên", "Mục “Dịch vụ” và mục “Nhân viên”"],
              ["Chính sách hủy lịch, Thông tin xuất hóa đơn", "Trang “Cài đặt”, phần tùy chọn và phần thanh toán"],
            ],
          },
        },
        { p: "Bảng cho thấy hồ sơ rộng hơn phần ảnh và chữ. Thẻ đếm cả những việc bạn làm ở mục khác, như [thêm dịch vụ](lesson:dich-vu), [đặt giờ mở cửa](lesson:gio-mo-cua) hay [viết chính sách hủy lịch](lesson:thanh-toan-chinh-sach). Vì vậy nếu bạn làm lần lượt các bài học của khóa đầu tiên, con số phần trăm sẽ tự tăng theo." },
      ],
    },
    {
      id: "viet-gioi-thieu-ngan",
      title: "Cách viết giới thiệu salon ngắn mà khách muốn đặt",
      blocks: [
        { p: "Đoạn “Giới thiệu ngắn” hiển thị ngay dưới tên salon trên trang công khai, nên nó là những dòng chữ đầu tiên khách đọc về tiệm. Bài học khuyên viết từ 80 ký tự trở lên. Con số đó là mức tối thiểu để mục này được tính, không phải độ dài lý tưởng." },
        { p: "Một đoạn giới thiệu tốt trả lời những câu khách đang tự hỏi: tiệm chuyên làm gì, nằm ở khu nào, có gì khiến họ nên chọn tiệm này. Hãy viết bằng những chi tiết thật của tiệm bạn." },
        {
          ul: [
            "**Nên viết:** dịch vụ thế mạnh, khu vực, ngôn ngữ nhân viên nói được, tiệm nhận khách theo lịch hẹn hay nhận cả khách vãng lai.",
            "**Nên tránh:** những câu tiệm nào cũng viết được như “chất lượng hàng đầu, giá cả hợp lý”. Khách đọc xong không biết thêm gì về bạn.",
          ],
        },
        { note: "Ví dụ về cách viết: “Tiệm nail nhỏ gần ga trung tâm, chuyên sơn gel và nối móng form. Nhận khách theo lịch hẹn, nhân viên nói tiếng Việt và tiếng Anh.” Hai câu như vậy đã vượt 80 ký tự và cho khách đủ lý do để xem tiếp bảng dịch vụ.", kind: "tip", title: "Mẫu để bạn sửa theo tiệm mình" },
      ],
    },
    {
      id: "anh-bia-va-logo",
      title: "Chọn ảnh bìa và logo cho salon",
      blocks: [
        { p: "Trên trang “Cài đặt”, dòng chú thích dưới từng mục nói rõ ảnh dùng vào đâu. Ảnh bìa hiển thị ở đầu trang salon và trong kết quả tìm kiếm. Logo là một ảnh vuông, làm biểu tượng của salon." },
        { p: "Vì ảnh bìa xuất hiện cả trong kết quả tìm kiếm, nó cạnh tranh trực tiếp với ảnh của các tiệm khác. Ảnh chụp không gian thật của tiệm, đủ sáng và gọn gàng, thuyết phục hơn ảnh lấy trên mạng, vì khách đến nơi sẽ thấy đúng thứ họ đã xem. Với logo, hãy chọn hình đơn giản, vẫn nhận ra được khi bị thu nhỏ thành một ô vuông bé." },
        { note: "Nếu chưa có ảnh ưng ý, hãy chụp tiệm vào lúc vừa dọn xong và có ánh sáng tự nhiên, rồi tải lên trước. Bạn thay ảnh khác được bất cứ lúc nào bằng chính nút “Tải ảnh bìa lên”.", kind: "tip", title: "Chưa có ảnh đẹp" },
      ],
    },
    {
      id: "lien-he-mang-xa-hoi",
      title: "Thông tin liên hệ và mạng xã hội của salon",
      blocks: [
        { p: "Phần “Liên hệ & mạng xã hội” hiển thị trên trang công khai của salon để khách liên hệ trực tiếp. Bài học liệt kê các ô: số điện thoại, email, website, Facebook, Instagram và TikTok." },
        { img: { src: img("dien-facebook-instagram-tiktok-cua-salon"), alt: "Các ô Facebook, Instagram và TikTok trong phần Liên hệ và mạng xã hội của trang Cài đặt được khoanh vàng", caption: "Dán đúng đường dẫn trang của tiệm vào từng ô. Điền càng đủ, khách càng dễ tìm thấy bạn." } },
        { p: "Chỉ điền những kênh tiệm đang dùng thật. Một trang Instagram được cập nhật ảnh móng, ảnh tóc mới giúp khách thấy tay nghề của tiệm. Một đường dẫn tới trang bỏ trống nhiều tháng thì gây ấn tượng ngược lại. Số điện thoại nên là số có người nghe trong giờ mở cửa." },
      ],
    },
    {
      id: "sau-khi-dat-85",
      title: "Sau khi hồ sơ đạt 85%",
      blocks: [
        { p: "Quay lại đầu trang “Cài đặt” để xem con số mới trên thẻ. Nếu vẫn còn mục có nút “Bổ sung”, bạn bấm vào để làm nốt. Vượt mốc 85% là “Thẻ tích điểm” và “Marketing” được mở khóa." },
        { p: "Lúc này trang salon đã đủ ảnh, đủ chữ để đem đi giới thiệu. Bước tiếp theo hợp lý là [chia sẻ link đặt lịch](lesson:chia-se-link) lên các kênh bạn vừa điền, hoặc [tạo poster mã QR](lesson:poster-qr) để dán ở tiệm." },
      ],
    },
  ],
  howTo: {
    title: "Các bước hoàn thiện hồ sơ salon online trên VaraaAi",
    id: "cac-buoc-hoan-thien-ho-so",
    after: "muc-do-hoan-thien",
    lead: "Mọi thao tác dưới đây nằm trong mục “Cài đặt” của trang quản trị. Bạn làm trên điện thoại hay máy tính đều được.",
    steps: [
      {
        name: "Mở “Cài đặt” và đọc thẻ mức độ hoàn thiện",
        text: "Vào mục “Cài đặt”. Thẻ “Mức độ hoàn thiện hồ sơ” ở đầu trang cho biết hồ sơ đang đạt bao nhiêu phần trăm và còn thiếu những mục nào. Đọc danh sách này trước để biết mình cần chuẩn bị ảnh hay chữ.",
      },
      {
        name: "Bấm “Bổ sung” cạnh mục còn thiếu",
        text: "Mỗi mục còn thiếu có nút “Bổ sung” ở bên phải. Bấm vào, trang đưa bạn đến đúng chỗ cần điền. Cách này nhanh hơn tự kéo tìm từng phần trong trang “Cài đặt”.",
        image: { src: img("danh-sach-muc-con-thieu-va-nut-bo-sung"), alt: "Danh sách các mục cần hoàn thiện như Logo salon, Ảnh bìa, Mô tả salon, mỗi mục có nút Bổ sung ở bên phải" },
      },
      {
        name: "Điền “Thông tin salon”",
        text: "Ở phần “Thông tin salon”, nhập “Tên salon” và “Giới thiệu ngắn”, nên viết từ 80 ký tự trở lên. Tiếp theo nhập “Địa chỉ”, “Thành phố” và “Quốc gia”. Kiểm tra ghim trên bản đồ có nằm đúng vị trí tiệm không, vì khách sẽ dựa vào đó để tìm đường.",
        image: { src: img("gioi-thieu-ngan-va-dia-chi-salon-tren-ban-do"), alt: "Ô Giới thiệu ngắn được khoanh vàng, bên dưới là ô Địa chỉ và bản đồ có ghim vị trí của salon" },
      },
      {
        name: "Chọn danh mục dịch vụ rồi bấm “Lưu”",
        text: "Đánh dấu danh mục dịch vụ của tiệm, ví dụ nail và móng, cắt tóc, mi. Khách tìm salon theo dịch vụ, nên danh mục đúng giúp tiệm xuất hiện với đúng người đang cần. Xong thì bấm “Lưu”.",
        image: { src: img("chon-danh-muc-dich-vu-va-bam-luu"), alt: "Các ô chọn danh mục dịch vụ như Spa và massage, Nail và móng, Cắt tóc, Mi và chân mày, phía dưới là nút Lưu" },
      },
      {
        name: "Tải ảnh bìa lên",
        text: "Kéo xuống mục “Ảnh bìa” và bấm “Tải ảnh bìa lên”, rồi chọn ảnh từ máy. Ảnh này hiện ở đầu trang salon và trong kết quả tìm kiếm, là thứ khách nhìn thấy đầu tiên.",
        image: { src: img("tai-anh-bia-salon-len"), alt: "Mục Ảnh bìa đang ghi Chưa có ảnh bìa, bên dưới là nút Tải ảnh bìa lên được khoanh vàng" },
      },
      {
        name: "Tải logo lên",
        text: "Ngay bên dưới là mục “Logo”. Bấm “Tải logo lên” và chọn một ảnh vuông. Khi chưa có logo, ô này chỉ hiện chữ cái đầu của tên salon.",
        image: { src: img("tai-logo-salon-len"), alt: "Mục Logo với ô vuông hiện chữ L và nút Tải logo lên được khoanh vàng, phía dưới là phần Liên hệ và mạng xã hội" },
      },
      {
        name: "Điền “Liên hệ & mạng xã hội”",
        text: "Ở phần “Liên hệ & mạng xã hội”, điền số điện thoại và email của tiệm, sau đó là website, Facebook, Instagram, TikTok nếu có. Những thông tin này hiện trên trang công khai để khách liên hệ thẳng với bạn.",
        image: { src: img("dien-so-dien-thoai-email-lien-he-salon"), alt: "Phần Liên hệ và mạng xã hội với ô Số điện thoại và Email được khoanh vàng, bên dưới là ô Website và WhatsApp" },
      },
    ],
  },
  faq: [
    {
      q: "Hồ sơ salon cần đạt bao nhiêu phần trăm để mở Thẻ tích điểm và Marketing?",
      a: "85%. Thẻ “Mức độ hoàn thiện hồ sơ” trong trang “Cài đặt” ghi rõ mốc này và cho biết hồ sơ của bạn đang ở mức nào.",
    },
    {
      q: "Giới thiệu ngắn của salon nên dài bao nhiêu?",
      a: "Từ 80 ký tự trở lên. Mục “Mô tả salon (từ 80 ký tự)” được tính vào mức độ hoàn thiện hồ sơ, nên đoạn ngắn hơn sẽ chưa được tính. Hai câu cụ thể về dịch vụ và khu vực của tiệm là đủ.",
    },
    {
      q: "Ảnh bìa và logo của salon hiện ở đâu?",
      a: "Ảnh bìa hiển thị ở đầu trang salon và trong kết quả tìm kiếm. Logo là một ảnh vuông, hiển thị làm biểu tượng của salon.",
    },
    {
      q: "Làm sao biết hồ sơ salon còn thiếu gì?",
      a: "Vào “Cài đặt” và xem thẻ “Mức độ hoàn thiện hồ sơ”. Thẻ liệt kê từng mục còn thiếu, kèm nút “Bổ sung” để đến đúng chỗ cần điền.",
    },
    {
      q: "Có bắt buộc điền đủ Facebook, Instagram, TikTok không?",
      a: "Bạn chỉ nên điền những kênh tiệm đang dùng. Thẻ mức độ hoàn thiện có một mục là “Website hoặc mạng xã hội”, và điền càng đủ thì khách càng dễ tìm thấy tiệm.",
    },
    {
      q: "Hoàn thiện hồ sơ salon có mất phí không?",
      a: "Không. VaraaAi miễn phí cho chủ salon, và mọi phần của hồ sơ như giới thiệu, ảnh bìa, logo, thông tin liên hệ đều điền trong trang “Cài đặt” của tài khoản salon.",
    },
  ],
  related: ["dang-ky-salon", "dich-vu", "gio-mo-cua", "thanh-toan-chinh-sach"],
};

export default article;
