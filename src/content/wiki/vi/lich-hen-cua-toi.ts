import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lich-hen-cua-toi/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-huy-lich-hen-lam-dep",
  lesson: "lich-hen-cua-toi",
  category: "booking",
  title: "Cách hủy lịch hẹn làm đẹp và xem lại lịch đã đặt trên VaraaAi",
  metaTitle: "Cách hủy lịch hẹn làm đẹp, xem lại lịch đã đặt | VaraaAi",
  metaDescription:
    "Hướng dẫn xem lại và hủy lịch hẹn làm đẹp trong mục Lịch hẹn của tôi trên VaraaAi: đọc thông tin đặt chỗ, chính sách hủy của salon và cách xử lý khi quá hạn.",
  keyword: "hủy lịch hẹn làm đẹp",
  keywords: [
    "cách hủy lịch hẹn salon",
    "xem lại lịch hẹn đã đặt",
    "hủy lịch làm nail",
    "chính sách hủy lịch hẹn",
    "đổi giờ hẹn làm đẹp",
    "Lịch hẹn của tôi VaraaAi",
  ],
  excerpt: "Mở “Lịch hẹn của tôi” để xem lại giờ hẹn, địa chỉ salon và tự hủy lịch trong thời hạn salon cho phép, không cần gọi điện.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-xem-lai-lich-hen-lam-dep-tren-dien-thoai"),
    alt: "Cô gái tóc vàng quàng khăn màu mận ngồi bên cửa sổ, chăm chú xem điện thoại, trên bàn có tách cà phê",
  },
  takeaways: [
    "Mọi lịch đã đặt nằm trong mục **“Lịch hẹn của tôi”**, mở bằng cách bấm vào tên bạn ở góc trên.",
    "Bấm “Xem thông tin đặt chỗ” để thấy nhân viên, giờ hẹn, **địa chỉ và số điện thoại** của salon.",
    "Muốn hủy: bấm “Huỷ lịch hẹn”, đọc “Chính sách hủy đặt chỗ”, rồi bấm “Xác nhận hủy”.",
    "Mỗi salon đặt **thời hạn tự hủy** riêng, ví dụ đến 24 giờ trước giờ hẹn. Quá thời hạn thì liên hệ trực tiếp với salon.",
    "Lịch hủy xong chuyển sang trạng thái “Đã huỷ”. Hủy sớm giúp salon kịp nhận khách khác.",
  ],
  intro: [
    "Khi có việc đột xuất và cần hủy lịch hẹn làm đẹp, hoặc chỉ muốn xem lại mình đã hẹn mấy giờ ở tiệm nào, bạn không phải gọi cho salon và chờ người nghe máy. Trên VaraaAi, cả hai việc đều tự làm được trong mục “Lịch hẹn của tôi”.",
    "Bài viết đi theo bài học “Xem và huỷ lịch hẹn” trong VaraaAi Academy. Bạn sẽ biết mở lịch hẹn ở đâu, đọc thông tin đặt chỗ ra sao, hủy lịch đúng cách trong thời hạn salon cho phép, và làm gì khi đã quá thời hạn đó.",
  ],
  sections: [
    {
      id: "lich-hen-cua-toi-co-gi",
      title: "Mục “Lịch hẹn của tôi” cho bạn biết những gì",
      blocks: [
        { p: "Đây là danh sách mọi lịch bạn đã đặt bằng tài khoản của mình. Mỗi lịch là một thẻ riêng, và chỉ cần nhìn thẻ là bạn nắm được những điều chính mà không phải mở thêm gì." },
        {
          table: {
            head: ["Bạn muốn biết", "Xem ở đâu"],
            rows: [
              ["Hẹn ở tiệm nào, làm dịch vụ gì", "Hai dòng đầu của thẻ: tên salon và tên dịch vụ"],
              ["Ngày giờ hẹn", "Dòng ngày giờ ngay dưới tên dịch vụ"],
              ["Số tiền", "Con số ở góc trái phía dưới của thẻ"],
              ["Lịch đã được nhận chưa", "Nhãn trạng thái, ví dụ “Đã xác nhận”"],
              ["Ai làm cho mình, tiệm ở đâu, gọi số nào", "Bấm “Xem thông tin đặt chỗ”"],
            ],
          },
        },
        { img: { src: img("danh-sach-lich-hen-voi-nut-xem-thong-tin-va-danh-gia"), alt: "Danh sách Lịch hẹn của tôi gồm hai thẻ có số tiền, nhãn Đã xác nhận, nút Xem thông tin đặt chỗ và Đánh giá", caption: "Mỗi lịch hẹn là một thẻ với số tiền, trạng thái và các nút thao tác." } },
        { p: "Bạn cần đăng nhập để thấy mục này. Nếu lần đầu đặt lịch bạn đã nhập email và mật khẩu ở bước điền thông tin thì tài khoản đã có sẵn. Chưa rõ cách đăng nhập hay quên mật khẩu, bạn xem bài [tạo tài khoản và đăng nhập](lesson:tai-khoan)." },
      ],
    },
    {
      id: "thoi-han-tu-huy",
      title: "Thời hạn tự hủy và chính sách hủy lịch hẹn của salon",
      blocks: [
        { p: "VaraaAi không đặt một thời hạn hủy chung cho mọi tiệm. Mỗi salon tự quy định trong chính sách hủy của mình, và bạn gặp chính sách này hai lần: lúc xác nhận đặt lịch, và lúc bấm “Huỷ lịch hẹn”. Trong video bài học, salon mẫu ghi: bạn có thể tự hủy đến 24 giờ trước giờ hẹn." },
        { p: "Thời hạn này có lý do thực tế. Một giờ hẹn bị bỏ trống sát giờ thì salon gần như không kịp nhận khách khác, còn người thợ đã được xếp lịch thì ngồi chờ. Hủy càng sớm, giờ đó càng dễ đến tay một khách đang cần." },
        { note: "Nếu đã quá thời hạn tự hủy, bạn hãy liên hệ trực tiếp với salon. Salon có thể hủy hoặc dời lịch giúp bạn. Số điện thoại của tiệm nằm ngay trong “Xem thông tin đặt chỗ”.", kind: "warn", title: "Quá thời hạn tự hủy" },
      ],
    },
    {
      id: "doi-gio-hen",
      title: "Muốn đổi giờ hẹn thay vì hủy",
      blocks: [
        { p: "Bài học chỉ hướng dẫn hai việc khách tự làm được trong mục này: xem và hủy. Việc dời lịch sang giờ khác do salon làm giúp bạn. Vì vậy khi muốn đổi giờ, cách gọn nhất là báo cho salon biết bạn muốn chuyển sang lúc nào." },
        {
          ul: [
            "**Gọi điện:** số điện thoại của salon có trong “Xem thông tin đặt chỗ”.",
            "**Nhắn tin:** mở trang của salon và dùng nút [“Chat với Salon”](lesson:chat-voi-salon), salon trả lời ngay trong khung chat.",
            "**Tự đặt lại:** nếu còn trong thời hạn tự hủy, bạn có thể hủy lịch cũ rồi [đặt một lịch mới](lesson:dat-lich-online) vào giờ phù hợp hơn.",
          ],
        },
        { note: "Khi tự đặt lại, hãy xem trước salon còn giờ trống vào hôm bạn muốn hay không rồi mới hủy lịch cũ. Hủy trước, đến lúc đặt mới biết ngày đó đã kín thì bạn mất cả hai.", kind: "tip", title: "Kinh nghiệm" },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp với lịch hẹn đã đặt",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Quên mất giờ hẹn", "Mở “Lịch hẹn của tôi”, ngày giờ ghi ngay trên thẻ"],
              ["Không nhớ địa chỉ tiệm", "Bấm “Xem thông tin đặt chỗ”, địa chỉ và số điện thoại salon nằm trong ô chi tiết"],
              ["Bấm nhầm “Huỷ lịch hẹn”", "Ở màn hình chính sách hủy, bấm “Không hủy” thay cho “Xác nhận hủy”. Lịch vẫn giữ nguyên"],
              ["Đã quá thời hạn tự hủy", "Liên hệ trực tiếp với salon để nhờ hủy hoặc dời lịch"],
              ["Hủy rồi nhưng muốn đến lại", "Đặt một lịch mới ở trang của salon"],
              ["Không thấy lịch nào trong danh sách", "Kiểm tra bạn đã đăng nhập đúng tài khoản dùng lúc đặt lịch"],
            ],
          },
        },
      ],
    },
    {
      id: "sau-buoi-hen",
      title: "Sau buổi hẹn: quay lại để đánh giá",
      blocks: [
        { p: "Mục “Lịch hẹn của tôi” còn dùng được sau khi bạn đã làm đẹp xong. Trên thẻ lịch hẹn có nút “Đánh giá”. Bấm vào đó để chấm sao và viết vài dòng cảm nhận về buổi làm. Cách viết được hướng dẫn trong bài [viết đánh giá sau khi làm đẹp](lesson:viet-danh-gia)." },
        { p: "Nếu bạn đến tiệm này thường xuyên, hãy hỏi salon về [thẻ thành viên](lesson:the-thanh-vien): mỗi lần đến được cộng một vé, đủ vé thì được giảm giá. Và để mở lịch hẹn nhanh hơn, bạn có thể [cài app VaraaAi](/app) ra màn hình chính của điện thoại." },
      ],
    },
  ],
  howTo: {
    title: "Các bước xem lại và hủy lịch hẹn làm đẹp trên VaraaAi",
    id: "cac-buoc-huy-lich-hen",
    after: "lich-hen-cua-toi-co-gi",
    lead: "Ba bước đầu là xem lại lịch, ba bước sau là hủy. Nếu chỉ cần kiểm tra giờ hẹn, bạn dừng ở bước ba.",
    steps: [
      {
        name: "Mở “Lịch hẹn của tôi”",
        text: "Đăng nhập vào VaraaAi. Bấm vào tên bạn ở góc trên của trang, rồi chọn “Lịch hẹn của tôi” trong danh sách vừa mở. Các lịch bạn đã đặt hiện ra thành từng thẻ.",
        image: { src: img("mo-lich-hen-cua-toi-tu-ten-tai-khoan"), alt: "Trang Lịch hẹn của tôi trên VaraaAi, nút tài khoản ở góc trên bên phải được khoanh vàng, bên dưới là hai thẻ lịch hẹn" },
      },
      {
        name: "Đọc thẻ lịch hẹn",
        text: "Mỗi thẻ ghi tên salon, dịch vụ, ngày giờ, số tiền và trạng thái, ví dụ “Đã xác nhận”. Tìm đúng lịch bạn cần trước khi bấm gì, nhất là khi bạn có vài lịch ở cùng một tiệm.",
        image: { src: img("the-lich-hen-ghi-salon-dich-vu-ngay-gio-so-tien"), alt: "Thẻ lịch hẹn được khoanh vàng ghi tên salon, dịch vụ, ngày giờ, số tiền 60 euro và nhãn Đã xác nhận" },
      },
      {
        name: "Bấm “Xem thông tin đặt chỗ”",
        text: "Một ô chi tiết mở ra với tên nhân viên, giờ hẹn, địa chỉ và số điện thoại của salon. Đây là nơi lấy địa chỉ để tìm đường, hoặc lấy số điện thoại khi cần gọi cho tiệm.",
        image: { src: img("xem-thong-tin-dat-cho-nhan-vien-dia-chi-salon"), alt: "Ô chi tiết lịch hẹn hiện tên salon, dịch vụ, nhân viên Emma, giờ hẹn, địa chỉ, số điện thoại và số tiền" },
      },
      {
        name: "Bấm “Huỷ lịch hẹn”",
        text: "Nếu cần hủy, nút “Huỷ lịch hẹn” nằm ở cuối ô chi tiết đó. Bấm vào nút này chưa hủy ngay lịch của bạn: màn hình sẽ cho bạn đọc chính sách của salon trước.",
        image: { src: img("bam-huy-lich-hen-lam-dep"), alt: "Ô chi tiết lịch hẹn trên VaraaAi với nút Huỷ lịch hẹn viền đỏ được khoanh vàng ở phía dưới" },
      },
      {
        name: "Đọc “Chính sách hủy đặt chỗ” rồi bấm “Xác nhận hủy”",
        text: "Phần “Chính sách hủy đặt chỗ” cho biết bạn được tự hủy đến khi nào, ví dụ đến 24 giờ trước giờ hẹn. Đọc xong, bấm “Xác nhận hủy” để hủy thật. Đổi ý thì bấm “Không hủy”.",
        image: { src: img("chinh-sach-huy-dat-cho-va-nut-xac-nhan-huy"), alt: "Màn hình hủy lịch hiện Chính sách hủy đặt chỗ của salon, bên dưới là nút Xác nhận hủy và nút Không hủy" },
      },
      {
        name: "Kiểm tra trạng thái “Đã huỷ”",
        text: "Quay lại danh sách, lịch vừa hủy mang nhãn “Đã huỷ” thay cho “Đã xác nhận”. Thấy nhãn này là việc hủy đã xong và giờ đó được trả lại cho salon.",
        image: { src: img("lich-hen-chuyen-sang-trang-thai-da-huy"), alt: "Danh sách Lịch hẹn của tôi, thẻ lịch hẹn đầu tiên được khoanh vàng và mang nhãn trạng thái Đã huỷ" },
      },
    ],
  },
  faq: [
    {
      q: "Hủy lịch hẹn làm đẹp trên VaraaAi ở đâu?",
      a: "Đăng nhập, bấm vào tên bạn ở góc trên và chọn “Lịch hẹn của tôi”. Ở lịch cần hủy, bấm “Xem thông tin đặt chỗ”, bấm “Huỷ lịch hẹn”, đọc chính sách hủy rồi bấm “Xác nhận hủy”.",
    },
    {
      q: "Được hủy lịch hẹn trước bao lâu?",
      a: "Tùy từng salon. Mỗi salon đặt thời hạn tự hủy riêng và ghi trong “Chính sách hủy đặt chỗ”, phần này hiện ra khi bạn bấm “Huỷ lịch hẹn”. Ví dụ trong bài học là được tự hủy đến 24 giờ trước giờ hẹn.",
    },
    {
      q: "Quá thời hạn tự hủy thì phải làm gì?",
      a: "Liên hệ trực tiếp với salon. Salon có thể hủy hoặc dời lịch giúp bạn. Số điện thoại của salon có trong “Xem thông tin đặt chỗ” của lịch hẹn đó.",
    },
    {
      q: "Muốn đổi giờ hẹn thì làm thế nào?",
      a: "Báo cho salon qua điện thoại hoặc tin nhắn để nhờ dời lịch. Nếu còn trong thời hạn tự hủy, bạn cũng có thể hủy lịch cũ và đặt một lịch mới vào giờ khác.",
    },
    {
      q: "Làm sao biết lịch hẹn đã hủy thành công?",
      a: "Sau khi bạn bấm “Xác nhận hủy”, lịch hẹn trong danh sách chuyển sang trạng thái “Đã huỷ”. Nếu thẻ vẫn ghi “Đã xác nhận” thì lịch chưa được hủy.",
    },
    {
      q: "Xem địa chỉ và số điện thoại của salon đã đặt ở đâu?",
      a: "Trong “Lịch hẹn của tôi”, bấm “Xem thông tin đặt chỗ” trên lịch hẹn. Ô chi tiết ghi tên nhân viên, giờ hẹn, địa chỉ và số điện thoại của salon.",
    },
  ],
  related: ["chat-voi-salon", "viet-danh-gia", "dat-lich-online", "tai-khoan"],
};

export default article;
