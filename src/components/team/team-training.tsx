"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  BookOpen,
  CheckCircle2,
  Circle,
  Clock3,
  EyeOff,
  FlaskConical,
  GraduationCap,
  HeartHandshake,
  ImagePlus,
  Loader2,
  Pencil,
  Play,
  Plus,
  ScrollText,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Trash2,
  TrendingUp,
  X,
} from "lucide-react";
import { fill } from "@/lib/shop-strings";
import { TRAINING_CATEGORIES, teamStrings, youtubeId, type TeamStrings, type TrainingCategory } from "@/lib/team-strings";
import { mediaUrl } from "@/lib/team-media";
import {
  AttachmentGallery,
  AttachmentPicker,
  ConfirmDialog,
  PersonAvatar,
  RichText,
  Sheet,
  Toggle,
  uploadErrorText,
  uploadTeamMedia,
  useToast,
  type Member,
  type MediaRef,
} from "@/components/team/team-ui";

interface Lesson {
  id: string;
  title: string;
  summary: string | null;
  body: string | null;
  category: TrainingCategory;
  videoUrl: string | null;
  coverMediaId: string | null;
  attachments: MediaRef[];
  required: boolean;
  minutes: number | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  myProgress: { viewedAt: string; completedAt: string | null } | null;
  progress?: { userId: string; viewedAt: string; completedAt: string | null }[];
}

interface Data {
  me: string;
  isOwner: boolean;
  members: Member[];
  lessons: Lesson[];
}

const CATEGORY: Record<TrainingCategory, { icon: typeof Sparkles; grad: string }> = {
  SERVICE: { icon: Sparkles, grad: "from-[#624f89] via-[#40325c] to-[#1f182d]" },
  HYGIENE: { icon: ShieldCheck, grad: "from-[#1aa3ab] via-[#02646b] to-[#013a3e]" },
  CUSTOMER: { icon: HeartHandshake, grad: "from-[#e47e97] via-[#c6274d] to-[#7a1730]" },
  PRODUCT: { icon: FlaskConical, grad: "from-[#e2c27d] via-[#b88a3a] to-[#7a5520]" },
  POLICY: { icon: ScrollText, grad: "from-[#5b6b6c] via-[#25302f] to-[#0d1718]" },
  SALES: { icon: TrendingUp, grad: "from-[#f6a07f] via-[#d54f2c] to-[#8a2f16]" },
  OTHER: { icon: BookOpen, grad: "from-[#9fb2a5] via-[#687b6e] to-[#3d4a41]" },
};

function coverOf(l: Pick<Lesson, "coverMediaId" | "videoUrl">) {
  if (l.coverMediaId) return mediaUrl(l.coverMediaId);
  const yt = youtubeId(l.videoUrl);
  return yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null;
}

export function TeamTraining({ locale, focusId }: { locale: string; focusId?: string }) {
  const S = teamStrings(locale);
  const [data, setData] = useState<Data | null>(null);
  const [cat, setCat] = useState<TrainingCategory | "ALL">("ALL");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(focusId ?? null);
  const [editing, setEditing] = useState<Lesson | "new" | null>(null);
  const [confirm, setConfirm] = useState<Lesson | null>(null);
  const [toast, setToast] = useToast();

  const load = useCallback(async () => {
    const res = await fetch("/api/business/team/training").catch(() => null);
    if (res?.ok) setData(await res.json());
  }, []);
  useEffect(() => {
    load();
  }, [load]);

  const setProgress = useCallback(async (id: string, completed?: boolean) => {
    const res = await fetch(`/api/business/team/training/${id}/progress`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(completed === undefined ? {} : { completed }),
    }).catch(() => null);
    if (!res?.ok) return;
    const p = await res.json();
    setData((d) => (d ? { ...d, lessons: d.lessons.map((l) => (l.id === id ? { ...l, myProgress: p } : l)) } : d));
  }, []);

  function openLesson(id: string) {
    setOpen(id);
    const url = new URL(window.location.href);
    url.searchParams.set("l", id);
    window.history.replaceState(null, "", url.toString());
    if (data && !data.isOwner) setProgress(id);
  }
  function closeLesson() {
    setOpen(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("l");
    window.history.replaceState(null, "", url.toString());
  }

  // A lesson opened from a push link counts as seen.
  const markedFocus = useRef(false);
  useEffect(() => {
    if (focusId && data && !data.isOwner && !markedFocus.current) {
      markedFocus.current = true;
      setProgress(focusId);
    }
  }, [focusId, data, setProgress]);

  const staff = (data?.members ?? []).filter((m) => !m.isOwner);
  const lessons = data?.lessons ?? [];
  const published = lessons.filter((l) => l.published);
  const doneCount = published.filter((l) => l.myProgress?.completedAt).length;
  const requiredLeft = published.filter((l) => l.required && !l.myProgress?.completedAt).length;
  const shown = lessons.filter(
    (l) =>
      (cat === "ALL" || l.category === cat) &&
      (!q.trim() || `${l.title} ${l.summary ?? ""}`.toLowerCase().includes(q.trim().toLowerCase()))
  );
  const usedCats = TRAINING_CATEGORIES.filter((c) => lessons.some((l) => l.category === c));
  const current = lessons.find((l) => l.id === open) ?? null;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-serif text-2xl text-ink-900 sm:text-3xl">{S.trainingTitle}</h2>
          <p className="mt-1 max-w-xl text-sm text-ink-400">{S.trainingSub}</p>
        </div>
        {data?.isOwner && (
          <button
            type="button"
            onClick={() => setEditing("new")}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#40325c] to-[#1f182d] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#1f182d]/25 transition hover:-translate-y-0.5"
          >
            <Plus className="h-4 w-4" />
            {S.newLesson}
          </button>
        )}
      </div>

      {/* Progress */}
      {data && published.length > 0 && (
        <section className="relative overflow-hidden rounded-[1.75rem] bg-[#1f182d] p-5 text-white sm:p-6">
          <div className="pointer-events-none absolute -right-16 -top-20 h-60 w-60 rounded-full bg-[#624f89]/50 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 left-1/4 h-56 w-56 rounded-full bg-[#c99a3f]/20 blur-3xl" />
          {data.isOwner ? (
            <div className="relative">
              <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[#e8d3a6]">
                <GraduationCap className="h-4 w-4" />
                {S.teamProgress}
              </p>
              {staff.length === 0 ? (
                <p className="mt-3 text-sm text-white/60">{fill(S.lessonsN, { n: published.length })}</p>
              ) : (
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {staff.map((m) => {
                    const done = published.filter((l) => l.progress?.some((p) => p.userId === m.userId && p.completedAt)).length;
                    const req = published.filter((l) => l.required);
                    const reqDone = req.filter((l) => l.progress?.some((p) => p.userId === m.userId && p.completedAt)).length;
                    return (
                      <li key={m.userId} className="flex items-center gap-3 rounded-2xl bg-white/[0.06] p-3 ring-1 ring-white/10">
                        <PersonAvatar id={m.userId} name={m.name} url={m.avatarUrl} size={36} />
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center justify-between gap-2 text-sm font-semibold">
                            <span className="truncate">{m.name}</span>
                            <span className="shrink-0 text-xs tabular-nums text-[#e8d3a6]">
                              {done}/{published.length}
                            </span>
                          </p>
                          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white/10">
                            <div className="h-full rounded-full bg-gradient-to-r from-[#e2c27d] to-[#c99a3f]" style={{ width: `${(done / published.length) * 100}%` }} />
                          </div>
                          {req.length > 0 && reqDone < req.length && (
                            <p className="mt-1 text-[10px] font-semibold text-[#f6b4c4]">{fill(S.requiredLeftN, { n: req.length - reqDone })}</p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ) : (
            <div className="relative flex items-center gap-5">
              <Ring value={doneCount / published.length} />
              <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#e8d3a6]">{S.yourProgress}</p>
                <p className="mt-1 font-serif text-2xl">{fill(S.progressSub, { done: doneCount, total: published.length })}</p>
                <p className={`mt-1 text-xs font-semibold ${requiredLeft ? "text-[#f6b4c4]" : "text-emerald-300"}`}>
                  {requiredLeft ? fill(S.requiredLeftN, { n: requiredLeft }) : doneCount === published.length ? S.allDone : ""}
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* Search & topics */}
      {lessons.length > 0 && (
        <div className="space-y-3">
          <label className="flex items-center gap-2 rounded-full bg-white px-4 py-2.5 ring-1 ring-ink-100 focus-within:ring-[#c99a3f]">
            <Search className="h-4 w-4 text-ink-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.searchLessons} className="min-w-0 flex-1 bg-transparent text-sm outline-none" />
          </label>
          {usedCats.length > 1 && (
            <div className="flex gap-1.5 overflow-x-auto pb-1">
              {(["ALL", ...usedCats] as const).map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCat(c)}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-bold transition ${
                    cat === c ? "bg-[#1f182d] text-white shadow" : "bg-white text-ink-700 ring-1 ring-ink-100 hover:bg-mist-50"
                  }`}
                >
                  {c !== "ALL" && (() => {
                    const Icon = CATEGORY[c].icon;
                    return <Icon className="h-3.5 w-3.5" />;
                  })()}
                  {c === "ALL" ? S.catAll : S[`cat_${c}`]}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!data ? (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-72 animate-pulse rounded-[1.75rem] bg-white ring-1 ring-ink-100" />
          ))}
        </div>
      ) : lessons.length === 0 ? (
        <div className="flex flex-col items-center rounded-[1.75rem] border border-dashed border-[#d8c49a] bg-[#fffaf0] px-6 py-14 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-[#2f2544] to-[#120d1b] text-[#e8d3a6] shadow-lg">
            <GraduationCap className="h-7 w-7" />
          </span>
          <p className="mt-4 max-w-sm text-sm font-semibold text-[#6b5221]">{data.isOwner ? S.noLessonsOwner : S.noLessonsStaff}</p>
        </div>
      ) : shown.length === 0 ? (
        <p className="py-10 text-center text-sm text-ink-400">{S.noResults}</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {shown.map((l) => (
            <LessonCard key={l.id} l={l} S={S} isOwner={data.isOwner} staffCount={staff.length} onOpen={() => openLesson(l.id)} />
          ))}
        </div>
      )}

      {current && data && (
        <LessonDetail
          l={current}
          S={S}
          locale={locale}
          isOwner={data.isOwner}
          staff={staff}
          onClose={closeLesson}
          onDone={async (done) => {
            await setProgress(current.id, done);
            if (done) setToast(S.lessonDoneToast);
          }}
          onEdit={() => setEditing(current)}
          onDelete={() => setConfirm(current)}
        />
      )}
      {editing && (
        <LessonEditor
          S={S}
          initial={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onError={setToast}
          onSaved={() => {
            setEditing(null);
            setToast(S.lessonSavedToast);
            load();
          }}
        />
      )}
      {confirm && (
        <ConfirmDialog
          text={S.deleteLessonConfirm}
          confirmLabel={S.deleteLesson}
          cancelLabel={S.cancel}
          onClose={() => setConfirm(null)}
          onConfirm={async () => {
            await fetch(`/api/business/team/training/${confirm.id}`, { method: "DELETE" }).catch(() => null);
            closeLesson();
            load();
          }}
        />
      )}
      {toast}
    </div>
  );
}

function Ring({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  return (
    <div className="relative h-20 w-20 shrink-0">
      <svg viewBox="0 0 40 40" className="h-full w-full -rotate-90">
        <defs>
          <linearGradient id="ring-gold" x1="0" x2="1">
            <stop offset="0" stopColor="#e8d3a6" />
            <stop offset="1" stopColor="#c99a3f" />
          </linearGradient>
        </defs>
        <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
        <circle cx="20" cy="20" r="16" fill="none" stroke="url(#ring-gold)" strokeWidth="4" strokeLinecap="round" strokeDasharray={`${value * 100.5} 100.5`} />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-lg font-bold tabular-nums">{pct}%</span>
    </div>
  );
}

function LessonCard({ l, S, isOwner, staffCount, onOpen }: { l: Lesson; S: TeamStrings; isOwner: boolean; staffCount: number; onOpen: () => void }) {
  const cover = coverOf(l);
  const Icon = CATEGORY[l.category].icon;
  const done = !!l.myProgress?.completedAt;
  const completed = (l.progress ?? []).filter((p) => p.completedAt).length;
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white text-left shadow-[0_18px_50px_-34px_rgba(31,24,45,0.5)] ring-1 ring-ink-100 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(31,24,45,0.55)]"
    >
      <div className={`relative aspect-[16/9] overflow-hidden bg-gradient-to-br ${CATEGORY[l.category].grad}`}>
        {cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={cover} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center">
            <Icon className="h-14 w-14 text-white/25" />
          </span>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        {youtubeId(l.videoUrl) && (
          <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1f182d] shadow-xl transition group-hover:scale-110">
            <Play className="ml-0.5 h-5 w-5 fill-current" />
          </span>
        )}
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          {l.required && (
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#e2c27d] to-[#a8792b] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
              <Star className="h-3 w-3 fill-current" />
              {S.required}
            </span>
          )}
          {!l.published && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/60 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
              <EyeOff className="h-3 w-3" />
              {S.draft}
            </span>
          )}
        </div>
        {!isOwner && done && (
          <span className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
            <CheckCircle2 className="h-4 w-4" />
          </span>
        )}
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-bold text-[#1f182d] backdrop-blur">
          <Icon className="h-3 w-3" />
          {S[`cat_${l.category}`]}
        </span>
        {l.minutes && (
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-white">
            <Clock3 className="h-3 w-3" />
            {fill(S.minutesN, { n: l.minutes })}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 font-serif text-lg leading-snug text-ink-900">{l.title}</h3>
        {l.summary && <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-ink-400">{l.summary}</p>}
        <div className="mt-auto pt-3">
          {isOwner ? (
            staffCount > 0 && l.published ? (
              <div>
                <p className="mb-1 text-[11px] font-bold text-ink-500">{fill(S.doneN, { n: completed, total: staffCount })}</p>
                <div className="h-1.5 overflow-hidden rounded-full bg-ink-100">
                  <div className="h-full rounded-full bg-gradient-to-r from-[#8b76b9] to-[#40325c]" style={{ width: `${(completed / staffCount) * 100}%` }} />
                </div>
              </div>
            ) : null
          ) : (
            <p className={`flex items-center gap-1.5 text-xs font-bold ${done ? "text-emerald-600" : "text-[#a8792b]"}`}>
              {done ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
              {done ? S.done : S.openLesson}
            </p>
          )}
        </div>
      </div>
    </button>
  );
}

function LessonDetail({
  l,
  S,
  locale,
  isOwner,
  staff,
  onClose,
  onDone,
  onEdit,
  onDelete,
}: {
  l: Lesson;
  S: TeamStrings;
  locale: string;
  isOwner: boolean;
  staff: Member[];
  onClose: () => void;
  onDone: (done: boolean) => Promise<void>;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const yt = youtubeId(l.videoUrl);
  const cover = l.coverMediaId ? mediaUrl(l.coverMediaId) : null;
  const done = !!l.myProgress?.completedAt;
  const Icon = CATEGORY[l.category].icon;
  const progress = new Map((l.progress ?? []).map((p) => [p.userId, p]));
  const stamp = (iso: string) => new Date(iso).toLocaleDateString(locale, { day: "numeric", month: "short", year: "numeric" });

  return (
    <Sheet title={S[`cat_${l.category}`]} onClose={onClose} wide>
      {yt ? (
        <div className="aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${yt}?rel=0&modestbranding=1`}
            title={l.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      ) : cover ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={cover} alt="" className="aspect-[16/9] w-full object-cover" />
      ) : (
        <div className={`flex aspect-[21/9] items-center justify-center bg-gradient-to-br ${CATEGORY[l.category].grad}`}>
          <Icon className="h-16 w-16 text-white/30" />
        </div>
      )}

      <div className="space-y-5 p-5 sm:p-6">
        <div>
          <div className="flex flex-wrap items-center gap-1.5">
            {l.required && (
              <span className="inline-flex items-center gap-1 rounded-full bg-[#fbf1dc] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[#8a6a2c]">
                <Star className="h-3 w-3 fill-current" />
                {S.required}
              </span>
            )}
            {l.minutes && (
              <span className="inline-flex items-center gap-1 rounded-full bg-mist-50 px-2.5 py-1 text-[10px] font-bold text-ink-500">
                <Clock3 className="h-3 w-3" />
                {fill(S.minutesN, { n: l.minutes })}
              </span>
            )}
            {!l.published && (
              <span className="inline-flex items-center gap-1 rounded-full bg-ink-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                <EyeOff className="h-3 w-3" />
                {S.draft}
              </span>
            )}
          </div>
          <h2 className="mt-3 font-serif text-2xl leading-tight text-ink-900 sm:text-3xl">{l.title}</h2>
          {l.summary && <p className="mt-2 text-sm leading-relaxed text-ink-500">{l.summary}</p>}
        </div>

        {l.body && (
          <div className="rounded-2xl bg-white p-4 text-[15px] leading-relaxed text-ink-700 ring-1 ring-ink-100 sm:p-5">
            <RichText text={l.body} />
          </div>
        )}

        {l.attachments.length > 0 && (
          <div>
            <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.materials}</p>
            <AttachmentGallery attachments={l.attachments} S={S} />
          </div>
        )}

        {!isOwner && (
          <button
            type="button"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await onDone(!done);
              setBusy(false);
            }}
            className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition ${
              done
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 hover:bg-emerald-100"
                : "bg-gradient-to-r from-[#c99a3f] to-[#a8792b] text-white shadow-lg shadow-[#a8792b]/25 hover:brightness-105"
            }`}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle2 className="h-4 w-4" />}
            {done ? `${S.done} · ${S.undoDone}` : S.markDone}
          </button>
        )}

        {isOwner && (
          <>
            {staff.length > 0 && l.published && (
              <div className="rounded-2xl bg-[#fbfaf8] p-4 ring-1 ring-ink-100">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-wider text-ink-400">{S.teamProgress}</p>
                <ul className="space-y-1.5">
                  {staff.map((m) => {
                    const p = progress.get(m.userId);
                    return (
                      <li key={m.userId} className="flex items-center gap-3">
                        <PersonAvatar id={m.userId} name={m.name} url={m.avatarUrl} size={30} />
                        <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink-900">{m.name}</span>
                        <span
                          suppressHydrationWarning
                          className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold ${
                            p?.completedAt ? "bg-emerald-50 text-emerald-700" : p ? "bg-[#f4f1fa] text-[#40325c]" : "bg-mist-50 text-ink-400"
                          }`}
                        >
                          {p?.completedAt ? fill(S.completedAt, { time: stamp(p.completedAt) }) : p ? S.viewed : S.notStarted}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={onEdit} className="flex items-center justify-center gap-2 rounded-full bg-[#1f182d] py-3 text-sm font-bold text-white">
                <Pencil className="h-4 w-4" />
                {S.editLesson}
              </button>
              <button type="button" onClick={onDelete} className="flex items-center justify-center gap-2 rounded-full bg-berry-50 py-3 text-sm font-bold text-berry-600 hover:bg-berry-100">
                <Trash2 className="h-4 w-4" />
                {S.deleteLesson}
              </button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}

function LessonEditor({
  S,
  initial,
  onClose,
  onSaved,
  onError,
}: {
  S: TeamStrings;
  initial: Lesson | null;
  onClose: () => void;
  onSaved: () => void;
  onError: (msg: string) => void;
}) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [summary, setSummary] = useState(initial?.summary ?? "");
  const [body, setBody] = useState(initial?.body ?? "");
  const [category, setCategory] = useState<TrainingCategory>(initial?.category ?? "SERVICE");
  const [videoUrl, setVideoUrl] = useState(initial?.videoUrl ?? "");
  const [cover, setCover] = useState<string | null>(initial?.coverMediaId ?? null);
  const [coverBusy, setCoverBusy] = useState<number | null>(null);
  const [attachments, setAttachments] = useState<MediaRef[]>(initial?.attachments ?? []);
  const [required, setRequired] = useState(initial?.required ?? false);
  const [minutes, setMinutes] = useState(initial?.minutes ? String(initial.minutes) : "");
  const [published, setPublished] = useState(initial?.published ?? true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const coverInput = useRef<HTMLInputElement>(null);

  async function save() {
    if (!title.trim()) return setError(S.errTitle);
    if (videoUrl.trim() && !youtubeId(videoUrl)) return setError(S.errVideo);
    setBusy(true);
    setError(null);
    const res = await fetch(initial ? `/api/business/team/training/${initial.id}` : "/api/business/team/training", {
      method: initial ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        summary: summary.trim() || null,
        body: body.trim() || null,
        category,
        videoUrl: videoUrl.trim() || null,
        coverMediaId: cover,
        attachmentIds: attachments.map((a) => a.mediaId),
        required,
        minutes: minutes ? Math.max(1, Math.min(600, Number(minutes) || 0)) || null : null,
        published,
      }),
    }).catch(() => null);
    setBusy(false);
    if (!res?.ok) return setError(S.errSave);
    onSaved();
  }

  const label = "mb-2 block text-[11px] font-bold uppercase tracking-wider text-ink-400";
  const field = "w-full rounded-2xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-900 outline-none placeholder:text-ink-300 focus:border-[#c99a3f]";

  return (
    <Sheet title={initial ? S.editLesson : S.newLesson} onClose={onClose} wide>
      <div className="space-y-5 p-5">
        {/* Cover */}
        <div className={`relative aspect-[16/7] overflow-hidden rounded-2xl bg-gradient-to-br ${CATEGORY[category].grad}`}>
          {cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={mediaUrl(cover)} alt="" className="h-full w-full object-cover" />
          ) : youtubeId(videoUrl) ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={`https://i.ytimg.com/vi/${youtubeId(videoUrl)}/hqdefault.jpg`} alt="" className="h-full w-full object-cover" />
          ) : null}
          <div className="absolute inset-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/50 to-transparent p-3">
            <button
              type="button"
              onClick={() => coverInput.current?.click()}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-2 text-xs font-bold text-[#1f182d] shadow"
            >
              {coverBusy !== null ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <ImagePlus className="h-3.5 w-3.5" />}
              {coverBusy !== null ? `${coverBusy}%` : S.addCover}
            </button>
            {cover && (
              <button type="button" onClick={() => setCover(null)} className="inline-flex items-center gap-1 rounded-full bg-black/60 px-3 py-2 text-xs font-bold text-white">
                <X className="h-3.5 w-3.5" />
                {S.removeCover}
              </button>
            )}
          </div>
          <input
            ref={coverInput}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              e.target.value = "";
              if (!file) return;
              setCoverBusy(0);
              try {
                const m = await uploadTeamMedia(file, setCoverBusy);
                setCover(m.id);
              } catch (err) {
                onError(uploadErrorText(err, S, "IMAGE"));
              }
              setCoverBusy(null);
            }}
          />
        </div>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={160}
          placeholder={S.lessonTitlePh}
          className="w-full border-0 border-b border-ink-100 bg-transparent pb-3 font-serif text-2xl text-ink-900 outline-none placeholder:text-ink-300 focus:border-[#c99a3f]"
        />
        <input value={summary} onChange={(e) => setSummary(e.target.value)} maxLength={400} placeholder={S.summaryPh} className={field} />

        <div>
          <span className={label}>{S.category}</span>
          <div className="flex flex-wrap gap-1.5">
            {TRAINING_CATEGORIES.map((c) => {
              const Icon = CATEGORY[c].icon;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCategory(c)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold ring-1 transition ${
                    category === c ? "bg-[#1f182d] text-white ring-[#1f182d]" : "bg-white text-ink-700 ring-ink-100 hover:bg-mist-50"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {S[`cat_${c}`]}
                </button>
              );
            })}
          </div>
        </div>

        <label className="block">
          <span className={label}>{S.videoUrl}</span>
          <input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder={S.videoUrlPh} className={field} />
        </label>

        <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} placeholder={S.bodyPh} className={`${field} resize-y leading-relaxed`} />

        <div>
          <span className={label}>{S.materials}</span>
          <AttachmentPicker value={attachments} onChange={setAttachments} S={S} onError={onError} label={S.addMaterials} />
        </div>

        <div className="space-y-4 rounded-2xl bg-white p-4 ring-1 ring-ink-100">
          <Toggle on={required} onChange={setRequired} label={S.required} hint={S.requiredHint} />
          <div className="border-t border-ink-100" />
          <Toggle on={published} onChange={setPublished} label={S.publishedLbl} hint={S.publishedHint} />
          <div className="border-t border-ink-100" />
          <label className="flex items-center justify-between gap-3">
            <span className="text-sm font-semibold text-ink-900">{S.minutes}</span>
            <input
              type="number"
              inputMode="numeric"
              min={1}
              max={600}
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="h-10 w-24 rounded-xl border border-ink-100 px-3 text-right text-sm font-semibold outline-none focus:border-[#c99a3f]"
            />
          </label>
        </div>

        {error && <p className="rounded-xl bg-berry-50 px-3 py-2 text-xs font-semibold text-berry-600">{error}</p>}
        <button
          type="button"
          disabled={busy || coverBusy !== null}
          onClick={save}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-[#40325c] to-[#1f182d] py-3.5 text-sm font-bold text-white shadow-lg shadow-[#1f182d]/25 disabled:opacity-50"
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <GraduationCap className="h-4 w-4" />}
          {S.saveLesson}
        </button>
      </div>
    </Sheet>
  );
}
