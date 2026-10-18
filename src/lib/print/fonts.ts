/** Google Fonts builds of the same Noto / Playfair families the server's PDF
 * renderer embeds, so text measured in the browser matches the PDF. Each
 * script is a unicode-range slice, downloaded only when that script is used. */
export const PRINT_FONTS_HREF =
  "https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800" +
  "&family=Noto+Sans+Thai:wght@400;500;600;700;800&family=Noto+Sans+Khmer:wght@400;500;600;700;800" +
  "&family=Noto+Sans+Arabic:wght@400;500;600;700;800&family=Noto+Sans+Hebrew:wght@400;500;600;700;800" +
  "&family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Noto+Sans+SC:wght@400;500;700;800" +
  "&family=Noto+Sans+JP:wght@400;500;700;800&family=Noto+Sans+KR:wght@400;500;700;800&display=swap";
