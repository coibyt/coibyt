"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, ShoppingBag, X } from "lucide-react";

/** The product page's photos: a large swipeable image with thumbnails, and
 * a full-screen viewer on click. Uses the shop's lp-* palette. */
export function ProductGallery({
  imageIds,
  name,
  labels,
  badge,
}: {
  imageIds: string[];
  name: string;
  labels: { prev: string; next: string; close: string };
  /** e.g. the "−20%" chip, laid over the corner. */
  badge?: React.ReactNode;
}) {
  const [active, setActive] = useState(0);
  const [zoom, setZoom] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = imageIds.length;
  const go = (d: number) => setActive((i) => (i + d + count) % count);

  useEffect(() => {
    if (!zoom) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoom(false);
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoom]);

  if (count === 0) {
    return (
      <div className="relative flex aspect-square w-full items-center justify-center rounded-[2rem] bg-lp-surface ring-1 ring-lp-line">
        <ShoppingBag className="h-16 w-16 text-lp-gold/50" strokeWidth={1} />
        {badge}
      </div>
    );
  }

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => (touchX.current = e.touches[0].clientX),
    onTouchEnd: (e: React.TouchEvent) => {
      if (touchX.current === null) return;
      const dx = e.changedTouches[0].clientX - touchX.current;
      touchX.current = null;
      if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    },
  };

  const arrow = (dir: -1 | 1, className: string) => (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        go(dir);
      }}
      aria-label={dir < 0 ? labels.prev : labels.next}
      className={className}
    >
      {dir < 0 ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
    </button>
  );

  return (
    <div className="lg:flex lg:flex-row-reverse lg:gap-4">
      <div className="group relative aspect-square w-full overflow-hidden rounded-[2rem] bg-lp-surface ring-1 ring-lp-line" {...swipe}>
        <button type="button" onClick={() => setZoom(true)} className="absolute inset-0 cursor-zoom-in" aria-label={name}>
          {imageIds.map((id, i) => (
            <Image
              key={id}
              src={`/api/product-image/${id}`}
              alt={i === 0 ? name : ""}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </button>
        {badge}
        <span className="pointer-events-none absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-lp-card/85 text-lp-ink opacity-0 shadow backdrop-blur transition-opacity group-hover:opacity-100">
          <Expand className="h-4 w-4" />
        </span>
        {count > 1 && (
          <>
            {arrow(
              -1,
              "absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-lp-card/90 text-lp-ink shadow-lg backdrop-blur transition-all hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100"
            )}
            {arrow(
              1,
              "absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-lp-card/90 text-lp-ink shadow-lg backdrop-blur transition-all hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100"
            )}
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center gap-1.5 lg:hidden">
              {imageIds.map((id, i) => (
                <span key={id} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-lp-card" : "w-1.5 bg-lp-card/60"}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none] lg:mt-0 lg:w-20 lg:shrink-0 lg:flex-col lg:overflow-visible">
          {imageIds.map((id, i) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl transition-all ${
                i === active ? "ring-2 ring-lp-accent ring-offset-2 ring-offset-lp-bg" : "opacity-70 ring-1 ring-lp-line hover:opacity-100"
              }`}
            >
              <Image src={`/api/product-image/${id}`} alt="" fill sizes="80px" className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div className="fixed inset-0 z-[60] flex flex-col bg-black/95 animate-fade-in" onClick={() => setZoom(false)}>
          <div className="flex items-center justify-between p-4 text-white/80">
            <span className="text-sm tabular-nums">
              {active + 1} / {count}
            </span>
            <button
              type="button"
              onClick={() => setZoom(false)}
              aria-label={labels.close}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex-1" {...swipe}>
            <Image src={`/api/product-image/${imageIds[active]}`} alt={name} fill sizes="100vw" className="object-contain" />
            {count > 1 && (
              <>
                {arrow(-1, "absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20")}
                {arrow(1, "absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20")}
              </>
            )}
          </div>
          {count > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto p-4" onClick={(e) => e.stopPropagation()}>
              {imageIds.map((id, i) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl ${i === active ? "ring-2 ring-white" : "opacity-50 hover:opacity-90"}`}
                >
                  <Image src={`/api/product-image/${id}`} alt="" fill sizes="56px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
