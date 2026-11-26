import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/rua-mi-noi-tai-nha/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-rua-mi-noi-tai-nha",
  lesson: "rua-mi-noi-tai-nha",
  category: "tips",
  title: "Cách rửa mi nối tại nhà: 3 bước sạch mi mà không làm rụng mi",
  metaTitle: "Cách rửa mi nối tại nhà: 3 bước không làm rụng mi",
  metaDescription:
    "Cách rửa mi nối tại nhà đúng: tránh tẩy trang gốc dầu, tạo bọt rửa mi không dầu, chải nhẹ bằng cọ mềm khoảng 15 giây mỗi mắt, xả nước mát, sấy mát và chải lại.",
  keyword: "cách rửa mi nối",
  keywords: ["rửa mi nối như thế nào", "mi nối có cần rửa không", "tẩy trang khi nối mi", "bọt rửa mi nối", "nối mi có được dùng tẩy trang dầu không", "vệ sinh mi nối hằng ngày"],
  excerpt: "Mi nối cần được rửa mỗi ngày, nhưng rửa sai là mi rụng rất nhanh. Ba bước rửa mi nối tại nhà, và vì sao phải tránh tẩy trang có dầu.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chai-lai-mi-noi-sau-khi-rua-trong-phong-tam"),
    alt: "Cô gái tóc vàng mặc áo choàng lụa kem đứng trong phòng tắm đá cẩm thạch, dùng chổi nhỏ chải hàng mi nối trước gương",
  },
  takeaways: [
    "Mi nối cần được **rửa mỗi ngày**: bụi, dầu da và lớp trang điểm đọng ở chân mi làm mi bẩn và keo yếu dần.",
    "**Tránh tẩy trang và kem gốc dầu** quanh mắt: dầu làm keo nối mềm ra, mi nối tuột sớm hơn nhiều.",
    "Dùng **bọt rửa mi không dầu** và cọ mềm, chải theo chiều mọc của mi, khoảng **15 giây mỗi mắt**.",
    "Không chà xát, không kéo. Xả nước mát, thấm khô bằng khăn giấy, sấy chế độ mát để xa mặt.",
    "Chải lại mi cho đều sau khi khô.",
  ],
  intro: [
    "Cách rửa mi nối đúng không khó, nhưng khác hẳn cách bạn rửa mặt thường ngày. Mi nối cần được rửa mỗi ngày để chân mi sạch; rửa sai, chà mạnh hay dùng tẩy trang có dầu thì mi rụng rất nhanh. Cả quy trình chỉ có ba bước và mất khoảng một phút.",
    "Bài viết đi theo bài học “Rửa mi nối đúng cách tại nhà” trong khóa Moja Beauty của VaraaAi Academy, khóa học cho khách từ salon Moja Beauty ở Helsinki. Đọc xong, bạn sẽ rửa mi nối được tại nhà mà không làm rụng mi, và biết vì sao phải bỏ tẩy trang gốc dầu.",
  ],
  sections: [
    {
      id: "vi-sao-phai-rua",
      title: "Mi nối có cần rửa không",
      blocks: [
        { p: "Có, và nên rửa mỗi ngày. Chân mi là nơi bụi, dầu da và lớp trang điểm đọng lại, ngay chỗ mối keo. Để lâu, lớp bẩn đó làm chân mi khó chịu và làm keo yếu dần. Một hàng mi sạch cũng đứng tơi và đều hơn hàng mi bết." },
        { p: "Nhiều người sợ nước làm mi nối rụng nên cố tránh rửa. Thật ra nước sạch không phải vấn đề, chỉ trừ 24 giờ đầu sau khi nối, lúc keo còn đang ổn định. Thứ làm mi rụng là dầu, và động tác chà xát." },
      ],
    },
    {
      id: "tranh-tay-trang-dau",
      title: "Vì sao tránh tẩy trang có dầu khi nối mi",
      blocks: [
        { p: "Dầu làm keo nối mi mềm ra. Khi bạn dùng dầu tẩy trang, sữa tẩy trang gốc dầu hay kem mắt nhiều dầu quanh mắt, keo ở chân mi yếu dần sau mỗi lần, và mi nối tuột sớm hơn nhiều so với bình thường. Đó cũng là lý do ở tiệm, thợ tháo mi bằng dung dịch chuyên dụng chứ không dùng dầu gần mắt." },
        {
          table: {
            head: ["Sản phẩm quanh mắt", "Khi đang nối mi"],
            rows: [
              ["Dầu tẩy trang, sáp tẩy trang", "Tránh"],
              ["Kem mắt, dầu dưỡng gốc dầu", "Tránh"],
              ["Bọt rửa mi không dầu", "Dùng hằng ngày"],
              ["Nước sạch, nước mát", "Dùng để xả"],
            ],
          },
        },
        { note: "Đọc nhãn sản phẩm trước khi dùng gần mắt. Nếu không chắc một sản phẩm có dầu hay không, hãy mang đến hỏi thợ ở lần dặm.", kind: "tip", title: "Khi không chắc" },
      ],
    },
    {
      id: "sau-khi-rua",
      title: "Sau khi rửa: làm khô và chải mi",
      blocks: [
        { p: "Làm khô là bước hay bị làm ẩu nhất. Đừng chà khăn lên mắt: động tác chà làm mi nối xoắn và bị kéo. Thấm nhẹ bằng khăn giấy ở vùng quanh mắt là đủ, rồi để hơi gió mát làm phần còn lại." },
        { img: { src: img("lam-kho-mi-bang-luong-gio-mat-de-xa-mat"), alt: "Bàn tay đeo găng đen cầm quạt mini màu kem thổi gió nhẹ lên hàng mi của khách đang nằm nhắm mắt, quạt để cách xa mặt", caption: "Ở tiệm, thợ làm khô mi bằng quạt nhỏ. Ở nhà, máy sấy chế độ mát để xa mặt cho kết quả tương tự." } },
        { p: "Khi mi đã khô, chải lại bằng chổi chải mi sạch từ chân ra ngọn. Các sợi mi nối tách ra, nằm đúng hướng, và hàng mi trông như vừa làm ở tiệm." },
        { img: { src: img("hang-mi-noi-sach-va-deu-sau-khi-chai"), alt: "Cận cảnh mắt khách đang nhắm với hàng mi nối đen sạch, tơi và đều, nằm trên miếng lót trắng", caption: "Mi sạch, khô và chải đều thì đứng tơi, không bết." } },
      ],
    },
    {
      id: "loi-hay-gap",
      title: "Lỗi hay gặp khi rửa mi nối",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Làm thay"],
            rows: [
              ["Dùng dầu tẩy trang", "Keo mềm, mi tuột sớm", "Bọt rửa mi không dầu"],
              ["Chà mạnh bằng ngón tay", "Mi xoắn, tuột, kéo mi thật", "Cọ mềm chải theo chiều mọc"],
              ["Chà khăn lên mắt", "Mi xoắn, bị kéo", "Thấm bằng khăn giấy"],
              ["Sấy nóng, để sát mặt", "Hơi nóng sát vùng mắt", "Sấy mát, để xa mặt"],
              ["Không chải lại", "Mi khô bết, lệch hướng", "Chải từ chân ra ngọn"],
              ["Tránh rửa vì sợ rụng", "Chân mi bẩn, keo yếu", "Rửa nhẹ mỗi ngày"],
            ],
          },
        },
        { p: "Rửa đúng cũng không làm mi hết rụng: mi thật vẫn rụng vài sợi mỗi ngày theo vòng đời, và mi nối rụng theo. Bài [vì sao rụng 2–5 sợi mi mỗi ngày là bình thường](lesson:chu-ky-rung-mi) giải thích chuyện này." },
      ],
    },
    {
      id: "dung-cu-va-lich-dam",
      title: "Dụng cụ cần có và lịch dặm",
      blocks: [
        { p: "Bạn chỉ cần ba thứ: một chai bọt rửa mi không dầu, một cọ rửa mi mềm, và một chổi chải mi sạch." },
        { img: { src: img("chai-mi-bang-choi-sach-tu-chan-ra-ngon"), alt: "Tay đeo găng đen cầm chổi chải mi đen chải hàng mi của khách đang nằm nhắm mắt, miếng lót trắng dưới mắt" } },
        { p: "Rửa mi đúng giúp bộ mi giữ đẹp đến lần dặm, thường sau hai đến ba tuần. Những điều cần nhớ trong ngày đầu tiên có trong bài [chăm sóc mi sau khi nối](lesson:cham-soc-sau-lam-mi); muốn biết vì sao dầu và thói quen kéo mi làm hại mi thật, đọc bài [nối mi có làm rụng mi thật](lesson:noi-mi-co-hai-mi-that)." },
        { p: "Cần bọt rửa mi hay cọ rửa mi? Hãy hỏi Moja Beauty khi bạn đến làm mi. Lịch dặm đặt trên VaraaAi tại [trang của Moja Beauty](/b/moja-beauty)." },
      ],
    },
  ],
  howTo: {
    title: "Cách rửa mi nối tại nhà: 3 bước",
    id: "cac-buoc-rua-mi-noi",
    after: "tranh-tay-trang-dau",
    lead: "Rửa mỗi ngày, bắt đầu từ ngày thứ hai sau khi nối. Mỗi mắt chỉ mất khoảng mười lăm giây chải.",
    supplies: [
      "Bọt rửa mi không dầu",
      "Cọ rửa mi mềm",
      "Nước mát",
      "Khăn giấy",
      "Máy sấy tóc có chế độ mát",
      "Chổi chải mi sạch",
    ],
    steps: [
      {
        name: "Làm ướt mi và lấy bọt",
        text: "Làm ướt mi thật nhẹ nhàng bằng nước, rồi lấy một ít bọt rửa mi không dầu. Bọt mềm len vào chân mi, làm sạch bụi, dầu da và lớp trang điểm mà không cần chà.",
        image: { src: img("co-mem-phu-bot-rua-mi-chai-nhe-chan-mi"), alt: "Cọ mềm phủ bọt trắng được chải nhẹ dọc chân mi trên mắt khách đang nhắm, tay đeo găng đen cầm cọ" },
      },
      {
        name: "Chải nhẹ bằng cọ mềm",
        text: "Dùng cọ mềm chải nhẹ theo chiều mọc của mi, từ chân ra ngọn. Không chà xát, không kéo, chỉ khoảng mười lăm giây mỗi mắt. Mắt nhắm suốt lúc chải để bọt không vào mắt.",
      },
      {
        name: "Xả sạch, thấm khô, sấy mát",
        text: "Xả sạch bọt bằng nước mát, rồi thấm khô vùng quanh mắt bằng khăn giấy, không chà. Sấy chế độ mát, để máy xa mặt, cho đến khi mi khô hẳn. Sau đó chải mi lại cho đều.",
        image: { src: img("xa-mi-bang-nuoc-sach-va-tham-bang-khan-giay"), alt: "Bình bóp nhỏ màu trắng xả dòng nước mảnh lên hàng mi khách đang nhắm mắt, tay kia cầm khăn giấy thấm dưới mắt" },
      },
    ],
  },
  faq: [
    {
      q: "Mi nối có cần rửa hằng ngày không?",
      a: "Có. Bụi, dầu da và lớp trang điểm đọng ở chân mi mỗi ngày, ngay chỗ mối keo. Rửa nhẹ bằng bọt không dầu giúp chân mi sạch và mi nối bền hơn.",
    },
    {
      q: "Đang nối mi có dùng dầu tẩy trang được không?",
      a: "Không nên. Dầu làm keo nối mềm ra, nên mi nối sẽ tuột sớm hơn nhiều. Hãy dùng sản phẩm không dầu cho vùng quanh mắt.",
    },
    {
      q: "Rửa mi nối mất bao lâu?",
      a: "Phần chải bằng cọ chỉ khoảng mười lăm giây mỗi mắt. Tính cả làm ướt, xả và sấy mát, cả quy trình chỉ mất vài phút.",
    },
    {
      q: "Sau khi nối mi bao lâu thì được rửa mi?",
      a: "Trong 24 giờ đầu, giữ mi khô để keo ổn định. Từ ngày hôm sau, bạn rửa mi mỗi ngày theo ba bước.",
    },
    {
      q: "Có được dùng máy sấy để làm khô mi nối không?",
      a: "Được, với chế độ mát và để máy xa mặt. Trước đó, thấm khô vùng quanh mắt bằng khăn giấy thay vì chà khăn lên mắt.",
    },
    {
      q: "Mua bọt rửa mi ở đâu?",
      a: "Cách đơn giản nhất là hỏi salon nơi bạn nối mi. Ở Moja Beauty, bạn có thể hỏi về bọt rửa mi và cọ rửa mi khi đến làm mi.",
    },
  ],
  related: ["cham-soc-sau-lam-mi", "noi-mi-co-hai-mi-that", "chu-ky-rung-mi", "mi-classic"],
};

export default article;
