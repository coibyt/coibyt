"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Code2, ExternalLink, Copy, Check, X, Link2, Share2 } from "lucide-react";
import { shortLinkPath } from "@/lib/short-link/path";

const SHORT_TEXT: Record<string, { title: string; hint: string; copy: string; copied: string; share: string; website: string; shareText: string }> = {
  vi: {
    title: "Link ngắn gửi khách",
    hint: "Gửi link này qua tin nhắn, Messenger, Zalo hay WhatsApp — khách bấm vào là đặt lịch được ngay.",
    copy: "Sao chép link ngắn",
    copied: "Đã sao chép",
    share: "Gửi qua…",
    website: "Link cho website của bạn",
    shareText: "Đặt lịch với chúng tôi tại đây:",
  },
  en: {
    title: "Short link for customers",
    hint: "Send this link by text, Messenger or WhatsApp — customers tap it and book straight away.",
    copy: "Copy short link",
    copied: "Copied",
    share: "Send via…",
    website: "Link for your website",
    shareText: "Book with us here:",
  },
  fi: {
    title: "Lyhyt linkki asiakkaille",
    hint: "Lähetä linkki tekstiviestillä, Messengerissä tai WhatsAppissa — asiakas napauttaa ja varaa heti.",
    copy: "Kopioi lyhyt linkki",
    copied: "Kopioitu",
    share: "Lähetä…",
    website: "Linkki omalle verkkosivullesi",
    shareText: "Varaa aikasi täältä:",
  },
};

export function BookingEmbedCard({
  slug,
  defaultLocale,
  variant = "branch",
}: {
  /** "chain" embeds the shared page listing all of an owner's branches. */
  variant?: "branch" | "chain";
  slug: string;
  /** The salon's own configured language (Settings → Salon preferences) —
   * used for the embed URL regardless of which language the owner currently
   * happens to be viewing this dashboard in. */
  defaultLocale: string;
}) {
  const t = useTranslations("settingsCards");
  const uiLocale = useLocale();
  const st = SHORT_TEXT[uiLocale] ?? SHORT_TEXT.en;
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState<"url" | "code" | "short" | null>(null);
  const [canShare, setCanShare] = useState(false);
  useEffect(() => setCanShare(typeof navigator !== "undefined" && typeof navigator.share === "function"), []);

  // Read after hydration, so the server and first client render agree.
  const [origin, setOrigin] = useState("");
  useEffect(() => setOrigin(window.location.origin), []);
  const isChain = variant === "chain";
  const embedUrl = `${origin}/embed/${isChain ? "chain/" : ""}${slug}?locale=${defaultLocale}`;
  const shortUrl = `${origin}${shortLinkPath(slug, isChain ? "chain" : "salon")}`;
  const shortLabel = shortUrl.replace(/^https?:\/\/(www\.)?/, "");
  const iframeId = `varaaai-embed-${isChain ? "chain-" : ""}${slug}`;
  const embedCode = `<iframe id="${iframeId}" src="${embedUrl}" style="width:100%;border:0;"></iframe>
<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.min.js"></script>
<script>
  iFrameResize({ checkOrigin: false }, "#${iframeId}");
</script>`;

  async function share() {
    try {
      await navigator.share({ text: st.shareText, url: shortUrl });
    } catch {
      // Closed the share sheet, or the browser refused — nothing to do.
    }
  }

  function copy(text: string, which: "url" | "code" | "short") {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">
        {isChain ? t("chainTitle") : t("embedTitle")}
      </h2>
      <p className="mb-3 text-xs text-ink-400">
        {isChain ? t("chainSubtitle") : t("embedSubtitle")}
      </p>

      <div className="mb-4 rounded-2xl border border-[#e8d3a6] bg-gradient-to-br from-[#fdf8ee] to-white p-3.5">
        <p className="flex items-center gap-1.5 text-xs font-semibold text-[#8a6a2c]">
          <Link2 className="h-3.5 w-3.5" />
          {st.title}
        </p>
        <p className="mt-1.5 select-all break-all text-base font-bold text-ink-900">{origin ? shortLabel : " "}</p>
        <p className="mt-1 text-xs text-ink-400">{st.hint}</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button onClick={() => copy(shortUrl, "short")} className="btn-primary !px-3 !py-1.5 text-xs">
            {copied === "short" ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied === "short" ? st.copied : st.copy}
          </button>
          {canShare && (
            <button onClick={share} className="btn-outline !px-3 !py-1.5 text-xs">
              <Share2 className="h-3.5 w-3.5" />
              {st.share}
            </button>
          )}
        </div>
      </div>

      <p className="mb-1.5 text-xs font-medium text-ink-500">{st.website}</p>
      <div className="mb-3 flex items-center gap-2 rounded-xl border border-ink-100 bg-mist-50 px-3 py-2 text-xs text-ink-700">
        <span className="flex-1 truncate">{embedUrl}</span>
      </div>

      <div className="flex flex-wrap gap-2">
        <a
          href={embedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          {t("viewPage")}
        </a>
        <button
          onClick={() => copy(embedUrl, "url")}
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          {copied === "url" ? (
            <Check className="h-3.5 w-3.5" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {t("copyLink")}
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary !px-3 !py-1.5 text-xs"
        >
          <Code2 className="h-3.5 w-3.5" />
          {t("getEmbedCode")}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-lg animate-slide-up p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-ink-900">{t("embedModalTitle")}</h3>
              <button onClick={() => setShowModal(false)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-3 text-sm text-ink-400">{t("embedModalHint")}</p>
            <pre className="max-h-64 overflow-auto whitespace-pre-wrap break-all rounded-xl border border-ink-100 bg-mist-50 p-3 text-xs text-ink-900">
              {embedCode}
            </pre>
            <div className="mt-4 flex gap-2">
              <button onClick={() => copy(embedCode, "code")} className="btn-primary">
                {copied === "code" ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {t("copyCode")}
              </button>
              <button onClick={() => setShowModal(false)} className="btn-ghost">
                {t("close")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
