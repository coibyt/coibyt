import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-thanh-vien/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "the-thanh-vien-salon-tich-ve",
  lesson: "the-thanh-vien",
  category: "booking",
  title: "Thẻ thành viên salon trên VaraaAi: cách tích vé, mời bạn bè và nhận giảm giá",
  metaTitle: "Thẻ thành viên salon: tích vé, mời bạn bè, nhận giảm giá",
  metaDescription:
    "Thẻ thành viên salon trên VaraaAi dùng thế nào: mở thẻ có mã QR, nhờ nhân viên quét để cộng vé mỗi lần đến, mời bạn bè nhận thêm 2 vé, đủ vé được giảm giá.",
  keyword: "thẻ thành viên salon",
  keywords: [
    "thẻ tích điểm salon",
    "thẻ tích điểm làm nail",
    "tích vé làm đẹp",
    "mời bạn bè nhận vé",
    "thẻ khách quen salon dùng thế nào",
    "mã QR thẻ thành viên",
  ],
  excerpt: "Mỗi lần đến salon quen được cộng một vé, đủ vé được giảm giá, mời bạn bè đến lần đầu được thêm hai vé. Thẻ nằm ngay trong tài khoản VaraaAi.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-quen-lam-mong-tai-salon-co-the-thanh-vien"),
    alt: "Thợ nail tóc vàng mặc áo len kem đang sơn móng cho khách nữ tóc nâu đỏ tại bàn gỗ trong salon sáng sủa",
  },
  takeaways: [
    "Thẻ do **salon kích hoạt** và gửi cho bạn qua email. Xem thẻ: bấm vào tên bạn ở góc trên, chọn “Thẻ tích điểm”.",
    "Mỗi lần đến salon, đưa **mã QR trên thẻ** cho nhân viên quét để được cộng 1 vé.",
    "Thẻ ghi số vé bạn đang có và còn mấy vé nữa thì được giảm giá.",
    "Gửi link mời cho bạn bè: khi họ đặt lịch qua link và **đến salon lần đầu**, bạn được cộng thêm 2 vé.",
    "Đủ vé thì báo với nhân viên ở lần làm tiếp theo để được giảm giá.",
  ],
  intro: [
    "Thẻ thành viên salon là cách tiệm cảm ơn những khách quay lại đều đặn: mỗi lần làm đẹp bạn được một vé, đủ số vé thì được giảm giá. Trên VaraaAi, tấm thẻ này không phải thẻ giấy dễ quên ở nhà. Nó nằm trong tài khoản của bạn, có mã QR riêng và tự đếm vé.",
    "Bài viết đi theo bài học “Thẻ thành viên: tích vé và mời bạn bè” trong VaraaAi Academy. Bạn sẽ biết xin thẻ ở đâu, mở thẻ thế nào, làm gì ở quầy để được cộng vé, và cách mời bạn bè để nhận thêm vé thưởng.",
  ],
  sections: [
    {
      id: "the-thanh-vien-la-gi",
      title: "Thẻ thành viên salon là gì và ai nên có",
      blocks: [
        { p: "Đây là thẻ tích điểm của riêng từng salon. Bạn có thể có thẻ của tiệm nail quen, một thẻ khác của tiệm tóc, và mỗi thẻ đếm vé riêng. Nếu bạn đến cùng một tiệm vài tuần một lần để dặm móng, dặm mi hay cắt tóc, tấm thẻ biến những lần đến đó thành một khoản giảm giá." },
        { p: "Trên thẻ có bốn thứ đáng nhìn:" },
        {
          ul: [
            "**Tên salon và phần thưởng:** dòng nhỏ dưới tên salon cho biết cần bao nhiêu vé và được giảm bao nhiêu. Trong video bài học, thẻ ghi đủ 5 vé thì được giảm 15%.",
            "**Mã QR riêng:** thứ nhân viên quét mỗi lần bạn đến.",
            "**Số vé:** bạn đang có mấy vé trên tổng số cần, kèm dòng cho biết còn mấy vé nữa thì được giảm giá.",
            "**Nút “Mở thẻ & mời bạn bè”:** mở trang đầy đủ của thẻ.",
          ],
        },
        { img: { src: img("the-thanh-vien-salon-co-ma-qr-va-so-ve"), alt: "Thẻ thành viên của salon Lumi Beauty Paris được khoanh vàng, có mã QR, số vé 1 trên 5 và nút mở thẻ" } },
        { note: "Số vé cần có và mức giảm giá do từng salon tự đặt, nên con số trên thẻ của bạn có thể khác ví dụ trong video. Hãy đọc dòng phần thưởng ngay dưới tên salon trên thẻ của chính bạn.", kind: "info", title: "Mỗi salon một mức thưởng" },
      ],
    },
    {
      id: "xin-the-o-dau",
      title: "Xin thẻ thành viên ở đâu",
      blocks: [
        { p: "Bạn không tự tạo thẻ. Salon là bên kích hoạt thẻ cho khách, rồi thẻ được gửi đến email của bạn. Vì vậy cách có thẻ rất đơn giản: lần tới đến tiệm quen, hỏi nhân viên xem tiệm có thẻ thành viên trên VaraaAi không và nhờ họ kích hoạt cho bạn." },
        { p: "Nên đưa cho salon địa chỉ email bạn đang dùng để đăng nhập VaraaAi, để thẻ được gửi về đúng hộp thư và bạn mở được thẻ trong tài khoản của mình. Nếu chưa có tài khoản, bài [tạo tài khoản và đăng nhập](lesson:tai-khoan) hướng dẫn việc này trong khoảng một phút." },
      ],
    },
    {
      id: "moi-ban-be",
      title: "Mời bạn bè để nhận thêm vé: điều kiện cần biết",
      blocks: [
        { p: "Mỗi thẻ có một link mời riêng trong phần “Mời bạn bè”. Bạn sao chép link và gửi cho người quen qua bất kỳ ứng dụng nhắn tin nào. Người nhận mở link sẽ thấy một trang ghi rõ ai mời họ đến salon nào, kèm nút đặt lịch. Trang đó cũng giải thích rằng đặt lịch qua link này thì salon biết họ được bạn giới thiệu." },
        { img: { src: img("trang-loi-moi-ban-be-nhan-duoc"), alt: "Trang lời mời mà bạn bè nhận được, ghi tên người mời, tên salon Lumi Beauty Paris và nút Đặt lịch ngay màu vàng", caption: "Trang bạn bè nhìn thấy khi mở link mời của bạn." } },
        { p: "Vé thưởng đi kèm hai điều kiện, và cả hai phải đủ:" },
        {
          ol: [
            "Bạn bè **đặt lịch qua link** của bạn, không phải tự tìm salon rồi đặt.",
            "Bạn bè **đến salon lần đầu** theo lịch đó.",
          ],
        },
        { note: "Vé thưởng chỉ được cộng khi bạn bè thật sự đến salon, không phải lúc bạn gửi link. Gửi link cho nhiều người mà chưa ai đến thì số vé của bạn chưa thay đổi. Khi điều kiện đủ, 2 vé được cộng tự động, bạn không phải báo cho ai.", kind: "warn", title: "Gửi link chưa phải là có vé" },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp với thẻ thành viên",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Không thấy thẻ nào trong “Thẻ tích điểm”", "Có thể salon chưa kích hoạt thẻ cho bạn. Hỏi lại salon, và kiểm tra hộp thư xem đã nhận email gửi thẻ chưa"],
              ["Đến tiệm nhưng quên đưa mã cho nhân viên quét", "Vé chỉ được cộng khi nhân viên quét mã. Hãy mở thẻ sẵn trong lúc chờ thanh toán"],
              ["Muốn biết vé đã được cộng chưa", "Bấm “Mở thẻ & mời bạn bè” và xem phần lịch sử vé, mỗi lần ghé salon là một dòng"],
              ["Đã gửi link mời mà chưa thấy vé thưởng", "Vé chỉ được cộng sau khi bạn bè đặt lịch qua link và đến salon lần đầu"],
              ["Đã đủ vé", "Báo với nhân viên ở lần làm tiếp theo để được giảm giá"],
              ["Có thẻ của nhiều salon", "Mỗi salon một thẻ riêng trong “Thẻ tích điểm”, mỗi thẻ có mã QR và số vé riêng"],
            ],
          },
        },
      ],
    },
    {
      id: "dung-the-cung-dat-lich",
      title: "Dùng thẻ cùng với việc đặt lịch",
      blocks: [
        { p: "Thẻ thành viên hợp nhất với thói quen đặt lịch trước. Bạn [đặt lịch làm đẹp online](lesson:dat-lich-online) ở tiệm quen, đến làm, đưa mã QR ở quầy, và số vé tăng dần theo từng lần hẹn. Để mở thẻ nhanh ở quầy mà không phải gõ địa chỉ trang web, hãy [cài app VaraaAi](lesson:cai-app) ra màn hình chính của điện thoại." },
        { p: "Khi muốn tặng một buổi làm đẹp cho người thân thay vì mời họ tự đặt, bạn xem thêm bài [mua và dùng thẻ quà tặng](lesson:the-qua-tang). Hai loại thẻ này khác nhau: thẻ thành viên tích vé cho chính bạn, còn thẻ quà tặng là món quà mua sẵn cho người khác." },
        { note: "Phía salon cài đặt chương trình, kích hoạt thẻ và cộng vé trong trang quản trị. Xem bài [Thẻ tích điểm QR trong trang quản trị](lesson:the-tich-diem) và [Khách dẫn khách](lesson:khach-dan-khach).", kind: "info", title: "Bạn là chủ salon?" },
      ],
    },
  ],
  howTo: {
    title: "Các bước dùng thẻ thành viên salon trên VaraaAi",
    id: "cac-buoc-dung-the",
    after: "xin-the-o-dau",
    lead: "Sau khi salon đã kích hoạt thẻ cho bạn, mọi việc còn lại làm trên điện thoại.",
    steps: [
      {
        name: "Mở “Thẻ tích điểm” trong tài khoản",
        text: "Đăng nhập vào VaraaAi, bấm vào tên bạn ở góc trên rồi chọn “Thẻ tích điểm”. Trang “Thẻ thành viên của tôi” hiện các thẻ bạn đang có, mỗi salon một thẻ.",
        image: { src: img("mo-the-tich-diem-tu-ten-tai-khoan"), alt: "Trang Thẻ thành viên của tôi trên VaraaAi với thẻ của salon Lumi Beauty Paris, mã QR và dòng Số vé 1 trên 5" },
      },
      {
        name: "Xem số vé đang có",
        text: "Dòng “Số vé” cho biết bạn có mấy vé trên tổng số cần. Ngay dưới là dòng báo còn mấy vé nữa thì được giảm giá. Nhìn hai dòng này trước mỗi lần hẹn để biết lần này mình đã đến lượt được giảm chưa.",
        image: { src: img("so-ve-va-so-ve-con-thieu-de-duoc-giam-gia"), alt: "Thẻ thành viên trên VaraaAi, phần Số vé 1 trên 5 và dòng Còn 4 vé nữa là được giảm giá được khoanh vàng" },
      },
      {
        name: "Đưa mã QR cho nhân viên quét khi đến salon",
        text: "Ở quầy, mở thẻ và đưa màn hình có mã QR cho nhân viên. Nhân viên quét là bạn được cộng ngay 1 vé. Làm việc này ở mỗi lần đến, vì không quét thì không có vé.",
      },
      {
        name: "Bấm “Mở thẻ & mời bạn bè” để xem tiến độ",
        text: "Nút này mở trang đầy đủ của thẻ. Bạn thấy vòng tròn tiến độ cho biết đã đi được bao nhiêu phần đường đến lần giảm giá, và dòng nhắc còn thiếu mấy vé.",
        image: { src: img("nut-mo-the-va-moi-ban-be"), alt: "Thẻ thành viên của salon với nút Mở thẻ và mời bạn bè cộng 2 vé màu đen được khoanh vàng ở cuối thẻ" },
      },
      {
        name: "Đọc cách nhận vé và lịch sử vé",
        text: "Kéo xuống, phần “Cách nhận vé” nhắc lại quy tắc của thẻ, và phần lịch sử vé liệt kê từng lần bạn được cộng vé kèm ngày. Đây là chỗ kiểm tra khi bạn không chắc lần đến gần nhất đã được quét hay chưa.",
        image: { src: img("cach-nhan-ve-va-lich-su-ve"), alt: "Phần Cách nhận vé và Lịch sử vé trong thẻ thành viên được khoanh vàng, có một dòng Ghé salon cộng 1 vé" },
      },
      {
        name: "Bấm “Sao chép link mời” và gửi cho bạn bè",
        text: "Trong phần “Mời bạn bè”, bấm “Sao chép link mời” rồi dán link vào tin nhắn gửi người quen. Khi họ đặt lịch qua link và đến salon lần đầu, bạn tự động được cộng thêm 2 vé.",
        image: { src: img("sao-chep-link-moi-ban-be-nhan-them-ve"), alt: "Phần Mời bạn bè trong thẻ thành viên được khoanh vàng, có nút Sao chép link mời và nhãn cộng 2 vé" },
      },
      {
        name: "Đủ vé: báo nhân viên để được giảm giá",
        text: "Khi thẻ báo bạn đã đủ vé, hãy nói với nhân viên ở lần làm tiếp theo. Salon áp dụng mức giảm ghi trên thẻ cho lần đó.",
        image: { src: img("vong-tron-tien-do-tich-ve"), alt: "Vòng tròn tiến độ của thẻ ghi 1 trên 5 vé, bên dưới là dòng nhắc còn 4 vé nữa là được giảm giá" },
      },
    ],
  },
  faq: [
    {
      q: "Làm sao để có thẻ thành viên của salon trên VaraaAi?",
      a: "Hỏi salon quen của bạn. Salon kích hoạt thẻ và thẻ được gửi cho bạn qua email. Sau đó bạn xem thẻ bằng cách bấm vào tên mình ở góc trên và chọn “Thẻ tích điểm”.",
    },
    {
      q: "Mỗi lần đến salon được cộng mấy vé?",
      a: "Một vé. Bạn mở thẻ, đưa mã QR cho nhân viên quét và được cộng ngay 1 vé cho lần đến đó.",
    },
    {
      q: "Cần bao nhiêu vé thì được giảm giá?",
      a: "Tùy từng salon. Số vé cần có và mức giảm ghi ngay trên thẻ của bạn, dưới tên salon. Ví dụ trong video bài học là đủ 5 vé thì được giảm 15% cho lần làm tiếp theo.",
    },
    {
      q: "Mời bạn bè thì được gì và khi nào được?",
      a: "Bạn được cộng thêm 2 vé. Vé được cộng tự động khi bạn bè đặt lịch qua link mời của bạn và đến salon lần đầu, không phải lúc bạn gửi link.",
    },
    {
      q: "Xem thẻ thành viên và số vé của mình ở đâu?",
      a: "Đăng nhập VaraaAi, bấm vào tên bạn ở góc trên và chọn “Thẻ tích điểm”. Mỗi thẻ hiện mã QR riêng, số vé đang có và còn mấy vé nữa thì được giảm giá.",
    },
    {
      q: "Đủ vé rồi thì giảm giá có tự áp dụng không?",
      a: "Bạn cần báo với nhân viên ở lần làm tiếp theo để được giảm giá. Hãy mở thẻ cho nhân viên xem số vé khi thanh toán.",
    },
  ],
  related: ["the-qua-tang", "theo-doi-salon", "hoa-don", "lich-hen-cua-toi"],
};

export default article;
