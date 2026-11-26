import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/builder-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-dap-builder-gel",
  lesson: "builder-gel",
  category: "nail",
  title: "Cách đắp builder gel trên móng thật: 10 bước từ lớp lót đến điểm apex",
  metaTitle: "Cách đắp builder gel trên móng thật: 10 bước chuẩn",
  metaDescription:
    "Hướng dẫn cách đắp builder gel (BIAB) trên móng thật: chuẩn bị khô, lớp lót mỏng, đặt hạt gel, dẫn gel, úp tay tạo apex, hơ đèn, dũa hoàn thiện, lỗi hay gặp.",
  keyword: "cách đắp builder gel",
  keywords: ["các bước đắp builder gel", "cách làm BIAB trên móng thật", "cách tạo apex builder gel", "đắp gel cứng móng thật", "kỹ thuật dẫn gel", "dũa builder gel", "đắp builder gel cho người mới"],
  excerpt: "Quy trình đắp một lớp builder gel trên móng thật, không nối dài: mười bước theo đúng thứ tự, mẹo lấy hạt gel, cách úp tay tạo apex và những lỗi cần tránh.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-dap-builder-gel-cho-khach-tai-salon"),
    alt: "Nữ thợ nail đeo găng đen đang làm móng cho khách tại bàn đá trắng trong một salon kiểu Paris có đèn chùm pha lê",
  },
  takeaways: [
    "Ba điều giữ suốt buổi làm: **chuẩn bị móng khô và kỹ**, gel không chạm vào da, dựng điểm apex đúng chỗ.",
    "Đặt hạt gel ở **giữa móng**, rồi dẫn nhẹ về chân móng, ra hai cạnh và đầu móng. Lấy ít gel trước, vì thêm thì dễ, bớt mới khó.",
    "**Úp ngón tay khách xuống vài giây** để gel tự dồn về giữa thành điểm apex, rồi kiểm tra từ cạnh bên và từ đầu móng.",
    "Hai lớp vừa phải tốt hơn một lớp quá dày: dễ tạo dáng hơn và ít nóng hơn khi hơ.",
    "Khi dũa hoàn thiện, không dũa vào móng thật ở chân móng và không dũa mất apex. Hẹn lịch dặm sau 3–4 tuần trước khi khách về.",
  ],
  intro: [
    "Cách đắp builder gel trên móng thật không đòi hỏi đôi tay thật khéo, nhưng đòi hỏi làm đúng thứ tự. Gel đặc và tự chảy, nên phần lớn công việc là đặt gel đúng chỗ rồi để nó tự tìm hình dáng. Người thợ chỉ dẫn đường và dừng lại đúng lúc.",
    "Bài viết đi theo bài học “Builder gel trên móng thật: thực hành từng bước” trong khóa Nghề Nail của VaraaAi Academy. Đây là một lớp builder gel (BIAB) phủ trên móng của khách, không nối dài. Sau bài này bạn làm được trọn một bộ: từ tư vấn, lớp lót, hạt gel, điểm apex cho tới lúc dũa hoàn thiện và hẹn lịch dặm.",
  ],
  sections: [
    {
      id: "ba-dieu-xuyen-suot",
      title: "Ba điều xuyên suốt khi đắp builder gel",
      blocks: [
        { p: "Mười bước bên dưới có nhiều chi tiết, nhưng tất cả phục vụ ba việc. Nhớ ba việc này thì khi quên một chi tiết, bạn vẫn tự suy ra được cách làm đúng." },
        {
          ol: [
            "**Chuẩn bị móng khô và kỹ.** Gel chỉ bám lên mặt móng sạch, khô, đã mất độ bóng. Phần này làm giống hệt bài [cách sơn gel](lesson:son-gel).",
            "**Gel không chạm vào da.** Gel tràn lên da thì da mọc lên sẽ đẩy gel hở ra, và gel chưa chín dính da là nguồn gây dị ứng.",
            "**Dựng điểm apex đúng chỗ.** Lớp gel mỏng ở chân móng, mỏng ở đầu móng, cao nhất trên vùng chịu lực, nơi móng rời khỏi nền da.",
          ],
        },
        { p: "Nếu bạn chưa rõ vì sao lớp gel phải có điểm cao nhất, hoặc khách nào không nên làm dịch vụ này, hãy đọc bài lý thuyết [builder gel là gì](lesson:builder-gel-hieu-dung) trước khi cầm cọ." },
      ],
    },
    {
      id: "mot-lop-hay-hai-lop",
      title: "Một lớp hay hai lớp builder gel, và làm gì khi khách thấy nóng",
      blocks: [
        { p: "Một lớp đã đủ dày và đẹp thì không cần thêm. Móng yếu, hoặc nhìn từ cạnh bên thấy apex chưa đủ, thì làm thêm một lớp mỏng nữa theo đúng cách cũ: đặt hạt gel, dẫn gel, úp tay và hơ." },
        { img: { src: img("dan-builder-gel-ra-dau-mong"), alt: "Cọ dẹt dẫn lớp builder gel hồng trong ra sát mép đầu móng của một ngón tay được thợ giữ bằng găng đen", caption: "Lớp thứ hai cũng được dẫn ra tới mép đầu móng và bọc kín mép, giống lớp đầu." } },
        { p: "Lý do không dồn hết vào một lớp: gel tỏa nhiệt khi chín, lớp càng dày càng nóng. Một lớp dày cũng khó tạo dáng hơn, vì có nhiều gel để chảy ra mép." },
        {
          ul: [
            "Đèn có chế độ nhiệt thấp, hoặc hãng hướng dẫn hơ nhanh vài giây trước, thì làm đúng như vậy rồi mới hơ đủ thời gian.",
            "Khách thấy nóng rát: cho khách rút tay ra vài giây, rồi đưa vào lại. Tổng thời gian hơ vẫn phải đủ.",
            "Tay đưa sâu vào trong đèn, cả móng nằm trọn dưới ánh đèn. Móng nằm lệch ra ngoài sẽ có chỗ chưa chín.",
          ],
        },
        { note: "Thời gian hơ, chế độ đèn và cách làm lớp lót (hơ hay không hơ) luôn theo hướng dẫn của hãng sản phẩm bạn đang dùng. Hơ thiếu thì gel chưa chín, vừa dễ bong vừa dễ gây dị ứng.", kind: "warn", title: "Theo hướng dẫn của hãng" },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Lỗi thường gặp khi đắp builder gel và cách sửa",
      blocks: [
        { p: "Những lỗi dưới đây đều sửa được ngay trên bàn nếu bạn phát hiện khi gel còn ướt. Sau khi hơ, cách sửa duy nhất là dũa." },
        {
          table: {
            head: ["Lỗi", "Vì sao xảy ra", "Cách làm đúng"],
            rows: [
              ["Gel tràn vào da ở chân móng", "Đặt hạt gel sát chân móng, hoặc ấn cọ khi dẫn gel", "Đặt hạt gel ở giữa móng, lướt cọ gần như không ấn, dừng cách da một khoảng như sợi tóc"],
              ["Gel chảy tràn ra hai mép", "Lấy quá nhiều gel, hoặc chỉnh sửa quá lâu trước khi hơ", "Lấy ít gel, sửa nhanh khi gel còn ướt rồi hơ ngay"],
              ["Lớp gel phẳng lì, không có apex", "Bỏ qua bước úp ngón tay, hoặc dũa mất điểm cao nhất", "Úp ngón tay vài giây cho gel dồn về giữa, khi dũa chỉ làm mịn bề mặt"],
              ["Khách đau, móng mỏng ở chân móng", "Dũa hoàn thiện ăn vào móng thật", "Đặt dũa nằm trên lớp gel, không dũa sát vào móng thật ở chân móng"],
              ["Bụi gel bay vào không khí", "Thổi bụi dũa thay vì hút. Bụi của gel chưa chín hết cũng có thể gây dị ứng", "Bật máy hút bụi, phủi bằng chổi rồi lau móng"],
            ],
          },
        },
        { img: { src: img("phui-bui-dua-bang-choi-mem"), alt: "Thợ nail dùng chổi lông mềm phủi lớp bụi dũa trắng khỏi móng builder gel đã dũa mờ, găng tay đen dính bụi", caption: "Bụi dũa được phủi bằng chổi và hút đi, không thổi." } },
      ],
    },
    {
      id: "dan-khach-hen-lich-dam",
      title: "Dặn khách và hẹn lịch dặm builder gel",
      blocks: [
        { img: { src: img("mong-builder-gel-hoan-thien-nhin-tu-tren"), alt: "Cận cảnh từ trên xuống một móng phủ builder gel hồng sữa bóng, viền chân móng sạch và không dính da", caption: "Móng hoàn thiện: bề mặt bóng đều, viền gel cách da một đường mảnh." } },
        { p: "Trong lúc xoa dầu dưỡng, nói với khách bốn điều:" },
        {
          ul: [
            "Thấy gel hở thì đừng lột, đừng cạy. Hãy quay lại tiệm.",
            "Đeo găng khi rửa chén và lau dọn.",
            "Đừng dùng móng làm dụng cụ để cạy hay mở đồ.",
            "Sau khoảng 3–4 tuần cần quay lại dặm, vì móng mọc làm lớp khung lệch khỏi chỗ cần đỡ.",
          ],
        },
        { note: "Hẹn luôn ngày dặm ngay tại quầy, trước khi khách ra về. Khách đã có lịch thì ít khi để móng quá hạn rồi tự cạy ở nhà.", kind: "tip", title: "Kinh nghiệm trong nghề" },
      ],
    },
    {
      id: "don-ban-sau-khi-lam",
      title: "Dọn bàn sau một bộ builder gel",
      blocks: [
        { p: "Khách về rồi, bàn làm việc cần được trả về trạng thái sạch trước khi đón người tiếp theo." },
        {
          ul: [
            "Dũa, phao, bông, que gỗ đã dùng: bỏ vào thùng rác có nắp.",
            "Dụng cụ kim loại: mang đi làm sạch và tiệt trùng, theo quy trình trong bài [xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu).",
            "Chai gel: đậy kín, cất xa ánh nắng.",
            "Mặt bàn: lau sạch.",
          ],
        },
      ],
    },
    {
      id: "dua-dich-vu-len-lich",
      title: "Đưa dịch vụ builder gel lên lịch đặt hẹn của tiệm",
      blocks: [
        { p: "Một bộ builder gel mới và một buổi dặm cần thời lượng khác nhau, nên đừng gộp chung. Trong VaraaAi, bạn [tạo dịch vụ](lesson:dich-vu) “Builder gel” và “Dặm builder gel” với thời lượng thật của tiệm, rồi đặt luôn buổi dặm trên [lịch hẹn](lesson:lich-hen) ngay tại quầy. Ghi chú về móng của từng người, ví dụ khách hay thấy nóng khi hơ, nên được lưu trong [hồ sơ khách hàng](lesson:khach-hang) để lần sau khỏi hỏi lại." },
      ],
    },
  ],
  howTo: {
    title: "Các bước đắp builder gel trên móng thật",
    id: "cac-buoc-dap-builder-gel",
    after: "ba-dieu-xuyen-suot",
    lead: "Mười bước theo đúng thứ tự trong video bài học. Bước 4 đến bước 6 là phần riêng của builder gel, nên làm chậm ở đó.",
    supplies: [
      "Cây đẩy da đã tiệt trùng",
      "Dũa 180 và phao chà mịn",
      "Bông không xơ và dung dịch lau móng",
      "Builder gel và cọ đắp gel; chất làm khô hoặc chất tăng bám nếu hãng có",
      "Đèn hơ đúng loại hãng gel yêu cầu",
      "Máy hút bụi, chổi phủi bụi, khẩu trang",
      "Gel màu nếu khách muốn, gel top, dầu dưỡng, găng tay",
    ],
    steps: [
      {
        name: "Tư vấn và kiểm tra móng",
        text: "Rửa tay, sát khuẩn tay cho mình và cho khách, rồi nhìn kỹ móng và vùng da quanh móng. Móng tách khỏi nền, đổi màu, da sưng đỏ, có mủ hay có vết thương hở thì không làm và khuyên khách đi khám. Hỏi khách đã từng bị ngứa, đỏ, phồng da sau khi làm gel chưa, muốn tự nhiên hay có màu, và nói trước rằng khoảng 3–4 tuần nên quay lại dặm.",
        image: { src: img("kiem-tra-mong-va-da-truoc-khi-dap-builder-gel"), alt: "Thợ nail dùng hai tay đeo găng đen nâng bàn tay khách lên, nhìn kỹ các móng tự nhiên và vùng da quanh móng" },
      },
      {
        name: "Chuẩn bị móng khô",
        text: "Không ngâm nước. Đẩy da nhẹ nhàng và chỉ lấy lớp da chết mỏng còn dính trên mặt móng, dũa form, rồi lướt phao mịn cho mất độ bóng mà không làm mỏng móng. Phủi bụi, lau bằng bông không xơ thấm dung dịch lau, và từ lúc này không chạm tay vào mặt móng nữa. Hãng có chất làm khô hay chất tăng bám thì dùng đúng như hướng dẫn.",
        image: { src: img("mong-that-da-cha-nham-san-sang-dap-gel"), alt: "Cận cảnh một móng tự nhiên ngắn đã chà mất độ bóng, bề mặt mờ đều và sạch, ngón tay được giữ bằng găng đen", caption: "Móng sẵn sàng: mặt móng mờ đều, không bụi, không dầu." },
      },
      {
        name: "Phủ lớp lót thật mỏng",
        text: "Lấy một chút gel, ấn và chà nhẹ vào mặt móng như xoa cho gel bám vào, rồi gạt bớt phần thừa. Lớp này mỏng đến mức gần như không thấy, nhưng nó giúp lớp sau bám chắc và trượt dễ. Bọc qua mép đầu móng, chừa một đường rất nhỏ cách da. Hơ đèn, hoặc đặt lớp sau khi lớp lót còn ướt, đúng theo sản phẩm của bạn.",
      },
      {
        name: "Đặt hạt gel vào giữa móng",
        text: "Lấy một hạt gel tròn, vừa đủ, đặt vào giữa móng. Đừng đặt sát chân móng, vì gel sẽ chảy vào da trước khi bạn kịp dẫn. Hạt to hay nhỏ tùy cái móng; lúc đầu lấy ít còn hơn lấy nhiều.",
        image: { src: img("dat-hat-builder-gel-o-giua-mong"), alt: "Đầu cọ đặt một hạt builder gel trong, tròn vào giữa mặt móng đã chà mờ, cách xa vùng da ở chân móng" },
      },
      {
        name: "Dẫn gel về chân móng, ra hai cạnh và đầu móng",
        text: "Dùng đầu cọ dẫn gel về phía chân móng. Cọ gần như không ấn xuống, chỉ lướt trên mặt gel để gel tự chảy, và dừng lại cách da một khoảng nhỏ như sợi tóc. Sau đó dẫn gel ra hai cạnh bên rồi ra đầu móng, bọc kín mép đầu móng. Lúc này lớp gel mỏng ở chân móng, mỏng ở hai cạnh và đầy hơn ở giữa.",
        image: { src: img("dan-builder-gel-ve-phia-chan-mong"), alt: "Cọ dẹt lướt nhẹ trên lớp builder gel hồng trong, đẩy gel về gần chân móng và dừng lại trước vùng da", caption: "Cọ lướt trên mặt gel, không ấn xuống móng. Giữa gel và da luôn có một khe mảnh." },
      },
      {
        name: "Úp ngón tay để tạo điểm apex",
        text: "Lật ngón tay khách úp xuống và giữ yên vài giây. Gel đặc và tự chảy, nên trọng lực kéo nó dồn về giữa thành một đường cong mềm. Lật lên, nhìn từ cạnh bên: điểm cao nhất nằm trên vùng chịu lực, hơi lùi về phía sau. Nhìn từ đầu móng: độ cong chữ C đều hai bên. Chỗ nào chưa đẹp thì sửa ngay khi gel còn ướt, nhưng đừng để lâu kẻo gel chảy tràn ra mép.",
        image: { src: img("up-ngon-tay-tao-diem-apex"), alt: "Thợ nail đeo găng đen giữ bàn tay khách lật ngửa trên gối kê, các móng vừa đắp gel hướng xuống mặt bàn" },
      },
      {
        name: "Hơ đèn đủ thời gian",
        text: "Đưa tay vào sâu trong đèn để cả móng nằm trọn dưới ánh đèn, hơ đủ thời gian hãng khuyên. Khách thấy nóng thì cho rút tay ra vài giây rồi đưa vào lại. Cần thì làm thêm một lớp mỏng thứ hai theo cùng cách. Hơ xong, nếu sản phẩm để lại lớp dính trên mặt thì lau sạch theo hướng dẫn của hãng.",
      },
      {
        name: "Dũa hoàn thiện",
        text: "Bật máy hút bụi, đeo khẩu trang nếu có. Đặt dũa 180 nằm trên mặt móng và dũa nhẹ cho bề mặt mịn, đều. Không dũa vào móng thật ở sát chân móng và đừng dũa mất điểm apex vừa dựng. Dũa gọn hai cạnh bên cho thẳng, đầu móng cho đều form, lướt phao mịn, rồi phủi bụi bằng chổi và lau móng. Cuối bước này, nhìn lại cả bàn tay từ trên xuống, từ cạnh bên và từ đầu móng: các móng phải đều nhau.",
        image: { src: img("dua-gon-canh-ben-lop-builder-gel"), alt: "Cây dũa xám áp dọc theo cạnh bên của một móng builder gel đã dũa mờ, găng tay đen của thợ dính bụi dũa" },
      },
      {
        name: "Sơn màu nếu khách muốn, rồi phủ top",
        text: "Khách thích tự nhiên thì chỉ cần một lớp top bóng. Khách muốn có màu thì sơn gel màu lên trên, mỏng và đều như khi sơn gel thường. Lớp top bọc qua mép đầu móng rồi hơ đủ thời gian. Top của hãng có lớp dính thì lau sạch.",
      },
      {
        name: "Thoa dầu dưỡng và dặn khách",
        text: "Nhỏ một giọt dầu lên da quanh móng và xoa nhẹ. Đây là lúc dặn khách cách giữ móng và đặt lịch dặm sau khoảng 3–4 tuần. Khi khách đã về, bỏ đồ dùng một lần, mang dụng cụ kim loại đi tiệt trùng và đậy kín chai gel.",
      },
    ],
  },
  faq: [
    {
      q: "Đắp builder gel trên móng thật có cần nối dài không?",
      a: "Không. Quy trình trong bài là một lớp builder gel phủ lên móng của chính khách, không nối dài. Lớp gel tạo khung để móng chắc và đẹp tự nhiên, khách giữ độ dài móng thật của mình.",
    },
    {
      q: "Hạt builder gel đầu tiên đặt ở đâu trên móng?",
      a: "Ở giữa móng, không đặt sát chân móng. Từ giữa, bạn dẫn nhẹ gel về chân móng, ra hai cạnh và ra đầu móng. Làm vậy gel mỏng ở mép và không chạm vào da.",
    },
    {
      q: "Vì sao phải úp ngón tay khách xuống sau khi dẫn gel?",
      a: "Builder gel đặc và tự chảy. Khi úp ngón tay xuống vài giây, trọng lực kéo gel dồn về giữa thành một đường cong mềm, đó là điểm apex. Sau đó lật lên, kiểm tra từ cạnh bên và từ đầu móng rồi mới hơ đèn.",
    },
    {
      q: "Lớp lót builder gel có cần hơ đèn không?",
      a: "Tùy sản phẩm. Có hãng yêu cầu hơ lớp lót theo thời gian quy định, có hãng cho đặt lớp sau lên khi lớp lót còn ướt. Bạn làm đúng theo hướng dẫn của hãng gel mình dùng.",
    },
    {
      q: "Dũa builder gel bằng dũa bao nhiêu và cần tránh gì?",
      a: "Dùng dũa 180, đặt nằm trên mặt móng và dũa nhẹ cho bề mặt mịn, sau đó lướt phao mịn. Tránh hai việc: dũa vào móng thật ở sát chân móng, vì làm móng mỏng và đau, và dũa mất điểm apex.",
    },
    {
      q: "Builder gel nên làm một lớp dày hay hai lớp mỏng?",
      a: "Một lớp đủ dày và đẹp thì không cần thêm. Nếu móng yếu hoặc apex chưa đủ, hãy thêm một lớp mỏng thứ hai thay vì đắp một lớp thật dày. Hai lớp vừa phải dễ tạo dáng hơn và ít nóng hơn khi hơ.",
    },
  ],
  related: ["builder-gel-hieu-dung", "son-gel", "fill-mong", "thao-gel"],
};

export default article;
