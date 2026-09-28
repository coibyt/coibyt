"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Loader2 } from "lucide-react";

interface SupportMessageDto {
  id: string;
  fromAdmin: boolean;
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
}

const POLL_MS = 5000;

/** Text-only chat between a salon owner and the admin team, used from both
 * sides — `mine` decides which bubbles are drawn as "yours". */
export function SupportChat({
  endpoint,
  mine,
  labels,
  locale,
}: {
  endpoint: string;
  mine: "OWNER" | "ADMIN";
  labels: SupportChatLabels;
  locale: string;
}) {
  const [messages, setMessages] = useState<SupportMessageDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const lastIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    lastIdRef.current = null;
    setMessages([]);
    setLoading(true);

    async function fetchMessages(after?: string) {
      const res = await fetch(after ? `${endpoint}?after=${after}` : endpoint);
      if (!res.ok || cancelled) return;
      const data = await res.json();
      const incoming: SupportMessageDto[] = data.messages ?? [];
      if (incoming.length === 0) return;
      lastIdRef.current = incoming[incoming.length - 1].id;
      setMessages((prev) => (after ? [...prev, ...incoming] : incoming));
    }

    fetchMessages().finally(() => !cancelled && setLoading(false));
    const interval = setInterval(() => fetchMessages(lastIdRef.current ?? undefined), POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [endpoint]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  async function send() {
    const content = text.trim();
    if (!content || sending) return;
    setSending(true);
    setError(false);
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    setSending(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    const data = await res.json();
    setMessages((prev) => [...prev, data.message]);
    lastIdRef.current = data.message.id;
    setText("");
  }

  return (
    <div className="flex h-[28rem] flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-4">
        {loading ? (
          <p className="flex items-center gap-2 text-sm text-ink-400">
            <Loader2 className="h-4 w-4 animate-spin" /> ...
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-sm text-ink-400">{labels.empty}</p>
        ) : (
          messages.map((m) => {
            const isMine = (mine === "ADMIN") === m.fromAdmin;
            return (
              <div key={m.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    isMine ? "bg-primary-500 text-white" : "bg-mist-100 text-ink-900"
                  }`}
                >
                  {!isMine && (
                    <p className="mb-0.5 text-[11px] font-semibold text-ink-400">{labels.otherName}</p>
                  )}
                  <p className="whitespace-pre-line break-words">{m.content}</p>
                  <p className={`mt-1 text-[10px] ${isMine ? "text-white/70" : "text-ink-400"}`}>
                    {new Date(m.createdAt).toLocaleString(locale, {
                      dateStyle: "short",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {error && <p className="px-4 pt-2 text-xs text-berry-500">{labels.error}</p>}

      <div className="flex items-center gap-2 border-t border-ink-100 p-3">
        <input
          className="input flex-1"
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
          onClick={send}
          disabled={sending || !text.trim()}
          className="btn-primary !p-2.5"
          aria-label={labels.send}
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
