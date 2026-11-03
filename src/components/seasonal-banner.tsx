import { themeText, type SeasonalTheme } from "@/lib/seasonal-themes";

/** Where each ornament floats in the banner (left %, top %, size rem, delay s). */
const SPOTS: [number, number, number, number][] = [
  [4, 18, 1.4, 0],
  [16, 62, 1.0, 1.2],
  [58, 14, 1.1, 0.6],
  [70, 58, 1.5, 1.8],
  [84, 20, 1.2, 0.3],
  [93, 66, 1.0, 2.2],
  [40, 70, 0.9, 1.5],
];

/** A holiday banner (src/lib/seasonal-themes.ts): the theme's gradient, its
 * ornaments floating gently, and the greeting. "strip" sits above the
 * bookings calendar; "hero" opens the public booking page. */
export function SeasonalBanner({ theme, locale, variant = "strip", salonName }: { theme: SeasonalTheme; locale: string; variant?: "strip" | "hero"; salonName?: string }) {
  const hero = variant === "hero";
  return (
    <div
      className={`relative isolate overflow-hidden text-white shadow-[0_18px_40px_-28px_rgba(0,0,0,0.6)] ${hero ? "rounded-[2rem] px-6 py-7 sm:px-10 sm:py-9" : "rounded-2xl px-4 py-3 sm:px-5"}`}
      style={{ backgroundImage: `linear-gradient(120deg, ${theme.from}, ${theme.to})` }}
      aria-label={themeText(theme.greeting, locale)}
    >
      <style>{`@keyframes varaaai-float{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-6px) rotate(4deg)}}`}</style>
      <div className="pointer-events-none absolute -right-10 -top-16 -z-10 h-40 w-40 rounded-full opacity-30 blur-3xl" style={{ background: theme.accent }} />
      {/* On the strip the greeting is on the left: ornaments keep to the right. */}
      {SPOTS.filter(([left]) => hero || left >= 55).map(([left, top, size, delay], i) => (
        <span
          key={i}
          aria-hidden
          className="pointer-events-none absolute -z-10 select-none opacity-60"
          style={{ left: `${left}%`, top: `${top}%`, fontSize: `${hero ? size * 1.5 : size}rem`, animation: `varaaai-float ${4 + (i % 3)}s ease-in-out ${delay}s infinite` }}
        >
          {theme.emojis[i % theme.emojis.length]}
        </span>
      ))}
      <div className={`relative flex items-center gap-3 ${hero ? "flex-col text-center" : ""}`}>
        <span className={`${hero ? "text-5xl" : "text-2xl"} drop-shadow`} aria-hidden>
          {theme.emojis[0]}
        </span>
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: theme.accent }}>
            {themeText(theme.name, locale)}
          </p>
          <p className={`font-serif leading-tight ${hero ? "mt-1 text-3xl sm:text-4xl" : "truncate text-lg"}`}>{themeText(theme.greeting, locale)}</p>
          {hero && salonName && <p className="mt-2 text-sm text-white/80">{salonName}</p>}
        </div>
      </div>
    </div>
  );
}

/** The booking page's cover in holiday dress: a tint of the theme's colours,
 * floating ornaments and the greeting on top. Sits inside the (relative)
 * cover box, over the photo. */
export function SeasonalCoverOverlay({ theme, locale }: { theme: SeasonalTheme; locale: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <style>{`@keyframes varaaai-float{0%,100%{transform:translateY(0) rotate(-4deg)}50%{transform:translateY(-8px) rotate(4deg)}}`}</style>
      <div className="absolute inset-0 opacity-45 mix-blend-multiply" style={{ backgroundImage: `linear-gradient(120deg, ${theme.from}, ${theme.to})` }} />
      {SPOTS.map(([left, top, size, delay], i) => (
        <span
          key={i}
          className="absolute select-none opacity-80 drop-shadow"
          style={{ left: `${left}%`, top: `${Math.min(top, 55)}%`, fontSize: `${size * 1.8}rem`, animation: `varaaai-float ${4 + (i % 3)}s ease-in-out ${delay}s infinite` }}
        >
          {theme.emojis[i % theme.emojis.length]}
        </span>
      ))}
      <div className="absolute inset-x-0 top-4 flex justify-center px-4">
        <span
          className="max-w-full truncate rounded-full px-4 py-1.5 font-serif text-sm text-white shadow-lg backdrop-blur sm:text-base"
          style={{ backgroundImage: `linear-gradient(120deg, ${theme.from}cc, ${theme.to}cc)`, boxShadow: `0 0 0 1px ${theme.accent}66` }}
        >
          {theme.emojis[0]} {themeText(theme.greeting, locale)}
        </span>
      </div>
    </div>
  );
}
