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
    title: l3("Tạo tài khoản và đăng nhập", "Create an account and sign in", "Luo tili ja kirjaudu"),
    summary: l3(
      "Đăng ký trong một phút, đăng nhập, lấy lại mật khẩu khi quên, và xem các mục của tài khoản.",
      "Sign up in a minute, sign in, reset a forgotten password and find your way around your account.",
      "Rekisteröidy minuutissa, kirjaudu, palauta unohtunut salasana ja tutustu tilisi osioihin."
    ),
    video: video("tai-khoan", 66, "2026-11-16"),
    href: "/auth/sign-up",
    hrefLabel: l3("Tạo tài khoản", "Create an account", "Luo tili"),
    steps: [
      l3("Trên varaaai.com, bấm “Đăng ký” ở góc trên bên phải.", "On varaaai.com, press “Sign up” in the top right corner.", "Paina varaaai.comissa oikean yläkulman ”Rekisteröidy”."),
      l3(
        "Ở trang “Tạo tài khoản mới”, nhập “Họ và tên”, “Email”, “Số điện thoại”, “Mật khẩu” và “Xác nhận mật khẩu”.",
        "On “Create a new account”, enter your name, email, phone, a password and the password again.",
        "Anna nimi, sähköposti, puhelin, salasana ja salasana uudelleen."
      ),
      l3(
        "Chọn có nhận tin khuyến mãi “Qua email” hay “Qua tin nhắn văn bản” không, rồi bấm “Tạo tài khoản”.",
        "Choose whether you want offers by email or by text message, then press “Create account”.",
        "Valitse, haluatko tarjouksia sähköpostilla tai tekstiviestillä, ja paina ”Luo tili”."
      ),
      l3("Lần sau: bấm “Đăng nhập”, nhập Email và Mật khẩu.", "Next time: press “Sign in” and enter your email and password.", "Seuraavalla kerralla: paina ”Kirjaudu” ja anna sähköposti ja salasana."),
      l3(
        "Quên mật khẩu: bấm “Quên mật khẩu?”, nhập email, bấm “Gửi liên kết đặt lại” rồi làm theo email để chọn mật khẩu mới.",
        "Forgot it? Press “Forgot password?”, enter your email, press “Send reset link” and follow the email to choose a new one.",
        "Unohtuiko? Paina ”Unohditko salasanan?”, anna sähköposti, lähetä palautuslinkki ja valitse uusi salasana sähköpostin ohjeilla."
      ),
    ],
    tips: [
      l3(
        "Sau khi đăng nhập, bấm vào tên bạn ở góc trên để mở: Hồ sơ của tôi, Lịch hẹn của tôi, Thẻ tích điểm, Hộp thư, Đang theo dõi, Bảng tin.",
        "Once signed in, tap your name at the top to open: My profile, My bookings, Loyalty cards, Inbox, Following and Feed.",
        "Kirjautuneena napauta nimeäsi ylhäällä: Profiilini, Varaukseni, Kanta-asiakaskortit, Viestit, Seuratut ja Syöte."
      ),
    ],
    quiz: [
      {
        q: l3("Tạo tài khoản VaraaAi có mất phí không?", "Does a VaraaAi account cost anything?", "Maksaako VaraaAi-tili jotain?"),
        options: [l3("Có, trả theo tháng", "Yes, a monthly fee", "Kyllä, kuukausimaksu"), l3("Không, hoàn toàn miễn phí", "No, it's completely free", "Ei, se on täysin ilmainen"), l3("Miễn phí 7 ngày đầu", "Free for the first 7 days", "Ilmainen ensimmäiset 7 päivää")],
        answer: 1,
        why: l3("Khách hàng dùng VaraaAi miễn phí.", "VaraaAi is free for customers.", "VaraaAi on asiakkaille ilmainen."),
      },
      {
        q: l3("Quên mật khẩu thì làm gì?", "What do you do if you forget your password?", "Mitä teet, jos unohdat salasanasi?"),
        options: [
          l3("Tạo tài khoản mới", "Create a new account", "Luot uuden tilin"),
          l3("Bấm “Quên mật khẩu?” và nhập email để nhận liên kết đặt lại", "Press “Forgot password?” and enter your email to get a reset link", "Painat ”Unohditko salasanan?” ja annat sähköpostin saadaksesi palautuslinkin"),
          l3("Gọi cho salon", "Call the salon", "Soitat salonkiin"),
        ],
        answer: 1,
        why: l3("Liên kết đặt lại mật khẩu được gửi qua email.", "A reset link is sent to your email.", "Palautuslinkki lähetetään sähköpostiisi."),
      },
      {
        q: l3("Mục nào trong tài khoản cho bạn đổi email và mật khẩu?", "Where in your account do you change your email and password?", "Missä tilin osiossa vaihdat sähköpostin ja salasanan?"),
        options: [l3("Hồ sơ của tôi", "My profile", "Profiilini"), l3("Bảng tin", "Feed", "Syöte"), l3("Đang theo dõi", "Following", "Seuratut")],
        answer: 0,
        why: l3("“Hồ sơ của tôi” có ảnh đại diện, email và mật khẩu.", "“My profile” holds your photo, email and password.", "”Profiilini” sisältää kuvan, sähköpostin ja salasanan."),
      },
    ],
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
    video: video("lich-hen-cua-toi", 57, "2026-11-16"),
    href: "/account/bookings",
    hrefLabel: l3("Mở Lịch hẹn của tôi", "Open My bookings", "Avaa Varaukseni"),
    steps: [
      l3("Đăng nhập, bấm vào tên bạn ở góc trên rồi chọn “Lịch hẹn của tôi”.", "Sign in, tap your name at the top and choose “My bookings”.", "Kirjaudu, napauta nimeäsi ylhäällä ja valitse ”Varaukseni”."),
      l3(
        "Mỗi lịch hẹn ghi salon, dịch vụ, ngày giờ, số tiền và trạng thái (ví dụ “Đã xác nhận”).",
        "Each booking shows the salon, service, date and time, amount and status (e.g. “Confirmed”).",
        "Jokaisessa varauksessa näkyvät salonki, palvelu, aika, summa ja tila (esim. ”Vahvistettu”)."
      ),
      l3("Bấm “Xem thông tin đặt chỗ” để xem nhân viên, giờ hẹn, địa chỉ và số điện thoại salon.", "Press “View booking details” for the staff member, time, address and the salon's phone.", "Paina ”Näytä varauksen tiedot” nähdäksesi tekijän, ajan, osoitteen ja salongin puhelinnumeron."),
      l3(
        "Cần huỷ: bấm “Huỷ lịch hẹn”, đọc “Chính sách hủy đặt chỗ”, rồi bấm “Xác nhận hủy”. Lịch chuyển sang “Đã huỷ”.",
        "To cancel: press “Cancel booking”, read the cancellation policy, then press “Confirm cancellation”. The booking turns to “Cancelled”.",
        "Peruaksesi: paina ”Peru varaus”, lue peruutusehdot ja vahvista. Varauksen tilaksi tulee ”Peruttu”."
      ),
    ],
    tips: [
      l3("Đã quá thời hạn tự huỷ thì liên hệ trực tiếp với salon.", "If the self-cancellation deadline has passed, contact the salon directly.", "Jos oma perumisaika on umpeutunut, ota yhteyttä suoraan salonkiin."),
      l3("Sau khi làm xong dịch vụ, bấm “Đánh giá” ngay trên lịch hẹn để chia sẻ cảm nhận.", "After your visit, press “Review” on the booking to share how it went.", "Käynnin jälkeen paina varauksen ”Arvostele”-painiketta ja kerro kokemuksestasi."),
    ],
    quiz: [
      {
        q: l3("Muốn huỷ lịch hẹn, bạn vào đâu?", "Where do you go to cancel a booking?", "Missä varaus perutaan?"),
        options: [l3("Lịch hẹn của tôi", "My bookings", "Varaukseni"), l3("Bảng tin", "Feed", "Syöte"), l3("Hồ sơ của tôi", "My profile", "Profiilini")],
        answer: 0,
        why: l3("Mở lịch hẹn bằng “Xem thông tin đặt chỗ”, rồi bấm “Huỷ lịch hẹn”.", "Open the booking with “View booking details”, then press “Cancel booking”.", "Avaa varaus tiedoista ja paina ”Peru varaus”."),
      },
      {
        q: l3("Trước khi xác nhận huỷ, màn hình cho bạn xem gì?", "What are you shown before you confirm a cancellation?", "Mitä näet ennen perumisen vahvistamista?"),
        options: [l3("Chính sách huỷ đặt chỗ của salon", "The salon's cancellation policy", "Salongin peruutusehdot"), l3("Quảng cáo", "An advert", "Mainoksen"), l3("Mã giảm giá", "A discount code", "Alennuskoodin")],
        answer: 0,
        why: l3("Ví dụ: được tự huỷ đến 24 giờ trước giờ hẹn.", "For example: you may cancel yourself up to 24 hours before the appointment.", "Esimerkiksi: voit perua itse 24 tuntia ennen aikaa."),
      },
      {
        q: l3("Nếu đã quá thời hạn tự huỷ thì làm gì?", "What if the self-cancellation deadline has passed?", "Entä jos oma perumisaika on umpeutunut?"),
        options: [l3("Liên hệ trực tiếp với salon", "Contact the salon directly", "Ota yhteyttä salonkiin"), l3("Tạo tài khoản mới", "Create a new account", "Luo uusi tili"), l3("Không cần làm gì", "Do nothing", "Älä tee mitään")],
        answer: 0,
        why: l3("Salon có thể huỷ hoặc dời lịch giúp bạn.", "The salon can cancel or move the booking for you.", "Salonki voi perua tai siirtää varauksen puolestasi."),
      },
    ],
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
    video: video("dang-ky-salon", 77, "2026-11-16"),
    href: "/business/apply",
    hrefLabel: l3("Đăng ký salon", "Register your salon", "Rekisteröi salonki"),
    steps: [
      l3(
        "Trên trang chủ varaaai.com, bấm “Bạn là chủ salon? Đưa salon lên VaraaAi miễn phí”, rồi bấm “Đăng ký salon miễn phí”.",
        "On the varaaai.com home page, press “Are you a salon owner? Put your salon on VaraaAi for free”, then “Register your salon for free”.",
        "Paina varaaai.comin etusivulla salonkiyrittäjän linkkiä ja sitten ”Rekisteröi salonki ilmaiseksi”."
      ),
      l3(
        "Chưa có tài khoản: ở “Tạo tài khoản của bạn”, nhập “Họ và tên”, “Email”, “Mật khẩu” và “Xác nhận mật khẩu”.",
        "No account yet: under “Create your account”, enter your name, email, a password and the password again.",
        "Jos sinulla ei ole tiliä, anna kohdassa ”Luo tilisi” nimi, sähköposti, salasana ja salasana uudelleen."
      ),
      l3(
        "Nhập “Tên doanh nghiệp”, “Giới thiệu ngắn” và chọn “Danh mục dịch vụ”.",
        "Enter the business name and a short introduction, and choose your service categories.",
        "Anna yrityksen nimi ja lyhyt esittely ja valitse palvelukategoriat."
      ),
      l3(
        "Nhập “Địa chỉ”, chọn “Quốc gia” (quyết định múi giờ của lịch), “Thành phố” và “Số điện thoại”.",
        "Enter the address, choose the country (it sets your calendar's time zone), the city and the phone number.",
        "Anna osoite, valitse maa (se määrää kalenterin aikavyöhykkeen), kaupunki ja puhelinnumero."
      ),
      l3("Bấm “Gửi đăng ký”.", "Press “Submit”.", "Paina ”Lähetä”."),
      l3(
        "Mở email VaraaAi gửi và bấm “Xác minh email” — salon được kích hoạt ngay. Sau đó bấm “Vào trang quản trị”.",
        "Open the email from VaraaAi and press “Verify email” — the salon is live at once. Then press “Go to dashboard”.",
        "Avaa VaraaAin sähköposti ja paina ”Vahvista sähköposti” — salonki on heti käytössä. Siirry sitten hallintapaneeliin."
      ),
    ],
    tips: [l3("Chưa thấy email? Kiểm tra thư mục Spam hoặc Quảng cáo.", "No email? Check your Spam or Promotions folder.", "Eikö sähköpostia näy? Tarkista roskaposti- tai tarjouskansio.")],
    quiz: [
      {
        q: l3("Sau khi gửi đăng ký, salon được kích hoạt khi nào?", "After you submit, when does the salon go live?", "Milloin salonki aktivoituu lähettämisen jälkeen?"),
        options: [l3("Sau khi VaraaAi duyệt vài ngày", "After a few days of review", "Muutaman päivän tarkistuksen jälkeen"), l3("Ngay khi bạn bấm “Xác minh email”", "As soon as you press “Verify email”", "Heti kun painat ”Vahvista sähköposti”"), l3("Sau khi trả phí", "After you pay", "Maksun jälkeen")],
        answer: 1,
        why: l3("Xác minh email xong là salon hoạt động ngay, không phải chờ duyệt.", "Once the email is verified the salon is live — no waiting for a review.", "Kun sähköposti on vahvistettu, salonki on käytössä — ei odottelua."),
      },
      {
        q: l3("Vì sao phải chọn đúng “Quốc gia”?", "Why does the country have to be right?", "Miksi maa on valittava oikein?"),
        options: [l3("Vì nó quyết định múi giờ của lịch hẹn", "It sets the time zone of your calendar", "Se määrää kalenterin aikavyöhykkeen"), l3("Vì nó quyết định giá dịch vụ", "It sets your prices", "Se määrää hinnat"), l3("Không quan trọng", "It doesn't matter", "Sillä ei ole väliä")],
        answer: 0,
        why: l3("Giờ hẹn hiển thị theo múi giờ của quốc gia bạn chọn.", "Appointment times follow the time zone of the country you choose.", "Varausajat näytetään valitsemasi maan aikavyöhykkeessä."),
      },
      {
        q: l3("Chưa thấy email xác minh thì nên làm gì trước?", "No verification email — what do you check first?", "Vahvistusviestiä ei näy — mitä tarkistat ensin?"),
        options: [l3("Đăng ký lại từ đầu", "Register again from scratch", "Rekisteröidyt uudelleen"), l3("Xem thư mục Spam hoặc Quảng cáo", "The Spam or Promotions folder", "Roskaposti- tai tarjouskansion"), l3("Đổi số điện thoại", "Change your phone number", "Vaihdat puhelinnumeron")],
        answer: 1,
        why: l3("Email đôi khi rơi vào Spam hoặc Quảng cáo.", "The email sometimes lands in Spam or Promotions.", "Viesti päätyy joskus roskapostiin tai tarjouksiin."),
      },
    ],
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
    title: l3("Thêm dịch vụ và giá", "Add services and prices", "Lisää palvelut ja hinnat"),
    summary: l3("Tên, thời lượng, giá, tiền cọc và nhân viên thực hiện cho từng dịch vụ.", "Name, duration, price, deposit and who performs each service.", "Nimi, kesto, hinta, varausmaksu ja tekijät jokaiselle palvelulle."),
    video: video("dich-vu", 79, "2026-11-16"),
    href: "/business/dashboard/services",
    hrefLabel: l3("Mở mục Dịch vụ", "Open Services", "Avaa Palvelut"),
    steps: [
      l3("Trong trang quản trị, bấm mục “Dịch vụ”, rồi bấm “Thêm dịch vụ”.", "In the dashboard, open “Services” and press “Add service”.", "Avaa hallintapaneelissa ”Palvelut” ja paina ”Lisää palvelu”."),
      l3(
        "Ở “Thông tin cơ bản”, nhập “Tên dịch vụ”, chọn “Nhóm dịch vụ” và viết “Mô tả” ngắn.",
        "Under “Basics”, enter the service name, choose a group and write a short description.",
        "Anna kohdassa ”Perustiedot” palvelun nimi, valitse ryhmä ja kirjoita lyhyt kuvaus."
      ),
      l3(
        "Ở “Thời gian & giá”, chọn “Thời lượng”, “Thời gian dọn dẹp sau”, “Đơn vị tiền tệ”, “Giá” và “Tiền cọc” nếu cần.",
        "Under “Time & price”, set the duration, the clean-up time after, the currency, the price and a deposit if you want one.",
        "Aseta kohdassa ”Aika ja hinta” kesto, siivousaika, valuutta, hinta ja halutessasi varausmaksu."
      ),
      l3(
        "Ở “Nhân viên thực hiện”, chọn những người làm được dịch vụ này (hoặc “Chọn tất cả”).",
        "Under “Staff”, choose who can perform the service (or “Select all”).",
        "Valitse kohdassa ”Tekijät”, ketkä tekevät palvelun (tai ”Valitse kaikki”)."
      ),
      l3("Bấm “Lưu” ở cuối trang.", "Press “Save” at the bottom.", "Paina lopuksi ”Tallenna”."),
    ],
    tips: [
      l3(
        "Mỗi dịch vụ có nút “Sửa”, “Nhân bản”, “Add-on” và “Ẩn”; kéo biểu tượng ⋮⋮ bên trái để sắp xếp thứ tự khách nhìn thấy.",
        "Each service has “Edit”, “Duplicate”, “Add-on” and “Hide”; drag the ⋮⋮ handle on the left to set the order customers see.",
        "Jokaisella palvelulla on ”Muokkaa”, ”Monista”, ”Lisäpalvelu” ja ”Piilota”; vedä vasemman reunan ⋮⋮-kahvasta järjestyksen muuttamiseksi."
      ),
      l3("Ô màu vàng “Khách thấy: …” cho xem trước thời lượng và giá khách sẽ thấy.", "The yellow “Customers see: …” box previews the duration and price shown to customers.", "Keltainen ”Asiakas näkee: …” -ruutu näyttää keston ja hinnan asiakkaan silmin."),
    ],
    quiz: [
      {
        q: l3("“Thời gian dọn dẹp sau” dùng để làm gì?", "What is “clean-up time after” for?", "Mihin ”siivousaika” on tarkoitettu?"),
        options: [l3("Khoảng nghỉ giữa hai khách", "A gap between two customers", "Tauko kahden asiakkaan välissä"), l3("Thời gian khách chờ", "The time customers wait", "Asiakkaan odotusaika"), l3("Giờ đóng cửa", "Closing time", "Sulkemisaika")],
        answer: 0,
        why: l3("Lịch sẽ tự chừa khoảng trống này sau mỗi lần làm.", "The calendar leaves this gap free after each appointment.", "Kalenteri jättää tämän tauon jokaisen varauksen jälkeen."),
      },
      {
        q: l3("Muốn tạo nhanh một dịch vụ gần giống dịch vụ đã có, bấm nút nào?", "Which button quickly makes a service similar to an existing one?", "Millä painikkeella teet nopeasti samankaltaisen palvelun?"),
        options: [l3("Ẩn", "Hide", "Piilota"), l3("Nhân bản", "Duplicate", "Monista"), l3("Add-on", "Add-on", "Lisäpalvelu")],
        answer: 1,
        why: l3("“Nhân bản” sao chép dịch vụ để bạn chỉ cần sửa tên và giá.", "“Duplicate” copies the service so you only change the name and price.", "”Monista” kopioi palvelun, joten muutat vain nimen ja hinnan."),
      },
      {
        q: l3("Phần “Nhân viên thực hiện” quyết định điều gì?", "What does the “Staff” section decide?", "Mitä ”Tekijät”-osio määrää?"),
        options: [l3("Ai làm được dịch vụ này", "Who can perform this service", "Kuka voi tehdä palvelun"), l3("Lương nhân viên", "Staff salaries", "Henkilökunnan palkat"), l3("Giờ mở cửa", "Opening hours", "Aukioloajat")],
        answer: 0,
        why: l3("Khách chỉ đặt được nhân viên đã được chọn cho dịch vụ.", "Customers can only book staff who are assigned to the service.", "Asiakas voi varata vain palveluun valitun tekijän."),
      },
    ],
  },
  {
    slug: "nhan-vien",
    course: "o-start",
    guide: "staff",
    title: l3("Thêm nhân viên và phân quyền", "Add staff and set permissions", "Lisää työntekijät ja oikeudet"),
    summary: l3("Thêm nhân viên, chọn dịch vụ họ làm và mục nào họ được xem.", "Add staff, choose the services they perform and what each person may see.", "Lisää työntekijät, valitse heidän palvelunsa ja mitä kukin saa nähdä."),
    video: video("nhan-vien", 64, "2026-11-16"),
    href: "/business/dashboard/staff",
    hrefLabel: l3("Mở mục Nhân viên", "Open Staff", "Avaa Henkilökunta"),
    steps: [
      l3("Bấm mục “Nhân viên”, rồi bấm “Thêm nhân viên”.", "Open “Staff” and press “Add staff member”.", "Avaa ”Henkilökunta” ja paina ”Lisää työntekijä”."),
      l3(
        "Ở “Hồ sơ”, tải ảnh đại diện, nhập “Tên nhân viên”, “Chức danh” và “Giới thiệu”.",
        "Under “Profile”, upload a photo and enter the name, job title and an introduction.",
        "Lataa kohdassa ”Profiili” kuva ja anna nimi, tehtävänimike ja esittely."
      ),
      l3("Ở “Dịch vụ thực hiện”, chọn những dịch vụ người này làm được.", "Under “Services”, choose what this person can do.", "Valitse kohdassa ”Palvelut”, mitä hän tekee."),
      l3(
        "Ở “Tài khoản & quyền truy cập”, nhập email và mật khẩu nếu muốn nhân viên tự đăng nhập, rồi chọn vai trò: Kỹ thuật viên, Lễ tân hoặc Quản lý.",
        "Under “Account & access”, enter an email and password if they should sign in themselves, then pick a role: Technician, Receptionist or Manager.",
        "Anna kohdassa ”Tili ja käyttöoikeudet” sähköposti ja salasana, jos hän kirjautuu itse, ja valitse rooli: tekijä, vastaanotto tai esihenkilö."
      ),
      l3("Bật tắt từng mục ở “Được xem những mục nào” nếu cần, rồi bấm “Lưu”.", "Fine-tune under “What they may see” if needed, then press “Save”.", "Hienosäädä kohdassa ”Mitä hän saa nähdä” ja paina ”Tallenna”."),
    ],
    tips: [
      l3(
        "Trong danh sách, bấm “Lịch làm việc” để đặt giờ làm riêng cho từng người, “Cho nghỉ việc” khi họ không còn làm.",
        "In the list, “Working hours” sets a person's own schedule and “Remove from staff” is for when they leave.",
        "Luettelossa ”Työajat” asettaa oman aikataulun ja ”Poista henkilökunnasta” on lähtevälle työntekijälle."
      ),
    ],
    quiz: [
      {
        q: l3("Vai trò nào chỉ xem được lịch hẹn của chính mình?", "Which role sees only their own bookings?", "Mikä rooli näkee vain omat varauksensa?"),
        options: [l3("Kỹ thuật viên", "Technician", "Tekijä"), l3("Lễ tân", "Receptionist", "Vastaanotto"), l3("Quản lý", "Manager", "Esihenkilö")],
        answer: 0,
        why: l3("Lễ tân xem lịch cả tiệm; Quản lý xem được mọi mục.", "A receptionist sees the whole salon's calendar; a manager sees every section.", "Vastaanotto näkee koko salongin kalenterin; esihenkilö näkee kaikki osiot."),
      },
      {
        q: l3("Vì sao phải chọn “Dịch vụ thực hiện” cho nhân viên?", "Why choose a staff member's services?", "Miksi työntekijälle valitaan palvelut?"),
        options: [l3("Để tính lương", "To calculate pay", "Palkan laskemiseksi"), l3("Để khách chỉ đặt được họ cho đúng dịch vụ họ làm", "So customers can only book them for what they do", "Jotta asiakas voi varata hänet vain hänen tekemiinsä palveluihin"), l3("Không bắt buộc, không ảnh hưởng gì", "It makes no difference", "Sillä ei ole merkitystä")],
        answer: 1,
        why: l3("Trang đặt lịch chỉ hiện nhân viên được chọn cho dịch vụ đó.", "The booking page only offers staff assigned to that service.", "Varaussivu näyttää vain palveluun valitut tekijät."),
      },
      {
        q: l3("Muốn đặt giờ làm riêng cho một nhân viên, bấm nút nào?", "Which button sets one person's own working hours?", "Mistä asetetaan yhden työntekijän omat työajat?"),
        options: [l3("Lịch làm việc", "Working hours", "Työajat"), l3("Cho nghỉ việc", "Remove from staff", "Poista henkilökunnasta"), l3("Thêm nhân viên", "Add staff member", "Lisää työntekijä")],
        answer: 0,
        why: l3("“Lịch làm việc” nằm ngay trên thẻ của từng nhân viên.", "“Working hours” is on each person's card.", "”Työajat” on jokaisen työntekijän kortissa."),
      },
    ],
  },
  {
    slug: "gio-mo-cua",
    course: "o-start",
    guide: "hours",
    title: l3("Giờ mở cửa và ngày nghỉ", "Opening hours and days off", "Aukioloajat ja vapaapäivät"),
    summary: l3("Lịch hằng tuần, nhiều ca trong ngày, ngày nghỉ lễ.", "Weekly schedule, several shifts a day and holidays.", "Viikkoaikataulu, useita vuoroja päivässä ja pyhäpäivät."),
    video: video("gio-mo-cua", 49, "2026-11-16"),
    href: "/business/dashboard/hours",
    hrefLabel: l3("Mở mục Giờ mở cửa", "Open Opening hours", "Avaa Aukioloajat"),
    steps: [
      l3(
        "Bấm mục “Giờ mở cửa”. Ở “Lịch hằng tuần”, bấm một “Mẫu nhanh” (ví dụ T2–T7 · 9:00–19:00) để điền sẵn cả tuần.",
        "Open “Opening hours”. Under “Weekly schedule”, press a quick preset (e.g. Mon–Sat 9:00–19:00) to fill the whole week.",
        "Avaa ”Aukioloajat”. Täytä koko viikko pikamallilla (esim. ma–la 9.00–19.00)."
      ),
      l3(
        "Chỉnh từng ngày: gạt công tắc để bật/tắt ngày, sửa giờ mở và giờ đóng; bấm “Thêm ca” nếu salon nghỉ trưa.",
        "Adjust single days: switch a day on or off and edit the opening and closing times; press “Add shift” if you close for lunch.",
        "Muokkaa yksittäisiä päiviä: kytke päivä päälle tai pois ja muuta ajat; lisää toinen vuoro, jos pidät lounastauon."
      ),
      l3("Bấm “Lưu giờ mở cửa”.", "Press “Save opening hours”.", "Paina ”Tallenna aukioloajat”."),
      l3(
        "Ở “Ngày nghỉ lễ & ngày đóng cửa”, chọn “Từ ngày”, “Đến ngày”, ghi lý do rồi bấm “Thêm ngày nghỉ” — hoặc bấm một gợi ý ngày lễ có sẵn.",
        "Under “Holidays & closed days”, choose the dates, write a reason and press “Add day off” — or tap one of the suggested holidays.",
        "Valitse kohdassa ”Pyhät ja suljetut päivät” päivät, kirjoita syy ja lisää vapaapäivä — tai napauta ehdotettua pyhäpäivää."
      ),
    ],
    tips: [
      l3("Khách chỉ đặt được lịch trong giờ mở cửa, và không đặt được vào ngày nghỉ.", "Customers can only book within opening hours, and never on a closed day.", "Asiakkaat voivat varata vain aukioloaikoina, eivät koskaan suljettuina päivinä."),
    ],
    quiz: [
      {
        q: l3("Cách nhanh nhất để điền giờ mở cửa cho cả tuần?", "What's the quickest way to fill the whole week?", "Mikä on nopein tapa täyttää koko viikko?"),
        options: [l3("Bấm một “Mẫu nhanh”", "Press a quick preset", "Painaa pikamallia"), l3("Gõ từng ngày một", "Type each day by hand", "Kirjoittaa joka päivä käsin"), l3("Gọi hỗ trợ", "Call support", "Soittaa tukeen")],
        answer: 0,
        why: l3("Mẫu nhanh điền sẵn mọi ngày, sau đó bạn vẫn chỉnh được từng ngày.", "A preset fills every day, and you can still adjust single days afterwards.", "Pikamalli täyttää kaikki päivät, ja voit silti muokata yksittäisiä päiviä."),
      },
      {
        q: l3("Salon nghỉ trưa thì làm thế nào?", "What do you do if the salon closes for lunch?", "Mitä teet, jos salonki on kiinni lounasaikaan?"),
        options: [l3("Bấm “Thêm ca” để có ca thứ hai trong ngày", "Press “Add shift” for a second shift that day", "Lisäät päivälle toisen vuoron"), l3("Tắt cả ngày đó", "Switch the whole day off", "Suljet koko päivän"), l3("Không làm được", "It can't be done", "Se ei onnistu")],
        answer: 0,
        why: l3("Mỗi ngày có thể có hai ca, khoảng giữa là giờ nghỉ.", "A day can have two shifts; the gap between them is the break.", "Päivässä voi olla kaksi vuoroa; niiden väli on tauko."),
      },
      {
        q: l3("Vào ngày đã thêm ở “Ngày nghỉ lễ & ngày đóng cửa”, khách có đặt lịch được không?", "Can customers book on a day added under “Holidays & closed days”?", "Voiko asiakas varata päivälle, joka on lisätty suljetuksi?"),
        options: [l3("Có", "Yes", "Kyllä"), l3("Không", "No", "Ei"), l3("Chỉ buổi sáng", "Mornings only", "Vain aamulla")],
        answer: 1,
        why: l3("Những ngày này khách không đặt được, kể cả khi là ngày làm việc trong tuần.", "Those days can't be booked even if they are normal working days.", "Niille päiville ei voi varata, vaikka ne olisivat tavallisia työpäiviä."),
      },
    ],
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
    video: video("bang-gia", 91, "2026-11-16"),
    href: "/tools/price-list",
    hrefLabel: l3("Mở công cụ tạo bảng giá", "Open the price-list maker", "Avaa hinnastotyökalu"),
    steps: [
      l3(
        "Mở varaaai.com, kéo xuống cuối trang và bấm “Tạo bảng giá miễn phí”. Ở “Thông tin salon”, nhập tên salon, địa chỉ và số điện thoại.",
        "Open varaaai.com, scroll to the bottom and press “Create a free price list”. Under “Salon details”, enter the name, address and phone.",
        "Avaa varaaai.com, vieritä alas ja avaa ilmainen hinnastotyökalu. Anna salongin nimi, osoite ja puhelin."
      ),
      l3(
        "Ở “Ngôn ngữ & tiền tệ”, chọn các ngôn ngữ hiện trên bảng giá và loại tiền. Nút “Dịch tự động” dịch tên dịch vụ giúp bạn.",
        "Under “Languages & currency”, choose the languages on the list and the currency. “Translate automatically” translates service names for you.",
        "Valitse kohdassa ”Kielet ja valuutta” hinnaston kielet ja valuutta. Automaattinen käännös kääntää palvelujen nimet."
      ),
      l3(
        "Ở “Dịch vụ & giá”, bấm một danh mục (Nail & móng, Cắt tóc, Spa & massage…), bấm “Thêm dịch vụ” rồi điền “Tên dịch vụ”, “Giá” và “Phút”.",
        "Under “Services & prices”, pick a category (nails, hair, spa…), press “Add service” and fill in the name, price and minutes.",
        "Valitse kohdassa ”Palvelut ja hinnat” kategoria, paina ”Lisää palvelu” ja täytä nimi, hinta ja minuutit."
      ),
      l3(
        "Giá chỉ là mức khởi điểm thì đánh dấu “Giá “từ””; muốn giải thích thêm thì bấm “Thêm mô tả”.",
        "Tick “Price ‘from’” if it is a starting price; press “Add description” to explain a service.",
        "Valitse ”Hinta alkaen”, jos hinta on lähtöhinta; lisää kuvaus tarvittaessa."
      ),
      l3(
        "Ở “Mã QR đặt lịch”, dán link trang đặt lịch của salon để khách quét mã là đặt được lịch.",
        "Under “Booking QR code”, paste your booking link so customers can scan and book.",
        "Liitä kohtaan ”Varaus-QR-koodi” varauslinkkisi, jotta asiakas voi skannata ja varata."
      ),
      l3(
        "Ở “Thiết kế”, chọn mẫu (Tối giản, Sang trọng, Màu sắc), “Màu chủ đạo” và khổ giấy.",
        "Under “Design”, choose a style (Minimal, Elegant, Colourful), a main colour and a paper size.",
        "Valitse kohdassa ”Ulkoasu” tyyli (Pelkistetty, Tyylikäs, Värikäs), pääväri ja paperikoko."
      ),
      l3("Bấm “Xem trước”, rồi “Tải PDF” để in hoặc “Tải PNG” để đăng mạng xã hội.", "Press “Preview”, then “Download PDF” to print or “Download PNG” for social media.", "Paina ”Esikatselu” ja sitten ”Lataa PDF” tulostusta tai ”Lataa PNG” somea varten."),
    ],
    tips: [
      l3(
        "Đăng nhập rồi bấm “Lưu vào tài khoản” để lần sau sửa tiếp bảng giá.",
        "Sign in and press “Save to my account” to keep the list and edit it later.",
        "Kirjaudu ja tallenna hinnasto tilillesi, niin voit muokata sitä myöhemmin."
      ),
    ],
    quiz: [
      {
        q: l3("Nút nào giúp dịch tên dịch vụ sang ngôn ngữ khác?", "Which button translates service names into other languages?", "Mikä painike kääntää palvelujen nimet muille kielille?"),
        options: [l3("Dịch tự động", "Translate automatically", "Käännä automaattisesti"), l3("Thêm mô tả", "Add description", "Lisää kuvaus"), l3("Xem trước", "Preview", "Esikatselu")],
        answer: 0,
        why: l3("“Dịch tự động” nằm trong phần Ngôn ngữ & tiền tệ.", "“Translate automatically” is in the Languages & currency section.", "Automaattinen käännös on kielten ja valuutan osiossa."),
      },
      {
        q: l3("Khi nào nên đánh dấu ô “Giá “từ””?", "When should you tick “Price ‘from’”?", "Milloin valitaan ”Hinta alkaen”?"),
        options: [l3("Khi giá chỉ là mức khởi điểm", "When the price is only a starting price", "Kun hinta on vain lähtöhinta"), l3("Khi dịch vụ miễn phí", "When the service is free", "Kun palvelu on ilmainen"), l3("Khi muốn ẩn giá", "When you want to hide the price", "Kun haluat piilottaa hinnan")],
        answer: 0,
        why: l3("Bảng giá sẽ ghi “từ …” trước con số.", "The list then shows “from …” before the amount.", "Hinnastossa näkyy silloin ”alkaen …”."),
      },
      {
        q: l3("Thêm mã QR đặt lịch vào bảng giá để làm gì?", "Why add a booking QR code to the price list?", "Miksi hinnastoon lisätään varaus-QR-koodi?"),
        options: [l3("Để trang trí", "For decoration", "Koristeeksi"), l3("Để khách quét mã là đặt được lịch ngay", "So customers can scan and book straight away", "Jotta asiakas voi skannata ja varata heti"), l3("Để tính tiền", "To take payment", "Maksun ottamiseksi")],
        answer: 1,
        why: l3("Mã QR dẫn khách thẳng tới trang đặt lịch của salon.", "The code takes customers straight to your booking page.", "Koodi vie asiakkaan suoraan varaussivullesi."),
      },
    ],
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
    video: video("kiem-tra-salon", 93, "2026-11-16"),
    href: "/salon-check",
    hrefLabel: l3("Kiểm tra salon của tôi", "Check my salon", "Tarkista salonkini"),
    steps: [
      l3(
        "Mở varaaai.com, kéo xuống cuối trang và bấm “Kiểm tra salon miễn phí”.",
        "Open varaaai.com, scroll to the bottom and press “Free salon check”.",
        "Avaa varaaai.com, vieritä alas ja avaa ilmainen salonkitarkistus."
      ),
      l3(
        "Nhập “Tên salon” và “Địa chỉ salon”, chọn “Loại hình salon”, và điền “Website” nếu có.",
        "Enter the salon name and address, choose the type of salon and add your website if you have one.",
        "Anna salongin nimi ja osoite, valitse salongin tyyppi ja lisää verkkosivusto, jos sinulla on sellainen."
      ),
      l3(
        "Trả lời “Salon đã có hồ sơ Google doanh nghiệp chưa?” (Đã có / Chưa có / Không chắc), rồi bấm “Kiểm tra miễn phí ngay”.",
        "Answer “Does the salon have a Google Business Profile?” (Yes / No / Not sure), then press “Check for free now”.",
        "Vastaa, onko salongilla Google-yritysprofiili (Kyllä / Ei / En ole varma), ja käynnistä tarkistus."
      ),
      l3(
        "Đọc “Điểm hiện diện trực tuyến” (trên 100) và điểm từng kênh: Website, Hồ sơ Google, Facebook, Instagram. Bấm “Xem chi tiết” để biết vì sao.",
        "Read your online-presence score (out of 100) and the score of each channel: website, Google profile, Facebook, Instagram. “See details” explains why.",
        "Lue verkkonäkyvyyspisteesi (asteikolla 0–100) ja kanavakohtaiset pisteet. ”Näytä tiedot” kertoo syyt."
      ),
      l3(
        "Xem “Cơ hội lớn nhất của bạn”: mỗi điểm đều có mục “Nên làm gì”.",
        "Look at “Your biggest opportunities”: each point comes with “What to do”.",
        "Katso ”Suurimmat mahdollisuutesi”: jokaisessa kohdassa on ”Mitä tehdä”."
      ),
      l3("Bấm “In / Lưu PDF” để giữ báo cáo, hoặc “Kiểm tra salon khác”.", "Press “Print / Save PDF” to keep the report, or “Check another salon”.", "Tallenna raportti painikkeella ”Tulosta / Tallenna PDF” tai tarkista toinen salonki."),
    ],
    tips: [
      l3("Không cần email hay đăng ký; kết quả hiện ngay trên trang.", "No email or sign-up needed; the result appears right on the page.", "Sähköpostia tai rekisteröitymistä ei tarvita; tulos näkyy heti sivulla."),
      l3("Làm xong từng việc được gợi ý rồi kiểm tra lại để thấy điểm tăng.", "Fix the suggested points one by one, then check again to see the score rise.", "Korjaa ehdotetut kohdat yksi kerrallaan ja tarkista uudelleen nähdäksesi pisteiden nousun."),
    ],
    quiz: [
      {
        q: l3("Công cụ chấm điểm những kênh nào?", "Which channels does the tool score?", "Mitkä kanavat työkalu pisteyttää?"),
        options: [l3("Website, Google, Facebook và Instagram", "Website, Google, Facebook and Instagram", "Verkkosivusto, Google, Facebook ja Instagram"), l3("Chỉ website", "Only the website", "Vain verkkosivusto"), l3("TikTok và YouTube", "TikTok and YouTube", "TikTok ja YouTube")],
        answer: 0,
        why: l3("Bốn kênh được chấm và xếp loại Mạnh, Khá hoặc Yếu.", "Four channels are scored and rated strong, fair or weak.", "Neljä kanavaa pisteytetään ja luokitellaan."),
      },
      {
        q: l3("Phần nào cho biết việc cần làm trước tiên?", "Which part tells you what to do first?", "Mikä osa kertoo, mitä tehdä ensin?"),
        options: [l3("Cơ hội lớn nhất của bạn", "Your biggest opportunities", "Suurimmat mahdollisuutesi"), l3("Chân trang", "The footer", "Alatunniste"), l3("Mã QR", "The QR code", "QR-koodi")],
        answer: 0,
        why: l3("Mỗi điểm trong phần này có kèm “Nên làm gì”.", "Each point there comes with “What to do”.", "Jokaisessa kohdassa on ”Mitä tehdä”."),
      },
      {
        q: l3("Dùng công cụ kiểm tra salon có cần đăng ký không?", "Do you need to sign up to use the salon check?", "Tarvitaanko salonkitarkistukseen rekisteröityminen?"),
        options: [l3("Có, cần email", "Yes, an email is required", "Kyllä, sähköposti vaaditaan"), l3("Không cần email, không cần đăng ký", "No email and no sign-up", "Ei sähköpostia eikä rekisteröitymistä"), l3("Chỉ chủ salon đã trả phí", "Only paying salons", "Vain maksavat salongit")],
        answer: 1,
        why: l3("Công cụ miễn phí và mở cho mọi người.", "The tool is free and open to everyone.", "Työkalu on ilmainen ja avoin kaikille."),
      },
    ],
  },
  /* ================= owners: day-to-day ================= */
  {
    slug: "lich-hen",
    course: "o-daily",
    guide: "bookings",
    fresh: true,
    title: l3("Lịch hẹn: xem, thêm và cập nhật", "Calendar: view, add and update bookings", "Kalenteri: katso, lisää ja päivitä varauksia"),
    summary: l3("Kể cả lịch gọn trên điện thoại: nhấn giữ ô trống để tạo lịch, kéo để dời.", "Including the compact phone calendar: hold an empty slot to add, drag to move.", "Myös puhelimen tiivis kalenteri: pidä tyhjää kohtaa painettuna lisätäksesi, vedä siirtääksesi."),
    video: video("lich-hen", 83, "2026-11-16"),
    href: "/business/dashboard/bookings",
    hrefLabel: l3("Mở Lịch hẹn", "Open Bookings", "Avaa Varaukset"),
    steps: [
      l3(
        "Bấm mục “Lịch hẹn”: mỗi nhân viên một cột. Trên cùng là số lịch hẹn, số đã xong và doanh thu dự kiến trong ngày.",
        "Open “Bookings”: one column per staff member. At the top are the day's bookings, how many are done and the expected revenue.",
        "Avaa ”Varaukset”: yksi sarake työntekijää kohti. Ylhäällä näkyvät päivän varaukset, valmiit ja arvioitu myynti."
      ),
      l3(
        "Ô có biểu tượng quả địa cầu là “Khách tự đặt online”; ô còn lại là “Salon tự thêm”. Bấm tên nhân viên để ẩn/hiện cột.",
        "A globe marks “Booked online”; the others were “Added by the salon”. Tap a staff name to hide or show their column.",
        "Maapallo tarkoittaa verkkovarausta; muut on lisännyt salonki. Napauta työntekijän nimeä piilottaaksesi tai näyttääksesi sarakkeen."
      ),
      l3(
        "Ở thanh dưới cùng: mũi tên để đổi ngày, bấm vào ngày để chọn ngày, và đổi cách xem “Ngày”, “Tuần”, “Tháng”.",
        "On the bottom bar: arrows change the day, the date opens a date picker, and you switch between “Day”, “Week” and “Month”.",
        "Alapalkissa: nuolet vaihtavat päivää, päivämäärä avaa valitsimen ja näkymäksi valitaan ”Päivä”, ”Viikko” tai ”Kuukausi”."
      ),
      l3(
        "Thêm lịch: nhấn giữ khoảng 1 giây vào ô trống. Ở “Đặt lịch cho khách”, chọn “Dịch vụ”, nhập “Tên khách hàng”, “Số điện thoại”, rồi bấm “Đặt lịch”.",
        "Add a booking: hold an empty slot for about a second. In “Book for a customer”, choose the service, enter the name and phone, then press “Book”.",
        "Lisää varaus: pidä tyhjää kohtaa painettuna noin sekunti. Valitse palvelu, anna nimi ja puhelin ja paina ”Varaa”."
      ),
      l3(
        "Bấm vào một lịch hẹn để xem chi tiết, rồi bấm “Đến quầy thanh toán”, “Hoàn thành”, “Không đến” hoặc “Huỷ”.",
        "Tap a booking for its details, then press “Go to checkout”, “Completed”, “No-show” or “Cancel”.",
        "Napauta varausta nähdäksesi tiedot ja valitse ”Kassalle”, ”Valmis”, ”Ei saapunut” tai ”Peru”."
      ),
      l3("Dời lịch: kéo ô lịch hẹn sang giờ mới; hệ thống hỏi lại trước khi chuyển.", "Move a booking: drag it to a new time; you are asked to confirm first.", "Siirrä varaus vetämällä se uuteen aikaan; siirto vahvistetaan ensin."),
    ],
    tips: [
      l3(
        "Trong chi tiết lịch hẹn có dòng “Khách đặt online lúc …” hoặc “Salon thêm lúc …” cho biết lịch được tạo khi nào.",
        "The booking details show “Booked online at …” or “Added by the salon at …”, so you know when it was made.",
        "Varauksen tiedoissa näkyy, milloin se tehtiin verkossa tai milloin salonki lisäsi sen."
      ),
      l3(
        "Muốn gửi email xác nhận và nhắc lịch cho khách khi tự thêm lịch, điền email và đánh dấu ô “Gửi email xác nhận và nhắc lịch cho khách hàng”.",
        "To email a confirmation and reminder for a booking you add yourself, fill in the email and tick “Send confirmation and reminder emails to the customer”.",
        "Jos haluat lähettää vahvistuksen ja muistutuksen itse lisäämästäsi varauksesta, anna sähköposti ja valitse sähköpostien lähetys."
      ),
    ],
    quiz: [
      {
        q: l3("Làm sao thêm lịch cho khách gọi điện, trên điện thoại?", "On a phone, how do you add a booking for someone who called?", "Miten lisäät puhelimella varauksen soittaneelle asiakkaalle?"),
        options: [l3("Nhấn giữ khoảng 1 giây vào ô trống trên lịch", "Hold an empty slot on the calendar for about a second", "Pidät kalenterin tyhjää kohtaa painettuna noin sekunnin"), l3("Gửi email cho VaraaAi", "Email VaraaAi", "Lähetät sähköpostia VaraaAille"), l3("Không thêm được", "It isn't possible", "Se ei ole mahdollista")],
        answer: 0,
        why: l3("Trang “Đặt lịch cho khách” mở ra đúng giờ và đúng cột nhân viên bạn vừa nhấn.", "“Book for a customer” opens at the time and staff column you pressed.", "Varauslomake aukeaa painamasi ajan ja työntekijän kohdalle."),
      },
      {
        q: l3("Ô lịch hẹn có biểu tượng quả địa cầu nghĩa là gì?", "What does a globe on a booking mean?", "Mitä maapallo varauksessa tarkoittaa?"),
        options: [l3("Khách tự đặt online", "The customer booked online", "Asiakas varasi verkossa"), l3("Khách nước ngoài", "A customer from abroad", "Ulkomainen asiakas"), l3("Lịch đã huỷ", "The booking was cancelled", "Varaus on peruttu")],
        answer: 0,
        why: l3("Lịch do salon tự thêm có biểu tượng và màu khác.", "Bookings added by the salon have a different icon and colour.", "Salongin lisäämillä varauksilla on eri kuvake ja väri."),
      },
      {
        q: l3("Khách không đến thì bấm nút nào?", "Which button do you press when the customer doesn't show up?", "Mitä painat, kun asiakas ei saavu?"),
        options: [l3("Hoàn thành", "Completed", "Valmis"), l3("Không đến", "No-show", "Ei saapunut"), l3("Đến quầy thanh toán", "Go to checkout", "Kassalle")],
        answer: 1,
        why: l3("“Không đến” ghi lại để bạn biết khách nào hay bỏ hẹn.", "“No-show” is recorded, so you can see who tends to miss appointments.", "”Ei saapunut” tallentuu, joten näet, kuka jättää usein tulematta."),
      },
    ],
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
    video: video("thanh-toan-hoa-don", 55, "2026-11-16"),
    href: "/business/dashboard/bookings",
    hrefLabel: l3("Mở Lịch hẹn", "Open Bookings", "Avaa Varaukset"),
    steps: [
      l3(
        "Làm một lần: vào “Cài đặt”, phần “Thông tin xuất hóa đơn”, nhập “Tên công ty”, “Địa chỉ công ty”, “Mã số doanh nghiệp / mã số thuế”, “Thuế VAT (%)” rồi bấm “Lưu thông tin hóa đơn”.",
        "Once only: in “Settings”, under “Invoice details”, enter the company name, address, business ID and VAT %, then press “Save invoice details”.",
        "Kerran: anna ”Asetukset”-sivun laskutustiedoissa yrityksen nimi, osoite, Y-tunnus ja ALV-% ja tallenna."
      ),
      l3("Khi khách ra quầy: mở “Lịch hẹn”, bấm vào lịch của khách rồi bấm “Đến quầy thanh toán”.", "When the customer pays: open “Bookings”, tap their booking and press “Go to checkout”.", "Kun asiakas maksaa: avaa ”Varaukset”, napauta varausta ja paina ”Kassalle”."),
      l3(
        "Kiểm tra tổng tiền, chọn “Hình thức thanh toán” (“Tiền mặt”, “Qua ngân hàng” hoặc “Thẻ quà tặng”) rồi bấm “Xác nhận thanh toán”.",
        "Check the total, choose how they pay (“Cash”, “Bank” or “Gift card”) and press “Confirm payment”.",
        "Tarkista summa, valitse maksutapa (käteinen, pankki tai lahjakortti) ja paina ”Vahvista maksu”."
      ),
      l3(
        "Bấm “Xem / tải hóa đơn”, hoặc nhập email khách và bấm “Gửi”, hoặc bấm “Hiện mã QR” để khách quét và tải hoá đơn.",
        "Press “View / download invoice”, or enter the customer's email and press “Send”, or press “Show QR code” so they can scan and download it.",
        "Paina ”Näytä / lataa lasku”, lähetä se asiakkaan sähköpostiin tai näytä QR-koodi, jonka asiakas skannaa."
      ),
    ],
    tips: [
      l3(
        "Chưa điền thông tin xuất hoá đơn thì chưa xác nhận thanh toán được — trang sẽ nhắc bạn điền ở Cài đặt trước.",
        "Payment can't be confirmed until the invoice details are filled in — the page reminds you to do it in Settings first.",
        "Maksua ei voi vahvistaa ennen kuin laskutustiedot on täytetty — sivu muistuttaa täyttämään ne asetuksissa."
      ),
    ],
    quiz: [
      {
        q: l3("Cần làm gì một lần trước khi xác nhận thanh toán đầu tiên?", "What must you do once before confirming your first payment?", "Mitä on tehtävä kerran ennen ensimmäisen maksun vahvistamista?"),
        options: [l3("Điền thông tin xuất hoá đơn trong Cài đặt", "Fill in the invoice details in Settings", "Täyttää laskutustiedot asetuksissa"), l3("Mua máy in", "Buy a printer", "Ostaa tulostimen"), l3("Gọi cho VaraaAi", "Call VaraaAi", "Soittaa VaraaAille")],
        answer: 0,
        why: l3("Tên công ty, địa chỉ, mã số doanh nghiệp và VAT sẽ hiện trên hoá đơn.", "The company name, address, business ID and VAT appear on the invoice.", "Yrityksen nimi, osoite, Y-tunnus ja ALV näkyvät laskulla."),
      },
      {
        q: l3("Có mấy hình thức thanh toán để chọn tại quầy?", "How many payment methods can you choose at checkout?", "Kuinka monta maksutapaa kassalla on?"),
        options: [l3("Một", "One", "Yksi"), l3("Hai", "Two", "Kaksi"), l3("Ba: Tiền mặt, Qua ngân hàng, Thẻ quà tặng", "Three: cash, bank and gift card", "Kolme: käteinen, pankki ja lahjakortti")],
        answer: 2,
        why: l3("Chọn đúng hình thức để báo cáo doanh thu chính xác.", "Choosing the right one keeps your income reports accurate.", "Oikea valinta pitää tuloraportit tarkkoina."),
      },
      {
        q: l3("Khách muốn nhận hoá đơn ngay trên điện thoại, cách nhanh nhất là gì?", "The customer wants the invoice on their phone right away — what's quickest?", "Asiakas haluaa laskun heti puhelimeensa — mikä on nopein tapa?"),
        options: [l3("Bấm “Hiện mã QR” để khách quét", "Press “Show QR code” for them to scan", "Näytä QR-koodi skannattavaksi"), l3("Chép tay", "Write it out by hand", "Kirjoittaa käsin"), l3("Gửi bưu điện", "Send it by post", "Lähettää postitse")],
        answer: 0,
        why: l3("Khách quét mã là mở được hoá đơn; bạn cũng có thể gửi qua email.", "Scanning the code opens the invoice; you can also email it.", "Koodin skannaus avaa laskun; voit myös lähettää sen sähköpostilla."),
      },
    ],
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
    video: video("khach-hang", 55, "2026-11-16"),
    href: "/business/dashboard/customers",
    hrefLabel: l3("Mở Khách hàng", "Open Customers", "Avaa Asiakkaat"),
    steps: [
      l3(
        "Bấm mục “Khách hàng”: trên cùng là tổng số khách, khách mới 30 ngày, tỉ lệ quay lại và chi tiêu trung bình mỗi khách.",
        "Open “Customers”: at the top are your total customers, new ones in 30 days, the return rate and average spend per customer.",
        "Avaa ”Asiakkaat”: ylhäällä näkyvät asiakkaiden määrä, uudet 30 päivässä, paluuprosentti ja keskiostos."
      ),
      l3(
        "Lọc theo nhóm: “Tất cả”, “VIP”, “Khách quen”, “Khách mới”, “Có lịch sắp tới”, “Lâu chưa quay lại”; hoặc tìm theo tên, email, số điện thoại.",
        "Filter by group: all, VIP, regulars, new, with upcoming bookings, not seen for a while; or search by name, email or phone.",
        "Suodata ryhmittäin (kaikki, VIP, kanta-asiakkaat, uudet, tulevia varauksia, pitkään poissa) tai hae nimellä, sähköpostilla tai puhelimella."
      ),
      l3(
        "Bấm “Xuất Excel (CSV)” để tải danh sách nhóm đang xem, hoặc “Gửi email cho nhóm này” để gửi ưu đãi.",
        "Press “Export Excel (CSV)” to download the group you're viewing, or “Email this group” to send an offer.",
        "Lataa näkyvä ryhmä Exceliin tai lähetä ryhmälle sähköpostitarjous."
      ),
      l3(
        "Bấm vào một khách để mở hồ sơ: lượt hoàn thành, tổng chi tiêu, dịch vụ yêu thích, nhân viên quen, “Ghi chú nội bộ” và “Lịch sử lịch hẹn”.",
        "Tap a customer to open their profile: completed visits, total spend, favourite service, usual staff member, internal notes and booking history.",
        "Napauta asiakasta nähdäksesi profiilin: käynnit, kokonaisostot, suosikkipalvelu, tuttu tekijä, sisäiset muistiinpanot ja varaushistoria."
      ),
    ],
    tips: [
      l3("“Ghi chú nội bộ” chỉ salon thấy — khách không bao giờ thấy ghi chú này.", "Internal notes are for the salon only — customers never see them.", "Sisäiset muistiinpanot näkyvät vain salongille — asiakas ei näe niitä koskaan."),
      l3("Sổ khách hàng tự lập từ các lịch hẹn; bạn không cần nhập tay.", "The customer book builds itself from bookings; there is nothing to type in.", "Asiakasrekisteri syntyy varauksista itsestään; mitään ei tarvitse kirjata käsin."),
    ],
    quiz: [
      {
        q: l3("Muốn tải danh sách khách về máy, bấm nút nào?", "Which button downloads your customer list?", "Mistä asiakasluettelo ladataan?"),
        options: [l3("Xuất Excel (CSV)", "Export Excel (CSV)", "Vie Exceliin (CSV)"), l3("Gửi email cho nhóm này", "Email this group", "Lähetä ryhmälle sähköposti"), l3("Thêm dịch vụ", "Add service", "Lisää palvelu")],
        answer: 0,
        why: l3("Tệp tải về là danh sách của nhóm bạn đang xem.", "The file contains the group you are currently viewing.", "Tiedosto sisältää parhaillaan näkyvän ryhmän."),
      },
      {
        q: l3("Ai nhìn thấy “Ghi chú nội bộ” của một khách?", "Who can see a customer's internal notes?", "Kuka näkee asiakkaan sisäiset muistiinpanot?"),
        options: [l3("Chỉ salon", "Only the salon", "Vain salonki"), l3("Cả khách hàng đó", "The customer too", "Myös asiakas"), l3("Mọi người trên mạng", "Everyone online", "Kaikki verkossa")],
        answer: 0,
        why: l3("Dùng để ghi dị ứng, sở thích, thói quen đặt lịch của khách.", "Use them for allergies, preferences and booking habits.", "Kirjaa niihin allergiat, mieltymykset ja varaustottumukset."),
      },
      {
        q: l3("Nhóm nào giúp bạn tìm khách đã lâu không ghé?", "Which group finds customers who haven't visited for a while?", "Mikä ryhmä löytää pitkään poissa olleet asiakkaat?"),
        options: [l3("Lâu chưa quay lại", "Not seen for a while", "Pitkään poissa"), l3("Khách mới", "New customers", "Uudet asiakkaat"), l3("VIP", "VIP", "VIP")],
        answer: 0,
        why: l3("Gửi cho nhóm này một ưu đãi để mời họ quay lại.", "Send this group an offer to invite them back.", "Lähetä tälle ryhmälle tarjous ja kutsu heidät takaisin."),
      },
    ],
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
    title: l3("Trang tổng quan", "The overview page", "Yleiskatsaus"),
    summary: l3("Doanh thu, lịch hẹn, việc cần xử lý và dịch vụ bán chạy — nhìn một lần là nắm cả tiệm.", "Revenue, bookings, things to handle and best-selling services — the whole salon at a glance.", "Liikevaihto, varaukset, hoidettavat asiat ja suosituimmat palvelut — koko salonki yhdellä silmäyksellä."),
    video: video("tong-quan", 49, "2026-11-16"),
    href: "/business/dashboard",
    hrefLabel: l3("Mở Tổng quan", "Open the overview", "Avaa yleiskatsaus"),
    steps: [
      l3(
        "Mở trang quản trị: trên cùng là số lịch hẹn hôm nay, “Doanh thu dự kiến hôm nay” và “Lịch tiếp theo”.",
        "Open the dashboard: at the top are today's bookings, today's expected revenue and the next appointment.",
        "Avaa hallintapaneeli: ylhäällä näkyvät päivän varaukset, arvioitu myynti ja seuraava varaus."
      ),
      l3(
        "Dùng ba nút “Mở lịch hẹn”, “Xem trang salon” và “Sao chép link đặt lịch”.",
        "Use the three buttons “Open calendar”, “View salon page” and “Copy booking link”.",
        "Käytä painikkeita ”Avaa kalenteri”, ”Näytä salongin sivu” ja ”Kopioi varauslinkki”."
      ),
      l3(
        "Xem bốn con số của tháng: doanh thu, lịch hẹn, khách hàng mới và đánh giá trung bình, so với tháng trước.",
        "Check the month's four numbers: revenue, bookings, new customers and average rating, compared with last month.",
        "Katso kuukauden neljä lukua: myynti, varaukset, uudet asiakkaat ja keskiarvosana verrattuna edelliseen kuukauteen."
      ),
      l3(
        "“Lịch hẹn hôm nay” liệt kê từng khách theo giờ; “Cần xử lý” nhắc những việc đang chờ.",
        "“Today's bookings” lists each customer by time; “To handle” reminds you of what is waiting.",
        "”Päivän varaukset” listaa asiakkaat ajan mukaan; ”Hoidettavat” muistuttaa odottavista asioista."
      ),
      l3(
        "Kéo xuống để xem “7 ngày tới”, “Doanh thu 6 tháng” và “Dịch vụ bán chạy tháng này”.",
        "Scroll down for “Next 7 days”, “Revenue over 6 months” and “Best-selling services this month”.",
        "Vieritä alas nähdäksesi seuraavat 7 päivää, 6 kuukauden myynnin ja kuukauden suosituimmat palvelut."
      ),
    ],
    tips: [
      l3(
        "Trang này cũng đếm lượt quét mã QR in trên bảng giá và poster trong 30 ngày.",
        "This page also counts scans of the QR codes printed on your price list and posters over 30 days.",
        "Sivu laskee myös hinnaston ja julisteiden QR-koodien skannaukset 30 päivältä."
      ),
    ],
    quiz: [
      {
        q: l3("Phần nào nhắc bạn tin nhắn chưa đọc hay đánh giá chờ duyệt?", "Which part reminds you of unread messages or reviews awaiting approval?", "Mikä osa muistuttaa lukemattomista viesteistä tai hyväksyntää odottavista arvosteluista?"),
        options: [l3("Cần xử lý", "To handle", "Hoidettavat"), l3("7 ngày tới", "Next 7 days", "Seuraavat 7 päivää"), l3("Doanh thu 6 tháng", "Revenue over 6 months", "6 kuukauden myynti")],
        answer: 0,
        why: l3("Khi không có gì chờ, phần này báo “Mọi thứ đều ổn”.", "When nothing is waiting it says everything is fine.", "Kun mikään ei odota, osio kertoo kaiken olevan kunnossa."),
      },
      {
        q: l3("Muốn gửi link đặt lịch cho khách thật nhanh, bấm nút nào?", "Which button quickly gives you the booking link to send to customers?", "Mistä saat nopeasti varauslinkin lähetettäväksi?"),
        options: [l3("Sao chép link đặt lịch", "Copy booking link", "Kopioi varauslinkki"), l3("Mở lịch hẹn", "Open calendar", "Avaa kalenteri"), l3("Tin nhắn", "Messages", "Viestit")],
        answer: 0,
        why: l3("Dán link vào Facebook, Instagram hoặc tin nhắn để khách tự đặt.", "Paste it into Facebook, Instagram or a message so customers can book themselves.", "Liitä se Facebookiin, Instagramiin tai viestiin, niin asiakkaat varaavat itse."),
      },
      {
        q: l3("Bốn con số của tháng được so sánh với gì?", "What are the month's four numbers compared with?", "Mihin kuukauden neljää lukua verrataan?"),
        options: [l3("Cùng kỳ tháng trước", "The same period last month", "Edellisen kuukauden samaan jaksoon"), l3("Salon khác", "Other salons", "Muihin salonkeihin"), l3("Năm ngoái", "Last year", "Viime vuoteen")],
        answer: 0,
        why: l3("Mỗi ô có dòng “so với cùng kỳ tháng trước”.", "Each card says “compared with the same period last month”.", "Jokaisessa kortissa lukee vertailu edelliseen kuukauteen."),
      },
    ],
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
