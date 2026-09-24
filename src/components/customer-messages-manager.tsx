"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { ChatWidget } from "@/components/chat-widget";

interface ConversationRow {
  id: string;
  businessName: string;
  businessSlug: string;
  businessLogoUrl: string | null;
  lastMessage: {
    content: string | null;
    hasImage: boolean;
    senderType: "CUSTOMER" | "BUSINESS";
    createdAt: string;
  } | null;
  unreadCount: number;
  updatedAt: string;
}

const POLL_MS = 6000;

export function CustomerMessagesManager({ locale }: { locale: string }) {
  const [conversations, setConversations] = useState<ConversationRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/chat/conversations");
      if (!res.ok || cancelled) return;
      const data = await res.json();
      setConversations(data.conversations ?? []);
    }
    load().finally(() => !cancelled && setLoading(false));
    const interval = setInterval(load, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  const selected = conversations.find((c) => c.id === selectedId);

  if (loading) {
    return (
      <p className="flex items-center gap-2 text-sm text-ink-400">
        <Loader2 className="h-4 w-4 animate-spin" /> ...
      </p>
    );
  }

  if (conversations.length === 0) {
    return (
      <p className="text-sm text-ink-400">
        {locale === "vi" ? "Bạn chưa nhắn tin với salon nào." : "You haven't messaged any salons yet."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-[280px_1fr]">
      <div className="space-y-1.5 overflow-y-auto sm:max-h-[32rem]">
        {conversations.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`block w-full rounded-xl border p-3 text-left text-sm transition-colors ${
              selectedId === c.id
                ? "border-primary-500 bg-primary-50"
                : "border-ink-100 hover:border-ink-400"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="font-medium text-ink-900">{c.businessName}</span>
              {c.unreadCount > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-berry-500 px-1 text-[11px] font-semibold text-white">
                  {c.unreadCount}
                </span>
              )}
            </div>
            {c.lastMessage && (
              <p className="mt-0.5 truncate text-xs text-ink-400">
                {c.lastMessage.senderType === "CUSTOMER" ? (locale === "vi" ? "Bạn: " : "You: ") : ""}
                {c.lastMessage.content ?? (locale === "vi" ? "[Hình ảnh]" : "[Image]")}
              </p>
            )}
          </button>
        ))}
      </div>

      <div className="h-[32rem]">
        {selected ? (
          <ChatWidget
            key={selected.id}
            conversationId={selected.id}
            viewerRole="CUSTOMER"
            title={selected.businessName}
            locale={locale}
          />
        ) : (
          <div className="flex h-full items-center justify-center rounded-2xl border border-ink-100 text-sm text-ink-400">
            {locale === "vi" ? "Chọn một cuộc trò chuyện để xem" : "Select a conversation to view it"}
          </div>
        )}
      </div>
    </div>
  );
}
