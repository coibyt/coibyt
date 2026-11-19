/** The Academy's craft-skills track ("Tôi học nghề"): hands-on lessons for
 * people who work in salons — hygiene and safety, nails, lashes, hair, spa.
 * A lesson with `video: null` is announced but not filmed yet.
 *
 * These are training aids, not a licence: every lesson page carries the
 * disclaimer from craft-strings.ts, and lessons that state a rule name their
 * official source. Rules differ by country — check the sources again before
 * changing a legal claim.
 *
 * The owner's direction (2026-11-16): theory in depth, the rules of the job
 * and shared experience, told like a mentor talking; pictures illustrate.
 * After the samples they asked for BOTH kinds for every nail and lash topic
 * (hygiene and safety: one video per topic is enough), with two
 * titles: `style: "theory"` (the mentor's talk) and `style: "practice"` (the
 * steps in pictures), theory first. A planned topic is one `soon(…)` entry
 * until its videos exist. `steps` hold a lesson's key points or steps (shown
 * as "Những điều cần nhớ").
 *
 * Videos are made with the pipeline kept outside this repo
 * (C:\Hiep\hoat-hinh-ai\projects\varaaai-nghe): generated photographs with
 * hand-placed markers, the teacher voice, and synthesised sound effects. */
import { l3, type Course, type Lesson, type LessonVideo } from "@/lib/academy/types";

const video = (slug: string, seconds: number, published: string): LessonVideo => ({
  src: `/academy/${slug}.mp4`,
  poster: `/academy/${slug}.jpg`,
  captions: `/academy/${slug}.vtt`,
  seconds,
  published,
});

/** A lesson that is planned but has no video yet. */
const soon = (slug: string, course: string, title: [string, string, string], summary: [string, string, string]): Lesson => ({
  slug,
  course,
  title: l3(...title),
  summary: l3(...summary),
  video: null,
});

const HELSINKI_HYGIENE = {
  label: "City of Helsinki — Requirements and monitoring of hygiene premises (5/2025)",
  url: "https://www.hel.fi/static/liitteet-2019/Kymp/asuminen-ja-ymparisto/ymparistoterveys/Hygiene-premises-instructions.pdf",
};
const EU_TPO = {
  label: "European Commission — TPO in nail products: questions and answers",
  url: "https://single-market-economy.ec.europa.eu/sectors/cosmetics/tpo-nail-products-questions-answers_en",
};

const ALL_COURSES: Course[] = [
  {
    id: "p-safety",
    audience: "pro",
    icon: "shield",
    title: l3("Vệ sinh & an toàn", "Hygiene & safety", "Hygienia ja turvallisuus"),
    body: l3(
      "Khử khuẩn, tiệt trùng, dị ứng và những quy tắc mọi người thợ phải biết.",
      "Disinfection, sterilisation, allergies and the rules every professional must know.",
      "Desinfiointi, sterilointi, allergiat ja säännöt, jotka jokaisen ammattilaisen on tunnettava."
    ),
  },
  {
    id: "p-nail",
    audience: "pro",
    icon: "sparkles",
    title: l3("Nghề Nail", "Nails", "Kynnet"),
    body: l3("Sơn gel, builder gel, đắp bột, dũa form và chăm sóc móng.", "Gel polish, builder gel, acrylic, shaping and nail care.", "Geelilakka, rakennegeeli, akryyli, muotoilu ja kynsienhoito."),
  },
  {
    id: "p-lash",
    audience: "pro",
    icon: "eye",
    title: l3("Nghề Mi", "Lashes", "Ripset"),
    body: l3("Classic, volume, hybrid, lash mapping, dặm và tháo mi.", "Classic, volume, hybrid, lash mapping, refills and removal.", "Klassiset, volyymi, hybridi, ripsikartoitus, huollot ja poisto."),
  },
  {
    id: "p-hair",
    audience: "pro",
    icon: "scissors",
    title: l3("Nghề Tóc", "Hair", "Hiukset"),
    body: l3("Cắt tóc nam, cắt tóc nữ, fade, tầng, mái và sấy tạo kiểu.", "Men's and women's cuts, fades, layers, fringes and blow-drying.", "Miesten ja naisten leikkaukset, fade, kerrokset, otsatukka ja föönaus."),
  },
  {
    id: "p-spa",
    audience: "pro",
    icon: "flower",
    title: l3("Spa & chăm sóc da", "Spa & skin care", "Spa ja ihonhoito"),
    body: l3("Soi da, chăm sóc da mặt, massage và waxing.", "Skin analysis, facials, massage and waxing.", "Ihoanalyysi, kasvohoidot, hieronta ja vahaus."),
  },
];

const ALL_LESSONS: Lesson[] = [
  /* ================= hygiene & safety ================= */
  {
    slug: "ve-sinh-dung-cu",
    course: "p-safety",
    title: l3("Xử lý dụng cụ sau mỗi khách: quy trình từng bước", "Tools after every customer: the routine, step by step", "Välineet jokaisen asiakkaan jälkeen: työvaiheet"),
    summary: l3(
      "Quy trình xử lý dụng cụ sau mỗi khách cho tiệm nail, mi, tóc và spa: làm sạch, khử khuẩn, tiệt trùng, cất giữ — và dụng cụ nào cần mức nào.",
      "What to do with your tools after every customer in a nail, lash, hair or spa business: clean, disinfect, sterilise, store — and which tool needs which level.",
      "Mitä välineille tehdään jokaisen asiakkaan jälkeen kynsi-, ripsi-, hius- ja spa-alalla: puhdistus, desinfiointi, sterilointi, säilytys — ja mikä väline vaatii minkä tason."
    ),
    video: video("ve-sinh-dung-cu", 240, "2026-11-16"),
    notice: l3(
      "Quy định khác nhau theo từng nước và thành phố. Bài này dạy cách làm tốt chung và lấy ví dụ từ hướng dẫn của thành phố Helsinki (Phần Lan). Hãy hỏi cơ quan y tế nơi bạn làm việc để biết yêu cầu chính xác.",
      "Rules differ by country and city. This lesson teaches general good practice and takes its examples from the City of Helsinki's guidance (Finland). Ask the health authority where you work for the exact requirements.",
      "Määräykset vaihtelevat maittain ja kunnittain. Tunti opettaa yleisiä hyviä käytäntöjä, ja esimerkit ovat Helsingin kaupungin ohjeesta. Tarkista tarkat vaatimukset oman kuntasi terveydensuojeluviranomaiselta."
    ),
    sources: [HELSINKI_HYGIENE],
    related: ["dang-ky-salon", "nhan-vien", "kiem-tra-salon"],
    steps: [
      l3(
        "Rửa tay bằng xà phòng, lau khô và sát khuẩn tay trước mỗi khách và trước khi đeo găng. Thay găng thường xuyên; đang đeo găng thì không chạm vào điện thoại, tay nắm cửa hay đèn.",
        "Wash your hands with soap, dry them and disinfect them before every customer and before putting on gloves. Change gloves often; don't touch your phone, door handles or lamps with gloves on.",
        "Pese kädet saippualla, kuivaa ja desinfioi ne ennen jokaista asiakasta ja ennen käsineiden pukemista. Vaihda käsineet usein; älä koske käsineillä puhelimeen, ovenkahvoihin tai lamppuihin."
      ),
      l3(
        "Khách vừa đứng dậy: bỏ đồ dùng một lần (dũa giấy, que gỗ, cọ mi) vào thùng rác; để dụng cụ kim loại vào khay riêng cho đồ bẩn, không lẫn với đồ sạch.",
        "As soon as the customer leaves: single-use items (paper files, wooden sticks, mascara wands) go in the bin; metal tools go in a separate tray for dirty items, never mixed with clean ones.",
        "Heti asiakkaan lähdettyä: kertakäyttötuotteet (paperiviilat, puutikut, ripsiharjat) roskiin; metallivälineet erilliseen likaisten välineiden astiaan, ei puhtaiden joukkoon."
      ),
      l3(
        "Bước 1 — làm sạch: đeo găng, mở dụng cụ hết cỡ, chà bằng bàn chải và xà phòng dưới vòi nước, kỹ ở các khớp và khe rãnh. Rửa ngay, đừng để chất bẩn khô lại. Tráng nước sạch và lau thật khô.",
        "Step 1 — clean: wearing gloves, open the tool fully and scrub it with a brush and soap under running water, especially joints and grooves. Do it straight away, before dirt dries. Rinse and dry thoroughly.",
        "Vaihe 1 — puhdistus: avaa väline käsineet kädessä kokonaan ja harjaa se saippualla juoksevan veden alla, erityisesti nivelet ja urat. Tee se heti, ennen kuin lika kuivuu. Huuhtele ja kuivaa huolellisesti."
      ),
      l3(
        "Bước 2 — khử khuẩn: ngâm dụng cụ ngập hoàn toàn trong dung dịch khử khuẩn dành cho dụng cụ, pha đúng nồng độ và ngâm đủ thời gian ghi trên nhãn. Thay dung dịch theo hướng dẫn của hãng.",
        "Step 2 — disinfect: fully submerge the tools in an instrument disinfectant, mixed at the right strength and left for the full time on the label. Change the solution as the manufacturer says.",
        "Vaihe 2 — desinfiointi: upota välineet kokonaan välineille tarkoitettuun desinfiointiliuokseen, joka on laimennettu oikein, ja pidä ne siinä etiketin mukainen aika. Vaihda liuos valmistajan ohjeen mukaan."
      ),
      l3(
        "Bước 3 — tiệt trùng (cho dụng cụ có thể đâm, cắt vào da hoặc chạm da bị trầy: kềm cắt da, dao, kim, cây nặn mụn, dụng cụ móng chân): cho dụng cụ sạch và khô vào túi tiệt trùng, dán kín, chạy nồi hấp hoặc tủ sấy khô đúng chương trình. Xem vạch chỉ thị trên túi.",
        "Step 3 — sterilise (tools that can pierce or cut the skin or touch broken skin: cuticle nippers, blades, needles, extractors, pedicure tools): put clean, dry tools in a sterilisation pouch, seal it and run the autoclave or hot-air steriliser on the right programme. Check the indicator on the pouch.",
        "Vaihe 3 — sterilointi (ihon läpäisevät tai rikkinäistä ihoa koskettavat välineet: kynsinauhapihdit, terät, neulat, ihonpuhdistusvälineet, jalkahoitovälineet): laita puhtaat ja kuivat välineet sterilointipussiin, sulje pussi ja aja autoklaavi tai kuumailmasterilointi oikealla ohjelmalla. Tarkista pussin indikaattori."
      ),
      l3(
        "Ghi ngày lên túi, cất ở nơi khô, sạch, kín bụi, tách riêng với đồ chưa tiệt trùng. Chỉ mở túi trước mặt khách khi bắt đầu làm.",
        "Date the pouch and store it somewhere dry, clean and dust-free, apart from unsterilised items. Open it in front of the customer when you start.",
        "Merkitse pussiin päivämäärä ja säilytä se kuivassa, puhtaassa ja pölyttömässä paikassa erillään steriloimattomista. Avaa pussi asiakkaan nähden työn alkaessa."
      ),
      l3(
        "Sau mỗi khách: lau sạch mặt bàn, gối kê tay, giường, ghế và khử khuẩn những bề mặt có chạm vào da khách. Thay khăn và giấy lót mới cho từng người.",
        "After every customer: wipe the table, hand rest, bed and chair, and disinfect the surfaces that touched the customer's skin. Fresh towels and paper for each person.",
        "Jokaisen asiakkaan jälkeen: pyyhi pöytä, käsituki, hoitopöytä ja tuoli ja desinfioi asiakkaan ihoa koskettaneet pinnat. Jokaiselle asiakkaalle puhtaat pyyhkeet ja suojapaperi."
      ),
      l3(
        "Nếu lỡ làm khách chảy máu: dừng lại, đeo găng mới, lau sạch, sát khuẩn và băng vết thương. Bề mặt dính máu luôn phải khử khuẩn; dụng cụ đó đưa đi xử lý ngay.",
        "If you draw blood: stop, put on fresh gloves, clean, disinfect and dress the wound. Surfaces with blood on them are always disinfected; that tool goes straight to reprocessing.",
        "Jos asiakkaalta tulee verta: lopeta, vaihda puhtaat käsineet, puhdista, desinfioi ja peitä haava. Veriset pinnat desinfioidaan aina; kyseinen väline viedään heti huoltoon."
      ),
    ],
    tips: [
      l3(
        "Dung dịch ngâm được quảng cáo là “tiệt trùng” không thay thế được nồi hấp hay tủ sấy khô.",
        "A soaking solution sold as “sterilising” does not replace an autoclave or a hot-air steriliser.",
        "Steriloivaksi mainostettu liotusliuos ei korvaa autoklaavia tai kuumailmasterilointia."
      ),
      l3(
        "Tiệm tóc: giấy quấn cổ dùng một lần dưới áo choàng. Móng chân: lót túi dùng một lần trong bồn ngâm và để dụng cụ móng chân tách riêng. Làm móng bột: cần máy hút bụi tại bàn.",
        "Hair: a disposable neck strip under the cape. Pedicure: a disposable liner in the foot basin, and pedicure tools stored separately. Acrylic nails: local dust extraction at the table.",
        "Hiukset: kertakäyttöinen niskapaperi kampausviitan alle. Jalkahoito: kertakäyttöinen suojapussi jalkakylpyaltaaseen ja jalkahoitovälineet erilleen. Akryylikynnet: kohdepoisto työpisteessä."
      ),
      l3(
        "Ở Phần Lan, phần lớn tiệm làm đẹp có chăm sóc da phải thông báo với cơ quan bảo vệ sức khỏe của thành phố ít nhất 30 ngày trước khi mở cửa và có kế hoạch tự kiểm soát vệ sinh.",
        "In Finland most beauty premises offering skin treatments must notify the municipal health protection authority at least 30 days before opening and keep an in-house control plan.",
        "Suomessa useimpien ihonkäsittelyä tarjoavien kauneushoitoloiden on tehtävä ilmoitus kunnan terveydensuojeluviranomaiselle vähintään 30 päivää ennen aloittamista ja laadittava omavalvontasuunnitelma."
      ),
    ],
    quiz: [
      {
        q: l3("Với dụng cụ vừa dùng xong, bước nào phải làm trước tiên?", "What must come first for a tool you have just used?", "Mikä tehdään ensin juuri käytetylle välineelle?"),
        options: [
          l3("Chà rửa bằng bàn chải và xà phòng", "Scrub it with a brush and soap", "Harjataan saippualla"),
          l3("Ngâm ngay vào dung dịch khử khuẩn", "Drop it straight into disinfectant", "Upotetaan heti desinfiointiliuokseen"),
          l3("Cho thẳng vào nồi hấp", "Put it straight in the autoclave", "Laitetaan suoraan autoklaaviin"),
        ],
        answer: 0,
        why: l3(
          "Chất bẩn còn bám sẽ che chắn cho vi khuẩn, làm khử khuẩn và tiệt trùng mất tác dụng.",
          "Dirt left on a tool shields microbes, so disinfection and sterilisation stop working.",
          "Lika suojaa mikrobeja, jolloin desinfiointi ja sterilointi eivät tehoa."
        ),
      },
      {
        q: l3("Kềm cắt da cần được xử lý đến mức nào?", "What level do cuticle nippers need?", "Minkä tason käsittelyn kynsinauhapihdit vaativat?"),
        options: [
          l3("Xịt cồn rồi lau", "A spray of alcohol and a wipe", "Alkoholisuihke ja pyyhkäisy"),
          l3("Làm sạch và khử khuẩn là đủ", "Cleaning and disinfecting is enough", "Puhdistus ja desinfiointi riittävät"),
          l3("Làm sạch rồi tiệt trùng", "Cleaning, then sterilising", "Puhdistus ja sen jälkeen sterilointi"),
        ],
        answer: 2,
        why: l3(
          "Dụng cụ có thể cắt vào da hoặc chạm da bị trầy phải được tiệt trùng.",
          "Tools that can cut the skin or touch broken skin must be sterilised.",
          "Ihoa rikkovat tai rikkinäistä ihoa koskettavat välineet on steriloitava."
        ),
      },
      {
        q: l3("Dũa giấy và que gỗ đã dùng cho một khách thì làm gì?", "What happens to a paper file and a wooden stick after one customer?", "Mitä tehdään paperiviilalle ja puutikulle yhden asiakkaan jälkeen?"),
        options: [
          l3("Xịt cồn rồi dùng tiếp", "Spray with alcohol and reuse", "Suihkutetaan alkoholilla ja käytetään uudelleen"),
          l3("Bỏ đi", "Throw them away", "Heitetään pois"),
          l3("Rửa nước rồi phơi khô", "Rinse and leave to dry", "Huuhdellaan ja kuivataan"),
        ],
        answer: 1,
        why: l3("Đồ dùng một lần không làm sạch được đúng cách — dùng xong là bỏ.", "Single-use items can't be cleaned properly — use once, then bin.", "Kertakäyttötuotteita ei voi puhdistaa kunnolla — käytä kerran ja hävitä."),
      },
    ],
  },
  {
    slug: "rua-tay-gang-tay",
    course: "p-safety",
    title: l3("Rửa tay, găng tay và đồ bảo hộ", "Hand hygiene, gloves and protective wear", "Käsihygienia, käsineet ja suojaimet"),
    summary: l3(
      "Khi nào và cách rửa, sát khuẩn tay; chọn găng nitrile, vinyl hay latex; khi nào thay và cách tháo găng; khẩu trang, kính, quần áo làm việc — và cách giữ da tay của chính người thợ.",
      "When and how to wash and disinfect your hands; nitrile, vinyl or latex gloves; when to change them and how to take them off; masks, eye protection, work clothes — and how to look after your own skin.",
      "Milloin ja miten kädet pestään ja desinfioidaan; nitriili-, vinyyli- vai lateksikäsineet; milloin käsineet vaihdetaan ja miten ne riisutaan; maski, suojalasit, työvaatteet — ja miten pidät huolta omasta ihostasi."
    ),
    video: video("rua-tay-gang-tay", 325, "2026-11-16"),
    notice: l3(
      "Quy định khác nhau theo từng nước và thành phố; bài này lấy ví dụ từ hướng dẫn của thành phố Helsinki (Phần Lan). Thời gian xoa dung dịch sát khuẩn tay luôn theo nhãn sản phẩm. Da tay đỏ, ngứa, nứt mãi không lành: hãy đi khám sớm.",
      "Rules differ by country and city; this lesson takes its examples from the City of Helsinki's guidance (Finland). The rub-in time for hand disinfectant always follows the product label. If the skin on your hands stays red, itchy or cracked, see a doctor early.",
      "Määräykset vaihtelevat maittain ja kunnittain; tunnin esimerkit ovat Helsingin kaupungin ohjeesta. Käsihuuhteen hieronta-aika on aina tuotteen etiketin mukainen. Jos käsien iho pysyy punaisena, kutisevana tai halkeilevana, hakeudu ajoissa lääkäriin."
    ),
    sources: [HELSINKI_HYGIENE],
    related: ["nhan-vien", "tien-ich-nhom", "kho-hang"],
    steps: [
      l3(
        "Găng tay không thay cho rửa tay: găng chỉ là lớp bảo vệ thêm bên ngoài một đôi tay đã sạch. Đeo một đôi găng làm hết khách này sang khách khác thì bẩn chẳng khác gì bàn tay chưa rửa.",
        "Gloves do not replace hand washing: they are an extra layer over hands that are already clean. One pair worn from customer to customer is as dirty as unwashed hands.",
        "Käsineet eivät korvaa käsienpesua: ne ovat lisäsuoja jo puhtaiden käsien päällä. Samat käsineet asiakkaalta toiselle ovat yhtä likaiset kuin pesemättömät kädet."
      ),
      l3(
        "Rửa tay bằng xà phòng rồi sát khuẩn tay trước mỗi khách và trước khi đeo găng. Rửa lại sau mỗi khách, sau khi tháo găng, sau khi đi vệ sinh, sau khi ăn và sau khi chạm vào rác hay dụng cụ bẩn.",
        "Wash with soap and then disinfect your hands before every customer and before putting on gloves. Wash again after every customer, after taking gloves off, after the toilet, after eating and after touching waste or dirty tools.",
        "Pese kädet saippualla ja desinfioi ne ennen jokaista asiakasta ja ennen käsineiden pukemista. Pese uudelleen jokaisen asiakkaan jälkeen, käsineiden riisumisen jälkeen, WC-käynnin ja ruokailun jälkeen sekä roskiin tai likaisiin välineisiin koskemisen jälkeen."
      ),
      l3(
        "Tháo nhẫn, đồng hồ, vòng tay trước giờ làm: vi khuẩn trú bên dưới và nhẫn dễ làm rách găng. Móng tay của thợ nên ngắn và sạch; nếu để móng dài hay móng đắp thì chà thật kỹ phần dưới móng mỗi lần rửa.",
        "Take off rings, watches and bracelets before work: microbes shelter underneath, and rings tear gloves. Keep your own nails short and clean; if you wear them long or enhanced, scrub under them every time you wash.",
        "Riisu sormukset, kello ja rannekorut ennen töitä: mikrobit viihtyvät niiden alla, ja sormukset repivät käsineitä. Pidä omat kynnet lyhyinä ja puhtaina; jos kynnet ovat pitkät tai rakennetut, harjaa kynsien aluset joka pesulla."
      ),
      l3(
        "Cách rửa (khoảng 40–60 giây): làm ướt tay, lấy xà phòng, xoa lòng bàn tay, mu bàn tay, đan ngón để rửa kẽ ngón, nắm và xoay từng ngón cái, chụm đầu ngón xoay tròn trong lòng bàn tay kia, rồi cổ tay. Xả thật sạch.",
        "How to wash (about 40–60 seconds): wet your hands, take soap, rub the palms, the backs of the hands, between the fingers with fingers interlaced, grip and rotate each thumb, rub the fingertips in the opposite palm, then the wrists. Rinse well.",
        "Näin peset (noin 40–60 sekuntia): kastele kädet, ota saippuaa, hiero kämmenet, kämmenselät ja sormien välit sormet lomittain, pyöritä kumpaakin peukaloa, hiero sormenpäät vastakkaista kämmentä vasten ja lopuksi ranteet. Huuhtele hyvin."
      ),
      l3(
        "Lau thật khô bằng giấy dùng một lần — tay ướt truyền vi khuẩn nhiều hơn tay khô. Dùng chính tờ giấy đó để khoá vòi nước. Không lau tay vào khăn vải dùng chung.",
        "Dry thoroughly with a single-use paper towel — wet hands pass on more microbes than dry ones. Turn the tap off with the same towel. Never dry your hands on a shared cloth towel.",
        "Kuivaa kädet huolellisesti kertakäyttöpyyhkeellä — märät kädet levittävät mikrobeja enemmän kuin kuivat. Sulje hana samalla paperilla. Älä kuivaa käsiä yhteiseen kangaspyyhkeeseen."
      ),
      l3(
        "Sát khuẩn tay: lấy đủ dung dịch để làm ướt cả hai bàn tay, xoa như lúc rửa cho đến khi tay khô hẳn — thường khoảng 30 giây, đúng theo nhãn sản phẩm. Tay còn dính bẩn nhìn thấy được thì phải rửa trước.",
        "Hand disinfectant: take enough to wet both hands and rub as you do when washing until they are completely dry — usually about 30 seconds, as the product label says. Visibly dirty hands must be washed first.",
        "Käsihuuhde: ota niin paljon, että molemmat kädet kastuvat, ja hiero kuten pestessä, kunnes kädet ovat täysin kuivat — yleensä noin 30 sekuntia, tuotteen etiketin mukaan. Näkyvästi likaiset kädet pestään ensin."
      ),
      l3(
        "Chọn găng: latex (cao su tự nhiên) có thể gây dị ứng cho cả thợ lẫn khách; vinyl rẻ nhưng lỏng, dễ thủng và cản hoá chất kém; nitrile bền hơn, cản hoá chất tốt hơn và không có mủ cao su — thường là lựa chọn tốt nhất.",
        "Choosing gloves: latex (natural rubber) can cause allergy in both worker and customer; vinyl is cheap but loose, tears easily and resists chemicals poorly; nitrile is stronger, resists chemicals better and contains no natural rubber — usually the best choice.",
        "Käsineiden valinta: lateksi (luonnonkumi) voi allergisoida sekä tekijän että asiakkaan; vinyyli on halpa mutta löysä, rikkoutuu helposti ja suojaa kemikaaleilta huonosti; nitriili on kestävämpi, suojaa kemikaaleilta paremmin eikä sisällä luonnonkumia — yleensä paras valinta."
      ),
      l3(
        "Găng dùng một lần chỉ bảo vệ trong thời gian ngắn: gel, nước pha bột, keo và nhất là acetone ngấm dần qua găng dù găng không rách. Mỗi khách một đôi mới; thay ngay khi găng rách, dính gel, ướt acetone hoặc vừa chạm vào điện thoại, tay nắm cửa, đèn hay tóc. Không rửa, không xịt cồn để dùng lại.",
        "Disposable gloves protect only for a short time: gel, acrylic liquid, glue and above all acetone work their way through even an intact glove. A new pair for every customer; change at once when a glove tears, gets gel or acetone on it, or has touched a phone, a door handle, the lamp or your hair. Never wash or spray gloves to reuse them.",
        "Kertakäyttökäsineet suojaavat vain lyhyen aikaa: geeli, akryylineste, liima ja varsinkin asetoni läpäisevät ehjänkin käsineen vähitellen. Jokaiselle asiakkaalle uusi pari; vaihda heti, kun käsine repeää, siihen tulee geeliä tai asetonia tai olet koskenut sillä puhelimeen, ovenkahvaan, lamppuun tai hiuksiisi. Käsineitä ei pestä eikä desinfioida uudelleenkäyttöä varten."
      ),
      l3(
        "Tháo găng: nhúm mặt ngoài của một chiếc ở cổ tay, kéo ra cho lộn trái và nắm gọn trong tay còn đeo găng; luồn ngón tay trần vào bên trong cổ găng còn lại, lột ra bọc luôn chiếc kia. Bỏ vào thùng rác rồi rửa tay hoặc sát khuẩn tay.",
        "Taking gloves off: pinch the outside of one glove at the wrist, peel it off inside out and hold it in the gloved hand; slide a bare finger inside the cuff of the other glove and peel it off over the first. Bin them, then wash or disinfect your hands.",
        "Käsineiden riisuminen: nipistä toisen käsineen ulkopinnasta ranteen kohdalta, vedä se nurin päin pois ja pidä se käsineellisessä kädessä; työnnä paljas sormi toisen käsineen suun sisäpuolelle ja vedä se nurin ensimmäisen päälle. Laita roskiin ja pese tai desinfioi kädet."
      ),
      l3(
        "Khi dũa và mài, máy hút bụi tại bàn là quan trọng nhất. Khẩu trang y tế chỉ cản giọt bắn và bụi to; bụi mịn cần khẩu trang lọc bụi (như FFP2) đeo khít mặt; hơi hoá chất thì phải nhờ thông gió. Đeo kính khi mài, cắt móng, rót acetone hay pha dung dịch khử khuẩn. Quần áo làm việc: vải trơn, dễ giặt, thay thường xuyên.",
        "When filing and drilling, dust extraction at the table matters most. A surgical mask only stops splashes and coarse dust; fine dust needs a well-fitted filtering mask (such as FFP2); vapours need ventilation. Wear eye protection when drilling, clipping nails, pouring acetone or mixing disinfectant. Work clothes: smooth, easy to wash, changed often.",
        "Viilatessa ja poratessa tärkeintä on kohdepoisto työpisteessä. Kirurginen suu-nenäsuojus pysäyttää vain roiskeet ja karkean pölyn; hienoon pölyyn tarvitaan tiiviisti istuva hengityksensuojain (esimerkiksi FFP2); höyryihin auttaa ilmanvaihto. Käytä suojalaseja poratessa, kynsiä leikatessa, asetonia kaataessa ja desinfiointiliuosta laimentaessa. Työvaatteet: sileät, helposti pestävät ja usein vaihdettavat."
      ),
    ],
    tips: [
      l3(
        "Giữ da tay của chính mình: rửa bằng nước ấm vừa, lau thật khô rồi mới đeo găng, thoa kem dưỡng không mùi vào giờ nghỉ và sau giờ làm. Da khô nứt (viêm da kích ứng) để hoá chất đi vào dễ hơn, và dị ứng thường bắt đầu từ đó.",
        "Look after your own skin: lukewarm water, hands completely dry before gloving, and fragrance-free hand cream at breaks and after work. Dry, cracked skin (irritant dermatitis) lets chemicals in more easily, and allergy often starts there.",
        "Pidä huolta omasta ihostasi: haalea vesi, kädet täysin kuiviksi ennen käsineitä ja hajusteeton käsivoide tauoilla ja työpäivän jälkeen. Kuiva, halkeileva iho (ärsytysihottuma) päästää kemikaalit helpommin läpi, ja allergia alkaa usein siitä."
      ),
      l3(
        "Khi tay không dính bẩn nhìn thấy được, sát khuẩn tay thường dịu với da hơn là rửa xà phòng liên tục.",
        "When your hands are not visibly dirty, hand disinfectant is usually kinder to the skin than washing with soap over and over.",
        "Kun kädet eivät ole näkyvästi likaiset, käsihuuhde on yleensä iholle hellävaraisempi kuin jatkuva saippuapesu."
      ),
      l3(
        "Theo hướng dẫn của Helsinki, với các dịch vụ có thể làm xước da, quần áo làm việc được thay khi cần và ít nhất mỗi ngày một lần; không dùng vải len dày, xốp.",
        "Helsinki's guidance: for treatments that can break the skin, work clothes are changed whenever needed and at least daily; no thick, porous knits.",
        "Helsingin ohjeen mukaan ihoa rikkovissa hoidoissa työvaatteet vaihdetaan tarvittaessa ja vähintään päivittäin; paksuja, huokoisia neuleita ei käytetä."
      ),
    ],
    quiz: [
      {
        q: l3(
          "Bạn đang đeo găng làm cho khách thì đưa tay chỉnh đèn. Làm gì tiếp theo?",
          "You are working in gloves and reach up to adjust the lamp. What next?",
          "Työskentelet käsineet kädessä ja käännät lamppua. Mitä teet seuraavaksi?"
        ),
        options: [
          l3("Xịt cồn lên găng rồi làm tiếp", "Spray the gloves with alcohol and carry on", "Suihkutan käsineisiin alkoholia ja jatkan"),
          l3("Thay găng mới", "Change to fresh gloves", "Vaihdan puhtaat käsineet"),
          l3("Làm tiếp, vì đèn vẫn sạch", "Carry on, the lamp is clean", "Jatkan, koska lamppu on puhdas"),
        ],
        answer: 1,
        why: l3(
          "Găng đã chạm vào thứ ngoài vùng làm việc thì coi như bẩn, và găng dùng một lần không xịt cồn để dùng lại.",
          "A glove that has touched anything outside the work area counts as dirty, and disposable gloves are not sprayed for reuse.",
          "Työalueen ulkopuolelle koskenut käsine on likainen, eikä kertakäyttökäsineitä desinfioida uudelleenkäyttöä varten."
        ),
      },
      {
        q: l3(
          "Vì sao găng dính gel hoặc ướt acetone phải thay ngay?",
          "Why must a glove with gel or acetone on it be changed straight away?",
          "Miksi käsine vaihdetaan heti, kun siihen tulee geeliä tai asetonia?"
        ),
        options: [
          l3("Vì găng sẽ đổi màu", "Because the glove will discolour", "Koska käsine värjäytyy"),
          l3("Vì khách không thích", "Because customers dislike it", "Koska asiakkaat eivät pidä siitä"),
          l3(
            "Vì hoá chất ngấm dần qua găng đến da, dù găng không rách",
            "Because chemicals work through the glove to your skin even when it is not torn",
            "Koska kemikaalit läpäisevät ehjänkin käsineen ja pääsevät iholle"
          ),
        ],
        answer: 2,
        why: l3(
          "Găng dùng một lần chỉ bảo vệ trong thời gian ngắn; gel, nước pha bột, keo và acetone đều ngấm qua lớp găng mỏng.",
          "Disposable gloves protect only briefly; gel, acrylic liquid, glue and acetone all pass through a thin glove.",
          "Kertakäyttökäsineet suojaavat vain hetken; geeli, akryylineste, liima ja asetoni läpäisevät ohuen käsineen."
        ),
      },
      {
        q: l3("Sau khi tháo găng, việc cần làm là gì?", "What do you do after taking gloves off?", "Mitä teet, kun olet riisunut käsineet?"),
        options: [
          l3("Rửa tay hoặc sát khuẩn tay", "Wash or disinfect your hands", "Pesen tai desinfioin kädet"),
          l3("Không cần gì, vì tay ở trong găng vẫn sạch", "Nothing, hands stay clean inside gloves", "En mitään, kädet pysyvät käsineissä puhtaina"),
          l3("Thoa ngay kem dưỡng là đủ", "Hand cream straight away is enough", "Käsivoide heti riittää"),
        ],
        answer: 0,
        why: l3(
          "Bên trong găng, tay ấm và ẩm nên vi khuẩn sinh sôi nhanh, và tay có thể bị bẩn lúc tháo găng.",
          "Inside a glove hands are warm and damp, so microbes multiply quickly, and hands can be contaminated while the gloves come off.",
          "Käsineen sisällä kädet ovat lämpimät ja kosteat, joten mikrobit lisääntyvät nopeasti, ja kädet voivat likaantua käsineitä riisuttaessa."
        ),
      },
    ],
  },
  {
    slug: "di-ung-hoa-chat",
    course: "p-safety",
    title: l3("Dị ứng và hoá chất: gel, bột, keo mi, thuốc nhuộm", "Allergies and chemicals: gel, acrylic, lash glue, dye", "Allergiat ja kemikaalit: geeli, akryyli, ripsiliima, värit"),
    summary: l3(
      "Kích ứng khác dị ứng thế nào, vì sao dị ứng đến chậm và thường là suốt đời, chất nào hay gây dị ứng trong nghề nail, mi và tóc, năm quy tắc phòng tránh, thử phản ứng trước khi nhuộm và làm gì khi khách hoặc thợ bị phản ứng.",
      "How irritation differs from allergy, why allergy comes slowly and usually stays for life, the main culprits in nail, lash and hair work, five rules of prevention, allergy alert tests before tinting, and what to do when a customer or a worker reacts.",
      "Miten ärsytys eroaa allergiasta, miksi allergia kehittyy hitaasti ja on yleensä elinikäinen, yleisimmät aiheuttajat kynsi-, ripsi- ja hiusalalla, viisi ehkäisysääntöä, allergiatesti ennen värjäystä ja mitä tehdään, kun asiakas tai tekijä saa reaktion."
    ),
    video: video("di-ung-hoa-chat", 328, "2026-11-16"),
    notice: l3(
      "Bài này không thay cho lời khuyên của bác sĩ. Khó thở, sưng môi, sưng mặt hay choáng váng: gọi cấp cứu ngay (112 ở Liên minh châu Âu). Từ ngày 1/9/2025, EU cấm chất TPO trong sản phẩm làm móng, kể cả hàng tiệm đã mua từ trước. Quy định về hoá chất khác nhau theo từng nước.",
      "This lesson does not replace medical advice. Difficulty breathing, swollen lips or face, or dizziness: call the emergency number at once (112 in the EU). Since 1 September 2025 the EU bans TPO in nail products, including stock a salon bought earlier. Rules on chemicals differ by country.",
      "Tämä tunti ei korvaa lääkärin ohjeita. Hengitysvaikeus, huulten tai kasvojen turvotus tai huimaus: soita heti hätänumeroon (112 EU:ssa). EU on kieltänyt TPO:n kynsituotteissa 1.9.2025 alkaen, eikä liikkeen aiemmin ostamaa varastoa saa käyttää loppuun. Kemikaalimääräykset vaihtelevat maittain."
    ),
    sources: [
      EU_TPO,
      { label: "Commission Regulation (EU) 2020/1682 — HEMA and Di-HEMA TMHDC in nail products", url: "https://eur-lex.europa.eu/eli/reg/2020/1682/oj/eng" },
      { label: "Commission Regulation (EU) 2017/237 — hair dyes and eyelash tints: restrictions and label warnings", url: "https://eur-lex.europa.eu/eli/reg/2017/237/oj/eng" },
      HELSINKI_HYGIENE,
    ],
    related: ["khach-hang", "kho-hang", "tien-ich-nhom"],
    steps: [
      l3(
        "Kích ứng là da bị tổn thương trực tiếp vì nước, xà phòng, acetone; ngừng tiếp xúc và dưỡng da thì lành. Dị ứng là hệ miễn dịch đã ghi nhớ một chất: từ đó chỉ một lượng rất nhỏ cũng gây ngứa, đỏ, mụn nước, sưng.",
        "Irritation is direct damage to the skin from water, soap or acetone; stop the contact, care for the skin and it heals. Allergy means the immune system has memorised a substance: from then on a tiny amount brings itching, redness, blisters and swelling.",
        "Ärsytys on veden, saippuan tai asetonin aiheuttama suora ihovaurio; kun altistus loppuu ja ihoa hoidetaan, se paranee. Allergiassa immuunijärjestelmä on oppinut tunnistamaan aineen: sen jälkeen pienikin määrä aiheuttaa kutinaa, punoitusta, rakkuloita ja turvotusta."
      ),
      l3(
        "Phản ứng dị ứng thường đến chậm, sau 1–3 ngày, và có thể hiện ra ở chỗ khác như mí mắt, mặt, cổ. Dị ứng không báo trước: có thể làm nhiều năm không sao rồi một ngày vượt ngưỡng — và khi đã dị ứng thì thường là suốt đời.",
        "An allergic reaction usually comes late, after 1–3 days, and may show somewhere else: eyelids, face, neck. There is no warning: you can work for years without trouble and then cross the threshold one day — and once you are allergic, it is usually for life.",
        "Allerginen reaktio tulee yleensä viiveellä, 1–3 päivän kuluttua, ja voi näkyä muualla: silmäluomissa, kasvoissa, kaulalla. Allergia ei varoita etukäteen: voit työskennellä vuosia ongelmitta, kunnes kynnys eräänä päivänä ylittyy — ja kerran syntynyt allergia on yleensä elinikäinen."
      ),
      l3(
        "Nghề nail: nhóm acrylate trong sơn gel, gel đắp, nước pha bột và keo dán móng. Khi còn lỏng, chưa chín, chúng gây dị ứng mạnh; nguy cơ nằm ở sản phẩm chưa chín và ở bụi mài từ lớp gel chưa chín hết.",
        "Nails: acrylates in gel polish, builder gel, acrylic liquid and nail glue. Uncured, they are strong sensitisers; the risk lies in uncured product and in filing dust from gel that was not fully cured.",
        "Kynnet: akrylaatit geelilakassa, rakennegeelissä, akryylinesteessä ja kynsiliimassa. Kovettumattomina ne herkistävät voimakkaasti; riski on kovettumattomassa tuotteessa ja vajaasti kovettuneen geelin viilauspölyssä."
      ),
      l3(
        "Nghề mi: keo nối mi là cyanoacrylate. Hơi keo làm cay mắt, chảy nước mũi và có thể gây dị ứng cho khách lẫn người thợ cúi sát vào giọt keo nhiều giờ mỗi ngày. Keo ghi là dịu nhẹ vẫn là chất đó.",
        "Lashes: lash adhesive is cyanoacrylate. Its vapour stings the eyes, makes the nose run and can cause allergy in the customer and in the artist who leans over the glue drop for hours a day. A glue sold as gentle or sensitive is still the same substance.",
        "Ripset: ripsiliima on syanoakrylaattia. Sen höyry kirvelee silmiä, saa nenän vuotamaan ja voi allergisoida sekä asiakkaan että tekijän, joka työskentelee liimapisaran äärellä tunteja päivässä. Herkille tarkoitettu liima on yhä samaa ainetta."
      ),
      l3(
        "Nhuộm tóc, mi, chân mày: chất tạo màu PPD và các chất họ hàng có thể gây dị ứng rất nặng. Hỏi khách đã từng vẽ henna đen chưa — henna đen thường pha chính chất này. Bột tẩy tóc bay thành bụi mịn, hít lâu ngày có thể gây hắt hơi, khò khè, hen suyễn. Ngoài ra còn hương liệu và găng latex.",
        "Hair, lash and brow tints: the dye PPD and related substances can cause very severe allergy. Ask whether the customer has ever had a black henna tattoo — it often contains this very substance. Bleach powder forms fine dust; breathed in over time it can cause sneezing, wheezing and asthma. Fragrances and latex gloves are further causes.",
        "Hius-, ripsi- ja kulmavärit: väriaine PPD ja sen sukulaisaineet voivat aiheuttaa hyvin vaikean allergian. Kysy, onko asiakkaalla ollut musta hennatatuointi — siinä on usein juuri tätä ainetta. Vaalennusjauhe pölyää hienona pölynä, ja pitkään hengitettynä se voi aiheuttaa aivastelua, hengityksen vinkumista ja astmaa. Muita aiheuttajia ovat hajusteet ja lateksikäsineet."
      ),
      l3(
        "Quy tắc 1 — sản phẩm chưa chín không chạm da: sơn cách da một khe nhỏ, lỡ dính da thì gạt sạch trước khi hơ, lau sạch cổ chai, cán cọ, mặt bàn. Quy tắc 2 — hơ cho chín hẳn: đúng đèn của hãng, đủ thời gian, lớp mỏng.",
        "Rule 1 — uncured product never touches skin: leave a small gap to the skin, clean off any that touches skin before curing, wipe bottle necks, brush handles and the table. Rule 2 — cure fully: the brand's own lamp, the full time, thin coats.",
        "Sääntö 1 — kovettumaton tuote ei koske ihoon: jätä pieni rako ihoon, poista iholle mennyt tuote ennen kovetusta, pyyhi pullonsuut, siveltimen varret ja pöytä. Sääntö 2 — koveta kunnolla: merkin oma lamppu, täysi aika, ohuet kerrokset."
      ),
      l3(
        "Quy tắc 3 — găng nitrile, thay thường xuyên. Quy tắc 4 — giữ không khí sạch: bật máy hút bụi tại bàn khi dũa, mài; mở thông gió; đậy nắp chai ngay sau khi lấy sản phẩm; dùng thùng rác có nắp. Theo hướng dẫn của Helsinki, bàn làm móng bột phải có hút khí tại chỗ đủ mạnh.",
        "Rule 3 — nitrile gloves, changed often. Rule 4 — keep the air clean: dust extraction at the table when filing or drilling, ventilation on, bottles closed straight after use, a bin with a lid. Helsinki's guidance requires sufficiently efficient local exhaust at an acrylic nail station.",
        "Sääntö 3 — nitriilikäsineet, usein vaihdettuina. Sääntö 4 — pidä ilma puhtaana: kohdepoisto päällä viilatessa ja poratessa, ilmanvaihto käynnissä, pullot kiinni heti käytön jälkeen, kannellinen roska-astia. Helsingin ohjeen mukaan akryylikynsien työpisteessä on oltava riittävän tehokas kohdepoisto."
      ),
      l3(
        "Quy tắc 5 — biết mình đang dùng gì: mua từ nhà cung cấp trong châu Âu, có nhãn và danh sách thành phần. Ở EU, sản phẩm làm móng có HEMA phải ghi “chỉ dành cho thợ chuyên nghiệp” và “có thể gây dị ứng”; TPO bị cấm trong sản phẩm làm móng từ ngày 1/9/2025. Xin nhà cung cấp bảng dữ liệu an toàn (SDS) của từng sản phẩm: trong đó ghi cần loại găng nào và sơ cứu ra sao.",
        "Rule 5 — know what you are using: buy from suppliers in Europe, with labels and ingredient lists. In the EU, nail products containing HEMA must say “For professional use only” and “Can cause an allergic reaction”; TPO has been banned in nail products since 1 September 2025. Ask your supplier for each product's safety data sheet (SDS): it tells you which gloves to wear and what first aid to give.",
        "Sääntö 5 — tiedä, mitä käytät: osta eurooppalaisilta toimittajilta tuotteita, joissa on merkinnät ja ainesosaluettelo. EU:ssa HEMAa sisältävissä kynsituotteissa on oltava merkinnät ”Vain ammattikäyttöön” ja ”Voi aiheuttaa allergisen reaktion”; TPO on ollut kielletty kynsituotteissa 1.9.2025 alkaen. Pyydä toimittajalta jokaisen tuotteen käyttöturvallisuustiedote: siitä näet, mitä käsineitä tarvitaan ja miten annetaan ensiapu."
      ),
      l3(
        "Thử phản ứng: với thuốc nhuộm tóc, mi, chân mày, nhiều hãng yêu cầu thử trên da trước, thường là 48 giờ trước khi làm — làm đúng theo hướng dẫn của hãng và ghi lại ngày thử. Thử không thấy gì không có nghĩa là an toàn mãi mãi; khách từng phản ứng với thuốc nhuộm hay henna đen thì không làm.",
        "Allergy alert test: for hair, lash and brow tints many manufacturers require a skin test first, typically 48 hours before — follow the product's instructions and note the date. A clear test is no guarantee for ever; if a customer has ever reacted to a dye or to black henna, do not tint.",
        "Allergiatesti: hius-, ripsi- ja kulmaväreissä moni valmistaja edellyttää ihotestiä, tyypillisesti 48 tuntia ennen käsittelyä — noudata tuotteen ohjetta ja kirjaa testipäivä. Puhdas testitulos ei takaa turvallisuutta pysyvästi; jos asiakas on joskus reagoinut hiusväriin tai mustaan hennaan, älä värjää."
      ),
      l3(
        "Khi khách có phản ứng trong lúc làm (ngứa, rát, đỏ, sưng): dừng lại ngay, lấy sản phẩm ra nhẹ nhàng, rửa bằng nhiều nước — dính vào mắt thì rửa mắt bằng nước sạch trong nhiều phút. Khuyên khách đi khám và đưa cho khách tên sản phẩm cùng danh sách thành phần.",
        "If a customer reacts during a treatment (itching, burning, redness, swelling): stop at once, remove the product gently and rinse with plenty of water — if it is in the eyes, rinse them with clean water for several minutes. Advise a doctor and hand over the product name and ingredient list.",
        "Jos asiakas saa reaktion kesken hoidon (kutina, kirvely, punoitus, turvotus): lopeta heti, poista tuote varovasti ja huuhtele runsaalla vedellä — jos tuotetta on mennyt silmiin, huuhtele niitä puhtaalla vedellä useita minuutteja. Ohjaa lääkäriin ja anna mukaan tuotteen nimi ja ainesosaluettelo."
      ),
    ],
    tips: [
      l3(
        "Nếu người bị là chính bạn: đừng giấu, đừng tự chữa rồi làm tiếp. Đi khám bác sĩ da liễu sớm; thử nghiệm áp da có thể tìm đúng chất gây dị ứng. Biết sớm, đổi cách làm sớm thì nhiều người vẫn giữ được nghề.",
        "If it happens to you: don't hide it, and don't treat it yourself and carry on. See a dermatologist early; patch testing can identify the exact substance. People who find out early and change how they work often keep their trade.",
        "Jos oireet tulevat sinulle: älä salaa niitä äläkä hoida itse ja jatka töitä. Hakeudu ajoissa ihotautilääkärille; lapputesteillä voidaan löytää allergian aiheuttaja. Kun syy selviää ajoissa ja työtavat muuttuvat, moni voi jatkaa ammatissaan."
      ),
      l3(
        "Hãy ghi chép, với sự đồng ý của khách: khách dị ứng với gì, ngày thử phản ứng, sản phẩm đã dùng. Trong VaraaAi, chỗ ghi là “Ghi chú nội bộ” của hồ sơ khách — chỉ salon thấy. Nếu có sự cố: ghi ngày, tên sản phẩm, số lô và cách đã xử lý.",
        "Keep records, with the customer's consent: known allergies, test dates, products used. In VaraaAi the place is the internal notes on the customer's profile — only the salon sees them. After an incident, write down the date, the product, the batch number and what you did.",
        "Pidä kirjaa asiakkaan suostumuksella: allergiat, testipäivät ja käytetyt tuotteet. VaraaAissa paikka on asiakasprofiilin sisäiset muistiinpanot — ne näkyvät vain salongille. Vahinkotilanteesta kirjataan päivämäärä, tuote, eränumero ja mitä teit."
      ),
      l3(
        "Ở EU, nhãn của nhiều loại thuốc nhuộm tóc và nhuộm mi phải ghi cảnh báo có thể gây dị ứng nặng và không dùng cho người dưới 16 tuổi. Hãy đọc nhãn trước khi dùng một sản phẩm mới.",
        "In the EU, the labels of many hair dyes and lash tints must warn that they can cause severe allergic reactions and are not intended for anyone under 16. Read the label before you use a new product.",
        "EU:ssa monien hiusvärien ja ripsivärien etiketissä on oltava varoitus vakavista allergisista reaktioista ja siitä, ettei tuotetta ole tarkoitettu alle 16-vuotiaille. Lue etiketti ennen uuden tuotteen käyttöä."
      ),
    ],
    quiz: [
      {
        q: l3(
          "Một người thợ làm gel năm năm không sao, nay bị ngứa và nổi mụn nước ở đầu ngón tay. Điều nào đúng?",
          "A nail technician has worked with gel for five years without trouble and now has itching and blisters on the fingertips. Which is true?",
          "Kynsiteknikko on tehnyt geelikynsiä viisi vuotta ongelmitta, ja nyt sormenpäissä on kutinaa ja rakkuloita. Mikä pitää paikkansa?"
        ),
        options: [
          l3("Không thể là dị ứng, vì đã làm lâu mà không sao", "It can't be allergy after so many trouble-free years", "Se ei voi olla allergiaa näin monen vuoden jälkeen"),
          l3("Cứ đeo găng rồi làm tiếp, sẽ tự hết", "Just wear gloves and carry on; it will pass", "Käsineet käteen ja työt jatkuvat, kyllä se ohi menee"),
          l3(
            "Dị ứng có thể xuất hiện sau nhiều năm tiếp xúc — nên đi khám bác sĩ da liễu sớm",
            "Allergy can appear after years of contact — see a dermatologist early",
            "Allergia voi puhjeta vuosien altistuksen jälkeen — ihotautilääkärille kannattaa hakeutua ajoissa"
          ),
        ],
        answer: 2,
        why: l3(
          "Dị ứng không báo trước: mỗi lần sản phẩm chưa chín chạm da, cơ thể ghi nhận thêm một chút, rồi một ngày vượt ngưỡng.",
          "Allergy gives no warning: every skin contact with uncured product adds a little, until one day the threshold is crossed.",
          "Allergia ei varoita: jokainen kovettumattoman tuotteen ihokosketus lisää kuormaa, kunnes kynnys eräänä päivänä ylittyy."
        ),
      },
      {
        q: l3(
          "Khách muốn nhuộm tóc và kể rằng từng bị sưng, ngứa sau khi vẽ henna đen. Bạn làm gì?",
          "A customer wants a hair colour and mentions swelling and itching after a black henna tattoo. What do you do?",
          "Asiakas haluaa hiusvärin ja kertoo saaneensa turvotusta ja kutinaa mustasta hennatatuoinnista. Mitä teet?"
        ),
        options: [
          l3("Không nhuộm, và khuyên khách hỏi bác sĩ", "Don't colour, and suggest they ask a doctor", "En värjää ja neuvon kysymään lääkäriltä"),
          l3("Nhuộm bình thường, vì henna không liên quan", "Colour as usual; henna has nothing to do with it", "Värjään normaalisti, hennalla ei ole merkitystä"),
          l3("Nhuộm nhưng để thuốc ngắn thời gian hơn", "Colour, but leave the dye on for less time", "Värjään, mutta lyhennän vaikutusaikaa"),
        ],
        answer: 0,
        why: l3(
          "Henna đen thường pha PPD — chính chất gây dị ứng trong thuốc nhuộm. Người đã từng phản ứng có nguy cơ bị nặng.",
          "Black henna often contains PPD — the very allergen in hair dye. Someone who has reacted before is at risk of a severe reaction.",
          "Mustassa hennassa on usein PPD:tä — samaa allergeenia kuin hiusväreissä. Aiemmin reagoineella on vakavan reaktion riski."
        ),
      },
      {
        q: l3(
          "Đang làm thì khách thấy khó thở và môi sưng lên. Việc đầu tiên là gì?",
          "During a treatment the customer finds it hard to breathe and their lips swell. What comes first?",
          "Kesken hoidon asiakkaan on vaikea hengittää ja huulet turpoavat. Mitä teet ensin?"
        ),
        options: [
          l3("Cho khách uống nước và chờ xem", "Give them water and wait and see", "Annan vettä ja jään seuraamaan tilannetta"),
          l3("Dừng lại và gọi cấp cứu ngay (112 ở EU)", "Stop and call the emergency number at once (112 in the EU)", "Lopetan ja soitan heti hätänumeroon (112 EU:ssa)"),
          l3("Làm nhanh cho xong rồi khuyên khách đi khám", "Finish quickly, then suggest a doctor", "Teen työn nopeasti loppuun ja neuvon lääkäriin"),
        ],
        answer: 1,
        why: l3(
          "Khó thở, sưng môi, sưng mặt hay choáng váng là dấu hiệu của phản ứng nặng — cần cấp cứu ngay.",
          "Difficulty breathing, swollen lips or face, or dizziness are signs of a severe reaction — it needs emergency help now.",
          "Hengitysvaikeus, huulten tai kasvojen turvotus ja huimaus ovat vakavan reaktion merkkejä — tarvitaan heti hätäapua."
        ),
      },
    ],
  },
  {
    slug: "khi-nao-khong-lam",
    course: "p-safety",
    title: l3("Khi nào không làm cho khách", "When not to treat a customer", "Milloin asiakasta ei hoideta"),
    summary: l3(
      "Nhìn và hỏi gì trước mỗi dịch vụ, những dấu hiệu ở móng, mắt, da đầu và da có nghĩa là “chưa làm ở đây, nên đi khám trước”, cách từ chối cho khéo mà vẫn giữ thể diện cho khách, và khi nào chính người thợ không nên làm.",
      "What to look at and ask before every service, the signs on nails, eyes, scalp and skin that mean “not here today — see a doctor or pharmacist first”, how to decline kindly and keep the customer's dignity, and when the professional should not be working.",
      "Mitä katsotaan ja kysytään ennen jokaista hoitoa, mitkä kynsien, silmien, päänahan ja ihon merkit tarkoittavat ”ei tänään täällä — käy ensin lääkärissä tai apteekissa”, miten kieltäydytään ystävällisesti asiakkaan arvokkuutta kunnioittaen ja milloin tekijän itsensä ei pidä tehdä töitä."
    ),
    video: video("khi-nao-khong-lam", 329, "2026-11-16"),
    notice: l3(
      "Người thợ không chẩn đoán và không gọi tên bệnh: hãy tả điều mình thấy và khuyên khách hỏi bác sĩ hoặc dược sĩ. Bài này không thay cho ý kiến y tế, và quy định khác nhau theo từng nước. Khi phân vân: không làm.",
      "A beauty professional does not diagnose or name a disease: describe what you see and suggest a doctor or pharmacist. This lesson does not replace medical advice, and rules differ by country. When in doubt, don't.",
      "Kauneudenhoitoalan ammattilainen ei tee diagnooseja eikä nimeä sairauksia: kerro, mitä näet, ja ohjaa lääkäriin tai apteekkiin. Tämä tunti ei korvaa lääkärin ohjeita, ja määräykset vaihtelevat maittain. Jos epäröit, älä tee."
    ),
    sources: [
      { label: "NHS — Common questions about isotretinoin capsules (no waxing during treatment)", url: "https://www.nhs.uk/medicines/isotretinoin-capsules/common-questions-about-isotretinoin-capsules/" },
      { label: "Diabetes UK — Taking care of your feet", url: "https://www.diabetes.org.uk/about-diabetes/complications/feet/taking-care-of-your-feet" },
    ],
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Trước mỗi dịch vụ: nhìn và hỏi. Nhìn dưới ánh sáng tốt, khi da và móng còn sạch, chưa sơn, chưa thoa gì. Hỏi vài câu ngắn và ghi vào phiếu tư vấn: dị ứng, thuốc đang dùng, đang điều trị gì ở da hay mắt, bệnh tiểu đường, phẫu thuật hay nhiễm trùng gần đây. Khách quen cũng hỏi lại.",
        "Before every service: look and ask. Look in good light, while skin and nails are clean, unpolished and product-free. Ask a few short questions and note them on the consultation card: allergies, medicines, any treatment of skin or eyes, diabetes, recent surgery or infection. Ask regulars again, too.",
        "Ennen jokaista hoitoa: katso ja kysy. Katso hyvässä valossa, kun iho ja kynnet ovat puhtaat, lakattomat ja tuotteettomat. Kysy muutama lyhyt kysymys ja kirjaa ne asiakaskorttiin: allergiat, lääkkeet, ihon tai silmien hoidot, diabetes, tuoreet leikkaukset tai tulehdukset. Kysy uudelleen myös vakioasiakkailta."
      ),
      l3(
        "Người thợ không chẩn đoán. Đừng nói “chị bị nấm rồi”. Hãy nói điều mình thấy: “Em thấy móng này đổi màu và dày lên, em nghĩ chị nên để bác sĩ hoặc dược sĩ xem trước.” Nhìn bằng mắt không ai dám chắc: một cái móng dày, ngả vàng có thể là nấm, là vảy nến, hay chỉ do giày chật. Việc của mình là nhận ra điều không bình thường và dừng lại đúng lúc.",
        "We do not diagnose. Never say “you have a fungus”. Say what you see: “This nail has changed colour and thickened — I think a doctor or pharmacist should look at it first.” Nobody can be sure by eye: a thick, yellowish nail may be a fungus, psoriasis, or just years of tight shoes. Our job is to notice that something is not normal and to stop in time.",
        "Emme tee diagnooseja. Älä sano ”sinulla on kynsisieni”. Kerro, mitä näet: ”Tämän kynnen väri on muuttunut ja kynsi on paksuuntunut — lääkärin tai farmaseutin olisi hyvä katsoa se ensin.” Silmämääräisesti kukaan ei voi olla varma: paksu, kellertävä kynsi voi johtua sienestä, psoriaasista tai vain ahtaista kengistä. Meidän tehtävämme on huomata poikkeava ja keskeyttää ajoissa."
      ),
      l3(
        "Móng — không làm trên móng hoặc vùng da đó khi thấy: móng ngả xanh, vàng hay nâu; móng dày lên, giòn, vụn; móng tách khỏi nền móng; da quanh móng sưng, đỏ, đau, có mủ; mụn cóc; vết thương hở.",
        "Nails — do not work on that nail or skin when you see: green, yellow or brown discolouration; a thickened, brittle, crumbling nail; the plate lifting from the nail bed; swollen, red, painful skin or pus around the nail; warts; open wounds.",
        "Kynnet — älä käsittele kyseistä kynttä tai ihoaluetta, jos näet: vihertävää, keltaista tai ruskeaa värimuutosta; paksuuntuneen, hauraan, murenevan kynnen; kynnen irtoamista kynsipedistä; turvonneen, punoittavan, kipeän tai märkivän kynsivallin; syyliä; avohaavoja."
      ),
      l3(
        "Bàn chân của khách có bệnh tiểu đường cần thật cẩn thận: chân có thể giảm cảm giác và vết xước rất lâu lành. Nước chỉ ấm vừa, không ngâm lâu, không dùng dao bào, không cắt da. Chân có vết loét hay vết thương thì không làm; khuyên khách đến bác sĩ hoặc chuyên viên chăm sóc bàn chân.",
        "A customer with diabetes needs extra care for a pedicure: the feet may have less feeling and small cuts heal slowly. Lukewarm water only, no long soaking, no blades, no cutting of skin. If there is an ulcer or a wound, do not treat; suggest a doctor or a podiatrist.",
        "Diabetesta sairastavan asiakkaan jalkahoito vaatii erityistä varovaisuutta: jalkojen tunto voi olla heikentynyt ja pienetkin haavat paranevat hitaasti. Vain kädenlämpöistä vettä, ei pitkää liotusta, ei teriä, ei ihon leikkaamista. Jos jalassa on haavauma tai haava, älä hoida; ohjaa lääkärille tai jalkaterapeutille."
      ),
      l3(
        "Mi và chân mày — không làm khi: mắt đỏ, ngứa, chảy nước hay có ghèn dính; lẹo; bờ mi sưng đỏ, đóng vảy; có những chấm nhỏ bám ở chân mi kèm ngứa nhiều. Sau phẫu thuật mắt hay nhiễm trùng mắt: chờ bác sĩ cho phép. Khách từng phản ứng với keo hay thuốc nhuộm mi thì không làm lại bằng sản phẩm đó.",
        "Lashes and brows — do not treat when: the eyes are red, itchy, watery or sticky; there is a stye; the lid margins are swollen, red or crusty; tiny dots cling to the lash roots and the lashes itch badly. After eye surgery or an eye infection, wait until the doctor agrees. Someone who has reacted to glue or tint does not get that product again.",
        "Ripset ja kulmat — älä hoida, jos: silmät punoittavat, kutisevat, vuotavat tai rähmivät; luomessa on näärännäppy; luomen reunat ovat turvonneet, punaiset tai karstaiset; ripsien tyvessä on pieniä pisteitä ja ripset kutisevat voimakkaasti. Silmäleikkauksen tai silmätulehduksen jälkeen odotetaan lääkärin lupaa. Jos asiakas on reagoinut liimaan tai väriin, samaa tuotetta ei käytetä uudelleen."
      ),
      l3(
        "Tóc và da đầu — dừng lại khi thấy: chí (chấy) và trứng của chúng; vết loét, vết thương hở; những mảng tròn, đỏ, bong vảy; tóc rụng nhiều, từng mảng mà không rõ vì sao. Gặp chí: đừng hốt hoảng, nói riêng với khách, khuyên khách ra hiệu thuốc, rồi giặt khăn, xử lý lược, kéo và áo choàng thật kỹ.",
        "Hair and scalp — stop when you see: head lice and nits; sores or open wounds; round, red, scaly patches; heavy or patchy hair loss with no clear reason. With lice: no panic, tell the customer in private, suggest the pharmacy, then wash the towels and reprocess combs, scissors and cape thoroughly.",
        "Hiukset ja päänahka — keskeytä, jos näet: täitä ja saivareita; haavaumia tai avohaavoja; pyöreitä, punaisia, hilseileviä läiskiä; runsasta tai läiskittäistä hiustenlähtöä ilman selvää syytä. Täiden kohdalla: ei paniikkia, kerro asiakkaalle kahden kesken, ohjaa apteekkiin ja pese sen jälkeen pyyhkeet sekä puhdista ja desinfioi kammat, sakset ja kampausviitta huolellisesti."
      ),
      l3(
        "Da, spa và wax — không làm trên: da cháy nắng, da trầy xước hay đang nhiễm trùng, mụn rộp ở môi, những mảng phát ban có thể lây. Trước khi wax luôn hỏi về thuốc trị mụn và kem retinoid: khách đang uống isotretinoin, hoặc mới ngừng trong khoảng sáu tháng, thì không wax; với kem bôi, làm theo hướng dẫn của hãng wax và của bác sĩ kê thuốc.",
        "Skin, spa and waxing — do not treat: sunburnt skin, broken or infected skin, cold sores, rashes that may be contagious. Before waxing always ask about acne medicine and retinoid creams: no waxing for someone taking isotretinoin or who stopped within about the last six months; for creams, follow the wax brand's instructions and the prescriber's advice.",
        "Iho, spa ja vahaus — älä hoida: auringon polttamaa ihoa, rikkinäistä tai tulehtunutta ihoa, huuliherpestä tai mahdollisesti tarttuvaa ihottumaa. Kysy ennen vahausta aina aknelääkkeistä ja retinoidivoiteista: isotretinoiinia käyttävää tai sen noin puolen vuoden sisällä lopettanutta ei vahata; voiteiden kohdalla noudatetaan vahan valmistajan ja lääkkeen määränneen lääkärin ohjeita."
      ),
      l3(
        "Cách từ chối: nói riêng, nói nhỏ; nói về sự an toàn của khách, không phải nỗi sợ của mình; đưa ra một lối khác — làm những móng còn lại, đổi sang dịch vụ khác, hoặc hẹn lại khi bác sĩ nói là ổn. Đừng tỏ vẻ ghê sợ, đừng lùi lại.",
        "How to decline: in private and quietly; talk about the customer's safety, not your own fear; offer another way — do the other nails, change to a different service, or rebook once the doctor says it is fine. Never show disgust, never step back.",
        "Näin kieltäydyt: kahden kesken ja hiljaa; puhu asiakkaan turvallisuudesta, älä omasta pelostasi; tarjoa vaihtoehto — tee muut kynnet, vaihda toiseen palveluun tai varaa uusi aika, kun lääkäri on antanut luvan. Älä näytä inhoa äläkä peräänny."
      ),
      l3(
        "Ghi lại trong hồ sơ khách: ngày nào, mình thấy gì, mình đã khuyên gì — chỉ điều mình thấy, không ghi tên bệnh. Đây là thông tin sức khoẻ: chỉ ghi khi khách đồng ý và giữ thật kín. Còn khi phân vân có nên làm hay không: không làm.",
        "Note it on the customer's record: the date, what you saw, what you advised — only what you saw, never the name of a disease. This is health information: record it only with the customer's consent and keep it confidential. And when in doubt whether to treat: don't.",
        "Kirjaa asiakastietoihin: päivämäärä, mitä näit ja mitä neuvoit — vain havainnot, ei sairauden nimeä. Kyse on terveystiedosta: kirjaa se vain asiakkaan suostumuksella ja pidä luottamuksellisena. Ja jos epäröit, hoidatko vai et: älä hoida."
      ),
      l3(
        "Có lúc chính người thợ không nên làm. Vết xước nhỏ, sạch ở tay: dán băng kín nước rồi đeo găng. Vết thương ở tay đang sưng, đỏ, có mủ: không chạm vào khách, và đi khám. Sốt, tiêu chảy, nôn ói, đau mắt đỏ hay bệnh dễ lây: ở nhà.",
        "Sometimes it is the professional who should not work. A small clean cut on the hand: waterproof plaster, then gloves. A hand wound that is swollen, red or has pus: do not touch customers, and see a doctor. Fever, diarrhoea, vomiting, pink eye or another contagious illness: stay at home.",
        "Joskus tekijän itsensä ei pidä tehdä töitä. Pieni puhdas haava kädessä: vedenpitävä laastari ja käsineet. Turvonnut, punoittava tai märkivä haava kädessä: älä koske asiakkaisiin ja käy lääkärissä. Kuume, ripuli, oksentelu, silmätulehdus tai muu tarttuva tauti: pysy kotona."
      ),
    ],
    tips: [
      l3(
        "Một câu dùng được trong mọi trường hợp: “Em muốn chị đẹp mà vẫn an toàn, nên chỗ này em xin chưa làm hôm nay.” Nếu khách năn nỉ “cứ làm đi, chị chịu trách nhiệm”, bạn vẫn không làm: lời hứa đó không làm cho mắt hết đỏ hay vết thương lành lại. Nhắc lại nhẹ nhàng: “Em từ chối là vì em quý chị.”",
        "One sentence that always works: “I want you to look good and stay safe, so I'd rather not do this part today.” If the customer insists — “just do it, it's my responsibility” — you still don't: that promise will not make a red eye clear or a wound heal. Repeat gently: “I'm saying no because I care about you.”",
        "Lause, joka toimii aina: ”Haluan, että lopputulos on kaunis ja turvallinen, joten tätä kohtaa en tee tänään.” Jos asiakas vaatii – ”tee vain, minä otan vastuun” – et silti tee: lupaus ei paranna punoittavaa silmää eikä haavaa. Toista ystävällisesti: ”Kieltäydyn, koska välitän sinusta.”"
      ),
      l3(
        "Trong VaraaAi, chỗ ghi là “Ghi chú nội bộ” của hồ sơ khách — chỉ salon thấy. Hẹn lại cho khách ngay trong Lịch hẹn, để khách thấy mình không bị từ chối hẳn.",
        "In VaraaAi the place for the note is the internal notes on the customer's profile — only the salon sees them. Rebook the customer in the calendar straight away, so they can see the door is still open.",
        "VaraaAissa merkintä tehdään asiakasprofiilin sisäisiin muistiinpanoihin — ne näkyvät vain salongille. Varaa asiakkaalle uusi aika saman tien kalenterista, jotta hän näkee olevansa edelleen tervetullut."
      ),
      l3(
        "Chủ tiệm nên nói rõ với nhân viên: báo bệnh không phải là lỗi. Một người thợ đi làm khi đang ốm có thể lây cho nhiều khách trong một ngày.",
        "Owners should say it out loud: calling in sick is not a fault. One professional who works while ill can pass it on to many customers in a single day.",
        "Omistajan kannattaa sanoa se ääneen: sairaana ilmoittautuminen ei ole virhe. Sairaana työskentelevä voi tartuttaa monta asiakasta yhden päivän aikana."
      ),
    ],
    quiz: [
      {
        q: l3(
          "Khách có một móng ngả xanh và hơi hở ở đầu móng, muốn sơn gel màu đậm để che. Bạn làm gì?",
          "A customer has one nail that looks greenish and is lifting at the tip, and wants dark gel polish to hide it. What do you do?",
          "Asiakkaan yksi kynsi on vihertävä ja irtoaa kärjestä, ja hän haluaa tumman geelilakan peitoksi. Mitä teet?"
        ),
        options: [
          l3("Sơn màu thật đậm để che đi", "Apply a very dark colour to cover it", "Lakkaan hyvin tummalla värillä, jotta se peittyy"),
          l3(
            "Không làm trên móng đó, tả điều mình thấy và khuyên khách hỏi bác sĩ hoặc dược sĩ",
            "Leave that nail, describe what you see and suggest a doctor or pharmacist",
            "Jätän sen kynnen tekemättä, kerron mitä näen ja ohjaan lääkäriin tai apteekkiin"
          ),
          l3("Nói với khách: “Chị bị nấm móng rồi”", "Tell the customer: “You have nail fungus”", "Sanon asiakkaalle: ”Sinulla on kynsisieni”"),
        ],
        answer: 1,
        why: l3(
          "Lớp sơn không chữa được gì, chỉ che đi cho đến khi nặng hơn. Người thợ không chẩn đoán: tả điều mình thấy và khuyên đi khám.",
          "Polish cures nothing; it only hides the problem until it gets worse. We do not diagnose: describe what you see and recommend a check.",
          "Lakka ei paranna mitään, se vain peittää ongelman, kunnes se pahenee. Emme tee diagnooseja: kuvaile näkemäsi ja suosittele tarkastusta."
        ),
      },
      {
        q: l3(
          "Khách muốn wax chân mày và kể rằng đang uống thuốc trị mụn isotretinoin. Điều nào đúng?",
          "A customer wants a brow wax and mentions taking isotretinoin for acne. Which is right?",
          "Asiakas haluaa kulmien vahauksen ja kertoo käyttävänsä isotretinoiinia akneen. Mikä on oikein?"
        ),
        options: [
          l3("Wax bình thường, vì thuốc uống không liên quan đến da", "Wax as usual; a tablet has nothing to do with the skin", "Vahaan normaalisti, tabletti ei vaikuta ihoon"),
          l3("Wax nhưng để sáp nguội hơn", "Wax, but with cooler wax", "Vahaan, mutta viileämmällä vahalla"),
          l3(
            "Không wax; gợi ý cách nhẹ hơn như nhíp, nếu phù hợp",
            "No waxing; suggest a gentler method such as tweezing, if suitable",
            "En vahaa; ehdotan hellävaraisempaa tapaa, esimerkiksi nyppimistä, jos se sopii"
          ),
        ],
        answer: 2,
        why: l3(
          "Isotretinoin làm da mỏng và yếu, wax có thể làm tróc cả lớp da. Không wax khi khách đang uống hoặc mới ngừng trong khoảng sáu tháng.",
          "Isotretinoin makes the skin thin and fragile; wax can strip a layer of skin. No waxing during treatment or for about six months after stopping.",
          "Isotretinoiini ohentaa ja haurastuttaa ihoa, ja vaha voi irrottaa ihon pintakerroksen. Ei vahausta hoidon aikana eikä noin puoleen vuoteen sen lopettamisesta."
        ),
      },
      {
        q: l3(
          "Bạn phải từ chối một dịch vụ. Cách nào giữ được thể diện cho khách?",
          "You have to decline a service. Which way keeps the customer's dignity?",
          "Joudut kieltäytymään palvelusta. Mikä tapa säilyttää asiakkaan arvokkuuden?"
        ),
        options: [
          l3(
            "Nói riêng, nói nhỏ, nói về sự an toàn của khách và đề nghị hẹn lại hoặc đổi dịch vụ",
            "Speak privately and quietly, about the customer's safety, and offer to rebook or change the service",
            "Puhun kahden kesken ja hiljaa asiakkaan turvallisuudesta ja tarjoan uutta aikaa tai toista palvelua"
          ),
          l3("Giải thích to, rõ để các khách khác cũng yên tâm", "Explain loudly and clearly so other customers feel reassured", "Selitän kuuluvasti, jotta muutkin asiakkaat rauhoittuvat"),
          l3("Lùi lại, đeo thêm găng rồi nói mình không dám làm", "Step back, put on extra gloves and say you are afraid to do it", "Peräännyn, laitan lisäkäsineet ja sanon, etten uskalla tehdä"),
        ],
        answer: 0,
        why: l3(
          "Khách sẽ nhớ rất lâu thái độ của bạn lúc đó. Riêng tư, tử tế và có một lối khác thì khách thường quay lại.",
          "The customer will remember your attitude for a long time. Privacy, kindness and an alternative usually bring them back.",
          "Asiakas muistaa asenteesi pitkään. Yksityisyys, ystävällisyys ja vaihtoehdon tarjoaminen tuovat hänet yleensä takaisin."
        ),
      },
    ],
  },
  {
    slug: "xu-ly-su-co",
    course: "p-safety",
    title: l3("Xử lý sự cố: chảy máu, dị ứng, bỏng", "Incidents: bleeding, allergic reactions, burns", "Vahinkotilanteet: verenvuoto, allergiset reaktiot, palovammat"),
    summary: l3(
      "Phút đầu tiên khi có sự cố trong tiệm: vết cắt chảy máu, sản phẩm bắn vào mắt, khách bị phản ứng, bỏng vì sáp nóng, hoá chất hay đèn, khách xỉu, và khi chính người thợ bị dụng cụ đâm vào tay. Sau đó: nói thật với khách, ghi biên bản sự cố, báo chủ tiệm và bổ sung túi sơ cứu.",
      "The first minute of a salon incident: a bleeding cut, product in the eye, an allergic reaction, a burn from hot wax, chemicals or the lamp, a customer who faints, and a sharps injury to the professional. Then: tell the customer honestly, write the incident record, inform the owner and restock the first-aid kit.",
      "Vahinkotilanteen ensimmäinen minuutti: vuotava haava, tuotetta silmässä, allerginen reaktio, palovamma kuumasta vahasta, kemikaalista tai lampusta, asiakkaan pyörtyminen ja tekijän oma pisto- tai viiltotapaturma. Sen jälkeen: kerro asiakkaalle rehellisesti, kirjaa tapahtuma, ilmoita omistajalle ja täydennä ensiapulaukku."
    ),
    video: video("xu-ly-su-co", 320, "2026-11-16"),
    notice: l3(
      "Bài này không thay cho một khoá học sơ cứu. Khi nguy hiểm đến tính mạng — khó thở, sưng môi hay mặt, máu không cầm, khách không tỉnh lại — gọi cấp cứu ngay (112 ở Liên minh châu Âu). Hướng dẫn sơ cứu và quy định về báo cáo sự cố khác nhau theo từng nước.",
      "This lesson does not replace a first-aid course. When life is in danger — difficulty breathing, swollen lips or face, bleeding that will not stop, a customer who does not come round — call the emergency number at once (112 in the EU). First-aid guidance and incident-reporting rules differ by country.",
      "Tämä tunti ei korvaa ensiapukurssia. Kun henki on vaarassa — hengitysvaikeus, huulten tai kasvojen turvotus, verenvuoto ei tyrehdy, asiakas ei virkoa — soita heti hätänumeroon (112 EU:ssa). Ensiapuohjeet ja vahinkojen ilmoitussäännöt vaihtelevat maittain."
    ),
    sources: [
      { label: "NHS — Burns and scalds: treatment", url: "https://www.nhs.uk/conditions/burns-and-scalds/treatment/" },
      { label: "Finnish Red Cross — First aid for burns (Palovammat)", url: "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/palovammat/" },
      { label: "NHS — Eye injuries", url: "https://www.nhs.uk/conditions/eye-injuries/" },
      { label: "NHS — Cuts and grazes", url: "https://www.nhs.uk/conditions/cuts-and-grazes/" },
      { label: "Finnish Red Cross — Severe allergic reaction (Vakava allerginen reaktio)", url: "https://www.punainenristi.fi/ensiapu/ensiapuohjeet/vakava-allerginen-reaktio/" },
      { label: "NHS — Fainting", url: "https://www.nhs.uk/conditions/fainting/" },
      { label: "HSE (UK) — How to deal with an exposure incident (blood-borne viruses)", url: "https://www.hse.gov.uk/biosafety/blood-borne-viruses/how-deal-exposure-incident.htm" },
      { label: "HSE (UK) — First aid at work: what a first-aid box should contain", url: "https://www.hse.gov.uk/firstaid/faqs.htm" },
      HELSINKI_HYGIENE,
    ],
    related: ["khach-hang", "nhan-vien", "kiem-tra-salon"],
    steps: [
      l3(
        "Trong mọi sự cố có ba việc giống nhau: dừng tay; giữ bình tĩnh, vì khách nhìn vào mặt mình mà biết nên sợ hay không; và nếu nguy hiểm đến tính mạng thì gọi cấp cứu trước (112 ở Liên minh châu Âu).",
        "Three things are the same in every incident: stop working; stay calm, because the customer reads your face; and if life is in danger, call the emergency number first (112 in the EU).",
        "Kolme asiaa pätee jokaisessa vahinkotilanteessa: keskeytä työ; pysy rauhallisena, sillä asiakas lukee tilanteen kasvoiltasi; ja jos henki on vaarassa, soita ensin hätänumeroon (112 EU:ssa)."
      ),
      l3(
        "Vết cắt chảy máu: dừng lại, đeo găng mới, ép gạc sạch thẳng lên vết cắt và giữ yên cho đến khi máu cầm. Rồi rửa bằng nước sạch, thấm khô và băng lại. Dặn khách giữ vết thương sạch và khô; những ngày sau nếu sưng, đỏ, đau hơn thì đi khám. Ép mãi mà máu không cầm: gọi cấp cứu.",
        "A bleeding cut: stop, put on fresh gloves, press clean gauze straight onto the cut and hold it still until the bleeding stops. Then rinse with clean water, pat dry and cover. Tell the customer to keep the wound clean and dry and to see a doctor if it becomes swollen, red or more painful in the following days. If pressure does not stop the bleeding, call for emergency help.",
        "Vuotava haava: keskeytä, vaihda puhtaat käsineet, paina puhdasta sideharsoa suoraan haavaan ja pidä paikallaan, kunnes vuoto tyrehtyy. Huuhtele sitten puhtaalla vedellä, taputtele kuivaksi ja peitä. Neuvo asiakasta pitämään haava puhtaana ja kuivana ja hakeutumaan lääkäriin, jos se lähipäivinä turpoaa, punoittaa tai kipu pahenee. Jos vuoto ei tyrehdy painamalla, soita hätänumeroon."
      ),
      l3(
        "Sau đó mới đến đồ đạc: bề mặt dính máu luôn phải khử khuẩn; dụng cụ đó không dùng tiếp mà đưa đi làm sạch và tiệt trùng (xem bài xử lý dụng cụ); lưỡi dao, kim dùng một lần bỏ vào hộp đựng vật sắc nhọn.",
        "Only then the equipment: a surface with blood on it is always disinfected; that tool is not used again but goes to cleaning and sterilisation (see the lesson on tools); single-use blades and needles go into a sharps container.",
        "Vasta sitten välineet: veren tahrima pinta desinfioidaan aina; kyseistä välinettä ei käytetä enää, vaan se puhdistetaan ja steriloidaan (katso välineiden huoltoa käsittelevä tunti); kertakäyttöiset terät ja neulat laitetaan viiltävän jätteen astiaan."
      ),
      l3(
        "Sản phẩm bắn vào mắt (keo, thuốc nhuộm, acetone, dung dịch khử khuẩn): rửa ngay. Cho nước sạch, không nóng, chảy nhẹ qua con mắt đang mở, liên tục ít nhất 20 phút. Nhờ khách tháo kính áp tròng nếu tháo được; dặn khách đừng dụi mắt. Rồi đưa khách đi khám ngay và mang theo chai sản phẩm. Với hoá chất mạnh: vừa rửa vừa gọi cấp cứu.",
        "Product in the eye (glue, tint, acetone, disinfectant): rinse at once. Let clean water that is not hot run gently over the open eye for at least 20 minutes. Ask the customer to take out contact lenses if they can, and not to rub the eye. Then get medical help straight away and take the product bottle along. With a strong chemical: keep rinsing and call for emergency help.",
        "Tuotetta silmässä (liima, väri, asetoni, desinfiointiaine): huuhtele heti. Anna puhtaan, ei kuuman veden valua kevyesti avoimen silmän yli vähintään 20 minuuttia. Pyydä asiakasta poistamaan piilolinssit, jos se onnistuu, ja kiellä hieromasta silmää. Hakeudu sitten heti hoitoon ja ota tuotepullo mukaan. Voimakkaan kemikaalin kohdalla: jatka huuhtelua ja soita hätänumeroon."
      ),
      l3(
        "Khách bị phản ứng (ngứa, rát, đỏ, sưng): dừng lại, lấy sản phẩm ra thật nhẹ, rửa bằng nhiều nước. Dấu hiệu nguy hiểm — khó thở, khàn tiếng, sưng môi, sưng mặt, choáng váng: gọi cấp cứu ngay, đừng chờ xem có đỡ không. Hỏi khách có mang bút tiêm adrenaline không, và để khách ở tư thế dễ thở nhất.",
        "An allergic reaction (itching, burning, redness, swelling): stop, remove the product gently, rinse with plenty of water. Danger signs — difficulty breathing, a hoarse voice, swollen lips or face, dizziness: call for emergency help at once; do not wait to see whether it passes. Ask whether the customer carries an adrenaline auto-injector, and help them into the position in which breathing is easiest.",
        "Allerginen reaktio (kutina, kirvely, punoitus, turvotus): keskeytä, poista tuote varovasti ja huuhtele runsaalla vedellä. Vaaran merkit — hengitysvaikeus, äänen käheys, huulten tai kasvojen turvotus, huimaus: soita heti hätänumeroon, älä jää odottamaan. Kysy, onko asiakkaalla adrenaliinikynä, ja auta hänet asentoon, jossa hengittäminen on helpointa."
      ),
      l3(
        "Bỏng nhiệt (sáp quá nóng, dụng cụ nóng): xả ngay dưới vòi nước mát — ít nhất 10 phút, tốt nhất 20 phút. Tháo nhẫn, vòng gần chỗ bỏng trước khi sưng. Không chườm đá; không bôi kem, dầu hay kem đánh răng; không chọc vỡ bọng nước. Làm mát xong, che bằng màng bọc thực phẩm sạch, đặt nhẹ lên trên, không quấn chặt.",
        "A heat burn (wax too hot, a hot tool): cool it straight away under cool running water — at least 10 minutes, ideally 20. Take off rings and bracelets near the burn before it swells. No ice; no creams, oils or toothpaste; do not burst blisters. After cooling, cover with clean cling film laid loosely on top, not wrapped tight.",
        "Lämpöpalovamma (liian kuuma vaha, kuuma väline): jäähdytä heti viileällä juoksevalla vedellä — vähintään 10 minuuttia, mieluiten 20. Poista sormukset ja rannekorut palovamman läheltä ennen turvotusta. Ei jäätä; ei voiteita, öljyjä tai hammastahnaa; älä puhkaise rakkuloita. Peitä jäähdytyksen jälkeen puhtaalla tuorekelmulla, joka asetetaan kevyesti päälle eikä kiedota tiukasti."
      ),
      l3(
        "Đi khám khi chỗ bỏng phồng rộp mà rộng hơn lòng bàn tay của khách, khi bỏng sâu, khi bỏng ở mặt hay ở khớp, và với mọi vết bỏng do hoá chất. Hoá chất dính trên da: xả nước thật nhiều, thật lâu, cởi bỏ khăn áo đã thấm hoá chất, đừng bôi thứ gì lên. Khách kêu nóng dưới đèn: rút tay ra ngay — lớp gel quá dày, hoặc móng đã mỏng.",
        "Get medical care when a blistered burn is larger than the customer's own palm, when it is deep, when it is on the face or over a joint, and for every chemical burn. Chemical on the skin: rinse with lots of water for a long time, remove towels or clothing soaked with it, put nothing on it. If the customer feels heat under the lamp: hand out at once — the gel is too thick or the nail is thin.",
        "Hoitoon on hakeuduttava, kun rakkulainen palovamma on asiakkaan omaa kämmentä suurempi, kun vamma on syvä, kun se on kasvoissa tai nivelen kohdalla, ja aina kun palovamman on aiheuttanut kemikaali. Kemikaalia iholla: huuhtele runsaalla vedellä pitkään, poista kemikaalin kastelemat pyyhkeet ja vaatteet, älä levitä iholle mitään. Jos asiakas tuntee kuumotusta lampussa: käsi heti pois — geelikerros on liian paksu tai kynsi ohut."
      ),
      l3(
        "Khách xỉu (hay gặp khi wax, khi đứng dậy nhanh, khi sợ máu): thấy chóng mặt, tái mặt, vã mồ hôi thì cho khách nằm xuống ngay, kê hai chân lên cao, nới cổ áo, mở cửa cho thoáng. Thường chưa đầy một phút khách tỉnh lại; để khách nghỉ rồi ngồi dậy thật từ từ. Không tỉnh lại sau một phút, thở không bình thường, co giật hay đau ngực: gọi cấp cứu.",
        "Fainting (common during waxing, on standing up fast, at the sight of blood): at the first dizziness, paleness or sweating, lay the customer down, raise the legs, loosen the collar, let in fresh air. Most people come round in under a minute; let them rest and sit up slowly. Not awake after one minute, abnormal breathing, a seizure or chest pain: call for emergency help.",
        "Pyörtyminen (yleistä vahauksessa, nopeasti noustessa, verta nähdessä): kun asiakasta huimaa, hän kalpenee tai hikoilee, auta hänet heti makuulle, nosta jalat koholle, löysää kaulusta ja päästä raitista ilmaa sisään. Useimmat virkoavat alle minuutissa; anna levätä ja nousta hitaasti istumaan. Jos asiakas ei herää minuutissa, hengittää poikkeavasti, kouristelee tai hänellä on rintakipua: soita hätänumeroon."
      ),
      l3(
        "Khi chính bạn bị dụng cụ đã dùng cho khách đâm hay cắt vào tay: để máu chảy ra nhẹ nhàng dưới vòi nước, đừng nặn mạnh, đừng mút vết thương; rửa bằng xà phòng và thật nhiều nước rồi băng lại. Báo ngay cho chủ tiệm và liên hệ bác sĩ hoặc y tế lao động ngay trong ngày — việc dự phòng bệnh lây qua đường máu chỉ có tác dụng khi làm sớm.",
        "If a tool used on a customer pricks or cuts you: let the wound bleed gently under running water, do not squeeze hard, do not suck it; wash with soap and plenty of water, then cover. Tell the owner immediately and contact a doctor or occupational health the same day — protection against blood-borne infections only works when it starts early.",
        "Jos asiakkaalle käytetty väline pistää tai viiltää sinua: anna haavan vuotaa kevyesti juoksevan veden alla, älä purista voimakkaasti äläkä ime haavaa; pese saippualla ja runsaalla vedellä ja peitä. Ilmoita heti omistajalle ja ota samana päivänä yhteys lääkäriin tai työterveyshuoltoon — veriteitse tarttuvien tautien estohoito tehoaa vain ajoissa aloitettuna."
      ),
      l3(
        "Sau phút đầu tiên: nói thật với khách — chuyện gì đã xảy ra, mình đã làm gì, khách nên theo dõi điều gì; xin lỗi chân thành, không đổ lỗi, không giấu. Ghi biên bản sự cố ngay trong ngày: ngày giờ, ai làm, chuyện gì, sản phẩm và số lô, đã xử lý ra sao, đã khuyên khách điều gì. Báo chủ tiệm; chủ tiệm xem có phải báo cho bảo hiểm hay cơ quan nào không, theo quy định nơi mình làm.",
        "After the first minute: tell the customer the truth — what happened, what you did, what to watch for; apologise sincerely, no blaming, no hiding. Write an incident record the same day: date and time, who was working, what happened, product and batch number, what you did, what you advised. Inform the owner, who checks whether the insurer or an authority must be told under local rules.",
        "Ensimmäisen minuutin jälkeen: kerro asiakkaalle totuus — mitä tapahtui, mitä teit ja mitä hänen kannattaa seurata; pahoittele vilpittömästi, älä syyttele äläkä salaa. Kirjaa tapahtuma samana päivänä: päivämäärä ja kellonaika, tekijä, mitä tapahtui, tuote ja eränumero, mitä teit ja mitä neuvoit. Ilmoita omistajalle, joka selvittää, onko asiasta ilmoitettava vakuutusyhtiölle tai viranomaiselle paikallisten sääntöjen mukaan."
      ),
    ],
    tips: [
      l3(
        "Túi sơ cứu của tiệm nên có: băng dán đủ cỡ, gạc vô trùng, băng cuộn, băng dính y tế, miếng che mắt, găng dùng một lần, kéo, nước muối để rửa mắt và rửa vết thương, và một tờ hướng dẫn sơ cứu. Không để thuốc uống trong đó. Đặt ở chỗ ai cũng biết, kiểm tra đều đặn và bổ sung ngay sau mỗi lần dùng.",
        "A salon first-aid kit should hold: plasters in several sizes, sterile gauze, rolled bandages, medical tape, eye pads, disposable gloves, scissors, saline for rinsing eyes and wounds, and a first-aid leaflet. No tablets or medicines. Keep it where everyone can find it, check it regularly and restock straight after use.",
        "Liikkeen ensiapulaukussa tulisi olla: erikokoisia laastareita, steriilejä sideharsotaitoksia, sidetarvikerullia, teippiä, silmälappuja, kertakäyttökäsineitä, sakset, keittosuolaliuosta silmien ja haavojen huuhteluun sekä ensiapuohje. Ei tabletteja tai lääkkeitä. Säilytä laukku paikassa, jonka kaikki tietävät, tarkista se säännöllisesti ja täydennä heti käytön jälkeen."
      ),
      l3(
        "Phần lớn sự cố tránh được từ trước: thử nhiệt độ sáp lên cổ tay mình trước khi thoa cho khách, che mắt khách thật kỹ khi dùng hoá chất gần mặt, đừng làm vội và đừng vừa làm vừa nhìn điện thoại. Ghi sẵn ở quầy số cấp cứu và địa chỉ của tiệm. Tiệm nào cũng nên có người đã học sơ cứu — hãy đi học một khoá và ôn lại sau vài năm.",
        "Most incidents can be prevented: test the wax temperature on your own wrist before it touches the customer, shield the customer's eyes well when working with chemicals near the face, don't rush and don't look at your phone while working. Keep the emergency number and the salon's address written at the desk. Every salon should have someone trained in first aid — take a course and refresh it every few years.",
        "Useimmat vahingot voi ehkäistä: kokeile vahan lämpö omaan ranteeseesi ennen kuin levität sitä asiakkaalle, suojaa asiakkaan silmät huolellisesti, kun käsittelet kemikaaleja kasvojen lähellä, älä kiirehdi äläkä katso puhelinta kesken työn. Pidä hätänumero ja liikkeen osoite näkyvillä tiskillä. Jokaisessa liikkeessä tulisi olla ensiapukoulutettu henkilö — käy kurssi ja kertaa taidot muutaman vuoden välein."
      ),
      l3(
        "Trong VaraaAi, ghi lại trong “Ghi chú nội bộ” của hồ sơ khách rằng đã có sự cố và đã khuyên khách điều gì — chỉ salon thấy. Biên bản đầy đủ thì giữ ở nơi chủ tiệm quy định.",
        "In VaraaAi, note on the customer's profile (internal notes — only the salon sees them) that there was an incident and what you advised. Keep the full incident record where the owner has decided.",
        "Kirjaa VaraaAissa asiakasprofiilin sisäisiin muistiinpanoihin (näkyvät vain salongille), että vahinko sattui ja mitä neuvoit. Varsinainen tapahtumaraportti säilytetään omistajan määräämässä paikassa."
      ),
    ],
    quiz: [
      {
        q: l3(
          "Sáp wax quá nóng làm đỏ rát cổ tay khách. Việc đầu tiên là gì?",
          "Wax that was too hot has left a red, stinging patch on a customer's wrist. What comes first?",
          "Liian kuuma vaha on jättänyt asiakkaan ranteeseen punaisen, kirvelevän läiskän. Mitä teet ensin?"
        ),
        options: [
          l3("Chườm đá trực tiếp lên chỗ bỏng", "Put ice straight on the burn", "Laitan jäätä suoraan palovamman päälle"),
          l3("Bôi kem dưỡng hoặc kem đánh răng cho dịu", "Soothe it with cream or toothpaste", "Rauhoitan voiteella tai hammastahnalla"),
          l3(
            "Xả dưới vòi nước mát ít nhất 10 phút, tốt nhất 20 phút",
            "Cool it under cool running water for at least 10 minutes, ideally 20",
            "Jäähdytän viileällä juoksevalla vedellä vähintään 10 minuuttia, mieluiten 20"
          ),
        ],
        answer: 2,
        why: l3(
          "Nước mát chảy liên tục lấy nhiệt ra khỏi da. Đá, kem, dầu hay kem đánh răng đều không nên dùng trên vết bỏng mới.",
          "Cool running water draws the heat out of the skin. Ice, creams, oils and toothpaste do not belong on a fresh burn.",
          "Viileä juokseva vesi poistaa lämmön ihosta. Jää, voiteet, öljyt ja hammastahna eivät kuulu tuoreeseen palovammaan."
        ),
      },
      {
        q: l3(
          "Một giọt keo nối mi bắn vào mắt khách. Bạn làm gì?",
          "A drop of lash adhesive gets into a customer's eye. What do you do?",
          "Pisara ripsiliimaa joutuu asiakkaan silmään. Mitä teet?"
        ),
        options: [
          l3(
            "Rửa ngay bằng nước sạch chảy nhẹ, liên tục ít nhất 20 phút, rồi đưa khách đi khám",
            "Rinse at once with gently running clean water for at least 20 minutes, then get medical help",
            "Huuhtelen heti kevyesti valuvalla puhtaalla vedellä vähintään 20 minuuttia ja ohjaan sitten hoitoon"
          ),
          l3("Bảo khách dụi mắt cho keo trôi ra", "Tell the customer to rub the eye so the glue comes out", "Kehotan asiakasta hieromaan silmää, jotta liima irtoaa"),
          l3("Lau bằng bông khô rồi làm tiếp", "Wipe with dry cotton and carry on", "Pyyhin kuivalla vanulla ja jatkan työtä"),
        ],
        answer: 0,
        why: l3(
          "Điều quan trọng nhất là rửa ngay và rửa lâu. Dụi mắt làm tổn thương nặng thêm; mang theo chai sản phẩm để bác sĩ đọc nhãn.",
          "What matters most is rinsing at once and for a long time. Rubbing makes the damage worse; take the product bottle along so the doctor can read the label.",
          "Tärkeintä on huuhdella heti ja pitkään. Hierominen pahentaa vauriota; ota tuotepullo mukaan, jotta lääkäri voi lukea etiketin."
        ),
      },
      {
        q: l3(
          "Cây kềm vừa cắt da cho khách đâm vào ngón tay của chính bạn. Điều nào đúng?",
          "The nippers you have just used on a customer cut your own finger. Which is right?",
          "Asiakkaalle juuri käyttämäsi kynsinauhapihdit viiltävät omaa sormeasi. Mikä on oikein?"
        ),
        options: [
          l3("Mút vết thương rồi dán băng, làm tiếp", "Suck the wound, put on a plaster and carry on", "Imen haavaa, laitan laastarin ja jatkan"),
          l3(
            "Rửa bằng xà phòng và nhiều nước, băng lại, báo chủ tiệm và liên hệ bác sĩ hoặc y tế lao động ngay trong ngày",
            "Wash with soap and plenty of water, cover it, tell the owner and contact a doctor or occupational health the same day",
            "Pesen saippualla ja runsaalla vedellä, peitän haavan, ilmoitan omistajalle ja otan samana päivänä yhteyttä lääkäriin tai työterveyshuoltoon"
          ),
          l3("Xịt cồn rồi coi như xong, vì vết đâm rất nhỏ", "Spray alcohol on it and forget it; the cut is tiny", "Suihkautan desinfiointiainetta ja unohdan asian, haava on niin pieni"),
        ],
        answer: 1,
        why: l3(
          "Có những bệnh lây qua đường máu, và việc dự phòng chỉ có tác dụng khi bắt đầu sớm. Đừng tặc lưỡi cho qua.",
          "Some infections travel through blood, and preventive treatment only works when it starts early. Do not shrug it off.",
          "Jotkin taudit tarttuvat veren välityksellä, ja estohoito tehoaa vain ajoissa aloitettuna. Älä ohita asiaa olankohautuksella."
        ),
      },
    ],
  },
  {
    slug: "ve-sinh-tiem",
    course: "p-safety",
    title: l3("Vệ sinh tiệm hằng ngày và kế hoạch tự kiểm soát", "Daily salon cleaning and the in-house control plan", "Liikkeen päivittäinen siivous ja omavalvontasuunnitelma"),
    summary: l3(
      "Lấy hướng dẫn của thành phố Helsinki (Phần Lan) làm ví dụ: thông báo trước khi mở tiệm, kế hoạch tự kiểm soát (omavalvontasuunnitelma) gồm những gì, kế hoạch lau dọn, lau sạch rồi mới khử khuẩn, giặt khăn và đồ vải, chỗ rửa cạnh chỗ làm, thông gió, chậu cây, rác và vật sắc nhọn — và cách biến kế hoạch thành danh sách kiểm tra lúc mở và đóng cửa.",
      "Using the City of Helsinki's guidance (Finland) as the example: notifying before you open, what goes into the in-house control plan (omavalvontasuunnitelma), the cleaning plan, cleaning before disinfecting, cloths and textiles, a water point by the workstation, ventilation, indoor plants, waste and sharps — and how the plan becomes an opening and closing checklist.",
      "Esimerkkinä Helsingin kaupungin ohje: ilmoitus ennen toiminnan aloittamista, mitä omavalvontasuunnitelmaan kuuluu, siivoussuunnitelma, mekaaninen puhdistus ennen desinfiointia, siivousliinat ja tekstiilit, vesipiste työpisteen vieressä, ilmanvaihto, huonekasvit, jätteet ja terävät jätteet — ja miten suunnitelmasta tulee avaamisen ja sulkemisen tarkistuslista."
    ),
    video: video("ve-sinh-tiem", 324, "2026-11-17"),
    notice: l3(
      "Quy định khác nhau theo từng nước và thành phố. Bài này lấy ví dụ từ hướng dẫn của thành phố Helsinki (Phần Lan, bản 5/2025); lịch lau dọn và danh sách kiểm tra trong bài là cách làm tốt hay gặp, không phải quy định. Hãy hỏi cơ quan y tế nơi bạn làm việc để biết yêu cầu chính xác.",
      "Rules differ by country and city. This lesson takes its examples from the City of Helsinki's guidance (Finland, version 5/2025); the cleaning schedule and checklists shown are common good practice, not rules. Ask the health authority where you work for the exact requirements.",
      "Määräykset vaihtelevat maittain ja kunnittain. Tunnin esimerkit ovat Helsingin kaupungin ohjeesta (versio 5/2025); siivousaikataulu ja tarkistuslistat ovat yleisiä hyviä käytäntöjä, eivät määräyksiä. Tarkista tarkat vaatimukset oman kuntasi terveydensuojeluviranomaiselta."
    ),
    sources: [HELSINKI_HYGIENE],
    related: ["tien-ich-nhom", "nhan-vien", "gio-mo-cua"],
    steps: [
      l3(
        "Ở Helsinki, phần lớn tiệm làm đẹp phải gửi thông báo cho thành phố ít nhất 30 ngày trước khi bắt đầu (tiệm tóc chỉ khi có làm dịch vụ trên da), kể cả khi làm tại nhà hay làm tự do; báo lại khi thay đổi lớn, đổi chủ hay đóng cửa. Sau đó thành phố kiểm tra định kỳ và có thu phí.",
        "In Helsinki most beauty premises must notify the city at least 30 days before starting (barbers and hair salons only if they offer skin treatments), including home-based and freelance work; notify again after substantial changes, a change of operator or closing down. The city then inspects regularly, for a fee.",
        "Helsingissä useimpien kauneushoitoloiden on tehtävä ilmoitus kaupungille vähintään 30 päivää ennen toiminnan aloittamista (parturi-kampaamoiden vain, jos ne tekevät ihonkäsittelyjä), myös kotona tai freelancerina työskenneltäessä; uusi ilmoitus olennaisista muutoksista, toiminnanharjoittajan vaihtuessa ja lopetettaessa. Kaupunki tarkastaa toimintaa säännöllisesti maksua vastaan."
      ),
      l3(
        "Tự kiểm soát nghĩa là chủ tiệm tự tìm ra những nguy cơ cho sức khỏe trong tiệm và nói được mình đã làm gì để ngăn chúng. Tiệm phải có kế hoạch tự kiểm soát và làm theo nó; thành phố khuyên viết ra giấy. Tiệm tóc vẫn phải tự kiểm soát dù không phải thông báo.",
        "In-house control means the operator identifies the health risks on the premises and can show what has been done about them. Premises must have an in-house control plan and follow it; the city recommends writing it down. Hair salons must carry out in-house control even without the notification duty.",
        "Omavalvonta tarkoittaa, että toiminnanharjoittaja tunnistaa tilojen ja toiminnan terveysriskit ja pystyy kertomaan, mitä niille on tehty. Kohteessa on oltava omavalvontasuunnitelma, jota noudatetaan; kaupunki suosittelee sen laatimista kirjallisena. Parturi-kampaamoiden on tehtävä omavalvontaa, vaikka ilmoitusvelvollisuutta ei olisi."
      ),
      l3(
        "Kế hoạch gồm: mô tả tiệm (dịch vụ, giờ mở cửa, số người, chỗ rửa, nhà vệ sinh, máy móc); cách làm sạch, khử khuẩn, tiệt trùng dụng cụ; các nguy cơ (khách nhạy cảm, côn trùng và chuột, chỗ cần sửa, dịch bệnh); và cách phòng (hướng dẫn nhân viên, kế hoạch lau dọn, bảo trì thông gió, kiểm tra chỉ thị tiệt trùng). Cập nhật khi tiệm thay đổi.",
        "The plan covers: a description of the premises (services, opening hours, number of people, water points, toilets, equipment); how tools are cleaned, disinfected and sterilised; the risks (sensitive customers, pests, repairs needed, epidemics); and prevention (staff orientation, the cleaning plan, ventilation maintenance, sterilisation indicators). Update it when things change.",
        "Suunnitelmassa kuvataan toiminta ja tilat (palvelut, aukioloajat, henkilömäärä, vesipisteet, WC:t, laitteet); välineiden puhdistus, desinfiointi ja sterilointi; riskit (herkät asiakkaat, tuholaiset, korjaustarpeet, epidemiat) sekä niiden ehkäisy (perehdytys, siivoussuunnitelma, ilmanvaihdon huolto, sterilointi-indikaattorit). Päivitä suunnitelma muutosten myötä."
      ),
      l3(
        "Kế hoạch lau dọn nên viết ra và để trong kế hoạch tự kiểm soát: lau cái gì, bao lâu một lần, bằng dụng cụ và chất gì, ai làm.",
        "Write the cleaning plan down and add it to the in-house control plan: what is cleaned, how often, with which equipment and agents, and by whom.",
        "Laadi siivoussuunnitelma kirjallisena ja liitä se omavalvontasuunnitelmaan: mitä siivotaan, kuinka usein, millä välineillä ja aineilla ja kuka siivoaa."
      ),
      l3(
        "Lau sạch trước rồi mới khử khuẩn, vì chất bẩn làm khử khuẩn mất tác dụng. Bề mặt không chạm vùng da đang làm: lau sạch là đủ. Bề mặt chạm da khách: lau sạch rồi khử khuẩn. Chỗ dính máu luôn phải khử khuẩn.",
        "Clean first, then disinfect — dirt makes disinfection ineffective. Surfaces that don't touch the treated skin: cleaning is enough. Surfaces that touch the customer's skin: clean, then disinfect. Anything with blood on it is always disinfected.",
        "Puhdista ensin mekaanisesti, sitten desinfioi — lika heikentää desinfiointia. Pinnat, jotka eivät kosketa käsiteltävää ihoa: mekaaninen puhdistus riittää. Asiakkaan ihoa koskettavat pinnat: puhdistus ja desinfiointi. Veriset pinnat desinfioidaan aina."
      ),
      l3(
        "Khăn lau giặt sau mỗi lần dùng, ít nhất 60 °C, tốt nhất 90 °C, hoặc dùng khăn dùng một lần. Dụng cụ lau dọn cất trong tủ riêng có cửa, không để dưới sàn, không cất trong nhà vệ sinh; nhà vệ sinh có bộ dụng cụ lau riêng, dễ phân biệt (ví dụ theo màu).",
        "Wash cleaning cloths after use at least at 60 °C, preferably 90 °C, or use disposable ones. Keep cleaning equipment in its own cupboard with doors, off the floor and never in the toilet; the toilet has its own cleaning equipment that is easy to tell apart (for example by colour).",
        "Pese siivousliinat käytön jälkeen vähintään 60 °C:ssa, mieluiten 90 °C:ssa, tai käytä kertakäyttöisiä. Säilytä siivousvälineet omassa ovellisessa kaapissa, ei lattialla eikä WC:ssä; WC:lle omat, helposti erotettavat siivousvälineet (esim. värikoodaus)."
      ),
      l3(
        "Khăn và đồ vải giặt, sấy bằng máy; máy giặt không đặt trong nhà vệ sinh. Đồ sạch và đồ bẩn cất riêng: khăn sạch trong tủ đóng cửa, khăn đã dùng trong thùng có nắp.",
        "Wash and dry towels and textiles in a washing machine, which must not stand in the toilet. Store clean and dirty textiles separately: clean ones in a closed cupboard, used ones in a lidded container.",
        "Pese ja kuivaa tekstiilit pesukoneessa, joka ei saa olla WC:ssä. Säilytä puhtaat ja likaiset tekstiilit erillään: puhtaat suljetussa kaapissa, käytetyt kannellisessa astiassa."
      ),
      l3(
        "Cạnh mỗi chỗ làm (hoặc ngay sát) có chỗ rửa riêng để rửa tay và dụng cụ, đi tới không qua cửa đóng; chỉ có một chỗ rửa thì nên là bồn đôi. Rửa dụng cụ xong, rửa và khử khuẩn bồn trước khi dùng cho khách.",
        "Each workstation needs its own water point right next to it for hands and tools, with no closed door in between; if there is only one, it should have two basins. After washing tools, wash and disinfect the basin before using it for customer care.",
        "Jokaisen työpisteen vieressä tai välittömässä läheisyydessä on oltava oma vesipiste käsien ja välineiden pesuun ilman suljettua ovea välissä; jos vesipisteitä on vain yksi, siinä tulisi olla kaksi allasta. Pese ja desinfioi allas välinehuollon jälkeen ennen asiakastyötä."
      ),
      l3(
        "Thông gió ít nhất 6 lít mỗi giây cho mỗi người; nên có thông gió cơ học khi có hơn hai khách cùng lúc hoặc dùng hóa chất mùi mạnh; bàn làm móng bột cần hút tại chỗ. Không nên để chậu cây trong tiệm. Thùng rác nguyên vẹn, có nắp, đổ đủ thường xuyên để nắp luôn đóng được; kim, dao vào hộp đựng vật sắc nhọn làm sẵn rồi mang tới điểm thu gom được phép.",
        "Ventilation of at least 6 litres per second per person; mechanical supply and exhaust is recommended with more than two customers at once or strong-smelling chemicals; acrylic workstations need local exhaust. Indoor plants should not be kept. Bins must be intact, lidded and emptied often enough that the lid always closes; needles and blades go into factory-made sharps containers and to an authorised collection point.",
        "Ilmanvaihto vähintään 6 l/s henkilöä kohden; koneellinen tulo- ja poistoilmanvaihto on suositeltava, jos asiakkaita on yli kaksi kerralla tai käytetään voimakashajuisia kemikaaleja; akryylityöpisteessä on oltava kohdepoisto. Huonekasveja ei tulisi pitää. Jäteastiat ehjiä ja kannellisia ja ne tyhjennetään niin usein, että kansi menee aina kiinni; neulat ja terät tehdasvalmisteiseen riskijäteastiaan ja hyväksyttyyn vastaanottopisteeseen."
      ),
      l3(
        "Biến kế hoạch thành thói quen: một danh sách ngắn lúc mở cửa (thông gió, nước nóng lạnh, xà phòng và khăn giấy, túi tiệt trùng còn hạn, thùng rác đã đổ) và lúc đóng cửa (lau bàn, lau sàn, giặt khăn, đổ rác, rửa bồn rửa dụng cụ, ghi điều bất thường). Người làm tích và ký tên; chủ tiệm xem lại mỗi tuần.",
        "Turn the plan into a habit: a short opening checklist (ventilation, hot and cold water, soap and paper towels, sterile pouches in date, bins emptied) and a closing one (wipe tables, mop, wash cloths, empty bins, clean the tool basin, note anything unusual). Whoever does it ticks and signs; the owner reviews it every week.",
        "Tee suunnitelmasta tapa: lyhyt avauslista (ilmanvaihto, kuuma ja kylmä vesi, saippua ja paperipyyhkeet, sterilointipussit voimassa, roskat tyhjennetty) ja sulkemislista (pöydät, lattia, liinojen pesu, roskat, välinealtaan pesu, poikkeamien kirjaus). Tekijä kuittaa ja allekirjoittaa; omistaja käy listat läpi viikoittain."
      ),
    ],
    tips: [
      l3(
        "Xử lý dụng cụ, rửa tay và găng tay, và xử lý sự cố có bài riêng trong khóa này — kế hoạch tự kiểm soát chỉ cần ghi tiệm làm theo quy trình nào và ai chịu trách nhiệm.",
        "Tool reprocessing, hand hygiene and gloves, and incidents have their own lessons in this course — the in-house control plan only needs to say which routine the salon follows and who is responsible.",
        "Välinehuollolla, käsihygienialla ja käsineillä sekä vahinkotilanteilla on tällä kurssilla omat tuntinsa — omavalvontasuunnitelmaan riittää, mitä käytäntöä liike noudattaa ja kuka vastaa siitä."
      ),
      l3(
        "Trong VaraaAi, dùng “Tiện ích” → “Thông báo” để nhắc cả nhóm danh sách mở và đóng cửa, và phần “Đào tạo” để nhân viên mới đọc kế hoạch tự kiểm soát ngay ngày đầu.",
        "In VaraaAi, use the team hub's notices to remind everyone of the opening and closing checklists, and its training section so new staff read the in-house control plan on their first day.",
        "VaraaAi:ssa voit muistuttaa tiimiä avaus- ja sulkemislistoista tiimin työtilan tiedotteilla ja jakaa omavalvontasuunnitelman uusille työntekijöille koulutusosiossa heti ensimmäisenä päivänä."
      ),
    ],
    quiz: [
      {
        q: l3("Một mặt bàn có chạm vào da khách. Thứ tự đúng là gì?", "A surface touches the customer's skin. What is the right order?", "Pinta koskettaa asiakkaan ihoa. Mikä on oikea järjestys?"),
        options: [
          l3("Xịt khử khuẩn thẳng lên, không cần lau", "Spray disinfectant straight on, no cleaning needed", "Desinfiointiaine suoraan pinnalle, puhdistusta ei tarvita"),
          l3("Lau sạch trước, rồi khử khuẩn", "Clean it first, then disinfect", "Ensin puhdistus, sitten desinfiointi"),
          l3("Chỉ lau khô là đủ", "Just wipe it dry", "Pelkkä kuivaus riittää"),
        ],
        answer: 1,
        why: l3(
          "Chất bẩn làm dung dịch khử khuẩn mất tác dụng, nên luôn lau sạch trước.",
          "Dirt makes disinfectant ineffective, so always clean first.",
          "Lika heikentää desinfiointiainetta, joten puhdista aina ensin."
        ),
      },
      {
        q: l3("Theo hướng dẫn của Helsinki, khăn lau dọn nên giặt ở nhiệt độ nào?", "Under Helsinki's guidance, at what temperature are cleaning cloths washed?", "Missä lämpötilassa siivousliinat pestään Helsingin ohjeen mukaan?"),
        options: [
          l3("30 °C để khăn bền hơn", "30 °C so they last longer", "30 °C, jotta ne kestävät pidempään"),
          l3("Không cần giặt nếu xịt cồn", "No need to wash if sprayed with alcohol", "Ei tarvitse pestä, jos ne suihkutetaan alkoholilla"),
          l3("Ít nhất 60 °C, tốt nhất 90 °C, hoặc dùng khăn dùng một lần", "At least 60 °C, preferably 90 °C, or use disposable cloths", "Vähintään 60 °C, mieluiten 90 °C, tai kertakäyttöiset liinat"),
        ],
        answer: 2,
        why: l3(
          "Nhiệt độ cao diệt được vi sinh vật trong khăn; khăn dùng một lần là lựa chọn thay thế.",
          "High temperatures kill the microbes in the cloths; disposable cloths are the alternative.",
          "Korkea lämpötila tuhoaa liinojen mikrobit; kertakäyttöliinat ovat vaihtoehto."
        ),
      },
      {
        q: l3("Kế hoạch tự kiểm soát dùng để làm gì?", "What is the in-house control plan for?", "Mihin omavalvontasuunnitelmaa käytetään?"),
        options: [
          l3("Ghi ra những nguy cơ cho sức khỏe trong tiệm và cách tiệm phòng chúng, rồi làm đúng theo đó", "Writing down the health risks in the salon and how they are prevented — and following it", "Liikkeen terveysriskien ja niiden ehkäisyn kirjaamiseen — ja sen noudattamiseen"),
          l3("Chỉ để đưa cho thanh tra xem, ngoài ra không cần dùng", "Only to show the inspector; otherwise it isn't used", "Vain tarkastajalle näytettäväksi; muuten sitä ei käytetä"),
          l3("Thay cho việc thông báo với thành phố", "It replaces notifying the city", "Se korvaa ilmoituksen kaupungille"),
        ],
        answer: 0,
        why: l3(
          "Kế hoạch phải được làm theo hằng ngày; danh sách kiểm tra lúc mở và đóng cửa là cách dễ nhất để nó sống.",
          "The plan has to be followed every day; opening and closing checklists are the easiest way to keep it alive.",
          "Suunnitelmaa on noudatettava päivittäin; avaus- ja sulkemislistat ovat helpoin tapa pitää se elävänä."
        ),
      },
    ],
  },

  /* ================= nails ================= */
  {
    slug: "gel-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("Sơn gel: hiểu đúng để làm bền", "Gel polish: understand it to make it last", "Geelilakka: ymmärrä, niin se kestää"),
    summary: l3(
      "Người thầy ngồi xuống kể chuyện nghề: cấu tạo móng, vì sao gel bám và vì sao bong, gel chín như thế nào, dị ứng, quy định EU và kinh nghiệm xử lý với khách.",
      "A mentor's talk about the trade: how the nail is built, why gel holds and why it lifts, how curing works, allergy, EU rules and what experience teaches about customers.",
      "Mentorin puheenvuoro ammatista: kynnen rakenne, miksi geeli pysyy ja miksi se irtoaa, miten kovettuminen toimii, allergia, EU-säännöt ja kokemuksen opit asiakastyöstä."
    ),
    video: video("gel-hieu-dung", 300, "2026-11-16"),
    notice: l3(
      "Từ ngày 1/9/2025, EU cấm chất TPO trong sản phẩm làm móng và tiệm không được dùng tiếp hàng đã mua từ trước. Nếu bạn hoặc khách bị ngứa, đỏ, nổi mụn nước quanh móng: ngừng tiếp xúc với gel và đi khám bác sĩ da liễu.",
      "Since 1 September 2025 the EU bans TPO in nail products, and salons may not use up stock bought earlier. If you or a customer get itching, redness or blisters around the nails: stop contact with gel and see a dermatologist.",
      "EU on kieltänyt TPO:n kynsituotteissa 1.9.2025 alkaen, eikä aiemmin ostettua varastoa saa käyttää loppuun. Jos sinulle tai asiakkaalle tulee kutinaa, punoitusta tai rakkuloita kynsien ympärille: lopeta geelin käsittely ja hakeudu ihotautilääkärille."
    ),
    sources: [EU_TPO],
    related: ["dich-vu", "bang-gia", "khach-hang"],
    steps: [
      l3(
        "Gel không ăn vào móng, nó chỉ bám trên bề mặt bản móng. Bề mặt phải đủ ba điều kiện: sạch da chết, sạch dầu và khô.",
        "Gel does not soak into the nail; it only grips the surface of the nail plate. That surface needs three things: no dead skin, no oil, and dry.",
        "Geeli ei imeydy kynteen, se tarttuu vain kynsilevyn pintaan. Pinnan on oltava puhdas kuolleesta ihosta, rasvaton ja kuiva."
      ),
      l3(
        "Lớp da mỏng, trong suốt bám trên mặt móng là da chết cần lấy đi. Phần da sống phía trên chân móng bịt kín, bảo vệ mầm móng — không cắt. Dũa hay ấn mạnh ở gốc móng có thể làm móng mọc gợn sóng.",
        "The thin transparent film on the nail plate is dead skin to remove. The living fold above the base of the nail seals and protects the matrix — never cut it. Filing or pressing hard at the base can make the nail grow ridged.",
        "Kynnen pinnalla oleva ohut läpinäkyvä kalvo on kuollutta ihoa, joka poistetaan. Kynnen tyven yläpuolinen elävä ihopoimu suojaa kynnen kasvualuetta — sitä ei leikata. Voimakas viilaus tai painaminen tyvessä voi tehdä kynnestä uurteisen."
      ),
      l3(
        "Bản móng hút nước, nở ra rồi co lại khi khô, còn gel thì không co theo. Vì vậy làm khô, không ngâm tay trước khi sơn gel. Chà nhám chỉ để mất độ bóng; chà mạnh chỉ làm móng mỏng đi.",
        "The nail plate absorbs water, swells and shrinks again as it dries; gel does not. So work dry — no soaking before gel. Buff only to remove the shine; buffing harder just thins the nail.",
        "Kynsilevy imee vettä, turpoaa ja kutistuu kuivuessaan; geeli ei. Työskentele siis kuivana — ei liotusta ennen geeliä. Hio vain kiilto pois; voimakas hionta vain ohentaa kynttä."
      ),
      l3(
        "Gel chín nhờ chất khơi mào quang gặp đúng loại ánh sáng. Mỗi hãng pha gel cho một loại đèn và một thời gian nhất định. Đèn khác hãng hoặc đèn cũ đã yếu: mặt trên cứng nhưng bên dưới chưa chín.",
        "Gel cures when its photoinitiator meets the right light. Each brand formulates for a specific lamp and time. With another brand's lamp or an old, weak one, the surface hardens while the gel underneath stays under-cured.",
        "Geeli kovettuu, kun sen fotoinitiaattori kohtaa oikeanlaisen valon. Jokainen merkki on suunniteltu tietylle lampulle ja ajalle. Toisen merkin tai vanhan, heikon lampun kanssa pinta kovettuu, mutta alla oleva geeli jää vajaaksi."
      ),
      l3(
        "Sơn mỏng: ánh sáng không xuyên hết lớp gel dày, mặt trên chín trước, co lại và kéo nhăn lớp bên dưới. Khách thấy nóng rát trong đèn: cho rút tay ra vài giây rồi cho vào lại, lần sau sơn mỏng hơn.",
        "Thin coats: light can't get through a thick layer, so the top cures first, shrinks and wrinkles what is still soft underneath. If the customer feels burning in the lamp, let them take the hand out for a few seconds, then back in — and go thinner next time.",
        "Ohuet kerrokset: valo ei läpäise paksua kerrosta, jolloin pinta kovettuu ensin, kutistuu ja rypistää alla olevan pehmeän geelin. Jos asiakas tuntee polttoa lampussa, anna ottaa käsi hetkeksi pois ja laittaa takaisin — ja tee ensi kerralla ohuempi kerros."
      ),
      l3(
        "Lớp dính trên bề mặt sau khi hơ là gel chưa chín vì tiếp xúc với không khí — đừng để nó chạm vào da khách hay da mình.",
        "The sticky layer left after curing is gel that could not cure because of the air — keep it off the customer's skin and your own.",
        "Kovetuksen jälkeinen tahmea kerros on geeliä, joka ei kovettunut ilman vuoksi — älä päästä sitä asiakkaan tai omalle ihollesi."
      ),
      l3(
        "Dị ứng gel đến chậm, sau nhiều tháng hay nhiều năm, và thường là suốt đời. Quy tắc: gel chưa chín không chạm da; đeo găng nitrile và thay khi dính gel; lau cán cọ, cổ chai; không lấy tay quệt gel thừa; luôn hơ đủ thời gian.",
        "Gel allergy comes slowly, after months or years, and is usually for life. The rules: uncured gel never touches skin; wear nitrile gloves and change them when gel gets on them; wipe brush handles and bottle necks; never wipe excess gel with a finger; always cure for the full time.",
        "Geeliallergia kehittyy hitaasti, kuukausien tai vuosien aikana, ja on yleensä elinikäinen. Säännöt: kovettumaton geeli ei koske ihoon; käytä nitriilikäsineitä ja vaihda ne, kun niihin tulee geeliä; pyyhi siveltimen varret ja pullonsuut; älä pyyhi ylimääräistä geeliä sormella; koveta aina täysi aika."
      ),
      l3(
        "Với khách: nhìn và hỏi trước khi làm (móng đổi màu, dày, bở, da sưng đỏ thì không làm, khuyên đi khám); nói thật gel đẹp trong 2–3 tuần; dặn khách không tự cạy gel.",
        "With customers: look and ask before you start (discoloured, thick or crumbling nails, red swollen skin — don't treat, suggest a doctor); be honest that gel looks good for 2–3 weeks; tell them never to peel it off.",
        "Asiakkaan kanssa: katso ja kysy ennen aloittamista (värjäytynyt, paksu tai mureneva kynsi, punainen turvonnut iho — älä tee hoitoa, ohjaa lääkäriin); kerro rehellisesti, että geeli on hyvä 2–3 viikkoa; neuvo, ettei geeliä saa repiä irti."
      ),
      l3(
        "Khi khách quay lại vì bong, xem gel bong ở đâu: ở chân móng — thường do còn da; ở đầu móng — chưa bịt đầu móng hoặc khách dùng móng để cạy, mở đồ; bong cả mảng — còn dầu, còn ẩm hoặc gel chưa chín.",
        "When a customer comes back with lifting, look at where: at the cuticle — usually skin left on the plate; at the tip — the free edge wasn't capped, or the nails were used as tools; in whole sheets — oil, moisture or under-cured gel.",
        "Kun asiakas palaa irtoamisen takia, katso mistä geeli irtoaa: kynsinauhan vierestä — yleensä pintaan jäänyt iho; kärjestä — kärkeä ei suljettu tai kynsiä käytettiin työkaluina; kokonaisina levyinä — rasva, kosteus tai vajaa kovettuminen."
      ),
    ],
    tips: [
      l3(
        "Các bác sĩ da liễu cảnh báo: dị ứng với gel có thể gây khó khăn về sau khi làm răng hoặc thay khớp, vì các vật liệu đó cùng họ với gel.",
        "Dermatologists warn that an allergy to gel can cause problems later with dental work or joint replacement, because those materials belong to the same family.",
        "Ihotautilääkärit varoittavat, että geeliallergia voi myöhemmin vaikeuttaa hammashoitoa tai tekonivelleikkausta, koska niissä käytetään saman aineryhmän materiaaleja."
      ),
      l3(
        "Mua gel từ nhà cung cấp trong châu Âu, có nhãn và danh sách thành phần rõ ràng. Hàng trôi nổi giá rẻ thì người gánh rủi ro là bạn và khách của bạn.",
        "Buy gel from suppliers in Europe with proper labels and ingredient lists. With cheap grey-market products, the risk lands on you and your customers.",
        "Osta geelit eurooppalaisilta toimittajilta, joiden tuotteissa on asianmukaiset merkinnät ja ainesosaluettelot. Halvoissa harmaatuontituotteissa riskin kannat sinä ja asiakkaasi."
      ),
    ],
    quiz: [
      {
        q: l3("Gel bong ở đầu móng thường là do đâu?", "Gel lifting at the tip usually comes from what?", "Mistä geelin irtoaminen kärjestä yleensä johtuu?"),
        options: [
          l3("Còn lớp da mỏng ở chân móng", "Skin left at the cuticle", "Kynsinauhan viereen jääneestä ihosta"),
          l3("Chưa bịt đầu móng, hoặc khách dùng móng để cạy, mở đồ", "The free edge wasn't capped, or the nails were used as tools", "Kärkeä ei suljettu tai kynsiä käytettiin työkaluina"),
          l3("Đèn quá mạnh", "A lamp that is too strong", "Liian voimakkaasta lampusta"),
        ],
        answer: 1,
        why: l3(
          "Mỗi kiểu bong chỉ ra một nguyên nhân: chân móng — còn da; đầu móng — chưa bịt đầu; cả mảng — dầu, ẩm hoặc gel chưa chín.",
          "Each kind of lifting points to a cause: cuticle — skin; tip — no capping; whole sheets — oil, moisture or under-cured gel.",
          "Jokainen irtoamistapa kertoo syyn: kynsinauha — iho; kärki — sulkematta jäänyt kärki; kokonaiset levyt — rasva, kosteus tai vajaa kovettuminen."
        ),
      },
      {
        q: l3("Vì sao phải sơn gel thật mỏng?", "Why must gel go on in thin coats?", "Miksi geeli levitetään ohuina kerroksina?"),
        options: [
          l3("Để tiết kiệm gel", "To save gel", "Geelin säästämiseksi"),
          l3("Vì ánh sáng không xuyên hết lớp dày: gel nhăn và không chín bên dưới", "Light can't get through a thick layer: it wrinkles and stays under-cured below", "Valo ei läpäise paksua kerrosta: se rypistyy ja jää alta kovettumatta"),
          l3("Để gel tự khô ngoài không khí", "So that it air-dries", "Jotta se kuivuu ilmassa"),
        ],
        answer: 1,
        why: l3(
          "Mặt trên chín trước, co lại và kéo nhăn lớp còn lỏng bên dưới; gel chưa chín dễ bong và dễ gây dị ứng.",
          "The top cures first, shrinks and wrinkles the soft gel below; under-cured gel lifts and is more likely to cause allergy.",
          "Pinta kovettuu ensin, kutistuu ja rypistää alla olevan pehmeän geelin; vajaasti kovettunut geeli irtoaa ja allergisoi herkemmin."
        ),
      },
      {
        q: l3("Lớp dính trên bề mặt sau khi hơ đèn là gì?", "What is the sticky layer left after curing?", "Mikä kovetuksen jälkeinen tahmea kerros on?"),
        options: [
          l3("Gel bị hỏng, phải làm lại", "Spoiled gel — start again", "Pilalle mennyttä geeliä — aloita alusta"),
          l3("Dầu dưỡng tiết ra từ móng", "Oil coming out of the nail", "Kynnestä erittyvää öljyä"),
          l3("Gel chưa chín vì tiếp xúc với không khí — không để chạm da", "Gel left uncured by contact with air — keep it off the skin", "Ilman vuoksi kovettumatta jäänyttä geeliä — älä päästä iholle"),
        ],
        answer: 2,
        why: l3(
          "Nó vẫn là gel chưa chín: lau bằng dung dịch lau móng và đừng để chạm vào da khách hay da mình.",
          "It is still uncured gel: wipe it with cleanser and keep it off the customer's skin and your own.",
          "Se on yhä kovettumatonta geeliä: pyyhi puhdistusaineella äläkä päästä sitä asiakkaan tai omalle ihollesi."
        ),
      },
    ],
  },
  {
    slug: "son-gel",
    course: "p-nail",
    style: "practice",
    title: l3("Sơn gel: thực hành từ A đến Z", "Gel polish: step-by-step practice from A to Z", "Geelilakkaus: käytäntö alusta loppuun"),
    summary: l3(
      "Một bộ sơn gel hoàn chỉnh: kiểm tra móng, dũa form, xử lý da, chà nhám, làm sạch, lớp base, hai lớp màu, lớp top và dầu dưỡng — bền 2–3 tuần.",
      "A complete gel polish manicure: checking the nails, shaping, cuticle work, buffing, cleansing, base, two colour coats, top coat and oil — lasting 2–3 weeks.",
      "Koko geelilakkaus: kynsien tarkastus, muotoilu, kynsinauhat, kevyt hionta, puhdistus, pohja, kaksi värikerrosta, päällyslakka ja öljy — kestää 2–3 viikkoa."
    ),
    video: video("son-gel", 285, "2026-11-16"),
    notice: l3(
      "Không để gel chưa hơ chạm vào da, dùng đúng loại đèn và thời gian của hãng gel, và ngừng làm nếu khách bị ngứa, đỏ hay sưng. Từ ngày 1/9/2025, EU cấm chất TPO trong sản phẩm làm móng — hãy kiểm tra thành phần gel bạn đang dùng.",
      "Keep uncured gel off the skin, use the lamp and curing time your gel brand specifies, and stop if the customer gets itching, redness or swelling. Since 1 September 2025 the EU bans TPO in nail products — check the ingredients of the gels you use.",
      "Älä päästä kovettumatonta geeliä iholle, käytä geelimerkin ilmoittamaa lamppua ja kovetusaikaa ja lopeta, jos asiakkaalle tulee kutinaa, punoitusta tai turvotusta. EU on kieltänyt TPO:n kynsituotteissa 1.9.2025 alkaen — tarkista käyttämiesi geelien ainesosat."
    ),
    sources: [EU_TPO],
    related: ["dich-vu", "bang-gia", "lich-hen"],
    steps: [
      l3(
        "Rửa và sát khuẩn tay cho mình và cho khách, rồi xem kỹ móng và vùng da quanh móng. Móng đổi màu xanh/vàng, dày, bở vụn, da sưng đỏ, có mủ hay vết thương hở: không làm, khuyên khách đi khám. Hỏi khách đã từng bị ngứa, đỏ da hay bong móng sau khi làm gel chưa.",
        "Wash and disinfect your hands and the customer's, then look closely at the nails and the skin around them. Green or yellow, thickened or crumbling nails, red swollen skin, pus or open wounds: don't treat, suggest a doctor. Ask whether gel has ever caused itching, redness or lifting nails.",
        "Pese ja desinfioi omat ja asiakkaan kädet ja tarkasta kynnet ja ympäröivä iho. Vihreä tai keltainen, paksuuntunut tai mureneva kynsi, punainen turvonnut iho, märkä tai avohaava: älä tee hoitoa, ohjaa lääkäriin. Kysy, onko geeli aiemmin aiheuttanut kutinaa, punoitusta tai kynnen irtoamista."
      ),
      l3(
        "Chuẩn bị: cây đẩy da và kềm đã tiệt trùng còn trong túi, dũa 180 và phao chà mịn mới, bông gạc không xơ, dung dịch lau móng, gel base – màu – top, đèn LED, que gỗ, dầu dưỡng, găng tay.",
        "Set out: sterilised pusher and nippers still in their pouch, a new 180 file and fine buffer, lint-free wipes, cleanser, base, colour and top gel, LED lamp, wooden stick, cuticle oil, gloves.",
        "Ota esille: steriloidut kynsinauhatyökalut pussissaan, uusi 180-viila ja hieno hiontapala, nukkaamattomat laput, puhdistusaine, pohja-, väri- ja päällysgeeli, LED-lamppu, puutikku, kynsinauhaöljy ja käsineet."
      ),
      l3(
        "Dũa form: đặt dũa hơi nghiêng dưới đầu móng, dũa một chiều từ cạnh bên vào giữa. Không kéo cưa qua lại.",
        "Shape: hold the file slightly angled under the free edge and file in one direction, from the side to the centre. No sawing back and forth.",
        "Muotoilu: pidä viilaa hieman kallellaan kynnen kärjen alla ja viilaa yhteen suuntaan reunasta keskelle. Älä sahaa edestakaisin."
      ),
      l3(
        "Xử lý da khô (không ngâm nước): đẩy nhẹ da ở chân móng bằng cây đẩy da nghiêng khoảng 45°, cạo sạch lớp da mỏng trong suốt bám trên mặt móng. Kềm chỉ cắt da chết đã bong, không cắt da sống.",
        "Dry cuticle work (no soaking): gently push the cuticle back with the pusher at about 45°, and remove the thin transparent film left on the nail plate. Nip only loose dead skin, never living skin.",
        "Kynsinauhat kuivana (ei liotusta): työnnä kynsinauhaa varovasti noin 45 asteen kulmassa ja poista kynnen pintaan jäänyt ohut läpinäkyvä kalvo. Leikkaa vain irtonainen kuollut iho, ei koskaan elävää ihoa."
      ),
      l3(
        "Chà nhám thật nhẹ bằng phao mịn, chỉ để mất độ bóng — chú ý sát chân móng và hai bên cạnh.",
        "Buff very lightly with a fine buffer, only until the shine is gone — don't miss the cuticle area and the side walls.",
        "Hio hyvin kevyesti hienolla hiontapalalla, vain kiilto pois — muista kynsinauhan vierus ja reunat."
      ),
      l3(
        "Phủi bụi, lau từng móng bằng bông gạc không xơ thấm dung dịch lau móng. Từ lúc này không chạm tay vào mặt móng. Dùng chất tăng bám nếu hãng gel của bạn yêu cầu.",
        "Dust off and scrub each nail with a lint-free wipe and cleanser. From now on nobody touches the nail surface. Apply a bonder if your gel system calls for it.",
        "Poista pöly ja puhdista jokainen kynsi nukkaamattomalla lapulla ja puhdistusaineella. Tästä eteenpäin kynnen pintaan ei kosketa. Käytä tartunta-ainetta, jos geelisarjasi sitä vaatii."
      ),
      l3(
        "Lớp base thật mỏng: đặt cọ giữa móng, đẩy nhẹ lên gần sát da (chừa khe hở mảnh như sợi tóc), kéo xuống đầu móng, kéo hai bên, rồi bịt đầu móng. Gel dính da thì gạt sạch bằng que gỗ trước khi hơ.",
        "A very thin base coat: place the brush mid-nail, nudge it up close to the skin (leave a hair-thin gap), pull down to the tip, do the sides, then cap the free edge. Gel on the skin is cleaned off with the wooden stick before curing.",
        "Hyvin ohut pohjakerros: aseta sivellin kynnen keskelle, työnnä lähelle ihoa (jätä hiuksenhieno rako), vedä kärkeen, tee reunat ja sulje kynnen kärki. Iholle mennyt geeli poistetaan puutikulla ennen kovetusta."
      ),
      l3(
        "Hơ đèn: LED thường 30–60 giây, UV khoảng 2 phút — luôn theo thời gian ghi trên sản phẩm. Làm bốn ngón trước, hai ngón cái làm riêng để ngón cái nằm thẳng trong đèn.",
        "Cure: LED usually 30–60 seconds, UV about 2 minutes — always the time on the product. Do four fingers first and the thumbs separately so they lie flat in the lamp.",
        "Koveta: LED yleensä 30–60 sekuntia, UV noin 2 minuuttia — aina tuotteen ohjeen mukaan. Tee ensin neljä sormea ja peukalot erikseen, jotta ne ovat lampussa suorassa."
      ),
      l3(
        "Hai lớp màu, mỗi lớp mỏng: ba đường cọ (giữa, trái, phải), bịt đầu móng, hơ đèn. Lớp đầu chưa đều màu là bình thường; sơn dày gel sẽ nhăn và không chín.",
        "Two thin colour coats: three strokes (centre, left, right), cap the free edge, cure. A patchy first coat is normal; thick coats wrinkle and don't cure through.",
        "Kaksi ohutta värikerrosta: kolme vetoa (keskelle, vasemmalle, oikealle), sulje kärki ja koveta. Laikukas ensimmäinen kerros on normaali; paksu kerros rypistyy eikä kovetu kunnolla."
      ),
      l3(
        "Lớp top phủ kín phần màu và mép đầu móng, hơ đủ thời gian. Top có lớp dính thì lau bằng dung dịch lau móng. Cuối cùng nhỏ dầu dưỡng quanh móng và dặn khách: đeo găng khi lau dọn, thoa dầu mỗi ngày, không tự cạy gel.",
        "Top coat over all the colour and the free edge, cured for the full time. Wipe the sticky layer with cleanser if your top has one. Finish with cuticle oil and tell the customer: gloves for cleaning, oil daily, never peel the gel off.",
        "Päällysgeeli koko värin ja kärjen päälle, täysi kovetusaika. Pyyhi tahmea kerros puhdistusaineella, jos päällysgeelissäsi on sellainen. Lopuksi kynsinauhaöljy ja ohjeet asiakkaalle: käsineet siivotessa, öljyä päivittäin, geeliä ei saa repiä irti."
      ),
    ],
    tips: [
      l3(
        "Gel bong tróc phần lớn do khâu chuẩn bị móng — nhất là lớp da mỏng còn sót ở chân móng — chứ không phải do chai sơn.",
        "Lifting mostly comes from the prep — above all the thin film of skin left at the cuticle — not from the bottle.",
        "Geelin irtoaminen johtuu useimmiten pohjatöistä — etenkin kynsinauhan viereen jääneestä ohuesta kalvosta — ei lakkapullosta."
      ),
      l3(
        "Gel hơ chưa đủ không chín hết: dễ bong và dễ gây dị ứng. Dùng đúng đèn của hãng gel.",
        "Under-cured gel lifts easily and is more likely to cause allergy. Use the lamp your gel brand specifies.",
        "Vajaasti kovettunut geeli irtoaa helposti ja aiheuttaa herkemmin allergiaa. Käytä geelimerkkisi ilmoittamaa lamppua."
      ),
    ],
    quiz: [
      {
        q: l3("Nguyên nhân thường gặp nhất làm gel bong ở chân móng là gì?", "What most often makes gel lift at the cuticle?", "Mikä useimmiten saa geelin irtoamaan kynsinauhan vierestä?"),
        options: [
          l3("Còn lớp da mỏng bám trên mặt móng", "A thin film of skin left on the nail plate", "Kynnen pintaan jäänyt ohut ihokalvo"),
          l3("Lớp top quá mỏng", "A top coat that is too thin", "Liian ohut päällyskerros"),
          l3("Móng dũa quá ngắn", "Nails filed too short", "Liian lyhyeksi viilatut kynnet"),
        ],
        answer: 0,
        why: l3(
          "Gel không bám được lên da. Phải cạo sạch lớp da mỏng trong suốt này khi xử lý da.",
          "Gel can't bond to skin. That thin transparent film has to be removed during cuticle work.",
          "Geeli ei tartu ihoon. Ohut läpinäkyvä kalvo on poistettava kynsinauhoja käsiteltäessä."
        ),
      },
      {
        q: l3("Gel lỡ dính vào da quanh móng. Bạn làm gì?", "Some gel has touched the skin around the nail. What do you do?", "Geeliä meni kynttä ympäröivälle iholle. Mitä teet?"),
        options: [
          l3("Hơ đèn rồi cạy ra sau", "Cure it and pick it off afterwards", "Kovetan ja irrotan sen jälkeenpäin"),
          l3("Gạt sạch bằng que gỗ trước khi hơ đèn", "Clean it off with the wooden stick before curing", "Poistan sen puutikulla ennen kovetusta"),
          l3("Để nguyên, lớp top sẽ che", "Leave it, the top coat will cover it", "Annan olla, päällysgeeli peittää sen"),
        ],
        answer: 1,
        why: l3(
          "Gel trên da làm bong sơn và có thể gây dị ứng về sau cho cả khách lẫn thợ.",
          "Gel on the skin causes lifting and can lead to allergy later, for the customer and for you.",
          "Iholla oleva geeli aiheuttaa irtoamista ja voi myöhemmin allergisoida sekä asiakkaan että tekijän."
        ),
      },
      {
        q: l3("Hơ đèn bao lâu là đúng?", "How long is the right curing time?", "Mikä on oikea kovetusaika?"),
        options: [
          l3("Luôn 10 giây cho nhanh", "Always 10 seconds, to be quick", "Aina 10 sekuntia, jotta ehtii"),
          l3("Càng lâu càng tốt", "The longer the better", "Mitä pidempään, sen parempi"),
          l3("Theo thời gian hãng gel ghi, với đúng loại đèn", "The time your gel brand states, with the right lamp", "Geelimerkin ilmoittama aika oikealla lampulla"),
        ],
        answer: 2,
        why: l3(
          "Mỗi hãng một khác: LED thường 30–60 giây, UV khoảng 2 phút. Luôn xem trên sản phẩm.",
          "Brands differ: LED is usually 30–60 seconds and UV about 2 minutes. Always check the product.",
          "Merkit eroavat: LED yleensä 30–60 sekuntia ja UV noin 2 minuuttia. Tarkista aina tuotteesta."
        ),
      },
    ],
  },
  {
    slug: "thao-gel-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("Tháo gel: hiểu đúng để không hỏng móng", "Gel removal: understand it so the nail survives", "Geelin poisto: ymmärrä, niin kynsi säilyy"),
    summary: l3(
      "Vì sao móng hỏng lúc tháo chứ không phải lúc sơn, gel mềm khác gel cứng thế nào, acetone làm gì với da và móng, và khi nào nên cho móng nghỉ.",
      "Why nails are damaged at removal rather than at application, how soak-off gel differs from hard gel, what acetone does to skin and nail, and when a nail needs a break.",
      "Miksi kynsi vaurioituu poistossa eikä lakkauksessa, miten liukeneva geeli eroaa kovasta geelistä, mitä asetoni tekee iholle ja kynnelle ja milloin kynsi tarvitsee tauon."
    ),
    video: video("thao-gel-hieu-dung", 343, "2026-11-16"),
    notice: l3(
      "Acetone rất dễ cháy, kể cả hơi của nó: làm ở nơi thông gió, để xa lửa và nguồn nhiệt, đậy nắp chai ngay sau khi dùng. Máy mài chỉ dành cho người đã được đào tạo. Quy định khác nhau theo từng nước và thành phố.",
      "Acetone is highly flammable, and so is its vapour: work with ventilation, away from flames and heat, and close the bottle straight after use. An e-file is for trained hands only. Rules differ by country and city.",
      "Asetoni on erittäin helposti syttyvää, myös sen höyry: työskentele ilmastoidussa tilassa, kaukana avotulesta ja lämmönlähteistä, ja sulje pullo heti käytön jälkeen. Kynsiporaa käyttää vain koulutettu tekijä. Määräykset vaihtelevat maittain ja kunnittain."
    ),
    related: ["khach-hang", "dich-vu"],
    steps: [
      l3(
        "Phần lớn hư hại móng xảy ra lúc tháo, không phải lúc sơn. Thủ phạm là lột và cạo, chứ không phải bản thân gel.",
        "Most nail damage happens at removal, not at application. Peeling and scraping are to blame, not the gel itself.",
        "Suurin osa kynsivaurioista syntyy poistossa, ei lakkauksessa. Syy on repiminen ja raaputtaminen, ei itse geeli."
      ),
      l3(
        "Bản móng gồm nhiều lớp keratin mỏng. Gel đã chín bám vào các lớp trên cùng, nên lột gel là lột theo cả móng thật, để lại mảng trắng, sần và mỏng.",
        "The nail plate is many thin layers of keratin. Cured gel grips the top layers, so peeling it takes real nail with it and leaves white, rough, thin patches.",
        "Kynsilevy koostuu monista ohuista keratiinikerroksista. Kovettunut geeli tarttuu ylimpiin kerroksiin, joten repiminen vie mukanaan omaa kynttä ja jättää valkoisia, karheita ja ohuita kohtia."
      ),
      l3(
        "Móng đã mỏng thì không tự dày lại; phải chờ móng mới mọc ra. Móng tay mọc khoảng 3 mm mỗi tháng, một móng mới hoàn toàn mất khoảng 4–6 tháng.",
        "A thinned nail does not thicken again; it has to grow out. Fingernails grow about 3 mm a month, so a completely new nail takes roughly 4–6 months.",
        "Ohentunut kynsi ei paksune uudelleen, vaan sen on kasvettava ulos. Sormenkynsi kasvaa noin 3 mm kuukaudessa, joten kokonaan uusi kynsi vie noin 4–6 kuukautta."
      ),
      l3(
        "Xác định sản phẩm trước: gel mềm (soak-off) mềm ra trong acetone; gel cứng không tan và phải dũa. Không biết thì hỏi khách, thử một móng và đọc hướng dẫn tháo của hãng.",
        "Identify the product first: soak-off gel softens in acetone; hard gel does not dissolve and has to be filed. If you don't know, ask the customer, test one nail and read the brand's removal instructions.",
        "Tunnista tuote ensin: liukeneva geeli pehmenee asetonissa; kova geeli ei liukene, vaan se viilataan. Jos et tiedä, kysy asiakkaalta, kokeile yhtä kynttä ja lue merkin poisto-ohje."
      ),
      l3(
        "Lớp top giống như áo mưa: phải dũa phá lớp top bằng dũa 180 cho mất hết độ bóng thì acetone mới ngấm. Dừng khi thấy bụi màu, không dũa vào móng thật.",
        "The top coat is like a raincoat: break it with a 180 file until the shine is gone, or the acetone cannot get in. Stop at colour dust; never file into the natural nail.",
        "Päällysgeeli on kuin sadetakki: riko se 180-viilalla, kunnes kiilto on poissa, muuten asetoni ei pääse läpi. Lopeta, kun pöly on värillistä; älä viilaa omaan kynteen."
      ),
      l3(
        "Ủ bằng miếng bông vừa đúng mặt móng, quấn giấy bạc hoặc kẹp, thường 10–15 phút theo hướng dẫn của sản phẩm. Gel phải tự phồng, nứt và bong; còn bám thì quấn lại ủ thêm, không cạo.",
        "Soak with a pad the size of the nail under foil or a clip, usually 10–15 minutes as the product says. The gel must puff up, crack and lift by itself; if it still holds, re-wrap and wait — never scrape.",
        "Liota kynnen kokoisella lapulla folion tai klipsin alla, yleensä 10–15 minuuttia tuotteen ohjeen mukaan. Geelin pitää turvota, halkeilla ja irrota itsestään; jos se pitää yhä, kääri uudelleen ja odota — älä raaputa."
      ),
      l3(
        "Máy mài chỉ dành cho người đã được đào tạo, và không mài hết: để lại một lớp base mỏng. Chưa được đào tạo thì dũa tay.",
        "An e-file is for trained hands only, and never down to the nail: leave a thin layer of base. If you are not trained, file by hand.",
        "Kynsipora kuuluu vain koulutetulle tekijälle, eikä sillä hiota kynteen asti: jätä ohut pohjakerros. Ilman koulutusta viilaa käsin."
      ),
      l3(
        "Acetone làm khô da và móng (móng trắng, khô sau khi tháo là mất nước tạm thời), rất dễ cháy kể cả hơi. Cần thông gió, đậy nắp chai, thùng rác có nắp; găng nitrile ướt acetone thì thay.",
        "Acetone dries skin and nail (the white, dry look after removal is temporary dehydration) and is highly flammable, vapour included. Ventilate, keep the bottle closed and use a lidded bin; change nitrile gloves once they are wet with acetone.",
        "Asetoni kuivattaa ihoa ja kynttä (valkoinen, kuiva pinta poiston jälkeen on tilapäistä kuivumista) ja on erittäin helposti syttyvää, höyryineen. Tuuleta, pidä pullo kiinni ja käytä kannellista roska-astiaa; vaihda asetonista kastuneet nitriilikäsineet."
      ),
      l3(
        "Bụi dũa từ gel chưa chín hết có thể gây dị ứng đến chậm và thường suốt đời: đeo găng, dùng máy hút bụi, không thổi bụi.",
        "Filing dust from gel that was not fully cured can cause an allergy that comes slowly and usually lasts for life: wear gloves, use dust extraction, never blow the dust away.",
        "Vajaasti kovettuneen geelin viilauspöly voi aiheuttaa hitaasti kehittyvän ja yleensä elinikäisen allergian: käytä käsineitä ja kohdepoistoa äläkä puhalla pölyä."
      ),
      l3(
        "Tháo xong, nhìn móng thật: mỏng hoặc đau thì khuyên khách cho móng nghỉ và thoa dầu mỗi ngày; móng tách khỏi nền, đổi màu, dày, bở, da sưng hay có mủ thì dừng và khuyên khách đi khám.",
        "After removal, look at the natural nail: thin or sore — advise a break and daily oil; plate lifting from the bed, discolouration, thickening, crumbling, swelling or pus — stop and advise a doctor.",
        "Poiston jälkeen tarkasta oma kynsi: ohut tai arka — suosittele taukoa ja päivittäistä öljyä; kynsilevyn irtoaminen, värimuutos, paksuuntuminen, mureneminen, turvotus tai märkä — lopeta ja ohjaa lääkäriin."
      ),
    ],
    quiz: [
      {
        q: l3("Vì sao lột gel làm hỏng móng?", "Why does peeling gel off damage the nail?", "Miksi geelin repiminen vaurioittaa kynttä?"),
        options: [
          l3("Vì gel có chất ăn mòn móng", "Because gel contains something that corrodes the nail", "Koska geelissä on kynttä syövyttävää ainetta"),
          l3("Vì gel kéo theo cả các lớp của bản móng", "Because the gel pulls layers of the nail plate away with it", "Koska geeli vie mukanaan kynsilevyn kerroksia"),
          l3("Vì móng bị thiếu không khí", "Because the nail was short of air", "Koska kynsi ei saanut ilmaa"),
        ],
        answer: 1,
        why: l3(
          "Gel đã chín bám chặt vào các lớp keratin trên cùng; lột gel là lột theo cả móng thật.",
          "Cured gel grips the top keratin layers; peeling it off strips real nail with it.",
          "Kovettunut geeli tarttuu ylimpiin keratiinikerroksiin; repiminen irrottaa myös omaa kynttä."
        ),
      },
      {
        q: l3("Ủ đủ thời gian mà gel vẫn còn bám chắc, nên làm gì?", "The soak time is up and the gel still holds firmly. What do you do?", "Liotusaika on täynnä, mutta geeli pitää yhä tiukasti. Mitä teet?"),
        options: [
          l3("Dùng cây đẩy cạo mạnh cho ra", "Scrape it off hard with the pusher", "Raaputan sen voimalla irti"),
          l3("Quấn lại, ủ thêm vài phút", "Re-wrap and soak a few minutes more", "Käärin uudelleen ja liotan muutaman minuutin lisää"),
          l3("Dùng kềm bấm gel ra", "Clip the gel off with nippers", "Nipistän geelin irti pihdeillä"),
        ],
        answer: 1,
        why: l3("Gel phải tự bong. Dùng lực là lấy theo cả lớp móng thật.", "Gel has to lift by itself. Force takes layers of natural nail with it.", "Geelin on irrottava itsestään. Voimankäyttö vie mukanaan oman kynnen kerroksia."),
      },
      {
        q: l3("Điều nào đúng về acetone?", "Which is true of acetone?", "Mikä pitää paikkansa asetonista?"),
        options: [
          l3("Có thể hâm nóng trong lò vi sóng cho nhanh", "It can be warmed in a microwave to speed things up", "Sen voi lämmittää mikrossa nopeuttamiseksi"),
          l3("Không ảnh hưởng gì đến da", "It has no effect on the skin", "Se ei vaikuta ihoon"),
          l3("Rất dễ cháy, phải để xa lửa và làm ở nơi thông gió", "It is highly flammable: keep it away from flames and ventilate", "Se on erittäin helposti syttyvää: pidä kaukana tulesta ja tuuleta"),
        ],
        answer: 2,
        why: l3(
          "Cả acetone lỏng và hơi của nó đều dễ bắt lửa. Không nến, không lửa, không hâm nóng.",
          "Both the liquid and its vapour catch fire easily. No candles, no flames, no heating.",
          "Sekä neste että sen höyry syttyvät helposti. Ei kynttilöitä, ei avotulta, ei lämmittämistä."
        ),
      },
    ],
  },
  {
    slug: "thao-gel",
    course: "p-nail",
    style: "practice",
    title: l3("Tháo gel an toàn: thực hành từng bước", "Safe gel removal: step-by-step practice", "Turvallinen geelin poisto: käytäntö vaihe vaiheelta"),
    summary: l3(
      "Tám bước tháo gel mà không làm mỏng móng thật: hỏi và kiểm tra, phá lớp top, bảo vệ da, ủ acetone, đẩy nhẹ, làm sạch, đánh giá và dưỡng móng.",
      "Eight steps to remove gel without thinning the natural nail: ask and check, break the top coat, protect the skin, soak, push gently, clean, assess and care.",
      "Kahdeksan vaihetta geelin poistoon omaa kynttä ohentamatta: kysy ja tarkasta, riko päällyskerros, suojaa iho, liota, työnnä varovasti, puhdista, arvioi ja hoida."
    ),
    video: video("thao-gel", 290, "2026-11-16"),
    notice: l3(
      "Acetone rất dễ cháy: không nến, không lửa, mở thông gió và đậy nắp chai. Gel phải tự bong — nếu phải dùng lực thì dừng lại và ủ thêm. Thời gian ủ luôn theo hướng dẫn của sản phẩm.",
      "Acetone is highly flammable: no candles, no flames, ventilate and keep the bottle closed. Gel must lift by itself — if it needs force, stop and soak longer. Soak times always follow the product's instructions.",
      "Asetoni on erittäin helposti syttyvää: ei kynttilöitä, ei avotulta, tuuleta ja pidä pullo kiinni. Geelin on irrottava itsestään — jos tarvitaan voimaa, lopeta ja liota pidempään. Liotusaika on aina tuotteen ohjeen mukainen."
    ),
    related: ["dich-vu", "bang-gia", "lich-hen"],
    steps: [
      l3(
        "Rửa và sát khuẩn tay, hỏi khách trên móng là gel gì và làm bao lâu rồi, xem da quanh móng. Da sưng, đỏ, có mủ hay vết thương hở: dừng lại, khuyên khách đi khám.",
        "Wash and disinfect hands, ask what product is on the nails and for how long, and check the skin. Swelling, redness, pus or an open wound: stop and advise a doctor.",
        "Pese ja desinfioi kädet, kysy mitä tuotetta kynsillä on ja kuinka kauan, ja tarkasta iho. Turvotus, punoitus, märkä tai avohaava: lopeta ja ohjaa lääkäriin."
      ),
      l3(
        "Chuẩn bị: dũa 180 và phao mới cho từng khách, bông gạc không xơ cắt vừa mặt móng, giấy bạc hoặc kẹp, acetone hoặc dung dịch tháo của hãng, que gỗ, cây đẩy đã tiệt trùng, dầu dưỡng, găng tay. Mở thông gió, không nến, không lửa.",
        "Set out: a new 180 file and buffer per customer, lint-free pads cut to nail size, foil or clips, acetone or the brand's remover, a wooden stick, a sterilised pusher, oil and gloves. Ventilate; no candles or flames.",
        "Ota esille: uusi 180-viila ja hiontapala jokaiselle asiakkaalle, kynnen kokoisiksi leikatut nukkaamattomat laput, folio tai klipsit, asetoni tai merkin poistoaine, puutikku, steriloitu työnnin, öljy ja käsineet. Tuuleta; ei kynttilöitä tai avotulta."
      ),
      l3(
        "Dũa phá lớp top đều tay cho mất hết độ bóng, cả vùng sát chân móng và hai bên cạnh. Không dũa vào da hay vào móng thật. Phủi bụi bằng chổi, không thổi.",
        "File the top coat evenly until it is matt all over, including by the cuticle and along the sides. Never on the skin or into the natural nail. Brush the dust away; don't blow.",
        "Viilaa päällyskerros tasaisesti mataksi, myös kynsinauhan vierestä ja reunoilta. Älä viilaa ihoa tai omaa kynttä. Harjaa pöly pois, älä puhalla."
      ),
      l3(
        "Thoa dầu hoặc kem lên vùng da quanh móng để bảo vệ da khỏi acetone — không thoa lên mặt móng.",
        "Put oil or cream on the skin around the nail to protect it from the acetone — not on the nail itself.",
        "Levitä öljyä tai voidetta kynttä ympäröivälle iholle suojaksi asetonilta — ei kynnen pinnalle."
      ),
      l3(
        "Đặt miếng bông thấm acetone vừa đúng mặt móng, quấn giấy bạc thật kín (hoặc kẹp), đậy nắp chai. Ủ thường 10–15 phút theo hướng dẫn của sản phẩm. Quấn ngón nào trước thì mở ngón đó trước, mỗi lần một ngón.",
        "Lay a soaked pad the size of the nail on it, wrap the foil tight (or clip it) and close the bottle. Soak usually 10–15 minutes as the product says. Unwrap in the order you wrapped, one finger at a time.",
        "Aseta kynnen kokoinen kostutettu lappu kynnelle, kääri folio tiiviisti (tai käytä klipsiä) ja sulje pullo. Liota yleensä 10–15 minuuttia tuotteen ohjeen mukaan. Avaa samassa järjestyksessä kuin käärit, sormi kerrallaan."
      ),
      l3(
        "Gel đã phồng, nứt và tự bong: đẩy thật nhẹ bằng que gỗ đặt gần như nằm ngang, từ chân móng ra đầu móng. Phải ấn mạnh mới ra thì dừng, quấn lại và ủ thêm khoảng 5 phút.",
        "When the gel has puffed, cracked and lifted, push very gently with the wooden stick held almost flat, from the cuticle towards the tip. If it needs pressure, stop, re-wrap and soak about 5 minutes more.",
        "Kun geeli on turvonnut, halkeillut ja irronnut, työnnä hyvin varovasti lähes vaakasuoraan pidetyllä puutikulla kynsinauhasta kärkeä kohti. Jos tarvitaan painetta, lopeta, kääri uudelleen ja liota noin 5 minuuttia lisää."
      ),
      l3(
        "Lau phần gel còn sót bằng bông thấm acetone, hoặc lướt phao mịn thật nhẹ. Mời khách rửa tay bằng xà phòng.",
        "Wipe off what is left with an acetone pad, or glide a fine buffer over it very lightly. Ask the customer to wash their hands with soap.",
        "Pyyhi jäämät asetonilapulla tai liu'uta hienoa hiontapalaa hyvin kevyesti. Pyydä asiakasta pesemään kädet saippualla."
      ),
      l3(
        "Đánh giá móng: móng khoẻ thì có thể sơn lại (dầu dưỡng để cuối); mỏng hoặc đau thì cho nghỉ, thoa dầu mỗi ngày, đeo găng khi làm việc nhà; móng tách, đổi màu hay có dấu hiệu nhiễm trùng thì không sơn và khuyên khách đi khám.",
        "Assess the nail: healthy — it can be re-coated (oil comes last); thin or sore — a break, daily oil and gloves for housework; lifting, discolouration or signs of infection — no polish, and advise a doctor.",
        "Arvioi kynsi: terve — sen voi lakata uudelleen (öljy lopuksi); ohut tai arka — tauko, öljyä päivittäin ja käsineet kotitöissä; irtoaminen, värimuutos tai tulehduksen merkit — ei lakkaa, ohjaa lääkäriin."
      ),
      l3(
        "Gel cứng không tan trong acetone: dũa tay mỏng dần đến khi còn một lớp base mỏng (máy mài chỉ khi đã được đào tạo), đeo găng, khẩu trang và bật máy hút bụi.",
        "Hard gel does not dissolve in acetone: file it down by hand to a thin layer of base (an e-file only if you are trained), with gloves, a mask and dust extraction.",
        "Kova geeli ei liukene asetoniin: viilaa käsin ohueksi pohjakerrokseksi (kynsipora vain koulutetulle), käytä käsineitä, maskia ja kohdepoistoa."
      ),
      l3(
        "Dọn dẹp: đồ dùng một lần bỏ vào thùng rác có nắp, kẹp làm sạch và khử khuẩn, dụng cụ kim loại đưa đi tiệt trùng. Dặn khách không tự lột gel ở nhà.",
        "Clear up: single-use items into a lidded bin, clips cleaned and disinfected, metal tools to sterilisation. Tell the customer never to peel gel off at home.",
        "Siivoa: kertakäyttötuotteet kannelliseen roska-astiaan, klipsit puhdistetaan ja desinfioidaan, metallivälineet steriloidaan. Neuvo asiakasta, ettei geeliä revitä kotona irti."
      ),
    ],
    quiz: [
      {
        q: l3("Trước khi ủ acetone cho sơn gel, bước nào không được bỏ?", "Before soaking gel polish in acetone, which step must not be skipped?", "Mitä vaihetta ei saa jättää väliin ennen geelilakan liotusta?"),
        options: [
          l3("Dũa phá lớp top cho mất hết độ bóng", "Filing the top coat until the shine is gone", "Päällyskerroksen viilaus mataksi"),
          l3("Ngâm tay trong nước ấm", "Soaking the hands in warm water", "Käsien liotus lämpimässä vedessä"),
          l3("Cắt da quanh móng", "Cutting the cuticles", "Kynsinauhojen leikkaus"),
        ],
        answer: 0,
        why: l3("Lớp top kín như áo mưa; không phá thì acetone không ngấm vào được.", "The top coat seals like a raincoat; unless it is broken, the acetone cannot get in.", "Päällyskerros on tiivis kuin sadetakki; ellei sitä rikota, asetoni ei pääse läpi."),
      },
      {
        q: l3("Miếng bông thấm acetone nên to cỡ nào?", "How big should the acetone pad be?", "Minkä kokoinen asetonilapun pitää olla?"),
        options: [
          l3("Phủ kín cả đầu ngón tay", "Covering the whole fingertip", "Koko sormenpään peittävä"),
          l3("Vừa đúng bằng mặt móng", "Just the size of the nail", "Juuri kynnen kokoinen"),
          l3("Càng to càng tốt", "The bigger the better", "Mitä isompi, sen parempi"),
        ],
        answer: 1,
        why: l3("Acetone làm khô da; bông vừa mặt móng thì da ít tiếp xúc nhất.", "Acetone dries the skin; a nail-sized pad keeps skin contact to a minimum.", "Asetoni kuivattaa ihoa; kynnen kokoinen lappu pitää ihokosketuksen pienimpänä."),
      },
      {
        q: l3("Khi đẩy gel mà phải ấn mạnh mới ra, bạn làm gì?", "The gel only comes off if you press hard. What do you do?", "Geeli irtoaa vain kovalla painamisella. Mitä teet?"),
        options: [
          l3("Dựng đứng que lên và cạo", "Hold the stick upright and scrape", "Nostan tikun pystyyn ja raaputan"),
          l3("Dùng dũa thô dũa hết", "File it all off with a coarse file", "Viilaan kaiken pois karkealla viilalla"),
          l3("Dừng lại, quấn lại và ủ thêm khoảng năm phút", "Stop, re-wrap and soak about five minutes more", "Lopetan, käärin uudelleen ja liotan noin viisi minuuttia lisää"),
        ],
        answer: 2,
        why: l3("Gel phải tự bong. Dùng lực là làm mỏng và tổn thương móng thật.", "Gel has to lift by itself. Force thins and damages the natural nail.", "Geelin on irrottava itsestään. Voimankäyttö ohentaa ja vaurioittaa omaa kynttä."),
      },
    ],
  },
  {
    slug: "builder-gel-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("Builder gel: hiểu đúng để móng chắc và đẹp", "Builder gel: understand it for strong, beautiful nails", "Rakennegeeli: ymmärrä, niin kynnet pysyvät vahvoina ja kauniina"),
    summary: l3(
      "Builder gel (BIAB) khác sơn gel thế nào, loại tháo bằng acetone và gel cứng, ai hợp và ai không, cấu trúc của lớp gel — vùng chịu lực, điểm apex, độ cong chữ C — vì sao gel bị hở, nhiệt khi hơ đèn, dị ứng, và vì sao nên dặm định kỳ.",
      "How builder gel (BIAB) differs from gel polish, soak-off versus hard gel, who it suits and who it doesn't, the structure of the overlay — stress area, apex, C-curve — why it lifts, heat in the lamp, allergy, and why regular infills matter.",
      "Miten rakennegeeli (BIAB) eroaa geelilakasta, liukeneva ja kova geeli, kenelle se sopii ja kenelle ei, rakenteen perusteet — rasitusalue, apex, C-kaari — miksi geeli irtoaa, lampun lämpö, allergiat ja miksi säännöllinen huolto kannattaa."
    ),
    video: video("builder-gel-hieu-dung", 335, "2026-11-17"),
    notice: l3(
      "Thời gian hơ, loại đèn và cách tháo luôn theo hướng dẫn của hãng sản phẩm. Gel chưa chín không bao giờ được chạm vào da. Móng có dấu hiệu bệnh thì không làm và khuyên khách đi khám. Quy định về sản phẩm làm móng khác nhau theo từng nước.",
      "Cure times, the lamp and the removal method always follow the brand's instructions. Uncured gel must never touch the skin. Do not work on a nail that shows signs of disease; suggest a doctor. Rules on nail products differ by country.",
      "Kovetusajat, lamppu ja poistotapa noudattavat aina valmistajan ohjeita. Kovettumaton geeli ei saa koskaan koskea ihoa. Älä käsittele kynttä, jossa on sairauden merkkejä, vaan ohjaa lääkäriin. Kynsituotteita koskevat määräykset vaihtelevat maittain."
    ),
    sources: [
      EU_TPO,
      { label: "Commission Regulation (EU) 2020/1682 — HEMA and Di-HEMA TMHDC in nail products", url: "https://eur-lex.europa.eu/eli/reg/2020/1682/oj/eng" },
    ],
    related: ["dich-vu", "lich-hen", "the-khach-quen"],
    steps: [
      l3(
        "Sơn gel lỏng, mỏng, chủ yếu để lên màu. Builder gel đặc hơn nhiều, tự chảy cho phẳng (tự cân bằng) và khi chín thành một lớp khung đỡ cho móng thật: sơn gel là cái áo, builder gel là bộ khung.",
        "Gel polish is thin and runny, mainly for colour. Builder gel is much thicker, flows level by itself and cures into a structure that supports the natural nail: polish is the coat, builder gel is the frame.",
        "Geelilakka on ohutta ja juoksevaa, pääasiassa väriä varten. Rakennegeeli on paljon paksumpaa, tasoittuu itsestään ja kovettuu rakenteeksi, joka tukee omaa kynttä: lakka on takki, rakennegeeli runko."
      ),
      l3(
        "Hai họ: loại tháo bằng acetone (phần lớn gel trong chai gọi là BIAB, và base cao su/rubber base) và gel cứng, không tan trong acetone, phải dũa. Cách tháo, thời gian hơ và loại đèn: đọc hướng dẫn của hãng.",
        "Two families: soak-off (most builder gels in a bottle, called BIAB, and rubber base) and hard gel, which does not dissolve in acetone and has to be filed off. Removal, cure times and lamp: read the brand's instructions.",
        "Kaksi ryhmää: asetoniin liukenevat (useimmat pullossa myytävät BIAB-geelit ja rubber base) sekä kova geeli, joka ei liukene asetoniin vaan viilataan pois. Poisto, kovetusajat ja lamppu: lue valmistajan ohje."
      ),
      l3(
        "Hợp với móng mỏng, mềm, dễ cong, tách lớp ở đầu và hay gãy. Builder gel không làm móng mọc nhanh hơn và không chữa móng; nó che chở để móng không gãy trong lúc mọc.",
        "It suits thin, soft, bendy nails that peel at the tip and break easily. Builder gel does not make nails grow faster and does not treat them; it protects them so they don't break while growing.",
        "Sopii ohuille, pehmeille, taipuisille kynsille, jotka lohkeilevat kärjestä ja katkeavat helposti. Rakennegeeli ei nopeuta kasvua eikä hoida kynttä; se suojaa, jotta kynsi ei katkea kasvaessaan."
      ),
      l3(
        "Không làm khi móng cần bác sĩ xem (tách khỏi nền, đổi màu, dày, da sưng đỏ hay có mủ) hoặc khách từng dị ứng với gel. Móng cắn sát, quá ngắn: gel ít chỗ bám và dễ chạm da — thường nên chăm cho móng dài ra trước.",
        "Don't work on nails that need a doctor (lifting from the bed, discoloured, thickened, swollen red skin or pus), or on a customer who has reacted to gel before. Very short bitten nails give the gel little to hold and bring it close to the skin — usually care for them until they grow first.",
        "Älä käsittele kynsiä, jotka vaativat lääkärin arviota (irtoaminen kynsipedistä, värimuutos, paksuuntuminen, turvonnut punoittava iho tai märkä), äläkä asiakasta, joka on aiemmin reagoinut geeliin. Lyhyiksi pureskellut kynnet antavat geelille vähän tarttumapintaa ja tuovat sen lähelle ihoa — yleensä kynsiä kannattaa ensin hoitaa ja kasvattaa."
      ),
      l3(
        "Cấu trúc: mỏng ở sát chân móng, mỏng ở đầu móng, dày nhất ở điểm apex. Apex nằm trên vùng chịu lực — chỗ móng rời khỏi nền da — hơi lùi về phía sau, như một cây xà đỡ để móng không bị bẻ cong.",
        "Structure: thin at the cuticle, thin at the free edge, thickest at the apex. The apex sits over the stress area — where the nail leaves the nail bed — slightly behind it, like a beam that stops the nail from bending.",
        "Rakenne: ohut kynsinauhan vieressä, ohut vapaassa reunassa, paksuin apexissa. Apex on rasitusalueen päällä — siinä, missä kynsi irtoaa kynsipedistä — hieman sen takana, kuin palkki, joka estää kynttä taipumasta."
      ),
      l3(
        "Nhìn từ đầu móng, gel ôm theo độ cong chữ C, đều hai bên. Hai cạnh bên mỏng, gọn, thẳng, không tràn xuống da. Mỗi bộ móng nhìn từ ba hướng: trên xuống, cạnh bên, đầu móng.",
        "Seen end-on, the gel follows the C-curve evenly on both sides. The side walls are slim, neat and straight, never on the skin. Check every set from three views: from above, from the side and end-on.",
        "Päästä katsottuna geeli seuraa C-kaarta tasaisesti molemmin puolin. Sivuseinät ovat ohuet, siistit ja suorat, eivätkä koskaan iholla. Tarkista jokainen kynsi kolmesta suunnasta: ylhäältä, sivulta ja päästä."
      ),
      l3(
        "Gel bị hở thường vì: chuẩn bị chưa kỹ (dầu, ẩm, còn bóng, da sót trên mặt móng), gel chạm da hay tràn vào chân móng, gel quá dày ở mép thành gờ, hoặc không có apex nên móng cong lên cong xuống mỗi ngày.",
        "Lifting usually comes from: poor prep (oil, moisture, shine, cuticle tissue left on the plate), gel touching the skin or flooding the cuticle, edges built too thick into a ledge, or no apex, so the nail flexes every day.",
        "Irtoaminen johtuu yleensä: puutteellisesta esikäsittelystä (öljy, kosteus, kiilto, kynsilevylle jäänyt kynsinauha), ihoon koskevasta tai kynsinauhaan valuneesta geelistä, liian paksuista reunoista tai puuttuvasta apexista, jolloin kynsi taipuu joka päivä."
      ),
      l3(
        "Gel chín thì tỏa nhiệt, lớp càng dày càng nóng. Dùng chế độ nhiệt thấp hoặc hơ nhanh trước nếu hãng hướng dẫn; khách thấy nóng thì rút tay ra vài giây rồi hơ tiếp cho đủ. Hai lớp vừa phải tốt hơn một lớp quá dày.",
        "Gel gives off heat as it cures, more with thicker layers. Use a low-heat mode or a short flash cure if the brand recommends it; if the customer feels burning, take the hand out for a few seconds, then finish the full cure. Two moderate layers beat one very thick one.",
        "Geeli lämpenee kovettuessaan, sitä enemmän mitä paksumpi kerros. Käytä matalan lämmön tilaa tai lyhyttä esikovetusta, jos valmistaja niin ohjeistaa; jos asiakas tuntee polttavaa kuumuutta, ota käsi pois muutamaksi sekunniksi ja jatka sitten täyteen kovetukseen. Kaksi kohtuullista kerrosta on parempi kuin yksi hyvin paksu."
      ),
      l3(
        "Dị ứng: gel chưa chín không chạm da khách và da mình, gel phải chín hoàn toàn (đúng đèn, đủ thời gian, không quá dày), hút bụi dũa, không thổi. Ở EU, sản phẩm móng có HEMA phải ghi “chỉ dành cho người làm chuyên nghiệp” và “có thể gây dị ứng”; TPO đã bị cấm trong sản phẩm móng.",
        "Allergy: uncured gel never touches the customer's skin or yours, gel must cure fully (right lamp, full time, not too thick), extract the filing dust, never blow it. In the EU, nail products with HEMA must be labelled “for professional use only” and “can cause an allergic reaction”; TPO is banned in nail products.",
        "Allergia: kovettumaton geeli ei koske asiakkaan eikä omaa ihoa, geelin on kovetuttava täysin (oikea lamppu, koko aika, ei liian paksu), viilauspöly imetään, sitä ei puhalleta. EU:ssa HEMA-pitoisissa kynsituotteissa on oltava merkinnät ”vain ammattikäyttöön” ja ”voi aiheuttaa allergisen reaktion”; TPO on kielletty kynsituotteissa."
      ),
      l3(
        "Móng mọc thì apex trôi ra đầu móng, móng nặng đầu, dễ gãy và hở. Thường cứ 3–4 tuần nên dặm: dũa mỏng lớp cũ, đắp phần mới mọc, dựng lại apex. Lớp cũ còn bám tốt thì không cần tháo hết.",
        "As the nail grows, the apex moves forward, the tip gets heavy and the nail breaks or lifts more easily. An infill every 3–4 weeks is usual: thin the old product, fill the regrowth, rebuild the apex. If the old layer is still well bonded, there is no need to remove it all.",
        "Kynnen kasvaessa apex siirtyy eteenpäin, kärki raskautuu ja kynsi katkeaa tai irtoaa helpommin. Huolto 3–4 viikon välein on tavallinen: ohenna vanha geeli, täytä kasvanut kohta ja rakenna apex uudelleen. Jos vanha kerros on yhä hyvin kiinni, kaikkea ei tarvitse poistaa."
      ),
    ],
    tips: [
      l3(
        "Nói thật với khách: “Lớp này giúp móng chị không gãy để móng dài ra, chứ không làm móng mọc nhanh hơn.” Dặn khách thấy hở thì đừng tự lột, hãy quay lại tiệm; đeo găng khi rửa chén và thoa dầu quanh móng mỗi ngày.",
        "Be honest: “This layer keeps your nails from breaking so they can grow — it won't make them grow faster.” Tell the customer not to peel it if it lifts but to come back; wear gloves for washing up and oil the skin around the nails every day.",
        "Ole rehellinen: ”Tämä kerros estää kynsiä katkeamasta, jotta ne saavat kasvaa — se ei nopeuta kasvua.” Neuvo asiakasta olemaan repimättä irronnutta geeliä ja palaamaan liikkeeseen, käyttämään käsineitä tiskatessa ja öljyämään kynsien ympärystä päivittäin."
      ),
      l3(
        "Trong VaraaAi, đặt dịch vụ “Dặm builder gel” với đúng thời lượng, và hẹn luôn lịch dặm cho khách trước khi khách ra về.",
        "In VaraaAi, set up a “Builder gel infill” service with the right duration, and book the customer's next infill before they leave.",
        "Luo VaraaAi:ssa palvelu ”Rakennegeelin huolto” oikealla kestolla ja varaa asiakkaalle seuraava huoltoaika ennen kuin hän lähtee."
      ),
    ],
    quiz: [
      {
        q: l3("Điểm apex của lớp builder gel nên nằm ở đâu?", "Where should the apex of a builder gel overlay be?", "Missä rakennegeelin apexin pitää olla?"),
        options: [
          l3("Sát chân móng, cho chắc", "Right at the cuticle, for strength", "Aivan kynsinauhan vieressä, lujuuden vuoksi"),
          l3("Ngay đầu móng tự do", "At the very tip of the free edge", "Aivan vapaan reunan kärjessä"),
          l3("Trên vùng chịu lực, chỗ móng rời khỏi nền da, hơi lùi về sau", "Over the stress area, where the nail leaves the nail bed, slightly behind it", "Rasitusalueen päällä, siinä missä kynsi irtoaa kynsipedistä, hieman sen takana"),
        ],
        answer: 2,
        why: l3(
          "Móng hay gãy ở chỗ rời khỏi nền da; gel dày nhất ở đó thì đỡ được móng. Chân móng và đầu móng phải mỏng.",
          "The nail breaks where it leaves the bed; the thickest gel belongs there. The cuticle area and the tip stay thin.",
          "Kynsi katkeaa kohdasta, jossa se irtoaa kynsipedistä; paksuin geeli kuuluu sinne. Kynsinauhan alue ja kärki pysyvät ohuina."
        ),
      },
      {
        q: l3("Điều nào hay làm builder gel bị hở ở chân móng nhất?", "Which of these most often makes builder gel lift at the cuticle?", "Mikä näistä saa rakennegeelin useimmiten irtoamaan kynsinauhan kohdalta?"),
        options: [
          l3("Gel chạm vào da hoặc tràn vào chân móng", "Gel touching the skin or flooding the cuticle", "Geeli koskee ihoon tai valuu kynsinauhaan"),
          l3("Hơ đèn đủ thời gian", "Curing for the full time", "Kovettaminen koko ohjeajan"),
          l3("Lau móng bằng bông không xơ trước khi làm", "Wiping the nail with a lint-free pad first", "Kynnen pyyhkiminen nukkaamattomalla lapulla ennen työtä"),
        ],
        answer: 0,
        why: l3(
          "Da mọc lên đẩy gel lên, thế là hở. Luôn chừa một đường nhỏ như sợi tóc giữa gel và da.",
          "The skin grows and pushes the gel up, and it lifts. Always leave a hair-thin gap between gel and skin.",
          "Iho kasvaa ja nostaa geelin, ja se irtoaa. Jätä aina hiuksenohut rako geelin ja ihon väliin."
        ),
      },
      {
        q: l3("Khách thấy nóng rát khi hơ builder gel. Bạn làm gì?", "The customer feels burning heat while builder gel cures. What do you do?", "Asiakas tuntee polttavaa kuumuutta rakennegeelin kovettuessa. Mitä teet?"),
        options: [
          l3("Bảo khách cố chịu, vài giây là hết", "Ask them to bear it, it passes in seconds", "Pyydän kestämään, se menee ohi sekunneissa"),
          l3("Cho khách rút tay ra vài giây, rồi đưa vào lại và hơ đủ thời gian", "Let them take the hand out for a few seconds, then put it back and finish the full cure", "Annan ottaa käden pois muutamaksi sekunniksi, sitten takaisin ja kovetan koko ajan"),
          l3("Bỏ dở, không hơ nữa", "Stop curing altogether", "Lopetan kovettamisen kokonaan"),
        ],
        answer: 1,
        why: l3(
          "Đừng bắt khách chịu đau, nhưng gel vẫn phải chín hoàn toàn — gel chưa chín dễ bong và dễ gây dị ứng.",
          "Never make the customer endure pain, but the gel must still cure fully — undercured gel lifts and can cause allergy.",
          "Asiakkaan ei pidä kärsiä kipua, mutta geelin on silti kovetuttava täysin — vajaasti kovettunut geeli irtoaa ja voi aiheuttaa allergian."
        ),
      },
    ],
  },
  {
    slug: "builder-gel",
    course: "p-nail",
    style: "practice",
    title: l3("Builder gel trên móng thật: thực hành từng bước", "Builder gel on natural nails: step-by-step practice", "Rakennegeeli omalle kynnelle: käytäntö vaihe vaiheelta"),
    summary: l3(
      "Một lớp builder gel (BIAB) phủ trên móng thật, không nối dài: tư vấn và kiểm tra, chuẩn bị khô, lớp lót mỏng, đặt hạt gel và dẫn gel, úp tay tạo điểm apex, hơ đèn, dũa hoàn thiện, màu và top, dầu dưỡng và hẹn lịch dặm.",
      "A builder gel (BIAB) overlay on the natural nail, no extension: consultation and checks, dry prep, a thin base layer, placing and floating the bead, turning the hand to form the apex, curing, finish filing, colour and top coat, oil and booking the infill.",
      "Rakennegeelipäällyste (BIAB) omalle kynnelle ilman pidennystä: konsultaatio ja tarkistus, kuiva esikäsittely, ohut pohjakerros, geelipisaran asettaminen ja ohjaaminen, käden kääntäminen apexin muodostamiseksi, kovetus, viimeistelyviilaus, väri ja päällyslakka, öljy sekä huoltoajan varaus."
    ),
    video: video("builder-gel", 277, "2026-11-17"),
    notice: l3(
      "Thời gian hơ, chế độ đèn và cách làm lớp lót (hơ hay không hơ) luôn theo hướng dẫn của hãng. Gel không được chạm vào da. Khách thấy nóng rát thì rút tay ra vài giây rồi hơ tiếp cho đủ. Quy định về sản phẩm làm móng khác nhau theo từng nước.",
      "Cure times, lamp mode and how the base layer is handled (cured or not) always follow the brand's instructions. Gel must never touch the skin. If the customer feels burning heat, take the hand out for a few seconds, then finish the cure. Rules on nail products differ by country.",
      "Kovetusajat, lampun tila ja pohjakerroksen käsittely (kovetetaanko vai ei) noudattavat aina valmistajan ohjeita. Geeli ei saa koskea ihoa. Jos asiakas tuntee polttavaa kuumuutta, ota käsi pois muutamaksi sekunniksi ja jatka sitten kovetusta loppuun. Kynsituotteita koskevat määräykset vaihtelevat maittain."
    ),
    related: ["lich-hen", "dich-vu", "khach-hang"],
    steps: [
      l3(
        "Tư vấn và kiểm tra: rửa và sát khuẩn tay, xem móng và da quanh móng (móng tách, đổi màu, da sưng đỏ, có mủ, vết thương hở: không làm, khuyên đi khám), hỏi khách từng bị dị ứng với gel chưa, khách muốn tự nhiên hay có màu, và nói trước lịch dặm 3–4 tuần.",
        "Consultation and checks: wash and disinfect hands, look at nails and skin (lifting, discolouration, swollen red skin, pus, open wounds: don't work, suggest a doctor), ask about earlier reactions to gel, natural or colour, and mention the 3–4-week infill up front.",
        "Konsultaatio ja tarkistus: pese ja desinfioi kädet, katso kynnet ja iho (irtoaminen, värimuutos, turvonnut punoittava iho, märkä, avohaava: älä tee, ohjaa lääkäriin), kysy aiemmista geelireaktioista, halutaanko luonnollinen vai värillinen, ja kerro jo alussa 3–4 viikon huoltovälistä."
      ),
      l3(
        "Chuẩn bị khô như trong bài sơn gel: không ngâm nước, đẩy da và lấy lớp da chết mỏng trên mặt móng, dũa form, lướt phao mịn cho mất độ bóng mà không làm mỏng móng, phủi bụi, lau bằng bông không xơ. Sau đó không chạm tay vào mặt móng.",
        "Dry prep as in the gel polish lesson: no soaking, push back and remove the thin dead tissue on the plate, shape, buff off the shine without thinning the nail, brush off dust, wipe with a lint-free pad. Don't touch the nail plate afterwards.",
        "Kuiva esikäsittely kuten geelilakkatunnilla: ei liotusta, työnnä kynsinauhat ja poista kynsilevyllä oleva ohut kuollut iho, muotoile, poista kiilto hiomalla kynttä ohentamatta, harjaa pöly ja pyyhi nukkaamattomalla lapulla. Älä koske kynsilevyyn sen jälkeen."
      ),
      l3(
        "Lớp lót thật mỏng: ấn và chà nhẹ một chút gel vào mặt móng, gạt bớt phần thừa, bọc qua mép đầu móng, chừa một đường nhỏ cách da. Hơ, hoặc đặt lớp sau khi còn ướt, đúng như hướng dẫn của sản phẩm.",
        "A very thin base (slip) layer: work a little gel into the nail plate, wipe off the excess, cap the free edge and keep a tiny gap from the skin. Cure it, or build on it while wet, exactly as the product says.",
        "Hyvin ohut pohja- eli liukukerros: hiero vähän geeliä kynsilevyyn, poista ylimäärä, sulje vapaa reuna ja jätä pieni rako ihoon. Kovete se tai jatka märälle pinnalle tuotteen ohjeen mukaan."
      ),
      l3(
        "Đặt một hạt gel tròn vừa đủ vào giữa móng, không sát chân móng. Lúc đầu lấy ít còn hơn lấy nhiều.",
        "Place one round bead of gel in the centre of the nail, not at the cuticle. Start with too little rather than too much.",
        "Aseta yksi pyöreä geelipisara kynnen keskelle, ei kynsinauhan viereen. Aloita mieluummin liian pienellä kuin liian suurella määrällä."
      ),
      l3(
        "Dùng đầu cọ dẫn nhẹ gel về phía chân móng, gần như không ấn, dừng cách da một khoảng nhỏ như sợi tóc; rồi dẫn ra hai cạnh và ra đầu móng, bọc kín mép đầu móng. Gel mỏng ở chân, mỏng ở hai cạnh, đầy hơn ở giữa.",
        "With the tip of the brush, float the gel towards the cuticle with almost no pressure and stop a hair's width from the skin; then guide it to the side walls and the free edge and cap the tip. Thin at the cuticle and the sides, fuller in the middle.",
        "Ohjaa geeliä siveltimen kärjellä kynsinauhaa kohti lähes painamatta ja pysähdy hiuksen paksuisen raon päähän ihosta; ohjaa sitten sivuille ja vapaaseen reunaan ja sulje kärki. Ohut kynsinauhan vieressä ja sivuilla, täyteläisempi keskellä."
      ),
      l3(
        "Tạo apex: úp ngón tay khách xuống, giữ yên vài giây cho gel tự dồn về giữa. Lật lên, nhìn từ cạnh bên (điểm cao nhất trên vùng chịu lực, hơi lùi về sau) và từ đầu móng (độ cong chữ C đều hai bên). Sửa khi gel còn ướt, nhưng đừng để gel chảy tràn ra mép.",
        "Form the apex: turn the customer's finger nail-down and hold still for a few seconds so the gel gathers in the middle. Turn it back and check from the side (highest point over the stress area, slightly behind it) and end-on (an even C-curve). Correct while wet, but don't let the gel run into the edges.",
        "Muodosta apex: käännä asiakkaan sormi kynsi alaspäin ja pidä paikallaan muutama sekunti, jotta geeli kerääntyy keskelle. Käännä takaisin ja tarkista sivulta (korkein kohta rasitusalueen päällä, hieman sen takana) ja päästä (tasainen C-kaari). Korjaa märkänä, mutta älä anna geelin valua reunoille."
      ),
      l3(
        "Hơ đèn với cả móng nằm trọn trong đèn, đủ thời gian hãng khuyên; dùng chế độ nhiệt thấp hoặc hơ nhanh trước nếu hãng hướng dẫn. Cần thì thêm một lớp mỏng thứ hai theo cùng cách. Lau lớp dính nếu sản phẩm có.",
        "Cure with the whole nail inside the lamp for the time the brand gives; use low-heat mode or a short flash cure if the brand recommends it. If needed, add a second thin layer the same way. Remove the sticky layer if the product leaves one.",
        "Kovete koko kynsi lampun sisällä valmistajan ilmoittaman ajan; käytä matalan lämmön tilaa tai lyhyttä esikovetusta, jos valmistaja niin ohjeistaa. Lisää tarvittaessa toinen ohut kerros samalla tavalla. Pyyhi tahmakerros, jos tuote jättää sellaisen."
      ),
      l3(
        "Dũa hoàn thiện với máy hút bụi: dũa 180 đặt nằm trên mặt móng cho bề mặt mịn, không dũa vào móng thật ở chân móng, không dũa mất apex; dũa gọn hai cạnh và đầu móng, lướt phao mịn, phủi bụi bằng chổi (không thổi) và lau móng.",
        "Finish filing with dust extraction on: a 180 file flat on the surface to smooth it, never into the natural nail at the cuticle and never through the apex; refine the side walls and free edge, buff, brush off the dust (don't blow) and wipe.",
        "Viimeistelyviilaus kohdepoisto päällä: 180-viila tasaisesti pinnalla pinnan tasoittamiseksi, ei koskaan omaan kynteen kynsinauhan kohdalla eikä apexin läpi; siisti sivuseinät ja vapaa reuna, hio, harjaa pöly (älä puhalla) ja pyyhi."
      ),
      l3(
        "Màu (nếu khách muốn) sơn mỏng như bài sơn gel, rồi lớp top bọc qua mép đầu móng và hơ đủ thời gian. Cuối cùng dầu dưỡng trên da quanh móng.",
        "Colour, if wanted, in thin coats as in the gel polish lesson, then a top coat that caps the free edge, fully cured. Finish with oil on the skin around the nail.",
        "Väri, jos halutaan, ohuina kerroksina kuten geelilakkatunnilla, sitten vapaan reunan sulkeva päällyslakka täyteen kovetukseen. Lopuksi öljyä kynttä ympäröivälle iholle."
      ),
      l3(
        "Dặn khách: thấy hở đừng lột hay cạy mà quay lại tiệm, đeo găng khi rửa chén và lau dọn, không dùng móng để cạy hay mở đồ. Hẹn lịch dặm sau khoảng 3–4 tuần trước khi khách về. Dọn dẹp: đồ dùng một lần bỏ thùng có nắp, dụng cụ kim loại làm sạch và tiệt trùng, chai gel đậy kín, cất xa ánh nắng.",
        "Aftercare: if it lifts, don't peel or pick — come back; gloves for washing up and cleaning; don't use nails as tools. Book the infill in about 3–4 weeks before the customer leaves. Clear up: single-use items into a lidded bin, metal tools cleaned and sterilised, gel bottles closed and kept out of sunlight.",
        "Jälkihoito: jos geeli irtoaa, sitä ei revitä eikä kaiveta, vaan tullaan takaisin; käsineet tiskatessa ja siivotessa; kynsiä ei käytetä työkaluina. Varaa huolto noin 3–4 viikon päähän ennen kuin asiakas lähtee. Siivous: kertakäyttötuotteet kannelliseen roska-astiaan, metallivälineet puhdistetaan ja steriloidaan, geelipullot suljetaan ja pidetään poissa auringonvalosta."
      ),
    ],
    tips: [
      l3(
        "Mẹo hạt gel: thêm thì dễ, bớt mới khó. Lấy ít gel, làm hai lớp mỏng nếu cần — vừa dễ tạo dáng, vừa ít nóng hơn khi hơ.",
        "Bead tip: adding is easy, taking away is hard. Use little gel and two thin layers if needed — easier to shape and less heat in the lamp.",
        "Pisaravinkki: lisääminen on helppoa, poistaminen vaikeaa. Käytä vähän geeliä ja tarvittaessa kaksi ohutta kerrosta — muotoilu on helpompaa ja lampussa syntyy vähemmän lämpöä."
      ),
      l3(
        "Trong VaraaAi, đặt riêng dịch vụ “Builder gel” và “Dặm builder gel” với thời lượng thật của tiệm, rồi đặt luôn lịch dặm cho khách ngay tại quầy.",
        "In VaraaAi, create separate “Builder gel” and “Builder gel infill” services with your real durations, then book the customer's infill right at the desk.",
        "Luo VaraaAi:ssa erilliset palvelut ”Rakennegeeli” ja ”Rakennegeelin huolto” liikkeesi todellisilla kestoilla ja varaa asiakkaan huoltoaika heti tiskillä."
      ),
    ],
    quiz: [
      {
        q: l3("Đặt hạt builder gel đầu tiên ở đâu trên móng?", "Where do you place the first bead of builder gel?", "Mihin ensimmäinen rakennegeelipisara asetetaan?"),
        options: [
          l3("Ở giữa móng", "In the centre of the nail", "Kynnen keskelle"),
          l3("Sát da ở chân móng", "Right against the skin at the cuticle", "Ihoa vasten kynsinauhan kohdalle"),
          l3("Ngay mép đầu móng", "Right on the free edge", "Aivan vapaaseen reunaan"),
        ],
        answer: 0,
        why: l3(
          "Đặt ở giữa rồi dẫn nhẹ về chân móng, ra hai cạnh và đầu móng, để gel mỏng ở mép và không chạm da.",
          "Place it in the centre, then float it to the cuticle, the sides and the tip, so the edges stay thin and the skin stays clean.",
          "Aseta keskelle ja ohjaa sitten kynsinauhaa, sivuja ja kärkeä kohti, jotta reunat jäävät ohuiksi ja iho puhtaaksi."
        ),
      },
      {
        q: l3("Vì sao úp ngón tay khách xuống vài giây sau khi dẫn gel?", "Why turn the customer's finger nail-down for a few seconds after spreading the gel?", "Miksi asiakkaan sormi käännetään kynsi alaspäin muutamaksi sekunniksi geelin levittämisen jälkeen?"),
        options: [
          l3("Để gel khô nhanh hơn", "So the gel dries faster", "Jotta geeli kuivuu nopeammin"),
          l3("Để gel tự dồn về giữa, tạo điểm apex", "So the gel gathers in the middle and forms the apex", "Jotta geeli kerääntyy keskelle ja muodostaa apexin"),
          l3("Để gel chảy hết ra ngoài", "So the extra gel runs off", "Jotta ylimääräinen geeli valuu pois"),
        ],
        answer: 1,
        why: l3(
          "Gel đặc và tự chảy; trọng lực kéo gel về giữa thành một đường cong mềm. Lật lên rồi kiểm tra từ cạnh bên và từ đầu móng.",
          "The gel is thick and self-levelling; gravity draws it into the middle as a soft curve. Then turn the finger back and check from the side and end-on.",
          "Geeli on paksua ja itsetasoittuvaa; painovoima vetää sen keskelle pehmeäksi kaareksi. Käännä sitten sormi takaisin ja tarkista sivulta ja päästä."
        ),
      },
      {
        q: l3("Khi dũa hoàn thiện, điều nào sai?", "When finish filing, which of these is wrong?", "Mikä näistä on väärin viimeistelyviilauksessa?"),
        options: [
          l3("Đặt dũa 180 nằm trên mặt móng, dũa nhẹ", "Laying the 180 file flat on the surface and filing lightly", "180-viila tasaisesti pinnalla, kevyesti viilaten"),
          l3("Bật máy hút bụi, phủi bụi bằng chổi", "Running dust extraction and brushing the dust away", "Kohdepoisto päällä ja pölyn harjaaminen pois"),
          l3("Dũa sát vào móng thật ở chân móng cho thật phẳng", "Filing into the natural nail at the cuticle to make it really flat", "Viilaaminen omaan kynteen kynsinauhan kohdalla, jotta pinta on täysin tasainen"),
        ],
        answer: 2,
        why: l3(
          "Dũa vào móng thật làm móng mỏng và đau. Chỉ làm mịn lớp gel, và giữ nguyên điểm apex.",
          "Filing into the natural nail thins it and hurts. Smooth only the gel, and keep the apex.",
          "Omaan kynteen viilaaminen ohentaa sitä ja sattuu. Tasoita vain geeli ja säilytä apex."
        ),
      },
    ],
  },
  {
    slug: "noi-mong-form-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("Nối móng bằng form: hiểu đúng để móng dài mà không gãy", "Extensions on forms: understand them so long nails don't break", "Pidennykset muotilla: ymmärrä, niin pitkät kynnet eivät katkea"),
    summary: l3(
      "Nối dài móng bằng builder gel trên form: form giấy và form kim loại, vì sao form phải khít và thẳng, độ dài và sức chịu lực, cấu trúc móng nối, những lỗi hay gặp (khe hở, form chúc xuống hay vểnh lên, móng xiên, gãy ở vùng chịu lực, gel chạm da) và lịch dặm.",
      "Builder gel extensions on forms: paper and metal forms, why the form must fit snugly and sit straight, length versus strength, the structure of an extension, common faults (gaps, a form tilted down or up, crooked nails, breaks at the stress area, gel on the skin) and infills.",
      "Rakennegeelipidennykset muotilla: paperi- ja metallimuotit, miksi muotin on istuttava tiiviisti ja suoraan, pituus ja kestävyys, pidennyksen rakenne, yleiset virheet (rako, alas tai ylös kallistunut muotti, vino kynsi, murtuma rasitusalueelta, geeliä iholla) ja huollot."
    ),
    video: video("noi-mong-form-hieu-dung", 285, "2026-11-17"),
    notice: l3(
      "Thời gian hơ và cách dùng sản phẩm luôn theo hướng dẫn của hãng. Gel chưa chín không được chạm vào da. Móng có dấu hiệu bệnh hay da quanh móng sưng đỏ thì không làm. Quy định về sản phẩm làm móng khác nhau theo từng nước.",
      "Cure times and product use always follow the brand's instructions. Uncured gel must never touch the skin. Don't work on nails showing signs of disease or with red, swollen skin around them. Rules on nail products differ by country.",
      "Kovetusajat ja tuotteiden käyttö noudattavat aina valmistajan ohjeita. Kovettumaton geeli ei saa koskea ihoa. Älä työskentele kynsillä, joissa on sairauden merkkejä tai joiden ympärillä iho on punoittava ja turvonnut. Kynsituotteita koskevat määräykset vaihtelevat maittain."
    ),
    related: ["dich-vu", "bang-gia", "the-khach-quen"],
    steps: [
      l3(
        "Form là cái khuôn tạm đặt dưới đầu móng: gel được dựng trên đó, hơ chín, rồi gỡ form ra. Form giấy dùng một lần, dễ cắt cho vừa; form kim loại giữ đường thẳng tốt, dùng lại được sau khi làm sạch và khử khuẩn.",
        "A form is a temporary mould under the free edge: the gel is built on it, cured, and the form comes off. Paper forms are single-use and easy to trim; metal forms keep a straight line and are reused after cleaning and disinfection.",
        "Muotti on väliaikainen alusta vapaan reunan alla: geeli rakennetaan sen päälle, kovetetaan ja muotti irrotetaan. Paperimuotit ovat kertakäyttöisiä ja helppoja leikata; metallimuotit pitävät linjan suorana ja niitä käytetään uudelleen puhdistuksen ja desinfioinnin jälkeen."
      ),
      l3(
        "Form phải nối tiếp đường móng thật: nhìn từ cạnh bên đi thẳng ra từ đầu móng, nhìn từ trên xuống và từ đầu móng thẳng hàng với ngón tay. Form đặt thế nào, móng ra thế ấy.",
        "The form must continue the line of the natural nail: straight out from the free edge seen from the side, in line with the finger seen from above and end-on. As the form sits, so the nail turns out.",
        "Muotin on jatkettava oman kynnen linjaa: sivulta katsottuna suoraan vapaasta reunasta eteenpäin, ylhäältä ja edestä katsottuna samassa linjassa sormen kanssa. Kynsi tulee sellainen kuin muotti on asetettu."
      ),
      l3(
        "Form phải khít sát dưới đầu móng. Có khe hở thì gel chảy xuống dưới, thành gờ cộm và dễ giữ bẩn, phần nối không liền với móng thật nên yếu và dễ bong. Cần thì cắt lại đường cong của form cho vừa từng khách.",
        "The form must sit snugly under the free edge. If there is a gap, gel runs underneath, leaving a ridge that feels bulky and traps dirt, and the extension isn't bonded to the natural nail, so it is weak and lifts. Trim the form's curve to fit each customer if needed.",
        "Muotin on istuttava tiiviisti vapaan reunan alla. Jos väliin jää rako, geeli valuu alle, jättää kohouman, johon kertyy likaa, eikä pidennys liity omaan kynteen, joten se on heikko ja irtoaa. Leikkaa muotin kaarta tarvittaessa asiakkaan mukaan."
      ),
      l3(
        "Form chúc xuống làm móng cụp như cái móc; form vểnh lên làm móng hếch như cầu trượt; form lệch một bên làm móng xiên, hai cạnh không song song. Dũa sau gần như không cứu được — hãy nhìn ngón tay từ ba hướng trước khi đặt gel.",
        "A form tilted down gives a hooked nail; tilted up gives a ski-jump; turned to one side gives a crooked nail with side walls that aren't parallel. Filing can hardly fix it afterwards — check the finger from three directions before applying gel.",
        "Alaspäin kallistunut muotti tekee kynnestä koukkumaisen, ylöspäin kallistunut hyppyrimäen muotoisen ja sivuun kääntynyt vinon kynnen, jonka sivuseinät eivät ole yhdensuuntaiset. Viilaus ei juuri korjaa tätä — tarkista sormi kolmesta suunnasta ennen geeliä."
      ),
      l3(
        "Phần nối càng dài, lực dồn về vùng chịu lực (chỗ móng thật rời khỏi nền da) càng lớn. Chọn độ dài hợp với móng thật và công việc hằng ngày của khách; lần đầu nên vừa phải. Móng cắn sát, gần như không còn đầu móng, thì form khó tựa.",
        "The longer the extension, the more force on the stress area (where the natural nail leaves the nail bed). Choose a length that suits the customer's natural nail and daily work; keep the first set moderate. Bitten nails with almost no free edge give the form little to rest on.",
        "Mitä pidempi pidennys, sitä suurempi voima kohdistuu rasitusalueelle (kohtaan, jossa oma kynsi irtoaa kynsipedistä). Valitse pituus asiakkaan oman kynnen ja arjen mukaan; ensimmäisellä kerralla maltillinen. Pureskelluissa kynsissä, joissa vapaata reunaa ei juuri ole, muotilla ei ole tukea."
      ),
      l3(
        "Cấu trúc như bài lý thuyết builder gel: mỏng ở chân móng, mỏng ở đầu móng, dày nhất ở điểm apex trên vùng chịu lực, độ cong chữ C đều hai bên, hai cạnh bên thẳng và song song. Với móng nối, apex còn phải gánh cả phần móng dài.",
        "The structure is as in the builder gel theory lesson: thin at the cuticle, thin at the free edge, thickest at the apex over the stress area, an even C-curve, straight parallel side walls. On an extension the apex also carries the whole extended part.",
        "Rakenne on sama kuin rakennegeelin teoriatunnilla: ohut kynsinauhan kohdalla, ohut vapaassa reunassa, paksuin apexissa rasitusalueen päällä, tasainen C-kaari, suorat ja yhdensuuntaiset sivuseinät. Pidennyksessä apex kantaa lisäksi koko pidennetyn osan."
      ),
      l3(
        "Đầu móng nên mỏng và thanh nhưng không mỏng như giấy (người trong nghề hay ví: dày chừng tấm thẻ ngân hàng); chỗ phần nối gặp móng thật phải liền, không có bậc.",
        "The free edge should be thin and fine but not paper-thin (in the trade it's often compared to a bank card); where the extension meets the natural nail there should be no step.",
        "Vapaan reunan tulee olla ohut ja siro mutta ei paperinohut (alalla sitä verrataan usein pankkikorttiin); pidennyksen ja oman kynnen liitoskohdassa ei saa olla porrasta."
      ),
      l3(
        "Gãy ngang ở vùng chịu lực sau vài ngày thường là vì móng phẳng và mỏng đều, không có apex: gel đủ nhưng không nằm đúng chỗ. Sửa bằng cách đặt gel đúng chỗ, không phải đắp dày cả móng.",
        "A break across the stress area after a few days usually means a flat, evenly thin nail without an apex: enough gel, but not in the right place. Fix it by placing the gel correctly, not by making the whole nail thick.",
        "Murtuma rasitusalueen poikki muutaman päivän jälkeen johtuu yleensä litteästä, tasaisen ohuesta kynnestä ilman apexia: geeliä on tarpeeksi, mutta väärässä paikassa. Korjaa sijoittamalla geeli oikein, ei paksuntamalla koko kynttä."
      ),
      l3(
        "Gel chưa chín không chạm da (chân móng, khóe, hay chảy qua mép form xuống đầu ngón): chừa khe nhỏ như sợi tóc, lỡ dính thì lau trước khi hơ. Bật máy hút bụi khi dũa và hơ đủ thời gian của hãng. Dặm thường sau 3–4 tuần.",
        "Uncured gel never on the skin (cuticle, side walls, or running over the edge of the form onto the fingertip): keep a hair-thin gap and wipe any spill before curing. Use dust extraction when filing and cure for the brand's full time. Infills usually every 3–4 weeks.",
        "Kovettumatonta geeliä ei iholle (kynsinauha, sivuvallit tai muotin reunan yli sormenpäähän): jätä hiuksenohut rako ja pyyhi roiskeet ennen kovetusta. Käytä kohdepoistoa viilatessa ja kovete valmistajan koko ajan. Huolto yleensä 3–4 viikon välein."
      ),
    ],
    tips: [
      l3(
        "Kiểm tra form từ ba hướng — cạnh bên, trên xuống, đầu móng — chỉ mất vài giây nhưng cứu được cả bộ móng.",
        "Checking the form from three directions — side, top and end-on — takes seconds and saves the whole set.",
        "Muotin tarkistaminen kolmesta suunnasta — sivulta, ylhäältä ja edestä — vie sekunteja ja pelastaa koko kynsisetin."
      ),
      l3(
        "Trong VaraaAi, tách “nối móng mới” và “dặm móng nối” thành hai dịch vụ với thời lượng riêng, để lịch hẹn không bị dồn.",
        "In VaraaAi, set up a new extension set and an infill as two services with their own durations so the calendar doesn't get squeezed.",
        "VaraaAi:ssa kannattaa luoda uusi pidennyssetti ja huolto kahdeksi eri palveluksi omilla kestoillaan, jotta kalenteri ei ruuhkaudu."
      ),
    ],
    quiz: [
      {
        q: l3("Giữa đầu móng và form còn một khe hở nhỏ. Điều gì dễ xảy ra?", "There is a small gap between the free edge and the form. What is likely to happen?", "Vapaan reunan ja muotin väliin jää pieni rako. Mitä todennäköisesti tapahtuu?"),
        options: [
          l3("Không sao, gel sẽ tự lấp đầy và chắc hơn", "Nothing — the gel fills it and makes it stronger", "Ei mitään — geeli täyttää sen ja vahvistaa"),
          l3("Móng sẽ dài hơn dự định", "The nail turns out longer than planned", "Kynnestä tulee suunniteltua pidempi"),
          l3("Gel chảy xuống dưới, phần nối yếu và dễ bong", "Gel runs underneath and the extension is weak and lifts", "Geeli valuu alle, ja pidennys on heikko ja irtoaa"),
        ],
        answer: 2,
        why: l3(
          "Form phải khít sát dưới đầu móng để phần nối liền với móng thật.",
          "The form must sit snugly under the free edge so the extension bonds with the natural nail.",
          "Muotin on istuttava tiiviisti vapaan reunan alla, jotta pidennys liittyy omaan kynteen."
        ),
      },
      {
        q: l3("Form bị vểnh lên so với đường móng thì móng nối sẽ thế nào?", "If the form tilts upwards from the nail line, what does the extension look like?", "Jos muotti kallistuu ylöspäin kynnen linjasta, millainen pidennyksestä tulee?"),
        options: [
          l3("Hếch lên như cầu trượt tuyết", "It turns up like a ski jump", "Se kääntyy ylös kuin hyppyrimäki"),
          l3("Cụp xuống như cái móc", "It hooks down like a claw", "Se kaartuu alas kuin koukku"),
          l3("Không ảnh hưởng gì, dũa lại là được", "No effect — filing fixes it", "Ei vaikutusta — viilaus korjaa sen"),
        ],
        answer: 0,
        why: l3(
          "Gel đi theo form; cái sai nằm trong cả khung móng nên dũa sau gần như không cứu được.",
          "The gel follows the form; the fault is in the whole structure, so filing can hardly fix it.",
          "Geeli seuraa muottia; virhe on koko rakenteessa, joten viilaus ei juuri korjaa sitä."
        ),
      },
      {
        q: l3("Móng nối hay gãy ngang ở vùng chịu lực. Nguyên nhân thường gặp là gì?", "Extensions keep breaking across the stress area. What is the usual cause?", "Pidennykset katkeavat toistuvasti rasitusalueen poikki. Mikä on tavallinen syy?"),
        options: [
          l3("Đầu móng quá mỏng", "The free edge is too thin", "Vapaa reuna on liian ohut"),
          l3("Không có apex: gel mỏng ngay chỗ cần dày nhất", "No apex: the gel is thin exactly where it should be thickest", "Ei apexia: geeli on ohut juuri siellä, missä sen pitäisi olla paksuin"),
          l3("Hơ đèn quá lâu", "Curing for too long", "Liian pitkä kovetus"),
        ],
        answer: 1,
        why: l3(
          "Apex nằm trên vùng chịu lực và gánh phần nối; độ dài cũng phải hợp với móng thật của khách.",
          "The apex sits over the stress area and carries the extension; the length must also suit the customer's natural nail.",
          "Apex on rasitusalueen päällä ja kantaa pidennyksen; myös pituuden on sovittava asiakkaan omaan kynteen."
        ),
      },
    ],
  },
  {
    slug: "noi-mong-form",
    course: "p-nail",
    style: "practice",
    title: l3("Nối móng bằng form: thực hành từng bước", "Extensions on forms: step-by-step practice", "Pidennykset muotilla: käytäntö vaihe vaiheelta"),
    summary: l3(
      "Nối dài móng bằng builder gel trên form, từng bước: tư vấn và chọn độ dài, chuẩn bị khô, cắt và gắn form khít, kiểm tra từ ba hướng, lớp lót mỏng, dựng phần nối trên form, lớp phủ và apex, gỡ form, dũa hoàn thiện, màu và top, dầu dưỡng, dặn dò và hẹn lịch dặm.",
      "A builder gel extension on a form, step by step: consultation and choosing the length, dry prep, trimming and fitting the form snugly, checking from three directions, a thin base layer, building the extension on the form, the overlay and apex, removing the form, finish filing, colour and top coat, oil, aftercare and booking the infill.",
      "Rakennegeelipidennys muotilla vaihe vaiheelta: konsultaatio ja pituuden valinta, kuiva esikäsittely, muotin leikkaus ja tiivis asettaminen, tarkistus kolmesta suunnasta, ohut pohjakerros, pidennyksen rakentaminen muotille, päällyste ja apex, muotin irrotus, viimeistelyviilaus, väri ja päällyslakka, öljy, kotihoito-ohjeet ja huoltoajan varaus."
    ),
    video: video("noi-mong-form", 285, "2026-11-17"),
    notice: l3(
      "Thời gian hơ, chế độ đèn và cách làm lớp lót (hơ hay không hơ) luôn theo hướng dẫn của hãng. Gel không được chạm vào da. Khách thấy nóng rát thì rút tay ra vài giây rồi hơ tiếp cho đủ. Quy định về sản phẩm làm móng khác nhau theo từng nước.",
      "Cure times, lamp mode and how the base layer is handled (cured or not) always follow the brand's instructions. Gel must never touch the skin. If the customer feels burning heat, take the hand out for a few seconds, then finish the cure. Rules on nail products differ by country.",
      "Kovetusajat, lampun tila ja pohjakerroksen käsittely (kovetetaanko vai ei) noudattavat aina valmistajan ohjeita. Geeli ei saa koskea ihoa. Jos asiakas tuntee polttavaa kuumuutta, ota käsi pois muutamaksi sekunniksi ja jatka sitten kovetusta loppuun. Kynsituotteita koskevat määräykset vaihtelevat maittain."
    ),
    related: ["dich-vu", "lich-hen", "khach-hang"],
    steps: [
      l3(
        "Tư vấn và kiểm tra: rửa và sát khuẩn tay, xem móng và da quanh móng (móng tách, đổi màu, da sưng đỏ, có mủ, vết thương hở: không làm, khuyên đi khám), hỏi về phản ứng với gel trước đây, chọn độ dài và dáng hợp với móng thật và công việc của khách (lần đầu nên vừa phải), nói trước lịch dặm 3–4 tuần.",
        "Consultation and checks: wash and disinfect hands, look at nails and skin (lifting, discolouration, swollen red skin, pus, open wounds: don't work, suggest a doctor), ask about earlier reactions to gel, choose a length and shape that suit the natural nail and the customer's work (moderate for a first set), mention the 3–4-week infill up front.",
        "Konsultaatio ja tarkistus: pese ja desinfioi kädet, katso kynnet ja iho (irtoaminen, värimuutos, turvonnut punoittava iho, märkä, avohaava: älä tee, ohjaa lääkäriin), kysy aiemmista geelireaktioista, valitse pituus ja muoto oman kynnen ja asiakkaan työn mukaan (ensimmäisellä kerralla maltillinen) ja kerro 3–4 viikon huoltovälistä jo alussa."
      ),
      l3(
        "Chuẩn bị khô như bài sơn gel và bài builder gel; dũa ngắn đầu móng thật nhưng chừa lại một chút để form tựa vào. Sau đó không chạm tay vào mặt móng.",
        "Dry prep as in the gel polish and builder gel lessons; shorten the natural free edge but leave a little for the form to rest against. Don't touch the nail plate afterwards.",
        "Kuiva esikäsittely kuten geelilakka- ja rakennegeelitunneilla; lyhennä omaa vapaata reunaa, mutta jätä vähän muotin tueksi. Älä koske kynsilevyyn sen jälkeen."
      ),
      l3(
        "Chuẩn bị form: ướm dưới đầu móng, cắt lại đường cong nếu chưa khớp để form ôm sát, không hở.",
        "Prepare the form: try it under the free edge and trim its curve if needed so it hugs the nail with no gap.",
        "Valmistele muotti: sovita se vapaan reunan alle ja leikkaa kaarta tarvittaessa, jotta se istuu tiiviisti ilman rakoa."
      ),
      l3(
        "Gắn form: luồn dưới đầu móng, đẩy cho khít; nhìn từ trên xuống (thẳng hàng với ngón tay, giữa móng), từ đầu móng (nằm ngang, không nghiêng) và từ cạnh bên (nối tiếp đường móng, không chúc xuống, không vểnh lên); rồi bóp hai đuôi form dưới ngón tay. Lúc mới học, làm từng ngón một; ngón cái thường làm riêng.",
        "Fit the form: slide it under the free edge until snug; check from above (in line with the finger, centred), end-on (level, not tilted) and from the side (continuing the nail line, not dipping, not lifting); then pinch the form's tails together under the finger. While learning, do one finger at a time; thumbs are usually done separately.",
        "Aseta muotti: liu'uta se vapaan reunan alle tiiviisti; tarkista ylhäältä (samassa linjassa sormen kanssa, keskellä), edestä (vaakasuorassa, ei kallellaan) ja sivulta (jatkaa kynnen linjaa, ei laske eikä nouse); purista sitten muotin hännät yhteen sormen alla. Opetteluvaiheessa yksi sormi kerrallaan; peukalot tehdään yleensä erikseen."
      ),
      l3(
        "Lớp lót thật mỏng: ấn và chà nhẹ một chút gel vào mặt móng, gạt bớt phần thừa, chừa một đường nhỏ cách da; hơ hoặc để ướt đúng như hướng dẫn của hãng.",
        "A very thin base layer: work a little gel into the nail plate, remove the excess and keep a tiny gap from the skin; cure it or leave it wet exactly as the brand says.",
        "Hyvin ohut pohjakerros: hiero vähän geeliä kynsilevyyn, poista ylimäärä ja jätä pieni rako ihoon; kovete tai jätä märäksi valmistajan ohjeen mukaan."
      ),
      l3(
        "Dựng phần nối trên form: đặt gel ngay trước mép móng thật, dàn mỏng trên form thành phần móng dài, liền với mép móng thật; tạo luôn độ dài, dáng đầu móng và hai cạnh thẳng nối tiếp cạnh móng thật; gel không tràn qua mép form. Hơ theo thời gian của hãng.",
        "Build the extension on the form: place gel right in front of the natural free edge and spread it thinly over the form into the extension, joined to the free edge; set the length, tip shape and straight side walls that continue the natural ones now; don't let gel run over the edge of the form. Cure for the brand's time.",
        "Rakenna pidennys muotille: aseta geeli heti oman vapaan reunan eteen ja levitä se ohueksi pidennykseksi muotille, liitettynä vapaaseen reunaan; muotoile pituus, kärki ja suorat sivuseinät oman kynnen jatkeeksi; geeli ei saa valua muotin reunan yli. Kovete valmistajan ajan."
      ),
      l3(
        "Lớp phủ và apex: đặt một hạt gel ở vùng chịu lực, dẫn nhẹ về chân móng và dừng cách da như sợi tóc, rồi ra hai cạnh và hết phần nối, bọc kín đầu móng. Úp tay khách vài giây, kiểm tra từ cạnh bên và từ đầu móng, sửa khi gel còn ướt, rồi hơ đủ; lau lớp dính nếu có.",
        "Overlay and apex: place a bead of gel over the stress area, float it towards the cuticle and stop a hair's width from the skin, then out to the side walls and over the whole extension, capping the tip. Turn the hand over for a few seconds, check from the side and end-on, correct while wet, then cure fully; remove the sticky layer if there is one.",
        "Päällyste ja apex: aseta geelipisara rasitusalueelle, ohjaa sitä kynsinauhaa kohti ja pysähdy hiuksen paksuisen raon päähän ihosta, sitten sivuille ja koko pidennyksen yli kärki suljettuna. Käännä käsi hetkeksi alaspäin, tarkista sivulta ja edestä, korjaa märkänä ja kovete kunnolla; poista tahmakerros, jos sellainen jää."
      ),
      l3(
        "Gỡ form: nới hai đuôi, kéo form xuống dưới, không bẻ ngược lên. Mặt dưới phần nối phải phẳng, sạch, liền với móng thật; có gờ gel thì dũa nhẹ cho sạch và lần sau đặt form khít hơn.",
        "Remove the form: loosen the tails and pull the form downwards, never bend it back up. The underside of the extension should be flat, clean and joined to the natural nail; file away any gel ridge and fit the form more snugly next time.",
        "Irrota muotti: löysää hännät ja vedä muotti alaspäin, älä taivuta sitä ylös. Pidennyksen alapinnan tulee olla tasainen, puhdas ja liittyä omaan kynteen; viilaa mahdollinen geeliharjanne pois ja aseta muotti seuraavalla kerralla tiiviimmin."
      ),
      l3(
        "Dũa hoàn thiện với máy hút bụi và khẩu trang: dũa 180 tạo dáng đầu móng và hai cạnh thẳng, song song; dũa mặt móng mịn, giữ apex; ở chân móng dũa mỏng cho liền mà không dũa vào móng thật. Phủi bụi bằng chổi, lau sạch, rồi nhìn lại từ ba hướng cho các móng đều nhau.",
        "Finish filing with dust extraction and a mask: a 180 file to shape the tip and straight, parallel side walls; smooth the surface while keeping the apex; blend thinly at the cuticle without filing into the natural nail. Brush off the dust, wipe, then check from three directions that all nails match.",
        "Viimeistelyviilaus kohdepoiston ja maskin kanssa: 180-viilalla kärki ja suorat, yhdensuuntaiset sivuseinät; tasoita pinta apex säilyttäen; ohenna kynsinauhan kohdalta viilaamatta omaa kynttä. Harjaa pöly, pyyhi ja tarkista kolmesta suunnasta, että kaikki kynnet ovat samanlaiset."
      ),
      l3(
        "Màu (nếu muốn) sơn mỏng như bài sơn gel, top bọc qua mép đầu móng và hơ đủ, rồi dầu dưỡng. Dặn khách: đừng cạy, đeo găng khi rửa chén, mấy ngày đầu cẩn thận với độ dài mới, hở hay nứt thì quay lại tiệm; hẹn dặm sau 3–4 tuần. Form giấy bỏ vào thùng rác có nắp; form kim loại làm sạch và khử khuẩn trước khi dùng lại.",
        "Colour (if wanted) thinly as in the gel polish lesson, top coat capping the free edge and cured fully, then oil. Tell the customer: don't pick, wear gloves for washing up, take care with the new length for the first days, come back if it lifts or cracks; book the infill in 3–4 weeks. Paper forms go in a lidded bin; metal forms are cleaned and disinfected before reuse.",
        "Väri (halutessa) ohuesti kuten geelilakkatunnilla, päällyslakka vapaan reunan yli ja kunnollinen kovetus, sitten öljy. Kerro asiakkaalle: älä nypi, käytä käsineitä tiskatessa, varo uutta pituutta ensimmäisinä päivinä ja tule takaisin, jos kynsi irtoaa tai halkeaa; varaa huolto 3–4 viikon päähän. Paperimuotit kannelliseen roska-astiaan; metallimuotit puhdistetaan ja desinfioidaan ennen uudelleenkäyttöä."
      ),
    ],
    tips: [
      l3(
        "Dựng phần nối mỏng như một tấm nền; độ chắc đến từ lớp phủ có apex đúng chỗ, không phải từ một lớp thật dày.",
        "Build the extension layer thin, like a base; strength comes from the overlay with a well-placed apex, not from one thick layer.",
        "Rakenna pidennyskerros ohueksi kuin pohja; lujuus tulee päällysteestä ja oikein sijoitetusta apexista, ei yhdestä paksusta kerroksesta."
      ),
      l3(
        "Trong VaraaAi, khi khách thanh toán, đặt luôn lịch dặm 3–4 tuần sau và ghi độ dài, dáng móng vào ghi chú của khách để lần sau làm giống hệt.",
        "In VaraaAi, book the 3–4-week infill as the customer pays and note the length and shape in the customer's notes so next time matches exactly.",
        "VaraaAi:ssa varaa 3–4 viikon huolto heti maksun yhteydessä ja kirjaa pituus ja muoto asiakkaan muistiinpanoihin, jotta seuraava kerta onnistuu samanlaisena."
      ),
    ],
    quiz: [
      {
        q: l3("Gắn form xong, bạn kiểm tra thế nào trước khi đặt gel?", "After fitting the form, how do you check it before applying gel?", "Miten tarkistat muotin ennen geelin levittämistä?"),
        options: [
          l3("Chỉ cần nhìn từ trên xuống", "Looking from above is enough", "Ylhäältä katsominen riittää"),
          l3("Không cần kiểm tra, dũa sau sẽ sửa", "No need — filing will fix it later", "Ei tarvitse — viilaus korjaa myöhemmin"),
          l3("Nhìn từ trên xuống, từ đầu móng và từ cạnh bên", "From above, end-on and from the side", "Ylhäältä, edestä ja sivulta"),
        ],
        answer: 2,
        why: l3(
          "Form lệch hay nghiêng làm cả khung móng sai; kiểm tra ba hướng chỉ mất vài giây.",
          "A form that is turned or tilted makes the whole structure wrong; checking three directions takes seconds.",
          "Kääntynyt tai kallistunut muotti tekee koko rakenteesta väärän; kolmen suunnan tarkistus vie sekunteja."
        ),
      },
      {
        q: l3("Gỡ form thế nào cho đúng?", "How do you remove the form correctly?", "Miten muotti irrotetaan oikein?"),
        options: [
          l3("Nới hai đuôi rồi kéo form xuống dưới", "Loosen the tails and pull the form downwards", "Löysää hännät ja vedä muotti alaspäin"),
          l3("Bẻ form ngược lên phía trên", "Bend the form back upwards", "Taivuta muotti ylöspäin"),
          l3("Gỡ ngay khi gel còn ướt", "Remove it while the gel is still wet", "Irrota se geelin ollessa vielä märkää"),
        ],
        answer: 0,
        why: l3(
          "Gel phải chín hẳn trước; bẻ ngược lên có thể làm nứt hay bong phần nối.",
          "The gel must be fully cured first; bending the form upwards can crack or lift the extension.",
          "Geelin on oltava täysin kovettunut; ylöspäin taivuttaminen voi halkaista tai irrottaa pidennyksen."
        ),
      },
      {
        q: l3("Đặt hạt gel tạo apex ở đâu?", "Where do you place the bead that forms the apex?", "Mihin apexin muodostava geelipisara asetetaan?"),
        options: [
          l3("Sát chân móng, chạm da", "Right at the cuticle, touching the skin", "Kynsinauhan viereen ihoa koskettaen"),
          l3("Ở vùng chịu lực, chỗ móng thật rời khỏi nền da", "Over the stress area, where the natural nail leaves the nail bed", "Rasitusalueelle, kohtaan jossa oma kynsi irtoaa kynsipedistä"),
          l3("Ở mép ngoài cùng của phần nối", "At the very end of the extension", "Pidennyksen uloimpaan reunaan"),
        ],
        answer: 1,
        why: l3(
          "Apex nằm trên vùng chịu lực để gánh phần móng dài; chân móng và đầu móng phải mỏng.",
          "The apex sits over the stress area to carry the extension; the cuticle area and the tip stay thin.",
          "Apex on rasitusalueen päällä kantamassa pidennystä; kynsinauhan alue ja kärki pysyvät ohuina."
        ),
      },
    ],
  },
  {
    slug: "dap-bot-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("Đắp bột acrylic: hiểu đúng để làm bền và an toàn", "Acrylic: understand it for lasting, safe nails", "Akryyli: ymmärrä, niin kynnet kestävät ja työ on turvallista"),
    summary: l3(
      "Bột acrylic cứng lại thế nào mà không cần đèn, tỉ lệ liquid và bột — hạt quá ướt, quá khô —, cấu trúc móng (vùng chịu lực, apex, độ cong chữ C), primer, vì sao bột bị hở, hơi và bụi, chất MMA, dị ứng, dặm và tháo.",
      "How acrylic sets without a lamp, the liquid-to-powder ratio — beads too wet and too dry —, nail structure (stress area, apex, C-curve), primer, why acrylic lifts, vapour and dust, MMA, allergy, infills and removal.",
      "Miten akryyli kovettuu ilman lamppua, nesteen ja jauheen suhde — liian märkä ja liian kuiva helmi —, kynnen rakenne (rasitusalue, apex, C-kaari), primer, miksi akryyli irtoaa, höyryt ja pöly, MMA, allergia, huolto ja poisto."
    ),
    video: video("dap-bot-hieu-dung", 312, "2026-11-17"),
    notice: l3(
      "Liquid có mùi mạnh và dễ cháy: hút khí tại bàn, thông gió, để xa lửa, đậy nắp. Tỉ lệ, primer và thời gian luôn theo hướng dẫn của hãng. Liquid và bột chưa cứng không được chạm vào da. Quy định khác nhau theo từng nước và thành phố.",
      "Acrylic liquid has a strong vapour and is flammable: local exhaust at the table, ventilation, no flames, lids on. Ratio, primer and times always follow the brand's instructions. Liquid and unset product must never touch the skin. Rules differ by country and city.",
      "Akryylineste höyryää voimakkaasti ja on syttyvää: kohdepoisto pöydässä, ilmanvaihto, ei avotulta, kannet kiinni. Suhde, primer ja ajat noudattavat aina valmistajan ohjetta. Neste ja kovettumaton massa eivät saa koskea ihoon. Määräykset vaihtelevat maittain ja kunnittain."
    ),
    sources: [
      HELSINKI_HYGIENE,
      { label: "U.S. FDA — Nail care products (methyl methacrylate)", url: "https://www.fda.gov/cosmetics/cosmetic-products/nail-care-products" },
      { label: "BfR (German Federal Institute for Risk Assessment) — Liquid agents for nail modelling with high methyl methacrylate contents, opinion 014/2012", url: "https://www.bfr.bund.de/cm/349/liquid-agents-for-nail-modelling-with-high-methyl-methacrylate-contents-present-a-health-risk.pdf" },
    ],
    related: ["kho-hang", "dich-vu", "khach-hang"],
    steps: [
      l3(
        "Acrylic có hai phần: liquid (phần lỏng) và bột. Khi cọ ướt liquid chạm vào bột, phản ứng bắt đầu ngay ngoài không khí, không cần đèn, và hạt bột cứng lại sau vài phút — nên phải đặt và vuốt dứt khoát.",
        "Acrylic has two parts: the liquid and the powder. When the wet brush touches the powder the reaction starts at once in the air, with no lamp, and the bead sets within minutes — so place and press it decisively.",
        "Akryylissä on kaksi osaa: neste ja jauhe. Kun märkä sivellin koskee jauheeseen, reaktio alkaa heti ilmassa ilman lamppua ja helmi kovettuu muutamassa minuutissa — siksi helmi asetetaan ja painetaan päättäväisesti."
      ),
      l3(
        "Tỉ lệ liquid–bột là điều quan trọng nhất. Hạt đúng: ẩm, bóng, tròn, giữ được hình và chỉ dàn ra một chút. Mỗi hãng có tỉ lệ riêng; tập trên móng tập trước khi làm cho khách.",
        "The liquid-to-powder ratio matters most. A good bead is moist, glossy and round, holds its shape and only settles a little. Every brand has its own ratio; practise on training nails before working on customers.",
        "Nesteen ja jauheen suhde on tärkeintä. Hyvä helmi on kostea, kiiltävä ja pyöreä, pitää muotonsa ja leviää vain vähän. Jokaisella merkillä on oma suhteensa; harjoittele harjoituskynsillä ennen asiakastöitä."
      ),
      l3(
        "Hạt quá ướt chảy, tràn vào khóe và chân móng, lâu cứng và yếu; liquid dư chưa phản ứng có thể đọng trên da và dẫn tới dị ứng. Hạt quá khô thì sần, có lỗ li ti, mép bở, bám kém và dễ ố.",
        "A bead that is too wet runs, floods the side walls and cuticle, sets slowly and is weak; unreacted liquid can sit on the skin and lead to allergy. A bead that is too dry is grainy and porous, crumbles at the edge, grips poorly and stains.",
        "Liian märkä helmi valuu kynsivalleihin ja kynsinauhaan, kovettuu hitaasti ja jää heikoksi; reagoimaton neste voi jäädä iholle ja johtaa allergiaan. Liian kuiva helmi on rakeinen ja huokoinen, murenee reunasta, tarttuu huonosti ja värjäytyy."
      ),
      l3(
        "Cấu trúc như builder gel: mỏng ở chân móng và đầu móng, dày nhất ở apex trên vùng chịu lực (chỗ móng rời khỏi nền da, hơi lùi về sau), độ cong chữ C đều, hai cạnh thẳng. Móng nối càng dài càng cần cấu trúc đúng.",
        "Structure as for builder gel: thin at the cuticle and the tip, thickest at the apex over the stress area (where the nail leaves the bed, slightly behind it), an even C-curve and straight side walls. The longer the extension, the more the structure matters.",
        "Rakenne kuten rakennegeelissä: ohut kynsinauhan kohdalla ja kärjessä, paksuin apexissa rasitusalueen päällä (siinä missä kynsi irtoaa kynsipedistä, hieman sen takana), tasainen C-kaari ja suorat sivut. Mitä pidempi pidennys, sitä tärkeämpi rakenne."
      ),
      l3(
        "Bám chắc nhờ chuẩn bị: làm khô, lấy sạch lớp da mỏng trên mặt móng, chà mất bóng, lau bụi và dầu. Primer (có axit hoặc không axit) chỉ thoa thật mỏng trên mặt móng, không chạm da vì có thể làm da bỏng rát; dùng theo hướng dẫn của hãng.",
        "Adhesion comes from prep: dry prep, remove the cuticle tissue from the plate, take off the shine, clear dust and oil. Primer (acid or acid-free) goes on very thinly, on the nail plate only — never on skin, which it can burn; use it as the brand says.",
        "Tartunta syntyy esikäsittelystä: kuiva esikäsittely, kynsinauhakudos pois levyltä, kiilto pois, pöly ja öljy pois. Primer (hapollinen tai hapoton) levitetään hyvin ohuesti vain kynsilevylle — ei koskaan iholle, jota se voi polttaa; käytä valmistajan ohjeen mukaan."
      ),
      l3(
        "Bột hở thường do: chuẩn bị chưa kỹ, primer quá ít hoặc quá nhiều, bột chạm da, mép ở chân móng quá dày, hạt quá khô, hoặc thiếu apex. Thấy hở thì không đắp đè: dũa bỏ phần hở rồi mới dặm.",
        "Lifting usually comes from poor prep, too little or too much primer, product on the skin, a thick edge at the cuticle, a dry bead or a missing apex. Never cover a lifted area: file it away first, then infill.",
        "Irtoaminen johtuu yleensä huonosta esikäsittelystä, liian vähäisestä tai runsaasta primeristä, massasta iholla, paksusta reunasta kynsinauhan kohdalla, kuivasta helmestä tai puuttuvasta apexista. Irronnutta kohtaa ei peitetä: viilaa se ensin pois ja huolla sitten."
      ),
      l3(
        "Hơi liquid mạnh và dễ cháy. Hướng dẫn vệ sinh của thành phố Helsinki: nơi làm móng bột, bàn làm phải có hệ thống hút tại chỗ đủ hiệu quả; khi dũa sinh bụi cũng phải hút tại chỗ. Đeo khẩu trang khi dũa.",
        "The liquid's vapour is strong and flammable. The City of Helsinki's hygiene guidance: where acrylic nails are done, the workstation must have sufficiently efficient local exhaust ventilation, and filing dust must be extracted locally too. Wear a mask when filing.",
        "Nesteen höyry on voimakas ja syttyvä. Helsingin kaupungin hygieniaohje: jos tiloissa tehdään akryylikynsiä, työpisteessä on oltava riittävän tehokas kohdepoisto, ja myös viilauspöly on poistettava kohdepoistolla. Käytä maskia viilatessa."
      ),
      l3(
        "Rót liquid ít, vừa một khách, vào chén nhỏ có nắp và đậy lại khi không dùng; đậy chai ngay, xa lửa. Liquid thừa không đổ vào bồn rửa — xử lý theo bảng dữ liệu an toàn của sản phẩm và quy định rác thải nơi bạn làm.",
        "Pour a small amount of liquid, enough for one customer, into a dappen dish with a lid and cover it when not in use; close the bottle at once, away from flames. Leftover liquid never goes down the sink — dispose of it as the product's safety data sheet and local waste rules say.",
        "Kaada nestettä vähän, yhden asiakkaan tarpeeseen, kannelliseen dappen-astiaan ja peitä se, kun sitä ei käytetä; sulje pullo heti, kaukana avotulesta. Ylijäänyttä nestettä ei kaadeta viemäriin — hävitä se tuotteen käyttöturvallisuustiedotteen ja paikallisten jätemääräysten mukaan."
      ),
      l3(
        "MMA: cơ quan FDA của Mỹ đã cho rút khỏi thị trường liquid làm hoàn toàn bằng MMA sau nhiều ca tổn thương móng và da; viện đánh giá rủi ro BfR của Đức khuyên nhà sản xuất không dùng MMA trong hệ bột–liquid. Liquid chuyên nghiệp thường dùng chất khác như EMA. Chỉ mua sản phẩm có nhãn rõ và bảng dữ liệu an toàn.",
        "MMA: the US FDA had liquids made of 100 % MMA taken off the market after injuries to nails and skin; Germany's BfR advises manufacturers not to use MMA in powder–liquid systems. Professional liquids usually use other monomers such as EMA. Buy only clearly labelled products with a safety data sheet.",
        "MMA: Yhdysvaltain FDA poisti markkinoilta 100-prosenttisesti MMA:sta tehdyt nesteet kynsi- ja ihovaurioiden jälkeen; Saksan BfR neuvoo valmistajia olemaan käyttämättä MMA:ta jauhe–neste-järjestelmissä. Ammattinesteissä käytetään yleensä muita monomeerejä, kuten EMA:ta. Osta vain selvästi merkittyjä tuotteita, joilla on käyttöturvallisuustiedote."
      ),
      l3(
        "Dặm thường mỗi 2–3 tuần vì apex trôi ra theo móng mọc. Nói thật với khách: bột chắc nhưng móng thật cần được nâng niu, không cạy. Tháo: bột tan trong acetone nhưng lâu hơn gel nhiều — dũa mỏng bớt, ủ, đẩy nhẹ phần đã mềm, không bao giờ cạy (xem bài tháo gel). Dị ứng: xem bài dị ứng và hóa chất.",
        "Infill usually every 2–3 weeks, as the apex moves forward with growth. Be honest: acrylic is strong, but the natural nail underneath needs care — no prying. Removal: acrylic soaks off in acetone but takes much longer than gel — file the bulk down, soak, push only softened product, never pry (see the gel removal lesson). Allergy: see the allergy and chemicals lesson.",
        "Huolto yleensä 2–3 viikon välein, koska apex siirtyy kasvun mukana eteenpäin. Kerro rehellisesti: akryyli on vahva, mutta alla oleva oma kynsi tarvitsee hoitoa — ei vääntämistä. Poisto: akryyli liukenee asetoniin, mutta paljon hitaammin kuin geeli — viilaa paksuus pois, liota, työnnä vain pehmennyt massa, älä koskaan väännä (katso geelin poiston oppitunti). Allergia: katso allergiat ja kemikaalit -oppitunti."
      ),
    ],
    tips: [
      l3(
        "Nhìn mặt bột vừa vuốt: mịn, bóng ẩm, không lỗ là tỉ lệ đúng.",
        "Look at the bead you have just pressed: smooth, moist-glossy and free of pits means the ratio is right.",
        "Katso juuri painettua helmeä: sileä, kostean kiiltävä ja kuopaton tarkoittaa oikeaa suhdetta."
      ),
      l3(
        "Sản phẩm rẻ bất thường, không nhãn rõ, không có bảng dữ liệu an toàn: đừng mua.",
        "Unusually cheap, no clear label, no safety data sheet: don't buy it.",
        "Epätavallisen halpa, ei selkeää merkintää, ei käyttöturvallisuustiedotetta: älä osta."
      ),
    ],
    quiz: [
      {
        q: l3("Hạt bột quá ướt (nhiều liquid, ít bột) gây ra điều gì?", "What does a bead that is too wet (much liquid, little powder) cause?", "Mitä liian märkä helmi (paljon nestettä, vähän jauhetta) aiheuttaa?"),
        options: [
          l3("Mặt bột sần và có lỗ li ti", "A grainy, pitted surface", "Rakeisen, kuoppaisen pinnan"),
          l3("Chảy tràn vào khóe móng, yếu, và liquid dư có thể đọng trên da", "It floods the side walls, is weak, and leftover liquid can sit on the skin", "Se valuu kynsivalleihin, jää heikoksi ja ylimääräistä nestettä voi jäädä iholle"),
          l3("Cứng ngay lập tức, không kịp vuốt", "It sets instantly, before you can press it", "Se kovettuu heti, ennen kuin sitä ehtii painaa"),
        ],
        answer: 1,
        why: l3(
          "Quá ướt thì chảy, lâu cứng và yếu; liquid chưa phản ứng hết trên da là con đường dẫn tới dị ứng. Sần, có lỗ là dấu hiệu quá khô.",
          "Too wet runs, sets slowly and is weak; unreacted liquid on the skin is a route to allergy. Grainy and pitted means too dry.",
          "Liian märkä valuu, kovettuu hitaasti ja jää heikoksi; reagoimaton neste iholla on tie allergiaan. Rakeinen ja kuoppainen tarkoittaa liian kuivaa."
        ),
      },
      {
        q: l3("Theo hướng dẫn vệ sinh của Helsinki, bàn làm móng bột cần gì?", "Under Helsinki's hygiene guidance, what does an acrylic workstation need?", "Mitä akryylityöpiste tarvitsee Helsingin hygieniaohjeen mukaan?"),
        options: [
          l3("Một cây nến thơm để át mùi", "A scented candle to mask the smell", "Tuoksukynttilän peittämään hajua"),
          l3("Chỉ cần mở cửa sổ khi khách về", "Just open a window when the customer leaves", "Riittää avata ikkuna asiakkaan lähdettyä"),
          l3("Hệ thống hút tại chỗ đủ hiệu quả", "Sufficiently efficient local exhaust ventilation", "Riittävän tehokkaan kohdepoiston"),
        ],
        answer: 2,
        why: l3(
          "Hơi và bụi phải được hút ngay nơi chúng sinh ra. Nến là lửa — liquid dễ cháy.",
          "Vapour and dust must be extracted where they are produced. A candle is a flame — the liquid is flammable.",
          "Höyry ja pöly on poistettava siellä, missä ne syntyvät. Kynttilä on avotuli — neste on syttyvää."
        ),
      },
      {
        q: l3("Bột bị hở ở chân móng. Nên làm gì?", "The acrylic has lifted at the cuticle. What should you do?", "Akryyli on irronnut kynsinauhan kohdalta. Mitä teet?"),
        options: [
          l3("Dũa bỏ phần hở, rồi mới dặm", "File the lifted part away, then infill", "Viilaan irronneen osan pois ja huollan sitten"),
          l3("Đắp thêm bột đè lên chỗ hở", "Put more acrylic over the lifted area", "Lisään akryyliä irronneen kohdan päälle"),
          l3("Nhỏ keo dán vào khe hở", "Run glue into the gap", "Laitan liimaa rakoon"),
        ],
        answer: 0,
        why: l3(
          "Dưới chỗ hở có thể đọng nước và bẩn; đắp đè lên là nhốt chúng lại. Phải dũa bỏ phần hở trước.",
          "Water and dirt can collect under a lifted area; covering it seals them in. File the lifted part away first.",
          "Irronneen kohdan alle voi kertyä vettä ja likaa; päälle rakentaminen sulkee ne sisään. Viilaa irronnut osa ensin pois."
        ),
      },
    ],
  },
  {
    slug: "dap-bot-acrylic",
    course: "p-nail",
    style: "practice",
    title: l3("Đắp bột acrylic: thực hành từng bước", "Acrylic extensions: step-by-step practice", "Akryylipidennykset: käytäntö vaihe vaiheelta"),
    summary: l3(
      "Nối dài bằng bột trên form: tư vấn, chuẩn bị khô, primer, gắn form, lấy hạt bột, ba hạt bột, chờ cứng và tháo form, kiểm tra ba hướng, dũa, hoàn thiện, dặn dò và rửa cọ.",
      "A sculpted acrylic extension on a form: consultation, dry prep, primer, fitting the form, picking up a bead, the three-bead method, setting and removing the form, checking from three sides, filing, finishing, aftercare and brush care.",
      "Muotille muotoiltu akryylipidennys: konsultaatio, kuiva esikäsittely, primer, muotin asettaminen, helmen ottaminen, kolmen helmen menetelmä, kovettuminen ja muotin poisto, tarkastus kolmesta suunnasta, viilaus, viimeistely, kotihoito-ohjeet ja siveltimen hoito."
    ),
    video: video("dap-bot-acrylic", 282, "2026-11-17"),
    notice: l3(
      "Bật hệ thống hút tại bàn trước khi mở liquid; để xa lửa. Primer và bột không được chạm vào da. Tỉ lệ, thời gian khô và cứng luôn theo hướng dẫn của hãng. Quy định khác nhau theo từng nước và thành phố.",
      "Switch on the local exhaust before opening the liquid; keep away from flames. Primer and acrylic must never touch the skin. Ratio, drying and setting times always follow the brand's instructions. Rules differ by country and city.",
      "Käynnistä kohdepoisto ennen nesteen avaamista; pidä kaukana avotulesta. Primer ja akryyli eivät saa koskea ihoon. Suhde, kuivumis- ja kovettumisajat noudattavat aina valmistajan ohjetta. Määräykset vaihtelevat maittain ja kunnittain."
    ),
    sources: [HELSINKI_HYGIENE],
    related: ["lich-hen", "bang-gia", "dich-vu"],
    steps: [
      l3(
        "Rửa và sát khuẩn tay, xem móng và da: móng tách, đổi màu, da sưng đỏ, có mủ hay vết thương hở thì không làm và khuyên khách đi khám. Hỏi tiền sử dị ứng, độ dài và form khách muốn, hẹn dặm sau 2–3 tuần. Bật máy hút ở bàn.",
        "Wash and disinfect hands and check nails and skin: lifting, discolouration, swollen red skin, pus or open wounds — don't work, advise a doctor. Ask about past reactions, length and shape, and mention infills every 2–3 weeks. Switch on the table extraction.",
        "Pese ja desinfioi kädet ja tarkasta kynnet ja iho: irtoaminen, värimuutos, turvonnut punainen iho, märkä tai avohaava — älä tee työtä, ohjaa lääkäriin. Kysy aiemmista reaktioista, pituudesta ja muodosta ja kerro huollosta 2–3 viikon välein. Käynnistä pöydän kohdepoisto."
      ),
      l3(
        "Chuẩn bị khô như bài sơn gel: đẩy da, lấy sạch lớp da mỏng trên mặt móng, dũa ngắn đầu móng, chà mất bóng, phủi bụi và lau. Sau đó không chạm vào mặt móng.",
        "Dry prep as in the gel polish lesson: push back, remove cuticle tissue from the plate, shorten the tip, take off the shine, dust and cleanse. Don't touch the nail plate afterwards.",
        "Kuiva esikäsittely kuten geelilakkauksessa: työnnä kynsinauhat, poista kudos levyltä, lyhennä kärki, poista kiilto, harjaa pöly ja puhdista. Älä koske kynsilevyyn sen jälkeen."
      ),
      l3(
        "Chất làm khô và primer đúng loại, đúng cách hãng hướng dẫn: một lớp thật mỏng, chỉ trên mặt móng, tránh da và khóe móng; để khô theo thời gian của hãng.",
        "Dehydrator and primer exactly as the brand says: one very thin layer, on the nail plate only, away from the skin and side walls; let it dry for the brand's time.",
        "Kuivatusaine ja primer tarkalleen valmistajan ohjeen mukaan: yksi hyvin ohut kerros vain kynsilevylle, poissa iholta ja kynsivalleista; anna kuivua valmistajan ajan."
      ),
      l3(
        "Form nằm sát, khít dưới đầu móng, không khe hở, thẳng hàng với ngón tay; nhìn từ cạnh bên, form nối tiếp đường móng, không chúc xuống, không vểnh lên. Dùng tip thì dán vừa khít, cắt ngắn và dũa mỏng chỗ nối.",
        "The form sits snugly under the free edge with no gap, in line with the finger; from the side it continues the line of the nail, neither dipping nor tilting up. With a tip: fit it to the nail's width, shorten it and blend the join thin.",
        "Muotti istuu tiiviisti vapaan reunan alla ilman rakoa ja sormen suuntaisesti; sivulta katsoen se jatkaa kynnen linjaa, ei painu alas eikä nouse ylös. Tipin kanssa: sovita leveyteen, lyhennä ja ohenna liitos."
      ),
      l3(
        "Rót ít liquid vào chén nhỏ có nắp. Nhúng cọ cho ngấm, gạt vào thành chén; chạm đầu cọ vào bột, giữ một chút cho thành hạt tròn. Hạt đúng: ẩm, bóng, tròn, không nhỏ giọt, không khô vụn.",
        "Pour a little liquid into a dappen dish with a lid. Dip the brush, wipe it on the rim, touch the tip to the powder and hold it there a moment until a round bead forms. A good bead is moist, glossy and round — not dripping, not crumbly.",
        "Kaada vähän nestettä kannelliseen dappen-astiaan. Kasta sivellin, pyyhi se reunaan, kosketa kärjellä jauhetta ja pidä hetki, kunnes muodostuu pyöreä helmi. Hyvä helmi on kostea, kiiltävä ja pyöreä — ei valu eikä murene."
      ),
      l3(
        "Hạt một: trên form, ngay trước mép móng thật — tạo chiều dài, form đầu móng và hai cạnh thẳng. Hạt hai: vùng chịu lực, dựng apex, nối liền với phần đầu. Hạt ba: nhỏ, gần chân móng, vuốt thật mỏng, chừa khe hở như sợi tóc, không chạm da.",
        "Bead one: on the form, just in front of the natural free edge — it sets the length, tip shape and straight side walls. Bead two: the stress area — it builds the apex and blends into the tip. Bead three: small, near the cuticle, pressed very thin with a hair-thin gap, never touching the skin.",
        "Helmi yksi: muotille aivan oman vapaan reunan eteen — se määrää pituuden, kärjen muodon ja suorat sivut. Helmi kaksi: rasitusalueelle — se rakentaa apexin ja sulautuu kärkeen. Helmi kolme: pieni, kynsinauhan lähelle, painetaan hyvin ohueksi hiuksenohuen raon jättäen, ei koskaan iholle."
      ),
      l3(
        "Ấn và vuốt bằng thân cọ đặt gần như nằm ngang; giữa các hạt lau cọ và nhúng lại liquid. Bột lỡ chạm da thì gạt đi ngay khi còn mềm.",
        "Press and stroke with the belly of the brush held almost flat; wipe the brush and re-wet it between beads. If product touches the skin, lift it off at once while still soft.",
        "Paina ja silitä siveltimen kyljellä lähes vaakatasossa; pyyhi ja kostuta sivellin helmien välillä. Jos massaa joutuu iholle, poista se heti, kun se on vielä pehmeää."
      ),
      l3(
        "Chờ bột cứng (vài phút, tùy hãng): gõ nhẹ cán cọ nghe tiếng cạch khô là được. Không tháo form khi bột còn mềm; tháo nhẹ, kéo xuống dưới. Kiểm tra từ cạnh bên (mỏng–cao ở vùng chịu lực–mỏng), từ đầu móng (chữ C đều) và từ trên xuống (cạnh thẳng).",
        "Let it set (a few minutes, depending on the brand): a light tap with the brush handle gives a dry click. Never remove the form while soft; take it off gently, downwards. Check from the side (thin – highest at the stress area – thin), from the end (even C-curve) and from above (straight side walls).",
        "Anna kovettua (muutama minuutti merkistä riippuen): kevyt koputus siveltimen varrella antaa kuivan naksahduksen. Älä poista muottia pehmeänä; irrota varovasti alaspäin. Tarkasta sivulta (ohut – korkein rasitusalueella – ohut), päästä (tasainen C-kaari) ja ylhäältä (suorat sivut)."
      ),
      l3(
        "Dũa khi máy hút chạy và đeo khẩu trang, nhẹ tay: đầu móng đúng form, cạnh bên thẳng, mặt móng mịn và giữ apex; chân móng mỏng, liền với móng thật nhưng không dũa vào móng thật. Phao mịn, phủi bụi bằng chổi (không thổi), lau sạch.",
        "File with the extraction running and a mask on, with a light hand: tip to shape, side walls straight, surface smooth with the apex kept; thin at the cuticle, blended into the natural nail but never filed into it. Buff, brush the dust off (don't blow) and cleanse.",
        "Viilaa kohdepoisto päällä ja maski kasvoilla kevyellä kädellä: kärki muotoon, sivut suoriksi, pinta sileäksi apex säilyttäen; ohut kynsinauhan kohdalta, sulautettuna omaan kynteen mutta viilaamatta siihen. Hio, harjaa pöly pois (älä puhalla) ja puhdista."
      ),
      l3(
        "Top bóng hoặc màu tùy khách, rồi dầu dưỡng. Dặn: không cạy, đeo găng khi làm việc nhà, dầu mỗi ngày, hở thì quay lại tiệm, dặm sau 2–3 tuần. Rửa cọ bằng chính liquid của hãng (không dùng acetone), cất nằm ngang hoặc như hãng khuyên; đậy chén và chai, liquid thừa xử lý theo bảng dữ liệu an toàn.",
        "Top coat or colour as the customer wishes, then oil. Advise: no prying, gloves for housework, oil daily, come back if it lifts, infill in 2–3 weeks. Clean the brush in the brand's own liquid (never acetone) and store it flat or as the brand says; close the dish and bottle, and dispose of leftover liquid per the safety data sheet.",
        "Päällyslakka tai väri asiakkaan toiveen mukaan, sitten öljy. Neuvo: ei vääntämistä, käsineet kotitöihin, öljyä päivittäin, irrotessa takaisin liikkeeseen, huolto 2–3 viikon päästä. Puhdista sivellin merkin omalla nesteellä (ei asetonilla) ja säilytä se vaakatasossa tai valmistajan ohjeen mukaan; sulje astia ja pullo ja hävitä ylijäänyt neste käyttöturvallisuustiedotteen mukaan."
      ),
    ],
    tips: [
      l3(
        "Lúc mới tập, hạt nhỏ dễ điều khiển hơn hạt to.",
        "While you are learning, small beads are easier to control than big ones.",
        "Harjoitusvaiheessa pienet helmet on helpompi hallita kuin isot."
      ),
      l3(
        "Form có khe hở dưới đầu móng thì bột chảy xuống dưới: sửa form trước khi đặt hạt đầu tiên.",
        "A gap under the free edge lets acrylic run underneath: fix the form before the first bead.",
        "Rako vapaan reunan alla päästää akryylin valumaan alle: korjaa muotti ennen ensimmäistä helmeä."
      ),
    ],
    quiz: [
      {
        q: l3("Trong cách đắp ba hạt, hạt thứ hai đặt ở đâu?", "In the three-bead method, where does the second bead go?", "Mihin toinen helmi asetetaan kolmen helmen menetelmässä?"),
        options: [
          l3("Sát da ở chân móng", "Right against the skin at the cuticle", "Aivan ihoa vasten kynsinauhan kohdalle"),
          l3("Ở vùng chịu lực, để dựng apex", "In the stress area, to build the apex", "Rasitusalueelle rakentamaan apexia"),
          l3("Dưới form, phía dưới đầu móng", "Under the form, below the tip", "Muotin alle, kärjen alapuolelle"),
        ],
        answer: 1,
        why: l3(
          "Hạt một ở đầu móng trên form, hạt hai ở vùng chịu lực tạo apex, hạt ba nhỏ và mỏng gần chân móng — không bao giờ chạm da.",
          "Bead one goes on the form at the tip, bead two in the stress area for the apex, bead three small and thin near the cuticle — never touching the skin.",
          "Helmi yksi menee muotille kärkeen, helmi kaksi rasitusalueelle apexiksi, helmi kolme pienenä ja ohuena kynsinauhan lähelle — ei koskaan iholle."
        ),
      },
      {
        q: l3("Rửa cọ đắp bột bằng gì?", "What do you clean an acrylic brush with?", "Millä akryylisivellin puhdistetaan?"),
        options: [
          l3("Acetone, cho sạch nhanh", "Acetone, to clean it fast", "Asetonilla, jotta se puhdistuu nopeasti"),
          l3("Nước nóng và xà phòng", "Hot water and soap", "Kuumalla vedellä ja saippualla"),
          l3("Chính liquid của hãng", "The brand's own liquid", "Merkin omalla nesteellä"),
        ],
        answer: 2,
        why: l3(
          "Acetone làm khô và hỏng lông cọ. Rửa bằng liquid, lau, vuốt nhọn và cất như hãng khuyên.",
          "Acetone dries and ruins the bristles. Clean with liquid, wipe, reshape the point and store as the brand advises.",
          "Asetoni kuivattaa ja pilaa harjakset. Puhdista nesteellä, pyyhi, muotoile kärki ja säilytä valmistajan ohjeen mukaan."
        ),
      },
      {
        q: l3("Làm sao biết bột đã cứng để tháo form?", "How do you know the acrylic has set and the form can come off?", "Mistä tiedät, että akryyli on kovettunut ja muotin voi poistaa?"),
        options: [
          l3("Gõ nhẹ cán cọ lên móng, nghe tiếng cạch khô", "Tap it lightly with the brush handle and hear a dry click", "Koputan kevyesti siveltimen varrella ja kuulen kuivan naksahduksen"),
          l3("Ngay khi đặt xong hạt thứ ba", "As soon as the third bead is placed", "Heti kun kolmas helmi on asetettu"),
          l3("Khi mặt bột còn bóng ướt", "While the surface still looks wet and glossy", "Kun pinta näyttää vielä märältä ja kiiltävältä"),
        ],
        answer: 0,
        why: l3(
          "Tháo form khi bột còn mềm làm đầu móng cong vênh. Chờ đủ thời gian theo hãng và gõ thử.",
          "Removing the form while the acrylic is soft warps the tip. Wait the brand's time and do the tap test.",
          "Muotin poistaminen pehmeänä vääntää kärjen. Odota valmistajan aika ja tee koputustesti."
        ),
      },
    ],
  },
  {
    slug: "fill-mong-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("Dặm móng: hiểu đúng để móng luôn cân và chắc", "Infills: understand them so the nails stay balanced and strong", "Huolto: ymmärrä se, niin kynnet pysyvät tasapainossa ja vahvoina"),
    summary: l3(
      "Điều gì xảy ra khi móng mọc (khoảng hở ở chân móng, apex trôi ra đầu, móng nặng đầu và lực bẻ dồn vào vùng chịu lực), vì sao dặm đúng hẹn, khi nào dặm và khi nào phải tháo hết, vì sao không bao giờ dặm đè lên chỗ hở, dùng đúng hệ sản phẩm, cân lại móng, dũa an toàn ở chân móng, bụi và dị ứng.",
      "What growth does to a set (a gap at the cuticle, the apex drifting forward, a tip-heavy nail levering on the stress area), why to infill on time, when to infill and when to remove everything, why never to fill over lifting, matching products, rebalancing, safe filing at the cuticle, dust and allergy.",
      "Mitä kasvu tekee kynsille (rako kynsinauhan kohdalla, apex siirtyy eteenpäin, kärkipainoinen kynsi vipuaa rasitusaluetta), miksi huolto ajallaan, milloin huolletaan ja milloin poistetaan kaikki, miksi irtoaman päälle ei koskaan tehdä huoltoa, yhteensopivat tuotteet, tasapainotus, turvallinen viilaus kynsinauhan kohdalla, pöly ja allergia."
    ),
    video: video("fill-mong-hieu-dung", 291, "2026-11-17"),
    notice: l3(
      "Khoảng thời gian dặm chỉ là thường gặp: builder gel khoảng 3–4 tuần, bột khoảng 2–3 tuần, tùy móng, tùy công việc của khách và tùy hãng. Thấy đổi màu, đau, sưng đỏ hay móng tách khỏi nền thì không làm và khuyên khách đi khám. Quy định về sản phẩm và hút bụi khác nhau theo từng nước. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Infill intervals are typical ranges only: builder gel about 3–4 weeks, acrylic about 2–3 weeks, depending on the nail, the customer's work and the brand. Discolouration, pain, swollen red skin or a nail separating from its bed: don't work, suggest a doctor. Rules on products and dust extraction differ by country. This lesson is a training aid, not a licence.",
      "Huoltovälit ovat vain tyypillisiä: rakennegeeli noin 3–4 viikkoa, akryyli noin 2–3 viikkoa, kynnestä, asiakkaan työstä ja valmistajasta riippuen. Värimuutos, kipu, turvonnut punoittava iho tai alustastaan irtoava kynsi: älä tee, ohjaa lääkäriin. Tuotteita ja kohdepoistoa koskevat määräykset vaihtelevat maittain. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    related: ["lich-hen", "khach-hang", "tin-nhan-ai"],
    steps: [
      l3(
        "Móng mọc kéo cả lớp sản phẩm theo: ở chân móng có một khoảng móng thật mới chưa phủ, rộng dần theo từng tuần, và một cái bậc ở chỗ lớp cũ dừng lại.",
        "As the nail grows it carries the product with it: a band of new natural nail appears at the cuticle, wider every week, with a step where the old product ends.",
        "Kasvaessaan kynsi vie tuotteen mukanaan: kynsinauhan kohdalle syntyy viikko viikolta levenevä kaistale uutta omaa kynttä ja porras siihen, missä vanha tuote päättyy."
      ),
      l3(
        "Apex trôi dần về phía đầu móng; phần dày nhất nằm phía trước, móng dài và nặng đầu. Như một đòn bẩy, lực bẻ dồn vào vùng chịu lực, nơi không còn được apex đỡ: móng gãy ngang hoặc bật lên ở chân móng.",
        "The apex drifts towards the free edge; the thickest part sits in front and the nail becomes long and tip-heavy. Like a lever, the force lands on the stress area, which the apex no longer supports: the nail snaps or lifts at the cuticle.",
        "Apex siirtyy kohti vapaata reunaa; paksuin kohta on edessä ja kynsi pitkä ja kärkipainoinen. Kuin vipu, voima kohdistuu rasitusalueeseen, jota apex ei enää tue: kynsi katkeaa tai irtoaa kynsinauhan kohdalta."
      ),
      l3(
        "Đừng đợi gãy hay hở mới dặm. Builder gel thường 3–4 tuần, bột thường 2–3 tuần; móng mọc nhanh hay khách làm việc nặng tay thì hẹn sớm hơn.",
        "Don't wait for breaks or lifting. Builder gel usually every 3–4 weeks, acrylic usually every 2–3 weeks; fast growth or heavy hand work means sooner.",
        "Älä odota katkeamista tai irtoamista. Rakennegeeli yleensä 3–4 viikon, akryyli yleensä 2–3 viikon välein; nopea kasvu tai raskas käsityö tarkoittaa aikaisempaa huoltoa."
      ),
      l3(
        "Dặm khi lớp cũ còn bám chắc, chỉ hở nhỏ ở mép. Tháo hết khi hở thành mảng lớn hay có túi khí. Vết xanh hay đổi màu dưới chỗ hở, đau, sưng đỏ, móng tách khỏi nền: không làm, khuyên đi khám (xem bài Khi nào không làm cho khách; cách tháo xem bài tháo gel).",
        "Infill when the old product is still well bonded with only small lifting at the edges. Remove everything when large areas have lifted or there are air pockets. A green patch or discolouration under the lifting, pain, swollen red skin, a nail separating from its bed: don't work, suggest a doctor (see the lesson on when not to work; for removal, see the gel removal lesson).",
        "Huolla, kun vanha tuote on yhä hyvin kiinni ja vain reunoilla on pientä irtoamaa. Poista kaikki, kun laajoja alueita on irronnut tai alla on ilmataskuja. Vihreä läiskä tai värimuutos irtoaman alla, kipu, turvonnut punoittava iho, alustastaan irtoava kynsi: älä tee, ohjaa lääkäriin (katso tunti siitä, milloin ei tehdä; poistosta geelin poiston tunti)."
      ),
      l3(
        "Không bao giờ đắp đè lên chỗ hở: nước, dầu và bụi bẩn bị nhốt lại, ấm và ẩm, là chỗ cho vi khuẩn và nấm, và lớp mới bong rất nhanh. Dũa bỏ phần hở tới khi mép còn lại bám chắc, mỏng, liền với móng.",
        "Never put product over lifting: water, oil and dirt get sealed in, warm and moist — a place for bacteria and fungi — and the new layer soon lifts too. File the lifting away until the remaining edge is bonded, thin and flush with the nail.",
        "Irtoaman päälle ei koskaan laiteta tuotetta: vesi, öljy ja lika jäävät loukkuun lämpimään ja kosteaan — paikka bakteereille ja sienille — ja uusikin kerros irtoaa pian. Viilaa irtoama pois, kunnes jäljelle jäävä reuna on kiinni, ohut ja tasainen kynnen kanssa."
      ),
      l3(
        "Dùng cùng loại sản phẩm: gel trên gel, bột trên bột. Muốn dùng loại hay hãng khác thì xem hãng có nói là dùng chung được không; trộn bừa có thể không bám hoặc chín không đều.",
        "Use the same product: gel on gel, acrylic on acrylic. To mix types or brands, check that the brand says they are compatible; random mixing may not bond or cure evenly.",
        "Käytä samaa tuotetta: geeliä geelin päälle, akryyliä akryylin päälle. Jos sekoitat tyyppejä tai merkkejä, tarkista, että valmistaja ilmoittaa ne yhteensopiviksi; summittainen sekoittaminen voi heikentää tarttuvuutta tai kovettumista."
      ),
      l3(
        "Dặm là cân lại bộ móng: dũa mỏng lớp cũ (nhất là apex đã trôi ra trước), cắt ngắn nếu cần và giữ form, đắp phần móng mới mọc, dựng lại apex trên vùng chịu lực. Mỗi lần dặm phải dũa mỏng lại, nếu không bộ móng dày và nặng dần.",
        "An infill rebalances the set: thin the old product (especially the apex that moved forward), shorten if needed and keep the shape, cover the regrowth and rebuild the apex over the stress area. Thin it down every time, or the set gets thicker and heavier.",
        "Huolto tasapainottaa kynnet: ohenna vanha tuote (etenkin eteenpäin siirtynyt apex), lyhennä tarvittaessa muodon säilyttäen, peitä uusi kasvu ja rakenna apex uudelleen rasitusalueen päälle. Ohenna joka kerta, muuten kynnet paksuuntuvat ja raskastuvat."
      ),
      l3(
        "Chân móng là móng thật mới mọc, mỏng và mềm: chỉ lướt phao nhẹ cho mất bóng. Không dũa vào móng thật (móng mỏng dần, nóng, đau) và không dũa vào da (vết thương hở). Dũa tay hay dũa máy cũng vậy.",
        "At the cuticle the new natural nail is thin and soft: only buff lightly to remove the shine. Never file into the natural nail (it thins, heats and hurts) or the skin (an open wound). The same goes for hand files and e-files.",
        "Kynsinauhan kohdalla uusi oma kynsi on ohut ja pehmeä: hio vain kevyesti kiilto pois. Älä koskaan viilaa omaan kynteen (se ohenee, kuumenee ja sattuu) tai ihoon (avohaava). Sama koskee käsiviiloja ja sähköviiloja."
      ),
      l3(
        "Dặm là dũa nhiều: máy hút tại bàn, khẩu trang, găng tay; phủi bụi bằng chổi, đừng thổi. Bụi gel chưa chín hết và gel dính da đều có thể gây dị ứng (xem bài Dị ứng và hoá chất).",
        "Infills mean a lot of filing: extraction at the table, mask, gloves; brush dust away, don't blow. Dust from under-cured gel and gel on skin can both cause allergy (see the allergy and chemicals lesson).",
        "Huollossa viilataan paljon: kohdepoisto pöydässä, maski, käsineet; harjaa pöly pois, älä puhalla. Puutteellisesti kovettuneen geelin pöly ja iholle joutunut geeli voivat molemmat aiheuttaa allergian (katso allergia- ja kemikaalitunti)."
      ),
      l3(
        "Nói thật với khách: bộ móng dặm đúng hẹn thì bền lâu và móng thật vẫn khỏe; để quá hạn thì sớm muộn cũng gãy, hở và nhiều khi phải tháo hết. Hẹn lịch dặm trước khi khách ra về và giải thích vì sao.",
        "Be honest with the customer: a set filled on time lasts and the natural nails stay healthy; an overdue one sooner or later breaks or lifts and often has to come off. Book the next infill before the customer leaves and explain why.",
        "Kerro asiakkaalle suoraan: ajallaan huolletut kynnet kestävät ja omat kynnet pysyvät terveinä; myöhästynyt huolto johtaa ennemmin tai myöhemmin katkeamiseen tai irtoamiseen, ja usein kaikki joudutaan poistamaan. Varaa seuraava huolto ennen kuin asiakas lähtee ja kerro miksi."
      ),
    ],
    tips: [
      l3(
        "Nhìn bộ móng từ cạnh bên trước khi dặm: điểm cao nhất đã trôi tới đâu? Đó là chỗ phải dũa mỏng, và chỗ apex mới phải lùi về.",
        "Look at the set from the side before you start: where has the highest point moved to? That's what you thin down, and where the new apex must move back from.",
        "Katso kynsiä sivulta ennen aloittamista: minne korkein kohta on siirtynyt? Sen kohdan ohennat, ja sieltä uusi apex siirretään takaisin oikealle paikalleen."
      ),
      l3(
        "Trong VaraaAi, ghi vào hồ sơ khách móng nào hay hở hay gãy, và đặt lịch dặm kế tiếp ngay tại quầy, đánh dấu gửi email xác nhận và nhắc lịch cho khách.",
        "In VaraaAi, note in the customer record which nails tend to lift or break, and book the next infill right at the desk, ticking the box to email the customer a confirmation and reminder.",
        "Merkitse VaraaAi:n asiakastietoihin, mitkä kynnet irtoavat tai katkeavat herkästi, ja varaa seuraava huolto heti tiskillä ja valitse vahvistuksen ja muistutuksen lähetys asiakkaalle sähköpostitse."
      ),
    ],
    quiz: [
      {
        q: l3("Vì sao móng để quá hạn dặm dễ gãy?", "Why does an overdue set break more easily?", "Miksi myöhässä huollettu kynsi katkeaa helpommin?"),
        options: [
          l3("Vì sản phẩm hết hạn sử dụng", "Because the product has expired", "Koska tuote on vanhentunut"),
          l3("Vì apex trôi ra đầu móng, móng nặng đầu và lực bẻ dồn vào vùng chịu lực", "Because the apex has moved forward, the nail is tip-heavy and the force lands on the stress area", "Koska apex on siirtynyt eteenpäin, kynsi on kärkipainoinen ja voima kohdistuu rasitusalueeseen"),
          l3("Vì móng thật ngừng mọc", "Because the natural nail stops growing", "Koska oma kynsi lakkaa kasvamasta"),
        ],
        answer: 1,
        why: l3(
          "Móng mọc kéo apex ra phía trước. Đầu móng dài và nặng như một đòn bẩy, còn vùng chịu lực thì không còn được apex đỡ.",
          "Growth carries the apex forward. The long, heavy tip acts as a lever, and the stress area is no longer supported by the apex.",
          "Kasvu vie apexin eteenpäin. Pitkä, raskas kärki toimii vipuna, eikä apex enää tue rasitusaluetta."
        ),
      },
      {
        q: l3("Khách quay lại, mép ở chân móng hở một chút. Làm gì?", "The customer is back and the edge at the cuticle has lifted slightly. What do you do?", "Asiakas palaa, ja reuna on irronnut hieman kynsinauhan kohdalta. Mitä teet?"),
        options: [
          l3("Dũa bỏ phần hở tới khi mép bám chắc, rồi mới dặm", "File the lifting away until the edge is bonded, then infill", "Viilaa irtoama pois, kunnes reuna on kiinni, ja huolla sitten"),
          l3("Đắp đè gel lên cho kín chỗ hở", "Put gel over it to seal the gap", "Laita geeliä päälle sulkemaan rako"),
          l3("Cạy phần hở ra cho nhanh", "Pick the lifted part off to save time", "Revi irronnut osa pois ajan säästämiseksi"),
        ],
        answer: 0,
        why: l3(
          "Đắp đè sẽ nhốt ẩm và bụi bẩn bên dưới; cạy thì kéo theo lớp móng thật. Dũa nhẹ là cách an toàn.",
          "Covering it seals in moisture and dirt; picking tears off natural nail layers. Gentle filing is the safe way.",
          "Päälle laittaminen sulkee kosteuden ja lian sisään; repiminen irrottaa omaa kynttä. Kevyt viilaus on turvallinen tapa."
        ),
      },
      {
        q: l3("Dưới chỗ hở có một vết xanh nhỏ. Điều nào đúng?", "There is a small green patch under the lifting. Which is right?", "Irtoaman alla on pieni vihreä läiskä. Mikä on oikein?"),
        options: [
          l3("Dặm như bình thường, vì vết nhỏ", "Infill as usual, it's small", "Huolla tavalliseen tapaan, koska läiskä on pieni"),
          l3("Phủ màu đậm lên để che đi", "Cover it with a dark colour", "Peitä se tummalla värillä"),
          l3("Không dặm, không đắp lại, khuyên khách đi khám", "No infill, no new product, suggest a doctor", "Ei huoltoa eikä uutta tuotetta, ohjaa lääkäriin"),
        ],
        answer: 2,
        why: l3(
          "Đổi màu dưới chỗ hở có thể là dấu hiệu nhiễm trùng. Không làm gì thêm, và khuyên khách đi khám.",
          "Discolouration under lifting can be a sign of infection. Do nothing more and suggest a doctor.",
          "Värimuutos irtoaman alla voi olla merkki tulehduksesta. Älä tee enempää ja ohjaa asiakas lääkäriin."
        ),
      },
    ],
  },
  {
    slug: "fill-mong",
    course: "p-nail",
    style: "practice",
    title: l3("Dặm móng gel và bột: thực hành từng bước", "Builder gel and acrylic infills: step-by-step practice", "Geelin ja akryylin huolto: käytäntö vaihe vaiheelta"),
    summary: l3(
      "Dặm một bộ builder gel hay bột đã mọc ra vài tuần: tư vấn và kiểm tra dưới ánh sáng tốt, chuẩn bị phần móng mới, dũa bỏ chỗ hở, dũa mỏng lớp cũ, làm liền đường nối, làm sạch, lớp bám chỉ trên móng mới, đắp và dựng lại apex (gel và bột), dũa hoàn thiện, màu, dầu dưỡng và hẹn lịch dặm.",
      "Filling a builder gel or acrylic set that has grown out for a few weeks: consultation and checks under good light, prepping the regrowth, filing away lifting, thinning the old product, blending the line, cleansing, bonder only on the regrowth, applying product and rebuilding the apex (gel and acrylic), finish filing, colour, oil and booking the next infill.",
      "Muutaman viikon kasvaneiden rakennegeeli- tai akryylikynsien huolto: konsultaatio ja tarkistus hyvässä valossa, uuden kasvun esikäsittely, irtoamien viilaus pois, vanhan tuotteen ohennus, saumakohdan tasoitus, puhdistus, tartunta-aine vain uudelle kasvulle, tuotteen levitys ja apexin uudelleenrakennus (geeli ja akryyli), viimeistelyviilaus, väri, öljy ja seuraavan huollon varaus."
    ),
    video: video("fill-mong", 285, "2026-11-17"),
    notice: l3(
      "Lớp bám, primer, thời gian hơ và thời gian chờ bột cứng luôn theo hướng dẫn của hãng. Hở thành mảng lớn, có túi khí, đổi màu, đau hay sưng đỏ thì không dặm: tháo hết hoặc khuyên khách đi khám. Máy dũa chỉ dùng khi đã được đào tạo. Quy định khác nhau theo từng nước.",
      "Bonder, primer, cure times and acrylic set times always follow the brand's instructions. Large lifting, air pockets, discolouration, pain or swollen red skin: no infill — remove everything or suggest a doctor. Use an e-file only if you have been trained. Rules differ by country.",
      "Tartunta-aine, primer, kovetusajat ja akryylin kovettumisajat noudattavat aina valmistajan ohjeita. Laaja irtoama, ilmataskut, värimuutos, kipu tai turvonnut punoittava iho: ei huoltoa — poista kaikki tai ohjaa lääkäriin. Käytä sähköviilaa vain koulutettuna. Määräykset vaihtelevat maittain."
    ),
    related: ["lich-hen", "dich-vu", "khach-hang"],
    steps: [
      l3(
        "Tư vấn và kiểm tra: rửa và sát khuẩn tay, hỏi khách có móng nào gãy, hở hay đau, rồi nhìn từng móng dưới ánh sáng tốt, nghiêng qua lại — hở nhỏ thường chỉ là một đường mờ ở mép. Hở mảng lớn, túi khí, đổi màu, đau, sưng đỏ: không dặm. Ghi móng hay hở vào hồ sơ khách.",
        "Consultation and checks: wash and disinfect hands, ask about breaks, lifting or pain, then look at each nail under good light, tilting it — small lifting is often just a faint line at the edge. Large lifting, air pockets, discolouration, pain, swollen red skin: no infill. Note nails that tend to lift in the customer record.",
        "Konsultaatio ja tarkistus: pese ja desinfioi kädet, kysy katkeamista, irtoamista tai kivusta ja katso jokainen kynsi hyvässä valossa kallistellen — pieni irtoama on usein vain himmeä viiva reunassa. Laaja irtoama, ilmataskut, värimuutos, kipu, turvonnut punoittava iho: ei huoltoa. Merkitse herkästi irtoavat kynnet asiakastietoihin."
      ),
      l3(
        "Chuẩn bị phần móng mới mọc như một móng mới (bài sơn gel): chuẩn bị khô, đẩy da nhẹ, lấy sạch lớp da mỏng trên móng, lướt phao thật nhẹ chỉ trên phần móng mới cho mất bóng.",
        "Prep the regrowth like a fresh nail (gel polish lesson): dry prep, push back gently, remove the thin tissue on the plate, buff lightly only on the regrowth to remove the shine.",
        "Esikäsittele uusi kasvu kuin uusi kynsi (geelilakkatunti): kuiva esikäsittely, työnnä kynsinauhat kevyesti, poista ohut iho kynsilevyltä, hio kevyesti vain uutta kasvua kiillon poistamiseksi."
      ),
      l3(
        "Tìm mép hở ở chân móng và hai cạnh, dũa nhẹ tới khi mép còn lại bám chắc và liền với móng; nhìn lại dưới đèn. Không cạy, không giật. Dũa mãi vẫn hở hay hở cả mảng: dừng lại, tháo hết rồi làm lại (bài tháo gel).",
        "Find lifting at the cuticle and side walls and file it away until the remaining edge is bonded and flush; check again under the light. Never pick or pull. If it keeps lifting or a whole area is loose: stop, remove everything and start again (gel removal lesson).",
        "Etsi irtoamat kynsinauhan kohdalta ja sivuilta ja viilaa ne pois, kunnes jäljelle jäävä reuna on kiinni ja tasainen; tarkista uudelleen valossa. Älä koskaan revi tai kisko. Jos irtoamaa vain jatkuu tai koko alue on irti: lopeta, poista kaikki ja aloita alusta (geelin poiston tunti)."
      ),
      l3(
        "Dũa mỏng lớp cũ: dũa nằm trên mặt móng, bớt độ dày, nhất là apex cũ đã trôi ra trước; cắt và dũa ngắn nếu móng quá dài, giữ đúng form. Không dũa xuyên xuống móng thật. Máy dũa chỉ khi đã được học kỹ, mũi dũa luôn trên lớp sản phẩm.",
        "Thin the old product: file flat on the surface, reducing the bulk, especially the old apex that moved forward; shorten if too long, keeping the shape. Never file through to the natural nail. An e-file only if trained, the bit always on the product.",
        "Ohenna vanha tuote: viilaa tasaisesti pinnalla ja vähennä paksuutta, etenkin eteenpäin siirtynyttä vanhaa apexia; lyhennä tarvittaessa muodon säilyttäen. Älä koskaan viilaa omaan kynteen asti. Sähköviila vain koulutettuna, terä aina tuotteen päällä."
      ),
      l3(
        "Làm liền đường nối: dũa nhẹ cái bậc giữa lớp cũ và móng mới cho mỏng dần và phẳng, sờ không còn gờ; dũa nằm, nhẹ tay, giữ dũa xa da.",
        "Blend the line: gently file the step between old product and regrowth until it is thin and flat with no ridge you can feel; file flat, lightly, away from the skin.",
        "Tasoita sauma: viilaa vanhan tuotteen ja uuden kasvun välinen porras kevyesti ohueksi ja tasaiseksi, ettei reunaa tunnu; viilaa tasaisesti, kevyesti ja ihosta poispäin."
      ),
      l3(
        "Làm sạch: máy hút vẫn chạy, phủi bụi bằng chổi (không thổi), lau cả móng bằng bông không xơ; sau đó không chạm tay vào mặt móng.",
        "Cleanse: extraction still running, brush off the dust (don't blow), wipe the whole nail with a lint-free pad; then don't touch the nail plate.",
        "Puhdista: kohdepoisto yhä päällä, harjaa pöly pois (älä puhalla), pyyhi koko kynsi nukkaamattomalla lapulla; älä sen jälkeen koske kynsilevyyn."
      ),
      l3(
        "Lớp bám chỉ trên phần móng mới mọc, chừa một đường nhỏ cách da: với gel là lớp lót hay chất tăng bám của hãng (hơ hay không theo hướng dẫn); với bột là primer chấm thật mỏng chỉ trên móng thật.",
        "Bonder only on the regrowth, with a small gap from the skin: for gel, the brand's base or bonder (cured or not as instructed); for acrylic, a very thin dab of primer on the natural nail only.",
        "Tartunta-aine vain uudelle kasvulle, pieni rako ihoon: geelille valmistajan pohja tai tartunta-aine (kovetus ohjeen mukaan); akryylille hyvin ohut kerros primeria vain omalle kynnelle."
      ),
      l3(
        "Builder gel: một lớp mỏng phủ cả móng để nối lớp cũ, đặt hạt gel ở giữa, dẫn nhẹ về chân móng (cách da như sợi tóc), ra hai cạnh và đầu móng, úp tay vài giây cho gel tạo apex, kiểm tra rồi hơ đủ thời gian; khách thấy nóng thì rút tay ra vài giây rồi hơ tiếp.",
        "Builder gel: a thin layer over the whole nail to join the old product, a bead in the centre, floated towards the cuticle (a hair's width from the skin), to the sides and tip, finger turned over for a few seconds to form the apex, checked, then fully cured; if the customer feels heat, take the hand out for a few seconds and continue.",
        "Rakennegeeli: ohut kerros koko kynnelle vanhan tuotteen yhdistämiseksi, pisara keskelle, ohjaus kynsinauhaa kohti (hiuksen verran irti ihosta), sivuille ja kärkeen, sormi käännetään hetkeksi apexin muodostamiseksi, tarkistus ja täysi kovetus; jos asiakas tuntee kuumuutta, käsi pois muutamaksi sekunniksi ja jatketaan."
      ),
      l3(
        "Bột: hạt đầu nhỏ, ẩm hơn một chút, đặt trên móng mới gần chân móng, vuốt thật mỏng về phía da và không chạm da (lỡ chạm thì gạt đi ngay khi còn mềm); rồi một hạt vào vùng chịu lực, vuốt liền với lớp cũ, dựng lại apex. Chờ cứng theo hãng, gõ nghe tiếng khô là được.",
        "Acrylic: a small, slightly wetter first bead on the regrowth near the cuticle, pressed very thin towards the skin without touching it (if it touches, remove it at once while soft); then a bead on the stress area, blended into the old product to rebuild the apex. Let it set as the brand says; a dry click when tapped means it's ready.",
        "Akryyli: pieni, hieman kosteampi ensimmäinen pallo uudelle kasvulle kynsinauhan lähelle, painetaan hyvin ohueksi ihoa kohti koskematta siihen (jos koskee, poista heti pehmeänä); sitten pallo rasitusalueelle, häivytetään vanhaan tuotteeseen ja apex rakennetaan uudelleen. Anna kovettua valmistajan ohjeen mukaan; kuiva naksahdus koputettaessa kertoo, että se on valmis."
      ),
      l3(
        "Dũa hoàn thiện giữ lại apex, gọn hai cạnh và đầu móng, liền ở chân móng mà không dũa vào móng thật hay da; nhìn lại từ trên xuống, cạnh bên và đầu móng. Màu và top như bài sơn gel, dầu dưỡng, hẹn lịch dặm (gel khoảng 3–4 tuần, bột khoảng 2–3 tuần) và dặn khách thấy hở thì quay lại, đừng tự lột.",
        "Finish filing keeping the apex, refine side walls and tip, blend at the cuticle without touching natural nail or skin; check from above, the side and end-on. Colour and top as in the gel polish lesson, oil, book the next infill (gel about 3–4 weeks, acrylic about 2–3 weeks) and tell the customer to come back if it lifts, never peel it off.",
        "Viimeistelyviilaus apex säilyttäen, sivut ja kärki siistiksi, häivytys kynsinauhan kohdalla koskematta omaan kynteen tai ihoon; tarkistus ylhäältä, sivulta ja päästä. Väri ja päällyslakka kuten geelilakkatunnilla, öljy, seuraavan huollon varaus (geeli noin 3–4 viikkoa, akryyli noin 2–3 viikkoa) ja ohje palata, jos kynsi irtoaa — ei koskaan itse repimistä."
      ),
    ],
    tips: [
      l3(
        "Sau khi dũa chỗ hở, nghiêng móng dưới đèn: còn một đường trắng mờ ở mép là vẫn còn hở — dũa tiếp, đừng đắp đè.",
        "After filing the lifting, tilt the nail under the light: a faint white line at the edge means it's still lifting — keep filing, don't cover it.",
        "Kun olet viilannut irtoaman, kallista kynttä valossa: himmeä valkoinen viiva reunassa tarkoittaa, että se on yhä irti — jatka viilaamista, älä peitä."
      ),
      l3(
        "Trong VaraaAi, tạo dịch vụ “Dặm gel” và “Dặm bột” riêng với thời lượng thật của tiệm, để lịch không bị chồng khi khách đặt dặm.",
        "In VaraaAi, create separate “Gel infill” and “Acrylic infill” services with your real durations, so the calendar doesn't overlap when customers book infills.",
        "Luo VaraaAi:hin erilliset palvelut ”Geelin huolto” ja ”Akryylin huolto” todellisilla kestoilla, jotta kalenteri ei mene päällekkäin, kun asiakkaat varaavat huoltoja."
      ),
    ],
    quiz: [
      {
        q: l3("Lớp bám (base, chất tăng bám hay primer) khi dặm đặt ở đâu?", "Where does the bonder (base, bonder or primer) go in an infill?", "Mihin tartunta-aine (pohja, tartunta-aine tai primer) laitetaan huollossa?"),
        options: [
          l3("Phủ khắp móng và cả da quanh móng", "All over the nail and the skin around it", "Koko kynnelle ja ympäröivälle iholle"),
          l3("Chỉ ở đầu móng", "Only on the free edge", "Vain vapaaseen reunaan"),
          l3("Chỉ trên phần móng thật mới mọc, chừa khe nhỏ cách da", "Only on the new natural growth, with a small gap from the skin", "Vain uudelle omalle kasvulle, pieni rako ihoon"),
        ],
        answer: 2,
        why: l3(
          "Lớp bám dành cho móng thật mới mọc; trên lớp cũ thì chỉ khi hãng hướng dẫn. Không bao giờ để chạm da.",
          "Bonder is for the new natural nail; on the old product only if the brand says so. It never touches the skin.",
          "Tartunta-aine on uutta omaa kynttä varten; vanhan tuotteen päälle vain, jos valmistaja niin ohjeistaa. Se ei koskaan koske ihoon."
        ),
      },
      {
        q: l3("Dũa chỗ hở mãi mà vẫn hở cả một mảng. Làm gì?", "You keep filing but a whole area is still lifting. What now?", "Viilaat, mutta koko alue on yhä irti. Mitä nyt?"),
        options: [
          l3("Dừng lại: tháo hết rồi làm lại", "Stop: remove everything and start again", "Lopeta: poista kaikki ja aloita alusta"),
          l3("Đắp thật nhiều gel lên cho chắc", "Put lots of gel on top to hold it", "Laita paljon geeliä päälle pitämään se"),
          l3("Cạy phần hở ra bằng que", "Pry the lifted part off with a stick", "Vipua irronnut osa pois tikulla"),
        ],
        answer: 0,
        why: l3(
          "Hở cả mảng thì không dặm được. Đắp đè nhốt ẩm bên dưới, còn cạy thì làm hỏng móng thật.",
          "A whole lifted area can't be filled. Covering seals moisture in, prying damages the natural nail.",
          "Laajaa irtoamaa ei voi huoltaa. Päälle laittaminen sulkee kosteuden sisään, vipuaminen vahingoittaa omaa kynttä."
        ),
      },
      {
        q: l3("Khi dặm bột, hạt bột gần chân móng phải thế nào?", "In an acrylic infill, what about the bead near the cuticle?", "Millainen kynsinauhan lähelle tuleva akryylipallo on huollossa?"),
        options: [
          l3("To và dày, để che hết khoảng hở", "Big and thick, to cover the gap", "Iso ja paksu, jotta rako peittyy"),
          l3("Nhỏ, vuốt thật mỏng và không chạm da", "Small, pressed very thin and never touching the skin", "Pieni, painettu hyvin ohueksi eikä koskaan ihoon"),
          l3("Đặt sát lên da cho khít", "Pushed right onto the skin for a tight fit", "Painettu suoraan ihoa vasten tiiviisti"),
        ],
        answer: 1,
        why: l3(
          "Mép dày ở chân móng dễ bật lên; bột chạm da dễ hở và có thể gây dị ứng. Apex được dựng ở vùng chịu lực, không phải ở chân móng.",
          "A thick edge at the cuticle lifts easily; acrylic on the skin lifts and can cause allergy. The apex is built on the stress area, not at the cuticle.",
          "Paksu reuna kynsinauhan kohdalla irtoaa helposti; iholle joutunut akryyli irtoaa ja voi aiheuttaa allergian. Apex rakennetaan rasitusalueelle, ei kynsinauhan kohdalle."
        ),
      },
    ],
  },
  {
    slug: "dua-form-mong-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("Dáng móng: hiểu đúng để chọn form hợp tay khách", "Nail shapes: understand them to choose the right shape for each client", "Kynsien muodot: ymmärrä ne ja valitse asiakkaalle sopiva muoto"),
    summary: l3(
      "Bảy dáng móng hay gặp (vuông, vuông bo góc, tròn, ô van, hạnh nhân, coffin/ba lê, nhọn stiletto): mỗi dáng trông thế nào, dáng nào thường chắc hơn, dáng nào dễ gãy, cách chọn theo bàn tay, chân móng, công việc và độ khỏe của móng thật, sự đều nhau của mười móng, hai cạnh bên, chọn dũa và cách nói thật với khách.",
      "The seven common nail shapes (square, squoval, round, oval, almond, coffin/ballerina, stiletto): how each looks, which tend to be stronger and which break more easily, choosing by the hands, the nail bed, the client's work and the strength of the natural nail, symmetry across ten nails, the side walls, choosing a file and talking honestly with clients.",
      "Seitsemän yleistä kynsimuotoa (neliö, squoval, pyöreä, ovaali, manteli, coffin/ballerina, stiletto): miltä kukin näyttää, mitkä ovat yleensä kestävämpiä ja mitkä katkeavat helpommin, valinta käsien, kynsipedin, työn ja oman kynnen vahvuuden mukaan, kymmenen kynnen symmetria, sivuseinät, viilan valinta ja rehellinen keskustelu asiakkaan kanssa."
    ),
    video: video("dua-form-mong-hieu-dung", 279, "2026-11-17"),
    notice: l3(
      "Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề. Độ chắc của từng dáng là xu hướng chung, còn tùy móng của từng khách. Móng có dấu hiệu bệnh hay da quanh móng sưng đỏ thì không làm. Quy định về nghề làm móng khác nhau theo từng nước.",
      "This is a training aid, not a licence. How strong each shape is describes a general tendency; it always depends on the client's own nails. Don't work on nails showing signs of disease or with red, swollen skin around them. Rules for nail work differ by country.",
      "Tämä on koulutusmateriaali, ei pätevyystodistus. Muotojen kestävyys kuvaa yleistä taipumusta; se riippuu aina asiakkaan omista kynsistä. Älä työskentele kynsillä, joissa on sairauden merkkejä tai joiden ympärillä iho on punoittava ja turvonnut. Kynsitöitä koskevat määräykset vaihtelevat maittain."
    ),
    related: ["khach-hang", "dich-vu", "lich-hen"],
    steps: [
      l3(
        "Bảy dáng hay gặp: vuông (thẳng ngang, góc sắc), vuông bo góc (thẳng ngang, góc bo nhẹ), tròn (ngắn, theo đường cong đầu ngón), ô van (dài hơn, đầu tròn như quả trứng), hạnh nhân (thon về một mũi tròn mềm), coffin/ba lê (thon hai bên, đầu dũa thẳng), stiletto (thon tới mũi nhọn sắc).",
        "Seven common shapes: square (straight across, sharp corners), squoval (straight across, softened corners), round (short, follows the fingertip), oval (longer, egg-shaped tip), almond (tapers to a soft rounded point), coffin/ballerina (tapered sides, tip filed straight), stiletto (tapers to a sharp point).",
        "Seitsemän yleistä muotoa: neliö (suora kärki, terävät kulmat), squoval (suora kärki, pehmennetyt kulmat), pyöreä (lyhyt, seuraa sormenpäätä), ovaali (pidempi, munanmuotoinen kärki), manteli (kapenee pehmeään pyöreään kärkeen), coffin/ballerina (kapenevat sivut, suoraksi viilattu kärki), stiletto (kapenee teräväksi kärjeksi)."
      ),
      l3(
        "Va chạm dồn vào đầu móng. Dáng thon về một điểm (hạnh nhân, nhọn) còn ít chất liệu ở đầu móng nên thường hợp với móng thật khỏe hoặc móng đắp gel, đắp bột.",
        "Knocks land on the tip. Shapes that narrow to a point (almond, stiletto) have little material at the tip, so they tend to suit strong natural nails or gel and acrylic enhancements.",
        "Iskut kohdistuvat kärkeen. Kärkeen kapenevissa muodoissa (manteli, stiletto) kärjessä on vähän materiaalia, joten ne sopivat yleensä vahvoille omille kynsille tai geeli- ja akryylirakenteille."
      ),
      l3(
        "Dáng vuông có đầu rộng, chắc, nhưng góc sắc dễ vướng và dễ mẻ. Tròn, ô van và vuông bo góc là những dáng thực tế và chắc nhất cho móng thật. Coffin cần độ dài nên thường làm trên móng đắp.",
        "A square tip is wide and strong, but its sharp corners snag and chip. Round, oval and squoval are the most practical and strongest shapes for natural nails. Coffin needs length, so it is usually done on enhancements.",
        "Neliön kärki on leveä ja vahva, mutta terävät kulmat tarttuvat ja lohkeavat. Pyöreä, ovaali ja squoval ovat käytännöllisimmät ja kestävimmät muodot omille kynsille. Coffin vaatii pituutta, joten se tehdään yleensä rakennekynsiin."
      ),
      l3(
        "Chọn theo bàn tay: ngón dài, thon hợp hầu hết các dáng; ngón ngắn, móng rộng thường trông thon hơn với ô van hay hạnh nhân, còn dáng vuông dễ làm ngón trông ngắn lại.",
        "Choose by the hands: long, slender fingers suit almost every shape; short fingers with wide nails usually look slimmer with oval or almond, while square can make them look shorter.",
        "Valitse käsien mukaan: pitkiin, hoikkiin sormiin sopii lähes mikä tahansa muoto; lyhyet sormet ja leveät kynnet näyttävät yleensä hoikemmilta ovaalina tai mantelina, kun taas neliö voi lyhentää niitä."
      ),
      l3(
        "Một mẹo hay: dáng đầu móng thường hài hòa nhất khi lặp lại đường cong ở chân móng — chân tròn hợp tròn hay ô van, chân vuông hơn hợp vuông bo góc. Đây là điểm khởi đầu, không phải luật.",
        "A useful tip: the tip usually looks most harmonious when it mirrors the curve at the cuticle — a round cuticle line suits round or oval, a squarer one suits squoval. A starting point, not a rule.",
        "Hyvä nyrkkisääntö: kärki näyttää yleensä harmonisimmalta, kun se toistaa kynsinauhan kaaren — pyöreä kynsinauhalinja sopii pyöreään tai ovaaliin, suorempi squovaliin. Lähtökohta, ei sääntö."
      ),
      l3(
        "Hỏi về công việc và cuộc sống: người gõ phím nhiều hay làm việc bằng tay thường dễ chịu nhất với móng ngắn, tròn hay vuông bo góc. Nhiều nơi làm việc (bệnh viện, bếp ăn…) có quy định riêng về móng.",
        "Ask about work and daily life: people who type a lot or work with their hands are usually most comfortable with short round or squoval nails. Many workplaces (hospitals, kitchens…) have their own rules on nails.",
        "Kysy työstä ja arjesta: paljon näppäilevät tai käsillään työskentelevät viihtyvät yleensä parhaiten lyhyillä pyöreillä tai squoval-kynsillä. Monilla työpaikoilla (sairaalat, keittiöt…) on omat kynsiä koskevat sääntönsä."
      ),
      l3(
        "Móng thật mỏng, mềm hay tách lớp: đừng dũa nhọn, đừng để dài; tròn hay ô van ngắn giữ lâu hơn. Muốn hạnh nhân dài hay dáng nhọn thì làm trên móng đắp.",
        "Thin, soft or peeling natural nails: don't file them to a point or keep them long; a short round or oval lasts longer. Long almond or stiletto belongs on enhancements.",
        "Ohuet, pehmeät tai lohkeilevat omat kynnet: älä viilaa niitä teräviksi äläkä jätä pitkiksi; lyhyt pyöreä tai ovaali kestää pidempään. Pitkä manteli tai stiletto tehdään rakennekynsiin."
      ),
      l3(
        "Mười móng cùng độ dài, cùng dáng. Nhìn từ trên xuống: mũi móng nằm giữa, hai bên đối xứng; nhìn từ đầu móng: hai cạnh cân, độ cong đều.",
        "Ten nails, same length, same shape. From above: the tip is centred and both sides match; from the end: the side walls are balanced and the curve is even.",
        "Kymmenen kynttä, sama pituus, sama muoto. Ylhäältä: kärki on keskellä ja sivut symmetriset; päästä katsottuna: sivuseinät ovat tasapainossa ja kaari tasainen."
      ),
      l3(
        "Hai cạnh bên đi thẳng ra từ điểm chịu lực (chỗ móng rời nền da) rồi mới tạo dáng. Không dũa sâu vào khóe móng thật: móng yếu đi, dễ gãy, và mép móng có thể đâm vào da khi mọc ra.",
        "The side walls run straight out from the stress points (where the nail leaves the nail bed) before the tip is shaped. Never file deep into the side walls of a natural nail: it weakens the nail and the edge can grow into the skin.",
        "Sivuseinät jatkuvat suoraan rasituskohdista (joissa kynsi irtoaa kynsipedistä) ennen kärjen muotoilua. Älä koskaan viilaa syvälle oman kynnen sivuihin: kynsi heikkenee ja reuna voi kasvaa ihoon."
      ),
      l3(
        "Số trên dũa càng lớn, dũa càng mịn: móng thật dùng dũa mịn (thường từ 180 trở lên) và dũa một chiều; dũa thô hơn dành cho móng đắp. Nói thật với khách khi dáng họ muốn không hợp móng thật, và đưa ra lựa chọn.",
        "The higher the grit number, the finer the file: natural nails get a fine file (usually 180 and up), filed in one direction; coarser files are for enhancements. Be honest when the shape a client wants won't suit their natural nails, and offer options.",
        "Mitä suurempi karkeusluku, sitä hienompi viila: omille kynsille hieno viila (yleensä 180 tai hienompi) ja viilaus yhteen suuntaan; karkeammat viilat ovat rakennekynsille. Kerro rehellisesti, jos toivottu muoto ei sovi asiakkaan omille kynsille, ja tarjoa vaihtoehtoja."
      ),
    ],
    tips: [
      l3(
        "Khách mang ảnh móng nhọn dài mà móng thật mỏng: giải thích nhẹ nhàng, rồi đưa hai lựa chọn — hạnh nhân ngắn hơn trên móng thật, hoặc đắp thêm để làm dáng nhọn.",
        "A client brings a photo of long stiletto nails but her natural nails are thin: explain gently, then offer two options — a shorter almond on the natural nails, or an enhancement for the pointed shape.",
        "Asiakas tuo kuvan pitkistä stiletoista, mutta omat kynnet ovat ohuet: selitä ystävällisesti ja tarjoa kaksi vaihtoehtoa — lyhyempi manteli omiin kynsiin tai rakenne terävää muotoa varten."
      ),
      l3(
        "Trong VaraaAi, ghi dáng và độ dài khách đã chọn vào ghi chú của khách hàng, để lần sau ai làm cũng làm giống như vậy.",
        "In VaraaAi, write the shape and length the client chose in the client's notes, so whoever does the next appointment does it the same way.",
        "Kirjaa VaraaAi:ssa asiakkaan valitsema muoto ja pituus asiakkaan muistiinpanoihin, jotta seuraavalla kerralla kuka tahansa tekee sen samoin."
      ),
    ],
    quiz: [
      {
        q: l3("Móng thật của khách mỏng và mềm. Dáng nào thường giữ được lâu nhất?", "The client's natural nails are thin and soft. Which shape usually lasts longest?", "Asiakkaan omat kynnet ovat ohuet ja pehmeät. Mikä muoto kestää yleensä pisimpään?"),
        options: [
          l3("Stiletto dài", "Long stiletto", "Pitkä stiletto"),
          l3("Tròn hoặc ô van ngắn", "Short round or oval", "Lyhyt pyöreä tai ovaali"),
          l3("Coffin dài", "Long coffin", "Pitkä coffin"),
        ],
        answer: 1,
        why: l3(
          "Dáng thon về một điểm và móng dài dồn lực vào đầu móng; móng yếu nên ngắn và tròn đều.",
          "Pointed and long shapes concentrate force on the tip; weak nails do better short with an even curve.",
          "Terävät ja pitkät muodot keskittävät voiman kärkeen; heikot kynnet pärjäävät parhaiten lyhyinä ja tasaisesti kaarevina."
        ),
      },
      {
        q: l3("Vì sao không nên dũa sâu vào hai khóe của móng thật?", "Why shouldn't you file deep into the side walls of a natural nail?", "Miksi oman kynnen sivuihin ei pidä viilata syvälle?"),
        options: [
          l3("Vì móng mất phần đỡ hai bên, yếu đi, và mép móng có thể đâm vào da", "The nail loses its side support, gets weaker, and the edge can grow into the skin", "Kynsi menettää sivutukensa, heikkenee ja reuna voi kasvaa ihoon"),
          l3("Vì sơn gel sẽ không bám", "Because gel polish won't stick", "Koska geelilakka ei tartu"),
          l3("Vì móng sẽ mọc chậm hơn", "Because the nail will grow more slowly", "Koska kynsi kasvaa hitaammin"),
        ],
        answer: 0,
        why: l3(
          "Hai cạnh bên phải đi thẳng ra từ điểm chịu lực; dáng chỉ được tạo ở đầu móng.",
          "The side walls must run straight from the stress points; the shape is made only at the tip.",
          "Sivuseinien on jatkuttava suoraan rasituskohdista; muoto tehdään vain kärkeen."
        ),
      },
      {
        q: l3("Khách có ngón tay ngắn và móng rộng, muốn tay trông thon hơn. Gợi ý nào thường hợp?", "A client with short fingers and wide nails wants her hands to look slimmer. Which suggestion usually works?", "Asiakas, jolla on lyhyet sormet ja leveät kynnet, haluaa kätensä näyttävän hoikemmilta. Mikä ehdotus toimii yleensä?"),
        options: [
          l3("Dáng vuông, càng ngắn càng tốt", "Square, as short as possible", "Neliö, mahdollisimman lyhyt"),
          l3("Không quan trọng, dáng nào cũng như nhau", "It doesn't matter, every shape looks the same", "Ei väliä, kaikki muodot näyttävät samalta"),
          l3("Ô van hoặc hạnh nhân", "Oval or almond", "Ovaali tai manteli"),
        ],
        answer: 2,
        why: l3(
          "Ô van và hạnh nhân thường làm ngón tay trông dài và thon hơn; dáng vuông trên móng rộng dễ làm ngón trông ngắn lại.",
          "Oval and almond usually make fingers look longer and slimmer; square on wide nails tends to make them look shorter.",
          "Ovaali ja manteli saavat sormet yleensä näyttämään pidemmiltä ja hoikemmilta; neliö leveissä kynsissä lyhentää niitä helposti."
        ),
      },
    ],
  },
  {
    slug: "dua-form-mong",
    course: "p-nail",
    style: "practice",
    title: l3("Dũa form móng: thực hành từng bước", "Shaping nails: step by step", "Kynsien muotoilu: vaihe vaiheelta"),
    summary: l3(
      "Thống nhất dáng và độ dài với khách, tạo độ dài đều cho mười móng, tìm đường giữa và hai điểm chịu lực, rồi đường dũa của từng dáng: vuông, vuông bo góc, tròn, ô van, hạnh nhân, coffin và stiletto; kiểm tra đối xứng từ trên xuống và từ đầu móng, mài mịn mép, phủi bụi và dầu dưỡng.",
      "Agree the shape and length with the client, make all ten nails the same length, find the centre line and the two stress points, then the filing path for each shape: square, squoval, round, oval, almond, coffin and stiletto; check symmetry from above and from the end, smooth the edge, remove the dust and finish with oil.",
      "Sovi muoto ja pituus asiakkaan kanssa, tee kaikista kymmenestä kynnestä saman pituiset, etsi keskilinja ja kaksi rasituskohtaa ja viilaa sitten jokainen muoto: neliö, squoval, pyöreä, ovaali, manteli, coffin ja stiletto; tarkista symmetria ylhäältä ja päästä, viimeistele reuna, poista pöly ja lopuksi öljy."
    ),
    video: video("dua-form-mong", 271, "2026-11-17"),
    notice: l3(
      "Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề. Dụng cụ dùng chung phải được làm sạch và khử khuẩn sau mỗi khách; dũa và phao chà loại dùng một lần thì mỗi khách một cái mới. Móng có dấu hiệu bệnh hay da quanh móng sưng đỏ thì không làm. Quy định khác nhau theo từng nước.",
      "This is a training aid, not a licence. Shared tools must be cleaned and disinfected after every client; single-use files and buffers are new for each client. Don't work on nails showing signs of disease or with red, swollen skin around them. Rules differ by country.",
      "Tämä on koulutusmateriaali, ei pätevyystodistus. Yhteiset työvälineet puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen; kertakäyttöiset viilat ja hiomapalat ovat jokaiselle asiakkaalle uudet. Älä työskentele kynsillä, joissa on sairauden merkkejä tai joiden ympärillä iho on punoittava ja turvonnut. Määräykset vaihtelevat maittain."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Rửa tay, sát khuẩn, nhìn kỹ móng và da. Hỏi khách dáng và độ dài, cho xem hình các dáng và nói thật dáng nào hợp móng của khách.",
        "Wash and sanitise hands, look closely at the nails and skin. Ask the client about shape and length, show pictures of the shapes and say honestly which suits her nails.",
        "Pese ja desinfioi kädet, katso kynnet ja iho tarkasti. Kysy asiakkaalta muoto ja pituus, näytä kuvia muodoista ja kerro rehellisesti, mikä sopii hänen kynsilleen."
      ),
      l3(
        "Tạo độ dài trước, rồi mới tạo dáng: móng dài nhiều thì cắt bớt từng chút bằng kềm cắt móng, chừa dư để dũa; mười móng cùng một độ dài. Có móng gãy ngắn thì độ dài chung theo móng ngắn nhất, hoặc nối riêng móng đó.",
        "Set the length first, then the shape: shorten long nails a little at a time with clippers, leaving a bit to file; all ten nails the same length. If one nail is broken short, match the others to it or extend that nail.",
        "Ensin pituus, sitten muoto: lyhennä pitkiä kynsiä vähän kerrallaan kynsileikkureilla ja jätä varaa viilalle; kaikki kymmenen kynttä samanpituisiksi. Jos yksi kynsi on katkennut lyhyeksi, sovita muut siihen tai pidennä se kynsi."
      ),
      l3(
        "Nhìn móng từ trên xuống và từ đầu móng: tìm đường giữa và hai điểm chịu lực. Hai cạnh đi thẳng ra từ điểm chịu lực, mũi móng nằm trên đường giữa.",
        "Look at the nail from above and from the end: find the centre line and the two stress points. The side walls run straight from the stress points; the tip sits on the centre line.",
        "Katso kynttä ylhäältä ja päästä: etsi keskilinja ja kaksi rasituskohtaa. Sivuseinät jatkuvat suoraan rasituskohdista; kärki on keskilinjalla."
      ),
      l3(
        "Dũa nhẹ tay, hơi nghiêng dưới đầu móng; móng thật dũa một chiều bằng dũa mịn. Giữ ngón tay khách nằm thẳng và cùng một góc dũa ở hai bên.",
        "File lightly, slightly angled under the free edge; file natural nails in one direction with a fine file. Keep the client's finger straight and the same file angle on both sides.",
        "Viilaa kevyesti, hieman kulmassa vapaan reunan alta; omat kynnet viilataan yhteen suuntaan hienolla viilalla. Pidä asiakkaan sormi suorana ja sama viilan kulma molemmilla puolilla."
      ),
      l3(
        "Vuông: dũa thẳng ngang, hai cạnh thẳng song song, lướt nhẹ hai góc cho bớt sắc. Vuông bo góc: làm như vuông, rồi bo hai góc bằng nhau bằng vài đường ngắn theo vòng cung.",
        "Square: file straight across, straight parallel side walls, a light pass over both corners to soften them. Squoval: as square, then round both corners equally with a few short arcs.",
        "Neliö: viilaa suoraan poikki, suorat yhdensuuntaiset sivut, kevyt veto kulmien yli pehmentämään. Squoval: kuten neliö, sitten pyöristä molemmat kulmat tasan muutamalla lyhyellä kaarella."
      ),
      l3(
        "Tròn: móng ngắn, dũa từ mỗi cạnh theo đường cong đầu ngón lên tới giữa. Ô van: dài hơn, hai bên cong đều tới một đầu tròn trên đường giữa — đừng dũa sâu kẻo thành hạnh nhân.",
        "Round: short nails, file from each side along the fingertip's curve up to the centre. Oval: longer, both sides curve evenly to a rounded tip on the centre line — don't go too deep or it becomes almond.",
        "Pyöreä: lyhyet kynnet, viilaa kummaltakin sivulta sormenpään kaarta pitkin keskelle. Ovaali: pidempi, molemmat sivut kaartuvat tasaisesti pyöreään kärkeen keskilinjalla — älä mene liian syvälle, ettei siitä tule mantelia."
      ),
      l3(
        "Hạnh nhân: giữ cạnh thẳng từ điểm chịu lực, dũa xiên từ mỗi bên vào giữa thành mũi tròn mềm; dũa xong một bên thì nhìn lại rồi mới dũa bên kia.",
        "Almond: keep the side walls straight from the stress points, file at an angle from each side towards the centre into a soft rounded point; check after one side before filing the other.",
        "Manteli: pidä sivut suorina rasituskohdista, viilaa vinosti kummaltakin puolelta kohti keskustaa pehmeäksi pyöreäksi kärjeksi; tarkista toisen puolen jälkeen ennen kuin viilaat toisen."
      ),
      l3(
        "Coffin: dũa xiên như hạnh nhân nhưng dừng sớm hơn, rồi dũa thẳng ngang để có đầu bằng nhỏ ở chính giữa. Stiletto: xiên dốc tới mũi nhọn ở giữa — chỉ làm trên móng đắp hoặc móng thật rất khỏe.",
        "Coffin: taper like almond but stop earlier, then file straight across for a small flat tip in the centre. Stiletto: steeper taper to a sharp centred point — only on enhancements or very strong natural nails.",
        "Coffin: kavenna kuten manteli mutta lopeta aiemmin, sitten viilaa suoraan poikki pieneksi tasaiseksi kärjeksi keskelle. Stiletto: jyrkempi kavennus teräväksi keskitetyksi kärjeksi — vain rakennekynsiin tai hyvin vahvoihin omiin kynsiin."
      ),
      l3(
        "Kiểm tra từng móng từ trên xuống và từ đầu móng, đặt hai bàn tay cạnh nhau so cả mười móng, và nhìn từ phía khách; chỗ lệch sửa ngay bằng vài đường dũa nhẹ.",
        "Check every nail from above and from the end, put both hands side by side to compare all ten, and look from the client's side; correct any difference at once with a few light strokes.",
        "Tarkista jokainen kynsi ylhäältä ja päästä, aseta kädet vierekkäin ja vertaa kaikkia kymmentä, ja katso myös asiakkaan puolelta; korjaa erot heti muutamalla kevyellä vedolla."
      ),
      l3(
        "Hoàn thiện: lướt phao chà mịn dưới mép đầu móng, phủi bụi bằng cọ mềm (bụi móng đắp thì hút, không thổi), nhỏ dầu dưỡng và xoa nhẹ.",
        "Finish: smooth under the free edge with a fine buffer, brush off the dust with a soft brush (extract enhancement dust, don't blow it), apply oil and massage it in gently.",
        "Viimeistely: hio vapaan reunan alapuoli hienolla hiomapalalla, harjaa pöly pehmeällä harjalla (rakennekynsien pöly imetään, sitä ei puhalleta), levitä öljy ja hiero se kevyesti."
      ),
    ],
    tips: [
      l3(
        "Làm cùng một bước trên cả năm ngón rồi mới sang bước sau (cạnh trái cả năm móng, rồi cạnh phải, rồi đầu móng): tay giữ được một góc dũa và các móng ra đều hơn.",
        "Do the same step on all five fingers before the next (left sides of all five, then right sides, then the tips): your hand keeps one file angle and the nails come out more even.",
        "Tee sama vaihe kaikkiin viiteen sormeen ennen seuraavaa (kaikkien vasemmat sivut, sitten oikeat, sitten kärjet): käsi pitää saman viilakulman ja kynsistä tulee tasaisemmat."
      ),
      l3(
        "Trong VaraaAi, ghi dáng và độ dài vào ghi chú của khách hàng ngay sau buổi làm, để lần sau không phải hỏi lại.",
        "In VaraaAi, note the shape and length in the client's notes right after the appointment so you don't have to ask again next time.",
        "Kirjaa VaraaAi:ssa muoto ja pituus asiakkaan muistiinpanoihin heti käynnin jälkeen, niin ensi kerralla ei tarvitse kysyä uudelleen."
      ),
    ],
    quiz: [
      {
        q: l3("Nên làm gì trước khi bắt đầu tạo dáng?", "What should you do before you start shaping?", "Mitä pitää tehdä ennen muotoilun aloittamista?"),
        options: [
          l3("Sơn lớp lót", "Apply the base coat", "Levitä aluslakka"),
          l3("Tạo độ dài đều cho cả mười móng", "Make all ten nails the same length", "Tee kaikista kymmenestä kynnestä saman pituiset"),
          l3("Nhỏ dầu dưỡng", "Apply cuticle oil", "Levitä kynsinauhaöljy"),
        ],
        answer: 1,
        why: l3(
          "Độ dài trước, dáng sau: có cùng độ dài thì mới dũa ra cùng một dáng.",
          "Length first, shape second: only nails of the same length can be filed to the same shape.",
          "Ensin pituus, sitten muoto: vain samanpituiset kynnet voi viilata samanmuotoisiksi."
        ),
      },
      {
        q: l3("Dáng coffin (ba lê) được tạo thế nào?", "How is a coffin (ballerina) shape made?", "Miten coffin- eli ballerinamuoto tehdään?"),
        options: [
          l3("Dũa theo đường cong đầu ngón tay", "File along the curve of the fingertip", "Viilaa sormenpään kaarta pitkin"),
          l3("Dũa xiên hai bên tới một mũi nhọn sắc", "Taper both sides to a sharp point", "Kavenna molemmat sivut teräväksi kärjeksi"),
          l3("Dũa xiên hai bên, rồi dũa thẳng ngang đầu móng thành đầu bằng nhỏ", "Taper both sides, then file the tip straight across into a small flat end", "Kavenna molemmat sivut ja viilaa kärki suoraan poikki pieneksi tasaiseksi pääksi"),
        ],
        answer: 2,
        why: l3(
          "Coffin là hạnh nhân dừng sớm cộng với một đầu bằng nhỏ nằm chính giữa; mũi nhọn sắc là stiletto.",
          "Coffin is an almond stopped early plus a small flat tip in the centre; a sharp point is a stiletto.",
          "Coffin on aikaisin pysäytetty manteli ja pieni tasainen kärki keskellä; terävä kärki on stiletto."
        ),
      },
      {
        q: l3("Dũa móng thật thế nào là đúng?", "What is the right way to file a natural nail?", "Miten omaa kynttä viilataan oikein?"),
        options: [
          l3("Dũa một chiều, bằng dũa mịn, nhẹ tay", "In one direction, with a fine file, lightly", "Yhteen suuntaan, hienolla viilalla, kevyesti"),
          l3("Kéo cưa qua lại thật nhanh cho nhanh xong", "Saw back and forth quickly to finish faster", "Sahaa nopeasti edestakaisin, niin työ valmistuu nopeammin"),
          l3("Dùng dũa thô nhất để ít đường dũa", "Use the coarsest file to need fewer strokes", "Käytä karkeinta viilaa, niin vetoja tarvitaan vähemmän"),
        ],
        answer: 0,
        why: l3(
          "Kéo cưa làm móng nóng lên và dễ tách lớp ở đầu; dũa thô dành cho móng đắp.",
          "Sawing heats the nail and makes the tip peel; coarse files are for enhancements.",
          "Sahaaminen kuumentaa kynttä ja saa kärjen lohkeilemaan; karkeat viilat ovat rakennekynsille."
        ),
      },
    ],
  },
  {
    slug: "french-ombre-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("French và ombré: hiểu đúng để đường cười đẹp và đều", "French and ombré: understand them for an even, beautiful smile line", "Ranskalainen ja ombre: ymmärrä ne, niin hymyviiva on kaunis ja tasainen"),
    summary: l3(
      "Điều gì làm nên một bộ French đẹp: đường cười đều độ sâu, cân đối, mép sắc và giống nhau trên cả mười móng; theo đường đầu móng thật hay chọn một đường; tỷ lệ theo chiều dài và dáng móng; French cổ điển, sâu, micro và French màu; ombré (baby boomer) và vì sao lớp mỏng, tán từ từ; lỗi hay gặp; chọn sản phẩm; nói thật với khách.",
      "What makes a good French: a smile line of even depth, symmetrical, crisp and the same on all ten nails; following the natural free-edge line or choosing one; proportions by nail length and shape; classic, deep, micro and coloured French; ombré (baby boomer) and why thin layers and a gradual blend matter; common faults; choosing products; honest talk with the customer.",
      "Mikä tekee ranskalaisesta kauniin: hymyviiva, jonka syvyys on tasainen, joka on symmetrinen, terävä ja sama kaikissa kymmenessä kynnessä; luonnollisen kärkiviivan seuraaminen tai oman viivan valinta; mittasuhteet kynnen pituuden ja muodon mukaan; klassinen, syvä, mikro- ja värillinen ranskalainen; ombre (baby boomer) ja miksi ohuet kerrokset ja asteittainen häivytys ratkaisevat; yleiset virheet; tuotteiden valinta; rehellinen puhe asiakkaan kanssa."
    ),
    video: video("french-ombre-hieu-dung", 308, "2026-11-17"),
    notice: l3(
      "Thời gian hơ và cách dùng sản phẩm luôn theo hướng dẫn của hãng; con số trong bài chỉ là thường gặp. Gel chưa chín không để chạm da. Quy định về sản phẩm làm móng khác nhau theo từng nước. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Curing times and product use always follow the manufacturer's instructions; numbers in the lesson are typical ranges only. Uncured gel never touches the skin. Rules on nail products differ by country. This lesson is a training aid, not a licence.",
      "Kovetusajat ja tuotteiden käyttö noudattavat aina valmistajan ohjeita; tunnin luvut ovat vain tyypillisiä. Kovettumaton geeli ei saa koskea ihoa. Kynsituotteita koskevat määräykset vaihtelevat maittain. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    related: ["dich-vu", "bang-gia", "lich-hen"],
    steps: [
      l3(
        "Với French, cái đẹp nằm ở cả mười móng đặt cạnh nhau, không phải ở một móng: móng này sâu, móng kia nông là khách nhìn thấy ngay.",
        "With a French, the beauty is in all ten nails side by side, not in one nail: one deep tip next to a shallow one is the first thing the customer sees.",
        "Ranskalaisen kauneus on kaikissa kymmenessä kynnessä vierekkäin, ei yhdessä kynnessä: syvä kärki matalan vieressä on ensimmäinen asia, jonka asiakas huomaa."
      ),
      l3(
        "Đường cười đẹp có bốn điều: độ sâu đều, cân đối hai bên như soi gương, mép sắc gọn không nhòe, và giống nhau trên cả mười móng.",
        "A good smile line has four things: even depth, both sides mirroring each other, a crisp clean edge, and the same line on all ten nails.",
        "Hyvässä hymyviivassa on neljä asiaa: tasainen syvyys, puolet toistensa peilikuvat, terävä ja siisti reuna sekä sama viiva kaikissa kymmenessä kynnessä."
      ),
      l3(
        "Theo đường đầu móng thật khi nó đẹp; khi nó lệch, chọn một đường cười đẹp cho cả bàn tay, vẽ đúng đường ấy trên mười móng và che chỗ lệch bằng nền hồng hơi đục.",
        "Follow the natural free-edge line when it is good; when it is uneven, choose one good smile line for the whole hand, paint that line on all ten nails and hide the unevenness with a slightly more opaque pink base.",
        "Seuraa luonnollista kärkiviivaa, kun se on kaunis; kun se on epätasainen, valitse koko kädelle yksi kaunis hymyviiva, maalaa se kaikkiin kymmeneen kynteen ja peitä epätasaisuus hieman peittävämmällä vaaleanpunaisella pohjalla."
      ),
      l3(
        "Tỷ lệ cân với chiều dài và dáng móng: móng ngắn thì phần trắng mảnh (ngón tay trông thon dài), móng dài có thể sâu hơn; móng vuông đường cười thoải, móng hạnh nhân cong sâu hơn.",
        "Proportions follow nail length and shape: on short nails keep the white slim (fingers look longer), long nails can take a deeper tip; square nails get a flatter smile line, almond nails a deeper curve.",
        "Mittasuhteet seuraavat kynnen pituutta ja muotoa: lyhyissä kynsissä valkoinen pidetään kapeana (sormet näyttävät pidemmiltä), pitkiin kynsiin sopii syvempi kärki; neliökynnessä hymyviiva on loivempi, mantelikynnessä kaari on syvempi."
      ),
      l3(
        "Các kiểu: cổ điển (nền hồng trong, đầu trắng vừa), sâu (phần trắng cao, hợp móng dài), micro (một đường trắng mảnh ở mép, hợp móng ngắn) và French màu (cùng kỹ thuật, khác màu).",
        "Styles: classic (sheer pink base, medium white tip), deep (a higher white tip, for long nails), micro (a fine white line at the edge, for short nails) and coloured French (same technique, another colour).",
        "Tyylit: klassinen (läpikuultava vaaleanpunainen pohja, keskikokoinen valkoinen kärki), syvä (korkeampi valkoinen kärki, pitkiin kynsiin), mikro (ohut valkoinen viiva reunassa, lyhyisiin kynsiin) ja värillinen ranskalainen (sama tekniikka, eri väri)."
      ),
      l3(
        "Ombré (baby boomer) là hồng tự nhiên ở chân móng mờ dần thành trắng sữa ở đầu, không có đường; móng mọc ra cũng không lộ khoảng hở rõ.",
        "Ombré (baby boomer) is natural pink at the cuticle fading into milky white at the tip, with no line; regrowth doesn't show a sharp gap either.",
        "Ombre (baby boomer) on luonnollista vaaleanpunaista kynsinauhan kohdalla, joka häivyttyy maidonvalkoiseksi kärjessä ilman viivaa; kasvu ei myöskään näytä terävää rakoa."
      ),
      l3(
        "Bí quyết của ombré: lớp trắng thật mỏng để màu hồng xuyên lên, và tán từ từ nhiều lần nhẹ. Lớp trắng dày rồi cố tán sẽ thành một vạch ngang, chỗ đậm chỗ nhạt.",
        "The secret of ombré: very thin white so the pink shows through, and a gradual blend in several light passes. A thick white layer blended in a hurry leaves a band across the nail, patchy and streaky.",
        "Ombren salaisuus: hyvin ohut valkoinen, jotta vaaleanpunainen kuultaa läpi, ja asteittainen häivytys monella kevyellä kerralla. Paksu valkoinen kerros kiireessä häivytettynä jättää kynnen poikki laikukkaan raidan."
      ),
      l3(
        "Lỗi hay gặp: độ sâu không đều; phần trắng quá dày (gel trắng rất đục, ánh sáng khó xuyên, dễ chín không hết, nhăn, bong); mép nhòe vì không làm sạch đường trước khi hơ; trắng quá đục hay bị sọc.",
        "Common faults: uneven depth; white too thick (white gel is very opaque, light struggles to get through, so it under-cures, wrinkles and lifts); a smudged edge from not cleaning the line before curing; white too opaque or streaky.",
        "Yleiset virheet: epätasainen syvyys; liian paksu valkoinen (valkoinen geeli on hyvin peittävä, valo läpäisee sen huonosti, joten se kovettuu puutteellisesti, rypistyy ja irtoaa); suttuinen reuna, kun viivaa ei siistitä ennen kovetusta; liian peittävä tai raidallinen valkoinen."
      ),
      l3(
        "Thà hai lớp trắng mỏng, mỗi lớp hơ đủ thời gian của hãng, còn hơn một lớp dày (xem bài Sơn gel: hiểu đúng để làm bền). Gel chưa chín không chạm da.",
        "Two thin white layers, each cured for the brand's full time, are better than one thick one (see Gel polish: understand it so it lasts). Uncured gel never touches the skin.",
        "Kaksi ohutta valkoista kerrosta, kumpikin kovetettuna valmistajan koko ajan, on parempi kuin yksi paksu (katso Geelilakkaus: ymmärrä se, niin se kestää). Kovettumaton geeli ei koske ihoa."
      ),
      l3(
        "Nói thật với khách: kiểu trong ảnh không hợp móng ngắn hay đầu móng lệch thì đề nghị micro, cổ điển mảnh hơn hoặc ombré, giải thích vì sao và cho khách xem trên chính móng của họ.",
        "Be honest with the customer: if the style in the photo doesn't suit short nails or an uneven free edge, suggest micro, a slimmer classic or ombré, explain why and show it on their own nails.",
        "Ole rehellinen asiakkaalle: jos kuvan tyyli ei sovi lyhyisiin kynsiin tai epätasaiseen kärkeen, ehdota mikroa, kapeampaa klassista tai ombrea, kerro miksi ja näytä se asiakkaan omissa kynsissä."
      ),
    ],
    tips: [
      l3(
        "Trước khi vẽ, cho khách đặt bàn tay thẳng và nhìn cả bốn móng từ trên xuống: chọn độ sâu theo móng ngắn nhất hay móng lệch nhất, để cả bộ làm được đều nhau.",
        "Before painting, have the customer lay the hand flat and look at all four nails from above: set the depth by the shortest or most uneven nail so the whole set can match.",
        "Ennen maalaamista pyydä asiakasta asettamaan käsi suoraksi ja katso kaikkia neljää kynttä ylhäältä: valitse syvyys lyhimmän tai epätasaisimman kynnen mukaan, jotta koko sarja voidaan tehdä yhtenäiseksi."
      ),
      l3(
        "Trong VaraaAi, tạo French và ombré thành dịch vụ riêng với thời gian và giá riêng, để khách đặt đúng và lịch của bạn đủ thời gian làm kỹ.",
        "In VaraaAi, set up French and ombré as their own services with their own duration and price, so customers book the right thing and your calendar leaves time to do it properly.",
        "Luo VaraaAi:ssa ranskalainen ja ombre omiksi palveluikseen omalla kestolla ja hinnalla, jotta asiakkaat varaavat oikein ja kalenterissasi on aikaa tehdä työ huolella."
      ),
    ],
    quiz: [
      {
        q: l3("Điều gì làm nên một bộ French đẹp?", "What makes a beautiful French set?", "Mikä tekee ranskalaisesta sarjasta kauniin?"),
        options: [
          l3("Phần trắng càng dày càng trắng càng đẹp", "The thicker and whiter the tip, the better", "Mitä paksumpi ja valkoisempi kärki, sitä parempi"),
          l3("Mỗi móng theo đúng đường đầu móng thật của nó, dù lệch", "Each nail follows its own natural free edge, even if uneven", "Jokainen kynsi seuraa omaa luonnollista kärkiviivaansa, vaikka se olisi epätasainen"),
          l3("Đường cười đều độ sâu, cân đối, mép sắc và giống nhau trên cả mười móng", "An even, symmetrical, crisp smile line that is the same on all ten nails", "Tasasyvyinen, symmetrinen ja terävä hymyviiva, joka on sama kaikissa kymmenessä kynnessä"),
        ],
        answer: 2,
        why: l3(
          "Khách nhìn cả hai bàn tay cùng lúc. Một móng lệch là cả bộ trông không đều.",
          "The customer looks at both hands at once. One uneven nail makes the whole set look off.",
          "Asiakas katsoo molempia käsiä yhtä aikaa. Yksi epätasainen kynsi saa koko sarjan näyttämään epätasaiselta."
        ),
      },
      {
        q: l3("Vì sao không nên đắp một lớp trắng dày?", "Why not apply one thick white layer?", "Miksi valkoista ei kannata laittaa yhtenä paksuna kerroksena?"),
        options: [
          l3("Vì gel trắng rất đục, lớp dày khó chín hết, dễ nhăn, bong và gây dị ứng", "White gel is very opaque, so a thick layer under-cures, wrinkles, lifts and can cause allergy", "Valkoinen geeli on hyvin peittävä, joten paksu kerros kovettuu puutteellisesti, rypistyy, irtoaa ja voi aiheuttaa allergian"),
          l3("Vì tốn gel", "Because it wastes gel", "Koska se tuhlaa geeliä"),
          l3("Vì lớp dày khô quá nhanh", "Because a thick layer dries too fast", "Koska paksu kerros kuivuu liian nopeasti"),
        ],
        answer: 0,
        why: l3(
          "Ánh sáng đèn khó xuyên qua màu trắng. Hai lớp mỏng, mỗi lớp hơ đủ, luôn đẹp và bền hơn.",
          "Lamp light struggles to pass through white. Two thin layers, each fully cured, always look better and last longer.",
          "Lampun valo läpäisee valkoisen huonosti. Kaksi ohutta, kunnolla kovetettua kerrosta näyttää aina paremmalta ja kestää pidempään."
        ),
      },
      {
        q: l3("Khách có móng ngắn mang ảnh French sâu trên móng dài. Bạn làm gì?", "A customer with short nails shows a photo of a deep French on long nails. What do you do?", "Lyhytkyntinen asiakas näyttää kuvan syvästä ranskalaisesta pitkissä kynsissä. Mitä teet?"),
        options: [
          l3("Làm đúng như ảnh, khách muốn gì làm nấy", "Copy the photo exactly, the customer is always right", "Teet täsmälleen kuten kuvassa, asiakas saa mitä haluaa"),
          l3("Giải thích kiểu ấy làm ngón tay trông ngắn đi, đề nghị micro, cổ điển mảnh hơn hoặc ombré", "Explain that it would make the fingers look shorter and suggest micro, a slimmer classic or ombré", "Kerrot, että se lyhentäisi sormia optisesti, ja ehdotat mikroa, kapeampaa klassista tai ombrea"),
          l3("Từ chối làm French", "Refuse to do a French", "Kieltäydyt tekemästä ranskalaista"),
        ],
        answer: 1,
        why: l3(
          "Phần trắng quá dày trên móng ngắn làm ngón tay trông ngắn và mập. Khách thường cảm kích khi được giải thích thật lòng.",
          "A deep white tip on short nails makes fingers look short and wide. Customers usually appreciate an honest explanation.",
          "Syvä valkoinen kärki lyhyissä kynsissä saa sormet näyttämään lyhyiltä ja leveiltä. Asiakkaat yleensä arvostavat rehellistä selitystä."
        ),
      },
    ],
  },
  {
    slug: "french-ombre",
    course: "p-nail",
    style: "practice",
    title: l3("French và ombré: thực hành từng bước", "French and ombré: step by step", "Ranskalainen ja ombre: vaihe vaiheelta"),
    summary: l3(
      "French cổ điển bằng cọ nét: chuẩn bị và lớp lót như bài sơn gel, nền hồng mỏng, chọn đường cười, vẽ từ một góc vào giữa rồi soi gương từ góc kia, làm sạch đường bằng cọ hơi ẩm trước khi hơ, sửa móng lệch, top và kiểm tra cả mười móng. Rồi ombré: nền hồng, trắng chỉ ở đầu móng, tán lên bằng cọ hoặc mút, hơ, thêm lớp mỏng nếu cần.",
      "A classic French with a liner brush: prep and base as in the gel polish lesson, a thin pink base, choosing the smile line, painting from one corner to the centre and mirroring from the other, cleaning the line with a barely damp brush before curing, fixing an uneven nail, top coat and checking all ten nails. Then ombré: pink base, white only on the tip, blending upwards with a brush or sponge, curing, another thin layer if needed.",
      "Klassinen ranskalainen ohuella siveltimellä: esikäsittely ja pohjakerros kuten geelilakkaustunnilla, ohut vaaleanpunainen pohja, hymyviivan valinta, maalaus kulmasta keskelle ja peilikuvana toisesta kulmasta, viivan siistiminen hädin tuskin kostealla siveltimellä ennen kovetusta, epätasaisen kynnen korjaus, päällyslakka ja kaikkien kymmenen kynnen tarkistus. Sitten ombre: vaaleanpunainen pohja, valkoinen vain kärkeen, häivytys ylöspäin siveltimellä tai sienellä, kovetus ja tarvittaessa uusi ohut kerros."
    ),
    video: video("french-ombre", 274, "2026-11-17"),
    notice: l3(
      "Thời gian hơ và cách dùng sản phẩm luôn theo hướng dẫn của hãng. Gel chưa chín không để chạm da. Quy định về sản phẩm làm móng khác nhau theo từng nước. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Curing times and product use always follow the manufacturer's instructions. Uncured gel never touches the skin. Rules on nail products differ by country. This lesson is a training aid, not a licence.",
      "Kovetusajat ja tuotteiden käyttö noudattavat aina valmistajan ohjeita. Kovettumaton geeli ei saa koskea ihoa. Kynsituotteita koskevat määräykset vaihtelevat maittain. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    related: ["dich-vu", "bang-gia", "lich-hen"],
    steps: [
      l3(
        "Chuẩn bị khô như bài sơn gel: đẩy da, lấy sạch da chết trên mặt móng, chà nhẹ cho mất bóng, lau sạch dầu. Dũa dáng xong trước, vì đường cười phải hợp với dáng móng.",
        "Dry prep as in the gel polish lesson: push back, remove cuticle tissue from the plate, lightly remove the shine, clean off oil. Shape the nails first, because the smile line has to suit the shape.",
        "Kuivaesikäsittely kuten geelilakkaustunnilla: työnnä kynsinauhat, poista kynsinauhakudos levyltä, poista kiilto kevyesti ja puhdista öljy. Muotoile kynnet ensin, koska hymyviivan on sovittava muotoon."
      ),
      l3(
        "Lớp lót mỏng, bịt đầu móng, hơ; rồi một hay hai lớp hồng trong mỏng, hơ từng lớp. Nền hơi đục giúp che đường đầu móng thật bị lệch.",
        "A thin base coat, cap the free edge, cure; then one or two thin sheer pink coats, each cured. A slightly more opaque base hides an uneven natural free edge.",
        "Ohut pohjakerros, kärjen sulkeminen, kovetus; sitten yksi tai kaksi ohutta läpikuultavaa vaaleanpunaista kerrosta, kukin kovetettuna. Hieman peittävämpi pohja kätkee epätasaisen luonnollisen kärkiviivan."
      ),
      l3(
        "Nhìn cả mười móng rồi mới chọn đường cười: độ sâu theo móng ngắn nhất hay lệch nhất; hình dung ba điểm, hai góc sâu bằng nhau và một điểm giữa nông nhất.",
        "Look at all ten nails before choosing the smile line: set the depth by the shortest or most uneven nail; picture three points, two corners of equal depth and the shallowest point in the centre.",
        "Katso kaikki kymmenen kynttä ennen hymyviivan valintaa: syvyys lyhimmän tai epätasaisimman kynnen mukaan; kuvittele kolme pistettä, kaksi yhtä syvää kulmaa ja matalin kohta keskellä."
      ),
      l3(
        "Ít gel trắng trên cọ nét. Đặt cọ ở một góc, kéo theo đường cong về giữa; rồi từ góc kia, cùng độ sâu, kéo về giữa cho hai nửa liền nhau. Xoay ngón tay khách, không xoay cổ tay mình.",
        "A little white gel on the liner brush. Start at one corner and follow the curve to the centre; then from the other corner, at the same depth, to the centre so the halves meet. Turn the customer's finger, not your wrist.",
        "Vähän valkoista geeliä ohueen siveltimeen. Aloita yhdestä kulmasta ja seuraa kaarta keskelle; sitten toisesta kulmasta samalta syvyydeltä keskelle, niin että puolikkaat kohtaavat. Käännä asiakkaan sormea, älä omaa rannettasi."
      ),
      l3(
        "Tô kín ra tới mép và quét nhẹ qua mép đầu móng. Lớp trắng mỏng; chưa đủ trắng thì để lớp sau.",
        "Fill in to the edge and lightly cap the free edge. Keep the white thin; if it isn't white enough, that's for the next layer.",
        "Täytä reunaan asti ja sulje kärki kevyesti. Pidä valkoinen ohuena; jos se ei ole tarpeeksi valkoinen, se hoidetaan seuraavalla kerroksella."
      ),
      l3(
        "Trước khi hơ, làm sạch đường cười bằng cọ dẹt nhỏ chỉ hơi ẩm dung dịch lau, lướt dọc mép trong phần trắng; lau cọ sau mỗi lần. Cọ ướt quá sẽ làm loang màu trắng.",
        "Before curing, clean the smile line with a small flat brush that is only barely damp with cleanser, gliding along the inner edge of the white; wipe the brush every time. A wet brush makes the white bleed.",
        "Siisti hymyviiva ennen kovetusta pienellä litteällä siveltimellä, joka on vain hädin tuskin kostea puhdistusaineesta, liu'uttaen valkoisen sisäreunaa pitkin; pyyhi sivellin joka kerta. Märkä sivellin levittää valkoista."
      ),
      l3(
        "Lệch thì sửa trước khi hơ: lau sạch phần trắng ở móng đó và vẽ lại. Vẽ vài móng rồi hơ, và đừng để tay khách gần đèn khi đang vẽ.",
        "Fix an uneven tip before curing: wipe that nail's white off and paint it again. Paint a few nails, then cure, and keep the customer's hand away from the lamp while painting.",
        "Korjaa epätasainen kärki ennen kovetusta: pyyhi kynnen valkoinen pois ja maalaa uudelleen. Maalaa muutama kynsi ja koveta, äläkä pidä asiakkaan kättä lampun lähellä maalatessa."
      ),
      l3(
        "Hơ đủ thời gian; cần trắng hơn thì thêm một lớp mỏng theo đúng đường cũ. Top phủ kín, quét qua mép, hơ, lau lớp dính nếu có. Rồi kiểm tra cả mười móng từ trên xuống và sửa ngay móng lệch.",
        "Cure for the full time; if it needs to be whiter, add one more thin layer along the same line. Top coat over everything, cap the edge, cure, wipe the sticky layer if there is one. Then check all ten nails from above and fix any uneven one right away.",
        "Kovetus koko ajan; jos tarvitaan valkoisempaa, vielä yksi ohut kerros samaa viivaa pitkin. Päällyslakka kauttaaltaan, kärki suljettuna, kovetus, tahmakerroksen pyyhintä jos sellainen on. Tarkista sitten kaikki kymmenen kynttä ylhäältä ja korjaa epätasainen heti."
      ),
      l3(
        "Ombré: nền hồng hay màu da mỏng, hơ chín. Trắng (thường là trắng sữa) chỉ ở khoảng một phần ba phía đầu móng, mỏng, không đưa lên gần chân móng.",
        "Ombré: a thin pink or nude base, fully cured. White (often milky white) only on about the front third of the nail, thin, never up near the cuticle.",
        "Ombre: ohut vaaleanpunainen tai nude-pohja, kunnolla kovetettu. Valkoinen (usein maidonvalkoinen) vain noin kynnen etummaiseen kolmannekseen, ohuena, ei lähelle kynsinauhaa."
      ),
      l3(
        "Tán bằng cọ dẹt sạch gần khô, nét thật ngắn và nhẹ hướng lên chân móng, hoặc chấm nhẹ bằng mút (một khách một miếng). Từng móng một, tán xong là hơ; thêm lớp mỏng nếu cần, thường hai đến ba lớp. Có vạch hay sọc là lớp quá dày hoặc tán chưa đủ.",
        "Blend with a clean, almost dry flat brush in very short, light strokes towards the cuticle, or dab with a sponge (one per customer). One nail at a time, cure as soon as it's blended; add thin layers if needed, usually two to three. A band or streaks means the layer is too thick or not blended enough.",
        "Häivytä puhtaalla, lähes kuivalla litteällä siveltimellä hyvin lyhyin, kevyin vedoin kohti kynsinauhaa tai taputtele sienellä (yksi asiakasta kohden). Yksi kynsi kerrallaan, kovetus heti häivytyksen jälkeen; ohuita kerroksia lisää tarvittaessa, yleensä kaksi tai kolme. Raita tai juovat tarkoittavat liian paksua kerrosta tai riittämätöntä häivytystä."
      ),
    ],
    tips: [
      l3(
        "Hình dung ba điểm trước khi đặt cọ: hai góc sâu bằng nhau, điểm giữa nông nhất. Đặt đúng ba điểm, đường cười gần như tự đều.",
        "Picture three points before the brush touches the nail: two corners of equal depth and the shallowest point in the centre. Get the three points right and the smile line almost evens itself.",
        "Kuvittele kolme pistettä ennen kuin sivellin koskee kynteen: kaksi yhtä syvää kulmaa ja matalin kohta keskellä. Kun pisteet ovat oikein, hymyviiva tasaantuu lähes itsestään."
      ),
      l3(
        "Trong VaraaAi, ghi vào hồ sơ khách kiểu French, độ sâu và màu nền đã làm, để lần sau làm lại y như cũ.",
        "In VaraaAi, note the French style, depth and base shade in the customer record, so next time you can repeat it exactly.",
        "Merkitse VaraaAi:n asiakastietoihin ranskalaisen tyyli, syvyys ja pohjasävy, niin voit toistaa sen seuraavalla kerralla täsmälleen."
      ),
    ],
    quiz: [
      {
        q: l3("Vẽ phần trắng của French theo thứ tự nào?", "In what order do you paint the white of a French?", "Missä järjestyksessä ranskalaisen valkoinen maalataan?"),
        options: [
          l3("Từ một góc vào giữa, rồi từ góc kia vào giữa với cùng độ sâu", "From one corner to the centre, then from the other corner to the centre at the same depth", "Yhdestä kulmasta keskelle, sitten toisesta kulmasta keskelle samalta syvyydeltä"),
          l3("Một nét ngang từ bên này sang bên kia", "One stroke straight across from side to side", "Yksi veto suoraan reunasta reunaan"),
          l3("Đổ một giọt trắng lên giữa móng rồi để tự chảy", "Drop white in the middle and let it flow", "Tiputetaan valkoista keskelle ja annetaan valua"),
        ],
        answer: 0,
        why: l3(
          "Đi từ hai góc vào giữa giúp hai nửa đường cười cân nhau như soi gương.",
          "Working from both corners to the centre makes the two halves of the smile line mirror each other.",
          "Kun työskennellään molemmista kulmista keskelle, hymyviivan puolikkaat tulevat toistensa peilikuviksi."
        ),
      },
      {
        q: l3("Làm sạch đường cười bằng gì, và khi nào?", "What do you clean the smile line with, and when?", "Millä ja milloin hymyviiva siistitään?"),
        options: [
          l3("Bằng dũa, sau khi top đã chín", "With a file, after the top coat is cured", "Viilalla, kun päällyslakka on kovettunut"),
          l3("Bằng cọ dẹt nhỏ chỉ hơi ẩm dung dịch lau, trước khi hơ", "With a small flat brush only barely damp with cleanser, before curing", "Pienellä litteällä siveltimellä, joka on vain hädin tuskin kostea puhdistusaineesta, ennen kovetusta"),
          l3("Bằng cọ ướt đẫm dung dịch, sau khi hơ", "With a brush soaked in cleanser, after curing", "Puhdistusaineesta märällä siveltimellä kovetuksen jälkeen"),
        ],
        answer: 1,
        why: l3(
          "Trước khi hơ, gel còn mềm nên dễ cắt cho sắc. Cọ ướt quá sẽ làm loang màu trắng.",
          "Before curing the gel is still soft and easy to sharpen. A wet brush makes the white bleed.",
          "Ennen kovetusta geeli on vielä pehmeää ja helppo terävöittää. Märkä sivellin levittää valkoista."
        ),
      },
      {
        q: l3("Ombré bị một vạch trắng ngang móng. Nguyên nhân thường là gì?", "An ombré shows a white band across the nail. What is the usual cause?", "Ombressa näkyy valkoinen raita kynnen poikki. Mikä on tavallinen syy?"),
        options: [
          l3("Nền hồng quá mỏng", "The pink base is too thin", "Vaaleanpunainen pohja on liian ohut"),
          l3("Hơ đèn quá lâu", "Curing too long", "Liian pitkä kovetus"),
          l3("Lớp trắng quá dày hoặc tán chưa đủ, chưa đi từ từ", "The white is too thick or not blended gradually enough", "Valkoinen on liian paksu tai sitä ei ole häivytetty tarpeeksi asteittain"),
        ],
        answer: 2,
        why: l3(
          "Ombré đẹp nhờ lớp trắng mỏng và tán nhẹ nhiều lần. Lớp dày tán vội sẽ để lại vạch và sọc.",
          "A good ombré comes from thin white and several light blends. A thick layer blended in a hurry leaves bands and streaks.",
          "Hyvä ombre syntyy ohuesta valkoisesta ja monesta kevyestä häivytyksestä. Paksu, kiireessä häivytetty kerros jättää raitoja ja juovia."
        ),
      },
    ],
  },
  {
    slug: "cham-soc-mong-co-ban-hieu-dung",
    course: "p-nail",
    style: "theory",
    title: l3("Chăm sóc móng cơ bản: hiểu đúng để tay chân khỏe đẹp", "Basic manicure and pedicure: understand them for healthy, beautiful hands and feet", "Perusmanikyyri ja -pedikyyri: ymmärrä ne, niin kädet ja jalat ovat terveet ja kauniit"),
    summary: l3(
      "Dịch vụ chăm sóc móng tay, móng chân với sơn thường: mục đích là móng khỏe, da khỏe; nếp da sống không cắt; móng chân cắt thẳng ngang; vệ sinh bồn ngâm với túi lót và dụng cụ tiệt trùng; khách tiểu đường hay có vấn đề tuần hoàn; vết chai chỉ làm mịn; sơn thường so với gel; mát xa, dưỡng ẩm và dặn dò khách.",
      "The classic manicure and pedicure with regular polish: the aim is healthy nails and skin; the living fold is not cut; toenails are cut straight across; basin hygiene with liners and sterilised tools; customers with diabetes or circulation problems; calluses are only smoothed; regular polish vs gel; massage, moisture and aftercare.",
      "Klassinen manikyyri ja pedikyyri tavallisella lakalla: tavoitteena terveet kynnet ja iho; elävää kynsivallia ei leikata; varpaankynnet leikataan suoraan; jalkakylvyn hygienia suojapusseineen ja steriloiduin välinein; diabetesta tai verenkiertohäiriöitä sairastavat asiakkaat; kovettumat vain tasoitetaan; tavallinen lakka vai geeli; hieronta, kosteutus ja kotiohjeet."
    ),
    video: video("cham-soc-mong-co-ban-hieu-dung", 282, "2026-11-17"),
    notice: l3(
      "Quy định vệ sinh khác nhau theo từng nước; bài nêu theo hướng dẫn của thành phố Helsinki. Người thợ không chẩn đoán: thấy vết loét, vết thương, móng dày, đổi màu hay móng đâm vào da thì không làm và khuyên khách đến bác sĩ hoặc chuyên viên chăm sóc bàn chân. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Hygiene rules differ by country; the lesson follows the City of Helsinki guidance. Nail professionals don't diagnose: ulcers, wounds, thick or discoloured nails or an ingrown nail mean no treatment and a referral to a doctor or foot-care professional. This lesson is a training aid, not a licence.",
      "Hygieniamääräykset vaihtelevat maittain; tunti noudattaa Helsingin kaupungin ohjetta. Kynsiammattilainen ei tee diagnooseja: haavauma, haava, paksuuntunut tai värjäytynyt kynsi tai sisäänkasvanut kynsi tarkoittaa, että hoitoa ei tehdä ja asiakas ohjataan lääkäriin tai jalkojenhoidon ammattilaiselle. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    sources: [
      HELSINKI_HYGIENE,
      { label: "NHS — Ingrown toenail", url: "https://www.nhs.uk/conditions/ingrown-toenail/" },
    ],
    related: ["khach-hang", "lich-hen", "the-khach-quen"],
    steps: [
      l3(
        "Mục đích không chỉ là lên màu mà là móng khỏe, da khỏe: móng cắt dũa gọn, da quanh móng mềm, sạch. Người thợ tinh ý thấy điều bất thường thì khuyên khách đi khám.",
        "The aim is not only colour but healthy nails and skin: neatly cut and filed nails, soft clean skin around them. An attentive professional who notices something unusual suggests a doctor.",
        "Tavoite ei ole vain väri vaan terveet kynnet ja iho: siististi leikatut ja viilatut kynnet, pehmeä ja puhdas iho niiden ympärillä. Tarkkaavainen ammattilainen, joka huomaa jotain poikkeavaa, ohjaa lääkäriin."
      ),
      l3(
        "Nếp da sống ở chân móng bịt kín, bảo vệ mầm móng: không cắt. Chỉ lấy lớp da chết mỏng bám trên mặt móng và những mảnh da khô đã bong lên (xem bài Sơn gel: hiểu đúng để làm bền).",
        "The living fold at the base of the nail seals and protects the matrix: never cut it. Remove only the thin dead tissue stuck to the nail plate and dry flakes that have lifted (see Gel polish: understand it so it lasts).",
        "Kynnen tyven elävä kynsivalli sulkee ja suojaa kasvukohtaa: sitä ei leikata. Poista vain kynsilevyyn tarttunut ohut kuollut kudos ja irronneet kuivat hilseet (katso Geelilakkaus: ymmärrä se, niin se kestää)."
      ),
      l3(
        "Cắt vào da sống thì da thường mọc lại dày, sần, dễ xước măng rô, và mỗi vết cắt là đường cho nhiễm trùng. Giải thích cho khách: đẩy nhẹ, lấy da chết, dưỡng dầu mỗi ngày.",
        "Cutting living skin usually makes it grow back thicker and rougher with more hangnails, and every cut is a way in for infection. Explain to the customer: gentle push-back, removing dead tissue, oil every day.",
        "Elävän ihon leikkaaminen saa sen yleensä kasvamaan takaisin paksumpana ja karheampana, ja jokainen viilto on reitti tulehdukselle. Kerro asiakkaalle: kevyt työntö, kuolleen kudoksen poisto ja öljy joka päivä."
      ),
      l3(
        "Móng chân cắt thẳng ngang, chỉ bo nhẹ hai góc, không đào khóe và không cắt quá ngắn; mép móng ngang đầu ngón chân. Khóe cắt sâu dễ thành móng quặp.",
        "Toenails are cut straight across with only slightly softened corners, never dug into the corners or cut too short; the edge level with the tip of the toe. Corners cut deep easily become ingrown.",
        "Varpaankynnet leikataan suoraan, kulmat vain hieman pyöristäen, kulmia ei kaiveta eikä kynsiä leikata liian lyhyiksi; reuna varpaan kärjen tasolla. Syvälle leikatut kulmat kasvavat helposti sisään."
      ),
      l3(
        "Theo hướng dẫn vệ sinh của Helsinki: lót túi dùng một lần trong bồn ngâm, dụng cụ làm móng chân luôn tiệt trùng và để riêng. Sau mỗi khách, bồn được làm sạch và khử khuẩn. Quy định nơi bạn làm có thể khác.",
        "Under the Helsinki hygiene guidance: a disposable liner in the foot basin, pedicure tools always sterilised and stored separately. After every customer the basin is cleaned and disinfected. Rules where you work may differ.",
        "Helsingin hygieniaohjeen mukaan: jalkakylpyyn kertakäyttöinen suojapussi, jalkahoitovälineet aina steriloituina ja erillään säilytettyinä. Jokaisen asiakkaan jälkeen allas puhdistetaan ja desinfioidaan. Määräykset työpaikallasi voivat poiketa."
      ),
      l3(
        "Dũa giấy, phao, que gỗ, miếng tách ngón: mỗi khách một bộ mới. Kềm và cây đẩy da kim loại có thể làm xước da: làm sạch rồi tiệt trùng sau mỗi khách, mở túi trước mặt khách.",
        "Paper files, buffers, wooden sticks, toe separators: a new set for every customer. Metal nippers and pushers can break the skin: clean and sterilise them after every customer, and open the pouch in front of the customer.",
        "Paperiviilat, hiomapalat, puutikut ja varvaserottimet: jokaiselle asiakkaalle uudet. Metalliset kynsinauhaleikkurit ja -työntimet voivat rikkoa ihon: puhdista ja steriloi ne jokaisen asiakkaan jälkeen ja avaa pussi asiakkaan nähden."
      ),
      l3(
        "Luôn hỏi về tiểu đường và tuần hoàn máu. Với những khách này: nước ấm vừa, ngâm ngắn, không cắt da, không dùng dao, dũa thật nhẹ. Vết loét, vết thương, móng dày hay đổi màu: không làm, khuyên đến bác sĩ hay chuyên viên chăm sóc bàn chân (xem bài Khi nào không làm cho khách).",
        "Always ask about diabetes and circulation. For these customers: warm, not hot, water, a short soak, no cutting, no blades, very gentle filing. Ulcers, wounds, thick or discoloured nails: no treatment, refer to a doctor or foot-care professional (see When not to work on a customer).",
        "Kysy aina diabeteksesta ja verenkierrosta. Näille asiakkaille: lämmin, ei kuuma, vesi, lyhyt liotus, ei leikkaamista, ei teriä, hyvin kevyt viilaus. Haavaumat, haavat, paksut tai värjäytyneet kynnet: ei hoitoa, ohjaus lääkärille tai jalkojenhoidon ammattilaiselle (katso Milloin asiakasta ei hoideta)."
      ),
      l3(
        "Chai là da dày lên để bảo vệ: chỉ làm mềm, làm mịn bằng dũa chân mịn. Không dùng dao bào hay lưỡi cắt chai, trừ khi đã được đào tạo và nơi bạn làm cho phép. Lấy quá nhiều thì đau, xước và chai thường dày lại.",
        "A callus is skin thickened for protection: only soften and smooth it with a fine foot file. No blades or callus cutters unless you are trained and it is allowed where you work. Taking too much hurts, scratches and the callus usually comes back thicker.",
        "Kovettuma on suojaksi paksuuntunutta ihoa: sitä vain pehmennetään ja tasoitetaan hienolla jalkaraspilla. Ei teriä eikä kovettumahöyliä, ellei sinulla ole koulutusta ja se ole työpaikallasi sallittua. Liika poisto sattuu, naarmuttaa ja kovettuma palaa yleensä paksumpana."
      ),
      l3(
        "Sơn thường khô nhờ dung môi bay hơi, không cần đèn, tháo nhẹ nhàng bằng nước tẩy, thường giữ đẹp vài ngày đến khoảng một tuần; mặt khô nhanh nhưng bên dưới cần vài giờ. Gel bền hơn nhưng cần đèn và tháo kỹ hơn.",
        "Regular polish dries as solvents evaporate, needs no lamp, comes off gently with remover and usually looks good for a few days to about a week; the surface dries fast but underneath takes a few hours. Gel lasts longer but needs a lamp and a more careful removal.",
        "Tavallinen lakka kuivuu liuottimien haihtuessa, ei tarvitse lamppua, lähtee hellävaraisesti poistoaineella ja pysyy kauniina yleensä muutamasta päivästä noin viikkoon; pinta kuivuu nopeasti, mutta alla kestää muutaman tunnin. Geeli kestää pidempään mutta vaatii lampun ja huolellisemman poiston."
      ),
      l3(
        "Mát xa và dưỡng ẩm là lúc khách nhớ tiệm lâu nhất, nhưng phải lau sạch kem và dầu trên mặt móng trước khi sơn. Dặn khách tránh nước nóng và giày bít vài giờ, dưỡng dầu mỗi ngày, ở nhà cũng cắt móng chân thẳng ngang.",
        "Massage and moisture are what customers remember, but clean cream and oil off the nail plate before polishing. Tell the customer to avoid hot water and closed shoes for a few hours, use oil daily and cut toenails straight across at home too.",
        "Hieronta ja kosteutus jäävät asiakkaan mieleen, mutta puhdista voide ja öljy kynsilevyltä ennen lakkausta. Neuvo asiakasta välttämään kuumaa vettä ja umpikenkiä muutaman tunnin, käyttämään öljyä päivittäin ja leikkaamaan varpaankynnet kotonakin suoraan."
      ),
    ],
    tips: [
      l3(
        "Khách đòi cắt da thật sâu: đừng chiều, hãy hẹn lại sau vài tuần đẩy nhẹ và dưỡng dầu để khách tự thấy da đẹp hơn.",
        "When a customer insists on deep cuticle cutting, don't give in: book them back after a few weeks of gentle push-back and daily oil so they see the difference themselves.",
        "Kun asiakas vaatii syvää kynsinauhojen leikkaamista, älä anna periksi: varaa uusi aika muutaman viikon kevyen työnnön ja päivittäisen öljyn jälkeen, niin asiakas näkee eron itse."
      ),
      l3(
        "Trong VaraaAi, ghi vào hồ sơ khách những điều cần nhớ, như tiểu đường, dị ứng hay móng hay quặp, để cả tiệm cùng biết và cẩn thận ở lần sau.",
        "In VaraaAi, note what matters in the customer record, such as diabetes, allergies or a tendency to ingrown nails, so the whole team knows and takes care next time.",
        "Merkitse VaraaAi:n asiakastietoihin tärkeät asiat, kuten diabetes, allergiat tai taipumus sisäänkasvaviin kynsiin, jotta koko tiimi tietää ja on varovainen seuraavalla kerralla."
      ),
    ],
    quiz: [
      {
        q: l3("Cắt móng chân thế nào là đúng?", "What is the right way to cut toenails?", "Miten varpaankynnet leikataan oikein?"),
        options: [
          l3("Cắt cong sâu xuống hai khóe cho gọn", "Cut in a deep curve down into the corners to keep them neat", "Syvälle kaarelle kulmiin asti, jotta ne ovat siistit"),
          l3("Cắt thẳng ngang, chỉ bo nhẹ hai góc, không cắt quá ngắn", "Straight across, corners only slightly softened, not too short", "Suoraan, kulmat vain hieman pyöristäen, ei liian lyhyiksi"),
          l3("Cắt thật ngắn để lâu mọc lại", "Very short so they take longer to grow back", "Hyvin lyhyiksi, jotta kasvamiseen menee kauemmin"),
        ],
        answer: 1,
        why: l3(
          "Khóe cắt sâu hay móng cắt quá ngắn dễ làm móng mọc đâm vào da, thành móng quặp.",
          "Corners cut deep or nails cut too short easily grow into the skin and become ingrown.",
          "Syvälle leikatut kulmat tai liian lyhyet kynnet kasvavat helposti ihoon ja muuttuvat sisäänkasvaneiksi."
        ),
      },
      {
        q: l3("Điều nào đúng về vệ sinh bồn ngâm chân theo hướng dẫn của Helsinki?", "Which is right about foot basin hygiene under the Helsinki guidance?", "Mikä pitää paikkansa jalkakylvyn hygieniasta Helsingin ohjeen mukaan?"),
        options: [
          l3("Thay nước là đủ, không cần túi lót", "Changing the water is enough, no liner needed", "Veden vaihto riittää, suojapussia ei tarvita"),
          l3("Chỉ cần lau bồn vào cuối ngày", "Wiping the basin at the end of the day is enough", "Riittää, että allas pyyhitään päivän päätteeksi"),
          l3("Lót túi dùng một lần cho mỗi khách, dụng cụ móng chân tiệt trùng và để riêng", "A disposable liner for every customer, pedicure tools sterilised and stored separately", "Kertakäyttöinen suojapussi jokaiselle asiakkaalle, jalkahoitovälineet steriloituina ja erillään"),
        ],
        answer: 2,
        why: l3(
          "Bồn ấm và ẩm là nơi vi khuẩn, nấm dễ phát triển. Ngoài túi lót, bồn còn được làm sạch và khử khuẩn sau mỗi khách.",
          "A warm, damp basin is where bacteria and fungi grow easily. Besides the liner, the basin is also cleaned and disinfected after every customer.",
          "Lämmin ja kostea allas on paikka, jossa bakteerit ja sienet kasvavat helposti. Suojapussin lisäksi allas puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen."
        ),
      },
      {
        q: l3("Khách có bệnh tiểu đường đến làm móng chân. Bạn làm gì?", "A customer with diabetes comes for a pedicure. What do you do?", "Diabeetikkoasiakas tulee jalkahoitoon. Mitä teet?"),
        options: [
          l3("Nước ấm vừa, ngâm ngắn, không cắt da, không dùng dao; có vết loét hay vết thương thì không làm và khuyên đi khám", "Warm water, a short soak, no cutting, no blades; ulcers or wounds mean no treatment and a referral", "Lämmin vesi, lyhyt liotus, ei leikkaamista, ei teriä; haavaumat tai haavat tarkoittavat, ettei hoideta, ja ohjaat lääkäriin"),
          l3("Ngâm thật lâu trong nước nóng cho da mềm", "A long soak in hot water to soften the skin", "Pitkä liotus kuumassa vedessä ihon pehmentämiseksi"),
          l3("Cắt chai thật sạch bằng dao bào", "Remove the calluses thoroughly with a blade", "Poistat kovettumat perusteellisesti terällä"),
        ],
        answer: 0,
        why: l3(
          "Bàn chân có thể giảm cảm giác và vết xước rất lâu lành, nên mọi thứ phải thật nhẹ nhàng.",
          "The feet may have less feeling and scratches heal slowly, so everything must be very gentle.",
          "Jalkojen tunto voi olla heikentynyt ja naarmut paranevat hitaasti, joten kaiken on oltava hyvin hellävaraista."
        ),
      },
    ],
  },
  {
    slug: "cham-soc-mong-co-ban",
    course: "p-nail",
    style: "practice",
    title: l3("Chăm sóc móng tay, móng chân: thực hành từng bước", "Manicure and pedicure: step by step", "Manikyyri ja pedikyyri: vaihe vaiheelta"),
    summary: l3(
      "Một buổi chăm sóc móng tay: tư vấn, tẩy sơn cũ, dũa dáng, làm mềm da, đẩy da và chỉ lấy da chết, phao nhẹ, mát xa tay, lau sạch dầu, sơn lót, hai lớp màu mỏng, sơn bóng, để khô. Rồi móng chân: bồn với túi lót mới, nhìn kỹ đôi chân, ngâm ngắn, cắt thẳng ngang, dũa, đẩy da, dũa chai nhẹ không dùng dao, tẩy da chết, mát xa, tách ngón, sơn; và vệ sinh sau khách.",
      "A manicure: consultation, removing old polish, shaping, softening the cuticle, pushing back and removing only dead tissue, light buffing, hand massage, cleaning off oil, base coat, two thin colour coats, top coat, drying. Then a pedicure: a basin with a fresh liner, checking the feet, a short soak, cutting straight across, filing, cuticle care, gentle callus filing with no blades, scrub, massage, toe separators, polish; and hygiene after the customer.",
      "Manikyyri: konsultaatio, vanhan lakan poisto, muotoilu, kynsinauhojen pehmennys, työntö ja vain kuolleen kudoksen poisto, kevyt hionta, käsihieronta, öljyn puhdistus, aluslakka, kaksi ohutta värikerrosta, päällyslakka, kuivatus. Sitten pedikyyri: allas uudella suojapussilla, jalkojen tarkastus, lyhyt liotus, suora leikkaus, viilaus, kynsinauhojen hoito, kevyt kovettumien raspaus ilman teriä, kuorinta, hieronta, varvaserottimet, lakkaus; ja hygienia asiakkaan jälkeen."
    ),
    video: video("cham-soc-mong-co-ban", 284, "2026-11-17"),
    notice: l3(
      "Thời gian ngâm và dùng sản phẩm theo hướng dẫn của sản phẩm. Quy định vệ sinh khác nhau theo từng nước; bài nêu theo hướng dẫn của thành phố Helsinki. Thấy dấu hiệu bất thường ở móng hay da thì không làm và khuyên khách đi khám. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Soaking times and product use follow the product's instructions. Hygiene rules differ by country; the lesson follows the City of Helsinki guidance. If a nail or the skin looks unusual, don't work and suggest a doctor. This lesson is a training aid, not a licence.",
      "Liotusajat ja tuotteiden käyttö noudattavat tuotteen ohjeita. Hygieniamääräykset vaihtelevat maittain; tunti noudattaa Helsingin kaupungin ohjetta. Jos kynsi tai iho näyttää poikkeavalta, älä tee hoitoa ja ohjaa lääkäriin. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    sources: [
      HELSINKI_HYGIENE,
      { label: "NHS — Ingrown toenail", url: "https://www.nhs.uk/conditions/ingrown-toenail/" },
    ],
    related: ["khach-hang", "lich-hen", "the-khach-quen"],
    steps: [
      l3(
        "Rửa tay, sát khuẩn tay cho mình và cho khách. Hỏi dáng, màu và sức khỏe (dị ứng, tiểu đường), nhìn kỹ móng và da; thấy bất thường thì không làm.",
        "Wash and disinfect your hands and the customer's. Ask about shape, colour and health (allergies, diabetes) and look closely at nails and skin; if something looks unusual, don't work.",
        "Pese ja desinfioi omat ja asiakkaan kädet. Kysy muodosta, väristä ja terveydestä (allergiat, diabetes) ja katso kynnet ja iho tarkasti; jos jokin näyttää poikkeavalta, älä tee hoitoa."
      ),
      l3(
        "Tẩy sơn cũ: bông thấm nước tẩy đặt lên móng vài giây, vuốt một chiều từ chân móng ra đầu móng, không chà qua lại. Rồi dũa một chiều theo dáng khách chọn.",
        "Remove old polish: a cotton pad with remover held on the nail for a few seconds, then wiped one way from cuticle to tip, never rubbed back and forth. Then file one way into the chosen shape.",
        "Poista vanha lakka: poistoaineella kostutettu vanulappu kynnen päälle muutamaksi sekunniksi ja pyyhkäisy yhteen suuntaan tyvestä kärkeen, ei edestakaisin hankaamista. Viilaa sitten yhteen suuntaan valittuun muotoon."
      ),
      l3(
        "Làm mềm da bằng cách ngâm nước ấm thật ngắn rồi lau khô, hoặc bằng chất làm mềm da đúng thời gian ghi trên sản phẩm. Trước khi làm gel thì chuẩn bị khô.",
        "Soften the cuticle with a very short soak in warm water, then dry well, or with a cuticle remover for the time on the product. Before gel, prep dry instead.",
        "Pehmennä kynsinauhat hyvin lyhyellä lämpimällä liotuksella ja kuivaa hyvin, tai kynsinauhanpoistoaineella tuotteen ilmoittaman ajan. Ennen geeliä esikäsittely tehdään kuivana."
      ),
      l3(
        "Đẩy da thật nhẹ với cây đẩy nghiêng thấp, lấy sạch da chết trên mặt móng; kềm chỉ cắt mảnh da chết đã bong, không cắt nếp da sống dù khách yêu cầu.",
        "Push back very gently with the pusher held low, clean the dead tissue off the plate; nippers only trim dead flakes that have lifted, never the living fold, even if the customer asks.",
        "Työnnä kynsinauhat hyvin kevyesti matalassa kulmassa pidetyllä työntimellä ja puhdista kuollut kudos levyltä; leikkurilla leikataan vain irronneet kuolleet hilseet, ei koskaan elävää kynsivallia, vaikka asiakas pyytäisi."
      ),
      l3(
        "Phao mịn thật nhẹ cho mặt móng đều, mát xa tay với kem dưỡng, rồi lau sạch kem và dầu trên mặt móng bằng bông không xơ.",
        "Buff very lightly with a fine buffer to even the surface, massage the hand with lotion, then clean cream and oil off the nail plates with a lint-free wipe.",
        "Hio hyvin kevyesti hienolla hiomapalalla tasoittaaksesi pinnan, hiero kättä voiteella ja puhdista sitten voide ja öljy kynsilevyiltä nukkaamattomalla liinalla."
      ),
      l3(
        "Sơn lót mỏng, hai lớp màu mỏng (ba đường cọ, chừa khe ở chân móng, quét qua mép đầu móng, đợi lớp trước se mặt), rồi sơn bóng. Lem ra da thì lau bằng que gỗ quấn bông thấm nước tẩy.",
        "A thin base coat, two thin colour coats (three strokes, a small gap at the cuticle, cap the free edge, let each coat set), then top coat. If polish touches the skin, clean it with a cotton-tipped wooden stick and remover.",
        "Ohut aluslakka, kaksi ohutta värikerrosta (kolme vetoa, pieni rako tyvessä, kärjen sulkeminen, jokainen kerros saa asettua) ja päällyslakka. Jos lakkaa joutuu iholle, puhdista se poistoaineella kostutetulla, vanulla päällystetyllä puutikulla."
      ),
      l3(
        "Bồn móng chân: đã làm sạch và khử khuẩn, lót túi mới dùng một lần, nước ấm thử bằng cổ tay; dụng cụ lấy từ túi tiệt trùng, mở trước mặt khách. Nhìn kỹ đôi chân trước khi ngâm.",
        "Pedicure basin: cleaned and disinfected, a new disposable liner, warm water tested on your wrist; tools from a sterilisation pouch opened in front of the customer. Check the feet carefully before the soak.",
        "Jalkakylpy: puhdistettu ja desinfioitu, uusi kertakäyttöinen suojapussi, lämmin vesi ranteella kokeiltuna; välineet sterilointipussista, joka avataan asiakkaan nähden. Tarkasta jalat huolellisesti ennen liotusta."
      ),
      l3(
        "Ngâm ngắn (khách tiểu đường càng ngắn, nước chỉ ấm vừa). Cắt móng chân thẳng ngang từng nhát nhỏ, không đào khóe, mép ngang đầu ngón; dũa thẳng ngang, chỉ bo nhẹ góc.",
        "A short soak (even shorter, and only warm water, for customers with diabetes). Cut toenails straight across in small snips, never into the corners, edge level with the toe tip; file straight across, only slightly softening the corners.",
        "Lyhyt liotus (diabeetikolle vielä lyhyempi ja vain lämmin vesi). Leikkaa varpaankynnet suoraan pienin leikkauksin, ei kulmiin, reuna varpaan kärjen tasolle; viilaa suoraan ja pyöristä kulmia vain hieman."
      ),
      l3(
        "Đẩy da nhẹ, chỉ lấy da chết. Chai: dũa chân mịn vài lượt nhẹ, không dao, không lưỡi bào; chai quá dày hay nứt sâu thì khuyên đến chuyên viên chăm sóc bàn chân. Tẩy da chết, rửa, lau thật khô kẽ ngón, mát xa.",
        "Gentle cuticle care, dead tissue only. Calluses: a few light passes with a fine foot file, no blades; very thick calluses or deep cracks go to a foot-care professional. Scrub, rinse, dry well between the toes, massage.",
        "Kevyt kynsinauhojen hoito, vain kuollut kudos. Kovettumat: muutama kevyt veto hienolla jalkaraspilla, ei teriä; hyvin paksut kovettumat tai syvät halkeamat jalkojenhoidon ammattilaiselle. Kuorinta, huuhtelu, varvasvälien huolellinen kuivaus, hieronta."
      ),
      l3(
        "Lau sạch dầu, tách ngón, sơn lót, hai lớp màu mỏng, sơn bóng; chờ se mặt rồi mới mang dép. Sau khách: bỏ túi lót, làm sạch rồi khử khuẩn bồn đủ thời gian, bỏ đồ dùng một lần, kềm và cây đẩy mang đi rửa và tiệt trùng.",
        "Clean off oil, toe separators, base, two thin colour coats, top coat; let it set before sandals go on. After the customer: liner out, basin cleaned then disinfected for the full contact time, disposables thrown away, nippers and pushers washed and sterilised.",
        "Puhdista öljy, varvaserottimet, aluslakka, kaksi ohutta värikerrosta, päällyslakka; anna asettua ennen sandaaleja. Asiakkaan jälkeen: suojapussi pois, allas puhdistetaan ja desinfioidaan koko vaikutusajan, kertakäyttöiset roskiin, leikkurit ja työntimet pestään ja steriloidaan."
      ),
    ],
    tips: [
      l3(
        "Cắt móng chân bằng nhiều nhát nhỏ thay vì một nhát hết cả móng: móng không bị nứt dọc, và bạn giữ được đường thẳng ngang.",
        "Cut toenails in several small snips rather than one big cut: the nail doesn't split and you keep a straight line.",
        "Leikkaa varpaankynnet usealla pienellä leikkauksella yhden ison sijaan: kynsi ei halkea ja linja pysyy suorana."
      ),
      l3(
        "Trong VaraaAi, đặt sẵn lịch hẹn kế tiếp ngay tại quầy, khoảng bốn tuần sau, và ghi vào hồ sơ khách màu sơn đã dùng để lần sau khách khỏi phải nhớ.",
        "In VaraaAi, book the next appointment right at the desk, about four weeks later, and note the polish colour in the customer record so the customer doesn't have to remember it.",
        "Varaa VaraaAi:ssa seuraava aika heti tiskillä noin neljän viikon päähän ja merkitse lakan sävy asiakastietoihin, jottei asiakkaan tarvitse muistaa sitä."
      ),
    ],
    quiz: [
      {
        q: l3("Tẩy sơn cũ thế nào cho đúng?", "How do you remove old polish properly?", "Miten vanha lakka poistetaan oikein?"),
        options: [
          l3("Chà mạnh qua lại cho nhanh", "Rub hard back and forth to be quick", "Hankaa voimakkaasti edestakaisin, niin se käy nopeasti"),
          l3("Đặt bông thấm nước tẩy vài giây, rồi vuốt một chiều từ chân móng ra đầu móng", "Hold a pad with remover on the nail a few seconds, then wipe one way from cuticle to tip", "Pidä poistoaineella kostutettua lappua kynnellä muutama sekunti ja pyyhkäise yhteen suuntaan tyvestä kärkeen"),
          l3("Cạo sơn bằng cây đẩy da", "Scrape it off with the pusher", "Raaputa lakka pois työntimellä"),
        ],
        answer: 1,
        why: l3(
          "Chà qua lại làm sơn lem ra da và khóe móng; vuốt một chiều sạch và nhẹ nhàng hơn.",
          "Rubbing back and forth smears polish onto the skin and into the corners; one-way wipes are cleaner and gentler.",
          "Edestakainen hankaus levittää lakkaa iholle ja kulmiin; yhteen suuntaan pyyhkiminen on puhtaampaa ja hellävaraisempaa."
        ),
      },
      {
        q: l3("Khách có vết chai dày ở gót. Bạn làm gì?", "The customer has a thick callus on the heel. What do you do?", "Asiakkaalla on paksu kovettuma kantapäässä. Mitä teet?"),
        options: [
          l3("Dùng dao bào cắt cho sạch hết", "Shave it all off with a blade", "Höylää se kokonaan pois terällä"),
          l3("Ngâm nước nóng thật lâu rồi cạo", "Soak in hot water for a long time, then scrape", "Liota pitkään kuumassa vedessä ja raaputa"),
          l3("Dũa chân mịn vài lượt nhẹ để làm mịn; quá dày hay nứt sâu thì khuyên đến chuyên viên chăm sóc bàn chân", "A few light passes with a fine foot file to smooth it; very thick or deeply cracked means a foot-care professional", "Muutama kevyt veto hienolla jalkaraspilla tasoittamaan; hyvin paksu tai syvästi halkeillut kuuluu jalkojenhoidon ammattilaiselle"),
        ],
        answer: 2,
        why: l3(
          "Chai bảo vệ chân. Lấy quá nhiều thì đau, dễ xước, và lưỡi dao chỉ dành cho người được đào tạo, ở nơi được phép.",
          "A callus protects the foot. Taking too much hurts and scratches, and blades are only for those trained to use them, where it is allowed.",
          "Kovettuma suojaa jalkaa. Liika poisto sattuu ja naarmuttaa, ja terät kuuluvat vain koulutetuille ja vain siellä, missä se on sallittua."
        ),
      },
      {
        q: l3("Việc gì đúng sau khi khách làm móng chân ra về?", "What is right after a pedicure customer leaves?", "Mikä on oikein, kun pedikyyriasiakas on lähtenyt?"),
        options: [
          l3("Bỏ túi lót, làm sạch rồi khử khuẩn bồn, kềm và cây đẩy mang đi rửa và tiệt trùng", "Liner out, basin cleaned then disinfected, nippers and pushers washed and sterilised", "Suojapussi pois, allas puhdistetaan ja desinfioidaan, leikkurit ja työntimet pestään ja steriloidaan"),
          l3("Giữ túi lót cho khách sau nếu còn sạch", "Keep the liner for the next customer if it looks clean", "Säästä suojapussi seuraavalle asiakkaalle, jos se näyttää puhtaalta"),
          l3("Lau kềm bằng khăn ướt rồi dùng tiếp", "Wipe the nippers with a damp cloth and reuse them", "Pyyhi leikkurit kostealla liinalla ja käytä uudelleen"),
        ],
        answer: 0,
        why: l3(
          "Túi lót dùng một lần cho mỗi khách, và dụng cụ móng chân luôn phải tiệt trùng (hướng dẫn vệ sinh của Helsinki).",
          "Liners are single-use for each customer, and pedicure tools are always sterilised (Helsinki hygiene guidance).",
          "Suojapussi on kertakäyttöinen jokaiselle asiakkaalle, ja jalkahoitovälineet steriloidaan aina (Helsingin hygieniaohje)."
        ),
      },
    ],
  },

  /* ================= lashes ================= */
  {
    slug: "mi-chuan-bi-hieu-dung",
    course: "p-lash",
    style: "theory",
    title: l3("Chuẩn bị nối mi: hiểu đúng để an toàn từ phút đầu", "Lash preparation: understand it to be safe from the first minute", "Ripsienpidennysten valmistelu: ymmärrä, niin työ on turvallista ensimmäisestä minuutista"),
    summary: l3(
      "Vì sao mười phút đầu quyết định độ bền và sự an toàn: hỏi gì khi tư vấn (dị ứng, phản ứng cũ với keo hay thuốc nhuộm, bệnh mắt, mổ mắt gần đây, kính áp tròng, thuốc làm khô mắt, mang thai), khi nào không làm, keo cyanoacrylate và hơi keo, vì sao thử keo trước lần đầu và vì sao thử keo không phải là bảo đảm, độ ẩm và nhiệt độ phòng, vệ sinh chỗ làm và ghi hồ sơ khi khách đồng ý.",
      "Why the first ten minutes decide how long the set lasts and how safe it is: what to ask in the consultation (allergies, earlier reactions to lash glue or tint, eye conditions, recent eye surgery, contact lenses, medicines that dry the eyes, pregnancy), when not to work, cyanoacrylate glue and its vapour, why a test is done before the first set and why a test is no guarantee, room humidity and temperature, station hygiene, and keeping a record with the client's consent.",
      "Miksi ensimmäiset kymmenen minuuttia ratkaisevat kestävyyden ja turvallisuuden: mitä konsultaatiossa kysytään (allergiat, aiemmat reaktiot ripsiliimaan tai -väriin, silmäsairaudet, äskettäinen silmäleikkaus, piilolinssit, silmiä kuivattavat lääkkeet, raskaus), milloin ei tehdä, syanoakrylaattiliima ja sen höyry, miksi ennen ensimmäistä settiä tehdään testi ja miksi testi ei ole tae, huoneen kosteus ja lämpötila, työpisteen hygienia sekä kirjaukset asiakkaan suostumuksella."
    ),
    video: video("mi-chuan-bi-hieu-dung", 275, "2026-11-17"),
    notice: l3(
      "Thời gian và cách thử keo, độ ẩm và nhiệt độ phòng: luôn theo hướng dẫn của hãng keo. Thử keo không bảo đảm khách sẽ không phản ứng về sau. Chúng ta là thợ, không phải bác sĩ: khi có dấu hiệu bất thường hay câu hỏi về sức khoẻ (kể cả khi mang thai), hãy khuyên khách hỏi bác sĩ. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "How and when to do the test, and the room's humidity and temperature: always as the glue maker says. A test does not guarantee that the client will not react later. We are technicians, not doctors: when something looks unusual or there is a health question (pregnancy included), advise the client to ask a doctor. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Testin tapa ja ajankohta sekä huoneen kosteus ja lämpötila: aina liimavalmistajan ohjeiden mukaan. Testi ei takaa, ettei asiakas reagoi myöhemmin. Olemme ammattilaisia, emme lääkäreitä: jos jokin näyttää poikkeavalta tai on terveyskysymys (myös raskaus), neuvo asiakasta kysymään lääkäriltä. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Buổi nào cũng bắt đầu bằng tư vấn, kể cả với khách quen. Chỉ một câu hỏi lúc đầu có thể tránh được một lần phản ứng.",
        "Every appointment starts with a consultation, regular clients included. One question at the start can prevent a reaction.",
        "Jokainen käynti alkaa konsultaatiolla, myös vakioasiakkailla. Yksi kysymys alussa voi estää reaktion."
      ),
      l3(
        "Hỏi về an toàn trước: dị ứng, phản ứng cũ với keo nối mi, thuốc nhuộm mi hay chân mày, khô mắt, viêm bờ mi, mổ mắt gần đây, kính áp tròng, thuốc đang dùng (một số thuốc có thể làm khô mắt).",
        "Ask about safety first: allergies, earlier reactions to lash glue or lash/brow tint, dry eyes, blepharitis, recent eye surgery, contact lenses, current medicines (some can dry the eyes).",
        "Kysy ensin turvallisuudesta: allergiat, aiemmat reaktiot ripsiliimaan tai ripsi-/kulmaväriin, kuivat silmät, luomitulehdus, äskettäinen silmäleikkaus, piilolinssit, käytössä olevat lääkkeet (osa voi kuivattaa silmiä)."
      ),
      l3(
        "Khách mang thai: là lý do để hỏi kỹ hơn, làm theo hướng dẫn của hãng keo và lời khuyên tại nơi bạn làm việc. Không tự đưa ra lời khuyên y khoa.",
        "A pregnant client: a reason to ask more carefully and to follow the glue maker's instructions and local advice. Do not give medical advice yourself.",
        "Raskaana oleva asiakas: syy kysyä tarkemmin ja noudattaa liimavalmistajan ohjeita ja paikallisia suosituksia. Älä anna itse lääketieteellisiä neuvoja."
      ),
      l3(
        "Rồi mới hỏi chuyện đẹp: kiểu mi khách muốn, công việc, thói quen (bơi, xông hơi, dụi mắt, ngủ úp mặt), và nói thật mi thật chịu được đến đâu.",
        "Then ask about the look: the style the client wants, their work and habits (swimming, sauna, rubbing the eyes, sleeping face down), and say honestly what their natural lashes can carry.",
        "Kysy sitten ulkonäöstä: toivottu tyyli, työ ja tavat (uinti, sauna, silmien hieronta, vatsallaan nukkuminen), ja kerro rehellisesti, mitä omat ripset kestävät."
      ),
      l3(
        "Nhìn mắt dưới ánh sáng tốt. Mắt đỏ, chảy nước, lẹo, bờ mi sưng hay đóng vảy, mới mổ mắt: hôm nay chưa làm (xem bài “Khi nào không làm cho khách”).",
        "Look at the eyes in good light. Red or watery eyes, a stye, swollen or crusted lid margins, recent eye surgery: not today (see “When not to treat a customer”).",
        "Katso silmiä hyvässä valossa. Punaiset tai vetistävät silmät, näärännäppy, turvonneet tai karstaiset luomenreunat, äskettäinen silmäleikkaus: ei tänään (katso ”Milloin asiakasta ei hoideta”)."
      ),
      l3(
        "Keo nối mi là cyanoacrylate, khô nhờ hơi ẩm và bay hơi khi khô: mắt khách nhắm kín suốt buổi. Dị ứng với keo có thể hình thành dần, sau nhiều lần làm không sao, ở cả khách lẫn thợ (xem bài “Dị ứng và hoá chất”).",
        "Lash glue is cyanoacrylate: it cures with moisture and gives off vapour while curing, so the client's eyes stay closed throughout. An allergy to the glue can build up over time, after many trouble-free sets, in clients and technicians alike (see “Allergies and chemicals”).",
        "Ripsiliima on syanoakrylaattia: se kovettuu kosteuden avulla ja höyrystyy kovettuessaan, joten asiakkaan silmät ovat kiinni koko ajan. Liima-allergia voi kehittyä vähitellen monen ongelmattoman kerran jälkeen sekä asiakkaille että tekijöille (katso ”Allergiat ja kemikaalit”)."
      ),
      l3(
        "Thử keo trước lần nối đầu tiên: nhiều hãng keo và nhiều tiệm khuyên làm thường từ 24 đến 48 giờ trước, theo đúng cách hãng hướng dẫn (vài sợi mi ở đuôi mắt, hoặc một chút keo gần chân mi). Thử keo không phải là bảo đảm, nên lần nào cũng hỏi lại.",
        "Test before the first set: many glue makers and studios advise doing it, often 24 to 48 hours before, exactly as the glue maker describes (a few lashes at the outer corner, or a little glue near the lash line). A test is no guarantee, so ask again at every visit.",
        "Testi ennen ensimmäistä settiä: monet liimavalmistajat ja liikkeet suosittelevat sitä usein 24–48 tuntia etukäteen tarkalleen valmistajan ohjeen mukaan (muutama ripsi ulkonurkkaan tai hieman liimaa ripsirajan lähelle). Testi ei ole tae, joten kysy uudelleen joka käynnillä."
      ),
      l3(
        "Khách báo đỏ, ngứa, sưng sau khi thử: không nối, khuyên khách hỏi bác sĩ, ghi lại. Đừng đổi sang keo khác rồi làm luôn.",
        "If the client reports redness, itching or swelling after the test: no set, advise them to ask a doctor, and record it. Don't switch to another glue and go ahead.",
        "Jos asiakas kertoo punoituksesta, kutinasta tai turvotuksesta testin jälkeen: ei pidennyksiä, neuvo kysymään lääkäriltä ja kirjaa asia. Älä vaihda toiseen liimaan ja jatka."
      ),
      l3(
        "Phòng giữ trong khoảng độ ẩm và nhiệt độ hãng keo ghi, thoáng khí, chai keo đậy nắp ngay. Giường, khăn và miếng lót đầu sạch cho từng khách; đồ dùng một lần; nhíp làm sạch và khử khuẩn sau mỗi khách.",
        "Keep the room within the humidity and temperature range the glue maker gives, well ventilated, with the glue bottle closed straight away. A clean bed, linen and headrest cover for every client; single-use items; tweezers cleaned and disinfected after every client.",
        "Pidä huone liimavalmistajan ilmoittamassa kosteus- ja lämpötilavälissä, hyvin tuuletettuna ja liimapullo heti suljettuna. Puhdas sänky, liinat ja niskatuen suoja jokaiselle asiakkaalle; kertakäyttötarvikkeet; pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen."
      ),
      l3(
        "Ghi lại câu trả lời, ngày thử keo, kết quả, loại keo, độ dài và độ cong. Đây là thông tin sức khoẻ: chỉ ghi khi khách đồng ý, và giữ kín.",
        "Record the answers, the test date and result, the glue used, lengths and curls. This is health information: record it only with the client's consent, and keep it confidential.",
        "Kirjaa vastaukset, testin päivämäärä ja tulos, käytetty liima, pituudet ja taivutukset. Kyse on terveystiedoista: kirjaa vain asiakkaan suostumuksella ja pidä tiedot luottamuksellisina."
      ),
    ],
    tips: [
      l3(
        "Ghi tư vấn và ngày thử keo vào “Ghi chú nội bộ” trong hồ sơ khách ở VaraaAi (chỉ salon thấy), để lần sau thợ nào làm cũng biết ngay.",
        "Save the consultation and the test date in the client's internal notes in VaraaAi (visible to the salon only), so whoever does the next appointment knows straight away.",
        "Tallenna konsultaatio ja testipäivä asiakkaan sisäisiin muistiinpanoihin VaraaAi:ssa (näkyvät vain salongille), jotta seuraavan käynnin tekijä tietää heti."
      ),
      l3(
        "Mỗi lần khách quay lại, hỏi một câu: “Lần trước làm xong, mắt chị có sao không?”",
        "Every time a client comes back, ask one question: “Were your eyes all right after last time?”",
        "Aina kun asiakas palaa, kysy yksi kysymys: ”Oliko silmien kanssa kaikki hyvin viime kerran jälkeen?”"
      ),
    ],
    quiz: [
      {
        q: l3("Khách thử keo không bị phản ứng. Điều đó có nghĩa là gì?", "A client had no reaction to the test. What does that mean?", "Asiakas ei reagoinut testiin. Mitä se tarkoittaa?"),
        options: [
          l3("Khách sẽ không bao giờ bị dị ứng với keo", "The client will never be allergic to the glue", "Asiakas ei koskaan tule allergiseksi liimalle"),
          l3("Không thấy phản ứng lúc này, nhưng dị ứng vẫn có thể đến sau, nên lần nào cũng hỏi lại", "No reaction now, but an allergy can still develop later, so ask again every time", "Reaktiota ei nyt ole, mutta allergia voi silti kehittyä myöhemmin, joten kysy joka kerta"),
          l3("Không cần tư vấn ở những lần sau", "No consultation is needed at later visits", "Myöhemmillä käynneillä konsultaatiota ei tarvita"),
        ],
        answer: 1,
        why: l3(
          "Dị ứng với keo có thể hình thành dần sau nhiều lần tiếp xúc; thử keo chỉ giúp phát hiện sớm những khách đã nhạy cảm sẵn.",
          "A glue allergy can build up after repeated exposure; the test only helps to spot clients who are already sensitive.",
          "Liima-allergia voi kehittyä toistuvan altistuksen jälkeen; testi auttaa vain löytämään jo herkistyneet asiakkaat."
        ),
      },
      {
        q: l3("Khách báo mí mắt đỏ và ngứa sau khi thử keo. Bạn làm gì?", "The client reports a red, itchy eyelid after the test. What do you do?", "Asiakas kertoo luomen punoittavan ja kutiavan testin jälkeen. Mitä teet?"),
        options: [
          l3("Đổi sang một loại keo khác và nối luôn", "Switch to another glue and do the set", "Vaihdan toiseen liimaan ja teen pidennykset"),
          l3("Nối như dự định, vì khách đã đặt lịch", "Do the set as planned because it is booked", "Teen pidennykset suunnitellusti, koska aika on varattu"),
          l3("Không nối, khuyên khách hỏi bác sĩ và ghi lại kết quả", "No set: advise the client to ask a doctor and record the result", "En tee pidennyksiä: neuvon kysymään lääkäriltä ja kirjaan tuloksen"),
        ],
        answer: 2,
        why: l3(
          "Mình không biết khách phản ứng với chất nào, và lần sau có thể nặng hơn. Ghi lại để không ai trong tiệm vô tình làm.",
          "You don't know which ingredient caused it, and the next reaction could be worse. Record it so nobody in the salon does it by mistake.",
          "Et tiedä, mikä aine reaktion aiheutti, ja seuraava voi olla pahempi. Kirjaa se, jottei kukaan liikkeessä tee pidennyksiä vahingossa."
        ),
      },
      {
        q: l3("Vì sao mắt khách phải nhắm kín suốt buổi nối mi?", "Why must the client's eyes stay closed throughout the treatment?", "Miksi asiakkaan silmien on oltava kiinni koko hoidon ajan?"),
        options: [
          l3("Vì keo bay hơi khi khô, hơi keo làm cay và kích ứng mắt", "Because the glue gives off vapour as it cures, which stings and irritates the eyes", "Koska liima höyrystyy kovettuessaan ja höyry kirvelee ja ärsyttää silmiä"),
          l3("Để khách ngủ được", "So the client can sleep", "Jotta asiakas voi nukkua"),
          l3("Chỉ để thợ dễ nhìn hơn", "Only so the technician can see better", "Vain jotta tekijä näkee paremmin"),
        ],
        answer: 0,
        why: l3(
          "Keo cyanoacrylate khô nhờ hơi ẩm và bay hơi; mở mắt là hơi keo vào mắt.",
          "Cyanoacrylate cures with moisture and gives off vapour; open eyes take that vapour in.",
          "Syanoakrylaatti kovettuu kosteuden avulla ja höyrystyy; avoimiin silmiin höyry pääsee suoraan."
        ),
      },
    ],
  },
  {
    slug: "mi-chuan-bi",
    course: "p-lash",
    style: "practice",
    title: l3("Chuẩn bị nối mi: thực hành từng bước", "Lash preparation: step by step", "Ripsienpidennysten valmistelu: vaihe vaiheelta"),
    summary: l3(
      "Phần chuẩn bị trước sợi mi đầu tiên, từng bước: đón khách và phiếu tư vấn, nhìn mắt dưới ánh sáng tốt, thử keo cho khách lần đầu và ghi ngày thử, chuẩn bị giường, đèn và vệ sinh, tháo kính áp tròng và tẩy trang không dầu, rửa mi, xả và làm khô, dán miếng lót che kín mi dưới mà không chạm viền mắt, băng dính khi cần, primer theo hãng keo, chải mi và khay dụng cụ sẵn sàng.",
      "Everything before the first lash, step by step: welcome and consultation form, the eyes checked in good light, the test for first-time clients and its date recorded, bed, light and hygiene, contact lenses out and oil-free make-up removal, lash cleansing, rinsing and drying, pads covering every lower lash without touching the waterline, tape when needed, primer as the glue maker says, brushing, and the tray ready.",
      "Kaikki ennen ensimmäistä ripseä vaihe vaiheelta: vastaanotto ja konsultaatiolomake, silmien tarkistus hyvässä valossa, testi ensikertalaisille ja sen päivämäärän kirjaus, sänky, valo ja hygienia, piilolinssit pois ja öljytön meikinpoisto, ripsien pesu, huuhtelu ja kuivaus, silmänalustyynyt kaikkien alaripsien päälle koskematta limakalvoreunaan, teippi tarvittaessa, primer liimavalmistajan ohjeen mukaan, harjaus ja valmis työtarjotin."
    ),
    video: video("mi-chuan-bi", 278, "2026-11-17"),
    notice: l3(
      "Cách thử keo, thời gian chờ, primer, độ ẩm và nhiệt độ phòng: luôn theo hướng dẫn của hãng keo. Thử keo không bảo đảm khách sẽ không phản ứng về sau. Miếng lót và băng dính không bao giờ chạm vào con mắt. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "How to do the test, waiting times, primer, room humidity and temperature: always as the glue maker says. A test does not guarantee that the client will not react later. Pads and tape never touch the eye itself. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Testin tapa, odotusajat, primer sekä huoneen kosteus ja lämpötila: aina liimavalmistajan ohjeiden mukaan. Testi ei takaa, ettei asiakas reagoi myöhemmin. Tyynyt ja teippi eivät koskaan kosketa itse silmää. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Đón khách, rửa tay, tư vấn khi khách còn mở mắt bằng phiếu giấy hay máy tính bảng: dị ứng, phản ứng cũ với keo hay thuốc nhuộm, bệnh mắt, mổ mắt, kính áp tròng, thuốc đang dùng, mang thai, kiểu mi mong muốn. Khách đọc lại và đồng ý.",
        "Welcome the client, wash your hands and consult while their eyes are open, on paper or a tablet: allergies, earlier reactions to glue or tint, eye conditions, eye surgery, contact lenses, current medicines, pregnancy, the look they want. The client reads it back and agrees.",
        "Ota asiakas vastaan, pese kädet ja konsultoi silmien ollessa auki paperilla tai tabletilla: allergiat, aiemmat reaktiot liimaan tai väriin, silmäsairaudet, silmäleikkaukset, piilolinssit, lääkkeet, raskaus ja toivottu tyyli. Asiakas lukee vastaukset ja hyväksyy ne."
      ),
      l3(
        "Dặn khách trước: buổi làm kéo dài, mắt nhắm suốt; thấy cay, cộm hay muốn nghỉ thì giơ tay, đừng mở mắt.",
        "Tell the client beforehand: the appointment takes a while with the eyes closed throughout; if it stings, feels scratchy or they need a break, raise a hand, don't open the eyes.",
        "Kerro asiakkaalle etukäteen: hoito kestää ja silmät ovat kiinni koko ajan; jos kirvelee, hiertää tai tarvitaan tauko, nosta käsi, älä avaa silmiä."
      ),
      l3(
        "Nhìn mắt dưới ánh sáng tốt: đỏ, chảy nước, lẹo, bờ mi sưng hay đóng vảy là dừng lại. Nhìn luôn mi thật: dày hay thưa, khoẻ hay yếu, có chỗ gãy hay rụng thành mảng không.",
        "Check the eyes in good light: redness, watering, a stye, swollen or crusted lid margins mean stop. Look at the natural lashes too: dense or sparse, strong or weak, any broken lashes or patchy loss.",
        "Tarkista silmät hyvässä valossa: punoitus, vetistys, näärännäppy tai turvonneet tai karstaiset luomenreunat tarkoittavat seis. Katso myös luomuripset: tiheät vai harvat, vahvat vai heikot, katkenneita tai laikuittaista lähtöä."
      ),
      l3(
        "Khách lần đầu: thử keo theo hướng dẫn của hãng keo, thường 24 đến 48 giờ trước (vài sợi ở đuôi mắt bằng đúng keo sẽ dùng, hoặc một chút keo gần chân mi). Dặn khách theo dõi và báo lại. Ghi ngày thử, loại keo và kết quả; khách đã thử từ trước thì xem hồ sơ và hỏi lại.",
        "First-time clients: test as the glue maker describes, often 24 to 48 hours before (a few lashes at the outer corner with the same glue you will use, or a little glue near the lash line). Ask the client to watch for a reaction and report back. Record the date, the glue and the result; if the client was tested earlier, check the record and ask again.",
        "Ensikertalaiset: testi liimavalmistajan ohjeen mukaan, usein 24–48 tuntia etukäteen (muutama ripsi ulkonurkkaan samalla liimalla, jota käytät, tai hieman liimaa ripsirajan lähelle). Pyydä asiakasta seuraamaan reaktioita ja kertomaan niistä. Kirjaa päivämäärä, liima ja tulos; jos testi on tehty aiemmin, tarkista kirjaus ja kysy uudelleen."
      ),
      l3(
        "Giường lau bằng khăn khử khuẩn, khăn trải và miếng lót đầu mới, gối đỡ cổ, đèn sáng đều không chói vào mặt khách. Rửa tay rồi đeo găng mới.",
        "Wipe the bed with a disinfectant wipe, fresh linen and headrest cover, neck support, even light that does not glare in the client's face. Wash your hands, then put on fresh gloves.",
        "Pyyhi sänky desinfiointiliinalla, vaihda puhtaat liinat ja niskatuen suoja, niskatuki, tasainen valo, joka ei häikäise asiakkaan kasvoja. Pese kädet ja laita uudet käsineet."
      ),
      l3(
        "Khách tháo kính áp tròng. Tẩy sạch phấn mắt, mascara và kem dưỡng bằng nước tẩy trang không dầu: dầu còn sót lại làm keo bám kém.",
        "The client takes out contact lenses. Remove eye make-up, mascara and creams with an oil-free cleanser: leftover oil weakens the bond.",
        "Asiakas poistaa piilolinssit. Poista silmämeikki, ripsiväri ja voiteet öljyttömällä puhdistusaineella: jäljelle jäänyt öljy heikentää kiinnittymistä."
      ),
      l3(
        "Rửa mi bằng dung dịch rửa mi và cọ mềm từ chân ra ngọn, xả nước sạch có khăn giấy đỡ ở đuôi mắt, làm khô hoàn toàn bằng quạt nhỏ để cách mặt.",
        "Cleanse the lashes with lash shampoo and a soft brush from root to tip, rinse with clean water with a tissue at the outer corner, and dry completely with a small fan held away from the face.",
        "Pese ripset ripsishampoolla ja pehmeällä harjalla tyvestä kärkeen, huuhtele puhtaalla vedellä paperi ulkonurkassa ja kuivaa täysin pienellä tuulettimella kasvoista etäällä."
      ),
      l3(
        "Miếng lót che kín toàn bộ mi dưới, mép trên sát dưới hàng mi dưới nhưng không chạm viền mắt. Nhờ khách hé mắt nhìn lên khi dán, rồi nhắm lại; hỏi có cộm không và chỉnh ngay. Kiểm tra đuôi mắt: không sợi mi dưới nào lọt ra.",
        "Pads cover every lower lash, the top edge just under the lower lash line but never touching the waterline. Ask the client to look up slightly while you place them, then close; ask if anything feels scratchy and adjust at once. Check the outer corner: no lower lash pokes out.",
        "Tyynyt peittävät kaikki alaripset, yläreuna heti alaripsirajan alla mutta koskematta limakalvoreunaan. Pyydä asiakasta katsomaan hieman ylös asettamisen ajan ja sitten sulkemaan silmät; kysy hiertääkö ja korjaa heti. Tarkista ulkonurkka: yksikään alaripsi ei pilkistä esiin."
      ),
      l3(
        "Băng dính giấy chuyên dụng khi cần: giữ sợi mi dưới lọt ra (chỉ trên miếng lót và da má), hoặc nâng nhẹ da mí với mắt mí sụp. Không bao giờ dán lên con mắt; hỏi khách có thấy căng không.",
        "Medical paper tape when needed: to hold down stray lower lashes (only on the pad and cheek), or to lift the lid skin gently on hooded eyes. Never on the eye itself; ask the client if it feels tight.",
        "Lääkinnällistä paperiteippiä tarvittaessa: pitämään irralliset alaripset alhaalla (vain tyynyn ja posken päällä) tai nostamaan luomen ihoa kevyesti, jos luomi on raskas. Ei koskaan itse silmään; kysy, kiristääkö."
      ),
      l3(
        "Chải mi, primer nếu hãng keo khuyên (cọ nhỏ dùng một lần, trên thân và ngọn mi, tránh chân mi và da mí), chải lại. Khay sẵn sàng: vỉ mi theo bản đồ, giọt keo mới, nhíp đã khử khuẩn, đồ dùng một lần, chai keo đậy nắp. Rồi tiếp tục như bài thực hành classic.",
        "Brush the lashes, apply primer if the glue maker recommends it (single-use micro-brush, on the body and tips, away from the roots and lid skin), brush again. Tray ready: strips in map order, a fresh glue drop, disinfected tweezers, single-use items, glue bottle closed. Then continue as in the classic practice lesson.",
        "Harjaa ripset, primer jos liimavalmistaja suosittelee (kertakäyttöinen mikroharja, ripsen keskiosaan ja kärkiin, ei tyveen eikä luomen iholle), harjaa uudelleen. Tarjotin valmiina: nauhat kartan järjestyksessä, tuore liimapisara, desinfioidut pinsetit, kertakäyttötarvikkeet, liimapullo kiinni. Jatka sitten kuten klassisten käytäntötunnilla."
      ),
    ],
    tips: [
      l3(
        "Lỗi hay gặp nhất: miếng lót thấp hoặc lệch để mi dưới lọt ra ở đuôi mắt — mi dưới bị dính lên mi trên, khách mở mắt là bị kéo.",
        "The most common mistake: a pad placed too low or crooked so lower lashes poke out at the outer corner — they get glued to the upper lashes and pull when the client opens their eyes.",
        "Yleisin virhe: liian alas tai vinoon asetettu tyyny, jolloin alaripset pilkistävät ulkonurkassa — ne liimautuvat yläripsiin ja nykivät, kun asiakas avaa silmät."
      ),
      l3(
        "Lưu ngày thử keo, loại keo và kết quả vào “Ghi chú nội bộ” trong hồ sơ khách ở VaraaAi (chỉ salon thấy, ghi khi khách đồng ý).",
        "Save the test date, glue and result in the client's internal notes in VaraaAi (visible to the salon only, recorded with the client's consent).",
        "Tallenna testipäivä, liima ja tulos asiakkaan sisäisiin muistiinpanoihin VaraaAi:ssa (näkyvät vain salongille, kirjataan asiakkaan suostumuksella)."
      ),
    ],
    quiz: [
      {
        q: l3("Mép trên của miếng lót dưới mắt nên nằm ở đâu?", "Where should the top edge of the under-eye pad sit?", "Missä silmänalustyynyn yläreunan pitäisi olla?"),
        options: [
          l3("Sát dưới hàng mi dưới, che kín mi dưới, nhưng không chạm viền mắt", "Just under the lower lash line, covering every lower lash, without touching the waterline", "Heti alaripsirajan alla, kaikki alaripset peittäen, koskematta limakalvoreunaan"),
          l3("Đè lên viền mắt cho chắc", "Pressed onto the waterline so it holds", "Painettuna limakalvoreunaan, jotta pysyy"),
          l3("Thấp xuống giữa má cho khách dễ chịu", "Low down on the cheek for comfort", "Alas poskelle mukavuuden vuoksi"),
        ],
        answer: 0,
        why: l3(
          "Chạm viền mắt gây cộm, cay và đỏ mắt; dán thấp quá thì mi dưới lọt ra và bị dính lên mi trên.",
          "Touching the waterline causes scratching, stinging and red eyes; too low and the lower lashes escape and get glued to the upper ones.",
          "Limakalvoreunan kosketus aiheuttaa hiertämistä, kirvelyä ja punoitusta; liian alhaalla alaripset jäävät esiin ja liimautuvat yläripsiin."
        ),
      },
      {
        q: l3("Vì sao khách phải tháo kính áp tròng và tẩy trang không dầu trước khi nối?", "Why must the client remove contact lenses and use an oil-free make-up remover first?", "Miksi asiakkaan on poistettava piilolinssit ja käytettävä öljytöntä meikinpoistoa ensin?"),
        options: [
          l3("Chỉ để ảnh chụp đẹp hơn", "Only so the photos look better", "Vain jotta kuvat näyttävät paremmilta"),
          l3("Hơi keo và dung dịch có thể đọng dưới kính, và dầu còn sót làm keo bám kém", "Glue vapour and liquids can collect under the lens, and leftover oil weakens the bond", "Liimahöyry ja nesteet voivat kertyä linssin alle, ja jäljelle jäävä öljy heikentää kiinnittymistä"),
          l3("Vì dầu giúp keo khô nhanh hơn", "Because oil makes the glue cure faster", "Koska öljy nopeuttaa liiman kovettumista"),
        ],
        answer: 1,
        why: l3(
          "Mi phải sạch dầu và khô hoàn toàn thì keo mới bám tốt; kính áp tròng thì tháo ra trước để bảo vệ mắt.",
          "The lashes must be oil-free and completely dry for a good bond; contact lenses come out first to protect the eyes.",
          "Ripsien on oltava öljyttömät ja täysin kuivat, jotta liima tarttuu; piilolinssit poistetaan ensin silmien suojaamiseksi."
        ),
      },
      {
        q: l3("Khách lần đầu đặt lịch nối mi. Thử keo làm thế nào là đúng?", "A first-time client books a lash set. How is the test done correctly?", "Ensikertalainen varaa ripsienpidennykset. Miten testi tehdään oikein?"),
        options: [
          l3("Không cần thử nếu khách nói không bị dị ứng", "No test needed if the client says they have no allergies", "Testiä ei tarvita, jos asiakas sanoo, ettei ole allergioita"),
          l3("Thử bằng một loại keo bất kỳ ngay trước khi nối", "Test with any glue right before the set", "Testataan millä tahansa liimalla juuri ennen pidennyksiä"),
          l3("Theo hướng dẫn của hãng keo, thường 24–48 giờ trước, bằng đúng keo sẽ dùng, rồi ghi ngày và kết quả", "As the glue maker describes, often 24–48 hours before, with the glue you will use, then record the date and result", "Liimavalmistajan ohjeen mukaan, usein 24–48 tuntia etukäteen, samalla liimalla jota käytät, ja kirjataan päivämäärä ja tulos"),
        ],
        answer: 2,
        why: l3(
          "Thử bằng đúng keo sẽ dùng, đủ thời gian để phản ứng kịp xuất hiện, và ghi lại để cả tiệm biết.",
          "Test with the glue you will actually use, allow time for a reaction to show, and record it so the whole salon knows.",
          "Testaa samalla liimalla, jota todella käytät, anna aikaa reaktion ilmaantumiseen ja kirjaa tulos koko liikkeen tietoon."
        ),
      },
    ],
  },
  {
    slug: "mi-classic-hieu-dung",
    course: "p-lash",
    style: "theory",
    title: l3("Nối mi classic: hiểu đúng để mi đẹp và mi thật khoẻ", "Classic lashes: understand them for beautiful lashes and healthy natural lashes", "Klassiset ripsienpidennykset: ymmärrä, niin ripset ovat kauniit ja omat ripset terveet"),
    summary: l3(
      "Vòng đời của sợi mi thật và vì sao mi nối rụng theo, nguyên tắc một sợi nối cho một sợi mi và vì sao dính chùm làm hại mi, chọn độ dài, độ dày, độ cong vừa sức mi thật, gắn cách da mí, keo nối mi và độ ẩm, tư vấn, dặn dò, và nói thật với khách classic trông như thế nào.",
      "The growth cycle of the natural lash and why extensions shed with it, one extension per natural lash and why stickies harm the lashes, choosing length, thickness and curl the natural lash can carry, placement away from the lid, lash adhesive and humidity, consultation, aftercare, and an honest talk about what classic looks like.",
      "Luonnollisen ripsen kasvusykli ja miksi pidennys irtoaa sen mukana, yksi pidennys yhteen omaan ripseen ja miksi yhteen liimautuneet ripset vahingoittavat, pituus, paksuus ja taivutus oman ripsen kantokyvyn mukaan, kiinnitys irti luomesta, ripsiliima ja kosteus, konsultaatio, jälkihoito sekä rehellinen puhe siitä, miltä klassiset ripset näyttävät."
    ),
    video: video("mi-classic-hieu-dung", 317, "2026-11-17"),
    notice: l3(
      "Thời gian giữ khô, độ ẩm và nhiệt độ phòng luôn theo hướng dẫn của hãng keo. Mắt đỏ, ngứa, sưng, có lẹo, mới mổ mắt hay khách từng phản ứng với keo thì không làm. Bài này là tài liệu đào tạo, không thay cho chứng chỉ nghề; quy định khác nhau theo từng nước.",
      "Keep-dry times, room humidity and temperature always follow the adhesive maker's instructions. Do not work on red, itchy or swollen eyes, a stye, after recent eye surgery, or on a customer who has reacted to lash glue. This lesson is a training aid, not a qualification; rules differ by country.",
      "Kastelukielto, huoneen kosteus ja lämpötila noudattavat aina liiman valmistajan ohjeita. Älä tee ripsiä punoittaviin, kutiaviin tai turvonneisiin silmiin, näärännäpyn kanssa, tuoreen silmäleikkauksen jälkeen tai asiakkaalle, joka on reagoinut ripsiliimaan. Tämä tunti on koulutusmateriaalia eikä korvaa ammattitutkintoa; määräykset vaihtelevat maittain."
    ),
    related: ["dich-vu", "lich-hen", "khach-hang"],
    steps: [
      l3(
        "Mi thật có vòng đời ba giai đoạn: mọc (thường khoảng một tháng đến sáu tuần), chuyển tiếp (vài tuần) và nghỉ (vài tháng), rồi rụng và sợi mới mọc thay. Con số khác nhau theo từng người; trên một mí lúc nào cũng có sợi đang mọc, đang nghỉ và sắp rụng.",
        "The natural lash has a three-phase cycle: growth (usually about a month to six weeks), transition (a few weeks) and rest (several months), then it sheds and a new lash grows in. The figures vary from person to person; on every lid some lashes are growing, some resting and some about to shed.",
        "Luonnollisella ripsellä on kolmivaiheinen kasvusykli: kasvu (yleensä noin kuukaudesta kuuteen viikkoon), siirtymä (muutama viikko) ja lepo (useita kuukausia), minkä jälkeen ripsi irtoaa ja tilalle kasvaa uusi. Luvut vaihtelevat yksilöllisesti; jokaisessa luomessa osa ripsistä kasvaa, osa lepää ja osa on irtoamassa."
      ),
      l3(
        "Mỗi ngày rụng vài sợi mi là bình thường, và sợi nối rụng theo sợi mi thật. Sợi rụng tự nhiên có chân nhỏ màu nhạt ở gốc. Vì vậy khách cần dặm mi, thường sau 2–3 tuần.",
        "Losing a few lashes a day is normal, and the extension sheds with its natural lash. A naturally shed lash has a small pale bulb at its root. That is why customers need refills, usually every 2–3 weeks.",
        "Muutaman ripsen irtoaminen päivässä on normaalia, ja pidennys irtoaa oman ripsen mukana. Luonnollisesti irronneen ripsen tyvessä on pieni vaalea juuri. Siksi asiakas tarvitsee huollon, yleensä 2–3 viikon välein."
      ),
      l3(
        "Sợi mi non, rất ngắn và mảnh, chưa đỡ được sợi nối dài và dày: để lại cho lần dặm sau hoặc chọn sợi thật ngắn, thật nhẹ.",
        "Young lashes, very short and fine, cannot carry a long, thick extension: leave them for the next refill or choose a very short, light one.",
        "Nuori, hyvin lyhyt ja ohut ripsi ei kanna pitkää ja paksua pidennystä: jätä se seuraavaan huoltoon tai valitse hyvin lyhyt ja kevyt pidennys."
      ),
      l3(
        "Nguyên tắc của classic: một sợi nối cho một sợi mi thật, tách riêng từng sợi. Hai sợi mi dính vào nhau (dính chùm) mọc và rụng theo hai lịch khác nhau, nên bị kéo căng: khách thấy cộm và mi thật có thể bị kéo rụng sớm.",
        "The classic rule: one extension on one natural lash, every lash isolated. Two lashes glued together (a sticky) grow and shed on different schedules, so they pull on each other: the customer feels it and the natural lash can be pulled out early.",
        "Klassisten ripsien sääntö: yksi pidennys yhteen omaan ripseen, jokainen ripsi erotettuna. Yhteen liimautuneet ripset kasvavat ja irtoavat eri tahtiin, joten ne kiristävät toisiaan: asiakas tuntee sen ja oma ripsi voi irrota ennenaikaisesti."
      ),
      l3(
        "Chọn sợi nối vừa sức mi thật: không dài hơn quá nhiều, không dày hơn, không nặng hơn sức nó chịu được. Mi thật mảnh và ngắn thì chọn sợi mảnh và ngắn hơn; độ cong theo dáng mắt và hướng mọc của mi.",
        "Choose an extension the natural lash can carry: not much longer, not thicker and not heavier than it can bear. Fine, short natural lashes need finer, shorter extensions; the curl follows the eye shape and the direction the lashes grow.",
        "Valitse pidennys, jonka oma ripsi jaksaa kantaa: ei paljon pidempi, ei paksumpi eikä painavampi kuin se kestää. Ohuille ja lyhyille ripsille ohuempi ja lyhyempi pidennys; taivutus silmän muodon ja ripsien kasvusuunnan mukaan."
      ),
      l3(
        "Gắn dọc theo sợi mi thật, chân sợi nối cách da mí khoảng 0,5–1 mm, không bao giờ chạm da. Sát quá: cộm, ngứa, kích ứng và kéo mi khi mọc; xa quá: lỏng và rụng sớm.",
        "Attach along the natural lash, the base of the extension about 0.5–1 mm from the eyelid skin, never touching it. Too close: discomfort, itching, irritation and pulling as the lash grows; too far: loose and early shedding.",
        "Kiinnitä oman ripsen suuntaisesti, pidennyksen tyvi noin 0,5–1 mm:n päähän luomen ihosta, ei koskaan ihoon. Liian lähellä: hankausta, kutinaa, ärsytystä ja vetoa ripsen kasvaessa; liian kaukana: löysä ja irtoaa aikaisin."
      ),
      l3(
        "Keo nối mi là cyanoacrylate, khô nhờ hơi ẩm trong không khí. Giữ phòng trong khoảng độ ẩm và nhiệt độ hãng keo ghi: quá khô thì keo khô chậm, bay hơi nhiều; quá ẩm thì khô quá nhanh, mối dính giòn.",
        "Lash adhesive is cyanoacrylate and cures with moisture in the air. Keep the room within the humidity and temperature range the adhesive maker gives: too dry and it cures slowly with more fumes; too humid and it cures too fast into a brittle bond.",
        "Ripsiliima on syanoakrylaattia, joka kovettuu ilman kosteudesta. Pidä huone liiman valmistajan ilmoittamalla kosteus- ja lämpötila-alueella: liian kuiva ilma hidastaa kovettumista ja lisää höyryjä, liian kostea nopeuttaa sitä ja sidos haurastuu."
      ),
      l3(
        "Giọt keo nhỏ, đậy nắp chai ngay, thay giọt mới thường xuyên, chỉ nhúng phần chân sợi nối. Hơi keo làm cay mắt và có thể gây dị ứng: mắt khách nhắm kín suốt buổi (xem bài Dị ứng và hoá chất).",
        "A small drop, the bottle closed straight away, a fresh drop often, and only the base of the extension dipped. Adhesive vapour stings and can sensitise: the customer's eyes stay closed the whole time (see the lesson on allergies and chemicals).",
        "Pieni tippa, pullo heti kiinni, uusi tippa usein ja vain pidennyksen tyvi liimaan. Liimahöyry kirvelee ja voi herkistää: asiakkaan silmät pysyvät kiinni koko ajan (katso tunti allergioista ja kemikaaleista)."
      ),
      l3(
        "Tư vấn kỹ: kiểu khách muốn, kính áp tròng, bơi, xông hơi, dụi mắt, ngủ úp mặt. Dặn trước: giữ khô theo thời gian hãng keo khuyên, không dùng sản phẩm có dầu ở chân mi, chải mi mỗi ngày, không dụi, không tự nhổ.",
        "Consult properly: the look the customer wants, contact lenses, swimming, sauna, eye rubbing, sleeping face down. Tell them up front: keep dry for the time the adhesive maker advises, no oil-based products at the lash base, brush daily, no rubbing, no picking.",
        "Konsultoi huolellisesti: toivottu tyyli, piilolinssit, uinti, sauna, silmien hierominen, vatsallaan nukkuminen. Kerro etukäteen: pidä kuivana liiman valmistajan ohjeen ajan, ei öljypohjaisia tuotteita ripsien tyveen, kampaa päivittäin, älä hiero äläkä nypi."
      ),
      l3(
        "Nói thật: classic cho vẻ tự nhiên như chải mascara; mi thật thưa thì classic vẫn thưa, chỉ dài và đen hơn. Muốn dày và đậm là volume hay hybrid. Đừng gắn sợi quá dày, quá dài để khách vui — người trả giá là mi thật của khách.",
        "Be honest: classic gives a natural, mascara-like look; sparse natural lashes stay sparse, only longer and darker. Fuller and darker means volume or hybrid. Never put on extensions that are too thick or too long to please a customer — their natural lashes pay the price.",
        "Ole rehellinen: klassiset ripset antavat luonnollisen, ripsivärimäisen ilmeen; harvat omat ripset pysyvät harvoina, vain pidempinä ja tummempina. Tuuheampi ja tummempi ilme tarkoittaa volyymi- tai hybridiripsiä. Älä laita liian paksuja tai pitkiä pidennyksiä asiakkaan mieliksi — hinnan maksavat hänen omat ripsensä."
      ),
    ],
    tips: [
      l3(
        "Ghi vào sổ khách hàng độ dài, độ dày, độ cong và hãng keo đã dùng cho từng khách: lần dặm sau làm nhanh và đều hơn.",
        "Note the lengths, thickness, curl and adhesive you used in each customer's record: the next refill is quicker and more consistent.",
        "Merkitse asiakaskorttiin käytetyt pituudet, paksuus, taivutus ja liima: seuraava huolto on nopeampi ja tasaisempi."
      ),
      l3(
        "Khi đặt lịch, chọn thời lượng đủ cho một bộ classic đầy đủ (thường 1,5–2 giờ) để không phải làm vội.",
        "When booking, allow enough time for a full classic set (often 1.5–2 hours) so you never have to rush.",
        "Varaa täydelle klassiselle setille riittävästi aikaa (usein 1,5–2 tuntia), ettei työtä tarvitse kiirehtiä."
      ),
    ],
    quiz: [
      {
        q: l3("Vì sao khách cần dặm mi sau khoảng 2–3 tuần?", "Why does a customer need a refill after about 2–3 weeks?", "Miksi asiakas tarvitsee huollon noin 2–3 viikon kuluttua?"),
        options: [
          l3("Vì keo hết hạn sau hai tuần", "Because the glue expires after two weeks", "Koska liima vanhenee kahdessa viikossa"),
          l3("Vì mi thật rụng tự nhiên theo vòng đời và sợi nối rụng theo", "Because natural lashes shed in their cycle and the extensions shed with them", "Koska omat ripset irtoavat kasvusyklinsä mukaan ja pidennykset niiden mukana"),
          l3("Vì sợi nối tự mọc dài ra", "Because the extensions grow longer", "Koska pidennykset kasvavat pidemmiksi"),
        ],
        answer: 1,
        why: l3(
          "Mỗi ngày đều có sợi mi đến hạn rụng; sợi nối gắn trên nó rụng theo, nên hàng mi thưa dần và cần dặm.",
          "Every day some lashes reach the end of their cycle; the extension on them falls too, so the set thins out and needs a refill.",
          "Joka päivä osa ripsistä on kiertonsa lopussa; niihin kiinnitetyt pidennykset irtoavat mukana, joten ripsistö harvenee ja tarvitsee huollon."
        ),
      },
      {
        q: l3("Chân sợi nối nên đặt ở đâu?", "Where should the base of the extension sit?", "Mihin pidennyksen tyvi kiinnitetään?"),
        options: [
          l3("Dán sát vào da mí cho chắc", "Pressed onto the eyelid skin so it holds", "Tiukasti kiinni luomen ihoon, jotta se pysyy"),
          l3("Ở giữa sợi mi thật, càng xa càng tốt", "Halfway along the natural lash, the further the better", "Oman ripsen puolivälissä, mitä kauempana sen parempi"),
          l3("Dọc sợi mi thật, cách da mí khoảng 0,5–1 mm", "Along the natural lash, about 0.5–1 mm from the eyelid skin", "Oman ripsen suuntaisesti, noin 0,5–1 mm:n päässä luomen ihosta"),
        ],
        answer: 2,
        why: l3(
          "Keo chạm da gây cộm, kích ứng và kéo mi khi mọc; đặt quá xa thì sợi nối lỏng và rụng sớm.",
          "Glue on the skin causes discomfort, irritation and pulling as the lash grows; too far out and the extension is loose and falls early.",
          "Iholle joutunut liima hiertää, ärsyttää ja vetää ripseä sen kasvaessa; liian kaukana pidennys on löysä ja irtoaa aikaisin."
        ),
      },
      {
        q: l3("Khách muốn mi thật dày, thật dài nhưng mi thật của khách mảnh và yếu. Bạn làm gì?", "A customer wants very thick, long lashes, but her natural lashes are fine and weak. What do you do?", "Asiakas haluaa hyvin paksut ja pitkät ripset, mutta hänen omat ripsensä ovat ohuet ja heikot. Mitä teet?"),
        options: [
          l3("Giải thích thật lòng và chọn sợi vừa sức mi thật, hoặc gợi ý kỹ thuật khác", "Explain honestly and choose extensions the natural lashes can carry, or suggest another technique", "Kerron rehellisesti ja valitsen pidennykset, jotka omat ripset jaksavat kantaa, tai ehdotan toista tekniikkaa"),
          l3("Gắn sợi dày và dài nhất để khách vui", "Use the thickest, longest extensions to make her happy", "Laitan paksuimmat ja pisimmät pidennykset, jotta hän on tyytyväinen"),
          l3("Gắn hai sợi nối lên mỗi sợi mi thật", "Glue two classic extensions onto every natural lash", "Liimaan kaksi pidennystä jokaiseen omaan ripseen"),
        ],
        answer: 0,
        why: l3(
          "Sợi quá nặng làm mi thật oằn, gãy và rụng sớm. Người trả giá là mi thật của khách.",
          "Extensions that are too heavy bend, break and pull out the natural lashes. Her own lashes pay the price.",
          "Liian painavat pidennykset taivuttavat, katkaisevat ja irrottavat omia ripsiä. Hinnan maksavat asiakkaan omat ripset."
        ),
      },
    ],
  },
  {
    slug: "mi-classic",
    course: "p-lash",
    style: "practice",
    title: l3("Nối mi classic: thực hành từng bước", "Classic lashes: step-by-step practice", "Klassiset ripsienpidennykset: käytäntö vaihe vaiheelta"),
    summary: l3(
      "Mười hai bước làm một bộ mi classic 1:1: tư vấn, cho khách nằm thoải mái, làm sạch mi, dán miếng lót dưới mắt, chải mi, sắp bàn làm việc, tách một sợi mi, lấy keo, gắn cách da mí, kiểm tra dính chùm, hoàn thiện và dặn dò — rồi dọn dẹp dụng cụ.",
      "Twelve steps to a classic 1:1 set: consultation, a comfortable position, cleansing, under-eye pads, brushing, setting up the station, isolating one lash, picking up glue, placing away from the lid, checking for stickies, finishing and aftercare — then cleaning the tools.",
      "Kaksitoista vaihetta klassiseen 1:1-ripsisettiin: konsultaatio, mukava asento, puhdistus, silmänalustyynyt, kampaus, työpisteen valmistelu, yhden ripsen eristys, liiman otto, kiinnitys irti luomesta, tarttumien tarkistus, viimeistely ja jälkihoito — sekä välineiden puhdistus."
    ),
    video: video("mi-classic", 283, "2026-11-17"),
    notice: l3(
      "Keo nối mi dính da và mắt trong vài giây: mắt khách nhắm kín suốt buổi, giọt keo để xa mặt khách. Lỡ dính vào mắt thì rửa ngay bằng nhiều nước sạch và đưa khách đi khám (xem bài Xử lý sự cố). Thời gian giữ khô theo hướng dẫn của hãng keo. Bài này là tài liệu đào tạo, không thay cho chứng chỉ nghề; quy định khác nhau theo từng nước.",
      "Lash adhesive bonds skin and eyes in seconds: the customer's eyes stay closed the whole time and the glue drop stays away from her face. If any gets into the eye, rinse at once with plenty of clean water and send the customer to a doctor (see the lesson on incidents). Keep-dry times follow the adhesive maker's instructions. This lesson is a training aid, not a qualification; rules differ by country.",
      "Ripsiliima liimaa ihon ja silmät sekunneissa: asiakkaan silmät pysyvät kiinni koko ajan ja liimatippa pidetään kaukana kasvoista. Jos liimaa joutuu silmään, huuhtele heti runsaalla puhtaalla vedellä ja ohjaa asiakas lääkäriin (katso tunti vahinkotilanteista). Kastelukielto liiman valmistajan ohjeen mukaan. Tämä tunti on koulutusmateriaalia eikä korvaa ammattitutkintoa; määräykset vaihtelevat maittain."
    ),
    related: ["lich-hen", "khach-hang", "tin-nhan-ai"],
    steps: [
      l3(
        "Tư vấn khi khách còn mở mắt: dị ứng, từng phản ứng với keo chưa, mắt đỏ, ngứa, bệnh mắt hay mới mổ mắt, kiểu mi mong muốn. Kính áp tròng tháo ra trước. Mắt có vấn đề thì không làm.",
        "Consult while the customer's eyes are open: allergies, any past reaction to lash glue, red or itchy eyes, eye conditions or recent eye surgery, and the look she wants. Contact lenses come out first. If the eyes are not healthy, do not work.",
        "Konsultoi asiakkaan silmät auki: allergiat, aiemmat reaktiot ripsiliimaan, punoittavat tai kutiavat silmät, silmäsairaudet tai tuore silmäleikkaus sekä toivottu tyyli. Piilolinssit pois ensin. Jos silmät eivät ole terveet, älä tee."
      ),
      l3(
        "Cho khách nằm thật thoải mái, gối đỡ cổ, nhắm mắt suốt buổi; một bộ classic đầy đủ thường mất khoảng 1,5–2 giờ.",
        "Make the customer comfortable, neck supported, eyes closed throughout; a full classic set often takes about 1.5–2 hours.",
        "Asiakas makaa mukavasti niska tuettuna ja silmät kiinni koko ajan; täysi klassinen setti vie usein noin 1,5–2 tuntia."
      ),
      l3(
        "Làm sạch mi thật bằng dung dịch rửa mi và cọ mềm, chải từ chân ra ngọn, xả nước sạch và làm khô kỹ: dầu và phấn mắt làm keo bám kém.",
        "Cleanse the natural lashes with lash shampoo and a soft brush from root to tip, rinse with clean water and dry thoroughly: oil and make-up weaken the bond.",
        "Puhdista omat ripset ripsishampoolla ja pehmeällä siveltimellä tyvestä kärkeen, huuhtele puhtaalla vedellä ja kuivaa huolellisesti: öljy ja meikki heikentävät sidosta."
      ),
      l3(
        "Miếng lót gel che kín toàn bộ mi dưới, mép trên nằm sát dưới hàng mi dưới nhưng không chạm viền mắt hay con mắt. Sợi mi dưới còn lọt ra thì dùng thêm băng dính giấy chuyên dụng.",
        "The gel pad covers every lower lash; its top edge sits just below the lower lash line without touching the waterline or the eye. Use lash tape for any lower lashes that escape.",
        "Geelityyny peittää kaikki alaripset; sen yläreuna on aivan alaripsirajan alla koskematta limakalvoon tai silmään. Karkaavat alaripset kiinnitetään ripsiteipillä."
      ),
      l3(
        "Chải mi bằng chổi dùng một lần và quan sát: sợi khoẻ, dài và sợi non, ngắn, mảnh — để chọn độ dài và độ dày cho từng vùng.",
        "Brush the lashes with a single-use spoolie and study them: strong, long lashes and young, short, fine ones — to choose the length and thickness for each zone.",
        "Kampaa ripset kertakäyttöisellä harjalla ja tarkastele niitä: vahvat ja pitkät sekä nuoret, lyhyet ja ohuet ripset — valitse pituus ja paksuus vyöhykkeittäin."
      ),
      l3(
        "Sắp bàn: vỉ mi theo độ dài, đá ngọc hay nhẫn keo với giọt keo mới, nhíp thẳng để tách và nhíp cong để gắp, chổi chải mi và que bông dùng một lần; đậy nắp chai keo ngay.",
        "Set up: a lash tile sorted by length, a jade stone or glue ring with a fresh drop, a straight tweezer to isolate and a curved one to place, single-use spoolies and micro-brushes; close the glue bottle straight away.",
        "Valmistele: ripsialusta pituusjärjestyksessä, jadekivi tai liimasormus ja tuore tippa, suorat pinsetit eristykseen ja kaarevat kiinnitykseen, kertakäyttöiset harjat ja mikroharjat; sulje liimapullo heti."
      ),
      l3(
        "Tách đúng một sợi mi thật bằng nhíp thẳng; gắp sợi nối gần phần chân bằng nhíp cong và chỉ nhúng 1–2 mm chân vào giọt keo, không để thành cục.",
        "Isolate exactly one natural lash with the straight tweezer; pick up the extension near its base with the curved tweezer and dip only 1–2 mm of the base into the glue, with no blob.",
        "Eristä täsmälleen yksi oma ripsi suorilla pinseteillä; nosta pidennys tyven läheltä kaarevilla pinseteillä ja kasta liimaan vain 1–2 mm tyvestä, ilman liimapalloa."
      ),
      l3(
        "Đặt sợi nối dọc theo sợi mi thật, cùng hướng, chân cách da mí khoảng 0,5–1 mm, không chạm da; giữ yên một chút cho keo bắt rồi mới nhả nhíp.",
        "Lay the extension along the natural lash in the same direction, its base about 0.5–1 mm from the eyelid skin, never touching it; hold still a moment for the glue to grab before releasing.",
        "Aseta pidennys oman ripsen suuntaisesti, tyvi noin 0,5–1 mm:n päähän luomen ihosta koskematta ihoon; pidä hetki paikallaan, kunnes liima tarttuu, ja irrota vasta sitten."
      ),
      l3(
        "Gắn xen kẽ các vùng (đuôi mắt, giữa, đầu mắt) để keo kịp khô và sợi cạnh nhau không dính. Sau mỗi vùng, lướt nhíp từ chân ra ngọn kiểm tra dính chùm và tách ra ngay. Góc trong ngắn nhất, dài dần về phía đuôi mắt.",
        "Alternate zones (outer, middle, inner) so the glue can set and neighbours do not stick. After each zone, run the tweezer from root to tip to check for stickies and separate them at once. Shortest in the inner corner, gradually longer towards the outer corner.",
        "Vuorottele alueita (ulkonurkka, keskiosa, sisänurkka), jotta liima ehtii kuivua eivätkä vierekkäiset ripset tartu yhteen. Tarkista jokaisen alueen jälkeen tarttumat pinseteillä tyvestä kärkeen ja erota ne heti. Lyhimmät sisänurkkaan, pitenevät kohti ulkonurkkaa."
      ),
      l3(
        "Hoàn thiện: so hai mắt cho cân đối, gỡ miếng lót nhẹ khi mắt còn nhắm, cho khách mở mắt từ từ. Dặn: giữ khô theo hướng dẫn của hãng keo (thường 24–48 giờ), không dùng sản phẩm có dầu ở chân mi, chải mi mỗi ngày, không dụi, không nhổ, dặm sau 2–3 tuần. Bỏ chổi, que bông, miếng lót đã dùng; làm sạch và khử khuẩn nhíp sau mỗi khách.",
        "Finish: compare both eyes for symmetry, remove the pads gently while the eyes are still closed, and let the customer open her eyes slowly. Aftercare: keep dry as the adhesive maker says (often 24–48 hours), no oil-based products at the lash base, brush daily, no rubbing or picking, refill in 2–3 weeks. Bin used spoolies, micro-brushes and pads; clean and disinfect the tweezers after every customer.",
        "Viimeistely: vertaa silmiä symmetrian varmistamiseksi, irrota tyynyt varovasti silmät yhä kiinni ja anna asiakkaan avata silmät hitaasti. Jälkihoito: pidä kuivana liiman valmistajan ohjeen mukaan (usein 24–48 tuntia), ei öljypohjaisia tuotteita tyveen, kampaa päivittäin, älä hiero äläkä nypi, huolto 2–3 viikon päästä. Käytetyt harjat, mikroharjat ja tyynyt roskiin; pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen."
      ),
    ],
    tips: [
      l3(
        "Khách thấy cay hay chảy nước mắt trong lúc làm: dừng lại, cho khách nhắm mắt nghỉ, kiểm tra miếng lót có chạm viền mắt không.",
        "If the customer's eyes sting or water during the treatment: stop, let her rest with eyes closed, and check whether a pad is touching the waterline.",
        "Jos asiakkaan silmät kirvelevät tai vuotavat kesken hoidon: pysähdy, anna levätä silmät kiinni ja tarkista, koskeeko tyyny limakalvoon."
      ),
      l3(
        "Hẹn luôn lịch dặm trước khi khách ra về, và gửi lời nhắc chăm sóc mi qua tin nhắn.",
        "Book the refill before the customer leaves, and send the aftercare reminder by message.",
        "Varaa huoltoaika ennen kuin asiakas lähtee ja lähetä jälkihoito-ohjeet viestillä."
      ),
    ],
    quiz: [
      {
        q: l3("Miếng lót gel dưới mắt nên đặt thế nào?", "How should the under-eye gel pad sit?", "Miten silmänalustyyny asetetaan?"),
        options: [
          l3("Đặt lên con mắt để che kín cả mắt", "On the eye itself so the whole eye is covered", "Suoraan silmän päälle niin, että koko silmä peittyy"),
          l3("Che kín mi dưới, mép trên sát dưới hàng mi nhưng không chạm viền mắt", "Covering all lower lashes, top edge just below the lash line but not touching the waterline", "Peittää kaikki alaripset, yläreuna aivan ripsirajan alla mutta ei kosketa limakalvoa"),
          l3("Chỉ che một nửa mi dưới cho khách dễ chịu", "Covering only half of the lower lashes so it feels lighter", "Peittää vain puolet alaripsistä, jotta tuntuu kevyemmältä"),
        ],
        answer: 1,
        why: l3(
          "Mi dưới lọt ra sẽ bị dính lên mi trên; miếng lót chạm viền mắt làm cay, cộm và đỏ mắt.",
          "Lower lashes left out get glued to the upper lashes; a pad touching the waterline stings and leaves the eye red.",
          "Esiin jääneet alaripset liimautuvat yläripsiin; limakalvoon koskeva tyyny kirvelee ja punoittaa silmää."
        ),
      },
      {
        q: l3("Vì sao nên gắn xen kẽ các vùng thay vì gắn lần lượt từng sợi cạnh nhau?", "Why alternate zones instead of working lash by lash next to each other?", "Miksi alueita vuorotellaan sen sijaan, että edetään ripsi kerrallaan vierekkäin?"),
        options: [
          l3("Để làm nhanh hơn, không cần chờ", "To go faster without waiting", "Jotta työ etenee nopeammin ilman odottelua"),
          l3("Để tiết kiệm keo", "To save glue", "Jotta liimaa kuluu vähemmän"),
          l3("Để keo ở sợi trước kịp khô và các sợi cạnh nhau không dính vào nhau", "So the glue on the last lash can set and neighbouring lashes do not stick together", "Jotta edellisen ripsen liima ehtii kuivua eivätkä vierekkäiset ripset tartu yhteen"),
        ],
        answer: 2,
        why: l3(
          "Hai sợi nằm sát nhau khi keo còn ướt rất dễ dính chùm. Dính chùm kéo mi thật khi mọc.",
          "Two neighbouring lashes with wet glue stick together easily, and a sticky pulls on the natural lashes as they grow.",
          "Kaksi vierekkäistä ripseä tarttuu helposti yhteen, kun liima on märkä, ja tarttuma vetää omia ripsiä niiden kasvaessa."
        ),
      },
      {
        q: l3("Lấy keo cho sợi mi nối thế nào là đúng?", "What is the right way to pick up glue on an extension?", "Miten pidennykseen otetaan liimaa oikein?"),
        options: [
          l3("Chỉ nhúng khoảng 1–2 mm phần chân vào giọt keo mới", "Dip only about 1–2 mm of the base into a fresh drop", "Kastan vain noin 1–2 mm tyvestä tuoreeseen tippaan"),
          l3("Nhúng cả sợi mi vào keo cho chắc", "Dip the whole extension so it holds better", "Kastan koko pidennyksen, jotta se pitää paremmin"),
          l3("Dùng lại giọt keo đã đặc từ khách trước", "Reuse the thickened drop from the last customer", "Käytän edellisen asiakkaan sakeutunutta tippaa"),
        ],
        answer: 0,
        why: l3(
          "Keo thừa thành cục, dính chùm và có thể chạm da; giọt keo cũ đã đặc thì bám kém.",
          "Excess glue forms blobs and stickies and can touch the skin; an old, thickened drop bonds poorly.",
          "Liika liima muodostaa palloja ja tarttumia ja voi koskea ihoon; vanha sakeutunut tippa tarttuu huonosti."
        ),
      },
    ],
  },
  {
    slug: "mi-volume-hieu-dung",
    course: "p-lash",
    style: "theory",
    title: l3("Nối mi volume: hiểu đúng để dày mà vẫn nhẹ", "Volume lashes: understand them so they are full yet light", "Volyymiripset: ymmärrä ne, niin ripset ovat tuuheat mutta kevyet"),
    summary: l3(
      "Volume là gì (một fan nhiều sợi rất mảnh gắn vào đúng một sợi mi thật), vì sao sợi volume phải mảnh hơn classic, chọn 2D–6D theo sức mi thật, một fan đẹp trông thế nào, fan làm sẵn và fan tự tạo, lượng keo, dính chùm, tốc độ, độ bền và lịch dặm, và nói thật với khách.",
      "What volume is (a fan of several very fine extensions on ONE natural lash), why volume lashes are much finer than classic, choosing 2D–6D by the strength of the natural lashes, what a good fan looks like, pre-made versus handmade fans, glue amount, stickies, speed, retention and refills, and honest talk with clients.",
      "Mitä volyymi on (useasta hyvin ohuesta pidennyksestä tehty viuhka YHTEEN luomuripseen), miksi volyymiripset ovat paljon klassisia ohuempia, 2D–6D-valinta luomuripsien vahvuuden mukaan, millainen on hyvä viuhka, valmiit ja käsin tehdyt viuhkat, liiman määrä, tarttumat, nopeus, kestävyys ja huollot sekä rehellinen puhe asiakkaan kanssa."
    ),
    video: video("mi-volume-hieu-dung", 308, "2026-11-17"),
    notice: l3(
      "Độ dày, độ dài và số sợi trong bài là hướng dẫn chung theo kinh nghiệm nghề, không phải con số tuyệt đối: luôn xem bảng gợi ý của hãng mi và hướng dẫn của hãng keo. Keo không được chạm vào da. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Thickness, length and lashes per fan in this lesson are general trade guidance, not exact figures: always check the lash maker's chart and the glue maker's instructions. Glue must never touch the skin. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Tämän tunnin paksuudet, pituudet ja ripsimäärät viuhkassa ovat yleisiä alan ohjeita, eivät tarkkoja lukuja: tarkista aina ripsivalmistajan taulukko ja liimavalmistajan ohjeet. Liima ei saa koskaan koskea ihoa. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["dich-vu", "lich-hen", "the-khach-quen"],
    steps: [
      l3(
        "Volume vẫn là một fan trên đúng MỘT sợi mi thật. Fan gồm vài sợi rất mảnh xoè ra từ một chân chung; gọi theo số sợi: 2D, 3D… 6D. Không bao giờ một fan ôm hai, ba sợi mi thật.",
        "Volume is still one fan on exactly ONE natural lash. A fan is several very fine lashes opening from one shared base, named by the number of lashes: 2D, 3D… 6D. A fan never wraps two or three natural lashes.",
        "Volyymi on edelleen yksi viuhka täsmälleen YHDESSÄ luomuripsessä. Viuhka on useita hyvin ohuita ripsiä, jotka avautuvat yhteisestä kannasta; nimi tulee ripsien määrästä: 2D, 3D… 6D. Viuhka ei koskaan kiedo kahta tai kolmea luomuripseä."
      ),
      l3(
        "Thêm sợi thì bớt độ dày: sức chịu của sợi mi thật không đổi, nên sợi volume mảnh hơn classic rất nhiều. Một fan vài sợi thật mảnh có thể chỉ nặng gần bằng một sợi classic dày. Độ dày cụ thể: theo bảng của hãng mi.",
        "More lashes, less thickness: what a natural lash can carry does not change, so volume lashes are much finer than classic. A fan of a few very fine lashes can weigh about as much as one thicker classic lash. Exact thickness: follow the lash maker's chart.",
        "Lisää ripsiä, vähemmän paksuutta: luomuripsen kantokyky ei muutu, joten volyymiripset ovat paljon klassisia ohuempia. Muutamasta hyvin ohuesta ripsestä tehty viuhka voi painaa suunnilleen yhden paksumman klassisen ripsen verran. Tarkka paksuus: ripsivalmistajan taulukon mukaan."
      ),
      l3(
        "Chọn mấy D theo sức mi thật, không chỉ theo ý khách. Mi khoẻ, dài, dày đỡ được fan nhiều sợi hơn; mi mảnh, ngắn, thưa hay nhiều sợi non thì ít sợi, mảnh và ngắn hơn (2D–3D). Góc trong thường nhẹ hơn.",
        "Choose the number of lashes by the strength of the natural lashes, not only by the client's wish. Strong, long, thick lashes carry more; fine, short, sparse or young lashes get fewer, finer and shorter ones (2D–3D). The inner corner is usually lighter.",
        "Valitse ripsimäärä luomuripsien vahvuuden mukaan, ei pelkästään asiakkaan toiveen mukaan. Vahvat, pitkät ja paksut ripset kantavat enemmän; ohuet, lyhyet, harvat tai nuoret ripset saavat vähemmän, ohuempia ja lyhyempiä (2D–3D). Sisänurkka on yleensä kevyempi."
      ),
      l3(
        "Fan quá nặng kéo trĩu sợi mi thật, gốc mi chịu lực, mi rụng sớm từng mảng và hàng mi thật thưa dần.",
        "Fans that are too heavy drag the natural lash down, strain the root, make lashes fall out early in patches and thin the natural lash line over time.",
        "Liian painavat viuhkat painavat luomuripsen alas, rasittavat juurta, saavat ripset irtoamaan ennenaikaisesti laikuittain ja harventavat luomuripsiä ajan myötä."
      ),
      l3(
        "Một fan đẹp: chân nhỏ, khép kín, gọn gần như một sợi để ôm quanh sợi mi thật; các sợi xoè đều, không dính đôi; cân đối hai bên, độ xoè vừa phải. Fan chân bè, xoè lệch thì nặng và dễ dính sang sợi bên cạnh.",
        "A good fan: a narrow, closed base, almost as slim as one lash, so it wraps the natural lash; lashes evenly spread, none stuck together; symmetrical, not too wide. A wide-based, lopsided fan is heavy and easily catches the next lash.",
        "Hyvä viuhka: kapea, suljettu kanta, lähes yhden ripsen ohut, jotta se kietoutuu luomuripsen ympärille; ripset tasaisesti levällään, ei yhteen tarttuneita; symmetrinen, ei liian leveä. Leveäkantainen, vino viuhka on painava ja tarttuu helposti viereiseen ripseen."
      ),
      l3(
        "Fan làm sẵn (promade) dùng được, nhất là khi mới tập; chọn loại chân nhỏ, gọn và vẫn kiểm tra từng fan. Tự tạo fan bằng tay là tay nghề thật: chọn được số sợi, độ xoè, độ dài cho từng sợi mi thật.",
        "Pre-made (promade) fans are fine, especially while learning; choose narrow, neat bases and still check every fan. Handmade fans are the real skill: you choose the number of lashes, the spread and the length for each natural lash.",
        "Valmiit (promade) viuhkat käyvät, etenkin harjoitellessa; valitse kapeakantaiset ja tarkista silti jokainen viuhka. Käsin tehty viuhka on varsinainen taito: valitset ripsimäärän, leveyden ja pituuden jokaiselle luomuripselle."
      ),
      l3(
        "Keo thật ít: chỉ chạm chân fan vào giọt keo. Keo nhiều làm chân fan nặng, cứng, thành cục, keo leo lên làm fan dính khối và dính sang sợi bên cạnh. Mi bền nhờ chân fan ôm khít, không nhờ cục keo.",
        "Very little glue: only the base of the fan touches the drop. Too much glue makes a heavy, stiff, lumpy base, creeps up and glues the fan into a clump and onto the next lash. Retention comes from a base that wraps snugly, not from a blob of glue.",
        "Hyvin vähän liimaa: vain viuhkan kanta koskettaa pisaraa. Liika liima tekee kannasta painavan, jäykän ja paakkuisen, nousee ripsien väliin ja liimaa viuhkan möykyksi ja viereiseen ripseen. Kestävyys tulee tiiviisti kietoutuvasta kannasta, ei liimapaakusta."
      ),
      l3(
        "Dính chùm còn dễ xảy ra hơn classic vì fan rộng: tách mi thật sạch và kiểm tra lại sau mỗi vùng. Tốc độ đến từ kỹ thuật (fan đều, keo đúng lượng, đặt một lần là xong), không đến từ vội.",
        "Stickies happen even more easily than in classic because a fan is wide: isolate cleanly and check after every zone. Speed comes from technique (even fans, the right amount of glue, placed right the first time), not from rushing.",
        "Tarttumia syntyy vielä helpommin kuin klassisissa, koska viuhka on leveä: eristä huolellisesti ja tarkista jokaisen alueen jälkeen. Nopeus tulee tekniikasta (tasaiset viuhkat, oikea liimamäärä, kerralla oikeaan kohtaan), ei kiirehtimisestä."
      ),
      l3(
        "Độ bền phụ thuộc vào làm sạch mi kỹ, độ ẩm và nhiệt độ phòng theo hãng keo, và cách khách giữ mi ở nhà; mi vẫn rụng theo vòng đời nên dặm sau khoảng 2–3 tuần. Nhíp làm sạch và khử khuẩn sau mỗi khách (bài “Xử lý dụng cụ sau mỗi khách”); keo có thể gây dị ứng (bài “Dị ứng và hoá chất”).",
        "Retention depends on thorough cleansing, room humidity and temperature within the glue maker's range, and aftercare at home; lashes still shed with their growth cycle, so refills come every 2–3 weeks or so. Tweezers are cleaned and disinfected after every client (see the tool-hygiene lesson); glue can cause allergy (see the allergy lesson).",
        "Kestävyys riippuu huolellisesta puhdistuksesta, liimavalmistajan suosittelemasta huoneen kosteudesta ja lämpötilasta sekä kotihoidosta; ripset irtoavat silti kasvusyklinsä mukaan, joten huolto noin 2–3 viikon välein. Pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen (välinehygienian tunti); liima voi aiheuttaa allergian (allergiatunti)."
      ),
      l3(
        "Nói thật với khách: volume đẹp nhất khi vừa sức mi thật. Mi yếu thì làm nhẹ hơn hôm nay để mi khoẻ, lần sau có thể dày hơn.",
        "Be honest with clients: volume looks best when it suits the natural lashes. With weak lashes, go lighter today so they stay healthy; next time it can be fuller.",
        "Ole rehellinen asiakkaalle: volyymi näyttää parhaalta, kun se sopii luomuripsille. Heikoille ripsille tehdään tänään kevyemmin, jotta ne pysyvät terveinä; ensi kerralla voi olla tuuheampaa."
      ),
    ],
    tips: [
      l3(
        "Khách đưa ảnh mi thật dày mà mi thật mảnh: cho khách xem mi thật của chính họ trong gương, giải thích vì sao hôm nay làm nhẹ hơn. Khách hiểu thì tin, và quay lại.",
        "A client brings a photo of very full lashes but has fine natural lashes: show them their own lashes in the mirror and explain why you go lighter today. A client who understands trusts you, and comes back.",
        "Asiakas tuo kuvan hyvin tuuheista ripsistä, mutta omat ripset ovat ohuet: näytä hänelle omat ripsensä peilistä ja kerro, miksi teet tänään kevyemmin. Ymmärtävä asiakas luottaa ja palaa."
      ),
      l3(
        "Trong VaraaAi, tạo riêng dịch vụ “Nối mi volume” và “Dặm mi volume” với thời lượng thật của tiệm, rồi hẹn lịch dặm cho khách ngay trước khi khách về.",
        "In VaraaAi, create separate “Volume lashes” and “Volume refill” services with your salon's real durations, then book the client's refill before they leave.",
        "Luo VaraaAi:ssa erilliset palvelut ”Volyymiripset” ja ”Volyymiripsien huolto” liikkeesi todellisilla kestoilla ja varaa asiakkaan huoltoaika ennen kuin hän lähtee."
      ),
    ],
    quiz: [
      {
        q: l3("Một fan 4D được gắn vào bao nhiêu sợi mi thật?", "How many natural lashes does one 4D fan go on?", "Kuinka moneen luomuripseen yksi 4D-viuhka kiinnitetään?"),
        options: [
          l3("Bốn sợi, mỗi sợi một nhánh", "Four, one branch on each", "Neljään, yksi haara kuhunkin"),
          l3("Đúng một sợi", "Exactly one", "Täsmälleen yhteen"),
          l3("Hai sợi, cho chắc", "Two, for strength", "Kahteen, lujuuden vuoksi"),
        ],
        answer: 1,
        why: l3(
          "Dù fan có bao nhiêu sợi, chân fan chỉ ôm đúng một sợi mi thật. Ôm hai sợi là dính chùm: mi bị kéo và rụng sớm.",
          "However many lashes a fan has, its base wraps exactly one natural lash. Two natural lashes in one fan is a sticky: they are pulled and shed early.",
          "Viuhkassa voi olla monta ripseä, mutta sen kanta kietoutuu täsmälleen yhteen luomuripseen. Kaksi luomuripseä samassa viuhkassa on tarttuma: ripsiä vedetään ja ne irtoavat ennenaikaisesti."
        ),
      },
      {
        q: l3("Khách có mi thật mảnh, ngắn và thưa nhưng muốn một bộ thật dày. Bạn làm gì?", "A client with fine, short, sparse lashes wants a very full set. What do you do?", "Asiakkaalla on ohuet, lyhyet ja harvat ripset, mutta hän haluaa hyvin tuuheat. Mitä teet?"),
        options: [
          l3("Làm fan nhiều sợi, sợi dày cho đúng ý khách", "Big fans with thick lashes, as the client wants", "Isot viuhkat paksuilla ripsillä asiakkaan toiveen mukaan"),
          l3("Từ chối làm mi cho khách", "Refuse to do lashes at all", "Kieltäydyn tekemästä ripsiä lainkaan"),
          l3("Giải thích, chọn fan ít sợi, mảnh và ngắn hơn để mi thật khoẻ", "Explain, and choose fewer, finer, shorter lashes per fan to keep the natural lashes healthy", "Selitän ja valitsen viuhkaan vähemmän, ohuempia ja lyhyempiä ripsiä, jotta luomuripset pysyvät terveinä"),
        ],
        answer: 2,
        why: l3(
          "Số sợi chọn theo sức mi thật. Fan quá nặng kéo mi thật rụng sớm, và vài tháng sau hàng mi thưa đi.",
          "The number of lashes follows what the natural lash can carry. Too heavy a fan makes natural lashes fall out early, and months later the lash line is thinner.",
          "Ripsimäärä valitaan luomuripsen kantokyvyn mukaan. Liian painava viuhka saa luomuripset irtoamaan ennenaikaisesti, ja kuukausien päästä ripsirivi on harvempi."
        ),
      },
      {
        q: l3("Lấy nhiều keo ở chân fan thì sao?", "What happens with a lot of glue on the base of the fan?", "Mitä tapahtuu, jos viuhkan kannassa on paljon liimaa?"),
        options: [
          l3("Chân fan nặng, cứng, dễ dính chùm", "A heavy, stiff base and stickies come easily", "Kanta on painava ja jäykkä, ja tarttumia syntyy helposti"),
          l3("Mi giữ lâu hơn", "The lashes last longer", "Ripset kestävät pidempään"),
          l3("Fan xoè đẹp hơn", "The fan opens more nicely", "Viuhka aukeaa kauniimmin"),
        ],
        answer: 0,
        why: l3(
          "Keo nhiều thành cục, leo lên giữa các sợi và dính sang sợi bên cạnh. Mi bền nhờ chân fan ôm khít sợi mi thật, không nhờ cục keo.",
          "Too much glue forms a lump, creeps between the lashes and catches the next lash. Retention comes from a base that wraps the natural lash snugly, not from a blob.",
          "Liika liima muodostaa paakun, nousee ripsien väliin ja tarttuu viereiseen ripseen. Kestävyys tulee tiiviisti luomuripsen ympärille kietoutuvasta kannasta, ei paakusta."
        ),
      },
    ],
  },
  {
    slug: "mi-volume",
    course: "p-lash",
    style: "practice",
    title: l3("Nối mi volume: thực hành tạo fan từng bước", "Volume lashes: making fans step by step", "Volyymiripset: viuhkan teko vaihe vaiheelta"),
    summary: l3(
      "Một bộ mi volume với fan tự tạo bằng tay: chuẩn bị như bài classic, sắp bàn làm việc, lấy vài sợi trên dải, trượt nhíp để mở fan và khép chân fan, kiểm tra fan, chỉ chạm chân fan vào keo, tách một sợi mi thật, gắn fan ôm quanh sợi mi cách da mí 0,5–1 mm, gắn xen kẽ, kiểm tra dính chùm, hoàn thiện và dọn dẹp.",
      "A volume set with handmade fans: prep as in the classic lesson, setting up the station, picking a few lashes off the strip, sliding the tweezer to open the fan and close its base, checking the fan, touching only the base into the glue, isolating one natural lash, placing the fan so it wraps the lash 0.5–1 mm from the lid, alternating zones, checking for stickies, finishing and clearing up.",
      "Volyymiripset käsin tehdyillä viuhkoilla: valmistelu kuten klassisten tunnilla, työpisteen järjestäminen, muutaman ripsen nosto nauhalta, pinsettien liu'utus viuhkan avaamiseksi ja kannan sulkemiseksi, viuhkan tarkistus, vain kannan kastaminen liimaan, yhden luomuripsen eristys, viuhkan kiinnitys luomuripsen ympärille 0,5–1 mm luomesta, alueiden vuorottelu, tarttumien tarkistus, viimeistely ja siivous."
    ),
    video: video("mi-volume", 280, "2026-11-17"),
    notice: l3(
      "Khoảng cách, độ dày và số sợi trong bài là hướng dẫn chung theo kinh nghiệm nghề; luôn theo bảng của hãng mi và hướng dẫn của hãng keo (độ ẩm, nhiệt độ, thời gian giữ khô). Mắt khách nhắm kín suốt buổi, keo không được chạm da. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Distances, thickness and lashes per fan here are general trade guidance; always follow the lash maker's chart and the glue maker's instructions (humidity, temperature, how long to keep lashes dry). The client's eyes stay closed throughout, and glue must never touch the skin. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Etäisyydet, paksuudet ja ripsimäärät ovat yleisiä alan ohjeita; noudata aina ripsivalmistajan taulukkoa ja liimavalmistajan ohjeita (kosteus, lämpötila, kuinka kauan ripset pidetään kuivina). Asiakkaan silmät pysyvät kiinni koko ajan, eikä liima saa koskaan koskea ihoa. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["dich-vu", "lich-hen", "khach-hang"],
    steps: [
      l3(
        "Chuẩn bị như bài thực hành classic: tư vấn và hỏi dị ứng, khách nằm thoải mái, làm sạch mi, miếng lót dưới mắt, chải mi. Khi chải, nhìn kỹ mi thật từng vùng để chọn fan mấy sợi.",
        "Prep as in the classic practice lesson: consultation and allergy questions, client comfortable, lashes cleansed, under-eye pads, lashes brushed. While brushing, read the natural lashes zone by zone to choose how many lashes per fan.",
        "Valmistelu kuten klassisten käytäntötunnilla: konsultaatio ja allergiakysymykset, asiakas mukavasti, ripset puhdistettu, silmänalustyynyt, ripset harjattu. Harjatessa arvioi luomuripset alue kerrallaan ja valitse ripsimäärä viuhkaan."
      ),
      l3(
        "Bàn làm việc: vỉ mi volume (sợi rất mảnh) xếp theo độ dài, đá ngọc với giọt keo mới, nhíp thẳng để tách mi và nhíp volume đầu gập góc để tạo và gắn fan, đồ dùng một lần; chai keo đậy nắp ngay.",
        "Station: a tile of volume lashes (very fine) sorted by length, a jade stone with a fresh drop of glue, a straight tweezer for isolating and an angled volume tweezer for making and placing fans, single-use items; the glue bottle closed straight away.",
        "Työpiste: volyymiripsialusta (hyvin ohuet ripset) pituusjärjestyksessä, jadekivi ja tuore liimapisara, suorat pinsetit eristykseen ja kulmikkaat volyymipinsetit viuhkan tekoon ja kiinnitykseen, kertakäyttövälineet; liimapullo suljetaan heti."
      ),
      l3(
        "Lấy sợi: đặt đầu nhíp volume ngang qua vài sợi trên dải, ở phần gần ngọn; lấy đúng số sợi cần cho fan, kẹp thật nhẹ, lấy từ mép dải vào.",
        "Picking: lay the volume tweezer tip across a few lashes on the strip, towards the tips; take exactly the number you need, grip very lightly, and work in from the edge of the strip.",
        "Nosto: aseta volyymipinsettien kärki muutaman ripsen yli nauhalla, kärkien puolelle; ota juuri tarvittava määrä, purista hyvin kevyesti ja etene nauhan reunasta sisäänpäin."
      ),
      l3(
        "Mở fan: trượt nhíp từ từ về phía chân sợi để các sợi xoè ra (có thợ lăn hoặc nghiêng nhíp); khép nhíp ở chân cho chân fan nhỏ, gọn, rồi nhấc fan ra. Đừng xoè quá rộng.",
        "Opening the fan: slide the tweezer slowly towards the base so the lashes spread (some roll or tilt the tweezer instead); close the tweezer at the base so it is narrow and neat, then lift the fan off. Don't spread it too wide.",
        "Viuhkan avaus: liu'uta pinsettejä hitaasti kantaa kohti, jolloin ripset levittyvät (jotkut pyörittävät tai kallistavat pinsettejä); sulje pinsetit kannasta, jotta se on kapea ja siisti, ja nosta viuhka irti. Älä levitä liian leveäksi."
      ),
      l3(
        "Kiểm tra trước khi lấy keo: chân nhỏ và kín, các sợi xoè đều và cân đối, đúng số sợi. Fan lệch, chân bè hay sợi dính đôi thì bỏ, làm fan mới.",
        "Check before the glue: narrow, closed base, lashes evenly spread and symmetrical, the right number of lashes. A lopsided fan, a wide base or two lashes stuck together: discard it and make a new one.",
        "Tarkista ennen liimaa: kapea, suljettu kanta, ripset tasaisesti ja symmetrisesti levällään, oikea määrä ripsiä. Vino viuhka, leveä kanta tai yhteen tarttuneet ripset: hylkää ja tee uusi."
      ),
      l3(
        "Lấy keo: chỉ chạm chân fan vào mép giọt keo rồi rút ra; không nhúng sâu, không để keo leo lên giữa các sợi. Fan dính cục keo to thì bỏ. Thay giọt keo mới thường xuyên theo hướng dẫn của hãng.",
        "Glue: touch only the base of the fan into the edge of the drop and draw it out; don't dip deep or let glue creep up between the lashes. A fan with a big blob of glue goes in the bin. Replace the drop often, as the glue maker advises.",
        "Liima: kosketa vain viuhkan kannalla pisaran reunaa ja vedä pois; älä kasta syvälle äläkä anna liiman nousta ripsien väliin. Viuhka, jossa on iso liimapaakku, hylätään. Vaihda pisara usein liimavalmistajan ohjeen mukaan."
      ),
      l3(
        "Tách đúng một sợi mi thật bằng nhíp thẳng, thật sạch, như bài classic — fan rộng nên chỉ một sợi còn sát là dính.",
        "Isolate exactly one natural lash with the straight tweezer, cleanly, as in the classic lesson — a fan is wide, so one lash left close by will be caught.",
        "Eristä suorilla pinseteillä täsmälleen yksi luomuripsi huolellisesti kuten klassisten tunnilla — viuhka on leveä, joten yksikin lähelle jäänyt ripsi tarttuu."
      ),
      l3(
        "Gắn fan: chân fan ôm quanh sợi mi thật, cùng hướng mọc, cách da mí khoảng 0,5–1 mm, không bao giờ chạm da; áp nhẹ, giữ yên cho keo bắt rồi nhả nhíp. Fan lệch thì gỡ ngay khi keo chưa bắt.",
        "Placing: the base wraps the natural lash, in its growth direction, about 0.5–1 mm from the lid, never on the skin; press lightly, hold still until the glue grabs, then release. If it sits crooked, remove it at once before the glue sets.",
        "Kiinnitys: kanta kietoutuu luomuripsen ympärille kasvusuunnassa noin 0,5–1 mm luomesta, ei koskaan iholle; paina kevyesti, pidä paikallaan kunnes liima tarttuu, ja irrota sitten. Jos viuhka on vinossa, poista se heti ennen kuin liima kovettuu."
      ),
      l3(
        "Gắn xen kẽ các vùng (đuôi, giữa, đầu mắt) để keo có thời gian khô; sau mỗi vùng lướt nhíp từ chân ra ngọn kiểm tra dính chùm và tách ngay. Góc trong ngắn và nhẹ, dài dần về đuôi mắt (chọn kiểu: bài lash mapping).",
        "Alternate zones (outer, middle, inner) so the glue has time to dry; after each zone run the tweezer from base to tip to check for stickies and separate them at once. Short and light at the inner corner, gradually longer towards the outer corner (styles: the lash-mapping lesson).",
        "Vuorottele alueita (ulko-, keski-, sisäosa), jotta liima ehtii kuivua; jokaisen alueen jälkeen vedä pinseteillä tyvestä kärkeen, tarkista tarttumat ja erota ne heti. Sisänurkassa lyhyet ja kevyet, ulkonurkkaa kohti vähitellen pidemmät (tyylit: ripsikartoituksen tunti)."
      ),
      l3(
        "Hoàn thiện: chải và so hai mắt, gỡ miếng lót khi mắt khách vẫn nhắm, mở mắt từ từ; dặn dò như bài classic và hẹn dặm sau khoảng 2–3 tuần. Đồ dùng một lần bỏ thùng có nắp; nhíp làm sạch và khử khuẩn sau mỗi khách.",
        "Finish: brush and compare both eyes, remove the pads while the eyes are still closed, open slowly; aftercare as in the classic lesson and book a refill in about 2–3 weeks. Single-use items into a lidded bin; tweezers cleaned and disinfected after every client.",
        "Viimeistely: harjaa ja vertaa molempia silmiä, poista tyynyt silmien ollessa vielä kiinni, avaus hitaasti; jälkihoito kuten klassisten tunnilla ja huolto noin 2–3 viikon päähän. Kertakäyttötuotteet kannelliseen roska-astiaan; pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen."
      ),
    ],
    tips: [
      l3(
        "Làm lại một fan chỉ mất vài giây; gắn một fan xấu lên mắt khách thì mất nhiều hơn thế. Tập tạo fan trên vỉ mi hằng ngày cho đến khi tay đều, rồi mới tính đến tốc độ.",
        "Remaking a fan takes seconds; putting a bad fan on a client's eye costs far more. Practise making fans on a tile every day until they are even; speed comes after that.",
        "Viuhkan uusiminen vie sekunteja; huono viuhka asiakkaan silmässä maksaa paljon enemmän. Harjoittele viuhkoja alustalla päivittäin, kunnes ne ovat tasaisia; nopeus tulee vasta sen jälkeen."
      ),
      l3(
        "Bộ volume đầu tiên sẽ lâu hơn nhiều so với classic. Trong VaraaAi, đặt thời lượng dịch vụ volume theo tốc độ thật của từng thợ, để lịch không bị dồn.",
        "Your first volume sets will take much longer than classic. In VaraaAi, set the volume service duration to each technician's real pace so the calendar doesn't overrun.",
        "Ensimmäiset volyymisetit vievät paljon kauemmin kuin klassiset. Aseta VaraaAi:ssa volyymipalvelun kesto kunkin tekijän todellisen tahdin mukaan, jottei kalenteri veny."
      ),
    ],
    quiz: [
      {
        q: l3("Khi lấy keo cho fan, phần nào chạm vào giọt keo?", "When picking up glue, which part of the fan touches the drop?", "Mikä viuhkan osa koskettaa liimapisaraa?"),
        options: [
          l3("Cả fan, cho keo phủ đều các sợi", "The whole fan, so every lash is coated", "Koko viuhka, jotta jokainen ripsi peittyy"),
          l3("Chỉ phần chân fan, rồi rút ra nhẹ", "Only the base, then draw it out gently", "Vain kanta, ja sitten vedetään kevyesti pois"),
          l3("Phần ngọn fan", "The tips of the fan", "Viuhkan kärjet"),
        ],
        answer: 1,
        why: l3(
          "Keo chỉ cần ở chân fan, chỗ ôm sợi mi thật. Keo leo lên giữa các sợi làm fan nặng, dính khối và dễ dính chùm.",
          "Glue belongs only at the base, where it wraps the natural lash. Glue between the lashes makes the fan heavy, clumped and prone to stickies.",
          "Liimaa tarvitaan vain kannassa, joka kietoutuu luomuripseen. Ripsien väliin noussut liima tekee viuhkasta painavan, möykkyisen ja altiin tarttumille."
        ),
      },
      {
        q: l3("Chân fan nên cách da mí khoảng bao nhiêu?", "About how far from the eyelid skin should the base of the fan be?", "Kuinka kaukana luomen ihosta viuhkan kannan pitäisi olla?"),
        options: [
          l3("Khoảng 0,5–1 mm, không bao giờ chạm da", "About 0.5–1 mm, never touching the skin", "Noin 0,5–1 mm, ei koskaan iholla"),
          l3("Sát da cho chắc", "Right on the skin, for hold", "Aivan ihossa pitävyyden vuoksi"),
          l3("Khoảng giữa sợi mi thật", "Halfway up the natural lash", "Puolivälissä luomuripseä"),
        ],
        answer: 0,
        why: l3(
          "Keo chạm da gây cộm, ngứa, có khi kích ứng, và kéo sợi mi khi mọc; gắn quá xa thì fan lỏng và rụng sớm.",
          "Glue on the skin causes discomfort, itching, sometimes irritation, and pulls the lash as it grows; too far out and the fan is loose and falls early.",
          "Iholle joutunut liima aiheuttaa epämukavuutta, kutinaa, joskus ärsytystä, ja vetää ripseä sen kasvaessa; liian kaukana viuhka on löysä ja irtoaa aikaisin."
        ),
      },
      {
        q: l3("Bạn vừa tạo một fan có chân bè và hai sợi dính vào nhau. Bạn làm gì?", "You've just made a fan with a wide base and two lashes stuck together. What do you do?", "Teit juuri viuhkan, jonka kanta on leveä ja kaksi ripseä on tarttunut yhteen. Mitä teet?"),
        options: [
          l3("Thêm keo cho chắc rồi gắn", "Add more glue to hold it and place it", "Lisään liimaa pitävyyden vuoksi ja kiinnitän"),
          l3("Gắn vào hai sợi mi thật cho vừa", "Place it on two natural lashes so it fits", "Kiinnitän sen kahteen luomuripseen, jotta se sopii"),
          l3("Bỏ fan đó và làm fan mới", "Discard it and make a new fan", "Hylkään sen ja teen uuden viuhkan"),
        ],
        answer: 2,
        why: l3(
          "Fan xấu vừa nặng vừa dễ dính chùm. Làm lại chỉ mất vài giây, còn một fan ôm hai sợi mi thật sẽ kéo mi và làm mi rụng sớm.",
          "A bad fan is heavy and causes stickies. Remaking it takes seconds; a fan on two natural lashes pulls them and makes them shed early.",
          "Huono viuhka on painava ja aiheuttaa tarttumia. Uuden teko vie sekunteja; kahteen luomuripseen kiinnitetty viuhka vetää ripsiä ja saa ne irtoamaan ennenaikaisesti."
        ),
      },
    ],
  },
  {
    slug: "mi-hybrid-hieu-dung",
    course: "p-lash",
    style: "theory",
    title: l3("Nối mi hybrid: hiểu đúng để có độ tơi tự nhiên", "Hybrid lashes: understand them for natural texture", "Hybridiripset: ymmärrä ne, niin saat luonnollisen tekstuurin"),
    summary: l3(
      "Hybrid là gì (sợi đơn classic và fan volume phối trên cùng một mắt, mỗi sợi mi thật chỉ mang một thứ), vẻ tơi có kết cấu nằm giữa classic và volume, hợp với ai, chọn sợi đơn hay fan theo sức từng sợi mi thật, tỉ lệ phối là điểm xuất phát chứ không phải luật, độ tơi từ độ dài, rải đều, an toàn, dặm và tư vấn thật lòng.",
      "What hybrid is (classic singles and volume fans mixed on one eye, each natural lash carrying only one of them), the textured look between classic and volume, who it suits, choosing a single or a fan by the strength of each natural lash, the mix as a starting point rather than a rule, texture through length, even distribution, safety, refills and an honest consultation.",
      "Mitä hybridi on (klassisia yksittäisiä ripsiä ja volyymiviuhkoja samassa silmässä, jokaisessa luomuripsessä vain toinen niistä), klassisten ja volyymin väliin sijoittuva tekstuurinen ilme, kenelle se sopii, yksittäisen ripsen tai viuhkan valinta kunkin luomuripsen vahvuuden mukaan, sekoitussuhde lähtökohtana eikä sääntönä, tekstuuri pituuksilla, tasainen jakauma, turvallisuus, huollot ja rehellinen konsultaatio."
    ),
    video: video("mi-hybrid-hieu-dung", 277, "2026-11-17"),
    notice: l3(
      "Tỉ lệ phối, độ dài và số sợi trong bài là hướng dẫn chung theo kinh nghiệm nghề, không phải con số tuyệt đối: luôn chọn theo mi thật của khách, xem bảng gợi ý của hãng mi và hướng dẫn của hãng keo. Keo không được chạm vào da. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "The mix, lengths and lashes per fan in this lesson are general trade guidance, not exact figures: always decide by the client's natural lashes and check the lash maker's chart and the glue maker's instructions. Glue must never touch the skin. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Tämän tunnin sekoitussuhde, pituudet ja ripsimäärät ovat yleisiä alan ohjeita, eivät tarkkoja lukuja: päätä aina asiakkaan omien ripsien mukaan ja tarkista ripsivalmistajan taulukko sekä liimavalmistajan ohjeet. Liima ei saa koskaan koskea ihoa. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["dich-vu", "khach-hang", "lich-hen"],
    steps: [
      l3(
        "Hybrid phối sợi đơn classic và fan volume trên cùng một mắt. Mỗi sợi mi thật vẫn chỉ mang đúng một thứ: hoặc một sợi đơn, hoặc một fan, không bao giờ cả hai.",
        "Hybrid mixes classic singles and volume fans on the same eye. Each natural lash still carries exactly one thing: either one single or one fan, never both.",
        "Hybridissä samaan silmään yhdistetään klassisia yksittäisiä ripsiä ja volyymiviuhkoja. Jokainen luomuripsi kantaa silti vain yhden: joko yksittäisen ripsen tai viuhkan, ei koskaan molempia."
      ),
      l3(
        "Vẻ ngoài: sợi đơn rõ nét như những mũi nhọn nhỏ, fan mảnh lấp vào giữa. Hàng mi có kết cấu, hơi tơi (kiểu “spiky”): dày hơn classic, mềm và tự nhiên hơn một bộ volume phủ kín.",
        "The look: singles stand out as fine defined spikes, fine fans fill in between. A textured, slightly “spiky” lash line: fuller than classic, softer and more natural than a full volume set.",
        "Ilme: yksittäiset ripset erottuvat terävinä piikkeinä, ohuet viuhkat täyttävät välit. Tekstuurinen, hieman ”spiky” ripsiraja: tuuheampi kuin klassiset, pehmeämpi ja luonnollisempi kuin täysi volyymi."
      ),
      l3(
        "Hợp với: khách có mi thưa, có khoảng trống hoặc mi không đều; và khách đã quen classic, muốn dày hơn nhưng chưa muốn volume — nhiều khách đi từ classic sang hybrid rồi mới đến volume.",
        "Suits: clients with sparse, gappy or uneven natural lashes; and clients used to classic who want more but not yet volume — many move from classic to hybrid and only later to volume.",
        "Sopii: asiakkaille, joiden omat ripset ovat harvat, aukkoiset tai epätasaiset, sekä klassisiin tottuneille, jotka haluavat enemmän mutta eivät vielä volyymia — moni siirtyy klassisista hybridiin ja vasta myöhemmin volyymiin."
      ),
      l3(
        "Chọn theo từng sợi mi thật, không theo khuôn: sợi khoẻ, dài, dày có thể mang một fan nhẹ; sợi mảnh, ngắn hay sợi non chỉ mang sợi đơn thật mảnh, thật ngắn; sợi non quá yếu thì để trống đến lần dặm sau.",
        "Decide lash by lash, not by a pattern: a strong, long, thick lash can carry a light fan; a fine, short or young lash only a very fine, short single; a lash too weak is left bare until the next refill.",
        "Päätä ripsi kerrallaan, ei kaavan mukaan: vahva, pitkä ja paksu ripsi voi kantaa kevyen viuhkan; ohut, lyhyt tai nuori ripsi vain hyvin ohuen, lyhyen yksittäisen ripsen; liian heikko ripsi jätetään paljaaksi seuraavaan huoltoon."
      ),
      l3(
        "Tỉ lệ phối hay được nhắc là khoảng nửa nửa, hoặc fan chiếm khoảng 30–50 %. Đó là điểm xuất phát, không phải luật: mi nhiều sợi khoẻ thì nhiều fan hơn, mi yếu thì nhiều sợi đơn mảnh hơn.",
        "The mix is often quoted as about half and half, or fans making up around 30–50 %. That is a starting point, not a rule: many strong lashes allow more fans, weak lashes call for more fine singles.",
        "Sekoitussuhteeksi mainitaan usein noin puolet ja puolet tai viuhkoja noin 30–50 %. Se on lähtökohta, ei sääntö: vahvoja ripsiä paljon, viuhkoja enemmän; heikot ripset, enemmän ohuita yksittäisiä ripsiä."
      ),
      l3(
        "Làm theo nhịp cứng (đơn, fan, đơn, fan) mà không nhìn mi thật dễ đặt fan lên sợi non yếu: sợi đó rụng sớm, và mi thưa đi đúng chỗ vốn đã thưa. Nhịp đều là tốt, nhưng nhịp phải theo mi thật.",
        "A rigid rhythm (single, fan, single, fan) that ignores the natural lashes easily puts a fan on a weak young lash: it sheds early and the lash line thins exactly where it was already sparse. An even rhythm is good, but it must follow the natural lashes.",
        "Jäykkä rytmi (yksittäinen, viuhka, yksittäinen, viuhka), joka ei katso omia ripsiä, laittaa helposti viuhkan heikkoon nuoreen ripseen: se irtoaa aikaisin ja ripsiraja harvenee juuri siellä, missä se oli jo harva. Tasainen rytmi on hyvä, mutta sen on seurattava omia ripsiä."
      ),
      l3(
        "Độ tơi từ độ dài: sợi đơn dài hơn fan một chút cho mũi nhọn rõ, nét sắc; sợi đơn bằng hoặc ngắn hơn fan cho nét mềm, bông, có chiều sâu. Cả hai đều đúng — chọn theo kiểu đã thống nhất với khách, chỉ chênh một chút.",
        "Texture from length: singles slightly longer than the fans give clear spikes and a sharper look; singles the same length or slightly shorter give a softer, fluffier look with depth. Both are right — choose by the look agreed with the client, and keep the difference small.",
        "Tekstuuri pituuksilla: viuhkoja hieman pidemmät yksittäiset ripset antavat selvät piikit ja terävämmän ilmeen; samanpituiset tai hieman lyhyemmät pehmeämmän, pörröisemmän ja syvemmän ilmeen. Molemmat ovat oikein — valitse asiakkaan kanssa sovitun ilmeen mukaan ja pidä ero pienenä."
      ),
      l3(
        "Rải fan và sợi đơn đều khắp hàng mi; fan dồn vào một chỗ làm mi loang lổ. Làm theo vùng, lùi ra nhìn tổng thể sau mỗi vùng, và so cả hai mắt.",
        "Spread fans and singles evenly along the whole lash line; fans bunched in one place look patchy. Work zone by zone, step back after each zone, and compare both eyes.",
        "Jaa viuhkat ja yksittäiset ripset tasaisesti koko ripsirajalle; yhteen kohtaan kasautuneet viuhkat näyttävät laikukkailta. Työskentele alue kerrallaan, katso kokonaisuutta jokaisen alueen jälkeen ja vertaa molempia silmiä."
      ),
      l3(
        "An toàn như classic và volume: tách đúng một sợi, không dính chùm, gắn cách da mí khoảng 0,5–1 mm, không bao giờ chạm da, giọt keo nhỏ. Dặm thường sau 2–3 tuần — lúc dặm, đọc lại mi thật: sợi non lần trước có thể đã đủ khoẻ để mang fan.",
        "Safety as in classic and volume: isolate one lash, no stickies, about 0.5–1 mm from the lid, never on the skin, a small drop of glue. Refills usually every 2–3 weeks — at each refill read the natural lashes again: last time's young lash may now be strong enough for a fan.",
        "Turvallisuus kuten klassisissa ja volyymissa: eristä yksi ripsi, ei tarttumia, noin 0,5–1 mm luomesta, ei koskaan iholle, pieni liimapisara. Huolto yleensä 2–3 viikon välein — arvioi omat ripset joka kerta uudelleen: viime kerran nuori ripsi voi nyt kantaa viuhkan."
      ),
    ],
    tips: [
      l3(
        "Cho khách xem hình hybrid trước khi làm và nói rõ: đây là kiểu tơi, có kết cấu, không phải hàng mi đen kín như volume. Mi khách thưa thì nói trước rằng lần này phối nhiều sợi đơn hơn để mi thật được khoẻ.",
        "Show the client hybrid photos before you start and say clearly: this is a textured look, not the solid dark line of volume. If their lashes are sparse, say up front that this time you will use more singles to keep the natural lashes healthy.",
        "Näytä asiakkaalle hybridikuvia ennen aloitusta ja kerro selvästi: tämä on tekstuurinen ilme, ei volyymin tasaisen tumma ripsiraja. Jos omat ripset ovat harvat, kerro etukäteen, että käytät tällä kertaa enemmän yksittäisiä ripsiä, jotta omat ripset pysyvät terveinä."
      ),
      l3(
        "Trong VaraaAi, ghi vào hồ sơ khách kiểu đã chọn (sợi đơn dài hay ngắn hơn fan, khoảng bao nhiêu fan) để lần dặm sau, dù thợ khác làm, bộ mi vẫn giữ đúng kiểu.",
        "In VaraaAi, note the chosen look in the client's profile (singles longer or shorter than the fans, roughly how many fans) so the next refill keeps the same style, even with another technician.",
        "Kirjaa VaraaAi:ssa valittu tyyli asiakkaan tietoihin (yksittäiset ripset viuhkoja pidempiä vai lyhyempiä, viuhkojen osuus), jotta seuraava huolto pitää saman tyylin, vaikka tekijä vaihtuisi."
      ),
    ],
    quiz: [
      {
        q: l3("Trong hybrid, một sợi mi thật mang gì?", "In a hybrid set, what does one natural lash carry?", "Mitä yksi luomuripsi kantaa hybridiripsissä?"),
        options: [
          l3("Một sợi đơn và một fan cùng lúc, cho dày", "A single and a fan together, for fullness", "Yksittäisen ripsen ja viuhkan yhtä aikaa tuuheuden vuoksi"),
          l3("Hoặc một sợi đơn, hoặc một fan — chỉ một thứ", "Either one single or one fan — only one", "Joko yhden yksittäisen ripsen tai yhden viuhkan — vain toisen"),
          l3("Một fan ôm hai sợi mi thật bên cạnh nhau", "One fan wrapped around two neighbouring lashes", "Yhden viuhkan, joka kietoutuu kahteen vierekkäiseen ripseen"),
        ],
        answer: 1,
        why: l3(
          "Hybrid chỉ phối hai kiểu trên cùng một mắt; quy tắc một sợi mi thật mang một thứ, tách riêng, vẫn giữ nguyên như classic và volume.",
          "Hybrid only mixes the two styles across the eye; the rule of one thing per natural lash, fully isolated, stays exactly as in classic and volume.",
          "Hybridi vain yhdistää kaksi tyyliä samassa silmässä; sääntö yksi asia yhteen eristettyyn luomuripseen pysyy samana kuin klassisissa ja volyymissa."
        ),
      },
      {
        q: l3("Một sợi mi thật non, ngắn và mảnh. Bạn đặt gì lên nó?", "A natural lash is young, short and fine. What do you put on it?", "Luomuripsi on nuori, lyhyt ja ohut. Mitä laitat siihen?"),
        options: [
          l3("Một sợi đơn thật mảnh, thật ngắn — hoặc để trống nếu quá yếu", "A very fine, short single — or nothing if it is too weak", "Hyvin ohuen, lyhyen yksittäisen ripsen — tai ei mitään, jos se on liian heikko"),
          l3("Một fan, để che chỗ mi thưa", "A fan, to cover the sparse spot", "Viuhkan, joka peittää harvan kohdan"),
          l3("Theo nhịp: nếu đến lượt fan thì gắn fan", "Follow the pattern: if it is a fan's turn, a fan", "Kaavan mukaan: jos on viuhkan vuoro, viuhkan"),
        ],
        answer: 0,
        why: l3(
          "Sức của sợi mi thật quyết định. Fan đặt lên sợi non yếu kéo sợi đó rụng sớm và làm mi thưa thêm; khoảng trống được che bằng fan trên những sợi khoẻ xung quanh.",
          "The strength of the natural lash decides. A fan on a weak young lash makes it shed early and thins the lashes further; gaps are covered with fans on the strong lashes around them.",
          "Luomuripsen vahvuus ratkaisee. Viuhka heikossa nuoressa ripsessä saa sen irtoamaan aikaisin ja harventaa ripsiä lisää; aukot peitetään viuhkoilla ympärillä olevissa vahvoissa ripsissä."
        ),
      },
      {
        q: l3("Tỉ lệ fan khoảng 30–50 % nên được hiểu thế nào?", "How should a fan share of about 30–50 % be understood?", "Miten noin 30–50 %:n viuhkaosuus pitäisi ymmärtää?"),
        options: [
          l3("Luật bắt buộc cho mọi bộ hybrid", "A fixed rule for every hybrid set", "Pakollisena sääntönä jokaiselle hybridisetille"),
          l3("Càng nhiều fan càng đẹp, con số chỉ là tối thiểu", "The more fans the better; the figure is just a minimum", "Mitä enemmän viuhkoja, sitä parempi; luku on vain minimi"),
          l3("Điểm xuất phát, điều chỉnh theo mi thật của khách", "A starting point, adjusted to the client's natural lashes", "Lähtökohtana, jota säädetään asiakkaan omien ripsien mukaan"),
        ],
        answer: 2,
        why: l3(
          "Mi nhiều sợi khoẻ thì có thể nhiều fan hơn, mi yếu thì nhiều sợi đơn mảnh hơn. Con số đẹp nhất là con số mi thật của khách chịu được.",
          "Many strong lashes allow more fans, weak lashes call for more fine singles. The best figure is the one the client's natural lashes can carry.",
          "Vahvoja ripsiä paljon, viuhkoja voi olla enemmän; heikot ripset, enemmän ohuita yksittäisiä ripsiä. Paras luku on se, jonka asiakkaan omat ripset kestävät."
        ),
      },
    ],
  },
  {
    slug: "mi-hybrid",
    course: "p-lash",
    style: "practice",
    title: l3("Nối mi hybrid: thực hành từng bước", "Hybrid lashes: step by step", "Hybridiripset: vaihe vaiheelta"),
    summary: l3(
      "Một bộ mi hybrid từng bước: tư vấn và chọn kiểu, chuẩn bị như bài classic, đọc mi thật từng vùng để quyết định chỗ sợi đơn và chỗ fan, sắp bàn với cả hai loại mi, chia độ dài, gắn sợi đơn lên mi yếu và fan lên mi khoẻ, đan xen cho đều, kiểm tra dính chùm và chỗ trống, so hai mắt, hoàn thiện và dọn dẹp.",
      "A hybrid set step by step: consultation and choosing the look, prep as in the classic lesson, reading the natural lashes zone by zone to decide where singles and where fans go, a station with both kinds of lashes, mapping the lengths, singles on weaker lashes and fans on strong ones, an even mix, checking for stickies and gaps, comparing both eyes, finishing and clearing up.",
      "Hybridiripset vaihe vaiheelta: konsultaatio ja tyylin valinta, valmistelu kuten klassisten tunnilla, omien ripsien arviointi alue kerrallaan (mihin yksittäiset, mihin viuhkat), työpiste molemmilla ripsityypeillä, pituuksien suunnittelu, yksittäiset ripset heikompiin ja viuhkat vahvoihin ripsiin, tasainen sekoitus, tarttumien ja aukkojen tarkistus, silmien vertailu, viimeistely ja siivous."
    ),
    video: video("mi-hybrid", 281, "2026-11-17"),
    notice: l3(
      "Khoảng cách, độ dài, số sợi và tỉ lệ phối trong bài là hướng dẫn chung theo kinh nghiệm nghề; luôn chọn theo mi thật của khách và theo bảng của hãng mi, hướng dẫn của hãng keo (độ ẩm, nhiệt độ, thời gian giữ khô). Mắt khách nhắm kín suốt buổi, keo không được chạm da. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Distances, lengths, lashes per fan and the mix here are general trade guidance; always decide by the client's natural lashes and follow the lash maker's chart and the glue maker's instructions (humidity, temperature, how long to keep lashes dry). The client's eyes stay closed throughout, and glue must never touch the skin. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Etäisyydet, pituudet, ripsimäärät ja sekoitussuhde ovat yleisiä alan ohjeita; päätä aina asiakkaan omien ripsien mukaan ja noudata ripsivalmistajan taulukkoa ja liimavalmistajan ohjeita (kosteus, lämpötila, kuinka kauan ripset pidetään kuivina). Asiakkaan silmät pysyvät kiinni koko ajan, eikä liima saa koskaan koskea ihoa. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["khach-hang", "dich-vu", "lich-hen"],
    steps: [
      l3(
        "Tư vấn và chọn kiểu: hỏi về dị ứng và mắt như bài classic, cho khách xem hình hybrid, thống nhất sợi đơn dài hơn fan một chút (nét sắc) hay bằng hoặc ngắn hơn (nét mềm).",
        "Consultation and the look: ask about allergies and the eyes as in the classic lesson, show hybrid photos, and agree whether the singles are slightly longer than the fans (sharper) or the same or shorter (softer).",
        "Konsultaatio ja tyyli: kysy allergioista ja silmistä kuten klassisten tunnilla, näytä hybridikuvia ja sovi, ovatko yksittäiset ripset hieman viuhkoja pidempiä (terävämpi) vai saman pituisia tai lyhyempiä (pehmeämpi)."
      ),
      l3(
        "Chuẩn bị giống hệt bài thực hành classic: khách nằm thoải mái, làm sạch mi, miếng lót dưới mắt, chải mi.",
        "Prep exactly as in the classic practice lesson: client comfortable, lashes cleansed, under-eye pads, lashes brushed.",
        "Valmistelu täsmälleen kuten klassisten käytäntötunnilla: asiakas mukavasti, ripset puhdistettu, silmänalustyynyt, ripset harjattu."
      ),
      l3(
        "Đọc mi thật từng vùng (đầu, giữa, đuôi mắt): sợi dài, dày, khoẻ là chỗ cho fan; sợi mảnh, ngắn là chỗ cho sợi đơn thật nhẹ; sợi non quá yếu để trống. Để ý khoảng trống: fan trên những sợi khoẻ quanh đó giúp che.",
        "Read the natural lashes zone by zone (inner, middle, outer): long, thick, strong lashes are for fans; fine, short ones for a very light single; a lash too young and weak is left bare. Note the gaps: fans on the strong lashes around them help cover them.",
        "Arvioi omat ripset alue kerrallaan (sisä-, keski-, ulko-osa): pitkät, paksut ja vahvat ripset viuhkoille; ohuet ja lyhyet hyvin kevyelle yksittäiselle ripselle; liian nuori ja heikko ripsi jätetään paljaaksi. Huomaa aukot: viuhkat niiden ympärillä olevissa vahvoissa ripsissä auttavat peittämään ne."
      ),
      l3(
        "Bàn làm việc: một vỉ sợi classic và một vỉ sợi volume thật mảnh, xếp theo độ dài; đá ngọc với giọt keo mới; nhíp thẳng để tách, nhíp đầu cong cho sợi đơn, nhíp volume gập góc để tạo fan; đồ dùng một lần; chai keo đậy nắp ngay.",
        "Station: a tile of classic lashes and a tile of very fine volume lashes, sorted by length; a jade stone with a fresh drop of glue; a straight tweezer for isolating, a curved one for singles, an angled volume tweezer for fans; single-use items; the glue bottle closed at once.",
        "Työpiste: alusta klassisille ja alusta hyvin ohuille volyymiripsille pituusjärjestyksessä; jadekivi ja tuore liimapisara; suorat pinsetit eristykseen, kaarevat yksittäisille ripsille, kulmikkaat volyymipinsetit viuhkoille; kertakäyttövälineet; liimapullo suljetaan heti."
      ),
      l3(
        "Chia độ dài: thường ngắn ở góc trong, dài dần về đuôi mắt (kiểu theo dáng mắt: bài lash mapping). Chọn sẵn độ dài cho sợi đơn và cho fan ở mỗi vùng; chỉ chênh nhau một chút.",
        "Map the lengths: usually short at the inner corner and gradually longer towards the outer corner (styles for eye shapes: the lash-mapping lesson). Choose the single and fan lengths for each zone in advance; keep the difference small.",
        "Suunnittele pituudet: yleensä lyhyet sisänurkassa ja vähitellen pidemmät ulkonurkkaa kohti (silmänmuodon mukaiset tyylit: ripsikartoituksen tunti). Valitse yksittäisten ripsien ja viuhkojen pituudet kullekin alueelle etukäteen; pidä ero pienenä."
      ),
      l3(
        "Sợi đơn lên sợi mi yếu hơn: tách đúng một sợi, chọn sợi classic mảnh và ngắn vừa sức, chỉ chạm chân sợi vào mép giọt keo, đặt dọc sợi mi thật cách da mí khoảng 0,5–1 mm, giữ yên cho keo bắt rồi nhả nhíp.",
        "Singles on the weaker lashes: isolate exactly one lash, pick a fine, short classic lash it can carry, touch only its base into the edge of the drop, lay it along the natural lash about 0.5–1 mm from the lid, hold still until the glue grabs, then release.",
        "Yksittäiset ripset heikompiin ripsiin: eristä täsmälleen yksi ripsi, valitse ohut ja lyhyt klassinen ripsi, jonka se kantaa, kosketa vain sen kannalla pisaran reunaa, aseta luomuripsen suuntaisesti noin 0,5–1 mm luomesta, pidä paikallaan kunnes liima tarttuu ja irrota."
      ),
      l3(
        "Fan lên sợi mi khoẻ: tạo fan như bài thực hành volume (chân nhỏ, gọn, xoè đều; trong hybrid thường là fan ít sợi, nhẹ), chỉ chạm chân fan vào keo, chân fan ôm quanh sợi mi đã tách, cùng hướng mọc, không chạm da.",
        "Fans on the strong lashes: make the fan as in the volume practice lesson (narrow, neat base, even spread; in hybrid usually a light fan of few lashes), touch only the base into the glue, wrap the base around the isolated lash in its growth direction, never on the skin.",
        "Viuhkat vahvoihin ripsiin: tee viuhka kuten volyymin käytäntötunnilla (kapea, siisti kanta, tasainen levitys; hybridissä yleensä kevyt, harvaripsinen viuhka), kosketa liimaan vain kannalla, kiedo kanta eristetyn ripsen ympärille kasvusuunnassa, ei koskaan iholle."
      ),
      l3(
        "Đan xen và giữ đều: không gắn hết fan rồi mới gắn sợi đơn; làm từng vùng theo mi thật, gắn xen kẽ đuôi, giữa, đầu mắt cho keo khô; sau mỗi vùng lùi ra nhìn xem fan có dồn vào một chỗ không.",
        "Mix and keep it even: don't place all the fans first and the singles later; work zone by zone following the natural lashes, alternating outer, middle and inner so the glue can dry; after each zone step back and check the fans are not bunched in one place.",
        "Sekoita ja pidä tasaisena: älä laita ensin kaikkia viuhkoja ja sitten yksittäisiä; etene alue kerrallaan omien ripsien mukaan ja vuorottele ulko-, keski- ja sisäosaa, jotta liima ehtii kuivua; katso jokaisen alueen jälkeen, etteivät viuhkat kasaannu yhteen kohtaan."
      ),
      l3(
        "Kiểm tra: lướt nhíp thẳng từ chân ra ngọn, mỗi sợi đơn và mỗi fan phải đứng riêng trên một sợi mi thật; thấy dính tách ngay; nhìn từ trên xuống và từ cạnh bên; chỗ trống có sợi mi khoẻ thì bổ sung. So hai mắt từ đầu giường: độ dài, độ dày, độ cong và độ đậm ở đuôi mắt phải giống nhau.",
        "Check: run the straight tweezer from base to tip — every single and every fan must stand alone on one natural lash; separate any sticky at once; look from above and from the side; fill gaps where a strong lash is free. Compare both eyes from the head of the bed: length, fullness, curl and density at the outer corners must match.",
        "Tarkista: vedä suorilla pinseteillä tyvestä kärkeen — jokaisen yksittäisen ripsen ja viuhkan on oltava yksin yhdessä luomuripsessä; erota tarttumat heti; katso ylhäältä ja sivulta; täydennä aukot, joissa on vapaa vahva ripsi. Vertaa silmiä sängyn päästä: pituuden, tuuheuden, taivutuksen ja ulkonurkan tummuuden on vastattava toisiaan."
      ),
      l3(
        "Hoàn thiện: chải mi, gỡ miếng lót khi mắt khách vẫn nhắm, mở mắt từ từ; dặn dò như bài classic và hẹn dặm sau khoảng 2–3 tuần. Đồ dùng một lần bỏ thùng có nắp; nhíp làm sạch và khử khuẩn sau mỗi khách.",
        "Finish: brush the lashes, remove the pads while the eyes are still closed, open slowly; aftercare as in the classic lesson and book a refill in about 2–3 weeks. Single-use items into a lidded bin; tweezers cleaned and disinfected after every client.",
        "Viimeistely: harjaa ripset, poista tyynyt silmien ollessa vielä kiinni, avaus hitaasti; jälkihoito kuten klassisten tunnilla ja huolto noin 2–3 viikon päähän. Kertakäyttötuotteet kannelliseen roska-astiaan; pinsetit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen."
      ),
    ],
    tips: [
      l3(
        "Mi thật hai bên thường không giống hệt nhau, nên cách phối mỗi bên có thể hơi khác. Cái cần giống là vẻ ngoài khi khách mở mắt — so hai mắt trước khi gỡ miếng lót.",
        "Natural lashes are rarely identical on both sides, so the mix may differ a little per eye. What must match is the look when the client opens her eyes — compare both eyes before removing the pads.",
        "Omat ripset ovat harvoin täsmälleen samanlaiset molemmissa silmissä, joten sekoitus voi hieman vaihdella. Ilmeen on vastattava toisiaan, kun asiakas avaa silmänsä — vertaa silmiä ennen tyynyjen poistoa."
      ),
      l3(
        "Hybrid thường lâu hơn classic vì phải đổi nhíp và đổi loại mi liên tục. Trong VaraaAi, đặt thời lượng dịch vụ hybrid và dặm hybrid theo tốc độ thật của thợ, và hẹn lịch dặm trước khi khách về.",
        "Hybrid usually takes longer than classic because you keep switching tweezers and lash types. In VaraaAi, set the hybrid and hybrid-refill service durations to the technician's real pace, and book the refill before the client leaves.",
        "Hybridi kestää yleensä kauemmin kuin klassiset, koska pinsettejä ja ripsityyppiä vaihdetaan jatkuvasti. Aseta VaraaAi:ssa hybridin ja hybridihuollon kesto tekijän todellisen tahdin mukaan ja varaa huolto ennen kuin asiakas lähtee."
      ),
    ],
    quiz: [
      {
        q: l3("Trước khi gắn sợi nào, bước quyết định của một bộ hybrid là gì?", "Before placing anything, what is the deciding step of a hybrid set?", "Mikä on hybridisetin ratkaiseva vaihe ennen kuin mitään kiinnitetään?"),
        options: [
          l3("Chọn sẵn một nhịp cố định: đơn, fan, đơn, fan", "Picking a fixed pattern: single, fan, single, fan", "Kiinteän kaavan valinta: yksittäinen, viuhka, yksittäinen, viuhka"),
          l3("Lấy thật nhiều keo lên đá cho đủ cả buổi", "Putting plenty of glue on the stone for the whole session", "Runsaan liiman annostelu kivelle koko käsittelyä varten"),
          l3("Đọc mi thật từng vùng để biết sợi nào khoẻ, sợi nào yếu", "Reading the natural lashes zone by zone to see which are strong and which weak", "Omien ripsien arviointi alue kerrallaan: mitkä ovat vahvoja, mitkä heikkoja"),
        ],
        answer: 2,
        why: l3(
          "Sợi khoẻ có thể mang fan, sợi yếu chỉ mang sợi đơn nhẹ hoặc để trống. Nhịp cố định không nhìn mi thật dễ đặt fan lên sợi non; giọt keo thì lấy nhỏ và thay mới thường xuyên.",
          "Strong lashes can carry a fan, weak ones only a light single or nothing. A fixed pattern ignores the natural lashes and easily puts a fan on a young lash; glue is taken in small, fresh drops.",
          "Vahvat ripset voivat kantaa viuhkan, heikot vain kevyen yksittäisen ripsen tai ei mitään. Kiinteä kaava ei katso omia ripsiä ja laittaa helposti viuhkan nuoreen ripseen; liimaa otetaan pieninä, tuoreina pisaroina."
        ),
      },
      {
        q: l3("Bạn lùi ra nhìn và thấy fan dồn hết vào giữa mắt, hai đầu chỉ có vài sợi đơn. Điều đó có nghĩa là gì?", "You step back and see the fans bunched in the middle and only a few singles at both ends. What does that mean?", "Katsot kauempaa ja huomaat viuhkojen kasautuneen keskelle ja päihin vain muutaman yksittäisen ripsen. Mitä se tarkoittaa?"),
        options: [
          l3("Hàng mi sẽ loang lổ; cần rải fan đều theo từng vùng", "The lash line will look patchy; fans need spreading evenly zone by zone", "Ripsiraja näyttää laikukkaalta; viuhkat on jaettava tasaisesti alue kerrallaan"),
          l3("Đó là kiểu hybrid chuẩn", "That is the standard hybrid look", "Se on tavallinen hybridi-ilme"),
          l3("Cần thêm fan ở giữa cho cân", "More fans are needed in the middle to balance it", "Keskelle tarvitaan lisää viuhkoja tasapainoksi"),
        ],
        answer: 0,
        why: l3(
          "Hybrid đẹp khi fan và sợi đơn rải đều khắp hàng mi, theo mi thật của từng vùng. Fan dồn một chỗ làm giữa đậm thành mảng, hai đầu thưa.",
          "Hybrid looks right when fans and singles are spread evenly along the lash line, following each zone's natural lashes. Fans bunched in one place make a heavy block in the middle and sparse ends.",
          "Hybridi näyttää oikealta, kun viuhkat ja yksittäiset ripset jakautuvat tasaisesti koko ripsirajalle kunkin alueen omien ripsien mukaan. Yhteen kohtaan kasautuneet viuhkat tekevät keskelle raskaan läikän ja harvat päät."
        ),
      },
      {
        q: l3("Sợi đơn và fan nên cách da mí bao xa?", "How far from the eyelid skin should singles and fans be placed?", "Kuinka kauas luomen ihosta yksittäiset ripset ja viuhkat kiinnitetään?"),
        options: [
          l3("Sát da, cho chắc", "Right on the skin, for hold", "Aivan ihoon pitävyyden vuoksi"),
          l3("Khoảng 0,5–1 mm, không bao giờ chạm da", "About 0.5–1 mm, never touching the skin", "Noin 0,5–1 mm, ei koskaan iholle"),
          l3("Fan sát da, sợi đơn xa hơn", "Fans on the skin, singles further out", "Viuhkat ihoon, yksittäiset kauemmas"),
        ],
        answer: 1,
        why: l3(
          "Quy tắc như classic và volume: keo chạm da gây cộm, ngứa, có khi kích ứng, và kéo sợi mi khi mọc; gắn quá xa thì sợi nối lỏng và rụng sớm.",
          "The same rule as classic and volume: glue on the skin causes discomfort, itching, sometimes irritation, and pulls the lash as it grows; too far out and the extension is loose and falls early.",
          "Sama sääntö kuin klassisissa ja volyymissa: iholle joutunut liima aiheuttaa epämukavuutta, kutinaa, joskus ärsytystä, ja vetää ripseä sen kasvaessa; liian kaukana pidennys on löysä ja irtoaa aikaisin."
        ),
      },
    ],
  },
  {
    slug: "mi-mapping-hieu-dung",
    course: "p-lash",
    style: "theory",
    title: l3("Lash mapping: hiểu đúng để chọn kiểu hợp dáng mắt", "Lash mapping: understand it to choose a style that suits the eye", "Ripsikartoitus: ymmärrä se, niin valitset silmänmuotoon sopivan tyylin"),
    summary: l3(
      "Mapping là gì (lên kế hoạch độ dài và độ cong theo từng vùng trước khi gắn), cách đọc dáng mắt, mi thật và mong muốn của khách, các kiểu chính (tự nhiên, búp bê, mắt mèo, sóc, mắt cáo) và kiểu nào thường hợp với dáng mắt nào, độ cong J, B, C, CC, D, L, vì sao hướng mọc của mi thật quyết định độ cong, cân đối hai mắt, và tư vấn thật lòng trước khi làm.",
      "What mapping is (planning length and curl zone by zone before you start), reading the eye shape, the natural lashes and the client's wish, the main styles (natural, doll, cat-eye, squirrel, fox) and which usually suit which eye, curl types J, B, C, CC, D, L, why the natural lash direction decides the curl, symmetry between the eyes, and honest consultation before starting.",
      "Mitä kartoitus on (pituuksien ja taivutusten suunnittelu alue kerrallaan ennen aloitusta), silmänmuodon, luomuripsien ja asiakkaan toiveen arviointi, päätyylit (luonnollinen, doll, cat eye, squirrel, fox) ja mikä sopii yleensä millekin silmälle, taivutukset J, B, C, CC, D, L, miksi luomuripsen kasvusuunta ratkaisee taivutuksen, silmien symmetria ja rehellinen konsultaatio ennen aloitusta."
    ),
    video: video("mi-mapping-hieu-dung", 320, "2026-11-17"),
    notice: l3(
      "Các kiểu mi và gợi ý theo dáng mắt trong bài là xu hướng chung theo kinh nghiệm nghề, không phải luật cứng; tên gọi và độ cong khác nhau đôi chút theo từng hãng. Luôn chọn theo đôi mắt và sức mi thật của từng khách, và theo hướng dẫn của hãng mi và hãng keo. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "The styles and eye-shape suggestions here are general trade tendencies, not fixed rules; names and curls differ a little between brands. Always choose for each client's eyes and the strength of their natural lashes, and follow the lash and glue makers' instructions. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Tunnin tyylit ja silmänmuotoihin liittyvät ehdotukset ovat alan yleisiä suuntauksia, eivät ehdottomia sääntöjä; nimet ja taivutukset vaihtelevat hieman merkeittäin. Valitse aina asiakkaan silmien ja luomuripsien vahvuuden mukaan ja noudata ripsi- ja liimavalmistajan ohjeita. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["khach-hang", "dich-vu", "lich-hen"],
    steps: [
      l3(
        "Mapping là lên kế hoạch trước khi gắn sợi đầu tiên: chia hàng mi thành vài vùng từ đầu mắt đến đuôi mắt và ghi độ dài, độ cong cho từng vùng. Có bản đồ thì hai mắt ra giống nhau và kết quả đúng như đã thống nhất.",
        "Mapping is planning before the first lash: divide the lash line into zones from the inner to the outer corner and note the length and curl for each. With a map, both eyes match and the result is what you agreed.",
        "Kartoitus on suunnittelua ennen ensimmäistä ripseä: jaa ripsirivi alueisiin sisänurkasta ulkonurkkaan ja merkitse kullekin pituus ja taivutus. Kartan avulla silmät vastaavat toisiaan ja lopputulos on sovitun mukainen."
      ),
      l3(
        "Đọc dáng mắt khi khách ngồi, mở mắt, nhìn thẳng: hạnh nhân, tròn, sụp mí, một mí, mắt cụp, mắt xếch, mắt sâu, hai mắt gần hay xa nhau. Khi nằm nhắm mắt, mắt nào trông cũng gần giống nhau.",
        "Read the eye shape with the client sitting, eyes open, looking straight ahead: almond, round, hooded, monolid, downturned, upturned, deep-set, close-set or wide-set. Lying down with eyes closed, all eyes look much the same.",
        "Arvioi silmänmuoto asiakkaan istuessa silmät auki ja katse suoraan eteenpäin: manteli, pyöreä, raskas luomi, yksiluomi, alaspäin tai ylöspäin kääntyvä, syvällä oleva, lähekkäin tai kaukana toisistaan olevat silmät. Makuulla silmät kiinni kaikki silmät näyttävät lähes samoilta."
      ),
      l3(
        "Đọc mi thật: dài hay ngắn, khoẻ hay mảnh, mọc chúc xuống, thẳng hay cong sẵn, chỗ nào thưa. Sợi nối không bao giờ dài hơn, nặng hơn sức mi thật chịu được (bài classic).",
        "Read the natural lashes: long or short, strong or fine, pointing down, straight or already curled, any gaps. An extension is never longer or heavier than the natural lash can carry (the classic lesson).",
        "Arvioi luomuripset: pitkät vai lyhyet, vahvat vai ohuet, alaspäin, suorat vai valmiiksi kaartuvat, onko aukkoja. Pidennys ei ole koskaan pidempi tai painavampi kuin luomuripsi kestää (klassisten tunti)."
      ),
      l3(
        "Hỏi mong muốn của khách: tự nhiên hay nổi bật, dịp gì, có đeo kính không (mi quá dài, quá cong sẽ chạm mắt kính). Dáng mắt, mi thật và mong muốn của khách cùng quyết định bản đồ.",
        "Ask about the client's wish: natural or striking, for what occasion, glasses or not (lashes that are too long or curled touch the lenses). Eye shape, natural lashes and the client's wish decide the map together.",
        "Kysy asiakkaan toive: luonnollinen vai näyttävä, mihin tilaisuuteen, onko silmälasit (liian pitkät tai kaartuvat ripset koskettavat linssejä). Silmänmuoto, luomuripset ja asiakkaan toive ratkaisevat kartan yhdessä."
      ),
      l3(
        "Tự nhiên: theo hàng mi thật, ngắn ở đầu mắt, dài dần một chút về đuôi; hợp hầu hết mọi người và an toàn cho lần đầu. Búp bê (mắt mở): dài nhất ở giữa, trên con ngươi; làm mắt to, tròn, sáng.",
        "Natural: follows the natural lash line, short at the inner corner, a little longer towards the outer corner; suits most people and is a safe first set. Doll (open-eye): longest in the centre, above the pupil; makes the eye look bigger, rounder and brighter.",
        "Luonnollinen: seuraa luomuripsien linjaa, lyhyt sisänurkassa, hieman pidempi ulkonurkkaa kohti; sopii useimmille ja on turvallinen ensimmäinen setti. Doll (open eye): pisin keskellä pupillin yläpuolella; silmä näyttää suuremmalta, pyöreämmältä ja kirkkaammalta."
      ),
      l3(
        "Mắt mèo: ngắn ở đầu mắt, dài nhất ở đuôi; kéo mắt dài ra và nâng nhẹ đuôi. Sóc: dài nhất khoảng một phần ba phía ngoài rồi ngắn lại một chút ở đúng đuôi. Mắt cáo: đầu và giữa ngắn, tự nhiên; phần ngoài dài hơn, thường cong hơn, hướng lên.",
        "Cat-eye: short at the inner corner, longest at the outer corner; elongates the eye and lifts the end slightly. Squirrel: peak around the outer third, then a little shorter at the very end. Fox: inner and middle short and natural; the outer part longer, usually more curled, pointing upwards.",
        "Cat eye: lyhyt sisänurkassa, pisin ulkonurkassa; pidentää silmää ja nostaa ulkonurkkaa hieman. Squirrel: pisin noin ulommalla kolmanneksella ja hieman lyhyempi aivan lopussa. Fox: sisä- ja keskiosa lyhyitä ja luonnollisia; ulko-osa pidempi, yleensä taipuisampi ja ylöspäin suuntautuva."
      ),
      l3(
        "Hợp với mắt nào (thường gặp, không phải luật): búp bê hợp mắt hạnh nhân, mắt nhỏ, mắt cụp, nhưng có thể làm mắt vốn tròn tròn quá; mắt mèo hợp mắt tròn, hai mắt gần nhau, nhưng có thể kéo mắt cụp xuống; hai mắt xa nhau thường nhấn ở đầu và giữa mắt; sụp mí và một mí thường cần cong nhiều hơn; mắt sâu cẩn thận với sợi quá dài, quá cong.",
        "Which suits which eye (usually, not a rule): doll suits almond, small and downturned eyes but can make an already round eye too round; cat-eye suits round and close-set eyes but can drag a downturned eye down; wide-set eyes are usually emphasised at the inner and middle part; hooded and monolid eyes usually need more curl; with deep-set eyes, beware of lashes that are too long or curled.",
        "Mikä sopii millekin (yleensä, ei sääntö): doll sopii manteli-, pienille ja alaspäin kääntyville silmille, mutta voi tehdä valmiiksi pyöreästä silmästä liian pyöreän; cat eye sopii pyöreille ja lähekkäisille silmille, mutta voi vetää alaspäin kääntyvää silmää alas; kaukana toisistaan olevissa silmissä korostetaan yleensä sisä- ja keskiosaa; raskas luomi ja yksiluomi tarvitsevat yleensä enemmän taivutusta; syvällä olevissa silmissä varo liian pitkiä tai kaartuvia ripsiä."
      ),
      l3(
        "Độ cong J, B, C, CC, D, L (và vài kiểu khác) đi từ gần thẳng đến cong nhiều; L có chân thẳng rồi mới cong lên. Mỗi hãng uốn hơi khác nhau, nên cùng một chữ có thể không giống hệt.",
        "Curls J, B, C, CC, D, L (and a few others) go from nearly straight to strongly curled; L has a flat base and then bends up. Each brand curls a little differently, so the same letter may not look identical.",
        "Taivutukset J, B, C, CC, D, L (ja muutama muu) etenevät lähes suorasta voimakkaasti kaartuvaan; L:ssä on suora tyvi, josta ripsi taittuu ylös. Jokainen merkki taivuttaa hieman eri tavalla, joten sama kirjain ei välttämättä näytä täysin samalta."
      ),
      l3(
        "Hướng mọc của mi thật quyết định độ cong: chân sợi nối phải áp dọc sợi mi thật. Mi thẳng hay chúc xuống mà gắn sợi quá cong thì chỉ chạm một điểm, bám kém, rụng sớm; mi đã cong sẵn mà gắn sợi quá thẳng thì sợi chĩa ra ngoài.",
        "The direction of the natural lash decides the curl: the base of the extension must lie along the natural lash. Too much curl on a straight or downward lash touches at one point only, holds poorly and falls early; too little curl on an already curled lash sticks out.",
        "Luomuripsen kasvusuunta ratkaisee taivutuksen: pidennyksen tyven on oltava luomuripsen myötäisesti. Liian kaartuva pidennys suoraan tai alaspäin kasvavassa ripsessä koskettaa vain yhdestä kohdasta, pysyy huonosti ja irtoaa aikaisin; liian suora valmiiksi kaartuvassa ripsessä sojottaa."
      ),
      l3(
        "Hai mắt hiếm khi giống hệt nhau: mục tiêu là kết quả cân đối, có khi phải chỉnh độ dài một bên. Cho khách xem ảnh mẫu, nói thật kiểu nào hợp và mi thật đỡ được đến đâu, thống nhất rồi mới làm.",
        "The two eyes are rarely identical: the goal is a result that looks symmetrical, sometimes by adjusting the length on one side. Show the client reference pictures, say honestly which style suits and what the natural lashes can carry, and start only once you agree.",
        "Silmät ovat harvoin täysin samanlaiset: tavoite on symmetriseltä näyttävä lopputulos, joskus säätämällä pituutta toisella puolella. Näytä asiakkaalle mallikuvia, kerro rehellisesti mikä tyyli sopii ja mitä luomuripset kestävät, ja aloita vasta kun olette samaa mieltä."
      ),
    ],
    tips: [
      l3(
        "Đừng chỉ làm theo ảnh khách mang đến. Nói rõ ảnh đó hợp hay không hợp với đôi mắt khách và vì sao; khách hiểu thì khách tin, và khách tin thì khách quay lại.",
        "Don't just copy the picture the client brings. Explain whether it suits their eyes and why; a client who understands trusts you, and a client who trusts you comes back.",
        "Älä vain kopioi asiakkaan tuomaa kuvaa. Kerro, sopiiko se hänen silmilleen ja miksi; ymmärtävä asiakas luottaa sinuun, ja luottava asiakas palaa."
      ),
      l3(
        "Ghi kiểu mi, độ dài và độ cong từng vùng vào “Ghi chú nội bộ” trong hồ sơ khách ở VaraaAi, để lần dặm sau bất kỳ thợ nào cũng làm lại đúng bản đồ.",
        "Write the style and the length and curl per zone in the client's internal notes in VaraaAi, so at the next refill any technician can repeat the same map.",
        "Kirjaa tyyli sekä pituus ja taivutus alueittain asiakkaan sisäisiin muistiinpanoihin VaraaAi:ssa, jotta seuraavassa huollossa kuka tahansa tekijä voi toistaa saman kartan."
      ),
    ],
    quiz: [
      {
        q: l3("Lash mapping là gì?", "What is lash mapping?", "Mitä ripsikartoitus on?"),
        options: [
          l3("Lên kế hoạch độ dài và độ cong theo từng vùng trước khi gắn", "Planning length and curl zone by zone before you start", "Pituuksien ja taivutusten suunnittelu alue kerrallaan ennen aloitusta"),
          l3("Chọn màu mi theo màu tóc", "Choosing the lash colour by the hair colour", "Ripsien värin valinta hiusten värin mukaan"),
          l3("Gắn sợi dài nhất có thể ở mọi vùng", "Using the longest possible lashes in every zone", "Mahdollisimman pitkät ripset joka alueelle"),
        ],
        answer: 0,
        why: l3(
          "Có bản đồ từ trước thì hai mắt ra giống nhau và kết quả đúng như đã thống nhất với khách.",
          "With a map made beforehand, both eyes match and the result is what you agreed with the client.",
          "Etukäteen tehdyn kartan avulla silmät vastaavat toisiaan ja lopputulos on asiakkaan kanssa sovittu."
        ),
      },
      {
        q: l3("Khách có mắt cụp muốn kiểu mắt mèo thật dài ở đuôi. Điều gì thường xảy ra?", "A client with downturned eyes wants a cat-eye with very long outer lashes. What usually happens?", "Asiakas, jonka silmät kääntyvät alaspäin, haluaa cat eye -tyylin hyvin pitkillä ulkoripsillä. Mitä yleensä tapahtuu?"),
        options: [
          l3("Đuôi mắt được nâng lên rõ rệt", "The outer corners are clearly lifted", "Ulkonurkat nousevat selvästi"),
          l3("Sợi dài, nặng ở đuôi kéo mắt xuống thêm, trông mệt hơn", "Long, heavy outer lashes drag the eye down further and it looks tired", "Pitkät, painavat ulkoripset vetävät silmää lisää alas ja se näyttää väsyneeltä"),
          l3("Không có gì khác, mọi kiểu đều hợp mọi mắt", "Nothing changes; every style suits every eye", "Ei mitään eroa; kaikki tyylit sopivat kaikille"),
        ],
        answer: 1,
        why: l3(
          "Với mắt cụp, thường nên đưa điểm dài nhất vào gần giữa (kiểu búp bê) và dùng độ cong nhiều hơn ở phần ngoài để nâng mắt.",
          "For downturned eyes it is usually better to move the longest point towards the centre (doll) and use more curl on the outer part to lift the eye.",
          "Alaspäin kääntyvissä silmissä pisin kohta siirretään yleensä lähemmäs keskustaa (doll) ja ulko-osaan käytetään enemmän taivutusta silmän nostamiseksi."
        ),
      },
      {
        q: l3("Mi thật của khách mọc thẳng, hơi chúc xuống. Gắn sợi độ cong rất mạnh thì sao?", "The client's natural lashes grow straight and slightly downward. What happens with a very strong curl?", "Asiakkaan luomuripset kasvavat suoraan ja hieman alaspäin. Mitä tapahtuu hyvin voimakkaalla taivutuksella?"),
        options: [
          l3("Mi giữ lâu hơn vì cong nhiều", "They last longer because of the curl", "Ne kestävät pidempään taivutuksen ansiosta"),
          l3("Không ảnh hưởng gì", "It makes no difference", "Sillä ei ole merkitystä"),
          l3("Chân sợi chỉ chạm một điểm nhỏ, bám kém và dễ rụng sớm", "The base touches at one small point only, holds poorly and falls early", "Tyvi koskettaa vain pienestä kohdasta, pysyy huonosti ja irtoaa helposti aikaisin"),
        ],
        answer: 2,
        why: l3(
          "Chân sợi nối phải áp dọc sợi mi thật. Với mi chúc xuống, có thợ chọn loại chân thẳng như L để chân ôm sợi mi rồi mới cong lên.",
          "The base of the extension must lie along the natural lash. For downward lashes some technicians choose a flat-base curl such as L, so the base hugs the lash before it bends up.",
          "Pidennyksen tyven on oltava luomuripsen myötäisesti. Alaspäin kasvaville ripsille jotkut valitsevat suoratyvisen taivutuksen kuten L, jolloin tyvi myötäilee ripseä ennen kuin taittuu ylös."
        ),
      },
    ],
  },
  {
    slug: "mi-mapping",
    course: "p-lash",
    style: "practice",
    title: l3("Lash mapping: thực hành vẽ bản đồ mi từng bước", "Lash mapping: drawing a lash map step by step", "Ripsikartoitus: ripsikartan piirtäminen vaihe vaiheelta"),
    summary: l3(
      "Vẽ một bản đồ mi rồi làm theo nó: tư vấn và chọn kiểu, chuẩn bị như bài classic, đo mi thật từ trên xuống, chia năm vùng trên miếng lót, ghi độ dài và độ cong từng vùng (ví dụ một kiểu mắt mèo nhẹ), làm bản đồ mắt kia theo kiểu soi gương, xếp vỉ mi theo bản đồ, gắn mi neo, kiểm tra dáng, lấp đầy, kiểm tra cân đối từ đầu giường và ghi bản đồ cho lần dặm sau.",
      "Draw a lash map and follow it: consult and agree on the style, prep as in the classic lesson, measure the natural lashes from above, divide the pad into five zones, note length and curl per zone (a soft cat-eye as the example), mirror the map on the other eye, set out the strips in map order, place anchor lashes, check the shape, fill in, check symmetry from the head of the bed and record the map for the next refill.",
      "Piirrä ripsikartta ja noudata sitä: konsultaatio ja tyylistä sopiminen, valmistelu kuten klassisten tunnilla, luomuripsien mittaus ylhäältä, tyynyn jako viiteen alueeseen, pituus ja taivutus alueittain (esimerkkinä pehmeä cat eye), kartta peilikuvana toiseen silmään, ripsinauhat kartan järjestykseen, ankkuriripset, muodon tarkistus, täyttö, symmetrian tarkistus sängyn päästä ja kartan kirjaaminen seuraavaa huoltoa varten."
    ),
    video: video("mi-mapping", 269, "2026-11-17"),
    notice: l3(
      "Các độ dài trong bài (8–12 mm, độ cong C) chỉ là ví dụ cho một khách; bản đồ thật luôn tuỳ đôi mắt và sức mi thật của từng khách. Chỉ dùng bút an toàn cho da trên miếng lót, không chạm mi và mắt. Theo bảng của hãng mi và hướng dẫn của hãng keo. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "The lengths in this lesson (8–12 mm, C curl) are only an example for one client; a real map always depends on each client's eyes and the strength of their natural lashes. Use only a skin-safe pen, on the pad only, never touching the lashes or the eye. Follow the lash maker's chart and the glue maker's instructions. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Tunnin pituudet (8–12 mm, C-taivutus) ovat vain esimerkki yhdelle asiakkaalle; todellinen kartta riippuu aina asiakkaan silmistä ja luomuripsien vahvuudesta. Käytä vain iholle turvallista kynää ja vain tyynyyn, ei koskaan ripsiin tai silmään. Noudata ripsivalmistajan taulukkoa ja liimavalmistajan ohjeita. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Tư vấn khi khách ngồi, mở mắt, nhìn thẳng: nhìn dáng mắt và mi thật, hỏi mong muốn, cho xem ảnh mẫu và giải thích kiểu nào hợp. Nhớ hai mốc: vị trí con ngươi và điểm cao nhất của lông mày. Thống nhất một kiểu rồi mới làm.",
        "Consult with the client sitting, eyes open, looking straight ahead: read the eye shape and natural lashes, ask what they want, show reference pictures and explain which style suits. Note two landmarks: the pupil and the highest point of the brow. Agree on one style before you start.",
        "Konsultoi asiakkaan istuessa silmät auki ja katse suoraan: arvioi silmänmuoto ja luomuripset, kysy toive, näytä mallikuvia ja kerro mikä tyyli sopii. Painaa mieleen kaksi kiintopistettä: pupilli ja kulmakarvan korkein kohta. Sovi yksi tyyli ennen aloitusta."
      ),
      l3(
        "Chuẩn bị như bài thực hành classic: khách nằm thoải mái, làm sạch mi, dán miếng lót thật phẳng và gọn (đó là tờ giấy để vẽ bản đồ), chải mi.",
        "Prep as in the classic practice lesson: client comfortable, lashes cleansed, under-eye pads smooth and neat (they are the paper for the map), lashes brushed.",
        "Valmistelu kuten klassisten käytäntötunnilla: asiakas mukavasti, ripset puhdistettu, silmänalustyynyt sileästi ja siististi (niihin piirretään kartta), ripset harjattu."
      ),
      l3(
        "Đo mi thật nhìn thẳng từ trên xuống, không nhìn nghiêng: ở đầu, giữa và đuôi mắt, đặt một sợi mi nối đã biết độ dài song song cạnh sợi mi thật để so (hoặc dùng thước đo mi nhỏ). Độ dài và sức mi thật là giới hạn của bản đồ.",
        "Measure the natural lashes looking straight down from above, not from the side: at the inner, middle and outer part, hold an extension of known length alongside a natural lash to compare (or use a small lash ruler). Their length and strength set the limit of the map.",
        "Mittaa luomuripset katsoen suoraan ylhäältä, ei sivulta: sisä-, keski- ja ulko-osassa pidä tunnetun pituinen pidennys luomuripsen vieressä vertailua varten (tai käytä pientä ripsiviivainta). Luomuripsien pituus ja vahvuus ovat kartan raja."
      ),
      l3(
        "Chia vùng: bút nét mảnh, không độc, an toàn cho da, vẽ vài vạch ngắn trên miếng lót, chia từ đầu mắt đến đuôi mắt thành năm vùng (hoặc dùng miếng dán mapping in sẵn). Bút chỉ chạm miếng lót. Đánh dấu thêm vị trí con ngươi.",
        "Zones: with a fine, non-toxic, skin-safe pen draw a few short lines on the pad, dividing inner to outer corner into five zones (or use printed mapping stickers). The pen touches only the pad. Also mark where the pupil is.",
        "Alueet: piirrä ohuella, myrkyttömällä, iholle turvallisella kynällä muutama lyhyt viiva tyynyyn ja jaa sisänurkasta ulkonurkkaan viiteen alueeseen (tai käytä valmiita kartoitustarroja). Kynä koskee vain tyynyä. Merkitse myös pupillin kohta."
      ),
      l3(
        "Ghi độ dài và độ cong cho từng vùng. Ví dụ một kiểu mắt mèo nhẹ: 8, 9, 10, 11, 12 mm từ đầu mắt đến đuôi, độ cong C — chỉ là ví dụ. Vùng nào mi yếu thì ngắn và nhẹ hơn; với kiểu mắt cáo có thể cong mạnh hơn ở vùng đuôi (ví dụ C sang D).",
        "Write the length and curl for each zone. Example for a soft cat-eye: 8, 9, 10, 11, 12 mm from inner to outer corner, C curl — an example only. Where the lashes are weak, go shorter and lighter; for a fox style the outer zone may get a stronger curl (e.g. C to D).",
        "Merkitse jokaiselle alueelle pituus ja taivutus. Esimerkki pehmeästä cat eyestä: 8, 9, 10, 11, 12 mm sisänurkasta ulkonurkkaan, C-taivutus — vain esimerkki. Heikoilla alueilla lyhyempi ja kevyempi; fox-tyylissä ulkoalue voi saada voimakkaamman taivutuksen (esim. C:stä D:hen)."
      ),
      l3(
        "Mắt bên kia làm theo kiểu soi gương: đầu mắt vẫn là vùng một, đuôi mắt vẫn là vùng năm. Đo lại mi thật bên đó và chỉnh độ dài nếu cần để kết quả cân đối.",
        "Mirror the map on the other eye: the inner corner is still zone one, the outer corner zone five. Measure that side's natural lashes again and adjust lengths if needed so the result looks even.",
        "Peilaa kartta toiseen silmään: sisänurkka on edelleen alue yksi ja ulkonurkka alue viisi. Mittaa sen puolen luomuripset uudelleen ja säädä pituuksia tarvittaessa, jotta lopputulos on tasainen."
      ),
      l3(
        "Xếp vỉ mi theo đúng thứ tự bản đồ, ngắn nhất cho đầu mắt rồi dài dần, thêm một dải ngắn hơn cho mi non ở góc trong.",
        "Set out the strips in map order, shortest for the inner corner and then longer, plus a shorter strip for the baby lashes at the inner corner.",
        "Järjestä ripsinauhat kartan järjestykseen, lyhimmät sisänurkkaan ja sitten pidemmät, sekä lyhyempi nauha sisänurkan nuorille ripsille."
      ),
      l3(
        "Gắn mi neo: vài sợi ở mỗi vùng, đúng độ dài trên bản đồ, đúng kỹ thuật bài classic (tách một sợi, cách da mí, không chạm da). Nhìn các sợi neo để thấy đường cong của kiểu mi trước khi lấp đầy.",
        "Anchor lashes: a few in each zone at the planned length, with the classic technique (isolate one lash, keep off the lid, never on the skin). Look at the anchors to see the shape of the style before filling in.",
        "Ankkuriripset: muutama jokaiselle alueelle suunnitellulla pituudella klassisella tekniikalla (yksi ripsi eristettynä, irti luomesta, ei koskaan iholle). Katso ankkureista tyylin muoto ennen täyttöä."
      ),
      l3(
        "Kiểm tra dáng: có tiệm cho khách ngồi dậy xem nhanh trong gương sau khi gắn neo, khi keo đã khô và mắt không cay; nếu không, nhìn từ đầu giường xuống và so hai mắt. Rồi lấp đầy, độ dài chuyển dần giữa các vùng, gắn xen kẽ để không dính chùm.",
        "Check the shape: some studios let the client sit up and look in a mirror after the anchors, once the glue has set and the eyes don't sting; otherwise look down from the head of the bed and compare the eyes. Then fill in, with lengths blending between zones, alternating zones to avoid stickies.",
        "Tarkista muoto: jotkut liikkeet antavat asiakkaan nousta istumaan ja katsoa peiliin ankkurien jälkeen, kun liima on kuivunut eikä silmiä kirvele; muuten katso sängyn päästä ja vertaa silmiä. Täytä sitten niin, että pituudet vaihtuvat pehmeästi alueiden välillä, ja vuorottele alueita tarttumien välttämiseksi."
      ),
      l3(
        "Kiểm tra cân đối từ đầu giường (độ dài ở đuôi, điểm dài nhất, độ cong), thêm sợi chỗ hụt, chải lại. Gỡ miếng lót khi mắt vẫn nhắm, dặn dò như bài classic, và ghi bản đồ (kiểu, độ dài, độ cong từng vùng) cho lần dặm sau.",
        "Check symmetry from the head of the bed (outer length, longest point, curl), add lashes where something is missing, brush through. Remove the pads with the eyes still closed, give aftercare as in the classic lesson, and record the map (style, length and curl per zone) for the next refill.",
        "Tarkista symmetria sängyn päästä (ulkopituus, pisin kohta, taivutus), lisää ripsiä puuttuviin kohtiin ja harjaa. Poista tyynyt silmien ollessa kiinni, anna jälkihoito-ohjeet kuten klassisten tunnilla ja kirjaa kartta (tyyli, pituus ja taivutus alueittain) seuraavaa huoltoa varten."
      ),
    ],
    tips: [
      l3(
        "Ba lỗi hay gặp: đo và vẽ khi nhìn nghiêng, chép y nguyên bản đồ sang mắt kia, và nhảy độ dài quá xa giữa hai vùng thành bậc thang.",
        "Three common mistakes: measuring and drawing from the side, copying the map unchanged to the other eye, and jumping lengths too far between zones so the lash line looks stepped.",
        "Kolme yleistä virhettä: mittaus ja piirto sivusta katsoen, kartan kopiointi sellaisenaan toiseen silmään ja liian suuret pituushypyt alueiden välillä, jolloin ripsirivi näyttää porrastetulta."
      ),
      l3(
        "Ghi bản đồ vào “Ghi chú nội bộ” trong hồ sơ khách ở VaraaAi (chỉ salon thấy), để lần dặm sau thợ nào cũng làm lại đúng như vậy.",
        "Save the map in the client's internal notes in VaraaAi (visible to the salon only), so any technician can repeat it exactly at the next refill.",
        "Tallenna kartta asiakkaan sisäisiin muistiinpanoihin VaraaAi:ssa (näkyvät vain salongille), jotta kuka tahansa tekijä voi toistaa sen tarkasti seuraavassa huollossa."
      ),
    ],
    quiz: [
      {
        q: l3("Vì sao phải đo và vẽ bản đồ khi nhìn mắt thẳng từ trên xuống?", "Why measure and draw the map looking straight down from above?", "Miksi kartta mitataan ja piirretään katsoen suoraan ylhäältä?"),
        options: [
          l3("Vì nhìn nghiêng làm độ dài và vị trí các vùng bị lệch", "Because looking from the side distorts the lengths and zone positions", "Koska sivulta katsottuna pituudet ja alueiden paikat vääristyvät"),
          l3("Vì khách thích được nhìn từ trên xuống", "Because clients like being looked at from above", "Koska asiakkaat pitävät siitä"),
          l3("Không quan trọng, nhìn góc nào cũng được", "It doesn't matter, any angle will do", "Sillä ei ole väliä, mikä tahansa kulma käy"),
        ],
        answer: 0,
        why: l3(
          "Nhìn nghiêng làm bản đồ lệch ngay từ đầu, và hai mắt sẽ không đều.",
          "A side view skews the map from the start, and the two eyes won't match.",
          "Sivukulma vinouttaa kartan heti alussa, eivätkä silmät vastaa toisiaan."
        ),
      },
      {
        q: l3("Mi neo dùng để làm gì?", "What are anchor lashes for?", "Mihin ankkuriripsiä käytetään?"),
        options: [
          l3("Để giữ miếng lót dưới mắt", "To hold the under-eye pad in place", "Silmänalustyynyn kiinnittämiseen"),
          l3("Đặt trước vài sợi đúng độ dài ở mỗi vùng để thấy dáng kiểu mi trước khi lấp đầy", "A few lashes placed first at the planned length in each zone, to see the shape before filling in", "Muutama ripsi ensin suunnitellulla pituudella jokaiselle alueelle, jotta muoto näkyy ennen täyttöä"),
          l3("Để thay thế bước tách mi", "To replace isolation", "Eristyksen korvaamiseen"),
        ],
        answer: 1,
        why: l3(
          "Mi neo là khung của bộ mi: nhìn chúng là thấy đường cong có đúng không, và đây là lúc dễ sửa nhất vì mới có vài sợi.",
          "Anchors are the frame of the set: they show whether the curve is right, and it is the easiest moment to correct because only a few lashes are on.",
          "Ankkurit ovat setin runko: niistä näkee, onko kaari oikea, ja korjaaminen on helpointa nyt, kun ripsiä on vasta muutama."
        ),
      },
      {
        q: l3("Bạn đã vẽ bản đồ cho mắt trái. Làm gì với mắt phải?", "You've mapped the left eye. What about the right eye?", "Olet kartoittanut vasemman silmän. Entä oikea?"),
        options: [
          l3("Chép y nguyên, không cần nhìn lại", "Copy it exactly without looking again", "Kopioin sen sellaisenaan katsomatta uudelleen"),
          l3("Chọn một kiểu khác cho đa dạng", "Choose a different style for variety", "Valitsen vaihtelun vuoksi eri tyylin"),
          l3("Làm theo kiểu soi gương, đo lại mi thật bên đó và chỉnh nếu cần", "Mirror it, measure that side's natural lashes again and adjust if needed", "Peilaan sen, mittaan sen puolen luomuripset uudelleen ja säädän tarvittaessa"),
        ],
        answer: 2,
        why: l3(
          "Hai mắt hiếm khi giống hệt nhau; mục tiêu là kết quả nhìn cân đối, không phải hai bản đồ giống hệt.",
          "The two eyes are rarely identical; the goal is a result that looks even, not two identical maps.",
          "Silmät ovat harvoin täysin samanlaiset; tavoite on tasaiselta näyttävä lopputulos, ei kaksi identtistä karttaa."
        ),
      },
    ],
  },
  {
    slug: "mi-mega-wispy-hieu-dung",
    course: "p-lash",
    style: "theory",
    title: l3("Mega volume, wispy, wet look: hiểu đúng để đẹp mà không hại mi", "Mega volume, wispy and wet look: understand them for beautiful lashes without damage", "Megavolyymi, wispy ja wet look: ymmärrä ne, niin ripset ovat kauniit eivätkä vaurioidu"),
    summary: l3(
      "Mega volume, wispy và wet look là gì, vì sao ba kiểu này dễ làm mi thật quá tải, vì sao chỉ làm đúng kiểu trên mi thật khoẻ và làm phiên bản nhẹ cho mi yếu, sợi mảnh nhất và keo cực ít cho mega, spike nặng hơn vẻ ngoài, nhịp đều của wispy, tư vấn và lịch dặm, dấu hiệu quá tải và cách làm nhẹ bộ mi.",
      "What mega volume, wispy and wet look are, why these looks easily overload the natural lashes, why the full look is only for strong natural lashes and weaker lashes get a lighter version, the finest lashes and very little glue for mega, why spikes weigh more than they look, an even rhythm for wispy, consultation and refills, and the signs of overload and how to lighten a set.",
      "Mitä megavolyymi, wispy ja wet look ovat, miksi nämä tyylit kuormittavat luomuripsiä helposti, miksi täysi tyyli tehdään vain vahvoille luomuripsille ja heikommille kevyempi versio, ohuimmat ripset ja hyvin vähän liimaa megaan, miksi piikit painavat enemmän kuin näyttää, wispyn tasainen rytmi, konsultaatio ja huollot sekä ylikuormituksen merkit ja setin keventäminen."
    ),
    video: video("mi-mega-wispy-hieu-dung", 291, "2026-11-17"),
    notice: l3(
      "Số sợi, độ dày và độ dài trong bài là hướng dẫn chung theo kinh nghiệm nghề, không phải con số tuyệt đối: luôn xem bảng gợi ý của hãng mi và hướng dẫn của hãng keo, và làm theo sức của mi thật. Keo không được chạm vào da. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Numbers of lashes, thicknesses and lengths in this lesson are general trade guidance, not exact figures: always check the lash maker's chart and the glue maker's instructions, and work within what the natural lashes can carry. Glue must never touch the skin. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Tämän tunnin ripsimäärät, paksuudet ja pituudet ovat yleisiä alan ohjeita, eivät tarkkoja lukuja: tarkista aina ripsivalmistajan taulukko ja liimavalmistajan ohjeet ja työskentele sen mukaan, mitä luomuripset kantavat. Liima ei saa koskaan koskea ihoa. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["dich-vu", "lich-hen", "khach-hang"],
    steps: [
      l3(
        "Mega volume là volume ở mức dày nhất: mỗi fan nhiều sợi hơn 6D, sợi nào cũng cực mảnh, cho một đường mi rất dày và đen. Dù bao nhiêu sợi, một fan vẫn chỉ gắn vào đúng MỘT sợi mi thật.",
        "Mega volume is volume at its densest: each fan has more lashes than a 6D fan, all ultra-fine, for a very dense, dark lash line. However many lashes it has, a fan still goes on exactly ONE natural lash.",
        "Megavolyymi on tuuheinta volyymia: viuhkassa on enemmän ripsiä kuin 6D-viuhkassa, kaikki erittäin ohuita, ja ripsiraja on hyvin tuuhea ja tumma. Ripsiä voi olla monta, mutta viuhka kiinnitetään silti täsmälleen YHTEEN luomuripseen."
      ),
      l3(
        "Wispy là kiểu có kết cấu như lông vũ: một lớp nền fan ngắn, mềm, và xen vào đó, cách đều nhau, các spike (fan khép thành mũi nhọn hoặc sợi đơn) dài hơn lớp nền.",
        "Wispy is a textured, feathery look: a base layer of short, soft fans with evenly spaced spikes (fans closed into a point, or singles) that are longer than the base.",
        "Wispy on teksturoitu, höyhenmäinen tyyli: lyhyistä, pehmeistä viuhkoista tehty pohjakerros ja sen lomassa tasavälein pohjaa pidempiä piikkejä (kärjeksi suljettuja viuhkoja tai yksittäisiä ripsiä)."
      ),
      l3(
        "Wet look dùng fan khép: các sợi ép sát thành từng mũi nhọn, đặt gần nhau dọc đường mi, nhìn như mi vừa ướt. Mỗi mũi vẫn nằm trên một sợi mi thật, các mũi phải tách rõ.",
        "Wet look uses closed fans: the lashes pressed together into fine points placed close together along the lash line, like wet lashes. Each point still sits on one natural lash, and the points stay clearly separate.",
        "Wet lookissa käytetään suljettuja viuhkoja: ripset painetaan yhteen ohuiksi kärjiksi, jotka sijoitetaan tiheästi ripsirajaa pitkin, kuin märät ripset. Jokainen kärki on silti yhdessä luomuripsessä, ja kärjet pysyvät selvästi erillään."
      ),
      l3(
        "Nguyên tắc trọng lượng của bài classic và volume còn quan trọng hơn ở đây: sức chịu của sợi mi thật không đổi, mà fan thì nhiều sợi hơn và spike thì dài hơn.",
        "The weight rule from the classic and volume lessons matters even more here: what a natural lash can carry does not change, while fans have more lashes and spikes are longer.",
        "Klassisten ja volyymiripsien tuntien painosääntö on tässä vielä tärkeämpi: luomuripsen kantokyky ei muutu, mutta viuhkoissa on enemmän ripsiä ja piikit ovat pidempiä."
      ),
      l3(
        "Làm đúng kiểu chỉ cho mi thật khoẻ, dài và dày. Mi mảnh, ngắn hay thưa thì làm phiên bản nhẹ: fan ít sợi hơn, spike ngắn hơn và ít spike hơn.",
        "The full look is only for strong, long, thick natural lashes. Fine, short or sparse lashes get a lighter version: fewer lashes per fan, shorter and fewer spikes.",
        "Täysi tyyli vain vahvoille, pitkille ja paksuille luomuripsille. Ohuet, lyhyet tai harvat ripset saavat kevyemmän version: vähemmän ripsiä viuhkassa, lyhyempiä ja harvempia piikkejä."
      ),
      l3(
        "Mega cần sợi mảnh nhất mà hãng mi có (theo bảng của hãng) và keo cực ít: fan càng nhiều sợi, chân fan càng phải nhỏ, gọn. Chân to, keo nhiều thì nặng, cứng và dễ dính chùm.",
        "Mega needs the finest lashes the lash maker offers (follow their chart) and very little glue: the more lashes in a fan, the narrower and neater its base must be. A wide base with a lot of glue is heavy, stiff and causes stickies.",
        "Mega vaatii valmistajan ohuimmat ripset (valmistajan taulukon mukaan) ja hyvin vähän liimaa: mitä enemmän ripsiä viuhkassa, sitä kapeampi ja siistimpi kannan on oltava. Leveä kanta ja paljon liimaa on painava, jäykkä ja aiheuttaa tarttumia."
      ),
      l3(
        "Spike trông mảnh nhưng nặng bằng tổng các sợi trong nó, và vì dài hơn lớp nền nên đè lên gốc mi như một cái cần dài. Đặt spike trên những sợi mi thật khoẻ nhất, đừng làm dài quá so với lớp nền.",
        "A spike looks slim but weighs as much as all the lashes in it, and because it is longer than the base it acts like a long lever on the root. Put spikes on the strongest natural lashes and do not make them much longer than the base.",
        "Piikki näyttää ohuelta, mutta painaa kaikkien siinä olevien ripsien verran, ja koska se on pohjaa pidempi, se toimii kuin pitkä vipu juureen. Laita piikit vahvimpiin luomuripsiin äläkä tee niistä paljon pohjaa pidempiä."
      ),
      l3(
        "Wispy đẹp nhờ nhịp đều: spike cách đều nhau, dài theo bản đồ mi. Luôn vẽ bản đồ và đánh dấu chỗ đặt spike trước (bài “Lash mapping”).",
        "Wispy looks good because of an even rhythm: evenly spaced spikes with lengths from the lash map. Always map and mark the spike positions first (see the lash mapping lesson).",
        "Wispy on kaunis tasaisen rytmin ansiosta: tasavälein sijoitetut piikit, pituudet ripsikartan mukaan. Tee aina kartta ja merkitse piikkien paikat ensin (ripsikartoituksen tunti)."
      ),
      l3(
        "Tư vấn: cho khách xem ảnh, thống nhất mức đậm, nói rõ cần dặm đều (thường 2–3 tuần) và độ bền nhờ mi thật khoẻ, không nhờ số sợi. Mi mọc dài ra thì fan nặng dễ xoay, xoắn: sợi đã mọc dài được gỡ khi dặm.",
        "Consultation: show pictures, agree how dramatic, explain that regular refills are needed (often every 2–3 weeks) and that retention comes from healthy natural lashes, not from the number of lashes. As lashes grow out, heavy fans twist easily: grown-out ones are removed at the refill.",
        "Konsultaatio: näytä kuvia, sovi kuinka näyttävä tyyli on, kerro että säännölliset huollot tarvitaan (usein 2–3 viikon välein) ja että kestävyys tulee terveistä luomuripsistä, ei ripsien määrästä. Kun ripset kasvavat ulos, painavat viuhkat kiertyvät helposti: ulos kasvaneet poistetaan huollossa."
      ),
      l3(
        "Dấu hiệu quá tải: mi thật oằn xuống, xoắn, lệch hướng, có khoảng trống do mi rụng sớm. Người thợ giỏi dừng lại và làm nhẹ bộ mi (bớt sợi, rút ngắn, bỏ bớt spike), giải thích với khách. Dị ứng: bài “Dị ứng và hoá chất”; mắt đỏ, viêm: bài “Khi nào không làm cho khách”; nhíp: bài “Xử lý dụng cụ sau mỗi khách”.",
        "Signs of overload: natural lashes drooping, twisting or turning, gaps where lashes fell out early. A professional stops and lightens the set (fewer lashes, shorter, fewer spikes) and explains why. Allergy: see the allergy lesson; red or inflamed eyes: see “When not to treat a customer”; tweezers: see the tool-hygiene lesson.",
        "Ylikuormituksen merkit: luomuripset painuvat, kiertyvät tai kääntyvät, ja ennenaikaisesti irronneista ripsistä jää aukkoja. Ammattilainen pysähtyy ja keventää settiä (vähemmän ripsiä, lyhyemmät, vähemmän piikkejä) ja kertoo syyn. Allergia: allergiatunti; punainen tai tulehtunut silmä: ”Milloin asiakasta ei hoideta”; pinsetit: välinehygienian tunti."
      ),
    ],
    tips: [
      l3(
        "Khách mang ảnh mega rất đậm mà mi thật mảnh: làm phiên bản nhẹ lần này, chụp ảnh mi thật trước và sau, và hẹn dặm đúng hẹn. Vài lần sau, khi mi thật khoẻ, mới tính đậm hơn.",
        "A client brings a very dramatic mega photo but has fine natural lashes: do a lighter version this time, take before-and-after photos of the natural lashes, and book the refill on time. Go fuller only later, once the natural lashes are healthy.",
        "Asiakas tuo kuvan hyvin näyttävästä megasta, mutta luomuripset ovat ohuet: tee nyt kevyempi versio, kuvaa luomuripset ennen ja jälkeen ja varaa huolto ajallaan. Tuuheampaa vasta myöhemmin, kun luomuripset ovat terveet."
      ),
      l3(
        "Trong VaraaAi, ghi kiểu mi, số sợi và độ dài vào ghi chú của khách, và tạo dịch vụ “Mega volume” với thời lượng dài hơn volume thường để lịch không bị dồn.",
        "In VaraaAi, note the style, lashes per fan and lengths in the client's notes, and create a “Mega volume” service with a longer duration than regular volume so the calendar is not squeezed.",
        "Kirjaa VaraaAi:ssa tyyli, ripsimäärä viuhkassa ja pituudet asiakkaan muistiinpanoihin ja luo ”Megavolyymi”-palvelu tavallista volyymia pidemmällä kestolla, jotta kalenteri ei ahtaudu."
      ),
    ],
    quiz: [
      {
        q: l3("Một fan mega volume gắn vào bao nhiêu sợi mi thật?", "How many natural lashes does one mega volume fan go on?", "Kuinka moneen luomuripseen yksi megavolyymiviuhka kiinnitetään?"),
        options: [
          l3("Hai hoặc ba sợi, vì fan rất nhiều sợi", "Two or three, because the fan has so many lashes", "Kahteen tai kolmeen, koska viuhkassa on niin paljon ripsiä"),
          l3("Đúng một sợi", "Exactly one", "Täsmälleen yhteen"),
          l3("Tuỳ khách muốn đậm đến đâu", "Depends how dramatic the client wants it", "Riippuu siitä, kuinka näyttävää asiakas haluaa"),
        ],
        answer: 1,
        why: l3(
          "Dù fan có bao nhiêu sợi, chân fan chỉ ôm đúng một sợi mi thật. Ôm nhiều sợi là dính chùm, mi bị kéo và rụng sớm.",
          "However many lashes a fan has, its base wraps exactly one natural lash. Wrapping several is a sticky: the lashes are pulled and shed early.",
          "Viuhkassa voi olla monta ripseä, mutta sen kanta kietoutuu täsmälleen yhteen luomuripseen. Useamman kietominen on tarttuma: ripsiä vedetään ja ne irtoavat ennenaikaisesti."
        ),
      },
      {
        q: l3("Khách có mi thật mảnh, thưa muốn một bộ wispy thật nổi. Bạn làm gì?", "A client with fine, sparse natural lashes wants a very bold wispy set. What do you do?", "Asiakas, jolla on ohuet ja harvat luomuripset, haluaa hyvin näyttävän wispy-setin. Mitä teet?"),
        options: [
          l3("Làm spike thật dài cho đúng ảnh", "Make the spikes very long, like the photo", "Teen piikeistä hyvin pitkät kuvan mukaan"),
          l3("Từ chối không làm mi", "Refuse to do lashes", "Kieltäydyn tekemästä ripsiä"),
          l3("Làm phiên bản nhẹ: fan ít sợi, spike ngắn hơn và ít hơn, giải thích với khách", "Do a lighter version: fewer lashes per fan, shorter and fewer spikes, and explain why", "Teen kevyemmän version: vähemmän ripsiä viuhkassa, lyhyemmät ja harvemmat piikit, ja kerron syyn"),
        ],
        answer: 2,
        why: l3(
          "Kiểu dáng vẫn có mà mi thật không phải gánh quá sức. Spike dài trên mi yếu kéo mạnh lên gốc mi và làm mi rụng sớm.",
          "The look is still there without overloading the natural lashes. Long spikes on weak lashes pull hard on the root and make lashes fall out early.",
          "Tyyli säilyy ilman että luomuripsiä kuormitetaan liikaa. Pitkät piikit heikoissa ripsissä vetävät voimakkaasti juuresta ja saavat ripset irtoamaan ennenaikaisesti."
        ),
      },
      {
        q: l3("Lần dặm thứ ba, bạn thấy mi thật oằn xuống, xoắn và có khoảng trống. Nên làm gì?", "At the third refill you see natural lashes drooping, twisting and gaps. What should you do?", "Kolmannessa huollossa huomaat luomuripsien painuvan, kiertyvän ja aukkoja. Mitä teet?"),
        options: [
          l3("Làm nhẹ bộ mi: bớt sợi, rút ngắn, bỏ bớt spike, và giải thích", "Lighten the set: fewer lashes, shorter, fewer spikes, and explain", "Kevennän settiä: vähemmän ripsiä, lyhyemmät, vähemmän piikkejä, ja kerron syyn"),
          l3("Thêm sợi vào chỗ trống cho đều", "Add more lashes to fill the gaps", "Lisään ripsiä aukkojen täyttämiseksi"),
          l3("Dùng nhiều keo hơn cho chắc", "Use more glue so it holds", "Käytän enemmän liimaa, jotta pitää"),
        ],
        answer: 0,
        why: l3(
          "Đó là dấu hiệu quá tải. Thêm sợi hay thêm keo chỉ làm nặng thêm. Làm nhẹ vài lần dặm để mi thật hồi lại.",
          "Those are signs of overload. More lashes or more glue only add weight. Go lighter for a few refills so the natural lashes recover.",
          "Ne ovat ylikuormituksen merkkejä. Lisäripset tai lisäliima vain lisäävät painoa. Kevennä muutaman huollon ajan, jotta luomuripset palautuvat."
        ),
      },
    ],
  },
  {
    slug: "mi-mega-wispy",
    course: "p-lash",
    style: "practice",
    title: l3("Mega volume và wispy: thực hành từng bước", "Mega volume and wispy: step by step", "Megavolyymi ja wispy: vaihe vaiheelta"),
    summary: l3(
      "Một bộ wispy trên lớp nền volume hoặc mega, từng bước: tư vấn và chọn kiểu, chuẩn bị, bản đồ và đánh dấu chỗ đặt spike, fan mega chân nhỏ, keo thật ít, lớp nền trước, tạo và đặt spike cách đều, cách làm wet look, kiểm tra sức nặng và dính chùm, so hai mắt, hoàn thiện và dặn dò.",
      "A wispy set on a volume or mega base, step by step: consult and choose the look, prep, map and mark the spike positions, mega fans with narrow bases, very little glue, the base layer first, making and placing evenly spaced spikes, how to do wet look, checking weight and stickies, symmetry, finish and aftercare.",
      "Wispy-setti volyymi- tai megapohjalle vaihe vaiheelta: konsultaatio ja tyylin valinta, valmistelu, kartta ja piikkien paikkojen merkintä, kapeakantaiset megaviuhkat, hyvin vähän liimaa, pohjakerros ensin, piikkien teko ja tasavälinen sijoittelu, wet look, painon ja tarttumien tarkistus, symmetria, viimeistely ja kotihoito-ohjeet."
    ),
    video: video("mi-mega-wispy", 280, "2026-11-17"),
    notice: l3(
      "Độ dài và số sợi trong bài chỉ là ví dụ: bản đồ thật luôn theo đôi mắt và sức của mi thật từng khách, và theo bảng gợi ý của hãng mi, hướng dẫn của hãng keo. Keo không được chạm vào da. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Lengths and lashes per fan in this lesson are examples only: a real map always follows each client's eyes and what their natural lashes can carry, the lash maker's chart and the glue maker's instructions. Glue must never touch the skin. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Tämän tunnin pituudet ja ripsimäärät ovat vain esimerkkejä: todellinen kartta tehdään aina asiakkaan silmien ja luomuripsien kantokyvyn, ripsivalmistajan taulukon ja liimavalmistajan ohjeiden mukaan. Liima ei saa koskaan koskea ihoa. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Tư vấn và chọn kiểu: cho khách xem ảnh, thống nhất mức đậm và spike nổi đến đâu, nói rõ lịch dặm (thường 2–3 tuần). Mi thật mảnh, thưa thì làm phiên bản nhẹ và nói trước với khách.",
        "Consult and choose the look: show pictures, agree how dramatic and how bold the spikes are, explain the refill schedule (often every 2–3 weeks). With fine or sparse natural lashes, do a lighter version and say so beforehand.",
        "Konsultaatio ja tyylin valinta: näytä kuvia, sovi kuinka näyttävä tyyli ja piikit ovat, kerro huoltoväli (usein 2–3 viikkoa). Ohuille tai harvoille luomuripsille kevyempi versio, ja kerro siitä etukäteen."
      ),
      l3(
        "Chuẩn bị giống bài thực hành classic và bài chuẩn bị nối mi: hỏi dị ứng, khách nằm thoải mái, làm sạch mi, dán miếng lót, chải mi.",
        "Prep as in the classic practice and lash preparation lessons: ask about allergies, make the client comfortable, cleanse, apply the pads, comb the lashes.",
        "Valmistelu kuten klassisten ripsien käytännön tunnilla ja valmistelutunnilla: kysy allergioista, asiakas mukavasti makuulle, puhdistus, suojatyynyt, ripsien kampaus."
      ),
      l3(
        "Vẽ bản đồ lớp nền như bài lash mapping, rồi đánh dấu chỗ đặt spike bằng chấm nhỏ trên miếng lót, cách đều nhau. Spike thường dài hơn lớp nền khoảng 1–3 mm tuỳ kiểu, nhưng không quá sức mi thật.",
        "Map the base layer as in the lash mapping lesson, then mark the spike positions with small evenly spaced dots on the pad. Spikes are often about 1–3 mm longer than the base depending on the look, but never more than the natural lash can carry.",
        "Tee pohjakerroksen kartta kuten ripsikartoituksen tunnilla ja merkitse piikkien paikat tasavälein pienillä pisteillä suojatyynyyn. Piikit ovat usein noin 1–3 mm pohjaa pidempiä tyylin mukaan, mutta eivät koskaan enempää kuin luomuripsi kantaa."
      ),
      l3(
        "Sắp bàn: vỉ mi thật mảnh cho lớp nền theo độ dài bản đồ, vỉ dài hơn cho spike, giọt keo mới, nhíp thẳng để tách và nhíp volume để tạo fan.",
        "Set up: a tile of very fine lashes for the base in map order, longer lashes for the spikes, a fresh glue drop, a straight tweezer for isolating and a volume tweezer for fans.",
        "Työpöytä: hyvin ohuet ripset pohjaan kartan järjestyksessä, pidemmät ripset piikkeihin, tuore liimapisara, suorat pinsetit eristämiseen ja volyymipinsetit viuhkoihin."
      ),
      l3(
        "Tạo fan mega như bài volume (lấy sợi, trượt nhíp, mở fan, khép chân) nhưng nhiều sợi hơn, mảnh hơn, tay nhẹ hơn. Chân fan nhỏ, khép kín; fan chân bè, xoè lệch thì bỏ. Chỉ chạm chân fan vào mép giọt keo.",
        "Make mega fans as in the volume lesson (pick up, slide, open, close the base) but with more, finer lashes and a lighter hand. The base must be narrow and closed; discard wide-based, lopsided fans. Only the base touches the edge of the glue drop.",
        "Tee megaviuhkat kuten volyymitunnilla (nosto, liu'utus, avaus, kannan sulkeminen), mutta useammasta ja ohuemmasta ripsestä ja kevyemmällä kädellä. Kannan on oltava kapea ja suljettu; hylkää leveäkantaiset, vinot viuhkat. Vain kanta koskettaa liimapisaran reunaa."
      ),
      l3(
        "Lớp nền trước: tách đúng một sợi, chân fan cách da mí khoảng 0,5–1 mm, gắn xen kẽ các vùng. Ở mỗi chấm đánh dấu, chừa lại một sợi mi thật khoẻ cho spike, vì mỗi sợi mi thật chỉ mang một thứ.",
        "Base layer first: isolate one lash, keep the base about 0.5–1 mm from the eyelid, work zones in turn. At each marked dot, leave one strong natural lash free for a spike, because each natural lash carries only one thing.",
        "Pohjakerros ensin: eristä yksi ripsi, kanta noin 0,5–1 mm luomesta, vuorottele alueita. Jätä jokaisen merkityn pisteen kohdalle yksi vahva luomuripsi vapaaksi piikille, koska jokainen luomuripsi kantaa vain yhden asian."
      ),
      l3(
        "Spike: dùng spike làm sẵn hoặc tự khép vài sợi thành một mũi nhọn thẳng, gọn, chân nhỏ, keo chỉ ở chân. Đặt spike theo các chấm, mỗi spike trên một sợi mi thật khoẻ, cùng hướng lớp nền, cách đều nhau.",
        "Spikes: use pre-made spikes or close a few lashes into one straight, neat point with a narrow base, glue only at the base. Place them on the dots, each on one strong natural lash, in the same direction as the base, evenly spaced.",
        "Piikit: käytä valmiita piikkejä tai sulje muutama ripsi suoraksi, siistiksi kärjeksi kapealla kannalla, liimaa vain kantaan. Sijoita ne pisteiden kohdalle, kukin yhteen vahvaan luomuripseen, pohjan suuntaan ja tasavälein."
      ),
      l3(
        "Wet look: cả hàng mi dùng fan khép, đặt gần nhau; các mũi phải tách rõ, mỗi mũi trên một sợi mi thật. Mũi dính vào nhau là dính chùm; keo leo dọc thân sợi làm mũi cứng.",
        "Wet look: closed fans along the whole lash line, placed close together; the points stay clearly separate, each on one natural lash. Points stuck together are stickies; glue creeping up the lashes makes stiff points.",
        "Wet look: suljetut viuhkat koko ripsirajalle tiheästi; kärjet pysyvät selvästi erillään, kukin yhdessä luomuripsessä. Toisiinsa tarttuneet kärjet ovat tarttumia; ripsiä pitkin noussut liima tekee kärjistä jäykkiä."
      ),
      l3(
        "Kiểm tra: lướt nhíp từ chân ra ngọn, mỗi fan và spike đứng riêng trên một sợi; sợi mi thật nào oằn hay xoắn thì thay fan nhẹ hơn, ngắn hơn. Nhìn từ trên xuống và từ cạnh bên; so hai mắt từ đầu giường.",
        "Check: run the tweezer from base to tip so every fan and spike stands alone on one lash; replace with a lighter, shorter fan on any natural lash that droops or twists. Look from above and from the side; compare both eyes from the head of the bed.",
        "Tarkistus: vedä pinsetit tyvestä kärkeen niin, että jokainen viuhka ja piikki on erillään omassa ripsessään; vaihda kevyempi ja lyhyempi viuhka luomuripseen, joka painuu tai kiertyy. Katso ylhäältä ja sivulta; vertaa silmiä sängyn päästä."
      ),
      l3(
        "Hoàn thiện và dặn dò như bài classic. Với kiểu đậm: khách rửa mi nhẹ nhàng bằng sản phẩm không dầu để chân mi không đọng bụi, bã nhờn, và dặm đều đặn. Dọn dẹp, khử khuẩn nhíp sau mỗi khách.",
        "Finish and aftercare as in the classic lesson. For dense looks: the client cleanses the lashes gently with an oil-free product so dirt and oil do not build up at the base, and comes for regular refills. Clean up and disinfect the tweezers after every client.",
        "Viimeistely ja kotihoito kuten klassisten ripsien tunnilla. Tuuheissa tyyleissä asiakas puhdistaa ripset hellästi öljyttömällä tuotteella, jotta tyveen ei kerry likaa ja talia, ja käy säännöllisesti huollossa. Siivous ja pinsettien desinfiointi jokaisen asiakkaan jälkeen."
      ),
    ],
    tips: [
      l3(
        "Chụp ảnh hàng mi xong, cả từ trên xuống và từ cạnh bên, rồi lưu vào ghi chú của khách trong VaraaAi cùng bản đồ mi: lần dặm sau so lại nhịp spike và sức của mi thật.",
        "Photograph the finished lashes from above and from the side and keep them with the lash map in the client's notes in VaraaAi: at the next refill, compare the spike rhythm and the health of the natural lashes.",
        "Kuvaa valmiit ripset ylhäältä ja sivulta ja tallenna kuvat ripsikartan kanssa asiakkaan muistiinpanoihin VaraaAi:ssa: vertaa seuraavassa huollossa piikkien rytmiä ja luomuripsien kuntoa."
      ),
    ],
    quiz: [
      {
        q: l3("Khi làm lớp nền wispy, ở chỗ đã đánh dấu spike bạn làm gì?", "While doing the wispy base layer, what do you do at a marked spike position?", "Mitä teet merkityn piikin kohdalla, kun teet wispyn pohjakerrosta?"),
        options: [
          l3("Gắn fan nền rồi đặt spike chồng lên cùng sợi đó", "Put a base fan there and then add the spike on the same lash", "Laitan pohjaviuhkan ja lisään piikin samaan ripseen"),
          l3("Bỏ qua, không làm gì ở vùng đó", "Skip that area entirely", "Ohitan koko alueen"),
          l3("Chừa lại một sợi mi thật khoẻ cho spike", "Leave one strong natural lash free for the spike", "Jätän yhden vahvan luomuripsen vapaaksi piikille"),
        ],
        answer: 2,
        why: l3(
          "Mỗi sợi mi thật chỉ mang một thứ: một fan hoặc một spike. Chồng hai thứ lên một sợi là quá tải.",
          "Each natural lash carries one thing only: a fan or a spike. Stacking two on one lash overloads it.",
          "Jokainen luomuripsi kantaa vain yhden asian: viuhkan tai piikin. Kaksi samassa ripsessä ylikuormittaa sen."
        ),
      },
      {
        q: l3("Spike nên đặt thế nào?", "How should spikes be placed?", "Miten piikit sijoitetaan?"),
        options: [
          l3("Cách đều nhau, trên sợi mi thật khoẻ, cùng hướng lớp nền", "Evenly spaced, on strong natural lashes, in the same direction as the base", "Tasavälein, vahvoihin luomuripsiin, pohjan suuntaan"),
          l3("Dồn nhiều ở đuôi mắt cho nổi", "Bunched at the outer corner to stand out", "Kasaan ulkonurkkaan, jotta erottuvat"),
          l3("Ở bất cứ đâu còn chỗ trống", "Wherever there is a gap", "Mihin tahansa, missä on tilaa"),
        ],
        answer: 0,
        why: l3(
          "Wispy đẹp nhờ nhịp đều. Spike dồn cục hay chỗ dày chỗ thưa nhìn rối, và spike dài phải nằm trên sợi mi khoẻ.",
          "Wispy looks good because of an even rhythm. Bunched or uneven spikes look messy, and long spikes must sit on strong lashes.",
          "Wispy on kaunis tasaisen rytmin ansiosta. Kasautuneet tai epätasaiset piikit näyttävät sotkuisilta, ja pitkien piikkien on oltava vahvoissa ripsissä."
        ),
      },
      {
        q: l3("Wet look: nhiều mũi nhọn dính vào nhau thì sao?", "Wet look: what if several points are stuck together?", "Wet look: entä jos useampi kärki on tarttunut yhteen?"),
        options: [
          l3("Đúng kiểu wet look, cứ để vậy", "That is the wet look, leave it", "Se on wet look, jätän niin"),
          l3("Đó là dính chùm: tách ra ngay", "That is a sticky: separate them right away", "Se on tarttuma: erotan heti"),
          l3("Thêm keo cho chắc", "Add glue so it holds", "Lisään liimaa, jotta pitää"),
        ],
        answer: 1,
        why: l3(
          "Mỗi mũi phải nằm trên một sợi mi thật và tách rõ. Dính chùm kéo mi thật, gây cộm và làm mi rụng sớm.",
          "Each point must sit on one natural lash and stay separate. Stickies pull the natural lashes, feel uncomfortable and make lashes fall out early.",
          "Jokaisen kärjen on oltava yhdessä luomuripsessä ja erillään. Tarttumat vetävät luomuripsiä, tuntuvat epämukavilta ja saavat ripset irtoamaan ennenaikaisesti."
        ),
      },
    ],
  },
  {
    slug: "mi-dam-thao-hieu-dung",
    course: "p-lash",
    style: "theory",
    title: l3("Dặm và tháo mi: hiểu đúng để mi thật không hư", "Refills and removal: understand them so natural lashes stay healthy", "Huolto ja poisto: ymmärrä ne, niin omat ripset pysyvät terveinä"),
    summary: l3(
      "Vì sao mi nối rụng theo mi thật và khách cần dặm sau khoảng 2–3 tuần; đọc bộ mi khi dặm để tìm nguyên nhân rụng; gỡ sợi nào (sợi mọc dài, dính chùm, sợi lỏng); vì sao không bao giờ kéo hay bứt; vì sao không dùng dầu gần mắt nếu hãng không hướng dẫn; chất tháo dạng kem, gel và lỏng; khi nào tháo hết cả bộ; và dặn khách giữ mi ở nhà.",
      "Why extensions fall with the natural lashes and clients need a refill after about 2–3 weeks; reading the set at a refill to find the cause of loss; what to remove (grown-out extensions, stickies, loose ones); why you never pull or pick; why no oil near the eyes unless the maker says so; cream, gel and liquid removers; when to remove the whole set; and teaching clients how to care for their lashes at home.",
      "Miksi pidennykset lähtevät luomuripsien mukana ja asiakas tarvitsee huollon noin 2–3 viikon välein; setin lukeminen huollossa lähtemisen syyn löytämiseksi; mitä poistetaan (ulos kasvaneet, tarttumat, löysät); miksi ripsiä ei koskaan vedetä tai nypitä; miksi öljyä ei käytetä silmien lähellä ilman valmistajan ohjetta; voide-, geeli- ja nestemäiset poistoaineet; milloin koko setti poistetaan; ja asiakkaan kotihoito-ohjeet."
    ),
    video: video("mi-dam-thao-hieu-dung", 272, "2026-11-17"),
    notice: l3(
      "Thời gian dặm là khoảng thường gặp, tuỳ từng khách. Loại chất tháo, lượng bôi và thời gian chờ: luôn theo hướng dẫn của hãng. Chất tháo không được vào mắt; nếu khách thấy cay, dừng ngay, lau sạch và xử lý như bài “Xử lý sự cố”. Khi có phản ứng, khuyên khách đi khám. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Refill intervals are typical ranges and vary by client. Remover type, amount and waiting time: always as the maker says. Remover must never get into the eye; if the client feels stinging, stop at once, wipe it off and act as in “Incidents”. If there is a reaction, advise the client to see a doctor. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Huoltovälit ovat tyypillisiä vaihteluvälejä ja vaihtelevat asiakkaittain. Poistoaineen tyyppi, määrä ja vaikutusaika: aina valmistajan ohjeen mukaan. Poistoainetta ei saa joutua silmään; jos asiakasta kirvelee, lopeta heti, pyyhi aine pois ja toimi kuten tunnilla ”Vahinkotilanteet”. Jos ilmenee reaktio, neuvo asiakasta hakeutumaan lääkäriin. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["lich-hen", "khach-hang", "tin-nhan-ai"],
    steps: [
      l3(
        "Mi thật rụng mỗi ngày theo vòng đời, và sợi nối rụng theo; các sợi khác dài ra, đẩy mối keo xa mí. Vì vậy khách thường cần dặm sau khoảng 2–3 tuần, tuỳ tốc độ rụng và cách giữ mi.",
        "Natural lashes shed every day as part of their cycle, and their extensions go with them; other lashes grow, moving the bond away from the lid. So clients usually need a refill after about 2–3 weeks, depending on their shedding and aftercare.",
        "Luomuripsiä lähtee päivittäin kasvusyklin mukaan, ja pidennykset lähtevät niiden mukana; muut ripset kasvavat ja siirtävät liimakohtaa pois luomesta. Siksi asiakas tarvitsee yleensä huollon noin 2–3 viikon välein, riippuen ripsien lähtemisestä ja jälkihoidosta."
      ),
      l3(
        "Để quá lâu thì việc dặm gần như làm lại từ đầu; mỗi tiệm tự đặt quy định bao lâu vẫn tính là dặm. Hẹn lịch dặm ngay khi khách vừa làm xong.",
        "Leave it too long and a refill is almost a new set; each salon sets its own rule for how long still counts as a refill. Book the refill as soon as the set is finished.",
        "Liian pitkän tauon jälkeen huolto on lähes uusi setti; jokainen liike päättää itse, kuinka pitkä väli lasketaan vielä huolloksi. Varaa huolto heti setin valmistuttua."
      ),
      l3(
        "Đọc bộ mi khi dặm: rụng nhiều một bên thường do ngủ nghiêng; rụng mảng ở đuôi mắt có thể do dụi mắt hay dầu tẩy trang; rụng đều khắp nơi thì xem lại keo, độ ẩm phòng và bước làm sạch. Ghi lại nguyên nhân.",
        "Read the set at a refill: heavy loss on one side often comes from side sleeping; patchy loss at the outer corner can come from rubbing or oil cleansers; even loss everywhere means checking the glue, room humidity and cleansing step. Record the cause.",
        "Lue setti huollossa: runsas lähtö toiselta puolelta johtuu usein kyljellään nukkumisesta; laikuittainen lähtö ulkonurkasta voi johtua hieromisesta tai öljypuhdistuksesta; tasainen lähtö kaikkialta tarkoittaa liiman, huoneen kosteuden ja puhdistusvaiheen tarkistamista. Kirjaa syy."
      ),
      l3(
        "Khi dặm, gỡ: sợi đã mọc dài (mối keo xa mí, xoay ngang, chĩa ra, bắt chéo), chỗ dính chùm, sợi gắn lỏng. Sợi còn đẹp và sát mí thì giữ lại.",
        "At a refill, remove: grown-out extensions (bond far from the lid, twisted, sticking out, crossing), stickies, and loosely attached ones. Keep the ones that are still neat and close to the lid.",
        "Huollossa poistetaan: ulos kasvaneet pidennykset (liimakohta kaukana luomesta, kiertyneet, sojottavat, ristikkäiset), tarttumat ja löysästi kiinnitetyt. Siistit ja luomen lähellä olevat jätetään."
      ),
      l3(
        "Không bao giờ kéo, giật hay bứt sợi nối: kéo sợi nối là kéo luôn mi thật khỏi chân mi; lặp lại nhiều lần thì mi mọc lại thưa, yếu hơn. Dặn khách: mi vướng cũng đừng tự gỡ, hãy quay lại tiệm.",
        "Never pull, tug or pick off an extension: pulling it pulls the natural lash out of the follicle; repeated often, lashes grow back thinner and weaker. Tell clients: even if a lash bothers them, don't remove it themselves, come back to the salon.",
        "Pidennystä ei koskaan vedetä, nykäistä tai nypitä: se vetää luomuripsen irti karvatupesta; toistuvasti tehtynä ripset kasvavat takaisin harvempina ja heikompina. Kerro asiakkaalle: vaikka ripsi häiritsisi, älä poista sitä itse, tule liikkeeseen."
      ),
      l3(
        "Muốn gỡ thì làm mềm keo bằng chất tháo chuyên dụng rồi trượt sợi nối ra nhẹ nhàng. Không dùng dầu gần mắt để làm tan keo, trừ khi hãng sản phẩm hướng dẫn rõ.",
        "To remove an extension, soften the bond with a professional remover and slide it off gently. Don't use oil near the eyes to dissolve the glue unless the product maker clearly says so.",
        "Pidennyksen poistamiseksi liima pehmennetään ammattikäyttöön tarkoitetulla poistoaineella ja pidennys liu'utetaan varovasti pois. Älä käytä öljyä silmien lähellä liiman liuottamiseen, ellei tuotteen valmistaja selvästi niin ohjeista."
      ),
      l3(
        "Chất tháo dạng kem và gel nằm yên chỗ bôi nên dễ kiểm soát gần mắt; dạng lỏng dễ chảy hơn. Dạng nào cũng làm theo hướng dẫn của hãng về lượng bôi và thời gian chờ. Chất tháo không bao giờ được vào mắt; mắt khách nhắm kín suốt lúc tháo.",
        "Cream and gel removers stay where you put them, so they are easier to control near the eye; liquid removers run more easily. Whatever the type, follow the maker on amount and waiting time. Remover must never get into the eye; the client's eyes stay closed throughout.",
        "Voide- ja geelimäiset poistoaineet pysyvät paikallaan ja ovat helpommin hallittavia silmän lähellä; nestemäiset valuvat helpommin. Tyypistä riippumatta noudata valmistajan ohjetta määrästä ja vaikutusajasta. Poistoainetta ei koskaan saa joutua silmään; asiakkaan silmät ovat kiinni koko ajan."
      ),
      l3(
        "Tháo hết cả bộ khi: mi giữ kém, khách muốn cho mi nghỉ, khách có phản ứng (tháo hết và khuyên đi khám), hoặc sau nhiều lần dặm bộ mi đã rối và không đều.",
        "Remove the whole set when: retention is poor, the client wants a break, the client has a reaction (remove everything and advise seeing a doctor), or after several refills the set has become messy and uneven.",
        "Koko setti poistetaan, kun: ripset pysyvät huonosti, asiakas haluaa tauon, asiakkaalla on reaktio (poista kaikki ja neuvo hakeutumaan lääkäriin) tai useiden huoltojen jälkeen setti on sotkuinen ja epätasainen."
      ),
      l3(
        "Tháo xong, mi thật thường trông thưa và ngắn hơn khách nhớ — vì khách đã quen nhìn mi nối. Nói trước, thật nhẹ nhàng. Không tháo một nửa rồi để đó, không chỉ khách tự tháo ở nhà.",
        "After removal the natural lashes often look sparser and shorter than the client remembers — they have got used to the extensions. Say so beforehand, gently. Never leave a set half removed, and never tell clients to remove lashes at home.",
        "Poiston jälkeen omat ripset näyttävät usein harvemmilta ja lyhyemmiltä kuin asiakas muistaa — hän on tottunut pidennyksiin. Kerro siitä etukäteen lempeästi. Älä jätä settiä puoliksi poistetuksi äläkä neuvo asiakasta poistamaan ripsiä kotona."
      ),
      l3(
        "Dặn khách: không dụi, không tự bứt, sản phẩm không dầu quanh mắt, rửa và chải mi nhẹ mỗi ngày, không kẹp uốn mi, tránh mascara chống nước, ngủ nằm ngửa hay nghiêng nhẹ, không úp mặt xuống gối.",
        "Teach the client: no rubbing, no picking, oil-free products around the eyes, gentle daily cleansing and brushing, no lash curler, avoid waterproof mascara, sleep on the back or lightly on the side, not face down.",
        "Opeta asiakkaalle: ei hieromista eikä nyppimistä, öljyttömät tuotteet silmien ympärillä, kevyt päivittäinen pesu ja harjaus, ei ripsitaivutinta, vältä vedenkestävää ripsiväriä, nuku selällään tai kevyesti kyljellään, ei vatsallaan."
      ),
    ],
    tips: [
      l3(
        "Hẹn lịch dặm tiếp theo ngay trong VaraaAi trước khi khách ra về, và ghi lý do mi rụng (nếu có) vào “Ghi chú nội bộ” trong hồ sơ khách.",
        "Book the next refill in VaraaAi before the client leaves, and note any cause of lash loss in the client's internal notes.",
        "Varaa seuraava huolto VaraaAi:ssa ennen kuin asiakas lähtee, ja kirjaa mahdollinen ripsien lähtemisen syy asiakkaan sisäisiin muistiinpanoihin."
      ),
    ],
    quiz: [
      {
        q: l3("Vì sao không bao giờ được kéo sợi mi nối ra?", "Why must you never pull an extension off?", "Miksi pidennystä ei koskaan saa vetää irti?"),
        options: [
          l3("Vì sẽ làm mất thời gian", "Because it wastes time", "Koska se vie aikaa"),
          l3("Vì keo dính sợi nối vào mi thật, kéo là kéo luôn mi thật khỏi chân mi và làm tổn thương chân mi", "Because the glue holds it to the natural lash, so pulling pulls the natural lash out and damages the follicle", "Koska liima pitää sen kiinni luomuripsessä, joten vetäminen irrottaa luomuripsen ja vahingoittaa karvatuppea"),
          l3("Vì sợi nối sẽ không dùng lại được", "Because the extension can't be reused", "Koska pidennystä ei voi käyttää uudelleen"),
        ],
        answer: 1,
        why: l3(
          "Làm mềm keo bằng chất tháo rồi trượt ra; kéo nhiều lần làm mi mọc lại thưa và yếu hơn.",
          "Soften the bond with remover and slide it off; repeated pulling makes lashes grow back thinner and weaker.",
          "Pehmennä liima poistoaineella ja liu'uta pidennys pois; toistuva vetäminen saa ripset kasvamaan harvempina ja heikompina."
        ),
      },
      {
        q: l3("Khách quay lại sau 2–3 tuần. Những sợi nào thường cần gỡ khi dặm?", "A client returns after 2–3 weeks. Which extensions usually need removing at the refill?", "Asiakas palaa 2–3 viikon jälkeen. Mitkä pidennykset yleensä poistetaan huollossa?"),
        options: [
          l3("Sợi đã mọc dài, xoay hay chĩa ra, chỗ dính chùm và sợi gắn lỏng", "Grown-out, twisted or sticking-out extensions, stickies and loose ones", "Ulos kasvaneet, kiertyneet tai sojottavat pidennykset, tarttumat ja löysät"),
          l3("Tất cả, lần nào cũng tháo hết", "All of them, every time", "Kaikki, joka kerta"),
          l3("Không gỡ sợi nào, chỉ gắn thêm", "None, just add more", "Ei mitään, lisätään vain uusia"),
        ],
        answer: 0,
        why: l3(
          "Sợi mọc dài nặng ở ngọn, làm mi thật bị kéo và xoắn; sợi còn đẹp, sát mí thì giữ lại.",
          "Grown-out extensions weigh on the tip and twist the natural lash; the neat ones close to the lid stay.",
          "Ulos kasvaneet painavat kärkeä ja kiertävät luomuripsiä; siistit, luomen lähellä olevat jätetään."
        ),
      },
      {
        q: l3("Khách thấy cay khi bạn đang tháo mi. Bạn làm gì?", "The client feels stinging while you are removing lashes. What do you do?", "Asiakasta kirvelee poiston aikana. Mitä teet?"),
        options: [
          l3("Làm nhanh hơn cho xong", "Work faster to finish", "Teen nopeammin, jotta valmistuu"),
          l3("Bảo khách mở mắt ra xem", "Ask the client to open their eyes", "Pyydän asiakasta avaamaan silmät"),
          l3("Dừng ngay, lau sạch chất tháo và xử lý như bài xử lý sự cố", "Stop at once, wipe off the remover and act as in the incidents lesson", "Lopetan heti, pyyhin poistoaineen pois ja toimin vahinkotilanteiden tunnin mukaan"),
        ],
        answer: 2,
        why: l3(
          "Chất tháo không được vào mắt; cay là dấu hiệu phải dừng ngay.",
          "Remover must not get into the eye; stinging is the signal to stop at once.",
          "Poistoainetta ei saa joutua silmään; kirvely on merkki lopettaa heti."
        ),
      },
    ],
  },
  {
    slug: "mi-dam-thao",
    course: "p-lash",
    style: "practice",
    title: l3("Dặm và tháo mi: thực hành từng bước", "Refills and removal: step by step", "Huolto ja poisto: vaihe vaiheelta"),
    summary: l3(
      "Hai việc, từng bước. Dặm mi: hỏi thăm và nhìn mắt, làm sạch, miếng lót, kiểm tra từng sợi, gỡ sợi mọc dài bằng một chấm kem tháo đúng mối keo rồi trượt ra (không kéo), dặm mới theo bản đồ đã ghi, kiểm tra dính chùm, hẹn lịch và ghi lại. Tháo hết cả bộ: miếng lót bảo vệ, kem tháo mỏng dọc mối keo, chờ đúng thời gian hãng hướng dẫn, vuốt nhẹ từ chân ra ngọn, rửa sạch, kiểm tra mi thật và dặn dò.",
      "Two jobs, step by step. Refill: check in and look at the eyes, cleanse, pads, inspect every lash, remove grown-out extensions with a dot of remover on the bond only and slide them off (never pull), refill following the recorded map, check for stickies, book and record. Full removal: protective pads, a thin line of cream remover along the bonds, wait the maker's time, glide gently from base to tip, cleanse, check the natural lashes and give aftercare.",
      "Kaksi työtä vaihe vaiheelta. Huolto: kuulumiset ja silmien tarkistus, puhdistus, tyynyt, jokaisen ripsen tarkistus, ulos kasvaneiden poisto pisaralla poistoainetta vain liimakohtaan ja liu'uttamalla (ei koskaan vetämällä), täyttö kirjatun kartan mukaan, tarttumien tarkistus, ajanvaraus ja kirjaus. Koko setin poisto: suojaavat tyynyt, ohut raita voidemaista poistoainetta liimakohtiin, valmistajan vaikutusaika, kevyt pyyhkäisy tyvestä kärkeen, puhdistus, omien ripsien tarkistus ja jälkihoito-ohjeet."
    ),
    video: video("mi-dam-thao", 274, "2026-11-17"),
    notice: l3(
      "Loại chất tháo, lượng bôi và thời gian chờ: luôn theo hướng dẫn của hãng. Chất tháo không được vào mắt; khách thấy cay thì dừng ngay, lau sạch và xử lý như bài “Xử lý sự cố”. Khách tháo vì phản ứng thì khuyên đi khám. Quy định về dịch vụ và sản phẩm làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Remover type, amount and waiting time: always as the maker says. Remover must never get into the eye; if the client feels stinging, stop at once, wipe it off and act as in “Incidents”. If the set is removed because of a reaction, advise the client to see a doctor. Rules on beauty services and products differ by country. This is a training aid, not a licence.",
      "Poistoaineen tyyppi, määrä ja vaikutusaika: aina valmistajan ohjeen mukaan. Poistoainetta ei saa joutua silmään; jos asiakasta kirvelee, lopeta heti, pyyhi aine pois ja toimi kuten tunnilla ”Vahinkotilanteet”. Jos setti poistetaan reaktion vuoksi, neuvo asiakasta hakeutumaan lääkäriin. Kauneuspalveluja ja -tuotteita koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["lich-hen", "khach-hang", "dich-vu"],
    steps: [
      l3(
        "Dặm — hỏi thăm khi khách ngồi, mở mắt: lần trước có đỏ, ngứa, sưng không, mi rụng nhiều hay ít. Nhìn mắt dưới ánh sáng tốt; có dấu hiệu phản ứng thì không dặm mà tháo hết.",
        "Refill — check in while the client sits with eyes open: any redness, itching or swelling after last time, how many lashes fell. Look at the eyes in good light; any sign of a reaction means no refill but a full removal.",
        "Huolto — kysy kuulumiset asiakkaan istuessa silmät auki: punoitusta, kutinaa tai turvotusta viime kerran jälkeen, paljonko ripsiä lähti. Katso silmiä hyvässä valossa; reaktion merkit tarkoittavat koko setin poistoa, ei huoltoa."
      ),
      l3(
        "Rửa cả mi nối lẫn mi thật bằng dung dịch rửa mi, xả nước sạch, làm khô; dán miếng lót che kín mi dưới, không chạm viền mắt.",
        "Cleanse extensions and natural lashes with lash shampoo, rinse, dry; place pads covering every lower lash without touching the waterline.",
        "Pese pidennykset ja omat ripset ripsishampoolla, huuhtele ja kuivaa; aseta tyynyt peittämään kaikki alaripset koskematta limakalvoreunaan."
      ),
      l3(
        "Chải mi rồi lướt nhíp thẳng qua từng sợi: tìm sợi đã mọc dài, xoay ngang hay chĩa ra, chỗ dính chùm và sợi lỏng.",
        "Brush through, then glide a straight tweezer over each lash: look for grown-out, twisted or sticking-out extensions, stickies and loose ones.",
        "Harjaa ja käy suorilla pinseteillä läpi jokainen ripsi: etsi ulos kasvaneet, kiertyneet tai sojottavat pidennykset, tarttumat ja löysät."
      ),
      l3(
        "Gỡ sợi mọc dài: chấm một chút kem tháo bằng cọ nhỏ dùng một lần đúng vào mối keo của sợi đó, không chạm da mí và chân mi; chờ theo hướng dẫn của hãng.",
        "Remove grown-out extensions: dab a little cream remover with a single-use micro-brush onto that extension's bond only, never on the lid skin or roots; wait as the maker says.",
        "Ulos kasvaneiden poisto: taputtele kertakäyttöisellä mikroharjalla hieman voidemaista poistoainetta vain kyseisen pidennyksen liimakohtaan, ei luomen iholle eikä tyveen; odota valmistajan ohjeen mukaan."
      ),
      l3(
        "Một nhíp giữ yên mi thật, nhíp kia trượt sợi nối về phía ngọn. Không trượt ra là keo chưa mềm: chấm thêm, chờ thêm, không kéo. Lau sạch kem còn lại trên mi thật.",
        "One tweezer holds the natural lash steady, the other slides the extension towards the tip. If it won't slide, the bond isn't soft yet: add a little more, wait longer, never pull. Wipe the remaining remover off the natural lash.",
        "Yksi pinsetti pitää luomuripsen paikallaan, toinen liu'uttaa pidennystä kärkeä kohti. Jos se ei liu'u, liima ei ole vielä pehmennyt: lisää hieman, odota, älä koskaan vedä. Pyyhi jäljelle jäänyt poistoaine luomuripsestä."
      ),
      l3(
        "Dặm mới theo bản đồ mi đã ghi: tách một sợi, gắn như bài classic hay volume. Mi non quá ngắn để lần sau; không chọn sợi dài hay dày hơn sức mi thật. Kiểm tra dính chùm sau mỗi vùng, so hai mắt, gỡ miếng lót khi mắt vẫn nhắm. Bộ mi quá rối thì đề nghị tháo hết làm lại.",
        "Refill following the recorded map: isolate one lash and apply as in the classic or volume lesson. Leave baby lashes that are too short for next time; never go longer or heavier than the natural lash can carry. Check for stickies after each zone, compare both eyes, remove the pads with the eyes closed. If the set is too messy, suggest a full removal and a new set.",
        "Täytä kirjatun kartan mukaan: eristä yksi ripsi ja kiinnitä kuten klassisten tai volyymin tunnilla. Liian lyhyet nuoret ripset jätetään seuraavaan kertaan; ei koskaan pidempää tai painavampaa kuin luomuripsi kestää. Tarkista tarttumat jokaisen alueen jälkeen, vertaa silmiä ja poista tyynyt silmien ollessa kiinni. Jos setti on liian sotkuinen, ehdota poistoa ja uutta settiä."
      ),
      l3(
        "Hẹn lịch dặm tiếp theo, thường sau 2–3 tuần, và ghi lại: mi giữ thế nào, gỡ nhiều hay ít, nguyên nhân rụng, đã dặn gì.",
        "Book the next refill, usually after 2–3 weeks, and record: how the lashes held, how many were removed, the cause of loss, what you advised.",
        "Varaa seuraava huolto, yleensä 2–3 viikon päähän, ja kirjaa: miten ripset pysyivät, paljonko poistettiin, lähtemisen syy ja mitä neuvoit."
      ),
      l3(
        "Tháo hết — miếng lót che kín mi dưới để bảo vệ da và mi dưới; mắt nhắm kín; dặn khách cay hay nóng thì báo ngay. Khách tháo vì phản ứng: làm thật nhẹ, thật chậm.",
        "Full removal — pads cover every lower lash to protect the skin and lower lashes; eyes closed; ask the client to say at once if anything stings or burns. If it is because of a reaction: work very gently and slowly.",
        "Koko setin poisto — tyynyt peittävät kaikki alaripset suojaten ihoa ja alaripsiä; silmät kiinni; pyydä asiakasta kertomaan heti kirvelystä tai kuumotuksesta. Jos syynä on reaktio: työskentele erityisen hellästi ja hitaasti."
      ),
      l3(
        "Bôi một lớp kem tháo mỏng dọc các mối keo, cách chân mi một chút, không chạm da mí hay viền mắt, không bôi thừa. Chờ đúng thời gian hãng hướng dẫn, ở bên cạnh khách. Rồi vuốt nhẹ bằng que bông hay cọ nhỏ sạch từ chân ra ngọn, mỗi lần một mặt sạch; sợi còn bám thì bôi thêm, chờ thêm, không kéo.",
        "Apply a thin line of cream remover along the bonds, a little away from the roots, never on the lid skin or waterline, no excess. Wait the maker's time, staying with the client. Then glide gently from base to tip with a clean cotton swab or micro-brush, a clean side each time; if extensions still hold, add more, wait, never pull.",
        "Levitä ohut raita voidemaista poistoainetta liimakohtiin hieman irti tyvestä, ei luomen iholle eikä limakalvoreunaan, ei ylimäärää. Odota valmistajan vaikutusaika asiakkaan luona. Pyyhkäise sitten hellästi tyvestä kärkeen puhtaalla pumpulipuikolla tai mikroharjalla, joka kerta puhtaalla puolella; jos pidennyksiä jää, lisää, odota, älä koskaan vedä."
      ),
      l3(
        "Rửa sạch kem tháo bằng dung dịch rửa mi, xả nước, làm khô. Kiểm tra mi thật, gỡ miếng lót, cho khách mở mắt từ từ, nói trước rằng mi thật thường trông thưa hơn khách nhớ. Dặn dò, bỏ đồ dùng một lần vào thùng có nắp, khử khuẩn nhíp.",
        "Wash off the remover with lash shampoo, rinse and dry. Check the natural lashes, remove the pads, let the client open their eyes slowly, and tell them natural lashes often look sparser than they remember. Give aftercare, put single-use items in a lidded bin, disinfect the tweezers.",
        "Pese poistoaine pois ripsishampoolla, huuhtele ja kuivaa. Tarkista omat ripset, poista tyynyt, anna asiakkaan avata silmät hitaasti ja kerro, että omat ripset näyttävät usein harvemmilta kuin hän muistaa. Anna jälkihoito-ohjeet, laita kertakäyttötarvikkeet kannelliseen roskakoriin ja desinfioi pinsetit."
      ),
    ],
    tips: [
      l3(
        "Đừng vội: vuốt khi keo chưa mềm là kéo luôn mi thật. Chờ đủ thời gian hãng hướng dẫn.",
        "Don't rush: gliding before the bond is soft pulls out natural lashes. Wait the full time the maker gives.",
        "Älä kiirehdi: pyyhkäisy ennen kuin liima on pehmennyt irrottaa omia ripsiä. Odota valmistajan koko vaikutusaika."
      ),
      l3(
        "Mở bản đồ mi trong “Ghi chú nội bộ” ở hồ sơ khách trên VaraaAi trước khi dặm, và cập nhật ghi chú khi xong.",
        "Open the lash map in the client's internal notes in VaraaAi before the refill, and update the notes when you finish.",
        "Avaa ripsikartta asiakkaan sisäisistä muistiinpanoista VaraaAi:ssa ennen huoltoa ja päivitä muistiinpanot lopuksi."
      ),
    ],
    quiz: [
      {
        q: l3("Khi gỡ một sợi đã mọc dài lúc dặm, bôi chất tháo ở đâu?", "When removing one grown-out extension at a refill, where does the remover go?", "Kun huollossa poistetaan yksi ulos kasvanut pidennys, mihin poistoaine laitetaan?"),
        options: [
          l3("Dọc cả hàng mi cho nhanh", "Along the whole lash line to save time", "Koko ripsirajaan ajan säästämiseksi"),
          l3("Lên da mí, sát chân mi", "On the lid skin, right at the roots", "Luomen iholle, aivan tyveen"),
          l3("Một chấm nhỏ đúng vào mối keo của sợi đó, bằng cọ nhỏ", "A tiny dot on that extension's bond only, with a micro-brush", "Pieni pisara vain kyseisen pidennyksen liimakohtaan mikroharjalla"),
        ],
        answer: 2,
        why: l3(
          "Chỉ làm mềm mối keo cần gỡ; các sợi còn đẹp giữ nguyên, và chất tháo không chạm da hay mắt.",
          "Only the bond you want to release is softened; the neat extensions stay, and the remover never touches skin or eye.",
          "Vain irrotettava liimakohta pehmennetään; siistit pidennykset jäävät, eikä poistoaine kosketa ihoa tai silmää."
        ),
      },
      {
        q: l3("Sợi nối không trượt ra khi bạn vuốt. Làm gì tiếp?", "An extension won't slide off when you glide. What next?", "Pidennys ei liu'u irti pyyhkäistessä. Mitä seuraavaksi?"),
        options: [
          l3("Bôi thêm một chút chất tháo, chờ thêm, rồi thử lại; không kéo", "Add a little more remover, wait longer, try again; never pull", "Lisään hieman poistoainetta, odotan ja yritän uudelleen; en koskaan vedä"),
          l3("Kéo mạnh hơn một chút", "Pull a little harder", "Vedän hieman kovempaa"),
          l3("Cắt sợi mi thật cho nhanh", "Cut the natural lash to save time", "Leikkaan luomuripsen ajan säästämiseksi"),
        ],
        answer: 0,
        why: l3(
          "Không trượt ra nghĩa là keo chưa mềm; kéo lúc này là kéo luôn mi thật khỏi chân mi.",
          "If it won't slide, the bond isn't soft yet; pulling now pulls the natural lash out of the follicle.",
          "Jos se ei liu'u, liima ei ole vielä pehmennyt; vetäminen nyt irrottaa luomuripsen karvatupesta."
        ),
      },
      {
        q: l3("Vì sao miếng lót vẫn quan trọng khi tháo hết cả bộ?", "Why do the pads still matter during a full removal?", "Miksi tyynyt ovat tärkeitä myös koko setin poistossa?"),
        options: [
          l3("Không quan trọng, có thể bỏ qua", "They don't matter, you can skip them", "Eivät ole tärkeitä, ne voi jättää pois"),
          l3("Chúng che mi dưới và da, giữ chất tháo không chạm vào mắt và mi dưới", "They cover the lower lashes and skin, keeping the remover off them and away from the eye", "Ne peittävät alaripset ja ihon ja pitävät poistoaineen erossa niistä ja silmästä"),
          l3("Để giữ các sợi nối không rơi xuống sàn", "To stop extensions falling on the floor", "Jotta pidennykset eivät putoa lattialle"),
        ],
        answer: 1,
        why: l3(
          "Miếng lót bảo vệ da và mi dưới; chất tháo luôn phải tránh xa mắt.",
          "The pads protect the skin and lower lashes; remover must always stay away from the eye.",
          "Tyynyt suojaavat ihoa ja alaripsiä; poistoaineen on aina pysyttävä kaukana silmästä."
        ),
      },
    ],
  },
  {
    slug: "lash-lift-hieu-dung",
    course: "p-lash",
    style: "theory",
    title: l3("Uốn mi và nhuộm mi: hiểu đúng để cong đẹp và an toàn", "Lash lift and tint: understand them for a beautiful, safe curl", "Ripsien kestotaivutus ja värjäys: ymmärrä ne, niin taivutus on kaunis ja turvallinen"),
    summary: l3(
      "Uốn mi hoạt động thế nào (thuốc làm mềm, khuôn silicone, thuốc cố định), ai hợp với uốn mi, thời gian theo loại mi và theo hãng, chọn và đặt khuôn, vì sao quá giờ làm mi xù và gãy, thuốc nhuộm mi và thử phản ứng trước khi nhuộm, cảnh báo trên nhãn ở EU, khi nào không làm, thuốc không bao giờ vào mắt, dặn dò và kết quả giữ được bao lâu.",
      "How a lash lift works (a softening lotion, a silicone shield, a setting lotion), who it suits, timing by lash type and by product, choosing and placing the shield, why over-processing leaves lashes frizzy and broken, lash tints and the allergy alert test before tinting, EU label warnings, when not to treat, never letting product into the eye, aftercare and how long the result lasts.",
      "Miten kestotaivutus toimii (pehmentävä aine, silikonimuotti, kiinnittävä aine), kenelle se sopii, vaikutusajat ripsityypin ja tuotteen mukaan, muotin valinta ja asettelu, miksi liian pitkä käsittely tekee ripsistä kihartuneet ja katkeilevat, ripsivärit ja allergiatesti ennen värjäystä, EU:n pakkausvaroitukset, milloin ei hoideta, tuote ei koskaan saa joutua silmään, kotihoito ja tuloksen kesto."
    ),
    video: video("lash-lift-hieu-dung", 264, "2026-11-17"),
    notice: l3(
      "Thời gian để thuốc, cỡ khuôn và cách thử phản ứng luôn theo hướng dẫn của sản phẩm bạn dùng; bài này không đưa ra con số thời gian. Thuốc không được vào mắt; nếu lỡ vào mắt, rửa ngay bằng nhiều nước sạch và đi khám nếu mắt vẫn đau, đỏ hay nhìn mờ. Quy định về sản phẩm và dịch vụ làm đẹp khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Processing times, shield sizes and the allergy test always follow the instructions of the product you use; this lesson gives no timings. Products must never get into the eye; if they do, rinse at once with plenty of clean water and seek medical help if the eye stays painful, red or blurry. Rules on beauty products and services differ by country. This is a training aid, not a licence.",
      "Vaikutusajat, muottikoot ja allergiatesti tehdään aina käyttämäsi tuotteen ohjeiden mukaan; tunnilla ei anneta aikoja. Tuote ei saa koskaan joutua silmään; jos niin käy, huuhtele heti runsaalla puhtaalla vedellä ja hakeudu hoitoon, jos silmä on edelleen kipeä, punainen tai näkö sumea. Kauneustuotteita ja -palveluja koskevat säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    sources: [
      { label: "Commission Regulation (EU) 2017/237 — hair dyes and eyelash tints: restrictions and label warnings", url: "https://eur-lex.europa.eu/eli/reg/2017/237/oj/eng" },
    ],
    related: ["khach-hang", "dich-vu", "lich-hen"],
    steps: [
      l3(
        "Uốn mi không gắn thêm sợi nào: sợi mi thật được chải thẳng lên một khuôn silicone dán trên mí, thuốc thứ nhất làm mềm cấu trúc bên trong sợi mi để nhận dáng mới, thuốc thứ hai cố định dáng đó.",
        "A lash lift adds no lashes: the natural lashes are combed up onto a silicone shield on the eyelid, the first lotion softens the lash's inner structure so it takes the new shape, and the second lotion sets that shape.",
        "Kestotaivutus ei lisää ripsiä: luomuripset kammataan silmäluomelle kiinnitetyn silikonimuotin päälle, ensimmäinen aine pehmentää ripsen sisärakenteen uuteen muotoon ja toinen aine kiinnittää muodon."
      ),
      l3(
        "Hợp với mi thật khá dài nhưng mọc thẳng hay chúc xuống, và khách muốn ít chăm sóc. Mi rất ngắn khó lên dáng đẹp. Khách đang nối mi thì tháo mi nối trước (bài “Dặm và tháo mi”).",
        "It suits fairly long natural lashes that grow straight or downward, and clients who want low maintenance. Very short lashes are hard to shape nicely. Clients with extensions have them removed first (see the refills and removal lesson).",
        "Sopii melko pitkille luomuripsille, jotka kasvavat suoraan tai alaspäin, ja asiakkaille, jotka haluavat vähän hoitoa. Hyvin lyhyitä ripsiä on vaikea muotoilla kauniisti. Pidennykset poistetaan ensin (huolto ja poisto -tunti)."
      ),
      l3(
        "Không có thời gian chung: tuỳ loại mi (mảnh, bình thường, dày cứng) và tuỳ sản phẩm. Mi mảnh thường cần ít thời gian hơn, mi dày cứng lâu hơn. Luôn theo bảng của hãng.",
        "There is no single time: it depends on the lash type (fine, normal, coarse) and the product. Fine lashes usually need less time, coarse lashes more. Always follow the manufacturer's chart.",
        "Yhteistä aikaa ei ole: se riippuu ripsityypistä (ohut, normaali, paksu) ja tuotteesta. Ohuet ripset tarvitsevat yleensä vähemmän aikaa, paksut enemmän. Noudata aina valmistajan taulukkoa."
      ),
      l3(
        "Chọn khuôn theo độ dài mi và độ cong muốn: mi ngắn khuôn nhỏ, mi dài khuôn lớn; cùng độ dài, khuôn nhỏ cong mạnh hơn, khuôn lớn cong nhẹ hơn. Khuôn phải dán sát chân mi; khuôn xa chân mi làm sợi mi gập khúc.",
        "Choose the shield by lash length and the curl wanted: short lashes, small shield; long lashes, larger shield; for the same length, a smaller shield gives more curl and a larger one a softer lift. The shield sits right at the lash line; a shield placed too high leaves a crimp in the lash.",
        "Valitse muotti ripsen pituuden ja halutun taivutuksen mukaan: lyhyet ripset, pieni muotti; pitkät ripset, suurempi; samalla pituudella pienempi muotti taivuttaa enemmän ja suurempi pehmeämmin. Muotti asetetaan aivan ripsirajaan; liian ylös asetettu muotti jättää ripseen mutkan."
      ),
      l3(
        "Quá giờ hoặc khuôn quá nhỏ làm mi xoăn tít, xù, khô, giòn và gãy, và không sửa ngay được: phải chờ mi mới mọc. Không uốn lại sớm hơn hãng khuyên.",
        "Too long a processing time or too small a shield leaves lashes over-curled, frizzy, dry, brittle and broken, and it cannot be fixed at once: you wait for new lashes to grow. Do not lift again sooner than the manufacturer advises.",
        "Liian pitkä vaikutusaika tai liian pieni muotti tekee ripsistä ylikihartuneet, pörröiset, kuivat, hauraat ja katkeilevat, eikä sitä voi korjata heti: on odotettava uusia ripsiä. Älä taivuta uudelleen valmistajan suositusta aiemmin."
      ),
      l3(
        "Nhuộm chỉ bằng thuốc dành cho mi và mày, pha đúng tỉ lệ ngay trước khi dùng, màu theo màu mày và tóc. Không bao giờ dùng thuốc nhuộm tóc cho mi. Ở EU, nhãn thuốc nhuộm mi có cảnh báo dị ứng; đọc lại nhãn mỗi khi đổi sản phẩm.",
        "Tint only with products made for lashes and brows, mixed exactly as directed just before use, in a shade that suits the brows and hair. Never use hair dye on lashes. In the EU, eyelash tint labels carry allergy warnings; read the label again whenever you change product.",
        "Värjää vain ripsille ja kulmille tarkoitetuilla tuotteilla, sekoita ohjeen mukaan juuri ennen käyttöä ja valitse sävy kulmien ja hiusten mukaan. Älä koskaan käytä hiusväriä ripsiin. EU:ssa ripsivärien pakkauksissa on allergiavaroitukset; lue pakkaus uudelleen aina, kun vaihdat tuotetta."
      ),
      l3(
        "Nhiều hãng yêu cầu thử phản ứng trước khi nhuộm, thường 48 giờ trước, ở vùng da hãng chỉ định (thường sau tai hoặc trong khuỷu tay). Có đỏ, ngứa, sưng, rát thì không nhuộm. Ghi ngày và kết quả vào hồ sơ khách. Xem bài “Dị ứng và hoá chất”.",
        "Many manufacturers require an allergy alert test before tinting, often 48 hours before, on the skin area they name (often behind the ear or inside the elbow). Redness, itching, swelling or burning means no tint. Record the date and result in the client's file. See the allergy lesson.",
        "Monet valmistajat edellyttävät allergiatestiä ennen värjäystä, usein 48 tuntia ennen, valmistajan nimeämälle ihoalueelle (usein korvan taakse tai kyynärtaipeeseen). Punoitus, kutina, turvotus tai kirvely tarkoittaa, ettei värjätä. Kirjaa päivä ja tulos asiakastietoihin. Katso allergiatunti."
      ),
      l3(
        "Không làm khi mắt đỏ, viêm, chảy nước, mới mổ mắt, da quanh mắt kích ứng, hoặc khách từng phản ứng với thuốc uốn hay nhuộm (bài “Khi nào không làm cho khách”). Không chắc thì đừng làm.",
        "Do not treat red, inflamed or watery eyes, after recent eye surgery, with irritated skin around the eyes, or when the client has reacted to lift or tint products before (see “When not to treat a customer”). If unsure, don't.",
        "Ei hoideta, jos silmä on punainen, tulehtunut tai vetistää, silmäleikkauksen jälkeen, jos silmänympärysiho on ärtynyt tai asiakas on reagoinut taivutus- tai väriaineisiin aiemmin (”Milloin asiakasta ei hoideta”). Jos epäilet, älä tee."
      ),
      l3(
        "Thuốc không bao giờ vào mắt: mắt nhắm suốt buổi, thuốc uốn chỉ bôi phần dưới sợi mi, cách da, không lên da mí và không ra tới ngọn, lấy thật ít. Lỡ vào mắt: rửa ngay bằng nhiều nước sạch, mắt vẫn đau, đỏ, mờ thì đi khám.",
        "Product never goes into the eye: the eyes stay closed throughout, lift lotion goes only on the lower part of the lashes, off the skin, never on the eyelid or out to the tips, and very little of it. If it gets in: rinse at once with plenty of clean water and seek medical help if pain, redness or blurring persists.",
        "Tuote ei koskaan saa joutua silmään: silmät ovat kiinni koko ajan, taivutusainetta laitetaan vain ripsien alaosaan, irti ihosta, ei luomelle eikä kärkiin, ja hyvin vähän. Jos ainetta joutuu silmään: huuhtele heti runsaalla puhtaalla vedellä ja hakeudu hoitoon, jos kipu, punoitus tai sumeus jatkuu."
      ),
      l3(
        "Dặn dò: giữ mi khô trong thời gian hãng khuyên (thường một ngày), lúc đó không mascara, không xông hơi, không dụi mắt, không ngủ úp mặt. Kết quả thường giữ khoảng 6–8 tuần, gần bằng vòng đời sợi mi (bài classic).",
        "Aftercare: keep the lashes dry for the time the product says (often one day), and meanwhile no mascara, no steam, no rubbing, no sleeping face down. The result usually lasts about 6–8 weeks, roughly one lash growth cycle (see the classic lesson).",
        "Kotihoito: pidä ripset kuivina tuotteen ilmoittaman ajan (usein vuorokauden), eikä sinä aikana ripsiväriä, höyryä, hieromista tai kasvoillaan nukkumista. Tulos kestää yleensä noin 6–8 viikkoa, suunnilleen ripsen kasvusyklin (klassisten ripsien tunti)."
      ),
    ],
    tips: [
      l3(
        "Một chuyện rất hay gặp: để thuốc lâu thêm vài phút “cho chắc” vì khách muốn thật cong. Đừng. Muốn cong hơn thì chọn khuôn nhỏ hơn một chút ở lần sau, không kéo dài thời gian.",
        "A very common mistake: leaving the lotion on a few extra minutes “to be sure” because the client wants a strong curl. Don't. For more curl, choose a slightly smaller shield next time, not a longer time.",
        "Hyvin yleinen virhe: aine jätetään muutamaksi minuutiksi pidempään ”varmuuden vuoksi”, koska asiakas haluaa vahvan taivutuksen. Älä tee niin. Jos haluat enemmän taivutusta, valitse seuraavalla kerralla hieman pienempi muotti, älä pidempää aikaa."
      ),
      l3(
        "Trong VaraaAi, ghi vào ghi chú của khách ngày thử phản ứng và kết quả, cỡ khuôn, thời gian từng thuốc và màu nhuộm, để lần sau làm lại y như vậy hoặc chỉnh đúng chỗ.",
        "In VaraaAi, note the allergy test date and result, shield size, each lotion's time and the tint shade in the client's notes, so next time you can repeat it exactly or adjust the right thing.",
        "Kirjaa VaraaAi:ssa asiakkaan muistiinpanoihin allergiatestin päivä ja tulos, muottikoko, kunkin aineen aika ja värisävy, jotta voit ensi kerralla toistaa saman tai korjata oikeaa kohtaa."
      ),
    ],
    quiz: [
      {
        q: l3("Mỗi thuốc uốn để trên mi bao lâu?", "How long does each lift lotion stay on?", "Kuinka kauan kukin taivutusaine vaikuttaa?"),
        options: [
          l3("Luôn đúng mười phút cho mọi người", "Always exactly ten minutes for everyone", "Aina tasan kymmenen minuuttia kaikille"),
          l3("Càng lâu càng cong, càng tốt", "The longer the better, for more curl", "Mitä pidempään, sitä parempi taivutus"),
          l3("Tuỳ loại mi và sản phẩm, theo bảng của hãng", "It depends on the lash type and product, as in the manufacturer's chart", "Ripsityypin ja tuotteen mukaan, valmistajan taulukon mukaisesti"),
        ],
        answer: 2,
        why: l3(
          "Mi mảnh thường cần ít thời gian hơn, mi dày cứng lâu hơn, và mỗi sản phẩm khác nhau. Quá giờ làm mi xù, giòn và gãy.",
          "Fine lashes usually need less time, coarse lashes more, and every product differs. Over-processing leaves lashes frizzy, brittle and broken.",
          "Ohuet ripset tarvitsevat yleensä vähemmän aikaa, paksut enemmän, ja tuotteet eroavat toisistaan. Liian pitkä käsittely tekee ripsistä pörröiset, hauraat ja katkeilevat."
        ),
      },
      {
        q: l3("Trước khi nhuộm mi, nhiều hãng yêu cầu gì?", "Before tinting, what do many manufacturers require?", "Mitä monet valmistajat edellyttävät ennen ripsien värjäystä?"),
        options: [
          l3("Thử phản ứng, thường khoảng 48 giờ trước, theo hướng dẫn của hãng", "An allergy alert test, often about 48 hours before, as the product instructs", "Allergiatestin, usein noin 48 tuntia ennen, tuotteen ohjeen mukaan"),
          l3("Không cần gì nếu khách đã từng nhuộm tóc", "Nothing if the client has dyed their hair before", "Ei mitään, jos asiakas on värjännyt hiuksensa aiemmin"),
          l3("Nhỏ một giọt thuốc vào mắt để thử", "A drop of tint in the eye to test", "Tipan väriä silmään testiksi"),
        ],
        answer: 0,
        why: l3(
          "Thuốc nhuộm có thể gây dị ứng nặng; ở EU nhãn thuốc nhuộm mi có cảnh báo dị ứng. Thử trên vùng da hãng chỉ định, ghi ngày và kết quả. Thuốc không bao giờ được vào mắt.",
          "Tints can cause serious allergic reactions; in the EU, eyelash tint labels carry allergy warnings. Test on the skin area the product names and record the date and result. Product must never get into the eye.",
          "Värit voivat aiheuttaa vakavia allergisia reaktioita; EU:ssa ripsivärien pakkauksissa on allergiavaroitukset. Testaa tuotteen nimeämälle ihoalueelle ja kirjaa päivä ja tulos. Tuote ei saa koskaan joutua silmään."
        ),
      },
      {
        q: l3("Thuốc uốn thứ nhất bôi ở đâu?", "Where does the first lift lotion go?", "Mihin ensimmäinen taivutusaine laitetaan?"),
        options: [
          l3("Lên da mí, để thuốc ngấm vào chân mi", "On the eyelid skin, so it soaks into the roots", "Luomen iholle, jotta se imeytyy juuriin"),
          l3("Chỉ phần dưới của sợi mi, cách da, không ra tới ngọn", "Only the lower part of the lashes, off the skin, not out to the tips", "Vain ripsien alaosaan, irti ihosta, ei kärkiin asti"),
          l3("Phủ dày cả sợi mi từ chân đến ngọn", "A thick coat over the whole lash from root to tip", "Paksu kerros koko ripseen tyvestä kärkeen"),
        ],
        answer: 1,
        why: l3(
          "Thuốc trên da dễ gây kích ứng và có thể chảy vào mắt; ngọn mi mảnh, dễ hư. Một lớp mỏng ở phần dưới sợi mi là đủ.",
          "Lotion on the skin irritates and can run into the eye; the fine tips are easily damaged. A thin layer on the lower part of the lashes is enough.",
          "Aine iholla ärsyttää ja voi valua silmään; ohuet kärjet vaurioituvat helposti. Ohut kerros ripsien alaosassa riittää."
        ),
      },
    ],
  },
  {
    slug: "lash-lift",
    course: "p-lash",
    style: "practice",
    title: l3("Uốn mi và nhuộm mi: thực hành từng bước", "Lash lift and tint: step by step", "Ripsien kestotaivutus ja värjäys: vaihe vaiheelta"),
    summary: l3(
      "Uốn mi và nhuộm mi từng bước: tư vấn và thử phản ứng có ghi ngày, làm sạch không dầu, miếng lót, chọn và dán khuôn, đưa mi lên khuôn, thuốc thứ nhất chỉ ở phần dưới sợi mi, phủ màng và bấm giờ theo hãng, lau sạch, thuốc thứ hai, nhuộm, gỡ mi khỏi khuôn, dưỡng mi, dặn dò và ghi lại cho lần sau.",
      "A lash lift and tint step by step: consultation and an allergy alert test with the date recorded, oil-free cleansing, pads, choosing and placing the shield, lashes onto the shield, the first lotion on the lower part of the lashes only, covering and timing as the product says, removing, the second lotion, tint, releasing the lashes, serum, aftercare and notes for next time.",
      "Ripsien kestotaivutus ja värjäys vaihe vaiheelta: konsultaatio ja allergiatesti päivämäärineen, öljytön puhdistus, suojatyynyt, muotin valinta ja kiinnitys, ripset muotille, ensimmäinen aine vain ripsien alaosaan, peittäminen ja ajastus tuotteen ohjeen mukaan, poisto, toinen aine, värjäys, ripsien irrotus, seerumi, kotihoito ja muistiinpanot seuraavaa kertaa varten."
    ),
    video: video("lash-lift", 262, "2026-11-17"),
    notice: l3(
      "Thời gian để thuốc, tỉ lệ pha, cỡ khuôn và cách thử phản ứng luôn theo hướng dẫn của sản phẩm bạn dùng; bài này không đưa ra con số thời gian. Thuốc không được chạm da và không được vào mắt; nếu lỡ vào mắt, rửa ngay bằng nhiều nước sạch và đi khám nếu mắt vẫn đau, đỏ hay nhìn mờ. Quy định khác nhau theo từng nước. Đây là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Processing times, mixing ratios, shield sizes and the allergy test always follow the instructions of the product you use; this lesson gives no timings. Products must not touch the skin or get into the eye; if they do get in, rinse at once with plenty of clean water and seek medical help if the eye stays painful, red or blurry. Rules differ by country. This is a training aid, not a licence.",
      "Vaikutusajat, sekoitussuhteet, muottikoot ja allergiatesti tehdään aina käyttämäsi tuotteen ohjeiden mukaan; tunnilla ei anneta aikoja. Tuotteet eivät saa koskea ihoa eivätkä joutua silmään; jos niin käy, huuhtele heti runsaalla puhtaalla vedellä ja hakeudu hoitoon, jos silmä on edelleen kipeä, punainen tai näkö sumea. Säännöt vaihtelevat maittain. Tämä on koulutusmateriaali, ei ammattipätevyys."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Tư vấn: hỏi về mắt, dị ứng, lần uốn gần nhất; khách đang nối mi thì tháo trước. Nếu có nhuộm, thử phản ứng theo hướng dẫn của hãng (thường khoảng 48 giờ trước) và ghi ngày, kết quả vào hồ sơ khách.",
        "Consultation: ask about the eyes, allergies and the last lift; remove any extensions first. If tinting, do the allergy alert test as the product instructs (often about 48 hours before) and record the date and result in the client's file.",
        "Konsultaatio: kysy silmistä, allergioista ja edellisestä taivutuksesta; mahdolliset pidennykset poistetaan ensin. Jos värjätään, tee allergiatesti tuotteen ohjeen mukaan (usein noin 48 tuntia ennen) ja kirjaa päivä ja tulos asiakastietoihin."
      ),
      l3(
        "Làm sạch mi bằng sản phẩm không dầu, rồi để mi khô hẳn: dầu và mascara còn sót làm thuốc ngấm không đều, mi ướt thì keo dán không bám.",
        "Cleanse the lashes with an oil-free product and let them dry completely: leftover oil and mascara make the lotion work unevenly, and wet lashes will not stick to the shield.",
        "Puhdista ripset öljyttömällä tuotteella ja anna kuivua kokonaan: jäänyt öljy ja ripsiväri saavat aineen vaikuttamaan epätasaisesti, eivätkä märät ripset tartu muottiin."
      ),
      l3(
        "Dán miếng lót dưới mắt, phẳng, che hết mi dưới, không chạm mắt.",
        "Place the under-eye pads flat, covering all the lower lashes, without touching the eye.",
        "Aseta silmänalustyynyt sileästi niin, että ne peittävät kaikki alaripset koskematta silmään."
      ),
      l3(
        "Chọn khuôn theo độ dài mi và độ cong muốn, ướm thử theo bảng của hãng, rồi dán khuôn lên mí trên sát chân mi, theo đường cong của mắt. Khuôn xa chân mi làm sợi mi gập khúc.",
        "Choose the shield by lash length and the curl wanted, test the fit as the manufacturer's chart says, then stick it on the upper eyelid right at the lash line, following the curve of the eye. A shield too far from the lash line crimps the lashes.",
        "Valitse muotti ripsen pituuden ja halutun taivutuksen mukaan, kokeile sopivuus valmistajan taulukon mukaan ja kiinnitä se yläluomelle aivan ripsirajaan silmän kaarta seuraten. Liian kaukana ripsirajasta oleva muotti tekee ripsiin mutkan."
      ),
      l3(
        "Phết lớp keo dán mi mỏng lên khuôn, dùng que tách mi chải từng nhóm nhỏ sợi mi lên, từ đầu mắt ra đuôi: mỗi sợi thẳng, tách riêng, không bắt chéo, chân mi sát mép khuôn, không lẫn mi dưới.",
        "Apply a thin layer of lash adhesive to the shield and use a lifting tool to comb small groups of lashes up, from the inner to the outer corner: each lash straight, separate, not crossing, roots right at the shield's edge, no lower lashes caught.",
        "Levitä muotille ohut kerros ripsiliimaa ja nosta ripsiä pieninä ryhminä nostotyökalulla sisänurkasta ulkonurkkaan: jokainen ripsi suorana, erillään, ristiin menemättä, tyvi muotin reunassa, eikä alaripsiä mukana."
      ),
      l3(
        "Thuốc thứ nhất: lớp mỏng chỉ ở phần dưới sợi mi, từ gần chân lên khoảng giữa; không lên da mí, không ra tới ngọn. Phủ màng bọc, bấm giờ theo bảng của hãng và loại mi; không tự ý để lâu hơn.",
        "First lotion: a thin layer only on the lower part of the lashes, from near the root to about halfway; not on the eyelid, not out to the tips. Cover with film and time it by the manufacturer's chart and the lash type; never leave it on longer.",
        "Ensimmäinen aine: ohut kerros vain ripsien alaosaan, läheltä tyveä noin puoliväliin; ei luomelle eikä kärkiin. Peitä kalvolla ja ajasta valmistajan taulukon ja ripsityypin mukaan; älä koskaan jätä pidempään."
      ),
      l3(
        "Trong lúc chờ, hỏi khách có cay, rát không; nếu có, lau thuốc ra ngay, rửa bằng nước sạch và dừng lại.",
        "While waiting, ask whether anything stings or burns; if so, remove the lotion at once, rinse with clean water and stop.",
        "Kysy odottaessa, kirveleekö tai polttaako; jos kyllä, poista aine heti, huuhtele puhtaalla vedellä ja lopeta."
      ),
      l3(
        "Lau thuốc bằng que bông khô từ chân lên ngọn, mi vẫn nằm yên trên khuôn. Thuốc thứ hai bôi đúng vùng như thuốc thứ nhất, phủ màng, bấm giờ theo hãng, rồi lau sạch.",
        "Remove the lotion with a dry cotton swab from root to tip, keeping the lashes in place on the shield. Apply the second lotion to the same area, cover, time it as the product says, then remove it.",
        "Poista aine kuivalla vanupuikolla tyvestä kärkeen ripsien pysyessä muotilla. Levitä toinen aine samalle alueelle, peitä, ajasta tuotteen ohjeen mukaan ja poista."
      ),
      l3(
        "Nhuộm (chỉ khi thử phản ứng tốt): pha đúng tỉ lệ ngay trước khi dùng, bôi chỉ trên sợi mi, bấm giờ theo hãng, rồi lau thật sạch bằng bông ẩm đến khi bông không còn màu.",
        "Tint (only after a clear allergy test): mix exactly as directed just before use, apply to the lashes only, time it as the product says, then remove thoroughly with damp cotton until no colour comes off.",
        "Värjäys (vain puhtaan allergiatestin jälkeen): sekoita ohjeen mukaan juuri ennen käyttöä, levitä vain ripsiin, ajasta tuotteen ohjeen mukaan ja poista huolellisesti kostealla vanulla, kunnes väriä ei enää irtoa."
      ),
      l3(
        "Gỡ mi khỏi khuôn bằng chút nước hoặc dung dịch gỡ của hãng, không kéo giật; gỡ khuôn, lau sạch mí, chải serum nếu bộ sản phẩm có, so hai mắt. Dặn khách giữ khô theo hãng (thường một ngày), không mascara, không xông hơi, không dụi mắt; kết quả thường 6–8 tuần.",
        "Release the lashes with a little water or the product's remover, without pulling; remove the shield, clean the lid, comb on serum if the system has one, compare both eyes. Tell the client to keep the lashes dry as the product says (often one day), no mascara, no steam, no rubbing; the result usually lasts 6–8 weeks.",
        "Irrota ripset muotista pienellä määrällä vettä tai tuotteen irrotusainetta vetämättä; poista muotti, puhdista luomi, kampaa seerumia, jos tuotesarjassa on sellainen, ja vertaa silmiä. Neuvo pitämään ripset kuivina tuotteen ohjeen mukaan (usein vuorokausi), ei ripsiväriä, höyryä eikä hieromista; tulos kestää yleensä 6–8 viikkoa."
      ),
    ],
    tips: [
      l3(
        "Ghi vào ghi chú của khách trong VaraaAi: cỡ khuôn, thời gian từng thuốc, màu nhuộm, ngày thử phản ứng. Kết quả đẹp thì lần sau làm lại y như vậy; chưa ưng thì biết chính xác chỗ cần chỉnh.",
        "Write in the client's notes in VaraaAi: shield size, each lotion's time, tint shade and the allergy test date. If the result was lovely, repeat it exactly next time; if not, you know exactly what to adjust.",
        "Kirjaa asiakkaan muistiinpanoihin VaraaAi:ssa muottikoko, kunkin aineen aika, värisävy ja allergiatestin päivä. Jos tulos oli kaunis, toista sama ensi kerralla; jos ei, tiedät tarkalleen, mitä säätää."
      ),
      l3(
        "Bước đưa mi lên khuôn đáng làm chậm nhất: sợi nằm cong vẹo trên khuôn thì sau khi uốn sẽ cong vẹo y như vậy.",
        "Placing the lashes on the shield deserves the most time: a lash lying crooked on the shield stays crooked after the lift.",
        "Ripsien asettelu muotille ansaitsee eniten aikaa: muotilla vinossa oleva ripsi jää vinoksi myös taivutuksen jälkeen."
      ),
    ],
    quiz: [
      {
        q: l3("Mi khách còn ướt sau khi làm sạch. Bạn làm gì?", "The client's lashes are still wet after cleansing. What do you do?", "Asiakkaan ripset ovat puhdistuksen jälkeen vielä märät. Mitä teet?"),
        options: [
          l3("Dán mi lên khuôn luôn cho nhanh", "Stick them to the shield straight away to save time", "Kiinnitän ne heti muotille ajan säästämiseksi"),
          l3("Đợi mi khô hẳn rồi mới đưa lên khuôn", "Wait until they are completely dry before placing them", "Odotan, että ne ovat täysin kuivat, ennen kuin asettelen ne"),
          l3("Bôi thêm dầu dưỡng cho mềm", "Apply some oil to soften them", "Levitän öljyä pehmentämään"),
        ],
        answer: 1,
        why: l3(
          "Mi ướt thì keo dán không bám, sợi mi trượt khỏi khuôn; dầu làm thuốc ngấm không đều.",
          "Wet lashes do not stick, so they slide off the shield; oil makes the lotion work unevenly.",
          "Märät ripset eivät tartu, vaan liukuvat muotilta; öljy saa aineen vaikuttamaan epätasaisesti."
        ),
      },
      {
        q: l3("Khách thấy cay, rát trong lúc thuốc đang ngấm. Bạn làm gì?", "The client feels stinging or burning while the lotion is on. What do you do?", "Asiakasta kirvelee tai polttaa aineen vaikuttaessa. Mitä teet?"),
        options: [
          l3("Lau thuốc ra ngay, rửa bằng nước sạch và dừng lại", "Remove the lotion at once, rinse with clean water and stop", "Poistan aineen heti, huuhtelen puhtaalla vedellä ja lopetan"),
          l3("Bảo khách cố chịu đến hết giờ", "Ask the client to bear it until the time is up", "Pyydän asiakasta kestämään ajan loppuun"),
          l3("Bôi thêm thuốc thứ hai cho nhanh xong", "Apply the second lotion early to finish faster", "Levitän toisen aineen aikaisemmin, jotta valmistuu nopeammin"),
        ],
        answer: 0,
        why: l3(
          "Cay, rát là dấu hiệu thuốc chạm da hoặc gần vào mắt, hay khách đang phản ứng. Không bao giờ để khách chịu đựng.",
          "Stinging or burning means the product is on the skin or near the eye, or the client is reacting. Never make the client put up with it.",
          "Kirvely tai poltto tarkoittaa, että ainetta on iholla tai lähellä silmää tai asiakas reagoi. Älä koskaan anna asiakkaan sietää sitä."
        ),
      },
      {
        q: l3("Khi nào được nhuộm mi sau khi uốn?", "When may you tint after the lift?", "Milloin ripset saa värjätä taivutuksen jälkeen?"),
        options: [
          l3("Luôn luôn, không cần thử", "Always, no test needed", "Aina, testiä ei tarvita"),
          l3("Khi khách hứa là chưa từng bị dị ứng", "When the client promises they have never had an allergy", "Kun asiakas lupaa, ettei ole koskaan ollut allerginen"),
          l3("Khi thử phản ứng theo hướng dẫn của hãng cho kết quả tốt", "When the allergy alert test done as the product instructs was clear", "Kun tuotteen ohjeen mukainen allergiatesti oli puhdas"),
        ],
        answer: 2,
        why: l3(
          "Nhiều hãng yêu cầu thử phản ứng trước khi nhuộm (thường khoảng 48 giờ trước). Có đỏ, ngứa, sưng, rát thì không nhuộm. Ghi ngày và kết quả vào hồ sơ.",
          "Many manufacturers require an allergy alert test before tinting (often about 48 hours before). Redness, itching, swelling or burning means no tint. Record the date and result.",
          "Monet valmistajat edellyttävät allergiatestiä ennen värjäystä (usein noin 48 tuntia ennen). Punoitus, kutina, turvotus tai kirvely tarkoittaa, ettei värjätä. Kirjaa päivä ja tulos."
        ),
      },
    ],
  },

  /* ================= hair ================= */
  {
    slug: "toc-tu-van-chia-vung-hieu-dung",
    course: "p-hair",
    style: "theory",
    title: l3("Tư vấn và chia vùng tóc: hiểu đúng để cắt chuẩn", "Consultation and sectioning: understand them to cut precisely", "Konsultaatio ja jaottelu: ymmärrä ne, niin leikkaat tarkasti"),
    summary: l3(
      "Vì sao nhiều kiểu tóc hỏng ngay từ lúc tư vấn, cách thống nhất độ dài bằng điểm chạm, đọc dáng mặt, dáng đầu, mật độ, chất tóc, độ xoăn và hướng mọc, tóc ướt và tóc khô, nhìn da đầu, gội êm và an toàn, chia bảy vùng, và những chữ mà bài cắt nào cũng dùng: đường chuẩn, góc nâng, kéo lệch, lực căng, kiểm tra chéo.",
      "Why so many haircuts go wrong already at the consultation, agreeing length with touch points, reading face and head shape, density, texture, curl and growth patterns, wet versus dry hair, the scalp check, a comfortable and safe shampoo, the seven sections, and the words every cut uses: guideline, elevation, over-direction, tension, cross-checking.",
      "Miksi moni leikkaus epäonnistuu jo konsultaatiossa, pituudesta sopiminen kosketuskohdilla, kasvojen ja pään muodon, tuuheuden, hiuslaadun, kiharuuden ja kasvusuuntien arviointi, märät ja kuivat hiukset, hiuspohjan tarkistus, miellyttävä ja turvallinen pesu, seitsemän jakoa sekä sanat, joita jokainen leikkaus käyttää: ohjauslinja, nostokulma, ylisuuntaus, kireys ja ristiintarkistus."
    ),
    video: video("toc-tu-van-chia-vung-hieu-dung", 309, "2026-11-19"),
    notice: l3(
      "Da đầu có vết thương hở, viêm, sưng đỏ hay có chấy thì không làm dịch vụ: nói riêng với khách và khuyên đi khám (bài “Khi nào không làm cho khách”). Thời gian để dầu xả theo hướng dẫn của sản phẩm. Quy định vệ sinh khác nhau theo từng nước. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Open wounds, inflammation, swollen red skin or head lice on the scalp: no service — tell the customer privately and suggest a doctor (lesson “When not to treat a customer”). Conditioner times follow the product's instructions. Hygiene rules differ by country. This lesson is a training aid, not a licence.",
      "Avohaava, tulehdus, turvonnut punoittava iho tai täit hiuspohjassa: ei palvelua — kerro asiakkaalle kahden kesken ja ohjaa lääkäriin (tunti ”Milloin asiakasta ei hoideta”). Hoitoaineen vaikutusaika tuotteen ohjeen mukaan. Hygieniamääräykset vaihtelevat maittain. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Nhiều kiểu tóc hỏng không vì cây kéo mà vì thợ và khách chưa hiểu nhau. “Cắt ít thôi” với khách có thể là một phân, với thợ là năm phân: đừng nói bằng ít, nhiều, ngắn, dài.",
        "Many haircuts go wrong not because of the scissors but because stylist and customer didn't understand each other. “Just a little” can mean one centimetre to the customer and five to the stylist: don't talk in little, a lot, short or long.",
        "Moni leikkaus epäonnistuu ei saksien vaan väärinymmärryksen takia. ”Vähän vain” voi asiakkaalle tarkoittaa senttiä ja kampaajalle viittä: älä puhu sanoilla vähän, paljon, lyhyt tai pitkä."
      ),
      l3(
        "Hỏi khách thích và không thích gì ở mái tóc hiện tại, xin xem ảnh mẫu, thống nhất độ dài bằng số hay bằng điểm chạm (đến cằm, chạm vai, ngang xương quai xanh) — cầm lọn tóc đặt đúng chỗ và hỏi lại.",
        "Ask what the customer likes and dislikes about their hair now, look at a reference photo, and agree the length in numbers or with a touch point (to the chin, touching the shoulder, at the collarbone) — hold a lock at that point and ask again.",
        "Kysy, mistä asiakas pitää ja mistä ei nykyisissä hiuksissaan, katso mallikuva ja sovi pituus numeroin tai kosketuskohdalla (leukaan, olkapäähän, solisluun kohdalle) — pidä suortuvaa siinä kohdassa ja varmista vielä."
      ),
      l3(
        "Hỏi về cuộc sống: khách có sấy không, mất bao lâu mỗi sáng, hay buộc tóc, có chơi thể thao không. Kiểu tóc khách không tự làm được ở nhà thì sẽ sớm không còn thích.",
        "Ask about everyday life: does the customer blow-dry, how long do they spend each morning, do they tie their hair up, do sport. A style they can't do at home soon stops pleasing them.",
        "Kysy arjesta: föönaako asiakas, kauanko aamuisin menee, laittaako hiukset kiinni, urheileeko. Tyyli, jota ei pysty kotona tekemään, lakkaa pian miellyttämästä."
      ),
      l3(
        "Đọc mái tóc khi còn khô: dáng mặt, dáng đầu (sau đầu phẳng thì để thêm độ dày), mật độ (rẽ ngôi xem da đầu lộ nhiều hay ít), chất tóc mảnh, vừa hay to, và độ xoăn.",
        "Read the hair while it's dry: face shape, head shape (a flat back of the head benefits from more volume), density (part the hair and see how much scalp shows), fine, medium or coarse texture, and curl.",
        "Arvioi hiukset kuivina: kasvojen muoto, pään muoto (litteä takaraivo hyötyy tuuheudesta), tuuheus (jakaus näyttää, paljonko hiuspohjaa näkyy), ohut, keskivahva tai paksu hiuslaatu ja kiharuus."
      ),
      l3(
        "Hướng mọc: xoáy ở đỉnh, ở gáy, chỏm tóc ở chân tóc mái. Cắt quá ngắn ở đó thì tóc dựng đứng; chải nhiều hướng để thấy tóc rơi tự nhiên, để dài hơn hay cắt theo chiều mọc.",
        "Growth patterns: a crown whorl, nape whorls, a cowlick at the front hairline. Cut too short there and the hair stands up; comb in several directions to see how it falls, leave it longer or cut with the growth.",
        "Kasvusuunnat: päälaen pyörre, niskan pyörteet, otsatukan kasvusuunta. Liian lyhyeksi leikattuna hiukset nousevat pystyyn; kampaa eri suuntiin nähdäksesi luonnollisen laskeuman, jätä pidemmäksi tai leikkaa kasvusuunnan mukaan."
      ),
      l3(
        "Tóc ướt nặng và trông dài hơn; tóc gợn sóng và xoăn co lên khi khô, có khi rất nhiều. Cắt dài hơn ý định, hoặc cắt khô theo kỹ thuật đã học — tóc đã cắt thì không nối lại được.",
        "Wet hair is heavier and looks longer; wavy and curly hair shrinks when dry, sometimes a lot. Cut longer than intended, or cut dry with a technique you have learnt — what's cut can't be put back.",
        "Märät hiukset ovat painavampia ja näyttävät pidemmiltä; laineikkaat ja kiharat hiukset kutistuvat kuivuessaan, joskus paljon. Leikkaa aiottua pidemmäksi tai kuivana opitulla tekniikalla — leikattua ei saa takaisin."
      ),
      l3(
        "Gội: thử nước trên cổ tay mình trước, hỏi khách; khăn giữ cổ áo khô, cổ khách đặt êm trong lòng chậu; xoa bằng đầu ngón tay, không dùng móng; xả với một tay che chân tóc; thấm khăn ép nhẹ, không chà.",
        "Shampoo: test the water on your own wrist first and ask the customer; a towel keeps the collar dry and the neck rests comfortably in the basin; massage with the pads of the fingers, never the nails; rinse with one hand shielding the hairline; press dry with a towel, don't rub.",
        "Pesu: kokeile veden lämpö ensin omaan ranteeseen ja kysy asiakkaalta; pyyhe pitää kauluksen kuivana ja niska lepää mukavasti altaassa; hiero sormenpäillä, ei kynsillä; huuhtele toinen käsi hiusrajaa suojaten; painele pyyhkeellä, älä hankaa."
      ),
      l3(
        "Chia vùng sạch sẽ để kiểm soát: đường ngôi thẳng, lọn vừa phải, lần nào cũng tìm lại được đường cắt trước. Phổ biến là bảy vùng: đỉnh, hai bên, hai vùng chẩm, hai vùng gáy; xoắn, kẹp phẳng, giữ tóc ẩm đều.",
        "Clean sections give control: straight partings, even sections, and you always find the previous cut again. Most common are seven sections: top, two sides, two crown, two nape; twist, clip flat and keep the hair evenly damp.",
        "Siistit jaot antavat hallinnan: suorat jakaukset, tasaiset osiot, ja edellinen leikkuulinja löytyy aina. Yleisin on seitsemän jakoa: päälaki, kaksi sivua, kaksi takaraivoa, kaksi niskaa; kierrä, kiinnitä litteäksi ja pidä hiukset tasaisen kosteina."
      ),
      l3(
        "Đường chuẩn là đường cắt đầu tiên, mọi đường sau dựa vào nó. Góc nâng: 0° cắt bằng, nặng ở dưới; 45° tầng thấp, giữ độ dày; 90° tầng đều theo dáng đầu; 180° nâng thẳng lên đỉnh, tóc dưới dài dần.",
        "The guideline is the first cut; every later cut follows it. Elevation: 0° a one-length line with weight at the bottom; 45° graduation that keeps weight; 90° even layers following the head shape; 180° lifted straight up, the hair below getting longer.",
        "Ohjauslinja on ensimmäinen leikkuu, jota kaikki seuraavat noudattavat. Nostokulma: 0° tasapituus, paino alhaalla; 45° porrastus, joka säilyttää painon; 90° tasaiset kerrokset pään muodon mukaan; 180° suoraan ylös nostettuna, alemmat hiukset pitenevät."
      ),
      l3(
        "Kéo lệch về phía nào thì tóc dài dần ra phía ngược lại. Lực căng đều và vừa phải — quá căng (tóc ướt, tóc xoăn, vành tai) thì khô rồi tóc bật ngắn. Cắt xong một chiều thì kiểm tra chéo theo chiều ngược lại và so hai bên.",
        "Over-direct towards one side and the hair gets longer towards the other. Keep tension even and moderate — too much (wet hair, curls, over the ears) and the hair springs up shorter when dry. After cutting in one direction, cross-check in the other and compare both sides.",
        "Ylisuuntaa toiselle puolelle, niin hiukset pitenevät vastakkaiseen suuntaan. Pidä kireys tasaisena ja maltillisena — liian kireällä (märät hiukset, kiharat, korvien kohta) hiukset nousevat kuivina lyhyemmiksi. Leikattuasi yhteen suuntaan ristiintarkista toiseen ja vertaa puolia."
      ),
    ],
    tips: [
      l3(
        "Luôn nói lại điều đã thống nhất bằng lời của mình: “Mình cắt đến ngang vai, đúng không chị?” — một câu hỏi tránh được cả một buổi khách không vui.",
        "Always repeat what you agreed in your own words: “So we cut to the shoulder, right?” — one question saves a whole unhappy appointment.",
        "Toista sovittu aina omin sanoin: ”Leikataan siis olkapäähän, eikö niin?” — yksi kysymys säästää kokonaisen pettymyksen."
      ),
      l3(
        "Trong VaraaAi, ghi độ dài đã thống nhất, xoáy và chất tóc vào ghi chú của khách, để lần sau ai làm cũng biết.",
        "In VaraaAi, note the agreed length, whorls and hair type in the customer's notes, so whoever works next time knows.",
        "Kirjaa VaraaAi:hin sovittu pituus, pyörteet ja hiuslaatu asiakkaan muistiinpanoihin, jotta seuraava tekijä tietää."
      ),
    ],
    quiz: [
      {
        q: l3("Cách thống nhất độ dài nào an toàn nhất?", "Which way of agreeing length is safest?", "Mikä tapa sopia pituudesta on turvallisin?"),
        options: [
          l3("Khách nói “cắt ít thôi” là đủ", "The customer saying “just a little” is enough", "Asiakkaan ”vähän vain” riittää"),
          l3("Cầm lọn tóc đặt ở một điểm chạm, như chạm vai, và hỏi lại khách", "Holding a lock at a touch point, like the shoulder, and asking again", "Suortuvan pitäminen kosketuskohdassa, kuten olkapäässä, ja varmistaminen"),
          l3("Cắt trước rồi hỏi khách sau", "Cut first, ask afterwards", "Leikkaa ensin, kysy jälkeenpäin"),
        ],
        answer: 1,
        why: l3(
          "“Ít” với mỗi người một khác. Một điểm chạm cụ thể và câu hỏi lại giúp cả hai hiểu giống nhau.",
          "“A little” means different things to different people. A concrete touch point and a repeat question make sure you both mean the same.",
          "”Vähän” tarkoittaa eri ihmisille eri asioita. Konkreettinen kosketuskohta ja varmistus takaavat, että tarkoitatte samaa."
        ),
      },
      {
        q: l3("Khách tóc xoăn muốn tóc khô dài chạm vai. Cắt thế nào?", "A customer with curly hair wants it to touch the shoulders when dry. How do you cut?", "Kiharahiuksinen asiakas haluaa hiusten yltävän kuivina olkapäille. Miten leikkaat?"),
        options: [
          l3("Để dài hơn vai khi tóc ướt, vì tóc khô sẽ co lên", "Leave it longer than the shoulders while wet, because it shrinks when dry", "Jätä märkänä olkapäitä pidemmäksi, koska ne kutistuvat kuivuessaan"),
          l3("Cắt đúng ngang vai khi tóc ướt và kéo thật căng", "Cut exactly at the shoulders while wet, with lots of tension", "Leikkaa märkänä tarkalleen olkapäihin hyvin kireällä"),
          l3("Cắt ngắn hơn vai cho chắc", "Cut shorter than the shoulders to be safe", "Leikkaa olkapäitä lyhyemmäksi varmuuden vuoksi"),
        ],
        answer: 0,
        why: l3(
          "Tóc xoăn và gợn sóng co lên khi khô; kéo căng khi ướt càng làm tóc bật ngắn hơn.",
          "Curly and wavy hair shrinks as it dries; pulling it tight while wet makes it spring up even shorter.",
          "Kiharat ja laineikkaat hiukset kutistuvat kuivuessaan; märkänä kiristäminen saa ne nousemaan vielä lyhyemmiksi."
        ),
      },
      {
        q: l3("Thử nhiệt độ nước khi gội thế nào?", "How do you check the water temperature for a shampoo?", "Miten tarkistat pesuveden lämpötilan?"),
        options: [
          l3("Xịt thẳng lên đầu khách rồi hỏi", "Spray straight onto the customer's head and ask", "Suihkuta suoraan asiakkaan päähän ja kysy"),
          l3("Nước nóng mới sạch, không cần thử", "Hot water cleans best, no need to check", "Kuuma vesi puhdistaa parhaiten, ei tarvitse kokeilla"),
          l3("Thử trên cổ tay mình trước, rồi hỏi khách khi nước chạm tóc", "Test it on your own wrist first, then ask the customer once it touches the hair", "Kokeile ensin omaan ranteeseen ja kysy asiakkaalta, kun vesi koskee hiuksiin"),
        ],
        answer: 2,
        why: l3(
          "Nhiệt độ vòi có thể thay đổi bất ngờ. Thử trên cổ tay mình, rồi hỏi khách — mỗi người cảm nhận một khác.",
          "Tap temperature can change suddenly. Test on your wrist, then ask — everyone feels heat differently.",
          "Hanan lämpötila voi muuttua yllättäen. Kokeile ranteeseen ja kysy sitten — jokainen kokee lämmön eri tavoin."
        ),
      },
    ],
  },
  {
    slug: "toc-tu-van-chia-vung",
    course: "p-hair",
    style: "practice",
    title: l3("Tư vấn, gội và chia vùng tóc: thực hành từng bước", "Consultation, shampoo and sectioning: step-by-step practice", "Konsultaatio, pesu ja jaottelu: käytäntö vaihe vaiheelta"),
    summary: l3(
      "Từ lúc khách ngồi xuống tới khi tóc sẵn sàng để cắt: chuẩn bị và giấy cổ, tư vấn với ảnh mẫu và điểm chạm, kiểm tra tóc và da đầu khi khô, gội (thử nước, massage, xả, dầu xả), thấm khăn, gỡ rối từ ngọn, rẽ ngôi, chia bảy vùng và giữ tóc ẩm đều.",
      "From the moment the customer sits down until the hair is ready to cut: preparation and neck strip, consultation with a reference photo and touch points, dry check of hair and scalp, shampoo (water test, massage, rinse, conditioner), towel-drying, detangling from the ends, parting, the seven sections and keeping the hair evenly damp.",
      "Siitä, kun asiakas istuutuu, siihen kun hiukset ovat valmiit leikattaviksi: valmistelu ja kaulapaperi, konsultaatio mallikuvan ja kosketuskohtien avulla, hiusten ja hiuspohjan tarkistus kuivana, pesu (veden kokeilu, hieronta, huuhtelu, hoitoaine), pyyhekuivaus, selvittäminen latvoista alkaen, jakaus, seitsemän jakoa ja tasainen kosteus."
    ),
    video: video("toc-tu-van-chia-vung", 268, "2026-11-19"),
    notice: l3(
      "Lược, kéo, kẹp được làm sạch và khử khuẩn sau mỗi khách (bài “Xử lý dụng cụ sau mỗi khách”); dải giấy cổ dùng một lần. Da đầu có vết thương, viêm hay có chấy thì không làm dịch vụ (bài “Khi nào không làm cho khách”). Thời gian để dầu xả theo hướng dẫn của sản phẩm. Quy định khác nhau theo từng nước.",
      "Combs, scissors and clips are cleaned and disinfected after every customer (lesson “Tools after every customer”); neck strips are single-use. Wounds, inflammation or head lice on the scalp: no service (lesson “When not to treat a customer”). Conditioner times follow the product's instructions. Rules differ by country.",
      "Kammat, sakset ja klipsit puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen (tunti ”Välineet jokaisen asiakkaan jälkeen”); kaulapaperit ovat kertakäyttöisiä. Haavat, tulehdus tai täit hiuspohjassa: ei palvelua (tunti ”Milloin asiakasta ei hoideta”). Hoitoaineen vaikutusaika tuotteen ohjeen mukaan. Määräykset vaihtelevat maittain."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Rửa tay trước khi chạm vào khách; dụng cụ đã làm sạch và khử khuẩn. Quấn dải giấy cổ dùng một lần rồi mới cài áo choàng, để áo choàng không chạm da cổ.",
        "Wash your hands before touching the customer; tools cleaned and disinfected. Wrap a single-use neck strip first, then fasten the cape, so the cape never touches the neck.",
        "Pese kädet ennen kuin kosket asiakkaaseen; välineet puhdistettu ja desinfioitu. Kiedo ensin kertakäyttöinen kaulapaperi ja kiinnitä sitten suojaviitta, jottei viitta koske kaulaan."
      ),
      l3(
        "Tư vấn khi tóc khô: thích và không thích gì, ảnh mẫu, thói quen ở nhà; thống nhất độ dài bằng điểm chạm và nói lại cho khách nghe. Tóc xoăn: nhắc khách tóc sẽ co lên. Ghi vào hồ sơ khách.",
        "Consult with dry hair: likes and dislikes, a reference photo, home routine; agree the length with a touch point and repeat it back. Curly hair: remind the customer it will shrink. Note it in the customer record.",
        "Konsultaatio kuivista hiuksista: mistä pitää ja mistä ei, mallikuva, kotirutiinit; sovi pituus kosketuskohdalla ja toista se ääneen. Kiharat hiukset: muistuta, että ne kutistuvat. Kirjaa asiakastietoihin."
      ),
      l3(
        "Kiểm tra khi còn khô: kéo tóc ra sau xem dáng mặt và chân tóc, rẽ vài đường ngôi xem mật độ, chất tóc và da đầu, chải nhiều hướng tìm xoáy. Vết thương, viêm hay chấy: dừng lại, nói riêng với khách.",
        "Check while dry: draw the hair back to see the face shape and hairline, make a few partings to see density, texture and scalp, comb in several directions to find whorls. Wounds, inflammation or lice: stop and tell the customer privately.",
        "Tarkista kuivana: vedä hiukset taakse nähdäksesi kasvojen muodon ja hiusrajan, tee muutama jakaus nähdäksesi tuuheuden, hiuslaadun ja hiuspohjan, kampaa eri suuntiin löytääksesi pyörteet. Haavoja, tulehdusta tai täitä: lopeta ja kerro asiakkaalle kahden kesken."
      ),
      l3(
        "Ở chậu gội: khăn quanh cổ, cổ khách đặt êm trong lòng chậu, hỏi có cấn không (khách đau cổ, lưng thì chỉnh ghế). Thử nước trên cổ tay mình, rồi hỏi lại khi nước chạm tóc.",
        "At the basin: towel round the neck, the neck resting comfortably in the basin, ask if anything presses (adjust the chair for neck or back problems). Test the water on your own wrist, then ask again once it touches the hair.",
        "Pesualtaalla: pyyhe kaulan ympärille, niska lepää mukavasti altaassa, kysy painaako jokin (säädä tuolia niska- tai selkävaivoissa). Kokeile vesi omaan ranteeseen ja kysy uudelleen, kun vesi koskee hiuksiin."
      ),
      l3(
        "Dầu gội vừa đủ, massage bằng đầu ngón tay theo vòng nhỏ, không dùng móng. Xả sạch với một tay che chân tóc để nước không vào mặt, tai. Dầu xả lên thân và ngọn, đợi theo sản phẩm, xả lại.",
        "Just enough shampoo, massage with the finger pads in small circles, never the nails. Rinse thoroughly with one hand shielding the hairline so no water reaches the face or ears. Conditioner on the lengths and ends, wait as the product says, rinse again.",
        "Sopivasti shampoota, hiero sormenpäillä pienin pyörivin liikkein, ei kynsillä. Huuhtele huolellisesti toinen käsi hiusrajaa suojaten, ettei vettä mene kasvoille tai korviin. Hoitoaine pituuksiin ja latvoihin, vaikutusaika tuotteen mukaan, huuhtele uudelleen."
      ),
      l3(
        "Thấm khăn: ép nhẹ từ chân xuống ngọn, không chà, không vò; tóc ẩm, không nhỏ giọt. Gỡ rối bằng lược răng thưa, bắt đầu từ ngọn rồi lên dần, tay giữ tóc phía trên để không kéo da đầu.",
        "Towel-dry by pressing from roots to ends, no rubbing or scrunching; damp, not dripping. Detangle with a wide-tooth comb from the ends upwards, holding the hair above so the scalp isn't pulled.",
        "Pyyhekuivaus painelemalla tyvestä latvoihin, ei hankausta eikä rutistusta; kostea, ei valuva. Selvitä harvalla kammalla latvoista ylöspäin ja pidä hiuksista kiinni yläpuolelta, ettei hiuspohja kisko."
      ),
      l3(
        "Rẽ ngôi tự nhiên hoặc ngôi giữa bằng đầu nhọn lược đuôi chuột, một đường liền từ chân tóc trán tới đỉnh, thấy rõ đường da đầu.",
        "Make the natural or a centre parting with the tip of a tail comb, one continuous line from the front hairline to the crown, the scalp line clearly visible.",
        "Tee luonnollinen tai keskijakaus hännällisen kamman kärjellä yhtenä vetona otsan hiusrajasta päälaelle niin, että hiuspohjan viiva näkyy selvästi."
      ),
      l3(
        "Bảy vùng: vùng đỉnh (từ hai bên thái dương ra sau tới đỉnh), hai vùng bên (đường từ đỉnh vành tai lên vùng đỉnh), phía sau chia đôi bằng ngôi giữa và một đường ngang ở xương chẩm thành hai vùng chẩm và hai vùng gáy. Xoắn vừa tay, kẹp phẳng sát đầu.",
        "Seven sections: the top (from both temples back to the crown), two sides (a line from the top of the ear up to the top section), and the back split by a centre parting and a horizontal line at the occipital bone into two crown and two nape sections. Twist lightly and clip flat to the head.",
        "Seitsemän jakoa: päälaki (ohimoilta taakse päälaelle), kaksi sivua (linja korvan yläreunasta päälakijakoon) ja takaosa jaettuna keskijakauksella ja takaraivon kohdalla kulkevalla vaakalinjalla kahteen takaraivo- ja kahteen niskajakoon. Kierrä kevyesti ja kiinnitä litteäksi päätä vasten."
      ),
      l3(
        "Kiểm tra trong gương và từ phía sau: ngôi thẳng, hai bên cân, không sợi nào lọt vùng; chỗ lệch thì chải lại, kẻ lại — ngôi lệch thì đường cắt cũng lệch.",
        "Check in the mirror and from behind: straight partings, balanced sides, no strays in the wrong section; re-comb and re-part anything off — a crooked parting means a crooked cut.",
        "Tarkista peilistä ja takaa: suorat jakaukset, tasapainoiset puolet, ei harhahiuksia väärässä jaossa; kampaa ja jaa uudelleen, jos jokin on vinossa — vino jakaus tarkoittaa vinoa leikkuuta."
      ),
      l3(
        "Giữ tóc ẩm đều bằng bình xịt phun sương trên vùng sắp cắt — chỗ khô chỗ ướt thì đường cắt không đều. Sau khách: khăn vào giỏ giặt, giấy cổ bỏ đi, lược, kéo, kẹp làm sạch và khử khuẩn.",
        "Keep the hair evenly damp with a fine-mist spray on the area you're about to cut — patchy moisture gives an uneven line. After the customer: towels to the laundry, neck strip in the bin, combs, scissors and clips cleaned and disinfected.",
        "Pidä hiukset tasaisen kosteina sumutepullolla leikattavalla alueella — epätasainen kosteus antaa epätasaisen linjan. Asiakkaan jälkeen: pyyhkeet pesuun, kaulapaperi roskiin, kammat, sakset ja klipsit puhdistetaan ja desinfioidaan."
      ),
    ],
    tips: [
      l3(
        "Kẻ ngôi bằng một đường liền của đầu lược đuôi chuột, đừng ngoáy nhiều lần — đường ngôi sạch thì nhìn là thấy đâu lệch.",
        "Draw each parting in one stroke with the tail-comb tip instead of scratching back and forth — a clean parting shows at once where something is off.",
        "Vedä jakaus yhdellä vedolla kamman hännällä äläkä raavi edestakaisin — siististä jakauksesta näkee heti, missä on vinoutta."
      ),
      l3(
        "Trong VaraaAi, ghi điều đã thống nhất vào ghi chú khách và đặt thời lượng dịch vụ có tính cả gội và chia vùng, để lịch không bị dồn.",
        "In VaraaAi, record what you agreed in the customer notes and set the service duration to include the shampoo and sectioning, so the calendar doesn't get squeezed.",
        "Kirjaa VaraaAi:ssa sovittu asiakkaan muistiinpanoihin ja aseta palvelun kesto niin, että pesu ja jaottelu mahtuvat mukaan, ettei kalenteri ruuhkaudu."
      ),
    ],
    quiz: [
      {
        q: l3("Gỡ rối tóc ướt bắt đầu từ đâu?", "Where do you start detangling wet hair?", "Mistä märkien hiusten selvittäminen aloitetaan?"),
        options: [
          l3("Từ chân tóc, chải mạnh xuống", "From the roots, combing hard downwards", "Tyvestä, kammaten voimakkaasti alas"),
          l3("Từ ngọn, rồi lên dần, tay giữ tóc phía trên", "From the ends, working upwards, holding the hair above", "Latvoista ylöspäin, pitäen hiuksista kiinni yläpuolelta"),
          l3("Từ giữa thân tóc", "From the middle of the lengths", "Pituuksien keskeltä"),
        ],
        answer: 1,
        why: l3(
          "Gỡ từ ngọn thì nút rối không bị dồn xuống, tóc ít gãy, và khách không bị kéo da đầu.",
          "Starting at the ends stops knots being pushed down, breaks less hair and doesn't pull the scalp.",
          "Latvoista aloittaminen ei työnnä takkuja alas, katkoo vähemmän hiuksia eikä kisko hiuspohjaa."
        ),
      },
      {
        q: l3("Bảy vùng tóc phổ biến gồm những vùng nào?", "What are the common seven sections?", "Mitkä ovat yleiset seitsemän jakoa?"),
        options: [
          l3("Bảy lọn bằng nhau quanh đầu", "Seven equal strands around the head", "Seitsemän samankokoista suortuvaa pään ympäri"),
          l3("Ba vùng trước, bốn vùng sau tùy ý", "Three in front, four at the back, any way", "Kolme edessä, neljä takana miten vain"),
          l3("Vùng đỉnh, hai vùng bên, hai vùng chẩm, hai vùng gáy", "Top, two sides, two crown, two nape", "Päälaki, kaksi sivua, kaksi takaraivoa, kaksi niskaa"),
        ],
        answer: 2,
        why: l3(
          "Chia theo dáng đầu — đỉnh, hai bên, chẩm và gáy — thì vùng nào cũng có mốc rõ, cắt lần nào cũng tìm lại được.",
          "Following the head shape — top, sides, crown and nape — gives every section clear landmarks you can always find again.",
          "Pään muotoa seuraava jako — päälaki, sivut, takaraivo ja niska — antaa jokaiselle jaolle selvät maamerkit, jotka löytyvät aina uudelleen."
        ),
      },
      {
        q: l3("Vì sao áo choàng không được chạm trực tiếp vào da cổ khách?", "Why must the cape not touch the customer's neck directly?", "Miksi suojaviitta ei saa koskea suoraan asiakkaan kaulaan?"),
        options: [
          l3("Áo choàng dùng cho nhiều khách; dải giấy cổ dùng một lần ngăn tiếp xúc trực tiếp", "The cape is used for many customers; a single-use neck strip prevents direct contact", "Viittaa käytetään monelle asiakkaalle; kertakäyttöinen kaulapaperi estää suoran kosketuksen"),
          l3("Để áo choàng không bị nhăn", "So the cape doesn't crease", "Jotta viitta ei rypisty"),
          l3("Không có lý do gì, chỉ là thói quen", "No reason, just habit", "Ei syytä, pelkkä tapa"),
        ],
        answer: 0,
        why: l3(
          "Dải giấy cổ dùng một lần là hàng rào vệ sinh giữa các khách, và giữ tóc vụn không lọt vào cổ áo.",
          "A single-use neck strip is a hygiene barrier between customers and keeps cut hair out of the collar.",
          "Kertakäyttöinen kaulapaperi on hygieniaeste asiakkaiden välillä ja pitää leikatut hiukset poissa kauluksesta."
        ),
      },
    ],
  },
  {
    slug: "cat-nam-co-ban-hieu-dung",
    course: "p-hair",
    style: "theory",
    title: l3("Cắt tóc nam cơ bản: hiểu đúng để gọn và cân", "Men's haircut basics: understand them for a clean, balanced cut", "Miesten perusleikkaus: ymmärrä se, niin tulos on siisti ja tasapainoinen"),
    summary: l3(
      "Các phần của kiểu tóc nam và hai mốc đường vòng đầu, xương chẩm; cữ tông đơ và cần gạt; cầm kéo đúng; đi tông đơ ngược chiều tóc mọc; kéo trên lược và tông đơ trên lược; nối phần đỉnh với hai bên; sự cân đối và đường viền; những lỗi hay gặp; đọc mái tóc; vệ sinh tông đơ; và nói thật với khách.",
      "The parts of a men's cut and the two landmarks, the parietal ridge and the occipital bone; clipper guards and the taper lever; holding scissors correctly; clipping against the growth; scissor-over-comb and clipper-over-comb; blending the top into the sides; symmetry and the outline; common mistakes; reading the hair; clipper hygiene; and honest talk with customers.",
      "Miesten leikkauksen osat ja kaksi maamerkkiä, päälaen reuna ja takaraivon kyhmy; koneen ohjauskammat ja säätövipu; oikea saksiote; koneella kasvusuuntaa vastaan; sakset ja kone kamman päällä; päälaen häivytys sivuihin; symmetria ja rajaus; yleiset virheet; hiusten arviointi; koneen hygienia ja rehellinen puhe asiakkaan kanssa."
    ),
    video: video("cat-nam-co-ban-hieu-dung", 282, "2026-11-19"),
    notice: l3(
      "Số cữ chỉ cho biết tóc còn dài khoảng bao nhiêu và khác nhau theo hãng: xem bảng của hãng mình dùng. Lưỡi tông đơ, cữ, lược và kéo được làm sạch, khử khuẩn sau mỗi khách theo hướng dẫn của sản phẩm; lưỡi dao cạo dùng một lần (bài “Xử lý dụng cụ sau mỗi khách”). Da đầu có vết thương, viêm hay có chấy thì không cắt (bài “Khi nào không làm cho khách”). Quy định khác nhau theo từng nước.",
      "A guard number only tells you roughly how much length is left and varies by brand: check your brand's chart. Clipper blades, guards, combs and scissors are cleaned and disinfected after every customer as the product instructs; razor blades are single-use (lesson “Tools after every customer”). Wounds, inflammation or head lice on the scalp: no cut (lesson “When not to treat a customer”). Rules differ by country.",
      "Ohjauskamman numero kertoo vain suunnilleen jäävän pituuden ja vaihtelee valmistajittain: katso oman merkkisi taulukko. Koneen terät ja ohjauskammat, kammat ja sakset puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen tuotteen ohjeen mukaan; partaterät ovat kertakäyttöisiä (tunti ”Välineet jokaisen asiakkaan jälkeen”). Haavat, tulehdus tai täit hiuspohjassa: ei leikkausta (tunti ”Milloin asiakasta ei hoideta”). Määräykset vaihtelevat maittain."
    ),
    related: ["khach-hang", "lich-hen", "the-khach-quen"],
    steps: [
      l3(
        "Các phần: đỉnh (thường dài nhất), hai bên, chẩm, gáy, và đường viền quanh tai, tóc mai, gáy. Hai mốc: đường vòng đầu (chỗ đầu rộng nhất hai bên) và xương chẩm — phần nối ngắn với dài thường nằm quanh đó.",
        "The parts: top (usually the longest), sides, back, nape, and the outline around the ears, sideburns and nape. Two landmarks: the parietal ridge (the widest part of the head at the sides) and the occipital bone — the blend from short to long usually sits around them.",
        "Osat: päälaki (yleensä pisin), sivut, takaraivo, niska sekä rajaus korvien ympärillä, pulisongeissa ja niskassa. Kaksi maamerkkiä: päälaen reuna (pään levein kohta sivuilla) ja takaraivon kyhmy — häivytys lyhyestä pitkään sijoittuu yleensä niiden tienoille."
      ),
      l3(
        "Số cữ cho biết tóc còn dài khoảng bao nhiêu, số lớn thì dài hơn; mỗi hãng một khác nên xem bảng của hãng. Cần gạt bên hông chỉnh dài ngắn thêm một chút, dùng để nối giữa hai cữ. Luôn bắt đầu bằng cữ dài hơn.",
        "The guard number tells roughly how much length is left, a bigger number leaves more; brands differ, so check the chart. The taper lever on the side fine-tunes the length and helps blend between two guards. Always start with a longer guard.",
        "Ohjauskamman numero kertoo suunnilleen jäävän pituuden, isompi numero jättää enemmän; merkit eroavat, joten katso taulukko. Sivun säätövipu hienosäätää pituutta ja auttaa häivyttämään kahden ohjauskamman välillä. Aloita aina pidemmällä ohjauskammalla."
      ),
      l3(
        "Cầm kéo: ngón cái một vòng, ngón áp út vòng kia, ngón út tựa đuôi kéo; chỉ lưỡi phía ngón cái chuyển động. Khi chải, cuộn kéo vào lòng bàn tay; không chĩa mũi kéo về phía mặt khách.",
        "Scissors: thumb in one ring, ring finger in the other, little finger on the tang; only the thumb blade moves. While combing, palm the scissors; never point the tips towards the customer's face.",
        "Sakset: peukalo toisessa renkaassa, nimetön toisessa, pikkusormi tuella; vain peukalon terä liikkuu. Kammatessa sakset kämmenen sisään; älä koskaan osoita kärjillä asiakkaan kasvoja kohti."
      ),
      l3(
        "Tông đơ đi ngược chiều tóc mọc, cữ áp phẳng, chậm, các đường chồng nhau; ở gáy và quanh xoáy đi thêm vài hướng. Ấn mạnh hay nghiêng tông đơ làm thành lỗ.",
        "Clip against the growth with the guard flat, slowly, overlapping strokes; at the nape and around whorls go over it in a few directions. Pressing hard or tilting the clipper makes holes.",
        "Leikkaa koneella kasvusuuntaa vastaan ohjauskampa tasaisesti päätä vasten, hitaasti ja vedot limittäin; niskassa ja pyörteiden ympärillä useasta suunnasta. Painaminen tai koneen kallistaminen tekee kuoppia."
      ),
      l3(
        "Kéo trên lược và tông đơ trên lược: lược sát đầu, răng hơi nghiêng ra, cắt phần tóc lòi qua lược; góc lược quyết định độ dài. Kéo cho đường nối mềm, tông đơ nhanh và đều. Lược luôn đi lên, không dừng một chỗ.",
        "Scissor-over-comb and clipper-over-comb: comb close to the head, teeth angled slightly out, cut what sticks through; the comb's angle decides the length. Scissors give a soft blend, clippers are fast and even. Keep the comb moving up, never pause in one place.",
        "Sakset ja kone kamman päällä: kampa lähellä päätä, piikit hieman ulospäin, leikkaa kamman läpi nouseva osa; kamman kulma ratkaisee pituuden. Sakset antavat pehmeän häivytyksen, kone on nopea ja tasainen. Liikuta kampaa koko ajan ylöspäin, älä pysähdy."
      ),
      l3(
        "Lỗi hay gặp nhất là đường gờ cứng chỗ hai bên gặp phần đỉnh. Nối dần từ ngắn tới dài bằng kéo trên lược hay một cữ dài hơn ở giữa, cho tới khi vuốt lên không còn gờ.",
        "The most common fault is a hard line where the sides meet the top. Blend gradually from short to long with scissor-over-comb or a longer guard in between, until you feel no ridge when you brush upwards.",
        "Yleisin virhe on kova raja, jossa sivut kohtaavat päälaen. Häivytä vähitellen lyhyestä pitkään saksilla kamman päällä tai välissä pidemmällä ohjauskammalla, kunnes ylöspäin sivellessä reunaa ei tunnu."
      ),
      l3(
        "Viền tai gọn, tự nhiên, không khoét cao; hai mai bằng nhau (đầu khách thẳng, nhìn thẳng gương, hai ngón tay so chân mai); gáy vuông hay tròn theo ý khách. Nhìn trong gương, nhìn nghiêng và từ phía sau.",
        "A clean, natural outline round the ears, not cut too high; level sideburns (head straight, looking into the mirror, two fingers comparing the bottoms); a square or rounded nape as the customer wants. Check in the mirror, from the side and from behind.",
        "Siisti, luonnollinen rajaus korvien ympärillä, ei liian korkealle; tasaiset pulisongit (pää suorassa, katse peiliin, kaksi sormea vertaa alareunoja); suora tai pyöristetty niska asiakkaan toiveen mukaan. Tarkista peilistä, sivulta ja takaa."
      ),
      l3(
        "Đọc mái tóc trước: tóc dày, sợi to cắt quá ngắn sẽ dựng đứng; tóc thưa ở đỉnh để quá dài càng lộ da đầu, cắt gọn thường trông dày hơn; chỗ xoáy đừng cắt quá sát.",
        "Read the hair first: thick, coarse hair cut too short stands up; thin hair on top left too long shows more scalp, a neater cut often looks fuller; don't cut too close at a whorl.",
        "Arvioi hiukset ensin: tuuhea, paksu hius liian lyhyeksi leikattuna nousee pystyyn; ohut hiuslaki liian pitkänä näyttää enemmän hiuspohjaa, siistimpi leikkaus näyttää usein tuuheammalta; älä leikkaa pyörteen kohdalta liian lyhyeksi."
      ),
      l3(
        "Sau mỗi khách: chải sạch tóc trong lưỡi tông đơ, khử khuẩn lưỡi và cữ theo hướng dẫn sản phẩm, tra dầu cho lưỡi; lược, kéo làm sạch và khử khuẩn; lưỡi dao cạo dùng một lần.",
        "After every customer: brush the hair out of the clipper blades, disinfect blades and guards as the product instructs, oil the blades; clean and disinfect combs and scissors; razor blades are single-use.",
        "Jokaisen asiakkaan jälkeen: harjaa hiukset pois koneen teristä, desinfioi terät ja ohjauskammat tuotteen ohjeen mukaan, öljyä terät; puhdista ja desinfioi kammat ja sakset; partaterät ovat kertakäyttöisiä."
      ),
      l3(
        "Nói thật với khách: xoáy mạnh thì cạo sát sẽ dựng; ảnh mẫu tóc dày mà tóc khách mảnh thì nói rõ sẽ không giống hệt; kiểu cần vuốt sáp mà khách không vuốt thì gợi ý kiểu dễ hơn; kiểu ngắn thường giữ dáng khoảng 3–5 tuần.",
        "Be honest: with a strong whorl a very short crown will stand up; if the photo shows thick hair and the customer's is fine, say it won't look identical; if a style needs product the customer never uses, suggest an easier one; short cuts usually keep their shape for about 3–5 weeks.",
        "Ole rehellinen: voimakkaan pyörteen kohdalla hyvin lyhyt päälaki nousee pystyyn; jos mallikuvassa on paksut hiukset ja asiakkaalla ohuet, kerro ettei tulos ole identtinen; jos tyyli vaatii muotoilutuotetta, jota asiakas ei käytä, ehdota helpompaa; lyhyt leikkaus pysyy muodossa yleensä noin 3–5 viikkoa."
      ),
    ],
    tips: [
      l3(
        "Khi không chắc, lắp cữ dài hơn một số. Đi lại bằng cữ ngắn hơn chỉ mất một phút; cắt lẹm thì khách phải đợi vài tuần.",
        "When in doubt, put on a guard one size longer. Going over again with a shorter one takes a minute; cutting too short makes the customer wait weeks.",
        "Epävarmana valitse yhtä pidempi ohjauskampa. Uusi kierros lyhyemmällä vie minuutin; liian lyhyeksi leikattu saa asiakkaan odottamaan viikkoja."
      ),
      l3(
        "Trong VaraaAi, nhắc khách hẹn lại sau vài tuần bằng thẻ khách quen hay tin nhắn, để kiểu tóc luôn gọn.",
        "In VaraaAi, remind customers to rebook after a few weeks with the loyalty card or a message, so the cut always stays sharp.",
        "Muistuta VaraaAi:ssa asiakkaita varaamaan uudelleen muutaman viikon päästä kanta-asiakaskortilla tai viestillä, jotta leikkaus pysyy aina siistinä."
      ),
    ],
    quiz: [
      {
        q: l3("Số trên cữ tông đơ cho biết điều gì?", "What does the number on a clipper guard tell you?", "Mitä koneen ohjauskamman numero kertoo?"),
        options: [
          l3("Tóc sẽ còn dài khoảng bao nhiêu — và mỗi hãng một khác", "Roughly how much length is left — and it varies by brand", "Suunnilleen jäävän pituuden — ja se vaihtelee valmistajittain"),
          l3("Đúng số milimét, giống nhau ở mọi hãng", "The exact millimetres, the same for every brand", "Tarkat millimetrit, samat kaikilla merkeillä"),
          l3("Tốc độ của tông đơ", "The clipper's speed", "Koneen nopeuden"),
        ],
        answer: 0,
        why: l3(
          "Số lớn thì tóc để dài hơn, nhưng độ dài thật khác nhau theo hãng; xem bảng của hãng mình dùng.",
          "A bigger number leaves longer hair, but the real length differs by brand; check your brand's chart.",
          "Isompi numero jättää pidemmät hiukset, mutta todellinen pituus vaihtelee merkeittäin; katso oman merkkisi taulukko."
        ),
      },
      {
        q: l3("Vì sao chỗ hai bên gặp phần đỉnh hay bị lỗi?", "Why does the area where the sides meet the top often go wrong?", "Miksi kohta, jossa sivut kohtaavat päälaen, epäonnistuu usein?"),
        options: [
          l3("Vì tóc ở đó mọc chậm hơn", "Because the hair there grows more slowly", "Koska hiukset kasvavat siinä hitaammin"),
          l3("Vì không nối dần từ ngắn tới dài, để lại một đường gờ cứng", "Because it isn't blended gradually from short to long, leaving a hard line", "Koska sitä ei häivytetä vähitellen lyhyestä pitkään, ja jää kova raja"),
          l3("Vì dùng kéo thay vì tông đơ", "Because scissors were used instead of clippers", "Koska käytettiin saksia koneen sijaan"),
        ],
        answer: 1,
        why: l3(
          "Hai bên ngắn, đỉnh dài: phải nối dần bằng kéo trên lược hay một cữ dài hơn ở giữa, tới khi vuốt lên không còn gờ.",
          "Short sides and a long top must be blended gradually with scissor-over-comb or a longer guard in between, until no ridge is left.",
          "Lyhyet sivut ja pitkä päälaki häivytetään vähitellen saksilla kamman päällä tai välissä pidemmällä ohjauskammalla, kunnes reunaa ei jää."
        ),
      },
      {
        q: l3("Kiểm tra hai bên tóc mai bằng nhau thế nào?", "How do you check that the sideburns are level?", "Miten tarkistat, että pulisongit ovat tasan?"),
        options: [
          l3("Nhìn từ một bên là đủ", "Looking from one side is enough", "Yhdeltä puolelta katsominen riittää"),
          l3("Để khách nghiêng đầu cho dễ cắt", "Let the customer tilt their head to make it easier", "Anna asiakkaan kallistaa päätä, niin on helpompaa"),
          l3("Đầu khách thẳng, nhìn thẳng gương, hai ngón tay so chân hai bên mai", "Head straight, looking into the mirror, two fingers comparing the bottoms of both sideburns", "Pää suorassa, katse peiliin, kaksi sormea vertaa molempien pulisonkien alareunoja"),
        ],
        answer: 2,
        why: l3(
          "Đầu nghiêng là mai lệch. So cả hai bên cùng lúc trong gương mới thấy chênh lệch.",
          "A tilted head means crooked sideburns. Only comparing both sides at once in the mirror shows a difference.",
          "Kallistettu pää tarkoittaa vinoja pulisonkeja. Vain molempien vertaaminen yhtä aikaa peilistä paljastaa eron."
        ),
      },
    ],
  },
  {
    slug: "cat-nam-co-ban",
    course: "p-hair",
    style: "practice",
    title: l3("Cắt tóc nam cơ bản: thực hành từng bước", "Men's haircut basics: step-by-step practice", "Miesten perusleikkaus: käytäntö vaihe vaiheelta"),
    summary: l3(
      "Một kiểu tóc nam ngắn cổ điển từng bước: chuẩn bị và giấy cổ, tư vấn, làm ẩm, hai bên và phía sau bằng tông đơ có cữ, kéo trên lược để nối lên, cắt phần đỉnh với đường chuẩn và kiểm tra chéo, nối đỉnh với hai bên, viền tai, tóc mai và gáy, phủi tóc, tạo kiểu, gương tay, ghi hồ sơ và dọn dẹp.",
      "A classic short men's cut step by step: preparation and neck strip, consultation, dampening, sides and back with a clipper guard, scissor-over-comb to blend upwards, cutting the top with a guideline and cross-checking, blending the top into the sides, outlining ears, sideburns and nape, brushing off, styling, the hand mirror, notes and clean-up.",
      "Klassinen lyhyt miesten leikkaus vaihe vaiheelta: valmistelu ja kaulapaperi, konsultaatio, kostutus, sivut ja takaosa koneella ohjauskammalla, häivytys ylöspäin saksilla kamman päällä, päälaen leikkaus ohjauslinjalla ja ristiintarkistus, päälaen häivytys sivuihin, korvien, pulisonkien ja niskan rajaus, hiusten harjaus pois, muotoilu, käsipeili, muistiinpanot ja siivous."
    ),
    video: video("cat-nam-co-ban", 259, "2026-11-19"),
    notice: l3(
      "Số cữ khác nhau theo hãng: luôn bắt đầu bằng cữ dài hơn. Chỉ cắt ngắn hơn hay bỏ cữ ở viền dưới khi đã thống nhất với khách. Lưỡi tông đơ, cữ, lược và kéo làm sạch, khử khuẩn sau mỗi khách theo hướng dẫn sản phẩm; dải giấy cổ và lưỡi dao cạo dùng một lần (bài “Xử lý dụng cụ sau mỗi khách”). Da đầu có vết thương, viêm hay có chấy thì không cắt. Quy định khác nhau theo từng nước.",
      "Guard numbers differ by brand: always start with a longer guard. Go shorter or remove the guard at the bottom edge only when agreed with the customer. Clipper blades, guards, combs and scissors are cleaned and disinfected after every customer as the product instructs; neck strips and razor blades are single-use (lesson “Tools after every customer”). Wounds, inflammation or head lice on the scalp: no cut. Rules differ by country.",
      "Ohjauskampojen numerot vaihtelevat valmistajittain: aloita aina pidemmällä. Lyhennä tai poista ohjauskampa alareunasta vain asiakkaan kanssa sovittaessa. Koneen terät, ohjauskammat, kammat ja sakset puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen tuotteen ohjeen mukaan; kaulapaperit ja partaterät ovat kertakäyttöisiä (tunti ”Välineet jokaisen asiakkaan jälkeen”). Haavat, tulehdus tai täit hiuspohjassa: ei leikkausta. Määräykset vaihtelevat maittain."
    ),
    related: ["khach-hang", "lich-hen", "the-khach-quen"],
    steps: [
      l3(
        "Rửa tay; tông đơ, cữ, lược, kéo đã làm sạch và khử khuẩn. Dải giấy cổ dùng một lần, rồi mới cài áo choàng.",
        "Wash your hands; clipper, guards, combs and scissors cleaned and disinfected. A single-use neck strip first, then the cape.",
        "Pese kädet; kone, ohjauskammat, kammat ja sakset puhdistettu ja desinfioitu. Ensin kertakäyttöinen kaulapaperi, sitten suojaviitta."
      ),
      l3(
        "Tư vấn (bài Tư vấn và chia vùng): hai bên ngắn cỡ nào, đỉnh để bao nhiêu, gáy vuông hay tròn, tóc mai đến đâu; lần trước khách không thích gì. Thống nhất bằng cữ hay ngón tay; tìm xoáy, nhìn da đầu.",
        "Consult (Consultation and sectioning lesson): how short the sides, how much on top, square or rounded nape, sideburn length; what the customer disliked last time. Agree with a guard or your fingers; look for whorls and check the scalp.",
        "Konsultaatio (tunti Konsultaatio ja jaottelu): kuinka lyhyet sivut, paljonko päälle, suora vai pyöristetty niska, pulisonkien pituus; mistä asiakas ei pitänyt viimeksi. Sovi ohjauskammalla tai sormilla; etsi pyörteet ja tarkista hiuspohja."
      ),
      l3(
        "Làm ẩm đều bằng bình phun sương, vừa chải vừa xịt, không nhỏ giọt (nhiều thợ đi tông đơ khi tóc khô, sạch — miễn là tóc chải thẳng, không rối).",
        "Dampen evenly with a fine mist while combing, never dripping (many barbers clip on clean dry hair — what matters is combed, tangle-free hair).",
        "Kostuta tasaisesti sumutteella kammaten, ei valuvaksi (moni parturi leikkaa koneella puhtaat kuivat hiukset — tärkeintä on kammattu, takuton tukka)."
      ),
      l3(
        "Hai bên và phía sau: cữ đã thống nhất hay dài hơn, áp phẳng ở chân tóc, đi lên ngược chiều mọc, chậm, chồng đường; tới đường vòng đầu thì lật cổ tay ra; gập nhẹ vành tai; phía sau từ gáy lên xương chẩm; đi lại theo hướng khác. Không ấn mạnh.",
        "Sides and back: the agreed guard or longer, flat at the hairline, up against the growth, slowly, overlapping; flick the wrist out at the parietal ridge; fold the ear gently; at the back from the nape to the occipital bone; go over again in another direction. Never press hard.",
        "Sivut ja takaosa: sovittu ohjauskampa tai pidempi, tasaisesti hiusrajasta ylös kasvusuuntaa vastaan, hitaasti, vedot limittäin; päälaen reunan kohdalla ranne kääntyy ulos; taita korvaa kevyesti; takana niskasta takaraivon kyhmylle; käy läpi uudelleen toisesta suunnasta. Älä paina."
      ),
      l3(
        "Viền dưới ngắn hơn hay bỏ cữ chỉ khi đã thống nhất từ trước — ngắn rồi không làm dài lại được.",
        "A shorter guard or no guard at the bottom edge only if agreed beforehand — short can't be made long again.",
        "Lyhyempi tai ei ohjauskampaa alareunassa vain etukäteen sovittaessa — lyhyttä ei saa takaisin pitkäksi."
      ),
      l3(
        "Kéo trên lược nối lên: lược sát đầu ở chỗ tông đơ dừng, răng hơi nghiêng ra, lưỡi kéo song song theo lược; lược đi lên và nghiêng ra dần, không dừng một chỗ.",
        "Scissor-over-comb to blend upwards: comb close to the head where the clipper stopped, teeth angled slightly out, blade parallel to the comb; the comb moves up and gradually out, never pausing.",
        "Sakset kamman päällä ylöspäin häivyttäen: kampa lähelle päätä siitä, mihin kone jäi, piikit hieman ulospäin, terä kamman suuntaisesti; kampa nousee ja kallistuu vähitellen ulos pysähtymättä."
      ),
      l3(
        "Phần đỉnh: chia từ hai góc trán ra sau tới đỉnh; lọn đầu ở trán nâng 90°, kẹp giữa ngón trỏ và ngón giữa, cắt đúng độ dài — đó là đường chuẩn; các lọn sau lấy kèm một chút lọn trước, giữ cùng góc nâng; chỗ xoáy để dài hơn, nhẹ tay; hỏi khách giữa chừng.",
        "The top: section from both front corners back to the crown; the first section at the front lifted to 90° between index and middle finger and cut to length — that's the guideline; each next section takes a little of the previous, same elevation; leave more at the whorl with light tension; check with the customer midway.",
        "Päälaki: jaa etukulmista taakse päälaelle; ensimmäinen osio edessä 90°:n kulmaan etu- ja keskisormen väliin ja leikataan pituuteen — se on ohjauslinja; seuraaviin otetaan hieman edellistä, sama nostokulma; pyörteen kohdalle enemmän pituutta ja kevyt kireys; kysy asiakkaalta välillä."
      ),
      l3(
        "Kiểm tra chéo phần đỉnh bằng các lọn ngang từ bên này sang bên kia; tỉa lại lọn nhô lên. Nối đỉnh với hai bên ở góc bằng kéo trên lược hay cắt góc ra ngoài, tới khi vuốt lên không còn bậc; nhìn nghiêng để kiểm tra.",
        "Cross-check the top with sections across the head from side to side; trim anything that sticks out. Blend the top into the sides at the corner with scissor-over-comb or by cutting the corner out, until no step is felt; check in profile.",
        "Ristiintarkista päälaki poikittaisilla osioilla puolelta toiselle; tasaa esiin nousevat. Häivytä päälaki sivuihin kulmasta saksilla kamman päällä tai leikkaamalla kulma pois, kunnes porrasta ei tunnu; tarkista profiilista."
      ),
      l3(
        "Đường viền: gập vành tai, viền theo đường cong tự nhiên, không khoét cao; hai mai bằng nhau (đầu thẳng, nhìn thẳng gương, hai ngón tay so); gáy vuông hay tròn theo thống nhất, khách cúi nhẹ, không đẩy đường gáy lên cao.",
        "Outline: fold the ear, follow the natural curve, not too high; level sideburns (head straight, looking in the mirror, two fingers comparing); a square or rounded nape as agreed, head slightly forward, without pushing the line up too high.",
        "Rajaus: taita korva, seuraa luonnollista kaarta, ei liian korkealle; tasaiset pulisongit (pää suorassa, katse peiliin, kaksi sormea vertaa); sovittu suora tai pyöristetty niska, pää hieman eteen, linjaa nostamatta liian korkealle."
      ),
      l3(
        "Hoàn thiện: phủi tóc vụn bằng chổi phủi cổ, bỏ dải giấy; tạo kiểu như khách sẽ tự làm ở nhà và chỉ cách; gương tay cho xem phía sau, khách muốn chỉnh thì chỉnh ngay. Ghi cữ, độ dài, kiểu gáy vào hồ sơ, hẹn lần sau khoảng 3–5 tuần; làm sạch, khử khuẩn, tra dầu tông đơ.",
        "Finish: brush off loose hair with a neck brush, remove the strip; style it the way the customer will at home and show how; the hand mirror for the back, adjust at once if asked. Note guards, lengths and nape shape in the record, book the next visit in about 3–5 weeks; clean, disinfect and oil the clipper.",
        "Viimeistely: harjaa irtohiukset kaulaharjalla, poista paperi; muotoile niin kuin asiakas tekee kotona ja näytä miten; käsipeilillä takaosa näkyviin, korjaa heti pyydettäessä. Kirjaa ohjauskammat, pituudet ja niskan muoto, varaa seuraava käynti noin 3–5 viikon päähän; puhdista, desinfioi ja öljyä kone."
      ),
    ],
    tips: [
      l3(
        "Đi xong tông đơ một lượt, chải tóc xuống rồi đi lại theo hướng khác — những sợi nằm rạp sẽ không bị sót.",
        "After one pass with the clipper, comb the hair down and go over it again in another direction — no flattened hairs get missed.",
        "Kun olet ajanut koneella kerran, kampaa hiukset alas ja aja uudelleen toiseen suuntaan — painuneet hiukset eivät jää leikkaamatta."
      ),
      l3(
        "Trong VaraaAi, ghi cữ và độ dài vào ghi chú khách; lần sau khách chỉ cần nói “như lần trước”.",
        "In VaraaAi, record the guards and lengths in the customer notes; next time the customer only needs to say “same as last time”.",
        "Kirjaa VaraaAi:hin ohjauskammat ja pituudet asiakkaan muistiinpanoihin; ensi kerralla asiakkaan tarvitsee sanoa vain ”kuten viimeksi”."
      ),
    ],
    quiz: [
      {
        q: l3("Đi tông đơ có cữ ở hai bên thế nào cho đều?", "How do you clip the sides evenly with a guard?", "Miten sivut leikataan koneella tasaisesti ohjauskammalla?"),
        options: [
          l3("Đi từ trên xuống, ấn mạnh cho sát", "From the top down, pressing hard to get close", "Ylhäältä alas, painaen lähelle"),
          l3("Cữ áp phẳng, đi lên ngược chiều tóc mọc, chậm, các đường chồng nhau", "Guard flat, upwards against the growth, slowly, overlapping strokes", "Ohjauskampa tasaisesti, ylöspäin kasvusuuntaa vastaan, hitaasti, vedot limittäin"),
          l3("Nghiêng tông đơ để lưỡi cắm vào tóc", "Tilt the clipper so the blade digs in", "Kallista konetta, jotta terä uppoaa"),
        ],
        answer: 1,
        why: l3(
          "Ngược chiều mọc thì tóc dựng lên, cắt đều; ấn mạnh hay nghiêng tông đơ sẽ tạo lỗ.",
          "Against the growth the hair stands up and cuts evenly; pressing or tilting the clipper makes holes.",
          "Kasvusuuntaa vastaan hiukset nousevat ja leikkautuvat tasaisesti; painaminen tai kallistaminen tekee kuoppia."
        ),
      },
      {
        q: l3("Khi nào được bỏ cữ ở viền dưới cùng?", "When may you remove the guard at the bottom edge?", "Milloin ohjauskamman saa poistaa alareunasta?"),
        options: [
          l3("Lúc nào cũng được, cho gọn", "Any time, to make it neat", "Milloin vain, siistiyden vuoksi"),
          l3("Khi thợ thấy đẹp hơn", "Whenever the barber thinks it looks better", "Kun parturin mielestä se näyttää paremmalta"),
          l3("Chỉ khi đã thống nhất với khách từ trước", "Only when agreed with the customer beforehand", "Vain kun asiakkaan kanssa on sovittu etukäteen"),
        ],
        answer: 2,
        why: l3(
          "Tóc đã cắt ngắn thì không làm dài lại được; mọi thay đổi độ dài phải được khách đồng ý.",
          "Hair cut short can't be made long again; every change in length needs the customer's agreement.",
          "Lyhyeksi leikattua ei saa takaisin; jokainen pituusmuutos vaatii asiakkaan suostumuksen."
        ),
      },
      {
        q: l3("Lọn đầu tiên ở trán khi cắt phần đỉnh có vai trò gì?", "What is the first section at the front of the top for?", "Mikä tehtävä on päälaen ensimmäisellä osiolla edessä?"),
        options: [
          l3("Là đường chuẩn để các lọn sau làm theo", "It's the guideline the later sections follow", "Se on ohjauslinja, jota seuraavat osiot noudattavat"),
          l3("Chỉ để thử kéo có sắc không", "Just to test if the scissors are sharp", "Vain saksien terävyyden testaamiseen"),
          l3("Không quan trọng, cắt lọn nào trước cũng được", "Not important, any section can go first", "Ei merkitystä, mikä tahansa osio käy ensin"),
        ],
        answer: 0,
        why: l3(
          "Mỗi lọn sau lấy kèm một chút lọn trước và cắt theo nó, nên phần đỉnh dài đều từ trán tới đỉnh đầu.",
          "Each next section takes a little of the previous one and follows it, so the top stays even from the front to the crown.",
          "Jokaiseen seuraavaan osioon otetaan hieman edellistä ja leikataan sen mukaan, joten päälaki pysyy tasaisena edestä päälaelle."
        ),
      },
    ],
  },
  soon("cat-nam-fade", "p-hair", ["Fade: low, mid, high", "Fades: low, mid, high", "Fade: matala, keski, korkea"], [
    "Đặt đường guideline, mở – đóng cần gạt, xoá đường và hoàn thiện viền.",
    "Setting guidelines, lever open and closed, erasing lines and finishing the edges.",
    "Ohjauslinjat, vivun asennot, rajojen häivytys ja reunojen viimeistely.",
  ]),
  soon("cat-nam-tao-kieu", "p-hair", ["Cắt nam tạo kiểu: side part, crop", "Men's styles: side part, crop", "Miesten tyylit: sivujakaus, crop"], [
    "Cắt phần trên theo kiểu, tạo texture và vuốt sáp.",
    "Cutting the top to the style, adding texture and finishing with product.",
    "Päällishiusten leikkaus tyyliin, tekstuuri ja muotoilutuotteet.",
  ]),
  soon("cat-nu-bang", "p-hair", ["Cắt tóc nữ: cắt bằng và bob", "Women's cuts: one-length and bob", "Naisten leikkaukset: tasapituinen ja polkka"], [
    "Góc nâng 0°, lực căng tóc, đường chuẩn và kiểm tra cân hai bên.",
    "Zero elevation, tension, the guide line and checking the balance.",
    "Nollakohotus, kireys, ohjauslinja ja tasapainon tarkistus.",
  ]),
  soon("cat-nu-tang", "p-hair", ["Cắt tóc nữ: cắt tầng (layers)", "Women's cuts: layers", "Naisten leikkaukset: kerrokset"], [
    "Góc nâng 90° và 180°, tầng quanh mặt, giữ độ dài.",
    "90° and 180° elevation, face-framing layers and keeping the length.",
    "90 ja 180 asteen kohotus, kasvoja kehystävät kerrokset ja pituuden säilyttäminen.",
  ]),
  soon("cat-mai", "p-hair", ["Cắt mái và tỉa quanh mặt", "Fringes and face framing", "Otsatukka ja kasvojen kehystys"], [
    "Mái thưa, mái bay, curtain bangs và cách tránh cắt quá ngắn.",
    "Wispy fringes, curtain bangs, and how not to cut too short.",
    "Kevyt otsatukka, verho-otsatukka ja miten vältetään liian lyhyt leikkaus.",
  ]),
  soon("say-tao-kieu", "p-hair", ["Sấy tạo kiểu", "Blow-drying and styling", "Föönaus ja muotoilu"], [
    "Sấy phồng chân tóc, sấy cụp, sấy xoăn bằng lược tròn và bảo vệ tóc khỏi nhiệt.",
    "Root lift, smooth ends, round-brush curls and heat protection.",
    "Tyvikohotus, sileät latvat, pyöröharjakiharat ja lämpösuoja.",
  ]),

  /* ================= spa ================= */
  {
    slug: "spa-soi-da-hieu-dung",
    course: "p-spa",
    style: "theory",
    title: l3("Soi da và tư vấn: hiểu đúng để chọn đúng liệu trình", "Skin analysis and consultation: understand it to choose the right treatment", "Ihoanalyysi ja konsultaatio: ymmärrä ne, niin valitset oikean hoidon"),
    summary: l3(
      "Vì sao mọi liệu trình bắt đầu từ việc đọc da, loại da khác tình trạng da thế nào, đọc da bằng mắt, bằng tay và đèn lúp, những câu cần hỏi trong phiếu tư vấn (dị ứng, thuốc, retinoid, axit, isotretinoin, liệu trình gần đây, nắng, mang thai), khi nào không làm, nói thật về kết quả, kế hoạch chăm sóc tại nhà và giữ kín hồ sơ khách.",
      "Why every treatment starts with reading the skin, how a skin type differs from a skin condition, reading the skin by eye, by touch and under a magnifier lamp, what to ask on the consultation card (allergies, medicines, retinoids, acids, isotretinoin, recent treatments, sun, pregnancy), when not to treat, honest expectations, a home-care plan and keeping the client's record confidential.",
      "Miksi jokainen hoito alkaa ihon lukemisesta, miten ihotyyppi eroaa ihon tilasta, ihon arviointi silmin, käsin ja suurennuslampun alla, mitä asiakaskortissa kysytään (allergiat, lääkkeet, retinoidit, hapot, isotretinoiini, viimeaikaiset hoidot, aurinko, raskaus), milloin ei hoideta, rehelliset odotukset, kotihoito-ohjelma ja asiakastietojen luottamuksellisuus."
    ),
    video: video("spa-soi-da-hieu-dung", 291, "2026-11-19"),
    notice: l3(
      "Người làm da không chẩn đoán: hãy tả điều mình thấy và khuyên khách hỏi bác sĩ. Với thuốc, sản phẩm hoạt tính và thai kỳ, làm theo hướng dẫn của hãng và của bác sĩ kê thuốc. Quy định khác nhau theo từng nước. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "A skin therapist does not diagnose: describe what you see and suggest a doctor. With medicines, active products and pregnancy, follow the product brand's guidance and the prescriber's advice. Rules differ by country. This lesson is a training aid, not a licence.",
      "Ihonhoitaja ei tee diagnooseja: kerro, mitä näet, ja ohjaa lääkäriin. Lääkkeiden, aktiivisten tuotteiden ja raskauden kohdalla noudatetaan valmistajan ohjeita ja lääkkeen määränneen lääkärin neuvoja. Määräykset vaihtelevat maittain. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    sources: [
      { label: "NHS — Common questions about isotretinoin capsules (no waxing during treatment)", url: "https://www.nhs.uk/medicines/isotretinoin-capsules/common-questions-about-isotretinoin-capsules/" },
    ],
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Mọi liệu trình bắt đầu từ việc đọc da. Chỉ nghe khách nói “da em nhiều dầu” rồi chọn sản phẩm mạnh là sai thường gặp: da có thể vừa dầu vừa thiếu nước, và làm sạch quá mạnh khiến da căng rát, bong vảy mà vẫn bóng.",
        "Every treatment starts with reading the skin. Hearing “my skin is oily” and reaching for strong products is a common mistake: skin can be oily and dehydrated at once, and over-cleansing leaves it tight, flaky and still shiny.",
        "Jokainen hoito alkaa ihon lukemisesta. Yleinen virhe on kuulla ”ihoni on rasvainen” ja valita heti voimakkaat tuotteet: iho voi olla yhtä aikaa rasvainen ja kuivunut, ja liian voimakas puhdistus jättää sen kireäksi, hilseileväksi ja silti kiiltäväksi."
      ),
      l3(
        "Loại da khá ổn định: da thường, khô, dầu, hỗn hợp, nhạy cảm. Tình trạng da thay đổi theo mùa, sản phẩm, tuổi, giấc ngủ: thiếu nước, đỏ da, bít tắc, sắc tố, dấu hiệu lão hóa.",
        "A skin type is fairly constant: normal, dry, oily, combination, sensitive. A skin condition changes with the season, products, age and sleep: dehydration, redness, congestion, pigmentation, signs of ageing.",
        "Ihotyyppi on melko pysyvä: normaali, kuiva, rasvainen, seka-iho, herkkä. Ihon tila vaihtelee vuodenajan, tuotteiden, iän ja unen mukaan: kuivuminen, punoitus, tukkeutuminen, pigmentti, ikääntymisen merkit."
      ),
      l3(
        "Da hỗn hợp bóng ở vùng chữ T (trán, mũi, cằm), má thường hoặc khô. Thiếu dầu là da khô; thiếu nước thì loại da nào cũng có thể bị, kể cả da dầu.",
        "Combination skin shines in the T-zone (forehead, nose, chin) while the cheeks are normal or dry. Lack of oil means dry skin; lack of water (dehydration) can affect any type, oily skin too.",
        "Seka-iho kiiltää T-alueella (otsa, nenä, leuka), posket ovat normaalit tai kuivat. Rasvan puute tarkoittaa kuivaa ihoa; kosteuden puute voi koskea mitä tahansa ihotyyppiä, myös rasvaista."
      ),
      l3(
        "Soi da trên da sạch, không trang điểm, dưới ánh sáng tốt và đèn lúp; che mắt khách bằng bông. Nhìn bề mặt, lỗ chân lông, vùng bóng dầu; sờ thật nhẹ xem da mềm, căng hay ráp; chỗ vừa chạm đã ửng đỏ là da đang nhạy cảm.",
        "Analyse clean, make-up-free skin in good light under a magnifier lamp, with cotton pads over the client's eyes. Look at the texture, the pores and where it shines; touch very lightly to feel soft, tight or rough skin; skin that flushes at a light touch is sensitive right now.",
        "Arvioi puhdas, meikitön iho hyvässä valossa suurennuslampun alla, asiakkaan silmät pumpulilapuilla suojattuina. Katso pintaa, huokosia ja kiiltäviä alueita; tunnustele kevyesti, onko iho pehmeä, kireä vai karhea; kevyestä kosketuksesta punoittava iho on juuri nyt herkkä."
      ),
      l3(
        "Phiếu tư vấn: dị ứng và phản ứng với mỹ phẩm trước đây, thuốc đang dùng, sản phẩm đang bôi ở nhà (nhất là retinoid và axit), thuốc trị mụn isotretinoin, liệu trình gần đây (lột da hóa học, laser, tẩy lông bằng sáp), đi nắng. Khách quen cũng hỏi lại.",
        "The consultation card: allergies and earlier reactions to cosmetics, current medicines, products used at home (especially retinoids and acids), the acne medicine isotretinoin, recent treatments (chemical peels, laser, waxing), sun exposure. Ask regulars again too.",
        "Asiakaskortti: allergiat ja aiemmat reaktiot kosmetiikkaan, käytössä olevat lääkkeet, kotona käytetyt tuotteet (etenkin retinoidit ja hapot), aknelääke isotretinoiini, viimeaikaiset hoidot (kemialliset kuorinnat, laser, vahaus), auringolle altistuminen. Kysy uudelleen myös vakioasiakkailta."
      ),
      l3(
        "Da đang dùng retinoid hay axit mỏng và nhạy hơn: tẩy da chết mạnh dễ trầy, rát. Khách đang uống isotretinoin, hoặc mới ngừng trong khoảng sáu tháng: không wax (xem bài Khi nào không làm cho khách). Mang thai: hỏi thêm và chọn sản phẩm theo hướng dẫn của hãng.",
        "Skin on retinoids or acids is thinner and more reactive: strong exfoliation easily grazes and stings. A client taking isotretinoin, or who stopped within about six months: no waxing (see the lesson on when not to treat). Pregnancy: ask more and choose products by the brand's guidance.",
        "Retinoideja tai happoja käyttävä iho on ohuempi ja herkempi: voimakas kuorinta naarmuttaa ja kirvelee helposti. Isotretinoiinia käyttävä tai sen noin puolen vuoden sisällä lopettanut: ei vahausta (katso tunti siitä, milloin ei hoideta). Raskaus: kysy lisää ja valitse tuotteet valmistajan ohjeiden mukaan."
      ),
      l3(
        "Không chẩn đoán. Da cháy nắng, trầy xước, mụn rộp, vùng sưng đỏ, đau, có mủ, nốt ruồi lạ đổi màu đổi dáng: không làm trên vùng đó, tả điều mình thấy và khuyên khách hỏi bác sĩ.",
        "Don't diagnose. Sunburn, broken skin, cold sores, swollen, red, painful or pus-filled areas, a mole that changes colour or shape: don't treat that area; describe what you see and suggest a doctor.",
        "Älä diagnosoi. Auringon polttama tai rikkinäinen iho, huuliherpes, turvonnut, punainen, kipeä tai märkivä alue, väriä tai muotoa muuttava luomi: älä hoida aluetta, kerro mitä näet ja ohjaa lääkäriin."
      ),
      l3(
        "Nói thật về kết quả: một buổi làm da sạch, mềm, tươi hơn, nhưng đốm nâu, nếp nhăn hay mụn lâu năm không hết sau một buổi. Ghi mục tiêu của khách để lần sau so sánh.",
        "Be honest about results: one treatment leaves the skin clean, soft and fresh, but pigmentation, lines or long-standing acne do not disappear in one visit. Note the client's goal to compare next time.",
        "Kerro tuloksista rehellisesti: yksi hoito jättää ihon puhtaaksi, pehmeäksi ja raikkaaksi, mutta pigmenttimuutokset, juonteet tai pitkäaikainen akne eivät katoa yhdellä käynnillä. Kirjaa asiakkaan tavoite, jotta voit verrata seuraavalla kerralla."
      ),
      l3(
        "Kế hoạch tại nhà ít bước mà đều đặn: làm sạch dịu nhẹ, dưỡng ẩm hợp loại da, kem chống nắng mỗi sáng. Đừng bán mười sản phẩm. Hẹn lần sau để xem da thay đổi.",
        "A home-care plan with few steps, done every day: gentle cleansing, a moisturiser for the skin type, sunscreen every morning. Don't sell ten products. Book the next visit to see how the skin changes.",
        "Kotihoito-ohjelma, jossa on vähän vaiheita mutta joka tehdään päivittäin: hellävarainen puhdistus, ihotyypille sopiva kosteusvoide ja aurinkosuoja joka aamu. Älä myy kymmentä tuotetta. Varaa seuraava käynti, jotta näet ihon muutoksen."
      ),
      l3(
        "Dị ứng, thuốc men, sức khỏe là chuyện riêng tư: chỉ ghi khi khách đồng ý và giữ thật kín.",
        "Allergies, medicines and health are private: record them only with the client's consent and keep them confidential.",
        "Allergiat, lääkkeet ja terveys ovat yksityisasioita: kirjaa ne vain asiakkaan suostumuksella ja pidä ne luottamuksellisina."
      ),
    ],
    tips: [
      l3(
        "Soi da luôn theo cùng một thứ tự (trán, vùng chữ T, má, hàm và cằm, cổ) để không bỏ sót vùng nào.",
        "Always analyse in the same order (forehead, T-zone, cheeks, jaw and chin, neck) so no area is missed.",
        "Arvioi aina samassa järjestyksessä (otsa, T-alue, posket, leukalinja ja leuka, kaula), ettei mikään alue jää huomaamatta."
      ),
      l3(
        "Trong VaraaAi, ghi loại da, tình trạng da và câu trả lời tư vấn vào ghi chú nội bộ trong hồ sơ khách (chỉ tiệm mới thấy), để ai làm lần sau cũng biết ngay.",
        "In VaraaAi, save the skin type, its condition and the consultation answers in the client's internal notes (visible to the salon only), so whoever treats the client next knows straight away.",
        "Tallenna VaraaAi:ssa ihotyyppi, ihon tila ja konsultaation vastaukset asiakkaan sisäisiin muistiinpanoihin (näkyvät vain yritykselle), jotta seuraava hoitaja tietää ne heti."
      ),
    ],
    quiz: [
      {
        q: l3("Điều nào đúng về loại da và tình trạng da?", "Which is true about skin type and skin condition?", "Mikä pitää paikkansa ihotyypistä ja ihon tilasta?"),
        options: [
          l3("Hai cái là một, không cần phân biệt", "They are the same, no need to tell them apart", "Ne ovat sama asia, eroa ei tarvitse tehdä"),
          l3("Loại da khá ổn định; tình trạng da thay đổi, ví dụ da dầu cũng có thể thiếu nước", "The type is fairly constant; the condition changes — oily skin can be dehydrated too", "Tyyppi on melko pysyvä; tila vaihtelee — rasvainenkin iho voi olla kuivunut"),
          l3("Da dầu thì không bao giờ thiếu nước", "Oily skin is never dehydrated", "Rasvainen iho ei koskaan kuivu"),
        ],
        answer: 1,
        why: l3(
          "Thiếu dầu là da khô, còn thiếu nước là tình trạng, loại da nào cũng có thể bị.",
          "Lack of oil is dry skin; lack of water is a condition that any skin type can have.",
          "Rasvan puute on kuiva iho; kosteuden puute on tila, joka voi olla millä tahansa ihotyypillä."
        ),
      },
      {
        q: l3("Khách kể đang uống thuốc trị mụn isotretinoin và muốn wax môi trên. Làm gì?", "The client says she is taking the acne medicine isotretinoin and wants her upper lip waxed. What do you do?", "Asiakas kertoo käyttävänsä aknelääke isotretinoiinia ja haluaa ylähuulen vahauksen. Mitä teet?"),
        options: [
          l3("Wax nhẹ tay là được", "Wax gently and it's fine", "Vahaa kevyesti, se riittää"),
          l3("Tẩy da chết trước cho sạch rồi wax", "Exfoliate first, then wax", "Kuori ensin ja vahaa sitten"),
          l3("Không wax, giải thích lý do và ghi lại, theo bài Khi nào không làm cho khách", "No waxing; explain why and note it, as in the lesson on when not to treat", "Ei vahausta; kerro syy ja kirjaa se, kuten tunnilla siitä, milloin ei hoideta"),
        ],
        answer: 2,
        why: l3(
          "Isotretinoin làm da rất dễ tổn thương; không wax trong lúc uống thuốc và khoảng sáu tháng sau khi ngừng.",
          "Isotretinoin makes the skin very fragile; no waxing while taking it and for about six months after stopping.",
          "Isotretinoiini tekee ihosta hyvin hauraan; ei vahausta hoidon aikana eikä noin puoleen vuoteen sen jälkeen."
        ),
      },
      {
        q: l3("Bạn thấy một vùng da sưng đỏ, đau trên má khách. Nói gì là đúng?", "You see a swollen, red, painful area on the client's cheek. What is the right thing to say?", "Näet asiakkaan poskessa turvonneen, punaisen ja kipeän alueen. Mitä on oikein sanoa?"),
        options: [
          l3("“Em thấy chỗ này sưng đỏ, em sẽ không làm ở đây, chị nên hỏi bác sĩ.”", "“I can see this area is swollen and red, so I won't treat it — please ask a doctor.”", "”Näen, että tämä kohta on turvonnut ja punainen, joten en hoida sitä — kysy lääkäriltä.”"),
          l3("“Chị bị nhiễm trùng rồi.”", "“You have an infection.”", "”Sinulla on tulehdus.”"),
          l3("Không nói gì và làm như bình thường", "Say nothing and carry on as usual", "Älä sano mitään ja jatka tavalliseen tapaan"),
        ],
        answer: 0,
        why: l3(
          "Người làm da không chẩn đoán: tả điều mình thấy, không làm trên vùng đó, và khuyên khách đi khám.",
          "A therapist does not diagnose: describe what you see, don't treat that area, and suggest a doctor.",
          "Ihonhoitaja ei diagnosoi: kerro mitä näet, älä hoida aluetta ja ohjaa lääkäriin."
        ),
      },
    ],
  },
  {
    slug: "spa-soi-da",
    course: "p-spa",
    style: "practice",
    title: l3("Soi da và tư vấn: thực hành từng bước", "Skin analysis and consultation: step by step", "Ihoanalyysi ja konsultaatio: vaihe vaiheelta"),
    summary: l3(
      "Đón khách, phiếu tư vấn, khi nào không làm, làm sạch để thấy da thật, soi từng vùng dưới đèn lúp (trán, vùng chữ T, má, hàm và cằm, cổ), thử bằng giấy thấm dầu và đầu ngón tay, ghi lại, chọn liệu trình và giải thích, chăm sóc tại nhà và hẹn lần sau.",
      "Welcoming the client, the consultation card, when not to treat, cleansing to see the bare skin, zone-by-zone analysis under the magnifier lamp (forehead, T-zone, cheeks, jaw and chin, neck), blotting-paper and fingertip tests, notes, choosing and explaining the treatment, home care and the next visit.",
      "Asiakkaan vastaanotto, asiakaskortti, milloin ei hoideta, puhdistus paljaan ihon näkemiseksi, alue kerrallaan suurennuslampun alla (otsa, T-alue, posket, leukalinja ja leuka, kaula), imupaperi- ja sormenpäätesti, kirjaukset, hoidon valinta ja selittäminen, kotihoito ja seuraava käynti."
    ),
    video: video("spa-soi-da", 272, "2026-11-19"),
    notice: l3(
      "Người làm da không chẩn đoán: thấy điều đáng lo thì không làm trên vùng đó và khuyên khách hỏi bác sĩ. Đeo găng hay không khi chạm da là theo quy định của tiệm và nơi bạn làm việc. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "A skin therapist does not diagnose: if something worries you, don't treat that area and suggest a doctor. Whether to wear gloves when touching the skin follows your salon's and your local rules. This lesson is a training aid, not a licence.",
      "Ihonhoitaja ei tee diagnooseja: jos jokin huolestuttaa, älä hoida aluetta ja ohjaa lääkäriin. Käsineiden käyttö ihoa kosketettaessa määräytyy yrityksesi ja paikallisten ohjeiden mukaan. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    related: ["khach-hang", "lich-hen", "dich-vu"],
    steps: [
      l3(
        "Đón khách, mời nước, mời thay áo choàng ở chỗ kín đáo; đeo băng đô giữ tóc khỏi mặt. Rửa tay bằng xà phòng và lau khô trước khi chạm vào khách (xem bài Rửa tay và găng tay).",
        "Welcome the client, offer water and a private place to change into a robe; put on a headband to keep the hair off the face. Wash and dry your hands before you touch the client (see the hand-washing and gloves lesson).",
        "Toivota asiakas tervetulleeksi, tarjoa vettä ja rauhallinen paikka vaihtaa aamutakki; laita otsapanta pitämään hiukset poissa kasvoilta. Pese ja kuivaa kätesi ennen kuin kosket asiakkaaseen (katso käsienpesun ja käsineiden tunti)."
      ),
      l3(
        "Phiếu tư vấn, hỏi từ tốn, ngang tầm mắt: dị ứng, phản ứng trước đây, thuốc, sản phẩm đang bôi (retinoid, axit), isotretinoin, liệu trình gần đây, nắng; mang thai thì hỏi thêm và theo hướng dẫn của hãng; mong muốn của khách. Khách quen cũng hỏi lại.",
        "The consultation card, asked calmly at eye level: allergies, earlier reactions, medicines, products in use (retinoids, acids), isotretinoin, recent treatments, sun; with pregnancy ask more and follow the brand's guidance; the client's wishes. Ask regulars again too.",
        "Asiakaskortti rauhassa ja samalla silmien tasolla: allergiat, aiemmat reaktiot, lääkkeet, käytössä olevat tuotteet (retinoidit, hapot), isotretinoiini, viimeaikaiset hoidot, aurinko; raskauden kohdalla kysy lisää ja noudata valmistajan ohjeita; asiakkaan toiveet. Kysy myös vakioasiakkailta uudelleen."
      ),
      l3(
        "Cháy nắng, trầy xước, mụn rộp, vùng sưng đỏ, đau: không làm trên vùng đó; nói nhẹ nhàng, tả điều mình thấy, khuyên hỏi bác sĩ (xem bài Khi nào không làm cho khách).",
        "Sunburn, broken skin, cold sores, swollen, red, painful areas: don't treat there; speak gently, describe what you see, suggest a doctor (see the lesson on when not to treat).",
        "Auringon polttama tai rikkinäinen iho, huuliherpes, turvonnut, punainen, kipeä alue: älä hoida sitä; puhu lempeästi, kerro mitä näet ja ohjaa lääkäriin (katso tunti siitä, milloin ei hoideta)."
      ),
      l3(
        "Khách nằm, đắp khăn và chăn, chỉ lộ mặt, cổ và vai. Tẩy trang mắt, môi rồi rửa mặt: soi da khi còn trang điểm hay kem là đọc sai từ đầu (cách làm sạch: bài Chăm sóc da mặt cơ bản).",
        "The client lies down under a towel and blanket, only face, neck and shoulders showing. Remove eye and lip make-up, then cleanse: analysing skin with make-up or cream on misreads it from the start (cleansing: see the basic facial lesson).",
        "Asiakas makaa pyyhkeen ja peiton alla, näkyvillä vain kasvot, kaula ja hartiat. Poista silmä- ja huulimeikki ja puhdista iho: meikin tai voiteen läpi arvioitu iho tulkitaan väärin alusta asti (puhdistus: peruskasvohoidon tunti)."
      ),
      l3(
        "Che mắt khách bằng bông, kéo đèn lúp lại gần, soi theo một thứ tự: trán (dầu, lỗ chân lông, nếp nhăn ngang), vùng chữ T (dầu, mụn đầu đen), má (đỏ, mạch máu nhỏ, đốm nâu, độ khô), hàm và cằm (mụn nhỏ, mụn ẩn), cổ.",
        "Cover the client's eyes with cotton pads, bring the magnifier lamp close and work in one order: forehead (oil, pores, horizontal lines), T-zone (oil, blackheads), cheeks (redness, small capillaries, brown spots, dryness), jaw and chin (small spots, closed comedones), neck.",
        "Peitä asiakkaan silmät pumpulilapuilla, tuo suurennuslamppu lähelle ja etene aina samassa järjestyksessä: otsa (rasva, huokoset, vaakajuonteet), T-alue (rasva, mustapäät), posket (punoitus, pienet verisuonet, ruskeat läiskät, kuivuus), leukalinja ja leuka (pienet näpyt, umpikomedot), kaula."
      ),
      l3(
        "Thử bằng tay sạch hoặc găng theo quy định của tiệm: giấy thấm dầu ấn lên trán, mũi, má (giấy trong lên là nhiều dầu); lướt nhẹ đầu ngón tay để cảm nhận da mịn, ráp hay căng; chỗ vừa chạm đã ửng đỏ thì ghi lại là da nhạy cảm.",
        "Test with clean hands or gloves, as your salon requires: press blotting paper on the forehead, nose and cheeks (where it turns translucent, there is more oil); glide a fingertip lightly to feel smooth, rough or tight skin; note any spot that flushes at a light touch as sensitive.",
        "Testaa puhtain käsin tai käsinein yrityksesi ohjeen mukaan: paina imupaperia otsalle, nenälle ja poskille (läpikuultava kohta = enemmän rasvaa); liu'uta sormenpäätä kevyesti tunnustellen, onko iho sileä, karhea vai kireä; kirjaa kevyestä kosketuksesta punoittava kohta herkäksi."
      ),
      l3(
        "Ghi lại loại da, tình trạng từng vùng, lời khách kể, việc đã quyết định không làm và lý do. Ghi điều mình thấy, không ghi tên bệnh; chỉ ghi khi khách đồng ý.",
        "Record the skin type, the condition of each zone, what the client told you, anything you decided not to do and why. Write what you saw, never the name of a disease; record only with the client's consent.",
        "Kirjaa ihotyyppi, kunkin alueen tila, asiakkaan kertomat asiat sekä se, mitä päätit jättää tekemättä ja miksi. Kirjaa näkemäsi, älä sairauden nimeä; kirjaa vain asiakkaan suostumuksella."
      ),
      l3(
        "Chọn liệu trình và giải thích: ví dụ da hỗn hợp hơi thiếu nước, vài mụn đầu đen ở mũi → làm sạch dịu, tẩy da chết nhẹ, mặt nạ hợp da, lấy nhân mụn chỉ khi đã được học và tiệm cho phép. Nói rõ sẽ làm gì, cảm giác ra sao và kết quả thật sự.",
        "Choose the treatment and explain it: e.g. combination skin, a little dehydrated, a few blackheads on the nose → gentle cleansing, mild exfoliation, a suitable mask, extraction only if trained and allowed. Say what you'll do, how it feels and the real result.",
        "Valitse hoito ja selitä se: esim. hieman kuivunut seka-iho ja muutama mustapää nenässä → hellävarainen puhdistus, mieto kuorinta, sopiva naamio, ekstraktio vain koulutettuna ja luvan kanssa. Kerro, mitä teet, miltä se tuntuu ja mikä on todellinen tulos."
      ),
      l3(
        "Kế hoạch tại nhà ngắn gọn: rửa mặt dịu nhẹ sáng tối, dưỡng ẩm hợp loại da, kem chống nắng mỗi sáng. Đặt lịch lần sau ngay tại quầy.",
        "A short home-care plan: gentle cleansing morning and evening, a moisturiser for the skin type, sunscreen every morning. Book the next visit right at the desk.",
        "Lyhyt kotihoito-ohjelma: hellävarainen puhdistus aamuin illoin, ihotyypille sopiva kosteusvoide, aurinkosuoja joka aamu. Varaa seuraava käynti heti tiskillä."
      ),
      l3(
        "Khách về: thay khăn, thay ga, lau giường và đèn lúp, rửa tay.",
        "After the client leaves: change the towels and linen, wipe the bed and the magnifier lamp, wash your hands.",
        "Asiakkaan lähdettyä: vaihda pyyhkeet ja liinat, pyyhi hoitopöytä ja suurennuslamppu, pese kädet."
      ),
    ],
    tips: [
      l3(
        "Soi da luôn trên da sạch và luôn theo cùng một thứ tự; nhờ vậy lần sau dễ so sánh và không bỏ sót.",
        "Always analyse clean skin and always in the same order; that makes it easy to compare next time and nothing gets missed.",
        "Arvioi aina puhdas iho ja aina samassa järjestyksessä; silloin vertailu seuraavalla kerralla on helppoa eikä mitään jää huomaamatta."
      ),
      l3(
        "Trong VaraaAi, ghi kết quả soi da vào ghi chú nội bộ trong hồ sơ khách (chỉ tiệm mới thấy) và đặt lịch hẹn kế tiếp ngay khi khách còn ở quầy.",
        "In VaraaAi, save the analysis in the client's internal notes (visible to the salon only) and book the next appointment while the client is still at the desk.",
        "Tallenna VaraaAi:ssa ihoanalyysi asiakkaan sisäisiin muistiinpanoihin (näkyvät vain yritykselle) ja varaa seuraava aika, kun asiakas on vielä tiskillä."
      ),
    ],
    quiz: [
      {
        q: l3("Vì sao phải làm sạch da trước khi soi?", "Why cleanse the skin before analysing it?", "Miksi iho puhdistetaan ennen arviointia?"),
        options: [
          l3("Để khách thấy thơm", "So the client smells nice", "Jotta asiakas tuoksuu hyvältä"),
          l3("Vì trang điểm và kem che mất da thật, làm đọc sai", "Because make-up and cream hide the real skin and lead to a wrong reading", "Koska meikki ja voide peittävät todellisen ihon ja johtavat väärään tulkintaan"),
          l3("Vì đèn lúp chỉ bật được khi da ướt", "Because the magnifier lamp only works on wet skin", "Koska suurennuslamppu toimii vain märällä iholla"),
        ],
        answer: 1,
        why: l3(
          "Soi da khi còn trang điểm hay kem là đọc sai ngay từ đầu.",
          "Analysing skin with make-up or cream on misreads it from the very start.",
          "Meikin tai voiteen läpi arvioitu iho tulkitaan väärin alusta asti."
        ),
      },
      {
        q: l3("Trước khi bật đèn lúp, việc đầu tiên là gì?", "Before switching on the magnifier lamp, what comes first?", "Mitä tehdään ensin ennen suurennuslampun sytyttämistä?"),
        options: [
          l3("Đặt bông che mắt khách", "Put cotton pads over the client's eyes", "Laita pumpulilaput asiakkaan silmille"),
          l3("Thoa mặt nạ", "Apply a mask", "Levitä naamio"),
          l3("Lấy nhân mụn", "Do the extractions", "Tee ekstraktiot"),
        ],
        answer: 0,
        why: l3("Đèn lúp rất sáng; che mắt cho khách dễ chịu và an toàn.", "The lamp is very bright; covering the eyes keeps the client comfortable and safe.", "Lamppu on hyvin kirkas; silmien peittäminen pitää asiakkaan mukavana ja turvassa."),
      },
      {
        q: l3("Ghi gì vào hồ sơ khách là đúng?", "What is right to write in the client's record?", "Mitä asiakastietoihin on oikein kirjata?"),
        options: [
          l3("Tên bệnh mà mình đoán", "The name of the disease you suspect", "Epäilemäsi sairauden nimi"),
          l3("Không ghi gì, cho nhanh", "Nothing, to save time", "Ei mitään, aikaa säästääkseen"),
          l3("Điều mình thấy, lời khách kể, việc không làm và lý do — khi khách đồng ý", "What you saw, what the client said, what you didn't do and why — with the client's consent", "Mitä näit, mitä asiakas kertoi, mitä jätit tekemättä ja miksi — asiakkaan suostumuksella"),
        ],
        answer: 2,
        why: l3("Người làm da không chẩn đoán; hồ sơ ghi điều quan sát được, và là thông tin riêng tư.", "Therapists don't diagnose; the record holds what was observed, and it is private information.", "Ihonhoitaja ei diagnosoi; kirjaus sisältää havainnot, ja se on luottamuksellista tietoa."),
      },
    ],
  },
  {
    slug: "spa-facial-hieu-dung",
    course: "p-spa",
    style: "theory",
    title: l3("Chăm sóc da mặt cơ bản: hiểu đúng để da sạch và khỏe", "A basic facial: understand it for clean, healthy skin", "Peruskasvohoito: ymmärrä se, niin iho on puhdas ja terve"),
    summary: l3(
      "Thứ tự một buổi chăm sóc da mặt và lý do của từng bước: làm sạch hai lần, tẩy da chết theo loại da (và tác hại của tẩy quá tay), khăn ấm và xông hơi, lấy nhân mụn an toàn với dụng cụ đã tiệt trùng, mặt nạ, massage, nước cân bằng, dưỡng ẩm, chống nắng, thử sản phẩm trên vùng da nhỏ, vệ sinh, và xử lý khi da phản ứng.",
      "The order of a facial and the reason for each step: double cleansing, exfoliation chosen by skin type (and the harm of over-exfoliating), warm towels and steam, safe extraction with sterilised tools, mask, massage, toner, moisturiser, sunscreen, patch-testing products, hygiene, and what to do if the skin reacts.",
      "Kasvohoidon järjestys ja kunkin vaiheen syy: kaksoispuhdistus, ihotyypin mukaan valittu kuorinta (ja liiallisen kuorinnan haitat), lämpimät pyyhkeet ja höyry, turvallinen ekstraktio steriloiduilla välineillä, naamio, hieronta, kasvovesi, kosteusvoide, aurinkosuoja, tuotteiden testaus pienelle ihoalueelle, hygienia ja toiminta ihoreaktiossa."
    ),
    video: video("spa-facial-hieu-dung", 278, "2026-11-19"),
    notice: l3(
      "Thời gian và cách dùng của mỗi sản phẩm luôn theo hướng dẫn của hãng. Lấy nhân mụn chỉ khi đã được đào tạo và khi quy định nơi bạn làm việc cho phép; quy định khác nhau theo từng nước. Phản ứng nặng như sưng mặt, sưng môi, khó thở: gọi 112 (hoặc số cấp cứu nơi bạn ở). Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Product times and use always follow the brand's instructions. Do extractions only if you are trained and local rules allow it; rules differ by country. A severe reaction such as a swollen face or lips or difficulty breathing: call 112 (or your local emergency number). This lesson is a training aid, not a licence.",
      "Tuotteiden vaikutusajat ja käyttö noudattavat aina valmistajan ohjeita. Tee ekstraktioita vain koulutettuna ja jos paikalliset määräykset sallivat; määräykset vaihtelevat maittain. Vakava reaktio, kuten kasvojen tai huulten turvotus tai hengitysvaikeus: soita 112 (tai paikalliseen hätänumeroon). Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    sources: [HELSINKI_HYGIENE],
    related: ["dich-vu", "khach-hang", "lich-hen"],
    steps: [
      l3(
        "Thứ tự cơ bản: làm sạch, tẩy da chết, làm ấm (khăn ấm hay xông hơi), lấy nhân mụn nếu cần, mặt nạ và massage (có tiệm massage trước mặt nạ, có tiệm sau), nước cân bằng, dưỡng ẩm, chống nắng nếu là ban ngày. Đi từ sạch, đến thông thoáng, rồi nuôi dưỡng và bảo vệ.",
        "The basic order: cleanse, exfoliate, warm (towels or steam), extractions if needed, mask and massage (some salons massage before the mask, some after), toner, moisturiser, sunscreen in the daytime. From clean, to clear, then nourish and protect.",
        "Perusjärjestys: puhdistus, kuorinta, lämmitys (pyyhkeet tai höyry), tarvittaessa ekstraktio, naamio ja hieronta (osa hieroo ennen naamiota, osa jälkeen), kasvovesi, kosteusvoide, päivällä aurinkosuoja. Puhtaasta selkeään, sitten ravitseminen ja suojaus."
      ),
      l3(
        "Khách có trang điểm thì làm sạch hai lần: tẩy trang (trang điểm, kem chống nắng), rồi sữa rửa mặt hợp loại da. Mắt và môi: đặt bông ướt vài giây cho mascara mềm, lau nhẹ, không chà, không để sản phẩm vào mắt.",
        "With make-up, cleanse twice: first remove make-up and sunscreen, then a cleanser for the skin type. Eyes and lips: hold a soaked pad for a few seconds to soften mascara, wipe gently, never rub, keep product out of the eyes.",
        "Meikatulle iholle tehdään kaksoispuhdistus: ensin meikin ja aurinkosuojan poisto, sitten ihotyypille sopiva puhdistusaine. Silmät ja huulet: pidä kostutettua lappua muutama sekunti, jotta ripsiväri pehmenee, pyyhi kevyesti, älä hankaa, äläkä päästä tuotetta silmiin."
      ),
      l3(
        "Tẩy da chết theo da: men enzyme dịu cho da nhạy cảm, da mỏng; axit nhẹ cho da dày, nhiều dầu; hạt phải thật mịn và chà thật nhẹ. Để đúng thời gian của hãng, không lâu hơn.",
        "Exfoliate by skin: a gentle enzyme for sensitive or thin skin; a mild acid for thicker, oily skin; any scrub must be very fine and used very lightly. Keep to the brand's time, never longer.",
        "Kuori ihon mukaan: mieto entsyymi herkälle tai ohuelle iholle; mieto happo paksummalle, rasvaiselle iholle; rakeiden on oltava hyvin hienoja ja käytön hyvin kevyttä. Noudata valmistajan aikaa, älä pidennä sitä."
      ),
      l3(
        "Tẩy quá tay, nhất là chồng lên axit hay retinoid khách dùng ở nhà, làm tổn thương hàng rào da: vài ngày sau đỏ, rát, châm chích, bong mảng, và da cần thời gian, có khi vài tuần, để hồi lại. Luôn hỏi trước khách đang bôi gì.",
        "Over-exfoliating, especially on top of acids or retinoids used at home, damages the skin barrier: a few days later redness, burning, stinging and peeling, and the skin needs time — sometimes weeks — to recover. Always ask what the client uses at home.",
        "Liiallinen kuorinta, etenkin kotona käytettyjen happojen tai retinoidien päälle, vaurioittaa ihon suojamuuria: muutaman päivän kuluttua punoitusta, kirvelyä, pistelyä ja hilseilyä, ja iho tarvitsee aikaa, joskus viikkoja, toipuakseen. Kysy aina, mitä asiakas käyttää kotona."
      ),
      l3(
        "Khăn ấm hay xông hơi để khách dễ chịu và da mềm hơn: khăn ấm, không nóng (thử trên cổ tay mình), máy xông đặt đủ xa, không xông lâu. Da rất nhạy cảm, đang đỏ, mạch máu nhỏ hiện rõ: bỏ qua, hoặc dùng khăn mát ẩm.",
        "Warm towels or steam are for comfort and softer skin: warm, not hot (test on your own wrist), the steamer far enough away, not for long. Very sensitive or red skin, or visible small capillaries: skip it, or use a cool damp towel.",
        "Lämpimät pyyhkeet tai höyry ovat mukavuutta ja ihon pehmentämistä varten: lämmin, ei kuuma (kokeile omaan ranteeseen), höyrystin riittävän kaukana, ei pitkään. Hyvin herkkä tai punoittava iho tai näkyvät pienet verisuonet: jätä väliin tai käytä viileää kosteaa pyyhettä."
      ),
      l3(
        "Lấy nhân mụn chỉ khi đã được đào tạo và quy định cho phép: luôn đeo găng, quấn khăn giấy quanh đầu ngón tay, ấn thật nhẹ hai bên; không dùng móng tay, không nặn mạnh, không ra thì để đó, làm ngắn.",
        "Extract only if trained and allowed: always gloves, tissue around the fingertips, very gentle pressure on both sides; never fingernails, never squeezing hard — if it doesn't come, leave it — and keep it brief.",
        "Ekstraktio vain koulutettuna ja luvan kanssa: aina käsineet, paperi sormenpäiden ympärillä, hyvin kevyt painallus molemmin puolin; ei kynsiä eikä kovaa puristamista — jos ei irtoa, jätä — ja pidä se lyhyenä."
      ),
      l3(
        "Dụng cụ nặn mụn và mọi thứ có thể làm trầy da phải được làm sạch, tiệt trùng sau mỗi khách và cất trong túi kín; hướng dẫn vệ sinh của thành phố Helsinki ghi rõ dụng cụ nặn mụn phải được tiệt trùng. Kim chích chỉ dùng một lần và chỉ khi quy định cho phép (xem bài Xử lý dụng cụ sau mỗi khách).",
        "Comedone extractors and anything that can break the skin must be cleaned, sterilised after every client and stored in sealed pouches; the City of Helsinki hygiene guidance states that blackhead extractors must be sterilised. Lancets are single-use and only where local rules allow (see the lesson on tools after every client).",
        "Komedonipuristimet ja kaikki ihon rikkovat välineet puhdistetaan, steriloidaan jokaisen asiakkaan jälkeen ja säilytetään suljetuissa pusseissa; Helsingin kaupungin hygieniaohjeen mukaan mustapääpuristimet on steriloitava. Lansetit ovat kertakäyttöisiä ja vain, jos paikalliset määräykset sallivat (katso tunti välineistä jokaisen asiakkaan jälkeen)."
      ),
      l3(
        "Mặt nạ theo da: đất sét cho da dầu, bít tắc; kem hay gel cho da khô, thiếu nước, nhạy cảm. Thoa bằng cọ, tránh mắt, lỗ mũi và môi; đúng thời gian của hãng. Rồi nước cân bằng, dưỡng ẩm, và kem chống nắng nếu là ban ngày.",
        "Mask by skin: clay for oily or congested skin; cream or gel for dry, dehydrated or sensitive skin. Apply with a brush, avoiding eyes, nostrils and lips; keep to the brand's time. Then toner, moisturiser, and sunscreen in the daytime.",
        "Naamio ihon mukaan: savi rasvaiselle tai tukkoiselle iholle; voide- tai geelinaamio kuivalle, kuivuneelle tai herkälle iholle. Levitä siveltimellä, vältä silmiä, sieraimia ja huulia; noudata valmistajan aikaa. Sitten kasvovesi, kosteusvoide ja päivällä aurinkosuoja."
      ),
      l3(
        "Sản phẩm mới, nhất là cho da nhạy cảm hay khách từng dị ứng: thử trước trên một vùng da nhỏ theo hướng dẫn của hãng. Thử không phải bảo đảm tuyệt đối (xem bài Dị ứng và hóa chất).",
        "New products, especially for sensitive skin or clients with allergies: test on a small area of skin first, as the brand says. A test is no guarantee (see the allergy and chemicals lesson).",
        "Uudet tuotteet, etenkin herkälle iholle tai allergisille asiakkaille: testaa ensin pienelle ihoalueelle valmistajan ohjeen mukaan. Testi ei ole tae (katso allergia- ja kemikaalitunti)."
      ),
      l3(
        "Vệ sinh: rửa tay trước mỗi khách; lấy kem bằng que sạch, không thò ngón tay vào hũ; cọ, bát, dụng cụ dùng một lần hoặc làm sạch và khử khuẩn sau mỗi khách; khăn, băng đô, ga thay mới cho từng khách. Da phản ứng: dừng sản phẩm, rửa nước mát, đắp khăn mát, không thoa thêm gì, ghi sản phẩm và số lô (xem bài Xử lý sự cố).",
        "Hygiene: wash hands before every client; take cream out with a clean spatula, never fingers in the jar; brushes, bowls and tools single-use or cleaned and disinfected after every client; fresh towels, headband and linen for each client. If the skin reacts: stop the product, rinse with cool water, cool compress, apply nothing else, note the product and batch (see the incidents lesson).",
        "Hygienia: pese kädet ennen jokaista asiakasta; ota voide puhtaalla lastalla, älä koskaan sormin purkista; siveltimet, kulhot ja välineet kertakäyttöisiä tai puhdistetaan ja desinfioidaan jokaisen asiakkaan jälkeen; puhtaat pyyhkeet, otsapanta ja liinat jokaiselle asiakkaalle. Jos iho reagoi: lopeta tuotteen käyttö, huuhtele viileällä vedellä, viileä kääre, älä levitä muuta, kirjaa tuote ja eränumero (katso tunti häiriötilanteista)."
      ),
    ],
    tips: [
      l3(
        "Hũ kem dùng chung cho nhiều khách: chỉ một lần thò ngón tay là cả hũ nhiễm bẩn. Luôn để sẵn que sạch trên xe đẩy.",
        "A jar shared by many clients is contaminated by a single finger. Always keep clean spatulas ready on the trolley.",
        "Monen asiakkaan yhteinen purkki saastuu yhdestäkin sormesta. Pidä aina puhtaita lastoja valmiina hoitovaunulla."
      ),
      l3(
        "Trong VaraaAi, ghi vào ghi chú nội bộ của khách những sản phẩm đã dùng, phản ứng nếu có và số lô, để lần sau tránh được.",
        "In VaraaAi, note in the client's internal notes which products you used, any reaction and the batch number, so it can be avoided next time.",
        "Merkitse VaraaAi:ssa asiakkaan sisäisiin muistiinpanoihin käytetyt tuotteet, mahdollinen reaktio ja eränumero, jotta se voidaan välttää ensi kerralla."
      ),
    ],
    quiz: [
      {
        q: l3("Khách có trang điểm. Làm sạch thế nào là đúng?", "The client wears make-up. How do you cleanse?", "Asiakkaalla on meikki. Miten puhdistat?"),
        options: [
          l3("Tẩy trang trước, rồi rửa mặt lần hai bằng sữa rửa mặt hợp da", "Remove make-up first, then cleanse again with a cleanser for the skin type", "Poista ensin meikki ja puhdista sitten uudelleen ihotyypille sopivalla aineella"),
          l3("Chỉ cần tẩy da chết thật kỹ", "Just exfoliate thoroughly", "Riittää kuoria perusteellisesti"),
          l3("Đắp mặt nạ đất sét để hút sạch trang điểm", "Use a clay mask to draw out the make-up", "Käytä savinaamiota meikin poistamiseen"),
        ],
        answer: 0,
        why: l3("Lần đầu lấy đi trang điểm và kem chống nắng; lần hai làm sạch chính làn da.", "The first cleanse removes make-up and sunscreen; the second cleans the skin itself.", "Ensimmäinen puhdistus poistaa meikin ja aurinkosuojan; toinen puhdistaa itse ihon."),
      },
      {
        q: l3("Khách có da đỏ, mạch máu nhỏ hiện rõ. Bước xông hơi thì sao?", "The client has red skin with visible small capillaries. What about steam?", "Asiakkaan iho punoittaa ja pienet verisuonet näkyvät. Entä höyry?"),
        options: [
          l3("Xông thật lâu cho da mềm", "Steam for a long time to soften the skin", "Höyrytä pitkään ihon pehmentämiseksi"),
          l3("Đặt máy thật gần mặt", "Put the steamer very close to the face", "Tuo höyrystin aivan kasvojen lähelle"),
          l3("Bỏ qua, hoặc chỉ dùng khăn mát, ẩm", "Skip it, or use only a cool damp towel", "Jätä väliin tai käytä vain viileää kosteaa pyyhettä"),
        ],
        answer: 2,
        why: l3("Hơi nóng làm da nhạy cảm, đang đỏ càng đỏ thêm.", "Heat makes sensitive, red skin redder.", "Lämpö lisää herkän, punoittavan ihon punoitusta."),
      },
      {
        q: l3("Điều nào đúng về dụng cụ nặn mụn bằng kim loại?", "Which is right about a metal comedone extractor?", "Mikä pitää paikkansa metallisesta komedonipuristimesta?"),
        options: [
          l3("Lau cồn là đủ", "Wiping it with alcohol is enough", "Alkoholilla pyyhkiminen riittää"),
          l3("Làm sạch và tiệt trùng sau mỗi khách, cất trong túi kín", "Clean and sterilise it after every client and store it in a sealed pouch", "Puhdista ja steriloi jokaisen asiakkaan jälkeen ja säilytä suljetussa pussissa"),
          l3("Dùng chung cho cả ngày rồi rửa một lần", "Use it all day and wash it once", "Käytä koko päivä ja pese kerran"),
        ],
        answer: 1,
        why: l3("Dụng cụ có thể làm trầy da phải được tiệt trùng; hướng dẫn của Helsinki ghi rõ dụng cụ nặn mụn phải được tiệt trùng.", "Tools that can break the skin must be sterilised; the Helsinki guidance states that blackhead extractors must be sterilised.", "Ihon rikkovat välineet on steriloitava; Helsingin ohjeen mukaan mustapääpuristimet on steriloitava."),
      },
    ],
  },
  {
    slug: "spa-facial",
    course: "p-spa",
    style: "practice",
    title: l3("Chăm sóc da mặt cơ bản: thực hành từng bước", "A basic facial: step by step", "Peruskasvohoito: vaihe vaiheelta"),
    summary: l3(
      "Một buổi chăm sóc da mặt cơ bản từ đầu đến cuối: chuẩn bị giường và dụng cụ, mời khách nằm, rửa tay, tẩy trang mắt và môi, rửa mặt lần hai, soi da nhanh, tẩy da chết, khăn ấm hoặc xông hơi, lấy nhân mụn (chỉ khi đã được đào tạo), mặt nạ, nước cân bằng, dưỡng ẩm, chống nắng, lời dặn, đặt lịch và dọn dẹp.",
      "A basic facial from start to finish: preparing the bed and tools, settling the client, washing hands, removing eye and lip make-up, a second cleanse, a quick skin check, exfoliation, a warm towel or steam, extractions (only if trained), mask, toner, moisturiser, sunscreen, aftercare advice, rebooking and cleaning up.",
      "Peruskasvohoito alusta loppuun: hoitopöydän ja välineiden valmistelu, asiakkaan asettuminen, käsienpesu, silmä- ja huulimeikin poisto, toinen puhdistus, nopea ihon arvio, kuorinta, lämmin pyyhe tai höyry, ekstraktio (vain koulutettuna), naamio, kasvovesi, kosteusvoide, aurinkosuoja, jälkihoito-ohjeet, uusi varaus ja siivous."
    ),
    video: video("spa-facial", 268, "2026-11-19"),
    notice: l3(
      "Thời gian của từng sản phẩm luôn theo hướng dẫn của hãng. Lấy nhân mụn chỉ khi đã được đào tạo và khi quy định nơi bạn làm việc cho phép; dụng cụ nặn mụn phải được tiệt trùng. Quy định khác nhau theo từng nước. Bài học là tài liệu đào tạo, không phải chứng chỉ hành nghề.",
      "Product times always follow the brand's instructions. Do extractions only if you are trained and local rules allow it; extractors must be sterilised. Rules differ by country. This lesson is a training aid, not a licence.",
      "Tuotteiden vaikutusajat noudattavat aina valmistajan ohjeita. Tee ekstraktioita vain koulutettuna ja jos paikalliset määräykset sallivat; puristimet on steriloitava. Määräykset vaihtelevat maittain. Tunti on koulutusmateriaalia, ei ammattipätevyys."
    ),
    sources: [HELSINKI_HYGIENE],
    related: ["lich-hen", "khach-hang", "dich-vu"],
    steps: [
      l3(
        "Chuẩn bị: lau và khử khuẩn mặt giường; ga, khăn, băng đô sạch cho khách mới; xếp sẵn bông, khăn, bát, cọ, que lấy kem và sản phẩm đã chọn sau khi soi da.",
        "Prepare: wipe and disinfect the bed; fresh linen, towels and headband for the new client; lay out cotton pads, towels, bowls, brushes, spatulas and the products chosen after the skin analysis.",
        "Valmistelu: pyyhi ja desinfioi hoitopöytä; puhtaat liinat, pyyhkeet ja otsapanta uudelle asiakkaalle; asettele valmiiksi pumpulilaput, pyyhkeet, kulhot, siveltimet, lastat ja ihoanalyysin perusteella valitut tuotteet."
      ),
      l3(
        "Khách nằm ngửa, đắp khăn và chăn, chỉ lộ mặt, cổ và vai; đeo băng đô; hỏi khách có ấm, gối có vừa không. Rửa tay bằng xà phòng và lau khô (xem bài Rửa tay và găng tay).",
        "The client lies on her back under a towel and blanket, only face, neck and shoulders showing; headband on; ask whether she is warm and comfortable. Wash and dry your hands (see the hand-washing and gloves lesson).",
        "Asiakas makaa selällään pyyhkeen ja peiton alla, näkyvillä vain kasvot, kaula ja hartiat; otsapanta päähän; kysy, onko lämmin ja mukava. Pese ja kuivaa kädet (katso käsienpesun ja käsineiden tunti)."
      ),
      l3(
        "Tẩy trang: đặt bông thấm nước tẩy trang lên mắt đang nhắm vài giây cho mascara mềm, lau nhẹ xuống, không chà, không kéo da, không để sản phẩm vào mắt; lau môi thật nhẹ; rồi tẩy trang cả mặt.",
        "Make-up removal: hold a soaked pad on the closed eye for a few seconds to soften the mascara, wipe gently downwards, never rub or pull, keep product out of the eye; wipe the lips gently; then the whole face.",
        "Meikinpoisto: pidä kostutettua lappua suljetulla silmällä muutama sekunti, jotta ripsiväri pehmenee, pyyhi kevyesti alaspäin, älä hankaa tai venytä, älä päästä tuotetta silmään; pyyhi huulet kevyesti; sitten koko kasvot."
      ),
      l3(
        "Rửa mặt lần hai: sữa rửa mặt xoa ấm trong tay, thoa bằng vòng tròn nhỏ, nhẹ, từ cằm lên má rồi trán, tránh mắt; lau sạch bằng mút ấm. Soi da nhanh dưới đèn lúp và so với phiếu tư vấn; thấy điều đáng lo thì dừng (xem bài Khi nào không làm cho khách).",
        "Second cleanse: warm the cleanser in your hands and apply in small, gentle circles from the chin to the cheeks and forehead, avoiding the eyes; remove with warm sponges. Check the skin quickly under the magnifier lamp against the consultation card; if something worries you, stop (see the lesson on when not to treat).",
        "Toinen puhdistus: lämmitä puhdistusaine käsissä ja levitä pienin, kevein ympyröin leuasta poskille ja otsalle silmiä välttäen; poista lämpimillä sienillä. Arvioi iho nopeasti suurennuslampun alla ja vertaa asiakaskorttiin; jos jokin huolestuttaa, keskeytä (katso tunti siitä, milloin ei hoideta)."
      ),
      l3(
        "Tẩy da chết: che mắt bằng bông, dùng cọ thoa lớp mỏng, tránh mắt và môi; đúng thời gian của hãng và luôn quan sát; khách rát hay da đỏ nhanh thì lau đi ngay; lau sạch bằng mút ấm.",
        "Exfoliation: eye pads on, a thin layer applied with a brush, avoiding eyes and lips; keep to the brand's time and keep watching; if it stings or the skin reddens quickly, remove it at once; rinse with warm sponges.",
        "Kuorinta: pumpulilaput silmille, ohut kerros siveltimellä silmiä ja huulia välttäen; noudata valmistajan aikaa ja tarkkaile koko ajan; jos kirvelee tai iho punoittaa nopeasti, poista heti; puhdista lämpimillä sienillä."
      ),
      l3(
        "Làm ấm: thử khăn trên cổ tay mình; khăn ấm đắp lên mặt, chừa mũi và miệng, trong chốc lát; hoặc xông hơi với máy đặt đủ xa, thời gian ngắn. Da nhạy cảm hay đang đỏ: bỏ qua.",
        "Warmth: test the towel on your own wrist; lay the warm towel on the face, nose and mouth free, for a short while; or steam with the steamer far enough away, briefly. Sensitive or red skin: skip it.",
        "Lämmitys: kokeile pyyhettä omaan ranteeseen; aseta lämmin pyyhe kasvoille nenä ja suu vapaana hetkeksi; tai höyry lyhyesti, höyrystin riittävän kaukana. Herkkä tai punoittava iho: jätä väliin."
      ),
      l3(
        "Lấy nhân mụn chỉ khi đã được đào tạo và tiệm cho phép: đeo găng, quấn khăn giấy quanh đầu ngón tay, ấn thật nhẹ hai bên; không ra thì để đó; không móng tay, không nặn mạnh, làm ngắn. Dụng cụ phải đã tiệt trùng, lấy từ túi kín. Chưa được học: bỏ qua và ghi vào hồ sơ.",
        "Extractions only if you are trained and the salon allows it: gloves, tissue around the fingertips, very gentle pressure on both sides; if it doesn't come, leave it; never nails, never hard squeezing, keep it brief. Tools must be sterilised and taken from a sealed pouch. Not trained: skip it and note it in the record.",
        "Ekstraktio vain koulutettuna ja yrityksen luvalla: käsineet, paperi sormenpäiden ympärillä, hyvin kevyt painallus molemmin puolin; jos ei irtoa, jätä; ei kynsiä, ei kovaa puristusta, lyhyesti. Välineiden on oltava steriloituja ja otettu suljetusta pussista. Ei koulutusta: jätä väliin ja kirjaa se."
      ),
      l3(
        "Mặt nạ hợp với da, thoa đều bằng cọ từ cổ lên cằm, má, mũi, trán; chừa mắt, lỗ mũi và môi; đúng thời gian của hãng. Gỡ bằng mút ấm, nhẹ từng vùng, kiểm tra chân tóc, dưới cằm, cánh mũi.",
        "A mask that suits the skin, brushed on evenly from the neck to the chin, cheeks, nose and forehead; leave the eyes, nostrils and lips clear; keep to the brand's time. Remove gently with warm sponges, zone by zone, checking the hairline, under the chin and beside the nose.",
        "Iholle sopiva naamio levitetään tasaisesti siveltimellä kaulalta leualle, poskille, nenälle ja otsalle; silmät, sieraimet ja huulet jätetään vapaiksi; valmistajan aika. Poista lämpimillä sienillä hellästi alue kerrallaan ja tarkista hiusraja, leuan alus ja nenän sivut."
      ),
      l3(
        "Nước cân bằng lau nhẹ bằng bông; lấy kem bằng que sạch ra mu bàn tay, không thò tay vào hũ; thoa bằng đường vuốt nhẹ hướng lên và ra ngoài; ban ngày thì kem chống nắng ở bước cuối.",
        "Toner wiped on gently with a cotton pad; take cream out with a clean spatula onto the back of your hand, never fingers in the jar; apply with light strokes upwards and outwards; in the daytime, sunscreen last.",
        "Kasvovesi kevyesti pumpulilapulla; ota voide puhtaalla lastalla kämmenselälle, ei koskaan sormin purkista; levitä kevein sivelyin ylös- ja ulospäin; päivällä viimeiseksi aurinkosuoja."
      ),
      l3(
        "Mời khách ngồi dậy từ từ; dặn vài ngày không tẩy da chết ở nhà, tránh nắng, chống nắng mỗi sáng, da đỏ rát kéo dài hay ngứa thì báo tiệm; đặt lịch lần sau. Dọn dẹp: đeo găng, khăn và ga vào giỏ giặt có nắp, đồ dùng một lần vào thùng rác có nắp, cọ và bát rửa rồi khử khuẩn, dụng cụ nặn mụn làm sạch và tiệt trùng (xem bài Xử lý dụng cụ sau mỗi khách).",
        "Help the client sit up slowly; advise no exfoliating at home for a few days, avoiding the sun, sunscreen every morning, and to contact the salon if redness, burning or itching lasts; book the next visit. Clean-up: gloves on, towels and linen into a lidded laundry hamper, disposables into a lidded bin, brushes and bowls washed and disinfected, extractors cleaned and sterilised (see the lesson on tools after every client).",
        "Auta asiakas istumaan hitaasti; neuvo välttämään kotikuorintaa muutaman päivän ajan ja aurinkoa, käyttämään aurinkosuojaa joka aamu ja ottamaan yhteyttä, jos punoitus, kirvely tai kutina jatkuu; varaa seuraava käynti. Siivous: käsineet käteen, pyyhkeet ja liinat kannelliseen pyykkikoriin, kertakäyttötuotteet kannelliseen roska-astiaan, siveltimet ja kulhot pestään ja desinfioidaan, puristimet puhdistetaan ja steriloidaan (katso tunti välineistä jokaisen asiakkaan jälkeen)."
      ),
    ],
    tips: [
      l3(
        "Xếp đủ mọi thứ lên xe đẩy trước khi khách nằm, theo đúng thứ tự sẽ dùng: khách không phải nằm chờ, và tay bạn không phải chạm vào tủ, ngăn kéo giữa chừng.",
        "Lay everything out on the trolley before the client lies down, in the order you'll use it: the client never waits, and your hands don't touch cupboards or drawers mid-treatment.",
        "Asettele kaikki hoitovaunulle ennen kuin asiakas käy makuulle, käyttöjärjestyksessä: asiakas ei joudu odottamaan, eivätkä kätesi koske kaappeihin tai laatikoihin kesken hoidon."
      ),
      l3(
        "Trong VaraaAi, đặt lịch lần sau khi khách còn ở quầy và ghi sản phẩm đã dùng vào ghi chú nội bộ của khách.",
        "In VaraaAi, book the next visit while the client is still at the desk and note the products used in the client's internal notes.",
        "Varaa VaraaAi:ssa seuraava käynti asiakkaan ollessa vielä tiskillä ja kirjaa käytetyt tuotteet asiakkaan sisäisiin muistiinpanoihin."
      ),
    ],
    quiz: [
      {
        q: l3("Tẩy trang mắt thế nào là đúng?", "How do you remove eye make-up correctly?", "Miten silmämeikki poistetaan oikein?"),
        options: [
          l3("Chà mạnh qua lại cho nhanh sạch", "Rub hard back and forth to get it off fast", "Hankaa voimakkaasti edestakaisin, niin se lähtee nopeasti"),
          l3("Đặt bông ướt lên mắt nhắm vài giây, rồi lau nhẹ, không chà, không để sản phẩm vào mắt", "Hold a soaked pad on the closed eye for a few seconds, then wipe gently, never rub, keep product out of the eye", "Pidä kostutettua lappua suljetulla silmällä muutama sekunti ja pyyhi sitten kevyesti hankaamatta, tuotetta silmään päästämättä"),
          l3("Nhỏ nước tẩy trang thẳng vào mắt", "Drip remover straight into the eye", "Tiputa puhdistusainetta suoraan silmään"),
        ],
        answer: 1,
        why: l3("Da quanh mắt rất mỏng; để sản phẩm làm mềm mascara rồi lau nhẹ.", "The skin around the eyes is very thin; let the product soften the mascara, then wipe gently.", "Silmänympärysiho on hyvin ohutta; anna tuotteen pehmentää ripsiväri ja pyyhi sitten kevyesti."),
      },
      {
        q: l3("Bạn chưa được đào tạo lấy nhân mụn, mà khách có vài mụn đầu đen. Làm gì?", "You are not trained in extractions and the client has a few blackheads. What do you do?", "Sinulla ei ole ekstraktiokoulutusta, ja asiakkaalla on muutama mustapää. Mitä teet?"),
        options: [
          l3("Bỏ qua bước này và ghi vào hồ sơ để người có chuyên môn làm", "Skip this step and note it so a trained colleague can do it", "Jätä vaihe väliin ja kirjaa se, jotta koulutettu kollega voi tehdä sen"),
          l3("Nặn bằng móng tay cho nhanh", "Squeeze them out with your fingernails", "Purista ne kynsillä"),
          l3("Nặn mạnh đến khi ra hết", "Squeeze hard until everything is out", "Purista kovaa, kunnes kaikki irtoaa"),
        ],
        answer: 0,
        why: l3("Lấy nhân mụn sai cách gây tổn thương và để lại vết; chỉ người đã được đào tạo mới làm.", "Wrong extraction damages the skin and can leave marks; only trained people do it.", "Väärin tehty ekstraktio vaurioittaa ihoa ja voi jättää jälkiä; sen tekevät vain koulutetut."),
      },
      {
        q: l3("Lấy kem dưỡng ra khỏi hũ thế nào?", "How do you take moisturiser out of a jar?", "Miten kosteusvoide otetaan purkista?"),
        options: [
          l3("Dùng ngón tay sạch là được", "A clean finger is fine", "Puhdas sormi riittää"),
          l3("Đổ thẳng lên mặt khách", "Pour it straight onto the client's face", "Kaada suoraan asiakkaan kasvoille"),
          l3("Dùng que sạch, đặt kem lên mu bàn tay", "Use a clean spatula and put the cream on the back of your hand", "Käytä puhdasta lastaa ja ota voide kämmenselälle"),
        ],
        answer: 2,
        why: l3("Thò tay vào hũ làm cả hũ nhiễm bẩn cho những khách sau.", "Fingers in the jar contaminate it for every client after.", "Sormet purkissa saastuttavat sen kaikille seuraaville asiakkaille."),
      },
    ],
  },
  soon("spa-massage-mat", "p-spa", ["Massage mặt", "Facial massage", "Kasvohieronta"], [
    "Các động tác vuốt, miết, nhấn huyệt và hướng đi tay nâng cơ.",
    "Effleurage, kneading and pressure points, and the lifting direction of every stroke.",
    "Sivelyt, hieronta ja painelupisteet sekä kohottava liikesuunta.",
  ]),
  soon("spa-massage-body", "p-spa", ["Massage body kiểu Thuỵ Điển cơ bản", "Swedish body massage basics", "Klassisen hieronnan perusteet"], [
    "Tư thế đứng, lực tay, trình tự lưng – vai – chân và chống chỉ định.",
    "Posture, pressure, the back–shoulders–legs sequence and contraindications.",
    "Työasento, paine, selkä–hartiat–jalat-järjestys ja vasta-aiheet.",
  ]),
  soon("spa-waxing", "p-spa", ["Waxing", "Waxing", "Vahaus"], [
    "Nhiệt độ sáp, hướng thoa và giật, không nhúng que hai lần, chăm sóc sau wax.",
    "Wax temperature, direction of application and removal, no double-dipping, and aftercare.",
    "Vahan lämpötila, levitys- ja vetosuunta, ei kaksoiskastamista ja jälkihoito.",
  ]),
  soon("spa-tay-chan", "p-spa", ["Chăm sóc tay chân kiểu spa", "Spa hand and foot treatments", "Spa-käsi- ja jalkahoidot"], [
    "Tẩy da chết, ủ paraffin, massage tay chân và vệ sinh bồn ngâm.",
    "Scrub, paraffin, hand and foot massage, and keeping the foot basin hygienic.",
    "Kuorinta, parafiini, käsi- ja jalkahieronta sekä jalkakylpyaltaan hygienia.",
  ]),
];

/** Trades the owner set aside for later (2026-11-16: hygiene, nails and lashes first). Their courses
 * and planned lessons stay in this file but are not shown; remove an id here to bring a trade back. */
const LATER = new Set<string>([]);

export const CRAFT_COURSES = ALL_COURSES.filter((c) => !LATER.has(c.id));
export const CRAFT_LESSONS = ALL_LESSONS.filter((l) => !LATER.has(l.course));

/** Software lessons shown at the end of the craft track, in this order
 * (only those that have a video are shown). */
export const CRAFT_BRIDGE = ["dang-ky-salon", "dich-vu", "bang-gia", "lich-hen", "khach-hang", "thanh-toan-hoa-don"];
