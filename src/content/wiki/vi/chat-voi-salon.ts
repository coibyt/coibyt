import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/chat-voi-salon/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "nhan-tin-cho-salon-lam-dep",
  lesson: "chat-voi-salon",
  category: "booking",
  title: "Cách nhắn tin cho salon làm đẹp trên VaraaAi: hỏi giá, hỏi chỗ trống không cần gọi điện",
  metaTitle: "Nhắn tin cho salon làm đẹp: hỏi giá, hỏi chỗ trên VaraaAi",
  metaDescription:
    "Hướng dẫn nhắn tin cho salon ngay trên VaraaAi: bấm Chat với Salon, gõ câu hỏi, gửi kèm ảnh mẫu, đọc trả lời và xem lại mọi cuộc trò chuyện trong Hộp thư.",
  keyword: "nhắn tin cho salon",
  keywords: [
    "chat với salon",
    "hỏi giá làm nail qua tin nhắn",
    "hỏi salon còn chỗ không",
    "gửi ảnh mẫu móng cho salon",
    "xem lại tin nhắn với salon",
    "Hộp thư VaraaAi",
  ],
  excerpt: "Bấm “Chat với Salon” trên trang của tiệm để hỏi giá, hỏi chỗ trống hay dặn dò trước khi đến, gửi kèm ảnh mẫu và xem lại trong “Hộp thư”.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-nhan-tin-cho-salon-lam-dep-tren-dien-thoai"),
    alt: "Cô gái tóc dài gợn sóng mặc áo len kem ngồi trên sofa cạnh cửa sổ, mỉm cười nhắn tin trên điện thoại",
  },
  takeaways: [
    "Nút **“Chat với Salon”** nằm trên trang của từng salon, ngay cạnh nút “Đặt lịch”.",
    "Gõ câu hỏi vào ô “Nhập tin nhắn...” rồi bấm nút gửi. Salon trả lời ngay trong khung chat đó.",
    "Bạn **đính kèm được ảnh**, ví dụ mẫu móng bạn thích, để salon tư vấn và báo giá sát hơn.",
    "Mọi cuộc trò chuyện được giữ trong **“Hộp thư”**: bấm vào tên bạn ở góc trên để mở.",
    "Chat dùng để hỏi. Muốn giữ chỗ, bạn vẫn bấm “Đặt lịch” và chọn giờ như bình thường.",
  ],
  intro: [
    "Nhiều câu hỏi trước một buổi làm đẹp không đáng một cuộc gọi: tiệm còn chỗ chiều thứ Bảy không, bộ móng này giá bao nhiêu, có cần tháo gel cũ trước không. Trên VaraaAi, bạn nhắn tin cho salon ngay trên trang của tiệm, gửi kèm được ảnh mẫu, và đọc câu trả lời khi rảnh.",
    "Bài viết đi theo bài học “Chat với salon” trong VaraaAi Academy. Bạn sẽ biết nút chat nằm ở đâu, viết tin nhắn thế nào để salon trả lời được ngay, và tìm lại các cuộc trò chuyện cũ trong “Hộp thư”.",
  ],
  sections: [
    {
      id: "khi-nao-nen-nhan-tin",
      title: "Khi nào nên nhắn tin cho salon thay vì gọi điện",
      blocks: [
        { p: "Gọi điện có hai điểm bất tiện. Người thợ đang làm cho khách thì khó nghe máy, còn bạn thì không thể cho họ xem mẫu mình muốn qua giọng nói. Tin nhắn giải quyết cả hai: salon trả lời lúc rảnh tay, và một tấm ảnh nói rõ hơn nhiều câu mô tả." },
        { p: "Bài học nêu ba việc khách hay nhắn nhất:" },
        {
          ul: [
            "**Hỏi chỗ trống:** tiệm còn nhận khách vào ngày giờ bạn định đến không.",
            "**Hỏi giá:** một mẫu cụ thể, một kiểu tóc hay một gói dịch vụ hết bao nhiêu.",
            "**Dặn dò trước khi đến:** những điều bạn muốn salon biết trước buổi hẹn.",
          ],
        },
        { note: "Hãy đăng nhập trước khi nhắn. “Hộp thư”, nơi giữ lại các cuộc trò chuyện, là một mục trong tài khoản của bạn. Chưa có tài khoản thì xem bài [tạo tài khoản và đăng nhập](lesson:tai-khoan), việc này mất khoảng một phút và miễn phí.", kind: "info", title: "Trước khi bắt đầu" },
      ],
    },
    {
      id: "viet-tin-nhan-the-nao",
      title: "Viết tin nhắn thế nào để salon trả lời được ngay",
      blocks: [
        { p: "Một tin nhắn kiểu “bộ này bao nhiêu ạ” mà không kèm ảnh thường kéo theo ba bốn câu hỏi ngược lại từ salon. Bạn tiết kiệm thời gian cho cả hai bên nếu đưa đủ thông tin ngay trong tin đầu tiên." },
        {
          table: {
            head: ["Bạn muốn hỏi", "Nên viết kèm"],
            rows: [
              ["Còn chỗ không", "Dịch vụ muốn làm, ngày và khoảng giờ bạn đến được"],
              ["Giá một mẫu móng", "Ảnh mẫu, và móng hiện tại của bạn: móng thật hay đang có lớp gel, bột cũ cần tháo"],
              ["Giá một kiểu tóc, màu nhuộm", "Ảnh kiểu bạn thích và ảnh tóc hiện tại, tóc đã từng tẩy hay nhuộm chưa"],
              ["Nối mi, uốn mi", "Ảnh kiểu mi bạn thích, bạn đang có mi nối cũ hay không"],
              ["Dặn dò trước khi đến", "Điều salon cần biết: da hay mắt nhạy cảm, đi cùng trẻ nhỏ, cần xong trước mấy giờ"],
            ],
          },
        },
        { note: "Gửi kèm ảnh mẫu bạn thích là mẹo chính của bài học. Cùng một cái tên “móng mắt mèo” hay “tóc layer” nhưng mỗi người hình dung một kiểu, còn tấm ảnh thì chỉ có một cách hiểu. Salon nhìn ảnh sẽ tư vấn và báo giá chính xác hơn.", kind: "tip", title: "Một tấm ảnh thay nhiều câu mô tả" },
      ],
    },
    {
      id: "hop-thu",
      title: "Hộp thư: nơi xem lại tin nhắn với salon",
      blocks: [
        { p: "Bạn không cần quay lại trang của từng salon để tìm câu trả lời. Bấm vào tên bạn ở góc trên và chọn “Hộp thư”: mọi cuộc trò chuyện với các salon nằm ở đó, mỗi salon một dòng, kèm tin nhắn gần nhất." },
        { img: { src: img("hop-thu-luu-cac-cuoc-tro-chuyen-voi-salon"), alt: "Trang Hộp thư trên VaraaAi với hai cuộc trò chuyện, dòng của salon Lumi Beauty Paris được khoanh vàng kèm tin nhắn gần nhất", caption: "Mỗi salon bạn từng nhắn là một dòng trong “Hộp thư”." } },
        { p: "Hộp thư có ích nhất vào hôm bạn đến tiệm. Mở lại cuộc trò chuyện, bạn có ngay mức giá salon đã báo, giờ salon gợi ý và tấm ảnh mẫu đã gửi để đưa cho người thợ xem." },
      ],
    },
    {
      id: "chat-ghi-chu-hay-goi",
      title: "Chat, ghi chú khi đặt lịch hay gọi điện: chọn cách nào",
      blocks: [
        {
          table: {
            head: ["Trường hợp", "Cách hợp lý"],
            rows: [
              ["Chưa chắc sẽ đặt, cần hỏi giá hoặc hỏi chỗ trước", "Bấm “Chat với Salon” trên trang của tiệm"],
              ["Đã chọn xong dịch vụ và giờ, chỉ muốn dặn thêm một câu", "Viết vào ô “Ghi chú” ở bước điền thông tin khi đặt lịch"],
              ["Muốn salon xem mẫu trước khi báo giá", "Chat và đính kèm ảnh"],
              ["Việc gấp trong ngày, ví dụ sắp đến trễ", "Gọi số điện thoại ghi trên trang salon hoặc trong “Xem thông tin đặt chỗ”"],
              ["Đã quá thời hạn tự hủy và cần hủy hoặc dời lịch", "Liên hệ trực tiếp với salon, bằng điện thoại hoặc tin nhắn"],
            ],
          },
        },
        { p: "Tốc độ trả lời tùy từng salon và tùy lúc tiệm đông hay vắng. Vì vậy với những việc tính bằng phút, điện thoại vẫn là cách chắc hơn." },
      ],
    },
    {
      id: "sau-khi-salon-tra-loi",
      title: "Sau khi salon trả lời",
      blocks: [
        { p: "Tin nhắn không giữ chỗ cho bạn. Khi salon báo còn giờ, bạn đóng khung chat và bấm “Đặt lịch” ngay bên cạnh để chọn dịch vụ, nhân viên, ngày giờ như trong bài [đặt lịch làm đẹp online](lesson:dat-lich-online). Lịch đặt xong nằm trong [Lịch hẹn của tôi](lesson:lich-hen-cua-toi), nơi bạn xem lại hoặc tự hủy khi bận." },
        { p: "Nếu đây là tiệm bạn định quay lại, hãy bấm [theo dõi salon](lesson:theo-doi-salon) để ưu đãi và mẫu mới của tiệm hiện trong bảng tin của bạn." },
        { note: "Phía salon trả lời khách trong mục “Tin nhắn” của trang quản trị, có câu trả lời mẫu và trợ lý AI trả lời thay khi vắng mặt. Xem bài [Tin nhắn và trợ lý AI](lesson:tin-nhan-ai).", kind: "info", title: "Bạn là chủ salon?" },
      ],
    },
  ],
  howTo: {
    title: "Các bước nhắn tin cho salon trên VaraaAi",
    id: "cac-buoc-nhan-tin",
    after: "khi-nao-nen-nhan-tin",
    lead: "Sáu bước, trong đó bước đính kèm ảnh là tùy chọn. Tên nút trong ngoặc kép là tên bạn thấy trên màn hình.",
    steps: [
      {
        name: "Mở trang salon và bấm “Chat với Salon”",
        text: "Tìm salon ở trang [tìm kiếm](/search) rồi mở trang của tiệm. Dưới tên, địa chỉ và số điện thoại của salon là hàng nút: “Chat với Salon” nằm ngay cạnh nút “Đặt lịch”. Bấm vào, khung chat hiện ra.",
        image: { src: img("nut-chat-voi-salon-canh-nut-dat-lich"), alt: "Trang salon Lumi Beauty Paris trên VaraaAi, nút Chat với Salon được khoanh vàng bên cạnh nút Đặt lịch màu đen" },
      },
      {
        name: "Gõ câu hỏi vào ô “Nhập tin nhắn...”",
        text: "Viết câu hỏi của bạn, càng cụ thể càng tốt: dịch vụ nào, ngày nào, khoảng mấy giờ. Trong video bài học, khách hỏi chiều thứ Bảy tiệm còn chỗ làm gel manicure không.",
        image: { src: img("go-cau-hoi-vao-o-nhap-tin-nhan"), alt: "Khung chat trên trang salon, ô nhập tin nhắn được khoanh vàng với câu hỏi về chỗ trống chiều thứ Bảy" },
      },
      {
        name: "Đính kèm ảnh nếu cần",
        text: "Nút đính kèm ảnh nằm bên trái ô nhập tin nhắn. Dùng nó để gửi mẫu móng, kiểu tóc hay kiểu mi bạn thích. Có ảnh, salon báo giá sát hơn và bạn đỡ phải mô tả bằng lời.",
        image: { src: img("nut-dinh-kem-anh-mau-gui-salon"), alt: "Khung chat với nút đính kèm ảnh hình chiếc kẹp giấy được khoanh vàng ở bên trái ô nhập tin nhắn" },
      },
      {
        name: "Bấm nút gửi",
        text: "Nút gửi là nút tròn có hình mũi tên, nằm bên phải ô nhập. Bấm một lần, tin nhắn của bạn hiện trong khung chat.",
        image: { src: img("bam-nut-gui-tin-nhan-cho-salon"), alt: "Khung chat trên VaraaAi, nút gửi hình tròn có mũi tên ở bên phải ô nhập tin nhắn được khoanh vàng" },
      },
      {
        name: "Đọc câu trả lời của salon",
        text: "Khi salon trả lời, tin nhắn hiện ngay trong khung chat, bên dưới tin của bạn. Nếu câu trả lời chưa đủ ý, bạn cứ hỏi tiếp trong cùng khung đó.",
        image: { src: img("salon-tra-loi-trong-khung-chat"), alt: "Khung chat với salon Lumi Beauty Paris, tin nhắn trả lời rằng khách có thể đặt lúc 14 giờ thứ Bảy được khoanh vàng" },
      },
      {
        name: "Xem lại trong “Hộp thư”",
        text: "Muốn đọc lại sau này, bấm vào tên bạn ở góc trên của trang và chọn “Hộp thư”. Bấm vào dòng của salon để mở lại toàn bộ cuộc trò chuyện.",
        image: { src: img("mo-hop-thu-tu-ten-tai-khoan"), alt: "Trang Hộp thư trên VaraaAi, nút tài khoản ở góc trên bên phải được khoanh vàng, bên dưới là danh sách cuộc trò chuyện" },
      },
    ],
  },
  faq: [
    {
      q: "Nút “Chat với Salon” nằm ở đâu?",
      a: "Trên trang của từng salon trên VaraaAi, ngay cạnh nút “Đặt lịch”. Mỗi salon có nút chat riêng, nên bạn mở trang của tiệm muốn hỏi rồi bấm nút đó.",
    },
    {
      q: "Nhắn tin cho salon trên VaraaAi có mất phí không?",
      a: "Không. Khách hàng dùng VaraaAi miễn phí, gồm cả việc tìm salon, đặt lịch và nhắn tin cho salon.",
    },
    {
      q: "Có gửi ảnh mẫu cho salon được không?",
      a: "Được. Bên trái ô “Nhập tin nhắn...” có nút đính kèm ảnh. Gửi ảnh mẫu móng, kiểu tóc hay kiểu mi bạn thích giúp salon tư vấn và báo giá chính xác hơn.",
    },
    {
      q: "Xem lại tin nhắn cũ với salon ở đâu?",
      a: "Bấm vào tên bạn ở góc trên của trang và chọn “Hộp thư”. Mọi cuộc trò chuyện với các salon đều nằm ở đó.",
    },
    {
      q: "Nhắn tin hỏi chỗ rồi thì có cần đặt lịch nữa không?",
      a: "Có. Tin nhắn chỉ để hỏi và trao đổi. Để giữ chỗ, bạn bấm “Đặt lịch” trên trang salon, chọn dịch vụ, ngày giờ còn trống và xác nhận.",
    },
    {
      q: "Salon trả lời thì tôi thấy ở đâu?",
      a: "Câu trả lời hiện ngay trong khung chat bạn đang mở. Nếu đã rời trang, bạn mở “Hộp thư” trong tài khoản để đọc.",
    },
  ],
  related: ["lich-hen-cua-toi", "viet-danh-gia", "dat-lich-online", "theo-doi-salon"],
};

export default article;
