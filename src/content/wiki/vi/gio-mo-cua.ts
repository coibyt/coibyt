import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/gio-mo-cua/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cai-dat-gio-mo-cua-salon-ngay-nghi",
  lesson: "gio-mo-cua",
  category: "salon",
  title: "Cài đặt giờ mở cửa salon: lịch hằng tuần, giờ nghỉ trưa và ngày nghỉ lễ trên trang đặt lịch",
  metaTitle: "Cài đặt giờ mở cửa salon: lịch tuần, nghỉ trưa, ngày nghỉ lễ",
  metaDescription:
    "Cách cài đặt giờ mở cửa salon trên VaraaAi: dùng mẫu nhanh cho cả tuần, chỉnh từng ngày, thêm ca khi nghỉ trưa và chặn ngày nghỉ lễ để khách không đặt nhầm.",
  keyword: "cài đặt giờ mở cửa salon",
  keywords: [
    "giờ mở cửa tiệm nail trên trang đặt lịch",
    "cài giờ nghỉ trưa cho salon",
    "thêm ngày nghỉ lễ cho salon",
    "chặn ngày không nhận khách",
    "lịch làm việc hằng tuần của salon",
    "khách đặt lịch ngoài giờ mở cửa",
  ],
  excerpt: "Khách chỉ đặt được lịch trong giờ mở cửa. Một mẫu nhanh điền sẵn cả tuần, “Thêm ca” lo giờ nghỉ trưa, còn ngày lễ thì chặn bằng một lần bấm.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-thu-gian-trong-spa-sang-trong"),
    alt: "Khách nữ mặc áo choàng trắng ngồi thư giãn bên hồ nước trong spa có nến, một nhân viên áo đen mang khay đi ngang",
  },
  takeaways: [
    "Khách **chỉ đặt được lịch trong giờ mở cửa**, nên đây là việc phải làm trước khi nhận khách online.",
    "Bấm một **“Mẫu nhanh”** để điền sẵn cả tuần, sau đó vẫn chỉnh được từng ngày.",
    "Salon nghỉ trưa thì bấm **“Thêm ca”** để có ca thứ hai trong ngày. Khoảng giữa hai ca là giờ nghỉ.",
    "Ngày đã thêm ở **“Ngày nghỉ lễ & ngày đóng cửa”** thì khách không đặt được, kể cả khi đó là ngày làm việc trong tuần.",
    "Sau khi chỉnh giờ, nhớ bấm “Lưu giờ mở cửa”.",
  ],
  intro: [
    "Cài đặt giờ mở cửa salon là bước ngắn nhất trong cả quá trình đưa tiệm lên mạng, chỉ khoảng một phút, nhưng nó quyết định khách thấy những giờ nào để chọn. Trang đặt lịch chỉ cho khách đặt trong giờ tiệm mở. Nhập sai một ngày là khách đặt vào lúc không ai ở tiệm, hoặc ngược lại, tiệm mở mà không ai đặt được.",
    "Bài viết này đi theo bài học “Giờ mở cửa và ngày nghỉ” của VaraaAi Academy. Bạn sẽ điền được lịch hằng tuần, tách giờ nghỉ trưa thành hai ca, và chặn trước những ngày tiệm đóng cửa.",
  ],
  sections: [
    {
      id: "vi-sao-gio-mo-cua-phai-dung",
      title: "Vì sao giờ mở cửa phải đúng trước khi nhận khách đặt lịch online",
      blocks: [
        { p: "Khi khách gọi điện, người nghe máy tự biết hôm đó tiệm có mở không. Trang đặt lịch không có người đứng giữa như vậy. Nó dựa hoàn toàn vào giờ bạn đã nhập để quyết định cho khách thấy giờ nào." },
        { p: "Dòng giới thiệu ngay đầu mục “Giờ mở cửa” nói rõ nguyên tắc: khách chỉ đặt được lịch trong giờ mở cửa, và khi bạn thêm giờ nghỉ trưa hay ngày nghỉ lễ thì lịch đặt online tự cập nhật ngay. Bạn sửa giờ ở một chỗ, khách thấy thay đổi ở mọi nơi họ đặt lịch." },
        { p: "Một lịch hẹn rơi vào ngày tiệm đóng cửa gây phiền cho cả hai phía. Khách đến nơi thấy cửa khóa, còn bạn phải gọi xin lỗi và dời lịch. Một phút nhập giờ cho đúng rẻ hơn nhiều so với một lần như thế." },
      ],
    },
    {
      id: "chuan-bi",
      title: "Chuẩn bị: viết ra tuần làm việc thật của tiệm",
      blocks: [
        { p: "Trước khi mở máy, hãy trả lời bốn câu hỏi về tiệm mình:" },
        {
          ul: [
            "Tiệm mở những ngày nào trong tuần, nghỉ ngày nào.",
            "Mỗi ngày mở từ mấy giờ đến mấy giờ. Ngày cuối tuần có khác ngày thường không.",
            "Tiệm có đóng cửa nghỉ trưa không, từ mấy giờ đến mấy giờ.",
            "Sắp tới có ngày lễ hay ngày nào tiệm đóng cửa không.",
          ],
        },
        { note: "Ngay dưới tiêu đề “Lịch hằng tuần” có một dòng ghi múi giờ của salon. Hãy liếc qua dòng này. Múi giờ đi theo quốc gia bạn chọn lúc [đăng ký salon](lesson:dang-ky-salon), và mọi giờ mở cửa bạn nhập đều tính theo nó.", kind: "info", title: "Kiểm tra múi giờ" },
      ],
    },
    {
      id: "mau-nhanh-va-chinh-tung-ngay",
      title: "Mẫu nhanh và cách chỉnh giờ mở cửa từng ngày",
      blocks: [
        { p: "Mẫu nhanh là những khung giờ phổ biến đã được soạn sẵn. Bấm một mẫu, mọi ngày trong tuần được điền ngay. Trong video bài học có ba mẫu:" },
        {
          table: {
            head: ["Mẫu nhanh", "Nghĩa là"],
            rows: [
              ["T2–T6 · 9:00–18:00", "Mở từ thứ hai đến thứ sáu, 9 giờ đến 18 giờ"],
              ["T2–T7 · 9:00–19:00", "Mở từ thứ hai đến thứ bảy, 9 giờ đến 19 giờ"],
              ["Cả tuần · 10:00–20:00", "Mở cả bảy ngày, 10 giờ đến 20 giờ"],
            ],
          },
        },
        { p: "Ít tiệm nào khớp hoàn toàn với một mẫu. Hãy chọn mẫu gần nhất rồi sửa những ngày khác biệt. Mỗi ngày có một công tắc để bật hoặc tắt, và hai ô giờ để đổi giờ mở, giờ đóng. Ngày đang bật hiện chữ “Mở cửa” ngay dưới tên ngày." },
        { note: "Nếu thứ bảy tiệm đóng sớm hơn ngày thường, bạn chỉ cần sửa giờ đóng của riêng thứ bảy sau khi đã bấm mẫu nhanh. Không phải nhập lại cả tuần.", kind: "tip", title: "Mẹo nhỏ" },
      ],
    },
    {
      id: "gio-nghi-trua",
      title: "Cài giờ nghỉ trưa cho salon bằng “Thêm ca”",
      blocks: [
        { p: "Mỗi ngày có thể có hai ca. Khoảng thời gian giữa ca thứ nhất và ca thứ hai là giờ nghỉ, và khách không đặt được vào khoảng đó. Đây là cách chặn giờ nghỉ trưa mà không phải tắt cả ngày." },
        { p: "Ví dụ, tiệm làm buổi sáng đến 12 giờ, nghỉ một tiếng rồi làm tiếp đến tối. Bạn sửa ca thứ nhất cho kết thúc lúc 12 giờ, bấm “Thêm ca”, rồi đặt ca thứ hai bắt đầu từ 13 giờ. Khi đó khách không đặt được lịch vào khoảng từ 12 đến 13 giờ." },
        { p: "Tiệm một người làm càng nên dùng cách này. Không có ai thay ca, nên nếu không chặn giờ trưa thì lịch có thể kín từ sáng đến tối mà bạn không có lúc nào để ăn." },
      ],
    },
    {
      id: "ngay-nghi-le",
      title: "Thêm ngày nghỉ lễ cho salon và chặn ngày không nhận khách",
      blocks: [
        { p: "Lịch hằng tuần lặp lại mỗi tuần. Những ngày ngoại lệ thì nằm ở phần “Ngày nghỉ lễ & ngày đóng cửa”, phía dưới lịch tuần. Vào những ngày này khách không đặt được lịch, kể cả khi đó là ngày làm việc bình thường trong tuần." },
        { img: { src: img("bam-them-ngay-nghi"), alt: "Phần Ngày nghỉ lễ và ngày đóng cửa với ô Từ ngày, Đến ngày, ô lý do và nút Thêm ngày nghỉ được khoanh vàng", caption: "Ô “Đến ngày” không bắt buộc. Nghỉ một hôm thì chỉ cần chọn “Từ ngày”." } },
        { p: "Có hai cách thêm. Cách thứ nhất là tự chọn “Từ ngày”, chọn “Đến ngày” nếu nghỉ nhiều hôm liền, ghi lý do rồi bấm “Thêm ngày nghỉ”. Ô lý do gợi ý sẵn vài ví dụ như nghỉ Tết hay sửa chữa salon. Cách thứ hai là bấm vào một gợi ý trong danh sách các ngày lễ sắp tới ở ngay bên dưới, một lần bấm là thêm xong." },
        { note: "Hãy thêm ngày nghỉ càng sớm càng tốt, ngay khi bạn biết lịch nghỉ. Khách thường đặt trước nhiều ngày, và chặn ngày trước khi có ai đặt thì đỡ phải gọi dời lịch.", kind: "tip", title: "Làm sớm" },
      ],
    },
    {
      id: "gio-lam-tung-nhan-vien",
      title: "Giờ mở cửa của tiệm và giờ làm của từng nhân viên",
      blocks: [
        { p: "Giờ mở cửa là khung chung của cả tiệm. Bên trong khung đó, mỗi nhân viên có thể có lịch riêng, ví dụ ca sáng, ca chiều hoặc ngày nghỉ khác nhau. Lịch riêng này đặt ở trang “Nhân viên”, bằng nút “Lịch làm việc” trên thẻ của từng người. Bài [thêm nhân viên và phân quyền](lesson:nhan-vien) hướng dẫn phần đó." },
        { p: "Khi giờ mở cửa đã đúng, trang đặt lịch của bạn có đủ ba thứ khách cần: [dịch vụ và giá](lesson:dich-vu), người làm và giờ trống. Việc còn lại trước khi mời khách là [đặt chính sách hủy lịch](lesson:thanh-toan-chinh-sach), rồi [chia sẻ link đặt lịch](lesson:chia-se-link)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước cài đặt giờ mở cửa salon trên VaraaAi",
    id: "cac-buoc-cai-gio-mo-cua",
    after: "chuan-bi",
    lead: "Sáu bước đầu là lịch hằng tuần, hai bước cuối là ngày nghỉ. Tất cả nằm trong mục “Giờ mở cửa” của trang quản trị.",
    steps: [
      {
        name: "Mở mục “Giờ mở cửa”",
        text: "Trong trang quản trị, bấm mục “Giờ mở cửa” trên thanh menu. Phần đầu trang cho biết tiệm đang mở bao nhiêu giờ mỗi tuần và bao nhiêu ngày làm việc. Salon mới sẽ thấy các con số này bằng 0.",
        image: { src: img("mo-muc-gio-mo-cua-trong-trang-quan-tri"), alt: "Trang quản trị VaraaAi với mục Giờ mở cửa được khoanh vàng và thẻ Giờ làm việc của salon ghi 0 giờ mỗi tuần" },
      },
      {
        name: "Bấm một “Mẫu nhanh”",
        text: "Ở phần “Lịch hằng tuần”, bấm một “Mẫu nhanh”, ví dụ T2–T7 · 9:00–19:00. Mọi ngày được điền sẵn ngay. Đây là cách nhanh nhất để có giờ cho cả tuần.",
        image: { src: img("mau-nhanh-dien-gio-mo-cua-ca-tuan"), alt: "Phần Lịch hằng tuần với ba mẫu nhanh, mẫu thứ hai đến thứ bảy 9 giờ đến 19 giờ được khoanh vàng" },
      },
      {
        name: "Gạt công tắc để bật hoặc tắt từng ngày",
        text: "Mỗi ngày có một công tắc bên trái. Gạt tắt những ngày tiệm nghỉ, gạt bật những ngày tiệm mở. Kiểm tra lại ngày nghỉ hằng tuần của tiệm trước khi sang bước sau.",
        image: { src: img("gat-cong-tac-bat-tat-ngay-lam-viec"), alt: "Công tắc bật tắt của ngày Thứ 2 được khoanh vàng, bên dưới ghi Mở cửa cùng giờ mở và giờ đóng" },
      },
      {
        name: "Sửa giờ mở và giờ đóng",
        text: "Bấm vào ô giờ của từng ngày để đổi giờ mở và giờ đóng. Làm lần lượt những ngày có giờ khác với mẫu, ví dụ ngày cuối tuần.",
        image: { src: img("sua-gio-mo-va-gio-dong-cua-tung-ngay"), alt: "Hai ô giờ mở và giờ đóng của ngày Thứ 2 được khoanh vàng trong lịch hằng tuần của salon" },
      },
      {
        name: "Bấm “Thêm ca” nếu salon nghỉ trưa",
        text: "Nếu tiệm đóng cửa buổi trưa, bấm “Thêm ca” ở ngày đó để có ca thứ hai. Đặt ca thứ nhất kết thúc lúc bắt đầu nghỉ, ca thứ hai bắt đầu lúc mở lại. Khoảng giữa là giờ nghỉ.",
        image: { src: img("nut-them-ca-cho-salon-nghi-trua"), alt: "Nút Thêm ca ở góc phải ngày Thứ 2 được khoanh vàng, dùng để thêm ca thứ hai trong ngày" },
      },
      {
        name: "Bấm “Lưu giờ mở cửa”",
        text: "Khi có thay đổi, cuối màn hình hiện thanh nhắc bạn còn thay đổi chưa lưu. Bấm “Lưu giờ mở cửa”. Chưa bấm lưu thì trang đặt lịch vẫn dùng giờ cũ.",
        image: { src: img("bam-luu-gio-mo-cua"), alt: "Thanh thông báo Bạn có thay đổi chưa lưu ở cuối màn hình với nút Hoàn tác và nút Lưu giờ mở cửa được khoanh vàng" },
      },
      {
        name: "Thêm ngày nghỉ bằng “Từ ngày” và “Đến ngày”",
        text: "Kéo xuống phần “Ngày nghỉ lễ & ngày đóng cửa”. Chọn “Từ ngày”, chọn “Đến ngày” nếu nghỉ nhiều hôm, ghi lý do rồi bấm “Thêm ngày nghỉ”. Những ngày này khách sẽ không đặt được lịch.",
        image: { src: img("chon-tu-ngay-den-ngay-nghi-le"), alt: "Phần Ngày nghỉ lễ và ngày đóng cửa với hai ô Từ ngày và Đến ngày được khoanh vàng, bên dưới là ô ghi lý do" },
      },
      {
        name: "Hoặc bấm một gợi ý ngày lễ",
        text: "Bên dưới nút “Thêm ngày nghỉ” có danh sách gợi ý các ngày lễ sắp tới. Bấm vào một gợi ý là ngày đó được thêm ngay, không phải chọn ngày bằng tay.",
        image: { src: img("goi-y-ngay-le-sap-toi"), alt: "Danh sách gợi ý ngày lễ sắp tới như Đêm Giáng sinh, Giáng sinh, Đêm Giao thừa được khoanh vàng dưới nút Thêm ngày nghỉ" },
      },
    ],
  },
  faq: [
    {
      q: "Khách có đặt được lịch ngoài giờ mở cửa của salon không?",
      a: "Không. Khách chỉ đặt được những giờ hẹn nằm trong giờ mở cửa bạn đã cài, và không đặt được vào ngày nghỉ. Vì vậy giờ mở cửa cần được nhập đúng trước khi nhận khách online.",
    },
    {
      q: "Salon nghỉ trưa thì cài đặt thế nào?",
      a: "Bấm “Thêm ca” ở ngày đó để có ca thứ hai. Mỗi ngày có thể có hai ca, và khoảng thời gian giữa hai ca là giờ nghỉ, khách không đặt được vào lúc đó.",
    },
    {
      q: "Cách nhanh nhất để điền giờ mở cửa cho cả tuần là gì?",
      a: "Bấm một “Mẫu nhanh” ở phần “Lịch hằng tuần”, ví dụ T2–T7 · 9:00–19:00. Mẫu điền sẵn mọi ngày, sau đó bạn vẫn chỉnh được từng ngày.",
    },
    {
      q: "Thêm ngày nghỉ lễ cho salon ở đâu?",
      a: "Trong mục “Giờ mở cửa”, kéo xuống phần “Ngày nghỉ lễ & ngày đóng cửa”. Chọn “Từ ngày”, “Đến ngày”, ghi lý do rồi bấm “Thêm ngày nghỉ”, hoặc bấm một gợi ý ngày lễ có sẵn.",
    },
    {
      q: "Ngày nghỉ lễ trùng với ngày làm việc trong tuần thì khách có đặt được không?",
      a: "Không. Những ngày đã thêm ở “Ngày nghỉ lễ & ngày đóng cửa” thì khách không đặt được lịch, kể cả khi đó là ngày làm việc trong lịch hằng tuần.",
    },
    {
      q: "Mỗi nhân viên làm giờ khác nhau thì cài ở đâu?",
      a: "Giờ mở cửa là giờ chung của tiệm. Giờ làm riêng của từng người đặt ở trang “Nhân viên”, bằng nút “Lịch làm việc” trên thẻ của nhân viên đó.",
    },
  ],
  related: ["nhan-vien", "dich-vu", "thanh-toan-chinh-sach", "chia-se-link"],
};

export default article;
