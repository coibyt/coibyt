"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Check, Copy, ExternalLink, Loader2, Sparkles } from "lucide-react";
import { SupportChat } from "@/components/support-chat";

interface ThreadRow {
  id: string;
  kind: "owner" | "staff" | "customer" | "guest";
  name: string;
  email: string;
  businessNames: string[];
  locale: string;
  aiPaused: boolean;
  lastMessage: string;
  lastFromAi: boolean;
  lastMessageAt: string;
  unread: number;
}

const KIND: Record<ThreadRow["kind"], { label: string; cls: string }> = {
  owner: { label: "Chủ salon", cls: "bg-primary-100 text-primary-700" },
  staff: { label: "Nhân viên", cls: "bg-berry-50 text-berry-600" },
  customer: { label: "Khách hàng", cls: "bg-teal-50 text-teal-600" },
  guest: { label: "Chưa có tài khoản", cls: "bg-peach-100 text-coral-600" },
};

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com";

/** Switch for the AI assistant plus the public chat link to share. */
function SupportSettingsCard() {
  const [ai, setAi] = useState<{ aiEnabled: boolean; aiConfigured: boolean } | null>(null);
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const link = `${SITE}/support`;

  useEffect(() => {
    fetch("/api/admin/support/settings")
      .then((r) => r.json())
      .then(setAi)
      .catch(() => setAi({ aiEnabled: false, aiConfigured: false }));
  }, []);

  async function toggle() {
    if (!ai) return;
    setSaving(true);
    const res = await fetch("/api/admin/support/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aiEnabled: !ai.aiEnabled }),
    });
    setSaving(false);
    if (res.ok) setAi({ ...ai, aiEnabled: !ai.aiEnabled });
  }

  async function copy() {
    await navigator.clipboard.writeText(link).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="grid min-w-0 grid-cols-1 gap-3 md:grid-cols-2">
      <div className="card min-w-0 space-y-3 p-4">
        <p className="text-sm font-semibold text-ink-900">Link khung chat hỗ trợ</p>
        <p className="text-xs text-ink-400">
          Gửi link này cho chủ salon hoặc khách hàng (Facebook, Zalo, email, YouTube…). Ai cũng chat được, kể cả chưa có tài khoản.
        </p>
        <div className="flex min-w-0 items-center gap-2">
          <code className="min-w-0 flex-1 truncate rounded-xl bg-mist-50 px-3 py-2 text-xs text-ink-700">{link}</code>
          <button type="button" onClick={copy} className="btn-outline shrink-0 !px-3 !py-2 text-xs" aria-label="Sao chép">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
          <a href="/support" target="_blank" className="btn-outline shrink-0 !px-3 !py-2 text-xs" aria-label="Mở">
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="card min-w-0 space-y-3 p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-900">
              <Sparkles className="h-4 w-4 text-primary-500" /> AI trả lời thay
            </p>
            <p className="mt-1 text-xs text-ink-400">
              Bật để trợ lý AI trả lời ngay mọi câu hỏi về cách dùng VaraaAi, kèm hướng dẫn từng bước và đường dẫn đến đúng chỗ.
              Khi bạn tự trả lời một cuộc trò chuyện, AI sẽ dừng trong cuộc đó.
            </p>
          </div>
          {ai ? (
            <button
              type="button"
              role="switch"
              aria-checked={ai.aiEnabled}
              onClick={toggle}
              disabled={saving}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${ai.aiEnabled ? "bg-primary-500" : "bg-ink-100"}`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow transition-all ${ai.aiEnabled ? "left-6" : "left-1"}`}
              />
            </button>
          ) : (
            <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
          )}
        </div>
        {ai && (
          <p className={`text-xs font-semibold ${ai.aiEnabled ? "text-teal-600" : "text-ink-400"}`}>
            {ai.aiEnabled ? "Đang bật — AI trả lời 24/7" : "Đang tắt — chỉ nhân viên trả lời"}
          </p>
        )}
        {ai && !ai.aiConfigured && (
          <p className="text-xs text-berry-500">Chưa cấu hình GEMINI_API_KEY trên máy chủ — AI sẽ không trả lời được.</p>
        )}
      </div>
    </div>
  );
}

/** The admin's side of support: the AI switch, the shareable chat link, and
 * every conversation (salon owners, customers, guests) with its chat. */
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

  async function setAiPaused(id: string, aiPaused: boolean) {
    setThreads((prev) => prev?.map((t) => (t.id === id ? { ...t, aiPaused } : t)) ?? prev);
    await fetch(`/api/admin/support/threads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ aiPaused }),
    });
  }

  const active = threads?.find((t) => t.id === activeId) ?? null;

  return (
    <div className="min-w-0 space-y-4">
      <SupportSettingsCard />

      {threads === null ? (
        <p className="flex items-center gap-2 text-sm text-ink-400">
          <Loader2 className="h-4 w-4 animate-spin" /> Đang tải...
        </p>
      ) : threads.length === 0 ? (
        <p className="text-sm text-ink-400">Chưa có ai nhắn tin hỗ trợ.</p>
      ) : (
        <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-[300px_minmax(0,1fr)]">
          <div className={`min-w-0 space-y-2 ${active ? "hidden md:block" : ""}`}>
            {threads.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveId(t.id)}
                className={`w-full min-w-0 rounded-2xl border p-3 text-left transition-colors ${
                  t.id === activeId ? "border-primary-500 bg-primary-50" : "border-ink-100 bg-white hover:border-ink-400"
                }`}
              >
                <div className="flex min-w-0 items-start justify-between gap-2">
                  <p className="min-w-0 truncate font-semibold text-ink-900">{t.name}</p>
                  {t.unread > 0 && (
                    <span className="shrink-0 rounded-full bg-berry-500 px-1.5 text-[10px] font-bold leading-4 text-white">
                      {t.unread}
                    </span>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-1">
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${KIND[t.kind].cls}`}>{KIND[t.kind].label}</span>
                  {t.aiPaused && <span className="rounded-full bg-mist-100 px-2 py-0.5 text-[10px] font-semibold text-ink-700">AI tạm dừng</span>}
                </div>
                <p className="mt-1 truncate text-xs text-ink-400">{t.businessNames.join(", ") || t.email}</p>
                <p className="mt-1 truncate text-sm text-ink-700">
                  {t.lastFromAi && <Sparkles className="mr-1 inline h-3 w-3 text-primary-500" />}
                  {t.lastMessage}
                </p>
              </button>
            ))}
          </div>

          <div className="min-w-0">
            {active ? (
              <div className="min-w-0 space-y-2">
                <button type="button" onClick={() => setActiveId(null)} className="flex items-center gap-1 text-sm font-medium text-primary-600 md:hidden">
                  <ArrowLeft className="h-4 w-4" /> Tất cả cuộc trò chuyện
                </button>
                <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                  <p className="min-w-0 break-words text-sm text-ink-700">
                    <span className="font-semibold text-ink-900">{active.name}</span> · {active.email}
                    {active.businessNames.length > 0 && ` · ${active.businessNames.join(", ")}`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAiPaused(active.id, !active.aiPaused)}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      active.aiPaused ? "bg-primary-100 text-primary-700" : "bg-mist-100 text-ink-700"
                    }`}
                  >
                    {active.aiPaused ? "Bật lại AI cho cuộc này" : "Tạm dừng AI cho cuộc này"}
                  </button>
                </div>
                <SupportChat
                  endpoint={`/api/admin/support/threads/${active.id}/messages`}
                  mine="ADMIN"
                  locale="vi-VN"
                  linkLocale="vi"
                  labels={{
                    placeholder: "Nhập câu trả lời...",
                    send: "Gửi",
                    empty: "Chưa có tin nhắn.",
                    error: "Không gửi được, vui lòng thử lại.",
                    otherName: active.name,
                    aiName: "Trợ lý AI",
                  }}
                />
              </div>
            ) : (
              <p className="hidden text-sm text-ink-400 md:block">Chọn một cuộc trò chuyện ở bên trái.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
