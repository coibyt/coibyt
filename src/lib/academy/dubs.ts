/** Lessons recorded again in another language — the screen walkthrough and
 * the voice, not only the page text. Files live in
 * public/academy/<locale>/<slug>.mp4 | .jpg | .vtt.
 * A locale without its own recording gets the English one, and a lesson
 * without an English one keeps the original Vietnamese video. */
export const DUBS: Record<string, Record<string, { seconds: number; published: string }>> = {
  en: {
    "dat-lich-online": { seconds: 136, published: "2026-11-16" },
    "tai-khoan": { seconds: 63, published: "2026-11-16" },
    "dich-vu": { seconds: 85, published: "2026-11-16" },
    "gio-mo-cua": { seconds: 55, published: "2026-11-16" },
    "cai-app": { seconds: 82, published: "2026-11-16" },
    "lich-hen-cua-toi": { seconds: 57, published: "2026-11-16" },
    "dang-ky-salon": { seconds: 87, published: "2026-11-17" },
    "nhan-vien": { seconds: 70, published: "2026-11-17" },
    "ho-so-salon": { seconds: 57, published: "2026-11-17" },
    "thanh-toan-chinh-sach": { seconds: 74, published: "2026-11-17" },
    "mau-lich-hen": { seconds: 53, published: "2026-11-17" },
    "chia-se-link": { seconds: 64, published: "2026-11-17" },
    "thanh-toan-hoa-don": { seconds: 62, published: "2026-11-17" },
    "khach-hang": { seconds: 63, published: "2026-11-17" },
    "tong-quan": { seconds: 54, published: "2026-11-17" },
    "viet-danh-gia": { seconds: 46, published: "2026-11-17" },
    "chat-voi-salon": { seconds: 39, published: "2026-11-17" },
    "danh-gia-google": { seconds: 68, published: "2026-11-17" },
    "tin-nhan-ai": { seconds: 60, published: "2026-11-17" },
    "the-qua-tang": { seconds: 55, published: "2026-11-17" },
    "theo-doi-salon": { seconds: 62, published: "2026-11-17" },
    "hoa-don": { seconds: 44, published: "2026-11-17" },
    "doanh-thu-nhan-vien": { seconds: 91, published: "2026-11-17" },
    "xuat-excel": { seconds: 69, published: "2026-11-17" },
    "website-salon": { seconds: 80, published: "2026-11-17" },
    "fanpage": { seconds: 61, published: "2026-11-17" },
    "the-qua-tang-salon": { seconds: 85, published: "2026-11-17" },
    "email-marketing": { seconds: 88, published: "2026-11-17" },
    "san-pham-don-hang": { seconds: 70, published: "2026-11-17" },
    "kho-hang": { seconds: 81, published: "2026-11-17" },
    "tien-ich-nhom": { seconds: 74, published: "2026-11-17" },
    "cong-tac-vien": { seconds: 63, published: "2026-11-17" },
    "chi-nhanh": { seconds: 60, published: "2026-11-17" },
    "poster-qr": { seconds: 133, published: "2026-11-17" },
    "bang-gia": { seconds: 103, published: "2026-11-17" },
    "kiem-tra-salon": { seconds: 102, published: "2026-11-17" },
    "the-khach-quen": { seconds: 140, published: "2026-11-17" },
    "the-tich-diem": { seconds: 73, published: "2026-11-17" },
    "khach-dan-khach": { seconds: 70, published: "2026-11-17" },
    "lich-hen": { seconds: 92, published: "2026-11-17" },
    "the-thanh-vien": { seconds: 58, published: "2026-11-17" },
    // Craft lessons in English (voice "Dean", same pictures as the Vietnamese lesson).
    "son-gel": { seconds: 358, published: "2026-11-19" },
  },
  // Craft lessons in Finnish (voice "Jarmo").
  fi: {
    "son-gel": { seconds: 414, published: "2026-11-19" },
  },
};
