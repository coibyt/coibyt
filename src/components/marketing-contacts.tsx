"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  BookUser,
  Check,
  ChevronLeft,
  ChevronRight,
  Download,
  FileSpreadsheet,
  Loader2,
  Mail,
  Plus,
  Search,
  Send,
  Trash2,
  Upload,
  UserX,
  X,
} from "lucide-react";
import { fill } from "@/lib/shop-strings";
import { marketingStudioStrings } from "@/lib/marketing-studio-strings";
import { guessColumns, isEmail, readSpreadsheet, type ContactField } from "@/lib/spreadsheet";

interface Contact {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  note: string | null;
  optedOut: boolean;
  createdAt: string;
}

const GOLD_BTN =
  "bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] hover:brightness-105";
const INPUT =
  "w-full rounded-2xl border border-ink-100 bg-mist-50/40 px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-ink-300 focus:border-primary-400 focus:bg-white focus:ring-4 focus:ring-primary-100";
const CHUNK = 5000;

/** The salon's own customer list: import from Excel/CSV, add by hand,
 * search, remove, download — the "Contacts" tab of the marketing studio. */
export function MarketingContacts({
  locale,
  isOwner,
  onChanged,
  onCompose,
}: {
  locale: string;
  isOwner: boolean;
  onChanged: () => void;
  onCompose: () => void;
}) {
  const S = marketingStudioStrings(locale);
  const [data, setData] = useState<{ contacts: Contact[]; total: number; all: number; optedOut: number; pageSize: number } | null>(null);
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [mode, setMode] = useState<"none" | "import" | "add">("none");
  const [flash, setFlash] = useState<{ ok: boolean; text: string } | null>(null);

  // Import wizard
  const [rows, setRows] = useState<string[][] | null>(null);
  const [fileName, setFileName] = useState("");
  const [hasHeader, setHasHeader] = useState(true);
  const [map, setMap] = useState<Record<ContactField, number>>({ email: -1, name: -1, surname: -1, phone: -1, note: -1 });
  const [readError, setReadError] = useState<string | null>(null);
  const [consent, setConsent] = useState(false);
  const [importing, setImporting] = useState(false);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Add one
  const [one, setOne] = useState({ email: "", name: "", phone: "", note: "" });
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch(`/api/business/marketing/contacts?page=${page}&q=${encodeURIComponent(q)}`);
    if (res.ok) setData(await res.json());
  }, [page, q]);

  useEffect(() => {
    const t = setTimeout(load, q ? 300 : 0);
    return () => clearTimeout(t);
  }, [load, q]);

  async function openFile(file: File) {
    setReadError(null);
    setConsent(false);
    try {
      const r = await readSpreadsheet(file);
      const g = guessColumns(r);
      setRows(r);
      setFileName(file.name);
      setHasHeader(g.hasHeader);
      setMap(g.map);
      if (g.map.email < 0) setReadError(S.noEmailColumn);
    } catch (err) {
      setRows(null);
      setReadError(err instanceof Error && err.message === "XLS_UNSUPPORTED" ? S.xlsError : S.readError);
    }
  }

  const width = rows ? Math.max(0, ...rows.map((r) => r.length)) : 0;
  const header = rows && hasHeader ? rows[0] : null;
  const colName = (i: number) => {
    const letter = i < 26 ? String.fromCharCode(65 + i) : `${i + 1}`;
    return header?.[i] ? `${letter} · ${header[i]}` : fill(S.column, { n: letter });
  };

  const mapped = useMemo(() => {
    if (!rows) return { list: [], valid: 0, invalid: 0, dup: 0 };
    const at = (r: string[], i: number) => (i >= 0 ? (r[i] ?? "").trim() : "");
    const seen = new Set<string>();
    let invalid = 0;
    let dup = 0;
    const list = (hasHeader ? rows.slice(1) : rows).map((r) => {
      const email = at(r, map.email).toLowerCase();
      const name = [at(r, map.surname), at(r, map.name)].filter(Boolean).join(" ");
      const c = { email, name, phone: at(r, map.phone), note: at(r, map.note), ok: isEmail(email), dup: false };
      if (!c.ok) invalid++;
      else if (seen.has(email)) {
        c.dup = true;
        dup++;
      } else seen.add(email);
      return c;
    });
    return { list, valid: seen.size, invalid, dup };
  }, [rows, hasHeader, map]);

  async function runImport() {
    setImporting(true);
    setFlash(null);
    const good = mapped.list.filter((c) => c.ok && !c.dup).map((c) => ({ email: c.email, name: c.name, phone: c.phone, note: c.note.slice(0, 500) }));
    let added = 0;
    let updated = 0;
    let failed = false;
    for (let i = 0; i < good.length; i += CHUNK) {
      const res = await fetch("/api/business/marketing/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consent: true, contacts: good.slice(i, i + CHUNK) }),
      }).catch(() => null);
      if (!res?.ok) {
        failed = true;
        break;
      }
      const d = await res.json();
      added += d.added;
      updated += d.updated;
    }
    setImporting(false);
    if (failed) return setFlash({ ok: false, text: S.errGeneric });
    const skipped = mapped.invalid + mapped.dup;
    setFlash({ ok: true, text: `${fill(S.importDone, { added, updated })}${skipped ? ` ${fill(S.importSkipped, { n: skipped })}` : ""}` });
    setRows(null);
    setMode("none");
    setPage(0);
    load();
    onChanged();
  }

  async function addOne() {
    if (!isEmail(one.email)) return setFlash({ ok: false, text: S.invalidEmail });
    setSaving(true);
    const res = await fetch("/api/business/marketing/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ consent: true, contacts: [one] }),
    }).catch(() => null);
    setSaving(false);
    if (!res?.ok) return setFlash({ ok: false, text: S.errGeneric });
    setFlash({ ok: true, text: fill(S.addedOne, { email: one.email.trim().toLowerCase() }) });
    setOne({ email: "", name: "", phone: "", note: "" });
    setMode("none");
    load();
    onChanged();
  }

  async function remove(c: Contact) {
    if (!confirm(fill(S.deleteConfirm, { email: c.email }))) return;
    const res = await fetch(`/api/business/marketing/contacts/${c.id}`, { method: "DELETE" });
    if (res.ok) {
      load();
      onChanged();
    }
  }

  async function removeAll() {
    if (!data || !confirm(fill(S.deleteAllConfirm, { n: data.all }))) return;
    const res = await fetch("/api/business/marketing/contacts?all=1", { method: "DELETE" });
    if (res.ok) {
      setPage(0);
      load();
      onChanged();
    }
  }

  function downloadTemplate() {
    const blob = new Blob([`﻿${S.templateCsv}`], { type: "text/csv;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = locale === "vi" ? "mau-danh-ba-khach.csv" : "contacts-template.csv";
    a.click();
    URL.revokeObjectURL(a.href);
  }

  const fields: [ContactField, string][] = [
    ["email", S.fieldEmail],
    ["name", S.fieldName],
    ["surname", S.fieldSurname],
    ["phone", S.fieldPhone],
    ["note", S.fieldNote],
  ];
  const from = data ? data.total === 0 ? 0 : page * data.pageSize + 1 : 0;
  const to = data ? Math.min(data.total, (page + 1) * data.pageSize) : 0;

  return (
    <div className="space-y-5">
      {/* Header */}
      <section className="rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)] sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex min-w-0 items-start gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1f182d] to-[#624f89] text-[#e8d3a6]">
              <BookUser className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <h2 className="text-lg font-bold text-ink-900">{S.contactsTitle}</h2>
              <p className="mt-0.5 max-w-xl text-sm text-ink-400">{S.contactsSub}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="rounded-2xl bg-mist-50/70 px-4 py-2.5 text-center ring-1 ring-ink-100">
              <p className="text-xl font-bold tabular-nums text-ink-900">{data?.all ?? "…"}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{S.statContacts}</p>
            </div>
            <div className="rounded-2xl bg-mist-50/70 px-4 py-2.5 text-center ring-1 ring-ink-100">
              <p className="text-xl font-bold tabular-nums text-ink-900">{data?.optedOut ?? "…"}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{S.statUnsub}</p>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {isOwner && (
            <button type="button" onClick={() => setMode(mode === "import" ? "none" : "import")} className={`flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${GOLD_BTN}`}>
              <FileSpreadsheet className="h-4 w-4" />
              {S.importBtn}
            </button>
          )}
          {isOwner && (
            <button type="button" onClick={() => setMode(mode === "add" ? "none" : "add")} className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50">
              <Plus className="h-4 w-4" />
              {S.addOne}
            </button>
          )}
          <button type="button" onClick={downloadTemplate} className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50">
            <Download className="h-4 w-4" />
            {S.templateBtn}
          </button>
          {!!data?.all && (
            <button
              type="button"
              onClick={() => window.location.assign("/api/business/marketing/contacts?format=csv")}
              className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50"
            >
              <Download className="h-4 w-4" />
              {S.exportBtn}
            </button>
          )}
          {!!data && data.all - data.optedOut > 0 && (
            <button type="button" onClick={onCompose} className="flex items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-primary-700 ring-1 ring-primary-200 hover:bg-primary-100/50">
              <Send className="h-4 w-4" />
              {S.sendToContacts}
            </button>
          )}
        </div>
      </section>

      {flash && (
        <div className={`flex items-start gap-2 rounded-2xl px-4 py-3 text-sm font-medium ${flash.ok ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" : "bg-berry-50 text-berry-500 ring-1 ring-berry-100"}`}>
          {flash.ok ? <Check className="mt-0.5 h-4 w-4 shrink-0" /> : <X className="mt-0.5 h-4 w-4 shrink-0" />}
          <span className="flex-1">{flash.text}</span>
          <button type="button" onClick={() => setFlash(null)} aria-label={S.close}>
            <X className="h-4 w-4 opacity-60" />
          </button>
        </div>
      )}

      {/* Add one */}
      {mode === "add" && (
        <section className="rounded-3xl border border-ink-100 bg-white p-5 sm:p-6">
          <p className="mb-3 text-sm font-bold text-ink-900">{S.addOne}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input value={one.email} onChange={(e) => setOne({ ...one, email: e.target.value })} placeholder="email@example.com" type="email" className={INPUT} />
            <input value={one.name} onChange={(e) => setOne({ ...one, name: e.target.value })} placeholder={S.namePh} maxLength={120} className={INPUT} />
            <input value={one.phone} onChange={(e) => setOne({ ...one, phone: e.target.value })} placeholder={S.phonePh} maxLength={40} className={INPUT} />
            <input value={one.note} onChange={(e) => setOne({ ...one, note: e.target.value })} placeholder={S.notePh} maxLength={500} className={INPUT} />
          </div>
          <p className="mt-3 text-[11px] text-ink-400">{S.consent}</p>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={addOne} disabled={saving || !one.email} className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold disabled:opacity-50 ${GOLD_BTN}`}>
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {S.save}
            </button>
            <button type="button" onClick={() => setMode("none")} className="rounded-full px-4 py-2.5 text-sm font-semibold text-ink-400 ring-1 ring-ink-100">
              {S.cancel}
            </button>
          </div>
        </section>
      )}

      {/* Import */}
      {mode === "import" && (
        <section className="rounded-3xl border border-ink-100 bg-white p-5 sm:p-6">
          <input
            ref={fileRef}
            type="file"
            accept=".xlsx,.csv,.txt,.xls,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/csv"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) openFile(f);
              e.target.value = "";
            }}
          />
          {!rows ? (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                const f = e.dataTransfer.files?.[0];
                if (f) openFile(f);
              }}
              className={`flex w-full flex-col items-center justify-center gap-2 rounded-3xl border-2 border-dashed px-6 py-12 text-center transition ${
                dragging ? "border-[#c99a3f] bg-[#fffaf0]" : "border-ink-100 bg-mist-50/40 hover:border-primary-300"
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-emerald-600 shadow-sm ring-1 ring-ink-100">
                <FileSpreadsheet className="h-7 w-7" />
              </span>
              <span className="mt-2 text-base font-bold text-ink-900">{S.dropTitle}</span>
              <span className="text-sm text-primary-600">{S.dropOr}</span>
              <span className="text-xs text-ink-400">{S.dropHint}</span>
            </button>
          ) : (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
                  <FileSpreadsheet className="h-4 w-4 text-emerald-600" />
                  {fileName}
                </p>
                <button type="button" onClick={() => fileRef.current?.click()} className="text-xs font-semibold text-primary-600 hover:underline">
                  {S.chooseOther}
                </button>
              </div>

              <div>
                <p className="text-sm font-bold text-ink-900">{S.mapTitle}</p>
                <p className="text-xs text-ink-400">{S.mapHint}</p>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {fields.map(([f, label]) => (
                    <label key={f} className="block">
                      <span className="mb-1 block text-xs font-semibold text-ink-700">{label}</span>
                      <select
                        value={map[f]}
                        onChange={(e) => setMap({ ...map, [f]: Number(e.target.value) })}
                        className={`${INPUT} py-2.5 ${f === "email" && map.email < 0 ? "border-berry-300" : ""}`}
                      >
                        <option value={-1}>{S.none}</option>
                        {Array.from({ length: width }, (_, i) => (
                          <option key={i} value={i}>
                            {colName(i)}
                          </option>
                        ))}
                      </select>
                    </label>
                  ))}
                </div>
                <label className="mt-3 flex items-center gap-2 text-sm text-ink-700">
                  <input type="checkbox" checked={hasHeader} onChange={(e) => setHasHeader(e.target.checked)} className="h-4 w-4 accent-primary-500" />
                  {S.headerRow}
                </label>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200">{fill(S.validRows, { n: mapped.valid })}</span>
                {mapped.invalid > 0 && <span className="rounded-full bg-berry-50 px-3 py-1 text-xs font-bold text-berry-500 ring-1 ring-berry-100">{fill(S.invalidRows, { n: mapped.invalid })}</span>}
                {mapped.dup > 0 && <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">{fill(S.dupRows, { n: mapped.dup })}</span>}
              </div>

              <div>
                <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.previewRows}</p>
                <div className="overflow-x-auto rounded-2xl ring-1 ring-ink-100">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead className="bg-mist-50/70 text-[11px] font-bold uppercase tracking-wider text-ink-400">
                      <tr>
                        <th className="px-3 py-2">{S.fieldName}</th>
                        <th className="px-3 py-2">{S.fieldEmail}</th>
                        <th className="px-3 py-2">{S.fieldPhone}</th>
                        <th className="px-3 py-2">{S.fieldNote}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-ink-100">
                      {mapped.list.slice(0, 6).map((c, i) => (
                        <tr key={i} className={c.ok && !c.dup ? "" : "bg-berry-50/50 text-ink-400"}>
                          <td className="px-3 py-2 font-medium text-ink-900">{c.name || "—"}</td>
                          <td className="px-3 py-2">
                            <span className="flex items-center gap-1.5">
                              {!c.ok && <AlertTriangle className="h-3.5 w-3.5 text-berry-500" />}
                              {c.email || "—"}
                            </span>
                          </td>
                          <td className="px-3 py-2">{c.phone || "—"}</td>
                          <td className="max-w-[180px] truncate px-3 py-2">{c.note || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <label className="flex items-start gap-3 rounded-2xl bg-gradient-to-r from-[#fffaf0] to-[#f8eedb] p-4 text-sm text-ink-700 ring-1 ring-[#ecd9ad]">
                <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 h-4 w-4 shrink-0 accent-[#b9852d]" />
                {S.consent}
              </label>

              <button
                type="button"
                onClick={runImport}
                disabled={!consent || mapped.valid === 0 || importing}
                className={`flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45 sm:w-auto ${GOLD_BTN}`}
              >
                {importing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                {fill(S.importNow, { n: mapped.valid })}
              </button>
            </div>
          )}
          {readError && <p className="mt-3 rounded-2xl bg-berry-50 px-4 py-3 text-sm text-berry-500 ring-1 ring-berry-100">{readError}</p>}
        </section>
      )}

      {/* List */}
      <section className="rounded-3xl border border-ink-100 bg-white p-5 sm:p-6">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-300" />
          <input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setPage(0);
            }}
            placeholder={S.searchPh}
            className={`${INPUT} pl-11`}
          />
        </div>

        {data === null ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-ink-300" />
          </div>
        ) : data.total === 0 ? (
          <div className="py-12 text-center">
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-mist-50 text-primary-500">
              <Mail className="h-5 w-5" />
            </span>
            <p className="mt-3 font-bold text-ink-900">{S.emptyContacts}</p>
            <p className="mt-1 text-sm text-ink-400">{S.emptyContactsText}</p>
          </div>
        ) : (
          <>
            <ul className="mt-4 divide-y divide-ink-100">
              {data.contacts.map((c) => (
                <li key={c.id} className="flex items-center gap-3 py-3">
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${c.optedOut ? "bg-ink-100 text-ink-400" : "bg-primary-100 text-primary-700"}`}>
                    {c.optedOut ? <UserX className="h-4 w-4" /> : (c.name || c.email).trim()[0]?.toUpperCase()}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink-900">
                      <span className="truncate">{c.name || c.email}</span>
                      {c.optedOut && <span className="rounded-full bg-ink-100 px-2 py-0.5 text-[10px] font-bold text-ink-400">{S.unsubscribed}</span>}
                    </p>
                    <p className="truncate text-xs text-ink-400">
                      {[c.name ? c.email : null, c.phone, c.note].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                  {isOwner && (
                    <button type="button" onClick={() => remove(c)} aria-label={S.remove} title={S.remove} className="rounded-full p-2 text-ink-300 transition hover:bg-berry-50 hover:text-berry-500">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-ink-100 pt-3 text-xs text-ink-400">
              <span>{fill(S.showing, { from, to, total: data.total })}</span>
              <div className="flex items-center gap-2">
                <button type="button" disabled={page === 0} onClick={() => setPage(page - 1)} className="flex items-center gap-1 rounded-full px-3 py-1.5 font-semibold ring-1 ring-ink-100 disabled:opacity-40">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  {S.prev}
                </button>
                <button type="button" disabled={to >= data.total} onClick={() => setPage(page + 1)} className="flex items-center gap-1 rounded-full px-3 py-1.5 font-semibold ring-1 ring-ink-100 disabled:opacity-40">
                  {S.next}
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            {isOwner && !q && (
              <button type="button" onClick={removeAll} className="mt-4 text-xs font-semibold text-berry-500 hover:underline">
                {S.deleteAll}
              </button>
            )}
          </>
        )}
      </section>
    </div>
  );
}
