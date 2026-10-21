"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Heart, Scissors } from "lucide-react";

const SLIDE_INTERVAL_MS = 5500;

// Shown until the salon uploads its own photos — soft panels in the site's
// own palette with a large translucent icon, so the page never looks bare.
const DEFAULT_SLIDES = [
  { className: "from-lp-accent/35 via-lp-surface to-lp-gold/30", Icon: Sparkles },
  { className: "from-lp-gold/30 via-lp-surface to-lp-accent/30", Icon: Scissors },
  { className: "from-lp-surface via-lp-accent/25 to-lp-gold/25", Icon: Heart },
];

/** The homepage hero's rotating photos — real ones once the salon uploads
 * them (up to 5, see hero-slides-manager), otherwise a generated placeholder.
 * `cover` fills its positioned parent edge to edge (photos behind the text);
 * `frame` is a standalone arched picture. */
export function HeroSlider({ images, variant = "frame" }: { images: string[]; variant?: "frame" | "cover" }) {
  const slideCount = images.length > 0 ? images.length : DEFAULT_SLIDES.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slideCount <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slideCount), SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slideCount]);

  const frame =
    variant === "cover"
      ? "absolute inset-0 overflow-hidden bg-lp-deep"
      : "relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-[2.5rem] bg-lp-surface shadow-[0_40px_80px_-30px_rgba(0,0,0,0.35)]";

  return (
    <div className={frame}>
      {images.length > 0
        ? images.map((url, i) => (
            <Image
              key={url}
              src={url}
              alt=""
              fill
              priority={i === 0}
              sizes={variant === "cover" ? "100vw" : "(min-width: 1024px) 45vw, 100vw"}
              className={`object-cover transition-[opacity,transform] ease-out ${
                i === active ? "scale-[1.06] opacity-100 duration-[6000ms]" : "scale-100 opacity-0 duration-1000"
              }`}
            />
          ))
        : DEFAULT_SLIDES.map(({ className, Icon }, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 ${className} ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Icon
                className={`absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 ${variant === "cover" ? "text-white/10" : "text-white/60"}`}
                strokeWidth={1}
              />
            </div>
          ))}

      {slideCount > 1 && (
        <div
          className={`absolute z-10 flex gap-1.5 ${
            variant === "cover" ? "bottom-8 right-6 sm:right-10" : "inset-x-0 bottom-6 justify-center"
          }`}
        >
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${i === active ? "w-8 bg-white" : "w-1.5 bg-white/60 hover:bg-white/90"}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
