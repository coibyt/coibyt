"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles, Heart, Scissors } from "lucide-react";

const SLIDE_INTERVAL_MS = 4500;

// Shown until the salon uploads its own photos — a few soft gradient panels
// with a large translucent icon, styled from the site's own design tokens
// so it always looks intentional rather than like an empty placeholder.
const DEFAULT_SLIDES = [
  { className: "from-peach-100 via-peach-50 to-mist-100", Icon: Sparkles },
  { className: "from-primary-100 via-mist-50 to-peach-50", Icon: Scissors },
  { className: "from-mist-100 via-peach-50 to-primary-50", Icon: Heart },
];

/** The homepage hero's rotating image slider — real photos once the salon
 * uploads them via the landing-page editor (up to 5, see hero-slides-manager),
 * otherwise a tasteful generated placeholder so the page never looks bare. */
export function HeroSlider({ images }: { images: string[] }) {
  const slideCount = images.length > 0 ? images.length : DEFAULT_SLIDES.length;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slideCount <= 1) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slideCount), SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [slideCount]);

  return (
    <div className="relative aspect-square w-full flex-1 overflow-hidden rounded-[2rem] bg-mist-100 sm:aspect-[4/3]">
      {images.length > 0
        ? images.map((url, i) => (
            <Image
              key={url}
              src={url}
              alt=""
              fill
              priority={i === 0}
              className={`object-cover transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))
        : DEFAULT_SLIDES.map(({ className, Icon }, i) => (
            <div
              key={i}
              className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-1000 ${className} ${
                i === active ? "opacity-100" : "opacity-0"
              }`}
            >
              <Icon className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 text-white/50" />
            </div>
          ))}

      {slideCount > 1 && (
        <div className="absolute inset-x-0 bottom-4 flex justify-center gap-1.5">
          {Array.from({ length: slideCount }, (_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-5 bg-white" : "w-1.5 bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
