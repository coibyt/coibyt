import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/toc-tu-van-chia-vung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-chia-vung-toc-khi-cat",
  lesson: "toc-tu-van-chia-vung",
  category: "hair",
  title: "Cách chia vùng tóc khi cắt: 12 bước từ tư vấn, gội đến bảy vùng tóc gọn gàng",
  metaTitle: "Cách chia vùng tóc khi cắt: 12 bước, bảy vùng chuẩn",
  metaDescription:
    "Hướng dẫn từng bước trước khi cắt tóc: quấn giấy cổ, tư vấn bằng điểm chạm, kiểm tra da đầu, gội và xả, gỡ rối từ ngọn, rẽ ngôi, chia bảy vùng và giữ tóc ẩm.",
  keyword: "cách chia vùng tóc",
  keywords: [
    "chia 7 vùng tóc",
    "cách chia vùng tóc khi cắt",
    "cách gội đầu cho khách ở salon",
    "cách rẽ ngôi tóc thẳng",
    "gỡ rối tóc ướt đúng cách",
    "các bước chuẩn bị trước khi cắt tóc",
    "giấy quấn cổ khi cắt tóc",
  ],
  excerpt: "Từ lúc khách ngồi xuống ghế đến khi mái tóc đã gội sạch và chia thành bảy vùng, sẵn sàng để cắt. Mười hai bước, kèm cách kẻ từng đường ngôi.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-toc-keo-toc-ra-sau-xem-dang-mat-khach"),
    alt: "Thợ tóc nữ tóc bob nâu đứng sau khách, dùng tay gom mái tóc vàng dài của khách ra sau để nhìn rõ khuôn mặt và đường chân tóc trước gương",
  },
  takeaways: [
    "Quấn **dải giấy cổ dùng một lần** rồi mới cài áo choàng, để áo choàng không chạm trực tiếp vào da cổ khách.",
    "Tư vấn và kiểm tra tóc, da đầu **khi tóc còn khô**; thống nhất độ dài bằng một điểm chạm và nói lại cho khách nghe.",
    "Thử nước trên cổ tay mình trước, massage bằng đầu ngón tay, và một tay che dọc chân tóc khi xả.",
    "Gỡ rối tóc ướt **từ ngọn lên dần**, tay kia giữ tóc phía trên để da đầu khách không bị kéo.",
    "Bảy vùng: **một vùng đỉnh, hai vùng bên, hai vùng chẩm, hai vùng gáy**. Đường ngôi lệch thì đường cắt sau đó cũng lệch theo.",
  ],
  intro: [
    "Cách chia vùng tóc phổ biến nhất khi cắt là bảy vùng: một vùng đỉnh, hai vùng bên, hai vùng chẩm và hai vùng gáy. Chia thì không khó, nhưng muốn các đường ngôi thẳng và sạch, mái tóc phải được chuẩn bị đúng từ trước đó: tư vấn xong, gội sạch, thấm khô vừa đủ và gỡ rối cho mượt.",
    "Bài viết này viết lại bài học “Tư vấn, gội và chia vùng tóc: thực hành từng bước” trong khóa Nghề Tóc của VaraaAi Academy. Bạn đi cùng người thợ từ lúc khách ngồi xuống ghế cho tới khi mái tóc đã chia thành bảy vùng gọn gàng, sẵn sàng để cắt. Xem video bên dưới để thấy tay cầm lược, rồi đọc lại từng bước.",
  ],
  sections: [
    {
      id: "chia-vung-toc-de-lam-gi",
      title: "Chia vùng tóc để làm gì",
      blocks: [
        { p: "Người thợ chỉ cắt chính xác được phần tóc mình nhìn thấy và kiểm soát được. Khi tóc đã nằm trong từng vùng có mốc rõ trên đầu, lần nào bạn cũng tìm lại được đường cắt trước đó, và tóc của vùng chưa cắt không rơi lẫn vào vùng đang cắt." },
        { p: "Lý do của từng việc trong bài, từ câu hỏi tư vấn đến chuyện tóc xoăn co lên khi khô, đã có trong bài [tư vấn kiểu tóc cho khách](lesson:toc-tu-van-chia-vung-hieu-dung). Bài này chỉ làm." },
        { note: "Da đầu có vết thương, viêm hay có chấy thì không làm dịch vụ. Thời gian để dầu xả theo hướng dẫn của sản phẩm. Quy định vệ sinh khác nhau theo từng nước, và bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "info", title: "Lưu ý" },
      ],
    },
    {
      id: "bay-vung-toc",
      title: "Bảy vùng tóc gồm những vùng nào",
      blocks: [
        {
          table: {
            head: ["Vùng", "Số vùng", "Đường kẻ"],
            rows: [
              ["Vùng đỉnh", "1", "Hai đường thẳng từ hai bên thái dương ra sau, tới đỉnh đầu"],
              ["Vùng bên", "2", "Một đường từ đỉnh vành tai lên tới vùng đỉnh; tóc phía trước đường ấy là vùng bên"],
              ["Vùng chẩm", "2", "Phía sau chia đôi bằng ngôi giữa; phần phía trên đường ngang ở xương chẩm"],
              ["Vùng gáy", "2", "Phần phía dưới đường ngang ở xương chẩm"],
            ],
          },
        },
        { p: "Xương chẩm là phần hơi nhô ra ở phía sau đầu. Đường ngang đi qua đó, từ sau tai bên này sang sau tai bên kia. Chia theo dáng đầu như vậy thì vùng nào cũng có mốc rõ." },
        { img: { src: img("chia-bay-vung-toc-nhin-tu-phia-sau"), alt: "Nhìn từ phía sau khách đang ngồi: mái tóc vàng ẩm được chia bằng các đường ngôi thẳng, từng vùng giữ bằng kẹp bạc, thợ tóc cầm lược đứng bên", caption: "Phía sau đầu sau khi chia: ngôi giữa chạy dọc, đường ngang ở xương chẩm tách vùng chẩm và vùng gáy." } },
        { note: "Kẻ ngôi bằng một đường liền của đầu nhọn lược đuôi chuột, đừng ngoáy nhiều lần. Đường ngôi sạch thì nhìn là thấy ngay chỗ nào lệch.", kind: "tip", title: "Một đường liền" },
      ],
    },
    {
      id: "goi-dau-cho-khach",
      title: "Gội đầu cho khách ở salon: những chỗ dễ làm ẩu",
      blocks: [
        {
          table: {
            head: ["Việc", "Làm đúng", "Vì sao"],
            rows: [
              ["Đặt cổ khách", "Khăn quanh cổ, cổ đặt êm trong lòng chậu, hỏi khách có bị cấn không", "Khách có vấn đề ở cổ hay lưng cần được chỉnh ghế trước"],
              ["Thử nước", "Trên cổ tay mình trước, rồi hỏi lại khi nước chạm tóc khách", "Nhiệt độ vòi có thể thay đổi bất ngờ, mỗi người cảm nhận một khác"],
              ["Massage", "Bằng đầu ngón tay, theo những vòng nhỏ", "Móng tay làm đau và xước da đầu"],
              ["Xả", "Một tay cầm vòi, một tay che dọc chân tóc", "Nước không chảy vào mặt và tai"],
              ["Dầu xả", "Lên phần thân và ngọn tóc, đợi theo hướng dẫn của sản phẩm", "Mỗi sản phẩm có thời gian riêng"],
            ],
          },
        },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Lỗi thường gặp khi gỡ rối và chia vùng tóc",
      blocks: [
        {
          table: {
            head: ["Lỗi", "Hậu quả", "Cách sửa"],
            rows: [
              ["Chà, vò tóc bằng khăn", "Tóc rối thêm", "Bọc tóc trong khăn, ép nhẹ từ chân xuống ngọn"],
              ["Chải tóc ướt từ chân tóc xuống", "Nút rối bị dồn xuống, tóc dễ gãy, khách bị kéo da đầu", "Gỡ từ ngọn rồi lên dần, tay giữ tóc phía trên"],
              ["Ngoáy đầu lược nhiều lần khi kẻ ngôi", "Đường ngôi răng cưa, khó thấy chỗ lệch", "Kéo một đường liền"],
              ["Kẹp tóc vồng, không sát đầu", "Tóc kéo da đầu và đè lên vùng sắp cắt", "Xoắn vừa tay rồi kẹp phẳng sát đầu"],
              ["Vài sợi lọt sang vùng bên cạnh", "Lẫn vào đường cắt của vùng khác", "Dùng đuôi lược nhặt lại cho đúng vùng"],
              ["Để tóc chỗ khô chỗ ướt", "Sợi tóc co giãn khác nhau, đường cắt không đều", "Xịt phun sương đều trên vùng sắp cắt"],
            ],
          },
        },
      ],
    },
    {
      id: "ve-sinh-va-khi-nao-dung",
      title: "Vệ sinh dụng cụ và lúc phải dừng lại",
      blocks: [
        { p: "Áo choàng dùng cho nhiều khách, nên nó không được chạm trực tiếp vào da cổ. Dải giấy cổ dùng một lần là hàng rào vệ sinh giữa các khách, và nó còn giữ tóc vụn không lọt vào cổ áo. Lược, kéo, kẹp phải là đồ đã được làm sạch và khử khuẩn sau khách trước, như trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu). Tay được rửa trước khi chạm vào khách, theo bài [rửa tay và găng tay](lesson:rua-tay-gang-tay)." },
        { p: "Ở bước kiểm tra, nếu da đầu có vết thương, đang viêm hoặc có chấy thì dừng lại và nói riêng với khách. Cách nói và cách từ chối có trong bài [Khi nào không nên làm](lesson:khi-nao-khong-lam)." },
        { p: "Khách về rồi: khăn đã dùng cho vào giỏ giặt, dải giấy cổ bỏ đi, lược, kéo và kẹp được làm sạch và khử khuẩn." },
      ],
    },
    {
      id: "sau-khi-chia-vung",
      title: "Sau khi chia vùng: cắt, và ghi lại cho lần sau",
      blocks: [
        { p: "Mái tóc đã sẵn sàng. Từ đây bạn thả từng vùng xuống theo thứ tự của kiểu cắt, ví dụ trong bài [cắt tóc tầng](lesson:cat-nu-tang)." },
        { p: "Trong VaraaAi, ghi điều đã thống nhất với khách vào ghi chú trong [hồ sơ khách hàng](lesson:khach-hang), để lần sau ai làm cũng biết khách thích gì. Khi tạo [dịch vụ](lesson:dich-vu) cắt tóc, đặt thời lượng có tính cả phần gội và chia vùng, để các [lịch hẹn](lesson:lich-hen) trong ngày không bị dồn." },
      ],
    },
  ],
  howTo: {
    title: "Các bước tư vấn, gội và chia vùng tóc trước khi cắt",
    id: "cac-buoc-chia-vung-toc",
    after: "chia-vung-toc-de-lam-gi",
    lead: "Mười hai bước theo thứ tự trong video bài học. Ba bước đầu làm khi tóc còn khô.",
    supplies: [
      "Dải giấy cổ dùng một lần và áo choàng",
      "Khăn sạch",
      "Dầu gội và dầu xả",
      "Lược răng thưa để gỡ rối",
      "Lược đuôi chuột để kẻ ngôi",
      "Kẹp chia vùng",
      "Bình xịt phun sương",
    ],
    steps: [
      {
        name: "Rửa tay, quấn giấy cổ và cài áo choàng",
        text: "Rửa tay sạch trước khi chạm vào khách, và chỉ dùng lược, kéo, kẹp đã được làm sạch, khử khuẩn. Quấn một dải giấy cổ dùng một lần quanh cổ khách rồi mới cài áo choàng lên trên, để áo choàng không chạm trực tiếp vào da cổ.",
        image: { src: img("quan-giay-co-dung-mot-lan-truoc-khi-cai-ao-choang"), alt: "Thợ tóc quấn một dải giấy cổ màu trắng quanh cổ khách rồi cài áo choàng đen lên trên, tóc khách được vén gọn sang một bên" },
      },
      {
        name: "Tư vấn khi tóc còn khô",
        text: "Hỏi khách thích gì, không thích gì ở mái tóc bây giờ, xin xem ảnh mẫu, hỏi khách sấy hay để tự khô, có hay buộc tóc không. Cầm lọn tóc đặt đúng điểm chạm và nói lại: mình cắt đến ngang vai, đúng không chị. Tóc xoăn hay gợn sóng thì nói trước rằng khô rồi tóc sẽ co lên, nên bạn để dài hơn một chút. Ghi điều đã thống nhất vào hồ sơ khách.",
        image: { src: img("tu-van-kieu-toc-voi-anh-mau-tren-may-tinh-bang"), alt: "Thợ tóc ngồi cạnh khách, cầm máy tính bảng hiện ảnh mẫu một kiểu tóc dài, khách chỉ tay vào ảnh, cả hai mỉm cười" },
      },
      {
        name: "Kiểm tra tóc và da đầu",
        text: "Kéo tóc ra sau, nhìn dáng mặt và đường chân tóc. Rẽ vài đường ngôi để xem mật độ, chất tóc và da đầu. Chải tóc theo vài hướng, tìm xoáy ở đỉnh đầu và ở gáy. Da đầu có vết thương, viêm hay có chấy thì dừng lại và nói riêng với khách.",
      },
      {
        name: "Đưa khách ra chậu gội và thử nước",
        text: "Quàng khăn quanh cổ, đỡ cổ khách đặt êm vào lòng chậu và hỏi khách có bị cấn không. Mở nước, thử trên cổ tay của mình. Rồi cho nước chạm vào tóc khách và hỏi lại nước như vậy được chưa.",
        image: { src: img("thu-nhiet-do-nuoc-tren-co-tay-truoc-khi-goi"), alt: "Thợ tóc đứng ở chậu gội sứ đen, để dòng nước từ vòi chảy qua cổ tay mình, khách ngả đầu vào chậu với khăn quanh cổ" },
      },
      {
        name: "Gội, xả và dùng dầu xả",
        text: "Làm ướt đều từ chân tóc tới ngọn, lấy một lượng dầu gội vừa đủ. Massage da đầu bằng đầu ngón tay theo những vòng nhỏ, từ chân tóc trán ra sau gáy, không dùng móng tay. Xả thật sạch, một tay che dọc chân tóc. Thoa dầu xả lên phần thân và ngọn tóc, đợi theo hướng dẫn của sản phẩm rồi xả lại thật sạch.",
        image: { src: img("xa-toc-mot-tay-che-chan-toc-cho-khach"), alt: "Thợ tóc xả tóc cho khách ở chậu gội bằng vòi sen cầm tay, bàn tay kia che dọc chân tóc để nước không chảy vào mặt và tai" },
      },
      {
        name: "Thấm khô bằng khăn",
        text: "Đưa khách về ghế. Bọc tóc trong khăn và ép nhẹ từ chân tóc xuống ngọn, không chà, không vò. Tóc chỉ cần ẩm, không còn nhỏ giọt.",
      },
      {
        name: "Gỡ rối từ ngọn",
        text: "Dùng lược răng thưa. Một tay giữ tóc phía trên, lược bắt đầu từ ngọn. Gỡ xong phần ngọn mới lên dần cho tới chân tóc. Bàn tay giữ tóc giúp da đầu khách không bị kéo.",
        image: { src: img("go-roi-toc-uot-tu-ngon-bang-luoc-rang-thua"), alt: "Nhìn từ phía sau, một tay thợ giữ chặt mái tóc vàng ẩm của khách ở giữa thân tóc, tay kia chải phần ngọn bằng lược răng thưa" },
      },
      {
        name: "Rẽ ngôi",
        text: "Tìm đường ngôi tự nhiên của khách, hoặc ngôi giữa, tuỳ kiểu cắt. Đặt đầu nhọn của lược đuôi chuột ở chân tóc trán rồi kéo thẳng ra sau tới đỉnh đầu, một đường liền. Đường ngôi đạt là đường thẳng, sạch, thấy rõ một đường da đầu.",
        image: { src: img("re-ngoi-thang-bang-luoc-duoi-chuot"), alt: "Nhìn từ trên xuống, thợ tóc dùng đầu nhọn của lược đuôi chuột kẻ một đường ngôi giữa thẳng trên mái tóc vàng ẩm của khách" },
      },
      {
        name: "Tách vùng đỉnh và hai vùng bên",
        text: "Từ hai bên thái dương, kẻ hai đường thẳng ra sau tới đỉnh đầu; xoắn phần tóc ấy lên và kẹp phẳng, đó là vùng đỉnh. Tiếp theo kẻ một đường từ đỉnh vành tai lên tới vùng đỉnh: tóc phía trước đường ấy là vùng bên. Xoắn, kẹp, rồi làm y như vậy ở bên kia.",
        image: { src: img("xoan-va-kep-vung-dinh-khi-chia-vung-toc"), alt: "Thợ tóc xoắn phần tóc vùng đỉnh của khách thành một búi nhỏ và giữ bằng kẹp bạc, phần tóc còn lại thả mượt xuống" },
      },
      {
        name: "Chia phía sau thành vùng chẩm và vùng gáy",
        text: "Kẻ một đường ngôi thẳng ở giữa, từ đỉnh đầu xuống tới gáy, chia phía sau làm hai nửa. Rồi kẻ một đường ngang từ sau tai bên này sang sau tai bên kia, ở chỗ xương chẩm. Phía trên đường ngang là hai vùng chẩm, phía dưới là hai vùng gáy. Xoắn và kẹp từng vùng.",
      },
      {
        name: "Kiểm tra các đường ngôi",
        text: "Nhìn lại một lượt, cả trong gương lẫn từ phía sau: đường ngôi có thẳng không, hai bên có cân không, có sợi nào lọt vùng không. Chỗ nào lệch thì chải lại, kẻ lại. Đường ngôi lệch thì đường cắt sau đó cũng lệch theo.",
      },
      {
        name: "Giữ tóc ẩm đều",
        text: "Tóc khô dần trong lúc làm. Xịt phun sương nhẹ, đều tay trên vùng bạn sắp cắt. Ẩm là đủ, đừng để nhỏ giọt.",
        image: { src: img("xit-suong-giu-toc-am-deu-truoc-khi-cat"), alt: "Nhìn từ phía sau, thợ tóc cầm bình xịt phun một lớp sương mịn lên mái tóc vàng đã chia vùng và kẹp gọn của khách" },
      },
    ],
  },
  faq: [
    {
      q: "Chia 7 vùng tóc là chia những vùng nào?",
      a: "Một vùng đỉnh, hai vùng bên phía trên tai, hai vùng chẩm và hai vùng gáy. Phía sau đầu được chia đôi bằng một đường ngôi giữa, rồi một đường ngang ở xương chẩm tách hai vùng chẩm ở trên khỏi hai vùng gáy ở dưới.",
    },
    {
      q: "Chia vùng tóc khi tóc ướt hay tóc khô?",
      a: "Trong bài học, tóc được gội, thấm khăn đến mức ẩm không còn nhỏ giọt, gỡ rối, rồi mới rẽ ngôi và chia vùng. Trong lúc làm, tóc được giữ ẩm đều bằng bình xịt phun sương, vì chỗ khô chỗ ướt làm đường cắt không đều.",
    },
    {
      q: "Gỡ rối tóc ướt bắt đầu từ đâu?",
      a: "Từ ngọn, rồi lên dần tới chân tóc, bằng lược răng thưa, một tay giữ tóc phía trên. Gỡ từ ngọn thì nút rối không bị dồn xuống, tóc ít gãy và khách không bị kéo da đầu.",
    },
    {
      q: "Làm sao kẻ đường ngôi thẳng?",
      a: "Dùng đầu nhọn của lược đuôi chuột, đặt ở chân tóc trán và kéo một đường liền ra sau tới đỉnh đầu, không ngoáy nhiều lần. Đường ngôi đúng là đường thẳng, sạch, nhìn thấy rõ một đường da đầu.",
    },
    {
      q: "Vì sao phải quấn giấy cổ trước khi cài áo choàng cắt tóc?",
      a: "Áo choàng dùng cho nhiều khách. Dải giấy cổ dùng một lần ngăn áo choàng chạm trực tiếp vào da cổ, là hàng rào vệ sinh giữa các khách, và giữ tóc vụn không lọt vào cổ áo.",
    },
    {
      q: "Thử nhiệt độ nước gội đầu cho khách thế nào?",
      a: "Thử trên cổ tay của mình trước, rồi cho nước chạm vào tóc khách và hỏi khách nước như vậy được chưa. Nhiệt độ vòi có thể thay đổi bất ngờ, và mỗi người cảm nhận nóng lạnh một khác.",
    },
  ],
  related: ["toc-tu-van-chia-vung-hieu-dung", "cat-nu-bang", "cat-nu-tang", "cat-nam-co-ban"],
};

export default article;
