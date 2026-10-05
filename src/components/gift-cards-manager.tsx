"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface ServiceOption {
  id: string;
  name: string;
}

interface CardRow {
  id: string;
  name: string;
  serviceName: string;
  discountPercent: number;
  validDays: number;
  maxUses: number;
  salePriceCents: number;
  currency: string;
  active: boolean;
}

interface PurchaseRow {
  id: string;
  code: string;
  buyerName: string;
  buyerEmail: string;
  cardName: string;
  serviceName: string;
  discountPercent: number;
  priceCents: number;
  currency: string;
  usesLeft: number;
  maxUses: number;
  redeemedCount: number;
  expiresAt: string | null;
  createdAt: string;
  state: "PENDING" | "ACTIVE" | "EXPIRED" | "USED_UP" | "CANCELLED";
}

interface Stats {
  sold: number;
  pending: number;
  active: number;
  redeemed: number;
  revenueCents: number;
  currency: string | null;
}

interface Lookup {
  code: string;
  buyerName: string;
  cardName: string;
  serviceName: string;
  discountPercent: number;
  usesLeft: number;
  maxUses: number;
  expiresAt: string | null;
  state: PurchaseRow["state"];
}

const STATE_LABEL: Record<PurchaseRow["state"], { vi: string; en: string }> = {
  PENDING: { vi: "Chờ thanh toán", en: "Awaiting payment" },
  ACTIVE: { vi: "Đang hiệu lực", en: "Active" },
  EXPIRED: { vi: "Hết hạn", en: "Expired" },
  USED_UP: { vi: "Đã dùng hết", en: "Used up" },
  CANCELLED: { vi: "Đã huỷ", en: "Cancelled" },
};

export function GiftCardsManager({
  locale,
  services,
  defaultCurrency,
}: {
  locale: string;
  services: ServiceOption[];
  defaultCurrency: string;
}) {
  const vi = locale === "vi";
  const [cards, setCards] = useState<CardRow[] | null>(null);
  const [purchases, setPurchases] = useState<PurchaseRow[] | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [form, setForm] = useState({
    serviceId: services[0]?.id ?? "",
    name: "",
    discountPercent: "30",
    validDays: "90",
    maxUses: "1",
    salePrice: "",
    currency: defaultCurrency,
  });
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [lookup, setLookup] = useState<Lookup | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function loadAll() {
    const [c, p] = await Promise.all([
      fetch("/api/business/gift-cards").then((r) => r.json()),
      fetch("/api/business/gift-cards/purchases").then((r) => r.json()),
    ]);
    setCards(c.cards ?? []);
    setPurchases(p.purchases ?? []);
    setStats(p.stats ?? null);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function createCard(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(null);
    const res = await fetch("/api/business/gift-cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        serviceId: form.serviceId,
        name: form.name,
        discountPercent: Number(form.discountPercent),
        validDays: Number(form.validDays),
        maxUses: Number(form.maxUses),
        salePrice: Number(form.salePrice),
        currency: form.currency,
      }),
    });
    setSaving(false);
    if (!res.ok) {
      setFormError(vi ? "Không tạo được thẻ — kiểm tra lại các ô." : "Couldn't create the card — check the fields.");
      return;
    }
    setForm((f) => ({ ...f, name: "", salePrice: "" }));
    loadAll();
  }

  async function toggleCard(card: CardRow) {
    await fetch(`/api/business/gift-cards/${card.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ active: !card.active }),
    });
    loadAll();
  }

  async function confirmPurchase(id: string) {
    setBusy(true);
    await fetch(`/api/business/gift-cards/purchases/${id}/confirm`, { method: "POST" });
    setBusy(false);
    loadAll();
  }

  async function runLookup(action: "lookup" | "redeem") {
    setBusy(true);
    setLookupError(null);
    const res = await fetch("/api/business/gift-cards/redeem", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, action }),
    });
    const data = await res.json().catch(() => ({}));
    setBusy(false);
    if (data.card) setLookup(data.card);
    else setLookup(null);
    if (!res.ok && action === "lookup") setLookupError(vi ? "Không tìm thấy mã này." : "Code not found.");
    if (!res.ok && action === "redeem" && data.reason) {
      const label = STATE_LABEL[data.reason as PurchaseRow["state"]];
      setLookupError(
        label ? (vi ? `Không dùng được: ${label.vi.toLowerCase()}.` : `Can't redeem: ${label.en.toLowerCase()}.`) : vi ? "Không dùng được." : "Can't redeem."
      );
    }
    if (res.ok && action === "redeem") loadAll();
  }

  return (
    <div className="space-y-8">
      {stats && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {[
            { label: vi ? "Đã bán" : "Sold", value: stats.sold },
            { label: vi ? "Chờ thanh toán" : "Pending", value: stats.pending },
            { label: vi ? "Đang hiệu lực" : "Active", value: stats.active },
            { label: vi ? "Lượt đã dùng" : "Redemptions", value: stats.redeemed },
            {
              label: vi ? "Doanh thu" : "Revenue",
              value: stats.currency ? `${(stats.revenueCents / 100).toFixed(2)} ${stats.currency}` : "—",
            },
          ].map((s) => (
            <div key={s.label} className="card p-4">
              <p className="text-xs text-ink-400">{s.label}</p>
              <p className="mt-1 text-xl font-bold text-ink-900">{s.value}</p>
            </div>
          ))}
        </div>
      )}

      <section className="card space-y-4 p-5">
        <h2 className="font-semibold text-ink-900">{vi ? "Kiểm tra và dùng thẻ" : "Check and redeem a card"}</h2>
        <p className="text-xs text-ink-400">
          {vi
            ? "Nhập mã khách đưa (hoặc quét QR) rồi bấm kiểm tra. Khi khách dùng dịch vụ, bấm Ghi nhận lần dùng."
            : "Enter the code the customer shows (or scan the QR), then check it. When the customer uses it, record the use."}
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder={vi ? "Mã thẻ" : "Card code"}
            className="input flex-1 font-mono tracking-widest"
          />
          <button
            type="button"
            disabled={busy || code.trim().length < 4}
            onClick={() => runLookup("lookup")}
            className="btn-outline"
          >
            {vi ? "Kiểm tra mã" : "Check code"}
          </button>
        </div>
        {lookupError && <p className="text-sm text-berry-500">{lookupError}</p>}
        {lookup && (
          <div className="rounded-xl border border-ink-100 bg-mist-50 p-4 text-sm">
            <p className="font-semibold text-ink-900">
              {lookup.cardName} — {lookup.serviceName} ({vi ? "giảm" : "off"} {lookup.discountPercent}%)
            </p>
            <p className="text-ink-700">
              {vi ? "Khách" : "Customer"}: {lookup.buyerName} · {vi ? "Trạng thái" : "Status"}:{" "}
              <b>{vi ? STATE_LABEL[lookup.state].vi : STATE_LABEL[lookup.state].en}</b>
            </p>
            <p className="text-ink-700">
              {vi ? "Còn" : "Uses left"}: {lookup.usesLeft}/{lookup.maxUses}
              {lookup.expiresAt && ` · ${vi ? "hết hạn" : "expires"} ${new Date(lookup.expiresAt).toLocaleDateString(locale)}`}
            </p>
            {lookup.state === "ACTIVE" && (
              <button
                type="button"
                disabled={busy}
                onClick={() => runLookup("redeem")}
                className="btn-primary mt-3"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {vi ? "Ghi nhận lần dùng" : "Record a use"}
              </button>
            )}
          </div>
        )}
      </section>

      <section className="card space-y-4 p-5">
        <h2 className="font-semibold text-ink-900">{vi ? "Tạo thẻ quà tặng" : "Create a gift card"}</h2>
        {services.length === 0 ? (
          <p className="text-sm text-ink-400">{vi ? "Hãy thêm dịch vụ trước." : "Add a service first."}</p>
        ) : (
          <form onSubmit={createCard} className="grid gap-3 sm:grid-cols-2">
            <label className="sm:col-span-2 text-xs font-medium text-ink-700">
              {vi ? "Dịch vụ" : "Service"}
              <select className="input mt-1" value={form.serviceId} onChange={(e) => setForm({ ...form, serviceId: e.target.value })}>
                {services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name}</option>
                ))}
              </select>
            </label>
            <label className="sm:col-span-2 text-xs font-medium text-ink-700">
              {vi ? "Tên thẻ" : "Card name"}
              <input required className="input mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={vi ? "VD: Ưu đãi cắt tóc mùa thu" : "e.g. Autumn haircut offer"} />
            </label>
            <label className="text-xs font-medium text-ink-700">
              {vi ? "Giảm giá (%)" : "Discount (%)"}
              <input required type="number" min={1} max={100} className="input mt-1" value={form.discountPercent} onChange={(e) => setForm({ ...form, discountPercent: e.target.value })} />
            </label>
            <label className="text-xs font-medium text-ink-700">
              {vi ? "Hiệu lực (ngày sau khi kích hoạt)" : "Valid for (days after activation)"}
              <input required type="number" min={1} className="input mt-1" value={form.validDays} onChange={(e) => setForm({ ...form, validDays: e.target.value })} />
            </label>
            <label className="text-xs font-medium text-ink-700">
              {vi ? "Số lần được dùng" : "Times it can be used"}
              <input required type="number" min={1} className="input mt-1" value={form.maxUses} onChange={(e) => setForm({ ...form, maxUses: e.target.value })} />
            </label>
            <label className="text-xs font-medium text-ink-700">
              {vi ? "Giá bán cho khách" : "Price to the customer"}
              <div className="mt-1 flex gap-2">
                <input required type="number" min={0} step="0.01" className="input flex-1" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} />
                <input className="input w-24" value={form.currency} onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })} maxLength={3} />
              </div>
            </label>
            {formError && <p className="text-sm text-berry-500 sm:col-span-2">{formError}</p>}
            <div className="sm:col-span-2">
              <button type="submit" disabled={saving} className="btn-primary">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {vi ? "Tạo thẻ" : "Create card"}
              </button>
            </div>
          </form>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-ink-900">{vi ? "Thẻ đã tạo" : "Your cards"}</h2>
        {cards === null ? (
          <Loader2 className="h-4 w-4 animate-spin text-ink-400" />
        ) : cards.length === 0 ? (
          <p className="text-sm text-ink-400">{vi ? "Chưa có thẻ nào." : "No cards yet."}</p>
        ) : (
          <ul className="space-y-2">
            {cards.map((c) => (
              <li key={c.id} className="card flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                <div>
                  <p className="font-semibold text-ink-900">{c.name}</p>
                  <p className="text-xs text-ink-400">
                    {c.serviceName} · {vi ? "giảm" : "off"} {c.discountPercent}% · {c.validDays} {vi ? "ngày" : "days"} · {c.maxUses} {vi ? "lần" : "uses"} · {(c.salePriceCents / 100).toFixed(2)} {c.currency}
                  </p>
                </div>
                <button type="button" onClick={() => toggleCard(c)} className="btn-outline !px-3 !py-1.5 text-xs">
                  {c.active ? (vi ? "Ngừng bán" : "Stop selling") : (vi ? "Mở bán lại" : "Resume selling")}
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold text-ink-900">{vi ? "Thẻ đã bán" : "Cards sold"}</h2>
        {purchases === null ? (
          <Loader2 className="h-4 w-4 animate-spin text-ink-400" />
        ) : purchases.length === 0 ? (
          <p className="text-sm text-ink-400">{vi ? "Chưa bán thẻ nào." : "No cards sold yet."}</p>
        ) : (
          <ul className="space-y-2">
            {purchases.map((p) => (
              <li key={p.id} className="card flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                <div>
                  <p className="font-mono font-semibold text-ink-900">{p.code}</p>
                  <p className="text-xs text-ink-400">
                    {p.buyerName} · {p.cardName} · {vi ? "còn" : "left"} {p.usesLeft}/{p.maxUses} · {vi ? "đã dùng" : "used"} {p.redeemedCount}
                  </p>
                  <p className="text-xs text-ink-700">{vi ? STATE_LABEL[p.state].vi : STATE_LABEL[p.state].en}</p>
                </div>
                {p.state === "PENDING" && (
                  <button type="button" disabled={busy} onClick={() => confirmPurchase(p.id)} className="btn-primary !px-3 !py-1.5 text-xs">
                    {vi ? "Xác nhận đã thanh toán" : "Confirm payment"}
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
