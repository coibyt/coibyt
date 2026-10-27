"use client";

import { useMemo, useState } from "react";
import {
  CalendarCheck,
  Check,
  Copy,
  Eye,
  EyeOff,
  Loader2,
  MailCheck,
  MessageSquareQuote,
  Pencil,
  Reply,
  Search,
  Star,
  ThumbsUp,
  TrendingUp,
  X,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { givenName } from "@/lib/given-name";
import { reviewsStrings, type ReviewFilter } from "@/lib/reviews-strings";

type ReviewStatus = "PENDING" | "APPROVED" | "HIDDEN";

interface ReviewRow {
  id: string;
  rating: number;
  comment: string | null;
  ownerReply: string | null;
  customerName: string;
  status: ReviewStatus;
  createdAt: string;
  serviceName: string;
  staffId: string | null;
  staffName: string | null;
}

const FILTERS: ReviewFilter[] = ["all", "PENDING", "unanswered", "APPROVED", "HIDDEN"];
const TONES = ["from-[#624f89] to-[#1f182d]", "from-[#c2378f] to-[#6d2a6f]", "from-[#03878f] to-[#013a3e]", "from-[#d9b25c] to-[#8a6a2b]", "from-[#ec6a47] to-[#a31f3f]"];
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const FIELD =
  "w-full rounded-2xl border border-ink-100 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100";
const STATUS_STYLE: Record<ReviewStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 ring-amber-200",
  APPROVED: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  HIDDEN: "bg-ink-100 text-ink-400 ring-ink-100",
};

function tone(s: string) {
  let h = 0;
  for (const ch of s) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

function Stars({ value, size = "h-4 w-4" }: { value: number; size?: string }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value}/5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className={`${size} ${i <= Math.round(value) ? "fill-[#f5b041] text-[#f5b041]" : "fill-ink-100 text-ink-100"}`} />
      ))}
    </span>
  );
}

export function ReviewsManager({ reviews, locale, googleUrl }: { reviews: ReviewRow[]; locale: string; googleUrl: string | null }) {
  const S = reviewsStrings(locale);
  const router = useRouter();
  const [filter, setFilter] = useState<ReviewFilter>("all");
  const [stars, setStars] = useState(0);
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<"new" | "low" | "high">("new");
  const [busy, setBusy] = useState<string | null>(null);
  const [replyingId, setReplyingId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [bulk, setBulk] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [now] = useState(() => Date.now());

  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" });

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(null), 2400);
  }

  const total = reviews.length;
  const avg = total ? reviews.reduce((n, r) => n + r.rating, 0) / total : 0;
  const dist = [5, 4, 3, 2, 1].map((s) => ({ s, n: reviews.filter((r) => r.rating === s).length }));
  const answered = reviews.filter((r) => r.ownerReply).length;
  const pending = reviews.filter((r) => r.status === "PENDING");
  const recent = reviews.filter((r) => now - new Date(r.createdAt).getTime() <= 30 * 24 * 60 * 60 * 1000);
  const goodPending = pending.filter((r) => r.rating >= 4);

  const counts: Record<ReviewFilter, number> = {
    all: total,
    PENDING: pending.length,
    APPROVED: reviews.filter((r) => r.status === "APPROVED").length,
    HIDDEN: reviews.filter((r) => r.status === "HIDDEN").length,
    unanswered: reviews.filter((r) => !r.ownerReply).length,
  };

  const byStaff = useMemo(() => {
    const m = new Map<string, { name: string; sum: number; n: number }>();
    for (const r of reviews) {
      if (!r.staffId || !r.staffName) continue;
      const x = m.get(r.staffId) ?? { name: r.staffName, sum: 0, n: 0 };
      x.sum += r.rating;
      x.n++;
      m.set(r.staffId, x);
    }
    return [...m.values()].map((x) => ({ ...x, avg: x.sum / x.n })).sort((a, b) => b.avg - a.avg || b.n - a.n);
  }, [reviews]);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = reviews.filter(
      (r) =>
        (filter === "all" || (filter === "unanswered" ? !r.ownerReply : r.status === filter)) &&
        (!stars || r.rating === stars) &&
        (!needle || r.customerName.toLowerCase().includes(needle) || (r.comment ?? "").toLowerCase().includes(needle) || r.serviceName.toLowerCase().includes(needle))
    );
    if (sort === "low") list.sort((a, b) => a.rating - b.rating);
    else if (sort === "high") list.sort((a, b) => b.rating - a.rating);
    // Within "newest", reviews still awaiting a decision come first.
    else list.sort((a, b) => Number(b.status === "PENDING") - Number(a.status === "PENDING") || b.createdAt.localeCompare(a.createdAt));
    return list;
  }, [reviews, filter, stars, q, sort]);

  async function setStatus(r: ReviewRow, status: "APPROVED" | "HIDDEN") {
    setBusy(r.id);
    await fetch(`/api/business/reviews/${r.id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    }).catch(() => null);
    setBusy(null);
    router.refresh();
  }

  async function publishGood() {
    setBulk(true);
    let n = 0;
    for (const r of goodPending) {
      const res = await fetch(`/api/business/reviews/${r.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "APPROVED" }),
      }).catch(() => null);
      if (res?.ok) n++;
    }
    setBulk(false);
    flash(fill(S.published, { n }));
    router.refresh();
  }

  function startReply(r: ReviewRow) {
    setReplyingId(r.id);
    setDraft(r.ownerReply ?? "");
  }

  async function sendReply(r: ReviewRow) {
    if (!draft.trim()) return;
    setBusy(r.id);
    const res = await fetch(`/api/business/reviews/${r.id}/reply`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reply: draft.trim() }),
    }).catch(() => null);
    setBusy(null);
    if (res?.ok) {
      setReplyingId(null);
      router.refresh();
    }
  }

  function template(r: ReviewRow, text: string) {
    setDraft(text.replace(/\{name\}/g, givenName(r.customerName) || S.friend));
  }

  function copyGoogle() {
    if (!googleUrl) return;
    navigator.clipboard.writeText(googleUrl).catch(() => {});
    flash(S.copied);
  }

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-center">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
              <MessageSquareQuote className="h-4 w-4" />
              {S.eyebrow}
            </p>
            <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70">{S.sub}</p>
            <div className="mt-5 grid grid-cols-3 gap-3">
              {[
                { icon: Reply, label: S.statResponse, value: total ? `${Math.round((answered / total) * 100)}%` : "—" },
                { icon: Eye, label: S.statPending, value: String(pending.length) },
                { icon: TrendingUp, label: S.statRecent, value: String(recent.length) },
              ].map((x) => (
                <div key={x.label} className="rounded-2xl bg-white/[0.07] p-3.5 ring-1 ring-white/10">
                  <x.icon className="h-4 w-4 text-[#e8d3a6]" />
                  <p className="mt-2 text-xl font-bold tabular-nums">{x.value}</p>
                  <p className="text-[11px] font-medium leading-tight text-white/60">{x.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5 rounded-3xl bg-white/[0.07] p-5 ring-1 ring-white/10">
            <div className="shrink-0 text-center">
              <p className="font-serif text-5xl leading-none">{total ? avg.toFixed(1) : "—"}</p>
              <p className="mt-1 text-[11px] text-white/60">{S.outOf}</p>
              <div className="mt-2 flex justify-center">
                <Stars value={avg} size="h-3.5 w-3.5" />
              </div>
              <p className="mt-1.5 text-[11px] text-white/60">{fill(S.reviewsCount, { n: total })}</p>
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              {dist.map((d) => (
                <button
                  key={d.s}
                  type="button"
                  onClick={() => setStars(stars === d.s ? 0 : d.s)}
                  className={`flex w-full items-center gap-2 rounded-lg px-1 text-xs transition ${stars === d.s ? "bg-white/10" : "hover:bg-white/5"}`}
                >
                  <span className="w-3 text-right font-bold">{d.s}</span>
                  <Star className="h-3 w-3 fill-[#f5b041] text-[#f5b041]" />
                  <span className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                    <span className="block h-full rounded-full bg-gradient-to-r from-[#d9b25c] to-[#f5b041]" style={{ width: `${total ? (d.n / total) * 100 : 0}%` }} />
                  </span>
                  <span className="w-6 text-right tabular-nums text-white/70">{d.n}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-4">
          {/* Filters */}
          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold ring-1 transition ${
                  filter === f ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"
                }`}
              >
                {S.filters[f]}
                <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${filter === f ? "bg-white/15" : "bg-mist-50 text-ink-400"}`}>{counts[f]}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 rounded-3xl border border-ink-100 bg-white p-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.searchPh} className={`${FIELD} pl-10`} />
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <select value={stars} onChange={(e) => setStars(Number(e.target.value))} className={`${FIELD} sm:!w-40`}>
                <option value={0}>{S.allStars}</option>
                {[5, 4, 3, 2, 1].map((s) => (
                  <option key={s} value={s}>
                    {"★".repeat(s)}
                  </option>
                ))}
              </select>
              <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${FIELD} sm:!w-44`}>
                <option value="new">{S.sortNew}</option>
                <option value="low">{S.sortLow}</option>
                <option value="high">{S.sortHigh}</option>
              </select>
            </div>
          </div>

          {goodPending.length > 0 && (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl bg-gradient-to-r from-[#fffaf0] to-[#f8eedb] p-4 ring-1 ring-[#ecd9ad]">
              <p className="text-sm text-[#6b5221]">{S.pendingHint}</p>
              <button type="button" onClick={publishGood} disabled={bulk} className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold disabled:opacity-60 ${GOLD_BTN}`}>
                {bulk ? <Loader2 className="h-4 w-4 animate-spin" /> : <ThumbsUp className="h-4 w-4" />}
                {fill(S.publishGood, { n: goodPending.length })}
              </button>
            </div>
          )}

          {total === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
                <Star className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-ink-900">{S.emptyTitle}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.emptyText}</p>
            </div>
          ) : shown.length === 0 ? (
            <p className="rounded-3xl bg-white px-6 py-10 text-center text-sm text-ink-400 ring-1 ring-ink-100">{S.noMatch}</p>
          ) : (
            <div className="space-y-3">
              {shown.map((r) => (
                <article
                  key={r.id}
                  className={`rounded-3xl border bg-white p-5 shadow-[0_18px_40px_-36px_rgba(31,24,45,0.6)] ${r.status === "PENDING" ? "border-amber-200" : "border-ink-100"}`}
                >
                  <div className="flex items-start gap-3">
                    <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white ${tone(r.customerName)}`}>
                      {r.customerName.trim()[0]?.toUpperCase()}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="truncate font-bold text-ink-900">{r.customerName}</p>
                        <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ${STATUS_STYLE[r.status]}`}>{S.status[r.status]}</span>
                      </div>
                      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-400">
                        <Stars value={r.rating} />
                        <span>· {dateFmt.format(new Date(r.createdAt))}</span>
                        <span className="flex items-center gap-1">
                          · <CalendarCheck className="h-3 w-3" />
                          {r.serviceName}
                          {r.staffName && ` ${fill(S.with, { name: r.staffName })}`}
                        </span>
                      </div>
                    </div>
                  </div>

                  <p className={`mt-3 whitespace-pre-line text-sm leading-relaxed ${r.comment ? "text-ink-700" : "italic text-ink-400"}`}>
                    {r.comment ? `“${r.comment}”` : S.noComment}
                  </p>

                  {replyingId === r.id ? (
                    <div className="mt-4 rounded-2xl bg-mist-50/60 p-3.5 ring-1 ring-ink-100">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">{S.templates}</p>
                      <div className="mb-2.5 flex flex-wrap gap-1.5">
                        {S.replyTemplates.map(([label, text]) => (
                          <button key={label} type="button" onClick={() => template(r, text)} className="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-[#6b5221] ring-1 ring-[#ecd9ad] hover:bg-[#fffaf0]">
                            {label}
                          </button>
                        ))}
                      </div>
                      <textarea value={draft} onChange={(e) => setDraft(e.target.value)} rows={3} maxLength={2000} placeholder={S.replyPh} className={FIELD} autoFocus />
                      <div className="mt-2 flex gap-2">
                        <button type="button" onClick={() => sendReply(r)} disabled={busy === r.id || !draft.trim()} className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold disabled:opacity-50 ${GOLD_BTN}`}>
                          {busy === r.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                          {S.send}
                        </button>
                        <button type="button" onClick={() => setReplyingId(null)} className="rounded-full px-4 py-2 text-xs font-semibold text-ink-400 ring-1 ring-ink-100">
                          {S.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    r.ownerReply && (
                      <div className="mt-4 rounded-2xl border-l-4 border-[#c99a3f] bg-[#fffaf0] px-4 py-3">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">{S.yourReply}</p>
                        <p className="mt-1 whitespace-pre-line text-sm text-ink-700">{r.ownerReply}</p>
                      </div>
                    )
                  )}

                  {replyingId !== r.id && (
                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-ink-100 pt-3">
                      <button type="button" onClick={() => startReply(r)} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-primary-700 hover:bg-primary-100/40">
                        {r.ownerReply ? <Pencil className="h-3.5 w-3.5" /> : <Reply className="h-3.5 w-3.5" />}
                        {r.ownerReply ? S.editReply : S.reply}
                      </button>
                      {r.status !== "APPROVED" && (
                        <button type="button" onClick={() => setStatus(r, "APPROVED")} disabled={busy === r.id} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-emerald-700 hover:bg-emerald-50 disabled:opacity-50">
                          <Eye className="h-3.5 w-3.5" />
                          {S.publish}
                        </button>
                      )}
                      {r.status !== "HIDDEN" && (
                        <button type="button" onClick={() => setStatus(r, "HIDDEN")} disabled={busy === r.id} className="flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold text-ink-400 hover:bg-mist-50 disabled:opacity-50">
                          <EyeOff className="h-3.5 w-3.5" />
                          {S.hide}
                        </button>
                      )}
                      {busy === r.id && <Loader2 className="h-4 w-4 animate-spin self-center text-ink-300" />}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>

        <aside className="space-y-4">
          <section className="rounded-3xl bg-[#1f182d] p-5 text-white">
            <p className="flex items-center gap-2 font-bold">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                <path fill="#e8d3a6" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z" />
                <path fill="#e8d3a6" opacity=".8" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1a5.9 5.9 0 0 1-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z" />
                <path fill="#e8d3a6" opacity=".6" d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3.1a10 10 0 0 0 0 9z" />
                <path fill="#e8d3a6" opacity=".9" d="M12 6c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.5l3.3 2.6A5.9 5.9 0 0 1 12 6z" />
              </svg>
              {S.googleTitle}
            </p>
            {googleUrl ? (
              <>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{S.googleText}</p>
                <button type="button" onClick={copyGoogle} className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-bold ${GOLD_BTN}`}>
                  <Copy className="h-4 w-4" />
                  {S.googleCopy}
                </button>
              </>
            ) : (
              <>
                <p className="mt-2 text-xs leading-relaxed text-white/70">{S.googleMissing}</p>
                <Link href="/business/dashboard/settings#contact" className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold ring-1 ring-white/15 hover:bg-white/20">
                  {S.googleSettings}
                </Link>
              </>
            )}
          </section>

          <section className="flex gap-3 rounded-3xl border border-ink-100 bg-white p-5">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-primary-100/60 text-primary-600">
              <MailCheck className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-bold text-ink-900">{S.autoTitle}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ink-400">{S.autoText}</p>
            </div>
          </section>

          <section className="rounded-3xl border border-ink-100 bg-white p-5">
            <p className="font-bold text-ink-900">{S.staffTitle}</p>
            {byStaff.length === 0 ? (
              <p className="mt-2 text-sm text-ink-400">{S.staffEmpty}</p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {byStaff.map((x) => (
                  <li key={x.name} className="flex items-center gap-3 text-sm">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-xs font-bold text-white ${tone(x.name)}`}>{x.name.trim()[0]?.toUpperCase()}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink-900">{x.name}</span>
                      <span className="text-[11px] text-ink-400">{fill(S.reviewsCount, { n: x.n })}</span>
                    </span>
                    <span className="flex items-center gap-1 font-bold tabular-nums text-ink-900">
                      <Star className="h-4 w-4 fill-[#f5b041] text-[#f5b041]" />
                      {x.avg.toFixed(1)}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </aside>
      </div>

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
