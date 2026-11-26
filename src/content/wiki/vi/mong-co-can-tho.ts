import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mong-co-can-tho/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "mong-tay-co-can-tho-khong",
  lesson: "mong-co-can-tho",
  category: "tips",
  title: "Móng tay có cần thở không? Sự thật về việc cho móng nghỉ giữa các lần làm gel",
  metaTitle: "Móng tay có cần thở không? Khi nào nên cho móng nghỉ gel",
  metaDescription:
    "Móng tay có cần thở không, có cần nghỉ giữa các lần làm gel? Điều thật sự làm hại móng, khi nào nên dừng và hỏi bác sĩ, cách giữ móng khỏe khi làm gel liên tục.",
  keyword: "móng tay có cần thở không",
  keywords: [
    "móng có cần nghỉ giữa các lần làm gel",
    "làm gel liên tục có sao không",
    "khi nào nên cho móng nghỉ",
    "móng yếu sau khi làm gel",
    "móng nghi bị nấm có làm gel được không",
    "cách giữ móng khỏe khi làm gel",
  ],
  excerpt: "Móng không thở, nên “cho móng thở” không làm móng khỏe hơn. Điều làm móng yếu là cách tháo và cách dũa, và có những lúc thật sự nên dừng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-soi-mong-khach-bang-den-lup"),
    alt: "Nữ thợ nail mặc áo đen, đeo găng đen soi kỹ móng tay khách qua chiếc đèn lúp tròn trên bàn đá trong tiệm sang trọng",
  },
  takeaways: [
    "**Móng không thở.** Phần móng bạn nhìn thấy là chất sừng, không cần không khí.",
    "Móng được nuôi từ **gốc móng nằm dưới da**, qua các mạch máu.",
    "Thứ làm móng mỏng đi là **tự cạy gel, dũa mặt móng quá mạnh và tháo sai cách**.",
    "Nên nghỉ khi móng **mỏng, đau, đổi màu lạ hoặc nghi bị nấm**, và hỏi bác sĩ hoặc dược sĩ trước khi làm tiếp.",
    "Làm đúng cách, **thoa dầu mỗi ngày và tháo gel tại tiệm**, thì có thể làm gel liên tục mà móng vẫn ổn.",
  ],
  intro: [
    "Móng tay có cần thở không, và có phải cứ vài lần làm gel thì nên để móng trần một thời gian cho nó “thở”? Đây là lời khuyên rất nhiều người nghe, từ bạn bè đến người nhà. Câu trả lời ngắn: móng không thở. Nhưng điều đó không có nghĩa là móng không bao giờ cần nghỉ. Nó cần nghỉ vì những lý do khác, và nhận ra đúng lý do mới giúp móng khỏe thật.",
    "Bài viết đi theo bài học “Móng tay có cần “thở” giữa các lần làm gel?” trong khóa “Moja Beauty: mi, móng và mày đẹp” của VaraaAi Academy, từ tiệm Moja Beauty ở Helsinki. Đọc xong, bạn sẽ biết móng được nuôi từ đâu, điều gì thật sự làm hại móng, khi nào nên dừng, và chăm móng ra sao giữa các lần làm.",
  ],
  sections: [
    {
      id: "mong-khong-tho",
      title: "Sự thật: móng không thở",
      blocks: [
        { p: "Phần móng cứng mà bạn nhìn thấy và sơn lên gọi là bản móng. Nó làm từ chất sừng, gồm nhiều lớp mỏng xếp chồng lên nhau, và không cần không khí. Phủ một lớp gel lên trên không làm nó “ngạt”." },
        { p: "Móng được nuôi từ gốc móng, phần nằm khuất dưới da ở chân móng. Chính ở đó, các mạch máu mang chất nuôi đến, và móng mới được tạo ra rồi đẩy dần ra phía đầu ngón. Vì vậy, móng mọc ra khỏe hay yếu không phụ thuộc vào việc mặt móng có được để trần hay không." },
        { img: { src: img("mat-cat-dau-ngon-tay-goc-mong-va-mach-mau"), alt: "Hình minh họa mặt cắt dọc đầu ngón tay cho thấy bản móng phía trên, gốc móng ẩn dưới nếp da và các mạch máu bên dưới", caption: "Bản móng nằm trên cùng. Móng được nuôi từ gốc móng dưới da, qua các mạch máu." } },
        { note: "Để móng trần vài tuần không làm móng “khỏe lên” theo nghĩa nhiều người nghĩ. Nếu móng trông khá hơn sau một thời gian nghỉ, đó thường là vì phần móng bị hư đã mọc ra và được cắt đi, hoặc vì móng không còn bị tháo sai cách.", kind: "info", title: "Vậy “cho móng thở” có tác dụng gì" },
      ],
    },
    {
      id: "dieu-that-su-hai-mong",
      title: "Điều thật sự làm móng yếu sau khi làm gel",
      blocks: [
        { p: "Khi móng mỏng đi sau một thời gian làm gel, nguyên nhân là móng bị bóc mất lớp, không phải thiếu không khí. Có ba cách hay gặp nhất:" },
        {
          table: {
            head: ["Việc làm", "Điều xảy ra với móng"],
            rows: [
              ["Tự cạy, bóc gel", "Gel kéo theo lớp sừng trên cùng của móng"],
              ["Dũa mặt móng quá mạnh", "Mỗi lần làm lại mất thêm một lớp móng"],
              ["Tháo gel sai cách", "Cạo, mài mạnh khi gel chưa mềm làm móng mỏng"],
            ],
          },
        },
        { img: { src: img("cha-nham-nhe-mat-mong-truoc-khi-son-gel"), alt: "Thợ nail đeo găng đen chà nhẹ mặt móng tự nhiên của khách bằng miếng chà nhám trắng, phía sau là đèn hơ gel", caption: "Chà nhám trước khi sơn gel chỉ cần làm mất độ bóng. Chà mạnh không làm gel bám hơn, chỉ làm móng mỏng đi." } },
        { p: "Móng đã mỏng thì không tự dày lại, phải chờ phần móng mới mọc ra. Móng tay mọc khoảng 3 mm mỗi tháng, một móng mới hoàn toàn mất khoảng 4–6 tháng. Bài [Điều gì xảy ra khi tự cạy sơn gel](lesson:tu-cay-son-gel) cho thấy rõ móng sau khi cạy trông thế nào." },
        { img: { src: img("mong-mong-tach-lop-o-dau-mong"), alt: "Cận cảnh móng tự nhiên ngắn, mỏng, đầu móng bị tách lớp và hơi trắng, đặt trên tay thợ đeo găng đen" } },
        { p: "Còn móng hơi trắng, khô ngay sau khi tháo gel đúng cách thường chỉ là mất nước tạm thời do dung dịch tháo. Thoa dầu dưỡng vài ngày là móng đỡ khô." },
        { img: { src: img("mong-trang-kho-sau-khi-thao-gel"), alt: "Cận cảnh móng tự nhiên vừa tháo gel, mặt móng hơi trắng và khô, đặt trên các ngón tay đeo găng đen của thợ", caption: "Trắng, khô sau khi tháo: thường là móng mất nước tạm thời, không phải hư móng." } },
      ],
    },
    {
      id: "khi-nao-nen-nghi",
      title: "Khi nào nên cho móng nghỉ",
      blocks: [
        { p: "Móng không cần nghỉ để thở, nhưng có những lúc bạn nên dừng làm gel. Đó là khi móng đang có vấn đề:" },
        {
          ul: [
            "Móng **đang mỏng**, mềm, cong khi ấn nhẹ.",
            "Móng hoặc da quanh móng **đau**.",
            "Móng **đổi màu lạ**: ngả vàng, xanh hay nâu, có vệt lạ.",
            "Bạn **nghi móng bị nấm**, hoặc móng tách khỏi nền móng.",
          ],
        },
        { img: { src: img("mong-doi-mau-can-hoi-bac-si"), alt: "Cận cảnh móng tự nhiên ngả vàng ở phần đầu móng, có dấu hiệu tách khỏi nền móng, đặt trên tay thợ đeo găng đen", caption: "Móng đổi màu, tách khỏi nền: dừng làm và hỏi bác sĩ hoặc dược sĩ." } },
        { note: "Khi móng có những dấu hiệu trên, hãy hỏi bác sĩ hoặc dược sĩ trước khi làm tiếp. Thợ nail không chẩn đoán bệnh, và một tiệm cẩn thận sẽ từ chối làm trên móng có vấn đề cho đến khi bạn đã được khám.", kind: "warn", title: "Hỏi bác sĩ trước" },
        { p: "Trong thời gian nghỉ, cắt ngắn móng để móng mỏng đỡ gãy, thoa dầu dưỡng mỗi ngày, và chờ phần móng mới mọc ra. Khi móng đã ổn, hoặc bác sĩ đã nói là được, bạn quay lại làm như bình thường." },
      ],
    },
    {
      id: "giu-mong-khoe",
      title: "Làm gel liên tục mà vẫn giữ móng khỏe",
      blocks: [
        { p: "Bài học tóm lại rất gọn: làm đúng cách thì có thể làm gel liên tục mà móng vẫn ổn. “Đúng cách” nằm ở vài thói quen đơn giản:" },
        {
          ol: [
            "**Thoa dầu dưỡng mỗi ngày** lên mặt móng và da quanh móng, kể cả khi đang có gel.",
            "**Tháo gel tại tiệm**, bằng cách ủ cho gel mềm ra rồi gỡ nhẹ, không cạy, không cạo.",
            "**Không dùng móng làm dụng cụ** và đeo găng khi làm việc với nước lâu.",
            "**Dặm đúng hẹn**, để gel không lệch ra đầu móng làm móng dễ gãy.",
          ],
        },
        { img: { src: img("nho-dau-duong-quanh-mong-son-gel"), alt: "Thợ nail đeo găng đen nhỏ một giọt dầu dưỡng màu vàng lên da ở chân móng sơn gel đỏ của khách trên gối kê tay" } },
        { p: "Nếu móng bạn vốn mỏng và hay gãy, hỏi thợ về BIAB: lớp builder gel đỡ cho móng không bị bẻ cong mỗi ngày. Bài [Sơn gel và BIAB khác nhau thế nào](lesson:gel-biab-bot-gelx) giải thích sự khác nhau. Còn các thói quen làm gel bong sớm và dễ bị cạy nằm trong bài [5 thói quen làm móng gel nhanh bong](lesson:5-thoi-quen-gel-bong)." },
      ],
    },
    {
      id: "hoi-tiem",
      title: "Hỏi tiệm trước khi làm lại",
      blocks: [
        { p: "Không chắc móng mình đang ổn hay nên dừng? Chụp ảnh móng và [nhắn tin cho salon](lesson:chat-voi-salon) để hỏi trước, rồi [đặt lịch online](lesson:dat-lich-online) khi đã rõ. Bài học này đến từ Moja Beauty ở Helsinki, bạn có thể xem dịch vụ và đặt lịch trên [trang đặt lịch của Moja Beauty](/b/moja-beauty). Phía người thợ, bài [Tháo gel có hại móng không](lesson:thao-gel-hieu-dung) giải thích chi tiết vì sao móng mỏng đi và khi nào nên khuyên khách nghỉ." },
      ],
    },
  ],
  faq: [
    {
      q: "Móng tay có cần thở không?",
      a: "Không. Phần móng nhìn thấy là chất sừng, không cần không khí. Móng được nuôi từ gốc móng nằm dưới da qua các mạch máu, nên phủ gel lên mặt móng không làm móng thiếu không khí.",
    },
    {
      q: "Có cần cho móng nghỉ giữa các lần làm gel không?",
      a: "Không bắt buộc nếu móng khỏe và gel được làm, tháo đúng cách. Bạn nên nghỉ khi móng đang mỏng, đau, đổi màu lạ hoặc nghi bị nấm, và khi đó hãy hỏi bác sĩ hoặc dược sĩ trước khi làm tiếp.",
    },
    {
      q: "Làm gel liên tục có sao không?",
      a: "Làm đúng cách thì có thể làm gel liên tục mà móng vẫn ổn. Điều quan trọng là tháo gel tại tiệm, không tự cạy, không để dũa mặt móng quá mạnh, và thoa dầu dưỡng mỗi ngày giữa các lần làm.",
    },
    {
      q: "Vì sao móng yếu, mỏng sau khi làm gel?",
      a: "Móng mỏng đi vì bị bóc mất lớp, không phải vì thiếu không khí. Ba nguyên nhân hay gặp là tự cạy gel, dũa mặt móng quá mạnh và tháo gel sai cách. Móng đã mỏng phải chờ phần móng mới mọc ra mới khỏe lại.",
    },
    {
      q: "Móng nghi bị nấm có làm gel được không?",
      a: "Không nên. Khi móng đổi màu lạ, dày lên hay bạn nghi bị nấm, hãy dừng làm và hỏi bác sĩ hoặc dược sĩ trước. Chỉ làm lại khi đã được khám và được nói là ổn.",
    },
  ],
  related: ["tu-cay-son-gel", "5-thoi-quen-gel-bong", "gel-biab-bot-gelx", "thao-gel-hieu-dung"],
};

export default article;
