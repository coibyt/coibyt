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

  const transfer = async () => {
    const email = window.prompt(
      `Chuyển "${name}" sang tài khoản (email) nào? Salon sẽ xuất hiện trong bảng điều khiển của tài khoản đó như một chi nhánh.`
    )?.trim();
    if (!email) return;
    setBusy(true);
    setError(false);
    const res = await fetch(`/api/admin/businesses/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ownerEmail: email }),
    });
    setBusy(false);
    if (!res.ok) {
      window.alert(
        res.status === 404 ? "Không tìm thấy tài khoản với email này." : "Có lỗi xảy ra, thử lại."
      );
      return;
    }
    router.refresh();
  };

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
        onClick={transfer}
        className="btn-ghost !px-3 !py-1 text-xs"
      >
        Chuyển chủ
      </button>
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
