"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Loader2, Check } from "lucide-react";

export interface InvoiceInfo {
  invoiceCompanyName: string | null;
  invoiceCompanyAddress: string | null;
  invoiceTaxId: string | null;
  invoiceVatPercent: number | null;
}

/** The billing details printed on every invoice issued from the dashboard's
 * "pay at the counter" checkout (see booking-calendar.tsx) — required once
 * here before that checkout will let the salon issue one. */
export function InvoiceInfoCard({ invoiceInfo }: { invoiceInfo: InvoiceInfo }) {
  const t = useTranslations("settingsCards");
  const [form, setForm] = useState({
    invoiceCompanyName: invoiceInfo.invoiceCompanyName ?? "",
    invoiceCompanyAddress: invoiceInfo.invoiceCompanyAddress ?? "",
    invoiceTaxId: invoiceInfo.invoiceTaxId ?? "",
    invoiceVatPercent: String(invoiceInfo.invoiceVatPercent ?? 0),
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/business/invoice-info", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        invoiceVatPercent: Number(form.invoiceVatPercent) || 0,
      }),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">{t("invoiceTitle")}</h2>
      <p className="mb-3 text-xs text-ink-400">{t("invoiceSubtitle")}</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="label">{t("invoiceCompanyName")}</label>
          <input
            className="input"
            value={form.invoiceCompanyName}
            onChange={(e) => setForm({ ...form, invoiceCompanyName: e.target.value })}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="label">{t("invoiceCompanyAddress")}</label>
          <input
            className="input"
            value={form.invoiceCompanyAddress}
            onChange={(e) => setForm({ ...form, invoiceCompanyAddress: e.target.value })}
          />
        </div>
        <div>
          <label className="label">{t("invoiceTaxId")}</label>
          <input
            className="input"
            value={form.invoiceTaxId}
            onChange={(e) => setForm({ ...form, invoiceTaxId: e.target.value })}
          />
        </div>
        <div>
          <label className="label">{t("invoiceVatPercent")}</label>
          <input
            type="number"
            min={0}
            max={100}
            step={0.1}
            className="input"
            value={form.invoiceVatPercent}
            onChange={(e) => setForm({ ...form, invoiceVatPercent: e.target.value })}
          />
        </div>
      </div>

      <button onClick={save} disabled={saving} className="btn-primary mt-4 !px-4 !py-2 text-xs">
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : saved ? (
          <Check className="h-3.5 w-3.5" />
        ) : null}
        {t("saveInvoiceInfo")}
      </button>
    </div>
  );
}
