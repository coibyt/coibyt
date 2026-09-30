"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Check, Copy, Loader2, Pencil, Plus, Trash2, X } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { useRouter } from "@/i18n/navigation";

interface PlatformAffiliateRow {
  id: string;
  name: string;
  code: string;
  commissionPercent: number;
  referredBusinessCount: number;
  commissions: { currency: string; commissionCents: number }[];
}

const emptyForm = { name: "", commissionPercent: "10" };

export function PlatformAffiliatesManager({
  initialAffiliates,
  locale,
  linkBase,
}: {
  initialAffiliates: PlatformAffiliateRow[];
  locale: string;
  linkBase: string;
}) {
  const t = useTranslations("admin");
  const tCommon = useTranslations("common");
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  function startEdit(a: PlatformAffiliateRow) {
    setEditingId(a.id);
    setForm({ name: a.name, commissionPercent: String(a.commissionPercent) });
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
      commissionPercent: Number(form.commissionPercent) || 0,
    });
    await fetch(
      editingId ? `/api/admin/platform-affiliates/${editingId}` : "/api/admin/platform-affiliates",
      {
        method: editingId ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body,
      }
    );
    setSaving(false);
    cancelForm();
    router.refresh();
  }

  async function removeAffiliate(id: string, name: string) {
    if (!window.confirm(t("platformAffiliatesPage.deleteConfirm", { name }))) return;
    await fetch(`/api/admin/platform-affiliates/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function copyLink(a: PlatformAffiliateRow) {
    navigator.clipboard.writeText(`${linkBase}?aff=${a.code}`);
    setCopiedId(a.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="space-y-4">
      {initialAffiliates.length === 0 && !showForm && (
        <p className="text-sm text-ink-400">{t("platformAffiliatesPage.empty")}</p>
      )}

      <div className="space-y-2">
        {initialAffiliates.map((a) => (
          <div key={a.id} className="space-y-3">
            <div className="card space-y-2 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-ink-900">{a.name}</p>
                  <p className="text-xs text-ink-400">
                    {t("platformAffiliatesPage.commissionLabel", { percent: a.commissionPercent })}
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
                    onClick={() => removeAffiliate(a.id, a.name)}
                    className="btn-ghost !p-2 text-berry-500"
                    aria-label={tCommon("delete")}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 rounded-xl bg-mist-50 px-3 py-2">
                <code className="flex-1 truncate text-xs text-ink-700">{`${linkBase}?aff=${a.code}`}</code>
                <button
                  onClick={() => copyLink(a)}
                  className="btn-ghost !p-1.5 text-ink-700"
                  aria-label={tCommon("copy")}
                >
                  {copiedId === a.id ? (
                    <Check className="h-4 w-4 text-sage-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>

              <p className="text-xs text-ink-400">
                {t("platformAffiliatesPage.referredCount", { count: a.referredBusinessCount })}
              </p>
              {a.commissions.length > 0 && (
                <p className="text-xs text-ink-400">
                  {t("platformAffiliatesPage.commissionOwed")}{" "}
                  {a.commissions
                    .map((c) => formatMoney(c.commissionCents, c.currency, locale))
                    .join(" + ")}
                </p>
              )}
            </div>
            {showForm && editingId === a.id && renderForm()}
          </div>
        ))}
      </div>

      {showForm && editingId === null && renderForm()}

      {!showForm && (
        <button onClick={startCreate} className="btn-outline !px-3 !py-2 text-xs">
          <Plus className="h-3.5 w-3.5" /> {t("platformAffiliatesPage.createNew")}
        </button>
      )}
    </div>
  );

  function renderForm() {
    return (
      <div className="card space-y-3 p-4">
        <div className="flex items-center justify-between">
          <p className="font-semibold text-ink-900">
            {editingId ? tCommon("edit") : t("platformAffiliatesPage.createNew")}
          </p>
          <button onClick={cancelForm} className="text-ink-400">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div>
          <label className="label">{t("platformAffiliatesPage.name")}</label>
          <input
            className="input"
            value={form.name}
            maxLength={120}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div>
          <label className="label">{t("platformAffiliatesPage.commissionPercent")}</label>
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            className="input"
            value={form.commissionPercent}
            onChange={(e) => setForm({ ...form, commissionPercent: e.target.value })}
          />
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
