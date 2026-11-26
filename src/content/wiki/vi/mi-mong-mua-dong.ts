import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mong-mua-dong/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cham-soc-mong-tay-mua-dong",
  lesson: "mi-mong-mua-dong",
  category: "tips",
  title: "Chăm sóc móng tay và mi mùa đông: 4 thói quen để móng không khô gãy, mi không xơ",
  metaTitle: "Chăm sóc móng tay mùa đông: móng không khô gãy, mi không xơ",
  metaDescription:
    "Chăm sóc móng tay và mi mùa đông: dầu dưỡng mỗi tối, găng tay khi ra ngoài, kem tay sau khi rửa, tránh hơi nóng gần mắt và giữ độ ẩm trong nhà có sưởi.",
  keyword: "chăm sóc móng tay mùa đông",
  keywords: [
    "móng tay khô dễ gãy mùa đông",
    "chăm sóc mi mùa đông",
    "xước măng rô mùa đông",
    "dầu dưỡng móng thoa khi nào",
    "máy tạo ẩm cho da và mi",
    "mi khô giòn khi trời lạnh",
  ],
  excerpt: "Trời lạnh bên ngoài, hơi sưởi khô bên trong: móng dễ gãy, da quanh móng dễ xước, mi dễ xơ. Bốn thói quen đơn giản cho cả mùa lạnh.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-mac-ao-khoac-mua-dong-tai-quay-salon-helsinki"),
    alt: "Chủ tiệm tóc vàng mặc vest kem cầm sổ trò chuyện với khách mặc áo khoác dạ và khăn quàng tại quầy đá trong salon sáng sủa",
  },
  takeaways: [
    "**Mỗi tối**, thoa dầu dưỡng lên da quanh móng và mặt móng: da mềm, ít xước măng rô, móng dẻo và đỡ gãy.",
    "**Ra ngoài trời lạnh** luôn đeo găng tay; **sau mỗi lần rửa tay**, thoa ngay một lớp kem tay mỏng.",
    "**Mi** cũng khô và giòn hơn vì trời lạnh và hơi sưởi: chải mi mỗi ngày, không sấy nóng gần mắt, không ngồi sauna quá lâu.",
    "**Trong nhà có sưởi**, một máy tạo ẩm nhỏ giúp ích nhiều.",
    "**Uống đủ nước** để da, móng và mi đều bớt khô.",
  ],
  intro: [
    "Chăm sóc móng tay mùa đông là chuyện nhiều người chỉ nghĩ tới khi móng đã gãy, da quanh móng đã xước và rát. Ở những nơi mùa đông dài như Phần Lan, không khí vừa lạnh vừa khô. Ra ngoài thì gió lạnh, vào nhà thì hơi sưởi còn làm không khí khô hơn nữa. Móng mất độ dẻo nên dễ gãy, và hàng mi, cả mi thật lẫn mi nối, cũng dễ xơ.",
    "Bài viết đi theo bài học “Giữ mi và móng không khô gãy mùa đông” trong khóa “Moja Beauty: mi, móng và mày đẹp” của VaraaAi Academy, từ tiệm Moja Beauty ở Helsinki. Bài học gói lại trong bốn thói quen: dầu dưỡng, găng tay, chăm mi tránh hơi nóng, và giữ độ ẩm trong nhà. Đọc xong, bạn sẽ biết làm gì mỗi ngày và vì sao từng việc lại có ích.",
  ],
  sections: [
    {
      id: "vi-sao-mua-dong-kho",
      title: "Vì sao móng tay khô, dễ gãy vào mùa đông",
      blocks: [
        { p: "Móng và da quanh móng cần một chút độ ẩm để dẻo. Khi không khí lạnh và khô, độ ẩm đó mất đi nhanh hơn. Móng khô thì cứng giòn, gặp va chạm nhẹ là nứt, tách lớp ở đầu. Da quanh móng khô thì nứt nẻ, dễ có xước măng rô." },
        { img: { src: img("phu-nu-mac-ao-khoac-di-tren-pho-troi-lanh"), alt: "Người phụ nữ mặc áo khoác dạ màu lạc đà vừa đi trên phố lát đá vừa xem điện thoại, phía sau là tiệm có mái hiên đỏ mận", caption: "Gió lạnh ngoài phố, hơi sưởi trong nhà: da tay, móng và mi chịu khô cả ngày." } },
        { p: "Hơi sưởi trong nhà làm chuyện này nặng thêm, vì không khí ấm lên nhưng không có thêm hơi nước. Rửa tay nhiều lần trong ngày, nhất là với nước nóng và xà phòng, cũng cuốn đi lớp dầu tự nhiên trên da." },
      ],
    },
    {
      id: "dau-duong-moi-toi",
      title: "Thói quen 1: dầu dưỡng móng mỗi tối",
      blocks: [
        { p: "Mỗi tối, trước khi ngủ, nhỏ một giọt dầu dưỡng lên da quanh móng và mặt móng, rồi xoa nhẹ cho thấm. Da quanh móng mềm ra, ít bị xước măng rô hơn. Móng dẻo hơn và đỡ gãy." },
        { img: { src: img("nho-dau-duong-len-da-quanh-mong"), alt: "Thợ nail đeo găng đen dùng ống nhỏ giọt nhỏ một giọt dầu dưỡng màu vàng lên móng dáng ô van sơn gel hồng sữa của khách" } },
        { p: "Thói quen này dùng được cho mọi kiểu móng: móng trần, sơn thường, sơn gel hay BIAB. Với móng gel, dầu dưỡng giữ cho da quanh móng không khô nứt và không bong tróc sát mép gel, nên bạn cũng ít có cớ động tay vào mép gel. Bài [Móng tay có cần “thở” giữa các lần làm gel](lesson:mong-co-can-tho) nói thêm vì sao dưỡng dầu đều quan trọng hơn chuyện cho móng nghỉ." },
        { note: "Để lọ dầu dưỡng ngay cạnh giường hay bàn chải đánh răng. Thấy nó mỗi tối thì dễ nhớ hơn nhiều.", kind: "tip", title: "Mẹo nhỏ" },
      ],
    },
    {
      id: "gang-tay-kem-tay",
      title: "Thói quen 2: găng tay khi ra ngoài, kem tay sau khi rửa",
      blocks: [
        { p: "Ra ngoài trời lạnh, luôn đeo găng tay. Găng giữ ấm và chắn gió, để da tay và móng không bị không khí lạnh hút khô suốt quãng đường đi." },
        { p: "Sau mỗi lần rửa tay, thoa ngay một lớp kem tay mỏng. Một lớp mỏng là đủ, không cần dày đến mức tay trơn. Nếu bạn rửa bát, giặt đồ, hãy đeo thêm găng cao su: vừa đỡ khô tay, vừa giúp móng gel không bị nước và chất tẩy rửa làm bong sớm, như trong bài [5 thói quen làm móng gel nhanh bong](lesson:5-thoi-quen-gel-bong)." },
        { img: { src: img("thoa-kem-duong-tay-sau-khi-rua-tay"), alt: "Hai bàn tay đeo găng đen thoa kem dưỡng trắng lên mu bàn tay khách đang đặt trên gối kê tay màu kem", caption: "Kem tay mỏng sau mỗi lần rửa tay giữ da không nứt nẻ." } },
      ],
    },
    {
      id: "cham-mi-mua-dong",
      title: "Thói quen 3: chăm mi mùa đông, tránh hơi nóng",
      blocks: [
        { p: "Mi cũng khô và giòn hơn khi trời lạnh và khi ở lâu cạnh hơi sưởi nóng. Bài học đưa ra ba việc:" },
        {
          table: {
            head: ["Nên làm", "Vì sao"],
            rows: [
              ["Chải mi mỗi ngày bằng chổi sạch", "Sợi mi gọn, không rối, không xoắn vào nhau"],
              ["Không sấy nóng gần mắt", "Hơi nóng làm sợi mi khô và giòn hơn"],
              ["Không ngồi sauna quá lâu", "Nhiệt cao kéo dài làm mi khô xơ"],
            ],
          },
        },
        { img: { src: img("chai-mi-bang-choi-sach"), alt: "Cận cảnh thợ đeo găng đen dùng chổi chải mi màu đen chải hàng mi của khách đang nhắm mắt, dưới mắt có miếng lót trắng", caption: "Chải mi nhẹ nhàng mỗi ngày bằng một chiếc chổi sạch." } },
        { p: "Khi sấy tóc, để luồng gió nóng hướng xa khuôn mặt. Nếu bạn đang nối mi, cách rửa và chải mi tại nhà có trong bài [Rửa mi nối tại nhà](lesson:rua-mi-noi-tai-nha), còn những điều nên tránh sau buổi làm mi nằm ở bài [Chăm sóc sau khi làm mi](lesson:cham-soc-sau-lam-mi). Lông mày vừa làm lamination cũng cần dưỡng đều, xem [Giữ nếp mày Lamination](lesson:giu-nep-brow-lamination)." },
      ],
    },
    {
      id: "do-am-trong-nha",
      title: "Thói quen 4: giữ độ ẩm trong nhà và uống đủ nước",
      blocks: [
        { p: "Trong nhà có sưởi, không khí rất khô. Một máy tạo ẩm nhỏ đặt trong phòng ngủ hay phòng làm việc giúp ích nhiều: da, môi, móng và mi đều bớt khô qua đêm." },
        { img: { src: img("may-tao-am-nho-trong-phong"), alt: "Máy tạo ẩm nhỏ màu kem tỏa hơi sương trên bậu cửa sổ đá cẩm thạch, bên cạnh bình hoa trắng và ghế bành màu kem" } },
        { p: "Bài học còn nhắc thêm một việc đơn giản: uống đủ nước. Cơ thể đủ nước thì da, móng và mi đều bớt khô." },
        { note: "Nếu da quanh móng nứt sâu, sưng đỏ, đau, hoặc móng đổi màu lạ, đó không còn là chuyện khô do thời tiết. Hãy hỏi bác sĩ hoặc dược sĩ trước khi làm móng.", kind: "warn", title: "Khi không chỉ là khô" },
      ],
    },
    {
      id: "dat-lich-cham-soc",
      title: "Móng khô, mi xơ sau mùa lạnh: đặt lịch chăm sóc",
      blocks: [
        { p: "Sau mùa lạnh, nếu móng khô, hay gãy hoặc mi trông xơ, hãy để thợ xem tận nơi và tư vấn nên làm gì tiếp, từ một buổi chăm sóc móng đến một lần dặm mi. Trên VaraaAi, bạn [đặt lịch online](lesson:dat-lich-online) bằng cách chọn dịch vụ, chọn giờ là xong. Bài học này đến từ Moja Beauty ở Helsinki, bạn có thể đặt lịch trên [trang đặt lịch của Moja Beauty](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Vì sao móng tay dễ gãy vào mùa đông?",
      a: "Không khí lạnh và khô bên ngoài, cùng hơi sưởi trong nhà, làm móng và da quanh móng mất độ ẩm. Móng khô thì cứng giòn, dễ nứt và tách lớp. Thoa dầu dưỡng mỗi tối và đeo găng khi ra ngoài giúp móng dẻo và đỡ gãy.",
    },
    {
      q: "Dầu dưỡng móng nên thoa khi nào?",
      a: "Mỗi tối, thoa dầu dưỡng lên da quanh móng và mặt móng rồi xoa nhẹ cho thấm. Da quanh móng mềm hơn, ít xước măng rô, và móng dẻo hơn. Cách này dùng được cả khi bạn đang sơn gel.",
    },
    {
      q: "Làm sao để tay không bị khô nứt mùa đông?",
      a: "Đeo găng tay khi ra ngoài trời lạnh, và thoa một lớp kem tay mỏng ngay sau mỗi lần rửa tay. Khi rửa bát, giặt đồ, đeo thêm găng cao su để tay không tiếp xúc lâu với nước và chất tẩy rửa.",
    },
    {
      q: "Chăm sóc mi mùa đông thế nào?",
      a: "Mi khô và giòn hơn khi trời lạnh và gần hơi sưởi nóng. Chải mi mỗi ngày bằng chổi sạch, không sấy nóng gần mắt và không ngồi sauna quá lâu.",
    },
    {
      q: "Máy tạo ẩm có giúp ích cho da, móng và mi không?",
      a: "Có. Trong nhà có sưởi, không khí rất khô, và một máy tạo ẩm nhỏ giúp ích nhiều. Kết hợp với uống đủ nước, da, móng và mi đều bớt khô.",
    },
  ],
  related: ["mong-co-can-tho", "5-thoi-quen-gel-bong", "cham-soc-sau-lam-mi", "giu-nep-brow-lamination"],
};

export default article;
