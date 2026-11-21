/** The Tositeo course (owner, 2026-11-21): how to use Tositeo (tositeo.com),
 * the owner's receipts, travel-claims and bookkeeping service, taught in the
 * Academy's "salon owner" tab. A standalone course: its lessons are numbered
 * 1…n on their own and are not part of the VaraaAi owner certificate.
 *
 * Videos are filmed in Tositeo's Vietnamese interface with demo companies
 * (no real customer data) by the pipeline outside this repo
 * (C:\Hiep\hoat-hinh-ai\projects\varaaai-hoc, lessons_tositeo*.py). Button and
 * field names in the steps are Tositeo's real Vietnamese labels. */
import { l3, type Course, type Lesson, type LessonVideo } from "@/lib/academy/types";

const video = (slug: string, seconds: number, published: string): LessonVideo => ({
  src: `/academy/${slug}.mp4`,
  poster: `/academy/${slug}.jpg`,
  captions: `/academy/${slug}.vtt`,
  seconds,
  published,
});

/** Filled in as the videos are published (slug → [seconds, date]). */
const VIDEOS: Record<string, [number, string]> = {
  "ts-bat-dau": [159, "2026-11-21"],
  "ts-hoa-don": [171, "2026-11-21"],
  "ts-cong-tac-phi": [125, "2026-11-21"],
  "ts-duyet-chi": [100, "2026-11-21"],
  "ts-ngan-hang": [111, "2026-11-21"],
  "ts-hoan-tien-xuat": [104, "2026-11-21"],
  "ts-ke-toan-tai-lieu": [115, "2026-11-21"],
  "ts-van-phong": [111, "2026-11-21"],
  "ts-hach-toan": [94, "2026-11-21"],
};
const v = (slug: string) => (VIDEOS[slug] ? video(slug, ...VIDEOS[slug]) : null);

const TOSITEO = "https://tositeo.com";

export const TOSITEO_COURSES: Course[] = [
  {
    id: "o-tositeo",
    audience: "owner",
    icon: "receipt",
    standalone: true,
    title: l3("Tositeo: hóa đơn và kế toán online", "Tositeo: receipts and bookkeeping online", "Tositeo: kuitit ja kirjanpito verkossa"),
    body: l3(
      "Chụp hóa đơn, công tác phí, đối chiếu ngân hàng, hoàn tiền và gửi kế toán.",
      "Receipts, travel claims, bank matching, reimbursements and your accountant.",
      "Kuitit, matkalaskut, pankkitäsmäytys, kulukorvaukset ja kirjanpitäjä."
    ),
  },
];

export const TOSITEO_LESSONS: Lesson[] = [
  {
    slug: "ts-bat-dau",
    course: "o-tositeo",
    title: l3("Bắt đầu với Tositeo", "Getting started with Tositeo", "Tositeon käyttöönotto"),
    summary: l3(
      "Tạo tài khoản miễn phí, chọn quốc gia hoạt động, cài đặt công ty và hồ sơ của bạn.",
      "Create a free account, choose your country, then set up your company and your profile.",
      "Luo maksuton tili, valitse toimintamaa ja tee yrityksen ja oman profiilisi asetukset."
    ),
    video: v("ts-bat-dau"),
    href: TOSITEO,
    hrefLabel: l3("Mở Tositeo", "Open Tositeo", "Avaa Tositeo"),
    steps: [
      l3(
        "Vào tositeo.com, bấm “Dùng miễn phí 3 năm”. Ở góc trên chọn “Tiếng Việt”, rồi chọn thẻ “Doanh nghiệp”.",
        "Go to tositeo.com and press “Use free for 3 years”. Pick your language at the top, then the “Business” tab.",
        "Mene osoitteeseen tositeo.com ja paina ”Käytä ilmaiseksi 3 vuotta”. Valitse kieli ylhäältä ja sitten välilehti ”Yritys”."
      ),
      l3(
        "Điền “Tên của bạn”, “Tên công ty”, chọn “Quốc gia hoạt động”. “Mã số doanh nghiệp” có thể để trống và điền sau.",
        "Fill in your name and company name and choose the country you operate in. The business ID can be added later.",
        "Täytä nimesi ja yrityksen nimi ja valitse toimintamaa. Y-tunnuksen voi lisätä myöhemmin."
      ),
      l3(
        "Nhập “Email công việc” và mật khẩu từ 10 ký tự, có chữ và số. Tích ô đồng ý điều khoản, bấm “Tạo tài khoản”.",
        "Enter your work e-mail and a password of at least 10 characters with letters and numbers. Accept the terms and press “Create account”.",
        "Anna työsähköposti ja vähintään 10 merkin salasana, jossa on kirjaimia ja numeroita. Hyväksy ehdot ja paina ”Luo tunnukset”."
      ),
      l3(
        "Mở menu (nút ba gạch) → Cài đặt → “Công ty”: kiểm tra quốc gia, điền mã số doanh nghiệp, địa chỉ và “IBAN của công ty”.",
        "Open the menu → Settings → “Company”: check the country and fill in the business ID, address and the company IBAN.",
        "Avaa valikko → Asetukset → ”Yritys”: tarkista maa ja täytä Y-tunnus, osoite ja yrityksen IBAN."
      ),
      l3(
        "Ngoài Phần Lan: nhập “Mức phụ cấp công tác” (mỗi km, cả ngày, nửa ngày). Chọn có duyệt chi hay không, số ngày nhắc hóa đơn thiếu, rồi “Lưu thay đổi”.",
        "Outside Finland: enter your travel allowance rates (per km, full day, half day). Choose whether expenses need approval and when to remind about missing receipts, then save.",
        "Suomen ulkopuolella: anna matkakorvausten määrät (km, koko päivä, osapäivä). Valitse hyväksyntä ja muistutusten aikaväli ja tallenna."
      ),
      l3(
        "Bấm vào chữ viết tắt tên ở góc trên để mở hồ sơ: nhập “IBAN của bạn” để nhận tiền hoàn, chọn ngôn ngữ, bấm “Lưu hồ sơ”.",
        "Tap your initials at the top to open your profile: add your own IBAN for reimbursements, choose the language and press “Save profile”.",
        "Napauta nimikirjaimiasi ylhäällä: lisää oma IBAN kulukorvauksia varten, valitse kieli ja tallenna profiili."
      ),
    ],
    tips: [
      l3(
        "Quốc gia hoạt động quyết định thuế suất VAT, tiền tệ, kiểu mã số doanh nghiệp và có dùng được file SEPA hay không. Chọn đúng nước nơi công ty đăng ký.",
        "The country decides the VAT rates, the currency, the business ID format and whether SEPA files are available. Choose the country where the company is registered.",
        "Toimintamaa määrää ALV-kannat, valuutan, Y-tunnuksen muodon ja SEPA-tiedostojen saatavuuden. Valitse maa, jossa yritys on rekisteröity."
      ),
    ],
    quiz: [
      {
        q: l3("Chủ doanh nghiệp được dùng Tositeo miễn phí trong bao lâu?", "How long can a business use Tositeo for free?", "Kuinka kauan yritys voi käyttää Tositeota maksutta?"),
        options: [l3("30 ngày", "30 days", "30 päivää"), l3("3 năm", "3 years", "3 vuotta"), l3("Không có gói miễn phí", "There is no free use", "Maksutonta käyttöä ei ole")],
        answer: 1,
        why: l3("Đăng ký không cần thẻ, dùng miễn phí 3 năm. Văn phòng kế toán luôn miễn phí.", "No card is needed and it is free for 3 years. Accounting firms always use it for free.", "Korttia ei tarvita ja käyttö on maksutonta 3 vuotta. Tilitoimistoille palvelu on aina maksuton."),
      },
      {
        q: l3("Ô nào quyết định thuế suất VAT và tiền tệ của công ty?", "Which setting decides the company's VAT rates and currency?", "Mikä asetus määrää yrityksen ALV-kannat ja valuutan?"),
        options: [l3("Ngôn ngữ", "Language", "Kieli"), l3("Quốc gia hoạt động", "Country of operation", "Toimintamaa"), l3("Địa chỉ", "Address", "Osoite")],
        answer: 1,
        why: l3("Đổi quốc gia sẽ cập nhật luôn thuế VAT của các loại chi phí.", "Changing the country also updates the VAT of the expense types.", "Maan vaihtaminen päivittää myös kululajien ALV-kannat."),
      },
      {
        q: l3("Tiền hoàn cho khoản bạn tự ứng được chuyển vào đâu?", "Where are your reimbursements paid?", "Mihin kulukorvauksesi maksetaan?"),
        options: [l3("IBAN trong hồ sơ của bạn", "The IBAN in your profile", "Profiilisi IBAN-tilille"), l3("IBAN của công ty", "The company IBAN", "Yrityksen IBAN-tilille"), l3("Trả bằng tiền mặt", "In cash", "Käteisenä")],
        answer: 0,
        why: l3("IBAN của công ty là tài khoản chi tiền; IBAN của bạn là tài khoản nhận tiền.", "The company IBAN pays the money out; your own IBAN receives it.", "Yrityksen tililtä maksetaan, omalle tilillesi rahat tulevat."),
      },
    ],
  },
  {
    slug: "ts-hoa-don",
    course: "o-tositeo",
    title: l3("Chụp hóa đơn, máy tự đọc chữ", "Snap a receipt and let it read itself", "Kuvaa kuitti, tiedot luetaan itse"),
    summary: l3(
      "Chụp hóa đơn bằng điện thoại, kiểm tra thông tin máy đọc được, chọn loại chi phí và gửi duyệt; tải cả xấp hóa đơn một lúc.",
      "Photograph a receipt, check the details read from it, choose the expense type and send it; upload a whole pile at once.",
      "Kuvaa kuitti, tarkista luetut tiedot, valitse kululaji ja lähetä; lataa koko pino kerralla."
    ),
    video: v("ts-hoa-don"),
    href: `${TOSITEO}/app/receipts/new`,
    hrefLabel: l3("Thêm hóa đơn", "Add a receipt", "Lisää kuitti"),
    steps: [
      l3(
        "Bấm nút máy ảnh màu xanh ở trên cùng (hoặc ô “Hóa đơn” trong phần “Thêm” ở trang Tổng quan).",
        "Press the blue camera button at the top (or “Receipt” under “Add” on the overview).",
        "Paina sinistä kamerapainiketta ylhäällä (tai ”Kuitti” yleiskatsauksen Lisää-kohdassa)."
      ),
      l3(
        "Bấm “Chụp ảnh hoặc chọn file”: chụp hóa đơn, hoặc chọn ảnh, file PDF. Hóa đơn dài hay hai mặt: “Thêm trang”.",
        "Press “Take a photo or choose a file”: take the picture or pick an image or PDF. Long or two-sided receipt: “Add pages”.",
        "Paina ”Ota kuva tai valitse tiedosto”. Pitkä tai kaksipuolinen kuitti: ”Lisää sivuja”."
      ),
      l3(
        "Máy tự điền “Ngày mua”, “Người bán”, “Tổng gồm VAT”, “Thuế suất VAT”, “Tiền VAT”. So lại với tờ hóa đơn và sửa chỗ đọc nhầm.",
        "The purchase date, merchant, total, VAT rate and VAT amount are filled in for you. Compare them with the receipt and fix any mistakes.",
        "Ostopäivä, myyjä, summa, ALV-kanta ja ALV:n määrä täytetään valmiiksi. Vertaa kuittiin ja korjaa virheet."
      ),
      l3(
        "Chọn “Thanh toán bằng” (Thẻ công ty, Tài khoản công ty hoặc Tiền riêng), “Loại chi phí”, “Trung tâm chi phí” nếu có, và ghi “Mua gì và vì sao”.",
        "Choose how it was paid (company card, company account or own money), the expense type, a cost centre if used, and write what was bought and why.",
        "Valitse maksutapa (yrityskortti, yrityksen tili tai oma raha), kululaji, kustannuspaikka ja kirjoita mitä ostettiin ja miksi."
      ),
      l3(
        "Bấm “Gửi duyệt”, hoặc “Lưu bản nháp” để điền sau. Tích “Thêm tiếp sau khi lưu” khi nhập nhiều hóa đơn.",
        "Press “Send for approval”, or “Save as draft” to finish later. Tick “Add another after saving” for a pile of receipts.",
        "Paina ”Lähetä hyväksyttäväksi” tai ”Tallenna luonnokseksi”. Valitse ”Lisää seuraava tallennuksen jälkeen”, kun kuitteja on monta."
      ),
      l3(
        "Nhiều hóa đơn cùng lúc: “Tải nhiều file thành bản nháp” (tối đa 10 file), rồi mở từng bản nháp để điền và gửi.",
        "Many at once: “Upload several as drafts” (up to 10 files), then open each draft, fill it in and send it.",
        "Monta kerralla: ”Lataa useita luonnoksiksi” (enintään 10 tiedostoa), avaa luonnokset, täydennä ja lähetä."
      ),
    ],
    tips: [
      l3(
        "Chụp ngay sau khi trả tiền: hóa đơn giấy phai mực rất nhanh. Ô tìm kiếm ở mục Hóa đơn tìm được cả chữ trên ảnh.",
        "Snap the receipt right after paying: thermal paper fades fast. The search on the Receipts page also finds text on the images.",
        "Kuvaa kuitti heti maksun jälkeen, sillä lämpöpaperi haalistuu nopeasti. Haku löytää myös kuvien tekstit."
      ),
    ],
    quiz: [
      {
        q: l3("Máy đã tự điền thông tin từ ảnh. Bạn nên làm gì tiếp?", "The details were read from the photo. What next?", "Tiedot luettiin kuvasta. Mitä seuraavaksi?"),
        options: [
          l3("Gửi ngay, máy không bao giờ sai", "Send it straight away, it is never wrong", "Lähetä heti, se ei koskaan erehdy"),
          l3("So với tờ hóa đơn, nhất là tổng tiền và tiền thuế, rồi sửa chỗ sai", "Compare with the receipt, especially the total and VAT, and fix mistakes", "Vertaa kuittiin, erityisesti summa ja ALV, ja korjaa virheet"),
          l3("Xóa hết rồi gõ lại", "Delete everything and type it again", "Poista kaikki ja kirjoita uudelleen"),
        ],
        answer: 1,
        why: l3("Đọc chữ tự động có lúc nhầm, ví dụ lấy nhầm dòng làm tên người bán.", "Text recognition sometimes slips, for example taking an item line as the merchant.", "Tekstintunnistus erehtyy joskus, esimerkiksi tuoterivi luetaan myyjäksi."),
      },
      {
        q: l3("Bạn trả bằng tiền túi của mình. Chọn gì ở “Thanh toán bằng”?", "You paid with your own money. What do you pick under “Paid with”?", "Maksoit omilla rahoillasi. Mitä valitset maksutavaksi?"),
        options: [l3("Thẻ công ty", "Company card", "Yrityskortti"), l3("Tài khoản công ty", "Company account", "Yrityksen tili"), l3("Tiền riêng", "Own money", "Oma raha")],
        answer: 2,
        why: l3("Hóa đơn “Tiền riêng” được hoàn vào IBAN của bạn sau khi được duyệt.", "Own-money receipts are reimbursed to your IBAN after approval.", "Omalla rahalla maksetut kuitit korvataan IBAN-tilillesi hyväksynnän jälkeen."),
      },
      {
        q: l3("Cuối tháng còn 8 hóa đơn chưa nhập. Cách nhanh nhất?", "Eight receipts are left at month end. The quickest way?", "Kuun lopussa on kahdeksan kuittia jäljellä. Nopein tapa?"),
        options: [
          l3("“Tải nhiều file thành bản nháp”, rồi điền từng bản nháp", "“Upload several as drafts”, then complete each draft", "”Lataa useita luonnoksiksi” ja täydennä luonnokset"),
          l3("Gửi ảnh cho kế toán qua tin nhắn", "Send the photos to the accountant by chat", "Lähetä kuvat kirjanpitäjälle viestillä"),
          l3("Đợi tháng sau", "Wait until next month", "Odota seuraavaan kuuhun"),
        ],
        answer: 0,
        why: l3("Mỗi lần tải được đến 10 file; mỗi file thành một bản nháp.", "Up to 10 files at a time, each becomes a draft.", "Kerralla enintään 10 tiedostoa, jokaisesta tulee luonnos."),
      },
    ],
  },
  {
    slug: "ts-cong-tac-phi",
    course: "o-tositeo",
    title: l3("Tiền tự ứng và công tác phí", "Own-money expenses and travel claims", "Omat kulut ja matkalaskut"),
    summary: l3(
      "Khai hóa đơn trả bằng tiền riêng và lập công tác phí: Tositeo tự tính phụ cấp ngày và tiền đi xe theo km.",
      "Claim receipts you paid yourself and make a travel claim: Tositeo works out the daily allowance and mileage.",
      "Hae korvaus itse maksamistasi kuluista ja tee matkalasku: Tositeo laskee päivärahat ja kilometrikorvaukset."
    ),
    video: v("ts-cong-tac-phi"),
    href: `${TOSITEO}/app/travel/new`,
    hrefLabel: l3("Lập công tác phí", "Make a travel claim", "Tee matkalasku"),
    steps: [
      l3(
        "Tiền tự ứng: ở Tổng quan bấm “Trả bằng tiền riêng”, chụp hóa đơn, điền và “Gửi duyệt”.",
        "Own money: on the overview press “Paid with own money”, snap the receipt, fill it in and send it.",
        "Oma raha: paina yleiskatsauksessa ”Maksettu omalla rahalla”, kuvaa kuitti, täytä ja lähetä."
      ),
      l3(
        "Công tác phí: menu “Công tác phí” → “Công tác phí mới”. Điền “Tên chuyến đi”, “Mục đích”, giờ đi và giờ về.",
        "Travel claim: menu “Travel claims” → “New travel claim”. Fill in the trip name, purpose, departure and return time.",
        "Matkalasku: valikko ”Matkalaskut” → ”Uusi matkalasku”. Täytä nimi, tarkoitus sekä lähtö- ja paluuaika."
      ),
      l3(
        "Đi nước ngoài: chọn “Quốc gia đến”. Được bao hai bữa ăn: ghi số ngày vào “Số ngày được bao hai bữa ăn”.",
        "Abroad: choose the destination country. Two free meals: enter the number of such days.",
        "Ulkomailla: valitse kohdemaa. Kaksi ilmaista ateriaa: merkitse päivien määrä."
      ),
      l3(
        "Phần “Lộ trình”: điểm xuất phát, các điểm dừng (“Thêm điểm dừng”), điểm về và số km tới từng điểm. Chọn “Phương tiện” và phụ cấp thêm nếu có.",
        "Under “Route”: start, stops (“Add stop”), the end and the kilometres to each point. Choose the vehicle and any supplements.",
        "Reitti: lähtö, välietapit (”Lisää välietappi”), määränpää ja kilometrit. Valitse kulkuneuvo ja mahdolliset lisät."
      ),
      l3(
        "Đánh dấu hóa đơn tiền riêng của chuyến đi, xem “Bảng tính”, bấm “Gửi duyệt”. Tải bản in bằng nút “PDF”.",
        "Tick the trip's own-money receipts, check the calculation and press “Send for approval”. Download the printout with “PDF”.",
        "Valitse matkan omat kuitit, tarkista laskelma ja lähetä. Lataa tuloste PDF-painikkeella."
      ),
    ],
    tips: [
      l3(
        "Ở Phần Lan, Tositeo dùng mức chính thức của Cục Thuế cho năm diễn ra chuyến đi. Ở nước khác, chủ doanh nghiệp nhập mức phụ cấp trong Cài đặt công ty.",
        "In Finland Tositeo uses the Tax Administration's rates for the year of the trip. Elsewhere the owner enters the rates in the company settings.",
        "Suomessa Tositeo käyttää Verohallinnon kyseisen vuoden määriä. Muualla omistaja syöttää määrät yrityksen asetuksiin."
      ),
    ],
    quiz: [
      {
        q: l3("Chuyến đi kéo dài 12 tiếng (Phần Lan). Được phụ cấp gì?", "A 12-hour trip in Finland gets which allowance?", "12 tunnin matka Suomessa: mikä päiväraha?"),
        options: [l3("Không có", "None", "Ei mitään"), l3("Nửa ngày", "Partial day", "Osapäiväraha"), l3("Cả ngày", "Full day", "Kokopäiväraha")],
        answer: 2,
        why: l3("Trên 6 tiếng được nửa ngày, trên 10 tiếng được cả ngày.", "Over 6 hours gives a partial day, over 10 hours a full day.", "Yli 6 tuntia antaa osapäivärahan, yli 10 tuntia kokopäivärahan."),
      },
      {
        q: l3("Khách hàng mời bạn ăn trưa và ăn tối trong chuyến đi. Bạn làm gì?", "A client paid your lunch and dinner on the trip. What do you do?", "Asiakas tarjosi lounaan ja päivällisen. Mitä teet?"),
        options: [
          l3("Ghi số ngày vào “Số ngày được bao hai bữa ăn”", "Enter the day under “Days with two free meals”", "Merkitse päivä kohtaan ”Päivät, joina sait kaksi ilmaista ateriaa”"),
          l3("Không cần làm gì", "Nothing", "Ei mitään"),
          l3("Xóa công tác phí", "Delete the claim", "Poista matkalasku"),
        ],
        answer: 0,
        why: l3("Phụ cấp ngày đó sẽ tự giảm một nửa.", "The allowance for that day is halved automatically.", "Päivän päiväraha puolittuu automaattisesti."),
      },
      {
        q: l3("Công ty ở Đức. Mức phụ cấp lấy từ đâu?", "The company is in Germany. Where do the rates come from?", "Yritys on Saksassa. Mistä määrät tulevat?"),
        options: [
          l3("Mức của Phần Lan", "Finland's rates", "Suomen määristä"),
          l3("Mức chủ doanh nghiệp nhập trong Cài đặt công ty", "The rates the owner enters in the company settings", "Omistajan yrityksen asetuksiin syöttämistä määristä"),
          l3("Nhân viên tự đoán", "The employee guesses", "Työntekijä arvaa"),
        ],
        answer: 1,
        why: l3("Chưa nhập thì phụ cấp bằng 0, nên hãy cài đặt trước.", "Until they are entered the allowances are 0, so set them first.", "Ennen syöttämistä korvaukset ovat 0, joten aseta ne ensin."),
      },
    ],
  },
  {
    slug: "ts-duyet-chi",
    course: "o-tositeo",
    title: l3("Nhân viên và duyệt chi", "Your team and approvals", "Tiimi ja hyväksynnät"),
    summary: l3(
      "Mời nhân viên, chọn đúng vai trò, rồi duyệt hoặc trả lại hóa đơn và công tác phí của cả nhóm chỉ với một lần bấm.",
      "Invite your team with the right roles, then approve or return everyone's receipts and travel claims in one go.",
      "Kutsu tiimi oikeilla rooleilla ja hyväksy tai palauta kaikkien kuitit ja matkalaskut kerralla."
    ),
    video: v("ts-duyet-chi"),
    href: `${TOSITEO}/app/approvals`,
    hrefLabel: l3("Mở Duyệt chi", "Open approvals", "Avaa hyväksynnät"),
    steps: [
      l3(
        "Menu Cài đặt → “Nhóm” → “Mời một người”: nhập email, chọn “Vai trò”, bấm “Gửi lời mời”.",
        "Settings → “Team” → “Invite a person”: enter the e-mail, choose the role and press “Send invitation”.",
        "Asetukset → ”Tiimi” → ”Kutsu henkilö”: anna sähköposti, valitse rooli ja lähetä kutsu."
      ),
      l3(
        "Chọn vai trò: Nhân viên, Người duyệt, Quản trị, Chủ sở hữu, hoặc Người đọc (chỉ xem tài liệu, miễn phí).",
        "Pick a role: Employee, Approver, Admin, Owner, or Reader (documents only, free).",
        "Valitse rooli: työntekijä, hyväksyjä, ylläpito, omistaja tai lukija (vain dokumentit, maksuton)."
      ),
      l3(
        "Khi có mục mới: chuông thông báo và ô “Chờ bạn duyệt” ở Tổng quan. Mở menu “Duyệt chi”.",
        "New items show on the bell and in “Waiting for your approval” on the overview. Open “Approvals”.",
        "Uudet kohteet näkyvät kellossa ja yleiskatsauksessa. Avaa ”Hyväksynnät”."
      ),
      l3(
        "Tích các mục đúng, ghi lời nhắn nếu muốn, bấm “Duyệt các mục đã chọn”.",
        "Tick the items that are right, add a note if you like and press “Approve selected”.",
        "Valitse oikeat kohteet, lisää viesti halutessasi ja paina ”Hyväksy valitut”."
      ),
      l3(
        "Mục cần sửa: tích chọn, ghi rõ cần sửa gì (bắt buộc), bấm “Trả lại các mục đã chọn”. Nhân viên sửa rồi gửi lại.",
        "Items to fix: tick them, write what to fix (required) and press “Return selected”. The employee fixes and sends again.",
        "Korjattavat: valitse, kirjoita mitä korjataan (pakollinen) ja paina ”Palauta valitut”. Työntekijä korjaa ja lähettää uudelleen."
      ),
    ],
    tips: [
      l3(
        "Không muốn duyệt từng khoản? Bỏ tích “Chi phí phải được duyệt trước khi chuyển sang kế toán” trong Cài đặt công ty.",
        "Don't want to approve every expense? Untick “Expenses must be approved before they go to accounting” in the company settings.",
        "Etkö halua hyväksyä jokaista kulua? Poista valinta yrityksen asetuksista."
      ),
    ],
    quiz: [
      {
        q: l3("Vai trò nào chỉ thêm được hóa đơn và công tác phí của chính mình?", "Which role can only add their own receipts and travel claims?", "Mikä rooli voi lisätä vain omia kuittejaan ja matkalaskujaan?"),
        options: [l3("Nhân viên", "Employee", "Työntekijä"), l3("Người duyệt", "Approver", "Hyväksyjä"), l3("Quản trị", "Admin", "Ylläpito")],
        answer: 0,
        why: l3("Người duyệt duyệt được của mọi người; Quản trị lo thêm cài đặt, ngân hàng và xuất dữ liệu.", "Approvers approve everyone's expenses; admins also handle settings, bank and exports.", "Hyväksyjä hyväksyy kaikkien kulut; ylläpito hoitaa myös asetukset, pankin ja viennit."),
      },
      {
        q: l3("Khi trả lại một hóa đơn, điều gì là bắt buộc?", "What is required when you return a receipt?", "Mikä on pakollista kuittia palautettaessa?"),
        options: [l3("Ghi chú cần sửa gì", "A note saying what to fix", "Viesti siitä, mitä korjataan"), l3("Gọi điện cho nhân viên", "Phoning the employee", "Soitto työntekijälle"), l3("Xóa hóa đơn", "Deleting the receipt", "Kuitin poistaminen")],
        answer: 0,
        why: l3("Lời nhắn hiện ngay trên hóa đơn của nhân viên, và được lưu trong Lịch sử.", "The note shows on the employee's receipt and is kept in the history.", "Viesti näkyy työntekijän kuitissa ja tallentuu historiaan."),
      },
      {
        q: l3("Người chỉ cần xem phiếu lương và tài liệu thì chọn vai trò nào?", "Someone who only reads payslips and documents gets which role?", "Mikä rooli henkilölle, joka vain lukee palkkalaskelmia ja dokumentteja?"),
        options: [l3("Người đọc (miễn phí)", "Reader (free)", "Lukija (maksuton)"), l3("Chủ sở hữu", "Owner", "Omistaja"), l3("Người duyệt", "Approver", "Hyväksyjä")],
        answer: 0,
        why: l3("Người đọc thuộc gói Tài liệu, không tính phí.", "Readers are on the free Documents plan.", "Lukijat kuuluvat maksuttomaan Dokumentti-pakettiin."),
      },
    ],
  },
  {
    slug: "ts-ngan-hang",
    course: "o-tositeo",
    title: l3("Đối chiếu ngân hàng, tìm hóa đơn còn thiếu", "Match the bank statement and find missing receipts", "Pankkitäsmäytys ja puuttuvat kuitit"),
    summary: l3(
      "Nhập sao kê ngân hàng để mỗi khoản thanh toán tự ghép với hóa đơn; xem khoản nào còn thiếu và nhắc đúng người.",
      "Import your bank statement so every payment is matched to its receipt; see what is missing and remind the right person.",
      "Tuo tiliote, niin jokainen maksu yhdistetään kuittiinsa; näet puuttuvat kuitit ja muistutat oikeaa henkilöä."
    ),
    video: v("ts-ngan-hang"),
    href: `${TOSITEO}/app/bank`,
    hrefLabel: l3("Mở Ngân hàng và thẻ", "Open bank & card", "Avaa pankki ja kortti"),
    steps: [
      l3(
        "Trong ngân hàng trực tuyến, mở sao kê, chọn khoảng thời gian và tải về dạng CSV (hoặc camt.053 XML, MT940).",
        "In your online bank, open the statement, pick the period and download it as CSV (or camt.053 XML, MT940).",
        "Avaa verkkopankissa tiliote, valitse aikaväli ja lataa se CSV-muodossa (tai camt.053 XML, MT940)."
      ),
      l3(
        "Tositeo → “Ngân hàng và thẻ” → “Nhập sao kê”: ghi “Tài khoản hoặc thẻ”, chọn file, bấm “Nhập”.",
        "Tositeo → “Bank & card” → “Import a statement”: name the account or card, choose the file, press “Import”.",
        "Tositeo → ”Pankki ja kortti” → ”Tuo tiliote”: nimeä tili tai kortti, valitse tiedosto ja paina ”Tuo”."
      ),
      l3(
        "Xem trạng thái từng khoản: “Đã khớp”, “Thiếu hóa đơn”, “Không cần hóa đơn”.",
        "Check each payment's status: “Matched”, “Receipt missing”, “No receipt needed”.",
        "Tarkista maksujen tila: ”Täsmäytetty”, ”Kuitti puuttuu”, ”Ei tarvitse kuittia”."
      ),
      l3(
        "Ở thẻ “Thiếu hóa đơn”: bấm “Thêm hóa đơn” để chụp hóa đơn cho khoản đó, hoặc “Không cần hóa đơn”.",
        "On “Receipt missing”: press “Add receipt” to snap the receipt for that payment, or “No receipt needed”.",
        "Välilehdellä ”Kuitti puuttuu”: paina ”Lisää kuitti” tai ”Ei tarvitse kuittia”."
      ),
      l3(
        "Ghép nhầm thì “Bỏ khớp”; dò lại thì “Đối chiếu lại”. Nhắc ngay: “Gửi nhắc nhở ngay”. Cuối tháng: “Tổng hợp tháng (CSV)”.",
        "Wrong match: “Unmatch”; match again: “Match again”. Remind now: “Send reminder now”. Month end: “Monthly summary CSV”.",
        "Väärä täsmäytys: ”Pura täsmäytys”; uudelleen: ”Täsmäytä uudelleen”. Muistuta: ”Lähetä muistutus nyt”. Kuun lopussa: ”Kuukausikooste CSV”."
      ),
    ],
    tips: [
      l3(
        "Nhập lại cùng một file cũng không sao: các dòng đã có sẽ được bỏ qua.",
        "Importing the same file twice is fine: rows already imported are skipped.",
        "Saman tiedoston tuominen uudelleen ei haittaa: jo tuodut rivit ohitetaan."
      ),
    ],
    quiz: [
      {
        q: l3("Một khoản thẻ ghi “Thiếu hóa đơn”. Cách nhanh nhất để bổ sung?", "A card payment says “Receipt missing”. Quickest fix?", "Korttimaksussa lukee ”Kuitti puuttuu”. Nopein korjaus?"),
        options: [
          l3("Bấm “Thêm hóa đơn” ngay trên dòng đó", "Press “Add receipt” on that row", "Paina riviltä ”Lisää kuitti”"),
          l3("Gửi ảnh cho kế toán qua email", "E-mail the photo to the accountant", "Lähetä kuva kirjanpitäjälle sähköpostilla"),
          l3("Xóa giao dịch", "Delete the payment", "Poista maksu"),
        ],
        answer: 0,
        why: l3("Ngày, người bán và số tiền được điền sẵn, hóa đơn tự khớp với khoản đó.", "Date, merchant and amount are filled in and the receipt is matched to that payment.", "Päivä, myyjä ja summa täytetään valmiiksi ja kuitti täsmäytetään maksuun."),
      },
      {
        q: l3("Phí ngân hàng hằng tháng thì đánh dấu thế nào?", "How do you mark the monthly bank fee?", "Miten merkitset kuukausittaisen pankkimaksun?"),
        options: [l3("Không cần hóa đơn", "No receipt needed", "Ei tarvitse kuittia"), l3("Đã khớp", "Matched", "Täsmäytetty"), l3("Để nguyên", "Leave it", "Jätä ennalleen")],
        answer: 0,
        why: l3("Khoản đó sẽ không bị nhắc nữa.", "It will not trigger reminders any more.", "Siitä ei enää muistuteta."),
      },
      {
        q: l3("Lỡ nhập cùng một file sao kê hai lần thì sao?", "What if you import the same statement twice?", "Entä jos tuot saman tiliotteen kahdesti?"),
        options: [l3("Giao dịch bị nhân đôi", "Payments are doubled", "Maksut kahdentuvat"), l3("Các dòng đã có được bỏ qua", "Rows already there are skipped", "Jo tuodut rivit ohitetaan"), l3("Phải xóa hết làm lại", "You must delete everything", "Kaikki on poistettava")],
        answer: 1,
        why: l3("Tositeo nhận ra giao dịch đã nhập trước đó.", "Tositeo recognises payments it already has.", "Tositeo tunnistaa jo tuodut maksut."),
      },
    ],
  },
  {
    slug: "ts-hoan-tien-xuat",
    course: "o-tositeo",
    title: l3("Hoàn tiền SEPA và xuất sang kế toán", "SEPA reimbursements and the accounting export", "SEPA-kulukorvaukset ja kirjanpitoon vienti"),
    summary: l3(
      "Trả tiền tự ứng cho mọi người bằng một file SEPA, tải file ZIP cho kế toán và đóng sổ từng tháng.",
      "Pay everyone's out-of-pocket expenses with one SEPA file, download the ZIP for your accountant and close each month.",
      "Maksa kaikkien kulukorvaukset yhdellä SEPA-tiedostolla, lataa ZIP kirjanpitäjälle ja sulje kuukaudet."
    ),
    video: v("ts-hoan-tien-xuat"),
    href: `${TOSITEO}/app/payments`,
    hrefLabel: l3("Mở Hoàn tiền", "Open reimbursements", "Avaa kulukorvaukset"),
    steps: [
      l3(
        "Menu Tài chính → “Hoàn tiền”: xem các khoản tiền riêng và công tác phí đã duyệt, theo từng người.",
        "Finance → “Reimbursements”: see approved own-money receipts and travel claims, person by person.",
        "Talous → ”Kulukorvaukset”: näet hyväksytyt omat kulut ja matkalaskut henkilöittäin."
      ),
      l3(
        "Tích chọn người cần trả, chọn “Ngày thanh toán”, bấm “Tạo file thanh toán SEPA”, rồi “Tải file SEPA”.",
        "Tick the people to pay, choose the payment date, press “Create SEPA payment file”, then “Download SEPA file”.",
        "Valitse maksettavat henkilöt ja maksupäivä, paina ”Muodosta SEPA-maksuaineisto” ja sitten ”Lataa SEPA-aineisto”."
      ),
      l3(
        "Trong ngân hàng trực tuyến, tải file lên ở mục gửi file thanh toán (SEPA XML). Các khoản được đánh dấu đã thanh toán.",
        "In your online bank, upload the file under payment files (SEPA XML). The items are marked as paid.",
        "Lataa tiedosto verkkopankin maksuaineistoihin (SEPA XML). Kohteet merkitään maksetuiksi."
      ),
      l3(
        "Menu “Xuất sang kế toán”: chọn khoảng thời gian, giữ tích “Chỉ các mục chưa xuất trước đó”, bấm “Tải file ZIP”.",
        "“Export to accounting”: choose the period, keep “Only items not exported before” ticked and press “Download ZIP”.",
        "”Vie kirjanpitoon”: valitse aikaväli, pidä ”Vain aiemmin viemättömät” valittuna ja paina ”Lataa ZIP”."
      ),
      l3(
        "Khi kế toán đã chốt sổ, bấm “Đóng tháng” ở phần Các tháng. Cần sửa thì “Mở lại”.",
        "Once the accountant has closed the books, press “Close month” under Months. To change something, “Open again”.",
        "Kun kirjanpitäjä on päättänyt kuukauden, paina ”Sulje kuukausi”. Muutoksia varten ”Avaa uudelleen”."
      ),
    ],
    tips: [
      l3(
        "File SEPA chỉ dành cho công ty dùng tiền euro. Ở nước khác, chuyển khoản như thường rồi ghi nhận trong sổ sách.",
        "SEPA files are for companies that use the euro. Elsewhere, pay by normal bank transfer and record it in your books.",
        "SEPA-tiedostot ovat euroa käyttäville yrityksille. Muualla maksa tavallisella tilisiirrolla."
      ),
    ],
    quiz: [
      {
        q: l3("Ba người cần được hoàn tiền. Cách nhanh nhất?", "Three people need reimbursing. The quickest way?", "Kolmelle pitää maksaa kulukorvaus. Nopein tapa?"),
        options: [
          l3("Một file SEPA tải lên ngân hàng trực tuyến", "One SEPA file uploaded to the online bank", "Yksi verkkopankkiin ladattava SEPA-tiedosto"),
          l3("Chuyển khoản tay ba lần", "Three manual transfers", "Kolme käsin tehtyä siirtoa"),
          l3("Trả tiền mặt", "Pay cash", "Käteisellä"),
        ],
        answer: 0,
        why: l3("Ngân hàng chuyển cho mọi người trong một lần, và các khoản được đánh dấu đã thanh toán.", "The bank pays everyone at once and the items are marked as paid.", "Pankki maksaa kaikille kerralla, ja kohteet merkitään maksetuiksi."),
      },
      {
        q: l3("Ô “Chỉ các mục chưa xuất trước đó” giúp gì?", "What does “Only items not exported before” do?", "Mitä ”Vain aiemmin viemättömät” tekee?"),
        options: [
          l3("Không gửi trùng cho kế toán", "Avoids sending the same items twice", "Estää lähettämästä samoja kohteita kahdesti"),
          l3("Xóa hóa đơn cũ", "Deletes old receipts", "Poistaa vanhat kuitit"),
          l3("Đóng tháng", "Closes the month", "Sulkee kuukauden"),
        ],
        answer: 0,
        why: l3("Mục đã xuất được đánh dấu, lần sau chỉ xuất phần mới.", "Exported items are marked, so next time only new ones go out.", "Viedyt kohteet merkitään, joten seuraavalla kerralla viedään vain uudet."),
      },
      {
        q: l3("Hóa đơn của một tháng đã đóng được thêm vào sau thì sao?", "A receipt for a closed month is added later. What happens?", "Suljetun kuukauden kuitti lisätään myöhemmin. Mitä tapahtuu?"),
        options: [
          l3("Bị từ chối", "It is rejected", "Se hylätään"),
          l3("Được hạch toán vào tháng mở kế tiếp", "It is booked in the next open month", "Se kirjataan seuraavalle avoimelle kuukaudelle"),
          l3("Tháng đó tự mở lại", "That month reopens automatically", "Kuukausi avautuu automaattisesti"),
        ],
        answer: 1,
        why: l3("Tháng đã đóng không nhận hạch toán mới.", "A closed month takes no new bookings.", "Suljetulle kuukaudelle ei tehdä uusia kirjauksia."),
      },
    ],
  },
  {
    slug: "ts-ke-toan-tai-lieu",
    course: "o-tositeo",
    title: l3("Kết nối kế toán, tài liệu và chuyển dữ liệu", "Your accountant, documents and moving your data", "Kirjanpitäjä, dokumentit ja tietojen siirto"),
    summary: l3(
      "Mời kế toán vào Tositeo, cất giấy tờ công ty theo thư mục, và chuyển hóa đơn cũ từ eTasku hay dịch vụ khác.",
      "Invite your accountant, keep company documents in folders and move old receipts over from eTasku or another service.",
      "Kutsu kirjanpitäjä, säilytä yrityksen dokumentit kansioissa ja siirrä vanhat kuitit eTaskusta tai muusta palvelusta."
    ),
    video: v("ts-ke-toan-tai-lieu"),
    href: `${TOSITEO}/app/accountant`,
    hrefLabel: l3("Mời kế toán", "Invite your accountant", "Kutsu kirjanpitäjä"),
    steps: [
      l3(
        "Menu Cài đặt → “Kế toán của bạn”: nhập “Email của kế toán”, bấm “Gửi lời mời”.",
        "Settings → “Your accountant”: enter the accountant's e-mail and press “Send invitation”.",
        "Asetukset → ”Kirjanpitäjä”: anna kirjanpitäjän sähköposti ja paina ”Lähetä kutsu”."
      ),
      l3(
        "Kế toán xin quyền bằng mã số doanh nghiệp: bạn chấp nhận hoặc từ chối ở cùng trang. Thôi hợp tác: “Ngừng quyền truy cập”.",
        "If the accountant asks for access with your business ID, accept or decline on the same page. To stop: “End access”.",
        "Jos kirjanpitäjä pyytää pääsyä Y-tunnuksella, hyväksy tai hylkää samalla sivulla. Lopetus: ”Lopeta pääsy”."
      ),
      l3(
        "Menu “Tài liệu” → “Tải tài liệu lên”: chọn “Thư mục”, đặt “Tiêu đề”, chọn “Ai được xem”, chọn file, bấm “Tải lên”.",
        "“Documents” → “Upload documents”: choose the folder, a title and who can see it, pick the files and press “Upload”.",
        "”Dokumentit” → ”Lataa dokumentteja”: valitse kansio, otsikko ja kuka näkee, valitse tiedostot ja paina ”Lataa”."
      ),
      l3(
        "Nhiều giấy tờ: gom vào một file ZIP rồi “Tải ZIP lên”; thư mục trong ZIP được giữ trong tiêu đề.",
        "Many documents: put them in one ZIP and use “Upload ZIP”; folders inside the ZIP stay in the titles.",
        "Monta dokumenttia: pakkaa ne ZIP-tiedostoon ja käytä ”Lataa ZIP”; kansiot säilyvät otsikoissa."
      ),
      l3(
        "Chuyển từ dịch vụ khác: menu “Chuyển từ dịch vụ khác”, tải bảng tổng hợp CSV (và ZIP ảnh nếu có), bấm “Kiểm tra các tệp”, xem trước rồi xác nhận.",
        "Moving from another service: “Move from another service”, upload the summary CSV (and the image ZIP if you have it), press “Check the files”, review and confirm.",
        "Siirto toisesta palvelusta: ”Siirry toisesta palvelusta”, lataa yhteenveto-CSV (ja kuvien ZIP), paina ”Tarkista tiedostot”, tarkista ja vahvista."
      ),
    ],
    tips: [
      l3(
        "Tự đăng nhập dịch vụ cũ để tải file về. Đừng bao giờ đưa mật khẩu của dịch vụ khác cho bất kỳ ai.",
        "Sign in to your old service yourself to download the files. Never give that password to anyone.",
        "Kirjaudu vanhaan palveluun itse ja lataa tiedostot. Älä koskaan anna sen salasanaa kenellekään."
      ),
    ],
    quiz: [
      {
        q: l3("Kế toán của bạn có phải trả tiền để dùng Tositeo không?", "Does your accountant pay to use Tositeo?", "Maksaako kirjanpitäjäsi Tositeon käytöstä?"),
        options: [l3("Không, tài khoản kế toán miễn phí", "No, accountant accounts are free", "Ei, kirjanpitäjän tunnukset ovat maksuttomat"), l3("Có, theo số khách hàng", "Yes, per client", "Kyllä, asiakaskohtaisesti"), l3("Chỉ năm đầu miễn phí", "Only the first year is free", "Vain ensimmäinen vuosi on maksuton")],
        answer: 0,
        why: l3("Mỗi kế toán đăng nhập bằng tài khoản riêng, miễn phí.", "Every accountant signs in with their own free account.", "Jokainen kirjanpitäjä kirjautuu omilla maksuttomilla tunnuksillaan."),
      },
      {
        q: l3("Phiếu lương chỉ nên để quản trị viên và kế toán xem. Chọn gì khi tải lên?", "Payslips should only be seen by admins and the accountant. What do you choose?", "Palkkalaskelmat vain ylläpidolle ja kirjanpitäjälle. Mitä valitset?"),
        options: [
          l3("“Ai được xem”: Quản trị viên và kế toán", "“Who can see it”: Admins and accountant", "”Kuka näkee”: Ylläpito ja kirjanpitäjä"),
          l3("“Ai được xem”: Mọi người trong công ty", "“Who can see it”: Everyone in the company", "”Kuka näkee”: Kaikki yrityksessä"),
          l3("Không tải lên", "Don't upload them", "Älä lataa niitä"),
        ],
        answer: 0,
        why: l3("Mỗi tài liệu có quyền xem riêng.", "Each document has its own visibility.", "Jokaisella dokumentilla on oma näkyvyytensä."),
      },
      {
        q: l3("Khi chuyển dữ liệu từ dịch vụ cũ, hóa đơn trùng thì sao?", "When moving data over, what happens to duplicates?", "Mitä kaksoiskappaleille tapahtuu siirrossa?"),
        options: [l3("Được bỏ qua", "They are skipped", "Ne ohitetaan"), l3("Bị nhân đôi", "They are doubled", "Ne kahdentuvat"), l3("Làm hỏng dữ liệu", "They break the data", "Ne rikkovat tiedot")],
        answer: 0,
        why: l3("Bạn còn xem trước từng dòng; chưa có gì được lưu cho đến khi bạn xác nhận.", "You also review every row first; nothing is saved until you confirm.", "Tarkistat rivit ensin; mitään ei tallenneta ennen vahvistusta."),
      },
    ],
  },
  {
    slug: "ts-van-phong",
    course: "o-tositeo",
    title: l3("Dành cho văn phòng kế toán", "For accounting firms", "Tilitoimistoille"),
    summary: l3(
      "Tài khoản kế toán miễn phí: mọi khách hàng trong một bảng làm việc, nhận khách mới, mời đồng nghiệp và hàng chờ hạch toán.",
      "A free accountant account: every client in one workspace, new clients, colleagues and the booking queue.",
      "Maksuton kirjanpitäjän tili: kaikki asiakkaat yhdessä työtilassa, uudet asiakkaat, kollegat ja kirjausjono."
    ),
    video: v("ts-van-phong"),
    href: `${TOSITEO}/accountants`,
    hrefLabel: l3("Tositeo cho kế toán", "Tositeo for accountants", "Tositeo tilitoimistoille"),
    steps: [
      l3(
        "Đăng ký ở thẻ “Kế toán viên” (miễn phí). Sau khi đăng nhập bạn vào “Bảng làm việc kế toán”.",
        "Sign up on the “Accountant” tab (free). After signing in you land in the accountant workspace.",
        "Rekisteröidy välilehdellä ”Kirjanpitäjä” (maksuton). Kirjautumisen jälkeen avautuu kirjanpitäjän työtila."
      ),
      l3(
        "“Tổng quan”: số hóa đơn, công tác phí cần hạch toán và khoản còn thiếu hóa đơn của mọi khách; “Cần xử lý” đưa khách nhiều việc lên trước.",
        "“Overview”: receipts and travel claims to book and missing receipts across all clients; “Needs attention” lists the busiest first.",
        "”Yleiskatsaus”: kirjattavat kuitit ja matkalaskut sekä puuttuvat kuitit kaikilta asiakkailta; ”Vaatii huomiota” näyttää kiireisimmät ensin."
      ),
      l3(
        "Khách mời bạn: “Yêu cầu kết nối” → “Chấp nhận”. Tự thêm khách: “Khách hàng” → “Thêm khách hàng” (quốc gia, mã số, tên, email người liên hệ).",
        "A client invites you: “Connection requests” → “Accept”. Add a client yourself: “Clients” → “Add client” (country, ID, name, contact e-mail).",
        "Asiakas kutsuu: ”Liittymispyynnöt” → ”Hyväksy”. Lisää itse: ”Asiakkaat” → ”Lisää asiakas” (maa, tunnus, nimi, yhteyshenkilön sähköposti)."
      ),
      l3(
        "Ở mỗi khách: “Mở” để làm việc trong công ty của khách, “Xuất” để tải dữ liệu, “Nhắc” để gửi email nhắc hóa đơn thiếu.",
        "For each client: “Open” to work inside the company, “Export” to download data, “Remind” to e-mail about missing receipts.",
        "Jokaisella asiakkaalla: ”Avaa”, ”Vie” ja ”Muistuta” puuttuvista kuiteista."
      ),
      l3(
        "“Kế toán viên” → nhập email đồng nghiệp → “Gửi lời mời”. “Hàng chờ hạch toán”: tích chọn rồi “Đánh dấu đã hạch toán”.",
        "“Accountants” → colleague's e-mail → “Send invitation”. “Booking queue”: tick items and press “Mark as booked”.",
        "”Kirjanpitäjät” → kollegan sähköposti → ”Lähetä kutsu”. ”Kirjausjono”: valitse ja paina ”Merkitse kirjatuksi”."
      ),
    ],
    tips: [
      l3(
        "Một tài khoản dùng cho cả hai cổng: đăng nhập kế toán và đăng nhập doanh nghiệp.",
        "One account works for both doors: the accountant login and the business login.",
        "Samat tunnukset toimivat kummastakin kirjautumisesta."
      ),
    ],
    quiz: [
      {
        q: l3("Một khách ở Séc dùng tiền CZK, khách khác ở Đức dùng euro. Một văn phòng quản lý cả hai được không?", "One client is in Czechia (CZK), another in Germany (EUR). Can one firm handle both?", "Yksi asiakas on Tšekissä (CZK), toinen Saksassa (EUR). Voiko sama toimisto hoitaa molemmat?"),
        options: [l3("Được, mỗi khách theo nước và tiền tệ riêng", "Yes, each client keeps its own country and currency", "Kyllä, jokaisella asiakkaalla on oma maa ja valuutta"), l3("Không, chỉ một nước", "No, one country only", "Ei, vain yksi maa"), l3("Chỉ khi đổi sang euro", "Only after switching to euro", "Vain euroon vaihtamalla")],
        answer: 0,
        why: l3("Danh sách khách hàng hiện nước và tiền tệ của từng khách.", "The client list shows each client's country and currency.", "Asiakaslista näyttää jokaisen asiakkaan maan ja valuutan."),
      },
      {
        q: l3("Muốn nhắc khách nộp hóa đơn còn thiếu, bấm gì?", "To remind a client about missing receipts, press…", "Muistuttaaksesi asiakasta puuttuvista kuiteista paina…"),
        options: [l3("“Nhắc”", "“Remind”", "”Muistuta”"), l3("“Xuất”", "“Export”", "”Vie”"), l3("“Gỡ bỏ”", "“Remove”", "”Poista”")],
        answer: 0,
        why: l3("Tositeo gửi email cho khách về các khoản còn thiếu.", "Tositeo e-mails the client about what is missing.", "Tositeo lähettää asiakkaalle sähköpostin puuttuvista."),
      },
      {
        q: l3("Đồng nghiệp trong văn phòng có phải dùng chung một tài khoản không?", "Do colleagues share one login?", "Käyttävätkö kollegat samoja tunnuksia?"),
        options: [l3("Không, mỗi người một tài khoản riêng", "No, each has their own account", "Ei, jokaisella on omat tunnukset"), l3("Có, dùng chung", "Yes, they share it", "Kyllä, yhteiset"), l3("Chỉ chủ văn phòng được vào", "Only the firm owner can sign in", "Vain omistaja voi kirjautua")],
        answer: 0,
        why: l3("Mời họ ở mục Kế toán viên; ai cũng thấy mọi khách hàng của văn phòng.", "Invite them under Accountants; everyone sees all the firm's clients.", "Kutsu heidät kohdassa Kirjanpitäjät; kaikki näkevät toimiston asiakkaat."),
      },
    ],
  },
  {
    slug: "ts-hach-toan",
    course: "o-tositeo",
    title: l3("Kế toán: hạch toán nhanh trong công ty khách hàng", "Accountants: quick booking inside a client", "Kirjanpitäjälle: pikakirjaus asiakkaan yrityksessä"),
    summary: l3(
      "Mở công ty của khách, kiểm tra từng hóa đơn với ảnh gốc, hạch toán bằng bàn phím, hỏi khách ngay trên hóa đơn và cài số tài khoản.",
      "Open a client's company, check each receipt against its image, book with the keyboard, ask the client on the receipt itself and set the accounts.",
      "Avaa asiakkaan yritys, tarkista kuitit kuvia vasten, kirjaa näppäimistöllä, kysy asiakkaalta suoraan kuitilla ja määritä tilit."
    ),
    video: v("ts-hach-toan"),
    href: `${TOSITEO}/accountant/login`,
    hrefLabel: l3("Đăng nhập cho kế toán", "Accountant login", "Kirjanpitäjän kirjautuminen"),
    steps: [
      l3(
        "“Khách hàng” → “Mở”: bạn vào công ty của khách, thanh trên cùng ghi “Chế độ kế toán”. Quay lại: “Về danh sách khách hàng”.",
        "“Clients” → “Open”: you enter the client's company and the top bar says you are in accountant view. Back: “Back to all clients”.",
        "”Asiakkaat” → ”Avaa”: siirryt asiakkaan yritykseen kirjanpitäjän näkymässä. Takaisin: ”Takaisin kaikkiin asiakkaisiin”."
      ),
      l3(
        "“Hóa đơn” → “Hạch toán lần lượt”: mỗi hóa đơn mở ra với ảnh gốc bên cạnh.",
        "“Receipts” → “Book one by one”: each receipt opens next to its original image.",
        "”Kuitit” → ”Kirjaa yksitellen”: jokainen kuitti avautuu alkuperäisen kuvan viereen."
      ),
      l3(
        "Kiểm tra ngày, người bán, chọn “Loại chi phí và tài khoản”, xem “Các dòng VAT” (hai mức thuế: “Tách thành dòng VAT khác”). Bấm “Hạch toán, mở hóa đơn tiếp” hoặc phím Enter.",
        "Check the date and merchant, choose the expense type and account, check the VAT lines (two rates: “Split into another VAT line”). Press “Book and open next” or Enter.",
        "Tarkista päivä ja myyjä, valitse kululaji ja tili, tarkista ALV-rivit (kaksi kantaa: jaa uudelle riville). Paina ”Kirjaa ja avaa seuraava” tai Enter."
      ),
      l3(
        "Phím tắt: ← → chuyển hóa đơn, R ghi lý do trả lại, S tách dòng VAT. Hóa đơn chưa đúng: ghi lý do rồi “Trả lại cho khách hàng”.",
        "Shortcuts: ← → move between receipts, R writes a return reason, S splits a VAT line. Wrong receipt: write the reason and press “Return to the client”.",
        "Pikanäppäimet: ← → kuitista toiseen, R palautuksen syy, S uusi ALV-rivi. Virheellinen kuitti: kirjoita syy ja palauta asiakkaalle."
      ),
      l3(
        "Cần hỏi: viết vào “Tin nhắn với kế toán” trên hóa đơn; khách nhận email và trả lời ngay tại đó.",
        "Questions: write in the message box on the receipt; the client gets an e-mail and answers right there.",
        "Kysymykset: kirjoita kuitin viestikenttään; asiakas saa sähköpostin ja vastaa samaan paikkaan."
      ),
      l3(
        "“Loại chi phí”: gán số tài khoản và VAT mặc định theo hệ thống tài khoản của nước khách, rồi “Lưu loại chi phí”. Khách thiếu hóa đơn: “Khách hàng” → “Nhắc”.",
        "“Expense types”: set the account number and default VAT to the client's national chart of accounts, then save. Missing receipts: “Clients” → “Remind”.",
        "”Kululajit”: määritä tilinumero ja oletus-ALV asiakkaan maan tilikartan mukaan ja tallenna. Puuttuvat kuitit: ”Asiakkaat” → ”Muistuta”."
      ),
    ],
    tips: [
      l3(
        "Số tài khoản mẫu chỉ có sẵn cho Phần Lan. Với khách ở nước khác, hãy điền số tài khoản trước khi hạch toán hóa đơn đầu tiên.",
        "Sample account numbers are pre-filled for Finland only. For clients elsewhere, fill in the accounts before booking the first receipt.",
        "Valmiit tilinumerot ovat vain Suomelle. Muiden maiden asiakkaille täytä tilit ennen ensimmäistä kirjausta."
      ),
    ],
    quiz: [
      {
        q: l3("Phím nào hạch toán hóa đơn đang mở và chuyển sang hóa đơn tiếp theo?", "Which key books the open receipt and moves to the next one?", "Mikä näppäin kirjaa kuitin ja avaa seuraavan?"),
        options: [l3("Enter", "Enter", "Enter"), l3("R", "R", "R"), l3("S", "S", "S")],
        answer: 0,
        why: l3("R dùng để ghi lý do trả lại, S để tách thêm một dòng VAT.", "R writes a return reason and S splits another VAT line.", "R kirjoittaa palautuksen syyn ja S lisää ALV-rivin."),
      },
      {
        q: l3("Hóa đơn có hai mức thuế 13,5 % và 25,5 %. Bạn làm gì?", "A receipt has two VAT rates, 13.5 % and 25.5 %. What do you do?", "Kuitissa on kaksi ALV-kantaa, 13,5 % ja 25,5 %. Mitä teet?"),
        options: [
          l3("“Tách thành dòng VAT khác” và nhập từng dòng", "“Split into another VAT line” and enter each line", "Jaa uudelle ALV-riville ja syötä rivit"),
          l3("Chọn mức cao hơn cho cả hóa đơn", "Use the higher rate for everything", "Käytä korkeampaa kantaa koko kuittiin"),
          l3("Trả lại cho khách", "Return it to the client", "Palauta asiakkaalle"),
        ],
        answer: 0,
        why: l3("Mỗi dòng có thuế suất, tổng tiền và tiền thuế riêng.", "Each line has its own rate, total and VAT amount.", "Jokaisella rivillä on oma kanta, summa ja ALV."),
      },
      {
        q: l3("Muốn hỏi khách về một hóa đơn mà không phải gọi điện, bạn dùng gì?", "To ask the client about a receipt without phoning, you use…", "Kysyäksesi asiakkaalta kuitista soittamatta käytät…"),
        options: [l3("Tin nhắn ngay trên hóa đơn", "The message box on the receipt", "Kuitin viestikenttää"), l3("Xóa hóa đơn", "Delete the receipt", "Kuitin poistoa"), l3("Đóng tháng", "Close the month", "Kuukauden sulkemista")],
        answer: 0,
        why: l3("Khách nhận email và trả lời ngay trên hóa đơn đó.", "The client gets an e-mail and replies on that receipt.", "Asiakas saa sähköpostin ja vastaa samalla kuitilla."),
      },
    ],
  },
];
