"use client";

import { useRef, useState } from "react";
import { Check, Loader2, Palette, RotateCcw, Sparkles } from "lucide-react";
import { SEASONAL_THEMES, resolveTheme, themeText, type SeasonalTheme } from "@/lib/seasonal-themes";
import { SeasonalBanner } from "@/components/seasonal-banner";

interface Look {
  calendarBookingBg: string | null;
  calendarBookingText: string | null;
  seasonalTheme: string | null;
  themeOnBookingPage: boolean;
  themeOnCalendar: boolean;
}

const T = {
  vi: {
    themeTitle: "Giao diện ngày lễ",
    themeSub: "Trang trí trang đặt lịch và trang Lịch hẹn theo mùa lễ — khách và nhân viên đều thấy.",
    none: "Không dùng",
    auto: "Tự động theo ngày lễ",
    autoNow: "Hôm nay: {name}",
    autoNone: "Hôm nay không có ngày lễ — trang hiển thị bình thường",
    where: "Áp dụng cho",
    onBooking: "Trang đặt lịch của khách",
    onCalendar: "Trang Lịch hẹn (chủ salon & nhân viên)",
    colorsTitle: "Màu ô lịch hẹn",
    colorsSub: "Màu nền và màu chữ của lịch hẹn trên trang Lịch hẹn. Lịch đã xong, không đến vẫn giữ màu trạng thái để dễ phân biệt.",
    bg: "Màu nền",
    text: "Màu chữ",
    reset: "Màu mặc định",
    themeColors: "Đang dùng màu của giao diện ngày lễ",
    preview: "Xem trước",
    sampleName: "Sara Pentti",
    sampleService: "Nối mi volume",
    saved: "Đã lưu",
    error: "Không lưu được, vui lòng thử lại.",
  },
  en: {
    themeTitle: "Holiday theme",
    themeSub: "Decorate the booking page and the Bookings calendar for the season — customers and staff see it.",
    none: "None",
    auto: "Automatic by holiday",
    autoNow: "Today: {name}",
    autoNone: "No holiday today — the pages look as usual",
    where: "Show on",
    onBooking: "Customers' booking page",
    onCalendar: "Bookings calendar (owner & staff)",
    colorsTitle: "Booking colours",
    colorsSub: "Background and text colour of bookings on the Bookings calendar. Completed and no-show bookings keep their status colours.",
    bg: "Background",
    text: "Text",
    reset: "Default colours",
    themeColors: "Using the holiday theme's colours",
    preview: "Preview",
    sampleName: "Sara Pentti",
    sampleService: "Volume lashes",
    saved: "Saved",
    error: "Couldn't save, please try again.",
  },
  fi: {
    themeTitle: "Juhlateema",
    themeSub: "Koristele varaussivu ja varauskalenteri juhlakauden mukaan — asiakkaat ja henkilökunta näkevät sen.",
    none: "Ei teemaa",
    auto: "Automaattisesti juhlan mukaan",
    autoNow: "Tänään: {name}",
    autoNone: "Tänään ei ole juhlaa — sivut näyttävät tavalliselta",
    where: "Näytä",
    onBooking: "Asiakkaiden varaussivulla",
    onCalendar: "Varauskalenterissa (omistaja ja henkilökunta)",
    colorsTitle: "Varausten värit",
    colorsSub: "Varausten tausta- ja tekstiväri kalenterissa. Valmiit ja saapumatta jääneet säilyttävät tilavärinsä.",
    bg: "Tausta",
    text: "Teksti",
    reset: "Oletusvärit",
    themeColors: "Juhlateeman värit käytössä",
    preview: "Esikatselu",
    sampleName: "Sara Pentti",
    sampleService: "Volyymiripset",
    saved: "Tallennettu",
    error: "Tallennus epäonnistui, yritä uudelleen.",
  },
};

/** Ready-made colour pairs (background, text). */
const PRESETS: [string, string][] = [
  ["#f1ecf8", "#40325c"],
  ["#fdf0f0", "#9b1c2c"],
  ["#fff4e3", "#9a4a0b"],
  ["#eef9f1", "#1f6b3a"],
  ["#eaf4fd", "#0b4f8a"],
  ["#fff0f7", "#a3245f"],
  ["#1f182d", "#f0cf8a"],
  ["#40325c", "#ffffff"],
];

/** Settings › Look: the holiday theme and the calendar's booking colours. */
export function AppearanceCard({ locale, timeZone, initial }: { locale: string; timeZone: string; initial: Look }) {
  const t = (T as Record<string, (typeof T)["vi"]>)[locale] ?? T.en;
  const [look, setLook] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function save(patch: Partial<Look>) {
    const before = look;
    setLook({ ...look, ...patch });
    setBusy(true);
    setMsg(null);
    const res = await fetch("/api/business/appearance", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(patch) }).catch(() => null);
    setBusy(false);
    if (!res?.ok) {
      setLook(before);
      setMsg({ ok: false, text: t.error });
      return;
    }
    setMsg({ ok: true, text: t.saved });
  }

  // The colour wheel fires on every move: show it at once, save when it settles.
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  function saveSoon(patch: Partial<Look>) {
    setLook((l) => ({ ...l, ...patch }));
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => save(patch), 600);
  }

  const active = resolveTheme(look.seasonalTheme, timeZone);
  const custom = !!(look.calendarBookingBg && look.calendarBookingText);
  const blockColors = custom
    ? { bg: look.calendarBookingBg!, text: look.calendarBookingText! }
    : active && look.themeOnCalendar
      ? active.booking
      : { bg: "#f1ecf8", text: "#40325c" };

  const card = (selected: boolean) =>
    `relative flex flex-col overflow-hidden rounded-2xl text-left ring-2 transition ${selected ? "ring-[#c99a3f] shadow-[0_12px_28px_-16px_rgba(185,133,45,0.9)]" : "ring-transparent hover:ring-ink-100"}`;
  const Tick = () => (
    <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c99a3f] text-white">
      <Check className="h-3 w-3" />
    </span>
  );
  const ThemeTile = ({ th }: { th: SeasonalTheme }) => (
    <button type="button" disabled={busy} onClick={() => save({ seasonalTheme: th.id })} className={card(look.seasonalTheme === th.id)}>
      <span className="flex h-16 items-center justify-center gap-1 text-2xl" style={{ backgroundImage: `linear-gradient(120deg, ${th.from}, ${th.to})` }}>
        {th.emojis.slice(0, 3).map((e) => (
          <span key={e}>{e}</span>
        ))}
      </span>
      <span className="bg-white px-2.5 py-2 text-xs font-bold text-ink-900">{themeText(th.name, locale)}</span>
      {look.seasonalTheme === th.id && <Tick />}
    </button>
  );

  return (
    <div className="space-y-4">
      <div className="card">
        <p className="flex items-center gap-2 font-bold text-ink-900">
          <Sparkles className="h-4 w-4 text-[#c99a3f]" />
          {t.themeTitle}
        </p>
        <p className="mt-1 text-sm text-ink-400">{t.themeSub}</p>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          <button type="button" disabled={busy} onClick={() => save({ seasonalTheme: null })} className={card(!look.seasonalTheme)}>
            <span className="flex h-16 items-center justify-center bg-mist-50 text-xs font-semibold text-ink-400">—</span>
            <span className="bg-white px-2.5 py-2 text-xs font-bold text-ink-900">{t.none}</span>
            {!look.seasonalTheme && <Tick />}
          </button>
          <button type="button" disabled={busy} onClick={() => save({ seasonalTheme: "auto" })} className={card(look.seasonalTheme === "auto")}>
            <span className="flex h-16 items-center justify-center gap-1 bg-gradient-to-br from-[#1f182d] via-[#624f89] to-[#c99a3f] text-2xl">🎄🧧🎃</span>
            <span className="bg-white px-2.5 py-2 text-xs font-bold text-ink-900">{t.auto}</span>
            {look.seasonalTheme === "auto" && <Tick />}
          </button>
          {SEASONAL_THEMES.map((th) => (
            <ThemeTile key={th.id} th={th} />
          ))}
        </div>

        {look.seasonalTheme === "auto" && (
          <p className="mt-3 text-xs font-semibold text-[#8a6a2c]">{active ? t.autoNow.replace("{name}", themeText(active.name, locale)) : t.autoNone}</p>
        )}

        {look.seasonalTheme && (
          <>
            <p className="mt-5 text-xs font-bold uppercase tracking-wider text-ink-400">{t.where}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {(
                [
                  ["themeOnBookingPage", t.onBooking],
                  ["themeOnCalendar", t.onCalendar],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-center gap-2 rounded-full bg-mist-50 px-3 py-2 text-sm text-ink-700 ring-1 ring-ink-100">
                  <input type="checkbox" checked={look[key]} disabled={busy} onChange={(e) => save({ [key]: e.target.checked })} className="h-4 w-4 accent-[#c99a3f]" />
                  {label}
                </label>
              ))}
            </div>
            {active && (
              <div className="mt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">{t.preview}</p>
                <SeasonalBanner theme={active} locale={locale} />
              </div>
            )}
          </>
        )}
      </div>

      <div className="card">
        <p className="flex items-center gap-2 font-bold text-ink-900">
          <Palette className="h-4 w-4 text-[#c99a3f]" />
          {t.colorsTitle}
        </p>
        <p className="mt-1 text-sm text-ink-400">{t.colorsSub}</p>

        <div className="mt-4 grid items-start gap-5 sm:grid-cols-[minmax(0,1fr)_200px]">
          <div>
            <div className="flex flex-wrap gap-2">
              {PRESETS.map(([bg, text]) => {
                const on = custom && look.calendarBookingBg === bg && look.calendarBookingText === text;
                return (
                  <button
                    key={bg + text}
                    type="button"
                    disabled={busy}
                    onClick={() => save({ calendarBookingBg: bg, calendarBookingText: text })}
                    className={`flex h-10 w-14 items-center justify-center rounded-xl border-l-4 text-xs font-bold ring-2 transition ${on ? "ring-[#c99a3f]" : "ring-ink-100 hover:ring-ink-200"}`}
                    style={{ background: bg, color: text, borderColor: text }}
                    aria-label={`${bg} / ${text}`}
                  >
                    Aa
                  </button>
                );
              })}
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              {(
                [
                  ["calendarBookingBg", t.bg, blockColors.bg],
                  ["calendarBookingText", t.text, blockColors.text],
                ] as const
              ).map(([key, label, value]) => (
                <label key={key} className="flex items-center gap-2 text-sm font-semibold text-ink-700">
                  <input
                    type="color"
                    value={value}
                    disabled={busy}
                    onChange={(e) =>
                      saveSoon({
                        calendarBookingBg: key === "calendarBookingBg" ? e.target.value : blockColors.bg,
                        calendarBookingText: key === "calendarBookingText" ? e.target.value : blockColors.text,
                      })
                    }
                    className="h-10 w-12 cursor-pointer rounded-lg border border-ink-100 bg-white p-1"
                  />
                  {label}
                </label>
              ))}
              {custom && (
                <button type="button" disabled={busy} onClick={() => save({ calendarBookingBg: null, calendarBookingText: null })} className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-ink-900">
                  <RotateCcw className="h-3.5 w-3.5" />
                  {t.reset}
                </button>
              )}
            </div>
            {!custom && active && look.themeOnCalendar && <p className="mt-2 text-xs text-[#8a6a2c]">{t.themeColors}</p>}
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">{t.preview}</p>
            <div className="rounded-xl border-l-[3px] px-2.5 py-2 text-[11px] shadow-sm ring-1 ring-black/5" style={{ background: blockColors.bg, color: blockColors.text, borderColor: blockColors.text }}>
              <p className="font-medium opacity-70">11:30–13:00</p>
              <p className="text-xs font-bold">{t.sampleName}</p>
              <p className="opacity-80">{t.sampleService}</p>
            </div>
          </div>
        </div>
      </div>

      {(busy || msg) && (
        <p className={`flex items-center gap-2 text-xs font-semibold ${msg && !msg.ok ? "text-berry-600" : "text-emerald-700"}`}>
          {busy ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
          {busy ? "…" : msg?.text}
        </p>
      )}
    </div>
  );
}
