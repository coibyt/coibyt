"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BellRing, BellOff, CalendarDays, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { playRingtoneOnce, ringtoneById } from "@/lib/ringtones";

interface Alert {
  id: string;
  time: string;
  customer: string;
  service: string;
  staff: string | null;
  branch: string;
}

const POLL_MS = 20_000;
const RING_MS = 45_000;
const PREF_KEY = "varaaai_booking_alarm";
const SNOOZE_KEY = "varaaai_booking_alarm_later";
const SEEN_KEY = "varaaai_booking_alarm_seen";

const L = {
  vi: {
    promptTitle: "Bật chuông báo lịch hẹn mới",
    promptBody: "Điện thoại sẽ đổ chuông to và rung khi có khách đặt lịch trong ngày hôm nay.",
    enable: "Bật chuông",
    later: "Để sau",
    on: "Chuông báo đang bật",
    test: "Thử chuông",
    off: "Tắt chuông",
    alarmTitle: "Lịch hẹn mới hôm nay!",
    view: "Xem lịch hẹn",
    stop: "Tắt chuông",
    with: "với",
    keepOpen: "Giữ trang quản trị mở (hoặc ứng dụng VaraaAi) để chuông kêu khi có lịch mới.",
    blocked: "Trình duyệt chặn âm thanh — hãy chạm vào màn hình một lần sau khi mở trang.",
  },
  en: {
    promptTitle: "Turn on the new-booking alarm",
    promptBody: "Your phone will ring loudly and vibrate when a customer books for today.",
    enable: "Turn on",
    later: "Later",
    on: "Booking alarm is on",
    test: "Test the alarm",
    off: "Turn off",
    alarmTitle: "New booking today!",
    view: "View bookings",
    stop: "Stop ringing",
    with: "with",
    keepOpen: "Keep the dashboard (or the VaraaAi app) open so the alarm can ring.",
    blocked: "The browser blocked sound — tap the screen once after opening the page.",
  },
  fi: {
    promptTitle: "Ota uuden varauksen hälytys käyttöön",
    promptBody: "Puhelin soi kovaa ja värisee, kun asiakas varaa ajan tälle päivälle.",
    enable: "Ota käyttöön",
    later: "Myöhemmin",
    on: "Varaushälytys on päällä",
    test: "Testaa hälytys",
    off: "Poista käytöstä",
    alarmTitle: "Uusi varaus tänään!",
    view: "Näytä varaukset",
    stop: "Lopeta soitto",
    with: "tekijä",
    keepOpen: "Pidä hallintapaneeli (tai VaraaAi-sovellus) auki, jotta hälytys voi soida.",
    blocked: "Selain esti äänen — napauta näyttöä kerran sivun avaamisen jälkeen.",
  },
};

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const raw = atob(base64);
  return Uint8Array.from([...raw].map((c) => c.charCodeAt(0)));
}

/** Registers this device for push notifications where the browser supports
 * them (Chrome, installed web app) — the Android wrapper app's WebView
 * doesn't, which is fine: the in-page alarm covers it while it's open. */
async function subscribePush() {
  try {
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) return;
    const permission = await Notification.requestPermission();
    const key = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
    if (permission !== "granted" || !key) return;
    const registration = await navigator.serviceWorker.ready;
    const subscription =
      (await registration.pushManager.getSubscription()) ??
      (await registration.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: urlBase64ToUint8Array(key) }));
    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(subscription.toJSON()),
    });
  } catch {
    // Push is a bonus on top of the in-page alarm.
  }
}

function readSeen(): string[] {
  try {
    return JSON.parse(localStorage.getItem(SEEN_KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** Rings loudly (a synthesized bell, repeated) and vibrates whenever a
 * customer books for TODAY while the dashboard is open — in the browser, the
 * installed web app, or the Android app. Also offers to turn on push
 * notifications for when the dashboard is closed. */
export function BookingAlarm({ locale, global = false }: { locale: string; global?: boolean }) {
  const t = (L as Record<string, (typeof L)["en"]>)[locale] ?? L.en;
  const pathname = usePathname();
  // The site-wide copy only rings (once the owner has switched the alarm on
  // in the dashboard) and stays out of the dashboard, which has its own.
  const inactive = global && /\/business\/dashboard(\/|$)/.test(pathname ?? "");
  const [pref, setPref] = useState<"on" | "off" | null | "loading">("loading");
  const [snoozed, setSnoozed] = useState(false);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [menu, setMenu] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const ringTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const stopTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const sinceRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const p = localStorage.getItem(PREF_KEY);
      setPref(p === "on" || p === "off" ? p : null);
      setSnoozed(Number(localStorage.getItem(SNOOZE_KEY) ?? 0) > Date.now());
    } catch {
      setPref(null);
    }
  }, []);

  const audio = useCallback(() => {
    if (!ctxRef.current) {
      const Ctx = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctx) return null;
      ctxRef.current = new Ctx();
    }
    if (ctxRef.current.state === "suspended") ctxRef.current.resume().catch(() => {});
    return ctxRef.current;
  }, []);

  // Browsers only allow sound after the person has touched the page once.
  useEffect(() => {
    if (pref !== "on") return;
    const unlock = () => audio();
    window.addEventListener("pointerdown", unlock, { once: true });
    window.addEventListener("keydown", unlock, { once: true });
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [pref, audio]);

  // The ringtone the admin chose for owners / staff (the original double bell until it has been loaded).
  const toneRef = useRef("classic");
  const loadTone = useCallback(async () => {
    try {
      const res = await fetch("/api/business/ringtone");
      if (res.ok) {
        const d: { id?: string } = await res.json();
        if (d.id) toneRef.current = d.id;
      }
    } catch {
      // keep the default
    }
  }, []);
  useEffect(() => {
    if (pref === "on") void loadTone();
  }, [pref, loadTone]);

  /** One ring of the chosen ringtone, loud, plus the phone vibrating to its pattern. */
  const chime = useCallback(() => {
    const ctx = audio();
    if (!ctx) return;
    setBlocked(ctx.state !== "running");
    playRingtoneOnce(ctx, toneRef.current);
    navigator.vibrate?.(ringtoneById(toneRef.current).vibrate);
  }, [audio]);

  const stopRinging = useCallback(() => {
    if (ringTimer.current) clearInterval(ringTimer.current);
    if (stopTimer.current) clearTimeout(stopTimer.current);
    if (titleTimer.current) clearInterval(titleTimer.current);
    ringTimer.current = stopTimer.current = titleTimer.current = null;
    navigator.vibrate?.(0);
    document.title = document.title.replace(/^🔔 [^|]*\| /, "");
  }, []);

  const startRinging = useCallback(() => {
    stopRinging();
    chime();
    ringTimer.current = setInterval(chime, Math.round(ringtoneById(toneRef.current).length * 1000) + 500);
    stopTimer.current = setTimeout(stopRinging, RING_MS);
    const base = document.title;
    let flip = false;
    titleTimer.current = setInterval(() => {
      flip = !flip;
      document.title = flip ? `🔔 ${t.alarmTitle} | ${base}` : base;
    }, 1000);
  }, [chime, stopRinging, t.alarmTitle]);

  useEffect(() => stopRinging, [stopRinging]);

  // Poll for new bookings for today while the alarm is on.
  useEffect(() => {
    if (pref !== "on" || inactive) return;
    let cancelled = false;
    async function check() {
      const q = sinceRef.current ? `?since=${encodeURIComponent(sinceRef.current)}` : "";
      const res = await fetch(`/api/business/bookings/alerts${q}`).catch(() => null);
      if (!res?.ok || cancelled) return;
      const data: { now: string; bookings: Alert[] } = await res.json();
      sinceRef.current = data.now;
      const seen = readSeen();
      const fresh = data.bookings.filter((b) => !seen.includes(b.id));
      if (!fresh.length) return;
      try {
        localStorage.setItem(SEEN_KEY, JSON.stringify([...seen, ...fresh.map((b) => b.id)].slice(-200)));
      } catch {}
      setAlerts((prev) => [...prev, ...fresh]);
      startRinging();
    }
    check();
    const id = setInterval(check, POLL_MS);
    const onVisible = () => document.visibilityState === "visible" && check();
    document.addEventListener("visibilitychange", onVisible);
    // A push for a new booking arrived (public/sw.js) — check right away
    // instead of waiting for the next poll.
    const onPush = (e: MessageEvent) => e.data?.type === "varaaai-booking-alarm" && check();
    navigator.serviceWorker?.addEventListener("message", onPush);
    return () => {
      cancelled = true;
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      navigator.serviceWorker?.removeEventListener("message", onPush);
    };
  }, [pref, inactive, startRinging]);

  function setPreference(p: "on" | "off") {
    setPref(p);
    try {
      localStorage.setItem(PREF_KEY, p);
    } catch {}
  }

  async function enable() {
    audio();
    setPreference("on");
    await loadTone();
    chime();
    await subscribePush();
  }

  function later() {
    setSnoozed(true);
    try {
      localStorage.setItem(SNOOZE_KEY, String(Date.now() + 24 * 60 * 60 * 1000));
    } catch {}
  }

  function dismissAlarm() {
    stopRinging();
    setAlerts([]);
  }

  if (pref === "loading" || inactive || (global && pref !== "on")) return null;

  return (
    <>
      {alerts.length > 0 && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-ink-900/60 p-4 backdrop-blur-sm" role="alertdialog">
          <div className="w-full max-w-sm animate-slide-up overflow-hidden rounded-3xl bg-white shadow-2xl">
            <div className="relative bg-gradient-to-br from-coral-400 via-coral-500 to-berry-500 px-6 pb-6 pt-7 text-center text-white">
              <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <span className="absolute inset-0 animate-ping rounded-full bg-white/30" />
                <BellRing className="h-8 w-8 animate-bounce" />
              </span>
              <p className="mt-4 text-2xl font-extrabold">{t.alarmTitle}</p>
            </div>
            <ul className="max-h-[40vh] divide-y divide-ink-100 overflow-y-auto">
              {alerts.map((a) => (
                <li key={a.id} className="flex items-center gap-3 px-5 py-3.5">
                  <span className="flex h-12 w-14 shrink-0 flex-col items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <CalendarDays className="h-3.5 w-3.5" />
                    <span className="text-sm font-extrabold">{a.time}</span>
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-bold text-ink-900">{a.customer}</p>
                    <p className="truncate text-sm text-ink-700">
                      {a.service}
                      {a.staff ? ` · ${t.with} ${a.staff}` : ""}
                    </p>
                    <p className="truncate text-xs text-ink-400">{a.branch}</p>
                  </div>
                </li>
              ))}
            </ul>
            {blocked && <p className="px-5 pb-1 text-xs text-berry-500">{t.blocked}</p>}
            <div className="grid grid-cols-2 gap-2 p-4">
              <button type="button" onClick={dismissAlarm} className="rounded-full bg-mist-100 py-3 text-sm font-bold text-ink-900">
                {t.stop}
              </button>
              <Link
                href="/business/dashboard/bookings"
                onClick={dismissAlarm}
                className="rounded-full bg-primary-500 py-3 text-center text-sm font-bold text-white"
              >
                {t.view}
              </Link>
            </div>
          </div>
        </div>
      )}

      {!global && pref === null && !snoozed && (
        <div className="fixed bottom-24 left-4 right-4 z-[65] animate-slide-up rounded-3xl bg-white p-4 shadow-[0_20px_50px_-12px_rgba(31,24,45,0.45)] ring-1 ring-ink-100 sm:bottom-6 sm:left-6 sm:right-auto sm:w-96">
          <div className="flex gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-coral-400 to-berry-500 text-white">
              <BellRing className="h-5 w-5" />
            </span>
            <div className="min-w-0">
              <p className="font-bold text-ink-900">{t.promptTitle}</p>
              <p className="mt-0.5 text-sm text-ink-700">{t.promptBody}</p>
            </div>
          </div>
          <div className="mt-3 flex gap-2">
            <button type="button" onClick={later} className="flex-1 rounded-full bg-mist-100 py-2.5 text-sm font-bold text-ink-700">
              {t.later}
            </button>
            <button type="button" onClick={enable} className="flex-1 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 py-2.5 text-sm font-bold text-white">
              {t.enable}
            </button>
          </div>
        </div>
      )}

      {!global && pref !== null && (
        <div className="fixed bottom-5 left-5 z-[65]">
          {menu && (
            <div className="mb-2 w-64 animate-slide-up rounded-2xl bg-white p-2 shadow-popover ring-1 ring-ink-100">
              <p className="px-3 pb-1 pt-2 text-xs font-bold text-ink-900">{pref === "on" ? t.on : t.promptTitle}</p>
              {pref === "on" && <p className="px-3 pb-2 text-[11px] leading-snug text-ink-400">{t.keepOpen}</p>}
              {pref === "on" ? (
                <>
                  <button type="button" onClick={() => chime()} className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-ink-700 hover:bg-mist-50">
                    🔔 {t.test}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreference("off");
                      setMenu(false);
                    }}
                    className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-berry-500 hover:bg-berry-50"
                  >
                    {t.off}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    enable();
                    setMenu(false);
                  }}
                  className="block w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-primary-600 hover:bg-primary-50"
                >
                  {t.enable}
                </button>
              )}
            </div>
          )}
          <button
            type="button"
            onClick={() => setMenu((m) => !m)}
            aria-label={pref === "on" ? t.on : t.promptTitle}
            className={`flex h-11 w-11 items-center justify-center rounded-full shadow-popover ring-1 transition-colors ${
              pref === "on" ? "bg-white text-coral-500 ring-coral-200" : "bg-white text-ink-400 ring-ink-100"
            }`}
          >
            {menu ? <X className="h-5 w-5" /> : pref === "on" ? <BellRing className="h-5 w-5" /> : <BellOff className="h-5 w-5" />}
          </button>
        </div>
      )}
    </>
  );
}
