"use client";

import { useState } from "react";
import { CalendarCheck2, CalendarX2, Loader2 } from "lucide-react";
import { bookingProtectStrings } from "@/lib/booking-protect-strings";
import { Link } from "@/i18n/navigation";

/** The buttons on the confirm / cancel page (src/lib/booking-protect.ts):
 * confirming is one tap; cancelling asks once more first. */
export function ConfirmCancelPanel({
  token,
  locale,
  businessName,
  businessSlug,
  alreadyConfirmed,
  startCancel,
  children,
}: {
  token: string;
  locale: string;
  businessName: string;
  businessSlug: string;
  alreadyConfirmed: boolean;
  startCancel: boolean;
  children: React.ReactNode;
}) {
  const S = bookingProtectStrings(locale);
  const [mode, setMode] = useState<"ask" | "cancelling" | "confirmed" | "cancelled" | "too_late" | "gone">(startCancel ? "cancelling" : "ask");
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);

  async function send(action: "confirm" | "cancel") {
    setBusy(true);
    const res = await fetch(`/api/bookings/confirm/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    }).catch(() => null);
    setBusy(false);
    setFailed(false);
    if (res?.ok) setMode(action === "confirm" ? "confirmed" : "cancelled");
    else if (res?.status === 409) setMode("too_late");
    else if (res?.status === 404) setMode("gone");
    // A dropped connection: let the customer tap again.
    else setFailed(true);
  }

  const box = "rounded-3xl bg-white p-6 text-center shadow-[0_18px_40px_-30px_rgba(31,24,45,0.5)] ring-1 ring-ink-100";

  if (mode === "confirmed") {
    return (
      <div className={box}>
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-lg shadow-primary-500/30">
          <CalendarCheck2 className="h-8 w-8" />
        </span>
        <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-ink-900">{S.pageConfirmedTitle}</h1>
        <p className="mt-2 text-sm text-ink-600">{S.pageConfirmedText(businessName)}</p>
        {children}
      </div>
    );
  }
  if (mode === "cancelled" || mode === "too_late" || mode === "gone") {
    return (
      <div className={box}>
        <CalendarX2 className="mx-auto h-12 w-12 text-ink-300" />
        {mode === "cancelled" && <h1 className="mt-4 text-xl font-extrabold tracking-tight text-ink-900">{S.pageCancelledTitle}</h1>}
        <p className="mt-2 text-sm leading-relaxed text-ink-600">
          {mode === "cancelled" ? S.pageCancelledText : mode === "too_late" ? S.pageTooLate : S.pageNotFound}
        </p>
        <Link href={`/b/${businessSlug}`} className="btn-primary mt-6 inline-flex !px-5 !py-2.5 text-sm">
          {S.pageBookAgain}
        </Link>
      </div>
    );
  }

  return (
    <div className={box}>
      <h1 className="text-2xl font-extrabold tracking-tight text-ink-900">{mode === "cancelling" ? S.pageCancelTitle : S.confirmTitle}</h1>
      <p className="mt-2 text-sm leading-relaxed text-ink-600">
        {mode === "cancelling" ? S.pageCancelText : alreadyConfirmed ? S.pageAlreadyConfirmed : S.confirmText}
      </p>
      {children}
      {failed && <p className="mt-3 text-xs font-semibold text-berry-500">{S.error}</p>}
      <div className="mt-6 flex flex-col gap-2">
        {mode === "cancelling" ? (
          <>
            <button type="button" disabled={busy} onClick={() => send("cancel")} className="btn-primary !bg-berry-500 !py-3 text-sm hover:!bg-berry-600">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : S.pageCancelButton}
            </button>
            <button type="button" disabled={busy} onClick={() => send("confirm")} className="btn-outline !py-3 text-sm">
              {S.pageKeepButton}
            </button>
          </>
        ) : (
          <>
            {!alreadyConfirmed && (
              <button type="button" disabled={busy} onClick={() => send("confirm")} className="btn-primary !py-3 text-sm">
                {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : S.confirmYes}
              </button>
            )}
            <button type="button" disabled={busy} onClick={() => setMode("cancelling")} className="btn-outline !py-3 text-sm">
              {S.confirmNo}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
