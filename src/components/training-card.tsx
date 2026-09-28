"use client";

import { useState } from "react";
import { ExternalLink, PlayCircle } from "lucide-react";
import { toYoutubeEmbedUrl } from "@/lib/youtube";

/** One training item: YouTube links play inline, anything else opens in a new tab. */
export function TrainingCard({
  title,
  description,
  url,
  watchLabel,
  openLabel,
}: {
  title: string;
  description: string | null;
  url: string;
  watchLabel: string;
  openLabel: string;
}) {
  const embedUrl = toYoutubeEmbedUrl(url);
  const [playing, setPlaying] = useState(false);

  return (
    <div className="card space-y-3 p-5">
      <div>
        <p className="font-semibold text-ink-900">{title}</p>
        {description && (
          <p className="mt-1 whitespace-pre-line text-sm text-ink-700">{description}</p>
        )}
      </div>
      {embedUrl ? (
        playing ? (
          <div className="aspect-video w-full overflow-hidden rounded-xl">
            <iframe
              src={embedUrl}
              title={title}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="btn-outline !px-3 !py-1.5 text-xs"
          >
            <PlayCircle className="h-3.5 w-3.5" /> {watchLabel}
          </button>
        )
      ) : (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline !px-3 !py-1.5 text-xs"
        >
          <ExternalLink className="h-3.5 w-3.5" /> {openLabel}
        </a>
      )}
    </div>
  );
}
