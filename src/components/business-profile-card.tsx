"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Loader2, Check } from "lucide-react";
import { AddressAutocomplete, type AddressSuggestion } from "@/components/address-autocomplete";
import { COUNTRIES } from "@/lib/countries";
import { categoryName } from "@/lib/category-names";

interface CategoryOption {
  id: string;
  nameVi: string;
  nameEn: string;
}

export function BusinessProfileCard({
  name: initialName,
  description: initialDescription,
  addressLine: initialAddressLine,
  city: initialCity,
  lat: initialLat,
  lng: initialLng,
  country: initialCountry,
  categories,
  selectedCategoryIds,
}: {
  name: string;
  description: string | null;
  addressLine: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
  country: string;
  categories: CategoryOption[];
  selectedCategoryIds: string[];
}) {
  const locale = useLocale();
  const t = useTranslations("settingsCards");
  const tCommon = useTranslations("common");
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription ?? "");
  const [addressLine, setAddressLine] = useState(initialAddressLine ?? "");
  const [city, setCity] = useState(initialCity ?? "");
  const [pin, setPin] = useState<{ lat: number; lng: number } | null>(
    initialLat !== null && initialLng !== null ? { lat: initialLat, lng: initialLng } : null
  );
  const [country, setCountry] = useState<string>(initialCountry);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(selectedCategoryIds));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Country names come from the browser's own locale data, so every language
  // gets proper names without a hand-maintained translation table.
  const countryOptions = useMemo(() => {
    let display: Intl.DisplayNames | null = null;
    try {
      display = new Intl.DisplayNames([locale], { type: "region" });
    } catch {
      display = null;
    }
    return COUNTRIES.map((c) => ({ code: c.code, label: display?.of(c.code) ?? c.name })).sort(
      (a, b) => a.label.localeCompare(b.label, locale)
    );
  }, [locale]);

  function onAddressSelect(s: AddressSuggestion) {
    setAddressLine(s.addressLine ?? addressLine);
    setCity(s.city ?? city);
    setPin({ lat: s.lat, lng: s.lng });
    if (s.countryCode) setCountry(s.countryCode.toUpperCase());
  }

  function toggleCategory(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  async function save() {
    if (selectedIds.size === 0) {
      setError(t("selectCategory"));
      return;
    }
    setSaving(true);
    setError(null);
    setSaved(false);
    const res = await fetch("/api/business/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        description,
        addressLine,
        city,
        lat: pin?.lat,
        lng: pin?.lng,
        country,
        categoryIds: Array.from(selectedIds),
      }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setError(t("genericError"));
    }
  }

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">{t("profileTitle")}</h2>
      <p className="mb-3 text-xs text-ink-400">{t("profileSubtitle")}</p>

      <div className="space-y-3">
        <div>
          <label className="label">{t("salonName")}</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label className="label">{t("description")}</label>
          <p className="mb-1 text-xs text-ink-400">{t("descriptionHint")}</p>
          <textarea
            rows={3}
            maxLength={2000}
            className="input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="label">{t("address")}</label>
          <AddressAutocomplete
            value={addressLine}
            onChange={setAddressLine}
            onSelect={onAddressSelect}
            pin={pin}
            onPinDrag={(lat, lng) => setPin({ lat, lng })}
          />
        </div>

        <div>
          <label className="label">{t("city")}</label>
          <input className="input" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>

        <div>
          <label className="label">{t("country")}</label>
          <p className="mb-1 text-xs text-ink-400">{t("countryHint")}</p>
          <select className="input" value={country} onChange={(e) => setCountry(e.target.value)}>
            {countryOptions.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <p className="label">{t("categories")}</p>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {categories.map((c) => (
              <label
                key={c.id}
                className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2 text-sm transition-colors ${
                  selectedIds.has(c.id)
                    ? "border-primary-500 bg-primary-50"
                    : "border-ink-100 hover:border-ink-400"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedIds.has(c.id)}
                  onChange={() => toggleCategory(c.id)}
                />
                {categoryName(locale, c)}
              </label>
            ))}
          </div>
        </div>
      </div>

      {error && <p className="mt-2 text-xs text-berry-500">{error}</p>}

      <button onClick={save} disabled={saving} className="btn-primary mt-4 !px-4 !py-2 text-xs">
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : saved ? (
          <Check className="h-3.5 w-3.5" />
        ) : null}
        {tCommon("save")}
      </button>
    </div>
  );
}
