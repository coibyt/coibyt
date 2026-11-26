import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/spa-facial/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "quy-trinh-cham-soc-da-mat",
  lesson: "spa-facial",
  category: "spa",
  title: "Quy trình chăm sóc da mặt tại spa: 14 bước facial cơ bản từ tẩy trang đến chống nắng",
  metaTitle: "Quy trình chăm sóc da mặt tại spa: 14 bước facial cơ bản",
  metaDescription:
    "Quy trình chăm sóc da mặt tại spa từng bước: chuẩn bị giường, tẩy trang, rửa mặt lần hai, soi da, tẩy da chết, khăn ấm, mặt nạ, dưỡng ẩm, lời dặn và dọn dẹp.",
  keyword: "quy trình chăm sóc da mặt",
  keywords: [
    "các bước chăm sóc da mặt tại spa",
    "quy trình facial chuẩn spa",
    "các bước facial cơ bản",
    "cách tẩy trang mắt cho khách",
    "cách đắp mặt nạ tại spa",
    "sau khi chăm sóc da mặt cần kiêng gì",
  ],
  excerpt: "Một buổi facial cơ bản làm từ đầu đến cuối: mười bốn bước, từ lúc lau giường cho tới lúc ghi hồ sơ, kèm những chỗ phải làm nhẹ, bỏ bước hoặc dừng lại.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("chuyen-vien-dap-mat-na-cham-soc-da-mat-tai-spa"),
    alt: "Chuyên viên spa mặc áo kem cầm bát và cọ, thoa mặt nạ cho khách đang nằm che mắt bằng bông trong phòng spa có cửa sổ vòm",
  },
  takeaways: [
    "Xếp đủ mọi thứ lên xe đẩy **trước khi khách nằm**, theo đúng thứ tự sẽ dùng, để không phải bỏ khách nằm đó mà đi tìm đồ.",
    "Tẩy trang mắt: đặt bông lên mắt nhắm vài giây, rồi lau nhẹ xuống. Không chà, không kéo da, không để sản phẩm vào mắt.",
    "Soi da nhanh sau khi rửa mặt và so với phiếu tư vấn. Thấy điều gì đáng lo thì dừng lại.",
    "Thời gian của từng sản phẩm theo hướng dẫn của hãng. Khách thấy rát hay da đỏ lên nhanh thì lau đi ngay.",
    "Lấy nhân mụn **chỉ khi đã được đào tạo** và tiệm cho phép. Chưa học thì bỏ qua bước này và ghi vào hồ sơ.",
  ],
  intro: [
    "Quy trình chăm sóc da mặt ở spa nào cũng có chừng ấy việc: tẩy trang, rửa mặt, tẩy da chết, mặt nạ, kem dưỡng. Khác nhau là ở cách làm từng việc: lực tay nhẹ đến đâu, để sản phẩm bao lâu, và lúc nào thì bỏ một bước. Một buổi làm êm, khách không phải nằm chờ, cũng bắt đầu từ chiếc xe đẩy xếp sẵn trước khi khách bước vào.",
    "Bài viết này đi theo bài học “Chăm sóc da mặt cơ bản: thực hành từng bước” trong khóa Spa & chăm sóc da của VaraaAi Academy. Bài học làm mẫu cho một khách da hỗn hợp, hơi thiếu nước. Đọc xong, bạn làm được trọn một buổi facial cơ bản theo mười bốn bước, biết chỗ nào phải nhẹ tay và biết dọn dẹp, ghi hồ sơ sau khi khách về.",
  ],
  sections: [
    {
      id: "chuan-bi-truoc-khi-khach-nam",
      title: "Trước khi khách nằm xuống: giường, xe đẩy và căn phòng",
      blocks: [
        { p: "Trong một buổi chăm sóc da, hai bàn tay bạn gần như không rời gương mặt khách. Mỗi lần phải quay đi mở tủ, kéo ngăn kéo là một lần khách nằm chờ, và tay bạn chạm vào những thứ chưa chắc đã sạch. Vì vậy phần chuẩn bị được làm xong hết trước khi mời khách vào." },
        { img: { src: img("giuong-spa-va-xe-day-chuan-bi-truoc-khi-facial"), alt: "Giường spa trải ga và khăn trắng sạch trong phòng tường đá kem, bên cạnh là xe đẩy mặt đá xếp sẵn bát, cọ, que gỗ và các chai sản phẩm", caption: "Giường đã thay ga, khăn; xe đẩy xếp sẵn bông, bát, cọ, que lấy kem và sản phẩm." } },
        { note: "Xếp đồ trên xe đẩy theo đúng thứ tự sẽ dùng: nước tẩy trang ở đầu, kem chống nắng ở cuối. Khách không phải nằm chờ, và tay bạn không phải chạm vào tủ hay ngăn kéo giữa chừng.", kind: "tip", title: "Kinh nghiệm trong nghề" },
        { p: "Sản phẩm trên xe đẩy là những thứ đã chọn sau khi soi da và tư vấn, chứ không phải một bộ cố định cho mọi khách. Nếu bạn muốn hiểu vì sao các bước đi theo thứ tự này trước khi bắt tay vào làm, hãy đọc bài [Facial là gì và lý do của từng bước](lesson:spa-facial-hieu-dung)." },
      ],
    },
    {
      id: "lam-nhe-bo-buoc-dung-lai",
      title: "Khi nào làm nhẹ đi, bỏ một bước hoặc dừng hẳn",
      blocks: [
        { p: "Mười bốn bước ở trên là khung. Làn da của từng khách quyết định bạn đi hết khung đó hay bỏ bớt. Bảng sau gom những tình huống mà bài học nhắc đến." },
        {
          table: {
            head: ["Tình huống", "Việc cần làm"],
            rows: [
              ["Soi da thấy chỗ đỏ, rát, trầy xước hoặc điều gì đáng lo", "Dừng lại, đối chiếu với bài [Khi nào không làm cho khách](lesson:khi-nao-khong-lam)"],
              ["Đang tẩy da chết, khách thấy rát hoặc da đỏ lên nhanh", "Lau sản phẩm đi ngay, không chờ hết thời gian"],
              ["Da nhạy cảm hoặc đang đỏ", "Bỏ bước khăn ấm và xông hơi"],
              ["Bạn chưa được đào tạo lấy nhân mụn", "Bỏ bước này, ghi vào hồ sơ để người có chuyên môn làm"],
              ["Gỡ mặt nạ xong có chỗ đỏ lên nhiều", "Ghi lại, chọn kem dưỡng thật dịu"],
              ["Da phản ứng ngay tại tiệm", "Làm theo bài [Xử lý sự cố](lesson:xu-ly-su-co)"],
            ],
          },
        },
        { note: "Lấy nhân mụn chỉ khi bạn đã được đào tạo và khi quy định nơi bạn làm việc cho phép; dụng cụ nặn mụn phải được tiệt trùng. Quy định khác nhau theo từng nước. Bài viết là tài liệu đào tạo, không phải chứng chỉ hành nghề.", kind: "warn", title: "Về bước lấy nhân mụn" },
      ],
    },
    {
      id: "loi-hay-gap",
      title: "Những lỗi nhỏ hay gặp trong các bước facial",
      blocks: [
        { p: "Phần lớn lỗi trong một buổi chăm sóc da mặt không nằm ở sản phẩm. Chúng nằm ở vài thói quen làm cho nhanh." },
        {
          table: {
            head: ["Lỗi", "Vì sao không nên", "Làm đúng"],
            rows: [
              ["Chà bông qua lại trên mắt", "Da quanh mắt rất mỏng", "Đặt bông vài giây cho mascara mềm ra, rồi lau nhẹ xuống"],
              ["Đắp khăn ấm mà chưa thử", "Khăn có thể đang nóng chứ không ấm", "Thử trên cổ tay mình trước"],
              ["Thò ngón tay vào hũ kem", "Cả hũ nhiễm bẩn cho những khách sau", "Lấy bằng que sạch, đặt kem lên mu bàn tay"],
              ["Nặn mụn bằng móng tay, nặn cho bằng được", "Gây tổn thương và để lại vết", "Quấn khăn giấy, ấn thật nhẹ, không ra thì để đó"],
              ["Gỡ mặt nạ vội", "Sót mặt nạ ở chân tóc, dưới cằm, hai bên cánh mũi", "Gỡ từng vùng bằng mút ấm rồi kiểm tra lại ba chỗ đó"],
              ["Để khách nằm một mình lâu khi chờ mặt nạ", "Không ai quan sát da và khách", "Ở lại trong phòng, có thể xoa bóp nhẹ tay hay vai cho khách"],
            ],
          },
        },
      ],
    },
    {
      id: "dan-khach-va-dat-lich",
      title: "Dặn khách sau khi chăm sóc da mặt và hẹn lần sau",
      blocks: [
        { p: "Mời khách ngồi dậy từ từ, rồi nói bốn lời dặn ngắn trước khi khách rời phòng:" },
        {
          ol: [
            "Vài ngày tới, đừng tẩy da chết ở nhà.",
            "Tránh nắng.",
            "Thoa kem chống nắng mỗi sáng.",
            "Da đỏ, rát kéo dài, hay ngứa thì báo ngay cho tiệm.",
          ],
        },
        { p: "Lịch lần sau nên đặt ngay tại quầy, khi khách còn đứng đó. Trong VaraaAi, bạn mở [lịch hẹn](lesson:lich-hen) và giữ chỗ cho khách trong vài thao tác, khách không phải nhớ để nhắn tin lại sau." },
        { img: { src: img("dat-lich-cham-soc-da-lan-sau-tai-quay"), alt: "Chuyên viên spa cầm máy tính bảng đứng ở quầy lễ tân đá kem, mỉm cười trao đổi với khách nữ tóc vàng mặc áo len kem", caption: "Đặt lịch lần sau khi khách còn ở quầy." } },
      ],
    },
    {
      id: "ghi-ho-so-khach",
      title: "Ghi hồ sơ khách: sản phẩm đã dùng và phản ứng của da",
      blocks: [
        { p: "Việc cuối cùng của buổi làm là vài dòng ghi chép: hôm nay dùng sản phẩm gì, da phản ứng thế nào, đã dặn khách điều gì. Lần hẹn sau, bạn hoặc một đồng nghiệp mở ra là biết nên lặp lại gì và tránh gì." },
        { p: "Trong VaraaAi, những dòng này nằm ở ghi chú nội bộ của từng người trong [sổ khách hàng](lesson:khach-hang)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước chăm sóc da mặt tại spa",
    id: "cac-buoc-cham-soc-da-mat",
    after: "chuan-bi-truoc-khi-khach-nam",
    lead: "Mười bốn bước dưới đây theo đúng thứ tự trong video bài học. Thời gian để từng sản phẩm trên da luôn theo hướng dẫn của hãng.",
    supplies: [
      "Ga, khăn và băng đô sạch cho khách mới",
      "Bông, mút lau mặt, bát, cọ và que lấy kem",
      "Nước tẩy trang, sữa rửa mặt, sản phẩm tẩy da chết, mặt nạ, nước cân bằng, kem dưỡng, kem chống nắng đã chọn sau khi soi da",
      "Khăn ấm, hoặc máy xông hơi đã đủ nước",
      "Đèn lúp",
      "Găng tay và khăn giấy mềm; dụng cụ nặn mụn còn trong túi tiệt trùng, nếu bạn được phép làm bước này",
    ],
    steps: [
      {
        name: "Chuẩn bị giường và xe đẩy",
        text: "Lau và khử khuẩn mặt giường, trải ga, khăn và băng đô sạch cho khách mới. Xếp sẵn lên xe đẩy bông, khăn, bát, cọ, que lấy kem và các sản phẩm đã chọn. Kiểm tra máy xông đã đủ nước, khăn ấm đã sẵn sàng và phòng đủ ấm.",
      },
      {
        name: "Mời khách nằm và rửa tay",
        text: "Khách nằm ngửa, đắp khăn và chăn, chỉ để lộ mặt, cổ và vai, đeo băng đô giữ tóc. Hỏi khách có ấm không, gối có vừa không. Khách đeo kính áp tròng thì mời tháo ra trước khi làm vùng mắt. Sau đó bạn rửa tay bằng xà phòng và lau khô, như trong bài [Rửa tay và găng tay](lesson:rua-tay-gang-tay).",
      },
      {
        name: "Tẩy trang mắt, môi rồi cả mặt",
        text: "Bắt đầu từ mắt: đặt bông thấm nước tẩy trang lên mắt đang nhắm, giữ vài giây cho lớp mascara mềm ra, rồi lau nhẹ xuống dưới. Không chà, không kéo da, không để sản phẩm chảy vào mắt. Tiếp theo lau môi thật nhẹ, sau đó mới tẩy trang cả mặt.",
      },
      {
        name: "Rửa mặt lần hai",
        text: "Lấy sữa rửa mặt ra lòng bàn tay, xoa cho ấm, rồi thoa lên mặt và cổ bằng những vòng tròn nhỏ, đi từ cằm lên má rồi lên trán. Lực nhẹ, đều, hai tay đối xứng, tránh vùng mắt. Lau bằng mút ấm, ẩm cho đến khi không còn sữa rửa mặt trên da.",
        image: { src: img("rua-mat-lan-hai-bang-vong-tron-nho"), alt: "Hai bàn tay chuyên viên xoa sữa rửa mặt trên hai má khách nữ đeo băng đô trắng, nhìn thẳng từ trên xuống", caption: "Hai tay đối xứng, vòng tròn nhỏ, lực nhẹ và đều." },
      },
      {
        name: "Soi da nhanh dưới đèn lúp",
        text: "Trên làn da vừa sạch, soi nhanh dưới đèn lúp và so với phiếu tư vấn: có gì khác không, hôm nay có chỗ nào đỏ, rát hay trầy xước không. Cách soi từng vùng có trong bài [Soi da và tư vấn](lesson:spa-soi-da). Thấy điều gì đáng lo thì dừng lại ở đây.",
        image: { src: img("soi-da-nhanh-duoi-den-lup"), alt: "Chuyên viên cúi nhìn má khách qua đèn lúp tròn có ánh sáng trắng, khách nằm che mắt bằng bông trên giường spa" },
      },
      {
        name: "Tẩy da chết",
        text: "Chọn loại theo kết quả soi da; với làn da hơi thiếu nước trong bài học, đó là một loại dịu nhẹ. Đặt bông che mắt, dùng cọ thoa một lớp mỏng, tránh vùng mắt và môi. Để đúng thời gian hãng ghi và quan sát da suốt lúc đó. Khách thấy rát hay da đỏ lên nhanh thì lau đi ngay. Xong, lau sạch bằng mút ấm.",
      },
      {
        name: "Làm ấm da bằng khăn ấm hoặc xông hơi",
        text: "Thử độ ấm của khăn trên cổ tay mình, rồi đắp lên mặt khách, chừa mũi và miệng để khách thở thoải mái, giữ trong chốc lát. Nếu xông hơi, đặt máy cách mặt đủ xa và chỉ xông thời gian ngắn. Da nhạy cảm hay đang đỏ thì bỏ qua bước này.",
        image: { src: img("dap-khan-am-len-mat-chua-mui-mieng"), alt: "Khách nằm trên giường spa với khăn bông trắng ấm quấn quanh trán và hai bên mặt, hai bàn tay chuyên viên giữ nhẹ khăn ở hai má", caption: "Khăn chỉ ấm, không nóng, và không che mũi, miệng." },
      },
      {
        name: "Lấy nhân mụn, nếu bạn được phép làm",
        text: "Đeo găng, quấn khăn giấy mềm quanh hai đầu ngón tay và ấn thật nhẹ hai bên nhân mụn. Ra thì thôi, không ra thì để đó; không dùng móng tay, không nặn mạnh, và làm thật ngắn. Xong, lau vùng đó bằng sản phẩm làm dịu theo hướng dẫn của hãng. Nếu dùng dụng cụ nặn mụn thì phải là dụng cụ đã tiệt trùng, lấy ra từ túi kín. Chưa được học thì bỏ qua bước này và ghi vào hồ sơ.",
        image: { src: img("lay-nhan-mun-bang-khan-giay-va-gang-tay"), alt: "Hai bàn tay đeo găng đen, đầu ngón quấn khăn giấy trắng, ấn nhẹ hai bên một điểm trên cằm của khách đang nhắm mắt" },
      },
      {
        name: "Đắp mặt nạ hợp với da",
        text: "Dùng cọ thoa đều từ cổ lên cằm, lên má, mũi, rồi trán; chừa mắt, lỗ mũi và môi. Để theo thời gian của hãng. Trong lúc chờ, bạn có thể xoa bóp nhẹ tay hay vai cho khách, và đừng để khách nằm một mình quá lâu.",
      },
      {
        name: "Gỡ mặt nạ bằng mút ấm",
        text: "Gỡ nhẹ nhàng từng vùng bằng mút ấm, ẩm, không chà mạnh. Kiểm tra quanh chân tóc, dưới cằm và hai bên cánh mũi, là những chỗ hay sót. Rồi nhìn lại da: chỗ nào đỏ lên nhiều thì ghi lại và chọn kem dưỡng thật dịu.",
        image: { src: img("go-mat-na-bang-mut-am"), alt: "Chuyên viên dùng mút tròn lau mặt nạ đất sét xanh trên mặt khách, một nửa mặt đã sạch, nửa kia còn mặt nạ" },
      },
      {
        name: "Lau nước cân bằng",
        text: "Thấm nước cân bằng vào bông và lau nhẹ khắp mặt. Đây là bước ngắn, không cần ấn hay chà.",
      },
      {
        name: "Dưỡng ẩm và chống nắng",
        text: "Lấy kem ra khỏi hũ bằng que sạch, đặt lên mu bàn tay, không thò tay vào hũ. Thoa bằng những đường vuốt nhẹ, hướng lên trên và ra ngoài. Nếu là ban ngày, thoa kem chống nắng ở bước cuối cùng.",
        image: { src: img("thoa-kem-duong-am-vuot-len-va-ra-ngoai"), alt: "Hai bàn tay chuyên viên vuốt kem dưỡng trên hai má khách theo hướng lên trên và ra ngoài, khách nhắm mắt thư giãn", caption: "Đường vuốt nhẹ, hướng lên và ra ngoài." },
      },
      {
        name: "Dặn khách và đặt lịch lần sau",
        text: "Mời khách ngồi dậy từ từ. Dặn khách vài ngày tới không tẩy da chết ở nhà, tránh nắng, thoa kem chống nắng mỗi sáng, và báo ngay cho tiệm nếu da đỏ, rát kéo dài hay ngứa. Sau đó đặt lịch lần sau ngay tại quầy.",
      },
      {
        name: "Dọn dẹp, ghi hồ sơ và rửa tay",
        text: "Đeo găng. Khăn, băng đô, ga giường cho vào giỏ đồ giặt có nắp; bông, khăn giấy, que dùng một lần bỏ vào thùng rác có nắp. Cọ và bát rửa sạch rồi khử khuẩn; dụng cụ nặn mụn mang đi làm sạch và tiệt trùng, như trong bài [Xử lý dụng cụ sau mỗi khách](lesson:ve-sinh-dung-cu). Cuối cùng ghi vào hồ sơ khách sản phẩm đã dùng, da phản ứng thế nào và lời dặn, rồi rửa tay.",
        image: { src: img("don-dep-sau-buoi-cham-soc-da-mat"), alt: "Chuyên viên đeo găng đen bỏ khăn đã dùng vào giỏ mây có nắp và bông vào thùng rác đạp chân, trên xe đẩy có khay cọ đã dùng để riêng" },
      },
    ],
  },
  faq: [
    {
      q: "Các bước chăm sóc da mặt tại spa gồm những gì?",
      a: "Một buổi facial cơ bản gồm: chuẩn bị giường và dụng cụ, mời khách nằm, tẩy trang mắt, môi và cả mặt, rửa mặt lần hai, soi da nhanh, tẩy da chết, khăn ấm hoặc xông hơi, lấy nhân mụn nếu người làm đã được đào tạo, đắp và gỡ mặt nạ, nước cân bằng, dưỡng ẩm, chống nắng nếu là ban ngày. Sau đó là lời dặn, đặt lịch lần sau và dọn dẹp.",
    },
    {
      q: "Tẩy trang mắt cho khách thế nào là đúng?",
      a: "Đặt bông thấm nước tẩy trang lên mắt đang nhắm, giữ vài giây cho lớp mascara mềm ra, rồi lau nhẹ xuống dưới. Không chà, không kéo da và không để sản phẩm chảy vào mắt, vì da quanh mắt rất mỏng. Khách đeo kính áp tròng thì mời tháo ra trước.",
    },
    {
      q: "Đắp mặt nạ và tẩy da chết để trên da bao lâu?",
      a: "Theo đúng thời gian hãng ghi trên sản phẩm, không để lâu thêm. Trong lúc chờ, người làm luôn quan sát da. Với sản phẩm tẩy da chết, nếu khách thấy rát hay da đỏ lên nhanh thì lau đi ngay, không chờ hết thời gian.",
    },
    {
      q: "Chưa học lấy nhân mụn thì có nên nặn mụn cho khách không?",
      a: "Không. Lấy nhân mụn sai cách gây tổn thương và để lại vết, nên chỉ người đã được đào tạo mới làm, ở nơi quy định cho phép. Nếu chưa học, bạn bỏ qua bước này và ghi vào hồ sơ để người có chuyên môn làm.",
    },
    {
      q: "Sau khi chăm sóc da mặt ở spa cần kiêng gì?",
      a: "Trong vài ngày, không tẩy da chết ở nhà, tránh nắng và thoa kem chống nắng mỗi sáng. Nếu da đỏ, rát kéo dài hay ngứa thì báo ngay cho tiệm đã làm.",
    },
    {
      q: "Vì sao phải lấy kem dưỡng bằng que mà không dùng tay?",
      a: "Thò ngón tay vào hũ làm cả hũ kem nhiễm bẩn cho những khách sau. Cách làm đúng là dùng que sạch lấy kem, đặt lên mu bàn tay rồi mới thoa lên mặt khách.",
    },
  ],
  related: ["spa-facial-hieu-dung", "spa-soi-da", "spa-massage-mat", "ve-sinh-dung-cu"],
};

export default article;
