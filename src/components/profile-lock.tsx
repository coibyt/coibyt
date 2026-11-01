import { ChevronRight, Circle, Lock, Megaphone, Settings2, Stamp } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { fill } from "@/lib/shop-strings";
import { PROFILE_UNLOCK_PCT } from "@/lib/profile-completeness";
import { profileLockStrings } from "@/lib/profile-lock-strings";
import { CHECK_TARGET, settingsStrings, type ChecklistId } from "@/lib/settings-strings";
import { siteSerif } from "@/lib/site-fonts";

/** Shown instead of the loyalty or marketing page while the salon profile is
 * under PROFILE_UNLOCK_PCT: how far along it is and what to add. */
export function ProfileLock({
  locale,
  feature,
  isOwner,
  pct,
  checklist,
}: {
  locale: string;
  feature: "loyalty" | "marketing";
  isOwner: boolean;
  pct: number;
  checklist: { id: ChecklistId; done: boolean }[];
}) {
  const S = profileLockStrings(locale);
  const C = settingsStrings(locale);
  const name = S[feature];
  const vars = { feature: name, need: PROFILE_UNLOCK_PCT };
  const missing = checklist.filter((c) => !c.done);
  const Icon = feature === "loyalty" ? Stamp : Megaphone;
  const r = 52;
  const circ = 2 * Math.PI * r;
  // The 85% mark on the ring, as an angle from 12 o'clock.
  const mark = (PROFILE_UNLOCK_PCT / 100) * 2 * Math.PI;

  return (
    <div className={`${siteSerif.variable} mx-auto max-w-3xl`}>
      <section className="relative overflow-hidden rounded-[2rem] bg-[#1f182d] p-6 text-white shadow-[0_30px_60px_-35px_rgba(31,24,45,0.9)] sm:p-10">
        <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-[#624f89]/50 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 left-10 h-56 w-56 rounded-full bg-[#c9a96e]/20 blur-3xl" />
        <div className="relative grid gap-8 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
          <div className="min-w-0">
            <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-[#e8d3a6]">
              <Lock className="h-3.5 w-3.5" />
              {S.eyebrow}
            </p>
            <h1 className="mt-4 font-serif text-2xl leading-tight sm:text-3xl">{fill(S.title, vars)}</h1>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{fill(isOwner ? S.text : S.staffText, vars)}</p>
          </div>

          <div className="relative mx-auto h-36 w-36 shrink-0">
            <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
              <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="10" />
              <circle
                cx="60"
                cy="60"
                r={r}
                fill="none"
                stroke="url(#lockGold)"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={`${(circ * Math.min(pct, 100)) / 100} ${circ}`}
              />
              <line
                x1={60 + (r - 9) * Math.cos(mark)}
                y1={60 + (r - 9) * Math.sin(mark)}
                x2={60 + (r + 9) * Math.cos(mark)}
                y2={60 + (r + 9) * Math.sin(mark)}
                stroke="#e8d3a6"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="lockGold" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#e8c983" />
                  <stop offset="1" stopColor="#9c7cd0" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute inset-0 flex flex-col items-center justify-center">
              <Icon className="h-5 w-5 text-[#e8d3a6]" />
              <span className="mt-1 text-2xl font-bold leading-none">{pct}%</span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">
                {S.need} {PROFILE_UNLOCK_PCT}%
              </span>
            </span>
          </div>
        </div>
      </section>

      <section className="mt-4 rounded-[2rem] border border-ink-100 bg-white p-5 shadow-[0_18px_40px_-34px_rgba(31,24,45,0.6)] sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-[11px] font-bold uppercase tracking-wider text-[#b08a3e]">{S.todo}</p>
          <span className="rounded-full bg-[#f6efe1] px-3 py-1 text-xs font-bold text-[#8a6a2c]">
            {fill(S.left, { n: Math.max(PROFILE_UNLOCK_PCT - pct, 0) })}
          </span>
        </div>
        <ul className="mt-3 grid gap-1 sm:grid-cols-2">
          {missing.map((c) => {
            const target = CHECK_TARGET[c.id];
            const label = (
              <>
                <Circle className="h-4 w-4 shrink-0 text-ink-200" />
                <span className="min-w-0 flex-1 truncate">{C.checklist[c.id]}</span>
              </>
            );
            return (
              <li key={c.id}>
                {isOwner ? (
                  <Link
                    href={target.startsWith("#") ? `/business/dashboard/settings${target}` : target}
                    className="flex items-center gap-2 rounded-xl px-2 py-2 text-sm text-ink-700 transition hover:bg-mist-50"
                  >
                    {label}
                    <span className="flex shrink-0 items-center text-xs font-semibold text-primary-600">
                      {S.fix}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </span>
                  </Link>
                ) : (
                  <span className="flex items-center gap-2 px-2 py-2 text-sm text-ink-700">{label}</span>
                )}
              </li>
            );
          })}
        </ul>
        {isOwner && (
          <Link
            href="/business/dashboard/settings"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#d9b25c] to-[#b9852d] px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-[#b9852d]/25 transition hover:brightness-105"
          >
            <Settings2 className="h-4 w-4" />
            {S.cta}
          </Link>
        )}
      </section>
    </div>
  );
}
