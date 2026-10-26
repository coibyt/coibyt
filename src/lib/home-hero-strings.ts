/** Text of the homepage hero and its search bar that isn't in the message
 * catalogues — Vietnamese, English and Finnish, with English for every
 * other language. */
const STRINGS = {
  vi: {
    eyebrow: "Đặt lịch online 24/7 · Miễn phí cho khách",
    serviceLabel: "Dịch vụ hoặc salon",
    areaLabel: "Khu vực",
    nearMe: "Gần tôi",
    locating: "Đang tìm…",
    locateFailed: "Không lấy được vị trí — hãy nhập thành phố.",
    allServices: "Tất cả dịch vụ",
    salons: "salon",
    bookings: "lượt đặt lịch",
    reviewsFrom: "từ {n} đánh giá thật",
    getApp: "Tải app",
    featured: "Salon nổi bật",
    bookNow: "Đặt lịch",
    confirmed: "Đã xác nhận",
    confirmedDetail: "Hôm nay · 14:00",
    reminder: "Nhắc lịch trước 2 giờ",
  },
  en: {
    eyebrow: "Book online 24/7 · Free for customers",
    serviceLabel: "Service or salon",
    areaLabel: "Area",
    nearMe: "Near me",
    locating: "Locating…",
    locateFailed: "Couldn't get your location — type a city instead.",
    allServices: "All services",
    salons: "salons",
    bookings: "bookings",
    reviewsFrom: "from {n} real reviews",
    getApp: "Get the app",
    featured: "Featured salon",
    bookNow: "Book",
    confirmed: "Confirmed",
    confirmedDetail: "Today · 14:00",
    reminder: "Reminder 2 hours before",
  },
  fi: {
    eyebrow: "Varaa verkossa 24/7 · Ilmainen asiakkaille",
    serviceLabel: "Palvelu tai salonki",
    areaLabel: "Alue",
    nearMe: "Lähelläni",
    locating: "Paikannetaan…",
    locateFailed: "Sijaintia ei saatu — kirjoita kaupunki.",
    allServices: "Kaikki palvelut",
    salons: "salonkia",
    bookings: "varausta",
    reviewsFrom: "{n} aidosta arviosta",
    getApp: "Lataa sovellus",
    featured: "Suosittu salonki",
    bookNow: "Varaa",
    confirmed: "Vahvistettu",
    confirmedDetail: "Tänään · 14:00",
    reminder: "Muistutus 2 tuntia ennen",
  },
};

export type HomeHeroStrings = (typeof STRINGS)["en"];

export function homeHeroStrings(locale: string): HomeHeroStrings {
  return (STRINGS as Record<string, HomeHeroStrings>)[locale] ?? STRINGS.en;
}
