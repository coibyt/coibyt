"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Plus, X } from "lucide-react";
import { formatMoney } from "@/lib/money";

interface AddOn {
  id: string;
  name: string;
  priceCents: number;
  durationMin: number;
}

export function ServiceAddOnsModal({
  serviceId,
  serviceName,
  locale,
  onClose,
}: {
  serviceId: string;
  serviceName: string;
  locale: string;
  onClose: () => void;
}) {
  const tCommon = useTranslations("common");
  const tDash = useTranslations("dashboard");
  const [loading, setLoading] = useState(true);
  const [catalog, setCatalog] = useState<AddOn[]>([]);
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [newAddOn, setNewAddOn] = useState({ name: "", priceCents: 0, durationMin: 0 });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    Promise.all([
      fetch("/api/business/addons").then((r) => r.json()),
      fetch(`/api/business/services/${serviceId}/addons`).then((r) => r.json()),
    ])
      .then(([addOnsData, linksData]) => {
        setCatalog(addOnsData.addOns ?? []);
        setChecked(new Set(linksData.addOnIds ?? []));
      })
      .finally(() => setLoading(false));
  }, [serviceId]);

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function createAddOn() {
    if (!newAddOn.name.trim()) return;
    setCreating(true);
    const res = await fetch("/api/business/addons", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAddOn),
    });
    const data = await res.json();
    setCreating(false);
    if (res.ok) {
      setCatalog((prev) => [data.addOn, ...prev]);
      setChecked((prev) => new Set(prev).add(data.addOn.id));
      setNewAddOn({ name: "", priceCents: 0, durationMin: 0 });
      setShowCreate(false);
    }
  }

  async function save() {
    setSaving(true);
    await fetch(`/api/business/services/${serviceId}/addons`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Array.from(checked)),
    });
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink-900/40 p-4">
      <div className="card w-full max-w-lg animate-slide-up p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="font-bold text-ink-900">
            {`${tDash("addOnsModal.title")} — ${serviceName}`}
          </h3>
          <button onClick={onClose} className="text-ink-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
          </div>
        ) : (
          <>
            <p className="mb-3 text-sm text-ink-400">
              {tDash("addOnsModal.chooseHint")}
            </p>

            <div className="max-h-[40vh] space-y-2 overflow-y-auto pr-1">
              {catalog.length === 0 && !showCreate && (
                <p className="text-sm text-ink-400">
                  {tDash("addOnsModal.noAddOnsYet")}
                </p>
              )}
              {catalog.map((a) => (
                <label
                  key={a.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-ink-100 px-3 py-2 text-sm"
                >
                  <span className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={checked.has(a.id)}
                      onChange={() => toggle(a.id)}
                    />
                    {a.name}
                    {a.durationMin > 0 && (
                      <span className="text-xs text-ink-400">+{a.durationMin} min</span>
                    )}
                  </span>
                  <span className="font-medium text-ink-900">
                    {formatMoney(a.priceCents, "VND", locale)}
                  </span>
                </label>
              ))}
            </div>

            {showCreate ? (
              <div className="mt-4 space-y-2 rounded-xl border border-ink-100 p-3">
                <input
                  placeholder={tDash("addOnsModal.addOnName")}
                  className="input"
                  value={newAddOn.name}
                  onChange={(e) => setNewAddOn({ ...newAddOn, name: e.target.value })}
                />
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="label">{tDash("addOnsModal.price")} (VND)</label>
                    <input
                      type="number"
                      min={0}
                      className="input"
                      value={newAddOn.priceCents}
                      onChange={(e) =>
                        setNewAddOn({ ...newAddOn, priceCents: Number(e.target.value) })
                      }
                    />
                  </div>
                  <div>
                    <label className="label">
                      {tDash("addOnsModal.extraMinutes")}
                    </label>
                    <input
                      type="number"
                      min={0}
                      className="input"
                      value={newAddOn.durationMin}
                      onChange={(e) =>
                        setNewAddOn({ ...newAddOn, durationMin: Number(e.target.value) })
                      }
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={createAddOn}
                    disabled={creating}
                    className="btn-primary !px-3 !py-1.5 text-xs"
                  >
                    {creating && <Loader2 className="h-3 w-3 animate-spin" />}
                    {tCommon("save")}
                  </button>
                  <button
                    onClick={() => setShowCreate(false)}
                    className="btn-ghost !px-3 !py-1.5 text-xs"
                  >
                    {tCommon("cancel")}
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowCreate(true)}
                className="btn-outline mt-3 !px-3 !py-1.5 text-xs"
              >
                <Plus className="h-3.5 w-3.5" />
                {tDash("addOnsModal.createNewAddOn")}
              </button>
            )}

            <div className="mt-5 flex gap-2">
              <button onClick={save} disabled={saving} className="btn-primary">
                {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                {tCommon("save")}
              </button>
              <button onClick={onClose} className="btn-ghost">
                {tCommon("cancel")}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
