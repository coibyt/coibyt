import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/son-gel/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-son-gel",
  lesson: "son-gel",
  category: "nail",
  title: "Cách sơn gel đúng kỹ thuật: 10 bước từ chuẩn bị móng đến lớp top",
  metaTitle: "Cách sơn gel đúng kỹ thuật: 10 bước bền 2–3 tuần",
  metaDescription:
    "Hướng dẫn cách sơn gel từng bước: kiểm tra móng, xử lý da khô, chà nhám, lớp base, hai lớp màu, lớp top, thời gian hơ đèn và các lỗi làm gel nhanh bong.",
  keyword: "cách sơn gel",
  keywords: ["các bước sơn gel", "quy trình sơn gel", "sơn gel đúng kỹ thuật", "sơn gel bị bong", "thời gian hơ đèn gel", "sơn gel tại nhà"],
  excerpt: "Quy trình sơn gel đầy đủ cho thợ nail và người tự làm tại nhà: mười bước, thời gian hơ đèn, và những lỗi nhỏ làm bộ móng bong sau vài ngày.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-son-gel-cho-khach-tai-salon"),
    alt: "Thợ nail đeo găng tay đen đang sơn gel đỏ cho khách tại bàn đá trong một salon sang trọng",
  },
  takeaways: [
    "Sơn gel bong tróc phần lớn do **khâu chuẩn bị móng**, nhất là lớp da mỏng còn sót ở chân móng, chứ không phải do chai sơn.",
    "Làm khô, không ngâm nước: móng ngấm nước nở ra, sơn xong co lại và kéo lớp gel bong theo.",
    "Mọi lớp gel đều phải **mỏng**, không chạm da, và được bịt ở mép đầu móng trước khi hơ đèn.",
    "Thời gian hơ theo đúng hãng gel và đúng loại đèn: đèn LED thường 30–60 giây, đèn UV khoảng 2 phút.",
    "Làm đúng các bước, một bộ sơn gel giữ được độ bóng từ 2 đến 3 tuần.",
  ],
  intro: [
    "Cách sơn gel nhìn qua thì đơn giản: lót, màu, top, hơ đèn. Vậy mà cùng một chai gel, có người làm khách đeo được ba tuần, có người làm bốn ngày đã bong ở chân móng. Khác biệt nằm ở những việc diễn ra trước khi mở chai sơn.",
    "Bài viết này đi lại toàn bộ quy trình của bài học “Sơn gel: thực hành từ A đến Z” trong khóa Nghề Nail của VaraaAi Academy: từ lúc khách ngồi xuống cho tới giọt dầu dưỡng cuối cùng, kèm thời gian hơ đèn và cách sửa những lỗi hay gặp. Bạn có thể xem video bài học ngay bên dưới rồi đọc từng bước.",
  ],
  sections: [
    {
      id: "chuan-bi-mong",
      title: "Vì sao khâu chuẩn bị móng quyết định độ bền của sơn gel",
      blocks: [
        { p: "Gel bám lên mặt móng sạch, khô và hơi nhám. Nó không bám lên da, không bám lên dầu, và bám rất kém lên một chiếc móng vừa ngâm nước. Ba điều đó giải thích gần hết các ca bong tróc mà thợ mới hay gặp." },
        {
          ul: [
            "**Lớp da mỏng trên mặt móng.** Ở chân móng luôn có một lớp da mỏng trong suốt bám trên mặt móng, mắt thường khó thấy. Sơn đè lên lớp da này thì gel sẽ bong đúng ở chân móng sau vài ngày.",
            "**Móng ngấm nước.** Móng ngâm nước sẽ nở ra. Sơn xong, móng khô và co lại, còn lớp gel thì không co theo. Vì vậy khi sơn gel, ta xử lý da khô, không ngâm tay.",
            "**Dầu trên da.** Sau khi lau sạch móng, chỉ cần một lần chạm ngón tay vào mặt móng là đủ để lại dầu. Thợ không chạm, và nhắc khách cũng đừng chạm.",
          ],
        },
        { note: "Nếu khách than gel hay bong ở chân móng, đừng vội đổi hãng sơn. Hãy xem lại bước cạo lớp da mỏng và bước chà nhám sát chân móng trước.", kind: "tip", title: "Kinh nghiệm trong nghề" },
      ],
    },
    {
      id: "thoi-gian-ho-den",
      title: "Thời gian hơ đèn gel: LED và UV",
      blocks: [
        { p: "Gel không khô như sơn thường. Nó chỉ cứng lại khi được chiếu đèn đủ thời gian, bằng đúng loại đèn mà hãng gel yêu cầu. Con số dưới đây là mức thường gặp; con số đúng cho chai gel của bạn nằm trên nhãn sản phẩm." },
        {
          table: {
            head: ["Loại đèn", "Thời gian thường gặp cho mỗi lớp", "Ghi chú"],
            rows: [
              ["Đèn LED", "30–60 giây", "Lớp top thường cần đủ 60 giây"],
              ["Đèn UV", "Khoảng 2 phút", "Chậm hơn LED, vẫn phải hơ đủ"],
            ],
          },
        },
        { p: "Gel hơ chưa đủ thì không chín hết bên trong. Bề mặt nhìn có vẻ cứng, nhưng lớp gel dễ bong và phần gel còn sống là thứ dễ gây dị ứng. Hơ thật lâu cũng không thay được việc dùng sai đèn." },
        { img: { src: img("ho-den-led-son-gel"), alt: "Bàn tay khách đặt phẳng trong đèn LED hơ gel, bốn ngón nằm cạnh nhau dưới ánh sáng tím", caption: "Sơn và hơ bốn ngón trước. Hai ngón cái làm riêng để nằm thẳng trong đèn." } },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Những lỗi làm sơn gel nhanh bong, nhăn hoặc chảy",
      blocks: [
        { p: "Phần lớn lỗi trên móng gel đều truy ngược được về một bước làm vội. Bảng sau gom những lỗi thợ mới hay gặp và bước cần xem lại." },
        {
          table: {
            head: ["Hiện tượng", "Nguyên nhân thường gặp", "Cách sửa"],
            rows: [
              ["Bong ở chân móng", "Còn lớp da mỏng trên mặt móng, hoặc gel chạm vào da", "Cạo sạch lớp da mỏng khi xử lý da; chừa khe hở mảnh như sợi tóc quanh chân móng"],
              ["Bong ở đầu móng", "Không bịt mép đầu móng", "Lướt cọ ngang qua mép đầu móng ở lớp base, lớp màu và lớp top"],
              ["Gel nhăn, mềm bên trong", "Sơn quá dày nên đèn không chiếu tới lớp dưới", "Sơn mỏng; màu chưa đều thì thêm một lớp mỏng nữa"],
              ["Gel chảy dồn về một bên", "Ngón cái nằm nghiêng trong đèn", "Làm bốn ngón trước, hai ngón cái làm riêng và để nằm thẳng"],
              ["Gel không bám, tróc từng mảng", "Mặt móng còn bóng, còn bụi hoặc dính dầu do chạm tay", "Chà nhám nhẹ cho mất bóng, lau bằng dung dịch lau móng, sau đó không chạm vào mặt móng"],
            ],
          },
        },
      ],
    },
    {
      id: "an-toan-di-ung",
      title: "An toàn khi sơn gel: dị ứng và chất TPO",
      blocks: [
        { p: "Quy tắc quan trọng nhất của người thợ gel là **gel chưa hơ không được chạm vào da**. Gel dính da làm sơn bong, và tiếp xúc lặp lại nhiều lần có thể gây dị ứng về sau cho cả khách lẫn thợ. Lỡ dính thì gạt sạch bằng que gỗ trước khi cho tay vào đèn, đừng hơ rồi mới cạy." },
        {
          ul: [
            "Trước khi làm, hỏi khách đã từng bị ngứa, đỏ da hay bong móng sau khi làm gel chưa. Nếu có, đó có thể là dấu hiệu dị ứng và không nên làm tiếp.",
            "Đang làm mà khách thấy ngứa, đỏ hoặc sưng quanh móng thì dừng lại.",
            "Thợ đeo găng tay để bảo vệ da tay của chính mình, vì thợ tiếp xúc với gel mỗi ngày.",
            "Móng đổi màu xanh hoặc vàng, dày lên, bở vụn, da sưng đỏ, có mủ hay có vết thương hở: không làm, và khuyên khách đi khám.",
          ],
        },
        { note: "Từ ngày 1/9/2025, Liên minh châu Âu cấm chất TPO trong sản phẩm làm móng. Nếu bạn làm việc ở châu Âu, hãy đọc bảng thành phần của những chai gel đang dùng. Quy định ở mỗi nước một khác, nên hãy kiểm tra quy định nơi bạn làm việc.", kind: "warn", title: "Kiểm tra thành phần gel" },
        { p: "Muốn hiểu kỹ hơn về dị ứng hóa chất trong tiệm, bạn xem bài học [Dị ứng hóa chất](lesson:di-ung-hoa-chat) trong khóa Vệ sinh & an toàn." },
      ],
    },
    {
      id: "dan-khach",
      title: "Dặn khách chăm sóc móng sau khi sơn gel",
      blocks: [
        { p: "Bộ móng đẹp lúc khách rời ghế mới là một nửa công việc. Nửa còn lại là ba lời dặn ngắn, nói khi đang thoa dầu dưỡng:" },
        { img: { src: img("nho-dau-duong-quanh-mong-sau-khi-son-gel"), alt: "Thợ nail nhỏ một giọt dầu dưỡng vàng lên vùng da ở chân móng đã sơn gel đỏ" } },
        {
          ol: [
            "Đeo găng tay khi rửa chén và lau dọn nhà cửa.",
            "Thoa dầu dưỡng quanh móng mỗi ngày.",
            "Không tự cạy gel. Quay lại salon sau 2–3 tuần để tháo và làm mới.",
          ],
        },
        { img: { src: img("bo-mong-son-gel-do-hoan-thien"), alt: "Hai bàn tay khách với mười móng sơn gel đỏ bóng, đường viền chân móng đều và sạch", caption: "Bộ sơn gel hoàn thiện: bề mặt căng bóng, viền chân móng đều, không dính da." } },
        { p: "Khách về rồi, công việc ở bàn vẫn chưa xong. Dụng cụ kim loại mang đi rửa, khử khuẩn và tiệt trùng; đồ dùng một lần thì bỏ; mặt bàn và đèn được lau sạch trước khi đón khách tiếp theo. Quy trình này có trong bài học [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
      ],
    },
    {
      id: "dua-dich-vu-len-lich",
      title: "Đưa dịch vụ sơn gel lên trang đặt lịch của tiệm",
      blocks: [
        { p: "Khi đã làm quen tay, bạn nên để khách tự đặt dịch vụ sơn gel trên mạng thay vì nhắn tin qua lại. Trong VaraaAi, bạn [thêm dịch vụ](lesson:dich-vu) với đúng thời lượng mình cần cho một bộ, kể cả thời gian dọn bàn, rồi [làm bảng giá](lesson:bang-gia) để dán tại tiệm. Phần mềm miễn phí cho chủ salon: [xem VaraaAi cho salon](/business)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước sơn gel đúng kỹ thuật",
    id: "cac-buoc-son-gel",
    after: "chuan-bi-mong",
    lead: "Mười bước dưới đây đi theo đúng thứ tự trong video. Sáu bước đầu là chuẩn bị, và đó là phần nên làm chậm nhất.",
    supplies: [
      "Cây đẩy da và kềm cắt da đã tiệt trùng, còn nguyên trong túi",
      "Dũa 180 và phao chà mịn, mỗi khách một bộ mới",
      "Bông gạc không xơ và dung dịch lau móng",
      "Gel base, gel màu, gel top",
      "Đèn LED hoặc UV đúng loại hãng gel yêu cầu",
      "Que gỗ, dầu dưỡng da, găng tay",
    ],
    steps: [
      {
        name: "Rửa tay, sát khuẩn và kiểm tra móng",
        text: "Rửa và sát khuẩn tay cho mình và cho khách, rồi nhìn kỹ móng và vùng da quanh móng. Móng đổi màu xanh hoặc vàng, dày lên, bở vụn, da sưng đỏ, có mủ hay có vết thương hở thì không làm và khuyên khách đi khám. Hỏi thêm khách có từng bị ngứa, đỏ da hay bong móng sau khi làm gel không.",
      },
      {
        name: "Bày dụng cụ ra bàn",
        text: "Chuẩn bị đủ đồ trước khi bắt đầu để không phải đứng dậy giữa chừng với đôi găng dính gel. Dụng cụ kim loại còn trong túi tiệt trùng; dũa và phao là đồ mới cho từng khách.",
        image: { src: img("dung-cu-son-gel-can-chuan-bi"), alt: "Bộ dụng cụ sơn gel bày trên bàn đá: túi tiệt trùng có kềm và cây đẩy da, dũa, phao chà, gel base, gel màu, gel top, đèn LED, dầu dưỡng và găng tay" },
      },
      {
        name: "Dũa form móng",
        text: "Đặt dũa hơi nghiêng dưới đầu móng và dũa một chiều, từ cạnh bên vào giữa. Đừng kéo cưa qua lại, vì móng sẽ nóng lên và dễ tách lớp. Làm đều mười ngón theo form khách chọn.",
      },
      {
        name: "Xử lý da khô, không ngâm nước",
        text: "Đặt cây đẩy da nghiêng khoảng 45 độ, đẩy nhẹ vùng da ở chân móng về phía sau, rồi cạo sạch lớp da mỏng trong suốt còn bám trên mặt móng. Dùng kềm chỉ cắt phần da chết đã bong lên, màu trắng và khô. Không cắt vào da sống: cắt sâu sẽ chảy máu và mở đường cho nhiễm trùng.",
        image: { src: img("day-da-chan-mong-truoc-khi-son-gel"), alt: "Thợ nail cầm cây đẩy da nghiêng 45 độ, đẩy nhẹ lớp da ở chân móng tự nhiên của khách", caption: "Cây đẩy da đặt nghiêng, đẩy nhẹ về phía khớp ngón, không ấn mạnh xuống mặt móng." },
      },
      {
        name: "Chà nhám thật nhẹ",
        text: "Dùng phao chà mịn lướt nhẹ trên toàn bộ mặt móng, chỉ để làm mất độ bóng. Chú ý vùng sát chân móng và hai bên cạnh, là chỗ hay bị bỏ sót. Đừng chà mạnh, vì móng mỏng đi sẽ yếu và đau.",
        image: { src: img("cha-nham-mat-mong-bang-phao-min"), alt: "Thợ nail áp mặt phẳng của phao chà trắng lên mặt móng tự nhiên để làm mất độ bóng" },
      },
      {
        name: "Làm sạch mặt móng",
        text: "Phủi hết bụi, rồi dùng bông gạc không xơ thấm dung dịch lau móng lau kỹ từng móng, cả hai bên cạnh và đầu móng. Từ lúc này không ai chạm tay vào mặt móng nữa. Nếu hãng gel của bạn có chất tăng bám thì thoa ở bước này, theo hướng dẫn của hãng.",
      },
      {
        name: "Sơn lớp base thật mỏng",
        text: "Lấy thật ít gel. Đặt cọ ở giữa móng, đẩy nhẹ lên gần sát da và chừa một khe hở mảnh như sợi tóc, rồi kéo thẳng xuống đầu móng. Kéo tiếp hai bên, cuối cùng lướt cọ ngang qua mép đầu móng để bịt đầu móng. Gel lỡ dính da thì gạt sạch bằng que gỗ trước khi hơ.",
        image: { src: img("son-lop-base-gel-mong"), alt: "Cọ gel base trong suốt đặt ở giữa móng, gần chân móng, phần đã sơn bóng ướt còn phần chưa sơn vẫn mờ" },
      },
      {
        name: "Hơ đèn đúng thời gian",
        text: "Cho tay vào đèn: đèn LED thường 30–60 giây, đèn UV khoảng 2 phút, và luôn theo thời gian ghi trên sản phẩm. Sơn và hơ bốn ngón trước; hai ngón cái làm riêng để nằm thẳng trong đèn, nếu nghiêng gel sẽ chảy dồn về một bên.",
      },
      {
        name: "Sơn hai lớp màu mỏng",
        text: "Mỗi lớp ba đường cọ: giữa, trái, phải. Bịt đầu móng rồi hơ đèn. Lớp đầu chưa đều màu là chuyện bình thường, đừng cố sơn dày vì gel sẽ nhăn và không chín bên trong. Lớp thứ hai làm y như vậy. Màu rất đậm hoặc rất nhạt có thể cần thêm một lớp mỏng thứ ba.",
        image: { src: img("son-lop-mau-gel-ba-duong-co"), alt: "Thợ nail kéo một đường gel đỏ ở giữa móng, hai bên móng chưa sơn, viền chân móng chừa một khe mảnh", caption: "Đường cọ đầu tiên đi giữa móng; hai đường sau phủ hai bên." },
      },
      {
        name: "Phủ lớp top và thoa dầu dưỡng",
        text: "Phủ top kín toàn bộ phần màu, kể cả mép đầu móng, để khóa màu. Lớp top có thể dày hơn lớp màu một chút cho mặt móng căng bóng. Hơ đủ thời gian, thường là 60 giây với đèn LED. Top loại có lớp dính thì lau bằng bông gạc thấm dung dịch lau móng; top không cần lau thì bỏ qua. Cuối cùng nhỏ dầu dưỡng quanh móng và mát xa nhẹ.",
        image: { src: img("phu-lop-top-gel-bong"), alt: "Thợ nail phủ lớp top trong suốt lên móng sơn gel đỏ, móng vừa phủ bóng như gương" },
      },
    ],
  },
  faq: [
    {
      q: "Sơn gel giữ được bao lâu?",
      a: "Làm đúng quy trình, một bộ sơn gel bóng đẹp và bền từ 2 đến 3 tuần. Sau thời gian đó móng mọc dài ra và lộ chân móng, nên khách quay lại salon để tháo và làm mới, không tự cạy gel ở nhà.",
    },
    {
      q: "Vì sao sơn gel bị bong ở chân móng sau vài ngày?",
      a: "Nguyên nhân hay gặp nhất là còn lớp da mỏng trong suốt bám trên mặt móng, hoặc gel chạm vào da khi sơn. Gel không bám được lên da. Hãy cạo sạch lớp da mỏng ở bước xử lý da và chừa một khe hở rất mảnh quanh chân móng.",
    },
    {
      q: "Hơ đèn gel bao nhiêu giây là đủ?",
      a: "Đèn LED thường 30–60 giây cho mỗi lớp, đèn UV khoảng 2 phút. Mỗi hãng gel một khác, nên con số đúng là con số ghi trên sản phẩm, với đúng loại đèn hãng yêu cầu. Gel hơ thiếu sẽ không chín hết, dễ bong và dễ gây dị ứng.",
    },
    {
      q: "Sơn gel bị nhăn là do đâu?",
      a: "Do sơn quá dày. Ánh đèn không chiếu tới phần gel bên dưới nên lớp trên co lại và nhăn, còn bên trong vẫn mềm. Cách sửa là sơn mỏng; nếu màu chưa đều thì thêm một lớp mỏng nữa thay vì một lớp dày.",
    },
    {
      q: "Có nên ngâm tay trong nước trước khi sơn gel không?",
      a: "Không. Móng ngấm nước sẽ nở ra, sơn xong móng co lại và lớp gel dễ bong. Khi sơn gel, phần da quanh móng được xử lý khô bằng cây đẩy da và kềm.",
    },
    {
      q: "Tự sơn gel tại nhà có khác gì ở salon không?",
      a: "Các bước giống hệt nhau. Điều cần chú ý nhất khi tự làm là không để gel chưa hơ dính vào da, dùng đúng loại đèn của hãng gel và hơ đủ thời gian. Nếu thấy ngứa, đỏ hoặc sưng quanh móng thì ngừng dùng.",
    },
  ],
  related: ["gel-hieu-dung", "thao-gel", "builder-gel", "ve-sinh-dung-cu"],
};

export default article;
