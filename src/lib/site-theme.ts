import type { CSSProperties } from "react";

/** One colour palette for a salon's public website. Every value is an
 * "R G B" triplet so Tailwind's `lp-*` colours (tailwind.config.ts) can add
 * opacity, e.g. `bg-lp-accent/10`. */
interface SiteTheme {
  /** Page background. */
  bg: string;
  /** Alternating section background. */
  surface: string;
  /** Cards. */
  card: string;
  /** Headings and strong text. */
  ink: string;
  /** Body text. */
  muted: string;
  /** Hairlines and borders. */
  line: string;
  /** Buttons, links, highlights. */
  accent: string;
  /** Text on top of `accent`. */
  accentInk: string;
  /** Thin decorative lines, stars, small ornaments. */
  gold: string;
  /** Footer and call-to-action band — always dark, with light text. */
  deep: string;
  deepInk: string;
}

export const SITE_THEMES = {
  ROSE: {
    bg: "255 251 249",
    surface: "250 240 237",
    card: "255 255 255",
    ink: "46 30 34",
    muted: "112 93 97",
    line: "236 222 219",
    accent: "176 104 116",
    accentInk: "255 255 255",
    gold: "196 152 104",
    deep: "43 27 31",
    deepInk: "250 238 235",
  },
  CHAMPAGNE: {
    bg: "252 250 245",
    surface: "245 238 226",
    card: "255 255 255",
    ink: "35 31 26",
    muted: "108 99 87",
    line: "232 223 207",
    accent: "158 122 66",
    accentInk: "255 255 255",
    gold: "184 148 88",
    deep: "36 31 24",
    deepInk: "246 239 226",
  },
  NOIR: {
    bg: "16 15 14",
    surface: "25 23 21",
    card: "32 30 27",
    ink: "246 241 232",
    muted: "180 171 158",
    line: "60 55 49",
    accent: "201 169 110",
    accentInk: "22 19 15",
    gold: "201 169 110",
    deep: "9 8 7",
    deepInk: "236 228 214",
  },
  EMERALD: {
    bg: "250 250 246",
    surface: "235 242 237",
    card: "255 255 255",
    ink: "17 39 33",
    muted: "82 101 94",
    line: "218 229 222",
    accent: "24 82 67",
    accentInk: "255 255 255",
    gold: "184 150 92",
    deep: "13 36 30",
    deepInk: "230 240 234",
  },
  LAVENDER: {
    bg: "252 251 254",
    surface: "243 239 250",
    card: "255 255 255",
    ink: "33 25 48",
    muted: "100 91 116",
    line: "229 222 240",
    accent: "98 79 137",
    accentInk: "255 255 255",
    gold: "190 156 106",
    deep: "31 24 45",
    deepInk: "240 235 250",
  },
} satisfies Record<string, SiteTheme>;

export type SiteThemeKey = keyof typeof SITE_THEMES;
export const SITE_THEME_KEYS = Object.keys(SITE_THEMES) as SiteThemeKey[];

export function isSiteTheme(v: unknown): v is SiteThemeKey {
  return typeof v === "string" && v in SITE_THEMES;
}

/** CSS variables that paint the whole site in the chosen palette. */
export function siteThemeStyle(theme: string | null | undefined): CSSProperties {
  const t: SiteTheme = SITE_THEMES[isSiteTheme(theme) ? theme : "ROSE"];
  return {
    "--lp-bg": t.bg,
    "--lp-surface": t.surface,
    "--lp-card": t.card,
    "--lp-ink": t.ink,
    "--lp-muted": t.muted,
    "--lp-line": t.line,
    "--lp-accent": t.accent,
    "--lp-accent-ink": t.accentInk,
    "--lp-gold": t.gold,
    "--lp-deep": t.deep,
    "--lp-deep-ink": t.deepInk,
  } as CSSProperties;
}

/** "rgb(…)" for one palette colour — used by the dashboard's theme swatches. */
export function themeColor(theme: SiteThemeKey, key: keyof SiteTheme) {
  return `rgb(${SITE_THEMES[theme][key]})`;
}
