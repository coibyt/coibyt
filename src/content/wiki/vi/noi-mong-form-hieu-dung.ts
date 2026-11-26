import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mong-form-hieu-dung/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "noi-mong-form-la-gi",
  lesson: "noi-mong-form-hieu-dung",
  category: "nail",
  title: "Nối móng form là gì? Form giấy, form kim loại và vì sao móng nối bị gãy, hếch",
  metaTitle: "Nối móng form là gì? Form giấy, form kim loại, lỗi hay gặp",
  metaDescription:
    "Nối móng form là gì, form giấy khác form kim loại ra sao, vì sao form phải khít và thẳng, chọn độ dài, cấu trúc móng nối, lỗi làm móng gãy, hếch và lịch dặm.",
  keyword: "nối móng form là gì",
  keywords: ["nối móng bằng form", "form giấy nối móng", "form kim loại nối móng", "móng nối bị gãy", "móng nối bị hếch", "nối móng gel có bền không", "nối móng dài bao nhiêu là vừa"],
  excerpt: "Nối móng form là dựng phần móng dài bằng builder gel trên một tấm khuôn tạm. Bài viết giải thích cách form quyết định dáng móng và những lỗi làm móng nối gãy.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("bo-mong-noi-form-dang-hanh-nhan-hoan-thien"),
    alt: "Hai bàn tay khách đặt chồng lên nhau trên gối kê tay, mười móng nối dáng hạnh nhân màu hồng sữa bóng",
  },
  takeaways: [
    "Form chỉ là **cái khuôn tạm** đặt dưới đầu móng. Gel đi theo form, nên form đặt thế nào thì móng ra thế ấy.",
    "Form phải **khít sát dưới đầu móng** và nối tiếp đường móng thật. Có khe hở thì gel chảy xuống dưới, phần nối yếu và dễ bong.",
    "Form chúc xuống, vểnh lên hay lệch bên đều làm sai cả khung móng. Dũa sau gần như không cứu được.",
    "Phần nối càng dài, lực dồn về vùng chịu lực càng lớn. Lần đầu nối nên chọn **độ dài vừa phải**.",
    "Móng nối gãy ngang sau vài ngày thường do **không có apex**. Thường cứ 3–4 tuần khách nên quay lại dặm.",
  ],
  intro: [
    "Nối móng form là gì, và vì sao cùng một hũ gel mà bộ móng này đứng vững đến buổi dặm, bộ kia gãy sau vài ngày? Nối móng bằng form là dùng builder gel làm móng dài hơn móng thật, trên một tấm form đặt dưới đầu móng. Móng nối đẹp nhìn rất sang. Móng nối sai thì gãy, hở, hoặc hếch lên như cầu trượt, và rất nhiều lỗi bắt đầu ngay từ cái form.",
    "Bài viết đi theo bài học “Nối móng bằng form: hiểu đúng để móng dài mà không gãy” trong khóa Nghề Nail của VaraaAi Academy. Đọc xong, bạn biết chọn form, biết kiểm tra form trước khi đặt gel, biết tư vấn độ dài cho khách và nhìn một bộ móng nối là đoán được vì sao nó gãy.",
  ],
  sections: [
    {
      id: "form-giay-va-form-kim-loai",
      title: "Form nối móng là gì: form giấy và form kim loại",
      blocks: [
        { p: "Form là một cái khuôn tạm. Người thợ dựng gel trên đó, hơ cho chín, rồi gỡ form ra, và phần móng dài vẫn đứng vững. Hai loại hay gặp là form giấy và form kim loại." },
        { img: { src: img("form-giay-va-form-kim-loai-noi-mong"), alt: "Dụng cụ nối móng bày trên khăn kem: xấp form giấy màu vàng, ba form kim loại, kéo, dũa, cọ, hũ gel hồng và đèn hơ", caption: "Form giấy màu vàng và form kim loại nằm cạnh nhau, cùng bộ đồ cần cho một buổi nối móng." } },
        {
          table: {
            head: ["Điểm so sánh", "Form giấy", "Form kim loại"],
            rows: [
              ["Số lần dùng", "Có keo dán, dùng một lần rồi bỏ", "Dùng lại được sau khi làm sạch và khử khuẩn như mọi dụng cụ khác"],
              ["Điểm mạnh", "Mềm, dễ cắt cho vừa từng móng, lúc nào cũng mới cho mỗi khách", "Cứng, giữ đường thẳng rất tốt"],
              ["Điều phải lo", "Cắt lại đường cong khi chưa khớp đầu móng", "Chọn cỡ cho vừa và xử lý sau mỗi khách"],
            ],
          },
        },
        { p: "Không có loại nào tốt hơn hẳn. Điều quan trọng là form ôm khít đầu móng của người khách đang ngồi trước mặt bạn. Phần gel dựng trên form là builder gel, nên nếu chưa quen với loại gel này, bạn đọc trước bài [builder gel là gì](lesson:builder-gel-hieu-dung)." },
      ],
    },
    {
      id: "form-khit-va-thang",
      title: "Vì sao form phải khít và thẳng",
      blocks: [
        { p: "Nhiệm vụ của form là nối tiếp đường móng thật. Nhìn từ cạnh bên, form đi thẳng ra từ đầu móng, như thể móng thật mọc dài thêm. Nhìn từ trên xuống và nhìn từ đầu móng, form thẳng hàng với ngón tay, không lệch trái, không lệch phải. Gel chỉ đi theo form." },
        { img: { src: img("form-noi-mong-khit-duoi-dau-mong"), alt: "Ngón tay nhìn từ cạnh bên với form kim loại mỏng luồn sát dưới đầu móng và đi thẳng ra phía trước", caption: "Form đặt đúng: khít dưới đầu móng, nối tiếp đường móng thật." } },
        { h3: "Khe hở giữa đầu móng và form" },
        { p: "Chuyện rất hay gặp ở thợ mới: đặt form vội, giữa đầu móng và form còn một khe nhỏ. Gel chảy xuống khe đó và đọng lại dưới đầu móng. Gỡ form ra, mặt dưới móng có một gờ gel, khách thấy cộm, chỗ đó lại dễ giữ bẩn. Phần nối không liền với móng thật nên yếu và dễ bong. Cách tránh là đẩy form cho khít, và khi cần thì cắt lại đường cong của form cho vừa móng của từng khách." },
        { h3: "Form bị nghiêng hoặc lệch" },
        {
          table: {
            head: ["Form đặt sai", "Móng nối sẽ ra sao"],
            rows: [
              ["Chúc xuống", "Móng cụp xuống như cái móc"],
              ["Vểnh lên", "Móng hếch lên như cầu trượt tuyết"],
              ["Lệch sang một bên", "Móng xiên, hai cạnh không song song"],
            ],
          },
        },
        { img: { src: img("loi-form-chuc-xuong-ho-duoi-dau-mong"), alt: "Ngón tay nhìn từ cạnh bên, form kim loại đặt chúc xuống so với đường móng và hở một khe dưới đầu móng", caption: "Hình minh họa lỗi: form chúc xuống và không khít. Gel dựng trên form này sẽ cụp theo." } },
        { img: { src: img("loi-mong-noi-cup-xuong-nhu-cai-moc"), alt: "Một móng nối màu hồng sữa nhìn từ cạnh bên, phần đầu móng cong cụp hẳn xuống như cái móc", caption: "Hình minh họa lỗi: móng cụp xuống vì form chúc xuống lúc dựng gel." } },
        { img: { src: img("loi-mong-noi-bi-xien-lech-mot-ben"), alt: "Bàn tay khách với một móng nối hồng sữa bị cong lệch sang một bên, không thẳng hàng với ngón tay", caption: "Hình minh họa lỗi: móng xiên vì form lệch sang một bên." } },
        { note: "Những lỗi này dũa sau gần như không cứu được, vì cái sai nằm trong cả khung móng. Trước khi đặt gel, hãy nhìn ngón tay từ ba hướng: cạnh bên, trên xuống và đầu móng. Việc này chỉ mất vài giây.", kind: "tip", title: "Kiểm tra form từ ba hướng" },
      ],
    },
    {
      id: "do-dai-mong-noi",
      title: "Nối móng dài bao nhiêu là vừa, và móng nào chưa nên nối",
      blocks: [
        { p: "Hãy nghĩ móng nối như một cái đòn bẩy. Phần nối càng dài thì mỗi lần đầu móng va vào đâu đó, lực dồn về vùng chịu lực càng lớn. Vùng chịu lực là chỗ móng thật rời khỏi nền da." },
        {
          ul: [
            "Độ dài phải hợp với móng thật. Móng thật ngắn và mỏng thì đừng nối quá dài.",
            "Hỏi khách làm nghề gì, ngày thường làm gì. Người gõ phím cả ngày hay làm việc tay chân sẽ đeo móng vừa phải bền hơn nhiều.",
            "Lần đầu nối, nên chọn độ dài vừa phải.",
          ],
        },
        { p: "Nói thật với khách về độ dài thì khách sẽ tin bạn hơn." },
        { p: "Không phải móng nào cũng nên nối. Móng thật bị cắn sát, gần như không còn đầu móng, thì form khó tựa và phần nối phải gánh gần như mọi thứ. Móng đang có vấn đề như tách khỏi nền, đổi màu, hay da quanh móng sưng đỏ thì không làm, và khuyên khách đi khám. Các dấu hiệu này được nói kỹ trong bài học [Khi nào không nên làm](lesson:khi-nao-khong-lam)." },
      ],
    },
    {
      id: "cau-truc-mong-noi",
      title: "Cấu trúc của một chiếc móng nối chắc",
      blocks: [
        { p: "Cấu trúc giống như lớp builder gel trên móng thật: mỏng ở chân móng, mỏng ở đầu móng, dày nhất ở điểm apex nằm trên vùng chịu lực. Nhìn từ đầu móng, độ cong chữ C đều hai bên. Nhìn từ trên xuống, hai cạnh bên thẳng và song song. Với móng nối, apex càng quan trọng, vì nó phải gánh cả phần móng dài phía trước." },
        { img: { src: img("cau-truc-mong-noi-co-diem-apex"), alt: "Một móng nối hồng sữa nhìn từ cạnh bên, mặt móng cong mềm với điểm cao nhất nằm ở khoảng giữa, đầu móng thanh", caption: "Nhìn từ cạnh bên: điểm cao nhất nằm trên vùng chịu lực, đầu móng mỏng dần." } },
        {
          ul: [
            "**Đầu móng** nên mỏng, nhìn thanh, nhưng không mỏng như tờ giấy. Người trong nghề hay ví: dày chừng một tấm thẻ ngân hàng. Quá dày thì móng thô và nặng, quá mỏng thì đầu móng dễ mẻ.",
            "**Chỗ phần nối gặp móng thật** phải liền, sờ không thấy bậc.",
          ],
        },
        { h3: "Móng nối bị gãy ngang sau vài ngày" },
        { p: "Kiểu gãy hay gặp nhất là gãy ngang, ngay vùng chịu lực. Nhìn từ cạnh bên, chiếc móng đó phẳng và mỏng đều như một tấm kính, không có apex. Gel thì đủ, nhưng không nằm đúng chỗ: mỏng ngay nơi cần dày nhất. Cách sửa không phải là đắp dày cả móng, mà là đặt gel đúng chỗ." },
        { img: { src: img("loi-mong-noi-phang-gay-o-vung-chiu-luc"), alt: "Một móng nối dài, phẳng và mỏng đều nhìn từ cạnh bên, có một đường nứt ngang ở chỗ móng rời khỏi đầu ngón tay", caption: "Hình minh họa lỗi: móng phẳng, không có apex, nứt ngang ở vùng chịu lực." } },
      ],
    },
    {
      id: "gel-cham-da-va-an-toan",
      title: "Gel chạm da và những điều về an toàn",
      blocks: [
        { p: "Khi nối móng, gel có thêm một đường để chạm da: ngoài chân móng và hai khóe, nó còn có thể chảy qua mép form xuống đầu ngón tay. Gel chưa chín chạm da là con đường dẫn tới dị ứng, và chỗ gel dính da sẽ bong lên rất nhanh." },
        { img: { src: img("loi-gel-tran-len-da-quanh-mong"), alt: "Cận cảnh một móng phủ gel hồng trong bị tràn, gel chảy lên da ở chân móng và nhỏ giọt xuống cạnh ngón tay", caption: "Hình minh họa lỗi: gel tràn lên da quanh móng. Phải lau sạch trước khi hơ đèn." } },
        {
          ul: [
            "Luôn chừa một khe nhỏ như sợi tóc giữa gel và da. Lỡ dính thì lau sạch trước khi hơ đèn.",
            "Bật máy hút bụi khi dũa.",
            "Hơ đủ thời gian của hãng. Gel hơ thiếu vừa yếu vừa dễ gây dị ứng.",
          ],
        },
        { note: "Gel chưa chín không bao giờ chạm vào da, của khách và của chính người thợ. Thời gian hơ và cách dùng sản phẩm luôn theo hướng dẫn của hãng. Quy định về sản phẩm làm móng khác nhau theo từng nước.", kind: "warn", title: "Nguyên tắc an toàn" },
        { p: "Về dấu hiệu và cách phòng dị ứng, bạn xem bài học [Dị ứng hóa chất](lesson:di-ung-hoa-chat)." },
      ],
    },
    {
      id: "dam-mong-noi",
      title: "Móng nối bao lâu thì dặm",
      blocks: [
        { p: "Móng mọc ra, apex trôi dần về phía đầu móng, móng nặng đầu và dễ gãy. Thường cứ 3–4 tuần khách nên quay lại dặm. Dặm đúng hẹn thì móng nối giữ được lâu và an toàn. Để quá lâu, móng dễ gãy, có khi kéo theo cả móng thật bên dưới." },
        { p: "Phần lý thuyết dừng ở đây. Để xem cách cắt form, gắn form và dựng phần nối bằng tay, bạn sang bài thực hành [cách nối móng bằng form](lesson:noi-mong-form)." },
      ],
    },
    {
      id: "dich-vu-noi-mong-tren-lich",
      title: "Tách dịch vụ nối móng mới và dặm móng nối",
      blocks: [
        { p: "Một bộ nối mới và một buổi dặm cần thời lượng khác nhau. Trong VaraaAi, bạn [tạo hai dịch vụ](lesson:dich-vu) “nối móng mới” và “dặm móng nối” với thời lượng riêng, để lịch hẹn không bị dồn. Hai mức giá cũng nên hiện rõ trên [bảng giá](lesson:bang-gia) của tiệm, và khách dặm đều đặn là nhóm khách hợp với [thẻ khách quen](lesson:the-khach-quen)." },
      ],
    },
  ],
  faq: [
    {
      q: "Nối móng form là gì?",
      a: "Là cách làm móng dài hơn móng thật bằng builder gel, dựng trên một tấm form đặt dưới đầu móng. Form là khuôn tạm: gel nằm trên đó, được hơ chín, rồi form được gỡ ra và phần móng dài vẫn đứng vững.",
    },
    {
      q: "Form giấy hay form kim loại tốt hơn?",
      a: "Không có loại nào tốt hơn hẳn. Form giấy mềm, dễ cắt cho vừa từng móng và dùng một lần rồi bỏ. Form kim loại cứng, giữ đường thẳng tốt, dùng lại được sau khi làm sạch và khử khuẩn. Điều quan trọng là form ôm khít đầu móng của khách.",
    },
    {
      q: "Vì sao móng nối bị hếch lên hoặc cụp xuống?",
      a: "Vì form bị nghiêng lúc dựng gel. Form vểnh lên thì móng hếch như cầu trượt, form chúc xuống thì móng cụp như cái móc. Gel đi theo form, nên lỗi nằm trong cả khung móng và dũa sau gần như không sửa được.",
    },
    {
      q: "Móng nối hay gãy ngang là do đâu?",
      a: "Thường do móng không có apex: lớp gel phẳng và mỏng đều, mỏng ngay vùng chịu lực là nơi cần dày nhất. Độ dài quá mức so với móng thật cũng làm lực dồn về vùng này lớn hơn. Cách sửa là đặt gel đúng chỗ, không phải đắp dày cả móng.",
    },
    {
      q: "Móng cắn sát có nối bằng form được không?",
      a: "Khó. Khi móng thật gần như không còn đầu móng, form khó tựa và phần nối phải gánh gần như mọi thứ. Còn nếu móng tách khỏi nền, đổi màu hoặc da quanh móng sưng đỏ thì không làm, và nên đi khám.",
    },
    {
      q: "Nối móng form bao lâu thì phải dặm?",
      a: "Thường cứ 3–4 tuần. Móng mọc làm điểm apex trôi về phía đầu móng, móng nặng đầu và dễ gãy. Để quá lâu, móng nối gãy có khi kéo theo cả móng thật bên dưới.",
    },
  ],
  related: ["noi-mong-form", "builder-gel-hieu-dung", "dap-bot-hieu-dung", "fill-mong-hieu-dung"],
};

export default article;
