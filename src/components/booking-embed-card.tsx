"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Code2, ExternalLink, Copy, Check, X } from "lucide-react";

export function BookingEmbedCard({ slug }: { slug: string }) {
  const locale = useLocale();
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState<"url" | "code" | null>(null);

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const embedUrl = `${origin}/embed/${slug}?locale=${locale}`;
  const iframeId = `varaaai-embed-${slug}`;
  const embedCode = `<iframe id="${iframeId}" src="${embedUrl}" style="width:100%;border:0;"></iframe>
<script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.min.js"></script>
<script>
  iFrameResize({ checkOrigin: false }, "#${iframeId}");
</script>`;

  function copy(text: string, which: "url" | "code") {
    navigator.clipboard.writeText(text);
    setCopied(which);
    setTimeout(() => setCopied(null), 2000);
  }

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">
        {locale === "vi" ? "Nhúng trang đặt lịch" : "Embed booking page"}
      </h2>
      <p className="mb-3 text-xs text-ink-400">
        {locale === "vi"
          ? "Cho phép khách đặt lịch ngay trên website riêng của bạn."
          : "Let customers book right from your own website."}
      </p>

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
          {locale === "vi" ? "Xem trang" : "View page"}
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
          {locale === "vi" ? "Sao chép liên kết" : "Copy link"}
        </button>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary !px-3 !py-1.5 text-xs"
        >
          <Code2 className="h-3.5 w-3.5" />
          {locale === "vi" ? "Lấy mã nhúng" : "Get embed code"}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
          <div className="card w-full max-w-lg animate-slide-up p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-ink-900">
                {locale === "vi" ? "Mã nhúng đặt lịch" : "Booking embed code"}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-ink-400">
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="mb-3 text-sm text-ink-400">
              {locale === "vi"
                ? "Dán đoạn mã này vào trang HTML trên website của bạn, ở vị trí bạn muốn hiển thị khung đặt lịch."
                : "Paste this into your website's HTML wherever you want the booking widget to appear."}
            </p>
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
                {locale === "vi" ? "Sao chép mã" : "Copy code"}
              </button>
              <button onClick={() => setShowModal(false)} className="btn-ghost">
                {locale === "vi" ? "Đóng" : "Close"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
