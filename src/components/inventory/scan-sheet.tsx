"use client";

import { useRef, useState } from "react";
import { ArrowDownToLine, ArrowUpFromLine, Camera, Check, Loader2, MapPin, Plus, Search, Sparkles, X } from "lucide-react";
import { fill } from "@/lib/shop-strings";
import type { InventoryStrings } from "@/lib/inventory-strings";
import type { InventoryData, InventoryItemRow } from "@/lib/inventory-data";
import { CameraScanner, shrinkPhoto } from "@/components/inventory/camera-scanner";
import { INPUT, ItemForm, ItemThumb, Stepper, emptyFields, fieldsPayload, photoUrl, type ItemFields } from "@/components/inventory/parts";

type Mode = "IN" | "OUT";
type Stage =
  | { kind: "scan" }
  | { kind: "busy"; text: string }
  | { kind: "item"; itemId: string }
  | { kind: "pick"; fields: ItemFields; matches: string[] }
  | { kind: "new"; fields: ItemFields; note: string | null };

const post = (url: string, body: unknown) =>
  fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) })
    .then(async (r) => ({ ok: r.ok, status: r.status, d: await r.json().catch(() => ({})) }))
    .catch(() => ({ ok: false, status: 0, d: {} as Record<string, unknown> }));

/** Full-screen scanning: scan in or out one item after another. A scanned
 * cupboard label sets where items go (scanning in); an unknown code or a
 * photo leads to adding the item, with AI filling in what it reads. */
export function ScanSheet({
  S,
  initialMode,
  data,
  reload,
  onClose,
}: {
  S: InventoryStrings;
  initialMode: Mode;
  data: InventoryData;
  reload: () => Promise<InventoryData | null>;
  onClose: () => void;
}) {
  const [mode, setMode] = useState<Mode>(initialMode);
  const [stage, setStage] = useState<Stage>({ kind: "scan" });
  const [place, setPlace] = useState<{ id: string; name: string } | null>(null);
  const [qty, setQty] = useState(1);
  const [locationId, setLocationId] = useState<string | null>(null);
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [flash, setFlash] = useState<{ ok: boolean; text: string } | null>(null);
  const [items, setItems] = useState(data.items);
  const photoRef = useRef<HTMLInputElement>(null);

  const itemById = (id: string) => items.find((i) => i.id === id);
  const unit = (it: InventoryItemRow) => S.units[it.unit] ?? it.unit;

  async function refresh() {
    const d = await reload();
    if (d) setItems(d.items);
    return d;
  }

  function openItem(it: InventoryItemRow) {
    setQty(1);
    setLocationId(place?.id ?? it.locationId);
    setStage({ kind: "item", itemId: it.id });
  }

  async function lookup(raw: string) {
    if (stage.kind !== "scan" || busy) return;
    setFlash(null);
    setBusy(true);
    const r = await post("/api/business/inventory/scan", { code: raw });
    setBusy(false);
    if (!r.ok) return setFlash({ ok: false, text: S.errGeneric });
    if (r.d.type === "location") {
      const loc = r.d.location as { id: string; name: string };
      setPlace(loc);
      setMode("IN");
      setFlash({ ok: true, text: fill(S.placeSet, { name: loc.name }) });
      return;
    }
    if (r.d.type === "item") {
      let it = itemById(String(r.d.itemId));
      if (!it) it = (await refresh())?.items.find((i) => i.id === r.d.itemId);
      if (it) openItem(it);
      return;
    }
    setStage({ kind: "new", fields: emptyFields(typeof r.d.barcode === "string" ? r.d.barcode : ""), note: S.newItemSub });
  }

  async function fromPhoto(file: File) {
    setFlash(null);
    setStage({ kind: "busy", text: S.recognizing });
    const [big, small] = await Promise.all([shrinkPhoto(file, 1280), shrinkPhoto(file, 480, 0.8)]);
    const r = await post("/api/business/inventory/recognize", { image: big });
    const f = r.d.fields as Omit<ItemFields, "minQty" | "note" | "photo"> | null | undefined;
    if (!r.ok || !f) {
      setStage({ kind: "new", fields: { ...emptyFields(), photo: small }, note: S.aiFailed });
      return;
    }
    const fields: ItemFields = { ...emptyFields(f.barcode), ...f, photo: small };
    const matches = (r.d.matches as string[]) ?? [];
    setStage(matches.length ? { kind: "pick", fields, matches } : { kind: "new", fields, note: S.aiFilled });
  }

  async function move(it: InventoryItemRow) {
    setBusy(true);
    const r = await post("/api/business/inventory/move", {
      itemId: it.id,
      kind: mode,
      qty,
      ...(mode === "IN" ? { locationId: locationId ?? undefined } : {}),
    });
    setBusy(false);
    if (!r.ok) {
      setFlash({ ok: false, text: r.d.error === "NOT_ENOUGH" ? fill(S.notEnough, { n: Number(r.d.qty ?? 0) }) : S.errGeneric });
      return;
    }
    const left = Number(r.d.qty);
    setItems((list) => list.map((x) => (x.id === it.id ? { ...x, qty: left, locationId: mode === "IN" ? (locationId ?? x.locationId) : x.locationId } : x)));
    setFlash({ ok: true, text: fill(mode === "IN" ? S.doneIn : S.doneOut, { n: qty, item: it.name, left: `${left} ${unit(it)}` }) });
    setStage({ kind: "scan" });
    void reload();
  }

  async function createItem(fields: ItemFields) {
    setBusy(true);
    const r = await post("/api/business/inventory/items", {
      ...fieldsPayload(fields),
      ...(mode === "IN" ? { qtyIn: qty, locationId: locationId ?? place?.id ?? undefined } : {}),
    });
    setBusy(false);
    if (!r.ok) return setFlash({ ok: false, text: r.d.error === "BARCODE_TAKEN" ? S.errBarcodeTaken : S.errGeneric });
    const d = await refresh();
    const it = d?.items.find((i) => i.id === r.d.id);
    if (mode === "IN" && it) {
      setFlash({ ok: true, text: fill(S.doneIn, { n: qty, item: it.name, left: `${it.qty} ${unit(it)}` }) });
      setStage({ kind: "scan" });
    } else if (it) openItem(it);
    else setStage({ kind: "scan" });
  }

  const current = stage.kind === "item" ? itemById(stage.itemId) : undefined;
  const accent = mode === "IN" ? "from-emerald-500 to-teal-600" : "from-[#e0559b] to-[#a3155f]";

  return (
    <div className="fixed inset-0 z-[85] flex flex-col bg-[#f7f5fb]" role="dialog" aria-modal="true">
      {/* Mode and close */}
      <div className="flex items-center gap-2 bg-white px-4 py-3 shadow-sm">
        <div className="grid flex-1 grid-cols-2 gap-1 rounded-full bg-mist-50 p-1 ring-1 ring-ink-100">
          {(["IN", "OUT"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              className={`flex items-center justify-center gap-1.5 rounded-full py-2 text-sm font-bold transition ${
                mode === m ? `bg-gradient-to-r text-white shadow ${m === "IN" ? "from-emerald-500 to-teal-600" : "from-[#e0559b] to-[#a3155f]"}` : "text-ink-500"
              }`}
            >
              {m === "IN" ? <ArrowDownToLine className="h-4 w-4" /> : <ArrowUpFromLine className="h-4 w-4" />}
              {m === "IN" ? S.scannerIn : S.scannerOut}
            </button>
          ))}
        </div>
        <button type="button" onClick={onClose} aria-label={S.close} className="flex h-10 w-10 items-center justify-center rounded-full bg-mist-50 text-ink-500 ring-1 ring-ink-100">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-lg flex-1 overflow-y-auto p-4">
        {mode === "IN" && place && (
          <div className="mb-3 flex items-center justify-between gap-2 rounded-2xl bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-800 ring-1 ring-emerald-200">
            <span className="flex min-w-0 items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="truncate">{fill(S.placeSet, { name: place.name })}</span>
            </span>
            <button type="button" onClick={() => setPlace(null)} className="shrink-0 text-xs font-bold underline">
              {S.clearPlace}
            </button>
          </div>
        )}

        <CameraScanner onCode={lookup} paused={stage.kind !== "scan" || busy} hint={S.pointCamera} offText={S.cameraOff} />

        {flash && (
          <p className={`mt-3 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${flash.ok ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"}`}>
            {flash.ok && <Check className="mt-0.5 h-4 w-4 shrink-0" />}
            {flash.text}
          </p>
        )}

        {stage.kind === "scan" && (
          <div className="mt-4 space-y-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (code.trim()) void lookup(code.trim()).then(() => setCode(""));
              }}
              className="flex gap-2"
            >
              <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={S.typeCode} inputMode="numeric" className={`${INPUT} flex-1 font-mono`} />
              <button type="submit" disabled={busy} className="flex shrink-0 items-center gap-1.5 rounded-2xl bg-[#1f182d] px-4 text-sm font-bold text-white">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                {S.find}
              </button>
            </form>
            <button
              type="button"
              onClick={() => photoRef.current?.click()}
              className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-white text-sm font-bold text-[#4b3878] ring-1 ring-[#e4dcef]"
            >
              <Sparkles className="h-4 w-4 text-[#c99a3f]" />
              <Camera className="h-4 w-4" />
              {S.takePhoto}
            </button>
            <input
              ref={photoRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                e.target.value = "";
                if (f) void fromPhoto(f);
              }}
            />
          </div>
        )}

        {stage.kind === "busy" && (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-white p-6 text-sm font-semibold text-[#4b3878] ring-1 ring-ink-100">
            <Loader2 className="h-5 w-5 animate-spin" />
            {stage.text}
          </div>
        )}

        {stage.kind === "item" && current && (
          <div className="mt-4 rounded-3xl bg-white p-4 shadow-[0_18px_40px_-30px_rgba(31,24,45,0.6)] ring-1 ring-ink-100">
            <div className="flex items-center gap-3">
              <ItemThumb src={photoUrl(current)} size="h-16 w-16" />
              <div className="min-w-0">
                <p className="truncate text-base font-bold text-ink-900">{current.name}</p>
                {current.brand && <p className="truncate text-xs text-ink-400">{current.brand}</p>}
                <p className="mt-1 text-sm font-semibold text-ink-700">{fill(S.inStock, { n: `${current.qty} ${unit(current)}` })}</p>
              </div>
            </div>
            <p className="mt-4 text-xs font-bold text-ink-700">{S.qty}</p>
            <div className="mt-1.5">
              <Stepper value={qty} onChange={setQty} />
            </div>
            {mode === "IN" && data.locations.length > 0 && (
              <label className="mt-3 block text-xs font-bold text-ink-700">
                {S.where}
                <select value={locationId ?? ""} onChange={(e) => setLocationId(e.target.value || null)} className={`${INPUT} mt-1`}>
                  <option value="">{S.noPlace}</option>
                  {data.locations.map((l) => (
                    <option key={l.id} value={l.id}>
                      {l.name}
                    </option>
                  ))}
                </select>
              </label>
            )}
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setStage({ kind: "scan" })} className="h-12 flex-1 rounded-2xl bg-mist-50 text-sm font-bold text-ink-700 ring-1 ring-ink-100">
                {S.cancel}
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => move(current)}
                className={`flex h-12 flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r text-base font-bold text-white shadow disabled:opacity-60 ${accent}`}
              >
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "IN" ? <ArrowDownToLine className="h-4 w-4" /> : <ArrowUpFromLine className="h-4 w-4" />}
                {fill(mode === "IN" ? S.confirmIn : S.confirmOut, { n: qty })}
              </button>
            </div>
          </div>
        )}

        {stage.kind === "pick" && (
          <div className="mt-4 rounded-3xl bg-white p-4 ring-1 ring-ink-100">
            <p className="text-sm font-bold text-ink-900">{S.maybeIs}</p>
            <ul className="mt-2 space-y-2">
              {stage.matches.map((id) => {
                const it = itemById(id);
                return it ? (
                  <li key={id}>
                    <button type="button" onClick={() => openItem(it)} className="flex w-full items-center gap-3 rounded-2xl p-2 text-left ring-1 ring-ink-100 hover:bg-mist-50">
                      <ItemThumb src={photoUrl(it)} />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-bold text-ink-900">{it.name}</span>
                        <span className="block text-xs text-ink-400">{fill(S.inStock, { n: `${it.qty} ${unit(it)}` })}</span>
                      </span>
                    </button>
                  </li>
                ) : null;
              })}
            </ul>
            <button
              type="button"
              onClick={() => setStage({ kind: "new", fields: stage.fields, note: S.aiFilled })}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-2xl py-3 text-sm font-bold text-[#4b3878] ring-1 ring-[#e4dcef]"
            >
              <Plus className="h-4 w-4" />
              {S.notThese}
            </button>
          </div>
        )}

        {stage.kind === "new" && (
          <div className="mt-4 rounded-3xl bg-white p-4 ring-1 ring-ink-100">
            <p className="text-base font-bold text-ink-900">{S.newItem}</p>
            {stage.note && (
              <p className={`mt-1 flex items-center gap-1.5 text-xs ${stage.note === S.aiFilled ? "font-semibold text-[#8a6a2b]" : "text-ink-500"}`}>
                {stage.note === S.aiFilled && <Sparkles className="h-3.5 w-3.5" />}
                {stage.note}
              </p>
            )}
            <div className="mt-3">
              <ItemForm S={S} value={stage.fields} onChange={(fields) => setStage({ ...stage, fields })} />
            </div>
            {mode === "IN" && (
              <div className="mt-4">
                <p className="text-xs font-bold text-ink-700">{S.qty}</p>
                <div className="mt-1.5">
                  <Stepper value={qty} onChange={setQty} />
                </div>
              </div>
            )}
            <div className="mt-4 flex gap-2">
              <button type="button" onClick={() => setStage({ kind: "scan" })} className="h-12 flex-1 rounded-2xl bg-mist-50 text-sm font-bold text-ink-700 ring-1 ring-ink-100">
                {S.cancel}
              </button>
              <button
                type="button"
                disabled={busy || !stage.fields.name.trim()}
                onClick={() => createItem(stage.fields)}
                className={`flex h-12 flex-[2] items-center justify-center gap-2 rounded-2xl bg-gradient-to-r text-sm font-bold text-white shadow disabled:opacity-50 ${accent}`}
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "IN" ? S.saveAndIn : S.save}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
