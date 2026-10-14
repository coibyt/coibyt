"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { Download, X } from "lucide-react";
import { useInstallPrompt, isIos } from "@/hooks/use-install-prompt";
import { InstallHintModal } from "@/components/install-hint-modal";

const DISMISS_KEY = "varaaai_install_banner_dismissed_until";
const DISMISS_DAYS = 7;

// Pages with their own fixed bottom-right action button (the storefront cart
// widget) or that are internal work consoles rather than customer-facing —
// a nagging install bar doesn't belong on either.
const HIDE_ON = [/\/business\/dashboard(\/|$)/, /\/admin(\/|$)/, /\/b\//];

/** The prominent, site-wide "install the app" bar — shows for every visitor
 * who hasn't installed VaraaAi yet, and disappears for good (per device)
 * once they do, via the same `appinstalled` detection as the navbar button. */
export function InstallAppBanner({ locale }: { locale: string }) {
  const pathname = usePathname();
  const { installed, promptInstall } = useInstallPrompt();
  const [dismissed, setDismissed] = useState(true);
  const [showIosHint, setShowIosHint] = useState(false);
  const [showGenericHint, setShowGenericHint] = useState(false);

  useEffect(() => {
    try {
      const until = localStorage.getItem(DISMISS_KEY);
      setDismissed(until ? Date.now() < Number(until) : false);
    } catch {
      setDismissed(false);
    }
  }, []);

  if (installed || dismissed || HIDE_ON.some((re) => re.test(pathname))) return null;

  function dismiss() {
    setDismissed(true);
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000));
    } catch {
      // Private browsing or storage disabled — the banner just reappears on
      // the next page load, which is an acceptable fallback.
    }
  }

  async function handleInstallClick() {
    const outcome = await promptInstall();
    if (outcome === "unsupported") {
      if (isIos()) setShowIosHint(true);
      else setShowGenericHint(true);
    }
  }

  const title = locale === "vi" ? "Cài đặt ứng dụng VaraaAi" : "Install the VaraaAi app";
  const subtitle =
    locale === "vi" ? "Đặt lịch nhanh hơn ngay trên màn hình chính" : "Book faster, right from your home screen";
  const installLabel = locale === "vi" ? "Cài đặt" : "Install";

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-40 animate-slide-up border-t border-ink-100 bg-white px-4 py-3 shadow-popover">
        <div className="container flex items-center gap-3">
          <Image src="/icons/icon-192.png" alt="" width={40} height={40} className="shrink-0 rounded-xl" />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-ink-900">{title}</p>
            <p className="truncate text-xs text-ink-400">{subtitle}</p>
          </div>
          <button onClick={handleInstallClick} className="btn-accent shrink-0 !px-4 !py-2 text-sm">
            <Download className="h-4 w-4" />
            {installLabel}
          </button>
          <button
            onClick={dismiss}
            aria-label={locale === "vi" ? "Đóng" : "Close"}
            className="shrink-0 text-ink-400 hover:text-ink-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {showIosHint && (
        <InstallHintModal onClose={() => setShowIosHint(false)}>
          <p className="font-bold text-ink-900">{title}</p>
          <p className="mt-2 text-sm text-ink-700">
            {locale === "vi"
              ? "Nhấn nút Chia sẻ (hình vuông có mũi tên) ở thanh công cụ Safari, sau đó chọn \"Thêm vào Màn hình chính\"."
              : 'Tap the Share button (square with an arrow) in Safari\'s toolbar, then choose "Add to Home Screen".'}
          </p>
        </InstallHintModal>
      )}

      {showGenericHint && (
        <InstallHintModal onClose={() => setShowGenericHint(false)}>
          <p className="font-bold text-ink-900">{title}</p>
          <p className="mt-2 text-sm text-ink-700">
            {locale === "vi"
              ? "Mở menu trình duyệt của bạn (thường là biểu tượng ⋮ hoặc ≡) và chọn \"Cài đặt ứng dụng\" hoặc \"Thêm vào màn hình chính\"."
              : 'Open your browser\'s menu (usually a ⋮ or ≡ icon) and choose "Install app" or "Add to Home Screen".'}
          </p>
        </InstallHintModal>
      )}
    </>
  );
}
