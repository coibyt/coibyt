"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { formatMoney } from "@/lib/money";
import { Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

interface OrderItemRow {
  id: string;
  name: string;
  unitPriceCents: number;
  qty: number;
  totalCents: number;
}

interface OrderRow {
  id: string;
  status: "PENDING_PAYMENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";
  paymentMethod: "CASH" | "BANK_TRANSFER" | "CHAT";
  totalCents: number;
  currency: string;
  customerNote: string | null;
  createdAt: string;
  items: OrderItemRow[];
  customer: { name: string; email: string; phone: string | null };
}

const STATUS_OPTIONS = ["PENDING_PAYMENT", "CONFIRMED", "COMPLETED", "CANCELLED"] as const;

export function OrdersManager({ initialOrders, locale }: { initialOrders: OrderRow[]; locale: string }) {
  const tDash = useTranslations("dashboard");
  const tBooking = useTranslations("booking");
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);

  async function updateStatus(id: string, status: string) {
    setBusyId(id);
    await fetch(`/api/business/orders/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setBusyId(null);
    router.refresh();
  }

  if (initialOrders.length === 0) {
    return <p className="text-sm text-ink-400">{tDash("ordersPage.empty")}</p>;
  }

  return (
    <div className="space-y-3">
      {initialOrders.map((o) => (
        <div key={o.id} className="card space-y-3 p-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <p className="font-semibold text-ink-900">{o.customer.name}</p>
              <p className="text-xs text-ink-400">
                {o.customer.email}
                {o.customer.phone ? ` · ${o.customer.phone}` : ""}
              </p>
              <p className="text-xs text-ink-400">{new Date(o.createdAt).toLocaleString(locale)}</p>
            </div>
            <div className="flex items-center gap-2">
              <select
                className="input !w-auto !py-1.5 text-xs"
                value={o.status}
                disabled={busyId === o.id}
                onChange={(e) => updateStatus(o.id, e.target.value)}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {tBooking(`status.${s}`)}
                  </option>
                ))}
              </select>
              {busyId === o.id && <Loader2 className="h-4 w-4 animate-spin text-ink-400" />}
            </div>
          </div>

          <div className="divide-y divide-ink-100 rounded-xl border border-ink-100">
            {o.items.map((it) => (
              <div key={it.id} className="flex items-center justify-between px-3 py-2 text-sm">
                <span className="text-ink-700">
                  {it.name} × {it.qty}
                </span>
                <span className="font-medium text-ink-900">
                  {formatMoney(it.totalCents, o.currency, locale)}
                </span>
              </div>
            ))}
          </div>

          {o.customerNote && (
            <p className="text-xs text-ink-700">
              <span className="font-medium text-ink-900">{tDash("ordersPage.note")}: </span>
              {o.customerNote}
            </p>
          )}

          <div className="flex items-center justify-between text-sm">
            <span className="text-ink-400">
              {tDash(`ordersPage.paymentMethod.${o.paymentMethod}`)}
            </span>
            <span className="font-bold text-ink-900">
              {tDash("ordersPage.total")}: {formatMoney(o.totalCents, o.currency, locale)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
