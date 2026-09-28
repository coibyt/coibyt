"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { SupportChat } from "@/components/support-chat";

interface ThreadRow {
  id: string;
  ownerName: string;
  ownerEmail: string;
  businessNames: string[];
  lastMessage: string;
  lastMessageAt: string;
  unread: number;
}

/** The admin's side of salon-owner support: every owner who wrote in, with
 * the chat for the selected one. */
export function AdminSupportInbox() {
  const [threads, setThreads] = useState<ThreadRow[] | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const res = await fetch("/api/admin/support/threads");
      if (!res.ok || cancelled) return;
      const data = await res.json();
      setThreads(data.threads ?? []);
    }
    load();
    const interval = setInterval(load, 10000);
    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  if (threads === null) {
    return (
      <p className="flex items-center gap-2 text-sm text-ink-400">
        <Loader2 className="h-4 w-4 animate-spin" /> Đang tải...
      </p>
    );
  }

  if (threads.length === 0) {
    return <p className="text-sm text-ink-400">Chưa có chủ salon nào nhắn tin hỗ trợ.</p>;
  }

  const active = threads.find((t) => t.id === activeId) ?? null;

  return (
    <div className="grid gap-4 md:grid-cols-[280px_1fr]">
      <div className="space-y-2">
        {threads.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveId(t.id)}
            className={`w-full rounded-2xl border p-3 text-left transition-colors ${
              t.id === activeId
                ? "border-primary-500 bg-primary-50"
                : "border-ink-100 bg-white hover:border-ink-400"
            }`}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="font-semibold text-ink-900">{t.ownerName}</p>
              {t.unread > 0 && (
                <span className="rounded-full bg-berry-500 px-1.5 text-[10px] font-bold leading-4 text-white">
                  {t.unread}
                </span>
              )}
            </div>
            <p className="truncate text-xs text-ink-400">
              {t.businessNames.join(", ") || t.ownerEmail}
            </p>
            <p className="mt-1 truncate text-sm text-ink-700">{t.lastMessage}</p>
          </button>
        ))}
      </div>

      <div>
        {active ? (
          <>
            <p className="mb-2 text-sm text-ink-700">
              <span className="font-semibold text-ink-900">{active.ownerName}</span> · {active.ownerEmail}
              {active.businessNames.length > 0 && ` · ${active.businessNames.join(", ")}`}
            </p>
            <SupportChat
              endpoint={`/api/admin/support/threads/${active.id}/messages`}
              mine="ADMIN"
              locale="vi-VN"
              labels={{
                placeholder: "Nhập câu trả lời...",
                send: "Gửi",
                empty: "Chưa có tin nhắn.",
                error: "Không gửi được, vui lòng thử lại.",
                otherName: active.ownerName,
              }}
            />
          </>
        ) : (
          <p className="text-sm text-ink-400">Chọn một cuộc trò chuyện ở bên trái.</p>
        )}
      </div>
    </div>
  );
}
