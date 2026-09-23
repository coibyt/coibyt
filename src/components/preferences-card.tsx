"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Loader2, Check } from "lucide-react";
import { routing } from "@/i18n/routing";

const LOCALE_LABELS: Record<string, string> = {
  vi: "Tiếng Việt",
  en: "English",
  fi: "Suomi",
  pl: "Polski",
  de: "Deutsch",
  km: "ខ្មែរ",
  th: "ไทย",
};

const CANCEL_WINDOW_OPTIONS = [12, 24, 48, 72];

export interface BusinessPreferences {
  defaultLocale: string;
  defaultCurrency: string;
  cancellationWindowHours: number;
}

export function PreferencesCard({ preferences }: { preferences: BusinessPreferences }) {
  const locale = useLocale();
  const [form, setForm] = useState(preferences);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/business/preferences", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">
        {locale === "vi" ? "Tùy chọn salon" : "Salon preferences"}
      </h2>
      <p className="mb-3 text-xs text-ink-400">
        {locale === "vi"
          ? "Ngôn ngữ mặc định cho mã nhúng, tiền tệ mặc định cho dịch vụ mới, và chính sách hủy lịch."
          : "Default language for your embed code, default currency for new services, and your cancellation policy."}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div>
          <label className="label">{locale === "vi" ? "Ngôn ngữ mặc định" : "Default language"}</label>
          <select
            className="input"
            value={form.defaultLocale}
            onChange={(e) => setForm({ ...form, defaultLocale: e.target.value })}
          >
            {routing.locales.map((l) => (
              <option key={l} value={l}>
                {LOCALE_LABELS[l] ?? l}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="label">{locale === "vi" ? "Tiền tệ mặc định" : "Default currency"}</label>
          <select
            className="input"
            value={form.defaultCurrency}
            onChange={(e) => setForm({ ...form, defaultCurrency: e.target.value })}
          >
            <option value="VND">VND</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
        <div>
          <label className="label">
            {locale === "vi" ? "Khách được hủy trước" : "Customers can cancel up to"}
          </label>
          <select
            className="input"
            value={form.cancellationWindowHours}
            onChange={(e) =>
              setForm({ ...form, cancellationWindowHours: Number(e.target.value) })
            }
          >
            {CANCEL_WINDOW_OPTIONS.map((h) => (
              <option key={h} value={h}>
                {locale === "vi" ? `${h} giờ trước lịch hẹn` : `${h} hours before`}
              </option>
            ))}
          </select>
        </div>
      </div>

      <button onClick={save} disabled={saving} className="btn-primary mt-4 !px-4 !py-2 text-xs">
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : saved ? (
          <Check className="h-3.5 w-3.5" />
        ) : null}
        {locale === "vi" ? "Lưu" : "Save"}
      </button>
    </div>
  );
}
