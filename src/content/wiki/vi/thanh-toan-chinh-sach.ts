import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thanh-toan-chinh-sach/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "chinh-sach-huy-lich-salon-thanh-toan",
  lesson: "thanh-toan-chinh-sach",
  category: "salon",
  title: "Chính sách hủy lịch salon: đặt hạn hủy, nhận chuyển khoản và điền thông tin xuất hóa đơn",
  metaTitle: "Chính sách hủy lịch salon: hạn hủy, chuyển khoản, hóa đơn",
  metaDescription:
    "Cách đặt chính sách hủy lịch cho salon trên VaraaAi: chọn hạn hủy, viết quy định ngắn gọn, thêm tài khoản nhận chuyển khoản và thông tin để xuất hóa đơn.",
  keyword: "chính sách hủy lịch salon",
  keywords: [
    "hạn hủy lịch hẹn cho khách",
    "khách không đến thì tính phí thế nào",
    "mẫu chính sách hủy lịch tiệm nail",
    "nhận thanh toán chuyển khoản cho salon",
    "thông tin xuất hóa đơn của salon",
    "khách hủy lịch sát giờ",
    "cài đặt thanh toán cho salon",
  ],
  excerpt: "Ba việc nhỏ trong “Cài đặt” giúp tiệm tránh nhiều rắc rối: đặt hạn hủy lịch, nhận tiền chuyển khoản và điền thông tin xuất hóa đơn.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chu-salon-kiem-tra-cai-dat-tren-may-tinh-bang"),
    alt: "Một nữ chủ salon tóc xoăn mặc áo lụa tím cầm máy tính bảng, đứng cạnh quầy đá trong tiệm có đèn chùm",
  },
  takeaways: [
    "**“Khách được hủy trước”** là hạn hủy: qua thời hạn này khách không tự hủy trên mạng được nữa, chỉ salon hủy được.",
    "**“Chính sách hủy đặt chỗ”** là đoạn chữ khách đọc sau khi đặt lịch xong và trong email xác nhận.",
    "Điền tài khoản ngân hàng để khách thấy thông tin **chuyển khoản thẳng cho salon** khi đặt lịch.",
    "Phải điền đủ **“Thông tin xuất hóa đơn”** thì mới xuất được hóa đơn ở quầy thanh toán.",
    "Ba phần có ba nút lưu riêng. Điền xong phần nào, bấm lưu phần đó.",
  ],
  intro: [
    "Một chính sách hủy lịch salon viết rõ ràng không làm khách khó chịu. Nó làm điều ngược lại: khách biết trước mình được hủy đến lúc nào, còn tiệm không phải tranh luận mỗi khi có người báo bận sát giờ. Thứ gây khó chịu là quy định chỉ được nhắc đến sau khi chuyện đã xảy ra.",
    "Bài viết này đi theo bài học “Thanh toán, chính sách huỷ và thông tin hoá đơn” của VaraaAi Academy. Bạn sẽ đặt được hạn hủy, viết được vài dòng chính sách, thêm tài khoản nhận chuyển khoản và điền phần thông tin để xuất hóa đơn. Tất cả nằm trong một trang “Cài đặt”.",
  ],
  sections: [
    {
      id: "vi-sao-can-chinh-sach-huy",
      title: "Vì sao salon cần chính sách hủy lịch viết rõ",
      blocks: [
        { p: "Một giờ làm việc của thợ không cất đi để bán sau được. Khách hủy trước một ngày thì tiệm còn kịp nhận người khác. Khách hủy trước mười phút, hoặc không đến mà cũng không báo, thì giờ đó coi như mất. Với dịch vụ dài như nối mi hay nhuộm tóc, một lần như vậy có thể lấy đi nửa buổi làm của một người thợ." },
        { p: "Hạn hủy giải quyết phần lớn chuyện này mà không cần ai phải nói nặng lời. Khách thấy quy định ngay khi đặt, nên ai cần đổi lịch sẽ đổi sớm. Và khi mọi khách đều đọc cùng một quy định, bạn không rơi vào cảnh người này được du di, người kia thì không." },
        { p: "Hai phần còn lại của bài học cũng thuộc loại việc làm một lần rồi dùng mãi. Có sẵn thông tin chuyển khoản thì khách không phải nhắn hỏi số tài khoản. Có sẵn thông tin hóa đơn thì lúc khách cần hóa đơn bạn xuất được ngay tại quầy." },
      ],
    },
    {
      id: "han-huy-va-chinh-sach",
      title: "Hạn hủy lịch hẹn và chính sách hủy: hai thứ khác nhau",
      blocks: [
        { p: "Trong phần “Tùy chọn salon” có hai dòng nằm sát nhau và dễ bị nhầm là một. Chúng làm hai việc khác hẳn:" },
        {
          table: {
            head: ["Dòng", "Là gì", "Tác dụng"],
            rows: [
              ["“Khách được hủy trước”", "Một thời hạn bạn chọn, ví dụ 24 giờ trước lịch hẹn", "Qua thời hạn này, khách không tự hủy trên mạng được nữa. Chỉ salon hủy được từ trang quản trị"],
              ["“Chính sách hủy đặt chỗ”", "Một đoạn chữ bạn tự viết", "Khách đọc nội dung này sau khi đặt lịch xong và trong email xác nhận"],
            ],
          },
        },
        { p: "Nói gọn, dòng trên là cái khóa, dòng dưới là tấm biển giải thích cái khóa. Thời hạn là thứ trang đặt lịch thực hiện thay bạn. Đoạn chính sách là lời tiệm nói với khách, ví dụ có tính phí khi hủy muộn hay không." },
        { note: "Hai dòng phải nói cùng một con số. Nếu bạn chọn hạn 24 giờ thì đoạn chính sách cũng nên ghi 24 giờ. Mỗi lần đổi hạn hủy, hãy đọc lại đoạn chữ bên dưới và sửa cho khớp.", kind: "tip", title: "Giữ cho khớp" },
      ],
    },
    {
      id: "cach-viet-chinh-sach-huy",
      title: "Cách viết chính sách hủy lịch ngắn gọn mà khách đọc là hiểu",
      blocks: [
        { p: "Bài học khuyên viết ngắn gọn quy định của salon, ví dụ hủy muộn hoặc không đến thì tính phí. Một chính sách đủ dùng trả lời hai câu: khách được hủy hoặc đổi lịch miễn phí đến khi nào, và sau thời điểm đó thì sao." },
        { p: "Trong video bài học, salon mẫu viết như sau: “Quý khách có thể hủy hoặc đổi lịch miễn phí trước giờ hẹn 24 giờ. Hủy muộn hơn hoặc không đến, salon có thể tính 50% giá dịch vụ.” Bạn có thể dùng cấu trúc hai câu này và thay con số theo quyết định của tiệm mình." },
        {
          ul: [
            "**Viết bằng câu khẳng định, lịch sự.** Khách đọc ngay sau khi vừa đặt lịch, lúc họ đang có thiện cảm với tiệm.",
            "**Nêu con số cụ thể.** “Hủy sớm” mỗi người hiểu một kiểu, còn “trước giờ hẹn 24 giờ” thì chỉ có một cách hiểu.",
            "**Chỉ viết điều tiệm thật sự làm.** Quy định ghi ra mà không bao giờ áp dụng thì khách quen sẽ sớm biết.",
          ],
        },
        { note: "Mức phí hủy muộn là quyết định của từng tiệm, và quy định về việc thu phí của khách khác nhau theo từng nước. Trước khi ghi một mức phí, hãy tìm hiểu quy định nơi tiệm bạn hoạt động.", kind: "warn", title: "Về phí hủy muộn" },
      ],
    },
    {
      id: "nhan-chuyen-khoan",
      title: "Nhận thanh toán chuyển khoản cho salon",
      blocks: [
        { p: "Khung “Nhận thanh toán qua chuyển khoản” nằm trong phần “Thanh toán & hóa đơn”. Thông tin bạn điền ở đây hiện ra cho khách khi đặt lịch, để họ chuyển khoản trực tiếp cho salon. Tiền đi thẳng từ tài khoản của khách sang tài khoản của tiệm." },
        { img: { src: img("khung-nhan-thanh-toan-qua-chuyen-khoan"), alt: "Khung Nhận thanh toán qua chuyển khoản với các ô Tên ngân hàng, Số tài khoản, Tên chủ tài khoản và Mã BIC/SWIFT", caption: "Dòng chú thích dưới tiêu đề cho biết khách sẽ thấy thông tin này khi đặt lịch." } },
        { p: "Ba ô cần điền là “Tên ngân hàng”, “Số tài khoản” và “Tên chủ tài khoản”. Trong video còn có ô mã BIC/SWIFT, được ghi là không bắt buộc. Hãy chép số tài khoản từ ứng dụng ngân hàng thay vì gõ theo trí nhớ, và ghi tên chủ tài khoản đúng như ngân hàng đang ghi. Khách chuyển nhầm vì một chữ số sai thì cả hai bên đều mất thời gian." },
        { p: "Phần này đặc biệt có ích nếu tiệm bạn thu [tiền cọc cho một số dịch vụ](lesson:dich-vu), vì khách có ngay nơi để chuyển." },
      ],
    },
    {
      id: "thong-tin-xuat-hoa-don",
      title: "Thông tin xuất hóa đơn của salon",
      blocks: [
        { p: "Khung cuối cùng là “Thông tin xuất hóa đơn”. Bài học nói rõ: phải điền đủ phần này thì mới xuất được hóa đơn ở quầy thanh toán. Tên công ty, địa chỉ, mã số thuế và VAT là những thứ được in trên hóa đơn." },
        {
          table: {
            head: ["Ô", "Điền gì"],
            rows: [
              ["“Tên công ty”", "Tên pháp lý của doanh nghiệp, có thể khác tên biển hiệu"],
              ["“Địa chỉ công ty”", "Địa chỉ đăng ký của doanh nghiệp"],
              ["“Mã số doanh nghiệp / mã số thuế”", "Đúng như trên giấy đăng ký kinh doanh"],
              ["“Thuế VAT (%)”", "Mức thuế áp dụng cho dịch vụ của tiệm bạn"],
            ],
          },
        },
        { p: "Nếu chưa chắc về mã số hay mức VAT, hãy hỏi người làm kế toán cho tiệm trước khi lưu, vì những con số này sẽ xuất hiện trên mọi hóa đơn. Cách xuất hóa đơn cho từng khách được hướng dẫn trong bài [thanh toán và hóa đơn tại quầy](lesson:thanh-toan-hoa-don)." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp: khách hủy lịch sát giờ và các chuyện khác",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Khách muốn hủy khi đã qua hạn", "Khách không tự hủy trên mạng được nữa. Họ liên hệ tiệm, và bạn hủy lịch từ trang quản trị nếu đồng ý"],
              ["Khách hỏi chính sách hủy ở đâu", "Trên màn hình sau khi đặt lịch xong và trong email xác nhận họ đã nhận"],
              ["Khách hỏi chuyển khoản vào tài khoản nào", "Thông tin ngân hàng của tiệm hiện ra khi khách đặt lịch"],
              ["Không xuất được hóa đơn ở quầy", "Kiểm tra bốn ô của “Thông tin xuất hóa đơn” đã điền đủ và đã bấm “Lưu thông tin hóa đơn” chưa"],
            ],
          },
        },
        { p: "Phía khách, việc tự hủy trong thời hạn được làm ở mục “Lịch hẹn của tôi”, như trong bài [xem, đổi và hủy lịch hẹn](lesson:lich-hen-cua-toi). Phía tiệm, bạn xử lý từng lịch trong mục [lịch hẹn](lesson:lich-hen) của trang quản trị." },
      ],
    },
  ],
  howTo: {
    title: "Các bước cài đặt chính sách hủy lịch salon, chuyển khoản và hóa đơn trên VaraaAi",
    id: "cac-buoc-cai-dat",
    after: "han-huy-va-chinh-sach",
    lead: "Tám bước dưới đây đi từ trên xuống dưới của trang “Cài đặt”: bốn bước cho chính sách hủy, hai bước cho chuyển khoản, hai bước cho hóa đơn.",
    steps: [
      {
        name: "Mở “Cài đặt” và tìm phần “Tùy chọn salon”",
        text: "Trong trang quản trị, bấm mục “Cài đặt” rồi kéo xuống phần “Tùy chọn salon”. Phần này gom ngôn ngữ, tiền tệ, thời hạn và chính sách hủy lịch của tiệm.",
        image: { src: img("phan-tuy-chon-salon-trong-cai-dat"), alt: "Phần Tùy chọn salon trong trang Cài đặt với ô Ngôn ngữ mặc định, Tiền tệ mặc định và Khách được hủy trước" },
      },
      {
        name: "Chọn thời hạn ở “Khách được hủy trước”",
        text: "Bấm vào danh sách ở dòng “Khách được hủy trước” và chọn một thời hạn, ví dụ 24 giờ trước lịch hẹn. Qua thời hạn này, khách không tự hủy trên mạng được nữa. Hãy chọn mức đủ để tiệm còn kịp nhận khách khác vào giờ bị trống.",
        image: { src: img("khach-duoc-huy-truoc-24-gio"), alt: "Dòng Khách được hủy trước đang chọn 24 giờ trước lịch hẹn được khoanh vàng trong phần Tùy chọn salon" },
      },
      {
        name: "Viết “Chính sách hủy đặt chỗ”",
        text: "Ngay bên dưới là ô “Chính sách hủy đặt chỗ”. Viết ngắn gọn quy định của salon, ví dụ hủy muộn hoặc không đến thì tính phí. Khách sẽ đọc nội dung này sau khi đặt lịch xong và trong email xác nhận.",
        image: { src: img("o-chinh-sach-huy-dat-cho-cua-salon"), alt: "Ô Chính sách hủy đặt chỗ được khoanh vàng, bên trong là đoạn quy định hủy hoặc đổi lịch miễn phí trước giờ hẹn 24 giờ" },
      },
      {
        name: "Bấm “Lưu”",
        text: "Bấm nút “Lưu” ngay dưới ô chính sách. Nút này lưu cả thời hạn hủy lẫn đoạn chính sách bạn vừa viết.",
        image: { src: img("bam-luu-chinh-sach-huy-lich"), alt: "Nút Lưu màu đen dưới ô Chính sách hủy đặt chỗ được khoanh vàng, phía dưới là phần Thanh toán và hóa đơn" },
      },
      {
        name: "Điền khung “Nhận thanh toán qua chuyển khoản”",
        text: "Kéo xuống phần thanh toán và hóa đơn. Ở khung “Nhận thanh toán qua chuyển khoản”, điền “Tên ngân hàng”, “Số tài khoản” và “Tên chủ tài khoản”. Đọc lại số tài khoản từng chữ số một trước khi sang bước sau.",
        image: { src: img("dien-ten-ngan-hang-so-tai-khoan"), alt: "Ba ô Tên ngân hàng, Số tài khoản và Tên chủ tài khoản được khoanh vàng trong khung Nhận thanh toán qua chuyển khoản" },
      },
      {
        name: "Bấm “Lưu thông tin ngân hàng”",
        text: "Bấm “Lưu thông tin ngân hàng”. Từ lúc này, khách thấy thông tin chuyển khoản của tiệm khi đặt lịch.",
        image: { src: img("luu-thong-tin-ngan-hang"), alt: "Nút Lưu thông tin ngân hàng được khoanh vàng, bên dưới là khung Thông tin xuất hóa đơn với ô Tên công ty" },
      },
      {
        name: "Điền “Thông tin xuất hóa đơn”",
        text: "Ở khung “Thông tin xuất hóa đơn”, điền “Tên công ty”, “Địa chỉ công ty”, “Mã số doanh nghiệp / mã số thuế” và “Thuế VAT (%)”. Phải đủ cả bốn ô thì mới xuất được hóa đơn ở quầy thanh toán.",
        image: { src: img("thong-tin-xuat-hoa-don-ma-so-thue-vat"), alt: "Khung Thông tin xuất hóa đơn với bốn ô Tên công ty, Địa chỉ công ty, Mã số thuế và Thuế VAT được khoanh vàng" },
      },
      {
        name: "Bấm “Lưu thông tin hóa đơn”",
        text: "Bấm “Lưu thông tin hóa đơn” là xong. Những thông tin này sẽ được in trên hóa đơn của tiệm.",
        image: { src: img("luu-thong-tin-hoa-don"), alt: "Nút Lưu thông tin hóa đơn được khoanh vàng dưới ô Mã số doanh nghiệp và ô Thuế VAT trong trang Cài đặt" },
      },
    ],
  },
  faq: [
    {
      q: "“Khách được hủy trước 24 giờ” nghĩa là gì?",
      a: "Khách tự hủy lịch trên mạng được cho đến 24 giờ trước giờ hẹn. Qua thời hạn đó, khách không tự hủy được nữa, và chỉ salon mới hủy được từ trang quản trị.",
    },
    {
      q: "Khách thấy chính sách hủy lịch của salon ở đâu?",
      a: "Khách thấy nội dung ô “Chính sách hủy đặt chỗ” sau khi đặt lịch xong và trong email xác nhận. Vì vậy hãy viết ngắn gọn, đọc một lần là hiểu.",
    },
    {
      q: "Nên viết gì trong chính sách hủy lịch của tiệm nail, tiệm tóc?",
      a: "Viết hai ý: khách được hủy hoặc đổi lịch miễn phí đến khi nào, và nếu hủy muộn hơn hoặc không đến thì tiệm xử lý ra sao, ví dụ có tính phí. Con số trong chính sách nên khớp với hạn bạn chọn ở dòng “Khách được hủy trước”.",
    },
    {
      q: "Khách thấy thông tin chuyển khoản của salon khi nào?",
      a: "Khi đặt lịch. Sau khi bạn điền tên ngân hàng, số tài khoản, tên chủ tài khoản và bấm “Lưu thông tin ngân hàng”, khách thấy thông tin này để chuyển khoản thẳng cho salon.",
    },
    {
      q: "Vì sao phải điền “Thông tin xuất hóa đơn”?",
      a: "Vì phải điền đủ phần này thì mới xuất được hóa đơn ở quầy thanh toán. Tên công ty, địa chỉ, mã số thuế và phần trăm VAT được in trên hóa đơn.",
    },
    {
      q: "Đã qua hạn hủy mà khách vẫn muốn hủy thì làm thế nào?",
      a: "Khách không tự hủy trên mạng được nữa, nên họ cần liên hệ tiệm. Salon vẫn hủy được lịch đó từ trang quản trị, và việc có tính phí hay không là theo chính sách tiệm đã công bố.",
    },
  ],
  related: ["gio-mo-cua", "dich-vu", "thanh-toan-hoa-don", "lich-hen"],
};

export default article;
