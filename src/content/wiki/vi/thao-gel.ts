import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/thao-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-thao-son-gel-dung-cach",
  lesson: "thao-gel",
  category: "nail",
  title: "Cách tháo sơn gel đúng cách: 8 bước không làm mỏng móng thật",
  metaTitle: "Cách tháo sơn gel đúng cách: 8 bước không hại móng",
  metaDescription:
    "Hướng dẫn cách tháo sơn gel từng bước: phá lớp top, che da, ủ acetone 10–15 phút, đẩy gel bằng que gỗ, dưỡng móng, cách tháo gel cứng và lỗi hay gặp.",
  keyword: "cách tháo sơn gel",
  keywords: [
    "tháo gel đúng cách",
    "các bước tháo gel",
    "ủ acetone tháo gel bao lâu",
    "tháo sơn gel bằng giấy bạc",
    "cách tháo sơn gel tại nhà",
    "tháo gel cứng",
    "tháo gel không hại móng",
  ],
  excerpt: "Tám bước tháo sơn gel để gel ra hết mà móng thật còn nguyên: phá lớp top, che da, ủ acetone, đẩy nhẹ, làm sạch và dưỡng móng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-thao-gel-cho-khach-tai-salon"),
    alt: "Nữ thợ nail tóc nâu đeo găng đen gỡ lớp giấy bạc quấn đầu ngón tay cho khách nữ tóc vàng tại bàn đá",
  },
  takeaways: [
    "Nguyên tắc duy nhất: **gel phải tự rời ra**. Không lột, không cạy, không cạo.",
    "Dũa phá lớp top cho mất hết độ bóng trước khi ủ, nếu không acetone không ngấm vào được.",
    "Miếng bông thấm acetone chỉ vừa đúng mặt móng; quấn giấy bạc kín và ủ thường **10–15 phút**, theo hướng dẫn của sản phẩm.",
    "Phải ấn mạnh mới ra nghĩa là gel chưa mềm: dừng lại, quấn lại và ủ thêm khoảng 5 phút.",
    "Acetone rất dễ cháy: không nến, không lửa, mở thông gió và đậy nắp chai ngay sau khi lấy.",
  ],
  intro: [
    "Cách tháo sơn gel đúng chỉ xoay quanh một nguyên tắc: gel phải tự rời ra khỏi móng. Người thợ không lột, không cạy, không cạo. Việc của đôi tay là chuẩn bị để hóa chất làm phần của nó, rồi chờ cho đủ.",
    "Bài viết này đi lại tám bước của bài học “Tháo gel an toàn: thực hành từng bước” trong khóa Nghề Nail của VaraaAi Academy, từ câu hỏi đầu tiên với khách đến giọt dầu dưỡng cuối cùng, kèm cách xử lý gel cứng và những lỗi làm móng thật bị mỏng. Nếu bạn muốn hiểu vì sao lột gel lại hại móng đến vậy, hãy đọc thêm bài lý thuyết [Tháo gel có hại móng không](lesson:thao-gel-hieu-dung).",
  ],
  sections: [
    {
      id: "truoc-khi-thao",
      title: "Trước khi tháo gel: tính đủ thời gian và biết mình đang tháo loại gì",
      blocks: [
        { p: "Tháo đúng thì cần thời gian, thường khoảng nửa tiếng cho một bộ. Lúc người thợ dễ lấy cây đẩy ra cạo nhất là lúc đang vội. Khi nhận lịch, hãy tính đủ khoảng thời gian đó để không phải làm tắt." },
        { p: "Việc thứ hai là xác định sản phẩm trên móng. Sơn gel thường thì ủ acetone được. Gel cứng thì không tan, ủ bao lâu cũng vậy, và phải dũa mỏng xuống theo cách ở phần cuối bài. Hỏi khách hai câu: trên móng là sơn gel thường hay gel đắp, và làm ở đâu, bao lâu rồi." },
        { note: "Thời gian ủ trong bài là mức thường gặp. Con số đúng cho chai acetone hoặc dung dịch tháo gel của bạn nằm trong hướng dẫn của hãng.", kind: "info", title: "Luôn theo hướng dẫn của sản phẩm" },
      ],
    },
    {
      id: "meo-khi-u",
      title: "Ủ acetone tháo gel bao lâu, và vài mẹo để gel mềm đều",
      blocks: [
        { p: "Thời gian ủ thường từ 10 đến 15 phút. Trong lúc đó có mấy việc nhỏ quyết định gel có mềm đều hay không." },
        {
          ul: [
            "**Đừng mở ra xem liên tục.** Giấy bạc quấn kín là để hóa chất không bay hơi, mỗi lần mở là mất bớt.",
            "**Tay khách lạnh thì gel mềm chậm hơn.** Có thể phủ thêm một chiếc khăn lên bàn tay cho ấm.",
            "**Quấn và mở theo cùng một thứ tự.** Quấn xong bàn tay thứ nhất rồi mới quấn bàn tay thứ hai, và mở theo đúng thứ tự đó, để tay nào cũng được ủ đủ lâu.",
            "**Mở ngón nào, làm ngay ngón đó.** Mở cả năm ngón cùng lúc thì gel ở những ngón phải chờ sẽ kịp cứng lại.",
          ],
        },
        { img: { src: img("quan-giay-bac-u-thao-gel"), alt: "Thợ nail đeo găng đen gấp miếng giấy bạc ôm sát đầu ngón trỏ của khách, hai ngón bên cạnh đã được quấn kín", caption: "Bóp giấy bạc cho kín quanh đầu ngón để acetone không bay hơi." } },
        { img: { src: img("gel-phong-nut-tu-bong-sau-khi-u-acetone"), alt: "Cận cảnh một móng tay sau khi ủ acetone, lớp gel đỏ đã phồng, nứt thành nhiều mảnh và bong khỏi mặt móng", caption: "Ủ đủ thì gel trông như thế này: phồng, nứt và tự rời khỏi móng." } },
        { p: "Nếu dùng kẹp ủ thay giấy bạc, kẹp có nhiệm vụ giữ miếng bông áp sát vào mặt móng. Cách nào cũng vậy, lấy hóa chất xong là đậy nắp chai lại ngay." },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Những lỗi thường gặp khi tháo sơn gel",
      blocks: [
        {
          table: {
            head: ["Hiện tượng", "Nguyên nhân thường gặp", "Cách sửa"],
            rows: [
              ["Ủ đủ giờ mà gel vẫn trơ ra", "Chưa phá hết lớp top, nhất là vùng sát chân móng và hai bên cạnh", "Dũa lại cho mất hết độ bóng rồi ủ lại"],
              ["Gel mềm không đều, chỗ ra chỗ không", "Dầu dưỡng phủ lên mặt móng nên cản hóa chất, hoặc giấy bạc quấn hở", "Dầu chỉ thoa lên da; bóp giấy bạc cho kín"],
              ["Da quanh móng trắng và khô", "Miếng bông to quá, acetone ngấm ra da", "Cắt bông vừa đúng mặt móng; thoa dầu hoặc kem lên da trước khi ủ"],
              ["Phải ấn mạnh gel mới ra", "Gel chưa mềm", "Dừng, đặt lại bông, quấn lại, ủ thêm khoảng 5 phút"],
              ["Mặt móng có mảng trắng, sần", "Đã cạo cố, lấy theo cả lớp móng thật", "Không sửa được ngay. Dưỡng dầu và chờ móng mọc ra"],
            ],
          },
        },
        { note: "Dựng đứng que lên mà ấn là bạn đang cạo, chứ không còn là đẩy nữa. Que gỗ hay cây đẩy luôn nằm thật nghiêng, gần như theo mặt móng.", kind: "tip", title: "Nhìn góc của que để biết mình đang làm gì" },
      ],
    },
    {
      id: "thao-gel-cung",
      title: "Cách tháo gel cứng không tan trong acetone",
      blocks: [
        { p: "Gel cứng thì không ủ. Dùng dũa tay hạ dần lớp gel xuống cho tới khi chỉ còn một lớp nền thật mỏng, rồi dừng ở đó. Không dũa chạm tới móng thật. Lớp nền này sẽ theo móng tay mọc ra dần." },
        { p: "Máy mài làm việc này nhanh hơn, nhưng chỉ dành cho người đã được đào tạo. Khi dũa và mài, bụi gel bay nhiều, nên đeo găng tay, khẩu trang và dùng máy hút bụi nếu có. Vì sao bụi gel đáng ngại được giải thích trong bài [Dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "an-toan-acetone",
      title: "An toàn khi dùng acetone",
      blocks: [
        {
          ul: [
            "Acetone rất dễ cháy. Trên bàn không có nến, không có lửa.",
            "Phòng phải thông gió.",
            "Đậy nắp chai ngay sau mỗi lần lấy hóa chất.",
            "Đeo găng tay trước khi bắt đầu. Găng ướt hóa chất thì thay đôi mới.",
            "Phủi bụi dũa bằng chổi, không thổi.",
          ],
        },
        { note: "Da quanh móng sưng, đỏ, có mủ hay có vết thương hở thì dừng lại, không làm tiếp, và khuyên khách đi khám.", kind: "warn", title: "Khi nào không làm" },
      ],
    },
    {
      id: "sau-khi-thao",
      title: "Sau khi tháo gel: dưỡng móng, dặn khách và dọn bàn",
      blocks: [
        { p: "Móng vừa tháo trông hơi trắng và khô là do mất nước, thoa dầu sẽ đỡ. Việc tiếp theo tùy vào tình trạng móng thật:" },
        {
          table: {
            head: ["Tình trạng móng", "Làm gì"],
            rows: [
              ["Móng khỏe", "Có thể sơn lại ngay. Khi đó dầu dưỡng để dành đến cuối buổi"],
              ["Móng mỏng, mềm, ấn thấy đau", "Khuyên khách nghỉ gel, thoa dầu mỗi ngày, đeo găng tay khi rửa chén và lau dọn"],
              ["Móng tách khỏi nền móng, đổi màu hay có dấu hiệu nhiễm trùng", "Không sơn, khuyên khách đi khám"],
            ],
          },
        },
        { img: { src: img("nho-dau-duong-len-mong-sau-khi-thao-gel"), alt: "Thợ nail đeo găng đen dùng ống nhỏ giọt nhỏ một giọt dầu dưỡng vàng lên chân móng tự nhiên vừa tháo gel của khách" } },
        { p: "Lời dặn quan trọng nhất trước khi khách về: lần sau gel hở thì đừng tự lột ở nhà, hãy quay lại tiệm." },
        { p: "Khách về rồi, giấy bạc, bông, que gỗ và dũa đã dùng được bỏ vào thùng rác có nắp. Kẹp ủ được làm sạch và khử khuẩn. Cây đẩy kim loại mang đi rửa và tiệt trùng theo quy trình trong bài [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu). Đậy kín chai hóa chất và lau sạch mặt bàn." },
      ],
    },
    {
      id: "dua-thao-gel-len-lich",
      title: "Để khách đặt lịch tháo gel với đủ thời gian",
      blocks: [
        { p: "Vì tháo đúng cần khoảng nửa tiếng, cách chắc nhất để không phải làm vội là để lịch tự chừa chỗ cho nó. Trong VaraaAi, bạn [thêm tháo gel thành một dịch vụ riêng](lesson:dich-vu) với đúng thời lượng mình cần, đưa nó lên [bảng giá](lesson:bang-gia), rồi theo dõi các cuộc hẹn trong [Lịch hẹn](lesson:lich-hen). Như vậy mỗi cuộc hẹn tháo gel đều có đủ thời gian để ủ cho tới khi gel tự bong. Sơn lại thế nào cho bền có trong bài [Cách sơn gel đúng kỹ thuật](lesson:son-gel)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước tháo sơn gel đúng cách",
    id: "cac-buoc-thao-gel",
    after: "truoc-khi-thao",
    lead: "Tám bước dưới đây dành cho sơn gel tan được trong acetone, theo đúng thứ tự của video bài học.",
    supplies: [
      "Dũa 180 và phao chà mịn, mỗi khách một bộ mới",
      "Bông gạc không xơ, cắt nhỏ vừa bằng mặt móng",
      "Giấy bạc cắt sẵn hoặc kẹp ủ",
      "Acetone hoặc dung dịch tháo gel của hãng",
      "Que gỗ và cây đẩy đã tiệt trùng",
      "Dầu dưỡng, găng tay, chổi phủi bụi",
    ],
    steps: [
      {
        name: "Rửa tay, quan sát và hỏi khách",
        text: "Rửa và sát khuẩn tay cho mình và cho khách. Hỏi trên móng là sơn gel thường hay gel đắp, làm ở đâu và bao lâu rồi. Nhìn luôn vùng da quanh móng: nếu sưng, đỏ, có mủ hay có vết thương hở thì dừng lại và khuyên khách đi khám.",
      },
      {
        name: "Bày dụng cụ và chuẩn bị chỗ làm",
        text: "Bày đủ đồ ra bàn trước khi bắt đầu. Mở thông gió, kiểm tra trên bàn không có nến hay lửa, rồi đeo găng tay. Chuẩn bị sẵn thì bạn không phải rời bàn khi tay khách đang quấn giấy bạc.",
        image: { src: img("dung-cu-thao-gel-can-chuan-bi"), alt: "Dụng cụ tháo gel: dũa, phao chà, bông, giấy bạc, kẹp ủ, chai bơm, que gỗ, cây đẩy trong túi tiệt trùng, dầu dưỡng, găng" },
      },
      {
        name: "Dũa phá lớp top",
        text: "Một tay giữ chắc ngón tay khách, đặt mặt dũa nằm trên mặt móng và dũa nhẹ, đều khắp cho tới khi mất hết độ bóng. Thấy bụi đổi sang màu của lớp sơn là đã qua lớp top. Nhớ cả vùng sát chân móng và hai bên cạnh, nhưng không dũa vào da và không dũa xuống tới móng thật. Móng nào gel đã hở sẵn một góc cũng không lấy đó làm chỗ để cạy. Dũa xong, phủi bụi bằng chổi.",
        image: { src: img("dua-pha-lop-top-truoc-khi-thao-gel"), alt: "Thợ nail đeo găng đen đặt mặt dũa xám nằm trên móng sơn gel đỏ của khách, nửa móng đã dũa trở nên mờ", caption: "Mặt dũa nằm phẳng trên móng. Phần đã dũa mất bóng, phần chưa dũa còn bóng." },
      },
      {
        name: "Thoa dầu che da quanh móng",
        text: "Thoa một chút dầu dưỡng hoặc kem lên vùng da quanh móng để bảo vệ da khỏi acetone. Chỉ thoa lên da. Dầu phủ lên mặt móng sẽ cản hóa chất và làm gel mềm không đều.",
      },
      {
        name: "Đặt bông, quấn giấy bạc và ủ",
        text: "Thấm acetone vào miếng bông nhỏ cho ướt đẫm nhưng không nhỏ giọt, đặt lên đúng mặt móng. Quấn giấy bạc quanh đầu ngón và bóp cho kín, hoặc dùng kẹp, làm lần lượt cả năm ngón của một bàn tay. Đậy nắp chai ngay. Ủ thường 10–15 phút, theo hướng dẫn của sản phẩm.",
        image: { src: img("dat-bong-tham-acetone-len-mat-mong"), alt: "Thợ nail đeo găng đen đặt một miếng bông trắng nhỏ lên đúng mặt móng sơn gel đỏ của khách, bên dưới là tờ giấy bạc", caption: "Miếng bông chỉ vừa bằng mặt móng, không trùm ra da." },
      },
      {
        name: "Mở từng ngón và đẩy gel thật nhẹ",
        text: "Hết giờ, mở từng ngón một, theo thứ tự đã quấn. Gel đạt là khi nó phồng lên, nứt ra và tự rời khỏi móng. Đặt que gỗ thật nghiêng, gần như nằm theo mặt móng, rồi đẩy nhẹ từ chân móng ra đầu móng. Nếu phải ấn mạnh mới ra thì dừng ngay, đặt lại bông, quấn lại và ủ thêm khoảng 5 phút.",
        image: { src: img("day-gel-bang-que-go-tu-chan-mong-ra-dau-mong"), alt: "Que gỗ đặt nghiêng trên mặt móng, đẩy những mảnh gel đỏ đã mềm về phía đầu móng, phần chân móng đã sạch gel", caption: "Que gỗ nằm nghiêng theo mặt móng, gel đã mềm gần như tự trượt đi." },
      },
      {
        name: "Làm sạch phần gel còn sót",
        text: "Còn sót chút gel lót mỏng thì lau bằng bông thấm acetone, hoặc lướt phao chà mịn thật nhẹ. Chỉ lướt cho mịn bề mặt, không chà cho móng mỏng đi. Làm lần lượt hết hai bàn tay, rồi mời khách rửa tay với xà phòng cho sạch hóa chất và bụi.",
      },
      {
        name: "Đánh giá móng thật và dưỡng",
        text: "Nhìn kỹ móng thật của khách dưới ánh sáng tốt. Móng khỏe thì có thể sơn lại, khi đó dầu dưỡng để đến cuối buổi. Móng mỏng, mềm, ấn thấy đau thì khuyên khách nghỉ gel và thoa dầu mỗi ngày. Móng tách khỏi nền móng, đổi màu hay có dấu hiệu nhiễm trùng thì không sơn và khuyên khách đi khám.",
        image: { src: img("kiem-tra-mong-that-sau-khi-thao-gel"), alt: "Thợ nail đeo găng đen nâng các đầu ngón tay của khách để xem kỹ móng tự nhiên không sơn trên gối kê tay" },
      },
    ],
  },
  faq: [
    {
      q: "Ủ acetone tháo gel bao lâu?",
      a: "Thường từ 10 đến 15 phút, nhưng mỗi hãng một khác nên hãy làm theo hướng dẫn của sản phẩm. Hết giờ mà gel chưa phồng và nứt thì quấn lại, ủ thêm khoảng 5 phút, không dùng lực để cạo.",
    },
    {
      q: "Vì sao phải dũa lớp top trước khi tháo sơn gel?",
      a: "Lớp top kín như một chiếc áo mưa, được làm ra để chống hóa chất và chống trầy. Không dũa phá lớp top thì acetone không ngấm vào được và ủ bao lâu gel cũng không mềm. Chỉ dũa cho mất hết độ bóng, thấy bụi đổi sang màu lớp sơn là dừng.",
    },
    {
      q: "Miếng bông thấm acetone nên to cỡ nào?",
      a: "Vừa đúng bằng mặt móng. Acetone làm khô da, nên bông càng vừa móng thì da càng ít tiếp xúc với hóa chất. Trước khi ủ, có thể thoa dầu hoặc kem lên vùng da quanh móng để bảo vệ da, nhưng không thoa lên mặt móng.",
    },
    {
      q: "Tháo gel xong có sơn lại ngay được không?",
      a: "Được nếu móng thật khỏe. Móng vừa tháo trông hơi trắng và khô là do mất nước tạm thời. Nếu móng mỏng, mềm hoặc ấn thấy đau thì nên nghỉ gel và thoa dầu mỗi ngày. Móng tách khỏi nền móng, đổi màu hay có dấu hiệu nhiễm trùng thì không sơn và nên đi khám.",
    },
    {
      q: "Gel cứng không tan trong acetone thì tháo thế nào?",
      a: "Gel cứng không ủ được mà phải dũa tay cho mỏng dần, đến khi chỉ còn một lớp nền thật mỏng thì dừng, không dũa chạm tới móng thật. Máy mài chỉ dành cho người đã được đào tạo. Khi dũa cần đeo găng tay, khẩu trang và dùng máy hút bụi nếu có.",
    },
    {
      q: "Tự tháo sơn gel tại nhà cần chú ý gì?",
      a: "Các bước giống như ở tiệm: phá lớp top, ủ acetone bằng bông vừa mặt móng và giấy bạc, rồi đẩy thật nhẹ khi gel đã tự bong. Không lột, không cạy. Acetone rất dễ cháy, nên làm ở nơi thông gió, không có nến hay lửa, và đậy nắp chai ngay sau khi lấy.",
    },
  ],
  related: ["thao-gel-hieu-dung", "son-gel", "gel-hieu-dung", "cham-soc-mong-co-ban"],
};

export default article;
