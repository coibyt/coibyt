/** SEO landing pages of the Academy courses: /academy/khoa-hoc/<slug> (owner, 2026-11-19). */
import { l3, type L3 } from "@/lib/academy/types";

export interface CourseSeo {
  /** Course id in curriculum.ts / craft.ts. */
  id: string;
  /** URL slug, Vietnamese keywords without accents, e.g. "hoc-nail-online". */
  slug: string;
  /** <title>, max ~60 characters, main keyword first. */
  metaTitle: L3;
  /** Meta description, 140–158 characters, with a reason to click. */
  metaDescription: L3;
  /** H1 on the page (can be longer and warmer than metaTitle). */
  headline: L3;
  /** One sentence under the H1. */
  tagline: L3;
  /** Level, e.g. l3("Từ cơ bản đến nâng cao", …). */
  level: L3;
  /** "Bạn sẽ học được gì": exactly 6 concrete outcomes, 8–16 words each. */
  outcomes: L3[];
  /** "Giới thiệu khóa học": 4–6 paragraphs; Vietnamese total 380–600 words. */
  intro: L3[];
  /** "Khóa học dành cho ai": exactly 4 items. */
  forWho: L3[];
  /** FAQ (also FAQPage structured data): exactly 5 pairs, answers 30–70 words. */
  faq: { q: L3; a: L3 }[];
  /** 6–10 Vietnamese search phrases people really type (for the keywords line and to guide the copy). */
  keywords: string[];
}

export const COURSE_SEO: CourseSeo[] = [
  /* ================= craft: nails ================= */
  {
    id: "p-nail",
    slug: "hoc-nail-online",
    metaTitle: l3(
      "Học nail online miễn phí: sơn gel, builder gel, đắp bột",
      "Learn Nails Online for Free: Gel, Builder Gel, Acrylic",
      "Kynsikurssi verkossa ilmaiseksi: geeli, BIAB ja akryyli"
    ),
    metaDescription: l3(
      "Khóa học nail online miễn phí bằng tiếng Việt: sơn gel, tháo gel, builder gel, nối móng, đắp bột, French. Thầy giảng lý thuyết rồi chỉ từng bước.",
      "Free online nail course: gel polish, removal, builder gel, extensions on forms, acrylic and French. A mentor explains the why, then shows every step.",
      "Ilmainen kynsikurssi verkossa: geelilakkaus, poisto, rakennegeeli, muottipidennykset, akryyli ja ranskalainen. Mentori selittää ja näyttää vaiheet."
    ),
    headline: l3(
      "Học nail online miễn phí: bài bản từ sơn gel, builder gel đến đắp bột acrylic",
      "Learn nails online for free: from gel polish and builder gel to acrylic, the thorough way",
      "Opi kynsiala verkossa ilmaiseksi: geelilakkauksesta rakennegeeliin ja akryyliin"
    ),
    tagline: l3(
      "Mỗi chủ đề có hai video tiếng Việt: người thầy giảng vì sao, rồi chỉ từng thao tác ngay trên hình.",
      "Every topic has two videos: a mentor explains why, then walks you through each move on the picture.",
      "Jokaisessa aiheessa on kaksi videota: mentori kertoo miksi ja näyttää sitten jokaisen työvaiheen kuvassa."
    ),
    level: l3("Từ cơ bản đến nâng cao", "Beginner to advanced", "Perusteista edistyneeseen"),
    outcomes: [
      l3(
        "Làm bộ sơn gel hoàn chỉnh từ chuẩn bị móng đến lớp top, bền 2–3 tuần.",
        "Do a complete gel polish manicure, from nail prep to top coat, lasting 2–3 weeks.",
        "Teet kokonaisen geelilakkauksen kynnen valmistelusta päällyslakkaan, ja se kestää 2–3 viikkoa."
      ),
      l3(
        "Tháo gel đúng cách để móng thật không mỏng yếu, biết khi nào móng cần nghỉ.",
        "Remove gel without thinning the natural nail, and know when it needs a break.",
        "Poistat geelin oikein, jotta oma kynsi pysyy vahvana, ja tiedät milloin kynsi tarvitsee taukoa."
      ),
      l3(
        "Hiểu cấu trúc móng builder gel, acrylic: vùng chịu lực, apex, độ cong chữ C.",
        "Understand how builder gel and acrylic nails are built: stress area, apex and C-curve.",
        "Ymmärrät rakennegeeli- ja akryylikynnen rakenteen: rasitusalue, apex ja C-kaari."
      ),
      l3(
        "Nối móng bằng form và dặm móng đúng hẹn để móng cân, chắc, không hở.",
        "Build extensions on forms and do timely infills so nails stay balanced, strong and without lifting.",
        "Teet pidennykset muotilla ja huollot ajallaan, jotta kynnet pysyvät tasapainoisina ja vahvoina ilman irtoamista."
      ),
      l3(
        "Chọn dáng móng hợp bàn tay khách, làm French và ombré đều trên mười móng.",
        "Pick the right shape for each client and keep French and ombré even on every nail.",
        "Valitset asiakkaan käsiin sopivan kynsimuodon ja teet tasaisen ranskalaisen ja ombren kaikkiin kymmeneen kynteen."
      ),
      l3(
        "Nắm quy tắc an toàn: dị ứng, bụi, hơi hóa chất, MMA và quy định EU.",
        "Know the safety rules: allergy, dust and vapour, MMA, and the EU rules for nail products.",
        "Tunnet turvallisuussäännöt: allergiat, pöly ja höyryt, MMA sekä EU:n kynsituotteita koskevat säännöt."
      ),
    ],
    intro: [
      l3(
        "Bạn muốn học nail online miễn phí nhưng ngại xem những video rời rạc, làm theo được mà vẫn không hiểu vì sao móng bong, gãy hay hở? Khóa học Nghề Nail của Học viện VaraaAi được làm ra để giải đúng nỗi lo đó. Đây là khóa học nail cho người mới vào nghề, và cũng dành cho thợ đã đi làm muốn hệ thống lại kiến thức. Bạn học bằng tiếng Việt, ngay trên điện thoại, không cần tạo tài khoản và hoàn toàn miễn phí.",
        "Want to learn nails online for free, but tired of random videos that show you what to do without ever explaining why a set lifts, breaks or grows out badly? The Nails course at VaraaAi Academy was made for exactly that. It suits complete beginners as well as working nail techs who want to put their knowledge in order. The videos are narrated in Vietnamese, while the key points and quizzes are also written in English. It is free, works on your phone and needs no account.",
        "Haluatko opiskella kynsialaa verkossa ilmaiseksi, mutta irralliset videot eivät koskaan kerro, miksi kynnet irtoavat, katkeavat tai kasvavat huonosti? VaraaAi-akatemian Kynnet-kurssi on tehty juuri tähän. Se sopii aloittelijoille ja myös työssä oleville kynsiteknikoille, jotka haluavat jäsentää osaamistaan. Videoiden kertojaääni on vietnamiksi, mutta tärkeimmät kohdat ja visat on kirjoitettu myös suomeksi. Kurssi on ilmainen, toimii puhelimella eikä vaadi tiliä."
      ),
      l3(
        "Điểm khác biệt nằm ở cách học hai bước. Mỗi chủ đề có hai video. Video “Lý thuyết & kinh nghiệm” là lúc người thầy ngồi xuống kể chuyện nghề: cấu tạo móng, vì sao gel bám và vì sao bong, gel chín dưới đèn như thế nào, những tình huống thật hay gặp với khách. Video “Thực hành từng bước” đi qua từng thao tác trên hình ảnh, có dấu đánh đúng chỗ đang làm. Hiểu vì sao trước rồi mới làm, nên tay nghề vững hơn và ít phải làm lại.",
        "What makes it different is the two-step approach. Every topic has two videos. In “Theory & experience” a mentor sits down and talks about the trade: how the nail is built, why gel holds and why it lifts, how curing works and the real situations you meet with clients. “Step-by-step practice” then goes through each move in pictures, with markers on exactly the spot being worked on. Understanding the why first makes your technique steadier and saves redoing work.",
        "Erona on kaksivaiheinen tapa oppia. Jokaisessa aiheessa on kaksi videota. ”Teoria ja kokemus” -videolla mentori kertoo alasta: kynnen rakenteesta, siitä miksi geeli pysyy ja miksi se irtoaa, miten kovettuminen toimii ja millaisia todellisia tilanteita asiakkaiden kanssa tulee vastaan. ”Käytäntö vaihe vaiheelta” käy jokaisen liikkeen läpi kuvina, ja merkit näyttävät tarkalleen työstettävän kohdan. Kun ymmärrät ensin miksi, tekniikka varmistuu ja korjattavaa jää vähemmän."
      ),
      l3(
        "Chương trình đi theo đúng công việc hằng ngày ở tiệm nail: sơn gel từ A đến Z, tháo gel không hỏng móng, builder gel (BIAB), nối móng bằng form, đắp bột acrylic, dặm móng, bảy dáng móng phổ biến, French và ombré, và chăm sóc móng tay, móng chân cơ bản với sơn thường. Ở mỗi chủ đề, bạn học cả những lỗi hay gặp như móng hở, form chúc xuống hay vểnh lên, gãy ở vùng chịu lực, gel chạm da, và cách nói thật với khách khi kiểu móng họ muốn chưa phù hợp.",
        "The curriculum follows the daily work of a nail salon: gel polish from A to Z, gel removal without damage, builder gel (BIAB), extensions on forms, acrylic, infills, the seven common nail shapes, French and ombré, and the basic manicure and pedicure with regular polish. Each topic also covers the usual faults, such as lifting, a form tilted down or up, breaks at the stress area and gel touching the skin, and how to talk honestly with a client when the look they want doesn't suit their nails.",
        "Sisältö seuraa kynsisalongin arkea: geelilakkaus alusta loppuun, geelin poisto kynttä vahingoittamatta, rakennegeeli (BIAB), pidennykset muotilla, akryyli, huollot, seitsemän yleisintä kynsimuotoa, ranskalainen ja ombre sekä perusmanikyyri ja -pedikyyri tavallisella lakalla. Jokaisessa aiheessa käydään läpi myös tyypilliset virheet, kuten irtoaminen, alas tai ylös kallistuva muotti, katkeaminen rasitusalueelta ja geeli iholla, sekä se, miten asiakkaalle puhutaan rehellisesti, kun toivottu tyyli ei sovi hänen kynsilleen."
      ),
      l3(
        "An toàn được lồng vào từng bài chứ không bị để riêng một góc. Bạn sẽ hiểu vì sao dị ứng với gel đến chậm và thường kéo dài suốt đời, vì sao gel không được chạm da, bụi và hơi khi đắp bột cần xử lý ra sao, chất MMA là gì, và quy định của EU về thành phần trong sản phẩm làm móng. Với thợ nail người Việt đang làm việc ở Phần Lan và các nước châu Âu, đây là phần kiến thức giúp bạn làm việc tự tin, đúng quy tắc và chuyên nghiệp hơn.",
        "Safety is built into every lesson rather than left in a corner. You will learn why gel allergy develops slowly and usually lasts for life, why gel must never touch the skin, how to deal with dust and vapour when working with acrylic, what MMA is, and what the EU rules say about ingredients in nail products. For nail techs working in Finland and elsewhere in Europe, this is the knowledge that lets you work with confidence and professionalism.",
        "Turvallisuus kulkee mukana jokaisessa oppitunnissa. Opit, miksi geeliallergia kehittyy hitaasti ja on yleensä elinikäinen, miksi geeli ei saa koskaan koskea ihoon, miten akryylityön pölyn ja höyryjen kanssa toimitaan, mikä MMA on ja mitä EU:n säännöt sanovat kynsituotteiden ainesosista. Suomessa ja muualla Euroopassa työskentelevälle kynsiteknikolle tämä on tietoa, jonka ansiosta työ on varmaa ja ammattimaista."
      ),
      l3(
        "Các bài học có phần “Những điều cần nhớ” và câu hỏi kiểm tra nhanh để bạn tự ôn lại, còn tiến độ được lưu ngay trong trình duyệt. Học xong tất cả bài hiện có của nhánh Học nghề, bạn có thể điền tên và tải chứng nhận hoàn thành khóa học trực tuyến. Video là tài liệu hỗ trợ học tập: bạn vẫn cần thực hành có người hướng dẫn, làm theo hướng dẫn của hãng sản phẩm và quy định ở nơi mình làm việc.",
        "Lessons come with a “Key points” section and a quick quiz to check yourself, and your progress is saved in your browser. Once you have finished every lesson available in the craft track, you can enter your name and download a certificate of completion for the online course. The videos are a learning aid: you still need supervised hands-on practice, and you should always follow the product maker's instructions and the rules where you work.",
        "Oppitunneilla on ”Muista nämä” -osio ja pikavisa, joilla voit kerrata, ja edistymisesi tallentuu selaimeesi. Kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit kirjoittaa nimesi ja ladata todistuksen verkkokurssin suorittamisesta. Videot ovat oppimisen tuki: tarvitset silti ohjattua käytännön harjoittelua, ja noudata aina valmistajan ohjeita ja oman työpaikkasi määräyksiä."
      ),
    ],
    forWho: [
      l3(
        "Người mới muốn học nghề nail để đi làm ở tiệm, kể cả khi chưa từng cầm dũa.",
        "Beginners who want to work in a nail salon, even if they have never held a file.",
        "Aloittelijat, jotka haluavat töihin kynsisalonkiin, vaikka eivät ole koskaan pitäneet viilaa kädessä."
      ),
      l3(
        "Thợ nail đang đi làm muốn hiểu sâu vì sao móng bong, gãy và cách khắc phục.",
        "Working nail techs who want to understand why sets lift or break, and how to fix it.",
        "Työssä olevat kynsiteknikot, jotka haluavat ymmärtää, miksi kynnet irtoavat tai katkeavat ja miten sen korjaa."
      ),
      l3(
        "Thợ người Việt ở Phần Lan và châu Âu muốn làm đúng các quy tắc an toàn ở đây.",
        "Vietnamese-speaking techs in Finland and Europe who want to follow the safety rules there.",
        "Suomessa ja muualla Euroopassa työskentelevät vietnaminkieliset tekijät, jotka haluavat noudattaa paikallisia turvallisuussääntöjä."
      ),
      l3(
        "Chủ tiệm nail cần tài liệu tiếng Việt để đào tạo nhân viên và thống nhất cách làm.",
        "Salon owners who need Vietnamese training material to teach staff one shared way of working.",
        "Kynsisalongin omistajat, jotka tarvitsevat vietnaminkielistä koulutusmateriaalia yhtenäiseen työtapaan."
      ),
    ],
    faq: [
      {
        q: l3("Học nail online miễn phí ở đâu cho bài bản?", "Where can I learn nails online for free, properly?", "Mistä voi opiskella kynsialaa verkossa ilmaiseksi ja perusteellisesti?"),
        a: l3(
          "Bạn có thể học ngay tại Học viện VaraaAi. Khóa Nghề Nail gồm sơn gel, tháo gel, builder gel, nối móng bằng form, đắp bột acrylic, dặm móng, dáng móng, French – ombré và chăm sóc móng cơ bản. Mỗi chủ đề có một video lý thuyết và một video thực hành. Miễn phí, không cần đăng ký.",
          "Right here at VaraaAi Academy. The Nails course covers gel polish, gel removal, builder gel, extensions on forms, acrylic, infills, nail shapes, French and ombré, and basic manicure and pedicure. Each topic has a theory video and a practice video. It is free and needs no sign-up.",
          "VaraaAi-akatemiassa. Kynnet-kurssi kattaa geelilakkauksen, geelin poiston, rakennegeelin, muottipidennykset, akryylin, huollot, kynsimuodot, ranskalaisen ja ombren sekä perusmanikyyrin ja -pedikyyrin. Jokaisessa aiheessa on teoria- ja käytäntövideo. Kurssi on ilmainen eikä vaadi rekisteröitymistä."
        ),
      },
      {
        q: l3("Người mới chưa biết gì có học được không?", "Can a complete beginner follow it?", "Pystyykö täysi aloittelija seuraamaan kurssia?"),
        a: l3(
          "Được. Nên bắt đầu với sơn gel và chăm sóc móng cơ bản, rồi mới sang builder gel, nối móng và đắp bột. Video lý thuyết giải thích từ cấu tạo móng, nên bạn không cần biết trước thuật ngữ. Bạn có thể xem lại bao nhiêu lần tùy thích.",
          "Yes. Start with gel polish and the basic manicure, then move on to builder gel, extensions and acrylic. The theory videos begin with how the nail is built, so you don't need to know the terms beforehand, and you can rewatch as often as you like.",
          "Kyllä. Aloita geelilakkauksesta ja perusmanikyyristä ja siirry sitten rakennegeeliin, pidennyksiin ja akryyliin. Teoriavideot alkavat kynnen rakenteesta, joten termejä ei tarvitse osata etukäteen, ja videot voi katsoa niin monta kertaa kuin haluaa."
        ),
      },
      {
        q: l3("Học xong có được cấp chứng chỉ hành nghề không?", "Do I get a professional qualification at the end?", "Saanko kurssista ammattipätevyyden?"),
        a: l3(
          "Không. Khi học xong mọi bài hiện có của nhánh Học nghề, bạn tải được chứng nhận hoàn thành khóa học trực tuyến của VaraaAi, nhưng đó không phải chứng chỉ hành nghề hay bằng cấp chính thức. Quy định mỗi nước mỗi khác, và bạn vẫn cần thực hành có người hướng dẫn đủ chuyên môn.",
          "No. When you finish every available lesson in the craft track you can download VaraaAi's certificate of completion for the online course, but it is not a professional licence or an official qualification. Rules differ from country to country, and you still need hands-on practice with a qualified trainer.",
          "Et. Kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit ladata VaraaAin todistuksen verkkokurssin suorittamisesta, mutta se ei ole ammattipätevyys eikä virallinen tutkinto. Säännöt vaihtelevat maittain, ja tarvitset silti käytännön harjoittelua pätevän kouluttajan ohjauksessa."
        ),
      },
      {
        q: l3("Video bằng tiếng gì, có học trên điện thoại được không?", "What language are the videos in, and do they work on a phone?", "Millä kielellä videot ovat, ja toimivatko ne puhelimella?"),
        a: l3(
          "Video thuyết minh bằng tiếng Việt, giọng người thầy. Phần “Những điều cần nhớ” và câu hỏi kiểm tra có cả tiếng Việt, tiếng Anh và tiếng Phần Lan. Bạn học được trên điện thoại, máy tính bảng hay máy tính; tiến độ lưu trong trình duyệt, nên hãy học trên cùng một trình duyệt.",
          "The videos are narrated in Vietnamese by a teacher's voice. The key points and quizzes are available in Vietnamese, English and Finnish. Everything works on a phone, tablet or computer; progress is saved in your browser, so keep using the same browser.",
          "Videoiden kertojaääni on vietnamiksi. Tärkeimmät kohdat ja visat ovat vietnamiksi, englanniksi ja suomeksi. Kaikki toimii puhelimella, tabletilla ja tietokoneella; edistyminen tallentuu selaimeen, joten käytä samaa selainta."
        ),
      },
      {
        q: l3("Khóa học có nói về dị ứng gel và quy định EU không?", "Does the course cover gel allergy and EU rules?", "Käsitteleekö kurssi geeliallergiaa ja EU:n sääntöjä?"),
        a: l3(
          "Có. Các bài lý thuyết giải thích vì sao dị ứng với gel và acrylic thường do sản phẩm chạm da, cách phòng tránh, bụi và hơi hóa chất, chất MMA, và quy định EU về thành phần sản phẩm làm móng, có dẫn nguồn chính thức. Hãy luôn kiểm tra thêm quy định ở nơi bạn làm việc.",
          "Yes. The theory lessons explain why gel and acrylic allergies usually come from product touching the skin, how to prevent them, dust and vapour, MMA, and the EU rules on nail product ingredients, with links to official sources. Always check the local rules where you work as well.",
          "Kyllä. Teoriatunnit kertovat, miksi geeli- ja akryyliallergia johtuu yleensä tuotteen joutumisesta iholle, miten sitä ehkäistään, pölystä ja höyryistä, MMA:sta sekä EU:n kynsituotteiden ainesosasäännöistä, ja ne linkittävät virallisiin lähteisiin. Tarkista aina myös oman työpaikkasi määräykset."
        ),
      },
    ],
    keywords: [
      "học nail online miễn phí",
      "khóa học nail cho người mới",
      "học làm nail ở đâu",
      "học sơn gel",
      "cách làm builder gel",
      "học đắp bột acrylic",
      "học nail ở Phần Lan",
      "dạy nail tiếng Việt",
    ],
  },
  /* ================= craft: lashes ================= */
  {
    id: "p-lash",
    slug: "hoc-noi-mi-online",
    metaTitle: l3(
      "Học nối mi online miễn phí: classic, volume, hybrid",
      "Learn Lash Extensions Online for Free: Classic to Volume",
      "Ripsienpidennykset verkossa ilmaiseksi: klassiset ja volyymi"
    ),
    metaDescription: l3(
      "Học nối mi online miễn phí bằng tiếng Việt: classic, volume, hybrid, lash mapping, dặm và tháo mi, uốn mi. Hiểu đúng để mi đẹp mà mi thật vẫn khỏe.",
      "Free online lash course: classic, volume, hybrid, lash mapping, refills, removal and lash lift. Learn the why, so sets look great and lashes stay healthy.",
      "Ilmainen ripsikurssi verkossa: klassiset, volyymi, hybridi, kartoitus, huolto, poisto ja kestotaivutus. Kauniit pidennykset ja terveet omat ripset."
    ),
    headline: l3(
      "Học nối mi online miễn phí: từ classic, volume đến lash mapping, mi đẹp mà mi thật vẫn khỏe",
      "Learn lash extensions online for free: classic, volume and lash mapping, with healthy natural lashes",
      "Opi ripsienpidennykset verkossa ilmaiseksi: klassiset, volyymi ja ripsikartoitus, omia ripsiä vaalien"
    ),
    tagline: l3(
      "Người thầy giảng về vòng đời sợi mi, keo nối và an toàn mắt, rồi chỉ từng thao tác ngay trên hình.",
      "A mentor explains the lash growth cycle, adhesive and eye safety, then shows every move on the picture.",
      "Mentori selittää ripsen kasvusyklin, liiman ja silmien turvallisuuden ja näyttää jokaisen liikkeen kuvassa."
    ),
    level: l3("Từ cơ bản đến nâng cao", "Beginner to advanced", "Perusteista edistyneeseen"),
    outcomes: [
      l3(
        "Tư vấn trước khi nối mi: hỏi đúng câu, biết khi nào không nên làm.",
        "Run a proper consultation before a set and know when not to work.",
        "Teet kunnollisen konsultaation ja tiedät, milloin hoitoa ei pidä tehdä."
      ),
      l3(
        "Nối mi classic đúng nguyên tắc một sợi nối cho một sợi mi thật.",
        "Apply classic lashes with one extension on each natural lash, without stickies.",
        "Teet klassiset ripset periaatteella yksi pidennys yhteen omaan ripseen."
      ),
      l3(
        "Tạo fan volume đẹp, chọn 2D–6D vừa sức mi thật của từng khách.",
        "Make neat volume fans and choose 2D–6D to suit each client's natural lashes.",
        "Teet siistit volyymiviuhkat ja valitset 2D–6D asiakkaan omien ripsien mukaan."
      ),
      l3(
        "Lên lash mapping theo dáng mắt và chọn độ cong J, B, C, D hợp lý.",
        "Map a set to the eye shape and choose the right curl, from J to D.",
        "Kartoitat ripset silmänmuodon mukaan ja valitset oikean taivutuksen J:stä D:hen."
      ),
      l3(
        "Dặm và tháo mi an toàn, không kéo bứt, để mi thật luôn khỏe.",
        "Do refills and removals safely, never pulling, so natural lashes stay healthy.",
        "Teet huollot ja poistot turvallisesti repimättä, jotta omat ripset pysyvät terveinä."
      ),
      l3(
        "Uốn mi, nhuộm mi đúng thời gian và thử phản ứng trước khi nhuộm.",
        "Do a lash lift and tint with the right timing and an allergy test first.",
        "Teet kestotaivutuksen ja värjäyksen oikealla ajoituksella ja allergiatestin ensin."
      ),
    ],
    intro: [
      l3(
        "Bạn đang tìm nơi học nối mi online, học được thật mà không tốn tiền? Khóa học Nghề Mi của Học viện VaraaAi dạy nối mi bằng tiếng Việt, từ những điều căn bản nhất đến các kiểu khó như mega volume hay wet look. Khóa học miễn phí, không cần tạo tài khoản và học ngay trên điện thoại, phù hợp với người mới vào nghề lẫn thợ mi đang đi làm muốn nâng tay nghề và làm việc an toàn hơn.",
        "Looking for a place to learn lash extensions online that actually teaches you something, at no cost? The Lashes course at VaraaAi Academy covers lash extensions from the very basics to demanding looks such as mega volume and wet look. The videos are narrated in Vietnamese, and the key points and quizzes are also written in English. It is free, needs no account and works on your phone, for beginners and working lash artists alike.",
        "Etsitkö paikkaa, jossa voi opiskella ripsienpidennyksiä verkossa kunnolla ja maksutta? VaraaAi-akatemian Ripset-kurssi käy läpi ripsienpidennykset aivan perusteista vaativiin tyyleihin, kuten megavolyymiin ja wet lookiin. Kertojaääni on vietnamiksi, ja tärkeimmät kohdat ja visat on kirjoitettu myös suomeksi. Kurssi on ilmainen, toimii puhelimella eikä vaadi tiliä, ja se sopii sekä aloittelijoille että työssä oleville ripsiteknikoille."
      ),
      l3(
        "Mỗi chủ đề có hai video. Ở video “Lý thuyết & kinh nghiệm”, người thầy giải thích tận gốc: vòng đời của sợi mi thật và vì sao mi nối rụng theo, vì sao dính chùm làm hại mi, keo cyanoacrylate và độ ẩm trong phòng ảnh hưởng thế nào đến độ bền. Ở video “Thực hành từng bước”, bạn xem từng thao tác trên hình, có dấu đánh đúng chỗ đang làm. Hiểu nguyên tắc trước thì tay làm chắc hơn, và bạn tự tin hơn khi tư vấn cho khách.",
        "Every topic has two videos. In “Theory & experience” a mentor goes back to the roots: the growth cycle of the natural lash and why extensions shed with it, why stickies harm the lashes, and how cyanoacrylate adhesive and room humidity affect retention. In “Step-by-step practice” you follow each move in pictures, with markers on the exact spot being worked on. Knowing the principles first steadies your hands and gives you confidence when you advise clients.",
        "Jokaisessa aiheessa on kaksi videota. ”Teoria ja kokemus” -videolla mentori menee asioiden ytimeen: oman ripsen kasvusykli ja miksi pidennykset irtoavat sen mukana, miksi yhteen liimautuneet ripset vahingoittavat ripsiä ja miten syanoakrylaattiliima ja huoneen kosteus vaikuttavat kestoon. ”Käytäntö vaihe vaiheelta” näyttää jokaisen liikkeen kuvina, ja merkit osoittavat työstettävän kohdan. Kun periaatteet ovat selvät, kädet toimivat varmemmin ja asiakkaan neuvominen on helpompaa."
      ),
      l3(
        "Chương trình gồm tám chủ đề: chuẩn bị và tư vấn trước khi nối, nối mi classic, nối mi volume với fan làm sẵn và fan tự tạo, nối mi hybrid, lash mapping theo dáng mắt (tự nhiên, búp bê, mắt mèo, sóc, mắt cáo), mega volume – wispy – wet look, dặm và tháo mi, và cuối cùng là uốn mi, nhuộm mi. Bạn học cách chọn độ dài, độ dày và độ cong J, B, C, CC, D, L vừa sức mi thật, cách cân đối hai mắt và vì sao khách thường cần dặm sau khoảng 2–3 tuần.",
        "The course has eight topics: preparation and consultation, classic lashes, volume with pre-made and handmade fans, hybrid, lash mapping by eye shape (natural, doll, cat-eye, squirrel, fox), mega volume, wispy and wet look, refills and removal, and finally lash lift and tint. You learn to choose length, thickness and curl (J, B, C, CC, D, L) that the natural lash can carry, to balance both eyes, and why clients usually need a refill after about 2–3 weeks.",
        "Kurssissa on kahdeksan aihetta: valmistelu ja konsultaatio, klassiset ripset, volyymi valmiilla ja itse tehdyillä viuhkoilla, hybridi, ripsikartoitus silmänmuodon mukaan (luonnollinen, doll, cat eye, squirrel, fox), megavolyymi, wispy ja wet look, huolto ja poisto sekä lopuksi kestotaivutus ja värjäys. Opit valitsemaan pituuden, paksuuden ja taivutuksen (J, B, C, CC, D, L), jonka oma ripsi kestää, tasapainottamaan silmät ja ymmärtämään, miksi huolto tarvitaan yleensä 2–3 viikon välein."
      ),
      l3(
        "Vì làm việc sát mắt khách, an toàn được nhắc trong mọi bài. Bạn sẽ biết cần hỏi gì khi tư vấn (dị ứng, phản ứng cũ với keo hay thuốc nhuộm, bệnh mắt, mổ mắt gần đây, kính áp tròng, mang thai), khi nào nên từ chối, vì sao nên thử keo trước lần nối đầu tiên nhưng kết quả thử không phải là bảo đảm, vì sao không bao giờ kéo hay bứt mi, và cảnh báo trên nhãn thuốc nhuộm mi ở EU. Đây là những điều giúp thợ mi người Việt ở Phần Lan và châu Âu làm việc chuyên nghiệp, đúng quy tắc.",
        "Because you work right next to the client's eyes, safety runs through every lesson. You will know what to ask in the consultation (allergies, earlier reactions to adhesive or tint, eye conditions, recent eye surgery, contact lenses, pregnancy), when to say no, why a test before the first set makes sense but is no guarantee, why you never pull or pick at lashes, and what the EU label warnings on lash tints mean. This is what lets lash artists in Finland and across Europe work professionally and by the rules.",
        "Koska työ tehdään aivan asiakkaan silmien vieressä, turvallisuus kulkee mukana jokaisessa oppitunnissa. Tiedät, mitä konsultaatiossa kysytään (allergiat, aiemmat reaktiot liimaan tai väriin, silmäsairaudet, äskettäinen silmäleikkaus, piilolinssit, raskaus), milloin pitää kieltäytyä, miksi testi ennen ensimmäistä kertaa on järkevä mutta ei takuu, miksi ripsiä ei koskaan revitä ja mitä EU:n varoitusmerkinnät ripsiväreissä tarkoittavat. Näiden avulla ripsiteknikko työskentelee Suomessa ja muualla Euroopassa ammattimaisesti ja sääntöjen mukaan."
      ),
      l3(
        "Các bài học có phần “Những điều cần nhớ” và câu hỏi kiểm tra nhanh, tiến độ tự lưu trong trình duyệt. Học xong mọi bài hiện có của nhánh Học nghề, bạn tải được chứng nhận hoàn thành khóa học trực tuyến mang tên mình. Video là tài liệu hỗ trợ học tập: bạn vẫn cần thực hành trên mẫu có người hướng dẫn, làm theo hướng dẫn của hãng keo, thuốc uốn, thuốc nhuộm và quy định ở nơi bạn làm việc.",
        "Lessons include “Key points” and a quick quiz, and your progress is saved in your browser automatically. When you have finished every available lesson in the craft track, you can download a certificate of completion for the online course with your name on it. The videos are a learning aid: you still need supervised practice on models, and you should follow the instructions of your adhesive, lift and tint makers and the rules where you work.",
        "Oppitunneilla on ”Muista nämä” -osio ja pikavisa, ja edistymisesi tallentuu selaimeen automaattisesti. Kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit ladata nimelläsi varustetun todistuksen verkkokurssin suorittamisesta. Videot ovat oppimisen tuki: tarvitset silti ohjattua harjoittelua malleilla, ja noudata liiman, taivutusaineiden ja värien valmistajien ohjeita sekä työpaikkasi määräyksiä."
      ),
    ],
    forWho: [
      l3(
        "Người mới muốn học nối mi bài bản để đi làm hoặc mở dịch vụ mi.",
        "Beginners who want to learn lash extensions properly to get a job or offer lash services.",
        "Aloittelijat, jotka haluavat oppia ripsienpidennykset kunnolla työtä tai omaa palvelua varten."
      ),
      l3(
        "Thợ mi đang làm muốn hiểu vì sao mi rụng sớm và cách giữ mi thật khỏe.",
        "Working lash artists who want to understand poor retention and keep natural lashes healthy.",
        "Työssä olevat ripsiteknikot, jotka haluavat ymmärtää heikon keston syyt ja pitää omat ripset terveinä."
      ),
      l3(
        "Thợ mi người Việt ở Phần Lan và châu Âu muốn làm đúng quy tắc an toàn.",
        "Vietnamese-speaking lash artists in Finland and Europe who want to follow the safety rules.",
        "Suomessa ja muualla Euroopassa työskentelevät vietnaminkieliset ripsiteknikot, jotka haluavat noudattaa turvallisuussääntöjä."
      ),
      l3(
        "Chủ tiệm cần tài liệu tiếng Việt để đào tạo thợ mi mới.",
        "Salon owners who need Vietnamese training material for new lash staff.",
        "Salongin omistajat, jotka tarvitsevat vietnaminkielistä koulutusmateriaalia uusille ripsiteknikoille."
      ),
    ],
    faq: [
      {
        q: l3("Học nối mi ở đâu miễn phí mà vẫn bài bản?", "Where can I learn lash extensions for free, properly?", "Mistä voi opiskella ripsienpidennyksiä ilmaiseksi ja perusteellisesti?"),
        a: l3(
          "Tại Học viện VaraaAi. Khóa Nghề Mi gồm tám chủ đề: chuẩn bị và tư vấn, classic, volume, hybrid, lash mapping, mega volume – wispy – wet look, dặm và tháo mi, uốn và nhuộm mi. Mỗi chủ đề có một video lý thuyết và một video thực hành, miễn phí, không cần đăng ký.",
          "At VaraaAi Academy. The Lashes course has eight topics: preparation and consultation, classic, volume, hybrid, lash mapping, mega volume, wispy and wet look, refills and removal, and lash lift and tint. Each topic has a theory video and a practice video. It is free and needs no sign-up.",
          "VaraaAi-akatemiassa. Ripset-kurssissa on kahdeksan aihetta: valmistelu ja konsultaatio, klassiset, volyymi, hybridi, ripsikartoitus, megavolyymi, wispy ja wet look, huolto ja poisto sekä kestotaivutus ja värjäys. Jokaisessa aiheessa on teoria- ja käytäntövideo. Kurssi on ilmainen eikä vaadi rekisteröitymistä."
        ),
      },
      {
        q: l3("Người mới nên học nối mi theo thứ tự nào?", "In what order should a beginner learn?", "Missä järjestyksessä aloittelijan kannattaa edetä?"),
        a: l3(
          "Hãy bắt đầu từ bài chuẩn bị và tư vấn, sau đó học nối mi classic để quen nguyên tắc một sợi nối cho một sợi mi thật. Khi tay đã chắc mới sang volume, hybrid và lash mapping. Mega volume, wispy và wet look nên để sau cùng, vì dễ làm mi thật quá tải.",
          "Start with preparation and consultation, then classic lashes to get used to one extension per natural lash. Move on to volume, hybrid and lash mapping once your hands are steady. Leave mega volume, wispy and wet look until last, because they can easily overload the natural lashes.",
          "Aloita valmistelusta ja konsultaatiosta ja jatka klassisiin ripsiin, jotta periaate yksi pidennys yhteen omaan ripseen tulee tutuksi. Siirry volyymiin, hybridiin ja kartoitukseen, kun kädet ovat varmat. Jätä megavolyymi, wispy ja wet look viimeiseksi, koska ne kuormittavat omia ripsiä helposti."
        ),
      },
      {
        q: l3("Học xong có được cấp chứng chỉ hành nghề nối mi không?", "Do I get a lash qualification at the end?", "Saanko kurssista ripsiteknikon pätevyyden?"),
        a: l3(
          "Không. Khi học xong mọi bài hiện có của nhánh Học nghề, bạn tải được chứng nhận hoàn thành khóa học trực tuyến của VaraaAi, nhưng đó không phải chứng chỉ hành nghề hay bằng cấp chính thức. Quy định mỗi nước mỗi khác, và bạn vẫn cần thực hành có người hướng dẫn đủ chuyên môn.",
          "No. When you finish every available lesson in the craft track you can download VaraaAi's certificate of completion for the online course, but it is not a professional licence or an official qualification. Rules differ from country to country, and you still need hands-on practice with a qualified trainer.",
          "Et. Kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit ladata VaraaAin todistuksen verkkokurssin suorittamisesta, mutta se ei ole ammattipätevyys eikä virallinen tutkinto. Säännöt vaihtelevat maittain, ja tarvitset silti käytännön harjoittelua pätevän kouluttajan ohjauksessa."
        ),
      },
      {
        q: l3("Thử keo trước khi nối có bảo đảm khách không bị dị ứng không?", "Does a patch test guarantee the client won't react?", "Takaako testi, ettei asiakas saa reaktiota?"),
        a: l3(
          "Không. Bài chuẩn bị giải thích vì sao nên thử keo trước lần nối đầu tiên và vì sao kết quả thử không phải là bảo đảm. Bạn học cách hỏi tiền sử dị ứng và khi nào không làm; còn cách xử lý khi khách bị phản ứng có trong khóa Vệ sinh & an toàn.",
          "No. The preparation lesson explains why a test before the first set makes sense and why the result is never a guarantee. You learn how to ask about allergies and when not to work, and the Hygiene & safety course covers what to do if a client reacts.",
          "Ei. Valmistelutunti kertoo, miksi testi ennen ensimmäistä kertaa on järkevä ja miksi tulos ei ole koskaan takuu. Opit kysymään allergioista ja tunnistamaan, milloin ei pidä tehdä hoitoa, ja Hygienia ja turvallisuus -kurssi kertoo, mitä tehdään, jos asiakas saa reaktion."
        ),
      },
      {
        q: l3("Video bằng tiếng gì, có học trên điện thoại được không?", "What language are the videos in, and do they work on a phone?", "Millä kielellä videot ovat, ja toimivatko ne puhelimella?"),
        a: l3(
          "Video thuyết minh bằng tiếng Việt, giọng người thầy. Phần “Những điều cần nhớ” và câu hỏi kiểm tra có cả tiếng Việt, tiếng Anh và tiếng Phần Lan. Bạn học được trên điện thoại, máy tính bảng hay máy tính; tiến độ lưu trong trình duyệt, nên hãy học trên cùng một trình duyệt.",
          "The videos are narrated in Vietnamese by a teacher's voice. The key points and quizzes are available in Vietnamese, English and Finnish. Everything works on a phone, tablet or computer; progress is saved in your browser, so keep using the same browser.",
          "Videoiden kertojaääni on vietnamiksi. Tärkeimmät kohdat ja visat ovat vietnamiksi, englanniksi ja suomeksi. Kaikki toimii puhelimella, tabletilla ja tietokoneella; edistyminen tallentuu selaimeen, joten käytä samaa selainta."
        ),
      },
    ],
    keywords: [
      "học nối mi online miễn phí",
      "học nối mi ở đâu",
      "khóa học nối mi cho người mới",
      "cách nối mi classic",
      "học nối mi volume",
      "lash mapping là gì",
      "cách tháo mi nối an toàn",
      "học uốn mi",
    ],
  },
  /* ================= craft: hair ================= */
  {
    id: "p-hair",
    slug: "hoc-cat-toc-online",
    metaTitle: l3(
      "Học cắt tóc online miễn phí: tóc nam, tóc nữ, fade",
      "Learn Hair Cutting Online for Free: Men's, Women's, Fades",
      "Hiustenleikkuu verkossa ilmaiseksi: miehet, naiset, fade"
    ),
    metaDescription: l3(
      "Học cắt tóc online miễn phí bằng tiếng Việt: tư vấn, chia vùng, cắt nam cơ bản, fade, cắt bằng, cắt tầng, mái và sấy tạo kiểu. Hiểu vì sao rồi mới cắt.",
      "Free online hair course: consultation, sectioning, men's basics, fades, one-length cuts, layers, fringes and blow-drying. Understand the why, then cut.",
      "Ilmainen hiuskurssi verkossa: konsultaatio, jaottelu, miesten perusleikkaus, fade, tasapituinen, kerrokset, otsatukka ja föönaus. Ymmärrä ensin miksi."
    ),
    headline: l3(
      "Học cắt tóc online miễn phí: từ tư vấn, chia vùng đến fade, cắt tầng và sấy tạo kiểu",
      "Learn hair cutting online for free: from consultation and sectioning to fades, layers and blow-drying",
      "Opi hiustenleikkuu verkossa ilmaiseksi: konsultaatiosta ja jaottelusta fadeen, kerroksiin ja föönaukseen"
    ),
    tagline: l3(
      "Nắm vững những chữ mà bài cắt nào cũng dùng, rồi xem từng đường kéo, đường tông đơ ngay trên hình.",
      "Master the vocabulary every cut relies on, then follow each scissor and clipper move on the picture.",
      "Opi käsitteet, joihin jokainen leikkaus perustuu, ja seuraa sitten jokaista saksien ja koneen liikettä kuvassa."
    ),
    level: l3("Cơ bản, cho người mới vào nghề tóc", "Foundation level, for newcomers to hairdressing", "Perustaso, hiusalan aloittelijoille"),
    outcomes: [
      l3(
        "Tư vấn kiểu tóc bằng điểm chạm, đọc dáng mặt, chất tóc và hướng mọc.",
        "Agree on length with touch points and read face shape, texture and growth patterns.",
        "Sovit pituuden kosketuspisteillä ja luet kasvonmuodon, hiuksen laadun ja kasvusuunnat."
      ),
      l3(
        "Chia tóc thành bảy vùng, hiểu đường chuẩn, góc nâng, lực căng và kiểm tra chéo.",
        "Divide hair into seven sections and use guidelines, elevation, tension and cross-checking.",
        "Jaat hiukset seitsemään osioon ja käytät ohjauslinjaa, kohotusta, kireyttä ja ristiintarkistusta."
      ),
      l3(
        "Cắt tóc nam gọn, cân với tông đơ trên lược và kéo trên lược.",
        "Give a clean, balanced men's cut with clipper-over-comb and scissor-over-comb.",
        "Teet siistin ja tasapainoisen miesten leikkauksen koneella ja saksilla kamman yli."
      ),
      l3(
        "Làm fade low, mid, high: đặt đường guideline, xoá đường và hoàn thiện viền.",
        "Cut low, mid and high fades: set guidelines, erase lines and finish the edges.",
        "Leikkaat matalan, keskikorkean ja korkean faden: ohjauslinjat, häivytys ja reunojen viimeistely."
      ),
      l3(
        "Cắt tóc nữ bằng, bob, cắt tầng và cắt mái mà không bị quá ngắn.",
        "Cut one-length bobs, layers and fringes for women without taking too much length.",
        "Leikkaat naisille tasapituisen polkan, kerrokset ja otsatukan leikkaamatta liian lyhyeksi."
      ),
      l3(
        "Sấy phồng chân tóc, sấy cụp, uốn lọn bằng lược tròn, bảo vệ tóc khỏi nhiệt.",
        "Blow-dry for root lift, smooth ends and round-brush curls, with heat protection.",
        "Föönaat tyvikohotuksen, sileät latvat ja pyöröharjakiharat lämpösuojaa käyttäen."
      ),
    ],
    intro: [
      l3(
        "Muốn học cắt tóc online nhưng không biết bắt đầu từ đâu? Khóa học Nghề Tóc của Học viện VaraaAi dạy cắt tóc từ gốc, bằng tiếng Việt, cho người mới vào nghề và cho cả những thợ muốn sửa các thói quen chưa đúng. Khóa học miễn phí, không cần tạo tài khoản và học được ngay trên điện thoại, lúc rảnh ở tiệm hay buổi tối ở nhà.",
        "Want to learn hair cutting online but not sure where to start? The Hair course at VaraaAi Academy teaches cutting from the ground up, for newcomers to the trade and for stylists who want to fix habits that hold them back. The videos are narrated in Vietnamese, with the key points and quizzes also written in English. It is free, needs no account and works on your phone, whether you have a quiet moment at the salon or an evening at home.",
        "Haluatko opiskella hiustenleikkuuta verkossa, mutta et tiedä mistä aloittaa? VaraaAi-akatemian Hiukset-kurssi opettaa leikkaamisen perusteista alkaen sekä alan aloittelijoille että parturi-kampaajille, jotka haluavat korjata vääriä tottumuksia. Kertojaääni on vietnamiksi, ja tärkeimmät kohdat ja visat on kirjoitettu myös suomeksi. Kurssi on ilmainen, ei vaadi tiliä ja toimii puhelimella, olipa sinulla hetki aikaa salongissa tai ilta kotona."
      ),
      l3(
        "Rất nhiều kiểu tóc hỏng ngay từ lúc tư vấn, trước khi kéo chạm vào tóc. Vì vậy khóa học mở đầu bằng bài tư vấn và chia vùng: cách thống nhất độ dài với khách bằng điểm chạm, đọc dáng mặt, dáng đầu, mật độ, chất tóc, độ xoăn và hướng mọc, sự khác nhau giữa tóc ướt và tóc khô, nhìn da đầu, gội êm và an toàn. Bạn học chia tóc thành bảy vùng và những chữ mà bài cắt nào cũng dùng: đường chuẩn, góc nâng, kéo lệch, lực căng, kiểm tra chéo.",
        "Many haircuts go wrong at the consultation, before the scissors ever touch the hair. That is why the course opens with consultation and sectioning: agreeing length with the client using touch points, reading face and head shape, density, texture, curl and growth patterns, the difference between wet and dry hair, the scalp check, and a comfortable, safe shampoo. You learn the seven sections and the words every cut uses: guideline, elevation, over-direction, tension and cross-checking.",
        "Moni leikkaus epäonnistuu jo konsultaatiossa, ennen kuin sakset koskevat hiuksiin. Siksi kurssi alkaa konsultaatiosta ja jaottelusta: pituudesta sovitaan asiakkaan kanssa kosketuspisteiden avulla, luetaan kasvon- ja pään muoto, tiheys, laatu, kiharuus ja kasvusuunnat, opitaan märän ja kuivan hiuksen ero, päänahan tarkistus sekä miellyttävä ja turvallinen pesu. Opit seitsemän osiota ja käsitteet, joita jokainen leikkaus käyttää: ohjauslinja, kohotus, ylisuuntaus, kireys ja ristiintarkistus."
      ),
      l3(
        "Phần tóc nam đi từ cơ bản đến kiểu: các phần của kiểu tóc nam và hai mốc là đường vòng đầu và xương chẩm, cữ tông đơ và cần gạt, cách cầm kéo đúng, kéo trên lược và tông đơ trên lược, nối phần đỉnh với hai bên. Tiếp theo là fade low, mid, high với cách đặt đường guideline, mở và đóng cần gạt, xoá đường, hoàn thiện viền; rồi các kiểu side part, crop với cách cắt phần trên, tạo texture và vuốt sáp.",
        "The men's section goes from basics to styles: the parts of a men's cut and its two landmarks, the parietal ridge and the occipital bone, clipper guards and the taper lever, holding scissors correctly, scissor-over-comb and clipper-over-comb, and blending the top into the sides. Next come low, mid and high fades, with setting guidelines, opening and closing the lever, erasing lines and finishing the edges, and then side parts and crops: cutting the top, adding texture and finishing with product.",
        "Miesten osio etenee perusteista tyyleihin: miesten leikkauksen osat ja kaksi maamerkkiä, päälaen kaari ja takaraivon luu, koneen kampaterät ja säätövipu, saksien oikea ote, sakset ja kone kamman yli sekä päälaen häivyttäminen sivuihin. Sen jälkeen tulevat matala, keskikorkea ja korkea fade, ohjauslinjat, vivun avaaminen ja sulkeminen, rajojen häivytys ja reunojen viimeistely, ja lopuksi sivujakaus ja crop: päällisen leikkaus, tekstuuri ja muotoilutuotteet."
      ),
      l3(
        "Phần tóc nữ gồm cắt bằng và bob với góc nâng 0°, cắt tầng với góc nâng 90° và 180°, tầng ôm quanh mặt mà vẫn giữ độ dài, cắt mái thưa, curtain bangs và cách tránh cắt quá ngắn. Bài cuối là sấy tạo kiểu: sấy phồng chân tóc, sấy cụp, tạo lọn bằng lược tròn và bảo vệ tóc khỏi nhiệt. Mỗi chủ đề có hai video: “Lý thuyết & kinh nghiệm” để hiểu vì sao, và “Thực hành từng bước” với dấu đánh trên hình. Các video được đăng dần theo từng chủ đề.",
        "The women's section covers one-length cuts and bobs at zero elevation, layers at 90° and 180°, face-framing layers that keep the length, wispy fringes, curtain bangs and how not to cut too short. The last topic is blow-drying: root lift, smooth ends, round-brush curls and heat protection. Every topic has two videos, “Theory & experience” to understand why and “Step-by-step practice” with markers on the picture. The videos are being published topic by topic.",
        "Naisten osio kattaa tasapituisen leikkauksen ja polkan nollakohotuksella, kerrokset 90 ja 180 asteen kohotuksella, kasvoja kehystävät kerrokset pituutta menettämättä, kevyen otsatukan, verho-otsatukan ja sen, miten vältetään liian lyhyt lopputulos. Viimeinen aihe on föönaus: tyvikohotus, sileät latvat, pyöröharjakiharat ja lämpösuoja. Jokaisessa aiheessa on kaksi videota, ”Teoria ja kokemus” ja ”Käytäntö vaihe vaiheelta” merkkeineen. Videoita julkaistaan aihe kerrallaan."
      ),
      l3(
        "Bạn tự ôn bằng phần “Những điều cần nhớ” và câu hỏi kiểm tra nhanh, tiến độ được lưu trong trình duyệt. Học xong mọi bài hiện có của nhánh Học nghề, bạn tải được chứng nhận hoàn thành khóa học trực tuyến. Video là tài liệu hỗ trợ học tập: tay nghề tóc chỉ vững khi bạn luyện trên đầu mẫu và người thật, có thợ giỏi hướng dẫn, và làm theo quy định ở nơi mình làm việc.",
        "You can revise with the “Key points” and quick quizzes, and your progress is saved in your browser. When you have finished every available lesson in the craft track, you can download a certificate of completion for the online course. The videos are a learning aid: cutting skills only become reliable with practice on mannequin heads and real people under an experienced stylist, following the rules where you work.",
        "Voit kerrata ”Muista nämä” -osion ja pikavisojen avulla, ja edistymisesi tallentuu selaimeen. Kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit ladata todistuksen verkkokurssin suorittamisesta. Videot ovat oppimisen tuki: leikkaustaito varmistuu vasta harjoittelemalla harjoituspäillä ja oikeilla ihmisillä kokeneen ammattilaisen ohjauksessa ja työpaikan määräyksiä noudattaen."
      ),
    ],
    forWho: [
      l3(
        "Người mới muốn vào nghề tóc và cần nền tảng chắc trước khi cầm kéo cho khách.",
        "Newcomers to hairdressing who want solid foundations before cutting for clients.",
        "Hiusalan aloittelijat, jotka haluavat vahvan pohjan ennen asiakkaiden leikkaamista."
      ),
      l3(
        "Thợ tóc nam muốn làm fade sạch và nối phần đỉnh với hai bên mượt hơn.",
        "Barbers who want cleaner fades and a smoother blend from the top into the sides.",
        "Parturit, jotka haluavat siistimmät fadet ja pehmeämmän siirtymän päälaelta sivuihin."
      ),
      l3(
        "Thợ nail, thợ mi muốn học thêm nghề tóc để làm nhiều dịch vụ hơn trong tiệm.",
        "Nail and lash techs who want to add hair services to what their salon offers.",
        "Kynsi- ja ripsiteknikot, jotka haluavat lisätä hiuspalveluita salongin valikoimaan."
      ),
      l3(
        "Chủ salon cần tài liệu tiếng Việt để thống nhất cách tư vấn và cắt cho cả đội.",
        "Salon owners who need Vietnamese material to align consultation and cutting across the team.",
        "Salongin omistajat, jotka tarvitsevat vietnaminkielistä materiaalia yhtenäiseen konsultaatioon ja leikkaustapaan."
      ),
    ],
    faq: [
      {
        q: l3("Học cắt tóc online miễn phí có hiệu quả không?", "Does learning to cut hair online for free really work?", "Toimiiko hiustenleikkuun opiskelu verkossa?"),
        a: l3(
          "Học online giúp bạn hiểu đúng nguyên tắc: điểm chạm, chia vùng, góc nâng, lực căng, cách đi tông đơ và kéo, và bạn xem lại được từng thao tác nhiều lần. Nhưng tay nghề chỉ vững khi luyện trên đầu mẫu và người thật, có người hướng dẫn sửa cho bạn.",
          "Online lessons help you understand the principles: touch points, sectioning, elevation, tension and how to move the clippers and scissors, and you can rewatch every move. But your hands only become reliable with practice on mannequin heads and real people, with someone correcting you.",
          "Verkkotunnit auttavat ymmärtämään periaatteet: kosketuspisteet, jaottelun, kohotuksen, kireyden sekä koneen ja saksien liikkeet, ja jokaisen liikkeen voi katsoa uudelleen. Käsi varmistuu kuitenkin vasta harjoittelemalla harjoituspäillä ja oikeilla ihmisillä ohjaajan korjatessa."
        ),
      },
      {
        q: l3("Khóa học cắt tóc gồm những bài nào?", "What does the hair course include?", "Mitä hiuskurssi sisältää?"),
        a: l3(
          "Tư vấn và chia vùng, cắt tóc nam cơ bản, fade low – mid – high, kiểu nam side part và crop, cắt tóc nữ bằng và bob, cắt tầng, cắt mái và tỉa quanh mặt, và sấy tạo kiểu. Mỗi chủ đề có một video lý thuyết và một video thực hành.",
          "Consultation and sectioning, men's haircut basics, low, mid and high fades, men's styles such as the side part and crop, one-length cuts and bobs, layers, fringes and face framing, and blow-drying. Each topic has a theory video and a practice video.",
          "Konsultaatio ja jaottelu, miesten perusleikkaus, matala, keskikorkea ja korkea fade, miesten tyylit kuten sivujakaus ja crop, tasapituinen leikkaus ja polkka, kerrokset, otsatukka ja kasvojen kehystys sekä föönaus. Jokaisessa aiheessa on teoria- ja käytäntövideo."
        ),
      },
      {
        q: l3("Khóa học đã có đủ video chưa?", "Are all the videos available yet?", "Ovatko kaikki videot jo saatavilla?"),
        a: l3(
          "Video được đăng dần theo từng chủ đề. Nên bắt đầu với bài tư vấn, chia vùng và cắt tóc nam cơ bản; bài nào chưa có video sẽ ghi “Sắp ra mắt” trong danh sách. Tiến độ của bạn được lưu, nên khi bài mới lên bạn học tiếp được ngay.",
          "The videos are being published topic by topic. Start with consultation, sectioning and the men's basics; any lesson without a video yet is marked “Coming soon” in the list. Your progress is kept, so you can carry on as soon as new lessons appear.",
          "Videoita julkaistaan aihe kerrallaan. Aloita konsultaatiosta, jaottelusta ja miesten perusleikkauksesta; oppitunnit, joiden video ei ole vielä valmis, on merkitty luetteloon ”Tulossa pian”. Edistymisesi säilyy, joten voit jatkaa heti, kun uusia oppitunteja ilmestyy."
        ),
      },
      {
        q: l3("Học xong có được cấp chứng chỉ hành nghề tóc không?", "Do I get a hairdressing qualification at the end?", "Saanko kurssista parturi-kampaajan pätevyyden?"),
        a: l3(
          "Không. Khi học xong mọi bài hiện có của nhánh Học nghề, bạn tải được chứng nhận hoàn thành khóa học trực tuyến của VaraaAi, nhưng đó không phải chứng chỉ hành nghề hay bằng cấp chính thức. Quy định mỗi nước mỗi khác, và bạn vẫn cần thực hành có người hướng dẫn đủ chuyên môn.",
          "No. When you finish every available lesson in the craft track you can download VaraaAi's certificate of completion for the online course, but it is not a professional licence or an official qualification. Rules differ from country to country, and you still need hands-on practice with a qualified trainer.",
          "Et. Kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit ladata VaraaAin todistuksen verkkokurssin suorittamisesta, mutta se ei ole ammattipätevyys eikä virallinen tutkinto. Säännöt vaihtelevat maittain, ja tarvitset silti käytännön harjoittelua pätevän kouluttajan ohjauksessa."
        ),
      },
      {
        q: l3("Video bằng tiếng gì, có học trên điện thoại được không?", "What language are the videos in, and do they work on a phone?", "Millä kielellä videot ovat, ja toimivatko ne puhelimella?"),
        a: l3(
          "Video thuyết minh bằng tiếng Việt, giọng người thầy. Phần “Những điều cần nhớ” và câu hỏi kiểm tra có cả tiếng Việt, tiếng Anh và tiếng Phần Lan. Bạn học được trên điện thoại, máy tính bảng hay máy tính; tiến độ lưu trong trình duyệt, nên hãy học trên cùng một trình duyệt.",
          "The videos are narrated in Vietnamese by a teacher's voice. The key points and quizzes are available in Vietnamese, English and Finnish. Everything works on a phone, tablet or computer; progress is saved in your browser, so keep using the same browser.",
          "Videoiden kertojaääni on vietnamiksi. Tärkeimmät kohdat ja visat ovat vietnamiksi, englanniksi ja suomeksi. Kaikki toimii puhelimella, tabletilla ja tietokoneella; edistyminen tallentuu selaimeen, joten käytä samaa selainta."
        ),
      },
    ],
    keywords: [
      "học cắt tóc online",
      "học cắt tóc nam cơ bản",
      "học cắt tóc nữ",
      "cách cắt tóc fade",
      "học nghề tóc miễn phí",
      "cách cắt tóc layer",
      "cách sấy tóc tạo kiểu",
      "học cắt tóc ở đâu",
    ],
  },
  /* ================= craft: spa ================= */
  {
    id: "p-spa",
    slug: "hoc-spa-cham-soc-da",
    metaTitle: l3(
      "Học spa, chăm sóc da online miễn phí: facial, massage, wax",
      "Learn Spa & Skin Care Online for Free: Facials, Massage",
      "Spa- ja ihonhoitokurssi verkossa: kasvohoito, hieronta"
    ),
    metaDescription: l3(
      "Khóa học spa online miễn phí bằng tiếng Việt: soi da, chăm sóc da mặt, massage mặt, massage body, waxing và chăm sóc tay chân. Đúng trình tự, an toàn.",
      "Free online spa course: skin analysis, facials, facial and body massage, waxing, and spa hand and foot care. The right order and the safe way, on your phone.",
      "Ilmainen spa-kurssi verkossa: ihoanalyysi, kasvohoito, kasvo- ja vartalohieronta, vahaus sekä käsi- ja jalkahoidot. Oikea järjestys, turvallisesti."
    ),
    headline: l3(
      "Học spa và chăm sóc da online miễn phí: từ soi da, facial đến massage và waxing",
      "Learn spa and skin care online for free: from skin analysis and facials to massage and waxing",
      "Opi spa- ja ihonhoito verkossa ilmaiseksi: ihoanalyysistä kasvohoitoon, hierontaan ja vahaukseen"
    ),
    tagline: l3(
      "Học đúng trình tự từng liệu trình và những chống chỉ định cần biết trước khi chạm vào khách.",
      "Learn the right order of each treatment and the contraindications to check before you touch a client.",
      "Opit hoitojen oikean järjestyksen ja vasta-aiheet, jotka tarkistetaan ennen kuin kosket asiakkaaseen."
    ),
    level: l3("Cơ bản, cho người mới vào nghề spa", "Foundation level, for newcomers to spa work", "Perustaso, spa-alan aloittelijoille"),
    outcomes: [
      l3(
        "Soi da, nhận biết loại da, tình trạng da và ghi phiếu khách đầy đủ.",
        "Analyse the skin, recognise skin types and conditions, and keep a proper client record.",
        "Analysoit ihon, tunnistat ihotyypit ja ihon tilan ja pidät asiakaskortin ajan tasalla."
      ),
      l3(
        "Làm facial cơ bản đúng thứ tự: tẩy trang, tẩy da chết, xông, mặt nạ, dưỡng.",
        "Give a basic facial in the right order: cleanse, exfoliate, steam, mask and care.",
        "Teet peruskasvohoidon oikeassa järjestyksessä: puhdistus, kuorinta, höyry, naamio ja hoito."
      ),
      l3(
        "Massage mặt với động tác vuốt, miết, nhấn huyệt theo hướng nâng cơ.",
        "Give a facial massage with effleurage, kneading and pressure points in a lifting direction.",
        "Teet kasvohieronnan sivelyin, hieroen ja painelupisteitä käyttäen kohottavaan suuntaan."
      ),
      l3(
        "Massage body kiểu Thụy Điển cơ bản với tư thế, lực tay và trình tự đúng.",
        "Give a basic Swedish body massage with good posture, steady pressure and a clear sequence.",
        "Teet klassisen hieronnan perusteet oikealla työasennolla, paineella ja järjestyksellä."
      ),
      l3(
        "Wax an toàn: đúng nhiệt độ sáp, đúng chiều thoa và giật, chăm sóc sau wax.",
        "Wax safely: the right temperature, direction of application and removal, and aftercare.",
        "Vahaat turvallisesti: oikea lämpötila, levitys- ja vetosuunta sekä jälkihoito."
      ),
      l3(
        "Làm chăm sóc tay chân kiểu spa và giữ bồn ngâm luôn sạch sẽ.",
        "Give spa hand and foot treatments with scrub and paraffin, and keep the basin hygienic.",
        "Teet spa-käsi- ja jalkahoidot kuorinnalla ja parafiinilla ja pidät altaan hygieenisenä."
      ),
    ],
    intro: [
      l3(
        "Bạn muốn học spa, học chăm sóc da mặt nhưng chưa có thời gian hay chi phí cho một khóa học dài? Khóa học Spa & chăm sóc da của Học viện VaraaAi giúp bạn có nền tảng đúng ngay từ đầu: học bằng tiếng Việt, miễn phí, không cần tạo tài khoản và xem được trên điện thoại. Khóa học dành cho người mới vào nghề spa, và cho thợ nail, thợ mi muốn làm thêm dịch vụ chăm sóc da trong tiệm.",
        "Want to learn spa and skin care but don't have the time or budget for a long course yet? The Spa & skin care course at VaraaAi Academy gives you the right foundations from the start. The videos are narrated in Vietnamese, with key points also written in English. It is free, needs no account and works on your phone. It is made for newcomers to spa work and for nail and lash techs who want to add skin care to their salon.",
        "Haluatko opiskella spa- ja ihonhoitoa, mutta pitkälle kurssille ei vielä ole aikaa tai rahaa? VaraaAi-akatemian Spa ja ihonhoito -kurssi antaa oikean pohjan heti alusta. Kertojaääni on vietnamiksi, ja tärkeimmät kohdat on kirjoitettu myös suomeksi. Kurssi on ilmainen, ei vaadi tiliä ja toimii puhelimella. Se on tehty spa-alan aloittelijoille sekä kynsi- ja ripsiteknikoille, jotka haluavat lisätä ihonhoitoa salonkinsa palveluihin."
      ),
      l3(
        "Mọi liệu trình đều bắt đầu từ việc soi da và tư vấn. Bạn học cách nhận biết loại da và tình trạng da, những chống chỉ định khiến bạn chưa nên làm, và cách ghi phiếu khách để lần sau làm tiếp cho đúng. Từ đó, bài chăm sóc da mặt cơ bản đi theo đúng thứ tự: tẩy trang, rửa mặt, tẩy da chết, xông, đắp mặt nạ và dưỡng, kèm lý do vì sao bước này phải đứng trước bước kia.",
        "Every treatment starts with skin analysis and consultation. You learn to recognise skin types and conditions, the contraindications that mean you should not go ahead, and how to keep a client record so the next visit builds on the last. From there, the basic facial follows the right order: cleansing, exfoliation, steam, mask and care, with the reason why each step comes before the next.",
        "Jokainen hoito alkaa ihoanalyysillä ja konsultaatiolla. Opit tunnistamaan ihotyypit ja ihon tilan, vasta-aiheet, joiden vuoksi hoitoa ei pidä tehdä, sekä pitämään asiakaskorttia, jotta seuraava käynti jatkaa siitä mihin edellinen jäi. Peruskasvohoito etenee oikeassa järjestyksessä: puhdistus, kuorinta, höyry, naamio ja hoitotuotteet, ja jokaisen vaiheen kohdalla kerrotaan, miksi se tulee juuri siinä kohtaa."
      ),
      l3(
        "Phần massage gồm massage mặt với các động tác vuốt, miết, nhấn huyệt và hướng đi tay nâng cơ, và massage body kiểu Thụy Điển cơ bản: tư thế đứng, lực tay, trình tự lưng – vai – chân và các chống chỉ định. Bài waxing dạy nhiệt độ sáp, hướng thoa và hướng giật, quy tắc không nhúng que hai lần và cách chăm sóc sau wax. Bài cuối là chăm sóc tay chân kiểu spa: tẩy da chết, ủ paraffin, massage tay chân và vệ sinh bồn ngâm.",
        "The massage lessons cover facial massage, with effleurage, kneading, pressure points and the lifting direction of every stroke, and the basics of Swedish body massage: posture, pressure, the back, shoulders and legs sequence, and contraindications. The waxing lesson teaches wax temperature, the direction of application and removal, the no double-dipping rule and aftercare. The last topic is spa hand and foot care: scrub, paraffin, hand and foot massage and keeping the foot basin hygienic.",
        "Hierontaosio kattaa kasvohieronnan sivelyineen, hierontaotteineen ja painelupisteineen sekä jokaisen liikkeen kohottavan suunnan, ja klassisen hieronnan perusteet: työasento, paine, selkä–hartiat–jalat-järjestys ja vasta-aiheet. Vahausoppitunti opettaa vahan lämpötilan, levitys- ja vetosuunnan, kaksoiskastamisen kiellon ja jälkihoidon. Viimeinen aihe on spa-käsi- ja jalkahoito: kuorinta, parafiini, käsi- ja jalkahieronta sekä jalkakylpyaltaan hygienia."
      ),
      l3(
        "Giống các khóa học nghề khác của Học viện, mỗi chủ đề có hai video: “Lý thuyết & kinh nghiệm”, nơi người thầy giải thích vì sao và kể những tình huống thật hay gặp, và “Thực hành từng bước” với dấu đánh ngay trên hình. Các video được đăng dần theo từng chủ đề. Nên học kèm khóa Vệ sinh & an toàn để nắm cách xử lý dụng cụ, phòng dị ứng và sơ cứu khi có sự cố như bỏng sáp.",
        "As in the Academy's other craft courses, every topic has two videos: “Theory & experience”, where the mentor explains the why and the situations you will really meet, and “Step-by-step practice” with markers on the picture. The videos are being published topic by topic. Take the Hygiene & safety course alongside it to learn tool hygiene, allergy prevention and first aid for incidents such as wax burns.",
        "Kuten akatemian muillakin ammattikursseilla, jokaisessa aiheessa on kaksi videota: ”Teoria ja kokemus”, jossa mentori kertoo miksi ja millaisia tilanteita työssä tulee vastaan, ja ”Käytäntö vaihe vaiheelta” merkkeineen. Videoita julkaistaan aihe kerrallaan. Käy rinnalla Hygienia ja turvallisuus -kurssi, niin opit välinehygienian, allergioiden ehkäisyn ja ensiavun esimerkiksi vahapalovammoissa."
      ),
      l3(
        "Tiến độ được lưu trong trình duyệt, và khi học xong mọi bài hiện có của nhánh Học nghề, bạn tải được chứng nhận hoàn thành khóa học trực tuyến. Video là tài liệu hỗ trợ học tập, không thay cho thực hành có người hướng dẫn. Ở một số nước, một số dịch vụ hoặc chức danh cần bằng cấp hay giấy phép riêng, nên hãy tìm hiểu quy định nơi bạn làm việc trước khi nhận khách.",
        "Your progress is saved in your browser, and when you have finished every available lesson in the craft track you can download a certificate of completion for the online course. The videos are a learning aid and do not replace supervised practice. In some countries certain treatments or job titles require their own qualification or licence, so check the rules where you work before taking clients.",
        "Edistymisesi tallentuu selaimeen, ja kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit ladata todistuksen verkkokurssin suorittamisesta. Videot ovat oppimisen tuki eivätkä korvaa ohjattua harjoittelua. Joissakin maissa tietyt hoidot tai ammattinimikkeet edellyttävät omaa koulutusta tai lupaa, joten tarkista oman työpaikkasi säännöt ennen kuin otat asiakkaita."
      ),
    ],
    forWho: [
      l3(
        "Người mới muốn học nghề spa, chăm sóc da và cần nền tảng đúng từ đầu.",
        "Newcomers to spa and skin care who want the right foundations from day one.",
        "Spa- ja ihonhoitoalan aloittelijat, jotka haluavat oikean pohjan alusta asti."
      ),
      l3(
        "Thợ nail, thợ mi muốn thêm dịch vụ facial, waxing hay chăm sóc tay chân.",
        "Nail and lash techs who want to add facials, waxing or spa hand and foot care.",
        "Kynsi- ja ripsiteknikot, jotka haluavat lisätä kasvohoidot, vahaukset tai käsi- ja jalkahoidot."
      ),
      l3(
        "Người Việt ở Phần Lan, châu Âu muốn tìm hiểu nghề spa trước khi học chính quy.",
        "Vietnamese speakers in Finland and Europe exploring spa work before formal training.",
        "Suomessa ja Euroopassa asuvat vietnaminkieliset, jotka tutustuvat spa-alaan ennen virallista koulutusta."
      ),
      l3(
        "Chủ spa, chủ tiệm cần tài liệu tiếng Việt để hướng dẫn nhân viên mới.",
        "Spa and salon owners who need Vietnamese material to guide new staff.",
        "Spa- ja salonkiyrittäjät, jotka tarvitsevat vietnaminkielistä materiaalia uusien työntekijöiden ohjaamiseen."
      ),
    ],
    faq: [
      {
        q: l3("Học spa chăm sóc da online miễn phí ở đâu?", "Where can I learn spa and skin care online for free?", "Mistä voi opiskella spa- ja ihonhoitoa verkossa ilmaiseksi?"),
        a: l3(
          "Tại Học viện VaraaAi. Khóa Spa & chăm sóc da gồm soi da và tư vấn, chăm sóc da mặt cơ bản, massage mặt, massage body kiểu Thụy Điển cơ bản, waxing và chăm sóc tay chân kiểu spa. Mỗi chủ đề có video lý thuyết và video thực hành, miễn phí, không cần đăng ký.",
          "At VaraaAi Academy. The Spa & skin care course covers skin analysis and consultation, a basic facial, facial massage, Swedish body massage basics, waxing, and spa hand and foot treatments. Each topic has a theory video and a practice video. It is free and needs no sign-up.",
          "VaraaAi-akatemiassa. Spa ja ihonhoito -kurssi kattaa ihoanalyysin ja konsultaation, peruskasvohoidon, kasvohieronnan, klassisen hieronnan perusteet, vahauksen sekä spa-käsi- ja jalkahoidot. Jokaisessa aiheessa on teoria- ja käytäntövideo. Kurssi on ilmainen eikä vaadi rekisteröitymistä."
        ),
      },
      {
        q: l3("Người mới chưa biết gì về spa có học được không?", "Can I start with no spa experience at all?", "Voinko aloittaa ilman spa-kokemusta?"),
        a: l3(
          "Được. Hãy bắt đầu với bài soi da và tư vấn, vì mọi liệu trình đều dựa trên việc đọc đúng làn da và phát hiện chống chỉ định. Sau đó học facial cơ bản theo đúng thứ tự, rồi mới đến massage mặt, massage body và waxing.",
          "Yes. Start with skin analysis and consultation, because every treatment depends on reading the skin correctly and spotting contraindications. Then learn the basic facial in the right order before moving on to facial massage, body massage and waxing.",
          "Kyllä. Aloita ihoanalyysistä ja konsultaatiosta, koska jokainen hoito perustuu ihon oikeaan arviointiin ja vasta-aiheiden tunnistamiseen. Opettele sitten peruskasvohoito oikeassa järjestyksessä ja siirry vasta sen jälkeen kasvo- ja vartalohierontaan sekä vahaukseen."
        ),
      },
      {
        q: l3("Các video của khóa spa đã có đủ chưa?", "Are all the spa videos available yet?", "Ovatko kaikki spa-videot jo saatavilla?"),
        a: l3(
          "Khóa học đang được hoàn thiện, và video được đăng dần theo từng chủ đề; bài nào chưa có video sẽ ghi “Sắp ra mắt”. Trong lúc chờ, bạn có thể học khóa Vệ sinh & an toàn, phần kiến thức cần cho mọi dịch vụ spa.",
          "The course is still being completed, and the videos are published topic by topic; lessons without a video yet are marked “Coming soon”. Meanwhile you can take the Hygiene & safety course, which every spa treatment builds on.",
          "Kurssi on vielä valmisteilla, ja videoita julkaistaan aihe kerrallaan; oppitunnit, joiden video puuttuu, on merkitty ”Tulossa pian”. Sillä välin voit käydä Hygienia ja turvallisuus -kurssin, jonka varaan jokainen spa-hoito rakentuu."
        ),
      },
      {
        q: l3("Học xong có được hành nghề spa, massage không?", "Will this course qualify me to work in spa or massage?", "Päteekö kurssi spa- tai hierontatyöhön?"),
        a: l3(
          "Không. Khóa học không cấp chứng chỉ hành nghề hay bằng cấp chính thức; chứng nhận hoàn thành của VaraaAi chỉ xác nhận bạn đã học xong khóa trực tuyến. Quy định mỗi nước khác nhau, có nơi yêu cầu bằng cấp riêng cho một số dịch vụ hay chức danh. Bạn vẫn cần thực hành có người hướng dẫn đủ chuyên môn.",
          "No. The course gives no professional licence or official qualification; VaraaAi's certificate of completion only confirms that you finished the online course. Rules differ by country, and some places require a specific qualification for certain treatments or titles. You still need hands-on practice with a qualified trainer.",
          "Ei. Kurssi ei anna ammattipätevyyttä eikä virallista tutkintoa; VaraaAin todistus vahvistaa vain, että olet suorittanut verkkokurssin. Säännöt vaihtelevat maittain, ja joissakin maissa tietyt hoidot tai nimikkeet edellyttävät omaa koulutusta. Tarvitset silti käytännön harjoittelua pätevän kouluttajan ohjauksessa."
        ),
      },
      {
        q: l3("Waxing có những rủi ro gì cần biết?", "What are the risks of waxing?", "Mitä riskejä vahaukseen liittyy?"),
        a: l3(
          "Rủi ro thường gặp là bỏng vì sáp quá nóng, da bị tổn thương khi thoa hoặc giật sai chiều, và lây nhiễm khi nhúng que hai lần. Bài waxing dạy kiểm tra nhiệt độ sáp, hướng thoa và giật, chăm sóc sau wax; bài xử lý sự cố trong khóa Vệ sinh & an toàn chỉ cách sơ cứu bỏng.",
          "The usual risks are burns from wax that is too hot, skin damage from applying or pulling in the wrong direction, and cross-contamination from double-dipping. The waxing lesson covers checking the temperature, the direction of application and removal, and aftercare, and the incidents lesson in Hygiene & safety covers first aid for burns.",
          "Tavallisimmat riskit ovat liian kuuman vahan aiheuttamat palovammat, väärään suuntaan levittämisestä tai vetämisestä johtuvat ihovauriot ja kaksoiskastamisen aiheuttama tartuntavaara. Vahausoppitunti opettaa lämpötilan tarkistamisen, levitys- ja vetosuunnan sekä jälkihoidon, ja Hygienia ja turvallisuus -kurssin vahinkotilanteita käsittelevä oppitunti palovammojen ensiavun."
        ),
      },
    ],
    keywords: [
      "học spa online miễn phí",
      "học chăm sóc da mặt",
      "khóa học spa cho người mới",
      "quy trình chăm sóc da mặt cơ bản",
      "học massage mặt",
      "học massage body",
      "học waxing",
      "học nghề spa ở đâu",
    ],
  },
  /* ================= craft: hygiene & safety ================= */
  {
    id: "p-safety",
    slug: "ve-sinh-an-toan-salon",
    metaTitle: l3(
      "Vệ sinh an toàn salon: khử khuẩn, tiệt trùng dụng cụ",
      "Salon Hygiene & Safety: Disinfecting and Sterilising Tools",
      "Salongin hygienia ja turvallisuus: välineiden desinfiointi"
    ),
    metaDescription: l3(
      "Học miễn phí cách xử lý dụng cụ sau mỗi khách, rửa tay, găng tay, phòng dị ứng, sơ cứu và kế hoạch tự kiểm soát cho tiệm nail, mi, tóc, spa.",
      "Free lessons on tool hygiene after every client, hands and gloves, allergies, first aid and the in-house control plan for nail, lash, hair and spa salons.",
      "Ilmaiset oppitunnit välineiden käsittelystä asiakkaiden välillä, käsihygieniasta, allergioista, ensiavusta ja omavalvontasuunnitelmasta salongeille."
    ),
    headline: l3(
      "Vệ sinh và an toàn trong salon: những quy tắc mọi thợ nail, mi, tóc, spa phải biết",
      "Salon hygiene and safety: the rules every nail, lash, hair and spa professional must know",
      "Salongin hygienia ja turvallisuus: säännöt, jotka jokaisen kauneusalan ammattilaisen on tunnettava"
    ),
    tagline: l3(
      "Sáu bài ngắn, rõ ràng, lấy ví dụ từ hướng dẫn của thành phố Helsinki, áp dụng được cho cả tiệm.",
      "Six clear lessons, with examples from the City of Helsinki's guidance, that the whole salon can put to use.",
      "Kuusi selkeää oppituntia, esimerkkeinä Helsingin kaupungin ohjeet, koko salongin käyttöön."
    ),
    level: l3("Nền tảng cho mọi người thợ", "The foundation for every professional", "Perusta jokaiselle ammattilaiselle"),
    outcomes: [
      l3(
        "Xử lý dụng cụ sau mỗi khách: làm sạch, khử khuẩn, tiệt trùng và cất giữ.",
        "Handle tools after every client: clean, disinfect, sterilise and store them correctly.",
        "Käsittelet välineet jokaisen asiakkaan jälkeen: puhdistus, desinfiointi, sterilointi ja säilytys."
      ),
      l3(
        "Biết dụng cụ nào cần khử khuẩn, dụng cụ nào phải tiệt trùng hay bỏ đi.",
        "Know which tools need disinfection, which need sterilisation and which are single-use.",
        "Tiedät, mitkä välineet desinfioidaan, mitkä steriloidaan ja mitkä ovat kertakäyttöisiä."
      ),
      l3(
        "Rửa, sát khuẩn tay đúng lúc và chọn găng nitrile, vinyl hay latex phù hợp.",
        "Wash and disinfect hands at the right moments and choose nitrile, vinyl or latex gloves.",
        "Peset ja desinfioit kädet oikeaan aikaan ja valitset nitriili-, vinyyli- tai lateksikäsineet."
      ),
      l3(
        "Phân biệt kích ứng và dị ứng, thử phản ứng trước khi nhuộm.",
        "Tell irritation from allergy and do an allergy alert test before any tint.",
        "Erotat ärsytyksen allergiasta ja teet allergiatestin ennen värjäystä."
      ),
      l3(
        "Nhận ra khi nào không nên làm và từ chối khéo, giữ thể diện cho khách.",
        "Spot when not to treat and decline kindly while keeping the client's dignity.",
        "Tunnistat, milloin hoitoa ei tehdä, ja kieltäydyt ystävällisesti asiakasta kunnioittaen."
      ),
      l3(
        "Sơ cứu khi có sự cố và lập kế hoạch tự kiểm soát cho tiệm.",
        "Give first aid when something goes wrong and draw up your salon's in-house control plan.",
        "Annat ensiavun vahinkotilanteessa ja laadit salongillesi omavalvontasuunnitelman."
      ),
    ],
    intro: [
      l3(
        "Vệ sinh và an toàn là thứ khách không nhìn thấy nhưng cảm nhận được ngay, và ở Phần Lan đó còn là điều cơ quan y tế của thành phố giám sát. Khóa học Vệ sinh & an toàn của Học viện VaraaAi gom lại những quy tắc mà mọi người thợ nail, mi, tóc và spa cần nắm vững, giải thích bằng tiếng Việt cho dễ hiểu. Khóa học miễn phí, xem được ngay trên điện thoại và không cần tạo tài khoản.",
        "Hygiene and safety are things clients never see but always feel, and in Finland they are also supervised by the municipal health authorities. The Hygiene & safety course at VaraaAi Academy brings together the rules every nail, lash, hair and spa professional needs to master. The videos are narrated in Vietnamese, with the key points also written in English. It is free, works on your phone and needs no account.",
        "Hygienia ja turvallisuus ovat asioita, joita asiakas ei näe mutta jotka hän aistii heti, ja Suomessa niitä valvoo myös kunnan terveydensuojeluviranomainen. VaraaAi-akatemian Hygienia ja turvallisuus -kurssi kokoaa säännöt, jotka jokaisen kynsi-, ripsi-, hius- ja spa-ammattilaisen on hallittava. Kertojaääni on vietnamiksi, ja tärkeimmät kohdat on kirjoitettu myös suomeksi. Kurssi on ilmainen, toimii puhelimella eikä vaadi tiliä."
      ),
      l3(
        "Khóa học có sáu bài, mỗi bài một video. Bài đầu tiên là quy trình xử lý dụng cụ sau mỗi khách: làm sạch, khử khuẩn, tiệt trùng, cất giữ, và dụng cụ nào cần mức xử lý nào. Bài thứ hai nói về rửa tay và sát khuẩn tay, chọn găng nitrile, vinyl hay latex, khi nào thay và cách tháo găng, khẩu trang, kính, quần áo làm việc, và cách giữ gìn da tay của chính người thợ.",
        "The course has six lessons, one video each. The first is the routine for tools after every client: cleaning, disinfecting, sterilising and storing, and which tool needs which level. The second covers washing and disinfecting your hands, choosing nitrile, vinyl or latex gloves, when to change them and how to take them off, masks, eye protection and work clothes, and how to look after your own skin.",
        "Kurssissa on kuusi oppituntia, kullakin yksi video. Ensimmäinen käy läpi välineiden käsittelyn jokaisen asiakkaan jälkeen: puhdistus, desinfiointi, sterilointi ja säilytys sekä se, mikä väline vaatii minkäkin tason. Toinen käsittelee käsien pesua ja desinfiointia, nitriili-, vinyyli- ja lateksikäsineiden valintaa, käsineiden vaihtamista ja riisumista, maskia, suojalaseja ja työvaatteita sekä oman ihon hoitoa."
      ),
      l3(
        "Bài về dị ứng giải thích kích ứng khác dị ứng thế nào, vì sao dị ứng đến chậm và thường kéo dài suốt đời, chất nào hay gây dị ứng trong nghề nail, mi và tóc, năm quy tắc phòng tránh và việc thử phản ứng trước khi nhuộm. Bài “Khi nào không làm” chỉ ra những dấu hiệu ở móng, mắt, da đầu và da cho thấy khách nên đi khám trước, cách từ chối khéo léo, và khi nào chính người thợ không nên làm việc.",
        "The allergy lesson explains how irritation differs from allergy, why allergy develops slowly and usually lasts for life, the main culprits in nail, lash and hair work, five rules of prevention, and the allergy alert test before tinting. “When not to treat” shows the signs on nails, eyes, scalp and skin that mean the client should see a doctor or pharmacist first, how to decline kindly, and when the professional should not be working.",
        "Allergiaoppitunti kertoo, miten ärsytys eroaa allergiasta, miksi allergia kehittyy hitaasti ja on yleensä elinikäinen, mitkä aineet aiheuttavat sitä useimmin kynsi-, ripsi- ja hiusalalla, viisi ehkäisysääntöä sekä allergiatestin ennen värjäystä. ”Milloin hoitoa ei tehdä” näyttää kynsien, silmien, päänahan ja ihon merkit, joiden vuoksi asiakkaan kannattaa käydä ensin lääkärissä tai apteekissa, miten kieltäydytään ystävällisesti ja milloin tekijän ei itse pidä tehdä töitä."
      ),
      l3(
        "Bài xử lý sự cố dạy phút đầu tiên khi có vết cắt chảy máu, sản phẩm bắn vào mắt, khách bị phản ứng, bỏng vì sáp nóng, hóa chất hay đèn, khách bị xỉu, hoặc người thợ bị dụng cụ đâm vào tay, rồi cách nói thật với khách, ghi biên bản và bổ sung túi sơ cứu. Bài cuối lấy hướng dẫn của thành phố Helsinki làm ví dụ: thông báo trước khi mở tiệm, kế hoạch tự kiểm soát (omavalvontasuunnitelma), kế hoạch lau dọn, thông gió, rác và vật sắc nhọn, và danh sách kiểm tra lúc mở, đóng cửa.",
        "The incidents lesson teaches the first minute after a bleeding cut, product in the eye, an allergic reaction, a burn from hot wax, chemicals or the lamp, a fainting client or a sharps injury to the professional, and then how to tell the client honestly, write the incident record and restock the first-aid kit. The last lesson uses the City of Helsinki's guidance as its example: notifying before you open, the in-house control plan (omavalvontasuunnitelma), the cleaning plan, ventilation, waste and sharps, and opening and closing checklists.",
        "Vahinkotilanteiden oppitunti opettaa ensimmäisen minuutin, kun kyseessä on vuotava haava, tuotetta silmässä, allerginen reaktio, palovamma kuumasta vahasta, kemikaalista tai lampusta, pyörtyvä asiakas tai tekijän oma pistotapaturma, ja sen jälkeen asiakkaalle kertomisen, tapahtuman kirjaamisen ja ensiapulaukun täydentämisen. Viimeinen oppitunti käyttää esimerkkinä Helsingin kaupungin ohjetta: ilmoitus ennen toiminnan aloittamista, omavalvontasuunnitelma, siivoussuunnitelma, ilmanvaihto, jätteet ja terävät jätteet sekä avaamisen ja sulkemisen tarkistuslistat."
      ),
      l3(
        "Quy định khác nhau theo từng nước và từng thành phố, nên khóa học dạy cách làm tốt chung, dẫn nguồn chính thức khi nêu quy định, và nhắc bạn hỏi cơ quan y tế nơi mình làm việc để biết yêu cầu chính xác. Học xong mọi bài hiện có của nhánh Học nghề, bạn tải được chứng nhận hoàn thành khóa học trực tuyến của VaraaAi. Đây là tài liệu hỗ trợ học tập, không phải chứng chỉ hành nghề và không thay cho hướng dẫn của cơ quan chức năng.",
        "Rules differ by country and city, so the course teaches general good practice, cites official sources whenever it states a rule, and reminds you to ask the health authority where you work for the exact requirements. When you have finished every available lesson in the craft track, you can download VaraaAi's certificate of completion for the online course. It is a learning aid, not a professional licence, and it does not replace guidance from the authorities.",
        "Määräykset vaihtelevat maittain ja kunnittain, joten kurssi opettaa yleisiä hyviä käytäntöjä, viittaa virallisiin lähteisiin aina kun se mainitsee säännön ja muistuttaa kysymään tarkat vaatimukset oman alueen terveydensuojeluviranomaiselta. Kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit ladata VaraaAin todistuksen verkkokurssin suorittamisesta. Kurssi on oppimisen tuki, ei ammattipätevyys, eikä se korvaa viranomaisten ohjeita."
      ),
    ],
    forWho: [
      l3(
        "Thợ nail, mi, tóc, spa mới vào nghề cần nắm quy tắc vệ sinh trước tiên.",
        "New nail, lash, hair and spa professionals who need the hygiene rules first.",
        "Uudet kynsi-, ripsi-, hius- ja spa-ammattilaiset, joiden pitää osata hygieniasäännöt ensimmäisenä."
      ),
      l3(
        "Thợ lâu năm muốn kiểm tra lại thói quen khử khuẩn, tiệt trùng của mình.",
        "Experienced professionals who want to check their disinfection and sterilisation habits.",
        "Kokeneet ammattilaiset, jotka haluavat tarkistaa desinfiointi- ja sterilointitottumuksensa."
      ),
      l3(
        "Người chuẩn bị mở tiệm ở Phần Lan cần hiểu kế hoạch tự kiểm soát.",
        "Anyone opening a salon in Finland who needs to understand the in-house control plan.",
        "Suomeen salonkia perustavat, joiden pitää ymmärtää omavalvontasuunnitelma."
      ),
      l3(
        "Chủ tiệm muốn cả đội làm cùng một quy trình vệ sinh và xử lý sự cố.",
        "Salon owners who want the whole team on one hygiene and incident routine.",
        "Salongin omistajat, jotka haluavat koko tiimille yhteisen hygienia- ja vahinkotilannekäytännön."
      ),
    ],
    faq: [
      {
        q: l3("Vệ sinh dụng cụ làm nail sau mỗi khách thế nào cho đúng?", "How should nail tools be cleaned after every client?", "Miten kynsivälineet käsitellään oikein jokaisen asiakkaan jälkeen?"),
        a: l3(
          "Theo bốn bước: làm sạch bằng bàn chải và xà phòng, khử khuẩn trong dung dịch dành cho dụng cụ đúng nồng độ và thời gian, tiệt trùng với dụng cụ cần mức này, rồi cất giữ khô ráo, tách đồ sạch khỏi đồ bẩn. Đồ dùng một lần như dũa giấy, que gỗ thì bỏ đi.",
          "In four steps: clean with a brush and soap, disinfect in an instrument disinfectant at the right strength and for the full time, sterilise the tools that need it, then store them dry and apart from dirty items. Single-use items such as paper files and wooden sticks go in the bin.",
          "Neljässä vaiheessa: puhdistus harjalla ja saippualla, desinfiointi välineille tarkoitetussa liuoksessa oikealla vahvuudella ja ajalla, sterilointi sitä vaativille välineille sekä kuiva säilytys erillään likaisista. Kertakäyttötuotteet, kuten paperiviilat ja puutikut, heitetään pois."
        ),
      },
      {
        q: l3("Kế hoạch tự kiểm soát (omavalvontasuunnitelma) là gì?", "What is an in-house control plan (omavalvontasuunnitelma)?", "Mikä on omavalvontasuunnitelma?"),
        a: l3(
          "Đó là kế hoạch tiệm tự viết ra để cho thấy mình kiểm soát vệ sinh thế nào. Bài cuối của khóa học lấy hướng dẫn của thành phố Helsinki làm ví dụ, giải thích kế hoạch gồm những gì và cách biến nó thành danh sách kiểm tra lúc mở và đóng cửa. Hãy hỏi cơ quan y tế địa phương về yêu cầu chính xác.",
          "It is the salon's own written plan showing how it keeps hygiene under control. The last lesson uses the City of Helsinki's guidance as its example, explains what goes into the plan and how to turn it into opening and closing checklists. Ask your local health authority for the exact requirements.",
          "Se on salongin oma kirjallinen suunnitelma siitä, miten hygieniaa hallitaan. Kurssin viimeinen oppitunti käyttää esimerkkinä Helsingin kaupungin ohjetta, kertoo mitä suunnitelmaan kuuluu ja miten siitä tehdään avaamisen ja sulkemisen tarkistuslistat. Kysy tarkat vaatimukset oman kuntasi terveydensuojeluviranomaiselta."
        ),
      },
      {
        q: l3("Khóa học có dùng được ở nước khác ngoài Phần Lan không?", "Is the course useful outside Finland?", "Onko kurssista hyötyä Suomen ulkopuolella?"),
        a: l3(
          "Có. Phần lớn nội dung là cách làm tốt chung, dùng được ở mọi nơi: làm sạch rồi mới khử khuẩn, rửa tay, găng tay, phòng dị ứng, sơ cứu. Các ví dụ về quy định lấy từ Phần Lan; quy định khác nhau theo từng nước, nên hãy kiểm tra thêm với cơ quan y tế nơi bạn làm việc.",
          "Yes. Most of it is general good practice that applies everywhere: cleaning before disinfecting, hand hygiene, gloves, allergy prevention and first aid. The examples of rules come from Finland; rules differ by country, so also check with the health authority where you work.",
          "Kyllä. Suurin osa sisällöstä on yleisiä hyviä käytäntöjä, jotka pätevät kaikkialla: puhdistus ennen desinfiointia, käsihygienia, käsineet, allergioiden ehkäisy ja ensiapu. Esimerkit määräyksistä ovat Suomesta; määräykset vaihtelevat maittain, joten tarkista asia myös oman alueesi viranomaiselta."
        ),
      },
      {
        q: l3("Học xong có được giấy chứng nhận vệ sinh an toàn không?", "Do I get an official hygiene certificate?", "Saanko virallisen hygieniatodistuksen?"),
        a: l3(
          "Không. Khi học xong mọi bài hiện có của nhánh Học nghề, bạn tải được chứng nhận hoàn thành khóa học trực tuyến của VaraaAi, nhưng đó không phải chứng chỉ hành nghề hay giấy phép. Bạn vẫn cần được hướng dẫn thực tế tại nơi làm việc và làm theo yêu cầu của cơ quan chức năng.",
          "No. When you finish every available lesson in the craft track you can download VaraaAi's certificate of completion for the online course, but it is not a professional licence or permit. You still need hands-on guidance at your workplace and must follow the requirements of the authorities.",
          "Et. Kun olet suorittanut kaikki ammattipuolen saatavilla olevat oppitunnit, voit ladata VaraaAin todistuksen verkkokurssin suorittamisesta, mutta se ei ole ammattipätevyys eikä lupa. Tarvitset silti käytännön perehdytyksen työpaikalla, ja viranomaisten vaatimuksia on noudatettava."
        ),
      },
      {
        q: l3("Khách bị dị ứng hay bị bỏng trong tiệm thì làm gì?", "What do I do if a client has a reaction or a burn?", "Mitä teen, jos asiakas saa reaktion tai palovamman?"),
        a: l3(
          "Bài xử lý sự cố hướng dẫn phút đầu tiên cho từng tình huống: phản ứng dị ứng, sản phẩm bắn vào mắt, bỏng vì sáp, hóa chất hay đèn, vết cắt, khách bị xỉu. Sau đó nói thật với khách, ghi biên bản sự cố và báo chủ tiệm. Trường hợp nặng, gọi cấp cứu ngay.",
          "The incidents lesson walks you through the first minute of each situation: an allergic reaction, product in the eye, a burn from wax, chemicals or the lamp, a cut or a fainting client. Then tell the client honestly, write the incident record and inform the owner. In a serious case, call the emergency number at once.",
          "Vahinkotilanteiden oppitunti käy läpi ensimmäisen minuutin jokaisessa tilanteessa: allerginen reaktio, tuotetta silmässä, palovamma vahasta, kemikaalista tai lampusta, haava tai pyörtyminen. Kerro sen jälkeen asiakkaalle rehellisesti, kirjaa tapahtuma ja ilmoita omistajalle. Vakavassa tilanteessa soita heti hätänumeroon."
        ),
      },
    ],
    keywords: [
      "vệ sinh dụng cụ nail",
      "khử khuẩn dụng cụ làm nail",
      "tiệt trùng dụng cụ salon",
      "quy định vệ sinh tiệm nail ở Phần Lan",
      "omavalvontasuunnitelma là gì",
      "dị ứng gel nail",
      "an toàn trong tiệm nail",
      "sơ cứu trong salon",
    ],
  },
  /* ================= owners: launch ================= */
  {
    id: "o-start",
    slug: "mo-salon-dat-lich-online",
    metaTitle: l3(
      "Mở salon đặt lịch online: đăng ký, dịch vụ, nhân viên",
      "Set Up Online Booking for Your Salon: Step-by-Step Videos",
      "Salongin verkkoajanvaraus käyttöön: videot vaihe vaiheelta"
    ),
    metaDescription: l3(
      "Video miễn phí: đăng ký salon trên VaraaAi, thêm dịch vụ, giá, nhân viên, giờ mở cửa và chính sách huỷ để bắt đầu nhận lịch hẹn online ngay.",
      "Free videos: register your salon on VaraaAi, add services, prices, staff, opening hours and a cancellation policy, and start taking online bookings.",
      "Ilmaiset videot: rekisteröi salonki VaraaAihin, lisää palvelut, hinnat, työntekijät, aukioloajat ja peruutusehdot ja ota vastaan verkkovarauksia."
    ),
    headline: l3(
      "Mở salon nhận đặt lịch online với VaraaAi: từ đăng ký đến lịch hẹn đầu tiên",
      "Set up online booking for your salon with VaraaAi: from sign-up to your first appointment",
      "Ota salongin verkkoajanvaraus käyttöön VaraaAilla: rekisteröinnistä ensimmäiseen varaukseen"
    ),
    tagline: l3(
      "Sáu video ngắn quay trên trang thật, có người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm.",
      "Six short videos filmed on the real site, with a guide talking you through each step and highlighting what to press.",
      "Kuusi lyhyttä videota oikealla sivustolla: opastaja kertoo jokaisen vaiheen ja korostaa, mitä painetaan."
    ),
    level: l3("Cho chủ salon mới bắt đầu", "For salon owners getting started", "Salongin omistajille, jotka aloittavat"),
    outcomes: [
      l3(
        "Đăng ký và kích hoạt salon ngay sau khi xác minh email, không chờ duyệt.",
        "Register and activate your salon as soon as you verify your email, with no review wait.",
        "Rekisteröit ja aktivoit salongin heti sähköpostin vahvistamisen jälkeen ilman odottelua."
      ),
      l3(
        "Hoàn thiện hồ sơ, logo, ảnh bìa để mở khoá thẻ tích điểm và Marketing.",
        "Complete your profile, logo and cover image to unlock loyalty cards and Marketing.",
        "Täydennät profiilin, logon ja kansikuvan ja avaat kanta-asiakaskortit ja markkinoinnin."
      ),
      l3(
        "Thêm dịch vụ với thời lượng, giá, tiền cọc và nhân viên thực hiện.",
        "Add services with duration, price, deposit and the staff who perform each one.",
        "Lisäät palvelut kestoineen, hintoineen, varausmaksuineen ja tekijöineen."
      ),
      l3(
        "Thêm nhân viên, chọn dịch vụ họ làm và phân quyền mục được xem.",
        "Add staff, choose the services they perform and decide what each person can see.",
        "Lisäät työntekijät, valitset heidän palvelunsa ja päätät, mitä kukin saa nähdä."
      ),
      l3(
        "Cài giờ mở cửa hằng tuần, nhiều ca trong ngày và ngày nghỉ lễ.",
        "Set weekly opening hours, several shifts a day and holiday closures.",
        "Asetat viikoittaiset aukioloajat, useita vuoroja päivässä ja pyhäpäivät."
      ),
      l3(
        "Nhận chuyển khoản, đặt hạn huỷ lịch và điền thông tin xuất hoá đơn.",
        "Accept bank transfers, set a cancellation deadline and fill in your invoice details.",
        "Otat vastaan tilisiirtoja, asetat perumisajan ja täytät laskutustiedot."
      ),
    ],
    intro: [
      l3(
        "Bạn vừa mở tiệm nail, tiệm mi hay salon tóc và muốn khách tự đặt lịch online thay vì gọi điện, nhắn tin cả ngày? Khóa học Khởi động salon của Học viện VaraaAi hướng dẫn từng bước cách đưa salon lên VaraaAi, nền tảng đặt lịch và quản lý salon, để khách tìm thấy bạn và đặt giờ bất cứ lúc nào. Các video đều miễn phí, xem được trên điện thoại và không cần đăng nhập để học.",
        "Have you just opened a nail, lash or hair salon and want clients to book online instead of calling and messaging all day? The Launch your salon course at VaraaAi Academy shows you step by step how to put your salon on VaraaAi, the booking and salon-management platform, so clients can find you and book at any hour. All the videos are free, work on your phone and need no sign-in.",
        "Avasitko juuri kynsi-, ripsi- tai kampaamon ja haluat, että asiakkaat varaavat ajan verkossa eivätkä soita ja viestittele koko päivää? VaraaAi-akatemian Salongin käyttöönotto -kurssi näyttää vaihe vaiheelta, miten salonki viedään VaraaAihin, ajanvaraus- ja salonginhallinta-alustalle, jotta asiakkaat löytävät sinut ja varaavat milloin tahansa. Videot ovat ilmaisia, toimivat puhelimella eivätkä vaadi kirjautumista."
      ),
      l3(
        "Mỗi bài là một video ngắn quay ngay trên trang thật: người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm, nên bạn chỉ việc xem và làm theo. Bài đầu tiên là đăng ký và kích hoạt salon: điền thông tin, chọn đúng quốc gia để lịch hẹn theo đúng múi giờ, xác minh email là salon hoạt động ngay, không phải chờ duyệt. Tiếp theo, bạn hoàn thiện hồ sơ salon với logo và ảnh bìa, bước giúp mở khoá thẻ tích điểm và Marketing.",
        "Each lesson is a short video filmed on the real site: a guide talks you through every step and highlights what to press, so you simply watch and follow along. The first lesson is registering and activating the salon: fill in the form, choose the right country so the calendar uses the right time zone, and verify your email; the salon goes live at once, with no review. Next you complete your profile with a logo and cover image, which unlocks loyalty cards and Marketing.",
        "Jokainen oppitunti on lyhyt video oikealla sivustolla: opastaja kertoo jokaisen vaiheen ja korostaa painettavan kohdan, joten riittää, että katsot ja teet perässä. Ensimmäinen oppitunti on salongin rekisteröinti ja aktivointi: täytä lomake, valitse oikea maa, jotta kalenteri käyttää oikeaa aikavyöhykettä, ja vahvista sähköposti, jolloin salonki on heti käytössä ilman tarkistusta. Sen jälkeen täydennät profiilin logolla ja kansikuvalla, mikä avaa kanta-asiakaskortit ja markkinoinnin."
      ),
      l3(
        "Phần quan trọng nhất là dịch vụ và con người. Bạn học cách thêm từng dịch vụ với tên, thời lượng, giá, tiền cọc và nhân viên thực hiện, để khách đặt đúng dịch vụ, đúng người và đúng thời lượng. Bạn thêm nhân viên, chọn dịch vụ mỗi người làm và quyết định ai được xem mục nào trong trang quản trị. Sau đó cài giờ mở cửa hằng tuần, nhiều ca trong một ngày và các ngày nghỉ lễ.",
        "The most important part is services and people. You learn to add each service with its name, duration, price, deposit and the staff who perform it, so clients book the right service with the right person for the right length of time. You add staff, choose which services each person does and decide who can see what in the dashboard. Then you set weekly opening hours, several shifts a day and holidays.",
        "Tärkein osa ovat palvelut ja ihmiset. Opit lisäämään jokaisen palvelun nimen, keston, hinnan, varausmaksun ja tekijät, jotta asiakas varaa oikean palvelun oikealta tekijältä oikean pituisena. Lisäät työntekijät, valitset kunkin palvelut ja päätät, kuka näkee mitäkin hallintapaneelissa. Lopuksi asetat viikoittaiset aukioloajat, useita vuoroja päivässä ja pyhäpäivät."
      ),
      l3(
        "Bài cuối giúp salon chuyên nghiệp ngay từ đầu: nhận thanh toán bằng chuyển khoản, đặt hạn huỷ lịch để hạn chế khách huỷ sát giờ, và điền thông tin xuất hoá đơn. Học xong sáu bài, salon của bạn đã sẵn sàng nhận lịch hẹn online. Các khóa tiếp theo chỉ bạn cách chia sẻ link đặt lịch, làm poster QR và bảng giá, vận hành hằng ngày và giữ chân khách quen.",
        "The last lesson makes the salon look professional from day one: accept bank transfers, set a cancellation deadline to cut down on last-minute cancellations, and fill in your invoice details. After these six lessons your salon is ready to take online bookings. The next courses show you how to share your booking link, make a QR poster and price list, run the salon day to day and keep your regulars.",
        "Viimeinen oppitunti tekee salongista ammattimaisen heti alusta: tilisiirrot, perumisaika viime hetken peruutusten vähentämiseksi ja laskutustiedot. Näiden kuuden oppitunnin jälkeen salonki on valmis ottamaan vastaan verkkovarauksia. Seuraavat kurssit näyttävät, miten jaat varauslinkin, teet QR-julisteen ja hinnaston, hoidat salongin arkea ja pidät kanta-asiakkaat."
      ),
      l3(
        "Mỗi bài có các bước bằng chữ để làm theo và bài kiểm tra nhanh để nhận điểm, huy hiệu; tiến độ được lưu trong trình duyệt. Video thuyết minh bằng tiếng Việt và có bản thu tiếng Anh, còn chữ trên trang học có tiếng Việt, tiếng Anh và tiếng Phần Lan. Học xong mọi bài dành cho chủ salon, bạn tải được chứng nhận hoàn thành “Quản lý salon với VaraaAi” mang tên mình.",
        "Every lesson has written steps to follow and a quick quiz that earns points and badges, and your progress is saved in your browser. The videos are narrated in Vietnamese and also recorded in English, and the lesson pages are written in Vietnamese, English and Finnish. Once you finish every lesson for salon owners, you can download a certificate of completion, “Running a salon with VaraaAi”, with your name on it.",
        "Jokaisessa oppitunnissa on kirjalliset vaiheet ja pikavisa, josta saa pisteitä ja merkkejä, ja edistymisesi tallentuu selaimeen. Videot on äänitetty vietnamiksi ja englanniksi, ja oppituntisivut ovat vietnamiksi, englanniksi ja suomeksi. Kun olet suorittanut kaikki omistajien oppitunnit, voit ladata nimelläsi varustetun todistuksen ”Salongin hallinta VaraaAilla”."
      ),
    ],
    forWho: [
      l3(
        "Chủ tiệm nail, mi, tóc, spa mới mở muốn nhận lịch hẹn online.",
        "Owners of new nail, lash, hair or spa salons who want online bookings.",
        "Uusien kynsi-, ripsi-, hius- ja spa-salonkien omistajat, jotka haluavat verkkovarauksia."
      ),
      l3(
        "Salon đang nhận lịch qua điện thoại, tin nhắn và muốn bớt việc trả lời.",
        "Salons that take bookings by phone and message and want to spend less time answering.",
        "Salongit, jotka ottavat varauksia puhelimitse ja viesteillä ja haluavat vähentää vastaamista."
      ),
      l3(
        "Chủ salon người Việt ở Phần Lan, châu Âu muốn được hướng dẫn bằng tiếng Việt.",
        "Vietnamese-speaking salon owners in Finland and Europe who want guidance in their language.",
        "Suomessa ja Euroopassa toimivat vietnaminkieliset salonkiyrittäjät, jotka haluavat ohjeet omalla kielellään."
      ),
      l3(
        "Quản lý hoặc nhân viên được giao cài đặt salon trên VaraaAi.",
        "Managers or staff who have been asked to set the salon up on VaraaAi.",
        "Esihenkilöt tai työntekijät, joiden tehtävä on ottaa salonki käyttöön VaraaAissa."
      ),
    ],
    faq: [
      {
        q: l3("Cách mở tiệm nail nhận khách đặt lịch online thế nào?", "How do I get my new salon taking online bookings?", "Miten uusi salonki saadaan ottamaan vastaan verkkovarauksia?"),
        a: l3(
          "Trên VaraaAi, bạn đăng ký salon và xác minh email là salon hoạt động ngay. Sau đó thêm dịch vụ và giá, thêm nhân viên, cài giờ mở cửa và chính sách huỷ. Sáu video của khóa này đi đúng thứ tự đó. Thủ tục kinh doanh tùy từng nước; phần vệ sinh có trong khóa Vệ sinh & an toàn.",
          "On VaraaAi you register the salon and verify your email, and it is live at once. Then add services and prices, add staff, and set opening hours and a cancellation policy. The six videos in this course follow exactly that order. Business paperwork depends on your country; hygiene is covered in the Hygiene & safety course.",
          "VaraaAissa rekisteröit salongin ja vahvistat sähköpostin, jolloin se on heti käytössä. Lisää sitten palvelut ja hinnat, työntekijät, aukioloajat ja peruutusehdot. Kurssin kuusi videota etenevät juuri tässä järjestyksessä. Yrityksen perustamisen muodollisuudet riippuvat maasta; hygieniasta kerrotaan Hygienia ja turvallisuus -kurssilla."
        ),
      },
      {
        q: l3("Đăng ký salon có phải chờ duyệt không?", "Do I have to wait for my salon to be approved?", "Pitääkö salongin hyväksymistä odottaa?"),
        a: l3(
          "Không. Sau khi điền thông tin và bấm xác minh trong email, salon hoạt động ngay. Nếu chưa thấy email xác minh, hãy xem thư mục Spam hoặc Quảng cáo. Nhớ chọn đúng quốc gia, vì quốc gia quyết định múi giờ của lịch hẹn.",
          "No. Once you have filled in the form and pressed the verification link in the email, the salon is live. If the email doesn't arrive, check your Spam or Promotions folder. Make sure you choose the right country, because it sets the time zone of your calendar.",
          "Ei. Kun olet täyttänyt lomakkeen ja painanut sähköpostin vahvistuslinkkiä, salonki on käytössä. Jos viestiä ei näy, tarkista roskaposti- tai tarjouskansio. Valitse maa huolella, koska se määrää kalenterin aikavyöhykkeen."
        ),
      },
      {
        q: l3("Có đặt tiền cọc và hạn huỷ lịch được không?", "Can I take deposits and set a cancellation deadline?", "Voinko periä varausmaksun ja asettaa perumisajan?"),
        a: l3(
          "Có. Bài dịch vụ chỉ cách đặt tiền cọc cho từng dịch vụ, còn bài thanh toán và chính sách chỉ cách nhận chuyển khoản, đặt hạn huỷ lịch và điền thông tin xuất hoá đơn. Khách tự huỷ được lịch trong thời hạn bạn cho phép.",
          "Yes. The services lesson shows how to set a deposit for each service, and the payments and policy lesson shows how to accept bank transfers, set a cancellation deadline and fill in invoice details. Clients can cancel by themselves within the deadline you allow.",
          "Kyllä. Palveluoppitunti näyttää, miten jokaiselle palvelulle asetetaan varausmaksu, ja maksut ja ehdot -oppitunti, miten otat vastaan tilisiirtoja, asetat perumisajan ja täytät laskutustiedot. Asiakas voi perua itse sallimasi ajan puitteissa."
        ),
      },
      {
        q: l3("Học các video này có mất phí không?", "Do the videos cost anything?", "Maksavatko videot jotain?"),
        a: l3(
          "Không. Mọi video trong Học viện VaraaAi đều miễn phí và không cần đăng nhập để xem. Bạn học trên điện thoại hoặc máy tính, làm bài kiểm tra nhanh để nhận điểm và huy hiệu; tiến độ được lưu trong trình duyệt bạn đang dùng.",
          "No. Every video in VaraaAi Academy is free and needs no sign-in. You can learn on a phone or a computer and take quick quizzes to earn points and badges; your progress is saved in the browser you are using.",
          "Eivät. Kaikki VaraaAi-akatemian videot ovat ilmaisia eivätkä vaadi kirjautumista. Voit opiskella puhelimella tai tietokoneella ja tehdä pikavisoja, joista saa pisteitä ja merkkejä; edistyminen tallentuu käyttämääsi selaimeen."
        ),
      },
      {
        q: l3("Video có tiếng Anh hay tiếng Phần Lan không?", "Are the videos available in English or Finnish?", "Onko videoita englanniksi tai suomeksi?"),
        a: l3(
          "Video gốc thuyết minh bằng tiếng Việt và có bản thu tiếng Anh, quay lại cả màn hình lẫn giọng nói. Trang học có chữ tiếng Việt, tiếng Anh và tiếng Phần Lan; ở trang tiếng Phần Lan, video phát bản tiếng Anh. Nhờ vậy nhân viên không nói tiếng Việt cũng học theo được.",
          "The original videos are narrated in Vietnamese, and there are English recordings with both the screen walkthrough and the voice redone. Lesson pages are written in Vietnamese, English and Finnish; on the Finnish pages the English video plays. That way staff who don't speak Vietnamese can follow too.",
          "Alkuperäiset videot on kerrottu vietnamiksi, ja niistä on englanninkieliset versiot, joissa sekä näyttötallenne että ääni on tehty uudelleen. Oppituntisivut ovat vietnamiksi, englanniksi ja suomeksi; suomenkielisillä sivuilla toistetaan englanninkielinen video. Näin myös vietnamia puhumattomat työntekijät pysyvät mukana."
        ),
      },
    ],
    keywords: [
      "phần mềm đặt lịch cho tiệm nail",
      "cách mở tiệm nail nhận khách online",
      "đăng ký salon trên VaraaAi",
      "phần mềm quản lý salon",
      "tạo lịch hẹn online cho salon",
      "app đặt lịch cho tiệm nail",
      "cài đặt dịch vụ và giá salon",
      "phần mềm đặt lịch spa",
    ],
  },
  /* ================= owners: reach ================= */
  {
    id: "o-reach",
    slug: "thu-hut-khach-cho-salon",
    metaTitle: l3(
      "Thu hút khách cho salon: link đặt lịch, poster QR, bảng giá",
      "Get More Salon Bookings: Booking Link, QR Poster, Price List",
      "Lisää salonkivarauksia: varauslinkki, QR-juliste, hinnasto"
    ),
    metaDescription: l3(
      "Video miễn phí cho chủ salon: chia sẻ link đặt lịch, làm poster QR, bảng giá đa ngôn ngữ, website riêng, fanpage và kiểm tra salon trên Google, Facebook.",
      "Free videos for salon owners: share your booking link, make a QR poster and multilingual price list, build a website and fanpage, check your online presence.",
      "Ilmaiset videot salongeille: jaa varauslinkki, tee QR-juliste ja monikielinen hinnasto, rakenna verkkosivut ja fanisivu ja tarkista verkkonäkyvyys."
    ),
    headline: l3(
      "Thu hút khách cho salon: để khách đặt lịch từ mọi nơi, từ cửa kính tiệm đến Facebook",
      "Get more bookings for your salon: let clients book from anywhere, from your shop window to Facebook",
      "Lisää varauksia salongillesi: asiakkaat varaavat mistä tahansa, näyteikkunasta Facebookiin"
    ),
    tagline: l3(
      "Một link đặt lịch, một mã QR và một bảng giá đẹp, đặt đúng chỗ khách đang nhìn.",
      "One booking link, one QR code and a good-looking price list, placed where your clients are already looking.",
      "Yksi varauslinkki, yksi QR-koodi ja tyylikäs hinnasto juuri sinne, minne asiakkaasi jo katsovat."
    ),
    level: l3("Cho chủ salon đã có trang VaraaAi", "For owners whose salon is on VaraaAi", "Omistajille, joiden salonki on VaraaAissa"),
    outcomes: [
      l3(
        "Sao chép link đặt lịch, tải mã QR và lấy mã nhúng cho website riêng.",
        "Copy your booking link, download its QR code and get the embed code for your site.",
        "Kopioit varauslinkin, lataat QR-koodin ja haet upotuskoodin omille sivuillesi."
      ),
      l3(
        "Tự làm poster QR “Quét để đặt lịch”, tải PDF hoặc PNG để in.",
        "Make a “Scan to book” QR poster and download it as a PDF or PNG to print.",
        "Teet ”Skannaa ja varaa” -QR-julisteen ja lataat sen tulostettavaksi PDF- tai PNG-muodossa."
      ),
      l3(
        "Tạo bảng giá đa ngôn ngữ dịch tự động, có mã QR đặt lịch.",
        "Create a multilingual price list with automatic translation and a booking QR code.",
        "Luot monikielisen hinnaston automaattisella käännöksellä ja varaus-QR-koodilla."
      ),
      l3(
        "Xuất bản website riêng cho salon với bộ màu và bố cục bạn chọn.",
        "Publish your salon's own website with the colours and section layout you choose.",
        "Julkaiset salongin omat verkkosivut valitsemillasi väreillä ja osioilla."
      ),
      l3(
        "Đăng ảnh, video lên fanpage, hẹn giờ đăng và ghim bài quan trọng.",
        "Post photos and videos to your fanpage, schedule posts and pin the important ones.",
        "Julkaiset kuvia ja videoita fanisivulla, ajastat julkaisut ja kiinnität tärkeimmät."
      ),
      l3(
        "Nhận điểm hiện diện trực tuyến cho website, Google, Facebook và Instagram.",
        "Get an online-presence score for your website, Google, Facebook and Instagram.",
        "Saat verkkonäkyvyyspisteet sivustollesi, Googlelle, Facebookille ja Instagramille."
      ),
    ],
    intro: [
      l3(
        "Làm sao để thu hút khách cho tiệm nail, tiệm mi hay salon tóc khi khách bây giờ tìm và đặt mọi thứ trên điện thoại? Nhiều khi bạn chưa cần quảng cáo đắt tiền; điều quan trọng trước tiên là khách thấy salon của bạn ở đúng chỗ và đặt được lịch ngay khi muốn. Khóa học Nhận khách ở mọi nơi của Học viện VaraaAi chỉ bạn cách làm điều đó với các công cụ có sẵn trong VaraaAi, qua video ngắn, miễn phí, xem trên điện thoại.",
        "How do you attract clients to a nail, lash or hair salon when people find and book everything on their phones? Often you don't need expensive ads yet; what matters first is that clients see your salon in the right places and can book the moment they want to. The Get booked everywhere course at VaraaAi Academy shows you how to do that with the tools built into VaraaAi, in short free videos you can watch on your phone.",
        "Miten saat asiakkaita kynsi-, ripsi- tai kampaamoon, kun ihmiset etsivät ja varaavat kaiken puhelimella? Kalliita mainoksia ei aina tarvita heti; tärkeintä on ensin, että asiakas näkee salonkisi oikeissa paikoissa ja voi varata heti, kun haluaa. VaraaAi-akatemian Varauksia joka kanavasta -kurssi näyttää, miten se tehdään VaraaAin omilla työkaluilla, lyhyillä ilmaisilla videoilla, joita voi katsoa puhelimella."
      ),
      l3(
        "Mọi thứ bắt đầu từ link đặt lịch của salon. Bài đầu tiên chỉ cách sao chép link để chia sẻ ở bất cứ đâu khách nhìn thấy, tải mã QR để in danh thiếp, tờ rơi hay dán ở quầy, và lấy mã nhúng cho website riêng. Bài tiếp theo hướng dẫn tự làm poster “Quét để đặt lịch” trong vài phút: nhập link, chọn tiêu đề, mẫu và khổ in, rồi tải PDF hoặc PNG. Công cụ này miễn phí và không cần đăng nhập.",
        "Everything starts with your salon's booking link. The first lesson shows how to copy it and share it wherever clients will see it, download the QR code for business cards, flyers or the counter, and get the embed code for your own website. The next lesson shows how to make a “Scan to book” poster in minutes: paste the link, pick a headline, style and print size, and download a PDF or PNG. The poster maker is free and needs no sign-in.",
        "Kaikki alkaa salongin varauslinkistä. Ensimmäinen oppitunti näyttää, miten linkki kopioidaan ja jaetaan sinne, missä asiakkaat sen näkevät, miten QR-koodi ladataan käyntikortteihin, esitteisiin tai tiskille ja miten omille verkkosivuille haetaan upotuskoodi. Seuraava oppitunti näyttää, miten ”Skannaa ja varaa” -juliste tehdään minuuteissa: liitä linkki, valitse otsikko, tyyli ja tulostuskoko ja lataa PDF tai PNG. Julistetyökalu on ilmainen eikä vaadi kirjautumista."
      ),
      l3(
        "Bảng giá rõ ràng là thứ nhiều khách muốn xem trước khi đặt. Bài bảng giá đa ngôn ngữ chỉ cách nhập dịch vụ, chọn các ngôn ngữ hiện trên bảng giá và loại tiền, bấm “Dịch tự động” để dịch tên dịch vụ, thêm mã QR đặt lịch rồi tải PDF để in hoặc PNG để đăng mạng xã hội. Với tiệm của người Việt ở Phần Lan, một bảng giá có cả tiếng Phần Lan và tiếng Anh giúp khách bản xứ hiểu ngay dịch vụ của bạn.",
        "A clear price list is something many clients want to see before booking. The multilingual price list lesson shows how to enter your services, choose the languages and currency on the list, press “Translate automatically” to translate service names, add a booking QR code and download a PDF to print or a PNG for social media. For a salon in Finland, a price list in Finnish and English helps local clients understand your services straight away.",
        "Selkeä hinnasto on asia, jonka moni asiakas haluaa nähdä ennen varaamista. Monikielisen hinnaston oppitunti näyttää, miten palvelut syötetään, valitaan hinnaston kielet ja valuutta, käännetään palvelujen nimet automaattisesti, lisätään varaus-QR-koodi ja ladataan PDF tulostettavaksi tai PNG somea varten. Suomessa toimivalle salongille suomen- ja englanninkielinen hinnasto auttaa paikallisia asiakkaita ymmärtämään palvelut heti."
      ),
      l3(
        "Salon còn có thể có website riêng: chọn bộ màu, sắp xếp các phần trên trang chủ và xuất bản. Fanpage trên VaraaAi cho phép đăng ảnh, video, hẹn giờ đăng và ghim bài quan trọng để khách theo dõi luôn thấy tin mới. Bài cuối giúp bạn kiểm tra salon trông thế nào trên mạng: nhận điểm hiện diện trực tuyến cho website, Google, Facebook và Instagram, xem cơ hội lớn nhất của mình và biết nên cải thiện ở đâu trước.",
        "Your salon can also have its own website: pick a colour set, arrange the home-page sections and publish. The VaraaAi fanpage lets you post photos and videos, schedule posts and pin the important ones so followers always see what is new. The last lesson helps you check how your salon looks online: get an online-presence score for your website, Google, Facebook and Instagram, see your biggest opportunity and know what to improve first.",
        "Salongilla voi olla myös omat verkkosivut: valitse värit, järjestä etusivun osiot ja julkaise. VaraaAin fanisivulla voit julkaista kuvia ja videoita, ajastaa julkaisuja ja kiinnittää tärkeimmät, jotta seuraajat näkevät aina uutuudet. Viimeinen oppitunti auttaa tarkistamaan, miltä salonkisi näyttää verkossa: saat verkkonäkyvyyspisteet sivustolle, Googlelle, Facebookille ja Instagramille, näet suurimman mahdollisuutesi ja tiedät, mitä parantaa ensin."
      ),
      l3(
        "Mỗi bài là một video ngắn quay trên trang thật, có người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm, kèm các bước bằng chữ và bài kiểm tra nhanh để nhận điểm, huy hiệu. Video thuyết minh bằng tiếng Việt, có bản thu tiếng Anh, và tiến độ được lưu trong trình duyệt. Học xong mọi bài dành cho chủ salon, bạn tải được chứng nhận hoàn thành “Quản lý salon với VaraaAi”.",
        "Each lesson is a short video filmed on the real site, with a guide talking through every step and highlighting what to press, plus written steps and a quick quiz for points and badges. The videos are narrated in Vietnamese and also recorded in English, and your progress is saved in your browser. Finish every lesson for salon owners to download the certificate of completion “Running a salon with VaraaAi”.",
        "Jokainen oppitunti on lyhyt video oikealla sivustolla: opastaja kertoo vaiheet ja korostaa painettavan kohdan, ja lisäksi on kirjalliset vaiheet ja pikavisa pisteineen ja merkkeineen. Videot on äänitetty vietnamiksi ja englanniksi, ja edistymisesi tallentuu selaimeen. Kun suoritat kaikki omistajien oppitunnit, voit ladata todistuksen ”Salongin hallinta VaraaAilla”."
      ),
    ],
    forWho: [
      l3(
        "Chủ tiệm nail, mi, tóc, spa muốn có thêm khách mà chưa muốn chi nhiều cho quảng cáo.",
        "Nail, lash, hair and spa owners who want more clients without a big ad budget.",
        "Kynsi-, ripsi-, hius- ja spa-yrittäjät, jotka haluavat lisää asiakkaita ilman suurta mainosbudjettia."
      ),
      l3(
        "Salon có khách quốc tế cần bảng giá nhiều ngôn ngữ, dễ hiểu.",
        "Salons with international clients who need a clear price list in several languages.",
        "Salongit, joiden kansainväliset asiakkaat tarvitsevat selkeän monikielisen hinnaston."
      ),
      l3(
        "Chủ salon người Việt ở Phần Lan, châu Âu muốn khách bản xứ đặt lịch dễ hơn.",
        "Vietnamese-speaking owners in Finland and Europe who want local clients to book more easily.",
        "Suomessa ja Euroopassa toimivat vietnaminkieliset yrittäjät, jotka haluavat helpottaa paikallisten asiakkaiden varaamista."
      ),
      l3(
        "Người lo mạng xã hội cho salon muốn đăng bài đều và dẫn khách về trang đặt lịch.",
        "Whoever runs the salon's social media and wants to post regularly and send people to the booking page.",
        "Salongin somesta vastaavat, jotka haluavat julkaista säännöllisesti ja ohjata ihmiset varaussivulle."
      ),
    ],
    faq: [
      {
        q: l3("Làm sao thu hút khách cho tiệm nail mà không tốn nhiều tiền quảng cáo?", "How can I attract salon clients without spending much on ads?", "Miten saan salongille asiakkaita ilman suuria mainoskuluja?"),
        a: l3(
          "Hãy bắt đầu từ những chỗ khách đã nhìn thấy bạn: dán poster QR ở tiệm, đặt link đặt lịch trên mạng xã hội, có bảng giá rõ ràng và giữ fanpage có bài mới. Khóa học này chỉ cách làm từng việc bằng công cụ có sẵn trong VaraaAi. Kết quả còn tùy dịch vụ và khu vực của bạn.",
          "Start where clients already see you: put a QR poster up in the salon, add your booking link to social media, keep a clear price list and post regularly on your fanpage. This course shows how to do each of these with the tools in VaraaAi. Results still depend on your services and your area.",
          "Aloita sieltä, missä asiakkaat jo näkevät sinut: QR-juliste salonkiin, varauslinkki someen, selkeä hinnasto ja säännöllisiä julkaisuja fanisivulle. Kurssi näyttää, miten jokainen näistä tehdään VaraaAin työkaluilla. Tulokset riippuvat silti palveluistasi ja alueestasi."
        ),
      },
      {
        q: l3("Làm poster QR đặt lịch có mất phí không?", "Does the QR booking poster cost anything?", "Maksaako QR-varausjuliste jotain?"),
        a: l3(
          "Không. Công cụ tạo poster “Quét để đặt lịch” miễn phí và không cần đăng nhập: nhập tên salon, logo, link đặt lịch, chọn tiêu đề, mẫu và khổ in, rồi tải PDF hoặc PNG. Nếu đang đăng nhập bằng tài khoản salon, bạn chọn trang đặt lịch VaraaAi của mình để link được điền tự động.",
          "No. The “Scan to book” poster maker is free and needs no sign-in: enter your salon name, logo and booking link, pick a headline, style and print size, then download a PDF or PNG. If you are signed in with your salon account, you can choose your VaraaAi booking page and the link is filled in for you.",
          "Ei. ”Skannaa ja varaa” -julistetyökalu on ilmainen eikä vaadi kirjautumista: anna salongin nimi, logo ja varauslinkki, valitse otsikko, tyyli ja tulostuskoko ja lataa PDF tai PNG. Jos olet kirjautunut salongin tilillä, voit valita VaraaAi-varaussivusi, jolloin linkki täyttyy automaattisesti."
        ),
      },
      {
        q: l3("Bảng giá có dịch sang tiếng Phần Lan, tiếng Anh được không?", "Can the price list be translated into Finnish or English?", "Voiko hinnaston kääntää suomeksi tai englanniksi?"),
        a: l3(
          "Được. Trong phần “Ngôn ngữ & tiền tệ”, bạn chọn các ngôn ngữ muốn hiện trên bảng giá và loại tiền, rồi bấm “Dịch tự động” để dịch tên dịch vụ. Hãy đọc lại bản dịch trước khi in. Bảng giá có thể kèm mã QR để khách quét là đặt lịch ngay.",
          "Yes. Under “Languages & currency” you choose the languages to show on the list and the currency, then press “Translate automatically” to translate the service names. Read the translation through before printing. The list can also carry a QR code so clients can scan it and book straight away.",
          "Kyllä. Valitse kohdassa ”Kielet ja valuutta” hinnastossa näkyvät kielet ja valuutta ja käännä palvelujen nimet automaattisesti. Lue käännös läpi ennen tulostamista. Hinnastoon voi lisätä myös QR-koodin, jolla asiakas varaa ajan heti."
        ),
      },
      {
        q: l3("Tôi có website riêng rồi, có gắn đặt lịch VaraaAi vào được không?", "I already have a website. Can I add VaraaAi booking to it?", "Minulla on jo verkkosivut. Voinko lisätä niihin VaraaAi-varauksen?"),
        a: l3(
          "Được. Bài chia sẻ link đặt lịch chỉ cách lấy mã nhúng để đưa phần đặt lịch lên website riêng của bạn, hoặc đơn giản là gắn link đặt lịch vào nút trên trang. Nếu chưa có website, VaraaAi có website riêng cho salon: chọn bộ màu, sắp xếp các phần trên trang chủ và xuất bản.",
          "Yes. The booking-link lesson shows how to get the embed code to put booking on your own website, or simply link a button to your booking page. If you don't have a website yet, VaraaAi can give your salon its own: pick a colour set, arrange the home-page sections and publish.",
          "Kyllä. Varauslinkkioppitunti näyttää, miten haet upotuskoodin omille sivuillesi, tai voit yksinkertaisesti linkittää painikkeen varaussivullesi. Jos sinulla ei vielä ole sivuja, VaraaAissa salongille saa omat verkkosivut: valitse värit, järjestä etusivun osiot ja julkaise."
        ),
      },
      {
        q: l3("Điểm hiện diện trực tuyến là gì?", "What is the online-presence score?", "Mitä verkkonäkyvyyspisteet ovat?"),
        a: l3(
          "Đó là điểm VaraaAi chấm cho cách salon xuất hiện trên website, Google, Facebook và Instagram; mỗi kênh được xếp loại Mạnh, Khá hoặc Yếu. Công cụ không cần email hay đăng ký, và chỉ ra cơ hội lớn nhất để bạn biết nên cải thiện chỗ nào trước.",
          "It is the score VaraaAi gives for how your salon appears on your website, Google, Facebook and Instagram, with each channel rated strong, fair or weak. The check needs no email or sign-up, and it points out your biggest opportunity so you know what to improve first.",
          "Ne kertovat, miten salonkisi näkyy verkkosivuilla, Googlessa, Facebookissa ja Instagramissa, ja jokainen kanava saa arvion vahva, kohtalainen tai heikko. Tarkistus ei vaadi sähköpostia eikä rekisteröitymistä, ja se nostaa esiin suurimman mahdollisuutesi, jotta tiedät mitä parantaa ensin."
        ),
      },
    ],
    keywords: [
      "cách thu hút khách cho tiệm nail",
      "tạo mã QR đặt lịch",
      "làm bảng giá tiệm nail",
      "bảng giá nail tiếng Phần Lan",
      "link đặt lịch online cho salon",
      "tạo website cho tiệm nail",
      "quảng cáo tiệm nail",
      "poster QR đặt lịch",
    ],
  },
  /* ================= owners: day-to-day ================= */
  {
    id: "o-daily",
    slug: "quan-ly-salon-hang-ngay",
    metaTitle: l3(
      "Phần mềm quản lý salon: lịch hẹn, thanh toán, doanh thu",
      "Salon Management Software: Calendar, Checkout, Reports",
      "Salongin hallintaohjelma: kalenteri, kassa ja raportit"
    ),
    metaDescription: l3(
      "Video miễn phí về quản lý tiệm mỗi ngày với VaraaAi: lịch hẹn, thanh toán tại quầy, hoá đơn, thu nhập nhân viên, xuất Excel, sổ khách và đánh giá Google.",
      "Free videos on running your salon day to day with VaraaAi: calendar, checkout and invoices, staff income reports, Excel exports, customer book and reviews.",
      "Ilmaiset videot salongin arkeen VaraaAilla: kalenteri, kassa ja laskut, työntekijöiden tuloraportit, Excel-viennit, asiakasrekisteri ja arvostelut."
    ),
    headline: l3(
      "Quản lý salon hằng ngày nhẹ nhàng hơn: lịch hẹn, thanh toán và doanh thu trong một nơi",
      "Run your salon day to day with less stress: bookings, checkout and income in one place",
      "Salongin arki helpommaksi: varaukset, kassa ja tulot yhdessä paikassa"
    ),
    tagline: l3(
      "Tám video ngắn cho những việc bạn làm mỗi ngày ở tiệm, từ lúc mở cửa đến khi chốt doanh thu.",
      "Eight short videos for the jobs you do every day, from opening in the morning to closing the day's takings.",
      "Kahdeksan lyhyttä videota päivittäisiin töihin aamun avaamisesta päivän tulojen kirjaamiseen."
    ),
    level: l3("Cho chủ salon và quản lý", "For salon owners and managers", "Salongin omistajille ja esihenkilöille"),
    outcomes: [
      l3(
        "Thêm, dời lịch hẹn trên điện thoại: nhấn giữ ô trống để tạo, kéo để dời.",
        "Add and move bookings on your phone: hold an empty slot to add, drag to move.",
        "Lisäät ja siirrät varauksia puhelimella: pidä tyhjää kohtaa painettuna ja vedä siirtääksesi."
      ),
      l3(
        "Phân biệt lịch khách tự đặt online với lịch salon tự thêm bằng màu.",
        "Tell online bookings from ones the salon added by colour, and see when each was made.",
        "Erotat verkkovaraukset salongin lisäämistä värin perusteella ja näet varaushetken."
      ),
      l3(
        "Tính tiền bằng tiền mặt, ngân hàng, thẻ quà tặng và gửi hoá đơn qua email.",
        "Check out by cash, bank or gift card and send invoices by email or QR.",
        "Otat maksun käteisellä, pankilla tai lahjakortilla ja lähetät laskun sähköpostilla tai QR-koodilla."
      ),
      l3(
        "Duyệt báo cáo thu nhập của nhân viên, xem tổng thu và tiền tip.",
        "Approve staff income reports and see each person's totals and tips.",
        "Hyväksyt työntekijöiden tuloraportit ja näet summat ja tipit."
      ),
      l3(
        "Xuất doanh thu, danh sách khách hàng và đơn hàng ra file Excel.",
        "Export income, customer lists and orders as Excel files for your own records.",
        "Viet tulot, asiakasluettelot ja tilaukset Excel-tiedostoiksi."
      ),
      l3(
        "Dùng sổ khách hàng, trợ lý AI và mời khách đánh giá trên Google.",
        "Use the customer book and the AI assistant, and invite clients to review you on Google.",
        "Käytät asiakasrekisteriä ja tekoälyavustajaa ja pyydät asiakkailta Google-arvosteluja."
      ),
    ],
    intro: [
      l3(
        "Một ngày ở tiệm nail hay salon tóc có rất nhiều việc nhỏ: nhận lịch, dời lịch, tính tiền, trả lời tin nhắn, chốt doanh thu với thợ. Khi mỗi thứ nằm một nơi, nào sổ giấy, điện thoại, tin nhắn, thì rất dễ sót. Khóa học Vận hành hằng ngày của Học viện VaraaAi chỉ bạn cách dùng phần mềm quản lý salon VaraaAi để gom những việc đó về một chỗ, qua video ngắn, miễn phí, xem ngay trên điện thoại.",
        "A day in a nail or hair salon is full of small jobs: taking bookings, moving them, checking clients out, answering messages and settling the day's income with the team. When each lives somewhere different, a paper diary, a phone, a chat app, things slip through. The Day-to-day course at VaraaAi Academy shows you how to bring it all into one place with the VaraaAi salon-management software, in short free videos you can watch on your phone.",
        "Kynsi- tai kampaamon päivä on täynnä pieniä töitä: varausten vastaanottamista ja siirtämistä, kassaa, viesteihin vastaamista ja päivän tulojen tilitystä tiimin kanssa. Kun jokainen asia on eri paikassa, paperikalenterissa, puhelimessa ja viesteissä, jotain jää helposti huomaamatta. VaraaAi-akatemian Päivittäinen työ -kurssi näyttää, miten kaikki kootaan yhteen paikkaan VaraaAin salonginhallintaohjelmalla, lyhyillä ilmaisilla videoilla puhelimeen."
      ),
      l3(
        "Phần đầu là lịch hẹn, trái tim của salon. Bạn học cách xem, thêm và cập nhật lịch hẹn, kể cả trên lịch gọn của điện thoại: nhấn giữ ô trống để tạo lịch, kéo để dời. Bạn cũng học cách cài màu riêng để phân biệt lịch “Khách tự đặt online” với lịch “Salon tự thêm”, và xem khách đặt vào lúc nào, rất tiện khi muốn biết bao nhiêu khách đến từ trang đặt lịch online.",
        "The first part is the calendar, the heart of the salon. You learn to view, add and update bookings, including on the compact phone calendar: hold an empty slot to create a booking, drag to move it. You also learn to give online bookings their own colour so “Booked online” stands apart from “Added by the salon”, and to see when each booking was made, which is handy when you want to know how many clients come through online booking.",
        "Ensimmäinen osa on kalenteri, salongin sydän. Opit katsomaan, lisäämään ja päivittämään varauksia myös puhelimen tiiviissä kalenterissa: pidä tyhjää kohtaa painettuna luodaksesi varauksen ja vedä siirtääksesi. Opit myös antamaan verkkovarauksille oman värin, jotta ne erottuvat salongin itse lisäämistä, ja näkemään, milloin varaus on tehty, mikä auttaa hahmottamaan, kuinka moni asiakas tulee verkkoajanvarauksen kautta."
      ),
      l3(
        "Phần tiền bạc gồm thanh toán tại quầy bằng tiền mặt, ngân hàng hoặc thẻ quà tặng, rồi gửi hoá đơn qua email hoặc cho khách quét mã QR. Bài báo cáo thu nhập chỉ cách nhân viên báo cáo từng lịch hẹn, chủ salon duyệt và xem tổng thu, tiền tip của từng người. Khi cần số liệu để lưu, gửi kế toán hay tự phân tích, bạn xuất doanh thu, danh sách khách và đơn hàng ra file Excel.",
        "The money side covers checkout at the counter by cash, bank or gift card, then sending the invoice by email or letting the client scan a QR code. The income-report lesson shows how staff report each booking while the owner approves and sees totals and tips for each person. When you need figures to keep, send to your accountant or analyse yourself, you export income, customer lists and orders to Excel.",
        "Raha-asioihin kuuluu kassa käteisellä, pankilla tai lahjakortilla sekä laskun lähettäminen sähköpostilla tai QR-koodilla, jonka asiakas skannaa. Tuloraporttioppitunti näyttää, miten työntekijät raportoivat jokaisen varauksen ja omistaja hyväksyy ne ja näkee kunkin summat ja tipit. Kun tarvitset lukuja arkistoon, kirjanpitäjälle tai omaan analyysiin, viet tulot, asiakasluettelot ja tilaukset Exceliin."
      ),
      l3(
        "Phần khách hàng giúp bạn chăm khách tốt hơn. Sổ khách hàng chia nhóm VIP, khách quen và khách lâu chưa quay lại, có ghi chú và lịch sử của từng người. Hộp thư gom tin nhắn của khách, và trợ lý AI có thể trả lời thay khi bạn vắng mặt. Bài cuối chỉ cách đăng đánh giá lên trang salon, trả lời khách và mời khách đánh giá trên Google, nơi nhiều khách mới xem trước khi chọn tiệm.",
        "The customer side helps you look after people better. The customer book groups VIPs, regulars and clients who haven't been back for a while, with notes and history for each one. The inbox gathers client messages, and the AI assistant can reply while you're away. The last lesson shows how to publish reviews on your salon page, reply to them and invite clients to review you on Google, where many new clients look before choosing a salon.",
        "Asiakasosio auttaa palvelemaan asiakkaita paremmin. Asiakasrekisteri ryhmittelee VIP-asiakkaat, kanta-asiakkaat ja pitkään poissa olleet, ja jokaisella on omat muistiinpanot ja historia. Viestit kokoavat asiakkaiden yhteydenotot, ja tekoälyavustaja voi vastata, kun olet poissa. Viimeinen oppitunti näyttää, miten arvostelut julkaistaan salongin sivulla, niihin vastataan ja asiakkaita pyydetään arvioimaan salonki Googlessa, josta moni uusi asiakas katsoo ennen valintaa."
      ),
      l3(
        "Mỗi bài là một video ngắn quay trên trang thật, có người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm, kèm các bước bằng chữ và bài kiểm tra nhanh để nhận điểm, huy hiệu. Video thuyết minh bằng tiếng Việt, có bản thu tiếng Anh, và tiến độ được lưu trong trình duyệt. Học xong mọi bài dành cho chủ salon, bạn tải được chứng nhận hoàn thành “Quản lý salon với VaraaAi”.",
        "Each lesson is a short video filmed on the real site, with a guide talking through every step and highlighting what to press, plus written steps and a quick quiz for points and badges. The videos are narrated in Vietnamese and also recorded in English, and your progress is saved in your browser. Finish every lesson for salon owners to download the certificate of completion “Running a salon with VaraaAi”.",
        "Jokainen oppitunti on lyhyt video oikealla sivustolla: opastaja kertoo vaiheet ja korostaa painettavan kohdan, ja lisäksi on kirjalliset vaiheet ja pikavisa pisteineen ja merkkeineen. Videot on äänitetty vietnamiksi ja englanniksi, ja edistymisesi tallentuu selaimeen. Kun suoritat kaikki omistajien oppitunnit, voit ladata todistuksen ”Salongin hallinta VaraaAilla”."
      ),
    ],
    forWho: [
      l3(
        "Chủ tiệm nail, mi, tóc, spa đang ghi lịch bằng sổ giấy hoặc tin nhắn.",
        "Nail, lash, hair and spa owners who still keep bookings in a paper diary or chat.",
        "Kynsi-, ripsi-, hius- ja spa-yrittäjät, jotka pitävät varauksia vielä paperilla tai viesteissä."
      ),
      l3(
        "Chủ salon có nhiều thợ cần chốt thu nhập, tiền tip rõ ràng mỗi ngày.",
        "Owners with several staff who need clear daily figures for income and tips.",
        "Useamman työntekijän salongit, jotka tarvitsevat selkeät päivittäiset tulot ja tipit."
      ),
      l3(
        "Quản lý ca, lễ tân nhận lịch và tính tiền tại quầy.",
        "Shift managers and receptionists who take bookings and run the till.",
        "Vuoroesihenkilöt ja vastaanottajat, jotka ottavat varauksia ja hoitavat kassaa."
      ),
      l3(
        "Chủ salon người Việt ở châu Âu muốn được hướng dẫn phần mềm bằng tiếng Việt.",
        "Vietnamese-speaking owners in Europe who want software guidance in their own language.",
        "Euroopassa toimivat vietnaminkieliset yrittäjät, jotka haluavat ohjelmisto-opastusta omalla kielellään."
      ),
    ],
    faq: [
      {
        q: l3("Phần mềm quản lý salon VaraaAi làm được gì mỗi ngày?", "What does VaraaAi do for a salon day to day?", "Mitä VaraaAi tekee salongin arjessa?"),
        a: l3(
          "Trong khóa này: lịch hẹn trên máy tính và điện thoại, màu riêng cho lịch đặt online, thanh toán tại quầy và hoá đơn, báo cáo thu nhập nhân viên, xuất Excel, sổ khách hàng, tin nhắn với trợ lý AI và đánh giá Google. Mỗi tính năng có một video hướng dẫn từng bước.",
          "In this course: the calendar on computer and phone, colours for online bookings, checkout and invoices, staff income reports, Excel exports, the customer book, messages with the AI assistant, and Google reviews. Each feature has its own step-by-step video.",
          "Tällä kurssilla: kalenteri tietokoneella ja puhelimella, verkkovarausten värit, kassa ja laskut, työntekijöiden tuloraportit, Excel-viennit, asiakasrekisteri, viestit ja tekoälyavustaja sekä Google-arvostelut. Jokaisesta toiminnosta on oma vaiheittainen video."
        ),
      },
      {
        q: l3("Có quản lý lịch hẹn trên điện thoại được không?", "Can I manage bookings on my phone?", "Voinko hallita varauksia puhelimella?"),
        a: l3(
          "Được. Bài lịch hẹn hướng dẫn cả lịch gọn trên điện thoại: nhấn giữ một ô trống để tạo lịch mới, kéo lịch hẹn để dời giờ. Bạn xem, thêm và cập nhật lịch ở bất cứ đâu, không cần ngồi máy tính ở quầy.",
          "Yes. The calendar lesson covers the compact phone calendar too: hold an empty slot to create a booking and drag a booking to move it. You can view, add and update appointments wherever you are, without sitting at the counter computer.",
          "Kyllä. Kalenterioppitunti kattaa myös puhelimen tiiviin kalenterin: pidä tyhjää kohtaa painettuna luodaksesi varauksen ja vedä varausta siirtääksesi sen. Voit katsoa, lisätä ja päivittää varauksia missä tahansa ilman tiskin tietokonetta."
        ),
      },
      {
        q: l3("Làm sao tính thu nhập và tiền tip cho từng thợ?", "How do I work out income and tips for each staff member?", "Miten lasken kunkin työntekijän tulot ja tipit?"),
        a: l3(
          "Với báo cáo thu nhập, nhân viên báo cáo từng lịch hẹn đã làm, chủ salon duyệt rồi xem tổng thu và tiền tip của từng người. Khi cần, bạn xuất bảng doanh thu ra Excel để lưu trữ hoặc gửi cho kế toán.",
          "With income reports, staff report each booking they did, and the owner approves them and sees totals and tips for each person. When needed, you export the income sheet to Excel to keep or send to your accountant.",
          "Tuloraporteissa työntekijät raportoivat tekemänsä varaukset, ja omistaja hyväksyy ne ja näkee kunkin summat ja tipit. Tarvittaessa viet tulotaulukon Exceliin arkistoitavaksi tai kirjanpitäjälle."
        ),
      },
      {
        q: l3("Trợ lý AI trả lời tin nhắn khách thế nào?", "How does the AI assistant answer client messages?", "Miten tekoälyavustaja vastaa asiakkaiden viesteihin?"),
        a: l3(
          "Khách nhắn cho salon ngay trên trang salon, và tin nhắn về Hộp thư của bạn. Bài tin nhắn chỉ cách trả lời khách trong Hộp thư và bật trợ lý AI để trả lời khi bạn vắng mặt, để khách không phải chờ lâu khi bạn đang bận làm cho khách khác.",
          "Clients message the salon right on its page, and the messages arrive in your inbox. The messages lesson shows how to reply there and how to switch on the AI assistant to answer while you're away, so clients aren't left waiting while you're busy with someone else.",
          "Asiakkaat viestittelevät salongille suoraan sen sivulla, ja viestit tulevat saapuneisiisi. Viestioppitunti näyttää, miten vastaat niihin ja miten otat käyttöön tekoälyavustajan vastaamaan poissaollessasi, jotta asiakkaan ei tarvitse odottaa, kun palvelet toista."
        ),
      },
      {
        q: l3("Học các video này có mất phí, có bản tiếng Anh không?", "Are the videos free, and are they in English?", "Ovatko videot ilmaisia, ja onko niitä englanniksi?"),
        a: l3(
          "Miễn phí và không cần đăng nhập để xem. Video thuyết minh bằng tiếng Việt và có bản thu tiếng Anh; trang học có chữ tiếng Việt, tiếng Anh và tiếng Phần Lan. Mỗi bài có bài kiểm tra nhanh để nhận điểm và huy hiệu, tiến độ lưu trong trình duyệt.",
          "They are free and need no sign-in. The videos are narrated in Vietnamese and also recorded in English, and the lesson pages are in Vietnamese, English and Finnish. Each lesson has a quick quiz for points and badges, and progress is saved in your browser.",
          "Ne ovat ilmaisia eivätkä vaadi kirjautumista. Videot on äänitetty vietnamiksi ja englanniksi, ja oppituntisivut ovat vietnamiksi, englanniksi ja suomeksi. Jokaisessa oppitunnissa on pikavisa pisteineen ja merkkeineen, ja edistyminen tallentuu selaimeen."
        ),
      },
    ],
    keywords: [
      "phần mềm quản lý salon",
      "phần mềm quản lý tiệm nail",
      "quản lý lịch hẹn salon",
      "phần mềm tính tiền tiệm nail",
      "báo cáo doanh thu nhân viên nail",
      "quản lý khách hàng salon",
      "xuất Excel doanh thu salon",
      "trả lời đánh giá Google",
    ],
  },
  /* ================= owners: retain ================= */
  {
    id: "o-retain",
    slug: "giu-chan-khach-hang-salon",
    metaTitle: l3(
      "Giữ chân khách hàng salon: thẻ tích điểm, thẻ quà tặng",
      "Keep Salon Clients Coming Back: Loyalty and Gift Cards",
      "Pidä salongin asiakkaat: kanta-asiakas- ja lahjakortit"
    ),
    metaDescription: l3(
      "Video miễn phí: tạo thẻ tích điểm QR trong 30 giây, chương trình khách dẫn khách, thẻ quà tặng, email khuyến mãi và bán sản phẩm online cho salon.",
      "Free videos: a QR stamp card in 30 seconds, referrals where regulars bring friends, gift cards, promotional emails and an online shop for your salon.",
      "Ilmaiset videot: QR-leimakortti 30 sekunnissa, suosittelut, lahjakortit, markkinointisähköpostit ja verkkokauppa salongillesi. Katso ja tee perässä."
    ),
    headline: l3(
      "Giữ chân khách hàng và tăng doanh thu cho salon: để khách quen quay lại và dẫn thêm bạn bè",
      "Keep clients and grow revenue: bring regulars back and let them bring their friends",
      "Pidä asiakkaat ja kasvata myyntiä: kanta-asiakkaat palaavat ja tuovat ystävänsä"
    ),
    tagline: l3(
      "Thẻ tích điểm, khách dẫn khách, thẻ quà tặng và email, mỗi công cụ một video ngắn dễ làm theo.",
      "Loyalty cards, referrals, gift cards and email, each tool in one short, easy-to-follow video.",
      "Kanta-asiakaskortit, suosittelut, lahjakortit ja sähköposti, jokainen työkalu yhdessä lyhyessä videossa."
    ),
    level: l3("Cho chủ salon", "For salon owners", "Salongin omistajille"),
    outcomes: [
      l3(
        "Tạo thẻ tích điểm QR miễn phí, cài số dấu và phần thưởng trong 30 giây.",
        "Create a free QR stamp card and set the stamps and the reward.",
        "Luot ilmaisen QR-leimakortin ja asetat leimojen määrän ja palkinnon."
      ),
      l3(
        "Bấm “Cộng 1 vé” mỗi lần khách đến và áp dụng giảm giá đúng lúc.",
        "Press “Add 1 stamp” at every visit and apply the reward discount at the right time.",
        "Lisäät leiman joka käynnillä ja käytät alennuksen oikeaan aikaan."
      ),
      l3(
        "Để khách quen mời bạn bè bằng link riêng, tự động nhận 2 vé.",
        "Let regulars invite friends with their own link and earn 2 stamps automatically.",
        "Kanta-asiakkaat kutsuvat ystäviä omalla linkillään ja saavat automaattisesti 2 leimaa."
      ),
      l3(
        "Tạo mẫu thẻ quà tặng, gửi qua email và kiểm tra mã khi khách đến.",
        "Design gift cards, send them by email, confirm payment and check codes at the visit.",
        "Suunnittelet lahjakortit, lähetät ne sähköpostilla ja tarkistat koodin käynnillä."
      ),
      l3(
        "Gửi email khuyến mãi đúng nhóm khách từ mẫu có sẵn, gửi ngay hoặc lên lịch.",
        "Send promotional emails from templates to the right group, now or on a schedule.",
        "Lähetät markkinointisähköposteja valmiista malleista oikealle ryhmälle heti tai ajastettuna."
      ),
      l3(
        "Mở cửa hàng online của salon, xác nhận đơn và báo khách qua email.",
        "Open your salon's online shop, confirm orders and notify customers by email.",
        "Avaat salongin verkkokaupan, vahvistat tilaukset ja ilmoitat asiakkaille sähköpostilla."
      ),
    ],
    intro: [
      l3(
        "Có được khách mới đã khó, giữ chân khách hàng còn quan trọng hơn: khách quen quay lại đều đặn, giới thiệu bạn bè và mua quà cho người thân. Khóa học Giữ khách & tăng doanh thu của Học viện VaraaAi chỉ bạn cách dùng các công cụ có sẵn trong VaraaAi để làm điều đó một cách bài bản, qua những video ngắn, miễn phí, xem ngay trên điện thoại.",
        "Winning new clients is hard; keeping them matters even more. Regulars come back steadily, recommend you to friends and buy gifts for the people they love. The Keep customers & grow revenue course at VaraaAi Academy shows you how to do this properly with the tools built into VaraaAi, in short free videos you can watch on your phone.",
        "Uusien asiakkaiden hankkiminen on vaikeaa, ja heidän pitämisensä on vielä tärkeämpää: kanta-asiakkaat palaavat säännöllisesti, suosittelevat sinua ystävilleen ja ostavat lahjoja läheisilleen. VaraaAi-akatemian Pidä asiakkaat ja kasvata myyntiä -kurssi näyttää, miten tämä tehdään järjestelmällisesti VaraaAin omilla työkaluilla, lyhyillä ilmaisilla videoilla puhelimeen."
      ),
      l3(
        "Bắt đầu với thẻ tích điểm. Bài đầu tiên hướng dẫn tạo thẻ tích điểm có mã QR miễn phí trong khoảng 30 giây: chọn số dấu để nhận ưu đãi, ghi phần thưởng như “Giảm 15% lần tiếp theo”, cấp thẻ cho khách qua email và đóng dấu mỗi lần khách đến. Bài thứ hai đi sâu vào thẻ tích điểm trong trang quản trị: kích hoạt thẻ cho khách, bấm “Cộng 1 vé” khi khách đến và áp dụng giảm giá khi đủ vé.",
        "It starts with loyalty cards. The first lesson shows how to create a free QR stamp card in about 30 seconds: choose how many stamps earn a reward, write the reward, such as “15% off next time”, issue cards to clients by email and stamp them at every visit. The second lesson goes deeper into loyalty cards in the dashboard: activate cards, press “Add 1 stamp” at each visit and apply the discount once the card is full.",
        "Kaikki alkaa kanta-asiakaskorteista. Ensimmäinen oppitunti näyttää, miten ilmainen QR-leimakortti luodaan noin 30 sekunnissa: valitse palkintoon tarvittavien leimojen määrä, kirjoita palkinto, esimerkiksi ”-15 % seuraavasta käynnistä”, lähetä kortit asiakkaille sähköpostilla ja leimaa joka käynnillä. Toinen oppitunti syventyy hallintapaneelin kanta-asiakaskortteihin: aktivoi kortit, lisää leima jokaisella käynnillä ja käytä alennus, kun kortti on täynnä."
      ),
      l3(
        "Khách dẫn khách là cách có thêm khách mới từ chính những người đã tin bạn. Mỗi thẻ tích điểm có sẵn link mời riêng; khi người bạn đặt lịch qua link và đến salon lần đầu, người giới thiệu tự động được cộng 2 vé và nhận email báo. Link được ghi nhớ 60 ngày, chỉ tính khách mới, và không ai tự mời được chính mình, nên chương trình công bằng và bạn không phải ghi chép bằng tay.",
        "Referrals bring new clients through the people who already trust you. Every loyalty card has its own invite link; when a friend books through it and visits the salon for the first time, the referrer automatically gets 2 stamps and an email. The link is remembered for 60 days, only first-time clients count and nobody can invite themselves, so the programme is fair and you don't have to keep track by hand.",
        "Suosittelut tuovat uusia asiakkaita niiden kautta, jotka jo luottavat sinuun. Jokaisessa kanta-asiakaskortissa on oma kutsulinkki; kun ystävä varaa sen kautta ja käy salongissa ensimmäistä kertaa, suosittelija saa automaattisesti 2 leimaa ja sähköpostin. Linkki muistetaan 60 päivää, vain uudet asiakkaat lasketaan eikä kukaan voi kutsua itseään, joten ohjelma on reilu eikä sinun tarvitse pitää kirjaa käsin."
      ),
      l3(
        "Thẻ quà tặng hợp với các dịp lễ, sinh nhật hay Ngày của Mẹ. Bạn học cách tạo mẫu thẻ, gửi thẻ qua email, xác nhận thanh toán và kiểm tra mã khi khách đến. Bài email khuyến mãi chỉ cách chọn nhóm khách, soạn chiến dịch từ mẫu có sẵn, xem trước rồi gửi ngay hoặc lên lịch; mỗi email gửi cho khách dùng 1 điểm Vara, còn gửi thử thì miễn phí. Cuối cùng, bạn mở cửa hàng online để bán sản phẩm, xác nhận đơn và báo khách qua email.",
        "Gift cards suit holidays, birthdays and Mother's Day. You learn to create card designs, send cards by email, confirm payment and check the code when the client comes in. The promotional email lesson shows how to choose an audience, write a campaign from a template, preview it and send it now or schedule it; each email sent to clients uses 1 Vara point, while test emails are free. Finally, you open an online shop to sell products, confirm orders and notify customers by email.",
        "Lahjakortit sopivat juhlapyhiin, syntymäpäiviin ja äitienpäivään. Opit luomaan korttimallit, lähettämään kortit sähköpostilla, vahvistamaan maksun ja tarkistamaan koodin asiakkaan tullessa. Markkinointisähköpostien oppitunti näyttää, miten valitaan kohderyhmä, tehdään kampanja valmiista mallista, esikatsellaan ja lähetetään heti tai ajastetaan; jokainen asiakkaille lähetetty viesti käyttää yhden Vara-pisteen, ja testiviestit ovat ilmaisia. Lopuksi avaat verkkokaupan, jossa myyt tuotteita, vahvistat tilaukset ja ilmoitat asiakkaille sähköpostilla."
      ),
      l3(
        "Mỗi bài là một video ngắn quay trên trang thật, có người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm, kèm các bước bằng chữ và bài kiểm tra nhanh để nhận điểm, huy hiệu. Video thuyết minh bằng tiếng Việt, có bản thu tiếng Anh, và tiến độ được lưu trong trình duyệt. Học xong mọi bài dành cho chủ salon, bạn tải được chứng nhận hoàn thành “Quản lý salon với VaraaAi”.",
        "Each lesson is a short video filmed on the real site, with a guide talking through every step and highlighting what to press, plus written steps and a quick quiz for points and badges. The videos are narrated in Vietnamese and also recorded in English, and your progress is saved in your browser. Finish every lesson for salon owners to download the certificate of completion “Running a salon with VaraaAi”.",
        "Jokainen oppitunti on lyhyt video oikealla sivustolla: opastaja kertoo vaiheet ja korostaa painettavan kohdan, ja lisäksi on kirjalliset vaiheet ja pikavisa pisteineen ja merkkeineen. Videot on äänitetty vietnamiksi ja englanniksi, ja edistymisesi tallentuu selaimeen. Kun suoritat kaikki omistajien oppitunnit, voit ladata todistuksen ”Salongin hallinta VaraaAilla”."
      ),
    ],
    forWho: [
      l3(
        "Chủ tiệm nail, mi, tóc, spa muốn khách quen quay lại đều đặn hơn.",
        "Nail, lash, hair and spa owners who want regulars to come back more often.",
        "Kynsi-, ripsi-, hius- ja spa-yrittäjät, jotka haluavat kanta-asiakkaiden palaavan useammin."
      ),
      l3(
        "Salon muốn có thêm khách mới nhờ khách cũ giới thiệu.",
        "Salons that want new clients through recommendations from existing ones.",
        "Salongit, jotka haluavat uusia asiakkaita nykyisten suositusten kautta."
      ),
      l3(
        "Chủ salon muốn bán thẻ quà tặng và sản phẩm để tăng doanh thu.",
        "Owners who want to sell gift cards and products to grow revenue.",
        "Yrittäjät, jotka haluavat myydä lahjakortteja ja tuotteita kasvattaakseen myyntiä."
      ),
      l3(
        "Chủ salon người Việt ở Phần Lan, châu Âu muốn được hướng dẫn bằng tiếng Việt.",
        "Vietnamese-speaking owners in Finland and Europe who want guidance in their language.",
        "Suomessa ja Euroopassa toimivat vietnaminkieliset yrittäjät, jotka haluavat ohjeet omalla kielellään."
      ),
    ],
    faq: [
      {
        q: l3("Làm sao để giữ chân khách hàng cho tiệm nail?", "How do I keep clients coming back to my salon?", "Miten saan asiakkaat palaamaan salonkiini?"),
        a: l3(
          "Hãy cho khách một lý do rõ ràng để quay lại: thẻ tích điểm có phần thưởng cụ thể, ưu đãi khi giới thiệu bạn bè và email nhắc khách đúng lúc. Khóa học chỉ cách cài từng công cụ đó trong VaraaAi. Dĩ nhiên, chất lượng dịch vụ vẫn là điều quan trọng nhất.",
          "Give clients a clear reason to return: a stamp card with a concrete reward, a bonus for recommending friends and well-timed emails. This course shows how to set up each of these tools in VaraaAi. The quality of your service, of course, still matters most.",
          "Anna asiakkaille selkeä syy palata: leimakortti konkreettisella palkinnolla, etu ystävän suosittelusta ja oikein ajoitetut sähköpostit. Kurssi näyttää, miten jokainen työkalu otetaan käyttöön VaraaAissa. Palvelun laatu on tietysti edelleen tärkeintä."
        ),
      },
      {
        q: l3("Làm thẻ tích điểm cho salon có mất phí không?", "Does a salon loyalty card cost anything?", "Maksaako salongin kanta-asiakaskortti jotain?"),
        a: l3(
          "Bài đầu tiên dùng công cụ thẻ tích điểm miễn phí của VaraaAi: bấm dùng thử ngay mà không cần email, hoặc nhập tên salon và email để tạo thẻ. Bạn cài số dấu và phần thưởng, cấp thẻ cho khách qua email và đóng dấu mỗi lần khách đến.",
          "The first lesson uses VaraaAi's free loyalty card tool: try it straight away with no email, or enter your salon name and email to create your card. You set the number of stamps and the reward, issue cards to clients by email and stamp them at each visit.",
          "Ensimmäinen oppitunti käyttää VaraaAin ilmaista kanta-asiakaskorttityökalua: kokeile heti ilman sähköpostia tai anna salongin nimi ja sähköposti ja luo kortti. Asetat leimojen määrän ja palkinnon, lähetät kortit asiakkaille sähköpostilla ja leimaat ne joka käynnillä."
        ),
      },
      {
        q: l3("Chương trình khách dẫn khách hoạt động thế nào?", "How does the referral programme work?", "Miten suositteluohjelma toimii?"),
        a: l3(
          "Mỗi thẻ tích điểm có link mời riêng. Khách quen chia sẻ link, người bạn đặt lịch qua link (được ghi nhớ 60 ngày), và khi người bạn đến salon lần đầu, người giới thiệu tự động nhận 2 vé cùng email báo. Chỉ tính khách mới, và không ai tự mời được chính mình.",
          "Every loyalty card has its own invite link. A regular shares it, the friend books through it (the link is remembered for 60 days), and when the friend visits for the first time the referrer automatically gets 2 stamps and an email. Only first-time clients count, and nobody can invite themselves.",
          "Jokaisessa kanta-asiakaskortissa on oma kutsulinkki. Kanta-asiakas jakaa sen, ystävä varaa linkin kautta (linkki muistetaan 60 päivää), ja kun ystävä käy ensimmäistä kertaa, suosittelija saa automaattisesti 2 leimaa ja sähköpostin. Vain uudet asiakkaat lasketaan, eikä kukaan voi kutsua itseään."
        ),
      },
      {
        q: l3("Gửi email khuyến mãi cho khách có tốn phí không?", "Do promotional emails cost anything?", "Maksavatko markkinointisähköpostit jotain?"),
        a: l3(
          "Mỗi email gửi cho khách dùng 1 điểm Vara; gửi thử thì miễn phí. Bài email khuyến mãi chỉ cách chọn nhóm khách, soạn chiến dịch từ mẫu có sẵn, xem trước đúng như trên điện thoại của khách, rồi gửi ngay hoặc lên lịch gửi.",
          "Each email sent to a client uses 1 Vara point; test emails are free. The promotional email lesson shows how to choose an audience, write a campaign from a template, preview it exactly as it will look on a client's phone, and send it now or schedule it.",
          "Jokainen asiakkaalle lähetetty viesti käyttää yhden Vara-pisteen; testiviestit ovat ilmaisia. Oppitunti näyttää, miten valitaan kohderyhmä, tehdään kampanja valmiista mallista, esikatsellaan se juuri sellaisena kuin asiakkaan puhelimessa ja lähetetään heti tai ajastetaan."
        ),
      },
      {
        q: l3("Khách mua thẻ quà tặng của salon bằng cách nào?", "How do clients buy a salon gift card?", "Miten asiakas ostaa salongin lahjakortin?"),
        a: l3(
          "Khách mua thẻ trên website của salon và nhận mã qua email. Ở phía salon, bạn tạo mẫu thẻ, gửi thẻ qua email, xác nhận thanh toán và kiểm tra mã khi khách đến. Khi tính tiền tại quầy, thẻ quà tặng là một trong các cách thanh toán.",
          "Clients buy the card on the salon's website and receive the code by email. On the salon side, you create card designs, send cards by email, confirm payment and check the code when the client comes in. At checkout, a gift card is one of the payment methods.",
          "Asiakas ostaa kortin salongin verkkosivuilta ja saa koodin sähköpostiin. Salongin puolella luot korttimallit, lähetät kortit sähköpostilla, vahvistat maksun ja tarkistat koodin asiakkaan tullessa. Kassalla lahjakortti on yksi maksutavoista."
        ),
      },
    ],
    keywords: [
      "giữ chân khách hàng tiệm nail",
      "thẻ tích điểm cho salon",
      "làm thẻ khách hàng thân thiết",
      "thẻ quà tặng tiệm nail",
      "chương trình khách giới thiệu khách",
      "email marketing cho salon",
      "tăng doanh thu tiệm nail",
      "voucher quà tặng spa",
    ],
  },
  /* ================= owners: grow ================= */
  {
    id: "o-grow",
    slug: "mo-rong-chuoi-salon",
    metaTitle: l3(
      "Mở rộng chuỗi salon: chi nhánh, kho vật tư, đội nhóm",
      "Grow Your Salon Chain: Branches, Inventory and Your Team",
      "Kasvata salonkiketjua: toimipisteet, varasto ja tiimi"
    ),
    metaDescription: l3(
      "Video miễn phí cho salon đang lớn: quản lý nhiều chi nhánh, kho vật tư quét mã, trang tổng quan, đào tạo nhân viên và cộng tác viên giới thiệu khách.",
      "Free videos for growing salons: run several branches, scan stock in and out, read the overview, train your team and work with affiliates who bring customers.",
      "Ilmaiset videot kasvavalle salongille: useat toimipisteet, varaston skannaus, yleiskatsaus, henkilöstön koulutus ja asiakkaita tuovat kumppanit."
    ),
    headline: l3(
      "Mở rộng chuỗi salon: quản lý nhiều chi nhánh, kho hàng và đội ngũ trên một nền tảng",
      "Grow your salon into a chain: branches, stock and your team on one platform",
      "Kasvata salongista ketju: toimipisteet, varasto ja tiimi yhdellä alustalla"
    ),
    tagline: l3(
      "Khi tiệm đông thợ và có nhiều chi nhánh, đây là những công cụ giúp bạn nắm cả hệ thống mà không phải có mặt ở mọi nơi.",
      "When the team grows and branches multiply, these tools keep you on top of everything without being everywhere.",
      "Kun tiimi kasvaa ja toimipisteitä tulee lisää, nämä työkalut pitävät kaiken hallinnassa ilman, että sinun tarvitsee olla joka paikassa."
    ),
    level: l3("Nâng cao, cho salon đang phát triển", "Advanced, for growing salons", "Edistynyt, kasvaville salongeille"),
    outcomes: [
      l3(
        "Quét mã để nhập và lấy vật tư, theo dõi tồn kho, in nhãn cho tủ.",
        "Scan supplies in and out, track stock and print labels for your cupboards.",
        "Skannaat tarvikkeet sisään ja ulos, seuraat varastoa ja tulostat tarrat kaappeihin."
      ),
      l3(
        "Biết ngay vật tư nào sắp hết nhờ danh sách cần mua.",
        "See at a glance what is running low on the shopping list.",
        "Näet ostoslistasta heti, mitkä tarvikkeet ovat loppumassa."
      ),
      l3(
        "Thêm chi nhánh, chuyển qua lại và dùng trang đặt lịch chung cho cả chuỗi.",
        "Add branches, switch between them and use one booking page for the whole chain.",
        "Lisäät toimipisteitä, vaihdat niiden välillä ja käytät koko ketjun yhteistä varaussivua."
      ),
      l3(
        "Đọc trang tổng quan: doanh thu, lịch hẹn, việc cần xử lý, dịch vụ bán chạy.",
        "Read the overview: revenue, bookings, things to handle and best-selling services.",
        "Luet yleiskatsauksen: liikevaihto, varaukset, hoidettavat asiat ja suosituimmat palvelut."
      ),
      l3(
        "Dùng nhóm chat, thông báo có xác nhận đã đọc và bài đào tạo nhân viên.",
        "Use team chat, notices with read confirmation and training lessons for your staff.",
        "Käytät ryhmächattia, lukukuitattavia tiedotteita ja henkilöstön koulutusoppitunteja."
      ),
      l3(
        "Thêm cộng tác viên, đặt hoa hồng và theo dõi khách họ giới thiệu.",
        "Add affiliates, set their commission and follow the results they bring.",
        "Lisäät kumppaneita, asetat provision ja seuraat heidän tuloksiaan."
      ),
    ],
    intro: [
      l3(
        "Khi salon đã có khách đều, bước tiếp theo thường là thêm thợ, mở thêm chi nhánh hoặc xây dựng chuỗi. Lúc đó, những việc trước đây bạn tự nhớ trong đầu, như còn bao nhiêu gel, ai đã đọc thông báo, chi nhánh nào đang đông khách, không thể quản lý bằng trí nhớ được nữa. Khóa học Mở rộng & công cụ của Học viện VaraaAi chỉ bạn các công cụ để nắm cả hệ thống, qua video ngắn, miễn phí, xem trên điện thoại.",
        "Once your salon has steady clients, the next step is often more staff, a second branch or a whole chain. At that point the things you used to keep in your head, how much gel is left, who has read a notice, which branch is busy, can no longer be managed from memory. The Grow & tools course at VaraaAi Academy shows you the tools that keep the whole business in view, in short free videos you can watch on your phone.",
        "Kun salongilla on vakiintunut asiakaskunta, seuraava askel on usein lisää työntekijöitä, toinen toimipiste tai kokonainen ketju. Silloin asioita, jotka ennen pysyivät päässä, kuten paljonko geeliä on jäljellä, kuka on lukenut tiedotteen ja missä toimipisteessä on kiire, ei voi enää hallita muistin varassa. VaraaAi-akatemian Kasvu ja työkalut -kurssi esittelee työkalut, joilla koko yritys pysyy näkyvissä, lyhyillä ilmaisilla videoilla puhelimeen."
      ),
      l3(
        "Bài đầu tiên là kho vật tư: quét mã khi nhập hàng và khi lấy hàng, theo dõi tồn kho, xem danh sách cần mua và in nhãn cho tủ, để không còn cảnh hết sơn, hết keo giữa ca. Bài thứ hai là nhiều chi nhánh: thêm chi nhánh, chuyển qua lại giữa các tiệm, và dùng một trang đặt lịch chung cho cả chuỗi để khách đặt lịch ở chi nhánh họ muốn.",
        "The first lesson is inventory: scan items in when stock arrives and out when it is used, track stock levels, see the shopping list and print labels for your cupboards, so you never run out of polish or glue mid-shift. The second lesson is about several branches: add branches, switch between salons and use one booking page for the whole chain so clients can book at the branch they want.",
        "Ensimmäinen oppitunti käsittelee varastoa: skannaa tuotteet sisään niiden saapuessa ja ulos käytettäessä, seuraa saldoja, katso ostoslista ja tulosta tarrat kaappeihin, jotta lakka tai liima ei lopu kesken vuoron. Toinen oppitunti koskee useita toimipisteitä: lisää toimipisteitä, vaihda salongista toiseen ja käytä koko ketjun yhteistä varaussivua, jolla asiakas varaa haluamastaan toimipisteestä."
      ),
      l3(
        "Trang tổng quan giúp bạn nhìn một lần là nắm cả tiệm: doanh thu, lịch hẹn, những việc cần xử lý và dịch vụ bán chạy. Bài tiện ích nhóm giới thiệu không gian làm việc chung của chủ và nhân viên: nhóm chat, thông báo có yêu cầu xác nhận đã đọc, và bài đào tạo với các bước, link video YouTube và tài liệu đính kèm mà nhân viên mở ra học trên điện thoại bất cứ lúc nào.",
        "The overview page shows the whole salon at a glance: revenue, bookings, things to handle and best-selling services. The team hub lesson introduces the shared workspace for owner and staff: team chat, notices that can ask for a read confirmation, and training lessons with steps, a YouTube video link and attached files that staff can open on their phones at any time.",
        "Yleiskatsaus näyttää koko salongin yhdellä silmäyksellä: liikevaihdon, varaukset, hoidettavat asiat ja suosituimmat palvelut. Tiimin työtilan oppitunti esittelee omistajan ja henkilökunnan yhteisen työtilan: ryhmächatin, tiedotteet, joihin voi pyytää lukukuittauksen, sekä koulutusoppitunnit vaiheineen, YouTube-videolinkkeineen ja liitetiedostoineen, jotka työntekijät voivat avata puhelimella milloin tahansa."
      ),
      l3(
        "Bài cuối nói về cộng tác viên giới thiệu khách: thêm người tiếp thị, đặt mức hoa hồng và theo dõi kết quả của từng người. Đây là cách mở rộng nguồn khách nhờ những người có cộng đồng riêng, như người làm nội dung về làm đẹp hay hội nhóm ở địa phương. Khi cần đào tạo thợ mới, bạn có thể kết hợp với các khóa học nghề miễn phí của Học viện về nail, mi và vệ sinh an toàn.",
        "The last lesson covers affiliates who bring customers: add marketers, set their commission and follow each person's results. It is a way to reach new clients through people with their own audience, such as beauty content creators or local community groups. When you need to train new staff, you can combine this with the Academy's free craft courses on nails, lashes and hygiene and safety.",
        "Viimeinen oppitunti käsittelee asiakkaita tuovia kumppaneita: lisää markkinoijia, aseta provisio ja seuraa kunkin tuloksia. Näin tavoitat uusia asiakkaita ihmisten kautta, joilla on oma yleisönsä, kuten kauneussisällön tekijöiden tai paikallisten yhteisöjen. Kun tarvitset koulutusta uusille työntekijöille, voit yhdistää tähän akatemian ilmaiset ammattikurssit kynsistä, ripsistä sekä hygieniasta ja turvallisuudesta."
      ),
      l3(
        "Mỗi bài là một video ngắn quay trên trang thật, có người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm, kèm các bước bằng chữ và bài kiểm tra nhanh để nhận điểm, huy hiệu. Video thuyết minh bằng tiếng Việt, có bản thu tiếng Anh, và tiến độ được lưu trong trình duyệt. Học xong mọi bài dành cho chủ salon, bạn tải được chứng nhận hoàn thành “Quản lý salon với VaraaAi”.",
        "Each lesson is a short video filmed on the real site, with a guide talking through every step and highlighting what to press, plus written steps and a quick quiz for points and badges. The videos are narrated in Vietnamese and also recorded in English, and your progress is saved in your browser. Finish every lesson for salon owners to download the certificate of completion “Running a salon with VaraaAi”.",
        "Jokainen oppitunti on lyhyt video oikealla sivustolla: opastaja kertoo vaiheet ja korostaa painettavan kohdan, ja lisäksi on kirjalliset vaiheet ja pikavisa pisteineen ja merkkeineen. Videot on äänitetty vietnamiksi ja englanniksi, ja edistymisesi tallentuu selaimeen. Kun suoritat kaikki omistajien oppitunnit, voit ladata todistuksen ”Salongin hallinta VaraaAilla”."
      ),
    ],
    forWho: [
      l3(
        "Chủ salon có từ hai chi nhánh trở lên hoặc đang chuẩn bị mở thêm.",
        "Owners with two or more branches, or about to open another.",
        "Yrittäjät, joilla on kaksi tai useampia toimipisteitä tai jotka avaavat uuden."
      ),
      l3(
        "Tiệm nail, mi đông thợ cần quản lý vật tư và thông báo nội bộ gọn gàng.",
        "Busy nail and lash salons that need tidy stock control and internal notices.",
        "Vilkkaat kynsi- ja ripsisalongit, jotka tarvitsevat selkeän varastonhallinnan ja sisäiset tiedotteet."
      ),
      l3(
        "Chủ salon muốn đào tạo nhân viên mới theo một cách làm thống nhất.",
        "Owners who want to train new staff in one consistent way of working.",
        "Yrittäjät, jotka haluavat kouluttaa uudet työntekijät yhtenäiseen työtapaan."
      ),
      l3(
        "Salon muốn có thêm khách nhờ cộng tác viên và người giới thiệu.",
        "Salons that want more clients through affiliates and promoters.",
        "Salongit, jotka haluavat lisää asiakkaita kumppaneiden ja suosittelijoiden kautta."
      ),
    ],
    faq: [
      {
        q: l3("Quản lý nhiều chi nhánh salon trên VaraaAi thế nào?", "How do I manage several salon branches on VaraaAi?", "Miten useita toimipisteitä hallitaan VaraaAissa?"),
        a: l3(
          "Bạn thêm chi nhánh trong trang quản trị, chuyển qua lại giữa các tiệm, và dùng một trang đặt lịch chung cho cả chuỗi. Bài nhiều chi nhánh trong khóa này hướng dẫn từng bước, có người hướng dẫn nói và đánh dấu chỗ cần bấm.",
          "You add branches in the dashboard, switch between salons and use one shared booking page for the whole chain. The branches lesson in this course walks you through it step by step, with a guide talking and highlighting what to press.",
          "Lisäät toimipisteet hallintapaneelissa, vaihdat salongista toiseen ja käytät koko ketjun yhteistä varaussivua. Kurssin toimipisteoppitunti käy sen läpi vaihe vaiheelta, ja opastaja kertoo ja korostaa painettavat kohdat."
        ),
      },
      {
        q: l3("Kho vật tư quét mã hoạt động ra sao?", "How does scan-based inventory work?", "Miten skannattava varasto toimii?"),
        a: l3(
          "Khi nhập hàng, bạn quét mã để cộng vào kho; khi lấy hàng ra dùng, quét mã để trừ. VaraaAi theo dõi tồn kho, lập danh sách cần mua và cho in nhãn dán tủ, giúp cả đội biết đồ nằm ở đâu và khi nào cần đặt thêm.",
          "When stock arrives you scan it in, and when you take something to use you scan it out. VaraaAi tracks stock levels, builds a shopping list and prints labels for your cupboards, so the whole team knows where things are and when to reorder.",
          "Kun tavaraa saapuu, skannaat sen sisään, ja kun otat jotain käyttöön, skannaat sen ulos. VaraaAi seuraa saldoja, kokoaa ostoslistan ja tulostaa tarrat kaappeihin, joten koko tiimi tietää, missä tavarat ovat ja milloin pitää tilata lisää."
        ),
      },
      {
        q: l3("Đào tạo nhân viên salon bằng VaraaAi được không?", "Can I train my salon staff with VaraaAi?", "Voinko kouluttaa henkilökuntaa VaraaAilla?"),
        a: l3(
          "Được. Trong Tiện ích nhóm có phần Đào tạo: bạn soạn bài với các bước, link video YouTube và tài liệu đính kèm, nhân viên mở ra học trên điện thoại. Ngoài ra, Học viện VaraaAi có các khóa học nghề nail, mi và vệ sinh an toàn miễn phí để thợ mới tự học.",
          "Yes. The team hub has a Training section: you write lessons with steps, a YouTube video link and attachments, and staff open them on their phones. VaraaAi Academy also has free craft courses on nails, lashes and hygiene and safety that new staff can study on their own.",
          "Kyllä. Tiimin työtilassa on koulutusosio: kirjoitat oppitunnit vaiheineen, YouTube-linkkeineen ja liitteineen, ja työntekijät avaavat ne puhelimella. VaraaAi-akatemiassa on lisäksi ilmaiset ammattikurssit kynsistä, ripsistä sekä hygieniasta ja turvallisuudesta uusien työntekijöiden itseopiskeluun."
        ),
      },
      {
        q: l3("Cộng tác viên giới thiệu khách khác gì khách dẫn khách?", "How are affiliates different from customer referrals?", "Miten kumppanit eroavat asiakassuosittelusta?"),
        a: l3(
          "Khách dẫn khách dành cho khách quen: họ mời bạn bè bằng link trên thẻ tích điểm và nhận vé. Cộng tác viên là người tiếp thị cho salon, ví dụ người làm nội dung làm đẹp; bạn thêm họ vào VaraaAi, đặt mức hoa hồng và theo dõi kết quả mỗi người mang lại.",
          "Referrals are for your regulars: they invite friends with the link on their loyalty card and earn stamps. Affiliates are people who market the salon, such as beauty content creators; you add them in VaraaAi, set their commission and follow the results each one brings.",
          "Suosittelut ovat kanta-asiakkaille: he kutsuvat ystäviä kanta-asiakaskortin linkillä ja saavat leimoja. Kumppanit markkinoivat salonkia, esimerkiksi kauneussisällön tekijät; lisäät heidät VaraaAihin, asetat provision ja seuraat, mitä kukin tuo."
        ),
      },
      {
        q: l3("Học các video này có mất phí, có chứng nhận không?", "Are the videos free, and is there a certificate?", "Ovatko videot ilmaisia, ja saako todistuksen?"),
        a: l3(
          "Miễn phí và không cần đăng nhập để xem. Tiến độ được lưu trong trình duyệt; khi học xong mọi bài dành cho chủ salon, bạn điền tên và tải chứng nhận hoàn thành “Quản lý salon với VaraaAi”. Đây là chứng nhận của Học viện, không phải bằng cấp chính thức.",
          "They are free and need no sign-in. Your progress is saved in your browser; when you finish every lesson for salon owners, you enter your name and download the certificate of completion “Running a salon with VaraaAi”. It comes from the Academy and is not an official qualification.",
          "Ne ovat ilmaisia eivätkä vaadi kirjautumista. Edistyminen tallentuu selaimeen; kun suoritat kaikki omistajien oppitunnit, kirjoitat nimesi ja lataat todistuksen ”Salongin hallinta VaraaAilla”. Todistus on akatemian oma, ei virallinen tutkinto."
        ),
      },
    ],
    keywords: [
      "quản lý nhiều chi nhánh salon",
      "mở chuỗi tiệm nail",
      "quản lý kho vật tư tiệm nail",
      "phần mềm quản lý chuỗi salon",
      "đào tạo nhân viên tiệm nail",
      "cộng tác viên giới thiệu khách",
      "báo cáo tổng quan salon",
    ],
  },
  /* ================= owners: Tositeo (tositeo.ts) ================= */
  {
    id: "o-tositeo",
    slug: "tositeo-hoa-don-ke-toan-online",
    metaTitle: l3(
      "Tositeo: quản lý hóa đơn, công tác phí và kế toán online",
      "Tositeo: Receipts, Travel Claims and Bookkeeping Online",
      "Tositeo: kuitit, matkalaskut ja kirjanpito verkossa"
    ),
    metaDescription: l3(
      "Video miễn phí bằng tiếng Việt: chụp hóa đơn tự đọc chữ, công tác phí, đối chiếu ngân hàng, hoàn tiền SEPA và gửi kế toán với Tositeo, từng bước một.",
      "Free step-by-step videos: snap receipts that read themselves, travel claims, bank matching, SEPA reimbursements and working with your accountant in Tositeo.",
      "Ilmaiset videot vaihe vaiheelta: kuittien kuvaus ja tunnistus, matkalaskut, pankkitäsmäytys, SEPA-kulukorvaukset ja yhteistyö kirjanpitäjän kanssa Tositeossa."
    ),
    headline: l3(
      "Tositeo cho chủ doanh nghiệp: hóa đơn, công tác phí và kế toán gọn trong một chỗ",
      "Tositeo for business owners: receipts, travel claims and bookkeeping in one place",
      "Tositeo yrittäjälle: kuitit, matkalaskut ja kirjanpito yhdessä paikassa"
    ),
    tagline: l3(
      "Video quay trên Tositeo bằng giao diện tiếng Việt, có người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm.",
      "Videos filmed in Tositeo itself, with a guide talking you through every step and highlighting what to press.",
      "Videot on kuvattu Tositeossa, ja opastaja kertoo jokaisen vaiheen ja korostaa painettavan kohdan."
    ),
    level: l3("Cơ bản, không cần biết kế toán", "Beginner, no bookkeeping knowledge needed", "Perusteet, kirjanpitotaitoja ei tarvita"),
    outcomes: [
      l3(
        "Tạo tài khoản, chọn đúng quốc gia để thuế VAT và tiền tệ theo luật nơi bạn kinh doanh.",
        "Create an account and pick the right country so VAT and currency follow local rules.",
        "Luot tilin ja valitset oikean maan, jotta ALV ja valuutta noudattavat paikallisia sääntöjä."
      ),
      l3(
        "Chụp hóa đơn bằng điện thoại, kiểm tra thông tin máy đọc được và gửi đi trong một phút.",
        "Snap a receipt with your phone, check the details read from it and send it in a minute.",
        "Kuvaat kuitin puhelimella, tarkistat luetut tiedot ja lähetät sen minuutissa."
      ),
      l3(
        "Lập công tác phí có lộ trình, để phụ cấp ngày và tiền đi xe được tính tự động.",
        "Make travel claims with a route so daily allowances and mileage are worked out for you.",
        "Teet matkalaskun reitteineen, ja päivärahat ja kilometrikorvaukset lasketaan puolestasi."
      ),
      l3(
        "Mời nhân viên với đúng vai trò, rồi duyệt hoặc trả lại chi phí của cả nhóm một lần.",
        "Invite staff with the right roles and approve or return the team's expenses in one go.",
        "Kutsut työntekijät oikeilla rooleilla ja hyväksyt tai palautat tiimin kulut kerralla."
      ),
      l3(
        "Nhập sao kê ngân hàng, tìm ngay khoản thanh toán còn thiếu hóa đơn và nhắc đúng người.",
        "Import bank statements, spot payments without a receipt and remind the right person.",
        "Tuot tiliotteet, löydät maksut ilman kuittia ja muistutat oikeaa henkilöä."
      ),
      l3(
        "Hoàn tiền bằng một file SEPA, xuất file ZIP cho kế toán và đóng sổ từng tháng.",
        "Reimburse with one SEPA file, export a ZIP for your accountant and close each month.",
        "Maksat kulukorvaukset yhdellä SEPA-tiedostolla, viet ZIP-tiedoston kirjanpitäjälle ja suljet kuukaudet."
      ),
    ],
    intro: [
      l3(
        "Hóa đơn giấy nhét trong ví, vé tàu lẫn trong túi áo, sao kê ngân hàng thì kế toán hỏi từng dòng: đó là cuối tháng quen thuộc của rất nhiều chủ tiệm nail, nhà hàng, cửa hàng và công ty dịch vụ ở châu Âu. Tositeo là dịch vụ trực tuyến giúp bạn ghi lại mọi khoản chi ngay khi phát sinh, và gửi thẳng cho kế toán dưới dạng điện tử. Khóa học này hướng dẫn bạn dùng Tositeo từ ngày đầu tiên, qua các video ngắn bằng tiếng Việt, miễn phí, xem được trên điện thoại.",
        "Paper receipts in your wallet, train tickets in a coat pocket and an accountant asking about every line of the bank statement: that is month end for many nail salons, restaurants, shops and service companies in Europe. Tositeo is an online service that records every expense as it happens and sends it to your accountant electronically. This course shows you how to use Tositeo from day one, in short free videos you can watch on your phone.",
        "Paperikuitit lompakossa, junaliput takin taskussa ja kirjanpitäjä kyselemässä tiliotteen jokaista riviä: tällainen on kuunvaihde monessa kynsistudiossa, ravintolassa, kaupassa ja palveluyrityksessä. Tositeo on verkkopalvelu, joka tallentaa jokaisen kulun heti sen syntyessä ja toimittaa sen sähköisesti kirjanpitäjälle. Kurssi opastaa Tositeon käyttöön ensimmäisestä päivästä alkaen lyhyillä, maksuttomilla videoilla, joita voi katsoa puhelimella."
      ),
      l3(
        "Bài đầu tiên là đăng ký và cài đặt công ty. Bạn chọn quốc gia hoạt động, vì quốc gia quyết định thuế suất VAT, tiền tệ, kiểu mã số doanh nghiệp và việc có dùng được file thanh toán SEPA hay không. Tositeo có ba mươi ngôn ngữ, trong đó có tiếng Việt, và dùng được ở nhiều nước như Phần Lan, Đức, Thụy Điển, Na Uy, Séc, Pháp. Sau đó là bài chụp hóa đơn: máy tự đọc ngày, người bán, tổng tiền và thuế, còn bạn kiểm tra lại, chọn loại chi phí và gửi đi.",
        "The first lesson covers signing up and setting up the company. You choose the country you operate in, because it decides the VAT rates, the currency, the business ID format and whether SEPA payment files are available. Tositeo speaks thirty languages, Vietnamese among them, and works in many countries such as Finland, Germany, Sweden, Norway, Czechia and France. Then comes the receipts lesson: the date, merchant, total and VAT are read from the photo, and you check them, choose the expense type and send it.",
        "Ensimmäinen oppitunti käsittelee rekisteröitymistä ja yrityksen asetuksia. Valitset toimintamaan, koska se määrää ALV-kannat, valuutan, Y-tunnuksen muodon ja SEPA-maksutiedostojen saatavuuden. Tositeo toimii kolmellakymmenellä kielellä, myös vietnamiksi, ja monissa maissa, kuten Suomessa, Saksassa, Ruotsissa, Norjassa, Tšekissä ja Ranskassa. Sitten opetellaan kuittien kuvaaminen: päivä, myyjä, summa ja ALV luetaan kuvasta, ja sinä tarkistat ne, valitset kululajin ja lähetät kuitin."
      ),
      l3(
        "Các bài tiếp theo đi vào những việc tốn thời gian nhất. Công tác phí: bạn nhập giờ đi, giờ về và lộ trình, Tositeo tính phụ cấp ngày và tiền đi xe theo mức chính thức ở Phần Lan, hoặc theo mức công ty tự đặt ở nước khác. Duyệt chi: nhân viên tự nộp hóa đơn của mình, bạn duyệt hoặc trả lại cả loạt chỉ với một lần bấm. Đối chiếu ngân hàng: nhập sao kê, mỗi khoản thanh toán được ghép với hóa đơn của nó, khoản nào còn thiếu thì Tositeo nhắc đúng người.",
        "The next lessons tackle the jobs that take the most time. Travel claims: you enter the times and the route, and Tositeo works out daily allowances and mileage at Finland's official rates, or at your company's own rates elsewhere. Approvals: staff send their own receipts, and you approve or return a whole batch with one click. Bank matching: import the statement, each payment is matched to its receipt, and Tositeo reminds the right person about anything missing.",
        "Seuraavat oppitunnit käsittelevät eniten aikaa vieviä töitä. Matkalaskut: syötät ajat ja reitin, ja Tositeo laskee päivärahat ja kilometrikorvaukset Suomen virallisten määrien tai muualla yrityksen omien määrien mukaan. Hyväksynnät: työntekijät lähettävät omat kuittinsa, ja sinä hyväksyt tai palautat koko erän yhdellä painalluksella. Pankkitäsmäytys: tuot tiliotteen, jokainen maksu yhdistetään kuittiinsa, ja Tositeo muistuttaa oikeaa henkilöä puuttuvista."
      ),
      l3(
        "Cuối tháng, bạn trả lại tiền cho những người đã tự ứng bằng một file SEPA tải lên ngân hàng trực tuyến, rồi xuất một file ZIP gồm bảng hạch toán, ảnh hóa đơn và công tác phí cho kế toán, và đóng sổ tháng đó. Nếu kế toán của bạn cũng dùng Tositeo, họ tự vào lấy dữ liệu: bạn chỉ cần mời họ một lần. Khóa học có cả phần dành cho văn phòng kế toán: quản lý nhiều khách hàng, hàng chờ hạch toán và hạch toán nhanh từng hóa đơn.",
        "At month end you reimburse everyone who paid out of pocket with one SEPA file uploaded to your online bank, export a ZIP with the bookkeeping file, receipt images and travel claims for your accountant, and close the month. If your accountant also uses Tositeo, they fetch the data themselves: you only invite them once. The course also has a part for accounting firms: many clients, the booking queue and quick booking receipt by receipt.",
        "Kuun lopussa maksat kulukorvaukset yhdellä verkkopankkiin ladattavalla SEPA-tiedostolla, viet kirjanpitäjälle ZIP-tiedoston, jossa ovat kirjausaineisto, kuittien kuvat ja matkalaskut, ja suljet kuukauden. Jos kirjanpitäjäsi käyttää myös Tositeota, hän hakee aineiston itse: kutsut hänet vain kerran. Kurssilla on myös osa tilitoimistoille: monta asiakasta, kirjausjono ja pikakirjaus kuitti kerrallaan."
      ),
      l3(
        "Mọi video được quay trên Tositeo thật bằng giao diện tiếng Việt, với công ty mẫu, không có dữ liệu thật của ai. Người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm; dưới mỗi video có các bước bằng chữ và một bài kiểm tra nhanh. Tositeo miễn phí ba năm cho doanh nghiệp, và luôn miễn phí cho văn phòng kế toán, nên bạn có thể vừa xem vừa làm theo ngay trên tài khoản của mình.",
        "Every video is filmed in the real Tositeo with demo companies, never anyone's real data. A guide talks through each step and highlights what to press, and under each video you find the written steps and a quick quiz. Tositeo is free for three years for businesses and always free for accounting firms, so you can follow along in your own account as you watch.",
        "Jokainen video on kuvattu oikeassa Tositeossa esimerkkiyrityksillä, ilman kenenkään oikeita tietoja. Opastaja kertoo jokaisen vaiheen ja korostaa painettavan kohdan, ja videon alta löytyvät kirjalliset vaiheet ja pikavisa. Tositeo on yrityksille maksuton kolme vuotta ja tilitoimistoille aina maksuton, joten voit tehdä samat vaiheet omalla tililläsi katsoessasi."
      ),
    ],
    forWho: [
      l3(
        "Chủ tiệm nail, salon, nhà hàng, cửa hàng ở châu Âu muốn bớt giấy tờ cuối tháng.",
        "Owners of nail salons, restaurants and shops in Europe who want less month-end paperwork.",
        "Kynsistudioiden, ravintoloiden ja kauppojen omistajat, jotka haluavat vähemmän paperityötä."
      ),
      l3(
        "Doanh nghiệp có nhân viên hay mua hàng, đi công tác bằng tiền riêng.",
        "Businesses whose staff often buy supplies or travel with their own money.",
        "Yritykset, joiden työntekijät ostavat tarvikkeita tai matkustavat omilla rahoillaan."
      ),
      l3(
        "Người mới bắt đầu dùng Tositeo, hoặc chuyển sang từ eTasku và dịch vụ khác.",
        "New Tositeo users, or anyone moving over from eTasku or another service.",
        "Uudet Tositeon käyttäjät tai eTaskusta tai muusta palvelusta siirtyvät."
      ),
      l3(
        "Kế toán và văn phòng kế toán làm việc với khách hàng người Việt.",
        "Accountants and accounting firms who work with Vietnamese-speaking clients.",
        "Kirjanpitäjät ja tilitoimistot, joilla on vietnaminkielisiä asiakkaita."
      ),
    ],
    faq: [
      {
        q: l3("Tositeo là gì, có mất phí không?", "What is Tositeo and what does it cost?", "Mikä Tositeo on ja mitä se maksaa?"),
        a: l3(
          "Tositeo là dịch vụ trực tuyến để lưu hóa đơn, làm công tác phí, đối chiếu ngân hàng và gửi chứng từ cho kế toán. Doanh nghiệp dùng miễn phí ba năm, không cần thẻ thanh toán; văn phòng kế toán luôn được miễn phí. Các video trong khóa học này cũng miễn phí.",
          "Tositeo is an online service for storing receipts, making travel claims, matching bank payments and sending documents to your accountant. Businesses use it free for three years with no card needed, and accounting firms always use it free. The videos in this course are free as well.",
          "Tositeo on verkkopalvelu kuittien tallentamiseen, matkalaskuihin, pankkitäsmäytykseen ja aineiston toimittamiseen kirjanpitäjälle. Yritykset käyttävät sitä maksutta kolme vuotta ilman korttia, ja tilitoimistoille se on aina maksuton. Myös kurssin videot ovat maksuttomia."
        ),
      },
      {
        q: l3("Tositeo có giao diện tiếng Việt không?", "Does Tositeo come in Vietnamese?", "Onko Tositeo saatavilla vietnamiksi?"),
        a: l3(
          "Có. Tositeo có ba mươi ngôn ngữ, trong đó có tiếng Việt; bạn chọn ở menu ngôn ngữ phía trên hoặc trong hồ sơ của mình. Mọi video của khóa học được quay bằng giao diện tiếng Việt, nên tên nút và ô bạn nghe trong video giống hệt những gì bạn thấy trên màn hình.",
          "Yes. Tositeo has thirty languages, Vietnamese among them; pick it from the language menu at the top or in your profile. Every video in this course is filmed in the Vietnamese interface, so the button names you hear match what you see on the screen.",
          "Kyllä. Tositeossa on kolmekymmentä kieltä, myös vietnami; kielen voi valita yläreunan valikosta tai profiilista. Kurssin videot on kuvattu vietnaminkielisessä käyttöliittymässä, joten kuulemasi painikkeiden nimet vastaavat näytön tekstejä."
        ),
      },
      {
        q: l3("Máy đọc hóa đơn có chính xác không?", "How accurate is the receipt reading?", "Kuinka tarkasti kuitit luetaan?"),
        a: l3(
          "Tositeo đọc chữ trên ảnh và tự điền ngày, người bán, tổng tiền và thuế, theo ngôn ngữ của nước bạn đã chọn. Phần lớn hóa đơn được đọc đúng, nhưng có lúc nhầm, ví dụ lấy nhầm một dòng làm tên người bán. Vì vậy video hướng dẫn luôn so lại với tờ hóa đơn trước khi gửi.",
          "Tositeo reads the text on the photo and fills in the date, merchant, total and VAT in the language of your country. Most receipts are read correctly, but it can slip, for example taking an item line as the merchant. That is why the video always shows checking against the receipt before sending.",
          "Tositeo lukee kuvan tekstin ja täyttää päivän, myyjän, summan ja ALV:n maasi kielellä. Useimmat kuitit luetaan oikein, mutta virheitä sattuu, esimerkiksi tuoterivi luetaan myyjäksi. Siksi videolla tiedot tarkistetaan aina kuittia vasten ennen lähettämistä."
        ),
      },
      {
        q: l3("Dùng Tositeo ở ngoài Phần Lan được không?", "Can I use Tositeo outside Finland?", "Voiko Tositeota käyttää Suomen ulkopuolella?"),
        a: l3(
          "Được. Bạn chọn quốc gia hoạt động, và Tositeo dùng thuế suất, tiền tệ và mã số doanh nghiệp của nước đó. Mức phụ cấp công tác chính thức có sẵn cho Phần Lan; ở nước khác, bạn tự nhập mức theo luật nước mình trong Cài đặt công ty. File thanh toán SEPA dùng được cho công ty tính bằng euro.",
          "Yes. You choose the country you operate in and Tositeo uses its VAT rates, currency and business ID. Official travel allowance rates are built in for Finland; elsewhere you enter your country's rates in the company settings. SEPA payment files work for companies that use the euro.",
          "Kyllä. Valitset toimintamaan, ja Tositeo käyttää sen ALV-kantoja, valuuttaa ja yritystunnusta. Viralliset matkakorvaukset ovat valmiina Suomelle; muualla syötät oman maasi määrät yrityksen asetuksiin. SEPA-maksutiedostot toimivat euroa käyttäville yrityksille."
        ),
      },
      {
        q: l3("Kế toán của tôi làm việc với Tositeo thế nào?", "How does my accountant work with Tositeo?", "Miten kirjanpitäjäni työskentelee Tositeossa?"),
        a: l3(
          "Bạn mời kế toán bằng email trong mục Kế toán của bạn. Tài khoản kế toán miễn phí; họ xem được hóa đơn, công tác phí, giao dịch ngân hàng của bạn, hạch toán và tự xuất dữ liệu, nên bạn không phải gửi ảnh qua tin nhắn nữa. Bạn ngừng quyền truy cập của họ bất cứ lúc nào.",
          "You invite your accountant by e-mail under “Your accountant”. Accountant accounts are free; they see your receipts, travel claims and bank payments, book them and export the data themselves, so no more sending photos by chat. You can end their access at any time.",
          "Kutsut kirjanpitäjäsi sähköpostilla kohdassa ”Kirjanpitäjä”. Kirjanpitäjän tunnukset ovat maksuttomat; hän näkee kuittisi, matkalaskusi ja pankkitapahtumasi, kirjaa ne ja vie aineiston itse, joten kuvia ei enää tarvitse lähettää viesteillä. Voit lopettaa pääsyn milloin tahansa."
        ),
      },
    ],
    keywords: [
      "phần mềm quản lý hóa đơn",
      "chụp hóa đơn bằng điện thoại",
      "cách tính công tác phí",
      "kế toán online cho tiệm nail",
      "đối chiếu sao kê ngân hàng",
      "hoàn tiền nhân viên SEPA",
      "Tositeo hướng dẫn",
    ],
  },
  /* ================= customers: Babelisa (babelisa.ts) ================= */
  {
    id: "c-babelisa",
    slug: "babelisa-game-hoc-ngoai-ngu",
    metaTitle: l3(
      "Babelisa: game học ngoại ngữ, toán, võ, múa và vẽ",
      "Babelisa: Games for Languages, Maths, Ballet and More",
      "Babelisa: pelejä kieliin, matikkaan, balettiin ja muuhun"
    ),
    metaDescription: l3(
      "Mười video ngắn về các trò trên Babelisa: phiêu lưu học 31 thứ tiếng, luyện nói với Lisa, xây thành, võ tự vệ, toán lớp 3, lớp 4, múa ba lê và học vẽ.",
      "Ten short videos on the Babelisa games: an island adventure in 31 languages, talking with Lisa, city building, self-defence, maths, ballet and drawing.",
      "Kymmenen lyhyttä videota Babelisan peleistä: saariseikkailu 31 kielellä, puhetta Lisan kanssa, kaupungin rakentaminen, itsepuolustus, matikka ja baletti."
    ),
    headline: l3(
      "Babelisa cho cả nhà: học ngoại ngữ, toán, võ, múa và vẽ bằng trò chơi",
      "Babelisa for the whole family: learn languages, maths, self-defence, ballet and drawing by playing",
      "Babelisa koko perheelle: opi kieliä, matematiikkaa, itsepuolustusta, balettia ja piirtämistä pelaamalla"
    ),
    tagline: l3(
      "Mười video ngắn, mỗi video một trò, do một người chơi kể lại: trò đó là gì, chơi thế nào và mẹo để học nhanh hơn.",
      "Ten short videos, one game each, told by a player: what the game is, how to play it and a tip to learn faster.",
      "Kymmenen lyhyttä videota, yksi peli kussakin, pelaajan kertomana: mikä peli on, miten sitä pelataan ja vinkki nopeampaan oppimiseen."
    ),
    level: l3("Cho người lớn và trẻ em, không cần biết trước", "For adults and children, no prior knowledge needed", "Aikuisille ja lapsille, esitietoja ei tarvita"),
    outcomes: [
      l3(
        "Vào cuộc phiêu lưu trên đảo, chọn một trong 31 thứ tiếng, học theo Lisa.",
        "Start the island adventure, pick one of 31 languages and learn from Lisa.",
        "Aloitat saariseikkailun, valitset yhden 31 kielestä ja opit Lisalta."
      ),
      l3(
        "Ôn từ mỗi ngày trong vài phút và luyện nói với Lisa, được chấm từng câu.",
        "Review words in a few minutes a day and talk with Lisa, with every sentence scored.",
        "Kertaat sanoja muutaman minuutin päivässä ja puhut Lisan kanssa, ja jokainen lause pisteytetään."
      ),
      l3(
        "Theo khóa 30 ngày dám nói tiếng Anh hoặc Phần Lan, mỗi ngày một chủ đề.",
        "Follow the 30-day speaking course in English or Finnish, one everyday topic a day.",
        "Seuraat 30 päivän puhekurssia englanniksi tai suomeksi, yksi arkinen aihe päivässä."
      ),
      l3(
        "Xây thành trong Vương Quốc Ngôn Từ, trả lời đúng để xây nhanh hơn.",
        "Build a city in the Kingdom of Words and use right answers to build faster.",
        "Rakennat kaupungin Sanojen valtakunnassa ja nopeutat rakentamista oikeilla vastauksilla."
      ),
      l3(
        "Tập võ tự vệ cùng thầy Alexei, có chạy chậm và chế độ gương.",
        "Train self-defence with coach Alexei, with slow motion and a mirror mode.",
        "Harjoittelet itsepuolustusta valmentaja Alexein kanssa hidastuksen ja peilitilan avulla."
      ),
      l3(
        "Cho bé học toán lớp 3, 4, múa ba lê, vẽ, tiếng Anh qua trò chơi.",
        "Help your child learn Year 3 and 4 maths, ballet, drawing and English through play.",
        "Autat lasta oppimaan 3. ja 4. luokan matematiikkaa, balettia, piirtämistä ja englantia leikin kautta."
      ),
    ],
    intro: [
      l3(
        "Học ngoại ngữ thường bắt đầu bằng sách, danh sách từ và những bài dịch dài. Babelisa đi đường khác: bạn chơi một trò phiêu lưu hoạt hình, và chơi xong thì nói được ngoại ngữ. Trên babelisa.com có cả một loạt trò: phiêu lưu học ngoại ngữ, Vương Quốc Ngôn Từ, luyện nói với Lisa, lớp học võ, và các khóa học cho học sinh. Khóa học này gồm mười video ngắn bằng tiếng Việt, mỗi video giới thiệu một trò, do một người chơi kể lại: trò đó là gì, chơi thế nào, vì sao cuốn, và một mẹo nhỏ để học nhanh hơn.",
        "Learning a language usually starts with books, word lists and long translations. Babelisa takes another road: you play an animated adventure, and by the end you can speak the language. At babelisa.com there is a whole row of games: the language adventure, the Kingdom of Words, talking with Lisa, a martial arts class and courses for schoolchildren. This course is ten short videos, each introducing one game, told by a player: what the game is, how to play it, why it is so gripping and a small tip to learn faster.",
        "Kielen opiskelu alkaa yleensä kirjoista, sanalistoista ja pitkistä käännöksistä. Babelisa kulkee toista tietä: pelaat animaatioseikkailua, ja lopulta osaat puhua kieltä. Osoitteessa babelisa.com on kokonainen rivi pelejä: kieliseikkailu, Sanojen valtakunta, puheharjoitus Lisan kanssa, kamppailulajitunti ja kursseja koululaisille. Tämä kurssi on kymmenen lyhyttä videota, joista jokainen esittelee yhden pelin pelaajan kertomana: mikä peli on, miten sitä pelataan, miksi se koukuttaa ja pieni vinkki nopeampaan oppimiseen."
      ),
      l3(
        "Video đầu tiên là trò quan trọng nhất: cuộc phiêu lưu trên đảo. Bạn là chàng trai bị đắm tàu, dạt vào một hòn đảo lạ, và Lisa, cô gái của rừng, dạy bạn bằng hành động: chỉ vào nước, vào cây, vào lửa rồi nói tên của nó. Không có một chữ dịch nào. Bạn chọn một trong ba mươi mốt thứ tiếng, rồi đi qua tám chương, năm mươi lăm ngày, từ bờ biển đến tiệm làm đẹp, nhà hàng, ngân hàng, khách sạn và chợ đầu mối, toàn những tình huống mà người sống ở châu Âu gặp hằng ngày.",
        "The first video covers the most important game: the island adventure. You are a shipwrecked young man washed up on a strange island, and Lisa, the girl of the forest, teaches you through actions: she points at water, a tree, fire and says the word. There is not a single translation. You pick one of thirty-one languages and go through eight chapters and fifty-five days, from the beach to a beauty salon, a restaurant, a bank, a hotel and a wholesale market, all situations people living in Europe meet every day.",
        "Ensimmäinen video esittelee tärkeimmän pelin: saariseikkailun. Olet haaksirikkoutunut nuori mies vieraalla saarella, ja metsän tyttö Lisa opettaa sinua tekemällä: hän osoittaa vettä, puuta ja tulta ja sanoo sanan. Yhtään käännöstä ei ole. Valitset yhden kolmestakymmenestäyhdestä kielestä ja etenet kahdeksan lukua ja viisikymmentäviisi päivää rannalta kauneushoitolaan, ravintolaan, pankkiin, hotelliin ja tukkutorille, tilanteisiin, joita Euroopassa asuva kohtaa joka päivä."
      ),
      l3(
        "Hai video tiếp theo dành cho những ai còn ngại nói. Thẻ Ôn hôm nay gom những từ đến hạn ôn trong ba đến năm phút, còn Luyện nói với Lisa là buổi nói chuyện năm phút, mỗi câu được chấm phần trăm và sao. Khóa Ba mươi ngày dám nói có tiếng Anh và tiếng Phần Lan: mỗi ngày một chủ đề đời thường, từ giới thiệu bản thân, gọi cà phê đến nói chuyện với khách ở chỗ làm, và câu đã nói tự quay lại để ôn sau một, ba, bảy và mười bốn ngày.",
        "The next videos are for anyone still shy about speaking. Today's review gathers the words that are due in three to five minutes, and Talk with Lisa is a five-minute conversation where every sentence gets a percentage and stars. The 30-day speaking course comes in English and Finnish: an everyday topic each day, from introducing yourself and ordering coffee to talking with customers at work, and the phrases you have said come back for review after one, three, seven and fourteen days.",
        "Seuraavat videot ovat niille, jotka vielä ujostelevat puhumista. Päivän kertaus kokoaa kerrattavat sanat kolmeen–viiteen minuuttiin, ja puheharjoitus Lisan kanssa on viiden minuutin keskustelu, jossa jokainen lause saa prosentit ja tähdet. 30 päivän puhekurssi on englanniksi ja suomeksi: joka päivä arkinen aihe itsensä esittelystä ja kahvin tilaamisesta asiakkaiden kanssa puhumiseen töissä, ja sanomasi fraasit palaavat kerrattaviksi yhden, kolmen, seitsemän ja neljäntoista päivän päästä."
      ),
      l3(
        "Nếu bạn mê game chiến thuật, Vương Quốc Ngôn Từ cho bạn xây thành bằng ngoại ngữ: mỗi câu trả lời đúng ở Học viện rút mười phần trăm thời gian xây còn lại, và từ nào bạn đã thuộc thì đạo quân có thêm lính. Còn Sói Taiga là trại võ tự vệ thực chiến với huấn luyện viên Alexei giảng bằng tiếng Việt: mười lăm bài đi theo thứ tự, có video làm mẫu, chạy chậm và chế độ gương để tập theo.",
        "If you love strategy games, the Kingdom of Words lets you build a city with a foreign language: every right answer in the Academy cuts ten percent off the remaining build time, and every word you know adds soldiers to your army. Taiga Wolf is a practical self-defence camp with coach Alexei explaining in Vietnamese: fifteen lessons in order, with demo videos, slow motion and a mirror mode to follow along.",
        "Jos pidät strategiapeleistä, Sanojen valtakunnassa rakennat kaupunkia vieraan kielen avulla: jokainen oikea vastaus akatemiassa lyhentää jäljellä olevaa rakennusaikaa kymmenen prosenttia, ja jokainen osaamasi sana tuo armeijaan lisää sotilaita. Taigan susi taas on käytännön itsepuolustusleiri, jossa valmentaja Alexei opettaa vietnamiksi: viisitoista oppituntia järjestyksessä, mallivideot, hidastus ja peilitila mukana tekemistä varten."
      ),
      l3(
        "Năm video cuối dành cho bố mẹ có con nhỏ. Toán lớp ba cùng cô Mai theo chương trình sách giáo khoa mới, và Toán lớp bốn với phân số, đo lường, hình học, đều có video cô giảng trên bảng, bài tập và đề kiểm tra, miễn phí, không quảng cáo. Studio Sáng Tạo Nhí có cả chục phòng để tô tranh, làm móng, phối đồ, và hết năng lượng thì bé học tiếng Anh để nạp lại. Lớp học Múa Ba Lê có cô Vy dạy mười ba bài, còn Game Học Vẽ có cô Lumi hướng dẫn bốn mươi hai bài, từ quả táo đến chân dung ông bà.",
        "The last five videos are for parents of young children. Year 3 maths with teacher Mai follows Vietnam's new textbooks, and Year 4 maths covers fractions, measurement and geometry; both have a teacher explaining at the board, exercises and tests, free and without ads. The Kids' Creative Studio has around ten rooms for colouring, nails and fashion, and when the energy runs out your child does a little English to recharge. In the ballet class teacher Vy teaches thirteen lessons, and in the drawing game teacher Lumi guides forty-two lessons, from an apple to a portrait of grandparents.",
        "Viimeiset viisi videota ovat pienten lasten vanhemmille. 3. luokan matematiikka opettaja Main kanssa seuraa Vietnamin uusia oppikirjoja, ja 4. luokan matematiikassa ovat murtoluvut, mittaaminen ja geometria; kummassakin opettaja selittää taululla, ja mukana on tehtäviä ja kokeita, maksutta ja ilman mainoksia. Lasten luovassa studiossa on kymmenkunta huonetta värittämiseen, kynsiin ja muotiin, ja kun energia loppuu, lapsi opiskelee hetken englantia ladatakseen sen. Balettitunnilla opettaja Vy opettaa kolmetoista oppituntia, ja piirtämispelissä opettaja Lumi opastaa neljäkymmentäkaksi oppituntia omenasta isovanhempien muotokuvaan."
      ),
      l3(
        "Hình trong video là cảnh chơi thật của Babelisa, quay trên một bản thử không có dữ liệu của người chơi nào. Dưới mỗi video có các bước bằng chữ, mẹo và một bài kiểm tra nhanh. Bạn chỉ cần mở babelisa.com trên điện thoại hay máy tính, không cần tải gì, chọn một trò và chơi ngay.",
        "The videos show real Babelisa gameplay, filmed on a test copy with no player's data. Under each video you find the written steps, tips and a quick quiz. Just open babelisa.com on your phone or computer, with nothing to download, pick a game and play.",
        "Videoilla näkyy oikeaa Babelisan pelaamista, kuvattuna testikopiolla ilman kenenkään pelaajan tietoja. Jokaisen videon alla ovat kirjalliset vaiheet, vinkit ja pikavisa. Avaa babelisa.com puhelimella tai tietokoneella, mitään ei tarvitse ladata, valitse peli ja pelaa."
      ),
    ],
    forWho: [
      l3(
        "Người lớn sống ở châu Âu muốn học tiếng Anh, tiếng Phần Lan hay tiếng khác cho công việc và đời sống.",
        "Adults living in Europe who want English, Finnish or another language for work and daily life.",
        "Euroopassa asuvat aikuiset, jotka tarvitsevat englantia, suomea tai muuta kieltä töissä ja arjessa."
      ),
      l3(
        "Người đã học tiếng Anh nhiều năm mà vẫn ngại nói.",
        "People who have studied English for years but are still shy about speaking.",
        "Ne, jotka ovat opiskelleet englantia vuosia mutta ujostelevat yhä puhumista."
      ),
      l3(
        "Bạn trẻ mê game chiến thuật xây thành, hoặc muốn học võ tự vệ.",
        "Young people who love city-building strategy games or want to learn self-defence.",
        "Nuoret, jotka pitävät kaupunginrakennuspeleistä tai haluavat oppia itsepuolustusta."
      ),
      l3(
        "Bố mẹ muốn con giữ môn toán bằng tiếng Việt khi sống ở nước ngoài, và cho bé vẽ, múa, học tiếng Anh mỗi ngày.",
        "Parents abroad who want their child to keep up maths in Vietnamese, and to draw, dance and learn English every day.",
        "Ulkomailla asuvat vanhemmat, jotka haluavat lapsen pysyvän mukana vietnaminkielisessä matematiikassa sekä piirtävän, tanssivan ja oppivan englantia joka päivä."
      ),
    ],
    faq: [
      {
        q: l3("Babelisa là gì, có mất tiền không?", "What is Babelisa and does it cost anything?", "Mikä Babelisa on ja maksaako se?"),
        a: l3(
          "Babelisa là trang trò chơi học tập ở babelisa.com, với các trò học ngoại ngữ, luyện nói, xây thành, võ tự vệ, toán, múa và vẽ. Cuộc phiêu lưu trên đảo, khóa Ba mươi ngày dám nói và Sói Taiga đều miễn phí; Toán lớp ba và lớp bốn miễn phí, không quảng cáo. Các video của khóa học này cũng miễn phí.",
          "Babelisa is a learning-game site at babelisa.com, with games for languages, speaking, city building, self-defence, maths, ballet and drawing. The island adventure, the 30-day speaking course and Taiga Wolf are free, and Year 3 and Year 4 maths are free with no ads. The videos in this course are free as well.",
          "Babelisa on oppimispelien sivusto osoitteessa babelisa.com: pelejä kieliin, puhumiseen, kaupungin rakentamiseen, itsepuolustukseen, matematiikkaan, balettiin ja piirtämiseen. Saariseikkailu, 30 päivän puhekurssi ja Taigan susi ovat maksuttomia, ja 3. ja 4. luokan matematiikka on maksuton ja mainokseton. Myös tämän kurssin videot ovat maksuttomia."
        ),
      },
      {
        q: l3("Có cần tải app hay tạo tài khoản không?", "Do I need to download an app or create an account?", "Pitääkö ladata sovellus tai luoda tili?"),
        a: l3(
          "Không cần tải gì: bạn chơi ngay trên điện thoại hay máy tính ở babelisa.com. Khóa Ba mươi ngày dám nói không cần đăng ký mới học được, và Vương Quốc Ngôn Từ cũng vào chơi được ngay. Chỉ khi muốn xếp hạng, trò chuyện và liên minh với người khác trong Vương Quốc Ngôn Từ thì bạn mới đăng nhập bằng email.",
          "Nothing to download: you play straight away on your phone or computer at babelisa.com. The 30-day speaking course needs no sign-up, and you can jump right into the Kingdom of Words too. You only sign in with your e-mail if you want rankings, chat and alliances with other players in the Kingdom of Words.",
          "Mitään ei tarvitse ladata: pelaat heti puhelimella tai tietokoneella osoitteessa babelisa.com. 30 päivän puhekurssi ei vaadi rekisteröitymistä, ja Sanojen valtakuntaan pääsee myös suoraan. Sähköpostilla kirjaudutaan vain, jos haluat Sanojen valtakunnassa ranking-listoille, chattiin ja liittoumiin muiden pelaajien kanssa."
        ),
      },
      {
        q: l3("Babelisa dạy những thứ tiếng nào?", "Which languages does Babelisa teach?", "Mitä kieliä Babelisa opettaa?"),
        a: l3(
          "Cuộc phiêu lưu trên đảo có ba mươi mốt thứ tiếng, như tiếng Anh, Phần Lan, Đức, Pháp, Nhật, Hàn và Trung. Khóa Ba mươi ngày dám nói có tiếng Anh và tiếng Phần Lan. Vương Quốc Ngôn Từ có bảy thứ tiếng để chọn, còn các khóa cho bé thì kèm thêm từ tiếng Anh.",
          "The island adventure has thirty-one languages, such as English, Finnish, German, French, Japanese, Korean and Chinese. The 30-day speaking course comes in English and Finnish. The Kingdom of Words offers seven languages, and the children's courses add English words along the way.",
          "Saariseikkailussa on kolmekymmentäyksi kieltä, esimerkiksi englanti, suomi, saksa, ranska, japani, korea ja kiina. 30 päivän puhekurssi on englanniksi ja suomeksi. Sanojen valtakunnassa voi valita seitsemästä kielestä, ja lasten kursseilla opitaan lisäksi englannin sanoja."
        ),
      },
      {
        q: l3("Trò nào phù hợp với trẻ em?", "Which games suit children?", "Mitkä pelit sopivat lapsille?"),
        a: l3(
          "Có Toán lớp ba cùng cô Mai, Toán lớp bốn kèm Đảo Tiếng Anh với vẹt Lulu, Studio Sáng Tạo Nhí với cô Lisa nói tiếng Việt, Lớp học Múa Ba Lê cùng cô Vy và Game Học Vẽ cùng cô Lumi. Bố mẹ nên chơi cùng bé một lúc, rồi hỏi lại bé những từ tiếng Anh vừa học.",
          "There is Year 3 maths with teacher Mai, Year 4 maths with the English island and Lulu the parrot, the Kids' Creative Studio with Lisa speaking Vietnamese, the ballet class with teacher Vy and the drawing game with teacher Lumi. Play along with your child for a while, then ask them the English words they just learned.",
          "Tarjolla on 3. luokan matematiikka opettaja Main kanssa, 4. luokan matematiikka ja englannin saari Lulu-papukaijan kanssa, lasten luova studio, jossa Lisa puhuu vietnamia, balettitunti opettaja Vyn kanssa ja piirtämispeli opettaja Lumin kanssa. Leiki lapsen kanssa hetki ja kysy sitten juuri opitut englannin sanat."
        ),
      },
      {
        q: l3("Mỗi ngày nên chơi bao lâu?", "How long should I play each day?", "Kuinka kauan päivässä kannattaa pelata?"),
        a: l3(
          "Không cần lâu, chỉ cần đều. Cuộc phiêu lưu trên đảo chừng mười phút mỗi ngày nhưng đừng bỏ ngày nào, Ôn hôm nay mất ba đến năm phút, buổi nói với Lisa năm phút. Khóa Ba mươi ngày dám nói nên học mỗi sáng một ngày, còn ba lê và toán thì mỗi ngày hoặc mỗi tối một bài là đủ.",
          "Not long, just regularly. The island adventure needs about ten minutes a day, without skipping days; today's review takes three to five minutes and a talk with Lisa five. Do one day of the 30-day speaking course each morning, and for ballet and maths one lesson a day or each evening is enough.",
          "Ei kauan, kunhan säännöllisesti. Saariseikkailuun riittää noin kymmenen minuuttia päivässä ilman välipäiviä, päivän kertaus vie kolmesta viiteen minuuttia ja keskustelu Lisan kanssa viisi. 30 päivän puhekurssista tehdään yksi päivä joka aamu, ja baletissa ja matematiikassa riittää yksi oppitunti päivässä tai illassa."
        ),
      },
    ],
    keywords: [
      "game học tiếng Anh miễn phí",
      "học tiếng Phần Lan online",
      "app luyện nói tiếng Anh",
      "game học ngoại ngữ cho người lớn",
      "toán lớp 3 kết nối tri thức",
      "toán lớp 4 online cho bé",
      "học múa ba lê cho bé tại nhà",
      "game học vẽ cho bé",
      "Babelisa",
    ],
  },
  /* ================= customers: Moja Beauty (moja.ts) ================= */
  {
    id: "c-moja-beauty",
    slug: "kien-thuc-noi-mi-lam-mong",
    metaTitle: l3(
      "Kiến thức nối mi, làm móng, làm mày: 17 video ngắn",
      "Lashes, Nails and Brows: 17 Short Videos from a Salon",
      "Ripset, kynnet ja kulmat: 17 lyhyttä videota salongilta"
    ),
    metaDescription: l3(
      "Chọn kiểu nối mi, độ cong mi theo dáng mắt, sơn gel hay BIAB, dáng móng, Brow Lamination, cách chăm mi và móng tại nhà: 17 video ngắn từ tiệm Moja Beauty.",
      "Lash styles and curls for your eye shape, gel or BIAB, nail shapes, brow lamination and care at home: 17 short videos from the Moja Beauty salon in Helsinki.",
      "Ripsityylit ja taivutukset silmien muodon mukaan, geeli vai BIAB, kynsien muodot, kulmien laminointi ja kotihoito: 17 lyhyttä videota Moja Beautylta."
    ),
    headline: l3(
      "Nối mi, làm móng, làm mày: hiểu đúng trước khi đến tiệm",
      "Lashes, nails and brows: know what you are booking before you go",
      "Ripset, kynnet ja kulmat: tiedä mitä varaat ennen kuin menet"
    ),
    tagline: l3(
      "Mười bảy video ngắn từ tiệm Moja Beauty ở Helsinki: chọn kiểu nào cho hợp, chăm sóc tại nhà thế nào, và những hiểu lầm hay gặp.",
      "Seventeen short videos from the Moja Beauty salon in Helsinki: which style suits you, how to care for it at home, and common myths.",
      "Seitsemäntoista lyhyttä videota helsinkiläiseltä Moja Beauty -salongilta: mikä tyyli sopii sinulle, miten hoidat sitä kotona ja yleiset harhaluulot."
    ),
    level: l3("Cho khách hàng, không cần biết trước", "For customers, no prior knowledge needed", "Asiakkaille, esitietoja ei tarvita"),
    outcomes: [
      l3(
        "Phân biệt Classic, Hybrid, Volume, Mega và chọn độ cong mi hợp dáng mắt.",
        "Tell Classic, Hybrid, Volume and Mega apart and pick the curl for your eye shape.",
        "Erotat klassiset, hybridi-, volyymi- ja megaripset ja valitset silmillesi sopivan taivutuksen."
      ),
      l3(
        "So sánh nối mi và uốn mi theo giá, độ bền và cảm giác trên mắt.",
        "Compare lash extensions and a lash lift on price, how long they last and how they feel.",
        "Vertailet ripsienpidennyksiä ja kestotaivutusta hinnan, keston ja tuntuman perusteella."
      ),
      l3(
        "Hiểu sơn gel, BIAB, đắp bột, Gel-X và chọn dáng móng hợp bàn tay.",
        "Understand gel polish, BIAB, acrylic and Gel-X and choose a nail shape for your hands.",
        "Ymmärrät geelilakan, BIABin, akryylin ja Gel-X:n ja valitset käsillesi sopivan kynnen muodon."
      ),
      l3(
        "Rửa mi nối đúng cách tại nhà và biết vì sao tránh tẩy trang có dầu.",
        "Wash lash extensions properly at home and know why to avoid oil-based removers.",
        "Peset ripsienpidennykset oikein kotona ja tiedät, miksi öljypohjaisia poistoaineita vältetään."
      ),
      l3(
        "Tránh những thói quen làm gel bong sớm và làm móng thật yếu đi.",
        "Avoid the habits that make gel lift early and weaken your natural nails.",
        "Vältät tavat, jotka irrottavat geelin aikaisin ja heikentävät omia kynsiäsi."
      ),
      l3(
        "Chọn giữa Brow Lamination, nhuộm mày, phun xăm và giữ nếp mày lâu.",
        "Choose between brow lamination, tint and permanent make-up, and make the result last.",
        "Valitset kulmien laminoinnin, värjäyksen ja pysyvän meikin välillä ja saat tuloksen kestämään."
      ),
    ],
    intro: [
      l3(
        "Đi làm mi, làm móng mà không biết nên chọn kiểu nào là chuyện rất thường gặp. Nhiều khách chỉ đưa ảnh trên mạng cho thợ, rồi bất ngờ khi kết quả trên mắt mình khác hẳn, hoặc mi, móng nhanh hỏng vì một thói quen nhỏ ở nhà. Khóa học này gồm mười bảy video ngắn từ tiệm Moja Beauty ở Helsinki, có ba tiệm ở Kamppi, Hakaniemi và Sörnäinen. Mỗi video chỉ khoảng một phút, nói thẳng vào một câu hỏi mà khách hay hỏi ở quầy.",
        "Booking lashes or nails without knowing which style to choose is very common. Many customers just show the technician a photo from the internet, then are surprised when the result on their own eyes looks different, or when lashes and nails wear out early because of a small habit at home. This course is seventeen short videos from Moja Beauty, a salon with three locations in Helsinki: Kamppi, Hakaniemi and Sörnäinen. Each video is about a minute long and answers one question customers often ask at the desk.",
        "On hyvin tavallista varata ripset tai kynnet tietämättä, minkä tyylin valitsisi. Moni asiakas näyttää kosmetologille vain kuvan netistä ja yllättyy, kun tulos omissa silmissä näyttää erilaiselta, tai kun ripset ja kynnet kuluvat nopeasti jonkin pienen kotitavan takia. Tämä kurssi on seitsemäntoista lyhyttä videota Moja Beautylta, jolla on Helsingissä kolme toimipistettä: Kamppi, Hakaniemi ja Sörnäinen. Jokainen video kestää noin minuutin ja vastaa yhteen kysymykseen, jota asiakkaat usein kysyvät tiskillä."
      ),
      l3(
        "Phần mi đi trước. Bạn xem bốn kiểu nối mi Classic, Hybrid, Volume và Mega trên cùng một gương mặt, để thấy mỗi kiểu dày đến đâu. Sau đó là cách chọn độ cong C, CC, D hay L theo dáng mắt: mắt to tròn, mắt nhỏ, mắt sụp mí hay mắt một mí. Video tiếp theo so sánh nối mi với uốn mi bằng giá thật tại Moja, đã gồm thuế, thời gian giữ được và cảm giác trên mắt, rồi giải thích vì sao nối đúng kỹ thuật, cách chân mi khoảng một milimét, không làm hỏng mi thật.",
        "Lashes come first. You see the four extension styles, Classic, Hybrid, Volume and Mega, on the same face, so you can tell how full each one is. Next comes choosing a C, CC, D or L curl for your eye shape: big round eyes, small eyes, hooded eyes or monolids. Another video compares extensions with a lash lift using Moja's real prices, VAT included, how long each lasts and how it feels, and then explains why correct work, about one millimetre from the lid, does not ruin your natural lashes.",
        "Ensin ripset. Näet neljä pidennystyyliä, klassisen, hybridin, volyymin ja megan, samoilla kasvoilla ja huomaat, kuinka tuuhea kukin on. Sitten valitaan C-, CC-, D- tai L-taivutus silmien muodon mukaan: isot pyöreät silmät, pienet silmät, raskaat luomet tai yksiluomiset silmät. Seuraava video vertaa pidennyksiä ja kestotaivutusta Mojan todellisilla hinnoilla, jotka sisältävät arvonlisäveron, sekä kestoa ja tuntumaa, ja kertoo, miksi oikein tehty kiinnitys noin millimetrin päähän luomesta ei pilaa omia ripsiä."
      ),
      l3(
        "Chăm sóc mi tại nhà chiếm nhiều video nhất, vì đây là chỗ khách hay làm sai. Bạn học ba việc không nên làm trước giờ hẹn, ba điều phải nhớ trong những ngày đầu, ba bước rửa mi nối với bọt không dầu, và chu kỳ mọc, rụng của sợi mi: vì sao rụng hai đến năm sợi mỗi ngày là bình thường, và vì sao mi nối rụng theo mi thật. Cuối phần có video về việc đi dặm đúng hẹn thay vì đợi mi rụng sạch mới làm lại.",
        "Care at home gets the most videos, because that is where customers most often go wrong. You learn three things not to do before an appointment, three things to remember in the first days, three steps for washing extensions with an oil-free foam, and the growth cycle of a lash: why losing two to five lashes a day is normal and why extensions fall out with your own lashes. The part ends with a video on booking refills on time instead of waiting until the lashes have all fallen out.",
        "Kotihoidolle on eniten videoita, koska siinä asiakkaat useimmin erehtyvät. Opit kolme asiaa, joita ei kannata tehdä ennen käyntiä, kolme muistettavaa ensimmäisille päiville, kolme vaihetta pidennysten pesuun öljyttömällä vaahdolla sekä ripsen kasvusyklin: miksi kahden–viiden ripsen lähteminen päivässä on normaalia ja miksi pidennykset lähtevät omien ripsien mukana. Osan lopuksi video kertoo, miksi huolto kannattaa varata ajallaan eikä odottaa, että ripset ovat kaikki pudonneet."
      ),
      l3(
        "Phần móng giải thích sơn gel thường, Builder Gel BIAB, đắp bột Acrylic và úp móng Gel-X trên cùng một bàn tay, rồi năm dáng móng vuông, tròn, hạnh nhân, ballerina và nhọn. Ba video sau nói về sức khỏe của móng thật: năm thói quen làm gel bong sớm, điều gì xảy ra khi tự cạy gel ở nhà, và sự thật về chuyện móng có cần thở. Phần mày so sánh Brow Lamination, nhuộm mày và phun xăm, kèm cách giữ nếp mày đẹp suốt sáu tuần. Video cuối dành cho mùa đông lạnh và khô ở Phần Lan.",
        "The nail part explains gel polish, BIAB builder gel, acrylic and Gel-X on the same hand, followed by five nail shapes: square, round, almond, ballerina and stiletto. Three videos then look at the health of your natural nails: five habits that make gel lift early, what peeling off gel at home does, and the truth about nails needing to breathe. The brow part compares brow lamination, tint and permanent make-up and shows how to keep a lamination looking good for six weeks. The last video is for Finland's cold, dry winter.",
        "Kynsiosio esittelee geelilakan, BIAB-rakennegeelin, akryylin ja Gel-X:n samassa kädessä sekä viisi kynnen muotoa: kantikkaan, pyöreän, mantelin, ballerinan ja stiletton. Kolme videota käsittelee omien kynsien kuntoa: viisi tapaa, jotka irrottavat geelin aikaisin, mitä geelin repiminen kotona tekee ja totuus siitä, tarvitsevatko kynnet hengähdystaukoa. Kulmaosio vertaa laminointia, värjäystä ja pysyvää meikkiä ja näyttää, miten laminointi pysyy kauniina kuusi viikkoa. Viimeinen video on Suomen kylmää ja kuivaa talvea varten."
      ),
      l3(
        "Các video dùng ảnh minh họa tạo bằng máy, có lời đọc và phụ đề tiếng Việt, nhạc nền tự soạn. Giá trong video là giá thật tại Moja trên VaraaAi, đã gồm thuế. Video không thay lời khuyên của bác sĩ: khi mắt, da hay móng có dấu hiệu bất thường, hãy hỏi bác sĩ hoặc dược sĩ. Xem xong, bạn có thể đặt lịch ở Moja Beauty trên VaraaAi chỉ trong vài bước.",
        "The videos use computer-generated illustrations, with Vietnamese narration and subtitles and self-made music. Prices in the videos are Moja's real prices on VaraaAi, VAT included. The videos do not replace a doctor's advice: if your eyes, skin or nails show anything unusual, ask a doctor or pharmacist. After watching, you can book at Moja Beauty on VaraaAi in a few steps.",
        "Videoissa on koneella luotuja kuvituskuvia, vietnaminkielinen selostus ja tekstitys sekä itse tehty musiikki. Videoiden hinnat ovat Mojan todellisia hintoja VaraaAissa, arvonlisäveroineen. Videot eivät korvaa lääkärin neuvoja: jos silmissä, iholla tai kynsissä näkyy jotain epätavallista, kysy lääkäriltä tai apteekista. Katsomisen jälkeen voit varata ajan Moja Beautyyn VaraaAissa muutamalla askeleella."
      ),
    ],
    forWho: [
      l3(
        "Người lần đầu đi nối mi, uốn mi hay làm móng và chưa biết chọn kiểu nào.",
        "First-timers booking lash extensions, a lash lift or a manicure who don't know which style to choose.",
        "Ensikertalaiset, jotka varaavat ripsienpidennykset, kestotaivutuksen tai kynnet eivätkä tiedä, minkä tyylin valita."
      ),
      l3(
        "Khách đang nối mi hoặc làm gel muốn giữ mi, móng đẹp lâu hơn.",
        "Customers who already wear extensions or gel and want them to last longer.",
        "Asiakkaat, joilla on jo pidennykset tai geelit ja jotka haluavat niiden kestävän pidempään."
      ),
      l3(
        "Người lo nối mi, làm gel sẽ làm hỏng mi và móng thật.",
        "Anyone worried that extensions or gel will ruin their natural lashes and nails.",
        "Kaikki, jotka pelkäävät pidennysten tai geelien pilaavan omat ripset ja kynnet."
      ),
      l3(
        "Người Việt ở Helsinki và Phần Lan muốn tìm hiểu trước khi đặt lịch ở Moja Beauty.",
        "Vietnamese speakers in Helsinki and Finland who want to know more before booking at Moja Beauty.",
        "Vietnaminkieliset Helsingissä ja muualla Suomessa, jotka haluavat tietää enemmän ennen varausta Moja Beautyyn."
      ),
    ],
    faq: [
      {
        q: l3("Nối mi có làm rụng mi thật không?", "Do lash extensions make your natural lashes fall out?", "Saavatko ripsienpidennykset omat ripset lähtemään?"),
        a: l3(
          "Nối đúng kỹ thuật thì không: mi nối gắn lên một sợi mi thật, cách chân mi khoảng một milimét, keo không chạm da, từng sợi tách riêng, nên mi thật vẫn mọc và rụng theo chu kỳ tự nhiên. Mi thật rụng sớm thường do nối sai bết keo, mi nối quá nặng so với mi thật, hoặc tự giật mi nối ra ở nhà.",
          "Not when the work is done correctly: each extension sits on one natural lash about one millimetre from the lid, the glue does not touch the skin and every lash stays separate, so your lashes keep growing and shedding naturally. Early lash loss usually comes from clumped glue, extensions too heavy for the natural lash, or pulling extensions off at home.",
          "Eivät, kun työ tehdään oikein: jokainen pidennys kiinnitetään yhteen omaan ripseen noin millimetrin päähän luomesta, liima ei koske ihoon ja ripset pysyvät erillään, joten omat ripset kasvavat ja lähtevät luonnollisesti. Ripsien ennenaikainen lähteminen johtuu yleensä paakkuuntuneesta liimasta, liian raskaista pidennyksistä tai pidennysten repimisestä kotona."
        ),
      },
      {
        q: l3("Nên chọn nối mi hay uốn mi?", "Should I choose extensions or a lash lift?", "Kumman valitsen, pidennykset vai kestotaivutuksen?"),
        a: l3(
          "Muốn tự nhiên, ít chăm sóc thì uốn mi: tại Moja 30 euro, 60 phút, giữ nếp khoảng sáu đến tám tuần. Muốn hàng mi dày, dài rõ rệt thì nối mi: Classic 39 euro, 90 phút, và nên đi dặm sau hai đến ba tuần. Giá đã gồm thuế giá trị gia tăng.",
          "For a natural look with little upkeep, choose a lift: at Moja it is 30 euros and 60 minutes, and it lasts about six to eight weeks. For clearly fuller, longer lashes, choose extensions: Classic is 39 euros and 90 minutes, with a refill after two to three weeks. Prices include VAT.",
          "Luonnolliseen ja vähän hoitoa vaativaan lopputulokseen sopii kestotaivutus: Mojalla 30 euroa ja 60 minuuttia, ja se kestää noin kuudesta kahdeksaan viikkoa. Selvästi tuuheampiin ja pidempiin ripsiin sopivat pidennykset: klassiset 39 euroa ja 90 minuuttia, huolto kahden–kolmen viikon välein. Hinnat sisältävät arvonlisäveron."
        ),
      },
      {
        q: l3("Mi nối nên rửa thế nào?", "How should I wash lash extensions?", "Miten ripsienpidennykset pestään?"),
        a: l3(
          "Rửa mỗi ngày bằng bọt rửa mi không dầu: làm ướt nhẹ, lấy một ít bọt, chải nhẹ theo chiều mọc của mi bằng cọ mềm khoảng mười lăm giây mỗi mắt, xả sạch bằng nước mát, thấm khô bằng khăn giấy, sấy mát để xa mặt rồi chải mi lại. Tránh tẩy trang gốc dầu vì dầu làm keo nối mềm ra.",
          "Every day with an oil-free foam: wet lightly, take a little foam, brush gently in the direction the lashes grow with a soft brush for about fifteen seconds per eye, rinse with cool water, blot dry with a tissue, dry on a cool setting held away from the face, then brush the lashes. Avoid oil-based removers, because oil softens the glue.",
          "Joka päivä öljyttömällä vaahdolla: kostuta kevyesti, ota vähän vaahtoa, harjaa pehmeällä harjalla kevyesti ripsien kasvusuuntaan noin viisitoista sekuntia silmää kohden, huuhtele viileällä vedellä, taputtele kuivaksi paperilla, kuivaa viileällä puhalluksella kaukaa ja harjaa ripset. Vältä öljypohjaisia meikinpoistoaineita, sillä öljy pehmentää liimaa."
        ),
      },
      {
        q: l3("Móng có cần nghỉ giữa các lần làm gel không?", "Do nails need a break between gel manicures?", "Tarvitsevatko kynnet taukoa geelien välissä?"),
        a: l3(
          "Móng không thở: phần ta thấy là chất sừng, được nuôi từ gốc móng dưới da. Điều làm hại móng là tự cạy gel, dũa mặt móng quá mạnh hoặc tháo sai cách. Nên nghỉ khi móng rất mỏng, đau, đổi màu lạ hoặc nghi bị nấm, và khi đó hãy hỏi bác sĩ hoặc dược sĩ trước khi làm tiếp.",
          "Nails do not breathe: what you see is keratin, fed from the nail root under the skin. What harms nails is peeling off gel, filing the surface too hard or removing it the wrong way. Take a break when a nail is very thin, sore, oddly coloured or might have a fungal infection, and ask a doctor or pharmacist before the next treatment.",
          "Kynnet eivät hengitä: näkyvä osa on keratiinia, ja kynsi saa ravintonsa ihon alla olevasta kynnen juuresta. Kynsiä vahingoittaa geelin repiminen, liian voimakas viilaus tai väärä poistotapa. Pidä taukoa, jos kynsi on hyvin ohut, kipeä, oudon värinen tai epäilet sieni-infektiota, ja kysy silloin lääkäriltä tai apteekista ennen seuraavaa hoitoa."
        ),
      },
      {
        q: l3("Bao lâu thì nên đi dặm mi và dặm móng?", "How often should I get lash and nail refills?", "Kuinka usein ripset ja kynnet huolletaan?"),
        a: l3(
          "Mi nối nên dặm sau hai đến ba tuần, khi một phần mi nối đã rụng theo mi thật. Móng gel hoặc đắp gel nên dặm sau ba đến bốn tuần, trước khi phần gel lệch ra đầu móng làm móng nặng đầu, dễ gãy và bong. Dặm đúng hẹn nhanh hơn làm mới và giữ dáng luôn đều. Uốn mi thì làm lại sau sáu đến tám tuần.",
          "Refill lash extensions after two to three weeks, when some have fallen out with your natural lashes. Refill gel or builder gel nails after three to four weeks, before the gel moves towards the tip and makes the nail top-heavy, fragile and prone to lifting. On-time refills are quicker than a new set and keep the shape even. A lash lift is redone after six to eight weeks.",
          "Ripsienpidennykset huolletaan kahden–kolmen viikon välein, kun osa on lähtenyt omien ripsien mukana. Geeli- tai rakennekynnet huolletaan kolmen–neljän viikon välein, ennen kuin geeli siirtyy kärkeen ja tekee kynnestä etupainoisen, hauraan ja irtoamisaltiin. Ajallaan tehty huolto on uutta settiä nopeampi ja pitää muodon tasaisena. Kestotaivutus uusitaan kuuden–kahdeksan viikon välein."
        ),
      },
    ],
    keywords: [
      "các kiểu nối mi",
      "độ cong mi C CC D L",
      "nối mi hay uốn mi",
      "cách rửa mi nối",
      "sơn gel và BIAB khác nhau",
      "dáng móng tay đẹp",
      "brow lamination là gì",
      "nối mi có hại mi thật không",
      "Moja Beauty Helsinki",
    ],
  },
  /* ================= customers: getting started ================= */
  {
    id: "c-start",
    slug: "huong-dan-dat-lich-lam-dep",
    metaTitle: l3(
      "Hướng dẫn đặt lịch làm đẹp online: nail, mi, tóc, spa",
      "How to Book Beauty Appointments Online: Step-by-Step",
      "Kauneushoidon ajanvaraus verkossa: ohjeet vaihe vaiheelta"
    ),
    metaDescription: l3(
      "Video miễn phí hướng dẫn đặt lịch làm nail, mi, tóc, spa online: tìm salon gần bạn, chọn nhân viên và giờ trống, tạo tài khoản và cài app VaraaAi.",
      "Free videos on booking nail, lash, hair and spa appointments online: find a salon near you, pick a stylist and a free time, sign up and install the app.",
      "Ilmaiset videot kauneushoidon varaamiseen verkossa: löydä salonki läheltä, valitse tekijä ja vapaa aika, luo tili ja asenna VaraaAi-sovellus puhelimeen."
    ),
    headline: l3(
      "Hướng dẫn đặt lịch làm đẹp online: tìm salon, chọn giờ và xác nhận trong khoảng một phút",
      "How to book a beauty appointment online: find a salon, pick a time and confirm in about a minute",
      "Näin varaat kauneushoidon verkossa: löydä salonki, valitse aika ja vahvista noin minuutissa"
    ),
    tagline: l3(
      "Ba video ngắn quay trên trang thật: lần đặt lịch đầu tiên, tài khoản của bạn và app VaraaAi trên điện thoại.",
      "Three short videos filmed on the real site: your first booking, your account and the VaraaAi app on your phone.",
      "Kolme lyhyttä videota oikealla sivustolla: ensimmäinen varaus, oma tili ja VaraaAi-sovellus puhelimeen."
    ),
    level: l3("Cho khách hàng, người mới bắt đầu", "For customers, beginner friendly", "Asiakkaille, aloittelijoille"),
    outcomes: [
      l3(
        "Tìm salon theo dịch vụ và khu vực, hoặc bấm “Gần tôi” để xem salon quanh bạn.",
        "Find a salon by service and area, or press “Near me” to see the salons around you.",
        "Löydät salongin palvelun ja alueen mukaan tai painat ”Lähelläni” ja näet lähimmät salongit."
      ),
      l3(
        "Chọn một hay nhiều dịch vụ, nhân viên bạn thích, rồi chọn ngày và giờ còn trống.",
        "Choose one or more services and the person you like, then a date and a free time.",
        "Valitset yhden tai useamman palvelun ja mieluisan tekijän sekä päivän ja vapaan ajan."
      ),
      l3(
        "Nhập mã giảm giá hoặc mã thẻ quà tặng ngay khi đặt lịch, đọc chính sách huỷ rồi xác nhận.",
        "Enter a discount or gift-card code while booking, read the cancellation policy and confirm.",
        "Syötät alennus- tai lahjakorttikoodin varatessasi, luet peruutusehdot ja vahvistat varauksen."
      ),
      l3(
        "Tạo tài khoản VaraaAi miễn phí, đăng nhập và lấy lại mật khẩu khi quên.",
        "Create a free VaraaAi account, sign in and reset your password if you forget it.",
        "Luot ilmaisen VaraaAi-tilin, kirjaudut sisään ja vaihdat unohtuneen salasanan."
      ),
      l3(
        "Biết các mục trong tài khoản: lịch hẹn, thẻ tích điểm, hộp thư và bảng tin.",
        "Know your way around your account: bookings, loyalty cards, inbox and feed.",
        "Tunnet tilisi osiot: varaukset, kanta-asiakaskortit, viestit ja syötteen."
      ),
      l3(
        "Cài app VaraaAi lên Android, iPhone hoặc máy tính mà không cần CH Play hay App Store.",
        "Install the VaraaAi app on Android, iPhone or a computer without Google Play or the App Store.",
        "Asennat VaraaAi-sovelluksen Androidiin, iPhoneen tai tietokoneelle ilman sovelluskauppaa."
      ),
    ],
    intro: [
      l3(
        "Muốn làm móng, nối mi hay cắt tóc mà không phải gọi điện hay chờ salon trả lời tin nhắn? Khóa học Bắt đầu đặt lịch của Học viện VaraaAi hướng dẫn bạn đặt lịch làm đẹp online trên VaraaAi, nền tảng đặt lịch cho tiệm nail, mi, tóc và spa. Khóa học chỉ có ba video ngắn, miễn phí, xem ngay trên điện thoại và không cần đăng nhập. Xem xong, bạn tự đặt được lịch hẹn vào lúc nào tiện cho mình, kể cả buổi tối khi salon đã đóng cửa.",
        "Want a manicure, lash extensions or a haircut without phoning the salon or waiting for a reply to your message? The Getting started course at VaraaAi Academy shows you how to book beauty appointments online on VaraaAi, the booking platform for nail, lash, hair and spa salons. It is just three short free videos that you can watch on your phone with no sign-in. Afterwards you can book whenever it suits you, even in the evening when the salon is closed.",
        "Haluatko kynsihoidon, ripsienpidennykset tai hiustenleikkauksen soittamatta salonkiin tai odottamatta vastausta viestiin? VaraaAi-akatemian Alkuun pääseminen -kurssi näyttää, miten kauneushoito varataan verkossa VaraaAissa, kynsi-, ripsi-, hius- ja spa-salonkien ajanvarausalustalla. Kurssissa on vain kolme lyhyttä ilmaista videota, jotka voit katsoa puhelimella ilman kirjautumista. Sen jälkeen varaat ajan silloin kun sinulle sopii, myös iltaisin, kun salonki on jo kiinni."
      ),
      l3(
        "Bài đầu tiên đi trọn một lần đặt lịch. Bạn gõ dịch vụ vào ô “Dịch vụ hoặc salon”, gõ thành phố vào ô “Khu vực” hoặc bấm “Gần tôi”, rồi xem kết quả dạng danh sách hay trên bản đồ. Trên trang salon, bạn chọn một hoặc nhiều dịch vụ, chọn nhân viên mình thích hoặc “Bất kỳ ai còn trống”, rồi chọn ngày và giờ còn trống. Video cũng chỉ chỗ nhập mã giảm giá hay mã thẻ quà tặng, cách chọn thanh toán tại salon, và nhắc bạn đọc chính sách huỷ trước khi bấm “Xác nhận đặt lịch”.",
        "The first lesson goes through a whole booking. You type a service under “Service or salon”, a city under “Area” or press “Near me”, and see the results as a list or on a map. On the salon's page you choose one or more services, the person you like or “Anyone available”, and then a date and a free time. The video also shows where to enter a discount or gift-card code, how to choose to pay at the salon, and reminds you to read the cancellation policy before you press “Confirm booking”.",
        "Ensimmäinen oppitunti käy läpi kokonaisen varauksen. Kirjoitat palvelun ja kaupungin hakukenttiin tai painat ”Lähelläni” ja näet tulokset luettelona tai kartalla. Salongin sivulla valitset yhden tai useamman palvelun, mieluisan tekijän tai ”Kuka tahansa vapaa” ja sitten päivän ja vapaan ajan. Video näyttää myös, mihin alennus- tai lahjakorttikoodi syötetään ja miten valitaan maksu salongissa, ja muistuttaa lukemaan peruutusehdot ennen kuin painat ”Vahvista varaus”."
      ),
      l3(
        "Bài thứ hai là tài khoản. Đăng ký VaraaAi miễn phí, chỉ cần họ tên, email, số điện thoại và mật khẩu; bạn tự chọn có nhận tin khuyến mãi qua email hay tin nhắn hay không. Video chỉ cách đăng nhập, lấy lại mật khẩu khi quên, và giới thiệu các mục trong tài khoản: Hồ sơ của tôi, Lịch hẹn của tôi, Thẻ tích điểm, Hộp thư, Đang theo dõi và Bảng tin. Đây là nơi bạn quay lại mỗi khi cần xem lịch, nhắn salon hay mở thẻ thành viên.",
        "The second lesson is your account. Signing up for VaraaAi is free and needs only your name, email, phone number and a password, and you decide whether you want offers by email or text message. The video shows how to sign in, how to reset a forgotten password and what is in your account: your profile, bookings, loyalty cards, inbox, the salons you follow and your feed. This is where you come back whenever you want to check a booking, message a salon or open your member card.",
        "Toinen oppitunti käsittelee omaa tiliä. Rekisteröityminen VaraaAihin on ilmaista, ja tarvitset vain nimen, sähköpostin, puhelinnumeron ja salasanan; voit itse päättää, haluatko tarjouksia sähköpostilla tai tekstiviestillä. Video näyttää, miten kirjaudut, miten vaihdat unohtuneen salasanan ja mitä tilistä löytyy: profiili, varaukset, kanta-asiakaskortit, viestit, seuraamasi salongit ja syöte. Tänne palaat aina, kun haluat tarkistaa varauksen, viestittää salongille tai avata jäsenkorttisi."
      ),
      l3(
        "Bài thứ ba giúp bạn cài app VaraaAi lên điện thoại mà không cần vào CH Play hay App Store. Trên Android và máy tính, bạn mở varaaai.com/app bằng Chrome, Edge hoặc Samsung Internet rồi bấm “Cài đặt ứng dụng”. Trên iPhone và iPad, bạn mở trang bằng Safari, nhấn nút Chia sẻ và chọn “Thêm vào Màn hình chính”. App miễn phí, tự cập nhật, và biểu tượng VaraaAi nằm ngay trên màn hình chính để lần sau đặt lịch chỉ mất vài chạm.",
        "The third lesson helps you install the VaraaAi app without going to Google Play or the App Store. On Android and computers you open varaaai.com/app in Chrome, Edge or Samsung Internet and press “Install the app”. On iPhone and iPad you open the page in Safari, tap the Share button and choose “Add to Home Screen”. The app is free and updates itself, and the VaraaAi icon sits on your home screen, so your next booking takes only a few taps.",
        "Kolmas oppitunti auttaa asentamaan VaraaAi-sovelluksen ilman Google Playta tai App Storea. Androidilla ja tietokoneella avaat varaaai.com/app-sivun Chromessa, Edgessä tai Samsung Internetissä ja painat ”Asenna sovellus”. iPhonella ja iPadilla avaat sivun Safarissa, napautat Jaa-painiketta ja valitset ”Lisää Koti-valikkoon”. Sovellus on ilmainen ja päivittyy itse, ja VaraaAi-kuvake on aloitusnäytöllä, joten seuraava varaus vie vain muutaman napautuksen."
      ),
      l3(
        "Mỗi bài có video quay trên trang thật, người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm, kèm các bước bằng chữ và bài kiểm tra nhanh để nhận điểm, huy hiệu. Video thuyết minh bằng tiếng Việt và có bản thu tiếng Anh, còn chữ trên trang học có tiếng Việt, tiếng Anh và tiếng Phần Lan, nên bạn có thể gửi cho người thân hay bạn bè không nói tiếng Việt. Học xong khóa này, bạn học tiếp Quản lý lịch hẹn và Ưu đãi và thẻ; học xong mọi bài dành cho khách hàng, bạn tải được chứng nhận hoàn thành “Sử dụng VaraaAi dành cho khách hàng”.",
        "Every lesson has a video filmed on the real site, with a guide talking through each step and highlighting what to press, plus written steps and a quick quiz for points and badges. The videos are narrated in Vietnamese and also recorded in English, and the lesson pages are written in Vietnamese, English and Finnish, so you can share them with family and friends who don't speak Vietnamese. After this course, carry on with Managing bookings and Rewards and cards; finish every lesson for customers to download the certificate of completion “Using VaraaAi as a customer”.",
        "Jokaisessa oppitunnissa on video oikealla sivustolla: opastaja kertoo vaiheet ja korostaa painettavan kohdan, ja lisäksi on kirjalliset vaiheet ja pikavisa pisteineen ja merkkeineen. Videot on äänitetty vietnamiksi ja englanniksi, ja oppituntisivut ovat vietnamiksi, englanniksi ja suomeksi, joten voit jakaa ne myös läheisille, jotka eivät puhu vietnamia. Tämän jälkeen voit jatkaa kursseilla Varausten hallinta sekä Edut ja kortit; kun suoritat kaikki asiakkaiden oppitunnit, voit ladata todistuksen ”VaraaAin käyttö asiakkaana”."
      ),
    ],
    forWho: [
      l3(
        "Người muốn đặt lịch làm nail, mi, tóc, spa online thay vì gọi điện.",
        "Anyone who wants to book nails, lashes, hair or spa online instead of calling.",
        "Kaikki, jotka haluavat varata kynsi-, ripsi-, hius- tai spa-hoidon verkossa soittamisen sijaan."
      ),
      l3(
        "Người lần đầu dùng VaraaAi và chưa có tài khoản.",
        "First-time VaraaAi users who don't have an account yet.",
        "Ensikertalaiset, joilla ei vielä ole VaraaAi-tiliä."
      ),
      l3(
        "Con cháu muốn chỉ bố mẹ, ông bà tự đặt lịch trên điện thoại.",
        "Anyone who wants to help parents or grandparents book on their own phone.",
        "Kaikki, jotka haluavat opastaa vanhempiaan tai isovanhempiaan varaamaan omalla puhelimellaan."
      ),
      l3(
        "Người Việt ở Phần Lan, châu Âu muốn được hướng dẫn bằng tiếng Việt.",
        "Vietnamese speakers in Finland and Europe who want guidance in their language.",
        "Suomessa ja Euroopassa asuvat vietnaminkieliset, jotka haluavat ohjeet omalla kielellään."
      ),
    ],
    faq: [
      {
        q: l3("Đặt lịch làm nail online như thế nào?", "How do I book a nail appointment online?", "Miten varaan kynsihoidon verkossa?"),
        a: l3(
          "Trên VaraaAi, bạn tìm salon theo dịch vụ và khu vực, mở trang salon, bấm “Đặt lịch” cạnh dịch vụ, chọn nhân viên, ngày và giờ còn trống, điền thông tin rồi bấm “Xác nhận đặt lịch”. Video đầu tiên của khóa đi trọn các bước này, thường xong trong khoảng một phút.",
          "On VaraaAi you search for a salon by service and area, open its page, press “Book” next to the service, choose the staff member, date and free time, fill in your details and press “Confirm booking”. The first video in this course goes through every step, which usually takes about a minute.",
          "VaraaAissa haet salonkia palvelun ja alueen mukaan, avaat sen sivun, painat ”Varaa” palvelun vieressä, valitset tekijän, päivän ja vapaan ajan, täytät tietosi ja painat ”Vahvista varaus”. Kurssin ensimmäinen video käy läpi kaikki vaiheet, joihin menee yleensä noin minuutti."
        ),
      },
      {
        q: l3("Đặt lịch trên VaraaAi có mất phí không?", "Does booking on VaraaAi cost anything?", "Maksaako varaaminen VaraaAissa jotain?"),
        a: l3(
          "Khách hàng dùng VaraaAi miễn phí: tạo tài khoản, đặt lịch và cài app đều không mất phí. Bạn trả tiền dịch vụ cho salon như bình thường. Cách thanh toán do từng salon cài đặt và hiện ở bước thanh toán trước khi bạn xác nhận; thường là thanh toán tại salon bằng tiền mặt hoặc thẻ.",
          "VaraaAi is free for customers: creating an account, booking and installing the app cost nothing. You pay the salon for the service as usual. Each salon sets its own payment options, which you see at the payment step before you confirm; usually you pay at the salon in cash or by card.",
          "VaraaAi on asiakkaille ilmainen: tilin luominen, varaaminen ja sovelluksen asentaminen eivät maksa mitään. Palvelusta maksat salongille tavalliseen tapaan. Jokainen salonki asettaa omat maksutapansa, jotka näet maksuvaiheessa ennen vahvistusta; yleensä maksu tapahtuu salongissa käteisellä tai kortilla."
        ),
      },
      {
        q: l3("Có cần tài khoản để đặt lịch không?", "Do I need an account to book?", "Tarvitsenko tilin varaamiseen?"),
        a: l3(
          "Bạn có thể tạo tài khoản ngay trong lần đặt lịch đầu tiên bằng họ tên, số điện thoại, email và mật khẩu. Tài khoản giúp bạn xem lại lịch hẹn, tự huỷ trong thời hạn salon cho phép, nhắn tin với salon và giữ các thẻ tích điểm ở cùng một chỗ.",
          "You can create one during your first booking with your name, phone number, email and a password. The account lets you see your bookings, cancel within the time the salon allows, message salons and keep all your loyalty cards in one place.",
          "Voit luoda tilin ensimmäisen varauksen yhteydessä nimellä, puhelinnumerolla, sähköpostilla ja salasanalla. Tilin avulla näet varauksesi, voit perua salongin sallimassa ajassa, viestittää salongeille ja pitää kaikki kanta-asiakaskorttisi yhdessä paikassa."
        ),
      },
      {
        q: l3("Làm sao cài app VaraaAi trên iPhone?", "How do I install the VaraaAi app on an iPhone?", "Miten asennan VaraaAi-sovelluksen iPhoneen?"),
        a: l3(
          "Mở varaaai.com/app bằng Safari, nhấn nút Chia sẻ (hình vuông có mũi tên lên) ở cuối màn hình, chọn “Thêm vào Màn hình chính” rồi bấm “Thêm”. App cài thẳng từ trình duyệt, miễn phí và tự cập nhật, không cần App Store. Trên Android, mở trang bằng Chrome và bấm “Cài đặt ứng dụng”.",
          "Open varaaai.com/app in Safari, tap the Share button (a square with an arrow pointing up) at the bottom of the screen, choose “Add to Home Screen” and tap “Add”. The app installs straight from the browser, is free and updates itself, with no App Store needed. On Android, open the page in Chrome and press “Install the app”.",
          "Avaa varaaai.com/app Safarissa, napauta alareunan Jaa-painiketta (neliö, jossa nuoli ylöspäin), valitse ”Lisää Koti-valikkoon” ja napauta ”Lisää”. Sovellus asentuu suoraan selaimesta, on ilmainen ja päivittyy itse, eikä App Storea tarvita. Androidilla avaa sivu Chromessa ja paina ”Asenna sovellus”."
        ),
      },
      {
        q: l3("Video có tiếng Anh hay tiếng Phần Lan không?", "Are the videos available in English or Finnish?", "Onko videoita englanniksi tai suomeksi?"),
        a: l3(
          "Video gốc thuyết minh bằng tiếng Việt và có bản thu tiếng Anh, quay lại cả màn hình lẫn giọng nói. Trang học có chữ tiếng Việt, tiếng Anh và tiếng Phần Lan; ở trang tiếng Phần Lan, video phát bản tiếng Anh. Nhờ vậy bạn có thể gửi link cho người thân, bạn bè không nói tiếng Việt.",
          "The original videos are narrated in Vietnamese, and there are English recordings with both the screen walkthrough and the voice redone. Lesson pages are written in Vietnamese, English and Finnish; on the Finnish pages the English video plays. So you can share the link with family and friends who don't speak Vietnamese.",
          "Alkuperäiset videot on kerrottu vietnamiksi, ja niistä on englanninkieliset versiot, joissa sekä näyttötallenne että ääni on tehty uudelleen. Oppituntisivut ovat vietnamiksi, englanniksi ja suomeksi; suomenkielisillä sivuilla toistetaan englanninkielinen video. Voit siis jakaa linkin myös läheisille, jotka eivät puhu vietnamia."
        ),
      },
    ],
    keywords: [
      "cách đặt lịch làm nail online",
      "đặt lịch làm đẹp online",
      "app đặt lịch làm nail",
      "đặt lịch nối mi online",
      "đặt lịch cắt tóc online",
      "tìm tiệm nail gần đây",
      "hướng dẫn dùng VaraaAi",
      "cài app VaraaAi",
    ],
  },
  /* ================= customers: bookings ================= */
  {
    id: "c-bookings",
    slug: "quan-ly-lich-hen-lam-dep",
    metaTitle: l3(
      "Quản lý lịch hẹn làm đẹp: xem, huỷ lịch, chat, đánh giá",
      "Manage Beauty Bookings: View, Cancel, Chat and Review",
      "Kauneusvarausten hallinta: katso, peru, viestitä, arvioi"
    ),
    metaDescription: l3(
      "Video miễn phí: xem lại và tự huỷ lịch hẹn làm đẹp đúng hạn, chat với salon kèm ảnh mẫu, viết đánh giá sau khi làm xong. Ngắn, dễ hiểu, xem trên điện thoại.",
      "Free videos: check and cancel your beauty bookings in time, chat with the salon and send a photo of the look you want, then leave a review after your visit.",
      "Ilmaiset videot: tarkista ja peru kauneusvaraukset ajoissa, viestitä salongille ja lähetä mallikuva, ja kirjoita arvostelu käynnin jälkeen. Lyhyet ja selkeät."
    ),
    headline: l3(
      "Quản lý lịch hẹn làm đẹp trên VaraaAi: xem lại, huỷ đúng hạn, nhắn salon và viết đánh giá",
      "Manage your beauty bookings on VaraaAi: check them, cancel in time, message the salon and leave a review",
      "Hallitse kauneusvarauksiasi VaraaAissa: tarkista, peru ajoissa, viestitä salongille ja arvostele"
    ),
    tagline: l3(
      "Ba video ngắn cho mọi việc sau khi đặt lịch: xem lịch, huỷ lịch, hỏi salon và chia sẻ cảm nhận.",
      "Three short videos for everything after you book: check, cancel, ask the salon and share how it went.",
      "Kolme lyhyttä videota kaikkeen varauksen jälkeen: tarkista, peru, kysy salongilta ja kerro kokemuksesi."
    ),
    level: l3("Cho khách hàng đã đặt lịch", "For customers who have booked", "Asiakkaille, jotka ovat varanneet"),
    outcomes: [
      l3(
        "Mở “Lịch hẹn của tôi” và đọc nhanh salon, dịch vụ, giờ hẹn, số tiền và trạng thái.",
        "Open “My bookings” and read the salon, service, time, amount and status at a glance.",
        "Avaat ”Varaukseni” ja näet yhdellä silmäyksellä salongin, palvelun, ajan, summan ja tilan."
      ),
      l3(
        "Xem nhân viên, địa chỉ và số điện thoại salon trong thông tin đặt chỗ.",
        "Find the staff member, address and the salon's phone number in the booking details.",
        "Löydät varauksen tiedoista tekijän, osoitteen ja salongin puhelinnumeron."
      ),
      l3(
        "Tự huỷ lịch hẹn trong thời hạn salon cho phép, sau khi đọc chính sách huỷ.",
        "Cancel a booking yourself within the time the salon allows, after reading its policy.",
        "Perut varauksen itse salongin sallimassa ajassa luettuasi peruutusehdot."
      ),
      l3(
        "Biết phải làm gì khi đã quá hạn tự huỷ hoặc cần salon giúp dời lịch.",
        "Know what to do when it is too late to cancel online or you need the salon to move it.",
        "Tiedät, mitä tehdä, kun itse perumisen aika on ohi tai tarvitset salongin apua ajan siirtoon."
      ),
      l3(
        "Chat với salon ngay trên trang, gửi kèm ảnh mẫu và xem lại mọi tin nhắn trong Hộp thư.",
        "Chat with the salon on its page, attach a photo and find every message again in your inbox.",
        "Viestität salongille sen sivulla, liität mallikuvan ja löydät kaikki viestit myöhemmin."
      ),
      l3(
        "Chấm sao và viết đánh giá từ email mời hoặc từ lịch hẹn đã hoàn thành.",
        "Rate and review your visit from the invitation email or from a completed booking.",
        "Annat tähdet ja kirjoitat arvostelun kutsusähköpostista tai valmiista varauksesta."
      ),
    ],
    intro: [
      l3(
        "Đặt lịch xong mới chỉ là bắt đầu. Có hôm bạn cần xem lại giờ hẹn, có hôm bận đột xuất phải huỷ, có lúc muốn hỏi salon trước khi đến, và sau buổi làm đẹp bạn muốn chia sẻ cảm nhận. Khóa học Quản lý lịch hẹn của Học viện VaraaAi hướng dẫn tất cả những việc đó qua ba video ngắn, miễn phí, xem ngay trên điện thoại mà không cần đăng nhập.",
        "Booking is only the beginning. Some days you need to check the time, some days something comes up and you have to cancel, sometimes you want to ask the salon a question first, and after your visit you want to share how it went. The Managing bookings course at VaraaAi Academy covers all of this in three short free videos you can watch on your phone without signing in.",
        "Varaus on vasta alku. Joskus haluat tarkistaa ajan, joskus tulee este ja varaus pitää perua, joskus haluat kysyä salongilta jotain etukäteen, ja käynnin jälkeen haluat kertoa kokemuksestasi. VaraaAi-akatemian Varausten hallinta -kurssi käy kaiken tämän läpi kolmessa lyhyessä ilmaisessa videossa, jotka voit katsoa puhelimella ilman kirjautumista."
      ),
      l3(
        "Bài đầu tiên mở “Lịch hẹn của tôi”, nơi mỗi lịch hẹn ghi salon, dịch vụ, ngày giờ, số tiền và trạng thái như “Đã xác nhận”. Bấm “Xem thông tin đặt chỗ”, bạn thấy nhân viên làm cho mình, giờ hẹn, địa chỉ và số điện thoại salon. Khi cần huỷ, bạn bấm “Huỷ lịch hẹn”, đọc chính sách huỷ của salon, ví dụ được tự huỷ đến 24 giờ trước giờ hẹn, rồi bấm “Xác nhận hủy”. Lịch chuyển sang “Đã huỷ” và salon có thể nhận khách khác vào giờ đó. Nếu đã quá hạn tự huỷ, video nhắc bạn liên hệ trực tiếp với salon.",
        "The first lesson opens “My bookings”, where each booking shows the salon, service, date and time, amount and a status such as “Confirmed”. Press “View booking details” to see who will do your treatment, the time, the address and the salon's phone number. To cancel, press “Cancel booking”, read the salon's cancellation policy, for example that you can cancel yourself up to 24 hours before, and press “Confirm cancellation”. The booking turns to “Cancelled” and the salon can give that time to someone else. If it is too late to cancel online, the video reminds you to contact the salon directly.",
        "Ensimmäinen oppitunti avaa ”Varaukseni”-sivun, jossa jokaisessa varauksessa näkyvät salonki, palvelu, aika, summa ja tila, esimerkiksi ”Vahvistettu”. ”Näytä varauksen tiedot” kertoo, kuka hoidon tekee, sekä ajan, osoitteen ja salongin puhelinnumeron. Peruaksesi painat ”Peru varaus”, luet salongin peruutusehdot, esimerkiksi että voit perua itse 24 tuntia ennen, ja vahvistat. Varauksen tilaksi tulee ”Peruttu”, ja salonki voi antaa ajan toiselle asiakkaalle. Jos itse perumisen aika on jo ohi, video muistuttaa ottamaan yhteyttä suoraan salonkiin."
      ),
      l3(
        "Bài thứ hai là chat với salon. Nút “Chat với Salon” nằm ngay cạnh nút “Đặt lịch” trên trang của mỗi salon. Bạn có thể hỏi giá, hỏi mẫu hay hỏi thời gian làm, và gửi kèm ảnh mẫu mình thích để salon tư vấn và báo giá chính xác hơn. Câu trả lời hiện ngay trong khung chat, và mọi cuộc trò chuyện được giữ trong Hộp thư của tài khoản để bạn xem lại khi cần.",
        "The second lesson is chatting with the salon. The “Chat with the salon” button sits right next to “Book” on every salon's page. You can ask about prices, styles or how long a treatment takes, and attach a photo of the look you like so the salon can advise you and quote more accurately. The reply appears in the same chat window, and every conversation is kept in your account's inbox so you can read it again later.",
        "Toinen oppitunti käsittelee viestittelyä salongin kanssa. ”Chat salongin kanssa” -painike on jokaisen salongin sivulla Varaa-painikkeen vieressä. Voit kysyä hinnoista, malleista tai hoidon kestosta ja liittää kuvan haluamastasi tyylistä, jotta salonki voi neuvoa ja hinnoitella tarkemmin. Vastaus näkyy samassa ikkunassa, ja kaikki keskustelut säilyvät tilisi viesteissä, joten voit lukea ne myöhemmin uudelleen."
      ),
      l3(
        "Bài thứ ba chỉ cách viết đánh giá sau khi làm đẹp. Bạn bấm “Đánh giá dịch vụ” trong email mời đánh giá, hoặc vào “Lịch hẹn của tôi”, tìm lịch đã “Hoàn thành” và bấm “Đánh giá”. Chọn từ 1 đến 5 sao cho chất lượng dịch vụ, viết vài câu về trải nghiệm rồi bấm “Gửi đánh giá”. Chỉ khách đã đặt lịch mới viết được đánh giá, và salon xem trước khi đăng lên trang của họ, nên đánh giá trên VaraaAi đến từ người đã thật sự làm dịch vụ. Vài dòng chia sẻ của bạn giúp người khác chọn salon và giúp salon biết mình cần làm tốt hơn ở đâu.",
        "The third lesson shows how to leave a review after your visit. Press “Review the service” in the invitation email, or open “My bookings”, find the completed booking and press “Review”. Choose 1 to 5 stars for service quality, write a few words about your experience and press “Submit review”. Only customers who booked can write a review, and the salon reads it before publishing it on its page, so reviews on VaraaAi come from people who really had the treatment. A few honest lines help others choose a salon and show the salon where it can do better.",
        "Kolmas oppitunti näyttää, miten arvostelu kirjoitetaan käynnin jälkeen. Paina kutsusähköpostin arvostelupainiketta tai avaa ”Varaukseni”, etsi valmis varaus ja paina ”Arvostele”. Valitse palvelun laadulle 1–5 tähteä, kirjoita muutama sana kokemuksestasi ja lähetä. Vain varanneet asiakkaat voivat arvostella, ja salonki lukee arvostelun ennen kuin julkaisee sen sivullaan, joten VaraaAin arvostelut tulevat ihmisiltä, jotka ovat oikeasti käyneet hoidossa. Muutama rehellinen lause auttaa muita valitsemaan salongin ja kertoo salongille, missä se voi parantaa."
      ),
      l3(
        "Mỗi bài là video quay trên trang thật, người hướng dẫn nói từng bước và đánh dấu chỗ cần bấm, kèm các bước bằng chữ và bài kiểm tra nhanh để nhận điểm, huy hiệu; tiến độ được lưu trong trình duyệt. Video thuyết minh bằng tiếng Việt và có bản thu tiếng Anh. Nếu chưa từng đặt lịch, bạn nên xem khóa Bắt đầu đặt lịch trước; sau khóa này, khóa Ưu đãi và thẻ chỉ cách tích vé, mời bạn bè và dùng thẻ quà tặng.",
        "Each lesson is a video filmed on the real site, with a guide talking through every step and highlighting what to press, plus written steps and a quick quiz for points and badges; your progress is saved in your browser. The videos are narrated in Vietnamese and also recorded in English. If you have never booked before, start with the Getting started course; after this one, Rewards and cards shows you how to collect stamps, invite friends and use gift cards.",
        "Jokainen oppitunti on video oikealla sivustolla: opastaja kertoo vaiheet ja korostaa painettavan kohdan, ja lisäksi on kirjalliset vaiheet ja pikavisa pisteineen ja merkkeineen; edistymisesi tallentuu selaimeen. Videot on äänitetty vietnamiksi ja englanniksi. Jos et ole vielä koskaan varannut, aloita Alkuun pääseminen -kurssista; tämän jälkeen Edut ja kortit -kurssi näyttää, miten keräät leimoja, kutsut ystäviä ja käytät lahjakortteja."
      ),
    ],
    forWho: [
      l3(
        "Khách đã đặt lịch và muốn xem lại hoặc tự huỷ lịch hẹn.",
        "Customers who have booked and want to check or cancel a booking themselves.",
        "Asiakkaat, jotka ovat varanneet ja haluavat tarkistaa tai perua varauksen itse."
      ),
      l3(
        "Người muốn hỏi salon về giá, mẫu hay thời gian trước khi đến.",
        "Anyone who wants to ask a salon about prices, styles or timing before the visit.",
        "Kaikki, jotka haluavat kysyä salongilta hinnoista, malleista tai ajoista ennen käyntiä."
      ),
      l3(
        "Khách muốn chia sẻ cảm nhận để giúp người khác chọn salon.",
        "Customers who want to share their experience and help others choose a salon.",
        "Asiakkaat, jotka haluavat kertoa kokemuksestaan ja auttaa muita valitsemaan salongin."
      ),
      l3(
        "Người Việt ở Phần Lan, châu Âu muốn được hướng dẫn bằng tiếng Việt.",
        "Vietnamese speakers in Finland and Europe who want guidance in their language.",
        "Suomessa ja Euroopassa asuvat vietnaminkieliset, jotka haluavat ohjeet omalla kielellään."
      ),
    ],
    faq: [
      {
        q: l3("Làm sao huỷ lịch hẹn làm nail đã đặt online?", "How do I cancel a nail appointment I booked online?", "Miten perun verkossa varaamani kynsihoidon?"),
        a: l3(
          "Đăng nhập, bấm vào tên bạn ở góc trên và chọn “Lịch hẹn của tôi”, mở lịch hẹn rồi bấm “Huỷ lịch hẹn”. Màn hình hiện chính sách huỷ của salon; đọc xong, bấm “Xác nhận hủy” và lịch chuyển sang “Đã huỷ”. Bạn tự huỷ được khi còn trong thời hạn salon cho phép.",
          "Sign in, tap your name at the top and choose “My bookings”, open the booking and press “Cancel booking”. The salon's cancellation policy appears; once you have read it, press “Confirm cancellation” and the booking turns to “Cancelled”. You can cancel yourself as long as you are within the time the salon allows.",
          "Kirjaudu, napauta nimeäsi ylhäällä ja valitse ”Varaukseni”, avaa varaus ja paina ”Peru varaus”. Näkyviin tulevat salongin peruutusehdot; kun olet lukenut ne, vahvista peruutus, ja varauksen tilaksi tulee ”Peruttu”. Voit perua itse niin kauan kuin olet salongin sallimassa ajassa."
        ),
      },
      {
        q: l3("Quá hạn tự huỷ lịch thì phải làm sao?", "What if it is too late to cancel online?", "Entä jos itse perumisen aika on jo ohi?"),
        a: l3(
          "Khi đã quá thời hạn tự huỷ, hãy liên hệ trực tiếp với salon qua số điện thoại trong thông tin đặt chỗ hoặc bằng nút “Chat với Salon”. Salon có thể huỷ hoặc dời lịch giúp bạn. Báo càng sớm càng tốt cũng là cách lịch sự để salon kịp nhận khách khác vào giờ đó.",
          "When the online cancellation window has passed, contact the salon directly using the phone number in the booking details or the “Chat with the salon” button. The salon can cancel or move the booking for you. Letting them know as early as possible is also the polite way, so they can offer the time to someone else.",
          "Kun itse perumisen aika on ohi, ota yhteyttä suoraan salonkiin varauksen tiedoissa olevaan puhelinnumeroon tai chat-painikkeella. Salonki voi perua tai siirtää varauksen puolestasi. Ilmoita mahdollisimman aikaisin, niin salonki ehtii tarjota ajan toiselle asiakkaalle."
        ),
      },
      {
        q: l3("Gửi ảnh mẫu cho salon qua chat được không?", "Can I send the salon a photo in the chat?", "Voinko lähettää salongille kuvan chatissa?"),
        a: l3(
          "Được. Trong khung chat, nút đính kèm ảnh nằm bên trái ô nhập tin nhắn. Gửi ảnh mẫu móng, mi hay kiểu tóc bạn thích giúp salon tư vấn và báo giá chính xác hơn. Mọi tin nhắn được lưu trong Hộp thư: bấm vào tên bạn ở góc trên và chọn “Hộp thư” để xem lại.",
          "Yes. In the chat window, the attach-photo button is to the left of the message box. Sending a photo of the nails, lashes or hairstyle you like helps the salon advise you and quote more accurately. All messages are kept in your inbox: tap your name at the top and choose “Inbox” to read them again.",
          "Kyllä. Chat-ikkunassa kuvan liittämispainike on viestikentän vasemmalla puolella. Kuva haluamistasi kynsistä, ripsistä tai kampauksesta auttaa salonkia neuvomaan ja hinnoittelemaan tarkemmin. Kaikki viestit säilyvät tililläsi: napauta nimeäsi ylhäällä ja valitse ”Viestit”, niin näet ne uudelleen."
        ),
      },
      {
        q: l3("Ai được viết đánh giá salon trên VaraaAi?", "Who can review a salon on VaraaAi?", "Kuka voi arvostella salongin VaraaAissa?"),
        a: l3(
          "Chỉ khách đã đặt lịch ở salon đó mới viết được đánh giá, từ email mời đánh giá hoặc từ lịch hẹn đã hoàn thành trong “Lịch hẹn của tôi”. Salon xem đánh giá trước khi đăng lên trang của họ. Nhờ vậy, đánh giá trên VaraaAi đến từ những người đã thật sự làm dịch vụ.",
          "Only customers who booked at that salon can write a review, from the invitation email or from a completed booking in “My bookings”. The salon reads the review before publishing it on its page. That way, reviews on VaraaAi come from people who really had the treatment.",
          "Vain salonkiin varanneet asiakkaat voivat kirjoittaa arvostelun, joko kutsusähköpostista tai valmiista varauksesta ”Varaukseni”-sivulla. Salonki lukee arvostelun ennen kuin julkaisee sen sivullaan. Näin VaraaAin arvostelut tulevat ihmisiltä, jotka ovat oikeasti käyneet hoidossa."
        ),
      },
      {
        q: l3("Học các video này có mất phí không?", "Do the videos cost anything?", "Maksavatko videot jotain?"),
        a: l3(
          "Không. Mọi video trong Học viện VaraaAi đều miễn phí và không cần đăng nhập để xem. Video thuyết minh tiếng Việt và có bản thu tiếng Anh; trang học có chữ tiếng Việt, tiếng Anh và tiếng Phần Lan. Tiến độ, điểm và huy hiệu được lưu trong trình duyệt bạn đang dùng.",
          "No. Every video in VaraaAi Academy is free and needs no sign-in. The videos are narrated in Vietnamese and also recorded in English, and the lesson pages are in Vietnamese, English and Finnish. Your progress, points and badges are saved in the browser you are using.",
          "Eivät. Kaikki VaraaAi-akatemian videot ovat ilmaisia eivätkä vaadi kirjautumista. Videot on äänitetty vietnamiksi ja englanniksi, ja oppituntisivut ovat vietnamiksi, englanniksi ja suomeksi. Edistyminen, pisteet ja merkit tallentuvat käyttämääsi selaimeen."
        ),
      },
    ],
    keywords: [
      "cách huỷ lịch hẹn online",
      "huỷ lịch làm nail",
      "xem lịch hẹn làm đẹp",
      "nhắn tin cho tiệm nail",
      "viết đánh giá salon",
      "đánh giá tiệm nail",
      "chính sách huỷ lịch salon",
      "quản lý lịch hẹn làm đẹp",
    ],
  },
  /* ================= customers: rewards ================= */
  {
    id: "c-perks",
    slug: "the-thanh-vien-the-qua-tang",
    metaTitle: l3(
      "Thẻ thành viên, thẻ quà tặng salon: tích vé, nhận ưu đãi",
      "Salon Member Cards and Gift Cards: Collect Stamps, Save",
      "Salongin jäsen- ja lahjakortit: kerää leimoja ja säästä"
    ),
    metaDescription: l3(
      "Video miễn phí: tích vé bằng thẻ thành viên QR, mời bạn bè để nhận thêm 2 vé, mua thẻ quà tặng của salon, theo dõi salon và xem hoá đơn trên điện thoại.",
      "Free videos: collect stamps on a QR member card, invite friends for 2 extra stamps, buy a salon gift card, follow salons and open your invoice on your phone.",
      "Ilmaiset videot: kerää leimoja QR-jäsenkorttiin, kutsu ystäviä ja saa 2 lisäleimaa, osta salongin lahjakortti, seuraa salonkeja ja avaa lasku puhelimella."
    ),
    headline: l3(
      "Thẻ thành viên và thẻ quà tặng: tích vé, mời bạn bè và nhận ưu đãi từ salon bạn yêu thích",
      "Member cards and gift cards: collect stamps, invite friends and get rewards from your favourite salon",
      "Jäsen- ja lahjakortit: kerää leimoja, kutsu ystäviä ja saa etuja lempisalongistasi"
    ),
    tagline: l3(
      "Bốn video ngắn: thẻ tích điểm QR, thẻ quà tặng, theo dõi salon và mua sản phẩm, hoá đơn bằng mã QR.",
      "Four short videos: the QR loyalty card, gift cards, following salons and their shop, and QR invoices.",
      "Neljä lyhyttä videota: QR-kanta-asiakaskortti, lahjakortit, salonkien seuraaminen ja kauppa sekä QR-laskut."
    ),
    level: l3("Cho khách hàng", "For customers", "Asiakkaille"),
    outcomes: [
      l3(
        "Mở thẻ tích điểm trong tài khoản và đưa mã QR để được cộng vé mỗi lần đến.",
        "Open your loyalty card in your account and show the QR code to get a stamp at every visit.",
        "Avaat kanta-asiakaskortin tililtäsi ja näytät QR-koodin, niin saat leiman joka käynnillä."
      ),
      l3(
        "Gửi link mời bạn bè và nhận thêm 2 vé khi họ đến salon lần đầu.",
        "Send friends your invite link and get 2 extra stamps when they visit for the first time.",
        "Lähetät ystäville kutsulinkin ja saat 2 lisäleimaa, kun he käyvät ensimmäistä kertaa."
      ),
      l3(
        "Theo dõi vòng tiến độ, biết khi nào đủ vé để nhận giảm giá và nhớ báo nhân viên.",
        "Follow your progress ring, know when the card is full and remember to tell the staff.",
        "Seuraat edistymistäsi, tiedät milloin kortti on täynnä ja muistat kertoa siitä henkilökunnalle."
      ),
      l3(
        "Mua thẻ quà tặng trên website salon, nhận mã qua email và tặng lại người thân.",
        "Buy a gift card on the salon's website, get the code by email and pass it on as a gift.",
        "Ostat lahjakortin salongin verkkosivuilta, saat koodin sähköpostiin ja annat sen lahjaksi."
      ),
      l3(
        "Theo dõi salon để thấy bài viết mới trong Bảng tin, đặt mua sản phẩm và nhận tại salon.",
        "Follow salons to see their new posts in your feed, and order products to collect at the salon.",
        "Seuraat salonkeja ja näet niiden julkaisut syötteessä sekä tilaat tuotteita noudettavaksi salongista."
      ),
      l3(
        "Quét mã QR tại quầy hoặc mở email để xem lại hoá đơn trên điện thoại.",
        "Scan the QR code at the counter or open the email to see your invoice on your phone.",
        "Skannaat QR-koodin kassalla tai avaat sähköpostin ja näet laskun puhelimellasi."
      ),
    ],
    intro: [
      l3(
        "Bạn hay làm móng, nối mi hay chăm sóc da ở một salon quen? Khóa học Ưu đãi và thẻ của Học viện VaraaAi giúp bạn dùng hết những ưu đãi salon dành cho khách quen: thẻ thành viên tích vé, phần thưởng khi giới thiệu bạn bè, thẻ quà tặng cho người thân, bảng tin của salon và hoá đơn ngay trên điện thoại. Khóa học gồm bốn video ngắn, miễn phí, xem trên điện thoại mà không cần đăng nhập.",
        "Do you go to the same salon for your nails, lashes or facials? The Rewards and cards course at VaraaAi Academy helps you make the most of what salons offer their regulars: a member card that collects stamps, a reward for recommending friends, gift cards for the people you love, the salon's news feed and your invoice right on your phone. The course is four short free videos you can watch on your phone without signing in.",
        "Käytkö kynsi-, ripsi- tai kasvohoidoissa aina samassa salongissa? VaraaAi-akatemian Edut ja kortit -kurssi auttaa hyödyntämään kaiken, mitä salongit tarjoavat kanta-asiakkailleen: leimoja keräävän jäsenkortin, palkinnon ystävien suosittelemisesta, lahjakortit läheisille, salongin uutissyötteen ja laskun suoraan puhelimeen. Kurssissa on neljä lyhyttä ilmaista videota, jotka voit katsoa puhelimella ilman kirjautumista."
      ),
      l3(
        "Bài đầu tiên là thẻ thành viên. Salon kích hoạt thẻ và gửi cho bạn qua email; trong tài khoản, bạn bấm vào tên mình ở góc trên và chọn “Thẻ tích điểm” để mở thẻ. Mỗi lần đến salon, bạn đưa mã QR trên thẻ cho nhân viên quét để được cộng 1 vé, và xem vòng tròn tiến độ cùng lịch sử vé bất cứ lúc nào. Đủ số vé salon đặt ra, bạn được giảm giá ở lần làm tiếp theo; nhớ báo với nhân viên khi đến.",
        "The first lesson is the member card. The salon activates your card and emails it to you; in your account, tap your name at the top and open your loyalty cards. At every visit you show the QR code on the card to the staff to get 1 stamp, and you can check your progress ring and stamp history at any time. When you reach the number of stamps the salon has set, you get a discount on your next visit; just remember to tell the staff.",
        "Ensimmäinen oppitunti käsittelee jäsenkorttia. Salonki aktivoi korttisi ja lähettää sen sähköpostiisi; tililläsi napautat nimeäsi ylhäällä ja avaat kanta-asiakaskortit. Jokaisella käynnillä näytät kortin QR-koodin henkilökunnalle ja saat yhden leiman, ja voit milloin tahansa katsoa edistymisesi ja leimahistoriasi. Kun salongin asettama leimamäärä täyttyy, saat alennuksen seuraavasta käynnistä; muista vain kertoa siitä henkilökunnalle."
      ),
      l3(
        "Mỗi thẻ có phần “Mời bạn bè” với link mời riêng của bạn. Bạn sao chép link và gửi cho bạn bè; khi người bạn đặt lịch qua link và đến salon lần đầu, bạn được cộng thêm 2 vé. Vé thưởng chỉ được cộng khi bạn bè thật sự đến salon, không phải lúc bạn gửi link, nên chương trình công bằng cho cả bạn lẫn salon.",
        "Every card has an “Invite friends” section with your own invite link. Copy the link and send it to friends; when a friend books through it and visits the salon for the first time, you get 2 extra stamps. The bonus is only added when the friend actually comes to the salon, not when you send the link, so it is fair to you and to the salon.",
        "Jokaisessa kortissa on ”Kutsu ystäviä” -osio ja oma kutsulinkkisi. Kopioi linkki ja lähetä se ystäville; kun ystävä varaa sen kautta ja käy salongissa ensimmäistä kertaa, saat 2 lisäleimaa. Lisäleimat tulevat vasta, kun ystävä todella käy salongissa, eivät linkin lähettämisestä, joten järjestely on reilu sekä sinulle että salongille."
      ),
      l3(
        "Bài thẻ quà tặng chỉ cách mua thẻ trên website của salon, nơi mỗi thẻ ghi rõ dịch vụ, mức giảm giá, thời hạn và giá bán. Bạn bấm “Mua thẻ này”, điền họ tên và email, rồi nhận mã thẻ cùng mã QR qua email; thẻ được kích hoạt sau khi salon xác nhận bạn đã thanh toán. Muốn tặng ai, bạn chỉ cần chuyển tiếp email đó. Khi đến salon, bạn đưa mã QR hoặc đọc mã thẻ, nhân viên kiểm tra và trừ một lần dùng. Mã thẻ quà tặng cũng nhập được vào ô “Mã giảm giá” khi đặt lịch online.",
        "The gift card lesson shows how to buy a card on the salon's website, where each card lists the service, the discount, how long it is valid and the price. Press “Buy this card”, fill in your name and email, and the card code and a QR code arrive by email; the card is activated once the salon confirms your payment. To give it to someone, simply forward that email. At the salon, show the QR code or read out the card code, and the staff check it and count one use. A gift-card code also works in the “Discount code” box when you book online.",
        "Lahjakorttioppitunti näyttää, miten kortti ostetaan salongin verkkosivuilta, joilla jokaisessa kortissa näkyvät palvelu, alennus, voimassaolo ja hinta. Valitse kortti, täytä nimi ja sähköposti, niin kortin koodi ja QR-koodi tulevat sähköpostiisi; kortti aktivoituu, kun salonki vahvistaa maksun. Jos haluat antaa sen lahjaksi, välitä viesti eteenpäin. Salongissa näytät QR-koodin tai kerrot koodin, ja henkilökunta tarkistaa sen ja kirjaa yhden käyttökerran. Lahjakorttikoodin voi syöttää myös alennuskoodikenttään verkkovarauksen yhteydessä."
      ),
      l3(
        "Hai bài cuối giúp bạn gần salon hơn. Bấm “Theo dõi” trên trang salon để bài viết mới, ưu đãi và mẫu mới hiện trong Bảng tin của bạn; trong mục “Sản phẩm”, bạn đặt mua sản phẩm rồi nhận tại salon, chọn thanh toán tại salon, chuyển khoản hoặc trao đổi với salon. Khi thanh toán ở quầy, bạn nhờ nhân viên bấm “Hiện mã QR” và quét bằng camera để mở hoá đơn ngay trong trình duyệt, có tên salon, số hoá đơn, dịch vụ, thuế, tổng tiền và cách thanh toán. Không ở quầy thì nhờ salon gửi hoá đơn qua email.",
        "The last two lessons bring you closer to the salon. Press “Follow” on the salon's page so new posts, offers and new styles show up in your feed; under “Products” you can order products to collect at the salon, paying at the salon, by bank transfer or as agreed with the salon. When you pay at the counter, ask the staff to show the QR code and scan it with your camera to open the invoice in your browser, with the salon's name, invoice number, services, tax, total and payment method. Not at the counter? Ask the salon to email the invoice.",
        "Kaksi viimeistä oppituntia tuovat sinut lähemmäs salonkia. Paina salongin sivulla ”Seuraa”, niin uudet julkaisut, tarjoukset ja mallit näkyvät syötteessäsi; ”Tuotteet”-kohdasta voit tilata tuotteita noudettavaksi salongista ja maksaa salongissa, tilisiirrolla tai salongin kanssa sopien. Kun maksat kassalla, pyydä henkilökuntaa näyttämään QR-koodi ja skannaa se kameralla, niin lasku aukeaa selaimeen salongin nimen, laskun numeron, palvelujen, veron, summan ja maksutavan kera. Etkö ole kassalla? Pyydä lasku sähköpostiin."
      ),
      l3(
        "Như mọi khóa của Học viện, mỗi bài có video quay trên trang thật với người hướng dẫn nói từng bước, các bước bằng chữ và bài kiểm tra nhanh để nhận điểm, huy hiệu. Video thuyết minh tiếng Việt và có bản thu tiếng Anh. Học xong mọi bài dành cho khách hàng, bạn tải được chứng nhận hoàn thành “Sử dụng VaraaAi dành cho khách hàng” mang tên mình.",
        "Like every Academy course, each lesson has a video filmed on the real site with a guide talking through each step, written steps and a quick quiz for points and badges. The videos are narrated in Vietnamese and also recorded in English. Finish every lesson for customers to download the certificate of completion “Using VaraaAi as a customer” with your name on it.",
        "Kuten kaikilla akatemian kursseilla, jokaisessa oppitunnissa on video oikealla sivustolla, jossa opastaja kertoo vaiheet, sekä kirjalliset vaiheet ja pikavisa pisteineen ja merkkeineen. Videot on äänitetty vietnamiksi ja englanniksi. Kun suoritat kaikki asiakkaiden oppitunnit, voit ladata nimelläsi varustetun todistuksen ”VaraaAin käyttö asiakkaana”."
      ),
    ],
    forWho: [
      l3(
        "Khách quen của một salon muốn tích vé và nhận giảm giá.",
        "Regulars at a salon who want to collect stamps and get discounts.",
        "Salongin kanta-asiakkaat, jotka haluavat kerätä leimoja ja saada alennuksia."
      ),
      l3(
        "Người muốn giới thiệu salon mình thích cho bạn bè và được thưởng.",
        "Anyone who wants to recommend a favourite salon to friends and be rewarded.",
        "Kaikki, jotka haluavat suositella lempisalonkiaan ystäville ja saada siitä palkinnon."
      ),
      l3(
        "Người đang tìm quà sinh nhật, quà lễ là một buổi làm đẹp cho người thân.",
        "Anyone looking for a birthday or holiday gift of a beauty treatment for someone they love.",
        "Kaikki, jotka etsivät läheiselle syntymäpäivä- tai juhlalahjaksi kauneushoitoa."
      ),
      l3(
        "Người Việt ở Phần Lan, châu Âu muốn được hướng dẫn bằng tiếng Việt.",
        "Vietnamese speakers in Finland and Europe who want guidance in their language.",
        "Suomessa ja Euroopassa asuvat vietnaminkieliset, jotka haluavat ohjeet omalla kielellään."
      ),
    ],
    faq: [
      {
        q: l3("Thẻ thành viên salon trên VaraaAi hoạt động thế nào?", "How does a salon member card on VaraaAi work?", "Miten salongin jäsenkortti toimii VaraaAissa?"),
        a: l3(
          "Salon kích hoạt thẻ cho bạn và gửi qua email. Mỗi lần đến, bạn đưa mã QR trên thẻ cho nhân viên quét để được cộng 1 vé. Đủ số vé salon đặt ra, bạn được giảm giá ở lần làm tiếp theo. Để mở thẻ, bấm vào tên mình ở góc trên và chọn “Thẻ tích điểm”.",
          "The salon activates the card for you and emails it to you. At each visit you show the QR code on the card to the staff and get 1 stamp. When you reach the number of stamps the salon has set, you get a discount on your next visit. To open the card, tap your name at the top and choose your loyalty cards.",
          "Salonki aktivoi kortin ja lähettää sen sähköpostiisi. Jokaisella käynnillä näytät kortin QR-koodin henkilökunnalle ja saat yhden leiman. Kun salongin asettama leimamäärä täyttyy, saat alennuksen seuraavasta käynnistä. Kortin löydät napauttamalla nimeäsi ylhäällä ja valitsemalla kanta-asiakaskortit."
        ),
      },
      {
        q: l3("Mời bạn bè đến salon thì được thưởng gì?", "What do I get for inviting friends?", "Mitä saan ystävien kutsumisesta?"),
        a: l3(
          "Mỗi thẻ có link mời riêng trong phần “Mời bạn bè”. Khi người bạn đặt lịch qua link và đến salon lần đầu, bạn được cộng thêm 2 vé một cách tự động. Vé thưởng chỉ được cộng khi bạn bè thật sự đến salon, không phải lúc bạn gửi link.",
          "Every card has its own invite link under “Invite friends”. When a friend books through the link and visits the salon for the first time, you automatically get 2 extra stamps. The bonus is only added when the friend actually comes to the salon, not when you send the link.",
          "Jokaisessa kortissa on oma kutsulinkki ”Kutsu ystäviä” -kohdassa. Kun ystävä varaa linkin kautta ja käy salongissa ensimmäistä kertaa, saat automaattisesti 2 lisäleimaa. Lisäleimat tulevat vasta, kun ystävä todella käy salongissa, eivät linkin lähettämisestä."
        ),
      },
      {
        q: l3("Mua thẻ quà tặng làm đẹp cho người thân ở đâu?", "Where can I buy a beauty gift card for someone?", "Mistä ostan kauneushoitolan lahjakortin läheiselle?"),
        a: l3(
          "Trên website của salon, ở phần “Thẻ quà tặng”. Chọn thẻ, bấm “Mua thẻ này” và điền họ tên, email. Mã thẻ và mã QR đến email ngay, nhưng chỉ dùng được sau khi salon xác nhận thanh toán. Để tặng, bạn chuyển tiếp email cho người nhận. Nhớ xem kỹ thời hạn và số lần dùng trước khi mua.",
          "On the salon's website, in its gift card section. Choose a card, press “Buy this card” and fill in your name and email. The card code and QR code arrive by email straight away, but the card works only after the salon confirms the payment. To give it, forward the email. Check the validity and number of uses before you buy.",
          "Salongin verkkosivuilta, lahjakorttiosiosta. Valitse kortti, paina ostopainiketta ja täytä nimi ja sähköposti. Koodi ja QR-koodi tulevat heti sähköpostiin, mutta kortti toimii vasta, kun salonki on vahvistanut maksun. Lahjaksi antaessasi välitä viesti eteenpäin. Tarkista voimassaolo ja käyttökerrat ennen ostoa."
        ),
      },
      {
        q: l3("Làm sao xem lại hoá đơn sau khi làm đẹp?", "How do I get my invoice after a treatment?", "Miten saan laskun hoidon jälkeen?"),
        a: l3(
          "Khi thanh toán ở quầy, nhờ nhân viên bấm “Hiện mã QR” rồi quét bằng camera điện thoại; hoá đơn mở ngay trong trình duyệt với tên salon, số hoá đơn, dịch vụ, thuế, tổng tiền và cách thanh toán. Không ở quầy thì nhờ salon gửi hoá đơn qua email và bấm vào đường link trong email.",
          "When you pay at the counter, ask the staff to show the QR code and scan it with your phone's camera; the invoice opens in your browser with the salon's name, invoice number, services, tax, total and payment method. If you are not at the counter, ask the salon to email the invoice and tap the link in the email.",
          "Kun maksat kassalla, pyydä henkilökuntaa näyttämään QR-koodi ja skannaa se puhelimen kameralla; lasku aukeaa selaimeen salongin nimen, laskun numeron, palvelujen, veron, summan ja maksutavan kera. Jos et ole kassalla, pyydä lasku sähköpostiin ja napauta viestin linkkiä."
        ),
      },
      {
        q: l3("Học các video này có mất phí, có chứng nhận không?", "Are the videos free, and is there a certificate?", "Ovatko videot ilmaisia, ja saako todistuksen?"),
        a: l3(
          "Miễn phí và không cần đăng nhập để xem. Tiến độ được lưu trong trình duyệt; học xong mọi bài dành cho khách hàng, bạn điền tên và tải chứng nhận hoàn thành “Sử dụng VaraaAi dành cho khách hàng”. Đây là chứng nhận của Học viện, không phải bằng cấp chính thức.",
          "They are free and need no sign-in. Your progress is saved in your browser; when you finish every lesson for customers, you enter your name and download the certificate of completion “Using VaraaAi as a customer”. It comes from the Academy and is not an official qualification.",
          "Ne ovat ilmaisia eivätkä vaadi kirjautumista. Edistyminen tallentuu selaimeen; kun suoritat kaikki asiakkaiden oppitunnit, kirjoitat nimesi ja lataat todistuksen ”VaraaAin käyttö asiakkaana”. Todistus on akatemian oma, ei virallinen tutkinto."
        ),
      },
    ],
    keywords: [
      "thẻ thành viên tiệm nail",
      "thẻ tích điểm salon",
      "thẻ quà tặng làm đẹp",
      "voucher spa tặng người thân",
      "mời bạn bè nhận ưu đãi",
      "ưu đãi khách quen tiệm nail",
      "mua thẻ quà tặng làm nail",
      "xem hoá đơn bằng mã QR",
    ],
  },
];

export const courseSeoById = (id: string) => COURSE_SEO.find((c) => c.id === id) ?? null;
export const courseSeoBySlug = (slug: string) => COURSE_SEO.find((c) => c.slug === slug) ?? null;
