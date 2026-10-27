/** Text of the salon settings page frame (hero, profile checklist, section
 * menu) — Vietnamese, English and Finnish, English for every other
 * language. The cards inside keep their own translations. */

export type SettingsSectionId = "profile" | "contact" | "booking" | "payments" | "website" | "branches" | "account";

export type ChecklistId =
  | "logo"
  | "cover"
  | "description"
  | "location"
  | "categories"
  | "phone"
  | "social"
  | "policy"
  | "bank"
  | "invoice"
  | "hours"
  | "services"
  | "staff";

const STRINGS = {
  vi: {
    eyebrow: "Cài đặt salon",
    publicPage: "Trang đặt lịch công khai",
    copy: "Sao chép link",
    copied: "Đã sao chép link",
    view: "Xem trang",
    qr: "Mã QR",
    qrTitle: "Mã QR trang đặt lịch",
    qrHint: "In mã này lên quầy, gương, danh thiếp hoặc tờ rơi — khách quét là mở ngay trang đặt lịch của salon.",
    downloadQr: "Tải mã QR",
    close: "Đóng",
    status: { APPROVED: "Đang hoạt động", PENDING: "Chờ duyệt", REJECTED: "Bị từ chối", SUSPENDED: "Tạm khóa" } as Record<string, string>,
    completeTitle: "Mức độ hoàn thiện hồ sơ",
    completeText: "Hồ sơ đầy đủ giúp salon nổi bật trên bản đồ tìm kiếm và khách tin tưởng đặt lịch hơn.",
    completeDone: "Tuyệt vời! Hồ sơ của salon đã hoàn thiện.",
    todo: "Còn {n} mục cần hoàn thiện",
    fix: "Bổ sung",
    menu: "Mục cài đặt",
    sections: {
      profile: ["Hồ sơ salon", "Tên, mô tả, địa chỉ, danh mục, logo và ảnh bìa"],
      contact: ["Liên hệ & mạng xã hội", "Số điện thoại, email, website, Facebook, Instagram…"],
      booking: ["Đặt lịch & chính sách", "Ngôn ngữ, tiền tệ, thời hạn và chính sách hủy lịch"],
      payments: ["Thanh toán & hóa đơn", "Tài khoản ngân hàng và thông tin xuất hóa đơn"],
      website: ["Website & nhúng đặt lịch", "Gắn nút đặt lịch vào website hoặc Facebook của bạn"],
      branches: ["Chi nhánh", "Quản lý nhiều cơ sở trong một tài khoản"],
      account: ["Tài khoản & bảo mật", "Email đăng nhập và mật khẩu"],
    } as Record<SettingsSectionId, [string, string]>,
    checklist: {
      logo: "Logo salon",
      cover: "Ảnh bìa",
      description: "Mô tả salon (từ 80 ký tự)",
      location: "Địa chỉ và vị trí trên bản đồ",
      categories: "Danh mục dịch vụ",
      phone: "Số điện thoại liên hệ",
      social: "Website hoặc mạng xã hội",
      policy: "Chính sách hủy lịch",
      bank: "Tài khoản ngân hàng",
      invoice: "Thông tin xuất hóa đơn",
      hours: "Giờ mở cửa",
      services: "Ít nhất 1 dịch vụ",
      staff: "Ít nhất 1 nhân viên",
    } as Record<ChecklistId, string>,
    quickTitle: "Cài đặt liên quan",
    quick: {
      hours: "Giờ mở cửa",
      services: "Dịch vụ & bảng giá",
      staff: "Nhân viên",
      landing: "Trang landing",
    },
    branchesHint: "Mỗi chi nhánh có trang đặt lịch, lịch hẹn và nhân viên riêng. Chuyển giữa các chi nhánh ở đầu bảng điều khiển.",
    thisBranch: "Đang xem",
  },
  en: {
    eyebrow: "Salon settings",
    publicPage: "Public booking page",
    copy: "Copy link",
    copied: "Link copied",
    view: "View page",
    qr: "QR code",
    qrTitle: "Booking page QR code",
    qrHint: "Print it at the desk, on mirrors, business cards or flyers — customers scan it to open your booking page.",
    downloadQr: "Download QR code",
    close: "Close",
    status: { APPROVED: "Live", PENDING: "Awaiting approval", REJECTED: "Rejected", SUSPENDED: "Suspended" } as Record<string, string>,
    completeTitle: "Profile completeness",
    completeText: "A complete profile stands out on the search map and makes customers more confident to book.",
    completeDone: "Great! Your salon profile is complete.",
    todo: "{n} items left to complete",
    fix: "Add",
    menu: "Settings",
    sections: {
      profile: ["Salon profile", "Name, description, address, categories, logo and cover"],
      contact: ["Contact & social", "Phone, email, website, Facebook, Instagram…"],
      booking: ["Booking & policies", "Language, currency, cancellation window and policy"],
      payments: ["Payments & invoices", "Bank account and invoicing details"],
      website: ["Website & booking widget", "Add a booking button to your website or Facebook"],
      branches: ["Branches", "Run several locations from one account"],
      account: ["Account & security", "Sign-in email and password"],
    } as Record<SettingsSectionId, [string, string]>,
    checklist: {
      logo: "Salon logo",
      cover: "Cover photo",
      description: "Description (80+ characters)",
      location: "Address and map location",
      categories: "Service categories",
      phone: "Contact phone",
      social: "Website or social media",
      policy: "Cancellation policy",
      bank: "Bank account",
      invoice: "Invoicing details",
      hours: "Opening hours",
      services: "At least 1 service",
      staff: "At least 1 staff member",
    } as Record<ChecklistId, string>,
    quickTitle: "Related settings",
    quick: {
      hours: "Opening hours",
      services: "Services & prices",
      staff: "Staff",
      landing: "Landing page",
    },
    branchesHint: "Each branch has its own booking page, calendar and staff. Switch branches at the top of the dashboard.",
    thisBranch: "Viewing",
  },
  fi: {
    eyebrow: "Salongin asetukset",
    publicPage: "Julkinen varaussivu",
    copy: "Kopioi linkki",
    copied: "Linkki kopioitu",
    view: "Näytä sivu",
    qr: "QR-koodi",
    qrTitle: "Varaussivun QR-koodi",
    qrHint: "Tulosta se tiskille, peileihin, käyntikortteihin tai esitteisiin — asiakas skannaa ja varaussivu aukeaa.",
    downloadQr: "Lataa QR-koodi",
    close: "Sulje",
    status: { APPROVED: "Julkaistu", PENDING: "Odottaa hyväksyntää", REJECTED: "Hylätty", SUSPENDED: "Jäädytetty" } as Record<string, string>,
    completeTitle: "Profiilin valmiusaste",
    completeText: "Täydellinen profiili erottuu hakukartalla ja saa asiakkaat varaamaan luottavaisemmin.",
    completeDone: "Hienoa! Salongin profiili on valmis.",
    todo: "{n} kohtaa täydentämättä",
    fix: "Lisää",
    menu: "Asetukset",
    sections: {
      profile: ["Salongin profiili", "Nimi, kuvaus, osoite, kategoriat, logo ja kansikuva"],
      contact: ["Yhteystiedot ja some", "Puhelin, sähköposti, verkkosivu, Facebook, Instagram…"],
      booking: ["Varaukset ja ehdot", "Kieli, valuutta, peruutusaika ja -ehdot"],
      payments: ["Maksut ja laskutus", "Pankkitili ja laskutustiedot"],
      website: ["Verkkosivu ja varauspainike", "Lisää varauspainike verkkosivullesi tai Facebookiin"],
      branches: ["Toimipisteet", "Useita toimipisteitä yhdellä tilillä"],
      account: ["Tili ja turvallisuus", "Kirjautumissähköposti ja salasana"],
    } as Record<SettingsSectionId, [string, string]>,
    checklist: {
      logo: "Salongin logo",
      cover: "Kansikuva",
      description: "Kuvaus (vähintään 80 merkkiä)",
      location: "Osoite ja sijainti kartalla",
      categories: "Palvelukategoriat",
      phone: "Puhelinnumero",
      social: "Verkkosivu tai some",
      policy: "Peruutusehdot",
      bank: "Pankkitili",
      invoice: "Laskutustiedot",
      hours: "Aukioloajat",
      services: "Vähintään 1 palvelu",
      staff: "Vähintään 1 työntekijä",
    } as Record<ChecklistId, string>,
    quickTitle: "Muut asetukset",
    quick: {
      hours: "Aukioloajat",
      services: "Palvelut ja hinnat",
      staff: "Henkilökunta",
      landing: "Laskeutumissivu",
    },
    branchesHint: "Jokaisella toimipisteellä on oma varaussivu, kalenteri ja henkilökunta. Vaihda toimipistettä hallintapaneelin yläosasta.",
    thisBranch: "Valittuna",
  },
};

export type SettingsStrings = (typeof STRINGS)["en"];

export function settingsStrings(locale: string): SettingsStrings {
  return (STRINGS as Record<string, SettingsStrings>)[locale] ?? STRINGS.en;
}
