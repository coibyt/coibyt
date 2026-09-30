"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { ChevronLeft, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { formatMoney, toSmallestUnit, fromSmallestUnit } from "@/lib/money";

interface AddOnRow {
  id: string;
  name: string;
  priceCents: number;
  durationMin: number;
}

const emptyForm = { name: "", priceAmount: "", durationMin: "0" };

export function AddOnsManager({
  initialAddOns,
  locale,
  defaultCurrency,
}: {
  initialAddOns: AddOnRow[];
  locale: string;
  defaultCurrency: string;
}) {
  const tDash = useTranslations("dashboard");
  const tCommon = useTranslations("common");
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function startEdit(a: AddOnRow) {
    setEditingId(a.id);
    setForm({
      name: a.name,
      priceAmount: String(fromSmallestUnit(a.priceCents, defaultCurrency)),
      durationMin: String(a.durationMin),
    });
    setShowForm(true);
  }

  function cancelForm() {
    setShowForm(false);
    setEditingId(null);
    setForm(emptyForm);
  }

  async function save() {
    if (!form.name.trim()) return;
    setSaving(true);
    const body = JSON.stringify({
      name: form.name.trim(),
      priceCents: toSmallestUnit(Number(form.priceAmount) || 0, defaultCurrency),
      durationMin: Number(form.durationMin) || 0,
    });
    await fetch(editingId ? `/api/business/addons/${editingId}` : "/api/business/addons", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    setSaving(false);
    cancelForm();
    router.refresh();
  }

  async function removeAddOn(id: string, name: string) {
    if (!window.confirm(tDash("addOnsPage.deleteConfirm", { name }))) return;
    await fetch(`/api/business/addons/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <Link
        href="/business/dashboard/services"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-ink-900"
      >
        <ChevronLeft className="h-4 w-4" /> {tDash("addOnsPage.backToServices")}
      </Link>

      <p className="text-sm text-ink-400">{tDash("addOnsPage.hint")}</p>

      {initialAddOns.length === 0 && !showForm && (
        <p className="text-sm text-ink-400">{tDash("addOnsModal.noAddOnsYet")}</p>
      )}

      <div className="space-y-2">
        {initialAddOns.map((a) => (
          <div key={a.id} className="space-y-3">
            <div className="card flex items-center justify-between gap-4 p-4">
              <div>
                <p className="font-semibold text-ink-900">{a.name}</p>
                <p className="text-xs text-ink-400">
                  {formatMoney(a.priceCents, defaultCurrency, locale)}
                  {a.durationMin > 0 && ` · +${a.durationMin} ${tCommon("min")}`}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => startEdit(a)}
                  className="btn-ghost !p-2 text-ink-700"
                  aria-label={tCommon("edit")}
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={() => removeAddOn(a.id, a.name)}
                  className="btn-ghost !p-2 text-berry-500"
                  aria-label={tCommon("delete")}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            {showForm && editingId === a.id && renderForm()}
          </div>
        ))}
      </div>

      {showForm && editingId === null && renderForm()}

      {!showForm && (
        <button onClick={startCreate} className="btn-outline !px-3 !py-2 text-xs">
          <Plus className="h-3.5 w-3.5" /> {tDash("addOnsModal.createNewAddOn")}
        </button>
      )}
    </div>
  );

  function renderForm() {
    return (
      <div className="card space-y-3 p-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-ink-900">
            {editingId ? tCommon("edit") : tDash("addOnsModal.createNewAddOn")}
          </p>
          <button onClick={cancelForm} className="text-ink-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>
          <label className="label">{tDash("addOnsModal.addOnName")}</label>
          <input
            className="input"
            value={form.name}
            maxLength={120}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="label">
              {tDash("addOnsModal.price")} ({defaultCurrency})
            </label>
            <input
              type="number"
              min={0}
              className="input"
              value={form.priceAmount}
              onChange={(e) => setForm({ ...form, priceAmount: e.target.value })}
            />
          </div>
          <div>
            <label className="label">{tDash("addOnsModal.extraMinutes")}</label>
            <input
              type="number"
              min={0}
              className="input"
              value={form.durationMin}
              onChange={(e) => setForm({ ...form, durationMin: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={save}
            disabled={saving || !form.name.trim()}
            className="btn-primary !px-3 !py-1.5 text-xs"
          >
            {saving && <Loader2 className="h-3 w-3 animate-spin" />}
            {tCommon("save")}
          </button>
          <button onClick={cancelForm} className="btn-ghost !px-3 !py-1.5 text-xs">
            {tCommon("cancel")}
          </button>
        </div>
      </div>
    );
  }
}
