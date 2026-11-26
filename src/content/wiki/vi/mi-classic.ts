import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-classic/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-noi-mi-classic",
  lesson: "mi-classic",
  category: "lash",
  title: "Cách nối mi classic 1:1: 12 bước từ tư vấn đến dặn dò khách",
  metaTitle: "Cách nối mi classic 1:1: 12 bước cho người mới học",
  metaDescription:
    "Hướng dẫn nối mi classic từng bước: tư vấn, làm sạch mi, dán miếng lót, tách một sợi, lấy keo, gắn cách da mí 0,5–1 mm, kiểm tra dính chùm và dặn khách.",
  keyword: "cách nối mi classic",
  keywords: ["nối mi classic", "nối mi 1:1", "các bước nối mi classic", "kỹ thuật nối mi classic", "học nối mi cho người mới", "nối mi classic bao lâu", "chăm sóc mi sau khi nối"],
  excerpt: "Mỗi sợi mi thật một sợi nối. Bài viết đi qua mười hai bước của một bộ mi classic, kèm khoảng cách gắn, lượng keo và những lời dặn khách cần nghe.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-noi-mi-classic-cho-khach-tai-studio"),
    alt: "Thợ nối mi mặc áo kem, đeo găng đen đang nối mi cho khách nằm trên giường trong một studio mi sang trọng",
  },
  takeaways: [
    "Nối mi classic là kỹ thuật **1:1**: một sợi nối gắn lên một sợi mi thật đã được tách riêng.",
    "Ba điều giữ suốt buổi: mắt khách nhắm kín, tách đúng một sợi, và **keo không bao giờ chạm vào da**.",
    "Chân sợi nối cách da mí khoảng **0,5–1 mm**; chỉ nhúng 1–2 mm chân sợi mi vào giọt keo.",
    "Gắn xen kẽ các vùng để keo kịp khô, rồi lướt nhíp kiểm tra dính chùm sau mỗi vùng.",
    "Một bộ classic đầy đủ thường mất khoảng 1,5–2 giờ; khách dặm lại sau 2–3 tuần.",
  ],
  intro: [
    "Cách nối mi classic là bài đầu tiên mọi thợ mi phải học cho chắc, vì mọi kỹ thuật sau này như volume hay hybrid đều đứng trên cùng những thao tác đó: tách mi, lấy keo, đặt sợi, kiểm tra. Classic nghĩa là 1:1, mỗi sợi mi thật mang một sợi nối.",
    "Bài viết này viết lại bài học “Nối mi classic: thực hành từng bước” trong khóa Nghề Mi của VaraaAi Academy. Bạn nên xem video bên dưới trước một lượt để nhìn rõ tay cầm nhíp, rồi đọc lại từng bước và luyện trên đầu ma-nơ-canh trước khi làm cho khách.",
  ],
  sections: [
    {
      id: "noi-mi-classic-la-gi",
      title: "Nối mi classic là gì",
      blocks: [
        { p: "Nối mi classic là kỹ thuật gắn **một sợi mi nối lên một sợi mi thật**, nên còn được gọi là nối 1:1. Kết quả là hàng mi dài và rõ hơn nhưng vẫn tự nhiên, các sợi tách rời nhau, trông giống một lớp mascara chuốt thật khéo." },
        { p: "Vì mỗi sợi mi thật chỉ mang một sợi nối, độ dày của bộ mi phụ thuộc vào số sợi mi thật mà khách có. Ở bước chải mi, người thợ nhìn xem sợi nào khỏe và dài, sợi nào non, ngắn và mảnh, rồi chọn độ dài và độ dày phù hợp cho từng vùng. Sợi mi non không mang nổi một sợi nối dài và nặng." },
        { img: { src: img("bo-mi-classic-hoan-thien-tu-nhien"), alt: "Cận mặt khách nữ tóc vàng với bộ mi classic đã hoàn thiện, các sợi mi tách rời, dài tự nhiên", caption: "Bộ mi classic hoàn thiện: mềm, tách sợi, tự nhiên." } },
      ],
    },
    {
      id: "truoc-khi-lam",
      title: "Trước khi làm: tư vấn và những lúc không nên làm",
      blocks: [
        { p: "Buổi tư vấn diễn ra khi khách còn mở mắt, sau khi thợ đã rửa tay. Những câu cần hỏi:" },
        {
          ul: [
            "Khách có bị dị ứng không, và đã từng phản ứng với keo nối mi chưa.",
            "Mắt có đang đỏ, ngứa, có bệnh gì về mắt, hay mới mổ mắt không.",
            "Khách có đeo kính áp tròng không. Nếu có, nhờ khách tháo ra trước.",
            "Khách muốn kiểu tự nhiên hay đậm hơn.",
          ],
        },
        { p: "Mắt đang có vấn đề thì không làm. Đây không phải chuyện mất một khách, mà là tránh làm một con mắt đang viêm nặng thêm. Bài học [Khi nào không nên làm](/academy/khi-nao-khong-lam) liệt kê kỹ các trường hợp này." },
        { img: { src: img("tu-van-khach-truoc-khi-noi-mi"), alt: "Thợ nối mi ngồi đối diện khách trên ghế sofa kem, ghi chép vào bảng kẹp giấy trong buổi tư vấn", caption: "Tư vấn khi khách còn mở mắt: dị ứng, tình trạng mắt, kiểu mi mong muốn." } },
      ],
    },
    {
      id: "keo-va-khoang-cach",
      title: "Lượng keo và khoảng cách: hai con số cần thuộc",
      blocks: [
        {
          table: {
            head: ["Thao tác", "Con số", "Vì sao"],
            rows: [
              ["Nhúng chân sợi nối vào keo", "Khoảng 1–2 mm", "Keo vừa đủ, mỏng đều; nhiều hơn sẽ thành cục ở chân mi và dễ dính chùm"],
              ["Chân sợi nối cách da mí", "Khoảng 0,5–1 mm", "Keo không được chạm da; sợi nối chạm da gây cộm và kích ứng"],
            ],
          },
        },
        { p: "Sợi nối được đặt dọc theo sợi mi thật, cùng hướng, và áp nhẹ cho nằm khít. Giữ yên một chút cho keo bắt rồi mới nhả nhíp gắp, sau cùng nhả nhíp tách." },
        { note: "Đừng gắn lần lượt những sợi nằm sát nhau. Gắn một sợi ở đuôi mắt, một sợi ở giữa, một sợi ở đầu mắt rồi quay lại. Keo ở sợi trước có thời gian khô và các sợi cạnh nhau không dính vào nhau. Nhiều thợ còn làm xen kẽ hai mắt để mỗi bên được nghỉ.", kind: "tip", title: "Mẹo của thợ lâu năm" },
      ],
    },
    {
      id: "dinh-chum",
      title: "Dính chùm: lỗi phải bắt ngay tại bàn",
      blocks: [
        { p: "Dính chùm là khi keo dán hai sợi mi thật vào nhau, hoặc một sợi nối dính sang sợi bên cạnh. Mỗi sợi mi thật mọc với tốc độ riêng, nên hai sợi bị dán chung sẽ kéo nhau khi mọc. Khách thấy cộm, và mi thật bị kéo." },
        { p: "Cách kiểm tra: sau mỗi vùng, dùng nhíp thẳng lướt nhẹ qua hàng mi từ chân ra ngọn. Sợi nào cũng phải đứng riêng. Thấy hai sợi dính vào nhau thì tách ra ngay, thật nhẹ nhàng, khi keo còn chưa cứng hẳn." },
        { p: "Nguyên nhân thường là tách chưa sạch ở bước tách mi, hoặc lấy quá nhiều keo. Chỉ cần lẫn thêm một sợi bên cạnh là keo sẽ dính hai sợi lại với nhau." },
      ],
    },
    {
      id: "do-dai",
      title: "Chọn độ dài theo từng vùng mắt",
      blocks: [
        { p: "Nguyên tắc cơ bản: góc trong ngắn nhất, rồi dài dần về phía giữa và đuôi mắt, để dáng mắt mềm mại và tự nhiên. Ở góc trong, mi thật ngắn và mảnh, nên chọn sợi ngắn và nhẹ." },
        { p: "Chọn kiểu theo từng dáng mắt là một chủ đề riêng, có trong bài học [Lash mapping](/academy/mi-mapping-hieu-dung)." },
      ],
    },
    {
      id: "dan-do",
      title: "Dặn khách chăm sóc mi sau khi nối",
      blocks: [
        {
          ul: [
            "Không làm ướt mi, không xông hơi, không đi bơi trong khoảng thời gian hãng keo khuyên, thường từ 24 đến 48 giờ.",
            "Không dùng sản phẩm có dầu ở vùng chân mi, vì dầu làm keo yếu đi.",
            "Chải mi nhẹ nhàng mỗi ngày bằng chổi sạch.",
            "Không dụi mắt, không tự nhổ, không kẹp uốn mi.",
            "Quay lại dặm sau 2–3 tuần.",
          ],
        },
        { img: { src: img("chai-mi-noi-moi-ngay-tai-nha"), alt: "Khách nữ mặc áo choàng lụa kem tự chải hàng mi nối bằng chổi chải mi sạch trước gương", caption: "Chải mi mỗi ngày bằng chổi sạch giúp các sợi nằm đều." } },
        { p: "Hẹn luôn lịch dặm trước khi khách ra về. Nếu tiệm bạn dùng VaraaAi, bạn [tạo lịch hẹn](/academy/lich-hen) cho khách ngay tại bàn và để hệ thống nhắc lịch thay bạn; lời dặn chăm sóc mi có thể gửi lại qua [tin nhắn cho khách](/academy/tin-nhan-ai)." },
        { p: "Khách về rồi: chổi chải mi, que bông nhỏ và miếng lót đã dùng được bỏ vào thùng rác có nắp. Nhíp được làm sạch và khử khuẩn sau mỗi khách, như trong bài [Xử lý dụng cụ sau mỗi khách](/academy/ve-sinh-dung-cu). Giường và bàn làm việc được lau sạch." },
      ],
    },
  ],
  howTo: {
    title: "Các bước nối mi classic",
    id: "cac-buoc-noi-mi",
    after: "truoc-khi-lam",
    lead: "Mười hai bước theo đúng thứ tự trong video. Năm bước đầu là chuẩn bị, và chuẩn bị kỹ thì phần gắn mi mới nhanh.",
    supplies: [
      "Vỉ mi nối classic, xếp theo độ dài",
      "Keo nối mi và đá ngọc hoặc nhẫn đựng keo",
      "Nhíp thẳng để tách mi, nhíp đầu cong để gắp mi",
      "Dung dịch rửa mi và cọ mềm",
      "Miếng lót gel dưới mắt, băng dính giấy chuyên dụng",
      "Chổi chải mi và que bông nhỏ dùng một lần",
    ],
    steps: [
      {
        name: "Tư vấn",
        text: "Rửa tay, rồi nói chuyện với khách khi khách còn mở mắt: dị ứng, phản ứng với keo trước đây, tình trạng mắt, kính áp tròng, kiểu mi mong muốn. Mắt có vấn đề thì không làm.",
      },
      {
        name: "Cho khách nằm thật thoải mái",
        text: "Gối đỡ cổ, chăn mỏng, có thể kê thêm một gối nhỏ dưới đầu gối. Một bộ classic đầy đủ thường mất từ một tiếng rưỡi đến hai tiếng, và suốt thời gian đó khách nằm yên, nhắm mắt. Khách càng thư giãn thì mắt càng ít động.",
      },
      {
        name: "Làm sạch mi thật",
        text: "Dầu, kem dưỡng và phấn mắt còn sót trên mi làm keo bám kém. Dùng dung dịch rửa mi và cọ mềm chải nhẹ từ chân mi ra ngọn, mắt khách vẫn nhắm. Xả lại bằng nước sạch và làm khô thật kỹ bằng quạt nhỏ hoặc để khô tự nhiên.",
        image: { src: img("lam-sach-mi-that-bang-bot-rua-mi"), alt: "Cọ mềm phủ bọt rửa mi chải nhẹ trên hàng mi của khách đang nhắm mắt" },
      },
      {
        name: "Dán miếng lót gel dưới mắt",
        text: "Miếng lót che kín toàn bộ mi dưới để không sợi mi dưới nào dính lên mi trên. Mép trên nằm sát dưới hàng mi dưới nhưng không chạm viền mắt hay con mắt; nếu chạm, khách sẽ thấy cộm, cay và mắt đỏ sau buổi làm. Sợi mi dưới còn lọt ra thì dùng thêm một mẩu băng dính giấy chuyên dụng.",
        image: { src: img("dan-mieng-lot-gel-duoi-mat"), alt: "Miếng lót gel trắng hình lưỡi liềm được đặt dưới mắt khách đang nhắm, che kín hàng mi dưới" },
      },
      {
        name: "Chải mi và quan sát",
        text: "Chải mi bằng chổi dùng một lần cho các sợi tách ra, nằm đều. Nhìn xem sợi nào khỏe và dài, sợi nào non, ngắn và mảnh, để chọn độ dài và độ dày cho từng vùng.",
      },
      {
        name: "Sắp bàn làm việc",
        text: "Vỉ mi xếp theo độ dài, đá ngọc hoặc nhẫn keo với một giọt keo mới, nhíp thẳng và nhíp cong, chổi chải mi và que bông dùng một lần. Chai keo được đậy nắp ngay sau khi lấy keo, và giọt keo để xa mặt khách.",
        image: { src: img("dung-cu-noi-mi-classic"), alt: "Khay đá trắng viền vàng bày chai keo nối mi, vỉ mi xếp theo độ dài, đá ngọc có giọt keo, hai cây nhíp và chổi chải mi" },
      },
      {
        name: "Tách đúng một sợi mi thật",
        text: "Tay không thuận cầm nhíp thẳng, luồn vào hàng mi, mở nhẹ hai đầu nhíp và gạt các sợi bên cạnh sang hai bên, để chỉ còn đúng một sợi mi thật đứng riêng.",
        image: { src: img("tach-mot-soi-mi-that-bang-nhip"), alt: "Hai cây nhíp trong tay thợ đeo găng đen, nhíp thẳng tách riêng một sợi mi thật trên hàng mi của khách" },
      },
      {
        name: "Gắp sợi nối và lấy keo",
        text: "Tay thuận cầm nhíp cong, gắp một sợi mi nối ở gần phần chân, chỗ sợi mi dày và thẳng. Nhúng chỉ phần chân vào giọt keo, khoảng 1–2 mm, rồi rút ra nhẹ nhàng. Keo mỏng đều, không thành cục.",
        image: { src: img("nhung-chan-soi-mi-vao-giot-keo"), alt: "Nhíp đầu cong giữ một sợi mi nối, phần chân sợi mi chạm vào giọt keo đen trên viên đá ngọc" },
      },
      {
        name: "Gắn sợi nối cách da mí",
        text: "Đặt sợi nối dọc theo sợi mi thật đã tách, cùng hướng. Chân sợi nối cách da mí khoảng 0,5–1 mm và không chạm da. Áp nhẹ cho nằm khít, giữ yên một chút cho keo bắt, nhả nhíp gắp trước rồi mới nhả nhíp tách.",
        image: { src: img("gan-soi-mi-noi-doc-theo-mi-that"), alt: "Thợ dùng nhíp cong đặt một sợi mi nối dọc theo sợi mi thật đã được nhíp thẳng tách riêng" },
      },
      {
        name: "Kiểm tra dính chùm",
        text: "Sau mỗi vùng, lướt nhíp thẳng từ chân ra ngọn. Sợi nào cũng phải đứng riêng; thấy dính thì tách ra ngay. Giữ nguyên tắc độ dài: góc trong ngắn nhất, dài dần về phía đuôi mắt.",
      },
      {
        name: "Hoàn thiện",
        text: "Chải lại mi và so hai mắt: độ dài, độ dày, độ cong phải cân đối. Gỡ miếng lót thật nhẹ khi mắt khách vẫn nhắm, rồi dặn khách mở mắt từ từ. Nếu khách thấy cay hoặc chảy nước mắt thì cho nhắm lại và nghỉ một chút.",
      },
      {
        name: "Dặn dò và dọn dẹp",
        text: "Dặn khách giữ khô theo hướng dẫn của hãng keo, tránh sản phẩm có dầu ở chân mi, chải mi mỗi ngày và hẹn lịch dặm sau 2–3 tuần. Sau đó bỏ đồ dùng một lần, làm sạch và khử khuẩn nhíp, lau giường và bàn.",
      },
    ],
  },
  faq: [
    {
      q: "Nối mi classic mất bao lâu?",
      a: "Một bộ mi classic đầy đủ thường mất khoảng một tiếng rưỡi đến hai tiếng. Trong suốt thời gian đó khách nằm yên và nhắm mắt, nên thợ cần cho khách nằm thật thoải mái ngay từ đầu.",
    },
    {
      q: "Nối mi classic khác nối mi volume ở điểm nào?",
      a: "Classic là 1:1, tức mỗi sợi mi thật mang một sợi nối, cho hàng mi tự nhiên và tách sợi. Volume gắn một chùm nhiều sợi rất mảnh lên một sợi mi thật để hàng mi dày hơn. Thao tác tách mi, lấy keo và đặt sợi của classic là nền để học volume.",
    },
    {
      q: "Sợi mi nối nên cách da mí bao nhiêu?",
      a: "Khoảng 0,5–1 mm và tuyệt đối không chạm da. Keo và sợi nối chạm vào da mí sẽ gây cộm và có thể gây kích ứng.",
    },
    {
      q: "Sau khi nối mi bao lâu thì được rửa mặt?",
      a: "Hãy theo thời gian hãng keo khuyên, thường là 24–48 giờ không làm ướt mi, không xông hơi và không đi bơi. Sau đó khách vẫn nên tránh sản phẩm có dầu ở vùng chân mi.",
    },
    {
      q: "Khách thấy cay mắt trong lúc nối mi thì làm gì?",
      a: "Dừng lại, cho khách nhắm mắt nghỉ, và kiểm tra miếng lót có chạm viền mắt không. Nếu keo lỡ dính vào mắt thì rửa ngay bằng nhiều nước sạch và đưa khách đi khám.",
    },
    {
      q: "Bao lâu thì cần dặm mi?",
      a: "Sau khoảng 2–3 tuần. Nên hẹn luôn lịch dặm trước khi khách ra về để khách không phải nhớ.",
    },
  ],
  related: ["mi-classic-hieu-dung", "mi-chuan-bi", "mi-volume", "mi-dam-thao"],
};

export default article;
