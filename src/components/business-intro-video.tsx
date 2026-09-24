"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { toYoutubeEmbedUrl } from "@/lib/youtube";

export function BusinessIntroVideo({
  videoUrl,
  businessName,
  locale,
}: {
  videoUrl: string;
  businessName: string;
  locale: string;
}) {
  const [playing, setPlaying] = useState(false);
  const embedUrl = toYoutubeEmbedUrl(videoUrl);
  if (!embedUrl) return null;

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={() => setPlaying((p) => !p)}
        className="flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:underline"
      >
        <PlayCircle className="h-4 w-4" />
        {locale === "vi" ? "Xem video giới thiệu" : "Watch intro video"}
      </button>
      {playing && (
        <div className="mt-2 aspect-video w-full max-w-md overflow-hidden rounded-xl">
          <iframe
            src={embedUrl}
            title={businessName}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}
