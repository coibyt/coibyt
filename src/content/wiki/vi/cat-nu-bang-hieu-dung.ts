import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-bang-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "toc-bob-la-gi-cac-kieu-bob",
  lesson: "cat-nu-bang-hieu-dung",
  category: "hair",
  title: "Tóc bob là gì? Bob bằng, bob chữ A, bob xếp tầng và vì sao đường cắt hay lệch",
  metaTitle: "Tóc bob là gì? Bob bằng, bob chữ A và bob xếp tầng",
  metaDescription:
    "Tóc bob là gì, cắt tóc bằng là gì, ba dáng bob hay gặp, cách chọn độ dài theo cổ, gáy và vai, góc nâng 0°, đường chuẩn ở gáy và lý do tóc bob bị lệch, bị vểnh.",
  keyword: "tóc bob là gì",
  keywords: [
    "cắt tóc bằng là gì",
    "các kiểu tóc bob",
    "bob chữ A là gì",
    "tóc bob xếp tầng",
    "tóc ngang vai bị vểnh đuôi",
    "tóc xoăn cắt bob",
    "vì sao tóc bob bị lệch",
  ],
  excerpt: "Tóc bob chỉ có một đường cắt, nên lệch một chút là thấy ngay. Bài này giải thích cắt bằng, ba dáng bob và những chi tiết nhỏ giữ cho đường cắt thẳng và cân.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("toc-bob-bang-ngang-cam-duong-cat-thang"),
    alt: "Khách nữ tóc vàng mật ong ngồi cạnh gương bầu dục viền vàng với kiểu bob bằng rẽ ngôi giữa, đuôi tóc thẳng ngang ngay dưới cằm",
  },
  takeaways: [
    "Cắt bằng nghĩa là mọi sợi tóc, khi rơi tự nhiên, dừng ở **cùng một đường**. Ngắn tới quanh cằm thường gọi là bob.",
    "Thống nhất độ dài bằng **điểm chạm** trên người khách, ví dụ ngang cằm, không bằng chữ “ngắn” hay “ít”.",
    "Tóc bằng cắt theo đường rơi tự nhiên, **góc nâng 0°**, lực căng nhẹ và đều. Nâng lên một chút là thành tầng.",
    "Tóc dừng ngay trên vai sẽ chạm vai và bật ra. Chọn cao hơn vai hoặc dài hẳn qua vai.",
    "Ở chỗ vành tai không kéo căng tóc, và luôn chỉnh đầu khách thẳng trước khi so hai bên.",
  ],
  intro: [
    "Tóc bob là gì? Đó là kiểu tóc cắt bằng với độ dài ngắn tới quanh cằm: tất cả tóc rơi về cùng một đường, không tầng, không lớp. Nghe thì giống kiểu cắt dễ nhất. Nhưng chính vì chỉ có một đường, nên lệch một chút thôi là khách nhìn gương thấy ngay.",
    "Bài viết này đi theo bài học “Cắt tóc nữ bằng và bob: hiểu đúng để đường cắt thẳng và cân” trong khóa Nghề Tóc của VaraaAi Academy, là phần lý thuyết của chủ đề. Đọc xong, bạn phân biệt được ba dáng bob, biết tư vấn độ dài theo cổ, gáy và vai của khách, và hiểu những chi tiết nhỏ quyết định đường cắt: góc nâng, lực căng, đường chuẩn, tư thế đầu. Phần cắt từng bước nằm ở bài [Cách cắt tóc bob bằng ngang cằm](lesson:cat-nu-bang).",
  ],
  sections: [
    {
      id: "cat-bang-la-gi",
      title: "Cắt tóc bằng là gì, và khi nào gọi là tóc bob",
      blocks: [
        { p: "Cắt bằng nghĩa là mọi sợi tóc, khi rơi tự nhiên, đều dừng ở cùng một đường. Đường ấy có thể nằm ngang vai, ngang xương quai xanh, hay ngắn tới quanh cằm. Khi ngắn tới quanh cằm, người ta thường gọi là tóc bob." },
        { p: "Một đường cắt bằng đúng có ba dấu hiệu. Nhìn từ phía sau, đường cắt thẳng ngang. Nhìn nghiêng, nó song song với sàn nhà. Và đuôi tóc dày, nặng, bóng, vì mọi sợi cùng kết thúc ở một chỗ." },
        { img: { src: img("toc-bob-bang-nhin-tu-phia-sau-duong-cat-ngang"), alt: "Mái tóc bob vàng mật ong nhìn thẳng từ phía sau, đuôi tóc tạo thành một đường ngang thẳng giữa cổ, phía dưới là cổ áo choàng đen", caption: "Nhìn từ phía sau: một đường thẳng ngang, đuôi tóc dày và đều." } },
      ],
    },
    {
      id: "cac-kieu-toc-bob",
      title: "Các kiểu tóc bob: bob bằng, bob chữ A và bob xếp tầng",
      blocks: [
        { p: "Có ba dáng bob hay gặp trong tiệm. Bob bằng là nền của hai dáng còn lại, nên người học thường bắt đầu từ nó." },
        {
          table: {
            head: ["Dáng bob", "Đường cắt", "Trông thế nào"],
            rows: [
              ["Bob bằng", "Một đường ngang đều quanh đầu", "Gọn, sắc nét, đuôi tóc dày"],
              ["Bob chữ A", "Một đường chéo: phía sau ngắn hơn, dài dần ra phía trước mặt", "Nhìn nghiêng thấy đuôi tóc dốc xuống về phía cằm"],
              ["Bob xếp tầng", "Phần gáy được cắt với một góc nâng nhỏ, tóc chồng lên nhau", "Phồng tròn ở phía sau đầu"],
            ],
          },
        },
        { img: { src: img("toc-bob-chu-a-sau-ngan-truoc-dai"), alt: "Khách nữ tóc nâu sẫm có mái bằng, nhìn nghiêng, với kiểu bob chữ A: phía sau ngắn sát gáy, tóc dài dần xuống phía cằm", caption: "Bob chữ A: đường cắt chéo, sau ngắn, trước dài." } },
        { img: { src: img("toc-bob-xep-tang-phong-o-gay"), alt: "Khách nữ tóc vàng nhìn nghiêng với kiểu bob xếp tầng: tóc ở gáy cắt ngắn chồng lớp, tạo độ phồng tròn phía sau đầu", caption: "Bob xếp tầng: gáy có tầng, phía sau đầu phồng tròn." } },
        { note: "Tên gọi các dáng bob và cách dạy khác nhau giữa các trường và các nước. Khi khách nói tên một kiểu, hãy xem ảnh mẫu cùng khách thay vì tin vào tên gọi. Bài này là tài liệu luyện tập, không thay cho bằng nghề.", kind: "info", title: "Tên gọi mỗi nơi một khác" },
      ],
    },
    {
      id: "chon-do-dai",
      title: "Chọn độ dài tóc bob: điểm chạm, cổ, xoáy ở gáy và vai",
      blocks: [
        { p: "Từ tóc dài xuống bob là một thay đổi rất lớn, nên độ dài phải được thống nhất thật rõ. Bạn cầm lọn tóc, gập lên đúng chỗ và hỏi: mình cắt đến đây, ngang cằm, đúng không chị. Cách thống nhất bằng điểm chạm này được nói kỹ trong bài [Tư vấn kiểu tóc cho khách](lesson:toc-tu-van-chia-vung-hieu-dung)." },
        { img: { src: img("thong-nhat-do-dai-toc-bob-bang-diem-cham-ngang-cam"), alt: "Người thợ tóc đưa bàn tay nằm ngang ở ngay dưới cằm của khách nữ tóc dài để chỉ độ dài sẽ cắt, khách mỉm cười", caption: "Điểm chạm ngang cằm: chỉ thẳng lên người khách, không nói “ngắn” hay “ít”." } },
        { p: "Hỏi thêm khách có hay buộc tóc, hay vén tóc sau tai không. Bob ngắn tới cằm thì gần như không buộc được nữa, và khách cần biết điều đó trước khi cắt. Sau đó bạn đọc dáng người:" },
        {
          ul: [
            "**Cổ dài hay cổ ngắn.** Đường bob dừng ở đâu trên cổ thì mắt người nhìn dừng ở đó.",
            "**Xoáy ở gáy.** Nếu chân tóc ở gáy mọc ngược lên, đường bob quá ngắn ở gáy dễ bị vểnh. Hãy để đường cắt thấp hơn chỗ xoáy, hoặc dài hơn một chút.",
            "**Vai.** Tóc dừng ngay trên vai thì mỗi lần khách cử động, đuôi tóc chạm vai và bật ra ngoài. Nên chọn cao hơn vai, hoặc dài hẳn qua vai.",
          ],
        },
        { img: { src: img("xoay-o-chan-toc-gay-truoc-khi-cat-bob"), alt: "Người thợ tóc dùng một tay nâng toàn bộ mái tóc vàng của khách lên cao, để lộ gáy và chân tóc ở gáy", caption: "Nâng tóc lên để nhìn chân tóc ở gáy trước khi quyết định đường bob nằm ở đâu." } },
      ],
    },
    {
      id: "goc-nang-luc-cang",
      title: "Góc nâng 0° và lực căng: vì sao tóc bằng phải chải thẳng xuống",
      blocks: [
        { p: "Tóc bằng được cắt theo đường rơi tự nhiên. Bạn chải tóc thẳng xuống, đúng chỗ nó rơi, với góc nâng 0°, tức là không nâng tóc lên chút nào. Chỉ cần nâng lên một chút, các lớp tóc sẽ có độ dài khác nhau khi thả xuống và đường cắt thành tầng. Góc nâng tạo ra tầng như thế nào được giải thích ở bài [Cắt tóc tầng là gì](lesson:cat-nu-tang-hieu-dung)." },
        { p: "Lực căng cũng phải nhẹ và đều. Kéo căng quá, nhất là khi tóc ướt, thì khô rồi tóc co lên, ngắn hơn dự định và lệch." },
        { h3: "Tóc ướt, tóc khô và tóc xoăn" },
        { p: "Tóc thẳng khi khô cũng co lên một chút. Tóc gợn sóng và tóc xoăn co nhiều hơn hẳn. Vì vậy với tóc xoăn, thợ để dài hơn ý định, hoặc cắt khi tóc khô theo kỹ thuật mình đã học." },
        { img: { src: img("toc-xoan-khi-uot-keo-thang-dai-qua-vai"), alt: "Khách nữ tóc xoăn màu hạt dẻ đang ướt, người thợ kéo thẳng một lọn tóc xuống, lọn tóc dài quá vai", caption: "Tóc xoăn lúc ướt: kéo thẳng thì dài qua vai." } },
        { img: { src: img("toc-xoan-khi-kho-co-len-ngan-hon"), alt: "Cũng khách nữ ấy khi tóc đã khô: các lọn xoăn nâu bồng lên quanh cằm và vai, người thợ nâng nhẹ một lọn xoăn bằng đầu ngón tay", caption: "Cùng mái tóc khi khô: lọn xoăn co lên, ngắn hơn hẳn so với lúc ướt." } },
      ],
    },
    {
      id: "duong-chuan-tu-the-dau",
      title: "Đường chuẩn cố định ở gáy và tư thế đầu của khách",
      blocks: [
        { p: "Sau khi chia vùng sạch và thẳng, thợ bắt đầu ở gáy với một lọn ngang thật mỏng. Đó là **đường chuẩn**. Mọi lớp tóc sau đều được chải thẳng xuống và cắt đúng bằng nó. Đường chuẩn đứng yên một chỗ, các lớp khác đi tới nó, nên người ta gọi là đường chuẩn cố định." },
        { img: { src: img("lop-toc-chai-thang-xuong-phu-len-duong-chuan-o-gay"), alt: "Nhìn từ phía sau, tóc khách được kẹp gọn lên cao, người thợ dùng lược đen giữ một lớp tóc mỏng chải thẳng xuống gáy, đuôi tóc cắt ngang", caption: "Lớp tóc mỏng chải thẳng xuống gáy. Lọn mỏng thì nhìn thấy rõ đường chuẩn bên dưới." } },
        { p: "Lọn phải mỏng vì bạn cần nhìn thấy đường chuẩn qua lớp tóc. Lọn dày quá là đoán mò." },
        { h3: "Cúi đầu khi cắt gáy, ngẩng thẳng khi cắt hai bên" },
        { p: "Khi cắt gáy, khách cúi đầu nhẹ, cằm hơi hạ xuống. Gáy phẳng ra, tóc ôm sát cổ và đường cắt dễ nhìn. Nhưng cúi nhiều hay ít thì khi khách ngẩng lên, đường cắt cũng đổi theo. Vì vậy khách cúi vừa phải và giữ nguyên tư thế ấy cho tới hết phần sau." },
        { p: "Trước khi sang hai bên, cho khách ngẩng thẳng đầu lại, ngồi thẳng, không bắt chéo chân. Vai lệch hay đầu lệch thì đường cắt cũng lệch." },
        { h3: "Vành tai" },
        { p: "Tai nhô ra và đẩy tóc ra ngoài. Nếu kéo căng tóc qua tai rồi cắt, khi thả ra tóc bị vành tai đẩy lên, thành một chỗ hụt ngay trên tai. Ở chỗ tai, bạn chải cho tóc rơi tự nhiên, giữ thật nhẹ tay, không kéo căng. Có thợ để lược đỡ tóc sát da rồi mới cắt." },
      ],
    },
    {
      id: "vi-sao-bob-bi-lech",
      title: "Vì sao tóc bob bị lệch, bị vểnh, và cách kiểm tra",
      blocks: [
        {
          table: {
            head: ["Hiện tượng", "Nguyên nhân", "Cách tránh"],
            rows: [
              ["Đường cắt thành tầng, đuôi tóc mỏng", "Vô tình nâng tóc lên khi cắt", "Chải thẳng xuống, góc nâng 0°"],
              ["Khô rồi tóc ngắn hơn và lệch", "Kéo căng tóc ướt", "Lực căng nhẹ và đều; tóc xoăn để dài hơn ý định"],
              ["Hụt một chỗ ngay trên tai", "Kéo căng tóc qua vành tai", "Để tóc rơi tự nhiên ở chỗ tai, giữ thật nhẹ tay"],
              ["Hai bên dài ngắn khác nhau", "Đầu khách nghiêng, vai lệch, khách bắt chéo chân", "Khách ngồi thẳng, đầu thẳng trước khi cắt hai bên"],
              ["Đuôi tóc vểnh ở gáy", "Có xoáy ở gáy, đường bob quá ngắn", "Để đường cắt thấp hơn chỗ xoáy"],
              ["Đuôi tóc bật ra ngoài", "Tóc dừng ngay trên vai", "Chọn cao hơn vai hoặc dài hẳn qua vai"],
            ],
          },
        },
        { p: "Kiểm tra là việc của cả buổi, không phải chỉ cuối buổi. Xong mỗi bên, bạn so hai bên trong gương: cầm hai đuôi tóc trước mặt khách ở cùng một độ cao. Sau đó nhìn từ phía sau và nhìn nghiêng từng bên. Đường cắt phải liền một mạch, không có góc, không có bậc." },
        { img: { src: img("so-hai-duoi-toc-bob-truoc-mat-khach"), alt: "Người thợ đứng sau khách nữ đang nhìn thẳng, hai tay cầm hai đuôi tóc bob ở hai bên cằm khách để so độ dài", caption: "Đầu khách thẳng, mắt nhìn thẳng, hai đuôi tóc được so ở cùng một độ cao." } },
        { note: "Đầu khách nghiêng một chút là hai bên trông lệch dù bạn cắt đúng. Luôn chỉnh đầu khách thẳng trước khi so.", kind: "tip", title: "Kinh nghiệm trong nghề" },
        { p: "Sấy khô xong, kiểm tra lại một lần nữa, vì lúc này tóc nằm đúng như khách sẽ thấy ở nhà. Vài sợi lòi ra thì tỉa nhẹ bằng mũi kéo. Nếu khách thích đuôi tóc mềm hơn, thợ tỉa mũi kéo: dựng mũi kéo lên và cắt những vết nhỏ vào đuôi tóc, để đường cắt bớt cứng mà vẫn giữ dáng. Khách thích bob sắc nét thì giữ đường cắt bằng, đừng tỉa." },
      ],
    },
    {
      id: "an-toan-ghi-ho-so",
      title: "An toàn, vệ sinh và ghi lại độ dài cho lần sau",
      blocks: [
        { note: "Khi cắt sát cổ, ngón tay luôn nằm giữa lưỡi kéo và da khách, và không bao giờ chĩa mũi kéo về phía mặt khách. Kéo, lược, kẹp được làm sạch và khử khuẩn sau mỗi khách theo hướng dẫn của sản phẩm; dải giấy cổ chỉ dùng một lần. Quy định khác nhau theo từng nước, xem thêm bài [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu).", kind: "warn", title: "An toàn khi cắt sát cổ" },
        { p: "Một đường bob đẹp không nhờ cây kéo đắt tiền. Nó nhờ những lọn mỏng, lực căng nhẹ, tư thế đầu đúng và nhiều lần kiểm tra. Trong VaraaAi, bạn ghi độ dài đã cắt và điểm chạm vào [sổ khách hàng](lesson:khach-hang), để lần sau ai làm cũng cắt đúng. Nếu tiệm có cả cắt bob lẫn tỉa lại đường bob, hãy tách thành hai mục với thời lượng riêng trong [menu dịch vụ](lesson:dich-vu), và ghi lần tỉa sau lên [lịch hẹn](lesson:lich-hen) của tiệm ngay khi khách còn ở quầy." },
      ],
    },
  ],
  faq: [
    {
      q: "Tóc bob là gì?",
      a: "Tóc bob là kiểu tóc cắt bằng có độ dài ngắn tới quanh cằm. Cắt bằng nghĩa là mọi sợi tóc, khi rơi tự nhiên, dừng ở cùng một đường, không có tầng. Nhìn từ phía sau đường cắt thẳng ngang, nhìn nghiêng thì song song với sàn nhà.",
    },
    {
      q: "Bob bằng, bob chữ A và bob xếp tầng khác nhau thế nào?",
      a: "Bob bằng có đường cắt ngang đều quanh đầu. Bob chữ A có đường cắt chéo: phía sau ngắn hơn và dài dần ra phía trước mặt. Bob xếp tầng có phần gáy được cắt với một góc nâng nhỏ, tóc chồng lên nhau và tạo độ phồng tròn ở phía sau đầu. Tên gọi có thể khác nhau tùy nơi.",
    },
    {
      q: "Vì sao tóc ngang vai hay bị vểnh đuôi ra ngoài?",
      a: "Vì đuôi tóc dừng ngay trên vai. Mỗi lần cử động, đuôi tóc chạm vai và bật ra ngoài. Khi cắt bằng, nên chọn độ dài cao hơn vai hoặc dài hẳn qua vai.",
    },
    {
      q: "Tóc xoăn có cắt bob được không?",
      a: "Được, nhưng phải tính tới độ co. Tóc gợn sóng và tóc xoăn co lên khi khô nhiều hơn hẳn tóc thẳng, nên thợ để dài hơn ý định, hoặc cắt khi tóc khô theo kỹ thuật đã học. Điều này cần được nói với khách ngay từ lúc tư vấn.",
    },
    {
      q: "Cắt tóc bob rồi có buộc tóc được không?",
      a: "Bob ngắn tới cằm thì gần như không buộc được nữa. Vì vậy trước khi cắt, thợ nên hỏi khách có hay buộc tóc hoặc vén tóc sau tai không, rồi mới thống nhất độ dài.",
    },
    {
      q: "Vì sao cắt tóc bằng mà hai bên vẫn bị lệch?",
      a: "Nguyên nhân hay gặp là tư thế: đầu khách nghiêng, vai lệch hoặc khách bắt chéo chân khi cắt hai bên. Kéo căng tóc ướt hoặc kéo căng tóc qua vành tai cũng làm tóc ngắn đi khi thả ra. Cách tránh là cho khách ngồi thẳng, giữ lực căng nhẹ và so hai đuôi tóc trước mặt với đầu khách thẳng.",
    },
  ],
  related: ["cat-nu-bang", "toc-tu-van-chia-vung-hieu-dung", "cat-nu-tang-hieu-dung", "cat-mai-hieu-dung"],
};

export default article;
