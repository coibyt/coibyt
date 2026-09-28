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

/** The 4-step "Location / Service / Booking / Finish" tab bar shown across
 * the embed booking flow, so a customer always knows where they are and can
 * jump back to an earlier step — matches the pattern in booksalon.fi. */
export function EmbedBookingProgress({
  locale,
  steps,
}: {
  locale: string;
  steps: [ProgressStepInput, ProgressStepInput, ProgressStepInput, ProgressStepInput];
}) {
  const labels = LABELS[locale] ?? LABELS.en;

  return (
    <div className="mb-4 grid grid-cols-4 border-b border-ink-100">
      {steps.map((step, i) => {
        const Icon = ICONS[i];
        const isActive = step.state === "current";
        const isDone = step.state === "done";
        const inner = (
          <div
            className={`flex flex-col items-center gap-1 border-b-2 py-3 text-[11px] font-medium sm:text-xs ${
              isActive
                ? "border-primary-500 text-primary-600"
                : isDone
                  ? "border-transparent text-ink-700"
                  : "border-transparent text-ink-400"
            }`}
          >
            {isDone ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
            <span>{labels[i]}</span>
          </div>
        );
        if (step.href) {
          return (
            <a key={i} href={step.href}>
              {inner}
            </a>
          );
        }
        if (step.onClick) {
          return (
            <button key={i} type="button" onClick={step.onClick} className="text-left">
              {inner}
            </button>
          );
        }
        return <div key={i}>{inner}</div>;
      })}
    </div>
  );
}
