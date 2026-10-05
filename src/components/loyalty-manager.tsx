"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

interface Program {
  pointsRequired: number;
  discountPercent: number;
  price: number;
  currency: string;
}

interface CardRow {
  id: string;
  customerName: string;
  customerEmail: string;
  points: number;
  totalScans: number;
  rewardReady: boolean;
  rewardsEarned: number;
}

export function LoyaltyManager({
  locale,
  defaultCurrency,
  initialCode = "",
}: {
  locale: string;
  defaultCurrency: string;
  initialCode?: string;
}) {
  const vi = locale === "vi";
  const [program, setProgram] = useState<Program>({
    pointsRequired: 5,
    discountPercent: 15,
    price: 0,
    currency: defaultCurrency,
  });
  const [hasProgram, setHasProgram] = useState(false);
  const [savingProgram, setSavingProgram] = useState(false);
  const [programSaved, setProgramSaved] = useState(false);
  const [cards, setCards] = useState<CardRow[] | null>(null);
  const [member, setMember] = useState({ customerName: "", customerEmail: "", customerPhone: "" });
  const [adding, setAdding] = useState(false);
  const [memberError, setMemberError] = useState<string | null>(null);
  const [scanCode, setScanCode] = useState(initialCode.toUpperCase());
  const [scanMsg, setScanMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function loadAll() {
    const [p, c] = await Promise.all([
      fetch("/api/business/loyalty/program").then((r) => r.json()),
      fetch("/api/business/loyalty/cards").then((r) => r.json()),
    ]);
    if (p.program) {
      setProgram(p.program);
      setHasProgram(true);
    }
    setCards(c.cards ?? []);
  }

  useEffect(() => {
    loadAll();
  }, []);

  async function saveProgram(e: React.FormEvent) {
    e.preventDefault();
    setSavingProgram(true);
    setProgramSaved(false);
    await fetch("/api/business/loyalty/program", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pointsRequired: Number(program.pointsRequired),
        discountPercent: Number(program.discountPercent),
        price: Number(program.price),
        currency: program.currency,
      }),
    });
    setSavingProgram(false);
    setHasProgram(true);
    setProgramSaved(true);
  }

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    setMemberError(null);
    const res = await fetch("/api/business/loyalty/cards", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...member, locale }),
    });
    setAdding(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setMemberError(
        data.error === "ALREADY_ACTIVE"
          ? vi ? "Email này đã có thẻ tích điểm." : "This email already has a card."
          : data.error === "NO_PROGRAM"
            ? vi ? "Hãy lưu cài đặt chương trình trước." : "Save the program settings first."
            : vi ? "Không kích hoạt được thẻ." : "Couldn't activate the card."
      );
      return;
    }
    setMember({ customerName: "", customerEmail: "", customerPhone: "" });
    loadAll();
  }

  async function scan() {
    setBusy(true);
    setScanMsg(null);
    const res = await fetch("/api/business/loyalty/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: scanCode }),
    });
    const d = await res.json().catch(() => ({}));
    setBusy(false);
    if (res.ok) {
      setScanMsg({
        ok: true,
        text: d.rewardReady
          ? vi ? `Đã cộng 1 điểm — đủ ${d.pointsRequired} điểm, khách được giảm ${program.discountPercent}%!` : `+1 point — ${d.pointsRequired} reached, ${program.discountPercent}% off!`
          : vi ? `Đã cộng 1 điểm (${d.points}/${d.pointsRequired}).` : `+1 point (${d.points}/${d.pointsRequired}).`,
      });
      setScanCode("");
      loadAll();
      return;
    }
    const msg: Record<string, string> = {
      NOT_FOUND: vi ? "Không tìm thấy thẻ này." : "Card not found.",
      NO_PROGRAM: vi ? "Chưa có chương trình tích điểm." : "No loyalty program yet.",
      NO_NEW_VISIT: vi ? "Không có lần làm dịch vụ mới nào để tích điểm." : "No new completed visit to count.",
      REWARD_PENDING: vi ? "Khách đã đủ điểm — hãy áp dụng ưu đãi trước." : "Customer already has a reward — apply it first.",
    };
    setScanMsg({ ok: false, text: msg[d.reason] ?? (vi ? "Không quét được." : "Scan failed.") });
  }

  async function applyReward(id: string) {
    setBusy(true);
    await fetch(`/api/business/loyalty/cards/${id}/reward`, { method: "POST" });
    setBusy(false);
    loadAll();
  }

  return (
    <div className="space-y-8">
      <section className="card space-y-4 p-5">
        <h2 className="font-semibold text-ink-900">{vi ? "Cài đặt chương trình" : "Program settings"}</h2>
        <form onSubmit={saveProgram} className="grid gap-3 sm:grid-cols-2">
          <label className="text-xs font-medium text-ink-700">
            {vi ? "Số lần để được giảm giá" : "Visits needed for a discount"}
            <input type="number" min={1} required className="input mt-1" value={program.pointsRequired} onChange={(e) => setProgram({ ...program, pointsRequired: Number(e.target.value) })} />
          </label>
          <label className="text-xs font-medium text-ink-700">
            {vi ? "Giảm giá (%)" : "Discount (%)"}
            <input type="number" min={1} max={100} required className="input mt-1" value={program.discountPercent} onChange={(e) => setProgram({ ...program, discountPercent: Number(e.target.value) })} />
          </label>
          <label className="text-xs font-medium text-ink-700">
            {vi ? "Giá thẻ (0 = miễn phí)" : "Card price (0 = free)"}
            <div className="mt-1 flex gap-2">
              <input type="number" min={0} step="0.01" className="input flex-1" value={program.price} onChange={(e) => setProgram({ ...program, price: Number(e.target.value) })} />
              <input className="input w-24" maxLength={3} value={program.currency} onChange={(e) => setProgram({ ...program, currency: e.target.value.toUpperCase() })} />
            </div>
          </label>
          <div className="flex items-end gap-3 sm:col-span-2">
            <button type="submit" disabled={savingProgram} className="btn-primary">
              {savingProgram && <Loader2 className="h-4 w-4 animate-spin" />}
              {vi ? "Lưu" : "Save"}
            </button>
            {programSaved && <span className="text-sm text-sage-700">{vi ? "Đã lưu" : "Saved"}</span>}
          </div>
        </form>
      </section>

      {hasProgram && (
        <>
          <section className="card space-y-3 p-5">
            <h2 className="font-semibold text-ink-900">{vi ? "Quét thẻ khi khách đến" : "Scan a card when a customer visits"}</h2>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input value={scanCode} onChange={(e) => setScanCode(e.target.value.toUpperCase())} placeholder={vi ? "Mã trên thẻ hoặc QR" : "Card code or QR"} className="input flex-1 font-mono tracking-widest" />
              <button type="button" disabled={busy || scanCode.trim().length < 4} onClick={scan} className="btn-primary">
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                {vi ? "Cộng 1 điểm" : "Add 1 point"}
              </button>
            </div>
            {scanMsg && <p className={`text-sm ${scanMsg.ok ? "text-sage-700" : "text-berry-500"}`}>{scanMsg.text}</p>}
          </section>

          <section className="card space-y-3 p-5">
            <h2 className="font-semibold text-ink-900">{vi ? "Kích hoạt thẻ cho khách" : "Activate a card for a customer"}</h2>
            <form onSubmit={addMember} className="grid gap-3 sm:grid-cols-3">
              <input required placeholder={vi ? "Họ tên" : "Name"} className="input" value={member.customerName} onChange={(e) => setMember({ ...member, customerName: e.target.value })} />
              <input required type="email" placeholder="Email" className="input" value={member.customerEmail} onChange={(e) => setMember({ ...member, customerEmail: e.target.value })} />
              <input placeholder={vi ? "Điện thoại (không bắt buộc)" : "Phone (optional)"} className="input" value={member.customerPhone} onChange={(e) => setMember({ ...member, customerPhone: e.target.value })} />
              {memberError && <p className="text-sm text-berry-500 sm:col-span-3">{memberError}</p>}
              <div className="sm:col-span-3">
                <button type="submit" disabled={adding} className="btn-primary">
                  {adding && <Loader2 className="h-4 w-4 animate-spin" />}
                  {vi ? "Kích hoạt và gửi QR qua email" : "Activate and email the QR"}
                </button>
              </div>
            </form>
          </section>

          <section className="space-y-3">
            <h2 className="font-semibold text-ink-900">{vi ? "Khách có thẻ" : "Cardholders"}</h2>
            {cards === null ? (
              <Loader2 className="h-4 w-4 animate-spin text-ink-400" />
            ) : cards.length === 0 ? (
              <p className="text-sm text-ink-400">{vi ? "Chưa có khách nào." : "No cardholders yet."}</p>
            ) : (
              <ul className="space-y-2">
                {cards.map((c) => (
                  <li key={c.id} className="card flex flex-wrap items-center justify-between gap-3 p-4 text-sm">
                    <div>
                      <p className="font-semibold text-ink-900">{c.customerName}</p>
                      <p className="text-xs text-ink-400">{c.customerEmail} · {vi ? "điểm" : "points"} {c.points}/{program.pointsRequired} · {vi ? "lượt quét" : "scans"} {c.totalScans} · {vi ? "đã giảm" : "rewards"} {c.rewardsEarned}</p>
                    </div>
                    {c.rewardReady && (
                      <button type="button" disabled={busy} onClick={() => applyReward(c.id)} className="btn-primary !px-3 !py-1.5 text-xs">
                        {vi ? `Áp dụng giảm ${program.discountPercent}%` : `Apply ${program.discountPercent}% off`}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </>
      )}
    </div>
  );
}
