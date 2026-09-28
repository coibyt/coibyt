"use client";

import { useState } from "react";
import { Loader2, Send, Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

interface AnnouncementRow {
  id: string;
  title: string;
  body: string;
  createdAt: string;
}

/** Admin composer + history for announcements shown to every salon owner. */
export function AdminAnnouncementManager({ announcements }: { announcements: AnnouncementRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", body: "" });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    if (!window.confirm("Gửi thông báo này tới TẤT CẢ chủ salon?")) return;
    setSending(true);
    setError(false);
    const res = await fetch("/api/admin/announcements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSending(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    setForm({ title: "", body: "" });
    router.refresh();
  }

  async function remove(a: AnnouncementRow) {
    if (!window.confirm(`Xóa thông báo "${a.title}"?`)) return;
    await fetch(`/api/admin/announcements/${a.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={send} className="card space-y-3 p-5">
        <h3 className="font-semibold text-ink-900">Gửi thông báo mới</h3>
        <p className="text-xs text-ink-400">
          Thông báo hiện trong mục Hỗ trợ → Thông báo của mọi chủ salon, kèm số chưa đọc ở menu.
        </p>
        <div>
          <label className="label">Tiêu đề</label>
          <input
            required
            className="input"
            value={form.title}
            maxLength={150}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Nội dung</label>
          <textarea
            required
            rows={4}
            className="input"
            value={form.body}
            maxLength={5000}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </div>
        {error && <p className="text-sm text-berry-500">Không gửi được, vui lòng thử lại.</p>}
        <button type="submit" disabled={sending} className="btn-primary !px-4 !py-2 text-sm">
          {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          Gửi thông báo
        </button>
      </form>

      {announcements.length === 0 ? (
        <p className="text-sm text-ink-400">Chưa gửi thông báo nào.</p>
      ) : (
        <div className="space-y-2">
          {announcements.map((a) => (
            <div key={a.id} className="card flex items-start justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-semibold text-ink-900">{a.title}</p>
                <p className="text-xs text-ink-400">
                  {new Date(a.createdAt).toLocaleString("vi-VN", {
                    dateStyle: "short",
                    timeStyle: "short",
                  })}
                </p>
                <p className="mt-1 line-clamp-3 whitespace-pre-line text-sm text-ink-700">{a.body}</p>
              </div>
              <button
                onClick={() => remove(a)}
                className="btn-ghost !p-1.5 text-berry-500"
                aria-label="Xóa"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
