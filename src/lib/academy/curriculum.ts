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
    video: video("chat-voi-salon", 39, "2026-11-16"),
    href: "/search",
    hrefLabel: l3("Tìm salon để nhắn tin", "Find a salon to message", "Etsi salonki ja lähetä viesti"),
    steps: [
      l3("Mở trang của salon và bấm “Chat với Salon”, ngay cạnh nút “Đặt lịch”.", "Open the salon's page and press “Chat with the salon”, next to “Book”.", "Avaa salongin sivu ja paina ”Chat salongin kanssa” Varaa-painikkeen vieressä."),
      l3("Gõ câu hỏi vào ô “Nhập tin nhắn...” rồi bấm nút gửi. Có thể đính kèm ảnh.", "Type your question in “Type a message...” and press send. You can attach a photo.", "Kirjoita kysymyksesi viestikenttään ja paina lähetä. Voit liittää kuvan."),
      l3("Khi salon trả lời, tin nhắn hiện ngay trong khung chat.", "The salon's reply appears in the same chat window.", "Salongin vastaus näkyy samassa chat-ikkunassa."),
      l3("Xem lại mọi cuộc trò chuyện: bấm vào tên bạn ở góc trên và chọn “Hộp thư”.", "To find every conversation again, tap your name at the top and choose “Inbox”.", "Löydät kaikki keskustelut napauttamalla nimeäsi ja valitsemalla ”Viestit”."),
    ],
    tips: [
      l3("Gửi kèm ảnh mẫu bạn thích để salon tư vấn và báo giá chính xác hơn.", "Attach a picture of the look you want so the salon can advise and quote more precisely.", "Liitä kuva haluamastasi tyylistä, niin salonki osaa neuvoa ja hinnoitella tarkemmin."),
    ],
    quiz: [
      {
        q: l3("Nút “Chat với Salon” nằm ở đâu?", "Where is the “Chat with the salon” button?", "Missä ”Chat salongin kanssa” -painike on?"),
        options: [l3("Trên trang của salon, cạnh nút Đặt lịch", "On the salon's page, next to Book", "Salongin sivulla Varaa-painikkeen vieressä"), l3("Trong email xác nhận", "In the confirmation email", "Vahvistussähköpostissa"), l3("Ở trang chủ", "On the home page", "Etusivulla")],
        answer: 0,
        why: l3("Mỗi salon có nút chat riêng trên trang của mình.", "Every salon has its own chat button on its page.", "Jokaisella salongilla on oma chat-painike sivullaan."),
      },
      {
        q: l3("Muốn xem lại các cuộc trò chuyện cũ, bạn mở mục nào?", "Where do you find your earlier conversations?", "Mistä löydät aiemmat keskustelusi?"),
        options: [l3("Hộp thư", "Inbox", "Viestit"), l3("Thẻ tích điểm", "Loyalty cards", "Kanta-asiakaskortit"), l3("Bảng tin", "Feed", "Syöte")],
        answer: 0,
        why: l3("“Hộp thư” nằm trong danh sách khi bạn bấm vào tên mình.", "“Inbox” is in the menu under your name.", "”Viestit” on nimesi alla olevassa valikossa."),
      },
      {
        q: l3("Bạn có thể gửi gì kèm tin nhắn?", "What can you send with a message?", "Mitä voit lähettää viestin mukana?"),
        options: [l3("Ảnh", "A photo", "Kuvan"), l3("Tiền", "Money", "Rahaa"), l3("Không gửi kèm được gì", "Nothing", "Et mitään")],
        answer: 0,
        why: l3("Nút đính kèm ảnh nằm bên trái ô nhập tin nhắn.", "The attach-photo button is to the left of the message box.", "Kuvan liitepainike on viestikentän vasemmalla puolella."),
      },
    ],
  },
  {
    slug: "viet-danh-gia",
    course: "c-bookings",
    title: l3("Viết đánh giá sau khi làm đẹp", "Leave a review after your visit", "Kirjoita arvostelu käynnin jälkeen"),
    summary: l3("Chấm sao và chia sẻ trải nghiệm từ email mời đánh giá hoặc từ Lịch hẹn của tôi.", "Rate and share your experience from the review email or from My bookings.", "Anna tähdet ja kerro kokemuksestasi arvostelusähköpostista tai varauksistasi."),
    video: video("viet-danh-gia", 49, "2026-11-16"),
    href: "/account/bookings",
    hrefLabel: l3("Mở Lịch hẹn của tôi", "Open My bookings", "Avaa Varaukseni"),
    steps: [
      l3(
        "Sau lần hẹn, bấm “Đánh giá dịch vụ” trong email mời đánh giá — hoặc vào “Lịch hẹn của tôi”, tìm lịch đã “Hoàn thành” và bấm “Đánh giá”.",
        "After your visit, press “Review the service” in the invitation email — or open “My bookings”, find the completed booking and press “Review”.",
        "Käynnin jälkeen paina kutsusähköpostin arvostelupainiketta — tai avaa ”Varaukseni”, etsi valmis varaus ja paina ”Arvostele”."
      ),
      l3("Ở “Chất lượng dịch vụ”, chọn số sao từ 1 đến 5.", "Under “Service quality”, choose 1 to 5 stars.", "Valitse kohdassa ”Palvelun laatu” 1–5 tähteä."),
      l3("Viết vài câu vào ô “Chia sẻ trải nghiệm của bạn...” rồi bấm “Gửi đánh giá”.", "Write a few words under “Share your experience...” and press “Submit review”.", "Kirjoita muutama sana kokemuksestasi ja paina ”Lähetä arvostelu”."),
      l3("Màn hình báo “Cảm ơn bạn đã đánh giá!”. Salon xem và đăng đánh giá lên trang của họ.", "You'll see “Thank you for your review!”. The salon then publishes it on its page.", "Näet kiitosviestin. Salonki julkaisee arvostelun sivullaan."),
    ],
    tips: [
      l3("Chỉ khách đã đặt lịch mới viết được đánh giá, nên mọi đánh giá trên VaraaAi đều là thật.", "Only customers who booked can write a review, so every review on VaraaAi is genuine.", "Vain varanneet asiakkaat voivat arvostella, joten kaikki VaraaAin arvostelut ovat aitoja."),
    ],
    quiz: [
      {
        q: l3("Ai được viết đánh giá cho một salon?", "Who can review a salon?", "Kuka voi arvostella salongin?"),
        options: [l3("Bất kỳ ai", "Anyone", "Kuka tahansa"), l3("Chỉ khách đã đặt lịch ở salon đó", "Only customers who booked there", "Vain siellä varanneet asiakkaat"), l3("Chỉ chủ salon", "Only the salon owner", "Vain salongin omistaja")],
        answer: 1,
        why: l3("Vì vậy đánh giá trên VaraaAi đáng tin.", "That is why reviews on VaraaAi can be trusted.", "Siksi VaraaAin arvosteluihin voi luottaa."),
      },
      {
        q: l3("Nút “Đánh giá” nằm ở đâu?", "Where is the “Review” button?", "Missä ”Arvostele”-painike on?"),
        options: [l3("Trên từng lịch hẹn trong “Lịch hẹn của tôi”", "On each booking in “My bookings”", "Jokaisessa varauksessa kohdassa ”Varaukseni”"), l3("Ở trang chủ", "On the home page", "Etusivulla"), l3("Trong Hồ sơ của tôi", "In My profile", "Profiilissani")],
        answer: 0,
        why: l3("Bạn cũng có thể bấm nút trong email mời đánh giá.", "You can also use the button in the invitation email.", "Voit käyttää myös kutsusähköpostin painiketta."),
      },
      {
        q: l3("Sau khi bạn gửi, đánh giá hiện trên trang salon khi nào?", "After you submit, when does the review appear on the salon's page?", "Milloin arvostelu näkyy salongin sivulla?"),
        options: [l3("Sau khi salon xem và đăng", "Once the salon has seen and published it", "Kun salonki on nähnyt ja julkaissut sen"), l3("Không bao giờ", "Never", "Ei koskaan"), l3("Sau một năm", "After a year", "Vuoden kuluttua")],
        answer: 0,
        why: l3("Salon duyệt đánh giá trước khi đăng công khai.", "Salons approve reviews before they are shown publicly.", "Salonki hyväksyy arvostelut ennen julkaisua."),
      },
    ],
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
    summary: l3("Mua thẻ trên website của salon, nhận mã qua email và đưa mã cho nhân viên khi đến salon.", "Buy one on the salon's website, get the code by email and show it to the staff at the salon.", "Osta salongin verkkosivuilta, saat koodin sähköpostiin ja näytät sen salongissa."),
    video: null, // batch 9
    fresh: true,
    steps: [
      l3(
        "Mở website của salon và kéo xuống phần “Thẻ quà tặng”. Mỗi thẻ ghi rõ dịch vụ, mức giảm giá, thời hạn và giá bán.",
        "Open the salon's website and scroll to the gift cards. Each card shows the service, the discount, how long it is valid and the price.",
        "Avaa salongin verkkosivut ja vieritä lahjakortteihin. Jokaisessa kortissa näkyy palvelu, alennus, voimassaolo ja hinta."
      ),
      l3(
        "Bấm “Mua thẻ này”, điền họ tên, email (và số điện thoại nếu muốn), rồi bấm “Đặt mua”.",
        "Press “Buy this card”, fill in your name and email (and phone if you like), then press “Buy”.",
        "Paina ostopainiketta, täytä nimi ja sähköposti (ja halutessasi puhelin) ja vahvista osto."
      ),
      l3(
        "Mã thẻ và mã QR được gửi vào email của bạn. Thẻ được kích hoạt sau khi salon xác nhận bạn đã thanh toán.",
        "The card code and a QR code are emailed to you. The card is activated once the salon confirms your payment.",
        "Kortin koodi ja QR-koodi lähetetään sähköpostiisi. Kortti aktivoituu, kun salonki vahvistaa maksun."
      ),
      l3(
        "Khi đến salon, đưa mã QR hoặc đọc mã thẻ cho nhân viên. Nhân viên kiểm tra và trừ một lần dùng trên thẻ.",
        "At the salon, show the QR code or read out the card code. The staff check it and count one use on the card.",
        "Näytä salongissa QR-koodi tai kerro kortin koodi. Henkilökunta tarkistaa sen ja kirjaa yhden käyttökerran."
      ),
    ],
    tips: [
      l3(
        "Muốn tặng người khác, bạn chuyển tiếp email có mã thẻ cho người được tặng.",
        "To give the card to someone, forward the email with the code to them.",
        "Jos annat kortin lahjaksi, välitä koodin sisältävä sähköposti saajalle."
      ),
      l3(
        "Xem kỹ thời hạn và số lần dùng ghi trên thẻ trước khi mua.",
        "Check how long the card is valid and how many times it can be used before you buy.",
        "Tarkista kortin voimassaolo ja käyttökerrat ennen ostoa."
      ),
    ],
    quiz: [
      {
        q: l3("Mua thẻ quà tặng của salon ở đâu?", "Where do you buy a salon's gift card?", "Mistä salongin lahjakortin voi ostaa?"),
        options: [l3("Trong phần “Thẻ quà tặng” trên website của salon", "In the gift card section of the salon's website", "Salongin verkkosivujen lahjakorttiosiosta"), l3("Chỉ mua được ở bưu điện", "Only at the post office", "Vain postista"), l3("Không mua online được", "It can't be bought online", "Sitä ei voi ostaa verkosta")],
        answer: 0,
        why: l3("Chọn thẻ, bấm “Mua thẻ này” và điền thông tin là xong.", "Pick a card, press “Buy this card” and fill in your details.", "Valitse kortti, paina ostopainiketta ja täytä tietosi."),
      },
      {
        q: l3("Thẻ được kích hoạt khi nào?", "When is the card activated?", "Milloin kortti aktivoituu?"),
        options: [l3("Ngay khi mở website", "As soon as you open the website", "Heti kun avaat sivuston"), l3("Sau khi salon xác nhận bạn đã thanh toán", "Once the salon confirms your payment", "Kun salonki vahvistaa maksun"), l3("Sau một năm", "After one year", "Vuoden kuluttua")],
        answer: 1,
        why: l3("Mã thẻ đến email ngay, nhưng chỉ dùng được sau khi salon xác nhận thanh toán.", "The code arrives by email at once, but it works only after the salon confirms payment.", "Koodi tulee heti sähköpostiin, mutta toimii vasta kun salonki on vahvistanut maksun."),
      },
      {
        q: l3("Đến salon, bạn dùng thẻ thế nào?", "How do you use the card at the salon?", "Miten korttia käytetään salongissa?"),
        options: [l3("Đưa mã QR hoặc đọc mã thẻ cho nhân viên", "Show the QR code or read out the card code", "Näytä QR-koodi tai kerro kortin koodi"), l3("Không cần làm gì", "Do nothing", "Ei tarvitse tehdä mitään"), l3("Gửi thư tay", "Send a letter", "Lähetä kirje")],
        answer: 0,
        why: l3("Nhân viên kiểm tra mã và ghi nhận một lần dùng.", "The staff check the code and record one use.", "Henkilökunta tarkistaa koodin ja kirjaa yhden käyttökerran."),
      },
    ],
  },
  {
    slug: "theo-doi-salon",
    course: "c-perks",
    title: l3("Theo dõi salon, bảng tin và mua sản phẩm", "Follow salons, your feed and the shop", "Seuraa salonkeja, syöte ja kauppa"),
    summary: l3("Bấm Theo dõi để nhận bài viết mới của salon và mua sản phẩm trong cửa hàng của salon.", "Follow a salon to see its new posts, and buy products from its shop.", "Seuraa salonkia nähdäksesi uudet julkaisut ja osta tuotteita sen kaupasta."),
    video: null, // batch 9
    href: "/account/feed",
    hrefLabel: l3("Mở Bảng tin", "Open your feed", "Avaa syöte"),
    steps: [
      l3(
        "Mở trang của salon và bấm “Theo dõi” (dưới nút “Đặt lịch”). Nút đổi thành “Đang theo dõi”.",
        "Open the salon's page and press “Follow” (under the booking button). The button changes to “Following”.",
        "Avaa salongin sivu ja paina ”Seuraa” (varauspainikkeen alla). Painike muuttuu seuraamisen merkiksi."
      ),
      l3(
        "Bấm vào tên bạn ở góc trên và chọn “Bảng tin” để xem bài viết mới của các salon bạn theo dõi.",
        "Tap your name at the top and choose your feed to see new posts from the salons you follow.",
        "Napauta nimeäsi ylhäällä ja valitse syöte nähdäksesi seuraamiesi salonkien uudet julkaisut."
      ),
      l3(
        "Muốn mua sản phẩm: trên trang salon bấm “Sản phẩm”, bấm biểu tượng giỏ hàng trên món bạn thích, rồi mở giỏ ở góc dưới.",
        "To buy products: on the salon's page press “Products”, tap the basket icon on what you like, then open the basket at the bottom.",
        "Tuotteiden osto: paina salongin sivulla ”Tuotteet”, napauta ostoskorin kuvaketta haluamassasi tuotteessa ja avaa kori alhaalta."
      ),
      l3(
        "Bấm “Tiến hành đặt hàng”, chọn cách thanh toán (tại salon, chuyển khoản hoặc trao đổi với salon), rồi bấm “Xác nhận đặt hàng”.",
        "Continue to the order, choose how to pay (at the salon, by bank transfer or by agreeing with the salon) and confirm the order.",
        "Siirry tilaukseen, valitse maksutapa (salongissa, tilisiirrolla tai sopimalla salongin kanssa) ja vahvista tilaus."
      ),
    ],
    tips: [
      l3(
        "Sản phẩm được nhận tại salon — salon sẽ liên hệ để hẹn thời gian bạn đến lấy.",
        "Products are collected at the salon — the salon contacts you to agree a pick-up time.",
        "Tuotteet noudetaan salongista — salonki ottaa yhteyttä ja sopii noutoajan."
      ),
      l3(
        "Muốn ngừng nhận bài viết, vào “Đang theo dõi” và bấm “Bỏ theo dõi”.",
        "To stop seeing a salon's posts, open “Following” and press “Unfollow”.",
        "Jos et halua enää nähdä salongin julkaisuja, avaa seuratut ja lopeta seuraaminen."
      ),
    ],
    quiz: [
      {
        q: l3("Bấm “Theo dõi” một salon thì được gì?", "What do you get by following a salon?", "Mitä hyötyä salongin seuraamisesta on?"),
        options: [l3("Bài viết mới của salon hiện trong Bảng tin của bạn", "The salon's new posts appear in your feed", "Salongin uudet julkaisut näkyvät syötteessäsi"), l3("Tự động đặt lịch mỗi tuần", "A booking is made for you every week", "Sinulle varataan aika joka viikko"), l3("Không được gì", "Nothing", "Ei mitään")],
        answer: 0,
        why: l3("Bạn biết ngay khi salon có ưu đãi hay mẫu mới.", "You know straight away when the salon has an offer or new work.", "Tiedät heti, kun salongilla on tarjous tai uusia töitä."),
      },
      {
        q: l3("Sản phẩm mua trong cửa hàng của salon nhận ở đâu?", "Where do you collect products bought from a salon's shop?", "Mistä salongin kaupasta ostetut tuotteet noudetaan?"),
        options: [l3("Tại salon", "At the salon", "Salongista"), l3("Qua bưu điện quốc tế", "By international post", "Kansainvälisellä postilla"), l3("Tại sân bay", "At the airport", "Lentokentältä")],
        answer: 0,
        why: l3("Bạn đặt online, salon liên hệ để hẹn thời gian đến lấy.", "You order online and the salon contacts you to agree a pick-up time.", "Tilaat verkossa, ja salonki sopii kanssasi noutoajan."),
      },
      {
        q: l3("Có những cách thanh toán nào khi đặt sản phẩm?", "How can you pay when you order products?", "Miten tuotetilauksen voi maksaa?"),
        options: [l3("Chỉ thẻ tín dụng", "Credit card only", "Vain luottokortilla"), l3("Tại salon, chuyển khoản, hoặc trao đổi với salon", "At the salon, by bank transfer, or by agreeing with the salon", "Salongissa, tilisiirrolla tai sopimalla salongin kanssa"), l3("Không cần trả tiền", "You don't pay", "Ei tarvitse maksaa")],
        answer: 1,
        why: l3("Bạn chọn cách thuận tiện nhất khi đặt hàng.", "You choose whichever is easiest when you order.", "Valitset tilatessasi itsellesi sopivimman tavan."),
      },
    ],
  },
  {
    slug: "hoa-don",
    course: "c-perks",
    title: l3("Xem lại hoá đơn bằng mã QR", "Open your invoice with a QR code", "Avaa lasku QR-koodilla"),
    summary: l3("Quét mã tại quầy hoặc mở email để xem lại hoá đơn của lần làm đẹp.", "Scan the code at the counter or open the email to see the invoice for your visit.", "Skannaa koodi kassalla tai avaa sähköposti nähdäksesi käyntisi laskun."),
    video: null, // batch 9
    fresh: true,
    steps: [
      l3(
        "Khi thanh toán ở quầy, nhờ nhân viên bấm “Hiện mã QR” trên màn hình của salon.",
        "When you pay at the counter, ask the staff to show the QR code on the salon's screen.",
        "Kun maksat kassalla, pyydä henkilökuntaa näyttämään QR-koodi salongin näytöltä."
      ),
      l3(
        "Mở camera điện thoại và quét mã — hoá đơn mở ra ngay trong trình duyệt.",
        "Open your phone's camera and scan the code — the invoice opens in your browser at once.",
        "Avaa puhelimen kamera ja skannaa koodi — lasku aukeaa heti selaimeen."
      ),
      l3(
        "Xem tên salon, số hoá đơn, dịch vụ, thuế, tổng tiền và cách thanh toán; chụp màn hình hoặc lưu đường link để xem lại.",
        "Check the salon's name, invoice number, services, tax, total and payment method; take a screenshot or keep the link.",
        "Tarkista salongin nimi, laskun numero, palvelut, vero, summa ja maksutapa; ota kuvakaappaus tai tallenna linkki."
      ),
      l3(
        "Không có mặt ở quầy? Nhờ nhân viên gửi hoá đơn qua email, rồi bấm vào đường link trong email.",
        "Not at the counter? Ask the staff to email the invoice, then tap the link in the email.",
        "Etkö ole kassalla? Pyydä lasku sähköpostiin ja napauta viestin linkkiä."
      ),
    ],
    tips: [
      l3(
        "Trên hoá đơn có sẵn mã QR “Quét để xem lại hóa đơn” — lần sau chỉ cần quét lại.",
        "The invoice itself carries a QR code — scan it again whenever you need the invoice.",
        "Laskussa on oma QR-koodi — skannaa se uudelleen, kun tarvitset laskua."
      ),
    ],
    quiz: [
      {
        q: l3("Cách nhanh nhất để có hoá đơn trên điện thoại khi đang ở quầy?", "What's the quickest way to get the invoice on your phone at the counter?", "Mikä on nopein tapa saada lasku puhelimeen kassalla?"),
        options: [l3("Quét mã QR trên màn hình của salon", "Scan the QR code on the salon's screen", "Skannata QR-koodi salongin näytöltä"), l3("Chép tay", "Copy it by hand", "Kopioida käsin"), l3("Chờ gửi bưu điện", "Wait for the post", "Odottaa postia")],
        answer: 0,
        why: l3("Quét mã là hoá đơn mở ra ngay.", "Scan the code and the invoice opens at once.", "Kun skannaat koodin, lasku aukeaa heti."),
      },
      {
        q: l3("Không ở quầy thì nhận hoá đơn thế nào?", "How do you get the invoice if you're not at the counter?", "Miten saat laskun, jos et ole kassalla?"),
        options: [l3("Không nhận được", "You can't", "Et mitenkään"), l3("Nhờ nhân viên gửi qua email", "Ask the staff to email it", "Pyydä henkilökuntaa lähettämään se sähköpostilla"), l3("Phải quay lại salon", "You must go back to the salon", "Sinun on palattava salonkiin")],
        answer: 1,
        why: l3("Email có đường link mở hoá đơn.", "The email has a link that opens the invoice.", "Sähköpostissa on linkki, joka avaa laskun."),
      },
      {
        q: l3("Hoá đơn hiển thị những gì?", "What does the invoice show?", "Mitä laskussa näkyy?"),
        options: [l3("Chỉ tổng tiền", "Only the total", "Vain loppusumma"), l3("Tên salon, số hoá đơn, dịch vụ, thuế, tổng tiền và cách thanh toán", "The salon, invoice number, services, tax, total and payment method", "Salonki, laskun numero, palvelut, vero, summa ja maksutapa"), l3("Chỉ tên khách", "Only your name", "Vain nimesi")],
        answer: 1,
        why: l3("Đủ thông tin để bạn lưu lại hoặc gửi cho công ty.", "Everything you need to keep it or pass it to your company.", "Kaikki tarvittava säilytystä tai työnantajaa varten."),
      },
    ],
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
    title: l3("Hồ sơ salon, logo và ảnh bìa", "Salon profile, logo and cover", "Salongin profiili, logo ja kansikuva"),
    summary: l3("Hoàn thiện hồ sơ để mở khoá Thẻ tích điểm và Marketing.", "Complete your profile to unlock Loyalty cards and Marketing.", "Täydennä profiili avataksesi kanta-asiakaskortit ja markkinoinnin."),
    video: video("ho-so-salon", 51, "2026-11-16"),
    href: "/business/dashboard/settings",
    hrefLabel: l3("Mở Cài đặt", "Open Settings", "Avaa Asetukset"),
    steps: [
      l3(
        "Vào “Cài đặt”. Thẻ “Mức độ hoàn thiện hồ sơ” cho biết hồ sơ đạt bao nhiêu phần trăm và còn thiếu mục nào; bấm “Bổ sung” để đến đúng chỗ.",
        "Open “Settings”. The “Profile completeness” card shows your percentage and what is missing; “Add” takes you to the right place.",
        "Avaa ”Asetukset”. Profiilin valmiusaste näyttää prosentin ja puuttuvat kohdat; ”Täydennä” vie oikeaan kohtaan."
      ),
      l3(
        "Ở “Thông tin salon”, nhập “Tên salon”, “Giới thiệu ngắn” (từ 80 ký tự), “Địa chỉ”, “Thành phố”, “Quốc gia”, chọn danh mục rồi bấm “Lưu”.",
        "Under “Salon details”, enter the name, a short introduction (80+ characters), address, city and country, choose categories and press “Save”.",
        "Anna kohdassa ”Salongin tiedot” nimi, lyhyt esittely (yli 80 merkkiä), osoite, kaupunki ja maa, valitse kategoriat ja tallenna."
      ),
      l3("Bấm “Tải ảnh bìa lên” và “Tải logo lên”.", "Press “Upload cover photo” and “Upload logo”.", "Lataa kansikuva ja logo."),
      l3(
        "Ở “Liên hệ & mạng xã hội”, điền số điện thoại, email, website, Facebook, Instagram, TikTok.",
        "Under “Contact & social media”, fill in your phone, email, website, Facebook, Instagram and TikTok.",
        "Täytä kohdassa ”Yhteystiedot ja some” puhelin, sähköposti, verkkosivu, Facebook, Instagram ja TikTok."
      ),
    ],
    tips: [
      l3("Hồ sơ đạt 85% sẽ mở khoá “Thẻ tích điểm” và “Marketing”.", "Reaching 85% unlocks “Loyalty cards” and “Marketing”.", "85 %:n valmiusaste avaa kanta-asiakaskortit ja markkinoinnin."),
      l3("Hồ sơ đầy đủ giúp salon nổi bật trên bản đồ tìm kiếm và khách tin tưởng đặt lịch hơn.", "A complete profile stands out on the search map and makes customers more confident to book.", "Täydellinen profiili erottuu hakukartalla ja lisää asiakkaiden luottamusta."),
    ],
    quiz: [
      {
        q: l3("Hồ sơ cần đạt bao nhiêu phần trăm để mở Thẻ tích điểm và Marketing?", "What percentage unlocks Loyalty cards and Marketing?", "Mikä prosentti avaa kanta-asiakaskortit ja markkinoinnin?"),
        options: [l3("50%", "50%", "50 %"), l3("85%", "85%", "85 %"), l3("100%", "100%", "100 %")],
        answer: 1,
        why: l3("Thẻ “Mức độ hoàn thiện hồ sơ” ghi rõ mức 85%.", "The “Profile completeness” card states the 85% mark.", "Valmiusastekortissa mainitaan 85 %:n raja."),
      },
      {
        q: l3("Nút “Bổ sung” cạnh từng mục còn thiếu dùng để làm gì?", "What does “Add” next to a missing item do?", "Mitä puuttuvan kohdan ”Täydennä” tekee?"),
        options: [l3("Đưa bạn đến đúng chỗ cần điền", "Takes you to the right place to fill it in", "Vie oikeaan kohtaan täytettäväksi"), l3("Xoá mục đó", "Deletes the item", "Poistaa kohdan"), l3("Gọi hỗ trợ", "Calls support", "Soittaa tukeen")],
        answer: 0,
        why: l3("Bạn không phải tự tìm từng phần trong trang Cài đặt.", "You don't have to hunt for each section in Settings.", "Sinun ei tarvitse etsiä osioita asetuksista itse."),
      },
      {
        q: l3("“Giới thiệu ngắn” nên dài ít nhất bao nhiêu?", "How long should the short introduction be at least?", "Kuinka pitkä lyhyen esittelyn tulisi vähintään olla?"),
        options: [l3("10 ký tự", "10 characters", "10 merkkiä"), l3("80 ký tự", "80 characters", "80 merkkiä"), l3("1.000 ký tự", "1,000 characters", "1 000 merkkiä")],
        answer: 1,
        why: l3("Mục “Mô tả salon (từ 80 ký tự)” được tính vào mức độ hoàn thiện.", "“Salon description (80+ characters)” counts towards completeness.", "”Salongin kuvaus (yli 80 merkkiä)” lasketaan valmiusasteeseen."),
      },
    ],
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
    video: video("thanh-toan-chinh-sach", 65, "2026-11-16"),
    href: "/business/dashboard/settings",
    hrefLabel: l3("Mở Cài đặt", "Open Settings", "Avaa Asetukset"),
    steps: [
      l3(
        "Vào “Cài đặt”, phần “Tùy chọn salon”. Ở dòng “Khách được hủy trước”, chọn thời hạn, ví dụ 24 giờ trước lịch hẹn.",
        "Open “Settings” and find the salon options. Under “Customers can cancel up to”, choose a deadline, for example 24 hours before the appointment.",
        "Avaa ”Asetukset” ja kohta ”Salongin asetukset”. Valitse kohdassa ”Asiakas voi perua viimeistään” määräaika, esimerkiksi 24 tuntia ennen aikaa."
      ),
      l3(
        "Ở ô “Chính sách hủy đặt chỗ”, viết ngắn gọn quy định của salon rồi bấm “Lưu”.",
        "In the cancellation policy box, write your salon's rules in a few lines and press “Save”.",
        "Kirjoita peruutusehtojen kenttään salongin säännöt lyhyesti ja tallenna."
      ),
      l3(
        "Ở khung “Nhận thanh toán qua chuyển khoản”, điền “Tên ngân hàng”, “Số tài khoản”, “Tên chủ tài khoản” rồi bấm “Lưu thông tin ngân hàng”.",
        "Under bank transfers, fill in the bank name, account number and account holder, then press “Save bank details”.",
        "Täytä tilisiirtojen kohtaan pankin nimi, tilinumero ja tilinhaltija ja paina ”Tallenna pankkitiedot”."
      ),
      l3(
        "Ở khung “Thông tin xuất hóa đơn”, điền “Tên công ty”, “Địa chỉ công ty”, “Mã số doanh nghiệp / mã số thuế”, “Thuế VAT (%)” rồi bấm “Lưu thông tin hóa đơn”.",
        "Under “Invoice details”, fill in the company name, address, business ID and VAT %, then save.",
        "Täytä kohtaan ”Laskutustiedot” yrityksen nimi, osoite, Y-tunnus ja ALV-% ja tallenna."
      ),
    ],
    tips: [
      l3(
        "Qua hạn huỷ, khách không tự huỷ trên mạng được nữa — chỉ salon huỷ được từ trang quản trị.",
        "After the deadline customers can no longer cancel online themselves — only the salon can, from the dashboard.",
        "Määräajan jälkeen asiakas ei voi enää perua itse verkossa — vain salonki voi perua hallintapaneelista."
      ),
      l3(
        "Khách thấy chính sách huỷ sau khi đặt lịch xong và trong email xác nhận.",
        "Customers see the cancellation policy right after booking and in the confirmation email.",
        "Asiakas näkee peruutusehdot heti varauksen jälkeen ja vahvistusviestissä."
      ),
    ],
    quiz: [
      {
        q: l3("“Khách được hủy trước 24 giờ” nghĩa là gì?", "What does “Customers can cancel up to 24 hours before” mean?", "Mitä tarkoittaa, että asiakas voi perua viimeistään 24 tuntia ennen?"),
        options: [l3("Qua thời hạn đó, khách không tự huỷ trên mạng được nữa", "After that deadline customers can no longer cancel online themselves", "Määräajan jälkeen asiakas ei voi enää perua itse verkossa"), l3("Khách phải trả tiền trước 24 giờ", "Customers must pay 24 hours ahead", "Asiakkaan on maksettava 24 tuntia etukäteen"), l3("Salon đóng cửa 24 giờ", "The salon closes for 24 hours", "Salonki on kiinni 24 tuntia")],
        answer: 0,
        why: l3("Sau hạn, chỉ salon mới huỷ được từ trang quản trị.", "After the deadline only the salon can cancel, from the dashboard.", "Määräajan jälkeen vain salonki voi perua hallintapaneelista."),
      },
      {
        q: l3("Khách thấy thông tin chuyển khoản của salon khi nào?", "When do customers see the salon's bank details?", "Milloin asiakas näkee salongin pankkitiedot?"),
        options: [l3("Khi đặt lịch", "When they book", "Varatessaan ajan"), l3("Không bao giờ", "Never", "Ei koskaan"), l3("Chỉ khi gọi điện hỏi", "Only if they phone and ask", "Vain soittamalla")],
        answer: 0,
        why: l3("Nhờ vậy khách chuyển khoản thẳng cho salon.", "That way they can transfer the money straight to the salon.", "Näin asiakas voi maksaa tilisiirrolla suoraan salongille."),
      },
      {
        q: l3("Vì sao phải điền “Thông tin xuất hóa đơn”?", "Why must you fill in the invoice details?", "Miksi laskutustiedot on täytettävä?"),
        options: [l3("Để trang đẹp hơn", "To make the page look nicer", "Jotta sivu näyttäisi paremmalta"), l3("Điền đủ thì mới xuất được hoá đơn ở quầy thanh toán", "Invoices can only be issued at checkout once they are complete", "Laskun voi tehdä kassalla vasta, kun tiedot on täytetty"), l3("Không cần điền", "You don't have to", "Niitä ei tarvitse täyttää")],
        answer: 1,
        why: l3("Tên công ty, địa chỉ, mã số thuế và VAT được in trên hoá đơn.", "The company name, address, business ID and VAT are printed on the invoice.", "Yrityksen nimi, osoite, Y-tunnus ja ALV tulostuvat laskulle."),
      },
    ],
  },
  /* ================= owners: reach ================= */
  {
    slug: "chia-se-link",
    course: "o-reach",
    guide: "share",
    title: l3("Chia sẻ link đặt lịch", "Share your booking link", "Jaa varauslinkkisi"),
    summary: l3("Sao chép link, tải mã QR và lấy mã nhúng cho website riêng.", "Copy the link, download the QR code and get the embed code for your own site.", "Kopioi linkki, lataa QR-koodi ja hae upotuskoodi omille sivuillesi."),
    video: video("chia-se-link", 58, "2026-11-16"),
    href: "/business/dashboard/settings",
    hrefLabel: l3("Mở Cài đặt", "Open Settings", "Avaa Asetukset"),
    steps: [
      l3(
        "Vào “Cài đặt”: trên cùng là “Trang đặt lịch công khai”. Bấm biểu tượng sao chép để lấy link và dán vào Facebook, Instagram hoặc tin nhắn.",
        "Open “Settings”: at the top is your “Public booking page”. Tap the copy icon and paste the link into Facebook, Instagram or a message.",
        "Avaa ”Asetukset”: ylhäällä on julkinen varaussivusi. Kopioi linkki ja liitä se Facebookiin, Instagramiin tai viestiin."
      ),
      l3("Bấm biểu tượng mã QR để tải mã QR của salon, dùng để in danh thiếp, tờ rơi hoặc dán ở quầy.", "Tap the QR icon to download your salon's QR code for business cards, flyers or the counter.", "Napauta QR-kuvaketta ja lataa salongin QR-koodi käyntikortteihin, esitteisiin tai tiskille."),
      l3("Bấm “Xem trang” để xem trang salon đúng như khách thấy.", "Press “View page” to see your salon page as customers do.", "Paina ”Näytä sivu” nähdäksesi salongin sivun asiakkaan silmin."),
      l3(
        "Có website riêng: ở “Website & nhúng đặt lịch”, bấm “Sao chép liên kết” hoặc “Lấy mã nhúng” rồi dán vào website.",
        "With your own website: under “Website & booking embed”, press “Copy link” or “Get embed code” and paste it into your site.",
        "Jos sinulla on omat sivut: kopioi linkki tai upotuskoodi kohdasta ”Verkkosivu ja upotus” ja liitä se sivuillesi."
      ),
    ],
    tips: [
      l3("Trang “Tổng quan” cũng có nút “Sao chép link đặt lịch” để gửi nhanh.", "The “Overview” page also has a “Copy booking link” button for quick sharing.", "Myös yleiskatsauksessa on ”Kopioi varauslinkki” -painike."),
    ],
    quiz: [
      {
        q: l3("Link đặt lịch công khai của salon nằm ở đâu?", "Where is your salon's public booking link?", "Missä salongin julkinen varauslinkki on?"),
        options: [l3("Trên cùng trang Cài đặt", "At the top of Settings", "Asetusten yläosassa"), l3("Trong mục Kho hàng", "Under Inventory", "Varastossa"), l3("Chỉ VaraaAi mới biết", "Only VaraaAi knows it", "Vain VaraaAi tietää sen")],
        answer: 0,
        why: l3("Phần “Trang đặt lịch công khai” có nút sao chép, mã QR và “Xem trang”.", "“Public booking page” has copy, QR and “View page” buttons.", "”Julkinen varaussivu” -kohdassa on kopiointi, QR ja ”Näytä sivu”."),
      },
      {
        q: l3("Muốn khách đặt lịch ngay trên website riêng, bạn dùng gì?", "What lets customers book right on your own website?", "Millä asiakkaat voivat varata suoraan omilla sivuillasi?"),
        options: [l3("Lấy mã nhúng", "Get embed code", "Upotuskoodi"), l3("Xuất Excel", "Excel export", "Excel-vienti"), l3("Thêm ca", "Add shift", "Lisää vuoro")],
        answer: 0,
        why: l3("Dán đoạn mã vào website là trang đặt lịch hiện ngay tại đó.", "Paste the code into your site and the booking page appears there.", "Liitä koodi sivuillesi, niin varaussivu näkyy siellä."),
      },
      {
        q: l3("Mã QR của salon dùng để làm gì?", "What is the salon's QR code for?", "Mihin salongin QR-koodia käytetään?"),
        options: [l3("In lên danh thiếp, tờ rơi, dán ở quầy để khách quét và đặt lịch", "Printing on cards and flyers or at the counter so customers scan and book", "Käyntikortteihin, esitteisiin tai tiskille, jotta asiakas skannaa ja varaa"), l3("Thanh toán", "Taking payments", "Maksamiseen"), l3("Đăng nhập", "Signing in", "Kirjautumiseen")],
        answer: 0,
        why: l3("Quét mã là mở thẳng trang đặt lịch của salon.", "Scanning it opens your booking page directly.", "Skannaus avaa varaussivusi suoraan."),
      },
    ],
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
    video: video("website-salon", 72, "2026-11-16"),
    href: "/business/dashboard/landing",
    hrefLabel: l3("Mở Trang landing", "Open the website editor", "Avaa verkkosivujen muokkaus"),
    steps: [
      l3(
        "Bấm mục “Trang landing”. Ở “Bộ màu của website”, chọn một phong cách (ví dụ “Champagne”) — cả website đổi màu ngay.",
        "Open the website editor. Under the colour sets, pick a style (for example “Champagne”) — the whole site changes colour at once.",
        "Avaa verkkosivujen muokkaus. Valitse värimaailma (esimerkiksi ”Champagne”) — koko sivusto vaihtaa väriä heti."
      ),
      l3(
        "Ở “Phần đầu trang”, chọn bố cục, điền dòng chữ nhỏ, “Tiêu đề”, “Nội dung”, thêm “Ảnh trình chiếu” (tối đa 5) và “Nhãn nút”, rồi bấm “Lưu”.",
        "In the top section, choose a layout, fill in the small line, the title and the text, add up to 5 slideshow photos and the button label, then save.",
        "Valitse yläosan asettelu, täytä pieni rivi, otsikko ja teksti, lisää enintään 5 kuvaa ja painikkeen teksti ja tallenna."
      ),
      l3(
        "Ở “Các phần trên trang chủ”, bật hoặc tắt từng phần: Giới thiệu, Dịch vụ nổi bật, Thư viện ảnh, Đội ngũ, Đánh giá khách hàng…",
        "Under the home-page sections, turn each part on or off: about, featured services, gallery, team, customer reviews…",
        "Ota etusivun osiot käyttöön tai pois: esittely, suositut palvelut, galleria, tiimi, asiakasarviot…"
      ),
      l3(
        "Bấm “Xem trước” để kiểm tra, rồi bật “Xuất bản”. Bấm “Sao chép link” để gửi địa chỉ website cho khách.",
        "Press preview to check it, then turn on publishing. Copy the link to send your website address to customers.",
        "Tarkista esikatselusta ja ota julkaisu käyttöön. Kopioi linkki ja lähetä sivuston osoite asiakkaille."
      ),
    ],
    tips: [
      l3(
        "Các phần có nhãn “Tự động” (dịch vụ, đội ngũ, đánh giá) tự lấy dữ liệu sẵn có của salon — bạn không phải nhập lại.",
        "Parts marked automatic (services, team, reviews) use the data your salon already has — nothing to type again.",
        "Automaattiset osiot (palvelut, tiimi, arviot) käyttävät salongin olemassa olevia tietoja — mitään ei tarvitse kirjoittaa uudelleen."
      ),
      l3(
        "Khi còn là “Bản nháp”, khách chưa xem được website. Chỉ sau khi bật “Xuất bản” thì ai cũng mở được.",
        "While it is a draft, customers cannot see the website. Only after you publish can anyone open it.",
        "Luonnoksena sivusto ei näy asiakkaille. Vasta julkaisun jälkeen kuka tahansa voi avata sen."
      ),
    ],
    quiz: [
      {
        q: l3("Đổi màu cho cả website ở đâu?", "Where do you change the colours of the whole website?", "Missä koko sivuston värit vaihdetaan?"),
        options: [l3("“Bộ màu của website” trong mục Trang landing", "The colour sets in the website editor", "Verkkosivujen muokkauksen värimaailmoissa"), l3("Trang Giờ mở cửa", "The Opening hours page", "Aukioloajat-sivulla"), l3("Không đổi được", "It can't be changed", "Niitä ei voi vaihtaa")],
        answer: 0,
        why: l3("Chọn một phong cách là cả website đổi màu ngay.", "Pick a style and the whole site changes colour at once.", "Kun valitset tyylin, koko sivusto vaihtaa väriä heti."),
      },
      {
        q: l3("Khách xem được website của salon khi nào?", "When can customers see the salon's website?", "Milloin asiakkaat näkevät salongin verkkosivut?"),
        options: [l3("Ngay khi tạo salon", "As soon as the salon is created", "Heti kun salonki on luotu"), l3("Sau khi bạn bật “Xuất bản”", "After you turn on publishing", "Kun otat julkaisun käyttöön"), l3("Sau 30 ngày", "After 30 days", "30 päivän kuluttua")],
        answer: 1,
        why: l3("Trước đó website là bản nháp, chỉ bạn xem được qua “Xem trước”.", "Before that it is a draft that only you can see in the preview.", "Sitä ennen sivusto on luonnos, jonka näet vain esikatselussa."),
      },
      {
        q: l3("Phần có nhãn “Tự động” nghĩa là gì?", "What does a part marked “automatic” mean?", "Mitä automaattinen osio tarkoittaa?"),
        options: [l3("Tự lấy dữ liệu sẵn có của salon", "It uses the data your salon already has", "Se käyttää salongin olemassa olevia tietoja"), l3("Tự xoá sau một tuần", "It deletes itself after a week", "Se poistuu viikon kuluttua"), l3("Chỉ hiện ban đêm", "It only shows at night", "Se näkyy vain yöllä")],
        answer: 0,
        why: l3("Dịch vụ, đội ngũ và đánh giá được lấy từ trang quản trị.", "Services, team and reviews come from your dashboard.", "Palvelut, tiimi ja arviot tulevat hallintapaneelista."),
      },
    ],
  },
  {
    slug: "fanpage",
    course: "o-reach",
    guide: "fanpage",
    title: l3("Fanpage: đăng bài cho khách theo dõi", "Fanpage: post for your followers", "Fanisivu: julkaise seuraajillesi"),
    summary: l3("Đăng ảnh, video, hẹn giờ đăng và ghim bài quan trọng.", "Post photos and videos, schedule posts and pin the important ones.", "Julkaise kuvia ja videoita, ajasta julkaisut ja kiinnitä tärkeimmät."),
    video: video("fanpage", 55, "2026-11-16"),
    href: "/business/dashboard/fanpage",
    hrefLabel: l3("Mở Fanpage", "Open Fanpage", "Avaa fanisivu"),
    steps: [
      l3(
        "Bấm mục “Fanpage” và viết nội dung vào ô “Hôm nay salon có gì mới?”.",
        "Open “Fanpage” and write your post in the box at the top.",
        "Avaa fanisivu ja kirjoita julkaisu yläosan kenttään."
      ),
      l3(
        "Chọn “Nhãn” cho bài (“Khuyến mãi”, “Tác phẩm mới”, “Thông báo”, “Mẹo làm đẹp”) và “Nút dưới bài” (“Đặt lịch ngay”, “Xem sản phẩm”, “Gọi ngay”).",
        "Pick a label for the post (offer, new work, notice or beauty tip) and a button under it (book now, see products or call now).",
        "Valitse julkaisulle tunniste (tarjous, uusi työ, tiedote tai kauneusvinkki) ja painike (varaa heti, katso tuotteet tai soita)."
      ),
      l3(
        "Bấm “Ảnh” hoặc “Video” để thêm hình; bấm “Hẹn giờ” nếu muốn đăng sau, “Ghim lên đầu” cho bài quan trọng.",
        "Add a photo or a video; schedule the post for later if you like, and pin the important ones to the top.",
        "Lisää kuva tai video; ajasta julkaisu halutessasi myöhemmäksi ja kiinnitä tärkeät ylimmäksi."
      ),
      l3(
        "Bấm “Đăng bài”. Bấm “Xem fanpage” để xem trang như khách thấy, hoặc “Sao chép link” để chia sẻ.",
        "Press “Publish”. Open the fanpage to see it as customers do, or copy the link to share it.",
        "Paina julkaisupainiketta. Avaa fanisivu nähdäksesi sen asiakkaan silmin tai kopioi linkki jaettavaksi."
      ),
    ],
    tips: [
      l3(
        "Khách đã bấm “Theo dõi” salon sẽ thấy bài mới ngay trong “Bảng tin” của họ.",
        "Customers who follow your salon see new posts straight away in their feed.",
        "Salonkia seuraavat asiakkaat näkevät uudet julkaisut heti syötteessään."
      ),
      l3(
        "Thêm nút “Đặt lịch ngay” dưới bài khuyến mãi để khách đặt lịch chỉ với một lần bấm.",
        "Add the “book now” button under an offer so customers can book with one tap.",
        "Lisää tarjouksen alle varauspainike, niin asiakas varaa yhdellä napautuksella."
      ),
    ],
    quiz: [
      {
        q: l3("Ai thấy bài đăng trên Fanpage của salon?", "Who sees the posts on your salon's fanpage?", "Ketkä näkevät salongin fanisivun julkaisut?"),
        options: [l3("Chỉ chủ salon", "Only the owner", "Vain omistaja"), l3("Khách theo dõi thấy trong bảng tin, và ai cũng xem được trên fanpage", "Followers see them in their feed, and anyone can view the fanpage", "Seuraajat näkevät ne syötteessään, ja kuka tahansa voi katsoa fanisivua"), l3("Chỉ nhân viên", "Only the staff", "Vain henkilökunta")],
        answer: 1,
        why: l3("Fanpage là kênh công khai của salon.", "The fanpage is your salon's public channel.", "Fanisivu on salongin julkinen kanava."),
      },
      {
        q: l3("Muốn bài tự đăng vào ngày mai, bạn bấm gì?", "Which button makes a post go out tomorrow by itself?", "Millä painikkeella julkaisu lähtee itsestään huomenna?"),
        options: [l3("“Hẹn giờ”", "Schedule", "Ajasta"), l3("“Ghim lên đầu”", "Pin to top", "Kiinnitä ylimmäksi"), l3("“Gọi ngay”", "Call now", "Soita heti")],
        answer: 0,
        why: l3("Chọn ngày giờ, bài sẽ tự đăng đúng lúc đó.", "Choose the date and time and the post goes out by itself.", "Valitse päivä ja aika, niin julkaisu lähtee itsestään."),
      },
      {
        q: l3("Nút nào dưới bài giúp khách đặt lịch nhanh nhất?", "Which button under a post lets customers book fastest?", "Mikä julkaisun alla oleva painike auttaa varaamaan nopeimmin?"),
        options: [l3("“Đặt lịch ngay”", "Book now", "Varaa heti"), l3("Không có nút nào", "There is no such button", "Sellaista ei ole"), l3("“Ghim lên đầu”", "Pin to top", "Kiinnitä ylimmäksi")],
        answer: 0,
        why: l3("Khách bấm nút là sang thẳng trang đặt lịch của salon.", "One tap takes the customer straight to your booking page.", "Yksi napautus vie asiakkaan suoraan varaussivulle."),
      },
    ],
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
    title: l3("Màu riêng cho lịch online", "Own colours for online bookings", "Omat värit verkkovarauksille"),
    summary: l3("Phân biệt “Khách tự đặt online” với “Salon tự thêm” bằng màu, và xem khách đặt lúc nào.", "Tell “Booked online” from “Added by the salon” by colour, and see when each booking was made.", "Erota verkkovaraukset salongin lisäämistä väreillä ja näe, milloin varaus tehtiin."),
    video: video("mau-lich-hen", 47, "2026-11-16"),
    href: "/business/dashboard/settings",
    hrefLabel: l3("Mở Cài đặt", "Open Settings", "Avaa Asetukset"),
    steps: [
      l3(
        "Vào “Cài đặt”, phần “Giao diện & màu sắc”, tìm thẻ “Màu ô lịch hẹn”.",
        "Open “Settings”, go to “Appearance & colours” and find the “Booking colours” card.",
        "Avaa ”Asetukset”, siirry kohtaan ”Ulkoasu ja värit” ja etsi varausten värit."
      ),
      l3(
        "Ở dòng “Khách tự đặt online”, bấm một ô màu có sẵn, hoặc bấm “Màu nền” và “Màu chữ” để tự chọn.",
        "On the “Booked online” row, tap a ready-made colour, or use “Background” and “Text” to pick your own.",
        "Valitse verkkovarausten riviltä valmis väri tai määritä tausta- ja tekstiväri itse."
      ),
      l3("Làm tương tự với dòng “Salon tự thêm”, rồi xem kết quả ở phần “Xem trước”.", "Do the same on the “Added by the salon” row and check the result under “Preview”.", "Tee sama salongin lisäämille varauksille ja katso tulos esikatselusta."),
      l3(
        "Bấm vào một lịch hẹn trên lịch để thấy dòng “Khách đặt online lúc …” hoặc “Salon thêm lúc …”.",
        "Tap any booking on the calendar to see “Booked online at …” or “Added by the salon at …”.",
        "Napauta varausta kalenterissa nähdäksesi, milloin se tehtiin verkossa tai milloin salonki lisäsi sen."
      ),
    ],
    tips: [
      l3("Nếu hai loại lịch đang cùng màu, hệ thống sẽ nhắc bạn đổi.", "If both kinds of booking end up the same colour, you are warned to change one.", "Jos molemmat varaustyypit ovat samanvärisiä, saat kehotuksen vaihtaa väriä."),
      l3("Lịch đã xong hoặc khách không đến vẫn giữ màu trạng thái riêng.", "Completed and no-show bookings keep their own status colours.", "Valmiit ja saapumatta jääneet varaukset säilyttävät omat tilavärinsä."),
    ],
    quiz: [
      {
        q: l3("Đổi màu ô lịch hẹn ở đâu?", "Where do you change booking colours?", "Missä varausten värit vaihdetaan?"),
        options: [l3("Cài đặt → Giao diện & màu sắc → Màu ô lịch hẹn", "Settings → Appearance & colours → Booking colours", "Asetukset → Ulkoasu ja värit → Varausten värit"), l3("Trang Dịch vụ", "The Services page", "Palvelut-sivulla"), l3("Không đổi được", "They can't be changed", "Niitä ei voi vaihtaa")],
        answer: 0,
        why: l3("Mỗi loại lịch có màu nền và màu chữ riêng.", "Each kind of booking has its own background and text colour.", "Kummallakin varaustyypillä on oma tausta- ja tekstivärinsä."),
      },
      {
        q: l3("Hai loại lịch được tô màu khác nhau là gì?", "Which two kinds of booking get different colours?", "Mitkä kaksi varaustyyppiä saavat eri värit?"),
        options: [l3("Khách tự đặt online và Salon tự thêm", "Booked online and added by the salon", "Verkossa varatut ja salongin lisäämät"), l3("Buổi sáng và buổi chiều", "Morning and afternoon", "Aamu ja iltapäivä"), l3("Khách nam và khách nữ", "Men and women", "Miehet ja naiset")],
        answer: 0,
        why: l3("Nhìn màu là biết lịch đến từ đâu.", "The colour tells you at a glance where a booking came from.", "Väristä näkee heti, mistä varaus tuli."),
      },
      {
        q: l3("Làm sao biết một lịch được đặt lúc nào?", "How do you find out when a booking was made?", "Mistä näet, milloin varaus tehtiin?"),
        options: [l3("Bấm vào lịch hẹn và đọc dòng “Khách đặt online lúc …”", "Tap the booking and read “Booked online at …”", "Napauta varausta ja lue varaushetki"), l3("Hỏi khách", "Ask the customer", "Kysy asiakkaalta"), l3("Không xem được", "You can't", "Sitä ei näe")],
        answer: 0,
        why: l3("Lịch salon tự thêm thì ghi “Salon thêm lúc …”.", "Bookings added by the salon say “Added by the salon at …”.", "Salongin lisäämissä varauksissa lukee lisäysaika."),
      },
    ],
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
    video: video("doanh-thu-nhan-vien", 79, "2026-11-16"),
    href: "/business/dashboard/income",
    hrefLabel: l3("Mở Quản trị doanh thu", "Open Income management", "Avaa Tulojen hallinta"),
    steps: [
      l3(
        "Nhân viên: làm xong cho khách, mở lịch hẹn đó trên trang “Lịch hẹn” rồi bấm “Báo cáo thu nhập”.",
        "Staff: after the visit, open that booking on the “Bookings” page and press “Report income”.",
        "Työntekijä: avaa käynnin jälkeen varaus ”Varaukset”-sivulla ja paina ”Raportoi tulot”."
      ),
      l3(
        "Nhập số tiền khách đã trả vào đúng ô (tiền mặt, ngân hàng, MobilePay, trả trước online hoặc thẻ quà tặng); bấm “Điền đủ” để điền nhanh cả số tiền.",
        "Enter what the customer paid in the right box (cash, bank, MobilePay, paid online in advance or gift card); “Fill in” enters the full amount for you.",
        "Kirjaa asiakkaan maksama summa oikeaan kenttään (käteinen, pankki, MobilePay, ennakkoon verkossa tai lahjakortti); ”Täytä” lisää koko summan."
      ),
      l3(
        "Ghi tiền tip vào ô “Tiền tip” nếu có, thêm ghi chú hoặc ảnh biên lai, rồi bấm “Gửi báo cáo”.",
        "Add any tip under “Tip”, a note or a photo of the receipt if you like, then press “Send report”.",
        "Lisää mahdollinen tippi, huomautus tai kuva kuitista ja paina ”Lähetä raportti”."
      ),
      l3(
        "Chủ salon: mở “Quản trị doanh thu”, đối chiếu từng báo cáo với số cần thu rồi bấm “Duyệt”; số chưa đúng thì bấm “Chưa duyệt” để nhân viên sửa.",
        "Owner: open “Income management”, compare each report with the amount due and press “Approve”; if it's wrong, press “Don't approve” so the staff member corrects it.",
        "Omistaja: avaa ”Tulojen hallinta”, vertaa raporttia perittävään summaan ja paina ”Hyväksy”; jos summa on väärä, paina ”Älä hyväksy”, niin työntekijä korjaa sen."
      ),
      l3(
        "Xem phần “Theo nhân viên” để biết mỗi người thu được bao nhiêu trong kỳ đã chọn.",
        "Look at “By staff member” to see how much each person took in the chosen period.",
        "Katso kohdasta ”Työntekijöittäin”, paljonko kukin on tuonut valitulla jaksolla."
      ),
    ],
    tips: [
      l3(
        "Tiền tip là của riêng nhân viên: không cộng vào doanh thu salon, chỉ để thống kê tip cuối tháng.",
        "Tips belong to the staff member: they are not added to the salon's income, only counted for the monthly tip summary.",
        "Tipit kuuluvat työntekijälle: niitä ei lisätä salongin tuloihin, vaan ne tilastoidaan kuukauden yhteenvetoa varten."
      ),
      l3(
        "Bật “Nhắc nhân viên báo cáo”: lịch hẹn kết thúc quá 24 giờ mà chưa báo cáo thì ứng dụng tự nhắc nhân viên.",
        "Turn on “Remind staff to report”: when a booking ended over 24 hours ago with no report, the app reminds the staff member.",
        "Ota käyttöön ”Muistuta henkilökuntaa raportoimaan”: jos varauksen päättymisestä on yli 24 tuntia eikä raporttia ole, sovellus muistuttaa työntekijää."
      ),
    ],
    quiz: [
      {
        q: l3("Nhân viên báo cáo số tiền đã thu ở đâu?", "Where does a staff member report what they took?", "Missä työntekijä raportoi perimänsä summan?"),
        options: [l3("Mở lịch hẹn của khách và bấm “Báo cáo thu nhập”", "Open the customer's booking and press “Report income”", "Avaa asiakkaan varaus ja paina ”Raportoi tulot”"), l3("Nhắn tin cho chủ salon", "Text the owner", "Lähettää viestin omistajalle"), l3("Ghi vào sổ giấy", "Write it in a paper notebook", "Kirjoittaa paperivihkoon")],
        answer: 0,
        why: l3("Báo cáo gắn với đúng lịch hẹn nên dễ đối chiếu với số cần thu.", "The report is tied to the booking, so it is easy to compare with the amount due.", "Raportti liittyy varaukseen, joten sitä on helppo verrata perittävään summaan."),
      },
      {
        q: l3("Tiền tip có được cộng vào doanh thu của salon không?", "Are tips added to the salon's income?", "Lisätäänkö tipit salongin tuloihin?"),
        options: [l3("Có, cộng hết", "Yes, all of it", "Kyllä, kokonaan"), l3("Không, tip là của riêng nhân viên", "No, tips belong to the staff member", "Ei, tipit kuuluvat työntekijälle"), l3("Cộng một nửa", "Half of it", "Puolet")],
        answer: 1,
        why: l3("Tip chỉ được ghi lại để thống kê cuối tháng.", "Tips are only recorded for the monthly summary.", "Tipit kirjataan vain kuukauden yhteenvetoa varten."),
      },
      {
        q: l3("Số tiền trong báo cáo chưa đúng, chủ salon làm gì?", "The amount in a report is wrong — what does the owner do?", "Raportin summa on väärä — mitä omistaja tekee?"),
        options: [l3("Bấm “Chưa duyệt” để nhân viên sửa lại", "Press “Don't approve” so the staff member corrects it", "Painaa ”Älä hyväksy”, jotta työntekijä korjaa sen"), l3("Xoá lịch hẹn", "Delete the booking", "Poistaa varauksen"), l3("Bỏ qua", "Ignore it", "Jättää huomiotta")],
        answer: 0,
        why: l3("Báo cáo chưa duyệt quay về cho nhân viên cập nhật.", "A report that isn't approved goes back to the staff member to update.", "Hyväksymätön raportti palaa työntekijälle päivitettäväksi."),
      },
    ],
  },
  {
    slug: "xuat-excel",
    course: "o-daily",
    fresh: true,
    title: l3("Xuất Excel: doanh thu, khách hàng, đơn hàng", "Excel exports: income, customers, orders", "Excel-viennit: tulot, asiakkaat, tilaukset"),
    summary: l3("Tải bảng doanh thu, danh sách khách và đơn hàng về máy dưới dạng Excel.", "Download income sheets, customer lists and orders as Excel files.", "Lataa tulotaulukot, asiakasluettelot ja tilaukset Excel-tiedostoina."),
    video: null, // batch 7
    href: "/business/dashboard/income",
    hrefLabel: l3("Mở Quản trị doanh thu", "Open Income management", "Avaa Tulojen hallinta"),
    steps: [
      l3(
        "Doanh thu: mở “Quản trị doanh thu”, chọn khoảng thời gian (ví dụ “Tháng này”) rồi bấm “Bảng tính”.",
        "Income: open “Income management”, choose a period (for example “This month”) and press “Spreadsheet”.",
        "Tulot: avaa ”Tulojen hallinta”, valitse jakso (esimerkiksi tämä kuukausi) ja paina ”Taulukko”."
      ),
      l3(
        "Bấm “Tải bảng (Excel)”: tệp có mỗi lịch hẹn một dòng và dòng tổng dưới từng nhân viên.",
        "Press “Download (Excel)”: the file has one row per booking and a totals row under each staff member.",
        "Paina ”Lataa (Excel)”: tiedostossa on rivi jokaista varausta kohti ja summarivi kunkin työntekijän alla."
      ),
      l3(
        "Khách hàng: mở “Khách hàng”, chọn nhóm khách muốn tải rồi bấm “Xuất Excel (CSV)”.",
        "Customers: open “Customers”, choose the group you want and press “Export to Excel (CSV)”.",
        "Asiakkaat: avaa ”Asiakkaat”, valitse haluamasi ryhmä ja paina ”Vie Exceliin (CSV)”."
      ),
      l3(
        "Đơn hàng: khi salon đã có đơn sản phẩm, mở “Đơn hàng” và bấm “Xuất Excel (CSV)”.",
        "Orders: once the salon has product orders, open “Orders” and press “Export to Excel (CSV)”.",
        "Tilaukset: kun salongilla on tuotetilauksia, avaa ”Tilaukset” ja paina ”Vie Exceliin (CSV)”."
      ),
    ],
    tips: [
      l3(
        "Danh sách khách tải về gồm đúng nhóm bạn đang chọn — chọn “Tất cả” nếu muốn tải toàn bộ.",
        "The customer file contains exactly the group you have selected — choose “All” to download everyone.",
        "Asiakastiedosto sisältää juuri valitsemasi ryhmän — valitse ”Kaikki”, jos haluat ladata kaikki."
      ),
      l3(
        "Các tệp này có thông tin của khách: chỉ gửi cho người thật sự cần, ví dụ kế toán.",
        "These files contain customer details: send them only to people who really need them, such as your accountant.",
        "Tiedostoissa on asiakastietoja: lähetä ne vain niitä todella tarvitseville, esimerkiksi kirjanpitäjälle."
      ),
    ],
    quiz: [
      {
        q: l3("Nút “Tải bảng (Excel)” của doanh thu nằm ở đâu?", "Where is the income “Download (Excel)” button?", "Missä tulojen ”Lataa (Excel)” -painike on?"),
        options: [l3("Quản trị doanh thu, sau khi chọn “Bảng tính”", "Income management, after choosing “Spreadsheet”", "Tulojen hallinnassa, kun valitset ”Taulukko”"), l3("Trang Giờ mở cửa", "The Opening hours page", "Aukioloajat-sivulla"), l3("Trang Dịch vụ", "The Services page", "Palvelut-sivulla")],
        answer: 0,
        why: l3("Bảng tính hiện từng lịch hẹn theo từng nhân viên; tải về là mở được bằng Excel.", "The spreadsheet lists each booking per staff member; the download opens in Excel.", "Taulukossa on jokainen varaus työntekijöittäin; ladattu tiedosto aukeaa Excelissä."),
      },
      {
        q: l3("Danh sách khách tải về gồm những ai?", "Who is in the customer file you download?", "Keitä ladatussa asiakastiedostossa on?"),
        options: [l3("Luôn là toàn bộ khách", "Always every customer", "Aina kaikki asiakkaat"), l3("Đúng nhóm khách bạn đang chọn", "Exactly the group you have selected", "Juuri valitsemasi ryhmä"), l3("Chỉ khách VIP", "Only VIP customers", "Vain VIP-asiakkaat")],
        answer: 1,
        why: l3("Chọn nhóm trước (Tất cả, Khách mới, Lâu chưa quay lại…) rồi mới bấm xuất.", "Pick the group first (All, New, Not seen for a while…) and then export.", "Valitse ensin ryhmä (kaikki, uudet, pitkään poissa olleet…) ja vie sitten."),
      },
      {
        q: l3("Nên gửi các tệp Excel này cho ai?", "Who should you send these Excel files to?", "Kenelle nämä Excel-tiedostot kannattaa lähettää?"),
        options: [l3("Chỉ người thật sự cần, ví dụ kế toán", "Only people who really need them, such as your accountant", "Vain niitä todella tarvitseville, kuten kirjanpitäjälle"), l3("Đăng lên mạng xã hội", "Post them on social media", "Julkaista somessa"), l3("Gửi cho mọi khách", "Send them to every customer", "Lähettää kaikille asiakkaille")],
        answer: 0,
        why: l3("Tệp có tên và số điện thoại của khách, cần giữ kín.", "The files contain customers' names and phone numbers and must be kept private.", "Tiedostoissa on asiakkaiden nimiä ja puhelinnumeroita, ja ne on pidettävä yksityisinä."),
      },
    ],
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
    title: l3("Tin nhắn và trợ lý AI", "Messages and the AI assistant", "Viestit ja tekoälyavustaja"),
    summary: l3("Trả lời khách trong Hộp thư và bật trợ lý AI khi bạn vắng mặt.", "Answer customers in the inbox and let the AI reply while you're away.", "Vastaa asiakkaille ja anna tekoälyn vastata, kun olet poissa."),
    video: video("tin-nhan-ai", 55, "2026-11-16"),
    href: "/business/dashboard/messages",
    hrefLabel: l3("Mở Tin nhắn", "Open Messages", "Avaa Viestit"),
    steps: [
      l3(
        "Bấm mục “Tin nhắn”: trên cùng là số cuộc trò chuyện, tin chưa đọc và tin đang chờ bạn trả lời.",
        "Open “Messages”: at the top are your conversations, unread messages and those waiting for your reply.",
        "Avaa ”Viestit”: ylhäällä näkyvät keskustelut, lukemattomat viestit ja vastaustasi odottavat."
      ),
      l3("Lọc danh sách theo “Chưa đọc” hoặc “Chờ trả lời”, rồi bấm vào một khách để mở cuộc trò chuyện.", "Filter by “Unread” or “Awaiting reply”, then tap a customer to open the conversation.", "Suodata lukemattomat tai vastausta odottavat ja avaa keskustelu napauttamalla asiakasta."),
      l3(
        "Gõ câu trả lời vào ô “Nhập tin nhắn...” và bấm gửi — hoặc dùng câu trả lời mẫu: “Chào khách”, “Đặt lịch”, “Còn chỗ”, “Hết chỗ”, “Cảm ơn”; bấm “Thêm mẫu” để tạo mẫu riêng.",
        "Type a reply and press send — or use a quick reply (greeting, booking, slots free, fully booked, thanks); “Add template” makes your own.",
        "Kirjoita vastaus ja lähetä — tai käytä pikavastausta (tervehdys, varaus, vapaita aikoja, täynnä, kiitos); lisää myös omia malleja."
      ),
      l3(
        "Ở “Cài đặt tin nhắn”, đánh dấu “Bật trợ lý AI” để AI tự trả lời khách khi bạn vắng mặt, và bấm “Bật thông báo trên thiết bị này”.",
        "Under “Message settings”, tick “Turn on the AI assistant” so it answers while you're away, and press “Turn on notifications on this device”.",
        "Ota kohdassa ”Viestiasetukset” tekoälyavustaja käyttöön poissaolojasi varten ja salli ilmoitukset tällä laitteella."
      ),
    ],
    tips: [
      l3(
        "Trợ lý AI trả lời dựa trên dịch vụ và sản phẩm của salon; khách vẫn bấm được “Nói chuyện với chủ salon” bất cứ lúc nào.",
        "The AI answers from your services and products; customers can still press “Talk to the salon owner” at any time.",
        "Tekoäly vastaa palvelujesi ja tuotteidesi pohjalta; asiakas voi silti pyytää omistajaa milloin tahansa."
      ),
    ],
    quiz: [
      {
        q: l3("Trợ lý AI trả lời khách dựa trên gì?", "What does the AI assistant base its answers on?", "Mihin tekoälyavustajan vastaukset perustuvat?"),
        options: [l3("Dịch vụ và sản phẩm hiện có của salon", "Your salon's services and products", "Salonkisi palveluihin ja tuotteisiin"), l3("Tin tức trên mạng", "News from the internet", "Verkon uutisiin"), l3("Nó trả lời ngẫu nhiên", "It answers at random", "Se vastaa satunnaisesti")],
        answer: 0,
        why: l3("Vì vậy hãy giữ dịch vụ và giá luôn đúng.", "So keep your services and prices up to date.", "Pidä siis palvelut ja hinnat ajan tasalla."),
      },
      {
        q: l3("Cách trả lời nhanh nhất cho câu “Tiệm còn chỗ không?”", "What's the quickest way to answer “Do you have a free slot?”", "Mikä on nopein tapa vastata kysymykseen vapaista ajoista?"),
        options: [l3("Bấm câu trả lời mẫu “Còn chỗ”", "Tap the quick reply for free slots", "Napauttaa vapaista ajoista kertovaa pikavastausta"), l3("Gọi điện cho khách", "Call the customer", "Soittaa asiakkaalle"), l3("Chờ khách hỏi lại", "Wait for them to ask again", "Odottaa uutta kysymystä")],
        answer: 0,
        why: l3("Câu mẫu nằm ngay dưới ô nhập tin nhắn; bạn vẫn sửa được trước khi gửi.", "Quick replies sit under the message box, and you can edit them before sending.", "Pikavastaukset ovat viestikentän alla, ja voit muokata niitä ennen lähettämistä."),
      },
      {
        q: l3("Khi trợ lý AI đang bật, khách muốn gặp người thật thì sao?", "With the AI on, what if a customer wants a real person?", "Entä jos asiakas haluaa oikean ihmisen, kun tekoäly on päällä?"),
        options: [l3("Khách bấm “Nói chuyện với chủ salon”", "They press “Talk to the salon owner”", "Hän painaa ”Puhu omistajan kanssa”"), l3("Không có cách nào", "There is no way", "Se ei ole mahdollista"), l3("Khách phải đến tiệm", "They must come to the salon", "Hänen on tultava salonkiin")],
        answer: 0,
        why: l3("Bạn nhận được thông báo để trả lời trực tiếp.", "You get a notification so you can answer yourself.", "Saat ilmoituksen ja voit vastata itse."),
      },
    ],
  },
  {
    slug: "danh-gia-google",
    course: "o-daily",
    guide: "reviews",
    title: l3("Đánh giá và Google", "Reviews and Google", "Arvostelut ja Google"),
    summary: l3("Đăng đánh giá lên trang, trả lời khách và mời khách đánh giá trên Google.", "Publish reviews, reply to them and invite customers to review you on Google.", "Julkaise arvostelut, vastaa niihin ja pyydä Google-arvosteluja."),
    video: video("danh-gia-google", 60, "2026-11-16"),
    href: "/business/dashboard/reviews",
    hrefLabel: l3("Mở Đánh giá", "Open Reviews", "Avaa Arvostelut"),
    steps: [
      l3(
        "Bấm mục “Đánh giá”: trên cùng là điểm trung bình, số đánh giá “Chờ duyệt” và tỉ lệ phản hồi.",
        "Open “Reviews”: at the top are your average score, reviews awaiting approval and your reply rate.",
        "Avaa ”Arvostelut”: ylhäällä näkyvät keskiarvo, hyväksyntää odottavat arvostelut ja vastausprosentti."
      ),
      l3(
        "Với từng đánh giá, bấm “Đăng lên trang” để công khai hoặc “Ẩn”. Nút màu vàng đăng nhanh mọi đánh giá 4–5 sao đang chờ.",
        "For each review press “Publish” to show it or “Hide”. The gold button publishes every waiting 4–5 star review at once.",
        "Julkaise tai piilota jokainen arvostelu. Kultainen painike julkaisee kaikki odottavat 4–5 tähden arvostelut kerralla."
      ),
      l3(
        "Bấm “Trả lời”, chọn một mẫu (“Cảm ơn”, “Ghi nhận”, “Xin lỗi”), sửa cho hợp rồi bấm “Đăng phản hồi”.",
        "Press “Reply”, pick a template (thanks, noted, apology), adjust it and press “Post reply”.",
        "Paina ”Vastaa”, valitse malli (kiitos, huomioitu, pahoittelu), muokkaa ja julkaise vastaus."
      ),
      l3(
        "Thêm liên kết Google Maps trong “Cài đặt” để mời khách hài lòng đánh giá cả trên Google.",
        "Add your Google Maps link in “Settings” to invite happy customers to review you on Google too.",
        "Lisää Google Maps -linkki asetuksiin, niin tyytyväisiä asiakkaita pyydetään arvostelemaan myös Googlessa."
      ),
    ],
    tips: [
      l3("Đánh giá mới chỉ hiện trên trang của salon sau khi bạn bấm Đăng.", "A new review only shows on your salon's page after you publish it.", "Uusi arvostelu näkyy salongin sivulla vasta, kun julkaiset sen."),
      l3("Khách tự động nhận email mời đánh giá sau mỗi lịch hẹn đã hoàn thành.", "Customers automatically get a review invitation after every completed appointment.", "Asiakkaat saavat arvostelukutsun automaattisesti jokaisen valmiin käynnin jälkeen."),
    ],
    quiz: [
      {
        q: l3("Một đánh giá mới hiện trên trang salon khi nào?", "When does a new review appear on the salon's page?", "Milloin uusi arvostelu näkyy salongin sivulla?"),
        options: [l3("Ngay khi khách gửi", "As soon as the customer sends it", "Heti kun asiakas lähettää sen"), l3("Sau khi bạn bấm “Đăng lên trang”", "After you press “Publish”", "Kun painat ”Julkaise”"), l3("Sau 30 ngày", "After 30 days", "30 päivän kuluttua")],
        answer: 1,
        why: l3("Bạn duyệt từng đánh giá trước khi công khai.", "You approve each review before it goes public.", "Hyväksyt jokaisen arvostelun ennen julkaisua."),
      },
      {
        q: l3("Mẫu trả lời nào hợp với đánh giá 5 sao?", "Which reply template suits a 5-star review?", "Mikä vastausmalli sopii 5 tähden arvosteluun?"),
        options: [l3("Cảm ơn", "Thanks", "Kiitos"), l3("Xin lỗi", "Apology", "Pahoittelu"), l3("Không cần trả lời", "No reply needed", "Vastausta ei tarvita")],
        answer: 0,
        why: l3("Trả lời cả đánh giá tốt giúp khách thấy được trân trọng.", "Replying to good reviews too makes customers feel valued.", "Myös hyviin arvosteluihin vastaaminen saa asiakkaan tuntemaan itsensä arvostetuksi."),
      },
      {
        q: l3("Cần làm gì để khách được mời đánh giá trên Google?", "What do you need to do so customers are invited to review you on Google?", "Mitä tarvitaan, jotta asiakkaita pyydetään arvostelemaan Googlessa?"),
        options: [l3("Thêm liên kết Google Maps trong Cài đặt", "Add your Google Maps link in Settings", "Lisätä Google Maps -linkki asetuksiin"), l3("Trả phí cho Google", "Pay Google", "Maksaa Googlelle"), l3("Không làm được", "It can't be done", "Se ei onnistu")],
        answer: 0,
        why: l3("Phần “Có thêm đánh giá trên Google” có nút “Mở Cài đặt”.", "The “More reviews on Google” box has an “Open Settings” button.", "Googlen arvosteluosiossa on painike asetusten avaamiseen."),
      },
    ],
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
    title: l3("Thẻ quà tặng", "Gift cards", "Lahjakortit"),
    summary: l3("Tạo mẫu thẻ, gửi thẻ qua email, xác nhận thanh toán và kiểm tra mã khi khách đến.", "Create card designs, email cards, confirm payment and check the code at the visit.", "Luo korttimallit, lähetä kortit sähköpostilla, vahvista maksu ja tarkista koodi käynnillä."),
    video: video("the-qua-tang-salon", 74, "2026-11-16"),
    href: "/business/dashboard/gift-cards",
    hrefLabel: l3("Mở Thẻ quà tặng", "Open Gift cards", "Avaa Lahjakortit"),
    steps: [
      l3(
        "Bấm mục “Thẻ quà tặng”, rồi “Tạo mẫu thẻ mới”: chọn “Dịch vụ”, đặt “Tên thẻ”, “Giảm giá (%)”, “Hiệu lực”, “Số lần được dùng”, “Giá trị / giá bán” và bấm “Tạo mẫu thẻ”.",
        "Open “Gift cards” and press “New card design”: choose the service, name the card, set the discount %, validity, number of uses and price, then press “Create design”.",
        "Avaa ”Lahjakortit” ja luo uusi korttimalli: valitse palvelu, nimeä kortti, aseta alennus-%, voimassaolo, käyttökerrat ja hinta."
      ),
      l3(
        "Ở “Gửi thẻ quà tặng cho khách”, chọn “Mẫu thẻ”, nhập “Tên khách nhận thẻ”, “Email” và “Lời nhắn trên thẻ”.",
        "Under “Send a gift card”, choose the design and enter the recipient's name, email and a message for the card.",
        "Valitse kohdassa ”Lähetä lahjakortti” malli ja anna saajan nimi, sähköposti ja korttiin tuleva viesti."
      ),
      l3(
        "Khách đã trả tiền thì đánh dấu “Khách đã thanh toán — kích hoạt thẻ ngay”, rồi bấm “Tạo ảnh thẻ & gửi email cho khách”.",
        "If it is already paid, tick “Customer has paid — activate now”, then press “Create card image & email it”.",
        "Jos kortti on maksettu, valitse heti aktivointi ja paina kortin luonti- ja lähetyspainiketta."
      ),
      l3(
        "Khi khách đến: ở “Kiểm tra và dùng thẻ”, quét QR hoặc nhập “Mã thẻ”, bấm “Kiểm tra mã”, rồi “Ghi nhận lần dùng”.",
        "At the visit: under “Check and redeem”, scan the QR or type the card code, press “Check code”, then “Record a use”.",
        "Käynnillä: skannaa QR tai kirjoita kortin koodi, paina ”Tarkista koodi” ja kirjaa käyttökerta."
      ),
    ],
    tips: [
      l3(
        "Danh sách “Thẻ đã bán / đã gửi” cho xem ảnh thẻ, tải ảnh và gửi lại email. Thẻ khách tự mua trên website của salon cần bấm “Xác nhận đã thanh toán” để kích hoạt.",
        "“Sold / sent cards” lets you view or download the card image and resend the email. Cards bought on your salon website need “Confirm payment” to be activated.",
        "Myytyjen korttien luettelosta voit katsoa ja ladata kortin kuvan ja lähettää sähköpostin uudelleen. Verkkosivuilta ostetut kortit aktivoidaan vahvistamalla maksu."
      ),
    ],
    quiz: [
      {
        q: l3("Việc đầu tiên phải làm trước khi gửi thẻ quà tặng là gì?", "What must you do before you can send a gift card?", "Mitä on tehtävä ennen lahjakortin lähettämistä?"),
        options: [l3("Tạo ít nhất một mẫu thẻ", "Create at least one card design", "Luoda vähintään yksi korttimalli"), l3("In thẻ giấy", "Print paper cards", "Tulostaa paperikortteja"), l3("Bật trợ lý AI", "Turn on the AI assistant", "Ottaa tekoälyavustaja käyttöön")],
        answer: 0,
        why: l3("Mẫu thẻ quyết định dịch vụ, mức giảm, hiệu lực và giá bán.", "The design sets the service, discount, validity and price.", "Malli määrää palvelun, alennuksen, voimassaolon ja hinnan."),
      },
      {
        q: l3("Khách mang thẻ đến, bạn làm gì?", "A customer arrives with a card — what do you do?", "Asiakas tulee kortin kanssa — mitä teet?"),
        options: [l3("Quét QR hoặc nhập mã, bấm “Kiểm tra mã”, rồi “Ghi nhận lần dùng”", "Scan or type the code, press “Check code”, then “Record a use”", "Skannaat tai kirjoitat koodin, tarkistat sen ja kirjaat käytön"), l3("Tạo mẫu thẻ mới", "Create a new design", "Luot uuden mallin"), l3("Gửi lại email", "Resend the email", "Lähetät sähköpostin uudelleen")],
        answer: 0,
        why: l3("Thẻ hiện ra cho biết còn hiệu lực không và còn mấy lần dùng.", "The card shows whether it is valid and how many uses remain.", "Kortista näkyy, onko se voimassa ja montako käyttökertaa on jäljellä."),
      },
      {
        q: l3("Thẻ khách tự mua trên website của salon được kích hoạt khi nào?", "When is a card bought on your website activated?", "Milloin verkkosivuilta ostettu kortti aktivoituu?"),
        options: [l3("Khi bạn bấm “Xác nhận đã thanh toán”", "When you press “Confirm payment”", "Kun painat ”Vahvista maksu”"), l3("Ngay khi khách bấm mua", "As soon as the customer orders", "Heti tilauksen jälkeen"), l3("Sau 90 ngày", "After 90 days", "90 päivän kuluttua")],
        answer: 0,
        why: l3("Khách nhận mã qua email, nhưng thẻ chỉ dùng được sau khi salon xác nhận đã nhận tiền.", "The customer gets the code by email, but it only works once the salon confirms the payment.", "Asiakas saa koodin sähköpostiin, mutta kortti toimii vasta maksun vahvistamisen jälkeen."),
      },
    ],
  },
  {
    slug: "email-marketing",
    course: "o-retain",
    guide: "marketing",
    title: l3("Email khuyến mãi và điểm Vara", "Promotional emails and Vara points", "Markkinointisähköpostit ja Vara-pisteet"),
    summary: l3("Chọn nhóm khách, soạn chiến dịch từ mẫu có sẵn, gửi ngay hoặc lên lịch.", "Pick an audience, write a campaign from a template and send now or schedule it.", "Valitse kohderyhmä, tee kampanja mallista ja lähetä heti tai ajasta."),
    video: null, // batch 10
    href: "/business/dashboard/marketing",
    hrefLabel: l3("Mở Marketing", "Open Marketing", "Avaa Markkinointi"),
    steps: [
      l3(
        "Bấm mục “Marketing”. Ở “Chọn nhóm khách nhận”, chọn một nhóm: Tất cả khách, Khách gần đây, Lâu chưa quay lại, Khách thân thiết, Khách mới hoặc Thành viên thẻ.",
        "Open “Marketing”. First choose who gets the email: all customers, recent ones, those not seen for a while, regulars, new customers or card members.",
        "Avaa ”Markkinointi”. Valitse ensin vastaanottajat: kaikki asiakkaat, äskettäin käyneet, pitkään poissa olleet, kanta-asiakkaat, uudet asiakkaat tai kortin haltijat."
      ),
      l3(
        "Ở “Nội dung email”, bấm một mẫu có sẵn (ví dụ “Ưu đãi giảm giá”) rồi sửa tiêu đề và lời nhắn; bấm “+ Tên khách” để chèn tên từng khách.",
        "Under the email content, tap a ready-made template (for example the discount offer) and edit the subject and message; insert each customer's name with one tap.",
        "Napauta sisällössä valmista mallia (esimerkiksi alennustarjous) ja muokkaa otsikkoa ja viestiä; lisää asiakkaan nimi yhdellä napautuksella."
      ),
      l3(
        "Bật “Thêm phiếu ưu đãi” nếu muốn có phiếu vàng nổi bật giữa email, và chọn nút bấm “Đặt lịch”.",
        "Turn on the offer coupon if you want a golden coupon in the middle of the email, and choose the booking button.",
        "Ota tarjouskuponki käyttöön, jos haluat kultaisen kupongin viestin keskelle, ja valitse varauspainike."
      ),
      l3(
        "Bấm “Xem trước email” để xem như trên điện thoại của khách, hoặc “Gửi thử” về email của bạn (miễn phí).",
        "Preview the email as it looks on a customer's phone, or send a free test to your own address.",
        "Esikatsele viesti sellaisena kuin asiakas näkee sen puhelimessa tai lähetä ilmainen testi omaan osoitteeseesi."
      ),
      l3(
        "Chọn “Gửi ngay” hoặc “Lên lịch”, rồi bấm nút gửi. Theo dõi lượt mở và lượt nhấp trong thẻ “Chiến dịch”.",
        "Choose to send now or schedule it, then press send. Follow opens and clicks under your campaigns.",
        "Valitse lähetys heti tai ajastettuna ja paina lähetä. Seuraa avauksia ja klikkauksia kampanjoissa."
      ),
    ],
    tips: [
      l3(
        "Mỗi email gửi đi tốn 1 điểm Vara. Nhận thêm điểm bằng “Điểm danh” hoặc giới thiệu salon khác dùng VaraaAi.",
        "Each email sent costs 1 Vara point. Earn more by checking in or by referring another salon to VaraaAi.",
        "Jokainen lähetetty viesti maksaa 1 Vara-pisteen. Saat lisää pisteitä kirjautumalla päivittäin tai suosittelemalla VaraaAita toiselle salongille."
      ),
      l3(
        "Gửi đúng nhóm khách: ưu đãi “mời quay lại” cho nhóm Lâu chưa quay lại sẽ hiệu quả hơn gửi cho tất cả.",
        "Send to the right group: a “come back” offer works better for customers not seen for a while than for everyone.",
        "Lähetä oikealle ryhmälle: paluutarjous toimii paremmin pitkään poissa olleille kuin kaikille."
      ),
    ],
    quiz: [
      {
        q: l3("Bước đầu tiên khi soạn chiến dịch email là gì?", "What is the first step of an email campaign?", "Mikä on sähköpostikampanjan ensimmäinen vaihe?"),
        options: [l3("Chọn nhóm khách nhận", "Choose who receives it", "Valita vastaanottajat"), l3("In poster", "Print a poster", "Tulostaa juliste"), l3("Đổi giờ mở cửa", "Change the opening hours", "Muuttaa aukioloaikoja")],
        answer: 0,
        why: l3("Gửi đúng người thì khách mới thấy email thật sự dành cho mình.", "Sending to the right people makes the email feel meant for them.", "Kun viesti menee oikeille ihmisille, se tuntuu heille tarkoitetulta."),
      },
      {
        q: l3("Mỗi email gửi đi tốn gì?", "What does each email sent cost?", "Mitä jokainen lähetetty viesti maksaa?"),
        options: [l3("1 điểm Vara", "1 Vara point", "1 Vara-pisteen"), l3("10 euro", "10 euros", "10 euroa"), l3("Không tốn gì và không giới hạn", "Nothing, with no limit", "Ei mitään, ilman rajaa")],
        answer: 0,
        why: l3("Gửi thử thì miễn phí; điểm chỉ trừ khi gửi cho khách.", "Test emails are free; points are only used when you send to customers.", "Testiviestit ovat ilmaisia; pisteitä kuluu vain asiakkaille lähetettäessä."),
      },
      {
        q: l3("Muốn xem email trông thế nào trước khi gửi, bạn bấm gì?", "What do you press to see the email before sending?", "Mitä painat nähdäksesi viestin ennen lähetystä?"),
        options: [l3("“Xem trước email”", "The email preview", "Viestin esikatselua"), l3("“Lưu nháp”", "Save draft", "Tallenna luonnos"), l3("“Danh bạ”", "Contacts", "Yhteystiedot")],
        answer: 0,
        why: l3("Bản xem trước hiện đúng như trên điện thoại của khách.", "The preview shows it exactly as on a customer's phone.", "Esikatselu näyttää viestin juuri sellaisena kuin asiakkaan puhelimessa."),
      },
    ],
  },
  {
    slug: "san-pham-don-hang",
    course: "o-retain",
    guide: "products",
    title: l3("Bán sản phẩm và quản lý đơn hàng", "Sell products and manage orders", "Myy tuotteita ja hallitse tilauksia"),
    summary: l3("Mở cửa hàng online của salon, xác nhận đơn và báo khách qua email.", "Open your salon's online shop, confirm orders and notify customers by email.", "Avaa salongin verkkokauppa, vahvista tilaukset ja ilmoita asiakkaille sähköpostilla."),
    video: null, // batch 10
    href: "/business/dashboard/products",
    hrefLabel: l3("Mở Sản phẩm", "Open Products", "Avaa Tuotteet"),
    steps: [
      l3(
        "Bấm mục “Sản phẩm”, rồi “Thêm sản phẩm”. Thêm hình ảnh (tối đa 8 ảnh, ảnh đầu tiên là ảnh bìa).",
        "Open “Products” and add a product. Add photos first (up to 8; the first one is the cover).",
        "Avaa ”Tuotteet” ja lisää tuote. Lisää ensin kuvat (enintään 8; ensimmäinen on kansikuva)."
      ),
      l3(
        "Điền “Tên sản phẩm”, “Thương hiệu”, “Mô tả” và “Giá bán”; nếu đang giảm giá, điền thêm “Giá gốc”.",
        "Fill in the product name, brand, description and price; if it is on offer, add the original price too.",
        "Täytä tuotteen nimi, merkki, kuvaus ja hinta; jos tuote on tarjouksessa, lisää myös alkuperäinen hinta."
      ),
      l3(
        "Bật “Sản phẩm nổi bật” để ghim lên đầu cửa hàng, hoặc “Hết hàng” khi tạm hết; rồi bấm “Lưu sản phẩm”.",
        "Mark it as featured to pin it to the top of the shop, or as out of stock when you have none; then save.",
        "Merkitse tuote suosituksi, niin se näkyy kaupan kärjessä, tai loppuneeksi, kun sitä ei ole; tallenna lopuksi."
      ),
      l3(
        "Bấm “Xem cửa hàng” để xem như khách thấy, hoặc “Sao chép link” để gửi cho khách.",
        "Open the shop to see it as customers do, or copy the link to send it to them.",
        "Avaa kauppa nähdäksesi sen asiakkaan silmin tai kopioi linkki asiakkaille."
      ),
      l3(
        "Khi có đơn, mở “Đơn hàng”: xem khách, món hàng, cách thanh toán; khách đến nhận thì bấm “Đã giao — hoàn thành”.",
        "When an order comes in, open “Orders”: see the customer, the items and how they pay; when they collect it, mark it as delivered and complete.",
        "Kun tilaus tulee, avaa ”Tilaukset”: näet asiakkaan, tuotteet ja maksutavan; kun asiakas noutaa tilauksen, merkitse se toimitetuksi."
      ),
    ],
    tips: [
      l3(
        "Khách đặt online và nhận hàng tại salon — không cần gửi bưu điện.",
        "Customers order online and collect at the salon — no posting needed.",
        "Asiakkaat tilaavat verkossa ja noutavat salongista — postitusta ei tarvita."
      ),
      l3(
        "Để ô “Gửi email báo khách” được chọn: khách nhận email ở mỗi bước của đơn hàng.",
        "Keep the “email the customer” box ticked: customers get an email at each step of their order.",
        "Pidä asiakkaan sähköposti-ilmoitus valittuna: asiakas saa viestin tilauksen jokaisesta vaiheesta."
      ),
    ],
    quiz: [
      {
        q: l3("Khách nhận sản phẩm đã đặt ở đâu?", "Where do customers get the products they ordered?", "Mistä asiakkaat saavat tilaamansa tuotteet?"),
        options: [l3("Tại salon", "At the salon", "Salongista"), l3("Qua bưu điện", "By post", "Postitse"), l3("Tại ngân hàng", "At the bank", "Pankista")],
        answer: 0,
        why: l3("Cửa hàng của salon là “đặt online, nhận tại salon”.", "The salon shop is “order online, collect at the salon”.", "Salongin kaupassa tilataan verkossa ja noudetaan salongista."),
      },
      {
        q: l3("Bật “Sản phẩm nổi bật” thì sao?", "What happens when you mark a product as featured?", "Mitä tapahtuu, kun merkitset tuotteen suosituksi?"),
        options: [l3("Sản phẩm được ghim lên đầu cửa hàng", "It is pinned to the top of the shop", "Se kiinnitetään kaupan kärkeen"), l3("Sản phẩm bị ẩn", "It is hidden", "Se piilotetaan"), l3("Giá tự giảm", "The price drops by itself", "Hinta laskee itsestään")],
        answer: 0,
        why: l3("Khách thấy sản phẩm nổi bật trước tiên.", "Customers see featured products first.", "Asiakkaat näkevät suositut tuotteet ensimmäisenä."),
      },
      {
        q: l3("Khách đã đến lấy hàng, bạn bấm gì trong mục Đơn hàng?", "The customer has collected the order — what do you press in Orders?", "Asiakas on noutanut tilauksen — mitä painat Tilaukset-sivulla?"),
        options: [l3("“Hủy đơn”", "Cancel order", "Peru tilaus"), l3("“Đã giao — hoàn thành”", "Delivered — complete", "Toimitettu — valmis"), l3("“In phiếu”", "Print slip", "Tulosta lähete")],
        answer: 1,
        why: l3("Đơn chuyển sang Hoàn thành và được tính vào doanh thu.", "The order moves to completed and counts towards your income.", "Tilaus siirtyy valmiiksi ja lasketaan mukaan tuloihin."),
      },
    ],
  },
  /* ================= owners: grow ================= */
  {
    slug: "kho-hang",
    course: "o-grow",
    fresh: true,
    title: l3("Kho vật tư: quét nhập, quét lấy hàng", "Inventory: scan in, scan out", "Varasto: skannaa sisään ja ulos"),
    summary: l3("Theo dõi tồn kho, danh sách cần mua và in nhãn cho tủ.", "Track stock, see what to buy and print labels for your cupboards.", "Seuraa varastoa, katso ostettavat ja tulosta tarrat kaappeihin."),
    video: null, // batch 11
    href: "/business/dashboard/inventory",
    hrefLabel: l3("Mở Kho hàng", "Open Inventory", "Avaa Varasto"),
    steps: [
      l3(
        "Bấm mục “Kho hàng”, rồi “Thêm sản phẩm”: điền tên, màu, hãng, loại, đơn vị đếm và “Mức tối thiểu”, rồi bấm “Lưu”.",
        "Open “Inventory” and add an item: fill in its name, colour, brand, type, unit and minimum level, then save.",
        "Avaa ”Varasto” ja lisää tuote: täytä nimi, väri, merkki, tyyppi, yksikkö ja vähimmäismäärä ja tallenna."
      ),
      l3(
        "Hàng về: bấm “Quét nhập kho” và đưa mã vạch vào camera; món chưa có trong kho thì bấm “Chụp hình sản phẩm” để AI tự nhận tên, hãng, màu.",
        "When stock arrives: press “Scan in” and show the barcode to the camera; for something new, take a photo and AI fills in its name, brand and colour.",
        "Kun tavaraa saapuu: paina sisäänskannausta ja näytä viivakoodi kameralle; uudesta tuotteesta voit ottaa kuvan, ja tekoäly täyttää nimen, merkin ja värin."
      ),
      l3(
        "Lấy hàng ra dùng: bấm “Quét lấy hàng”, hoặc bấm vào món đó rồi bấm “+1” / “−1”.",
        "When you take something out to use: press “Scan out”, or tap the item and use “+1” / “−1”.",
        "Kun otat tavaraa käyttöön: paina ulosskannausta tai napauta tuotetta ja käytä painikkeita ”+1” / ”−1”."
      ),
      l3(
        "Kiểm kê: bấm vào một món, nhập số đếm thực tế rồi bấm “Cập nhật số lượng”.",
        "Stock-take: tap an item, enter the number you actually counted and update the quantity.",
        "Inventointi: napauta tuotetta, anna laskemasi määrä ja päivitä saldo."
      ),
      l3(
        "Mở thẻ “Cần mua” để xem những món đã chạm mức tối thiểu; bấm “Sao chép danh sách” hoặc “In danh sách”.",
        "Open the “to buy” tab to see what has reached its minimum; copy or print the list.",
        "Avaa ostettavien välilehti nähdäksesi vähimmäismäärään laskeneet tuotteet; kopioi tai tulosta lista."
      ),
    ],
    tips: [
      l3(
        "Trong thẻ “Tủ & nhãn”, tạo các tủ/ngăn và in nhãn QR dán lên — khi nhập hàng, quét nhãn tủ trước để hàng tự xếp vào tủ đó.",
        "Under “Cupboards & labels”, create cupboards and print QR labels for them — scan the cupboard label first and the stock is filed there automatically.",
        "Luo kaapit ja tulosta niille QR-tarrat — skannaa ensin kaapin tarra, niin tavara kirjautuu siihen automaattisesti."
      ),
      l3(
        "Thẻ “Lịch sử” ghi lại ai nhập, ai lấy và lúc nào.",
        "The history tab records who added or took stock, and when.",
        "Historiasta näet, kuka lisäsi tai otti tavaraa ja milloin."
      ),
    ],
    quiz: [
      {
        q: l3("“Mức tối thiểu” dùng để làm gì?", "What is the minimum level for?", "Mihin vähimmäismäärää käytetään?"),
        options: [l3("Khi số lượng xuống bằng mức này, món đó tự vào danh sách cần mua", "When stock drops to this level, the item goes on the to-buy list by itself", "Kun saldo laskee tälle tasolle, tuote siirtyy itsestään ostettavien listalle"), l3("Giới hạn số khách mỗi ngày", "It limits customers per day", "Se rajoittaa päivän asiakasmäärää"), l3("Giảm giá sản phẩm", "It discounts the product", "Se alentaa tuotteen hintaa")],
        answer: 0,
        why: l3("Nhờ vậy bạn mua thêm trước khi hết hàng.", "That way you restock before you run out.", "Näin ehdit tilata lisää ennen kuin tavara loppuu."),
      },
      {
        q: l3("Món mới chưa có trong kho, nhập nhanh nhất bằng cách nào?", "What's the quickest way to add something that isn't in stock yet?", "Miten lisäät nopeimmin tuotteen, jota ei vielä ole varastossa?"),
        options: [l3("Chụp hình sản phẩm — AI tự nhận tên, hãng, màu", "Take a photo — AI fills in the name, brand and colour", "Ota kuva — tekoäly täyttää nimen, merkin ja värin"), l3("Gửi email cho VaraaAi", "Email VaraaAi", "Lähetä sähköposti VaraaAille"), l3("Không nhập được", "You can't", "Sitä ei voi lisätä")],
        answer: 0,
        why: l3("Bạn chỉ cần nhập thêm số lượng.", "You only need to enter the quantity.", "Sinun tarvitsee vain antaa määrä."),
      },
      {
        q: l3("Xem những món cần mua thêm ở đâu?", "Where do you see what needs buying?", "Mistä näet, mitä pitää ostaa lisää?"),
        options: [l3("Thẻ “Lịch sử”", "The history tab", "Historia-välilehdeltä"), l3("Thẻ “Cần mua”", "The to-buy tab", "Ostettavien välilehdeltä"), l3("Trang Đánh giá", "The Reviews page", "Arvostelut-sivulta")],
        answer: 1,
        why: l3("Danh sách kèm số tiền ước tính, sao chép hoặc in được.", "The list comes with an estimated cost and can be copied or printed.", "Listassa on kustannusarvio, ja sen voi kopioida tai tulostaa."),
      },
    ],
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
    video: video("tien-ich-nhom", 68, "2026-11-16"),
    href: "/business/dashboard/utilities",
    hrefLabel: l3("Mở Tiện ích", "Open the team hub", "Avaa tiimin työtila"),
    steps: [
      l3(
        "Bấm mục “Tiện ích”: trang tổng quan có ba phần chính là “Nhóm chat”, “Thông báo” và “Đào tạo”.",
        "Open the team hub: the overview has three main parts — team chat, notices and training.",
        "Avaa tiimin työtila: yleisnäkymässä on kolme pääosaa — ryhmächat, tiedotteet ja koulutus."
      ),
      l3(
        "“Nhóm chat”: mở nhóm “Cả salon”, gõ tin nhắn rồi bấm gửi; bấm “Trò chuyện mới” để nhắn riêng với một nhân viên.",
        "Team chat: open the whole-salon group, type a message and send it; start a new conversation to message one staff member privately.",
        "Ryhmächat: avaa koko salongin ryhmä, kirjoita viesti ja lähetä; aloita uusi keskustelu, kun haluat viestiä yhdelle työntekijälle."
      ),
      l3(
        "“Thông báo”: bấm “Viết thông báo mới”, nhập tiêu đề và nội dung, chọn mức độ (“Thông thường”, “Quan trọng”, “Khẩn cấp”) rồi bấm “Đăng thông báo”.",
        "Notices: write a new notice with a title and text, choose how important it is (normal, important or urgent) and publish it.",
        "Tiedotteet: kirjoita uusi tiedote otsikolla ja tekstillä, valitse tärkeys (tavallinen, tärkeä tai kiireellinen) ja julkaise."
      ),
      l3(
        "“Đào tạo”: bấm “Thêm bài đào tạo”, đặt tên bài, chọn chủ đề, viết các bước hoặc dán link YouTube rồi bấm “Lưu bài học”.",
        "Training: add a lesson with a name and a topic, write the steps or paste a YouTube link, then save it.",
        "Koulutus: lisää oppitunti nimellä ja aiheella, kirjoita vaiheet tai liitä YouTube-linkki ja tallenna."
      ),
    ],
    tips: [
      l3(
        "Bật “Ghim lên đầu” cho thông báo quan trọng, và “Yêu cầu xác nhận đã đọc” để biết ai đã đọc.",
        "Pin important notices to the top, and ask for a read confirmation to see who has read them.",
        "Kiinnitä tärkeät tiedotteet ylimmäksi ja pyydä lukukuittaus, niin näet, ketkä ovat lukeneet ne."
      ),
      l3(
        "Bật “Bắt buộc” cho bài đào tạo mọi nhân viên phải học — bạn theo dõi được ai đã hoàn thành.",
        "Mark a lesson as required when every staff member must take it — you can follow who has finished.",
        "Merkitse oppitunti pakolliseksi, kun kaikkien on käytävä se — näet, ketkä ovat suorittaneet sen."
      ),
    ],
    quiz: [
      {
        q: l3("Mục “Tiện ích” có ba phần chính nào?", "What are the three main parts of the team hub?", "Mitkä ovat tiimin työtilan kolme pääosaa?"),
        options: [l3("Nhóm chat, Thông báo, Đào tạo", "Team chat, notices and training", "Ryhmächat, tiedotteet ja koulutus"), l3("Dịch vụ, Giá, Giờ mở cửa", "Services, prices and opening hours", "Palvelut, hinnat ja aukioloajat"), l3("Poster, Bảng giá, Thẻ quà tặng", "Posters, price lists and gift cards", "Julisteet, hinnastot ja lahjakortit")],
        answer: 0,
        why: l3("Mọi thứ cả đội cần đều ở cùng một nơi.", "Everything the team needs is in one place.", "Kaikki tiimin tarvitsema on yhdessä paikassa."),
      },
      {
        q: l3("Muốn biết nhân viên nào đã đọc thông báo, bạn bật gì?", "What do you turn on to see which staff have read a notice?", "Minkä otat käyttöön nähdäksesi, ketkä ovat lukeneet tiedotteen?"),
        options: [l3("“Yêu cầu xác nhận đã đọc”", "The read confirmation", "Lukukuittauksen"), l3("“Ghim lên đầu”", "Pin to top", "Kiinnityksen ylimmäksi"), l3("Không có cách nào", "There is no way", "Se ei ole mahdollista")],
        answer: 0,
        why: l3("Nhân viên bấm xác nhận, và bạn thấy được ai đã đọc.", "Staff confirm they have read it, and you see who has.", "Työntekijät kuittaavat lukeneensa, ja näet ketkä ovat kuitanneet."),
      },
      {
        q: l3("Bài đào tạo có thể chứa những gì?", "What can a training lesson contain?", "Mitä koulutusoppitunti voi sisältää?"),
        options: [l3("Chỉ chữ", "Text only", "Vain tekstiä"), l3("Các bước, link video YouTube và tài liệu đính kèm", "Steps, a YouTube video link and attached files", "Vaiheet, YouTube-videolinkin ja liitetiedostoja"), l3("Chỉ hình ảnh", "Pictures only", "Vain kuvia")],
        answer: 1,
        why: l3("Nhân viên mở ra học trên điện thoại bất cứ lúc nào.", "Staff can open it and learn on their phone at any time.", "Työntekijät voivat avata sen puhelimella milloin tahansa."),
      },
    ],
  },
  {
    slug: "cong-tac-vien",
    course: "o-grow",
    guide: "affiliates",
    title: l3("Cộng tác viên giới thiệu khách", "Affiliates who bring customers", "Kumppanit, jotka tuovat asiakkaita"),
    summary: l3("Thêm người tiếp thị, đặt hoa hồng và theo dõi kết quả.", "Add affiliates, set their commission and follow the results.", "Lisää kumppaneita, aseta provisio ja seuraa tuloksia."),
    video: null, // batch 11
    href: "/business/dashboard/marketing/affiliates",
    hrefLabel: l3("Mở Tiếp thị liên kết", "Open Affiliates", "Avaa kumppanit"),
    steps: [
      l3(
        "Bấm mục “Marketing”, rồi “Tiếp thị liên kết” ở góc trên, và bấm “Thêm đối tác”.",
        "Open “Marketing”, go to the affiliates page at the top and add a partner.",
        "Avaa ”Markkinointi”, siirry yläreunasta kumppanisivulle ja lisää kumppani."
      ),
      l3(
        "Điền “Tên đối tác”, email, chọn phần trăm “Hoa hồng” (5%, 10%, 15%, 20% hoặc số khác), đặt “Mã link” nếu muốn, rồi bấm “Lưu”.",
        "Fill in the partner's name and email, choose the commission (5%, 10%, 15%, 20% or your own figure), set a link code if you like, and save.",
        "Täytä kumppanin nimi ja sähköposti, valitse provisio (5 %, 10 %, 15 %, 20 % tai oma luku), anna halutessasi linkkikoodi ja tallenna."
      ),
      l3(
        "Trong danh sách “Đối tác của bạn”, bấm biểu tượng sao chép để gửi link riêng cho đối tác, hoặc biểu tượng mã QR để tải mã về in.",
        "In your partner list, tap the copy icon to send the partner their own link, or the QR icon to download a code for printing.",
        "Napauta kumppanilistassa kopiointikuvaketta lähettääksesi kumppanille oman linkin tai QR-kuvaketta ladataksesi tulostettavan koodin."
      ),
      l3(
        "Theo dõi lượt nhấp, lịch hẹn, doanh thu và hoa hồng cần trả của từng đối tác; trả xong thì ghi nhận đã trả.",
        "Follow each partner's clicks, bookings, income and commission due; once you have paid them, record the payment.",
        "Seuraa kunkin kumppanin klikkauksia, varauksia, tuloja ja maksettavaa provisiota; kirjaa maksu, kun olet maksanut."
      ),
    ],
    tips: [
      l3(
        "VaraaAi chỉ theo dõi và tính hoa hồng — bạn tự thanh toán cho đối tác theo cách hai bên thoả thuận.",
        "VaraaAi only tracks and calculates the commission — you pay your partners yourself, however you agree with them.",
        "VaraaAi vain seuraa ja laskee provision — maksat kumppaneille itse sopimallanne tavalla."
      ),
      l3(
        "In mã QR lên tờ rơi hoặc danh thiếp: khách quét là mở trang đặt lịch, và lịch hẹn được ghi cho đúng đối tác.",
        "Print the QR code on flyers or business cards: scanning it opens your booking page and credits the right partner.",
        "Tulosta QR-koodi esitteisiin tai käyntikortteihin: skannaus avaa varaussivun ja hyvittää oikean kumppanin."
      ),
    ],
    quiz: [
      {
        q: l3("Làm sao hệ thống biết khách do đối tác nào giới thiệu?", "How does the system know which partner referred a customer?", "Mistä järjestelmä tietää, kuka kumppani suositteli asiakasta?"),
        options: [l3("Mỗi đối tác có một đường link (và mã QR) riêng", "Each partner has their own link (and QR code)", "Jokaisella kumppanilla on oma linkki (ja QR-koodi)"), l3("Khách phải gọi điện báo", "The customer must phone to say so", "Asiakkaan on soitettava ja kerrottava"), l3("Không biết được", "It can't know", "Sitä ei voi tietää")],
        answer: 0,
        why: l3("Lịch hẹn đặt qua link nào được ghi nhận cho người đó.", "A booking made through a link is credited to that partner.", "Linkin kautta tehty varaus kirjataan kyseiselle kumppanille."),
      },
      {
        q: l3("Ai trả hoa hồng cho đối tác?", "Who pays the partner's commission?", "Kuka maksaa kumppanin provision?"),
        options: [l3("VaraaAi tự động trả", "VaraaAi pays it automatically", "VaraaAi maksaa sen automaattisesti"), l3("Chủ salon tự thanh toán; VaraaAi chỉ theo dõi", "The salon owner pays; VaraaAi only tracks it", "Salongin omistaja maksaa; VaraaAi vain seuraa"), l3("Khách hàng trả", "The customer pays", "Asiakas maksaa")],
        answer: 1,
        why: l3("Sau khi trả, bạn ghi nhận đã trả để sổ sách rõ ràng.", "After paying, record the payment so your books stay clear.", "Kirjaa maksu maksamisen jälkeen, jotta kirjanpito pysyy selkeänä."),
      },
      {
        q: l3("Muốn in link của đối tác lên tờ rơi, bạn dùng gì?", "What do you use to put a partner's link on a flyer?", "Millä saat kumppanin linkin esitteeseen?"),
        options: [l3("Mã QR của đối tác", "The partner's QR code", "Kumppanin QR-koodilla"), l3("Ảnh bìa salon", "The salon's cover photo", "Salongin kansikuvalla"), l3("Giờ mở cửa", "The opening hours", "Aukioloajoilla")],
        answer: 0,
        why: l3("Khách quét mã là mở trang đặt lịch của salon.", "Scanning the code opens your salon's booking page.", "Koodin skannaus avaa salongin varaussivun."),
      },
    ],
  },
];
