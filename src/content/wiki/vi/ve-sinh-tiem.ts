import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/ve-sinh-tiem/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "ve-sinh-tiem-nail-spa-hang-ngay",
  lesson: "ve-sinh-tiem",
  category: "safety",
  title: "Vệ sinh tiệm nail, spa hằng ngày: lịch lau dọn, danh sách mở đóng cửa và kế hoạch tự kiểm soát",
  metaTitle: "Vệ sinh tiệm nail, spa hằng ngày: lịch lau dọn, checklist",
  metaDescription:
    "Vệ sinh tiệm nail, spa hằng ngày theo ví dụ của Helsinki: kế hoạch tự kiểm soát, lau sạch rồi khử khuẩn, giặt khăn, thông gió, rác và checklist mở đóng cửa.",
  keyword: "vệ sinh tiệm nail",
  keywords: [
    "checklist vệ sinh spa hằng ngày",
    "lịch lau dọn tiệm nail",
    "kế hoạch tự kiểm soát omavalvontasuunnitelma",
    "mở tiệm nail ở Phần Lan cần gì",
    "giặt khăn spa bao nhiêu độ",
    "thông gió tiệm nail",
    "quy định vệ sinh tiệm làm đẹp",
  ],
  excerpt: "Tiệm sạch nhờ những việc nhỏ làm đều mỗi ngày và được viết thành kế hoạch: lau gì, khi nào, bằng gì, ai làm. Ví dụ lấy từ hướng dẫn của Helsinki.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chu-tiem-lam-dep-trong-salon-sach-buoi-sang"),
    alt: "Nữ chủ tiệm tóc vàng mặc áo kem ôm tập hồ sơ, đứng giữa salon sáng sủa với dãy bàn làm móng bằng đá trắng",
  },
  takeaways: [
    "Viết ra một **kế hoạch lau dọn**: lau cái gì, bao lâu một lần, bằng dụng cụ và chất gì, ai làm.",
    "**Lau sạch trước rồi mới khử khuẩn**, vì chất bẩn làm dung dịch khử khuẩn mất tác dụng. Chỗ dính máu luôn phải khử khuẩn.",
    "Khăn lau giặt sau mỗi lần dùng ở ít nhất 60 °C, tốt nhất 90 °C. Khăn sạch và khăn bẩn cất riêng.",
    "Ở Helsinki, phần lớn tiệm làm đẹp phải thông báo với thành phố ít nhất 30 ngày trước khi mở và phải có kế hoạch tự kiểm soát.",
    "Biến kế hoạch thành hai danh sách ngắn lúc mở cửa và lúc đóng cửa, người làm tích và ký tên, chủ tiệm xem lại mỗi tuần.",
  ],
  intro: [
    "Vệ sinh tiệm nail hay spa là thứ khách cảm nhận được trước cả khi ngồi xuống ghế. Nhưng cái sạch thật sự không nằm ở mùi thơm hay ánh đèn đẹp. Nó nằm ở những việc nhỏ làm đều đặn mỗi ngày, và ở chỗ những việc đó được viết ra thành kế hoạch để ai trong tiệm cũng biết phần mình.",
    "Bài viết này viết lại bài học “Vệ sinh tiệm hằng ngày và kế hoạch tự kiểm soát” trong khóa Vệ sinh & an toàn của VaraaAi Academy. Bài lấy hướng dẫn của thành phố Helsinki (Phần Lan, bản 5/2025) làm ví dụ, có dẫn nguồn ở cuối bài. Nước khác, thành phố khác thì quy định sẽ khác, nhưng cách nghĩ gần như giống nhau. Đọc xong, bạn lập được lịch lau dọn và hai danh sách kiểm tra cho tiệm mình.",
  ],
  sections: [
    {
      id: "thong-bao-va-tu-kiem-soat",
      title: "Mở tiệm ở Helsinki: thông báo trước 30 ngày và kế hoạch tự kiểm soát",
      blocks: [
        { p: "Ở Helsinki, phần lớn tiệm làm đẹp phải gửi thông báo cho thành phố ít nhất 30 ngày trước khi bắt đầu hoạt động. Tiệm tóc chỉ phải thông báo nếu có làm dịch vụ trên da. Quy tắc này áp dụng cả khi bạn làm tại nhà hay làm tự do. Tiệm thay đổi lớn, đổi chủ hay đóng cửa cũng phải báo lại. Sau đó thành phố đến kiểm tra định kỳ và có thu phí." },
        { p: "Phần quan trọng hơn tờ thông báo là **kế hoạch tự kiểm soát**, tiếng Phần Lan gọi là omavalvontasuunnitelma. Tự kiểm soát nghĩa là chủ tiệm tự tìm ra những nguy cơ cho sức khỏe trong tiệm mình và nói được mình đã làm gì để ngăn chúng. Tiệm phải có kế hoạch này và phải làm đúng theo nó; thành phố khuyên viết ra giấy. Tiệm tóc dù không phải thông báo vẫn phải tự kiểm soát." },
        { img: { src: img("viet-ke-hoach-tu-kiem-soat-cua-tiem"), alt: "Nữ chủ tiệm mặc áo vest kem ngồi ở bàn làm việc, viết vào một tập hồ sơ mở, bên cạnh là máy tính xách tay" } },
        { h3: "Kế hoạch tự kiểm soát gồm những gì" },
        {
          table: {
            head: ["Phần", "Nội dung"],
            rows: [
              ["Mô tả tiệm", "Dịch vụ, giờ mở cửa, số người, chỗ rửa, nhà vệ sinh, máy móc"],
              ["Dụng cụ", "Cách làm sạch, khử khuẩn và tiệt trùng dụng cụ"],
              ["Các nguy cơ", "Khách nhạy cảm, côn trùng và chuột, chỗ cần sửa, lúc có dịch bệnh"],
              ["Cách phòng", "Hướng dẫn nhân viên, kế hoạch lau dọn, bảo trì thông gió, kiểm tra chỉ thị tiệt trùng"],
            ],
          },
        },
        { p: "Kế hoạch được cập nhật khi tiệm thay đổi. Phần dụng cụ, bàn tay và sự cố không cần chép lại dài dòng: chỉ cần ghi tiệm làm theo quy trình nào và ai chịu trách nhiệm. Ba quy trình đó có bài riêng: [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu), [Găng tay, rửa tay và đồ bảo hộ](lesson:rua-tay-gang-tay) và [Sơ cứu trong tiệm](lesson:xu-ly-su-co). Bài này nói về căn phòng: mặt bàn, sàn, khăn, nước, không khí và rác." },
      ],
    },
    {
      id: "lau-sach-roi-khu-khuan",
      title: "Lau sạch trước rồi mới khử khuẩn: lịch lau dọn tiệm nail, spa",
      blocks: [
        { p: "Nguyên tắc đầu tiên của việc lau dọn là thứ tự. Lau sạch trước, khử khuẩn sau, vì chất bẩn làm dung dịch khử khuẩn mất tác dụng. Xịt khử khuẩn thẳng lên một mặt bàn còn bụi móng và vệt kem thì chỉ tốn dung dịch." },
        {
          table: {
            head: ["Bề mặt", "Mức xử lý"],
            rows: [
              ["Không chạm vào vùng da đang làm", "Lau sạch là đủ"],
              ["Có chạm vào da khách", "Lau sạch rồi khử khuẩn"],
              ["Dính máu, dù có chạm vào khách hay không", "Luôn phải khử khuẩn"],
            ],
          },
        },
        { img: { src: img("lau-sach-mat-ban-lam-mong-bang-khan-am"), alt: "Nữ thợ làm đẹp mặc áo kem, đeo găng đen, lau mặt bàn đá trắng bằng khăn ẩm gấp gọn, tay kia cho khăn vào xô inox", caption: "Bước một: lau sạch chất bẩn nhìn thấy được." } },
        { img: { src: img("khu-khuan-goi-ke-tay-sau-khi-lau-sach"), alt: "Bàn tay đeo găng đen xịt dung dịch từ chai xịt trắng lên chiếc gối kê tay bằng da màu kem vừa được lau sạch", caption: "Bước hai: khử khuẩn bề mặt có chạm vào da khách, như gối kê tay." } },
        { h3: "Một lịch lau dọn hay gặp ở những tiệm làm tốt" },
        {
          table: {
            head: ["Khi nào", "Lau gì"],
            rows: [
              ["Sau mỗi khách", "Mặt bàn, gối kê tay, ghế, đèn và những chỗ tay thợ đã chạm"],
              ["Cuối mỗi ngày", "Lau sàn, đổ rác, lau tay nắm cửa, vòi nước, quầy lễ tân, rửa sạch chỗ rửa dụng cụ"],
              ["Mỗi tuần", "Tủ, kệ, chân bàn, ngăn kéo, cửa kính"],
            ],
          },
        },
        { note: "Lịch trên là cách làm tốt hay gặp, không phải quy định. Lau bao lâu một lần là do bạn quyết định, rồi ghi vào kế hoạch lau dọn cùng với dụng cụ, chất dùng để lau và tên người làm. Kế hoạch lau dọn nên để chung trong kế hoạch tự kiểm soát.", kind: "info", title: "Bạn tự quyết định tần suất" },
        { h3: "Dụng cụ lau dọn cũng phải sạch" },
        {
          ul: [
            "Khăn lau giặt sau mỗi lần dùng, ít nhất 60 °C, tốt nhất 90 °C. Hoặc dùng khăn lau dùng một lần.",
            "Cây lau nhà và chổi không để dưới sàn, không cất trong nhà vệ sinh. Nên có một tủ riêng, có cửa.",
            "Nhà vệ sinh có bộ dụng cụ lau riêng, dễ phân biệt, ví dụ theo màu.",
          ],
        },
        { img: { src: img("tu-rieng-cat-dung-cu-lau-don-khan-theo-mau"), alt: "Tủ kem mở hai cánh, bên trong cây lau nhà và chổi treo trên móc, khăn lau nhiều màu xếp trên kệ cùng chai xịt" } },
      ],
    },
    {
      id: "khan-va-do-vai",
      title: "Giặt khăn và đồ vải: sạch và bẩn không bao giờ nằm cạnh nhau",
      blocks: [
        { p: "Khăn và đồ vải dùng trong công việc được giặt và sấy bằng máy. Máy giặt không đặt trong nhà vệ sinh. Đồ sạch và đồ bẩn cất riêng: khăn sạch trong tủ đóng cửa, khăn đã dùng trong thùng có nắp." },
        { img: { src: img("khan-sach-trong-tu-khan-ban-trong-thung-co-nap"), alt: "Tủ kem mở một cánh với các chồng khăn trắng gấp gọn bên trong, cách đó một quãng là thùng đựng khăn bẩn có nắp" } },
        { note: "Một lỗi hay gặp: chồng khăn sạch nằm trên kệ mở, ngay cạnh giỏ khăn bẩn. Khăn sạch để hở như vậy thì không còn chắc là sạch khi tới tay khách.", kind: "warn", title: "Lỗi hay gặp" },
      ],
    },
    {
      id: "nuoc-khong-khi-rac",
      title: "Chỗ rửa, thông gió, chậu cây và rác",
      blocks: [
        { h3: "Chỗ rửa cạnh chỗ làm" },
        { p: "Cạnh mỗi chỗ làm, hoặc ngay sát đó, cần có một chỗ rửa riêng để rửa tay và rửa dụng cụ, đi tới dễ dàng mà không phải qua một cánh cửa đóng. Nếu tiệm chỉ có một chỗ rửa thì nên là bồn đôi, hai ngăn. Rửa dụng cụ xong, rửa và khử khuẩn bồn rồi mới dùng lại cho khách. Nhà vệ sinh có chỗ rửa tay riêng, có xà phòng nước và khăn giấy." },
        { img: { src: img("bon-rua-tay-ngay-canh-ban-lam-mong"), alt: "Bàn làm móng bằng đá trắng có gối kê tay, ngay sát bên là bồn rửa tay với vòi vàng đồng, xà phòng và khăn giấy" } },
        { h3: "Thông gió tiệm nail" },
        { p: "Theo hướng dẫn của Helsinki, thông gió cần đạt ít nhất 6 lít không khí mỗi giây cho mỗi người. Tiệm có hơn hai khách cùng lúc, hay dùng hóa chất mùi mạnh, thì nên có thông gió cơ học. Bàn làm móng bột cần hút tại chỗ. Trong kế hoạch, ghi lịch thay lọc, vệ sinh miệng gió và số điện thoại bên quản lý tòa nhà. Vì sao không khí sạch lại quan trọng với người thợ, xem bài [Dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat)." },
        { img: { src: img("mieng-gio-thong-gio-tren-tran-tiem-nail"), alt: "Trần salon màu kem với một miệng gió tròn màu trắng, phía dưới là dãy bàn làm móng bằng đá và đèn chùm ở cuối phòng" } },
        { h3: "Chậu cây" },
        { p: "Điều này làm nhiều chủ tiệm bất ngờ: hướng dẫn khuyên không để chậu cây trong tiệm. Đất có rất nhiều vi sinh vật, và gió có thể mang chúng đi khắp phòng." },
        { img: { src: img("chau-cay-trong-tiem-lam-dep-khong-nen-de"), alt: "Một chậu cây lớn đặt ngay cạnh ghế làm móng, lá khô và đất vương ra sàn đá, bên cạnh thợ đang làm móng cho khách", caption: "Ví dụ về điều không nên: chậu cây có đất đặt sát chỗ làm cho khách." } },
        { h3: "Rác và vật sắc nhọn" },
        {
          ul: [
            "Thùng rác nguyên vẹn, có nắp, và được đổ đủ thường xuyên để nắp lúc nào cũng đóng được. Như vậy không có mùi, và côn trùng hay chuột không tìm tới.",
            "Kim, lưỡi dao và vật sắc nhọn bỏ vào hộp đựng vật sắc nhọn làm sẵn từ nhà máy, rồi mang tới điểm thu gom được phép. Ở Helsinki đó là các trạm Sortti.",
            "Thấy dấu hiệu côn trùng hay chuột thì xử lý ngay, đừng chờ.",
          ],
        },
      ],
    },
    {
      id: "danh-sach-mo-dong-cua",
      title: "Checklist vệ sinh lúc mở cửa và đóng cửa",
      blocks: [
        { p: "Một kế hoạch nằm trong ngăn kéo thì không giúp được ai. Cách dễ nhất để nó sống là rút nó thành hai tờ danh sách thật ngắn. Hai danh sách dưới đây là cách làm tốt hay gặp, bạn chỉnh lại cho hợp với tiệm mình." },
        {
          table: {
            head: ["Sáng mở cửa", "Tối đóng cửa"],
            rows: [
              ["Bật thông gió", "Lau bàn"],
              ["Thử nước nóng, nước lạnh", "Lau sàn"],
              ["Xà phòng và khăn giấy đủ", "Giặt khăn"],
              ["Túi tiệt trùng còn hạn", "Đổ rác"],
              ["Thùng rác đã đổ", "Rửa bồn rửa dụng cụ"],
              ["", "Ghi lại nếu có gì bất thường"],
            ],
          },
        },
        { img: { src: img("danh-sach-kiem-tra-ve-sinh-luc-mo-cua"), alt: "Nữ thợ làm đẹp mặc áo kem đứng ở quầy lễ tân, cầm bảng kẹp giấy và dùng bút tích vào danh sách kiểm tra" } },
        { p: "Ai làm thì tích vào và ký tên. Cuối tuần, chủ tiệm xem lại các tờ danh sách để thấy việc nào hay bị bỏ sót." },
        { note: "Trong VaraaAi, bạn vào “Tiện ích” → “Thông báo” để nhắc cả nhóm danh sách mở và đóng cửa, và dùng phần “Đào tạo” để nhân viên mới đọc kế hoạch tự kiểm soát ngay ngày đầu. Cách dùng có trong bài [Tiện ích nhóm](lesson:tien-ich-nhom).", kind: "tip", title: "Nhắc cả nhóm bằng VaraaAi" },
      ],
    },
    {
      id: "khi-thanh-tra-den",
      title: "Khi thanh tra đến, và quy định nơi bạn làm việc",
      blocks: [
        { p: "Người kiểm tra nhìn nhiều hơn một mặt bàn sạch. Họ có thể hỏi tiệm đã nhận ra những nguy cơ nào và đã làm gì với chúng. Một kế hoạch viết rõ ràng, cùng một tiệm làm đúng như kế hoạch, là câu trả lời tốt nhất." },
        { p: "Vệ sinh tiệm vì vậy không phải là một ngày tổng vệ sinh thật lớn, mà là những việc nhỏ mỗi ngày, mỗi người biết phần mình." },
        { note: "Quy định khác nhau theo từng nước và thành phố. Các yêu cầu trong bài là ví dụ từ hướng dẫn của thành phố Helsinki. Hãy hỏi cơ quan y tế nơi bạn làm việc để biết yêu cầu chính xác cho tiệm mình.", kind: "warn", title: "Hỏi cơ quan y tế địa phương" },
      ],
    },
  ],
  faq: [
    {
      q: "Lau bàn làm nail xong có cần khử khuẩn không?",
      a: "Tùy bề mặt. Bề mặt không chạm vào vùng da đang làm thì lau sạch là đủ. Bề mặt có chạm vào da khách, như mặt bàn và gối kê tay, thì lau sạch rồi khử khuẩn. Chỗ dính máu luôn phải khử khuẩn. Thứ tự luôn là lau sạch trước, vì chất bẩn làm dung dịch khử khuẩn mất tác dụng.",
    },
    {
      q: "Khăn spa và khăn lau nên giặt ở bao nhiêu độ?",
      a: "Theo hướng dẫn của thành phố Helsinki, khăn lau dọn giặt sau mỗi lần dùng ở ít nhất 60 °C, tốt nhất 90 °C, hoặc dùng khăn lau dùng một lần. Khăn và đồ vải dùng trong công việc được giặt và sấy bằng máy, khăn sạch cất trong tủ đóng cửa, khăn đã dùng để trong thùng có nắp.",
    },
    {
      q: "Kế hoạch tự kiểm soát (omavalvontasuunnitelma) là gì?",
      a: "Đó là bản kế hoạch trong đó chủ tiệm ghi ra những nguy cơ cho sức khỏe trong tiệm mình và cách tiệm phòng chúng, rồi làm đúng theo đó hằng ngày. Ở Helsinki, tiệm làm đẹp phải có kế hoạch này, và thành phố khuyên viết ra giấy. Nó gồm mô tả tiệm, cách xử lý dụng cụ, các nguy cơ và cách phòng.",
    },
    {
      q: "Mở tiệm nail ở Phần Lan có phải thông báo với thành phố không?",
      a: "Theo hướng dẫn của Helsinki, phần lớn tiệm làm đẹp phải gửi thông báo cho thành phố ít nhất 30 ngày trước khi bắt đầu, kể cả khi làm tại nhà hay làm tự do. Tiệm tóc chỉ phải thông báo nếu có dịch vụ trên da. Thành phố khác có thể có yêu cầu khác, nên hãy hỏi cơ quan y tế nơi bạn mở tiệm.",
    },
    {
      q: "Có nên để chậu cây trong tiệm nail, spa không?",
      a: "Hướng dẫn của Helsinki khuyên không để chậu cây trong tiệm, vì đất có rất nhiều vi sinh vật và gió có thể mang chúng đi khắp phòng.",
    },
    {
      q: "Checklist vệ sinh tiệm hằng ngày gồm những gì?",
      a: "Lúc mở cửa: bật thông gió, thử nước nóng và nước lạnh, kiểm tra xà phòng và khăn giấy, túi tiệt trùng còn hạn, thùng rác đã đổ. Lúc đóng cửa: lau bàn, lau sàn, giặt khăn, đổ rác, rửa bồn rửa dụng cụ và ghi lại điều bất thường. Người làm tích và ký tên, chủ tiệm xem lại mỗi tuần.",
    },
  ],
  related: ["ve-sinh-dung-cu", "rua-tay-gang-tay", "xu-ly-su-co", "di-ung-hoa-chat"],
};

export default article;
