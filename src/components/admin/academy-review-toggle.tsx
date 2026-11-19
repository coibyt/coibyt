"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";

/** Admin › Học viện: hide a course review, or show it again. */
export function AcademyReviewToggle({ id, hidden, vi }: { id: string; hidden: boolean; vi: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const toggle = async () => {
    setBusy(true);
    await fetch(`/api/admin/academy-reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: hidden ? "APPROVED" : "HIDDEN" }),
    }).catch(() => {});
    setBusy(false);
    router.refresh();
  };
  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      className={`rounded-full px-3 py-1 text-xs font-bold ring-1 transition disabled:opacity-50 ${hidden ? "text-emerald-700 ring-emerald-200 hover:bg-emerald-50" : "text-berry-500 ring-berry-200 hover:bg-berry-50"}`}
    >
      {hidden ? (vi ? "Hiện lại" : "Show") : vi ? "Ẩn" : "Hide"}
    </button>
  );
}
