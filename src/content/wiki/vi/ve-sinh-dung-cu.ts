import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ve-sinh-dung-cu/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "khu-khuan-tiet-trung-dung-cu-nail-spa",
  lesson: "ve-sinh-dung-cu",
  category: "safety",
  title: "Khử khuẩn và tiệt trùng dụng cụ nail, mi, tóc, spa: quy trình sau mỗi khách",
  metaTitle: "Khử khuẩn, tiệt trùng dụng cụ nail, spa: quy trình 3 bước",
  metaDescription:
    "Quy trình xử lý dụng cụ sau mỗi khách cho tiệm nail, mi, tóc, spa: làm sạch, khử khuẩn, tiệt trùng, cất giữ. Dụng cụ nào cần mức nào, và lỗi hay gặp.",
  keyword: "khử khuẩn dụng cụ nail",
  keywords: ["tiệt trùng dụng cụ làm nail", "vệ sinh dụng cụ spa", "cách khử khuẩn kềm cắt da", "nồi hấp tiệt trùng dụng cụ nail", "khử khuẩn và tiệt trùng khác nhau thế nào", "vệ sinh dụng cụ tiệm tóc"],
  excerpt: "Làm sạch, khử khuẩn và tiệt trùng là ba mức khác nhau. Bài viết chỉ rõ dụng cụ nào cần mức nào và cách làm từng bước sau mỗi lượt khách.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-lam-dep-cam-tui-dung-cu-da-tiet-trung"),
    alt: "Nữ thợ làm đẹp mặc áo kem đứng ở góc xử lý dụng cụ, tay cầm túi tiệt trùng có kềm cắt da bên trong",
  },
  takeaways: [
    "Có ba mức: **làm sạch**, **khử khuẩn** và **tiệt trùng**. Mức sau không thay được mức trước.",
    "Luôn chà rửa trước. Chất bẩn còn bám sẽ che chắn cho vi khuẩn và làm hai bước sau mất tác dụng.",
    "Dụng cụ có thể đâm, cắt vào da hoặc chạm da bị trầy (kềm cắt da, dao, kim, cây nặn mụn, dụng cụ móng chân) phải được **tiệt trùng bằng nhiệt**.",
    "Đồ dùng một lần như dũa giấy, que gỗ, cọ mi thì dùng xong là bỏ.",
    "Xịt cồn rồi lau không phải là khử khuẩn đúng cách; dung dịch ngâm cũng không thay được nồi hấp.",
  ],
  intro: [
    "Khử khuẩn dụng cụ nail, mi, tóc hay spa là việc người thợ làm nhiều lần mỗi ngày, và cũng là việc dễ làm tắt nhất khi tiệm đông khách. Tay nghề giỏi đến đâu mà dụng cụ không sạch thì vẫn có thể làm khách bị nhiễm trùng.",
    "Bài viết này viết lại bài học “Xử lý dụng cụ sau mỗi khách” trong khóa Vệ sinh & an toàn của VaraaAi Academy. Bạn sẽ phân biệt được ba mức xử lý, biết dụng cụ nào cần mức nào, và có một quy trình cố định để làm theo sau từng lượt khách.",
  ],
  sections: [
    {
      id: "ba-duong-lay",
      title: "Mầm bệnh lây trong tiệm làm đẹp qua đường nào",
      blocks: [
        { p: "Vi khuẩn, nấm và vi rút, trong đó có vi rút viêm gan, đi từ khách này sang khách khác qua ba đường: **dụng cụ**, **bàn tay của thợ** và **các bề mặt** như mặt bàn, gối kê tay, giường, ghế." },
        { p: "Nguy cơ cao nhất là khi dụng cụ chạm vào da bị trầy xước hoặc niêm mạc, ví dụ vùng mắt khi nối mi. Một vết xước nhỏ do kềm cắt da gây ra là đủ để mầm bệnh đi vào. Vì vậy mức xử lý của mỗi dụng cụ phụ thuộc vào việc nó chạm vào đâu trên cơ thể khách." },
      ],
    },
    {
      id: "ba-muc-xu-ly",
      title: "Làm sạch, khử khuẩn và tiệt trùng khác nhau thế nào",
      blocks: [
        { p: "Ba từ này hay bị dùng lẫn với nhau, nhưng đó là ba mức khác hẳn." },
        {
          table: {
            head: ["Mức", "Làm gì", "Đạt được gì"],
            rows: [
              ["1. Làm sạch", "Chà rửa bằng nước, xà phòng và bàn chải", "Rửa trôi chất bẩn nhìn thấy được. Là bước bắt buộc trước hai mức sau"],
              ["2. Khử khuẩn", "Ngâm ngập trong dung dịch khử khuẩn dành cho dụng cụ, đúng nồng độ và thời gian", "Giảm số vi sinh vật xuống mức an toàn, nhưng chưa chắc diệt được bào tử"],
              ["3. Tiệt trùng", "Dùng nhiệt trong nồi hấp hoặc tủ sấy khô", "Diệt toàn bộ vi sinh vật, kể cả bào tử"],
            ],
          },
        },
        { note: "Dung dịch ngâm được quảng cáo là “tiệt trùng” không thay thế được nồi hấp hay tủ sấy khô.", kind: "warn", title: "Đừng tin vào tên gọi trên chai" },
      ],
    },
    {
      id: "dung-cu-nao-muc-nao",
      title: "Dụng cụ nào cần xử lý đến mức nào",
      blocks: [
        { p: "Cách nhớ đơn giản: dụng cụ càng có khả năng làm xước da thì mức xử lý càng cao." },
        {
          table: {
            head: ["Nhóm dụng cụ", "Ví dụ", "Mức tối thiểu sau mỗi khách"],
            rows: [
              ["Có chạm vào khách, không làm xước da", "Lược, kéo cắt tóc, tông đơ, nhíp nối mi", "Làm sạch và khử khuẩn"],
              ["Có thể đâm, cắt vào da hoặc chạm da bị trầy", "Kềm cắt da, dao, kim, cây nặn mụn, dụng cụ làm móng chân", "Làm sạch rồi tiệt trùng"],
              ["Đồ dùng một lần", "Dũa giấy, que gỗ, cọ mi, que gòn", "Bỏ đi, không dùng lại"],
            ],
          },
        },
        { img: { src: img("phan-loai-dung-cu-ban-va-do-dung-mot-lan"), alt: "Khay inox đựng kềm, cây đẩy da và kéo đã dùng đặt riêng, bên cạnh bàn tay đeo găng bỏ dũa và que gỗ vào thùng rác", caption: "Khách vừa đứng dậy: đồ dùng một lần vào thùng rác, dụng cụ kim loại vào khay đồ bẩn." } },
      ],
    },
    {
      id: "be-mat-va-ban-tay",
      title: "Bàn tay và bề mặt: hai đường lây còn lại",
      blocks: [
        { p: "Dụng cụ sạch đặt vào bàn tay bẩn thì cũng như không. Trước mỗi khách và trước khi đeo găng, rửa tay bằng xà phòng, lau khô rồi sát khuẩn tay. Găng tay chỉ bảo vệ trong thời gian ngắn nên phải thay thường xuyên. Đang đeo găng thì không chạm vào điện thoại, tay nắm cửa hay đèn; lỡ chạm rồi thì thay găng mới." },
        { p: "Sau mỗi khách, lau sạch mặt bàn, gối kê tay, giường và ghế, rồi khử khuẩn những bề mặt có chạm vào da khách. Khăn và giấy lót được thay mới cho từng người. Phần này có bài học riêng: [Rửa tay và găng tay](lesson:rua-tay-gang-tay)." },
      ],
    },
    {
      id: "tung-nghe",
      title: "Lưu ý riêng cho tiệm tóc, nối mi, móng chân và móng bột",
      blocks: [
        {
          ul: [
            "**Tiệm tóc:** dùng giấy quấn cổ một lần dưới áo choàng. Lược, kéo và tông đơ được làm sạch và khử khuẩn sau mỗi khách.",
            "**Nối mi:** nhíp được làm sạch và khử khuẩn sau mỗi khách. Cọ mi và que gòn chỉ dùng một lần.",
            "**Móng chân:** lót túi dùng một lần trong bồn ngâm chân, và để dụng cụ móng chân tách riêng với dụng cụ móng tay.",
            "**Móng bột:** cần máy hút bụi ngay tại bàn.",
          ],
        },
        { img: { src: img("giay-quan-co-dung-mot-lan-o-tiem-toc"), alt: "Thợ cắt tóc nam quấn dải giấy trắng dùng một lần quanh cổ khách trước khi choàng áo, trên bàn có bình ngâm lược", caption: "Ở tiệm tóc, giấy quấn cổ dùng một lần ngăn áo choàng chạm trực tiếp vào da khách." } },
      ],
    },
    {
      id: "khi-chay-mau",
      title: "Nếu lỡ làm khách chảy máu",
      blocks: [
        {
          ol: [
            "Dừng tay ngay.",
            "Đeo găng mới.",
            "Lau sạch, sát khuẩn và băng vết thương cho khách.",
            "Khử khuẩn mọi bề mặt dính máu.",
            "Đưa dụng cụ đó đi xử lý ngay, không dùng tiếp cho đến khi đã làm sạch và tiệt trùng.",
          ],
        },
        { p: "Nếu da hay móng của khách có dấu hiệu nhiễm trùng từ trước, hãy lịch sự từ chối và khuyên khách đi khám. Bài học [Khi nào không nên làm](lesson:khi-nao-khong-lam) nói kỹ về những trường hợp này, còn cách xử lý tai nạn trong tiệm có ở bài [Xử lý sự cố](lesson:xu-ly-su-co)." },
      ],
    },
    {
      id: "quy-dinh",
      title: "Quy định ở mỗi nơi một khác",
      blocks: [
        { p: "Mỗi nước và mỗi thành phố có yêu cầu riêng về vệ sinh trong tiệm làm đẹp. Ví dụ ở Phần Lan, phần lớn tiệm làm đẹp có chăm sóc da phải thông báo với cơ quan bảo vệ sức khỏe của thành phố ít nhất 30 ngày trước khi mở cửa và phải có kế hoạch tự kiểm soát vệ sinh. Các ví dụ trong bài này lấy từ hướng dẫn của thành phố Helsinki, có dẫn nguồn ở cuối bài." },
        { p: "Trước khi mở tiệm, hãy hỏi cơ quan y tế nơi bạn làm việc để biết yêu cầu chính xác về thiết bị tiệt trùng, sổ ghi chép và việc kiểm tra." },
        { note: "Sạch sẽ là lời quảng cáo tốt nhất của một salon. Khi tiệm đã có quy trình rõ ràng, hãy viết điều đó vào phần giới thiệu trên [trang salon của bạn](lesson:ho-so-salon) để khách đọc được trước khi đặt lịch.", kind: "tip", title: "Cho khách thấy tiệm bạn làm kỹ" },
      ],
    },
  ],
  howTo: {
    title: "Quy trình xử lý dụng cụ sau mỗi khách",
    id: "quy-trinh",
    after: "dung-cu-nao-muc-nao",
    lead: "Làm theo đúng thứ tự này cho mọi dụng cụ kim loại dùng lại. Bước tiệt trùng dành cho nhóm dụng cụ có thể làm xước da.",
    supplies: [
      "Khay riêng cho dụng cụ bẩn",
      "Găng tay, bàn chải, xà phòng",
      "Dung dịch khử khuẩn dành cho dụng cụ và hộp ngâm có nắp",
      "Túi tiệt trùng có vạch chỉ thị",
      "Nồi hấp hoặc tủ sấy khô",
      "Nơi cất khô, sạch, kín bụi",
    ],
    steps: [
      {
        name: "Phân loại ngay khi khách đứng dậy",
        text: "Đồ dùng một lần cho vào thùng rác. Dụng cụ kim loại cho vào khay riêng dành cho đồ bẩn, không để lẫn với đồ sạch.",
      },
      {
        name: "Làm sạch dưới vòi nước",
        text: "Đeo găng, mở dụng cụ ra hết cỡ, dùng bàn chải và xà phòng chà kỹ dưới vòi nước, nhất là các khớp và khe rãnh. Rửa ngay, đừng để chất bẩn khô lại. Sau đó tráng nước sạch và lau thật khô.",
        image: { src: img("cha-rua-kem-cat-da-bang-ban-chai-duoi-voi-nuoc"), alt: "Bàn tay đeo găng đen chà kềm cắt da đã mở hết cỡ bằng bàn chải dưới vòi nước", caption: "Mở kềm hết cỡ để bàn chải vào được khớp, nơi chất bẩn hay đọng lại." },
      },
      {
        name: "Ngâm khử khuẩn đủ thời gian",
        text: "Ngâm dụng cụ ngập hoàn toàn trong dung dịch khử khuẩn dành cho dụng cụ. Pha đúng nồng độ, ngâm đủ thời gian ghi trên nhãn, không rút ngắn. Thay dung dịch theo hướng dẫn của hãng.",
        image: { src: img("ngam-dung-cu-trong-dung-dich-khu-khuan"), alt: "Hộp nhựa trong chứa dung dịch khử khuẩn màu xanh, dụng cụ kim loại ngập hoàn toàn, bên cạnh là đồng hồ cát" },
      },
      {
        name: "Đóng túi tiệt trùng",
        text: "Với dụng cụ có thể đâm, cắt vào da: cho dụng cụ đã sạch và khô vào túi tiệt trùng rồi dán kín. Dụng cụ còn ướt hoặc còn bẩn thì chưa được đóng túi.",
        image: { src: img("cho-dung-cu-vao-tui-tiet-trung"), alt: "Bàn tay đeo găng cho kềm cắt da đã lau khô vào túi tiệt trùng trong suốt" },
      },
      {
        name: "Chạy nồi hấp hoặc tủ sấy khô",
        text: "Đưa túi vào nồi hấp hoặc tủ sấy khô và chạy đúng chương trình của máy. Trên túi thường có vạch chỉ thị đổi màu để cho biết mẻ hấp đã đạt; mẻ nào vạch không đổi màu thì làm lại.",
        image: { src: img("noi-hap-tiet-trung-dung-cu-nail"), alt: "Khay lưới chứa các túi dụng cụ được đưa vào nồi hấp tiệt trùng đặt trên mặt bàn đá" },
      },
      {
        name: "Ghi ngày và cất riêng",
        text: "Ghi ngày lên túi, cất ở nơi khô, sạch, kín bụi, tách riêng với đồ chưa tiệt trùng.",
      },
      {
        name: "Mở túi trước mặt khách",
        text: "Chỉ mở túi khi bắt đầu làm, ngay trước mặt khách. Khách nhìn thấy điều đó là yên tâm.",
        image: { src: img("mo-tui-dung-cu-tiet-trung-truoc-mat-khach"), alt: "Thợ nail xé túi tiệt trùng trước mặt khách nữ đang ngồi ở bàn làm móng" },
      },
      {
        name: "Lau và khử khuẩn bề mặt",
        text: "Lau sạch mặt bàn, gối kê tay, giường, ghế và khử khuẩn những bề mặt có chạm vào da khách. Thay khăn và giấy lót mới cho người tiếp theo.",
      },
    ],
  },
  faq: [
    {
      q: "Khử khuẩn và tiệt trùng khác nhau ở điểm nào?",
      a: "Khử khuẩn giảm số vi sinh vật xuống mức an toàn nhưng chưa chắc diệt được bào tử. Tiệt trùng diệt toàn bộ vi sinh vật, kể cả bào tử, và được thực hiện bằng nhiệt trong nồi hấp hoặc tủ sấy khô. Cả hai đều phải làm sau bước chà rửa.",
    },
    {
      q: "Xịt cồn lên kềm rồi lau khô có đủ không?",
      a: "Không. Xịt cồn qua loa rồi lau không phải là khử khuẩn đúng cách. Kềm cắt da là dụng cụ có thể cắt vào da nên cần được chà rửa sạch, lau khô rồi tiệt trùng trong nồi hấp hoặc tủ sấy khô.",
    },
    {
      q: "Vì sao phải rửa dụng cụ trước khi ngâm khử khuẩn?",
      a: "Vì chất bẩn còn bám sẽ che chắn cho vi khuẩn, làm cho khử khuẩn và tiệt trùng mất tác dụng. Nên rửa ngay sau khi dùng, trước khi chất bẩn kịp khô lại.",
    },
    {
      q: "Dũa giấy và que gỗ có khử khuẩn để dùng lại được không?",
      a: "Không. Đây là đồ dùng một lần, không làm sạch được đúng cách, nên dùng xong cho một khách là bỏ.",
    },
    {
      q: "Tiệm nhỏ không có nồi hấp thì làm thế nào?",
      a: "Dụng cụ có thể đâm hoặc cắt vào da vẫn cần được tiệt trùng bằng nhiệt, trong nồi hấp hoặc tủ sấy khô; dung dịch ngâm không thay thế được. Yêu cầu cụ thể về thiết bị khác nhau theo từng nước và thành phố, nên hãy hỏi cơ quan y tế nơi bạn làm việc.",
    },
    {
      q: "Túi dụng cụ đã tiệt trùng nên cất ở đâu?",
      a: "Ghi ngày lên túi và cất ở nơi khô, sạch, kín bụi, tách riêng với đồ chưa tiệt trùng. Túi chỉ được mở khi bắt đầu làm cho khách.",
    },
  ],
  related: ["rua-tay-gang-tay", "ve-sinh-tiem", "khi-nao-khong-lam", "xu-ly-su-co"],
};

export default article;
