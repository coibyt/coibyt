"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Loader2, Check } from "lucide-react";

export function PendingBanner({
  status,
  emailVerified,
}: {
  status: string;
  emailVerified: boolean;
}) {
  const t = useTranslations("business");
  const locale = useLocale();
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  async function resend() {
    setSending(true);
    const res = await fetch("/api/auth/resend-verification", { method: "POST" });
    setSending(false);
    if (res.ok) setSent(true);
  }

  const isRejected = status === "REJECTED";
  const needsVerification = !isRejected && !emailVerified;

  return (
    <div
      className={`card p-6 text-center ${
        isRejected ? "border-berry-400 bg-berry-50" : "border-coral-400 bg-coral-50"
      }`}
    >
      <p className={isRejected ? "text-berry-500" : "text-coral-600"}>
        {isRejected
          ? t("rejectedBanner")
          : needsVerification
            ? locale === "vi"
              ? "Vui lòng kiểm tra email và nhấp vào liên kết xác minh để kích hoạt salon của bạn — chưa cần VaraaAi duyệt."
              : "Please check your email and click the verification link to activate your salon — no VaraaAi review needed."
            : t("pendingBanner")}
      </p>
      {needsVerification && (
        <button
          onClick={resend}
          disabled={sending || sent}
          className="btn-outline mt-3 !px-4 !py-2 text-xs"
        >
          {sending ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : sent ? (
            <Check className="h-3.5 w-3.5" />
          ) : null}
          {sent
            ? locale === "vi"
              ? "Đã gửi lại"
              : "Sent again"
            : locale === "vi"
              ? "Gửi lại email xác minh"
              : "Resend verification email"}
        </button>
      )}
    </div>
  );
}
