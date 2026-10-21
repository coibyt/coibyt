"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, Play, Square, Store, UserRound } from "lucide-react";
import { CATEGORIES, RINGTONES, playRingtoneOnce, ringtoneById, type Ringtone } from "@/lib/ringtones";

type Role = "owner" | "staff";
const L = {
  vi: {
    title: "Nhạc chuông báo lịch hẹn",
    intro: "Nghe thử rồi chọn chuông kêu khi có khách đặt lịch ngay trong ngày. Chọn riêng cho chủ salon và cho nhân viên. Chuông áp dụng cho mọi salon, điện thoại có mở VaraaAi hoặc trang quản trị mới kêu chuông.",
    owner: "Chủ salon",
    staff: "Nhân viên",
    current: "Đang dùng",
    play: "Nghe thử",
    stop: "Dừng",
    useOwner: "Dùng cho chủ salon",
    useStaff: "Dùng cho nhân viên",
    saved: "Đã lưu",
    failed: "Không lưu được, thử lại.",
    ringLoop: "Nghe lặp lại như khi có khách đặt",
    tip: "Mẹo: chọn nhóm “Báo thức số” hoặc “Khẩn cấp” nếu salon ồn; nhóm “Nhẹ nhàng” hợp với spa yên tĩnh.",
    all: "Tất cả",
  },
  en: {
    title: "Booking-alarm ringtones",
    intro: "Listen, then choose the ringtone that rings when a customer books for today. Choose one for salon owners and one for staff. The choice applies to every salon; the alarm rings on phones that have VaraaAi or the dashboard open.",
    owner: "Salon owners",
    staff: "Staff",
    current: "In use",
    play: "Listen",
    stop: "Stop",
    useOwner: "Use for owners",
    useStaff: "Use for staff",
    saved: "Saved",
    failed: "Could not save, try again.",
    ringLoop: "Repeat like a real booking",
    tip: "Tip: pick “Digital alarm” or “Urgent” for a noisy salon; “Soft chime” suits a quiet spa.",
    all: "All",
  },
};

/** Admin: audition the 100 ringtones and choose the one used for owners and for staff. */
export function RingtoneAdmin({ locale, initial }: { locale: string; initial: { owner: string; staff: string } }) {
  const t = locale === "vi" ? L.vi : L.en;
  const lang = locale === "vi" ? "vi" : "en";
  const [chosen, setChosen] = useState(initial);
  const [playing, setPlaying] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [cat, setCat] = useState<string>("all");
  const [loop, setLoop] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function ctx() {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") void ctxRef.current.resume();
    return ctxRef.current;
  }

  function stop() {
    if (timer.current) clearTimeout(timer.current);
    timer.current = null;
    setPlaying(null);
  }

  function play(id: string) {
    const c = ctx();
    if (!c) return;
    stop();
    setPlaying(id);
    const ring = (round: number) => {
      const ms = playRingtoneOnce(c, id);
      timer.current = setTimeout(() => {
        if (loop && round < 5) ring(round + 1);
        else stop();
      }, ms + (loop ? 700 : 100));
    };
    ring(0);
  }

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); void ctxRef.current?.close(); }, []);

  async function choose(role: Role, id: string) {
    setSaving(`${role}:${id}`);
    setNote(null);
    const r = await fetch("/api/admin/ringtone", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ role, id }) });
    setSaving(null);
    if (r.ok) {
      setChosen((c) => ({ ...c, [role]: id }));
      setNote({ ok: true, text: t.saved });
    } else setNote({ ok: false, text: t.failed });
  }

  const list: Ringtone[] = RINGTONES.filter((r) => cat === "all" || r.category === cat);

  return (
    <div>
      <h1 className="text-xl font-extrabold text-ink-900">{t.title}</h1>
      <p className="mt-2 max-w-3xl text-sm text-ink-700">{t.intro}</p>

      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {(["owner", "staff"] as const).map((role) => {
          const r = ringtoneById(chosen[role]);
          return (
            <div key={role} className="flex items-center gap-3 rounded-2xl border border-ink-100 bg-white p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">{role === "owner" ? <Store className="h-5 w-5" /> : <UserRound className="h-5 w-5" />}</span>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold uppercase tracking-wide text-ink-400">{role === "owner" ? t.owner : t.staff} · {t.current}</p>
                <p className="truncate font-bold text-ink-900">{r.name[lang]}</p>
              </div>
              <button type="button" onClick={() => (playing === r.id ? stop() : play(r.id))} className="shrink-0 rounded-full bg-mist-100 px-4 py-2 text-sm font-bold text-ink-900">
                {playing === r.id ? t.stop : t.play}
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {[{ id: "all", label: t.all }, ...CATEGORIES.map((c) => ({ id: c.id, label: c[lang] }))].map((c) => (
          <button key={c.id} type="button" onClick={() => setCat(c.id)} className={`rounded-full px-3.5 py-1.5 text-sm font-semibold ${cat === c.id ? "bg-ink-900 text-white" : "bg-mist-100 text-ink-700"}`}>
            {c.label}
          </button>
        ))}
      </div>
      <label className="mt-3 flex items-center gap-2 text-sm text-ink-700">
        <input type="checkbox" checked={loop} onChange={(e) => setLoop(e.target.checked)} className="h-4 w-4" /> {t.ringLoop}
      </label>
      <p className="mt-2 text-xs text-ink-400">{t.tip}</p>
      {note && <p role="status" className={`mt-3 text-sm font-semibold ${note.ok ? "text-primary-600" : "text-berry-500"}`}>{note.text}</p>}

      <ul className="mt-4 grid gap-2 lg:grid-cols-2">
        {list.map((r) => {
          const isPlaying = playing === r.id;
          return (
            <li key={r.id} className={`flex items-center gap-3 rounded-2xl border bg-white p-3 ${chosen.owner === r.id || chosen.staff === r.id ? "border-primary-300" : "border-ink-100"}`}>
              <button
                type="button" onClick={() => (isPlaying ? stop() : play(r.id))} aria-label={`${isPlaying ? t.stop : t.play}: ${r.name[lang]}`}
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white ${isPlaying ? "bg-berry-500" : "bg-primary-500"}`}
              >
                {isPlaying ? <Square className="h-4 w-4 fill-white" /> : <Play className="h-4 w-4 fill-white" />}
              </button>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-ink-900">{r.name[lang]}</p>
                <p className="text-xs text-ink-400">{(CATEGORIES.find((c) => c.id === r.category)?.hint ?? { vi: "", en: "" })[lang]}</p>
              </div>
              <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
                {(["owner", "staff"] as const).map((role) => {
                  const on = chosen[role] === r.id;
                  const busy = saving === `${role}:${r.id}`;
                  return (
                    <button
                      key={role} type="button" disabled={on || busy} onClick={() => choose(role, r.id)}
                      className={`flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold ${on ? "bg-primary-500 text-white" : "bg-mist-100 text-ink-700 hover:bg-mist-200"}`}
                    >
                      {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : on ? <Check className="h-3.5 w-3.5" /> : null}
                      {role === "owner" ? t.owner : t.staff}
                    </button>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
