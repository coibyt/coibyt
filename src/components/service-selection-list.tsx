"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { formatMoney } from "@/lib/money";

export interface SelectableService {
  id: string;
  name: string;
  description?: string | null;
  durationMin: number;
  priceCents: number;
  currency: string;
  videoUrl?: string | null;
}

function toYoutubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    let videoId: string | null = null;
    if (u.hostname.includes("youtu.be")) {
      videoId = u.pathname.slice(1);
    } else if (u.hostname.includes("youtube.com")) {
      videoId = u.searchParams.get("v") ?? (u.pathname.startsWith("/embed/") ? u.pathname.split("/")[2] : null);
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  } catch {
    return null;
  }
}

/** Lets a customer check off several services (e.g. a manicure and a
 * pedicure) to book together in one visit, matching Timma's "select
 * multiple, then continue" flow instead of one "book now" button per row. */
export function ServiceSelectionList({
  services,
  locale,
  bookBasePath,
  extraQueryParams,
}: {
  services: SelectableService[];
  locale: string;
  /** e.g. "/embed/moja-beauty/book" or "/b/moja-beauty/book" — the service id
   * and any "extra" query param are appended to this. Plain data instead of
   * a callback: functions can't cross the server/client component boundary. */
  bookBasePath: string;
  extraQueryParams?: Record<string, string>;
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  function buildHref(serviceId: string, extraServiceIds: string[]) {
    const params = new URLSearchParams(extraQueryParams);
    if (extraServiceIds.length) params.set("extra", extraServiceIds.join(","));
    const qs = params.toString();
    return `${bookBasePath}/${serviceId}${qs ? `?${qs}` : ""}`;
  }

  function toggle(id: string) {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const checkedIds = Array.from(checked);
  const total = services
    .filter((s) => checked.has(s.id))
    .reduce((sum, s) => sum + s.priceCents, 0);
  const currency = services[0]?.currency ?? "VND";

  if (services.length === 0) {
    return (
      <p className="text-sm text-ink-400">
        {locale === "vi" ? "Chưa có dịch vụ nào." : "No services yet."}
      </p>
    );
  }

  return (
    <div className="relative">
      <div className="space-y-3 pb-20">
        {services.map((s) => {
          const embedUrl = s.videoUrl ? toYoutubeEmbedUrl(s.videoUrl) : null;
          return (
            <div
              key={s.id}
              className={`rounded-2xl border p-4 transition-colors ${
                checked.has(s.id)
                  ? "border-primary-500 bg-primary-50"
                  : "border-ink-100 bg-white hover:border-ink-400"
              }`}
            >
              <label className="flex cursor-pointer items-start justify-between gap-4">
                <span className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={checked.has(s.id)}
                    onChange={() => toggle(s.id)}
                  />
                  <span>
                    <span className="block font-semibold text-ink-900">{s.name}</span>
                    {s.description && (
                      <span
                        className={`mt-0.5 block text-sm text-ink-400 ${
                          checked.has(s.id) ? "" : "line-clamp-1"
                        }`}
                      >
                        {s.description}
                      </span>
                    )}
                    <span className="mt-1 flex items-center gap-2 text-xs text-ink-400">
                      {s.durationMin} min
                      {embedUrl && (
                        <button
                          type="button"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={(e) => {
                            e.preventDefault();
                            setPlayingVideoId((prev) => (prev === s.id ? null : s.id));
                          }}
                          className="flex items-center gap-1 font-medium text-primary-600 hover:underline"
                        >
                          <PlayCircle className="h-3.5 w-3.5" />
                          {locale === "vi" ? "Xem video" : "Watch video"}
                        </button>
                      )}
                    </span>
                  </span>
                </span>
                <span className="shrink-0 font-semibold text-ink-900">
                  {formatMoney(s.priceCents, s.currency, locale)}
                </span>
              </label>
              {embedUrl && playingVideoId === s.id && (
                <div className="mt-3 aspect-video w-full overflow-hidden rounded-xl">
                  <iframe
                    src={embedUrl}
                    title={s.name}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {checked.size > 0 && (
        <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink-900 px-5 py-3.5 text-white shadow-popover">
          <span className="text-sm">
            {locale === "vi"
              ? `Đã chọn ${checked.size} dịch vụ`
              : `${checked.size} service${checked.size > 1 ? "s" : ""} selected`}
            {" · "}
            {formatMoney(total, currency, locale)}
          </span>
          <a href={buildHref(checkedIds[0], checkedIds.slice(1))} className="btn-accent !px-4 !py-2 text-xs">
            {locale === "vi" ? "Tiếp tục" : "Continue"}
          </a>
        </div>
      )}
    </div>
  );
}
