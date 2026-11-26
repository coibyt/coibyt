import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dua-form-mong/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-dua-mong-tay",
  lesson: "dua-form-mong",
  category: "nail",
  title: "Cách dũa móng tay đẹp và đều: 10 bước cho 7 dáng, từ vuông đến stiletto",
  metaTitle: "Cách dũa móng tay đẹp: 10 bước cho 7 dáng móng",
  metaDescription:
    "Hướng dẫn cách dũa móng tay từng bước: tạo độ dài đều, tìm đường giữa, đường dũa của dáng vuông, tròn, ô van, hạnh nhân, coffin, stiletto và cách kiểm tra.",
  keyword: "cách dũa móng tay",
  keywords: ["cách dũa móng tay đẹp", "dũa form móng", "cách dũa móng vuông bo góc", "cách dũa móng ô van", "cách dũa móng hạnh nhân", "dũa móng một chiều", "dũa móng tay tại nhà"],
  excerpt: "Quy trình dũa form móng đầy đủ: độ dài trước, dáng sau, đường dũa của bảy dáng và cách kiểm tra để mười móng ra đều nhau.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-dua-form-mong-cho-khach-tai-salon"),
    alt: "Thợ nail tóc nâu đỏ mặc áo kem, đeo găng đen cầm dũa làm móng cho khách tóc vàng trong salon kiểu Paris có đèn chùm",
  },
  takeaways: [
    "**Độ dài trước, dáng sau:** mười móng phải cùng một độ dài rồi mới bắt đầu tạo dáng.",
    "Mọi dáng đều xuất phát từ hai điểm chịu lực và đường giữa: hai cạnh đi thẳng ra, mũi móng nằm trên đường giữa.",
    "Móng thật dùng **dũa mịn, dũa một chiều**, nhẹ tay. Dũa thô hơn chỉ dành cho móng đắp.",
    "Giữ ngón tay khách nằm thẳng và giữ cùng một góc dũa ở hai bên, nếu không móng sẽ lệch mà bạn không nhận ra.",
    "Kiểm tra từng móng từ trên xuống, từ đầu móng, rồi so cả mười móng và nhìn từ phía khách.",
  ],
  intro: [
    "Cách dũa móng tay đúng không bắt đầu bằng việc tạo dáng. Nó bắt đầu bằng độ dài: mười móng bằng nhau trước, rồi cây dũa mới đi vào từng đường xiên, từng góc bo. Người mới học hay làm ngược lại, và kết quả là mười móng ra mười dáng hơi khác nhau.",
    "Bài viết này viết lại bài học “Dũa form móng: thực hành từng bước” trong khóa Nghề Nail của VaraaAi Academy. Bạn sẽ đi qua mười bước, trong đó có đường dũa riêng của bảy dáng: vuông, vuông bo góc, tròn, ô van, hạnh nhân, coffin và stiletto. Hãy xem video bài học bên dưới để nhìn góc cầm dũa, rồi đọc lại từng bước khi luyện tay.",
  ],
  sections: [
    {
      id: "ba-dieu-xuyen-suot",
      title: "Ba điều giữ suốt buổi dũa form móng",
      blocks: [
        { p: "Dáng nào cũng vậy, móng thật hay móng đắp cũng vậy, có ba điều không đổi từ móng đầu tiên đến móng thứ mười." },
        {
          ol: [
            "**Mười móng cùng độ dài.** Có cùng độ dài thì mới dũa ra cùng một dáng.",
            "**Mũi móng nằm trên đường giữa.** Mắt luôn nhìn vào đường giữa của móng khi dũa.",
            "**Không dũa sâu vào hai khóe móng.** Dáng được tạo ở đầu móng, hai cạnh bên vẫn phải đi thẳng ra từ điểm chịu lực.",
          ],
        },
        { p: "Nếu bạn chưa chắc dáng nào hợp với bàn tay và móng thật của khách, hãy đọc trước bài lý thuyết về [các dáng móng tay và cách chọn](lesson:dua-form-mong-hieu-dung). Bài này chỉ nói về đôi tay cầm dũa." },
      ],
    },
    {
      id: "ghi-nho-tung-dang",
      title: "Điều cần nhớ ở từng dáng móng",
      blocks: [
        { p: "Đường dũa đã có trong các bước ở trên. Bảng dưới đây gom những lưu ý ngắn mà bạn nên thuộc trước khi nhận khách." },
        {
          table: {
            head: ["Dáng", "Điều cần nhớ", "Làm trên móng nào"],
            rows: [
              ["Vuông", "Đẹp nhất khi móng ngắn đến vừa; móng càng dài, góc vuông càng dễ gãy", "Móng thật hoặc móng đắp"],
              ["Vuông bo góc", "Hai góc phải bo bằng nhau", "Móng thật hoặc móng đắp"],
              ["Tròn", "Đầu móng là một đường cong đều, không có chỗ thẳng; hợp khách nam và người làm việc bằng tay nhiều", "Móng thật ngắn"],
              ["Ô van", "Đầu tròn nằm đúng trên đường giữa; dũa hai bên quá sâu sẽ thành hạnh nhân", "Móng dài hơn một chút"],
              ["Hạnh nhân", "Ngắn đến vừa là đẹp và bền nhất trên móng thật", "Móng thật khỏe hoặc móng đắp"],
              ["Coffin", "Hai cạnh xiên dài bằng nhau, đầu bằng nằm chính giữa", "Cần độ dài, thường là móng đắp"],
              ["Stiletto", "Mũi nhọn ngay chính giữa", "Chỉ móng đắp hoặc móng thật rất khỏe"],
            ],
          },
        },
        { note: "Trên móng đắp, bạn dùng dũa thô hơn và nhẹ tay ở vùng sát móng thật. Cách dựng một chiếc móng dài để dũa coffin hay stiletto có trong bài [nối móng bằng form](lesson:noi-mong-form).", kind: "info", title: "Khi dũa móng đắp" },
      ],
    },
    {
      id: "loi-khi-dua-mong",
      title: "Lỗi thường gặp khi dũa móng tay và cách sửa",
      blocks: [
        { p: "Móng lệch hiếm khi do cây dũa. Nó thường đến từ tư thế của ngón tay khách, hoặc từ việc tay thợ đổi góc giữa bên trái và bên phải." },
        { img: { src: img("loi-mui-mong-lech-khoi-duong-giua"), alt: "Cận cảnh một móng hồng sữa bị dũa lệch, một bên vát thẳng còn bên kia đầy, mũi móng nằm lệch hẳn khỏi đường giữa", caption: "Hình minh họa lỗi: một bên bị dũa nhiều hơn nên mũi móng lệch khỏi đường giữa." } },
        {
          table: {
            head: ["Hiện tượng", "Nguyên nhân thường gặp", "Cách sửa"],
            rows: [
              ["Móng lệch về một bên", "Ngón tay khách nằm nghiêng nên cây dũa nghiêng theo", "Giữ ngón tay khách nằm thẳng, mắt nhìn vào đường giữa"],
              ["Hai bên không bằng nhau", "Góc dũa bên trái khác bên phải", "Giữ cùng một góc dũa; dũa xong một bên thì nhìn lại từ trên xuống rồi mới dũa bên kia"],
              ["Mười móng không cùng dáng", "Tạo dáng khi độ dài chưa đều", "Quay lại làm đều độ dài, rồi mới chỉnh dáng"],
              ["Đầu móng tách lớp", "Kéo cưa qua lại, hoặc dùng dũa quá thô trên móng thật", "Dũa một chiều bằng dũa mịn"],
              ["Ô van thành hạnh nhân", "Dũa hai bên vào quá sâu", "Dừng sớm, hình dung đầu móng là đầu nhỏ của một quả trứng"],
              ["Móng yếu, dễ gãy ở hai bên", "Dũa sâu vào hai khóe móng", "Để hai cạnh đi thẳng ra từ điểm chịu lực"],
            ],
          },
        },
        { note: "Làm cùng một bước trên cả năm ngón rồi mới sang bước sau: dũa cạnh trái của cả năm móng, rồi cạnh phải của cả năm móng, rồi mới tạo đầu móng. Tay giữ được một góc dũa và các móng ra đều nhau hơn.", kind: "tip", title: "Mẹo của nhiều thợ" },
      ],
    },
    {
      id: "ve-sinh-an-toan",
      title: "Vệ sinh dụng cụ và những lúc không nên dũa",
      blocks: [
        { p: "Dũa form là dịch vụ nhẹ nhàng, nhưng vẫn là việc chạm vào móng và da của khách bằng dụng cụ. Các quy tắc vệ sinh không được nới ra." },
        {
          ul: [
            "Dụng cụ dùng chung như kềm cắt móng phải được làm sạch và khử khuẩn sau mỗi khách, theo quy trình trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu).",
            "Dũa và phao chà loại dùng một lần thì mỗi khách một cái mới.",
            "Bụi dũa từ móng đắp thì hút đi, không thổi.",
            "Móng có dấu hiệu bệnh hay da quanh móng sưng đỏ thì không làm. Bài [Khi nào không nên làm](lesson:khi-nao-khong-lam) nói rõ các dấu hiệu này.",
          ],
        },
        { note: "Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề. Quy định về vệ sinh và về nghề làm móng khác nhau theo từng nước, bạn cần xem quy định nơi mình làm việc.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "dan-khach-va-ghi-ho-so",
      title: "Dặn khách khi móng bị mẻ và ghi lại dáng đã chọn",
      blocks: [
        { img: { src: img("nho-dau-duong-sau-khi-dua-mong"), alt: "Thợ nail đeo găng đen cầm ống nhỏ giọt, nhỏ dầu dưỡng vàng lên vùng da chân móng của khách đặt tay trên gối kê" } },
        { p: "Lời dặn trước khi khách về rất ngắn: móng mẻ hay bị vướng thì đừng cắn, đừng xé. Khách có thể dùng một cây dũa mịn, dũa nhẹ một chiều, hoặc quay lại tiệm để thợ sửa." },
        { p: "Việc cuối cùng là ghi dáng và độ dài khách đã chọn vào hồ sơ. Trong VaraaAi, bạn ghi vào ghi chú của [khách hàng](lesson:khach-hang) ngay sau buổi làm, để lần sau không phải hỏi lại và ai làm cũng ra đúng bộ móng đó. Nếu khách muốn giữ dáng đều, bạn đặt luôn buổi kế tiếp trên [lịch hẹn](lesson:lich-hen) trước khi khách rời bàn." },
      ],
    },
  ],
  howTo: {
    title: "Các bước dũa móng tay theo từng dáng",
    id: "cac-buoc-dua-mong",
    after: "ba-dieu-xuyen-suot",
    lead: "Mười bước theo thứ tự của video bài học. Bốn bước đầu giống nhau cho mọi dáng, bốn bước giữa là đường dũa riêng của từng dáng, hai bước cuối là kiểm tra và hoàn thiện.",
    supplies: [
      "Kềm cắt móng đã làm sạch và khử khuẩn",
      "Dũa mịn cho móng thật, thường từ 180 trở lên",
      "Dũa thô hơn nếu làm trên móng đắp",
      "Phao chà mịn",
      "Cọ mềm phủi bụi, máy hút bụi nếu dũa móng đắp",
      "Dầu dưỡng da quanh móng",
      "Hình các dáng móng để khách chọn",
    ],
    steps: [
      {
        name: "Kiểm tra móng và thống nhất dáng với khách",
        text: "Rửa tay, sát khuẩn tay cho mình và cho khách, rồi nhìn kỹ móng và da quanh móng. Hỏi khách thích dáng nào và dài bao nhiêu, cho khách xem hình các dáng. Nói thật dáng nào hợp với móng của khách trước khi bắt đầu, vì dũa rồi thì không dài lại được.",
      },
      {
        name: "Tạo độ dài đều cho mười móng",
        text: "Móng dài nhiều thì cắt bớt bằng kềm cắt móng, từng chút một, và chừa dư một chút để dũa. Móng chỉ dài hơn một chút thì dũa ngang cho ngắn lại. Nếu có một móng gãy ngắn, độ dài chung đi theo móng ngắn nhất, hoặc bạn nối riêng móng đó.",
        image: { src: img("cat-bot-do-dai-mong-truoc-khi-dua"), alt: "Thợ nail đeo găng đen dùng kềm cắt bớt đầu móng trỏ tự nhiên của khách, bàn tay khách đặt trên gối kê màu kem", caption: "Cắt từng chút và chừa dư để dũa. Tạo dáng chỉ bắt đầu khi mười móng đã bằng nhau." },
      },
      {
        name: "Tìm đường giữa và hai điểm chịu lực",
        text: "Nhìn móng từ trên xuống rồi từ đầu móng. Xác định đường giữa của móng, sau đó tìm hai điểm chịu lực, là chỗ móng bắt đầu rời khỏi nền da ở hai bên. Mọi dáng đều bắt đầu từ đây: hai cạnh đi thẳng ra từ điểm chịu lực, mũi móng nằm trên đường giữa.",
      },
      {
        name: "Cầm dũa nhẹ tay và dũa một chiều",
        text: "Đặt dũa hơi nghiêng dưới đầu móng. Với móng thật, dùng dũa mịn và dũa một chiều từ cạnh bên vào giữa, không kéo cưa qua lại vì móng nóng lên và dễ tách lớp ở đầu. Giữ ngón tay khách nằm thẳng: ngón nghiêng thì dũa nghiêng theo và móng lệch về một bên.",
        image: { src: img("dua-mong-mot-chieu-duoi-dau-mong"), alt: "Thợ nail đặt cây dũa hơi nghiêng dưới đầu móng trỏ tự nhiên của khách, một ít bụi trắng mịn bám trên găng đen" },
      },
      {
        name: "Dũa dáng vuông và vuông bo góc",
        text: "Dáng vuông: đặt dũa vuông góc với ngón tay, dũa thẳng ngang đầu móng, rồi dũa hai cạnh bên cho thẳng và song song. Lướt nhẹ qua hai góc chỉ để bớt sắc, không bị vướng. Vuông bo góc làm y như vậy trước, sau đó bo tròn hai góc nhiều hơn một chút, mỗi góc vài đường dũa ngắn theo hình vòng cung.",
        image: { src: img("dua-mong-vuong-bo-goc"), alt: "Cận cảnh một móng hồng sữa dáng vuông bo góc nhìn từ trên xuống, đầu móng thẳng ngang và hai góc bo tròn nhẹ", caption: "Vuông bo góc: đầu móng vẫn thẳng ngang, hai góc bo bằng nhau." },
      },
      {
        name: "Dũa dáng tròn và ô van",
        text: "Dáng tròn dành cho móng ngắn: dũa từ một cạnh theo đường cong của đầu ngón tay lên tới chính giữa, rồi làm bên kia y như vậy. Dáng ô van cần móng dài hơn một chút: hai bên dũa cong vào đều nhau, gặp nhau ở một đầu tròn nằm đúng trên đường giữa. Đừng dũa hai bên vào quá sâu, kẻo ô van thành hạnh nhân.",
        image: { src: img("dua-mong-o-van-dau-tron"), alt: "Cận cảnh một móng hồng sữa dáng ô van trên ngón tay khách, hai bên cong đều về một đầu tròn rộng như quả trứng" },
      },
      {
        name: "Dũa dáng hạnh nhân",
        text: "Giữ hai cạnh thẳng từ điểm chịu lực, rồi dũa xiên từ mỗi bên vào giữa cho móng thon dần thành một mũi tròn mềm. Dũa xong một bên, nhìn lại từ trên xuống rồi mới dũa bên kia để hai bên bằng nhau. Trên móng thật khỏe, hạnh nhân ngắn đến vừa là đẹp và bền nhất.",
        image: { src: img("dua-mong-hanh-nhan-mui-tron-mem"), alt: "Cận cảnh một móng hồng sữa dáng hạnh nhân, hai bên thon dần về một mũi tròn mềm nằm giữa ngón tay", caption: "Hạnh nhân: mũi móng tròn mềm, nằm đúng đường giữa." },
      },
      {
        name: "Dũa dáng coffin và stiletto",
        text: "Coffin: dũa xiên hai bên giống hạnh nhân nhưng dừng sớm hơn, rồi đặt dũa vuông góc và dũa thẳng ngang đầu móng, chừa lại một đầu bằng nhỏ ở chính giữa. Stiletto: hai bên xiên dốc hơn nữa tới một mũi nhọn ngay giữa. Coffin cần độ dài nên thường làm trên móng đắp; stiletto chỉ làm trên móng đắp hoặc móng thật rất khỏe.",
        image: { src: img("dua-mong-coffin-dau-bang"), alt: "Cận cảnh một móng dài màu hồng sữa dáng coffin, hai cạnh thon vào và đầu móng được dũa bằng thành một cạnh ngang nhỏ" },
      },
      {
        name: "Kiểm tra đối xứng từng móng",
        text: "Nhìn từ trên xuống xem mũi móng có nằm giữa và hai bên có bằng nhau không. Xoay ngón tay, nhìn từ đầu móng xem hai cạnh có cân không. Đặt hai bàn tay cạnh nhau để so cả mười móng, rồi xoay tay khách lại và nhìn đúng như khách sẽ nhìn tay mình. Chỗ nào lệch thì sửa ngay bằng vài đường dũa nhẹ.",
      },
      {
        name: "Mài mịn mép, phủi bụi và thoa dầu dưỡng",
        text: "Lướt phao chà mịn thật nhẹ dưới mép đầu móng cho hết những sợi xơ nhỏ. Phủi sạch bụi bằng cọ mềm; bụi dũa từ móng đắp thì hút đi, đừng thổi. Cuối cùng nhỏ dầu dưỡng lên da quanh móng và xoa nhẹ.",
        image: { src: img("mai-min-mep-dau-mong-bang-phao"), alt: "Thợ nail áp một phao chà trắng vào mép đầu móng trỏ của khách để mài mịn, tay khách đặt trên gối kê màu kem" },
      },
    ],
  },
  faq: [
    {
      q: "Dũa móng tay một chiều hay kéo qua lại?",
      a: "Với móng thật, dũa một chiều từ cạnh bên vào giữa, bằng dũa mịn và nhẹ tay. Kéo cưa qua lại làm móng nóng lên và đầu móng dễ tách lớp.",
    },
    {
      q: "Nên cắt móng trước hay dũa dáng trước?",
      a: "Tạo độ dài trước, tạo dáng sau. Móng dài nhiều thì cắt bớt từng chút bằng kềm và chừa dư để dũa, móng chỉ hơi dài thì dũa ngang. Khi mười móng đã cùng độ dài mới bắt đầu tạo dáng.",
    },
    {
      q: "Dũa móng thật nên dùng dũa số bao nhiêu?",
      a: "Số trên cây dũa càng lớn thì dũa càng mịn. Móng thật dùng dũa mịn, thường từ 180 trở lên. Dũa thô hơn chỉ dành cho móng đắp gel cứng hay đắp bột.",
    },
    {
      q: "Cách dũa móng vuông bo góc như thế nào?",
      a: "Dũa như dáng vuông trước: đầu móng thẳng ngang, hai cạnh bên thẳng và song song. Sau đó bo tròn hai góc bằng vài đường dũa ngắn theo hình vòng cung, hai góc bo bằng nhau.",
    },
    {
      q: "Làm sao để dũa móng đều hai bên?",
      a: "Giữ ngón tay khách nằm thẳng, mắt nhìn vào đường giữa của móng và giữ cùng một góc dũa ở cả hai bên. Dũa xong một bên thì nhìn lại từ trên xuống rồi mới dũa bên kia. Nhiều thợ làm cùng một bước trên cả năm ngón rồi mới sang bước sau để tay giữ được một góc dũa.",
    },
    {
      q: "Móng bị mẻ ở nhà thì nên làm gì?",
      a: "Đừng cắn và đừng xé phần móng mẻ. Dùng một cây dũa mịn, dũa nhẹ một chiều cho hết chỗ vướng, hoặc quay lại tiệm để thợ sửa lại dáng.",
    },
  ],
  related: ["dua-form-mong-hieu-dung", "cham-soc-mong-co-ban", "son-gel", "noi-mong-form"],
};

export default article;
