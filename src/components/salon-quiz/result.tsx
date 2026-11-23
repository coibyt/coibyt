"use client";

/** The end of the salon quiz: the plan built from the answers, a scratch
 * card that opens onto VaraaAi's real price (free), and the sign-up button
 * that stays at the bottom of the screen. */
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, Gift, RotateCcw } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { quizPlan, type Area, type QuizAnswers } from "@/lib/salon-quiz";
import type { SalonQuizStrings } from "@/lib/salon-quiz-strings";
import { GOLD, Photo, Wordmark, fill, trackQuiz } from "@/components/salon-quiz/shared";

export function QuizResult({ locale, t, answers, onBack, onRestart }: { locale: string; t: SalonQuizStrings; answers: QuizAnswers; onBack: () => void; onRestart: () => void }) {
  const r = t.result;
  const plan = quizPlan(answers);
  const name = answers.name?.trim();
  const noshow = answers.noshow ?? 0;
  const num = (n: number) => n.toLocaleString(locale);

  // The gauge sweeps up to the score once the plan is on screen.
  const [shown, setShown] = useState(0);
  useEffect(() => {
    const id = window.setTimeout(() => setShown(plan.score), 150);
    return () => window.clearTimeout(id);
  }, [plan.score]);

  const why: Record<Area, string> = {
    booking: r.areas.booking.why[(answers.afterhours as "wait" | "lost" | "online" | undefined) ?? (answers.channels?.includes("online") ? "online" : "wait")],
    noshow: noshow > 0 ? fill(r.areas.noshow.why.some, noshow >= 10 ? fill(t.ui.plus, 10) : noshow) : r.areas.noshow.why.none,
    loyal: r.areas.loyal.why[(answers.returning as "none" | "manual" | "paper" | "program" | undefined) ?? "none"],
    manage: r.areas.manage.why[!answers.team || answers.team === "solo" ? "solo" : "team"],
  };
  const chips = [
    answers.type && t.q.type.options[answers.type],
    answers.team && (t.q.team.options as Record<string, string>)[answers.team],
    answers.hours !== undefined && fill(r.chips.hours, answers.hours >= 15 ? fill(t.ui.plus, 15) : answers.hours),
    answers.noshow !== undefined && fill(r.chips.noshow, noshow >= 10 ? fill(t.ui.plus, 10) : noshow),
  ].filter((c): c is string => !!c);

  const arc = Math.PI * 50;
  const apply = name ? `/business/apply?name=${encodeURIComponent(name)}` : "/business/apply";

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain pb-44">
        <div className="relative h-64 bg-gradient-to-br from-primary-700 via-primary-800 to-[#171124]">
          <Photo name={answers.type ?? "grand"} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171124]/80 via-[#171124]/20 to-[#171124]" />
          <div className="relative flex items-center justify-between px-3 pt-3">
            <button type="button" onClick={onBack} aria-label={t.ui.back} className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <Wordmark />
            <span className="h-10 w-10" />
          </div>
          <div className="absolute inset-x-5 bottom-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e8d3a6]">{r.eyebrow}</p>
            <h1 className="mt-1 break-words font-serif text-[2rem] font-semibold leading-[1.1] text-white">{name || r.fallbackName}</h1>
          </div>
        </div>

        <div className="space-y-4 px-4 pt-1">
          {chips.length > 0 && (
            <ul className="flex flex-wrap gap-1.5">
              {chips.map((c) => (
                <li key={c} className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/85 ring-1 ring-white/10">
                  {c}
                </li>
              ))}
            </ul>
          )}

          {/* How automated the salon is today */}
          <section className="rounded-3xl bg-[#fffdf9] p-5 text-ink-900 motion-safe:animate-slide-up">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8a6a2a]">{r.scoreLabel}</p>
            <div className="relative mx-auto mt-2 w-56">
              <svg viewBox="0 0 120 68" className="w-full">
                <defs>
                  <linearGradient id="quiz-gauge" x1="0" x2="1">
                    <stop offset="0" stopColor="#8b76b9" />
                    <stop offset="1" stopColor="#b08a3e" />
                  </linearGradient>
                </defs>
                <path d="M10 60 A50 50 0 0 1 110 60" fill="none" stroke="#e6dff3" strokeWidth="9" strokeLinecap="round" />
                <path
                  d="M10 60 A50 50 0 0 1 110 60"
                  fill="none"
                  stroke="url(#quiz-gauge)"
                  strokeWidth="9"
                  strokeLinecap="round"
                  strokeDasharray={arc}
                  strokeDashoffset={arc * (1 - shown / 100)}
                  className="transition-[stroke-dashoffset] ease-out"
                  style={{ transitionDuration: "1400ms" }}
                />
              </svg>
              <p className="absolute inset-x-0 bottom-0 text-center font-serif text-5xl font-semibold tabular-nums text-primary-800">
                {num(plan.score)}
                <span className="text-lg font-medium text-ink-300">/100</span>
              </p>
            </div>
            <p className="mt-3 text-center font-serif text-xl font-semibold text-primary-900">{r.bands[plan.band].label}</p>
            <p className="mt-1.5 text-center text-sm leading-relaxed text-ink-700">{r.bands[plan.band].body}</p>
            <p className="mt-3 border-t border-ink-100 pt-3 text-center text-xs text-ink-400">{r.scoreNote}</p>
          </section>

          {/* The visitor's own numbers, times four weeks */}
          <section>
            <div className="grid grid-cols-2 gap-3">
              <Fact big={plan.hoursPerMonth > 0 ? fill(r.hours, answers.hours! >= 15 ? fill(t.ui.plus, num(60)) : num(plan.hoursPerMonth)) : r.hoursZero} body={plan.hoursPerMonth > 0 ? r.hoursBody : r.hoursZeroBody} />
              <Fact big={plan.slotsPerMonth > 0 ? fill(r.slots, noshow >= 10 ? fill(t.ui.plus, num(40)) : num(plan.slotsPerMonth)) : r.slotsZero} body={plan.slotsPerMonth > 0 ? r.slotsBody : r.slotsZeroBody} />
            </div>
            <p className="mt-2 text-center text-[11px] text-white/45">{r.factsNote}</p>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-semibold text-white">{r.planTitle}</h2>
            <p className="mt-1 text-sm text-white/60">{r.planSub}</p>
            <ol className="mt-4 space-y-3">
              {plan.areas.map((a, i) => (
                <li key={a} className="rounded-3xl bg-[#fffdf9] p-5 text-ink-900">
                  <div className="flex items-start gap-3">
                    <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${GOLD} font-serif text-lg font-bold text-primary-900`}>{i + 1}</span>
                    <h3 className="pt-0.5 font-serif text-xl font-semibold leading-snug text-primary-900">{r.areas[a].title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-700">{why[a]}</p>
                  <ul className="mt-3 space-y-2 border-t border-ink-100 pt-3">
                    {r.areas[a].how.map((h) => (
                      <li key={h} className="flex gap-2.5 text-sm font-medium leading-snug text-ink-900">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#b08a3e]" strokeWidth={3} />
                        {h}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <ScratchCard t={t} />

          <section className="rounded-3xl bg-white/[0.06] p-5 ring-1 ring-white/10">
            <h2 className="text-sm font-bold text-white">{r.toolsTitle}</h2>
            <ul className="mt-3 space-y-2">
              {(
                [
                  ["/tools/price-list", r.tools.price],
                  ["/tools/qr-poster", r.tools.poster],
                  ["/salon-check", r.tools.check],
                ] as const
              ).map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.07] px-4 py-3 text-sm font-semibold text-white/90">
                    {label}
                    <ArrowRight className="h-4 w-4 shrink-0 text-[#e8d3a6]" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          <button type="button" onClick={onRestart} className="mx-auto flex items-center gap-2 py-2 text-sm font-semibold text-white/55">
            <RotateCcw className="h-4 w-4" />
            {r.redo}
          </button>
        </div>
      </div>

      {/* The sign-up button never leaves the screen. */}
      <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#171124] from-70% to-transparent px-4 pb-[max(0.9rem,env(safe-area-inset-bottom))] pt-8">
        <Link
          href={apply}
          onClick={() => trackQuiz("cta_click")}
          className={`flex h-14 w-full items-center justify-center gap-2 rounded-full ${GOLD} text-base font-extrabold text-primary-900 shadow-[0_18px_40px_-16px_rgba(232,211,166,0.7)] active:scale-[0.99]`}
        >
          {r.cta}
          <ArrowRight className="h-5 w-5" />
        </Link>
        <p className="mt-2 flex items-center justify-center gap-3 text-xs text-white/60">
          <span>{r.ctaNote}</span>
          <Link href="/support" className="font-semibold text-[#e8d3a6] underline underline-offset-2">
            {r.ask}
          </Link>
        </p>
      </div>
    </div>
  );
}

function Fact({ big, body }: { big: string; body: string }) {
  return (
    <div className="rounded-3xl bg-white/[0.07] p-4 ring-1 ring-white/10">
      <p className="font-serif text-[1.35rem] font-semibold leading-tight text-[#f1e2bd]">{big}</p>
      <p className="mt-1.5 text-xs leading-relaxed text-white/65">{body}</p>
    </div>
  );
}

/** A gold foil to rub off with a finger. Under it: what VaraaAi costs. */
function ScratchCard({ t }: { t: SalonQuizStrings }) {
  const r = t.result;
  const canvas = useRef<HTMLCanvasElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const { width: w, height: h } = el.getBoundingClientRect();
    el.width = Math.round(w * dpr);
    el.height = Math.round(h * dpr);
    ctx.scale(dpr, dpr);
    const foil = ctx.createLinearGradient(0, 0, w, h);
    for (const [at, color] of [[0, "#b08a3e"], [0.3, "#f1e2bd"], [0.5, "#c9a557"], [0.75, "#f6ecd2"], [1, "#a47f35"]] as const) foil.addColorStop(at, color);
    ctx.fillStyle = foil;
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = "rgba(255,255,255,0.22)";
    ctx.lineWidth = 1;
    for (let x = -h; x < w; x += 9) {
      ctx.beginPath();
      ctx.moveTo(x, h);
      ctx.lineTo(x + h, 0);
      ctx.stroke();
    }
    ctx.fillStyle = "#4b3a12";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `700 15px ${getComputedStyle(document.body).fontFamily}`;
    ctx.fillText(r.scratchHint, w / 2, h / 2);

    let down = false;
    let moves = 0;
    let last: { x: number; y: number } | null = null;
    const at = (e: PointerEvent) => {
      const b = el.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    const rub = (e: PointerEvent) => {
      const p = at(e);
      ctx.globalCompositeOperation = "destination-out";
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 44;
      ctx.lineCap = "round";
      ctx.beginPath();
      ctx.moveTo((last ?? p).x, (last ?? p).y);
      ctx.lineTo(p.x + 0.01, p.y);
      ctx.stroke();
      last = p;
      if (++moves % 8) return;
      // Enough of the foil gone? Then lift the rest.
      const px = ctx.getImageData(0, 0, el.width, el.height).data;
      let clear = 0;
      let seen = 0;
      for (let i = 3; i < px.length; i += 4 * 64) {
        seen++;
        if (px[i] < 40) clear++;
      }
      if (clear / seen > 0.38) setOpen(true);
    };
    const start = (e: PointerEvent) => {
      down = true;
      last = null;
      el.setPointerCapture(e.pointerId);
      rub(e);
    };
    const move = (e: PointerEvent) => down && rub(e);
    const end = () => {
      down = false;
    };
    el.addEventListener("pointerdown", start);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", end);
    el.addEventListener("pointercancel", end);
    return () => {
      el.removeEventListener("pointerdown", start);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", end);
      el.removeEventListener("pointercancel", end);
    };
  }, [r.scratchHint]);

  return (
    <section>
      <h2 className="flex items-center gap-2 font-serif text-2xl font-semibold text-white">
        <Gift className="h-5 w-5 text-[#e8d3a6]" />
        {r.scratchTitle}
      </h2>
      <div className="relative mt-4 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 p-5 ring-1 ring-[#e8d3a6]/40">
        <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#e8d3a6]/20 blur-3xl" />
        <p className="relative text-center">
          <span className="bg-gradient-to-r from-[#f6ecd2] to-[#c9a557] bg-clip-text font-serif text-7xl font-semibold leading-none text-transparent">{r.giftBig}</span>
          <span className="mt-1.5 block text-sm font-semibold text-white/80">{r.giftSub}</span>
        </p>
        <ul className="relative mt-4 space-y-1.5">
          {r.giftPoints.map((p) => (
            <li key={p} className="flex items-center gap-2 text-sm text-white/90">
              <Check className="h-4 w-4 shrink-0 text-[#e8d3a6]" strokeWidth={3} />
              {p}
            </li>
          ))}
        </ul>
        <canvas
          ref={canvas}
          aria-hidden
          className={`absolute inset-0 h-full w-full cursor-grab touch-none transition-opacity duration-700 ${open ? "pointer-events-none opacity-0" : "opacity-100"}`}
        />
      </div>
      {!open && (
        <button type="button" onClick={() => setOpen(true)} className="mx-auto mt-3 block rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/15">
          {r.scratchOpen}
        </button>
      )}
    </section>
  );
}
