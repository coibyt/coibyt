"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function toggle() {
    const next = locale === "vi" ? "en" : "vi";
    router.replace(pathname, { locale: next });
  }

  return (
    <button
      onClick={toggle}
      className="btn-ghost !px-3 text-xs font-bold uppercase"
      aria-label="Switch language"
    >
      {locale === "vi" ? "EN" : "VI"}
    </button>
  );
}
