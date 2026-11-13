// Tiến độ người chơi: lưu trên máy (localStorage), không cần tài khoản.
import { RANKS } from "./icons.js";

const KEY = "soi-taiga.v1";
const blank = () => ({
  consent: false,
  lang: "vi",
  xp: 0,
  lessons: {},      // id → { seen: [stepIdx], done, stars, best }
  checks: {},       // stepId → [bool]
  drills: 0,
  drillDone: {},    // stepId → số lần
  days: [],         // ngày có tập (YYYY-MM-DD)
  plan: {},         // date → { lesson, drill, quiz }
  badges: [],
  settings: { voice: true, sfx: true, ambient: true, rate: 1, auto: false, pip: true },
  stats: { sec: 0 },
  name: "",
  last: null,       // { lesson, step }
});

let state = load();

function load() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const b = blank(), v = JSON.parse(raw);
      return { ...b, ...v, settings: { ...b.settings, ...(v.settings || {}) }, stats: { ...b.stats, ...(v.stats || {}) } };
    }
  } catch { /* trình duyệt chặn bộ nhớ: dùng tạm trong phiên */ }
  return blank();
}
export function addTime(sec) {
  state.stats ||= { sec: 0 };
  state.stats.sec += Math.round(sec);
  save();
}
export function save() {
  try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* bỏ qua */ }
}
export const S = () => state;
export function reset() { state = blank(); state.consent = true; save(); }

export const today = (d = new Date()) => {
  const z = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${z(d.getMonth() + 1)}-${z(d.getDate())}`;
};

export function rankOf(xp = state.xp) {
  let lvl = 0;
  RANKS.forEach((r, i) => { if (xp >= r.xp) lvl = i; });
  const cur = RANKS[lvl], nxt = RANKS[lvl + 1];
  return { lvl, cur, nxt, pct: nxt ? (xp - cur.xp) / (nxt.xp - cur.xp) : 1 };
}

export function streak() {
  const set = new Set(state.days);
  let n = 0;
  const d = new Date();
  if (!set.has(today(d))) d.setDate(d.getDate() - 1); // hôm nay chưa tập thì tính tới hôm qua
  while (set.has(today(d))) { n++; d.setDate(d.getDate() - 1); }
  return n;
}

// Mỗi lần có hoạt động tập luyện: ghi ngày, kiểm tra huy hiệu theo giờ / chuỗi.
function activity() {
  const t = today();
  if (!state.days.includes(t)) state.days.push(t);
  const h = new Date().getHours();
  const got = [];
  if (h < 7) got.push(...award("early"));
  if (h >= 21) got.push(...award("night"));
  const st = streak();
  if (st >= 3) got.push(...award("streak3"));
  if (st >= 7) got.push(...award("streak7"));
  return got;
}

export function award(id) {
  if (state.badges.includes(id)) return [];
  state.badges.push(id);
  return [id];
}

// Cộng XP, trả về { gained, rankUp, badges }
export function gain(xp, extraBadges = []) {
  const before = rankOf().lvl;
  state.xp += xp;
  const badges = [...activity(), ...extraBadges];
  const after = rankOf().lvl;
  save();
  return { gained: xp, rankUp: after > before ? after : null, badges };
}

export function lessonState(id) {
  return (state.lessons[id] ||= { seen: [], done: false, stars: 0, best: 0 });
}

export function markSeen(lessonId, idx) {
  const L = lessonState(lessonId);
  state.last = { lesson: lessonId, step: idx };
  if (L.seen.includes(idx)) { save(); return null; }
  L.seen.push(idx);
  return gain(10);
}

export function toggleCheck(stepId, i, n) {
  const arr = (state.checks[stepId] ||= Array(n).fill(false));
  arr[i] = !arr[i];
  save();
  return arr[i];
}

export function drillDone(stepId) {
  state.drills++;
  state.drillDone[stepId] = (state.drillDone[stepId] || 0) + 1;
  planTick("drill");
  const extra = state.drills >= 10 ? award("drill10") : [];
  return gain(15, extra);
}

export function quizDone(lesson, score, total) {
  const L = lessonState(lesson.id);
  const stars = score === total ? 3 : score >= total - 1 ? 2 : score >= Math.ceil(total / 2) ? 1 : 0;
  const pass = stars > 0;
  const firstClear = pass && !L.done;
  let xp = 0;
  if (pass) {
    xp = firstClear ? lesson.xp : Math.round(lesson.xp * 0.2);
    if (stars === 3 && L.stars < 3) xp += 50;
  }
  const extra = [];
  if (stars === 3) extra.push(...award("perfect"));
  if (pass) {
    L.done = true;
    L.stars = Math.max(L.stars, stars);
    if (lesson.id === "tk3") extra.push(...award("fall"));
    planTick("lesson");
  }
  L.best = Math.max(L.best, score);
  planTick("quiz");
  const res = gain(xp, extra);
  return { ...res, stars, pass, firstClear };
}

export function examDone(trackId, score, total) {
  const pass = score >= Math.ceil(total * 0.8);
  const first = pass && !state.badges.includes("grad");
  const extra = pass ? award("grad") : [];
  planTick("quiz");
  const res = gain(pass ? (first ? 300 : 30) : 0, extra);
  return { ...res, pass };
}

export function allChecksBadge(lesson) {
  const ok = lesson.steps.every((st) => (state.checks[st.id] || []).filter(Boolean).length === st.cues.length);
  if (ok) { const b = award("checks"); save(); return b; }
  return [];
}

export function trackBadge(lessons) {
  if (lessons.every((l) => state.lessons[l.id]?.done)) { const b = award("track"); save(); return b; }
  return [];
}

// Kế hoạch hôm nay: 1 bài học, 1 lượt tập theo, 1 bài kiểm tra.
export function plan() {
  return (state.plan[today()] ||= { lesson: false, drill: false, quiz: false });
}
function planTick(k) { plan()[k] = true; }

export function unlocked(lessons, idx) {
  return idx === 0 || !!state.lessons[lessons[idx - 1].id]?.done;
}
