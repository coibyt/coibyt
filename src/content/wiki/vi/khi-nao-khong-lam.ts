import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/khi-nao-khong-lam/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "khi-nao-khong-nen-lam-nail-noi-mi-wax",
  lesson: "khi-nao-khong-lam",
  category: "safety",
  title: "Khi nào không nên làm nail, nối mi, wax cho khách: dấu hiệu phải dừng và cách từ chối",
  metaTitle: "Khi nào không nên làm nail, nối mi, wax cho khách",
  metaDescription:
    "Khi nào không nên làm nail, nối mi, làm tóc hay wax cho khách: dấu hiệu ở móng, mắt, da đầu và da cần dừng lại, câu hỏi trước dịch vụ và cách từ chối khéo.",
  keyword: "khi nào không nên làm nail",
  keywords: [
    "móng bị nấm có sơn gel được không",
    "đau mắt đỏ có nối mi được không",
    "uống isotretinoin có wax được không",
    "người tiểu đường làm móng chân",
    "cách từ chối khách khéo léo",
    "chống chỉ định nối mi",
    "tóc có chấy có đi cắt tóc được không",
  ],
  excerpt: "Biết lúc nào không làm cũng là tay nghề. Những dấu hiệu ở móng, mắt, da đầu và da có nghĩa là nên đi khám trước, và cách nói để khách không mất mặt.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-lam-dep-xem-tay-khach-truoc-khi-lam"),
    alt: "Nữ thợ làm đẹp mặc áo kem ngồi ở bàn tư vấn, nâng hai bàn tay của khách lên xem kỹ trước khi làm",
  },
  takeaways: [
    "Trước mỗi dịch vụ, làm hai việc: **nhìn** dưới ánh sáng tốt khi da và móng còn sạch, và **hỏi** vài câu ngắn về dị ứng, thuốc, bệnh tiểu đường, phẫu thuật hay nhiễm trùng gần đây.",
    "**Người thợ không chẩn đoán.** Tả điều mình thấy, khuyên khách hỏi bác sĩ hoặc dược sĩ, và dừng ở đó.",
    "Móng đổi màu, dày, vụn, tách khỏi nền móng; da sưng đỏ, có mủ; mắt đỏ, có ghèn; da đầu có vết loét hay chí; da cháy nắng, trầy xước: không làm trên vùng đó.",
    "Khách đang uống isotretinoin, hoặc mới ngừng trong khoảng sáu tháng, thì không wax.",
    "Khi phân vân có nên làm hay không, câu trả lời là **không làm**.",
  ],
  intro: [
    "Khi nào không nên làm nail, nối mi hay wax cho khách là câu hỏi ít trường nghề dạy kỹ, vì nó đi ngược với bản năng của người làm dịch vụ. Khách đã đến tận nơi, tiệm cũng cần có khách, và câu “hôm nay em chưa làm cho chị được” rất khó nói. Nhưng một lớp sơn màu đậm phủ lên chiếc móng ngả xanh không chữa được gì. Nó chỉ che đi cho đến khi mọi chuyện nặng hơn, rồi khách quay lại trách tiệm.",
    "Bài viết này đi theo bài học “Khi nào không làm cho khách” trong khóa Vệ sinh & an toàn của VaraaAi Academy. Bạn sẽ biết cần nhìn và hỏi gì trước mỗi dịch vụ, những dấu hiệu nào ở móng, mắt, da đầu và da có nghĩa là phải dừng, cách từ chối mà vẫn giữ thể diện cho khách, và khi nào chính người thợ nên nghỉ. Bài viết không thay cho ý kiến y tế.",
  ],
  sections: [
    {
      id: "nhin-va-hoi",
      title: "Nhìn và hỏi gì trước mỗi dịch vụ",
      blocks: [
        { p: "Việc kiểm tra diễn ra trước khi bạn chạm vào dụng cụ. Nhìn dưới ánh sáng tốt, khi da và móng còn sạch, chưa sơn, chưa thoa gì. Một lớp sơn cũ hay lớp kem nền che mất đúng những thứ bạn cần thấy." },
        { p: "Sau đó hỏi vài câu ngắn và ghi câu trả lời vào phiếu tư vấn:" },
        {
          ul: [
            "Chị có dị ứng với gì không?",
            "Chị có đang dùng thuốc, hay đang điều trị gì ở da, ở mắt không?",
            "Chị có bệnh tiểu đường không?",
            "Gần đây chị có phẫu thuật hay bị nhiễm trùng gì không?",
          ],
        },
        { img: { src: img("hoi-khach-va-ghi-phieu-tu-van"), alt: "Nữ thợ làm đẹp cầm bút ghi vào tấm phiếu nhỏ trên bàn đá trong lúc trò chuyện với khách nữ tóc vàng ngồi đối diện", caption: "Vài câu hỏi ngắn trước khi làm, ghi lại trên phiếu tư vấn." } },
        { note: "Khách quen cũng cần được hỏi lại. Sức khỏe thay đổi theo thời gian: người năm ngoái không dùng thuốc gì thì năm nay có thể đang điều trị.", kind: "tip", title: "Đừng bỏ qua khách quen" },
      ],
    },
    {
      id: "tho-khong-chan-doan",
      title: "Người thợ không chẩn đoán: tả điều mình thấy",
      blocks: [
        { p: "Thợ làm đẹp không phải là bác sĩ, và không gọi tên bệnh. Đừng bao giờ nói “chị bị nấm rồi”. Hãy nói điều mình nhìn thấy: “Em thấy móng này đổi màu và dày lên, em nghĩ chị nên để bác sĩ hoặc dược sĩ xem trước.”" },
        { p: "Lý do rất thực tế: nhìn bằng mắt thì không ai dám chắc. Một chiếc móng dày và ngả vàng có thể là nấm, có thể là bệnh vảy nến, cũng có thể chỉ do đi giày chật lâu ngày. Có thứ lây, có thứ không. Phân biệt chúng là việc của người có chuyên môn y tế. Việc của người thợ là nhận ra có điều không bình thường và dừng lại đúng lúc." },
        { p: "Nói sai tên bệnh còn làm khách tổn thương hoặc lo lắng vô cớ. Tả điều mình thấy thì luôn đúng, và khách khó phật lòng hơn." },
      ],
    },
    {
      id: "dau-hieu-o-mong",
      title: "Dấu hiệu ở móng tay, móng chân: khi nào không sơn gel, không làm móng",
      blocks: [
        { p: "Gặp một trong những dấu hiệu sau thì không làm trên móng đó hoặc vùng da đó:" },
        {
          ul: [
            "Móng ngả màu xanh, vàng hay nâu.",
            "Móng dày lên, giòn, vụn ra.",
            "Móng tách khỏi nền móng.",
            "Da quanh móng sưng, đỏ, đau, có mủ.",
            "Mụn cóc.",
            "Vết thương hở.",
          ],
        },
        { img: { src: img("mong-tay-nga-xanh-khong-nen-son-gel"), alt: "Cận cảnh một đầu ngón tay được bàn tay đeo găng đen đỡ bên dưới, móng tự nhiên có một vùng ngả màu xanh vàng", caption: "Móng đổi màu như thế này: không sơn che đi, và khuyên khách để bác sĩ hoặc dược sĩ xem." } },
        { img: { src: img("da-quanh-mong-sung-do"), alt: "Cận cảnh một đầu ngón tay đặt trên khăn kem, vùng da ở cạnh và chân móng sưng nhẹ, đỏ hồng và bóng hơn ngón bên cạnh" } },
        { p: "Những móng còn lại, nếu lành lặn, vẫn có thể làm được. Dụng cụ dùng hôm đó cần được xử lý thật kỹ, vì nếu làm qua loa thì chúng mang mầm bệnh sang người khách sau. Quy trình có trong bài [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu)." },
        { h3: "Bàn chân của khách có bệnh tiểu đường" },
        { p: "Đây là trường hợp cần thật cẩn thận. Bàn chân của người tiểu đường có thể giảm cảm giác, nên khách không thấy đau khi nước quá nóng hay khi bị xước, và vết xước rất lâu lành." },
        {
          ul: [
            "Nước chỉ ấm vừa, không ngâm lâu.",
            "Không dùng dao bào, không cắt da.",
            "Chân có vết loét hay vết thương thì không làm. Khuyên khách đến bác sĩ hoặc chuyên viên chăm sóc bàn chân.",
          ],
        },
        { img: { src: img("kiem-tra-ban-chan-truoc-khi-lam-mong-chan"), alt: "Nữ thợ spa đeo găng đen ngồi trên ghế thấp, nâng bàn chân trần của khách để xem lòng bàn chân trước khi làm", caption: "Xem kỹ lòng bàn chân và kẽ ngón trước khi cho chân vào bồn." } },
      ],
    },
    {
      id: "mat-da-dau-va-da",
      title: "Mắt, da đầu và da: khi nào dừng nối mi, làm tóc, wax",
      blocks: [
        { h3: "Mi và chân mày" },
        {
          ul: [
            "Mắt đỏ, ngứa, chảy nước hay có ghèn dính.",
            "Lẹo, hoặc bờ mi sưng đỏ, đóng vảy.",
            "Có những chấm nhỏ bám ở chân mi kèm ngứa nhiều.",
            "Khách vừa phẫu thuật mắt hay vừa bị nhiễm trùng mắt: chờ đến khi bác sĩ cho phép.",
            "Khách từng phản ứng với keo hay thuốc nhuộm mi: không làm lại bằng sản phẩm đó.",
          ],
        },
        { img: { src: img("mat-do-co-leo-khong-noi-mi"), alt: "Cận cảnh khuôn mặt một phụ nữ, một bên mắt đỏ, hơi chảy nước, mí trên sưng hồng với một nốt nhỏ ở bờ mi" } },
        { p: "Chuyện phản ứng với keo và thuốc nhuộm được giải thích kỹ trong bài [Dị ứng sơn gel, keo nối mi, thuốc nhuộm](lesson:di-ung-hoa-chat)." },
        { h3: "Tóc và da đầu" },
        {
          ul: [
            "Chí (miền Bắc gọi là chấy) và trứng của chúng bám trên sợi tóc.",
            "Vết loét, vết thương hở trên da đầu.",
            "Những mảng tròn, đỏ, bong vảy.",
            "Tóc rụng nhiều, từng mảng, mà không rõ vì sao.",
          ],
        },
        { p: "Gặp chí thì đừng hốt hoảng và đừng nói to. Dừng lại, nói riêng với khách, khuyên khách ra hiệu thuốc. Sau đó giặt khăn, xử lý lược, kéo và áo choàng thật kỹ." },
        { img: { src: img("kiem-tra-da-dau-truoc-khi-lam-toc"), alt: "Nữ thợ tóc mặc tạp dề đen, đeo găng, dùng đuôi lược rẽ tóc của khách đang ngồi quay lưng để xem da đầu", caption: "Rẽ tóc xem da đầu khi tóc còn khô, trước khi gội hay pha thuốc." } },
        { h3: "Da, spa và wax" },
        {
          ul: [
            "Da cháy nắng.",
            "Da trầy xước hay đang nhiễm trùng.",
            "Mụn rộp ở môi.",
            "Những mảng phát ban có thể lây.",
          ],
        },
        { p: "Với wax có một câu bắt buộc phải hỏi: khách có đang dùng thuốc trị mụn hay kem retinoid không. Thuốc uống trị mụn isotretinoin làm da mỏng và yếu đi, wax có thể làm tróc cả lớp da. Khách đang uống, hoặc mới ngừng trong khoảng sáu tháng, thì không wax; nếu phù hợp, bạn có thể gợi ý cách nhẹ hơn như nhíp. Với kem bôi, làm theo hướng dẫn của hãng wax và của bác sĩ kê thuốc." },
        { img: { src: img("hoi-ve-kem-retinoid-truoc-khi-wax"), alt: "Khách nữ mặc áo choàng kem ngồi ở mép giường spa, đưa một tuýp kem trắng cho nữ thợ xem trước khi wax" } },
      ],
    },
    {
      id: "cach-tu-choi",
      title: "Cách từ chối khách cho khéo mà vẫn giữ thể diện cho họ",
      blocks: [
        { p: "Phần khó nhất của bài này là lời nói. Khách sẽ nhớ rất lâu thái độ của bạn trong đúng nửa phút đó." },
        {
          table: {
            head: ["Nên", "Tránh"],
            rows: [
              ["Nói riêng, nói nhỏ, không để khách khác nghe thấy", "Giải thích to cho cả tiệm cùng nghe"],
              ["Nói về sự an toàn của khách", "Nói về nỗi sợ của mình"],
              ["Đưa ra một lối khác: làm những móng còn lại, đổi dịch vụ, hoặc hẹn lại khi bác sĩ nói là ổn", "Từ chối rồi để khách ra về tay trắng"],
              ["Giữ nét mặt và khoảng cách bình thường", "Tỏ vẻ ghê sợ, lùi lại, đeo thêm găng"],
            ],
          },
        },
        { img: { src: img("tu-choi-khach-noi-rieng-noi-nho"), alt: "Nữ thợ làm đẹp ngồi sát bên khách ở góc yên tĩnh của salon, nghiêng người nói nhỏ, một tay đặt nhẹ lên tay khách", caption: "Một góc riêng, giọng nhỏ, và một lời đề nghị hẹn lại." } },
        { note: "Một câu dùng được trong mọi trường hợp: “Em muốn chị đẹp mà vẫn an toàn, nên chỗ này em xin chưa làm hôm nay.”", kind: "tip", title: "Câu nói mẫu" },
        { p: "Sẽ có khách năn nỉ: “Không sao đâu, em cứ làm đi, chị chịu trách nhiệm.” Bạn vẫn không làm. Lời hứa đó không làm cho mắt hết đỏ, cũng không làm cho vết thương lành lại. Hãy nhẹ nhàng nhắc lại: “Em từ chối là vì em quý chị.”" },
        { p: "Từ chối đúng lúc không làm mất khách. Người được nói thật và được giữ thể diện thường quay lại, và tin tiệm hơn trước. Mất một lượt khách hôm nay vẫn hơn mất uy tín của cả tiệm." },
      ],
    },
    {
      id: "ghi-lai-va-hen-lai",
      title: "Ghi lại và hẹn lại cho khách",
      blocks: [
        { p: "Sau khi từ chối, ghi vào hồ sơ của khách ba điều: ngày nào, bạn thấy gì, bạn đã khuyên gì. Chỉ ghi điều mình thấy, không ghi tên bệnh. Đây là thông tin sức khỏe, nên chỉ ghi khi khách đồng ý và giữ thật kín." },
        { p: "Trong VaraaAi, chỗ để ghi là ô “Ghi chú nội bộ” của hồ sơ khách, chỉ salon nhìn thấy; xem bài [Sổ khách hàng](lesson:khach-hang). Bạn cũng nên hẹn lại cho khách ngay trong [Lịch hẹn](lesson:lich-hen), để khách thấy mình không bị từ chối hẳn mà chỉ được dời sang một ngày an toàn hơn." },
      ],
    },
    {
      id: "khi-tho-khong-nen-lam",
      title: "Khi chính người thợ không nên làm",
      blocks: [
        { p: "Quy tắc dừng lại áp dụng theo cả hai chiều. Người thợ cũng có thể là nguồn lây." },
        {
          table: {
            head: ["Tình trạng của thợ", "Làm gì"],
            rows: [
              ["Vết xước nhỏ, sạch ở tay", "Dán băng kín nước rồi đeo găng"],
              ["Vết thương ở tay đang sưng, đỏ, có mủ", "Không chạm vào khách, và đi khám"],
              ["Sốt, tiêu chảy, nôn ói, đau mắt đỏ hay bệnh dễ lây", "Ở nhà"],
            ],
          },
        },
        { img: { src: img("tho-dan-bang-kin-nuoc-len-vet-xuoc-o-tay"), alt: "Nữ thợ làm đẹp mặc áo kem dán miếng băng cá nhân lên đầu ngón tay mình, bên cạnh là hộp găng nitrile đen" } },
        { p: "Chủ tiệm nên nói rõ với nhân viên rằng báo bệnh không phải là lỗi. Một người thợ đi làm khi đang ốm có thể lây cho nhiều khách trong một ngày. Cách đeo và thay găng đúng có trong bài [Găng tay, rửa tay và đồ bảo hộ](lesson:rua-tay-gang-tay)." },
        { note: "Quy định về những trường hợp phải từ chối khác nhau theo từng nước. Bài này không thay cho ý kiến của bác sĩ.", kind: "warn", title: "Lưu ý" },
      ],
    },
  ],
  faq: [
    {
      q: "Móng bị nấm có sơn gel được không?",
      a: "Người thợ không xác định được móng có bị nấm hay không, vì nhìn bằng mắt thì không ai dám chắc. Nhưng nếu móng ngả xanh, vàng hay nâu, dày lên, vụn hoặc tách khỏi nền móng thì không nên sơn gel lên móng đó. Lớp sơn không chữa được gì, chỉ che đi cho đến khi nặng hơn. Hãy để bác sĩ hoặc dược sĩ xem trước.",
    },
    {
      q: "Đau mắt đỏ hoặc bị lẹo có nối mi được không?",
      a: "Không nên. Mắt đỏ, ngứa, chảy nước, có ghèn dính, lẹo hoặc bờ mi sưng đỏ, đóng vảy đều là dấu hiệu phải dừng. Sau nhiễm trùng mắt hay phẫu thuật mắt, hãy chờ đến khi bác sĩ cho phép rồi mới nối mi.",
    },
    {
      q: "Đang uống thuốc trị mụn isotretinoin có wax được không?",
      a: "Không. Isotretinoin làm da mỏng và yếu, wax có thể làm tróc cả lớp da. Khách đang uống hoặc mới ngừng trong khoảng sáu tháng thì không wax. Với kem retinoid bôi ngoài, làm theo hướng dẫn của hãng wax và của bác sĩ kê thuốc.",
    },
    {
      q: "Người bị tiểu đường có làm móng chân ở tiệm được không?",
      a: "Được nếu bàn chân không có vết loét hay vết thương, nhưng thợ phải làm thật cẩn thận: nước chỉ ấm vừa, không ngâm lâu, không dùng dao bào, không cắt da. Bàn chân người tiểu đường có thể giảm cảm giác và vết xước rất lâu lành. Chân có vết loét hay vết thương thì không làm, và nên đến bác sĩ hoặc chuyên viên chăm sóc bàn chân.",
    },
    {
      q: "Thợ phát hiện khách có chí (chấy) thì nên làm gì?",
      a: "Dừng lại, không hốt hoảng và không nói to. Nói riêng với khách và khuyên khách ra hiệu thuốc. Sau đó giặt khăn, xử lý lược, kéo và áo choàng thật kỹ trước khi dùng cho người khác.",
    },
    {
      q: "Khách năn nỉ “cứ làm đi, chị chịu trách nhiệm” thì có nên làm không?",
      a: "Không. Lời hứa chịu trách nhiệm không làm cho mắt hết đỏ hay vết thương lành lại. Hãy nhắc lại nhẹ nhàng rằng bạn từ chối vì sự an toàn của khách, rồi đề nghị một lối khác: làm phần còn lành, đổi dịch vụ hoặc hẹn lại.",
    },
  ],
  related: ["di-ung-hoa-chat", "xu-ly-su-co", "ve-sinh-dung-cu", "rua-tay-gang-tay"],
};

export default article;
