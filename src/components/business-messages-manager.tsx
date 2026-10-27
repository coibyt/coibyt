"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Bot,
  CalendarCheck,
  CalendarClock,
  Check,
  Inbox,
  Loader2,
  Mail,
  MessageCircle,
  MessagesSquare,
  Plus,
  Search,
  Sparkles,
  StickyNote,
  TrendingUp,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { ChatWidget } from "@/components/chat-widget";
import { parseBookingTokens } from "@/lib/chat-booking-token";
import { formatMoney } from "@/lib/money";
import { fill } from "@/lib/shop-strings";
import { messagesStrings, type InboxFilter } from "@/lib/messages-strings";

interface ConversationRow {
  id: string;
  customerId: string;
  customerName: string;
  customerImage: string | null;
  isGuest: boolean;
  customerEmail: string | null;
  aiPaused: boolean;
  lastMessage: {
    content: string | null;
    hasImage: boolean;
    senderType: "CUSTOMER" | "BUSINESS" | "AI";
    createdAt: string;
  } | null;
  unreadCount: number;
  updatedAt: string;
}

interface CustomerInfo {
  visitCount: number;
  totalSpentCents: number;
  currency: string;
  bookings: { startsAt: string; status: string; serviceName: string }[];
  note: string;
}

const POLL_MS = 6000;
const FILTERS: InboxFilter[] = ["all", "unread", "awaiting", "ai"];
const TONES = ["from-[#624f89] to-[#1f182d]", "from-[#c2378f] to-[#6d2a6f]", "from-[#03878f] to-[#013a3e]", "from-[#d9b25c] to-[#8a6a2b]", "from-[#ec6a47] to-[#a31f3f]"];
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const FIELD =
  "w-full rounded-2xl border border-ink-100 bg-white px-4 py-2.5 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:ring-4 focus:ring-primary-100";

function tone(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TONES[h % TONES.length];
}

function initials(name: string) {
  const w = name.trim().split(/\s+/);
  return ((w[0]?.[0] ?? "") + (w.length > 1 ? w[w.length - 1][0] : "")).toUpperCase() || "?";
}

export function BusinessMessagesManager({ locale, isOwner }: { locale: string; isOwner: boolean }) {
  const S = messagesStrings(locale);
  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [aiChatEnabled, setAiChatEnabled] = useState(false);
  const [aiReplies, setAiReplies] = useState(0);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<InboxFilter>("all");
  const [q, setQ] = useState("");
  const [replies, setReplies] = useState<{ id: string | null; title: string; text: string }[] | null>(null);
  const [prefill, setPrefill] = useState<{ text: string; nonce: number } | null>(null);
  const [adding, setAdding] = useState<null | { title: string; text: string }>(null);
  const [info, setInfo] = useState<CustomerInfo | null | "none">(null);
  const [note, setNote] = useState("");
  const [savingNote, setSavingNote] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/business/chat/conversations").catch(() => null);
      if (!res?.ok || cancelled) return;
      const data = await res.json();
      setConversations(data.conversations ?? []);
      setAiChatEnabled(!!data.aiChatEnabled);
      setAiReplies(data.stats?.aiReplies30 ?? 0);
      setNow(Date.now());
    }
    load().finally(() => !cancelled && setLoading(false));
    const interval = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    fetch("/api/business/chat/quick-replies")
      .then((r) => (r.ok ? r.json() : { replies: [] }))
      .then((d) => setReplies(d.replies ?? []))
      .catch(() => setReplies([]));
  }, []);

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  // The customer's booking history and private note, beside the thread.
  useEffect(() => {
    setInfo(null);
    setNote("");
    if (!selected) return;
    let cancelled = false;
    fetch(`/api/business/customers/${selected.customerId}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (cancelled) return;
        setInfo(d ?? "none");
        setNote(d?.note ?? "");
      })
      .catch(() => !cancelled && setInfo("none"));
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  const awaiting = (c: ConversationRow) => c.lastMessage?.senderType === "CUSTOMER";
  const aiAnswering = (c: ConversationRow) => aiChatEnabled && !c.aiPaused;
  const counts = {
    all: conversations.length,
    unread: conversations.filter((c) => c.unreadCount > 0).length,
    awaiting: conversations.filter(awaiting).length,
    ai: conversations.filter(aiAnswering).length,
  };
  const unreadTotal = conversations.reduce((n, c) => n + c.unreadCount, 0);

  const shown = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return conversations.filter(
      (c) =>
        (filter === "all" || (filter === "unread" && c.unreadCount > 0) || (filter === "awaiting" && awaiting(c)) || (filter === "ai" && aiAnswering(c))) &&
        (!needle || c.customerName.toLowerCase().includes(needle) || (c.customerEmail ?? "").toLowerCase().includes(needle))
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversations, filter, q, aiChatEnabled]);

  function ago(iso: string) {
    const min = Math.floor((now - new Date(iso).getTime()) / 60000);
    if (min < 1) return S.now;
    if (min < 60) return fill(S.minutes, { n: min });
    if (min < 24 * 60) return fill(S.hours, { n: Math.floor(min / 60) });
    return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(new Date(iso));
  }

  function preview(c: ConversationRow) {
    if (!c.lastMessage) return "";
    const who = c.lastMessage.senderType === "BUSINESS" ? S.you : c.lastMessage.senderType === "AI" ? "AI: " : "";
    const body = c.lastMessage.content ? parseBookingTokens(c.lastMessage.content).text || S.bookingButton : S.image;
    return who + body;
  }

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(null), 2200);
  }

  async function setAiPaused(c: ConversationRow, paused: boolean) {
    setConversations((list) => list.map((x) => (x.id === c.id ? { ...x, aiPaused: paused } : x)));
    await fetch(`/api/business/chat/conversations/${c.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aiPaused: paused }),
    }).catch(() => null);
  }

  async function saveReply() {
    if (!adding?.title.trim() || !adding.text.trim()) return;
    const res = await fetch("/api/business/chat/quick-replies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adding),
    }).catch(() => null);
    if (res?.ok) {
      const d = await res.json();
      setReplies((r) => [...(r ?? []), d.reply]);
      setAdding(null);
    }
  }

  async function removeReply(id: string) {
    setReplies((r) => (r ?? []).filter((x) => x.id !== id));
    await fetch(`/api/business/chat/quick-replies?id=${id}`, { method: "DELETE" }).catch(() => null);
  }

  async function saveNote() {
    if (!selected) return;
    setSavingNote(true);
    const res = await fetch(`/api/business/customers/${selected.customerId}/note`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ note }),
    }).catch(() => null);
    setSavingNote(false);
    if (res?.ok) {
      flash(S.noteSaved);
      setInfo((i) => (i && i !== "none" ? { ...i, note: note.trim() } : i));
    }
  }

  // Saved replies, or ready-made ones until the salon adds its own.
  const quickReplies = replies && replies.length > 0 ? replies : S.defaults.map(([title, text]) => ({ id: null, title, text }));

  function avatar(c: ConversationRow, size: string) {
    return c.customerImage ? (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={c.customerImage} alt="" className={`${size} shrink-0 rounded-2xl object-cover`} />
    ) : (
      <span className={`${size} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-sm font-bold text-white ${tone(c.customerId)}`}>{initials(c.customerName)}</span>
    );
  }

  const nextBooking =
    info && info !== "none"
      ? info.bookings
          .filter((b) => new Date(b.startsAt).getTime() > now && (b.status === "CONFIRMED" || b.status === "PENDING_PAYMENT"))
          .sort((a, b) => a.startsAt.localeCompare(b.startsAt))[0]
      : null;
  const lastBooking =
    info && info !== "none" ? info.bookings.find((b) => new Date(b.startsAt).getTime() <= now && (b.status === "COMPLETED" || b.status === "CONFIRMED")) : null;
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative">
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
            <MessagesSquare className="h-4 w-4" />
            {S.eyebrow}
          </p>
          <h1 className="mt-3 max-w-2xl font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/70">{S.sub}</p>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: MessageCircle, label: S.statConversations, value: counts.all },
              { icon: Inbox, label: S.statUnread, value: unreadTotal },
              { icon: CalendarClock, label: S.statAwaiting, value: counts.awaiting },
              { icon: Bot, label: S.statAi, value: aiReplies },
            ].map((x) => (
              <div key={x.label} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <x.icon className="h-4 w-4 text-[#e8d3a6]" />
                <p className="mt-3 text-xl font-bold tabular-nums sm:text-2xl">{loading ? "…" : x.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="h-6 w-6 animate-spin text-ink-300" />
        </div>
      ) : conversations.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center">
          <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
            <MessagesSquare className="h-6 w-6" />
          </span>
          <p className="mt-4 text-base font-bold text-ink-900">{S.empty}</p>
          <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.emptyHint}</p>
        </div>
      ) : (
        <div className="grid h-[calc(100dvh-8rem)] min-h-[560px] grid-cols-[minmax(0,1fr)] overflow-hidden rounded-3xl border border-ink-100 bg-white shadow-[0_24px_60px_-40px_rgba(31,24,45,0.6)] md:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)_280px]">
          {/* List */}
          <aside className={`min-h-0 flex-col border-r border-ink-100 ${selected ? "hidden md:flex" : "flex"}`}>
            <div className="space-y-2.5 border-b border-ink-100 p-3">
              <div className="relative">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.searchPh} className={`${FIELD} bg-mist-50/40 pl-10`} />
              </div>
              <div className="flex gap-1.5 overflow-x-auto">
                {FILTERS.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                      filter === f ? "bg-[#1f182d] text-white" : "bg-mist-50 text-ink-700 ring-1 ring-ink-100 hover:bg-white"
                    }`}
                  >
                    {S.filters[f]}
                    <span className={`rounded-full px-1.5 text-[10px] font-bold ${filter === f ? "bg-white/15" : "bg-white text-ink-400"}`}>{counts[f]}</span>
                  </button>
                ))}
              </div>
            </div>
            <ul className="min-h-0 flex-1 overflow-y-auto">
              {shown.length === 0 && <li className="px-4 py-10 text-center text-sm text-ink-400">{S.noMatch}</li>}
              {shown.map((c) => {
                const on = c.id === selectedId;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(c.id)}
                      className={`relative flex w-full items-start gap-3 px-4 py-3 text-left transition ${on ? "bg-primary-100/50" : "hover:bg-mist-50/60"}`}
                    >
                      {on && <span className="absolute inset-y-2 left-0 w-1 rounded-r-full bg-[#c99a3f]" />}
                      <span className="relative">
                        {avatar(c, "h-11 w-11")}
                        {aiAnswering(c) && (
                          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary-500 text-white ring-2 ring-white">
                            <Sparkles className="h-3 w-3" />
                          </span>
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-baseline justify-between gap-2">
                          <span className={`truncate text-sm ${c.unreadCount ? "font-bold text-ink-900" : "font-semibold text-ink-900"}`}>{c.customerName}</span>
                          {c.lastMessage && <span className="shrink-0 text-[11px] text-ink-400">{ago(c.lastMessage.createdAt)}</span>}
                        </span>
                        <span className="mt-0.5 flex items-center justify-between gap-2">
                          <span className={`truncate text-xs ${c.unreadCount ? "font-semibold text-ink-700" : "text-ink-400"}`}>{preview(c)}</span>
                          {c.unreadCount > 0 ? (
                            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#c2378f] px-1.5 text-[11px] font-bold text-white">{c.unreadCount}</span>
                          ) : (
                            awaiting(c) && <span className="h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                          )}
                        </span>
                        {c.isGuest && <span className="mt-1 inline-block rounded-full bg-mist-50 px-2 py-0.5 text-[10px] font-semibold text-ink-400 ring-1 ring-ink-100">{S.guest}</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Thread */}
          <section className={`min-h-0 flex-col ${selected ? "flex" : "hidden md:flex"}`}>
            {selected ? (
              <>
                <div className="flex items-center gap-3 border-b border-ink-100 px-4 py-3">
                  <button type="button" onClick={() => setSelectedId(null)} aria-label={S.back} className="rounded-full p-1.5 text-ink-400 hover:bg-mist-50 md:hidden">
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  {avatar(selected, "h-10 w-10")}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-bold text-ink-900">{selected.customerName}</p>
                    {selected.customerEmail && (
                      <a href={`mailto:${selected.customerEmail}`} className="flex items-center gap-1 truncate text-xs text-ink-400 hover:text-primary-600">
                        <Mail className="h-3 w-3" />
                        {selected.customerEmail}
                      </a>
                    )}
                  </div>
                </div>

                {/* AI status */}
                <div className={`flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2 text-xs ${aiAnswering(selected) ? "border-primary-100 bg-primary-100/40 text-primary-700" : "border-ink-100 bg-mist-50/60 text-ink-400"}`}>
                  <span className="flex items-center gap-1.5 font-semibold">
                    {aiAnswering(selected) ? <Sparkles className="h-3.5 w-3.5" /> : <UserRound className="h-3.5 w-3.5" />}
                    {!aiChatEnabled ? S.aiDisabled : selected.aiPaused ? S.aiOff : S.aiOn}
                  </span>
                  {aiChatEnabled && (
                    <button
                      type="button"
                      onClick={() => setAiPaused(selected, !selected.aiPaused)}
                      className="rounded-full bg-white px-3 py-1 font-bold text-ink-900 ring-1 ring-ink-100 hover:bg-mist-50"
                    >
                      {selected.aiPaused ? S.handBack : S.takeOver}
                    </button>
                  )}
                </div>

                <div className="min-h-0 flex-1">
                  <ChatWidget key={selected.id} conversationId={selected.id} viewerRole="BUSINESS" title={selected.customerName} locale={locale} prefill={prefill} embedded />
                </div>

                {/* Quick replies */}
                <div className="border-t border-ink-100 bg-[#fffdf8] px-3 py-2">
                  {adding ? (
                    <div className="space-y-2 py-1">
                      <input value={adding.title} onChange={(e) => setAdding({ ...adding, title: e.target.value })} maxLength={60} placeholder={S.quickTitlePh} className={FIELD} />
                      <textarea value={adding.text} onChange={(e) => setAdding({ ...adding, text: e.target.value })} maxLength={2000} rows={2} placeholder={S.quickText} className={FIELD} />
                      <div className="flex gap-2">
                        <button type="button" onClick={saveReply} className={`rounded-full px-4 py-1.5 text-xs font-bold ${GOLD_BTN}`}>
                          {S.save}
                        </button>
                        <button type="button" onClick={() => setAdding(null)} className="rounded-full px-4 py-1.5 text-xs font-semibold text-ink-400 ring-1 ring-ink-100">
                          {S.cancel}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 overflow-x-auto">
                      <span className="flex shrink-0 items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">
                        <Zap className="h-3.5 w-3.5" />
                        {S.quick}
                      </span>
                      {quickReplies.map((r) => (
                        <span key={r.id ?? r.title} className="group flex shrink-0 items-center rounded-full bg-white ring-1 ring-[#ecd9ad]">
                          <button
                            type="button"
                            title={r.text}
                            onClick={() => setPrefill({ text: r.text, nonce: Date.now() })}
                            className="px-3 py-1.5 text-xs font-semibold text-[#6b5221] hover:text-[#1f182d]"
                          >
                            {r.title}
                          </button>
                          {isOwner && r.id && (
                            <button type="button" onClick={() => removeReply(r.id!)} aria-label={S.remove} title={S.remove} className="hidden pr-2 text-ink-300 hover:text-berry-500 group-hover:block">
                              <X className="h-3 w-3" />
                            </button>
                          )}
                        </span>
                      ))}
                      {isOwner && (
                        <button type="button" onClick={() => setAdding({ title: "", text: "" })} className="flex shrink-0 items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold text-primary-600 hover:bg-primary-100/40">
                          <Plus className="h-3.5 w-3.5" />
                          {S.addQuick}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-2 bg-[#faf8fd] px-6 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-primary-500 shadow-sm ring-1 ring-ink-100">
                  <MessageCircle className="h-6 w-6" />
                </span>
                <p className="font-bold text-ink-900">{S.pick}</p>
                <p className="text-xs text-ink-400">{S.pickHint}</p>
              </div>
            )}
          </section>

          {/* Customer */}
          <aside className="hidden min-h-0 overflow-y-auto border-l border-ink-100 bg-[#faf8fd] p-4 xl:block">
            {selected ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex justify-center">{avatar(selected, "h-16 w-16")}</div>
                  <p className="mt-2 font-serif text-lg text-ink-900">{selected.customerName}</p>
                  <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#b08a3e]">{S.info}</p>
                </div>
                {info === null ? (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-5 w-5 animate-spin text-ink-300" />
                  </div>
                ) : info === "none" ? (
                  <p className="rounded-2xl bg-white p-3.5 text-center text-xs text-ink-400 ring-1 ring-ink-100">{S.noBookings}</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-2xl bg-white p-3 ring-1 ring-ink-100">
                        <CalendarCheck className="h-4 w-4 text-primary-500" />
                        <p className="mt-1.5 text-lg font-bold text-ink-900">{info.visitCount}</p>
                        <p className="text-[10px] font-medium text-ink-400">{S.visits}</p>
                      </div>
                      <div className="rounded-2xl bg-white p-3 ring-1 ring-ink-100">
                        <TrendingUp className="h-4 w-4 text-primary-500" />
                        <p className="mt-1.5 truncate text-lg font-bold text-ink-900">{formatMoney(info.totalSpentCents, info.currency, locale)}</p>
                        <p className="text-[10px] font-medium text-ink-400">{S.spent}</p>
                      </div>
                    </div>
                    {nextBooking && (
                      <div className="rounded-2xl bg-emerald-50 p-3 text-xs ring-1 ring-emerald-100">
                        <p className="font-bold uppercase tracking-wider text-emerald-700">{S.nextVisit}</p>
                        <p className="mt-1 font-semibold text-ink-900">{nextBooking.serviceName}</p>
                        <p className="text-ink-700">{dateFmt.format(new Date(nextBooking.startsAt))}</p>
                      </div>
                    )}
                    {lastBooking && (
                      <div className="rounded-2xl bg-white p-3 text-xs ring-1 ring-ink-100">
                        <p className="font-bold uppercase tracking-wider text-ink-400">{S.lastVisit}</p>
                        <p className="mt-1 font-semibold text-ink-900">{lastBooking.serviceName}</p>
                        <p className="text-ink-700">{dateFmt.format(new Date(lastBooking.startsAt))}</p>
                      </div>
                    )}
                    <div className="rounded-2xl bg-gradient-to-br from-[#fffaf0] to-[#f8eedb] p-3 ring-1 ring-[#ecd9ad]">
                      <p className="flex items-center gap-1.5 text-xs font-bold text-[#6b5221]">
                        <StickyNote className="h-3.5 w-3.5" />
                        {S.note}
                      </p>
                      <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={4} maxLength={4000} placeholder={S.notePh} className={`${FIELD} mt-2 border-[#ecd9ad] text-xs`} />
                      {note.trim() !== (info.note ?? "").trim() && (
                        <button type="button" onClick={saveNote} disabled={savingNote} className={`mt-2 flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-bold disabled:opacity-60 ${GOLD_BTN}`}>
                          {savingNote ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                          {S.save}
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-center text-xs text-ink-300">
                <UserRound className="mr-1.5 h-4 w-4" />
                {S.customer}
              </div>
            )}
          </aside>
        </div>
      )}

      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-[90] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          <Check className="h-4 w-4 text-[#e8d3a6]" />
          {toast}
        </div>
      )}
    </div>
  );
}
