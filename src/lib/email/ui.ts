import { chromeStrings } from "@/lib/email/strings";

/** Building blocks for every email VaraaAi sends. Email clients ignore most
 * modern CSS (Outlook renders with Word, Gmail strips <style> in some
 * views), so everything here is table-based with inline styles; the small
 * <style> block only adds mobile padding and stacking where it is honoured.
 * All values passed in as plain text are escaped by the caller with esc(). */

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

export const C = {
  page: "#f4f1f8",
  card: "#ffffff",
  border: "#ebe5f3",
  hair: "#efeaf5",
  soft: "#faf8fd",
  ink: "#231d2e",
  text: "#3d3649",
  muted: "#756d84",
  primary: "#624f89",
  primaryDeep: "#40325c",
  night: "#1f182d",
  peach: "#ffd9c9",
  coral: "#ec6a47",
  gold: "#c9a96e",
  teal: "#03878f",
  berry: "#a31f3f",
};

const SANS = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,'Noto Sans',sans-serif";
const SERIF = "'Playfair Display',Georgia,'Times New Roman',serif";

/** Thai and Khmer have no glyphs in the serif stack, so they keep the sans. */
export function headingFont(locale: string) {
  return locale === "th" || locale === "km" ? SANS : SERIF;
}

export function esc(s: string | null | undefined) {
  return (s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

/** Business logos are stored as site-relative URLs; email needs absolute. */
export function absoluteUrl(url: string | null | undefined) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`;
}

export type HeroTone = "brand" | "success" | "calm" | "alert" | "gold";

const HERO: Record<HeroTone, { from: string; to: string; eyebrow: string; badgeBg: string; badgeFg: string }> = {
  brand: { from: "#1f182d", to: "#624f89", eyebrow: "#ffd9c9", badgeBg: "#ffd9c9", badgeFg: "#40325c" },
  success: { from: "#1f182d", to: "#624f89", eyebrow: "#ffd9c9", badgeBg: "#ffffff", badgeFg: "#624f89" },
  calm: { from: "#013a3e", to: "#03878f", eyebrow: "#cce6e6", badgeBg: "#ffffff", badgeFg: "#02646b" },
  alert: { from: "#3a1622", to: "#a31f3f", eyebrow: "#fddcce", badgeBg: "#ffffff", badgeFg: "#a31f3f" },
  gold: { from: "#1f182d", to: "#40325c", eyebrow: "#e8d3a6", badgeBg: "#c9a96e", badgeFg: "#1f182d" },
};

export interface EmailBrand {
  /** Salon name shown at the top; omit for VaraaAi's own emails. */
  name: string;
  logoUrl?: string | null;
  /** Small line under the name, e.g. the city. */
  subline?: string | null;
}

function brandHeader(brand: EmailBrand | null, locale: string) {
  const font = headingFont(locale);
  if (!brand) {
    return `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center"><tr>
        <td style="padding-right:10px" valign="middle"><img src="${SITE_URL}/icons/icon-192.png" width="36" height="36" alt="" style="display:block;border:0;border-radius:10px" /></td>
        <td valign="middle" style="font-family:${SERIF};font-size:20px;font-weight:700;color:${C.night};letter-spacing:.2px">VaraaAi<span style="color:${C.primary}">.Com</span></td>
      </tr></table>`;
  }
  const logo = absoluteUrl(brand.logoUrl);
  const initial = esc((brand.name.trim()[0] ?? "V").toUpperCase());
  const mark = logo
    ? `<img src="${esc(logo)}" width="60" height="60" alt="${esc(brand.name)}" style="display:block;border:0;width:60px;height:60px;border-radius:50%;object-fit:cover;background:#fff" />`
    : `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="60" height="60" align="center" valign="middle" bgcolor="${C.primary}" style="width:60px;height:60px;border-radius:50%;background:${C.primary};background-image:linear-gradient(135deg,${C.primaryDeep},${C.primary});color:#fff;font-family:${SERIF};font-size:26px;font-weight:700">${initial}</td></tr></table>`;
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center">
      <tr><td align="center" style="padding-bottom:10px">${mark}</td></tr>
      <tr><td align="center" style="font-family:${font};font-size:21px;font-weight:700;color:${C.night};line-height:1.3">${esc(brand.name)}</td></tr>
      ${brand.subline ? `<tr><td align="center" style="font-family:${SANS};font-size:12px;color:${C.muted};letter-spacing:1.5px;text-transform:uppercase;padding-top:4px">${esc(brand.subline)}</td></tr>` : ""}
    </table>`;
}

export interface LayoutParams {
  locale: string;
  /** Inbox preview text shown after the subject. */
  preheader: string;
  brand: EmailBrand | null;
  /** Null for mail that is all the sender's own content (marketing). */
  hero: { eyebrow?: string; title: string; intro?: string; tone?: HeroTone; badge?: string } | null;
  /** Document title when there is no hero. */
  title?: string;
  body: string;
  /** Extra footer line, e.g. salon address. Already-escaped HTML. */
  footerExtra?: string;
  /** Overrides the "automated email" line (marketing mail has its own). */
  footerNote?: string;
}

export function emailLayout(p: LayoutParams) {
  const s = chromeStrings(p.locale);
  const tone = HERO[p.hero?.tone ?? "brand"];
  const font = headingFont(p.locale);
  const sentLine = p.brand ? s.sentVia(esc(p.brand.name)) : s.sentByVaraa;
  const year = new Date().getFullYear();
  const badge = p.hero?.badge
    ? `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px"><tr><td width="46" height="46" align="center" valign="middle" bgcolor="${tone.badgeBg}" style="width:46px;height:46px;border-radius:50%;background:${tone.badgeBg};color:${tone.badgeFg};font-family:${SANS};font-size:22px;font-weight:700;line-height:46px">${p.hero.badge}</td></tr></table>`
    : "";

  return `<!DOCTYPE html>
<html lang="${esc(p.locale)}" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light" />
<meta name="supported-color-schemes" content="light" />
<title>${esc(p.hero?.title.replace(/<[^>]+>/g, "") ?? p.title ?? "VaraaAi.Com")}</title>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&amp;display=swap" rel="stylesheet" />
<style>
  body{margin:0!important;padding:0!important;width:100%!important;-webkit-text-size-adjust:100%}
  a{color:${C.primary}}
  @media only screen and (max-width:620px){
    .px{padding-left:22px!important;padding-right:22px!important}
    .hero{padding:30px 22px 28px!important}
    .h1{font-size:25px!important}
    .stack{display:block!important;width:100%!important;padding:0 0 10px 0!important}
    .stack a{display:block!important}
    .tile-gap{padding-left:14px!important}
  }
</style>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-font-smoothing:antialiased">
<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all">${esc(p.preheader)}${"&#847;&zwnj;&nbsp;".repeat(60)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${C.page}" style="background:${C.page}">
<tr><td align="center" style="padding:32px 12px 40px">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px">
    <tr><td align="center" style="padding:4px 0 24px">${brandHeader(p.brand, p.locale)}</td></tr>
    <tr><td style="background:${C.card};border:1px solid ${C.border};border-radius:24px;overflow:hidden" bgcolor="${C.card}">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${
          p.hero
            ? `<tr><td class="hero" bgcolor="${tone.to}" style="padding:40px 44px 36px;background:${tone.to};background-image:linear-gradient(135deg,${tone.from} 0%,${tone.to} 100%);border-radius:24px 24px 0 0">
          ${badge}
          ${p.hero.eyebrow ? `<div style="font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:${tone.eyebrow};margin-bottom:10px">${p.hero.eyebrow}</div>` : ""}
          <div class="h1" style="font-family:${font};font-size:30px;line-height:1.22;font-weight:700;color:#ffffff">${p.hero.title}</div>
          ${p.hero.intro ? `<div style="font-family:${SANS};font-size:15px;line-height:1.65;color:rgba(255,255,255,.84);margin-top:12px">${p.hero.intro}</div>` : ""}
        </td></tr>`
            : ""
        }
        <tr><td class="px" style="padding:${p.hero ? "34px" : "40px"} 44px 38px;font-family:${SANS};font-size:15px;line-height:1.65;color:${C.text}">
          ${p.body}
        </td></tr>
      </table>
    </td></tr>
    <tr><td align="center" class="px" style="padding:28px 24px 0;font-family:${SANS};font-size:12px;line-height:1.7;color:${C.muted}">
      ${p.footerExtra ? `<div style="margin-bottom:10px;color:${C.text}">${p.footerExtra}</div>` : ""}
      <div>${sentLine} ${p.footerNote ?? s.automated}</div>
      <div style="margin-top:14px">
        <a href="${SITE_URL}" style="color:${C.primary};text-decoration:none;font-weight:600">VaraaAi.Com</a>
        <span style="color:#c9c2d4">&nbsp;·&nbsp;</span>${esc(s.tagline)}
      </div>
      <div style="margin-top:6px;color:#a39bb0">© ${year} VaraaAi.Com</div>
    </td></tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
}

/* ---------- body components ---------- */

export function greeting(hi: string, name: string) {
  return `<p style="margin:0 0 14px;font-size:16px;color:${C.ink}">${esc(hi)} <strong>${esc(name)}</strong>,</p>`;
}

export function para(html: string, opts: { muted?: boolean; small?: boolean; center?: boolean; mt?: number } = {}) {
  return `<p style="margin:${opts.mt ?? 0}px 0 16px;font-size:${opts.small ? 13 : 15}px;line-height:1.7;color:${opts.muted ? C.muted : C.text};${opts.center ? "text-align:center;" : ""}">${html}</p>`;
}

export function sectionTitle(text: string, mt = 28) {
  return `<div style="margin:${mt}px 0 12px;font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${C.muted}">${text}</div>`;
}

type ButtonVariant = "primary" | "dark" | "light" | "gold" | "alert";
const BTN: Record<ButtonVariant, { bg: string; fg: string; border: string }> = {
  primary: { bg: C.primary, fg: "#ffffff", border: C.primary },
  dark: { bg: C.night, fg: "#ffffff", border: C.night },
  light: { bg: "#ffffff", fg: C.primaryDeep, border: "#dad0ef" },
  gold: { bg: C.gold, fg: C.night, border: C.gold },
  alert: { bg: C.berry, fg: "#ffffff", border: C.berry },
};

function buttonCell(href: string, label: string, variant: ButtonVariant, size: "lg" | "sm") {
  const b = BTN[variant];
  const pad = size === "lg" ? "15px 34px" : "11px 20px";
  const fs = size === "lg" ? 15 : 13;
  return `<td align="center" bgcolor="${b.bg}" style="border-radius:999px;background:${b.bg};border:1px solid ${b.border}"><a href="${esc(href)}" target="_blank" style="display:inline-block;padding:${pad};font-family:${SANS};font-size:${fs}px;font-weight:700;line-height:1.2;color:${b.fg};text-decoration:none;border-radius:999px;white-space:nowrap">${label}</a></td>`;
}

/** One big call-to-action, centred, with the raw link underneath for
 * clients that block buttons. */
export function button(href: string, label: string, opts: { variant?: ButtonVariant; align?: "center" | "left"; fallback?: string } = {}) {
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${opts.align ?? "center"}" style="margin:26px ${opts.align === "left" ? "0" : "auto"} 8px"><tr>${buttonCell(href, label, opts.variant ?? "primary", "lg")}</tr></table>
    <div style="clear:both"></div>
    ${opts.fallback ? `<p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:${C.muted};text-align:center">${esc(opts.fallback)}<br /><a href="${esc(href)}" style="color:${C.primary};word-break:break-all">${esc(href)}</a></p>` : ""}`;
}

/** Several smaller buttons in a row; they stack on phones. */
export function buttonRow(items: { href: string; label: string; variant?: ButtonVariant }[], align: "left" | "center" = "left") {
  const list = items.filter((i) => i.href);
  if (!list.length) return "";
  return `
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="${align}" style="margin:4px ${align === "center" ? "auto" : "0"} 0"><tr>
      ${list
        .map(
          (i, idx) =>
            `<td class="stack" style="padding-right:${idx === list.length - 1 ? 0 : 10}px"><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%"><tr>${buttonCell(i.href, i.label, i.variant ?? "light", "sm")}</tr></table></td>`
        )
        .join("")}
    </tr></table>
    <div style="clear:both"></div>`;
}

export interface Row {
  label: string;
  /** Already-escaped HTML. */
  value: string;
  strong?: boolean;
}

export function rows(list: (Row | null | false | undefined)[]) {
  const items = list.filter(Boolean) as Row[];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items
    .map(
      (r, i) => `<tr>
        <td valign="top" style="padding:11px 12px 11px 0;${i < items.length - 1 ? `border-bottom:1px solid ${C.hair};` : ""}font-size:13px;color:${C.muted};width:38%">${r.label}</td>
        <td valign="top" align="right" style="padding:11px 0;${i < items.length - 1 ? `border-bottom:1px solid ${C.hair};` : ""}font-size:14px;color:${C.ink};font-weight:${r.strong ? 700 : 600};text-align:right">${r.value}</td>
      </tr>`
    )
    .join("")}</table>`;
}

/** A soft panel; `inner` is already-escaped HTML. */
export function panel(inner: string, opts: { pad?: string; bg?: string; border?: string; mt?: number } = {}) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:${opts.mt ?? 0}px;border-collapse:separate"><tr><td bgcolor="${opts.bg ?? C.soft}" style="background:${opts.bg ?? C.soft};border:1px solid ${opts.border ?? C.border};border-radius:18px;padding:${opts.pad ?? "20px 22px"}">${inner}</td></tr></table>`;
}

export interface DateParts {
  weekday: string;
  weekdayShort: string;
  day: string;
  month: string;
  time: string;
  endTime: string | null;
  full: string;
}

/** The calendar tile + time headline at the top of every appointment card. */
export function appointmentHeader(d: DateParts, eyebrow: string, accent = C.primary) {
  return `
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
      <td width="84" valign="top">
        <table role="presentation" width="84" cellpadding="0" cellspacing="0" border="0" style="border-collapse:separate">
          <tr><td align="center" bgcolor="${accent}" style="background:${accent};border-radius:16px 16px 0 0;padding:7px 4px 5px;font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff">${esc(d.month)}</td></tr>
          <tr><td align="center" bgcolor="#ffffff" style="background:#ffffff;border:1px solid ${C.border};border-top:0;border-radius:0 0 16px 16px;padding:6px 4px 9px">
            <div style="font-family:${SERIF};font-size:32px;line-height:1.05;font-weight:700;color:${C.night}">${esc(d.day)}</div>
            <div style="font-size:11px;color:${C.muted};margin-top:3px">${esc(d.weekdayShort)}</div>
          </td></tr>
        </table>
      </td>
      <td class="tile-gap" valign="middle" style="padding-left:20px">
        <div style="font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:${accent}">${eyebrow}</div>
        <div style="font-size:24px;line-height:1.25;font-weight:700;color:${C.night};margin-top:4px">${esc(d.time)}${d.endTime ? `<span style="color:${C.muted};font-weight:400"> – ${esc(d.endTime)}</span>` : ""}</div>
        <div style="font-size:14px;color:${C.muted};margin-top:2px">${esc(d.full)}</div>
      </td>
    </tr></table>`;
}

export function hairline(my = 18) {
  return `<div style="height:1px;line-height:1px;font-size:1px;background:${C.hair};margin:${my}px 0">&nbsp;</div>`;
}

export type NoticeTone = "info" | "warm" | "success" | "alert" | "gold";
const NOTICE: Record<NoticeTone, { bg: string; bar: string; title: string }> = {
  info: { bg: "#f4f1fa", bar: C.primary, title: C.primaryDeep },
  warm: { bg: "#fff8f5", bar: C.coral, title: "#b2442a" },
  success: { bg: "#e6f2f2", bar: C.teal, title: "#02646b" },
  alert: { bg: "#fbeaee", bar: C.berry, title: C.berry },
  gold: { bg: "#fbf6ec", bar: C.gold, title: "#7a5f2c" },
};

/** Titled side-barred note; `html` is already-escaped. */
export function notice(title: string | null, html: string, tone: NoticeTone = "info", mt = 18) {
  const t = NOTICE[tone];
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:${mt}px;border-collapse:separate"><tr>
    <td width="4" bgcolor="${t.bar}" style="background:${t.bar};border-radius:4px 0 0 4px;width:4px">&nbsp;</td>
    <td bgcolor="${t.bg}" style="background:${t.bg};border-radius:0 14px 14px 0;padding:16px 20px">
      ${title ? `<div style="font-size:14px;font-weight:700;color:${t.title};margin-bottom:4px">${title}</div>` : ""}
      <div style="font-size:13.5px;line-height:1.65;color:${C.text}">${html}</div>
    </td></tr></table>`;
}

/** A dashed "ticket" with a big code (gift card, loyalty card...). */
export function codeTicket(label: string, code: string, opts: { qrUrl?: string | null; qrAlt?: string } = {}) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px;border-collapse:separate"><tr>
    <td align="center" bgcolor="${C.soft}" style="background:${C.soft};border:2px dashed #dad0ef;border-radius:20px;padding:24px 18px">
      ${opts.qrUrl ? `<img src="${esc(opts.qrUrl)}" width="200" height="200" alt="${esc(opts.qrAlt ?? "QR")}" style="display:block;margin:0 auto 16px;border:0;width:200px;height:200px;background:#fff;border-radius:12px;padding:8px" />` : ""}
      <div style="font-size:11px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:${C.muted}">${label}</div>
      <div style="font-family:'SFMono-Regular',Menlo,Consolas,'Courier New',monospace;font-size:26px;font-weight:700;letter-spacing:5px;color:${C.primaryDeep};margin-top:6px;word-break:break-all">${esc(code)}</div>
    </td></tr></table>`;
}

export function stars(rating: number, size = 30) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return `<div style="text-align:center;font-size:${size}px;letter-spacing:6px;line-height:1;margin:6px 0 4px"><span style="color:#f5b041">${"★".repeat(full)}</span><span style="color:#e3dcea">${"★".repeat(5 - full)}</span></div>`;
}

export function quote(html: string) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:6px 0 18px;border-collapse:separate"><tr><td bgcolor="${C.soft}" style="background:${C.soft};border:1px solid ${C.border};border-radius:16px;padding:18px 20px;font-size:14.5px;line-height:1.7;color:${C.text};font-style:italic">“${html}”</td></tr></table>`;
}

/** Numbered steps (onboarding emails). Items are already-escaped HTML. */
export function steps(items: { title: string; body: string }[]) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${items
    .map(
      (it, i) => `<tr>
        <td width="40" valign="top" style="padding:10px 0"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="30" height="30" align="center" valign="middle" bgcolor="#f4f1fa" style="width:30px;height:30px;border-radius:50%;background:#f4f1fa;color:${C.primary};font-size:13px;font-weight:700;line-height:30px">${i + 1}</td></tr></table></td>
        <td valign="top" style="padding:10px 0 10px 6px"><div style="font-size:14.5px;font-weight:700;color:${C.ink}">${it.title}</div><div style="font-size:13.5px;line-height:1.6;color:${C.muted};margin-top:2px">${it.body}</div></td>
      </tr>`
    )
    .join("")}</table>`;
}
