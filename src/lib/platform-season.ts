import { prisma } from "@/lib/prisma";
import { resolveTheme, themeText, type SeasonalTheme } from "@/lib/seasonal-themes";
import { EMAIL_SEASON_MARK } from "@/lib/email/ui";

/** The admin's holiday look for the whole website (admin › Giao diện mùa
 * lễ): a theme ("auto", a theme id from src/lib/seasonal-themes.ts, or none)
 * and where it shows — public pages, the owner/staff dashboards, emails.
 * Kept as platform settings, read through a short cache. */

export type SiteThemeTarget = "site" | "dashboard" | "emails";
export interface SiteThemeSetting {
  theme: string | null;
  site: boolean;
  dashboard: boolean;
  emails: boolean;
}

const KEY = "siteTheme";
const DEFAULT: SiteThemeSetting = { theme: null, site: true, dashboard: true, emails: true };
/** The platform's date for "auto" — wide holiday windows make the zone matter little. */
const PLATFORM_TZ = "Europe/Helsinki";

let cache: { at: number; value: SiteThemeSetting } | null = null;

export async function getSiteThemeSetting(): Promise<SiteThemeSetting> {
  if (cache && Date.now() - cache.at < 60_000) return cache.value;
  let value = DEFAULT;
  try {
    const row = await prisma.platformSetting.findUnique({ where: { key: KEY } });
    if (row) value = { ...DEFAULT, ...(JSON.parse(row.value) as Partial<SiteThemeSetting>) };
  } catch {
    // A missing or broken setting just means no theme.
  }
  cache = { at: Date.now(), value };
  return value;
}

export async function setSiteThemeSetting(value: SiteThemeSetting) {
  await prisma.platformSetting.upsert({ where: { key: KEY }, update: { value: JSON.stringify(value) }, create: { key: KEY, value: JSON.stringify(value) } });
  cache = { at: Date.now(), value };
}

/** The theme in force for one place, or null. */
export async function siteThemeFor(target: SiteThemeTarget): Promise<SeasonalTheme | null> {
  const s = await getSiteThemeSetting();
  if (!s.theme || !s[target]) return null;
  return resolveTheme(s.theme, PLATFORM_TZ);
}

/** The holiday band at the top of an email (table-based, so mail apps draw it). */
export function seasonalEmailBand(theme: SeasonalTheme, locale: string) {
  const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
  const ornaments = theme.emojis.slice(0, 4).join("&nbsp;&nbsp;");
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 14px;border-collapse:separate"><tr>
    <td align="center" bgcolor="${theme.to}" style="background:${theme.to};background-image:linear-gradient(120deg,${theme.from},${theme.to});border-radius:18px;padding:14px 18px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif">
      <div style="font-size:20px;line-height:1.2">${ornaments}</div>
      <div style="margin-top:6px;font-size:10px;font-weight:700;letter-spacing:2.4px;text-transform:uppercase;color:${theme.accent}">${esc(themeText(theme.name, locale))}</div>
      <div style="margin-top:2px;font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:700;color:#ffffff">${esc(themeText(theme.greeting, locale))}</div>
    </td></tr></table>`;
}

/** An email's html with the holiday band in place (when the admin shows the
 * theme in emails) or the placeholder removed. */
export async function withSeasonBand(html: string) {
  if (!html.includes(EMAIL_SEASON_MARK)) return html;
  const theme = await siteThemeFor("emails").catch(() => null);
  const locale = html.match(/<html lang="([a-z-]+)"/i)?.[1] ?? "en";
  return html.replace(EMAIL_SEASON_MARK, theme ? seasonalEmailBand(theme, locale) : "");
}
