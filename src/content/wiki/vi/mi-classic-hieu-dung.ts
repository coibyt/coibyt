import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-classic-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "noi-mi-classic-la-gi",
  lesson: "mi-classic-hieu-dung",
  category: "lash",
  title: "Nối mi classic là gì? Giữ được bao lâu, có hại mi thật không và cách chọn sợi",
  metaTitle: "Nối mi classic là gì? Giữ bao lâu, có hại mi thật không",
  metaDescription:
    "Nối mi classic là nối 1:1, mỗi sợi mi thật một sợi nối. Vòng đời mi thật, vì sao phải dặm sau 2–3 tuần, dính chùm, cách chọn độ dài, độ dày, độ cong và keo.",
  keyword: "nối mi classic là gì",
  keywords: [
    "nối mi classic giữ được bao lâu",
    "nối mi classic có hại mi thật không",
    "nối mi 1:1 là gì",
    "vòng đời của mi thật",
    "dính chùm khi nối mi",
    "chọn độ dài độ dày độ cong mi nối",
    "keo nối mi và độ ẩm",
  ],
  excerpt: "Classic là nối 1:1, tự nhiên như một lớp mascara. Bài viết giải thích vòng đời mi thật, vì sao mi nối rụng dần và ba nguyên tắc giữ mi thật khoẻ.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-noi-mi-classic-xem-nhip-ben-cua-so-studio"),
    alt: "Thợ nối mi tóc búi cao, mặc áo kem, đeo găng đen ngồi bên cửa sổ studio và giơ cây nhíp lên kiểm tra",
  },
  takeaways: [
    "Nối mi classic là kỹ thuật **1:1**: mỗi sợi mi thật mang đúng một sợi nối, cho vẻ tự nhiên như chải mascara.",
    "Mi thật rụng theo vòng đời và sợi nối rụng theo, nên khách thường dặm sau **2–3 tuần**.",
    "Ba điều giữ mi thật khoẻ: tách riêng từng sợi, chọn sợi nối **vừa sức mi thật**, gắn cách da mí khoảng **0,5–1 mm**.",
    "Keo nối mi khô nhờ hơi ẩm, nên độ ẩm và nhiệt độ phòng giữ theo khoảng hãng keo ghi.",
    "Mi thật thưa thì classic vẫn thưa, chỉ dài và đen hơn. Khách muốn dày và đậm thì đó là volume hoặc hybrid.",
  ],
  intro: [
    "Nối mi classic là gì, giữ được bao lâu và có làm hại mi thật không: đó là những câu khách hỏi trước khi nằm lên giường nối mi, và cũng là những câu người mới học nghề cần trả lời được. Classic là nối 1:1, mỗi sợi mi thật mang đúng một sợi nối. Mi thật của khách có còn khoẻ sau nhiều năm nối hay không phụ thuộc vào việc người thợ hiểu sợi mi thật đến đâu.",
    "Bài viết này viết lại bài học “Nối mi classic: hiểu đúng để mi đẹp và mi thật khoẻ” trong khóa Nghề Mi của VaraaAi Academy. Đọc xong, bạn giải thích được cho khách vì sao mi nối rụng dần, biết chọn sợi nối vừa sức mi thật, và hiểu vì sao căn phòng quá khô hay quá ẩm làm một bộ mi kém bền.",
  ],
  sections: [
    {
      id: "noi-mi-classic-la-gi",
      title: "Nối mi classic là gì và trông như thế nào",
      blocks: [
        { p: "Nối mi classic, còn gọi là nối 1:1, là kỹ thuật gắn **một sợi mi nối lên một sợi mi thật** đã được tách riêng. Không có chùm, không có fan. Hàng mi sau khi nối dài hơn, đen hơn, các sợi vẫn đứng tách nhau, giống đôi mắt vừa được chải một lớp mascara thật khéo." },
        { p: "Vì mỗi sợi mi thật chỉ mang một sợi nối, classic không tạo thêm số sợi. Mi thật dày thì kết quả dày. Mi thật thưa thì classic vẫn thưa, chỉ dài và đen hơn. Điều này cần nói với khách ngay từ buổi tư vấn, trước khi khách kỳ vọng một hàng mi đậm như trong ảnh mẫu." },
        { img: { src: img("bo-mi-classic-moi-soi-mi-that-mot-soi-noi"), alt: "Cận cảnh một mắt nhắm với bộ mi classic đã nối xong, từng sợi tách rời, ngắn ở đầu mắt và dài dần về đuôi mắt", caption: "Bộ classic hoàn thiện: mỗi sợi mi thật một sợi nối, không sợi nào dính vào sợi bên cạnh." } },
        { p: "Khách muốn hàng mi thật dày, thật đậm thì đó là việc của kỹ thuật khác: [nối mi volume](lesson:mi-volume-hieu-dung) hoặc hybrid. Còn nếu bạn đang tìm thao tác cụ thể trên tay, từ dán miếng lót đến lúc gỡ ra, hãy đọc bài thực hành [nối mi classic từng bước](lesson:mi-classic)." },
      ],
    },
    {
      id: "vong-doi-mi-that",
      title: "Vòng đời của mi thật: vì sao mi nối rụng dần",
      blocks: [
        { p: "Mi thật cũng như tóc, có vòng đời riêng gồm ba giai đoạn. Con số ở mỗi người một khác, bảng dưới đây chỉ cho bạn hình dung thứ tự." },
        {
          table: {
            head: ["Giai đoạn", "Kéo dài", "Sợi mi lúc đó"],
            rows: [
              ["Mọc", "Thường khoảng một tháng đến một tháng rưỡi", "Dài ra từng ngày"],
              ["Chuyển tiếp", "Vài tuần", "Ngừng dài"],
              ["Nghỉ", "Vài tháng", "Đứng yên, rồi rụng và một sợi mới mọc lên thay"],
            ],
          },
        },
        { p: "Điều cần nhớ hơn cả các con số: trên một mí mắt, lúc nào cũng có sợi đang mọc, sợi đang nghỉ và sợi sắp rụng. Không có hai sợi nào chạy cùng một lịch. Vì thế mỗi ngày rụng vài sợi mi là chuyện bình thường, và sợi nối gắn trên sợi mi nào thì rụng theo sợi mi đó." },
        { img: { src: img("mi-that-soi-dai-soi-non-truoc-khi-noi-mi"), alt: "Cận cảnh mắt nhắm chưa nối mi, hàng mi thật có sợi dài xen sợi non ngắn, một sợi mi rụng nằm trên miếng lót trắng", caption: "Mi thật trước khi nối: sợi dài, sợi non và một sợi vừa rụng cùng có mặt trên một mí." } },
        { h3: "Nhận ra một sợi mi rụng tự nhiên" },
        { p: "Nhìn kỹ một sợi mi rụng, bạn sẽ thấy một cái chân nhỏ, màu nhạt ở gốc. Đó là sợi mi đến hạn thì rụng, không phải do keo làm hỏng. Khi khách lo lắng vì thấy mi rơi trên gối, bạn có thể chỉ cho khách xem cái chân nhạt màu này." },
        { img: { src: img("soi-mi-rung-tu-nhien-mang-theo-soi-noi"), alt: "Một sợi mi rụng nằm trên đầu ngón tay đeo găng đen, gốc sợi mi có chân nhỏ màu nhạt, sợi nối đen vẫn dính dọc theo", caption: "Sợi mi rụng tự nhiên có chân nhỏ màu nhạt ở gốc, sợi nối rụng cùng với nó." } },
        { h3: "Sợi mi non: để lại hoặc gắn thật nhẹ" },
        { p: "Thợ mới vào nghề hay gắn mọi sợi mi nhìn thấy, kể cả những sợi rất ngắn, rất mảnh vừa nhú lên. Sợi mi non chưa đủ sức đỡ một sợi nối dài và dày. Gắn vào, nó dễ bị kéo rụng sớm hoặc mọc lệch. Có hai cách xử lý: để sợi đó lại cho lần dặm sau, khi nó đã dài và chắc hơn, hoặc chọn cho nó một sợi nối thật ngắn, thật nhẹ." },
      ],
    },
    {
      id: "giu-duoc-bao-lau",
      title: "Nối mi classic giữ được bao lâu",
      blocks: [
        { p: "Không có một con số chung cho mọi khách, vì bộ mi thưa dần theo tốc độ rụng mi thật của từng người. Lịch thường dùng trong nghề là **dặm sau 2–3 tuần**: thợ gắn sợi mới vào những chỗ hàng mi đã thưa." },
        { p: "Thói quen của khách quyết định mi giữ được lâu hay nhanh thưa. Người hay đi bơi, xông hơi, hay dụi mắt hoặc ngủ úp mặt xuống gối sẽ thấy mi rụng sớm hơn. Hãy hỏi những điều này khi tư vấn, và dặn khách cách giữ mi trước khi bắt đầu làm:" },
        {
          ul: [
            "Giữ mi khô trong khoảng thời gian hãng keo khuyên.",
            "Không dùng sản phẩm có dầu ở vùng chân mi.",
            "Chải mi mỗi ngày.",
            "Không dụi mắt, không tự nhổ sợi nối.",
          ],
        },
      ],
    },
    {
      id: "co-hai-mi-that-khong",
      title: "Nối mi classic có hại mi thật không",
      blocks: [
        { p: "Mi thật bị hại khi bộ mi được gắn sai. Bài học chỉ ra ba kiểu sai, mỗi kiểu ứng với một nguyên tắc của classic. Giữ được cả ba nguyên tắc là cách để mi thật của khách còn khoẻ sau nhiều năm nối." },
        {
          table: {
            head: ["Lỗi", "Điều xảy ra với mi thật", "Cách làm đúng"],
            rows: [
              ["Dính chùm: keo dán hai sợi mi thật vào nhau", "Hai sợi mọc và rụng theo hai lịch khác nhau nên kéo căng nhau; khách thấy cộm, mi bị kéo rụng trước hạn", "Tách riêng từng sợi, mỗi sợi mi thật một sợi nối"],
              ["Sợi nối quá dài, quá dày", "Sợi mi thật oằn xuống, lâu dần thì gãy và rụng sớm", "Chọn sợi nối vừa sức sợi mi thật"],
              ["Gắn sát da mí, keo chạm da", "Cộm, ngứa, có khi kích ứng; cục keo cứng dính vào da kéo sợi mi khi mi mọc ra", "Chân sợi nối cách da mí khoảng 0,5–1 mm"],
            ],
          },
        },
        { h3: "Dính chùm làm hại mi thế nào" },
        { p: "Dân trong nghề gọi hai sợi mi bị keo dán vào nhau là dính chùm. Sợi này dài ra hoặc đến lúc rụng thì bị sợi kia giữ lại. Khách thấy cộm, thấy vướng. Lâu ngày, chân mi bị tổn thương và hàng mi thật thưa dần. Đây là lý do nguyên tắc số một của classic là tách riêng từng sợi trước khi gắn." },
        { img: { src: img("loi-dinh-chum-khi-noi-mi-classic"), alt: "Cận cảnh mắt nhắm với hai sợi mi ở giữa hàng mi bị dính chéo vào nhau, có một cục keo đen ở chân mi", caption: "Ảnh minh họa lỗi dính chùm: hai sợi mi bị dán chung và một cục keo chạm vào da mí. Đây là điều không được để xảy ra." } },
        { h3: "Chỗ gắn: cách da mí một chút" },
        { p: "Sợi nối được đặt dọc theo sợi mi thật, chân sợi nối cách da mí khoảng nửa đến một milimét và không bao giờ chạm da. Gắn xa quá cũng là lỗi: sợi nối lỏng lẻo, chĩa ra ngoài và rụng sớm." },
        { img: { src: img("chan-soi-mi-noi-cach-da-mi"), alt: "Hàng mi classic nhìn rất gần từ bên cạnh, chân mỗi sợi nối bắt đầu cách da mí một khoảng nhỏ, không có keo trên da", caption: "Làm đúng: giữa da mí và chân sợi nối còn một đường da sạch." } },
      ],
    },
    {
      id: "chon-do-dai-do-day-do-cong",
      title: "Chọn độ dài, độ dày và độ cong vừa sức mi thật",
      blocks: [
        { p: "Hãy hình dung sợi mi thật như một cành cây nhỏ. Treo vào đó một vật quá dài, quá nặng thì cành oằn xuống. Sợi nối cũng vậy, nên việc chọn sợi bắt đầu từ sợi mi thật chứ không bắt đầu từ ảnh mẫu khách đưa." },
        {
          ul: [
            "**Độ dài:** không dài hơn sợi mi thật quá nhiều.",
            "**Độ dày:** không dày hơn, không nặng hơn sức sợi mi thật chịu được. Mi thật mảnh và ngắn thì chọn sợi nối mảnh hơn, ngắn hơn.",
            "**Độ cong:** theo dáng mắt và hướng mọc của mi thật, sao cho sợi nối đi cùng hướng với sợi mi, không bật ngược lên và không chúc xuống.",
          ],
        },
        { img: { src: img("loi-soi-mi-noi-qua-dai-qua-nang"), alt: "Cận cảnh mắt nhắm với các sợi mi nối quá dài và quá dày, rủ xuống miếng lót, đan chéo nhau và có chỗ hở", caption: "Ảnh minh họa lỗi chọn sợi quá dài, quá nặng: hàng mi rủ xuống, rối và đã có khoảng trống." } },
        { note: "Đừng vì muốn khách vui mà gắn sợi thật dày, thật dài lên mi thật mảnh và yếu. Người trả giá là mi thật của khách. Hãy giải thích thật lòng, chọn sợi vừa sức, hoặc gợi ý một kỹ thuật khác.", kind: "warn", title: "Khi khách muốn nhiều hơn sức mi thật" },
        { p: "Chọn độ dài cho từng vùng mắt và cho từng dáng mắt là một chủ đề riêng, có trong bài [lash mapping](lesson:mi-mapping-hieu-dung)." },
        { note: "Ghi lại độ dài, độ dày, độ cong và hãng keo đã dùng cho từng khách. Lần dặm sau bạn làm nhanh hơn và bộ mi đều hơn. Trong VaraaAi, những ghi chú này nằm ở [hồ sơ khách hàng](lesson:khach-hang).", kind: "tip", title: "Sổ ghi của thợ mi" },
      ],
    },
    {
      id: "keo-noi-mi-va-do-am",
      title: "Keo nối mi, độ ẩm trong phòng và hơi keo",
      blocks: [
        { p: "Keo nối mi là cyanoacrylate, cùng họ với keo dán siêu tốc, và nó khô nhờ hơi ẩm trong không khí. Độ ẩm và nhiệt độ trong phòng vì vậy quyết định keo khô nhanh hay chậm. Mỗi hãng keo ghi một khoảng độ ẩm và nhiệt độ phù hợp, việc của bạn là giữ phòng trong đúng khoảng đó." },
        {
          table: {
            head: ["Phòng", "Keo phản ứng thế nào"],
            rows: [
              ["Quá khô", "Khô chậm, hơi keo bay ra nhiều hơn"],
              ["Quá ẩm", "Khô quá nhanh, mối dính giòn và bám kém"],
            ],
          },
        },
        { img: { src: img("may-tao-am-va-keo-noi-mi-trong-phong-lam-mi"), alt: "Góc studio mi với bệ cửa sổ bằng đá trắng, trên đó có máy tạo ẩm nhỏ đang phun sương và một chai keo nối mi màu đen", caption: "Máy tạo ẩm giúp giữ phòng trong khoảng độ ẩm hãng keo ghi." } },
        { p: "Thói quen lấy keo cũng ảnh hưởng đến độ bền của bộ mi:" },
        {
          ul: [
            "Lắc chai theo hướng dẫn của hãng, nhỏ một giọt nhỏ ra đá ngọc hoặc nhẫn đựng keo rồi đậy nắp ngay.",
            "Thay giọt mới thường xuyên, vì giọt keo để lâu sẽ đặc lại và bám kém.",
            "Chỉ nhúng phần chân sợi nối, lượng keo vừa đủ, không thành cục.",
          ],
        },
        { note: "Hơi keo làm cay mắt, nên mắt khách phải nhắm kín suốt buổi và giọt keo không đặt ngay dưới mũi khách. Hơi keo còn có thể gây dị ứng cho cả khách lẫn thợ. Dấu hiệu và cách xử lý có trong bài [Dị ứng và hoá chất](lesson:di-ung-hoa-chat).", kind: "warn", title: "Hơi keo" },
      ],
    },
    {
      id: "tu-van-va-khi-nao-khong-lam",
      title: "Tư vấn trước khi nối và những lúc chưa nên làm",
      blocks: [
        { p: "Trước khi làm, luôn nhìn và hỏi. Mắt đỏ, ngứa, chảy nước, có lẹo, bờ mi sưng hay đóng vảy, khách mới mổ mắt hoặc từng phản ứng với keo thì chưa làm. Danh sách đầy đủ và cách từ chối cho khéo nằm trong bài [Khi nào không nên làm](lesson:khi-nao-khong-lam)." },
        { p: "Phần tư vấn đừng làm cho có. Hỏi khách muốn kiểu thật tự nhiên hay đậm hơn một chút, có đeo kính áp tròng không, có hay bơi, xông hơi, dụi mắt, ngủ úp mặt không. Sau đó nói thật về classic: nó cho vẻ tự nhiên, và độ dày đi theo mi thật của chính khách." },
        { img: { src: img("khach-soi-guong-sau-khi-noi-mi-classic"), alt: "Khách nữ tóc vàng mặc áo len kem ngồi trên ghế, cầm gương tay ngắm hàng mi vừa nối, thợ mi đứng phía sau mỉm cười", caption: "Khách đã được nói trước classic trông thế nào thì hài lòng với đúng kết quả đó." } },
        { p: "Một bộ classic đầy đủ thường mất 1,5–2 giờ, và làm vội thì dễ tách mi không sạch. Nếu tiệm nhận đặt lịch qua VaraaAi, hãy đặt thời lượng thật cho dịch vụ này trong phần [dịch vụ](lesson:dich-vu), rồi tạo luôn [lịch hẹn](lesson:lich-hen) dặm mi trước khi khách ra về." },
        { note: "Thời gian giữ khô, độ ẩm và nhiệt độ phòng luôn theo hướng dẫn của hãng keo. Bài viết là tài liệu đào tạo, không thay cho chứng chỉ nghề, và quy định về dịch vụ làm đẹp khác nhau theo từng nước.", kind: "info", title: "Lưu ý" },
      ],
    },
  ],
  faq: [
    {
      q: "Nối mi classic giữ được bao lâu?",
      a: "Bộ mi thưa dần theo vòng đời của mi thật, vì sợi nối rụng cùng sợi mi thật mà nó bám vào. Khách thường quay lại dặm sau 2–3 tuần, tùy tốc độ rụng mi của từng người và cách giữ mi ở nhà.",
    },
    {
      q: "Nối mi classic có làm rụng mi thật không?",
      a: "Mi thật bị kéo rụng sớm khi bộ mi được gắn sai: hai sợi mi dính chùm vào nhau, sợi nối quá dài hoặc quá nặng, hay keo chạm vào da mí. Khi mỗi sợi mi thật mang một sợi nối vừa sức và chân sợi nối cách da mí khoảng 0,5–1 mm, sợi mi vẫn mọc và rụng theo vòng đời bình thường của nó.",
    },
    {
      q: "Vì sao mới nối mà mỗi ngày vẫn rụng vài sợi?",
      a: "Mỗi ngày đều có vài sợi mi thật đến hạn rụng, và sợi nối trên đó rụng theo. Sợi rụng tự nhiên có một cái chân nhỏ, màu nhạt ở gốc. Đó không phải do keo làm hỏng mi.",
    },
    {
      q: "Mi thật thưa có nên nối mi classic không?",
      a: "Nối được, nhưng cần biết trước kết quả: classic gắn một sợi nối lên một sợi mi thật nên mi thưa thì vẫn thưa, chỉ dài và đen hơn. Khách muốn hàng mi dày và đậm thì nên được tư vấn volume hoặc hybrid, với sợi vừa sức mi thật.",
    },
    {
      q: "Nối mi classic khác volume ở điểm nào?",
      a: "Classic gắn một sợi nối lên một sợi mi thật và cho vẻ tự nhiên như chải mascara. Volume gắn một fan gồm vài sợi rất mảnh lên một sợi mi thật để hàng mi dày hơn. Cả hai đều giữ nguyên tắc: chỉ gắn lên đúng một sợi mi thật.",
    },
    {
      q: "Sau khi nối mi classic cần kiêng gì?",
      a: "Giữ mi khô trong khoảng thời gian hãng keo khuyên, không dùng sản phẩm có dầu ở chân mi, chải mi mỗi ngày, không dụi mắt và không tự nhổ sợi nối. Bơi, xông hơi và ngủ úp mặt xuống gối làm mi nhanh thưa hơn.",
    },
  ],
  related: ["mi-classic", "mi-chuan-bi-hieu-dung", "mi-volume-hieu-dung", "mi-dam-thao-hieu-dung"],
};

export default article;
