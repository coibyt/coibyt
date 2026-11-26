import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fanpage/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "dang-bai-khuyen-mai-cho-salon-fanpage",
  lesson: "fanpage",
  category: "marketing",
  title: "Đăng bài khuyến mãi cho salon: cách dùng Fanpage VaraaAi để báo ưu đãi, mẫu mới cho khách quen",
  metaTitle: "Đăng bài khuyến mãi cho salon trên Fanpage VaraaAi",
  metaDescription:
    "Hướng dẫn chủ tiệm nail, tóc, spa đăng bài trên Fanpage VaraaAi: viết nội dung, chọn nhãn, thêm nút Đặt lịch ngay, ảnh, video, hẹn giờ đăng và ghim bài.",
  keyword: "đăng bài khuyến mãi cho salon",
  keywords: [
    "fanpage cho salon trên VaraaAi",
    "cách đăng bài khuyến mãi tiệm nail",
    "báo ưu đãi cho khách quen của tiệm",
    "hẹn giờ đăng bài cho salon",
    "ghim bài lên đầu fanpage",
    "đăng bài gì cho tiệm nail, tóc, spa",
    "nút đặt lịch ngay dưới bài đăng",
  ],
  excerpt: "Viết nội dung, chọn nhãn, gắn nút “Đặt lịch ngay”, thêm ảnh rồi đăng. Khách đang theo dõi salon thấy bài ngay trong bảng tin của họ.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-quen-gap-nhau-tai-khu-cho-cua-salon"),
    alt: "Hai người phụ nữ cười và ôm vai chào nhau trong khu chờ ngập nắng của salon, phía sau là hai khách khác ngồi trên ghế tím cầm ly cà phê",
  },
  takeaways: [
    "Mỗi salon trên VaraaAi có một **Fanpage riêng**. Khách đã bấm “Theo dõi” thấy bài mới ngay trong “Bảng tin” của họ.",
    "Fanpage là kênh công khai: ngoài khách theo dõi, ai cũng xem được bài trên fanpage của salon.",
    "Gắn nút **“Đặt lịch ngay”** dưới bài khuyến mãi để khách bấm là sang thẳng trang đặt lịch.",
    "**“Hẹn giờ”** cho bài tự đăng vào ngày giờ bạn chọn. **“Ghim lên đầu”** dành cho bài quan trọng.",
    "Sau khi đăng, bấm “Xem fanpage” để xem trang như khách thấy, hoặc “Sao chép link” để chia sẻ.",
  ],
  intro: [
    "Đăng bài khuyến mãi cho salon nghe thì đơn giản, nhưng câu hỏi thật là bài đó có đến được đúng người hay không. Tiệm có mẫu mới, có ưu đãi cuối tuần, và người cần biết nhất là những khách đã từng đến. Trên VaraaAi, mỗi salon có một Fanpage riêng cho việc này: bạn đăng bài, khách đang theo dõi salon thấy ngay trong bảng tin của họ.",
    "Bài viết này đi theo bài học “Fanpage: đăng bài cho khách theo dõi” của VaraaAi Academy. Bạn sẽ tự đăng được một bài có nhãn, có ảnh và có nút đặt lịch, biết khi nào nên hẹn giờ, khi nào nên ghim, và xem được fanpage của tiệm đúng như khách nhìn thấy.",
  ],
  sections: [
    {
      id: "fanpage-salon-la-gi",
      title: "Fanpage cho salon trên VaraaAi là gì và ai thấy bài đăng",
      blocks: [
        { p: "Fanpage là trang tin của salon trên VaraaAi. Dòng giới thiệu ngay trong trang quản trị nói rõ công dụng: đăng khuyến mãi, tác phẩm mới và thông báo. Có hai nhóm người đọc được bài:" },
        {
          ul: [
            "**Khách đã bấm “Theo dõi” salon.** Bài mới hiện ngay trong “Bảng tin” của họ, họ không cần tự vào tìm.",
            "**Bất kỳ ai mở fanpage của salon.** Fanpage là kênh công khai, người chưa theo dõi vẫn xem được bài.",
          ],
        },
        { p: "Điểm đáng giá nằm ở nhóm thứ nhất. Người theo dõi salon phần lớn là khách đã đến tiệm, tức là những người dễ quay lại nhất khi biết tiệm có gì mới. Phía khách, việc theo dõi và đọc bảng tin được mô tả trong bài [theo dõi salon trên VaraaAi](lesson:theo-doi-salon)." },
        { img: { src: img("fanpage-salon-khach-thay-nut-theo-doi-dat-lich"), alt: "Fanpage của Lumi Beauty Paris như khách thấy, có ảnh bìa salon, logo tròn, số bài viết và người theo dõi được khoanh vàng, hai nút Đang theo dõi và Đặt lịch", caption: "Fanpage khách thấy: tên salon, số bài viết, số người theo dõi và nút “Đặt lịch” ngay bên dưới." } },
        { p: "Ở đầu mục “Fanpage” trong trang quản trị có bốn con số: số bài viết, số người theo dõi, lượt thích và bình luận. Nhìn vào đó, bạn biết tiệm đang có bao nhiêu người sẽ nhận được bài tiếp theo." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi đăng bài cho tiệm nail, tóc, spa",
      blocks: [
        { p: "Đăng một bài rất nhanh nếu bạn đã nghĩ xong bốn điều sau:" },
        {
          ul: [
            "**Bài nói về việc gì.** Một bài chỉ nên có một tin: một ưu đãi, một mẫu mới hoặc một thông báo.",
            "**Ảnh hoặc video đi kèm.** Một bài đăng được nhiều ảnh. Ảnh thật của tiệm và tác phẩm thật của thợ thuyết phục hơn ảnh lấy trên mạng.",
            "**Khách nên làm gì sau khi đọc.** Đặt lịch, xem sản phẩm hay gọi điện. Câu trả lời quyết định bạn chọn nút nào dưới bài.",
            "**Đăng ngay hay đăng sau.** Nếu bài cần lên vào một thời điểm khác, bạn dùng “Hẹn giờ”.",
          ],
        },
        { note: "Nút “Đặt lịch ngay” đưa khách sang trang đặt lịch của salon. Hãy chắc rằng dịch vụ trong bài đã có trong [menu dịch vụ salon](lesson:dich-vu) với đúng tên và giá, để khách bấm sang là tìm thấy ngay.", kind: "info", title: "Trước khi gắn nút đặt lịch" },
      ],
    },
    {
      id: "chon-nhan-va-nut",
      title: "Chọn nhãn và nút dưới bài đăng thế nào cho đúng",
      blocks: [
        { p: "“Nhãn” cho khách biết bài thuộc loại gì trước khi đọc chữ. Trên bài đã đăng, nhãn hiện ngay phía trên nội dung. Có bốn nhãn và một lựa chọn “Không nhãn”:" },
        {
          table: {
            head: ["Nhãn", "Gợi ý dùng cho"],
            rows: [
              ["“Khuyến mãi”", "Ưu đãi có thời hạn, giảm giá, quà tặng kèm"],
              ["“Tác phẩm mới”", "Ảnh bộ móng, kiểu tóc, bộ mi thợ vừa làm"],
              ["“Thông báo”", "Đổi giờ mở cửa, ngày nghỉ, dịch vụ mới"],
              ["“Mẹo làm đẹp”", "Lời khuyên chăm sóc sau khi làm dịch vụ"],
            ],
          },
        },
        { p: "“Nút dưới bài” là việc bạn muốn khách làm tiếp theo. Có ba nút và một lựa chọn “Không có”:" },
        {
          table: {
            head: ["Nút dưới bài", "Hợp với bài nào"],
            rows: [
              ["“Đặt lịch ngay”", "Bài khuyến mãi và tác phẩm mới. Khách bấm là sang thẳng trang đặt lịch của salon"],
              ["“Xem sản phẩm”", "Bài giới thiệu sản phẩm tiệm bán"],
              ["“Gọi ngay”", "Bài mà khách cần trao đổi trực tiếp với tiệm"],
              ["“Không có”", "Bài chỉ để thông báo, khách không cần làm gì thêm"],
            ],
          },
        },
        { img: { src: img("chon-nut-duoi-bai-dat-lich-ngay"), alt: "Phần Nút dưới bài được khoanh vàng với các lựa chọn Không có, Đặt lịch ngay đang được chọn, Xem sản phẩm và Gọi ngay, phía trên là các nhãn" } },
        { note: "Thêm nút “Đặt lịch ngay” dưới bài khuyến mãi để khách đặt lịch chỉ với một lần bấm. Một bài ưu đãi không có nút buộc khách phải tự đi tìm trang đặt lịch, và nhiều người sẽ để đó rồi quên.", kind: "tip", title: "Bài khuyến mãi luôn cần nút" },
      ],
    },
    {
      id: "hen-gio-va-ghim",
      title: "Hẹn giờ đăng bài và ghim bài lên đầu fanpage",
      blocks: [
        { p: "Hai nút nhỏ cạnh “Ảnh” và “Video” giải quyết hai vấn đề khác nhau." },
        { h3: "“Hẹn giờ”: viết lúc rảnh, đăng lúc cần" },
        { p: "Bấm “Hẹn giờ”, chọn ngày giờ, và bài sẽ tự đăng đúng lúc đó. Chủ tiệm thường chỉ rảnh tay vào cuối ngày, khi đã đóng cửa. Bạn viết bài vào lúc ấy và hẹn cho bài lên vào ngày hôm sau, thay vì phải nhớ mở máy giữa giờ làm." },
        { h3: "“Ghim lên đầu”: giữ bài quan trọng ở trên cùng" },
        { p: "Bài mới đăng sẽ đẩy bài cũ xuống dưới. Với bài quan trọng, ví dụ ưu đãi đang chạy trong tháng, hãy bấm “Ghim lên đầu” để người mở fanpage thấy nó trước." },
        { img: { src: img("nut-hen-gio-dang-bai-va-ghim-len-dau"), alt: "Ô soạn bài với nút Hẹn giờ được khoanh vàng, bên cạnh là nút Ảnh ghi 1/6 và Video, bên dưới là Ghim lên đầu và nút Đăng bài", caption: "Hàng nút dưới ô soạn bài: “Ảnh”, “Video”, “Hẹn giờ”, “Ghim lên đầu” và nút “Đăng bài”." } },
      ],
    },
    {
      id: "viet-bai-khuyen-mai",
      title: "Cách viết một bài khuyến mãi tiệm nail để khách đặt lịch",
      blocks: [
        { p: "Bài mẫu trong video bài học là một ví dụ gọn: ưu đãi tháng 12, giảm 15% cho mọi dịch vụ gel khi đặt lịch online trước ngày 20, kèm lời hẹn gặp ở tiệm. Con số 15% chỉ là ví dụ minh họa trong video, nhưng cấu trúc của bài thì đáng học." },
        {
          table: {
            head: ["Bài cần trả lời", "Trong bài mẫu của video"],
            rows: [
              ["Ưu đãi gì", "Giảm giá theo phần trăm"],
              ["Cho dịch vụ nào", "Mọi dịch vụ gel"],
              ["Điều kiện", "Đặt lịch online"],
              ["Đến khi nào", "Trước ngày 20"],
            ],
          },
        },
        { p: "Bài có đủ bốn ý này thì khách không phải nhắn tin hỏi lại. Đi kèm là nhãn “Khuyến mãi”, một tấm ảnh và nút “Đặt lịch ngay”." },
        { img: { src: img("bai-khuyen-mai-da-dang-kem-nut-dat-lich-ngay"), alt: "Bài đăng của Lumi Beauty Paris với nhãn Khuyến mãi, nội dung ưu đãi tháng 12, ảnh khách thư giãn trong spa và nút Đặt lịch ngay bên dưới" } },
        { p: "Fanpage đến với khách đã theo dõi salon. Với khách chưa theo dõi, bạn vẫn cần những kênh khác như [link đặt lịch online cho salon](lesson:chia-se-link) hay [email marketing](lesson:email-marketing)." },
      ],
    },
    {
      id: "sau-khi-dang",
      title: "Sau khi đăng bài: xem fanpage, chia sẻ link và vài tình huống",
      blocks: [
        { p: "Bài viết hiện ngay trên Fanpage của salon, kèm ảnh và nút bạn đã chọn. Khách có thể thích, bình luận và chia sẻ. Bốn con số ở đầu mục “Fanpage” thay đổi theo." },
        { img: { src: img("khach-thich-binh-luan-chia-se-bai-dang"), alt: "Phần dưới của bài đăng với ảnh spa, nút Đặt lịch ngay và hàng nút Thích, Bình luận, Chia sẻ được khoanh vàng" } },
        { p: "Bấm “Xem fanpage” để xem trang đúng như khách thấy. Bấm “Sao chép link” để lấy địa chỉ fanpage rồi gửi cho khách qua tin nhắn hoặc gắn vào trang mạng xã hội của tiệm. Người mở link xem được bài ngay vì fanpage là kênh công khai." },
        { img: { src: img("nut-xem-fanpage-va-sao-chep-link"), alt: "Đầu mục Fanpage với nút Xem fanpage và nút Sao chép link được khoanh vàng, bên dưới ô Bài viết đã tăng lên 1", caption: "Sau khi đăng bài đầu tiên, ô “Bài viết” ở đầu mục “Fanpage” ghi 1." } },
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Muốn bài tự đăng vào ngày mai", "Bấm “Hẹn giờ” rồi chọn ngày giờ"],
              ["Ưu đãi bị các bài mới đẩy xuống", "Bấm “Ghim lên đầu” cho bài ưu đãi"],
              ["Khách đọc bài nhưng không đặt lịch", "Gắn nút “Đặt lịch ngay” ở “Nút dưới bài”"],
              ["Muốn biết khách nhìn thấy fanpage ra sao", "Bấm “Xem fanpage”"],
              ["Fanpage còn ít người theo dõi", "Bấm “Sao chép link” và gửi link fanpage cho khách quen"],
            ],
          },
        },
        { p: "Tiệm muốn có thêm một trang giới thiệu đầy đủ, có dịch vụ, đội ngũ và đánh giá, thì xem bài [làm website cho salon](lesson:website-salon). Mục “Trang landing” nằm ngay cạnh mục “Fanpage” trong trang quản trị." },
      ],
    },
  ],
  howTo: {
    title: "Các bước đăng bài khuyến mãi cho salon trên Fanpage VaraaAi",
    id: "cac-buoc-dang-bai-fanpage",
    after: "chuan-bi",
    lead: "Bảy bước dưới đây theo đúng thứ tự trong video bài học, từ ô soạn bài đến lúc xem lại fanpage.",
    steps: [
      {
        name: "Mở mục “Fanpage”",
        text: "Trong trang quản trị, bấm mục “Fanpage”. Trên cùng là số bài viết, số người theo dõi, lượt thích và bình luận. Ô soạn bài nằm ngay bên dưới.",
        image: { src: img("so-bai-viet-nguoi-theo-doi-luot-thich-binh-luan"), alt: "Đầu mục Fanpage với bốn ô số liệu Bài viết, Người theo dõi, Lượt thích và Bình luận được khoanh vàng, bên dưới là ô soạn bài" },
      },
      {
        name: "Viết nội dung vào ô “Hôm nay salon có gì mới?”",
        text: "Gõ nội dung bài vào ô soạn bài. Viết ngắn và đưa tin chính lên câu đầu: ưu đãi gì, cho dịch vụ nào, đến khi nào. Khách lướt bảng tin chỉ đọc vài dòng đầu.",
        image: { src: img("viet-noi-dung-bai-dang-khuyen-mai-salon"), alt: "Ô soạn bài được khoanh vàng với nội dung ưu đãi tháng 12 của Lumi Beauty Paris, bên dưới là ảnh đã thêm và phần Nhãn" },
      },
      {
        name: "Chọn “Nhãn” cho bài",
        text: "Bấm một trong bốn nhãn: “Khuyến mãi”, “Tác phẩm mới”, “Thông báo” hoặc “Mẹo làm đẹp”. Nhãn hiện phía trên nội dung bài, giúp khách nhận ra loại tin trước khi đọc.",
        image: { src: img("chon-nhan-khuyen-mai-tac-pham-moi-thong-bao"), alt: "Phần Nhãn được khoanh vàng với các lựa chọn Không nhãn, Khuyến mãi đang được chọn, Tác phẩm mới, Thông báo và Mẹo làm đẹp" },
      },
      {
        name: "Chọn “Nút dưới bài”",
        text: "Chọn nút khách sẽ bấm sau khi đọc: “Đặt lịch ngay”, “Xem sản phẩm” hoặc “Gọi ngay”. Với bài khuyến mãi, chọn “Đặt lịch ngay” để khách bấm là sang thẳng trang đặt lịch của salon.",
      },
      {
        name: "Bấm “Ảnh” hoặc “Video” để thêm hình",
        text: "Bấm “Ảnh” hoặc “Video” rồi chọn tệp. Một bài đăng được nhiều ảnh; trong video bài học, bộ đếm cạnh nút “Ảnh” ghi 1/6 sau khi thêm tấm đầu tiên. Ảnh đã thêm hiện ngay dưới nội dung để bạn kiểm tra.",
        image: { src: img("them-anh-vao-bai-dang-fanpage-salon"), alt: "Ảnh spa vừa thêm vào bài đăng được khoanh vàng ngay dưới nội dung, bên dưới là phần Nhãn và Nút dưới bài" },
      },
      {
        name: "Bấm “Hẹn giờ” hoặc “Ghim lên đầu” nếu cần",
        text: "Muốn bài tự đăng vào lúc khác, bấm “Hẹn giờ” và chọn ngày giờ. Bài quan trọng thì bấm “Ghim lên đầu”. Cả hai đều không bắt buộc, bài thường ngày có thể bỏ qua bước này.",
      },
      {
        name: "Bấm “Đăng bài” rồi “Xem fanpage”",
        text: "Bấm “Đăng bài”. Bài viết hiện ngay trên Fanpage của salon, kèm ảnh và nút “Đặt lịch ngay”. Sau đó bấm “Xem fanpage” để xem trang như khách thấy, hoặc “Sao chép link” để gửi cho khách.",
        image: { src: img("bam-nut-dang-bai-len-fanpage"), alt: "Nút Đăng bài màu đen ở cuối ô soạn bài được khoanh vàng, phía trên là các nút Ảnh, Video, Hẹn giờ và Ghim lên đầu" },
      },
    ],
  },
  faq: [
    {
      q: "Ai thấy bài đăng trên Fanpage của salon trên VaraaAi?",
      a: "Khách đã bấm “Theo dõi” salon thấy bài mới ngay trong “Bảng tin” của họ. Ngoài ra fanpage là kênh công khai của salon, nên ai cũng xem được bài trên fanpage.",
    },
    {
      q: "Làm sao hẹn giờ để bài tự đăng vào ngày mai?",
      a: "Trong ô soạn bài, bấm “Hẹn giờ” rồi chọn ngày giờ. Bài sẽ tự đăng đúng lúc đó, bạn không cần mở máy lại.",
    },
    {
      q: "Nút nào dưới bài giúp khách đặt lịch nhanh nhất?",
      a: "Nút “Đặt lịch ngay”. Khách bấm nút là sang thẳng trang đặt lịch của salon, nên đây là nút nên gắn dưới mọi bài khuyến mãi.",
    },
    {
      q: "Bài đăng trên Fanpage có những nhãn nào?",
      a: "Có bốn nhãn: “Khuyến mãi”, “Tác phẩm mới”, “Thông báo” và “Mẹo làm đẹp”. Bạn cũng có thể chọn “Không nhãn” nếu bài không thuộc loại nào.",
    },
    {
      q: "“Ghim lên đầu” dùng khi nào?",
      a: "Dùng cho bài quan trọng mà bạn muốn khách thấy trước, ví dụ một ưu đãi đang chạy. Bấm “Ghim lên đầu” trong ô soạn bài trước khi đăng.",
    },
    {
      q: "Làm sao gửi fanpage của salon cho khách?",
      a: "Trong mục “Fanpage” của trang quản trị, bấm “Sao chép link” để lấy địa chỉ fanpage rồi gửi cho khách. Bạn cũng có thể bấm “Xem fanpage” để xem trang đúng như khách thấy trước khi chia sẻ.",
    },
  ],
  related: ["website-salon", "chia-se-link", "email-marketing", "theo-doi-salon"],
};

export default article;
