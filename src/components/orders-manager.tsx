"use client";

import { useMemo, useState } from "react";
import {
  Banknote,
  Check,
  CircleCheckBig,
  Clock,
  Download,
  Loader2,
  Mail,
  MessageCircle,
  Package,
  Phone,
  Printer,
  RotateCcw,
  Search,
  ShoppingBag,
  TrendingUp,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { formatMoney } from "@/lib/money";
import { fill } from "@/lib/shop-strings";
import { ordersStrings, type OrderTab } from "@/lib/orders-strings";

type Status = "PENDING_PAYMENT" | "CONFIRMED" | "COMPLETED" | "CANCELLED";

interface OrderItemRow {
  id: string;
  name: string;
  unitPriceCents: number;
  qty: number;
  totalCents: number;
  imageId: string | null;
  productId: string | null;
}

interface OrderRow {
  id: string;
  status: Status;
  paymentMethod: "CASH" | "BANK_TRANSFER" | "CHAT";
  totalCents: number;
  currency: string;
  customerNote: string | null;
  createdAt: string;
  items: OrderItemRow[];
  customer: { name: string; email: string | null; phone: string | null };
}

const TABS: OrderTab[] = ["PENDING_PAYMENT", "CONFIRMED", "COMPLETED", "CANCELLED", "all"];
const PERIODS = ["7", "30", "90", "all"] as const;
const DAY = 24 * 60 * 60 * 1000;
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const FIELD =
  "w-full rounded-2xl border border-ink-100 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100";
const STATUS_STYLE: Record<Status, string> = {
  PENDING_PAYMENT: "bg-amber-50 text-amber-700 ring-amber-200",
  CONFIRMED: "bg-primary-100/60 text-primary-700 ring-primary-200",
  COMPLETED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  CANCELLED: "bg-ink-100 text-ink-400 ring-ink-100",
};
const METHOD_ICON = { CASH: Banknote, BANK_TRANSFER: Wallet, CHAT: MessageCircle };

export function orderNo(id: string) {
  return id.slice(-6).toUpperCase();
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}

export function OrdersManager({
  initialOrders,
  locale,
  salonName,
}: {
  initialOrders: OrderRow[];
  locale: string;
  salonName: string;
}) {
  const S = ordersStrings(locale);
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [tab, setTab] = useState<OrderTab>(() => (initialOrders.some((o) => o.status === "PENDING_PAYMENT") ? "PENDING_PAYMENT" : "all"));
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("30");
  const [q, setQ] = useState("");
  const [notify, setNotify] = useState(true);
  const [toast, setToast] = useState<string | null>(null);
  const [now] = useState(() => Date.now());

  const money = (c: number, cur: string) => formatMoney(c, cur, locale);
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(null), 2600);
  }

  function ago(iso: string) {
    const min = Math.floor((now - new Date(iso).getTime()) / 60000);
    if (min < 1) return S.agoNow;
    if (min < 60) return fill(S.agoMin, { n: min });
    if (min < 24 * 60) return fill(S.agoHour, { n: Math.floor(min / 60) });
    return fill(S.agoDay, { n: Math.floor(min / (24 * 60)) });
  }

  async function updateStatus(o: OrderRow, status: Status) {
    if (status === "CANCELLED" && !window.confirm(fill(S.cancelConfirm, { id: orderNo(o.id), name: o.customer.name }))) return;
    setBusyId(o.id);
    const res = await fetch(`/api/business/orders/${o.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, notify }),
    }).catch(() => null);
    setBusyId(null);
    const d = await res?.json().catch(() => null);
    flash(d?.emailed ? S.emailed : S.updated);
    router.refresh();
  }

  const inPeriod = useMemo(
    () => (period === "all" ? initialOrders : initialOrders.filter((o) => now - new Date(o.createdAt).getTime() <= Number(period) * DAY)),
    [initialOrders, period, now]
  );
  const currency = initialOrders[0]?.currency ?? "EUR";
  const live = inPeriod.filter((o) => o.status !== "CANCELLED");
  const revenue = inPeriod.filter((o) => o.status === "COMPLETED").reduce((n, o) => n + o.totalCents, 0);
  const toDo = initialOrders.filter((o) => o.status === "PENDING_PAYMENT" || o.status === "CONFIRMED").length;
  const counts = Object.fromEntries(TABS.map((t) => [t, t === "all" ? initialOrders.length : initialOrders.filter((o) => o.status === t).length])) as Record<OrderTab, number>;

  const top = useMemo(() => {
    const m = new Map<string, { name: string; qty: number; cents: number; imageId: string | null }>();
    for (const o of live) {
      for (const it of o.items) {
        const key = it.productId ?? it.name;
        const x = m.get(key) ?? { name: it.name, qty: 0, cents: 0, imageId: it.imageId };
        x.qty += it.qty;
        x.cents += it.totalCents;
        m.set(key, x);
      }
    }
    return [...m.values()].sort((a, b) => b.qty - a.qty).slice(0, 5);
  }, [live]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return initialOrders.filter(
      (o) =>
        (tab === "all" || o.status === tab) &&
        (!needle ||
          o.customer.name.toLowerCase().includes(needle) ||
          orderNo(o.id).toLowerCase().includes(needle.replace("#", "")) ||
          o.items.some((it) => it.name.toLowerCase().includes(needle)) ||
          (o.customer.email ?? "").toLowerCase().includes(needle) ||
          (o.customer.phone ?? "").includes(needle))
    );
  }, [initialOrders, tab, q]);

  function exportCsv() {
    const cell = (v: string | number | null) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [
      S.csv.map(cell).join(","),
      ...shown.map((o) =>
        [
          orderNo(o.id),
          o.createdAt.slice(0, 16).replace("T", " "),
          o.customer.name,
          o.customer.email,
          o.customer.phone,
          o.items.map((it) => `${it.name} × ${it.qty}`).join("; "),
          money(o.totalCents, o.currency),
          S.methods[o.paymentMethod],
          S.tabs[o.status],
        ]
          .map(cell)
          .join(",")
      ),
    ];
    const blob = new Blob([`﻿${lines.join("\r\n")}`], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `orders-${tab.toLowerCase()}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  /** A printable slip for packing or handing over the order. */
  function printSlip(o: OrderRow) {
    const w = window.open("", "_blank", "width=720,height=900");
    if (!w) return;
    const rowsHtml = o.items
      .map(
        (it) =>
          `<tr><td>${escapeHtml(it.name)}</td><td class="c">${it.qty}</td><td class="r">${escapeHtml(money(it.unitPriceCents, o.currency))}</td><td class="r">${escapeHtml(money(it.totalCents, o.currency))}</td></tr>`
      )
      .join("");
    w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${escapeHtml(fill(S.order, { id: orderNo(o.id) }))}</title>
<style>body{font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;color:#1f182d;margin:40px}h1{font-family:Georgia,serif;font-size:26px;margin:0}.muted{color:#756d84;font-size:13px}
table{width:100%;border-collapse:collapse;margin-top:24px;font-size:14px}th{text-align:left;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#756d84;border-bottom:2px solid #1f182d;padding:8px 4px}
td{padding:10px 4px;border-bottom:1px solid #ebe5f3}.c{text-align:center}.r{text-align:right}.total td{border:0;font-weight:700;font-size:16px;padding-top:16px}.box{margin-top:20px;padding:12px 14px;border:1px dashed #c9a96e;border-radius:10px;font-size:13px}</style></head><body>
<p class="muted">${escapeHtml(salonName)}</p><h1>${escapeHtml(S.slipTitle)} #${orderNo(o.id)}</h1>
<p class="muted">${escapeHtml(S.slipCustomer)}: <b>${escapeHtml(o.customer.name)}</b>${o.customer.phone ? " · " + escapeHtml(o.customer.phone) : ""}<br>${escapeHtml(S.slipDate)}: ${escapeHtml(dateFmt.format(new Date(o.createdAt)))} · ${escapeHtml(S.methods[o.paymentMethod])}</p>
<table><thead><tr><th></th><th class="c">${escapeHtml(S.slipQty)}</th><th class="r">${escapeHtml(S.slipPrice)}</th><th class="r">${escapeHtml(S.slipAmount)}</th></tr></thead><tbody>${rowsHtml}
<tr class="total"><td colspan="3" class="r">${escapeHtml(S.total)}</td><td class="r">${escapeHtml(money(o.totalCents, o.currency))}</td></tr></tbody></table>
${o.customerNote ? `<div class="box"><b>${escapeHtml(S.note)}:</b> ${escapeHtml(o.customerNote)}</div>` : ""}
<script>window.onload=function(){window.print()}</script></body></html>`);
    w.document.close();
  }

  const stepIndex = (s: Status) => (s === "PENDING_PAYMENT" ? 0 : s === "CONFIRMED" ? 1 : s === "COMPLETED" ? 2 : -1);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
                <ShoppingBag className="h-4 w-4" />
                {S.eyebrow}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{S.sub}</p>
            </div>
            <Link href="/business/dashboard/products" className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/20">
              <Package className="h-4 w-4" />
              {S.openShop}
            </Link>
          </div>
          <div className="mt-6 flex flex-wrap gap-1.5">
            {PERIODS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPeriod(p)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${period === p ? "bg-white text-[#1f182d]" : "bg-white/10 text-white/70 hover:bg-white/20"}`}
              >
                {S.periods[p]}
              </button>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
            <div className="rounded-2xl bg-gradient-to-br from-[#e8d3a6] to-[#c99a3f] p-4 text-[#1f182d]">
              <Clock className="h-4 w-4" />
              <p className="mt-3 text-xl font-bold tabular-nums sm:text-2xl">{toDo}</p>
              <p className="mt-0.5 text-[11px] font-bold">{S.statToDo}</p>
            </div>
            {[
              { icon: TrendingUp, label: S.statRevenue, value: money(revenue, currency) },
              { icon: ShoppingBag, label: S.statOrders, value: String(live.length) },
              { icon: Wallet, label: S.statAvg, value: live.length ? money(Math.round(live.reduce((n, o) => n + o.totalCents, 0) / live.length), currency) : "—" },
            ].map((x) => (
              <div key={x.label} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <x.icon className="h-4 w-4 text-[#e8d3a6]" />
                <p className="mt-3 truncate text-xl font-bold tabular-nums sm:text-2xl">{x.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {initialOrders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
            <ShoppingBag className="h-6 w-6" />
          </span>
          <p className="mt-4 text-base font-bold text-ink-900">{S.emptyTitle}</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.emptyText}</p>
          <Link href="/business/dashboard/products" className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
            <Package className="h-4 w-4" />
            {S.openShop}
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="min-w-0 space-y-4">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {TABS.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 transition ${
                    tab === t ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"
                  }`}
                >
                  {S.tabs[t]}
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${tab === t ? "bg-white/15" : t === "PENDING_PAYMENT" && counts[t] ? "bg-amber-100 text-amber-700" : "bg-mist-50 text-ink-400"}`}>
                    {counts[t]}
                  </span>
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-2 rounded-3xl border border-ink-100 bg-white p-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.searchPh} className={`${FIELD} pl-10`} />
              </div>
              <label className="flex shrink-0 items-center gap-2 px-2 text-xs font-semibold text-ink-700">
                <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="h-4 w-4 accent-primary-500" />
                <Mail className="h-3.5 w-3.5 text-ink-400" />
                {S.notify}
              </label>
              <button type="button" onClick={exportCsv} className="flex shrink-0 items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50">
                <Download className="h-4 w-4" />
                {S.export}
              </button>
            </div>

            {shown.length === 0 ? (
              <p className="rounded-3xl bg-white px-6 py-10 text-center text-sm text-ink-400 ring-1 ring-ink-100">{S.noMatch}</p>
            ) : (
              <div className="space-y-3">
                {shown.map((o) => {
                  const step = stepIndex(o.status);
                  const MethodIcon = METHOD_ICON[o.paymentMethod];
                  const busy = busyId === o.id;
                  return (
                    <article
                      key={o.id}
                      className={`rounded-3xl border bg-white p-5 shadow-[0_18px_40px_-36px_rgba(31,24,45,0.6)] ${o.status === "PENDING_PAYMENT" ? "border-amber-200" : "border-ink-100"} ${o.status === "CANCELLED" ? "opacity-75" : ""}`}
                    >
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-2">
                            <span className="font-mono text-sm font-bold tracking-wider text-ink-900">{fill(S.order, { id: orderNo(o.id) })}</span>
                            <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ${STATUS_STYLE[o.status]}`}>{S.tabs[o.status]}</span>
                          </p>
                          <p className="mt-1 text-xs text-ink-400" title={dateFmt.format(new Date(o.createdAt))}>
                            {ago(o.createdAt)} · {dateFmt.format(new Date(o.createdAt))}
                          </p>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-lg font-bold tabular-nums text-ink-900">{money(o.totalCents, o.currency)}</p>
                          <p className="flex items-center gap-1 text-xs text-ink-400 sm:justify-end">
                            <MethodIcon className="h-3.5 w-3.5" />
                            {S.methods[o.paymentMethod]}
                          </p>
                        </div>
                      </div>

                      {/* Customer */}
                      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 rounded-2xl bg-mist-50/60 px-3.5 py-2.5 text-sm ring-1 ring-ink-100">
                        <span className="font-bold text-ink-900">{o.customer.name}</span>
                        {o.customer.phone && (
                          <a href={`tel:${o.customer.phone}`} className="flex items-center gap-1 text-xs text-ink-700 hover:text-primary-600">
                            <Phone className="h-3.5 w-3.5" />
                            {o.customer.phone}
                          </a>
                        )}
                        {o.customer.email && (
                          <a href={`mailto:${o.customer.email}`} className="flex min-w-0 items-center gap-1 truncate text-xs text-ink-700 hover:text-primary-600">
                            <Mail className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{o.customer.email}</span>
                          </a>
                        )}
                      </div>

                      {/* Items */}
                      <ul className="mt-3 divide-y divide-ink-100">
                        {o.items.map((it) => (
                          <li key={it.id} className="flex items-center gap-3 py-2.5 text-sm">
                            {it.imageId ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img src={`/api/product-image/${it.imageId}`} alt="" className="h-11 w-11 shrink-0 rounded-xl object-cover ring-1 ring-ink-100" />
                            ) : (
                              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mist-50 text-ink-300 ring-1 ring-ink-100">
                                <Package className="h-5 w-5" />
                              </span>
                            )}
                            <span className="min-w-0 flex-1">
                              <span className="block truncate font-semibold text-ink-900">{it.name}</span>
                              <span className="text-xs text-ink-400">
                                {it.qty} × {money(it.unitPriceCents, o.currency)}
                              </span>
                            </span>
                            <span className="shrink-0 font-semibold tabular-nums text-ink-900">{money(it.totalCents, o.currency)}</span>
                          </li>
                        ))}
                      </ul>

                      {o.customerNote && (
                        <p className="mt-2 rounded-2xl bg-[#fffaf0] px-3.5 py-2.5 text-xs text-[#6b5221] ring-1 ring-[#ecd9ad]">
                          <span className="font-bold">{S.note}: </span>
                          {o.customerNote}
                        </p>
                      )}

                      {/* Progress */}
                      {step >= 0 && (
                        <ol className="mt-4 flex items-center">
                          {S.steps.map((label, i) => (
                            <li key={label} className={`flex items-center ${i < S.steps.length - 1 ? "flex-1" : ""}`}>
                              <span className="flex items-center gap-1.5">
                                <span
                                  className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold ${
                                    i <= step ? "bg-gradient-to-br from-[#624f89] to-[#1f182d] text-[#e8d3a6]" : "bg-mist-50 text-ink-300 ring-1 ring-ink-100"
                                  }`}
                                >
                                  {i < step ? <Check className="h-3.5 w-3.5" /> : i + 1}
                                </span>
                                <span className={`text-[11px] font-semibold ${i <= step ? "text-ink-900" : "text-ink-300"}`}>{label}</span>
                              </span>
                              {i < S.steps.length - 1 && <span className={`mx-2 h-0.5 flex-1 rounded-full ${i < step ? "bg-[#c99a3f]" : "bg-ink-100"}`} />}
                            </li>
                          ))}
                        </ol>
                      )}

                      {/* Actions */}
                      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-ink-100 pt-3">
                        {o.status === "PENDING_PAYMENT" && (
                          <button type="button" disabled={busy} onClick={() => updateStatus(o, "CONFIRMED")} className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold disabled:opacity-60 ${GOLD_BTN}`}>
                            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                            {S.confirm}
                          </button>
                        )}
                        {o.status === "CONFIRMED" && (
                          <button type="button" disabled={busy} onClick={() => updateStatus(o, "COMPLETED")} className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold disabled:opacity-60 ${GOLD_BTN}`}>
                            {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <CircleCheckBig className="h-3.5 w-3.5" />}
                            {S.complete}
                          </button>
                        )}
                        {o.status === "CANCELLED" && (
                          <button type="button" disabled={busy} onClick={() => updateStatus(o, "PENDING_PAYMENT")} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-100/40 disabled:opacity-60">
                            <RotateCcw className="h-3.5 w-3.5" />
                            {S.reopen}
                          </button>
                        )}
                        <button type="button" onClick={() => printSlip(o)} className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink-700 hover:bg-mist-50">
                          <Printer className="h-3.5 w-3.5" />
                          {S.print}
                        </button>
                        {(o.status === "PENDING_PAYMENT" || o.status === "CONFIRMED") && (
                          <button type="button" disabled={busy} onClick={() => updateStatus(o, "CANCELLED")} className="ml-auto flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-berry-500 hover:bg-berry-50 disabled:opacity-60">
                            <XCircle className="h-3.5 w-3.5" />
                            {S.cancel}
                          </button>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>

          <aside>
            <section className="rounded-3xl border border-ink-100 bg-white p-5 xl:sticky xl:top-24">
              <p className="flex items-center gap-2 font-bold text-ink-900">
                <TrendingUp className="h-4 w-4 text-[#c99a3f]" />
                {S.topTitle}
              </p>
              <p className="text-[11px] text-ink-400">{S.periods[period]}</p>
              {top.length === 0 ? (
                <p className="mt-3 text-sm text-ink-400">{S.topEmpty}</p>
              ) : (
                <ol className="mt-3 space-y-3">
                  {top.map((p, i) => (
                    <li key={p.name} className="flex items-center gap-3 text-sm">
                      <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${i === 0 ? "bg-[#e8d3a6] text-[#1f182d]" : "bg-mist-50 text-ink-400"}`}>{i + 1}</span>
                      {p.imageId ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/api/product-image/${p.imageId}`} alt="" className="h-9 w-9 shrink-0 rounded-xl object-cover" />
                      ) : (
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-mist-50 text-ink-300">
                          <Package className="h-4 w-4" />
                        </span>
                      )}
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold text-ink-900">{p.name}</span>
                        <span className="text-[11px] text-ink-400">{fill(S.sold, { n: p.qty })}</span>
                      </span>
                      <span className="shrink-0 text-xs font-bold tabular-nums text-ink-900">{money(p.cents, currency)}</span>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </aside>
        </div>
      )}

      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-[90] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          <Check className="h-4 w-4 text-[#e8d3a6]" />
          {toast}
          <button type="button" onClick={() => setToast(null)} aria-label="close" className="ml-1 opacity-60">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
