import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nu-tang/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-cat-toc-tang-nu",
  lesson: "cat-nu-tang",
  category: "hair",
  title: "Cách cắt tóc tầng nữ: 10 bước cắt tầng dài có tầng ôm mặt mà vẫn giữ độ dài",
  metaTitle: "Cách cắt tóc tầng nữ: 10 bước giữ trọn độ dài",
  metaDescription:
    "Hướng dẫn cách cắt tóc tầng nữ dài từng bước: tư vấn bằng điểm chạm, đường viền 0°, tầng đỉnh 180°, kéo lệch giữ độ dài phía trước, tầng ôm mặt, kiểm tra và sấy.",
  keyword: "cách cắt tóc tầng nữ",
  keywords: [
    "các bước cắt tóc tầng",
    "cắt tóc tầng dài",
    "cách cắt tóc layer nữ",
    "cách cắt tầng ôm mặt",
    "cắt tóc tầng giữ độ dài",
    "cắt tóc tầng cho người mới",
  ],
  excerpt: "Một kiểu tóc tầng dài có tầng ôm mặt, cắt theo mười bước: đường viền trước, tầng đỉnh ở 180°, hai bên kéo lệch ra sau, rồi mới tới phần quanh mặt.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-toc-va-khach-voi-kieu-toc-tang-dai"),
    alt: "Nữ thợ tóc tóc bob nâu đứng sau khách nữ tóc vàng dài vừa cắt tầng, cả hai mỉm cười trong salon kiểu Paris có rèm nhung tím",
  },
  takeaways: [
    "Thống nhất bằng **điểm chạm** khi tóc còn khô: đuôi tóc dừng ở đâu, tầng ôm mặt bắt đầu ở đâu.",
    "Cắt **đường viền ngoài trước**, ở 0°. Đó là độ dài của cả mái tóc, và các tầng sau không được cắt vào nó.",
    "Tầng dài ở đỉnh: chải thẳng lên **180°**, gom về một điểm, cắt ít rồi thả xuống xem.",
    "Hai bên kéo lệch ra sau để giữ độ dài phía trước. Tầng ôm mặt thì kéo về phía trước, khách nhắm mắt, mũi kéo hướng ra xa mặt.",
    "Luôn bắt đầu dài. Ngắn thêm thì lúc nào cũng được, dài lại thì phải chờ tóc mọc.",
  ],
  intro: [
    "Cách cắt tóc tầng nữ trong bài này dành cho yêu cầu hay gặp nhất ở ghế cắt: khách tóc dài muốn tóc nhẹ, bồng, có tầng ôm mặt, nhưng không muốn mất độ dài. Kiểu tóc được cắt theo bốn phần, mỗi phần một góc nâng và một hướng kéo tóc riêng, phần sau dựa vào phần trước.",
    "Bài viết đi theo bài học “Cắt tóc nữ tầng: thực hành từng bước” trong khóa Nghề Tóc của VaraaAi Academy. Làm theo mười bước dưới đây, bạn cắt được một kiểu tầng dài hoàn chỉnh, từ lúc quấn giấy cổ cho tới lúc ghi hồ sơ khách. Lý do đằng sau từng góc nâng nằm ở bài lý thuyết [Cắt tóc tầng là gì](lesson:cat-nu-tang-hieu-dung), nên đọc trước nếu bạn chưa quen với khái niệm đường chuẩn và kéo lệch.",
  ],
  sections: [
    {
      id: "bon-phan-cua-kieu-toc",
      title: "Kiểu tóc tầng dài này được cắt theo bốn phần",
      blocks: [
        { p: "Trước khi vào từng bước, hãy nhìn cả kiểu tóc như một bản vẽ. Mỗi phần có một việc riêng, và phần sau dựa vào phần trước." },
        {
          table: {
            head: ["Phần", "Cầm tóc thế nào", "Để làm gì"],
            rows: [
              ["Đường viền ngoài", "Chải thẳng xuống, 0°", "Định độ dài của cả mái tóc"],
              ["Tầng ở đỉnh", "Chải thẳng lên 180°, gom về một điểm trên đỉnh đầu", "Tóc trên ngắn nhất, xuống dưới dài dần, nối vào đường viền"],
              ["Hai bên", "Lọn trước tai kéo lệch ra sau, về lọn chuẩn sau tai", "Giữ độ dài ở phía trước"],
              ["Tầng ôm mặt", "Lọn phía trước chải ra trước mặt, cắt theo đường chéo", "Tóc quanh mặt ngắn, dài dần ra sau"],
            ],
          },
        },
        { p: "Người mới hay muốn cắt phần quanh mặt trước vì đó là phần nhìn thấy rõ nhất. Hãy để nó sau cùng. Khi đường viền và các tầng phía sau đã xong, bạn mới biết phần quanh mặt cần nối vào đâu." },
        { note: "Tên gọi góc nâng và cách dạy khác nhau giữa các trường và các nước. Bài này là tài liệu luyện tập, không thay cho bằng nghề.", kind: "info", title: "Trước khi bắt đầu" },
      ],
    },
    {
      id: "ba-thoi-quen",
      title: "Ba thói quen giữ tầng đều trong suốt buổi cắt",
      blocks: [
        { p: "Mười bước trên có thể làm đúng thứ tự mà tầng vẫn lệch, nếu thiếu ba thói quen sau. Chúng không thuộc về bước nào, bạn mang theo từ nhát kéo đầu tới nhát kéo cuối." },
        {
          ol: [
            "**Đứng đúng chỗ.** Di chuyển quanh khách để thân mình luôn ở ngay trước lọn tóc đang cắt. Đứng lệch thì tay kéo lệch theo mà mình không biết.",
            "**Giữ góc nâng.** Cắt lâu, tay mỏi và hạ dần xuống. Góc nâng đổi thì tầng cũng đổi.",
            "**Luôn bắt đầu dài.** Tỉa thêm thì lúc nào cũng được.",
          ],
        },
        { note: "Khi thấy tay mỏi, đừng cố cắt cho xong vùng đang làm. Dừng lại, thả tay, đứng lại cho đúng chỗ rồi cắt tiếp. Vài giây nghỉ rẻ hơn nhiều so với một bên tầng thấp hơn bên kia.", kind: "tip", title: "Tay mỏi là lúc góc nâng tụt" },
      ],
    },
    {
      id: "thay-gi-sua-gi",
      title: "Cắt tóc tầng bị lỗi: thấy gì thì sửa thế nào",
      blocks: [
        { p: "Phần lớn việc sửa diễn ra ngay trong buổi cắt, ở bước kiểm tra và sau khi sấy. Bảng sau gom những tình huống bài học nhắc tới." },
        {
          table: {
            head: ["Bạn thấy", "Nguyên nhân thường gặp", "Cách xử lý"],
            rows: [
              ["Tầng chưa rõ sau khi thả tóc xuống", "Lần đầu cắt ít, đúng như nên làm", "Nâng lại 180°, cắt thêm một chút theo đúng cách cũ"],
              ["Có lọn nhô ra khi kiểm tra bằng lọn ngang", "Góc nâng hoặc lực căng không đều giữa các lọn dọc", "Tỉa lại phần nhô ra"],
              ["Hai lọn ngắn nhất hai bên mặt không cùng độ cao", "Hai bên dùng đường chuẩn hoặc lực căng khác nhau", "Tỉa bên dài, từng chút một"],
              ["Tóc ở đỉnh dựng đứng", "Tầng đỉnh quá ngắn, nhất là ở chỗ xoáy", "Không sửa được trong buổi. Lần sau cắt ít ở đỉnh và để chỗ xoáy dài hơn"],
              ["Tóc hai bên lòi ra khi khách buộc tóc", "Tầng hai bên quá ngắn so với thói quen của khách", "Hỏi về việc buộc tóc ngay ở bước tư vấn"],
            ],
          },
        },
        { p: "Hai dòng cuối cho thấy vì sao phải bắt đầu dài và hỏi kỹ: có những lỗi chỉ thời gian mới sửa được." },
      ],
    },
    {
      id: "say-va-cham-soc",
      title: "Sấy tóc tầng, để tự khô và lịch tỉa lại",
      blocks: [
        { p: "Tóc tầng dài để tự khô cũng đẹp, nếu tầng không quá ngắn. Trước khi khách rời ghế, hãy chỉ cho khách thử cả hai cách: sấy với lược tròn, cuộn nhẹ tầng ôm mặt ra xa mặt, và để tóc tự khô. Khách biết tóc mình trông thế nào ở cả hai kiểu thì ít khi thất vọng vào sáng hôm sau. Kỹ thuật sấy được nói riêng trong bài [Sấy tạo kiểu](lesson:say-tao-kieu)." },
        { img: { src: img("toc-tang-dai-nhin-tu-phia-sau"), alt: "Mái tóc vàng mật ong dài tới bả vai nhìn từ phía sau sau khi cắt tầng, các tầng dài tạo độ bồng nhẹ, đuôi tóc mềm và đều", caption: "Kết quả nhìn từ phía sau: độ dài còn nguyên, tầng nối mềm vào đường viền, đuôi tóc vẫn dày." } },
        { p: "Với tóc tầng dài, nhiều khách tỉa lại sau khoảng 2–3 tháng. Đây là thói quen thường gặp, không phải quy định. Tỉa đều đặn thì đuôi tóc luôn dày và tầng giữ dáng lâu hơn." },
      ],
    },
    {
      id: "an-toan-ve-sinh",
      title: "An toàn và vệ sinh khi cắt tóc tầng",
      blocks: [
        {
          ul: [
            "Chỉ cắt tới độ dài đã thống nhất với khách. Muốn ngắn hơn thì hỏi lại trước.",
            "Khi cắt quanh mặt, mời khách nhắm mắt và hướng mũi kéo ra xa mặt khách.",
            "Dải giấy cổ dùng một lần, quấn trước rồi mới cài áo choàng lên trên. Khách về thì bỏ đi.",
            "Kéo, lược, kẹp được làm sạch và khử khuẩn sau mỗi khách theo hướng dẫn của sản phẩm. Quy trình có trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu).",
            "Quét sạch tóc dưới ghế trước khi mời khách tiếp theo.",
          ],
        },
        { note: "Quy định về vệ sinh và về hành nghề tóc khác nhau theo từng nước. Hãy kiểm tra quy định nơi bạn làm việc.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "ghi-ho-so-khach",
      title: "Ghi hồ sơ khách để lần sau cắt lại đúng kiểu",
      blocks: [
        { p: "Khách thích kiểu tóc hôm nay sẽ muốn đúng kiểu đó ở lần tới, và sau hai, ba tháng thì cả hai đều không còn nhớ tầng bắt đầu ở cằm hay ở gò má. Trong VaraaAi, bạn ghi độ dài và chỗ tầng ôm mặt bắt đầu vào ghi chú của khách trong [sổ khách hàng](lesson:khach-hang), rồi gợi ý [lịch hẹn](lesson:lich-hen) lần sau ngay khi thanh toán. Dịch vụ cắt tầng nên có thời lượng riêng trên trang đặt lịch, đủ cho cả tư vấn, gội và sấy: xem cách [thêm dịch vụ](lesson:dich-vu)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước cắt tóc tầng nữ dài có tầng ôm mặt",
    id: "cac-buoc-cat-toc-tang",
    after: "bon-phan-cua-kieu-toc",
    lead: "Mười bước theo đúng thứ tự trong video bài học. Từ bước 4 đến bước 7 là bốn phần của kiểu tóc, mỗi phần cắt ít trước rồi mới cắt thêm.",
    supplies: [
      "Kéo cắt tóc, lược và kẹp chia vùng đã làm sạch, khử khuẩn",
      "Dải giấy cổ dùng một lần và áo choàng",
      "Khăn thấm tóc và bình xịt nước",
      "Máy sấy và lược tròn",
      "Gương tay để khách xem phía sau",
    ],
    steps: [
      {
        name: "Chuẩn bị chỗ ngồi và dụng cụ",
        text: "Rửa tay. Kiểm tra kéo, lược, kẹp đã được làm sạch và khử khuẩn. Quấn dải giấy cổ quanh cổ khách rồi mới cài áo choàng lên trên, để áo choàng không chạm trực tiếp vào da cổ.",
        image: { src: img("quan-giay-co-va-ao-choang-truoc-khi-cat"), alt: "Thợ tóc quấn dải giấy cổ trắng quanh cổ khách rồi cài áo choàng đen lên trên, tóc khách được vén sang một bên vai" },
      },
      {
        name: "Tư vấn khi tóc còn khô",
        text: "Xem ảnh mẫu cùng khách và hỏi ba điều: đuôi tóc tỉa đi bao nhiêu, tầng ngắn nhất phía trước bắt đầu ở đâu, sáng nào khách có sấy không. Hỏi thêm lần trước cắt có gì khách không thích và khách có hay buộc tóc không. Chốt lại bằng điểm chạm: đặt tay vào đúng chỗ đuôi tóc sẽ dừng và chỗ tầng ôm mặt bắt đầu, ví dụ ngang cằm. Đọc luôn mái tóc: dày hay mỏng, thẳng hay xoăn, xoáy ở đâu. Tóc mảnh thì ít tầng thôi.",
        image: { src: img("thong-nhat-do-dai-bang-diem-cham"), alt: "Thợ tóc đứng cạnh khách trước gương bầu dục viền vàng, cầm phần đuôi một lọn tóc dài khô để chỉ cho khách độ dài sẽ cắt", caption: "Chỉ bằng tay lên tóc thật. “Cắt một chút” với mỗi người là một độ dài khác nhau." },
      },
      {
        name: "Gội, gỡ rối, rẽ ngôi và chia vùng",
        text: "Gội, thấm khô bằng khăn, gỡ rối từ ngọn lên. Rẽ ngôi theo đúng kiểu khách sẽ để hằng ngày, trong video là ngôi giữa. Chia vùng và kẹp gọn. Giữ tóc ẩm đều bằng bình xịt trong suốt lúc cắt, vì chỗ khô chỗ ướt co giãn khác nhau.",
        image: { src: img("chia-vung-toc-truoc-khi-cat-tang"), alt: "Mái tóc vàng ướt của khách nhìn từ phía sau đã được chia thành nhiều vùng bằng các đường rẽ thẳng và kẹp bạc, thợ tóc cầm lược bên cạnh" },
      },
      {
        name: "Cắt đường viền ngoài ở 0°",
        text: "Khách ngồi thẳng, đầu thẳng. Thả tóc phía sau xuống, chải thẳng xuống lưng. Kẹp đuôi tóc giữa hai ngón tay nằm ngang ở độ dài đã thống nhất, cắt thẳng ngang ngay dưới ngón tay, phần giữa trước rồi ra hai bên. Nối sang hai bên, lấy đường phía sau làm chuẩn. Đường viền cong chữ U hay nhọn chữ V phải được thống nhất từ trước. Đây là độ dài của cả mái tóc, các tầng sau không cắt vào nó.",
        image: { src: img("cat-duong-vien-ngoai-goc-0-do"), alt: "Thợ tóc đứng cạnh khách, chải mái tóc dài ướt thẳng xuống lưng và giữ đuôi tóc giữa các ngón tay để cắt đường viền ngang", caption: "Tóc rơi thẳng xuống, không nâng. Nhìn từ phía sau, đường viền song song với sàn." },
      },
      {
        name: "Cắt tầng dài ở vùng đỉnh với 180°",
        text: "Chia vùng đỉnh từ hai góc trán ra sau tới đỉnh đầu. Chải toàn bộ vùng này thẳng lên trên, gom về một điểm ngay trên đỉnh đầu, kẹp giữa hai ngón tay và cắt thẳng ngang. Điểm ấy là đường chuẩn cố định. Cắt càng thấp thì tầng càng ngắn, nên lần đầu cắt ít rồi thả tóc xuống xem. Muốn tầng rõ hơn thì cắt thêm một chút theo đúng cách cũ. Đừng cắt quá ngắn ở chỗ xoáy, tóc sẽ dựng đứng.",
      },
      {
        name: "Cắt hai bên, kéo lệch ra sau",
        text: "Lấy một lọn dọc ngay sau tai, nâng ra khỏi đầu và nối với tầng ở đỉnh. Lọn này là đường chuẩn cố định của hai bên. Lấy tiếp lọn dọc ở trước tai, kéo lệch ra sau về đúng chỗ đường chuẩn ấy, chỉ cắt phần đuôi thừa ra sau ngón tay. Nhờ vậy tóc phía trước dài hơn và không mất độ dài. Bên kia làm y như vậy, với cùng đường chuẩn và cùng lực căng.",
        image: { src: img("keo-lech-toc-ra-sau-giu-do-dai-phia-truoc"), alt: "Khách ngồi nghiêng, thợ tóc đứng phía sau kéo một lọn tóc ướt ở bên đầu ra phía sau và dùng kéo cắt phần đuôi thừa", caption: "Lọn trước tai được đưa ra sau để cắt. Khi thả về chỗ cũ, nó dài hơn lọn chuẩn." },
      },
      {
        name: "Cắt tầng ôm mặt",
        text: "Lấy một lọn hình tam giác phía trước, từ đường ngôi xuống tới góc trán, chải ra trước mặt và mời khách nhắm mắt. Kẹp lọn tóc theo một đường chéo, đầu trên ở đúng điểm đã thống nhất, rồi cắt theo đường chéo ấy với mũi kéo hướng ra xa mặt khách. Lọn kế tiếp ở phía sau cũng chải về phía trước, tới đúng chỗ lọn đầu, và cắt theo nó. Tóc phía sau nhờ vậy dài dần ra. Bên kia cắt theo đúng độ cao của bên này.",
        image: { src: img("cat-tang-om-mat-khach-nham-mat"), alt: "Khách nữ nhắm mắt, tóc ướt rẽ ngôi giữa, thợ tóc đứng phía sau kẹp một lọn tóc phía trước theo đường chéo ngang cằm và đặt kéo cắt", caption: "Khách nhắm mắt, mũi kéo hướng ra xa mặt. Bắt đầu dài hơn điểm đã thống nhất một chút." },
      },
      {
        name: "Kiểm tra chéo và cân hai bên",
        text: "Những chỗ đã cắt bằng lọn dọc thì kiểm tra bằng lọn ngang, chỗ nào nhô ra thì tỉa lại. Sau đó đứng sau khách, nhìn vào gương, kéo hai lọn ngắn nhất ở hai bên mặt xuống và so độ cao. Lệch thì tỉa bên dài, từng chút một.",
        image: { src: img("so-hai-lon-toc-hai-ben-mat"), alt: "Thợ tóc đứng sau khách, mỗi tay giữ một lọn tóc ở hai bên mặt khách, cả hai cùng nhìn vào gương bầu dục viền vàng để so độ dài" },
      },
      {
        name: "Sấy và kiểm tra lại khi tóc khô",
        text: "Sấy theo chiều tóc. Dùng lược tròn nâng nhẹ chân tóc ở đỉnh và cuộn nhẹ tầng ôm mặt ra xa mặt. Khi tóc khô, nhìn lại ba thứ: hai bên có cân không, độ bồng có đều không, đuôi tóc có còn dày không. Chỗ nào chưa đều thì tỉa nhẹ khi tóc khô.",
        image: { src: img("say-toc-tang-bang-luoc-tron"), alt: "Thợ tóc sấy mái tóc vàng dài đã cắt tầng của khách, lược tròn nâng một lọn ở đỉnh đầu, máy sấy đen đặt phía trên" },
      },
      {
        name: "Hoàn thiện, ghi hồ sơ và dọn dẹp",
        text: "Phủi sạch tóc vụn, cho khách xem phía sau bằng gương tay và hỏi khách có muốn chỉnh gì không. Chỉ cho khách cách sấy tầng ôm mặt ở nhà. Ghi vào hồ sơ khách độ dài và chỗ tầng bắt đầu. Khi khách về, làm sạch và khử khuẩn kéo, lược, kẹp, bỏ dải giấy cổ và quét tóc dưới ghế.",
      },
    ],
  },
  faq: [
    {
      q: "Cắt tóc tầng nữ nên cắt phần nào trước?",
      a: "Thường cắt đường viền ngoài trước, ở 0°, đúng độ dài đã thống nhất với khách. Đường viền là độ dài của cả mái tóc. Sau đó mới cắt tầng ở đỉnh, hai bên và cuối cùng là tầng ôm mặt, để các tầng nối mềm vào đường viền mà không cắt vào nó.",
    },
    {
      q: "Làm sao cắt tóc tầng mà vẫn giữ được độ dài?",
      a: "Ở vùng đỉnh, chải tóc thẳng lên 180° và gom về một điểm trên đỉnh đầu để cắt: tóc trên ngắn nhất, càng xuống dưới càng dài. Ở hai bên, kéo lọn tóc trước tai lệch ra sau về lọn chuẩn sau tai rồi mới cắt phần thừa, nhờ đó tóc phía trước không mất độ dài.",
    },
    {
      q: "Tầng ôm mặt nên bắt đầu từ đâu?",
      a: "Tùy khách chọn: ngang gò má, ngang cằm hoặc ngang xương quai xanh. Hãy thống nhất bằng cách đặt tay vào đúng điểm đó khi tóc còn khô, và hỏi khách có hay buộc tóc không, vì tầng hai bên quá ngắn sẽ lòi ra khi buộc. Khi cắt, bắt đầu dài hơn điểm đã chọn một chút.",
    },
    {
      q: "Muốn tầng ngắn hơn, rõ hơn thì cắt thế nào?",
      a: "Khi nâng vùng đỉnh lên 180°, cắt càng thấp thì tầng càng ngắn. Hãy cắt thêm từng chút theo đúng cách cũ rồi thả tóc xuống xem. Không kéo tóc căng mạnh để cắt, vì tóc khô rồi sẽ co lên không đều.",
    },
    {
      q: "Cắt tóc tầng xong có cần sấy mỗi ngày không?",
      a: "Không bắt buộc. Tóc tầng dài để tự khô cũng đẹp nếu tầng không quá ngắn. Nếu sấy, dùng lược tròn nâng nhẹ chân tóc ở đỉnh và cuộn tầng ôm mặt ra xa mặt.",
    },
    {
      q: "Tóc tầng dài bao lâu thì nên tỉa lại?",
      a: "Nhiều khách tỉa lại sau khoảng 2–3 tháng. Đây là thói quen thường gặp chứ không phải quy định. Tỉa đều đặn giúp đuôi tóc luôn dày và tầng giữ dáng lâu hơn.",
    },
  ],
  related: ["cat-nu-tang-hieu-dung", "toc-tu-van-chia-vung", "cat-nu-bang", "say-tao-kieu"],
};

export default article;
