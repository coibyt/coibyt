"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, X, Loader2, ThumbsUp, Sparkles } from "lucide-react";
import { EmojiPicker } from "@/components/emoji-picker";

interface ChatMessage {
  id: string;
  senderType: "CUSTOMER" | "BUSINESS" | "AI";
  senderId: string;
  senderImage: string | null;
  content: string | null;
  hasImage: boolean;
  createdAt: string;
}

interface ReactionSummary {
  emoji: string;
  count: number;
  mine: boolean;
}

const POLL_MS = 4000;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function ChatWidget({
  conversationId,
  viewerRole,
  title,
  locale,
  guestId,
  aiChatEnabled = false,
  aiPaused = false,
  onClose,
}: {
  conversationId: string;
  viewerRole: "CUSTOMER" | "BUSINESS";
  title: string;
  locale: string;
  /** Set only for an anonymous customer chatting without an account (see
   * useGuestChat) — appended to every request in place of a session. */
  guestId?: string | null;
  /** Customer side only — whether this salon's AI assistant is turned on at
   * all, and whether this specific thread already asked to skip it (see
   * POST .../request-human). Controls the "talk to the real owner" button. */
  aiChatEnabled?: boolean;
  aiPaused?: boolean;
  onClose?: () => void;
}) {
  const guestQuery = guestId ? `guestId=${encodeURIComponent(guestId)}` : "";
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [reactions, setReactions] = useState<Record<string, ReactionSummary[]>>({});
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [paused, setPaused] = useState(aiPaused);
  const [requestingHuman, setRequestingHuman] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMessages(after?: string) {
      const params = new URLSearchParams();
      if (after) params.set("after", after);
      if (guestId) params.set("guestId", guestId);
      const qs = params.toString();
      const url = `/api/chat/conversations/${conversationId}/messages${qs ? `?${qs}` : ""}`;
      const res = await fetch(url);
      if (!res.ok || cancelled) return;
      const data = await res.json();
      const incoming: ChatMessage[] = data.messages ?? [];
      if (incoming.length === 0) return;
      lastIdRef.current = incoming[incoming.length - 1].id;
      setMessages((prev) => (after ? [...prev, ...incoming] : incoming));
    }

    async function fetchReactions() {
      const res = await fetch(
        `/api/chat/conversations/${conversationId}/reactions${guestQuery ? `?${guestQuery}` : ""}`
      );
      if (!res.ok || cancelled) return;
      const data = await res.json();
      setReactions(data.reactions ?? {});
    }

    Promise.all([fetchMessages(), fetchReactions()]).finally(() => !cancelled && setLoading(false));
    const interval = setInterval(() => {
      fetchMessages(lastIdRef.current ?? undefined);
      fetchReactions();
    }, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [conversationId, guestId, guestQuery]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [messages]);

  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) {
      setError(locale === "vi" ? "Ảnh quá lớn (tối đa 5MB)." : "Image too large (max 5MB).");
      return;
    }
    setPendingImage(file);
  }

  async function send() {
    if (!text.trim() && !pendingImage) return;
    setSending(true);
    setError(null);
    const form = new FormData();
    if (text.trim()) form.set("content", text.trim());
    if (pendingImage) form.set("image", pendingImage);
    if (guestId) form.set("guestId", guestId);

    const res = await fetch(`/api/chat/conversations/${conversationId}/messages`, {
      method: "POST",
      body: form,
    });
    setSending(false);
    if (!res.ok) {
      setError(locale === "vi" ? "Không gửi được, vui lòng thử lại." : "Couldn't send, please try again.");
      return;
    }
    const data = await res.json();
    setMessages((prev) => [...prev, data.message]);
    lastIdRef.current = data.message.id;
    setText("");
    setPendingImage(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function requestHuman() {
    setRequestingHuman(true);
    const res = await fetch(`/api/chat/conversations/${conversationId}/request-human`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ guestId: guestId || undefined }),
    });
    setRequestingHuman(false);
    if (res.ok) setPaused(true);
  }

  async function react(messageId: string, emoji: string) {
    const res = await fetch(`/api/chat/messages/${messageId}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emoji, guestId: guestId || undefined }),
    });
    if (!res.ok) return;
    const data = await res.json();
    setReactions((prev) => ({ ...prev, [messageId]: data.reactions ?? [] }));
  }

  return (
    <div className="flex h-full max-h-[32rem] flex-col overflow-hidden rounded-2xl border border-ink-100 bg-white">
      <div className="flex items-center justify-between border-b border-ink-100 px-4 py-3">
        <p className="font-semibold text-ink-900">{title}</p>
        {onClose && (
          <button onClick={onClose} className="text-ink-400">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {viewerRole === "CUSTOMER" && aiChatEnabled && (
        <div className="flex items-center justify-between gap-2 border-b border-ink-100 bg-primary-50 px-4 py-2 text-xs">
          <span className="flex items-center gap-1.5 text-primary-700">
            <Sparkles className="h-3.5 w-3.5" />
            {paused
              ? locale === "vi"
                ? "Đã báo chủ salon — họ sẽ trả lời sớm."
                : "The owner has been notified — they'll reply soon."
              : locale === "vi"
                ? "Trợ lý AI đang hỗ trợ bạn."
                : "An AI assistant is helping you."}
          </span>
          {!paused && (
            <button
              type="button"
              onClick={requestHuman}
              disabled={requestingHuman}
              className="shrink-0 whitespace-nowrap font-semibold text-primary-700 underline disabled:opacity-50"
            >
              {locale === "vi" ? "Nói chuyện với chủ salon" : "Talk to the owner"}
            </button>
          )}
        </div>
      )}

      <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4">
        {loading ? (
          <p className="flex items-center gap-2 text-sm text-ink-400">
            <Loader2 className="h-4 w-4 animate-spin" /> ...
          </p>
        ) : messages.length === 0 ? (
          <p className="text-center text-sm text-ink-400">
            {locale === "vi" ? "Chưa có tin nhắn nào." : "No messages yet."}
          </p>
        ) : (
          messages.map((m) => {
            // An AI reply sits on the "business side" of the thread for a
            // customer (it's answering on the salon's behalf), but reads as
            // "not mine" for the owner's own view too — the two sides never
            // show it as self-sent, just differently aligned.
            const mine =
              m.senderType === viewerRole || (m.senderType === "AI" && viewerRole === "BUSINESS");
            const myReaction = (reactions[m.id] ?? []).find((r) => r.mine);
            return (
              <div key={m.id} className={`flex items-end gap-2 ${mine ? "flex-row-reverse" : "flex-row"}`}>
                {!mine && (
                  <div className="h-6 w-6 shrink-0 overflow-hidden rounded-full bg-mist-100">
                    {m.senderType === "AI" ? (
                      <div className="flex h-full w-full items-center justify-center text-primary-500">
                        <Sparkles className="h-3.5 w-3.5" />
                      </div>
                    ) : (
                      m.senderImage && <img src={m.senderImage} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                )}
                <div className={`flex flex-col ${mine ? "items-end" : "items-start"}`}>
                  {m.senderType === "AI" && (
                    <span className="mb-0.5 flex items-center gap-1 text-[10px] font-semibold text-primary-500">
                      <Sparkles className="h-2.5 w-2.5" />
                      {locale === "vi" ? "Trợ lý AI" : "AI Assistant"}
                    </span>
                  )}
                  <div
                    className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                      mine ? "bg-primary-500 text-white" : "bg-mist-100 text-ink-900"
                    }`}
                  >
                    {m.hasImage && (
                      <img
                        src={`/api/chat/messages/${m.id}/image${guestQuery ? `?${guestQuery}` : ""}`}
                        alt=""
                        className="mb-1 max-h-48 rounded-lg object-contain"
                      />
                    )}
                    {m.content && <p className="whitespace-pre-line">{m.content}</p>}
                    <p className={`mt-1 text-[10px] ${mine ? "text-white/70" : "text-ink-400"}`}>
                      {new Date(m.createdAt).toLocaleTimeString(locale === "vi" ? "vi-VN" : "en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>

                  <div className="mt-1 flex items-center gap-1">
                    {(reactions[m.id] ?? []).map((r) => (
                      <button
                        key={r.emoji}
                        type="button"
                        onClick={() => react(m.id, r.emoji)}
                        className={`flex items-center gap-0.5 rounded-full border px-1.5 py-0.5 text-[11px] ${
                          r.mine ? "border-primary-500 bg-primary-50" : "border-ink-100 bg-white"
                        }`}
                      >
                        <span>{r.emoji}</span>
                        <span className="text-ink-400">{r.count}</span>
                      </button>
                    ))}
                    <button
                      type="button"
                      onClick={() => react(m.id, "👍")}
                      className={`rounded-full p-1 text-ink-400 hover:bg-mist-100 ${
                        myReaction?.emoji === "👍" ? "text-primary-500" : ""
                      }`}
                      aria-label={locale === "vi" ? "Thích" : "Like"}
                    >
                      <ThumbsUp className="h-3 w-3" />
                    </button>
                    <EmojiPicker
                      onPick={(emoji) => react(m.id, emoji)}
                      className="rounded-full p-1 text-ink-400 hover:bg-mist-100"
                    />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {pendingImage && (
        <div className="flex items-center gap-2 border-t border-ink-100 px-4 py-2 text-xs text-ink-700">
          <span className="truncate">{pendingImage.name}</span>
          <button onClick={() => setPendingImage(null)} className="text-berry-500">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {error && <p className="px-4 pt-2 text-xs text-berry-500">{error}</p>}

      <div className="flex items-center gap-2 border-t border-ink-100 p-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={onPickImage}
        />
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="btn-ghost !p-2 text-ink-700"
          aria-label={locale === "vi" ? "Đính kèm ảnh" : "Attach image"}
        >
          <Paperclip className="h-4 w-4" />
        </button>
        <input
          className="input flex-1"
          placeholder={locale === "vi" ? "Nhập tin nhắn..." : "Type a message..."}
          value={text}
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
          disabled={sending || (!text.trim() && !pendingImage)}
          className="btn-primary !p-2.5"
          aria-label={locale === "vi" ? "Gửi" : "Send"}
        >
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
