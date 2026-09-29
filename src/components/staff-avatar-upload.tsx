"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

/** A staff member's avatar photo — only shown once the staff row already
 * exists (the upload endpoint is keyed by staff id), same restriction as
 * highlight images on the landing editor. */
export function StaffAvatarUpload({
  staffId,
  initialUrl,
  uploadLabel,
  removeLabel,
  errorLabel,
}: {
  staffId: string;
  initialUrl: string | null;
  uploadLabel: string;
  removeLabel: string;
  errorLabel: string;
}) {
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
    const res = await fetch(`/api/business/staff/${staffId}/avatar`, { method: "POST", body: form });
    setBusy(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    const data = await res.json();
    setUrl(data.url);
  }

  async function remove() {
    setBusy(true);
    await fetch(`/api/business/staff/${staffId}/avatar`, { method: "DELETE" });
    setBusy(false);
    setUrl(null);
  }

  return (
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
        {uploadLabel}
      </button>
      {url && (
        <button
          type="button"
          onClick={remove}
          disabled={busy}
          className="btn-ghost !px-3 !py-1.5 text-xs !text-berry-500"
        >
          <X className="h-3.5 w-3.5" />
          {removeLabel}
        </button>
      )}
      {error && <span className="text-xs text-berry-500">{errorLabel}</span>}
    </div>
  );
}
