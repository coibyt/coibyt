"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { formatMoney, toSmallestUnit, fromSmallestUnit } from "@/lib/money";
import { Plus, Trash2, Loader2, Sparkles, Pencil, ChevronUp, ChevronDown } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import { ServiceAddOnsModal } from "@/components/service-addons-modal";

interface StaffAssignment {
  staffId: string;
  priceCentsOverride: number | null;
  durationMinOverride: number | null;
}

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
  groupId: string | null;
  videoUrl: string | null;
  staffAssignments: StaffAssignment[];
}

// Keyed by staffId; blank strings mean "use the service's own price/duration".
type StaffOverrideForm = Record<string, { priceAmount: string; durationMin: string }>;

// Numeric fields are kept as plain strings while editing — binding them to
// `number` state (e.g. defaulting to 0) is what caused the old "can't clear
// the leading zero, new digits land after it" bug on mobile. Converting
// only happens at the form/API boundary (see saveService and startEdit).
const emptyForm = {
  name: "",
  description: "",
  groupId: "",
  durationMin: "60",
  bufferMin: "0",
  // Whole-currency-unit amounts (e.g. "180" meaning 180 EUR), not cents —
  // converted with toSmallestUnit() right before sending to the API.
  priceAmount: "",
  depositAmount: "",
  videoUrl: "",
  staffIds: [] as string[],
  staffOverrides: {} as StaffOverrideForm,
};

export function ServicesManager({
  initialServices,
  staffOptions,
  groups,
  locale,
  defaultCurrency,
}: {
  initialServices: ServiceRow[];
  staffOptions: { id: string; name: string }[];
  groups: { id: string; name: string }[];
  locale: string;
  defaultCurrency: string;
}) {
  const t = useTranslations("business");
  const tCommon = useTranslations("common");
  const tDash = useTranslations("dashboard");
  const router = useRouter();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [addOnsFor, setAddOnsFor] = useState<ServiceRow | null>(null);
  const [form, setForm] = useState(emptyForm);
  // A service keeps whatever currency it was created with — changing the
  // business's default only applies to new services (see the settings page
  // copy). Editing an existing service must reuse ITS OWN currency for
  // interpreting/saving the price fields, never the current default: the
  // price amounts shown in the form (from fromSmallestUnit below) are
  // denominated in the service's own currency, so re-submitting them under a
  // different currency — e.g. re-saving an old 200,000 VND service after the
  // business switched its default to EUR — would silently turn "200000" into
  // 200,000.00 EUR instead of leaving the price alone.
  const [formCurrency, setFormCurrency] = useState(defaultCurrency);
  const [saving, setSaving] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [groupBusy, setGroupBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  // Bring the form into view whenever it opens — right below the edited row,
  // or at the bottom for a new service.
  useEffect(() => {
    if (showForm) formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [showForm, editingId]);

  function startEdit(s: ServiceRow) {
    setEditingId(s.id);
    setFormCurrency(s.currency);
    setForm({
      name: s.name,
      description: s.description ?? "",
      groupId: s.groupId ?? "",
      durationMin: String(s.durationMin),
      bufferMin: String(s.bufferMin),
      priceAmount: String(fromSmallestUnit(s.priceCents, s.currency)),
      depositAmount:
        s.depositCents !== null ? String(fromSmallestUnit(s.depositCents, s.currency)) : "",
      videoUrl: s.videoUrl ?? "",
      staffIds: s.staffAssignments.map((a) => a.staffId),
      staffOverrides: Object.fromEntries(
        s.staffAssignments.map((a) => [
          a.staffId,
          {
            priceAmount:
              a.priceCentsOverride !== null
                ? String(fromSmallestUnit(a.priceCentsOverride, s.currency))
                : "",
            durationMin: a.durationMinOverride !== null ? String(a.durationMinOverride) : "",
          },
        ])
      ),
    });
    setShowForm(true);
  }

  function startCreate() {
    setEditingId(null);
    setFormCurrency(defaultCurrency);
    setForm(emptyForm);
    setShowForm(true);
  }

  async function saveService(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const body = {
      name: form.name,
      description: form.description,
      groupId: form.groupId || null,
      durationMin: Number(form.durationMin) || 0,
      bufferMin: Number(form.bufferMin) || 0,
      priceCents: toSmallestUnit(Number(form.priceAmount) || 0, formCurrency),
      depositCents:
        form.depositAmount.trim() === ""
          ? undefined
          : toSmallestUnit(Number(form.depositAmount), formCurrency),
      videoUrl: form.videoUrl.trim() || undefined,
      staffAssignments: form.staffIds.map((staffId) => {
        const override = form.staffOverrides[staffId];
        return {
          staffId,
          priceCentsOverride:
            override?.priceAmount.trim()
              ? toSmallestUnit(Number(override.priceAmount), formCurrency)
              : undefined,
          durationMinOverride: override?.durationMin.trim()
            ? Number(override.durationMin)
            : undefined,
        };
      }),
      currency: formCurrency,
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
      staffOverrides: f.staffOverrides[id]
        ? f.staffOverrides
        : { ...f.staffOverrides, [id]: { priceAmount: "", durationMin: "" } },
    }));
  }

  function setStaffOverride(id: string, field: "priceAmount" | "durationMin", value: string) {
    setForm((f) => ({
      ...f,
      staffOverrides: {
        ...f.staffOverrides,
        [id]: { ...f.staffOverrides[id], [field]: value },
      },
    }));
  }

  async function addGroup(e: React.FormEvent) {
    e.preventDefault();
    const name = newGroupName.trim();
    if (!name) return;
    setGroupBusy(true);
    await fetch("/api/business/service-groups", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setGroupBusy(false);
    setNewGroupName("");
    router.refresh();
  }

  async function renameGroup(id: string, current: string) {
    const name = window.prompt(tDash("servicesForm.renameGroup"), current)?.trim();
    if (!name || name === current) return;
    await fetch(`/api/business/service-groups/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    router.refresh();
  }

  async function moveGroup(id: string, move: "up" | "down") {
    await fetch(`/api/business/service-groups/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ move }),
    });
    router.refresh();
  }

  async function removeGroup(id: string, name: string) {
    if (!window.confirm(tDash("servicesForm.deleteGroupConfirm", { name }))) return;
    await fetch(`/api/business/service-groups/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function renderServiceRow(s: ServiceRow) {
    return (
      <div key={s.id} className="space-y-3">
      <div className="card flex items-center justify-between gap-4 p-4">
        <div>
          <p className="font-semibold text-ink-900">{s.name}</p>
          <p className="text-xs text-ink-400">
            {s.durationMin} {tCommon("min")} · {formatMoney(s.priceCents, s.currency, locale)}
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
            title={tDash("servicesForm.addOns")}
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
      {showForm && editingId === s.id && renderForm()}
      </div>
    );
  }

  const activeServices = initialServices.filter((s) => s.active);
  const groupIdSet = new Set(groups.map((g) => g.id));
  const ungroupedServices = activeServices.filter((s) => !s.groupId || !groupIdSet.has(s.groupId));

  return (
    <div className="space-y-4">
      <form onSubmit={addGroup} className="flex flex-wrap items-center gap-2">
        <input
          className="input !w-64"
          value={newGroupName}
          maxLength={100}
          onChange={(e) => setNewGroupName(e.target.value)}
          placeholder={tDash("servicesForm.newGroupPlaceholder")}
        />
        <button
          type="submit"
          disabled={groupBusy || !newGroupName.trim()}
          className="btn-outline !px-3 !py-2 text-xs"
        >
          <Plus className="h-3.5 w-3.5" /> {tDash("servicesForm.addGroup")}
        </button>
      </form>

      {groups.map((g, index) => {
        const items = activeServices.filter((s) => s.groupId === g.id);
        return (
          <section key={g.id} className="space-y-2">
            <div className="flex items-center justify-between gap-2 border-b border-ink-100 pb-1.5">
              <h2 className="font-bold text-ink-900">
                {g.name} <span className="text-xs font-normal text-ink-400">({items.length})</span>
              </h2>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => moveGroup(g.id, "up")}
                  disabled={index === 0}
                  className="btn-ghost !p-1.5 text-ink-700 disabled:opacity-30"
                  aria-label="Up"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  onClick={() => moveGroup(g.id, "down")}
                  disabled={index === groups.length - 1}
                  className="btn-ghost !p-1.5 text-ink-700 disabled:opacity-30"
                  aria-label="Down"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <button
                  onClick={() => renameGroup(g.id, g.name)}
                  className="btn-ghost !p-1.5 text-ink-700"
                  aria-label={tCommon("edit")}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => removeGroup(g.id, g.name)}
                  className="btn-ghost !p-1.5 text-berry-500"
                  aria-label={tCommon("delete")}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            {items.length === 0 ? (
              <p className="text-xs text-ink-400">{tDash("servicesForm.groupEmpty")}</p>
            ) : (
              items.map(renderServiceRow)
            )}
          </section>
        );
      })}

      {ungroupedServices.length > 0 && (
        <section className="space-y-2">
          {groups.length > 0 && (
            <h2 className="border-b border-ink-100 pb-1.5 font-bold text-ink-900">
              {tDash("servicesForm.ungrouped")}{" "}
              <span className="text-xs font-normal text-ink-400">({ungroupedServices.length})</span>
            </h2>
          )}
          {ungroupedServices.map(renderServiceRow)}
        </section>
      )}

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
      ) : !editingId ? (
        renderForm()
      ) : null}
    </div>
  );

  // Shared by "new service" (bottom of the page) and "edit service" (right
  // under the row being edited, so the owner never has to scroll down).
  function renderForm() {
    return (
        <form ref={formRef} onSubmit={saveService} className="card space-y-4 p-5">
          <h3 className="font-semibold text-ink-900">
            {editingId ? tDash("servicesForm.editService") : tDash("servicesForm.newService")}
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="label">{tDash("servicesForm.serviceName")}</label>
              <input
                required
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="label">{tDash("servicesForm.group")}</label>
              <select
                className="input"
                value={form.groupId}
                onChange={(e) => setForm({ ...form, groupId: e.target.value })}
              >
                <option value="">{tDash("servicesForm.groupNone")}</option>
                {groups.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">{tDash("servicesForm.durationMinutes")}</label>
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
              <label className="label">{tDash("servicesForm.bufferMinutes")}</label>
              <input
                type="number"
                min={0}
                className="input"
                value={form.bufferMin}
                onChange={(e) => setForm({ ...form, bufferMin: e.target.value })}
              />
            </div>
            <div>
              <label className="label">{tDash("servicesForm.currency")}</label>
              <select
                className="input"
                value={formCurrency}
                onChange={(e) => setFormCurrency(e.target.value)}
              >
                <option value="VND">VND</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
              {editingId && (
                <p className="mt-1 text-xs text-ink-400">{tDash("servicesForm.currencyHint")}</p>
              )}
            </div>
            <div>
              <label className="label">{tDash("servicesForm.price")} ({formCurrency})</label>
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
              <label className="label">{tDash("servicesForm.deposit")} ({formCurrency}, {tDash("servicesForm.optional")})</label>
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
            <label className="label">{tDash("servicesForm.description")}</label>
            <p className="mb-1 text-xs text-ink-400">
              {tDash("servicesForm.descriptionHint")}
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
              {tDash("servicesForm.videoLink")} ({tDash("servicesForm.optional")})
            </label>
            <p className="mb-1 text-xs text-ink-400">
              {tDash("servicesForm.videoLinkHint")}
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
              <label className="label">{tDash("servicesForm.staffCanDo")}</label>
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
              {form.staffIds.length > 0 && (
                <div className="mt-3 space-y-2">
                  <p className="text-xs text-ink-400">
                    {tDash("servicesForm.staffOverrideHint")}
                  </p>
                  {form.staffIds.map((id) => {
                    const staffName = staffOptions.find((s) => s.id === id)?.name ?? id;
                    const override = form.staffOverrides[id] ?? { priceAmount: "", durationMin: "" };
                    return (
                      <div key={id} className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
                        <span className="text-sm text-ink-900">{staffName}</span>
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          placeholder={tDash("servicesForm.ownPrice")}
                          className="input !w-28 text-xs"
                          value={override.priceAmount}
                          onChange={(e) => setStaffOverride(id, "priceAmount", e.target.value)}
                        />
                        <input
                          type="number"
                          min={5}
                          placeholder={tDash("servicesForm.ownMinutes")}
                          className="input !w-28 text-xs"
                          value={override.durationMin}
                          onChange={(e) => setStaffOverride(id, "durationMin", e.target.value)}
                        />
                      </div>
                    );
                  })}
                </div>
              )}
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
    );
  }
}
