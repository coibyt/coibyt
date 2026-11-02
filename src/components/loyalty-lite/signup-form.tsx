"use client";

import { useState } from "react";
import { ArrowRight, KeyRound, Loader2, MailCheck } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";

/** Loyalty Lite's card on /loyalty-lite: create a salon (a new one goes
 * straight to its studio; a known email gets a sign-in link instead), or
 * sign in with email + password — the owner or a staff login. */
export function LiteSignupForm({ locale, t, expired, initialMode = "signup" }: { locale: string; t: LiteStrings; expired: boolean; initialMode?: "signup" | "login" }) {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode);
  const [salonName, setSalonName] = useState("");
  const [email, setEmail] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(expired ? t.expired : null);
  const [sent, setSent] = useState<string | null>(null);

  async function post(url: string, body: object) {
    setBusy(true);
    setError(null);
    const res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(false);
    return { res, d };
  }

  async function signup(e: React.FormEvent) {
    e.preventDefault();
    const { res, d } = await post("/api/loyalty-lite/signup", { salonName, email, ownerName: ownerName || undefined, locale });
    if (!res?.ok) {
      setError(res?.status === 429 ? t.errTooMany : d?.error === "STAFF_EMAIL" ? t.staffEmailTaken : t.errGeneric);
      return;
    }
    if (d?.status === "CHECK_EMAIL") return setSent(t.checkEmailText.replace("{email}", email));
    router.push("/loyalty-lite/studio");
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    const { res } = await post("/api/loyalty-lite/login", { email, password });
    if (!res?.ok) {
      setError(res?.status === 429 ? t.errTooMany : res?.status === 401 ? t.wrongLogin : t.errGeneric);
      return;
    }
    router.push("/loyalty-lite/studio");
    router.refresh();
  }

  async function sendLink() {
    if (!email) return setError(t.email);
    const { res } = await post("/api/loyalty-lite/login", { email, link: true });
    if (!res?.ok) return setError(res?.status === 429 ? t.errTooMany : t.errGeneric);
    setSent(t.linkSent);
  }

  if (sent) {
    return (
      <div className="py-6 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f6efe1] text-[#8a6a2c]">
          <MailCheck className="h-7 w-7" />
        </span>
        <p className="mt-4 font-serif text-2xl text-ink-900">{t.checkEmailTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{sent}</p>
      </div>
    );
  }

  const field = "mt-1 h-12 w-full rounded-2xl border border-ink-100 bg-white px-4 text-sm text-ink-900 transition placeholder:text-ink-300 focus:border-[#c99a3f] focus:outline-none focus:ring-4 focus:ring-[#c99a3f]/15";
  const submit = "flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] via-[#c99a3f] to-[#b9852d] text-sm font-bold text-white shadow-[0_14px_28px_-14px_rgba(185,133,45,0.95)] transition hover:brightness-105 disabled:opacity-70";

  return (
    <div>
      <div className="mb-5 grid grid-cols-2 gap-1 rounded-full bg-mist-50 p-1 ring-1 ring-ink-100">
        {(["signup", "login"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`rounded-full py-2 text-sm font-bold transition ${mode === m ? "bg-[#1f182d] text-white shadow" : "text-ink-500 hover:text-ink-900"}`}
          >
            {m === "signup" ? t.modeSignup : t.modeLogin}
          </button>
        ))}
      </div>

      {mode === "signup" ? (
        <form onSubmit={signup} className="space-y-3.5">
          <p className="font-serif text-2xl text-ink-900">{t.formTitle}</p>
          <p className="-mt-2 text-sm text-ink-400">{t.formSub}</p>
          <label className="block text-xs font-bold text-ink-700">
            {t.salonName}
            <input required minLength={2} maxLength={120} value={salonName} onChange={(e) => setSalonName(e.target.value)} placeholder={t.salonNamePh} className={field} />
          </label>
          <label className="block text-xs font-bold text-ink-700">
            {t.email}
            <input required type="email" maxLength={191} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} className={field} autoComplete="email" />
          </label>
          <label className="block text-xs font-bold text-ink-700">
            {t.ownerName}
            <input maxLength={120} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className={field} autoComplete="name" />
          </label>
          {error && <p className="rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
          <button type="submit" disabled={busy} className={submit}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {t.submit}
          </button>
          <p className="text-center text-[11px] text-ink-400">{t.terms}</p>
        </form>
      ) : (
        <form onSubmit={login} className="space-y-3.5">
          <p className="font-serif text-2xl text-ink-900">{t.loginTitle}</p>
          <p className="-mt-2 text-sm text-ink-400">{t.loginSub}</p>
          <label className="block text-xs font-bold text-ink-700">
            {t.email}
            <input required type="email" maxLength={191} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} className={field} autoComplete="username" />
          </label>
          <label className="block text-xs font-bold text-ink-700">
            {t.password}
            <input required type="password" maxLength={200} value={password} onChange={(e) => setPassword(e.target.value)} className={field} autoComplete="current-password" />
          </label>
          {error && <p className="rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
          <button type="submit" disabled={busy} className={submit}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
            {t.loginSubmit}
          </button>
          <button type="button" disabled={busy} onClick={sendLink} className="block w-full text-center text-xs font-semibold text-primary-600 hover:underline">
            {t.forgot}
          </button>
          <p className="text-center text-[11px] text-ink-400">{t.forgotStaff}</p>
        </form>
      )}
    </div>
  );
}
