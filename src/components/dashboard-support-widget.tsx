"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  ChevronDown,
  ChevronRight,
  HelpCircle,
  Home,
  Megaphone,
  MessageCircle,
  PlayCircle,
  Search,
  SendHorizontal,
  Sparkles,
  X,
} from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SupportChat } from "@/components/support-chat";
import { supportCenterStrings } from "@/lib/support-ai/strings";
import { supportWidgetStrings } from "@/lib/support-ai/widget-strings";

interface Overview {
  name: string;
  unreadReplies: number;
  unreadAnnouncements: number;
  aiActive: boolean;
  trainings: { id: string; title: string; description: string | null; url: string }[];
  announcements: { id: string; title: string; body: string; createdAt: string; unread: boolean }[];
}

type Tab = "home" | "messages" | "help" | "news";

const POLL_MS = 60_000;

/** The salon dashboard's floating help button (bottom right): a panel with a
 * home screen (greeting, ask a question, quick topics, latest news), the
 * support chat — AI first when the admin has it on — the training guides and
 * VaraaAi's announcements. A red dot shows unread replies or news. */
export function DashboardSupportWidget({ locale }: { locale: string }) {
  const t = supportWidgetStrings(locale);
  const center = supportCenterStrings(locale);
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [data, setData] = useState<Overview | null>(null);
  const [query, setQuery] = useState("");
  const [pending, setPending] = useState<string | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/support/overview").catch(() => null);
    if (res?.ok) setData(await res.json());
  }, []);

  useEffect(() => {
    load();
    const id = setInterval(load, POLL_MS);
    return () => clearInterval(id);
  }, [load]);

  useEffect(() => {
    if (open) load();
  }, [open, load]);

  // Opening the chat reads the replies; opening the news marks it seen.
  useEffect(() => {
    if (!open || !data) return;
    if (tab === "messages" && data.unreadReplies) setData({ ...data, unreadReplies: 0 });
    if (tab === "news" && data.unreadAnnouncements) {
      fetch("/api/support/announcements/seen", { method: "POST" }).catch(() => {});
      setData({ ...data, unreadAnnouncements: 0 });
    }
  }, [open, tab, data]);

  function ask(question: string) {
    const q = question.trim();
    if (!q) return;
    setPending(q);
    setQuery("");
    setTab("messages");
  }

  const unread = (data?.unreadReplies ?? 0) + (data?.unreadAnnouncements ?? 0);
  const topics = t.topics.filter((x) => x.toLowerCase().includes(query.trim().toLowerCase()));
  const latest = data?.announcements[0];
  // Vietnamese names end with the given name; most others start with it.
  const nameParts = (data?.name ?? "").trim().split(/\s+/);
  const firstName = (locale === "vi" ? nameParts[nameParts.length - 1] : nameParts[0]) ?? "";

  const tabs: { key: Tab; label: string; icon: typeof Home; badge?: number; dot?: boolean }[] = [
    { key: "home", label: t.tabHome, icon: Home },
    { key: "messages", label: t.tabMessages, icon: MessageCircle, badge: data?.unreadReplies },
    { key: "help", label: t.tabHelp, icon: HelpCircle },
    { key: "news", label: t.tabNews, icon: Megaphone, dot: !!data?.unreadAnnouncements },
  ];

  return (
    <>
      {open && (
        <div
          role="dialog"
          aria-label={t.chatTitle}
          className="fixed inset-0 z-[70] flex animate-slide-up flex-col overflow-hidden bg-white sm:inset-auto sm:bottom-24 sm:right-5 sm:h-[min(680px,calc(100vh-8rem))] sm:w-[400px] sm:rounded-3xl sm:shadow-[0_24px_64px_-12px_rgba(31,24,45,0.45)] sm:ring-1 sm:ring-ink-100"
        >
          <div className="min-h-0 flex-1 overflow-hidden">
            {tab === "home" && (
              <div className="h-full overflow-y-auto bg-gradient-to-b from-primary-700 via-primary-500 via-30% to-mist-50 to-50%">
                <div className="px-6 pb-6 pt-5 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-extrabold tracking-tight">
                      Varaa<span className="text-peach-200">Ai</span>
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white ring-2 ring-primary-500">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src="/icons/icon-192.png" alt="" className="h-7 w-7 rounded-full" />
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-peach-200 to-coral-400 text-primary-900 ring-2 ring-primary-500">
                          <Sparkles className="h-4 w-4" />
                        </span>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-900 text-xs font-bold ring-2 ring-primary-500">
                          V
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setOpen(false)}
                        className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15"
                        aria-label={t.close}
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <p className="mt-10 text-3xl font-extrabold leading-tight">
                    {t.hi(firstName)} <span aria-hidden>👋</span>
                    <br />
                    {t.howHelp}
                  </p>
                </div>

                <div className="space-y-3 px-4 pb-5">
                  <button
                    type="button"
                    onClick={() => setTab("messages")}
                    className="flex w-full items-center justify-between gap-3 rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-ink-100 transition-shadow hover:shadow-popover"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-ink-900">{t.askTitle}</p>
                      <p className="mt-0.5 text-sm text-ink-400">{t.askBody}</p>
                    </div>
                    <SendHorizontal className="h-5 w-5 shrink-0 text-primary-500" />
                  </button>

                  <div className="rounded-2xl bg-white p-2 shadow-card ring-1 ring-ink-100">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        ask(query);
                      }}
                      className="flex items-center gap-2 rounded-xl bg-mist-50 px-3"
                    >
                      <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder={t.searchPlaceholder}
                        className="min-w-0 flex-1 bg-transparent py-3 text-sm font-semibold text-ink-900 outline-none placeholder:text-ink-700"
                      />
                      <button type="submit" aria-label={t.searchAsk} className="text-primary-500">
                        <Search className="h-5 w-5" />
                      </button>
                    </form>
                    <ul className="mt-1">
                      {topics.slice(0, query ? 8 : 5).map((topic) => (
                        <li key={topic}>
                          <button
                            type="button"
                            onClick={() => ask(topic)}
                            className="flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-ink-700 hover:bg-mist-50"
                          >
                            {topic}
                            <ChevronRight className="h-4 w-4 shrink-0 text-primary-500" />
                          </button>
                        </li>
                      ))}
                      {query.trim() && (
                        <li>
                          <button
                            type="button"
                            onClick={() => ask(query)}
                            className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-primary-600 hover:bg-primary-50"
                          >
                            <Sparkles className="h-4 w-4 shrink-0" />
                            {t.searchAsk}: “{query.trim()}”
                          </button>
                        </li>
                      )}
                    </ul>
                  </div>

                  {latest && (
                    <button
                      type="button"
                      onClick={() => setTab("news")}
                      className="block w-full rounded-2xl bg-white p-4 text-left shadow-card ring-1 ring-ink-100"
                    >
                      <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary-600">
                        <Megaphone className="h-3.5 w-3.5" />
                        {t.latestNews}
                        {latest.unread && <span className="rounded-full bg-berry-500 px-1.5 text-[10px] text-white">{t.newBadge}</span>}
                      </p>
                      <p className="mt-2 font-bold text-ink-900">{latest.title}</p>
                      <p className="mt-1 line-clamp-2 text-sm text-ink-400">{latest.body}</p>
                    </button>
                  )}
                </div>
              </div>
            )}

            {tab === "messages" && (
              <div className="flex h-full flex-col">
                <PanelHeader title={t.chatTitle} subtitle={data?.aiActive ? t.aiOnline : t.teamReplies} onBack={() => setTab("home")} onClose={() => setOpen(false)} closeLabel={t.close} />
                <div className="min-h-0 flex-1">
                  <SupportChat
                    endpoint="/api/support/messages"
                    humanEndpoint="/api/support/human"
                    mine="OWNER"
                    locale={locale}
                    linkLocale={locale}
                    heightClass="h-full !rounded-none !border-0"
                    suggestions={t.topics.slice(0, 4)}
                    autoSend={pending}
                    onAutoSent={() => setPending(null)}
                    labels={{
                      placeholder: center.placeholder,
                      send: center.send,
                      empty: center.empty,
                      error: center.error,
                      otherName: center.teamName,
                      aiName: center.aiName,
                      aiTyping: center.aiTyping,
                      talkToHuman: center.talkToHuman,
                    }}
                  />
                </div>
              </div>
            )}

            {tab === "help" && (
              <div className="flex h-full flex-col">
                <PanelHeader title={t.helpTitle} onBack={() => setTab("home")} onClose={() => setOpen(false)} closeLabel={t.close} />
                <div className="min-h-0 flex-1 space-y-2 overflow-y-auto bg-mist-50 p-4">
                  <Link
                    href="/help/getting-started"
                    className="flex items-center gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100"
                    onClick={() => setOpen(false)}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <BookOpen className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-bold text-ink-900">{t.helpCenter}</span>
                    <ChevronRight className="h-4 w-4 text-primary-500" />
                  </Link>
                  {data?.trainings.length ? (
                    data.trainings.map((r) => (
                      <a
                        key={r.id}
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-coral-50 text-coral-500">
                          <PlayCircle className="h-5 w-5" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold text-ink-900">{r.title}</span>
                          {r.description && <span className="mt-0.5 block line-clamp-2 text-xs text-ink-400">{r.description}</span>}
                        </span>
                        <ChevronRight className="mt-2.5 h-4 w-4 shrink-0 text-primary-500" />
                      </a>
                    ))
                  ) : (
                    <p className="px-2 py-6 text-center text-sm text-ink-400">{t.helpEmpty}</p>
                  )}
                </div>
              </div>
            )}

            {tab === "news" && (
              <div className="flex h-full flex-col">
                <PanelHeader title={t.newsTitle} onBack={() => setTab("home")} onClose={() => setOpen(false)} closeLabel={t.close} />
                <div className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-mist-50 p-4">
                  {data?.announcements.length ? (
                    data.announcements.map((a) => (
                      <article key={a.id} className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-ink-100">
                        <p className="flex items-center gap-2 text-[11px] font-semibold text-ink-400">
                          {new Date(a.createdAt).toLocaleDateString(locale, { dateStyle: "medium" })}
                          {a.unread && <span className="rounded-full bg-berry-500 px-1.5 text-[10px] text-white">{t.newBadge}</span>}
                        </p>
                        <p className="mt-1 font-bold text-ink-900">{a.title}</p>
                        <p className="mt-1 whitespace-pre-line text-sm text-ink-700">{a.body}</p>
                      </article>
                    ))
                  ) : (
                    <p className="py-6 text-center text-sm text-ink-400">{t.newsEmpty}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <nav className="grid shrink-0 grid-cols-4 border-t border-ink-100 bg-white pb-[env(safe-area-inset-bottom)]">
            {tabs.map(({ key, label, icon: Icon, badge, dot }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`relative flex flex-col items-center gap-1 py-2.5 text-[11px] font-semibold ${
                  tab === key ? "text-primary-600" : "text-ink-400 hover:text-ink-700"
                }`}
              >
                <span className="relative">
                  <Icon className={`h-6 w-6 ${tab === key ? "fill-primary-100" : ""}`} />
                  {!!badge && (
                    <span className="absolute -right-2 -top-1.5 min-w-[18px] rounded-full bg-berry-500 px-1 text-center text-[10px] font-bold leading-[18px] text-white">
                      {badge}
                    </span>
                  )}
                  {dot && <span className="absolute -right-1 -top-0.5 h-2.5 w-2.5 rounded-full bg-berry-500 ring-2 ring-white" />}
                </span>
                {label}
              </button>
            ))}
          </nav>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? t.close : t.open}
        className={`fixed bottom-5 right-5 z-[71] h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-[0_12px_28px_-6px_rgba(98,79,137,0.7)] transition-transform hover:scale-105 ${
          open ? "hidden sm:flex" : "flex"
        }`}
      >
        {open ? <ChevronDown className="h-7 w-7" /> : <MessageCircle className="h-7 w-7" />}
        {!open && unread > 0 && (
          <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full bg-berry-500 ring-2 ring-white" />
        )}
      </button>
    </>
  );
}

function PanelHeader({
  title,
  subtitle,
  onBack,
  onClose,
  closeLabel,
}: {
  title: string;
  subtitle?: string;
  onBack: () => void;
  onClose: () => void;
  closeLabel: string;
}) {
  return (
    <div className="flex shrink-0 items-center gap-2 bg-gradient-to-r from-primary-700 to-primary-500 px-2 py-3 text-white">
      <button type="button" onClick={onBack} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15" aria-label="Back">
        <ArrowLeft className="h-5 w-5" />
      </button>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold">{title}</p>
        {subtitle && <p className="truncate text-xs text-white/75">{subtitle}</p>}
      </div>
      <button type="button" onClick={onClose} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/15" aria-label={closeLabel}>
        <X className="h-5 w-5" />
      </button>
    </div>
  );
}
