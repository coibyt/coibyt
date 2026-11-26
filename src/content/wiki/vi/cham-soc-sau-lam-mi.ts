import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cham-soc-sau-lam-mi/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cham-soc-mi-sau-khi-noi-va-uon-mi",
  lesson: "cham-soc-sau-lam-mi",
  category: "tips",
  title: "Chăm sóc mi sau khi nối hoặc uốn: 3 điều nhớ trong những ngày đầu để mi đẹp lâu",
  metaTitle: "Chăm sóc mi sau khi nối và uốn: 3 điều cần nhớ",
  metaDescription:
    "Chăm sóc mi sau khi nối hoặc uốn: không dụi mắt, 24 giờ đầu giữ mi khô và tránh sauna, dặm mi sau 2–3 tuần, uốn lại sau 6–8 tuần, cùng những thói quen hằng ngày.",
  keyword: "chăm sóc mi sau khi nối",
  keywords: ["sau khi nối mi bao lâu được rửa mặt", "sau khi uốn mi kiêng gì", "nối mi có được đi sauna không", "nối mi xong có được dụi mắt không", "sau khi nối mi cần làm gì", "ngủ thế nào khi nối mi"],
  excerpt: "Không dụi mắt, 24 giờ đầu không làm ướt mi, và làm lại đúng hẹn: ba điều giúp mi nối và mi uốn đẹp lâu, kèm những thói quen hằng ngày nên giữ.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-soi-guong-ngam-mi-moi-lam-xong"),
    alt: "Khách nữ tóc vàng ngồi ghế kem cầm gương tay viền vàng mỉm cười ngắm mi, thợ mi đứng phía sau cười theo",
  },
  takeaways: [
    "**Không dụi mắt, không kéo hay bứt mi**: dụi làm mi nối xoắn và tuột, kéo theo cả mi thật.",
    "**24 giờ đầu không làm ướt mi**, không xông hơi, không đi sauna: keo nối và thuốc uốn cần thời gian ổn định.",
    "Nối mi nên **đi dặm sau 2–3 tuần**; uốn mi làm lại sau **6–8 tuần**, khi mi mới đã mọc ra.",
    "Hằng ngày: tránh sản phẩm có dầu quanh mắt, rửa và chải mi nhẹ nhàng.",
    "Ngủ nằm ngửa hoặc nghiêng nhẹ, không úp mặt xuống gối.",
  ],
  intro: [
    "Chăm sóc mi sau khi nối hay sau khi uốn quan trọng nhất ở vài ngày đầu. Đó là lúc keo nối và thuốc uốn còn đang ổn định, và một lần dụi mắt hay một buổi sauna quá sớm có thể làm hỏng cả buổi nằm yên khoảng 90 phút. Bài học gói lại thành ba điều: không dụi mắt, 24 giờ không ướt, và làm lại đúng hẹn.",
    "Bài viết đi theo bài học “Chăm sóc mi sau khi nối hoặc uốn” trong khóa Moja Beauty của VaraaAi Academy, khóa học cho khách từ salon Moja Beauty ở Helsinki. Đọc xong, bạn sẽ biết điều gì cần tránh trong ngày đầu, thói quen nào giữ mi đẹp hằng ngày, và khi nào nên quay lại tiệm.",
  ],
  sections: [
    {
      id: "khong-dui-mat",
      title: "Điều 1: không dụi mắt, không kéo hay bứt mi",
      blocks: [
        { p: "Dụi mắt là thói quen khó bỏ nhất, và cũng hại mi nhất. Khi bạn dụi, các sợi mi nối bị đẩy lệch, xoắn vào nhau rồi tuột ra. Vì mỗi sợi nối được gắn lên một sợi mi thật, sợi tuột ra thường kéo theo cả sợi mi thật bên dưới." },
        { img: { src: img("thoi-quen-sai-keo-bung-mi-noi-truoc-guong"), alt: "Ví dụ thói quen sai: cô gái tóc vàng nhíu mày nhìn gương, dùng ngón tay kéo bứt mi nối ở đuôi mắt", caption: "Thói quen sai: kéo, bứt mi nối khi thấy vướng." } },
        { p: "Kéo hay bứt mi còn tệ hơn. Khi thấy một sợi chĩa ra hay vướng, đừng tự gỡ. Kéo sợi nối là kéo luôn mi thật khỏi chân mi, và lặp lại nhiều lần thì mi mọc lại thưa, yếu hơn. Hãy để đến lần dặm, hoặc ghé tiệm sớm hơn nếu sợi đó làm bạn khó chịu." },
        { note: "Không dùng kẹp uốn mi lên mi nối, và tránh mascara chống nước. Cả hai đều làm sợi nối bị gập, bị kéo khi tẩy.", kind: "tip", title: "Hai việc nhỏ hay bị quên" },
      ],
    },
    {
      id: "24-gio-dau",
      title: "Điều 2: 24 giờ đầu giữ mi khô, không xông hơi, không sauna",
      blocks: [
        { p: "Keo nối mi và thuốc uốn mi đều cần thời gian để ổn định. Trong 24 giờ đầu, nước, hơi nóng và hơi nước làm quá trình đó dở dang, nên mi nhanh hỏng: mi nối rụng sớm, mi uốn mất nếp. Ngày đầu tiên vì vậy là ngày giữ mi khô." },
        {
          table: {
            head: ["Trong 24 giờ đầu", "Nên làm gì thay"],
            rows: [
              ["Rửa mặt", "Rửa nhẹ, không để nước chạm vùng mắt"],
              ["Xông hơi, sauna", "Để sang ngày hôm sau"],
              ["Bơi", "Để sang ngày hôm sau"],
              ["Mascara", "Không chuốt trong ngày đầu"],
            ],
          },
        },
        { p: "Thời gian chính xác có thể khác một chút theo hãng keo và hãng thuốc uốn mà tiệm dùng. Nếu thợ dặn khác, hãy theo lời thợ, vì thợ biết sản phẩm đã dùng trên mi bạn." },
        { img: { src: img("go-mieng-lot-nhe-nhang-khi-mat-van-nham"), alt: "Ngón tay đeo găng đen gỡ nhẹ miếng lót trắng dưới mắt khách đang nhắm, hàng mi nối đen dày vừa làm xong" } },
      ],
    },
    {
      id: "lam-lai-dung-hen",
      title: "Điều 3: làm lại đúng hẹn",
      blocks: [
        { p: "Mi thật rụng mỗi ngày theo vòng đời tự nhiên, và mi nối rụng theo. Sau hai đến ba tuần, hàng mi nối bắt đầu thưa và không đều, những sợi còn lại đã mọc dài ra theo mi thật. Đó là lúc đi dặm." },
        { img: { src: img("bo-mi-noi-sau-ba-tuan-mi-thua-va-moc-dai"), alt: "Cận cảnh mắt khách đang nhắm với bộ mi nối khoảng ba tuần tuổi, vài sợi đã mọc dài ra và hàng mi bắt đầu thưa", caption: "Bộ mi nối sau khoảng ba tuần: thưa dần, vài sợi đã mọc dài." } },
        { p: "Uốn mi thì khác. Nếp uốn giữ khoảng sáu đến tám tuần, và bạn làm lại khi những sợi mi mới đã mọc ra thẳng. Đừng uốn lại sớm hơn: thuốc uốn lặp lại quá gần có thể làm mi khô và giòn." },
        {
          table: {
            head: ["Dịch vụ", "Làm lại sau"],
            rows: [
              ["Nối mi", "Dặm sau 2–3 tuần"],
              ["Uốn mi", "Uốn lại sau 6–8 tuần"],
            ],
          },
        },
        { p: "Cách dễ nhất là hẹn luôn lịch tiếp theo trước khi rời tiệm. Vì sao dặm đúng hẹn lại nhẹ nhàng hơn làm lại từ đầu, bài [vì sao nên đi dặm mi và móng đúng hẹn](lesson:dam-mi-mong-dung-hen) giải thích kỹ." },
      ],
    },
    {
      id: "thoi-quen-hang-ngay",
      title: "Thói quen hằng ngày giữ mi nối đẹp lâu",
      blocks: [
        { p: "Qua 24 giờ đầu, mi nối cần được giữ sạch chứ không cần kiêng nước. Những thói quen nên giữ:" },
        {
          ul: [
            "Rửa mi nhẹ nhàng bằng bọt rửa mi không dầu, rồi chải lại cho đều. Từng bước có trong bài [cách rửa mi nối tại nhà](lesson:rua-mi-noi-tai-nha).",
            "Tránh tẩy trang, kem và dầu dưỡng gốc dầu quanh mắt, vì dầu làm keo mềm ra.",
            "Chải mi mỗi ngày bằng chổi sạch, từ chân ra ngọn.",
            "Ngủ nằm ngửa hoặc nghiêng nhẹ. Úp mặt xuống gối làm mi bị đè, gập và rụng nhiều ở một bên.",
          ],
        },
        { img: { src: img("ngu-nam-ngua-tren-goi-lua-giu-mi-noi"), alt: "Cô gái tóc vàng ngủ nằm ngửa trên gối lụa màu sâm panh, hai tay đặt trên ngực, hàng mi nối nằm gọn không bị đè", caption: "Ngủ nằm ngửa giúp mi nối không bị đè gập." } },
        { p: "Sau khi uốn mi, phần chăm sóc còn đơn giản hơn: qua ngày đầu, bạn sinh hoạt bình thường, chỉ cần nhớ không dụi mắt và không kéo mi." },
        { img: { src: img("tho-chai-mi-sau-khi-uon-mi-xong"), alt: "Thợ đeo găng đen dùng chổi chải mi chải nhẹ hàng mi thật vừa uốn cong của khách đang nằm nhắm mắt" } },
      ],
    },
    {
      id: "khi-nao-quay-lai-som",
      title: "Khi nào nên quay lại tiệm sớm hơn",
      blocks: [
        { p: "Đôi khi bạn không cần chờ đến lịch dặm:" },
        {
          ul: [
            "Một vài sợi chĩa ra, xoắn hay làm cộm mắt.",
            "Mi rụng nhiều bất thường ở một chỗ.",
            "Bạn muốn bỏ mi nối: hãy để thợ tháo bằng dung dịch chuyên dụng, đừng tự giật.",
          ],
        },
        { note: "Mắt đỏ, ngứa, sưng hay chảy nước sau khi làm mi có thể là dấu hiệu kích ứng hoặc dị ứng. Hãy báo salon và đi khám bác sĩ.", kind: "warn", title: "Dấu hiệu cần đi khám" },
        { img: { src: img("tho-mi-hoi-tham-khach-quay-lai-tiem"), alt: "Thợ mi búi tóc cúi xuống hỏi thăm và xem mắt khách tóc vàng đang ngồi cười trên ghế kem trong studio" } },
        { p: "Bạn có thể đọc thêm vì sao nối đúng cách không làm hại mi thật trong bài [nối mi có làm rụng mi thật](lesson:noi-mi-co-hai-mi-that). Còn thắc mắc về chăm sóc mi, cứ nhắn Moja Beauty; lịch dặm có thể đặt trên VaraaAi tại [trang của Moja Beauty](/b/moja-beauty)." },
      ],
    },
  ],
  faq: [
    {
      q: "Sau khi nối mi bao lâu thì được rửa mặt?",
      a: "Trong 24 giờ đầu, hãy giữ mi khô: rửa mặt nhẹ và không để nước chạm vùng mắt. Sau đó bạn rửa mặt bình thường và rửa mi bằng bọt rửa mi không dầu.",
    },
    {
      q: "Nối mi có được đi sauna không?",
      a: "Không trong 24 giờ đầu, vì hơi nóng và hơi nước làm keo chưa kịp ổn định. Sau ngày đầu, bạn có thể đi sauna như bình thường, nhớ đừng dụi mắt.",
    },
    {
      q: "Sau khi uốn mi kiêng gì?",
      a: "Trong 24 giờ đầu, không làm ướt mi, không xông hơi hay đi sauna, không dụi mắt. Thuốc uốn cần thời gian ổn định; ướt sớm thì mi nhanh mất nếp.",
    },
    {
      q: "Lỡ dụi mắt khi đang nối mi thì sao?",
      a: "Dụi mắt làm mi nối xoắn, tuột và có thể kéo theo mi thật. Nếu thấy sợi bị xoắn hay chĩa ra, đừng kéo; chải nhẹ lại hoặc để thợ xử lý ở lần dặm.",
    },
    {
      q: "Bao lâu thì đi dặm mi, bao lâu thì uốn lại?",
      a: "Mi nối nên đi dặm sau hai đến ba tuần. Uốn mi làm lại sau sáu đến tám tuần, khi mi mới đã mọc ra.",
    },
    {
      q: "Nối mi nên ngủ thế nào?",
      a: "Nằm ngửa hoặc nghiêng nhẹ. Úp mặt xuống gối làm mi nối bị đè và gập, nên dễ rụng nhiều ở một bên.",
    },
  ],
  related: ["rua-mi-noi-tai-nha", "dam-mi-mong-dung-hen", "noi-mi-vs-uon-mi", "mi-dam-thao-hieu-dung"],
};

export default article;
