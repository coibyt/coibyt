import { LogIn } from "lucide-react";
import { sitePrefix } from "@/lib/site-content";
import { EmbedLanguageSwitcher } from "@/components/embed-language-switcher";

const SIGN_IN_LABEL: Record<string, string> = {
  vi: "Đăng nhập hoặc đăng ký",
  en: "Sign in or register",
  fi: "Kirjaudu sisään tai rekisteröidy",
  pl: "Zaloguj się lub zarejestruj",
  de: "Anmelden oder registrieren",
  km: "ចូលគណនី ឬចុះឈ្មោះ",
  th: "เข้าสู่ระบบหรือลงทะเบียน",
};

/** Top bar shown on every step of the embed booking flow: a language
 * switcher and a sign-in/register shortcut — opens in a new tab since these
 * pages are meant to be iframed into a salon's own external website, so
 * navigating away in place would break out of that context oddly. */
export function EmbedTopBar({ locale }: { locale: string }) {
  const label = SIGN_IN_LABEL[locale] ?? SIGN_IN_LABEL.en;
  return (
    <div className="mb-3 flex items-center justify-between gap-3">
      <EmbedLanguageSwitcher locale={locale} />
      <a
        href={`${sitePrefix(locale)}/auth/sign-in`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-xs font-medium text-primary-600 hover:underline"
      >
        <LogIn className="h-3.5 w-3.5" />
        {label}
      </a>
    </div>
  );
}
