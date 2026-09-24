"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { Loader2, Check } from "lucide-react";

export interface ContactLinks {
  phone: string | null;
  email: string | null;
  website: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  tiktokUrl: string | null;
  youtubeUrl: string | null;
  googleMapsUrl: string | null;
  whatsapp: string | null;
}

export function ContactLinksCard({ contact }: { contact: ContactLinks }) {
  const locale = useLocale();
  const [form, setForm] = useState({
    phone: contact.phone ?? "",
    email: contact.email ?? "",
    website: contact.website ?? "",
    facebookUrl: contact.facebookUrl ?? "",
    instagramUrl: contact.instagramUrl ?? "",
    tiktokUrl: contact.tiktokUrl ?? "",
    youtubeUrl: contact.youtubeUrl ?? "",
    googleMapsUrl: contact.googleMapsUrl ?? "",
    whatsapp: contact.whatsapp ?? "",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    setError(false);
    const res = await fetch("/api/business/contact-links", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    if (res.ok) {
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } else {
      setError(true);
    }
  }

  const field = (key: keyof typeof form, label: string, placeholder?: string) => (
    <div>
      <label className="label">{label}</label>
      <input
        className="input"
        value={form[key]}
        onChange={(e) => setForm({ ...form, [key]: e.target.value })}
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">
        {locale === "vi" ? "Liên hệ & mạng xã hội" : "Contact & social links"}
      </h2>
      <p className="mb-3 text-xs text-ink-400">
        {locale === "vi"
          ? "Hiển thị trên trang công khai của salon để khách liên hệ trực tiếp."
          : "Shown on your public page so customers can reach you directly."}
      </p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {field("phone", locale === "vi" ? "Số điện thoại" : "Phone number", "+84 90 123 4567")}
        {field("email", "Email", "salon@example.com")}
        {field("website", locale === "vi" ? "Website" : "Website", "https://...")}
        {field("whatsapp", "WhatsApp", "+84 90 123 4567")}
        {field("facebookUrl", "Facebook", "https://facebook.com/...")}
        {field("instagramUrl", "Instagram", "https://instagram.com/...")}
        {field("tiktokUrl", "TikTok", "https://tiktok.com/@...")}
        {field("youtubeUrl", "YouTube", "https://youtube.com/@...")}
        {field("googleMapsUrl", "Google Maps", "https://maps.google.com/...")}
      </div>

      {error && (
        <p className="mt-2 text-xs text-berry-500">
          {locale === "vi"
            ? "Vui lòng kiểm tra lại định dạng đường link/email."
            : "Please check the link/email format."}
        </p>
      )}

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
