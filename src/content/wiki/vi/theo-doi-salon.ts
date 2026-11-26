import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/theo-doi-salon/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "theo-doi-salon-nhan-uu-dai-mua-san-pham",
  lesson: "theo-doi-salon",
  category: "booking",
  title: "Theo dõi salon trên VaraaAi: xem ưu đãi trong bảng tin và mua sản phẩm của salon",
  metaTitle: "Theo dõi salon: xem ưu đãi, mẫu mới và mua sản phẩm",
  metaDescription:
    "Cách theo dõi salon trên VaraaAi để thấy ưu đãi và mẫu mới trong Bảng tin, cùng các bước mua sản phẩm của salon: giỏ hàng, cách thanh toán, nhận tại tiệm.",
  keyword: "theo dõi salon",
  keywords: [
    "nhận ưu đãi từ salon quen",
    "bảng tin salon làm đẹp",
    "mua sản phẩm của salon online",
    "mua dầu dưỡng móng ở tiệm nail",
    "bỏ theo dõi salon",
    "khuyến mãi tiệm nail gần đây",
  ],
  excerpt: "Bấm “Theo dõi” để ưu đãi và mẫu mới của salon quen hiện trong “Bảng tin”, và đặt mua sản phẩm chăm sóc của salon để đến tiệm nhận.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-xem-bang-tin-salon-tren-dien-thoai"),
    alt: "Cô gái tóc dài gợn sóng mặc áo len kem ngồi trên sofa cạnh cửa sổ, mỉm cười xem điện thoại",
  },
  takeaways: [
    "Nút **“Theo dõi”** nằm trên trang của salon, dưới nút “Đặt lịch”. Bấm xong, nút đổi thành “Đang theo dõi”.",
    "Bài viết mới của các salon bạn theo dõi hiện trong **“Bảng tin”**: bấm vào tên bạn ở góc trên để mở.",
    "Salon có bán sản phẩm thì trên trang salon có nút **“Sản phẩm”** dẫn đến cửa hàng của tiệm.",
    "Khi đặt hàng, bạn chọn một trong ba cách thanh toán: tại salon, chuyển khoản, hoặc trao đổi với salon.",
    "Sản phẩm được **nhận tại salon**. Salon liên hệ để hẹn thời gian bạn đến lấy.",
  ],
  intro: [
    "Khi đã có một tiệm ruột, bạn muốn biết sớm lúc tiệm có ưu đãi, có mẫu mới hay có thông báo gì. Theo dõi salon trên VaraaAi là cách làm việc đó bằng một lần bấm: từ lúc ấy, bài viết mới của tiệm tự hiện trong bảng tin của bạn.",
    "Bài viết đi theo bài học “Theo dõi salon, bảng tin và mua sản phẩm” trong VaraaAi Academy. Bạn sẽ biết bấm theo dõi ở đâu, đọc bảng tin thế nào, và đặt mua sản phẩm chăm sóc mà salon bán, từ giỏ hàng đến lúc đến tiệm nhận.",
  ],
  sections: [
    {
      id: "theo-doi-de-lam-gi",
      title: "Theo dõi salon để làm gì",
      blocks: [
        { p: "Theo dõi không ràng buộc bạn điều gì. Nó không đặt lịch thay bạn và không mất phí. Thứ duy nhất thay đổi là nội dung trong “Bảng tin”: những gì salon đăng sẽ đến với bạn mà bạn không phải vào từng trang để xem." },
        { p: "Việc này hợp với ba kiểu khách:" },
        {
          ul: [
            "Người có **tiệm quen** và không muốn bỏ lỡ đợt giảm giá của tiệm.",
            "Người đang **cân nhắc vài salon**, muốn xem mỗi tiệm đăng những mẫu gì trước khi chọn.",
            "Người hay **mua sản phẩm chăm sóc** tại tiệm và muốn biết khi có món mới.",
          ],
        },
        { note: "Nếu bạn [cài app VaraaAi](lesson:cai-app) lên điện thoại, bảng tin nằm ngay trong app. Mở app là thấy khuyến mãi, mẫu mới và thông báo của các salon bạn theo dõi.", kind: "tip", title: "Xem bảng tin nhanh hơn" },
      ],
    },
    {
      id: "bang-tin-co-gi",
      title: "Bảng tin có những gì",
      blocks: [
        { p: "Trang “Bảng tin” ghi rõ đây là bài viết mới nhất từ các salon bạn theo dõi. Phía trên là hàng “Salon bạn theo dõi” với biểu tượng của từng tiệm. Phía dưới là các bài viết, mỗi bài ghi tên salon và thời điểm đăng." },
        { p: "Nội dung thường thuộc ba loại mà bài học nhắc đến: ưu đãi, mẫu mới và thông báo của salon. Một bài ưu đãi trong video bài học có nhãn “Khuyến mãi”, lời giới thiệu, một tấm ảnh, và ngay dưới bài là nút “Đặt lịch ngay”." },
        { img: { src: img("bai-viet-uu-dai-cua-salon-trong-bang-tin"), alt: "Bài viết khuyến mãi của salon Lumi Beauty Paris trong Bảng tin được khoanh vàng, có ảnh spa và nút Đặt lịch ngay bên dưới", caption: "Một bài ưu đãi của salon trong “Bảng tin”." } },
        { p: "Nút “Đặt lịch ngay” là lý do bảng tin hữu ích hơn một trang tin thông thường. Ưu đãi của salon thường có hạn, và bạn giữ chỗ được ngay lúc đọc thay vì để đó rồi quên. Các bước sau khi bấm giống hệt bài [đặt lịch làm đẹp online](lesson:dat-lich-online)." },
      ],
    },
    {
      id: "mua-san-pham-cua-salon",
      title: "Mua sản phẩm của salon: thanh toán và nhận hàng",
      blocks: [
        { p: "Nhiều salon bán kèm sản phẩm chăm sóc để khách dùng ở nhà giữa hai lần hẹn, ví dụ dầu dưỡng móng. Trên VaraaAi, những món này nằm trong cửa hàng của salon, mở bằng nút “Sản phẩm” trên trang của tiệm. Bạn đặt trên mạng và đến tiệm nhận, không có khâu giao hàng." },
        { p: "Lúc đặt hàng, bạn chọn một trong ba cách thanh toán:" },
        {
          table: {
            head: ["Cách thanh toán", "Diễn ra thế nào", "Hợp khi"],
            rows: [
              ["Thanh toán tại salon", "Trả tiền khi bạn đến nhận hàng", "Bạn sắp ghé tiệm, ví dụ đúng hôm có lịch hẹn"],
              ["Chuyển khoản ngân hàng", "Bạn nhận thông tin tài khoản ngay sau khi đặt", "Bạn muốn trả trước, hoặc nhờ người khác đến lấy"],
              ["Trao đổi với salon", "Nhắn tin với salon để thống nhất cách trả", "Bạn có yêu cầu riêng cần hỏi trước"],
            ],
          },
        },
        { note: "Ô “Lời nhắn cho salon” là chỗ ghi ngày bạn định ghé lấy. Trong video bài học, khách nhắn rằng sẽ ghé lấy chiều thứ Bảy. Một lời nhắn như vậy giúp salon chuẩn bị sẵn hàng và đỡ phải hỏi lại.", kind: "tip", title: "Viết lời nhắn khi đặt hàng" },
        { p: "Sau khi bạn xác nhận, salon sẽ liên hệ để xác nhận đơn và hẹn thời gian nhận hàng. Cách tiện nhất là nhận luôn vào buổi hẹn làm đẹp kế tiếp của bạn." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi theo dõi salon và đặt sản phẩm",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Muốn ngừng nhận bài viết của một salon", "Bấm vào tên bạn ở góc trên, mở “Đang theo dõi” và bấm “Bỏ theo dõi” ở salon đó"],
              ["Bảng tin trống", "Bạn chưa theo dõi salon nào, hoặc các salon bạn theo dõi chưa đăng bài. Mở trang một salon và bấm “Theo dõi”"],
              ["Không chắc đã theo dõi chưa", "Mở trang salon: nút ghi “Đang theo dõi” là đã theo dõi, ghi “Theo dõi” là chưa"],
              ["Không thấy nút “Sản phẩm” trên trang salon", "Có thể salon đó chưa mở cửa hàng sản phẩm trên VaraaAi. Hỏi salon nếu bạn cần mua"],
              ["Muốn hỏi về sản phẩm trước khi mua", "Dùng nút “Chat với Salon” trên trang của tiệm"],
              ["Đặt hàng xong, chưa biết khi nào đến lấy", "Chờ salon liên hệ để hẹn thời gian nhận hàng"],
            ],
          },
        },
        { p: "Với câu hỏi về thành phần, cách dùng hay món nào hợp với móng, tóc của bạn, hãy [nhắn tin cho salon](lesson:chat-voi-salon) trước khi đặt. Người thợ đã làm cho bạn là người biết rõ nhất bạn nên dùng gì." },
      ],
    },
    {
      id: "gan-bo-voi-salon-quen",
      title: "Theo dõi, thẻ thành viên và đánh giá: ba việc của khách quen",
      blocks: [
        { p: "Theo dõi cho bạn tin tức của tiệm. Hai việc còn lại cho bạn quyền lợi và tiếng nói. Với [thẻ thành viên](lesson:the-thanh-vien), mỗi lần đến tiệm bạn được cộng một vé và đủ vé thì được giảm giá. Sau mỗi buổi hẹn, bạn có thể [viết đánh giá](lesson:viet-danh-gia) để salon biết bạn hài lòng điều gì." },
        { note: "Phía salon mở cửa hàng, xác nhận đơn và báo khách qua email trong trang quản trị. Xem bài [Bán sản phẩm và quản lý đơn hàng](lesson:san-pham-don-hang).", kind: "info", title: "Bạn là chủ salon?" },
      ],
    },
  ],
  howTo: {
    title: "Các bước theo dõi salon, xem bảng tin và mua sản phẩm",
    id: "cac-buoc-theo-doi-salon",
    after: "theo-doi-de-lam-gi",
    lead: "Bốn bước đầu là theo dõi và đọc bảng tin. Bốn bước sau chỉ cần khi bạn muốn mua sản phẩm của salon.",
    steps: [
      {
        name: "Mở trang salon và bấm “Theo dõi”",
        text: "Tìm salon ở trang [tìm kiếm](/search) và mở trang của tiệm. Nút “Theo dõi” có hình trái tim, nằm ngay dưới nút “Đặt lịch”. Bấm một lần là xong.",
        image: { src: img("bam-theo-doi-tren-trang-salon"), alt: "Trang salon Lumi Beauty Paris trên VaraaAi, nút Theo dõi có hình trái tim được khoanh vàng ngay dưới nút Đặt lịch" },
      },
      {
        name: "Kiểm tra nút đã đổi thành “Đang theo dõi”",
        text: "Sau khi bấm, nút đổi thành “Đang theo dõi”. Thấy dòng chữ này là việc theo dõi đã có hiệu lực, và từ giờ bài viết mới của salon hiện trong bảng tin của bạn.",
        image: { src: img("nut-doi-thanh-dang-theo-doi"), alt: "Trang salon sau khi bấm theo dõi, nút Đang theo dõi được khoanh vàng, bên cạnh là nút Sản phẩm và Fanpage" },
      },
      {
        name: "Mở “Bảng tin”",
        text: "Bấm vào tên bạn ở góc trên của trang và chọn “Bảng tin”. Trang này gom bài viết mới nhất của mọi salon bạn theo dõi về một chỗ.",
        image: { src: img("bang-tin-bai-viet-moi-cua-salon-dang-theo-doi"), alt: "Trang Bảng tin trên VaraaAi với tiêu đề được khoanh vàng, hàng Salon bạn theo dõi và bài viết đầu tiên của salon" },
      },
      {
        name: "Đọc bài và đặt lịch ngay dưới bài",
        text: "Kéo xuống để đọc ưu đãi, mẫu mới và thông báo. Thấy ưu đãi phù hợp, bấm “Đặt lịch ngay” ở dưới bài để giữ chỗ luôn, không cần quay về trang salon.",
      },
      {
        name: "Trên trang salon, bấm “Sản phẩm”",
        text: "Muốn mua sản phẩm chăm sóc, mở trang của salon và bấm nút “Sản phẩm”. Cửa hàng của salon hiện ra với ảnh, tên và giá từng món.",
        image: { src: img("bam-san-pham-de-mo-cua-hang-cua-salon"), alt: "Trang salon Lumi Beauty Paris với nút Sản phẩm được khoanh vàng, nằm cạnh nút Đang theo dõi và phía trên nút Fanpage" },
      },
      {
        name: "Bấm biểu tượng giỏ hàng trên món bạn thích",
        text: "Mỗi sản phẩm có một biểu tượng giỏ hàng ở góc ảnh. Bấm vào đó để thêm món vào giỏ. Chọn đủ rồi thì bấm vào giỏ hàng ở góc dưới màn hình để xem lại.",
        image: { src: img("bam-gio-hang-tren-san-pham-cua-salon"), alt: "Cửa hàng của salon với sản phẩm dầu dưỡng móng giá 18 euro, biểu tượng giỏ hàng ở góc ảnh sản phẩm được khoanh vàng" },
      },
      {
        name: "Bấm “Tiến hành đặt hàng” và chọn cách thanh toán",
        text: "Trong giỏ, bấm “Tiến hành đặt hàng”. Chọn một trong ba cách thanh toán: trả tại salon khi nhận hàng, chuyển khoản, hoặc nhắn tin trao đổi với salon. Viết lời nhắn cho salon nếu cần.",
        image: { src: img("chon-cach-thanh-toan-khi-dat-san-pham"), alt: "Màn hình đặt hàng với ba phương thức được khoanh vàng: Thanh toán tại salon, Chuyển khoản ngân hàng và Trao đổi với salon" },
      },
      {
        name: "Bấm “Xác nhận đặt hàng”",
        text: "Xem lại đơn rồi bấm “Xác nhận đặt hàng”. Màn hình báo đặt hàng thành công kèm tóm tắt đơn và tổng tiền. Salon sẽ liên hệ để hẹn bạn đến nhận hàng.",
        image: { src: img("dat-hang-thanh-cong-nhan-tai-salon"), alt: "Màn hình Đặt hàng thành công được khoanh vàng, ghi salon sẽ liên hệ hẹn thời gian nhận hàng, kèm đơn hàng và tổng cộng" },
      },
    ],
  },
  faq: [
    {
      q: "Theo dõi salon trên VaraaAi thì được gì?",
      a: "Bài viết mới của salon hiện trong “Bảng tin” của bạn, gồm ưu đãi, mẫu mới và thông báo. Bạn biết ngay khi tiệm quen có khuyến mãi mà không phải vào trang của tiệm để xem.",
    },
    {
      q: "Nút “Theo dõi” nằm ở đâu?",
      a: "Trên trang của salon, ngay dưới nút “Đặt lịch”. Sau khi bấm, nút đổi thành “Đang theo dõi”.",
    },
    {
      q: "Làm sao bỏ theo dõi một salon?",
      a: "Bấm vào tên bạn ở góc trên, mở mục “Đang theo dõi” và bấm “Bỏ theo dõi” ở salon bạn không muốn nhận bài viết nữa.",
    },
    {
      q: "Sản phẩm mua trong cửa hàng của salon nhận ở đâu?",
      a: "Nhận tại salon. Bạn đặt trên mạng, sau đó salon liên hệ để hẹn thời gian bạn đến lấy hàng.",
    },
    {
      q: "Có những cách thanh toán nào khi đặt sản phẩm của salon?",
      a: "Có ba cách: thanh toán tại salon khi nhận hàng, chuyển khoản ngân hàng, hoặc nhắn tin trao đổi với salon để thống nhất cách trả. Bạn chọn cách thuận tiện nhất ở bước đặt hàng.",
    },
    {
      q: "Theo dõi salon có mất phí hay bị tự động đặt lịch không?",
      a: "Không. Khách hàng dùng VaraaAi miễn phí, và việc theo dõi chỉ đưa bài viết của salon vào bảng tin của bạn. Lịch hẹn chỉ được tạo khi chính bạn bấm đặt lịch và xác nhận.",
    },
  ],
  related: ["the-thanh-vien", "the-qua-tang", "hoa-don", "chat-voi-salon"],
};

export default article;
