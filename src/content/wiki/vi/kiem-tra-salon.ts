import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/kiem-tra-salon/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "marketing-online-cho-salon-kiem-tra-mien-phi",
  lesson: "kiem-tra-salon",
  category: "marketing",
  title: "Marketing online cho salon bắt đầu từ đâu: kiểm tra miễn phí website, Google, Facebook, Instagram của tiệm",
  metaTitle: "Marketing online cho salon: kiểm tra miễn phí 4 kênh",
  metaDescription:
    "Cách dùng công cụ kiểm tra salon miễn phí của VaraaAi: nhận điểm hiện diện trực tuyến cho Website, Google, Facebook, Instagram và danh sách việc nên làm trước.",
  keyword: "marketing online cho salon",
  keywords: [
    "kiểm tra salon trên mạng",
    "điểm hiện diện trực tuyến của salon",
    "marketing online cho tiệm nail",
    "hồ sơ Google doanh nghiệp cho salon",
    "làm sao để khách tìm thấy tiệm nail trên Google",
    "từ khóa cho tiệm nail, tóc, spa",
    "kiểm tra website salon miễn phí",
  ],
  excerpt: "Nhập tên và địa chỉ salon, nhận điểm trên thang 100 cho Website, Google, Facebook, Instagram và danh sách việc nên làm trước. Không cần email hay đăng ký.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-tim-salon-tren-dien-thoai-truoc-khi-den"),
    alt: "Một phụ nữ trẻ tóc nâu dài ngồi trên ghế sofa cạnh cửa sổ có chậu cây, mỉm cười nhìn vào điện thoại trên tay",
  },
  takeaways: [
    "Công cụ kiểm tra salon của VaraaAi **miễn phí, không cần email, không cần đăng ký**. Kết quả hiện ngay trên trang.",
    "Báo cáo cho một **“Điểm hiện diện trực tuyến”** trên thang 100 và điểm riêng cho bốn kênh: Website, Hồ sơ Google, Facebook, Instagram.",
    "Mỗi kênh được xếp loại **Mạnh, Khá hoặc Yếu**. Bấm “Xem chi tiết” để biết vì sao.",
    "Phần **“Cơ hội lớn nhất của bạn”** cho biết việc cần làm trước, mỗi điểm có kèm mục “Nên làm gì”.",
    "Làm xong từng việc được gợi ý rồi kiểm tra lại để thấy điểm tăng.",
  ],
  intro: [
    "Marketing online cho salon thường bị hiểu là phải chạy quảng cáo hay đăng bài mỗi ngày. Việc nên làm trước tiên đơn giản hơn nhiều: xem tiệm mình đang trông thế nào trong mắt một người lạ vừa tìm thấy nó trên mạng. Khách mới thường tìm salon trên mạng trước khi đến, và họ chỉ thấy những gì đang có ở đó.",
    "Bài viết này đi theo bài học “Kiểm tra salon trông thế nào trên mạng” của VaraaAi Academy. Bạn sẽ dùng được công cụ kiểm tra miễn phí, đọc hiểu bản báo cáo, và biết chọn việc nào làm trước để có thêm khách.",
  ],
  sections: [
    {
      id: "vi-sao-can-kiem-tra",
      title: "Vì sao nên kiểm tra salon trên mạng trước khi làm marketing",
      blocks: [
        { p: "Chủ tiệm nhìn tiệm mình từ bên trong: biết giờ mở cửa, biết giá, biết đường đến. Khách mới nhìn từ bên ngoài, qua màn hình điện thoại. Nếu website không ghi giờ mở cửa hay bảng giá, họ không gọi điện để hỏi. Họ chuyển sang tiệm kế tiếp trong danh sách tìm kiếm." },
        { p: "Vì vậy, trước khi bỏ công sức vào bất cứ kênh nào, bạn cần biết kênh nào đang yếu và yếu ở đâu. Công cụ trong bài học chấm điểm website, Google, Facebook và Instagram của salon, rồi chỉ ra đúng việc cần làm để có thêm khách. Cả quá trình chỉ mất khoảng một phút." },
        { p: "Công cụ mở cho mọi người. Tiệm chưa dùng VaraaAi vẫn kiểm tra được, và tiệm chưa có website cũng vậy." },
      ],
    },
    {
      id: "cong-cu-kiem-tra-gi",
      title: "Công cụ kiểm tra những gì ở website, Google, Facebook và Instagram",
      blocks: [
        { p: "Ngay dưới nút kiểm tra có một bảng nhỏ ghi rõ những thứ được xem xét. Đọc bảng này, bạn hiểu luôn một salon cần có gì trên mạng:" },
        {
          table: {
            head: ["Kênh", "Được kiểm tra"],
            rows: [
              ["Website", "Tốc độ, hiển thị trên điện thoại, nút đặt lịch, bảng giá, giờ mở cửa"],
              ["Hồ sơ Google doanh nghiệp", "Hồ sơ và đánh giá"],
              ["Facebook và Instagram", "Công cụ tự tìm từ website của salon"],
              ["Từ khóa", "Từ khóa nên nhắm tới và gợi ý marketing"],
            ],
          },
        },
        { img: { src: img("cong-cu-kiem-tra-website-google-facebook-instagram"), alt: "Nút Kiểm tra miễn phí ngay màu cam, dòng Không cần email, không cần đăng ký và bảng Chúng tôi kiểm tra liệt kê Website, Hồ sơ Google, Facebook và Instagram, từ khóa", caption: "Bảng “Chúng tôi kiểm tra” nằm ngay dưới nút “Kiểm tra miễn phí ngay”." } },
        { p: "Năm mục của phần Website cũng là năm câu hỏi của một khách mới: trang có mở nhanh không, xem trên điện thoại có dễ không, đặt lịch ở đâu, giá bao nhiêu, mấy giờ mở cửa." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Cần chuẩn bị gì trước khi kiểm tra website salon miễn phí",
      blocks: [
        {
          ul: [
            "**Tên salon** viết đúng như trên biển hiệu và trên mạng.",
            "**Địa chỉ salon.** Trong video bài học, khi gõ địa chỉ, công cụ hiện gợi ý địa chỉ đầy đủ để chọn.",
            "**Loại hình salon**: salon nail, salon tóc, spa hay nối mi. Loại hình được dùng để gợi ý từ khóa và ý tưởng marketing.",
            "**Địa chỉ website**, nếu có. Ô này không bắt buộc, không có cũng không sao. Nếu có, công cụ tự tìm Facebook và Instagram của salon trên website.",
            "**Câu trả lời cho một câu hỏi:** salon đã có hồ sơ Google doanh nghiệp chưa. Không nhớ thì chọn “Không chắc”.",
          ],
        },
        { note: "Bạn không cần tạo tài khoản và không phải để lại email. Dòng chữ dưới nút kiểm tra ghi rõ: không cần email, không cần đăng ký, kết quả hiện ngay tại đây.", kind: "info", title: "Không cần đăng ký" },
      ],
    },
    {
      id: "doc-bao-cao",
      title: "Cách đọc điểm hiện diện trực tuyến của salon",
      blocks: [
        { p: "Báo cáo đi từ tổng quát đến chi tiết. Trên cùng là “Điểm hiện diện trực tuyến”, tính trên thang 100, kèm một nhận xét ngắn. Bên dưới là điểm của từng kênh, mỗi kênh cũng trên thang 100 và có xếp loại Mạnh, Khá hoặc Yếu." },
        { p: "Salon mẫu trong video bài học là một ví dụ để bạn hình dung. Các con số dưới đây là của salon mẫu đó, không phải mức chuẩn:" },
        {
          table: {
            head: ["Kênh", "Điểm của salon mẫu", "Xếp loại"],
            rows: [
              ["Tổng thể", "73/100", "Tốt, vẫn còn dư địa"],
              ["Website", "70/100", "Khá"],
              ["Hồ sơ Google", "90/100", "Mạnh"],
              ["Facebook", "65/100", "Khá"],
              ["Instagram", "65/100", "Khá"],
            ],
          },
        },
        { img: { src: img("diem-website-va-ho-so-google-cua-salon"), alt: "Hai thẻ điểm trong báo cáo: Website 70 trên 100 xếp loại Khá được khoanh vàng, bên dưới là Hồ sơ Google 90 trên 100 xếp loại Mạnh" } },
        { p: "Đừng dừng ở con số. Dưới mỗi thẻ điểm có dòng “Xem chi tiết”, bấm vào để biết vì sao kênh đó được chấm như vậy. Kênh có điểm thấp nhất chưa chắc là kênh cần làm trước. Phần tiếp theo của báo cáo mới trả lời câu đó." },
      ],
    },
    {
      id: "co-hoi-lon-nhat",
      title: "“Cơ hội lớn nhất của bạn”: việc nào nên làm trước",
      blocks: [
        { p: "Đây là phần quan trọng nhất của báo cáo. Nó liệt kê những điểm ảnh hưởng nhiều nhất đến việc khách có chọn salon của bạn hay không. Mỗi điểm được đánh số, có nhãn mức tác động, và kèm một mục “Nên làm gì”." },
        { img: { src: img("muc-nen-lam-gi-them-gio-mo-cua-len-website"), alt: "Hai điểm trong phần Cơ hội lớn nhất: không thấy giờ mở cửa và không thấy bảng giá trên trang web, mục Nên làm gì của điểm đầu được khoanh vàng", caption: "Mỗi điểm có nhãn mức tác động và một mục “Nên làm gì”." } },
        { p: "Hai điểm của salon mẫu trong video là không thấy giờ mở cửa và không thấy bảng giá trên trang web. Lời khuyên đi kèm: thêm giờ mở cửa từng ngày lên trang chủ, và hiển thị giá hoặc giá khởi điểm cho các dịch vụ chính. Với salon dùng VaraaAi, những việc hay được nhắc trong bảng kiểm tra đều có bài hướng dẫn riêng:" },
        {
          table: {
            head: ["Việc cần làm", "Bài hướng dẫn"],
            rows: [
              ["Cho khách thấy giờ mở cửa từng ngày", "[Cài đặt giờ mở cửa salon](lesson:gio-mo-cua)"],
              ["Hiển thị dịch vụ kèm giá", "[Menu dịch vụ salon](lesson:dich-vu) và [mẫu bảng giá tiệm nail, tóc, spa](lesson:bang-gia)"],
              ["Có website với nút đặt lịch", "[Làm website cho salon](lesson:website-salon)"],
              ["Có thêm đánh giá trên Google", "[Đánh giá và Google](lesson:danh-gia-google)"],
            ],
          },
        },
        { note: "Hãy chọn một việc, làm xong, rồi kiểm tra lại. Làm lần lượt từng việc giúp bạn thấy điểm tăng sau mỗi lần và biết việc nào thật sự có tác dụng.", kind: "tip", title: "Mỗi lần một việc" },
      ],
    },
    {
      id: "tu-khoa-nen-nham-toi",
      title: "Từ khóa cho tiệm nail, tóc, spa: báo cáo gợi ý những gì",
      blocks: [
        { p: "Cuối báo cáo có phần “Từ khóa nên nhắm tới”. Đây là những cụm từ khách có thể gõ khi tìm một tiệm như tiệm bạn. Gợi ý dựa trên loại hình và khu vực của salon, và dùng được cho website, Google, Facebook và YouTube." },
        { p: "Với salon nail mẫu trong video, các gợi ý ghép loại hình với tên đường của tiệm theo những kiểu sau:" },
        {
          ul: [
            "Loại hình kèm tên đường, ví dụ “salon nail” cộng với địa chỉ.",
            "Loại hình kèm “gần đây”.",
            "Loại hình kèm “uy tín”, “giá rẻ” hoặc “đánh giá tốt”.",
            "“Đặt lịch” kèm loại hình và tên đường.",
          ],
        },
        { img: { src: img("tu-khoa-nen-nham-toi-cho-salon-nail"), alt: "Phần Từ khóa nên nhắm tới được khoanh vàng, bên dưới là sáu cụm từ gợi ý ghép chữ Salon nail với tên đường, gần đây, uy tín, giá rẻ và đánh giá tốt" } },
        { p: "Cách dùng thực tế nhất là đưa những cụm từ này vào chỗ khách đọc: lời giới thiệu trên website, phần mô tả hồ sơ, chú thích bài đăng. Viết thành câu tự nhiên, đừng chép cả danh sách vào một chỗ." },
      ],
    },
    {
      id: "luu-va-kiem-tra-lai",
      title: "Lưu báo cáo và kiểm tra lại sau khi sửa",
      blocks: [
        { p: "Bấm “In / Lưu PDF” để giữ lại báo cáo. Bản lưu này là mốc so sánh: vài tuần sau, khi đã làm xong các việc được gợi ý, bạn kiểm tra lại và đặt hai bản cạnh nhau." },
        { img: { src: img("nut-in-luu-pdf-bao-cao-kiem-tra-salon"), alt: "Cuối phần nhận xét của báo cáo với nút In / Lưu PDF được khoanh vàng và nút Kiểm tra salon khác bên cạnh, bên dưới là thẻ điểm Website" } },
        { p: "Nút “Kiểm tra salon khác” đưa bạn về lại khung nhập để kiểm tra một tiệm nữa. Chủ có nhiều chi nhánh nên kiểm tra từng địa chỉ, vì mỗi chi nhánh có hồ sơ và địa chỉ riêng trên mạng. Việc quản lý nhiều địa điểm trong VaraaAi có trong bài học về [chi nhánh](lesson:chi-nhanh)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước kiểm tra salon trên mạng bằng công cụ miễn phí của VaraaAi",
    id: "cac-buoc-kiem-tra-salon",
    after: "chuan-bi",
    lead: "Sáu bước dưới đây theo đúng thứ tự trong video bài học. Từ lúc mở công cụ đến lúc có báo cáo chỉ mất khoảng một phút.",
    steps: [
      {
        name: "Mở công cụ kiểm tra salon",
        text: "Mở varaaai.com, kéo xuống cuối trang và bấm “Kiểm tra salon miễn phí” trong nhóm “Doanh nghiệp”, hoặc vào thẳng [công cụ kiểm tra salon](/salon-check). Bạn không cần đăng nhập.",
        image: { src: img("bam-kiem-tra-salon-mien-phi-cuoi-trang-chu"), alt: "Phần cuối trang chủ VaraaAi trên điện thoại với dòng Kiểm tra salon miễn phí được khoanh vàng trong nhóm Doanh nghiệp" },
      },
      {
        name: "Nhập “Tên salon” và “Địa chỉ salon”",
        text: "Ở khung “Kiểm tra salon của bạn”, gõ “Tên salon” rồi “Địa chỉ salon”. Viết tên đúng như khách vẫn thấy trên biển hiệu và trên mạng, để công cụ tìm đúng tiệm của bạn.",
        image: { src: img("nhap-ten-salon-va-dia-chi-de-kiem-tra"), alt: "Khung Kiểm tra salon của bạn với ô Tên salon được khoanh vàng, bên dưới là ô Địa chỉ salon và các gợi ý địa chỉ" },
      },
      {
        name: "Chọn “Loại hình salon” và điền “Website” nếu có",
        text: "Chọn “Loại hình salon”, ví dụ salon nail, salon tóc, spa hay nối mi. Nếu tiệm có website thì điền vào ô “Website”. Ô này không bắt buộc, nhưng có website thì báo cáo đầy đủ hơn vì công cụ tự tìm Facebook và Instagram của salon từ đó.",
        image: { src: img("dien-website-va-cau-hoi-ho-so-google-doanh-nghiep"), alt: "Ô Website không bắt buộc được khoanh vàng, bên dưới là câu hỏi Salon đã có hồ sơ Google doanh nghiệp chưa với ba lựa chọn và nút Kiểm tra miễn phí ngay" },
      },
      {
        name: "Trả lời câu hỏi về hồ sơ Google rồi bấm “Kiểm tra miễn phí ngay”",
        text: "Ở câu “Salon đã có hồ sơ Google doanh nghiệp chưa?”, chọn “Đã có”, “Chưa có” hoặc “Không chắc”. Sau đó bấm “Kiểm tra miễn phí ngay”. Không cần email, không cần đăng ký, và báo cáo hiện ra sau vài giây.",
        image: { src: img("bam-nut-kiem-tra-mien-phi-ngay"), alt: "Ba lựa chọn Đã có, Không chắc, Chưa có cho câu hỏi về hồ sơ Google doanh nghiệp và nút Kiểm tra miễn phí ngay màu cam được khoanh vàng" },
      },
      {
        name: "Đọc “Điểm hiện diện trực tuyến” và điểm từng kênh",
        text: "Xem điểm tổng trên thang 100 ở đầu báo cáo, rồi kéo xuống xem điểm của Website, Hồ sơ Google, Facebook và Instagram. Bấm “Xem chi tiết” dưới từng kênh để biết vì sao kênh đó được xếp loại Mạnh, Khá hay Yếu.",
        image: { src: img("diem-hien-dien-truc-tuyen-cua-salon-tren-100"), alt: "Đầu báo cáo hiện diện trực tuyến với vòng tròn điểm 73 trên 100 được khoanh vàng, bên dưới là tên salon mẫu và nhận xét Tốt, vẫn còn dư địa" },
      },
      {
        name: "Xem “Cơ hội lớn nhất của bạn” rồi bấm “In / Lưu PDF”",
        text: "Kéo xuống phần “Cơ hội lớn nhất của bạn” và đọc mục “Nên làm gì” của từng điểm. Bấm “In / Lưu PDF” để giữ báo cáo, hoặc “Kiểm tra salon khác” nếu bạn có nhiều chi nhánh. Làm xong từng việc thì quay lại kiểm tra lần nữa.",
        image: { src: img("co-hoi-lon-nhat-cua-ban-trong-bao-cao"), alt: "Tiêu đề Cơ hội lớn nhất của bạn được khoanh vàng, bên dưới là điểm số một có nhãn Tác động trung bình và mục Nên làm gì" },
      },
    ],
  },
  faq: [
    {
      q: "Kiểm tra salon trên VaraaAi có cần đăng ký hay để lại email không?",
      a: "Không. Công cụ miễn phí và mở cho mọi người, không cần email và không cần đăng ký. Bạn nhập thông tin salon, bấm “Kiểm tra miễn phí ngay” và kết quả hiện ngay trên trang.",
    },
    {
      q: "Công cụ kiểm tra salon chấm điểm những kênh nào?",
      a: "Bốn kênh: Website, Hồ sơ Google, Facebook và Instagram. Mỗi kênh có điểm trên thang 100 và được xếp loại Mạnh, Khá hoặc Yếu, cùng một điểm tổng gọi là “Điểm hiện diện trực tuyến”.",
    },
    {
      q: "Salon chưa có website thì có kiểm tra được không?",
      a: "Được. Ô “Website” không bắt buộc, bạn bỏ trống rồi vẫn bấm kiểm tra bình thường. Nếu có website, công cụ dùng nó để tự tìm Facebook và Instagram của salon.",
    },
    {
      q: "Phần nào trong báo cáo cho biết việc cần làm trước tiên?",
      a: "Phần “Cơ hội lớn nhất của bạn”. Ở đây liệt kê những điểm ảnh hưởng nhiều nhất đến việc khách có chọn salon hay không, và mỗi điểm có kèm mục “Nên làm gì”, ví dụ thêm giờ mở cửa hoặc hiển thị bảng giá trên website.",
    },
    {
      q: "Làm sao lưu lại báo cáo kiểm tra salon?",
      a: "Bấm “In / Lưu PDF” ở đầu báo cáo để in hoặc lưu thành tệp PDF. Bản lưu giúp bạn so sánh với lần kiểm tra sau, khi đã làm xong các việc được gợi ý.",
    },
    {
      q: "Salon có nhiều chi nhánh thì kiểm tra thế nào?",
      a: "Sau khi xem xong báo cáo của một tiệm, bấm “Kiểm tra salon khác” rồi nhập tên và địa chỉ của chi nhánh tiếp theo. Mỗi chi nhánh nhận một báo cáo riêng.",
    },
  ],
  related: ["website-salon", "bang-gia", "chia-se-link", "danh-gia-google"],
};

export default article;
