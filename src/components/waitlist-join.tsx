"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { BellRing, Check, Loader2, X } from "lucide-react";
import { waitlistStrings } from "@/lib/waitlist-strings";

const WEEK_OPTIONS = [1, 2, 4, 8];

/** "Join the wait list" on the booking page, shown when the chosen day (or
 * staff member) has no free time (src/lib/waitlist.ts). */
export function WaitlistJoin({
  businessSlug,
  serviceId,
  staffId,
  staffName,
  locale,
}: {
  businessSlug: string;
  serviceId: string;
  /** "" = any staff. */
  staffId: string;
  staffName?: string | null;
  locale: string;
}) {
  const S = waitlistStrings(locale);
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [weeks, setWeeks] = useState(2);
  const [anyStaff, setAnyStaff] = useState(!staffId);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function openForm() {
    setName((n) => n || session?.user?.name || "");
    setEmail((e) => e || session?.user?.email || "");
    setOpen(true);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: businessSlug,
        serviceId,
        staffId: anyStaff ? null : staffId || null,
        name,
        phone: phone || null,
        email,
        weeks,
        note: note || null,
      }),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) setDone(true);
    else setError(S.error);
  }

  if (done) {
    return (
      <div className="mt-3 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
        <Check className="mt-0.5 h-4 w-4 shrink-0" />
        <div>
          <p className="font-semibold">{S.joined}</p>
          <p className="text-xs text-emerald-800/80">{S.joinedText}</p>
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <button type="button" onClick={openForm} className="btn-outline mt-3 w-full !py-2.5 text-sm">
        <BellRing className="h-4 w-4 text-[#b08a3e]" /> {S.joinButton}
      </button>
    );
  }

  return (
    <form onSubmit={submit} className="mt-3 space-y-3 rounded-2xl border border-ink-100 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-ink-900">{S.joinTitle}</p>
          <p className="mt-0.5 text-xs text-ink-400">{S.joinText}</p>
        </div>
        <button type="button" onClick={() => setOpen(false)} className="text-ink-400" aria-label={S.cancel}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label className="label">{S.name}</label>
          <input className="input" required value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label className="label">{S.phone}</label>
          <input className="input" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="sm:col-span-2">
          <label className="label">{S.email}</label>
          <input className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
      </div>
      <div>
        <p className="label">{S.weeks}</p>
        <div className="flex flex-wrap gap-1.5">
          {WEEK_OPTIONS.map((w) => (
            <button
              key={w}
              type="button"
              onClick={() => setWeeks(w)}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${weeks === w ? "bg-ink-900 text-white" : "bg-mist-50 text-ink-700 hover:bg-mist-100"}`}
            >
              {S.weeksN(w)}
            </button>
          ))}
        </div>
      </div>
      {staffId && (
        <label className="flex cursor-pointer items-center gap-2 text-sm text-ink-700">
          <input type="checkbox" checked={anyStaff} onChange={(e) => setAnyStaff(e.target.checked)} className="h-4 w-4 rounded border-ink-200 text-primary-500" />
          {S.anyStaff}
          {staffName && !anyStaff && <span className="text-xs text-ink-400">({staffName})</span>}
        </label>
      )}
      <div>
        <label className="label">{S.note}</label>
        <input className="input" maxLength={300} placeholder={S.notePh} value={note} onChange={(e) => setNote(e.target.value)} />
      </div>
      {error && <p className="text-xs font-semibold text-berry-500">{error}</p>}
      <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
        <button type="button" onClick={() => setOpen(false)} className="btn-ghost !py-2.5 text-sm">
          {S.cancel}
        </button>
        <button type="submit" disabled={busy} className="btn-primary !py-2.5 text-sm">
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <BellRing className="h-4 w-4" />} {S.submit}
        </button>
      </div>
    </form>
  );
}
