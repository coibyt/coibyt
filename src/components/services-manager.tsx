"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { formatMoney, toSmallestUnit, fromSmallestUnit } from "@/lib/money";
import { Plus, Trash2, Loader2, Sparkles, Pencil } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { ServiceAddOnsModal } from "@/components/service-addons-modal";

interface ServiceRow {
  id: string;
  name: string;
  description: string | null;
  durationMin: number;
  bufferMin: number;
  priceCents: number;
  depositCents: number | null;
  currency: string;
  active: boolean;
  categoryId: string | null;
  videoUrl: string | null;
  staffIds: string[];
}

// Numeric fields are kept as plain strings while editing — binding them to
// `number` state (e.g. defaulting to 0) is what caused the old "can't clear
// the leading zero, new digits land after it" bug on mobile. Converting
// only happens at the form/API boundary (see saveService and startEdit).
const emptyForm = {
  name: "",
  description: "",
  categoryId: "",
  durationMin: "60",
  bufferMin: "0",
  // Whole-currency-unit amounts (e.g. "180" meaning 180 EUR), not cents —
  // converted with toSmallestUnit() right before sending to the API.
  priceAmount: "",
  depositAmount: "",
  videoUrl: "",
  staffIds: [] as string[],
};

export function ServicesManager({
  initialServices,
  staffOptions,
  categories,
  locale,
  defaultCurrency,
}: {
  initialServices: ServiceRow[];
  staffOptions: { id: string; name: string }[];
  categories: { id: string; name: string }[];
  locale: string;
  defaultCurrency: string;
}) {
  const t = useTranslations("business");
  const tCommon = useTranslations("common");
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addOnsFor, setAddOnsFor] = useState<ServiceRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  function startEdit(s: ServiceRow) {
    setEditingId(s.id);
    setForm({
      name: s.name,
      description: s.description ?? "",
      categoryId: s.categoryId ?? "",
      durationMin: String(s.durationMin),
      bufferMin: String(s.bufferMin),
      priceAmount: String(fromSmallestUnit(s.priceCents, s.currency)),
      depositAmount:
        s.depositCents !== null ? String(fromSmallestUnit(s.depositCents, s.currency)) : "",
      videoUrl: s.videoUrl ?? "",
      staffIds: s.staffIds,
    });
    setShowForm(true);
  }

  function startCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setShowForm(true);
  }

  async function saveService(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const body = {
      name: form.name,
      description: form.description,
      categoryId: form.categoryId || undefined,
      durationMin: Number(form.durationMin) || 0,
      bufferMin: Number(form.bufferMin) || 0,
      priceCents: toSmallestUnit(Number(form.priceAmount) || 0, defaultCurrency),
      depositCents:
        form.depositAmount.trim() === ""
          ? undefined
          : toSmallestUnit(Number(form.depositAmount), defaultCurrency),
      videoUrl: form.videoUrl.trim() || undefined,
      staffIds: form.staffIds,
      currency: defaultCurrency,
    };
    if (editingId) {
      await fetch(`/api/business/services/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("/api/business/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }
    setSaving(false);
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    router.refresh();
  }

  async function removeService(id: string) {
    await fetch(`/api/business/services/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function toggleStaff(id: string) {
    setForm((f) => ({
      ...f,
      staffIds: f.staffIds.includes(id)
        ? f.staffIds.filter((x) => x !== id)
        : [...f.staffIds, id],
    }));
  }

  return (
    <div className="space-y-4">
      {initialServices
        .filter((s) => s.active)
        .map((s) => (
          <div key={s.id} className="card flex items-center justify-between gap-4 p-4">
            <div>
              <p className="font-semibold text-ink-900">{s.name}</p>
              <p className="text-xs text-ink-400">
                {s.durationMin} {tCommon("min")} ·{" "}
                {formatMoney(s.priceCents, s.currency, locale)}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => startEdit(s)}
                className="btn-ghost !p-2 text-ink-700"
                aria-label={tCommon("edit")}
              >
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => setAddOnsFor(s)}
                className="btn-ghost !p-2 text-ink-700"
                title={locale === "vi" ? "Dịch vụ phụ" : "Add-ons"}
              >
                <Sparkles className="h-4 w-4" />
              </button>
              <button
                onClick={() => removeService(s.id)}
                className="btn-ghost !p-2 text-berry-500"
                aria-label={tCommon("delete")}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {addOnsFor && (
          <ServiceAddOnsModal
            serviceId={addOnsFor.id}
            serviceName={addOnsFor.name}
            locale={locale}
            onClose={() => setAddOnsFor(null)}
          />
        )}

      {!showForm ? (
        <button onClick={startCreate} className="btn-outline">
          <Plus className="h-4 w-4" /> {t("addService")}
        </button>
      ) : (
        <form onSubmit={saveService} className="card space-y-4 p-5">
          <h3 className="font-semibold text-ink-900">
            {editingId
              ? locale === "vi"
                ? "Sửa dịch vụ"
                : "Edit service"
              : locale === "vi"
                ? "Dịch vụ mới"
                : "New service"}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">Tên dịch vụ</label>
              <input
                required
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Danh mục</label>
              <select
                className="input"
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              >
                <option value="">—</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Thời lượng (phút)</label>
              <input
                required
                type="number"
                min={5}
                className="input"
                value={form.durationMin}
                onChange={(e) => setForm({ ...form, durationMin: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Thời gian dọn dẹp sau (phút)</label>
              <input
                type="number"
                min={0}
                className="input"
                value={form.bufferMin}
                onChange={(e) => setForm({ ...form, bufferMin: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Giá ({defaultCurrency})</label>
              <input
                required
                type="number"
                min={0}
                step="0.01"
                placeholder="0"
                className="input"
                value={form.priceAmount}
                onChange={(e) => setForm({ ...form, priceAmount: e.target.value })}
              />
            </div>
            <div>
              <label className="label">Tiền cọc ({defaultCurrency}, không bắt buộc)</label>
              <input
                type="number"
                min={0}
                step="0.01"
                placeholder="0"
                className="input"
                value={form.depositAmount}
                onChange={(e) => setForm({ ...form, depositAmount: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="label">Mô tả</label>
            <p className="mb-1 text-xs text-ink-400">
              {locale === "vi"
                ? "Hiển thị bên dưới tên dịch vụ khi khách chọn dịch vụ này."
                : "Shown under the service name when a customer picks it."}
            </p>
            <textarea
              rows={2}
              className="input"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <label className="label">
              {locale === "vi" ? "Link video YouTube" : "YouTube video link"} (
              {locale === "vi" ? "không bắt buộc" : "optional"})
            </label>
            <p className="mb-1 text-xs text-ink-400">
              {locale === "vi"
                ? "Khách có thể nhấp xem trước video dịch vụ này khi đặt lịch."
                : "Customers can click to preview this service before booking."}
            </p>
            <input
              type="url"
              placeholder="https://www.youtube.com/watch?v=..."
              className="input"
              value={form.videoUrl}
              onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            />
          </div>
          {staffOptions.length > 0 && (
            <div>
              <label className="label">Nhân viên thực hiện</label>
              <div className="flex flex-wrap gap-2">
                {staffOptions.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => toggleStaff(s.id)}
                    className={`rounded-full border px-3 py-1.5 text-xs ${
                      form.staffIds.includes(s.id)
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
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingId(null);
              }}
              className="btn-ghost"
            >
              {tCommon("cancel")}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
