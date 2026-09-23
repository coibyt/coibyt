"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Loader2, Check } from "lucide-react";

export interface BankInfo {
  bankName: string | null;
  bankAccountNumber: string | null;
  bankAccountName: string | null;
  bankBic: string | null;
}

export function BankInfoCard({ bankInfo }: { bankInfo: BankInfo }) {
  const locale = useLocale();
  const [form, setForm] = useState({
    bankName: bankInfo.bankName ?? "",
    bankAccountNumber: bankInfo.bankAccountNumber ?? "",
    bankAccountName: bankInfo.bankAccountName ?? "",
    bankBic: bankInfo.bankBic ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    const res = await fetch("/api/business/bank-info", {
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
        {locale === "vi" ? "Nhận thanh toán qua chuyển khoản" : "Receive bank transfer payments"}
      </h2>
      <p className="mb-3 text-xs text-ink-400">
        {locale === "vi"
          ? "Khách hàng sẽ thấy thông tin này để chuyển khoản trực tiếp cho salon khi đặt lịch."
          : "Customers will see these details to transfer money directly to your salon when booking."}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label className="label">{locale === "vi" ? "Tên ngân hàng" : "Bank name"}</label>
          <input
            className="input"
            value={form.bankName}
            onChange={(e) => setForm({ ...form, bankName: e.target.value })}
            placeholder={locale === "vi" ? "VD: Vietcombank" : "e.g. Vietcombank"}
          />
        </div>
        <div>
          <label className="label">{locale === "vi" ? "Số tài khoản" : "Account number"}</label>
          <input
            className="input"
            value={form.bankAccountNumber}
            onChange={(e) => setForm({ ...form, bankAccountNumber: e.target.value })}
          />
        </div>
        <div>
          <label className="label">
            {locale === "vi" ? "Tên chủ tài khoản" : "Account holder name"}
          </label>
          <input
            className="input"
            value={form.bankAccountName}
            onChange={(e) => setForm({ ...form, bankAccountName: e.target.value })}
          />
        </div>
        <div>
          <label className="label">{locale === "vi" ? "Mã BIC/SWIFT" : "BIC/SWIFT code"}</label>
          <input
            className="input"
            value={form.bankBic}
            onChange={(e) => setForm({ ...form, bankBic: e.target.value })}
            placeholder={locale === "vi" ? "Không bắt buộc" : "Optional"}
          />
        </div>
      </div>

      <button onClick={save} disabled={saving} className="btn-primary mt-4 !px-4 !py-2 text-xs">
        {saving ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin" />
        ) : saved ? (
          <Check className="h-3.5 w-3.5" />
        ) : null}
        {locale === "vi" ? "Lưu thông tin ngân hàng" : "Save bank details"}
      </button>
    </div>
  );
}
