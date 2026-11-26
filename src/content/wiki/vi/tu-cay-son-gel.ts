import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/tu-cay-son-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "tu-cay-son-gel",
  lesson: "tu-cay-son-gel",
  category: "tips",
  title: "Tự cạy sơn gel: móng thật phải chịu gì, lỡ cạy rồi thì làm sao cho móng khỏe lại",
  metaTitle: "Tự cạy sơn gel: hại móng thế nào, lỡ cạy rồi phải làm sao",
  metaDescription:
    "Tự cạy sơn gel làm bóc theo lớp móng thật: móng sần, trắng, mỏng và dễ gãy. Cách tiệm tháo gel đúng, và lỡ cạy rồi thì cắt ngắn, dưỡng dầu mỗi ngày ra sao.",
  keyword: "tự cạy sơn gel",
  keywords: [
    "lỡ cạy sơn gel phải làm sao",
    "bóc sơn gel có hại không",
    "móng yếu sau khi cạy gel",
    "phục hồi móng sau khi bóc gel",
    "tháo sơn gel ở tiệm như thế nào",
    "móng bị trắng sau khi tháo gel",
  ],
  excerpt: "Gel hơi bong, cạy luôn cho nhanh: vài giây đó lấy đi cả lớp móng thật. Móng phải chịu gì, tiệm tháo gel ra sao, và lỡ cạy rồi thì chăm thế nào.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tu-cay-son-gel-do-bang-mong-tay"),
    alt: "Cận cảnh hai bàn tay phụ nữ, móng ngón cái tay này đang cạy một mảng sơn gel đỏ khỏi móng của tay kia",
  },
  takeaways: [
    "Gel bám rất chặt vào **lớp sừng trên cùng** của móng thật. Cạy gel là bóc theo cả lớp đó.",
    "Sau khi cạy, móng **sần, có mảng trắng, mỏng và mềm**, dễ gãy, dễ tách lớp, có khi ê khi chạm vào.",
    "Cách đúng là **tháo tại tiệm**: thợ dũa bớt lớp màu, ủ dung dịch tháo gel, rồi gỡ nhẹ phần đã mềm.",
    "Lỡ cạy rồi: **cắt ngắn móng** và **thoa dầu dưỡng mỗi ngày**.",
    "Móng mỏng không tự dày lại; nó khỏe lại dần khi **phần móng mới mọc ra**.",
  ],
  intro: [
    "Tự cạy sơn gel là việc gần như ai làm gel lâu cũng từng làm: mép gel hơi bong, tay rảnh, và chỉ vài giây là cả mảng gel rời ra. Cảm giác gọn gàng đó có giá. Lớp gel không rời ra một mình, nó mang theo một phần móng thật của bạn, và móng cần nhiều tháng để mọc lại phần đã mất.",
    "Bài viết đi theo bài học “Điều gì xảy ra khi tự cạy sơn gel?” trong khóa “Moja Beauty: mi, móng và mày đẹp” của VaraaAi Academy, từ tiệm Moja Beauty ở Helsinki. Bạn sẽ hiểu vì sao cạy gel làm móng yếu đi, tiệm tháo gel đúng cách như thế nào, và nên chăm móng ra sao nếu lỡ cạy rồi.",
  ],
  sections: [
    {
      id: "vi-sao-cay-gel-hai-mong",
      title: "Vì sao cạy gel làm móng mỏng đi",
      blocks: [
        { p: "Móng tay của bạn không phải một tấm cứng liền khối. Nó gồm nhiều lớp sừng rất mỏng xếp chồng lên nhau. Gel sau khi hơ đèn bám rất chặt vào lớp trên cùng đó." },
        { p: "Khi bạn cạy, lực kéo không tách gel ra khỏi móng một cách sạch sẽ. Nó xé ở chỗ yếu hơn, và chỗ yếu hơn thường là giữa các lớp móng. Kết quả: mảng gel bạn cầm trên tay có dính theo một lớp móng mỏng ở mặt dưới." },
        { note: "Phần lớn hư hại móng xảy ra lúc tháo gel, không phải lúc sơn. Thủ phạm là lột và cạo, không phải bản thân lớp gel.", kind: "info", title: "Điều nhiều người không biết" },
      ],
    },
    {
      id: "mong-sau-khi-cay",
      title: "Móng sau khi tự cạy sơn gel trông như thế nào",
      blocks: [
        { p: "Bạn sẽ nhận ra ngay những dấu hiệu này sau khi cạy:" },
        {
          ul: [
            "Mặt móng **sần**, không còn phẳng mịn.",
            "Có **mảng trắng** ở những chỗ lớp móng bị bóc.",
            "Móng **mỏng và mềm hơn**, ấn nhẹ là cong.",
            "Móng **dễ gãy, dễ tách lớp** ở đầu.",
            "Có khi bị **ê** khi chạm vào.",
          ],
        },
        { img: { src: img("mong-san-trang-mong-di-sau-khi-cay-gel"), alt: "Cận cảnh móng tự nhiên sau khi gel bị cạy, mặt móng sần với mảng trắng, còn sót vài chấm gel đỏ", caption: "Ví dụ không nên làm theo: mặt móng sần, trắng, mỏng đi sau khi gel bị cạy." } },
        { p: "Có một điều cần phân biệt: móng hơi trắng, khô ngay sau khi tháo gel đúng cách ở tiệm thường chỉ là móng mất nước tạm thời, thoa dầu là đỡ. Còn mảng trắng sần sau khi cạy là lớp móng đã mất thật." },
        { p: "Móng đã mỏng thì không tự dày lại được. Phải chờ phần móng mới mọc ra. Theo bài [Tháo gel có hại móng không](lesson:thao-gel-hieu-dung) trong khóa nghề nail, móng tay mọc khoảng 3 mm mỗi tháng, và một móng mới hoàn toàn mất khoảng 4–6 tháng." },
      ],
    },
    {
      id: "thao-gel-tai-tiem",
      title: "Tháo sơn gel ở tiệm như thế nào",
      blocks: [
        { p: "Cách đúng là để thợ tháo. Một lần tháo gel đúng cách không vội, và không có bước nào phải cạo mạnh." },
        { img: { src: img("tho-dua-bot-lop-mau-gel-truoc-khi-u"), alt: "Thợ nail đeo găng đen dũa nhẹ bề mặt móng sơn gel đỏ của khách bằng dũa thẳng, các móng khác vẫn bóng", caption: "Bước đầu: dũa bớt lớp bóng và lớp màu, để dung dịch tháo ngấm được vào gel." } },
        {
          ol: [
            "**Dũa bớt lớp trên cùng.** Lớp top bóng giống áo mưa, dung dịch không ngấm qua được. Thợ dũa cho mất độ bóng và dừng trước khi chạm móng thật.",
            "**Ủ dung dịch tháo gel.** Một miếng bông vừa đúng mặt móng thấm dung dịch, đặt lên móng rồi quấn giấy bạc hoặc kẹp lại. Thời gian ủ theo hướng dẫn của sản phẩm.",
            "**Chờ gel mềm ra.** Gel đủ thời gian sẽ tự phồng, nứt và bong khỏi mặt móng. Chỗ nào còn bám thì ủ thêm, không cạo.",
            "**Gỡ nhẹ.** Thợ đẩy nhẹ phần gel đã mềm ra phía đầu móng bằng que gỗ. Mặt móng thật vẫn nguyên vẹn.",
          ],
        },
        { img: { src: img("dat-bong-tham-dung-dich-thao-gel-len-mong"), alt: "Thợ nail đeo găng đen đặt miếng bông thấm dung dịch lên móng gel đỏ của khách, bên cạnh có tờ giấy bạc và chai dung dịch" } },
        { img: { src: img("quan-giay-bac-u-mem-son-gel"), alt: "Thợ nail đeo găng đen quấn giấy bạc ôm kín đầu ngón tay khách để ủ mềm lớp sơn gel, hai ngón đã được quấn" } },
        { img: { src: img("gel-phong-len-tu-tach-khoi-mong"), alt: "Cận cảnh móng sau khi ủ, lớp gel đỏ phồng lên, nứt thành mảng và tự tách khỏi mặt móng tự nhiên", caption: "Ủ đủ thời gian thì gel tự phồng và nứt. Đây là lúc gỡ, không phải trước đó." } },
        { img: { src: img("day-nhe-gel-da-mem-bang-que-go"), alt: "Thợ nail cầm que gỗ cam đẩy nhẹ phần gel đỏ đã mềm ra phía đầu móng của khách, tay đeo găng đen" } },
        { p: "Muốn đọc kỹ từng bước từ phía người thợ, xem bài [Cách tháo sơn gel đúng cách](lesson:thao-gel)." },
      ],
    },
    {
      id: "lo-cay-roi",
      title: "Lỡ cạy sơn gel rồi phải làm sao",
      blocks: [
        { p: "Đừng lo quá, móng sẽ khỏe lại. Việc của bạn là bảo vệ phần móng yếu cho đến khi nó mọc ra hết." },
        {
          table: {
            head: ["Việc nên làm", "Vì sao"],
            rows: [
              ["Cắt ngắn móng", "Móng mỏng mà dài thì dễ gãy, dễ tách lớp"],
              ["Thoa dầu dưỡng mỗi ngày", "Giữ móng và da quanh móng mềm, đỡ khô giòn"],
              ["Không cạy tiếp chỗ gel còn sót", "Mỗi lần cạy lại bóc thêm một lớp"],
              ["Hẹn tiệm tháo nốt phần còn lại", "Ủ cho mềm rồi gỡ, móng không mất thêm"],
            ],
          },
        },
        { img: { src: img("nho-dau-duong-len-mong-sau-khi-thao"), alt: "Thợ nail đeo găng đen dùng ống nhỏ giọt nhỏ một giọt dầu dưỡng màu vàng lên móng tự nhiên vừa tháo gel của khách", caption: "Một giọt dầu dưỡng mỗi ngày, xoa lên mặt móng và da quanh móng." } },
        { p: "Nếu móng đau nhiều, đổi màu lạ, tách khỏi nền móng hay da quanh móng sưng đỏ, hãy hỏi bác sĩ hoặc dược sĩ trước khi làm gel lại. Bài [Móng tay có cần “thở” giữa các lần làm gel](lesson:mong-co-can-tho) nói rõ khi nào nên cho móng nghỉ." },
        { note: "Phần lớn lần cạy bắt đầu từ một mép gel hơi hở. Tránh những thói quen làm gel hở sớm là tránh luôn cám dỗ cạy. Xem [5 thói quen làm móng gel nhanh bong](lesson:5-thoi-quen-gel-bong).", kind: "tip", title: "Phòng từ gốc" },
      ],
    },
    {
      id: "dat-lich-thao-gel",
      title: "Gel bị bong: đặt lịch tháo hoặc dặm",
      blocks: [
        { p: "Khi thấy gel hở, việc nhanh nhất là đặt lịch luôn, đừng chờ đến lúc không chịu được mà cạy. Trên VaraaAi, bạn [đặt lịch online](lesson:dat-lich-online) bằng vài bước: chọn dịch vụ tháo gel hoặc dặm, chọn giờ là xong. Bài học này đến từ Moja Beauty ở Helsinki, nơi bạn có thể đặt lịch dặm và tháo gel trên [trang đặt lịch của Moja Beauty](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Tự cạy sơn gel có sao không?",
      a: "Có hại cho móng. Gel bám rất chặt vào lớp sừng trên cùng của móng thật, nên khi cạy, gel kéo theo cả lớp móng mỏng đó. Móng sau khi cạy thường sần, có mảng trắng, mỏng, mềm và dễ gãy.",
    },
    {
      q: "Lỡ cạy sơn gel rồi phải làm sao?",
      a: "Cắt ngắn móng để móng mỏng đỡ gãy, và thoa dầu dưỡng lên móng và da quanh móng mỗi ngày. Không cạy tiếp phần gel còn sót mà hẹn tiệm tháo nốt. Móng sẽ khỏe lại dần khi phần móng mới mọc ra.",
    },
    {
      q: "Móng mỏng sau khi cạy gel bao lâu thì hồi lại?",
      a: "Móng đã mỏng không tự dày lại, phải chờ móng mới mọc ra thay thế. Móng tay mọc khoảng 3 mm mỗi tháng, và một móng mới hoàn toàn mất khoảng 4–6 tháng.",
    },
    {
      q: "Tiệm tháo sơn gel như thế nào?",
      a: "Thợ dũa bớt lớp bóng và lớp màu, đặt bông thấm dung dịch tháo gel lên mặt móng, quấn giấy bạc hoặc kẹp lại và ủ theo hướng dẫn của sản phẩm. Khi gel đã mềm, phồng và nứt, thợ gỡ nhẹ bằng que gỗ, mặt móng thật vẫn nguyên vẹn.",
    },
    {
      q: "Vì sao móng bị trắng sau khi tháo gel?",
      a: "Sau khi tháo đúng cách, móng hơi trắng và khô thường là do mất nước tạm thời, thoa dầu dưỡng sẽ đỡ. Còn mảng trắng sần sau khi cạy gel là dấu hiệu lớp móng đã bị bóc mất, phải chờ móng mới mọc ra.",
    },
  ],
  related: ["5-thoi-quen-gel-bong", "mong-co-can-tho", "gel-biab-bot-gelx", "thao-gel-hieu-dung"],
};

export default article;
