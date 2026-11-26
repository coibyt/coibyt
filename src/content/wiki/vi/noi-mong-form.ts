import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/noi-mong-form/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-noi-mong-bang-form",
  lesson: "noi-mong-form",
  category: "nail",
  title: "Cách nối móng bằng form và builder gel: 10 bước từ gắn form đến dũa hoàn thiện",
  metaTitle: "Cách nối móng bằng form: 10 bước với builder gel",
  metaDescription:
    "Hướng dẫn cách nối móng bằng form từng bước: chọn độ dài, cắt và gắn form khít, kiểm tra ba hướng, dựng phần nối, tạo apex, gỡ form, dũa và dặn khách.",
  keyword: "cách nối móng bằng form",
  keywords: ["cách nối móng bằng form giấy", "cách gắn form nối móng", "các bước nối móng gel", "nối móng bằng builder gel", "cách gỡ form nối móng", "dũa móng nối", "nối móng form cho người mới"],
  excerpt: "Quy trình nối dài móng bằng builder gel trên form: mười bước theo thứ tự, cách kiểm tra form từ ba hướng, cách gỡ form và những lỗi phải sửa ngay tại bàn.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("tho-nail-noi-mong-bang-form-tai-salon"),
    alt: "Nữ thợ nail tóc búi đeo găng đen đang nối móng cho khách tại bàn đá trắng trong salon có đèn chùm và gương mạ vàng",
  },
  takeaways: [
    "Ba điều giữ suốt buổi làm: **form khít và thẳng**, gel không chạm da, apex nằm đúng chỗ.",
    "Dũa ngắn đầu móng thật nhưng **chừa lại một chút** để form có chỗ tựa.",
    "Gắn form xong, nhìn từ trên xuống, từ đầu móng và từ cạnh bên rồi mới đặt gel.",
    "Phần nối trên form chỉ là **một tấm nền mỏng**. Độ chắc đến từ lớp phủ có apex ở vùng chịu lực.",
    "Gỡ form bằng cách nới hai đuôi rồi **kéo xuống dưới**, không bẻ ngược lên.",
  ],
  intro: [
    "Cách nối móng bằng form gồm hai việc nối tiếp nhau: đặt một cái khuôn thật chuẩn dưới đầu móng, rồi dựng builder gel lên trên khuôn đó. Phần gel thì bạn đã quen từ bài builder gel trên móng thật. Phần mới, và cũng là phần quyết định dáng móng, là cái form.",
    "Bài viết đi theo bài học “Nối móng bằng form: thực hành từng bước” trong khóa Nghề Nail của VaraaAi Academy. Sau bài này bạn làm được trọn quy trình: chọn độ dài cùng khách, cắt và gắn form, dựng phần nối, tạo apex, gỡ form, dũa hoàn thiện và hẹn lịch dặm.",
  ],
  sections: [
    {
      id: "ba-dieu-xuyen-suot",
      title: "Ba điều xuyên suốt khi nối móng bằng form",
      blocks: [
        {
          ol: [
            "**Form khít và thẳng.** Form ôm sát dưới đầu móng, không hở, và nối tiếp đường móng thật. Gel chỉ đi theo form.",
            "**Gel không chạm da.** Ở chân móng, ở hai khóe, và cả ở mép form, nơi gel có thể chảy xuống đầu ngón tay.",
            "**Apex nằm đúng chỗ.** Điểm cao nhất của lớp gel nằm trên vùng chịu lực, chỗ móng thật rời khỏi nền da, để gánh phần móng dài phía trước.",
          ],
        },
        { p: "Vì sao form lệch một chút lại làm hỏng cả bộ móng, và nên tư vấn độ dài thế nào, đã có trong bài lý thuyết [nối móng form là gì](lesson:noi-mong-form-hieu-dung). Bài này chỉ tập trung vào đôi tay." },
      ],
    },
    {
      id: "kiem-tra-form-ba-huong",
      title: "Cách kiểm tra form từ ba hướng trước khi đặt gel",
      blocks: [
        { p: "Đây là mấy giây đáng giá nhất của cả buổi làm. Form lệch hay nghiêng làm sai cả khung móng, và dũa sau gần như không sửa được. Hãy kiểm tra khi trên form chưa có giọt gel nào." },
        {
          table: {
            head: ["Hướng nhìn", "Form đúng trông thế nào"],
            rows: [
              ["Từ trên xuống", "Thẳng hàng với ngón tay, nằm chính giữa móng"],
              ["Từ đầu móng", "Nằm ngang, không nghiêng bên nào"],
              ["Từ cạnh bên", "Nối tiếp đường móng, không chúc xuống, không vểnh lên"],
            ],
          },
        },
        { img: { src: img("kiem-tra-form-noi-mong-tu-dau-mong"), alt: "Đầu ngón tay hướng thẳng vào ống kính, form kim loại nằm ngang sát dưới đầu móng, cân đều hai bên", caption: "Nhìn từ đầu móng: form nằm ngang, không nghiêng bên nào." } },
        { img: { src: img("kiem-tra-form-noi-mong-tu-canh-ben"), alt: "Ngón tay nhìn ngang từ cạnh bên, form kim loại mỏng đi thẳng ra từ đầu móng như phần móng mọc dài thêm", caption: "Nhìn từ cạnh bên: form nối tiếp đường móng, không chúc xuống, không vểnh lên." } },
        { p: "Thấy đúng cả ba hướng rồi mới bóp hai đuôi form lại với nhau ở dưới ngón tay cho form đứng yên." },
      ],
    },
    {
      id: "tung-ngon-va-tam-nen",
      title: "Làm từng ngón, và vì sao phần nối chỉ cần mỏng",
      blocks: [
        { p: "Mỗi ngón một form. Lúc mới học, hãy làm từng ngón một: gắn form, dựng phần nối, hơ, rồi mới sang ngón khác. Khi tay đã quen, bạn có thể gắn form nhiều ngón một lượt. Ngón cái thường làm riêng, vì nó nằm nghiêng so với các ngón khác và khó vào đèn cùng lúc." },
        { p: "Thợ mới hay dồn thật nhiều gel lên form vì sợ phần nối yếu. Làm vậy khó giữ dáng và gel dễ tràn qua mép form. Phần nối chỉ cần mỏng như một tấm nền. Độ chắc đến từ lớp phủ phía sau, lớp có điểm apex nằm đúng trên vùng chịu lực." },
        { img: { src: img("up-tay-khach-cho-gel-don-ve-giua"), alt: "Thợ nail đeo găng đen giữ bàn tay khách lật ngửa trên gối kê, móng nối còn gắn form hướng xuống mặt bàn", caption: "Sau lớp phủ, úp tay khách vài giây để gel dồn về giữa thành một đường cong mềm." } },
        { note: "Khách thấy nóng rát khi hơ thì cho khách rút tay ra vài giây, rồi đưa vào lại và hơ tiếp cho đủ. Thời gian hơ, chế độ đèn và cách làm lớp lót (hơ hay không hơ) luôn theo hướng dẫn của hãng.", kind: "warn", title: "Khi hơ đèn" },
      ],
    },
    {
      id: "loi-thuong-gap",
      title: "Lỗi thường gặp khi nối móng form và cách sửa",
      blocks: [
        {
          table: {
            head: ["Bạn thấy gì", "Nguyên nhân", "Cách xử lý"],
            rows: [
              ["Gờ gel ở mặt dưới phần nối, hoặc gel bám xuống da dưới đầu móng", "Form chưa khít, gel chảy xuống khe hở", "Dũa nhẹ cho sạch. Lần sau cắt lại đường cong của form và đẩy form khít hơn"],
              ["Phần nối nứt hoặc bong khi gỡ form", "Bẻ form ngược lên, hoặc gỡ khi gel chưa chín hẳn", "Hơ đủ thời gian, nới hai đuôi rồi kéo form xuống dưới"],
              ["Apex thấp, hoặc một bên dày một bên mỏng", "Hạt gel đặt lệch, hoặc dũa mất điểm cao nhất", "Sửa bằng dũa, hoặc thêm một lớp mỏng, hơ rồi dũa lại"],
              ["Gel dính da ở chân móng hay đầu ngón tay", "Dẫn gel quá sát da, hoặc gel tràn qua mép form", "Dừng cách da một khe như sợi tóc; lỡ dính thì lau sạch trước khi hơ"],
              ["Chân móng mỏng, khách thấy đau khi dũa", "Dũa ăn vào móng thật", "Ở chân móng chỉ dũa nhẹ phần gel cho mỏng và liền"],
            ],
          },
        },
      ],
    },
    {
      id: "dan-khach-sau-khi-noi-mong",
      title: "Dặn khách sau khi nối móng",
      blocks: [
        { p: "Khách vừa có thêm một đoạn móng mà bàn tay chưa quen. Vài lời dặn lúc xoa dầu dưỡng giúp bộ móng qua được những ngày đầu:" },
        {
          ul: [
            "Mấy ngày đầu cẩn thận với độ dài mới khi mở cửa xe, gõ phím, cài khuy áo.",
            "Đừng cạy, đừng dùng móng làm dụng cụ.",
            "Đeo găng khi rửa chén và lau dọn.",
            "Thấy hở hay nứt thì quay lại tiệm. Đừng tự lột, đừng tự dán.",
            "Hẹn dặm sau khoảng 3–4 tuần.",
          ],
        },
        { p: "Khi khách đã về, form giấy đã dùng được bỏ vào thùng rác có nắp. Form kim loại thì làm sạch và khử khuẩn trước khi dùng lại, cùng với các dụng cụ kim loại khác, theo bài [xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu)." },
      ],
    },
    {
      id: "hen-lich-dam-va-ghi-chu",
      title: "Hẹn lịch dặm và ghi lại dáng móng của khách",
      blocks: [
        { p: "Móng nối chỉ bền khi khách dặm đúng hẹn. Trong VaraaAi, lúc khách thanh toán, bạn đặt luôn buổi dặm 3–4 tuần sau trên [lịch hẹn](lesson:lich-hen). Độ dài và dáng móng khách đã chọn nên được ghi vào ghi chú trong [hồ sơ khách hàng](lesson:khach-hang), để lần sau bất kỳ thợ nào trong tiệm cũng làm lại được giống hệt. Nếu tiệm chưa có dịch vụ nối móng trên trang đặt lịch, bạn [thêm dịch vụ](lesson:dich-vu) với đúng thời lượng thật của mình." },
      ],
    },
  ],
  howTo: {
    title: "Các bước nối móng bằng form và builder gel",
    id: "cac-buoc-noi-mong-bang-form",
    after: "ba-dieu-xuyen-suot",
    lead: "Mười bước theo đúng thứ tự trong video bài học. Bước 3 và bước 4 là phần riêng của nối móng, đừng làm vội.",
    supplies: [
      "Form giấy hoặc form kim loại, kéo nhỏ để cắt form giấy",
      "Cây đẩy da đã tiệt trùng, dũa 180, phao chà mịn",
      "Bông không xơ và dung dịch lau móng",
      "Builder gel và cọ đắp gel",
      "Đèn hơ đúng loại hãng gel yêu cầu",
      "Máy hút bụi, khẩu trang, chổi phủi bụi",
      "Gel màu nếu khách muốn, gel top, dầu dưỡng, găng tay",
    ],
    steps: [
      {
        name: "Tư vấn, kiểm tra và chọn độ dài",
        text: "Rửa tay, sát khuẩn tay cho mình và cho khách, rồi nhìn kỹ móng và da quanh móng. Móng tách khỏi nền, đổi màu, da sưng đỏ, có mủ hay có vết thương hở thì không làm và khuyên khách đi khám. Hỏi khách đã từng bị ngứa, đỏ, phồng da sau khi làm gel chưa. Cùng khách chọn độ dài và dáng móng hợp với móng thật và công việc hằng ngày; lần đầu nối nên vừa phải. Nói trước rằng khoảng 3–4 tuần cần quay lại dặm.",
      },
      {
        name: "Chuẩn bị móng khô",
        text: "Làm như khi [sơn gel](lesson:son-gel) và khi [đắp builder gel](lesson:builder-gel): đẩy da, chà nhẹ cho mất độ bóng, phủi bụi, lau sạch, rồi không chạm tay vào mặt móng nữa. Đầu móng thật dũa ngắn và gọn nhưng chừa lại một chút. Không còn đầu móng thì form không có chỗ tựa.",
      },
      {
        name: "Ướm và cắt form cho khớp",
        text: "Bóc form ra, ướm thử dưới đầu móng. Nếu đường cong của form không vừa đầu móng thì cắt lại cho khớp, để form ôm sát dưới đầu móng và không hở. Mỗi móng một đường cong khác nhau, nên đừng ngại cắt lại cho từng ngón.",
        image: { src: img("cat-form-giay-cho-khop-dau-mong"), alt: "Hai bàn tay đeo găng đen dùng kéo nhỏ màu vàng cắt lại đường cong khoét sẵn trên một tấm form giấy màu vàng", caption: "Cắt lại đường cong của form giấy cho vừa đầu móng của từng ngón." },
      },
      {
        name: "Gắn form và kiểm tra ba hướng",
        text: "Luồn form vào dưới đầu móng, đẩy cho khít, không để khe hở. Nhìn từ trên xuống, từ đầu móng và từ cạnh bên. Khi cả ba hướng đều đúng, bóp hai đuôi form lại với nhau ở dưới ngón tay cho form đứng yên.",
        image: { src: img("kiem-tra-form-noi-mong-tu-tren-xuong"), alt: "Nhìn từ trên xuống một ngón tay có form kim loại gắn dưới đầu móng, form thẳng hàng với ngón và nằm chính giữa", caption: "Nhìn từ trên xuống: form thẳng hàng với ngón tay, ở chính giữa móng." },
      },
      {
        name: "Phủ lớp lót thật mỏng",
        text: "Lấy một chút gel, ấn và chà nhẹ vào mặt móng, gạt bớt phần thừa và chừa một đường nhỏ cách da. Hơ, hoặc để ướt, đúng như hướng dẫn của hãng gel bạn dùng.",
      },
      {
        name: "Dựng phần nối trên form",
        text: "Lấy gel, đặt ngay trước mép móng thật, rồi dàn mỏng ra trên form thành phần móng dài, liền với mép móng thật. Tạo luôn độ dài và dáng đầu móng ngay lúc này, với hai cạnh bên thẳng, đi tiếp cạnh móng thật. Gel không được tràn qua mép form. Lớp này mỏng thôi, rồi hơ đèn theo thời gian của hãng.",
        image: { src: img("dung-phan-noi-bang-gel-tren-form"), alt: "Cọ dẹt dàn lớp builder gel hồng trong từ mép móng thật ra trên tấm form kim loại, tạo thành phần móng dài" },
      },
      {
        name: "Phủ lớp gel thứ hai và tạo apex",
        text: "Đặt một hạt gel ở vùng chịu lực, chỗ móng thật rời khỏi nền da. Dẫn nhẹ gel về phía chân móng và dừng cách da một khe nhỏ như sợi tóc, rồi dẫn ra hai cạnh và ra hết phần nối, bọc kín đầu móng. Lật tay khách úp xuống, giữ yên vài giây cho gel dồn về giữa. Lật lên, nhìn từ cạnh bên và từ đầu móng, sửa ngay khi gel còn ướt. Hơ đủ thời gian và lau lớp dính nếu sản phẩm có.",
        image: { src: img("dat-hat-gel-o-vung-chiu-luc-tao-apex"), alt: "Đầu cọ đặt một hạt builder gel lên phần giữa của móng đã có lớp nối trên form kim loại, gần chỗ móng thật kết thúc", caption: "Hạt gel của lớp phủ đặt ở vùng chịu lực, không đặt sát chân móng." },
      },
      {
        name: "Gỡ form",
        text: "Nới nhẹ hai đuôi form, rồi kéo form xuống phía dưới để tách khỏi đầu móng. Đừng bẻ ngược lên, vì có thể làm nứt hay bong phần nối. Nhìn mặt dưới phần nối: phải phẳng, sạch và liền với móng thật. Có gờ gel thì dũa nhẹ cho sạch.",
        image: { src: img("go-form-noi-mong-keo-xuong-duoi"), alt: "Bàn tay đeo găng đen kéo tấm form kim loại xuống dưới, tách khỏi một móng nối dáng hạnh nhân màu hồng sữa đã hơ chín" },
      },
      {
        name: "Dũa hoàn thiện",
        text: "Bật máy hút bụi, đeo khẩu trang, dùng dũa 180. Dũa đầu móng cho đúng dáng, dũa hai cạnh bên thẳng và song song. Đặt dũa nằm trên mặt móng, dũa cho mịn và đều nhưng giữ lại điểm apex. Ở chân móng, dũa nhẹ cho mỏng và liền với móng thật mà không dũa vào móng thật. Phủi bụi bằng chổi, không thổi, lau sạch, rồi nhìn lại từ ba hướng: các móng phải cùng độ dài, cùng dáng, apex cao vừa phải.",
        image: { src: img("dua-dau-mong-noi-bang-dua-180"), alt: "Cây dũa xám áp vào đầu một móng nối dáng hạnh nhân để tạo dáng, ngón tay khách được giữ bằng găng đen" },
      },
      {
        name: "Màu, top, dầu dưỡng",
        text: "Khách thích tự nhiên thì một lớp top bóng là đủ. Muốn có màu thì sơn gel màu thật mỏng. Lớp top bọc qua mép đầu móng rồi hơ đủ thời gian. Cuối cùng nhỏ dầu dưỡng lên da quanh móng, xoa nhẹ, dặn khách cách giữ móng và hẹn lịch dặm.",
      },
    ],
  },
  faq: [
    {
      q: "Nối móng bằng form cần chuẩn bị những gì?",
      a: "Bạn cần form giấy hoặc form kim loại, builder gel và cọ, đèn hơ đúng loại hãng yêu cầu, dũa 180, phao mịn, bông không xơ với dung dịch lau móng, máy hút bụi, khẩu trang và chổi phủi bụi. Cuối buổi cần thêm gel top, dầu dưỡng, và gel màu nếu khách muốn.",
    },
    {
      q: "Có cần để lại đầu móng thật khi nối form không?",
      a: "Có. Đầu móng thật được dũa ngắn và gọn, nhưng phải chừa lại một chút để form có chỗ tựa vào. Form luồn dưới phần đầu móng này và được đẩy cho khít.",
    },
    {
      q: "Kiểm tra form đã gắn đúng chưa bằng cách nào?",
      a: "Nhìn từ ba hướng trước khi đặt gel. Từ trên xuống, form thẳng hàng với ngón tay và ở chính giữa móng. Từ đầu móng, form nằm ngang. Từ cạnh bên, form nối tiếp đường móng, không chúc xuống và không vểnh lên.",
    },
    {
      q: "Gỡ form nối móng thế nào để không nứt phần nối?",
      a: "Chỉ gỡ khi gel đã hơ chín hẳn. Nới nhẹ hai đuôi form, rồi kéo form xuống phía dưới để tách khỏi đầu móng. Không bẻ form ngược lên, vì động tác đó có thể làm nứt hoặc bong phần nối.",
    },
    {
      q: "Mặt dưới móng nối có gờ gel thì xử lý sao?",
      a: "Gờ gel xuất hiện khi form chưa khít và gel chảy xuống khe hở. Bạn dũa nhẹ cho sạch phần gờ đó. Lần sau, ướm form kỹ hơn và cắt lại đường cong cho form ôm sát dưới đầu móng.",
    },
    {
      q: "Người mới học nên gắn form cả bàn tay hay từng ngón?",
      a: "Từng ngón một: gắn form, dựng phần nối, hơ, rồi mới sang ngón khác. Khi tay đã quen thì có thể gắn form nhiều ngón một lượt. Ngón cái thường làm riêng vì nó nằm nghiêng so với các ngón khác và khó vào đèn cùng lúc.",
    },
  ],
  related: ["noi-mong-form-hieu-dung", "builder-gel", "dap-bot-acrylic", "fill-mong"],
};

export default article;
