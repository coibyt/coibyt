import { Globe2, UserRound, ShieldCheck } from "lucide-react";
import { sitePrefix } from "@/lib/site-content";
import { LanguageSwitcher } from "@/components/language-switcher";

const SIGN_IN_LABEL: Record<string, string> = {
  vi: "Đăng nhập / Đăng ký",
  en: "Sign in / Register",
  fi: "Kirjaudu / Rekisteröidy",
  pl: "Zaloguj / Zarejestruj",
  de: "Anmelden / Registrieren",
  km: "ចូលគណនី / ចុះឈ្មោះ",
  th: "เข้าสู่ระบบ / ลงทะเบียน",
};

const FOOTER_LABEL: Record<string, string> = {
  vi: "Đặt lịch an toàn với",
  en: "Secure booking by",
  fi: "Turvallinen ajanvaraus:",
};

/** Top bar shown on every step of the embed booking flow: a language
 * switcher and a sign-in/register shortcut — opens in a new tab since these
 * pages are meant to be iframed into a salon's own external website, so
 * navigating away in place would break out of that context oddly. */
export function EmbedTopBar({ locale }: { locale: string }) {
  const label = SIGN_IN_LABEL[locale] ?? SIGN_IN_LABEL.en;
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div className="relative">
        <Globe2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-600" />
        <LanguageSwitcher
          locale={locale}
          className="h-9 cursor-pointer appearance-none rounded-full border border-ink-100 bg-white pl-9 pr-4 text-xs font-semibold text-ink-700 shadow-sm transition-colors hover:border-primary-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
        />
      </div>
      <a
        href={`${sitePrefix(locale)}/auth/sign-in`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex h-9 min-w-0 items-center gap-1.5 rounded-full bg-primary-50 px-3.5 text-xs font-semibold text-primary-700 transition-colors hover:bg-primary-100"
      >
        <UserRound className="h-4 w-4 shrink-0" />
        <span className="truncate">{label}</span>
      </a>
    </div>
  );
}

/** Small trust line under every embed step. */
export function EmbedFooter({ locale }: { locale: string }) {
  return (
    <p className="mt-8 flex items-center justify-center gap-1.5 pb-2 text-[11px] text-ink-400">
      <ShieldCheck className="h-3.5 w-3.5 text-teal-600" />
      {FOOTER_LABEL[locale] ?? FOOTER_LABEL.en}
      <a href="https://varaaai.com" target="_blank" rel="noopener noreferrer" className="font-bold text-ink-700 hover:text-primary-700">
        Varaa<span className="text-primary-600">Ai</span>
      </a>
    </p>
  );
}
