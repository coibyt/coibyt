import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/french-ombre/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-ve-mong-french-va-ombre",
  lesson: "french-ombre",
  category: "nail",
  title: "Cách vẽ móng French và sơn móng ombré: 12 bước cho đường cười đều",
  metaTitle: "Cách vẽ móng French và sơn móng ombré: 12 bước",
  metaDescription:
    "Hướng dẫn cách vẽ móng French bằng cọ nét và cách sơn móng ombré: nền hồng, chọn đường cười, vẽ từ hai góc vào giữa, làm sạch đường, tán màu bằng cọ hay mút.",
  keyword: "cách vẽ móng French",
  keywords: ["cách sơn móng ombre", "cách vẽ đường cười French", "vẽ French bằng cọ nét", "cách làm móng baby boomer", "tán màu ombre bằng mút", "các bước làm móng French gel", "ombre bị vạch trắng"],
  excerpt: "French cổ điển bằng cọ nét rồi ombré baby boomer, từng bước: chọn đường cười, vẽ hai nửa cân nhau, làm sạch đường trước khi hơ và tán màu không để lại vạch.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-ve-mong-french-cho-khach-tai-salon"),
    alt: "Thợ nail tóc nâu đỏ mặc áo kem, đeo găng đen đang vẽ móng cho khách tóc vàng tại bàn đá trong salon kiểu Paris",
  },
  takeaways: [
    "Dũa dáng móng xong trước rồi mới vẽ, vì đường cười phải hợp với dáng móng.",
    "Nhìn cả mười móng rồi mới chọn đường cười; hình dung **ba điểm**: hai góc sâu bằng nhau và một điểm giữa nông nhất.",
    "Vẽ phần trắng từ một góc vào giữa, rồi từ góc kia vào giữa với cùng độ sâu. Lớp trắng luôn mỏng.",
    "**Làm sạch đường cười trước khi hơ** bằng cọ dẹt nhỏ chỉ hơi ẩm dung dịch lau. Móng lệch cũng sửa trước khi hơ.",
    "Ombré: trắng chỉ ở khoảng một phần ba phía đầu móng, tán từng móng một rồi hơ ngay, thường hai đến ba lớp mỏng.",
  ],
  intro: [
    "Cách vẽ móng French bằng cọ nét không đòi hỏi bàn tay của họa sĩ. Nó đòi hỏi một thứ tự làm việc: chọn đường cười cho cả bộ trước, vẽ từng nửa từ góc vào giữa, rồi cắt lại đường cho sắc khi gel còn mềm. Ombré thì ngược hẳn, không có đường nào để vẽ, chỉ có một lớp trắng mỏng được tán lên từng chút.",
    "Bài viết này viết lại bài học “French và ombré: thực hành từng bước” trong khóa Nghề Nail của VaraaAi Academy. Tám bước đầu làm một bộ French cổ điển, bốn bước sau làm ombré baby boomer. Xem video bài học bên dưới để thấy góc đặt cọ, sau đó đọc lại từng bước khi luyện trên móng mẫu.",
  ],
  sections: [
    {
      id: "truoc-khi-ve",
      title: "Trước khi vẽ: phần chuẩn bị giống hệt sơn gel",
      blocks: [
        { p: "French và ombré là sơn gel có thêm một công đoạn tạo hình. Phần chuẩn bị móng, lớp lót và cách hơ đèn giống hệt quy trình [sơn gel từng bước](lesson:son-gel), nên bài này chỉ nhắc lại ngắn và dành thời gian cho đường cười và cách tán màu." },
        { p: "Có một điểm khác về thứ tự: dáng móng phải xong hẳn rồi mới vẽ. Đường cười trên móng vuông thoải hơn, trên móng hạnh nhân cong sâu hơn. Dũa lại dáng sau khi đã vẽ thì đường cười không còn khớp với đầu móng nữa." },
        { note: "Trước khi đặt cọ, hình dung ba điểm trên móng: hai điểm ở hai góc đầu móng, sâu bằng nhau, và một điểm ở giữa, chỗ đường cười nông nhất. Đặt đúng ba điểm, đường cười gần như tự đều.", kind: "tip", title: "Mẹo ba điểm" },
        { p: "Phần lý thuyết về đường cười đẹp, tỷ lệ phần trắng theo chiều dài móng và các kiểu French có trong bài [móng French là gì](lesson:french-ombre-hieu-dung)." },
      ],
    },
    {
      id: "co-hay-mut",
      title: "Tán màu ombré bằng cọ hay bằng mút",
      blocks: [
        { p: "Hai cách đều cho kết quả đẹp. Chọn cách nào tùy tay bạn quen với dụng cụ nào hơn." },
        {
          table: {
            head: ["Cách tán", "Làm thế nào", "Lưu ý"],
            rows: [
              ["Cọ dẹt sạch, gần khô", "Đặt cọ ở chỗ trắng gặp hồng, kéo những nét thật ngắn và thật nhẹ hướng lên phía chân móng", "Lau cọ thường xuyên"],
              ["Miếng mút nhỏ", "Chấm nhẹ lên chỗ chuyển màu nhiều lần cho phần trắng mờ dần lên trên", "Mỗi khách một miếng, dùng xong thì bỏ"],
            ],
          },
        },
        { img: { src: img("tan-mau-ombre-bang-mieng-mut"), alt: "Thợ nail dùng một miếng mút trắng nhỏ chấm nhẹ lên giữa móng của khách, chỗ gel trắng gặp nền hồng", caption: "Tán bằng mút: chấm nhẹ nhiều lần ở chỗ chuyển màu." } },
        { p: "Với màu trắng, nhiều thợ chọn trắng sữa, hơi trong, thay vì trắng đặc, vì nó mềm hơn và dễ tán hơn. Nền hồng hay màu da chính là màu ở chân móng của bộ ombré, nên hãy chọn màu hợp với da tay của khách." },
        { img: { src: img("bo-mong-ombre-baby-boomer-hoan-thien"), alt: "Hai bàn tay khách đặt chồng lên nhau trên gối kê màu kem, mười móng ombré hồng chuyển dần sang trắng sữa bóng đều", caption: "Bộ ombré hoàn thiện: độ chuyển màu giống nhau trên cả mười móng." } },
      ],
    },
    {
      id: "loi-va-cach-sua",
      title: "Lỗi khi vẽ French, sơn ombré và cách sửa",
      blocks: [
        { p: "Gần như mọi lỗi của French đều sửa được trong vài giây nếu gel chưa vào đèn. Sau khi hơ, cũng lỗi đó phải chà đi, vừa mất công vừa làm mỏng lớp nền." },
        {
          table: {
            head: ["Hiện tượng", "Nguyên nhân thường gặp", "Cách sửa"],
            rows: [
              ["Đường cười lệch hai bên", "Hai góc đặt cọ không cùng độ sâu", "Trước khi hơ: lau sạch phần trắng ở móng đó bằng cọ thấm dung dịch lau rồi vẽ lại"],
              ["Mép đường cười nhòe", "Bỏ qua bước làm sạch đường, hoặc cọ quá ướt làm loang màu trắng", "Chấm cọ lên khăn cho gần khô rồi mới lướt dọc mép trong"],
              ["Gel se lại trước khi kịp làm sạch", "Tay khách để gần đèn khi đang vẽ, ánh sáng hắt ra làm gel se", "Để tay khách xa đèn; vẽ vài móng rồi hơ"],
              ["Phần trắng chưa đủ trắng", "Lớp đầu mỏng, đúng như nó phải thế", "Thêm một lớp mỏng theo đúng đường cũ, làm sạch đường rồi hơ"],
              ["Ombré có vạch hoặc sọc", "Lớp trắng quá dày, hoặc tán chưa đủ", "Lớp mỏng, tán nhẹ nhiều lần, tán xong móng nào hơ móng đó"],
              ["Trắng ombré lên quá gần chân móng", "Đặt trắng quá cao từ đầu, khi tán màu còn đi lên thêm", "Chỉ đặt trắng ở khoảng một phần ba phía đầu móng"],
            ],
          },
        },
        { img: { src: img("loi-ombre-bi-vach-trang-ngang-mong"), alt: "Cận cảnh một móng ombré bị lỗi, phần trắng dừng lại thành một vạch ngang lởm chởm giữa móng thay vì mờ dần", caption: "Hình minh họa lỗi: lớp trắng dày và tán vội để lại một vạch ngang." } },
      ],
    },
    {
      id: "an-toan-ve-sinh",
      title: "An toàn với gel và dọn bàn sau khi khách về",
      blocks: [
        {
          ul: [
            "Gel chưa chín không để chạm da. Lỡ dính thì lau sạch trước khi cho tay vào đèn.",
            "Thời gian hơ và cách dùng sản phẩm luôn theo hướng dẫn của hãng.",
            "Mút, bông và dũa đã dùng được bỏ vào thùng rác có nắp.",
            "Dụng cụ kim loại mang đi làm sạch và tiệt trùng, như trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu).",
            "Lau sạch cọ và đậy kín các chai gel.",
          ],
        },
        { note: "Quy định về sản phẩm làm móng khác nhau theo từng nước, bạn cần xem quy định nơi mình làm việc. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "ghi-ho-so-khach",
      title: "Ghi lại kiểu French của khách để lần sau làm y như cũ",
      blocks: [
        { p: "Khách làm French thường quay lại với đúng một yêu cầu: làm như lần trước. Trong VaraaAi, bạn ghi vào hồ sơ [khách hàng](lesson:khach-hang) kiểu French, độ sâu và màu nền đã làm, để lần sau không phải đoán. Nếu tiệm chưa tách French và ombré thành dịch vụ riêng, bạn [thêm dịch vụ](lesson:dich-vu) với thời lượng riêng để lịch có đủ thời gian làm kỹ, rồi đưa giá vào [bảng giá](lesson:bang-gia) của tiệm." },
      ],
    },
  ],
  howTo: {
    title: "Các bước vẽ móng French và sơn móng ombré",
    id: "cac-buoc-french-ombre",
    after: "truoc-khi-ve",
    lead: "Bước 1 đến 8 là French cổ điển bằng cọ nét. Bước 9 đến 12 là ombré, bắt đầu lại từ lớp nền sau cùng phần chuẩn bị và lớp lót.",
    supplies: [
      "Cây đẩy da, dũa, phao chà mịn, bông gạc không xơ và dung dịch lau móng",
      "Gel lót, gel top và đèn đúng loại hãng gel yêu cầu",
      "Gel nền hồng trong hoặc hơi đục, hay màu da",
      "Gel trắng làm đầu móng; trắng sữa nếu làm ombré",
      "Cọ nét dài và mảnh, cọ dẹt nhỏ sạch",
      "Miếng mút nhỏ, mỗi khách một miếng",
      "Dầu dưỡng da quanh móng",
    ],
    steps: [
      {
        name: "Chuẩn bị móng khô và dũa dáng trước",
        text: "Rửa tay, sát khuẩn tay, nhìn kỹ móng và da của khách. Chuẩn bị khô, không ngâm nước: đẩy da, lấy sạch lớp da mỏng trên mặt móng, chà nhẹ cho mất bóng, rồi lau sạch dầu. Dáng móng phải dũa xong ở bước này, vì đường cười sẽ đi theo dáng.",
      },
      {
        name: "Sơn lớp lót và nền hồng mỏng",
        text: "Lớp lót mỏng, bịt đầu móng, hơ đèn theo thời gian của hãng. Sau đó sơn một hay hai lớp hồng trong, mỏng, mỗi lớp hơ riêng. Nếu đường đầu móng thật của khách bị lệch, chọn nền hơi đục một chút để che nó đi.",
      },
      {
        name: "Chọn đường cười cho cả bộ",
        text: "Nhìn cả mười móng trước khi vẽ. Chọn độ sâu theo móng ngắn nhất, hoặc móng có đầu móng thật lệch nhất, để cả bộ có thể làm đều nhau. Hình dung trước ba điểm trên mỗi móng: hai góc sâu bằng nhau và điểm giữa nông nhất.",
        image: { src: img("nhin-ca-ban-tay-truoc-khi-chon-duong-cuoi"), alt: "Một bàn tay khách đặt úp trên gối kê màu kem, các móng French nhìn từ trên xuống có phần trắng cùng một độ sâu", caption: "Cho khách đặt bàn tay thẳng và nhìn từ trên xuống: độ sâu phải bằng nhau trên các móng." },
      },
      {
        name: "Vẽ nửa thứ nhất từ một góc vào giữa",
        text: "Lấy một ít gel trắng trên cọ nét, vừa đủ, đừng nhiều. Đặt cọ ở một góc đầu móng, đúng điểm đã chọn, rồi kéo theo đường cong về điểm giữa móng. Tay giữ chắc và xoay nhẹ ngón tay của khách theo nét cọ, đừng xoay cổ tay mình.",
        image: { src: img("ve-mong-french-tu-mot-goc-vao-giua"), alt: "Cọ nét mảnh trong tay thợ đeo găng đen đặt ở một góc đầu móng, phần trắng mới vẽ được nửa trên của đường cười" },
      },
      {
        name: "Vẽ nửa còn lại từ góc kia và tô kín",
        text: "Đặt cọ ở góc đối diện, sâu đúng bằng góc thứ nhất, rồi kéo về giữa cho hai nửa gặp nhau thành một đường cong liền. Tô kín phần trắng ra tới mép và quét nhẹ qua mép đầu móng. Lớp trắng phải mỏng; chưa đủ trắng thì để lớp sau. Với ngón út, phần trắng thu nhỏ theo móng nhưng nhìn bằng mắt độ sâu vẫn tương đương các móng khác.",
        image: { src: img("ve-nua-con-lai-cua-duong-cuoi-french"), alt: "Cọ nét mảnh hoàn thành nửa dưới của phần trắng, hai nửa gặp nhau ở giữa thành một đường cười cân đối trên nền hồng", caption: "Hai nửa vẽ từ hai góc, gặp nhau ở giữa như soi gương." },
      },
      {
        name: "Làm sạch đường cười trước khi hơ",
        text: "Nhúng cây cọ dẹt nhỏ vào dung dịch lau rồi chấm lên khăn cho gần khô, chỉ còn hơi ẩm. Lướt cọ dọc theo mép trong của phần trắng để cắt cho đường cười sắc và đều, lau cọ sau mỗi lần lướt. Cọ ướt quá thì dung dịch sẽ làm loang phần trắng.",
        image: { src: img("lam-sach-duong-cuoi-bang-co-det"), alt: "Cọ dẹt nhỏ đầu vát lướt dọc mép trong của phần trắng trên móng French để cắt đường cười cho sắc nét" },
      },
      {
        name: "Sửa móng lệch rồi hơ đèn",
        text: "Móng nào vẽ lệch thì sửa ngay lúc này: lau sạch phần trắng ở móng đó bằng cọ thấm dung dịch lau và vẽ lại. Đừng hơ một móng lệch với ý định sửa sau. Vẽ vài móng rồi hơ, không vẽ cả bàn tay một lúc, và giữ tay khách xa đèn khi đang vẽ. Hơ đủ thời gian; cần trắng hơn thì thêm một lớp mỏng đúng theo đường cũ, làm sạch đường rồi hơ lại.",
      },
      {
        name: "Phủ top và kiểm tra cả mười móng",
        text: "Phủ top kín cả móng, quét qua mép đầu móng, hơ đủ thời gian. Top có lớp dính thì lau sạch. Sau đó cho khách đặt bàn tay thẳng và nhìn từ trên xuống: độ sâu có bằng nhau không, hai góc có cân không. Móng nào lệch thì sửa trước khi khách về.",
      },
      {
        name: "Ombré: sơn nền và đặt trắng ở đầu móng",
        text: "Chuẩn bị móng và lớp lót y như French. Sơn một lớp nền hồng hay màu da thật mỏng rồi hơ chín. Đặt màu trắng chỉ ở khoảng một phần ba phía đầu móng, lớp mỏng, lúc này chưa cần đẹp. Đừng đưa trắng lên gần chân móng, vì khi tán màu sẽ còn đi lên thêm.",
        image: { src: img("dat-gel-trang-o-dau-mong-lam-ombre"), alt: "Cận cảnh một móng nền hồng có dải gel trắng mới đặt ở một phần ba phía đầu móng, mép trong còn là đường thẳng chưa tán", caption: "Trắng chỉ nằm ở khoảng một phần ba phía đầu móng trước khi tán." },
      },
      {
        name: "Tán màu từng móng một",
        text: "Dùng cọ dẹt sạch, gần khô, đặt ở chỗ trắng gặp hồng và kéo những nét thật ngắn, thật nhẹ lên phía chân móng. Hoặc dùng miếng mút nhỏ chấm nhẹ nhiều lần lên chỗ chuyển màu. Cách nào cũng làm từng móng một và tán xong là hơ, để màu không kịp chảy lại thành vạch.",
        image: { src: img("tan-mau-ombre-bang-co-det"), alt: "Cọ dẹt nhỏ trong tay thợ đeo găng đen kéo những nét ngắn từ phần trắng ở đầu móng lên phía chân móng nền hồng" },
      },
      {
        name: "Hơ, nhìn lại và thêm lớp mỏng nếu cần",
        text: "Sau khi hơ, xem chỗ chuyển màu đã mềm chưa và đầu móng đủ trắng chưa. Nếu chưa, làm thêm một lớp mỏng nữa, đặt trắng thấp hơn lớp trước một chút, tán rồi hơ. Thường hai đến ba lớp mỏng là đẹp. Thấy vạch hay sọc là dấu hiệu lớp đã quá dày hoặc tán chưa đủ.",
      },
      {
        name: "Phủ top, thoa dầu dưỡng và dọn bàn",
        text: "Phủ top, hơ đủ thời gian rồi nhỏ dầu dưỡng quanh móng. Kiểm tra lại cả mười móng: độ chuyển màu phải giống nhau. Khi khách về, bỏ mút, bông và dũa đã dùng vào thùng có nắp, mang dụng cụ kim loại đi làm sạch và tiệt trùng, lau cọ và đậy kín chai gel.",
      },
    ],
  },
  faq: [
    {
      q: "Vẽ móng French nên bắt đầu từ đâu trên móng?",
      a: "Bắt đầu từ một góc đầu móng và kéo cọ theo đường cong về giữa. Sau đó đặt cọ ở góc đối diện, cùng độ sâu, và kéo về giữa cho hai nửa gặp nhau. Đi từ hai góc vào giữa giúp hai nửa đường cười cân nhau như soi gương.",
    },
    {
      q: "Làm sao để đường cười French sắc nét?",
      a: "Làm sạch đường cười trước khi hơ đèn, khi gel còn mềm. Dùng cọ dẹt nhỏ nhúng dung dịch lau rồi chấm lên khăn cho gần khô, lướt dọc mép trong của phần trắng và lau cọ sau mỗi lần. Cọ ướt quá sẽ làm loang màu trắng.",
    },
    {
      q: "Vẽ lệch đường cười thì sửa thế nào?",
      a: "Sửa trước khi hơ: dùng cọ thấm dung dịch lau, lau sạch phần trắng ở móng đó rồi vẽ lại. Gel đã chín thì phải chà đi, vừa mất công vừa làm mỏng lớp nền, nên đừng hơ một móng lệch để sửa sau.",
    },
    {
      q: "Sơn móng ombré cần mấy lớp trắng?",
      a: "Thường hai đến ba lớp mỏng. Mỗi lớp đặt trắng ở phía đầu móng, tán lên rồi hơ; lớp sau đặt thấp hơn lớp trước một chút. Thời gian hơ theo hướng dẫn của hãng gel.",
    },
    {
      q: "Móng ombré bị một vạch trắng ngang là do đâu?",
      a: "Do lớp trắng quá dày hoặc tán chưa đủ, chưa đi từ từ. Ombré đẹp nhờ lớp trắng mỏng và tán nhẹ nhiều lần. Làm từng móng một và tán xong là hơ ngay để màu không chảy lại thành vạch.",
    },
    {
      q: "Tán ombré bằng cọ hay bằng mút thì tốt hơn?",
      a: "Cả hai đều dùng được. Cọ dẹt sạch, gần khô, kéo những nét ngắn và nhẹ lên phía chân móng và cần lau thường xuyên. Mút thì chấm nhẹ nhiều lần ở chỗ chuyển màu, mỗi khách một miếng rồi bỏ.",
    },
  ],
  related: ["french-ombre-hieu-dung", "son-gel", "dua-form-mong", "builder-gel"],
};

export default article;
