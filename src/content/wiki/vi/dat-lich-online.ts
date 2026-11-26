import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dat-lich-online/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "dat-lich-lam-dep-online",
  lesson: "dat-lich-online",
  category: "booking",
  title: "Cách đặt lịch làm đẹp online: tìm salon và giữ chỗ trong một phút",
  metaTitle: "Cách đặt lịch làm đẹp online: nail, tóc, mi, spa trong 1 phút",
  metaDescription:
    "Hướng dẫn đặt lịch làm nail, cắt tóc, nối mi, spa online trên VaraaAi: tìm salon gần bạn, chọn dịch vụ, nhân viên, ngày giờ còn trống và xác nhận. Miễn phí.",
  keyword: "đặt lịch làm đẹp online",
  keywords: ["đặt lịch làm nail online", "đặt lịch cắt tóc online", "đặt lịch spa online", "tìm salon gần đây", "đặt lịch nối mi", "cách đặt lịch trên VaraaAi"],
  excerpt: "Tìm salon theo dịch vụ và khu vực, chọn người làm, ngày giờ còn trống rồi xác nhận. Không cần gọi điện, đặt được cả lúc nửa đêm.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-den-salon-sau-khi-dat-lich-online"),
    alt: "Khách nữ mặc áo khoác kem được lễ tân đón tại quầy của một salon làm đẹp sang trọng",
  },
  takeaways: [
    "Đặt lịch trên VaraaAi **miễn phí** cho khách và mất khoảng một phút.",
    "Bạn thấy **giờ còn trống thật** của salon, chia theo buổi sáng, chiều và tối, nên không cần gọi điện hỏi.",
    "Chưa có tài khoản vẫn đặt được: nhập họ tên, số điện thoại, email và mật khẩu, tài khoản được tạo luôn.",
    "Cách thanh toán thường gặp là **thanh toán tại salon**, tức là làm xong mới trả tiền.",
    "Có việc bận thì tự hủy trong mục “Lịch hẹn của tôi”, miễn là còn trong thời hạn salon cho phép.",
  ],
  intro: [
    "Đặt lịch làm đẹp online giúp bạn bỏ được cuộc gọi “chị ơi mai còn chỗ không”. Bạn mở điện thoại, thấy ngay salon nào còn giờ trống, giá bao nhiêu, ai làm, rồi giữ chỗ trong khoảng một phút, kể cả lúc tiệm đã đóng cửa.",
    "Bài viết này hướng dẫn từng bước đặt lịch làm móng, cắt tóc, nối mi hay spa trên VaraaAi, theo đúng bài học đầu tiên dành cho khách hàng trong VaraaAi Academy. Video bên dưới quay trên màn hình thật, bạn có thể vừa xem vừa làm theo.",
  ],
  sections: [
    {
      id: "can-gi",
      title: "Cần chuẩn bị gì trước khi đặt lịch",
      blocks: [
        { p: "Gần như không cần gì. Bạn chỉ cần một chiếc điện thoại hoặc máy tính có mạng, và biết mình muốn làm dịch vụ gì. Việc đặt lịch không mất phí và không cần cài ứng dụng, tuy bạn có thể [cài app VaraaAi](/app) nếu thích mở nhanh từ màn hình chính." },
        { p: "Nếu bạn có mã giảm giá hoặc thẻ quà tặng của salon, hãy để sẵn mã bên cạnh, vì bạn sẽ nhập nó ở bước thanh toán." },
      ],
    },
    {
      id: "trang-salon",
      title: "Đọc trang salon thế nào trước khi chọn",
      blocks: [
        { p: "Trang kết quả tìm kiếm cho bạn thấy các salon phù hợp, kèm **điểm đánh giá** và **giá thấp nhất**. Bạn có thể xem dạng “Danh sách” hoặc “Bản đồ” để chọn tiệm gần nhà hay gần chỗ làm." },
        { p: "Khi mở một salon, bạn sẽ thấy địa chỉ, số điện thoại và ba mục chính:" },
        {
          ul: [
            "**Dịch vụ:** từng dịch vụ ghi rõ thời gian làm và giá tiền.",
            "**Đánh giá:** nhận xét của những khách đã thật sự đặt lịch và đến làm.",
            "**Giờ mở cửa:** để bạn biết tiệm làm việc những ngày nào.",
          ],
        },
        { note: "Hãy nhìn thời gian làm của dịch vụ trước khi chọn giờ. Một bộ nối mi hay một lần nhuộm tóc có thể kéo dài hơn bạn nghĩ, và bạn nên chừa đủ thời gian trước cuộc hẹn tiếp theo.", kind: "tip", title: "Mẹo nhỏ" },
      ],
    },
    {
      id: "sau-khi-dat",
      title: "Sau khi đặt: xem lại, đổi hoặc hủy lịch",
      blocks: [
        { p: "Khi màn hình báo “Đặt lịch thành công”, bạn cũng nhận được một email xác nhận. Bấm “Xem lịch hẹn của tôi” để xem lại ngày giờ, dịch vụ và địa chỉ salon bất cứ lúc nào." },
        { p: "Nếu có việc bận, bạn tự hủy được ngay trong mục “Lịch hẹn của tôi”, miễn là còn trong thời hạn salon cho phép. Mỗi salon đặt thời hạn hủy riêng trong chính sách hủy bỏ, và bạn đã đọc chính sách đó ở bước xác nhận. Hủy sớm giúp salon nhận được khách khác vào giờ đó." },
        { p: "Bài học tiếp theo trong Academy hướng dẫn kỹ phần này: [Lịch hẹn của tôi](/academy/lich-hen-cua-toi). Nếu cần hỏi salon điều gì trước khi đến, bạn có thể [nhắn tin cho salon](/academy/chat-voi-salon) ngay trên VaraaAi." },
      ],
    },
    {
      id: "loi-hay-gap",
      title: "Vài tình huống hay gặp khi đặt lịch",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Không thấy giờ nào trong ngày bạn chọn", "Ngày đó salon đã kín lịch hoặc không mở cửa. Chọn ngày khác, hoặc chọn “Bất kỳ ai còn trống” để thấy giờ của mọi nhân viên"],
              ["Muốn làm hai dịch vụ trong một lần đến", "Đánh dấu chọn từng dịch vụ trong danh sách rồi bấm “Tiếp tục”"],
              ["Không cần chọn thợ quen", "Để “Bất kỳ ai còn trống”, salon sẽ xếp người đang rảnh"],
              ["Đã có tài khoản từ lần trước", "Bấm “Đăng nhập” thay vì điền lại thông tin"],
              ["Có điều muốn dặn salon", "Viết vào ô “Ghi chú” ở bước điền thông tin"],
            ],
          },
        },
      ],
    },
    {
      id: "cho-chu-salon",
      title: "Bạn là chủ salon?",
      blocks: [
        { p: "Những gì khách thấy trong bài này cũng là điều khách của bạn sẽ thấy khi tiệm có trang đặt lịch trên VaraaAi: dịch vụ, giá, giờ trống thật và nút đặt lịch hoạt động 24/7. Việc đăng ký miễn phí cho chủ salon. Bạn xem bài học [Đăng ký salon](/academy/dang-ky-salon) hoặc mở trang [VaraaAi cho salon](/business)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước đặt lịch làm đẹp trên VaraaAi",
    id: "cac-buoc-dat-lich",
    after: "trang-salon",
    lead: "Bảy bước dưới đây đi theo đúng thứ tự các màn hình. Tên nút trong ngoặc kép là tên bạn sẽ thấy trên trang.",
    steps: [
      {
        name: "Tìm salon theo dịch vụ và khu vực",
        text: "Mở [varaaai.com](/). Gõ dịch vụ bạn cần vào ô “Dịch vụ hoặc salon”, ví dụ nail. Gõ tên thành phố vào ô “Khu vực”, hoặc bấm “Gần tôi” để tìm quanh chỗ bạn đang đứng, rồi bấm “Tìm kiếm”. Bạn cũng có thể kéo xuống và chọn nhanh trong phần “Duyệt theo danh mục”.",
        image: { src: img("tim-salon-theo-dich-vu-va-khu-vuc"), alt: "Màn hình điện thoại trang chủ VaraaAi với ô Dịch vụ hoặc salon, ô Khu vực và nút Tìm kiếm" },
      },
      {
        name: "Chọn salon trong kết quả",
        text: "Xem kết quả ở dạng “Danh sách” hoặc “Bản đồ”. Mỗi salon hiện điểm đánh giá và giá thấp nhất. Bấm vào salon bạn thích để mở trang của salon.",
        image: { src: img("chon-salon-trong-ket-qua-tim-kiem"), alt: "Màn hình kết quả tìm kiếm trên VaraaAi hiện danh sách salon kèm ảnh, điểm đánh giá và giá từ" },
      },
      {
        name: "Chọn dịch vụ",
        text: "Ở mục “Dịch vụ”, bấm nút “Đặt lịch” ngay cạnh dịch vụ bạn muốn. Muốn làm nhiều dịch vụ trong một lần thì đánh dấu chọn từng dịch vụ rồi bấm “Tiếp tục”.",
        image: { src: img("chon-dich-vu-va-bam-dat-lich"), alt: "Danh sách dịch vụ của salon trên điện thoại, mỗi dịch vụ có thời gian làm, giá tiền và nút Đặt lịch" },
      },
      {
        name: "Chọn nhân viên",
        text: "Ở mục “Chọn nhân viên”, chọn người bạn quen, hoặc để “Bất kỳ ai còn trống” nếu ai làm cũng được.",
        image: { src: img("chon-nhan-vien-lam-dep"), alt: "Màn hình Chọn nhân viên với lựa chọn Bất kỳ ai còn trống và tên từng nhân viên của salon" },
      },
      {
        name: "Chọn ngày và giờ còn trống",
        text: "Ở mục “Chọn ngày”, bấm vào ngày bạn muốn đến. Mục “Chọn giờ” sẽ hiện các giờ còn trống, chia theo buổi sáng, buổi chiều và buổi tối. Bấm vào giờ phù hợp.",
        image: { src: img("chon-ngay-gio-con-trong"), alt: "Lịch chọn ngày và các ô giờ còn trống của salon trên màn hình điện thoại" },
      },
      {
        name: "Điền thông tin và chọn cách thanh toán",
        text: "Chưa có tài khoản thì nhập “Họ và tên”, “Số điện thoại”, “Email” và một mật khẩu; tài khoản sẽ được tạo luôn. Có rồi thì bấm “Đăng nhập”. Ở mục “Chọn phương thức thanh toán”, lựa chọn thường gặp là “Thanh toán tại salon”. Có mã giảm giá hoặc thẻ quà tặng thì nhập vào ô “Mã giảm giá” và bấm “Áp dụng”.",
        image: { src: img("chon-thanh-toan-tai-salon-va-ma-giam-gia"), alt: "Màn hình chọn phương thức Thanh toán tại salon, ô ghi chú cho salon và ô nhập mã giảm giá" },
      },
      {
        name: "Xem lại và xác nhận",
        text: "Xem lại phần “Lịch hẹn của bạn”: đúng dịch vụ, đúng ngày giờ và số tiền. Đánh dấu vào ô chấp nhận “Chính sách hủy bỏ” và “Điều khoản sử dụng”, rồi bấm “Xác nhận đặt lịch”. Màn hình báo “Đặt lịch thành công” là bạn đã giữ được chỗ.",
        image: { src: img("xac-nhan-dat-lich-lam-dep"), alt: "Màn hình tóm tắt Lịch hẹn của bạn với ngày giờ, dịch vụ, số tiền và nút Xác nhận đặt lịch" },
      },
    ],
  },
  faq: [
    {
      q: "Đặt lịch trên VaraaAi có mất phí không?",
      a: "Không. Khách đặt lịch hoàn toàn miễn phí. Bạn chỉ trả tiền dịch vụ cho salon, và với lựa chọn “Thanh toán tại salon” thì làm xong mới trả.",
    },
    {
      q: "Có đặt lịch được ngoài giờ mở cửa của salon không?",
      a: "Có. Trang đặt lịch hoạt động suốt ngày đêm, nên bạn giữ chỗ được cả lúc nửa đêm. Bạn chỉ chọn được những giờ salon còn trống trong giờ làm việc của họ.",
    },
    {
      q: "Tôi chưa có tài khoản thì có đặt được không?",
      a: "Được. Ở bước điền thông tin, bạn nhập họ tên, số điện thoại, email và một mật khẩu. Tài khoản được tạo luôn trong lúc đặt lịch, lần sau bạn chỉ cần đăng nhập.",
    },
    {
      q: "Làm sao biết lịch của tôi đã được nhận?",
      a: "Sau khi bấm “Xác nhận đặt lịch”, màn hình báo “Đặt lịch thành công” và bạn nhận được email xác nhận. Bạn cũng xem lại được lịch trong mục “Lịch hẹn của tôi”.",
    },
    {
      q: "Tôi muốn hủy lịch thì làm thế nào?",
      a: "Mở mục “Lịch hẹn của tôi” và hủy lịch ở đó. Bạn tự hủy được miễn là còn trong thời hạn mà salon cho phép theo chính sách hủy bỏ của họ.",
    },
    {
      q: "Nhập mã giảm giá hoặc thẻ quà tặng ở đâu?",
      a: "Ở bước điền thông tin, ngay dưới phần chọn phương thức thanh toán có ô “Mã giảm giá”. Nhập mã rồi bấm “Áp dụng” trước khi xác nhận đặt lịch.",
    },
  ],
  related: ["lich-hen-cua-toi", "tai-khoan", "cai-app", "the-qua-tang"],
};

export default article;
