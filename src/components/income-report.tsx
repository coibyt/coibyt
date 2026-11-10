"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  AlertCircle,
  Banknote,
  CheckCircle2,
  Clock3,
  CreditCard,
  FileText,
  Gift,
  Globe,
  HandCoins,
  ImagePlus,
  Loader2,
  PenLine,
  Receipt,
  RotateCcw,
  Trash2,
  Wallet,
  X,
  XCircle,
} from "lucide-react";
import { fill } from "@/lib/shop-strings";
import { incomeStrings } from "@/lib/income-strings";
import { formatMoney, fromSmallestUnit, toSmallestUnit } from "@/lib/money";
import type { IncomeReportJson } from "@/lib/income";
import { GIFT_DISCOUNTS, giftNet, incomeTotal, pickAmounts } from "@/lib/income-math";
import { OwnerCorrection } from "@/components/income-correction";

const MAX_PHOTOS = 6;
const MAX_OWNER_DOCS = 6;
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const PLUM_BTN =
  "bg-gradient-to-r from-[#a3155f] via-[#8e1d6d] to-[#5d1247] text-white shadow-[0_14px_28px_-14px_rgba(142,29,109,0.9)] hover:brightness-110";
const FIELD =
  "w-full rounded-2xl border border-ink-100 bg-white px-3 py-2.5 text-sm text-ink-900 outline-none transition focus:border-primary-400 focus:ring-4 focus:ring-primary-100 disabled:bg-mist-50";

interface BookingInfo {
  /** The booking's id — or the personal time block's, when `timeOff`. */
  id: string;
  timeOff?: boolean;
  customerName: string;
  serviceName: string;
  staffName: string | null;
  startsAt: string;
  expectedCents: number;
  currency: string;
}

/** Photos are shrunk to a JPEG before upload, like marketing images. */
async function shrink(file: File): Promise<Blob> {
  const bmp = await createImageBitmap(file);
  const scale = Math.min(1, 1600 / Math.max(bmp.width, bmp.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bmp.width * scale);
  canvas.height = Math.round(bmp.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(bmp, 0, 0, canvas.width, canvas.height);
  return new Promise((resolve) => canvas.toBlob((b) => resolve(b ?? file), "image/jpeg", 0.85));
}

/** "55,5" or "55.50" → smallest unit; empty → 0. */
function parseAmount(text: string, currency: string) {
  const n = Number(text.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) && n > 0 ? toSmallestUnit(n, currency) : 0;
}
function amountText(cents: number, currency: string) {
  return cents > 0 ? String(fromSmallestUnit(cents, currency)) : "";
}

/** The button on a booking: "Report income", or the report's status once
 * there is one. Opens the report form. */
export function IncomeReportButton({ bookingId, timeOffId, locale }: { bookingId?: string; timeOffId?: string; locale: string }) {
  const S = incomeStrings(locale);
  const [state, setState] = useState<{ booking: BookingInfo; report: IncomeReportJson | null; isOwner: boolean; me: string | null } | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setState(null);
    const q = timeOffId ? `timeOffId=${encodeURIComponent(timeOffId)}` : `bookingId=${encodeURIComponent(bookingId ?? "")}`;
    fetch(`/api/business/income?${q}`)
      .then((r) => (r.ok ? r.json() : null))
      .then(
        (d) =>
          !cancelled &&
          d &&
          setState({ booking: { ...d.booking, timeOff: !!timeOffId }, report: d.report, isOwner: !!d.isOwner, me: d.me ?? null }),
      );
    return () => {
      cancelled = true;
    };
  }, [bookingId, timeOffId]);

  if (!state) return null;
  const r = state.report;
  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-2 rounded-2xl bg-gradient-to-r from-[#1f182d] to-[#40325c] p-2.5 pl-3.5">
        <span className="flex min-w-0 flex-1 items-center gap-2.5 text-white">
          <Receipt className="h-4 w-4 shrink-0 text-[#e8d3a6]" />
          {r ? (
            <span className="min-w-0 leading-tight">
              <span className="block text-sm font-bold tabular-nums">{formatMoney(r.totalCents, r.currency, locale)}</span>
              <span className="flex flex-wrap items-center gap-x-2">
                {r.status === "APPROVED" ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                    <CheckCircle2 className="h-3 w-3 shrink-0" />
                    {S.approved}
                  </span>
                ) : r.status === "REJECTED" ? (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#ff9fb5]">
                    <XCircle className="h-3 w-3 shrink-0" />
                    {S.rejected}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#e8d3a6]">
                    <Clock3 className="h-3 w-3 shrink-0" />
                    {S.pending}
                  </span>
                )}
                {r.staffOriginal && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-[#f5b8d8]">
                    <PenLine className="h-3 w-3 shrink-0" />
                    {S.ownerEdited}
                  </span>
                )}
              </span>
            </span>
          ) : (
            <span className="min-w-0 text-xs font-semibold leading-snug">{S.formSub.split(".")[0]}.</span>
          )}
        </span>
        <button type="button" onClick={() => setOpen(true)} className={`shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold ${GOLD_BTN}`}>
          {r ? S.viewReport : S.reportBtn}
        </button>
      </div>
      {open && (
        <IncomeReportModal
          locale={locale}
          booking={state.booking}
          report={r}
          isOwner={state.isOwner}
          me={state.me}
          onClose={() => setOpen(false)}
          onSaved={(report) => setState((s) => (s ? { ...s, report } : s))}
        />
      )}
    </>
  );
}

type MoneyKey = "cash" | "bank" | "online" | "gift1" | "gift2" | "tip";

export function IncomeReportModal({
  locale,
  booking,
  report,
  isOwner = false,
  me = null,
  onClose,
  onSaved,
}: {
  locale: string;
  booking: BookingInfo;
  report: IncomeReportJson | null;
  /** The owner opening someone else's report corrects it (see POST /api/business/income). */
  isOwner?: boolean;
  me?: string | null;
  onClose: () => void;
  onSaved: (r: IncomeReportJson | null) => void;
}) {
  const S = incomeStrings(locale);
  const cur = booking.currency;
  // The owner on a report a staff member sent in: corrections, kept apart.
  const ownerMode = isOwner && !!report && !!me && report.reportedById !== me;
  const corrected = !!report?.staffOriginal;
  const approved = report?.status === "APPROVED";
  // Staff can't change an approved report, nor one the owner corrected.
  const locked = !ownerMode && (approved || corrected);
  const rejected = report?.status === "REJECTED";
  // What the staff member entered — for "Staff entered …" beside each field.
  const staffVals = useMemo(() => (report ? (report.staffOriginal ?? pickAmounts(report)) : null), [report]);
  const [mounted, setMounted] = useState(false);
  const [f, setF] = useState(() => ({
    cash: amountText(report?.cashCents ?? 0, cur),
    bank: amountText(report?.bankCents ?? 0, cur),
    online: amountText(report?.onlineCents ?? 0, cur),
    onlineSource: report?.onlineSource ?? "",
    gift1: amountText(report?.giftCard1Cents ?? 0, cur),
    gift1Code: report?.giftCard1Code ?? "",
    gift2: amountText(report?.giftCard2Cents ?? 0, cur),
    gift2Code: report?.giftCard2Code ?? "",
    tip: amountText(report?.tipCents ?? 0, cur),
    note: report?.note ?? "",
    ownerNote: report?.ownerEditNote ?? "",
  }));
  // Each gift card's discount, and whether "Other…" (a typed %) is chosen.
  const [pct, setPct] = useState(() => ({
    gift1: report?.giftCard1Percent ?? 0,
    gift2: report?.giftCard2Percent ?? 0,
    gift1Other: !GIFT_DISCOUNTS.includes(report?.giftCard1Percent ?? 0),
    gift2Other: !GIFT_DISCOUNTS.includes(report?.giftCard2Percent ?? 0),
  }));
  const [photos, setPhotos] = useState<{ id: string; url: string }[]>(
    () => report?.photoIds.map((id, i) => ({ id, url: report.photos[i] })) ?? []
  );
  const [pending, setPending] = useState<{ file: Blob; url: string }[]>([]);
  // The owner's documents: saved ones, and new ones (photos shrunk, PDFs as they are).
  const [docs, setDocs] = useState(() => report?.ownerDocs ?? []);
  const [pendingDocs, setPendingDocs] = useState<{ file: Blob; name: string; pdf: boolean; url: string }[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [zoom, setZoom] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const docRef = useRef<HTMLInputElement>(null);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const totals = useMemo(() => {
    const p = {
      cash: parseAmount(f.cash, cur),
      bank: parseAmount(f.bank, cur),
      online: parseAmount(f.online, cur),
      gift1: parseAmount(f.gift1, cur),
      gift2: parseAmount(f.gift2, cur),
    };
    // Gift cards count after their discount; the tip stays out of the total.
    const total = incomeTotal({
      cashCents: p.cash,
      bankCents: p.bank,
      onlineCents: p.online,
      giftCard1Cents: p.gift1,
      giftCard1Percent: pct.gift1,
      giftCard2Cents: p.gift2,
      giftCard2Percent: pct.gift2,
    });
    return { p, total, tip: parseAmount(f.tip, cur) };
  }, [f, pct, cur]);
  const diff = totals.total - booking.expectedCents;
  const set = (k: keyof typeof f, v: string) => setF((p) => ({ ...p, [k]: v }));
  const due = formatMoney(booking.expectedCents, cur, locale);
  const when = new Intl.DateTimeFormat(locale, { dateStyle: "medium", timeStyle: "short" }).format(new Date(booking.startsAt));
  const money = (c: number) => formatMoney(c, cur, locale);

  /** Owner mode: the staff member's amount for a field, when the owner's differs. */
  function staffWas(k: MoneyKey | "total"): number | null {
    if (!ownerMode || !staffVals) return null;
    const now =
      k === "total" ? totals.total : k === "tip" ? totals.tip : k === "gift1" || k === "gift2" ? giftNet(totals.p[k], pct[k]) : totals.p[k];
    const was =
      k === "total"
        ? staffVals.totalCents
        : k === "cash"
          ? staffVals.cashCents
          : k === "bank"
            ? staffVals.bankCents
            : k === "online"
              ? staffVals.onlineCents
              : k === "tip"
                ? staffVals.tipCents
                : k === "gift1"
                  ? giftNet(staffVals.giftCard1Cents, staffVals.giftCard1Percent)
                  : giftNet(staffVals.giftCard2Cents, staffVals.giftCard2Percent);
    return was !== now ? was : null;
  }

  async function addFiles(list: FileList | null) {
    if (!list) return;
    const room = MAX_PHOTOS - photos.length - pending.length;
    const picked = Array.from(list).filter((x) => x.type.startsWith("image/")).slice(0, Math.max(0, room));
    const shrunk = await Promise.all(picked.map(async (file) => {
      const blob = await shrink(file).catch(() => file);
      return { file: blob, url: URL.createObjectURL(blob) };
    }));
    setPending((p) => [...p, ...shrunk]);
  }

  async function addDocs(list: FileList | null) {
    if (!list) return;
    const room = MAX_OWNER_DOCS - docs.length - pendingDocs.length;
    const picked = Array.from(list)
      .filter((x) => x.type.startsWith("image/") || x.type === "application/pdf")
      .slice(0, Math.max(0, room));
    const ready = await Promise.all(
      picked.map(async (file) => {
        const pdf = file.type === "application/pdf";
        const blob = pdf ? file : await shrink(file).catch(() => file);
        return { file: blob, name: file.name, pdf, url: pdf ? "" : URL.createObjectURL(blob) };
      }),
    );
    setPendingDocs((p) => [...p, ...ready]);
  }

  async function removePhoto(id: string) {
    setPhotos((p) => p.filter((x) => x.id !== id));
    await fetch(`/api/business/income-photo/${id}`, { method: "DELETE" });
  }

  async function removeDoc(id: string) {
    setDocs((d) => d.filter((x) => x.id !== id));
    await fetch(`/api/business/income-photo/${id}`, { method: "DELETE" });
  }

  async function submit() {
    if (totals.total <= 0 && totals.tip <= 0) return setError(S.errEmpty);
    setBusy(true);
    setError(null);
    const res = await fetch("/api/business/income", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...(booking.timeOff ? { timeOffId: booking.id } : { bookingId: booking.id }),
        cashCents: totals.p.cash,
        bankCents: totals.p.bank,
        onlineCents: totals.p.online,
        onlineSource: f.onlineSource.trim(),
        giftCard1Cents: totals.p.gift1,
        giftCard1Code: f.gift1Code,
        giftCard2Cents: totals.p.gift2,
        giftCard2Code: f.gift2Code,
        giftCard1Percent: pct.gift1,
        giftCard2Percent: pct.gift2,
        tipCents: totals.tip,
        note: f.note,
        ...(ownerMode ? { ownerEditNote: f.ownerNote.trim() } : {}),
      }),
    }).catch(() => null);
    if (!res?.ok) {
      setBusy(false);
      const d = await res?.json().catch(() => ({}));
      return setError(d?.error === "EMPTY" ? S.errEmpty : d?.error === "OWNER_EDITED" ? S.errOwnerEdited : S.errGeneric);
    }
    let saved: IncomeReportJson = (await res.json()).report;
    // Photos and documents go up once the report exists.
    let photoFailed = false;
    for (const p of pending) {
      const form = new FormData();
      form.append("file", p.file, "photo.jpg");
      const up = await fetch(`/api/business/income/${saved.id}/photos`, { method: "POST", body: form }).catch(() => null);
      if (up?.ok) {
        const d = await up.json();
        saved = { ...saved, photos: [...saved.photos, d.url], photoIds: [...saved.photoIds, d.id] };
      } else photoFailed = true;
    }
    for (const p of pendingDocs) {
      const form = new FormData();
      form.append("owner", "1");
      form.append("file", p.file, p.pdf ? p.name || "document.pdf" : (p.name || "photo").replace(/\.\w+$/, "") + ".jpg");
      const up = await fetch(`/api/business/income/${saved.id}/photos`, { method: "POST", body: form }).catch(() => null);
      if (up?.ok) {
        const d = await up.json();
        saved = { ...saved, ownerDocs: [...saved.ownerDocs, { id: d.id, url: d.url, pdf: p.pdf, name: p.name }] };
      } else photoFailed = true;
    }
    setBusy(false);
    onSaved(saved);
    if (photoFailed) {
      setPhotos(saved.photoIds.map((id, i) => ({ id, url: saved.photos[i] })));
      setPending([]);
      setDocs(saved.ownerDocs);
      setPendingDocs([]);
      return setError(S.errPhoto);
    }
    onClose();
  }

  async function revert() {
    if (!report || !window.confirm(S.revertConfirm)) return;
    setBusy(true);
    const res = await fetch(`/api/business/income/${report.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "revert" }),
    }).catch(() => null);
    setBusy(false);
    if (!res?.ok) return setError(S.errGeneric);
    onSaved((await res.json()).report);
    onClose();
  }

  async function withdraw() {
    if (!report || !window.confirm(S.withdrawConfirm)) return;
    setBusy(true);
    const res = await fetch(`/api/business/income/${report.id}`, { method: "DELETE" }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      onSaved(null);
      onClose();
    }
  }

  const moneyField = (key: MoneyKey, label: string, Icon: typeof Wallet, quick: boolean) => {
    const was = staffWas(key);
    return (
      <div>
        <div className="mb-1.5 flex items-center justify-between gap-2">
          <span className="flex items-center gap-1.5 text-xs font-semibold text-ink-700">
            <Icon className="h-3.5 w-3.5 text-[#b08a3e]" />
            {label}
          </span>
          {quick && !locked && booking.expectedCents > 0 && (
            <button
              type="button"
              onClick={() => setF((p) => ({ ...p, cash: "", bank: "", online: "", gift1: "", gift2: "", [key]: amountText(booking.expectedCents, cur) }))}
              className="rounded-full bg-primary-100/70 px-2 py-0.5 text-[10px] font-bold text-primary-700 hover:bg-primary-100"
            >
              {fill(S.fillDue, { amount: due })}
            </button>
          )}
        </div>
        <div className="relative">
          <input
            inputMode="decimal"
            value={f[key]}
            disabled={locked}
            onChange={(e) => set(key, e.target.value.replace(/[^\d.,]/g, ""))}
            placeholder="0"
            className={`${FIELD} pr-14 text-right text-base font-semibold tabular-nums ${was !== null ? "border-[#e9c6dc] bg-[#fdf6fa] text-[#8e1d6d]" : ""}`}
          />
          <span className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-400">{cur}</span>
        </div>
        {was !== null && (
          <p className="mt-1 text-right text-[11px] font-semibold text-ink-400">
            <span className="line-through decoration-berry-400 decoration-2">{fill(S.staffWas, { amount: money(was) })}</span>
          </p>
        )}
      </div>
    );
  };

  const totalWas = staffWas("total");

  const body = (
    <div className="fixed inset-0 z-[90] flex items-end justify-center bg-[#1f182d]/55 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[94vh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-[#faf8fd] shadow-2xl animate-slide-up sm:max-h-[90vh] sm:max-w-lg sm:rounded-[2rem]"
      >
        <div className="relative shrink-0 overflow-hidden bg-[#1f182d] px-5 pb-5 pt-5 text-white sm:px-6">
          <div className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full bg-[#624f89]/50 blur-3xl" />
          <div className="relative flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#e8d3a6]">
                <Receipt className="h-3.5 w-3.5" />
                {S.formTitle}
              </p>
              <h3 className="mt-1 truncate text-xl font-bold">{booking.customerName}</h3>
              <p className="truncate text-xs text-white/65">
                {booking.serviceName} · {when}
                {booking.staffName ? ` · ${booking.staffName}` : ""}
              </p>
            </div>
            <button type="button" onClick={onClose} aria-label={S.close} className="-mr-1 rounded-full p-2 text-white/70 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Personal time (Tuyển người mẫu) has nothing due. */}
          {booking.expectedCents > 0 && (
            <div className="relative mt-4 flex items-center justify-between rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10">
              <span className="text-xs font-semibold text-white/65">{S.due}</span>
              <span className="text-lg font-bold tabular-nums">{due}</span>
            </div>
          )}
          {report && (
            <div className="relative mt-3 flex flex-wrap gap-2">
              <p
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold ${
                  approved ? "bg-emerald-400/15 text-emerald-200" : rejected ? "bg-[#ff9fb5]/15 text-[#ffc2d0]" : "bg-[#e8d3a6]/15 text-[#e8d3a6]"
                }`}
              >
                {approved ? <CheckCircle2 className="h-3.5 w-3.5" /> : rejected ? <XCircle className="h-3.5 w-3.5" /> : <Clock3 className="h-3.5 w-3.5" />}
                {approved ? S.approved : rejected ? S.rejected : S.pending}
              </p>
              {corrected && (
                <p className="inline-flex items-center gap-1.5 rounded-full bg-[#f5b8d8]/15 px-3 py-1 text-[11px] font-bold text-[#f5b8d8]">
                  <PenLine className="h-3.5 w-3.5" />
                  {S.ownerEdited}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5 sm:px-6">
          {ownerMode && (
            <p className="flex items-start gap-2 rounded-2xl bg-[#fdf2f8] px-3.5 py-2.5 text-xs font-medium text-[#5d1247] ring-1 ring-[#e9c6dc]">
              <PenLine className="mt-px h-4 w-4 shrink-0 text-[#8e1d6d]" />
              {fill(S.ownerMode, { name: report?.staffName || booking.staffName || "—" })}
            </p>
          )}
          {locked && (
            <p
              className={`flex items-start gap-2 rounded-2xl px-3.5 py-2.5 text-xs font-medium ring-1 ${
                corrected ? "bg-[#fdf2f8] text-[#5d1247] ring-[#e9c6dc]" : "bg-emerald-50 text-emerald-800 ring-emerald-100"
              }`}
            >
              {corrected ? <PenLine className="mt-px h-4 w-4 shrink-0" /> : <CheckCircle2 className="mt-px h-4 w-4 shrink-0" />}
              {corrected ? S.ownerLockedNote : S.lockedNote}
            </p>
          )}
          {/* The staff member (and the owner reading their own report) sees what the owner changed. */}
          {report && !ownerMode && <OwnerCorrection report={report} S={S} locale={locale} onZoom={setZoom} />}
          {rejected && report?.ownerNote && (
            <div className="rounded-2xl bg-berry-50 px-3.5 py-3 ring-1 ring-berry-100">
              <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-berry-600">
                <XCircle className="h-3.5 w-3.5" />
                {S.ownerSays}
              </p>
              <p className="mt-1 whitespace-pre-line text-sm text-ink-900">{report.ownerNote}</p>
              {!ownerMode && <p className="mt-1.5 text-[11px] text-ink-700">{S.resubmitHint}</p>}
            </div>
          )}
          <section className="grid grid-cols-1 gap-3 rounded-3xl border border-ink-100 bg-white p-4 sm:grid-cols-2">
            {moneyField("cash", S.cash, Banknote, true)}
            {moneyField("bank", S.bank, CreditCard, true)}
          </section>

          {/* Paid online before the visit: Timma, Booksalon or another channel. */}
          <section className="space-y-2 rounded-3xl border border-ink-100 bg-white p-4">
            <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-2">
              {moneyField("online", S.online, Globe, false)}
              <label className="min-w-0">
                <span className="mb-1.5 block truncate text-[11px] font-semibold text-ink-400">{S.onlineSource}</span>
                <input
                  value={f.onlineSource}
                  disabled={locked}
                  maxLength={40}
                  list="income-online-sources"
                  onChange={(e) => set("onlineSource", e.target.value)}
                  placeholder={S.onlinePh}
                  className={FIELD}
                />
                <datalist id="income-online-sources">
                  <option value="Timma" />
                  <option value="Booksalon" />
                  <option value="VaraaAi" />
                  <option value="MobilePay" />
                </datalist>
              </label>
            </div>
            <p className="text-[11px] leading-snug text-ink-400">{S.onlineHint}</p>
          </section>

          <section className="space-y-3 rounded-3xl border border-ink-100 bg-white p-4">
            {(["gift1", "gift2"] as const).map((k) => (
              <div key={k} className="space-y-2 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-ink-100 [&:not(:first-child)]:pt-3">
              <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-2">
                {moneyField(k, k === "gift1" ? S.gift1 : S.gift2, Gift, false)}
                <label className="min-w-0">
                  <span className="mb-1.5 block truncate text-[11px] font-semibold text-ink-400">{S.giftCode}</span>
                  <input
                    value={k === "gift1" ? f.gift1Code : f.gift2Code}
                    disabled={locked}
                    maxLength={40}
                    onChange={(e) => set(k === "gift1" ? "gift1Code" : "gift2Code", e.target.value.toUpperCase().replace(/\s+/g, ""))}
                    placeholder="ABCD1234"
                    className={`${FIELD} font-mono tracking-wider`}
                  />
                </label>
              </div>
              {/* The card's discount: taken off before it counts as income. */}
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-0.5 text-[11px] font-semibold text-ink-400">{S.discount}</span>
                {GIFT_DISCOUNTS.map((v) => {
                  const on = !pct[`${k}Other`] && pct[k] === v;
                  return (
                    <button
                      key={v}
                      type="button"
                      disabled={locked}
                      onClick={() => setPct((p) => ({ ...p, [k]: v, [`${k}Other`]: false }))}
                      className={`rounded-full px-2.5 py-1 text-[11px] font-bold tabular-nums transition disabled:opacity-60 ${
                        on ? "bg-[#1f182d] text-white" : "bg-mist-50 text-ink-700 ring-1 ring-ink-100 hover:bg-white"
                      }`}
                    >
                      {v}%
                    </button>
                  );
                })}
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => setPct((p) => ({ ...p, [`${k}Other`]: true }))}
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold transition disabled:opacity-60 ${
                    pct[`${k}Other`] ? "bg-[#1f182d] text-white" : "bg-mist-50 text-ink-700 ring-1 ring-ink-100 hover:bg-white"
                  }`}
                >
                  {S.other}
                </button>
                {pct[`${k}Other`] && (
                  <span className="relative">
                    <input
                      inputMode="numeric"
                      autoFocus={!locked}
                      disabled={locked}
                      value={pct[k] || ""}
                      onChange={(e) => {
                        const n = Math.min(100, Math.max(0, parseInt(e.target.value.replace(/\D/g, "") || "0", 10)));
                        setPct((p) => ({ ...p, [k]: n }));
                      }}
                      placeholder="15"
                      className="w-16 rounded-full border border-ink-100 bg-white py-1 pl-2.5 pr-6 text-right text-xs font-bold tabular-nums outline-none focus:border-primary-400"
                    />
                    <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-ink-400">%</span>
                  </span>
                )}
              </div>
              {pct[k] > 0 && totals.p[k] > 0 && (
                <p className="text-right text-[11px] font-semibold text-[#8a6a2b]">
                  {money(totals.p[k])} − {pct[k]}% → {fill(S.countsAs, { amount: money(giftNet(totals.p[k], pct[k])) })}
                </p>
              )}
              </div>
            ))}
          </section>

          <section className="rounded-3xl bg-gradient-to-br from-[#fffaf0] to-[#f6ead2] p-4 ring-1 ring-[#ecd9ad]">
            <div className="flex items-center justify-between gap-3">
              <span className="flex items-center gap-1.5 text-sm font-bold text-[#6b5221]">
                <Wallet className="h-4 w-4" />
                {S.total}
              </span>
              <span className="flex flex-col items-end">
                {totalWas !== null && <span className="text-sm font-semibold tabular-nums text-ink-300 line-through decoration-berry-400 decoration-2">{money(totalWas)}</span>}
                <span className={`text-2xl font-bold tabular-nums ${totalWas !== null ? "text-[#8e1d6d]" : "text-[#1f182d]"}`}>{money(totals.total)}</span>
              </span>
            </div>
            {totals.total > 0 && booking.expectedCents > 0 && (
              <p className={`mt-1 text-right text-[11px] font-semibold ${diff === 0 ? "text-emerald-700" : "text-amber-700"}`}>
                {diff === 0 ? `✓ ${S.diffOk}` : fill(diff > 0 ? S.diffMore : S.diffLess, { amount: money(Math.abs(diff)) })}
              </p>
            )}
          </section>

          <section className="rounded-3xl border border-ink-100 bg-white p-4">
            {moneyField("tip", S.tip, HandCoins, false)}
            <p className="mt-1.5 text-[11px] leading-snug text-ink-400">{S.tipHint}</p>
          </section>

          {ownerMode ? (
            // The staff member's own note stays theirs; the owner writes a reason instead.
            f.note && (
              <div className="rounded-2xl bg-mist-50/80 px-3.5 py-2.5 ring-1 ring-ink-100">
                <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{S.staffNote}</p>
                <p className="mt-0.5 whitespace-pre-line text-sm text-ink-700">{f.note}</p>
              </div>
            )
          ) : (
            <label className="block">
              <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.note}</span>
              <textarea value={f.note} disabled={locked} maxLength={500} rows={2} onChange={(e) => set("note", e.target.value)} placeholder={S.notePh} className={`${FIELD} resize-none`} />
            </label>
          )}

          {(photos.length > 0 || (!locked && !ownerMode)) && (
            <section>
              <p className="text-xs font-semibold text-ink-700">{S.photos}</p>
              {!ownerMode && <p className="text-[11px] text-ink-400">{fill(S.photosHint, { n: MAX_PHOTOS })}</p>}
              <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photos.map((p) => (
                  <div key={p.id} className="group relative aspect-square overflow-hidden rounded-2xl ring-1 ring-ink-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="" onClick={() => setZoom(p.url)} className="h-full w-full cursor-zoom-in object-cover" />
                    {!locked && !ownerMode && (
                      <button type="button" onClick={() => removePhoto(p.id)} aria-label="Remove" className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-berry-500 shadow">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                ))}
                {pending.map((p, i) => (
                  <div key={p.url} className="relative aspect-square overflow-hidden rounded-2xl ring-2 ring-[#e8d3a6]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt="" className="h-full w-full object-cover" />
                    <button type="button" onClick={() => setPending((x) => x.filter((_, j) => j !== i))} aria-label="Remove" className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-berry-500 shadow">
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
                {!locked && !ownerMode && photos.length + pending.length < MAX_PHOTOS && (
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-ink-100 bg-white text-[11px] font-semibold text-ink-400 hover:border-primary-300 hover:text-primary-600"
                  >
                    <ImagePlus className="h-5 w-5" />
                    {S.addPhoto}
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => {
                  addFiles(e.target.files);
                  e.target.value = "";
                }}
              />
            </section>
          )}

          {/* Owner: why the numbers changed, with their own documents. */}
          {ownerMode && (
            <section className="space-y-3 rounded-3xl bg-gradient-to-br from-[#fdf2f8] to-[#f7eefb] p-4 ring-1 ring-[#e9c6dc]">
              <label className="block">
                <span className="mb-1.5 flex items-center gap-1.5 text-xs font-bold text-[#5d1247]">
                  <PenLine className="h-3.5 w-3.5 text-[#8e1d6d]" />
                  {S.ownerReasonLabel}
                </span>
                <textarea
                  value={f.ownerNote}
                  maxLength={1000}
                  rows={3}
                  onChange={(e) => set("ownerNote", e.target.value)}
                  placeholder={S.ownerReasonPh}
                  className="w-full resize-none rounded-2xl border border-[#e9c6dc] bg-white px-3 py-2.5 text-sm text-ink-900 outline-none focus:border-[#c0589b] focus:ring-4 focus:ring-[#f5d3e6]"
                />
              </label>
              <div>
                <p className="text-xs font-bold text-[#5d1247]">{S.ownerDocs}</p>
                <p className="text-[11px] text-[#5d1247]/60">{fill(S.ownerDocsHint, { n: MAX_OWNER_DOCS })}</p>
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {docs.map((d) => (
                    <div key={d.id} className="relative aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-[#e9c6dc]">
                      {d.pdf ? (
                        <a href={d.url} target="_blank" rel="noreferrer" className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center">
                          <FileText className="h-6 w-6 text-[#8e1d6d]" />
                          <span className="line-clamp-2 break-all text-[10px] font-semibold text-[#5d1247]">{d.name || "PDF"}</span>
                        </a>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={d.url} alt="" onClick={() => setZoom(d.url)} className="h-full w-full cursor-zoom-in object-cover" />
                      )}
                      <button type="button" onClick={() => removeDoc(d.id)} aria-label="Remove" className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-berry-500 shadow">
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  {pendingDocs.map((d, i) => (
                    <div key={`${d.name}-${i}`} className="relative aspect-square overflow-hidden rounded-2xl bg-white ring-2 ring-[#e0559b]/50">
                      {d.pdf ? (
                        <span className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center">
                          <FileText className="h-6 w-6 text-[#8e1d6d]" />
                          <span className="line-clamp-2 break-all text-[10px] font-semibold text-[#5d1247]">{d.name}</span>
                        </span>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={d.url} alt="" className="h-full w-full object-cover" />
                      )}
                      <button type="button" onClick={() => setPendingDocs((x) => x.filter((_, j) => j !== i))} aria-label="Remove" className="absolute right-1 top-1 rounded-full bg-white/90 p-1 text-berry-500 shadow">
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                  {docs.length + pendingDocs.length < MAX_OWNER_DOCS && (
                    <button
                      type="button"
                      onClick={() => docRef.current?.click()}
                      className="flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-2 border-dashed border-[#e9c6dc] bg-white/70 text-[11px] font-semibold text-[#8e1d6d] hover:border-[#c0589b] hover:bg-white"
                    >
                      <ImagePlus className="h-5 w-5" />
                      {S.addDoc}
                    </button>
                  )}
                </div>
                <input
                  ref={docRef}
                  type="file"
                  accept="image/*,application/pdf"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    addDocs(e.target.files);
                    e.target.value = "";
                  }}
                />
              </div>
              {corrected && (
                <button
                  type="button"
                  onClick={revert}
                  disabled={busy}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-[#8e1d6d] ring-1 ring-[#e9c6dc] hover:bg-[#fdf2f8] disabled:opacity-60"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  {S.revert}
                </button>
              )}
            </section>
          )}
        </div>

        <div className="shrink-0 border-t border-ink-100 bg-white px-4 py-3 sm:px-6">
          {error && (
            <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-berry-500">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {error}
            </p>
          )}
          <div className="flex items-center gap-2">
            {report && !locked && !approved && (
              <button type="button" onClick={withdraw} disabled={busy} title={S.withdraw} aria-label={S.withdraw} className="shrink-0 rounded-full p-2.5 text-berry-500 ring-1 ring-berry-100 hover:bg-berry-50">
                <Trash2 className="h-4 w-4" />
              </button>
            )}
            <button type="button" onClick={onClose} className="ml-auto shrink-0 rounded-full px-4 py-2.5 text-sm font-semibold text-ink-700 hover:bg-mist-50">
              {S.close}
            </button>
            {!locked && (
              <button
                type="button"
                onClick={submit}
                disabled={busy}
                className={`flex min-w-0 items-center justify-center gap-2 whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-bold disabled:opacity-50 ${ownerMode ? PLUM_BTN : GOLD_BTN}`}
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : ownerMode ? <PenLine className="h-4 w-4" /> : <Receipt className="h-4 w-4" />}
                <span className="truncate">{ownerMode ? S.saveOwner : rejected ? S.resubmit : report ? S.update : S.submit}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {zoom && (
        <div className="fixed inset-0 z-[95] flex items-center justify-center bg-black/80 p-4" onClick={(e) => (e.stopPropagation(), setZoom(null))}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={zoom} alt="" className="max-h-full max-w-full rounded-2xl" />
        </div>
      )}
    </div>
  );

  return mounted ? createPortal(body, document.body) : null;
}
