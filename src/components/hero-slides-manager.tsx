"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Loader2, Upload, X } from "lucide-react";

const SLOT_COUNT = 5;

/** Up to 5 photos for the homepage hero's rotating slider — each slot is
 * independent (upload replaces, X removes), unlike the single-image slots
 * elsewhere on the landing editor. Empty slots on the public page fall back
 * to a generated placeholder slide (see HeroSlider) rather than being
 * skipped, so the owner doesn't have to fill all 5 to publish. */
export function HeroSlidesManager({
  initialUrls,
}: {
  initialUrls: (string | null)[];
}) {
  const tDash = useTranslations("dashboard");
  const [urls, setUrls] = useState<(string | null)[]>(() => {
    const padded = [...initialUrls];
    while (padded.length < SLOT_COUNT) padded.push(null);
    return padded.slice(0, SLOT_COUNT);
  });

  return (
    <div>
      <p className="label">{tDash("landing.heroSlides")}</p>
      <p className="mb-2 text-xs text-ink-400">{tDash("landing.heroSlidesHint")}</p>
      <div className="flex flex-wrap gap-3">
        {urls.map((url, i) => (
          <SlideSlot
            key={i}
            slot={`hero-slide-${i}`}
            url={url}
            onChange={(newUrl) => setUrls((prev) => prev.map((u, j) => (j === i ? newUrl : u)))}
          />
        ))}
      </div>
    </div>
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
    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-ink-100 bg-mist-100">
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
          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-ink-900/70 text-white"
        >
          <X className="h-3 w-3" />
        </button>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex h-full w-full items-center justify-center text-ink-400 hover:text-ink-700"
        >
          <Upload className="h-4 w-4" />
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
