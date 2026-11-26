import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-massage-body/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cac-buoc-massage-body",
  lesson: "spa-massage-body",
  category: "spa",
  title: "Các bước massage body thư giãn: 13 bước cho lưng, vai, chân và tay",
  metaTitle: "Các bước massage body thư giãn: 13 bước lưng, vai, chân",
  metaDescription:
    "Các bước massage body thư giãn tại spa: chuẩn bị phòng, tư vấn, phủ khăn, vuốt lưng, nhào vai, xoa quanh bả vai, massage chân, trở mình, tay, lời dặn và dọn dẹp.",
  keyword: "các bước massage body",
  keywords: [
    "cách massage body",
    "quy trình massage body tại spa",
    "cách massage lưng",
    "cách phủ khăn khi massage body",
    "massage chân vuốt về phía tim",
    "massage body cho người mới học",
  ],
  excerpt: "Một buổi massage thư giãn cơ bản cho lưng, vai, chân và tay, làm từng bước: cách phủ khăn ở mỗi vùng, hướng tay, những chỗ không ấn và sáu lỗi khách nhớ rất lâu.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("massage-body-thu-gian-vuot-lung-cho-khach"),
    alt: "Chuyên viên spa vươn người, hai bàn tay lướt trên lưng khách nữ đang nằm sấp dưới khăn trắng, cạnh cửa sổ vòm nhìn ra hàng cây bách",
  },
  takeaways: [
    "Ba điều giữ suốt buổi: **hỏi trước khi làm**, chỉ mở vùng đang làm, và lực tay dễ chịu, không đau.",
    "Dầu bơm ra lòng bàn tay và xoa ấm, không đổ thẳng lên lưng khách. Từ cái chạm đầu tiên, luôn giữ một tay trên khách.",
    "Vuốt lưng từ thắt lưng lên ở **hai bên cột sống**, khoảng ba đến năm lần, lực tăng dần. Không bao giờ ấn lên xương sống.",
    "Chân và tay: vuốt về phía tim, mỗi lần chỉ mở một chân hay một tay. Tránh hõm sau gối, tĩnh mạch nổi và nách.",
    "Gặp chỗ cơ căng thì đi chậm lại, ở lại lâu hơn, không ấn mạnh hơn mức khách thấy dễ chịu.",
  ],
  intro: [
    "Các bước massage body thư giãn trong spa không nhiều: vuốt lưng, nhào vai, xoa quanh bả vai, làm chân, làm tay. Thứ làm khách nhớ một buổi massage lại nằm ở những chi tiết quanh các động tác đó, như bàn tay đã ấm chưa, khăn có được chèn chắc không, và người làm có hỏi về lực tay không.",
    "Bài viết này đi theo bài học “Massage body cơ bản: thực hành từng bước” trong khóa Spa & chăm sóc da của VaraaAi Academy, một buổi massage thư giãn tập trung vào lưng, vai và chân. Đọc xong, bạn làm được trọn buổi theo mười ba bước, biết phủ khăn ở từng vùng và biết những chỗ không được ấn. Thời gian và trình tự cụ thể thì theo liệu trình của tiệm bạn.",
  ],
  sections: [
    {
      id: "ba-dieu-xuyen-suot",
      title: "Ba điều xuyên suốt một buổi massage body",
      blocks: [
        {
          ol: [
            "**Hỏi trước khi làm.** Sức khỏe, thuốc đang dùng, dị ứng, vùng khách không muốn được massage, rồi đến lực tay trong lúc làm.",
            "**Chỉ mở vùng đang làm.** Phần còn lại của cơ thể luôn nằm dưới khăn.",
            "**Lực tay dễ chịu, không đau.**",
          ],
        },
        { p: "Căn phòng cũng là một phần của buổi massage. Phòng cần ấm và yên tĩnh, vì khách lạnh thì cơ khó thả lỏng. Giường, gối mặt và khăn được chuẩn bị xong trước khi khách vào." },
        { img: { src: img("phong-massage-chuan-bi-giuong-khan-va-dau"), alt: "Phòng massage tường đá kem với giường trải ga trắng có gối mặt, bên cạnh là bàn nhỏ xếp chồng khăn trắng và chai dầu thủy tinh có vòi bơm", caption: "Ga sạch, bọc gối mặt mới, khăn lớn, gối kê và dầu trong chai có vòi bơm." } },
        { p: "Bài này là phần thao tác. Lý do của từng quy tắc, những trường hợp phải từ chối và dấu hiệu nghi cục máu đông ở chân được giải thích trong bài [Massage body là gì và khi nào không nên làm](lesson:spa-massage-body-hieu-dung). Nên đọc bài đó trước khi làm cho khách đầu tiên." },
      ],
    },
    {
      id: "phu-khan-tung-vung",
      title: "Cách phủ khăn khi massage body ở từng vùng",
      blocks: [
        { p: "Khăn phủ thay đổi theo vùng đang làm, còn nguyên tắc thì giữ nguyên: mở vừa đủ, chèn chắc, làm xong phủ lại rồi mới mở chỗ khác." },
        {
          table: {
            head: ["Vùng", "Mở khăn thế nào"],
            rows: [
              ["Lưng", "Gấp mép khăn xuống ngang eo, chỉ mở phần lưng, chèn chắc hai bên"],
              ["Mặt sau chân", "Chỉ mở một chân, từ cổ chân đến trên gối. Chân kia vẫn phủ kín"],
              ["Trở mình", "Nâng khăn vừa đủ, một bên giữ chặt vào giường, khách xoay người bên dưới khăn"],
              ["Mặt trước chân", "Như mặt sau: mỗi lần một chân"],
              ["Tay", "Mở một tay, đặt lên trên khăn. Xong phủ lại rồi làm tay kia"],
            ],
          },
        },
        { img: { src: img("chi-mo-khan-mot-chan-khi-massage"), alt: "Khách nằm sấp phủ kín khăn trắng, chỉ một bên chân được mở từ cổ chân đến trên gối, chuyên viên đặt hai tay lên bắp chân đó", caption: "Chỉ mở một chân; chân kia và phần thân vẫn nằm dưới khăn." } },
      ],
    },
    {
      id: "nhung-cho-khong-an",
      title: "Những chỗ không ấn và những chỗ phải nhẹ tay",
      blocks: [
        {
          table: {
            head: ["Vùng", "Cách làm"],
            rows: [
              ["Xương sống", "Không bao giờ ấn lên. Chỉ làm ở hai bên cột sống"],
              ["Thắt lưng, chỗ thận", "Chỉ vuốt nhẹ, không đấm, không vỗ mạnh"],
              ["Gáy và sau cổ", "Lực luôn nhẹ hơn ở lưng. Không ấn phía trước cổ, không xoay, không bẻ cổ"],
              ["Hõm sau đầu gối", "Tránh"],
              ["Tĩnh mạch nổi ở chân", "Không ấn lên"],
              ["Xương ống chân", "Không ấn lên"],
              ["Mặt trong đùi, nách", "Tránh"],
            ],
          },
        },
        { note: "Thấy một bên bắp chân sưng, đỏ, nóng thì không massage và khuyên khách đi khám ngay. Xoay hay bẻ cổ khách không phải việc của massage thư giãn. Quy định và danh xưng của nghề massage khác nhau theo từng nước; bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Giới hạn của massage thư giãn" },
      ],
    },
    {
      id: "loi-hay-gap",
      title: "Sáu lỗi hay gặp mà khách nhớ rất lâu",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Làm đúng"],
            rows: [
              ["Đổ dầu lạnh thẳng lên lưng khách", "Bơm dầu ra lòng bàn tay, xoa ấm rồi mới chạm"],
              ["Nhấc cả hai tay ra rồi đặt lại đột ngột", "Luôn giữ một tay trên khách khi chuyển động tác"],
              ["Mở khăn rộng hơn vùng đang làm", "Mở vừa đủ, chèn chắc mép khăn"],
              ["Ấn lên xương sống", "Chỉ làm ở hai bên cột sống"],
              ["Nói chuyện liên tục khi khách muốn nghỉ", "Hỏi điều cần hỏi, rồi để khách yên"],
              ["Quên hỏi lực tay", "Hỏi sau lượt vuốt lưng đầu tiên và hỏi lại khi nhào vai"],
            ],
          },
        },
        { p: "Chỉ cần tránh được sáu lỗi này, khách đã thấy bạn làm việc rất chuyên nghiệp." },
      ],
    },
    {
      id: "sau-buoi-massage",
      title: "Sau buổi massage: lời dặn và ghi chú cho lần sau",
      blocks: [
        { p: "Lời dặn sau massage ngắn và trung thực: hôm sau có thể hơi ê nhẹ, nhất là khi lực mạnh. Còn nếu đau nhiều hay bầm tím thì khách báo lại cho tiệm." },
        { p: "Trước khi dọn phòng, ghi lại ba thứ: lực tay khách thích, vùng cần tránh, loại dầu đã dùng. Trong VaraaAi, chúng nằm ở ghi chú nội bộ của khách trong [sổ khách hàng](lesson:khach-hang). Lịch lần sau có thể đặt luôn khi khách còn ở quầy, ngay trên [lịch hẹn](lesson:lich-hen) của tiệm." },
      ],
    },
  ],
  howTo: {
    title: "Các bước massage body thư giãn tại spa",
    id: "cac-buoc-massage-body-thu-gian",
    after: "ba-dieu-xuyen-suot",
    lead: "Mười ba bước dưới đây theo đúng thứ tự trong video bài học: khách nằm sấp trước, làm lưng, vai, chân, rồi trở mình để làm tay và vai.",
    supplies: [
      "Giường massage có gối mặt, chỉnh được độ cao",
      "Ga sạch, bọc gối mặt mới, khăn lớn và gối kê",
      "Dầu massage trong chai có vòi bơm",
      "Phiếu tư vấn",
      "Nước uống cho khách sau buổi làm",
      "Giỏ đồ giặt có nắp và dung dịch lau khử khuẩn bề mặt",
    ],
    steps: [
      {
        name: "Chuẩn bị phòng",
        text: "Phòng ấm và yên tĩnh. Lau khử khuẩn mặt giường và gối mặt, trải ga sạch, bọc gối mặt mới, để sẵn khăn lớn và gối kê chân. Chỉnh độ cao giường cho vừa với mình để làm mà không phải cúi gập lưng.",
        image: { src: img("lau-khu-khuan-giuong-massage"), alt: "Chuyên viên đeo găng đen lau mặt giường massage bằng khăn giấy và bình xịt, phía sau một đồng nghiệp kéo cuộn giấy lót giường mới" },
      },
      {
        name: "Tư vấn trước khi làm",
        text: "Hỏi về sức khỏe, thuốc đang dùng, dị ứng dầu và dị ứng hạt, chấn thương hay phẫu thuật gần đây, và vùng khách không muốn được massage. Thấy tĩnh mạch giãn thì không ấn lên; thấy một bên bắp chân sưng, đỏ, nóng thì không làm và khuyên khách đi khám ngay. Sau đó giải thích cho khách khăn che thế nào, lực tay ra sao, và khách có thể bảo dừng bất cứ lúc nào.",
      },
      {
        name: "Để khách thay đồ một mình",
        text: "Bạn ra ngoài. Dặn khách nằm sấp, mặt vào gối mặt và đắp khăn lớn lên đến vai; khách có thể giữ lại đồ lót. Gõ cửa, đợi khách trả lời rồi mới vào. Rửa tay bằng xà phòng, lau khô và xoa cho tay ấm.",
      },
      {
        name: "Phủ khăn, chỉ mở lưng",
        text: "Gấp mép khăn xuống ngang eo và chèn chắc ở hai bên. Nếu khách muốn, kê một gối nhỏ dưới cổ chân cho thoải mái. Hỏi khách có ấm không, vì lạnh quá cơ sẽ khó thả lỏng.",
      },
      {
        name: "Lấy dầu và chạm lần đầu",
        text: "Bơm một ít dầu ra lòng bàn tay và xoa ấm, không đổ dầu thẳng lên lưng khách. Đặt hai bàn tay lên lưng thật nhẹ, giữ yên một chút. Từ lúc này, khi chuyển động tác, luôn giữ một tay trên khách.",
        image: { src: img("dat-hai-tay-len-lung-khach-truoc-khi-vuot"), alt: "Chuyên viên đặt nhẹ hai bàn tay lên giữa lưng khách nữ đang nằm sấp với mặt úp vào gối mặt, khăn trắng phủ từ eo xuống", caption: "Cái chạm đầu tiên: hai tay đặt nhẹ, giữ yên một chút." },
      },
      {
        name: "Vuốt lưng",
        text: "Hai lòng bàn tay đi từ thắt lưng lên, ở hai bên cột sống, đến vai, rồi vòng ra hai bên và vuốt nhẹ xuống trở về. Làm chậm, khoảng ba đến năm lần, lực tăng dần để cơ ấm lên trước khi làm sâu hơn. Đứng một chân trước, một chân sau, dùng sức nặng cơ thể, lưng thẳng. Rồi hỏi khách lực như vậy đã được chưa.",
      },
      {
        name: "Nhào vai, vuốt gáy",
        text: "Cơ trên vai, giữa cổ và vai, thường căng nhất. Nâng nhẹ cơ lên giữa ngón cái và các ngón khác, nhào chậm, đều nhịp, không bóp mạnh, không véo, và hỏi lại khách về lực. Ở gáy, dùng đầu ngón tay vuốt nhẹ từ chân tóc xuống vai, hai bên cột sống cổ, với lực nhẹ hơn ở lưng. Không ấn vào phía trước cổ, không xoay, không bẻ cổ khách.",
        image: { src: img("nhao-co-vai-khi-massage-body"), alt: "Hai bàn tay chuyên viên nắm nhẹ phần cơ giữa cổ và vai của khách nữ đang nằm sấp, lưng khách để trần, khăn phủ từ eo xuống", caption: "Nhào cơ trên vai: nâng nhẹ, chậm, không bóp, không véo." },
      },
      {
        name: "Xoa vòng quanh bả vai và hai bên cột sống",
        text: "Dùng ngón cái xoa vòng nhỏ quanh xương bả vai và dọc hai bên cột sống, không bao giờ ấn lên chính xương sống. Vùng thắt lưng, chỗ thận, chỉ vuốt nhẹ. Gặp chỗ cơ căng thì đi chậm lại, ở lại lâu hơn một chút, không ấn mạnh hơn mức khách thấy dễ chịu. Xong, vỗ nhẹ nếu khách thích, vuốt dài vài lần để kết thúc, rồi phủ khăn lại lưng.",
        image: { src: img("xoa-vong-quanh-xuong-ba-vai"), alt: "Nhìn từ phía trên, hai bàn tay chuyên viên đặt quanh xương bả vai trên lưng khách đang nằm sấp, hai bên cột sống" },
      },
      {
        name: "Massage mặt sau chân",
        text: "Chỉ mở một chân, từ cổ chân đến trên gối, chèn khăn thật chắc. Vuốt từ cổ chân lên về phía gối, tức là về phía tim, rồi nhào nhẹ bắp chân bằng hai tay luân phiên nâng cơ lên và thả ra. Tránh hõm sau đầu gối và không ấn lên tĩnh mạch nổi. Phủ lại rồi mới mở chân kia.",
        image: { src: img("vuot-bap-chan-tu-co-chan-len-goi"), alt: "Cận cảnh hai bàn tay chuyên viên ôm bắp chân của khách đang nằm sấp, vuốt từ cổ chân lên phía gối, khăn trắng quấn kín từ trên gối", caption: "Vuốt từ cổ chân lên gối, về phía tim." },
      },
      {
        name: "Giúp khách trở mình",
        text: "Nâng khăn lên vừa đủ, một bên giữ chặt vào giường, mắt bạn nhìn về phía mặt khách. Mời khách xoay người nằm ngửa bên dưới khăn, để khách luôn được che kín. Kê gối dưới đầu gối nếu khách muốn. Nếu liệu trình có mặt trước chân thì làm như mặt sau: mỗi lần một chân, vuốt từ cổ chân lên gối, không ấn lên xương ống chân và tránh mặt trong đùi.",
      },
      {
        name: "Massage tay và vai",
        text: "Mở một tay của khách, đặt lên trên khăn. Một tay bạn giữ nhẹ cổ tay khách, tay kia vuốt từ cổ tay lên khuỷu, về phía tim, tránh vùng nách. Phủ lại rồi làm tay kia. Sau đó ra đầu giường, đặt hai tay lên vai khách và ấn nhẹ xuống trong vài nhịp thở.",
        image: { src: img("vuot-canh-tay-tu-co-tay-len-khuyu"), alt: "Khách nằm ngửa phủ khăn trắng đến xương quai xanh, một cánh tay để ngoài khăn, chuyên viên đỡ cổ tay và vuốt dọc cẳng tay khách" },
      },
      {
        name: "Kết thúc buổi massage",
        text: "Để tay yên trên vai khách một lúc, rồi nhẹ nhàng báo khách là đã xong. Ra ngoài để khách ngồi dậy từ từ và thay đồ. Mời khách một ly nước, hỏi khách cảm thấy thế nào, và dặn rằng hôm sau có thể hơi ê nhẹ; đau nhiều hay bầm tím thì báo cho tiệm. Ghi vào ghi chú của khách lực tay khách thích, vùng cần tránh và loại dầu đã dùng.",
      },
      {
        name: "Dọn dẹp",
        text: "Cho ga, khăn, bọc gối mặt vào giỏ đồ giặt có nắp. Lau khử khuẩn giường và gối mặt, lau chai dầu, rồi [rửa tay](lesson:rua-tay-gang-tay).",
      },
    ],
  },
  faq: [
    {
      q: "Một buổi massage body thư giãn gồm những bước nào?",
      a: "Chuẩn bị phòng và giường, tư vấn, để khách thay đồ và nằm sấp, phủ khăn chỉ mở lưng, lấy dầu, vuốt lưng, nhào vai và vuốt gáy, xoa vòng quanh bả vai, massage mặt sau chân, giúp khách trở mình, massage tay và vai, rồi kết thúc và dọn dẹp. Thời gian và trình tự cụ thể theo liệu trình của từng tiệm.",
    },
    {
      q: "Massage lưng nên vuốt theo hướng nào?",
      a: "Hai lòng bàn tay đi từ thắt lưng lên, ở hai bên cột sống, đến vai, rồi vòng ra hai bên và vuốt nhẹ xuống trở về. Làm chậm khoảng ba đến năm lần, lực tăng dần để cơ ấm lên. Không ấn lên chính xương sống, và vùng thắt lưng chỗ thận chỉ vuốt nhẹ.",
    },
    {
      q: "Massage chân, tay vuốt lên hay vuốt xuống?",
      a: "Vuốt về phía tim: ở chân là từ cổ chân lên gối, ở tay là từ cổ tay lên khuỷu. Khi làm chân, tránh hõm sau đầu gối, không ấn lên tĩnh mạch nổi và xương ống chân. Khi làm tay, tránh vùng nách.",
    },
    {
      q: "Gặp chỗ cơ căng cứng thì có nên ấn mạnh hơn không?",
      a: "Không. Gặp chỗ cơ căng, người làm đi chậm lại và ở lại lâu hơn một chút, chứ không ấn mạnh hơn mức khách thấy dễ chịu. Lực tay trong massage thư giãn là dễ chịu, không đau.",
    },
    {
      q: "Phủ khăn khi massage body thế nào cho đúng?",
      a: "Khách nằm dưới khăn lớn và chỉ vùng đang làm được mở ra. Làm lưng thì gấp mép khăn ngang eo và chèn chắc hai bên; làm chân thì mỗi lần chỉ mở một chân từ cổ chân đến trên gối. Khi khách trở mình, người làm nâng khăn vừa đủ để khách xoay người bên dưới mà vẫn được che kín.",
    },
    {
      q: "Sau khi massage body bị ê người có bình thường không?",
      a: "Hôm sau có thể hơi ê nhẹ, nhất là khi lực mạnh. Nếu đau nhiều hay bầm tím thì nên báo lại cho tiệm đã làm.",
    },
  ],
  related: ["spa-massage-body-hieu-dung", "spa-massage-mat", "spa-tay-chan", "rua-tay-gang-tay"],
};

export default article;
