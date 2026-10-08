"use client";

import { useState } from "react";
import { PlayCircle } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { toYoutubeEmbedUrl } from "@/lib/youtube";

export interface SelectableService {
  id: string;
  name: string;
  description?: string | null;
  durationMin: number;
  priceCents: number;
  currency: string;
  videoUrl?: string | null;
  groupId?: string | null;
  // Already localized server-side (see categoryNameMap in
  // src/lib/service-groups.ts) — this component never needs to know about
  // the Category model itself, just a name to group under.
  categoryName?: string | null;
}

export interface ServiceGroupOption {
  id: string;
  name: string;
}

const LABELS: Record<
  string,
  {
    min: string;
    watchVideo: string;
    noServices: string;
    other: string;
    selected: (n: number) => string;
    continue: string;
  }
> = {
  vi: {
    min: "phút",
    watchVideo: "Xem video",
    noServices: "Chưa có dịch vụ nào.",
    other: "Dịch vụ khác",
    selected: (n) => `Đã chọn ${n} dịch vụ`,
    continue: "Tiếp tục",
  },
  en: {
    min: "min",
    watchVideo: "Watch video",
    noServices: "No services yet.",
    other: "Other services",
    selected: (n) => `${n} service${n > 1 ? "s" : ""} selected`,
    continue: "Continue",
  },
  fi: {
    min: "min",
    watchVideo: "Katso video",
    noServices: "Ei vielä palveluita.",
    other: "Muut palvelut",
    selected: (n) => `${n} palvelua valittu`,
    continue: "Jatka",
  },
  pl: {
    min: "min",
    watchVideo: "Obejrzyj wideo",
    noServices: "Brak usług.",
    other: "Inne usługi",
    selected: (n) => `Wybrano usług: ${n}`,
    continue: "Dalej",
  },
  de: {
    min: "Min.",
    watchVideo: "Video ansehen",
    noServices: "Noch keine Dienstleistungen.",
    other: "Weitere Dienstleistungen",
    selected: (n) => `${n} Dienstleistung${n > 1 ? "en" : ""} ausgewählt`,
    continue: "Weiter",
  },
  km: {
    min: "នាទី",
    watchVideo: "មើលវីដេអូ",
    noServices: "មិនទាន់មានសេវាកម្មទេ។",
    other: "សេវាកម្មផ្សេងៗ",
    selected: (n) => `បានជ្រើសរើស ${n} សេវាកម្ម`,
    continue: "បន្ត",
  },
  th: {
    min: "นาที",
    watchVideo: "ดูวิดีโอ",
    noServices: "ยังไม่มีบริการ",
    other: "บริการอื่นๆ",
    selected: (n) => `เลือกแล้ว ${n} บริการ`,
    continue: "ดำเนินการต่อ",
  },
};

/** Lets a customer check off several services (e.g. a manicure and a
 * pedicure) to book together in one visit, matching Timma's "select
 * multiple, then continue" flow instead of one "book now" button per row.
 * When the salon has defined service groups, services are shown under
 * their group's heading. */
export function ServiceSelectionList({
  services,
  groups = [],
  locale,
  bookBasePath,
  extraQueryParams,
}: {
  services: SelectableService[];
  /** The salon's groups in display order. Services whose group isn't listed
   * here (or that have none) fall under a trailing "other" section. */
  groups?: ServiceGroupOption[];
  locale: string;
  /** e.g. "/embed/moja-beauty/book" or "/b/moja-beauty/book" — the service id
   * and any "extra" query param are appended to this. Plain data instead of
   * a callback: functions can't cross the server/client component boundary. */
  bookBasePath: string;
  extraQueryParams?: Record<string, string>;
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const l = LABELS[locale] ?? LABELS.en;

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
    return <p className="text-sm text-ink-400">{l.noServices}</p>;
  }

  const groupIds = new Set(groups.map((g) => g.id));
  const sections: { key: string; title: string | null; items: SelectableService[] }[] = groups
    .map((g) => ({
      key: g.id,
      title: g.name as string | null,
      items: services.filter((s) => s.groupId === g.id),
    }))
    .filter((section) => section.items.length > 0);

  // Services without a custom group but tagged with one of the platform's
  // standard categories (see Service.categoryId) get their own section too,
  // named after that category in the viewer's own language.
  const afterCustomGroups = services.filter((s) => !s.groupId || !groupIds.has(s.groupId));
  const categoryOrder: string[] = [];
  const byCategory = new Map<string, SelectableService[]>();
  const trulyUngrouped: SelectableService[] = [];
  for (const s of afterCustomGroups) {
    if (s.categoryName) {
      if (!byCategory.has(s.categoryName)) categoryOrder.push(s.categoryName);
      byCategory.set(s.categoryName, [...(byCategory.get(s.categoryName) ?? []), s]);
    } else {
      trulyUngrouped.push(s);
    }
  }
  for (const name of categoryOrder) {
    sections.push({ key: `category:${name}`, title: name, items: byCategory.get(name)! });
  }

  if (trulyUngrouped.length > 0) {
    sections.push({
      key: "__other",
      // No heading at all when the salon hasn't defined any groups.
      title: sections.length > 0 ? l.other : null,
      items: trulyUngrouped,
    });
  }

  function renderService(s: SelectableService) {
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
                  className={`mt-0.5 text-sm text-ink-400 ${
                    checked.has(s.id) ? "block" : "line-clamp-1"
                  }`}
                >
                  {s.description}
                </span>
              )}
              <span className="mt-1 flex items-center gap-2 text-xs text-ink-400">
                {s.durationMin} {l.min}
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
                    {l.watchVideo}
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
  }

  return (
    <div className="relative">
      <div className="space-y-6 pb-20">
        {sections.map((section) => (
          <section key={section.key}>
            {section.title && (
              <h3 className="mb-3 border-b border-ink-100 pb-2 text-base font-bold text-ink-900">
                {section.title}
              </h3>
            )}
            <div className="space-y-3">{section.items.map(renderService)}</div>
          </section>
        ))}
      </div>

      {checked.size > 0 && (
        <div className="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-ink-900 px-5 py-3.5 text-white shadow-popover">
          <span className="text-sm">
            {l.selected(checked.size)}
            {" · "}
            {formatMoney(total, currency, locale)}
          </span>
          <a href={buildHref(checkedIds[0], checkedIds.slice(1))} className="btn-accent !px-4 !py-2 text-xs">
            {l.continue}
          </a>
        </div>
      )}
    </div>
  );
}
