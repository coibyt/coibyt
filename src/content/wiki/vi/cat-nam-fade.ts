import type { WikiArticle } from "@/lib/wiki/types";

const img = (name: string) => `/wiki/cat-nam-fade/${name}.webp`;

const article: WikiArticle = {
  locale: "vi",
  slug: "cach-cat-toc-fade",
  lesson: "cat-nam-fade",
  category: "hair",
  title: "Cách cắt tóc fade: 10 bước cho một đường mid fade mượt, không vạch",
  metaTitle: "Cách cắt tóc fade: 10 bước mid fade mượt, không vạch",
  metaDescription:
    "Cách cắt tóc fade từng bước: chọn độ cao, kẻ đường chuẩn, chia dải, nối bằng cần gạt và cữ nửa số, xoá vạch, cạo phần sát da, kiểm tra dưới đèn và nối với đỉnh.",
  keyword: "cách cắt tóc fade",
  keywords: [
    "các bước cắt fade",
    "cách cắt mid fade",
    "cách cắt skin fade",
    "kỹ thuật cắt fade bằng tông đơ",
    "cách xoá vạch khi cắt fade",
    "đường chuẩn khi cắt fade",
    "tự học cắt fade",
  ],
  excerpt: "Một đường fade trung bình, dưới cùng sát da, làm theo mười bước: đường chuẩn, từng dải, xoá vạch, phần sát da, kiểm tra dưới đèn và nối với phần đỉnh.",
  published: "2026-11-26",
  updated: "2026-11-26",
  hero: {
    src: img("khach-xem-duong-fade-bang-guong-tay"),
    alt: "Khách nam mỉm cười quay đầu xem mái bên vừa cắt fade, người thợ đứng phía sau cầm gương tay tròn viền đồng soi phần gáy",
  },
  takeaways: [
    "Kẻ **đường chuẩn** vòng quanh đầu trước, cùng một độ cao ở hai bên. Mọi thứ phía dưới dựa vào đường này.",
    "Ở mỗi chỗ dừng, lật cổ tay **hất tông đơ ra** như múc. Kéo thẳng ra là để lại vạch.",
    "Nối từ dưới lên, mỗi vạch dùng một độ dài nằm giữa: mở cần gạt thêm một chút hoặc lắp cữ nửa số.",
    "Phủi tóc vụn giữa các lượt và kiểm tra dưới đèn, vì tóc vụn che mất vạch.",
    "Một bên cao hơn thì chỉ có thể nâng bên thấp lên. Hãy cẩn thận ngay từ đường chuẩn.",
  ],
  intro: [
    "Cách cắt tóc fade không có bí quyết nào giấu trong chiếc tông đơ đắt tiền. Một đường fade mượt đến từ thứ tự làm: kẻ một đường chuẩn, chia phần dưới thành từng dải, rồi kiên nhẫn nối các dải lại bằng những bước rất nhỏ. Người mới hay bỏ qua thứ tự ấy, đi máy lên xuống cho tới khi hết vạch, và kết quả là đường fade cao hơn nhiều so với điều khách muốn.",
    "Bài viết này đi lại quy trình của bài học “Cắt fade: thực hành từng bước” trong khóa Nghề Tóc của VaraaAi Academy. Kiểu mẫu là một đường fade trung bình (mid fade), dưới cùng sát da, nối mềm lên phần đỉnh để khoảng năm phân, chải ra sau và hơi lệch một bên. Làm theo, bạn cắt được trọn kiểu này và biết sửa vạch đúng chỗ. Nếu chưa rõ các độ cao fade, skin fade và taper, hãy đọc trước bài [Fade là gì](lesson:cat-nam-fade-hieu-dung).",
  ],
  sections: [
    {
      id: "thong-nhat-do-cao",
      title: "Trước khi cắt: chọn độ cao fade cùng khách",
      blocks: [
        { p: "Độ cao fade là điều thống nhất giữa thợ và khách, không có quy chuẩn chung. Bạn hỏi hai câu: khách muốn fade thấp, trung bình hay cao, và có muốn thấy da ở dưới cùng không. Sau đó chỉ thẳng lên đầu khách trong gương: đường fade sẽ bắt đầu ở đây. Phần đỉnh để lại bao nhiêu thì thống nhất như trong bài [Cách cắt tóc nam cơ bản](lesson:cat-nam-co-ban)." },
        {
          ul: [
            "Sờ dáng đầu để tìm đường vòng đầu, xương chẩm và chỗ phẳng ở phía sau.",
            "Nhìn da đầu xem có sẹo không, và tìm xoáy ở đỉnh, ở gáy.",
            "Da đầu có vết thương hay đang viêm thì không cạo sát.",
          ],
        },
        { note: "Khách làm fade lần đầu, hãy gợi ý bắt đầu thấp hơn một chút. Lần sau muốn cao hơn thì dễ. Cao rồi thì phải đợi tóc mọc.", kind: "tip", title: "Kinh nghiệm trong nghề" },
      ],
    },
    {
      id: "cu-hat-co-tay",
      title: "Cú hất cổ tay: động tác quyết định fade có vạch hay không",
      blocks: [
        { p: "Trong cả quy trình, có một động tác lặp lại ở mọi dải: tới chỗ dừng thì lật cổ tay, đưa tông đơ rời khỏi đầu theo một đường cong nhỏ, như múc một thìa. Lưỡi rời tóc từ từ nên phần tóc ở chỗ dừng dài dần ra, và mép của dải mờ đi." },
        { img: { src: img("hat-tong-do-ra-o-cho-dung"), alt: "Cận cảnh mái bên của khách nam: tông đơ gắn cữ đen đang ở cuối đường đi lên, bàn tay kia của thợ giữ phần tóc đỉnh", caption: "Cuối mỗi đường đi lên, cổ tay lật ra để máy rời khỏi đầu theo đường cong." } },
        { p: "Nếu bạn dừng lại rồi kéo máy thẳng ra, tất cả tóc bên dưới bị cắt bằng nhau tới đúng một đường, và đường ấy chính là vạch. Ấn mạnh cho đường rõ hơn còn tệ hơn, vì để lại cả vạch lẫn lỗ." },
        { note: "Cú hất đến từ cổ tay, không phải từ cả cánh tay. Cổ tay thả lỏng thì chỗ dừng không thành vạch.", kind: "tip", title: "Thả lỏng cổ tay" },
      ],
    },
    {
      id: "duong-chuan-can-hai-ben",
      title: "Đường chuẩn khi cắt fade: theo dáng đầu và cân hai bên",
      blocks: [
        { p: "Đường chuẩn đi vòng quanh đầu ở cùng một độ cao, nhưng phía sau nó đi theo dáng đầu. Nếu đầu khách phẳng ở phía sau, bạn hạ đường chuẩn ở đó xuống một chút để giữ độ tròn." },
        { img: { src: img("duong-chuan-fade-phia-sau-dau"), alt: "Nhìn từ phía sau, người thợ đưa tông đơ gắn cữ đen đi lên ở phần sau đầu của khách nam, tay kia đặt nhẹ trên cổ khách", caption: "Phía sau: máy đi từ chân tóc gáy lên, đường chuẩn theo dáng đầu." } },
        { p: "Xong một vòng, bạn dừng lại nhìn: đường chuẩn có thẳng không, hai bên có cân không. Kiểm tra lúc này rất đáng công. Về sau, nếu một bên fade cao hơn bên kia, bạn không hạ nó xuống được nữa vì tóc đã ngắn. Cách sửa duy nhất là nâng bên thấp lên cho bằng, tức là cả đường fade cao hơn dự định." },
      ],
    },
    {
      id: "loi-khi-cat-fade",
      title: "Lỗi hay gặp khi cắt fade và cách xoá vạch",
      blocks: [
        {
          table: {
            head: ["Hiện tượng", "Nguyên nhân", "Cách sửa"],
            rows: [
              ["Vạch mờ giữa hai dải", "Hai độ dài liền nhau chưa được nối", "Dùng độ dài nằm giữa, chỉ đi đúng trên vạch rồi hất ra"],
              ["Đường fade cao dần lên", "Sợ vạch nên đi máy lên mãi", "Dừng lại, xoá vạch tại chỗ, không dời nó lên"],
              ["Ở tiệm thấy mượt, ra nắng thấy vạch", "Tóc vụn che vạch, hoặc đèn mờ", "Phủi tóc vụn giữa các lượt, kiểm tra ở chỗ sáng"],
              ["Mảng loang ở gáy", "Tóc quanh xoáy nằm nhiều hướng", "Đi máy theo nhiều hướng, nhẹ tay"],
              ["Hai bên không cùng độ cao", "Đường chuẩn lệch từ đầu", "Nâng bên thấp lên cho bằng"],
              ["Gờ ở chỗ fade gặp phần đỉnh", "Chưa nối, phần đỉnh ngắn nên không che được", "Kéo trên lược hoặc tông đơ trên lược tới khi vuốt lên không còn gờ"],
            ],
          },
        },
        { p: "Phía sau đầu khó nhìn hơn hai bên. Đừng chỉ nhìn trong gương: bạn đi vòng ra sau lưng khách và cúi xuống mà nhìn." },
      ],
    },
    {
      id: "an-toan-cao-sat",
      title: "An toàn khi cạo sát và vệ sinh dụng cụ",
      blocks: [
        { p: "Phần sát da là nơi dụng cụ chạm trực tiếp vào da khách, nên có vài quy tắc không được bỏ qua." },
        {
          ul: [
            "Dao cạo chỉ dùng lưỡi dùng một lần, mỗi khách một lưỡi mới. Lưỡi đã dùng bỏ vào hộp đựng vật sắc.",
            "Tông đơ, cữ, lược và máy cạo được làm sạch, khử khuẩn sau mỗi khách theo hướng dẫn của sản phẩm. Lưới và lưỡi của máy cạo lưới làm sạch theo hướng dẫn của hãng.",
            "Da đỏ lên hay khách thấy rát thì dừng lại. Đừng cố cho thật sát.",
            "Da đầu có vết thương hay viêm thì không cạo sát.",
          ],
        },
        { note: "Quy định về dao cạo và vệ sinh trong tiệm tóc khác nhau theo từng nước, nên hãy kiểm tra quy định nơi bạn làm việc. Xem thêm [Khử khuẩn và tiệt trùng dụng cụ](lesson:ve-sinh-dung-cu) và [Khi nào không nên làm cho khách](lesson:khi-nao-khong-lam).", kind: "warn", title: "Quy định mỗi nơi một khác" },
      ],
    },
    {
      id: "dan-khach-ghi-ho-so",
      title: "Dặn khách và ghi hồ sơ sau khi cắt fade",
      blocks: [
        { p: "Trước khi khách đứng dậy, hãy nói một câu mà nhiều thợ quên: phần sát da sẽ mờ đi sau vài ngày, và đó là bình thường. Khách biết trước thì không nghĩ rằng đường fade bị hỏng. Nhiều khách quay lại sau khoảng 2–3 tuần để giữ fade." },
        { p: "Trong VaraaAi, bạn ghi “fade trung bình, các cữ, cần gạt” vào ghi chú của khách trong [sổ khách hàng](lesson:khach-hang), để lần sau ai cắt cũng làm lại đúng như vậy. Hẹn lần sau ngay trên [lịch hẹn](lesson:lich-hen) của tiệm. Với những khách hai, ba tuần lại ghé một lần, tiệm có thể dùng thêm [thẻ khách quen](lesson:the-khach-quen)." },
      ],
    },
  ],
  howTo: {
    title: "Các bước cắt tóc fade trung bình sát da",
    id: "cac-buoc-cat-fade",
    after: "thong-nhat-do-cao",
    lead: "Mười bước theo đúng thứ tự của video bài học. Số cữ và hướng gạt cần khác nhau theo hãng, nên bài không ghi số cữ cụ thể: hãy thử trên máy của bạn.",
    supplies: [
      "Tông đơ có cần gạt và bộ cữ, có cữ nửa số càng tốt",
      "Tông đơ viền",
      "Máy cạo lưới, hoặc dao cạo với lưỡi mới dùng một lần",
      "Lược và kéo, đã làm sạch và khử khuẩn",
      "Dải giấy cổ dùng một lần và áo choàng",
      "Chổi phủi tóc hoặc máy sấy, gương tay",
      "Sản phẩm tạo kiểu; kem dịu da không mùi cho da nhạy cảm",
      "Hộp đựng vật sắc",
    ],
    steps: [
      {
        name: "Chuẩn bị dụng cụ và lưỡi dao mới",
        text: "Rửa tay. Tông đơ, cữ và lược đều đã được làm sạch, khử khuẩn sau khách trước. Nếu dùng dao cạo, lắp một lưỡi mới. Quấn dải giấy cổ dùng một lần quanh cổ khách rồi mới cài áo choàng.",
      },
      {
        name: "Tư vấn và chỉ độ cao trên đầu khách",
        text: "Hỏi khách muốn fade thấp, trung bình hay cao, và có muốn thấy da ở dưới cùng không. Chỉ thẳng lên đầu khách trong gương chỗ fade sẽ bắt đầu. Sờ dáng đầu, tìm chỗ phẳng, sẹo và xoáy trước khi cầm máy.",
      },
      {
        name: "Kẻ đường chuẩn vòng quanh đầu",
        text: "Chải tóc xuống, tóc khô và sạch. Lắp cữ đã chọn cho đường chuẩn, đặt cữ áp phẳng ở chân tóc và đi lên ngược chiều mọc. Tới độ cao đã thống nhất thì hất tông đơ ra ngoài. Đi hết bên này, phía sau, rồi bên kia ở cùng một độ cao; gần tai thì gập nhẹ vành tai xuống.",
        image: { src: img("ke-duong-chuan-fade-bang-tong-do-co-cu"), alt: "Người thợ đưa tông đơ gắn cữ đen đi lên ở mái bên của khách nam, tay kia giữ phần tóc đỉnh còn dài", caption: "Đường chuẩn: một cữ, một độ cao, vòng quanh đầu." },
      },
      {
        name: "Làm phần dưới đường chuẩn",
        text: "Chia phần dưới đường chuẩn làm hai, ba dải. Với dải dưới cùng, đóng cần hoặc dùng cữ ngắn hơn, rồi bỏ cữ. Đi lên một đoạn ngắn hơn đường chuẩn và cũng hất ra ở chỗ dừng. Chân tóc quanh tai và ở gáy đi thật nhẹ, từng chút một. Phần sát da hoàn toàn để lại cho bước bảy; lúc này chỉ cần dải dưới cùng thật ngắn và đều.",
        image: { src: img("dai-duoi-cung-khong-cu-quanh-tai"), alt: "Người thợ dùng ngón tay gập vành tai của khách nam xuống, tay kia đưa tông đơ không gắn cữ đi nhẹ ở chân tóc sau tai" },
      },
      {
        name: "Nối từng dải từ dưới lên",
        text: "Giữa các dải bây giờ có những vạch. Bắt đầu ở vạch thấp nhất: mở cần một nửa để có độ dài nằm giữa hai dải, đi đúng trên vạch, múc ra ngoài nhẹ và ngắn. Lên vạch tiếp theo thì mở cần thêm hoặc lắp cữ nửa số, cứ thế tới đường chuẩn và từ đường chuẩn lên phần đỉnh. Giữa các lượt, phủi tóc vụn bằng chổi hoặc thổi nhẹ bằng máy sấy, vì tóc vụn nằm trên đầu che mất vạch.",
      },
      {
        name: "Xoá vạch còn sót dưới đèn",
        text: "Chải tóc xuống và nhìn dưới đèn. Chỗ nào còn vạch mờ hoặc một mảng tối hơn, dùng đúng độ dài nằm giữa và chỉ đi trên chỗ ấy. Không đẩy cả đường fade lên cao. Chỗ xoáy ở gáy thì đi theo nhiều hướng, nhẹ tay.",
      },
      {
        name: "Làm phần sát da và đường viền",
        text: "Căng da nhẹ, dùng máy cạo lưới làm sạch phần dưới cùng. Nếu dùng dao cạo thì chỉ lưỡi mới, đi xuôi, một lần. Da đỏ lên hay khách thấy rát thì dừng. Sau đó viền quanh tai, tóc mai và gáy bằng tông đơ viền, đường viền tự nhiên, không khoét cao.",
        image: { src: img("may-cao-luoi-lam-phan-sat-da-o-gay"), alt: "Người thợ dùng hai ngón tay căng da ở gáy khách nam, tay kia áp một chiếc máy cạo lưới nhỏ màu đen lên vùng da sau tai", caption: "Hai ngón tay căng da, máy cạo lưới áp phẳng lên phần dưới cùng." },
      },
      {
        name: "Kiểm tra hai bên và phía sau ở chỗ sáng",
        text: "Đưa khách ra chỗ sáng hoặc bật đèn. Khách ngồi thẳng, nhìn thẳng gương, bạn so hai bên: đường fade cùng độ cao, tóc mai bằng nhau. Rồi nhìn từ bên trái, bên phải, cúi xuống ngang tầm mắt và nhìn phía sau. Nhờ khách nghiêng đầu nhẹ, vạch nhỏ sẽ hiện rõ hơn dưới đèn; chỗ nào chưa mượt thì sửa ngay.",
      },
      {
        name: "Nối fade với phần đỉnh",
        text: "Cắt phần đỉnh theo đường chuẩn ở trán như trong bài cắt tóc nam cơ bản. Sau đó nối chỗ fade gặp phần đỉnh bằng kéo trên lược hoặc tông đơ trên lược. Lược đi lên đều, không dừng một chỗ, tới khi vuốt tay lên không còn gờ. Phần đỉnh càng ngắn, chỗ nối càng phải mượt, vì không còn tóc dài phủ xuống che.",
        image: { src: img("tong-do-tren-luoc-noi-fade-voi-phan-dinh"), alt: "Người thợ giữ cây lược đen nâng một lớp tóc của khách nam, tay kia đưa tông đơ không cữ chạy dọc theo sống lược", caption: "Tông đơ trên lược ở chỗ hai bên gặp phần đỉnh." },
      },
      {
        name: "Hoàn thiện, ghi hồ sơ và dọn dẹp",
        text: "Phủi sạch tóc vụn. Nếu khách có da nhạy cảm và đồng ý, thoa một chút kem dịu da không mùi lên phần vừa cạo sát. Vuốt sản phẩm tạo kiểu cho phần đỉnh, chỉ khách cách làm ở nhà, rồi đưa gương tay cho khách xem hai bên và gáy. Ghi độ cao, các cữ và cần gạt vào hồ sơ. Khách về thì chải sạch tóc trong lưỡi tông đơ, khử khuẩn dụng cụ, tra dầu cho lưỡi và bỏ lưỡi dao cạo vào hộp đựng vật sắc.",
        image: { src: img("vuot-san-pham-tao-kieu-sau-khi-cat-fade"), alt: "Người thợ dùng lòng bàn tay vuốt sản phẩm tạo kiểu lên phần tóc đỉnh của khách nam, hai bên tóc đã cắt ngắn gọn" },
      },
    ],
  },
  faq: [
    {
      q: "Cắt fade bắt đầu từ đâu?",
      a: "Bắt đầu bằng đường chuẩn: một cữ, đi từ chân tóc lên tới độ cao đã thống nhất với khách, vòng quanh đầu ở cùng một độ cao. Phần dưới đường chuẩn sau đó được chia thành hai, ba dải, dải dưới cùng ngắn nhất, rồi mới nối các dải lại.",
    },
    {
      q: "Cắt fade nên để tóc ướt hay khô?",
      a: "Trong quy trình của bài học, tóc khô và sạch, được chải xuống trước khi kẻ đường chuẩn. Giữa các lượt máy nên phủi tóc vụn bằng chổi hoặc thổi nhẹ bằng máy sấy, vì tóc vụn che mất vạch.",
    },
    {
      q: "Giữa hai dải fade còn vạch thì xoá thế nào?",
      a: "Dùng độ dài nằm giữa hai dải ấy, tức là mở cần gạt nửa chừng hoặc lắp cữ nửa số, và chỉ đi đúng trên vạch rồi hất máy ra. Không đi cả mảng và không đi lên cao hơn, vì như vậy sẽ đẩy cả đường fade lên cao hơn ý khách.",
    },
    {
      q: "Vì sao phải hất tông đơ ra ở chỗ dừng?",
      a: "Hất ra như múc làm lưỡi rời tóc từ từ, nên chỗ dừng mờ dần. Nếu dừng lại và kéo tông đơ thẳng ra, hoặc ấn mạnh, chỗ dừng sẽ thành vạch và lỗ. Động tác này đến từ cổ tay thả lỏng, không phải từ cả cánh tay.",
    },
    {
      q: "Một bên fade cao hơn bên kia thì sửa thế nào?",
      a: "Chỉ có thể nâng bên thấp lên cho bằng, vì tóc đã cắt ngắn thì không hạ xuống được. Vì vậy cần so hai bên ngay sau khi kẻ đường chuẩn, khi chênh lệch còn dễ sửa.",
    },
    {
      q: "Phần sát da của skin fade nên dùng máy cạo lưới hay dao cạo?",
      a: "Cả hai đều dùng được. Máy cạo lưới nhẹ nhàng hơn với da. Dao cạo thì chỉ dùng lưỡi mới dùng một lần, đi xuôi, một lần. Da đỏ lên hay khách thấy rát thì dừng lại, và da đầu có vết thương hay viêm thì không cạo sát.",
    },
  ],
  related: ["cat-nam-fade-hieu-dung", "cat-nam-co-ban", "cat-nam-tao-kieu", "ve-sinh-dung-cu"],
};

export default article;
