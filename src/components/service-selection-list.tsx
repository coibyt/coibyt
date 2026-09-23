"use client";

import { useState } from "react";
import { formatMoney } from "@/lib/money";

export interface SelectableService {
  id: string;
  name: string;
  description?: string | null;
  durationMin: number;
  priceCents: number;
  currency: string;
}

/** Lets a customer check off several services (e.g. a manicure and a
 * pedicure) to book together in one visit, matching Timma's "select
 * multiple, then continue" flow instead of one "book now" button per row. */
export function ServiceSelectionList({
  services,
  locale,
  buildHref,
}: {
  services: SelectableService[];
  locale: string;
  buildHref: (serviceId: string, extraServiceIds: string[]) => string;
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

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
        {services.map((s) => (
          <label
            key={s.id}
            className={`flex cursor-pointer items-start justify-between gap-4 rounded-2xl border p-4 transition-colors ${
              checked.has(s.id)
                ? "border-primary-500 bg-primary-50"
                : "border-ink-100 bg-white hover:border-ink-400"
            }`}
          >
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
                  <span className="mt-0.5 line-clamp-2 block text-sm text-ink-400">
                    {s.description}
                  </span>
                )}
                <span className="mt-1 block text-xs text-ink-400">{s.durationMin} min</span>
              </span>
            </span>
            <span className="shrink-0 font-semibold text-ink-900">
              {formatMoney(s.priceCents, s.currency, locale)}
            </span>
          </label>
        ))}
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
