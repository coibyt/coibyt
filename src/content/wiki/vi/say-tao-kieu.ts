import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/say-tao-kieu/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-say-toc-phong-bang-luoc-tron",
  lesson: "say-tao-kieu",
  category: "hair",
  title: "Cách sấy tóc phồng và vào nếp bằng lược tròn: 10 bước sấy tạo kiểu tóc dài",
  metaTitle: "Cách sấy tóc phồng, vào nếp bằng lược tròn: 10 bước",
  metaDescription:
    "Hướng dẫn cách sấy tóc phồng chân, mượt và cong đuôi bằng lược tròn: thấm khăn, bảo vệ nhiệt, sấy sơ, chia vùng từ gáy, gió mát và tạo phồng ở đỉnh đầu.",
  keyword: "cách sấy tóc phồng",
  keywords: [
    "cách sấy tóc tạo kiểu",
    "cách sấy tóc bằng lược tròn",
    "sấy tóc phồng chân tóc",
    "sấy tóc cong đuôi",
    "sấy tóc tạo kiểu tại nhà",
    "cách sấy tóc dài vào nếp",
    "tóc bị quấn vào lược tròn",
  ],
  excerpt: "Mười bước sấy một mái tóc dài có tầng cho mượt, bóng, chân tóc phồng nhẹ và đuôi cong mềm, kèm ba lỗi làm nếp xẹp sau một giờ.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-toc-say-tao-kieu-ghe-khach-vua-tam"),
    alt: "Thợ tóc đứng thẳng lưng sấy mái tóc vàng dài của khách bằng lược tròn và máy sấy, khách ngồi trên ghế nhung tím trong salon kiểu Paris",
  },
  takeaways: [
    "Sấy sơ bằng tay tới khoảng **bảy, tám phần khô** rồi mới cầm lược tròn.",
    "Chia vùng và bắt đầu từ lớp tóc ở **gáy**, mỗi lọn không rộng hơn lược.",
    "Đầu thu gió song song với lược, **chĩa xuống**, cách vài phân, đi theo lược từ chân xuống ngọn.",
    "Mỗi lọn sấy xong được giữ trên lược và bấm **gió mát** vài giây rồi mới rút lược.",
    "Muốn phồng ở đỉnh: nâng lọn tóc lên cao và sấy chân tóc trước. Tóc phải khô hẳn ở chân tóc và gáy thì nếp mới giữ.",
  ],
  intro: [
    "Cách sấy tóc phồng mà vẫn mượt không nằm ở cây lược đắt tiền hay chiếc máy mạnh. Nó nằm ở thứ tự: làm khô phần lớn nước bằng tay trước, chia tóc thành từng lớp mỏng, để gió luôn đi xuôi theo sợi tóc, và cho từng lọn nguội trên lược trước khi thả ra. Bỏ một trong bốn việc ấy thì tóc hoặc xù, hoặc xẹp lại sau một giờ.",
    "Bài viết đi theo bài học “Sấy tạo kiểu: thực hành từng bước” trong khóa Nghề Tóc của VaraaAi Academy. Kiểu sấy trong bài dành cho tóc dài có tầng: mượt, bóng, chân tóc phồng nhẹ, đuôi cong mềm. Làm theo mười bước, bạn sấy được trọn mái tóc ấy và biết chỉ lại cho khách cách tự làm ở nhà. Lý do của từng thao tác được giải thích ở bài lý thuyết [Sấy tóc đúng cách](lesson:say-tao-kieu-hieu-dung).",
  ],
  sections: [
    {
      id: "bon-nguyen-tac",
      title: "Bốn nguyên tắc giữ suốt buổi sấy",
      blocks: [
        { p: "Mười bước bên dưới thay đổi theo từng vùng đầu, còn bốn điều này thì không đổi từ lúc bật máy tới lúc tắt." },
        {
          table: {
            head: ["Nguyên tắc", "Vì sao"],
            rows: [
              ["Đầu máy chĩa xuống theo sợi tóc", "Gió xuôi thì tóc bóng. Gió ngược từ ngọn lên thì tóc xù ngay"],
              ["Máy luôn di chuyển", "Giữ một chỗ quá lâu làm tóc khô cháy và da đầu nóng rát"],
              ["Lọn tóc mỏng, không rộng hơn lược", "Lọn quá dày thì bên ngoài khô, bên trong vẫn ẩm"],
              ["Khô hẳn rồi làm nguội", "Tóc còn ẩm hoặc còn nóng khi thả ra thì nếp xẹp"],
            ],
          },
        },
        { note: "Sản phẩm bảo vệ nhiệt và serum dùng theo hướng dẫn của sản phẩm. Máy sấy dùng theo hướng dẫn của nhà sản xuất. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Trước khi bắt đầu" },
      ],
    },
    {
      id: "loi-hay-gap",
      title: "Sấy tóc bị xù, nhanh xẹp, bị quấn lược: lỗi và cách sửa",
      blocks: [
        {
          table: {
            head: ["Hiện tượng", "Nguyên nhân", "Cách sửa"],
            rows: [
              ["Tóc xù ngay khi sấy", "Đầu máy chĩa ngược lên, từ ngọn về chân tóc", "Xoay máy cho gió đi từ chân xuống ngọn"],
              ["Tóc khô cháy, khách kêu nóng rát da đầu", "Giữ máy một chỗ quá lâu", "Luôn di chuyển máy, giữ máy xa da hơn ở gần tai và gáy"],
              ["Nếp xẹp sau một giờ", "Lọn tóc quá dày nên bên trong còn ẩm", "Lấy lọn mỏng hơn, kiểm tra bằng tay ở chân tóc và gáy"],
              ["Lọn tóc duỗi ra ngay khi rút lược", "Rút lược khi tóc còn nóng", "Bấm gió mát vài giây, tóc nguội rồi mới rút"],
            ],
          },
        },
        { note: "Tóc bị quấn rối vào lược tròn thì đừng giật, vì giật làm gãy tóc và làm đau khách. Tắt máy, xoay lược ngược lại từ từ và gỡ từng chút một. Thêm nhiệt vào chỗ tóc đang bị kéo căng chỉ làm hại thêm.", kind: "warn", title: "Khi tóc quấn vào lược tròn" },
      ],
    },
    {
      id: "chinh-theo-khach",
      title: "Chỉnh theo khách: thẳng hẳn, phồng nhiều hơn, khách có mái",
      blocks: [
        {
          ul: [
            "**Khách muốn tóc thẳng hẳn, ít phồng.** Thay lược tròn bằng lược dẹt. Chải từ chân xuống ngọn, máy sấy đi theo phía trên lược, đầu máy vẫn chĩa xuống.",
            "**Khách muốn phồng nhiều hơn ở đỉnh.** Sau khi bấm gió mát, cuộn lọn tóc lại, kẹp nhẹ sát đầu, đợi nguội hẳn rồi mới tháo kẹp và vuốt nhẹ bằng tay.",
            "**Tóc dày.** Lấy từng lọn mỏng hơn bề rộng của lược để gió đi qua được hết.",
            "**Tóc đã nhuộm, đã tẩy hoặc tóc mảnh.** Càng cần bảo vệ nhiệt và càng phải để nhiệt thấp hơn.",
          ],
        },
        { h3: "Khách có mái thì sấy mái trước" },
        { p: "Mái khô rất nhanh, nên với khách có mái, hãy sấy mái ngay từ đầu, liền sau khi thấm khăn. Đầu máy chĩa xuống, chải mái qua trái rồi qua phải, như trong bài [Cách cắt tóc mái bay](lesson:cat-mai)." },
        { img: { src: img("say-toc-mai-truoc-tien"), alt: "Thợ tóc sấy phần mái của khách nữ tóc vàng bằng lược tròn nhỏ, máy sấy đen chĩa từ trên xuống, khách nhắm mắt", caption: "Mái được sấy trước khi nó kịp tự khô theo hướng mình không muốn." } },
      ],
    },
    {
      id: "say-tai-nha",
      title: "Sấy tóc tạo kiểu tại nhà: những gì nên chỉ cho khách",
      blocks: [
        { p: "Khách không có đầy đủ đồ nghề của tiệm, nên hãy chỉ cho khách cách tự sấy với chính chiếc máy và cây lược khách có ở nhà. Những điều sau áp dụng được với bất kỳ máy sấy nào:" },
        {
          ol: [
            "Thấm khăn bằng cách ép, không chà.",
            "Sấy bằng tay trước tới khi tóc chỉ còn hơi ẩm, rồi mới dùng lược.",
            "Giữ đầu máy chĩa xuống và luôn di chuyển máy.",
            "Sấy chân tóc trước, vì đó là chỗ khô chậm nhất.",
            "Sấy cho khô hẳn. Còn ẩm ở chân tóc hay ở gáy là nếp sẽ xẹp.",
          ],
        },
        { img: { src: img("toc-dai-co-tang-sau-khi-say-tao-kieu"), alt: "Khách nữ tóc vàng mật ong dài có tầng sau khi sấy, tóc mượt bóng, chân tóc phồng nhẹ và các lọn quanh mặt cong ra ngoài", caption: "Kết quả cần đạt: mượt, bóng, chân tóc phồng nhẹ, tóc quanh mặt mở khuôn mặt ra." } },
        { p: "Mái tóc trong bài là tóc dài có tầng, và tầng làm tóc dài bớt nặng, dễ tạo kiểu hơn khi sấy. Nếu khách than tóc dài hay bết sát đầu, hãy xem thêm bài [Cắt tóc tầng là gì](lesson:cat-nu-tang-hieu-dung)." },
      ],
    },
    {
      id: "an-toan-ve-sinh",
      title: "An toàn với máy sấy và vệ sinh lược",
      blocks: [
        {
          ul: [
            "Trước khi dùng, kiểm tra máy: đầu thu gió gắn chắc, lưới lọc sạch, dây không gãy, không nứt.",
            "Không dí đầu máy vào da đầu. Gần tai và gáy thì nhẹ tay, giữ máy xa da hơn một chút.",
            "Lấy tay che vành tai khách khi sấy ngay cạnh tai, và hỏi khách có nóng không.",
            "Xịt sản phẩm bảo vệ nhiệt xa mặt khách.",
            "Khách về: gỡ tóc khỏi lược, rửa sạch và khử khuẩn theo hướng dẫn của sản phẩm, như trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu). Rút điện máy sấy, để máy nguội rồi mới cất.",
          ],
        },
        { note: "Quy định về vệ sinh và hành nghề khác nhau theo từng nước. Hãy kiểm tra quy định nơi bạn làm việc.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "ghi-ho-so",
      title: "Ghi hồ sơ để lần sau ai sấy cũng đúng ý khách",
      blocks: [
        { p: "Khách quen thường muốn đúng kiểu sấy lần trước, kể cả khi hôm ấy người thợ quen nghỉ. Trong VaraaAi, bạn ghi vào ghi chú của khách trong [sổ khách hàng](lesson:khach-hang) ba điều: dùng lược nào, sản phẩm nào, khách thích phồng hay thích mượt. Nếu tiệm nhận cả khách chỉ đến sấy, hãy [tạo dịch vụ](lesson:dich-vu) “Chỉ sấy” với thời lượng riêng bên cạnh “Cắt + sấy”, để [lịch hẹn](lesson:lich-hen) phản ánh đúng thời gian thật của từng khách." },
      ],
    },
  ],
  howTo: {
    title: "Các bước sấy tóc phồng và vào nếp bằng lược tròn",
    id: "cac-buoc-say-tao-kieu",
    after: "bon-nguyen-tac",
    lead: "Mười bước theo đúng thứ tự trong video bài học, trên một mái tóc dài có tầng vừa gội.",
    supplies: [
      "Lược tròn, lược dẹt và kẹp đã làm sạch sau khách trước",
      "Lược răng thưa để gỡ rối",
      "Máy sấy có đầu thu gió và nút gió mát",
      "Khăn sạch",
      "Sản phẩm bảo vệ nhiệt, một chút tinh dầu hoặc serum cho ngọn tóc",
    ],
    steps: [
      {
        name: "Chuẩn bị lược, máy và ghế",
        text: "Lược tròn, lược dẹt, kẹp đều đã được làm sạch sau khách trước. Kiểm tra máy sấy: đầu thu gió gắn chắc, lưới lọc sạch, dây không gãy, không nứt. Nâng ghế khách lên vừa tầm để khuỷu tay của bạn thấp hơn vai, vì bạn sẽ giữ tư thế này suốt buổi.",
      },
      {
        name: "Thấm khô và gỡ rối",
        text: "Bọc tóc trong khăn và ép nhẹ từ chân xuống ngọn, không chà. Gỡ rối bằng lược răng thưa, bắt đầu từ ngọn, một tay giữ tóc phía trên để không kéo vào da đầu khách.",
        image: { src: img("go-roi-toc-uot-tu-ngon-len"), alt: "Thợ tóc một tay giữ phần giữa mái tóc dài ướt của khách, tay kia dùng lược chải gỡ rối phần ngọn tóc bên dưới", caption: "Tay trên giữ tóc, lược chỉ làm việc ở phần ngọn bên dưới bàn tay." },
      },
      {
        name: "Xịt bảo vệ nhiệt",
        text: "Xịt đều lên thân và ngọn tóc, cách tóc một khoảng, lượng theo hướng dẫn của sản phẩm. Ngọn tóc là phần yếu nhất nên đừng bỏ sót. Xịt xa mặt khách, rồi chải lại một lượt cho sản phẩm phủ đều.",
        image: { src: img("xit-bao-ve-nhiet-len-than-va-ngon-toc"), alt: "Thợ tóc xịt sương sản phẩm lên phần thân và ngọn mái tóc dài ẩm của khách, tay kia cầm lược đỡ bên dưới lọn tóc" },
      },
      {
        name: "Sấy sơ bằng tay",
        text: "Chưa dùng lược. Một tay cầm máy, đầu máy chĩa xuống và cách tóc một gang tay. Tay kia luồn vào chân tóc, nâng nhẹ và rũ tóc. Sấy chân tóc trước, luôn di chuyển máy, tới khi tóc khô khoảng bảy, tám phần. Để kiểm tra, luồn tay vào chân tóc ở gáy và sau tai: còn mát và ướt là chưa được, hơi ẩm và tóc đã nhẹ, tơi ra là đủ.",
        image: { src: img("say-so-toc-bang-tay-dau-may-chia-xuong"), alt: "Thợ tóc sấy sơ mái tóc dài ẩm của khách không dùng lược, một tay luồn vào chân tóc ở đỉnh đầu, tay kia cầm máy sấy chĩa xuống", caption: "Sấy sơ: chỉ có bàn tay và máy sấy, chưa có lược." },
      },
      {
        name: "Chia vùng, để lại lớp tóc ở gáy",
        text: "Kẹp hết tóc phía trên lên đỉnh đầu, chỉ để lại một lớp mỏng ở gáy, rộng vừa bằng lược. Chia gọn thì sấy nhanh và không sót lọn nào.",
        image: { src: img("chia-vung-de-lai-lop-toc-o-gay"), alt: "Mái tóc vàng dài của khách nhìn từ phía sau, phần tóc trên được kẹp gọn trên đỉnh đầu, thợ tóc cầm lược bên lớp tóc mỏng còn lại ở gáy" },
      },
      {
        name: "Sấy lớp dưới bằng lược tròn",
        text: "Đặt lược tròn dưới một lọn tóc, sát chân tóc. Đầu thu gió nằm song song với lược, chĩa xuống, cách vài phân. Kéo lược từ từ xuống ngọn với lực căng đều, máy sấy đi theo lược. Lặp lại vài lần tới khi lọn tóc khô hẳn và bóng. Tới ngọn, xoay lược vào trong một chút cho đuôi tóc cong mềm.",
        image: { src: img("luoc-tron-sat-chan-toc-dau-thu-gio-chia-xuong"), alt: "Nhìn từ phía sau, thợ tóc đặt lược tròn dưới lớp tóc ở gáy của khách, máy sấy đen có đầu thu gió chĩa xuống ngay phía trên lược", caption: "Lược sát chân tóc, đầu thu gió song song với lược và chĩa xuống." },
      },
      {
        name: "Bấm gió mát rồi mới rút lược",
        text: "Lọn tóc vừa sấy xong còn quấn trên lược, giữ yên. Bấm nút gió mát vài giây, tóc nguội rồi mới rút lược ra nhẹ nhàng. Thả lớp tóc tiếp theo xuống và làm y như vậy, đi dần lên phía đỉnh.",
      },
      {
        name: "Sấy hai bên và tóc quanh mặt",
        text: "Sấy từng lọn, kéo tóc ra phía sau, xa khuôn mặt, ngọn tóc xoay ra ngoài. Với những lọn ôm quanh mặt, đặt lược tròn ở phía trong lọn tóc, sát mặt nhưng không chạm da, rồi vừa sấy vừa xoay lược ra ngoài, về phía sau. Gần tai thì nhẹ tay và lấy tay che vành tai khách. Xong hai bên, so trong gương: độ phồng và độ cong ở ngọn phải bằng nhau.",
      },
      {
        name: "Tạo phồng ở đỉnh đầu",
        text: "Lấy lọn tóc ở đỉnh, nâng lên cao, gần như dựng thẳng, lược tròn đặt sát chân tóc. Sấy chân tóc trước, đầu máy vẫn chĩa xuống theo sợi tóc, rồi kéo lược ra ngọn. Bấm gió mát rồi mới thả. Ở đường ngôi, sấy qua trái rồi qua phải vài lần để chân tóc không nằm bẹp.",
      },
      {
        name: "Hoàn thiện",
        text: "Kiểm tra bằng tay xem tóc đã khô hẳn chưa, cả ở chân tóc và gáy. Thoa rất ít tinh dầu hay serum lên ngọn tóc, theo hướng dẫn của sản phẩm. Cho khách xem kết quả ở phía trước và hai bên, hỏi khách có muốn chỉnh gì không, rồi chỉ cho khách cách tự sấy ở nhà. Ghi vào hồ sơ khách loại lược, sản phẩm và kiểu khách thích.",
      },
    ],
  },
  faq: [
    {
      q: "Làm sao sấy tóc phồng chân tóc mà giữ được lâu?",
      a: "Nâng lọn tóc ở đỉnh lên cao, đặt lược tròn sát chân tóc và sấy chân tóc trước, đầu máy vẫn chĩa xuống. Sau đó bấm gió mát cho tóc nguội trên lược rồi mới thả. Muốn phồng hơn, cuộn lọn tóc lại, kẹp nhẹ sát đầu và đợi nguội hẳn mới tháo kẹp.",
    },
    {
      q: "Nên sấy tóc khô bao nhiêu rồi mới dùng lược tròn?",
      a: "Khoảng bảy, tám phần khô. Sấy sơ bằng tay trước thì nhanh hơn và tóc chịu ít nhiệt hơn, trong khi tóc còn hơi ẩm thì lược vẫn tạo được hình. Cách thử là luồn tay vào chân tóc ở gáy và sau tai: thấy hơi ẩm, tóc đã nhẹ và tơi ra là được.",
    },
    {
      q: "Vì sao tóc sấy xong chỉ một lúc là xẹp?",
      a: "Thường do tóc chưa khô hẳn bên trong vì lọn tóc quá dày, hoặc do rút lược khi tóc còn nóng. Hãy lấy lọn mỏng hơn, kiểm tra độ khô ở chân tóc và gáy, và bấm gió mát vài giây cho từng lọn nguội trên lược.",
    },
    {
      q: "Sấy tóc cong đuôi vào trong bằng lược tròn thế nào?",
      a: "Kéo lược tròn từ chân tóc xuống ngọn với máy sấy đi theo phía trên, đầu thu gió chĩa xuống. Khi tới ngọn, xoay lược vào trong một chút để đuôi tóc cong mềm, giữ yên và bấm gió mát trước khi rút lược.",
    },
    {
      q: "Tóc bị quấn vào lược tròn khi sấy thì gỡ thế nào?",
      a: "Tắt máy sấy, xoay lược ngược lại từ từ và gỡ từng chút một. Không giật, vì giật làm gãy tóc và gây đau. Cũng không sấy nóng thêm, vì nhiệt trên chỗ tóc đang bị kéo căng chỉ làm hại tóc hơn.",
    },
    {
      q: "Tự sấy tóc tạo kiểu tại nhà cần chú ý gì?",
      a: "Thấm khăn bằng cách ép, sấy bằng tay tới khi tóc chỉ còn hơi ẩm rồi mới dùng lược, và luôn để đầu máy chĩa xuống theo sợi tóc. Không giữ máy một chỗ quá lâu, không dí sát da đầu, và sấy cho khô hẳn ở chân tóc thì nếp mới giữ.",
    },
  ],
  related: ["say-tao-kieu-hieu-dung", "cat-nu-tang", "cat-mai", "cat-nu-bang"],
};

export default article;
