"use client";

import { useEffect, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronUp, GripVertical, Plus, Trash2, FileText } from "lucide-react";
import { categoryName } from "@/lib/category-names";
import { PRESET_CATEGORIES } from "@/lib/price-list/fonts";
import { MAX_SERVICES, isRtl, newId, type PriceListCategory, type PriceListService } from "@/lib/price-list/types";
import type { PriceListUi } from "@/lib/price-list/i18n/types";

function useDndSensors() {
  return useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 6 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
}

function SortableItem({
  id,
  children,
  handleLabel,
}: {
  id: string;
  children: (handle: React.ReactNode) => React.ReactNode;
  handleLabel: string;
}) {
  const { attributes, listeners, setNodeRef, setActivatorNodeRef, transform, transition, isDragging } = useSortable({ id });
  const handle = (
    <button
      type="button"
      ref={setActivatorNodeRef}
      {...attributes}
      {...listeners}
      aria-label={handleLabel}
      title={handleLabel}
      className="flex h-9 w-7 shrink-0 cursor-grab touch-none items-center justify-center rounded-lg text-ink-400 hover:bg-mist-100 hover:text-ink-700 active:cursor-grabbing"
    >
      <GripVertical className="h-4 w-4" />
    </button>
  );
  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={isDragging ? "relative z-10 opacity-90 shadow-xl" : undefined}
    >
      {children(handle)}
    </div>
  );
}

const langBadge = (code: string) => (
  <span className="w-7 shrink-0 text-center text-[10px] font-bold uppercase tracking-wide text-ink-400">{code}</span>
);

function NameInputs({
  values,
  languages,
  placeholder,
  onChange,
  main = false,
}: {
  values: Record<string, string>;
  languages: string[];
  placeholder: string;
  onChange: (lang: string, v: string) => void;
  main?: boolean;
}) {
  return (
    <div className="min-w-0 flex-1 space-y-1.5">
      {languages.map((l, i) => (
        <div key={l} className="flex items-center gap-1.5">
          {languages.length > 1 && langBadge(l)}
          <input
            value={values[l] ?? ""}
            onChange={(e) => onChange(l, e.target.value)}
            placeholder={i === 0 ? placeholder : ""}
            dir={isRtl(l) ? "rtl" : "ltr"}
            lang={l}
            maxLength={200}
            className={`input !py-2 ${i === 0 ? (main ? "font-bold" : "font-semibold") : "!text-[13px] text-ink-700"}`}
          />
        </div>
      ))}
    </div>
  );
}

/** A number box that keeps what's typed ("25," / "25.5") while editing and
 * reports the parsed value; null when empty. */
function NumberField({
  value,
  onChange,
  integer = false,
  className,
  placeholder,
  label,
}: {
  value: number | null;
  onChange: (v: number | null) => void;
  integer?: boolean;
  className: string;
  placeholder: string;
  label: string;
}) {
  const [text, setText] = useState(value === null ? "" : String(value));
  useEffect(() => {
    const parsed = text.trim() === "" ? null : Number(text.replace(",", "."));
    if (parsed !== value) setText(value === null ? "" : String(value));
    // Only re-sync when the value changes from outside (import, draft load).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return (
    <input
      inputMode={integer ? "numeric" : "decimal"}
      value={text}
      aria-label={label}
      placeholder={placeholder}
      className={className}
      onChange={(e) => {
        const raw = integer ? e.target.value.replace(/\D/g, "") : e.target.value.replace(/[^\d.,]/g, "");
        setText(raw);
        if (raw.trim() === "") return onChange(null);
        const n = Number(raw.replace(",", "."));
        if (Number.isFinite(n)) onChange(integer ? Math.round(n) : n);
      }}
    />
  );
}

function ServiceRow({
  service,
  languages,
  ui,
  handle,
  onChange,
  onRemove,
  onMove,
  first,
  last,
}: {
  service: PriceListService;
  languages: string[];
  ui: PriceListUi;
  handle: React.ReactNode;
  onChange: (s: PriceListService) => void;
  onRemove: () => void;
  onMove: (dir: -1 | 1) => void;
  first: boolean;
  last: boolean;
}) {
  const [showDesc, setShowDesc] = useState(Object.values(service.descriptions).some(Boolean));
  return (
    <div className="rounded-2xl border border-ink-100 bg-white p-2.5 sm:p-3">
      <div className="flex items-start gap-1">
        <div className="flex flex-col items-center pt-0.5">
          {handle}
          <button type="button" onClick={() => onMove(-1)} disabled={first} aria-label={ui.moveUp} className="flex h-6 w-7 items-center justify-center rounded text-ink-400 hover:text-ink-700 disabled:opacity-25">
            <ChevronUp className="h-3.5 w-3.5" />
          </button>
          <button type="button" onClick={() => onMove(1)} disabled={last} aria-label={ui.moveDown} className="flex h-6 w-7 items-center justify-center rounded text-ink-400 hover:text-ink-700 disabled:opacity-25">
            <ChevronDown className="h-3.5 w-3.5" />
          </button>
        </div>
        <div className="min-w-0 flex-1">
          <NameInputs
            values={service.names}
            languages={languages}
            placeholder={ui.serviceName}
            onChange={(l, v) => onChange({ ...service, names: { ...service.names, [l]: v } })}
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <NumberField
              value={service.price}
              onChange={(v) => onChange({ ...service, price: v })}
              placeholder={ui.price}
              label={ui.price}
              className="input !w-24 !py-2 text-right font-semibold tabular-nums"
            />
            <label className="flex items-center gap-1.5">
              <NumberField
                integer
                value={service.durationMin}
                onChange={(v) => onChange({ ...service, durationMin: v })}
                placeholder="–"
                label={ui.duration}
                className="input !w-16 !py-2 text-right tabular-nums"
              />
              <span className="text-xs text-ink-400">{ui.duration}</span>
            </label>
            <label className="flex cursor-pointer items-center gap-1.5 text-xs text-ink-700">
              <input type="checkbox" checked={service.priceFrom} onChange={(e) => onChange({ ...service, priceFrom: e.target.checked })} className="h-4 w-4 accent-primary-600" />
              {ui.priceFrom}
            </label>
            {!showDesc && (
              <button type="button" onClick={() => setShowDesc(true)} className="inline-flex items-center gap-1 text-xs font-semibold text-primary-700 hover:underline">
                <FileText className="h-3.5 w-3.5" /> {ui.addDescription}
              </button>
            )}
          </div>
          {showDesc && (
            <div className="mt-2 space-y-1.5">
              {languages.map((l) => (
                <div key={l} className="flex items-start gap-1.5">
                  {languages.length > 1 && <div className="pt-2.5">{langBadge(l)}</div>}
                  <textarea
                    value={service.descriptions[l] ?? ""}
                    onChange={(e) => onChange({ ...service, descriptions: { ...service.descriptions, [l]: e.target.value } })}
                    placeholder={ui.description}
                    dir={isRtl(l) ? "rtl" : "ltr"}
                    lang={l}
                    rows={1}
                    maxLength={400}
                    className="input min-h-[38px] resize-y !py-2 !text-[13px]"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <button type="button" onClick={onRemove} aria-label={ui.remove} title={ui.remove} className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-400 hover:bg-berry-50 hover:text-berry-500">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function ServicesEditor({
  categories,
  languages,
  locale,
  ui,
  totalServices,
  onChange,
}: {
  categories: PriceListCategory[];
  languages: string[];
  locale: string;
  ui: PriceListUi;
  totalServices: number;
  onChange: (c: PriceListCategory[]) => void;
}) {
  const sensors = useDndSensors();
  const full = totalServices >= MAX_SERVICES;

  const updateCat = (id: string, fn: (c: PriceListCategory) => PriceListCategory) =>
    onChange(categories.map((c) => (c.id === id ? fn(c) : c)));

  const onCatDragEnd = (e: DragEndEvent) => {
    if (!e.over || e.active.id === e.over.id) return;
    const from = categories.findIndex((c) => c.id === e.active.id);
    const to = categories.findIndex((c) => c.id === e.over!.id);
    if (from >= 0 && to >= 0) onChange(arrayMove(categories, from, to));
  };

  const addCategory = (preset?: { nameEn: string; nameVi: string }) => {
    const names: Record<string, string> = {};
    if (preset) for (const l of languages) names[l] = categoryName(l, preset);
    const id = newId();
    onChange([...categories, { id, names, services: [] }]);
    requestAnimationFrame(() => document.getElementById(`pl-cat-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }));
  };

  const newService = (): PriceListService => ({ id: newId(), names: {}, descriptions: {}, price: null, priceFrom: false, durationMin: null });

  return (
    <div>
      {categories.length === 0 && (
        <p className="mb-4 rounded-2xl border border-dashed border-ink-100 px-4 py-6 text-center text-sm text-ink-400">{ui.emptyServices}</p>
      )}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={onCatDragEnd}>
        <SortableContext items={categories.map((c) => c.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-4">
            {categories.map((cat, ci) => (
              <SortableItem key={cat.id} id={cat.id} handleLabel={ui.dragHint}>
                {(handle) => (
                  <section id={`pl-cat-${cat.id}`} className="scroll-mt-24 rounded-[22px] border border-ink-100 bg-mist-50/70 p-3 sm:p-4">
                    <div className="flex items-start gap-1">
                      <div className="flex flex-col items-center pt-0.5">
                        {handle}
                        <button type="button" disabled={ci === 0} onClick={() => onChange(arrayMove(categories, ci, ci - 1))} aria-label={ui.moveUp} className="flex h-6 w-7 items-center justify-center rounded text-ink-400 hover:text-ink-700 disabled:opacity-25">
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                        <button type="button" disabled={ci === categories.length - 1} onClick={() => onChange(arrayMove(categories, ci, ci + 1))} aria-label={ui.moveDown} className="flex h-6 w-7 items-center justify-center rounded text-ink-400 hover:text-ink-700 disabled:opacity-25">
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <NameInputs
                        main
                        values={cat.names}
                        languages={languages}
                        placeholder={ui.categoryName}
                        onChange={(l, v) => updateCat(cat.id, (c) => ({ ...c, names: { ...c.names, [l]: v } }))}
                      />
                      <button
                        type="button"
                        onClick={() => onChange(categories.filter((c) => c.id !== cat.id))}
                        aria-label={ui.remove}
                        title={ui.remove}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-ink-400 hover:bg-berry-50 hover:text-berry-500"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragEnd={(e) => {
                        if (!e.over || e.active.id === e.over.id) return;
                        const from = cat.services.findIndex((s) => s.id === e.active.id);
                        const to = cat.services.findIndex((s) => s.id === e.over!.id);
                        if (from >= 0 && to >= 0) updateCat(cat.id, (c) => ({ ...c, services: arrayMove(c.services, from, to) }));
                      }}
                    >
                      <SortableContext items={cat.services.map((s) => s.id)} strategy={verticalListSortingStrategy}>
                        <div className="mt-3 space-y-2">
                          {cat.services.map((svc, si) => (
                            <SortableItem key={svc.id} id={svc.id} handleLabel={ui.dragHint}>
                              {(h) => (
                                <ServiceRow
                                  service={svc}
                                  languages={languages}
                                  ui={ui}
                                  handle={h}
                                  first={si === 0}
                                  last={si === cat.services.length - 1}
                                  onChange={(s) => updateCat(cat.id, (c) => ({ ...c, services: c.services.map((x) => (x.id === s.id ? s : x)) }))}
                                  onRemove={() => updateCat(cat.id, (c) => ({ ...c, services: c.services.filter((x) => x.id !== svc.id) }))}
                                  onMove={(dir) => updateCat(cat.id, (c) => ({ ...c, services: arrayMove(c.services, si, si + dir) }))}
                                />
                              )}
                            </SortableItem>
                          ))}
                        </div>
                      </SortableContext>
                    </DndContext>

                    <button
                      type="button"
                      disabled={full}
                      onClick={() => updateCat(cat.id, (c) => ({ ...c, services: [...c.services, newService()] }))}
                      className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-dashed border-primary-300 bg-white px-4 py-2 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 disabled:opacity-40"
                    >
                      <Plus className="h-4 w-4" /> {ui.addService}
                    </button>
                  </section>
                )}
              </SortableItem>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {full && <p className="mt-3 text-xs font-semibold text-berry-500">{ui.tooManyServices}</p>}

      <div className="mt-5">
        <p className="label">{ui.presetCategories}</p>
        <div className="flex flex-wrap gap-2">
          {PRESET_CATEGORIES.map((p) => (
            <button
              key={p.nameEn}
              type="button"
              onClick={() => addCategory(p)}
              className="inline-flex items-center gap-1 rounded-full border border-ink-100 bg-white px-3.5 py-1.5 text-sm font-medium text-ink-700 transition-colors hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
            >
              <Plus className="h-3.5 w-3.5" /> {categoryName(locale, p)}
            </button>
          ))}
          <button
            type="button"
            onClick={() => addCategory()}
            className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-ink-700"
          >
            <Plus className="h-3.5 w-3.5" /> {ui.customCategory}
          </button>
        </div>
      </div>
    </div>
  );
}
