import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/lash-lift/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-uon-mi-lash-lift",
  lesson: "lash-lift",
  category: "lash",
  title: "Cách uốn mi lash lift và nhuộm mi: 12 bước từ chọn khuôn đến dặn khách",
  metaTitle: "Cách uốn mi lash lift và nhuộm mi: 12 bước tại tiệm",
  metaDescription:
    "Hướng dẫn uốn mi lash lift từng bước: thử phản ứng, làm sạch không dầu, dán khuôn sát chân mi, chải mi lên khuôn, bôi hai loại thuốc, nhuộm, gỡ mi và dặn khách.",
  keyword: "cách uốn mi lash lift",
  keywords: [
    "các bước uốn mi",
    "quy trình uốn mi lash lift",
    "cách dán khuôn uốn mi",
    "cách bôi thuốc uốn mi",
    "cách nhuộm mi sau khi uốn",
    "uốn mi cho người mới học",
    "chăm sóc mi sau khi uốn",
  ],
  excerpt: "Mười hai bước của một buổi uốn và nhuộm mi: khuôn sát chân mi, từng sợi nằm thẳng trên khuôn, thuốc chỉ ở phần dưới sợi mi và thời gian theo bảng của hãng.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-uon-mi-lash-lift-cho-khach-tai-studio"),
    alt: "Thợ mi tóc búi cao, mặc áo kem, đeo găng đen cúi xuống làm mi cho khách nằm trên giường, cạnh giường là khay khuôn silicone màu hồng",
  },
  takeaways: [
    "Ba điều giữ suốt buổi: mắt khách nhắm kín, **thuốc không chạm da và không vào mắt**, thời gian luôn theo hướng dẫn của hãng.",
    "Mi phải sạch dầu và **khô hẳn** trước khi lên khuôn: dầu làm thuốc ngấm không đều, mi ướt thì keo dán không bám.",
    "Khuôn dán **sát chân mi**, theo đường cong của mắt. Khuôn xa chân mi làm sợi mi gập khúc.",
    "Đưa mi lên khuôn là bước đáng làm chậm nhất: sợi nằm cong vẹo trên khuôn thì uốn xong cong vẹo y như vậy.",
    "Chỉ nhuộm khi kết quả **thử phản ứng** tốt. Khách thấy cay, rát thì lau thuốc ra ngay, rửa bằng nước sạch và dừng lại.",
  ],
  intro: [
    "Cách uốn mi lash lift không có thao tác nào khó bằng tách mi hay tạo fan trong nối mi, nhưng mọi sai sót đều in thẳng lên mi thật của khách và không sửa ngay được. Một buổi uốn đẹp đến từ bốn chỗ đúng: đúng khuôn, đúng vị trí từng sợi mi trên khuôn, đúng chỗ bôi thuốc và đúng thời gian.",
    "Bài viết này viết lại bài học “Uốn mi và nhuộm mi: thực hành từng bước” trong khóa Nghề Mi của VaraaAi Academy, gồm mười hai bước từ buổi tư vấn đến lúc ghi lại cho lần sau. Bài không đưa ra con số thời gian để thuốc hay tỉ lệ pha: những con số đó nằm trong hướng dẫn của sản phẩm bạn dùng. Hãy xem video bên dưới trước, rồi đọc lại từng bước.",
  ],
  sections: [
    {
      id: "truoc-khi-uon-mi",
      title: "Trước khi uốn mi: ba điều giữ suốt buổi",
      blocks: [
        {
          ul: [
            "Mắt khách nhắm kín.",
            "Thuốc không chạm da và không vào mắt.",
            "Thời gian luôn theo hướng dẫn của hãng.",
          ],
        },
        { p: "Thuốc uốn làm gì với sợi mi, ai hợp với dịch vụ này và vì sao quá giờ làm mi xù đã được giải thích trong bài [uốn mi lash lift là gì](lesson:lash-lift-hieu-dung). Nếu bạn chưa đọc, hãy đọc trước khi cầm que bông." },
        { img: { src: img("bo-dung-cu-uon-mi-lash-lift-khuon-va-thuoc"), alt: "Khay đá cẩm thạch viền vàng bày một hàng khuôn silicone hồng từ nhỏ đến lớn, các gói thuốc, hai lọ nhỏ, chổi chải mi, que tách mi và bông", caption: "Bộ đồ uốn mi: khuôn nhiều cỡ, thuốc, que tách mi, chổi và bông." } },
        { note: "Nếu thuốc lỡ vào mắt, rửa ngay bằng nhiều nước sạch; mắt vẫn đau, đỏ hay nhìn mờ thì đi khám. Thời gian để thuốc, tỉ lệ pha, cỡ khuôn và cách thử phản ứng luôn theo hướng dẫn của sản phẩm. Quy định khác nhau theo từng nước, và đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "An toàn" },
      ],
    },
    {
      id: "chon-khuon-va-uom-thu",
      title: "Cách chọn khuôn uốn mi và ướm thử",
      blocks: [
        { p: "Nhìn mi thật trước: dài hay ngắn, mảnh hay dày. Độ dài quyết định cỡ khuôn, còn độ dày và độ cứng quyết định thời gian trong bảng của hãng." },
        {
          table: {
            head: ["Bạn muốn", "Chọn khuôn"],
            rows: [
              ["Uốn cho mi ngắn", "Khuôn nhỏ"],
              ["Uốn cho mi dài", "Khuôn lớn hơn"],
              ["Cong nhiều", "Nhỏ hơn một chút"],
              ["Cong nhẹ", "Lớn hơn một chút"],
            ],
          },
        },
        { p: "Trước khi dán, ướm thử: chải nhẹ mi lên khuôn xem ngọn mi nằm tới đâu. Nhiều hãng hướng dẫn ngọn mi nằm khoảng giữa đến gần mép trên của khuôn, tuỳ độ cong muốn. Làm theo bảng của hãng bạn dùng." },
      ],
    },
    {
      id: "boi-thuoc-uon-mi-o-dau",
      title: "Bôi thuốc uốn mi và thuốc nhuộm ở đâu",
      blocks: [
        {
          table: {
            head: ["Sản phẩm", "Bôi ở đâu", "Lấy ra bằng gì"],
            rows: [
              ["Thuốc thứ nhất (làm mềm)", "Lớp mỏng ở phần dưới sợi mi, từ gần chân lên khoảng giữa sợi", "Que bông khô, lau từ chân lên ngọn"],
              ["Thuốc thứ hai (cố định)", "Đúng vùng như thuốc thứ nhất", "Que bông khô, lau như trước"],
              ["Thuốc nhuộm", "Chỉ trên sợi mi đang nằm trên khuôn, không chạm da", "Bông ẩm, lau đến khi bông không còn màu"],
            ],
          },
        },
        { p: "Thuốc uốn không lên da mí và không ra tới ngọn mi. Ngọn mi mảnh, dễ hư, và một lớp mỏng ở phần dưới sợi mi là đủ để sợi mi nhận dáng của khuôn." },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Lỗi thường gặp khi uốn mi và cách tránh",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Điều xảy ra", "Cách tránh"],
            rows: [
              ["Mi còn ướt khi đưa lên khuôn", "Keo dán không bám, sợi mi trượt khỏi khuôn", "Đợi mi khô hẳn"],
              ["Còn mascara hoặc dầu trên mi", "Thuốc ngấm không đều", "Làm sạch bằng sản phẩm không dầu"],
              ["Khuôn dán xa chân mi", "Sợi mi gập khúc", "Dán sát chân mi nhất có thể"],
              ["Sợi mi bắt chéo, cong vẹo trên khuôn", "Uốn xong cong vẹo y như vậy", "Chải từng nhóm nhỏ, mỗi sợi thẳng và tách riêng"],
              ["Để thuốc lâu hơn bảng của hãng", "Mi xù và giòn", "Bấm giờ, không tự ý thêm phút"],
              ["Lau thuốc nhuộm chưa sạch", "Dễ làm đen da và gây kích ứng", "Lau bằng bông ẩm đến khi bông không còn màu"],
            ],
          },
        },
      ],
    },
    {
      id: "khach-thay-cay-rat",
      title: "Khách thấy cay, rát trong lúc chờ thuốc",
      blocks: [
        { p: "Trong lúc thuốc đang ngấm, hỏi khách xem có thấy cay, rát hay khó chịu không. Cay, rát là dấu hiệu thuốc chạm da hoặc gần vào mắt, hoặc khách đang phản ứng. Không bao giờ bảo khách cố chịu đến hết giờ: lau thuốc ra ngay, rửa bằng nước sạch và dừng lại." },
        { p: "Lúc khách mở mắt cuối buổi cũng vậy. Nếu khách thấy cay hay chảy nước mắt, cho khách nhắm lại, rửa bằng nước sạch và theo dõi. Cách xử lý khi hoá chất vào mắt có trong bài [Xử lý sự cố](lesson:xu-ly-su-co), còn những trường hợp nên từ chối ngay từ buổi tư vấn nằm ở bài [Khi nào không nên làm](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "sau-khi-uon-mi",
      title: "Sau khi uốn mi: dặn khách, ghi lại và dọn dẹp",
      blocks: [
        { p: "Dặn khách giữ mi khô trong khoảng thời gian hãng khuyên, thường là một ngày. Trong lúc đó không chuốt mascara, không xông hơi, không dụi mắt. Kết quả thường giữ được khoảng 6–8 tuần. Không uốn lại sớm hơn hãng khuyên, và hẹn lần sau khi mi mới đã mọc nhiều." },
        { note: "Ghi vào ghi chú của khách trong [hồ sơ khách hàng](lesson:khach-hang) trên VaraaAi: cỡ khuôn, thời gian từng thuốc, màu nhuộm và ngày thử phản ứng. Kết quả đẹp thì lần sau làm lại y như vậy; chưa ưng thì biết chính xác chỗ cần chỉnh.", kind: "tip", title: "Thói quen đáng giữ" },
        { p: "Khách về rồi: que bông, miếng lót, màng bọc và phần thuốc đã pha còn thừa đều bỏ đi, không để dành. Khuôn và dụng cụ dùng lại được làm sạch và khử khuẩn như trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
        { p: "Nếu tiệm nhận đặt lịch qua VaraaAi, hãy đặt thời lượng thật cho uốn mi trong phần [dịch vụ](lesson:dich-vu), tính cả phần nhuộm. Với khách có nhuộm, buổi thử phản ứng diễn ra trước, nên [lịch hẹn](lesson:lich-hen) uốn mi được tạo sau ngày thử." },
      ],
    },
  ],
  howTo: {
    title: "Các bước uốn mi lash lift và nhuộm mi",
    id: "cac-buoc-uon-mi",
    after: "truoc-khi-uon-mi",
    lead: "Mười hai bước theo thứ tự trong video bài học. Thời gian của từng thuốc không có trong bài: hãy lấy từ bảng của hãng.",
    supplies: [
      "Khuôn silicone uốn mi nhiều cỡ và keo dán mi chuyên dụng",
      "Thuốc thứ nhất (làm mềm) và thuốc thứ hai (cố định)",
      "Thuốc nhuộm dành cho mi và mày, nếu có nhuộm",
      "Sản phẩm làm sạch mi không dầu",
      "Miếng lót dưới mắt, màng bọc",
      "Que tách mi, que bông, bông ẩm",
      "Serum dưỡng mi, nếu bộ sản phẩm có",
    ],
    steps: [
      {
        name: "Tư vấn và thử phản ứng",
        text: "Hỏi về mắt, về dị ứng và lần uốn mi gần nhất. Khách đang nối mi thì tháo mi nối trước, như trong bài [dặm và tháo mi](lesson:mi-dam-thao). Nếu có nhuộm, làm thử phản ứng theo hướng dẫn của hãng, thường 48 giờ trước buổi làm, rồi ghi ngày thử và kết quả vào hồ sơ khách.",
      },
      {
        name: "Làm sạch mi và để khô hẳn",
        text: "Dùng sản phẩm làm sạch không dầu. Mascara hay dầu còn sót lại làm thuốc ngấm không đều. Lau khô thật kỹ và đợi mi khô hẳn, vì mi còn ướt thì keo dán không bám và sợi mi trượt khỏi khuôn.",
      },
      {
        name: "Dán miếng lót dưới mắt",
        text: "Cho khách nằm thoải mái, nhắm mắt, rồi dán miếng lót che hết mi dưới. Miếng lót giữ cho mi dưới không lẫn lên khuôn và che phần da dưới mắt khỏi thuốc. Dán phẳng, không chạm vào mắt.",
      },
      {
        name: "Chọn khuôn và dán sát chân mi",
        text: "Chọn cỡ khuôn theo độ dài mi và độ cong muốn, ướm thử theo bảng của hãng. Dán khuôn lên mí trên, sát chân mi nhất có thể, đi theo đường cong của mắt từ đầu mắt đến đuôi mắt. Khuôn chỉ nằm trên da mí, không chạm vào mắt.",
        image: { src: img("dan-khuon-uon-mi-sat-chan-mi"), alt: "Đầu ngón tay đeo găng đen ấn chiếc khuôn silicone hồng lên mí trên của khách, mép khuôn nằm sát chân mi, dưới mắt có miếng lót trắng" },
      },
      {
        name: "Đưa mi lên khuôn",
        text: "Phết một lớp keo dán mi chuyên dụng thật mỏng lên khuôn. Dùng que tách mi chải từng nhóm nhỏ sợi mi lên khuôn, từ đầu mắt ra đuôi mắt. Mỗi sợi nằm thẳng, tách riêng, không bắt chéo, chân mi dựng lên sát mép khuôn, và không sợi mi dưới nào lẫn lên. Đây là bước đáng làm chậm nhất.",
        image: { src: img("chai-mi-len-khuon-bang-que-tach-mi"), alt: "Que tách mi bằng kim loại trong tay đeo găng đen chải hàng mi thật thẳng lên khuôn silicone hồng, từng sợi tách riêng" },
      },
      {
        name: "Bôi thuốc thứ nhất",
        text: "Dùng que bông nhỏ bôi một lớp thuốc làm mềm thật mỏng lên phần dưới của sợi mi, từ gần chân lên khoảng giữa sợi. Không bôi lên da mí. Không bôi ra tới ngọn mi, vì ngọn mi mảnh và dễ hư.",
        image: { src: img("boi-thuoc-uon-mi-o-phan-duoi-soi-mi"), alt: "Que bông nhỏ trong tay đeo găng đen phết một lớp thuốc uốn mỏng màu trắng lên phần dưới của hàng mi đang nằm trên khuôn silicone" },
      },
      {
        name: "Phủ màng, bấm giờ và hỏi khách",
        text: "Phủ một miếng màng bọc mỏng lên khuôn để giữ ấm, giữ ẩm, rồi bấm giờ theo bảng của hãng và theo loại mi của khách. Đừng tự ý để lâu hơn cho chắc: quá giờ là mi xù và giòn. Trong lúc chờ, hỏi khách có thấy cay, rát không; nếu có thì lau thuốc ra ngay, rửa bằng nước sạch và dừng lại.",
        image: { src: img("phu-mang-boc-len-khuon-khi-cho-thuoc-uon-mi"), alt: "Một miếng màng bọc trong suốt phủ lên hàng mi và khuôn silicone trên mắt khách đang nhắm, mép màng nằm trên miếng lót trắng" },
      },
      {
        name: "Lau thuốc thứ nhất",
        text: "Dùng que bông khô lau nhẹ theo chiều từ chân lên ngọn cho đến khi sạch thuốc. Sợi mi vẫn phải nằm yên trên khuôn, nên tay lau thật nhẹ và luôn đi cùng một chiều.",
        image: { src: img("lau-thuoc-uon-mi-bang-que-bong-kho"), alt: "Que bông khô trong tay đeo găng đen lau nhẹ từ chân lên ngọn hàng mi đang nằm trên khuôn silicone hồng" },
      },
      {
        name: "Bôi thuốc thứ hai",
        text: "Thuốc cố định được bôi đúng vùng như thuốc thứ nhất. Phủ màng, bấm giờ theo hãng, rồi lau sạch bằng que bông khô như trước.",
      },
      {
        name: "Nhuộm mi",
        text: "Chỉ nhuộm khi kết quả thử phản ứng tốt. Chọn màu theo màu mày và tóc của khách, pha thuốc đúng tỉ lệ hãng ghi ngay trước khi dùng. Bôi lên sợi mi đang nằm trên khuôn, chỉ trên sợi mi, không chạm da, và bấm giờ theo hãng. Lau thật kỹ bằng bông ẩm đến khi bông không còn màu.",
        image: { src: img("lau-sach-thuoc-nhuom-mi-bang-bong-am"), alt: "Miếng bông ẩm trong tay đeo găng đen lau hàng mi đã nhuộm đen trên khuôn, mặt bông dính vệt thuốc nhuộm sẫm màu" },
      },
      {
        name: "Gỡ mi khỏi khuôn",
        text: "Thấm một chút nước, hoặc dung dịch gỡ của hãng, lên que bông rồi nhẹ nhàng gỡ sợi mi ra khỏi khuôn. Không kéo, không giật. Sau đó gỡ khuôn và lau sạch mí mắt.",
        image: { src: img("go-mi-khoi-khuon-uon-mi-nhe-nhang"), alt: "Que bông nhỏ thấm nước trong tay đeo găng đen gỡ nhẹ hàng mi đã uốn cong ra khỏi khuôn silicone trên mí mắt khách" },
      },
      {
        name: "Dưỡng mi, so hai mắt và dặn dò",
        text: "Nếu bộ sản phẩm có serum dưỡng mi, chải một lớp mỏng lên mi. So hai mắt xem độ cong và màu có đều nhau không. Gỡ miếng lót, cho khách mở mắt từ từ, rồi dặn khách giữ mi khô theo thời gian hãng khuyên và ghi lại buổi làm vào hồ sơ khách.",
        image: { src: img("chai-serum-duong-mi-sau-khi-uon"), alt: "Nhìn từ đầu giường, chổi chải mi trong tay đeo găng đen chải hàng mi đã uốn cong của khách, hai miếng lót trắng vẫn nằm dưới mắt" },
      },
    ],
  },
  faq: [
    {
      q: "Uốn mi lash lift gồm những bước nào?",
      a: "Tư vấn và thử phản ứng nếu có nhuộm, làm sạch mi không dầu và để khô, dán miếng lót, dán khuôn sát chân mi, chải mi lên khuôn, bôi thuốc thứ nhất rồi lau, bôi thuốc thứ hai rồi lau, nhuộm, gỡ mi khỏi khuôn, dưỡng mi và dặn dò. Thời gian của từng thuốc theo bảng của hãng.",
    },
    {
      q: "Thuốc uốn mi để bao lâu?",
      a: "Không có một con số chung. Thời gian tuỳ loại mi của khách và sản phẩm bạn dùng, nên phải bấm giờ theo bảng của hãng. Tự ý để lâu hơn cho chắc làm mi xù và giòn.",
    },
    {
      q: "Vì sao uốn mi xong sợi mi bị gập khúc hoặc cong vẹo?",
      a: "Sợi mi gập khúc khi khuôn dán cách xa chân mi. Sợi mi cong vẹo khi nó đã nằm cong vẹo hoặc bắt chéo trên khuôn từ bước chải mi lên. Dán khuôn sát chân mi và chải từng nhóm nhỏ cho mỗi sợi nằm thẳng, tách riêng.",
    },
    {
      q: "Nhuộm mi trước hay sau khi uốn?",
      a: "Trong bài học, mi được nhuộm sau bước thuốc thứ hai, khi sợi mi vẫn đang nằm trên khuôn, và chỉ khi kết quả thử phản ứng tốt. Thuốc nhuộm bôi chỉ trên sợi mi, không chạm da, rồi lau bằng bông ẩm đến khi bông không còn màu.",
    },
    {
      q: "Khách thấy cay mắt khi đang uốn mi thì làm gì?",
      a: "Lau thuốc ra ngay, rửa bằng nước sạch và dừng lại. Cay, rát là dấu hiệu thuốc chạm da hoặc gần vào mắt, hoặc khách đang phản ứng. Nếu thuốc lỡ vào mắt, rửa bằng nhiều nước sạch và đi khám nếu mắt vẫn đau, đỏ hay nhìn mờ.",
    },
    {
      q: "Sau khi uốn mi bao lâu thì được rửa mặt, chuốt mascara?",
      a: "Giữ mi khô trong khoảng thời gian hãng khuyên, thường là một ngày. Trong lúc đó không chuốt mascara, không xông hơi và không dụi mắt.",
    },
  ],
  related: ["lash-lift-hieu-dung", "mi-dam-thao", "mi-chuan-bi", "di-ung-hoa-chat"],
};

export default article;
