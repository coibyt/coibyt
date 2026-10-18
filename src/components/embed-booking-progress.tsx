"use client";

import { MapPin, ClipboardList, CalendarDays, CheckCircle2, Check } from "lucide-react";

export type ProgressState = "done" | "current" | "upcoming";

export interface ProgressStepInput {
  state: ProgressState;
  href?: string;
  onClick?: () => void;
}

const LABELS: Record<string, [string, string, string, string]> = {
  vi: ["Địa điểm", "Dịch vụ", "Đặt lịch", "Hoàn tất"],
  en: ["Location", "Service", "Booking", "Finish"],
  fi: ["Toimipaikka", "Palvelu", "Varaus", "Viimeistely"],
  pl: ["Lokalizacja", "Usługa", "Rezerwacja", "Finalizacja"],
  de: ["Standort", "Dienstleistung", "Buchung", "Abschluss"],
  km: ["ទីតាំង", "សេវាកម្ម", "ការកក់", "បញ្ចប់"],
  th: ["สถานที่", "บริการ", "การจอง", "เสร็จสิ้น"],
};
const ICONS = [MapPin, ClipboardList, CalendarDays, CheckCircle2];

/** The 4-step "Location / Service / Booking / Finish" stepper shown across
 * the embed booking flow, so a customer always knows where they are and can
 * jump back to an earlier step. Numbered circles joined by a line that fills
 * in as the customer moves forward. */
export function EmbedBookingProgress({
  locale,
  steps,
}: {
  locale: string;
  steps: [ProgressStepInput, ProgressStepInput, ProgressStepInput, ProgressStepInput];
}) {
  const labels = LABELS[locale] ?? LABELS.en;

  return (
    <nav aria-label="Progress" className="mb-6 rounded-[24px] border border-ink-100 bg-white px-2 py-4 shadow-sm shadow-primary-900/5">
      <ol className="grid grid-cols-4">
        {steps.map((step, i) => {
          const Icon = ICONS[i];
          const isActive = step.state === "current";
          const isDone = step.state === "done";
          const nextReached = i < 3 && steps[i + 1].state !== "upcoming";
          const inner = (
            <span className="group relative flex flex-col items-center gap-1.5">
              <span
                className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                  isDone
                    ? "bg-primary-600 text-white group-hover:bg-primary-700"
                    : isActive
                      ? "bg-white text-primary-700 ring-2 ring-primary-600 shadow-[0_0_0_6px_rgba(98,79,137,0.12)]"
                      : "bg-mist-100 text-ink-400"
                }`}
              >
                {isDone ? <Check className="h-5 w-5" strokeWidth={2.75} /> : <Icon className="h-[18px] w-[18px]" />}
              </span>
              <span
                className={`max-w-full truncate px-1 text-[11px] font-semibold sm:text-xs ${
                  isActive ? "text-primary-700" : isDone ? "text-ink-700" : "text-ink-400"
                }`}
              >
                {labels[i]}
              </span>
            </span>
          );
          return (
            <li key={i} className="relative" aria-current={isActive ? "step" : undefined}>
              {i < 3 && (
                <span
                  aria-hidden
                  className={`absolute left-1/2 top-5 h-0.5 w-full -translate-y-1/2 ${
                    nextReached ? "bg-primary-600" : "bg-ink-100"
                  }`}
                />
              )}
              {step.href ? (
                <a href={step.href} className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400">
                  {inner}
                </a>
              ) : step.onClick ? (
                <button
                  type="button"
                  onClick={step.onClick}
                  className="block w-full rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
                >
                  {inner}
                </button>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
