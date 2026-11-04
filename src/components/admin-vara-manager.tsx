"use client";

import { useState } from "react";
import { Check, Coins, Loader2, Mail, Minus, Plus, Store } from "lucide-react";
import { useRouter } from "@/i18n/navigation";

export interface AdminVaraOwner {
  id: string;
  name: string | null;
  email: string;
  varaPoints: number;
  businesses: {
    id: string;
    name: string;
    city: string | null;
    emailDailyLimit: number | null;
    sentToday: number;
    ownEmailAllowed: boolean;
    /** The salon's own address and whether it's verified, when it set one. */
    marketingEmail: string | null;
    marketingEmailVerified: boolean;
  }[];
  history: { id: string; amount: number; reason: string; note: string | null; createdAt: string }[];
}

const REASONS: Record<string, string> = {
  SIGNUP_BONUS: "Thưởng đăng ký salon",
  DAILY_CHECKIN: "Điểm danh",
  REFERRAL_CLICK: "Lượt xem link giới thiệu",
  REFERRAL_SIGNUP_BONUS: "Giới thiệu salon mới",
  EMAIL_SENT: "Gửi email marketing",
  EMAIL_SENT_COOLDOWN_BYPASS: "Gửi email trước 72 giờ",
  ADMIN_ADJUST: "Admin điều chỉnh",
};

const date = new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" });

async function patchLimit(businessId: string | undefined, limit: number | null) {
  const res = await fetch("/api/admin/email-limit", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ businessId, limit }),
  }).catch(() => null);
  return !!res?.ok;
}

/** A number box with a save button; empty = no value (no cap / the default). */
function LimitField({ value, placeholder, onSave }: { value: number | null; placeholder: string; onSave: (v: number | null) => Promise<boolean> }) {
  const [text, setText] = useState(value?.toString() ?? "");
  const [state, setState] = useState<"idle" | "busy" | "ok" | "err">("idle");
  const n = text.trim() === "" ? null : Number(text);
  const valid = n === null || (Number.isInteger(n) && n >= 1 && n <= 100000);
  const dirty = n !== value;

  async function save() {
    setState("busy");
    setState((await onSave(n)) ? "ok" : "err");
  }

  return (
    <div className="flex items-center gap-1.5">
      <input
        type="number"
        min={1}
        max={100000}
        inputMode="numeric"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setState("idle");
        }}
        placeholder={placeholder}
        className={`input !h-9 w-36 !py-1 text-sm ${valid ? "" : "!border-berry-400"}`}
      />
      <button
        type="button"
        onClick={save}
        disabled={!dirty || !valid || state === "busy"}
        className="flex h-9 items-center gap-1 rounded-full bg-[#1f182d] px-3 text-xs font-bold text-white disabled:opacity-40"
      >
        {state === "busy" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : state === "ok" && !dirty ? <Check className="h-3.5 w-3.5" /> : null}
        Lưu
      </button>
      {state === "err" && <span className="text-xs text-berry-500">Lỗi</span>}
    </div>
  );
}

/** Lets one branch put its own verified address on its marketing emails. */
function OwnEmailSwitch({ b }: { b: AdminVaraOwner["businesses"][number] }) {
  const [on, setOn] = useState(b.ownEmailAllowed);
  const [busy, setBusy] = useState(false);
  async function toggle() {
    setBusy(true);
    const res = await fetch("/api/admin/own-email", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ businessId: b.id, allowed: !on }),
    }).catch(() => null);
    setBusy(false);
    if (res?.ok) setOn(!on);
  }
  return (
    <div className="flex w-full flex-wrap items-center gap-2 pl-6 text-xs">
      <button
        type="button"
        role="switch"
        aria-checked={on}
        onClick={toggle}
        disabled={busy}
        className={`relative h-5 w-9 shrink-0 rounded-full transition-colors disabled:opacity-60 ${on ? "bg-primary-500" : "bg-ink-100"}`}
      >
        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${on ? "left-[18px]" : "left-0.5"}`} />
      </button>
      <span className="font-semibold text-ink-700">Cho dùng email riêng của salon</span>
      {on &&
        (b.marketingEmail ? (
          <span className={`rounded-full px-2 py-0.5 ${b.marketingEmailVerified ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
            {b.marketingEmail} · {b.marketingEmailVerified ? "đã xác minh" : "chờ xác minh"}
          </span>
        ) : (
          <span className="text-ink-400">chủ salon chưa nhập email</span>
        ))}
    </div>
  );
}

function OwnerCard({ owner, defaultLimit }: { owner: AdminVaraOwner; defaultLimit: number | null }) {
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState<"add" | "take" | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const n = Number(amount);
  const valid = Number.isInteger(n) && n > 0 && n <= 1_000_000;

  async function adjust(sign: 1 | -1) {
    setBusy(sign > 0 ? "add" : "take");
    setMsg(null);
    const res = await fetch(`/api/admin/vara-points/${owner.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: sign * n, note: note.trim() || undefined }),
    }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      setMsg({ ok: false, text: d?.error === "BELOW_ZERO" ? `Không thể trừ quá số điểm đang có (${owner.varaPoints}).` : "Không lưu được, thử lại." });
      return;
    }
    setMsg({ ok: true, text: `${sign > 0 ? "Đã cộng" : "Đã trừ"} ${n.toLocaleString("vi-VN")} điểm — còn ${d.varaPoints.toLocaleString("vi-VN")}.` });
    setAmount("");
    setNote("");
    router.refresh();
  }

  return (
    <article className="rounded-3xl border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-36px_rgba(31,24,45,0.6)]">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-base font-bold text-ink-900">{owner.name || "—"}</p>
          <a href={`mailto:${owner.email}`} className="text-xs text-primary-600 hover:underline">
            {owner.email}
          </a>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">Điểm Vara</p>
          <p className="text-2xl font-extrabold tabular-nums text-ink-900">{owner.varaPoints.toLocaleString("vi-VN")}</p>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Add / take points */}
        <div className="rounded-2xl bg-mist-50/70 p-4 ring-1 ring-ink-100">
          <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-500">
            <Coins className="h-3.5 w-3.5" /> Điều chỉnh điểm
          </p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[100, 500, 1000, 5000].map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(String(v))}
                className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ${amount === String(v) ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-white/60"}`}
              >
                {v.toLocaleString("vi-VN")}
              </button>
            ))}
          </div>
          <div className="mt-2 grid gap-2 sm:grid-cols-[8rem_minmax(0,1fr)]">
            <input type="number" min={1} inputMode="numeric" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Số điểm" className="input !h-10 text-sm" />
            <input value={note} onChange={(e) => setNote(e.target.value)} maxLength={200} placeholder="Lý do (chủ salon sẽ thấy)" className="input !h-10 text-sm" />
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => adjust(1)}
              disabled={!valid || !!busy}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-emerald-600 py-2 text-sm font-bold text-white disabled:opacity-40"
            >
              {busy === "add" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />} Cộng điểm
            </button>
            <button
              type="button"
              onClick={() => adjust(-1)}
              disabled={!valid || !!busy}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-berry-500 py-2 text-sm font-bold text-white disabled:opacity-40"
            >
              {busy === "take" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Minus className="h-4 w-4" />} Trừ điểm
            </button>
          </div>
          {msg && <p className={`mt-2 text-xs font-semibold ${msg.ok ? "text-emerald-700" : "text-berry-500"}`}>{msg.text}</p>}
        </div>

        {/* Recent history */}
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink-500">Lịch sử gần đây</p>
          {owner.history.length === 0 ? (
            <p className="mt-2 text-xs text-ink-400">Chưa có.</p>
          ) : (
            <ul className="mt-2 space-y-1">
              {owner.history.map((t) => (
                <li key={t.id} className="flex items-center justify-between gap-3 text-xs">
                  <span className="min-w-0 truncate text-ink-700">
                    {REASONS[t.reason] ?? t.reason}
                    {t.note && <span className="text-ink-400"> · {t.note}</span>}
                    <span className="text-ink-300"> · {date.format(new Date(t.createdAt))}</span>
                  </span>
                  <span className={`shrink-0 font-semibold tabular-nums ${t.amount >= 0 ? "text-emerald-600" : "text-berry-500"}`}>
                    {t.amount >= 0 ? "+" : ""}
                    {t.amount.toLocaleString("vi-VN")}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Email cap per branch */}
      <div className="mt-4 border-t border-ink-100 pt-4">
        <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-500">
          <Mail className="h-3.5 w-3.5" /> Email marketing mỗi ngày
        </p>
        <ul className="mt-2 divide-y divide-ink-100">
          {owner.businesses.map((b) => (
            <li key={b.id} className="flex flex-wrap items-center justify-between gap-2 py-2">
              <span className="flex min-w-0 items-center gap-2 text-sm">
                <Store className="h-4 w-4 shrink-0 text-ink-300" />
                <span className="truncate font-semibold text-ink-900">{b.name}</span>
                {b.city && <span className="text-xs text-ink-400">{b.city}</span>}
                <span className="rounded-full bg-mist-50 px-2 py-0.5 text-[11px] text-ink-500">24h qua: {b.sentToday}</span>
              </span>
              <LimitField
                value={b.emailDailyLimit}
                placeholder={defaultLimit ? `Mặc định ${defaultLimit}` : "Không giới hạn"}
                onSave={(v) => patchLimit(b.id, v)}
              />
              <OwnEmailSwitch b={b} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export function AdminVaraManager({ owners, defaultLimit }: { owners: AdminVaraOwner[]; defaultLimit: number | null }) {
  const router = useRouter();
  return (
    <div className="space-y-4">
      <div className="rounded-3xl bg-gradient-to-br from-[#1f182d] to-[#3b2d57] p-5 text-white">
        <p className="flex items-center gap-2 text-sm font-bold">
          <Mail className="h-4 w-4 text-[#e8d3a6]" /> Giới hạn email mặc định cho mọi salon
        </p>
        <p className="mt-1 text-xs text-white/70">
          Số email marketing tối đa một salon gửi trong 24 giờ. Chiến dịch lớn hơn tự chia ra: phần còn lại gửi tiếp vào đúng giờ đó hôm sau cho đến khi hết — tránh bị
          vào thư rác. Để trống = không giới hạn. Ô của từng salon bên dưới ghi đè mức này.
        </p>
        <div className="mt-3 [&_input]:bg-white [&_input]:text-ink-900">
          <LimitField
            value={defaultLimit}
            placeholder="Không giới hạn"
            onSave={async (v) => {
              const ok = await patchLimit(undefined, v);
              if (ok) router.refresh();
              return ok;
            }}
          />
        </div>
      </div>

      {owners.length === 0 && <p className="rounded-3xl border border-ink-100 bg-white px-4 py-10 text-center text-sm text-ink-400">Không tìm thấy chủ salon.</p>}
      {owners.map((o) => (
        <OwnerCard key={o.id} owner={o} defaultLimit={defaultLimit} />
      ))}
    </div>
  );
}
