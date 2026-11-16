/** The Academy's curriculum: courses and lessons for customers and for
 * salon owners. A lesson with `video: null` is announced but not filmed yet
 * (shown as "coming soon"). Button and field names in the steps match the
 * live site — check them again whenever the screens change.
 *
 * Videos are made with the pipeline kept outside this repo
 * (C:\Hiep\hoat-hinh-ai\projects\varaaai-hoc) and stored in public/academy. */
import { l3, type Course, type Lesson, type LessonVideo } from "@/lib/academy/types";

const video = (slug: string, seconds: number, published: string): LessonVideo => ({
  src: `/academy/${slug}.mp4`,
  poster: `/academy/${slug}.jpg`,
  captions: `/academy/${slug}.vtt`,
  seconds,
  published,
});

export const COURSES: Course[] = [
  /* ---------- customers ---------- */
  {
    id: "c-start",
    audience: "customer",
    icon: "compass",
    title: l3("Bắt đầu đặt lịch", "Getting started", "Alkuun pääseminen"),
    body: l3("Tìm salon, đặt lịch đầu tiên và cài app.", "Find a salon, make your first booking and install the app.", "Löydä salonki, tee ensimmäinen varaus ja asenna sovellus."),
  },
  {
    id: "c-bookings",
    audience: "customer",
    icon: "calendar",
    title: l3("Quản lý lịch hẹn", "Managing bookings", "Varausten hallinta"),
    body: l3("Xem lại, huỷ lịch, nhắn salon và viết đánh giá.", "Review or cancel bookings, message the salon and leave a review.", "Tarkista tai peru varauksia, viestittele salongille ja kirjoita arvostelu."),
  },
  {
    id: "c-perks",
    audience: "customer",
    icon: "gift",
    title: l3("Ưu đãi và thẻ", "Rewards and cards", "Edut ja kortit"),
    body: l3("Thẻ thành viên, mời bạn bè, thẻ quà tặng.", "Member cards, inviting friends and gift cards.", "Jäsenkortit, ystävien kutsuminen ja lahjakortit."),
  },
  /* ---------- salon owners ---------- */
  {
    id: "o-start",
    audience: "owner",
    icon: "rocket",
    title: l3("Khởi động salon", "Launch your salon", "Salongin käyttöönotto"),
    body: l3("Đăng ký, thêm dịch vụ, nhân viên và giờ mở cửa.", "Register, then add services, staff and opening hours.", "Rekisteröidy ja lisää palvelut, työntekijät ja aukioloajat."),
  },
  {
    id: "o-reach",
    audience: "owner",
    icon: "megaphone",
    title: l3("Nhận khách ở mọi nơi", "Get booked everywhere", "Varauksia joka kanavasta"),
    body: l3("Link đặt lịch, poster QR, bảng giá, website, fanpage.", "Booking link, QR posters, price lists, website and fanpage.", "Varauslinkki, QR-julisteet, hinnastot, verkkosivut ja fanisivu."),
  },
  {
    id: "o-daily",
    audience: "owner",
    icon: "briefcase",
    title: l3("Vận hành hằng ngày", "Day-to-day", "Päivittäinen työ"),
    body: l3("Lịch hẹn, thanh toán, doanh thu, khách hàng.", "Calendar, checkout, income and customers.", "Kalenteri, kassa, tulot ja asiakkaat."),
  },
  {
    id: "o-retain",
    audience: "owner",
    icon: "heart",
    title: l3("Giữ khách & tăng doanh thu", "Keep customers & grow revenue", "Pidä asiakkaat ja kasvata myyntiä"),
    body: l3("Thẻ tích điểm, khách dẫn khách, thẻ quà tặng, email.", "Loyalty cards, referrals, gift cards and email.", "Kanta-asiakaskortit, suosittelut, lahjakortit ja sähköposti."),
  },
  {
    id: "o-grow",
    audience: "owner",
    icon: "trending",
    title: l3("Mở rộng & công cụ", "Grow & tools", "Kasvu ja työkalut"),
    body: l3("Kho hàng, chi nhánh, số liệu và làm việc nhóm.", "Inventory, branches, numbers and teamwork.", "Varasto, toimipisteet, luvut ja tiimityö."),
  },
];

export const LESSONS: Lesson[] = [
  /* ================= customers: getting started ================= */
  {
    slug: "dat-lich-online",
    course: "c-start",
    title: l3("Tìm salon và đặt lịch online", "Find a salon and book online", "Löydä salonki ja varaa aika verkossa"),
    summary: l3(
      "Tìm salon theo dịch vụ và khu vực, chọn nhân viên, ngày giờ rồi xác nhận — xong trong khoảng một phút.",
      "Search by service and area, pick a staff member, date and time, then confirm — done in about a minute.",
      "Hae palvelun ja alueen mukaan, valitse tekijä, päivä ja aika ja vahvista — valmista noin minuutissa."
    ),
    video: video("dat-lich-online", 148, "2026-11-16"),
    href: "/search",
    hrefLabel: l3("Tìm salon ngay", "Find a salon now", "Etsi salonki nyt"),
    steps: [
      l3(
        "Mở varaaai.com. Gõ dịch vụ vào ô “Dịch vụ hoặc salon”, gõ thành phố vào ô “Khu vực” (hoặc bấm “Gần tôi”), rồi bấm “Tìm kiếm”.",
        "Open varaaai.com. Type a service under “Service or salon”, a city under “Area” (or press “Near me”), then press “Search”.",
        "Avaa varaaai.com. Kirjoita palvelu ja kaupunki hakukenttiin (tai paina ”Lähelläni”) ja paina ”Hae”."
      ),
      l3(
        "Trong kết quả (xem dạng “Danh sách” hoặc “Bản đồ”), bấm vào salon bạn thích để mở trang salon.",
        "In the results (as a “List” or on the “Map”), tap the salon you like to open its page.",
        "Valitse tuloksista (luettelona tai kartalla) haluamasi salonki ja avaa sen sivu."
      ),
      l3(
        "Ở mục “Dịch vụ”, bấm “Đặt lịch” cạnh dịch vụ bạn muốn. Muốn làm nhiều dịch vụ: đánh dấu chọn từng dịch vụ rồi bấm “Tiếp tục”.",
        "Under “Services”, press “Book” next to the service you want. For several services, tick each one and press “Continue”.",
        "Paina ”Palvelut”-kohdassa ”Varaa” haluamasi palvelun vieressä. Jos haluat useita palveluita, valitse ne ja paina ”Jatka”."
      ),
      l3(
        "“Chọn nhân viên” (hoặc “Bất kỳ ai còn trống”), “Chọn ngày”, rồi “Chọn giờ” trong các giờ còn trống.",
        "“Choose staff” (or “Anyone available”), “Choose a date”, then “Choose a time” from the free slots.",
        "Valitse tekijä (tai ”Kuka tahansa vapaa”), päivä ja vapaa aika."
      ),
      l3(
        "Chưa có tài khoản: điền “Họ và tên”, “Số điện thoại”, “Email”, “Mật khẩu”. Có rồi: bấm “Đăng nhập”.",
        "No account yet: fill in your name, phone, email and a password. Already have one: press “Sign in”.",
        "Jos sinulla ei ole tiliä, täytä nimi, puhelin, sähköposti ja salasana. Jos on, paina ”Kirjaudu”."
      ),
      l3(
        "Chọn cách thanh toán (thường là “Thanh toán tại salon”). Có mã giảm giá hoặc thẻ quà tặng thì nhập vào ô “Mã giảm giá” và bấm “Áp dụng”.",
        "Choose how to pay (usually “Pay at the salon”). Enter a discount or gift-card code under “Discount code” and press “Apply”.",
        "Valitse maksutapa (yleensä ”Maksu salongissa”). Syötä alennus- tai lahjakorttikoodi ja paina ”Käytä”."
      ),
      l3(
        "Xem lại “Lịch hẹn của bạn”, đánh dấu ô chấp nhận “Chính sách hủy bỏ”, rồi bấm “Xác nhận đặt lịch”.",
        "Check “Your booking”, tick the box accepting the cancellation policy, then press “Confirm booking”.",
        "Tarkista varauksesi, hyväksy peruutusehdot ja paina ”Vahvista varaus”."
      ),
    ],
    tips: [
      l3(
        "Sau khi đặt, bấm “Xem lịch hẹn của tôi”. Bạn tự huỷ được ở đó, miễn là còn trong thời hạn salon cho phép.",
        "After booking, press “See my bookings”. You can cancel there yourself as long as the salon's deadline hasn't passed.",
        "Varauksen jälkeen paina ”Näytä varaukseni”. Voit perua siellä itse, kunhan salongin määräaika ei ole umpeutunut."
      ),
    ],
    quiz: [
      {
        q: l3("Muốn tìm salon quanh chỗ bạn đang đứng, bạn bấm nút nào?", "Which button finds salons around where you are?", "Mikä painike löytää salongit läheltäsi?"),
        options: [l3("Gần tôi", "Near me", "Lähelläni"), l3("Bản đồ", "Map", "Kartta"), l3("Tải app", "Get the app", "Lataa sovellus")],
        answer: 0,
        why: l3("“Gần tôi” nằm ngay trong ô Khu vực của thanh tìm kiếm.", "“Near me” sits right in the Area field of the search bar.", "”Lähelläni” on hakupalkin aluekentässä."),
      },
      {
        q: l3("“Thanh toán tại salon” nghĩa là gì?", "What does “Pay at the salon” mean?", "Mitä ”Maksu salongissa” tarkoittaa?"),
        options: [
          l3("Phải chuyển khoản trước khi đến", "You must transfer the money before you come", "Maksu on siirrettävä etukäteen"),
          l3("Làm xong mới trả tiền, bằng tiền mặt hoặc thẻ", "You pay after the service, by cash or card", "Maksat palvelun jälkeen käteisellä tai kortilla"),
          l3("Phải trả tiền cọc qua mạng", "You must pay a deposit online", "Sinun on maksettava varausmaksu verkossa"),
        ],
        answer: 1,
        why: l3("Bạn thanh toán trực tiếp bằng tiền mặt hoặc thẻ khi đến salon.", "You pay directly with cash or card when you visit the salon.", "Maksat suoraan käteisellä tai kortilla salongissa."),
      },
      {
        q: l3("Mã thẻ quà tặng nhập ở đâu khi đặt lịch?", "Where do you enter a gift-card code when booking?", "Mihin lahjakorttikoodi syötetään varatessa?"),
        options: [l3("Ô “Ghi chú cho salon”", "The “Note for the salon” box", "”Viesti salongille” -kenttään"), l3("Ô “Mã giảm giá”, rồi bấm “Áp dụng”", "The “Discount code” box, then “Apply”", "”Alennuskoodi”-kenttään ja paina ”Käytä”"), l3("Không nhập được khi đặt online", "It can't be used online", "Sitä ei voi käyttää verkossa")],
        answer: 1,
        why: l3("Ô “Mã giảm giá” nhận cả mã giảm giá lẫn mã thẻ quà tặng.", "The “Discount code” box takes both discount codes and gift-card codes.", "”Alennuskoodi”-kenttään käyvät sekä alennus- että lahjakorttikoodit."),
      },
    ],
  },
  {
    slug: "tai-khoan",
    course: "c-start",
    title: l3("Tạo tài khoản và hồ sơ của tôi", "Your account and profile", "Tili ja oma profiili"),
    summary: l3("Đăng ký, đăng nhập, đổi email, mật khẩu và ảnh đại diện.", "Sign up, sign in, and change your email, password and photo.", "Rekisteröidy, kirjaudu ja vaihda sähköposti, salasana ja kuva."),
    video: null,
  },
  {
    slug: "cai-app",
    course: "c-start",
    title: l3("Cài app VaraaAi lên điện thoại", "Install the VaraaAi app", "Asenna VaraaAi-sovellus"),
    summary: l3("Cài một chạm trên Android, iPhone và máy tính — không cần CH Play hay App Store.", "One-tap install on Android, iPhone and desktop — no app store needed.", "Asennus yhdellä napautuksella Androidiin, iPhoneen ja tietokoneelle."),
    video: video("cai-app", 85, "2026-11-16"),
    href: "/app",
    hrefLabel: l3("Mở trang cài app", "Open the install page", "Avaa asennussivu"),
    steps: [
      l3(
        "Android và máy tính: mở varaaai.com/app bằng Chrome, Edge hoặc Samsung Internet.",
        "Android and desktop: open varaaai.com/app in Chrome, Edge or Samsung Internet.",
        "Android ja tietokone: avaa varaaai.com/app Chromessa, Edgessä tai Samsung Internetissä."
      ),
      l3(
        "Bấm “Cài đặt ứng dụng”, rồi chọn “Cài đặt” khi trình duyệt hỏi. Biểu tượng VaraaAi xuất hiện trên màn hình chính.",
        "Press “Install the app”, then choose “Install” when the browser asks. The VaraaAi icon appears on your home screen.",
        "Paina ”Asenna sovellus” ja valitse ”Asenna”, kun selain kysyy. VaraaAi-kuvake ilmestyy aloitusnäytölle."
      ),
      l3(
        "iPhone và iPad: mở varaaai.com/app bằng Safari, nhấn nút Chia sẻ (hình vuông có mũi tên lên) ở cuối màn hình.",
        "iPhone and iPad: open varaaai.com/app in Safari and tap the Share button (a square with an arrow pointing up) at the bottom.",
        "iPhone ja iPad: avaa varaaai.com/app Safarissa ja napauta alareunan Jaa-painiketta (neliö, jossa nuoli ylöspäin)."
      ),
      l3("Chọn “Thêm vào Màn hình chính”, rồi bấm “Thêm”.", "Choose “Add to Home Screen”, then tap “Add”.", "Valitse ”Lisää Koti-valikkoon” ja napauta ”Lisää”."),
    ],
    tips: [
      l3(
        "Không cần nhớ địa chỉ: cuối mọi trang của VaraaAi đều có ba nút “Cài trên Android”, “Cài trên iPhone” và “Cài trên Máy tính”.",
        "No need to remember the address: every VaraaAi page ends with three buttons — install on Android, on iPhone and on desktop.",
        "Osoitetta ei tarvitse muistaa: jokaisen VaraaAi-sivun lopussa on kolme asennuspainiketta — Android, iPhone ja tietokone."
      ),
    ],
    quiz: [
      {
        q: l3("Cài app VaraaAi có cần vào CH Play hay App Store không?", "Do you need Google Play or the App Store to install VaraaAi?", "Tarvitaanko VaraaAin asentamiseen Google Play tai App Store?"),
        options: [l3("Có", "Yes", "Kyllä"), l3("Không, cài thẳng từ trang varaaai.com/app", "No, it installs straight from varaaai.com/app", "Ei, se asennetaan suoraan sivulta varaaai.com/app"), l3("Chỉ iPhone mới cần", "Only on iPhone", "Vain iPhonessa")],
        answer: 1,
        why: l3("App cài thẳng từ trình duyệt, miễn phí và tự cập nhật.", "The app installs from the browser, is free and updates itself.", "Sovellus asennetaan selaimesta, se on ilmainen ja päivittyy itse."),
      },
      {
        q: l3("Trên iPhone, bạn mở trang cài đặt bằng trình duyệt nào?", "Which browser do you use on an iPhone?", "Millä selaimella asennus tehdään iPhonessa?"),
        options: [l3("Safari", "Safari", "Safari"), l3("Samsung Internet", "Samsung Internet", "Samsung Internet"), l3("Trình duyệt nào cũng được", "Any browser", "Millä tahansa")],
        answer: 0,
        why: l3("Trên iPhone và iPad, mở bằng Safari rồi dùng nút Chia sẻ.", "On iPhone and iPad, open it in Safari and use the Share button.", "Avaa iPhonessa ja iPadissa Safarilla ja käytä Jaa-painiketta."),
      },
      {
        q: l3("Sau khi nhấn nút Chia sẻ trên iPhone, bạn chọn gì?", "After tapping Share on an iPhone, what do you choose?", "Mitä valitset, kun olet napauttanut Jaa iPhonessa?"),
        options: [l3("Sao chép", "Copy", "Kopioi"), l3("Thêm vào Màn hình chính", "Add to Home Screen", "Lisää Koti-valikkoon"), l3("In", "Print", "Tulosta")],
        answer: 1,
        why: l3("“Thêm vào Màn hình chính”, rồi bấm “Thêm”.", "“Add to Home Screen”, then “Add”.", "”Lisää Koti-valikkoon” ja sitten ”Lisää”."),
      },
    ],
  },
  /* ================= customers: bookings ================= */
  {
    slug: "lich-hen-cua-toi",
    course: "c-bookings",
    title: l3("Xem và huỷ lịch hẹn", "See and cancel a booking", "Katso ja peru varaus"),
    summary: l3("Mở “Lịch hẹn của tôi”, xem thông tin đặt chỗ và tự huỷ trong thời hạn salon cho phép.", "Open “My bookings”, view the details and cancel within the salon's deadline.", "Avaa ”Varaukseni”, katso tiedot ja peru salongin määräajan sisällä."),
    video: null,
  },
  {
    slug: "chat-voi-salon",
    course: "c-bookings",
    title: l3("Chat với salon", "Chat with the salon", "Viestittele salongin kanssa"),
    summary: l3("Hỏi salon ngay trên trang, xem lại tin nhắn trong Hộp thư.", "Ask the salon right on its page and find the replies in your inbox.", "Kysy salongilta suoraan sen sivulla ja löydä vastaukset viesteistäsi."),
    video: null,
  },
  {
    slug: "viet-danh-gia",
    course: "c-bookings",
    title: l3("Viết đánh giá sau khi làm đẹp", "Leave a review after your visit", "Kirjoita arvostelu käynnin jälkeen"),
    summary: l3("Chấm sao và chia sẻ trải nghiệm từ email mời đánh giá hoặc từ Lịch hẹn của tôi.", "Rate and share your experience from the review email or from My bookings.", "Anna tähdet ja kerro kokemuksestasi arvostelusähköpostista tai varauksistasi."),
    video: null,
  },
  /* ================= customers: rewards ================= */
  {
    slug: "the-thanh-vien",
    course: "c-perks",
    title: l3("Thẻ thành viên: tích vé và mời bạn bè", "Member card: collect stamps, invite friends", "Jäsenkortti: kerää leimoja ja kutsu ystäviä"),
    summary: l3("Mở thẻ QR, xem số vé, và gửi link mời để nhận thêm 2 vé khi bạn bè đến salon.", "Open your QR card, check your stamps and share your invite link for 2 extra stamps.", "Avaa QR-korttisi, katso leimasi ja jaa kutsulinkki saadaksesi 2 lisäleimaa."),
    video: null,
  },
  {
    slug: "the-qua-tang",
    course: "c-perks",
    title: l3("Mua và dùng thẻ quà tặng", "Buy and use a gift card", "Osta ja käytä lahjakortti"),
    summary: l3("Mua thẻ trên website của salon, nhận mã qua email và dùng khi đặt lịch.", "Buy one on the salon's website, get the code by email and use it when you book.", "Osta salongin verkkosivuilta, saat koodin sähköpostiin ja käytät sen varatessa."),
    video: null,
    fresh: true,
  },
  {
    slug: "theo-doi-salon",
    course: "c-perks",
    title: l3("Theo dõi salon, bảng tin và mua sản phẩm", "Follow salons, your feed and the shop", "Seuraa salonkeja, syöte ja kauppa"),
    summary: l3("Bấm Theo dõi để nhận bài viết mới của salon và mua sản phẩm trong cửa hàng của salon.", "Follow a salon to see its new posts, and buy products from its shop.", "Seuraa salonkia nähdäksesi uudet julkaisut ja osta tuotteita sen kaupasta."),
    video: null,
  },
  {
    slug: "hoa-don",
    course: "c-perks",
    title: l3("Xem lại hoá đơn bằng mã QR", "Open your invoice with a QR code", "Avaa lasku QR-koodilla"),
    summary: l3("Quét mã tại quầy hoặc mở email để xem lại hoá đơn của lần làm đẹp.", "Scan the code at the counter or open the email to see the invoice for your visit.", "Skannaa koodi kassalla tai avaa sähköposti nähdäksesi käyntisi laskun."),
    video: null,
    fresh: true,
  },

  /* ================= owners: launch ================= */
  {
    slug: "dang-ky-salon",
    course: "o-start",
    guide: "register",
    title: l3("Đăng ký và kích hoạt salon", "Register and activate your salon", "Rekisteröi ja aktivoi salonki"),
    summary: l3("Điền thông tin, xác minh email là salon hoạt động ngay — không phải chờ duyệt.", "Fill in the form and verify your email — the salon is live at once, no review.", "Täytä lomake ja vahvista sähköposti — salonki on heti käytössä."),
    video: null,
  },
  {
    slug: "ho-so-salon",
    course: "o-start",
    guide: "profile",
    title: l3("Thông tin salon, logo và ảnh bìa", "Salon details, logo and cover", "Salongin tiedot, logo ja kansikuva"),
    summary: l3("Hoàn thiện hồ sơ để mở khoá Thẻ tích điểm và Marketing.", "Complete your profile to unlock Loyalty cards and Marketing.", "Täydennä profiili avataksesi kanta-asiakaskortit ja markkinoinnin."),
    video: null,
  },
  {
    slug: "dich-vu",
    course: "o-start",
    guide: "services",
    title: l3("Thêm dịch vụ, nhóm dịch vụ và dịch vụ phụ", "Services, groups and add-ons", "Palvelut, ryhmät ja lisäpalvelut"),
    summary: l3("Tên, thời lượng, giá, tiền cọc và nhân viên thực hiện cho từng dịch vụ.", "Name, duration, price, deposit and who performs each service.", "Nimi, kesto, hinta, varausmaksu ja tekijät jokaiselle palvelulle."),
    video: null,
  },
  {
    slug: "nhan-vien",
    course: "o-start",
    guide: "staff",
    title: l3("Nhân viên, giờ làm và phân quyền", "Staff, working hours and permissions", "Työntekijät, työajat ja oikeudet"),
    summary: l3("Thêm nhân viên, lịch làm việc và chọn mục nào nhân viên được xem.", "Add staff and schedules, and choose what each person may see.", "Lisää työntekijät ja vuorot ja valitse, mitä kukin saa nähdä."),
    video: null,
  },
  {
    slug: "gio-mo-cua",
    course: "o-start",
    guide: "hours",
    title: l3("Giờ mở cửa và ngày nghỉ", "Opening hours and days off", "Aukioloajat ja vapaapäivät"),
    summary: l3("Lịch hằng tuần, nhiều ca trong ngày, ngày nghỉ lễ.", "Weekly schedule, several shifts a day and holidays.", "Viikkoaikataulu, useita vuoroja päivässä ja pyhäpäivät."),
    video: null,
  },
  {
    slug: "thanh-toan-chinh-sach",
    course: "o-start",
    guide: "payments",
    title: l3("Thanh toán, chính sách huỷ và thông tin hoá đơn", "Payments, cancellation policy and invoice details", "Maksut, peruutusehdot ja laskutustiedot"),
    summary: l3("Nhận chuyển khoản, đặt hạn huỷ lịch và điền thông tin xuất hoá đơn.", "Take bank transfers, set a cancellation deadline and fill in invoice details.", "Ota vastaan tilisiirtoja, aseta perumisaika ja täytä laskutustiedot."),
    video: null,
  },
  /* ================= owners: reach ================= */
  {
    slug: "chia-se-link",
    course: "o-reach",
    guide: "share",
    title: l3("Chia sẻ link đặt lịch và nhúng vào website", "Share your booking link and embed it", "Jaa varauslinkki ja upota se sivuillesi"),
    summary: l3("Sao chép link, tải mã QR và lấy mã nhúng cho website riêng.", "Copy the link, download the QR code and get the embed code for your own site.", "Kopioi linkki, lataa QR-koodi ja hae upotuskoodi omille sivuillesi."),
    video: null,
  },
  {
    slug: "poster-qr",
    course: "o-reach",
    guide: "tools",
    fresh: true,
    title: l3("Tạo poster QR “Quét để đặt lịch”", "Make a “Scan to book” QR poster", "Tee ”Skannaa ja varaa” -QR-juliste"),
    summary: l3(
      "Tự làm poster có mã QR trong vài phút: nhập link, chọn tiêu đề, mẫu và khổ in, rồi tải PDF hoặc PNG. Miễn phí, không cần đăng nhập.",
      "Make a QR poster in minutes: paste your link, pick a headline, style and size, then download a PDF or PNG. Free, no sign-in.",
      "Tee QR-juliste minuuteissa: liitä linkki, valitse otsikko, tyyli ja koko ja lataa PDF tai PNG. Ilmainen, ei kirjautumista."
    ),
    video: video("poster-qr", 122, "2026-11-16"),
    href: "/tools/qr-poster",
    hrefLabel: l3("Mở công cụ tạo poster", "Open the poster maker", "Avaa julistetyökalu"),
    steps: [
      l3(
        "Mở varaaai.com, kéo xuống cuối trang và bấm “Tạo poster QR đặt lịch”. Trên điện thoại có hai nút: “Chỉnh sửa” và “Xem trước”.",
        "Open varaaai.com, scroll to the bottom and press “Create a booking QR poster”. On a phone there are two tabs: “Edit” and “Preview”.",
        "Avaa varaaai.com, vieritä alas ja paina QR-julistetyökalun linkkiä. Puhelimessa on kaksi välilehteä: ”Muokkaa” ja ”Esikatselu”."
      ),
      l3("Ở “Thông tin salon”, nhập “Tên salon” và tải logo lên nếu có.", "Under “Salon details”, enter the salon name and upload a logo if you have one.", "Kirjoita kohtaan ”Salongin tiedot” salongin nimi ja lataa logo, jos sinulla on sellainen."),
      l3(
        "Ở “Mã QR & link đặt lịch”, dán link khách sẽ mở khi quét mã. Đang đăng nhập bằng tài khoản salon: chọn “Trang đặt lịch VaraaAi của tôi” để điền tự động.",
        "Under “QR code & booking link”, paste the link customers should open. Signed in as a salon: choose “My VaraaAi booking page” to fill it in automatically.",
        "Liitä kohtaan ”QR-koodi ja varauslinkki” linkki, jonka asiakas avaa. Jos olet kirjautunut salonkitilillä, valitse oma VaraaAi-varaussivusi."
      ),
      l3(
        "Ở “Nội dung poster”, chọn 1–3 ngôn ngữ, một tiêu đề lớn (ví dụ “Quét để đặt lịch”) và dòng phụ: Ưu đãi, Giờ mở cửa, Số điện thoại, Wi-Fi.",
        "Under “Poster content”, choose 1–3 languages, a headline (e.g. “Scan to book”) and extra lines: offer, opening hours, phone, Wi-Fi.",
        "Valitse kohdassa ”Julisteen sisältö” 1–3 kieltä, otsikko (esim. ”Skannaa ja varaa”) ja lisärivit: tarjous, aukioloajat, puhelin, Wi-Fi."
      ),
      l3(
        "Ở “Thiết kế”, chọn mẫu (Tối giản, Sang trọng, Pastel, Theo mùa), “Màu chủ đạo” và khổ: A4, A5, A6, thẻ đứng, sticker, Instagram.",
        "Under “Design”, pick a style (Minimal, Elegant, Pastel, Seasonal), a main colour and a size: A4, A5, A6, table tent, sticker, Instagram.",
        "Valitse kohdassa ”Ulkoasu” tyyli (Pelkistetty, Tyylikäs, Pastelli, Kausi), pääväri ja koko: A4, A5, A6, pöytäkortti, tarra, Instagram."
      ),
      l3("Bấm “Xem trước”, rồi “Tải PDF” để in hoặc “Tải PNG” để đăng mạng xã hội.", "Press “Preview”, then “Download PDF” to print or “Download PNG” for social media.", "Paina ”Esikatselu” ja sitten ”Lataa PDF” tulostusta tai ”Lataa PNG” somea varten."),
    ],
    tips: [
      l3("Quét thử mã bằng điện thoại trước khi in nhiều bản.", "Scan the code with your own phone before printing many copies.", "Skannaa koodi omalla puhelimellasi ennen kuin tulostat monta kappaletta."),
      l3(
        "Dán ở cửa kính, quầy thanh toán, bàn làm móng và gương trước ghế khách. Nếu mã dẫn về trang đặt lịch VaraaAi của salon, trang Tổng quan sẽ đếm lượt quét trong 30 ngày.",
        "Put it on the front door, at the till, on the nail table and by the mirror. If the code leads to your VaraaAi booking page, the Overview counts scans over 30 days.",
        "Kiinnitä se oveen, kassalle, kynsipöytään ja peilin viereen. Jos koodi vie VaraaAi-varaussivullesi, Yleiskatsaus laskee skannaukset 30 päivältä."
      ),
    ],
    quiz: [
      {
        q: l3("Dùng công cụ tạo poster QR có cần đăng nhập không?", "Do you need to sign in to use the QR poster maker?", "Pitääkö QR-julistetyökalua varten kirjautua?"),
        options: [l3("Có, phải có tài khoản salon", "Yes, a salon account is required", "Kyllä, tarvitaan salonkitili"), l3("Không, dùng được ngay và miễn phí", "No, it works straight away and it's free", "Ei, se toimii heti ja on ilmainen"), l3("Chỉ dùng thử được 7 ngày", "Only as a 7-day trial", "Vain 7 päivän kokeiluna")],
        answer: 1,
        why: l3("Công cụ mở cho mọi người; tài khoản salon chỉ giúp điền link tự động.", "The tool is open to everyone; a salon account only fills in the link for you.", "Työkalu on avoin kaikille; salonkitili vain täyttää linkin puolestasi."),
      },
      {
        q: l3("Muốn mang poster đi in, bạn bấm nút nào?", "Which button gives you a file for printing?", "Mistä painikkeesta saat tulostettavan tiedoston?"),
        options: [l3("Tải PNG", "Download PNG", "Lataa PNG"), l3("Tải PDF", "Download PDF", "Lataa PDF"), l3("Chỉnh sửa", "Edit", "Muokkaa")],
        answer: 1,
        why: l3("PDF dành cho in ấn; PNG hợp để đăng mạng xã hội.", "PDF is for printing; PNG suits social media.", "PDF on tulostusta varten; PNG sopii someen."),
      },
      {
        q: l3("Trước khi in nhiều bản, nên làm gì?", "What should you do before printing many copies?", "Mitä kannattaa tehdä ennen monen kappaleen tulostamista?"),
        options: [l3("Đổi mẫu sang Pastel", "Switch the style to Pastel", "Vaihtaa tyyliksi Pastelli"), l3("Quét thử mã bằng điện thoại", "Scan the code with your phone", "Skannata koodi puhelimella"), l3("Xoá dòng số điện thoại", "Remove the phone line", "Poistaa puhelinrivin")],
        answer: 1,
        why: l3("Quét thử để chắc chắn mã mở đúng trang đặt lịch.", "A test scan makes sure the code opens the right booking page.", "Testiskannaus varmistaa, että koodi avaa oikean varaussivun."),
      },
    ],
  },
  {
    slug: "bang-gia",
    course: "o-reach",
    guide: "tools",
    fresh: true,
    title: l3("Tạo bảng giá đa ngôn ngữ", "Make a multilingual price list", "Tee monikielinen hinnasto"),
    summary: l3("Nhập dịch vụ, dịch tự động, thêm mã QR đặt lịch rồi tải PDF hoặc PNG.", "Enter services, translate automatically, add a booking QR code and download a PDF or PNG.", "Lisää palvelut, käännä automaattisesti, lisää varaus-QR ja lataa PDF tai PNG."),
    video: null,
    href: "/tools/price-list",
  },
  {
    slug: "website-salon",
    course: "o-reach",
    guide: "website",
    title: l3("Website riêng cho salon", "Your salon's own website", "Salongin omat verkkosivut"),
    summary: l3("Chọn bộ màu, sắp xếp các phần trên trang chủ và xuất bản.", "Pick a colour set, arrange the home-page sections and publish.", "Valitse värit, järjestä etusivun osiot ja julkaise."),
    video: null,
  },
  {
    slug: "fanpage",
    course: "o-reach",
    guide: "fanpage",
    title: l3("Fanpage: đăng bài cho khách theo dõi", "Fanpage: post for your followers", "Fanisivu: julkaise seuraajillesi"),
    summary: l3("Đăng ảnh, video, hẹn giờ đăng và ghim bài quan trọng.", "Post photos and videos, schedule posts and pin the important ones.", "Julkaise kuvia ja videoita, ajasta julkaisut ja kiinnitä tärkeimmät."),
    video: null,
  },
  {
    slug: "kiem-tra-salon",
    course: "o-reach",
    title: l3("Kiểm tra salon trông thế nào trên mạng", "Check how your salon looks online", "Tarkista, miltä salonkisi näyttää verkossa"),
    summary: l3("Nhận điểm hiện diện trực tuyến cho Website, Google, Facebook và Instagram.", "Get an online-presence score for your website, Google, Facebook and Instagram.", "Saat verkkonäkyvyyspisteet sivustolle, Googlelle, Facebookille ja Instagramille."),
    video: null,
    href: "/salon-check",
  },
  /* ================= owners: day-to-day ================= */
  {
    slug: "lich-hen",
    course: "o-daily",
    guide: "bookings",
    fresh: true,
    title: l3("Lịch hẹn: thêm, dời, đổi trạng thái", "Calendar: add, move and update bookings", "Kalenteri: lisää, siirrä ja päivitä varauksia"),
    summary: l3("Kể cả lịch gọn trên điện thoại: nhấn giữ ô trống để tạo lịch, kéo để dời.", "Including the compact phone calendar: hold an empty slot to add, drag to move.", "Myös puhelimen tiivis kalenteri: pidä tyhjää kohtaa painettuna lisätäksesi, vedä siirtääksesi."),
    video: null,
  },
  {
    slug: "mau-lich-hen",
    course: "o-daily",
    fresh: true,
    title: l3("Màu riêng cho lịch online và giờ khách đặt", "Own colours for online bookings, and when they were made", "Omat värit verkkovarauksille ja varaushetki"),
    summary: l3("Phân biệt “Khách tự đặt online” với “Salon tự thêm” bằng màu, và xem khách đặt lúc nào.", "Tell “Booked online” from “Added by the salon” by colour, and see when each booking was made.", "Erota verkkovaraukset salongin lisäämistä väreillä ja näe, milloin varaus tehtiin."),
    video: null,
  },
  {
    slug: "thanh-toan-hoa-don",
    course: "o-daily",
    guide: "checkout",
    fresh: true,
    title: l3("Thanh toán tại quầy và hoá đơn", "Checkout and invoices", "Kassa ja laskut"),
    summary: l3("Tiền mặt, ngân hàng hoặc thẻ quà tặng; gửi hoá đơn qua email hoặc cho khách quét QR.", "Cash, bank or gift card; email the invoice or let the customer scan a QR code.", "Käteinen, pankki tai lahjakortti; lähetä lasku sähköpostilla tai QR-koodilla."),
    video: null,
  },
  {
    slug: "doanh-thu-nhan-vien",
    course: "o-daily",
    fresh: true,
    title: l3("Báo cáo thu nhập của nhân viên", "Staff income reports", "Työntekijöiden tuloraportit"),
    summary: l3("Nhân viên báo cáo từng lịch hẹn, chủ salon duyệt và xem tổng thu, tiền tip.", "Staff report each booking; the owner approves and sees totals and tips.", "Työntekijät raportoivat varaukset; omistaja hyväksyy ja näkee summat ja tipit."),
    video: null,
  },
  {
    slug: "xuat-excel",
    course: "o-daily",
    fresh: true,
    title: l3("Xuất Excel: doanh thu, khách hàng, đơn hàng", "Excel exports: income, customers, orders", "Excel-viennit: tulot, asiakkaat, tilaukset"),
    summary: l3("Tải bảng doanh thu, danh sách khách và đơn hàng về máy dưới dạng Excel.", "Download income sheets, customer lists and orders as Excel files.", "Lataa tulotaulukot, asiakasluettelot ja tilaukset Excel-tiedostoina."),
    video: null,
  },
  {
    slug: "khach-hang",
    course: "o-daily",
    guide: "customers",
    title: l3("Sổ khách hàng", "Customer book", "Asiakasrekisteri"),
    summary: l3("Nhóm VIP, khách quen, khách lâu chưa quay lại; ghi chú và lịch sử từng khách.", "VIPs, regulars and lapsed customers; notes and history for each one.", "VIP-asiakkaat, kanta-asiakkaat ja pitkään poissa olleet; muistiinpanot ja historia."),
    video: null,
  },
  {
    slug: "tin-nhan-ai",
    course: "o-daily",
    guide: "ai-chat",
    title: l3("Tin nhắn và trợ lý AI trả lời khách", "Messages and the AI assistant", "Viestit ja tekoälyavustaja"),
    summary: l3("Trả lời khách trong Hộp thư và bật trợ lý AI khi bạn vắng mặt.", "Answer customers in the inbox and let the AI reply while you're away.", "Vastaa asiakkaille ja anna tekoälyn vastata, kun olet poissa."),
    video: null,
  },
  {
    slug: "danh-gia-google",
    course: "o-daily",
    guide: "reviews",
    title: l3("Đánh giá và Google", "Reviews and Google", "Arvostelut ja Google"),
    summary: l3("Đăng đánh giá lên trang, trả lời khách và mời khách đánh giá trên Google.", "Publish reviews, reply to them and invite customers to review you on Google.", "Julkaise arvostelut, vastaa niihin ja pyydä Google-arvosteluja."),
    video: null,
  },
  /* ================= owners: retain ================= */
  {
    slug: "the-khach-quen",
    course: "o-retain",
    fresh: true,
    title: l3("Thẻ tích điểm miễn phí trong 30 giây", "A free stamp card in 30 seconds", "Ilmainen leimakortti 30 sekunnissa"),
    summary: l3(
      "Tạo thẻ tích điểm có mã QR cho khách quen: cài số dấu và phần thưởng, cấp thẻ qua email, đóng dấu mỗi lần khách đến.",
      "Create a QR stamp card for your regulars: set the stamps and the reward, issue cards by email and stamp at every visit.",
      "Luo QR-leimakortti kanta-asiakkaille: aseta leimat ja palkinto, lähetä kortit sähköpostilla ja leimaa joka käynnillä."
    ),
    video: video("the-khach-quen", 117, "2026-11-16"),
    href: "/loyalty-lite",
    hrefLabel: l3("Tạo thẻ tích điểm", "Create a stamp card", "Luo leimakortti"),
    steps: [
      l3(
        "Mở varaaai.com, kéo xuống cuối trang và bấm “Thẻ tích điểm miễn phí”. Bấm “Dùng thử ngay — không cần email”, hoặc nhập “Tên salon” và “Email của bạn” rồi bấm “Tạo thẻ miễn phí”.",
        "Open varaaai.com, scroll to the bottom and press “Free loyalty card”. Press “Try it now — no email needed”, or enter your salon name and email and press “Create free card”.",
        "Avaa varaaai.com, vieritä alas ja avaa ilmainen kanta-asiakaskortti. Paina ”Kokeile heti” tai anna salongin nimi ja sähköposti ja luo kortti."
      ),
      l3(
        "Ở “Chương trình tích điểm”, chọn “Số dấu để nhận ưu đãi”, ghi “Phần thưởng” (ví dụ “Giảm 15% lần tiếp theo”) và bấm “Lưu”.",
        "Under “Loyalty programme”, choose the number of stamps for a reward, write the reward (e.g. “15% off next time”) and press “Save”.",
        "Valitse kohdassa ”Kanta-asiakasohjelma” palkintoon tarvittavien leimojen määrä, kirjoita palkinto (esim. ”-15 % seuraavasta”) ja tallenna."
      ),
      l3(
        "Ở “Cấp thẻ cho khách”, nhập “Tên khách” và “Email của khách”, rồi bấm “Cấp thẻ và gửi email”. Khách không có email thì chụp mã QR trên màn hình.",
        "Under “Issue a card”, enter the customer's name and email and press “Issue card and send email”. Without an email, the customer photographs the QR code.",
        "Anna kohdassa ”Anna kortti asiakkaalle” nimi ja sähköposti ja lähetä kortti. Ilman sähköpostia asiakas kuvaa QR-koodin."
      ),
      l3(
        "Mỗi lần khách đến: ở “Quét thẻ khi khách đến”, bấm “Mở camera quét mã” hoặc gõ mã thẻ, rồi bấm “Đóng 1 dấu”.",
        "At every visit: under “Scan the card”, press “Open camera to scan” or type the card code, then press “Add 1 stamp”.",
        "Joka käynnillä: avaa kamera ja skannaa kortti tai kirjoita kortin koodi ja paina ”Lisää 1 leima”."
      ),
      l3("Khách đủ dấu và dùng ưu đãi: bấm “Đổi ưu đãi” — thẻ bắt đầu vòng mới.", "When the card is full and the customer uses the reward, press “Redeem reward” — the card starts a new round.", "Kun kortti on täynnä ja asiakas käyttää palkinnon, paina ”Käytä palkinto” — kortti alkaa alusta."),
      l3(
        "Nếu vào bằng “Dùng thử”, nhập email và bấm “Lưu salon” để không mất thẻ khi đổi máy hay xoá trình duyệt.",
        "If you started with the trial, enter your email and press “Save salon” so the cards aren't lost when you change device or clear the browser.",
        "Jos aloitit kokeilulla, anna sähköpostisi ja tallenna salonki, jotta kortit eivät katoa laitteen vaihtuessa."
      ),
    ],
    tips: [
      l3("Khách không cần cài ứng dụng: thẻ mở ngay trên điện thoại từ email.", "Customers don't need an app: the card opens on their phone straight from the email.", "Asiakas ei tarvitse sovellusta: kortti aukeaa puhelimessa suoraan sähköpostista."),
      l3("Cài đặt chương trình áp dụng cho mọi thẻ, kể cả thẻ đã cấp.", "Programme settings apply to every card, including ones already issued.", "Ohjelman asetukset koskevat kaikkia kortteja, myös jo annettuja."),
    ],
    quiz: [
      {
        q: l3("Khách không có email thì nhận thẻ bằng cách nào?", "How does a customer without an email get the card?", "Miten asiakas ilman sähköpostia saa kortin?"),
        options: [l3("Không cấp thẻ được", "They can't get one", "Hän ei voi saada korttia"), l3("Chụp lại mã QR trên màn hình", "By photographing the QR code on the screen", "Kuvaamalla QR-koodin näytöltä"), l3("Phải cài ứng dụng", "They must install an app", "Hänen on asennettava sovellus")],
        answer: 1,
        why: l3("Thẻ vẫn được cấp; khách chỉ cần chụp mã QR.", "The card is still issued; the customer just takes a picture of the QR code.", "Kortti annetaan silti; asiakas vain kuvaa QR-koodin."),
      },
      {
        q: l3("Mỗi lần khách đến, bạn bấm nút nào trên thẻ?", "Which button do you press at each visit?", "Mitä painiketta painat joka käynnillä?"),
        options: [l3("Đổi ưu đãi", "Redeem reward", "Käytä palkinto"), l3("Đóng 1 dấu", "Add 1 stamp", "Lisää 1 leima"), l3("Lưu salon", "Save salon", "Tallenna salonki")],
        answer: 1,
        why: l3("“Đóng 1 dấu” mỗi lần đến; “Đổi ưu đãi” chỉ khi khách dùng phần thưởng.", "“Add 1 stamp” at each visit; “Redeem reward” only when the reward is used.", "”Lisää 1 leima” joka käynnillä; ”Käytä palkinto” vain, kun palkinto käytetään."),
      },
      {
        q: l3("Vì sao nên bấm “Lưu salon” sau khi dùng thử?", "Why press “Save salon” after trying it out?", "Miksi salonki kannattaa tallentaa kokeilun jälkeen?"),
        options: [
          l3("Để không mất thẻ của khách khi đổi máy hay xoá trình duyệt", "So cards aren't lost when you change device or clear the browser", "Jotta kortit eivät katoa, kun vaihdat laitetta tai tyhjennät selaimen"),
          l3("Để được tặng thêm dấu", "To get extra stamps", "Saadaksesi lisäleimoja"),
          l3("Vì dùng thử sẽ mất phí", "Because the trial costs money", "Koska kokeilu maksaa"),
        ],
        answer: 0,
        why: l3("Salon dùng thử chỉ gắn với trình duyệt này cho đến khi bạn lưu bằng email.", "A trial salon lives only in this browser until you save it with an email.", "Kokeilusalonki on vain tässä selaimessa, kunnes tallennat sen sähköpostilla."),
      },
    ],
  },
  {
    slug: "the-tich-diem",
    course: "o-retain",
    guide: "loyalty",
    title: l3("Thẻ tích điểm QR trong trang quản trị", "QR loyalty cards in the dashboard", "QR-kanta-asiakaskortit hallintapaneelissa"),
    summary: l3("Kích hoạt thẻ cho khách, bấm “Cộng 1 vé” khi khách đến và áp dụng giảm giá.", "Activate cards, press “Add 1 stamp” at each visit and apply the discount.", "Aktivoi kortit, lisää leima joka käynnillä ja käytä alennus."),
    video: null,
  },
  {
    slug: "khach-dan-khach",
    course: "o-retain",
    guide: "loyalty",
    title: l3("Khách dẫn khách: khách quen mang khách mới tới", "Referrals: regulars bring new customers", "Suosittelut: kanta-asiakkaat tuovat uusia asiakkaita"),
    summary: l3(
      "Mỗi thẻ tích điểm có link mời riêng. Bạn bè đặt lịch qua link và đến salon, người giới thiệu tự động nhận 2 vé.",
      "Every loyalty card has its own invite link. When a friend books through it and visits, the referrer gets 2 stamps automatically.",
      "Jokaisella kanta-asiakaskortilla on oma kutsulinkki. Kun ystävä varaa sen kautta ja käy salongissa, suosittelija saa automaattisesti 2 leimaa."
    ),
    // Filmed on 2026-11-01 in the old style (lots of on-screen text); to be remade in the
    // screen-first style with the Academy voice before it goes live here.
    video: null,
    href: "/business/dashboard/loyalty",
    hrefLabel: l3("Mở Thẻ tích điểm", "Open Loyalty cards", "Avaa kanta-asiakaskortit"),
    steps: [
      l3("Cài chương trình thẻ tích điểm và kích hoạt thẻ cho khách — link mời đã nằm sẵn trong thẻ.", "Set up the loyalty programme and activate cards — the invite link is already on each card.", "Ota kanta-asiakasohjelma käyttöön ja aktivoi kortit — kutsulinkki on jo jokaisessa kortissa."),
      l3("Khách mở thẻ, kéo xuống phần “Mời bạn bè” và bấm “Sao chép link mời” hoặc “Chia sẻ”.", "The customer opens the card, scrolls to “Invite friends” and presses “Copy invite link” or “Share”.", "Asiakas avaa kortin, vierittää kohtaan ”Kutsu ystäviä” ja kopioi tai jakaa kutsulinkin."),
      l3("Người bạn mở link, bấm “Đặt lịch ngay”, chọn dịch vụ và giờ. Link được ghi nhớ 60 ngày.", "The friend opens the link, presses “Book now” and picks a service and time. The link is remembered for 60 days.", "Ystävä avaa linkin, painaa ”Varaa nyt” ja valitsee palvelun ja ajan. Linkki muistetaan 60 päivää."),
      l3("Khi người bạn đến salon lần đầu, hệ thống tự cộng 2 vé cho người giới thiệu và gửi email báo.", "When the friend comes in for the first time, the referrer automatically gets 2 stamps and an email.", "Kun ystävä käy ensimmäistä kertaa, suosittelija saa automaattisesti 2 leimaa ja sähköpostin."),
    ],
    tips: [
      l3("Chỉ tính khách mới lần đầu đến tiệm, và khách không thể tự mời chính mình.", "Only first-time customers count, and nobody can invite themselves.", "Vain uudet asiakkaat lasketaan, eikä kukaan voi kutsua itseään."),
      l3("Nhắc khách tại quầy lúc khách vui nhất, và đặt một bảng nhỏ “Giới thiệu bạn bè — nhận 2 vé”.", "Mention it at the till when the customer is happiest, and put up a small “Refer a friend — get 2 stamps” sign.", "Mainitse siitä kassalla, kun asiakas on tyytyväisimmillään, ja laita esille pieni kyltti."),
    ],
    quiz: [
      {
        q: l3("Người giới thiệu nhận được gì khi bạn bè đến salon?", "What does the referrer get when the friend visits?", "Mitä suosittelija saa, kun ystävä käy salongissa?"),
        options: [l3("2 vé, tự động", "2 stamps, automatically", "2 leimaa automaattisesti"), l3("Tiền mặt", "Cash", "Käteistä"), l3("Không nhận được gì", "Nothing", "Ei mitään")],
        answer: 0,
        why: l3("Hệ thống tự cộng 2 vé và gửi email báo cho người giới thiệu.", "The system adds 2 stamps and emails the referrer.", "Järjestelmä lisää 2 leimaa ja lähettää suosittelijalle sähköpostin."),
      },
      {
        q: l3("Khi nào vé thưởng được cộng?", "When are the bonus stamps added?", "Milloin bonusleimat lisätään?"),
        options: [l3("Ngay khi gửi link", "As soon as the link is sent", "Heti kun linkki lähetetään"), l3("Khi bạn bè bấm vào link", "When the friend opens the link", "Kun ystävä avaa linkin"), l3("Khi bạn bè thật sự đến salon", "When the friend actually visits the salon", "Kun ystävä todella käy salongissa")],
        answer: 2,
        why: l3("Chỉ tặng vé khi khách mới đã đến — nên salon không tốn gì nếu không có khách.", "Stamps are given only once the new customer has come in, so it costs nothing otherwise.", "Leimat annetaan vasta, kun uusi asiakas on käynyt — muuten se ei maksa mitään."),
      },
      {
        q: l3("Link mời được ghi nhớ trong bao lâu?", "How long is an invite link remembered?", "Kuinka kauan kutsulinkki muistetaan?"),
        options: [l3("1 ngày", "1 day", "1 päivän"), l3("7 ngày", "7 days", "7 päivää"), l3("60 ngày", "60 days", "60 päivää")],
        answer: 2,
        why: l3("Người bạn đặt lịch muộn hơn trong vòng 60 ngày vẫn được tính.", "A friend who books later, within 60 days, still counts.", "Myöhemmin, 60 päivän sisällä varaava ystävä lasketaan silti."),
      },
    ],
  },
  {
    slug: "the-qua-tang-salon",
    course: "o-retain",
    guide: "gift-cards",
    fresh: true,
    title: l3("Thẻ quà tặng: tạo mẫu, bán và ghi nhận lần dùng", "Gift cards: design, sell and redeem", "Lahjakortit: luo, myy ja lunasta"),
    summary: l3("Tạo mẫu thẻ, gửi thẻ qua email, xác nhận thanh toán và kiểm tra mã khi khách đến.", "Create card designs, email cards, confirm payment and check the code at the visit.", "Luo korttimallit, lähetä kortit sähköpostilla, vahvista maksu ja tarkista koodi käynnillä."),
    video: null,
  },
  {
    slug: "email-marketing",
    course: "o-retain",
    guide: "marketing",
    title: l3("Email khuyến mãi và điểm Vara", "Promotional emails and Vara points", "Markkinointisähköpostit ja Vara-pisteet"),
    summary: l3("Chọn nhóm khách, soạn chiến dịch từ mẫu có sẵn, gửi ngay hoặc lên lịch.", "Pick an audience, write a campaign from a template and send now or schedule it.", "Valitse kohderyhmä, tee kampanja mallista ja lähetä heti tai ajasta."),
    video: null,
  },
  {
    slug: "san-pham-don-hang",
    course: "o-retain",
    guide: "products",
    title: l3("Bán sản phẩm và quản lý đơn hàng", "Sell products and manage orders", "Myy tuotteita ja hallitse tilauksia"),
    summary: l3("Mở cửa hàng online của salon, xác nhận đơn và báo khách qua email.", "Open your salon's online shop, confirm orders and notify customers by email.", "Avaa salongin verkkokauppa, vahvista tilaukset ja ilmoita asiakkaille sähköpostilla."),
    video: null,
  },
  /* ================= owners: grow ================= */
  {
    slug: "kho-hang",
    course: "o-grow",
    fresh: true,
    title: l3("Kho vật tư: quét nhập, quét lấy hàng", "Inventory: scan in, scan out", "Varasto: skannaa sisään ja ulos"),
    summary: l3("Theo dõi tồn kho, danh sách cần mua và in nhãn cho tủ.", "Track stock, see what to buy and print labels for your cupboards.", "Seuraa varastoa, katso ostettavat ja tulosta tarrat kaappeihin."),
    video: null,
  },
  {
    slug: "chi-nhanh",
    course: "o-grow",
    guide: "branches",
    title: l3("Nhiều chi nhánh", "Several branches", "Useita toimipisteitä"),
    summary: l3("Thêm chi nhánh, chuyển qua lại và dùng trang đặt lịch chung cho cả chuỗi.", "Add branches, switch between them and use one booking page for the chain.", "Lisää toimipisteitä, vaihda niiden välillä ja käytä ketjun yhteistä varaussivua."),
    video: null,
  },
  {
    slug: "tong-quan",
    course: "o-grow",
    guide: "overview",
    title: l3("Trang tổng quan và số liệu", "The overview and your numbers", "Yleiskatsaus ja luvut"),
    summary: l3("Doanh thu, lịch hẹn, dịch vụ bán chạy, hiệu suất nhân viên và lượt quét QR.", "Revenue, bookings, best-selling services, staff performance and QR scans.", "Liikevaihto, varaukset, suosituimmat palvelut, tiimin tulokset ja QR-skannaukset."),
    video: null,
  },
  {
    slug: "tien-ich-nhom",
    course: "o-grow",
    fresh: true,
    title: l3("Tiện ích nhóm: chat, thông báo, đào tạo nhân viên", "Team hub: chat, notices and staff training", "Tiimin työtila: chat, tiedotteet ja koulutus"),
    summary: l3("Không gian làm việc chung của salon cho chủ và nhân viên.", "A shared workspace for the owner and the staff.", "Yhteinen työtila omistajalle ja henkilökunnalle."),
    video: null,
  },
  {
    slug: "cong-tac-vien",
    course: "o-grow",
    guide: "affiliates",
    title: l3("Cộng tác viên giới thiệu khách", "Affiliates who bring customers", "Kumppanit, jotka tuovat asiakkaita"),
    summary: l3("Thêm người tiếp thị, đặt hoa hồng và theo dõi kết quả.", "Add affiliates, set their commission and follow the results.", "Lisää kumppaneita, aseta provisio ja seuraa tuloksia."),
    video: null,
  },
];
