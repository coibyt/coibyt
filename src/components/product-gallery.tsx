"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ imageIds, name }: { imageIds: string[]; name: string }) {
  const [active, setActive] = useState(0);

  if (imageIds.length === 0) {
    return <div className="aspect-square w-full rounded-2xl bg-mist-100" />;
  }

  return (
    <div>
      <div className="aspect-square w-full overflow-hidden rounded-2xl bg-mist-100">
        <Image
          src={`/api/product-image/${imageIds[active]}`}
          alt={name}
          width={600}
          height={600}
          className="h-full w-full object-cover"
        />
      </div>
      {imageIds.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {imageIds.map((id, i) => (
            <button
              key={id}
              onClick={() => setActive(i)}
              className={`h-16 w-16 shrink-0 overflow-hidden rounded-lg ring-2 ${
                i === active ? "ring-primary-500" : "ring-transparent"
              }`}
            >
              <Image
                src={`/api/product-image/${id}`}
                alt=""
                width={64}
                height={64}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
