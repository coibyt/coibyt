"use client";

import { useTranslations } from "next-intl";

export function PendingBanner({ status }: { status: string }) {
  const t = useTranslations("business");
  const isRejected = status === "REJECTED";
  return (
    <div
      className={`card p-6 text-center ${
        isRejected ? "border-berry-400 bg-berry-50" : "border-coral-400 bg-coral-50"
      }`}
    >
      <p className={isRejected ? "text-berry-500" : "text-coral-600"}>
        {isRejected ? t("rejectedBanner") : t("pendingBanner")}
      </p>
    </div>
  );
}
