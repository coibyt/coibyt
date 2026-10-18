/** Shared data model for the free price-list tool (/tools/price-list).
 * Used by the browser editor, the layout engine, and the server PDF
 * renderer, so it must stay free of browser- or Node-only imports. */

export type TemplateId = "minimal" | "luxury" | "colorful";
export type FormatId = "a4" | "a5" | "a3" | "square";

export interface PriceListService {
  id: string;
  /** Name per display language, e.g. { fi: "Geelilakkaus", en: "Gel polish" }. */
  names: Record<string, string>;
  descriptions: Record<string, string>;
  /** Price in whole currency units as typed (e.g. 25 or 25.5); null hides it. */
  price: number | null;
  /** Shows "from" before the price (starting price). */
  priceFrom: boolean;
  durationMin: number | null;
}

export interface PriceListCategory {
  id: string;
  names: Record<string, string>;
  services: PriceListService[];
}

export interface PriceListDoc {
  version: 1;
  salonName: string;
  address: string;
  phone: string;
  /** Logo as a data URL (PNG/JPEG — SVG uploads are rasterized on upload). */
  logo: string | null;
  currency: string;
  /** 1–3 locale codes; the first is the main language. */
  languages: string[];
  categories: PriceListCategory[];
  qr: { mode: "varaaai" | "custom" | "none"; url: string; slug?: string | null };
  template: TemplateId;
  color: string;
  format: FormatId;
  showFooter: boolean;
}

export const MAX_LANGUAGES = 3;
export const MAX_SERVICES = 200;

export { RTL_LANGS, isRtl } from "@/lib/print/ops";

/** Page sizes in PDF points (1/72 inch). The square format is 540pt and is
 * exported at 2× to give exactly 1080×1080 px. */
export const FORMATS: Record<FormatId, { w: number; h: number; pngScale: number }> = {
  a5: { w: 419.53, h: 595.28, pngScale: 2.5 },
  a4: { w: 595.28, h: 841.89, pngScale: 2 },
  a3: { w: 841.89, h: 1190.55, pngScale: 1.5 },
  square: { w: 540, h: 540, pngScale: 2 },
};

export const TEMPLATE_DEFAULT_COLOR: Record<TemplateId, string> = {
  minimal: "#624f89",
  luxury: "#c9a96e",
  colorful: "#ec6a47",
};

export const COLOR_SWATCHES = [
  "#624f89", "#40325c", "#c9a96e", "#b08d57", "#ec6a47", "#d54a6c",
  "#0f766e", "#2563eb", "#111827", "#9d174d", "#4d7c0f", "#b45309",
];

export const CURRENCIES = [
  "EUR", "VND", "USD", "SEK", "NOK", "DKK", "PLN", "GBP", "CHF", "CZK", "HUF", "RON", "BGN",
  "UAH", "RUB", "TRY", "THB", "KHR", "JPY", "CNY", "KRW", "SGD", "MYR", "IDR", "PHP", "INR",
  "AED", "SAR", "ILS", "EGP", "AUD", "CAD", "BRL", "MXN", "ZAR", "NGN",
];

export function newId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function emptyDoc(locale: string): PriceListDoc {
  const lang = locale;
  return {
    version: 1,
    salonName: "",
    address: "",
    phone: "",
    logo: null,
    currency: locale === "vi" ? "VND" : "EUR",
    languages: [lang],
    categories: [],
    qr: { mode: "custom", url: "" },
    template: "minimal",
    color: TEMPLATE_DEFAULT_COLOR.minimal,
    format: "a4",
    showFooter: true,
  };
}

/** Adds the UTM tags that let a salon (and VaraaAi) count scans of a printed
 * price list. Leaves non-http(s) or unparsable links untouched. */
export function withUtm(url: string, format: FormatId, source = "price_list"): string {
  try {
    const u = new URL(url.trim());
    if (u.protocol !== "https:" && u.protocol !== "http:") return url;
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", "qr");
    u.searchParams.set("utm_campaign", format);
    return u.toString();
  } catch {
    return url;
  }
}

export function formatPrice(amount: number, currency: string, lang: string): string {
  const zeroDecimal = ["VND", "KHR", "JPY", "KRW", "IDR", "HUF"].includes(currency);
  const whole = Number.isInteger(amount);
  try {
    return new Intl.NumberFormat(lang, {
      style: "currency",
      currency,
      minimumFractionDigits: zeroDecimal || whole ? 0 : 2,
      maximumFractionDigits: zeroDecimal ? 0 : 2,
    }).format(amount);
  } catch {
    return `${amount} ${currency}`;
  }
}

/** Normalizes untrusted JSON (localStorage, a saved draft) into a valid doc. */
export function sanitizeDoc(raw: unknown, locale: string): PriceListDoc {
  const base = emptyDoc(locale);
  if (!raw || typeof raw !== "object") return base;
  const r = raw as Partial<PriceListDoc>;
  const str = (v: unknown, max = 300) => (typeof v === "string" ? v.slice(0, max) : "");
  const rec = (v: unknown, max = 300): Record<string, string> => {
    const out: Record<string, string> = {};
    if (v && typeof v === "object") for (const [k, val] of Object.entries(v)) if (typeof val === "string") out[k.slice(0, 8)] = val.slice(0, max);
    return out;
  };
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) && v >= 0 ? v : null);
  let count = 0;
  const categories = Array.isArray(r.categories)
    ? r.categories.slice(0, 60).map((c) => ({
        id: str(c?.id, 40) || newId(),
        names: rec(c?.names, 120),
        services: (Array.isArray(c?.services) ? c.services : [])
          .filter(() => ++count <= MAX_SERVICES)
          .map((s) => ({
            id: str(s?.id, 40) || newId(),
            names: rec(s?.names, 200),
            descriptions: rec(s?.descriptions, 400),
            price: num(s?.price),
            priceFrom: !!s?.priceFrom,
            durationMin: num(s?.durationMin),
          })),
      }))
    : [];
  const languages = Array.isArray(r.languages)
    ? r.languages.filter((l): l is string => typeof l === "string" && /^[a-z]{2,3}$/.test(l)).slice(0, MAX_LANGUAGES)
    : [];
  const template = (["minimal", "luxury", "colorful"] as const).includes(r.template as TemplateId) ? (r.template as TemplateId) : base.template;
  const format = (["a4", "a5", "a3", "square"] as const).includes(r.format as FormatId) ? (r.format as FormatId) : base.format;
  const qrMode = r.qr && ["varaaai", "custom", "none"].includes(r.qr.mode) ? r.qr.mode : "custom";
  return {
    version: 1,
    salonName: str(r.salonName, 120),
    address: str(r.address, 200),
    phone: str(r.phone, 60),
    logo: typeof r.logo === "string" && r.logo.startsWith("data:image/") ? r.logo : null,
    currency: typeof r.currency === "string" && /^[A-Z]{3}$/.test(r.currency) ? r.currency : base.currency,
    languages: languages.length ? languages : base.languages,
    categories,
    qr: { mode: qrMode, url: str(r.qr?.url, 500), slug: r.qr?.slug ? str(r.qr.slug, 120) : null },
    template,
    color: typeof r.color === "string" && /^#[0-9a-fA-F]{6}$/.test(r.color) ? r.color : TEMPLATE_DEFAULT_COLOR[template],
    format,
    showFooter: r.showFooter !== false,
  };
}
