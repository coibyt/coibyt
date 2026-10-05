"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface CardForSale {
  id: string;
  name: string;
  serviceName: string;
  discountPercent: number;
  validDays: number;
  maxUses: number;
  salePriceCents: number;
  currency: string;
}

export function GiftCardSale({ locale, cards }: { locale: string; cards: CardForSale[] }) {
  const vi = locale === "vi";
  const [openId, setOpenId] = useState<string | null>(null);
  const [form, setForm] = useState({ buyerName: "", buyerEmail: "", buyerPhone: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [doneCode, setDoneCode] = useState<string | null>(null);

  async function buy(e: React.FormEvent, cardId: string) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/gift-cards/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ giftCardId: cardId, ...form, locale }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (!res.ok) {
      setError(vi ? "Không đặt mua được, vui lòng thử lại." : "Couldn't place the order, please try again.");
      return;
    }
    setDoneCode(data.code);
    setOpenId(null);
  }

  if (doneCode) {
    return (
      <div className="mx-auto max-w-lg rounded-2xl bg-white p-6 text-center shadow-card">
        <p className="font-semibold text-ink-900">
          {vi ? "Cảm ơn bạn đã mua thẻ quà tặng!" : "Thanks for buying a gift card!"}
        </p>
        <p className="mt-2 text-sm text-ink-700">
          {vi
            ? "Mã thẻ đã được gửi đến email của bạn kèm mã QR. Thẻ sẽ được kích hoạt sau khi salon xác nhận thanh toán."
            : "Your code and QR have been emailed to you. The card activates once the salon confirms payment."}
        </p>
        <p className="mt-3 font-mono text-lg font-bold tracking-widest text-ink-900">{doneCode}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {cards.map((c) => (
        <div key={c.id} className="rounded-2xl bg-white p-5 shadow-card">
          <p className="font-semibold text-ink-900">{c.name}</p>
          <p className="mt-1 text-sm text-ink-700">
            {c.serviceName} · {vi ? "giảm" : "off"} {c.discountPercent}%
          </p>
          <p className="mt-1 text-xs text-ink-400">
            {vi
              ? `Hiệu lực ${c.validDays} ngày sau khi kích hoạt · dùng tối đa ${c.maxUses} lần`
              : `Valid ${c.validDays} days after activation · up to ${c.maxUses} uses`}
          </p>
          <p className="mt-3 text-xl font-bold text-ink-900">
            {(c.salePriceCents / 100).toFixed(2)} {c.currency}
          </p>

          {openId === c.id ? (
            <form onSubmit={(e) => buy(e, c.id)} className="mt-4 space-y-2">
              <input
                required
                placeholder={vi ? "Họ tên người mua" : "Buyer name"}
                className="input w-full"
                value={form.buyerName}
                onChange={(e) => setForm({ ...form, buyerName: e.target.value })}
              />
              <input
                required
                type="email"
                placeholder="Email"
                className="input w-full"
                value={form.buyerEmail}
                onChange={(e) => setForm({ ...form, buyerEmail: e.target.value })}
              />
              <input
                placeholder={vi ? "Số điện thoại (không bắt buộc)" : "Phone (optional)"}
                className="input w-full"
                value={form.buyerPhone}
                onChange={(e) => setForm({ ...form, buyerPhone: e.target.value })}
              />
              {error && <p className="text-sm text-berry-500">{error}</p>}
              <button type="submit" disabled={busy} className="btn-accent w-full">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {vi ? "Đặt mua" : "Buy"}
              </button>
            </form>
          ) : (
            <button type="button" onClick={() => setOpenId(c.id)} className="btn-outline mt-4 w-full">
              {vi ? "Mua thẻ này" : "Buy this card"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
