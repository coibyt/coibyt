"use client";

import { useState } from "react";
import { AtSign, CheckCircle2, Clock, Loader2, X } from "lucide-react";
import { fill } from "@/lib/shop-strings";
import type { MarketingStudioStrings } from "@/lib/marketing-studio-strings";

/** In the studio, when the admin allows it: the salon's own address on its
 * marketing emails — typed in, verified by an emailed link, then every
 * campaign's Reply-To. */
export function MarketingOwnEmail({ S, initial }: { S: MarketingStudioStrings; initial: { email: string | null; verified: boolean } }) {
  const [email, setEmail] = useState(initial.email);
  const [verified, setVerified] = useState(initial.verified);
  const [text, setText] = useState(initial.email ?? "");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function submit() {
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/business/marketing/own-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: text }),
    }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(false);
    if (!res?.ok) {
      setMsg({ ok: false, text: d?.error === "INVALID_EMAIL" ? S.errEmail : res?.status === 429 ? S.testTooSoon : S.errGeneric });
      return;
    }
    setEmail(d.email);
    setVerified(false);
    setMsg({ ok: true, text: fill(S.ownEmailSent, { email: d.email }) });
  }

  async function remove() {
    setBusy(true);
    const res = await fetch("/api/business/marketing/own-email", { method: "DELETE" }).catch(() => null);
    setBusy(false);
    if (res?.ok) {
      setEmail(null);
      setVerified(false);
      setText("");
      setMsg(null);
    }
  }

  return (
    <div className="mb-4 rounded-2xl bg-gradient-to-br from-[#f6f2fb] to-white p-4 ring-1 ring-[#e4dcef]">
      <p className="flex items-center gap-2 text-sm font-bold text-ink-900">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#624f89] text-white">
          <AtSign className="h-3.5 w-3.5" />
        </span>
        {S.ownEmailTitle}
      </p>

      {email && verified ? (
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-emerald-50 px-3 py-2.5 ring-1 ring-emerald-200">
          <span className="flex min-w-0 items-center gap-2 text-sm">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
            <span className="min-w-0 truncate font-bold text-emerald-800">{email}</span>
          </span>
          <button type="button" onClick={remove} disabled={busy} className="flex items-center gap-1 text-xs font-semibold text-ink-500 hover:text-berry-500">
            <X className="h-3.5 w-3.5" />
            {S.ownEmailRemove}
          </button>
          <p className="w-full text-[11px] text-emerald-800/80">{S.ownEmailActive}</p>
        </div>
      ) : (
        <>
          <p className="mt-1 text-xs text-ink-500">{S.ownEmailHint}</p>
          {email && (
            <p className="mt-2 flex items-center gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-xs font-semibold text-amber-800 ring-1 ring-amber-200">
              <Clock className="h-3.5 w-3.5 shrink-0" />
              {fill(S.ownEmailPending, { email })}
            </p>
          )}
          <div className="mt-2 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              inputMode="email"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="salon@gmail.com"
              className="input min-w-0 flex-1"
            />
            <button
              type="button"
              onClick={submit}
              disabled={busy || !text.trim()}
              className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-[#1f182d] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {email ? S.ownEmailResend : S.ownEmailVerify}
            </button>
          </div>
        </>
      )}
      {msg && <p className={`mt-2 text-xs font-semibold ${msg.ok ? "text-emerald-700" : "text-berry-500"}`}>{msg.text}</p>}
    </div>
  );
}
