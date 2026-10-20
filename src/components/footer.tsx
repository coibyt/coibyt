import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { priceListNavLabel } from "@/lib/price-list/i18n/nav-label";
import { posterNavLabel } from "@/lib/qr-poster/i18n/nav-label";
import { supportCenterStrings } from "@/lib/support-ai/strings";
import { spotlightStrings } from "@/lib/business-landing/spotlight";
import { InstallAppButton } from "@/components/install-app-button";
import { Smartphone } from "lucide-react";

export async function Footer() {
  const [t, locale] = await Promise.all([getTranslations("footer"), getLocale()]);
  const year = new Date().getFullYear();
  const app = spotlightStrings(locale).footer;

  return (
    <footer className="border-t border-ink-100 bg-mist-50">
      <div className="container pt-10">
        <div className="relative flex flex-col items-center gap-5 overflow-hidden rounded-3xl bg-[#1a1326] p-6 text-center text-white sm:flex-row sm:p-7 sm:text-left">
          <div className="pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary-500/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 right-10 h-48 w-48 rounded-full bg-coral-500/30 blur-3xl" />
          <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/icons/icon-192.png" alt="" className="h-11 w-11 rounded-xl" />
          </span>
          <div className="relative min-w-0 flex-1">
            <p className="text-lg font-extrabold">{app.title}</p>
            <p className="mt-0.5 text-sm text-white/75">{app.body}</p>
            <p className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-peach-200">
              <Smartphone className="h-3.5 w-3.5" />
              {app.platforms}
            </p>
          </div>
          <InstallAppButton
            locale={locale}
            label={app.button}
            installedLabel={app.installed}
            className="relative inline-flex shrink-0 items-center gap-2 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 px-6 py-3 text-sm font-bold text-white shadow-[0_10px_28px_-8px_rgba(236,106,71,0.8)] transition-transform hover:scale-[1.03]"
            installedClassName="relative inline-flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-5 py-3 text-sm font-semibold text-emerald-300 ring-1 ring-white/15"
          />
        </div>
      </div>
      <div className="container grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <span className="text-lg font-extrabold text-primary-500">
            Varaa<span className="text-ink-900">Ai</span>
          </span>
          <p className="mt-3 max-w-xs text-sm text-ink-400">{t("tagline")}</p>
        </div>
        <FooterColumn
          title={t("forCustomers")}
          links={[
            { href: "/", label: t("forCustomers") },
            { href: "/account/bookings", label: "" },
          ].filter((l) => l.label)}
        />
        <FooterColumn
          title={t("forBusiness")}
          links={[
            { href: "/business", label: t("forBusiness") },
            { href: "/salon-check", label: locale === "vi" ? "Kiểm tra salon miễn phí" : "Free salon check" },
            { href: "/tools/price-list", label: priceListNavLabel(locale) },
            { href: "/tools/qr-poster", label: posterNavLabel(locale) },
          ]}
        />
        <FooterColumn
          title={t("company")}
          links={[
            { href: "/", label: "VaraaAi.Com" },
            { href: "/support", label: supportCenterStrings(locale).eyebrow },
            { href: "/terms", label: t("terms") },
            { href: "/privacy", label: locale === "vi" ? "Chính sách bảo mật" : "Privacy Policy" },
          ]}
        />
      </div>
      <div className="border-t border-ink-100 py-4 text-center text-xs text-ink-400">
        © {year} VaraaAi.Com — {t("rights")}
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <h4 className="mb-3 text-sm font-semibold text-ink-900">{title}</h4>
      <ul className="space-y-2 text-sm text-ink-400">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="hover:text-ink-900">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
