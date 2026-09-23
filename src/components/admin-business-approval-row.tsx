"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Check, X } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

interface BusinessInfo {
  id: string;
  name: string;
  description: string | null;
  city: string | null;
  phone: string | null;
  ownerName: string;
  ownerEmail: string;
  category: string | null;
}

export function AdminBusinessApprovalRow({ business }: { business: BusinessInfo }) {
  const t = useTranslations("admin");
  const router = useRouter();
  const [loading, setLoading] = useState<"APPROVED" | "REJECTED" | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [showReject, setShowReject] = useState(false);

  async function act(status: "APPROVED" | "REJECTED") {
    setLoading(status);
    await fetch(`/api/admin/businesses/${business.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, rejectReason: rejectReason || undefined }),
    });
    setLoading(null);
    router.refresh();
  }

  return (
    <div className="card p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-ink-900">{business.name}</p>
          <p className="text-xs text-ink-400">
            {business.category} · {business.city} · {business.phone}
          </p>
          <p className="mt-1 text-xs text-ink-400">
            {business.ownerName} ({business.ownerEmail})
          </p>
          {business.description && (
            <p className="mt-2 max-w-xl text-sm text-ink-700">{business.description}</p>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => act("APPROVED")}
            disabled={loading !== null}
            className="btn-primary !bg-sage-500 hover:!bg-sage-600"
          >
            {loading === "APPROVED" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
            {t("approve")}
          </button>
          <button
            onClick={() => setShowReject((v) => !v)}
            disabled={loading !== null}
            className="btn-outline !border-berry-400 !text-berry-500"
          >
            <X className="h-4 w-4" /> {t("reject")}
          </button>
        </div>
      </div>
      {showReject && (
        <div className="mt-3 flex gap-2">
          <input
            className="input"
            placeholder="Lý do từ chối (không bắt buộc)"
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
          />
          <button onClick={() => act("REJECTED")} className="btn-primary !bg-berry-500 hover:!bg-berry-600">
            {loading === "REJECTED" && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("reject")}
          </button>
        </div>
      )}
    </div>
  );
}
