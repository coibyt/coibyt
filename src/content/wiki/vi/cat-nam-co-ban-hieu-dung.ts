import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-co-ban-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "hoc-cat-toc-nam-cho-nguoi-moi",
  lesson: "cat-nam-co-ban-hieu-dung",
  category: "hair",
  title: "Học cắt tóc nam cho người mới: cữ tông đơ, cách cầm kéo và 6 lỗi hay gặp",
  metaTitle: "Học cắt tóc nam cho người mới: cữ tông đơ, kéo, lỗi",
  metaDescription:
    "Học cắt tóc nam từ nền tảng: các phần của kiểu tóc, số cữ tông đơ và cần gạt, cách cầm kéo, kéo trên lược, nối đỉnh với hai bên, đường viền và 6 lỗi hay gặp.",
  keyword: "học cắt tóc nam",
  keywords: [
    "học cắt tóc nam cho người mới",
    "cữ tông đơ là gì",
    "số cữ tông đơ",
    "cách cầm kéo cắt tóc",
    "kéo trên lược",
    "lỗi khi cắt tóc nam",
    "tóc nam ngắn bao lâu cắt lại",
  ],
  excerpt: "Tóc nam càng ngắn thì lỗi càng lộ. Bài này giải thích những điều làm một kiểu tóc nam gọn và cân, trước khi bạn cầm tông đơ.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-cat-toc-tu-van-kieu-toc-nam-cho-khach"),
    alt: "Người thợ cắt tóc mặc gi lê tím đứng cạnh khách nam ngồi trước gương viền đồng, một tay nâng phần tóc đỉnh của khách để trao đổi",
  },
  takeaways: [
    "Phần nối giữa tóc ngắn và tóc dài thường nằm quanh hai mốc: **đường vòng đầu** và **xương chẩm**.",
    "Số cữ chỉ cho biết tóc còn dài khoảng bao nhiêu và mỗi hãng một khác. Luôn bắt đầu bằng **cữ dài hơn**.",
    "Tông đơ đi ngược chiều tóc mọc, cữ áp phẳng, chậm, các đường chồng nhau. Ấn mạnh hay nghiêng máy là thành lỗ.",
    "Chỗ hay hỏng nhất là nơi hai bên gặp phần đỉnh: phải nối dần từ ngắn tới dài cho tới khi vuốt lên không còn gờ.",
    "Kiểu tóc ngắn thường giữ dáng khoảng **3–5 tuần**. Nói con số này với khách để hẹn lần sau đúng lúc.",
  ],
  intro: [
    "Học cắt tóc nam, người mới hay nghĩ kiểu ngắn là kiểu dễ. Thực tế ngược lại: chính vì ngắn nên mọi lỗi đều lộ ra. Một vệt lõm, một đường gờ, hai bên mai không bằng nhau, khách nhìn gương là thấy ngay.",
    "Bài viết này đi theo bài học “Cắt tóc nam cơ bản: hiểu đúng để gọn và cân” trong khóa Nghề Tóc của VaraaAi Academy, là phần lý thuyết của chủ đề. Đọc xong, bạn gọi được tên các phần của một kiểu tóc nam, hiểu số cữ tông đơ, biết cầm kéo, và biết nhìn vào gương để tìm ra lỗi của chính mình. Phần thao tác trên ghế cắt nằm ở bài [Cách cắt tóc nam cơ bản từng bước](lesson:cat-nam-co-ban).",
  ],
  sections: [
    {
      id: "cac-phan-kieu-toc-nam",
      title: "Các phần của một kiểu tóc nam và hai mốc cần nhớ",
      blocks: [
        { p: "Thợ và khách nói chuyện được với nhau là nhờ gọi đúng tên từng vùng tóc. Một kiểu tóc nam ngắn có năm phần." },
        {
          table: {
            head: ["Phần", "Nằm ở đâu"],
            rows: [
              ["Đỉnh", "Phía trên đầu, thường là phần để dài nhất"],
              ["Hai bên", "Hai mái bên, phía trên tai"],
              ["Chẩm", "Phía sau đầu"],
              ["Gáy", "Dưới cùng ở phía sau"],
              ["Đường viền", "Quanh vành tai, hai bên tóc mai và đường gáy"],
            ],
          },
        },
        { img: { src: img("kieu-toc-nam-ngan-co-dien-nhin-nghieng"), alt: "Khách nam nhìn nghiêng sau khi cắt: hai bên ngắn nối mềm lên phần đỉnh dài chải ngược, vành tai lộ rõ với đường viền cong", caption: "Nhìn nghiêng thấy rõ phần đỉnh, mái bên, tóc mai và đường viền quanh tai. Giữa hai bên và đỉnh không có vạch." } },
        { p: "Ngoài tên gọi, có hai mốc trên đầu mà bài cắt tóc nam nào cũng nhắc tới. **Đường vòng đầu** là chỗ đầu rộng nhất ở hai bên. **Xương chẩm** là phần hơi nhô ra phía sau đầu. Phần nối giữa ngắn và dài thường nằm quanh hai mốc này, nên trước khi bật máy bạn hãy sờ tay tìm chúng trên đầu khách." },
        { img: { src: img("kieu-toc-nam-ngan-nhin-tu-phia-sau-gay-tron"), alt: "Đầu của khách nam nhìn thẳng từ phía sau: phần gáy và chẩm cắt ngắn, chuyển dần lên phần tóc dài ở trên, đường gáy bo tròn", caption: "Phía sau: gáy ở dưới cùng, chẩm ở giữa. Tóc dài dần từ gáy lên quanh xương chẩm." } },
      ],
    },
    {
      id: "cu-tong-do",
      title: "Cữ tông đơ là gì: số cữ, cần gạt và quy tắc bắt đầu bằng cữ dài",
      blocks: [
        { p: "Cữ là chiếc lược nhựa gắn vào lưỡi tông đơ. Số trên cữ cho biết tóc sẽ còn dài khoảng bao nhiêu: số càng lớn, tóc để càng dài. Nhưng mỗi hãng một khác, cùng một số mà dài ngắn chênh nhau một chút. Bảng đúng cho bạn là bảng của chính hãng tông đơ bạn đang dùng." },
        { img: { src: img("cac-cu-tong-do-tu-ngan-den-dai"), alt: "Năm chiếc cữ tông đơ bằng nhựa đen xếp hàng từ nhỏ đến lớn trên mặt đá cẩm thạch, cạnh một chiếc tông đơ và cây lược đen", caption: "Cữ xếp từ ngắn tới dài. Răng cữ càng dài thì tóc để lại càng dài." } },
        { p: "Nhiều tông đơ còn có một cần gạt ở bên hông. Gạt lên hay gạt xuống, lưỡi dịch đi một chút, và tóc dài ngắn thêm một chút trong cùng một cữ. Thợ hay dùng cần gạt để nối mềm giữa hai cữ liền nhau." },
        { p: "Quy tắc quan trọng nhất với cữ rất ngắn gọn: luôn bắt đầu bằng cữ dài hơn. Cắt thêm thì lúc nào cũng được. Lỡ ngắn rồi thì chỉ còn cách đợi tóc mọc." },
        { note: "Khi không chắc, lắp cữ dài hơn một số. Đi lại bằng cữ ngắn hơn chỉ mất một phút, còn cắt lẹm thì khách phải đợi vài tuần.", kind: "tip", title: "Kinh nghiệm trong nghề" },
      ],
    },
    {
      id: "cam-keo-di-tong-do",
      title: "Cách cầm kéo cắt tóc và cách đi tông đơ",
      blocks: [
        { h3: "Cầm kéo: chỉ một lưỡi chuyển động" },
        { p: "Ngón cái ở một vòng, ngón áp út ở vòng kia, ngón út tựa lên đuôi kéo. Khi cắt, chỉ lưỡi phía ngón cái chuyển động, lưỡi kia đứng yên. Nhờ vậy đường cắt thẳng và tóc không bị đẩy lệch đi." },
        { p: "Lúc chải tóc, nhiều thợ rút ngón cái ra và cuộn kéo vào lòng bàn tay, để lược và kéo không vướng nhau. Dù đang cắt hay đang chải, đừng bao giờ chĩa mũi kéo về phía mặt khách." },
        { h3: "Đi tông đơ: ngược chiều tóc mọc" },
        { p: "Đi ngược chiều mọc thì tóc được dựng lên và lưỡi cắt đều hơn. Cữ áp phẳng vào đầu, tay đi chậm và đều, các đường chồng lên nhau một chút. Ở gáy và quanh xoáy, tóc mọc theo nhiều hướng, nên bạn đi thêm vài hướng khác cho đều." },
        { note: "Ấn mạnh tông đơ vào đầu, hoặc nghiêng máy cho lưỡi cắm vào tóc, thì chỗ ấy ngắn hơn chỗ khác và thành một cái lỗ nhìn rất rõ. Lực tay nhẹ và cữ áp phẳng là đủ.", kind: "warn", title: "Lỗi của người mới cầm tông đơ" },
      ],
    },
    {
      id: "keo-tren-luoc",
      title: "Kéo trên lược và tông đơ trên lược: nối phần ngắn với phần dài",
      blocks: [
        { p: "Để nối tóc ngắn lên tóc dài, thợ có hai cách, và cả hai dùng chung một nguyên tắc. Lược đặt sát đầu, răng lược hơi nghiêng ra. Tóc lòi qua răng lược bao nhiêu thì cắt đi bấy nhiêu. Góc của lược quyết định tóc dài hay ngắn." },
        {
          table: {
            head: ["Cách", "Làm thế nào", "Cho kết quả gì"],
            rows: [
              ["Kéo trên lược", "Lưỡi kéo chạy song song theo lược", "Đường nối mềm"],
              ["Tông đơ trên lược", "Tông đơ chạy dọc trên lược", "Nhanh và đều hơn"],
            ],
          },
        },
        { img: { src: img("tong-do-tren-luoc-noi-hai-ben-len-dinh"), alt: "Người thợ giữ cây lược đen nâng một lớp tóc của khách nam lên, tay kia đưa tông đơ không cữ chạy dọc theo sống lược", caption: "Tông đơ trên lược: lược nâng tóc, máy cắt phần tóc lòi qua răng lược." } },
        { p: "Dù dùng kéo hay tông đơ, lược luôn đi lên, đều tay, không dừng lâu một chỗ. Dừng lại là thành một bậc." },
        { h3: "Đường gờ giữa hai bên và phần đỉnh" },
        { p: "Chỗ mà kiểu tóc nam hay hỏng nhất là nơi hai bên gặp phần đỉnh. Hai bên cắt ngắn bằng tông đơ, phần đỉnh để dài, và ở giữa còn lại một đường gờ cứng. Nhìn nghiêng trông như có một cái bậc." },
        { img: { src: img("loi-duong-go-cung-giua-hai-ben-va-dinh"), alt: "Khách nam nhìn nghiêng với hai bên cạo rất ngắn, kết thúc bằng một vạch ngang rõ ở thái dương, phần tóc đỉnh dài phủ lên như mái hiên", caption: "Ví dụ về lỗi: hai bên và phần đỉnh chưa được nối, để lại một vạch ngang cứng." } },
        { p: "Cách sửa là nối dần từ ngắn tới dài, bằng kéo trên lược hoặc bằng một cữ dài hơn đi ở khoảng giữa. Bạn làm cho tới khi vuốt tay từ dưới lên mà không còn thấy gờ." },
      ],
    },
    {
      id: "can-doi-duong-vien",
      title: "Cân đối, đường viền và 6 lỗi hay gặp khi cắt tóc nam",
      blocks: [
        { p: "Thứ làm một kiểu tóc nam trông chuyên nghiệp là sự cân đối và đường viền. Đường viền quanh tai gọn, tự nhiên, không khoét quá cao. Hai bên tóc mai bằng nhau. Đường gáy vuông hay tròn là theo ý khách." },
        { p: "Mai lệch là lỗi rất hay gặp, nhất là khi khách nghiêng đầu. Bạn giữ đầu khách thẳng, cho khách nhìn thẳng vào gương, rồi đặt hai ngón tay ở chân hai bên mai để so cùng lúc. Sau đó đừng chỉ nhìn từ một phía: nhìn trong gương, nhìn nghiêng và nhìn từ phía sau." },
        { img: { src: img("so-hai-ben-toc-mai-bang-hai-ngon-tay"), alt: "Người thợ đứng sau khách nam đang nhìn thẳng, đưa hai ngón trỏ vào hai bên mặt khách ở cùng một độ cao để so tóc mai", caption: "Đầu khách thẳng, mắt nhìn thẳng gương, hai ngón tay so hai bên cùng lúc." } },
        {
          table: {
            head: ["Lỗi", "Vì sao", "Cách tránh"],
            rows: [
              ["Lỗ lõm ở hai bên hoặc gáy", "Ấn mạnh tông đơ hoặc nghiêng máy cho lưỡi cắm vào tóc", "Cữ áp phẳng, tay nhẹ, đi chậm"],
              ["Bậc ngang trên đường nối", "Lược dừng lâu một chỗ", "Lược luôn đi lên, đều tay"],
              ["Đường gờ cứng chỗ hai bên gặp đỉnh", "Không nối dần từ ngắn tới dài", "Kéo trên lược hoặc một cữ dài hơn ở giữa, tới khi vuốt lên không còn gờ"],
              ["Hai bên mai lệch nhau", "Khách nghiêng đầu, thợ chỉ nhìn một bên", "Đầu thẳng, nhìn thẳng gương, hai ngón tay so chân mai"],
              ["Viền tai bị khoét cao", "Viền lấn lên trên chân tóc tự nhiên", "Viền gọn theo đường tự nhiên quanh tai"],
              ["Tóc dựng đứng, lởm chởm", "Tóc dày, sợi to bị cắt quá ngắn, hoặc cắt quá sát chỗ xoáy", "Để dài hơn một chút hoặc tỉa bớt độ dày; chỗ xoáy không cắt sát"],
            ],
          },
        },
      ],
    },
    {
      id: "ve-sinh-tong-do",
      title: "Vệ sinh tông đơ sau mỗi khách và khi nào không cắt",
      blocks: [
        { p: "Sau mỗi khách, bạn chải sạch tóc trong lưỡi tông đơ, khử khuẩn lưỡi và cữ theo hướng dẫn của sản phẩm, rồi tra dầu cho lưỡi. Lưỡi được tra dầu thì chạy êm, ít nóng và ít giật tóc. Lược và kéo cũng được làm sạch, khử khuẩn sau mỗi khách. Lưỡi dao cạo chỉ dùng một lần." },
        { img: { src: img("chai-sach-toc-trong-luoi-tong-do"), alt: "Hai bàn tay đeo găng nitrile đen dùng chổi nhỏ chải tóc vụn khỏi lưỡi tông đơ trên bàn đá, bên cạnh là cữ và bình xịt", caption: "Chải sạch tóc trong lưỡi trước, rồi mới khử khuẩn và tra dầu." } },
        { note: "Da đầu có vết thương, viêm hay có chấy thì không cắt. Quy định về vệ sinh trong tiệm khác nhau theo từng nước, nên hãy kiểm tra quy định nơi bạn làm việc. Chi tiết có trong hai bài [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu) và [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam).", kind: "warn", title: "Trước khi quàng áo choàng" },
      ],
    },
    {
      id: "doc-mai-toc-noi-that",
      title: "Đọc mái tóc và nói thật với khách",
      blocks: [
        { p: "Cùng một kiểu, trên hai mái tóc khác nhau sẽ ra hai kết quả khác nhau. Trước khi cắt, bạn đọc mái tóc của khách như trong bài [Tư vấn và chia vùng tóc](lesson:toc-tu-van-chia-vung-hieu-dung)." },
        {
          ul: [
            "**Tóc dày, sợi to.** Cắt quá ngắn thì tóc dựng đứng, nhìn lởm chởm. Nên để dài hơn một chút, hoặc tỉa bớt độ dày.",
            "**Tóc thưa ở đỉnh.** Để quá dài thì tóc rủ xuống, tách ra và càng lộ da đầu. Cắt gọn hơn thường trông dày hơn.",
            "**Xoáy ở đỉnh đầu và ở gáy.** Chỗ ấy đừng cắt quá sát.",
          ],
        },
        { img: { src: img("xoay-toc-o-dinh-dau"), alt: "Cận cảnh đỉnh đầu của khách nam nhìn từ phía sau, tóc nâu sẫm tỏa ra từ một điểm thành hình xoáy rõ", caption: "Xoáy ở đỉnh đầu. Tóc quanh xoáy mọc nhiều hướng, cắt sát là dựng lên." } },
        { p: "Đọc xong thì nói thật, trước khi cắt chứ không phải sau. Khách muốn cạo thật ngắn ở đỉnh đầu mà chỗ ấy có xoáy mạnh, bạn nói trước là tóc sẽ dựng. Khách mang ảnh một người tóc dày, sợi to, trong khi tóc khách mảnh và thưa, bạn nói rõ: làm được dáng ấy, nhưng sẽ không giống hệt ảnh. Khách thích một kiểu cần vuốt sáp mỗi sáng mà chưa bao giờ vuốt, bạn gợi ý một kiểu dễ hơn." },
        { p: "Cũng nên cho khách biết kiểu tóc ngắn thường giữ dáng khoảng 3–5 tuần. Trong VaraaAi, bạn ghi cữ và độ dài của từng người vào [sổ khách hàng](lesson:khach-hang), rồi nhắc khách hẹn lại sau vài tuần bằng [thẻ khách quen](lesson:the-khach-quen) hoặc tin nhắn, để kiểu tóc luôn gọn." },
      ],
    },
  ],
  faq: [
    {
      q: "Số cữ tông đơ nghĩa là gì?",
      a: "Số trên cữ cho biết tóc sẽ còn dài khoảng bao nhiêu sau khi đi máy: số càng lớn thì tóc để càng dài. Độ dài thật của cùng một số khác nhau theo từng hãng, nên hãy xem bảng của hãng tông đơ bạn đang dùng. Khi chưa chắc, bắt đầu bằng cữ dài hơn.",
    },
    {
      q: "Người mới học cắt tóc nam nên bắt đầu bằng cữ nào?",
      a: "Bắt đầu bằng cữ dài hơn mức bạn định cắt. Đi lại bằng cữ ngắn hơn chỉ mất một phút, còn tóc đã cắt lẹm thì phải đợi vài tuần mới mọc lại. Quy tắc này đúng với mọi hãng tông đơ.",
    },
    {
      q: "Đi tông đơ xuôi hay ngược chiều tóc mọc?",
      a: "Đi ngược chiều tóc mọc. Tóc được dựng lên nên lưỡi cắt đều hơn. Cữ áp phẳng vào đầu, đi chậm, các đường chồng lên nhau một chút. Ở gáy và quanh xoáy, tóc mọc nhiều hướng nên cần đi thêm vài hướng khác.",
    },
    {
      q: "Cầm kéo cắt tóc thế nào cho đúng?",
      a: "Ngón cái ở một vòng, ngón áp út ở vòng kia, ngón út tựa lên đuôi kéo. Khi cắt chỉ lưỡi phía ngón cái chuyển động, lưỡi kia đứng yên, nhờ đó đường cắt thẳng và tóc không bị đẩy lệch. Không chĩa mũi kéo về phía mặt khách.",
    },
    {
      q: "Vì sao cắt tóc nam hay bị một đường gờ giữa hai bên và phần đỉnh?",
      a: "Vì hai bên được cắt ngắn bằng tông đơ còn phần đỉnh để dài, mà ở giữa không được nối dần từ ngắn tới dài. Cách sửa là dùng kéo trên lược, hoặc một cữ dài hơn đi ở khoảng giữa, cho tới khi vuốt tay lên không còn thấy gờ.",
    },
    {
      q: "Tóc nam ngắn bao lâu thì nên cắt lại?",
      a: "Kiểu tóc ngắn thường giữ được dáng khoảng 3–5 tuần. Thợ nên nói con số này với khách ngay khi cắt xong, để khách hẹn lần sau đúng lúc và kiểu tóc luôn gọn.",
    },
  ],
  related: ["cat-nam-co-ban", "toc-tu-van-chia-vung-hieu-dung", "cat-nam-fade-hieu-dung", "ve-sinh-dung-cu"],
};

export default article;
