import { Facebook, Globe, Instagram, Mail, MapPin, MessageCircle, Music2, Navigation, Phone, Youtube } from "lucide-react";
import { siteStrings, sitePrefix } from "@/lib/site-content";
import { siteNavLinks, SiteLogo } from "@/components/site-brand";

export interface SiteBranch {
  slug: string;
  name: string;
  addressLine: string | null;
  city: string | null;
  phone: string | null;
  email: string | null;
  googleMapsUrl: string | null;
}

export interface SiteContact {
  email: string | null;
  website: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  youtubeUrl: string | null;
  whatsapp: string | null;
}

export function minutesToTime(min: number) {
  const h = Math.floor(min / 60).toString().padStart(2, "0");
  const m = (min % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export function socialLinks(contact: SiteContact) {
  return [
    contact.facebookUrl && { href: contact.facebookUrl, Icon: Facebook, label: "Facebook" },
    contact.instagramUrl && { href: contact.instagramUrl, Icon: Instagram, label: "Instagram" },
    contact.tiktokUrl && { href: contact.tiktokUrl, Icon: Music2, label: "TikTok" },
    contact.youtubeUrl && { href: contact.youtubeUrl, Icon: Youtube, label: "YouTube" },
    contact.whatsapp && {
      href: `https://wa.me/${contact.whatsapp.replace(/[^0-9]/g, "")}`,
      Icon: MessageCircle,
      label: "WhatsApp",
    },
    contact.website && { href: contact.website, Icon: Globe, label: "Website" },
  ].filter((x): x is { href: string; Icon: typeof Facebook; label: string } => !!x);
}

export function SiteFooter({
  locale,
  slug,
  businessName,
  logoUrl,
  description,
  contact,
  phone,
  address,
  directionsHref,
  hours,
  todayWeekday,
  branches,
}: {
  locale: string;
  slug: string;
  businessName: string;
  logoUrl: string | null;
  description: string | null;
  contact: SiteContact;
  phone: string | null;
  address: string | null;
  directionsHref: string | null;
  hours: { weekday: number; openMinute: number; closeMinute: number }[];
  todayWeekday: number | null;
  branches: SiteBranch[];
}) {
  const s = siteStrings(locale);
  const prefix = sitePrefix(locale);
  const hoursByDay = new Map(hours.map((h) => [h.weekday, h]));
  const socials = socialLinks(contact);
  const heading = "mb-5 text-xs font-semibold uppercase tracking-[0.22em] text-lp-gold";

  return (
    <footer className="relative overflow-hidden bg-lp-deep text-lp-deep-ink/75">
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-lp-accent/20 blur-3xl" />
      <div className="container relative py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1fr_1.1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <SiteLogo name={businessName} logoUrl={logoUrl} size={48} />
              <p className="font-serif text-2xl font-semibold text-lp-deep-ink">{businessName}</p>
            </div>
            {description && <p className="line-clamp-4 max-w-sm text-sm leading-relaxed">{description}</p>}
            {socials.length > 0 && (
              <div className="flex flex-wrap gap-2.5">
                {socials.map(({ href, Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-lp-deep-ink/15 text-lp-deep-ink/80 transition-all hover:-translate-y-0.5 hover:border-lp-gold hover:bg-lp-gold hover:text-lp-deep"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className={heading}>{s.quickLinks}</p>
            <ul className="space-y-3 text-sm">
              {siteNavLinks(locale, slug).map((l) => (
                <li key={l.key}>
                  <a href={l.href} className="transition-colors hover:text-lp-deep-ink">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {hours.length > 0 && (
            <div>
              <p className={heading}>{s.openingHoursTitle}</p>
              <WeekdayHoursList
                locale={locale}
                hoursByDay={hoursByDay}
                closedLabel={s.closed}
                todayWeekday={todayWeekday}
                tone="dark"
              />
            </div>
          )}

          <div>
            <p className={heading}>{s.navContact}</p>
            <ul className="space-y-3.5 text-sm">
              {address && (
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-lp-gold" />
                  <span>{address}</span>
                </li>
              )}
              {phone && (
                <li>
                  <a href={`tel:${phone}`} className="flex items-center gap-3 transition-colors hover:text-lp-deep-ink">
                    <Phone className="h-4 w-4 shrink-0 text-lp-gold" />
                    {phone}
                  </a>
                </li>
              )}
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className="flex items-center gap-3 break-all transition-colors hover:text-lp-deep-ink">
                    <Mail className="h-4 w-4 shrink-0 text-lp-gold" />
                    {contact.email}
                  </a>
                </li>
              )}
              {directionsHref && (
                <li>
                  <a
                    href={directionsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-lp-deep-ink/20 px-4 py-2 text-xs font-semibold text-lp-deep-ink transition-colors hover:border-lp-gold hover:text-lp-gold"
                  >
                    <Navigation className="h-3.5 w-3.5" />
                    {s.getDirections}
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        {branches.length > 1 && (
          <div className="mt-14 grid grid-cols-1 gap-4 border-t border-lp-deep-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-3">
            {branches.map((b) => (
              <a
                key={b.slug}
                href={`/site/${b.slug}?locale=${locale}`}
                className={`rounded-2xl border p-5 text-sm transition-colors ${
                  b.slug === slug ? "border-lp-gold/60 bg-lp-deep-ink/[0.06]" : "border-lp-deep-ink/10 hover:border-lp-deep-ink/30"
                }`}
              >
                <p className="mb-1.5 font-serif text-lg text-lp-deep-ink">{b.name}</p>
                {(b.addressLine || b.city) && (
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-lp-gold" />
                    <span>{[b.addressLine, b.city].filter(Boolean).join(", ")}</span>
                  </p>
                )}
                {b.phone && (
                  <p className="mt-1 flex items-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-lp-gold" /> {b.phone}
                  </p>
                )}
              </a>
            ))}
          </div>
        )}

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-lp-deep-ink/10 pt-8 text-xs text-lp-deep-ink/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {businessName}
          </p>
          <div className="flex items-center gap-5">
            <a href={`${prefix}/terms`} className="hover:text-lp-deep-ink">
              {locale === "vi" ? "Điều khoản sử dụng" : "Terms of Use"}
            </a>
            <a href={`https://varaaai.com${prefix}`} target="_blank" rel="noopener" className="hover:text-lp-deep-ink">
              {s.poweredBy} <span className="font-semibold text-lp-deep-ink/70">VaraaAi</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday-first, matching the salon's own hours editor
const WEEKDAY_SHORT: Record<string, string[]> = {
  vi: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
  en: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  fi: ["Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai", "Sunnuntai"],
  pl: ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
  de: ["Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
  km: ["ច័ន្ទ", "អង្គារ", "ពុធ", "ព្រហស្បតិ៍", "សុក្រ", "សៅរ៍", "អាទិត្យ"],
  th: ["จันทร์", "อังคาร", "พุธ", "พฤหัสบดี", "ศุกร์", "เสาร์", "อาทิตย์"],
};

export function WeekdayHoursList({
  locale,
  hoursByDay,
  closedLabel,
  todayWeekday = null,
  tone = "light",
}: {
  locale: string;
  hoursByDay: Map<number, { openMinute: number; closeMinute: number }>;
  closedLabel: string;
  todayWeekday?: number | null;
  /** "dark" for the footer, "light" for cards on the page. */
  tone?: "light" | "dark";
}) {
  const names = WEEKDAY_SHORT[locale] ?? WEEKDAY_SHORT.en;
  return (
    <ul className="space-y-1 text-sm">
      {WEEKDAY_ORDER.map((weekday, i) => {
        const h = hoursByDay.get(weekday);
        const today = weekday === todayWeekday;
        const todayCls =
          tone === "dark" ? "bg-lp-deep-ink/[0.08] font-semibold text-lp-deep-ink" : "bg-lp-accent/10 font-semibold text-lp-ink";
        return (
          <li
            key={weekday}
            className={`-mx-3 flex justify-between gap-4 rounded-lg px-3 py-1.5 ${today ? todayCls : ""}`}
          >
            <span className="flex items-center gap-2">
              {today && <span className="h-1.5 w-1.5 rounded-full bg-lp-gold" />}
              {names[i]}
            </span>
            <span className={h ? "tabular-nums" : "opacity-50"}>
              {h ? `${minutesToTime(h.openMinute)} – ${minutesToTime(h.closeMinute)}` : closedLabel}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
