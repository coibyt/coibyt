import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/website-salon/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "lam-website-cho-salon-mien-phi",
  lesson: "website-salon",
  category: "marketing",
  title: "Làm website cho salon miễn phí: 8 bước tạo trang web riêng cho tiệm nail, tóc, spa có nút đặt lịch",
  metaTitle: "Làm website cho salon miễn phí: 8 bước, có nút đặt lịch",
  metaDescription:
    "Hướng dẫn chủ tiệm nail, tóc, mi, spa tự làm website riêng trên VaraaAi: chọn bộ màu, viết phần đầu trang, bật tắt từng phần, xem trước rồi xuất bản và gửi link.",
  keyword: "làm website cho salon miễn phí",
  keywords: [
    "website riêng cho salon",
    "tạo website cho tiệm nail",
    "làm website spa không cần thuê thiết kế",
    "website salon tóc có đặt lịch online",
    "trang landing cho salon",
    "cách xuất bản website salon",
    "nên viết gì trên trang chủ website salon",
  ],
  excerpt: "Chọn bộ màu, viết vài dòng ở phần đầu trang, bật các phần muốn hiện rồi bật “Xuất bản”. Dịch vụ, đội ngũ và đánh giá tự lấy từ dữ liệu sẵn có.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-toc-tao-kieu-cho-khach-trong-salon-co-dien"),
    alt: "Một thợ tóc mặc áo vest trắng đang tạo kiểu cho khách nữ tóc vàng ngồi cạnh cửa sổ cao trong salon có gương mạ vàng và đèn chùm",
  },
  takeaways: [
    "Website của salon nằm ở mục **“Trang landing”** trong trang quản trị. Bạn tự làm được, không cần thuê người thiết kế.",
    "Chọn một phong cách ở **“Bộ màu của website”** là cả website đổi màu ngay.",
    "Các phần có nhãn **“Tự động”** (dịch vụ, đội ngũ, đánh giá) lấy dữ liệu sẵn có của salon, bạn không phải nhập lại.",
    "Khi còn là **“Bản nháp”**, khách chưa xem được. Chỉ sau khi bật **“Xuất bản”** thì ai cũng mở được.",
    "Bấm “Sao chép link” để gửi địa chỉ website cho khách, hoặc gắn lên Facebook, Instagram và Google Maps.",
  ],
  intro: [
    "Nhiều chủ tiệm muốn làm website cho salon miễn phí nhưng dừng lại ở câu hỏi đầu tiên: ai sẽ dựng trang, và mỗi lần đổi giá thì ai sửa. Với một salon đã dùng VaraaAi, câu trả lời nằm sẵn trong trang quản trị. Dịch vụ, nhân viên và đánh giá bạn đã có được ghép thành một trang web có nút đặt lịch, và bạn chỉ còn chọn màu rồi viết vài dòng giới thiệu.",
    "Bài viết này đi theo bài học “Website riêng cho salon” của VaraaAi Academy. Bạn sẽ tự chọn được bộ màu, viết phần đầu trang, quyết định phần nào hiện trên trang chủ, rồi xuất bản và gửi link website cho khách.",
  ],
  sections: [
    {
      id: "vi-sao-can-website-rieng",
      title: "Vì sao tiệm nail, tóc, spa nên có website riêng cho salon",
      blocks: [
        { p: "Khách mới thường xem tiệm trên mạng trước khi bước qua cửa. Họ muốn biết tiệm trông ra sao, làm những gì, giá bao nhiêu và người khác nói gì. Một trang mạng xã hội trả lời được một phần, nhưng thông tin nằm rải rác trong các bài đăng cũ. Website gom tất cả vào một địa chỉ duy nhất." },
        { p: "Website trong bài học này có tên salon, lời giới thiệu, bảng dịch vụ kèm giá, đội ngũ, đánh giá và nút “Đặt lịch ngay” luôn ở trước mắt. Khách đọc xong là đặt được lịch ngay trên đó, không phải chuyển sang gọi điện hay nhắn tin." },
        { img: { src: img("website-salon-khach-thay-tren-dien-thoai"), alt: "Website của salon Lumi Beauty Paris trên điện thoại với tiêu đề lớn được khoanh vàng, đoạn giới thiệu và nút Đặt lịch ngay màu vàng đồng", caption: "Website khách nhìn thấy: tên salon ở trên cùng, tiêu đề, lời giới thiệu và nút “Đặt lịch ngay”." } },
        { p: "Bạn không cần thuê ai làm. Mọi thao tác nằm trong một trang duy nhất của trang quản trị, và VaraaAi miễn phí cho chủ salon." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi tạo website cho tiệm nail, tóc, spa",
      blocks: [
        { p: "Phần lớn nội dung website được lấy từ những gì salon đã có. Trước khi mở mục “Trang landing”, hãy kiểm tra ba thứ có sẵn và chuẩn bị ba thứ sẽ tự viết:" },
        {
          table: {
            head: ["Thứ cần có", "Lấy từ đâu"],
            rows: [
              ["Dịch vụ kèm giá", "Đã nhập ở mục “Dịch vụ”. Website tự lấy"],
              ["Đội ngũ: ảnh, tên, chức danh", "Lấy từ danh sách nhân viên của salon"],
              ["Đánh giá của khách", "Các đánh giá đã được duyệt, kèm điểm trung bình"],
              ["Một tiêu đề và vài dòng giới thiệu", "Bạn tự viết ở “Phần đầu trang”"],
              ["Ảnh trình chiếu, tối đa 5 tấm", "Ảnh không gian tiệm hoặc tác phẩm đẹp, bạn tự tải lên"],
              ["Chữ trên nút bấm", "Bạn tự đặt ở ô “Nhãn nút”, ví dụ Đặt lịch ngay"],
            ],
          },
        },
        { p: "Nếu menu dịch vụ còn trống hoặc nhân viên chưa có ảnh, nên làm hai việc đó trước. Xem bài [menu dịch vụ salon](lesson:dich-vu) và bài [quản lý nhân viên salon](lesson:nhan-vien). Thứ tự dịch vụ cũng đáng xem lại, vì phần “Dịch vụ nổi bật” hiện 6 dịch vụ đầu tiên theo đúng thứ tự bạn đã kéo thả." },
      ],
    },
    {
      id: "chon-bo-mau",
      title: "Chọn bộ màu website hợp với phong cách của tiệm",
      blocks: [
        { p: "“Bộ màu của website” có năm phong cách. Bạn bấm vào một bộ là cả website đổi màu ngay, nên cứ thử từng bộ rồi xem cái nào giống tiệm mình nhất. Mỗi bộ màu có một dòng mô tả ngắn ngay trên màn hình:" },
        {
          table: {
            head: ["Bộ màu", "Mô tả trên màn hình"],
            rows: [
              ["Hồng phấn", "Nữ tính, mềm mại"],
              ["Champagne", "Thanh lịch, ấm áp"],
              ["Đen & Vàng", "Sang trọng, quyền lực"],
              ["Ngọc lục bảo", "Tự nhiên, cao cấp"],
              ["Oải hương", "Hiện đại, tinh tế"],
            ],
          },
        },
        { img: { src: img("nam-bo-mau-website-hong-phan-champagne-den-vang"), alt: "Danh sách bộ màu của website gồm Hồng phấn, Champagne, Đen & Vàng, Ngọc lục bảo và Oải hương, ba bộ phía dưới được khoanh vàng" } },
        { note: "Hãy chọn bộ màu gần với màu thật của tiệm: màu tường, màu ghế, màu logo. Khách xem website rồi bước vào tiệm sẽ thấy đúng nơi họ vừa xem trên điện thoại.", kind: "tip", title: "Chọn theo tiệm, không theo sở thích" },
      ],
    },
    {
      id: "viet-phan-dau-trang",
      title: "Nên viết gì ở phần đầu trang chủ website salon",
      blocks: [
        { p: "“Phần đầu trang” là ấn tượng đầu tiên của khách. Nó gồm bố cục, ba ô chữ, ảnh trình chiếu và một nút bấm. Ba ô chữ làm ba việc khác nhau:" },
        {
          table: {
            head: ["Ô", "Viết gì", "Ví dụ trong video bài học"],
            rows: [
              ["“Dòng chữ nhỏ trên tiêu đề”", "Loại hình và nơi tiệm mở cửa", "Nail & Lash Studio · Paris"],
              ["“Tiêu đề”", "Một câu ngắn về điều tiệm mang lại", "Vẻ đẹp tinh tế giữa lòng Paris"],
              ["“Nội dung”", "Hai câu: tiệm làm gì, không gian ra sao, đặt lịch thế nào", "Nail, mi và chăm sóc da trong không gian sang trọng, yên tĩnh. Đặt lịch online chỉ trong một phút."],
            ],
          },
        },
        { p: "Phần “Bố cục” có bốn lựa chọn: “Ảnh tràn màn hình”, “Ảnh bên phải”, “Ảnh bên trái” và “Chỉ chữ”. Tiệm có ảnh không gian đẹp thì nên để ảnh chiếm chỗ. Tiệm chưa có ảnh ưng ý có thể bắt đầu bằng “Chỉ chữ” rồi đổi sau." },
        { p: "“Ảnh trình chiếu” nhận tối đa 5 ảnh, và các ảnh tự động chuyển đổi trên trang chủ. Theo chú thích trên màn hình, chưa tải ảnh nào thì trang chủ hiện ảnh mặc định. Ảnh thật của tiệm vẫn đáng tin hơn, nên hãy thay khi có." },
        { p: "Cuối phần này là ô “Nhãn nút”, tức dòng chữ trên nút bấm, và ô “Nút dẫn tới”. Trong video, nút ghi “Đặt lịch ngay” và dẫn tới “Trang đặt lịch”. Nhớ bấm “Lưu” trước khi kéo xuống các phần bên dưới." },
      ],
    },
    {
      id: "cac-phan-tren-trang-chu",
      title: "Các phần trên trang chủ: phần nào tự động, phần nào tự nhập",
      blocks: [
        { p: "Bên dưới phần đầu trang là danh sách các phần khác của trang chủ. Mỗi phần có một công tắc bên phải để bật hoặc tắt. Phần có nhãn “Tự động” lấy sẵn dữ liệu của salon." },
        {
          table: {
            head: ["Phần", "Hiện gì", "Dữ liệu"],
            rows: [
              ["Giới thiệu", "Câu chuyện và điểm khác biệt của salon", "Bạn tự viết"],
              ["Dịch vụ nổi bật", "6 dịch vụ đầu tiên theo thứ tự bạn đã kéo thả", "Tự động"],
              ["Điểm nổi bật", "Thẻ ưu đãi, combo hay lý do khách nên chọn salon", "Bạn tự viết"],
              ["Thư viện ảnh", "Tối đa 8 ảnh không gian salon và tác phẩm đẹp nhất", "Bạn tự tải ảnh"],
              ["Đội ngũ", "Ảnh, tên và chức danh từ danh sách nhân viên", "Tự động"],
              ["Đánh giá khách hàng", "Các đánh giá đã được duyệt, kèm điểm trung bình", "Tự động"],
            ],
          },
        },
        { img: { src: img("phan-doi-ngu-va-danh-gia-co-nhan-tu-dong"), alt: "Danh sách các phần Điểm nổi bật, Thư viện ảnh, Đội ngũ và Đánh giá khách hàng, mỗi phần có công tắc bên phải, hai phần cuối có nhãn Tự động", caption: "Phần “Đội ngũ” và “Đánh giá khách hàng” có nhãn “Tự động”, kèm số mục đang có." } },
        { p: "Công tắc giúp bạn tránh một lỗi hay gặp ở website tự làm: những phần trống. Tiệm mới chưa có đánh giá thì tắt phần “Đánh giá khách hàng” và bật lại khi đã có. Tiệm chỉ có một mình bạn làm có thể tắt “Đội ngũ” nếu thấy không cần." },
      ],
    },
    {
      id: "ban-nhap-va-xuat-ban",
      title: "Bản nháp, xuất bản và gửi link website cho khách",
      blocks: [
        { p: "Website mới ở trạng thái “Bản nháp”. Lúc này khách chưa xem được, chỉ bạn xem được qua nút “Xem trước”. Nhờ vậy bạn sửa bao lâu cũng được mà không ai thấy một trang còn dang dở." },
        { p: "Khi đã ưng ý, bạn bật công tắc “Xuất bản”. Nhãn trạng thái đổi thành “Đang hoạt động” và nút “Xem trước” đổi thành “Xem website”. Từ lúc này ai có link cũng mở được." },
        { img: { src: img("website-dang-hoat-dong-nut-sao-chep-link"), alt: "Thẻ Website của salon ở trạng thái Đang hoạt động, nút Sao chép link được khoanh vàng, bên dưới là nút Xem website và công tắc Xuất bản đang bật" } },
        { p: "Bấm “Sao chép link” để lấy địa chỉ website. Bạn gửi link này cho khách, hoặc gắn lên Facebook, Instagram và Google Maps của tiệm, để người tìm thấy tiệm ở đâu cũng về được cùng một trang. Các cách đưa link đến khách khác có trong bài [link đặt lịch online cho salon](lesson:chia-se-link) và bài [mã QR đặt lịch cho salon](lesson:poster-qr)." },
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Gửi link cho khách nhưng khách không mở được", "Xem công tắc “Xuất bản” đã bật chưa. Khi còn “Bản nháp”, khách chưa xem được"],
              ["Bảng dịch vụ trên website hiện sai thứ tự", "Kéo thả lại thứ tự ở mục “Dịch vụ”. Website hiện 6 dịch vụ đầu tiên"],
              ["Một phần trên trang chủ còn trống", "Tắt công tắc của phần đó, bật lại khi có nội dung"],
              ["Muốn đổi màu cả website", "Chọn bộ màu khác ở “Bộ màu của website”"],
            ],
          },
        },
      ],
    },
  ],
  howTo: {
    title: "Các bước làm website cho salon trên VaraaAi",
    id: "cac-buoc-lam-website-salon",
    after: "chuan-bi",
    lead: "Tám bước dưới đây đi từ trên xuống dưới của mục “Trang landing”, đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Mở mục “Trang landing”",
        text: "Trong trang quản trị, bấm mục “Trang landing”. Thẻ trên cùng ghi “Website của salon” kèm trạng thái “Bản nháp”, nghĩa là khách chưa xem được. Mọi thay đổi từ đây cho đến lúc xuất bản chỉ có bạn nhìn thấy.",
      },
      {
        name: "Chọn “Bộ màu của website”",
        text: "Ở “Bộ màu của website”, bấm vào một phong cách: Hồng phấn, Champagne, Đen và Vàng, Ngọc lục bảo hay Oải hương. Cả website đổi màu ngay. Trong video bài học, bộ “Champagne” được chọn.",
        image: { src: img("chon-bo-mau-cua-website-salon"), alt: "Mục Bộ màu của website được khoanh vàng, bên dưới là các ô phong cách Hồng phấn, Champagne đang được chọn, Đen & Vàng và Ngọc lục bảo" },
      },
      {
        name: "Chọn bố cục cho “Phần đầu trang”",
        text: "Kéo xuống “Phần đầu trang” và chọn một bố cục: ảnh tràn màn hình, ảnh bên phải, ảnh bên trái hoặc chỉ chữ. Đây là thứ khách thấy đầu tiên khi mở website, nên hãy chọn bố cục hợp với ảnh bạn đang có.",
        image: { src: img("chon-bo-cuc-phan-dau-trang-website"), alt: "Bốn lựa chọn bố cục Ảnh tràn màn hình, Ảnh bên phải, Ảnh bên trái và Chỉ chữ, bên dưới là các ô Dòng chữ nhỏ trên tiêu đề, Tiêu đề và Nội dung" },
      },
      {
        name: "Điền dòng chữ nhỏ, “Tiêu đề” và “Nội dung”",
        text: "Gõ dòng chữ nhỏ phía trên tiêu đề, rồi “Tiêu đề” và “Nội dung” giới thiệu. Viết ngắn, nói rõ tiệm làm gì và ở đâu. Khách đọc phần này trong vài giây rồi quyết định có kéo xuống xem tiếp hay không.",
        image: { src: img("dien-tieu-de-va-noi-dung-gioi-thieu-salon"), alt: "Ba ô Dòng chữ nhỏ trên tiêu đề, Tiêu đề và Nội dung đã điền lời giới thiệu salon, phía dưới là mục Ảnh trình chiếu tối đa 5 ảnh" },
      },
      {
        name: "Thêm “Ảnh trình chiếu”, đặt “Nhãn nút” rồi bấm “Lưu”",
        text: "Tải lên tối đa năm ảnh trình chiếu. Đặt chữ trên nút ở ô “Nhãn nút”, ví dụ Đặt lịch ngay, rồi bấm “Lưu” để ghi lại phần đầu trang trước khi kéo xuống tiếp.",
        image: { src: img("them-anh-trinh-chieu-va-nhan-nut-dat-lich"), alt: "Các ô tải ảnh trình chiếu với một ảnh salon đã tải lên, bên dưới là ô Nhãn nút ghi Đặt lịch ngay, ô Nút dẫn tới và nút Lưu" },
      },
      {
        name: "Bật hoặc tắt “Các phần trên trang chủ”",
        text: "Ở “Các phần trên trang chủ”, gạt công tắc bên phải từng phần: Giới thiệu, Dịch vụ nổi bật, Điểm nổi bật, Thư viện ảnh, Đội ngũ, Đánh giá khách hàng. Phần có nhãn “Tự động” lấy sẵn dữ liệu của salon, bạn không phải nhập lại.",
        image: { src: img("bat-tat-cac-phan-tren-trang-chu-website"), alt: "Danh sách các phần trên trang chủ với phần Dịch vụ nổi bật có nhãn Tự động được khoanh vàng, mỗi phần có một công tắc bên phải" },
      },
      {
        name: "Bấm “Xem trước” để kiểm tra",
        text: "Quay lên thẻ “Website của salon” và bấm “Xem trước”. Đọc lại tiêu đề, xem ảnh, kéo hết trang để chắc không còn phần nào trống. Lúc này website vẫn là bản nháp.",
        image: { src: img("nut-xem-truoc-va-cong-tac-xuat-ban-website"), alt: "Thẻ Website của salon ở trạng thái Bản nháp, khách chưa xem được, với nút Xem trước được khoanh vàng và công tắc Xuất bản đang tắt" },
      },
      {
        name: "Bật “Xuất bản” và bấm “Sao chép link”",
        text: "Ưng ý rồi thì bật công tắc “Xuất bản”. Website của salon chính thức hoạt động và ai cũng mở được. Bấm “Sao chép link” để gửi địa chỉ website cho khách, hoặc gắn lên Facebook, Instagram và Google Maps.",
        image: { src: img("bang-dich-vu-kem-gia-tren-website-salon"), alt: "Phần Dịch vụ nổi bật trên website salon đã xuất bản, liệt kê Gel manicure, Gel pedicure, Classic lashes và Lash lift & tint kèm số phút và giá", caption: "Sau khi xuất bản, khách thấy bảng dịch vụ kèm giá lấy từ menu của salon." },
      },
    ],
  },
  faq: [
    {
      q: "Làm website cho salon trên VaraaAi có cần thuê người thiết kế không?",
      a: "Không. Bạn tự làm trong mục “Trang landing” của trang quản trị: chọn bộ màu, viết phần đầu trang, bật các phần muốn hiện rồi xuất bản. Dịch vụ, đội ngũ và đánh giá được lấy sẵn từ dữ liệu của salon.",
    },
    {
      q: "Khách xem được website của salon từ khi nào?",
      a: "Chỉ sau khi bạn bật công tắc “Xuất bản”. Trước đó website là “Bản nháp”, khách chưa xem được và chỉ bạn xem được qua nút “Xem trước”.",
    },
    {
      q: "Nhãn “Tự động” ở các phần trên trang chủ nghĩa là gì?",
      a: "Phần có nhãn “Tự động” tự lấy dữ liệu sẵn có của salon. Dịch vụ, đội ngũ và đánh giá được lấy từ trang quản trị, nên bạn không phải nhập lại lần nữa.",
    },
    {
      q: "Đổi màu cho cả website salon ở đâu?",
      a: "Ở “Bộ màu của website” trong mục “Trang landing”. Bạn bấm chọn một phong cách, ví dụ “Champagne”, là cả website đổi màu ngay.",
    },
    {
      q: "Website salon thêm được bao nhiêu ảnh trình chiếu?",
      a: "Phần đầu trang nhận tối đa 5 ảnh trình chiếu, và các ảnh tự động chuyển đổi trên trang chủ. Nếu chưa tải ảnh nào, trang chủ hiện ảnh mặc định.",
    },
    {
      q: "Làm sao gửi địa chỉ website salon cho khách?",
      a: "Sau khi xuất bản, bấm “Sao chép link” trên thẻ “Website của salon”. Bạn gửi link đó cho khách, hoặc gắn lên Facebook, Instagram và Google Maps của tiệm.",
    },
  ],
  related: ["chia-se-link", "fanpage", "bang-gia", "ho-so-salon"],
};

export default article;
