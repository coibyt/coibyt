export function clock(sec: number): string {
  if (!isFinite(sec) || sec < 0) sec = 0;
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return h ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}` : `${m}:${String(s).padStart(2, "0")}`;
}

export function minutesText(sec: number): string {
  const m = Math.round(sec / 60);
  if (m < 60) return `${m} phút`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} giờ ${r} phút` : `${h} giờ`;
}

const WEEKDAYS = ["Chủ nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
export function dateVi(iso: string, withWeekday = true): string {
  const d = new Date(iso + "T12:00:00");
  const base = `${d.getDate()} tháng ${d.getMonth() + 1}, ${d.getFullYear()}`;
  return withWeekday ? `${WEEKDAYS[d.getDay()]}, ${base}` : base;
}
export const shortDateVi = (iso: string) => {
  const d = new Date(iso + "T12:00:00");
  return `${d.getDate()}/${d.getMonth() + 1}`;
};

export const PART_NAMES: Record<number, { vi: string; hint: string }> = {
  0: { vi: "Mở đầu", hint: "Giới thiệu chủ đề" },
  1: { vi: "15 cụm từ mới", hint: "Nghĩa Việt → Anh chậm → Anh thường, kèm ví dụ · 2 lượt" },
  2: { vi: "Hội thoại", hint: "2 đoạn · song ngữ → chậm → tự nhiên → đóng vai" },
  3: { vi: "Nghe mở rộng", hint: "100% tiếng Anh · mỗi bài 3 lần" },
  4: { vi: "Ôn tập", hint: "Anh → 3 giây tự nhớ → Việt" },
  5: { vi: "Kết thúc", hint: "" },
};
