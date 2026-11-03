"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { themeText, type SeasonalTheme } from "@/lib/seasonal-themes";

/** The admin's holiday look for the whole site (src/lib/platform-season.ts):
 * a slim festive strip under the navbar — on public pages with the site
 * theme, in the owner/staff dashboards with the dashboard one. A visitor
 * can close it; it stays closed for that theme in their browser. */
export function SiteSeasonStrip({ locale, site, dashboard }: { locale: string; site: SeasonalTheme | null; dashboard: SeasonalTheme | null }) {
  const pathname = usePathname() ?? "";
  const inDashboard = /\/(business\/dashboard|admin)(\/|$)/.test(pathname);
  const theme = inDashboard ? dashboard : site;
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    if (!theme) return;
    try {
      setHidden(localStorage.getItem(`varaaai_season_closed_${theme.id}`) === "1");
    } catch {
      setHidden(false);
    }
  }, [theme]);

  if (!theme || hidden) return null;
  return (
    <div className="relative isolate overflow-hidden text-white" style={{ backgroundImage: `linear-gradient(110deg, ${theme.from}, ${theme.to})` }}>
      <style>{`@keyframes varaaai-drift{0%,100%{transform:translateY(0) rotate(-6deg)}50%{transform:translateY(-3px) rotate(6deg)}}`}</style>
      {[6, 22, 38, 62, 78, 94].map((left, i) => (
        <span
          key={left}
          aria-hidden
          className="pointer-events-none absolute top-1/2 -z-10 -translate-y-1/2 select-none text-lg opacity-50"
          style={{ left: `${left}%`, animation: `varaaai-drift ${3 + (i % 3)}s ease-in-out ${i * 0.4}s infinite` }}
        >
          {theme.emojis[i % theme.emojis.length]}
        </span>
      ))}
      <div className="container flex items-center justify-center gap-2 py-2 pr-10 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.25em]" style={{ color: theme.accent }}>
          {themeText(theme.name, locale)}
        </span>
        <span className="truncate font-serif text-sm sm:text-base">
          {theme.emojis[0]} {themeText(theme.greeting, locale)}
        </span>
      </div>
      <button
        type="button"
        aria-label="×"
        onClick={() => {
          setHidden(true);
          try {
            localStorage.setItem(`varaaai_season_closed_${theme.id}`, "1");
          } catch {}
        }}
        className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
      >
        <X className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}
