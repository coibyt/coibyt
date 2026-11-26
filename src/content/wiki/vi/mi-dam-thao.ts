import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-dam-thao/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-thao-mi-noi-va-dam-mi",
  lesson: "mi-dam-thao",
  category: "lash",
  title: "Cách tháo mi nối và dặm mi tại tiệm: 12 bước không kéo, không bứt sợi nào",
  metaTitle: "Cách tháo mi nối và dặm mi: 12 bước không kéo, không bứt",
  metaDescription:
    "Hướng dẫn dặm mi và tháo mi nối từng bước: kiểm tra từng sợi, chấm kem tháo đúng mối keo, trượt sợi nối ra, dặm theo bản đồ, tháo hết cả bộ và rửa sạch kem.",
  keyword: "cách tháo mi nối",
  keywords: [
    "cách dặm mi",
    "các bước dặm mi",
    "tháo mi nối bằng kem tháo",
    "cách dùng kem tháo mi",
    "gỡ sợi mi nối mọc dài",
    "quy trình tháo mi nối",
    "tháo mi nối không rụng mi thật",
  ],
  excerpt: "Dặm là gỡ đúng sợi, gắn đúng sợi. Tháo là kem đúng chỗ, chờ đúng giờ, vuốt nhẹ. Mười hai bước cho cả hai việc, theo bài thực hành của khóa Nghề Mi.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-mi-dam-mi-cho-khach-trong-studio"),
    alt: "Thợ nối mi tóc búi cao ngồi ở đầu giường, cầm nhíp làm mi cho khách đang nằm đắp chăn kem trong studio có rèm nhung tím",
  },
  takeaways: [
    "Hai điều giữ suốt buổi: mắt khách nhắm kín, và **không bao giờ kéo sợi mi nối**.",
    "Khi dặm, chỉ chấm **một chút kem tháo đúng vào mối keo** của sợi cần gỡ, bằng cọ nhỏ dùng một lần, không chạm da mí hay chân mi.",
    "Sợi nối không trượt ra nghĩa là keo chưa mềm: chấm thêm, chờ thêm rồi thử lại.",
    "Khi tháo hết, bôi một lớp kem mỏng dọc các mối keo, **chờ đúng thời gian hãng hướng dẫn**, rồi vuốt nhẹ từ chân ra ngọn.",
    "Khách có dấu hiệu phản ứng thì không dặm mà tháo hết, làm thật nhẹ, và khuyên khách đi khám.",
  ],
  intro: [
    "Cách tháo mi nối đúng gồm ba việc: đưa kem tháo vào đúng chỗ, chờ đủ thời gian, rồi để sợi nối tự trượt ra. Không có bước nào cần đến lực kéo. Dặm mi cũng dùng đúng những thao tác ấy, chỉ khác là bạn gỡ từng sợi đã mọc dài thay vì cả bộ, rồi gắn sợi mới vào.",
    "Bài viết này viết lại bài học “Dặm và tháo mi: thực hành từng bước” trong khóa Nghề Mi của VaraaAi Academy. Phần một là bảy bước dặm mi cho khách quay lại sau vài tuần, phần hai là năm bước tháo hết một bộ mi an toàn. Hãy xem video bên dưới để nhìn rõ tay cầm cọ và nhíp, rồi đọc lại từng bước.",
  ],
  sections: [
    {
      id: "truoc-khi-dam-hoac-thao",
      title: "Trước khi dặm mi hoặc tháo mi nối",
      blocks: [
        { p: "Cả hai việc đều làm trên một hàng mi đang mang keo, sát ngay con mắt. Vì vậy có hai điều không thay đổi từ đầu đến cuối buổi: mắt khách nhắm kín, và bạn không kéo sợi nối nào. Keo đã giữ sợi nối trên sợi mi thật, nên kéo sợi nối là kéo luôn sợi mi thật khỏi chân mi." },
        { p: "Vì sao khách cần dặm sau 2–3 tuần, và vì sao dầu không thay được chất tháo, đã có trong bài [dặm mi bao lâu một lần](lesson:mi-dam-thao-hieu-dung). Bài này đi thẳng vào thao tác." },
        {
          table: {
            head: ["Bạn thấy gì khi khách đến", "Nên làm gì"],
            rows: [
              ["Mắt khoẻ, bộ mi thưa đi, vài sợi mọc dài", "Dặm: gỡ sợi cần gỡ, gắn sợi mới"],
              ["Lần trước làm xong mắt đỏ, ngứa, sưng, hoặc mắt đang có dấu hiệu phản ứng", "Không dặm. Tháo hết thật nhẹ và khuyên khách đi khám"],
              ["Bộ mi đã quá rối, sợi nào cũng lệch", "Dừng lại, nói thật với khách và đề nghị tháo hết làm lại"],
            ],
          },
        },
        { note: "Loại chất tháo, lượng bôi và thời gian chờ luôn theo hướng dẫn của hãng. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Lưu ý" },
      ],
    },
    {
      id: "kem-thao-dung-cho",
      title: "Cách dùng kem tháo mi: đúng chỗ, đúng lượng, đúng giờ",
      blocks: [
        {
          table: {
            head: ["Việc", "Bôi ở đâu", "Bôi bao nhiêu"],
            rows: [
              ["Gỡ một sợi khi dặm", "Đúng vào mối keo của sợi đó", "Một chấm nhỏ trên đầu cọ dùng một lần"],
              ["Tháo hết cả bộ", "Dọc theo các mối keo, cách chân mi một chút, từ đầu mắt đến đuôi mắt", "Một lớp mỏng; kem thừa dễ chảy về phía mắt"],
            ],
          },
        },
        { p: "Ở cả hai trường hợp, kem chỉ nằm trên mi. Nó không chạm da mí, không chạm viền mắt. Khi gỡ từng sợi lúc dặm, kem cũng không chạm vào chân mi và các sợi còn đẹp bên cạnh, để những sợi đó giữ nguyên." },
        { note: "Đừng vội. Chưa đủ thời gian hãng hướng dẫn mà đã vuốt thì keo chưa mềm, và bạn sẽ kéo luôn sợi mi thật. Trong lúc chờ, ở bên cạnh khách, đừng bỏ đi.", kind: "tip", title: "Chờ cho đủ" },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Lỗi thường gặp khi dặm và tháo mi",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Cách làm đúng"],
            rows: [
              ["Vuốt hoặc trượt khi keo chưa mềm", "Kéo sợi mi thật khỏi chân mi", "Bôi thêm một chút, chờ thêm, rồi thử lại"],
              ["Bôi kem tháo quá nhiều", "Kem chảy về phía mắt", "Một lớp mỏng, chỉ trên mi"],
              ["Không lau kem còn lại trên sợi mi thật sau khi gỡ", "Sợi nối mới bám kém", "Lau sạch trước khi gắn sợi mới"],
              ["Gắn lên sợi mi non còn quá ngắn, quá mảnh", "Sợi mi non phải mang quá sức", "Để lại cho lần dặm sau"],
              ["Chọn sợi dài hơn, dày hơn lần trước vì khách muốn đậm", "Mi thật quá tải", "Sợi nối luôn vừa sức sợi mi thật"],
              ["Để sót kem tháo trên mi sau khi tháo", "Dễ gây kích ứng", "Rửa kỹ bằng dung dịch rửa mi, xả nước sạch, làm khô"],
            ],
          },
        },
      ],
    },
    {
      id: "khach-thay-cay",
      title: "Khách thấy cay khi tháo mi thì làm gì",
      blocks: [
        { p: "Trước khi bôi kem, dặn khách một câu: thấy cay, thấy nóng thì báo ngay. Chất tháo không được vào mắt, và cay là dấu hiệu phải dừng. Lúc đó đừng làm nhanh hơn cho xong, cũng đừng bảo khách mở mắt ra xem. Dừng lại, lau sạch chất tháo và xử lý như trong bài [Xử lý sự cố](lesson:xu-ly-su-co)." },
        { p: "Với khách tháo vì bị phản ứng, da quanh mắt đang nhạy cảm. Làm thật nhẹ tay, thật chậm, và không thêm sản phẩm nào không cần thiết. Tháo xong, khuyên khách đi khám và ghi lại trong hồ sơ. Dấu hiệu dị ứng keo có trong bài [Dị ứng và hoá chất](lesson:di-ung-hoa-chat)." },
        { p: "Miếng lót dưới mắt vẫn cần khi tháo hết cả bộ. Lúc này nó còn bảo vệ da và mi dưới khỏi kem tháo, nên hãy dán thật kỹ." },
      ],
    },
    {
      id: "ghi-lai-va-hen-lich",
      title: "Sau buổi làm: dọn dẹp, ghi lại và hẹn lịch dặm",
      blocks: [
        { p: "Que bông, cọ nhỏ và miếng lót đã dùng được bỏ vào thùng có nắp. Nhíp được làm sạch và khử khuẩn như trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
        { img: { src: img("bo-do-dung-mot-lan-vao-thung-co-nap"), alt: "Bàn tay đeo găng đen bỏ đồ dùng một lần vào thùng trắng có nắp trên bàn đá, phía sau là khách đang nằm nghỉ trên giường", caption: "Đồ dùng một lần đi thẳng vào thùng có nắp sau mỗi khách." } },
        { p: "Hẹn lịch dặm tiếp theo ngay khi khách còn ngồi đó, thường sau 2–3 tuần. Rồi ghi vào “Ghi chú nội bộ” trong [hồ sơ khách hàng](lesson:khach-hang) trên VaraaAi bốn điều: mi giữ thế nào, đã gỡ nhiều hay ít, nguyên nhân rụng nếu có, và đã dặn khách những gì. Lần sau, thợ nào làm cũng biết ngay phải chú ý điều gì." },
        { note: "Mở bản đồ mi trong “Ghi chú nội bộ” trước khi dặm, và cập nhật ghi chú khi xong. Bộ mi dặm theo đúng bản đồ cũ sẽ đều như lần đầu.", kind: "tip", title: "Bản đồ mi nằm trong hồ sơ khách" },
        { p: "Nếu tiệm nhận đặt lịch qua VaraaAi, hãy tạo [lịch hẹn](lesson:lich-hen) dặm ngay tại bàn, và để “Dặm mi” cùng “Tháo mi” thành hai mục riêng trong phần [dịch vụ](lesson:dich-vu) để khách chọn đúng việc mình cần." },
      ],
    },
  ],
  howTo: {
    title: "Các bước dặm mi và tháo mi nối",
    id: "cac-buoc-dam-va-thao-mi",
    after: "truoc-khi-dam-hoac-thao",
    lead: "Bước 1 đến 7 là một buổi dặm mi. Bước 8 đến 12 là tháo hết cả bộ.",
    supplies: [
      "Chất tháo mi, dùng theo hướng dẫn của hãng (bài học dùng dạng kem)",
      "Cọ nhỏ dùng một lần và que bông",
      "Dung dịch rửa mi, cọ mềm, nước sạch",
      "Miếng lót dưới mắt",
      "Nhíp thẳng và nhíp gắp mi",
      "Mi nối và keo theo bản đồ đã ghi của khách (khi dặm)",
      "Chổi chải mi dùng một lần",
    ],
    steps: [
      {
        name: "Dặm mi: hỏi thăm và nhìn mắt",
        text: "Khách ngồi, mở mắt. Hỏi lần trước làm xong mắt có đỏ, ngứa, sưng không, mi rụng nhiều hay ít, có vướng ở đâu không. Nhìn mắt dưới ánh sáng tốt. Có dấu hiệu phản ứng thì không dặm mà chuyển sang tháo hết.",
        image: { src: img("nhin-mat-khach-duoi-anh-sang-truoc-khi-dam-mi"), alt: "Thợ nối mi đeo găng đen cầm kính lúp nhìn mắt khách đang ngồi, mắt mở, dưới vòng đèn sáng trong studio" },
      },
      {
        name: "Làm sạch mi và dán miếng lót",
        text: "Khách nằm, nhắm mắt. Rửa cả sợi nối lẫn mi thật bằng dung dịch rửa mi và cọ mềm, vì sau vài tuần dầu và bụi đã bám vào chân mi. Xả lại bằng nước sạch, làm khô thật kỹ, rồi dán miếng lót che kín mi dưới, không chạm viền mắt, như trong bài [chuẩn bị nối mi](lesson:mi-chuan-bi).",
      },
      {
        name: "Kiểm tra từng sợi",
        text: "Chải mi, rồi lướt nhíp thẳng nhẹ qua hàng mi và nhìn từng sợi một. Tìm những sợi đã mọc dài: mối keo xa mí, sợi nối xoay ngang hay chĩa ra. Tìm cả chỗ dính chùm và những sợi lỏng lẻo. Đó là những sợi cần gỡ; sợi còn đẹp thì giữ.",
        image: { src: img("kiem-tra-tung-soi-mi-noi-bang-nhip-thang"), alt: "Đầu nhíp thẳng trong tay đeo găng đen nâng một sợi mi nối đã mọc dài chĩa ra ở đuôi mắt khách đang nhắm" },
      },
      {
        name: "Chấm kem tháo vào đúng mối keo",
        text: "Lấy một chút kem tháo ra đầu cọ nhỏ dùng một lần. Chỉ chấm đúng vào mối keo của sợi cần gỡ, không chạm da mí, không chạm chân mi. Chờ đúng thời gian hãng hướng dẫn cho keo mềm ra.",
        image: { src: img("cham-kem-thao-vao-moi-keo-cua-mot-soi-mi"), alt: "Cọ nhỏ đầu bông trong tay đeo găng đen chấm một chút kem tháo màu hồng lên một sợi mi nối, mắt khách nhắm trên miếng lót trắng" },
      },
      {
        name: "Trượt sợi nối ra, không kéo",
        text: "Một nhíp giữ yên sợi mi thật, nhíp kia trượt sợi nối nhẹ nhàng về phía ngọn, ra khỏi sợi mi thật. Sợi nối không trượt ra nghĩa là keo chưa mềm: chấm thêm một chút, chờ thêm, rồi thử lại. Gỡ xong, lau sạch chỗ kem còn lại trên sợi mi thật để lần gắn mới bám tốt.",
        image: { src: img("truot-soi-mi-noi-ra-bang-hai-nhip"), alt: "Hai cây nhíp trong tay đeo găng đen, một cây giữ sợi mi thật, cây kia trượt sợi mi nối dính kem tháo màu hồng về phía ngọn" },
      },
      {
        name: "Dặm sợi mới theo bản đồ đã ghi",
        text: "Với những sợi mi thật vừa được gỡ và những sợi mi non đã mọc đủ dài, tách từng sợi rồi gắn như trong bài [classic](lesson:mi-classic) hay [volume](lesson:mi-volume), theo đúng bản đồ mi đã ghi trong hồ sơ khách. Sợi mi non còn quá ngắn, quá mảnh thì để lại cho lần sau. Đừng chọn sợi dài hơn, dày hơn lần trước chỉ vì khách muốn đậm hơn.",
      },
      {
        name: "Kiểm tra dính chùm và hoàn thiện",
        text: "Sau mỗi vùng, lướt nhíp từ chân ra ngọn: sợi nào cũng phải đứng riêng. Chải lại, so hai mắt, gỡ miếng lót khi mắt khách vẫn nhắm. Hẹn lịch dặm tiếp theo và ghi lại buổi làm vào hồ sơ khách.",
      },
      {
        name: "Tháo mi: dán miếng lót và dặn khách",
        text: "Dán miếng lót thật kỹ, che kín mi dưới; lúc này nó còn bảo vệ da và mi dưới khỏi kem tháo. Mắt khách nhắm kín. Dặn khách thấy cay hay nóng thì báo ngay.",
      },
      {
        name: "Bôi kem tháo mỏng dọc mối keo",
        text: "Dùng cọ nhỏ bôi một lớp kem mỏng dọc theo các mối keo, cách chân mi một chút, từ đầu mắt đến đuôi mắt. Kem chỉ nằm trên mi, không chạm da mí hay viền mắt, và không bôi thừa. Chờ đúng thời gian hãng hướng dẫn, ở bên cạnh khách.",
        image: { src: img("boi-kem-thao-mi-doc-moi-keo"), alt: "Cọ nhỏ trong tay đeo găng đen kéo một đường kem tháo màu hồng mỏng dọc hàng mi nối của khách đang nhắm mắt, dưới mắt có miếng lót" },
      },
      {
        name: "Vuốt nhẹ từ chân ra ngọn",
        text: "Dùng một que bông hoặc một cọ nhỏ sạch vuốt nhẹ dọc hàng mi, từ chân ra ngọn. Sợi nối trượt ra và rơi xuống miếng lót. Mỗi lần vuốt dùng một mặt sạch hoặc thay que mới. Sợi nào còn bám thì bôi thêm, chờ thêm, tuyệt đối không kéo.",
        image: { src: img("vuot-mi-noi-tu-chan-ra-ngon-bang-que-bong"), alt: "Que bông trong tay đeo găng đen vuốt dọc hàng mi của khách đang nhắm mắt, vài sợi mi nối đã rơi xuống miếng lót trắng" },
      },
      {
        name: "Rửa sạch kem tháo",
        text: "Kem tháo còn sót trên mi dễ gây kích ứng. Rửa mi kỹ bằng dung dịch rửa mi, chải từ chân ra ngọn, rồi xả lại bằng nước sạch và làm khô.",
        image: { src: img("rua-sach-kem-thao-mi-bang-bot-rua-mi"), alt: "Cọ mềm phủ bọt rửa mi trong tay đeo găng đen chải trên hàng mi của khách đang nhắm mắt, miếng lót trắng vẫn nằm dưới mắt" },
      },
      {
        name: "Kiểm tra mi thật và dặn dò",
        text: "Xem còn sót sợi nối hay keo không, mi thật có chỗ nào gãy hay thưa không, và hỏi khách có thấy cay, rát không. Gỡ miếng lót nhẹ nhàng, cho khách mở mắt từ từ. Nói trước rằng mi thật sau khi tháo thường trông thưa hơn khách nhớ, đó là bình thường. Dặn khách không dụi mắt, dùng sản phẩm không dầu và chải mi nhẹ nhàng.",
        image: { src: img("mi-that-sau-khi-thao-het-mi-noi"), alt: "Cận cảnh một mắt nhắm sau khi tháo hết mi nối, hàng mi thật ngắn và mảnh, vài sợi mi nối đã tháo nằm trên miếng lót trắng" },
      },
    ],
  },
  faq: [
    {
      q: "Tháo mi nối bằng gì?",
      a: "Bằng chất tháo mi chuyên dụng; bài học dùng dạng kem vì kem nằm yên ở chỗ bôi. Kem làm mềm keo, sau đó sợi nối được vuốt hoặc trượt ra khỏi sợi mi thật. Loại sản phẩm, lượng bôi và thời gian chờ luôn theo hướng dẫn của hãng.",
    },
    {
      q: "Bôi kem tháo mi bao lâu thì vuốt được?",
      a: "Chờ đúng thời gian hãng sản phẩm hướng dẫn, mỗi loại một khác. Vuốt khi keo chưa mềm là kéo luôn sợi mi thật. Nếu sợi nối chưa trượt ra thì bôi thêm một chút, chờ thêm rồi thử lại.",
    },
    {
      q: "Khi dặm mi có phải tháo hết mi cũ không?",
      a: "Không. Khi dặm, người thợ chỉ gỡ những sợi đã mọc dài, chỗ dính chùm và sợi lỏng, bằng một chấm kem tháo đặt đúng mối keo của từng sợi. Sợi còn đẹp, còn sát mí được giữ lại. Chỉ khi bộ mi đã quá rối hoặc khách có phản ứng mới tháo hết.",
    },
    {
      q: "Sợi mi nối không chịu trượt ra thì làm sao?",
      a: "Nghĩa là keo chưa mềm. Chấm thêm một chút chất tháo, chờ thêm rồi thử lại. Không kéo mạnh hơn, vì kéo lúc này là kéo luôn sợi mi thật khỏi chân mi.",
    },
    {
      q: "Khách thấy cay mắt khi đang tháo mi thì xử lý thế nào?",
      a: "Dừng ngay, lau sạch chất tháo và xử lý theo bài học Xử lý sự cố. Chất tháo không được vào mắt, nên mắt khách phải nhắm kín suốt lúc tháo và khách cần được dặn báo ngay khi thấy cay hay nóng.",
    },
    {
      q: "Vì sao tháo hết mi nối vẫn phải dán miếng lót dưới mắt?",
      a: "Miếng lót che mi dưới và da dưới mắt, giữ cho kem tháo không chạm vào da, mi dưới và mắt. Những sợi nối trượt ra cũng rơi xuống miếng lót thay vì rơi lên mặt khách.",
    },
  ],
  related: ["mi-dam-thao-hieu-dung", "mi-classic", "mi-chuan-bi", "xu-ly-su-co"],
};

export default article;
