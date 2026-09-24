"use client";

import { useEffect, useRef, useState } from "react";
import { Send, Paperclip, X, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  senderType: "CUSTOMER" | "BUSINESS";
  senderId: string;
  content: string | null;
  hasImage: boolean;
  createdAt: string;
}

const POLL_MS = 4000;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export function ChatWidget({
  conversationId,
  viewerRole,
  title,
  locale,
  onClose,
}: {
  conversationId: string;
  viewerRole: "CUSTOMER" | "BUSINESS";
  title: string;
  locale: string;
  onClose?: () => void;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [pendingImage, setPendingImage] = useState<File | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const lastIdRef = useRef<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchMessages(after?: string) {
      const url = after
        ? `/api/chat/conversations/${conversationId}/messages?after=${after}`
        : `/api/chat/conversations/${conversationId}/messages`;
      const res = await fetch(url);
      if (!res.ok || cancelled) return;
      const data = await res.json();
      const incoming: ChatMessage[] = data.messages ?? [];
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
  }, [conversationId]);

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

      <div ref={listRef} className="flex-1 space-y-2 overflow-y-auto p-4">
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
            const mine = m.senderType === viewerRole;
            return (
              <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[75%] rounded-2xl px-3 py-2 text-sm ${
                    mine ? "bg-primary-500 text-white" : "bg-mist-100 text-ink-900"
                  }`}
                >
                  {m.hasImage && (
                    <img
                      src={`/api/chat/messages/${m.id}/image`}
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
