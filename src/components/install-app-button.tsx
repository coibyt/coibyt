"use client";

import { useState } from "react";
import { CheckCircle2, Download } from "lucide-react";
import { useInstallPrompt, isIos } from "@/hooks/use-install-prompt";
import { InstallHintModal } from "@/components/install-hint-modal";

/** Lets a visitor install the site straight to their device with one click —
 * no app store, no intermediary page — the same way the site itself renders,
 * since it's a PWA: installing just bookmarks the live site as a standalone
 * app, so any change we ship to the website shows up in the installed app
 * too. Chrome/Edge/Android support a real native install prompt via
 * `beforeinstallprompt`; iOS Safari doesn't expose that API at all, so there
 * we fall back to showing the manual "Share → Add to Home Screen" steps. */
export function InstallAppButton({
  locale,
  className,
  label: labelOverride,
  installedLabel,
  installedClassName,
}: {
  locale: string;
  className?: string;
  label?: string;
  /** Shown instead of nothing once the app is installed on this device. */
  installedLabel?: string;
  installedClassName?: string;
}) {
  const { installed, promptInstall } = useInstallPrompt();
  const [showIosHint, setShowIosHint] = useState(false);
  const [showGenericHint, setShowGenericHint] = useState(false);

  if (installed) {
    return installedLabel ? (
      <span className={installedClassName ?? "inline-flex items-center gap-1.5 text-sm font-semibold"}>
        <CheckCircle2 className="h-4 w-4" />
        {installedLabel}
      </span>
    ) : null;
  }

  async function handleClick() {
    const outcome = await promptInstall();
    if (outcome === "unsupported") {
      if (isIos()) setShowIosHint(true);
      else setShowGenericHint(true);
    }
  }

  const label = labelOverride ?? (locale === "vi" ? "Cài đặt ứng dụng" : "Install app");

  return (
    <>
      <button type="button" onClick={handleClick} className={className ?? "btn-ghost"}>
        <Download className="h-4 w-4" />
        {label}
      </button>

      {showIosHint && (
        <InstallHintModal onClose={() => setShowIosHint(false)}>
          <p className="font-bold text-ink-900">{label}</p>
          <p className="mt-2 text-sm text-ink-700">
            {locale === "vi"
              ? "Nhấn nút Chia sẻ (hình vuông có mũi tên) ở thanh công cụ Safari, sau đó chọn \"Thêm vào Màn hình chính\"."
              : 'Tap the Share button (square with an arrow) in Safari\'s toolbar, then choose "Add to Home Screen".'}
          </p>
        </InstallHintModal>
      )}

      {showGenericHint && (
        <InstallHintModal onClose={() => setShowGenericHint(false)}>
          <p className="font-bold text-ink-900">{label}</p>
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
