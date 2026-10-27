// Vietnamese family names. A name starting with one of these is written
// family-name first ("Nguyễn Thị Lan"), so the name people are called by is
// the last word — unlike "Anna Virtanen", where it's the first.
const VN_FAMILY = new Set(
  [
    "nguyễn", "nguyen", "trần", "tran", "lê", "le", "phạm", "pham", "hoàng", "hoang", "huỳnh", "huynh",
    "phan", "vũ", "vu", "võ", "vo", "đặng", "dang", "bùi", "bui", "đỗ", "do", "hồ", "ho", "ngô", "ngo",
    "dương", "duong", "lý", "ly", "đinh", "dinh", "trương", "truong", "đoàn", "doan", "lâm", "lam",
    "mai", "tô", "to", "hà", "ha", "cao", "lưu", "luu", "tạ", "ta", "châu", "chau", "quách", "quach",
    "thái", "thai", "kiều", "kieu", "vương", "vuong", "đào", "dao", "trịnh", "trinh", "lương", "luong",
    "tăng", "tang", "triệu", "trieu", "đàm", "dam", "khúc", "khuc", "giang", "la", "hứa", "hua",
  ].map((s) => s.normalize("NFC"))
);

/** The part of a full name to greet someone by: "Nguyễn Thị Lan" → "Lan",
 * "Anna Virtanen" → "Anna". */
export function givenName(name: string | null | undefined): string {
  const words = (name ?? "").normalize("NFC").trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return "";
  if (words.length > 1 && VN_FAMILY.has(words[0].toLowerCase())) return words[words.length - 1];
  return words[0];
}
