import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cai-app/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cai-app-dat-lich-lam-dep",
  lesson: "cai-app",
  category: "booking",
  title: "Cách cài app đặt lịch làm đẹp VaraaAi trên Android, iPhone và máy tính",
  metaTitle: "Cài app đặt lịch làm đẹp VaraaAi: Android, iPhone, máy tính",
  metaDescription:
    "Hướng dẫn cài app đặt lịch làm đẹp VaraaAi lên màn hình chính: Android và máy tính bấm một nút, iPhone dùng Safari. Miễn phí, không cần CH Play hay App Store.",
  keyword: "cài app đặt lịch làm đẹp",
  keywords: [
    "cài app VaraaAi",
    "app đặt lịch làm nail",
    "thêm vào màn hình chính iPhone",
    "cài app không cần CH Play",
    "app đặt lịch salon miễn phí",
    "cài ứng dụng VaraaAi trên máy tính",
  ],
  excerpt: "Đưa VaraaAi ra màn hình chính trong một chạm trên Android và máy tính, vài lần bấm trên iPhone. Miễn phí, không cần kho ứng dụng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-mo-app-varaaai-tren-dien-thoai-o-quan-ca-phe"),
    alt: "Cô gái tóc vàng quàng khăn màu mận ngồi bên cửa sổ quán cà phê, cầm điện thoại bằng hai tay cạnh tách cà phê",
  },
  takeaways: [
    "App VaraaAi cài **thẳng từ trình duyệt** ở trang varaaai.com/app, không cần CH Play hay App Store, và miễn phí.",
    "**Android và máy tính:** mở trang bằng Chrome, Edge hoặc Samsung Internet, bấm “Cài đặt ứng dụng” rồi chọn “Cài đặt”.",
    "**iPhone và iPad:** mở trang bằng Safari, nhấn nút Chia sẻ, chọn “Thêm vào Màn hình chính” rồi bấm “Thêm”.",
    "App tự cập nhật cùng website nên bạn không phải tải lại bản mới.",
    "Không cần nhớ địa chỉ: cuối mọi trang của VaraaAi có ba nút “Cài trên Android”, “Cài trên iPhone” và “Cài trên Máy tính”.",
  ],
  intro: [
    "Nếu bạn hay giữ chỗ làm nail, cắt tóc hay nối mi qua mạng, cài app đặt lịch làm đẹp lên điện thoại giúp bạn bỏ được bước mở trình duyệt và gõ địa chỉ. Với VaraaAi, việc cài chỉ mất một chạm trên Android, vài lần bấm trên iPhone, và bạn không phải vào kho ứng dụng nào.",
    "Bài viết đi theo bài học “Cài app VaraaAi lên điện thoại” trong VaraaAi Academy. Bạn sẽ biết dùng trình duyệt nào cho từng loại máy, bấm những nút nào, và xử lý ra sao khi không thấy nút cài đặt.",
  ],
  sections: [
    {
      id: "app-varaaai-la-gi",
      title: "App VaraaAi là gì và vì sao nên cài",
      blocks: [
        { p: "App VaraaAi là chính trang varaaai.com được đưa ra màn hình chính của điện thoại, với biểu tượng riêng, mở lên như một ứng dụng bình thường. Vì cài thẳng từ trình duyệt nên bạn không tìm nó trong CH Play hay App Store, cũng không cần tài khoản kho ứng dụng." },
        { p: "Trang cài đặt của VaraaAi nêu bốn lý do để cài, và cả bốn đều dành cho người đặt lịch thường xuyên:" },
        {
          ul: [
            "**Đặt lịch trong vài giây:** mở app là thấy ngay salon quen, chọn giờ và đặt, không phải gõ địa chỉ trang web.",
            "**Chuông báo lịch hẹn:** thông báo nhắc lịch, xác nhận và thay đổi từ salon hiện ngay trên điện thoại.",
            "**Ưu đãi từ salon bạn theo dõi:** khuyến mãi, mẫu mới và thông báo của salon hiện trong bảng tin của bạn.",
            "**Luôn là bản mới nhất:** app tự cập nhật cùng website, bạn không phải tải lại và không tốn bộ nhớ.",
          ],
        },
        { img: { src: img("ly-do-nen-cai-app-dat-lich-lam-dep"), alt: "Màn hình mục Vì sao nên cài app với các ô Đặt lịch trong vài giây, Chuông báo lịch hẹn và Ưu đãi từ salon", caption: "Phần “Vì sao nên cài app?” trên trang cài đặt của VaraaAi." } },
        { p: "Không cài app thì bạn vẫn [đặt lịch làm đẹp online](lesson:dat-lich-online) trên trang web như bình thường. App chỉ rút ngắn đường đi: một lần chạm vào biểu tượng thay cho mở trình duyệt, gõ địa chỉ và chờ trang tải." },
      ],
    },
    {
      id: "chon-dung-trinh-duyet",
      title: "Chọn đúng trình duyệt cho từng loại máy",
      blocks: [
        { p: "Điều duy nhất cần chuẩn bị là mở trang cài đặt bằng đúng trình duyệt. Phần lớn trường hợp “không thấy nút cài” đến từ việc mở trang bằng một trình duyệt khác với hướng dẫn." },
        {
          table: {
            head: ["Thiết bị", "Trình duyệt", "Nút cần bấm"],
            rows: [
              ["Điện thoại Android", "Chrome, Edge hoặc Samsung Internet", "“Cài đặt ứng dụng”, rồi “Cài đặt”"],
              ["Máy tính", "Chrome hoặc Edge", "“Cài đặt ứng dụng”, rồi “Cài đặt”"],
              ["iPhone và iPad", "Safari", "Nút Chia sẻ, “Thêm vào Màn hình chính”, rồi “Thêm”"],
            ],
          },
        },
        { note: "Nếu bạn bấm vào một đường link VaraaAi trong ứng dụng nhắn tin hay mạng xã hội, trang thường mở trong trình duyệt riêng của ứng dụng đó. Hãy mở lại địa chỉ varaaai.com/app bằng Safari trên iPhone, hoặc Chrome trên Android, rồi mới cài.", kind: "tip", title: "Mở link từ ứng dụng khác" },
      ],
    },
    {
      id: "nut-cai-o-cuoi-trang",
      title: "Không nhớ địa chỉ trang cài app thì tìm ở đâu",
      blocks: [
        { p: "Bạn không cần thuộc địa chỉ varaaai.com/app. Kéo xuống cuối bất kỳ trang nào của VaraaAi, bạn sẽ thấy khung “Tải ứng dụng VaraaAi” với ba nút: “Cài trên Android”, “Cài trên iPhone” và “Cài trên Máy tính”. Bấm nút đúng với máy của bạn để bắt đầu cài, không cần quay về trang chủ hay tìm trong menu." },
        { img: { src: img("ba-nut-cai-app-o-cuoi-trang-varaaai"), alt: "Khung Tải ứng dụng VaraaAi ở cuối trang với ba nút Cài trên Android, Cài trên iPhone và Cài trên Máy tính" } },
        { p: "Trang cài đặt còn có một mã QR dưới dòng “Đang dùng máy tính?”. Khi bạn đang xem VaraaAi trên máy tính nhưng muốn có app trên điện thoại, đưa camera điện thoại lên quét mã là cách nhanh để mở đúng trang trên điện thoại, khỏi phải gõ lại địa chỉ." },
        { img: { src: img("ma-qr-cai-app-varaaai-khi-dung-may-tinh"), alt: "Trang cài app VaraaAi trên điện thoại hiện các lợi ích của app và mã QR dưới dòng Đang dùng máy tính", caption: "Mã QR ở cuối phần lý do nên cài app." } },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi cài app VaraaAi",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Tìm trong CH Play hoặc App Store không thấy VaraaAi", "App không nằm trong kho ứng dụng. Mở varaaai.com/app bằng trình duyệt và cài từ đó"],
              ["Android: bấm “Cài đặt ứng dụng” mà không thấy trình duyệt hỏi", "Kiểm tra bạn đang dùng Chrome, Edge hoặc Samsung Internet. Nếu đang ở trình duyệt khác, mở lại trang bằng một trong ba trình duyệt này"],
              ["iPhone: không thấy “Thêm vào Màn hình chính”", "Kiểm tra bạn đang dùng Safari, rồi kéo danh sách trong bảng Chia sẻ xuống phía dưới, mục này nằm sau các lựa chọn đầu tiên"],
              ["Không biết nút Chia sẻ là nút nào", "Đó là hình vuông có mũi tên hướng lên, nằm ở cuối màn hình Safari"],
              ["Muốn cài trên máy tính ở quầy hoặc ở nhà", "Mở varaaai.com/app bằng Chrome hoặc Edge và làm như trên Android"],
              ["Cài xong không biết mở ở đâu", "Tìm biểu tượng VaraaAi trên màn hình chính của điện thoại"],
            ],
          },
        },
      ],
    },
    {
      id: "sau-khi-cai",
      title: "Cài xong thì dùng app thế nào",
      blocks: [
        { p: "Chạm vào biểu tượng VaraaAi trên màn hình chính, app mở ra đúng những gì bạn quen thấy trên trang web. Nếu chưa có tài khoản, bạn [tạo tài khoản và đăng nhập](lesson:tai-khoan) một lần để lịch hẹn, thẻ tích điểm và tin nhắn với salon đi theo bạn." },
        { p: "Từ đó, hai việc bạn sẽ làm nhiều nhất trong app là giữ chỗ ở salon quen và mở [Lịch hẹn của tôi](lesson:lich-hen-cua-toi) để xem lại giờ hẹn. Nếu bạn [theo dõi salon](lesson:theo-doi-salon), ưu đãi và mẫu mới của tiệm cũng nằm sẵn trong bảng tin mỗi lần bạn mở app." },
        { note: "Bạn là chủ salon? Khách của bạn cài app theo đúng các bước trong bài này. Xem thêm trang [VaraaAi cho salon](/business) để biết cách đưa tiệm lên VaraaAi miễn phí.", kind: "info", title: "Dành cho chủ salon" },
      ],
    },
  ],
  howTo: {
    title: "Các bước cài app đặt lịch làm đẹp VaraaAi",
    id: "cac-buoc-cai-app",
    after: "chon-dung-trinh-duyet",
    lead: "Hai bước đầu dành cho Android và máy tính, hai bước tiếp theo dành cho iPhone và iPad. Bạn chỉ làm phần ứng với máy của mình.",
    steps: [
      {
        name: "Android và máy tính: mở trang cài đặt",
        text: "Mở [varaaai.com/app](/app) bằng Chrome, Edge hoặc Samsung Internet. Trang có phần “Cài trong 3 bước” ghi lại đúng thứ tự cần làm cho từng loại máy, bạn có thể vừa đọc vừa bấm.",
        image: { src: img("ba-buoc-cai-app-tren-android-va-may-tinh"), alt: "Phần Cài trong 3 bước trên trang cài app, khối hướng dẫn cho Android và máy tính được khoanh vàng" },
      },
      {
        name: "Bấm “Cài đặt ứng dụng” rồi chọn “Cài đặt”",
        text: "Bấm nút “Cài đặt ứng dụng” ở đầu trang. Trình duyệt hiện một hộp hỏi lại, bạn chọn “Cài đặt”. Biểu tượng VaraaAi xuất hiện ngay trên màn hình chính, vậy là xong phần Android và máy tính.",
        image: { src: img("bam-cai-dat-ung-dung-tren-android"), alt: "Trang Cài ứng dụng VaraaAi trên điện thoại với nút Cài đặt ứng dụng được khoanh vàng và ba nút chọn thiết bị" },
      },
      {
        name: "iPhone và iPad: mở bằng Safari và nhấn nút Chia sẻ",
        text: "Mở [varaaai.com/app](/app) bằng Safari. Nhấn nút Chia sẻ, là hình vuông có mũi tên hướng lên ở cuối màn hình. Một bảng lựa chọn trượt lên từ phía dưới.",
        image: { src: img("nhan-nut-chia-se-tren-iphone-safari"), alt: "Hướng dẫn cho iPhone và iPad trên trang cài app, dòng Nhấn nút Chia sẻ ở cuối màn hình được khoanh vàng" },
      },
      {
        name: "Chọn “Thêm vào Màn hình chính” rồi bấm “Thêm”",
        text: "Kéo bảng lựa chọn xuống cho đến khi thấy “Thêm vào Màn hình chính” và bấm vào đó. Bấm “Thêm” để xác nhận. Biểu tượng VaraaAi nằm trên màn hình chính như mọi ứng dụng khác.",
        image: { src: img("chon-them-vao-man-hinh-chinh-tren-iphone"), alt: "Hướng dẫn cho iPhone và iPad, dòng Chọn Thêm vào Màn hình chính rồi bấm Thêm được khoanh vàng" },
      },
      {
        name: "Mở app từ màn hình chính",
        text: "Tìm biểu tượng VaraaAi trên màn hình chính và chạm vào để mở. Từ lần này, bạn vào thẳng VaraaAi mà không qua trình duyệt, và việc đặt lịch chỉ còn vài lần chạm.",
      },
    ],
  },
  faq: [
    {
      q: "Cài app VaraaAi có mất phí không?",
      a: "Không. App VaraaAi miễn phí, cài thẳng từ trang varaaai.com/app. Khách hàng dùng VaraaAi để tìm salon và đặt lịch cũng không mất phí.",
    },
    {
      q: "Vì sao tôi không tìm thấy app VaraaAi trên CH Play hay App Store?",
      a: "Vì app không phát hành qua kho ứng dụng. Bạn cài thẳng từ trình duyệt: mở varaaai.com/app, bấm “Cài đặt ứng dụng” trên Android và máy tính, hoặc dùng nút Chia sẻ của Safari trên iPhone.",
    },
    {
      q: "Cài app VaraaAi trên iPhone như thế nào?",
      a: "Mở varaaai.com/app bằng Safari. Nhấn nút Chia sẻ, là hình vuông có mũi tên hướng lên ở cuối màn hình, kéo xuống chọn “Thêm vào Màn hình chính”, rồi bấm “Thêm”.",
    },
    {
      q: "App VaraaAi có cần cập nhật và có tốn bộ nhớ không?",
      a: "App tự cập nhật cùng website, nên bạn luôn dùng bản mới nhất mà không phải tải lại. Theo trang cài đặt của VaraaAi, app không tốn bộ nhớ của máy.",
    },
    {
      q: "Không cài app thì có đặt lịch được không?",
      a: "Được. Bạn đặt lịch trên trang varaaai.com bằng trình duyệt như bình thường. App chỉ giúp mở nhanh từ màn hình chính và nhận chuông báo nhắc lịch hẹn trên điện thoại.",
    },
    {
      q: "Có cài app VaraaAi trên máy tính được không?",
      a: "Được. Mở varaaai.com/app bằng Chrome hoặc Edge trên máy tính, bấm “Cài đặt ứng dụng” rồi chọn “Cài đặt” khi trình duyệt hỏi, giống như trên Android.",
    },
  ],
  related: ["dat-lich-online", "tai-khoan", "lich-hen-cua-toi", "theo-doi-salon"],
};

export default article;
