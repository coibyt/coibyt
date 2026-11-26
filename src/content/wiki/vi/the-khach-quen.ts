import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/the-khach-quen/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-lam-the-tich-diem-cho-tiem-nail",
  lesson: "the-khach-quen",
  category: "marketing",
  title: "Cách làm thẻ tích điểm cho tiệm nail, salon: tạo thẻ QR miễn phí, cấp cho khách và đóng dấu mỗi lần đến",
  metaTitle: "Cách làm thẻ tích điểm cho tiệm nail, salon miễn phí",
  metaDescription:
    "Hướng dẫn tạo thẻ tích điểm có mã QR miễn phí cho tiệm nail, tóc, mi, spa: chọn số dấu và phần thưởng, cấp thẻ qua email, đóng dấu khi khách đến, đổi ưu đãi.",
  keyword: "cách làm thẻ tích điểm cho tiệm nail",
  keywords: [
    "thẻ tích điểm miễn phí cho salon",
    "thẻ tích điểm mã QR",
    "thẻ đóng dấu cho khách quen",
    "tạo thẻ tích điểm online không cần in",
    "thẻ tích điểm cho tiệm tóc, spa",
    "cách giữ khách quay lại tiệm nail",
    "tích đủ dấu được giảm giá",
  ],
  excerpt: "Không in thẻ giấy, khách không cần cài ứng dụng. Bạn chọn số dấu và phần thưởng, cấp thẻ qua email, rồi bấm “Đóng 1 dấu” mỗi lần khách đến.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-dua-the-tich-diem-tren-dien-thoai-de-quet"),
    alt: "Một phụ nữ tóc nâu đỏ đưa màn hình điện thoại ra, người đàn ông đối diện dùng điện thoại của mình quét, trong một salon có kệ sản phẩm",
  },
  takeaways: [
    "Thẻ tích điểm có mã QR của VaraaAi **miễn phí**, không cần in thẻ giấy và khách không cần cài ứng dụng.",
    "Việc đầu tiên là cài chương trình: chọn **“Số dấu để nhận ưu đãi”** và ghi **“Phần thưởng”**. Cài đặt áp dụng cho mọi thẻ, kể cả thẻ đã cấp.",
    "Khách có email nhận thẻ trong hộp thư. Khách không có email thì chụp lại mã QR trên màn hình.",
    "Mỗi lần khách đến bấm **“Đóng 1 dấu”**. Chỉ bấm “Đổi ưu đãi” khi khách dùng phần thưởng.",
    "Vào bằng nút dùng thử thì nhớ nhập email và bấm **“Lưu salon”**, để không mất thẻ khi đổi máy hay xóa trình duyệt.",
  ],
  intro: [
    "Cách làm thẻ tích điểm cho tiệm nail phổ biến nhất xưa nay là in một xấp thẻ giấy và mua con dấu. Cách đó chạy được, nhưng khách hay quên thẻ ở nhà, còn tiệm thì không biết ai đang có mấy dấu. Bài này hướng dẫn một cách khác: thẻ tích điểm có mã QR nằm trong điện thoại của khách, tạo miễn phí trên VaraaAi trong khoảng ba mươi giây.",
    "Bài viết đi theo bài học “Thẻ tích điểm miễn phí trong 30 giây” của VaraaAi Academy. Bạn sẽ tự cài được chương trình tích điểm, cấp thẻ cho khách đầu tiên, đóng dấu khi khách đến và đổi ưu đãi khi khách đủ dấu.",
  ],
  sections: [
    {
      id: "vi-sao-the-tich-diem-giu-khach",
      title: "Vì sao thẻ tích điểm là cách giữ khách quay lại tiệm nail, salon",
      blocks: [
        { p: "Khách đến một lần rồi không quay lại là chuyện tiệm nào cũng gặp. Họ không chê gì cả. Lần sau cần làm móng, họ chỉ đơn giản ghé tiệm nào tiện đường. Thẻ tích điểm cho họ một lý do cụ thể để chọn lại tiệm bạn: mỗi lần đến được một dấu, đủ số dấu thì được ưu đãi." },
        { p: "Thẻ nằm trong điện thoại bỏ được ba điểm vướng của thẻ giấy:" },
        {
          ul: [
            "**Không tốn tiền in.** Thẻ là một trang có mã QR, tạo xong là dùng.",
            "**Khách không quên thẻ.** Thẻ mở ngay trên điện thoại từ email, khách không cần cài ứng dụng nào.",
            "**Tiệm biết ai có mấy dấu.** Mỗi thẻ có mã riêng và nằm trong danh sách của tiệm.",
          ],
        },
        { p: "Thẻ trong bài này là một công cụ riêng, dùng được ngay cả khi tiệm chưa có trang đặt lịch trên VaraaAi. Salon đã dùng trang quản trị thì có chương trình tích điểm gắn với lịch hẹn, xem bài [thẻ tích điểm trong trang quản trị](lesson:the-tich-diem)." },
      ],
    },
    {
      id: "chon-so-dau-va-phan-thuong",
      title: "Chuẩn bị: chọn số dấu và phần thưởng",
      blocks: [
        { p: "Chương trình tích điểm chỉ có hai quyết định, và cả hai nên được nghĩ xong trước khi mở máy." },
        { h3: "Số dấu để nhận ưu đãi" },
        { p: "Màn hình cho chọn từ 3 đến 20 dấu. Trong video bài học, ví dụ là 10 dấu. Hãy chọn theo nhịp khách đến tiệm của bạn. Dịch vụ khách làm thường xuyên thì số dấu có thể nhiều hơn. Dịch vụ lâu lâu mới làm một lần thì nên chọn ít dấu, kẻo khách thấy phần thưởng quá xa và không buồn tích." },
        { h3: "Phần thưởng" },
        { p: "Ô “Phần thưởng” là một dòng chữ tự do. Ví dụ của bài học là “Giảm 15% lần tiếp theo”. Viết sao cho khách đọc là hiểu ngay mình được gì và dùng khi nào. Một phần thưởng mơ hồ kiểu “quà tặng hấp dẫn” không kéo ai quay lại." },
        { note: "Cài đặt chương trình áp dụng cho mọi thẻ, kể cả thẻ đã cấp. Điều này tiện khi bạn muốn chỉnh, nhưng cũng có nghĩa là đổi số dấu sẽ ảnh hưởng đến những khách đang tích dở. Hãy chọn kỹ từ đầu và hạn chế đổi.", kind: "warn", title: "Đổi cài đặt là đổi cho tất cả" },
      ],
    },
    {
      id: "hai-cach-bat-dau",
      title: "Tạo thẻ tích điểm online: dùng thử hay tạo bằng email",
      blocks: [
        { p: "Trang “Thẻ tích điểm miễn phí” có hai lối vào. Cả hai đều không cần đặt mật khẩu." },
        {
          table: {
            head: ["Cách", "Bạn làm gì", "Hợp khi"],
            rows: [
              ["Dùng thử", "Bấm nút “Dùng thử ngay”. Nút ghi rõ là không cần email", "Muốn xem trang quản lý trước, với một thẻ mẫu để bấm thử"],
              ["Tạo bằng email", "Nhập “Tên salon” và “Email của bạn”, rồi bấm “Tạo thẻ miễn phí”", "Đã quyết định dùng và muốn salon được lưu ngay"],
            ],
          },
        },
        { p: "Khi vào bằng nút dùng thử, salon chưa được lưu. Nó chỉ gắn với trình duyệt bạn đang dùng. Đổi máy hoặc xóa dữ liệu trình duyệt là mất thẻ của khách. Trang quản lý nhắc điều này bằng một khung “Salon của bạn chưa được lưu”, kèm ô nhập email và nút “Lưu salon”. Trong video, khung này còn ghi số thẻ dùng thử đã cấp, dưới dạng 0/3." },
        { note: "Nếu bạn định cấp thẻ cho khách thật, hãy lưu salon bằng email trước khi cấp tấm thẻ đầu tiên. Dùng thử là để xem, không phải để chạy lâu dài.", kind: "tip", title: "Lưu trước khi cấp thẻ thật" },
      ],
    },
    {
      id: "the-cua-khach",
      title: "Thẻ tích điểm mã QR của khách trông ra sao",
      blocks: [
        { p: "Sau khi được cấp thẻ, khách có một trang thẻ riêng. Trên đó là tên salon, tên khách, mã QR, hàng ô dấu, mã thẻ và dòng ưu đãi bạn đã ghi. Bên dưới thẻ có dòng cho biết khách còn mấy dấu nữa thì nhận ưu đãi." },
        { img: { src: img("the-vip-cua-khach-co-ma-qr"), alt: "Thẻ tích điểm màu hồng đậm trên điện thoại, có tên salon, tên khách, mã QR lớn, hàng ô dấu và dòng ưu đãi giảm 15%", caption: "Thẻ của khách: mã QR ở giữa, các ô dấu bên dưới, dòng ưu đãi ở cuối thẻ." } },
        { p: "Khách có email nhận thẻ ngay trong hộp thư và mở bằng một lần bấm. Trang thẻ còn gợi ý khách chụp màn hình thẻ để mở nhanh khi đến salon. Khách không có email vẫn được cấp thẻ: họ chụp lại mã QR đang hiện trên màn hình của bạn." },
        { p: "Bạn có thể gửi cho khách bài [thẻ thành viên salon](lesson:the-thanh-vien), viết cho phía khách, để họ hiểu cách tích và dùng thẻ." },
      ],
    },
    {
      id: "dong-dau-va-doi-uu-dai",
      title: "Đóng dấu cho khách quen và đổi ưu đãi tại quầy",
      blocks: [
        { p: "Hai nút trên thẻ làm hai việc khác nhau, và nhầm giữa chúng là lỗi dễ gặp nhất của nhân viên mới:" },
        {
          table: {
            head: ["Nút", "Bấm khi nào", "Điều xảy ra"],
            rows: [
              ["“Đóng 1 dấu”", "Mỗi lần khách đến", "Thẻ có thêm một dấu. Khách có email được báo tự động"],
              ["“Đổi ưu đãi”", "Khi khách đã đủ dấu và dùng phần thưởng", "Thẻ tự bắt đầu vòng mới"],
            ],
          },
        },
        { p: "Nên gắn việc đóng dấu vào một thời điểm cố định, ví dụ lúc khách thanh toán. Khi nó là một phần của khâu tính tiền, nhân viên ít quên và khách cũng quen đưa điện thoại ra." },
        { p: "Phần “Quét thẻ khi khách đến” có hai cách tìm thẻ: quét mã QR bằng camera, hoặc gõ mã thẻ vào ô tìm kiếm. Trong video, màn hình còn có một dòng nhắc cho trường hợp trình duyệt không quét được ngay trong trang: bạn mở camera của điện thoại và hướng vào mã QR, trang thẻ của khách sẽ hiện nút “Đóng 1 dấu”." },
        { img: { src: img("danh-sach-the-trong-muc-khach-hang"), alt: "Mục Khách hàng của trang quản lý thẻ với ô tìm theo tên, email hoặc mã thẻ và một thẻ mẫu có nút Đóng 1 dấu được khoanh vàng", caption: "Mục “Khách hàng” liệt kê mọi thẻ đã cấp. Bạn tìm theo tên, email hoặc mã thẻ." } },
        { p: "Trong mục “Khách hàng”, bạn xem được danh sách tất cả thẻ, tìm theo tên, email hoặc mã thẻ, và gửi lại email cho khách khi họ làm lạc thẻ." },
      ],
    },
    {
      id: "sau-khi-co-the",
      title: "Sau khi tiệm đã có thẻ tích điểm",
      blocks: [
        { p: "Thẻ chỉ có tác dụng khi khách biết đến nó. Hãy mời khách nhận thẻ ngay lần đầu họ đến, và đóng luôn dấu đầu tiên trước mặt họ. Một tấm thẻ đã có sẵn một dấu cho khách cảm giác mình đã bắt đầu." },
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Khách không có email", "Vẫn cấp thẻ. Khách chụp lại mã QR trên màn hình"],
              ["Khách quên mang điện thoại hoặc không mở được thẻ", "Gõ mã thẻ vào ô tìm kiếm, hoặc tìm theo tên trong mục “Khách hàng”"],
              ["Khách xóa mất email có thẻ", "Vào mục “Khách hàng” và gửi lại email cho khách"],
              ["Bấm nhầm “Đổi ưu đãi” thay vì “Đóng 1 dấu”", "Dặn nhân viên: “Đổi ưu đãi” chỉ dùng khi khách thật sự dùng phần thưởng"],
              ["Đã dùng thử và cấp thẻ cho khách", "Nhập email và bấm “Lưu salon” ngay để không mất thẻ"],
            ],
          },
        },
        { p: "Khi khách quen đã có thẻ, bước tiếp theo là để họ mang khách mới về. Bài [khách dẫn khách](lesson:khach-dan-khach) giải thích link mời bạn bè nằm sẵn trong thẻ tích điểm của trang quản trị." },
        { p: "Trang quản lý thẻ cũng giới thiệu lối đi lên VaraaAi đầy đủ cho salon, với đặt lịch online và nhắc lịch. Theo dòng mô tả trên màn hình, thẻ và dấu của khách được chuyển sang tự động khi bạn đăng ký bằng cùng email. Cách đăng ký nằm trong bài [đăng ký và kích hoạt salon](lesson:dang-ky-salon)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước làm thẻ tích điểm cho tiệm nail, salon trên VaraaAi",
    id: "cac-buoc-lam-the-tich-diem",
    after: "chon-so-dau-va-phan-thuong",
    lead: "Chín bước dưới đây theo đúng thứ tự trong video bài học. Bạn làm trên điện thoại ngay tại quầy cũng được.",
    steps: [
      {
        name: "Mở trang “Thẻ tích điểm miễn phí”",
        text: "Mở varaaai.com, kéo xuống cuối trang và bấm “Thẻ tích điểm miễn phí” trong nhóm dành cho doanh nghiệp. Bạn cũng có thể vào thẳng [trang tạo thẻ tích điểm](/loyalty-lite).",
        image: { src: img("bam-the-tich-diem-mien-phi-cuoi-trang-chu"), alt: "Phần cuối trang chủ VaraaAi trên điện thoại với dòng Thẻ tích điểm miễn phí được khoanh vàng trong nhóm Doanh nghiệp" },
      },
      {
        name: "Chọn cách bắt đầu",
        text: "Bấm nút “Dùng thử ngay” để vào thẳng trang quản lý với một thẻ mẫu, không cần email. Hoặc nhập “Tên salon” và “Email của bạn” rồi bấm “Tạo thẻ miễn phí”. Cả hai cách đều không cần đặt mật khẩu.",
        image: { src: img("dung-thu-ngay-hoac-tao-the-mien-phi"), alt: "Màn hình Chào mừng đến VaraaAi với nút hồng Dùng thử ngay được khoanh vàng, bên dưới là ô Tên salon, Email của bạn và nút Tạo thẻ miễn phí" },
      },
      {
        name: "Chọn “Số dấu để nhận ưu đãi”",
        text: "Trong trang quản lý, tìm phần “Chương trình tích điểm”. Bấm vào con số ở mục “Số dấu để nhận ưu đãi”, ví dụ 10. Đây là số lần khách cần đến để nhận phần thưởng.",
        image: { src: img("chon-so-dau-de-nhan-uu-dai"), alt: "Phần Chương trình tích điểm với bảng chọn Số dấu để nhận ưu đãi từ 3 đến 20 được khoanh vàng, số 10 đang được chọn" },
      },
      {
        name: "Ghi “Phần thưởng” và bấm “Lưu”",
        text: "Gõ phần thưởng vào ô “Phần thưởng”, ví dụ “Giảm 15% lần tiếp theo”, rồi bấm “Lưu”. Cài đặt này áp dụng cho mọi thẻ, kể cả thẻ đã cấp, nên hãy viết phần thưởng thật rõ ngay từ đầu.",
        image: { src: img("ghi-phan-thuong-va-bam-luu"), alt: "Phần Chương trình tích điểm với ô Phần thưởng ghi Giảm 15% lần tiếp theo và nút Lưu màu hồng bên dưới" },
      },
      {
        name: "Cấp thẻ cho khách",
        text: "Ở phần “Cấp thẻ cho khách”, nhập “Tên khách” và “Email của khách”, rồi bấm “Cấp thẻ và gửi email”. Khách nhận ngay thẻ có mã QR trong hộp thư. Khi ô email còn trống, nút chỉ ghi “Cấp thẻ”: bạn vẫn cấp được, và khách chụp lại mã QR trên màn hình.",
        image: { src: img("cap-the-cho-khach-bang-ten-va-email"), alt: "Phần Cấp thẻ cho khách với ô Tên khách, ô Email của khách còn trống và nút Cấp thẻ được khoanh vàng" },
      },
      {
        name: "Quét thẻ khi khách đến",
        text: "Mỗi lần khách đến, vào phần “Quét thẻ khi khách đến” và bấm “Mở camera quét mã”, rồi đưa điện thoại vào mã QR trên thẻ của khách. Không quét được thì gõ mã thẻ vào ô tìm kiếm.",
        image: { src: img("quet-the-khi-khach-den"), alt: "Phần Quét thẻ khi khách đến được khoanh vàng, bên dưới là ô nhập mã thẻ và nút tìm kiếm hình kính lúp" },
      },
      {
        name: "Bấm “Đóng 1 dấu”",
        text: "Thẻ của khách hiện ra. Bấm “Đóng 1 dấu” trong khung dành cho salon. Thẻ có thêm một dấu, và khách có email được báo tự động là vừa có thêm dấu.",
        image: { src: img("bam-dong-1-dau-tren-the-cua-khach"), alt: "Thẻ của khách có 3 trên 10 dấu, nút Đóng 1 dấu trong khung Dành cho salon được khoanh vàng, bên dưới ghi còn 7 dấu nữa" },
      },
      {
        name: "Bấm “Đổi ưu đãi” khi khách dùng phần thưởng",
        text: "Khi khách đủ dấu, thẻ báo đã có ưu đãi. Lúc khách dùng ưu đãi đó, bấm “Đổi ưu đãi”. Thẻ tự bắt đầu vòng mới, và khách tiếp tục tích từ đầu.",
      },
      {
        name: "Nhập email và bấm “Lưu salon”",
        text: "Nếu bạn vào bằng nút dùng thử, salon chưa được lưu. Nhập email vào khung “Salon của bạn chưa được lưu” và bấm “Lưu salon”, để không mất thẻ của khách khi đổi máy hay xóa trình duyệt.",
        image: { src: img("nhap-email-va-bam-luu-salon"), alt: "Khung Salon của bạn chưa được lưu được khoanh vàng, có ô tên salon, ô nhập email và nút hồng Lưu salon" },
      },
    ],
  },
  faq: [
    {
      q: "Làm thẻ tích điểm cho tiệm nail trên VaraaAi có mất phí không?",
      a: "Không. Thẻ tích điểm có mã QR được tạo miễn phí. Bạn không cần in thẻ giấy, và khách không cần cài ứng dụng vì thẻ mở ngay trên điện thoại từ email.",
    },
    {
      q: "Khách không có email thì nhận thẻ tích điểm bằng cách nào?",
      a: "Thẻ vẫn được cấp. Khách chỉ cần chụp lại mã QR đang hiện trên màn hình, rồi đưa ảnh đó cho tiệm quét mỗi lần đến.",
    },
    {
      q: "Mỗi lần khách đến thì bấm nút nào trên thẻ?",
      a: "Bấm “Đóng 1 dấu”. Nút “Đổi ưu đãi” chỉ dùng khi khách đã đủ dấu và dùng phần thưởng. Sau khi đổi, thẻ tự bắt đầu vòng mới.",
    },
    {
      q: "Nên chọn bao nhiêu dấu thì khách được ưu đãi?",
      a: "Màn hình cho chọn từ 3 đến 20 dấu, và ví dụ trong bài học là 10 dấu. Hãy chọn theo nhịp khách đến tiệm: dịch vụ lâu lâu mới làm một lần thì nên chọn ít dấu để phần thưởng không quá xa.",
    },
    {
      q: "Vì sao phải bấm “Lưu salon” sau khi dùng thử?",
      a: "Salon dùng thử chỉ gắn với trình duyệt đang dùng cho đến khi bạn lưu bằng email. Nếu không lưu, bạn có thể mất thẻ của khách khi đổi máy hay xóa trình duyệt.",
    },
    {
      q: "Đổi số dấu hoặc phần thưởng thì thẻ đã cấp có đổi theo không?",
      a: "Có. Cài đặt ở phần “Chương trình tích điểm” áp dụng cho mọi thẻ, kể cả thẻ đã cấp. Vì vậy nên chọn kỹ số dấu và phần thưởng từ đầu.",
    },
  ],
  related: ["the-tich-diem", "khach-dan-khach", "the-qua-tang-salon", "the-thanh-vien"],
};

export default article;
