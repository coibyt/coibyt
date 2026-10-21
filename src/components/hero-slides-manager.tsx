"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loader2, Upload, X } from "lucide-react";

/** A row of independent photo slots on the landing editor — each one
 * uploads or removes its own picture (slot names `${slotPrefix}0`, `…1`, …).
 * Used for the hero's rotating slider (5) and the photo gallery (8). Empty
 * hero slots fall back to a generated placeholder on the public page, so the
 * owner never has to fill them all. */
export function ImageSlotsManager({
  initialUrls,
  slotPrefix,
  count,
  label,
  hint,
}: {
  initialUrls: (string | null)[];
  slotPrefix: string;
  count: number;
  label: string;
  hint?: string;
}) {
  const [urls, setUrls] = useState<(string | null)[]>(() => {
    const padded = [...initialUrls];
    while (padded.length < count) padded.push(null);
    return padded.slice(0, count);
  });

  return (
    <div>
      <p className="label">{label}</p>
      {hint && <p className="mb-2 text-xs text-ink-400">{hint}</p>}
      <div className={`grid gap-3 ${count % 4 === 0 ? "grid-cols-4" : "grid-cols-3 sm:grid-cols-5"}`}>
        {urls.map((url, i) => (
          <SlideSlot
            key={i}
            slot={`${slotPrefix}${i}`}
            url={url}
            onChange={(newUrl) => setUrls((prev) => prev.map((u, j) => (j === i ? newUrl : u)))}
          />
        ))}
      </div>
    </div>
  );
}

/** Up to 5 photos for the homepage hero's rotating slider. */
export function HeroSlidesManager({ initialUrls }: { initialUrls: (string | null)[] }) {
  const tDash = useTranslations("dashboard");
  return (
    <ImageSlotsManager
      initialUrls={initialUrls}
      slotPrefix="hero-slide-"
      count={5}
      label={tDash("landing.heroSlides")}
      hint={tDash("landing.heroSlidesHint")}
    />
  );
}

function SlideSlot({
  slot,
  url,
  onChange,
}: {
  slot: string;
  url: string | null;
  onChange: (url: string | null) => void;
}) {
  const tDash = useTranslations("dashboard");
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
    form.append("slot", slot);
    const res = await fetch("/api/business/landing/image", { method: "POST", body: form });
    setBusy(false);
    if (!res.ok) {
      setError(true);
      return;
    }
    const data = await res.json();
    onChange(data.url);
  }

  async function remove() {
    setBusy(true);
    await fetch("/api/business/landing/image", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slot }),
    });
    setBusy(false);
    onChange(null);
  }

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-dashed border-ink-100 bg-mist-50 transition-colors hover:border-primary-300">
      {url && <Image src={url} alt="" fill className="object-cover" />}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={(e) => e.target.files?.[0] && upload(e.target.files[0])}
      />
      {busy ? (
        <div className="absolute inset-0 flex items-center justify-center bg-white/70">
          <Loader2 className="h-4 w-4 animate-spin text-ink-700" />
        </div>
      ) : url ? (
        <button
          type="button"
          onClick={remove}
          aria-label={tDash("landing.removeImage")}
          className="absolute right-1.5 top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-ink-900/70 text-white backdrop-blur hover:bg-berry-500"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-full w-full flex-col items-center justify-center gap-1 text-ink-400 hover:text-primary-600"
        >
          <Upload className="h-5 w-5" />
        </button>
      )}
      {error && (
        <div className="absolute inset-x-0 bottom-0 bg-berry-500/90 text-center text-[10px] leading-tight text-white">
          !
        </div>
      )}
    </div>
  );
}
