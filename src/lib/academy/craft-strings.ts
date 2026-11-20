/** Interface text of the Academy's craft-skills track ("Tôi học nghề") in
 * Vietnamese, English and Finnish (other languages get English). The lessons
 * themselves are in craft.ts. */

const vi = {
  forPro: "Tôi học nghề",
  forProShort: "Học nghề",
  proHint: "Vệ sinh an toàn, nail, mi",
  gradPro: ["Thợ lành nghề", "Học xong mọi bài học nghề hiện có"] as [string, string],
  certTrack: "Khoá học nghề làm đẹp trực tuyến",
  certNote: "Chứng nhận hoàn thành khoá học trực tuyến của VaraaAi — không phải chứng chỉ hành nghề hay bằng cấp chính thức.",
  introTitle: "Học nghề cùng người đi trước",
  introBody: "Mỗi chủ đề nail và mi có hai video. Bài “Lý thuyết & kinh nghiệm”: người thầy kể chuyện nghề, phân tích lý thuyết và quy tắc làm việc. Bài “Thực hành từng bước”: hình ảnh từng thao tác, đánh dấu đúng chỗ đang làm. Hiểu vì sao, rồi mới làm.",
  styleTheory: "Lý thuyết & kinh nghiệm",
  stylePractice: "Thực hành từng bước",
  keyPointsTitle: "Những điều cần nhớ",
  disclaimer:
    "Video là tài liệu hỗ trợ học tập. Chúng không thay thế việc thực hành có người hướng dẫn và không phải chứng chỉ hành nghề. Luôn làm theo hướng dẫn của hãng sản phẩm và quy định ở nơi bạn làm việc.",
  bridgeTitle: "Đưa tay nghề vào công việc với VaraaAi",
  bridgeBody: "Làm đẹp rồi thì cần có khách. Các bài này chỉ bạn mở salon trên VaraaAi, lên dịch vụ và bảng giá, nhận lịch hẹn online và giữ khách quen.",
  noticeTitle: "An toàn trước tiên",
  sourcesTitle: "Nguồn chính thức",
  relatedTitle: "Dùng VaraaAi cho công việc này",
  relatedBody: "Học xong kỹ thuật, xem tiếp cách đưa dịch vụ này lên VaraaAi để nhận khách.",
};

type S = typeof vi;

const en: S = {
  forPro: "I'm learning the trade",
  forProShort: "Learn the trade",
  proHint: "Hygiene & safety, nails, lashes",
  gradPro: ["Skilled professional", "Finish every craft lesson available"],
  certTrack: "Online beauty craft course",
  certNote: "Certificate of completion for VaraaAi's online course — not a professional licence or an official qualification.",
  introTitle: "Learn the trade from someone who has done it",
  introBody: "Every nail and lash topic has two videos. “Theory & experience”: a mentor talks about the trade, the theory and the rules of the job. “Step-by-step practice”: each move in pictures, with the working area marked. Understand why first, then do.",
  styleTheory: "Theory & experience",
  stylePractice: "Step-by-step practice",
  keyPointsTitle: "Key points to remember",
  disclaimer:
    "These videos are study aids. They don't replace supervised hands-on training and they are not a professional licence. Always follow the product manufacturer's instructions and the rules where you work.",
  bridgeTitle: "Put your skills to work with VaraaAi",
  bridgeBody: "Skill needs customers. These lessons show how to open your salon on VaraaAi, list services and prices, take bookings online and keep regulars coming back.",
  noticeTitle: "Safety first",
  sourcesTitle: "Official sources",
  relatedTitle: "Use VaraaAi for this work",
  relatedBody: "Once you know the technique, see how to offer this service on VaraaAi and get booked.",
};

const fi: S = {
  forPro: "Opiskelen alaa",
  forProShort: "Opi ammatti",
  proHint: "Hygienia, kynnet, ripset",
  gradPro: ["Taitava ammattilainen", "Suorita kaikki saatavilla olevat ammattitunnit"],
  certTrack: "Kauneusalan verkkokurssi",
  certNote: "Todistus VaraaAin verkkokurssin suorittamisesta — ei ammattipätevyys eikä virallinen tutkinto.",
  introTitle: "Opi ammatti kokeneelta tekijältä",
  introBody: "Jokaisesta kynsi- ja ripsiaiheesta on kaksi videota. ”Teoria ja kokemus”: mentori kertoo ammatista, teoriasta ja työn säännöistä. ”Käytäntö vaihe vaiheelta”: jokainen työvaihe kuvina, työkohta merkittynä. Ymmärrä ensin miksi, tee sitten.",
  styleTheory: "Teoria ja kokemus",
  stylePractice: "Käytäntö vaihe vaiheelta",
  keyPointsTitle: "Muista nämä",
  disclaimer:
    "Videot ovat opiskelun tukea. Ne eivät korvaa ohjattua käytännön harjoittelua eivätkä ole ammattipätevyys. Noudata aina tuotteen valmistajan ohjeita ja työpaikkasi määräyksiä.",
  bridgeTitle: "Vie taitosi työhön VaraaAin avulla",
  bridgeBody: "Taito tarvitsee asiakkaita. Näillä tunneilla opit avaamaan salongin VaraaAissa, lisäämään palvelut ja hinnat, ottamaan varauksia verkossa ja pitämään kanta-asiakkaat.",
  noticeTitle: "Turvallisuus ensin",
  sourcesTitle: "Viralliset lähteet",
  relatedTitle: "Käytä VaraaAita tähän työhön",
  relatedBody: "Kun osaat tekniikan, katso, miten tarjoat palvelua VaraaAissa ja saat varauksia.",
};

export const craftStrings = (locale: string): S => (locale === "vi" ? vi : locale === "fi" ? fi : en);
