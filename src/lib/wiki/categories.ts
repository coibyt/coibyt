/** The chapters of the Wiki. Each one gathers the articles written from one
 * or more Academy courses and links back to those courses. */
import { l3, type L3 } from "@/lib/academy/types";
import type { WikiCategoryId } from "@/lib/wiki/types";

export interface WikiCategory {
  id: WikiCategoryId;
  /** URL slug per language: /wiki/<slug>. Must not collide with an article slug. */
  slug: L3;
  /** Short name for chips, breadcrumbs and the menu. */
  name: L3;
  /** H1 of the category page. */
  title: L3;
  /** One sentence for the hub card. */
  blurb: L3;
  /** Opening paragraph of the category page (and its meta description). */
  intro: L3;
  metaTitle: L3;
  /** Banner — the picture of the matching Academy course (already in public/). */
  image: string;
  /** Academy course ids (curriculum.ts / craft.ts) whose lessons belong here. */
  courses: string[];
  /** Slugs of the matching course pages: /academy/khoa-hoc/<slug>. */
  coursePages: string[];
}

export const WIKI_CATEGORIES: WikiCategory[] = [
  {
    id: "nail",
    slug: l3("nghe-nail", "nails", "kynnet"),
    name: l3("Nghề nail", "Nails", "Kynnet"),
    title: l3("Kiến thức nghề nail: sơn gel, builder gel, đắp bột, nối móng", "Nail knowledge: gel polish, builder gel, acrylic and extensions", "Kynsitieto: geelilakkaus, rakennegeeli, akryyli ja pidennykset"),
    blurb: l3(
      "Sơn gel, tháo gel, builder gel, đắp bột, nối móng, French và chăm sóc móng.",
      "Gel polish, removal, builder gel, acrylic, extensions, French and nail care.",
      "Geelilakkaus, poisto, rakennegeeli, akryyli, pidennykset, ranskalainen ja kynsienhoito."
    ),
    intro: l3(
      "Các bài viết về nghề nail được viết lại từ những bài học trong khóa Nghề Nail của VaraaAi Academy. Mỗi chủ đề có hai bài: một bài giải thích vì sao phải làm như vậy, một bài chỉ từng bước thao tác. Bạn đọc bài, xem video ngay trong trang rồi thực hành trên móng giả trước khi làm cho khách.",
      "These articles are written from the lessons of VaraaAi Academy's nail course. Every topic has two articles: one explains why the work is done this way, the other walks through the steps. Read, watch the video on the page, then practise on tips before you work on a customer.",
      "Nämä artikkelit on kirjoitettu VaraaAi Academyn kynsikurssin oppituntien pohjalta. Jokaisesta aiheesta on kaksi artikkelia: toinen selittää, miksi työ tehdään näin, toinen käy työvaiheet läpi. Lue, katso video sivulla ja harjoittele tipeillä ennen asiakastyötä."
    ),
    metaTitle: l3("Kiến thức nghề nail: sơn gel, đắp bột, nối móng", "Nail technician knowledge: gel, acrylic, extensions", "Kynsitieto: geeli, akryyli ja pidennykset"),
    image: "/academy/khoa-hoc/hoc-nail-online.jpg",
    courses: ["p-nail"],
    coursePages: ["hoc-nail-online"],
  },
  {
    id: "lash",
    slug: l3("noi-mi", "lashes", "ripset"),
    name: l3("Nối mi", "Lashes", "Ripset"),
    title: l3("Kiến thức nối mi: classic, volume, hybrid, lash lift", "Lash knowledge: classic, volume, hybrid and lash lift", "Ripsitieto: klassiset, volyymi, hybridi ja ripsien kestotaivutus"),
    blurb: l3(
      "Chuẩn bị mắt, nối classic, volume, hybrid, lash mapping, dặm, tháo mi và lash lift.",
      "Preparation, classic, volume, hybrid, lash mapping, refills, removal and lash lift.",
      "Valmistelu, klassiset, volyymi, hybridi, ripsikartoitus, huollot, poisto ja kestotaivutus."
    ),
    intro: l3(
      "Nối mi là nghề làm việc sát mắt khách, nên kiến thức phải đi trước bàn tay. Chuyên mục này viết lại các bài học của khóa Nghề Mi: cách chuẩn bị, cách chọn độ dài, độ cong, độ dày, cách đi keo, và những lúc phải từ chối làm. Mỗi bài có video bài học để bạn vừa đọc vừa xem.",
      "Lash work happens right beside a customer's eye, so knowledge has to come before the hands. This chapter writes out the lessons of the lash course: preparation, choosing length, curl and thickness, working with adhesive, and when to say no. Every article carries its lesson video.",
      "Ripsityö tehdään aivan asiakkaan silmän vieressä, joten tiedon on kuljettava käsien edellä. Tämä osio avaa ripsikurssin oppitunnit: valmistelun, pituuden, kaarevuuden ja paksuuden valinnan, liiman käytön ja tilanteet, joissa työstä kieltäydytään. Jokaisessa artikkelissa on oppitunnin video."
    ),
    metaTitle: l3("Kiến thức nối mi: classic, volume, hybrid, lash lift", "Lash extension knowledge: classic, volume, hybrid", "Ripsitieto: klassiset, volyymi ja hybridi"),
    image: "/academy/khoa-hoc/hoc-noi-mi-online.jpg",
    courses: ["p-lash"],
    coursePages: ["hoc-noi-mi-online"],
  },
  {
    id: "hair",
    slug: l3("nghe-toc", "hair", "hiukset"),
    name: l3("Nghề tóc", "Hair", "Hiukset"),
    title: l3("Kiến thức nghề tóc: cắt nam, cắt nữ, fade, tầng, mái, sấy", "Hair knowledge: men's and women's cuts, fades, layers, fringes, blow-drying", "Hiustieto: miesten ja naisten leikkaukset, fade, kerrokset, otsatukka ja föönaus"),
    blurb: l3(
      "Tư vấn, chia vùng, cắt nam, fade, cắt bằng, cắt tầng, cắt mái và sấy tạo kiểu.",
      "Consultation, sectioning, men's cuts, fades, one-length cuts, layers, fringes and blow-drying.",
      "Konsultaatio, jaottelu, miesten leikkaukset, fade, tasaleikkaus, kerrokset, otsatukka ja föönaus."
    ),
    intro: l3(
      "Một kiểu tóc đẹp bắt đầu từ buổi tư vấn và cách chia vùng, rồi mới tới đường kéo. Chuyên mục nghề tóc viết lại các bài học của khóa Nghề Tóc: từ cắt nam cơ bản, fade, tới cắt bằng, cắt tầng, cắt mái và sấy tạo kiểu, kèm video cho từng bài.",
      "A good haircut starts with the consultation and the sectioning, and only then with the scissors. This chapter writes out the hair course: basic men's cuts, fades, one-length cuts, layers, fringes and blow-drying, each with its lesson video.",
      "Hyvä leikkaus alkaa konsultaatiosta ja jaottelusta, vasta sitten saksista. Tämä osio avaa hiuskurssin: miesten perusleikkaus, fade, tasaleikkaus, kerrokset, otsatukka ja föönaus, jokaisessa oman oppituntinsa video."
    ),
    metaTitle: l3("Kiến thức nghề tóc: cắt nam, cắt nữ, fade, sấy", "Hairdressing knowledge: cuts, fades, layers, styling", "Hiustieto: leikkaukset, fade, kerrokset ja muotoilu"),
    image: "/academy/khoa-hoc/hoc-cat-toc-online.jpg",
    courses: ["p-hair"],
    coursePages: ["hoc-cat-toc-online"],
  },
  {
    id: "spa",
    slug: l3("spa-cham-soc-da", "spa-skin-care", "spa-ihonhoito"),
    name: l3("Spa & chăm sóc da", "Spa & skin care", "Spa ja ihonhoito"),
    title: l3("Kiến thức spa và chăm sóc da: soi da, facial, massage, waxing", "Spa and skin care knowledge: skin analysis, facials, massage, waxing", "Spa- ja ihonhoitotieto: ihoanalyysi, kasvohoidot, hieronta ja vahaus"),
    blurb: l3(
      "Soi da, chăm sóc da mặt, massage mặt và body, waxing, chăm sóc tay chân.",
      "Skin analysis, facials, face and body massage, waxing, hand and foot care.",
      "Ihoanalyysi, kasvohoidot, kasvo- ja vartalohieronta, vahaus sekä käsi- ja jalkahoidot."
    ),
    intro: l3(
      "Làm spa là chăm sóc làn da và cơ thể của người khác, nên bước đầu tiên luôn là quan sát và hỏi. Chuyên mục này viết lại các bài học của khóa Spa & chăm sóc da: soi da, quy trình facial, massage mặt, massage body, waxing và chăm sóc tay chân, kèm những trường hợp không nên làm.",
      "Spa work means caring for someone else's skin and body, so the first step is always to look and ask. This chapter writes out the spa and skin care course: skin analysis, the facial routine, face massage, body massage, waxing and hand and foot care, with the cases where you should not treat.",
      "Spa-työ on toisen ihmisen ihon ja kehon hoitamista, joten ensimmäinen vaihe on aina katsoa ja kysyä. Tämä osio avaa spa- ja ihonhoitokurssin: ihoanalyysin, kasvohoidon vaiheet, kasvo- ja vartalohieronnan, vahauksen sekä käsi- ja jalkahoidot ja tilanteet, joissa hoitoa ei tehdä."
    ),
    metaTitle: l3("Kiến thức spa, chăm sóc da: facial, massage, waxing", "Spa and skin care knowledge: facials, massage, waxing", "Spa- ja ihonhoitotieto: kasvohoidot, hieronta, vahaus"),
    image: "/academy/khoa-hoc/hoc-spa-cham-soc-da.jpg",
    courses: ["p-spa"],
    coursePages: ["hoc-spa-cham-soc-da"],
  },
  {
    id: "safety",
    slug: l3("ve-sinh-an-toan", "hygiene-safety", "hygienia-turvallisuus"),
    name: l3("Vệ sinh & an toàn", "Hygiene & safety", "Hygienia ja turvallisuus"),
    title: l3("Vệ sinh và an toàn trong tiệm làm đẹp", "Hygiene and safety in a beauty salon", "Hygienia ja turvallisuus kauneusalalla"),
    blurb: l3(
      "Khử khuẩn dụng cụ, rửa tay, găng tay, dị ứng hóa chất, xử lý sự cố.",
      "Tool disinfection, hand washing, gloves, chemical allergies and handling accidents.",
      "Välineiden desinfiointi, käsienpesu, käsineet, kemikaaliallergiat ja vahinkotilanteet."
    ),
    intro: l3(
      "Một tiệm sạch và an toàn giữ được khách lâu hơn mọi chương trình khuyến mãi. Chuyên mục này viết lại các bài học Vệ sinh & an toàn: xử lý dụng cụ sau mỗi khách, rửa tay và găng tay, dị ứng hóa chất, khi nào không nên làm và cách xử lý sự cố. Quy định khác nhau theo từng nước và thành phố, nên hãy hỏi cơ quan y tế nơi bạn làm việc.",
      "A clean, safe salon keeps customers longer than any promotion. This chapter writes out the hygiene and safety lessons: tools after every customer, hand washing and gloves, chemical allergies, when not to treat and what to do when something goes wrong. Rules differ by country and city, so check with the health authority where you work.",
      "Puhdas ja turvallinen salonki pitää asiakkaat pidempään kuin mikään kampanja. Tämä osio avaa hygienian ja turvallisuuden oppitunnit: välineet jokaisen asiakkaan jälkeen, käsienpesu ja käsineet, kemikaaliallergiat, milloin hoitoa ei tehdä ja miten vahinkotilanteissa toimitaan. Määräykset vaihtelevat maittain ja kunnittain, joten tarkista ne oman kuntasi terveydensuojeluviranomaiselta."
    ),
    metaTitle: l3("Vệ sinh và an toàn trong tiệm nail, mi, tóc, spa", "Salon hygiene and safety: tools, hands, allergies", "Kauneusalan hygienia ja turvallisuus"),
    image: "/academy/khoa-hoc/ve-sinh-an-toan-salon.jpg",
    courses: ["p-safety"],
    coursePages: ["ve-sinh-an-toan-salon"],
  },
  {
    id: "salon",
    slug: l3("quan-ly-salon", "salon-management", "salongin-hallinta"),
    name: l3("Quản lý salon", "Salon management", "Salongin hallinta"),
    title: l3("Quản lý salon: lịch hẹn, nhân viên, doanh thu, kho hàng", "Salon management: bookings, staff, income and stock", "Salongin hallinta: varaukset, henkilökunta, tulot ja varasto"),
    blurb: l3(
      "Mở salon trên VaraaAi, dịch vụ, nhân viên, lịch hẹn, thanh toán, doanh thu, kho hàng.",
      "Setting up on VaraaAi, services, staff, calendar, checkout, income and inventory.",
      "Käyttöönotto, palvelut, henkilökunta, kalenteri, kassa, tulot ja varasto."
    ),
    intro: l3(
      "Chuyên mục dành cho chủ salon: cách đưa tiệm lên mạng để nhận lịch 24/7, sắp xếp dịch vụ, nhân viên, giờ mở cửa, rồi vận hành mỗi ngày với lịch hẹn, thanh toán, doanh thu và kho hàng. Các bài viết đi theo đúng những bài học dành cho chủ salon trong VaraaAi Academy và dùng phần mềm VaraaAi miễn phí để minh họa.",
      "A chapter for salon owners: getting the salon online to take bookings around the clock, setting up services, staff and opening hours, then running the day with the calendar, checkout, income and inventory. The articles follow the owner lessons of VaraaAi Academy and use the free VaraaAi software to show each step.",
      "Osio salongin omistajille: salonki verkkoon ottamaan varauksia ympäri vuorokauden, palvelut, henkilökunta ja aukioloajat kuntoon, ja sitten arki kalenterin, kassan, tulojen ja varaston kanssa. Artikkelit seuraavat VaraaAi Academyn omistajien oppitunteja ja näyttävät vaiheet maksuttomalla VaraaAi-ohjelmistolla."
    ),
    metaTitle: l3("Quản lý salon: lịch hẹn, nhân viên, doanh thu", "Salon management guides: bookings, staff, income", "Salongin hallinta: varaukset, henkilökunta, tulot"),
    image: "/academy/khoa-hoc/quan-ly-salon-hang-ngay.jpg",
    courses: ["o-start", "o-daily", "o-grow"],
    coursePages: ["mo-salon-dat-lich-online", "quan-ly-salon-hang-ngay", "mo-rong-chuoi-salon"],
  },
  {
    id: "marketing",
    slug: l3("marketing-salon", "salon-marketing", "salongin-markkinointi"),
    name: l3("Marketing & giữ khách", "Marketing & loyalty", "Markkinointi ja kanta-asiakkaat"),
    title: l3("Marketing cho salon: thu hút khách mới và giữ chân khách quen", "Salon marketing: winning new customers and keeping regulars", "Salongin markkinointi: uudet asiakkaat ja kanta-asiakkaat"),
    blurb: l3(
      "Link đặt lịch, poster QR, bảng giá, website, thẻ tích điểm, thẻ quà tặng, email.",
      "Booking links, QR posters, price lists, websites, loyalty cards, gift cards and email.",
      "Varauslinkit, QR-julisteet, hinnastot, verkkosivut, kanta-asiakaskortit, lahjakortit ja sähköposti."
    ),
    intro: l3(
      "Khách mới tới từ nhiều nơi: Google, Facebook, tấm poster trước cửa, lời giới thiệu của khách quen. Chuyên mục này viết về những cách salon nhỏ có thể tự làm: chia sẻ link đặt lịch, in poster QR, làm bảng giá, mở website, phát thẻ tích điểm, bán thẻ quà tặng và gửi email cho khách.",
      "New customers arrive from many places: Google, Facebook, the poster by the door, a regular's recommendation. This chapter covers what a small salon can do itself: sharing a booking link, printing QR posters, making a price list, opening a website, handing out loyalty cards, selling gift cards and emailing customers.",
      "Uudet asiakkaat tulevat monesta suunnasta: Googlesta, Facebookista, oven julisteesta ja kanta-asiakkaan suosituksesta. Tämä osio kertoo, mitä pieni salonki voi tehdä itse: jakaa varauslinkin, tulostaa QR-julisteita, tehdä hinnaston, avata verkkosivut, jakaa kanta-asiakaskortteja, myydä lahjakortteja ja lähettää sähköpostia."
    ),
    metaTitle: l3("Marketing salon: thu hút khách mới, giữ khách quen", "Salon marketing: new customers and loyalty", "Salongin markkinointi ja kanta-asiakkaat"),
    image: "/academy/khoa-hoc/thu-hut-khach-cho-salon.jpg",
    courses: ["o-reach", "o-retain"],
    coursePages: ["thu-hut-khach-cho-salon", "giu-chan-khach-hang-salon"],
  },
  {
    id: "booking",
    slug: l3("dat-lich-lam-dep", "booking-guide", "varausopas"),
    name: l3("Đặt lịch làm đẹp", "Booking guide", "Varausopas"),
    title: l3("Hướng dẫn đặt lịch làm đẹp online cho khách hàng", "How to book beauty appointments online", "Näin varaat kauneusajan verkossa"),
    blurb: l3(
      "Tìm salon, đặt lịch, đổi hoặc hủy lịch, nhắn salon, thẻ thành viên, thẻ quà tặng.",
      "Finding a salon, booking, changing or cancelling, messaging, member cards and gift cards.",
      "Salongin haku, varaaminen, muutokset ja peruutukset, viestit, jäsenkortit ja lahjakortit."
    ),
    intro: l3(
      "Chuyên mục dành cho người đi làm đẹp: cách tìm salon gần nhà, đặt lịch làm móng, làm tóc, nối mi hay spa trong một phút, xem lại và hủy lịch, nhắn tin cho salon, dùng thẻ thành viên và thẻ quà tặng. Mỗi bài có video hướng dẫn quay trên màn hình thật.",
      "A chapter for customers: finding a salon nearby, booking nails, hair, lashes or a spa visit in a minute, checking and cancelling bookings, messaging the salon, and using member cards and gift cards. Every article has a video recorded on the real screens.",
      "Osio asiakkaille: lähellä olevan salongin löytäminen, kynsi-, hius-, ripsi- tai spa-ajan varaaminen minuutissa, varausten tarkistaminen ja peruminen, viestit salongille sekä jäsen- ja lahjakorttien käyttö. Jokaisessa artikkelissa on oikeilta näytöiltä kuvattu video."
    ),
    metaTitle: l3("Hướng dẫn đặt lịch làm đẹp online cho khách", "How to book beauty appointments online", "Näin varaat kauneusajan verkossa"),
    image: "/academy/khoa-hoc/huong-dan-dat-lich-lam-dep.jpg",
    courses: ["c-start", "c-bookings", "c-perks"],
    coursePages: ["huong-dan-dat-lich-lam-dep", "quan-ly-lich-hen-lam-dep", "the-thanh-vien-the-qua-tang"],
  },
];

export const wikiCategory = (id: WikiCategoryId) => WIKI_CATEGORIES.find((c) => c.id === id)!;
