"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { formatMoney } from "@/lib/money";
import { BookingStatusBadge } from "@/components/booking-status-badge";
import { useRouter } from "@/i18n/navigation";

interface BookingRow {
  id: string;
  startsAt: string;
  status: string;
  priceCents: number;
  currency: string;
  serviceName: string;
  staffName: string | null;
  customerName: string;
  customerPhone: string | null;
}

const NEXT_ACTIONS: Record<string, { label: string; status: string }[]> = {
  CONFIRMED: [
    { label: "Hoàn thành", status: "COMPLETED" },
    { label: "Không đến", status: "NO_SHOW" },
    { label: "Huỷ", status: "CANCELLED" },
  ],
  PENDING_PAYMENT: [{ label: "Huỷ", status: "CANCELLED" }],
};

export function BookingsManager({
  initialBookings,
  locale,
}: {
  initialBookings: BookingRow[];
  locale: string;
}) {
  const router = useRouter();
  const [updating, setUpdating] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setUpdating(id);
    await fetch(`/api/business/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setUpdating(null);
    router.refresh();
  }

  if (initialBookings.length === 0) {
    return <p className="text-sm text-ink-400">Chưa có lịch hẹn nào.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-ink-100">
      <table className="w-full min-w-[720px] text-sm">
        <thead className="bg-mist-50 text-left text-xs uppercase text-ink-400">
          <tr>
            <th className="px-4 py-3">Khách hàng</th>
            <th className="px-4 py-3">Dịch vụ</th>
            <th className="px-4 py-3">Nhân viên</th>
            <th className="px-4 py-3">Thời gian</th>
            <th className="px-4 py-3">Giá</th>
            <th className="px-4 py-3">Trạng thái</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {initialBookings.map((b) => (
            <tr key={b.id} className="border-t border-ink-100">
              <td className="px-4 py-3">
                <p className="font-medium text-ink-900">{b.customerName}</p>
                {b.customerPhone && <p className="text-xs text-ink-400">{b.customerPhone}</p>}
              </td>
              <td className="px-4 py-3">{b.serviceName}</td>
              <td className="px-4 py-3">{b.staffName ?? "—"}</td>
              <td className="px-4 py-3">
                {new Date(b.startsAt).toLocaleString(locale === "vi" ? "vi-VN" : "en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </td>
              <td className="px-4 py-3">{formatMoney(b.priceCents, b.currency, locale)}</td>
              <td className="px-4 py-3">
                <BookingStatusBadge status={b.status} />
              </td>
              <td className="px-4 py-3">
                <div className="flex gap-1">
                  {(NEXT_ACTIONS[b.status] ?? []).map((a) => (
                    <button
                      key={a.status}
                      disabled={updating === b.id}
                      onClick={() => updateStatus(b.id, a.status)}
                      className="btn-ghost !px-2 !py-1 text-xs"
                    >
                      {a.label}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
