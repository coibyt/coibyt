"use client";

import { useState } from "react";
import { ArrowRight, KeyRound, Loader2, MailCheck } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";

/** Loyalty Lite's card on /loyalty-lite: create a salon (a new one goes
 * straight to its studio; a known email gets a sign-in link instead), or
 * sign in with email + password — the owner or a staff login. */
export function LiteSignupForm({
  locale,
  t,
  expired,
  initialMode = "signup",
  compact = false,
}: {
  locale: string;
  t: LiteStrings;
  expired: boolean;
  initialMode?: "signup" | "login";
  /** The welcome popup: no tabs or owner-name field, a link to switch instead. */
  compact?: boolean;
}) {
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
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#fdf2f8] text-[#c42d7f]">
          <MailCheck className="h-7 w-7" />
        </span>
        <p className="mt-4 font-serif text-2xl text-ink-900">{t.checkEmailTitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-500">{sent}</p>
      </div>
    );
  }

  // The loyalty card's pink.
  const field =
    "mt-1.5 h-14 w-full rounded-2xl border border-[#f0cfe0] bg-[#fffafd] px-5 text-base text-ink-900 transition placeholder:text-ink-300 focus:border-[#d6337f] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#d6337f]/15";
  const submit =
    "flex h-14 w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#e0559b] via-[#c42d7f] to-[#a3155f] text-base font-bold text-white shadow-[0_18px_34px_-14px_rgba(163,21,95,0.9)] transition hover:brightness-105 disabled:opacity-70";
  const label = "block text-sm font-bold text-[#4a1236]";

  const switchMode = () => {
    setMode(mode === "signup" ? "login" : "signup");
    setError(null);
  };

  return (
    <div>
      {!compact && (
      <div className="mb-6 grid grid-cols-2 gap-1 rounded-full bg-[#fdf2f8] p-1 ring-1 ring-[#f3c4dd]">
        {(["signup", "login"] as const).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => {
              setMode(m);
              setError(null);
            }}
            className={`rounded-full py-2.5 text-sm font-bold transition ${mode === m ? "bg-gradient-to-r from-[#d6337f] to-[#a3155f] text-white shadow" : "text-[#7a1d55] hover:bg-white"}`}
          >
            {m === "signup" ? t.modeSignup : t.modeLogin}
          </button>
        ))}
      </div>
      )}

      {mode === "signup" ? (
        <form onSubmit={signup} className="space-y-4">
          <label className={label}>
            {t.salonName}
            <input required minLength={2} maxLength={120} value={salonName} onChange={(e) => setSalonName(e.target.value)} placeholder={t.salonNamePh} className={field} />
          </label>
          <label className={label}>
            {t.email}
            <input required type="email" maxLength={191} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} className={field} autoComplete="email" />
          </label>
          {!compact && (
            <label className={label}>
              {t.ownerName}
              <input maxLength={120} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} className={field} autoComplete="name" />
            </label>
          )}
          {error && <p className="rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
          <button type="submit" disabled={busy} className={submit}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {t.submit}
          </button>
          {compact ? (
            <p className="text-center text-sm text-ink-500">
              {t.popupHaveAccount}{" "}
              <button type="button" onClick={switchMode} className="font-bold text-[#c42d7f] hover:underline">
                {t.modeLogin}
              </button>
            </p>
          ) : (
            <p className="text-center text-xs text-ink-400">{t.terms}</p>
          )}
        </form>
      ) : (
        <form onSubmit={login} className="space-y-4">
          <p className="font-serif text-2xl text-[#4a1236]">{t.loginTitle}</p>
          <p className="-mt-2 text-sm text-ink-400">{t.loginSub}</p>
          <label className={label}>
            {t.email}
            <input required type="email" maxLength={191} value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t.emailPh} className={field} autoComplete="username" />
          </label>
          <label className={label}>
            {t.password}
            <input required type="password" maxLength={200} value={password} onChange={(e) => setPassword(e.target.value)} className={field} autoComplete="current-password" />
          </label>
          {error && <p className="rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
          <button type="submit" disabled={busy} className={submit}>
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
            {t.loginSubmit}
          </button>
          <button type="button" disabled={busy} onClick={sendLink} className="block w-full text-center text-sm font-semibold text-[#c42d7f] hover:underline">
            {t.forgot}
          </button>
          <p className="text-center text-[11px] text-ink-400">{t.forgotStaff}</p>
          {compact && (
            <p className="text-center text-sm text-ink-500">
              {t.popupNoAccount}{" "}
              <button type="button" onClick={switchMode} className="font-bold text-[#c42d7f] hover:underline">
                {t.modeSignup}
              </button>
            </p>
          )}
        </form>
      )}
    </div>
  );
}
