"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Gift,
  Loader2,
  Pencil,
  QrCode,
  ScanLine,
  Search,
  Settings2,
  Star,
  UserPlus,
  Users,
} from "lucide-react";
import { LoyaltyDetailsModal, LoyaltyInsightsPanel } from "@/components/loyalty-customer-insights";

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

function initials(name: string) {
  const parts = name.trim().split(/\s+/);
  return ((parts[0]?.[0] ?? "") + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase() || "?";
}

export function LoyaltyManager({
  locale,
  defaultCurrency,
  timeZone,
  initialCode = "",
}: {
  locale: string;
  defaultCurrency: string;
  timeZone: string;
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
  const [loaded, setLoaded] = useState(false);
  const [editingProgram, setEditingProgram] = useState(false);
  const [savingProgram, setSavingProgram] = useState(false);
  const [programSaved, setProgramSaved] = useState(false);
  const [cards, setCards] = useState<CardRow[] | null>(null);
  const [member, setMember] = useState({ customerName: "", customerEmail: "", customerPhone: "" });
  const [adding, setAdding] = useState(false);
  const [memberError, setMemberError] = useState<string | null>(null);
  const [memberAdded, setMemberAdded] = useState(false);
  const [scanCode, setScanCode] = useState(initialCode.toUpperCase());
  const [scanMsg, setScanMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);
  const [query, setQuery] = useState("");
  // The customer whose framed summary is open (after a scan, or picked from
  // the list), and whose full history modal is open.
  const [activeCardId, setActiveCardId] = useState<string | null>(null);
  const [detailsCardId, setDetailsCardId] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

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
    setLoaded(true);
    setRefreshKey((k) => k + 1);
  }

  useEffect(() => {
    loadAll();
  }, []);

  const totals = useMemo(() => {
    const list = cards ?? [];
    return {
      members: list.length,
      scans: list.reduce((s, c) => s + c.totalScans, 0),
      rewards: list.reduce((s, c) => s + c.rewardsEarned, 0),
      ready: list.filter((c) => c.rewardReady).length,
    };
  }, [cards]);

  const filteredCards = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!cards) return null;
    if (!q) return cards;
    return cards.filter((c) => c.customerName.toLowerCase().includes(q) || c.customerEmail.toLowerCase().includes(q));
  }, [cards, query]);

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
    setEditingProgram(false);
  }

  async function addMember(e: React.FormEvent) {
    e.preventDefault();
    setAdding(true);
    setMemberError(null);
    setMemberAdded(false);
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
    setMemberAdded(true);
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
          ? vi
            ? `Quét thành công! Đã cộng 1 điểm — khách đủ ${d.pointsRequired} điểm, được giảm ${program.discountPercent}%.`
            : `Scanned! +1 point — ${d.pointsRequired} reached, ${program.discountPercent}% off unlocked.`
          : vi
            ? `Quét thành công! Đã cộng 1 điểm (${d.points}/${d.pointsRequired}).`
            : `Scanned! +1 point (${d.points}/${d.pointsRequired}).`,
      });
      setScanCode("");
      setActiveCardId(d.cardId ?? null);
      loadAll();
      return;
    }
    const msg: Record<string, string> = {
      NOT_FOUND: vi ? "Không tìm thấy thẻ này." : "Card not found.",
      NO_PROGRAM: vi ? "Chưa có chương trình tích điểm." : "No loyalty program yet.",
      NO_NEW_VISIT: vi
        ? "Chưa cộng điểm: khách chưa có lần làm dịch vụ hoàn tất mới nào kể từ lần quét trước."
        : "No point added: no new completed visit since the last scan.",
      REWARD_PENDING: vi
        ? "Chưa cộng điểm: khách đã đủ điểm — hãy áp dụng ưu đãi trước."
        : "No point added: the customer already has a reward — apply it first.",
    };
    setScanMsg({ ok: false, text: msg[d.reason] ?? (vi ? "Không quét được." : "Scan failed.") });
    // A refused scan on a real card still opens that customer's summary.
    setActiveCardId(d.cardId ?? null);
  }

  async function applyReward(id: string) {
    setBusy(true);
    await fetch(`/api/business/loyalty/cards/${id}/reward`, { method: "POST" });
    setBusy(false);
    if (id === activeCardId) {
      setScanMsg({
        ok: true,
        text: vi ? `Đã áp dụng giảm ${program.discountPercent}% — thẻ bắt đầu chu kỳ mới.` : `${program.discountPercent}% off applied — the card starts a new cycle.`,
      });
    }
    loadAll();
  }

  function openSummary(id: string) {
    setScanMsg(null);
    setActiveCardId(id);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const programSummary = vi
    ? `Làm ${program.pointsRequired} lần → giảm ${program.discountPercent}%${program.price > 0 ? ` · thẻ ${program.price} ${program.currency}` : " · thẻ miễn phí"}`
    : `${program.pointsRequired} visits → ${program.discountPercent}% off${program.price > 0 ? ` · card ${program.price} ${program.currency}` : " · free card"}`;

  if (!loaded) {
    return (
      <div className="flex h-40 items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {hasProgram && (
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            { icon: Users, label: vi ? "Khách có thẻ" : "Cardholders", value: totals.members, cls: "from-primary-500 to-primary-700" },
            { icon: ScanLine, label: vi ? "Tổng lượt quét" : "Total scans", value: totals.scans, cls: "from-teal-400 to-teal-600" },
            { icon: Gift, label: vi ? "Ưu đãi đã trao" : "Rewards given", value: totals.rewards, cls: "from-coral-400 to-berry-500" },
            { icon: Star, label: vi ? "Đang chờ ưu đãi" : "Rewards waiting", value: totals.ready, cls: "from-peach-300 to-coral-500" },
          ].map((t) => (
            <div key={t.label} className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${t.cls} p-4 text-white shadow-md`}>
              <t.icon className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 text-white/15" />
              <p className="text-3xl font-bold leading-none">{cards === null ? "…" : t.value}</p>
              <p className="mt-2 text-xs font-medium text-white/85">{t.label}</p>
            </div>
          ))}
        </div>
      )}

      {hasProgram && (
        <section className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-5 text-white shadow-xl sm:p-7">
          <div className="pointer-events-none absolute -right-12 -top-16 h-48 w-48 rounded-full bg-coral-400/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-48 w-48 rounded-full bg-primary-300/20 blur-3xl" />
          <div className="relative flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
              <QrCode className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-bold">{vi ? "Quét thẻ khi khách đến" : "Scan a card when a customer visits"}</h2>
              <p className="text-xs text-white/70">
                {vi
                  ? "Quét mã QR bằng camera điện thoại, hoặc nhập mã in trên thẻ."
                  : "Scan the QR with your phone camera, or type the code printed on the card."}
              </p>
            </div>
          </div>
          <div className="relative mt-5 flex flex-col gap-2 sm:flex-row">
            <input
              value={scanCode}
              onChange={(e) => setScanCode(e.target.value.toUpperCase())}
              onKeyDown={(e) => e.key === "Enter" && scanCode.trim().length >= 4 && !busy && scan()}
              placeholder={vi ? "Mã trên thẻ hoặc QR" : "Card code or QR"}
              className="h-12 flex-1 rounded-full border border-white/20 bg-white/10 px-5 font-mono text-base tracking-[0.25em] text-white placeholder:tracking-normal placeholder:text-white/50 focus:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="button"
              disabled={busy || scanCode.trim().length < 4}
              onClick={scan}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-peach-200 to-coral-400 px-6 font-semibold text-primary-900 shadow-lg transition hover:brightness-105 disabled:opacity-50"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Star className="h-4 w-4 fill-current" />}
              {vi ? "Cộng 1 điểm" : "Add 1 point"}
            </button>
          </div>
          {scanMsg && !activeCardId && (
            <p className={`relative mt-3 text-sm font-medium ${scanMsg.ok ? "text-emerald-200" : "text-amber-200"}`}>{scanMsg.text}</p>
          )}
        </section>
      )}

      {activeCardId && (
        <LoyaltyInsightsPanel
          cardId={activeCardId}
          locale={locale}
          timeZone={timeZone}
          refreshKey={refreshKey}
          notice={scanMsg}
          busy={busy}
          onApplyReward={applyReward}
          onOpenDetails={setDetailsCardId}
          onClose={() => {
            setActiveCardId(null);
            setScanMsg(null);
          }}
        />
      )}

      {hasProgram && (
        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-ink-900">
              <Users className="h-5 w-5 text-primary-500" />
              {vi ? "Khách có thẻ" : "Cardholders"}
            </h2>
            {(cards?.length ?? 0) > 3 && (
              <label className="relative sm:w-72">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={vi ? "Tìm theo tên hoặc email" : "Search by name or email"}
                  className="input !pl-10"
                />
              </label>
            )}
          </div>
          {filteredCards === null ? (
            <Loader2 className="h-5 w-5 animate-spin text-ink-400" />
          ) : filteredCards.length === 0 ? (
            <div className="rounded-2xl border-2 border-dashed border-ink-100 p-8 text-center text-sm text-ink-400">
              {query ? (vi ? "Không có khách nào khớp." : "No matching customers.") : vi ? "Chưa có khách nào — kích hoạt thẻ đầu tiên bên dưới." : "No cardholders yet — activate the first card below."}
            </div>
          ) : (
            <ul className="grid gap-3 md:grid-cols-2">
              {filteredCards.map((c) => {
                const ratio = Math.min(1, c.points / Math.max(1, program.pointsRequired));
                return (
                  <li
                    key={c.id}
                    className={`group relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                      c.rewardReady ? "border-coral-400/60" : "border-ink-100"
                    }`}
                  >
                    {c.rewardReady && (
                      <span className="absolute right-0 top-0 rounded-bl-2xl bg-gradient-to-r from-coral-400 to-berry-500 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                        {vi ? "Đủ điểm" : "Reward ready"}
                      </span>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-peach-100 text-base font-bold text-primary-700">
                        {initials(c.customerName)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold text-ink-900">{c.customerName}</p>
                        <p className="truncate text-xs text-ink-400">{c.customerEmail}</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-ink-700">{vi ? "Điểm" : "Points"}</span>
                        <span className="font-bold text-primary-600">
                          {c.points}/{program.pointsRequired}
                        </span>
                      </div>
                      <div className="h-2.5 overflow-hidden rounded-full bg-mist-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary-400 via-coral-400 to-peach-300 transition-all"
                          style={{ width: `${ratio * 100}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex flex-wrap gap-2 text-[11px]">
                      <span className="inline-flex items-center gap-1 rounded-full bg-sage-50 px-2.5 py-1 font-medium text-sage-600">
                        <ScanLine className="h-3 w-3" />
                        {c.totalScans} {vi ? "lượt quét" : "scans"}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-berry-50 px-2.5 py-1 font-medium text-berry-500">
                        <Gift className="h-3 w-3" />
                        {vi ? `đã giảm ${c.rewardsEarned} lần` : `${c.rewardsEarned} rewards`}
                      </span>
                    </div>

                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openSummary(c.id)}
                        className="btn-outline flex-1 !py-2 text-xs"
                      >
                        {vi ? "Thống kê" : "Summary"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setDetailsCardId(c.id)}
                        className="btn-primary flex-1 !py-2 text-xs"
                      >
                        {vi ? "Chi tiết" : "Details"}
                        <ChevronRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                    {c.rewardReady && (
                      <button
                        type="button"
                        disabled={busy}
                        onClick={() => applyReward(c.id)}
                        className="mt-2 inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-coral-500 to-berry-500 py-2 text-xs font-semibold text-white shadow-sm transition hover:brightness-105 disabled:opacity-50"
                      >
                        <Gift className="h-3.5 w-3.5" />
                        {vi ? `Áp dụng giảm ${program.discountPercent}%` : `Apply ${program.discountPercent}% off`}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      {hasProgram && (
        <section className="rounded-[24px] border border-ink-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 to-primary-100 text-teal-500">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-ink-900">{vi ? "Kích hoạt thẻ cho khách" : "Activate a card for a customer"}</h2>
              <p className="text-xs text-ink-400">
                {vi ? "Khách sẽ nhận mã QR thẻ tích điểm qua email." : "The customer gets their loyalty QR by email."}
              </p>
            </div>
          </div>
          <form onSubmit={addMember} className="grid gap-3 sm:grid-cols-3">
            <input required placeholder={vi ? "Họ tên" : "Name"} className="input" value={member.customerName} onChange={(e) => setMember({ ...member, customerName: e.target.value })} />
            <input required type="email" placeholder="Email" className="input" value={member.customerEmail} onChange={(e) => setMember({ ...member, customerEmail: e.target.value })} />
            <input placeholder={vi ? "Điện thoại (không bắt buộc)" : "Phone (optional)"} className="input" value={member.customerPhone} onChange={(e) => setMember({ ...member, customerPhone: e.target.value })} />
            {memberError && <p className="text-sm text-berry-500 sm:col-span-3">{memberError}</p>}
            {memberAdded && (
              <p className="flex items-center gap-1.5 text-sm text-teal-600 sm:col-span-3">
                <CheckCircle2 className="h-4 w-4" />
                {vi ? "Đã kích hoạt và gửi QR qua email." : "Activated — the QR has been emailed."}
              </p>
            )}
            <div className="sm:col-span-3">
              <button type="submit" disabled={adding} className="btn-primary">
                {adding ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                {vi ? "Kích hoạt và gửi QR qua email" : "Activate and email the QR"}
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="rounded-[24px] border border-ink-100 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-100 to-peach-100 text-primary-600">
              <Settings2 className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-ink-900">{vi ? "Cài đặt chương trình" : "Program settings"}</h2>
              {hasProgram && !editingProgram && <p className="text-xs text-ink-400">{programSummary}</p>}
            </div>
          </div>
          {hasProgram && !editingProgram && (
            <button type="button" onClick={() => setEditingProgram(true)} className="btn-outline !px-4 !py-2 text-xs">
              <Pencil className="h-3.5 w-3.5" />
              {vi ? "Chỉnh sửa" : "Edit"}
            </button>
          )}
          {programSaved && !editingProgram && (
            <span className="flex items-center gap-1 text-sm text-teal-600">
              <CheckCircle2 className="h-4 w-4" />
              {vi ? "Đã lưu" : "Saved"}
            </span>
          )}
        </div>
        {(!hasProgram || editingProgram) && (
          <form onSubmit={saveProgram} className="mt-5 grid gap-3 sm:grid-cols-2">
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
              {editingProgram && (
                <button type="button" onClick={() => setEditingProgram(false)} className="btn-ghost text-sm">
                  {vi ? "Hủy" : "Cancel"}
                </button>
              )}
            </div>
          </form>
        )}
      </section>

      {detailsCardId && (
        <LoyaltyDetailsModal
          cardId={detailsCardId}
          locale={locale}
          timeZone={timeZone}
          refreshKey={refreshKey}
          onClose={() => setDetailsCardId(null)}
        />
      )}
    </div>
  );
}
