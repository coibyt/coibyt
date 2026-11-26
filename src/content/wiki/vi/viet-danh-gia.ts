import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/viet-danh-gia/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-viet-danh-gia-salon",
  lesson: "viet-danh-gia",
  category: "booking",
  title: "Cách viết đánh giá salon sau khi làm đẹp: chấm sao và chia sẻ trải nghiệm trên VaraaAi",
  metaTitle: "Cách viết đánh giá salon sau khi làm đẹp trên VaraaAi",
  metaDescription:
    "Hướng dẫn cách viết đánh giá salon trên VaraaAi: mở từ email mời hoặc Lịch hẹn của tôi, chấm từ 1 đến 5 sao, viết vài câu và gửi. Nên viết gì để có ích.",
  keyword: "cách viết đánh giá salon",
  keywords: [
    "viết đánh giá tiệm nail",
    "đánh giá salon tóc",
    "chấm sao cho salon",
    "viết review spa",
    "đánh giá sau khi làm đẹp",
    "đánh giá trên VaraaAi có thật không",
  ],
  excerpt: "Chấm sao và viết vài câu về buổi làm đẹp từ email mời đánh giá hoặc từ “Lịch hẹn của tôi”. Mất khoảng nửa phút.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-noi-mi-lam-cho-khach-truoc-khi-khach-viet-danh-gia"),
    alt: "Nữ kỹ thuật viên mặc đồng phục kem đang nối mi cho khách nằm trên giường trong salon sang trọng có đèn vòng",
  },
  takeaways: [
    "Có hai lối vào: nút “Đánh giá dịch vụ” trong **email mời đánh giá**, hoặc nút “Đánh giá” trên lịch đã “Hoàn thành” trong “Lịch hẹn của tôi”.",
    "Ở dòng “Chất lượng dịch vụ”, bạn chọn **từ 1 đến 5 sao**, viết vài câu rồi bấm “Gửi đánh giá”.",
    "Cả việc mất khoảng **nửa phút**.",
    "Chỉ khách **đã đặt lịch** ở salon mới viết được đánh giá cho salon đó.",
    "Đánh giá hiện trên trang salon sau khi salon xem và đăng.",
  ],
  intro: [
    "Biết cách viết đánh giá salon cho gọn và có ích là việc nhỏ, nhưng nó giúp được hai phía: salon biết mình làm tốt chỗ nào, cần sửa chỗ nào, còn những khách đến sau có thêm căn cứ để chọn đúng nơi. Trên VaraaAi, việc này mất khoảng nửa phút sau mỗi lần hẹn.",
    "Bài viết đi theo bài học “Viết đánh giá sau khi làm đẹp” trong VaraaAi Academy. Bạn sẽ biết mở ô đánh giá từ đâu, chấm sao và gửi thế nào, nên viết những gì, và khi nào đánh giá của bạn xuất hiện trên trang của salon.",
  ],
  sections: [
    {
      id: "vi-sao-nen-danh-gia",
      title: "Vì sao nên viết đánh giá sau khi làm đẹp",
      blocks: [
        { p: "Người thợ hiếm khi nghe được nhận xét thật. Khách hài lòng thường chỉ nói cảm ơn rồi về, khách chưa hài lòng thì lặng lẽ không quay lại. Vài dòng đánh giá là cách đơn giản nhất để salon biết điều gì đang làm tốt và điều gì cần chỉnh." },
        { p: "Với người đang tìm tiệm, đánh giá là thứ họ đọc đầu tiên. Trang kết quả tìm kiếm của VaraaAi hiện điểm đánh giá của từng salon, và trang của mỗi salon có mục “Đánh giá” riêng. Nhận xét của bạn hôm nay là thứ giúp một người khác quyết định vào tuần sau." },
        { note: "Trên VaraaAi, chỉ khách đã đặt lịch ở salon mới viết được đánh giá cho salon đó. Người chưa từng đặt lịch thì không viết được. Vì vậy các đánh giá bạn đọc trên trang salon đều đến từ khách thật.", kind: "info", title: "Ai được viết đánh giá" },
      ],
    },
    {
      id: "nen-viet-gi",
      title: "Nên viết gì trong đánh giá salon",
      blocks: [
        { p: "Ô viết chỉ cần vài câu. Trong video bài học, khách viết rằng tiệm làm rất kỹ và đẹp, nhân viên dễ thương, và sẽ quay lại. Một đánh giá ngắn như vậy đã đủ dùng. Nếu muốn nhận xét của mình có ích hơn cho người đọc, hãy thêm một hai chi tiết cụ thể." },
        {
          table: {
            head: ["Nên nhắc đến", "Vì sao có ích"],
            rows: [
              ["Dịch vụ bạn đã làm", "Người đọc biết nhận xét này nói về sơn gel, nối mi hay cắt tóc"],
              ["Tay nghề và độ kỹ", "Đây là điều khách mới quan tâm nhất và khó thấy qua ảnh"],
              ["Thái độ và cách tư vấn", "Cho biết tiệm có lắng nghe và giải thích rõ hay không"],
              ["Đúng giờ hẹn hay phải chờ", "Giúp người bận rộn sắp xếp thời gian"],
              ["Điều chưa ưng, nói cụ thể", "Salon biết chính xác cần sửa gì, người đọc thấy nhận xét công bằng"],
            ],
          },
        },
        { note: "Số sao nên đi cùng nội dung. Chấm năm sao mà phần chữ toàn lời phàn nàn, hoặc chấm một sao mà không giải thích, đều khiến người đọc khó tin. Hãy chấm theo cảm nhận thật về chất lượng dịch vụ, rồi dùng vài câu chữ để nói vì sao.", kind: "tip", title: "Sao và chữ phải khớp nhau" },
        { p: "Khi có điều chưa hài lòng, bạn vẫn nên viết, bằng giọng bình tĩnh và nêu sự việc. Với những việc salon có thể sửa ngay, chẳng hạn một móng bị bong sớm, bạn cũng có thể [nhắn tin cho salon](lesson:chat-voi-salon) trước để tiệm có cơ hội xử lý." },
      ],
    },
    {
      id: "sau-khi-gui",
      title: "Sau khi gửi: khi nào đánh giá hiện trên trang salon",
      blocks: [
        { p: "Đánh giá không lên trang ngay lúc bạn bấm gửi. Salon xem trước, rồi đăng đánh giá lên trang của họ. Sau khi được đăng, điểm số và số lượt đánh giá nằm ngay dưới tên salon, nơi mọi khách ghé trang đều nhìn thấy." },
        { img: { src: img("diem-danh-gia-hien-tren-trang-salon"), alt: "Trang salon Lumi Beauty Paris trên VaraaAi, ô điểm 5.0 với một đánh giá được khoanh vàng ngay dưới tên salon", caption: "Điểm đánh giá nằm ngay dưới tên salon." } },
        { p: "Nếu chưa thấy nhận xét của mình trên trang, nghĩa là đánh giá còn đang chờ salon xem và đăng. Bạn không cần gửi lại." },
      ],
    },
    {
      id: "tinh-huong-hay-gap",
      title: "Tình huống hay gặp khi viết đánh giá",
      blocks: [
        {
          table: {
            head: ["Tình huống", "Cách xử lý"],
            rows: [
              ["Không thấy email mời đánh giá", "Không cần chờ email. Đăng nhập, mở “Lịch hẹn của tôi”, tìm lịch đã “Hoàn thành” và bấm “Đánh giá”"],
              ["Lịch hẹn chưa mang nhãn “Hoàn thành”", "Bài học hướng dẫn đánh giá trên lịch đã hoàn thành, tức là sau khi bạn đã làm xong dịch vụ"],
              ["Muốn đánh giá một tiệm chưa từng đặt lịch qua VaraaAi", "Không được. Chỉ khách đã đặt lịch ở salon đó mới viết được đánh giá"],
              ["Không biết viết gì", "Chấm sao trước, rồi viết hai câu: bạn làm dịch vụ gì và điều bạn nhớ nhất về buổi làm"],
              ["Gửi rồi nhưng chưa thấy trên trang salon", "Đánh giá hiện sau khi salon xem và đăng"],
            ],
          },
        },
      ],
    },
    {
      id: "doc-danh-gia-khi-chon-salon",
      title: "Dùng đánh giá của người khác khi chọn salon",
      blocks: [
        { p: "Bạn cũng là người hưởng lợi từ những đánh giá người khác để lại. Khi [tìm salon](/search), hãy nhìn điểm đánh giá trong kết quả, rồi mở trang salon và đọc mục “Đánh giá” trước khi [đặt lịch làm đẹp online](lesson:dat-lich-online). Một tiệm có nhiều nhận xét cụ thể về đúng dịch vụ bạn định làm là dấu hiệu tốt hơn một con số điểm đứng riêng." },
        { p: "Sau buổi hẹn, mọi thứ quay về [Lịch hẹn của tôi](lesson:lich-hen-cua-toi): bạn xem lại lịch cũ và bấm “Đánh giá” ngay tại đó." },
        { note: "Phía salon xem đánh giá, đăng lên trang và trả lời khách trong trang quản trị. Xem bài [Đánh giá và Google](lesson:danh-gia-google).", kind: "info", title: "Bạn là chủ salon?" },
      ],
    },
  ],
  howTo: {
    title: "Các bước viết đánh giá salon trên VaraaAi",
    id: "cac-buoc-viet-danh-gia",
    after: "vi-sao-nen-danh-gia",
    lead: "Năm bước ngắn, làm được trên điện thoại ngay khi vừa rời tiệm.",
    steps: [
      {
        name: "Mở ô đánh giá từ email hoặc từ “Lịch hẹn của tôi”",
        text: "Sau mỗi lần hẹn, VaraaAi gửi cho bạn một email mời đánh giá. Bấm nút “Đánh giá dịch vụ” trong email. Cách thứ hai: đăng nhập, bấm vào tên bạn ở góc trên, chọn “Lịch hẹn của tôi”, tìm lịch hẹn đã “Hoàn thành” rồi bấm “Đánh giá”.",
        image: { src: img("bam-danh-gia-tren-lich-hen-da-hoan-thanh"), alt: "Danh sách Lịch hẹn của tôi với hai lịch mang nhãn Hoàn thành, lịch phía dưới có nút Đánh giá ở bên phải" },
      },
      {
        name: "Chọn số sao ở “Chất lượng dịch vụ”",
        text: "Một ô nhỏ có tên “Đánh giá trải nghiệm của bạn” hiện ra. Ở dòng “Chất lượng dịch vụ”, bấm vào ngôi sao ứng với mức bạn muốn chấm, từ 1 đến 5.",
        image: { src: img("cham-sao-chat-luong-dich-vu"), alt: "Ô Đánh giá trải nghiệm của bạn với hàng năm ngôi sao ở dòng Chất lượng dịch vụ được khoanh vàng" },
      },
      {
        name: "Viết vài câu chia sẻ",
        text: "Bấm vào ô “Chia sẻ trải nghiệm của bạn...” bên dưới hàng sao và viết vài câu về buổi làm: bạn làm gì, điều gì khiến bạn hài lòng hoặc chưa hài lòng. Không cần dài, cụ thể là đủ.",
        image: { src: img("viet-chia-se-trai-nghiem-lam-dep"), alt: "Ô đánh giá trên VaraaAi, phần viết chia sẻ trải nghiệm được khoanh vàng với hai câu nhận xét của khách" },
      },
      {
        name: "Bấm “Gửi đánh giá”",
        text: "Đọc lại một lượt số sao và phần chữ, rồi bấm nút “Gửi đánh giá” ở cuối ô.",
        image: { src: img("bam-gui-danh-gia-salon"), alt: "Ô đánh giá đã chấm năm sao và viết nhận xét, nút Gửi đánh giá màu đen ở phía dưới được khoanh vàng" },
      },
      {
        name: "Kiểm tra thông báo cảm ơn",
        text: "Màn hình báo “Cảm ơn bạn đã đánh giá” kèm số sao bạn vừa chấm. Bấm “OK” để đóng. Từ đây, salon sẽ xem và đăng đánh giá của bạn lên trang của họ.",
        image: { src: img("thong-bao-cam-on-ban-da-danh-gia"), alt: "Thông báo Cảm ơn bạn đã đánh giá với năm ngôi sao và nút OK hiện trên danh sách lịch hẹn" },
      },
    ],
  },
  faq: [
    {
      q: "Ai được viết đánh giá cho một salon trên VaraaAi?",
      a: "Chỉ khách đã đặt lịch ở salon đó. Người chưa từng đặt lịch không viết được, nhờ vậy đánh giá trên VaraaAi đến từ khách thật.",
    },
    {
      q: "Viết đánh giá salon ở đâu?",
      a: "Có hai cách. Bấm nút “Đánh giá dịch vụ” trong email mời đánh giá mà VaraaAi gửi sau lần hẹn, hoặc mở “Lịch hẹn của tôi”, tìm lịch đã “Hoàn thành” và bấm “Đánh giá”.",
    },
    {
      q: "Viết đánh giá mất bao lâu?",
      a: "Khoảng nửa phút. Bạn chọn số sao từ 1 đến 5 ở dòng “Chất lượng dịch vụ”, viết vài câu chia sẻ rồi bấm “Gửi đánh giá”.",
    },
    {
      q: "Gửi xong, đánh giá có hiện ngay trên trang salon không?",
      a: "Chưa hiện ngay. Salon xem đánh giá trước rồi đăng lên trang của họ. Sau khi được đăng, điểm và số lượt đánh giá hiện dưới tên salon.",
    },
    {
      q: "Không nhận được email mời đánh giá thì làm sao?",
      a: "Bạn vẫn đánh giá được mà không cần email. Đăng nhập, bấm vào tên bạn ở góc trên, mở “Lịch hẹn của tôi”, tìm lịch hẹn đã “Hoàn thành” và bấm “Đánh giá”.",
    },
    {
      q: "Đánh giá trên VaraaAi có đáng tin không?",
      a: "Mỗi đánh giá gắn với một khách đã đặt lịch ở salon, vì người chưa đặt lịch không viết được. Đây là điểm khác với những nơi ai cũng có thể để lại nhận xét.",
    },
  ],
  related: ["lich-hen-cua-toi", "chat-voi-salon", "dat-lich-online", "the-thanh-vien"],
};

export default article;
