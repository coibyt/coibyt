import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-mong-co-ban/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cac-buoc-lam-mong-tay-mong-chan",
  lesson: "cham-soc-mong-co-ban",
  category: "nail",
  title: "Các bước làm móng tay móng chân cơ bản với sơn thường: 14 bước từ tư vấn đến dọn bồn",
  metaTitle: "Các bước làm móng tay móng chân cơ bản: 14 bước",
  metaDescription:
    "Quy trình manicure, pedicure cơ bản với sơn thường: tẩy sơn cũ, dũa dáng, làm mềm và đẩy da, sơn lót, hai lớp màu, ngâm chân, cắt móng chân thẳng ngang, dọn bồn.",
  keyword: "các bước làm móng tay móng chân",
  keywords: ["quy trình làm manicure cơ bản", "các bước làm pedicure", "cách sơn móng tay sơn thường", "cách tẩy sơn móng tay", "cách cắt móng chân thẳng ngang", "làm nail cơ bản cho người mới", "cách đẩy da móng tay"],
  excerpt: "Một buổi chăm sóc móng tay rồi móng chân với sơn thường, từng bước: tẩy sơn, dũa, đẩy da, sơn, ngâm chân, cắt thẳng ngang, dũa chai và vệ sinh sau khách.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-cham-soc-mong-chan-cho-khach-tai-salon"),
    alt: "Thợ nail mặc áo kem, đeo găng đen ngồi trên ghế thấp chăm sóc bàn chân cho khách ngồi ghế bành trong salon kiểu Paris",
  },
  takeaways: [
    "Ba điều giữ suốt buổi: **không cắt da sống**, **cắt móng chân thẳng ngang**, và mọi thứ chạm vào khách đều phải sạch.",
    "Tẩy sơn cũ bằng cách đặt bông thấm nước tẩy vài giây rồi vuốt một chiều từ chân móng ra đầu móng, không chà qua lại.",
    "Sơn thường: một lớp lót mỏng, hai lớp màu mỏng, một lớp bóng. Đợi lớp trước se mặt rồi mới sơn lớp sau.",
    "Móng chân: bồn đã khử khuẩn, túi lót mới, ngâm ngắn, cắt từng nhát nhỏ thẳng ngang, không đào khóe.",
    "Chai chân chỉ dũa mịn vài lượt nhẹ, không dao, không lưỡi bào.",
  ],
  intro: [
    "Các bước làm móng tay móng chân cơ bản với sơn thường là quy trình đầu tiên người học nail phải thuộc, và cũng là dịch vụ khách đặt đều nhất. Không có đèn, không có gel, nên mọi thứ dựa vào đôi tay sạch, lớp sơn mỏng và sự kiên nhẫn chờ sơn se mặt.",
    "Bài viết này viết lại bài học “Chăm sóc móng tay, móng chân: thực hành từng bước” trong khóa Nghề Nail của VaraaAi Academy. Bảy bước đầu là một buổi chăm sóc móng tay, bảy bước sau là móng chân, kết thúc bằng việc dọn bồn sau khi khách về. Bạn nên xem video bài học bên dưới trước, rồi dùng bài viết như một bảng kiểm khi luyện tập.",
  ],
  sections: [
    {
      id: "ba-dieu-nho",
      title: "Ba điều nhớ trước khi bắt đầu một buổi manicure, pedicure",
      blocks: [
        {
          ol: [
            "**Không cắt da sống.** Kềm chỉ cắt những mảnh da chết đã bong lên, dù khách có yêu cầu cắt sâu.",
            "**Cắt móng chân thẳng ngang.** Không cắt sâu vào hai khóe, không đào khóe.",
            "**Mọi thứ chạm vào khách đều phải sạch.** Tay đã rửa và sát khuẩn, dụng cụ kim loại lấy từ túi tiệt trùng, bồn có túi lót mới.",
          ],
        },
        { p: "Lý do đằng sau ba điều này, cùng cách làm việc với khách tiểu đường và vết chai, được giải thích trong bài lý thuyết [chăm sóc móng tay móng chân đúng cách](lesson:cham-soc-mong-co-ban-hieu-dung). Bài này tập trung vào thao tác." },
        { note: "Với sơn thường, ngâm nhanh đầu ngón tay trong nước ấm để làm mềm da là được. Trước khi làm gel thì khác: móng được chuẩn bị khô, không ngâm nước, như bài [cách sơn gel](lesson:son-gel) đã giải thích.", kind: "info", title: "Sơn thường và gel chuẩn bị khác nhau" },
      ],
    },
    {
      id: "son-thuong-cho-dep",
      title: "Cách sơn móng tay sơn thường cho đều và ít lem",
      blocks: [
        { p: "Sơn thường khô nhờ không khí, nên độ dày của từng lớp quyết định gần như mọi thứ. Sơn dày thì lâu khô, dễ móp và dễ lem." },
        {
          table: {
            head: ["Hiện tượng", "Nguyên nhân thường gặp", "Cách xử lý"],
            rows: [
              ["Sơn không bám, bong sớm", "Kem và dầu còn trên mặt móng sau khi mát xa", "Lau kỹ từng móng bằng bông không xơ thấm dung dịch lau, cả hai cạnh và đầu móng"],
              ["Sơn lâu khô, dễ móp", "Lớp sơn quá dày", "Hai lớp màu mỏng, đợi lớp trước se mặt rồi mới sơn lớp sau"],
              ["Sơn lem ra da", "Cọ đi quá sát da", "Chừa một khe nhỏ ở chân móng; lỡ lem thì lau mép bằng que gỗ quấn chút bông thấm nước tẩy"],
              ["Sơn cũ lem ra khóe khi tẩy", "Chà bông qua lại", "Đặt bông vài giây cho sơn mềm rồi vuốt một chiều; chỗ sót ở khóe dùng que gỗ quấn bông"],
              ["Móng móp sau khi khách về", "Mặt sơn khô nhưng bên dưới còn mềm trong vài giờ", "Nhắc khách trước khi rời bàn"],
            ],
          },
        },
        { note: "Muốn khô nhanh hơn, bạn có thể nhỏ giọt làm khô nhanh lên từng móng trong lúc khách ngồi nghỉ, tay đặt yên.", kind: "tip", title: "Trong lúc chờ khô" },
      ],
    },
    {
      id: "dau-hieu-dung-lai",
      title: "Những dấu hiệu phải dừng lại trước khi ngâm chân",
      blocks: [
        { p: "Trước khi cho chân khách vào bồn, người thợ nhìn kỹ đôi chân. Đây không phải thủ tục: có những thứ chỉ thấy được khi da còn khô." },
        {
          ul: [
            "Kẽ ngón chân nứt, đỏ, hay trắng ẩm.",
            "Vết thương, vết loét.",
            "Móng dày lên, đổi màu, hay đâm vào da.",
          ],
        },
        { p: "Gặp những dấu hiệu này thì không làm phần đó, và khuyên khách đi khám hoặc đến chuyên viên chăm sóc bàn chân. Chai quá dày hay có vết nứt sâu cũng vậy. Bài học [Khi nào không nên làm](lesson:khi-nao-khong-lam) liệt kê đầy đủ hơn." },
        { note: "Hỏi về tiểu đường ngay từ bước tư vấn. Với khách có bệnh tiểu đường, ngâm ngắn và nước chỉ ấm vừa. Thời gian ngâm và cách dùng sản phẩm luôn theo hướng dẫn của sản phẩm.", kind: "warn", title: "Khách tiểu đường" },
      ],
    },
    {
      id: "ve-sinh-sau-khach",
      title: "Vệ sinh sau mỗi khách: bồn, dụng cụ và đồ dùng một lần",
      blocks: [
        {
          table: {
            head: ["Vật dụng", "Làm gì sau khi khách về"],
            rows: [
              ["Túi lót bồn", "Lấy ra và bỏ đi"],
              ["Bồn ngâm chân", "Làm sạch, rồi khử khuẩn đủ thời gian theo hướng dẫn của sản phẩm"],
              ["Dũa, bông, miếng tách ngón và đồ dùng một lần khác", "Bỏ"],
              ["Kềm và cây đẩy da", "Mang đi rửa rồi tiệt trùng"],
            ],
          },
        },
        { img: { src: img("bo-tui-lot-bon-ngam-chan-sau-khach"), alt: "Hai bàn tay đeo găng đen nhấc túi lót đã dùng ra khỏi bồn ngâm chân trắng, bên cạnh là bình xịt khử khuẩn và khay kềm", caption: "Túi lót chỉ dùng cho một khách. Bồn vẫn được làm sạch và khử khuẩn sau đó." } },
        { p: "Quy trình rửa, khử khuẩn và tiệt trùng dụng cụ kim loại có trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
        { note: "Quy định vệ sinh khác nhau theo từng nước. Bài học nêu theo hướng dẫn của thành phố Helsinki; bạn cần xem quy định nơi mình làm việc. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "hen-lich-ke-tiep",
      title: "Hẹn lịch kế tiếp và ghi lại màu sơn của khách",
      blocks: [
        { p: "Chăm sóc móng cơ bản là dịch vụ lặp lại, nên việc cuối cùng của buổi làm diễn ra ở quầy. Trong VaraaAi, bạn đặt sẵn [lịch hẹn](lesson:lich-hen) kế tiếp cho khách, khoảng bốn tuần sau, và ghi vào hồ sơ [khách hàng](lesson:khach-hang) màu sơn đã dùng để lần sau khách khỏi phải nhớ. Với khách quay lại đều mỗi tháng, tiệm có thể dùng thêm [thẻ khách quen](lesson:the-khach-quen)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước làm móng tay, móng chân với sơn thường",
    id: "cac-buoc-lam-mong",
    after: "ba-dieu-nho",
    lead: "Bước 1 đến 7 là móng tay, bước 8 đến 14 là móng chân, theo đúng thứ tự trong video bài học.",
    supplies: [
      "Kềm và cây đẩy da kim loại trong túi tiệt trùng",
      "Dũa, phao mịn, que gỗ, miếng tách ngón: mỗi khách một bộ mới",
      "Bông, bông không xơ, nước tẩy sơn và dung dịch lau móng",
      "Chất làm mềm da hoặc bát nước ấm",
      "Kem dưỡng, muối hay đường tẩy da chết",
      "Sơn lót, sơn màu, sơn bóng",
      "Bồn ngâm chân đã khử khuẩn, túi lót dùng một lần, dũa chân mịn",
    ],
    steps: [
      {
        name: "Tư vấn và kiểm tra móng, da",
        text: "Rửa tay, sát khuẩn tay cho mình và cho khách. Hỏi khách muốn dáng nào, màu nào, và hỏi về sức khỏe: có dị ứng gì không, có bệnh tiểu đường không. Nhìn kỹ móng và da; thấy dấu hiệu bất thường thì không làm.",
      },
      {
        name: "Tẩy sơn cũ",
        text: "Đặt miếng bông thấm nước tẩy lên móng vài giây cho sơn mềm, rồi vuốt một chiều từ chân móng ra đầu móng. Đừng chà qua lại vì sơn sẽ lem ra da và khóe móng. Chỗ còn sót ở khóe thì dùng que gỗ quấn chút bông.",
        image: { src: img("tay-son-mong-tay-cu-bang-bong"), alt: "Thợ nail đeo găng đen ép miếng bông trắng thấm nước tẩy lên một móng sơn hồng cũ đã tróc của khách", caption: "Đặt bông vài giây cho sơn mềm rồi mới vuốt một chiều ra đầu móng." },
      },
      {
        name: "Cắt ngắn nếu cần và dũa dáng",
        text: "Dũa một chiều, từ cạnh vào giữa, theo dáng khách chọn. Cách chọn dáng và đường dũa của từng kiểu có trong bài [cách dũa móng tay](lesson:dua-form-mong).",
      },
      {
        name: "Làm mềm da",
        text: "Có hai cách. Ngâm đầu ngón tay vào nước ấm một lúc ngắn rồi lau thật khô. Hoặc thoa chất làm mềm da lên chân móng, để đúng thời gian ghi trên sản phẩm rồi lau sạch. Chất này làm mềm da chết rất nhanh, nên đừng để lâu hơn hướng dẫn.",
        image: { src: img("thoa-chat-lam-mem-da-o-chan-mong"), alt: "Thợ nail bóp một đường chất làm mềm da trong suốt từ tuýp đầu nhọn lên chân móng tự nhiên của khách" },
      },
      {
        name: "Đẩy da và chỉ lấy da chết",
        text: "Đặt cây đẩy da nghiêng thấp, đẩy thật nhẹ phần da ở chân móng về phía sau, rồi lấy sạch lớp da chết mỏng còn bám trên mặt móng. Kềm chỉ dùng để cắt những mảnh da chết đã bong lên. Không cắt vào nếp da sống, dù khách có yêu cầu.",
        image: { src: img("day-da-mong-tay-nhe-nhang"), alt: "Cây đẩy da kim loại cầm như cây bút, đặt nghiêng thấp ở chân móng tự nhiên của khách và đẩy nhẹ lớp da về phía sau", caption: "Cây đẩy da nghiêng thấp, đẩy thật nhẹ." },
      },
      {
        name: "Phao nhẹ, mát xa tay và lau sạch mặt móng",
        text: "Lướt phao mịn thật nhẹ để mặt móng đều và mịn, không làm mỏng móng. Thoa một ít kem dưỡng rồi xoa mu bàn tay, từng ngón, lòng bàn tay, chậm và đều tay. Sau đó lấy bông không xơ thấm dung dịch lau, lau kỹ từng móng, cả hai bên cạnh và đầu móng, vì kem và dầu còn sót sẽ làm sơn không bám.",
        image: { src: img("mat-xa-tay-voi-kem-duong"), alt: "Hai bàn tay đeo găng đen của thợ ôm bàn tay khách và xoa một ít kem dưỡng trắng trên mu bàn tay" },
      },
      {
        name: "Sơn lót, hai lớp màu, sơn bóng và để khô",
        text: "Một lớp sơn lót mỏng để bảo vệ móng và giúp màu bám. Tiếp theo là hai lớp màu mỏng, mỗi lớp ba đường cọ: giữa, trái, phải; chừa một khe nhỏ ở chân móng và quét nhẹ qua mép đầu móng. Đợi lớp trước se mặt rồi mới sơn lớp sau, cuối cùng là lớp sơn bóng. Cho khách ngồi nghỉ, tay đặt yên, và nhắc rằng bên dưới mặt sơn còn mềm trong vài giờ.",
      },
      {
        name: "Chuẩn bị bồn và nhìn kỹ đôi chân",
        text: "Bồn đã được làm sạch và khử khuẩn sau khách trước. Lót một túi mới dùng một lần rồi cho nước ấm vào, thử nước bằng cổ tay: ấm dễ chịu, không nóng. Dụng cụ móng chân lấy từ túi tiệt trùng, mở ngay trước mặt khách. Trước khi ngâm, xem kẽ ngón, da và móng chân của khách có dấu hiệu bất thường không.",
      },
      {
        name: "Ngâm chân vài phút",
        text: "Ngâm vài phút cho da mềm là đủ. Ngâm lâu thì da nhăn, mềm quá và rất dễ xước. Với khách có bệnh tiểu đường, ngâm ngắn và nước chỉ ấm vừa.",
        image: { src: img("ngam-chan-trong-bon-co-tui-lot"), alt: "Hai bàn chân khách ngâm trong bồn nước ấm có lót túi ni lông trong, vài cánh hoa hồng nổi trên mặt nước", caption: "Túi lót trùm qua miệng bồn. Ngâm ngắn, nước ấm dễ chịu." },
      },
      {
        name: "Cắt móng chân thẳng ngang",
        text: "Đặt kềm thẳng ngang mép móng và cắt từng nhát nhỏ, không cắt một nhát hết cả móng: móng không bị nứt dọc và bạn giữ được đường thẳng. Không cắt sâu vào hai khóe, không đào khóe. Mép móng ngang với đầu ngón chân là vừa.",
        image: { src: img("cat-mong-chan-thang-ngang-bang-kem"), alt: "Thợ đeo găng đen giữ ngón chân cái của khách và đặt kềm cắt móng thẳng ngang mép móng, bàn chân đặt trên khăn bông kem" },
      },
      {
        name: "Dũa móng chân thẳng ngang",
        text: "Dũa thẳng ngang theo mép móng, rồi chỉ bo thật nhẹ hai góc cho khỏi sắc. Không dũa xuống hai bên khóe.",
        image: { src: img("dua-mong-chan-thang-ngang"), alt: "Thợ đeo găng đen áp cây dũa xám thẳng ngang vào mép móng ngón chân cái của khách, tay kia giữ ngón chân" },
      },
      {
        name: "Đẩy da, dũa chai, tẩy da chết và mát xa",
        text: "Đẩy da nhẹ nhàng như với móng tay, chỉ lấy da chết. Dùng dũa chân mịn lướt nhẹ trên gót và những chỗ da dày, vài lượt đều tay là đủ; không dùng dao, không dùng lưỡi bào. Xoa nhẹ muối hay đường tẩy da chết lên bàn chân và cổ chân, rửa sạch, lau thật khô, nhất là kẽ ngón chân. Sau đó mát xa chân với kem dưỡng, chậm và đều, dọc theo lòng bàn chân.",
      },
      {
        name: "Tách ngón và sơn móng chân",
        text: "Lau sạch kem và dầu trên mặt móng, đặt miếng tách ngón. Sơn lót, hai lớp màu mỏng và lớp sơn bóng, giống như móng tay. Chờ sơn se mặt rồi mới cho khách mang dép.",
        image: { src: img("tach-ngon-va-son-mong-chan"), alt: "Miếng tách ngón màu trắng đặt giữa các ngón chân của khách, thợ đeo găng đen đang sơn móng ngón cái màu đỏ", caption: "Miếng tách ngón là đồ dùng một lần, mỗi khách một bộ mới." },
      },
      {
        name: "Dọn bồn và xử lý dụng cụ",
        text: "Khi khách về, lấy túi lót ra bỏ đi. Làm sạch bồn rồi khử khuẩn đủ thời gian theo hướng dẫn của sản phẩm. Dũa, bông và đồ dùng một lần thì bỏ; kềm và cây đẩy da mang đi rửa rồi tiệt trùng.",
      },
    ],
  },
  faq: [
    {
      q: "Làm móng tay cơ bản gồm những bước nào?",
      a: "Tư vấn và kiểm tra móng, tẩy sơn cũ, dũa dáng, làm mềm da, đẩy da và lấy da chết, phao nhẹ, mát xa tay, lau sạch mặt móng, rồi sơn lót, hai lớp màu mỏng và sơn bóng. Cuối cùng để sơn khô và dặn khách rằng bên dưới còn mềm trong vài giờ.",
    },
    {
      q: "Tẩy sơn móng tay thế nào để không lem ra da?",
      a: "Đặt miếng bông thấm nước tẩy lên móng vài giây cho sơn mềm, rồi vuốt một chiều từ chân móng ra đầu móng. Chà qua lại làm sơn lem ra da và khóe móng. Phần sót ở khóe thì dùng que gỗ quấn chút bông.",
    },
    {
      q: "Sơn móng tay sơn thường nên sơn mấy lớp?",
      a: "Một lớp sơn lót mỏng, hai lớp màu mỏng và một lớp sơn bóng. Mỗi lớp màu đi ba đường cọ, đợi lớp trước se mặt rồi mới sơn lớp sau. Sơn dày thì lâu khô, dễ móp và dễ lem.",
    },
    {
      q: "Ngâm chân bao lâu trước khi làm móng chân?",
      a: "Vài phút cho da mềm là đủ. Ngâm lâu làm da nhăn, mềm quá và rất dễ xước. Với khách có bệnh tiểu đường thì ngâm ngắn và nước chỉ ấm vừa.",
    },
    {
      q: "Vì sao nên cắt móng chân bằng nhiều nhát nhỏ?",
      a: "Cắt từng nhát nhỏ giúp móng không bị nứt dọc và giữ được đường cắt thẳng ngang. Cắt một nhát hết cả móng thì móng dễ nứt dọc và khó giữ đường cắt cho thẳng.",
    },
    {
      q: "Có được dùng dao bào để lấy chai chân không?",
      a: "Trong quy trình cơ bản thì không dùng dao và không dùng lưỡi bào. Chỉ dùng dũa chân mịn lướt vài lượt nhẹ để da mịn hơn. Chai quá dày hay có vết nứt sâu thì khuyên khách đến chuyên viên chăm sóc bàn chân.",
    },
  ],
  related: ["cham-soc-mong-co-ban-hieu-dung", "dua-form-mong", "son-gel", "ve-sinh-dung-cu"],
};

export default article;
