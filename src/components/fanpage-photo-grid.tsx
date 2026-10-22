"use client";

import { useState } from "react";
import { fanpageStrings } from "@/lib/fanpage-strings";
import { Lightbox } from "@/components/fanpage-post-card";

/** The fanpage sidebar's "Latest photos": a 3×3 grid that opens full screen. */
export function FanpagePhotoGrid({ imageIds, locale }: { imageIds: string[]; locale: string }) {
  const S = fanpageStrings(locale);
  const [open, setOpen] = useState<number | null>(null);
  const urls = imageIds.map((id) => `/api/posts/images/${id}`);
  return (
    <>
      <div className="grid grid-cols-3 gap-1.5 overflow-hidden rounded-2xl">
        {urls.map((u, i) => (
          <button key={u} type="button" onClick={() => setOpen(i)} className="group aspect-square overflow-hidden bg-lp-surface">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={u} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          </button>
        ))}
      </div>
      {open !== null && <Lightbox urls={urls} start={open} onClose={() => setOpen(null)} S={S} />}
    </>
  );
}
