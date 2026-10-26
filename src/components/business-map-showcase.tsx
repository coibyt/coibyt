import { ArrowRight, BellRing, Check, LocateFixed, Map as MapIcon, MapPin, Megaphone, Star, Users } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { businessMapStrings } from "@/lib/business-landing/map-strings";

const POINT_ICONS = [MapPin, LocateFixed, Users, Megaphone];

/** Other salons' price pins on the illustrated map (percent positions). */
const OTHER_PINS = [
  { left: "14%", top: "20%", label: "28 €" },
  { left: "66%", top: "28%", label: "45 €" },
  { left: "72%", top: "56%", label: "39 €" },
  { left: "18%", top: "66%", label: "55 €" },
  { left: "44%", top: "78%", label: "32 €" },
];

/** A stylised city map: water, parks and streets, drawn in SVG so it scales
 * crisply and needs no map tiles. */
function MapArt() {
  return (
    <svg viewBox="0 0 400 340" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
      <rect width="400" height="340" fill="#eef1ea" />
      {/* Sea and a bay */}
      <path d="M0 250 C60 230 90 270 150 262 C210 254 230 300 300 292 C340 288 370 300 400 296 L400 340 L0 340 Z" fill="#cfe2ee" />
      <path d="M300 0 C320 40 360 50 400 46 L400 0 Z" fill="#cfe2ee" />
      <path d="M330 120 C350 110 380 116 400 112 L400 170 C380 168 352 176 334 160 C322 150 320 128 330 120 Z" fill="#cfe2ee" />
      {/* Parks */}
      <path d="M40 40 C80 26 120 44 112 80 C104 112 56 110 40 92 C28 78 26 50 40 40 Z" fill="#d6e8cf" />
      <path d="M220 180 C250 170 280 186 274 210 C268 232 230 236 216 220 C206 208 206 186 220 180 Z" fill="#d6e8cf" />
      <circle cx="350" cy="230" r="22" fill="#d6e8cf" />
      {/* Streets */}
      <g stroke="#ffffff" strokeLinecap="round" fill="none">
        <path d="M0 140 C90 130 170 150 260 120 C310 104 360 96 400 92" strokeWidth="9" />
        <path d="M150 0 C160 80 170 160 190 340" strokeWidth="9" />
        <path d="M0 200 C80 196 140 210 230 200" strokeWidth="6" />
        <path d="M260 0 C250 70 270 140 250 240" strokeWidth="6" />
        <path d="M60 0 C70 70 50 140 70 250" strokeWidth="5" />
        <path d="M100 60 L330 60" strokeWidth="4" />
        <path d="M200 260 L330 230" strokeWidth="4" />
      </g>
      <path d="M0 140 C90 130 170 150 260 120 C310 104 360 96 400 92" stroke="#f6d38c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M150 0 C160 80 170 160 190 340" stroke="#f6d38c" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Customer → your salon */}
      <path d="M110 238 C140 220 170 200 196 176" stroke="#624f89" strokeWidth="2.5" strokeDasharray="5 6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/** The salon-owner page's search-map pitch: why being on VaraaAi's map
 * brings customers, next to an illustrated map with the owner's own pin. */
export function BusinessMapShowcase({ locale }: { locale: string }) {
  const M = businessMapStrings(locale);

  return (
    <section id="search-map" className="relative isolate scroll-mt-20 overflow-hidden bg-gradient-to-b from-white via-primary-50/40 to-white py-16 sm:py-24">
      <div className="pointer-events-none absolute -right-40 top-10 -z-10 h-[28rem] w-[28rem] rounded-full bg-coral-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 bottom-0 -z-10 h-[28rem] w-[28rem] rounded-full bg-primary-200/40 blur-3xl" />

      <div className="container grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-primary-100 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-primary-700">
            <MapIcon className="h-3.5 w-3.5" />
            {M.eyebrow}
          </span>
          <h2 className="mt-5 font-serif text-3xl font-bold leading-[1.12] tracking-tight text-ink-900 sm:text-[2.6rem]">
            {M.title}{" "}
            <span className="bg-gradient-to-r from-primary-600 via-coral-500 to-coral-400 bg-clip-text text-transparent">{M.titleAccent}</span>
          </h2>
          <p className="mt-5 text-base leading-relaxed text-ink-700 sm:text-lg">{M.body}</p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {M.points.map((p, i) => {
              const Icon = POINT_ICONS[i];
              return (
                <li key={p.title} className={`rounded-2xl bg-white p-5 shadow-card ring-1 ${i === 2 ? "ring-coral-200" : "ring-ink-100"}`}>
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${i === 2 ? "bg-coral-50 text-coral-500" : "bg-primary-50 text-primary-600"}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="mt-3 font-bold text-ink-900">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-700">{p.body}</p>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/business/apply"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-coral-400 to-coral-500 px-7 py-4 text-base font-bold text-white shadow-[0_12px_32px_-8px_rgba(236,106,71,0.8)] transition-transform hover:scale-[1.02]"
            >
              <MapPin className="h-5 w-5" />
              {M.cta}
            </Link>
            <Link
              href="/search?view=map"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 font-semibold text-ink-900 ring-1 ring-ink-100 transition hover:ring-primary-300"
            >
              {M.seeMap}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Illustrated map */}
        <div className="relative mx-auto w-full max-w-xl" aria-hidden>
          <div className="relative aspect-[400/340] overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(31,24,45,0.45)] ring-1 ring-ink-100">
            <MapArt />

            {OTHER_PINS.map((p) => (
              <span
                key={p.label}
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-ink-900 px-3 py-1.5 text-xs font-bold text-white shadow-lg ring-2 ring-white"
                style={{ left: p.left, top: p.top }}
              >
                {p.label}
              </span>
            ))}

            {/* The customer */}
            <span className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: "27.5%", top: "70%" }}>
              <span className="absolute inset-0 -m-3 rounded-full bg-sky-400/25" />
              <span className="relative block h-4 w-4 rounded-full bg-sky-500 ring-[3px] ring-white" />
            </span>

            {/* Your salon */}
            <span className="absolute -translate-x-1/2 -translate-y-full" style={{ left: "49%", top: "52%" }}>
              <span className="absolute left-1/2 top-full h-3 w-3 -translate-x-1/2 -translate-y-1.5 rotate-45 bg-coral-500" />
              <span className="relative flex items-center gap-2 rounded-full bg-gradient-to-r from-coral-500 to-[#e0517a] py-1.5 pl-1.5 pr-4 text-white shadow-[0_14px_30px_-10px_rgba(236,106,71,0.9)] ring-2 ring-white">
                <span className="relative flex h-7 w-7 items-center justify-center rounded-full bg-white text-coral-500">
                  <span className="absolute inset-0 animate-ping rounded-full bg-white/70" />
                  <Star className="relative h-4 w-4 fill-current" />
                </span>
                <span className="leading-tight">
                  <span className="block text-[10px] font-semibold uppercase tracking-wider text-white/85">{M.yourSalon}</span>
                  <span className="block text-sm font-extrabold">
                    {M.from} 35 €
                  </span>
                </span>
              </span>
            </span>
          </div>

          {/* Floating cards */}
          <div className="absolute -left-3 -top-5 flex w-60 items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_24px_50px_-20px_rgba(31,24,45,0.45)] ring-1 ring-ink-100 sm:-left-8">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600">
              <LocateFixed className="h-5 w-5" />
            </span>
            <span className="min-w-0">
              <span className="block truncate text-xs font-semibold text-ink-400">{M.nearbyTitle}</span>
              <span className="block truncate text-sm font-bold text-ink-900">{M.nearbyBody}</span>
            </span>
          </div>
          <div className="absolute -bottom-6 -right-3 flex w-64 items-center gap-3 rounded-2xl bg-white p-3 shadow-[0_24px_50px_-20px_rgba(31,24,45,0.45)] ring-1 ring-ink-100 sm:-right-8">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="h-5 w-5" strokeWidth={3} />
            </span>
            <span className="min-w-0">
              <span className="flex items-center gap-1.5 text-sm font-bold text-ink-900">
                <BellRing className="h-3.5 w-3.5 text-coral-500" />
                {M.newBooking}
              </span>
              <span className="block truncate text-xs text-ink-400">14:00 · {M.nearbyBody}</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
