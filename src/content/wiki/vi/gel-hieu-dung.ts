import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/gel-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "son-gel-la-gi-vi-sao-bong",
  lesson: "gel-hieu-dung",
  category: "nail",
  title: "Sơn gel là gì? Vì sao bền 2–3 tuần, vì sao bong và có hại cho móng không",
  metaTitle: "Sơn gel là gì? Bao lâu thì bong, có hại cho móng không",
  metaDescription:
    "Sơn gel là gì, bám lên móng thế nào, vì sao phải hơ đèn và sơn mỏng, sơn gel bao lâu thì bong, ba kiểu bong và nguyên nhân, dị ứng gel và quy định TPO ở EU.",
  keyword: "sơn gel là gì",
  keywords: [
    "sơn gel bao lâu thì bong",
    "sơn gel có hại không",
    "vì sao sơn gel bị bong",
    "sơn gel giữ được bao lâu",
    "sơn gel bị nóng khi hơ đèn",
    "lớp dính sau khi hơ gel",
    "tự cạy sơn gel có sao không",
  ],
  excerpt: "Gel không ăn vào móng, nó chỉ bám trên bề mặt. Hiểu điều đó là hiểu vì sao gel bền, vì sao bong, và làm sao để sơn gel không hại móng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("thay-day-nail-giang-ve-son-gel-cho-tho-tre"),
    alt: "Người thầy dạy nail tóc muối tiêu mặc tạp dề vải ngồi ở bàn đá, vừa uống cà phê vừa giảng giải cho hai nữ thợ trẻ mặc áo kem",
  },
  takeaways: [
    "Gel **không ăn vào móng**, nó chỉ bám trên bề mặt bản móng. Bề mặt đó phải sạch da chết, sạch dầu và khô.",
    "Gel chỉ chín khi gặp đúng loại đèn của hãng, đủ thời gian, và khi lớp sơn đủ mỏng để ánh sáng xuyên qua.",
    "Làm đúng, sơn gel đẹp trong **2–3 tuần**. Để lâu hơn, móng mọc dài, dễ gãy và dễ hở.",
    "Chỗ gel bong cho biết nguyên nhân: chân móng là do còn da, đầu móng là do chưa bịt đầu, bong cả mảng là do dầu, ẩm hoặc gel chưa chín.",
    "Thứ hại móng và hại người là chà nhám mạnh, tự cạy gel, và để gel chưa chín chạm vào da.",
  ],
  intro: [
    "Sơn gel là gì mà cùng một chai, có người làm thì khách giữ được ba tuần, có người làm thì ba ngày đã bong? Câu trả lời ngắn: sơn gel là loại sơn móng không tự khô ngoài không khí, nó chỉ cứng lại dưới đúng loại đèn, và nó bám trên bề mặt móng chứ không ngấm vào trong. Mọi chuyện bền hay bong, an toàn hay gây dị ứng, đều đi ra từ hai đặc điểm đó.",
    "Bài viết này đi theo bài học “Sơn gel: hiểu đúng để làm bền” trong khóa Nghề Nail của VaraaAi Academy, là phần lý thuyết của chủ đề sơn gel. Bài không dạy cầm cọ. Nó giải thích vì sao từng bước lại phải làm như vậy, để bạn tự tìm ra lỗi khi bộ móng của khách có vấn đề. Phần thao tác từng bước nằm ở bài [Cách sơn gel đúng kỹ thuật](lesson:son-gel).",
  ],
  sections: [
    {
      id: "gel-bam-vao-dau",
      title: "Cấu tạo móng: sơn gel bám vào đâu",
      blocks: [
        { p: "Phần cứng mà thợ sơn lên gọi là **bản móng**. Nó làm từ keratin, xếp thành nhiều lớp mỏng. Móng mọc ra từ **mầm móng**, nằm ẩn dưới da ở gốc móng. Thợ dũa hay ấn quá mạnh ở vùng này thì móng mọc ra có thể bị gợn sóng, có khi là vĩnh viễn." },
        { img: { src: img("cau-tao-mong-tay-mat-cat-dau-ngon"), alt: "Hình minh họa mặt cắt dọc một đầu ngón tay, thấy bản móng nằm phía trên, gốc móng ẩn dưới nếp da và xương đốt ngón ở giữa", caption: "Bản móng là phần nhìn thấy. Mầm móng, nơi sinh ra móng, nằm khuất dưới nếp da ở gốc." } },
        { p: "Ở chân móng có hai loại da mà người mới hay nhầm với nhau:" },
        {
          table: {
            head: ["Loại da", "Vai trò", "Thợ làm gì"],
            rows: [
              ["Da sống phía trên chân móng", "Bịt kín, không cho vi khuẩn đi vào mầm móng", "Không cắt"],
              ["Lớp da mỏng, trong suốt bám dính trên mặt móng", "Da chết, không còn vai trò bảo vệ", "Lấy đi trước khi sơn"],
            ],
          },
        },
        { h3: "Ba điều kiện để gel bám" },
        { p: "Vì gel chỉ bám trên bề mặt, bề mặt bản móng phải đủ ba điều kiện:" },
        {
          ul: [
            "**Sạch da chết.** Còn sót lớp da mỏng thì gel bám lên da chứ không bám lên móng, vài ngày là hở.",
            "**Sạch dầu.** Còn dầu từ da tay thì gel trượt.",
            "**Khô.** Bản móng hút nước giống một miếng bọt biển: nó nở ra, rồi co vào khi khô lại. Gel thì không co theo được.",
          ],
        },
        { img: { src: img("ngam-tay-trong-nuoc-truoc-khi-son-gel"), alt: "Các đầu ngón tay của khách ngâm trong bát sứ trắng đựng nước ấm có cánh hoa hồng, bên cạnh là khăn kem trên bàn đá", caption: "Ngâm tay làm móng ngấm nước và nở ra. Đây là điều nhiều thợ giỏi bỏ đi khi sơn gel." } },
        { p: "Đó là lý do nhiều thợ giỏi chọn làm khô, không ngâm tay trước khi sơn gel. Cũng vì gel chỉ cần một bề mặt để bám, chà nhám chỉ nhằm làm mất độ bóng. Chà mạnh không làm gel bám hơn. Nó chỉ làm móng mỏng đi, và lần sau khách sẽ thấy nóng rát khi hơ đèn." },
      ],
    },
    {
      id: "gel-chin-the-nao",
      title: "Vì sao sơn gel phải hơ đèn và phải sơn mỏng",
      blocks: [
        { p: "Trong gel có một chất gọi là chất khơi mào quang. Khi gặp đúng loại ánh sáng, nó khởi động phản ứng biến gel từ lỏng thành rắn. Người trong nghề gọi đó là gel “chín”." },
        { p: "Mỗi hãng pha gel cho một loại đèn và một khoảng thời gian nhất định. Dùng đèn khác hãng, hoặc đèn cũ đã yếu, thì bề mặt gel có thể cứng nhưng bên dưới vẫn chưa chín hết. Gel chưa chín dễ bong, và là một trong những nguyên nhân chính gây dị ứng." },
        { img: { src: img("den-led-ho-gel-va-den-cu"), alt: "Đèn LED hơ gel hình vòm màu trắng đang phát ánh sáng tím xanh trên bàn đá, phía sau là một chiếc đèn cũ đã ngả vàng", caption: "Đèn cũ đã yếu vẫn sáng, nhưng có thể không còn đủ để gel chín tới lớp dưới." } },
        { h3: "Lớp dày thì nhăn" },
        { p: "Ánh sáng không xuyên hết được một lớp gel dày, nhất là màu đậm. Mặt trên chín trước, co lại và kéo nhăn cả lớp bên dưới còn lỏng. Vì vậy hai lớp mỏng luôn tốt hơn một lớp dày." },
        { img: { src: img("son-gel-bi-nhan-do-son-qua-day"), alt: "Cận cảnh một móng tay sơn gel đỏ sẫm có bề mặt nhăn nheo, gợn thành nếp, đầu ngón được bàn tay đeo găng đen đỡ bên dưới", caption: "Lỗi do sơn quá dày: mặt gel nhăn lại, bên dưới chưa chín." } },
        { h3: "Khách thấy nóng rát trong đèn" },
        { p: "Khi gel chín, nó tỏa nhiệt. Khách kêu nóng rát thì đừng bảo khách cố chịu. Cho khách rút tay ra vài giây rồi cho vào lại, và lần sau sơn mỏng hơn." },
        { h3: "Lớp dính sau khi hơ không phải gel hỏng" },
        { p: "Sau khi hơ, trên bề mặt thường còn một lớp dính. Đó là một lớp gel rất mỏng không chín được vì tiếp xúc với không khí. Nó vẫn là gel chưa chín, nên được lau đi bằng dung dịch lau móng, và không được để chạm vào da của khách hay của chính thợ." },
      ],
    },
    {
      id: "bao-lau-thi-bong",
      title: "Sơn gel giữ được bao lâu, và bao lâu thì bong",
      blocks: [
        { p: "Làm đúng, sơn gel đẹp trong hai đến ba tuần. Đó cũng là con số nên nói thật với khách ngay từ đầu. Để lâu hơn, móng mọc dài ra, điểm chịu lực lệch đi, và bộ móng dễ gãy, dễ hở." },
        { p: "Còn nếu gel bong sớm, sau vài ngày, thì đừng vội đổi hãng sơn hay đổ cho khách. Hãy nhìn xem gel bong ở đâu. Mỗi kiểu bong chỉ ra một nguyên nhân." },
        {
          table: {
            head: ["Gel bong ở đâu", "Nguyên nhân thường gặp"],
            rows: [
              ["Ở chân móng", "Còn lớp da mỏng trên mặt móng"],
              ["Ở đầu móng", "Chưa bịt đầu móng, hoặc khách dùng móng để cạy, mở đồ"],
              ["Bong cả mảng", "Mặt móng còn dầu, còn ẩm, hoặc gel chưa chín"],
            ],
          },
        },
        { img: { src: img("son-gel-bong-o-chan-mong"), alt: "Cận cảnh một móng sơn gel đỏ, mép gel ở phía chân móng đã hở và vênh lên khỏi mặt móng", caption: "Bong ở chân móng: thường do còn da trên mặt móng." } },
        { img: { src: img("son-gel-bong-o-dau-mong"), alt: "Cận cảnh một móng sơn gel đỏ sẫm bị mẻ mất một mảng ở góc đầu móng, lộ ra phần móng thật bên dưới", caption: "Bong ở đầu móng: chưa bịt đầu móng, hoặc móng bị dùng để cạy." } },
        { note: "Mỗi kiểu bong là một lời nhắc để sửa đúng chỗ. Một người thợ tay sơn rất đẹp vẫn có thể bị khách quay lại liên tục vì bong ở chân móng, đổi hãng gel, đổi đèn mà không hết, cho đến khi xem lại cách xử lý lớp da mỏng ở chân móng.", kind: "tip", title: "Đọc bộ móng trước khi đổi sản phẩm" },
        { img: { src: img("khach-quay-lai-vi-son-gel-bi-bong"), alt: "Khách nữ mặc áo sơ mi xanh đậm chỉ vào một móng sơn gel đỏ trên bàn tay mình cho nữ thợ nail trẻ xem ở bàn làm móng" } },
      ],
    },
    {
      id: "co-hai-khong",
      title: "Sơn gel có hại không: móng mỏng, dị ứng và chất TPO",
      blocks: [
        { p: "Lớp gel đã chín nằm yên trên mặt móng. Rủi ro đến từ cách làm và cách tháo, và có ba chuyện đáng biết." },
        { h3: "Móng mỏng đi vì chà mạnh và vì cạy gel" },
        { p: "Chà nhám mạnh ở mỗi lần làm lấy đi từng lớp của bản móng. Tự cạy gel còn tệ hơn: cạy gel là lột theo cả lớp móng thật. Móng mỏng dần, lần sau gel càng khó bám, và khách lại nghĩ tay nghề của thợ kém. Gel cần được tháo đúng cách, xem bài [Tháo gel: hiểu đúng để không hại móng](lesson:thao-gel-hieu-dung)." },
        { img: { src: img("khach-tu-cay-son-gel-bang-tay"), alt: "Cận cảnh hai bàn tay của một phụ nữ, móng tay này đang cạy lớp sơn gel đỏ khỏi móng của tay kia", caption: "Điều không nên làm: tự cạy gel kéo theo cả lớp móng thật." } },
        { h3: "Dị ứng gel đến chậm" },
        { p: "Dị ứng gel không đến ngay. Nó đến sau nhiều tháng, có khi nhiều năm tiếp xúc. Ban đầu là ngứa quanh móng, da đỏ, nổi mụn nước nhỏ, có khi móng bong khỏi nền móng. Một khi đã dị ứng thì thường là suốt đời, và đã có những người thợ phải bỏ nghề vì không còn chạm được vào gel. Các bác sĩ da liễu còn cảnh báo rằng dị ứng này có thể gây rắc rối về sau khi làm răng hay thay khớp, vì các vật liệu đó cùng họ với gel." },
        { p: "Quy tắc phòng rất ngắn: **gel chưa chín không chạm da**." },
        {
          ul: [
            "Đeo găng tay nitrile, và thay găng khi găng dính gel.",
            "Lau sạch cán cọ và cổ chai.",
            "Không lấy tay quệt gel thừa.",
            "Gel lỡ dính da khách thì gạt sạch trước khi hơ.",
            "Luôn hơ đủ thời gian.",
          ],
        },
        { img: { src: img("gel-tran-ra-da-quanh-mong"), alt: "Cận cảnh một móng vừa sơn gel đỏ còn ướt, gel tràn ra phủ lên vùng da ở chân móng và hai bên cạnh móng", caption: "Lỗi cần tránh: gel tràn lên da. Phải gạt sạch trước khi cho tay vào đèn." } },
        { note: "Nếu bạn hoặc khách bị ngứa, đỏ, nổi mụn nước quanh móng: ngừng tiếp xúc với gel và đi khám bác sĩ da liễu. Bài [Dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat) nói kỹ hơn về dấu hiệu và cách phòng.", kind: "warn", title: "Khi có dấu hiệu dị ứng" },
        { h3: "Chất TPO và nguồn gốc chai gel" },
        { p: "Ở Liên minh châu Âu, từ ngày 1/9/2025, chất khơi mào quang có tên TPO bị cấm trong sản phẩm làm móng. Tiệm không được dùng tiếp, kể cả hàng đã mua từ trước, nên hãy xem lại thành phần trên từng chai gel của mình. Nên mua gel từ nhà cung cấp trong châu Âu, có nhãn và danh sách thành phần rõ ràng. Với hàng trôi nổi giá rẻ, người gánh rủi ro là thợ và khách của thợ." },
      ],
    },
    {
      id: "kinh-nghiem-voi-khach",
      title: "Bốn điều nên làm với khách sơn gel",
      blocks: [
        {
          ol: [
            "**Nhìn và hỏi trước khi làm.** Móng đổi màu, dày, bở, da sưng đỏ thì không làm và khuyên khách đi khám. Từ chối một khách hôm nay là giữ uy tín cho cả tiệm. Xem thêm bài [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam).",
            "**Nói thật về độ bền.** Gel đẹp trong hai đến ba tuần, sau đó cần tháo và làm mới.",
            "**Dặn khách đừng tự cạy gel.** Giải thích rằng cạy là lột theo lớp móng thật, và lần sau gel sẽ khó bám hơn.",
            "**Khi khách quay lại vì bong, đừng vội đổ cho khách.** Xem gel bong ở đâu rồi sửa đúng bước.",
          ],
        },
        { p: "Những lời dặn này dễ thực hiện hơn khi tiệm có nền nếp. Trong VaraaAi, bạn [thêm dịch vụ sơn gel](lesson:dich-vu) với thời lượng đủ cho khâu chuẩn bị móng, và ghi vào [sổ khách hàng](lesson:khach-hang) những điều cần nhớ về móng của từng người, để lần hẹn sau không phải hỏi lại từ đầu." },
      ],
    },
  ],
  faq: [
    {
      q: "Sơn gel là gì, khác sơn thường thế nào?",
      a: "Sơn gel là loại sơn móng chứa chất khơi mào quang. Nó không tự khô ngoài không khí mà chỉ cứng lại khi được hơ dưới đúng loại đèn của hãng, đủ thời gian. Gel bám trên bề mặt bản móng chứ không ăn vào móng, và làm đúng thì đẹp trong hai đến ba tuần.",
    },
    {
      q: "Sơn gel bao lâu thì bong?",
      a: "Làm đúng kỹ thuật, sơn gel đẹp trong 2–3 tuần. Sau đó móng mọc dài, điểm chịu lực lệch đi nên dễ gãy và dễ hở, vì vậy nên tháo và làm mới. Nếu gel bong chỉ sau vài ngày thì nguyên nhân thường nằm ở khâu chuẩn bị móng hoặc ở việc gel chưa chín.",
    },
    {
      q: "Vì sao sơn gel bị bong ở chân móng, ở đầu móng hoặc bong cả mảng?",
      a: "Bong ở chân móng thường do còn lớp da mỏng trên mặt móng. Bong ở đầu móng thường do chưa bịt đầu móng, hoặc khách dùng móng để cạy, mở đồ. Bong cả mảng thường do mặt móng còn dầu, còn ẩm hoặc gel chưa chín.",
    },
    {
      q: "Sơn gel có hại cho móng không?",
      a: "Rủi ro chủ yếu đến từ cách làm và cách tháo. Chà nhám mạnh làm móng mỏng đi, tự cạy gel lột theo cả lớp móng thật, và gel chưa chín chạm vào da nhiều lần có thể dẫn đến dị ứng. Nếu thấy ngứa, đỏ, nổi mụn nước quanh móng, hãy ngừng tiếp xúc với gel và đi khám bác sĩ da liễu.",
    },
    {
      q: "Vì sao hơ đèn gel bị nóng rát?",
      a: "Khi gel chín, nó tỏa nhiệt. Lớp gel càng dày thì càng nóng, và móng đã bị chà mỏng cũng dễ thấy rát hơn. Khi thấy nóng, rút tay ra vài giây rồi cho vào lại, và lần sau sơn lớp mỏng hơn.",
    },
    {
      q: "Lớp dính trên móng sau khi hơ đèn có phải gel chưa khô không?",
      a: "Đó không phải gel hỏng. Lớp dính là một lớp gel rất mỏng không chín được vì tiếp xúc với không khí. Nó vẫn là gel chưa chín, nên được lau bằng dung dịch lau móng và không nên để chạm vào da.",
    },
  ],
  related: ["son-gel", "thao-gel-hieu-dung", "thao-gel", "builder-gel-hieu-dung"],
};

export default article;
