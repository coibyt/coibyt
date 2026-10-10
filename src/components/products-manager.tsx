"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { formatMoney, toSmallestUnit, fromSmallestUnit } from "@/lib/money";
import { Plus, Trash2, Loader2, Pencil, ChevronUp, ChevronDown, Star, Eye, ImagePlus, X } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

interface ProductRow {
  id: string;
  name: string;
  description: string | null;
  priceCents: number;
  currency: string;
  videoUrl: string | null;
  groupId: string | null;
  viewCount: number;
  imageIds: string[];
  reviewCount: number;
}

// Numeric fields kept as plain strings while editing, same reasoning as
// ServicesManager — converted at the form/API boundary only.
const emptyForm = {
  name: "",
  description: "",
  groupId: "",
  priceAmount: "",
  videoUrl: "",
};

export function ProductsManager({
  initialProducts,
  groups,
  locale,
  defaultCurrency,
}: {
  initialProducts: ProductRow[];
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
  const [form, setForm] = useState(emptyForm);
  const [formCurrency, setFormCurrency] = useState(defaultCurrency);
  const [existingImageIds, setExistingImageIds] = useState<string[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [newGroupName, setNewGroupName] = useState("");
  const [groupBusy, setGroupBusy] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showForm) formRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [showForm, editingId]);

  function startEdit(p: ProductRow) {
    setEditingId(p.id);
    setFormCurrency(p.currency);
    setForm({
      name: p.name,
      description: p.description ?? "",
      groupId: p.groupId ?? "",
      priceAmount: String(fromSmallestUnit(p.priceCents, p.currency)),
      videoUrl: p.videoUrl ?? "",
    });
    setExistingImageIds(p.imageIds);
    setRemovedImageIds([]);
    setNewImages([]);
    setError(null);
    setShowForm(true);
  }

  function startCreate() {
    setEditingId(null);
    setFormCurrency(defaultCurrency);
    setForm(emptyForm);
    setExistingImageIds([]);
    setRemovedImageIds([]);
    setNewImages([]);
    setError(null);
    setShowForm(true);
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    setNewImages((prev) => [...prev, ...Array.from(files)]);
  }

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const body = new FormData();
    body.append("name", form.name);
    body.append("description", form.description);
    body.append("groupId", form.groupId);
    body.append("priceCents", String(toSmallestUnit(Number(form.priceAmount) || 0, formCurrency)));
    body.append("currency", formCurrency);
    body.append("videoUrl", form.videoUrl);
    newImages.forEach((f) => body.append("images", f));
    removedImageIds.forEach((id) => body.append("removeImageIds", id));

    const res = await fetch(
      editingId ? `/api/business/products/${editingId}` : "/api/business/products",
      { method: editingId ? "PATCH" : "POST", body }
    );
    setSaving(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error === "TOO_MANY_IMAGES" ? tDash("productsForm.tooManyImages") : tDash("productsForm.saveError"));
      return;
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    router.refresh();
  }

  async function removeProduct(id: string) {
    await fetch(`/api/business/products/${id}`, { method: "DELETE" });
    router.refresh();
  }

  async function addGroup(e: React.FormEvent) {
    e.preventDefault();
    const name = newGroupName.trim();
    if (!name) return;
    setGroupBusy(true);
    await fetch("/api/business/product-groups", {
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
    await fetch(`/api/business/product-groups/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    router.refresh();
  }

  async function moveGroup(id: string, move: "up" | "down") {
    await fetch(`/api/business/product-groups/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ move }),
    });
    router.refresh();
  }

  async function removeGroup(id: string, name: string) {
    if (!window.confirm(tDash("servicesForm.deleteGroupConfirm", { name }))) return;
    await fetch(`/api/business/product-groups/${id}`, { method: "DELETE" });
    router.refresh();
  }

  function renderProductRow(p: ProductRow) {
    return (
      <div key={p.id} className="space-y-3">
        <div className="card flex items-center justify-between gap-4 p-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-mist-100">
              {p.imageIds[0] && (
                <Image
                  src={`/api/product-image/${p.imageIds[0]}`}
                  alt=""
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="font-semibold text-ink-900">{p.name}</p>
              <p className="flex items-center gap-2 text-xs text-ink-400">
                <span>{formatMoney(p.priceCents, p.currency, locale)}</span>
                <span className="flex items-center gap-0.5">
                  <Eye className="h-3 w-3" /> {p.viewCount}
                </span>
                <span className="flex items-center gap-0.5">
                  <Star className="h-3 w-3" /> {p.reviewCount}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => startEdit(p)}
              className="btn-ghost !p-2 text-ink-700"
              aria-label={tCommon("edit")}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              onClick={() => removeProduct(p.id)}
              className="btn-ghost !p-2 text-berry-500"
              aria-label={tCommon("delete")}
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        {showForm && editingId === p.id && renderForm()}
      </div>
    );
  }

  const groupIdSet = new Set(groups.map((g) => g.id));
  const ungrouped = initialProducts.filter((p) => !p.groupId || !groupIdSet.has(p.groupId));

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
        const items = initialProducts.filter((p) => p.groupId === g.id);
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
              items.map(renderProductRow)
            )}
          </section>
        );
      })}

      {ungrouped.length > 0 && (
        <section className="space-y-2">
          {groups.length > 0 && (
            <h2 className="border-b border-ink-100 pb-1.5 font-bold text-ink-900">
              {tDash("servicesForm.ungrouped")}{" "}
              <span className="text-xs font-normal text-ink-400">({ungrouped.length})</span>
            </h2>
          )}
          {ungrouped.map(renderProductRow)}
        </section>
      )}

      {!showForm ? (
        <button onClick={startCreate} className="btn-outline">
          <Plus className="h-4 w-4" /> {t("addProduct")}
        </button>
      ) : !editingId ? (
        renderForm()
      ) : null}
    </div>
  );

  function renderForm() {
    return (
      <form ref={formRef} onSubmit={saveProduct} className="card space-y-4 p-5">
        <h3 className="font-semibold text-ink-900">
          {editingId ? tDash("productsForm.editProduct") : tDash("productsForm.newProduct")}
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">{tDash("productsForm.productName")}</label>
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
        </div>
        <div>
          <label className="label">{tDash("servicesForm.description")}</label>
          <textarea
            rows={3}
            className="input"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <div>
          <label className="label">
            {tDash("servicesForm.videoLink")} ({tDash("servicesForm.optional")})
          </label>
          <input
            type="url"
            placeholder="https://www.youtube.com/watch?v=..."
            className="input"
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
          />
        </div>

        <div>
          <label className="label">{tDash("productsForm.images")}</label>
          <div className="flex flex-wrap gap-2">
            {existingImageIds.map((id) => (
              <div key={id} className="group relative h-20 w-20 overflow-hidden rounded-lg bg-mist-100">
                <Image src={`/api/product-image/${id}`} alt="" fill className="object-cover" />
                <button
                  type="button"
                  onClick={() => {
                    setExistingImageIds((prev) => prev.filter((x) => x !== id));
                    setRemovedImageIds((prev) => [...prev, id]);
                  }}
                  className="absolute right-1 top-1 rounded-full bg-ink-900/70 p-1 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            {newImages.map((file, i) => (
              <div key={i} className="group relative h-20 w-20 overflow-hidden rounded-lg bg-mist-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={URL.createObjectURL(file)} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => setNewImages((prev) => prev.filter((_, idx) => idx !== i))}
                  className="absolute right-1 top-1 rounded-full bg-ink-900/70 p-1 text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => fileInput.current?.click()}
              className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-lg border border-dashed border-ink-100 text-ink-400 hover:border-ink-400"
            >
              <ImagePlus className="h-5 w-5" />
              <span className="text-[10px]">{tDash("productsForm.addPhoto")}</span>
            </button>
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              multiple
              hidden
              onChange={(e) => {
                addFiles(e.target.files);
                e.target.value = "";
              }}
            />
          </div>
        </div>

        {error && <p className="text-sm text-berry-500">{error}</p>}

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
