import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Music2,
  Phone,
  Youtube,
  Globe,
} from "lucide-react";
import { siteStrings, sitePrefix } from "@/lib/site-content";

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

export function SiteFooter({
  locale,
  businessName,
  contact,
  hours,
  branches,
}: {
  locale: string;
  businessName: string;
  contact: SiteContact;
  hours: { weekday: number; openMinute: number; closeMinute: number }[];
  branches: SiteBranch[];
}) {
  const s = siteStrings(locale);
  const prefix = sitePrefix(locale);
  const hoursByDay = new Map(hours.map((h) => [h.weekday, h]));

  const socialLinks = [
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

  return (
    <footer className="border-t border-ink-100 bg-mist-50">
      <div className="container space-y-10 py-14">
        {socialLinks.length > 0 && (
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold text-ink-900">{s.followUs}</p>
            <div className="flex justify-center gap-3">
              {socialLinks.map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 bg-white text-ink-700 transition-colors hover:border-primary-500 hover:text-primary-600"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        )}

        {hours.length > 0 && (
          <div className="mx-auto max-w-xs">
            <p className="mb-3 text-center text-sm font-semibold text-ink-900">
              {s.openingHoursTitle}
            </p>
            <WeekdayHoursList locale={locale} hoursByDay={hoursByDay} closedLabel={s.closed} />
          </div>
        )}

        <div className={`grid grid-cols-1 gap-6 ${branches.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : "mx-auto max-w-sm"}`}>
          {branches.map((b) => (
            <div key={b.slug} className="rounded-2xl border border-ink-100 bg-white p-5 text-sm">
              <p className="mb-1 font-serif text-base font-semibold text-ink-900">{b.name}</p>
              {(b.addressLine || b.city) && (
                <p className="flex items-start gap-1.5 text-ink-700">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-ink-400" />
                  <span>{[b.addressLine, b.city].filter(Boolean).join(", ")}</span>
                </p>
              )}
              {b.phone && (
                <a href={`tel:${b.phone}`} className="mt-1 flex items-center gap-1.5 text-ink-700 hover:text-primary-600">
                  <Phone className="h-3.5 w-3.5 text-ink-400" /> {b.phone}
                </a>
              )}
              {b.email && (
                <a href={`mailto:${b.email}`} className="mt-1 flex items-center gap-1.5 text-ink-700 hover:text-primary-600">
                  <Mail className="h-3.5 w-3.5 text-ink-400" /> {b.email}
                </a>
              )}
              {b.googleMapsUrl && (
                <a
                  href={b.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-xs font-medium text-primary-600 hover:underline"
                >
                  {locale === "vi" ? "Xem bản đồ" : "View on map"}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-2 border-t border-ink-100 pt-6 text-center text-xs text-ink-400">
          <a href={`${prefix}/terms`} className="hover:text-ink-700 hover:underline">
            {locale === "vi" ? "Điều khoản sử dụng" : "Terms of Use"}
          </a>
          <p>
            © {new Date().getFullYear()} {businessName}
          </p>
        </div>
      </div>
    </footer>
  );
}

const WEEKDAY_ORDER = [1, 2, 3, 4, 5, 6, 0]; // Monday-first, matching the salon's own hours editor
const WEEKDAY_SHORT: Record<string, string[]> = {
  vi: ["T2", "T3", "T4", "T5", "T6", "T7", "CN"],
  en: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  fi: ["Ma", "Ti", "Ke", "To", "Pe", "La", "Su"],
  pl: ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Ndz"],
  de: ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
  km: ["ច", "អ", "ព", "ព្រ", "សុ", "ស", "អា"],
  th: ["จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
};

export function WeekdayHoursList({
  locale,
  hoursByDay,
  closedLabel,
}: {
  locale: string;
  hoursByDay: Map<number, { openMinute: number; closeMinute: number }>;
  closedLabel: string;
}) {
  const names = WEEKDAY_SHORT[locale] ?? WEEKDAY_SHORT.en;
  return (
    <ul className="space-y-1 text-sm">
      {WEEKDAY_ORDER.map((weekday, i) => {
        const h = hoursByDay.get(weekday);
        return (
          <li key={weekday} className="flex justify-between text-ink-700">
            <span>{names[i]}</span>
            <span className={h ? "" : "text-ink-400"}>
              {h ? `${minutesToTime(h.openMinute)} – ${minutesToTime(h.closeMinute)}` : closedLabel}
            </span>
          </li>
        );
      })}
    </ul>
  );
}
