// Sói Taiga – Võ đặc công thực chiến. Ứng dụng một trang, không cần máy chủ.
import * as A from "./audio.js";
import * as St from "./store.js";
import { I, LOGO, RANKS, insignia, medal, ring } from "./icons.js";
import { t, setLang, L } from "./i18n.js";

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const app = $("#app");
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

const D = { tracks: [], covers: {}, lessons: {}, order: {}, text: {}, sync: new Set() };
let cleanup = [];               // việc dọn dẹp khi rời màn hình
let pendingSpeech = null;       // lời thoại chờ người dùng chạm lần đầu
let routeId = 0;

// ---------------------------------------------------------------- khởi động
async function boot() {
  setLang(St.S().lang);
  const lang = L();
  const get = (u) => fetch(u).then((r) => { if (!r.ok) throw new Error(u); return r.json(); });
  const [manifest, lines, cat] = await Promise.all([
    get(`assets/voice/${lang}/manifest.json`).catch(() => ({})),
    get(`content/lines-${lang}.json`),
    get(`content/tracks-${lang}.json`),
  ]);
  D.tracks = cat.tracks;
  D.covers = cat.covers;
  Object.assign(D.text, lines);
  for (const tr of D.tracks.filter((x) => x.file)) {
    const data = await get(`content/${tr.file}`);
    D.order[tr.id] = data.lessons;
    data.lessons.forEach((l, i) => {
      l.track = tr.id; l.no = i + 1;
      D.lessons[l.id] = l;
      D.text[`${l.id}-intro`] = l.intro;
      D.text[`${l.id}-outro`] = l.outro;
      l.steps.forEach((s) => { D.text[s.id] = s.say; });
      l.quiz.forEach((q, k) => { D.text[`${l.id}-q${k}`] = q.q; D.text[`${l.id}-w${k}`] = q.why; });
    });
  }
  // video thầy nói khớp khẩu hình (Kie.ai InfiniTalk), có thì dùng, không có thì dùng clip "đang nói"
  try { (await get(`assets/video/sync/${lang}/index.json`)).forEach((k) => D.sync.add(k)); } catch { /* chưa có */ }
  A.setup(manifest, `assets/voice/${lang}/`);
  A.configure(St.S().settings);
  A.onSpeak(setTalking);
  window.addEventListener("hashchange", route);
  buildTabbar();
  route();
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("sw.js").catch(() => {});
  }
}

// ---------------------------------------------------------------- điều hướng
function go(hash) { if (location.hash === hash) route(); else location.hash = hash; }

function route() {
  routeId++;
  A.stop();
  cleanup.forEach((fn) => { try { fn(); } catch { /* bỏ qua */ } });
  cleanup = [];
  pendingSpeech = null;
  $("#overlay").innerHTML = "";
  const parts = location.hash.replace(/^#\/?/, "").split("/").filter(Boolean);
  const [name, a, b] = parts;
  if (!St.S().consent) return screenStart();
  const map = {
    home: () => screenHome(),
    track: () => screenTrack(a),
    lesson: () => screenLesson(a),
    play: () => screenPlay(a, +b || 0),
    quiz: () => screenQuiz(a),
    exam: () => screenExam(a),
    drills: () => screenDrills(),
    me: () => screenMe(),
  };
  (map[name] || map.home)();
  window.scrollTo(0, 0);
  if (!A.isUnlocked()) showTapGate();
}

function render(html, { tab = null } = {}) {
  app.innerHTML = `<div class="screen">${html}</div>`;
  app.classList.toggle("no-tab", !tab);
  const bar = $("#tabbar");
  bar.hidden = !tab;
  $$("button", bar).forEach((btn) => btn.classList.toggle("on", btn.dataset.tab === tab));
}

function buildTabbar() {
  const tabs = [["home", I.home, t("tabHome")], ["track/tay-khong", I.map, t("tabMap")], ["drills", I.bolt, t("tabDrill")], ["me", I.user, t("tabMe")]];
  $("#tabbar").innerHTML = tabs.map(([h, ic, lb]) => `<button data-tab="${h.split("/")[0]}" data-go="#/${h}">${ic}<span>${lb}</span></button>`).join("");
}

// Chạm vào bất cứ phần tử nào có data-go để chuyển màn hình.
document.addEventListener("click", (e) => {
  const el = e.target.closest("[data-go]");
  if (el) { A.sfx("tap"); go(el.dataset.go); }
});

// Lần đầu mở (hoặc tải lại trang): trình duyệt chặn tiếng cho tới khi người dùng chạm một lần.
function showTapGate() {
  const g = document.createElement("div");
  g.className = "tapgate";
  g.innerHTML = `<div class="card">${LOGO.replace("<svg", '<svg class="logo"')}
    <h2 class="gold" style="letter-spacing:.16em">${t("brand")}</h2>
    <button class="btn block" id="tapgo">${I.play}${t("tapToEnter")}</button>
    <p class="fineprint">${t("tapHint")}</p></div>`;
  document.body.appendChild(g);
  $("#tapgo", g).focus();
  g.addEventListener("click", () => {
    A.unlock();
    A.sfx("drum");
    g.remove();
    if (pendingSpeech) { const fn = pendingSpeech; pendingSpeech = null; fn(); }
    $$(".coach.live video.idle").forEach((v) => v.play().catch(() => {}));
  }, { once: true });
}

// Chạy lời thoại khi đã được phép phát tiếng; nếu chưa, chờ cú chạm đầu tiên.
function whenReady(fn) {
  const my = routeId;
  const run = () => { if (my === routeId) fn(); };
  if (A.isUnlocked()) setTimeout(run, 350); else pendingSpeech = run;
}

// ---------------------------------------------------------------- thầy Alexei "sống"
function coachHTML({ cls = "", bubble = true } = {}) {
  // Lời thoại nằm DƯỚI video (không đè lên mặt thầy).
  return `<div class="coachbox">
    <div class="coach live ${cls}" style="background-image:url(assets/img/coach.webp)">
      <video class="idle" src="assets/video/coach-idle.mp4" poster="assets/img/coach-idle.webp" muted loop playsinline autoplay preload="auto"></video>
      <video class="talk off" src="assets/video/coach-talk.mp4" muted loop playsinline preload="auto"></video>
    </div>
    ${bubble ? `<div class="speech idle"><div class="who">${t("coach")} <span class="eq"><i></i><i></i><i></i></span></div><div class="line"></div></div>` : ""}
  </div>`;
}
function setTalking(on, key) {
  const syncSrc = on && key && D.sync.has(key) ? `assets/video/sync/${L()}/${key}.mp4` : null;
  $$(".coach.live").forEach((c) => {
    const talk = $("video.talk", c), idle = $("video.idle", c);
    if (!talk) return;
    let sync = $("video.sync", c);
    if (syncSrc) {
      if (!sync) {
        sync = document.createElement("video");
        Object.assign(sync, { muted: true, playsInline: true, preload: "auto" });
        sync.className = "sync off";
        c.appendChild(sync);
      }
      sync.src = syncSrc;
      sync.playbackRate = A.rate();
      sync.oncanplay = () => { sync.classList.remove("off"); talk.classList.add("off"); };
      sync.onended = () => { sync.classList.add("off"); };
      sync.play().catch(() => {});
      talk.classList.add("off");
      talk.play().catch(() => {});
      talk.classList.remove("off");
    } else if (on) {
      if (sync) { sync.pause(); sync.classList.add("off"); }
      talk.play().catch(() => {}); talk.classList.remove("off");
    } else {
      talk.classList.add("off");
      if (sync) { sync.pause(); sync.classList.add("off"); }
      idle?.play().catch(() => {});
    }
    $(".eq", c.parentElement)?.style.setProperty("visibility", on ? "visible" : "hidden");
  });
}

const sentences = (text) => text.match(/[^.!?:]+[.!?:]*\s*/g) || [text];

// Thầy nói câu `key`, phụ đề chạy theo từng câu trong ô `box` (nếu có).
function speak(key, box, cap) {
  const text = D.text[key] || "";
  const parts = sentences(text);
  const weights = parts.map((p) => p.length);
  const total = weights.reduce((x, y) => x + y, 0) || 1;
  if (box) {
    box.closest(".speech")?.classList.remove("idle");
    box.innerHTML = parts.map((p, i) => `<span class="s" data-i="${i}">${esc(p)}</span>`).join("");
  }
  let lastIdx = -1;
  return A.say(key, (tm, dur) => {
    if (!box) return;
    const pos = (tm / (dur || 1)) * total;
    let acc = 0, idx = parts.length - 1;
    for (let i = 0; i < parts.length; i++) { acc += weights[i]; if (pos < acc) { idx = i; break; } }
    if (idx === lastIdx) return;
    lastIdx = idx;
    $$(".s", box).forEach((s, i) => { s.className = `s ${i < idx ? "past" : i === idx ? "now" : ""}`; });
    if (cap) cap.textContent = parts[idx];
  });
}
// Lời thoại ngắn trong bong bóng của thầy (chỉ hiện câu đang nói).
function bubbleSay(key, root = app) {
  const line = $(".speech .line", root);
  return speak(key, line);
}

function toast(msg) {
  const el = $("#toast");
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove("show"), 2600);
}
function rewardToast(res) {
  if (!res) return;
  if (res.gained) toast(t("gained", res.gained));
  if (res.rankUp != null) setTimeout(() => toast(`${t("rankUp")} ${rankName(res.rankUp)}`), 1400);
  (res.badges || []).forEach((b, i) => setTimeout(() => toast(`${t("newBadge")}: ${t("badges")[b][0]}`), 2800 + i * 1500));
}
const rankName = (lvl) => t("ranks")[RANKS[lvl].id];

// ---------------------------------------------------------------- màn mở đầu
function screenStart() {
  render(`<section class="start">
    <div class="hero">${coachHTML({ bubble: false })}
      <div class="logo">${LOGO}<h1>${t("brand")}</h1><p>${t("tagline")}</p></div>
    </div>
    <div class="panel">
      <div class="card speech-card" style="position:relative;padding:0;min-height:0">
        <div class="speech idle" style="position:static"><div class="who">${t("coach")} <span class="eq"><i></i><i></i><i></i></span></div><div class="line"></div></div>
      </div>
      <div class="card consent">
        <label class="check"><input type="checkbox" id="c1"><span>${t("consentAge")}</span></label>
        <label class="check"><input type="checkbox" id="c2"><span>${t("consentSafe")}</span></label>
      </div>
      <button class="btn block" id="startBtn" disabled>${I.play}${t("start")}</button>
      <p class="fineprint">${t("disclaimer")}</p>
    </div>
  </section>`);
  const btn = $("#startBtn");
  const upd = () => { btn.disabled = !($("#c1").checked && $("#c2").checked); };
  $("#c1").onchange = upd; $("#c2").onchange = upd;
  btn.onclick = () => {
    if (btn.dataset.stage === "enter") { St.S().consent = true; St.save(); go("#/home"); return; }
    A.unlock();
    A.sfx("drum");
    $(".consent").style.display = "none";
    btn.dataset.stage = "enter";
    btn.innerHTML = `${t("enter")} ${I.next}`;
    St.S().consent = true; St.save();
    playWelcome();
  };
  // Màn hình rộng: logo nằm trong cột bên phải
  if (matchMedia("(min-width: 900px)").matches) $(".panel").prepend($(".start .logo"));
}

// Đổi thành true khi có assets/video/welcome-sync.mp4 (video thầy chào, khớp khẩu hình với giọng).
const HAS_WELCOME_SYNC = false;
function playWelcome() {
  const hero = $(".start .coach");
  const line = $(".speech-card .line");
  // Có video khớp khẩu hình thì phát cùng lúc với giọng; không có (hoặc tải chậm) thì dùng clip "đang nói".
  const sync = document.createElement("video");
  Object.assign(sync, { muted: true, playsInline: true, preload: "auto" });
  sync.className = "off";
  let started = false;
  const begin = (useSync) => {
    if (started) return;
    started = true;
    if (useSync) {
      hero.classList.remove("live");
      $$("video", hero).forEach((v) => v.classList.add("off"));
      sync.currentTime = 0;
      sync.classList.remove("off");
      sync.play().catch(() => {});
    } else sync.remove();
    speak("welcome", line).then(() => {
      if (!useSync) return;
      sync.classList.add("off");
      $("video.idle", hero)?.classList.remove("off");
      hero.classList.add("live");
    });
  };
  if (!HAS_WELCOME_SYNC) return begin(false);
  sync.addEventListener("canplaythrough", () => begin(true), { once: true });
  sync.addEventListener("error", () => begin(false), { once: true });
  setTimeout(() => begin(false), 1800);
  sync.src = "assets/video/welcome-sync.mp4";
  hero.appendChild(sync);
}

// ---------------------------------------------------------------- trang chủ
function nextLesson() {
  const ls = D.order["tay-khong"] || [];
  return ls.find((l, i) => St.unlocked(ls, i) && !St.S().lessons[l.id]?.done) || null;
}
function topbar({ back = null, title = "" } = {}) {
  const st = St.streak();
  const left = back
    ? `<button class="icon-btn" data-go="${back}" aria-label="Quay lại">${I.back}</button><div class="title">${title}</div>`
    : `<div class="brand">${LOGO}<div><b>${t("brand")}</b><small>${t("tagline")}</small></div></div>`;
  return `<header class="topbar">${left}<div class="stat-row">
      <span class="pill" title="Chuỗi ngày tập">${I.flame}${st}</span>
      <span class="pill">${I.spark}${St.S().xp}</span></div></header>`;
}

function screenHome() {
  const s = St.S();
  const r = St.rankOf();
  const nl = nextLesson();
  const p = St.plan();
  const lastDone = Object.keys(s.lessons).filter((k) => s.lessons[k].done).pop();
  const quizTarget = lastDone || nl?.id || "tk1";
  const ls = D.order["tay-khong"] || [];
  const doneN = ls.filter((l) => s.lessons[l.id]?.done).length;
  const planItem = (k, title, sub, href) => `<button class="plan-item ${p[k] ? "done" : ""}" data-go="${href}">
      <span class="tick">${p[k] ? I.check : ""}</span><span class="t">${title}<small>${sub}</small></span>${I.next}</button>`;
  render(`${topbar()}
    <div class="wrap home-grid">
      <div class="home-hero">${coachHTML()}</div>
      <div style="display:grid;gap:16px">
        <div class="card rankcard">${insignia(r.lvl)}
          <div class="info"><span class="eyebrow">${t("profile")}</span><b>${rankName(r.lvl)}</b>
            <div class="xpbar"><i style="width:${Math.round(r.pct * 100)}%"></i></div>
            <div class="xpbar-label"><span>${s.xp} ${t("xp")}</span><span>${r.nxt ? t("toNext", r.nxt.xp - s.xp, t("ranks")[r.nxt.id]) : t("maxRank")}</span></div>
          </div></div>
        ${nl ? `<button class="btn block" data-go="#/lesson/${nl.id}">${I.play}${t("continue")}: ${esc(nl.title)}</button>` : ""}
        <div>
          <div class="section-h"><h2>${t("todayPlan")}</h2><span class="muted">${["lesson", "drill", "quiz"].filter((k) => p[k]).length}/3</span></div>
          <div class="card plan">
            ${planItem("lesson", t("planLesson"), nl ? esc(nl.title) : t("planLessonSub"), nl ? `#/lesson/${nl.id}` : "#/track/tay-khong")}
            ${planItem("drill", t("planDrill"), t("planDrillSub"), "#/drills")}
            ${planItem("quiz", t("planQuiz"), esc(D.lessons[quizTarget]?.title || ""), `#/quiz/${quizTarget}`)}
          </div>
        </div>
        <div>
          <div class="section-h"><h2>${t("tracks")}</h2></div>
          <div class="tracks">${D.tracks.map((tr) => {
            const n = tr.open ? (D.order[tr.id] || []).length : tr.preview.length;
            const pct = tr.open ? doneN / (n || 1) : 0;
            return `<button class="track ${tr.open ? "" : "locked"}" data-go="#/track/${tr.id}" style="background-image:url(assets/img/${tr.cover})">
              ${tr.open ? ring(pct, 46, `${doneN}/${n}`) : `<span class="pill lockb chip-lock">${I.lock}${t("soon")}</span>`}
              <div class="tbody"><h3>${esc(tr.title)}</h3><span class="meta">${t("lessonsN", n)}</span></div></button>`;
          }).join("")}</div>
        </div>
      </div>
    </div>`, { tab: "home" });
  const allDone = ls.length && doneN === ls.length;
  const opts = ["home_1", "home_2", "home_3", "home_4"];
  const planDone = ["lesson", "drill", "quiz"].every((k) => p[k]);
  const key = planDone ? "plan_done" : !s.days.length && !doneN ? "home_1" : allDone ? "home_done" : St.streak() >= 2 && Math.random() < 0.5 ? "home_streak" : opts[Math.floor(Math.random() * opts.length)];
  whenReady(() => bubbleSay(key));
}

// ---------------------------------------------------------------- bản đồ kỹ năng của một nhánh
function screenTrack(id) {
  const tr = D.tracks.find((x) => x.id === id) || D.tracks[0];
  const s = St.S();
  let nodes;
  if (tr.open) {
    const ls = D.order[tr.id];
    const nl = nextLesson();
    nodes = ls.map((l, i) => {
      const ok = St.unlocked(ls, i);
      const st = s.lessons[l.id]?.stars || 0;
      const tier = l.tier !== ls[i - 1]?.tier ? `<div class="tier"><span>${l.tier === "adv" ? t("tierAdv") : t("tierBase")}</span></div>` : "";
      return `${tier}<button class="node ${i % 2 ? "r" : "l"} ${ok ? "" : "locked"} ${nl && nl.id === l.id ? "next" : ""}" data-next="${t("nextBadge")}" data-lesson="${l.id}" data-ok="${ok ? 1 : 0}">
        <span class="thumb" style="background-image:url(assets/img/kf/${D.covers[l.id] || l.steps[0].id}.webp)"><b>${l.no}</b></span>
        <span class="txt"><h3>${esc(l.title)}</h3><span class="sub">${esc(l.sub)}</span>
          <span class="stars">${[0, 1, 2].map((k) => I.star.replace("<svg", `<svg class="${k < st ? "on" : ""}"`)).join("")}${ok ? "" : `<span class="pill chip-lock" style="margin-left:6px;padding:2px 8px">${I.lock}${t("locked")}</span>`}</span>
        </span></button>`;
    }).join("");
    const allDone = ls.every((l) => s.lessons[l.id]?.done);
    const grad = s.badges.includes("grad");
    nodes += `<div class="tier"><span>${t("exam")}</span></div>
      <button class="node exam ${allDone ? "" : "locked"} ${allDone && !grad ? "next" : ""}" data-next="${t("nextBadge")}" data-exam="${tr.id}" data-ok="${allDone ? 1 : 0}">
        <span class="thumb medalthumb">${medal("grad")}</span>
        <span class="txt"><h3>${t("examTitle")}</h3><span class="sub">${t("examSub")}</span>
          <span class="stars">${grad ? `<span class="pill">${I.check}${t("badges").grad[0]}</span>` : allDone ? "" : `<span class="pill chip-lock" style="padding:2px 8px">${I.lock}${t("locked")}</span>`}</span></span></button>`;
  } else {
    nodes = tr.preview.map((p, i) => `<button class="node ${i % 2 ? "r" : "l"} locked" data-soon="1"><span class="thumb" style="background-image:url(assets/img/${tr.cover})"><b>${i + 1}</b></span>
      <span class="txt"><h3>${esc(p)}</h3><span class="stars"><span class="pill chip-lock" style="padding:2px 8px">${I.lock}${t("soon")}</span></span></span></button>`).join("");
  }
  render(`${topbar({ back: "#/home", title: `<span class="eyebrow">${t("tabMap")}</span><h1>${esc(tr.title)}</h1>` })}
    <div class="wrap track-layout">
      <div class="track-head">${coachHTML()}</div>
      <div><p class="muted" style="margin:8px 2px 4px">${esc(tr.sub)}</p><div class="path">${nodes}</div></div>
    </div>`, { tab: "track" });
  $$(".node").forEach((n) => n.addEventListener("click", () => {
    A.sfx("tap");
    if (n.dataset.soon) { toast(t("trackLockedToast")); return; }
    if (n.dataset.exam) {
      if (n.dataset.ok === "1") go(`#/exam/${n.dataset.exam}`); else { toast(t("examLockedToast")); bubbleSay("exam_locked"); }
      return;
    }
    if (n.dataset.ok === "1") go(`#/lesson/${n.dataset.lesson}`);
    else { toast(t("lessonLockedToast")); bubbleSay("lesson_locked"); }
  }));
  whenReady(() => bubbleSay(`track_${tr.id}`));
}

// ---------------------------------------------------------------- giới thiệu bài học
function screenLesson(id) {
  const l = D.lessons[id];
  if (!l) return go("#/home");
  const ls = D.order[l.track];
  if (!St.unlocked(ls, ls.indexOf(l))) { toast(t("lessonLockedToast")); return go(`#/track/${l.track}`); }
  const Ls = St.lessonState(id);
  render(`${topbar({ back: `#/track/${l.track}`, title: `<span class="eyebrow">Bài ${l.no}</span><h1>${esc(l.title)}</h1>` })}
    <div class="wrap lesson-intro">
      <div style="display:grid;gap:14px">
        <div class="cover" style="background-image:url(assets/img/kf/${D.covers[l.id] || l.steps[0].id}.webp)">
          <div class="ctext"><span class="eyebrow">Bài ${l.no} · ${esc(D.tracks.find((x) => x.id === l.track).title)}</span><h1>${esc(l.title)}</h1>
            <div class="facts"><span class="pill">${I.clock}${t("min", l.minutes)}</span><span class="pill">${I.list}${t("steps", l.steps.length)}</span><span class="pill">${I.target}${t("level", l.level)}</span><span class="pill">${I.spark}${l.xp} XP</span></div>
          </div></div>
        <div class="card" style="overflow:hidden">${coachHTML({ cls: "mini" })}</div>
      </div>
      <div style="display:grid;gap:14px">
        <div class="safety">${I.warn}<div><b>${t("safetyH")}:</b> ${esc(l.safety)}</div></div>
        <div class="card chapters"><div class="panel-h">${t("chapters")}</div>
          ${l.steps.map((st, i) => `<button class="chap" data-go="#/play/${l.id}/${i}"><img src="assets/img/kf/${st.id}.webp" alt="" loading="lazy"><span class="n ${Ls.seen.includes(i) ? "seen" : ""}">${i + 1}</span><span class="t">${esc(st.title)}</span>${I.next}</button>`).join("")}
          <button class="chap" data-go="#/quiz/${l.id}"><span class="n">${I.quiz}</span><span class="t">${t("toQuiz")}</span>${I.next}</button>
        </div>
        <button class="btn block" data-go="#/play/${l.id}/0">${I.play}${Ls.done ? t("review") : t("startLesson")}</button>
      </div>
    </div>`, { tab: null });
  $(".coach.mini").style.aspectRatio = "16 / 9";
  A.prefetch([l.steps[0].id]);
  whenReady(() => bubbleSay(`${l.id}-intro`));
}

// ---------------------------------------------------------------- trình phát từng bước
const view = { slow: false, mirror: false };
function screenPlay(id, idx) {
  const l = D.lessons[id];
  if (!l) return go("#/home");
  const ls = D.order[l.track];
  if (!St.unlocked(ls, ls.indexOf(l))) return go(`#/track/${l.track}`);
  idx = Math.max(0, Math.min(idx, l.steps.length - 1));
  const st = l.steps[idx];
  const Ls = St.lessonState(id);
  const checks = St.S().checks[st.id] || [];
  const last = idx === l.steps.length - 1;
  const d = st.drill;
  const drillLabel = d.type === "reps" ? t("reps", d.n) : d.type === "rounds" ? t("rounds", d.rounds, d.n) : t("secs", d.n);
  render(`${topbar({ back: `#/lesson/${l.id}`, title: `<span class="eyebrow">Bài ${l.no} · ${t("step")} ${idx + 1}/${l.steps.length}</span><h1>${esc(l.title)}</h1>` })}
    <div class="wrap player">
      <div class="left">
        <div class="stage">
          <video id="vid" src="assets/video/${st.id}.mp4" poster="assets/img/kf/${st.id}.webp" muted loop playsinline autoplay preload="auto" class="${view.mirror ? "mirror" : ""}"></video>
          <div class="slowtag" id="slowtag">0,5×</div>
          <div class="pip coach live ${St.S().settings.pip ? "" : "hide"}" style="background-image:url(assets/img/coach.webp)">
            <video class="idle" src="assets/video/coach-idle.mp4" muted loop playsinline autoplay preload="auto"></video>
            <video class="talk off" src="assets/video/coach-talk.mp4" muted loop playsinline preload="auto"></video>
          </div>
          <div class="cap" id="cap"></div>
          <div class="hud"><span class="badge-step">${t("step").toUpperCase()} ${idx + 1}/${l.steps.length}</span><span class="grow"></span>
            <button class="icon-btn ${view.slow ? "on" : ""}" id="bSlow" aria-label="${t("slow")}" title="${t("slow")}">${I.slow}</button>
            <button class="icon-btn ${view.mirror ? "on" : ""}" id="bMirror" aria-label="${t("mirror")}" title="${t("mirror")}">${I.mirror}</button></div>
          <div class="ctrl">
            <button class="icon-btn" id="bPlay" aria-label="Phát / dừng">${I.pause}</button>
            <button class="icon-btn" id="bReplay" aria-label="${t("replay")}" title="${t("replay")}">${I.replay}</button>
            <button class="icon-btn ${St.S().settings.pip ? "on" : ""}" id="bPip" aria-label="${t("pip")}" title="${t("pip")}">${I.user}</button>
            <button class="icon-btn" id="bFull" aria-label="${t("full")}" title="${t("full")}">${I.expand}</button>
          </div>
        </div>
        <div class="segs">${l.steps.map((_, i) => `<button data-go="#/play/${l.id}/${i}" class="${i === idx ? "cur" : Ls.seen.includes(i) ? "seen" : ""}" aria-label="${t("step")} ${i + 1}">${i === idx ? '<i id="segfill" style="width:0"></i>' : ""}</button>`).join("")}</div>
      </div>
      <div style="display:grid;gap:12px;align-content:start">
        <div class="step-title"><h2>${idx + 1}. ${esc(st.title)}</h2></div>
        <div class="card subtitle"><div class="who">${t("coach")} <span class="eq" style="visibility:hidden"><i></i><i></i><i></i></span><span class="grow"></span>
          <span class="rates">${[0.85, 1, 1.15].map((r) => `<button class="rate ${A.rate() === r ? "on" : ""}" data-rate="${r}">${String(r).replace(".", ",")}×</button>`).join("")}</span></div><div id="sub"></div></div>
        <label class="autorow"><span>${I.play}${t("autoPlay")}</span><button class="switch ${St.S().settings.auto ? "on" : ""}" id="bAuto" aria-label="${t("autoPlay")}"></button></label>
        <button class="btn ghost block" id="bDrill">${I.bolt}${t("practice")} · ${drillLabel}</button>
        <div class="card cues"><div class="panel-h">${t("cuesH")}</div>
          ${st.cues.map((c, i) => `<button class="cue ${checks[i] ? "on" : ""}" data-i="${i}"><span class="box"></span><span>${esc(c)}</span></button>`).join("")}</div>
        <details class="card mist"><summary>${I.warn}${t("mistakesH")}</summary><ul>${st.mistakes.map((m) => `<li>${esc(m)}</li>`).join("")}</ul></details>
        <div class="navrow">
          <button class="btn ghost" ${idx ? `data-go="#/play/${l.id}/${idx - 1}"` : "disabled"} aria-label="${t("prev")}">${I.back}</button>
          <button class="btn" id="bNext" data-go="${last ? `#/quiz/${l.id}` : `#/play/${l.id}/${idx + 1}`}">${last ? t("toQuiz") : t("next")} ${I.next}</button>
        </div>
      </div>
    </div>`, { tab: null });

  const vid = $("#vid");
  const applyView = () => {
    vid.playbackRate = view.slow ? 0.5 : 1;
    vid.classList.toggle("mirror", view.mirror);
    $("#bSlow").classList.toggle("on", view.slow);
    $("#bMirror").classList.toggle("on", view.mirror);
  };
  vid.addEventListener("loadedmetadata", applyView);
  vid.addEventListener("error", () => { vid.removeAttribute("src"); }, { once: true });
  applyView();
  $("#bSlow").onclick = () => {
    view.slow = !view.slow; applyView(); A.sfx("tap");
    const tag = $("#slowtag"); tag.textContent = view.slow ? "0,5×" : "1×"; tag.classList.add("show"); setTimeout(() => tag.classList.remove("show"), 700);
  };
  $("#bMirror").onclick = () => { view.mirror = !view.mirror; applyView(); A.sfx("tap"); };
  const bPlay = $("#bPlay");
  bPlay.onclick = () => { if (vid.paused) { vid.play().catch(() => {}); bPlay.innerHTML = I.pause; } else { vid.pause(); bPlay.innerHTML = I.play; } };
  $("#bReplay").onclick = () => narrate();
  const stage = $(".stage");
  $("#bPip").onclick = () => {
    const S = St.S().settings; S.pip = !S.pip; St.save(); A.sfx("tap");
    $(".pip", stage).classList.toggle("hide", !S.pip); $("#bPip").classList.toggle("on", S.pip);
  };
  const exitFull = () => { stage.classList.remove("full"); document.body.classList.remove("theater"); $("#bFull").innerHTML = I.expand; };
  $("#bFull").onclick = () => {
    A.sfx("tap");
    if (stage.classList.contains("full")) return exitFull();
    stage.classList.add("full"); document.body.classList.add("theater"); $("#bFull").innerHTML = I.close;
  };
  cleanup.push(exitFull);
  $$(".rate").forEach((b) => b.onclick = () => {
    const r = +b.dataset.rate; St.S().settings.rate = r; St.save(); A.configure(St.S().settings); A.sfx("tap");
    $$(".rate").forEach((x) => x.classList.toggle("on", x === b));
    narrate();
  });
  $("#bAuto").onclick = () => {
    const S = St.S().settings; S.auto = !S.auto; St.save(); A.sfx("tap");
    $("#bAuto").classList.toggle("on", S.auto);
    if (!S.auto) clearTimeout(autoT);
  };
  let autoT = 0;
  cleanup.push(() => clearTimeout(autoT));
  $$(".cue").forEach((c) => c.onclick = () => {
    const on = St.toggleCheck(st.id, +c.dataset.i, st.cues.length);
    c.classList.toggle("on", on); A.sfx(on ? "ok" : "tap");
    const b = St.allChecksBadge(l); if (b.length) toast(`${t("newBadge")}: ${t("badges")[b[0]][0]}`);
  });
  $("#bDrill").onclick = () => openDrill(st);

  const fill = $("#segfill");
  const sub = $("#sub");
  const eq = $(".subtitle .eq");
  const off = A.onSpeak((v) => { eq.style.visibility = v ? "visible" : "hidden"; });
  cleanup.push(off);
  const cap = $("#cap");
  async function narrate() {
    clearTimeout(autoT);
    const ok = await speak(st.id, sub, cap);
    if (fill) fill.style.width = "100%";
    if (ok) {
      St.addTime((A.durationOf(st.id) || 0) / 1000);
      const res = St.markSeen(l.id, idx);
      if (res) rewardToast(res);
      const nb = $("#bNext");
      nb?.classList.add("pulse");
      // Xem liên tục: tự sang bước sau sau một vòng clip
      if (St.S().settings.auto && nb) {
        let n = 4;
        const label = nb.innerHTML;
        const tick = () => {
          if (!St.S().settings.auto) { nb.innerHTML = label; return; }
          if (n <= 0) { nb.click(); return; }
          nb.innerHTML = `${t("autoIn", n)} ${I.next}`; n--;
          autoT = setTimeout(tick, 1000);
        };
        tick();
      }
    }
  }
  // thanh tiến độ của bước hiện tại chạy theo lời giảng
  const dur = A.durationOf(st.id) || 1;
  let t0 = 0;
  const offProg = A.onSpeak((v) => { if (v) t0 = performance.now(); });
  cleanup.push(offProg);
  const timer = setInterval(() => { if (t0 && fill) fill.style.width = `${Math.min(100, ((performance.now() - t0) / dur) * 100)}%`; }, 200);
  cleanup.push(() => clearInterval(timer));
  // phím tắt trên máy tính
  const onKey = (e) => {
    if (e.target.matches("input,textarea")) return;
    if (e.key === "ArrowRight") $("#bNext").click();
    if (e.key === "ArrowLeft" && idx) go(`#/play/${l.id}/${idx - 1}`);
    if (e.key === " ") { e.preventDefault(); bPlay.click(); }
  };
  document.addEventListener("keydown", onKey);
  cleanup.push(() => document.removeEventListener("keydown", onKey));
  // tải trước bước sau
  const nx = l.steps[idx + 1];
  if (nx) { A.prefetch([nx.id]); fetch(`assets/video/${nx.id}.mp4`).catch(() => {}); }
  whenReady(narrate);
}

// ---------------------------------------------------------------- tập theo thầy (đếm nhịp)
function openDrill(st) {
  A.stop();
  const d = st.drill;
  const ov = $("#overlay");
  const R = 54, C = 2 * Math.PI * R;
  ov.innerHTML = `<div class="modal-bg"><div class="card modal">
    <span class="eyebrow">${t("practice")}</span><h2>${esc(d.label)}</h2>
    <div class="ringwrap"><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="${R}" stroke="rgba(255,255,255,.1)" stroke-width="8" fill="none"/>
      <circle id="dr" cx="60" cy="60" r="${R}" stroke="#e8d3a6" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="${C}" stroke-dashoffset="${C}"/></svg>
      <div class="big"><b id="dn">${d.type === "reps" ? 0 : d.n}</b><small id="du">${d.type === "reps" ? `/ ${d.n} ${t("count")}` : t("seconds")}</small></div></div>
    <div class="drill-call" id="dc"></div>
    ${d.type === "reps" ? `<div class="tempo">${t("tempo")}: <button class="btn ghost sm" data-tp="3.2">Chậm</button><button class="btn ghost sm on" data-tp="2.4">Vừa</button><button class="btn ghost sm" data-tp="1.7">Nhanh</button></div>` : ""}
    <div style="display:flex;gap:10px;width:100%"><button class="btn ghost" id="dx" style="flex:1">${t("stop")}</button><button class="btn" id="dg" style="flex:2">${I.play}${t("go")}</button></div>
  </div></div>`;
  let tempo = 2.4, running = false, timers = [], dead = false;
  const ringEl = $("#dr"), num = $("#dn"), call = $("#dc"), small = $("#du");
  const setRing = (p) => { ringEl.style.strokeDashoffset = C * (1 - Math.max(0, Math.min(1, p))); };
  const later = (fn, ms) => { const h = setTimeout(() => { if (!dead) fn(); }, ms); timers.push(h); return h; };
  const close = () => { dead = true; timers.forEach(clearTimeout); timers = []; A.stop(); ov.innerHTML = ""; };
  cleanup.push(close);
  $$("[data-tp]").forEach((b) => b.onclick = () => { tempo = +b.dataset.tp; $$("[data-tp]").forEach((x) => x.classList.toggle("on", x === b)); $$("[data-tp]").forEach((x) => x.style.borderColor = x === b ? "var(--gold)" : ""); });
  $("[data-tp='2.4']")?.style.setProperty("border-color", "var(--gold)");
  $("#dx").onclick = close;
  $("#dg").onclick = async () => {
    if (running) return;
    running = true;
    $("#dg").disabled = true;
    A.sfx("go");
    await A.say("drill_start");
    if (dead) return;
    const finish = async (key) => {
      A.sfx("win");
      setRing(1);
      call.textContent = t("done") + "!";
      const res = St.drillDone(st.id);
      St.addTime(d.type === "reps" ? d.n * tempo : d.type === "rounds" ? d.n * d.rounds : d.n);
      rewardToast(res);
      await A.say(key);
      if (dead) return;
      $("#dg").disabled = false; $("#dg").innerHTML = `${I.check}${t("done")}`; $("#dg").onclick = close;
    };
    if (d.type === "reps") {
      let i = 0;
      const beat = () => {
        i++;
        num.textContent = i; setRing(i / d.n); A.sfx("tick");
        if (A.has(`n${i}`)) A.say(`n${i}`);
        if (i >= d.n) return later(() => finish("drill_reps_done"), tempo * 600);
        later(beat, tempo * 1000);
      };
      later(beat, 400);
    } else {
      const rounds = d.type === "rounds" ? d.rounds : 1;
      const runRound = (r) => {
        const t0 = Date.now();
        let warned = false, nextCall = 0;
        if (rounds > 1) small.textContent = t("round", r, rounds);
        const tick = () => {
          const left = Math.max(0, d.n - (Date.now() - t0) / 1000);
          num.textContent = Math.ceil(left);
          setRing(1 - left / d.n);
          if (d.type === "calls" && Date.now() >= nextCall && left > 1) {
            const c = d.calls[Math.floor(Math.random() * d.calls.length)];
            const key = { "Tiến!": "call_tien", "Lùi!": "call_lui", "Sang trái!": "call_trai", "Sang phải!": "call_phai", "Xoay!": "call_xoay" }[c];
            call.textContent = c; A.say(key); A.sfx("tick");
            nextCall = Date.now() + 2200 + Math.random() * 800;
          }
          if (!warned && d.n >= 20 && left <= 10) { warned = true; if (d.type !== "calls") A.say("drill_10s"); }
          if (left <= 0) {
            if (r < rounds) {
              call.textContent = t("rest"); A.say("drill_rest"); A.sfx("go");
              const rs = Date.now();
              const restTick = () => {
                const lf = Math.max(0, d.rest - (Date.now() - rs) / 1000);
                num.textContent = Math.ceil(lf); setRing(lf / d.rest);
                if (lf <= 0) { call.textContent = ""; A.say("drill_round"); A.sfx("go"); later(() => runRound(r + 1), 900); }
                else later(restTick, 200);
              };
              later(restTick, 200);
            } else finish("drill_end");
            return;
          }
          later(tick, 200);
        };
        tick();
      };
      runRound(1);
    }
  };
}

// ---------------------------------------------------------------- kiểm tra
function screenQuiz(id) {
  const l = D.lessons[id];
  if (!l) return go("#/home");
  const ls = D.order[l.track];
  if (!St.unlocked(ls, ls.indexOf(l))) return go(`#/track/${l.track}`);
  const qs = l.quiz.map((q, k) => ({ ...q, qk: `${l.id}-q${k}`, wk: `${l.id}-w${k}` }));
  runQuiz(qs, { back: `#/lesson/${l.id}`, title: l.title, eyebrow: t("quiz"), intro: "quiz_intro", done: (score) => showResult(l, score) });
}

// Bài thi tốt nghiệp nhánh: 10 câu ngẫu nhiên từ mọi bài.
function screenExam(trackId) {
  const ls = D.order[trackId];
  if (!ls) return go("#/home");
  if (!ls.every((l) => St.S().lessons[l.id]?.done)) { toast(t("examLockedToast")); return go(`#/track/${trackId}`); }
  const pool = ls.flatMap((l) => l.quiz.map((q, k) => ({ ...q, qk: `${l.id}-q${k}`, wk: `${l.id}-w${k}` })));
  for (let i = pool.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [pool[i], pool[j]] = [pool[j], pool[i]]; }
  const tr = D.tracks.find((x) => x.id === trackId);
  runQuiz(pool.slice(0, 10), { back: `#/track/${trackId}`, title: tr.title, eyebrow: t("exam"), intro: "exam_intro", done: (score, total) => showExamResult(trackId, score, total) });
}

function runQuiz(qs, { back, title, eyebrow, intro, done }) {
  let qi = 0, score = 0, shown = false;
  const marks = [];
  render(`${topbar({ back, title: `<span class="eyebrow">${eyebrow}</span><h1>${esc(title)}</h1>` })}
    <div class="wrap quiz">${coachHTML()}<div class="qprog" id="qp"></div><div class="card q" id="qbox"></div></div>`, { tab: null });
  const box = $("#qbox");
  const prog = () => { $("#qp").innerHTML = qs.map((_, i) => `<i class="${marks[i] === true ? "ok" : marks[i] === false ? "no" : i === qi ? "cur" : ""}"></i>`).join(""); };
  const show = () => {
    const q = qs[qi];
    prog();
    box.innerHTML = `<span class="eyebrow">${t("qOf", qi + 1, qs.length)}</span><h2>${esc(q.q)}</h2>
      ${q.a.map((a, i) => `<button class="opt" data-i="${i}"><span class="k">${"ABCD"[i]}</span><span>${esc(a)}</span></button>`).join("")}
      <div id="qafter"></div>`;
    bubbleSay(q.qk);
    $$(".opt", box).forEach((b) => b.onclick = async () => {
      const i = +b.dataset.i;
      $$(".opt", box).forEach((x) => { x.disabled = true; });
      const right = i === q.ok;
      marks[qi] = right;
      if (right) score++;
      b.classList.add(right ? "right" : "wrong");
      $$(".opt", box)[q.ok].classList.add("right");
      A.sfx(right ? "ok" : "bad");
      prog();
      const lastQ = qi === qs.length - 1;
      $("#qafter").innerHTML = `<div class="why">${esc(q.why)}</div><button class="btn block" id="qn" style="margin-top:12px">${lastQ ? t("finish") : t("nextQ")} ${I.next}</button>`;
      $("#qn").onclick = () => { A.sfx("tap"); if (lastQ) done(score, qs.length); else { qi++; show(); } };
      const pick = right ? `right_${1 + Math.floor(Math.random() * 4)}` : `wrong_${1 + Math.floor(Math.random() * 3)}`;
      if (await bubbleSay(pick)) bubbleSay(q.wk);
    });
  };
  const first = () => { if (!shown) { shown = true; show(); } };
  whenReady(async () => { await bubbleSay(intro); first(); });
  // không bắt người chơi chờ: câu hỏi đầu tiên hiện sau tối đa 5 giây
  const h = setTimeout(first, 5000);
  cleanup.push(() => clearTimeout(h));
}

function showExamResult(trackId, score, total) {
  const res = St.examDone(trackId, score, total);
  const tr = D.tracks.find((x) => x.id === trackId);
  const r = St.rankOf();
  const medalOf = (b) => medal(b === "streak3" ? "flame3" : b === "streak7" ? "flame7" : b);
  render(`${topbar({ back: `#/track/${trackId}`, title: `<span class="eyebrow">${t("exam")}</span><h1>${esc(tr.title)}</h1>` })}
    <div class="wrap result">
      ${coachHTML()}
      <span class="eyebrow">${res.pass ? t("examPass") : t("resultFail")} · ${score}/${total}</span>
      <div class="bigstars">${[0, 1, 2].map((k) => I.star.replace("<svg", `<svg class="${k < (res.pass ? (score === total ? 3 : 2) : 0) ? "on" : ""}"`)).join("")}</div>
      ${res.gained ? `<div class="xpgain">+${res.gained} XP</div>` : ""}
      ${res.rankUp != null ? `<div class="card reward">${insignia(res.rankUp)}<div><span class="eyebrow">${t("rankUp")}</span><h3>${rankName(res.rankUp)}</h3></div></div>` : ""}
      ${res.badges.map((b) => `<div class="card reward">${medalOf(b)}<div><span class="eyebrow">${t("newBadge")}</span><h3>${t("badges")[b][0]}</h3><span class="muted">${t("badges")[b][1]}</span></div></div>`).join("")}
      <div class="card rankcard" style="width:100%">${insignia(r.lvl)}<div class="info"><b>${rankName(r.lvl)}</b><div class="xpbar"><i style="width:${Math.round(r.pct * 100)}%"></i></div></div></div>
      <div style="display:grid;gap:10px;width:100%">
        ${St.S().badges.includes("grad") ? `<label class="namefield card" style="padding:12px 14px"><span class="eyebrow">${t("yourName")}</span><input id="cname" maxlength="40" value="${esc(St.S().name || "")}" placeholder="${t("namePh")}"></label>
        <button class="btn block" id="cert">${I.star}${t("certBtn")}</button>` : ""}
        <button class="btn ${St.S().badges.includes("grad") ? "ghost" : ""} block" data-go="#/exam/${trackId}">${I.replay}${res.pass ? t("examAgain") : t("retry")}</button>
        <button class="btn ghost block" data-go="#/track/${trackId}">${t("backToMap")}</button>
      </div>
    </div>`, { tab: null });
  if (res.pass) { A.sfx("win"); confetti(); }
  $("#cert")?.addEventListener("click", () => {
    const n = $("#cname").value.trim(); St.S().name = n; St.save();
    certificate(n || t("warrior"), tr.title);
  });
  const keys = [res.pass ? "exam_pass" : "exam_fail"];
  if (res.rankUp != null) keys.push("rank_up");
  whenReady(async () => { for (const k of keys) { if (!(await bubbleSay(k))) break; } });
}

function showResult(l, score) {
  const total = l.quiz.length;
  const res = St.quizDone(l, score, total);
  const trackB = St.trackBadge(D.order[l.track]);
  res.badges.push(...trackB);
  const ls = D.order[l.track];
  const nx = ls[ls.indexOf(l) + 1];
  const r = St.rankOf();
  render(`${topbar({ back: `#/track/${l.track}`, title: `<span class="eyebrow">${t("quiz")}</span><h1>${esc(l.title)}</h1>` })}
    <div class="wrap result">
      ${coachHTML()}
      <span class="eyebrow">${res.pass ? t("resultPass") : t("resultFail")} · ${score}/${total}</span>
      <div class="bigstars">${[0, 1, 2].map((k) => I.star.replace("<svg", `<svg class="${k < res.stars ? "on" : ""}"`)).join("")}</div>
      ${res.gained ? `<div class="xpgain" id="xpg">+0 XP</div>` : ""}
      ${res.rankUp != null ? `<div class="card reward">${insignia(res.rankUp)}<div><span class="eyebrow">${t("rankUp")}</span><h3>${rankName(res.rankUp)}</h3></div></div>` : ""}
      ${res.badges.map((b) => `<div class="card reward">${medal(b === "streak3" ? "flame3" : b === "streak7" ? "flame7" : b)}<div><span class="eyebrow">${t("newBadge")}</span><h3>${t("badges")[b][0]}</h3><span class="muted">${t("badges")[b][1]}</span></div></div>`).join("")}
      <div class="card rankcard" style="width:100%">${insignia(r.lvl)}<div class="info"><b>${rankName(r.lvl)}</b><div class="xpbar"><i style="width:${Math.round(r.pct * 100)}%"></i></div></div></div>
      <div style="display:grid;gap:10px;width:100%">
        ${res.pass && nx ? `<button class="btn block" data-go="#/lesson/${nx.id}">${t("nextLesson")}: ${esc(nx.title)} ${I.next}</button>` : ""}
        ${!res.pass ? `<button class="btn block" data-go="#/quiz/${l.id}">${I.replay}${t("retry")}</button>` : ""}
        <button class="btn ghost block" data-go="#/track/${l.track}">${t("backToMap")}</button>
      </div>
    </div>`, { tab: null });
  if (res.gained) {
    const el = $("#xpg"); const t0 = performance.now();
    const step = () => { const p = Math.min(1, (performance.now() - t0) / 1200); el.textContent = `+${Math.round(res.gained * p)} XP`; if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }
  if (res.pass) { A.sfx("win"); confetti(); }
  const keys = [res.stars === 3 ? "quiz_perfect" : res.pass ? "quiz_pass" : "quiz_retry"];
  if (res.pass) keys.push(`${l.id}-outro`);
  if (res.rankUp != null) keys.push("rank_up");
  else if (res.badges.length) keys.push("badge");
  whenReady(async () => { for (const k of keys) { if (!(await bubbleSay(k))) break; } });
}

// Giấy chứng nhận tốt nghiệp: vẽ bằng canvas, tải về dạng PNG.
async function certificate(name, trackTitle) {
  await document.fonts?.ready;
  const W = 1600, H = 1130;
  const c = document.createElement("canvas"); c.width = W; c.height = H;
  const x = c.getContext("2d");
  const bg = x.createRadialGradient(W / 2, H * 0.4, 100, W / 2, H / 2, W * 0.75);
  bg.addColorStop(0, "#1d2416"); bg.addColorStop(1, "#090b07");
  x.fillStyle = bg; x.fillRect(0, 0, W, H);
  const gold = x.createLinearGradient(0, 0, 0, H); gold.addColorStop(0, "#f1e0b4"); gold.addColorStop(1, "#b08a3e");
  x.strokeStyle = gold; x.lineWidth = 6; x.strokeRect(40, 40, W - 80, H - 80);
  x.lineWidth = 1.5; x.strokeRect(60, 60, W - 120, H - 120);
  const logo = new Image();
  logo.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(LOGO.replace("<svg", '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200"'));
  await new Promise((r) => { logo.onload = r; logo.onerror = r; });
  try { x.drawImage(logo, W / 2 - 90, 100, 180, 180); } catch { /* bỏ qua */ }
  x.textAlign = "center"; x.fillStyle = gold;
  x.font = "600 30px Oswald, sans-serif"; x.fillText(t("brand").split("").join(" "), W / 2, 330);
  x.font = "700 78px Oswald, sans-serif"; x.fillText(t("certTitle"), W / 2, 440);
  x.fillStyle = "#a9ab9b"; x.font = "400 30px 'Be Vietnam Pro', sans-serif"; x.fillText(t("certGiven"), W / 2, 520);
  x.fillStyle = "#eeece3"; x.font = "700 86px 'Be Vietnam Pro', sans-serif"; x.fillText(name, W / 2, 630);
  x.fillStyle = "#a9ab9b"; x.font = "400 30px 'Be Vietnam Pro', sans-serif"; x.fillText(t("certFor"), W / 2, 710);
  x.fillStyle = gold; x.font = "600 46px Oswald, sans-serif"; x.fillText(`${trackTitle.toUpperCase()} · ${t("badges").grad[0].toUpperCase()}`, W / 2, 780);
  const d = new Date();
  x.fillStyle = "#a9ab9b"; x.font = "400 26px 'Be Vietnam Pro', sans-serif";
  x.fillText(`${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`, W * 0.27, 960);
  x.fillText(t("coach"), W * 0.73, 960);
  x.strokeStyle = "rgba(232,211,166,.4)"; x.beginPath(); x.moveTo(W * 0.17, 910); x.lineTo(W * 0.37, 910); x.moveTo(W * 0.63, 910); x.lineTo(W * 0.83, 910); x.stroke();
  x.fillStyle = "#74776a"; x.font = "400 20px 'Be Vietnam Pro', sans-serif"; x.fillText(t("certNote"), W / 2, 1040);
  const a = document.createElement("a");
  a.download = "soi-taiga-chung-nhan.png";
  a.href = c.toDataURL("image/png");
  document.body.appendChild(a); a.click(); a.remove();
  toast(t("certDone"));
}

function confetti() {
  const c = document.createElement("canvas");
  c.id = "confetti";
  document.body.appendChild(c);
  const x = c.getContext("2d");
  const W = (c.width = innerWidth * devicePixelRatio), H = (c.height = innerHeight * devicePixelRatio);
  const cols = ["#e8d3a6", "#c9a24a", "#b08a3e", "#f4e4b9", "#8fbf6a"];
  const ps = Array.from({ length: 120 }, () => ({ x: W / 2 + (Math.random() - 0.5) * W * 0.3, y: H * 0.35, vx: (Math.random() - 0.5) * 18, vy: -Math.random() * 22 - 6, r: 4 + Math.random() * 6, c: cols[Math.floor(Math.random() * cols.length)], a: Math.random() * 6 }));
  const t0 = performance.now();
  const frame = () => {
    const el = performance.now() - t0;
    x.clearRect(0, 0, W, H);
    ps.forEach((p) => { p.vy += 0.6; p.x += p.vx; p.y += p.vy; p.a += 0.1; x.save(); x.translate(p.x, p.y); x.rotate(p.a); x.fillStyle = p.c; x.globalAlpha = Math.max(0, 1 - el / 2600); x.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); x.restore(); });
    if (el < 2600) requestAnimationFrame(frame); else c.remove();
  };
  requestAnimationFrame(frame);
}

// ---------------------------------------------------------------- tập nhanh
function screenDrills() {
  const s = St.S();
  const rows = [];
  const order = D.order["tay-khong"] || [];
  order.forEach((l, li) => {
    // mọi bước của các bài đã mở đều tập theo được
    if (St.unlocked(order, li)) l.steps.forEach((st) => rows.push({ l, st }));
  });
  const label = (d) => d.type === "reps" ? t("reps", d.n) : d.type === "rounds" ? t("rounds", d.rounds, d.n) : t("secs", d.n);
  render(`${topbar()}
    <div class="wrap" style="display:grid;gap:14px">
      <div class="home-hero" style="position:relative">${coachHTML({ cls: "wide" })}</div>
      <div class="section-h"><h2>${t("drillsH")}</h2>${rows.length ? `<button class="btn sm" id="rnd">${I.bolt}${t("randomDrill")}</button>` : ""}</div>
      <p class="muted" style="margin:-6px 2px 4px">${rows.length ? t("drillsSub") : t("drillsEmpty")}</p>
      <div class="drills">${rows.map(({ l, st }, i) => `<button class="card drill-row" data-k="${i}"><img src="assets/img/kf/${st.id}.webp" alt="" loading="lazy"><span class="t">${esc(st.drill.label)}<small>Bài ${l.no} · ${esc(st.title)} · ${label(st.drill)}</small></span>${I.play}</button>`).join("")}</div>
      ${rows.length ? "" : `<button class="btn block" data-go="#/lesson/tk1">${I.play}${esc(D.lessons.tk1.title)}</button>`}
    </div>`, { tab: "drills" });
  $(".coach.wide").style.aspectRatio = "16 / 9";
  $$(".drill-row").forEach((b) => b.onclick = () => openDrill(rows[+b.dataset.k].st));
  $("#rnd")?.addEventListener("click", () => openDrill(rows[Math.floor(Math.random() * rows.length)].st));
  whenReady(() => bubbleSay(rows.length ? "plan" : "practice_intro"));
}

// ---------------------------------------------------------------- hồ sơ
function screenMe() {
  const s = St.S();
  const r = St.rankOf();
  const daySet = new Set(s.days);
  const cells = [];
  const d = new Date();
  d.setDate(d.getDate() - 27);
  for (let i = 0; i < 28; i++) { const k = St.today(d); cells.push(`<i class="${daySet.has(k) ? "on" : ""} ${k === St.today() ? "today" : ""}" title="${k}"></i>`); d.setDate(d.getDate() + 1); }
  const allB = Object.keys(t("badges"));
  const sw = (k, label) => `<div class="set-row"><span>${label}</span><button class="switch ${s.settings[k] ? "on" : ""}" data-set="${k}" aria-pressed="${s.settings[k]}" aria-label="${label}"></button></div>`;
  render(`${topbar()}
    <div class="wrap profile">
      <div style="display:grid;gap:16px">
        <div class="card prof-top">${insignia(r.lvl)}<span class="eyebrow">${t("profile")}</span><h2 style="font-size:26px">${rankName(r.lvl)}</h2>
          <div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center"><span class="pill">${I.spark}${s.xp} XP</span><span class="pill">${I.flame}${t("streakDays", St.streak())}</span><span class="pill">${I.bolt}${s.drills}</span><span class="pill">${I.clock}${t("trained", Math.round((s.stats?.sec || 0) / 60))}</span><span class="pill">${I.list}${t("stepsSeen", Object.values(s.lessons).reduce((n, x) => n + (x.seen?.length || 0), 0))}</span></div>
          <label class="namefield"><span class="eyebrow">${t("yourName")}</span><input id="pname" maxlength="40" value="${esc(s.name || "")}" placeholder="${t("namePh")}"></label>
          <div class="xpbar" style="width:100%"><i style="width:${Math.round(r.pct * 100)}%"></i></div>
          <span class="muted" style="font-size:12.5px">${r.nxt ? t("toNext", r.nxt.xp - s.xp, t("ranks")[r.nxt.id]) : t("maxRank")}</span></div>
        <div class="card"><div class="panel-h">${t("calH")}</div><div class="cal">${cells.join("")}</div></div>
        <div class="card settings"><div class="panel-h" style="padding-left:0">${t("settingsH")}</div>
          ${sw("voice", t("setVoice"))}${sw("sfx", t("setSfx"))}${sw("ambient", t("setAmb"))}${sw("auto", t("autoPlay"))}${sw("pip", t("pip"))}
          <div class="set-row"><span class="muted" style="font-size:12.5px">${t("disclaimer")}</span></div>
          <div class="set-row"><button class="btn ghost sm" id="reset">${t("resetBtn")}</button></div></div>
      </div>
      <div style="display:grid;gap:16px">
        <div class="card ranks"><div class="panel-h">${t("ranksH")}</div>${RANKS.map((rk, i) => `<div class="rank-row ${i === r.lvl ? "cur" : i > r.lvl ? "lock" : ""}">${insignia(i)}<span class="t">${t("ranks")[rk.id]}</span><span class="muted">${rk.xp} XP</span></div>`).join("")}</div>
        <div class="card"><div class="panel-h">${t("badgesH")}</div><div class="badges">${allB.map((b) => `<div class="badge ${s.badges.includes(b) ? "" : "lock"}">${medal(b === "streak3" ? "flame3" : b === "streak7" ? "flame7" : b)}<b>${t("badges")[b][0]}</b><span>${t("badges")[b][1]}</span></div>`).join("")}</div></div>
      </div>
    </div>`, { tab: "me" });
  $$("[data-set]").forEach((b) => b.onclick = () => {
    const k = b.dataset.set;
    s.settings[k] = !s.settings[k];
    b.classList.toggle("on", s.settings[k]);
    b.setAttribute("aria-pressed", s.settings[k]);
    St.save(); A.configure(s.settings); A.sfx("tap");
  });
  $("#pname").onchange = (e) => { s.name = e.target.value.trim(); St.save(); toast(t("saved")); };
  $("#reset").onclick = () => { if (confirm(t("resetAsk"))) { St.reset(); go("#/home"); } };
  whenReady(() => A.say("profile"));
}

boot().catch((e) => {
  console.error(e);
  app.innerHTML = `<div class="wrap" style="padding-top:40px"><div class="card" style="padding:20px">Không tải được dữ liệu. Hãy tải lại trang.</div></div>`;
});
