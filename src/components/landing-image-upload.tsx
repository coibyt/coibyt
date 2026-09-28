"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Loader2, Upload, X } from "lucide-react";

/** One image slot on the landing editor — a small square preview with an
 * upload button, shared by the hero, intro and every highlight card. */
export function LandingImageUpload({
  slot,
  initialUrl,
  onUploaded,
  uploadLabel,
  tooLargeError,
  unsupportedError,
}: {
  slot: string;
  initialUrl: string | null;
  onUploaded: (url: string) => void;
  uploadLabel: string;
  tooLargeError: string;
  unsupportedError: string;
}) {
  const [url, setUrl] = useState(initialUrl);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function upload(file: File) {
    if (file.size > 5 * 1024 * 1024) {
      setError(tooLargeError);
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError(unsupportedError);
      return;
    }
    setUploading(true);
    setError(null);
    const form = new FormData();
    form.append("file", file);
    form.append("slot", slot);
    const res = await fetch("/api/business/landing/image", { method: "POST", body: form });
    setUploading(false);
    if (!res.ok) {
      setError(unsupportedError);
      return;
    }
    const data = await res.json();
    setUrl(data.url);
    onUploaded(data.url);
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-mist-100">
        {url && <Image src={url} alt="" fill className="object-cover" />}
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
        disabled={uploading}
        className="btn-outline !px-3 !py-1.5 text-xs"
      >
        {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
        {uploadLabel}
      </button>
      {error && <span className="flex items-center gap-1 text-xs text-berry-500"><X className="h-3 w-3" />{error}</span>}
    </div>
  );
}
