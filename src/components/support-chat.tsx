"use client";

import { Fragment, useEffect, useRef, useState, type ReactNode } from "react";
import { Send, Loader2, Sparkles, UserRound } from "lucide-react";
import { WithVaraClipLinks } from "@/components/varaclip-link";

interface SupportMessageDto {
  id: string;
  fromAdmin: boolean;
  fromAi?: boolean;
  content: string;
  createdAt: string;
}

export interface SupportChatLabels {
  placeholder: string;
  send: string;
  empty: string;
  error: string;
  /** Name shown above the other side's bubbles. */
  otherName: string;
  /** Name above AI-written bubbles. */
  aiName?: string;
  /** "Typing…" line while the AI writes its answer. */
  aiTyping?: string;
  /** Button that hands the chat to a person. */
  talkToHuman?: string;
  /** Shown once the chat has been handed to a person. */
  humanRequested?: string;
}

const POLL_MS = 5000;

/** Turns the AI's light markdown into React: [label](/path) links (internal
 * paths get the visitor's language prefix), **bold**, and line breaks. Raw
 * HTML is never rendered. */
function richText(text: string, linkLocale: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)\s]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let m: RegExpExecArray | null;
  let key = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(<WithVaraClipLinks key={key++} text={text.slice(last, m.index)} />);
    if (m[1]) {
      const raw = m[2];
      const internal = raw.startsWith("/");
      const safe = internal || /^https:\/\//i.test(raw);
      const href = internal && linkLocale && linkLocale !== "vi" ? `/${linkLocale}${raw}` : raw;
      out.push(
        safe ? (
          <a
            key={key++}
            href={href}
            target={internal ? undefined : "_blank"}
            rel={internal ? undefined : "noopener noreferrer"}
            className="font-semibold underline decoration-2 underline-offset-2"
          >
            {m[1]}
          </a>
        ) : (
          m[1]
        )
      );
    } else if (m[3]) {
      out.push(<strong key={key++}>{m[3]}</strong>);
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(<WithVaraClipLinks key={key++} text={text.slice(last)} />);
  return out;
}

/** Text chat between someone who needs help (a salon owner, a customer or a
 * guest) and the VaraaAi team — the AI assistant answers on the team's side
 * when the admin has it switched on. `mine` decides which side is "yours". */
export function SupportChat({
  endpoint,
  mine,
  labels,
  locale,
  linkLocale,
  suggestions = [],
  humanEndpoint,
  heightClass = "h-[28rem]",
  autoSend,
  onAutoSent,
}: {
  endpoint: string;
  mine: "OWNER" | "VISITOR" | "ADMIN";
  labels: SupportChatLabels;
  /** For dates. */
  locale: string;
  /** Language prefix for links inside answers; defaults to `locale`. */
  linkLocale?: string;
  /** Quick questions shown while the chat is empty. */
  suggestions?: string[];
  /** Enables the "talk to a person" button. */
  humanEndpoint?: string;
  heightClass?: string;
  /** A question to send as soon as the chat has loaded (e.g. a tapped topic). */
  autoSend?: string | null;
  onAutoSent?: () => void;
}) {
  const [messages, setMessages] = useState<SupportMessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [aiActive, setAiActive] = useState(false);
  const [handingOff, setHandingOff] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const lastIdRef = useRef<string | null>(null);
  const isAdmin = mine === "ADMIN";
  const autoSentRef = useRef<string | null>(null);
  const links = linkLocale ?? locale.split("-")[0];

  useEffect(() => {
    let cancelled = false;
    lastIdRef.current = null;
    setMessages([]);
    setLoading(true);

    async function fetchMessages(after?: string) {
      const res = await fetch(after ? `${endpoint}?after=${after}` : endpoint);
      if (!res.ok || cancelled) return;
      const data = await res.json();
      if (typeof data.aiActive === "boolean") setAiActive(data.aiActive);
      const incoming: SupportMessageDto[] = data.messages ?? [];
      if (incoming.length === 0) return;
      lastIdRef.current = incoming[incoming.length - 1].id;
      setMessages((prev) => {
        if (!after) return incoming;
        const seen = new Set(prev.map((m) => m.id));
        return [...prev, ...incoming.filter((m) => !seen.has(m.id))];
      });
    }

    fetchMessages().finally(() => !cancelled && setLoading(false));
    const interval = setInterval(() => fetchMessages(lastIdRef.current ?? undefined), POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [endpoint]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, sending]);

  function addMessages(incoming: SupportMessageDto[]) {
    if (!incoming.length) return;
    setMessages((prev) => {
      const seen = new Set(prev.map((m) => m.id));
      return [...prev, ...incoming.filter((m) => !seen.has(m.id))];
    });
    const newest = incoming.reduce((a, b) => (a.id > b.id ? a : b));
    if (!lastIdRef.current || newest.id > lastIdRef.current) lastIdRef.current = newest.id;
  }

  async function send(raw?: string) {
    const content = (raw ?? text).trim();
    if (!content || sending) return;
    setSending(true);
    setError(false);
    if (!raw) setText("");
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content, locale: links }),
    }).catch(() => null);
    setSending(false);
    if (!res?.ok) {
      setError(true);
      if (!raw) setText(content);
      return;
    }
    const data = await res.json();
    addMessages(data.messages ?? (data.message ? [data.message] : []));
  }

  async function talkToHuman() {
    if (!humanEndpoint || handingOff) return;
    setHandingOff(true);
    const res = await fetch(humanEndpoint, { method: "POST" }).catch(() => null);
    setHandingOff(false);
    if (!res?.ok) {
      setError(true);
      return;
    }
    const data = await res.json();
    setAiActive(false);
    if (data.message) addMessages([data.message]);
  }

  useEffect(() => {
    if (loading || !autoSend || autoSentRef.current === autoSend) return;
    autoSentRef.current = autoSend;
    send(autoSend);
    onAutoSent?.();
    // send() is recreated each render; only a new question should trigger this.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, autoSend]);

  const showHumanButton = !!humanEndpoint && aiActive && messages.length > 0 && !!labels.talkToHuman;

  return (
    <div className={`flex ${heightClass} min-w-0 flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white`}>
      <div ref={listRef} className="min-w-0 flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <p className="flex items-center gap-2 text-sm text-ink-400">
            <Loader2 className="h-4 w-4 animate-spin" /> ...
          </p>
        ) : messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
            <p className="max-w-sm text-sm text-ink-400">{labels.empty}</p>
            {suggestions.length > 0 && (
              <div className="flex max-w-lg flex-wrap justify-center gap-2">
                {suggestions.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => send(q)}
                    disabled={sending}
                    className="rounded-full border border-primary-200 bg-primary-50 px-3 py-1.5 text-xs font-medium text-primary-700 transition-colors hover:bg-primary-100 disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          messages.map((m) => {
            const isMine = isAdmin === m.fromAdmin;
            const ai = !!m.fromAi;
            const name = ai ? labels.aiName ?? "AI" : labels.otherName;
            const bubble = isMine
              ? ai
                ? "bg-primary-50 text-ink-900 ring-1 ring-primary-200"
                : "bg-primary-500 text-white"
              : ai
                ? "bg-gradient-to-br from-primary-50 to-peach-50 text-ink-900 ring-1 ring-primary-100"
                : "bg-mist-100 text-ink-900";
            const muted = isMine && !ai ? "text-white/70" : "text-ink-400";
            return (
              <div key={m.id} className={`flex min-w-0 ${isMine ? "justify-end" : "justify-start"}`}>
                <div className={`min-w-0 max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${bubble}`}>
                  {(!isMine || ai) && (
                    <p className={`mb-1 flex items-center gap-1 text-[11px] font-semibold ${ai ? "text-primary-600" : "text-ink-400"}`}>
                      {ai && <Sparkles className="h-3 w-3" />}
                      {name}
                    </p>
                  )}
                  <p className="whitespace-pre-line break-words [overflow-wrap:anywhere]">
                    {m.fromAdmin
                      ? richText(m.content, links).map((n, i) => <Fragment key={i}>{n}</Fragment>)
                      : m.content}
                  </p>
                  <p className={`mt-1 text-[10px] ${muted}`}>
                    {new Date(m.createdAt).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" })}
                  </p>
                </div>
              </div>
            );
          })
        )}
        {sending && aiActive && !isAdmin && (
          <div className="flex justify-start">
            <div className="flex items-center gap-2 rounded-2xl bg-primary-50 px-3.5 py-2.5 text-xs font-medium text-primary-600 ring-1 ring-primary-100">
              <Sparkles className="h-3.5 w-3.5 animate-pulse" />
              {labels.aiTyping ?? "…"}
            </div>
          </div>
        )}
      </div>

      {error && <p className="px-4 pt-2 text-xs text-berry-500">{labels.error}</p>}

      {showHumanButton && (
        <div className="flex justify-center border-t border-ink-50 px-3 pt-2">
          <button
            type="button"
            onClick={talkToHuman}
            disabled={handingOff}
            className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold text-ink-700 transition-colors hover:bg-mist-100"
          >
            {handingOff ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <UserRound className="h-3.5 w-3.5" />}
            {labels.talkToHuman}
          </button>
        </div>
      )}

      <div className="flex items-center gap-2 border-t border-ink-100 p-3">
        <input
          className="input min-w-0 flex-1"
          placeholder={labels.placeholder}
          value={text}
          maxLength={4000}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              send();
            }
          }}
        />
        <button
          type="button"
          onClick={() => send()}
          disabled={sending || !text.trim()}
          className="btn-primary shrink-0 !p-2.5"
          aria-label={labels.send}
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
