"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";

export function SignUpForm() {
  const t = useTranslations("auth");
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError(t("passwordMismatch"));
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
      setError(
        data?.error === "EMAIL_IN_USE" ? t("emailInUse") : t("invalidCredentials")
      );
      return;
    }

    await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });
    setLoading(false);
    router.push("/");
    router.refresh();
  }

  return (
    <div className="space-y-4">
      <button onClick={() => signIn("google")} className="btn-outline w-full">
        {t("continueWithGoogle")}
      </button>

      <div className="flex items-center gap-3 text-xs text-ink-400">
        <div className="h-px flex-1 bg-ink-100" />
        {t("orDivider")}
        <div className="h-px flex-1 bg-ink-100" />
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="name">{t("name")}</label>
          <input
            id="name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="email">{t("email")}</label>
          <input
            id="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="phone">{t("phone")}</label>
          <input
            id="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="password">{t("password")}</label>
          <input
            id="password"
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="input"
          />
        </div>
        <div>
          <label className="label" htmlFor="confirmPassword">{t("confirmPassword")}</label>
          <input
            id="confirmPassword"
            type="password"
            required
            value={form.confirmPassword}
            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
            className="input"
          />
        </div>
        {error && <p className="text-sm text-berry-500">{error}</p>}
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("signUpButton")}
        </button>
      </form>

      <p className="text-center text-sm text-ink-400">
        {t("haveAccount")}{" "}
        <Link href="/auth/sign-in" className="font-medium text-primary-500">
          {t("signInInstead")}
        </Link>
      </p>
    </div>
  );
}
