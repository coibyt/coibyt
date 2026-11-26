import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/toc-tu-van-chia-vung-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "tu-van-kieu-toc-cho-khach",
  lesson: "toc-tu-van-chia-vung-hieu-dung",
  category: "hair",
  title: "Tư vấn kiểu tóc cho khách trước khi cắt: điểm chạm, đọc mái tóc và 5 thuật ngữ cần thuộc",
  metaTitle: "Tư vấn kiểu tóc cho khách trước khi cắt: thợ cần biết gì",
  metaDescription:
    "Tư vấn kiểu tóc cho khách: thống nhất độ dài bằng điểm chạm, đọc dáng mặt, mật độ, chất tóc, xoáy, tóc ướt và tóc khô, cùng đường chuẩn, góc nâng, lực căng.",
  keyword: "tư vấn kiểu tóc cho khách",
  keywords: [
    "cách tư vấn tóc cho khách",
    "tóc xoăn nên cắt ướt hay khô",
    "xoáy tóc cắt thế nào",
    "đường chuẩn trong cắt tóc là gì",
    "góc nâng tóc là gì",
    "vì sao phải chia vùng tóc",
    "kiểm tra chéo khi cắt tóc",
  ],
  excerpt: "Nhiều kiểu tóc hỏng từ năm phút đầu, khi thợ và khách chưa hiểu nhau. Cách thống nhất độ dài, đọc mái tóc khi còn khô và những chữ bài cắt nào cũng dùng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-toc-tu-van-cho-khach-truoc-guong-salon"),
    alt: "Thợ tóc nữ tóc bob nâu đứng sau khách tóc vàng dài ngồi trước gương bầu dục viền vàng trong một salon tóc kiểu Paris, cả hai mỉm cười",
  },
  takeaways: [
    "Đừng thống nhất bằng những chữ ít, nhiều, ngắn, dài. Dùng con số hoặc **một điểm chạm** trên người khách: đến cằm, chạm vai, ngang xương quai xanh.",
    "Đọc mái tóc **khi còn khô**: dáng mặt, dáng đầu, mật độ, chất tóc, độ xoăn và hướng mọc.",
    "Tóc gợn sóng và tóc xoăn **co lên khi khô**. Cắt dài hơn ý định, hoặc cắt khô theo kỹ thuật đã học.",
    "Chỗ có xoáy thường phải để dài hơn một chút, hoặc cắt theo chiều tóc mọc.",
    "Năm chữ bài cắt nào cũng dùng: **đường chuẩn, góc nâng, kéo lệch, lực căng, kiểm tra chéo**.",
  ],
  intro: [
    "Tư vấn kiểu tóc cho khách là phần việc diễn ra trước khi người thợ cầm kéo, và rất nhiều kiểu tóc hỏng ngay ở đó. Cây kéo không có lỗi. Kiểu tóc hỏng từ năm phút đầu, khi thợ và khách dùng cùng một chữ mà nghĩ đến hai độ dài khác nhau.",
    "Bài viết này viết lại bài học “Tư vấn và chia vùng tóc: hiểu đúng để cắt chuẩn” trong khóa Nghề Tóc của VaraaAi Academy. Đọc xong, bạn biết hỏi khách những gì, thống nhất độ dài sao cho không ai hiểu lầm, đọc một mái tóc trước khi làm ướt nó, và hiểu năm thuật ngữ sẽ gặp lại trong mọi bài cắt sau này.",
  ],
  sections: [
    {
      id: "vi-sao-hong-tu-luc-tu-van",
      title: "Vì sao nhiều kiểu tóc hỏng ngay từ lúc tư vấn",
      blocks: [
        { p: "Chuyện rất hay gặp: khách nói “chị cắt ít thôi”. Với khách, ít là một phân. Với thợ, ít có khi là năm phân. Cắt xong, khách buồn, còn thợ không hiểu mình sai ở đâu." },
        { p: "Bài học rút ra một quy tắc đơn giản: đừng nói chuyện bằng những chữ như ít, nhiều, ngắn, dài. Mỗi người hiểu những chữ ấy một kiểu. Một con số hoặc một điểm cụ thể trên người khách thì ai cũng hiểu như nhau." },
      ],
    },
    {
      id: "cach-tu-van-toc-cho-khach",
      title: "Cách tư vấn tóc cho khách: hỏi gì và thống nhất độ dài thế nào",
      blocks: [
        { p: "Một buổi tư vấn đủ ý đi qua ba việc." },
        {
          ol: [
            "Hỏi khách thích gì và không thích gì ở mái tóc hiện tại, và xin khách cho xem một tấm ảnh mẫu.",
            "Thống nhất độ dài bằng con số, hoặc bằng một **điểm chạm** trên người khách: đến cằm, chạm vai, ngang xương quai xanh.",
            "Cầm lọn tóc lên, đặt đúng chỗ ấy và hỏi lại.",
          ],
        },
        { img: { src: img("thong-nhat-do-dai-toc-bang-diem-cham-ngang-vai"), alt: "Thợ tóc giữ một lọn tóc vàng dài của khách giữa hai ngón tay ở ngang vai, khách nhìn vào gương bầu dục viền vàng trước mặt", caption: "Đặt lọn tóc đúng điểm chạm và hỏi lại: độ dài mới sẽ dừng ở đây." } },
        { note: "Luôn nói lại điều đã thống nhất bằng lời của mình: “Mình cắt đến ngang vai, đúng không chị?” Một câu hỏi tránh được cả một buổi khách không vui.", kind: "tip", title: "Một câu hỏi lại" },
        { h3: "Hỏi về cuộc sống của khách" },
        { p: "Ở nhà khách có sấy không, mỗi sáng mất bao lâu cho mái tóc, có hay buộc tóc lên, có chơi thể thao không. Một kiểu tóc đẹp ở tiệm mà khách không tự làm được ở nhà thì vài ngày sau khách sẽ không còn thích nó nữa." },
      ],
    },
    {
      id: "doc-mai-toc-khi-con-kho",
      title: "Đọc mái tóc khi còn khô: dáng mặt, mật độ, chất tóc và xoáy",
      blocks: [
        { p: "Kéo hết tóc ra sau và nhìn khuôn mặt: tròn, dài, vuông hay thon. Đường cắt, độ phồng và chỗ tóc dừng lại có thể làm khuôn mặt trông dài ra hoặc tròn đi. Dáng đầu cũng được nhìn theo cách ấy. Có người phía sau đầu khá phẳng; để thêm độ dày ở đó, đầu trông tròn và đẹp hơn." },
        {
          table: {
            head: ["Điều cần đọc", "Cách xem", "Ảnh hưởng đến cách cắt"],
            rows: [
              ["Mật độ", "Rẽ một đường ngôi, xem da đầu lộ ra nhiều hay ít", "Biết tóc dày hay thưa"],
              ["Chất tóc sợi mảnh", "Nhìn và sờ sợi tóc", "Để lộ mọi đường kéo, cắt sai một chút là thấy ngay"],
              ["Chất tóc sợi to", "Nhìn và sờ sợi tóc", "Cứng, dễ dựng lên"],
              ["Độ xoăn", "Thẳng, gợn sóng hay xoăn", "Mỗi loại cần một cách cắt khác"],
            ],
          },
        },
        { img: { src: img("re-ngoi-xem-mat-do-toc-va-da-dau"), alt: "Thợ tóc dùng hai bàn tay rẽ một đường ngôi thẳng trên đỉnh đầu khách tóc vàng, để lộ đường da đầu sạch và độ dày của tóc hai bên", caption: "Rẽ một đường ngôi để xem mật độ tóc và da đầu." } },
        { h3: "Xoáy tóc và hướng mọc" },
        { p: "Điều thợ mới hay bỏ qua là hướng mọc của tóc. Hầu như ai cũng có xoáy ở đỉnh đầu. Nhiều người có xoáy ở gáy, hoặc một chỏm tóc ở chân tóc mái. Ở những chỗ ấy tóc không nằm xuống theo ý mình, và cắt quá ngắn thì nó dựng đứng lên." },
        { img: { src: img("xoay-toc-o-dinh-dau-khach-nam"), alt: "Nhìn từ phía sau và trên xuống đỉnh đầu một khách nam tóc nâu sẫm, tóc mọc tỏa ra theo hình xoáy từ một điểm trên đỉnh", caption: "Xoáy ở đỉnh đầu: tóc tỏa ra từ một điểm và không nằm theo ý người cắt." } },
        { p: "Trước khi cắt, chải tóc theo nhiều hướng và xem nó rơi tự nhiên thế nào. Chỗ có xoáy thường phải để dài hơn một chút, hoặc cắt theo chiều tóc mọc." },
      ],
    },
    {
      id: "toc-xoan-cat-uot-hay-kho",
      title: "Tóc ướt và tóc khô: tóc xoăn nên cắt thế nào",
      blocks: [
        { p: "Khi ướt, sợi tóc nặng, thẳng ra và trông dài hơn. Với tóc gợn sóng và tóc xoăn, khi khô tóc co lên, có khi ngắn đi rất nhiều. Một lọn xoăn kéo thẳng tới dưới vai, khô rồi có thể chỉ còn ngang cằm." },
        { img: { src: img("toc-xoan-khi-uot-keo-thang-dai-qua-vai"), alt: "Khách nữ tóc xoăn màu hạt dẻ vừa gội, tóc ướt sẫm màu, thợ tóc kéo thẳng một lọn tóc ướt xuống quá vai", caption: "Tóc xoăn khi ướt: kéo thẳng thì dài quá vai." } },
        { img: { src: img("toc-xoan-khi-kho-co-len-ngang-cam"), alt: "Cũng mái tóc xoăn màu hạt dẻ ấy khi đã khô, các lọn xoăn bồng lên ngang cằm đến vai, thợ tóc đỡ một lọn xoăn trên đầu ngón tay", caption: "Cùng mái tóc đó khi khô: các lọn xoăn co lên, ngắn hơn hẳn." } },
        { p: "Vì vậy với tóc xoăn có hai cách: cắt dài hơn ý định, hoặc cắt khi tóc khô theo kỹ thuật bạn đã học. Cắt thì lúc nào cũng cắt thêm được, còn tóc đã cắt thì không nối lại được." },
      ],
    },
    {
      id: "da-dau-va-goi-dau",
      title: "Nhìn da đầu trước khi gội, và gội cho êm",
      blocks: [
        { p: "Trước khi gội, nhìn da đầu. Da đầu có vết thương hở, đang viêm, sưng đỏ, có mủ hoặc có chấy thì không làm dịch vụ. Nói nhỏ nhẹ, riêng với khách, và khuyên khách đi khám; đừng để khách ngượng trước người khác. Bài [Khi nào không nên làm](lesson:khi-nao-khong-lam) nói kỹ hơn về cách từ chối." },
        { p: "Với khách, gội là lúc thư giãn nhất. Với thợ, đó là lúc khách đánh giá mình có cẩn thận hay không. Mấy điều khách cảm nhận được ngay:" },
        {
          ul: [
            "Nước được thử trên cổ tay của thợ trước, rồi thợ hỏi khách nước như vậy được chưa. Nhiệt độ vòi có thể thay đổi bất ngờ, và mỗi người cảm nhận một khác.",
            "Khăn giữ cổ áo khô, cổ khách đặt êm trong lòng chậu, không bị cấn.",
            "Da đầu được xoa bằng đầu ngón tay, không bằng móng tay.",
            "Khi xả, một tay thợ che dọc chân tóc để nước không chảy vào mặt và tai.",
            "Tóc được thấm bằng khăn, ép nhẹ, không chà xát. Chà mạnh làm tóc rối và lớp biểu bì của sợi tóc xù lên.",
          ],
        },
        { p: "Thứ tự từng thao tác ở chậu gội, cách gỡ rối và cách kẻ từng đường ngôi nằm ở bài thực hành [cách chia vùng tóc khi cắt](lesson:toc-tu-van-chia-vung)." },
      ],
    },
    {
      id: "vi-sao-phai-chia-vung-toc",
      title: "Vì sao phải chia vùng tóc trước khi cắt",
      blocks: [
        { p: "Người thợ chỉ cắt chính xác được phần tóc mà mình nhìn thấy và kiểm soát được. Đường ngôi thẳng, mỗi lọn tóc vừa phải, thì lần nào bạn cũng tìm lại được đường cắt trước đó." },
        { p: "Cách chia phổ biến nhất là **bảy vùng**: vùng đỉnh, hai vùng hai bên tai, hai vùng chẩm phía sau và hai vùng gáy. Tóc mỗi vùng được xoắn gọn, kẹp phẳng sát đầu, và giữ ẩm đều bằng bình xịt." },
      ],
    },
    {
      id: "nam-thuat-ngu-cat-toc",
      title: "Đường chuẩn, góc nâng và ba thuật ngữ cắt tóc khác",
      blocks: [
        { h3: "Đường chuẩn" },
        { p: "Đường chuẩn là đường cắt đầu tiên. Mọi đường cắt sau đều dựa vào nó, nên nó lệch thì cả kiểu tóc lệch theo." },
        { img: { src: img("duong-chuan-dau-tien-o-gay-khi-cat-toc"), alt: "Cận cảnh phía sau gáy khách: tóc các vùng trên đã kẹp lên, thợ giữ một lớp tóc mỏng giữa hai ngón tay và đưa kéo cắt ngang", caption: "Đường cắt đầu tiên ở gáy trở thành đường chuẩn cho những lớp tóc thả xuống sau đó." } },
        { h3: "Góc nâng" },
        { p: "Góc nâng là góc giữa lọn tóc bạn cầm lên và đầu khách." },
        {
          table: {
            head: ["Góc nâng", "Cầm tóc thế nào", "Kết quả"],
            rows: [
              ["0°", "Tóc rơi thẳng xuống", "Đường bằng, nặng ở dưới"],
              ["45°", "Nâng chếch lên, nửa góc vuông", "Tầng thấp, vẫn giữ độ dày"],
              ["90°", "Vuông góc với da đầu", "Tầng đều theo dáng đầu"],
              ["180°", "Nâng thẳng lên trên đỉnh", "Tóc phía dưới dài dần, thành tầng dài"],
            ],
          },
        },
        { img: { src: img("goc-nang-90-do-toc-vuong-goc-voi-da-dau"), alt: "Nhìn từ bên cạnh, thợ tóc kéo một lọn tóc ẩm ở phía sau đỉnh đầu khách thẳng ra sau, vuông góc với đầu, giữa hai ngón tay", caption: "Góc nâng 90°: lọn tóc vuông góc với da đầu." } },
        { p: "Góc nâng được dùng nhiều nhất trong các bài cắt tầng, xem bài [cắt tóc tầng là gì](lesson:cat-nu-tang-hieu-dung)." },
        { h3: "Kéo lệch, lực căng và kiểm tra chéo" },
        {
          ul: [
            "**Kéo lệch** là kéo tóc ra khỏi chỗ nó rơi tự nhiên, về phía đường chuẩn. Kéo lệch về phía nào thì tóc dài dần ra phía ngược lại.",
            "**Lực căng** là độ căng khi bạn kéo lọn tóc: đều tay, vừa phải. Kéo quá căng, nhất là với tóc ướt, tóc xoăn hoặc ở chỗ vành tai, thì khô rồi tóc bật lên, ngắn hơn bạn muốn.",
            "**Kiểm tra chéo** là cắt xong theo một chiều thì chia lại theo chiều ngược lại để kiểm tra, rồi so hai bên trái phải.",
          ],
        },
        { img: { src: img("so-hai-ben-toc-de-kiem-tra-sau-khi-cat"), alt: "Thợ tóc đứng sau khách, giữ hai lọn tóc hai bên mặt khách ở cùng một độ cao trước ngực và so độ dài trong gương", caption: "So hai bên trái phải trong gương là bước cuối của kiểm tra chéo." } },
        { note: "Trong VaraaAi, ghi độ dài đã thống nhất, vị trí xoáy và chất tóc vào ghi chú trong [hồ sơ khách hàng](lesson:khach-hang), để lần sau ai làm cũng biết. Khi tạo [dịch vụ](lesson:dich-vu) cắt tóc, tính cả phần gội và chia vùng vào thời lượng.", kind: "tip", title: "Ghi lại cho lần sau" },
        { note: "Thời gian để dầu xả theo hướng dẫn của sản phẩm. Quy định vệ sinh khác nhau theo từng nước. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Lưu ý" },
      ],
    },
  ],
  faq: [
    {
      q: "Tư vấn kiểu tóc cho khách nên hỏi những gì?",
      a: "Hỏi khách thích gì và không thích gì ở mái tóc hiện tại, xin xem ảnh mẫu, rồi hỏi về thói quen ở nhà: có sấy không, mỗi sáng mất bao lâu, có hay buộc tóc, có chơi thể thao không. Sau đó thống nhất độ dài bằng con số hoặc một điểm chạm trên người khách và nói lại cho khách nghe.",
    },
    {
      q: "Khách nói “cắt ít thôi” thì cắt bao nhiêu?",
      a: "Đừng đoán. Ít với khách có thể là một phân, với thợ là năm phân. Hãy cầm lọn tóc, đặt ở một điểm cụ thể như chạm vai hay ngang xương quai xanh, và hỏi lại khách trước khi cắt.",
    },
    {
      q: "Tóc xoăn nên cắt ướt hay cắt khô?",
      a: "Tóc xoăn và gợn sóng co lên khi khô, có khi ngắn đi rất nhiều so với lúc ướt. Nếu cắt ướt thì để dài hơn ý định và không kéo căng. Cách còn lại là cắt khi tóc khô, theo kỹ thuật người thợ đã học.",
    },
    {
      q: "Chỗ có xoáy tóc thì cắt thế nào?",
      a: "Chải tóc theo nhiều hướng để xem nó rơi tự nhiên thế nào trước khi cắt. Chỗ có xoáy thường phải để dài hơn một chút hoặc cắt theo chiều tóc mọc, vì cắt quá ngắn thì tóc dựng đứng lên.",
    },
    {
      q: "Đường chuẩn trong cắt tóc là gì?",
      a: "Đường chuẩn là đường cắt đầu tiên của kiểu tóc. Mọi đường cắt sau đều được so và cắt theo nó, nên đường chuẩn phải đúng độ dài đã thống nhất với khách.",
    },
    {
      q: "Góc nâng 0°, 45°, 90° và 180° khác nhau thế nào?",
      a: "Ở 0° tóc rơi thẳng xuống và cho đường cắt bằng, nặng ở dưới. 45° cho tầng thấp, vẫn giữ độ dày. 90° là tóc vuông góc với da đầu, tạo tầng đều theo dáng đầu. 180° là nâng thẳng lên đỉnh, tóc phía dưới dài dần thành tầng dài.",
    },
  ],
  related: ["toc-tu-van-chia-vung", "cat-nu-bang-hieu-dung", "cat-nu-tang-hieu-dung", "cat-nam-co-ban-hieu-dung"],
};

export default article;
