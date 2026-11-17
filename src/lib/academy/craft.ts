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
