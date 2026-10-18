/** Google Fonts builds of the same Noto / Playfair families the server's PDF
 * renderer embeds, so text measured in the browser matches the PDF. Each
 * script is a unicode-range slice, downloaded only when that script is used. */
export const PRICE_LIST_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800" +
  "&family=Noto+Sans+Thai:wght@400;500;600;700;800&family=Noto+Sans+Khmer:wght@400;500;600;700;800" +
  "&family=Noto+Sans+Arabic:wght@400;500;600;700;800&family=Noto+Sans+Hebrew:wght@400;500;600;700;800" +
  "&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;800" +
  "&family=Noto+Sans+JP:wght@400;500;700;800&family=Noto+Sans+KR:wght@400;500;700;800&display=swap";

/** Ready-made categories offered in the editor (names come from the shared
 * category translations, so each display language gets its own wording). */
export const PRESET_CATEGORIES = [
  { nameEn: "Nails", nameVi: "Nail & móng" },
  { nameEn: "Hair salon", nameVi: "Cắt tóc & tạo kiểu" },
  { nameEn: "Barber", nameVi: "Cắt tóc nam" },
  { nameEn: "Brows & lashes", nameVi: "Mi & chân mày" },
  { nameEn: "Spa & massage", nameVi: "Spa & massage" },
  { nameEn: "Skincare & facials", nameVi: "Chăm sóc da mặt" },
  { nameEn: "Makeup", nameVi: "Trang điểm" },
  { nameEn: "Wellness", nameVi: "Thư giãn & sức khoẻ" },
];
