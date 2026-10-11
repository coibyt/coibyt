"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter, Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";

export function ResetPasswordForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!token) {
    return <p className="text-sm text-berry-500">{t("invalidOrExpiredToken")}</p>;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t("passwordMismatch"));
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/auth/reset-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token, newPassword: password }),
    });
    if (!res.ok) {
      setLoading(false);
      setError(t("invalidOrExpiredToken"));
      return;
    }
    const data = await res.json();
    await signIn("credentials", { email: data.email, password, redirect: false });
    setLoading(false);
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="label" htmlFor="password">
          {t("newPassword")}
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input"
        />
      </div>
      <div>
        <label className="label" htmlFor="confirmPassword">
          {t("confirmPassword")}
        </label>
        <input
          id="confirmPassword"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="input"
        />
      </div>
      {error && <p className="text-sm text-berry-500">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {t("resetPasswordButton")}
      </button>
      <p className="text-center text-sm text-ink-400">
        <Link href="/auth/sign-in" className="font-medium text-primary-500">
          {t("backToSignIn")}
        </Link>
      </p>
    </form>
  );
}
