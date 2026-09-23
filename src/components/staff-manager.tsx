"use client";

import { useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Plus, Trash2, Loader2, Clock } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { StaffHoursModal } from "@/components/staff-hours-modal";

interface StaffRow {
  id: string;
  name: string;
  title: string | null;
  active: boolean;
  serviceIds: string[];
}

const emptyForm = { name: "", title: "", bio: "", serviceIds: [] as string[] };

export function StaffManager({
  initialStaff,
  serviceOptions,
}: {
  initialStaff: StaffRow[];
  serviceOptions: { id: string; name: string }[];
}) {
  const t = useTranslations("business");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [hoursFor, setHoursFor] = useState<StaffRow | null>(null);

  async function createStaff(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await fetch("/api/business/staff", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setForm(emptyForm);
    setShowForm(false);
    router.refresh();
  }

  async function removeStaff(id: string) {
    await fetch(`/api/business/staff/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function toggleService(id: string) {
    setForm((f) => ({
      ...f,
      serviceIds: f.serviceIds.includes(id)
        ? f.serviceIds.filter((x) => x !== id)
        : [...f.serviceIds, id],
    }));
  }

  return (
    <div className="space-y-4">
      {initialStaff
        .filter((s) => s.active)
        .map((s) => (
          <div key={s.id} className="card flex items-center justify-between gap-4 p-4">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-500">
                {s.name.charAt(0)}
              </span>
              <div>
                <p className="font-semibold text-ink-900">{s.name}</p>
                {s.title && <p className="text-xs text-ink-400">{s.title}</p>}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setHoursFor(s)}
                className="btn-ghost !p-2 text-ink-700"
                title={locale === "vi" ? "Giờ làm việc" : "Working hours"}
              >
                <Clock className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeStaff(s.id)}
                className="btn-ghost !p-2 text-berry-500"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {hoursFor && (
          <StaffHoursModal
            staffId={hoursFor.id}
            staffName={hoursFor.name}
            locale={locale}
            onClose={() => setHoursFor(null)}
          />
        )}

      {!showForm ? (
        <button onClick={() => setShowForm(true)} className="btn-outline">
          <Plus className="h-4 w-4" /> {t("addStaff")}
        </button>
      ) : (
        <form onSubmit={createStaff} className="card space-y-4 p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Tên nhân viên</label>
              <input
                required
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Chức danh</label>
              <input
                className="input"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">Giới thiệu</label>
            <textarea
              rows={2}
              className="input"
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
          {serviceOptions.length > 0 && (
            <div>
              <label className="label">Dịch vụ có thể thực hiện</label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleService(s.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      form.serviceIds.includes(s.id)
                        ? "border-ink-900 bg-ink-900 text-white"
                        : "border-ink-100 text-ink-700"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="btn-primary">
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              {tCommon("save")}
            </button>
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">
              {tCommon("cancel")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
