// Đa ngôn ngữ: chữ giao diện nằm ở content/i18n/<mã>/ui.json (bản gốc: vi). Thêm ngôn ngữ: xem content/i18n/TRANSLATE.md.

// Thứ tự theo yêu cầu của chủ dự án. font: phông Google Fonts bổ sung cho chữ viết không có trong Be Vietnam Pro/Oswald.
export const LANGS = [
  { code: "vi", name: "Tiếng Việt" },
  { code: "ru", name: "Русский", font: "Noto Sans" },
  { code: "zh", name: "中文", font: "Noto Sans SC" },
  { code: "kk", name: "Қазақша", font: "Noto Sans" },
  { code: "ar", name: "العربية", font: "Noto Sans Arabic", rtl: true },
  { code: "id", name: "Bahasa Indonesia" },
  { code: "fa", name: "فارسی", font: "Vazirmatn", rtl: true },
  { code: "mn", name: "Монгол", font: "Noto Sans" },
  { code: "tr", name: "Türkçe", font: "Noto Sans" },
  { code: "my", name: "မြန်မာ", font: "Noto Sans Myanmar" },
  { code: "fr", name: "Français" },
  { code: "so", name: "Soomaali" },
  { code: "uk", name: "Українська", font: "Noto Sans" },
  { code: "mg", name: "Malagasy" },
  { code: "th", name: "ไทย", font: "Noto Sans Thai" },
  { code: "es", name: "Español" },
  { code: "tk", name: "Türkmençe", font: "Noto Sans" },
  { code: "sv", name: "Svenska" },
  { code: "uz", name: "Oʻzbekcha", font: "Noto Sans" },
  { code: "ja", name: "日本語", font: "Noto Sans JP" },
  { code: "de", name: "Deutsch" },
  { code: "fi", name: "Suomi" },
  { code: "it", name: "Italiano" },
  { code: "en", name: "English" },
  { code: "pl", name: "Polski", font: "Noto Sans" },
  { code: "ko", name: "한국어", font: "Noto Sans KR" },
  { code: "pt", name: "Português" },
  { code: "el", name: "Ελληνικά", font: "Noto Sans" },
  { code: "nl", name: "Nederlands" },
  { code: "da", name: "Dansk" },
];
export const langInfo = (c) => LANGS.find((x) => x.code === c) || LANGS[0];

// Ngôn ngữ mặc định: ?lang=xx trên địa chỉ → ngôn ngữ của trình duyệt → tiếng Việt.
export function detectLang() {
  const q = new URLSearchParams(location.search).get("lang");
  if (q && LANGS.some((x) => x.code === q)) return q;
  for (const n of navigator.languages || [navigator.language || "vi"]) {
    const c = String(n).toLowerCase().split("-")[0];
    if (LANGS.some((x) => x.code === c)) return c;
  }
  return "vi";
}

let lang = "vi";
let UI = {};
let VI = {};
const fetchJSON = (u) => fetch(u).then((r) => { if (!r.ok) throw new Error(u); return r.json(); });

// Nạp chữ giao diện + phông + hướng viết cho ngôn ngữ `l`.
export async function setLang(l) {
  const info = langInfo(l);
  lang = info.code;
  VI = await fetchJSON("content/i18n/vi/ui.json");
  UI = lang === "vi" ? VI : await fetchJSON(`content/i18n/${lang}/ui.json`).catch(() => VI);
  const html = document.documentElement;
  html.lang = lang;
  html.dir = info.rtl ? "rtl" : "ltr";
  if (info.font) {
    const id = "font-" + lang;
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id; link.rel = "stylesheet";
      link.href = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(info.font)}:wght@400;500;600;700&display=swap`;
      document.head.appendChild(link);
    }
    html.style.setProperty("--fx", `"${info.font}"`);
  } else html.style.removeProperty("--fx");
  return lang;
}

export const t = (k, ...a) => {
  const v = UI[k] ?? VI[k];
  if (v == null) return k;
  if (typeof v === "string" && a.length) return v.replace(/\{(\d)\}/g, (_, i) => (a[i] ?? ""));
  return v;
};
export const L = () => lang;
export const fx = () => langInfo(lang).font || "";
