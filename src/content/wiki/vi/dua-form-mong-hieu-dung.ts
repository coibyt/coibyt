import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dua-form-mong-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cac-dang-mong-tay",
  lesson: "dua-form-mong-hieu-dung",
  category: "nail",
  title: "Các dáng móng tay phổ biến: 7 dáng, dáng nào bền và cách chọn hợp bàn tay",
  metaTitle: "Các dáng móng tay: 7 dáng phổ biến và cách chọn hợp tay",
  metaDescription:
    "Bảy dáng móng tay hay gặp: vuông, vuông bo góc, tròn, ô van, hạnh nhân, coffin, stiletto. Dáng nào chắc, dáng nào dễ gãy, chọn theo bàn tay và móng thật.",
  keyword: "các dáng móng tay",
  keywords: ["dáng móng tay đẹp", "móng vuông bo góc", "móng hạnh nhân", "móng coffin là gì", "dáng móng cho tay ngắn", "dáng móng nào bền nhất", "form móng tay"],
  excerpt: "Bảy dáng móng tay hay gặp, dáng nào chắc trên móng thật, dáng nào nên làm trên móng đắp, và bốn điều cần nhìn trước khi chọn form cho một bàn tay.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("bay-dang-mong-tay-pho-bien"),
    alt: "Bảy móng mẫu màu hồng nude xếp một hàng trên mặt đá trắng, từ dáng vuông, tròn, ô van đến dáng nhọn",
  },
  takeaways: [
    "Có bảy dáng hay gặp: vuông, vuông bo góc, tròn, ô van, hạnh nhân, coffin (ba lê) và nhọn stiletto.",
    "Va chạm hằng ngày dồn vào đầu móng. **Tròn, ô van và vuông bo góc** là những dáng thực tế và chắc nhất cho móng thật.",
    "Dáng thon về một điểm như hạnh nhân dài hay stiletto thường hợp với móng thật khỏe hoặc **móng đắp**; coffin cần độ dài nên cũng thường làm trên móng đắp.",
    "Chọn dáng theo bốn thứ: bàn tay, đường cong ở chân móng, công việc của khách và độ khỏe của móng thật.",
    "Không dũa sâu vào hai khóe móng thật: móng yếu đi, dễ gãy, và mép móng có thể đâm vào da khi mọc ra.",
  ],
  intro: [
    "Các dáng móng tay nhìn trên ảnh thì nhiều, nhưng ở bàn nail người thợ gặp đi gặp lại bảy dáng: vuông, vuông bo góc, tròn, ô van, hạnh nhân, coffin và nhọn stiletto. Cây dũa thì ai cũng cầm được. Phần khó là biết dáng nào hợp với bàn tay nào, dáng nào chịu được cuộc sống hằng ngày của khách, và dáng nào chỉ nên làm khi móng đã được đắp thêm.",
    "Bài viết này đi theo bài học “Dáng móng: hiểu đúng để chọn form hợp tay khách” trong khóa Nghề Nail của VaraaAi Academy. Đọc xong, bạn gọi đúng tên từng dáng, giải thích được vì sao có dáng bền và có dáng hay gãy, và biết cách tư vấn khi khách mang đến một tấm ảnh không hợp với móng thật của họ.",
  ],
  sections: [
    {
      id: "bay-dang-mong",
      title: "Bảy dáng móng tay hay gặp và cách nhận ra từng dáng",
      blocks: [
        { p: "Mỗi dáng được quyết định bởi hai thứ: hai cạnh bên đi thẳng hay thon vào, và đầu móng kết thúc bằng một đường thẳng, một đường cong hay một mũi nhọn. Nhìn theo hai tiêu chí đó, bạn sẽ không nhầm dáng nào với dáng nào." },
        {
          table: {
            head: ["Dáng móng", "Trông thế nào", "Thường hợp với"],
            rows: [
              ["Vuông", "Đầu móng dũa thẳng ngang, hai cạnh thẳng, hai góc vuông sắc", "Móng ngắn đến vừa; đầu rộng và chắc nhưng góc dễ vướng, dễ mẻ"],
              ["Vuông bo góc (squoval)", "Vẫn thẳng ngang như dáng vuông, hai góc được bo tròn nhẹ", "Móng thật; là một trong những dáng thực tế và chắc nhất"],
              ["Tròn", "Móng ngắn, đầu móng đi theo đường cong của đầu ngón tay", "Móng thật ngắn, người làm việc bằng tay nhiều"],
              ["Ô van", "Dài hơn một chút, hai bên cong đều, gặp nhau ở một đầu tròn như quả trứng", "Móng thật; giúp ngón tay trông dài và thon hơn"],
              ["Hạnh nhân", "Hai bên thon dần về giữa thành một mũi nhọn nhưng tròn mềm", "Móng thật khỏe hoặc móng đắp gel, đắp bột"],
              ["Coffin (ba lê)", "Hai bên thon vào như hạnh nhân, đầu móng dũa thẳng ngang như mũi giày múa ba lê", "Cần độ dài, nên thường làm trên móng đắp"],
              ["Nhọn stiletto", "Hai bên thon dốc tới một mũi nhọn sắc ở chính giữa", "Móng đắp, hoặc móng thật rất khỏe"],
            ],
          },
        },
        { img: { src: img("dang-mong-vuong-bo-goc-squoval"), alt: "Hai bàn tay đặt trên gối kê tay màu kem, mười móng hồng sữa cùng một dáng vuông bo góc và cùng độ dài", caption: "Vuông bo góc: đầu móng thẳng ngang, hai góc bo nhẹ. Đây là dáng được rất nhiều khách chọn cho móng thật." } },
        { p: "Trong nghề, vuông bo góc hay được gọi là squoval, còn coffin và ba lê là hai tên của cùng một dáng. Khi khách nói một cái tên lạ, cách nhanh nhất là cho khách xem hình các dáng rồi chỉ vào dáng họ muốn." },
      ],
    },
    {
      id: "dang-nao-ben",
      title: "Dáng móng nào bền nhất, dáng nào dễ gãy",
      blocks: [
        { p: "Hãy nghĩ về nơi lực va chạm đi tới. Gõ phím, mở cửa xe, lấy đồ trong túi: mọi va chạm trong ngày đều dồn vào đầu móng. Đầu móng còn càng nhiều chất liệu thì càng chịu lực tốt." },
        { p: "Dáng thon về một điểm, như hạnh nhân và nhọn, còn rất ít chất liệu ở đầu móng. Vì vậy các dáng này thường hợp với móng thật khỏe, hoặc móng đã đắp gel, đắp bột. Dáng vuông thì ngược lại: đầu rộng, chắc. Điểm yếu của nó nằm ở hai góc sắc, hay vướng vào áo len, vào tóc, rồi mẻ. Chuyện khách thích dáng vuông rồi vài ngày sau quay lại vì mất một góc là chuyện thợ nào cũng gặp." },
        { img: { src: img("mong-vuong-bi-me-goc"), alt: "Cận cảnh một móng tự nhiên dáng vuông trên ngón tay khách, một góc đầu móng đã bị mẻ thành vết khuyết nhỏ", caption: "Hình minh họa điểm yếu của dáng vuông: góc sắc vướng vào đồ vật và mẻ mất một mảnh." } },
        { p: "Tròn, ô van và vuông bo góc không có góc sắc để vướng và cũng không thon tới mức mất chất liệu ở đầu. Đó là lý do ba dáng này được xem là thực tế và chắc nhất cho móng thật. Coffin thì cần độ dài mới ra dáng, nên thường làm trên móng đắp." },
        { img: { src: img("dang-mong-nhon-stiletto-tren-mong-dap"), alt: "Hai bàn tay ngón dài đặt trên khăn bông trắng, mười móng dài dáng nhọn stiletto màu hồng sữa đều nhau", caption: "Stiletto thon dốc tới một mũi nhọn. Đầu móng còn rất ít chất liệu, nên dáng này làm trên móng đắp hoặc móng thật rất khỏe." } },
        { note: "Độ chắc của từng dáng là xu hướng chung. Móng của mỗi khách một khác, dày mỏng và cứng mềm không ai giống ai. Hãy nhìn kỹ móng trước mặt mình rồi mới kết luận dáng nào giữ được.", kind: "info", title: "Xu hướng, không phải luật" },
      ],
    },
    {
      id: "chon-dang-mong",
      title: "Cách chọn dáng móng hợp với bàn tay và cuộc sống của khách",
      blocks: [
        { p: "Trước khi cầm dũa, người thợ nhìn và hỏi bốn điều. Mỗi điều loại bớt vài dáng, và thứ còn lại thường là dáng hợp nhất." },
        { h3: "1. Bàn tay" },
        { p: "Ngón tay dài và thon thì hầu như dáng nào cũng đẹp, kể cả dáng vuông. Ngón tay ngắn, móng rộng thì ô van hay hạnh nhân thường làm ngón trông dài và thon hơn. Dáng vuông trên móng rộng dễ làm ngón tay trông ngắn lại." },
        { img: { src: img("ban-tay-ngon-ngan-mong-rong"), alt: "Hai bàn tay phụ nữ có ngón ngắn, bàn tay rộng đặt úp trên khăn bông kem, móng tự nhiên ngắn và rộng bản", caption: "Ngón ngắn, móng rộng: ô van hay hạnh nhân thường giúp bàn tay trông thon hơn dáng vuông." } },
        { h3: "2. Đường cong ở chân móng" },
        { p: "Nhiều thợ dùng một mẹo: dáng đầu móng trông hài hòa nhất khi nó lặp lại đường cong ở chân móng. Chân móng tròn thì hợp dáng tròn hay ô van. Chân móng vuông hơn thì hợp vuông bo góc. Đây là điểm khởi đầu tốt để gợi ý, không phải luật." },
        { h3: "3. Công việc và cuộc sống" },
        { p: "Người gõ phím nhiều, người làm việc bằng tay, nấu ăn hay chăm con nhỏ thường dễ chịu nhất với móng ngắn, dáng tròn hay vuông bo góc. Nhiều nơi làm việc như bệnh viện hay bếp ăn còn có quy định riêng về móng. Khi khách nhắc đến công việc, hãy hỏi thêm một câu trước khi gợi ý độ dài." },
        { img: { src: img("mong-ngan-vuong-bo-goc-khi-go-phim"), alt: "Bàn tay một phụ nữ đang gõ bàn phím máy tính xách tay trên bàn đá, móng ngắn dáng vuông bo góc màu hồng sữa" } },
        { h3: "4. Độ khỏe của móng thật" },
        { p: "Móng mỏng, mềm hay tách lớp ở đầu thì đừng dũa nhọn và đừng để dài. Dáng tròn hay ô van ngắn sẽ giữ được lâu hơn. Nếu khách vẫn muốn hạnh nhân dài hay dáng nhọn, hãy làm trên móng đắp, như trong bài [nối móng bằng form](lesson:noi-mong-form)." },
        { img: { src: img("mong-that-mong-tach-lop-o-dau"), alt: "Cận cảnh một móng tự nhiên mỏng trên ngón tay khách, phần đầu móng tách thành nhiều lớp mỏng và sứt nhẹ", caption: "Móng mỏng, tách lớp ở đầu: giữ ngắn, dũa tròn hoặc ô van." } },
      ],
    },
    {
      id: "deu-va-hai-canh-ben",
      title: "Mười móng đều nhau và hai cạnh bên: chỗ phân biệt tay nghề",
      blocks: [
        { p: "Chọn đúng dáng mới là một nửa. Nửa còn lại là làm cho mười móng cùng độ dài và cùng một dáng. Khách nhìn tay mình cả ngày, nên một móng lệch sẽ bị thấy ngay." },
        {
          ul: [
            "**Nhìn từ trên xuống:** mũi móng nằm chính giữa, hai bên đối xứng.",
            "**Xoay ngón tay, nhìn từ đầu móng:** hai cạnh cân nhau, độ cong đều.",
          ],
        },
        { p: "Ở hai bên móng có chỗ móng bắt đầu rời khỏi nền da. Người trong nghề gọi đó là **điểm chịu lực**. Từ điểm này, hai cạnh bên phải đi thẳng ra trước rồi mới tạo dáng ở đầu móng. Nói cách khác, dáng chỉ được tạo ở phần đầu móng, không tạo bằng cách khoét vào hai bên." },
        { img: { src: img("loi-dua-sau-vao-khoe-mong"), alt: "Cận cảnh một móng tự nhiên bị dũa khoét sâu hai bên thành mũi nhọn hẹp, da ở khóe móng hơi ửng đỏ", caption: "Hình minh họa lỗi: dũa sâu vào hai khóe móng thật. Móng trông thon hơn nhưng mất phần đỡ hai bên." } },
        { note: "Không dũa sâu vào hai khóe của móng thật. Móng mất phần đỡ hai bên nên yếu và dễ gãy. Khi móng mọc ra, mép móng còn có thể đâm vào khóe da, gây sưng đau.", kind: "warn", title: "Lỗi rất hay gặp" },
      ],
    },
    {
      id: "chon-dua-mong",
      title: "Chọn dũa móng: số càng lớn, dũa càng mịn",
      blocks: [
        { p: "Con số in trên cây dũa cho biết độ nhám. Số càng lớn thì dũa càng mịn." },
        {
          table: {
            head: ["Loại móng", "Dũa nên dùng", "Cách dũa"],
            rows: [
              ["Móng thật", "Dũa mịn, thường từ 180 trở lên", "Dũa một chiều, nhẹ tay"],
              ["Móng đắp gel cứng hay đắp bột", "Dũa thô hơn, tùy từng việc", "Nhẹ tay ở vùng sát móng thật"],
            ],
          },
        },
        { img: { src: img("cac-loai-dua-mong-theo-do-min"), alt: "Bốn cây dũa móng từ màu kem mịn đến màu đen thô xếp cạnh một phao chà trắng và cọ phủi bụi trên khăn bông", caption: "Dũa mịn dành cho móng thật, dũa thô hơn dành cho móng đắp." } },
        { p: "Với móng thật, kéo cưa qua lại làm móng nóng lên và đầu móng dễ tách lớp. Quy tắc dũa một chiều này cũng là bước đầu trong quy trình [sơn gel](lesson:son-gel). Còn đường dũa cụ thể của từng dáng, từ vuông đến stiletto, có trong bài thực hành [cách dũa móng tay từng dáng](lesson:dua-form-mong)." },
      ],
    },
    {
      id: "noi-that-voi-khach",
      title: "Khi dáng khách muốn không hợp với móng thật",
      blocks: [
        { p: "Tình huống quen thuộc: khách mang ảnh một bộ móng nhọn thật dài, mà móng thật lại mỏng. Gật đầu cho khách vui thì dễ, nhưng vài ngày sau khách sẽ quay lại với một móng gãy và ít tin bạn hơn." },
        { img: { src: img("tho-nail-tu-van-dang-mong-cho-khach"), alt: "Thợ nail mặc áo kem, đeo găng đen cầm tay khách và giải thích với nét mặt thân thiện tại bàn đá trong salon sang trọng" } },
        { p: "Hãy giải thích nhẹ nhàng rằng dáng này trên móng thật của khách sẽ rất dễ gãy, rồi đưa ra lựa chọn:" },
        {
          ol: [
            "Làm dáng hạnh nhân ngắn hơn trên móng thật.",
            "Đắp thêm để làm đúng dáng nhọn khách thích.",
          ],
        },
        { p: "Khách được giải thích sẽ tự chọn, và thường tin thợ hơn sau lần đó. Trước khi làm bất kỳ dáng nào, người thợ vẫn nhìn móng và da quanh móng: móng có dấu hiệu bệnh hay da sưng đỏ thì không làm, như bài [Khi nào không nên làm](lesson:khi-nao-khong-lam) đã nói. Quy định về nghề làm móng cũng khác nhau theo từng nước, nên hãy xem quy định nơi bạn làm việc." },
      ],
    },
    {
      id: "ghi-lai-dang-mong",
      title: "Ghi lại dáng và độ dài khách đã chọn",
      blocks: [
        { p: "Khách quen muốn lần nào cũng ra đúng bộ móng của mình, kể cả khi hôm đó một người thợ khác làm. Trong VaraaAi, bạn ghi dáng và độ dài vào ghi chú của [khách hàng](lesson:khach-hang), để lần sau ai làm cũng làm giống như vậy. Nếu tiệm có dịch vụ dũa form riêng hoặc gộp vào gói chăm sóc móng, bạn [thêm dịch vụ](lesson:dich-vu) với đúng thời lượng để khách tự đặt. Phần mềm miễn phí cho chủ salon: [xem VaraaAi cho salon](/business)." },
      ],
    },
  ],
  faq: [
    {
      q: "Có bao nhiêu dáng móng tay phổ biến?",
      a: "Bảy dáng hay gặp nhất là vuông, vuông bo góc, tròn, ô van, hạnh nhân, coffin (còn gọi là ba lê) và nhọn stiletto. Chúng khác nhau ở hai cạnh bên đi thẳng hay thon vào, và ở đầu móng thẳng ngang, cong tròn hay nhọn.",
    },
    {
      q: "Dáng móng nào bền nhất cho móng thật?",
      a: "Tròn, ô van và vuông bo góc là những dáng thực tế và chắc nhất cho móng thật, vì đầu móng còn nhiều chất liệu và không có góc sắc để vướng. Đây là xu hướng chung, còn tùy móng của từng người.",
    },
    {
      q: "Tay ngắn, móng rộng nên để dáng móng nào?",
      a: "Ô van hoặc hạnh nhân thường làm ngón tay trông dài và thon hơn. Dáng vuông trên móng rộng dễ làm ngón tay trông ngắn lại.",
    },
    {
      q: "Móng coffin và móng ba lê có khác nhau không?",
      a: "Không, đó là hai tên của cùng một dáng. Hai bên móng thon vào giống hạnh nhân, rồi đầu móng được dũa thẳng ngang như mũi giày múa ba lê. Dáng này cần độ dài nên thường làm trên móng đắp.",
    },
    {
      q: "Móng thật mỏng và mềm có để dáng nhọn được không?",
      a: "Không nên. Dáng thon về một điểm và móng dài dồn lực vào đầu móng, nên móng yếu rất dễ gãy. Móng mỏng, mềm hay tách lớp nên để tròn hoặc ô van ngắn. Muốn hạnh nhân dài hay dáng nhọn thì làm trên móng đắp.",
    },
    {
      q: "Vì sao không nên dũa sâu vào hai bên khóe móng?",
      a: "Hai cạnh bên là phần đỡ của móng. Dũa sâu vào khóe làm móng yếu đi và dễ gãy, và khi móng mọc ra mép móng có thể đâm vào da gây sưng đau. Hai cạnh phải đi thẳng ra từ điểm chịu lực, dáng chỉ tạo ở đầu móng.",
    },
  ],
  related: ["dua-form-mong", "noi-mong-form-hieu-dung", "cham-soc-mong-co-ban-hieu-dung", "gel-hieu-dung"],
};

export default article;
