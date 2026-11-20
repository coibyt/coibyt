"use client";

import { useEffect, useState } from "react";
import { BellRing, Loader2, Mail, Phone, Trash2, UserRound } from "lucide-react";
import { waitlistStrings } from "@/lib/waitlist-strings";

interface Entry {
  id: string;
  name: string;
  phone: string | null;
  email: string;
  fromDate: string;
  toDate: string;
  note: string | null;
  createdAt: string;
  notifiedAt: string | null;
  notifyCount: number;
  service: { name: string } | null;
  staff: { name: string } | null;
}

/** Bookings → Wait list tab: who is waiting, for what, and the buttons to
 * tell them or take them off (src/lib/waitlist.ts). */
export function WaitlistPanel({ locale, onSeen }: { locale: string; onSeen?: () => void }) {
  const S = waitlistStrings(locale);
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/business/waitlist")
      .then((r) => (r.ok ? r.json() : { entries: [] }))
      .then((d: { entries: Entry[] }) => setEntries(d.entries))
      .catch(() => setEntries([]));
    // Opening the tab clears the red dot.
    fetch("/api/business/waitlist", { method: "PATCH" })
      .then(() => onSeen?.())
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const day = (iso: string) => new Date(`${iso}T12:00:00`).toLocaleDateString(locale === "vi" ? "vi-VN" : locale === "fi" ? "fi-FI" : "en-GB", { day: "numeric", month: "short" });
  const when = (iso: string) => new Date(iso).toLocaleString(locale === "vi" ? "vi-VN" : locale === "fi" ? "fi-FI" : "en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  async function notify(id: string) {
    setBusyId(id);
    const res = await fetch(`/api/business/waitlist/${id}`, { method: "POST" }).catch(() => null);
    setBusyId(null);
    if (res?.ok) {
      const at = new Date().toISOString();
      setEntries((prev) => prev?.map((e) => (e.id === id ? { ...e, notifiedAt: at, notifyCount: e.notifyCount + 1 } : e)) ?? null);
      setNotice(S.notifiedAll(1));
    } else setNotice(S.notifyFailed);
    setTimeout(() => setNotice(null), 3000);
  }

  async function remove(id: string) {
    setBusyId(id);
    const res = await fetch(`/api/business/waitlist/${id}`, { method: "DELETE" }).catch(() => null);
    setBusyId(null);
    if (res?.ok) {
      setEntries((prev) => prev?.filter((e) => e.id !== id) ?? null);
      setNotice(S.removed);
      setTimeout(() => setNotice(null), 3000);
    }
  }

  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-ink-100 bg-white px-4 py-3 text-xs leading-relaxed text-ink-500">
        <span className="mr-2 inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 font-bold text-primary-700">
          <BellRing className="h-3 w-3" /> {entries ? S.waiting(entries.length) : "…"}
        </span>
        {S.tabHint}
      </div>
      {notice && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-800">{notice}</p>}
      {entries === null ? (
        <p className="flex items-center gap-2 py-6 text-sm text-ink-400">
          <Loader2 className="h-4 w-4 animate-spin" /> …
        </p>
      ) : entries.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-ink-200 bg-mist-50 px-4 py-10 text-center text-sm text-ink-400">{S.tabEmpty}</p>
      ) : (
        <ul className="grid gap-2 md:grid-cols-2">
          {entries.map((e) => (
            <li key={e.id} className="rounded-2xl border border-ink-100 bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#e8d3a6] to-[#b08a3e] text-white">
                  <UserRound className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-bold text-ink-900">{e.name}</p>
                  <p className="truncate text-sm text-ink-700">
                    {e.service?.name ?? S.anyService}
                    {e.staff ? ` · ${e.staff.name}` : ""}
                  </p>
                  <p className="mt-0.5 text-xs text-ink-400">
                    {S.range} {day(e.toDate)} · {S.joinedAt} {when(e.createdAt)}
                  </p>
                  {e.note && <p className="mt-1 rounded-lg bg-mist-50 px-2 py-1 text-xs text-ink-700">{e.note}</p>}
                  <p className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-ink-500">
                    {e.phone && (
                      <a href={`tel:${e.phone}`} className="inline-flex items-center gap-1 hover:text-primary-600">
                        <Phone className="h-3 w-3" /> {e.phone}
                      </a>
                    )}
                    {e.email && (
                      <a href={`mailto:${e.email}`} className="inline-flex items-center gap-1 hover:text-primary-600">
                        <Mail className="h-3 w-3" /> {e.email}
                      </a>
                    )}
                  </p>
                  <p className={`mt-1 text-[11px] font-semibold ${e.notifiedAt ? "text-emerald-700" : "text-ink-400"}`}>
                    {e.notifiedAt ? S.notified(e.notifyCount, when(e.notifiedAt)) : S.neverNotified}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <button disabled={busyId === e.id} onClick={() => notify(e.id)} className="btn-primary !px-3 !py-1.5 text-xs">
                  {busyId === e.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <BellRing className="h-3.5 w-3.5" />} {S.notifyOne}
                </button>
                <button disabled={busyId === e.id} onClick={() => remove(e.id)} className="btn-outline !px-3 !py-1.5 text-xs">
                  <Trash2 className="h-3.5 w-3.5" /> {S.remove}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
