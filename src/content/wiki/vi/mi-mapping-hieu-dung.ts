import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/mi-mapping-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "lash-mapping-la-gi",
  lesson: "mi-mapping-hieu-dung",
  category: "lash",
  title: "Lash mapping là gì? Các kiểu nối mi theo dáng mắt và độ cong J, B, C, CC, D, L",
  metaTitle: "Lash mapping là gì? Kiểu nối mi theo dáng mắt, độ cong",
  metaDescription:
    "Lash mapping là lên kế hoạch độ dài, độ cong cho từng vùng mi trước khi gắn. Năm kiểu chính, kiểu nào hợp mắt tròn, mắt cụp, sụp mí, và cách chọn độ cong.",
  keyword: "lash mapping là gì",
  keywords: [
    "các kiểu nối mi theo dáng mắt",
    "nối mi kiểu mắt mèo",
    "nối mi kiểu búp bê",
    "nối mi mắt cáo",
    "mắt cụp nên nối mi kiểu gì",
    "độ cong mi nối J B C CC D L",
    "sơ đồ nối mi",
  ],
  excerpt: "Mapping là bản đồ độ dài và độ cong cho từng vùng mi. Bài viết giải thích năm kiểu chính, kiểu nào thường hợp dáng mắt nào và cách chọn độ cong.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-mi-chon-do-dai-do-cong-tren-vi-mi-de-len-ban-do"),
    alt: "Thợ nối mi tóc búi cao ngồi bên cửa sổ studio, một tay cầm vỉ mi hồng nhạt, tay kia dùng nhíp chỉ vào một dải mi trên vỉ",
  },
  takeaways: [
    "Lash mapping là **lên kế hoạch độ dài và độ cong cho từng vùng** của hàng mi trước khi gắn sợi đầu tiên.",
    "Bản đồ được quyết định bởi ba thứ: dáng mắt, mi thật và mong muốn của khách. Đọc dáng mắt khi khách **ngồi, mở mắt, nhìn thẳng**.",
    "Năm kiểu chính: tự nhiên, búp bê, mắt mèo, sóc, mắt cáo. Chúng khác nhau ở chỗ đặt **điểm dài nhất**.",
    "Độ cong đi từ gần thẳng (J, B) đến cong nhiều (CC, D); chọn theo **hướng mọc của mi thật** để chân sợi nối áp dọc sợi mi.",
    "Gợi ý kiểu theo dáng mắt là xu hướng thường gặp, không phải luật. Mỗi khách phải được nhìn tận mắt.",
  ],
  intro: [
    "Lash mapping là gì: đó là việc vẽ bản đồ mi, tức quyết định gắn sợi nào ở đâu trước khi gắn. Cùng một tay thợ và cùng một kỹ thuật, chỉ cần đổi độ dài và độ cong ở từng vùng là đôi mắt có thể trông to hơn, dài hơn, hoặc buồn hơn. Mapping là phần nghĩ của nghề nối mi.",
    "Bài viết này viết lại bài học “Lash mapping: hiểu đúng để chọn kiểu hợp dáng mắt” trong khóa Nghề Mi của VaraaAi Academy. Bạn sẽ biết cách đọc một đôi mắt, phân biệt năm kiểu mi chính, hiểu vì sao kiểu mắt mèo có thể làm mắt cụp trông mệt hơn, và chọn độ cong theo hướng mọc của mi thật.",
  ],
  sections: [
    {
      id: "lash-mapping-la-gi",
      title: "Lash mapping là gì và vì sao cần bản đồ",
      blocks: [
        { p: "Mapping là lên kế hoạch trước khi gắn sợi đầu tiên. Người thợ chia hàng mi thành vài vùng từ đầu mắt đến đuôi mắt và ghi cho mỗi vùng hai thứ: sợi dài bao nhiêu, cong kiểu gì." },
        { p: "Có bản đồ thì hai mắt ra giống nhau và kết quả đúng như đã thống nhất với khách. Không có bản đồ, thợ làm theo cảm giác, và chuyện rất hay gặp là khách ngồi dậy với một mắt trông dài hơn mắt kia." },
        { p: "Bài này nói về cách nghĩ. Cách vẽ vạch lên miếng lót, ghi số cho từng vùng và gắn mi neo nằm trong bài thực hành [cách vẽ sơ đồ nối mi](lesson:mi-mapping)." },
      ],
    },
    {
      id: "doc-dang-mat-mi-that-mong-muon",
      title: "Đọc đôi mắt trước khi chọn kiểu: dáng mắt, mi thật, mong muốn",
      blocks: [
        { h3: "Dáng mắt" },
        {
          ul: [
            "**Mắt hạnh nhân:** hơi dài, thon ở hai đầu.",
            "**Mắt tròn:** mở to, thấy nhiều lòng đen.",
            "**Mắt sụp mí:** một nếp da từ xương lông mày phủ xuống, che phần mí.",
            "**Mắt một mí:** mí trơn, không có nếp gấp.",
            "**Mắt cụp:** đuôi mắt thấp hơn đầu mắt. **Mắt xếch:** đuôi mắt cao hơn.",
            "**Mắt sâu:** nằm sâu dưới xương lông mày.",
            "**Khoảng cách hai mắt:** gần nhau hay xa nhau.",
          ],
        },
        { img: { src: img("dang-mat-hanh-nhan-tron-sup-mi-mot-mi"), alt: "Bảng bốn ảnh cận đôi mắt của bốn phụ nữ châu Âu nhìn thẳng, không trang điểm, mỗi người một dáng mắt khác nhau", caption: "Từ trái sang phải, trên xuống dưới: mắt hạnh nhân, mắt tròn, mắt sụp mí, mắt một mí." } },
        { note: "Nhìn dáng mắt khi khách ngồi, mở mắt, nhìn thẳng. Khi khách đã nằm và nhắm mắt, đôi mắt nào trông cũng gần giống nhau.", kind: "tip", title: "Đọc lúc khách còn ngồi" },
        { h3: "Mi thật" },
        { p: "Dài hay ngắn, khoẻ hay mảnh, mọc chúc xuống, mọc thẳng hay đã cong sẵn, có chỗ nào thưa hoặc có khoảng trống không. Nguyên tắc từ bài [nối mi classic](lesson:mi-classic-hieu-dung) vẫn đứng trên mọi bản đồ: sợi nối không bao giờ dài hơn, nặng hơn sức sợi mi thật chịu được. Bản đồ đẹp đến mấy mà mi thật không đỡ nổi thì cũng không dùng được." },
        { h3: "Mong muốn của khách" },
        { p: "Khách muốn tự nhiên hay nổi bật, đi làm văn phòng hay sắp làm cô dâu. Hỏi thêm khách có đeo kính không, vì mi quá dài, quá cong sẽ chạm vào mắt kính." },
      ],
    },
    {
      id: "cac-kieu-noi-mi",
      title: "Các kiểu nối mi chính: tự nhiên, búp bê, mắt mèo, sóc, mắt cáo",
      blocks: [
        { p: "Năm kiểu dưới đây là xu hướng chung. Mỗi tiệm, mỗi hãng gọi tên hơi khác nhau, nhưng chỗ đặt điểm dài nhất thì giống nhau." },
        {
          table: {
            head: ["Kiểu", "Độ dài phân bố thế nào", "Đôi mắt trông ra sao"],
            rows: [
              ["Tự nhiên", "Theo hàng mi thật: ngắn ở đầu mắt, dài dần một chút về đuôi, chỉ dài hơn mi thật một chút", "Như mi của chính khách, đầy hơn; hợp hầu hết mọi người và an toàn cho lần đầu"],
              ["Búp bê (mắt mở)", "Dài nhất ở giữa mắt, ngay trên con ngươi, ngắn dần về hai đầu", "To, tròn và sáng hơn"],
              ["Mắt mèo", "Ngắn ở đầu mắt, dài dần, dài nhất ở đuôi mắt", "Dài ra, đuôi mắt được nâng nhẹ"],
              ["Sóc", "Dài nhất ở khoảng một phần ba phía ngoài, rồi ngắn lại một chút ở đúng đuôi mắt", "Mắt được nâng lên mà đuôi mắt không bị kéo xuống"],
              ["Mắt cáo", "Đầu và giữa mắt khá ngắn, tự nhiên; phần ngoài cùng dài hơn, thường cong hơn, hướng lên phía đuôi lông mày", "Đuôi mắt nâng lên, thon và sắc"],
            ],
          },
        },
        { img: { src: img("kieu-noi-mi-tu-nhien"), alt: "Khách nữ tóc vàng nhìn thẳng với bộ mi nối kiểu tự nhiên, mi chỉ dài hơn mi thật một chút và dài dần nhẹ về đuôi mắt", caption: "Kiểu tự nhiên: đi theo hàng mi thật." } },
        { img: { src: img("kieu-noi-mi-bup-be-dai-nhat-o-giua-mat"), alt: "Khách nữ tóc vàng nhìn thẳng với bộ mi nối kiểu búp bê, sợi dài nhất nằm ở giữa mỗi mắt nên mắt trông tròn và mở to", caption: "Kiểu búp bê: điểm dài nhất ở giữa mắt, trên con ngươi." } },
        { img: { src: img("kieu-noi-mi-mat-meo-dai-nhat-o-duoi-mat"), alt: "Khách nữ tóc vàng nhìn thẳng với bộ mi nối kiểu mắt mèo, mi ngắn ở đầu mắt và dài nhất ở đuôi mắt, kéo dài đôi mắt", caption: "Kiểu mắt mèo: điểm dài nhất ở đuôi mắt." } },
        { img: { src: img("kieu-noi-mi-mat-cao-nang-duoi-mat"), alt: "Khách nữ tóc vàng nhìn thẳng với bộ mi nối kiểu mắt cáo, phần mi phía ngoài dài hơn và hướng chéo lên đuôi lông mày", caption: "Kiểu mắt cáo: chỉ phần ngoài cùng dài và hướng lên." } },
      ],
    },
    {
      id: "kieu-mi-hop-dang-mat-nao",
      title: "Dáng mắt nào thường hợp kiểu nối mi nào",
      blocks: [
        { p: "Bảng này ghi những gì thường gặp. Nó giúp bạn có điểm bắt đầu khi tư vấn, không thay cho việc nhìn đôi mắt thật trước mặt." },
        {
          table: {
            head: ["Dáng mắt", "Thường hợp", "Cần để ý"],
            rows: [
              ["Hạnh nhân, mắt nhỏ", "Búp bê", "Kiểu tự nhiên vẫn là lựa chọn an toàn cho lần đầu"],
              ["Mắt tròn", "Mắt mèo, vì kéo mắt dài ra", "Búp bê có thể làm mắt vốn tròn tròn quá"],
              ["Hai mắt gần nhau", "Mắt mèo, vì kéo mắt ra hai bên", "Điểm dài nhất nằm ở đuôi"],
              ["Hai mắt xa nhau", "Nhấn ở đầu và giữa mắt", "Tránh kéo dài đuôi mắt"],
              ["Mắt cụp", "Búp bê, hoặc đưa điểm dài nhất vào gần giữa mắt, cong nhiều hơn ở phần ngoài", "Tránh để sợi dài nhất ở đuôi mắt"],
              ["Sụp mí, một mí", "Độ cong nhiều hơn, để sợi mi vượt khỏi nếp da và lộ ra", "Nếp da dễ che mất hàng mi"],
              ["Mắt sâu", "Độ dài và độ cong vừa phải", "Sợi quá dài, quá cong có thể chạm mí trên hoặc xương lông mày khi mở mắt"],
            ],
          },
        },
        { h3: "Mắt cụp và kiểu mắt mèo: tình huống hay gặp" },
        { p: "Khách có đôi mắt cụp thấy ảnh mắt mèo trên mạng và muốn y như vậy. Làm theo thì sợi dài nhất, nặng nhất dồn về đuôi và kéo đuôi mắt xuống thêm. Đôi mắt trông mệt và buồn hơn. Với mắt cụp, điểm dài nhất nên được đưa vào gần giữa mắt, và phần ngoài dùng độ cong nhiều hơn để nâng mắt lên." },
        { img: { src: img("loi-kieu-mat-meo-tren-mat-cup"), alt: "Cận mặt một phụ nữ có mắt cụp với mi nối rất dài và dày ở đuôi mắt, sợi mi rủ xuống quá khóe mắt làm mắt trông nặng", caption: "Ảnh minh họa lỗi chọn kiểu: mi dài và nặng dồn về đuôi trên đôi mắt cụp kéo mắt xuống thêm." } },
        { img: { src: img("mat-sup-mi-voi-soi-mi-noi-cong-nhieu"), alt: "Cận mặt một phụ nữ có mắt sụp mí nhìn thẳng, hàng mi nối cong lên vượt khỏi nếp da phủ trên mí nên vẫn nhìn thấy rõ", caption: "Mắt sụp mí: độ cong nhiều hơn giúp hàng mi lộ ra khỏi nếp da." } },
      ],
    },
    {
      id: "do-cong-mi-noi",
      title: "Độ cong mi nối J, B, C, CC, D, L và hướng mọc của mi thật",
      blocks: [
        { p: "Sợi mi nối được gọi theo chữ cái, và ý chung rất đơn giản: đi từ gần thẳng đến cong nhiều." },
        {
          table: {
            head: ["Độ cong", "Hình dáng", "Hiệu quả"],
            rows: [
              ["J, B", "Gần thẳng", "Nhìn tự nhiên"],
              ["C", "Cong hơn J và B", "Độ cong phổ biến nhất"],
              ["CC, D", "Cong nhiều hơn C", "Mi nhìn rõ, mắt mở hơn"],
              ["L", "Chân thẳng rồi mới bẻ cong lên", "Có thợ chọn cho mi thật chúc xuống, để phần chân ôm được sợi mi"],
            ],
          },
        },
        { img: { src: img("cac-do-cong-mi-noi-tu-gan-thang-den-cong-nhieu"), alt: "Sáu sợi mi nối đen cùng độ dài xếp thành sáu hàng nhìn nghiêng, độ cong ở ngọn tăng dần từ hàng trên xuống hàng dưới", caption: "Độ cong tăng dần từ trên xuống; sợi dưới cùng có chân thẳng rồi mới bẻ lên như chữ L." } },
        { p: "Ngoài sáu chữ này còn vài kiểu khác. Mỗi hãng uốn hơi khác nhau, nên cùng một chữ, hai hãng có thể không giống hệt." },
        { h3: "Vì sao hướng mọc của mi thật quyết định độ cong" },
        { p: "Phần chân sợi nối phải nằm áp dọc theo sợi mi thật. Mi thật mọc thẳng hay chúc xuống mà gắn sợi quá cong thì chỉ một điểm nhỏ chạm nhau: mi bám kém, rụng sớm và trông như bị bẻ gập. Với mi chúc xuống, có thợ chọn loại chân thẳng như L để phần chân ôm sợi mi rồi mới cong lên. Ngược lại, mi thật đã cong sẵn mà gắn sợi quá thẳng thì sợi nối chĩa ra ngoài." },
      ],
    },
    {
      id: "can-doi-va-tu-van",
      title: "Cân đối hai mắt và tư vấn thật lòng",
      blocks: [
        { p: "Hai mắt hiếm khi giống hệt nhau. Mi thật bên này có thể dài hơn hay thưa hơn bên kia. Bản đồ vì vậy không được chép y nguyên từ mắt này sang mắt kia: mục tiêu là kết quả nhìn cân đối, nên đôi khi phải chỉnh độ dài một chút ở một bên." },
        { p: "Trước khi bắt đầu, cho khách xem ảnh mẫu rồi nói thật kiểu nào hợp với đôi mắt này và mi thật của khách đỡ được đến đâu. Đừng chỉ làm theo ảnh khách mang đến. Hãy nói rõ ảnh đó hợp hay không hợp và vì sao. Hai bên thống nhất rồi mới bắt tay vào làm." },
        { note: "Ghi kiểu mi, độ dài và độ cong từng vùng vào “Ghi chú nội bộ” trong [hồ sơ khách](lesson:khach-hang) ở VaraaAi. Lần [dặm mi](lesson:mi-dam-thao-hieu-dung) sau, bất kỳ thợ nào trong tiệm cũng làm lại đúng bản đồ, và bạn có thể hẹn sẵn [lịch dặm](lesson:lich-hen) trước khi khách về.", kind: "tip", title: "Giữ lại bản đồ" },
        { note: "Các kiểu mi và gợi ý theo dáng mắt trong bài là xu hướng chung theo kinh nghiệm nghề, không phải luật cứng; tên gọi và độ cong khác nhau đôi chút theo từng hãng. Luôn chọn theo đôi mắt và sức mi thật của từng khách, theo hướng dẫn của hãng mi và hãng keo. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Lưu ý" },
      ],
    },
  ],
  faq: [
    {
      q: "Lash mapping là gì?",
      a: "Lash mapping là lên kế hoạch trước khi nối mi: chia hàng mi thành vài vùng từ đầu mắt đến đuôi mắt và ghi độ dài, độ cong cho từng vùng. Có bản đồ thì hai mắt ra giống nhau và kết quả đúng như đã thống nhất với khách.",
    },
    {
      q: "Mắt cụp nên nối mi kiểu gì?",
      a: "Với mắt cụp, thường nên tránh để sợi dài nhất ở đuôi mắt vì sợi dài, nặng ở đuôi kéo mắt xuống thêm. Kiểu búp bê, hoặc đưa điểm dài nhất vào gần giữa mắt cùng độ cong nhiều hơn ở phần ngoài, giúp nâng mắt lên. Đây là xu hướng thường gặp, thợ vẫn cần nhìn đôi mắt cụ thể.",
    },
    {
      q: "Mắt tròn nên nối mi kiểu mắt mèo hay búp bê?",
      a: "Kiểu mắt mèo thường hợp mắt tròn vì nó kéo đôi mắt dài ra. Kiểu búp bê đặt sợi dài nhất ở giữa mắt, nên với đôi mắt vốn đã tròn nó có thể làm mắt tròn quá.",
    },
    {
      q: "Mắt một mí, sụp mí nên chọn độ cong mi thế nào?",
      a: "Ở mắt sụp mí và một mí, nếp da dễ che mất hàng mi, nên thường cần độ cong nhiều hơn để sợi mi vượt lên khỏi nếp da và lộ ra. Độ cong cụ thể còn tùy hướng mọc của mi thật, vì chân sợi nối phải áp dọc sợi mi.",
    },
    {
      q: "Độ cong mi J, B, C, CC, D, L khác nhau thế nào?",
      a: "Các chữ đi từ gần thẳng đến cong nhiều: J và B gần thẳng, nhìn tự nhiên; C là độ cong phổ biến nhất; CC và D cong nhiều hơn, làm mắt mở hơn. L có phần chân thẳng rồi mới bẻ cong lên. Mỗi hãng uốn hơi khác nhau nên cùng một chữ có thể không giống hệt.",
    },
    {
      q: "Đeo kính có nối mi dài và cong được không?",
      a: "Mi quá dài, quá cong sẽ chạm vào mắt kính. Hãy nói với thợ mi từ buổi tư vấn để độ dài và độ cong được chọn cho phù hợp.",
    },
  ],
  related: ["mi-mapping", "mi-classic-hieu-dung", "mi-hybrid-hieu-dung", "mi-mega-wispy-hieu-dung"],
};

export default article;
