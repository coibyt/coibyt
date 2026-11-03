"use client";

import { useEffect, useState } from "react";
import { Check, KeyRound, Loader2, LogOut, Mail, Pause, Play, ShieldCheck, Trash2, UserPlus, UserRound, Users } from "lucide-react";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";

interface StaffRow {
  id: string;
  name: string;
  email: string;
  active: boolean;
  lastSeenAt: string | null;
}

type Msg = { at: "account" | "password" | "staff" | "session"; ok: boolean; text: string } | null;

const fill = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (m, k: string) => (k in v ? String(v[k]) : m));

/** The owner's Profile tab in the Loyalty Lite studio: sign-in email and
 * name, a password for other devices, staff logins, and signing out. */
export function LiteProfilePanel({
  locale,
  t,
  initial,
  onSignOut,
}: {
  locale: string;
  t: LiteStrings;
  initial: { ownerName: string; email: string; hasPassword: boolean };
  onSignOut: () => void;
}) {
  const [ownerName, setOwnerName] = useState(initial.ownerName);
  const [email, setEmail] = useState(initial.email);
  const [hasPassword, setHasPassword] = useState(initial.hasPassword);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [staff, setStaff] = useState<StaffRow[] | null>(null);
  const [sName, setSName] = useState("");
  const [sEmail, setSEmail] = useState("");
  const [sPw, setSPw] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<Msg>(null);

  useEffect(() => {
    fetch("/api/loyalty-lite/staff")
      .then((r) => (r.ok ? r.json() : { staff: [] }))
      .then((d) => setStaff(d.staff ?? []))
      .catch(() => setStaff([]));
  }, []);

  async function call(url: string, method: string, body?: object) {
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: body ? JSON.stringify(body) : undefined }).catch(() => null);
    return { ok: !!res?.ok, data: await res?.json().catch(() => null) };
  }

  async function saveAccount(e: React.FormEvent) {
    e.preventDefault();
    setBusy("account");
    const changed = email.trim().toLowerCase() !== initial.email;
    const r = await call("/api/loyalty-lite/profile", "PATCH", { ownerName, email });
    setBusy(null);
    if (!r.ok) return setMsg({ at: "account", ok: false, text: r.data?.error === "EMAIL_IN_USE" ? t.emailInUse : t.errGeneric });
    setEmail(r.data.email);
    setMsg({ at: "account", ok: true, text: changed ? fill(t.emailChanged, { email: r.data.email }) : t.saved });
  }

  async function savePassword(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) return setMsg({ at: "password", ok: false, text: t.passwordShort });
    if (pw !== pw2) return setMsg({ at: "password", ok: false, text: t.passwordMismatch });
    setBusy("password");
    const r = await call("/api/loyalty-lite/profile", "PATCH", { password: pw });
    setBusy(null);
    if (!r.ok) return setMsg({ at: "password", ok: false, text: t.errGeneric });
    setHasPassword(true);
    setPw("");
    setPw2("");
    setMsg({ at: "password", ok: true, text: t.passwordSaved });
  }

  async function addStaff(e: React.FormEvent) {
    e.preventDefault();
    if (sPw.length < 8) return setMsg({ at: "staff", ok: false, text: t.passwordShort });
    setBusy("staff");
    const r = await call("/api/loyalty-lite/staff", "POST", { name: sName, email: sEmail, password: sPw });
    setBusy(null);
    if (!r.ok) return setMsg({ at: "staff", ok: false, text: r.data?.error === "EMAIL_IN_USE" ? t.emailInUse : t.errGeneric });
    setStaff((list) => [...(list ?? []), r.data.staff]);
    setMsg({ at: "staff", ok: true, text: fill(t.staffAdded, { name: r.data.staff.name }) });
    setSName("");
    setSEmail("");
    setSPw("");
  }

  async function resetStaff(s: StaffRow) {
    const next = prompt(fill(t.resetPrompt, { name: s.name }));
    if (!next) return;
    if (next.length < 8) return setMsg({ at: "staff", ok: false, text: t.passwordShort });
    setBusy(`s-${s.id}`);
    const r = await call(`/api/loyalty-lite/staff/${s.id}`, "PATCH", { password: next });
    setBusy(null);
    setMsg(r.ok ? { at: "staff", ok: true, text: fill(t.passwordReset, { name: s.name }) } : { at: "staff", ok: false, text: t.errGeneric });
  }

  async function toggleStaff(s: StaffRow) {
    setBusy(`s-${s.id}`);
    const r = await call(`/api/loyalty-lite/staff/${s.id}`, "PATCH", { active: !s.active });
    setBusy(null);
    if (r.ok) setStaff((list) => (list ?? []).map((x) => (x.id === s.id ? { ...x, active: !s.active } : x)));
  }

  async function removeStaff(s: StaffRow) {
    if (!confirm(fill(t.removeStaff, { name: s.name }))) return;
    setBusy(`s-${s.id}`);
    const r = await call(`/api/loyalty-lite/staff/${s.id}`, "DELETE");
    setBusy(null);
    if (r.ok) setStaff((list) => (list ?? []).filter((x) => x.id !== s.id));
  }

  async function signOutAll() {
    if (!confirm(t.signOutAllConfirm)) return;
    setBusy("all");
    const r = await call("/api/loyalty-lite/profile", "POST");
    setBusy(null);
    setMsg(r.ok ? { at: "session", ok: true, text: t.signedOutAll } : { at: "session", ok: false, text: t.errGeneric });
  }

  const field = "mt-1 h-11 w-full rounded-2xl border border-[#f3c4dd] bg-white px-4 text-sm text-ink-900 placeholder:text-ink-300 focus:border-[#d6337f] focus:outline-none focus:ring-4 focus:ring-[#d6337f]/15";
  const gold = "inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e0559b] via-[#c42d7f] to-[#a3155f] px-5 py-2.5 text-sm font-bold text-white shadow-[0_12px_24px_-14px_rgba(163,21,95,0.9)] transition hover:brightness-105 disabled:opacity-60";
  const outline = "inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-ink-700 ring-1 ring-ink-100 transition hover:bg-mist-50 disabled:opacity-60";
  const dateFmt = new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

  const Note = ({ at }: { at: NonNullable<Msg>["at"] }) =>
    msg && msg.at === at ? (
      <p role="status" className={`mt-4 flex items-start gap-2 rounded-2xl px-4 py-3 text-sm font-semibold ${msg.ok ? "bg-emerald-50 text-emerald-800" : "bg-berry-50 text-berry-700"}`}>
        {msg.ok && <Check className="mt-0.5 h-4 w-4 shrink-0" />}
        {msg.text}
      </p>
    ) : null;

  const Head = ({ icon: Icon, title, sub }: { icon: typeof Mail; title: string; sub: string }) => (
    <div className="flex items-start gap-3">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#e0559b] to-[#a3155f] text-[#ffe3f1]">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="font-serif text-2xl leading-tight text-ink-900">{title}</p>
        <p className="mt-1 text-sm text-ink-400">{sub}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <section className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
        <Head icon={UserRound} title={t.accountTitle} sub={t.accountSub} />
        <form onSubmit={saveAccount} className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="block text-xs font-bold text-ink-700">
            {t.yourName}
            <input maxLength={120} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className={field} autoComplete="name" />
          </label>
          <label className="block text-xs font-bold text-ink-700">
            {t.loginEmail}
            <input required type="email" maxLength={191} value={email} onChange={(e) => setEmail(e.target.value)} className={field} autoComplete="email" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" disabled={!!busy} className={gold}>
              {busy === "account" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />}
              {t.save}
            </button>
          </div>
        </form>
        <Note at="account" />
      </section>

      <section className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
        <Head icon={KeyRound} title={t.passwordTitle} sub={t.passwordSub} />
        <p className={`mt-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${hasPassword ? "bg-emerald-50 text-emerald-700" : "bg-[#fdf2f8] text-[#a3155f]"}`}>
          <ShieldCheck className="h-3.5 w-3.5" />
          {hasPassword ? t.passwordOn : t.passwordOff}
        </p>
        <form onSubmit={savePassword} className="mt-4 grid gap-3 sm:grid-cols-2">
          <input type="email" value={email} readOnly autoComplete="username" className="hidden" />
          <label className="block text-xs font-bold text-ink-700">
            {t.newPassword}
            <input type="password" minLength={8} maxLength={200} value={pw} onChange={(e) => setPw(e.target.value)} className={field} autoComplete="new-password" />
          </label>
          <label className="block text-xs font-bold text-ink-700">
            {t.confirmPassword}
            <input type="password" minLength={8} maxLength={200} value={pw2} onChange={(e) => setPw2(e.target.value)} className={field} autoComplete="new-password" />
          </label>
          <div className="sm:col-span-2">
            <button type="submit" disabled={!!busy || !pw} className={gold}>
              {busy === "password" ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
              {t.setPassword}
            </button>
          </div>
        </form>
        <Note at="password" />
      </section>

      <section className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
        <Head icon={Users} title={t.staffTitle} sub={t.staffSub} />
        {staff === null ? (
          <Loader2 className="mt-5 h-5 w-5 animate-spin text-ink-300" />
        ) : staff.length === 0 ? (
          <p className="mt-5 text-sm text-ink-400">{t.noStaff}</p>
        ) : (
          <ul className="mt-5 divide-y divide-ink-100">
            {staff.map((s) => (
              <li key={s.id} className="flex flex-wrap items-center gap-3 py-3">
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl font-serif text-lg ${s.active ? "bg-gradient-to-br from-[#e0559b] to-[#a3155f] text-[#ffe3f1]" : "bg-mist-50 text-ink-300"}`}>
                  {s.name.trim()[0]?.toUpperCase()}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-bold text-ink-900">{s.name}</span>
                    <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${s.active ? "bg-emerald-50 text-emerald-700" : "bg-mist-50 text-ink-400"}`}>
                      {s.active ? t.staffActive : t.staffPaused}
                    </span>
                  </span>
                  <span className="block truncate text-xs text-ink-400">
                    {s.email}
                    {s.lastSeenAt ? ` · ${fill(t.staffLastSeen, { date: dateFmt.format(new Date(s.lastSeenAt)) })}` : ""}
                  </span>
                </span>
                <span className="flex items-center gap-1">
                  {busy === `s-${s.id}` && <Loader2 className="h-4 w-4 animate-spin text-ink-300" />}
                  <button type="button" title={t.resetPassword} disabled={!!busy} onClick={() => resetStaff(s)} className="rounded-full p-2 text-ink-400 hover:bg-mist-50 hover:text-ink-700">
                    <KeyRound className="h-4 w-4" />
                  </button>
                  <button type="button" title={s.active ? t.pause : t.resume} disabled={!!busy} onClick={() => toggleStaff(s)} className="rounded-full p-2 text-ink-400 hover:bg-mist-50 hover:text-ink-700">
                    {s.active ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </button>
                  <button type="button" title={t.remove} disabled={!!busy} onClick={() => removeStaff(s)} className="rounded-full p-2 text-ink-300 hover:bg-berry-50 hover:text-berry-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={addStaff} className="mt-5 grid gap-3 rounded-3xl bg-[#faf8fd] p-4 ring-1 ring-[#f3c4dd] sm:grid-cols-3">
          <label className="block text-xs font-bold text-ink-700">
            {t.staffName}
            <input required maxLength={120} value={sName} onChange={(e) => setSName(e.target.value)} className={field} />
          </label>
          <label className="block text-xs font-bold text-ink-700">
            {t.staffEmail}
            <input required type="email" maxLength={191} value={sEmail} onChange={(e) => setSEmail(e.target.value)} className={field} autoComplete="off" />
          </label>
          <label className="block text-xs font-bold text-ink-700">
            {t.staffPassword}
            <input required type="text" minLength={8} maxLength={200} value={sPw} onChange={(e) => setSPw(e.target.value)} className={field} autoComplete="off" />
          </label>
          <div className="sm:col-span-3">
            <button type="submit" disabled={!!busy} className={gold}>
              {busy === "staff" ? <Loader2 className="h-4 w-4 animate-spin" /> : <UserPlus className="h-4 w-4" />}
              {t.addStaff}
            </button>
          </div>
        </form>
        <Note at="staff" />
      </section>

      <section className="rounded-[2rem] border border-[#f3c4dd] bg-white p-5 sm:p-6">
        <Head icon={LogOut} title={t.sessionTitle} sub={t.sessionSub} />
        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" onClick={onSignOut} className={outline}>
            <LogOut className="h-4 w-4" />
            {t.signOut}
          </button>
          <button type="button" disabled={!!busy} onClick={signOutAll} className={outline}>
            {busy === "all" ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
            {t.signOutAll}
          </button>
        </div>
        <Note at="session" />
      </section>
    </div>
  );
}
