import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mau-lich-hen/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "doi-mau-lich-hen-khach-dat-online",
  lesson: "mau-lich-hen",
  category: "salon",
  title: "Đổi màu lịch hẹn trên VaraaAi: phân biệt lịch khách tự đặt online và lịch salon tự thêm chỉ bằng một cái nhìn",
  metaTitle: "Đổi màu lịch hẹn: phân biệt lịch online và lịch tự thêm",
  metaDescription:
    "Cách đổi màu ô lịch hẹn trong Cài đặt của VaraaAi để phân biệt lịch khách tự đặt online với lịch salon tự thêm, và xem chính xác khách đặt lịch lúc nào.",
  keyword: "đổi màu lịch hẹn",
  keywords: [
    "màu ô lịch hẹn trên VaraaAi",
    "phân biệt lịch khách đặt online và lịch salon tự thêm",
    "lịch hẹn salon theo màu",
    "xem khách đặt lịch lúc nào",
    "cài đặt giao diện và màu sắc lịch hẹn",
    "khách tự đặt online là gì",
  ],
  excerpt: "Vào Cài đặt, tìm thẻ “Màu ô lịch hẹn” và chọn màu riêng cho từng loại lịch. Bấm vào một lịch hẹn để biết nó được tạo lúc nào.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-cat-toc-nam-cho-khach-trong-tiem-sang-trong"),
    alt: "Một thợ cắt tóc có râu mặc áo gi-lê đang dùng kéo và lược cắt tóc cho khách nam mỉm cười ngồi trên ghế da, cạnh cửa sổ khung đồng",
  },
  takeaways: [
    "Trên lịch hẹn, lịch **“Khách tự đặt online”** và lịch **“Salon tự thêm”** có màu khác nhau, và bạn tự chọn được màu cho từng loại.",
    "Chỗ đổi màu: **“Cài đặt”**, phần “Giao diện & màu sắc”, thẻ **“Màu ô lịch hẹn”**.",
    "Mỗi loại lịch có màu nền và màu chữ riêng. Bấm một ô màu có sẵn, hoặc bấm “Màu nền” và “Màu chữ” để tự chọn.",
    "Nếu hai loại lịch đang cùng màu, hệ thống nhắc bạn đổi.",
    "Bấm vào một lịch hẹn để đọc dòng “Khách đặt online lúc …” hoặc “Salon thêm lúc …”.",
  ],
  intro: [
    "Chủ tiệm tìm cách đổi màu lịch hẹn thường vì một lý do rất đời thường: nhìn vào lịch đầy ô mà không biết lịch nào khách tự đặt qua mạng, lịch nào do người trong tiệm nhập sau một cuộc điện thoại. Hai loại lịch này cần được nhìn khác nhau, vì chúng cho bạn biết khách đang đến với tiệm bằng đường nào.",
    "Bài viết này đi theo bài học “Màu riêng cho lịch online” của VaraaAi Academy. Bạn sẽ tự chọn được màu cho từng loại lịch, kiểm tra kết quả trước khi quay lại trang lịch, và biết cách xem chính xác một lịch hẹn được tạo vào lúc nào.",
  ],
  sections: [
    {
      id: "hai-loai-lich",
      title: "Khách tự đặt online và salon tự thêm: hai loại lịch trên cùng một trang",
      blocks: [
        { p: "Mọi lịch hẹn trong VaraaAi đến từ một trong hai nguồn. Thẻ “Màu ô lịch hẹn” mô tả từng nguồn bằng một dòng ngắn:" },
        {
          table: {
            head: ["Loại lịch", "Là gì", "Biểu tượng trên ô lịch"],
            rows: [
              ["“Khách tự đặt online”", "Lịch khách đặt qua trang đặt lịch hoặc website", "Quả địa cầu"],
              ["“Salon tự thêm”", "Lịch chủ salon hoặc nhân viên tự thêm vào", "Hình người kèm cây bút"],
            ],
          },
        },
        { img: { src: img("hai-loai-lich-hen-hai-mau-tren-lich-salon"), alt: "Lịch trong ngày của ba nhân viên với các ô lịch màu tím và một ô màu xanh lá có biểu tượng quả địa cầu được khoanh vàng", caption: "Trong video bài học, lịch khách tự đặt online có màu xanh, lịch salon tự thêm có màu tím." } },
        { p: "Lịch “Salon tự thêm” thường là khách gọi điện hoặc khách vãng lai, được nhập bằng cách nhấn giữ vào ô trống trên lịch. Cách thêm loại lịch này có trong bài [quản lý lịch hẹn salon](lesson:lich-hen)." },
      ],
    },
    {
      id: "vi-sao-nen-to-mau",
      title: "Vì sao nên có lịch hẹn salon theo màu",
      blocks: [
        { p: "Biểu tượng quả địa cầu đã cho biết nguồn của từng lịch, nhưng biểu tượng thì nhỏ. Trên màn hình điện thoại, giữa một ngày kín khách, màu là thứ mắt bắt được trước. Hai màu khác hẳn nhau giúp bạn đọc được ba điều mà không cần bấm vào ô nào:" },
        {
          ul: [
            "**Kênh đặt lịch online đang chạy ra sao.** Lịch toàn một màu “Salon tự thêm” nghĩa là khách vẫn phải gọi điện, và link đặt lịch chưa đến được với họ.",
            "**Lịch nào do người trong tiệm nhập.** Nếu có gì chưa rõ về một lịch như vậy, bạn hỏi nhân viên của mình trước. Với lịch online, khách đã tự chọn dịch vụ và giờ.",
            "**Ai trong tiệm đang nhận nhiều khách đặt qua mạng.** Ở cách xem theo ngày, mỗi nhân viên một cột, nên màu trong từng cột nói lên điều đó.",
          ],
        },
        { p: "Nếu phần lớn lịch vẫn là màu của “Salon tự thêm”, việc nên làm tiếp là đưa [link đặt lịch online cho salon](lesson:chia-se-link) đến nhiều nơi hơn, hoặc in một tấm [poster mã QR đặt lịch](lesson:poster-qr) đặt ở quầy." },
      ],
    },
    {
      id: "chon-mau-de-nhin",
      title: "Chọn màu ô lịch hẹn thế nào cho dễ nhìn",
      blocks: [
        { p: "Mỗi dòng trong thẻ “Màu ô lịch hẹn” có một hàng ô màu có sẵn, mỗi ô ghi chữ “Aa” để bạn thấy luôn màu nền và màu chữ đi với nhau ra sao. Trong video bài học, mỗi loại lịch có tám ô màu như vậy. Bên dưới là hai nút “Màu nền” và “Màu chữ” cho người muốn tự pha một màu khác hẳn." },
        { img: { src: img("chon-o-mau-co-san-cho-lich-khach-tu-dat-online"), alt: "Dòng Khách tự đặt online với tám ô màu có sẵn ghi chữ Aa được khoanh vàng, bên dưới là hai nút Màu nền và Màu chữ", caption: "Mỗi ô màu có sẵn là một cặp màu nền và màu chữ đã phối sẵn." } },
        { p: "Vài nguyên tắc chọn màu rút ra từ cách trang lịch được dùng hằng ngày:" },
        {
          ul: [
            "**Hai loại lịch nên khác hẳn tông.** Một màu lạnh và một màu ấm dễ phân biệt hơn hai sắc độ của cùng một màu. Nếu lỡ chọn hai màu giống nhau, hệ thống sẽ nhắc bạn đổi.",
            "**Chữ phải đọc được trên nền.** Khi tự chọn “Màu nền” và “Màu chữ”, hãy nhìn phần “Xem trước” để chắc tên khách và giờ hẹn vẫn rõ.",
            "**Cả tiệm dùng chung một quy ước.** Màu chỉ có ích khi mọi người trong tiệm đều biết màu nào nghĩa là gì. Đổi màu xong, hãy nói cho nhân viên biết.",
          ],
        },
        { note: "Lịch đã xong hoặc khách không đến vẫn giữ màu trạng thái riêng. Màu bạn chọn ở đây dùng để phân biệt nguồn của lịch, không thay thế màu trạng thái.", kind: "info", title: "Màu trạng thái vẫn giữ nguyên" },
      ],
    },
    {
      id: "xem-khach-dat-luc-nao",
      title: "Xem khách đặt lịch lúc nào trong chi tiết lịch hẹn",
      blocks: [
        { p: "Màu cho biết lịch đến từ đâu. Muốn biết lịch được tạo khi nào, bạn bấm vào lịch hẹn đó trên trang lịch. Trong phần chi tiết, ngay dưới ngày giờ hẹn, có một dòng nhỏ:" },
        {
          table: {
            head: ["Loại lịch", "Dòng trong chi tiết", "Ví dụ trong video bài học"],
            rows: [
              ["Khách tự đặt online", "“Khách đặt online lúc …”", "Khách đặt online lúc 09:47, 16/11/2026"],
              ["Salon tự thêm", "“Salon thêm lúc …”", "Salon thêm lúc 09:53, 16/11/2026"],
            ],
          },
        },
        { img: { src: img("dong-khach-dat-online-luc-trong-chi-tiet-lich-hen"), alt: "Chi tiết lịch hẹn Gel pedicure 55,00 € với dòng Khách đặt online lúc 09:47, 16/11/2026 có biểu tượng quả địa cầu được khoanh vàng" } },
        { p: "Dòng này ghi cả giờ và ngày, nên bạn biết chính xác lịch được tạo khi nào. Nó có ích trong vài việc cụ thể:" },
        {
          ul: [
            "Khi khách nói đã đặt từ lâu mà tiệm không nhớ, bạn mở lịch ra và đọc đúng thời điểm đặt.",
            "Khi cần đối chiếu với hạn hủy trong [chính sách hủy lịch của salon](lesson:thanh-toan-chinh-sach), bạn có mốc thời gian rõ ràng thay vì ước chừng.",
            "Khi muốn biết khách hay đặt vào lúc nào trong ngày, bạn xem dòng này ở vài lịch online gần đây.",
          ],
        },
        { img: { src: img("dong-salon-them-luc-trong-chi-tiet-lich-hen"), alt: "Chi tiết lịch hẹn Gel manicure 45,00 € với dòng Salon thêm lúc 09:53, 16/11/2026 có biểu tượng hình người được khoanh vàng", caption: "Với lịch do tiệm nhập, dòng này ghi “Salon thêm lúc …”." } },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi đổi màu lịch hẹn",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Không tìm thấy chỗ đổi màu", "Vào “Cài đặt”, kéo xuống phần “Giao diện & màu sắc”, tìm thẻ “Màu ô lịch hẹn”"],
              ["Hệ thống nhắc đổi màu", "Hai loại lịch đang cùng màu. Chọn một ô màu khác cho một trong hai dòng"],
              ["Không ưng ô màu có sẵn nào", "Bấm “Màu nền” và “Màu chữ” để tự chọn"],
              ["Lịch đã xong không đổi sang màu mới", "Đúng như thiết kế: lịch đã xong hoặc khách không đến giữ màu trạng thái riêng"],
              ["Muốn biết lịch này do ai tạo và lúc nào", "Bấm vào lịch hẹn, đọc dòng “Khách đặt online lúc …” hoặc “Salon thêm lúc …”"],
            ],
          },
        },
        { p: "Chọn màu là việc làm một lần. Sau đó, mỗi lần mở trang lịch, bạn đọc được nguồn của từng lịch ngay trong lúc tay vẫn đang làm cho khách." },
      ],
    },
  ],
  howTo: {
    title: "Các bước đổi màu lịch hẹn trong Cài đặt của VaraaAi",
    id: "cac-buoc-doi-mau-lich-hen",
    after: "vi-sao-nen-to-mau",
    lead: "Năm bước dưới đây theo đúng thứ tự trong video bài học, từ mục “Cài đặt” đến lúc kiểm tra lại trên lịch.",
    steps: [
      {
        name: "Mở “Cài đặt” và tìm thẻ “Màu ô lịch hẹn”",
        text: "Trong trang quản trị, vào mục “Cài đặt” và kéo xuống phần “Giao diện & màu sắc”. Tìm thẻ “Màu ô lịch hẹn”. Thẻ có hai dòng, “Khách tự đặt online” ở trên và “Salon tự thêm” ở dưới.",
        image: { src: img("the-mau-o-lich-hen-trong-cai-dat"), alt: "Thẻ Màu ô lịch hẹn trong Cài đặt với dòng Khách tự đặt online được khoanh vàng, bên dưới là các ô màu và dòng Salon tự thêm" },
      },
      {
        name: "Chọn màu cho dòng “Khách tự đặt online”",
        text: "Ở dòng “Khách tự đặt online”, bấm một ô màu có sẵn. Muốn một màu khác hẳn, bấm “Màu nền” và “Màu chữ” để tự chọn. Hãy lấy màu nổi cho loại lịch này, vì đó là những lịch đến mà tiệm không phải nhập.",
        image: { src: img("nut-mau-nen-va-mau-chu-tu-chon"), alt: "Hai nút Màu nền và Màu chữ dưới hàng ô màu của dòng Khách tự đặt online được khoanh vàng, phía dưới là dòng Salon tự thêm" },
      },
      {
        name: "Chọn màu cho dòng “Salon tự thêm”",
        text: "Làm tương tự với dòng “Salon tự thêm”: bấm một ô màu có sẵn, hoặc dùng “Màu nền” và “Màu chữ”. Chọn một màu khác tông với dòng trên. Nếu hai loại lịch đang cùng màu, hệ thống sẽ nhắc bạn đổi.",
        image: { src: img("chon-mau-cho-lich-salon-tu-them"), alt: "Dòng Salon tự thêm với hàng ô màu có sẵn và hai nút Màu nền, Màu chữ được khoanh vàng, bên dưới là phần Xem trước" },
      },
      {
        name: "Kiểm tra ở phần “Xem trước”",
        text: "Phần “Xem trước” ngay bên dưới hiện hai ô lịch mẫu, một ô ghi “Khách tự đặt online” và một ô ghi “Salon tự thêm”, với đúng màu bạn vừa chọn. Nhìn xem hai ô có khác nhau rõ không và chữ có dễ đọc không.",
        image: { src: img("xem-truoc-mau-hai-loai-lich-hen"), alt: "Phần Xem trước được khoanh vàng với hai ô lịch mẫu, ô màu xanh ghi Khách tự đặt online và ô màu tím nhạt ghi Salon tự thêm" },
      },
      {
        name: "Mở một lịch hẹn để xem lịch được tạo lúc nào",
        text: "Quay lại trang “Lịch hẹn” và bấm vào một lịch bất kỳ. Trong phần chi tiết, bạn thấy dòng “Khách đặt online lúc …” hoặc “Salon thêm lúc …”, kèm giờ và ngày lịch được tạo.",
      },
    ],
  },
  faq: [
    {
      q: "Đổi màu ô lịch hẹn trên VaraaAi ở đâu?",
      a: "Vào “Cài đặt”, kéo xuống phần “Giao diện & màu sắc” và tìm thẻ “Màu ô lịch hẹn”. Ở đó mỗi loại lịch có màu nền và màu chữ riêng để bạn chọn.",
    },
    {
      q: "Hai loại lịch được tô màu khác nhau là gì?",
      a: "Đó là “Khách tự đặt online”, tức lịch khách đặt qua trang đặt lịch hoặc website, và “Salon tự thêm”, tức lịch chủ salon hoặc nhân viên tự thêm vào. Nhìn màu là biết lịch đến từ đâu.",
    },
    {
      q: "Làm sao biết một lịch hẹn được đặt lúc nào?",
      a: "Bấm vào lịch hẹn trên lịch và đọc dòng “Khách đặt online lúc …”. Với lịch salon tự thêm, dòng đó ghi “Salon thêm lúc …”. Cả hai đều ghi giờ và ngày lịch được tạo.",
    },
    {
      q: "Chọn nhầm hai màu giống nhau cho hai loại lịch thì sao?",
      a: "Hệ thống sẽ nhắc bạn đổi. Bạn chỉ cần chọn một ô màu khác cho một trong hai dòng rồi xem lại ở phần “Xem trước”.",
    },
    {
      q: "Lịch đã hoàn thành hoặc khách không đến có đổi theo màu mới không?",
      a: "Không. Lịch đã xong hoặc khách không đến vẫn giữ màu trạng thái riêng. Màu trong thẻ “Màu ô lịch hẹn” chỉ dùng để phân biệt lịch khách tự đặt online với lịch salon tự thêm.",
    },
    {
      q: "Có tự chọn được màu ngoài các ô màu có sẵn không?",
      a: "Có. Ở mỗi dòng, bấm “Màu nền” và “Màu chữ” để tự chọn màu theo ý mình, rồi kiểm tra kết quả ở phần “Xem trước”.",
    },
  ],
  related: ["lich-hen", "thanh-toan-hoa-don", "chia-se-link", "khach-hang"],
};

export default article;
