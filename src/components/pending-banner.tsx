"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Loader2, Check } from "lucide-react";

const SUSPENDED_TEXT: Record<string, string> = {
  vi: "Salon này đang bị tạm ngưng hoạt động. Vui lòng liên hệ info@varaaAi.com để biết thêm chi tiết.",
  en: "This salon is currently suspended. Please contact info@varaaAi.com for details.",
  fi: "Tämä salonki on tilapäisesti keskeytetty. Ota yhteyttä osoitteeseen info@varaaAi.com saadaksesi lisätietoja.",
  pl: "Ten salon jest obecnie zawieszony. Skontaktuj się z info@varaaAi.com, aby uzyskać szczegóły.",
  de: "Dieser Salon ist derzeit gesperrt. Bitte kontaktiere info@varaaAi.com für Details.",
  km: "សាឡុងនេះកំពុងត្រូវបានផ្អាកជាបណ្តោះអាសន្ន។ សូមទាក់ទង info@varaaAi.com ដើម្បីទទួលព័ត៌មានលម្អិត។",
  th: "ร้านนี้ถูกระงับชั่วคราว กรุณาติดต่อ info@varaaAi.com เพื่อดูรายละเอียด",
};

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
  const isSuspended = status === "SUSPENDED";
  const needsVerification = !isRejected && !isSuspended && !emailVerified;

  if (isSuspended) {
    return (
      <div className="card border-berry-400 bg-berry-50 p-6 text-center">
        <p className="text-berry-500">{SUSPENDED_TEXT[locale] ?? SUSPENDED_TEXT.en}</p>
      </div>
    );
  }

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
