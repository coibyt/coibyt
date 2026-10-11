"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loader2, Upload, X } from "lucide-react";

export function AccountAvatarCard({ initialUrl }: { initialUrl: string | null }) {
  const t = useTranslations("settingsCards");
  const [url, setUrl] = useState(initialUrl);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    if (file.size > 5 * 1024 * 1024 || !["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError(true);
      return;
    }
    setBusy(true);
    setError(false);
    const form = new FormData();
    form.append("file", file);
    const res = await fetch("/api/account/avatar", { method: "POST", body: form });
    setBusy(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    const data = await res.json();
    setUrl(data.url);
    // The nav menu's avatar reads from the session, which only refreshes on
    // navigation/refetch — reload so it (and anywhere else) picks this up.
    window.location.reload();
  }

  async function remove() {
    setBusy(true);
    await fetch("/api/account/avatar", { method: "DELETE" });
    setBusy(false);
    setUrl(null);
    window.location.reload();
  }

  return (
    <div className="card p-5">
      <h2 className="mb-1 font-semibold text-ink-900">{t("avatarTitle")}</h2>
      <p className="mb-3 text-xs text-ink-400">{t("avatarSubtitle")}</p>
      <div className="flex items-center gap-3">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-mist-100">
          {url && <Image src={url} alt="" fill className="object-cover" />}
          {busy && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/70">
              <Loader2 className="h-4 w-4 animate-spin text-ink-700" />
            </div>
          )}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          hidden
          onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={busy}
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          <Upload className="h-3.5 w-3.5" />
          {t("uploadAvatar")}
        </button>
        {url && (
          <button
            type="button"
            onClick={remove}
            disabled={busy}
            className="btn-ghost !px-3 !py-1.5 text-xs !text-berry-500"
          >
            <X className="h-3.5 w-3.5" />
            {t("removeAvatar")}
          </button>
        )}
      </div>
      {error && <p className="mt-2 text-xs text-berry-500">{t("avatarError")}</p>}
    </div>
  );
}
