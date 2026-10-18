/** Shared data model for the free QR poster tool (/tools/qr-poster). Used by
 * the browser editor and the layout engine, so it must stay free of
 * browser- or Node-only imports. */

export type PosterTemplate = "minimal" | "luxury" | "pastel" | "seasonal";
export type Season = "christmas" | "blackfriday" | "tet";
export type PosterFormat = "a4" | "a5" | "a6" | "tent" | "sticker" | "square" | "story";

export interface PosterDoc {
  version: 1;
  salonName: string;
  /** Logo as a data URL (PNG/JPEG — SVG uploads are rasterized on upload). */
  logo: string | null;
  /** 1–3 locale codes; the first is the main language. */
  languages: string[];
  /** Headline per display language. */
  titles: Record<string, string>;
  lines: { offer: string; hours: string; phone: string; wifi: string };
  booking: { mode: "varaaai" | "custom"; url: string; slug?: string | null };
  review: { enabled: boolean; url: string };
  /** Put the logo in the middle of the booking QR (uses error correction H). */
  qrLogo: boolean;
  template: PosterTemplate;
  season: Season;
  color: string;
  format: PosterFormat;
  /** Round stickers: four per A4 sheet with cut lines. */
  stickerSheet: boolean;
  showFooter: boolean;
}

export const MAX_LANGUAGES = 3;

const MM = 72 / 25.4;

/** Sizes in PDF points; PNG export scale in pixels per point. */
export const POSTER_FORMATS: Record<PosterFormat, { w: number; h: number; pngScale: number; code: string }> = {
  a4: { w: 595.28, h: 841.89, pngScale: 2, code: "a4" },
  a5: { w: 419.53, h: 595.28, pngScale: 2.5, code: "a5" },
  a6: { w: 297.64, h: 419.53, pngScale: 3.5, code: "a6" },
  // A4 portrait folded in half across: two 210×148.5 mm faces.
  tent: { w: 595.28, h: 841.89, pngScale: 2, code: "tent" },
  sticker: { w: 100 * MM, h: 100 * MM, pngScale: 4, code: "st" },
  square: { w: 540, h: 540, pngScale: 2, code: "sq" },
  story: { w: 540, h: 960, pngScale: 2, code: "story" },
};

export const POSTER_DEFAULT_COLOR: Record<PosterTemplate, string> = {
  minimal: "#624f89",
  luxury: "#c9a96e",
  pastel: "#e48bb4",
  seasonal: "#e23b3b",
};

export const SEASON_DEFAULT_COLOR: Record<Season, string> = {
  christmas: "#e23b3b",
  blackfriday: "#ffd400",
  tet: "#f6c453",
};

export function emptyPoster(locale: string, title: string): PosterDoc {
  return {
    version: 1,
    salonName: "",
    logo: null,
    languages: [locale],
    titles: { [locale]: title },
    lines: { offer: "", hours: "", phone: "", wifi: "" },
    booking: { mode: "custom", url: "" },
    review: { enabled: false, url: "" },
    qrLogo: false,
    template: "minimal",
    season: "christmas",
    color: POSTER_DEFAULT_COLOR.minimal,
    format: "a4",
    stickerSheet: false,
    showFooter: true,
  };
}

export function validUrl(url: string) {
  return /^https?:\/\/[^\s/.]+(\.[^\s/.]+)+/i.test(url.trim()) || /^https?:\/\/localhost(:\d+)?\//i.test(url.trim());
}

/** What the booking QR encodes. VaraaAi salons get the short /q/ link (a
 * sparser QR that still scans small, and counts the scan); other links get
 * UTM tags added directly. */
export function bookingQrData(doc: PosterDoc, origin: string): string | null {
  const code = POSTER_FORMATS[doc.format].code;
  if (doc.booking.mode === "varaaai" && doc.booking.slug) {
    const lang = doc.languages[0];
    return `${origin}/q/${encodeURIComponent(doc.booking.slug)}?f=${code}${lang && lang !== "vi" ? `&l=${lang}` : ""}`;
  }
  const url = doc.booking.url.trim();
  if (!validUrl(url)) return null;
  try {
    const u = new URL(url);
    // Kept to two short tags: every extra character makes the QR denser
    // and harder to scan from a small sticker.
    u.searchParams.set("utm_source", "qr_poster");
    u.searchParams.set("utm_campaign", code);
    return u.toString();
  } catch {
    return null;
  }
}

/** Normalizes untrusted JSON (localStorage) into a valid poster. */
export function sanitizePoster(raw: unknown, locale: string, defaultTitle: string): PosterDoc {
  const base = emptyPoster(locale, defaultTitle);
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Partial<PosterDoc>;
  const str = (v: unknown, max = 200) => (typeof v === "string" ? v.slice(0, max) : "");
  const languages = Array.isArray(r.languages)
    ? r.languages.filter((l): l is string => typeof l === "string" && /^[a-z]{2,3}$/.test(l)).slice(0, MAX_LANGUAGES)
    : [];
  const titles: Record<string, string> = {};
  if (r.titles && typeof r.titles === "object") for (const [k, v] of Object.entries(r.titles)) if (typeof v === "string") titles[k.slice(0, 8)] = v.slice(0, 120);
  const pick = <T extends string>(v: unknown, opts: readonly T[], d: T) => (opts.includes(v as T) ? (v as T) : d);
  const template = pick(r.template, ["minimal", "luxury", "pastel", "seasonal"] as const, base.template);
  return {
    version: 1,
    salonName: str(r.salonName, 120),
    logo: typeof r.logo === "string" && r.logo.startsWith("data:image/") ? r.logo : null,
    languages: languages.length ? languages : base.languages,
    titles: Object.keys(titles).length ? titles : base.titles,
    lines: {
      offer: str(r.lines?.offer, 120),
      hours: str(r.lines?.hours, 120),
      phone: str(r.lines?.phone, 60),
      wifi: str(r.lines?.wifi, 80),
    },
    booking: {
      mode: r.booking?.mode === "varaaai" && r.booking.slug ? "varaaai" : "custom",
      url: str(r.booking?.url, 500),
      slug: r.booking?.slug ? str(r.booking.slug, 120) : null,
    },
    review: { enabled: !!r.review?.enabled, url: str(r.review?.url, 500) },
    qrLogo: !!r.qrLogo,
    template,
    season: pick(r.season, ["christmas", "blackfriday", "tet"] as const, base.season),
    color: typeof r.color === "string" && /^#[0-9a-fA-F]{6}$/.test(r.color) ? r.color : POSTER_DEFAULT_COLOR[template],
    format: pick(r.format, ["a4", "a5", "a6", "tent", "sticker", "square", "story"] as const, base.format),
    stickerSheet: !!r.stickerSheet,
    showFooter: r.showFooter !== false,
  };
}
