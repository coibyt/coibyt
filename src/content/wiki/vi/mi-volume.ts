import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-volume/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-noi-mi-volume",
  lesson: "mi-volume",
  category: "lash",
  title: "Cách nối mi volume: 10 bước tạo fan bằng tay và gắn fan lên mi thật",
  metaTitle: "Cách nối mi volume: 10 bước tạo fan và gắn fan",
  metaDescription:
    "Hướng dẫn nối mi volume với fan tự tạo: lấy sợi trên dải, trượt nhíp mở fan, kiểm tra fan, chạm chân fan vào keo, gắn cách da mí 0,5–1 mm, kiểm tra dính chùm.",
  keyword: "cách nối mi volume",
  keywords: [
    "cách tạo fan mi volume",
    "tạo fan volume bằng tay",
    "các bước nối mi volume",
    "kỹ thuật nối mi volume cho người mới",
    "cách lấy keo cho fan volume",
    "nhíp volume",
    "học nối mi volume",
  ],
  excerpt: "Mười bước của một bộ mi volume với fan tự tạo bằng tay: lấy sợi, mở fan, kiểm tra, lấy keo, gắn và soát dính chùm, kèm những fan phải bỏ đi.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-noi-mi-volume-cho-khach-trong-studio"),
    alt: "Thợ nối mi mặc áo kem cúi xuống nối mi cho khách đang nằm đắp chăn trên giường, cạnh đó là bàn nhỏ viền vàng đặt khay dụng cụ",
  },
  takeaways: [
    "Ba điều giữ suốt buổi: mắt khách nhắm kín, **mỗi fan chỉ gắn vào đúng một sợi mi thật**, keo không bao giờ chạm da.",
    "Tạo fan: kẹp nhẹ vài sợi ở phần gần ngọn, trượt nhíp về phía chân cho các sợi xoè ra, rồi **khép nhíp ở chân** cho chân fan nhỏ và gọn.",
    "Kiểm tra fan trước khi lấy keo. Fan lệch, chân bè, sợi dính đôi hay dính cục keo to thì bỏ, làm fan mới.",
    "Chỉ chạm **chân fan vào mép giọt keo**; chân fan ôm quanh sợi mi thật, cách da mí khoảng 0,5–1 mm.",
    "Gắn xen kẽ các vùng, sau mỗi vùng lướt nhíp kiểm tra dính chùm và nhìn hàng mi từ nhiều góc.",
  ],
  intro: [
    "Cách nối mi volume khác classic ở đúng một công đoạn: trước khi gắn, người thợ phải tự tạo ra chiếc fan. Vài sợi mi rất mảnh được lấy khỏi dải, mở xoè bằng một đường trượt nhíp và khép lại ở chân, rồi mới đến keo và sợi mi thật. Phần còn lại, từ tách mi đến kiểm tra dính chùm, là những thao tác bạn đã quen từ classic.",
    "Bài viết này viết lại bài học “Nối mi volume: thực hành tạo fan từng bước” trong khóa Nghề Mi của VaraaAi Academy. Xem video bên dưới để nhìn chuyển động của nhíp, sau đó đọc từng bước và tập tạo fan trên vỉ mi cho đến khi tay đều, trước khi làm cho khách.",
  ],
  sections: [
    {
      id: "truoc-khi-bat-dau",
      title: "Trước khi nối mi volume: ba điều giữ suốt buổi",
      blocks: [
        { p: "Bộ volume nào cũng đứng trên ba điều không đổi:" },
        {
          ul: [
            "Mắt khách nhắm kín từ đầu đến cuối.",
            "Mỗi fan chỉ gắn vào đúng một sợi mi thật.",
            "Keo không bao giờ chạm vào da.",
          ],
        },
        { p: "Phần chuẩn bị giống hệt bài thực hành [nối mi classic](lesson:mi-classic): tư vấn và hỏi về dị ứng, cho khách nằm thoải mái, làm sạch mi, dán miếng lót, chải mi. Nếu bạn chưa vững những thao tác đó, hãy quay lại bài classic trước khi tập volume." },
        { p: "Vì sao sợi volume phải thật mảnh, và chọn 2D hay 5D cho khách nào, được giải thích trong bài lý thuyết [Nối mi volume là gì](lesson:mi-volume-hieu-dung). Bài này chỉ nói về đôi tay." },
      ],
    },
    {
      id: "fan-nao-phai-bo",
      title: "Tạo fan volume bằng tay: fan nào giữ, fan nào bỏ",
      blocks: [
        { p: "Độ xoè của fan đổi cảm giác của cả bộ mi. Fan hẹp cho hàng mi sắc nét hơn, fan rộng cho cảm giác dày và mềm hơn. Giới hạn nằm ở sợi mi bên cạnh: fan xoè quá rộng sẽ chạm sang nó." },
        {
          table: {
            head: ["Bạn thấy gì", "Vì sao là vấn đề", "Làm gì"],
            rows: [
              ["Fan lệch, chân bè, có sợi dính đôi", "Fan nặng và dễ dính sang sợi mi bên cạnh", "Bỏ, làm fan mới trước khi lấy keo"],
              ["Chân fan dính một cục keo to", "Keo leo lên giữa các sợi, fan dính thành khối", "Bỏ fan đó, đừng tiếc"],
              ["Fan đã đặt lên mi nhưng nằm lệch, lật hoặc xoắn", "Fan không ôm sợi mi thật", "Gỡ ra ngay khi keo chưa bắt, làm fan mới; không cố sửa khi keo đã khô"],
              ["Giọt keo trên đá đã đặc lại", "Keo để lâu bám kém", "Thay giọt mới thường xuyên, theo hướng dẫn của hãng keo"],
            ],
          },
        },
        { note: "Làm lại một fan chỉ mất vài giây. Gắn một fan xấu lên mắt khách thì mất nhiều hơn thế. Hãy tập tạo fan trên vỉ mi hằng ngày cho đến khi tay đều, rồi mới tính đến tốc độ.", kind: "tip", title: "Tập trên vỉ trước" },
      ],
    },
    {
      id: "khoang-cach-va-do-dai",
      title: "Khoảng cách với da mí và độ dài theo từng vùng mắt",
      blocks: [
        { p: "Chân fan cách da mí khoảng **0,5–1 mm** và không bao giờ chạm da. Keo chạm da gây cộm, ngứa, có khi kích ứng, và kéo sợi mi khi mi mọc ra. Gắn quá xa thì fan lỏng và rụng sớm." },
        { p: "Về độ dài, góc trong ngắn nhất rồi dài dần về phía đuôi mắt. Số sợi trong fan cũng đổi theo vùng:" },
        {
          table: {
            head: ["Vùng mắt", "Mi thật ở đó", "Fan phù hợp"],
            rows: [
              ["Góc trong", "Ngắn và yếu", "Ít sợi, ngắn và nhẹ"],
              ["Giữa và đuôi mắt", "Thường khoẻ hơn", "Có thể nhiều sợi hơn, vẫn theo sức của từng sợi mi"],
            ],
          },
        },
        { p: "Chọn kiểu mi cho từng dáng mắt là nội dung của bài [lash mapping](lesson:mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "kiem-tra-dinh-chum",
      title: "Kiểm tra dính chùm khi nối volume",
      blocks: [
        { p: "Fan rộng hơn một sợi classic, nên chỉ cần một sợi mi thật bên cạnh còn nằm sát là keo dính sang ngay. Việc phòng bắt đầu từ bước tách mi: tách thật sạch, để sợi mi thật đứng riêng hẳn ra." },
        { p: "Sau mỗi vùng, lướt nhíp thẳng nhẹ qua hàng mi từ chân ra ngọn. Mỗi fan phải đứng riêng trên một sợi mi thật. Thấy dính thì tách ra ngay, thật nhẹ nhàng. Hãy nhìn hàng mi từ trên xuống và cả từ cạnh bên, vì có những chỗ dính chỉ lộ ra khi nhìn nghiêng." },
      ],
    },
    {
      id: "dan-do-va-don-dep",
      title: "Dặn khách và dọn dẹp sau khi nối mi volume",
      blocks: [
        { p: "Lời dặn cho khách volume giống khách classic:" },
        {
          ul: [
            "Giữ mi khô trong khoảng thời gian hãng keo khuyên.",
            "Không dùng sản phẩm có dầu ở chân mi.",
            "Chải mi mỗi ngày.",
            "Không dụi mắt.",
            "Quay lại dặm sau 2–3 tuần.",
          ],
        },
        { p: "Khách về rồi, chổi chải mi, que bông và miếng lót đã dùng được bỏ vào thùng rác có nắp. Nhíp được làm sạch và khử khuẩn sau mỗi khách, theo quy trình trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
        { img: { src: img("lam-sach-nhip-noi-mi-sau-moi-khach"), alt: "Bàn tay đeo găng đen thả hai cây nhíp vào hộp thuỷ tinh đựng dung dịch trên mặt đá, bên cạnh là thùng rác có nắp chứa chổi chải mi đã dùng", caption: "Sau mỗi khách: đồ dùng một lần vào thùng có nắp, nhíp đi làm sạch và khử khuẩn." } },
      ],
    },
    {
      id: "xep-lich-cho-bo-volume",
      title: "Bộ volume đầu tiên sẽ lâu: xếp lịch cho đúng",
      blocks: [
        { p: "Lần đầu, một bộ volume mất rất lâu, lâu hơn classic nhiều. Điều đó bình thường. Sau mỗi bộ mi, tay bạn đều hơn và nhanh hơn." },
        { p: "Lịch của tiệm nên phản ánh tốc độ thật đó. Trong VaraaAi, hãy đặt thời lượng [dịch vụ](lesson:dich-vu) volume theo tốc độ thật của từng thợ để lịch không bị dồn, và tạo [lịch hẹn](lesson:lich-hen) dặm ngay khi khách còn ở tiệm. Số sợi và độ dài đã dùng cho từng vùng có thể ghi vào [sổ khách hàng](lesson:khach-hang) để lần sau làm lại cho đều." },
        { note: "Khoảng cách, độ dày và số sợi trong bài là hướng dẫn chung theo kinh nghiệm nghề; luôn theo bảng của hãng mi và hướng dẫn của hãng keo về độ ẩm, nhiệt độ và thời gian giữ khô. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Lưu ý" },
      ],
    },
  ],
  howTo: {
    title: "Các bước nối mi volume với fan tự tạo",
    id: "cac-buoc-noi-mi-volume",
    after: "truoc-khi-bat-dau",
    lead: "Mười bước theo đúng thứ tự trong video. Bước ba đến bước sáu là phần riêng của volume: tạo fan và lấy keo.",
    supplies: [
      "Vỉ mi volume, sợi rất mảnh, xếp theo độ dài",
      "Keo nối mi và đá ngọc để nhỏ giọt keo",
      "Nhíp thẳng để tách mi",
      "Nhíp volume đầu dài, gập góc, để tạo fan và gắn fan",
      "Miếng lót dưới mắt và đồ làm sạch mi như ở bài classic",
      "Chổi chải mi và que bông nhỏ dùng một lần",
    ],
    steps: [
      {
        name: "Chuẩn bị như bài classic",
        text: "Tư vấn và hỏi về dị ứng, cho khách nằm thoải mái, làm sạch mi, dán miếng lót và chải mi. Trong lúc chải, nhìn kỹ mi thật của từng vùng để chọn fan mấy sợi: mi khoẻ thì fan nhiều sợi hơn, mi yếu thì fan ít sợi và nhẹ.",
        image: { src: img("chai-mi-va-quan-sat-mi-that-tung-vung"), alt: "Bàn tay đeo găng đen dùng chổi chải mi dùng một lần chải hàng mi thật của khách đang nhắm mắt, dưới mắt có miếng lót trắng" },
      },
      {
        name: "Sắp bàn làm việc",
        text: "Bày vỉ mi volume xếp theo độ dài, viên đá ngọc với một giọt keo mới, nhíp thẳng, nhíp volume, chổi chải mi và que bông dùng một lần. Chai keo được đậy nắp ngay sau khi lấy keo.",
        image: { src: img("dung-cu-noi-mi-volume-tren-khay"), alt: "Khay đá trắng viền vàng bày vỉ mi volume xếp theo độ dài, đá ngọc có giọt keo, hai cây nhíp, chai keo đen và cốc chổi chải mi" },
      },
      {
        name: "Lấy vài sợi trên dải",
        text: "Đặt đầu nhíp volume ngang qua vài sợi mi trên dải, ở phần gần ngọn. Muốn fan mấy sợi thì lấy bấy nhiêu sợi; lúc mới tập cứ đếm cho chắc. Kẹp thật nhẹ như cầm một sợi chỉ, và lấy từ mép dải vào dần để những sợi còn lại không bị xô lệch.",
        image: { src: img("lay-vai-soi-mi-volume-tren-dai-bang-nhip"), alt: "Bàn tay đeo găng đen đưa đầu nhíp volume xuống một dải mi mảnh trên vỉ hồng, kẹp vài sợi ở phần gần ngọn" },
      },
      {
        name: "Trượt nhíp để mở fan",
        text: "Giữ nhẹ như vậy và trượt nhíp từ từ về phía chân sợi mi, các sợi sẽ tự xoè ra. Có thợ lăn nhẹ hoặc nghiêng nhíp để mở fan, cách nào cũng được. Cuối cùng khép nhíp lại ở chân cho chân fan thật nhỏ, thật gọn, rồi nhấc fan khỏi dải. Đừng xoè quá rộng.",
        image: { src: img("truot-nhip-mo-fan-mi-volume"), alt: "Nhíp volume nhấc vài sợi mi mảnh khỏi dải mi trên vỉ hồng, các sợi xoè ra thành hình quạt từ điểm nhíp kẹp ở chân" },
      },
      {
        name: "Kiểm tra fan trước khi lấy keo",
        text: "Nhìn ba thứ: chân fan có nhỏ và kín không, các sợi có xoè đều và cân đối không, số sợi có đúng không. Fan lệch, chân bè hay có sợi dính đôi thì bỏ đi và làm cái khác.",
      },
      {
        name: "Chạm chân fan vào mép giọt keo",
        text: "Chỉ phần chân fan chạm vào mép giọt keo, thật nhẹ, rồi rút ra. Không nhúng sâu, không để keo leo lên giữa các sợi. Keo mỏng, vừa đủ. Fan dính một cục keo to thì bỏ và làm fan mới.",
        image: { src: img("cham-chan-fan-vao-giot-keo-noi-mi"), alt: "Nhíp volume giữ một fan mi xoè đều, chân fan chạm nhẹ vào giọt keo đen trên viên đá ngọc đặt trong bàn tay đeo găng" },
      },
      {
        name: "Tách đúng một sợi mi thật",
        text: "Tay không thuận cầm nhíp thẳng và tách riêng một sợi mi thật, như ở classic. Tách thật sạch, vì fan rộng nên chỉ một sợi bên cạnh còn nằm sát là keo dính sang.",
      },
      {
        name: "Gắn fan ôm quanh sợi mi",
        text: "Đặt chân fan lên sợi mi thật đã tách sao cho chân fan ôm quanh sợi mi, cùng hướng mọc, cách da mí khoảng 0,5–1 mm. Áp nhẹ dọc sợi mi, giữ yên một chút cho keo bắt rồi mới nhả nhíp. Fan phải nằm đều, không lật, không xoắn; nằm lệch thì gỡ ra ngay khi keo chưa bắt.",
        image: { src: img("gan-fan-volume-len-mot-soi-mi-that"), alt: "Hai bàn tay đeo găng đen cầm hai cây nhíp: nhíp thẳng tách hàng mi của khách, nhíp volume đưa một fan mi xuống sợi mi thật đã tách" },
      },
      {
        name: "Gắn xen kẽ và kiểm tra dính chùm",
        text: "Đừng gắn lần lượt những sợi nằm sát nhau. Gắn một fan ở vùng đuôi mắt, rồi vùng giữa, rồi đầu mắt, rồi quay lại, để keo của fan trước có thời gian khô. Sau mỗi vùng, lướt nhíp thẳng từ chân ra ngọn và tách ngay chỗ nào dính.",
      },
      {
        name: "Hoàn thiện, dặn dò và dọn dẹp",
        text: "Chải lại mi và so hai mắt cho đều. Gỡ miếng lót thật nhẹ khi mắt khách vẫn nhắm, rồi cho khách mở mắt từ từ; khách thấy cay hoặc chảy nước mắt thì cho nhắm lại nghỉ một chút. Dặn khách cách giữ mi, hẹn dặm sau 2–3 tuần, rồi bỏ đồ dùng một lần và khử khuẩn nhíp.",
        image: { src: img("go-mieng-lot-sau-khi-noi-mi"), alt: "Đầu ngón tay đeo găng đen nhấc nhẹ mép ngoài miếng lót trắng dưới mắt khách, mắt vẫn nhắm với hàng mi nối đã hoàn thiện" },
      },
    ],
  },
  faq: [
    {
      q: "Cách tạo fan mi volume bằng tay như thế nào?",
      a: "Đặt đầu nhíp volume ngang qua vài sợi trên dải mi, ở phần gần ngọn, kẹp thật nhẹ. Trượt nhíp từ từ về phía chân sợi để các sợi xoè ra, rồi khép nhíp ở chân cho chân fan nhỏ và gọn và nhấc fan khỏi dải. Có thợ lăn nhẹ hoặc nghiêng nhíp để mở fan, cách nào cũng được miễn chân fan khép kín.",
    },
    {
      q: "Lấy keo cho fan volume thế nào cho đúng?",
      a: "Chỉ chạm phần chân fan vào mép giọt keo rồi rút ra nhẹ, không nhúng sâu. Keo leo lên giữa các sợi làm fan nặng, dính thành khối và dễ dính chùm. Fan đã dính một cục keo to thì bỏ và làm fan mới.",
    },
    {
      q: "Chân fan volume nên cách da mí bao nhiêu?",
      a: "Khoảng 0,5–1 mm và không bao giờ chạm da. Keo chạm da gây cộm, ngứa, có khi kích ứng và kéo sợi mi khi mi mọc ra. Gắn quá xa thì fan lỏng và rụng sớm.",
    },
    {
      q: "Fan gắn lên bị lệch thì sửa thế nào?",
      a: "Gỡ fan ra ngay khi keo còn chưa bắt và làm một fan mới. Không cố nắn lại khi keo đã khô. Một fan ôm lệch hoặc ôm sang hai sợi mi thật sẽ kéo mi và làm mi rụng sớm.",
    },
    {
      q: "Nối mi volume mất bao lâu?",
      a: "Bộ volume đầu tiên mất rất lâu và lâu hơn classic nhiều, vì mỗi fan phải được tạo, kiểm tra rồi mới gắn. Tốc độ tăng dần sau mỗi bộ mi khi tay tạo fan đã đều. Tiệm nên đặt thời lượng dịch vụ theo tốc độ thật của từng thợ.",
    },
    {
      q: "Người mới học nên tập nối mi volume từ đâu?",
      a: "Từ classic trước, vì phần chuẩn bị, tách mi và kiểm tra dính chùm của volume giống hệt classic. Sau đó tập tạo fan trên vỉ mi hằng ngày cho đến khi fan đều tay, rồi mới tính đến tốc độ và làm cho khách.",
    },
  ],
  related: ["mi-volume-hieu-dung", "mi-classic", "mi-hybrid", "mi-mega-wispy"],
};

export default article;
