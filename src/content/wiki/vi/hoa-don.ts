import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/hoa-don/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "xem-lai-hoa-don-salon-bang-ma-qr",
  lesson: "hoa-don",
  category: "booking",
  title: "Xem lại hóa đơn bằng mã QR sau khi làm đẹp: quét tại quầy hoặc mở từ email",
  metaTitle: "Xem lại hóa đơn bằng mã QR sau khi làm đẹp ở salon",
  metaDescription:
    "Cách xem lại hóa đơn bằng mã QR sau buổi làm đẹp: quét mã trên màn hình của salon, đọc dịch vụ, thuế, tổng tiền, lưu đường link hoặc nhận hóa đơn qua email.",
  keyword: "xem lại hóa đơn bằng mã QR",
  keywords: [
    "hóa đơn làm đẹp trên điện thoại",
    "quét mã QR lấy hóa đơn salon",
    "xin hóa đơn tiệm nail gửi công ty",
    "nhận hóa đơn salon qua email",
    "lưu hóa đơn làm tóc",
    "hóa đơn điện tử salon",
  ],
  excerpt: "Quét mã QR trên màn hình của salon khi thanh toán, hóa đơn mở ngay trên điện thoại. Không ở quầy thì nhờ nhân viên gửi qua email.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-thanh-toan-tai-quay-salon-va-nhan-hoa-don-tren-dien-thoai"),
    alt: "Khách nữ cầm điện thoại đứng tại quầy salon, nhân viên nam tóc vàng tươi cười, trên quầy có máy thanh toán thẻ",
  },
  takeaways: [
    "Khi thanh toán ở quầy, nhờ nhân viên bấm **“Hiện mã QR”** trên màn hình của salon.",
    "Mở camera điện thoại và quét mã: hóa đơn mở ra ngay trong trình duyệt.",
    "Hóa đơn ghi tên salon, số hóa đơn, ngày giờ, dịch vụ, thuế, tổng tiền và cách thanh toán.",
    "**Chụp màn hình** hoặc **lưu đường link** để xem lại bất cứ lúc nào.",
    "Không có mặt ở quầy thì nhờ nhân viên gửi hóa đơn qua email, rồi bấm vào đường link trong email.",
  ],
  intro: [
    "Tờ hóa đơn giấy sau buổi làm đẹp thường nằm trong túi áo vài hôm rồi biến mất, đúng lúc bạn cần nó để đối chiếu chi tiêu hay gửi cho công ty. Với các salon dùng VaraaAi, bạn xem lại hóa đơn bằng mã QR: quét một lần ở quầy là hóa đơn nằm trong điện thoại.",
    "Bài viết đi theo bài học “Xem lại hoá đơn bằng mã QR” trong VaraaAi Academy. Bạn sẽ biết nhờ nhân viên bấm nút nào, quét mã ra sao, đọc từng phần của hóa đơn, cách giữ lại để tìm được về sau, và làm gì khi bạn không đứng ở quầy.",
  ],
  sections: [
    {
      id: "hoa-don-tren-dien-thoai",
      title: "Hóa đơn trên điện thoại dùng vào việc gì",
      blocks: [
        { p: "Bài học nêu hai lý do khách muốn giữ hóa đơn: để xem lại, và để gửi cho công ty. Lý do thứ nhất quen thuộc với ai hay theo dõi chi tiêu: bạn muốn biết lần trước làm dịch vụ gì, hết bao nhiêu, trả bằng cách nào. Lý do thứ hai gặp ở những người được công ty chi trả một phần chi phí và cần chứng từ kèm theo." },
        { p: "Cả hai việc đều dễ hơn khi hóa đơn là một đường link thay vì một tờ giấy. Đường link không nhàu, không phai mực, và chuyển tiếp cho người khác chỉ mất vài giây." },
        { note: "Bạn không cần ứng dụng riêng để nhận hóa đơn. Bài học dùng camera có sẵn của điện thoại để quét mã, và hóa đơn mở trong trình duyệt.", kind: "info", title: "Cần chuẩn bị gì" },
      ],
    },
    {
      id: "doc-hoa-don",
      title: "Đọc hóa đơn: từng phần cho bạn biết gì",
      blocks: [
        { p: "Hóa đơn mở ra theo thứ tự từ trên xuống: ai bán, bán cho ai, bán gì, bao nhiêu tiền. Bảng dưới đây đi theo hóa đơn mẫu trong video bài học." },
        {
          table: {
            head: ["Phần trên hóa đơn", "Nội dung"],
            rows: [
              ["Tên salon", "Tên và địa chỉ của nơi bạn đã làm dịch vụ"],
              ["Số hóa đơn và ngày giờ", "Mã riêng của hóa đơn và thời điểm lập. Đây là thứ cần đọc khi bạn hỏi lại salon về một lần thanh toán"],
              ["Mã QR “Quét để xem lại hóa đơn”", "Mã để mở lại chính hóa đơn này về sau"],
              ["Dịch vụ", "Từng dịch vụ bạn đã làm, kèm số lượng, đơn giá và thành tiền"],
              ["Thuế và tổng tiền", "Phần tạm tính, tiền thuế và tổng cộng bạn đã trả"],
              ["Cách thanh toán", "Bạn đã trả bằng hình thức nào, ví dụ tiền mặt"],
            ],
          },
        },
        { img: { src: img("thue-tong-tien-va-hinh-thuc-thanh-toan"), alt: "Phần cuối hóa đơn trên điện thoại được khoanh vàng, gồm tạm tính, thuế VAT, tổng cộng và hình thức thanh toán tiền mặt", caption: "Thuế, tổng tiền và cách thanh toán nằm ở cuối hóa đơn." } },
        { p: "Nên đọc lướt hóa đơn ngay tại quầy. Nếu thấy thiếu một dịch vụ hoặc số tiền khác với số bạn vừa trả, nói với nhân viên lúc đó sẽ dễ sửa hơn nhiều so với vài ngày sau." },
      ],
    },
    {
      id: "quet-ma-hay-nhan-email",
      title: "Quét mã tại quầy hay nhận hóa đơn qua email",
      blocks: [
        { p: "Có hai đường để hóa đơn đến với bạn, và cả hai dẫn đến cùng một trang hóa đơn." },
        {
          table: {
            head: ["Cách nhận", "Bạn làm gì", "Hợp khi"],
            rows: [
              ["Quét mã QR tại quầy", "Nhờ nhân viên bấm “Hiện mã QR”, quét bằng camera điện thoại", "Bạn đang đứng ở quầy và có điện thoại trong tay"],
              ["Nhận qua email", "Nhờ nhân viên gửi hóa đơn qua email, mở email và bấm vào đường link", "Bạn đã rời tiệm, điện thoại hết pin, hoặc người khác trả tiền thay"],
            ],
          },
        },
        { note: "Khi nhờ gửi qua email, hãy đọc chậm địa chỉ email cho nhân viên và nhờ họ đọc lại. Sai một ký tự là hóa đơn đi nhầm chỗ.", kind: "tip", title: "Đọc email cho rõ" },
      ],
    },
    {
      id: "giu-hoa-don",
      title: "Giữ hóa đơn thế nào để tìm lại được",
      blocks: [
        { p: "Bài học gợi ý hai cách giữ: chụp màn hình, hoặc lưu lại đường link. Mỗi cách có chỗ mạnh riêng." },
        {
          ul: [
            "**Chụp màn hình:** nhanh nhất, xem được cả khi không có mạng. Hóa đơn dài thì bạn cần chụp hai tấm để đủ phần dịch vụ và phần tổng tiền.",
            "**Lưu đường link:** mở lại được nguyên hóa đơn. Bạn có thể đánh dấu trang trong trình duyệt, hoặc tự gửi link cho mình qua một ứng dụng nhắn tin.",
            "**Mã QR trên hóa đơn:** trên hóa đơn có sẵn mã “Quét để xem lại hóa đơn”. Nếu bạn đã chụp màn hình phần đầu hóa đơn, lần sau chỉ cần quét lại mã trong tấm ảnh đó.",
          ],
        },
        { img: { src: img("dich-vu-va-don-gia-tren-hoa-don"), alt: "Hóa đơn trên điện thoại với dòng dịch vụ Gel manicure, số lượng, đơn giá và thành tiền được khoanh vàng", caption: "Khi chụp màn hình, nhớ lấy đủ phần dịch vụ và phần tổng tiền." } },
        { note: "Công ty cần loại chứng từ nào để hoàn tiền là quy định riêng của từng công ty và từng nước. Trước khi gửi, hãy hỏi bộ phận kế toán xem một đường link hay ảnh chụp hóa đơn đã đủ chưa, hay họ cần thêm thông tin nào từ salon.", kind: "warn", title: "Gửi hóa đơn cho công ty" },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi lấy hóa đơn ở salon",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Nhân viên không tự đưa mã", "Nói rõ bạn muốn lấy hóa đơn và nhờ họ bấm “Hiện mã QR” trên màn hình của salon"],
              ["Camera không nhận mã", "Đưa điện thoại lại gần hơn, giữ yên tay và tránh để màn hình bị lóa"],
              ["Đã rời tiệm mới nhớ ra", "Liên hệ salon và nhờ gửi hóa đơn qua email"],
              ["Lỡ đóng trang hóa đơn", "Mở lại đường link đã lưu, hoặc quét mã QR trong ảnh chụp hóa đơn"],
              ["Hóa đơn ghi thiếu hoặc sai dịch vụ", "Báo ngay với nhân viên tại quầy để salon kiểm tra lại"],
            ],
          },
        },
        { p: "Muốn liên hệ salon sau khi đã về nhà, bạn có thể [nhắn tin cho salon](lesson:chat-voi-salon) trên VaraaAi, hoặc lấy số điện thoại của tiệm trong [Lịch hẹn của tôi](lesson:lich-hen-cua-toi). Mục này cũng là nơi xem lại ngày giờ và số tiền của từng lần hẹn." },
        { p: "Nếu lần thanh toán có dùng [thẻ quà tặng](lesson:the-qua-tang), hoặc bạn đang tích vé bằng [thẻ thành viên](lesson:the-thanh-vien), quầy thanh toán cũng là lúc đưa mã thẻ cho nhân viên." },
        { note: "Phía salon nhận thanh toán tại quầy, gửi hóa đơn qua email hoặc cho khách quét mã QR trong trang quản trị. Xem bài [Thanh toán tại quầy và hoá đơn](lesson:thanh-toan-hoa-don).", kind: "info", title: "Bạn là chủ salon?" },
      ],
    },
  ],
  howTo: {
    title: "Các bước xem lại hóa đơn bằng mã QR",
    id: "cac-buoc-xem-hoa-don",
    after: "hoa-don-tren-dien-thoai",
    lead: "Ba bước đầu làm ngay tại quầy và mất chưa đến một phút. Các bước sau dành cho lúc bạn không ở quầy hoặc muốn mở lại hóa đơn.",
    steps: [
      {
        name: "Nhờ nhân viên bấm “Hiện mã QR”",
        text: "Sau khi bạn trả tiền, màn hình của salon báo đã xác nhận thanh toán kèm số hóa đơn và số tiền. Nhờ nhân viên bấm “Hiện mã QR”. Một mã QR hiện ra trên màn hình, dành cho khách quét.",
        image: { src: img("man-hinh-salon-da-xac-nhan-thanh-toan"), alt: "Màn hình của salon báo Đã xác nhận thanh toán kèm số hóa đơn và số tiền, bên dưới là ô gửi qua email" },
      },
      {
        name: "Quét mã bằng camera điện thoại",
        text: "Mở camera điện thoại và hướng vào mã QR. Bấm vào đường dẫn điện thoại gợi ý. Hóa đơn mở ra ngay trong trình duyệt.",
        image: { src: img("ma-qr-hoa-don-tren-man-hinh-cua-salon"), alt: "Mã QR trên màn hình của salon được khoanh vàng, bên dưới có dòng chữ khách quét mã để tải hóa đơn" },
      },
      {
        name: "Đọc hóa đơn",
        text: "Kiểm tra tên salon, số hóa đơn và ngày giờ ở phần đầu. Kéo xuống để xem dịch vụ bạn đã làm, thuế, tổng tiền và cách thanh toán. Thấy điều gì chưa đúng thì hỏi nhân viên ngay.",
        image: { src: img("hoa-don-mo-tren-dien-thoai-sau-khi-quet-ma"), alt: "Phần đầu hóa đơn trên điện thoại được khoanh vàng, ghi tên salon, địa chỉ, số hóa đơn, ngày giờ và một mã QR nhỏ" },
      },
      {
        name: "Chụp màn hình hoặc lưu đường link",
        text: "Chụp màn hình hóa đơn, hoặc lưu lại đường link của trang, để xem lại bất cứ lúc nào. Nếu cần gửi cho công ty, đường link là thứ tiện chuyển tiếp nhất.",
      },
      {
        name: "Không ở quầy: nhờ gửi hóa đơn qua email",
        text: "Nếu bạn không có mặt ở quầy, nhân viên có thể gửi hóa đơn qua email cho bạn. Mở email và bấm vào đường link, hóa đơn mở ra giống hệt khi quét mã.",
        image: { src: img("gui-hoa-don-qua-email-cho-khach"), alt: "Màn hình của salon với ô Gửi hóa đơn qua email và nút Gửi được khoanh vàng, phía dưới là nút Hiện mã QR" },
      },
      {
        name: "Lần sau: quét lại mã QR trên hóa đơn",
        text: "Trên hóa đơn có sẵn một mã QR kèm dòng “Quét để xem lại hóa đơn”. Khi cần mở lại, bạn quét mã này thay vì đi tìm đường link cũ.",
        image: { src: img("ma-qr-quet-de-xem-lai-hoa-don"), alt: "Hóa đơn của salon trên điện thoại, mã QR nhỏ cạnh số hóa đơn được khoanh vàng với dòng quét để xem lại hóa đơn" },
      },
    ],
  },
  faq: [
    {
      q: "Làm sao lấy hóa đơn về điện thoại khi đang ở quầy salon?",
      a: "Nhờ nhân viên bấm “Hiện mã QR” trên màn hình của salon, rồi mở camera điện thoại và quét mã. Hóa đơn mở ra ngay trong trình duyệt.",
    },
    {
      q: "Hóa đơn của salon hiển thị những gì?",
      a: "Tên salon, số hóa đơn, ngày giờ, các dịch vụ bạn đã làm, thuế, tổng tiền và cách thanh toán. Đủ thông tin để bạn lưu lại hoặc gửi cho công ty.",
    },
    {
      q: "Tôi đã rời salon thì nhận hóa đơn thế nào?",
      a: "Nhờ nhân viên gửi hóa đơn qua email. Email có một đường link, bạn bấm vào là xem được hóa đơn mà không cần quay lại tiệm.",
    },
    {
      q: "Làm sao xem lại hóa đơn cũ?",
      a: "Mở ảnh chụp màn hình hoặc đường link bạn đã lưu. Trên hóa đơn cũng có sẵn mã QR “Quét để xem lại hóa đơn”, lần sau chỉ cần quét lại mã đó.",
    },
    {
      q: "Có cần cài ứng dụng để quét mã hóa đơn không?",
      a: "Bài học dùng camera có sẵn của điện thoại để quét, và hóa đơn mở trong trình duyệt. Bạn không cần giấy tờ hay thiết bị nào khác ngoài chiếc điện thoại.",
    },
    {
      q: "Hóa đơn này có gửi cho công ty được không?",
      a: "Hóa đơn có tên salon, số hóa đơn, dịch vụ, thuế, tổng tiền và cách thanh toán, và bạn chuyển tiếp được bằng đường link hoặc ảnh chụp. Công ty chấp nhận loại chứng từ nào thì tùy quy định của công ty, nên hãy hỏi bộ phận kế toán của bạn.",
    },
  ],
  related: ["the-qua-tang", "the-thanh-vien", "theo-doi-salon", "lich-hen-cua-toi"],
};

export default article;
