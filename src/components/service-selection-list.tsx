"use client";

import { useState } from "react";
import { Check, Clock, PlayCircle } from "lucide-react";
import { formatMoney } from "@/lib/money";
import { embedFrameClass, toYoutubeEmbedUrl } from "@/lib/youtube";

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
    bookNow: string;
  }
> = {
  vi: {
    min: "phút",
    watchVideo: "Xem video",
    noServices: "Chưa có dịch vụ nào.",
    other: "Dịch vụ khác",
    selected: (n) => `Đã chọn ${n} dịch vụ`,
    continue: "Tiếp tục",
    bookNow: "Đặt lịch",
  },
  en: {
    min: "min",
    watchVideo: "Watch video",
    noServices: "No services yet.",
    other: "Other services",
    selected: (n) => `${n} service${n > 1 ? "s" : ""} selected`,
    continue: "Continue",
    bookNow: "Book",
  },
  fi: {
    min: "min",
    watchVideo: "Katso video",
    noServices: "Ei vielä palveluita.",
    other: "Muut palvelut",
    selected: (n) => `${n} palvelua valittu`,
    continue: "Jatka",
    bookNow: "Varaa",
  },
  pl: {
    min: "min",
    watchVideo: "Obejrzyj wideo",
    noServices: "Brak usług.",
    other: "Inne usługi",
    selected: (n) => `Wybrano usług: ${n}`,
    continue: "Dalej",
    bookNow: "Zarezerwuj",
  },
  de: {
    min: "Min.",
    watchVideo: "Video ansehen",
    noServices: "Noch keine Dienstleistungen.",
    other: "Weitere Dienstleistungen",
    selected: (n) => `${n} Dienstleistung${n > 1 ? "en" : ""} ausgewählt`,
    continue: "Weiter",
    bookNow: "Buchen",
  },
  km: {
    min: "នាទី",
    watchVideo: "មើលវីដេអូ",
    noServices: "មិនទាន់មានសេវាកម្មទេ។",
    other: "សេវាកម្មផ្សេងៗ",
    selected: (n) => `បានជ្រើសរើស ${n} សេវាកម្ម`,
    continue: "បន្ត",
    bookNow: "កក់",
  },
  th: {
    min: "นาที",
    watchVideo: "ดูวิดีโอ",
    noServices: "ยังไม่มีบริการ",
    other: "บริการอื่นๆ",
    selected: (n) => `เลือกแล้ว ${n} บริการ`,
    continue: "ดำเนินการต่อ",
    bookNow: "จอง",
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
    // This service is always the primary one booked, but any OTHER service
    // the customer already ticked comes along as an extra — so checking two
    // services then hitting either one's own "Book" button still carries
    // both into the next step, not just the one that was clicked.
    const otherCheckedIds = checkedIds.filter((id) => id !== s.id);
    return (
      <div
        key={s.id}
        className={`rounded-2xl border p-4 transition-colors sm:p-5 ${
          checked.has(s.id)
            ? "border-primary-400 bg-primary-50/70 ring-1 ring-primary-400"
            : "border-ink-100 bg-white hover:border-primary-200"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={checked.has(s.id)}
              onChange={() => toggle(s.id)}
            />
            <span
              aria-hidden
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors peer-focus-visible:ring-2 peer-focus-visible:ring-primary-400 peer-focus-visible:ring-offset-2 ${
                checked.has(s.id) ? "border-primary-500 bg-primary-500 text-white" : "border-ink-100 bg-white"
              }`}
            >
              {checked.has(s.id) && <Check className="h-3 w-3" strokeWidth={3} />}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold leading-snug text-ink-900">{s.name}</span>
              {s.description && (
                <span
                  className={`mt-1 text-sm leading-relaxed text-ink-400 ${
                    checked.has(s.id) ? "block" : "line-clamp-2"
                  }`}
                >
                  {s.description}
                </span>
              )}
              <span className="mt-2 flex flex-wrap items-center gap-2 text-xs text-ink-700">
                <span className="inline-flex items-center gap-1 rounded-full bg-mist-100 px-2 py-0.5 font-medium">
                  <Clock className="h-3 w-3" />
                  {s.durationMin} {l.min}
                </span>
                {embedUrl && (
                  <button
                    type="button"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={(e) => {
                      e.preventDefault();
                      setPlayingVideoId((prev) => (prev === s.id ? null : s.id));
                    }}
                    className="flex items-center gap-1 font-semibold text-primary-600 hover:underline"
                  >
                    <PlayCircle className="h-3.5 w-3.5" />
                    {l.watchVideo}
                  </button>
                )}
              </span>
            </span>
          </label>
          {/* Lets a customer booking just this one service go straight to the
              booking step without checking the box first and hunting for the
              sticky "continue" bar — especially useful on a long service
              list where that bar can be many screens below. */}
          <span className="flex shrink-0 flex-col items-end gap-2">
            <span className="text-base font-bold text-ink-900">
              {formatMoney(s.priceCents, s.currency, locale)}
            </span>
            <a
              href={buildHref(s.id, otherCheckedIds)}
              className="btn-primary !px-4 !py-2 text-xs whitespace-nowrap"
            >
              {l.bookNow}
            </a>
          </span>
        </div>
        {embedUrl && playingVideoId === s.id && (
          <div className={embedFrameClass(embedUrl, "mt-3 rounded-xl")}>
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
              <h3 className="mb-3 flex items-baseline gap-2 text-lg font-bold text-ink-900">
                {section.title}
                <span className="text-sm font-medium text-ink-400">{section.items.length}</span>
              </h3>
            )}
            <div className="space-y-3">{section.items.map(renderService)}</div>
          </section>
        ))}
      </div>

      {checked.size > 0 && (
        <div className="sticky bottom-4 z-10 flex items-center justify-between gap-3 rounded-full bg-primary-800 py-2 pl-5 pr-2 text-white shadow-2xl shadow-primary-900/30">
          <span className="min-w-0 text-sm">
            <span className="block truncate font-semibold">{l.selected(checked.size)}</span>
            <span className="block text-xs text-primary-100">{formatMoney(total, currency, locale)}</span>
          </span>
          <a href={buildHref(checkedIds[0], checkedIds.slice(1))} className="btn-accent shrink-0 !px-5 !py-2.5 text-sm">
            {l.continue}
          </a>
        </div>
      )}
    </div>
  );
}
