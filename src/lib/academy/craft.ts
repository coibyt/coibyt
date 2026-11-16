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
  soon("khi-nao-khong-lam", "p-safety", ["Khi nào không làm cho khách", "When not to treat a customer", "Milloin asiakasta ei hoideta"], [
    "Nhận biết dấu hiệu bệnh ở móng, da, mắt và da đầu; cách từ chối lịch sự và khuyên khách đi khám.",
    "Spotting signs of nail, skin, eye and scalp conditions; how to decline politely and refer the customer to a doctor.",
    "Kynsien, ihon, silmien ja päänahan sairauksien merkit; miten kieltäydytään kohteliaasti ja ohjataan lääkäriin.",
  ]),
  soon("xu-ly-su-co", "p-safety", ["Xử lý sự cố: chảy máu, dị ứng, bỏng", "Incidents: bleeding, allergic reactions, burns", "Vahinkotilanteet: verenvuoto, allergiset reaktiot, palovammat"], [
    "Làm gì ngay trong phút đầu tiên, ghi lại sự cố và khi nào phải gọi cấp cứu.",
    "What to do in the first minute, how to record the incident, and when to call for emergency help.",
    "Mitä tehdään ensimmäisen minuutin aikana, miten tapahtuma kirjataan ja milloin soitetaan hätänumeroon.",
  ]),
  soon("ve-sinh-tiem", "p-safety", ["Vệ sinh tiệm hằng ngày và kế hoạch tự kiểm soát", "Daily salon cleaning and the in-house control plan", "Liikkeen päivittäinen siivous ja omavalvontasuunnitelma"], [
    "Lịch lau dọn, giặt khăn, thông gió và những gì cơ quan y tế kiểm tra.",
    "A cleaning schedule, laundry, ventilation, and what health inspectors look at.",
    "Siivousaikataulu, pyykki, ilmanvaihto ja mitä terveystarkastaja katsoo.",
  ]),

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
  soon("builder-gel", "p-nail", ["Builder gel (BIAB) trên móng thật", "Builder gel (BIAB) on natural nails", "Rakennegeeli (BIAB) omalle kynnelle"], [
    "Lớp trượt, tạo điểm apex, tự cân bằng và dũa hoàn thiện.",
    "Slip layer, building the apex, self-levelling and finish filing.",
    "Liukukerros, apexin rakentaminen, itsetasoittuminen ja viimeistelyviilaus.",
  ]),
  soon("noi-mong-form", "p-nail", ["Nối móng builder gel bằng form", "Builder gel extensions on forms", "Rakennegeelipidennykset muotilla"], [
    "Đặt form khít, dựng khung móng, tạo độ cong và dũa form.",
    "Fitting the form, building the structure, the C-curve and shaping.",
    "Muotin asettaminen, rakenteen teko, C-kaari ja muotoilu.",
  ]),
  soon("dap-bot-acrylic", "p-nail", ["Đắp bột acrylic cơ bản", "Acrylic basics", "Akryylin perusteet"], [
    "Tỷ lệ bột – nước, ba viên bột, ép và vuốt, an toàn hoá chất và hút bụi.",
    "Liquid-to-powder ratio, the three-bead method, pressing and smoothing, chemical safety and dust extraction.",
    "Nesteen ja jauheen suhde, kolmen helmen tekniikka, painelu ja tasoitus, kemikaaliturvallisuus ja pölynpoisto.",
  ]),
  soon("fill-mong", "p-nail", ["Dặm lại (fill) gel và bột", "Infills for gel and acrylic", "Geelin ja akryylin huolto"], [
    "Hạ lớp cũ, xử lý chỗ hở, cân lại apex sau 3 tuần.",
    "Thinning the old product, fixing lifting and rebalancing the apex after three weeks.",
    "Vanhan materiaalin ohennus, irtoamien korjaus ja apexin tasapainotus kolmen viikon jälkeen.",
  ]),
  soon("dua-form-mong", "p-nail", ["Dũa form: vuông, tròn, hạnh nhân, coffin", "Shapes: square, round, almond, coffin", "Muodot: neliö, pyöreä, manteli, coffin"], [
    "Các đường dũa chuẩn cho từng form và cách kiểm tra đối xứng.",
    "The filing lines for each shape and how to check symmetry.",
    "Viilauslinjat jokaiselle muodolle ja symmetrian tarkistus.",
  ]),
  soon("french-ombre", "p-nail", ["French và ombré", "French and ombré", "Ranskalainen ja ombre"], [
    "Đường cười sắc nét, baby boomer và chuyển màu mịn.",
    "A crisp smile line, baby boomer and smooth colour fades.",
    "Terävä hymylinja, baby boomer ja tasainen liukuväri.",
  ]),
  soon("cham-soc-mong-co-ban", "p-nail", ["Chăm sóc móng tay và móng chân cơ bản", "Basic manicure and pedicure", "Perusmanikyyri ja -pedikyyri"], [
    "Quy trình manicure và pedicure cổ điển, từ ngâm đến sơn thường.",
    "The classic manicure and pedicure routine, from soak to regular polish.",
    "Klassinen manikyyri ja pedikyyri liotuksesta tavalliseen lakkaan.",
  ]),

  /* ================= lashes ================= */
  soon("mi-chuan-bi", "p-lash", ["Chuẩn bị, tư vấn và thử keo", "Preparation, consultation and glue test", "Valmistelu, konsultaatio ja liimatesti"], [
    "Hỏi tiền sử dị ứng, thử phản ứng, dán miếng lót, làm sạch mi và sắp bàn làm việc.",
    "Allergy history, patch test, eye pads, cleansing the lashes and setting up your station.",
    "Allergiahistoria, ihotesti, silmälaput, ripsien puhdistus ja työpisteen valmistelu.",
  ]),
  soon("mi-classic", "p-lash", ["Nối mi classic 1:1", "Classic 1:1 lashes", "Klassiset 1:1-ripset"], [
    "Tách một sợi mi thật, lấy keo, gắn cách mí 0,5–1 mm và kiểm tra dính chùm.",
    "Isolating one natural lash, picking up glue, placing 0.5–1 mm from the lid and checking for stickies.",
    "Yhden luomuripsen eristys, liiman otto, kiinnitys 0,5–1 mm luomesta ja tarttumien tarkistus.",
  ]),
  soon("mi-volume", "p-lash", ["Nối mi volume: tạo fan 2D–6D", "Volume lashes: making 2D–6D fans", "Volyymiripset: 2D–6D-viuhkat"], [
    "Các cách tạo fan, chân fan nhỏ gọn, lượng keo và trọng lượng an toàn cho mi thật.",
    "Ways to make fans, narrow bases, glue amount and a safe weight for the natural lash.",
    "Viuhkan tekotavat, kapea kanta, liiman määrä ja luomuripselle turvallinen paino.",
  ]),
  soon("mi-hybrid", "p-lash", ["Nối mi hybrid", "Hybrid lashes", "Hybridiripset"], [
    "Phối classic và volume để có độ dày và độ tơi tự nhiên.",
    "Mixing classic and volume for natural density and texture.",
    "Klassisten ja volyymiripsien yhdistäminen luonnolliseen tuuheuteen.",
  ]),
  soon("mi-mapping", "p-lash", ["Lash mapping: natural, doll, cat, fox", "Lash mapping: natural, doll, cat, fox", "Ripsikartoitus: natural, doll, cat, fox"], [
    "Chọn kiểu theo dáng mắt, chia vùng và chọn độ dài, độ cong.",
    "Choosing a style for the eye shape, zoning, and picking lengths and curls.",
    "Tyylin valinta silmän muodon mukaan, vyöhykkeet sekä pituudet ja kaarevuudet.",
  ]),
  soon("mi-mega-wispy", "p-lash", ["Mega volume, wispy và wet look", "Mega volume, wispy and wet look", "Megavolyymi, wispy ja wet look"], [
    "Các kiểu mi đang được ưa chuộng và cách làm an toàn cho mi thật.",
    "The styles customers ask for now, done safely for the natural lashes.",
    "Suosituimmat tyylit luomuripsille turvallisesti tehtyinä.",
  ]),
  soon("mi-dam-thao", "p-lash", ["Dặm mi và tháo mi", "Refills and removal", "Huolto ja poisto"], [
    "Gỡ sợi mọc dài, dặm lại sau 2–3 tuần và tháo mi bằng kem tháo.",
    "Removing grown-out extensions, refilling after 2–3 weeks, and removal with cream remover.",
    "Ulos kasvaneiden pidennysten poisto, huolto 2–3 viikon välein ja poisto voidemaisella poistoaineella.",
  ]),
  soon("lash-lift", "p-lash", ["Uốn mi (lash lift) và nhuộm mi", "Lash lift and tint", "Ripsien kestotaivutus ja värjäys"], [
    "Chọn khuôn, thời gian thuốc theo loại mi, thử phản ứng trước khi nhuộm.",
    "Choosing the shield, timing by lash type, and patch testing before tinting.",
    "Muotin valinta, vaikutusajat ripsityypin mukaan ja ihotesti ennen värjäystä.",
  ]),

  /* ================= hair ================= */
  soon("toc-tu-van-chia-vung", "p-hair", ["Tư vấn, gội và chia vùng tóc", "Consultation, shampoo and sectioning", "Konsultaatio, pesu ja jaottelu"], [
    "Đọc dáng mặt và chất tóc, gội đúng cách, chia bảy vùng tóc chuẩn.",
    "Reading face shape and hair type, a proper shampoo, and the standard seven sections.",
    "Kasvojen muodon ja hiuslaadun arviointi, oikea pesu ja seitsemän perusjakoa.",
  ]),
  soon("cat-nam-co-ban", "p-hair", ["Cắt tóc nam cơ bản: kéo trên lược và tông đơ", "Men's basics: scissor over comb and clippers", "Miesten perusleikkaus: sakset kamman päällä ja kone"], [
    "Cầm kéo, cầm lược, đi tông đơ theo cữ và nối các vùng.",
    "Holding scissors and comb, working with clipper guards and blending the zones.",
    "Saksi- ja kampaote, koneen kammat ja vyöhykkeiden häivytys.",
  ]),
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
  soon("spa-soi-da", "p-spa", ["Soi da và tư vấn", "Skin analysis and consultation", "Ihoanalyysi ja konsultaatio"], [
    "Nhận biết loại da, tình trạng da, chống chỉ định và ghi phiếu khách.",
    "Recognising skin types and conditions, contraindications and the customer record.",
    "Ihotyypit ja ihon tila, vasta-aiheet ja asiakaskortti.",
  ]),
  soon("spa-facial", "p-spa", ["Chăm sóc da mặt cơ bản", "A basic facial", "Peruskasvohoito"], [
    "Tẩy trang, rửa mặt, tẩy da chết, xông, mặt nạ và dưỡng — theo đúng thứ tự.",
    "Cleansing, exfoliation, steam, mask and care — in the right order.",
    "Puhdistus, kuorinta, höyry, naamio ja hoitotuotteet — oikeassa järjestyksessä.",
  ]),
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
const LATER = new Set(["p-hair", "p-spa"]);

export const CRAFT_COURSES = ALL_COURSES.filter((c) => !LATER.has(c.id));
export const CRAFT_LESSONS = ALL_LESSONS.filter((l) => !LATER.has(l.course));

/** Software lessons shown at the end of the craft track, in this order
 * (only those that have a video are shown). */
export const CRAFT_BRIDGE = ["dang-ky-salon", "dich-vu", "bang-gia", "lich-hen", "khach-hang", "thanh-toan-hoa-don"];
