"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations } from "next-intl";
import { Loader2 } from "lucide-react";

/** The "already have an account? sign in" alternate to the inline guest
 * registration fields on the booking widget's final step (see
 * BookingWidget) — a signed-out returning customer signs in right here,
 * and the parent's useSession() flips to "authenticated" on its own once
 * this resolves, with no navigation and none of their booking selections
 * lost. */
export function SignInForm() {
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
