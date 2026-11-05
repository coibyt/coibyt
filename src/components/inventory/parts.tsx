"use client";

import { useRef } from "react";
import { Camera, ImageIcon, Package } from "lucide-react";
import type { InventoryStrings } from "@/lib/inventory-strings";
import type { InventoryItemRow } from "@/lib/inventory-data";
import { shrinkPhoto } from "@/components/inventory/camera-scanner";
import { fromSmallestUnit, toSmallestUnit } from "@/lib/money";

export const CATEGORIES = ["gel", "polish", "liquid", "tool", "care", "lash", "hair", "other"] as const;
export const UNITS = ["pcs", "bottle", "box", "pack", "tube", "jar"] as const;

export interface ItemFields {
  name: string;
  brand: string;
  category: string | null;
  unit: string;
  barcode: string;
  color: string;
  minQty: number;
  costCents: number | null;
  note: string;
  /** A new photo (data URL), or the item's current photo URL to keep it. */
  photo: string | null;
}

export const emptyFields = (barcode = ""): ItemFields => ({ name: "", brand: "", category: null, unit: "pcs", barcode, color: "", minQty: 2, costCents: null, note: "", photo: null });

export const photoUrl = (it: Pick<InventoryItemRow, "id" | "photoVer">) => (it.photoVer ? `/api/business/inventory/items/${it.id}/photo?v=${it.photoVer}` : null);

export type StockStatus = "ok" | "low" | "out";
export function statusOf(it: { qty: number; min: number }): StockStatus {
  if (it.qty <= 0) return "out";
  return it.min > 0 && it.qty <= it.min ? "low" : "ok";
}
export const STATUS_STYLE: Record<StockStatus, string> = {
  ok: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  low: "bg-amber-50 text-amber-700 ring-amber-200",
  out: "bg-rose-50 text-rose-600 ring-rose-200",
};

export const INPUT =
  "h-11 w-full rounded-2xl border border-ink-100 bg-white px-4 text-sm text-ink-900 transition placeholder:text-ink-300 focus:border-[#624f89] focus:outline-none focus:ring-4 focus:ring-[#624f89]/10";

export function ItemThumb({ src, size = "h-12 w-12" }: { src: string | null; size?: string }) {
  return src ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" className={`${size} shrink-0 rounded-2xl bg-mist-50 object-cover ring-1 ring-ink-100`} />
  ) : (
    <span className={`${size} flex shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#f3eefb] to-[#fbf3e1] text-[#8b6fc0] ring-1 ring-ink-100`}>
      <Package className="h-5 w-5" />
    </span>
  );
}

/** The fields of an item, for adding one and for editing it. */
export function ItemForm({ S, value, onChange, currency }: { S: InventoryStrings; value: ItemFields; onChange: (v: ItemFields) => void; currency: string }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const set = <K extends keyof ItemFields>(k: K, v: ItemFields[K]) => onChange({ ...value, [k]: v });
  const label = "block text-xs font-bold text-ink-700";

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <ItemThumb src={value.photo} size="h-16 w-16" />
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50"
        >
          {value.photo ? <ImageIcon className="h-3.5 w-3.5" /> : <Camera className="h-3.5 w-3.5" />}
          {value.photo ? S.changePhoto : S.photo}
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          capture="environment"
          className="hidden"
          onChange={async (e) => {
            const f = e.target.files?.[0];
            e.target.value = "";
            if (f) set("photo", await shrinkPhoto(f, 480, 0.8));
          }}
        />
      </div>
      <label className={label}>
        {S.name}
        <input value={value.name} onChange={(e) => set("name", e.target.value)} maxLength={160} className={`${INPUT} mt-1`} />
      </label>
      <label className={label}>
        {S.color}
        <input value={value.color} onChange={(e) => set("color", e.target.value)} placeholder={S.colorPh} maxLength={60} className={`${INPUT} mt-1`} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className={label}>
          {S.brand}
          <input value={value.brand} onChange={(e) => set("brand", e.target.value)} maxLength={80} className={`${INPUT} mt-1`} />
        </label>
        <label className={label}>
          {S.category}
          <select value={value.category ?? ""} onChange={(e) => set("category", e.target.value || null)} className={`${INPUT} mt-1`}>
            <option value="">—</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {S.categories[c]}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          {S.unit}
          <select value={value.unit} onChange={(e) => set("unit", e.target.value)} className={`${INPUT} mt-1`}>
            {UNITS.map((u) => (
              <option key={u} value={u}>
                {S.units[u]}
              </option>
            ))}
          </select>
        </label>
        <label className={label}>
          {S.minQty}
          <input
            type="number"
            min={0}
            inputMode="numeric"
            value={value.minQty}
            onChange={(e) => set("minQty", Math.max(0, Math.floor(Number(e.target.value) || 0)))}
            className={`${INPUT} mt-1`}
          />
        </label>
      </div>
      <p className="-mt-1 text-[11px] text-ink-400">{S.minQtyHint}</p>
      <label className={label}>
        {S.cost} ({currency})
        <input
          type="number"
          min={0}
          step="any"
          inputMode="decimal"
          value={value.costCents == null ? "" : fromSmallestUnit(value.costCents, currency)}
          onChange={(e) => set("costCents", e.target.value === "" ? null : Math.max(0, toSmallestUnit(Number(e.target.value) || 0, currency)))}
          className={`${INPUT} mt-1`}
        />
      </label>
      <label className={label}>
        {S.barcode}
        <input value={value.barcode} onChange={(e) => set("barcode", e.target.value)} placeholder={S.barcodeNone} maxLength={64} className={`${INPUT} mt-1 font-mono`} />
      </label>
      <label className={label}>
        {S.note}
        <input value={value.note} onChange={(e) => set("note", e.target.value)} maxLength={500} className={`${INPUT} mt-1`} />
      </label>
    </div>
  );
}

/** The body the item API takes: a new photo as data, an unchanged one left out. */
export function fieldsPayload(v: ItemFields) {
  const { photo, ...rest } = v;
  return { ...rest, ...(photo?.startsWith("data:") ? { photo } : {}) };
}

export function Stepper({ value, onChange, min = 1 }: { value: number; onChange: (v: number) => void; min?: number }) {
  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={() => onChange(Math.max(min, value - 1))} className="h-12 w-12 rounded-2xl bg-mist-50 text-xl font-bold text-ink-700 ring-1 ring-ink-100">
        −
      </button>
      <input
        type="number"
        inputMode="numeric"
        min={min}
        value={value}
        onChange={(e) => onChange(Math.max(min, Math.floor(Number(e.target.value) || min)))}
        className="h-12 w-20 rounded-2xl border border-ink-100 text-center text-xl font-extrabold tabular-nums text-ink-900 focus:outline-none"
      />
      <button type="button" onClick={() => onChange(value + 1)} className="h-12 w-12 rounded-2xl bg-mist-50 text-xl font-bold text-ink-700 ring-1 ring-ink-100">
        +
      </button>
    </div>
  );
}

/** "GelColor 15 ml · Big Apple Red" */
export const fullName = (it: { name: string; color?: string | null }) => (it.color ? `${it.name} · ${it.color}` : it.name);
