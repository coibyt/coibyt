"use client";

import { useEffect, useState } from "react";
import { ArrowRightLeft, Building2, Check, Loader2, Mail, X } from "lucide-react";

interface Option {
  businessId: string;
  name: string;
  city: string | null;
  staffName?: string;
  serviceName?: string;
  error?: "NO_STAFF" | "STAFF_NOT_THERE" | "SERVICE_NOT_THERE";
  missing?: string | null;
}

const T = {
  vi: {
    button: "Chuyển chi nhánh",
    title: "Chuyển lịch hẹn sang chi nhánh khác",
    sub: "Giữ nguyên giờ và khách — nhân viên sẽ làm ở chi nhánh mới.",
    staffThere: "{staff} · {service}",
    NO_STAFF: "Lịch hẹn chưa có nhân viên.",
    STAFF_NOT_THERE: "Nhân viên này chưa làm ở chi nhánh này — bật chi nhánh trong hồ sơ nhân viên trước.",
    SERVICE_NOT_THERE: "Chi nhánh này chưa có dịch vụ “{name}”.",
    notify: "Gửi email báo khách địa điểm mới",
    move: "Chuyển sang {name}",
    cancel: "Huỷ",
    errSlot: "Nhân viên đã có lịch khác vào giờ này ở chi nhánh đó.",
    errDone: "Lịch hẹn này đã báo cáo thu nhập hoặc đã được đánh giá — không chuyển được.",
    errGeneric: "Không chuyển được, vui lòng thử lại.",
  },
  en: {
    button: "Move to another branch",
    title: "Move this booking to another branch",
    sub: "Same time, same customer — the staff member works at the new branch.",
    staffThere: "{staff} · {service}",
    NO_STAFF: "This booking has no staff member.",
    STAFF_NOT_THERE: "This person doesn't work at this branch yet — add the branch in their staff profile first.",
    SERVICE_NOT_THERE: "This branch has no “{name}” service.",
    notify: "Email the customer the new address",
    move: "Move to {name}",
    cancel: "Cancel",
    errSlot: "They already have a booking at that time there.",
    errDone: "Income has been reported or the customer rated — it can't be moved.",
    errGeneric: "Couldn't move it, please try again.",
  },
};

/** For the owner, in a booking's details: move it to another of their
 * branches where the same person works. Renders nothing for a salon with a
 * single branch. */
export function MoveBranchButton({
  bookingId,
  locale,
  customerHasEmail,
  onMoved,
}: {
  bookingId: string;
  locale: string;
  customerHasEmail: boolean;
  onMoved: (branchName: string, emailed: boolean) => void;
}) {
  const t = locale === "vi" ? T.vi : T.en;
  const [options, setOptions] = useState<Option[] | null>(null);
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<string | null>(null);
  const [notify, setNotify] = useState(customerHasEmail);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(`/api/business/bookings/${bookingId}/move-branch`)
      .then((r) => (r.ok ? r.json() : { options: [] }))
      .then((d) => alive && setOptions(d.options ?? []))
      .catch(() => alive && setOptions([]));
    return () => {
      alive = false;
    };
  }, [bookingId]);

  if (!options || options.length === 0) return null;
  const chosen = options.find((o) => o.businessId === pick);

  async function move() {
    if (!chosen) return;
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/business/bookings/${bookingId}/move-branch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId: chosen.businessId, notify }),
    }).catch(() => null);
    setBusy(false);
    const d = await res?.json().catch(() => ({}));
    if (!res?.ok) {
      setError(d?.error === "SLOT_UNAVAILABLE" ? t.errSlot : d?.error === "ALREADY_DONE" ? t.errDone : t.errGeneric);
      return;
    }
    setOpen(false);
    onMoved(d.businessName ?? chosen.name, !!d.emailed);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setOpen(true);
          setPick(options.find((o) => !o.error)?.businessId ?? null);
          setError(null);
        }}
        className="btn-outline !px-3 !py-1.5 text-xs"
      >
        <ArrowRightLeft className="h-3.5 w-3.5" />
        {t.button}
      </button>

      {open && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-900/40 p-4" onClick={() => !busy && setOpen(false)}>
          <div className="card w-full max-w-md animate-slide-up p-6" onClick={(e) => e.stopPropagation()}>
            <div className="mb-1 flex items-start justify-between gap-3">
              <p className="text-lg font-bold text-ink-900">{t.title}</p>
              <button type="button" onClick={() => setOpen(false)} className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-mist-50">
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mb-4 text-sm text-ink-400">{t.sub}</p>
            <ul className="space-y-2">
              {options.map((o) => {
                const on = pick === o.businessId;
                return (
                  <li key={o.businessId}>
                    <button
                      type="button"
                      disabled={!!o.error}
                      onClick={() => setPick(o.businessId)}
                      className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left ring-1 transition disabled:cursor-not-allowed disabled:opacity-60 ${
                        on ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-900 ring-ink-100 hover:bg-mist-50"
                      }`}
                    >
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${on ? "bg-white/10 text-[#e8d3a6]" : "bg-mist-50 text-ink-400"}`}>
                        <Building2 className="h-4 w-4" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-bold">{o.name}</span>
                        <span className={`block text-[11px] leading-snug ${on ? "text-white/70" : o.error ? "text-berry-500" : "text-ink-400"}`}>
                          {o.error
                            ? t[o.error].replace("{name}", o.missing ?? "")
                            : t.staffThere.replace("{staff}", o.staffName ?? "").replace("{service}", o.serviceName ?? "")}
                        </span>
                      </span>
                      {on && <Check className="mt-1 h-4 w-4 shrink-0 text-[#e8d3a6]" />}
                    </button>
                  </li>
                );
              })}
            </ul>
            {customerHasEmail && (
              <label className="mt-4 flex cursor-pointer items-center gap-2 text-sm text-ink-700">
                <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} className="h-4 w-4 accent-primary-600" />
                <Mail className="h-4 w-4 text-ink-400" />
                {t.notify}
              </label>
            )}
            {error && <p className="mt-3 rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
            <div className="mt-5 flex gap-2">
              <button type="button" disabled={!chosen || !!chosen.error || busy} onClick={move} className="btn-primary">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRightLeft className="h-4 w-4" />}
                {t.move.replace("{name}", chosen?.name ?? "")}
              </button>
              <button type="button" disabled={busy} onClick={() => setOpen(false)} className="btn-ghost">
                {t.cancel}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
