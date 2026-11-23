"use client";

/** The salon quiz (/salon-quiz): a full-screen, phone-first flow for salon
 * owners arriving from ads — intro, twelve questions in three parts with
 * short explainers in between, a "putting it together" screen, then a plan
 * (result.tsx). Nothing is stored on the server except anonymous counters. */
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, Volume2, Square } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { HALFWAY_ID, QUIZ_SCREENS, type QuizAnswers, type QuizScreen } from "@/lib/salon-quiz";
import type { SalonQuizStrings } from "@/lib/salon-quiz-strings";
import { QuizResult } from "@/components/salon-quiz/result";
import { GOLD, Photo, Wordmark, fill, preloadPhotos, trackQuiz, type QuizEvent } from "@/components/salon-quiz/shared";

const STORE_KEY = "varaaai.salonQuiz.v1";
const N = QUIZ_SCREENS.length;
/** Positions: 0 = intro, 1…N = the screens, N + 1 = the plan. */
const RESULT = N + 1;

export function SalonQuiz({ locale, t }: { locale: string; t: SalonQuizStrings }) {
  const [pos, setPos] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [building, setBuilding] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const sent = useRef(new Set<QuizEvent>());
  const once = useCallback((e: QuizEvent) => {
    if (sent.current.has(e)) return;
    sent.current.add(e);
    trackQuiz(e);
  }, []);

  // Come back to where the visitor was after a reload, and follow the browser's back button.
  useEffect(() => {
    once("open");
    try {
      const saved = JSON.parse(sessionStorage.getItem(STORE_KEY) ?? "null") as { answers?: QuizAnswers } | null;
      if (saved?.answers) setAnswers(saved.answers);
      const at = (history.state as { quizPos?: number } | null)?.quizPos;
      if (typeof at === "number" && at >= 0 && at <= RESULT && saved?.answers) setPos(at);
      else if (location.hash) history.replaceState(history.state, "", location.pathname + location.search);
    } catch {
      // Private mode: the quiz simply starts from the top.
    }
    const onPop = (e: PopStateEvent) => {
      setBuilding(false);
      setPos((e.state as { quizPos?: number } | null)?.quizPos ?? 0);
    };
    window.addEventListener("popstate", onPop);
    // The quiz covers the whole screen; the page behind it must not scroll.
    const root = document.documentElement;
    const before = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("popstate", onPop);
      root.style.overflow = before;
    };
  }, [once]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE_KEY, JSON.stringify({ answers }));
    } catch {
      // Not being able to save is fine.
    }
  }, [answers]);

  // Fetch the next pictures before they are needed, so screens never pop in.
  useEffect(() => {
    // Each screen starts from the top, whatever the last one was scrolled to.
    for (const el of [frame.current, frame.current?.lastElementChild]) if (el) el.scrollTop = 0;
    // The first question's six pictures while the intro is read; every explainer picture once the quiz has started.
    if (pos === 0) preloadPhotos(QUIZ_SCREENS.flatMap((s) => (s.kind === "tiles" ? s.options : [])));
    else preloadPhotos(QUIZ_SCREENS.flatMap((s) => (s.kind === "info" ? [s.image] : [])));
  }, [pos]);

  const go = useCallback(
    (to: number) => {
      const id = to === RESULT ? "plan" : to === 0 ? "" : QUIZ_SCREENS[to - 1].id;
      history.pushState({ quizPos: to }, "", id ? `#${id}` : location.pathname + location.search);
      if (to === 1) once("start");
      if (to >= 1 && to <= N && QUIZ_SCREENS[to - 1].id === HALFWAY_ID) once("halfway");
      if (to === RESULT) {
        setBuilding(true);
        once("finish");
      }
      setPos(to);
    },
    [once],
  );
  const next = useCallback(() => go(pos + 1), [go, pos]);
  const set = useCallback(<K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => setAnswers((a) => ({ ...a, [key]: value })), []);
  const restart = useCallback(() => {
    setAnswers({});
    go(0);
  }, [go]);

  const screen = pos >= 1 && pos <= N ? QUIZ_SCREENS[pos - 1] : null;

  return (
    <div ref={frame} className="fixed inset-0 z-[70] h-[100dvh] overflow-hidden bg-[#120d1c] text-white">
      {/* Soft plum and gold light behind everything; on a desktop it frames the phone-width column.
          Clipped in its own box: if it overflowed the frame, focusing a button could scroll the frame. */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-[-10rem] h-[32rem] w-[32rem] rounded-full bg-primary-500/30 blur-3xl" />
        <div className="absolute -right-40 bottom-[-12rem] h-[30rem] w-[30rem] rounded-full bg-[#b08a3e]/20 blur-3xl" />
      </div>
      <div className="relative mx-auto flex h-full w-full max-w-[30rem] flex-col overflow-hidden bg-[#171124] sm:my-[2dvh] sm:h-[96dvh] sm:rounded-[2.5rem] sm:shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] sm:ring-1 sm:ring-white/10">
        {pos === RESULT ? (
          building ? (
            <Building t={t} onDone={() => setBuilding(false)} />
          ) : (
            <QuizResult locale={locale} t={t} answers={answers} onBack={() => history.back()} onRestart={restart} />
          )
        ) : (
          <>
            <header className="relative z-20 flex shrink-0 items-center justify-between px-3 pt-3">
              {pos > 0 ? (
                <button type="button" onClick={() => history.back()} aria-label={t.ui.back} className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:bg-white/10">
                  <ChevronLeft className="h-6 w-6" />
                </button>
              ) : (
                <span className="h-10 w-10" />
              )}
              <Wordmark />
              {pos === 0 ? (
                <nav className="flex h-10 items-center gap-0.5 rounded-full bg-black/25 px-1.5 text-[11px] font-bold uppercase backdrop-blur" aria-label="Language">
                  {(["vi", "en", "fi"] as const).map((l) => (
                    <Link key={l} href="/salon-quiz" locale={l} className={`rounded-full px-1.5 py-1 ${l === locale ? "bg-white/20 text-white" : "text-white/60"}`}>
                      {l}
                    </Link>
                  ))}
                </nav>
              ) : (
                <span className="h-10 w-10" />
              )}
            </header>
            {screen && <Progress t={t} pos={pos} section={screen.section} />}
            {pos === 0 ? (
              <Intro locale={locale} t={t} onStart={() => go(1)} onAudio={() => once("audio")} />
            ) : (
              screen && <ScreenView key={screen.id} locale={locale} t={t} screen={screen} answers={answers} set={set} next={next} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

/** Three bars, one per part of the quiz, each filling as its screens are passed. */
function Progress({ t, pos, section }: { t: SalonQuizStrings; pos: number; section: number }) {
  return (
    <div className="relative z-20 shrink-0 px-5 pt-2">
      <div className="flex gap-1.5">
        {[0, 1, 2].map((s) => {
          const ids = QUIZ_SCREENS.map((x, i) => (x.section === s ? i + 1 : 0)).filter(Boolean);
          const done = ids.filter((i) => i <= pos).length / ids.length;
          return (
            <span key={s} className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              <span className={`block h-full rounded-full ${GOLD} transition-[width] duration-500`} style={{ width: `${done * 100}%` }} />
            </span>
          );
        })}
      </div>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#e8d3a6]">
        {fill(t.ui.part, section + 1)} · <span className="text-white/60">{t.ui.sections[section]}</span>
      </p>
    </div>
  );
}

function Intro({ locale, t, onStart, onAudio }: { locale: string; t: SalonQuizStrings; onStart: () => void; onAudio: () => void }) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  useEffect(() => () => audio.current?.pause(), []);
  const toggle = () => {
    if (playing) {
      audio.current?.pause();
      setPlaying(false);
      return;
    }
    if (!audio.current) {
      audio.current = new Audio(`/quiz/intro-${locale === "vi" || locale === "fi" ? locale : "en"}.mp3`);
      audio.current.onended = () => setPlaying(false);
    }
    audio.current.currentTime = 0;
    void audio.current.play().then(
      () => {
        setPlaying(true);
        onAudio();
      },
      () => setPlaying(false),
    );
  };

  return (
    <div className="absolute inset-0 flex flex-col">
      <div className="relative min-h-0 flex-1">
        <Photo name="hero" priority className="absolute inset-0 h-full w-full object-cover object-[50%_12%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#171124]/50 via-transparent via-30% to-[#171124]" />
        {/* What changes, in two small cards over the photo. */}
        <div className="absolute inset-x-4 bottom-3 grid grid-cols-2 gap-2.5 motion-safe:animate-slide-up">
          <div className="rounded-2xl bg-black/45 p-3 ring-1 ring-white/10 backdrop-blur-md">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/55">{t.ui.before}</p>
            <p className="mt-1 text-[13px] font-semibold leading-snug text-white/85">{t.ui.beforeBody}</p>
          </div>
          <div className="rounded-2xl bg-[#f6ead0]/95 p-3 text-primary-900 ring-1 ring-[#e8d3a6]">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8a6a2a]">{t.ui.after}</p>
            <p className="mt-1 text-[13px] font-bold leading-snug">{t.ui.afterBody}</p>
          </div>
        </div>
      </div>
      <div className="relative shrink-0 px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-2">
        <div className="flex items-center justify-between gap-3">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e8d3a6]">{t.intro.eyebrow}</p>
          <button type="button" onClick={toggle} aria-pressed={playing} className="flex shrink-0 items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-[12px] font-semibold text-white ring-1 ring-white/15">
            {playing ? <Square className="h-3 w-3 fill-current" /> : <Volume2 className="h-3.5 w-3.5 text-[#e8d3a6]" />}
            {playing ? t.ui.listenStop : t.ui.listen}
          </button>
        </div>
        <h1 className="mt-2 font-serif text-[2rem] font-semibold leading-[1.1] text-white">
          {t.intro.title} <span className="italic text-[#e8d3a6]">{t.intro.accent}</span>
        </h1>
        <p className="mt-3 text-[15px] leading-relaxed text-white/75">{t.intro.sub}</p>
        <button
          type="button"
          onClick={onStart}
          className={`mt-5 flex h-14 w-full items-center justify-center gap-2 rounded-full ${GOLD} text-base font-extrabold text-primary-900 shadow-[0_18px_40px_-16px_rgba(232,211,166,0.7)] active:scale-[0.99]`}
        >
          {t.ui.start}
          <span className="font-semibold opacity-70">· {t.ui.startNote}</span>
          <ArrowRight className="h-5 w-5" />
        </button>
        <ul className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-[12px] font-medium text-white/60">
          {t.ui.trust.map((x) => (
            <li key={x} className="flex items-center gap-1">
              <Check className="h-3.5 w-3.5 text-[#e8d3a6]" />
              {x}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function NextButton({ label, onClick, disabled }: { label: string; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex h-14 w-full items-center justify-center gap-2 rounded-full bg-primary-800 text-base font-bold text-white transition active:scale-[0.99] disabled:bg-ink-100 disabled:text-ink-300"
    >
      {label}
      <ArrowRight className={`h-5 w-5 ${disabled ? "" : "text-[#e8d3a6]"}`} />
    </button>
  );
}

/** The button row of a sheet. It stays at the sheet's bottom edge when the answers above it need scrolling (small phones). */
function Foot({ children }: { children: React.ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 mt-2 bg-gradient-to-t from-[#fffdf9] from-80% to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
      {children}
    </div>
  );
}

/** The bottom margin of a sheet that has no button row. */
function SheetEnd() {
  return <div aria-hidden className="h-[max(1rem,env(safe-area-inset-bottom))]" />;
}

type SetAnswer = <K extends keyof QuizAnswers>(key: K, value: QuizAnswers[K]) => void;

function ScreenView({ locale, t, screen, answers, set, next }: { locale: string; t: SalonQuizStrings; screen: QuizScreen; answers: QuizAnswers; set: SetAnswer; next: () => void }) {
  // A tap shows as chosen for a moment before the next screen slides in.
  const timer = useRef<number | null>(null);
  useEffect(() => () => void (timer.current && window.clearTimeout(timer.current)), []);
  const soon = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(next, 320);
  };

  if (screen.kind === "info") {
    const info = t.info[screen.info];
    return (
      <div className="flex min-h-0 flex-1 flex-col motion-safe:animate-fade-in">
        <div className="relative -mt-[5.5rem] min-h-[38%] flex-1 bg-gradient-to-br from-primary-700 via-primary-800 to-[#171124]">
          <Photo name={screen.image} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#171124]/85 via-transparent via-35% to-[#171124]/60" />
        </div>
        <Sheet>
          <p className="inline-flex rounded-full bg-[#faf3e3] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#8a6a2a] ring-1 ring-[#e8d3a6]">{info.eyebrow}</p>
          <h2 className="mt-3 font-serif text-[1.6rem] font-semibold leading-[1.15] text-primary-900">{info.title}</h2>
          <p className="mt-2.5 text-[15px] leading-relaxed text-ink-700">{info.body}</p>
          <Foot>
            <NextButton label={t.ui.next} onClick={next} />
          </Foot>
        </Sheet>
      </div>
    );
  }

  const q = t.q[screen.id];
  const title = "quote" in q ? null : q.title;
  const sub = screen.kind === "scale" ? t.ui.scaleSub : screen.kind === "multi" ? t.ui.pickAll : "sub" in q ? q.sub : null;
  const number = QUIZ_SCREENS.filter((x) => x.kind !== "info").findIndex((x) => x.id === screen.id) + 1;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex shrink-0 grow basis-auto flex-col px-5 pb-5 pt-2 motion-safe:animate-fade-in">
        {/* The space above the question holds a faint numeral, shown only when there is room for all of it. */}
        <div aria-hidden className="relative min-h-0 flex-1 [container-type:size]">
          <span className="pointer-events-none absolute right-0 top-0 hidden select-none font-serif text-[7rem] font-semibold leading-none text-[#e8d3a6]/[0.12] [@container(min-height:7.5rem)]:block">
            {String(number).padStart(2, "0")}
          </span>
        </div>
        {"quote" in q ? (
          <>
            <span aria-hidden className="font-serif text-6xl leading-[0.6] text-[#e8d3a6]">
              “
            </span>
            <h2 className="relative mt-1 font-serif text-[1.65rem] font-medium italic leading-[1.2] text-white">{q.quote}</h2>
          </>
        ) : (
          <h2 className="relative font-serif text-[1.7rem] font-semibold leading-[1.15] text-white">{title}</h2>
        )}
        {sub && <p className="relative mt-2.5 text-sm text-white/65">{sub}</p>}
      </div>
      <Sheet>
        {screen.kind === "tiles" && (
          <div className="grid grid-cols-2 gap-2.5">
            {screen.options.map((o) => {
              const on = answers.type === o;
              return (
                <button
                  key={o}
                  type="button"
                  aria-pressed={on}
                  onClick={() => {
                    set("type", o);
                    soon();
                  }}
                  className={`relative aspect-[16/11] overflow-hidden rounded-2xl bg-primary-200 text-left ring-2 transition active:scale-[0.98] ${on ? "ring-[#b08a3e]" : "ring-transparent"}`}
                >
                  <Photo name={o} className="absolute inset-0 h-full w-full object-cover" />
                  <span className="absolute inset-0 bg-gradient-to-t from-primary-900/90 via-primary-900/10 to-transparent" />
                  <span className="absolute bottom-2 left-3 right-2 text-[15px] font-bold text-white">{t.q.type.options[o]}</span>
                  {on && (
                    <span className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full ${GOLD} text-primary-900`}>
                      <Check className="h-4 w-4" strokeWidth={3} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
        {screen.kind === "tiles" && <SheetEnd />}

        {screen.kind === "single" && (
          <Single
            options={screen.options.map((o, i) => ({ id: o, label: (t.q[screen.id].options as Record<string, string>)[o], emoji: screen.emoji[i] }))}
            value={answers[screen.id]}
            hint={screen.hints && answers[screen.id] ? (t.q[screen.id as "afterhours" | "tech"].hints as Record<string, string>)[answers[screen.id]!] : null}
            nextLabel={t.ui.next}
            onPick={(o) => {
              set(screen.id, o);
              if (!screen.hints) soon();
            }}
            onNext={next}
          />
        )}

        {screen.kind === "multi" && (
          <Multi
            options={screen.options.map((o, i) => ({ id: o, label: (t.q[screen.id].options as Record<string, string>)[o], emoji: screen.emoji[i] }))}
            value={answers[screen.id] ?? []}
            onChange={(v) => set(screen.id, v)}
            nextLabel={t.ui.next}
            skipLabel={t.ui.skip}
            onNext={next}
          />
        )}

        {screen.kind === "scale" && (
          <Scale
            value={answers[screen.id]}
            low={t.ui.scaleLow}
            high={t.ui.scaleHigh}
            onPick={(v) => {
              set(screen.id, v);
              soon();
            }}
          />
        )}

        {screen.kind === "slider" && (
          <Slider
            locale={locale}
            value={answers[screen.id] ?? screen.start}
            max={screen.max}
            unit={t.q[screen.id].unit}
            plus={t.ui.plus}
            nextLabel={t.ui.next}
            onChange={(v) => set(screen.id, v)}
            onNext={() => {
              if (answers[screen.id] === undefined) set(screen.id, screen.start);
              next();
            }}
          />
        )}

        {screen.kind === "text" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
          >
            <input
              value={answers.name ?? ""}
              onChange={(e) => set("name", e.target.value.slice(0, 60))}
              placeholder={t.q.name.placeholder}
              autoComplete="organization"
              enterKeyHint="done"
              className="h-14 w-full rounded-2xl border border-ink-100 bg-white px-4 text-base font-semibold text-ink-900 outline-none placeholder:font-normal placeholder:text-ink-300 focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
            <Foot>
              <NextButton label={t.ui.next} onClick={next} />
              {!answers.name?.trim() && (
                <button type="button" onClick={next} className="mt-1 w-full py-2 text-sm font-semibold text-ink-400">
                  {t.ui.skip}
                </button>
              )}
            </Foot>
          </form>
        )}
      </Sheet>
    </div>
  );
}

/** The ivory panel that rises from the bottom and holds the answers. */
function Sheet({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative z-10 min-h-0 shrink overflow-y-auto overscroll-contain rounded-t-[2rem] bg-[#fffdf9] px-4 pt-5 text-ink-900 shadow-[0_-24px_60px_-24px_rgba(0,0,0,0.7)] motion-safe:animate-slide-up">
      <span aria-hidden className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-[#e8d3a6]" />
      {children}
    </div>
  );
}

type Option = { id: string; label: string; emoji: string };

function Row({ o, on, box, onClick }: { o: Option; on: boolean; box?: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      role={box ? "checkbox" : "radio"}
      aria-checked={on}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-2xl border px-3 py-2.5 text-left transition active:scale-[0.99] ${on ? "border-primary-400 bg-primary-50" : "border-ink-100 bg-white"}`}
    >
      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-xl ${on ? "bg-white" : "bg-primary-50"}`}>{o.emoji}</span>
      <span className="min-w-0 flex-1 text-[15px] font-semibold leading-snug text-ink-900">{o.label}</span>
      <span className={`flex h-6 w-6 shrink-0 items-center justify-center ${box ? "rounded-lg" : "rounded-full"} border-2 ${on ? "border-primary-600 bg-primary-600 text-white" : "border-ink-200"}`}>
        {on && <Check className="h-3.5 w-3.5" strokeWidth={3.5} />}
      </span>
    </button>
  );
}

function Single({ options, value, hint, nextLabel, onPick, onNext }: { options: Option[]; value?: string; hint: string | null; nextLabel: string; onPick: (id: string) => void; onNext: () => void }) {
  // On a small phone the note that answers the choice may open below the fold: bring it into view.
  const note = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (hint) note.current?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [hint]);
  return (
    <>
      <div role="radiogroup" className="space-y-2">
        {options.map((o) => (
          <Row key={o.id} o={o} on={value === o.id} onClick={() => onPick(o.id)} />
        ))}
      </div>
      {!hint && <SheetEnd />}
      {hint && (
        <>
          <p ref={note} role="status" className="mt-3 rounded-2xl bg-[#faf3e3] px-4 py-3 text-sm leading-relaxed text-[#5f4a1c] ring-1 ring-[#e8d3a6] motion-safe:animate-slide-up">
            {hint}
          </p>
          <Foot>
            <NextButton label={nextLabel} onClick={onNext} />
          </Foot>
        </>
      )}
    </>
  );
}

function Multi({ options, value, onChange, nextLabel, skipLabel, onNext }: { options: Option[]; value: string[]; onChange: (v: string[]) => void; nextLabel: string; skipLabel: string; onNext: () => void }) {
  return (
    <>
      <div className="space-y-2">
        {options.map((o) => {
          const on = value.includes(o.id);
          return <Row key={o.id} o={o} on={on} box onClick={() => onChange(on ? value.filter((x) => x !== o.id) : [...value, o.id])} />;
        })}
      </div>
      <Foot>
        <NextButton label={nextLabel} onClick={onNext} disabled={value.length === 0} />
        {value.length === 0 && (
          <button type="button" onClick={onNext} className="mt-1 w-full py-2 text-sm font-semibold text-ink-400">
            {skipLabel}
          </button>
        )}
      </Foot>
    </>
  );
}

/** Five steps from "not true" to "very true"; the circles grow towards both ends. */
function Scale({ value, low, high, onPick }: { value?: number; low: string; high: string; onPick: (v: number) => void }) {
  const size = ["h-14 w-14", "h-12 w-12", "h-10 w-10", "h-12 w-12", "h-14 w-14"];
  const tone = ["border-ink-300", "border-ink-200", "border-ink-200", "border-[#d4b676]", "border-[#b08a3e]"];
  return (
    <div className="pb-2 pt-3">
      <div role="radiogroup" className="flex items-center justify-between px-1">
        {[0, 1, 2, 3, 4].map((v) => {
          const on = value === v;
          return (
            <button
              key={v}
              type="button"
              role="radio"
              aria-checked={on}
              aria-label={`${v + 1}/5`}
              onClick={() => onPick(v)}
              className={`flex items-center justify-center rounded-full border-[3px] transition active:scale-95 ${size[v]} ${on ? (v >= 3 ? `border-[#b08a3e] ${GOLD} text-primary-900` : "border-primary-600 bg-primary-600 text-white") : `bg-white ${tone[v]}`}`}
            >
              {on && <Check className="h-5 w-5" strokeWidth={3} />}
            </button>
          );
        })}
      </div>
      <div className="mt-3 flex justify-between text-xs font-semibold text-ink-400">
        <span>{low}</span>
        <span className="text-[#8a6a2a]">{high}</span>
      </div>
      <SheetEnd />
    </div>
  );
}

function Slider({ locale, value, max, unit, plus, nextLabel, onChange, onNext }: { locale: string; value: number; max: number; unit: string; plus: string; nextLabel: string; onChange: (v: number) => void; onNext: () => void }) {
  const shown = value >= max ? fill(plus, max.toLocaleString(locale)) : value.toLocaleString(locale);
  return (
    <div className="pt-1">
      <p className="text-center">
        <span className="font-serif text-6xl font-semibold tabular-nums text-primary-800">{shown}</span>
        <span className="mt-1 block text-sm font-semibold text-ink-400">{unit}</span>
      </p>
      <input
        type="range"
        min={0}
        max={max}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={unit}
        className="mt-5 h-2.5 w-full cursor-pointer appearance-none rounded-full outline-none [&::-moz-range-thumb]:h-8 [&::-moz-range-thumb]:w-8 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-[3px] [&::-moz-range-thumb]:border-solid [&::-moz-range-thumb]:border-[#b08a3e] [&::-moz-range-thumb]:bg-white [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[3px] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-[#b08a3e] [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:shadow-md"
        style={{ background: `linear-gradient(to right, #b08a3e ${(value / max) * 100}%, #e4e9e9 ${(value / max) * 100}%)` }}
      />
      <div className="mt-1 flex justify-between text-xs font-semibold tabular-nums text-ink-300">
        <span>0</span>
        <span>{fill(plus, max)}</span>
      </div>
      <Foot>
        <NextButton label={nextLabel} onClick={onNext} />
      </Foot>
    </div>
  );
}

/** A few seconds of "putting it together" before the plan: the ring fills while four lines tick off. */
function Building({ t, onDone }: { t: SalonQuizStrings; onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const done = useRef(onDone);
  done.current = onDone;
  useEffect(() => {
    const started = performance.now();
    const total = 3600;
    let raf = 0;
    let end = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - started) / total);
      setPct(Math.round(p * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else end = window.setTimeout(() => done.current(), 250);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(end);
    };
  }, []);
  const r = 54;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-8 text-center" role="status" aria-live="polite">
      <Wordmark />
      <div className="relative mt-10 h-40 w-40">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle cx="60" cy="60" r={r} fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="6" />
          <circle cx="60" cy="60" r={r} fill="none" stroke="#e8d3a6" strokeWidth="6" strokeLinecap="round" strokeDasharray={c} strokeDashoffset={c * (1 - pct / 100)} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-serif text-4xl font-semibold tabular-nums">{pct}%</span>
      </div>
      <h2 className="mt-8 font-serif text-2xl font-semibold leading-snug">{t.loading.title}</h2>
      <ul className="mt-6 w-full max-w-xs space-y-2.5 text-left text-sm">
        {t.loading.steps.map((s, i) => {
          const ticked = pct >= (i + 1) * 25;
          return (
            <li key={s} className={`flex items-center gap-2.5 transition-opacity ${pct >= i * 25 ? "opacity-100" : "opacity-30"}`}>
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${ticked ? `${GOLD} text-primary-900` : "ring-1 ring-white/30"}`}>{ticked && <Check className="h-3 w-3" strokeWidth={3.5} />}</span>
              <span className={ticked ? "text-white" : "text-white/70"}>{s}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
