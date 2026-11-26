import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-mai/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-cat-toc-mai-bay",
  lesson: "cat-mai",
  category: "hair",
  title: "Cách cắt tóc mái bay: 10 bước cắt mái rèm rẽ giữa và tỉa tóc ôm mặt",
  metaTitle: "Cách cắt tóc mái bay: 10 bước không lo cắt hụt",
  metaDescription:
    "Hướng dẫn cách cắt tóc mái bay rẽ giữa từng bước: chia vùng tam giác, đường cắt đầu tiên thật dài, cắt chéo hai nửa mái, tỉa tóc ôm mặt, sấy và chỉnh khi tóc khô.",
  keyword: "cách cắt tóc mái bay",
  keywords: [
    "cách cắt mái rèm",
    "các bước cắt mái bay",
    "cách tỉa mái bay",
    "cách tỉa tóc ôm mặt",
    "cách sấy mái bay",
    "cắt mái bay cho người mới",
    "chia tóc cắt mái",
  ],
  excerpt: "Mười bước cắt một cái mái bay rẽ giữa cho khách tóc dài: cắt thật dài khi tóc ẩm, tạo đường chéo, sấy, rồi mới chỉnh tới độ dài đã hẹn khi tóc khô.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("kiem-tra-hai-ben-mai-bay-co-can-khong"),
    alt: "Thợ tóc đứng sau khách nữ tóc vàng dài, hai tay cầm hai đầu mái bay ở ngang gò má để so độ dài hai bên",
  },
  takeaways: [
    "Đường cắt đầu tiên **thật dài**, ngang đầu mũi. Tóc ẩm khô rồi sẽ co lên, nên chưa cắt tới độ dài đã hẹn.",
    "Chải mái xuống **không kéo căng**, ngón tay chỉ đỡ hờ.",
    "Mỗi nửa mái bay cắt theo một **đường chéo** từ giữa trán ra gò má. Tóc ôm quanh mặt nối tiếp đường chéo ấy.",
    "Sấy mái trước, rồi mới chỉnh độ dài khi tóc khô, mỗi lần vài li.",
    "Khách nhắm mắt khi cắt quanh mặt. Mũi kéo chĩa sang bên, xuống hay ra ngoài, không bao giờ về phía mắt.",
  ],
  intro: [
    "Cách cắt tóc mái bay trong bài này gồm hai lần cắt chứ không phải một: lần đầu khi tóc ẩm, cố ý để dài, và lần sau khi tóc đã sấy khô, mới đưa mái về đúng độ dài đã hẹn với khách. Giữa hai lần ấy là đường chéo tạo ra dáng mái bay, còn gọi là mái rèm: ngắn nhất ở giữa trán, dài dần ra hai gò má.",
    "Bài viết đi theo bài học “Cắt mái bay và tỉa quanh mặt: thực hành từng bước” trong khóa Nghề Tóc của VaraaAi Academy, cắt trên một khách tóc dài. Làm theo mười bước, bạn cắt được mái bay rẽ giữa và phần tóc ôm quanh mặt nối liền với nó. Nếu bạn còn phân vân nên chọn kiểu mái nào cho khách, hoặc muốn hiểu vì sao mái hay bị ngắn hơn ý muốn, hãy đọc bài lý thuyết [Các kiểu tóc mái](lesson:cat-mai-hieu-dung).",
  ],
  sections: [
    {
      id: "hinh-dang-va-hai-lan-cat",
      title: "Mái bay rẽ giữa: hình dáng cần đạt và quy tắc hai lần cắt",
      blocks: [
        { p: "Trước khi cầm kéo, hãy hình dung kết quả. Mái rẽ đôi ở chính giữa. Chỗ ngắn nhất nằm giữa trán, thường chạm lông mày hay dưới lông mày một chút. Từ đó tóc dài dần theo đường chéo ra tới gò má, rồi nối vào những lọn ôm quanh mặt xuống cằm hay xương quai xanh. Phần tóc dài phía sau gần như không đổi." },
        {
          table: {
            head: ["Lần cắt", "Tóc lúc đó", "Cắt tới đâu"],
            rows: [
              ["Đường cắt đầu tiên", "Ẩm nhẹ", "Ngang đầu mũi. Đây chỉ là độ dài tạm thời"],
              ["Tạo đường chéo hai nửa mái", "Ẩm nhẹ", "Từ giữa trán xuôi ra gò má"],
              ["Chỉnh sau khi sấy", "Khô", "Ngắn dần tới độ dài đã hẹn, mỗi lần vài li"],
            ],
          },
        },
        { p: "Lý do của thứ tự này rất đơn giản: tóc ẩm sẽ co lên khi khô. Cắt dài trước rồi chỉnh khi khô thì không bao giờ bị hụt." },
        { note: "Cách cắt mái khác nhau giữa các trường và các nước. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Trước khi bắt đầu" },
      ],
    },
    {
      id: "ba-loi-hay-gap",
      title: "Ba lỗi hay gặp khi cắt mái bay",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Chuyện gì xảy ra", "Cách tránh"],
            rows: [
              ["Kéo căng mái xuống rồi cắt", "Thả ra, mái nhảy lên và ngắn hơn mình muốn", "Chải xuống không căng, ngón tay chỉ đỡ hờ"],
              ["Cắt khi khách nghiêng đầu hay cúi nhìn điện thoại", "Khách ngồi thẳng lên thì mái lệch", "Chỉ cắt và so hai bên khi đầu thẳng, mắt nhìn thẳng"],
              ["Lấy tóc quá rộng ra hai bên thái dương", "Mái trùm hết khuôn mặt, nặng nề và rất khó sửa", "Hai góc tam giác dừng ở góc trán, ngay trên đuôi lông mày"],
            ],
          },
        },
        { p: "Lỗi thứ ba là lỗi khó sửa nhất. Vì vậy ở bước chia vùng, luôn lấy ít tóc trước." },
      ],
    },
    {
      id: "chinh-theo-tung-khach",
      title: "Chỉnh mái theo từng khách: dày hay thưa, đeo kính, có xoáy",
      blocks: [
        { p: "Cùng mười bước, nhưng vài quyết định nhỏ thay đổi theo người ngồi trên ghế." },
        {
          ul: [
            "**Khách muốn mái dày.** Đỉnh tam giác lùi ra sau một chút để lấy nhiều tóc hơn.",
            "**Khách muốn mái thưa, nhẹ.** Lấy tam giác nông hơn, ít tóc hơn. Thiếu thì lấy thêm một lớp mỏng phía sau.",
            "**Khách đeo kính.** Mái nên dừng trên gọng kính một chút, để không bị gọng đẩy lên.",
            "**Khách có xoáy ở chân tóc trán.** Báo trước với khách và để mái dài hơn ở phía có xoáy.",
            "**Khách hay buộc tóc.** Phần tóc ôm quanh mặt chỉ lấy lọn mỏng. Lấy quá nhiều thì khi buộc lên sẽ còn cả một mảng tóc ngắn rủ xuống hai bên.",
          ],
        },
        { note: "Tóc đã cắt thì không trả lại được, còn tóc chưa lấy thì lúc nào cũng lấy thêm được. Khi phân vân giữa hai lượng tóc, chọn lượng ít hơn.", kind: "tip", title: "Lấy ít trước" },
      ],
    },
    {
      id: "say-mai-va-dan-khach",
      title: "Cách sấy mái bay và những điều dặn khách",
      blocks: [
        { p: "Mái bay chỉ ra dáng khi được sấy đúng, nên phần dặn dò quan trọng không kém phần cắt. Cách sấy ở nhà giống hệt cách bạn làm ở bước 7: sấy mái trước khi tóc còn ướt, đầu máy chĩa xuống, chải qua trái rồi qua phải, sau đó dùng lược tròn uốn hai nửa mái ra hai bên. Hãy để khách tự cầm máy làm thử một lần ngay tại ghế. Xem thêm bài [Sấy tạo kiểu](lesson:say-tao-kieu) cho phần còn lại của mái tóc." },
        {
          ul: [
            "Mái bay càng dài càng dễ chịu. Khách muốn để dài ra thì cứ để, nó sẽ hòa vào tóc quanh mặt.",
            "Hẹn khách tỉa mái lại sau vài tuần.",
          ],
        },
      ],
    },
    {
      id: "an-toan-ve-sinh",
      title: "An toàn quanh mắt và vệ sinh dụng cụ",
      blocks: [
        {
          ul: [
            "Khách nhắm mắt mỗi khi kéo ở gần mặt. Nhắm mắt cũng giữ cho tóc vụn không rơi vào mắt.",
            "Mũi kéo chĩa sang bên, xuống hay ra ngoài, không bao giờ về phía mắt. Khi tỉa bằng mũi kéo, ngón tay nằm giữa kéo và mặt khách.",
            "Phủi tóc vụn trên mặt bằng chổi mềm trước khi khách mở mắt.",
            "Dải giấy cổ dùng một lần. Lược, kéo, kẹp được làm sạch và khử khuẩn sau mỗi khách, theo bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu).",
          ],
        },
        { note: "Quy định về vệ sinh và hành nghề khác nhau theo từng nước. Hãy kiểm tra quy định nơi bạn làm việc.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "dich-vu-tia-mai",
      title: "Ghi hồ sơ và mở dịch vụ tỉa mái trên trang đặt lịch",
      blocks: [
        { p: "Mái là phần khách quay lại tiệm nhiều nhất giữa hai lần cắt tóc. Trong VaraaAi, bạn ghi mái dài tới đâu và xoáy ở bên nào vào ghi chú của khách trong [sổ khách hàng](lesson:khach-hang). Bạn cũng có thể [tạo một dịch vụ ngắn](lesson:dich-vu) tên “Tỉa mái” để khách tự đặt [lịch hẹn](lesson:lich-hen) sau vài tuần mà không cần nhắn tin hỏi trước." },
      ],
    },
  ],
  howTo: {
    title: "Các bước cắt tóc mái bay rẽ giữa",
    id: "cac-buoc-cat-mai-bay",
    after: "hinh-dang-va-hai-lan-cat",
    lead: "Mười bước theo đúng thứ tự trong video bài học, cắt cho một khách tóc dài.",
    supplies: [
      "Kéo cắt tóc, lược đuôi chuột và kẹp đã làm sạch, khử khuẩn",
      "Dải giấy cổ dùng một lần và áo choàng",
      "Bình xịt nước để làm ẩm nhẹ phần tóc mái",
      "Máy sấy và lược tròn nhỏ",
      "Chổi mềm để phủi tóc vụn trên mặt",
    ],
    steps: [
      {
        name: "Chuẩn bị",
        text: "Rửa tay. Lược, kéo, kẹp đã được làm sạch và khử khuẩn sau khách trước. Quấn dải giấy cổ dùng một lần quanh cổ khách rồi mới cài áo choàng.",
        image: { src: img("quan-giay-co-truoc-khi-cat-mai"), alt: "Thợ tóc quấn dải giấy cổ trắng quanh cổ khách nữ rồi cài áo choàng đen lên trên trước khi cắt tóc" },
      },
      {
        name: "Tư vấn khi tóc còn khô và tìm xoáy",
        text: "Lấy ngón tay đặt tóc xuống trán để khách thấy mái sẽ dừng ở đâu. Với mái bay, chỗ ngắn nhất thường chạm lông mày hay dưới lông mày một chút. Hỏi khách sáng nào cũng sấy được không, có đeo kính không, có hay buộc tóc không. Rồi vén tóc lên tìm xoáy ở chân tóc trán, nếu có thì báo trước với khách.",
        image: { src: img("chi-cho-mai-dung-tren-tran-khach"), alt: "Thợ tóc đứng cạnh khách, dùng hai bàn tay đặt phần tóc khô phía trước xuống trán khách để chỉ chỗ mái sẽ dừng", caption: "Chỉ độ dài ngay trên mặt khách, khi tóc còn khô." },
      },
      {
        name: "Chia vùng tam giác",
        text: "Làm ẩm nhẹ và chải mượt. Đặt đầu nhọn của lược đuôi chuột ở góc trán, ngay trên đuôi lông mày, kẻ một đường chéo lên tới đỉnh tam giác trên đỉnh đầu, rồi làm y như vậy ở bên kia. Chải tóc trong tam giác thẳng xuống mặt, tóc còn lại chải ra sau và kẹp gọn. Nhìn từ phía trước, hai cạnh tam giác phải bằng nhau. Lấy ít tóc trước, thiếu thì lấy thêm.",
        image: { src: img("chia-tam-giac-toc-mai-bang-luoc-duoi-nhon"), alt: "Phần tóc ẩm trong vùng tam giác được chải thẳng xuống trước mặt khách, thợ tóc cầm lược đen, tóc hai bên được kẹp gọn ra sau" },
      },
      {
        name: "Cắt đường đầu tiên thật dài",
        text: "Nhờ khách nhắm mắt và giữ đầu thẳng. Chải mái thẳng xuống giữa mặt, không kéo căng. Ngón trỏ và ngón giữa đỡ hờ tóc ở ngang đầu mũi, cắt ngang ngay dưới ngón tay, lưỡi kéo song song với ngón tay và mũi kéo chĩa sang bên. Đây mới là độ dài tạm thời, vì tóc đang ẩm và sẽ co lên khi khô.",
        image: { src: img("duong-cat-mai-dau-tien-ngang-dau-mui"), alt: "Khách nhắm mắt, phần mái ẩm chải thẳng xuống giữa mặt, thợ tóc đỡ hờ tóc bằng hai ngón tay và đặt kéo nằm ngang ở ngang mũi", caption: "Lần cắt đầu dừng ở ngang đầu mũi, kéo nằm ngang, mũi kéo hướng sang bên." },
      },
      {
        name: "Cắt chéo hai nửa mái",
        text: "Rẽ mái làm đôi ở chính giữa. Chải nửa bên này xuống cạnh mặt, đặt hai ngón tay theo một đường chéo từ giữa trán xuôi ra tới gò má. Cắt theo mép ngoài ngón tay, lưỡi kéo song song với ngón tay, ở thấp và xa mắt khách. Nửa bên kia giữ đúng góc chéo ấy, rồi so lại với bên vừa cắt.",
        image: { src: img("cat-cheo-nua-mai-bay-tu-giua-tran-ra-go-ma"), alt: "Khách nhắm mắt, một nửa mái ẩm chải xuống cạnh mặt, thợ tóc đặt các ngón tay chéo từ trán ra gò má và cắt bằng kéo ở phía dưới", caption: "Ngón tay nằm chéo, kéo đi theo ngón tay ở phía thấp, xa mắt." },
      },
      {
        name: "Tỉa tóc ôm quanh mặt",
        text: "Tháo kẹp hai bên. Lấy một lọn mỏng ở phía trước tai, chải ra phía trước mặt. Đặt ngón tay chéo, nối tiếp đường chéo của mái xuống tới cằm hay xương quai xanh như đã thống nhất, rồi cắt dưới ngón tay với kéo chĩa xuống, xa mặt khách. Bên kia làm y như vậy. Chỉ lấy lọn mỏng để phần tóc dài phía sau giữ nguyên độ dày.",
        image: { src: img("tia-toc-om-quanh-mat-noi-tiep-mai-bay"), alt: "Khách nữ nhắm mắt, thợ tóc đứng phía sau kẹp một lọn tóc ướt cạnh mặt theo đường chéo ngang cằm và đặt kéo cắt bên dưới ngón tay" },
      },
      {
        name: "Sấy mái trước tiên",
        text: "Mái khô nhanh nhất nên được sấy đầu tiên. Đầu máy sấy chĩa xuống theo sợi tóc. Chải mái qua trái rồi sấy, chải qua phải rồi sấy, lặp lại vài lần để chân tóc nằm xuống, kể cả chỗ có xoáy. Sau đó dùng lược tròn nhỏ nâng nhẹ chân tóc và uốn hai nửa mái ra hai bên, xa khuôn mặt.",
        image: { src: img("say-mai-bay-bang-luoc-tron-nho"), alt: "Thợ tóc sấy phần mái của khách bằng lược tròn nhỏ, máy sấy đen chĩa từ trên xuống, khách nhắm mắt thư giãn" },
      },
      {
        name: "Chỉnh độ dài khi tóc khô",
        text: "Lúc này mới thấy mái thật sự nằm ở đâu. Nhờ khách nhắm mắt, ngắn dần từng chút, mỗi lần vài li, rồi buông ra nhìn lại. Tỉa bằng mũi kéo cho đầu mái mềm: mũi kéo dựng lên, cắt những nhát nhỏ vào đầu tóc, ngón tay nằm giữa kéo và mặt khách. Đừng tỉa quá sâu, mái sẽ lởm chởm và mỏng đi.",
      },
      {
        name: "Kiểm tra cân đối",
        text: "Khách ngồi thẳng, đầu thẳng, mắt nhìn thẳng vào gương. Cầm hai bên mái, so ở cùng một mốc ngang gò má, bên nào dài hơn thì tỉa lại bên ấy. Lùi lại một bước để nhìn cả khuôn mặt, rồi hỏi khách độ dài như vậy đã được chưa.",
      },
      {
        name: "Hoàn thiện và ghi hồ sơ",
        text: "Phủi nhẹ tóc vụn trên mặt bằng chổi mềm trước khi khách mở mắt. Chỉ cho khách cách sấy mái và để khách tự làm thử một lần. Ghi vào hồ sơ khách mái dài tới đâu, có xoáy ở bên nào, và hẹn tỉa mái lại sau vài tuần. Khi khách về, làm sạch và khử khuẩn lược, kéo, kẹp.",
      },
    ],
  },
  faq: [
    {
      q: "Cắt mái bay nên cắt khi tóc ướt hay khô?",
      a: "Cả hai. Đường cắt đầu tiên và đường chéo được cắt khi tóc ẩm nhẹ, cố ý để dài, ngang đầu mũi. Sau khi sấy khô mới chỉnh tới độ dài đã hẹn, mỗi lần vài li, vì lúc đó mới thấy mái thật sự nằm ở đâu.",
    },
    {
      q: "Chia tóc để cắt mái bay như thế nào?",
      a: "Chia một vùng hình tam giác: hai góc dưới ở hai góc trán, ngay trên đuôi lông mày, đỉnh nằm trên đỉnh đầu. Hai cạnh phải bằng nhau. Muốn mái dày thì đỉnh tam giác lùi ra sau, muốn mái thưa thì lấy tam giác nông hơn, và luôn lấy ít tóc trước.",
    },
    {
      q: "Mái bay nên dài tới đâu?",
      a: "Chỗ ngắn nhất ở giữa thường chạm lông mày hay dưới lông mày một chút, rồi dài dần ra tới gò má. Khách đeo kính thì mái nên dừng trên gọng kính một chút để không bị gọng đẩy lên. Độ dài được thống nhất khi tóc khô, bằng cách đặt tóc xuống trán khách.",
    },
    {
      q: "Vì sao cắt mái bay xong hai bên bị lệch?",
      a: "Thường do cắt hoặc so hai bên khi khách đang nghiêng đầu hay cúi xuống. Hãy để khách ngồi thẳng, mắt nhìn thẳng vào gương, cầm hai bên mái và so ở cùng một mốc ngang gò má. Bên nào dài hơn thì tỉa lại bên ấy.",
    },
    {
      q: "Sấy mái bay thế nào cho rẽ đẹp sang hai bên?",
      a: "Sấy mái đầu tiên khi tóc còn ướt, đầu máy chĩa xuống. Chải mái qua trái rồi qua phải vài lần cho chân tóc nằm xuống, sau đó dùng lược tròn nhỏ nâng nhẹ chân tóc và uốn hai nửa mái ra hai bên, xa khuôn mặt.",
    },
    {
      q: "Mái bay để dài ra có cần cắt lại không?",
      a: "Không bắt buộc. Mái bay càng dài càng hòa vào phần tóc quanh mặt, nên khách muốn để dài thì cứ để. Nếu muốn giữ đúng độ dài ban đầu thì hẹn tỉa lại sau vài tuần.",
    },
  ],
  related: ["cat-mai-hieu-dung", "cat-nu-tang", "say-tao-kieu", "toc-tu-van-chia-vung"],
};

export default article;
