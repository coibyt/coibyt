import { routing } from "@/i18n/routing";

/** VaraaAi's link-preview image (1200x630) in the page's language — what
 * Facebook, Messenger, Zalo, Telegram, WhatsApp and X show when a link is
 * shared. Drawn by scripts/og/build-og.mjs into public/og/. */
export function ogImage(locale: string) {
  const lang = (routing.locales as readonly string[]).includes(locale) ? locale : "en";
  return { url: `/og/varaaai-${lang}.jpg`, width: 1200, height: 630, alt: "VaraaAi" };
}
