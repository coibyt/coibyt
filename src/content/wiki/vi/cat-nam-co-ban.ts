import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-co-ban/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-cat-toc-nam-co-ban",
  lesson: "cat-nam-co-ban",
  category: "hair",
  title: "Cách cắt tóc nam cơ bản: 12 bước từ tông đơ hai bên đến đường viền",
  metaTitle: "Cách cắt tóc nam cơ bản: 12 bước bằng tông đơ và kéo",
  metaDescription:
    "Cách cắt tóc nam cơ bản từng bước: giấy cổ, tư vấn, tông đơ có cữ ở hai bên và gáy, kéo trên lược, cắt phần đỉnh theo đường chuẩn, viền tai, tóc mai, gáy.",
  keyword: "cách cắt tóc nam cơ bản",
  keywords: [
    "các bước cắt tóc nam",
    "cắt tóc nam bằng tông đơ",
    "cách cắt tóc nam bằng kéo",
    "cắt tóc nam ngắn cổ điển",
    "cắt tóc nam nên để tóc ướt hay khô",
    "cách viền tóc mai và gáy",
    "cắt tóc nam tại nhà",
  ],
  excerpt: "Một kiểu tóc nam ngắn cổ điển, làm theo đúng thứ tự: hai bên và phía sau bằng tông đơ, nối lên bằng kéo trên lược, phần đỉnh theo đường chuẩn, rồi đường viền.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-cat-toc-nam-trong-tiem-barber-sang-trong"),
    alt: "Người thợ mặc gi lê tím cầm lược đứng sau khách nam quàng áo choàng đen, trong tiệm cắt tóc ốp gỗ sẫm với gương viền đồng",
  },
  takeaways: [
    "Thống nhất bốn điều trước khi cắt: hai bên ngắn cỡ nào, đỉnh để bao nhiêu, gáy vuông hay tròn, tóc mai đến đâu.",
    "Đi tông đơ bằng cữ đã thống nhất **hoặc dài hơn**, cữ áp phẳng, đi lên ngược chiều tóc mọc, tới đường vòng đầu thì lật cổ tay ra.",
    "Lọn đầu tiên ở trán là **đường chuẩn**: mỗi lọn sau lấy kèm một chút lọn trước và giữ cùng góc nâng.",
    "Chỉ dùng cữ ngắn hơn hay bỏ cữ ở viền dưới cùng khi khách đã đồng ý từ trước.",
    "Trước khi khách về, ghi cữ, độ dài và kiểu gáy vào hồ sơ, rồi hẹn lần sau khoảng 3–5 tuần.",
  ],
  intro: [
    "Cách cắt tóc nam cơ bản mà người thợ nào cũng phải thuộc là kiểu ngắn cổ điển: hai bên và phía sau ngắn, nối mềm lên phần đỉnh dài hơn, đường viền gọn gàng. Kiểu này không cần dụng cụ gì đặc biệt. Nó cần đúng thứ tự, và một bàn tay không vội.",
    "Bài viết này đi lại quy trình của bài học “Cắt tóc nam cơ bản: thực hành từng bước” trong khóa Nghề Tóc của VaraaAi Academy, từ lúc quấn dải giấy cổ cho tới lúc quét tóc dưới ghế. Làm theo, bạn cắt được trọn một kiểu tóc nam ngắn và biết kiểm tra nó trước khi khách đứng dậy. Lý do đằng sau từng thao tác được giải thích ở bài lý thuyết [Học cắt tóc nam cho người mới](lesson:cat-nam-co-ban-hieu-dung).",
  ],
  sections: [
    {
      id: "thong-nhat-voi-khach",
      title: "Kiểu tóc nam ngắn cổ điển và bốn điều cần thống nhất với khách",
      blocks: [
        { p: "Trước khi bật máy, hai người phải nhìn thấy cùng một kiểu tóc. Với kiểu ngắn cổ điển, chỉ cần hỏi đủ bốn câu, như trong bài [Tư vấn và chia vùng tóc](lesson:toc-tu-van-chia-vung)." },
        {
          table: {
            head: ["Hỏi khách", "Thống nhất bằng gì"],
            rows: [
              ["Hai bên ngắn cỡ nào", "Số cữ cụ thể"],
              ["Phần đỉnh để lại bao nhiêu", "Ngón tay: “còn chừng này”"],
              ["Gáy vuông hay tròn", "Một trong hai, nói rõ"],
              ["Tóc mai đến đâu", "Chỉ vào vị trí trên mặt khách"],
            ],
          },
        },
        { p: "Hỏi thêm lần trước khách cắt thế nào và có điều gì khách không thích. Cái khách không thích thường quan trọng hơn cái khách thích. Trong lúc nói chuyện, bạn chải tóc theo vài hướng để tìm xoáy và nhìn da đầu." },
        { note: "Số cữ khác nhau theo từng hãng tông đơ. Nếu khách đọc một số cữ quen từ tiệm khác mà bạn chưa cắt cho khách lần nào, hãy bắt đầu bằng cữ dài hơn rồi mới xuống dần.", kind: "tip", title: "Kinh nghiệm trong nghề" },
      ],
    },
    {
      id: "toc-uot-hay-kho",
      title: "Cắt tóc nam nên để tóc ướt hay khô",
      blocks: [
        { p: "Trong bài học, tóc được làm ẩm đều bằng bình phun sương rồi mới cắt. Nhiều thợ lại đi tông đơ khi tóc khô và sạch, sau đó mới làm ẩm để cắt kéo ở phần đỉnh. Cách nào cũng được, miễn là tóc sạch, chải thẳng và không rối." },
        { p: "Điều cần tránh là tóc ướt nhỏ giọt. Bạn vừa chải vừa xịt, theo chiều tóc rơi tự nhiên, và dừng khi tóc ẩm đều." },
      ],
    },
    {
      id: "bon-lan-kiem-tra",
      title: "Bốn lần kiểm tra trong một lần cắt tóc nam",
      blocks: [
        { p: "Người mới thường cắt một mạch rồi mới nhìn lại, lúc đó sửa đã khó. Thợ lành nghề dừng lại kiểm tra sau từng giai đoạn, mỗi lần chỉ mất vài giây." },
        {
          ol: [
            "**Sau lượt tông đơ.** Chải tóc xuống rồi đi lại một lượt theo hướng khác. Những sợi nằm rạp ở lượt đầu sẽ không bị sót.",
            "**Sau khi cắt phần đỉnh.** Kiểm tra chéo bằng các lọn ngang từ bên này sang bên kia. Lọn nào nhô lên thì tỉa lại.",
            "**Sau khi nối đỉnh với hai bên.** Vuốt tay từ dưới lên và nhìn nghiêng. Không còn bậc mới chuyển sang đường viền.",
            "**Sau khi viền.** Đầu khách thẳng, nhìn thẳng gương, hai ngón tay so hai bên mai. Rồi đưa gương tay cho khách xem gáy.",
          ],
        },
        { p: "Giữa chừng phần đỉnh, bạn cũng dừng lại một lần, nhìn vào gương và hỏi khách độ dài như vậy đã được chưa. Hỏi lúc tóc còn dài thì còn sửa được." },
      ],
    },
    {
      id: "gay-vuong-hay-tron",
      title: "Viền gáy vuông hay tròn, và khi nào được bỏ cữ ở viền dưới",
      blocks: [
        { p: "Gáy vuông hay gáy tròn không có kiểu nào đúng hơn. Bạn làm theo đúng điều đã thống nhất lúc tư vấn. Khi viền, cho khách cúi đầu nhẹ, viền gọn theo chân tóc và đừng đẩy đường gáy lên quá cao." },
        { img: { src: img("vien-gay-toc-nam-bang-tong-do-vien"), alt: "Người thợ đứng sau khách nam, một tay giữ đầu khách hơi cúi, tay kia dùng tông đơ viền nhỏ màu đen sửa đường gáy", caption: "Khách cúi nhẹ đầu, tay còn lại của thợ giữ đầu khách cho vững khi viền gáy." } },
        { p: "Phần tóc dưới cùng ở hai bên và gáy là nơi thợ hay muốn làm ngắn thêm cho gọn. Bạn chỉ dùng cữ ngắn hơn, hoặc bỏ cữ, ở viền dưới cùng khi khách đã đồng ý từ trước. Chưa thống nhất thì đừng tự ý, vì tóc đã cắt ngắn không làm dài lại được." },
      ],
    },
    {
      id: "ve-sinh-an-toan",
      title: "Vệ sinh dụng cụ và trường hợp không cắt",
      blocks: [
        { p: "Tông đơ, cữ, lược và kéo được làm sạch và khử khuẩn sau mỗi khách, theo hướng dẫn của sản phẩm khử khuẩn bạn dùng. Dải giấy cổ và lưỡi dao cạo là đồ dùng một lần. Lưỡi tông đơ được tra dầu sau khi khử khuẩn để chạy êm cho khách tiếp theo." },
        { note: "Da đầu có vết thương, viêm hay có chấy thì không cắt. Quy định vệ sinh cho tiệm tóc khác nhau theo từng nước, nên hãy kiểm tra quy định nơi bạn làm việc. Xem thêm [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu) và [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam).", kind: "warn", title: "An toàn" },
      ],
    },
    {
      id: "ghi-ho-so-khach",
      title: "Ghi lại để lần sau khách chỉ cần nói “như lần trước”",
      blocks: [
        { p: "Một khách nam hài lòng thường quay lại đúng kiểu cũ. Vì vậy ba điều của lần cắt hôm nay rất đáng ghi: hai bên cữ mấy, phần đỉnh dài bao nhiêu, gáy vuông hay tròn. Trong VaraaAi, bạn ghi chúng vào ghi chú của khách trong [sổ khách hàng](lesson:khach-hang). Lần sau, ai trong tiệm đứng ghế cũng cắt được đúng như vậy." },
        { p: "Kiểu ngắn giữ dáng khoảng 3–5 tuần, nên hãy hẹn lần sau ngay khi khách còn ngồi trên ghế. Bạn đặt luôn cuộc hẹn trên [lịch hẹn](lesson:lich-hen) của tiệm, hoặc dùng [thẻ khách quen](lesson:the-khach-quen) để khách có lý do quay lại đều." },
      ],
    },
  ],
  howTo: {
    title: "Các bước cắt tóc nam cơ bản",
    id: "cac-buoc-cat-toc-nam",
    after: "thong-nhat-voi-khach",
    lead: "Mười hai bước dưới đây theo đúng thứ tự trong video bài học: tông đơ trước, kéo sau, đường viền cuối cùng.",
    supplies: [
      "Tông đơ và bộ cữ, đã làm sạch và khử khuẩn",
      "Tông đơ viền",
      "Lược cắt và kéo, đã làm sạch và khử khuẩn",
      "Bình phun sương",
      "Dải giấy cổ dùng một lần và áo choàng",
      "Chổi phủi cổ, gương tay",
      "Một ít sản phẩm tạo kiểu",
    ],
    steps: [
      {
        name: "Rửa tay và quấn giấy cổ",
        text: "Rửa tay, kiểm tra tông đơ, cữ, lược và kéo đều đã được làm sạch, khử khuẩn sau khách trước. Quấn một dải giấy cổ dùng một lần quanh cổ khách rồi mới cài áo choàng lên trên. Dải giấy ngăn áo choàng chạm trực tiếp vào da cổ của từng khách.",
        image: { src: img("quan-giay-co-truoc-khi-cat-toc-nam"), alt: "Người thợ quấn một dải giấy trắng quanh cổ khách nam đang ngồi nghiêng, áo choàng đen đã phủ trên vai khách" },
      },
      {
        name: "Tư vấn và thống nhất độ dài",
        text: "Hỏi bốn điều: hai bên, phần đỉnh, kiểu gáy và tóc mai. Chốt bằng số cữ cho hai bên và bằng ngón tay cho phần đỉnh. Chải tóc theo vài hướng để tìm xoáy và nhìn qua da đầu trước khi bắt đầu.",
      },
      {
        name: "Làm ẩm tóc",
        text: "Xịt phun sương đều, vừa chải vừa xịt theo chiều tóc rơi tự nhiên. Tóc chỉ cần ẩm đều, không nhỏ giọt. Nếu bạn quen đi tông đơ trên tóc khô và sạch thì để bước này lại trước khi cắt kéo.",
      },
      {
        name: "Đi tông đơ có cữ ở hai bên",
        text: "Lắp cữ đã thống nhất, hoặc dài hơn một chút. Đặt cữ áp phẳng vào đầu ở chân tóc rồi đi lên ngược chiều tóc mọc, chậm và đều, các đường chồng lên nhau một chút. Tới khoảng đường vòng đầu thì nhẹ tay và lật cổ tay ra ngoài. Gần tai, lấy ngón tay gập nhẹ vành tai xuống cho khỏi vướng, và không ấn mạnh máy vào đầu.",
        image: { src: img("di-tong-do-co-cu-nguoc-chieu-toc-moc"), alt: "Người thợ đưa tông đơ gắn cữ đen đi lên ở mái bên của khách nam, tay kia đặt trên đỉnh đầu để giữ tóc", caption: "Cữ áp phẳng, máy đi từ dưới lên. Tay còn lại giữ phần tóc đỉnh khỏi rơi vào đường máy." },
      },
      {
        name: "Đi phía sau từ gáy lên xương chẩm",
        text: "Phía sau làm y như hai bên: bắt đầu ở chân tóc gáy, đi lên tới xương chẩm rồi lật cổ tay ra. Xong một lượt, chải tóc xuống và đi lại lượt nữa theo hướng khác để không sót sợi nào. Nếu đã thống nhất với khách phần dưới cùng ngắn hơn, lúc này mới đổi cữ ngắn hơn hoặc bỏ cữ, và chỉ ở viền dưới cùng.",
        image: { src: img("di-tong-do-tu-gay-len-xuong-cham"), alt: "Nhìn từ phía sau, người thợ đưa tông đơ gắn cữ đi lên ở phần chẩm của khách nam, tay kia đặt nhẹ trên cổ khách" },
      },
      {
        name: "Nối lên bằng kéo trên lược",
        text: "Đặt lược sát đầu ở chỗ tông đơ vừa dừng, răng lược hơi nghiêng ra. Cắt phần tóc lòi qua lược, lưỡi kéo chạy song song theo lược. Lược đi lên dần và nghiêng ra dần để tóc dài dần lên trên. Làm hết hai bên rồi tới phía sau, không dừng lâu một chỗ vì sẽ thành bậc.",
        image: { src: img("keo-tren-luoc-noi-toc-hai-ben"), alt: "Người thợ giữ lược đen đỡ một lớp tóc của khách nam, tay kia cầm kéo cắt phần tóc lòi lên trên sống lược", caption: "Lưỡi kéo nằm song song với lược và chỉ cắt phần tóc lòi qua răng lược." },
      },
      {
        name: "Cắt đường chuẩn ở phần đỉnh",
        text: "Chia phần đỉnh từ hai góc trán ra sau tới đỉnh đầu. Lấy một lọn mỏng ở trước trán, nâng thẳng lên vuông góc với da đầu, kẹp giữa ngón trỏ và ngón giữa, rồi cắt đúng độ dài đã thống nhất. Lọn này là đường chuẩn. Các lọn phía sau lấy kèm một chút tóc của lọn trước để cắt theo, và giữ nguyên góc nâng cho tới đỉnh đầu. Tới chỗ xoáy thì để dài hơn một chút và kéo căng nhẹ tay, để tóc không dựng lên.",
        image: { src: img("cat-duong-chuan-phan-dinh-toc-nam"), alt: "Người thợ kẹp một lọn tóc đỉnh của khách nam giữa ngón trỏ và ngón giữa, nâng thẳng lên và cắt bằng kéo phía trên ngón tay", caption: "Lọn tóc nâng vuông góc với da đầu, kéo cắt phía trên ngón tay." },
      },
      {
        name: "Kiểm tra chéo phần đỉnh",
        text: "Vừa rồi bạn cắt theo chiều từ trán ra sau. Bây giờ chải tóc lên theo những lọn ngang, từ bên này sang bên kia, kẹp giữa ngón tay và xem độ dài có đều không. Lọn nào nhô lên thì tỉa lại cho bằng.",
        image: { src: img("kiem-tra-cheo-phan-dinh-toc-nam"), alt: "Người thợ dùng lược nâng một lọn tóc đỉnh của khách nam lên cao và giữ giữa các ngón tay để xem độ dài" },
      },
      {
        name: "Nối phần đỉnh với hai bên",
        text: "Ở góc chỗ hai bên gặp phần đỉnh thường còn một chút gờ. Dùng kéo trên lược, hoặc cắt lọn tóc ở góc ấy ra ngoài, cho tới khi vuốt tay từ dưới lên không còn thấy bậc. Nhìn nghiêng trong gương để kiểm tra cả hai bên.",
      },
      {
        name: "Viền quanh tai, tóc mai và gáy",
        text: "Gập nhẹ vành tai xuống, dùng tông đơ viền tạo một đường cong tự nhiên theo chân tóc, không khoét cao. Cắt hai bên tóc mai bằng nhau: khách ngồi thẳng, nhìn thẳng gương, bạn đặt hai ngón tay ở chân hai bên mai để so. Cuối cùng viền gáy vuông hoặc tròn như đã thống nhất, khách cúi đầu nhẹ.",
        image: { src: img("vien-toc-quanh-tai-bang-tong-do-vien"), alt: "Người thợ dùng ngón tay gập vành tai của khách nam xuống, tay kia cầm tông đơ viền nhỏ sửa chân tóc gần tai" },
      },
      {
        name: "Phủi tóc, tạo kiểu và đưa gương tay",
        text: "Phủi sạch tóc vụn trên cổ và quanh tai bằng chổi phủi cổ, tháo áo choàng, bỏ dải giấy cổ. Vuốt một chút sản phẩm tạo kiểu theo cách khách sẽ tự làm ở nhà và chỉ cho khách cách làm. Cầm gương tay đưa ra phía sau cho khách xem gáy và hai bên. Khách muốn chỉnh gì thì chỉnh ngay lúc ấy, đừng để khách về nhà rồi mới thấy không ưng.",
        image: { src: img("cho-khach-xem-gay-bang-guong-tay"), alt: "Người thợ cầm một chiếc gương tay tròn viền đồng phía sau đầu khách nam để khách xem phần gáy vừa cắt" },
      },
      {
        name: "Ghi hồ sơ, hẹn lần sau và dọn dẹp",
        text: "Ghi vào hồ sơ khách: hai bên cữ mấy, phần đỉnh dài bao nhiêu, gáy vuông hay tròn, rồi hẹn lần sau, thường sau 3–5 tuần. Khách về rồi thì chải sạch tóc trong lưỡi tông đơ, khử khuẩn lưỡi, cữ, lược và kéo theo hướng dẫn của sản phẩm, tra dầu cho lưỡi và quét sạch tóc dưới ghế.",
      },
    ],
  },
  faq: [
    {
      q: "Cắt tóc nam cơ bản gồm những bước nào?",
      a: "Thứ tự là: chuẩn bị và quấn giấy cổ, tư vấn, làm ẩm, đi tông đơ có cữ ở hai bên và phía sau, nối lên bằng kéo trên lược, cắt phần đỉnh theo đường chuẩn, kiểm tra chéo, nối đỉnh với hai bên, viền tai, tóc mai và gáy, rồi phủi tóc, tạo kiểu và cho khách xem gương tay.",
    },
    {
      q: "Cắt tóc nam nên cắt hai bên trước hay phần đỉnh trước?",
      a: "Trong quy trình của bài học, hai bên và phía sau được làm trước bằng tông đơ có cữ, rồi nối lên bằng kéo trên lược. Phần đỉnh cắt sau bằng kéo, theo một đường chuẩn ở trán. Cuối cùng mới nối đỉnh với hai bên và làm đường viền.",
    },
    {
      q: "Đường chuẩn khi cắt phần đỉnh là gì?",
      a: "Đó là lọn tóc đầu tiên ở trước trán, được nâng vuông góc với da đầu và cắt đúng độ dài đã thống nhất. Mỗi lọn phía sau lấy kèm một chút tóc của lọn trước và cắt theo nó, nên phần đỉnh dài đều từ trán tới đỉnh đầu.",
    },
    {
      q: "Khi nào được bỏ cữ tông đơ ở viền dưới cùng?",
      a: "Chỉ khi đã thống nhất với khách từ trước. Tóc đã cắt ngắn thì không làm dài lại được, nên mọi thay đổi về độ dài phải được khách đồng ý. Nếu chưa hỏi, hãy giữ cữ đã thống nhất.",
    },
    {
      q: "Cắt tóc nam để tóc ướt hay tóc khô?",
      a: "Cả hai cách đều dùng được. Bài học làm ẩm tóc đều bằng bình phun sương trước khi cắt, còn nhiều thợ đi tông đơ trên tóc khô, sạch rồi mới làm ẩm để cắt kéo. Điều kiện chung là tóc sạch, chải thẳng, không rối và không ướt nhỏ giọt.",
    },
    {
      q: "Cắt tóc nam tại nhà cho người thân có làm theo các bước này được không?",
      a: "Thứ tự các bước vẫn như vậy. Người mới nên bắt đầu bằng cữ dài hơn mức định cắt, giữ cữ áp phẳng, không ấn mạnh máy và không bỏ cữ ở viền dưới. Da đầu có vết thương, viêm hay có chấy thì không cắt.",
    },
  ],
  related: ["cat-nam-co-ban-hieu-dung", "toc-tu-van-chia-vung", "cat-nam-fade", "cat-nam-tao-kieu"],
};

export default article;
