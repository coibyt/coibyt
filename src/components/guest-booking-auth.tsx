"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

const TITLES: Record<string, { register: string; signIn: string }> = {
  vi: { register: "Tạo tài khoản để hoàn tất đặt lịch", signIn: "Đăng nhập để hoàn tất đặt lịch" },
  en: { register: "Create an account to finish booking", signIn: "Sign in to finish booking" },
  fi: { register: "Luo tili viimeistelläksesi varauksen", signIn: "Kirjaudu sisään viimeistelläksesi varauksen" },
  pl: { register: "Załóż konto, aby dokończyć rezerwację", signIn: "Zaloguj się, aby dokończyć rezerwację" },
  de: { register: "Erstelle ein Konto, um die Buchung abzuschließen", signIn: "Melde dich an, um die Buchung abzuschließen" },
  km: { register: "បង្កើតគណនីដើម្បីបញ្ចប់ការកក់", signIn: "ចូលគណនីដើម្បីបញ្ចប់ការកក់" },
  th: { register: "สร้างบัญชีเพื่อทำการจองให้เสร็จสิ้น", signIn: "เข้าสู่ระบบเพื่อทำการจองให้เสร็จสิ้น" },
};

/**
 * Replaces the old "please sign in" dead-end on the booking widget — a
 * signed-out customer registers (or signs in) right here, inline, and the
 * booking form underneath appears the moment the session updates, with no
 * navigation and none of the selections made so far lost.
 */
export function GuestBookingAuth({ locale }: { locale: string }) {
  const tAuth = useTranslations("auth");
  const title = TITLES[locale] ?? TITLES.en;
  const [mode, setMode] = useState<"register" | "signin">("register");

  return (
    <div className="card space-y-4 p-6">
      <p className="text-center font-semibold text-ink-900">
        {mode === "register" ? title.register : title.signIn}
      </p>
      {mode === "register" ? <RegisterForm /> : <SignInForm />}
      <p className="text-center text-sm text-ink-400">
        {mode === "register" ? (
          <>
            {tAuth("haveAccount")}{" "}
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="font-medium text-primary-500 hover:underline"
            >
              {tAuth("signInInstead")}
            </button>
          </>
        ) : (
          <>
            {tAuth("noAccount")}{" "}
            <button
              type="button"
              onClick={() => setMode("register")}
              className="font-medium text-primary-500 hover:underline"
            >
              {tAuth("createOne")}
            </button>
          </>
        )}
      </p>
    </div>
  );
}

function RegisterForm() {
  const tAuth = useTranslations("auth");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError(tAuth("passwordMismatch"));
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setLoading(false);
      setError(data?.error === "EMAIL_IN_USE" ? tAuth("emailInUse") : tAuth("invalidCredentials"));
      return;
    }
    // No redirect/navigation — the parent's useSession() flips to
    // "authenticated" on its own once this resolves, revealing the booking
    // form in place with every selection the customer already made intact.
    await signIn("credentials", { email: form.email, password: form.password, redirect: false });
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="label">{tAuth("name")}</label>
        <input
          required
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{tAuth("email")}</label>
        <input
          type="email"
          required
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{tAuth("phone")}</label>
        <input
          type="tel"
          required
          className="input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{tAuth("password")}</label>
        <input
          type="password"
          required
          minLength={8}
          className="input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{tAuth("confirmPassword")}</label>
        <input
          type="password"
          required
          className="input"
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
      </div>
      {error && <p className="text-sm text-berry-500">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {tAuth("signUpButton")}
      </button>
    </form>
  );
}

function SignInForm() {
  const tAuth = useTranslations("auth");
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const result = await signIn("credentials", { ...form, redirect: false });
    setLoading(false);
    if (result?.error) {
      setError(tAuth("invalidCredentials"));
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div>
        <label className="label">{tAuth("email")}</label>
        <input
          type="email"
          required
          className="input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{tAuth("password")}</label>
        <input
          type="password"
          required
          className="input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
      </div>
      {error && <p className="text-sm text-berry-500">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {tAuth("signInButton")}
      </button>
    </form>
  );
}
