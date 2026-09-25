"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useTranslations, useLocale } from "next-intl";
import { useRouter, Link } from "@/i18n/navigation";
import { Loader2 } from "lucide-react";
import { AddressAutocomplete, type AddressSuggestion } from "@/components/address-autocomplete";
import { COUNTRIES } from "@/lib/countries";

export function BusinessApplyForm({
  categories,
  isAuthenticated,
}: {
  categories: { id: string; name: string }[];
  isAuthenticated: boolean;
}) {
  const t = useTranslations("business");
  const tAuth = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: categories[0]?.id ?? "",
    addressLine: "",
    city: "",
    phone: "",
  });
  // Only used when the visitor isn't signed in yet — this application also
  // creates their account, so it needs the same fields regular sign-up does.
  const [account, setAccount] = useState({
    ownerName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(null);
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onAddressSelect(s: AddressSuggestion) {
    setForm((f) => ({
      ...f,
      addressLine: s.addressLine ?? f.addressLine,
      city: s.city ?? f.city,
    }));
    setPin({ lat: s.lat, lng: s.lng });
    // Only pre-fill from the address — never override a country the owner
    // already picked by hand in the select below.
    if (!country && s.countryCode) setCountry(s.countryCode.toUpperCase());
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isAuthenticated && account.password !== account.confirmPassword) {
      setError(tAuth("passwordMismatch"));
      return;
    }
    setLoading(true);
    setError(null);
    const res = await fetch("/api/business/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        lat: pin?.lat,
        lng: pin?.lng,
        country,
        ...(isAuthenticated
          ? {}
          : { ownerName: account.ownerName, email: account.email, password: account.password }),
      }),
    });
    if (!res.ok) {
      setLoading(false);
      const data = await res.json().catch(() => ({}));
      setError(data.error === "EMAIL_IN_USE" ? tAuth("emailInUse") : locale === "vi" ? "Có lỗi xảy ra, vui lòng thử lại." : "Something went wrong, please try again.");
      return;
    }
    if (!isAuthenticated) {
      await signIn("credentials", {
        email: account.email,
        password: account.password,
        redirect: false,
      });
    }
    setLoading(false);
    router.push("/business/apply");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
      {!isAuthenticated && (
        <>
          <div>
            <p className="mb-1 font-semibold text-ink-900">
              {locale === "vi" ? "Tạo tài khoản của bạn" : "Create your account"}
            </p>
            <p className="text-xs text-ink-400">
              {locale === "vi"
                ? "Tài khoản này sẽ là tài khoản đăng nhập của bạn với vai trò chủ salon, đồng thời cũng là tài khoản khách hàng của bạn trên VaraaAi."
                : "This becomes your login as the salon owner — and it's also your own VaraaAi customer account."}
            </p>
          </div>
          <div>
            <label className="label">{tAuth("name")}</label>
            <input
              required
              className="input"
              value={account.ownerName}
              onChange={(e) => setAccount({ ...account, ownerName: e.target.value })}
            />
          </div>
          <div>
            <label className="label">{tAuth("email")}</label>
            <input
              type="email"
              required
              className="input"
              value={account.email}
              onChange={(e) => setAccount({ ...account, email: e.target.value })}
            />
          </div>
          <div>
            <label className="label">{tAuth("password")}</label>
            <input
              type="password"
              required
              minLength={8}
              className="input"
              value={account.password}
              onChange={(e) => setAccount({ ...account, password: e.target.value })}
            />
          </div>
          <div>
            <label className="label">{tAuth("confirmPassword")}</label>
            <input
              type="password"
              required
              className="input"
              value={account.confirmPassword}
              onChange={(e) => setAccount({ ...account, confirmPassword: e.target.value })}
            />
          </div>
          <hr className="border-ink-100" />
        </>
      )}
      <div>
        <label className="label">{t("name")}</label>
        <input
          required
          className="input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{t("description")}</label>
        <textarea
          rows={3}
          className="input"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{t("category")}</label>
        <select
          className="input"
          value={form.categoryId}
          onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">{t("address")}</label>
        <AddressAutocomplete
          value={form.addressLine}
          onChange={(addressLine) => setForm({ ...form, addressLine })}
          onSelect={onAddressSelect}
          pin={pin}
          onPinDrag={(lat, lng) => setPin({ lat, lng })}
        />
      </div>
      <div>
        <label className="label">
          {t("country")}
        </label>
        <p className="mb-1 text-xs text-ink-400">
          {t("countryHint")}
        </p>
        <select
          required
          className="input"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="" disabled>
            {t("countryPlaceholder")}
          </option>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label className="label">{t("city")}</label>
        <input
          required
          className="input"
          value={form.city}
          onChange={(e) => setForm({ ...form, city: e.target.value })}
        />
      </div>
      <div>
        <label className="label">{t("phone")}</label>
        <input
          required
          className="input"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </div>
      {error && <p className="text-sm text-berry-500">{error}</p>}
      <button type="submit" disabled={loading} className="btn-primary w-full">
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {t("submit")}
      </button>
      {!isAuthenticated && (
        <p className="text-center text-xs text-ink-400">
          {tAuth("haveAccount")}{" "}
          <Link href={`/auth/sign-in?callbackUrl=/business/apply`} className="font-medium text-primary-500">
            {tAuth("signInInstead")}
          </Link>
        </p>
      )}
    </form>
  );
}
