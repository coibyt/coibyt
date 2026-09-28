"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Loader2, Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

interface TrainingRow {
  id: string;
  title: string;
  description: string | null;
  url: string;
}

const emptyForm = { title: "", description: "", url: "" };

/** Admin CRUD for the training links every salon owner sees under Support → Training. */
export function AdminTrainingManager({ trainings }: { trainings: TrainingRow[] }) {
  const router = useRouter();
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(false);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(false);
    const res = await fetch(
      editingId ? `/api/admin/trainings/${editingId}` : "/api/admin/trainings",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      }
    );
    setSaving(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    router.refresh();
  }

  function startEdit(t: TrainingRow) {
    setEditingId(t.id);
    setForm({ title: t.title, description: t.description ?? "", url: t.url });
  }

  async function move(id: string, direction: "up" | "down") {
    await fetch(`/api/admin/trainings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ move: direction }),
    });
    router.refresh();
  }

  async function remove(t: TrainingRow) {
    if (!window.confirm(`Xóa bài đào tạo "${t.title}"?`)) return;
    await fetch(`/api/admin/trainings/${t.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-5">
      <form onSubmit={save} className="card space-y-3 p-5">
        <h3 className="font-semibold text-ink-900">
          {editingId ? "Sửa bài đào tạo" : "Thêm bài đào tạo"}
        </h3>
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
          <label className="label">Liên kết (YouTube hoặc trang hướng dẫn)</label>
          <input
            required
            type="url"
            className="input"
            placeholder="https://www.youtube.com/watch?v=..."
            value={form.url}
            onChange={(e) => setForm({ ...form, url: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Mô tả ngắn (không bắt buộc)</label>
          <textarea
            rows={2}
            className="input"
            value={form.description}
            maxLength={2000}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        {error && <p className="text-sm text-berry-500">Không lưu được — kiểm tra lại liên kết.</p>}
        <div className="flex gap-2">
          <button type="submit" disabled={saving} className="btn-primary !px-4 !py-2 text-sm">
            {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
            {editingId ? "Lưu" : "Thêm"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm(emptyForm);
              }}
              className="btn-ghost !px-4 !py-2 text-sm"
            >
              Hủy
            </button>
          )}
        </div>
      </form>

      {trainings.length === 0 ? (
        <p className="text-sm text-ink-400">Chưa có bài đào tạo nào.</p>
      ) : (
        <div className="space-y-2">
          {trainings.map((t, index) => (
            <div key={t.id} className="card flex items-center justify-between gap-3 p-4">
              <div className="min-w-0">
                <p className="font-semibold text-ink-900">{t.title}</p>
                <p className="truncate text-xs text-ink-400">{t.url}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <button
                  onClick={() => move(t.id, "up")}
                  disabled={index === 0}
                  className="btn-ghost !p-1.5 disabled:opacity-30"
                  aria-label="Lên"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => move(t.id, "down")}
                  disabled={index === trainings.length - 1}
                  className="btn-ghost !p-1.5 disabled:opacity-30"
                  aria-label="Xuống"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button onClick={() => startEdit(t)} className="btn-ghost !p-1.5" aria-label="Sửa">
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => remove(t)}
                  className="btn-ghost !p-1.5 text-berry-500"
                  aria-label="Xóa"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
