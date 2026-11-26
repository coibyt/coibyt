import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-bang/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-cat-toc-bob-bang",
  lesson: "cat-nu-bang",
  category: "hair",
  title: "Cách cắt tóc bob bằng ngang cằm: 10 bước cho đường cắt thẳng và cân",
  metaTitle: "Cách cắt tóc bob bằng ngang cằm: 10 bước từ gáy ra trước",
  metaDescription:
    "Cách cắt tóc bob bằng từng bước: chốt điểm chạm, chia vùng, đường chuẩn ở gáy với góc nâng 0°, các lớp phía sau, hai bên và vành tai, kiểm tra khi khô.",
  keyword: "cách cắt tóc bob",
  keywords: [
    "cách cắt tóc bằng",
    "cách cắt tóc ngang bằng",
    "cắt tóc bob ngang cằm",
    "cách cắt tóc ngang vai",
    "các bước cắt tóc bob",
    "cắt tóc dài thành tóc bob",
    "tóc bob bao lâu tỉa lại",
  ],
  excerpt: "Cắt một mái tóc dài thành bob bằng ngang cằm theo mười bước: đường chuẩn ở gáy, từng lớp mỏng chải thẳng xuống, hai bên, rồi kiểm tra lại khi tóc đã khô.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-toc-va-khach-voi-kieu-bob-bang-vua-cat"),
    alt: "Người thợ tóc mặc áo lụa kem đứng sau khách nữ tóc vàng vừa cắt bob bằng ngang cằm, cả hai mỉm cười trong salon kiểu Paris",
  },
  takeaways: [
    "Chốt độ dài bằng **điểm chạm** khi tóc còn khô: gập lọn tóc lên ngang cằm và nói lại cho khách nghe.",
    "Đường chuẩn là một lọn ngang thật mỏng ở gáy, chải thẳng xuống với **góc nâng 0°**, lực căng thật nhẹ.",
    "Mọi lớp sau chải phủ lên đường chuẩn và cắt đúng bằng nó. Ở xương chẩm, nâng lên một chút là thành tầng.",
    "Cắt gáy thì khách cúi nhẹ; trước khi cắt hai bên, khách **ngẩng thẳng đầu**, ngồi thẳng, không bắt chéo chân.",
    "Sấy khô rồi kiểm tra lại, vì lúc đó tóc nằm đúng như khách sẽ thấy ở nhà.",
  ],
  intro: [
    "Cách cắt tóc bob bằng không có đường kéo nào khó. Cái khó là giữ cho hàng chục lọn tóc, cắt ở những thời điểm khác nhau, cùng dừng ở một đường thẳng. Muốn vậy, người thợ dựng một đường chuẩn ở gáy rồi đưa từng lớp tóc tới đúng đường ấy, không nâng, không kéo căng.",
    "Bài viết này đi lại quy trình của bài học “Cắt tóc nữ bằng và bob: thực hành từng bước” trong khóa Nghề Tóc của VaraaAi Academy, trong đó một mái tóc dài được cắt thành bob bằng dài ngang cằm. Làm theo, bạn cắt được trọn kiểu này và tự kiểm tra được đường cắt ở cả ba phía. Vì sao phải là góc nâng 0°, vì sao khách phải ngồi thẳng, bạn đọc ở bài lý thuyết [Tóc bob là gì](lesson:cat-nu-bang-hieu-dung).",
  ],
  sections: [
    {
      id: "truoc-khi-cat",
      title: "Trước khi cắt tóc dài thành tóc bob",
      blocks: [
        { p: "Từ tóc dài xuống bob, phần tóc bị cắt đi rất dài, và có ba việc nên quyết định trước khi cầm kéo." },
        {
          ul: [
            "**Cắt bớt phần đuôi trước.** Nhiều thợ cắt bớt phần đuôi dài, để tóc còn dài hơn đường bob vài phân, cho dễ làm. Đây chưa phải đường cắt thật.",
            "**Khách có muốn giữ lại tóc không.** Nếu có, hỏi trước khi gội, buộc tóc thành đuôi và cắt khi tóc còn khô.",
            "**Tóc xoăn hay gợn sóng.** Nói trước với khách rằng khô rồi tóc co lên, nên bạn sẽ để dài hơn một chút.",
          ],
        },
        { p: "Buổi tư vấn và cách chia vùng làm như trong hai bài [Tư vấn kiểu tóc cho khách](lesson:toc-tu-van-chia-vung-hieu-dung) và [Cách chia vùng tóc khi cắt](lesson:toc-tu-van-chia-vung)." },
      ],
    },
    {
      id: "lon-mong-toc-am",
      title: "Lọn mỏng và tóc ẩm đều: hai điều kiện để cắt tóc bằng",
      blocks: [
        { p: "Đường cắt bằng dựa hoàn toàn vào việc bạn nhìn thấy đường chuẩn bên dưới lớp tóc đang cầm. Vì vậy các vùng phải được kẹp gọn, phẳng sát đầu, và mỗi lần chỉ thả xuống một lọn ngang mỏng." },
        { img: { src: img("chia-vung-toc-kep-gon-truoc-khi-cat-bob"), alt: "Nhìn từ phía sau, mái tóc vàng ẩm của khách được chia bằng những đường ngôi thẳng và kẹp gọn từng vùng bằng kẹp bạc", caption: "Các vùng tóc kẹp gọn, đường chia thẳng. Phần tóc thấp nhất ở gáy được thả ra trước." } },
        { img: { src: img("tha-lon-ngang-mong-o-gay-de-cat-duong-chuan"), alt: "Người thợ tóc đứng cạnh khách nữ có mái tóc kẹp gọn trên đầu, dùng lược đen chải thẳng lớp tóc mỏng ở gáy xuống sát cổ", caption: "Một lọn ngang mỏng ở gáy được chải thẳng xuống, phần còn lại kẹp lên hết." } },
        { p: "Các lớp phía sau dày cỡ một, hai phân. Tóc dày thì lấy lớp mỏng hơn nữa. Tóc chỉ cần ẩm đều, không nhỏ giọt; trong lúc cắt tóc khô dần thì xịt phun sương lại, để mọi lớp ở cùng một độ ẩm khi gặp lưỡi kéo." },
      ],
    },
    {
      id: "ba-loi-hay-gap",
      title: "Ba lỗi hay gặp khi cắt tóc bob",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Cách tránh"],
            rows: [
              ["Vô tình nâng tóc lên một chút, nhất là ở xương chẩm", "Đường cắt thành tầng, đuôi tóc mất độ dày", "Chải thật thẳng xuống, sát vào lớp dưới"],
              ["Kéo căng tóc qua vành tai", "Thả ra tóc bật lên, hụt một chỗ ngay trên tai", "Ở chỗ tai giữ thật nhẹ tay, để tóc rơi tự nhiên"],
              ["Đầu khách nghiêng, hoặc khách bắt chéo chân", "Hai bên lệch nhau mà thợ không biết", "Khách ngồi thẳng, đầu thẳng trước khi cắt hai bên và trước khi so"],
            ],
          },
        },
        { p: "Cả ba lỗi đều tránh được bằng cùng một thói quen: lọn mỏng, nhẹ tay, và nhìn gương thường xuyên." },
      ],
    },
    {
      id: "tia-khi-toc-kho",
      title: "Tỉa lại khi tóc đã khô: sợi lòi ra và tỉa mũi kéo",
      blocks: [
        { p: "Tóc co lên khi khô và nằm theo đường rơi thật của nó. Những sợi lòi ra khỏi đường cắt chỉ thấy rõ lúc này. Bạn chải tóc thẳng xuống, nhìn lại đường cắt và tỉa từng sợi bằng mũi kéo." },
        { img: { src: img("tia-soi-toc-loi-ra-khi-toc-bob-da-kho"), alt: "Người thợ tóc một tay cầm lược đen chải đuôi tóc bob khô của khách thẳng xuống, tay kia đưa kéo tỉa sát đường cắt ở đuôi tóc", caption: "Tóc đã khô: lược chải thẳng xuống, kéo chỉ lấy những sợi lòi ra." } },
        { p: "Tỉa mũi kéo vào đuôi tóc là việc khác, và chỉ làm khi khách muốn đuôi tóc mềm hơn. Khi đó bạn tỉa thật nhẹ ở đuôi. Khách thích bob sắc nét thì giữ nguyên đường cắt bằng." },
      ],
    },
    {
      id: "an-toan-ve-sinh",
      title: "An toàn và vệ sinh khi cắt sát cổ",
      blocks: [
        { note: "Ngón tay luôn nằm giữa lưỡi kéo và da khách, nhất là khi cắt đường chuẩn sát cổ. Chỉ cắt tới độ dài đã thống nhất với khách. Kéo, lược và kẹp được làm sạch, khử khuẩn sau mỗi khách theo hướng dẫn của sản phẩm; dải giấy cổ dùng một lần. Quy định khác nhau theo từng nước, xem thêm bài [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu).", kind: "warn", title: "Không bỏ qua" },
        { p: "Tên gọi và cách dạy kiểu bob khác nhau giữa các trường và các nước. Bài viết là tài liệu luyện tập, không thay cho bằng nghề." },
      ],
    },
    {
      id: "hen-tia-lai",
      title: "Tóc bob bao lâu tỉa lại, và ghi gì vào hồ sơ khách",
      blocks: [
        { p: "Nhiều khách quay lại tỉa sau khoảng 6–8 tuần để giữ đường cắt. Đó là thói quen phổ biến, không phải quy định. Trước khi khách về, bạn chỉ cho khách cách sấy ở nhà: sấy theo chiều tóc rơi, cuộn nhẹ đuôi vào trong." },
        { p: "Trong VaraaAi, bạn ghi độ dài đã cắt và điểm chạm vào ghi chú của khách trong [sổ khách hàng](lesson:khach-hang), để lần sau ai làm cũng cắt đúng. Lúc khách thanh toán, hãy gợi ý đặt luôn lần tỉa lại trên [lịch hẹn](lesson:lich-hen). Nếu tiệm tính riêng giữa cắt mới và tỉa lại, hai mục ấy nên có thời lượng riêng trong [menu dịch vụ](lesson:dich-vu)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước cắt tóc bob bằng ngang cằm",
    id: "cac-buoc-cat-toc-bob",
    after: "truoc-khi-cat",
    lead: "Mười bước theo đúng thứ tự của video bài học: phía sau trước, hai bên sau, và kiểm tra hai lần, một lần khi ướt, một lần khi khô.",
    supplies: [
      "Kéo cắt, lược cắt và lược đuôi nhọn, đã làm sạch và khử khuẩn",
      "Kẹp chia vùng",
      "Bình phun sương và khăn",
      "Máy sấy và lược tròn",
      "Dải giấy cổ dùng một lần và áo choàng",
      "Gương tay",
    ],
    steps: [
      {
        name: "Rửa tay và quấn giấy cổ",
        text: "Rửa tay. Kéo, lược và kẹp đều đã được làm sạch, khử khuẩn sau khách trước. Quấn dải giấy cổ dùng một lần quanh cổ khách, rồi mới cài áo choàng lên trên.",
        image: { src: img("quan-giay-co-truoc-khi-cat-toc-bob"), alt: "Người thợ tóc cài áo choàng đen quanh cổ khách nữ tóc vàng, bên trong cổ áo là một dải giấy trắng quấn sát cổ" },
      },
      {
        name: "Tư vấn và chốt điểm chạm",
        text: "Tư vấn khi tóc còn khô: xem ảnh mẫu, hỏi khách có hay buộc tóc hay vén tóc sau tai không. Gập một lọn tóc lên ngang cằm và nói lại độ dài cho khách nghe. Nhìn chân tóc ở gáy để tìm xoáy, nhìn cổ và vai của khách.",
      },
      {
        name: "Gội, gỡ rối và giữ tóc ẩm đều",
        text: "Gội, thấm khô bằng khăn và gỡ rối từ ngọn lên. Tóc chỉ cần ẩm đều, không nhỏ giọt. Nếu tóc rất dài, cắt bớt phần đuôi trước, để còn dài hơn đường bob vài phân.",
      },
      {
        name: "Rẽ ngôi giữa và chia vùng",
        text: "Rẽ ngôi giữa từ chân tóc trán tới đỉnh đầu, rồi chia các vùng và kẹp gọn từng vùng, phẳng sát đầu. Ở phía sau, thả ra một lọn ngang thật mỏng ở gáy. Phần còn lại kẹp lên hết.",
        image: { src: img("re-ngoi-giua-bang-duoi-luoc-truoc-khi-chia-vung"), alt: "Nhìn từ trên xuống, người thợ tóc dùng đuôi nhọn của cây lược kẻ một đường ngôi giữa trên mái tóc vàng ẩm của khách", caption: "Đường ngôi giữa kẻ bằng đuôi lược, từ chân tóc trán ra đỉnh đầu." },
      },
      {
        name: "Cắt đường chuẩn ở gáy",
        text: "Cho khách cúi đầu nhẹ, cằm hơi hạ xuống, và giữ yên. Chải lọn tóc thẳng xuống sát cổ, góc nâng 0°, kẹp giữa ngón trỏ và ngón giữa nằm ngang với lực căng thật nhẹ. Cắt một đường thẳng ngang ngay dưới ngón tay, phần giữa trước rồi sang hai bên theo đúng phần giữa. Với bob ngang cằm, đường ở gáy thường nằm quanh giữa cổ hoặc thấp hơn, tùy dáng đã thống nhất. Cắt xong nhìn lại ngay: hai đầu bằng nhau, đường cắt song song với sàn.",
        image: { src: img("cat-duong-chuan-o-gay-goc-nang-0-do"), alt: "Cận cảnh gáy khách nữ: bàn tay người thợ kẹp phẳng một lọn tóc mỏng sát cổ giữa hai ngón tay, kéo cắt ngang ngay dưới ngón tay", caption: "Ngón tay nằm ngang, giữ tóc sát cổ. Lưỡi kéo song song với ngón tay và ở phía dưới." },
      },
      {
        name: "Cắt các lớp phía sau",
        text: "Thả lọn ngang tiếp theo xuống, chải thẳng cho phủ lên đường chuẩn. Nhìn qua lớp tóc mỏng để thấy đường chuẩn bên dưới và cắt đúng bằng nó, không nâng, không kéo căng. Làm từng lớp lên tới xương chẩm rồi tới đỉnh đầu, khách giữ nguyên tư thế đầu. Ở xương chẩm đầu tròn ra, tóc dễ bị kéo ra ngoài theo dáng đầu, nên chải thật thẳng xuống, sát vào lớp dưới.",
      },
      {
        name: "Cắt hai bên",
        text: "Cho khách ngẩng thẳng đầu lại, ngồi thẳng, không bắt chéo chân. Thả lọn ngang thấp nhất ở bên tai, chải xuống, lấy kèm một chút tóc đã cắt ở phía sau làm chuẩn và nối đường cắt ra phía trước, ngang cằm. Ở chỗ tai không kéo căng tóc qua vành tai. Làm từng lớp lên tới đường ngôi, rồi làm y như vậy ở bên kia.",
        image: { src: img("cat-hai-ben-toc-bob-ngang-cam"), alt: "Khách nữ ngồi thẳng, nhìn nghiêng, tóc vàng ẩm chải thẳng xuống; người thợ giữ nhẹ lớp tóc bên và đưa kéo cắt ngang ở độ cao của cằm", caption: "Đầu khách thẳng, tóc bên rơi tự nhiên, đường cắt nối từ phía sau ra trước." },
      },
      {
        name: "Kiểm tra hai bên và phía sau",
        text: "Đứng sau khách và nhìn vào gương, đầu khách thẳng, mắt nhìn thẳng. Cầm hai đuôi tóc ở hai bên cằm để so độ cao; bên nào dài hơn thì tỉa lại từng chút một. Chải tóc thẳng xuống, nhìn từ phía sau và nhìn nghiêng từng bên: đường cắt phải thẳng, liền một mạch, song song với sàn. Ngay sau tai, chỗ phía sau gặp hai bên, hay có một góc nhỏ; tỉa nhẹ cho đường cắt liền lại.",
        image: { src: img("toc-bob-bang-nhin-nghieng-song-song-voi-san"), alt: "Khách nữ tóc vàng nhìn nghiêng, đầu thẳng, mái tóc cắt bằng có đường đuôi tóc chạy ngang đều từ gáy ra phía trước", caption: "Nhìn nghiêng: đường đuôi tóc chạy ngang, song song với sàn, không có bậc sau tai." },
      },
      {
        name: "Sấy và kiểm tra khi khô",
        text: "Sấy theo chiều tóc rơi, từ trên xuống, dùng lược tròn cuộn nhẹ đuôi tóc vào trong. Khi tóc khô, chải thẳng xuống và nhìn lại đường cắt. Sợi nào lòi ra thì tỉa bằng mũi kéo; khách muốn đuôi tóc mềm hơn thì tỉa mũi kéo thật nhẹ ở đuôi.",
        image: { src: img("say-toc-bob-bang-luoc-tron-cuon-duoi-vao-trong"), alt: "Người thợ tóc cầm máy sấy đen và lược tròn sấy mái tóc bob vàng của khách nữ, đuôi tóc cuộn nhẹ quanh lược" },
      },
      {
        name: "Hoàn thiện, ghi hồ sơ và dọn dẹp",
        text: "Phủi sạch tóc vụn trên cổ và cho khách xem phía sau bằng gương tay. Hỏi khách có muốn chỉnh gì không và chỉnh ngay lúc ấy, rồi chỉ cho khách cách sấy ở nhà. Ghi độ dài đã cắt vào hồ sơ khách. Khách về thì làm sạch, khử khuẩn kéo, lược và kẹp, bỏ dải giấy cổ và quét sạch tóc dưới ghế.",
      },
    ],
  },
  faq: [
    {
      q: "Cắt tóc bob bắt đầu từ đâu?",
      a: "Bắt đầu ở gáy. Sau khi chia vùng, thợ thả một lọn ngang thật mỏng ở gáy, chải thẳng xuống với góc nâng 0° và cắt một đường thẳng ngang: đó là đường chuẩn. Các lớp phía sau, rồi hai bên, đều được cắt đúng bằng đường này.",
    },
    {
      q: "Cắt tóc bằng nên để tóc ướt hay khô?",
      a: "Trong quy trình của bài học, tóc được gội và giữ ẩm đều, không nhỏ giọt; khô dần thì xịt phun sương lại. Sau khi sấy khô, đường cắt được kiểm tra thêm một lần nữa, vì tóc co lên khi khô và những sợi lòi ra chỉ thấy rõ lúc ấy. Tóc xoăn hay gợn sóng co nhiều hơn nên cần để dài hơn một chút.",
    },
    {
      q: "Cách cắt tóc bằng ngang vai có khác cắt bob ngang cằm không?",
      a: "Kỹ thuật cắt bằng giống nhau: một đường chuẩn ở gáy, các lớp chải thẳng xuống với góc nâng 0° và cắt đúng bằng nó. Chỗ khác là điểm chạm đã thống nhất với khách. Cần lưu ý rằng tóc dừng ngay trên vai sẽ chạm vai và bật ra, nên thường chọn cao hơn vai hoặc dài hẳn qua vai.",
    },
    {
      q: "Vì sao cắt bob xong bị hụt một chỗ trên tai?",
      a: "Vì tóc bị kéo căng qua vành tai khi cắt. Tai nhô ra, nên khi thả tay tóc bật lên và ngắn hơn phần còn lại. Ở chỗ tai, hãy giữ thật nhẹ tay và để tóc rơi tự nhiên rồi mới cắt.",
    },
    {
      q: "Khách muốn giữ lại phần tóc dài cắt đi thì làm thế nào?",
      a: "Hỏi khách trước khi gội. Nếu khách muốn giữ, buộc tóc thành đuôi và cắt khi tóc còn khô, sau đó mới gội và cắt đường bob. Phần đuôi nên cắt ở mức dài hơn đường bob vài phân, vì đường cắt thật được làm sau.",
    },
    {
      q: "Tóc bob bao lâu thì tỉa lại?",
      a: "Nhiều khách quay lại tỉa sau khoảng 6–8 tuần để giữ đường cắt. Đây là thói quen phổ biến chứ không phải quy định, và tùy mỗi người muốn đường bob sắc nét tới đâu.",
    },
  ],
  related: ["cat-nu-bang-hieu-dung", "toc-tu-van-chia-vung", "cat-nu-tang", "say-tao-kieu"],
};

export default article;
