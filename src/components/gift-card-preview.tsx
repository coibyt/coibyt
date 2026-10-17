"use client";

import { useEffect, useRef, useState } from "react";
import { GIFT_CARD_HEIGHT, GIFT_CARD_WIDTH, GiftCardDesign, type GiftCardDesignProps } from "@/components/gift-card-design";

/** The exact design that gets rendered into the emailed PNG, scaled down to
 * whatever width its container has. */
export function GiftCardPreview(props: Omit<GiftCardDesignProps, "fontFamily">) {
  const boxRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / GIFT_CARD_WIDTH);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={boxRef}
      className="relative w-full overflow-hidden rounded-[18px] shadow-2xl shadow-primary-900/30 sm:rounded-[24px]"
      style={{ aspectRatio: `${GIFT_CARD_WIDTH} / ${GIFT_CARD_HEIGHT}` }}
    >
      {scale > 0 && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          <GiftCardDesign {...props} fontFamily="inherit" />
        </div>
      )}
    </div>
  );
}
