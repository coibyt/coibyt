import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-mai-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cac-kieu-toc-mai",
  lesson: "cat-mai-hieu-dung",
  category: "hair",
  title: "Các kiểu tóc mái: mái bằng, mái thưa, mái bay và cách chọn để không cắt hụt",
  metaTitle: "Các kiểu tóc mái: mái bằng, mái thưa, mái bay",
  metaDescription:
    "Các kiểu tóc mái thường gặp và cách chọn: mái bằng, mái thưa, mái bay hợp với ai, tóc mái bị xoáy, vì sao mái cắt xong hay ngắn hơn ý muốn và an toàn quanh mắt.",
  keyword: "các kiểu tóc mái",
  keywords: [
    "mái bay là gì",
    "mái thưa hợp với ai",
    "có nên cắt tóc mái không",
    "tóc mái bị xoáy",
    "cắt mái bị ngắn quá",
    "tỉa mái bao lâu một lần",
    "cách sấy tóc mái",
  ],
  excerpt: "Ba kiểu mái thường gặp, câu hỏi nên đặt ra trước khi cắt, chỏm xoáy ở chân tóc trán và lý do mái ướt luôn phải cắt dài hơn độ dài đã hẹn.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("toc-mai-bay-re-giua-om-go-ma"),
    alt: "Khách nữ tóc vàng mật ong dài với mái bay rẽ giữa, ngắn nhất ở giữa trán và dài dần ôm hai gò má, ngồi trong salon kiểu Paris",
  },
  takeaways: [
    "Ba kiểu mái hay gặp: **mái bằng** dày và nét, **mái thưa** nhẹ và thấy được trán, **mái bay** rẽ giữa, dài dần ra gò má và dễ để dài nhất.",
    "Trước khi cắt, vén tóc lên tìm **xoáy ở chân tóc trán**. Xoáy mạnh thì để mái dài và dày hơn, chọn mái bay, hoặc khuyên khách đừng cắt mái.",
    "Thống nhất độ dài khi tóc khô, ngay trên mặt khách. Lần cắt đầu tiên chỉ tới đầu mũi hay môi, rồi mới ngắn dần.",
    "Cắt mái gần như **không có lực căng**: tóc ướt và tóc bị kéo căng đều dài ra, khô và thả ra thì co lên.",
    "Khách nhắm mắt khi cắt, ngón tay nằm giữa lưỡi kéo và da, mũi kéo không bao giờ chĩa về phía mắt.",
  ],
  intro: [
    "Các kiểu tóc mái khác nhau ở lượng tóc, ở đường cắt và ở công chăm sóc mỗi sáng, nhưng giống nhau ở một điểm: mái là phần nhỏ nhất của kiểu tóc mà lại dễ nhìn thấy nhất. Nó nằm ngay trên mắt. Lệch vài li hay ngắn vài li là khách thấy ngay khi soi gương. Tóc chỉ mọc khoảng một phân mỗi tháng, nên một cái mái cắt hụt thì khách phải sống với nó rất lâu.",
    "Bài viết này đi theo bài học “Cắt mái và tỉa quanh mặt: hiểu đúng để không cắt quá ngắn” trong khóa Nghề Tóc của VaraaAi Academy. Đọc xong, bạn gọi đúng tên ba kiểu mái, biết hỏi gì để giúp khách chọn, và hiểu vì sao mái hay bị ngắn hơn ý muốn. Thao tác cầm kéo từng bước nằm ở bài thực hành [Cách cắt tóc mái bay](lesson:cat-mai).",
  ],
  sections: [
    {
      id: "ba-kieu-mai",
      title: "Các kiểu tóc mái thường gặp: mái bằng, mái thưa, mái bay",
      blocks: [
        { p: "Tên gọi các kiểu mái thì mỗi nơi, mỗi trường một khác. Điều quan trọng là bạn và khách hiểu cùng một hình, nên hãy dùng ảnh mẫu và mô tả bằng lời cho rõ." },
        {
          table: {
            head: ["Kiểu mái", "Hình dáng", "Hợp với ai, cần gì"],
            rows: [
              ["Mái bằng", "Dày, dài tới lông mày, cắt một đường thẳng, nét và mạnh", "Cần tóc đủ dày và phải tỉa lại khá thường xuyên"],
              ["Mái thưa", "Chỉ lấy ít tóc, đầu mái mềm, nhìn xuyên qua thấy được trán", "Nhẹ nhàng, hợp với người muốn thử mái lần đầu"],
              ["Mái bay (mái rèm)", "Rẽ giữa, ngắn nhất ở chính giữa, dài dần sang hai bên và ôm lấy gò má", "Dễ để dài ra nhất, hợp với khách không muốn quay lại tiệm thường xuyên"],
            ],
          },
        },
        { img: { src: img("toc-mai-bang-day-ngang-long-may"), alt: "Chân dung một phụ nữ tóc bob nâu sẫm với mái bằng dày, đầu mái là một đường thẳng đều nằm ngang lông mày", caption: "Mái bằng: một đường thẳng, dày. Đường nét rõ nên lệch một chút cũng lộ." } },
        { p: "Mái bay dễ để dài vì càng dài, nó càng hòa vào phần tóc quanh mặt. Mái bằng thì ngược lại: đường thẳng ngang lông mày chỉ giữ được nét khi được tỉa đều." },
      ],
    },
    {
      id: "co-nen-cat-mai",
      title: "Có nên cắt tóc mái không: những điều cần hỏi trước",
      blocks: [
        { p: "Tư vấn cho một cái mái phải kỹ hơn một lần cắt bình thường. Bắt đầu bằng việc kéo hết tóc ra sau để nhìn khuôn mặt và vầng trán: trán cao hay thấp, rộng hay hẹp, mặt tròn hay dài." },
        { img: { src: img("keo-toc-ra-sau-xem-khuon-mat-va-vang-tran"), alt: "Thợ tóc đứng sau khách, dùng tay gom tóc của khách ra phía sau để lộ rõ vầng trán, đường chân tóc và khuôn mặt" } },
        { p: "Sau đó hỏi về cuộc sống hằng ngày của khách, vì mái đẹp ở tiệm chưa chắc đẹp ở nhà:" },
        {
          ul: [
            "**Khách có thời gian sấy mỗi sáng không.** Mái cần sấy mỗi ngày, dù chỉ vài phút.",
            "**Khách có đeo kính không.** Gọng kính và đầu mái gặp nhau ở cùng một chỗ trên mặt.",
            "**Khách có chơi thể thao, ra nhiều mồ hôi không.**",
            "**Khách có hay buộc tóc lên không.**",
          ],
        },
        { p: "Và nói trước một điều nhiều khách không ngờ tới: mái cần tỉa lại sau vài tuần. Khách không muốn quay lại thường xuyên thì một cái mái bay dài sẽ dễ sống hơn mái bằng." },
      ],
    },
    {
      id: "toc-mai-bi-xoay",
      title: "Tóc mái bị xoáy: nhìn chân tóc trán trước khi cắt",
      blocks: [
        { p: "Điều thợ mới hay quên nhất là hướng mọc của tóc ở chân tóc trán. Hãy vén tóc lên và nhìn thật kỹ. Rất nhiều người có một chỏm xoáy ở đó, và chỗ có xoáy thì tóc không chịu nằm xuống." },
        { img: { src: img("tim-xoay-o-chan-toc-tran"), alt: "Cận cảnh thợ tóc dùng các đầu ngón tay vén phần tóc khô phía trước của khách lên để xem đường chân tóc ở trán", caption: "Vén tóc lên, xem tóc ở chân tóc trán mọc về hướng nào." } },
        { p: "Cắt mái ngắn trên một chỏm xoáy, tóc sẽ dựng lên hoặc tách ra làm hai, và sáng nào khách cũng phải vật lộn với nó. Gặp xoáy mạnh, bạn có ba lựa chọn:" },
        {
          ol: [
            "Để mái dài hơn và dày hơn, cho sức nặng kéo tóc xuống.",
            "Chọn mái bay, rẽ theo đúng hướng tóc mọc.",
            "Khuyên khách đừng cắt mái. Có khi đây là lời khuyên tốt nhất.",
          ],
        },
        { note: "Cắt thật ngắn không giấu được xoáy: tóc ngắn ở chỗ ấy dựng lên hoặc tách đôi. Kéo thật căng khi cắt cũng không làm tóc nằm xuống, thả tay ra là mái bật lên cao hơn.", kind: "warn", title: "Hai cách xử lý sai" },
      ],
    },
    {
      id: "vi-sao-mai-bi-ngan",
      title: "Vì sao cắt mái bị ngắn quá: tóc ướt và lực căng",
      blocks: [
        { p: "Tóc ướt thì dài ra và nặng xuống. Khô rồi nó co lại, ở chỗ có xoáy còn bật lên. Tóc bị kéo căng cũng dài ra y như vậy. Nếu bạn kéo căng mái ướt xuống rồi cắt đúng ngang lông mày, thì khi thả ra và khô đi, mái nhảy lên cao hơn mình tưởng, có khi cả phân." },
        { p: "Từ đó ra ba nguyên tắc về độ dài:" },
        {
          ul: [
            "**Thống nhất độ dài khi tóc còn khô, ngay trên mặt khách.** Lấy ngón tay đặt tóc xuống trán và chỉ đúng chỗ mái sẽ dừng: chạm lông mày, dưới lông mày hay ngang gò má.",
            "**Cắt dài hơn chỗ ấy trước.** Lần đầu chỉ cắt tới đầu mũi hay tới môi, sau đó mới ngắn dần từng chút một.",
            "**Cắt gần như không có lực căng.** Chải tóc xuống, để nó tự nằm trên trán, ngón tay chỉ đỡ hờ.",
          ],
        },
        { p: "Nhiều thợ cắt mái khi tóc khô, hoặc ít nhất là sấy khô rồi mới cắt lần cuối, để thấy đúng chỗ mái sẽ nằm." },
        { note: "Cắt thêm thì lúc nào cũng được, cắt hụt thì không nối lại được. Khi tóc còn ướt, đừng bao giờ cắt tới đúng độ dài đã hẹn với khách.", kind: "tip", title: "Câu cần nhớ nhất với mái" },
      ],
    },
    {
      id: "tam-giac-va-tia-mai",
      title: "Vùng tam giác, tỉa bằng mũi kéo và đường chéo của mái bay",
      blocks: [
        { h3: "Lấy bao nhiêu tóc làm mái" },
        { p: "Vùng tóc làm mái thường được chia thành một hình tam giác. Đỉnh tam giác nằm trên đỉnh đầu, ở chỗ đầu bắt đầu cong xuống. Hai góc dưới nằm ở hai góc trán, ngay trên đuôi lông mày. Tam giác sâu ra sau thì mái dày, tam giác nông thì mái thưa. Phần tóc còn lại được chải ra sau và kẹp gọn để không lẫn vào lúc cắt." },
        { img: { src: img("chia-vung-tam-giac-de-cat-mai"), alt: "Phần tóc ướt trong vùng tam giác trước trán được chải thẳng xuống che mặt khách, thợ tóc cầm lược và giữ hai bên, phần tóc còn lại kẹp gọn", caption: "Tóc trong tam giác chải xuống trước mặt, phần còn lại kẹp gọn ra sau." } },
        { p: "Đừng lấy tóc quá rộng ra hai bên thái dương. Mái sẽ trùm hết khuôn mặt và nhìn rất nặng." },
        { h3: "Tỉa bằng mũi kéo cho đầu mái mềm" },
        { p: "Muốn đầu mái mềm, thợ không cắt ngang một đường mà dựng mũi kéo lên, cắt những nhát rất nhỏ vào đầu tóc. Mái bằng chỉ tỉa rất ít để giữ đường nét. Mái thưa và mái bay tỉa nhiều hơn cho đầu mái nhẹ và rơi tự nhiên. Tỉa sâu quá thì mái lởm chởm và mỏng đi rất nhiều." },
        { img: { src: img("tia-dau-mai-bang-mui-keo-khi-toc-kho"), alt: "Cận cảnh khách nhắm mắt, thợ tóc nâng một lọn mái khô bằng đầu ngón tay và dựng mũi kéo lên để tỉa vào đầu tóc", caption: "Tỉa khi tóc đã khô, mũi kéo dựng lên vào đầu tóc, khách nhắm mắt." } },
        { h3: "Mái bay và tóc ôm quanh mặt là một đường liền" },
        { p: "Với mái bay, sau khi có độ dài ở giữa, mái được rẽ làm đôi. Mỗi nửa cắt theo một đường chéo, từ giữa trán dài dần ra tới gò má. Những lọn tóc ôm quanh mặt nối tiếp đường chéo ấy xuống tới cằm hay xương quai xanh. Đường cắt đi ra ngoài, xa khuôn mặt, để tóc rơi ra hai bên và mở khuôn mặt ra. Giữa mái và tóc quanh mặt không được có chỗ gãy. Cách tạo tầng ôm mặt trong một kiểu tóc tầng được nói ở bài [Cắt tóc tầng là gì](lesson:cat-nu-tang-hieu-dung)." },
      ],
    },
    {
      id: "can-doi-va-an-toan",
      title: "Kiểm tra cân đối và an toàn khi cắt gần mắt",
      blocks: [
        { p: "Chỉ kiểm tra cân đối khi đầu khách thẳng và mắt nhìn thẳng. Khách hơi nghiêng đầu hay cúi xuống nhìn điện thoại là mái trông lệch ngay, và nếu bạn cắt theo cái lệch ấy thì khi khách ngồi thẳng lên, đường cắt mới lệch thật. Cầm hai bên mái cùng một lúc, so ở cùng một mốc, ví dụ ngang gò má. Rồi lùi lại một bước và nhìn cả khuôn mặt chứ không riêng cái mái." },
        {
          note: "Mái là chỗ cắt gần mắt nhất. Nhờ khách nhắm mắt trong lúc cắt. Ngón tay luôn nằm giữa lưỡi kéo và da mặt khách. Mũi kéo không bao giờ chĩa về phía mắt: khi tỉa, nó hướng lên vào đầu tóc hoặc chĩa ra ngoài. Khách sắp hắt hơi hay muốn nói chuyện thì dừng tay và nhấc kéo ra. Cắt xong, phủi tóc vụn khỏi mặt thật nhẹ trước khi khách mở mắt.",
          kind: "warn",
          title: "An toàn quanh mắt",
        },
        { p: "Lược, kéo, kẹp được làm sạch và khử khuẩn sau mỗi khách, theo bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu). Những gì trong bài là kinh nghiệm nghề phổ biến để luyện tập. Mỗi nước, mỗi trường có cách làm riêng, và bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề." },
      ],
    },
    {
      id: "say-mai-va-tia-lai",
      title: "Cách sấy tóc mái ở nhà và lịch tỉa mái",
      blocks: [
        { p: "Một cái mái cắt đúng vẫn có thể làm khách khó chịu nếu khách không biết sấy. Trước khi khách về, hãy chỉ ba việc:" },
        {
          ol: [
            "Sấy mái đầu tiên, khi tóc còn ướt, vì mái khô rất nhanh.",
            "Đầu máy sấy chĩa xuống.",
            "Chải mái qua trái, qua phải, rồi mới để nó nằm xuống.",
          ],
        },
        { p: "Phần kỹ thuật sấy cho cả mái tóc có trong bài [Sấy tạo kiểu](lesson:say-tao-kieu-hieu-dung)." },
        { p: "Hẹn khách tỉa mái lại sau vài tuần. Nhiều tiệm tỉa mái nhanh giữa hai lần cắt, và đây là một dịch vụ đáng đưa lên trang đặt lịch: trong VaraaAi, bạn [tạo một dịch vụ ngắn](lesson:dich-vu) tên “Tỉa mái” để khách tự đặt, rồi ghi độ dài mái và bên có xoáy vào ghi chú trong [sổ khách hàng](lesson:khach-hang). Lần sau khách ngồi xuống, bạn không phải dò lại từ đầu." },
      ],
    },
  ],
  faq: [
    {
      q: "Có những kiểu tóc mái nào?",
      a: "Ba kiểu hay gặp là mái bằng, mái thưa và mái bay. Mái bằng dày, cắt một đường thẳng ngang lông mày. Mái thưa lấy ít tóc, đầu mềm, thấy được trán. Mái bay, còn gọi là mái rèm, rẽ giữa, ngắn nhất ở giữa và dài dần ra gò má. Tên gọi có thể khác nhau giữa các nơi.",
    },
    {
      q: "Mái bay là gì và vì sao dễ để dài?",
      a: "Mái bay là kiểu mái rẽ giữa, ngắn nhất ở chính giữa trán rồi dài dần sang hai bên, ôm lấy gò má. Càng dài, nó càng hòa vào phần tóc quanh mặt, nên khách muốn để dài ra thì cứ để. Vì vậy nó hợp với người không muốn quay lại tiệm thường xuyên.",
    },
    {
      q: "Tóc mái bị xoáy thì nên cắt kiểu nào?",
      a: "Ở chỗ có xoáy, tóc ngắn sẽ dựng lên hoặc tách đôi. Nên để mái dài hơn và dày hơn cho sức nặng kéo tóc xuống, hoặc chọn mái bay rẽ theo đúng hướng tóc mọc. Với xoáy mạnh, đôi khi lời khuyên tốt nhất là không cắt mái.",
    },
    {
      q: "Vì sao cắt mái xong lại ngắn hơn mình muốn?",
      a: "Vì tóc ướt và tóc bị kéo căng đều dài ra. Khi khô và được thả ra, mái co lên, có khi cả phân, nhất là ở chỗ có xoáy. Cách tránh là thống nhất độ dài khi tóc khô, cắt lần đầu thật dài, gần như không kéo căng, và chỉnh lần cuối khi tóc đã khô.",
    },
    {
      q: "Tóc mái bao lâu thì cần tỉa lại?",
      a: "Mái cần tỉa lại sau vài tuần, và mái bằng cần tỉa khá thường xuyên để giữ đường nét. Nhiều tiệm có dịch vụ tỉa mái nhanh giữa hai lần cắt tóc. Nên nói điều này với khách trước khi cắt để khách chọn kiểu mái hợp với thói quen của mình.",
    },
    {
      q: "Sấy tóc mái thế nào cho vào nếp?",
      a: "Sấy mái đầu tiên, khi tóc còn ướt, vì mái khô rất nhanh. Để đầu máy sấy chĩa xuống, chải mái qua trái rồi qua phải vài lần, sau đó mới để mái nằm xuống đúng chỗ.",
    },
  ],
  related: ["cat-mai", "cat-nu-tang-hieu-dung", "toc-tu-van-chia-vung-hieu-dung", "say-tao-kieu-hieu-dung"],
};

export default article;
