import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/fill-mong/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-dam-mong-gel-va-bot",
  lesson: "fill-mong",
  category: "nail",
  title: "Cách dặm móng gel và bột (fill móng): 10 bước từ dũa chỗ hở đến dựng lại apex",
  metaTitle: "Cách dặm móng gel và bột: 10 bước fill móng đúng",
  metaDescription:
    "Hướng dẫn cách dặm móng builder gel và bột từng bước: kiểm tra chỗ hở, dũa mỏng lớp cũ, làm liền đường nối, lớp bám trên móng mới, đắp và dựng lại apex.",
  keyword: "cách dặm móng",
  keywords: ["cách fill móng gel", "cách dặm bột", "cách dặm builder gel", "các bước dặm móng", "dũa chỗ hở khi dặm móng", "fill móng bột", "dặm móng cho người mới"],
  excerpt: "Quy trình dặm một bộ builder gel hay bột đã mọc vài tuần: mười bước theo thứ tự, chỗ khác nhau giữa gel và bột, cách tìm chỗ hở còn sót và lỗi cần tránh.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-dam-mong-cho-khach-tai-salon"),
    alt: "Nữ thợ nail tóc đen búi thấp đeo găng đen đang làm móng cho khách tóc vàng tại bàn đá trắng dưới đèn chùm pha lê",
  },
  takeaways: [
    "Ba điều giữ suốt buổi dặm: **không dặm đè lên chỗ hở**, không dũa vào móng thật và da, dựng lại apex đúng chỗ.",
    "Kiểm tra từng móng dưới ánh sáng tốt, nghiêng qua lại. Chỗ hở nhỏ thường chỉ là **một đường mờ ở mép**.",
    "Dũa mỏng lớp cũ trước khi đắp, nhất là phần apex cũ đã trôi ra phía trước.",
    "Lớp bám (lớp lót, chất tăng bám hay primer) **chỉ đặt trên phần móng thật mới mọc**, chừa một đường nhỏ cách da.",
    "Hẹn lịch dặm kế tiếp trước khi khách về: gel khoảng 3–4 tuần, bột khoảng 2–3 tuần.",
  ],
  intro: [
    "Cách dặm móng đúng bắt đầu bằng cây dũa, không phải bằng hũ gel hay hũ bột. Bộ móng khách mang tới đã mọc ra vài tuần: ở chân móng có một khoảng móng mới, apex đã trôi ra phía trước, và đâu đó có thể có một mép hở rất khó thấy. Dọn xong ba chuyện đó rồi mới tới lượt lớp sản phẩm mới.",
    "Bài viết đi theo bài học “Dặm móng gel và bột: thực hành từng bước” trong khóa Nghề Nail của VaraaAi Academy. Quy trình giống nhau cho builder gel và bột acrylic, chỗ nào khác sẽ được nói riêng. Sau bài này bạn dặm được trọn một bộ, từ lúc kiểm tra tới lúc hẹn lịch lần sau.",
  ],
  sections: [
    {
      id: "ba-dieu-xuyen-suot",
      title: "Ba điều xuyên suốt và những bộ móng không nên dặm",
      blocks: [
        {
          ol: [
            "**Không dặm đè lên chỗ hở.** Chỗ nào hở phải được dũa bỏ trước.",
            "**Không dũa vào móng thật và da.** Phần móng mới mọc ở chân móng còn mỏng và mềm.",
            "**Dựng lại apex cho đúng chỗ.** Điểm cao nhất trở về vùng chịu lực, như ngày đầu khách làm.",
          ],
        },
        { p: "Không phải bộ móng nào tới hẹn cũng dặm được. Hở thành mảng lớn, có túi khí, đổi màu, hoặc móng đau, sưng đỏ thì không dặm: tháo hết, hoặc khuyên khách đi khám." },
        { img: { src: img("mong-ho-mang-lon-co-tui-khi-khong-dam"), alt: "Cận cảnh một móng gel đã mọc ra, dưới lớp gel có một túi khí lớn màu trắng bạc chiếm gần nửa móng", caption: "Hở thành mảng lớn, có túi khí bên dưới: bộ này cần tháo hết rồi làm lại, không dặm." } },
        { p: "Lý do đằng sau từng nguyên tắc, và cách phân biệt bộ nào dặm, bộ nào tháo, có trong bài lý thuyết [dặm móng là gì](lesson:fill-mong-hieu-dung). Khi phải tháo hết, bạn làm theo bài [tháo gel đúng cách](lesson:thao-gel)." },
      ],
    },
    {
      id: "dam-gel-khac-dam-bot",
      title: "Dặm builder gel và dặm bột khác nhau ở đâu",
      blocks: [
        { p: "Sáu bước đầu giống hệt nhau. Hai hệ chỉ tách ra ở lớp bám và ở lúc đắp." },
        {
          table: {
            head: ["Phần việc", "Builder gel", "Bột acrylic"],
            rows: [
              ["Lớp bám trên móng mới", "Lớp lót hay chất tăng bám của hãng; hơ hay không hơ theo hướng dẫn", "Primer, chấm thật mỏng, chỉ trên móng thật"],
              ["Cách đắp", "Một lớp thật mỏng phủ cả móng, rồi một hạt gel ở giữa móng, dẫn về chân móng, ra hai cạnh và đầu móng", "Một hạt nhỏ, ẩm hơn một chút, gần chân móng; rồi một hạt ở vùng chịu lực"],
              ["Tạo apex", "Úp ngón tay vài giây cho gel tự dồn lại", "Ấn và vuốt hạt thứ hai cho liền với lớp cũ"],
              ["Cứng lại", "Hơ đủ thời gian hãng khuyên", "Chờ theo thời gian của hãng, gõ cán cọ nghe tiếng cạch khô"],
              ["Lịch dặm kế tiếp", "Khoảng 3–4 tuần", "Khoảng 2–3 tuần"],
            ],
          },
        },
        { p: "Kỹ thuật đặt hạt của từng hệ đã có trong hai bài thực hành riêng: [cách đắp builder gel](lesson:builder-gel) và [cách đắp bột acrylic](lesson:dap-bot-acrylic). Khi dặm, bạn dùng lại đúng những động tác đó trên một diện tích nhỏ hơn." },
      ],
    },
    {
      id: "tim-cho-ho-con-sot",
      title: "Cách tìm chỗ hở còn sót và lưu ý khi dùng máy dũa",
      blocks: [
        { p: "Chỗ hở nhỏ rất dễ bỏ sót, vì nó thường chỉ là một đường mờ ở mép sản phẩm. Hãy tìm ở chân móng và dọc hai cạnh bên, dưới ánh sáng tốt, và nghiêng ngón tay qua lại cho ánh đèn lướt trên mặt móng." },
        { note: "Sau khi dũa chỗ hở, nghiêng móng dưới đèn thêm một lần. Còn một đường trắng mờ ở mép là vẫn còn hở: dũa tiếp, đừng đắp đè.", kind: "tip", title: "Kiểm tra lại dưới đèn" },
        { p: "Dũa mãi mà vẫn hở, hoặc hở cả một mảng lớn, thì dừng lại. Bộ này cần tháo hết rồi làm lại. Đừng cạy và đừng giật phần hở ra, vì nó kéo theo cả lớp móng thật." },
        { note: "Máy dũa chỉ dùng khi bạn đã được học kỹ: tốc độ vừa phải, mũi dũa luôn nằm trên lớp sản phẩm, không bao giờ đưa vào chân móng hay da. Chưa được đào tạo thì dùng dũa tay.", kind: "warn", title: "Máy dũa" },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Lỗi thường gặp khi dặm móng và cách tránh",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Cách làm đúng"],
            rows: [
              ["Đắp đè lên chỗ hở", "Ẩm và bụi bẩn bị nhốt bên dưới, lớp mới bong rất nhanh", "Dũa bỏ phần hở tới khi mép bám chắc và liền với móng"],
              ["Không dũa mỏng lớp cũ", "Không còn chỗ dựng lại apex, bộ móng dày và nặng dần sau mỗi lần dặm", "Dũa bớt độ dày, nhất là phần apex cũ đã trôi ra trước"],
              ["Để nguyên cái bậc giữa lớp cũ và móng mới", "Đường nối lộ gờ dưới lớp mới", "Dũa nhẹ cho bậc mỏng dần và phẳng, sờ không còn thấy gờ"],
              ["Quét lớp bám lên da hoặc khắp cả móng", "Sản phẩm chạm da, dễ hở và có thể gây dị ứng", "Chỉ đặt trên phần móng thật mới mọc; trên lớp cũ chỉ khi hãng hướng dẫn"],
              ["Hạt bột ở chân móng to và dày", "Mép dày dễ bật lên", "Hạt nhỏ, vuốt thật mỏng về phía da, không chạm da"],
            ],
          },
        },
      ],
    },
    {
      id: "sau-buoi-dam",
      title: "Sau buổi dặm: dặn khách, dọn bàn và đặt lịch",
      blocks: [
        { p: "Trước khi khách về, hẹn luôn lần dặm sau: gel khoảng 3–4 tuần, bột khoảng 2–3 tuần. Dặn khách thấy hở thì đừng cạy, đừng tự lột, hãy quay lại tiệm sớm." },
        {
          ul: [
            "Dũa, phao, bông đã dùng bỏ vào thùng rác có nắp.",
            "Dụng cụ kim loại mang đi làm sạch và tiệt trùng.",
            "Đậy kín chai gel, chén bột.",
          ],
        },
        { p: "Trong VaraaAi, bạn [tạo dịch vụ](lesson:dich-vu) “Dặm gel” và “Dặm bột” riêng với thời lượng thật của tiệm, để lịch không bị chồng khi khách tự đặt dặm. Buổi dặm kế tiếp được đặt ngay tại quầy trên [lịch hẹn](lesson:lich-hen). Móng nào hay hở, hay gãy thì ghi vào [hồ sơ khách hàng](lesson:khach-hang), để lần sau thợ biết mà chỉnh cho hợp." },
      ],
    },
  ],
  howTo: {
    title: "Các bước dặm móng gel và bột",
    id: "cac-buoc-dam-mong",
    after: "ba-dieu-xuyen-suot",
    lead: "Mười bước theo đúng thứ tự trong video bài học. Sáu bước đầu chỉ dùng dũa, phao và bông, và đó là phần quyết định bộ móng có bền hay không.",
    supplies: [
      "Cây đẩy da đã tiệt trùng",
      "Dũa, phao chà mịn, chổi phủi bụi",
      "Bông không xơ và dung dịch lau móng",
      "Lớp bám đúng hệ: lớp lót hoặc chất tăng bám của hãng gel, hoặc primer của hãng bột",
      "Builder gel và đèn hơ, hoặc liquid, bột và cọ đắp bột",
      "Máy hút tại bàn, khẩu trang, găng tay",
      "Gel màu nếu khách muốn, gel top, dầu dưỡng",
    ],
    steps: [
      {
        name: "Tư vấn và kiểm tra",
        text: "Rửa tay, sát khuẩn tay cho mình và cho khách. Hỏi khách mấy tuần qua có móng nào gãy, hở hay đau không, rồi nhìn kỹ từng móng dưới ánh sáng tốt, nghiêng ngón tay qua lại. Hở thành mảng lớn, có túi khí, đổi màu, hay móng đau, sưng đỏ thì không dặm. Móng nào hay hở, hay gãy thì ghi lại để lần sau chỉnh cho hợp.",
        image: { src: img("kiem-tra-mong-da-moc-duoi-anh-den"), alt: "Thợ nail đeo găng đen nâng bàn tay khách dưới ánh đèn bàn màu vàng đồng, nghiêng các móng gel đã mọc ra để xem", caption: "Nghiêng từng móng dưới đèn: chỗ hở nhỏ chỉ hiện ra như một đường mờ ở mép." },
      },
      {
        name: "Chuẩn bị phần móng mới mọc",
        text: "Coi phần móng mới như một chiếc móng chưa làm gì, và chuẩn bị nó như khi [sơn gel](lesson:son-gel): làm khô, không ngâm nước, đẩy da nhẹ nhàng, lấy sạch lớp da mỏng còn dính trên phần móng mới. Lướt phao thật nhẹ, chỉ trên phần móng mới mọc, cho mất độ bóng. Không làm mỏng móng.",
        image: { src: img("day-da-tren-phan-mong-moi-moc"), alt: "Cây đẩy da bằng thép đặt nghiêng trên dải móng thật mới mọc ở sát chân móng, phía trước là lớp gel cũ" },
      },
      {
        name: "Dũa bỏ chỗ hở",
        text: "Tìm mép sản phẩm ở chân móng và hai cạnh bên. Chỗ nào hở thì dũa nhẹ cho đến khi hết phần hở và mép còn lại bám chắc, liền với móng. Dũa xong, nhìn lại thật kỹ dưới đèn. Không cạy, không giật phần hở ra.",
      },
      {
        name: "Dũa mỏng lớp cũ",
        text: "Đặt dũa nằm trên mặt móng và dũa bớt độ dày, nhất là phần apex cũ đã trôi ra phía trước. Móng đã quá dài thì cắt và dũa ngắn lại, giữ đúng form khách đã chọn. Mục tiêu là lớp cũ mỏng đều, gọn, để lớp mới có chỗ dựng lại apex. Đừng dũa xuyên qua lớp cũ xuống tới móng thật.",
      },
      {
        name: "Làm liền đường nối",
        text: "Chỗ lớp cũ gặp phần móng mới thường có một cái bậc nhỏ. Dũa nhẹ cho bậc ấy mỏng dần, phẳng và liền với móng mới, sờ tay không còn thấy gờ. Đặt dũa nằm, nhẹ tay, và giữ dũa cách xa da ở chân móng.",
        image: { src: img("duong-noi-lop-cu-va-mong-moi-da-dua-lien"), alt: "Cận cảnh một móng có lớp gel cũ đã dũa mỏng và mờ, mép gel chuyển mượt sang dải móng thật mới mọc, không còn bậc", caption: "Sau bước 5: lớp cũ mỏng, mờ đều, và không còn bậc ở chỗ gặp móng mới." },
      },
      {
        name: "Làm sạch",
        text: "Máy hút vẫn chạy. Phủi sạch bụi bằng chổi, không thổi, rồi lau cả móng bằng bông không xơ thấm dung dịch lau. Từ lúc này đừng chạm tay vào mặt móng nữa.",
        image: { src: img("lau-sach-mong-bang-bong-khong-xo"), alt: "Thợ nail đeo găng đen dùng miếng bông không xơ gấp nhỏ bọc lấy đầu ngón trỏ của khách để lau mặt móng" },
      },
      {
        name: "Đặt lớp bám trên móng mới",
        text: "Lớp bám chỉ đặt lên phần móng thật mới mọc và chừa một đường nhỏ cách da. Không quét lên lớp cũ, trừ khi hãng hướng dẫn. Với gel, đó là lớp lót hay chất tăng bám của hãng, hơ hay không hơ theo hướng dẫn. Với bột, đó là primer, chấm thật mỏng, chỉ trên móng thật.",
        image: { src: img("lop-bam-chi-tren-phan-mong-moi-moc"), alt: "Đầu cọ nhỏ quét một dải lớp bám bóng ướt lên phần móng thật mới mọc sát chân móng, phần gel cũ vẫn mờ", caption: "Chỉ dải móng mới mọc bóng lên. Giữa lớp bám và da còn một khe mảnh." },
      },
      {
        name: "Đắp và dựng lại apex",
        text: "Với builder gel: phủ một lớp thật mỏng lên cả móng để gel mới liền với lớp cũ, đặt một hạt gel vào giữa móng, dẫn nhẹ về chân móng và dừng cách da như sợi tóc, rồi ra hai cạnh và đầu móng. Úp ngón tay vài giây cho gel dồn lại thành apex, lật lên kiểm tra và hơ đủ thời gian; khách thấy nóng thì rút tay ra vài giây rồi hơ tiếp. Với bột: hạt đầu nhỏ, ẩm hơn một chút, đặt gần chân móng và vuốt thật mỏng về phía da mà không chạm da. Hạt thứ hai đặt vào vùng chịu lực, vuốt liền với lớp cũ để dựng lại apex, rồi chờ bột cứng.",
        image: { src: img("hat-builder-gel-o-giua-mong-khi-dam"), alt: "Cọ dẹt vừa đặt một hạt builder gel tròn vào giữa một móng đã dũa mờ, phần móng mới sát chân móng có lớp lót bóng" },
      },
      {
        name: "Dũa hoàn thiện",
        text: "Dũa mịn bề mặt và giữ lại apex vừa dựng. Dũa gọn hai cạnh bên và đầu móng cho đều. Ở chân móng, chỗ lớp mới mỏng dần, dũa cho liền với móng thật nhưng không dũa vào móng thật và không chạm da. Phủi bụi, lau sạch, rồi nhìn lại từ trên xuống, từ cạnh bên và từ đầu móng: mỏng ở chân móng, cao vừa phải ở vùng chịu lực, mỏng ở đầu móng.",
      },
      {
        name: "Màu, top và dầu dưỡng",
        text: "Sơn màu và top như khi sơn gel: sơn mỏng, bọc qua mép đầu móng và hơ đủ thời gian. Nhỏ dầu dưỡng lên da quanh móng, xoa nhẹ, rồi hẹn lịch dặm lần sau.",
      },
    ],
  },
  faq: [
    {
      q: "Dặm móng gồm những bước nào?",
      a: "Mười bước: tư vấn và kiểm tra, chuẩn bị phần móng mới mọc, dũa bỏ chỗ hở, dũa mỏng lớp cũ, làm liền đường nối, làm sạch, đặt lớp bám trên móng mới, đắp và dựng lại apex, dũa hoàn thiện, rồi màu, top và dầu dưỡng. Cuối buổi hẹn luôn lịch dặm lần sau.",
    },
    {
      q: "Khi dặm, lớp lót hay primer thoa ở đâu?",
      a: "Chỉ trên phần móng thật mới mọc, và chừa một đường nhỏ cách da. Không quét lên lớp sản phẩm cũ, trừ khi hãng hướng dẫn như vậy. Lớp bám không bao giờ được chạm vào da.",
    },
    {
      q: "Có cần dũa mỏng lớp cũ khi dặm móng không?",
      a: "Có. Lớp cũ được dũa bớt độ dày, nhất là phần apex đã trôi ra phía trước, để lớp mới có chỗ dựng lại apex đúng vùng chịu lực. Nhưng không dũa xuyên qua lớp cũ xuống tới móng thật.",
    },
    {
      q: "Dặm bột khác dặm gel ở bước nào?",
      a: "Ở lớp bám và lúc đắp. Bột dùng primer chấm thật mỏng trên móng thật, rồi một hạt nhỏ gần chân móng và một hạt ở vùng chịu lực, chờ cứng ngoài không khí. Gel dùng lớp lót hay chất tăng bám của hãng, một hạt gel ở giữa móng, úp tay tạo apex rồi hơ đèn.",
    },
    {
      q: "Dũa chỗ hở mãi vẫn còn hở thì làm sao?",
      a: "Dừng lại. Hở cả một mảng lớn thì không dặm được, bộ móng cần tháo hết rồi làm lại. Không đắp thêm sản phẩm lên cho kín và không cạy phần hở ra, vì cạy làm hỏng móng thật.",
    },
    {
      q: "Dùng máy dũa khi dặm móng có được không?",
      a: "Chỉ khi người thợ đã được học kỹ. Tốc độ vừa phải, mũi dũa luôn nằm trên lớp sản phẩm và không bao giờ đưa vào chân móng hay da. Nếu chưa được đào tạo, hãy dùng dũa tay.",
    },
  ],
  related: ["fill-mong-hieu-dung", "builder-gel", "dap-bot-acrylic", "thao-gel"],
};

export default article;
