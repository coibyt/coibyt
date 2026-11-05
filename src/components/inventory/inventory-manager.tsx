"use client";

import { useMemo, useState } from "react";
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowLeftRight,
  ArrowUpFromLine,
  BarChart3,
  Boxes,
  CalendarClock,
  TrendingDown,
  Check,
  ClipboardCopy,
  History,
  Loader2,
  MapPin,
  PackageX,
  Pencil,
  Plus,
  Printer,
  QrCode,
  Search,
  ShoppingCart,
  Trash2,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { formatMoney } from "@/lib/money";
import type { InventoryStrings } from "@/lib/inventory-strings";
import type { InventoryData, InventoryItemRow } from "@/lib/inventory-data";
import { ScanSheet } from "@/components/inventory/scan-sheet";
import { ReportTab } from "@/components/inventory/report-tab";
import {
  CATEGORIES,
  INPUT,
  ItemForm,
  ItemThumb,
  STATUS_STYLE,
  Stepper,
  emptyFields,
  fieldsPayload,
  fullName,
  photoUrl,
  statusOf,
  type ItemFields,
} from "@/components/inventory/parts";

export type Tab = "stock" | "buy" | "history" | "places" | "report";

const DAY = 24 * 60 * 60 * 1000;
/** Expires within 30 days (or already has), with something still on the shelf. */
const expiringSoon = (i: InventoryItemRow) => !!i.expiresAt && i.qty > 0 && new Date(i.expiresAt).getTime() - Date.now() < 30 * DAY;
/** At the last 30 days' pace, gone within this many days. */
const FORECAST_DAYS = 7;
const runsOutSoon = (i: InventoryItemRow) => i.daysLeft != null && i.daysLeft <= FORECAST_DAYS;

const send = (url: string, method: string, body?: unknown) =>
  fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body === undefined ? undefined : JSON.stringify(body) })
    .then(async (r) => ({ ok: r.ok, d: await r.json().catch(() => ({})) }))
    .catch(() => ({ ok: false, d: {} as Record<string, unknown> }));

/** The stock page: what the branch has, what to buy, every scan, and the
 * cupboards — plus the scanner and each item's details. */
export function InventoryManager({
  S,
  locale,
  initial,
  branchName,
  canWrite,
  isOwner,
  initialTab = "stock",
}: {
  S: InventoryStrings;
  locale: string;
  initial: InventoryData;
  branchName: string;
  canWrite: boolean;
  isOwner: boolean;
  initialTab?: Tab;
}) {
  const [data, setData] = useState(initial);
  const [tab, setTab] = useState<Tab>(initialTab);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | null>(null);
  const [place, setPlace] = useState<string>("");
  const [allBranches, setAllBranches] = useState(false);
  const [scanner, setScanner] = useState<"IN" | "OUT" | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);
  const [adding, setAdding] = useState<ItemFields | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [newPlace, setNewPlace] = useState("");

  async function reload() {
    const r = await fetch("/api/business/inventory").catch(() => null);
    if (!r?.ok) return null;
    const d: InventoryData = await r.json();
    setData(d);
    return d;
  }

  const unit = (it: InventoryItemRow) => S.units[it.unit] ?? it.unit;
  const placeName = (id: string | null) => data.locations.find((l) => l.id === id)?.name ?? null;
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  const dayFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });
  const money = (cents: number) => formatMoney(cents, data.currency, locale);
  const expiring = data.items.filter(expiringSoon).sort((a, b) => (a.expiresAt ?? "").localeCompare(b.expiresAt ?? ""));
  const hasCosts = data.items.some((i) => i.costCents != null);

  const low = data.items.filter((i) => statusOf(i) === "low");
  const out = data.items.filter((i) => statusOf(i) === "out");
  const toBuy = data.items.filter((i) => i.min > 0 && i.qty <= i.min).sort((a, b) => a.qty - b.qty);
  // Not at the minimum yet, but going fast.
  const forecast = data.items.filter((i) => i.qty > 0 && !(i.min > 0 && i.qty <= i.min) && runsOutSoon(i)).sort((a, b) => (a.daysLeft ?? 0) - (b.daysLeft ?? 0));

  const shown = useMemo(() => {
    const words = q.trim().toLowerCase();
    return data.items.filter(
      (i) =>
        (!cat || i.category === cat) &&
        (!place || (place === "-" ? !i.locationId : i.locationId === place)) &&
        (!words || `${i.name} ${i.color ?? ""} ${i.brand ?? ""} ${i.barcode ?? ""}`.toLowerCase().includes(words)),
    );
  }, [data.items, q, cat, place]);

  const open = data.items.find((i) => i.id === openId) ?? null;

  async function addItem() {
    if (!adding) return;
    setBusy(true);
    setError(null);
    const r = await send("/api/business/inventory/items", "POST", fieldsPayload(adding));
    setBusy(false);
    if (!r.ok) return setError(r.d.error === "BARCODE_TAKEN" ? S.errBarcodeTaken : S.errGeneric);
    setAdding(null);
    await reload();
    setOpenId(String(r.d.id));
  }

  async function addPlace() {
    if (!newPlace.trim()) return;
    const r = await send("/api/business/inventory/locations", "POST", { name: newPlace.trim() });
    if (r.ok) {
      setNewPlace("");
      await reload();
    }
  }

  function buyText() {
    return [`${S.buyTitle} — ${branchName}`, ...toBuy.map((i) => `• ${i.name}${i.brand ? ` (${i.brand})` : ""}: ${fill(S.buyQty, { n: buyQty(i) })} ${unit(i)}`)].join("\n");
  }
  const buyQty = (i: InventoryItemRow) => Math.max(1, i.min * 2 - i.qty);
  const buyCost = toBuy.reduce((sum, i) => sum + buyQty(i) * (i.costCents ?? 0), 0);

  const stats = [
    { icon: Boxes, label: S.statItems, value: data.items.length },
    { icon: AlertTriangle, label: S.statLow, value: low.length, tone: low.length ? "text-amber-300" : "" },
    { icon: PackageX, label: S.statOut, value: out.length, tone: out.length ? "text-rose-300" : "" },
    { icon: ArrowUpFromLine, label: S.statUsed, value: data.used7 },
  ];
  const tabs: { id: Tab; label: string; icon: typeof Boxes; badge?: number }[] = [
    { id: "stock", label: S.tabStock, icon: Boxes },
    { id: "buy", label: S.tabBuy, icon: ShoppingCart, badge: toBuy.length + forecast.length },
    { id: "history", label: S.tabHistory, icon: History },
    { id: "places", label: S.tabPlaces, icon: QrCode },
    { id: "report", label: S.tabReport, icon: BarChart3 },
  ];

  return (
    <div className="space-y-5">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-[#1f182d] via-[#2d2342] to-[#3b2d57] p-6 text-white shadow-[0_30px_70px_-40px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#c99a3f]/25 blur-3xl" />
        <p className="relative text-[11px] font-bold uppercase tracking-[0.25em] text-[#e8d3a6]">
          {S.eyebrow} · {branchName}
        </p>
        <h1 className="relative mt-2 font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
        <p className="relative mt-2 max-w-2xl text-sm text-white/70">{S.sub}</p>
        <div className="relative mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-white/10 p-3.5 ring-1 ring-white/10">
              <s.icon className={`h-4 w-4 ${s.tone || "text-[#e8d3a6]"}`} />
              <p className={`mt-2 text-2xl font-extrabold tabular-nums ${s.tone ?? ""}`}>{s.value}</p>
              <p className="text-[11px] text-white/60">{s.label}</p>
            </div>
          ))}
        </div>
        {hasCosts && (
          <p className="relative mt-3 flex flex-wrap gap-x-5 gap-y-1 text-xs text-white/70">
            <span>
              {S.statValue}: <strong className="text-[#e8d3a6]">{money(data.stockValue)}</strong>
            </span>
            <span>
              {S.spent30}: <strong className="text-[#e8d3a6]">{money(data.spent30)}</strong>
            </span>
          </p>
        )}
        {canWrite && (
          <div className="relative mt-5 grid grid-cols-2 gap-2.5 sm:flex">
            <button
              type="button"
              onClick={() => setScanner("IN")}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 px-6 text-base font-bold shadow-lg"
            >
              <ArrowDownToLine className="h-5 w-5" />
              {S.scanIn}
            </button>
            <button
              type="button"
              onClick={() => setScanner("OUT")}
              className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#e0559b] to-[#a3155f] px-6 text-base font-bold shadow-lg"
            >
              <ArrowUpFromLine className="h-5 w-5" />
              {S.scanOut}
            </button>
            <button
              type="button"
              onClick={() => setAdding(emptyFields())}
              className="col-span-2 flex h-12 items-center justify-center gap-2 rounded-2xl bg-white/10 px-5 text-sm font-bold ring-1 ring-white/20 hover:bg-white/15 sm:h-14"
            >
              <Plus className="h-4 w-4" />
              {S.addItem}
            </button>
          </div>
        )}
        {!canWrite && <p className="relative mt-4 text-xs text-white/60">{S.readOnly}</p>}
      </section>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-full bg-white p-1 ring-1 ring-ink-100">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex shrink-0 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-bold transition ${
              tab === t.id ? "bg-[#1f182d] text-white" : "text-ink-500 hover:text-ink-900"
            }`}
          >
            <t.icon className="h-4 w-4" />
            {t.label}
            {!!t.badge && <span className="rounded-full bg-amber-400 px-1.5 text-[11px] font-extrabold text-[#1f182d]">{t.badge}</span>}
          </button>
        ))}
      </div>

      {tab === "stock" && (
        <section className="space-y-3">
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.search} className={`${INPUT} pl-10`} />
            </div>
            {data.locations.length > 0 && (
              <select value={place} onChange={(e) => setPlace(e.target.value)} className={`${INPUT} sm:w-52`}>
                <option value="">{S.allPlaces}</option>
                {data.locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
                <option value="-">{S.noPlace}</option>
              </select>
            )}
            {data.branches.length > 1 && (
              <div className="grid shrink-0 grid-cols-2 gap-1 rounded-2xl bg-white p-1 ring-1 ring-ink-100">
                {[false, true].map((all) => (
                  <button
                    key={String(all)}
                    type="button"
                    onClick={() => setAllBranches(all)}
                    className={`rounded-xl px-3 py-2 text-xs font-bold ${allBranches === all ? "bg-[#624f89] text-white" : "text-ink-500"}`}
                  >
                    {all ? S.allBranches : S.thisBranch}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            {[null, ...CATEGORIES].map((c) => (
              <button
                key={c ?? "all"}
                type="button"
                onClick={() => setCat(c)}
                className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${cat === c ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-600 ring-ink-100"}`}
              >
                {c ? S.categories[c] : S.allCategories}
              </button>
            ))}
          </div>

          {data.items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-200 bg-white px-6 py-12 text-center">
              <Boxes className="mx-auto h-10 w-10 text-[#8b6fc0]" />
              <p className="mt-3 font-serif text-2xl text-ink-900">{S.emptyTitle}</p>
              <p className="mx-auto mt-2 max-w-md text-sm text-ink-500">{S.emptyText}</p>
            </div>
          ) : shown.length === 0 ? (
            <p className="rounded-3xl bg-white px-4 py-10 text-center text-sm text-ink-400 ring-1 ring-ink-100">{S.noMatch}</p>
          ) : allBranches ? (
            <div className="overflow-x-auto rounded-3xl bg-white ring-1 ring-ink-100">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="bg-mist-50/70 text-left text-[11px] font-bold uppercase tracking-wider text-ink-400">
                  <tr>
                    <th className="px-4 py-3">{S.name}</th>
                    {data.branches.map((b) => (
                      <th key={b.id} className="px-3 py-3 text-right">
                        {b.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-100">
                  {shown.map((i) => (
                    <tr key={i.id} className="hover:bg-mist-50/50">
                      <td className="px-4 py-2.5">
                        <button type="button" onClick={() => setOpenId(i.id)} className="flex items-center gap-2.5 text-left">
                          <ItemThumb src={photoUrl(i)} size="h-9 w-9" />
                          <span className="font-semibold text-ink-900">{i.name}</span>
                        </button>
                      </td>
                      {data.branches.map((b) => {
                        const n = i.byBranch?.[b.id] ?? 0;
                        return (
                          <td key={b.id} className={`px-3 py-2.5 text-right font-bold tabular-nums ${n <= 0 ? "text-rose-500" : n <= i.itemMin ? "text-amber-600" : "text-ink-900"}`}>
                            {n}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <ul className="grid gap-2.5 sm:grid-cols-2">
              {shown.map((i) => {
                const st = statusOf(i);
                return (
                  <li key={i.id}>
                    <button
                      type="button"
                      onClick={() => setOpenId(i.id)}
                      className="flex w-full items-center gap-3 rounded-3xl bg-white p-3 text-left ring-1 ring-ink-100 transition hover:shadow-[0_14px_30px_-24px_rgba(31,24,45,0.6)]"
                    >
                      <ItemThumb src={photoUrl(i)} size="h-14 w-14" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-ink-900">{i.name}</span>
                        <span className="block truncate text-xs text-ink-400">
                          {[i.color, i.brand, i.category ? S.categories[i.category] : null].filter(Boolean).join(" · ") || "—"}
                        </span>
                        <span className="mt-1 flex items-center gap-1 truncate text-[11px] text-ink-500">
                          <MapPin className="h-3 w-3 shrink-0" />
                          {placeName(i.locationId) ?? S.noPlace}
                        </span>
                        {i.qty > 0 && runsOutSoon(i) && (
                          <span className="mr-1 mt-1 inline-flex items-center gap-1 rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-700 ring-1 ring-sky-200">
                            <TrendingDown className="h-3 w-3" />
                            {fill(S.daysLeft, { n: i.daysLeft ?? 0 })}
                          </span>
                        )}
                        {expiringSoon(i) && (
                          <span className="mt-1 inline-flex items-center gap-1 rounded-full bg-orange-50 px-2 py-0.5 text-[10px] font-bold text-orange-700 ring-1 ring-orange-200" suppressHydrationWarning>
                            <CalendarClock className="h-3 w-3" />
                            {new Date(i.expiresAt!).getTime() < Date.now() ? S.expired : fill(S.expiresOn, { date: dayFmt.format(new Date(i.expiresAt!)) })}
                          </span>
                        )}
                      </span>
                      <span className="shrink-0 text-right">
                        <span className="block text-2xl font-extrabold tabular-nums text-ink-900">{i.qty}</span>
                        <span className="block text-[11px] text-ink-400">{unit(i)}</span>
                        <span className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ring-1 ${STATUS_STYLE[st]}`}>
                          {st === "out" ? S.statusOut : st === "low" ? S.statusLow : S.statusOk}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {tab === "buy" && (
        <section className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink-100">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-ink-100 p-5">
            <div>
              <p className="text-base font-bold text-ink-900">{S.buyTitle}</p>
              <p className="mt-0.5 max-w-lg text-xs text-ink-400">{S.buySub}</p>
              {buyCost > 0 && <p className="mt-1.5 text-sm font-bold text-[#8a6a2b]">{fill(S.buyEstimate, { amount: money(buyCost) })}</p>}
            </div>
            {toBuy.length > 0 && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    void navigator.clipboard?.writeText(buyText());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50"
                >
                  {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <ClipboardCopy className="h-3.5 w-3.5" />}
                  {copied ? S.copied : S.copyList}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const w = window.open("", "_blank");
                    if (!w) return;
                    w.document.write(`<pre style="font:16px/1.6 system-ui;padding:24px;white-space:pre-wrap">${buyText().replace(/</g, "&lt;")}</pre>`);
                    w.document.close();
                    w.print();
                  }}
                  className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50"
                >
                  <Printer className="h-3.5 w-3.5" />
                  {S.printList}
                </button>
              </div>
            )}
          </div>
          {toBuy.length === 0 ? (
            forecast.length === 0 && expiring.length === 0 && <p className="px-5 py-10 text-center text-sm text-ink-400">{S.buyEmpty}</p>
          ) : (
            <ul className="divide-y divide-ink-100">
              {toBuy.map((i) => {
                const st = statusOf(i);
                return (
                  <li key={i.id}>
                    <button type="button" onClick={() => setOpenId(i.id)} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-mist-50/60">
                      <ItemThumb src={photoUrl(i)} size="h-11 w-11" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-ink-900">{i.name}</span>
                        <span className="block text-xs text-ink-400">
                          {fill(S.left, { n: `${i.qty} ${unit(i)}` })} · {fill(S.min, { n: i.min })}
                        </span>
                      </span>
                      <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ring-1 ${STATUS_STYLE[st]}`}>{fill(S.buyQty, { n: buyQty(i) })}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {forecast.length > 0 && (
            <div className="border-t border-ink-100">
              <div className="px-5 pt-5">
                <p className="flex items-center gap-2 text-base font-bold text-ink-900">
                  <TrendingDown className="h-4 w-4 text-sky-600" />
                  {S.forecastTitle}
                </p>
                <p className="mt-0.5 text-xs text-ink-400">{S.forecastSub}</p>
              </div>
              <ul className="mt-2 divide-y divide-ink-100">
                {forecast.map((i) => (
                  <li key={i.id}>
                    <button type="button" onClick={() => setOpenId(i.id)} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-mist-50/60">
                      <ItemThumb src={photoUrl(i)} size="h-11 w-11" />
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-bold text-ink-900">{i.name}</span>
                        <span className="block text-xs text-ink-400">
                          {fill(S.left, { n: `${i.qty} ${unit(i)}` })} · {fill(S.forecastLine, { n: i.perDay.toFixed(1).replace(".0", ""), d: i.daysLeft ?? 0 })}
                        </span>
                      </span>
                      <span className="shrink-0 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700 ring-1 ring-sky-200">{fill(S.daysLeft, { n: i.daysLeft ?? 0 })}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {expiring.length > 0 && (
            <div className="border-t border-ink-100">
              <div className="px-5 pt-5">
                <p className="flex items-center gap-2 text-base font-bold text-ink-900">
                  <CalendarClock className="h-4 w-4 text-orange-600" />
                  {S.expiringTitle}
                </p>
                <p className="mt-0.5 text-xs text-ink-400">{S.expiringSub}</p>
              </div>
              <ul className="mt-2 divide-y divide-ink-100">
                {expiring.map((i) => {
                  const past = new Date(i.expiresAt!).getTime() < Date.now();
                  return (
                    <li key={i.id}>
                      <button type="button" onClick={() => setOpenId(i.id)} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-mist-50/60">
                        <ItemThumb src={photoUrl(i)} size="h-11 w-11" />
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-bold text-ink-900">{i.name}</span>
                          <span className="block text-xs text-ink-400">{fill(S.left, { n: `${i.qty} ${unit(i)}` })}</span>
                        </span>
                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ring-1 ${past ? "bg-rose-50 text-rose-600 ring-rose-200" : "bg-orange-50 text-orange-700 ring-orange-200"}`}
                          suppressHydrationWarning
                        >
                          {past ? S.expired : fill(S.expiresOn, { date: dayFmt.format(new Date(i.expiresAt!)) })}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </section>
      )}

      {tab === "history" && (
        <section className="overflow-hidden rounded-3xl bg-white ring-1 ring-ink-100">
          {data.moves.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-ink-400">{S.historyEmpty}</p>
          ) : (
            <ul className="divide-y divide-ink-100">
              {data.moves.map((m) => (
                <li key={m.id} className="flex items-center gap-3 px-5 py-3">
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                      m.kind === "IN" ? "bg-emerald-50 text-emerald-600" : m.kind === "OUT" ? "bg-rose-50 text-rose-500" : m.kind.startsWith("XFER") ? "bg-sky-50 text-sky-600" : "bg-mist-50 text-[#624f89]"
                    }`}
                  >
                    {m.kind === "IN" ? (
                      <ArrowDownToLine className="h-4 w-4" />
                    ) : m.kind === "OUT" ? (
                      <ArrowUpFromLine className="h-4 w-4" />
                    ) : m.kind.startsWith("XFER") ? (
                      <ArrowLeftRight className="h-4 w-4" />
                    ) : m.kind === "SALE" || m.kind === "RETURN" ? (
                      <ShoppingCart className="h-4 w-4" />
                    ) : (
                      <Pencil className="h-4 w-4" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-ink-900">{m.itemName}</span>
                    <span className="block truncate text-[11px] text-ink-400" suppressHydrationWarning>
                      {S[`move${m.kind}` as "moveIN"] ?? m.kind}
                      {m.note ? ` ${m.note}` : ""} · {dateFmt.format(new Date(m.createdAt))}
                      {m.byName ? ` · ${fill(S.by, { name: m.byName })}` : ""}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span className={`block text-sm font-extrabold tabular-nums ${m.delta > 0 ? "text-emerald-600" : m.delta < 0 ? "text-rose-500" : "text-ink-500"}`}>
                      {m.delta > 0 ? "+" : ""}
                      {m.delta}
                    </span>
                    <span className="block text-[11px] text-ink-400">→ {m.qtyAfter}</span>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}

      {tab === "places" && (
        <section className="rounded-3xl bg-white p-5 ring-1 ring-ink-100">
          <p className="text-base font-bold text-ink-900">{S.placesTitle}</p>
          <p className="mt-0.5 max-w-xl text-xs text-ink-400">{S.placesSub}</p>
          {canWrite && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                void addPlace();
              }}
              className="mt-4 flex gap-2"
            >
              <input value={newPlace} onChange={(e) => setNewPlace(e.target.value)} maxLength={80} placeholder={S.placeName} className={`${INPUT} flex-1`} />
              <button type="submit" className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-[#1f182d] px-4 text-sm font-bold text-white">
                <Plus className="h-4 w-4" />
                {S.addPlace}
              </button>
            </form>
          )}
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {data.locations.map((l) => (
              <li key={l.id} className="flex items-center gap-3 rounded-2xl bg-mist-50/60 p-3 ring-1 ring-ink-100">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#624f89] ring-1 ring-ink-100">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-bold text-ink-900">{l.name}</span>
                  <span className="block text-[11px] text-ink-400">
                    {fill(S.itemsIn, { n: l.count })} · VL-{l.code}
                  </span>
                </span>
                {canWrite && (
                  <span className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      title={S.rename}
                      onClick={async () => {
                        const name = window.prompt(S.rename, l.name)?.trim();
                        if (name && name !== l.name) {
                          await send(`/api/business/inventory/locations/${l.id}`, "PATCH", { name });
                          await reload();
                        }
                      }}
                      className="rounded-full p-2 text-ink-400 hover:bg-white hover:text-ink-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      title={S.delete}
                      onClick={async () => {
                        if (!window.confirm(`${S.delete}: ${l.name}?`)) return;
                        await send(`/api/business/inventory/locations/${l.id}`, "DELETE");
                        await reload();
                      }}
                      className="rounded-full p-2 text-ink-400 hover:bg-white hover:text-rose-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </span>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/business/dashboard/inventory/labels?kind=places"
              target="_blank"
              className="flex items-center gap-1.5 rounded-full bg-[#624f89] px-4 py-2.5 text-xs font-bold text-white"
            >
              <Printer className="h-3.5 w-3.5" />
              {S.printPlaceLabels}
            </Link>
            <Link
              href="/business/dashboard/inventory/labels?kind=items"
              target="_blank"
              className="flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-bold text-[#4b3878] ring-1 ring-[#e4dcef]"
            >
              <QrCode className="h-3.5 w-3.5" />
              {S.printItemLabels}
            </Link>
          </div>
        </section>
      )}

      {tab === "report" && <ReportTab S={S} locale={locale} />}

      {scanner && <ScanSheet S={S} initialMode={scanner} data={data} reload={reload} onClose={() => setScanner(null)} />}

      {adding && (
        <Sheet onClose={() => setAdding(null)} title={S.addItem}>
          <ItemForm S={S} value={adding} onChange={setAdding} currency={data.currency} />
          {error && <p className="mt-3 text-xs font-semibold text-rose-600">{error}</p>}
          <button
            type="button"
            disabled={busy || !adding.name.trim()}
            onClick={addItem}
            className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#1f182d] text-sm font-bold text-white disabled:opacity-50"
          >
            {busy && <Loader2 className="h-4 w-4 animate-spin" />}
            {S.save}
          </button>
        </Sheet>
      )}

      {open && (
        <ItemDrawer
          key={open.id}
          S={S}
          item={open}
          data={data}
          canWrite={canWrite}
          isOwner={isOwner}
          dateFmt={dateFmt}
          reload={reload}
          onClose={() => setOpenId(null)}
        />
      )}
    </div>
  );
}

function Sheet({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1f182d]/50 backdrop-blur-sm sm:items-center sm:p-6" onClick={onClose}>
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-white p-5 sm:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between gap-3">
          <p className="text-lg font-bold text-ink-900">{title}</p>
          <button type="button" onClick={onClose} className="rounded-full p-2 text-ink-400 hover:bg-mist-50">
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

/** One item: its count here (quick in/out, a counted correction), where it
 * is kept, this branch's minimum, its details and its recent history. */
function ItemDrawer({
  S,
  item,
  data,
  canWrite,
  isOwner,
  dateFmt,
  reload,
  onClose,
}: {
  S: InventoryStrings;
  item: InventoryItemRow;
  data: InventoryData;
  canWrite: boolean;
  isOwner: boolean;
  dateFmt: Intl.DateTimeFormat;
  reload: () => Promise<InventoryData | null>;
  onClose: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState<ItemFields>({
    name: item.name,
    brand: item.brand ?? "",
    category: item.category,
    unit: item.unit,
    barcode: item.barcode ?? "",
    color: item.color ?? "",
    minQty: item.itemMin,
    costCents: item.costCents,
    note: item.note ?? "",
    photo: photoUrl(item),
  });
  // The owner's other branches, to move some of this item to.
  const otherBranches = data.branches.filter((b) => b.id !== data.currentBranchId);
  const [xferTo, setXferTo] = useState("");
  const [xferQty, setXferQty] = useState(1);
  const [count, setCount] = useState(item.qty);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const unit = S.units[item.unit] ?? item.unit;
  const history = data.moves.filter((m) => m.itemId === item.id).slice(0, 8);

  async function run(p: Promise<{ ok: boolean; d: Record<string, unknown> }>) {
    setBusy(true);
    setMsg(null);
    const r = await p;
    setBusy(false);
    if (!r.ok) {
      setMsg({
        ok: false,
        text:
          r.d.error === "NOT_ENOUGH"
            ? fill(S.notEnough, { n: Number(r.d.qty ?? 0) })
            : r.d.error === "BARCODE_TAKEN"
              ? S.errBarcodeTaken
              : r.d.error === "PRODUCT_TAKEN"
                ? S.errProductTaken
                : S.errGeneric,
      });
      return false;
    }
    const d = await reload();
    const fresh = d?.items.find((i) => i.id === item.id);
    if (fresh) setCount(fresh.qty);
    return true;
  }

  const quick = (kind: "IN" | "OUT") => run(send("/api/business/inventory/move", "POST", { itemId: item.id, kind, qty: 1 }));

  return (
    <Sheet title={fullName(item)} onClose={onClose}>
      <div className="flex items-center gap-4">
        <ItemThumb src={photoUrl(item)} size="h-20 w-20" />
        <div className="min-w-0 flex-1">
          {item.brand && <p className="truncate text-sm text-ink-500">{item.brand}</p>}
          <p className="text-4xl font-extrabold tabular-nums text-ink-900">
            {item.qty} <span className="text-base font-semibold text-ink-400">{unit}</span>
          </p>
          <p className="text-xs text-ink-400">{fill(S.min, { n: item.min })}</p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-sky-700">
            <TrendingDown className="h-3.5 w-3.5 shrink-0" />
            {item.daysLeft != null ? fill(S.forecastLine, { n: item.perDay.toFixed(1).replace(".0", ""), d: item.daysLeft }) : S.forecastNone}
          </p>
        </div>
      </div>

      {canWrite && (
        <div className="mt-4 grid grid-cols-2 gap-2">
          <button type="button" disabled={busy} onClick={() => quick("OUT")} className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-rose-50 text-sm font-bold text-rose-600 ring-1 ring-rose-200">
            <ArrowUpFromLine className="h-4 w-4" /> −1
          </button>
          <button type="button" disabled={busy} onClick={() => quick("IN")} className="flex h-12 items-center justify-center gap-1.5 rounded-2xl bg-emerald-50 text-sm font-bold text-emerald-700 ring-1 ring-emerald-200">
            <ArrowDownToLine className="h-4 w-4" /> +1
          </button>
        </div>
      )}
      {msg && <p className={`mt-3 text-xs font-semibold ${msg.ok ? "text-emerald-700" : "text-rose-600"}`}>{msg.text}</p>}

      {canWrite && (
        <div className="mt-5 space-y-3 rounded-2xl bg-mist-50/60 p-4 ring-1 ring-ink-100">
          <div>
            <p className="text-xs font-bold text-ink-700">{S.countTitle}</p>
            <p className="text-[11px] text-ink-400">{S.countHint}</p>
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <Stepper value={count} onChange={setCount} min={0} />
              <button
                type="button"
                disabled={busy || count === item.qty}
                onClick={() => run(send("/api/business/inventory/move", "POST", { itemId: item.id, kind: "COUNT", qty: count }))}
                className="h-12 rounded-2xl bg-[#1f182d] px-4 text-sm font-bold text-white disabled:opacity-40"
              >
                {S.setCount}
              </button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-bold text-ink-700">
              {S.where}
              <select
                value={item.locationId ?? ""}
                onChange={(e) => run(send(`/api/business/inventory/items/${item.id}`, "PATCH", { locationId: e.target.value || null }))}
                className={`${INPUT} mt-1`}
              >
                <option value="">{S.noPlace}</option>
                {data.locations.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="col-span-2 block text-xs font-bold text-ink-700">
              {S.expiry}
              <input
                type="date"
                defaultValue={item.expiresAt ?? ""}
                onChange={(e) => void run(send(`/api/business/inventory/items/${item.id}`, "PATCH", { expiresAt: e.target.value || null }))}
                className={`${INPUT} mt-1`}
              />
            </label>
            <label className="block text-xs font-bold text-ink-700">
              {S.branchMin}
              <input
                type="number"
                min={0}
                inputMode="numeric"
                defaultValue={item.branchMin ?? ""}
                placeholder={String(item.itemMin)}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  const next = v === "" ? null : Math.max(0, Math.floor(Number(v) || 0));
                  if (next !== item.branchMin) void run(send(`/api/business/inventory/items/${item.id}`, "PATCH", { branchMinQty: next }));
                }}
                className={`${INPUT} mt-1`}
              />
            </label>
          </div>
        </div>
      )}

      {isOwner && data.products.length > 0 && (
        <label className="mt-4 block rounded-2xl bg-[#fbf3e1]/60 p-4 text-xs font-bold text-ink-700 ring-1 ring-[#f0dfb7]">
          <span className="flex items-center gap-1.5">
            <ShoppingCart className="h-3.5 w-3.5 text-[#8a6a2b]" />
            {S.shopLink}
          </span>
          <select
            value={item.productId ?? ""}
            onChange={(e) => run(send(`/api/business/inventory/items/${item.id}`, "PATCH", { productId: e.target.value || null }))}
            className={`${INPUT} mt-2`}
          >
            <option value="">{S.shopNone}</option>
            {data.products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <span className="mt-1.5 block text-[11px] font-normal text-ink-500">{S.shopHint}</span>
        </label>
      )}

      {isOwner && canWrite && otherBranches.length > 0 && (
        <div className="mt-4 rounded-2xl bg-sky-50/60 p-4 ring-1 ring-sky-100">
          <p className="flex items-center gap-1.5 text-xs font-bold text-sky-800">
            <ArrowLeftRight className="h-3.5 w-3.5" />
            {S.transferTitle}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <select value={xferTo} onChange={(e) => setXferTo(e.target.value)} className={`${INPUT} w-auto min-w-0 flex-1`} aria-label={S.transferTo}>
              <option value="">{S.transferTo}…</option>
              {otherBranches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
            <Stepper value={xferQty} onChange={setXferQty} />
            <button
              type="button"
              disabled={busy || !xferTo || xferQty > item.qty}
              onClick={async () => {
                const name = data.branches.find((b) => b.id === xferTo)?.name ?? "";
                if (await run(send("/api/business/inventory/transfer", "POST", { itemId: item.id, toBusinessId: xferTo, qty: xferQty })))
                  setMsg({ ok: true, text: fill(S.doneTransfer, { n: xferQty, branch: name }) });
              }}
              className="h-12 rounded-2xl bg-sky-600 px-4 text-sm font-bold text-white disabled:opacity-40"
            >
              {fill(S.transferBtn, { n: xferQty })}
            </button>
          </div>
        </div>
      )}

      {item.byBranch && data.branches.length > 1 && (
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {data.branches.map((b) => (
            <div key={b.id} className="rounded-xl bg-white px-3 py-2 ring-1 ring-ink-100">
              <p className="truncate text-[11px] text-ink-400">{b.name}</p>
              <p className="text-lg font-extrabold tabular-nums text-ink-900">{item.byBranch?.[b.id] ?? 0}</p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-wider text-ink-400">{S.itemHistory}</p>
        {history.length === 0 ? (
          <p className="mt-2 text-xs text-ink-400">{S.historyEmpty}</p>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {history.map((m) => (
              <li key={m.id} className="flex items-center justify-between gap-3 text-xs">
                <span className="min-w-0 truncate text-ink-600" suppressHydrationWarning>
                  {S[`move${m.kind}` as "moveIN"] ?? m.kind}
                  {m.note ? ` ${m.note}` : ""} · {dateFmt.format(new Date(m.createdAt))}
                  {m.byName ? ` · ${m.byName}` : ""}
                </span>
                <span className={`shrink-0 font-bold tabular-nums ${m.delta > 0 ? "text-emerald-600" : m.delta < 0 ? "text-rose-500" : "text-ink-500"}`}>
                  {m.delta > 0 ? "+" : ""}
                  {m.delta} → {m.qtyAfter}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <p className="mt-4 text-[11px] text-ink-400">
        {item.barcode ? `${S.barcode}: ${item.barcode}` : `QR: VI-${item.code}`}
      </p>

      {canWrite &&
        (editing ? (
          <div className="mt-4 border-t border-ink-100 pt-4">
            <ItemForm S={S} value={fields} onChange={setFields} currency={data.currency} />
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setEditing(false)} className="h-11 flex-1 rounded-2xl bg-mist-50 text-sm font-bold text-ink-700 ring-1 ring-ink-100">
                {S.cancel}
              </button>
              <button
                type="button"
                disabled={busy || !fields.name.trim()}
                onClick={async () => {
                  if (await run(send(`/api/business/inventory/items/${item.id}`, "PATCH", fieldsPayload(fields)))) setEditing(false);
                }}
                className="flex h-11 flex-[2] items-center justify-center gap-2 rounded-2xl bg-[#1f182d] text-sm font-bold text-white disabled:opacity-50"
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {S.save}
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2 border-t border-ink-100 pt-4">
            <button type="button" onClick={() => setEditing(true)} className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50">
              <Pencil className="h-3.5 w-3.5" />
              {S.edit}
            </button>
            {isOwner && (
              <button
                type="button"
                onClick={async () => {
                  if (!window.confirm(S.removeConfirm)) return;
                  if (await run(send(`/api/business/inventory/items/${item.id}`, "DELETE"))) onClose();
                }}
                className="flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold text-rose-600 ring-1 ring-rose-200 hover:bg-rose-50"
              >
                <Trash2 className="h-3.5 w-3.5" />
                {S.removeItem}
              </button>
            )}
          </div>
        ))}
    </Sheet>
  );
}
