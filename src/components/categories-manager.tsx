"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

interface Category {
  id: string;
  nameVi: string;
  nameEn: string;
  icon: string | null;
}

export function CategoriesManager({
  initialCategories,
}: {
  initialCategories: Category[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({ nameVi: "", nameEn: "", icon: "" });
  const [saving, setSaving] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/admin/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setForm({ nameVi: "", nameEn: "", icon: "" });
    router.refresh();
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {initialCategories.map((c) => (
          <div key={c.id} className="card p-3 text-center">
            <p className="text-sm font-medium text-ink-900">{c.nameVi}</p>
            <p className="text-xs text-ink-400">{c.nameEn}</p>
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="card flex flex-wrap items-end gap-3 p-4">
        <div>
          <label className="label">Tên (VI)</label>
          <input
            required
            className="input"
            value={form.nameVi}
            onChange={(e) => setForm({ ...form, nameVi: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Name (EN)</label>
          <input
            required
            className="input"
            value={form.nameEn}
            onChange={(e) => setForm({ ...form, nameEn: e.target.value })}
          />
        </div>
        <div>
          <label className="label">Icon (lucide, vd: Scissors)</label>
          <input
            className="input"
            value={form.icon}
            onChange={(e) => setForm({ ...form, icon: e.target.value })}
          />
        </div>
        <button type="submit" disabled={saving} className="btn-primary">
          {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Thêm
        </button>
      </form>
    </div>
  );
}
