"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
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
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    categoryId: categories[0]?.id ?? "",
    addressLine: "",
    city: "",
    phone: "",
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

  if (!isAuthenticated) {
    return (
      <div className="card p-6 text-center">
        <p className="mb-4 text-ink-700">
          {"Vui lòng đăng nhập trước khi đăng ký doanh nghiệp."}
        </p>
        <Link href={`/auth/sign-in?callbackUrl=/business/apply`} className="btn-primary">
          {"Đăng nhập"}
        </Link>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
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
      }),
    });
    setLoading(false);
    if (!res.ok) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
      return;
    }
    router.push("/business/apply");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card space-y-4 p-6">
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
    </form>
  );
}
