import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/email-marketing/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "email-marketing-cho-salon",
  lesson: "email-marketing",
  category: "marketing",
  title: "Email marketing cho salon: 7 bước gửi email khuyến mãi đúng nhóm khách",
  metaTitle: "Email marketing cho salon: gửi email khuyến mãi trong 7 bước",
  metaDescription:
    "Hướng dẫn chủ tiệm nail, tóc, mi, spa gửi email khuyến mãi trên VaraaAi: chọn nhóm khách, dùng mẫu có sẵn, thêm phiếu ưu đãi, gửi thử rồi gửi ngay hoặc lên lịch.",
  keyword: "email marketing cho salon",
  keywords: [
    "gửi email khuyến mãi cho khách salon",
    "email chăm sóc khách hàng spa",
    "cách viết email khuyến mãi cho tiệm nail",
    "mẫu email ưu đãi cho salon",
    "kéo khách cũ quay lại salon",
    "điểm Vara là gì",
    "gửi email cho khách lâu chưa quay lại",
  ],
  excerpt: "Chọn đúng nhóm khách, bấm một mẫu có sẵn, thêm phiếu ưu đãi và nút đặt lịch, xem trước rồi gửi. Mỗi email gửi đi tốn 1 điểm Vara.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chu-salon-om-chao-khach-quen-quay-lai"),
    alt: "Hai phụ nữ ôm chào nhau giữa một salon sáng sủa có cửa kính lớn, phía sau là vài khách đang ngồi uống cà phê",
  },
  takeaways: [
    "Bước đầu tiên luôn là **chọn nhóm khách nhận**. Ưu đãi mời quay lại gửi cho nhóm “Lâu chưa quay lại” hiệu quả hơn gửi cho tất cả.",
    "Bấm một **mẫu có sẵn** để tiêu đề và lời nhắn được điền trước, rồi sửa lại cho hợp với tiệm.",
    "Nút **“+ Tên khách”** chèn tên từng người vào email, nên mỗi khách nhận một lời chào riêng.",
    "**“Xem trước email”** và **“Gửi thử”** đều miễn phí. Điểm chỉ trừ khi bạn gửi cho khách.",
    "Mỗi email gửi đi tốn **1 điểm Vara**. Nhận thêm điểm bằng “Điểm danh” hoặc giới thiệu salon khác dùng VaraaAi.",
  ],
  intro: [
    "Email marketing cho salon nghe như việc của những chuỗi lớn có phòng quảng cáo riêng, nhưng nhu cầu thì tiệm nào cũng có: khách cũ lâu không quay lại, tiệm có ưu đãi mới mà khách không hay biết. Một email gửi đúng người, có tên khách ở dòng chào và một nút đặt lịch ở cuối, làm thay bạn việc nhắn tay cho từng người.",
    "Bài viết này đi theo bài học “Email khuyến mãi và điểm Vara” của VaraaAi Academy. Đọc xong, bạn tự soạn được một chiến dịch email từ mẫu có sẵn, biết nên gửi cho nhóm khách nào, hiểu điểm Vara được trừ ra sao và xem được kết quả sau khi gửi.",
  ],
  sections: [
    {
      id: "vi-sao-gui-email",
      title: "Vì sao tiệm nên gửi email chăm sóc khách hàng",
      blocks: [
        { p: "Phần lớn khách không quay lại chẳng phải vì chê tiệm. Họ bận, họ quên, hoặc một tiệm khác gần nhà vừa nhắc họ trước. Người làm nghề nào cũng hiểu giữ một khách cũ đỡ tốn công hơn tìm một khách mới, nhưng giữa giờ làm thì không ai rảnh tay để nhắn cho từng người." },
        { p: "Email giải quyết đúng chỗ đó. Bạn viết một lần, chọn nhóm khách, và mỗi người nhận một thư có tên mình. Thư nằm trong hộp thư cho đến khi khách mở, khác với một bài đăng trôi đi sau vài giờ. Nếu tiệm đã dùng [Fanpage để đăng ưu đãi](lesson:fanpage), email là kênh bổ sung: bài đăng dành cho người đang theo dõi tiệm, còn email đến thẳng những khách đã từng đặt lịch." },
        { p: "Trong VaraaAi, phần này nằm ở mục “Marketing” của trang quản trị. Danh sách người nhận lấy từ chính khách của salon, nên bạn không phải chép địa chỉ email sang một công cụ khác." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị gì trước khi gửi email khuyến mãi cho khách",
      blocks: [
        { p: "Một chiến dịch email soạn xong trong vài phút nếu bạn đã quyết định trước ba điều:" },
        {
          ul: [
            "**Gửi cho ai.** Khách lâu chưa đến, khách mới hay khách quen cần ba lời nhắn khác nhau.",
            "**Ưu đãi cụ thể là gì.** Một câu ngắn, ví dụ như trong video bài học: giảm 20% mọi dịch vụ. Nếu ưu đãi có thời hạn thì chọn luôn ngày hết hạn.",
            "**Khách bấm vào đâu sau khi đọc.** Thông thường là nút đặt lịch, để khách giữ chỗ ngay lúc còn hứng thú.",
          ],
        },
        { p: "Bạn cũng nên có sẵn một tấm ảnh của tiệm hoặc của mẫu mới làm, vì phần “Ảnh minh họa” cho phép thêm ảnh vào email. Mục này không bắt buộc." },
        { note: "Trước khi soạn, xem số “Điểm Vara hiện có”, nằm bên dưới bước “Gửi chiến dịch” của mục “Marketing”. Mỗi email gửi đi tốn 1 điểm, nên số điểm cho bạn biết lần này gửi được cho bao nhiêu khách.", kind: "info", title: "Xem điểm trước" },
      ],
    },
    {
      id: "chon-nhom-khach",
      title: "Gửi cho ai: các nhóm khách và lời nhắn hợp với từng nhóm",
      blocks: [
        { p: "Dòng chữ ngay dưới tiêu đề “Chọn nhóm khách nhận” nói rõ ý của bước này: gửi đúng người, đúng lời nhắn thì khách thấy email thật sự dành cho mình. Mỗi nhóm trên màn hình ghi sẵn số khách đang có trong nhóm. Cột thứ ba của bảng dưới đây là gợi ý riêng của bài viết, bạn đổi theo tiệm mình." },
        {
          table: {
            head: ["Nhóm", "Gồm những ai", "Gợi ý lời nhắn (ví dụ)"],
            rows: [
              ["“Tất cả khách”", "Mọi khách đã từng đặt lịch", "Tin chung của tiệm, ví dụ một dịch vụ mới"],
              ["“Khách gần đây”", "Đến salon trong 60 ngày qua", "Nhắc lịch dặm hoặc lịch làm lại"],
              ["“Lâu chưa quay lại”", "Vắng từ 90 ngày, chưa có lịch hẹn", "Ưu đãi mời quay lại"],
              ["“Khách thân thiết”", "Đã đến từ 3 lần trở lên", "Lời cảm ơn kèm ưu đãi dành riêng"],
              ["“Khách mới”", "Lần đầu đến trong 30 ngày qua", "Lời chào và giới thiệu các dịch vụ khác của tiệm"],
              ["“Thành viên thẻ”", "Có thẻ thành viên của salon", "Tin về quyền lợi của thẻ"],
            ],
          },
        },
        { img: { src: img("nhom-khach-moi-thanh-vien-the-danh-ba-salon"), alt: "Các ô nhóm khách nhận gồm Khách mới và Thành viên thẻ được khoanh vàng, bên dưới là ô Danh bạ của salon", caption: "Kéo xuống trong bước 1 để thấy thêm các nhóm. Trong video còn có ô “Danh bạ của salon”, dành cho khách nhập từ Excel hoặc thêm tay." } },
        { p: "Bài học nhấn mạnh một ví dụ: ưu đãi kiểu “mời quay lại” gửi cho nhóm “Lâu chưa quay lại” sẽ hiệu quả hơn gửi cho tất cả. Lý do dễ hiểu. Khách vừa đến tuần trước mà nhận thư “lâu rồi không gặp” sẽ thấy tiệm gửi hàng loạt, và lần sau họ ít mở thư hơn." },
        { p: "Tiệm đã có [thẻ khách quen](lesson:the-khach-quen) thì nhóm “Thành viên thẻ” là nhóm nên viết riêng, vì đây là những người đã chọn gắn bó với tiệm. Còn muốn xem từng khách đã đến bao nhiêu lần, bạn mở mục [khách hàng](lesson:khach-hang)." },
      ],
    },
    {
      id: "viet-noi-dung-email",
      title: "Cách viết email khuyến mãi: tiêu đề, lời nhắn và phiếu ưu đãi",
      blocks: [
        { p: "Phần “Nội dung email” mở đầu bằng dòng “Bắt đầu nhanh với mẫu”. Bấm một mẫu, ví dụ “Ưu đãi giảm giá”, là các ô bên dưới được điền sẵn và bạn sửa được mọi thứ. Mỗi ô giữ một vai trò riêng trong hộp thư của khách:" },
        {
          table: {
            head: ["Ô", "Khách thấy ở đâu", "Nên viết thế nào"],
            rows: [
              ["“Tiêu đề email”", "Dòng in đậm trong hộp thư, trước khi mở", "Ngắn, nói thẳng ưu đãi, có tên khách"],
              ["“Dòng xem trước”", "Dòng chữ nhạt ngay dưới tiêu đề", "Thêm một lý do để mở thư, ví dụ thời hạn"],
              ["“Tiêu đề lớn trong email”", "Dòng chữ to đầu thư, sau khi mở", "Một câu, đúng với tiêu đề bên ngoài"],
              ["“Lời nhắn”", "Phần thân thư", "Vài câu như đang nói với một khách quen"],
            ],
          },
        },
        { img: { src: img("sua-loi-nhan-email-chen-ten-khach"), alt: "Ô Lời nhắn của email được khoanh vàng, mở đầu bằng Chào và ký hiệu tên khách, góc trên có nút Tên khách", caption: "Ký hiệu {ten} trong lời nhắn sẽ được thay bằng tên của từng khách khi gửi." } },
        { p: "Nút “+ Tên khách” chèn ký hiệu {ten} vào chỗ con trỏ đang đứng. Khi gửi, ký hiệu này được thay bằng tên của từng khách. Trong bản xem trước của video, tiêu đề “{ten} ơi, ưu đãi 20% dành riêng cho bạn” hiện thành “Anna ơi, ưu đãi 20% dành riêng cho bạn”. Một cái tên ở đầu dòng là khác biệt giữa một thư quảng cáo và một lời mời." },
        { h3: "Phiếu ưu đãi và nút bấm" },
        { p: "Bật “Thêm phiếu ưu đãi” thì giữa email có một phiếu màu vàng nổi bật. Bạn nhập nội dung ở ô “Ưu đãi”. Hai ô “Mã ưu đãi” và “Hạn dùng” là tùy chọn. Một phiếu có hạn dùng cho khách lý do để đặt lịch sớm thay vì để đó." },
        { p: "Ở “Nút bấm” có ba lựa chọn: “Đặt lịch”, “Link khác” và “Không có nút”. Với một email khuyến mãi, “Đặt lịch” là lựa chọn hợp lý nhất, vì khách bấm là đặt được ngay, theo đúng cách [đặt lịch làm đẹp online](lesson:dat-lich-online) mà họ đã quen." },
        { note: "Viết lời nhắn như bạn nói với khách tại quầy: xưng hô quen thuộc, câu ngắn, một ưu đãi duy nhất. Thư càng nhiều ý thì khách càng khó nhớ mình được mời làm gì.", kind: "tip", title: "Một thư, một lời mời" },
      ],
    },
    {
      id: "diem-vara",
      title: "Điểm Vara là gì và mỗi email tốn bao nhiêu điểm",
      blocks: [
        { p: "Điểm Vara là thứ bạn dùng để gửi email trong VaraaAi. Quy tắc rất gọn: mỗi email gửi đi tốn 1 điểm Vara. Gửi cho 40 khách thì trừ 40 điểm (con số 40 chỉ là ví dụ). “Gửi thử” về email của bạn thì miễn phí, điểm chỉ trừ khi gửi cho khách." },
        { p: "Ngay trong bước “Gửi chiến dịch” có ba con số để bạn kiểm tra trước khi bấm gửi: “Người nhận”, “Chi phí” và “Điểm còn lại”. Nhìn ba số này là biết chiến dịch sắp gửi cho bao nhiêu người và sau đó còn bao nhiêu điểm." },
        { img: { src: img("diem-vara-diem-danh-va-link-gioi-thieu"), alt: "Ô Điểm Vara hiện có ghi 1000 và nút Điểm danh cộng 5 điểm được khoanh vàng, bên dưới là Link giới thiệu làm chủ salon", caption: "Bên dưới bước “Gửi chiến dịch” trong video: số điểm hiện có, nút “Điểm danh” và link giới thiệu của salon." } },
        { p: "Bài học nêu hai cách nhận thêm điểm:" },
        {
          ul: [
            "**“Điểm danh”.** Nút này nằm cạnh số “Điểm Vara hiện có”. Trong video, nút ghi “Điểm danh +5 điểm”.",
            "**Giới thiệu salon khác dùng VaraaAi.** Bên dưới có “Link giới thiệu làm chủ salon” để bạn sao chép và gửi cho chủ tiệm quen. Dòng chú thích trong video ghi rằng khi có người đăng ký rồi hoàn thiện hồ sơ salon, bạn được thưởng điểm.",
          ],
        },
        { p: "Phần “Lịch sử điểm gần đây” ngay bên dưới ghi lại các lần cộng điểm, để bạn đối chiếu khi cần." },
      ],
    },
    {
      id: "sau-khi-gui",
      title: "Sau khi gửi: theo dõi lượt mở, lượt nhấp và vài tình huống hay gặp",
      blocks: [
        { p: "Chiến dịch đã gửi nằm trong thẻ “Chiến dịch”, cạnh thẻ “Soạn chiến dịch”. Ở đó bạn theo dõi được lượt mở và lượt nhấp. Hai con số này trả lời hai câu hỏi khác nhau. Lượt mở cho biết tiêu đề có đủ khiến khách tò mò hay không. Lượt nhấp cho biết sau khi đọc, khách có bấm nút hay không, tức là ưu đãi và lời nhắn có thuyết phục." },
        { p: "Mở nhiều mà nhấp ít thì lần sau giữ tiêu đề, sửa ưu đãi. Mở ít thì sửa tiêu đề và dòng xem trước trước khi nghĩ đến chuyện khác." },
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Nhóm đã chọn ghi 0 khách", "Chọn nhóm khác. Mỗi nhóm ghi sẵn số khách, nhóm trống thì chưa có ai để gửi"],
              ["Muốn thư đến vào một ngày giờ khác", "Chọn “Lên lịch” thay cho “Gửi ngay” rồi đặt ngày giờ bạn muốn"],
              ["Chưa chắc thư trông ra sao trong hộp thư thật", "Nhập email của bạn ở “Gửi thử tới email” rồi bấm “Gửi thử”. Không trừ điểm"],
              ["Muốn xem thư trên màn hình lớn", "Trong bản xem trước, chuyển giữa “Điện thoại” và “Máy tính”"],
              ["Không muốn có nút trong thư", "Ở “Nút bấm”, chọn “Không có nút”"],
            ],
          },
        },
        { p: "Email làm tốt nhất khi đi cùng một lý do để quay lại. Hai công cụ hợp với nó là [thẻ tích điểm](lesson:the-tich-diem), có sẵn một mẫu email “Tặng thẻ tích điểm” trong phần mẫu, và chương trình [khách dẫn khách](lesson:khach-dan-khach) cho những khách quen sẵn lòng giới thiệu bạn bè." },
      ],
    },
  ],
  howTo: {
    title: "Các bước làm email marketing cho salon trên VaraaAi",
    id: "cac-buoc-gui-email-khuyen-mai",
    after: "chuan-bi",
    lead: "Bảy bước dưới đây đi từ trên xuống dưới của thẻ “Soạn chiến dịch”, theo đúng thứ tự trong video bài học.",
    steps: [
      {
        name: "Mở mục “Marketing” và chọn nhóm khách nhận",
        text: "Trong trang quản trị, bấm mục “Marketing”. Ở “Chọn nhóm khách nhận”, bấm một nhóm: Tất cả khách, Khách gần đây, Lâu chưa quay lại, Khách thân thiết, Khách mới hoặc Thành viên thẻ. Nhìn số khách ghi trên từng ô trước khi chọn, để biết thư sẽ đến bao nhiêu người.",
        image: { src: img("muc-marketing-chon-nhom-khach-nhan-email"), alt: "Thẻ Soạn chiến dịch với tiêu đề Chọn nhóm khách nhận được khoanh vàng và ô Tất cả khách đang được chọn" },
      },
      {
        name: "Bấm một mẫu có sẵn ở “Nội dung email”",
        text: "Kéo xuống “Nội dung email” và bấm một mẫu, ví dụ “Ưu đãi giảm giá”. Tiêu đề và lời nhắn được điền sẵn. Cách này nhanh hơn viết từ trang trắng, và bạn vẫn sửa được từng chữ.",
        image: { src: img("chon-mau-email-uu-dai-giam-gia"), alt: "Phần Nội dung email với mẫu Ưu đãi giảm giá được khoanh vàng, bên dưới là ô Tiêu đề email và Dòng xem trước" },
      },
      {
        name: "Sửa tiêu đề, lời nhắn và chèn tên khách",
        text: "Sửa tiêu đề và lời nhắn cho đúng với ưu đãi của tiệm. Bấm “+ Tên khách” để email tự chào đúng tên từng người. Nếu có ảnh đẹp của tiệm, thêm vào phần “Ảnh minh họa”.",
      },
      {
        name: "Bật “Thêm phiếu ưu đãi”",
        text: "Gạt công tắc “Thêm phiếu ưu đãi” để giữa email có một phiếu vàng nổi bật. Nhập ưu đãi vào ô bên dưới, ví dụ “Giảm 20% mọi dịch vụ” như trong video. Chỉ ghi ưu đãi mà tiệm thật sự áp dụng khi khách đến.",
        image: { src: img("bat-them-phieu-uu-dai-trong-email"), alt: "Công tắc Thêm phiếu ưu đãi đang bật và được khoanh vàng, bên dưới là ô Ưu đãi ghi Giảm 20% mọi dịch vụ" },
      },
      {
        name: "Chọn nút bấm “Đặt lịch”",
        text: "Ở “Nút bấm”, chọn “Đặt lịch” để khách bấm là đặt được ngay. Ô “Chữ trên nút” cho bạn đổi dòng chữ hiện trên nút. Thiếu nút này, khách đọc xong ưu đãi vẫn phải tự đi tìm trang đặt lịch của tiệm.",
        image: { src: img("chon-nut-bam-dat-lich-trong-email"), alt: "Các ô Mã ưu đãi và Hạn dùng tùy chọn, bên dưới là ba lựa chọn nút bấm Đặt lịch, Link khác và Không có nút" },
      },
      {
        name: "Bấm “Xem trước email” và “Gửi thử”",
        text: "Bấm “Xem trước email” để thấy email đúng như trên điện thoại của khách, kể cả dòng tiêu đề trong hộp thư. Muốn chắc hơn, bấm “Gửi thử” để nhận một bản về email của bạn. Gửi thử miễn phí. Đọc lại tên tiệm, ưu đãi và hạn dùng ở bước này, vì thư đã gửi thì không sửa được nữa.",
        image: { src: img("xem-truoc-email-tren-dien-thoai"), alt: "Bản xem trước email ở chế độ Điện thoại, hiện dòng tiêu đề có tên khách Anna và thư của salon với logo tròn" },
      },
      {
        name: "Chọn “Gửi ngay” hoặc “Lên lịch” rồi bấm gửi",
        text: "Ở “Gửi chiến dịch”, chọn “Gửi ngay”, hoặc “Lên lịch” để gửi vào ngày giờ bạn muốn. Kiểm tra số người nhận và số điểm còn lại rồi bấm nút gửi màu vàng. Sau đó mở thẻ “Chiến dịch” để theo dõi lượt mở và lượt nhấp.",
        image: { src: img("gui-ngay-hoac-len-lich-chien-dich-email"), alt: "Bước Gửi chiến dịch với hai lựa chọn Gửi ngay và Lên lịch, ba ô Người nhận, Chi phí, Điểm còn lại và nút gửi màu vàng" },
      },
    ],
  },
  faq: [
    {
      q: "Gửi email khuyến mãi cho khách trên VaraaAi tốn bao nhiêu?",
      a: "Mỗi email gửi đi tốn 1 điểm Vara. Gửi thử về email của bạn thì miễn phí, điểm chỉ trừ khi gửi cho khách. Trước khi gửi, bước “Gửi chiến dịch” hiện rõ số người nhận, chi phí và số điểm còn lại.",
    },
    {
      q: "Hết điểm Vara thì nhận thêm bằng cách nào?",
      a: "Bài học nêu hai cách: bấm “Điểm danh”, hoặc giới thiệu salon khác dùng VaraaAi bằng link giới thiệu của bạn. Cả hai đều nằm ở phần điểm Vara trong mục “Marketing”.",
    },
    {
      q: "Nên gửi email cho tất cả khách hay chia theo nhóm?",
      a: "Nên chia theo nhóm. Ưu đãi kiểu mời quay lại gửi cho nhóm “Lâu chưa quay lại” sẽ hiệu quả hơn gửi cho tất cả, vì khách thấy email thật sự dành cho mình. Nhóm “Tất cả khách” hợp với tin chung của tiệm.",
    },
    {
      q: "Làm sao để email tự chào đúng tên từng khách?",
      a: "Khi soạn tiêu đề hoặc lời nhắn, bấm nút “+ Tên khách”. Một ký hiệu {ten} được chèn vào, và khi gửi nó được thay bằng tên của từng khách.",
    },
    {
      q: "Có xem được email trước khi gửi cho khách không?",
      a: "Có. Bấm “Xem trước email” để thấy email đúng như trên điện thoại của khách. Bạn cũng có thể bấm “Gửi thử” để nhận một bản về email của mình, không mất điểm.",
    },
    {
      q: "Có hẹn giờ gửi email khuyến mãi được không?",
      a: "Được. Ở bước “Gửi chiến dịch”, chọn “Lên lịch” thay cho “Gửi ngay” rồi đặt ngày giờ bạn muốn email được gửi đi.",
    },
    {
      q: "Làm sao biết khách có mở email của tiệm hay không?",
      a: "Mở thẻ “Chiến dịch” trong mục “Marketing”. Mỗi chiến dịch đã gửi có số lượt mở và lượt nhấp để bạn theo dõi.",
    },
  ],
  related: ["khach-hang", "the-tich-diem", "the-khach-quen", "fanpage"],
};

export default article;
