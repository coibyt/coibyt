import { formatInTimeZone } from "date-fns-tz";

/** Holiday looks a salon can put on its booking page and its bookings
 * calendar (Business.seasonalTheme): a banner with the holiday's colours and
 * ornaments, and — unless the owner picked their own — matching booking
 * colours on the calendar. "auto" follows the date. */

type L = { vi: string; en: string; fi: string };

export interface SeasonalTheme {
  id: string;
  emojis: string[];
  name: L;
  greeting: L;
  /** Banner gradient, its accent (ornaments, small text) and the text on it. */
  from: string;
  to: string;
  accent: string;
  /** Booking blocks on the calendar while the theme is on. */
  booking: { bg: string; text: string };
}

export const SEASONAL_THEMES: SeasonalTheme[] = [
  {
    id: "christmas",
    emojis: ["🎄", "❄️", "🎁", "⭐", "🔔"],
    name: { vi: "Giáng sinh", en: "Christmas", fi: "Joulu" },
    greeting: { vi: "Giáng sinh an lành & ấm áp", en: "Merry Christmas", fi: "Hyvää joulua" },
    from: "#0f3d2e",
    to: "#7a1426",
    accent: "#f0cf8a",
    booking: { bg: "#fdf0f0", text: "#9b1c2c" },
  },
  {
    id: "newyear",
    emojis: ["🎆", "🥂", "✨", "🎉", "🕛"],
    name: { vi: "Năm mới", en: "New Year", fi: "Uusi vuosi" },
    greeting: { vi: "Chúc mừng năm mới", en: "Happy New Year", fi: "Hyvää uutta vuotta" },
    from: "#0b1530",
    to: "#2f2a6b",
    accent: "#f5d48a",
    booking: { bg: "#f1f0fb", text: "#2f2a6b" },
  },
  {
    id: "tet",
    emojis: ["🧧", "🏮", "🌸", "🐉", "🎊"],
    name: { vi: "Tết Nguyên Đán", en: "Lunar New Year", fi: "Kiinalainen uusivuosi" },
    greeting: { vi: "Chúc mừng năm mới — An khang thịnh vượng", en: "Happy Lunar New Year", fi: "Hyvää kuun uutta vuotta" },
    from: "#7a0b0b",
    to: "#d42a1f",
    accent: "#ffd36b",
    booking: { bg: "#fff4e3", text: "#b3261e" },
  },
  {
    id: "valentine",
    emojis: ["💝", "🌹", "💕", "💌", "✨"],
    name: { vi: "Valentine", en: "Valentine's Day", fi: "Ystävänpäivä" },
    greeting: { vi: "Valentine ngọt ngào", en: "Happy Valentine's Day", fi: "Hyvää ystävänpäivää" },
    from: "#5e0d30",
    to: "#d6336c",
    accent: "#ffc2d4",
    booking: { bg: "#fff0f5", text: "#b4245c" },
  },
  {
    id: "womensday",
    emojis: ["🌷", "💐", "🌸", "💖", "✨"],
    name: { vi: "Ngày Phụ nữ (8/3, 20/10)", en: "Women's Day", fi: "Naistenpäivä" },
    greeting: { vi: "Chúc mừng ngày Phụ nữ — luôn rạng rỡ", en: "Happy Women's Day", fi: "Hyvää naistenpäivää" },
    from: "#4f2366",
    to: "#c2549d",
    accent: "#ffd1ea",
    booking: { bg: "#fbf0f8", text: "#8e2f74" },
  },
  {
    id: "easter",
    emojis: ["🐣", "🌷", "🥚", "🐰", "🌼"],
    name: { vi: "Lễ Phục sinh", en: "Easter", fi: "Pääsiäinen" },
    greeting: { vi: "Lễ Phục sinh vui vẻ", en: "Happy Easter", fi: "Hyvää pääsiäistä" },
    from: "#3f6b4f",
    to: "#8fbf6b",
    accent: "#fff2a8",
    booking: { bg: "#f6fbea", text: "#3f6b2a" },
  },
  {
    id: "vappu",
    emojis: ["🎈", "🥂", "🎓", "🎉", "🌼"],
    name: { vi: "Vappu (Phần Lan)", en: "Vappu", fi: "Vappu" },
    greeting: { vi: "Vappu vui vẻ", en: "Happy Vappu", fi: "Hauskaa vappua" },
    from: "#1e3a8a",
    to: "#3b82f6",
    accent: "#fde68a",
    booking: { bg: "#eef4ff", text: "#1e40af" },
  },
  {
    id: "midsummer",
    emojis: ["🌼", "☀️", "🌿", "🔥", "🌸"],
    name: { vi: "Lễ hội giữa hè", en: "Midsummer", fi: "Juhannus" },
    greeting: { vi: "Mùa hè rực rỡ", en: "Happy Midsummer", fi: "Hyvää juhannusta" },
    from: "#14532d",
    to: "#65a30d",
    accent: "#fef08a",
    booking: { bg: "#f2fbe9", text: "#3f6212" },
  },
  {
    id: "midautumn",
    emojis: ["🏮", "🥮", "🌕", "🐇", "✨"],
    name: { vi: "Trung thu", en: "Mid-Autumn Festival", fi: "Kuujuhla" },
    greeting: { vi: "Trung thu đoàn viên", en: "Happy Mid-Autumn Festival", fi: "Hyvää kuujuhlaa" },
    from: "#1c1d4d",
    to: "#c2681a",
    accent: "#ffd27a",
    booking: { bg: "#fff6ea", text: "#9a4a0b" },
  },
  {
    id: "halloween",
    emojis: ["🎃", "🦇", "👻", "🕸️", "🍬"],
    name: { vi: "Halloween", en: "Halloween", fi: "Halloween" },
    greeting: { vi: "Halloween vui vẻ", en: "Happy Halloween", fi: "Hauskaa halloweenia" },
    from: "#1a0f24",
    to: "#c2410c",
    accent: "#fdba74",
    booking: { bg: "#fff3e8", text: "#9a3412" },
  },
  {
    id: "independence-fi",
    emojis: ["💙", "🕯️", "❄️", "⭐", "✨"],
    name: { vi: "Ngày Độc lập Phần Lan", en: "Finnish Independence Day", fi: "Itsenäisyyspäivä" },
    greeting: { vi: "Mừng ngày Độc lập Phần Lan", en: "Happy Independence Day", fi: "Hyvää itsenäisyyspäivää" },
    from: "#0b2a5b",
    to: "#2563eb",
    accent: "#e0ecff",
    booking: { bg: "#eef4ff", text: "#0b3a8a" },
  },
  {
    id: "spring",
    emojis: ["🌸", "🌱", "🦋", "🌷", "☀️"],
    name: { vi: "Mùa xuân", en: "Spring", fi: "Kevät" },
    greeting: { vi: "Xuân tươi mới", en: "Hello spring", fi: "Ihanaa kevättä" },
    from: "#7a3b69",
    to: "#e58fb5",
    accent: "#fff0f7",
    booking: { bg: "#fff2f8", text: "#9d3a72" },
  },
  {
    id: "autumn",
    emojis: ["🍂", "🍁", "☕", "🌰", "🍄"],
    name: { vi: "Mùa thu", en: "Autumn", fi: "Syksy" },
    greeting: { vi: "Thu dịu dàng", en: "Cozy autumn", fi: "Kaunista syksyä" },
    from: "#4a2412",
    to: "#c2702a",
    accent: "#ffd9a8",
    booking: { bg: "#fff4ea", text: "#8a4214" },
  },
];

/** Lunar New Year and the Mid-Autumn Festival move every year. */
const LUNAR_NEW_YEAR: Record<number, string> = { 2026: "02-17", 2027: "02-06", 2028: "01-26", 2029: "02-13", 2030: "02-03", 2031: "01-23", 2032: "02-11" };
const MID_AUTUMN: Record<number, string> = { 2026: "09-25", 2027: "09-15", 2028: "10-03", 2029: "09-22", 2030: "09-12", 2031: "10-01", 2032: "09-19" };

/** Easter Sunday (Gregorian), as "MM-DD". */
function easter(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return `${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

const DAY = 86_400_000;
const shift = (year: number, mmdd: string, days: number) => new Date(Date.parse(`${year}-${mmdd}T00:00:00Z`) + days * DAY).toISOString().slice(5, 10);

/** "auto": the theme for a salon-local date. Moving holidays come first, then fixed windows. */
function autoTheme(year: number, md: string): string | null {
  const within = (from: string, to: string) => (from <= to ? md >= from && md <= to : md >= from || md <= to);
  const lny = LUNAR_NEW_YEAR[year];
  if (lny && within(shift(year, lny, -14), shift(year, lny, 7))) return "tet";
  const ma = MID_AUTUMN[year];
  if (ma && within(shift(year, ma, -10), shift(year, ma, 1))) return "midautumn";
  const e = easter(year);
  if (within(shift(year, e, -7), shift(year, e, 1))) return "easter";
  if (within("12-01", "12-26")) return "christmas";
  if (within("12-27", "01-06")) return "newyear";
  if (within("02-07", "02-14")) return "valentine";
  if (within("03-01", "03-08") || within("10-15", "10-20")) return "womensday";
  if (within("04-27", "05-01")) return "vappu";
  if (within("06-15", "06-25")) return "midsummer";
  if (within("10-21", "10-31")) return "halloween";
  return null;
}

export function themeById(id: string | null | undefined) {
  return SEASONAL_THEMES.find((t) => t.id === id) ?? null;
}

/** The theme in force: a chosen one, "auto" by the salon's date, or none. */
export function resolveTheme(setting: string | null | undefined, timeZone: string, now = new Date()): SeasonalTheme | null {
  if (!setting) return null;
  if (setting !== "auto") return themeById(setting);
  const year = Number(formatInTimeZone(now, timeZone, "yyyy"));
  return themeById(autoTheme(year, formatInTimeZone(now, timeZone, "MM-dd")));
}

export const themeText = (x: L, locale: string) => (locale === "vi" ? x.vi : locale === "fi" ? x.fi : x.en);

export const HEX_COLOR = /^#[0-9a-fA-F]{6}$/;
