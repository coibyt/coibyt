import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/dap-bot-acrylic/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-dap-bot-acrylic",
  lesson: "dap-bot-acrylic",
  category: "nail",
  title: "Cách đắp bột acrylic nối móng trên form: 12 bước với kỹ thuật ba hạt bột",
  metaTitle: "Cách đắp bột acrylic: 12 bước, kỹ thuật ba hạt bột",
  metaDescription:
    "Hướng dẫn cách đắp bột acrylic nối móng trên form: primer, gắn form, lấy hạt bột đúng độ ẩm, ba hạt bột, chờ cứng, tháo form, dũa, dặn khách và rửa cọ.",
  keyword: "cách đắp bột",
  keywords: ["cách đắp bột acrylic", "cách đắp bột móng tay", "kỹ thuật đắp bột ba hạt", "cách lấy hạt bột", "đắp bột nối móng trên form", "cách rửa cọ đắp bột", "đắp bột cho người mới"],
  excerpt: "Quy trình đắp bột acrylic nối dài trên form: mười hai bước theo thứ tự, cách lấy hạt bột, vị trí của ba hạt, lúc nào tháo form và cách giữ cây cọ bền.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-dap-bot-noi-mong-tai-ban-co-may-hut"),
    alt: "Nữ thợ nail đeo găng đen làm móng cho khách tại bàn đá trắng có miệng hút tròn, hũ bột hồng và chén liquid đặt bên cạnh",
  },
  takeaways: [
    "Ba điều giữ suốt buổi làm: **hạt bột đúng độ ẩm**, bột không chạm vào da, điểm apex nằm đúng chỗ.",
    "Bật máy hút tại bàn **trước khi mở liquid**. Rót ít liquid vào chén nhỏ có nắp, để xa lửa.",
    "Hạt một ở đầu móng trên form, hạt hai ở vùng chịu lực để dựng apex, hạt ba nhỏ và mỏng gần chân móng.",
    "Chờ bột cứng rồi mới tháo form: gõ nhẹ cán cọ, nghe **tiếng cạch khô** là được.",
    "Rửa cọ bằng chính liquid của hãng, không dùng acetone. Hẹn khách dặm sau 2–3 tuần.",
  ],
  intro: [
    "Cách đắp bột acrylic khác mọi kỹ thuật gel ở một điểm: sản phẩm bắt đầu cứng ngay khi cọ chạm bột, và bạn chỉ có ít phút cho mỗi hạt. Vì vậy người thợ bột không sửa đi sửa lại. Họ đặt đúng chỗ ngay từ đầu, theo một thứ tự cố định gồm ba hạt.",
    "Bài viết đi theo bài học “Đắp bột acrylic: thực hành từng bước” trong khóa Nghề Nail của VaraaAi Academy, phần nối dài bằng bột trên form. Sau bài này bạn biết chuẩn bị bàn, lấy một hạt bột đúng, đắp ba hạt, tháo form đúng lúc, dũa hoàn thiện và chăm cây cọ sau buổi làm.",
  ],
  sections: [
    {
      id: "ba-dieu-xuyen-suot",
      title: "Ba điều xuyên suốt và những thứ cần có trên bàn",
      blocks: [
        {
          ol: [
            "**Hạt bột đúng độ ẩm.** Ẩm, bóng, tròn, không nhỏ giọt, không khô vụn. Lượng liquid trên cọ quyết định điều này.",
            "**Bột không chạm vào da.** Primer cũng vậy. Bột lỡ chạm da thì gạt đi ngay khi còn mềm.",
            "**Điểm apex nằm đúng chỗ.** Hạt thứ hai đặt ở vùng chịu lực, chỗ móng rời khỏi nền da.",
          ],
        },
        { img: { src: img("dung-cu-dap-bot-acrylic-can-chuan-bi"), alt: "Dụng cụ đắp bột bày trên khăn kem: chén thủy tinh có nắp, chai liquid, hũ bột hồng, cọ, primer, form, dũa, phao, chổi và găng tay", caption: "Bàn đắp bột: chén nhỏ có nắp cho liquid, hũ bột, cọ, primer, form, dũa, phao, chổi phủi bụi." } },
        { note: "Bật hệ thống hút tại bàn trước khi mở liquid, và để liquid xa lửa. Tỉ lệ, thời gian khô của primer và thời gian cứng của bột luôn theo hướng dẫn của hãng. Quy định về hút khí và hóa chất khác nhau theo từng nước và thành phố.", kind: "warn", title: "Trước khi mở chai liquid" },
        { p: "Vì sao hạt quá ướt dẫn tới dị ứng, hạt quá khô làm bột hở, và nên chọn liquid thế nào, đã có trong bài lý thuyết [đắp bột là gì](lesson:dap-bot-hieu-dung)." },
      ],
    },
    {
      id: "ky-thuat-ba-hat-bot",
      title: "Kỹ thuật đắp bột ba hạt: mỗi hạt làm một việc",
      blocks: [
        { p: "Chia móng thành ba vùng và giao mỗi vùng cho một hạt. Cách chia này giúp bạn không phải kéo bột đi xa, là việc rất khó khi bột đang cứng dần." },
        {
          table: {
            head: ["Hạt", "Đặt ở đâu", "Nhiệm vụ"],
            rows: [
              ["Hạt một", "Trên form, ngay trước mép móng thật", "Tạo chiều dài, form đầu móng và hai cạnh bên thẳng"],
              ["Hạt hai", "Giữa móng, ở vùng chịu lực", "Dựng điểm apex, nối liền với phần đầu móng"],
              ["Hạt ba", "Gần chân móng, hạt nhỏ hơn", "Vuốt thật mỏng về phía da, chừa khe hở như sợi tóc"],
            ],
          },
        },
        {
          ul: [
            "Ấn và vuốt bằng **thân cọ**, đặt gần như nằm ngang.",
            "Giữa các hạt, lau cọ vào khăn giấy rồi nhúng lại liquid.",
            "Sau hạt ba, vuốt nhẹ cả bề mặt từ chân móng ra đầu móng cho liền và mịn.",
          ],
        },
        { note: "Lúc mới tập, hạt nhỏ dễ điều khiển hơn hạt to. Hãy tập lấy hạt trên móng tập cho tới khi các hạt liền nhau trông giống nhau.", kind: "tip", title: "Cho người mới" },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Lỗi thường gặp khi đắp bột và cách xử lý",
      blocks: [
        {
          table: {
            head: ["Bạn thấy gì", "Nguyên nhân", "Cách xử lý"],
            rows: [
              ["Bột chảy xuống mặt dưới đầu móng", "Form có khe hở dưới đầu móng", "Sửa form cho khít trước khi đặt hạt đầu tiên"],
              ["Hạt nhỏ giọt, chảy ra khóe móng", "Cọ còn quá nhiều liquid", "Gạt cọ vào thành chén kỹ hơn trước khi chạm bột"],
              ["Hạt khô vụn, mặt bột sần", "Cọ quá ít liquid", "Nhúng cọ cho ngấm đều và đừng gạt quá kiệt"],
              ["Đầu móng cong vênh sau khi tháo form", "Tháo form khi bột còn mềm", "Chờ đủ thời gian của hãng, gõ thử nghe tiếng cạch khô rồi mới tháo"],
              ["Khách thấy rát khi dũa", "Ấn dũa mạnh làm mặt móng nóng lên", "Dũa nhẹ tay, không dũa vào móng thật ở chân móng"],
            ],
          },
        },
      ],
    },
    {
      id: "dan-khach-sau-khi-dap-bot",
      title: "Dặn khách sau khi đắp bột",
      blocks: [
        { img: { src: img("bo-mong-dap-bot-acrylic-hoan-thien"), alt: "Hai bàn tay khách đặt chồng lên nhau trên gối kê tay màu kem, mười móng bột màu hồng tự nhiên bóng và đều" } },
        {
          ul: [
            "Đừng cạy, đừng dùng móng làm dụng cụ.",
            "Đeo găng khi rửa chén và lau dọn.",
            "Thoa dầu dưỡng quanh móng mỗi ngày.",
            "Thấy hở thì quay lại tiệm. Đừng tự dán hay tự lột.",
            "Hẹn dặm sau khoảng 2–3 tuần.",
          ],
        },
      ],
    },
    {
      id: "rua-co-dap-bot",
      title: "Cách rửa cọ đắp bột và dọn bàn cuối buổi",
      blocks: [
        { p: "Cây cọ đắp bột hỏng rất nhanh nếu rửa sai cách. Rửa cọ bằng chính liquid của hãng. Không dùng acetone, vì acetone làm khô và hỏng lông cọ. Rửa xong thì lau cọ, vuốt nhọn lại và cất nằm ngang, hoặc theo cách hãng khuyên." },
        { img: { src: img("co-dap-bot-da-rua-sach-dat-nam-ngang"), alt: "Cây cọ đắp bột lông màu kem đã rửa sạch đặt nằm ngang trên khăn giấy, bên cạnh là chén thủy tinh có nắp và hũ bột" } },
        {
          ul: [
            "Đậy kín chén và chai liquid.",
            "Liquid thừa không đổ vào bồn rửa. Xử lý theo bảng dữ liệu an toàn của sản phẩm.",
            "Đồ dùng một lần bỏ vào thùng rác có nắp.",
            "Dụng cụ kim loại mang đi tiệt trùng, theo bài [xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu).",
          ],
        },
      ],
    },
    {
      id: "dich-vu-dap-bot-tren-lich",
      title: "Đưa dịch vụ đắp bột lên lịch và bảng giá của tiệm",
      blocks: [
        { p: "Lịch dặm bột ngắn, nên buổi hẹn kế tiếp cần được đặt sẵn. Trong VaraaAi, bạn [thêm dịch vụ](lesson:dich-vu) đắp bột mới và dặm bột với thời lượng thật, đặt buổi dặm 2–3 tuần sau trên [lịch hẹn](lesson:lich-hen) ngay khi khách thanh toán, và đưa cả hai mức giá lên [bảng giá](lesson:bang-gia) của tiệm." },
      ],
    },
  ],
  howTo: {
    title: "Các bước đắp bột acrylic nối móng trên form",
    id: "cac-buoc-dap-bot-acrylic",
    after: "ba-dieu-xuyen-suot",
    lead: "Mười hai bước theo đúng thứ tự trong video bài học. Từ bước 6 trở đi bột cứng dần theo từng phút, nên mọi thứ phải sẵn sàng trước đó.",
    supplies: [
      "Liquid và bột acrylic cùng một hãng, chén nhỏ có nắp",
      "Cọ đắp bột, khăn giấy, que gỗ",
      "Chất làm khô và primer theo hãng bột",
      "Form nối móng (hoặc móng giả tip)",
      "Cây đẩy da đã tiệt trùng, dũa, phao chà mịn, chổi phủi bụi",
      "Máy hút tại bàn, khẩu trang, găng tay",
      "Top bóng hoặc màu, dầu dưỡng",
    ],
    steps: [
      {
        name: "Tư vấn, kiểm tra và bật máy hút",
        text: "Rửa tay, sát khuẩn tay cho mình và cho khách, rồi nhìn kỹ móng và vùng da quanh móng. Móng tách khỏi nền, đổi màu, da sưng đỏ, có mủ hay có vết thương hở thì không làm và khuyên khách đi khám. Hỏi khách đã từng bị ngứa, đỏ, phồng da sau khi làm móng chưa, muốn dài bao nhiêu, form gì, và nói trước lịch dặm 2–3 tuần. Bật máy hút ở bàn trước khi bắt đầu.",
      },
      {
        name: "Chuẩn bị móng khô",
        text: "Làm như khi [sơn gel](lesson:son-gel): không ngâm nước, đẩy da nhẹ nhàng, lấy sạch lớp da mỏng còn dính trên mặt móng. Dũa ngắn đầu móng cho gọn, chà nhẹ cho mất độ bóng, phủi bụi rồi lau móng. Từ lúc này không chạm tay vào mặt móng nữa.",
      },
      {
        name: "Thoa chất làm khô và primer",
        text: "Dùng đúng loại và đúng cách hãng hướng dẫn. Chỉ một lớp thật mỏng, chỉ trên mặt móng, tránh xa da và khóe móng vì primer có thể làm da bỏng rát. Để khô theo thời gian của hãng.",
      },
      {
        name: "Gắn form",
        text: "Form nằm sát dưới đầu móng, khít, không có khe hở. Nhìn từ trên xuống, form thẳng hàng với ngón tay; nhìn từ cạnh bên, form nối tiếp đường móng, không chúc xuống, không vểnh lên. Có khe hở thì bột chảy xuống dưới, móng vừa xấu vừa yếu. Nếu dùng móng giả tip, dán tip vừa khít bề ngang móng, cắt ngắn và dũa mỏng chỗ nối trước khi đắp. Cách cắt và kiểm tra form có trong bài [cách nối móng bằng form](lesson:noi-mong-form).",
      },
      {
        name: "Rót liquid và làm ướt cọ",
        text: "Rót một ít liquid vào chén nhỏ có nắp, vừa đủ cho một khách, rồi mở hũ bột. Nhúng cọ vào liquid cho ngấm đều, gạt nhẹ cọ vào thành chén để bớt phần thừa. Cọ giữ nhiều hay ít liquid chính là thứ quyết định hạt bột ướt hay khô.",
        image: { src: img("gat-co-vao-thanh-chen-liquid"), alt: "Bàn tay đeo găng đen gạt đầu cọ đắp bột vào thành một chén thủy tinh nhỏ đựng liquid trong, nắp chén đặt bên cạnh" },
      },
      {
        name: "Lấy hạt bột",
        text: "Chạm đầu cọ vào mặt bột, giữ yên một chút để liquid thấm lên bột thành một hạt tròn, rồi nhấc cọ lên. Nhìn hạt bột trước khi đặt: ẩm, bóng, tròn, không nhỏ giọt, không khô vụn. Hạt chưa đúng thì lau cọ và lấy lại, đừng đặt lên móng khách.",
      },
      {
        name: "Hạt một: đầu móng",
        text: "Đặt hạt thứ nhất trên form, ngay trước mép móng thật. Đợi một chút cho hạt dàn ra, rồi dùng thân cọ ấn nhẹ và vuốt thành phần đầu móng nối dài. Giữ hai cạnh bên thẳng, nối tiếp cạnh móng thật. Chiều dài và form đầu móng được tạo ngay từ hạt này.",
        image: { src: img("hat-bot-thu-nhat-tren-form-o-dau-mong"), alt: "Một hạt bột hồng tròn vừa được đặt lên tấm form kim loại ngay trước mép móng thật, cây cọ ở phía trên", caption: "Hạt một nằm trên form, sát mép móng thật." },
      },
      {
        name: "Hạt hai: vùng chịu lực",
        text: "Đặt hạt thứ hai ở giữa móng, vùng chịu lực, chỗ móng rời khỏi nền da. Đây là hạt dựng nên điểm apex. Ấn nhẹ, vuốt cho nó nối liền với phần đầu móng và dàn ra hai bên cho đều.",
        image: { src: img("hat-bot-thu-hai-o-vung-chiu-luc"), alt: "Phần đầu móng bằng bột hồng đã vuốt phẳng trên form, một hạt bột thứ hai nằm ở giữa móng, cọ đang chạm vào phần đầu", caption: "Hạt hai đặt ở giữa móng để dựng apex." },
      },
      {
        name: "Hạt ba: gần chân móng",
        text: "Hạt thứ ba nhỏ hơn, đặt gần chân móng. Vuốt thật mỏng, mỏng dần về phía da, và chừa một khe hở nhỏ như sợi tóc. Bột tuyệt đối không chạm vào da; lỡ chạm thì dùng đầu cọ hay que gỗ gạt đi ngay khi bột còn mềm. Cuối cùng vuốt nhẹ cả bề mặt từ chân móng ra đầu móng.",
        image: { src: img("hat-bot-thu-ba-mong-gan-chan-mong"), alt: "Đầu cọ nhỏ vuốt lớp bột hồng thật mỏng ở vùng gần chân móng, giữa bột và da còn một khe hở mảnh" },
      },
      {
        name: "Chờ bột cứng, tháo form và kiểm tra",
        text: "Thời gian cứng tùy hãng, thường chỉ vài phút. Gõ nhẹ cán cọ lên mặt móng: nghe tiếng cạch khô và rõ là bột đã cứng. Tháo form nhẹ nhàng, kéo xuống phía dưới, không bẻ ngược lên. Trước khi dũa, nhìn từ cạnh bên (mỏng ở chân móng, cao nhất ở vùng chịu lực, mỏng dần ra đầu móng), từ đầu móng (độ cong chữ C đều) và từ trên xuống (hai cạnh thẳng, đầu móng cân đối).",
        image: { src: img("mong-bot-da-cung-sau-khi-thao-form"), alt: "Một móng bột nối dài dáng vuông bo màu hồng tự nhiên, bề mặt còn mờ chưa dũa, hai cạnh bên thẳng và song song", caption: "Sau khi tháo form: mặt bột còn mờ, hai cạnh bên thẳng, không có bột trên da." },
      },
      {
        name: "Dũa hoàn thiện",
        text: "Máy hút đang chạy, đeo khẩu trang, và dũa nhẹ tay. Dũa đầu móng cho đúng form, hai cạnh bên cho thẳng, rồi dũa mặt móng cho mịn và đều mà vẫn giữ điểm apex. Ở chân móng, dũa cho thật mỏng, liền với móng thật nhưng không dũa vào móng thật. Lướt phao chà mịn, phủi bụi bằng chổi, không thổi, rồi lau sạch.",
        image: { src: img("dua-canh-ben-mong-bot-cho-thang"), alt: "Cây dũa xám áp dọc theo cạnh bên của một móng bột hồng dáng vuông, găng đen của thợ dính bụi dũa" },
      },
      {
        name: "Top hoặc màu, dầu dưỡng",
        text: "Khách thích tự nhiên thì một lớp top bóng là đủ. Muốn có màu thì sơn lên trên, mỏng và đều như khi sơn gel. Sau đó nhỏ dầu dưỡng quanh móng, xoa nhẹ, dặn khách cách giữ móng và hẹn luôn lịch dặm.",
      },
    ],
  },
  faq: [
    {
      q: "Đắp bột ba hạt là đặt hạt ở những đâu?",
      a: "Hạt một đặt trên form, ngay trước mép móng thật, để tạo chiều dài và form đầu móng. Hạt hai đặt ở giữa móng, vùng chịu lực, để dựng điểm apex. Hạt ba nhỏ hơn, đặt gần chân móng và vuốt thật mỏng, không chạm da.",
    },
    {
      q: "Lấy hạt bột thế nào cho đúng?",
      a: "Nhúng cọ vào liquid cho ngấm đều, gạt nhẹ vào thành chén, rồi chạm đầu cọ vào mặt bột và giữ yên một chút cho thành hạt tròn. Hạt đúng thì ẩm, bóng, tròn, không nhỏ giọt và không khô vụn. Người mới nên lấy hạt nhỏ vì dễ điều khiển hơn.",
    },
    {
      q: "Làm sao biết bột đã cứng để tháo form?",
      a: "Chờ đủ thời gian hãng hướng dẫn, thường là vài phút, rồi gõ nhẹ cán cọ lên mặt móng. Nghe tiếng cạch khô và rõ là bột đã cứng. Tháo form khi bột còn mềm sẽ làm đầu móng cong vênh.",
    },
    {
      q: "Rửa cọ đắp bột bằng gì?",
      a: "Bằng chính liquid của hãng. Không dùng acetone, vì acetone làm khô và hỏng lông cọ. Rửa xong lau cọ, vuốt nhọn lại và cất nằm ngang hoặc theo cách hãng khuyên.",
    },
    {
      q: "Đắp bột trên form hay trên tip?",
      a: "Bài học làm trên form: form đặt khít dưới đầu móng và bột được đắp lên trên. Nếu dùng móng giả tip thì dán tip vừa khít bề ngang móng, cắt ngắn và dũa mỏng chỗ nối trước khi đắp bột. Các bước sau đó giống nhau.",
    },
    {
      q: "Bột lỡ dính vào da thì làm gì?",
      a: "Gạt đi ngay bằng đầu cọ hoặc que gỗ khi bột còn mềm. Bột và liquid chưa cứng không được nằm trên da, vì đó là nguồn gây dị ứng và cũng là chỗ bột sẽ hở trước tiên.",
    },
  ],
  related: ["dap-bot-hieu-dung", "noi-mong-form", "fill-mong", "builder-gel"],
};

export default article;
