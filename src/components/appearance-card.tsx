"use client";

import { useRef, useState } from "react";
import { AlertTriangle, Check, Globe, Loader2, Palette, RotateCcw, Sparkles, UserPen } from "lucide-react";
import { SEASONAL_THEMES, resolveTheme, themeText, type SeasonalTheme } from "@/lib/seasonal-themes";
import { SeasonalBanner } from "@/components/seasonal-banner";

interface Look {
  calendarBookingBg: string | null;
  calendarBookingText: string | null;
  calendarOnlineBg: string | null;
  calendarOnlineText: string | null;
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
    colorsSub: "Chọn màu riêng cho lịch khách tự đặt online và lịch salon tự thêm — nhìn vào là phân biệt được. Lịch đã xong, không đến vẫn giữ màu trạng thái.",
    onlineTitle: "Khách tự đặt online",
    onlineSub: "Lịch khách đặt qua trang đặt lịch hoặc website",
    manualTitle: "Salon tự thêm",
    manualSub: "Lịch chủ salon hoặc nhân viên tự thêm vào",
    sameWarn: "Hai loại lịch đang cùng màu — chọn màu khác nhau để dễ phân biệt.",
    bg: "Màu nền",
    text: "Màu chữ",
    reset: "Màu mặc định",
    themeColors: "Đang dùng màu của giao diện ngày lễ",
    preview: "Xem trước",
    sampleName: "Sara Pentti",
    sampleService: "Nối mi volume",
    sampleName2: "Anna Virtanen",
    sampleService2: "Sơn gel",
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
    colorsSub: "Give customers' online bookings and the ones the salon added their own colours, so you tell them apart at a glance. Completed and no-show bookings keep their status colours.",
    onlineTitle: "Booked online by customers",
    onlineSub: "Bookings made on the booking page or website",
    manualTitle: "Added by the salon",
    manualSub: "Bookings the owner or staff added",
    sameWarn: "Both kinds use the same colours — pick different ones to tell them apart.",
    bg: "Background",
    text: "Text",
    reset: "Default colours",
    themeColors: "Using the holiday theme's colours",
    preview: "Preview",
    sampleName: "Sara Pentti",
    sampleService: "Volume lashes",
    sampleName2: "Anna Virtanen",
    sampleService2: "Gel polish",
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
    colorsSub: "Anna asiakkaiden verkkovarauksille ja salongin lisäämille varauksille omat värit, niin erotat ne yhdellä silmäyksellä. Valmiit ja saapumatta jääneet säilyttävät tilavärinsä.",
    onlineTitle: "Asiakkaan verkkovaraus",
    onlineSub: "Varaukset varaussivulta tai verkkosivuilta",
    manualTitle: "Salongin lisäämä",
    manualSub: "Omistajan tai henkilökunnan lisäämät varaukset",
    sameWarn: "Molemmissa on samat värit — valitse eri värit, niin ne erottuu.",
    bg: "Tausta",
    text: "Teksti",
    reset: "Oletusvärit",
    themeColors: "Juhlateeman värit käytössä",
    preview: "Esikatselu",
    sampleName: "Sara Pentti",
    sampleService: "Volyymiripset",
    sampleName2: "Anna Virtanen",
    sampleService2: "Geelilakkaus",
    saved: "Tallennettu",
    error: "Tallennus epäonnistui, yritä uudelleen.",
  },
};

/** Default colours of customers' online bookings (the calendar's emerald). */
const ONLINE_DEFAULT = { bg: "#ecfdf5", text: "#047857" };

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
  // Customers' online bookings: the owner's colours, else emerald.
  const onlineCustom = !!(look.calendarOnlineBg && look.calendarOnlineText);
  const onlineColors = onlineCustom ? { bg: look.calendarOnlineBg!, text: look.calendarOnlineText! } : ONLINE_DEFAULT;
  const sameColors = onlineColors.bg.toLowerCase() === blockColors.bg.toLowerCase();

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

        <div className="mt-4 grid items-start gap-5 lg:grid-cols-[minmax(0,1fr)_220px]">
          <div className="space-y-3">
            {(
              [
                { kind: "online", Icon: Globe, title: t.onlineTitle, sub: t.onlineSub, bgKey: "calendarOnlineBg", textKey: "calendarOnlineText", value: onlineColors, isCustom: onlineCustom },
                { kind: "manual", Icon: UserPen, title: t.manualTitle, sub: t.manualSub, bgKey: "calendarBookingBg", textKey: "calendarBookingText", value: blockColors, isCustom: custom },
              ] as const
            ).map(({ kind, Icon, title, sub, bgKey, textKey, value, isCustom }) => (
              <section key={kind} className="rounded-2xl bg-mist-50/60 p-3.5 ring-1 ring-ink-100">
                <div className="flex items-start gap-2.5">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border-l-[3px] ring-1 ring-black/5"
                    style={{ background: value.bg, color: value.text, borderColor: value.text }}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-ink-900">{title}</p>
                    <p className="text-xs text-ink-400">{sub}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PRESETS.map(([bg, text]) => {
                    const on = isCustom && look[bgKey] === bg && look[textKey] === text;
                    return (
                      <button
                        key={bg + text}
                        type="button"
                        disabled={busy}
                        onClick={() => save({ [bgKey]: bg, [textKey]: text })}
                        className={`flex h-10 w-14 items-center justify-center rounded-xl border-l-4 text-xs font-bold ring-2 transition ${on ? "ring-[#c99a3f]" : "ring-ink-100 hover:ring-ink-200"}`}
                        style={{ background: bg, color: text, borderColor: text }}
                        aria-label={`${title}: ${bg} / ${text}`}
                      >
                        Aa
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-4">
                  {(
                    [
                      [bgKey, t.bg, value.bg],
                      [textKey, t.text, value.text],
                    ] as const
                  ).map(([key, label, v]) => (
                    <label key={key} className="flex items-center gap-2 text-sm font-semibold text-ink-700">
                      <input
                        type="color"
                        value={v}
                        disabled={busy}
                        onChange={(e) =>
                          saveSoon({
                            [bgKey]: key === bgKey ? e.target.value : value.bg,
                            [textKey]: key === textKey ? e.target.value : value.text,
                          })
                        }
                        className="h-10 w-12 cursor-pointer rounded-lg border border-ink-100 bg-white p-1"
                      />
                      {label}
                    </label>
                  ))}
                  {isCustom && (
                    <button
                      type="button"
                      disabled={busy}
                      onClick={() => save({ [bgKey]: null, [textKey]: null })}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-500 hover:text-ink-900"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      {t.reset}
                    </button>
                  )}
                </div>
                {kind === "manual" && !custom && active && look.themeOnCalendar && <p className="mt-2 text-xs text-[#8a6a2c]">{t.themeColors}</p>}
              </section>
            ))}
          </div>

          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-ink-400">{t.preview}</p>
            <div className="space-y-2 rounded-2xl bg-white p-2.5 ring-1 ring-ink-100">
              {(
                [
                  { c: onlineColors, Icon: Globe, label: t.onlineTitle, name: t.sampleName, service: t.sampleService, time: "11:30–13:00" },
                  { c: blockColors, Icon: UserPen, label: t.manualTitle, name: t.sampleName2, service: t.sampleService2, time: "14:00–15:00" },
                ] as const
              ).map(({ c, Icon, label, name, service, time }) => (
                <div key={label} className="rounded-xl border-l-[3px] px-2.5 py-2 text-[11px] shadow-sm ring-1 ring-black/5" style={{ background: c.bg, color: c.text, borderColor: c.text }}>
                  <p className="font-medium opacity-70">{time}</p>
                  <p className="flex items-center gap-1 text-xs font-bold">
                    <Icon className="h-3 w-3 shrink-0" />
                    {name}
                  </p>
                  <p className="opacity-80">{service}</p>
                  <p className="mt-1 text-[10px] font-semibold uppercase tracking-wider opacity-60">{label}</p>
                </div>
              ))}
            </div>
            {sameColors && (
              <p className="mt-2 flex items-start gap-1.5 text-xs font-semibold text-[#9a4a0b]">
                <AlertTriangle className="mt-px h-3.5 w-3.5 shrink-0" />
                {t.sameWarn}
              </p>
            )}
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
