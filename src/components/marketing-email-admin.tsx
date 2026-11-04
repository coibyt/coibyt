"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Mail, Send, ShieldCheck, Trash2 } from "lucide-react";

const SLOTS = 8;

interface Smtp {
  host: string;
  port: number;
  boxes: { user: string; enabled: boolean }[];
}
interface Row {
  user: string;
  pass: string;
  enabled: boolean;
  saved: boolean;
}

const rowsFrom = (smtp: Smtp | null): Row[] =>
  Array.from({ length: SLOTS }, (_, i) => {
    const b = smtp?.boxes[i];
    return { user: b?.user ?? "", pass: "", enabled: b?.enabled ?? true, saved: !!b };
  });

/** Admin: up to 8 mailboxes that salons' marketing emails go out from, in turn. */
export function MarketingEmailAdmin({ initial }: { initial: Smtp | null }) {
  const [smtp, setSmtp] = useState(initial);
  const [host, setHost] = useState(initial?.host ?? "smtp.hostinger.com");
  const [port, setPort] = useState(String(initial?.port ?? 465));
  const [rows, setRows] = useState<Row[]>(() => rowsFrom(initial));
  const [checks, setChecks] = useState<Record<string, string | null>>({});
  const [testTo, setTestTo] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const setRow = (i: number, patch: Partial<Row>) => setRows((rs) => rs.map((r, j) => (j === i ? { ...r, ...patch } : r)));

  async function save() {
    setBusy("save");
    setMsg(null);
    const res = await fetch("/api/admin/marketing-email", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host,
        port: Number(port),
        boxes: rows.filter((r) => r.user.trim()).map((r) => ({ user: r.user.trim(), pass: r.pass, enabled: r.enabled })),
      }),
    }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(null);
    if (!res?.ok) {
      setMsg({ ok: false, text: "Thông tin chưa đúng — kiểm tra lại máy chủ, cổng và các địa chỉ email." });
      return;
    }
    setSmtp(d.smtp);
    setRows(rowsFrom(d.smtp));
    setChecks(d.checks ?? {});
    const failed = Object.values(d.checks ?? {}).filter(Boolean).length;
    const total = d.smtp?.boxes.length ?? 0;
    setMsg(
      total === 0
        ? { ok: true, text: "Chưa có hộp thư nào — email marketing đang gửi bằng hộp thư chính." }
        : failed
          ? { ok: false, text: `Đã lưu ${total} hộp thư, nhưng ${failed} hộp chưa đăng nhập được — xem dòng báo đỏ bên dưới.` }
          : { ok: true, text: `Đã lưu và đăng nhập thử thành công cả ${total} hộp thư.` },
    );
  }

  async function test(from: string) {
    setBusy(`test:${from}`);
    setMsg(null);
    const res = await fetch("/api/admin/marketing-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: testTo }),
    }).catch(() => null);
    const d = await res?.json().catch(() => null);
    setBusy(null);
    setMsg(res?.ok ? { ok: true, text: `Đã gửi thử từ ${from} tới ${testTo}.` } : { ok: false, text: `Gửi thử từ ${from} không được${d?.detail ? `: ${d.detail}` : "."}` });
  }

  async function removeAll() {
    setBusy("remove");
    setMsg(null);
    const res = await fetch("/api/admin/marketing-email", { method: "DELETE" }).catch(() => null);
    setBusy(null);
    if (res?.ok) {
      setSmtp(null);
      setRows(rowsFrom(null));
      setChecks({});
      setMsg({ ok: true, text: "Đã gỡ hết. Email marketing quay lại gửi bằng hộp thư chính." });
    }
  }

  const active = smtp?.boxes.filter((b) => b.enabled).length ?? 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink-900">Hộp thư email marketing</h1>
        <p className="mt-1 text-sm text-ink-400">
          Email chăm sóc khách hàng của các chủ salon gửi đi từ các hộp thư riêng này, <strong>luân phiên</strong>: mỗi email lần lượt đi từ hộp thư kế tiếp nên không hộp nào
          gửi quá nhiều. Hộp nào lỗi sẽ tạm bỏ qua 30 phút và chuyển sang hộp khác. Email xác nhận lịch hẹn, đăng nhập… vẫn gửi từ hộp thư chính nên không bị ảnh hưởng nếu
          có hộp marketing bị đánh dấu spam.
        </p>
      </div>

      <div className={`flex items-center gap-3 rounded-3xl p-4 ring-1 ${active ? "bg-emerald-50 ring-emerald-200" : "bg-amber-50 ring-amber-200"}`}>
        {active ? <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" /> : <Mail className="h-5 w-5 shrink-0 text-amber-600" />}
        <p className={`text-sm font-semibold ${active ? "text-emerald-800" : "text-amber-800"}`}>
          {active ? `Đang gửi luân phiên qua ${active} hộp thư (${smtp?.host}:${smtp?.port}).` : "Chưa cài — email marketing đang gửi bằng hộp thư chính."}
        </p>
      </div>

      <div className="space-y-4 rounded-3xl border border-ink-100 bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_7rem]">
          <label className="block">
            <span className="text-xs font-bold text-ink-700">Máy chủ SMTP (chung cho cả 8 hộp)</span>
            <input value={host} onChange={(e) => setHost(e.target.value)} className="input mt-1" />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-ink-700">Cổng</span>
            <input value={port} onChange={(e) => setPort(e.target.value)} inputMode="numeric" className="input mt-1" />
          </label>
        </div>

        <ul className="space-y-2">
          {rows.map((r, i) => {
            const check = r.saved ? checks[r.user.toLowerCase()] : undefined;
            return (
              <li key={i} className="rounded-2xl bg-mist-50/60 p-3 ring-1 ring-ink-100">
                <div className="flex items-center gap-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-ink-500 ring-1 ring-ink-100">{i + 1}</span>
                  <div className="grid min-w-0 flex-1 gap-2 sm:grid-cols-2">
                    <input
                      type="email"
                      value={r.user}
                      onChange={(e) => setRow(i, { user: e.target.value, saved: false })}
                      placeholder={`support00${i + 1}@varaaai.com`}
                      className="input !h-10 text-sm"
                    />
                    <input
                      type="password"
                      autoComplete="new-password"
                      value={r.pass}
                      onChange={(e) => setRow(i, { pass: e.target.value })}
                      placeholder={r.saved ? "•••••••• (để trống = giữ mật khẩu cũ)" : "Mật khẩu"}
                      className="input !h-10 text-sm"
                    />
                  </div>
                  <label className="flex shrink-0 items-center gap-1 text-[11px] font-semibold text-ink-500" title="Dùng hộp thư này">
                    <input type="checkbox" checked={r.enabled} onChange={(e) => setRow(i, { enabled: e.target.checked })} className="h-4 w-4 accent-primary-500" />
                    Dùng
                  </label>
                </div>
                {r.saved && (
                  <div className="mt-2 flex flex-wrap items-center justify-between gap-2 pl-9 text-[11px]">
                    {check === undefined ? (
                      <span className="text-ink-400">Đã lưu</span>
                    ) : check === null ? (
                      <span className="flex items-center gap-1 font-semibold text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" /> Đăng nhập được
                      </span>
                    ) : (
                      <span className="flex min-w-0 items-center gap-1 font-semibold text-berry-500">
                        <AlertCircle className="h-3.5 w-3.5 shrink-0" /> <span className="truncate">{check}</span>
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => test(r.user)}
                      disabled={!!busy || !testTo}
                      title={testTo ? "" : "Nhập email nhận thử ở ô bên dưới"}
                      className="flex items-center gap-1 rounded-full bg-white px-3 py-1 font-semibold text-ink-700 ring-1 ring-ink-100 disabled:opacity-40"
                    >
                      {busy === `test:${r.user}` ? <Loader2 className="h-3 w-3 animate-spin" /> : <Send className="h-3 w-3" />}
                      Gửi thử
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>

        <p className="flex items-center gap-1 text-[11px] text-ink-400">
          <ShieldCheck className="h-3.5 w-3.5" /> Mật khẩu được mã hóa khi lưu và không bao giờ hiển thị lại. Xóa trống ô email để bỏ một hộp thư.
        </p>

        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={save} disabled={!!busy || !host} className="flex items-center gap-2 rounded-full bg-[#1f182d] px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50">
            {busy === "save" && <Loader2 className="h-4 w-4 animate-spin" />}
            Lưu và kiểm tra
          </button>
          {smtp && (
            <button type="button" onClick={removeAll} disabled={!!busy} className="flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-berry-500 ring-1 ring-berry-100 hover:bg-berry-50">
              {busy === "remove" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
              Gỡ tất cả
            </button>
          )}
        </div>
      </div>

      {smtp && (
        <div className="rounded-3xl border border-ink-100 bg-white p-5">
          <p className="text-sm font-bold text-ink-900">Email nhận thử</p>
          <p className="text-xs text-ink-400">Nhập email của bạn, rồi bấm «Gửi thử» ở từng hộp thư phía trên.</p>
          <input type="email" value={testTo} onChange={(e) => setTestTo(e.target.value)} placeholder="email nhận thử" className="input mt-2" />
        </div>
      )}

      {msg && <p className={`rounded-2xl px-4 py-3 text-sm font-semibold ${msg.ok ? "bg-emerald-50 text-emerald-800" : "bg-berry-50 text-berry-600"}`}>{msg.text}</p>}
    </div>
  );
}
