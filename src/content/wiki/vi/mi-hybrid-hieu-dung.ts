import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-hybrid-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "noi-mi-hybrid-la-gi",
  lesson: "mi-hybrid-hieu-dung",
  category: "lash",
  title: "Nối mi hybrid là gì? Khác classic và volume thế nào, hợp với ai, phối bao nhiêu fan",
  metaTitle: "Nối mi hybrid là gì? Khác classic và volume thế nào",
  metaDescription:
    "Nối mi hybrid phối sợi đơn classic và fan volume trên cùng một mắt. Vẻ tơi spiky, hợp với ai, tỉ lệ fan 30–50 % là điểm xuất phát, lỗi loang lổ, lịch dặm.",
  keyword: "nối mi hybrid là gì",
  keywords: [
    "nối mi hybrid khác classic và volume thế nào",
    "nối mi hybrid hợp với ai",
    "tỉ lệ phối mi hybrid",
    "mi hybrid kiểu spiky",
    "mi thưa nên nối mi kiểu gì",
    "nối mi hybrid giữ được bao lâu",
    "mi hybrid là gì",
  ],
  excerpt: "Hybrid phối sợi đơn và fan trên cùng một mắt, cho hàng mi tơi, có kết cấu. Bài viết giải thích hợp với ai, phối theo mi thật ra sao và lỗi cần tránh.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-mi-chuan-bi-hai-vi-mi-classic-va-volume-cho-bo-hybrid"),
    alt: "Thợ nối mi tóc búi cao, đeo găng đen ngồi ở bàn đá trắng, tay cầm nhíp, trước mặt là hai vỉ mi hồng nhạt đặt cạnh nhau",
  },
  takeaways: [
    "Nối mi hybrid phối **sợi đơn classic và fan volume trên cùng một mắt**; mỗi sợi mi thật vẫn chỉ mang một thứ.",
    "Vẻ ngoài có kết cấu, hơi tơi, hay gọi là kiểu spiky: dày hơn classic, mềm và tự nhiên hơn một bộ volume phủ kín.",
    "Chọn sợi đơn hay fan theo **sức của từng sợi mi thật**: sợi khoẻ mang fan nhẹ, sợi mảnh mang sợi đơn, sợi non quá yếu để trống.",
    "Tỉ lệ nửa nửa, hay fan khoảng **30–50 %**, là điểm xuất phát chứ không phải luật.",
    "Rải fan và sợi đơn đều khắp hàng mi; fan dồn một chỗ làm mi loang lổ.",
  ],
  intro: [
    "Nối mi hybrid là gì: đó là kiểu nối kết hợp, trên cùng một mắt có chỗ gắn một sợi đơn như classic, có chỗ gắn một fan như volume. Hàng mi sau khi nối dày hơn classic nhưng không kín đặc như volume, và có những sợi rõ nét nổi lên giữa lớp fan mềm. Nhiều khách chọn hybrid làm bước ở giữa khi classic đã thấy hơi mỏng.",
    "Bài viết này viết lại bài học “Nối mi hybrid: hiểu đúng để có độ tơi tự nhiên” trong khóa Nghề Mi của VaraaAi Academy. Bạn sẽ biết hybrid hợp với khách nào, cách quyết định sợi mi thật nào mang fan và sợi nào mang sợi đơn, và vì sao một nhịp phối đều tăm tắp vẫn có thể làm mi khách thưa đi.",
  ],
  sections: [
    {
      id: "noi-mi-hybrid-la-gi",
      title: "Nối mi hybrid là gì",
      blocks: [
        { p: "Hybrid nghĩa là kết hợp. Người thợ dùng cả hai thứ đã học: sợi đơn của [classic](lesson:mi-classic-hieu-dung) và chiếc fan nhỏ gồm vài sợi thật mảnh của [volume](lesson:mi-volume-hieu-dung). Chỗ này một sợi đơn, chỗ kia một fan." },
        { img: { src: img("soi-don-classic-va-fan-volume-trong-noi-mi-hybrid"), alt: "Trên vỉ đá hồng nhạt, một sợi mi đơn đen dày nằm bên trái, bên phải là một fan gồm năm sợi rất mảnh chung một chân", caption: "Hai thứ được phối trong hybrid: sợi đơn classic và fan volume." } },
        { note: "Mỗi sợi mi thật chỉ mang đúng một thứ: hoặc một sợi đơn, hoặc một fan. Không bao giờ cả hai, và không bao giờ một fan ôm hai sợi mi thật cạnh nhau.", kind: "warn", title: "Điều không bao giờ đổi" },
        { img: { src: img("bo-mi-hybrid-hoan-thien-soi-don-xen-fan"), alt: "Cận cảnh mắt nhắm với bộ mi hybrid đã nối xong, các sợi đơn đen rõ nét nổi lên như mũi nhọn giữa những fan mềm", caption: "Bộ hybrid hoàn thiện: sợi đơn rõ nét xen giữa các fan mềm." } },
      ],
    },
    {
      id: "hybrid-khac-classic-va-volume",
      title: "Nối mi hybrid khác classic và volume thế nào",
      blocks: [
        { p: "Trong một bộ hybrid, những sợi đơn dày hơn, đen bóng, đứng thành từng sợi như những mũi nhọn nhỏ. Các fan mảnh lấp vào khoảng giữa và cho hàng mi độ dày, độ mềm. Trong nghề, vẻ ngoài này hay được gọi là kiểu spiky." },
        {
          table: {
            head: ["Kỹ thuật", "Mỗi sợi mi thật mang", "Vẻ ngoài"],
            rows: [
              ["Classic", "Một sợi nối", "Tự nhiên, tách sợi, như chải mascara"],
              ["Hybrid", "Một sợi đơn hoặc một fan, tùy sức sợi mi", "Có kết cấu, hơi tơi; dày hơn classic, mềm và tự nhiên hơn volume phủ kín"],
              ["Volume", "Một fan vài sợi rất mảnh", "Dày, mềm, hàng mi đen kín"],
            ],
          },
        },
        { img: { src: img("khach-voi-bo-mi-hybrid-toi-tu-nhien"), alt: "Chân dung cận mặt khách nữ tóc vàng mở mắt với bộ mi hybrid, hàng mi đầy hơn mascara, vài sợi rõ nét nổi giữa lớp mi mềm", caption: "Hybrid khi khách mở mắt: đầy đặn nhưng vẫn nhẹ, không kín đặc." } },
      ],
    },
    {
      id: "noi-mi-hybrid-hop-voi-ai",
      title: "Nối mi hybrid hợp với ai",
      blocks: [
        { p: "Có hai nhóm khách hay được tư vấn hybrid." },
        { p: "Nhóm thứ nhất là khách có mi thật thưa, có khoảng trống hoặc mi không đều, chỗ dày chỗ mỏng. Fan mảnh đặt trên những sợi khoẻ quanh khoảng trống làm hàng mi trông đầy đặn, mà không bắt sợi yếu phải gánh nặng." },
        { img: { src: img("mi-that-thua-khong-deu-co-khoang-trong"), alt: "Cận cảnh mắt nhắm chưa nối mi, hàng mi thật không đều với vài sợi dài khoẻ, nhiều sợi non ngắn và vài khoảng trống", caption: "Mi thật không đều và có khoảng trống: kiểu mi hybrid xử lý tốt." } },
        { p: "Nhóm thứ hai là khách đã quen classic, muốn dày hơn một chút nhưng chưa muốn volume. Nhiều khách đi từ classic sang hybrid rồi mới đến volume." },
      ],
    },
    {
      id: "chon-soi-don-hay-fan",
      title: "Chọn sợi đơn hay fan: sức của sợi mi thật quyết định",
      blocks: [
        { p: "Đây là điểm quan trọng nhất của hybrid. Sợi đơn hay fan không được chọn theo một khuôn cố định mà theo từng sợi mi thật." },
        {
          table: {
            head: ["Sợi mi thật", "Đặt gì lên nó"],
            rows: [
              ["Khoẻ, dài và dày", "Có thể mang một fan nhẹ"],
              ["Mảnh, ngắn, hoặc sợi non mới mọc", "Một sợi đơn thật mảnh, thật ngắn"],
              ["Sợi non quá yếu", "Để trống, đợi lần dặm sau"],
            ],
          },
        },
        { h3: "Tỉ lệ phối mi hybrid: điểm xuất phát, không phải luật" },
        { p: "Người ta hay nói phối khoảng một nửa sợi đơn, một nửa fan. Có nơi nói fan chiếm khoảng 30–50 %. Hãy coi đó là điểm xuất phát. Mi khách nhiều sợi khoẻ thì có thể nhiều fan hơn. Mi khách yếu thì dùng nhiều sợi đơn nhẹ hơn. Con số đẹp nhất là con số mà mi thật của khách chịu được." },
        { h3: "Lỗi của thợ mới: phối theo nhịp cứng" },
        { p: "Sợi đơn, fan, sợi đơn, fan, đều tăm tắp. Nhìn thì rất gọn, nhưng cái nhịp đó không nhìn vào mi thật. Sẽ có sợi non yếu ớt phải mang một fan, còn sợi khoẻ bên cạnh chỉ mang một sợi đơn. Vài tuần sau, những sợi yếu kia rụng sớm, và hàng mi thưa đi đúng chỗ khách vốn đã thưa." },
        { note: "Nhịp đều là tốt, nhưng nhịp phải theo mi thật. Khoảng trống được che bằng fan trên những sợi khoẻ xung quanh, không phải bằng fan trên chính sợi non ở đó.", kind: "tip", title: "Cách nghĩ đúng" },
      ],
    },
    {
      id: "do-toi-va-rai-deu",
      title: "Độ tơi của mi hybrid và chuyện rải đều",
      blocks: [
        { p: "Độ tơi đến một phần từ cách phối độ dài giữa sợi đơn và fan. Có hai cách, và cả hai đều đúng:" },
        {
          table: {
            head: ["Cách phối độ dài", "Hàng mi trông thế nào"],
            rows: [
              ["Sợi đơn dài hơn fan một chút", "Sợi đơn ló ra khỏi lớp fan thành những mũi nhọn rõ nét; sắc sảo, cá tính hơn"],
              ["Sợi đơn bằng hoặc ngắn hơn fan", "Fan nổi lên trên, hàng mi mềm và bông hơn; sợi đơn nằm dưới cho chiều sâu"],
            ],
          },
        },
        { img: { src: img("mi-hybrid-nhin-nghieng-soi-don-dai-hon-fan"), alt: "Mắt nhắm của khách nhìn nghiêng từ phía thái dương, đầu các sợi mi đơn nhô ra khỏi lớp fan mềm tạo đường viền hơi nhọn", caption: "Nhìn nghiêng: sợi đơn dài hơn fan một chút cho nét sắc." } },
        { p: "Chọn cách nào là tùy kiểu bạn đã thống nhất với khách. Chỉ nên lệch nhau một chút. Lệch nhiều quá, hàng mi sẽ trông rối và cẩu thả." },
        { p: "Fan và sợi đơn phải rải đều khắp hàng mi. Nếu fan dồn hết vào một chỗ, còn chỗ khác chỉ có vài sợi đơn, hàng mi sẽ loang lổ: chỗ đậm thành mảng, chỗ thưa. Cách tránh là làm theo từng vùng, sau mỗi vùng lùi ra nhìn tổng thể, và so cả hai mắt với nhau." },
        { img: { src: img("loi-fan-don-vao-giua-mat-hang-mi-loang-lo"), alt: "Cận cảnh mắt nhắm với một mảng fan dày đen dồn ở giữa hàng mi, hai đầu mắt chỉ có mi thật ngắn và thưa", caption: "Ảnh minh họa lỗi: fan dồn vào giữa mắt, hai đầu thưa. Hàng mi loang lổ." } },
      ],
    },
    {
      id: "an-toan-va-dam-mi",
      title: "An toàn và dặm mi hybrid",
      blocks: [
        { p: "Quy tắc an toàn giống hệt classic và volume:" },
        {
          ul: [
            "Mỗi sợi đơn hay mỗi fan chỉ gắn vào đúng một sợi mi thật đã tách thật sạch.",
            "Không để dính chùm.",
            "Gắn cách da mí khoảng 0,5–1 mm, không bao giờ chạm da.",
            "Giọt keo lấy thật nhỏ.",
          ],
        },
        { p: "Với hybrid, tay đổi qua đổi lại giữa sợi đơn và fan liên tục nên rất dễ vội. Hãy giữ nhịp tay chậm và chắc." },
        { p: "Mi thật rụng theo vòng đời, nên khách quay lại dặm thường sau 2–3 tuần. Lúc dặm, đừng gắn lại y như lần trước mà hãy đọc lại mi thật. Một sợi non lần trước để trống, hay chỉ mang sợi đơn mảnh, giờ có thể đã đủ khoẻ để mang fan. Nhắc khách giữ mi ở nhà như sau một bộ classic. Quy trình dặm có bài riêng: [Dặm và tháo mi](lesson:mi-dam-thao-hieu-dung)." },
      ],
    },
    {
      id: "tu-van-hybrid",
      title: "Tư vấn hybrid: cho khách xem hình và nói thật",
      blocks: [
        { p: "Cho khách xem hình hybrid trước khi làm và nói rõ đây là kiểu tơi, có kết cấu, không phải một hàng mi đen kín như volume. Nếu mi khách thưa, hãy nói nhẹ nhàng rằng lần này tiệm phối nhiều sợi đơn hơn để mi thật được khoẻ. Khách hiểu trước thì không bất ngờ khi mở mắt." },
        { p: "Trong VaraaAi, hãy ghi vào [hồ sơ khách hàng](lesson:khach-hang) kiểu đã chọn: sợi đơn dài hay ngắn hơn fan, khoảng bao nhiêu fan. Lần dặm sau, dù thợ khác làm, bộ mi vẫn giữ đúng kiểu. Hybrid và dặm hybrid cũng nên là hai [dịch vụ](lesson:dich-vu) riêng để khách đặt đúng thứ mình cần." },
        { p: "Thao tác cụ thể, từ đọc mi thật từng vùng đến so hai mắt, nằm trong bài thực hành [cách nối mi hybrid](lesson:mi-hybrid)." },
        { note: "Tỉ lệ phối, độ dài và số sợi trong bài là hướng dẫn chung theo kinh nghiệm nghề, không phải con số tuyệt đối: luôn chọn theo mi thật của khách, xem bảng gợi ý của hãng mi và hướng dẫn của hãng keo. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Lưu ý" },
      ],
    },
  ],
  faq: [
    {
      q: "Nối mi hybrid khác classic và volume ở điểm nào?",
      a: "Classic gắn một sợi nối lên mỗi sợi mi thật, volume gắn một fan vài sợi rất mảnh. Hybrid phối cả hai trên cùng một mắt, nên hàng mi dày hơn classic nhưng mềm và tự nhiên hơn một bộ volume phủ kín. Mỗi sợi mi thật vẫn chỉ mang một thứ.",
    },
    {
      q: "Nối mi hybrid hợp với ai?",
      a: "Hợp với khách có mi thật thưa, có khoảng trống hoặc không đều, vì fan trên những sợi khoẻ quanh chỗ trống làm hàng mi trông đầy hơn. Cũng hợp với khách đã quen classic, muốn dày hơn một chút nhưng chưa muốn volume.",
    },
    {
      q: "Tỉ lệ sợi đơn và fan trong mi hybrid là bao nhiêu?",
      a: "Con số hay được nhắc là khoảng nửa nửa, hoặc fan chiếm khoảng 30–50 %. Đó chỉ là điểm xuất phát. Mi nhiều sợi khoẻ có thể nhiều fan hơn, mi yếu thì nhiều sợi đơn mảnh hơn.",
    },
    {
      q: "Một sợi mi thật có gắn cả sợi đơn và fan được không?",
      a: "Không. Mỗi sợi mi thật chỉ mang một thứ, hoặc một sợi đơn hoặc một fan, và được tách riêng trước khi gắn. Hybrid chỉ là phối hai kiểu trên cùng một mắt.",
    },
    {
      q: "Mi hybrid kiểu spiky là gì?",
      a: "Là vẻ ngoài có kết cấu của hybrid: những sợi đơn đen, rõ nét đứng như các mũi nhọn nhỏ giữa lớp fan mềm. Khi sợi đơn được chọn dài hơn fan một chút, các mũi nhọn này lộ rõ hơn và hàng mi trông sắc sảo hơn.",
    },
    {
      q: "Nối mi hybrid giữ được bao lâu thì cần dặm?",
      a: "Khách thường dặm sau 2–3 tuần, vì mi thật rụng theo vòng đời và sợi nối rụng theo. Lúc dặm, thợ đọc lại mi thật: sợi non lần trước để trống có thể đã đủ khoẻ để mang sợi đơn hoặc fan.",
    },
  ],
  related: ["mi-hybrid", "mi-volume-hieu-dung", "mi-classic-hieu-dung", "mi-mapping-hieu-dung"],
};

export default article;
