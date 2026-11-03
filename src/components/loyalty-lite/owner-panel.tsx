"use client";

import { useState } from "react";
import { Gift, Loader2, Stamp } from "lucide-react";
import { useRouter } from "@/i18n/navigation";
import type { LiteStrings } from "@/lib/loyalty-lite-strings";

/** On a customer's card page, for the salon's own signed-in device: the
 * stamp / redeem buttons, so a plain camera scan is enough. */
export function LiteOwnerPanel({ cardId, full, t, required, reward }: { cardId: string; full: boolean; t: LiteStrings; required: number; reward: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function act(action: "stamp" | "redeem") {
    setBusy(true);
    setMsg(null);
    const res = await fetch(`/api/loyalty-lite/cards/${cardId}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ action }) }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(false);
    if (!res?.ok) {
      setMsg({ ok: false, text: d?.error === "TOO_SOON" ? t.tooSoon : d?.error === "REWARD_READY" ? t.rewardFirst : t.errGeneric });
      return;
    }
    setMsg({
      ok: true,
      text: action === "redeem" ? t.redeemed : d.ready ? t.stampedReady.replace("{reward}", reward) : t.stamped.replace("{n}", String(d.stamps)).replace("{total}", String(required)),
    });
    router.refresh();
  }

  return (
    <div className="rounded-[1.75rem] border-2 border-dashed border-[#e0559b]/50 bg-[#fff5fa] p-5">
      <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#a3155f]">{t.ownerPanel}</p>
      <button
        type="button"
        disabled={busy}
        onClick={() => act(full ? "redeem" : "stamp")}
        className={`mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-full text-base font-bold text-white transition disabled:opacity-70 ${
          full ? "bg-gradient-to-r from-[#e0559b] via-[#c42d7f] to-[#a3155f] shadow-[0_14px_28px_-14px_rgba(163,21,95,0.9)]" : "bg-[#a3155f]"
        }`}
      >
        {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : full ? <Gift className="h-5 w-5" /> : <Stamp className="h-5 w-5 text-[#ffe3f1]" />}
        {full ? t.redeem : t.stamp}
      </button>
      {msg && <p className={`mt-3 text-center text-sm font-semibold ${msg.ok ? "text-emerald-700" : "text-berry-600"}`}>{msg.text}</p>}
    </div>
  );
}
