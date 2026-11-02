"use client";

import { useState } from "react";
import { Bot, CheckCircle2, ExternalLink, Loader2, Send, Trash2, TriangleAlert } from "lucide-react";

export interface TelegramBotStatus {
  username: string;
  webhookOk: boolean;
  pending: number;
  lastError: string | null;
  lastErrorAt: string | null;
  groups: number;
  salons: number;
}

/** Admin: connect the Telegram bot that reminds salon staff to report their
 * income (/api/admin/telegram). Vietnamese-only, like the rest of admin. */
export function TelegramAdmin({ initial }: { initial: TelegramBotStatus | null }) {
  const [bot, setBot] = useState(initial);
  const [token, setToken] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function connect() {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/admin/telegram", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    }).catch(() => null);
    const d = await res?.json().catch(() => ({}));
    setBusy(false);
    if (!res?.ok) {
      setError(d?.error === "INVALID_TOKEN" ? "Token không đúng định dạng (dạng 123456789:ABC…)." : `Telegram từ chối: ${d?.detail ?? "lỗi không rõ"}`);
      return;
    }
    setBot(d.bot);
    setToken("");
  }

  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  async function refreshProfile() {
    setBusy(true);
    setProfileMsg(null);
    const res = await fetch("/api/admin/telegram", { method: "PATCH" }).catch(() => null);
    const d = await res?.json().catch(() => ({}));
    setBusy(false);
    setProfileMsg(res?.ok ? "Đã cập nhật giới thiệu, mô tả và menu lệnh của bot (Việt, Anh, Phần Lan)." : `Telegram từ chối: ${d?.detail ?? "lỗi không rõ"}`);
  }

  async function disconnect() {
    if (!confirm("Ngắt bot? Các salon sẽ không nhận nhắc qua Telegram nữa.")) return;
    setBusy(true);
    await fetch("/api/admin/telegram", { method: "DELETE" }).catch(() => null);
    setBusy(false);
    setBot(null);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold text-ink-900">
          <Bot className="h-5 w-5 text-[#229ED9]" /> Bot Telegram nhắc báo cáo thu nhập
        </h1>
        <p className="mt-1 text-sm text-ink-400">
          Một bot chung cho cả nền tảng. Chủ salon tự thêm bot vào nhóm nhân viên và bật/tắt nhắc ở trang Doanh thu; bot nhắc mỗi ngày một lần (10:00–20:00 giờ salon) khi có lịch hẹn kết thúc quá 24 giờ chưa báo cáo.
        </p>
      </div>

      {bot ? (
        <section className="card space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#229ED9] text-white">
                <Send className="h-5 w-5" />
              </span>
              <div>
                <a href={`https://t.me/${bot.username}`} target="_blank" rel="noreferrer" className="flex items-center gap-1 font-bold text-ink-900 hover:underline">
                  @{bot.username} <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <p className={`flex items-center gap-1 text-xs font-semibold ${bot.webhookOk ? "text-emerald-700" : "text-berry-600"}`}>
                  {bot.webhookOk ? <CheckCircle2 className="h-3.5 w-3.5" /> : <TriangleAlert className="h-3.5 w-3.5" />}
                  {bot.webhookOk ? "Đang hoạt động — Telegram gửi tin về website" : "Webhook chưa trỏ về website — dán lại token để kết nối lại"}
                </p>
              </div>
            </div>
            <button type="button" disabled={busy} onClick={disconnect} className="btn-ghost !px-3 !py-1.5 text-xs text-berry-600">
              <Trash2 className="h-3.5 w-3.5" /> Ngắt bot
            </button>
          </div>
          <dl className="grid grid-cols-3 gap-2 text-center">
            {[
              ["Salon bật nhắc", bot.salons],
              ["Nhóm đã nối", bot.groups],
              ["Tin chờ xử lý", bot.pending],
            ].map(([k, v]) => (
              <div key={k} className="rounded-2xl bg-mist-50 p-3">
                <dt className="text-[11px] text-ink-400">{k}</dt>
                <dd className="text-lg font-bold text-ink-900">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="rounded-2xl bg-[#f4f1fa] p-4 text-sm text-[#40325c]">
            <p className="font-bold">Trợ lý AI trong tin nhắn riêng</p>
            <p className="mt-1 text-xs leading-relaxed">
              Ai nhắn riêng cho @{bot.username} sẽ được trợ lý AI của VaraaAi trả lời (cùng kiến thức với chat hỗ trợ trên web), kèm nút “Đăng ký salon miễn phí” và “Thẻ tích điểm miễn phí”. Giới thiệu, mô tả và menu lệnh của bot được đặt tự động khi kết nối.
            </p>
            <p className="mt-2 text-xs leading-relaxed">
              Ảnh đại diện chỉ đặt được qua @BotFather: gửi lệnh <code className="rounded bg-white px-1">/setuserpic</code>, chọn bot, rồi gửi logo VaraaAi.
            </p>
            <button type="button" disabled={busy} onClick={refreshProfile} className="btn-outline mt-3 !px-3 !py-1.5 text-xs">
              {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Bot className="h-3.5 w-3.5" />} Cập nhật giới thiệu bot
            </button>
            {profileMsg && <p className="mt-2 text-xs font-semibold">{profileMsg}</p>}
          </div>
          {bot.lastError && (
            <p className="rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-800">
              Lỗi gần nhất từ Telegram{bot.lastErrorAt ? ` (${new Date(bot.lastErrorAt).toLocaleString("vi-VN")})` : ""}: {bot.lastError}
            </p>
          )}
        </section>
      ) : (
        <section className="card space-y-4">
          <p className="font-bold text-ink-900">Kết nối bot</p>
          <ol className="list-decimal space-y-1.5 pl-5 text-sm text-ink-700">
            <li>
              Mở Telegram, nhắn cho{" "}
              <a href="https://t.me/BotFather" target="_blank" rel="noreferrer" className="font-semibold text-primary-600 hover:underline">
                @BotFather
              </a>{" "}
              lệnh <code className="rounded bg-mist-50 px-1">/newbot</code>.
            </li>
            <li>Đặt tên hiển thị (ví dụ “VaraaAi Nhắc việc”) và username kết thúc bằng “bot” (ví dụ VaraaAiRemindBot).</li>
            <li>BotFather gửi lại một token dạng <code className="rounded bg-mist-50 px-1">123456789:AA…</code> — dán vào ô dưới và bấm Kết nối.</li>
          </ol>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="password"
              autoComplete="off"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder="Token của bot"
              className="input flex-1 font-mono text-sm"
            />
            <button type="button" disabled={busy || !token.trim()} onClick={connect} className="btn-primary">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Kết nối
            </button>
          </div>
          {error && <p className="rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
          <p className="text-xs text-ink-400">Token được lưu trong cơ sở dữ liệu và chỉ dùng ở máy chủ, không hiển thị lại.</p>
        </section>
      )}
    </div>
  );
}
