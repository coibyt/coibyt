"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import {
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  FolderTree,
  GripVertical,
  ImagePlus,
  Loader2,
  Move,
  PackageX,
  Pencil,
  Plus,
  Receipt,
  Search,
  ShoppingBag,
  Star,
  Store,
  Trash2,
  X,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { formatMoney, fromSmallestUnit, toSmallestUnit } from "@/lib/money";
import { siteThemeStyle } from "@/lib/site-theme";
import { siteSerif } from "@/lib/site-fonts";
import { discountPct, fill, shopStrings } from "@/lib/shop-strings";
import { MAX_PRODUCT_IMAGES, MAX_PRODUCT_IMAGE_BYTES, ALLOWED_PRODUCT_IMAGE_TYPES } from "@/lib/product-images";
import { SortableSection, type DragHandle } from "@/components/sortable-list";
import { ShopProductCard } from "@/components/shop-product-card";

interface ProductRow {
  id: string;
  name: string;
  brand: string | null;
  description: string | null;
  priceCents: number;
  compareAtCents: number | null;
  currency: string;
  videoUrl: string | null;
  groupId: string | null;
  viewCount: number;
  featured: boolean;
  soldOut: boolean;
  hidden: boolean;
  createdAt: string;
  imageIds: string[];
  reviewCount: number;
  rating: number | null;
  sold30: number;
}

type Filter = "all" | "live" | "featured" | "sale" | "soldOut" | "hidden";
type Flag = "featured" | "soldOut" | "hidden";
/** A photo in the editor: one already saved, or a file picked just now. */
type Photo = { kind: "saved"; id: string } | { kind: "new"; file: File; url: string };

// Numeric fields kept as plain strings while editing, same reasoning as
// ServicesManager — converted at the form/API boundary only.
const emptyForm = {
  name: "",
  brand: "",
  description: "",
  groupId: "",
  priceAmount: "",
  compareAmount: "",
  videoUrl: "",
  featured: false,
  soldOut: false,
  hidden: false,
};

function photoUrl(p: Photo) {
  return p.kind === "saved" ? `/api/product-image/${p.id}` : p.url;
}

function Toggle({ checked, onChange, title, hint }: { checked: boolean; onChange: (v: boolean) => void; title: string; hint: string }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-2xl p-3 transition-colors hover:bg-mist-50">
      <span>
        <span className="block text-sm font-semibold text-ink-900">{title}</span>
        <span className="block text-xs text-ink-400">{hint}</span>
      </span>
      <input type="checkbox" className="peer sr-only" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span
        className={`relative mt-0.5 h-6 w-11 shrink-0 rounded-full transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary-300 ${
          checked ? "bg-primary-500" : "bg-ink-100"
        }`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? "left-[22px]" : "left-0.5"}`} />
      </span>
    </label>
  );
}

function Section({ title, aside, children }: { title: string; aside?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h4 className="text-sm font-bold uppercase tracking-wider text-ink-700">{title}</h4>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function ProductsManager({
  initialProducts,
  groups,
  stats,
  slug,
  theme,
  locale,
  defaultCurrency,
  canReorder = false,
}: {
  initialProducts: ProductRow[];
  groups: { id: string; name: string }[];
  stats: { reviews: number; rating: number | null; orders30: number; revenue30: number };
  slug: string;
  /** The salon's website palette — the shop and the editor's preview use it. */
  theme: string | null;
  locale: string;
  defaultCurrency: string;
  /** Owners can drag products into order. */
  canReorder?: boolean;
}) {
  const S = shopStrings(locale);
  const router = useRouter();

  // The list in its current state, so drags and switches show instantly.
  const [products, setProducts] = useState(initialProducts);
  useEffect(() => setProducts(initialProducts), [initialProducts]);

  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [groupsOpen, setGroupsOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [groupBusy, setGroupBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  const [editorOpen, setEditorOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [formCurrency, setFormCurrency] = useState(defaultCurrency);
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [removedImageIds, setRemovedImageIds] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const shopPath = `${locale === routing.defaultLocale ? "" : `/${locale}`}/b/${slug}/products`;
  const shopUrl = `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://varaaai.com"}${shopPath}`;

  useEffect(() => {
    if (!editorOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && !saving && setEditorOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [editorOpen, saving]);

  // ---------- list actions ----------

  async function reorder(ids: string[]) {
    const byId = new Map(products.map((x) => [x.id, x]));
    const slots = products.map((x, i) => (ids.includes(x.id) ? i : -1)).filter((i) => i >= 0);
    const next = [...products];
    slots.forEach((slot, k) => {
      next[slot] = byId.get(ids[k])!;
    });
    setProducts(next);
    const res = await fetch("/api/business/products/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    }).catch(() => null);
    if (!res?.ok) router.refresh();
  }

  async function toggle(p: ProductRow, flag: Flag) {
    const value = !p[flag];
    setProducts((prev) => prev.map((x) => (x.id === p.id ? { ...x, [flag]: value } : x)));
    const body = new FormData();
    body.append(flag, String(value));
    const res = await fetch(`/api/business/products/${p.id}`, { method: "PATCH", body }).catch(() => null);
    if (!res?.ok) router.refresh();
  }

  async function removeProduct(p: ProductRow) {
    if (!window.confirm(fill(S.deleteConfirm, { name: p.name }))) return;
    setProducts((prev) => prev.filter((x) => x.id !== p.id));
    await fetch(`/api/business/products/${p.id}`, { method: "DELETE" });
    router.refresh();
  }

  function copyLink() {
    navigator.clipboard.writeText(shopUrl).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // ---------- groups ----------

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
    const name = window.prompt(S.renameGroup, current)?.trim();
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
    if (!window.confirm(fill(S.deleteGroupConfirm, { name }))) return;
    await fetch(`/api/business/product-groups/${id}`, { method: "DELETE" });
    router.refresh();
  }

  // ---------- editor ----------

  function openEditor(p: ProductRow | null) {
    photos.forEach((ph) => ph.kind === "new" && URL.revokeObjectURL(ph.url));
    setEditingId(p?.id ?? null);
    setFormCurrency(p?.currency ?? defaultCurrency);
    setForm(
      p
        ? {
            name: p.name,
            brand: p.brand ?? "",
            description: p.description ?? "",
            groupId: p.groupId ?? "",
            priceAmount: String(fromSmallestUnit(p.priceCents, p.currency)),
            compareAmount: p.compareAtCents ? String(fromSmallestUnit(p.compareAtCents, p.currency)) : "",
            videoUrl: p.videoUrl ?? "",
            featured: p.featured,
            soldOut: p.soldOut,
            hidden: p.hidden,
          }
        : emptyForm
    );
    setPhotos(p ? p.imageIds.map((id) => ({ kind: "saved" as const, id })) : []);
    setRemovedImageIds([]);
    setError(null);
    setEditorOpen(true);
  }

  function addFiles(files: FileList | null) {
    if (!files) return;
    setError(null);
    const picked: Photo[] = [];
    for (const file of Array.from(files)) {
      if (!ALLOWED_PRODUCT_IMAGE_TYPES.has(file.type)) {
        setError(S.badType);
        continue;
      }
      if (file.size > MAX_PRODUCT_IMAGE_BYTES) {
        setError(S.fileTooLarge);
        continue;
      }
      picked.push({ kind: "new", file, url: URL.createObjectURL(file) });
    }
    setPhotos((prev) => {
      const room = MAX_PRODUCT_IMAGES - prev.length;
      if (picked.length > room) setError(fill(S.tooManyImages, { max: MAX_PRODUCT_IMAGES }));
      return [...prev, ...picked.slice(0, Math.max(0, room))];
    });
  }

  function movePhoto(index: number, to: number) {
    setPhotos((prev) => {
      if (to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(index, 1);
      next.splice(to, 0, item);
      return next;
    });
  }

  function dropPhoto(index: number) {
    setPhotos((prev) => {
      const ph = prev[index];
      if (ph.kind === "saved") setRemovedImageIds((r) => [...r, ph.id]);
      else URL.revokeObjectURL(ph.url);
      return prev.filter((_, i) => i !== index);
    });
  }

  const priceCents = toSmallestUnit(Number(form.priceAmount) || 0, formCurrency);
  const compareCents = form.compareAmount ? toSmallestUnit(Number(form.compareAmount) || 0, formCurrency) : null;
  const compareInvalid = compareCents !== null && compareCents <= priceCents;
  const pctPreview = discountPct(priceCents, compareCents);

  async function saveProduct(e: React.FormEvent) {
    e.preventDefault();
    if (compareInvalid) {
      setError(S.compareInvalid);
      return;
    }
    setSaving(true);
    setError(null);
    const body = new FormData();
    body.append("name", form.name);
    body.append("brand", form.brand);
    body.append("description", form.description);
    body.append("groupId", form.groupId);
    body.append("priceCents", String(priceCents));
    body.append("compareAtCents", compareCents ? String(compareCents) : "");
    body.append("currency", formCurrency);
    body.append("videoUrl", form.videoUrl);
    body.append("featured", String(form.featured));
    body.append("soldOut", String(form.soldOut));
    body.append("hidden", String(form.hidden));
    let n = 0;
    for (const ph of photos) {
      if (ph.kind === "new") {
        body.append("images", ph.file);
        body.append("imageOrder", `new:${n++}`);
      } else {
        body.append("imageOrder", ph.id);
      }
    }
    removedImageIds.forEach((id) => body.append("removeImageIds", id));

    const res = await fetch(editingId ? `/api/business/products/${editingId}` : "/api/business/products", {
      method: editingId ? "PATCH" : "POST",
      body,
    }).catch(() => null);
    setSaving(false);
    if (!res?.ok) {
      const data = await res?.json().catch(() => null);
      setError(
        data?.error === "TOO_MANY_IMAGES"
          ? fill(S.tooManyImages, { max: MAX_PRODUCT_IMAGES })
          : data?.error === "FILE_TOO_LARGE"
            ? S.fileTooLarge
            : data?.error === "UNSUPPORTED_TYPE"
              ? S.badType
              : S.saveError
      );
      return;
    }
    photos.forEach((ph) => ph.kind === "new" && URL.revokeObjectURL(ph.url));
    setEditorOpen(false);
    router.refresh();
  }

  // ---------- derived ----------

  const onSaleCount = products.filter((p) => !p.hidden).length;
  const totalViews = products.reduce((n, p) => n + p.viewCount, 0);
  const counts: Record<Filter, number> = {
    all: products.length,
    live: products.filter((p) => !p.hidden && !p.soldOut).length,
    featured: products.filter((p) => p.featured).length,
    sale: products.filter((p) => discountPct(p.priceCents, p.compareAtCents) > 0).length,
    soldOut: products.filter((p) => p.soldOut).length,
    hidden: products.filter((p) => p.hidden).length,
  };
  const filtering = filter !== "all" || query.trim() !== "";
  const visible = useMemo(() => {
    const q = query.trim().toLocaleLowerCase();
    return products.filter((p) => {
      if (q && !`${p.name} ${p.brand ?? ""}`.toLocaleLowerCase().includes(q)) return false;
      switch (filter) {
        case "live":
          return !p.hidden && !p.soldOut;
        case "featured":
          return p.featured;
        case "sale":
          return discountPct(p.priceCents, p.compareAtCents) > 0;
        case "soldOut":
          return p.soldOut;
        case "hidden":
          return p.hidden;
        default:
          return true;
      }
    });
  }, [products, query, filter]);

  const groupIdSet = new Set(groups.map((g) => g.id));
  const groupName = new Map(groups.map((g) => [g.id, g.name]));
  const ungrouped = products.filter((p) => !p.groupId || !groupIdSet.has(p.groupId));
  const sortable = canReorder && !filtering;

  // ---------- rendering ----------

  function iconButton(onClick: () => void, title: string, icon: React.ReactNode, active = false, tone = "") {
    return (
      <button
        type="button"
        onClick={onClick}
        title={title}
        aria-label={title}
        aria-pressed={active}
        className={`flex h-9 w-9 items-center justify-center rounded-xl transition-colors ${
          active ? tone : "text-ink-400 hover:bg-mist-100 hover:text-ink-900"
        }`}
      >
        {icon}
      </button>
    );
  }

  function renderRow(p: ProductRow, handle: DragHandle | null) {
    const pct = discountPct(p.priceCents, p.compareAtCents);
    return (
      <div
        key={p.id}
        className={`group flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-card ring-1 transition-all sm:flex-row sm:items-center sm:gap-4 sm:p-3.5 ${
          handle?.dragging ? "ring-2 ring-primary-300" : "ring-ink-100 hover:ring-primary-200"
        }`}
      >
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {handle && (
            <button
              type="button"
              ref={handle.ref}
              {...handle.props}
              className="-ml-1 flex h-12 w-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-ink-400 hover:bg-mist-100 hover:text-ink-700 active:cursor-grabbing"
              aria-label="Drag"
            >
              <GripVertical className="h-5 w-5" />
            </button>
          )}
          <button
            type="button"
            onClick={() => openEditor(p)}
            className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist-100 ring-1 ring-ink-100 ${p.hidden ? "opacity-50" : ""}`}
          >
            {p.imageIds[0] ? (
              <Image src={`/api/product-image/${p.imageIds[0]}`} alt="" fill sizes="64px" className="object-cover" />
            ) : (
              <ImagePlus className="absolute inset-0 m-auto h-5 w-5 text-ink-400" />
            )}
            {p.imageIds.length > 1 && (
              <span className="absolute bottom-1 right-1 rounded-md bg-ink-900/70 px-1 text-[10px] font-semibold text-white">{p.imageIds.length}</span>
            )}
          </button>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-1.5">
              <button type="button" onClick={() => openEditor(p)} className="truncate text-left font-semibold text-ink-900 hover:text-primary-600">
                {p.name}
              </button>
              {p.featured && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200">
                  <Star className="h-3 w-3 fill-current" />
                  {S.fFeatured}
                </span>
              )}
              {pct > 0 && <span className="rounded-full bg-coral-50 px-2 py-0.5 text-[11px] font-bold text-coral-600 ring-1 ring-coral-100">−{pct}%</span>}
              {p.soldOut && <span className="rounded-full bg-ink-900 px-2 py-0.5 text-[11px] font-semibold text-white">{S.soldOut}</span>}
              {p.hidden && (
                <span className="inline-flex items-center gap-1 rounded-full bg-mist-100 px-2 py-0.5 text-[11px] font-semibold text-ink-700">
                  <EyeOff className="h-3 w-3" />
                  {S.badgeHidden}
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-xs text-ink-400">
              {[p.brand, p.groupId ? groupName.get(p.groupId) : null].filter(Boolean).join(" · ") || " "}
            </p>
            <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-ink-400">
              <span className="flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" />
                {p.viewCount}
              </span>
              <span className="flex items-center gap-1">
                <Star className={`h-3.5 w-3.5 ${p.reviewCount ? "fill-amber-400 text-amber-400" : ""}`} />
                {p.rating !== null ? `${p.rating.toFixed(1)} (${p.reviewCount})` : p.reviewCount}
              </span>
              {p.sold30 > 0 && (
                <span className="flex items-center gap-1 font-medium text-teal-600">
                  <ShoppingBag className="h-3.5 w-3.5" />
                  {fill(S.sold30, { n: p.sold30 })}
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-ink-100 pt-3 sm:border-0 sm:pt-0">
          <div className="text-left sm:min-w-[7rem] sm:text-right">
            <p className={`font-bold ${pct > 0 ? "text-coral-600" : "text-ink-900"}`}>{formatMoney(p.priceCents, p.currency, locale)}</p>
            {pct > 0 && p.compareAtCents && (
              <p className="text-xs text-ink-400 line-through">{formatMoney(p.compareAtCents, p.currency, locale)}</p>
            )}
          </div>
          <div className="flex items-center gap-0.5">
            {iconButton(
              () => toggle(p, "featured"),
              p.featured ? S.tUnfeature : S.tFeature,
              <Star className={`h-4 w-4 ${p.featured ? "fill-current" : ""}`} />,
              p.featured,
              "bg-amber-50 text-amber-500"
            )}
            {iconButton(
              () => toggle(p, "soldOut"),
              p.soldOut ? S.tInStock : S.tSoldOut,
              <PackageX className="h-4 w-4" />,
              p.soldOut,
              "bg-ink-900 text-white"
            )}
            {iconButton(
              () => toggle(p, "hidden"),
              p.hidden ? S.tShow : S.tHide,
              p.hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />,
              p.hidden,
              "bg-mist-100 text-ink-900"
            )}
            <span className="mx-1 h-5 w-px bg-ink-100" />
            {iconButton(() => openEditor(p), S.edit, <Pencil className="h-4 w-4" />)}
            {!p.hidden && (
              <Link
                href={`/b/${slug}/products/${p.id}`}
                target="_blank"
                title={S.viewOnShop}
                aria-label={S.viewOnShop}
                className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-400 hover:bg-mist-100 hover:text-ink-900"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            {iconButton(() => removeProduct(p), S.del, <Trash2 className="h-4 w-4 text-berry-500" />)}
          </div>
        </div>
      </div>
    );
  }

  const sectionRows = (items: ProductRow[]) => (
    <SortableSection
      items={items}
      disabled={!sortable}
      onReorder={reorder}
      renderRow={(id, handle) => renderRow(items.find((x) => x.id === id)!, handle)}
    />
  );

  const filterChips: [Filter, string][] = [
    ["all", S.fAll],
    ["live", S.fLive],
    ["featured", S.fFeatured],
    ["sale", S.fSale],
    ["soldOut", S.fSoldOut],
    ["hidden", S.fHidden],
  ];

  const statTiles = [
    { label: S.statOnSale, value: String(onSaleCount), hint: fill(S.statOf, { n: products.length }) },
    { label: S.statViews, value: totalViews.toLocaleString(locale), hint: S.statViewsHint },
    {
      label: S.statRating,
      value: stats.rating !== null ? `★ ${stats.rating.toFixed(1)}` : "—",
      hint: stats.rating !== null ? fill(S.basedOn, { n: stats.reviews }) : S.statNoRating,
    },
    {
      label: S.statOrders,
      value: String(stats.orders30),
      hint: fill(S.statRevenue, { amount: formatMoney(stats.revenue30, defaultCurrency, locale) }),
    },
  ];

  const previewProduct = {
    id: editingId ?? "preview",
    name: form.name || S.namePh,
    brand: form.brand || null,
    priceCents,
    compareAtCents: compareInvalid ? null : compareCents,
    currency: formCurrency,
    imageIds: [],
    groupId: form.groupId || null,
    featured: form.featured,
    soldOut: form.soldOut,
    isNew: !editingId,
    rating: editingId ? (products.find((p) => p.id === editingId)?.rating ?? null) : null,
    reviewCount: editingId ? (products.find((p) => p.id === editingId)?.reviewCount ?? 0) : 0,
    sortOrder: 0,
    createdAt: "",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-3xl bg-[#1a1326] p-6 text-white sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-primary-500/40 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-coral-500/25 blur-3xl" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-amber-200">
              <Store className="h-3.5 w-3.5" />
              {S.dEyebrow}
            </span>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{S.dTitle}</h1>
            <p className="max-w-xl text-sm text-white/70">{S.dSubtitle}</p>
          </div>
          <div className="flex flex-wrap gap-2 lg:max-w-[34rem] lg:justify-end">
            <Link
              href={`/b/${slug}/products`}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <ExternalLink className="h-4 w-4" />
              {S.viewShop}
            </Link>
            <button
              type="button"
              onClick={copyLink}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-300" /> : <Copy className="h-4 w-4" />}
              {copied ? S.copiedLink : S.copyLink}
            </button>
            <Link
              href="/business/dashboard/orders"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-sm font-semibold ring-1 ring-white/15 transition hover:bg-white/15"
            >
              <Receipt className="h-4 w-4" />
              {S.orders}
            </Link>
            <button
              type="button"
              onClick={() => openEditor(null)}
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-[#1a1326] shadow-lg transition hover:-translate-y-0.5"
            >
              <Plus className="h-4 w-4" />
              {S.addProduct}
            </button>
          </div>
        </div>
        <div className="relative mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {statTiles.map((t) => (
            <div key={t.label} className="rounded-2xl bg-white/[0.06] p-4 ring-1 ring-white/10">
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">{t.label}</p>
              <p className="mt-1.5 text-2xl font-bold tracking-tight">{t.value}</p>
              <p className="mt-0.5 truncate text-xs text-white/50">{t.hint}</p>
            </div>
          ))}
        </div>
      </div>

      {products.length === 0 ? (
        <div className="rounded-3xl border-2 border-dashed border-ink-100 bg-white px-6 py-16 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-500">
            <ShoppingBag className="h-8 w-8" />
          </span>
          <h2 className="mt-5 text-lg font-bold text-ink-900">{S.dEmptyTitle}</h2>
          <p className="mx-auto mt-2 max-w-md text-sm text-ink-400">{S.dEmptyText}</p>
          <button type="button" onClick={() => openEditor(null)} className="btn-primary mt-6">
            <Plus className="h-4 w-4" />
            {S.addProduct}
          </button>
        </div>
      ) : (
        <>
          {/* Toolbar */}
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
            <label className="relative lg:w-72">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={S.searchPh}
                className="input !rounded-full !pl-10"
              />
            </label>
            <div className="-mx-4 flex flex-1 gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] lg:mx-0 lg:px-0 lg:pb-0">
              {filterChips
                .filter(([key]) => key === "all" || counts[key] > 0)
                .map(([key, label]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFilter(key)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition ${
                      filter === key ? "bg-ink-900 text-white" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:ring-ink-400"
                    }`}
                  >
                    {label}
                    <span className={`text-xs ${filter === key ? "text-white/60" : "text-ink-400"}`}>{counts[key]}</span>
                  </button>
                ))}
            </div>
            <button
              type="button"
              onClick={() => setGroupsOpen((v) => !v)}
              className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ring-1 transition ${
                groupsOpen ? "bg-primary-50 text-primary-700 ring-primary-200" : "bg-white text-ink-700 ring-ink-100 hover:ring-ink-400"
              }`}
            >
              <FolderTree className="h-4 w-4" />
              {S.groups}
              <span className="text-xs text-ink-400">{groups.length}</span>
            </button>
          </div>

          {groupsOpen && (
            <div className="rounded-3xl bg-white p-5 shadow-card ring-1 ring-ink-100 animate-slide-up">
              <p className="mb-4 text-sm text-ink-400">{S.groupsHint}</p>
              <form onSubmit={addGroup} className="mb-4 flex gap-2">
                <input
                  className="input flex-1"
                  value={newGroupName}
                  maxLength={100}
                  onChange={(e) => setNewGroupName(e.target.value)}
                  placeholder={S.newGroupPh}
                />
                <button type="submit" disabled={groupBusy || !newGroupName.trim()} className="btn-primary shrink-0">
                  {groupBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                  <span className="hidden sm:inline">{S.addGroup}</span>
                </button>
              </form>
              {groups.length === 0 ? (
                <p className="text-sm text-ink-400">{S.noGroups}</p>
              ) : (
                <ul className="divide-y divide-ink-100">
                  {groups.map((g, index) => (
                    <li key={g.id} className="flex items-center justify-between gap-2 py-2">
                      <span className="min-w-0 truncate text-sm font-medium text-ink-900">
                        {g.name} <span className="text-xs font-normal text-ink-400">({products.filter((p) => p.groupId === g.id).length})</span>
                      </span>
                      <span className="flex items-center gap-0.5">
                        <button onClick={() => moveGroup(g.id, "up")} disabled={index === 0} className="btn-ghost !p-1.5 disabled:opacity-30" aria-label="Up">
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => moveGroup(g.id, "down")}
                          disabled={index === groups.length - 1}
                          className="btn-ghost !p-1.5 disabled:opacity-30"
                          aria-label="Down"
                        >
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button onClick={() => renameGroup(g.id, g.name)} className="btn-ghost !p-1.5" aria-label={S.renameGroup}>
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => removeGroup(g.id, g.name)} className="btn-ghost !p-1.5 text-berry-500" aria-label={S.del}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {sortable && products.length > 1 && (
            <p className="flex items-start gap-2 rounded-2xl bg-primary-50 px-4 py-3 text-xs font-medium text-primary-700 ring-1 ring-primary-100">
              <Move className="mt-0.5 h-4 w-4 shrink-0" />
              {S.reorderHint}
            </p>
          )}

          {filtering ? (
            visible.length === 0 ? (
              <p className="rounded-3xl bg-white p-10 text-center text-sm text-ink-400 ring-1 ring-ink-100">{S.noMatch}</p>
            ) : (
              <div className="space-y-2">{visible.map((p) => renderRow(p, null))}</div>
            )
          ) : (
            <div className="space-y-8">
              {groups.map((g) => {
                const items = products.filter((p) => p.groupId === g.id);
                return (
                  <section key={g.id} className="space-y-3">
                    <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink-700">
                      {g.name}
                      <span className="rounded-full bg-mist-100 px-2 py-0.5 text-[11px] font-semibold text-ink-400">{items.length}</span>
                    </h2>
                    {items.length === 0 ? (
                      <p className="rounded-2xl border border-dashed border-ink-100 px-4 py-5 text-center text-xs text-ink-400">{S.groupEmpty}</p>
                    ) : (
                      <div className="space-y-2">{sectionRows(items)}</div>
                    )}
                  </section>
                );
              })}
              {ungrouped.length > 0 && (
                <section className="space-y-3">
                  {groups.length > 0 && (
                    <h2 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-ink-700">
                      {S.ungrouped}
                      <span className="rounded-full bg-mist-100 px-2 py-0.5 text-[11px] font-semibold text-ink-400">{ungrouped.length}</span>
                    </h2>
                  )}
                  <div className="space-y-2">{sectionRows(ungrouped)}</div>
                </section>
              )}
            </div>
          )}
        </>
      )}

      {/* Editor */}
      {/* Portalled to <body> so no ancestor's layout can offset it, and
          layered over the dashboard's floating help button. */}
      {editorOpen &&
        createPortal(
          <div className="fixed inset-0 z-[80] flex justify-end">
            <button className="absolute inset-0 bg-ink-900/50 backdrop-blur-[2px] animate-fade-in" onClick={() => !saving && setEditorOpen(false)} aria-label={S.cancel} />
            <form
              onSubmit={saveProduct}
              className="relative flex h-full w-full max-w-5xl flex-col bg-mist-50 shadow-2xl animate-in slide-in-from-right duration-300"
            >
              <header className="flex items-center justify-between gap-4 border-b border-ink-100 bg-white px-5 py-4 sm:px-7">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary-500">{S.dTitle}</p>
                  <h3 className="text-xl font-bold text-ink-900">{editingId ? S.editProduct : S.newProduct}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setEditorOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-ink-400 ring-1 ring-ink-100 hover:text-ink-900"
                  aria-label={S.cancel}
                >
                  <X className="h-5 w-5" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto">
                <div className="grid gap-6 p-5 sm:p-7 lg:grid-cols-[1fr_17rem]">
                  <div className="min-w-0 space-y-5">
                    <Section title={S.secPhotos} aside={<span className="text-xs font-semibold text-ink-400">{photos.length}/{MAX_PRODUCT_IMAGES}</span>}>
                      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                        {photos.map((ph, i) => (
                          <div
                            key={ph.kind === "saved" ? ph.id : ph.url}
                            className={`group relative aspect-square overflow-hidden rounded-2xl bg-mist-100 ${i === 0 ? "ring-2 ring-primary-400 ring-offset-2" : "ring-1 ring-ink-100"}`}
                          >
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={photoUrl(ph)} alt="" className="h-full w-full object-cover" />
                            {i === 0 && (
                              <span className="absolute left-1.5 top-1.5 rounded-full bg-primary-500 px-2 py-0.5 text-[10px] font-bold text-white">{S.cover}</span>
                            )}
                            <button
                              type="button"
                              onClick={() => dropPhoto(i)}
                              className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900/70 text-white hover:bg-berry-500"
                              aria-label={S.removePhoto}
                              title={S.removePhoto}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                            <div className="absolute inset-x-1.5 bottom-1.5 flex justify-between opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100">
                              <button
                                type="button"
                                onClick={() => movePhoto(i, i - 1)}
                                disabled={i === 0}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow disabled:opacity-0"
                                aria-label={S.moveLeft}
                                title={S.moveLeft}
                              >
                                <ChevronLeft className="h-4 w-4" />
                              </button>
                              {i !== 0 && (
                                <button
                                  type="button"
                                  onClick={() => movePhoto(i, 0)}
                                  className="flex h-7 items-center gap-1 rounded-full bg-white/90 px-2 text-[10px] font-bold text-ink-900 shadow"
                                  title={S.makeCover}
                                >
                                  <Star className="h-3 w-3" />
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => movePhoto(i, i + 1)}
                                disabled={i === photos.length - 1}
                                className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-ink-900 shadow disabled:opacity-0"
                                aria-label={S.moveRight}
                                title={S.moveRight}
                              >
                                <ChevronRight className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        {photos.length < MAX_PRODUCT_IMAGES && (
                          <button
                            type="button"
                            onClick={() => fileInput.current?.click()}
                            onDragOver={(e) => {
                              e.preventDefault();
                              setDragOver(true);
                            }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => {
                              e.preventDefault();
                              setDragOver(false);
                              addFiles(e.dataTransfer.files);
                            }}
                            className={`flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-2 text-center transition-colors ${
                              dragOver ? "border-primary-400 bg-primary-50 text-primary-600" : "border-ink-100 text-ink-400 hover:border-primary-300 hover:text-primary-600"
                            } ${photos.length === 0 ? "col-span-3 aspect-auto py-10 sm:col-span-4" : ""}`}
                          >
                            <ImagePlus className="h-6 w-6" />
                            <span className="text-xs font-medium leading-tight">{S.dropPhotos}</span>
                          </button>
                        )}
                      </div>
                      <p className="mt-3 text-xs text-ink-400">{fill(S.photosHint, { max: MAX_PRODUCT_IMAGES })}</p>
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
                    </Section>

                    <Section title={S.secInfo}>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="sm:col-span-2">
                          <label className="label">{S.name}</label>
                          <input
                            required
                            minLength={2}
                            maxLength={120}
                            className="input"
                            placeholder={S.namePh}
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="label">
                            {S.brand} <span className="font-normal text-ink-400">({S.optional})</span>
                          </label>
                          <input
                            className="input"
                            maxLength={80}
                            placeholder={S.brandPh}
                            value={form.brand}
                            onChange={(e) => setForm({ ...form, brand: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="label">{S.group}</label>
                          <select className="input" value={form.groupId} onChange={(e) => setForm({ ...form, groupId: e.target.value })}>
                            <option value="">{S.ungrouped}</option>
                            {groups.map((g) => (
                              <option key={g.id} value={g.id}>
                                {g.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="sm:col-span-2">
                          <label className="label flex justify-between">
                            <span>{S.descriptionLabel}</span>
                            <span className="font-normal text-ink-400">{form.description.length}/2000</span>
                          </label>
                          <textarea
                            rows={5}
                            maxLength={2000}
                            className="input"
                            placeholder={S.descriptionPh}
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                          />
                        </div>
                      </div>
                    </Section>

                    <Section title={S.secPrice}>
                      <div className="grid gap-4 sm:grid-cols-[8rem_1fr_1fr]">
                        <div>
                          <label className="label">{S.currency}</label>
                          <select className="input" value={formCurrency} onChange={(e) => setFormCurrency(e.target.value)}>
                            <option value="VND">VND</option>
                            <option value="USD">USD</option>
                            <option value="EUR">EUR</option>
                          </select>
                        </div>
                        <div>
                          <label className="label">
                            {S.price} ({formCurrency})
                          </label>
                          <input
                            required
                            type="number"
                            min={0}
                            step="any"
                            inputMode="decimal"
                            placeholder="0"
                            className="input"
                            value={form.priceAmount}
                            onChange={(e) => setForm({ ...form, priceAmount: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="label">{S.compareAt}</label>
                          <input
                            type="number"
                            min={0}
                            step="any"
                            inputMode="decimal"
                            className={`input ${compareInvalid ? "!border-berry-400 !ring-berry-100" : ""}`}
                            value={form.compareAmount}
                            onChange={(e) => setForm({ ...form, compareAmount: e.target.value })}
                          />
                        </div>
                      </div>
                      {compareInvalid ? (
                        <p className="mt-3 text-xs font-medium text-berry-500">{S.compareInvalid}</p>
                      ) : pctPreview > 0 ? (
                        <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-coral-50 px-3 py-1 text-xs font-semibold text-coral-600">
                          {fill(S.compareHint, { pct: pctPreview })}
                        </p>
                      ) : null}
                    </Section>

                    <Section title={S.secDisplay}>
                      <div className="-m-3 divide-y divide-ink-100">
                        <Toggle
                          checked={form.featured}
                          onChange={(v) => setForm({ ...form, featured: v })}
                          title={S.featuredLabel[0]}
                          hint={S.featuredLabel[1]}
                        />
                        <Toggle
                          checked={form.soldOut}
                          onChange={(v) => setForm({ ...form, soldOut: v })}
                          title={S.soldOutLabel[0]}
                          hint={S.soldOutLabel[1]}
                        />
                        <Toggle
                          checked={form.hidden}
                          onChange={(v) => setForm({ ...form, hidden: v })}
                          title={S.hiddenLabel[0]}
                          hint={S.hiddenLabel[1]}
                        />
                      </div>
                    </Section>

                    <Section title={S.secVideo}>
                      <input
                        type="url"
                        placeholder={S.videoPh}
                        className="input"
                        value={form.videoUrl}
                        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                      />
                    </Section>
                  </div>

                  <aside className="lg:sticky lg:top-0 lg:self-start">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-ink-700">{S.preview}</p>
                    <div
                      style={siteThemeStyle(theme)}
                      className={`${siteSerif.variable} pointer-events-none rounded-3xl bg-lp-bg p-5 text-lp-ink shadow-card ring-1 ring-ink-100`}
                    >
                      <ShopProductCard product={previewProduct} slug={slug} locale={locale} previewImages={photos.slice(0, 2).map(photoUrl)} />
                    </div>
                  </aside>
                </div>
              </div>

              <footer className="flex items-center justify-between gap-3 border-t border-ink-100 bg-white px-5 py-4 sm:px-7">
                <p className="min-w-0 truncate text-sm font-medium text-berry-500">{error}</p>
                <div className="flex shrink-0 gap-2">
                  <button type="button" onClick={() => setEditorOpen(false)} className="btn-ghost">
                    {S.cancel}
                  </button>
                  <button type="submit" disabled={saving} className="btn-primary min-w-[9rem]">
                    {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                    {S.saveProduct}
                  </button>
                </div>
              </footer>
            </form>
          </div>,
          document.body
        )}
    </div>
  );
}
