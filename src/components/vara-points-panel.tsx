"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, Gift, Loader2, Sparkles } from "lucide-react";

interface VaraTransaction {
  id: string;
  amount: number;
  reason: string;
  createdAt: string;
}

interface VaraInfo {
  varaPoints: number;
  referralCode: string | null;
  checkedInToday: boolean;
  referredSignupCount: number;
  referredQualifiedCount: number;
  referralClickCount: number;
  recentTransactions: VaraTransaction[];
}

const REASON_LABELS: Record<string, { vi: string; en: string }> = {
  SIGNUP_BONUS: { vi: "Thưởng đăng ký salon", en: "Salon signup bonus" },
  DAILY_CHECKIN: { vi: "Điểm danh hàng ngày", en: "Daily check-in" },
  REFERRAL_CLICK: { vi: "Lượt xem link giới thiệu", en: "Referral link view" },
  REFERRAL_SIGNUP_BONUS: { vi: "Giới thiệu salon mới thành công", en: "Referred a new salon" },
  EMAIL_SENT: { vi: "Gửi email marketing", en: "Marketing email sent" },
  EMAIL_SENT_COOLDOWN_BYPASS: { vi: "Gửi email trước 72 giờ", en: "Early resend (cooldown bypass)" },
};

export function VaraPointsPanel({ locale }: { locale: string }) {
  const tDash = useTranslations("dashboard");
  const [info, setInfo] = useState<VaraInfo | null>(null);
  const [checkingIn, setCheckingIn] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch("/api/business/vara")
      .then((r) => r.json())
      .then(setInfo)
      .catch(() => {});
  }, []);

  async function checkIn() {
    setCheckingIn(true);
    const res = await fetch("/api/business/vara/checkin", { method: "POST" });
    setCheckingIn(false);
    if (res.ok) {
      const data = await res.json();
      setInfo((prev) => (prev ? { ...prev, varaPoints: data.varaPoints, checkedInToday: true } : prev));
    }
  }

  function copyLink() {
    if (!info?.referralCode) return;
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    navigator.clipboard.writeText(`${origin}/${locale}/business?aff=${info.referralCode}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!info) return null;

  const referralLink = info.referralCode
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/${locale}/business?aff=${info.referralCode}`
    : null;

  return (
    <div className="card space-y-4 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-ink-400">{tDash("varaPoints.balanceLabel")}</p>
          <p className="text-3xl font-extrabold text-ink-900">{info.varaPoints}</p>
        </div>
        <button
          onClick={checkIn}
          disabled={checkingIn || info.checkedInToday}
          className="btn-outline !px-3 !py-2 text-xs"
        >
          {checkingIn && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
          <Gift className="h-3.5 w-3.5" />
          {info.checkedInToday ? tDash("varaPoints.checkedInToday") : tDash("varaPoints.checkIn")}
        </button>
      </div>

      {referralLink && (
        <div className="space-y-2 border-t border-ink-100 pt-4">
          <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
            <Sparkles className="h-4 w-4 text-primary-500" /> {tDash("varaPoints.referralTitle")}
          </p>
          <p className="text-xs text-ink-400">{tDash("varaPoints.referralHint")}</p>
          <div className="flex flex-wrap items-center gap-2 rounded-xl bg-mist-50 px-3 py-2">
            <code className="flex-1 truncate text-xs text-ink-700">{referralLink}</code>
            <button onClick={copyLink} className="btn-ghost !p-1.5 text-ink-700" aria-label={tDash("varaPoints.copy")}>
              {copied ? <Check className="h-4 w-4 text-sage-500" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
          <p className="text-xs text-ink-400">
            {tDash("varaPoints.referralStats", {
              clicks: info.referralClickCount,
              signups: info.referredSignupCount,
              qualified: info.referredQualifiedCount,
            })}
          </p>
        </div>
      )}

      {info.recentTransactions.length > 0 && (
        <div className="space-y-1.5 border-t border-ink-100 pt-4">
          <p className="text-sm font-semibold text-ink-900">{tDash("varaPoints.historyTitle")}</p>
          <ul className="space-y-1">
            {info.recentTransactions.map((t) => (
              <li key={t.id} className="flex items-center justify-between text-xs text-ink-700">
                <span>{REASON_LABELS[t.reason]?.[locale === "vi" ? "vi" : "en"] ?? t.reason}</span>
                <span className={t.amount >= 0 ? "font-medium text-sage-600" : "font-medium text-berry-500"}>
                  {t.amount >= 0 ? "+" : ""}
                  {t.amount}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
