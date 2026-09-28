"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export function AdminBusinessActions({
  id,
  name,
  status,
}: {
  id: string;
  name: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);

  async function run(request: () => Promise<Response>, confirmText?: string) {
    if (confirmText && !window.confirm(confirmText)) return;
    setBusy(true);
    setError(false);
    const res = await request();
    setBusy(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    router.refresh();
  }

  const setStatus = (next: "APPROVED" | "SUSPENDED", confirmText?: string) =>
    run(
      () =>
        fetch(`/api/admin/businesses/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: next }),
        }),
      confirmText
    );

  const remove = () =>
    run(
      () => fetch(`/api/admin/businesses/${id}`, { method: "DELETE" }),
      `Xóa vĩnh viễn "${name}" cùng toàn bộ dịch vụ, nhân viên và lịch hẹn của salon này? Không thể hoàn tác.`
    );

  return (
    <div className="flex flex-wrap items-center gap-2">
      {busy && <Loader2 className="h-3.5 w-3.5 animate-spin text-ink-400" />}
      {status === "SUSPENDED" ? (
        <button
          disabled={busy}
          onClick={() => setStatus("APPROVED")}
          className="btn-outline !px-3 !py-1 text-xs"
        >
          Mở lại
        </button>
      ) : status === "APPROVED" ? (
        <button
          disabled={busy}
          onClick={() =>
            setStatus(
              "SUSPENDED",
              `Tạm ngưng "${name}"? Salon sẽ bị ẩn khỏi website và khách không thể đặt lịch cho đến khi được mở lại.`
            )
          }
          className="btn-outline !px-3 !py-1 text-xs"
        >
          Tạm ngưng
        </button>
      ) : null}
      <button
        disabled={busy}
        onClick={remove}
        className="btn-ghost !px-3 !py-1 text-xs text-berry-500"
      >
        Xóa
      </button>
      {error && <span className="text-xs text-berry-500">Lỗi, thử lại.</span>}
    </div>
  );
}
