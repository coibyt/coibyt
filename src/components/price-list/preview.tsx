"use client";

import { useEffect, useRef, useState } from "react";
import { drawPage } from "@/lib/price-list/canvas";
import type { Page } from "@/lib/price-list/layout";

function PageCanvas({ page, logo, width }: { page: Page; logo: HTMLImageElement | null; width: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current;
    if (!c || width <= 0) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2.5);
    const scale = (width / page.w) * dpr;
    c.width = Math.round(page.w * scale);
    c.height = Math.round(page.h * scale);
    drawPage(c.getContext("2d")!, page, scale, logo);
  }, [page, logo, width]);
  return (
    <canvas
      ref={ref}
      style={{ width, height: (width * page.h) / page.w }}
      className="block rounded-md bg-white shadow-[0_8px_30px_rgba(31,24,45,0.18)]"
    />
  );
}

/** All laid-out pages, scaled to the column width. */
export function PriceListPreview({ pages, logo, pageLabel }: { pages: Page[]; logo: HTMLImageElement | null; pageLabel: (n: number) => string }) {
  const box = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setWidth(el.clientWidth));
    ro.observe(el);
    setWidth(el.clientWidth);
    return () => ro.disconnect();
  }, []);
  const first = pages[0];
  // Square posts and short pages shouldn't fill a tall column edge to edge.
  const w = first ? Math.min(width, first.w >= first.h ? 520 : 640) : width;
  return (
    <div ref={box} className="space-y-5">
      {pages.map((p, i) => (
        <figure key={i} className="flex flex-col items-center">
          <PageCanvas page={p} logo={logo} width={w} />
          {pages.length > 1 && <figcaption className="mt-2 text-xs font-semibold text-ink-400">{pageLabel(i + 1)}</figcaption>}
        </figure>
      ))}
    </div>
  );
}
