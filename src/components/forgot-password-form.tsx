"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";

export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await fetch("/api/auth/forgot-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    // Always show the same confirmation, whether or not the email exists.
    setSent(true);
  }

  if (sent) {
    return <p className="text-sm text-ink-700">{t("resetLinkSent")}</p>;
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-ink-400">{t("forgotPasswordHint")}</p>
      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="label" htmlFor="email">
            {t("email")}
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </div>
        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {t("sendResetLink")}
        </button>
      </form>
      <p className="text-center text-sm text-ink-400">
        <Link href="/auth/sign-in" className="font-medium text-primary-500">
          {t("backToSignIn")}
        </Link>
      </p>
    </div>
  );
}
