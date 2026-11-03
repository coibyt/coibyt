"use client";

import { useState } from "react";
import { Check, Globe, LayoutDashboard, Loader2, Mail, Sparkles } from "lucide-react";
import { SEASONAL_THEMES, resolveTheme, themeText } from "@/lib/seasonal-themes";
import type { SiteThemeSetting } from "@/lib/platform-season";
import { SeasonalBanner } from "@/components/seasonal-banner";

/** Admin › Giao diện mùa lễ: one holiday look for the whole website — public
 * pages, the owner/staff dashboards and every email (Vietnamese, like the
 * rest of admin). */
export function SiteThemeAdmin({ initial }: { initial: SiteThemeSetting }) {
  const [s, setS] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function save(patch: Partial<SiteThemeSetting>) {
    const next = { ...s, ...patch };
    setS(next);
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/admin/site-theme", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) }).catch(() => null);
    setBusy(false);
    if (!res?.ok) {
      setS(s);
      setMsg("Không lưu được, vui lòng thử lại.");
      return;
    }
    setMsg("Đã lưu — website đổi giao diện trong vòng một phút.");
  }

  const active = resolveTheme(s.theme, "Europe/Helsinki");
  const tile = (on: boolean) =>
    `relative flex flex-col overflow-hidden rounded-2xl text-left ring-2 transition ${on ? "ring-[#c99a3f] shadow-[0_12px_28px_-16px_rgba(185,133,45,0.9)]" : "ring-transparent hover:ring-ink-100"}`;
  const Tick = () => (
    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c99a3f] text-white">
      <Check className="h-3 w-3" />
    </span>
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="flex items-center gap-2 text-xl font-bold text-ink-900">
          <Sparkles className="h-5 w-5 text-[#c99a3f]" /> Giao diện mùa lễ cho toàn website
        </h1>
        <p className="mt-1 text-sm text-ink-400">
          Chọn một giao diện ngày lễ cho VaraaAi: một dải trang trí dưới thanh menu trên mọi trang, và dải chúc mừng trên đầu mọi email. Salon nào tự chọn giao diện riêng (Cài đặt › Giao diện & màu sắc) vẫn giữ giao diện của salon trên trang đặt lịch và lịch hẹn.
        </p>
      </div>

      <section className="card">
        <p className="font-bold text-ink-900">Giao diện</p>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <button type="button" disabled={busy} onClick={() => save({ theme: null })} className={tile(!s.theme)}>
            <span className="flex h-16 items-center justify-center bg-mist-50 text-xs text-ink-400">—</span>
            <span className="bg-white px-2.5 py-2 text-xs font-bold text-ink-900">Không dùng</span>
            {!s.theme && <Tick />}
          </button>
          <button type="button" disabled={busy} onClick={() => save({ theme: "auto" })} className={tile(s.theme === "auto")}>
            <span className="flex h-16 items-center justify-center bg-gradient-to-br from-[#1f182d] via-[#624f89] to-[#c99a3f] text-2xl">🎄🧧🎃</span>
            <span className="bg-white px-2.5 py-2 text-xs font-bold text-ink-900">Tự động theo ngày lễ</span>
            {s.theme === "auto" && <Tick />}
          </button>
          {SEASONAL_THEMES.map((th) => (
            <button key={th.id} type="button" disabled={busy} onClick={() => save({ theme: th.id })} className={tile(s.theme === th.id)}>
              <span className="flex h-16 items-center justify-center gap-1 text-2xl" style={{ backgroundImage: `linear-gradient(120deg, ${th.from}, ${th.to})` }}>
                {th.emojis.slice(0, 3).join(" ")}
              </span>
              <span className="bg-white px-2.5 py-2 text-xs font-bold text-ink-900">{themeText(th.name, "vi")}</span>
              {s.theme === th.id && <Tick />}
            </button>
          ))}
        </div>
        {s.theme === "auto" && (
          <p className="mt-3 text-xs font-semibold text-[#8a6a2c]">{active ? `Hôm nay: ${themeText(active.name, "vi")}` : "Hôm nay không có ngày lễ — website hiển thị bình thường."}</p>
        )}
      </section>

      {s.theme && (
        <section className="card">
          <p className="font-bold text-ink-900">Áp dụng cho</p>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {(
              [
                ["site", Globe, "Website công khai", "Trang chủ, tìm salon, trang đặt lịch, giới thiệu…"],
                ["dashboard", LayoutDashboard, "Trang quản trị", "Chủ salon và nhân viên (cả trang admin)"],
                ["emails", Mail, "Email", "Mọi email gửi khách hàng, chủ salon, nhân viên"],
              ] as const
            ).map(([key, Icon, title, sub]) => (
              <label key={key} className={`flex cursor-pointer items-start gap-3 rounded-2xl p-3 ring-1 transition ${s[key] ? "bg-[#fffaf0] ring-[#ecd9ad]" : "bg-white ring-ink-100"}`}>
                <input type="checkbox" checked={s[key]} disabled={busy} onChange={(e) => save({ [key]: e.target.checked })} className="mt-1 h-4 w-4 accent-[#c99a3f]" />
                <span>
                  <span className="flex items-center gap-1.5 text-sm font-bold text-ink-900">
                    <Icon className="h-4 w-4 text-[#b08a3e]" />
                    {title}
                  </span>
                  <span className="text-xs text-ink-400">{sub}</span>
                </span>
              </label>
            ))}
          </div>
          {active && (
            <div className="mt-5 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-ink-400">Xem trước</p>
              <SeasonalBanner theme={active} locale="vi" />
            </div>
          )}
        </section>
      )}

      {(busy || msg) && (
        <p className="flex items-center gap-2 text-xs font-semibold text-emerald-700">
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          {busy ? "Đang lưu…" : msg}
        </p>
      )}
    </div>
  );
}
