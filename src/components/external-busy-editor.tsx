"use client";

import { useState } from "react";
import { formatInTimeZone, fromZonedTime } from "date-fns-tz";
import { Building2, Loader2, Lock, RotateCcw, X } from "lucide-react";

export interface ExternalBusyBlock {
  staffId: string;
  staffName: string;
  /** The other branch's name. */
  note: string | null;
  kind: string | null;
  sourceKey: string;
  startsAt: string;
  endsAt: string;
  coreStartsAt: string;
  coreEndsAt: string;
  travelMinutes?: number;
  adjusted?: boolean;
}

const T = {
  vi: {
    title: "Chỉnh thời gian khoá ở chi nhánh này",
    booking: "Có khách ở {branch}",
    busy: "Bận ở {branch}",
    core: "Thời gian ở {branch}: {time}",
    from: "Khoá từ",
    to: "Đến",
    hint: "Chỉ thay đổi lịch của chi nhánh này — các chi nhánh khác giữ nguyên. Thời gian ở {branch} luôn được khoá.",
    travel: "Mặc định: {n} phút di chuyển trước và sau.",
    save: "Lưu",
    reset: "Về mặc định",
    cancel: "Huỷ",
    INSIDE_SOURCE: "Không thể ngắn hơn thời gian ở {branch} ({time}).",
    TOO_LONG: "Tối đa 4 giờ trước hoặc sau.",
    generic: "Không lưu được, vui lòng thử lại.",
  },
  en: {
    title: "Change the locked time at this branch",
    booking: "Customer at {branch}",
    busy: "Busy at {branch}",
    core: "Time at {branch}: {time}",
    from: "Locked from",
    to: "To",
    hint: "Only this branch's calendar changes — the other branches keep theirs. The time at {branch} always stays locked.",
    travel: "Default: {n} min travel before and after.",
    save: "Save",
    reset: "Back to default",
    cancel: "Cancel",
    INSIDE_SOURCE: "It can't be shorter than the time at {branch} ({time}).",
    TOO_LONG: "At most 4 hours before or after.",
    generic: "Couldn't save, please try again.",
  },
};

/** The owner opens a locked "at another branch" block and sets how long it
 * blocks THIS branch's calendar (/api/business/time-off/external). */
export function ExternalBusyEditor({
  block,
  locale,
  timeZone,
  onClose,
  onSaved,
}: {
  block: ExternalBusyBlock;
  locale: string;
  timeZone: string;
  onClose: () => void;
  onSaved: () => void;
}) {
  const t = locale === "vi" ? T.vi : T.en;
  const hm = (iso: string) => formatInTimeZone(new Date(iso), timeZone, "HH:mm");
  const day = formatInTimeZone(new Date(block.coreStartsAt), timeZone, "yyyy-MM-dd");
  const [from, setFrom] = useState(hm(block.startsAt));
  const [to, setTo] = useState(hm(block.endsAt));
  const [busy, setBusy] = useState<"save" | "reset" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const branch = block.note ?? "";
  const coreTime = `${hm(block.coreStartsAt)}–${hm(block.coreEndsAt)}`;
  const fill = (s: string) => s.replace("{branch}", branch).replace("{time}", coreTime);

  async function send(reset: boolean) {
    setBusy(reset ? "reset" : "save");
    setError(null);
    const startsAt = reset ? null : fromZonedTime(`${day}T${from}:00`, timeZone);
    let endsAt = reset ? null : fromZonedTime(`${day}T${to}:00`, timeZone);
    // Ending past midnight.
    if (startsAt && endsAt && endsAt <= startsAt) endsAt = new Date(endsAt.getTime() + 24 * 60 * 60 * 1000);
    const res = await fetch("/api/business/time-off/external", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        staffId: block.staffId,
        sourceKey: block.sourceKey,
        startsAt: startsAt?.toISOString() ?? null,
        endsAt: endsAt?.toISOString() ?? null,
      }),
    }).catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      const d = await res?.json().catch(() => ({}));
      setError(d?.error === "INSIDE_SOURCE" ? fill(t.INSIDE_SOURCE) : d?.error === "TOO_LONG" ? t.TOO_LONG : t.generic);
      return;
    }
    onSaved();
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/40 p-4" onClick={() => !busy && onClose()}>
      <div className="card w-full max-w-sm animate-slide-up p-6" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between gap-3">
          <p className="text-lg font-bold text-ink-900">{t.title}</p>
          <button type="button" onClick={onClose} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-mist-50">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="rounded-2xl bg-[#f1ecf8] p-3 text-[#40325c] ring-1 ring-[#cdbfe0]">
          <p className="flex items-center gap-1.5 text-sm font-bold">
            <Lock className="h-3.5 w-3.5 shrink-0" />
            {fill(block.kind === "OTHER_BRANCH_BUSY" ? t.busy : t.booking)}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs opacity-80">
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            {block.staffName} · {fill(t.core)}
          </p>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <label className="text-xs font-semibold text-ink-700">
            {t.from}
            <input type="time" step={300} value={from} onChange={(e) => setFrom(e.target.value)} className="input mt-1 tabular-nums" />
          </label>
          <label className="text-xs font-semibold text-ink-700">
            {t.to}
            <input type="time" step={300} value={to} onChange={(e) => setTo(e.target.value)} className="input mt-1 tabular-nums" />
          </label>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-400">{fill(t.hint)}</p>
        {!!block.travelMinutes && <p className="mt-1 text-xs text-ink-400">{t.travel.replace("{n}", String(block.travelMinutes))}</p>}

        {error && <p className="mt-3 rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}

        <div className="mt-5 flex flex-wrap gap-2">
          <button type="button" disabled={!!busy || !from || !to} onClick={() => send(false)} className="btn-primary">
            {busy === "save" && <Loader2 className="h-4 w-4 animate-spin" />}
            {t.save}
          </button>
          {block.adjusted && (
            <button type="button" disabled={!!busy} onClick={() => send(true)} className="btn-outline">
              {busy === "reset" ? <Loader2 className="h-4 w-4 animate-spin" /> : <RotateCcw className="h-4 w-4" />}
              {t.reset}
            </button>
          )}
          <button type="button" disabled={!!busy} onClick={onClose} className="btn-ghost">
            {t.cancel}
          </button>
        </div>
      </div>
    </div>
  );
}
