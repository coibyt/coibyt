import Image from "next/image";
import { siteStrings } from "@/lib/site-content";

export type SiteNavKey = "home" | "services" | "booking" | "about" | "contact";

export function siteNavLinks(locale: string, slug: string) {
  const s = siteStrings(locale);
  // These are all /site/* pages themselves — they live outside the
  // [locale] segment and take their locale from `?locale=`, never from a
  // URL path prefix, so every internal link carries it forward explicitly
  // (same reasoning as /embed) — otherwise a customer's language choice
  // would reset to the salon's default the moment they clicked another tab.
  return [
    { key: "home" as const, label: s.navHome, href: `/site/${slug}?locale=${locale}` },
    { key: "services" as const, label: s.navServices, href: `/site/${slug}/services?locale=${locale}` },
    { key: "booking" as const, label: s.navBooking, href: `/site/${slug}/booking?locale=${locale}` },
    { key: "about" as const, label: s.navAbout, href: `/site/${slug}/about?locale=${locale}` },
    { key: "contact" as const, label: s.navContact, href: `/site/${slug}/contact?locale=${locale}` },
  ];
}

export function SiteLogo({ name, logoUrl, size = 40 }: { name: string; logoUrl: string | null; size?: number }) {
  return logoUrl ? (
    <span
      className="relative shrink-0 overflow-hidden rounded-full bg-lp-card ring-1 ring-lp-gold/40 ring-offset-2 ring-offset-lp-bg"
      style={{ width: size, height: size }}
    >
      <Image src={logoUrl} alt="" fill className="object-cover" />
    </span>
  ) : (
    <span
      className="flex shrink-0 items-center justify-center rounded-full bg-lp-accent font-serif font-semibold text-lp-accent-ink"
      style={{ width: size, height: size, fontSize: size * 0.42 }}
    >
      {name.charAt(0)}
    </span>
  );
}
