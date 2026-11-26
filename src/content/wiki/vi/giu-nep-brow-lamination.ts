import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/giu-nep-brow-lamination/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cham-soc-sau-brow-lamination",
  lesson: "giu-nep-brow-lamination",
  category: "tips",
  title: "Chăm sóc sau brow lamination: 5 việc để giữ nếp mày đẹp suốt 6 tuần",
  metaTitle: "Chăm sóc sau brow lamination: giữ nếp mày đẹp 6 tuần",
  metaDescription:
    "Chăm sóc sau brow lamination: 24 giờ đầu giữ mày khô, sáng chải nếp, tối dưỡng mày, tuần đầu tránh sauna, bơi, tẩy da chết, retinol, và bao lâu thì làm lại.",
  keyword: "chăm sóc sau brow lamination",
  keywords: [
    "làm brow lamination xong có được rửa mặt không",
    "brow lamination bao lâu làm lại",
    "giữ nếp brow lamination",
    "dưỡng lông mày sau khi uốn",
    "brow lamination có được đi sauna không",
    "brow lamination bị xẹp nếp",
  ],
  excerpt: "Nếp mày sau lamination giữ được bao lâu phụ thuộc nhiều vào 24 giờ đầu và tuần đầu. Năm việc cần nhớ, từ giữ khô đến chải nếp và dưỡng mày.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-thu-gian-mat-nham-long-may-gon"),
    alt: "Khách nữ đeo băng đô trắng nằm thư giãn trên ghế làm đẹp, mắt nhắm, lông mày gọn gàng, phía sau là cửa sổ vòm và hoa lan",
  },
  takeaways: [
    "**24 giờ đầu giữ mày thật khô**: không rửa, không đổ mồ hôi, không trang điểm vùng mày.",
    "**Mỗi sáng**, dùng chổi mày sạch chải sợi mày lên theo nếp, chỉ mất vài giây.",
    "**Mỗi tối**, thoa một chút dầu dưỡng hoặc serum dưỡng mày, vì thuốc uốn làm sợi mày khô hơn.",
    "**Tuần đầu**, tránh sauna, bơi lội, tẩy da chết và kem retinol ở vùng mày.",
    "**Làm lại sau 6–8 tuần**, đừng làm sớm hơn để sợi mày được nghỉ.",
  ],
  intro: [
    "Chăm sóc sau brow lamination quyết định nếp mày của bạn giữ được trọn sáu tuần hay xẹp sau vài ngày. Lúc bước ra khỏi tiệm, sợi mày đã được uốn và cố định, nhưng trong những giờ đầu nếp vẫn đang định hình. Nước, mồ hôi và vài thói quen chăm da tưởng vô hại có thể làm nếp xẹp sớm hoặc làm sợi mày khô xơ.",
    "Bài viết đi theo bài học “Giữ nếp mày Lamination đẹp suốt 6 tuần” trong khóa “Moja Beauty: mi, móng và mày đẹp” của VaraaAi Academy, từ tiệm Moja Beauty ở Helsinki. Bạn sẽ có một danh sách ngắn để làm theo: việc gì trong 24 giờ đầu, việc gì mỗi sáng mỗi tối, điều gì nên tránh trong tuần đầu và khi nào thì làm lại.",
  ],
  sections: [
    {
      id: "vi-sao-can-cham-soc",
      title: "Vì sao cần chăm sóc sau brow lamination",
      blocks: [
        { p: "Brow lamination uốn định hình sợi mày rồi chải chúng theo một nếp gọn. Giống uốn mi, thuốc thứ nhất làm mềm cấu trúc bên trong sợi để sợi nhận nếp mới, thuốc thứ hai cố định nếp đó. Hai điều này giải thích gần hết những lời dặn bên dưới." },
        {
          ul: [
            "**Nếp cần thời gian để định hình.** Trong 24 giờ đầu, ướt sớm là nếp dễ xẹp.",
            "**Thuốc uốn làm sợi mày khô hơn.** Sợi khô thì xơ, kém bóng, nên cần được dưỡng mỗi ngày.",
          ],
        },
        { p: "Nếu bạn chưa làm và còn phân vân giữa lamination, nhuộm mày hay phun xăm, đọc bài [Brow lamination là gì](lesson:brow-lami-tint-phun) trước." },
      ],
    },
    {
      id: "nhung-dieu-can-tranh",
      title: "Những điều nên tránh trong tuần đầu",
      blocks: [
        {
          table: {
            head: ["Nên tránh", "Trong bao lâu", "Vì sao"],
            rows: [
              ["Rửa mày, làm ướt mày", "24 giờ đầu", "Nếp đang định hình, ướt sớm dễ xẹp"],
              ["Đổ mồ hôi nhiều", "24 giờ đầu", "Hơi ẩm làm nếp xẹp"],
              ["Trang điểm vùng mày", "24 giờ đầu", "Không chạm, không chà lên sợi mày"],
              ["Sauna, bơi lội", "Tuần đầu", "Nhiệt và nước làm nếp yếu đi"],
              ["Tẩy da chết, kem retinol ở vùng mày", "Tuần đầu", "Vùng da vừa tiếp xúc thuốc uốn"],
            ],
          },
        },
        { img: { src: img("khach-hoi-ve-kem-retinol-dang-dung"), alt: "Khách nữ mặc áo choàng tắm ngồi trên giường spa, cầm một tuýp kem đưa cho chuyên viên xem trong phòng có hoa lan trắng", caption: "Đang dùng kem retinol hay sản phẩm tẩy da chết? Tuần đầu, đừng thoa chúng lên vùng mày." } },
        { note: "Tập thể dục ra nhiều mồ hôi, tắm hơi hay đi bơi: nếu đã có kế hoạch, hãy đặt lịch lamination sao cho 24 giờ đầu trống, và tuần đầu không có sauna hay hồ bơi.", kind: "tip", title: "Đặt lịch cho khéo" },
      ],
    },
    {
      id: "da-lam-sai",
      title: "Brow lamination bị xẹp nếp hay mày khô: làm gì",
      blocks: [
        { p: "Lỡ làm ướt mày trong ngày đầu, nếp có thể không còn gọn như lúc ra về. Đừng vội đi làm lại ngay. Tiếp tục chải sợi mày theo nếp mỗi sáng và dưỡng mỗi tối, và hỏi thợ nếu bạn thấy nếp không giữ được." },
        { p: "Không nên uốn lại sớm hơn sáu đến tám tuần. Thuốc uốn đã làm sợi mày khô hơn, uốn thêm một lần nữa quá sớm có thể làm sợi khô, giòn và gãy, và khi đó chỉ còn cách chờ sợi mới mọc ra." },
        { note: "Nếu vùng mày bị đỏ, ngứa, sưng hay rát kéo dài sau khi làm, hãy báo cho tiệm và hỏi bác sĩ. Đừng tự thoa thêm sản phẩm lạ lên vùng da đó. Xem thêm bài [Dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat).", kind: "warn", title: "Khi da phản ứng" },
        { img: { src: img("chuyen-vien-dan-do-khach-sau-lieu-trinh"), alt: "Chuyên viên spa mặc áo kem cầm bìa kẹp hồ sơ, mỉm cười dặn dò khách đeo băng đô và mặc áo choàng tắm ngồi trên ghế bành", caption: "Nghe kỹ lời dặn của thợ trước khi ra về, nhất là loại dầu dưỡng nên dùng." } },
      ],
    },
    {
      id: "lam-lai",
      title: "Brow lamination bao lâu thì làm lại",
      blocks: [
        { p: "Nếp mày thường giữ khoảng sáu đến tám tuần. Sau đó, những sợi mày mới mọc ra chưa được uốn, và hàng mày dần trở lại như cũ. Đó là lúc làm lại, không sớm hơn, để sợi mày có thời gian nghỉ giữa hai lần tiếp xúc với thuốc uốn." },
        { img: { src: img("ghi-ngay-lam-de-hen-lan-sau"), alt: "Chuyên viên spa ngồi bên bàn đá cạnh cửa sổ vòm, gõ ghi chú trên máy tính bảng, phía sau là giường trị liệu và lọ tinh dầu", caption: "Ghi lại ngày làm giúp bạn và tiệm biết khi nào đến lượt làm lại." } },
        { p: "Cách dễ nhất là đặt luôn lịch lần sau khi vừa làm xong. Trên VaraaAi, lịch đã đặt nằm trong mục [lịch hẹn của tôi](lesson:lich-hen-cua-toi), bạn có thể xem lại hoặc đổi khi cần." },
      ],
    },
    {
      id: "dat-lich",
      title: "Muốn thử brow lamination",
      blocks: [
        { p: "Bạn có thể [nhắn tin cho salon](lesson:chat-voi-salon) để hỏi trước mày mình có hợp lamination không, rồi [đặt lịch online](lesson:dat-lich-online): chọn dịch vụ, chọn giờ là xong. Bài học này đến từ Moja Beauty ở Helsinki, nơi bạn có thể đặt lịch trên [trang đặt lịch của Moja Beauty](/b/moja-beauty). Mùa lạnh làm cả mi và mày khô hơn, bài [Giữ mi và móng không khô gãy mùa đông](lesson:mi-mong-mua-dong) có thêm vài thói quen giúp ích." },
      ],
    },
  ],
  howTo: {
    title: "Các bước chăm sóc sau brow lamination",
    id: "cac-buoc-cham-soc",
    after: "vi-sao-can-cham-soc",
    lead: "Năm việc theo đúng thứ tự thời gian, từ lúc rời tiệm đến lần hẹn sau.",
    steps: [
      {
        name: "Giữ mày khô trong 24 giờ đầu",
        text: "Không rửa mày, không để mồ hôi chảy xuống vùng mày, không trang điểm mày. Đây là lúc nếp đang định hình, ướt sớm là nếp dễ xẹp. Khi rửa mặt, tránh vùng mày và thấm khô nhẹ phần da xung quanh.",
      },
      {
        name: "Mỗi sáng, chải sợi mày lên theo nếp",
        text: "Dùng một chiếc chổi mày sạch chải sợi mày lên theo nếp thợ đã tạo. Chỉ vài giây là mày gọn gàng, không cần gel hay chì kẻ. Chải nhẹ tay, đừng kéo mạnh làm sợi đổi hướng.",
        image: { src: img("chai-soi-len-theo-mot-nep-sau-khi-uon"), alt: "Thợ đeo găng đen dùng que kim loại chải từng sợi mi dựng lên khuôn silicone, phía trên là hàng lông mày dày gọn của khách" },
      },
      {
        name: "Mỗi tối, dưỡng mày",
        text: "Thoa một chút dầu dưỡng hoặc serum dưỡng mày. Thuốc uốn làm sợi mày khô hơn, dưỡng đều giúp sợi mềm và bóng trở lại. Chỉ cần một lượng nhỏ, lau phần thừa để không chảy vào mắt.",
      },
      {
        name: "Tuần đầu, tránh nhiệt và sản phẩm mạnh",
        text: "Không sauna, không bơi lội, không tẩy da chết và không thoa kem retinol ở vùng mày trong tuần đầu. Nhiệt, nước và các sản phẩm này có thể làm nếp yếu đi hoặc làm vùng da quanh mày khó chịu.",
      },
      {
        name: "Làm lại sau 6–8 tuần",
        text: "Đặt lịch lần sau sau sáu đến tám tuần, khi sợi mày mới đã mọc ra. Đừng làm sớm hơn, để sợi mày được nghỉ giữa hai lần uốn.",
      },
    ],
  },
  faq: [
    {
      q: "Làm brow lamination xong có được rửa mặt không?",
      a: "Trong 24 giờ đầu, giữ vùng mày thật khô: không rửa mày, không đổ mồ hôi, không trang điểm mày. Bạn có thể làm sạch phần còn lại của khuôn mặt nhưng tránh để nước chạm vào mày, vì ướt sớm làm nếp dễ xẹp.",
    },
    {
      q: "Brow lamination giữ được bao lâu?",
      a: "Nếp mày thường giữ khoảng sáu đến tám tuần. Giữ khô 24 giờ đầu, chải nếp mỗi sáng và dưỡng mày mỗi tối giúp nếp đẹp suốt thời gian đó.",
    },
    {
      q: "Bao lâu thì làm lại brow lamination?",
      a: "Sau sáu đến tám tuần. Đừng làm sớm hơn, để sợi mày được nghỉ, vì thuốc uốn làm sợi mày khô hơn và uốn lại quá sớm có thể làm sợi khô giòn.",
    },
    {
      q: "Sau brow lamination có được đi sauna không?",
      a: "Nên tránh sauna và bơi lội trong tuần đầu sau khi làm. Nhiệt và nước có thể làm nếp mày yếu đi trước khi nếp kịp ổn định.",
    },
    {
      q: "Dưỡng lông mày sau khi uốn bằng gì?",
      a: "Mỗi tối, thoa một chút dầu dưỡng hoặc serum dưỡng mày. Thuốc uốn làm sợi mày khô hơn, và dưỡng đều giúp sợi mềm, bóng. Hỏi thợ loại nào hợp với mày của bạn.",
    },
    {
      q: "Sau brow lamination có dùng kem retinol được không?",
      a: "Trong tuần đầu, tránh thoa kem retinol và tránh tẩy da chết ở vùng mày. Các vùng da khác trên mặt thì làm theo thói quen chăm da của bạn, nhưng giữ sản phẩm xa khỏi vùng mày.",
    },
  ],
  related: ["brow-lami-tint-phun", "mi-mong-mua-dong", "cham-soc-sau-lam-mi", "lash-lift-hieu-dung"],
};

export default article;
