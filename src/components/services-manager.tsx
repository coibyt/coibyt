"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslations } from "next-intl";
import {
  ArchiveRestore,
  CalendarCheck,
  Check,
  ChevronDown,
  ChevronUp,
  Clock,
  Copy,
  Crown,
  EyeOff,
  Film,
  FolderPlus,
  GripVertical,
  Layers,
  Loader2,
  Move,
  Pencil,
  Percent,
  Plus,
  Scissors,
  Search,
  Sparkles,
  Tag,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/navigation";
import { formatMoney, toSmallestUnit, fromSmallestUnit } from "@/lib/money";
import { fill } from "@/lib/shop-strings";
import { servicesStrings } from "@/lib/services-strings";
import { adjustPrice } from "@/lib/service-price";
import { ServiceAddOnsModal } from "@/components/service-addons-modal";
import { SortableSection, type DragHandle } from "@/components/sortable-list";
import { WithVaraClipLinks } from "@/components/varaclip-link";

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
  categoryId: string | null;
  videoUrl: string | null;
  staffAssignments: StaffAssignment[];
}

export interface ServiceStats {
  bookings: number;
  revenueCents: number;
  addOns: number;
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
  categoryId: "",
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

const REORDER_HINT: Record<string, string> = {
  vi: "Kéo biểu tượng ⋮⋮ bên trái để sắp xếp thứ tự dịch vụ — khách sẽ thấy đúng thứ tự này khi đặt lịch.",
  en: "Drag the ⋮⋮ handle on the left to reorder services — customers see them in this order when booking.",
  fi: "Vedä vasemmalla olevasta ⋮⋮-kahvasta järjestääksesi palvelut — asiakkaat näkevät ne tässä järjestyksessä.",
};

const DURATIONS = [15, 30, 45, 60, 90, 120];
const TILE = ["from-[#624f89] to-[#1f182d]", "from-[#c2378f] to-[#6d2a6f]", "from-[#03878f] to-[#013a3e]", "from-[#d9b25c] to-[#8a6a2b]", "from-[#ec6a47] to-[#a31f3f]"];
const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const FIELD =
  "w-full rounded-2xl border border-ink-100 bg-mist-50/40 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100";

function tileFor(id: string) {
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return TILE[h % TILE.length];
}

export function ServicesManager({
  initialServices,
  staffOptions,
  groups,
  categories,
  stats,
  locale,
  defaultCurrency,
  canReorder = false,
  canEdit = false,
}: {
  initialServices: ServiceRow[];
  staffOptions: { id: string; name: string; avatarUrl: string | null }[];
  groups: { id: string; name: string }[];
  // The platform's standard categories (same ones as the homepage's "Duyệt
  // theo danh mục"), offered as a ready-made alternative to a custom group —
  // picking one tags the service with Service.categoryId instead of
  // groupId, so the public site can show its name translated per viewer.
  categories: { id: string; name: string }[];
  /** Bookings and revenue in the last 30 days, and add-on count, per service. */
  stats: Record<string, ServiceStats>;
  locale: string;
  defaultCurrency: string;
  /** Owners can drag services into order. */
  canReorder?: boolean;
  /** Owners can add, edit and reprice; staff with the permission only view. */
  canEdit?: boolean;
}) {
  const t = useTranslations("business");
  const tCommon = useTranslations("common");
  const tDash = useTranslations("dashboard");
  const S = servicesStrings(locale);
  const router = useRouter();

  const [drawer, setDrawer] = useState(false);
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
  const [formError, setFormError] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [groupBusy, setGroupBusy] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [q, setQ] = useState("");
  const [groupFilter, setGroupFilter] = useState("");
  const [staffFilter, setStaffFilter] = useState("");
  const [sort, setSort] = useState<"menu" | "popular" | "priceAsc" | "priceDesc">("menu");
  const [bulk, setBulk] = useState<null | { scope: string; percent: string; round: boolean }>(null);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  // The list in its current order, so a drag shows instantly while it saves.
  const [services, setServices] = useState(initialServices);
  useEffect(() => setServices(initialServices), [initialServices]);

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(null), 2400);
  }

  async function reorder(ids: string[]) {
    const byId = new Map(services.map((x) => [x.id, x]));
    const slots = services.map((x, i) => (ids.includes(x.id) ? i : -1)).filter((i) => i >= 0);
    const next = [...services];
    slots.forEach((slot, k) => {
      next[slot] = byId.get(ids[k])!;
    });
    setServices(next);
    const res = await fetch("/api/business/services/reorder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    }).catch(() => null);
    if (!res?.ok) router.refresh();
  }

  function startEdit(s: ServiceRow) {
    setEditingId(s.id);
    setFormCurrency(s.currency);
    setFormError(false);
    setForm({
      name: s.name,
      description: s.description ?? "",
      groupId: s.groupId ?? "",
      categoryId: s.categoryId ?? "",
      durationMin: String(s.durationMin),
      bufferMin: String(s.bufferMin),
      priceAmount: String(fromSmallestUnit(s.priceCents, s.currency)),
      depositAmount: s.depositCents !== null ? String(fromSmallestUnit(s.depositCents, s.currency)) : "",
      videoUrl: s.videoUrl ?? "",
      staffIds: s.staffAssignments.map((a) => a.staffId),
      staffOverrides: Object.fromEntries(
        s.staffAssignments.map((a) => [
          a.staffId,
          {
            priceAmount: a.priceCentsOverride !== null ? String(fromSmallestUnit(a.priceCentsOverride, s.currency)) : "",
            durationMin: a.durationMinOverride !== null ? String(a.durationMinOverride) : "",
          },
        ])
      ),
    });
    setDrawer(true);
  }

  function startCreate() {
    setEditingId(null);
    setFormCurrency(defaultCurrency);
    setFormError(false);
    setForm(emptyForm);
    setDrawer(true);
  }

  async function saveService(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError(false);
    const body = {
      name: form.name,
      description: form.description,
      groupId: form.groupId || null,
      categoryId: form.categoryId || null,
      durationMin: Number(form.durationMin) || 0,
      bufferMin: Number(form.bufferMin) || 0,
      priceCents: toSmallestUnit(Number(form.priceAmount) || 0, formCurrency),
      depositCents: form.depositAmount.trim() === "" ? undefined : toSmallestUnit(Number(form.depositAmount), formCurrency),
      videoUrl: form.videoUrl.trim() || undefined,
      staffAssignments: form.staffIds.map((staffId) => {
        const override = form.staffOverrides[staffId];
        return {
          staffId,
          priceCentsOverride: override?.priceAmount.trim() ? toSmallestUnit(Number(override.priceAmount), formCurrency) : undefined,
          durationMinOverride: override?.durationMin.trim() ? Number(override.durationMin) : undefined,
        };
      }),
      currency: formCurrency,
    };
    const res = await fetch(editingId ? `/api/business/services/${editingId}` : "/api/business/services", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }).catch(() => null);
    setSaving(false);
    if (!res?.ok) return setFormError(true);
    setForm(emptyForm);
    setEditingId(null);
    setDrawer(false);
    flash(S.saved);
    router.refresh();
  }

  async function duplicate(s: ServiceRow) {
    const res = await fetch("/api/business/services", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: `${s.name}${S.copySuffix}`.slice(0, 120),
        description: s.description ?? "",
        groupId: s.groupId,
        categoryId: s.categoryId ?? undefined,
        durationMin: s.durationMin,
        bufferMin: s.bufferMin,
        priceCents: s.priceCents,
        depositCents: s.depositCents ?? undefined,
        videoUrl: s.videoUrl ?? undefined,
        currency: s.currency,
        staffAssignments: s.staffAssignments.map((a) => ({
          staffId: a.staffId,
          priceCentsOverride: a.priceCentsOverride ?? undefined,
          durationMinOverride: a.durationMinOverride ?? undefined,
        })),
      }),
    }).catch(() => null);
    if (res?.ok) {
      flash(S.duplicated);
      router.refresh();
    } else flash(S.error);
  }

  async function hideService(s: ServiceRow) {
    if (!window.confirm(fill(S.hideConfirm, { name: s.name }))) return;
    await fetch(`/api/business/services/${s.id}`, { method: "DELETE" });
    router.refresh();
  }

  async function restoreService(s: ServiceRow) {
    const res = await fetch(`/api/business/services/${s.id}/restore`, { method: "POST" }).catch(() => null);
    if (res?.ok) {
      flash(S.restored);
      router.refresh();
    }
  }

  function toggleStaff(id: string) {
    setForm((f) => ({
      ...f,
      staffIds: f.staffIds.includes(id) ? f.staffIds.filter((x) => x !== id) : [...f.staffIds, id],
      staffOverrides: f.staffOverrides[id] ? f.staffOverrides : { ...f.staffOverrides, [id]: { priceAmount: "", durationMin: "" } },
    }));
  }

  function setStaffOverride(id: string, field: "priceAmount" | "durationMin", value: string) {
    setForm((f) => ({
      ...f,
      staffOverrides: { ...f.staffOverrides, [id]: { ...f.staffOverrides[id], [field]: value } },
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

  const activeServices = services.filter((s) => s.active);
  const hiddenServices = services.filter((s) => !s.active);
  const stat = (id: string) => stats[id] ?? { bookings: 0, revenueCents: 0, addOns: 0 };
  const staffById = new Map(staffOptions.map((s) => [s.id, s]));
  const groupIdSet = new Set(groups.map((g) => g.id));
  const categoryById = new Map(categories.map((c) => [c.id, c.name]));

  // Best sellers: the top three by bookings (with at least one).
  const ranked = [...activeServices].filter((s) => stat(s.id).bookings > 0).sort((a, b) => stat(b.id).bookings - stat(a.id).bookings);
  const bestIds = new Set(ranked.slice(0, 3).map((s) => s.id));
  const totals = {
    bookings: activeServices.reduce((n, s) => n + stat(s.id).bookings, 0),
    revenue: activeServices.reduce((n, s) => n + stat(s.id).revenueCents, 0),
    avg: activeServices.length
      ? Math.round(activeServices.filter((s) => s.currency === defaultCurrency).reduce((n, s) => n + s.priceCents, 0) / Math.max(1, activeServices.filter((s) => s.currency === defaultCurrency).length))
      : 0,
  };

  const filtering = q.trim() !== "" || groupFilter !== "" || staffFilter !== "" || sort !== "menu";
  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const list = activeServices.filter(
      (s) =>
        (!needle || s.name.toLowerCase().includes(needle) || (s.description ?? "").toLowerCase().includes(needle)) &&
        (!groupFilter ||
          (groupFilter.startsWith("group:") ? s.groupId === groupFilter.slice(6) : s.categoryId === groupFilter.slice(9) && !(s.groupId && groupIdSet.has(s.groupId)))) &&
        (!staffFilter || s.staffAssignments.some((a) => a.staffId === staffFilter))
    );
    if (sort === "popular") list.sort((a, b) => stat(b.id).bookings - stat(a.id).bookings);
    if (sort === "priceAsc") list.sort((a, b) => a.priceCents - b.priceCents);
    if (sort === "priceDesc") list.sort((a, b) => b.priceCents - a.priceCents);
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [services, q, groupFilter, staffFilter, sort, stats]);

  const sortable = canReorder && !filtering && !drawer;

  function renderServiceRow(s: ServiceRow, handle?: DragHandle | null) {
    const st = stat(s.id);
    const assigned = s.staffAssignments.map((a) => staffById.get(a.staffId)).filter(Boolean) as { id: string; name: string; avatarUrl: string | null }[];
    return (
      <article
        key={s.id}
        className={`group flex items-stretch gap-3 rounded-3xl border border-ink-100 bg-white p-3 shadow-[0_14px_34px_-30px_rgba(31,24,45,0.6)] transition hover:border-primary-200 sm:p-4 ${
          handle?.dragging ? "ring-2 ring-primary-300" : ""
        }`}
      >
        {handle && (
          <button
            type="button"
            ref={handle.ref}
            {...handle.props}
            className="-ml-1 flex w-6 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-ink-300 hover:bg-mist-100 hover:text-ink-700 active:cursor-grabbing"
            aria-label="Drag"
          >
            <GripVertical className="h-5 w-5" />
          </button>
        )}
        <span className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br text-lg font-bold text-white sm:flex ${tileFor(s.id)}`}>
          {s.name.trim()[0]?.toUpperCase()}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="flex flex-wrap items-center gap-2 font-bold text-ink-900">
                <span className="min-w-0 [overflow-wrap:anywhere]">{s.name}</span>
                {bestIds.has(s.id) && (
                  <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-[#fbf3e1] to-[#f3e2b8] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#8a6a2b]">
                    <Crown className="h-3 w-3" />
                    {S.bestseller}
                  </span>
                )}
              </p>
              {s.description && <p className="mt-0.5 line-clamp-1 text-xs text-ink-400">{s.description}</p>}
            </div>
            <div className="shrink-0 text-right">
              <p className="text-base font-bold tabular-nums text-ink-900">{formatMoney(s.priceCents, s.currency, locale)}</p>
              {st.bookings > 0 && <p className="text-[11px] font-semibold text-primary-600">{fill(S.bookings30, { n: st.bookings })}</p>}
            </div>
          </div>

          <div className="mt-2 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold">
            <span className="flex items-center gap-1 rounded-full bg-mist-50 px-2 py-1 text-ink-700 ring-1 ring-ink-100">
              <Clock className="h-3 w-3" />
              {s.durationMin} {tCommon("min")}
            </span>
            {s.bufferMin > 0 && <span className="rounded-full bg-mist-50 px-2 py-1 text-ink-400 ring-1 ring-ink-100">{fill(S.buffer, { n: s.bufferMin })}</span>}
            {s.depositCents !== null && s.depositCents > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-[#fbf3e1] px-2 py-1 text-[#8a6a2b]">
                <Wallet className="h-3 w-3" />
                {fill(S.deposit, { amount: formatMoney(s.depositCents, s.currency, locale) })}
              </span>
            )}
            {st.addOns > 0 && (
              <span className="flex items-center gap-1 rounded-full bg-primary-100/60 px-2 py-1 text-primary-700">
                <Sparkles className="h-3 w-3" />
                {fill(S.addonsCount, { n: st.addOns })}
              </span>
            )}
            {s.videoUrl && (
              <span className="flex items-center gap-1 rounded-full bg-mist-50 px-2 py-1 text-ink-700 ring-1 ring-ink-100">
                <Film className="h-3 w-3" />
                {S.video}
              </span>
            )}
            {assigned.length > 0 ? (
              <span className="flex items-center -space-x-1.5 pl-1">
                {assigned.slice(0, 4).map((p) =>
                  p.avatarUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={p.id} src={p.avatarUrl} alt={p.name} title={p.name} className="h-6 w-6 rounded-full object-cover ring-2 ring-white" />
                  ) : (
                    <span key={p.id} title={p.name} className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-500 text-[10px] font-bold text-white ring-2 ring-white">
                      {p.name.trim()[0]?.toUpperCase()}
                    </span>
                  )
                )}
                {assigned.length > 4 && <span className="flex h-6 w-6 items-center justify-center rounded-full bg-ink-100 text-[10px] font-bold text-ink-700 ring-2 ring-white">+{assigned.length - 4}</span>}
              </span>
            ) : (
              staffOptions.length > 0 && <span className="rounded-full bg-amber-50 px-2 py-1 text-amber-700">{S.noStaff}</span>
            )}
          </div>

          {canEdit && (
            <div className="mt-3 flex flex-wrap gap-1.5 border-t border-ink-100 pt-2.5">
              {[
                { icon: Pencil, label: S.edit, onClick: () => startEdit(s), cls: "text-ink-700" },
                { icon: Copy, label: S.duplicate, onClick: () => duplicate(s), cls: "text-ink-700" },
                { icon: Sparkles, label: S.addonsBtn, onClick: () => setAddOnsFor(s), cls: "text-ink-700" },
                { icon: EyeOff, label: S.hide, onClick: () => hideService(s), cls: "text-berry-500" },
              ].map((b) => (
                <button
                  key={b.label}
                  type="button"
                  onClick={b.onClick}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition hover:bg-mist-50 ${b.cls}`}
                >
                  <b.icon className="h-3.5 w-3.5" />
                  {b.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </article>
    );
  }

  const sectionRows = (items: ServiceRow[]) => (
    <SortableSection
      items={items}
      disabled={!sortable}
      onReorder={reorder}
      renderRow={(id, handle) => renderServiceRow(items.find((x) => x.id === id)!, handle)}
    />
  );

  const afterCustomGroups = activeServices.filter((s) => !s.groupId || !groupIdSet.has(s.groupId));
  // A service tagged with one of the platform's standard categories (instead
  // of a custom group) gets its own section here too, so the list the owner
  // sees matches how the public site will actually group it.
  const categorySections = categories
    .map((c) => ({ id: c.id, name: c.name, items: afterCustomGroups.filter((s) => s.categoryId === c.id) }))
    .filter((sec) => sec.items.length > 0);
  const ungroupedServices = afterCustomGroups.filter((s) => !s.categoryId || !categoryById.has(s.categoryId));

  const sectionHead = (name: string, count: number) => (
    <div className="flex items-center gap-2 pb-1">
      <Layers className="h-4 w-4 text-[#b08a3e]" />
      <h2 className="text-base font-bold text-ink-900">{name}</h2>
      <span className="rounded-full bg-mist-50 px-2 py-0.5 text-[11px] font-bold text-ink-400 ring-1 ring-ink-100">{count}</span>
    </div>
  );

  // Bulk price tool: which services and their new prices.
  const bulkTargets = bulk
    ? activeServices.filter((s) =>
        !bulk.scope
          ? true
          : bulk.scope.startsWith("group:")
            ? s.groupId === bulk.scope.slice(6)
            : s.categoryId === bulk.scope.slice(9) && !(s.groupId && groupIdSet.has(s.groupId))
      )
    : [];
  const bulkPct = bulk ? Number(bulk.percent.replace(",", ".")) || 0 : 0;

  async function applyBulk() {
    if (!bulk || bulkTargets.length === 0 || bulkPct === 0) return;
    setSaving(true);
    const res = await fetch("/api/business/services/bulk-price", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: bulkTargets.map((s) => s.id), percent: bulkPct, round: bulk.round }),
    }).catch(() => null);
    setSaving(false);
    if (!res?.ok) return flash(S.error);
    setBulk(null);
    flash(fill(S.bulkDone, { n: bulkTargets.length }));
    router.refresh();
  }

  const scopeOptions = (
    <>
      {groups.map((g) => (
        <option key={g.id} value={`group:${g.id}`}>
          {g.name}
        </option>
      ))}
      {categorySections.map((c) => (
        <option key={c.id} value={`category:${c.id}`}>
          {c.name}
        </option>
      ))}
    </>
  );

  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-8">
        <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-[#624f89]/60 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 left-1/3 h-64 w-64 rounded-full bg-[#c9a96e]/25 blur-3xl" />
        <div className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
                <Scissors className="h-4 w-4" />
                {S.eyebrow}
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight sm:text-4xl">{S.title}</h1>
              <p className="mt-3 text-sm leading-relaxed text-white/70">{S.sub}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {canEdit && (
                <button type="button" onClick={startCreate} className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
                  <Plus className="h-4 w-4" />
                  {S.add}
                </button>
              )}
              <Link href="/business/dashboard/services/addons" className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/20">
                <Sparkles className="h-4 w-4" />
                {S.addons}
              </Link>
              {canEdit && activeServices.length > 0 && (
                <button type="button" onClick={() => setBulk({ scope: "", percent: "10", round: true })} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/20">
                  <Percent className="h-4 w-4" />
                  {S.bulk}
                </button>
              )}
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {[
              { icon: Tag, label: S.statServices, value: String(activeServices.length) },
              { icon: Wallet, label: S.statAvgPrice, value: formatMoney(totals.avg, defaultCurrency, locale) },
              { icon: CalendarCheck, label: S.statBookings, value: totals.bookings.toLocaleString(locale) },
              { icon: TrendingUp, label: S.statRevenue, value: formatMoney(totals.revenue, defaultCurrency, locale) },
            ].map((x) => (
              <div key={x.label} className="rounded-2xl bg-white/[0.07] p-4 ring-1 ring-white/10">
                <x.icon className="h-4 w-4 text-[#e8d3a6]" />
                <p className="mt-3 truncate text-xl font-bold tabular-nums sm:text-2xl">{x.value}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">{x.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* minmax(0, …) on phones too: a long single-line name in the side
          panel would otherwise widen the whole column past the screen. */}
      <div className="grid grid-cols-[minmax(0,1fr)] gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0 space-y-5">
          {/* Toolbar */}
          {activeServices.length > 0 && (
            <div className="flex flex-col gap-2 rounded-3xl border border-ink-100 bg-white p-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
                <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.searchPh} className={`${FIELD} !py-2.5 pl-10`} />
              </div>
              <div className="grid grid-cols-3 gap-2 sm:flex">
                <select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)} className={`${FIELD} !py-2.5 sm:!w-40`}>
                  <option value="">{S.allGroups}</option>
                  {scopeOptions}
                </select>
                <select value={staffFilter} onChange={(e) => setStaffFilter(e.target.value)} className={`${FIELD} !py-2.5 sm:!w-40`}>
                  <option value="">{S.allStaff}</option>
                  {staffOptions.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
                <select value={sort} onChange={(e) => setSort(e.target.value as typeof sort)} className={`${FIELD} !py-2.5 sm:!w-40`}>
                  <option value="menu">{S.sortMenu}</option>
                  <option value="popular">{S.sortPopular}</option>
                  <option value="priceAsc">{S.sortPriceAsc}</option>
                  <option value="priceDesc">{S.sortPriceDesc}</option>
                </select>
              </div>
            </div>
          )}

          {canReorder && activeServices.length > 1 && (
            <p className="flex items-start gap-2 rounded-2xl bg-primary-100/40 px-4 py-3 text-xs font-medium text-primary-700 ring-1 ring-primary-100">
              <Move className="mt-0.5 h-4 w-4 shrink-0" />
              {filtering ? S.reorderOff : (REORDER_HINT[locale] ?? REORDER_HINT.en)}
            </p>
          )}

          {activeServices.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-ink-100 bg-white px-6 py-14 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
                <Scissors className="h-6 w-6" />
              </span>
              <p className="mt-4 text-base font-bold text-ink-900">{S.emptyTitle}</p>
              <p className="mx-auto mt-1 max-w-sm text-sm text-ink-400">{S.emptyText}</p>
              {canEdit && (
                <button type="button" onClick={startCreate} className={`mt-5 inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
                  <Plus className="h-4 w-4" />
                  {S.add}
                </button>
              )}
            </div>
          ) : filtering ? (
            filtered.length === 0 ? (
              <p className="rounded-3xl bg-white px-6 py-10 text-center text-sm text-ink-400 ring-1 ring-ink-100">{S.noResults}</p>
            ) : (
              <div className="space-y-2.5">{filtered.map((s) => renderServiceRow(s, null))}</div>
            )
          ) : (
            <>
              {groups.map((g) => {
                const items = activeServices.filter((s) => s.groupId === g.id);
                return (
                  <section key={g.id} className="space-y-2.5">
                    {sectionHead(g.name, items.length)}
                    {items.length === 0 ? <p className="text-xs text-ink-400">{tDash("servicesForm.groupEmpty")}</p> : sectionRows(items)}
                  </section>
                );
              })}
              {categorySections.map((sec) => (
                <section key={sec.id} className="space-y-2.5">
                  {sectionHead(sec.name, sec.items.length)}
                  {sectionRows(sec.items)}
                </section>
              ))}
              {ungroupedServices.length > 0 && (
                <section className="space-y-2.5">
                  {(groups.length > 0 || categorySections.length > 0) && sectionHead(tDash("servicesForm.ungrouped"), ungroupedServices.length)}
                  {sectionRows(ungroupedServices)}
                </section>
              )}
            </>
          )}

          {hiddenServices.length > 0 && (
            <section className="rounded-3xl border border-dashed border-ink-100 bg-mist-50/40 p-4 sm:p-5">
              <p className="flex items-center gap-2 text-sm font-bold text-ink-700">
                <EyeOff className="h-4 w-4 text-ink-400" />
                {S.hiddenTitle} <span className="text-xs font-semibold text-ink-400">({hiddenServices.length})</span>
              </p>
              <p className="mt-0.5 text-xs text-ink-400">{S.hiddenHint}</p>
              <ul className="mt-3 divide-y divide-ink-100">
                {hiddenServices.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-ink-400 line-through decoration-ink-200">{s.name}</span>
                      <span className="text-xs text-ink-400">
                        {s.durationMin} {tCommon("min")} · {formatMoney(s.priceCents, s.currency, locale)}
                      </span>
                    </span>
                    {canEdit && (
                      <button type="button" onClick={() => restoreService(s)} className="flex shrink-0 items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-100/40">
                        <ArchiveRestore className="h-3.5 w-3.5" />
                        {S.restore}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Side: best sellers + groups */}
        <aside className="min-w-0 space-y-4">
          <section className="rounded-3xl border border-ink-100 bg-white p-5">
            <p className="flex items-center gap-2 font-bold text-ink-900">
              <Crown className="h-4 w-4 text-[#c99a3f]" />
              {S.topTitle}
            </p>
            {ranked.length === 0 ? (
              <p className="mt-2 text-sm text-ink-400">{S.topEmpty}</p>
            ) : (
              <ol className="mt-3 space-y-2.5">
                {ranked.slice(0, 5).map((s, i) => (
                  <li key={s.id}>
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="flex min-w-0 items-center gap-2">
                        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${i === 0 ? "bg-[#e8d3a6] text-[#1f182d]" : "bg-mist-50 text-ink-400"}`}>{i + 1}</span>
                        <span className="truncate font-semibold text-ink-900">{s.name}</span>
                      </span>
                      <span className="shrink-0 text-xs font-bold text-primary-600">{stat(s.id).bookings}</span>
                    </div>
                    <div className="ml-8 mt-1 h-1.5 overflow-hidden rounded-full bg-ink-100">
                      <div className="h-full rounded-full bg-gradient-to-r from-[#624f89] to-[#c99a3f]" style={{ width: `${Math.max(6, (stat(s.id).bookings / stat(ranked[0].id).bookings) * 100)}%` }} />
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </section>

          <section className="rounded-3xl border border-ink-100 bg-white p-5">
            <p className="flex items-center gap-2 font-bold text-ink-900">
              <Layers className="h-4 w-4 text-primary-500" />
              {S.groupsTitle}
            </p>
            <p className="mt-0.5 text-xs text-ink-400">{S.groupsHint}</p>
            {groups.length > 0 && (
              <ul className="mt-3 divide-y divide-ink-100">
                {groups.map((g, index) => (
                  <li key={g.id} className="flex items-center gap-1 py-2">
                    <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink-900">{g.name}</span>
                    <span className="mr-1 text-[11px] text-ink-400">{activeServices.filter((s) => s.groupId === g.id).length}</span>
                    {canEdit && (
                      <>
                        <button onClick={() => moveGroup(g.id, "up")} disabled={index === 0} className="rounded-lg p-1.5 text-ink-400 hover:bg-mist-50 disabled:opacity-30" aria-label="Up">
                          <ChevronUp className="h-4 w-4" />
                        </button>
                        <button onClick={() => moveGroup(g.id, "down")} disabled={index === groups.length - 1} className="rounded-lg p-1.5 text-ink-400 hover:bg-mist-50 disabled:opacity-30" aria-label="Down">
                          <ChevronDown className="h-4 w-4" />
                        </button>
                        <button onClick={() => renameGroup(g.id, g.name)} className="rounded-lg p-1.5 text-ink-400 hover:bg-mist-50" aria-label={tCommon("edit")}>
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button onClick={() => removeGroup(g.id, g.name)} className="rounded-lg p-1.5 text-berry-500 hover:bg-berry-50" aria-label={tCommon("delete")}>
                          <X className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            )}
            {canEdit && (
              <form onSubmit={addGroup} className="mt-3 flex gap-2">
                <input className={`${FIELD} !py-2.5`} value={newGroupName} maxLength={100} onChange={(e) => setNewGroupName(e.target.value)} placeholder={tDash("servicesForm.newGroupPlaceholder")} />
                <button type="submit" disabled={groupBusy || !newGroupName.trim()} aria-label={tDash("servicesForm.addGroup")} title={tDash("servicesForm.addGroup")} className="flex shrink-0 items-center justify-center rounded-2xl bg-[#1f182d] px-3.5 text-white disabled:opacity-40">
                  {groupBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <FolderPlus className="h-4 w-4" />}
                </button>
              </form>
            )}
          </section>
        </aside>
      </div>

      {addOnsFor && (
        <ServiceAddOnsModal
          serviceId={addOnsFor.id}
          serviceName={addOnsFor.name}
          locale={locale}
          currency={defaultCurrency}
          onClose={() => {
            setAddOnsFor(null);
            router.refresh();
          }}
        />
      )}

      {mounted && drawer && createPortal(renderDrawer(), document.body)}
      {mounted && bulk && createPortal(renderBulk(), document.body)}

      {toast && (
        <div className="fixed inset-x-4 bottom-6 z-[90] mx-auto flex max-w-sm items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-3.5 text-sm font-semibold text-white shadow-2xl animate-slide-up">
          <Check className="h-4 w-4 text-[#e8d3a6]" />
          {toast}
        </div>
      )}
    </div>
  );

  // The add/edit form, as a panel sliding in from the right.
  function renderDrawer() {
    const label = "mb-1.5 block text-xs font-semibold text-ink-700";
    const sectionTitle = (icon: React.ReactNode, text: string) => (
      <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b08a3e]">
        {icon}
        {text}
      </p>
    );
    const priceCents = toSmallestUnit(Number(form.priceAmount) || 0, formCurrency);
    return (
      <div className="fixed inset-0 z-[80] flex justify-end bg-[#1f182d]/50 backdrop-blur-sm" onClick={() => setDrawer(false)}>
        <form onSubmit={saveService} onClick={(e) => e.stopPropagation()} className="flex h-full w-full max-w-xl flex-col bg-[#faf8fd] shadow-2xl animate-slide-up sm:animate-none">
          <div className="flex items-center justify-between gap-3 border-b border-ink-100 bg-white px-5 py-4 sm:px-6">
            <h3 className="text-lg font-bold text-ink-900">{editingId ? tDash("servicesForm.editService") : tDash("servicesForm.newService")}</h3>
            <button type="button" onClick={() => setDrawer(false)} aria-label={S.close} className="rounded-full p-2 text-ink-400 hover:bg-mist-50">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
            <section className="rounded-3xl bg-white p-5 ring-1 ring-ink-100">
              {sectionTitle(<Tag className="h-3.5 w-3.5" />, S.secBasic)}
              <div className="space-y-4">
                <div>
                  <label className={label}>{tDash("servicesForm.serviceName")}</label>
                  <input required minLength={2} maxLength={120} className={FIELD} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoFocus />
                </div>
                <div>
                  <label className={label}>{tDash("servicesForm.group")}</label>
                  <select
                    className={FIELD}
                    value={form.groupId ? `group:${form.groupId}` : form.categoryId ? `category:${form.categoryId}` : ""}
                    onChange={(e) => {
                      const [kind, id] = e.target.value.split(":");
                      setForm({ ...form, groupId: kind === "group" ? id : "", categoryId: kind === "category" ? id : "" });
                    }}
                  >
                    <option value="">{tDash("servicesForm.groupNone")}</option>
                    {groups.length > 0 && (
                      <optgroup label={tDash("servicesForm.groupCustom")}>
                        {groups.map((g) => (
                          <option key={g.id} value={`group:${g.id}`}>
                            {g.name}
                          </option>
                        ))}
                      </optgroup>
                    )}
                    <optgroup label={tDash("servicesForm.category")}>
                      {categories.map((c) => (
                        <option key={c.id} value={`category:${c.id}`}>
                          {c.name}
                        </option>
                      ))}
                    </optgroup>
                  </select>
                </div>
                <div>
                  <label className={label}>{tDash("servicesForm.description")}</label>
                  <p className="mb-1.5 text-[11px] text-ink-400">{tDash("servicesForm.descriptionHint")}</p>
                  <textarea rows={3} maxLength={2000} className={FIELD} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
              </div>
            </section>

            <section className="rounded-3xl bg-white p-5 ring-1 ring-ink-100">
              {sectionTitle(<Clock className="h-3.5 w-3.5" />, S.secTime)}
              <label className={label}>{tDash("servicesForm.durationMinutes")}</label>
              <div className="flex flex-wrap gap-1.5">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setForm({ ...form, durationMin: String(d) })}
                    className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 transition ${Number(form.durationMin) === d ? "bg-[#1f182d] text-white ring-[#1f182d]" : "text-ink-700 ring-ink-100 hover:bg-mist-50"}`}
                  >
                    {d}
                  </button>
                ))}
                <input required type="number" min={5} max={600} className={`${FIELD} !w-24 !py-1.5`} value={form.durationMin} onChange={(e) => setForm({ ...form, durationMin: e.target.value })} />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={label}>{tDash("servicesForm.bufferMinutes")}</label>
                  <input type="number" min={0} max={180} className={FIELD} value={form.bufferMin} onChange={(e) => setForm({ ...form, bufferMin: e.target.value })} />
                </div>
                <div>
                  <label className={label}>{tDash("servicesForm.currency")}</label>
                  <select className={FIELD} value={formCurrency} onChange={(e) => setFormCurrency(e.target.value)}>
                    <option value="VND">VND</option>
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                  </select>
                  {editingId && <p className="mt-1 text-[11px] text-ink-400">{tDash("servicesForm.currencyHint")}</p>}
                </div>
                <div>
                  <label className={label}>
                    {tDash("servicesForm.price")} ({formCurrency})
                  </label>
                  <input required type="number" min={0} step="0.01" placeholder="0" className={`${FIELD} text-base font-bold`} value={form.priceAmount} onChange={(e) => setForm({ ...form, priceAmount: e.target.value })} />
                </div>
                <div>
                  <label className={label}>
                    {tDash("servicesForm.deposit")} ({formCurrency}, {tDash("servicesForm.optional")})
                  </label>
                  <input type="number" min={0} step="0.01" placeholder="0" className={FIELD} value={form.depositAmount} onChange={(e) => setForm({ ...form, depositAmount: e.target.value })} />
                </div>
              </div>
              <div className="mt-4 rounded-2xl bg-gradient-to-r from-[#fffaf0] to-[#f8eedb] px-4 py-3 text-sm ring-1 ring-[#ecd9ad]">
                <p className="font-bold text-[#6b5221]">{fill(S.summary, { duration: Number(form.durationMin) || 0, price: formatMoney(priceCents, formCurrency, locale) })}</p>
                {Number(form.bufferMin) > 0 && <p className="mt-0.5 text-xs text-[#8a6a2b]">{fill(S.summaryBuffer, { n: Number(form.bufferMin) })}</p>}
              </div>
            </section>

            {staffOptions.length > 0 && (
              <section className="rounded-3xl bg-white p-5 ring-1 ring-ink-100">
                <div className="flex items-center justify-between gap-2">
                  {sectionTitle(<Users className="h-3.5 w-3.5" />, S.secStaff)}
                  <button
                    type="button"
                    onClick={() => staffOptions.forEach((s) => !form.staffIds.includes(s.id) && toggleStaff(s.id))}
                    className="mb-3 text-xs font-semibold text-primary-600 hover:underline"
                  >
                    {S.selectAll}
                  </button>
                </div>
                <p className="mb-2 text-xs text-ink-400">{tDash("servicesForm.staffCanDo")}</p>
                <div className="flex flex-wrap gap-2">
                  {staffOptions.map((s) => {
                    const on = form.staffIds.includes(s.id);
                    return (
                      <button
                        type="button"
                        key={s.id}
                        onClick={() => toggleStaff(s.id)}
                        className={`flex items-center gap-2 rounded-full py-1 pl-1 pr-3 text-xs font-semibold ring-1 transition ${on ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"}`}
                      >
                        {s.avatarUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={s.avatarUrl} alt="" className="h-6 w-6 rounded-full object-cover" />
                        ) : (
                          <span className={`flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold ${on ? "bg-white/20" : "bg-primary-100 text-primary-700"}`}>{s.name.trim()[0]?.toUpperCase()}</span>
                        )}
                        {s.name}
                        {on && <Check className="h-3.5 w-3.5 text-[#e8d3a6]" />}
                      </button>
                    );
                  })}
                </div>
                {form.staffIds.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-[11px] text-ink-400">{tDash("servicesForm.staffOverrideHint")}</p>
                    {form.staffIds.map((id) => {
                      const staffName = staffOptions.find((s) => s.id === id)?.name ?? id;
                      const override = form.staffOverrides[id] ?? { priceAmount: "", durationMin: "" };
                      return (
                        <div key={id} className="grid grid-cols-[1fr_auto_auto] items-center gap-2">
                          <span className="truncate text-sm font-semibold text-ink-900">{staffName}</span>
                          <input type="number" min={0} step="0.01" placeholder={tDash("servicesForm.ownPrice")} className={`${FIELD} !w-28 !px-3 !py-2 text-xs`} value={override.priceAmount} onChange={(e) => setStaffOverride(id, "priceAmount", e.target.value)} />
                          <input type="number" min={5} placeholder={tDash("servicesForm.ownMinutes")} className={`${FIELD} !w-28 !px-3 !py-2 text-xs`} value={override.durationMin} onChange={(e) => setStaffOverride(id, "durationMin", e.target.value)} />
                        </div>
                      );
                    })}
                  </div>
                )}
              </section>
            )}

            <section className="rounded-3xl bg-white p-5 ring-1 ring-ink-100">
              {sectionTitle(<Film className="h-3.5 w-3.5" />, S.secMedia)}
              <label className={label}>
                <WithVaraClipLinks text={tDash("servicesForm.videoLink")} /> ({tDash("servicesForm.optional")})
              </label>
              <p className="mb-1.5 text-[11px] text-ink-400">{tDash("servicesForm.videoLinkHint")}</p>
              <input type="url" placeholder="https://varaclip.com/v/..." className={FIELD} value={form.videoUrl} onChange={(e) => setForm({ ...form, videoUrl: e.target.value })} />
            </section>
          </div>

          <div className="border-t border-ink-100 bg-white px-5 py-4 sm:px-6">
            {formError && <p className="mb-2 text-sm text-berry-500">{S.error}</p>}
            <div className="flex gap-2">
              <button type="submit" disabled={saving} className={`flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:opacity-60 ${GOLD_BTN}`}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
                {tCommon("save")}
              </button>
              <button type="button" onClick={() => setDrawer(false)} className="rounded-full px-5 py-3 text-sm font-semibold text-ink-400 ring-1 ring-ink-100">
                {tCommon("cancel")}
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }

  // Raise or lower prices by a percentage, with a preview of every change.
  function renderBulk() {
    if (!bulk) return null;
    const unit = defaultCurrency === "VND" ? "1.000 ₫" : `1 ${defaultCurrency}`;
    return (
      <div className="fixed inset-0 z-[80] flex items-end justify-center bg-[#1f182d]/60 backdrop-blur-sm sm:items-center sm:p-6" onClick={() => setBulk(null)}>
        <div className="flex max-h-[92vh] w-full max-w-lg flex-col rounded-t-[2rem] bg-white shadow-2xl sm:rounded-[2rem]" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-start justify-between gap-3 px-6 pt-6">
            <h3 className="flex items-center gap-2 text-lg font-bold text-ink-900">
              <Percent className="h-5 w-5 text-[#b08a3e]" />
              {S.bulkTitle}
            </h3>
            <button type="button" onClick={() => setBulk(null)} aria-label={S.close} className="rounded-full p-1.5 text-ink-400 hover:bg-mist-50">
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="space-y-4 overflow-y-auto px-6 py-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.bulkScope}</span>
                <select value={bulk.scope} onChange={(e) => setBulk({ ...bulk, scope: e.target.value })} className={FIELD}>
                  <option value="">{S.bulkScopeAll}</option>
                  {scopeOptions}
                </select>
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-semibold text-ink-700">{S.bulkPercent}</span>
                <input inputMode="decimal" value={bulk.percent} onChange={(e) => setBulk({ ...bulk, percent: e.target.value })} className={`${FIELD} text-base font-bold`} />
              </label>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {[-20, -10, 5, 10, 15, 20].map((p) => (
                <button key={p} type="button" onClick={() => setBulk({ ...bulk, percent: String(p) })} className={`rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${bulkPct === p ? "bg-[#1f182d] text-white ring-[#1f182d]" : "text-ink-700 ring-ink-100 hover:bg-mist-50"}`}>
                  {p > 0 ? `+${p}` : p}%
                </button>
              ))}
            </div>
            <label className="flex items-center gap-2 text-sm text-ink-700">
              <input type="checkbox" checked={bulk.round} onChange={(e) => setBulk({ ...bulk, round: e.target.checked })} className="h-4 w-4 accent-primary-500" />
              {fill(S.bulkRound, { unit })}
            </label>
            <ul className="divide-y divide-ink-100 rounded-2xl bg-mist-50/50 px-4 ring-1 ring-ink-100">
              {bulkTargets.map((s) => {
                const next = adjustPrice(s.priceCents, s.currency, bulkPct, bulk.round);
                return (
                  <li key={s.id} className="flex items-center justify-between gap-3 py-2 text-sm">
                    <span className="min-w-0 truncate text-ink-900">{s.name}</span>
                    <span className="shrink-0 tabular-nums">
                      <span className="text-ink-400 line-through">{formatMoney(s.priceCents, s.currency, locale)}</span>
                      <span className={`ml-2 font-bold ${next > s.priceCents ? "text-emerald-700" : next < s.priceCents ? "text-berry-500" : "text-ink-900"}`}>{formatMoney(next, s.currency, locale)}</span>
                    </span>
                  </li>
                );
              })}
            </ul>
            <p className="text-[11px] text-ink-400">{S.bulkNote}</p>
          </div>
          <div className="border-t border-ink-100 px-6 py-4">
            <button type="button" onClick={applyBulk} disabled={saving || bulkTargets.length === 0 || bulkPct === 0} className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold disabled:opacity-50 ${GOLD_BTN}`}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {fill(S.bulkApply, { n: bulkTargets.length })}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
