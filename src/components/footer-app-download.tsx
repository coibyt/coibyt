"use client";

import { useState } from "react";
import { Apple, CheckCircle2, Monitor, Smartphone } from "lucide-react";
import { useInstallPrompt, isIos } from "@/hooks/use-install-prompt";
import { InstallHintModal } from "@/components/install-hint-modal";

export interface FooterAppLabels {
  title: string;
  installOn: string;
  desktop: string;
  installed: string;
  iosHint: string;
  otherHint: string;
}

/** The footer's install badges (Android / iPhone / desktop), styled like
 * store badges. They all install the same web app: the browser's own install
 * dialog where it has one, otherwise the "Add to Home Screen" steps. Once
 * installed, a single "installed" badge replaces them. */
export function FooterAppDownload({ labels }: { labels: FooterAppLabels }) {
  const { installed, promptInstall } = useInstallPrompt();
  const [hint, setHint] = useState<"ios" | "other" | null>(null);

  async function install(platform: "android" | "ios" | "desktop") {
    if (platform === "ios" && isIos()) {
      setHint("ios");
      return;
    }
    const outcome = await promptInstall();
    if (outcome === "unsupported") setHint(isIos() || platform === "ios" ? "ios" : "other");
  }

  if (installed) {
    return (
      <span className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-ink-900 shadow-card ring-1 ring-emerald-200">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
        </span>
        {labels.installed}
      </span>
    );
  }

  const badges = [
    { key: "android" as const, icon: Smartphone, name: "Android" },
    { key: "ios" as const, icon: Apple, name: "iPhone" },
    { key: "desktop" as const, icon: Monitor, name: labels.desktop },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2.5 sm:justify-start">
        {badges.map((b) => (
          <button
            key={b.key}
            type="button"
            onClick={() => install(b.key)}
            className="group flex min-w-[9.5rem] items-center gap-2.5 rounded-2xl bg-ink-900 px-4 py-2.5 text-left text-white shadow-[0_10px_24px_-12px_rgba(13,23,24,0.7)] ring-1 ring-ink-900 transition-all hover:-translate-y-0.5 hover:bg-primary-800"
          >
            <b.icon className="h-6 w-6 shrink-0 text-peach-200" />
            <span className="leading-tight">
              <span className="block text-[10px] font-medium uppercase tracking-wider text-white/60">{labels.installOn}</span>
              <span className="block text-[15px] font-bold">{b.name}</span>
            </span>
          </button>
        ))}
      </div>

      {hint && (
        <InstallHintModal onClose={() => setHint(null)}>
          <p className="font-bold text-ink-900">{labels.title}</p>
          <p className="mt-2 text-sm text-ink-700">{hint === "ios" ? labels.iosHint : labels.otherHint}</p>
        </InstallHintModal>
      )}
    </>
  );
}
